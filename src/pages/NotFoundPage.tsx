import { usePageMeta } from '../components/usePageMeta';
import { Link } from '../lib/router';

export function NotFoundPage() {
  usePageMeta('페이지를 찾을 수 없어요');
  return (
    <section className="not-found container">
      <p className="eyebrow">404</p>
      <h1 className="not-found__title">
        Lost in <em>motion</em>
      </h1>
      <p>찾으시는 페이지가 없거나 아직 공개되지 않은 호예요.</p>
      <div className="not-found__actions">
        <Link to="/" className="btn btn--dark">
          최신호 보기
        </Link>
        <Link to="/archive" className="btn btn--ghost">
          아카이브
        </Link>
      </div>
    </section>
  );
}
