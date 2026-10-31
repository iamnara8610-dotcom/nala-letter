import { useEffect } from 'react';
import { site } from '../config/site';

/** 브라우저 탭 제목과 설명을 페이지마다 바꿔줍니다 */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.title}` : `${site.title} — 나라필라테스 월간 매거진`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', description || site.description);
  }, [title, description]);
}
