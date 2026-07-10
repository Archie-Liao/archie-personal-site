import { siteConfig } from "../site.config";
import { getDiaryDayCount } from "../utils/dayCount";
import { posts } from "../data/posts";

const LIFE_STAGES = [
  { label: "童年", note: "好奇驱动" },
  { label: "少年", note: "开始追问" },
  { label: "大学", note: "系统学习" },
  { label: "初入职场", note: "实践检验" },
  { label: "创作期", note: "日更记录" },
  { label: "现在", note: "与君共勉" },
  { label: "未来", note: "未完待续" },
  { label: "?", note: "留白" },
  { label: "?", note: "留白" },
];

const KEY_METRICS = [
  { reel: "METRIC 01", title: "建站起点", footKey: "dayOne" as const },
  { reel: "METRIC 02", title: "视频日记天数", foot: "Daily count" },
  { reel: "METRIC 03", title: "已发布期数", foot: "Issues archived" },
  { reel: "METRIC 04", title: "AI 内容占比", foot: "含 AI 标签的期数" },
] as const;

function metricFoot(cell: (typeof KEY_METRICS)[number]): string {
  if ("footKey" in cell && cell.footKey === "dayOne") {
    return `Day1 · ${siteConfig.dayOneDate.replace(/-/g, ".")}`;
  }
  return cell.foot;
}

export function AboutPage() {
  const dayCount = getDiaryDayCount(siteConfig.dayOneDate);
  const issueCount = posts.length;
  const aiShare = Math.round(
    (posts.filter((p) => (p.tags ?? []).includes("AI")).length / Math.max(issueCount, 1)) * 100
  );

  const metricValues = ["2026", String(dayCount), String(issueCount), `${aiShare}%`];

  return (
    <div className="about-page">
      <div className="about-page__inner">
        <section className="flex flex-col gap-6">
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>关于我</h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--foreground)", maxWidth: "60ch" }}>
            {siteConfig.about.intro}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>人生阶段</h2>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            人生阶段照片陆续更新中。
          </p>
          <div className="grid grid-cols-3 gap-3">
            {LIFE_STAGES.map((stage, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl border flex flex-col items-center justify-center p-3 text-center"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <span
                  className="text-2xl mb-2 opacity-20"
                  style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium" style={{ fontFamily: "var(--font-display)" }}>
                  {stage.label}
                </span>
                <span className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                  {stage.note}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* A5-1 — 全宽色带（参考图横跨 viewport；B 阶段可加深/金字） */}
      <section className="about-metrics-band" aria-label="站点档案统计">
        <div className="about-metrics-band__inner">
          <div className="metrics-panel">
            <div className="metrics-panel__head">
              <div>
                <p className="metrics-panel__kicker">Key Metrics · 2026</p>
                <h2 className="metrics-panel__title">用数据说话</h2>
              </div>
              <p className="metrics-panel__note">Selected 4 · 站点档案统计</p>
            </div>
            <div className="metrics-reel">
              {KEY_METRICS.map((cell, i) => (
                <div key={cell.reel} className="metrics-reel__cell">
                  <span className="metrics-reel__reel">{cell.reel}</span>
                  <span className="metrics-reel__value">{metricValues[i]}</span>
                  <span className="metrics-reel__title">{cell.title}</span>
                  <span className="metrics-reel__foot">{metricFoot(cell)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="about-page__inner about-page__inner--tail">
        <section className="flex flex-col gap-6 items-center border-t pt-10" style={{ borderColor: "var(--border)" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>合作联系</h2>
          <p className="text-sm text-center" style={{ color: "var(--muted-foreground)" }}>
            {siteConfig.about.cooperation}
          </p>
          <div
            className="w-40 h-40 rounded-xl border flex flex-col items-center justify-center gap-2 p-4"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
              <rect x="10" y="10" width="25" height="25" fill="var(--foreground)" />
              <rect x="65" y="10" width="25" height="25" fill="var(--foreground)" />
              <rect x="10" y="65" width="25" height="25" fill="var(--foreground)" />
              <rect x="40" y="40" width="8" height="8" fill="var(--foreground)" />
              <rect x="52" y="40" width="8" height="8" fill="var(--foreground)" />
              <rect x="40" y="52" width="8" height="8" fill="var(--foreground)" />
              <rect x="65" y="65" width="10" height="10" fill="var(--foreground)" />
              <rect x="78" y="65" width="12" height="12" fill="var(--foreground)" />
              <rect x="65" y="78" width="12" height="12" fill="var(--foreground)" />
            </svg>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>微信二维码</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={siteConfig.links.bilibili} target="_blank" rel="noopener noreferrer" className="social-link">
              B站
            </a>
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="social-link">
              GitHub
            </a>
            <a href={siteConfig.links.xiaohongshu} target="_blank" rel="noopener noreferrer" className="social-link">
              小红书
            </a>
          </div>
        </section>
      </div>

      <style>{`
        .about-page__inner {
          max-width: 72rem; margin: 0 auto; padding: 3rem 1.5rem 2rem;
          display: flex; flex-direction: column; gap: 3.5rem;
        }
        .about-page__inner--tail { padding-top: 2.5rem; padding-bottom: 3rem; }
        .about-metrics-band {
          width: 100%;
          margin: 0;
          padding: 2.5rem 0 2.75rem;
          background: color-mix(in srgb, var(--foreground) 88%, var(--background));
          color: color-mix(in srgb, var(--background) 92%, white);
          border-top: 1px solid color-mix(in srgb, var(--background) 12%, transparent);
          border-bottom: 1px solid color-mix(in srgb, var(--background) 12%, transparent);
        }
        .about-metrics-band__inner {
          max-width: 72rem; margin: 0 auto; padding: 0 1.75rem;
        }
        .metrics-panel { padding: 0; }
        .metrics-panel__head {
          display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end;
          gap: 1rem; margin-bottom: 2rem; padding-bottom: 1.25rem;
          border-bottom: 1px solid color-mix(in srgb, var(--background) 18%, transparent);
        }
        .metrics-panel__kicker {
          margin: 0 0 0.35rem; font-size: 0.625rem; letter-spacing: 0.22em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--gold, var(--primary)) 80%, white);
        }
        .metrics-panel__title {
          margin: 0; font-family: var(--font-serif); font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 600; letter-spacing: 0.04em;
          color: color-mix(in srgb, var(--gold, var(--primary)) 75%, white);
        }
        .metrics-panel__note {
          margin: 0; max-width: 16rem; font-size: 0.65rem; letter-spacing: 0.08em;
          text-transform: uppercase; text-align: right;
          color: color-mix(in srgb, var(--background) 55%, transparent);
        }
        .metrics-reel {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
        }
        @media (max-width: 768px) {
          .metrics-reel { grid-template-columns: repeat(2, 1fr); gap: 1.5rem 0; }
          .metrics-panel__note { text-align: left; }
        }
        .metrics-reel__cell {
          padding: 0 1.25rem 0 0; display: flex; flex-direction: column; gap: 0.5rem;
          min-height: 7.5rem;
          border-right: 1px solid color-mix(in srgb, var(--background) 14%, transparent);
        }
        .metrics-reel__cell:last-child { border-right: 0; padding-right: 0; }
        @media (max-width: 768px) {
          .metrics-reel__cell { border-right: 0; padding-right: 0; min-height: 6rem; }
          .metrics-reel__cell:nth-child(odd) { padding-right: 1rem; border-right: 1px solid color-mix(in srgb, var(--background) 14%, transparent); }
        }
        .metrics-reel__reel {
          font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: color-mix(in srgb, var(--gold, var(--primary)) 70%, white);
        }
        .metrics-reel__value {
          font-family: var(--font-display); font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700;
          line-height: 1.05; letter-spacing: -0.02em;
          color: color-mix(in srgb, var(--background) 95%, white);
        }
        .metrics-reel__title {
          font-family: var(--font-serif); font-size: 0.9375rem; font-weight: 600;
        }
        .metrics-reel__foot {
          margin-top: auto; font-size: 0.6875rem;
          color: color-mix(in srgb, var(--background) 50%, transparent);
          letter-spacing: 0.04em;
        }
        .social-link {
          padding: 8px 16px; border-radius: 8px; font-size: 0.875rem;
          border: 1px solid var(--border); color: var(--foreground); text-decoration: none;
        }
        .social-link:hover { border-color: var(--primary); color: var(--primary); }
      `}</style>
    </div>
  );
}
