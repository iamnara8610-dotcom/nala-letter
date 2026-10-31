import { groupByYear, latestLetter, letters } from '../content/letters';
import { LetterCard } from '../components/LetterCard';
import { usePageMeta } from '../components/usePageMeta';
import { Link } from '../lib/router';

export function ArchivePage() {
  usePageMeta('Archive', '지금까지 발행된 NALA LETTER를 연도별·월별로 모아두었어요.');
  const years = groupByYear();

  return (
    <div className="archive">
      <header className="archive-hero container">
        <p className="eyebrow">ARCHIVE</p>
        <h1 className="archive-hero__title">
          All <em>Letters</em>
        </h1>
        <p className="archive-hero__text">
          지금까지 발행된 NALA LETTER를 모두 모아두었어요. <br className="br-md" />
          보고 싶은 달을 눌러 다시 읽어보세요.
        </p>
        <p className="archive-hero__count">총 {letters.length}개의 호</p>
      </header>

      {years.map(({ year, items }) => {
        const byMonth = new Map(items.map((l) => [Number(l.slug.slice(5, 7)), l]));
        return (
          <section key={year} id={`y${year}`} className="archive-year container" aria-label={`${year}년`}>
            <div className="archive-year__head">
              <h2 className="archive-year__title">{year}</h2>
              <span className="archive-year__count">{items.length} ISSUES</span>
            </div>

            {/* 12개월 인덱스: 발행된 달만 눌러서 이동 */}
            <ol className="month-index" aria-label={`${year}년 월별 바로가기`}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
                const l = byMonth.get(m);
                return (
                  <li key={m}>
                    {l ? (
                      <Link to={`/letter/${l.slug}`} className="month-index__cell is-on">
                        {m}
                      </Link>
                    ) : (
                      <span className="month-index__cell" aria-hidden="true">
                        {m}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="archive-grid">
              {items.map((l) => (
                <LetterCard key={l.slug} letter={l} isLatest={l.slug === latestLetter?.slug} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
