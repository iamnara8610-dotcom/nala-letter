/**
 * 빌드 후 실행되는 스크립트 (npm run build 시 자동 실행)
 *
 * 하는 일
 *  1) 호마다 실제 폴더(dist/letter/2026-11/index.html)를 만들어
 *     어떤 무료 호스팅에서도 /letter/2026-11 주소가 바로 열리게 합니다.
 *  2) 각 페이지에 제목·요약·표지 이미지를 미리 넣어
 *     카카오톡·인스타그램 DM·문자로 링크를 보낼 때 미리보기가 그 호의 내용으로 뜹니다.
 *  3) 404.html, sitemap.xml, robots.txt 를 만듭니다.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { site } from '../src/config/site';
import type { Letter } from '../src/content/types';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const lettersDir = join(root, 'src/content/letters');
const SLUG_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p: string) => (/^https?:\/\//.test(p) ? p : `${site.siteUrl}${p.startsWith('/') ? '' : '/'}${p}`);

async function loadLetters(): Promise<Letter[]> {
  const files = readdirSync(lettersDir).filter((f) => f.endsWith('.ts') && !f.startsWith('_'));
  const list: Letter[] = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(join(lettersDir, f)).href);
    const l: Letter | undefined = mod.default;
    if (!l || !SLUG_RE.test(l.slug)) {
      console.warn(`⚠️  ${f}: slug 형식(YYYY-MM)이 올바르지 않아 건너뜁니다.`);
      continue;
    }
    if (`${l.slug}.ts` !== f) console.warn(`⚠️  ${f}: 파일 이름과 slug(${l.slug})가 다릅니다. 같게 맞추는 것을 권장합니다.`);
    if (l.published) list.push(l);
  }
  return list.sort((a, b) => b.slug.localeCompare(a.slug));
}

function metaBlock(o: { title: string; description: string; url: string; image?: string; type?: string }) {
  const lines = [
    `<title>${esc(o.title)}</title>`,
    `<meta name="description" content="${esc(o.description)}" />`,
    `<link rel="canonical" href="${esc(o.url)}" />`,
    `<meta property="og:type" content="${o.type ?? 'website'}" />`,
    `<meta property="og:site_name" content="${esc(site.title)}" />`,
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta property="og:title" content="${esc(o.title)}" />`,
    `<meta property="og:description" content="${esc(o.description)}" />`,
    `<meta property="og:url" content="${esc(o.url)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (o.image) {
    lines.push(`<meta property="og:image" content="${esc(o.image)}" />`);
    lines.push(`<meta name="twitter:image" content="${esc(o.image)}" />`);
  }
  return lines.join('\n    ');
}

function withMeta(template: string, meta: string) {
  return template.replace(/<!--meta:start-->[\s\S]*?<!--meta:end-->/, `<!--meta:start-->\n    ${meta}\n    <!--meta:end-->`);
}

function write(rel: string, html: string) {
  const file = join(dist, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

/** public 폴더에 실제 이미지가 있을 때만 공유 이미지로 사용 */
function shareImage(src?: string) {
  const candidate = src && existsSync(join(root, 'public', src)) ? src : site.defaultShareImage;
  return existsSync(join(root, 'public', candidate)) ? abs(candidate) : undefined;
}

async function main() {
  const template = readFileSync(join(dist, 'index.html'), 'utf8');
  const letters = await loadLetters();
  const latest = letters[0];

  // 홈
  write(
    'index.html',
    withMeta(
      template,
      metaBlock({
        title: `${site.title} — 나라필라테스 월간 매거진`,
        description: latest ? `${latest.title} · ${site.description}` : site.description,
        url: `${site.siteUrl}/`,
        image: shareImage(latest?.cover.src),
      }),
    ),
  );

  // 아카이브
  write(
    'archive/index.html',
    withMeta(
      template,
      metaBlock({
        title: `Archive | ${site.title}`,
        description: '지금까지 발행된 NALA LETTER를 연도별·월별로 모아두었어요.',
        url: `${site.siteUrl}/archive`,
        image: shareImage(latest?.cover.src),
      }),
    ),
  );

  // 각 호
  for (const l of letters) {
    const [y, m] = l.slug.split('-');
    write(
      `letter/${l.slug}/index.html`,
      withMeta(
        template,
        metaBlock({
          title: `${l.title} | ${site.title} ${y}년 ${Number(m)}월호`,
          description: l.summary,
          url: `${site.siteUrl}/letter/${l.slug}`,
          image: shareImage(l.cover.src),
          type: 'article',
        }),
      ),
    );
  }

  // 404 (없는 주소 → 앱이 '페이지 없음' 화면 표시)
  write(
    '404.html',
    withMeta(template, metaBlock({ title: `페이지를 찾을 수 없어요 | ${site.title}`, description: site.description, url: site.siteUrl })),
  );

  // sitemap / robots
  const urls = ['/', '/archive', ...letters.map((l) => `/letter/${l.slug}`)];
  write(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${site.siteUrl}${u}</loc></url>`)
      .join('\n')}\n</urlset>\n`,
  );
  write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.siteUrl}/sitemap.xml\n`);

  console.log(`✅ NALA LETTER: 공개 ${letters.length}개 호 페이지 생성 완료 (${letters.map((l) => l.slug).join(', ') || '없음'})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
