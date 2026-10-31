import { site } from '../config/site';
import type { Letter } from '../content/types';

/** 상담 링크: 호별 설정 → site.ts 설정 → 인스타그램 순서로 사용 */
export function consultUrl(letter?: Letter) {
  return letter?.cta?.consultUrl || site.links.consult || site.links.instagram;
}

/** 시간표 링크: 호별 설정 → site.ts 설정 → 인스타그램 순서로 사용 */
export function scheduleUrl(letter?: Letter) {
  return letter?.cta?.scheduleUrl || site.links.schedule || site.links.instagram;
}

export const externalProps = { target: '_blank', rel: 'noopener noreferrer' } as const;
