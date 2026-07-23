/**
 * 顶栏搜索 · 空闲打字机文案（Archie 可随时改）
 * - `prefix`：橙字前缀（如 `@Archie`），可省略
 * - `text`：灰色半透明循环正文
 */
export type SearchIdlePhrase = {
  prefix?: string;
  text: string;
};

export const SEARCH_IDLE_PHRASES: SearchIdlePhrase[] = [
  { prefix: "@Archie", text: "你在干神魔？" },
  { text: "克制是战略，不是道德课" },
  { text: "成长会自动消解很多难题" },
  { text: "学会用筷子，却发现没菜可夹" },
  { text: "通往 AGI 的路上，哪些坑绝不踩？" },
  { text: "你的愿景若是拿得多，你就先输了" },
  { text: "手机被忽视，AI 正在重蹈覆辙" },
  { text: "一群平凡人，做成不平凡的事" },
  { text: "AI 缺的不是品味，是持续学习" },
  { text: "一个比喻讲透 AI 与人的关系" },
  { text: "不为清单：好公司因「不做」而成" },
];

export function searchIdleFullText(p: SearchIdlePhrase): string {
  return p.prefix ? `${p.prefix} ${p.text}` : p.text;
}
