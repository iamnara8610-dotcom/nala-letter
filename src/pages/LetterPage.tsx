import { useState } from 'react';
import { getAdjacent, getLetter } from '../content/letters';
import type { IssuedLetter } from '../content/types';
import { ImageSlot } from '../components/ImageSlot';
import { VideoSlot } from '../components/VideoSlot';
import { StudioBlock } from '../components/StudioBlock';
import { usePageMeta } from '../components/usePageMeta';
import { Link } from '../lib/router';
import { dotDate, issueLabelEn, issueLabelKo, pad2, volLabel } from '../lib/format';
import { NotFoundPage } from './NotFoundPage';

export function LetterPage({ slug }: { slug: string }) {
  const letter = getLetter(slug);
  usePageMeta(letter?.title, letter?.summary);
  if (!letter) return <NotFoundPage />;
  return <LetterView letter={letter} />;
}

function LetterView({ letter }: { letter: IssuedLetter }) {
  const { prev, next } = getAdjacent(letter.slug);

  return (
    <article className="letter">
      {/* ── 표지 헤더 ── */}
      <header className="letter-hero container">
        <div className="letter-hero__meta">
          <Link to="/" className="text-link text-link--muted">
            ← NALA LETTER
          </Link>
          <span className="letter-hero__vol">
            {volLabel(letter.issueNumber)} · {issueLabelEn(letter.slug)}
          </span>
        </div>
        <p className="eyebrow">{issueLabelKo(letter.slug)}</p>
        <h1 className="letter-hero__title">{letter.title}</h1>
        <p className="letter-hero__subtitle">{letter.subtitle}</p>
        <div className="letter-hero__by">
          <span>발행 {dotDate(letter.publishedAt)}</span>
          <span aria-hidden="true">/</span>
          <span>NALA PILATES</span>
          <ShareButton title={letter.title} />
        </div>
      </header>

      <div className="letter-cover container-wide">
        <ImageSlot image={letter.cover} ratio="cover" label="COVER" eager />
      </div>

      {/* ── INTRO ── */}
      <section className="letter-intro container-text">
        <p className="kicker">INTRO</p>
        {letter.intro.map((p, i) => (
          <p key={i} className={i === 0 ? 'lead lead--first' : 'lead'}>
            {p}
          </p>
        ))}
      </section>

      {/* ── 본문 섹션 ── */}
      {letter.sections.map((s, i) => {
        const num = s.number ?? pad2(i + 1);
        const imgs = s.images ?? [];
        return (
          <section key={i} className="letter-section">
            <div className="container-text">
              <div className="letter-section__head">
                <span className="letter-section__num">{num}</span>
                <h2 className="letter-section__title">{s.title}</h2>
              </div>
              <div className="letter-section__body">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </div>

            {imgs.length > 0 ? (
              <div className={`letter-gallery letter-gallery--${Math.min(imgs.length, 3)} container-wide`}>
                {imgs.map((img, k) => (
                  <ImageSlot
                    key={k}
                    image={img}
                    ratio={imgs.length === 1 ? 'wide' : 'portrait'}
                    label={`${num} · PHOTO ${k + 1}`}
                  />
                ))}
              </div>
            ) : null}

            {s.video ? (
              <div className="container-mid">
                <VideoSlot video={s.video} />
              </div>
            ) : null}
          </section>
        );
      })}

      {/* ── NALA NEWS ── */}
      {letter.news && letter.news.items.length > 0 ? (
        <section className="letter-news container-mid" aria-label="나라필라테스 소식">
          <div className="news-box">
            <p className="news-box__title">{letter.news.title ?? 'NALA NEWS'}</p>
            <ul className="news-box__list">
              {letter.news.items.map((n, i) => (
                <li key={i}>
                  <span className="pill pill--dark">{n.tag}</span>
                  <div>
                    <strong>{n.title}</strong>
                    {n.text ? <p>{n.text}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ── OUTRO ── */}
      <section className="letter-outro container-text">
        <p className="kicker">OUTRO</p>
        {letter.outro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p className="letter-outro__sign">
          — <span className="serif-italic">with movement,</span> NALA PILATES
        </p>
      </section>

      {/* ── CTA ── */}
      <StudioBlock
        letter={letter}
        eyebrow="NEXT MOVE"
        heading={letter.cta?.heading ?? '지금 내 몸을 위한 움직임, 함께 시작해요'}
        text="수업 시간표를 확인하거나, 지금 몸 상태와 목표를 편하게 상담해 주세요. 나에게 맞는 수업부터 안내해 드릴게요."
      />

      {/* ── 이전 / 다음 ── */}
      <nav className="issue-nav container" aria-label="이전호 다음호 이동">
        {prev ? (
          <Link to={`/letter/${prev.slug}`} className="issue-nav__item">
            <span className="issue-nav__dir">← 이전호</span>
            <span className="issue-nav__issue">{issueLabelKo(prev.slug)}</span>
            <span className="issue-nav__title">{prev.title}</span>
          </Link>
        ) : (
          <div className="issue-nav__item is-empty">
            <span className="issue-nav__dir">← 이전호</span>
            <span className="issue-nav__title">첫 번째 호예요</span>
          </div>
        )}
        {next ? (
          <Link to={`/letter/${next.slug}`} className="issue-nav__item is-next">
            <span className="issue-nav__dir">다음호 →</span>
            <span className="issue-nav__issue">{issueLabelKo(next.slug)}</span>
            <span className="issue-nav__title">{next.title}</span>
          </Link>
        ) : (
          <div className="issue-nav__item is-next is-empty">
            <span className="issue-nav__dir">다음호 →</span>
            <span className="issue-nav__title">다음 호를 준비하고 있어요</span>
          </div>
        )}
      </nav>
      <div className="container issue-nav__all">
        <Link to="/archive" className="btn btn--ghost">
          전체 아카이브 보기
        </Link>
      </div>
    </article>
  );
}

function ShareButton({ title }: { title: string }) {
  const [done, setDone] = useState(false);
  const onShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setDone(true);
      window.setTimeout(() => setDone(false), 1800);
    } catch {
      /* 사용자가 공유를 취소한 경우 */
    }
  };
  return (
    <button type="button" className="share-btn" onClick={onShare}>
      {done ? '링크 복사됨 ✓' : '공유하기'}
    </button>
  );
}
