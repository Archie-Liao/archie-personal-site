import { siteConfig } from "../site.config";

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

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-14">
      <section className="flex flex-col gap-6">
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>关于我</h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--foreground)", maxWidth: "60ch" }}>
          {siteConfig.about.intro}
        </p>
      </section>

      {/* 人生阶段 — 占位九宫格，后期可换照片 */}
      <section className="flex flex-col gap-4">
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>人生阶段</h2>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          第一期使用 typography 占位，后期可替换为 9 张人生阶段照片。
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

      <section className="flex flex-col gap-6 items-center border-t pt-10" style={{ borderColor: "var(--border)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>合作联系</h2>
        <p className="text-sm text-center" style={{ color: "var(--muted-foreground)" }}>
          {siteConfig.about.cooperation}
        </p>
        {/* 占位微信 QR — 后期替换为真实图片 */}
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
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>微信 QR 占位</span>
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

      <style>{`
        .social-link {
          padding: 8px 16px; border-radius: 8px; font-size: 0.875rem;
          border: 1px solid var(--border); color: var(--foreground); text-decoration: none;
        }
        .social-link:hover { border-color: var(--primary); color: var(--primary); }
      `}</style>
    </div>
  );
}
