import { site } from '../config/site';
import { Link } from '../lib/router';
import { consultUrl, externalProps } from '../lib/links';

export function Header({ path }: { path: string }) {
  const isArchive = path.startsWith('/archive');
  const isHome = path === '/';
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="wordmark" aria-label={`${site.brand} — NALA LETTER 홈`}>
          {site.brand}
        </Link>
        <nav className="site-nav" aria-label="주요 메뉴">
          <Link to="/" className={`site-nav__link ${isHome ? 'is-active' : ''}`}>
            Letter
          </Link>
          <Link to="/archive" className={`site-nav__link ${isArchive ? 'is-active' : ''}`}>
            Archive
          </Link>
          <a className="pill pill--dark pill--link" href={consultUrl()} {...externalProps}>
            상담
          </a>
        </nav>
      </div>
    </header>
  );
}
