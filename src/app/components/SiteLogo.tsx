import { siteConfig } from "../site.config";

interface SiteLogoProps {
  /** nav 顶栏 | hero 中号 | hero-xl 首页大标题 */
  variant?: "nav" | "hero" | "hero-xl";
}

/**
 * 站点字标 — 以「字体设计」为主：
 * 中文思源宋体加宽字距 + 英文 Fraunces 斜体，辅以一枚极简叶饰印记，
 * 呼应「记录 / 生长」与复古花鸟主题（克制、可读）。
 */
export function SiteLogo({ variant = "nav" }: SiteLogoProps) {
  // Hero 区让字体本身成为主角（参考图1：纯字标，无图形干扰）；nav 保留小印记
  const showMark = variant === "nav";

  return (
    <span className={`site-logo site-logo--${variant}`} aria-label={siteConfig.name}>
      {showMark && (
        <svg
          className="site-logo__mark"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M12 3 C7 8 7 16 12 21 C17 16 17 8 12 3 Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path d="M12 5.5 V18.5" stroke="currentColor" strokeWidth="0.9" opacity="0.75" />
          <path
            d="M12 9 L9.4 10.8 M12 12 L9 14 M12 9 L14.6 10.8 M12 12 L15 14"
            stroke="currentColor"
            strokeWidth="0.7"
            opacity="0.55"
            strokeLinecap="round"
          />
        </svg>
      )}

      <span className="site-logo__text">
        <span className="site-logo__zh">{siteConfig.nameZh}</span>
        <span className="site-logo__en">{siteConfig.nameEnShort}</span>
      </span>
    </span>
  );
}
