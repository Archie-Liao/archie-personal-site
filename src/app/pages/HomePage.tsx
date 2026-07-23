import { useMemo } from "react";
import { SiteLink } from "../components/SiteLink";
import { SiteAnchor } from "../components/SiteAnchor";
import { siteConfig } from "../site.config";
import { getDiaryDayCount } from "../utils/dayCount";
import { getLatestPost, getTopPostsByViews, getFeaturedPosts, getRecentPosts } from "../data/posts";
import { HeroIllustration } from "../components/HeroIllustration";
import { DailyPunch } from "../components/DailyPunch";
import { PublishDensityChart } from "../components/PublishDensityChart";
import { StatBand } from "../components/StatBand";
import { HomeHeroByline } from "../components/HomeHeroByline";
import { HomeHeroTitle } from "../components/HomeHeroTitle";
import { HeroTitleBackdrop } from "../components/HeroTitleBackdrop";
import { buildHeroTitleBackdrop } from "../utils/heroTitleBackdrop";
import { AuthorNote } from "../components/AuthorNote";
import { HomeCardFolio } from "../components/HomeCardFolio";
import { formatHomeCardMeta, formatHomeTimelineDek, getPostListMarker } from "../utils/postPlatform";

export function HomePage() {
  const dayCount = getDiaryDayCount(siteConfig.dayOneDate);
  const latest = getLatestPost();
  const featured = getFeaturedPosts().find((p) => p.id !== latest.id) ?? latest;
  const topThree = getTopPostsByViews(3);
  const recent = getRecentPosts(8);
  const heroBackdrop = useMemo(() => buildHeroTitleBackdrop(), []);

  return (
    <div className="home-page">
      {/* 第一屏：顶栏外 = 金句条 + Hero；StatBand 及以下须滚出首屏 */}
      <div className="home-first-screen">
        <DailyPunch />

        {/* A1-1 Hero — benchmark 双栏 + D4 cutout */}
        <section className="home-hero wrap" aria-label="Hero">
          <div className="home-hero__grid">
            <div className="home-hero__left">
              <div className="home-hero__eyebrow">
                <span className="home-hero__bar" />
                <span className="home-eyebrow">卷首 · Vol. {dayCount} · Since {siteConfig.dayOneDate.slice(0, 4)}</span>
              </div>
              <div className="home-hero__title-wrap">
                <HeroTitleBackdrop blocks={heroBackdrop.blocks} roughSeed={heroBackdrop.roughSeed} />
                <HomeHeroTitle />
              </div>
              <p className="home-hero__meta">
                视频日记作者 · 日更 · Day {dayCount}
                <span className="home-hero__meta-sep"> · </span>
                知识归档
              </p>
              <p className="home-tagline-zh">{siteConfig.tagline}</p>
              <p className="home-intro">
                视频日记 + 网络优质内容（当前以 AI 为主）的沉淀归档。
                一部不会完结的生命之书：每一条日记是一页，每一次成长是一章。
              </p>
              <div className="home-hero__cta">
                <SiteLink to="/posts" className="home-link-primary">
                  读最新一期
                </SiteLink>
                <SiteLink to="/about" className="home-link-quiet">
                  关于我 →
                </SiteLink>
              </div>
              <HomeHeroByline dayCount={dayCount} />
            </div>
            <div className="home-hero__right home-hero__cutout">
              <HeroIllustration />
            </div>
          </div>
        </section>
      </div>

      <StatBand />

      <div className="wrap">
        <AuthorNote />
      </div>

      {/* A1-7 精选三卡 */}
      <section className="home-selected wrap" aria-label="精选入口">
        <div className="home-section-head">
          <h2>精选入口</h2>
          <span className="home-section-sub">Selected Entries</span>
        </div>
        <div className="home-cards">
          <article className="home-card">
            <div className="home-card__top">
              <span className="home-eyebrow">最新一期</span>
              <HomeCardFolio post={latest} />
            </div>
            <h3>
              <SiteLink to={`/post/${latest.id}`}>{latest.title}</SiteLink>
            </h3>
            <p className="home-card__meta">{formatHomeCardMeta(latest)}</p>
            <p className="home-card__tags">{latest.tags.join(" · ")}</p>
            <SiteLink to={`/post/${latest.id}`} className="home-card__more">
              阅读这一期 →
            </SiteLink>
          </article>

          <article className="home-card">
            <div className="home-card__top">
              <span className="home-eyebrow">编辑精选</span>
              <HomeCardFolio post={featured} />
            </div>
            <h3>
              <SiteLink to={`/post/${featured.id}`}>{featured.title}</SiteLink>
            </h3>
            <p className="home-card__meta">{formatHomeCardMeta(featured)}</p>
            <p className="home-card__tags">{featured.tags.join(" · ")}</p>
            <SiteLink to={`/post/${featured.id}`} className="home-card__more">
              阅读这一期 →
            </SiteLink>
          </article>

          <article className="home-card">
            <span className="home-eyebrow">本周热门</span>
            <ul className="home-hot-list">
              {topThree.map((p, i) => (
                <li key={p.id}>
                  <SiteLink to={`/post/${p.id}`}>
                    <span className="home-hot-n">{i + 1}</span>
                    {p.title}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <PublishDensityChart />

      {/* A1-8 往期时间线 */}
      <section className="home-timeline wrap" aria-label="往期时间线">
        <div className="home-section-head">
          <h2>往期时间线</h2>
          <SiteLink to="/posts" className="home-section-sub" style={{ textDecoration: "none" }}>
            全部日记 →
          </SiteLink>
        </div>
        <div className="home-timeline__list">
          {recent.map((p, i) => {
            const marker = getPostListMarker(p);
            return (
              <SiteLink key={p.id} to={`/post/${p.id}`} className="home-t-row">
                <span className="home-t-folio">
                  {marker.kind === "episode" ? (
                    <>
                      <span className="home-t-folio__num">{marker.value}</span>
                      <span className="home-t-folio__lab">Day</span>
                    </>
                  ) : (
                    <span className="home-t-folio__platform">{marker.value}</span>
                  )}
                </span>
                <span className="home-t-stripe" aria-hidden="true" data-stripe={i % 3} />
                <span className="home-t-main">
                  <span className="home-t-title">{p.title}</span>
                  <span className="home-t-dek">{formatHomeTimelineDek(p)}</span>
                </span>
                <span className="home-t-date">{p.date}</span>
              </SiteLink>
            );
          })}
        </div>
      </section>

      {/* 底部引导 */}
      <section className="home-footer-cta wrap">
        <p>在 B 站、小红书关注我，或前往 GitHub 查看开源项目</p>
        <div className="home-footer-cta__links">
          <a href={siteConfig.links.bilibili} target="_blank" rel="noopener noreferrer">
            B站
          </a>
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={siteConfig.links.xiaohongshu} target="_blank" rel="noopener noreferrer">
            小红书
          </a>
          <SiteAnchor href="#top">顶部</SiteAnchor>
        </div>
      </section>

      <style>{`
        .home-hero__right { position: relative; }
        .home-hero__cutout {
          display: flex; align-items: center; justify-content: center;
          padding: 1rem 0;
        }
        .home-hero__cutout .hero-cutout {
          transform: rotate(2.5deg);
          transition: transform 0.25s var(--snap, ease);
        }
        .home-hero__cutout:hover .hero-cutout {
          transform: rotate(1deg) translateY(-4px);
        }
        .wrap { max-width: 72rem; margin: 0 auto; padding: 0 1.75rem; }
        .home-eyebrow {
          font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.26em;
          text-transform: uppercase; color: var(--primary-deep, var(--terracotta));
        }
        /* 首屏：顶栏下 = 金句条 + Hero；时间/月历滚出首屏 */
        .home-first-screen {
          min-height: calc(100dvh - var(--site-header-h, 3.5rem));
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        .home-hero.wrap {
          /* 双栏整体居中收束，勿拉满视口造成左右空、中间散 */
          max-width: min(68rem, 100%);
          margin-left: auto;
          margin-right: auto;
          padding-left: clamp(1.25rem, 3vw, 2rem);
          padding-right: clamp(1.25rem, 3vw, 2rem);
          width: 100%;
        }
        .home-hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1.25rem 0 1.75rem;
          box-sizing: border-box;
        }
        .home-hero__grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: clamp(1.1rem, 2.2vw, 1.85rem);
          align-items: center;
          min-height: 0;
          width: 100%;
        }
        @media (max-width: 900px) {
          .home-hero__grid { grid-template-columns: 1fr; gap: 1.75rem; }
          .home-first-screen { min-height: auto; }
          .home-hero { padding: 1.5rem 0; }
        }
        .home-hero__eyebrow { display: flex; align-items: center; gap: 0.65rem; margin-bottom: 1.15rem; }
        .home-hero__title-wrap {
          position: relative;
          isolation: isolate;
          display: inline-block;
          max-width: 100%;
          vertical-align: top;
          overflow: visible;
        }
        .home-hero__title-wrap .home-hero-display {
          position: relative;
          z-index: 1;
        }
        .home-hero__bar { width: 1.75rem; height: 2px; background: var(--primary); flex-shrink: 0; }
        /* L3 眉题：极小、弱对比 */
        .home-hero__left .home-eyebrow {
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--muted-foreground) 78%, var(--foreground));
        }
        .home-hero-display { margin: 0; line-height: 1; }
        /* L1 主名：压倒性字号 · 方案 A 马善政（仅 Hero） */
        .home-hero-display__zh {
          display: block;
          font-family: var(--font-hero-zh);
          font-weight: 400;
          font-size: clamp(3.15rem, 9.5vw, 5.75rem);
          letter-spacing: 0.06em;
          color: var(--logo-wordmark-ink, #633323);
          line-height: 0.98;
        }
        /* L1b 英文：浅底用站内橙强调（非深色站金）· 与中文胡桃墨拉开 */
        .home-hero-display__en {
          display: block;
          margin-top: 0.2rem;
          margin-left: 0.04em;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 600;
          font-size: clamp(2.35rem, 7vw, 4.35rem);
          letter-spacing: 0.01em;
          color: var(--primary-deep, var(--primary));
          line-height: 1.02;
        }
        .home-hero-display__dot {
          color: var(--primary);
          font-style: normal;
          margin-left: 0.02em;
        }
        /* L3 身份条：标题下的小字 meta */
        .home-hero__meta {
          margin: 1.1rem 0 0;
          max-width: 36rem;
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          line-height: 1.55;
          color: color-mix(in srgb, var(--muted-foreground) 88%, transparent);
        }
        .home-hero__meta-sep { letter-spacing: 0.08em; opacity: 0.7; }
        /* L2 金句标语：明显小于标题，明显高于说明 */
        .home-tagline-zh {
          margin: 1.35rem 0 0;
          font-family: var(--font-serif);
          font-size: clamp(1.2rem, 2.4vw, 1.55rem);
          font-weight: 600;
          letter-spacing: 0.04em;
          line-height: 1.45;
          color: var(--foreground);
          max-width: 28rem;
        }
        /* L3 说明：再降一档 */
        .home-intro {
          margin: 0.85rem 0 0;
          max-width: min(34rem, 100%);
          font-size: 0.875rem;
          line-height: 1.7;
          color: color-mix(in srgb, var(--muted-foreground) 92%, transparent);
        }
        .home-hero__cta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.15rem 1.5rem;
          align-items: center;
          margin-top: 1.65rem;
        }
        .home-link-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.7rem 1.2rem;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-decoration: none;
          color: var(--primary-foreground, #fdf9f5);
          background: var(--primary);
          border-radius: 2px;
          transition: background 0.15s var(--snap, ease), transform 0.15s var(--snap, ease);
        }
        .home-link-primary:hover {
          background: var(--primary-deep, var(--primary));
          transform: translateY(-1px);
        }
        .home-link-quiet {
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: var(--muted-foreground);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          padding-bottom: 2px;
        }
        .home-link-quiet:hover {
          color: var(--foreground);
          border-bottom-color: color-mix(in srgb, var(--primary) 55%, transparent);
        }
        .home-hero__left .home-hero-byline {
          margin-top: 1.75rem;
          opacity: 0.92;
        }
        .home-section-head {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);
        }
        .home-section-head h2 { margin: 0; font-family: var(--font-serif); font-size: 1.75rem; letter-spacing: 0.04em; }
        .home-section-sub { font-size: 0.8125rem; color: var(--muted-foreground); letter-spacing: 0.04em; }
        .home-selected { padding-bottom: 5rem; }
        .home-cards { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--border); }
        @media (max-width: 900px) { .home-cards { grid-template-columns: 1fr; } }
        .home-card {
          padding: 2.25rem 1.875rem 2rem; border-right: 1px solid var(--border); position: relative;
        }
        .home-card:last-child { border-right: 0; }
        @media (max-width: 900px) { .home-card { border-right: 0; border-bottom: 1px solid var(--border); } }
        .home-card__top {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 1.125rem; gap: 0.75rem;
        }
        .home-card .home-eyebrow {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: var(--primary-deep, var(--terracotta));
        }
        .home-folio {
          font-family: var(--font-display); font-style: italic;
          font-size: 1.625rem; line-height: 1;
          color: color-mix(in srgb, var(--primary) 18%, transparent);
        }
        .home-folio--platform {
          font-family: var(--font-cond, var(--font-display));
          font-style: normal;
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: 0.05em;
          color: color-mix(in srgb, var(--muted-foreground) 55%, var(--primary));
        }
        .home-card h3 {
          margin: 0 0 0.875rem;
          font-family: var(--font-serif);
          font-size: clamp(1.3125rem, 2.4vw, 1.4375rem);
          font-weight: 700;
          line-height: 1.42;
          letter-spacing: 0.02em;
          color: var(--foreground);
        }
        .home-card h3 a { text-decoration: none; color: inherit; }
        .home-card h3 a:hover { color: var(--primary-deep, var(--primary)); }
        .home-card__meta {
          font-size: 0.875rem;
          color: var(--muted-foreground);
          margin: 0 0 0.5rem;
          letter-spacing: 0.04em;
        }
        .home-card__tags {
          font-size: 0.8125rem;
          color: color-mix(in srgb, var(--muted-foreground) 88%, transparent);
          margin: 0;
          letter-spacing: 0.06em;
        }
        .home-card__more {
          display: inline-block; margin-top: 1.375rem;
          font-size: 0.875rem; font-weight: 600;
          letter-spacing: 0.05em;
          border-bottom: 1.5px solid var(--primary);
          text-decoration: none; color: var(--foreground);
        }
        .home-card__more:hover { color: var(--primary-deep, var(--primary)); }
        .home-hot-list { list-style: none; margin: 0.75rem 0 0; padding: 0; }
        .home-hot-list li { border-bottom: 1px solid var(--border); padding: 0.75rem 0; }
        .home-hot-list li:last-child { border-bottom: 0; }
        .home-hot-list a {
          display: flex; gap: 0.875rem; align-items: baseline;
          text-decoration: none; color: inherit;
          font-family: var(--font-serif);
          font-size: 0.9375rem; font-weight: 600; line-height: 1.45;
        }
        .home-hot-list a:hover { color: var(--primary-deep, var(--primary)); }
        .home-hot-n {
          font-family: var(--font-display); font-style: italic;
          font-size: 1rem; font-weight: 600;
          color: var(--primary-deep, var(--primary));
          flex-shrink: 0; width: 1.125rem;
        }
        .home-timeline { padding-bottom: 5rem; }
        .home-timeline__list { border: 1px solid var(--border); }
        .home-t-row {
          display: grid;
          grid-template-columns: 4.75rem 6px 1fr auto;
          gap: 0.75rem 1.25rem;
          padding: 1.125rem 1.5rem;
          border-bottom: 1px solid var(--border);
          align-items: start;
          text-decoration: none;
          color: inherit;
          transition: padding-left 0.2s ease, background 0.15s ease;
        }
        .home-t-row:last-child { border-bottom: 0; }
        .home-t-row:hover,
        .home-t-row:focus-visible {
          padding-left: 1.85rem;
          background: color-mix(in srgb, var(--punch) 4%, transparent);
          outline: none;
        }
        .home-t-folio {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1;
          min-width: 0;
        }
        .home-t-folio__num {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(1.625rem, 3.2vw, 2.125rem);
          line-height: 1;
          color: var(--primary-deep, var(--primary));
          transition: color 0.2s ease;
        }
        .home-t-row:hover .home-t-folio__num,
        .home-t-row:focus-visible .home-t-folio__num {
          color: var(--punch);
        }
        .home-t-folio__lab {
          margin-top: 0.2rem;
          font-family: var(--font-cond, var(--font-body));
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        .home-t-folio__platform {
          font-family: var(--font-cond, var(--font-body));
          font-size: 0.8125rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          line-height: 1.25;
          color: var(--primary-deep, var(--primary));
        }
        .home-t-stripe {
          width: 6px;
          height: 2.75rem;
          align-self: center;
          background: var(--punch);
          transform: scaleY(0);
          transform-origin: bottom center;
          transition: transform 0.2s ease;
        }
        .home-t-stripe[data-stripe="1"] { background: var(--ink-green); }
        .home-t-stripe[data-stripe="2"] { background: var(--primary); }
        .home-t-row:hover .home-t-stripe,
        .home-t-row:focus-visible .home-t-stripe {
          transform: scaleY(1);
        }
        .home-t-main {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .home-t-title {
          display: block;
          font-family: var(--font-serif);
          font-size: clamp(1.125rem, 2.1vw, 1.25rem);
          font-weight: 600;
          line-height: 1.35;
          color: var(--foreground);
          transition: color 0.2s ease;
        }
        .home-t-row:hover .home-t-title,
        .home-t-row:focus-visible .home-t-title {
          color: var(--primary-deep, var(--primary));
        }
        .home-t-dek {
          display: block;
          font-family: var(--font-body);
          font-size: 0.8125rem;
          line-height: 1.45;
          color: var(--muted-foreground);
        }
        .home-t-date {
          font-size: 0.75rem;
          color: var(--muted-foreground);
          white-space: nowrap;
          padding-top: 0.2rem;
          letter-spacing: 0.04em;
        }
        @media (max-width: 640px) {
          .home-t-row {
            grid-template-columns: 3.5rem 5px 1fr;
            gap: 0.5rem 0.75rem;
          }
          .home-t-date { grid-column: 3; padding-top: 0; font-size: 0.6875rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .home-t-stripe {
            transform: scaleY(0.9);
            transition: opacity 0.15s ease;
          }
          .home-t-row:hover .home-t-stripe,
          .home-t-row:focus-visible .home-t-stripe {
            transform: scaleY(0.9);
            opacity: 1;
          }
        }
        .home-footer-cta {
          margin-bottom: 3rem; padding: 2rem; border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--accent); display: flex; flex-wrap: wrap;
          justify-content: space-between; align-items: center; gap: 1.25rem;
        }
        .home-footer-cta p { margin: 0; font-size: 0.875rem; color: var(--muted-foreground); }
        .home-footer-cta__links { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .home-footer-cta__links a {
          padding: 0.5rem 1rem; font-size: 0.875rem; text-decoration: none;
          border: 1px solid var(--border); color: var(--foreground); transition: border-color 0.15s, color 0.15s;
        }
        .home-footer-cta__links a:hover { border-color: var(--primary); color: var(--primary); }
        .home-footer-cta__links a:first-child {
          background: var(--primary); color: var(--primary-foreground); border-color: var(--primary);
        }
      `}</style>
    </div>
  );
}
