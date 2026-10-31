export type ParsedVideo =
  | { kind: 'youtube'; embedUrl: string; vertical: boolean }
  | { kind: 'file'; src: string }
  | { kind: 'link'; href: string; label: string }
  | { kind: 'none' };

export function parseVideo(url: string | undefined): ParsedVideo {
  const u = (url ?? '').trim();
  if (!u) return { kind: 'none' };

  const yt =
    u.match(/youtube\.com\/watch\?[^#]*v=([\w-]{6,})/) ||
    u.match(/youtu\.be\/([\w-]{6,})/) ||
    u.match(/youtube\.com\/(?:embed|shorts|live)\/([\w-]{6,})/);
  if (yt) {
    return {
      kind: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0&playsinline=1`,
      vertical: /\/shorts\//.test(u),
    };
  }

  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(u)) return { kind: 'file', src: u };

  if (/instagram\.com/.test(u)) return { kind: 'link', href: u, label: '인스타그램에서 영상 보기' };

  return { kind: 'link', href: u, label: '영상 보러 가기' };
}
