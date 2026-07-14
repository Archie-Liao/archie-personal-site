import { siteConfig } from "../site.config";
import { getDiaryDayCount } from "../utils/dayCount";
import { posts } from "../data/posts";
import { SiteAnchor } from "../components/SiteAnchor";

const INTRO_MOTIFS = [
  { key: "一书", desc: "不会完结的生命之书" },
  { key: "一页", desc: "每一条视频日记" },
  { key: "一章", desc: "每一次成长" },
] as const;

type AboutIntroStructure = {
  dropCap: string;
  paragraphs: string[];
  closing: string;
};

function structureAboutIntro(intro: string): AboutIntroStructure {
  const dashIdx = intro.indexOf("——");
  const closing = dashIdx >= 0 ? intro.slice(dashIdx + 2).replace(/[。]$/, "") : "";
  const main = dashIdx >= 0 ? intro.slice(0, dashIdx) : intro;

  // 与首页 AuthorNote 一致：装饰性首字「你」+ 正文保留「好…」（读出「你好，我叫…」）
  const dropCap = "你";
  const body = main.startsWith("你") ? main.slice(1) : main;
  const sentences = body
    .split("。")
    .map((s) => s.trim())
    .filter(Boolean);

  const paragraphs: string[] = [];
  if (sentences.length >= 2) paragraphs.push(`${sentences[0]}。${sentences[1]}。`);
  if (sentences.length >= 4) paragraphs.push(`${sentences[2]}。${sentences[3]}。`);
  if (sentences.length > 4) paragraphs.push(`${sentences.slice(4).join("。")}。`);

  return { dropCap, paragraphs, closing };
}

const LIFE_STAGES = [
  { label: "童年", note: "好奇驱动", imageUrl: undefined as string | undefined },
  { label: "少年", note: "开始追问", imageUrl: undefined },
  { label: "大学", note: "系统学习", imageUrl: undefined },
  { label: "初入职场", note: "实践检验", imageUrl: undefined },
  { label: "创作期", note: "日更记录", imageUrl: undefined },
  { label: "现在", note: "与君共勉", imageUrl: undefined },
  { label: "未来", note: "未完待续", imageUrl: undefined },
  { label: "?", note: "留白", imageUrl: undefined },
  { label: "?", note: "留白", imageUrl: undefined },
] as const;

/** 未填 imageUrl 时按编号尝试加载：public/assets/img/life-stages/stage-01.jpg … stage-09.jpg */
function lifeStageImageSrc(index: number, imageUrl?: string): string | undefined {
  if (imageUrl) return imageUrl;
  return `/assets/img/life-stages/stage-${String(index + 1).padStart(2, "0")}.jpg`;
}

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
  const introContent = structureAboutIntro(siteConfig.about.intro);

  return (
    <div className="about-page">
      <div className="about-page__inner">
        <section className="about-intro" aria-label="关于我">
          <div className="about-intro__layout">
            <div className="about-intro__eyebrow">
              <span className="about-intro__bar" aria-hidden="true" />
              <span className="about-intro__kicker">人生之书 · About the Author</span>
            </div>

            <header className="about-intro__head">
              <h1 className="about-intro__title">关于我</h1>
              <p className="about-intro__dek">{siteConfig.tagline}</p>
              <p className="about-intro__dek-en">{siteConfig.taglineEn}</p>
            </header>

            <aside className="about-intro__motif" aria-label="生命之书隐喻">
              <p className="about-intro__motif-kicker">隐喻 · Metaphor</p>
              <ul className="about-intro__motif-list">
                {INTRO_MOTIFS.map((item) => (
                  <li key={item.key} className="about-intro__motif-item">
                    <span className="about-intro__motif-key">{item.key}</span>
                    <span className="about-intro__motif-desc">{item.desc}</span>
                  </li>
                ))}
              </ul>
              <div className="about-intro__motif-bridge">
                <span className="about-intro__motif-vline" aria-hidden="true" />
                <SiteAnchor href="#life-stages" className="about-intro__motif-link" target="_self">
                  九个阶段 · 01–09 ↓
                </SiteAnchor>
              </div>
            </aside>

            <div className="about-intro__prose">
              {introContent.paragraphs.map((para, i) => (
                <p key={i} className="about-intro__para">
                  {i === 0 && introContent.dropCap ? (
                    <>
                      <span className="about-intro__drop" aria-hidden="true">
                        {introContent.dropCap}
                      </span>
                      {para}
                    </>
                  ) : (
                    para
                  )}
                </p>
              ))}
              {introContent.closing ? (
                <blockquote className="about-intro__closing">
                  <span className="about-intro__closing-mark" aria-hidden="true">
                    "
                  </span>
                  {introContent.closing}
                </blockquote>
              ) : null}
              <div className="about-intro__sign">
                <span className="about-intro__sign-line" aria-hidden="true" />
                <span className="about-intro__sign-who">
                  <strong>
                    {siteConfig.nameZh} {siteConfig.nameEnShort}
                  </strong>
                  {" · Day "}
                  {dayCount}
                </span>
                <span className="about-intro__sign-line" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="about-intro__divider" aria-hidden="true">
            <span className="about-intro__divider-line" />
            <span className="about-intro__divider-label">人生阶段</span>
            <span className="about-intro__divider-line" />
          </div>
        </section>

        <section id="life-stages" className="about-life-stages" aria-label="人生阶段">
          <div className="about-life-stages__grid">
            <div className="about-life-stages__left">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>人生阶段</h2>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                人生阶段照片陆续更新中。左侧为阶段说明，右侧九宫格按编号一一对应。
              </p>
              <ol className="about-life-stages__list">
                {LIFE_STAGES.map((stage, i) => (
                  <li key={i} className="about-life-stages__item">
                    <span className="about-life-stages__index">{String(i + 1).padStart(2, "0")}</span>
                    <span className="about-life-stages__label">{stage.label}</span>
                    <span className="about-life-stages__note">{stage.note}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="about-life-stages__right">
              <figure className="about-life-stages__figure">
                <div className="about-life-stages__mosaic" role="list" aria-label="人生阶段照片九宫格">
                  {LIFE_STAGES.map((stage, i) => {
                    const slot = String(i + 1).padStart(2, "0");
                    const src = lifeStageImageSrc(i, stage.imageUrl);
                    return (
                      <div key={slot} className="about-life-stages__slot" role="listitem">
                        <div className="about-life-stages__slot-media">
                          <img
                            src={src}
                            alt={`${slot} ${stage.label}`}
                            className="about-life-stages__slot-img"
                            loading="lazy"
                            onError={(e) => {
                              const img = e.currentTarget;
                              img.style.display = "none";
                              const placeholder = img.nextElementSibling as HTMLElement | null;
                              if (placeholder) placeholder.hidden = false;
                            }}
                          />
                          <div className="about-life-stages__slot-placeholder" hidden>
                            <span className="about-life-stages__slot-num">{slot}</span>
                            <span className="about-life-stages__slot-hint">待上传</span>
                          </div>
                        </div>
                        <figcaption className="about-life-stages__slot-cap">
                          <span className="about-life-stages__slot-cap-num">{slot}</span>
                          <span className="about-life-stages__slot-cap-label">{stage.label}</span>
                        </figcaption>
                      </div>
                    );
                  })}
                </div>
                <figcaption className="about-life-stages__caption">
                  <span>人生剪影 · 按编号替换</span>
                  <span>PL. 02</span>
                </figcaption>
              </figure>
            </div>
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
          <img
            src="/assets/img/wechat-qr.png"
            alt="微信二维码"
            width={160}
            height={160}
            className="w-40 h-40 rounded-xl border object-cover"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          />
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
        .about-intro__layout {
          display: grid;
          grid-template-columns: minmax(0, 1.7fr) minmax(11rem, 0.9fr);
          grid-template-areas:
            "eyebrow eyebrow"
            "head motif"
            "prose motif";
          gap: 1.25rem 2.5rem;
          align-items: start;
        }
        @media (max-width: 820px) {
          .about-intro__layout {
            grid-template-columns: 1fr;
            grid-template-areas: "eyebrow" "head" "motif" "prose";
            gap: 1.25rem;
          }
        }
        .about-intro__eyebrow {
          grid-area: eyebrow;
          display: flex; align-items: center; gap: 0.875rem;
          margin-bottom: 0.5rem;
        }
        .about-intro__bar { width: 2.5rem; height: 2px; background: var(--primary); flex-shrink: 0; }
        .about-intro__kicker {
          font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--primary);
        }
        .about-intro__head { grid-area: head; }
        .about-intro__title {
          margin: 0; font-family: var(--font-serif); font-weight: 700;
          font-size: clamp(2rem, 4.5vw, 2.75rem); line-height: 1.08; letter-spacing: 0.04em;
        }
        .about-intro__dek {
          margin: 0.75rem 0 0; font-family: var(--font-serif); font-weight: 600;
          font-size: clamp(1.0625rem, 2vw, 1.1875rem); color: var(--foreground);
          letter-spacing: 0.06em;
        }
        .about-intro__dek-en {
          margin: 0.35rem 0 0; font-family: var(--font-display); font-style: italic;
          font-size: 0.8125rem; letter-spacing: 0.04em; color: var(--muted-foreground);
        }
        .about-intro__motif {
          grid-area: motif;
          padding: 1.125rem 1.25rem;
          border: 1px solid var(--border); border-radius: 0.75rem;
          background: var(--card);
          box-shadow: 0 14px 32px -26px color-mix(in srgb, var(--foreground) 35%, transparent);
        }
        .about-intro__motif-kicker {
          margin: 0 0 0.875rem; font-size: 0.625rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--muted-foreground);
        }
        .about-intro__motif-list {
          margin: 0; padding: 0; list-style: none;
          display: flex; flex-direction: column; gap: 0.75rem;
        }
        .about-intro__motif-item {
          display: grid; grid-template-columns: 2.75rem 1fr; gap: 0.5rem; align-items: baseline;
          padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);
        }
        .about-intro__motif-item:last-child { border-bottom: 0; padding-bottom: 0; }
        .about-intro__motif-key {
          font-family: var(--font-display); font-weight: 700; font-size: 0.9375rem;
          color: var(--primary); letter-spacing: 0.08em;
        }
        .about-intro__motif-desc {
          font-size: 0.8125rem; line-height: 1.45; color: var(--muted-foreground);
        }
        .about-intro__motif-bridge {
          margin-top: 1rem; padding-top: 0.875rem;
          border-top: 1px dashed var(--border);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
        }
        .about-intro__motif-vline {
          width: 1px; height: 1.25rem; background: var(--primary); opacity: 0.45;
        }
        .about-intro__motif-link {
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em;
          color: var(--primary); text-decoration: none;
          border-bottom: 1px solid color-mix(in srgb, var(--primary) 40%, transparent);
          padding-bottom: 2px;
        }
        .about-intro__motif-link:hover {
          border-bottom-color: var(--primary);
        }
        .about-intro__prose { grid-area: prose; max-width: 42rem; }
        .about-intro__para {
          margin: 0 0 1.125rem; font-family: var(--font-serif); font-weight: 500;
          font-size: clamp(1rem, 1.8vw, 1.125rem); line-height: 1.88; letter-spacing: 0.02em;
          color: var(--foreground); text-align: justify; text-wrap: pretty;
        }
        .about-intro__para:last-of-type { margin-bottom: 1.375rem; }
        .about-intro__drop {
          float: left; font-family: var(--font-serif); font-weight: 700; color: var(--primary);
          font-size: clamp(3.25rem, 7vw, 3.75rem); line-height: 0.78;
          padding: 0.2rem 0.75rem 0 0; margin-top: 0.15rem;
        }
        .about-intro__closing {
          margin: 0 0 1.5rem; padding: 1rem 0 0.25rem 1.125rem;
          border-left: 3px solid var(--primary);
          font-family: var(--font-serif); font-weight: 600; font-style: italic;
          font-size: clamp(1.0625rem, 2vw, 1.1875rem); line-height: 1.65;
          color: color-mix(in srgb, var(--foreground) 88%, var(--primary));
          position: relative;
        }
        .about-intro__closing-mark {
          position: absolute; left: 0.5rem; top: -0.15rem;
          font-family: var(--font-display); font-size: 2.5rem; line-height: 1;
          color: var(--primary); opacity: 0.35; font-style: normal;
        }
        .about-intro__sign {
          display: flex; align-items: center; gap: 0.875rem;
        }
        .about-intro__sign-line {
          width: 1.75rem; height: 1px; background: var(--border); flex-shrink: 0;
        }
        .about-intro__sign-who {
          font-family: var(--font-display); font-style: italic; font-size: 0.9375rem;
          color: var(--muted-foreground); white-space: nowrap;
        }
        .about-intro__sign-who strong {
          font-style: normal; font-family: var(--font-serif); font-weight: 600;
          letter-spacing: 0.08em; color: var(--foreground);
        }
        .about-intro__divider {
          display: flex; align-items: center; gap: 1rem;
          margin-top: 2.75rem; padding-top: 0.25rem;
        }
        .about-intro__divider-line {
          flex: 1; height: 1px; background: var(--border);
        }
        .about-intro__divider-label {
          font-family: var(--font-display); font-size: 0.6875rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted-foreground);
          white-space: nowrap;
        }
        .about-life-stages__grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
        }
        @media (max-width: 900px) {
          .about-life-stages__grid { grid-template-columns: 1fr; gap: 2rem; }
        }
        .about-life-stages__left { display: flex; flex-direction: column; gap: 0.75rem; }
        .about-life-stages__list {
          margin: 0.5rem 0 0; padding: 0; list-style: none;
          display: flex; flex-direction: column; gap: 0.4rem;
        }
        .about-life-stages__item {
          display: grid; grid-template-columns: 2rem 3.5rem 1fr; gap: 0.35rem 0.5rem;
          align-items: baseline; font-size: 0.8125rem;
        }
        .about-life-stages__index {
          font-family: var(--font-display); color: var(--primary); opacity: 0.45;
          font-size: 0.75rem; letter-spacing: 0.06em;
        }
        .about-life-stages__label { font-family: var(--font-display); font-weight: 600; }
        .about-life-stages__note { color: var(--muted-foreground); font-size: 0.75rem; }
        .about-life-stages__figure { margin: 0; width: 100%; max-width: 22rem; }
        .about-life-stages__right { display: flex; justify-content: center; }
        @media (min-width: 901px) { .about-life-stages__right { justify-content: flex-end; } }
        .about-life-stages__mosaic {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;
          padding: 0.75rem; border: 1px solid var(--border); border-radius: 0.75rem;
          background: var(--card);
        }
        .about-life-stages__slot {
          display: flex; flex-direction: column; min-width: 0;
          border: 1px solid var(--border); border-radius: 0.5rem; overflow: hidden;
          background: var(--background);
        }
        .about-life-stages__slot-media {
          position: relative; aspect-ratio: 1; overflow: hidden;
        }
        .about-life-stages__slot-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .about-life-stages__slot-placeholder {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.2rem;
          color: var(--muted-foreground); background: color-mix(in srgb, var(--foreground) 4%, var(--background));
        }
        .about-life-stages__slot-placeholder[hidden] { display: none; }
        .about-life-stages__slot-num {
          font-family: var(--font-display); font-size: 1rem; color: var(--primary); opacity: 0.55;
        }
        .about-life-stages__slot-hint { font-size: 0.5625rem; letter-spacing: 0.12em; }
        .about-life-stages__slot-cap {
          display: grid; grid-template-columns: 1.75rem 1fr; gap: 0.25rem; align-items: center;
          padding: 0.3rem 0.35rem; border-top: 1px solid var(--border);
          font-size: 0.625rem; line-height: 1.2;
        }
        .about-life-stages__slot-cap-num {
          font-family: var(--font-display); color: var(--primary); opacity: 0.7;
        }
        .about-life-stages__slot-cap-label {
          font-family: var(--font-display); font-weight: 600; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .about-life-stages__caption {
          display: flex; justify-content: space-between; align-items: baseline; gap: 1rem;
          margin-top: 0.75rem; padding-top: 0.75rem;
          border-top: 1px solid var(--border);
          font-size: 0.8125rem; color: var(--muted-foreground);
        }
        .about-life-stages__caption span:last-child { letter-spacing: 0.14em; font-size: 0.75rem; }
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
