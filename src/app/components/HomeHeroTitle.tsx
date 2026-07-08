import { siteConfig } from "../site.config";

/**
 * 首页 Hero 大标题 — benchmark `display` 路线（与顶栏 SiteLogo 独立）
 * 廖智强 · Playfair「Archie.」+ 赤陶点缀 — 非 nav stamp 叠排放大
 */
export function HomeHeroTitle() {
  return (
    <h1 className="home-hero-display m-0 p-0">
      <span className="home-hero-display__zh">{siteConfig.nameZh}</span>
      <span className="home-hero-display__en">
        {siteConfig.nameEnShort}
        <span className="home-hero-display__dot" aria-hidden="true">
          .
        </span>
      </span>
    </h1>
  );
}
