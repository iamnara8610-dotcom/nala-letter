import type { IssuedLetter, Letter } from './types';

/**
 * letters 폴더의 'YYYY-MM.ts' 파일을 자동으로 모두 불러옵니다.
 * 새 파일을 추가하면 메인·아카이브·이전/다음 이동에 자동 반영됩니다.
 * (이름이 _ 로 시작하는 파일은 제외)
 */
const modules = import.meta.glob<{ default: Letter }>(['./letters/*.ts', '!./letters/_*.ts'], {
  eager: true,
});

const SLUG_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const showDrafts = import.meta.env.DEV;

function buildList(): IssuedLetter[] {
  const all = Object.values(modules)
    .map((m) => m.default)
    .filter((l): l is Letter => Boolean(l && SLUG_RE.test(l.slug)));

  // 호수 번호는 '공개된 호' 기준으로 오래된 순서대로 부여 (VOL.01, VOL.02 …)
  const published = all.filter((l) => l.published).sort((a, b) => a.slug.localeCompare(b.slug));
  const numbered = new Map(published.map((l, i) => [l.slug, i + 1]));

  const visible = showDrafts ? all : published;
  return visible
    .map((l) => ({ ...l, issueNumber: numbered.get(l.slug) ?? 0 }))
    .sort((a, b) => b.slug.localeCompare(a.slug)); // 최신호가 맨 앞
}

/** 최신순 정렬된 전체 공개 호 */
export const letters: IssuedLetter[] = buildList();

export const latestLetter: IssuedLetter | undefined = letters.find((l) => l.published) ?? letters[0];

export function getLetter(slug: string): IssuedLetter | undefined {
  return letters.find((l) => l.slug === slug);
}

/** 상세 페이지의 이전호(더 오래된 호) / 다음호(더 최근 호) */
export function getAdjacent(slug: string): { prev?: IssuedLetter; next?: IssuedLetter } {
  const i = letters.findIndex((l) => l.slug === slug);
  if (i < 0) return {};
  return { next: letters[i - 1], prev: letters[i + 1] };
}

/** 연도별 묶음 (최신 연도 먼저) */
export function groupByYear(list: IssuedLetter[] = letters): { year: string; items: IssuedLetter[] }[] {
  const map = new Map<string, IssuedLetter[]>();
  for (const l of list) {
    const y = l.slug.slice(0, 4);
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(l);
  }
  return [...map.entries()].map(([year, items]) => ({ year, items }));
}
