import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react';

/**
 * 외부 라이브러리 없이 동작하는 가벼운 라우터.
 * 실제 주소(/letter/2026-11)를 그대로 쓰므로 공유·북마크·검색에 유리합니다.
 */

type Mode = 'history' | 'hash';
const MODE: Mode = (import.meta.env.VITE_ROUTER_MODE as Mode) === 'hash' ? 'hash' : 'history';

/*
 * hash 모드는 '미리보기 전용'입니다 (#home, #archive, #letter-2026-11 형태).
 * 실제 배포(history 모드)는 /letter/2026-11 같은 진짜 주소를 씁니다.
 */
function hashToPath(hash: string) {
  const h = hash.replace(/^#/, '');
  if (h === 'archive') return '/archive';
  const m = h.match(/^letter-(\d{4}-\d{2})$/);
  if (m) return `/letter/${m[1]}`;
  return '/';
}

function readLocation() {
  if (MODE === 'hash') return { path: hashToPath(window.location.hash), anchor: '' };
  return { path: window.location.pathname || '/', anchor: window.location.hash.replace(/^#/, '') };
}

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((fn) => fn());

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', notify);
  window.addEventListener('hashchange', notify);
}

export function toHref(to: string) {
  if (MODE !== 'hash') return to;
  const path = to.split('#')[0];
  if (path === '/archive') return '#archive';
  const m = path.match(/^\/letter\/(\d{4}-\d{2})$/);
  return m ? `#letter-${m[1]}` : '#home';
}

export function navigate(to: string) {
  const url = toHref(to);
  if (MODE === 'hash') {
    window.location.hash = url;
  } else {
    window.history.pushState(null, '', url);
    notify();
  }
  const anchor = MODE === 'hash' ? '' : to.split('#')[1];
  if (!anchor) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

export function useLocation() {
  const [loc, setLoc] = useState(readLocation);
  useEffect(() => {
    const fn = () => setLoc(readLocation());
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  // #앵커가 있으면 해당 위치로 스크롤
  useEffect(() => {
    if (!loc.anchor) return;
    const t = window.setTimeout(() => {
      document.getElementById(loc.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => window.clearTimeout(t);
  }, [loc.path, loc.anchor]);

  return loc;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

export function Link({ to, onClick, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={toHref(to)} onClick={handle} {...rest} />;
}
