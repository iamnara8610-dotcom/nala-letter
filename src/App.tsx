import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useLocation } from './lib/router';
import { HomePage } from './pages/HomePage';
import { LetterPage } from './pages/LetterPage';
import { ArchivePage } from './pages/ArchivePage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * 주소 규칙
 *  /                 메인 (최신호 자동 표시)
 *  /letter/YYYY-MM   뉴스레터 상세
 *  /archive          아카이브
 */
function route(path: string) {
  const clean = path.replace(/\/+$/, '').replace(/\/index\.html$/, '') || '/';
  if (clean === '/') return <HomePage />;
  if (clean === '/archive') return <ArchivePage />;
  const m = clean.match(/^\/letter\/(\d{4}-\d{2})$/);
  if (m) return <LetterPage key={m[1]} slug={m[1]} />;
  return <NotFoundPage />;
}

export default function App() {
  const { path } = useLocation();
  return (
    <div className="app">
      <a href="#main" className="skip-link">
        본문 바로가기
      </a>
      <Header path={path} />
      <main id="main">{route(path)}</main>
      <Footer />
    </div>
  );
}
