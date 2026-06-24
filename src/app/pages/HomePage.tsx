import { Link } from "react-router";
import { siteConfig } from "../site.config";
import { getDiaryDayCount } from "../utils/dayCount";
import { getLatestPost, getTopPostsByViews, getFeaturedPosts, getRecentPosts } from "../data/posts";
import { HeroIllustration } from "../components/HeroIllustration";
import { BeijingClock } from "../components/BeijingClock";
import { MiniCalendar } from "../components/MiniCalendar";
import { SiteLogo } from "../components/SiteLogo";

export function HomePage() {
  const dayCount = getDiaryDayCount(siteConfig.dayOneDate);
  const latest = getLatestPost();
  const featured = getFeaturedPosts().find((p) => p.id !== latest.id) ?? latest;
  const topThree = getTopPostsByViews(3);
  const recent = getRecentPosts(8);

  return (
    <div className="home-page">
      {/* Hero — 出版物双栏 */}
      <section className="home-hero wrap">
        <div className="home-hero__grid">
          <div className="home-hero__left">
            <div className="home-hero__eyebrow">
              <span className="home-hero__bar" />
              <span className="home-eyebrow">卷首 · Vol. {dayCount}</span>
            </div>
            <h1 className="m-0 p-0">
              <SiteLogo variant="hero-xl" />
            </h1>
            <p className="home-tagline-zh">{siteConfig.tagline}</p>
            <p className="home-tagline-en">{siteConfig.taglineEn}</p>
            <p className="home-intro">
              视频日记 + 网络优质内容（当前以 AI 为主）的沉淀归档。
              <br />
              一部不会完结的生命之书：每一条日记是一页，每一次成长是一章。
            </p>
            <div className="home-hero__cta">
              <Link to="/posts" className="home-link-arrow">
                读最新一期 →
              </Link>
              <Link to="/about" className="home-link-quiet">
                关于我 →
              </Link>
            </div>
          </div>
          <HeroIllustration />
        </div>
      </section>

      {/* 第二屏窄条 */}
      <section className="home-band">
        <div className="wrap home-band__inner">
          <BeijingClock />
          <div className="home-day-center">
            <span className="home-band__lab">视频日记</span>
            <span className="home-day-num">
              第 <em>{dayCount}</em> 天
            </span>
            <span className="home-band__sub">Daily Since 2026.03.14</span>
          </div>
          <MiniCalendar />
        </div>
      </section>

      {/* 卷首语 */}
      <section className="home-note wrap">
        <span className="home-eyebrow home-note__eyebrow">卷首语 · A Note from the Author</span>
        <p className="home-note__text">
          <span className="home-drop">你</span>
          {siteConfig.about.intro}
        </p>
        <div className="home-note__sign">
          <span className="home-note__line" />
          <span>
            <strong>{siteConfig.name}</strong> · 二〇二六
          </span>
          <span className="home-note__line" />
        </div>
      </section>

      {/* 精选三卡 — 出版物网格 */}
      <section className="home-selected wrap">
        <div className="home-section-head">
          <h2>精选入口</h2>
          <span className="home-section-sub">Selected Entries</span>
        </div>
        <div className="home-cards">
          <article className="home-card">
            <div className="home-card__top">
              <span className="home-eyebrow">最新一期</span>
              <span className="home-folio">{String(latest.episode ?? "").padStart(3, "0")}</span>
            </div>
            <h3>
              <Link to={`/post/${latest.id}`}>{latest.title}</Link>
            </h3>
            <p className="home-card__meta">
              Day {latest.episode} · {latest.date}
            </p>
            <p className="home-card__tags">{latest.tags.join(" · ")}</p>
            <Link to={`/post/${latest.id}`} className="home-card__more">
              阅读这一期 →
            </Link>
          </article>

          <article className="home-card">
            <div className="home-card__top">
              <span className="home-eyebrow">编辑精选</span>
              <span className="home-folio">{String(featured.episode ?? "").padStart(3, "0")}</span>
            </div>
            <h3>
              <Link to={`/post/${featured.id}`}>{featured.title}</Link>
            </h3>
            <p className="home-card__meta">
              Day {featured.episode} · {featured.date}
            </p>
            <p className="home-card__tags">{featured.tags.join(" · ")}</p>
            <Link to={`/post/${featured.id}`} className="home-card__more">
              阅读这一期 →
            </Link>
          </article>

          <article className="home-card">
            <span className="home-eyebrow">本周热门</span>
            <ul className="home-hot-list">
              {topThree.map((p, i) => (
                <li key={p.id}>
                  <Link to={`/post/${p.id}`}>
                    <span className="home-hot-n">{i + 1}</span>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* 往期时间线 */}
      <section className="home-timeline wrap">
        <div className="home-section-head">
          <h2>往期时间线</h2>
          <Link to="/posts" className="home-section-sub" style={{ textDecoration: "none" }}>
            全部日记 →
          </Link>
        </div>
        <div className="home-timeline__list">
          {recent.map((p) => (
            <Link key={p.id} to={`/post/${p.id}`} className="home-t-row">
              <span className="home-t-day">Day {p.episode}</span>
              <span className="home-t-title">{p.title}</span>
              <span className="home-t-date">{p.date}</span>
            </Link>
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
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            顶部
          </a>
        </div>
      </section>

      <style>{`
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
        .home-hero__bar { width: 2.5rem; height: 2px; background: var(--primary); }
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
        .home-band {
          background: var(--secondary); border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .home-band__inner {
          display: grid; grid-template-columns: 1fr auto 1fr; gap: 2rem;
          align-items: center; padding: 1.25rem 0;
        }
        @media (max-width: 768px) { .home-band__inner { grid-template-columns: 1fr; text-align: center; } }
        .home-band__lab { font-size: 0.6875rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted-foreground); }
        .home-day-center { text-align: center; padding: 0 2rem; border-left: 1px solid var(--border); border-right: 1px solid var(--border); }
        .home-day-num { display: block; font-family: var(--font-serif); font-weight: 600; font-size: 1.125rem; letter-spacing: 0.08em; margin-top: 0.25rem; }
        .home-day-num em { font-family: var(--font-display); font-style: italic; color: var(--primary-deep, var(--terracotta)); font-size: 1.375rem; }
        .home-band__sub { display: block; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted-foreground); margin-top: 0.25rem; }
        .home-note { padding: 4.5rem 0 5rem; text-align: center; }
        .home-note__eyebrow { display: block; margin-bottom: 1.5rem; }
        .home-note__text {
          max-width: 45rem; margin: 0 auto; font-family: var(--font-serif); font-weight: 500;
          font-size: 1.2rem; line-height: 1.92; letter-spacing: 0.02em; text-align: justify;
        }
        .home-drop {
          float: left; font-family: var(--font-serif); font-weight: 700; color: var(--primary);
          font-size: 4.25rem; line-height: 0.78; padding: 0.35rem 0.875rem 0 0;
        }
        .home-note__sign {
          margin-top: 2rem; display: flex; align-items: center; justify-content: center; gap: 0.875rem;
          font-family: var(--font-display); font-style: italic; color: var(--muted-foreground);
        }
        .home-note__sign strong { font-style: normal; font-family: var(--font-serif); color: var(--foreground); }
        .home-note__line { width: 1.75rem; height: 1px; background: var(--border); }
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
