import { Link, useLocation } from "react-router";
import { SiteLink } from "./SiteLink";
import { SiteLogo } from "./SiteLogo";
import { siteConfig } from "../site.config";
import { getDiaryDayCount } from "../utils/dayCount";
import { posts } from "../data/posts";
import { ButterflyLine } from "./Decorations";

const siteLinks = [
  { href: "/", label: "首页", sub: "Home" },
  { href: "/posts", label: "视频日记", sub: "Diary index" },
  { href: "/graph", label: "知识图谱", sub: "Tag graph" },
  { href: "/galaxy", label: "思维星系", sub: "Mental lattice" },
  { href: "/feedback", label: "反馈", sub: "Feedback" },
  { href: "/about", label: "关于我", sub: "About" },
] as const;

const externalLinks = [
  { href: siteConfig.links.bilibili, label: "哔哩哔哩", ext: "B 站 ↗", motion: "bili" as const },
  { href: siteConfig.links.github, label: "GitHub", ext: "Archie-Liao ↗", motion: "git" as const },
  { href: siteConfig.links.xiaohongshu, label: "小红书", ext: "RED ↗", motion: "xhs" as const },
] as const;

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function SiteFooter() {
  const location = useLocation();
  const dayCount = getDiaryDayCount(siteConfig.dayOneDate);
  const issueCount = posts.length;
  const dayOneLabel = siteConfig.dayOneDate.replace(/-/g, ".");

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__issue" aria-hidden="true">
        <span>Archie Field Journal · Day {dayCount}</span>
        <span>Vol. {String(issueCount).padStart(3, "0")} archived</span>
      </div>

      <div className="site-footer__inner">
        <div className="site-footer__rule" aria-hidden="true" />

        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link
              to="/"
              className="site-footer__name"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <SiteLogo variant="footer" />
            </Link>
            <p className="site-footer__tagline">
              {siteConfig.tagline}
              <em>{siteConfig.taglineEn}</em>
            </p>
            <p className="site-footer__meta">
              视频日记 + 优质内容归档 · 自 {dayOneLabel} 起 · 第 {dayCount} 天
            </p>
          </div>

          <nav className="site-footer__col" aria-label="站内导航">
            <h4>站内 · Site</h4>
            {siteLinks.map((link) =>
              link.href === "/" ? (
                <Link key={link.href} to={link.href}>
                  {link.label}
                  <span className="site-footer__ext">{link.sub}</span>
                </Link>
              ) : (
                <SiteLink key={link.href} to={link.href}>
                  {link.label}
                  <span className="site-footer__ext">{link.sub}</span>
                </SiteLink>
              )
            )}
          </nav>

          <div className="site-footer__col">
            <h4>关注 · Elsewhere</h4>
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`site-footer__link site-footer__link--${link.motion}`}
              >
                {link.label}
                <span className="site-footer__ext">{link.ext}</span>
              </a>
            ))}
            <button
              type="button"
              className="site-footer__top-inline site-footer__link site-footer__link--top"
              onClick={scrollToTop}
            >
              回到顶部 ↑
            </button>
          </div>

          <div className="site-footer__colophon" aria-hidden="true">
            <div className="site-footer__plate">
              <ButterflyLine width={64} color="var(--primary)" />
            </div>
            <p className="site-footer__plate-cap">
              Colophon
              <br />
              Field Journal
            </p>
          </div>
        </div>

        <div className="site-footer__end">
          <p className="site-footer__copy">
            © {new Date().getFullYear()} {siteConfig.name} · 生命之书 · 自 {dayOneLabel} 起日更
          </p>
          <button type="button" className="site-footer__top site-footer__link site-footer__link--top" onClick={scrollToTop}>
            回到顶部 ↑
          </button>
        </div>
      </div>

      <style>{`
        .site-footer {
          margin-top: 3rem;
          border-top: 1px solid var(--border);
          background: color-mix(in srgb, var(--secondary) 35%, var(--background));
        }
        .site-footer__issue {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 0.5rem 1rem;
          padding: 0.45rem 1.5rem;
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--background) 88%, white);
          background: linear-gradient(
            105deg,
            var(--punch, var(--primary)) 0%,
            color-mix(in srgb, var(--punch, var(--primary)) 75%, var(--foreground)) 100%
          );
        }
        .site-footer__inner {
          max-width: 72rem;
          margin: 0 auto;
          padding: 2.75rem 1.5rem 2.25rem;
        }
        .site-footer__rule {
          width: 3.5rem;
          height: 2px;
          margin-bottom: 2.25rem;
          background: var(--primary);
        }
        .site-footer__grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr 1fr auto;
          gap: 2.5rem 3rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .site-footer__grid {
            grid-template-columns: 1fr 1fr;
          }
          .site-footer__colophon { grid-column: 1 / -1; justify-self: start; }
        }
        @media (max-width: 540px) {
          .site-footer__grid { grid-template-columns: 1fr; gap: 2rem; }
        }
        .site-footer__name {
          display: inline-flex;
          text-decoration: none;
          color: inherit;
        }
        .site-footer__tagline {
          margin: 0.875rem 0 0;
          max-width: 18rem;
          font-size: 0.8125rem;
          line-height: 1.65;
          color: var(--muted-foreground);
        }
        .site-footer__tagline em {
          display: block;
          margin-top: 0.35rem;
          font-family: var(--font-display);
          font-style: italic;
          font-size: 0.75rem;
          color: color-mix(in srgb, var(--muted-foreground) 90%, transparent);
        }
        .site-footer__meta {
          margin: 0.75rem 0 0;
          max-width: 20rem;
          font-size: 0.6875rem;
          line-height: 1.55;
          letter-spacing: 0.04em;
          color: color-mix(in srgb, var(--muted-foreground) 85%, transparent);
        }
        .site-footer__col h4 {
          margin: 0 0 0.875rem;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        .site-footer__col a,
        .site-footer__top-inline {
          display: block;
          width: 100%;
          padding: 0.3rem 0;
          font-size: 0.875rem;
          color: var(--foreground);
          text-decoration: none;
          text-align: left;
          background: none;
          border: 0;
          cursor: pointer;
          font-family: inherit;
        }
        .site-footer__link {
          transition: color 0.2s ease, transform 0.2s ease, letter-spacing 0.2s ease;
        }
        .site-footer__col a:not(.site-footer__link):hover,
        .site-footer__top-inline:not(.site-footer__link--top):hover {
          color: var(--primary);
        }
        /* D4 · 分平台动效 */
        .site-footer__link--bili:hover,
        .site-footer__link--bili:focus-visible {
          color: #00a1d6;
          transform: translateX(6px);
        }
        .site-footer__link--git:hover,
        .site-footer__link--git:focus-visible {
          color: var(--foreground);
          letter-spacing: 0.06em;
        }
        .site-footer__link--xhs:hover,
        .site-footer__link--xhs:focus-visible {
          color: var(--punch);
          transform: skewX(-4deg);
        }
        .site-footer__link--top:hover,
        .site-footer__link--top:focus-visible {
          color: var(--ink-green);
          transform: translateY(-3px);
        }
        @media (prefers-reduced-motion: reduce) {
          .site-footer__link:hover,
          .site-footer__link:focus-visible {
            transform: none;
            letter-spacing: inherit;
          }
        }
        .site-footer__ext {
          margin-left: 0.4rem;
          font-size: 0.6875rem;
          font-family: var(--font-display);
          font-style: italic;
          color: var(--muted-foreground);
        }
        .site-footer__colophon {
          width: 7.5rem;
          text-align: center;
        }
        .site-footer__plate {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 9rem;
          padding: 1rem;
          border: 1px solid var(--border);
          background: var(--card);
        }
        .site-footer__plate-cap {
          margin: 0.5rem 0 0;
          font-family: var(--font-display);
          font-style: italic;
          font-size: 0.6875rem;
          line-height: 1.45;
          color: var(--muted-foreground);
        }
        .site-footer__end {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 2.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
        }
        .site-footer__copy {
          margin: 0;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          color: var(--muted-foreground);
        }
        .site-footer__top {
          padding: 0 0 2px;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--foreground);
          background: none;
          border: 0;
          border-bottom: 1.5px solid var(--primary);
          cursor: pointer;
          font-family: inherit;
        }
        @media (max-width: 900px) {
          .site-footer__top-inline { display: none; }
        }
        @media (min-width: 901px) {
          .site-footer__end .site-footer__top { display: none; }
        }
      `}</style>
    </footer>
  );
}
