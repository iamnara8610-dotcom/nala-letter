import { site } from '../config/site';
import { Link } from '../lib/router';
import { externalProps } from '../lib/links';

export function Footer() {
  const s = site.studio;
  const sns = [
    { label: `Instagram ${s.instagramHandle}`, href: site.links.instagram },
    { label: '카카오톡 채널', href: site.links.kakao },
    { label: '네이버 플레이스', href: site.links.naverPlace },
  ].filter((x) => x.href);

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <p className="wordmark wordmark--lg">{site.brand}</p>
          <p className="site-footer__mag">
            <span className="serif-italic">{site.title}</span> · {site.tagline}
          </p>
        </div>

        <dl className="site-footer__info">
          {s.address ? (
            <div>
              <dt>ADDRESS</dt>
              <dd>{s.address}</dd>
            </div>
          ) : null}
          {s.phone ? (
            <div>
              <dt>CALL</dt>
              <dd>
                <a href={`tel:${s.phone.replace(/[^0-9+]/g, '')}`}>{s.phone}</a>
              </dd>
            </div>
          ) : null}
          {s.hours ? (
            <div>
              <dt>HOURS</dt>
              <dd>{s.hours}</dd>
            </div>
          ) : null}
        </dl>

        <ul className="site-footer__sns">
          {sns.map((x) => (
            <li key={x.href}>
              <a href={x.href} {...externalProps}>
                {x.label} ↗
              </a>
            </li>
          ))}
          <li>
            <Link to="/archive">지난 NALA LETTER 모두 보기 →</Link>
          </li>
        </ul>
      </div>
      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} {site.brand}. All rights reserved.</span>
      </div>
    </footer>
  );
}
