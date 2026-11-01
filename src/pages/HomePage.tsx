import { site } from '../config/site';
import { groupByYear, latestLetter, letters } from '../content/letters';
import { ImageSlot } from '../components/ImageSlot';
import { LetterCard } from '../components/LetterCard';
import { StudioBlock } from '../components/StudioBlock';
import { usePageMeta } from '../components/usePageMeta';
import { Link } from '../lib/router';
import { dotDate, issueLabelEn, issueLabelKo, pad2, parseSlug, volLabel } from '../lib/format';

const PILLARS = [
  { en: 'MOVEMENT', ko: '움직임', text: '수업 안에서 다룬 움직임과 그 움직임을 선택한 이유' },
  { en: 'LIFE', ko: '일상', text: '센터 밖으로 이어지는 러닝, 모임, 함께 움직인 시간' },
  { en: 'WELLNESS', ko: '웰니스', text: '오래 건강하게 움직이기 위한 몸 이야기와 센터 소식' },
];

export function HomePage() {
  usePageMeta();
  const latest = latestLetter;
  const previous = letters.filter((l) => l.slug !== latest?.slug);
  const years = groupByYear();

  return (
    <>
      {/* ── MASTHEAD ───────────────────────── */}
      <section className="masthead container">
        <div className="masthead__top">
          <span>Monthly Magazine</span>
          <span>by {site.brand} · JEJU</span>
        </div>
        <h1 className="masthead__title">
          NALA <em>Letter</em>
        </h1>
        <div className="masthead__bottom">
          <p className="masthead__tagline">{site.tagline}</p>
          {latest ? (
            <p className="masthead__issue">
              {volLabel(latest.issueNumber)} — {issueLabelEn(latest.slug)}
            </p>
          ) : null}
        </div>
      </section>

      {/* ── LATEST ISSUE ───────────────────── */}
      {latest ? (
        <section className="latest container" aria-labelledby="latest-title">
          <Link to={`/letter/${latest.slug}`} className="latest__media" aria-hidden="true" tabIndex={-1}>
            <ImageSlot image={latest.cover} ratio="cover" label="COVER" eager showCaption={false} />
            <span className="latest__stamp">
              <span>{parseSlug(latest.slug).monthShort}</span>
              <strong>{pad2(parseSlug(latest.slug).month)}</strong>
            </span>
          </Link>
          <div className="latest__body">
            <div className="latest__tags">
              <span className="pill pill--dark">LATEST ISSUE</span>
              <span className="eyebrow">{issueLabelKo(latest.slug)}</span>
            </div>
            <h2 id="latest-title" className="latest__title">
              {latest.title}
            </h2>
            <p className="latest__subtitle">{latest.subtitle}</p>
            <p className="latest__summary">{latest.summary}</p>
            <div className="latest__foot">
              <Link to={`/letter/${latest.slug}`} className="btn btn--dark">
                최신호 읽기 <span aria-hidden="true">→</span>
              </Link>
              <span className="latest__date">{dotDate(latest.publishedAt)} 발행</span>
            </div>
          </div>
        </section>
      ) : (
        <section className="container empty-note">첫 번째 NALA LETTER를 준비하고 있어요.</section>
      )}

      {/* ── ABOUT THE LETTER ───────────────── */}
      <section className="about">
        <div className="container about__inner">
          <p className="eyebrow">ABOUT THE LETTER</p>
          <p className="about__lead">
            NALA LETTER는 나라필라테스가 매달 전하는 <br className="br-md" />
            움직임과 일상의 기록입니다.
          </p>
          <p className="about__text">
            수업 안팎에서 함께한 활동, 몸을 이해하는 운동 이야기, 센터의 새로운 소식을 한 권의 매거진처럼 담았어요.
            운동을 쉬고 있는 분도, 오늘 처음 들른 분도 편하게 읽어주세요.
          </p>
          <ul className="pillars">
            {PILLARS.map((p, i) => (
              <li key={p.en} className="pillar">
                <span className="pillar__num">{pad2(i + 1)}</span>
                <span className="pillar__en">{p.en}</span>
                <span className="pillar__ko">{p.ko}</span>
                <span className="pillar__text">{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PRESS ──────────────────────────── */}
      {site.press.length > 0 ? (
        <section className="press container" aria-labelledby="press-title">
          <p id="press-title" className="eyebrow">
            PRESS & AWARDS
          </p>
          <ul className="press__list">
            {site.press.map((x) => (
              <li key={x.url}>
                <a className="press__item" href={x.url} target="_blank" rel="noopener noreferrer">
                  <span className="press__meta">
                    <span className="pill pill--dark">{x.badge}</span>
                    <span>
                      {x.outlet} · {dotDate(x.date)}
                    </span>
                  </span>
                  <span className="press__title">{x.title}</span>
                  <span className="press__more">기사 보기 ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* ── PREVIOUS ISSUES ────────────────── */}
      <section className="issues container" aria-labelledby="issues-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">BACK ISSUES</p>
            <h2 id="issues-title" className="section-head__title">
              지난 NALA LETTER
            </h2>
          </div>
          <Link to="/archive" className="text-link">
            전체 아카이브 →
          </Link>
        </div>

        {previous.length > 0 ? (
          <div className="issues__list">
            {previous.slice(0, 4).map((l) => (
              <LetterCard key={l.slug} letter={l} variant="row" />
            ))}
          </div>
        ) : (
          <p className="issues__empty">
            지금은 <strong>{latest ? issueLabelKo(latest.slug) : '첫 호'}</strong>가 첫 번째 이야기예요. 매달 발행되는
            NALA LETTER는 이곳과 아카이브에 차곡차곡 보관됩니다.
          </p>
        )}

        <div className="month-jump" aria-label="월별 아카이브 바로가기">
          {years.map(({ year, items }) => (
            <div key={year} className="month-jump__year">
              <span className="month-jump__label">{year}</span>
              <div className="month-jump__chips">
                {[...items].reverse().map((l) => (
                  <Link key={l.slug} to={`/letter/${l.slug}`} className="chip">
                    {parseSlug(l.slug).month}월
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STUDIO ─────────────────────────── */}
      <StudioBlock />
    </>
  );
}
