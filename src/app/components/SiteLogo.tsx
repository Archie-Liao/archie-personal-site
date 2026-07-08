import { siteConfig } from "../site.config";
import { getDiaryDayCount } from "../utils/dayCount";
import { LogoStampFingerprint } from "./LogoStampFingerprint";

interface SiteLogoProps {
  /** nav 顶栏 | footer 页脚 | hero 中号（备用） */
  variant?: "nav" | "footer" | "hero";
}

/**
 * 站点字标 — D4 期数 stamp（A117）+ 中英叠排；期数见 getDiaryDayCount
 */
export function SiteLogo({ variant = "nav" }: SiteLogoProps) {
  const dayCount = getDiaryDayCount(siteConfig.dayOneDate);
  const showIssue = variant === "nav" || variant === "footer";

  return (
    <span className={`site-logo site-logo--${variant}`} aria-label={siteConfig.name}>
      {showIssue && (
        <span className="site-logo__issue" aria-hidden="true">
          <LogoStampFingerprint />
          <span className="site-logo__issue-label">
            <span className="site-logo__issue-a">A</span>
            <span className="site-logo__issue-day">{dayCount}</span>
          </span>
        </span>
      )}

      <span className="site-logo__text">
        <span className="site-logo__zh">{siteConfig.nameZh}</span>
        <span className="site-logo__en">{siteConfig.nameEnShort}</span>
      </span>
    </span>
  );
}
