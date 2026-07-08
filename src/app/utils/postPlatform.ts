import type { ContentItem } from "../data/posts";

/** 无期数详情 Hero 左侧 · 来源平台展示名 */
const URL_PLATFORM: { pattern: RegExp; label: string }[] = [
  { pattern: /(?:^|\/\/)(?:www\.)?bilibili\.com|\.b23\.tv/i, label: "bilibili" },
  { pattern: /(?:^|\/\/)(?:www\.)?xiaohongshu\.com|xhslink\.com/i, label: "小红书" },
  { pattern: /(?:^|\/\/)(?:www\.)?douyin\.com/i, label: "抖音" },
  { pattern: /(?:^|\/\/)(?:www\.)?(?:x\.com|twitter\.com)/i, label: "X" },
  { pattern: /(?:^|\/\/)(?:www\.)?aihot\.virxact\.com/i, label: "AIHOT" },
  { pattern: /(?:^|\/\/)(?:www\.)?github\.com/i, label: "GitHub" },
  { pattern: /(?:^|\/\/)(?:www\.)?youtube\.com|youtu\.be/i, label: "YouTube" },
  { pattern: /(?:^|\/\/)(?:www\.)?weixin\.qq\.com/i, label: "微信" },
];

function platformFromUrl(url: string | undefined): string | null {
  if (!url) return null;
  for (const { pattern, label } of URL_PLATFORM) {
    if (pattern.test(url)) return label;
  }
  return null;
}

function normalizeSourceName(name: string): string {
  const trimmed = name.trim();
  if (/^ai\s*hot$/i.test(trimmed)) return "AIHOT";
  return trimmed;
}

/**
 * 列表左栏 / 预览区 · 期数或平台标记
 */
export function getPostListMarker(post: ContentItem): {
  kind: "episode" | "platform";
  value: string;
} {
  if (post.episode != null) {
    return { kind: "episode", value: String(post.episode) };
  }
  return { kind: "platform", value: getPostPlatformLabel(post) ?? "—" };
}

/** 预览区 VOL 行后缀，如 `DAY 99` 或 `AIHOT` */
export function formatPostPreviewVol(post: ContentItem): string {
  const marker = getPostListMarker(post);
  if (marker.kind === "episode") return `DAY ${marker.value}`;
  return marker.value;
}

/** 侧栏「最新」一行 */
export function formatPostLatestLine(post: ContentItem): string {
  const marker = getPostListMarker(post);
  if (marker.kind === "episode") return `Day ${marker.value} · ${post.date}`;
  return `${marker.value} · ${post.date}`;
}

/**
 * 无期数条目 Hero 左侧平台名；有 episode 时返回 null（显示期数）。
 */
export function getPostPlatformLabel(post: ContentItem): string | null {
  if (post.episode != null) return null;

  if (post.bvid) return "bilibili";

  const fromUrl = platformFromUrl(post.sourceUrl);
  if (fromUrl) return fromUrl;

  if (post.sourceName?.trim()) {
    return normalizeSourceName(post.sourceName);
  }

  if (post.type === "link") return "外链";
  if (post.type === "note") return "笔记";
  return null;
}
