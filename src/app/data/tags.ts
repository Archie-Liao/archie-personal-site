/** 固定标签体系 — 来自 knowledge_skills_DeepSeek_v0 */
export const TOPIC_TAGS = ["商业", "AI", "自媒体", "职场", "人生", "认知", "社会", "方法"] as const;
export const TYPE_TAGS = ["观点", "记录", "灵感", "随想", "情绪", "复盘"] as const;
export const SOURCE_TAGS = ["文章", "书籍", "论文", "原创"] as const;

export const ALL_TAGS = [...TOPIC_TAGS, ...TYPE_TAGS, ...SOURCE_TAGS] as const;
export type SiteTag = (typeof ALL_TAGS)[number];

export function isValidTag(tag: string): tag is SiteTag {
  return (ALL_TAGS as readonly string[]).includes(tag);
}
