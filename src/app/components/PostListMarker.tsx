import type { ContentItem } from "../data/posts";
import { getPostListMarker } from "../utils/postPlatform";

interface PostListMarkerProps {
  post: ContentItem;
  className?: string;
}

/** 列表左栏 · 期数大号 / 平台短名 */
export function PostListMarker({ post, className = "posts-d2__day-num" }: PostListMarkerProps) {
  const marker = getPostListMarker(post);
  if (marker.kind === "episode") {
    return <span className={className}>{marker.value}</span>;
  }
  return (
    <span className={`${className} ${className}--platform`} title={`来自 ${marker.value}`}>
      {marker.value}
    </span>
  );
}
