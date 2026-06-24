import { useState } from "react";
import type { ContentItem } from "../data/posts";
import { ButterflyLine } from "./Decorations";

/** 低饱和暖色对（纸感复古，和站点配色一致） */
const PALETTES: [string, string][] = [
  ["#E7DEC9", "#CBB88E"],
  ["#D8E0D4", "#AEC2B0"],
  ["#E9DAC4", "#CFAC86"],
  ["#DED7C4", "#B6A887"],
  ["#E2D6CE", "#C2A48C"],
  ["#DDE2DE", "#AFBEB4"],
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * 本地生成的复古封面（纯 CSS + 内联 SVG，零外部依赖，永远能显示）。
 * 后续有真实封面时，给 post.coverUrl 设为本地 /assets 或国内可访问的图即可覆盖。
 */
export function CoverArt({ post, className = "" }: { post: ContentItem; className?: string }) {
  const [c1, c2] = PALETTES[hashStr(post.id) % PALETTES.length];
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)` }}
      aria-hidden
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <ButterflyLine width={150} color="rgba(255,255,255,0.55)" />
      </div>
    </div>
  );
}

/**
 * 封面图：优先使用本地/可信封面；缺省或加载失败时回退到生成封面。
 * 自动忽略国内打不开的 unsplash 链接，避免破图。
 */
export function CoverImage({ post, className = "" }: { post: ContentItem; className?: string }) {
  const [errored, setErrored] = useState(false);
  const usable = Boolean(post.coverUrl) && !post.coverUrl.includes("unsplash.com");
  if (!usable || errored) return <CoverArt post={post} className={className} />;
  return (
    <img
      src={post.coverUrl}
      alt={post.title}
      onError={() => setErrored(true)}
      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${className}`}
    />
  );
}
