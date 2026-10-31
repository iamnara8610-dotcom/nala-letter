import { site } from '../config/site';
import type { Letter } from '../content/types';
import { consultUrl, externalProps, scheduleUrl } from '../lib/links';

interface Props {
  letter?: Letter;
  /** 상단 작은 라벨 */
  eyebrow?: string;
  heading?: string;
  text?: string;
}

/** 상담·시간표로 연결하는 진한 그린 블록 (메인 하단, 상세 하단 공통) */
export function StudioBlock({ letter, eyebrow = site.brand, heading, text }: Props) {
  return (
    <section className="studio-block" aria-label="상담 및 시간표 안내">
      <div className="container studio-block__inner">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h2 className="studio-block__title">{heading ?? site.studio.summary}</h2>
        <p className="studio-block__text">{text ?? site.studio.description}</p>
        <div className="studio-block__actions">
          <a className="btn btn--accent" href={scheduleUrl(letter)} {...externalProps}>
            {site.labels.schedule} <span aria-hidden="true">→</span>
          </a>
          <a className="btn btn--outline-light" href={consultUrl(letter)} {...externalProps}>
            {site.labels.consult} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
