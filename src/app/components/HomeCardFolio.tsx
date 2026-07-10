import type { ContentItem } from "../data/posts";
import { formatHomeCardFolio } from "../utils/postPlatform";

/** 首页精选卡 · 期数 folio / 平台短名 */
export function HomeCardFolio({ post }: { post: ContentItem }) {
  const folio = formatHomeCardFolio(post);
  if (folio.kind === "episode") {
    return <span className="home-folio">{folio.text}</span>;
  }
  return (
    <span className="home-folio home-folio--platform" title={`来自 ${folio.text}`}>
      {folio.text}
    </span>
  );
}
