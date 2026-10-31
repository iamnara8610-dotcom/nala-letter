import type { IssuedLetter } from '../content/types';
import { Link } from '../lib/router';
import { issueLabelKo, parseSlug, volLabel } from '../lib/format';
import { ImageSlot } from './ImageSlot';

interface Props {
  letter: IssuedLetter;
  isLatest?: boolean;
  variant?: 'grid' | 'row';
}

export function LetterCard({ letter, isLatest, variant = 'grid' }: Props) {
  const { monthShort, year } = parseSlug(letter.slug);
  return (
    <Link to={`/letter/${letter.slug}`} className={`letter-card letter-card--${variant}`}>
      <div className="letter-card__thumb">
        <ImageSlot image={letter.cover} ratio="portrait" label={`${monthShort} ${year}`} showCaption={false} />
        {isLatest ? <span className="pill pill--dark letter-card__badge">LATEST</span> : null}
        {!letter.published ? <span className="pill pill--accent letter-card__badge">DRAFT</span> : null}
      </div>
      <div className="letter-card__body">
        <p className="letter-card__meta">
          <span className="accent">{volLabel(letter.issueNumber)}</span>
          <span aria-hidden="true">·</span>
          <span>{issueLabelKo(letter.slug)}</span>
        </p>
        <h3 className="letter-card__title">{letter.title}</h3>
        {variant === 'row' ? <p className="letter-card__summary">{letter.summary}</p> : null}
      </div>
    </Link>
  );
}
