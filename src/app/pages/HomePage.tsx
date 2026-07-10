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
import { formatHomeCardMeta, formatHomeTimelineLabel } from "../utils/postPlatform";

export function HomePage() {
  const dayCount = getDiaryDayCount(siteConfig.dayOneDate);
  const latest = getLatestPost();
  const featured = getFeaturedPosts().find((p) => p.id !== latest.id) ?? latest;
  const topThree = getTopPostsByViews(3);
  const recent = getRecentPosts(8);
  const heroBackdrop = useMemo(() => buildHeroTitleBackdrop(), []);

  return (
    <div className="home-page">
      <DailyPunch />

      {/* A1-1 Hero — benchmark 双栏 + D4 cutout */}
      <section className="home-hero wrap" aria-label="Hero">
        <div className="home-hero__grid">
          <div className="home-hero__left">
            <div className="home-hero__eyebrow">
              <span className="home-hero__bar" />
              <span className="home-eyebrow">卷首 · Vol. {dayCount}</span>
            </div>
            <div className="home-hero__title-wrap">
              <HeroTitleBackdrop blocks={heroBackdrop.blocks} roughSeed={heroBackdrop.roughSeed} />
              <HomeHeroTitle />
            </div>
            <p className="home-tagline-zh">{siteConfig.tagline}</p>
            <p className="home-tagline-en">{siteConfig.taglineEn}</p>
            <p className="home-intro">
              视频日记 + 网络优质内容（当前以 AI 为主）的沉淀归档。
              <br />
              一部不会完结的生命之书：每一条日记是一页，每一次成长是一章。
            </p>
            <div className="home-hero__cta">
              <SiteLink to="/posts" className="home-link-arrow">
                读最新一期 →
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
          {recent.map((p) => (
            <SiteLink key={p.id} to={`/post/${p.id}`} className="home-t-row">
              <span className="home-t-day">{formatHomeTimelineLabel(p)}</span>
              <span className="home-t-title">{p.title}</span>
              <span className="home-t-date">{p.date}</span>
            </SiteLink>
          ))}
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
        .home-hero { padding: 3rem 0 2rem; }
        .home-hero__grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
          align-items: center; min-height: 28rem;
        }
        @media (max-width: 900px) { .home-hero__grid { grid-template-columns: 1fr; } }
        .home-hero__eyebrow { display: flex; align-items: center; gap: 0.875rem; margin-bottom: 1.5rem; }
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
        .home-hero__bar { width: 2.5rem; height: 2px; background: var(--primary); }
        .home-hero-display { margin: 0; line-height: 1; }
        .home-hero-display__zh {
          display: block;
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: clamp(2.125rem, 5.8vw, 3.5rem);
          letter-spacing: 0.05em;
          color: var(--foreground);
          line-height: 1.05;
        }
        .home-hero-display__en {
          display: block;
          margin-top: 0.35rem;
          margin-left: 0.06em;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 600;
          font-size: clamp(1.75rem, 4.8vw, 2.875rem);
          letter-spacing: 0.01em;
          color: var(--foreground);
          line-height: 1.08;
        }
        .home-hero-display__dot {
          color: var(--primary);
          font-style: normal;
          margin-left: 0.02em;
        }
        .home-tagline-zh {
          margin: 1.75rem 0 0; font-family: var(--font-serif); font-size: 1.25rem;
          letter-spacing: 0.06em; line-height: 1.6;
        }
        .home-tagline-en {
          margin: 0.4rem 0 0; font-family: var(--font-display); font-style: italic;
          font-size: 1rem; color: var(--muted-foreground);
        }
        .home-intro {
          margin: 1.5rem 0 0; max-width: 28rem; font-size: 0.96875rem;
          line-height: 1.78; color: var(--muted-foreground);
        }
        .home-hero__cta { display: flex; gap: 1.75rem; align-items: center; margin-top: 1.75rem; }
        .home-link-arrow {
          font-size: 0.9375rem; font-weight: 600; letter-spacing: 0.04em;
          border-bottom: 1.5px solid var(--primary); padding-bottom: 3px;
          text-decoration: none; color: var(--foreground);
        }
        .home-link-quiet { font-size: 0.9rem; color: var(--muted-foreground); text-decoration: none; }
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
          padding: 2rem 1.75rem; border-right: 1px solid var(--border); position: relative;
        }
        .home-card:last-child { border-right: 0; }
        @media (max-width: 900px) { .home-card { border-right: 0; border-bottom: 1px solid var(--border); } }
        .home-card__top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
        .home-folio { font-family: var(--font-display); font-style: italic; font-size: 2.25rem; color: color-mix(in srgb, var(--primary) 22%, transparent); }
        .home-folio--platform {
          font-family: var(--font-cond, var(--font-display));
          font-style: normal;
          font-weight: 800;
          font-size: 1.125rem;
          letter-spacing: 0.04em;
          color: color-mix(in srgb, var(--primary-deep, var(--terracotta)) 75%, transparent);
        }
        .home-card h3 { margin: 0 0 0.75rem; font-family: var(--font-serif); font-size: 1.2rem; font-weight: 600; line-height: 1.45; }
        .home-card h3 a { text-decoration: none; color: inherit; }
        .home-card h3 a:hover { color: var(--primary); }
        .home-card__meta { font-size: 0.8125rem; color: var(--muted-foreground); margin: 0 0 0.5rem; }
        .home-card__tags { font-size: 0.75rem; color: var(--muted-foreground); margin: 0; }
        .home-card__more { display: inline-block; margin-top: 1.25rem; font-size: 0.8125rem; font-weight: 600; border-bottom: 1px solid var(--primary); text-decoration: none; color: var(--foreground); }
        .home-hot-list { list-style: none; margin: 1.25rem 0 0; padding: 0; }
        .home-hot-list li { border-bottom: 1px solid var(--border); padding: 0.65rem 0; }
        .home-hot-list li:last-child { border-bottom: 0; }
        .home-hot-list a { display: flex; gap: 0.75rem; text-decoration: none; color: inherit; font-size: 0.875rem; font-family: var(--font-serif); }
        .home-hot-list a:hover { color: var(--primary); }
        .home-hot-n { font-family: var(--font-display); font-style: italic; color: var(--primary); flex-shrink: 0; }
        .home-timeline { padding-bottom: 5rem; }
        .home-timeline__list { border: 1px solid var(--border); }
        .home-t-row {
          display: grid; grid-template-columns: 5.5rem 1fr auto; gap: 1.25rem;
          padding: 1rem 1.5rem; border-bottom: 1px solid var(--border);
          align-items: baseline; text-decoration: none; color: inherit; transition: background 0.15s;
        }
        .home-t-row:last-child { border-bottom: 0; }
        .home-t-row:hover { background: color-mix(in srgb, var(--primary) 5%, transparent); }
        .home-t-day { font-family: var(--font-display); font-style: italic; font-size: 0.8125rem; color: var(--primary); }
        .home-t-title { font-family: var(--font-serif); font-size: 1rem; font-weight: 500; }
        .home-t-date { font-size: 0.75rem; color: var(--muted-foreground); white-space: nowrap; }
        .home-footer-cta {
          margin-bottom: 3rem; padding: 2rem; border: 1px solid var(--border);
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
