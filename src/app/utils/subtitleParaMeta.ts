export type SubtitleParaKind = "theme" | "body";

export interface SubtitleParaMeta {
  kind: SubtitleParaKind;
  label?: string;
}

/**
 * 字幕段前踢标 — 仅结构锚点，勿抢正文。
 * 规则权威：CONTENT-FORMAT.md §D「展示 · 段前踢标」
 *
 * 可出踢标：日记开场 / 致谢 / 共勉收束（通常每篇 ≤4）。
 * 禁止：对正文语义段批量贴「议题·… / 拉远·…」等概括词。
 */
export function classifySubtitleParagraph(text: string): SubtitleParaMeta {
  const t = text.trim();

  if (/^今天是/.test(t)) {
    const m = t.match(/(\d{4})年(\d{1,2})月(\d{1,2})/);
    if (m) return { kind: "theme", label: `${m[2]}.${m[3]} · 开场` };
    return { kind: "theme", label: "日记 · 开场" };
  }

  if (/^感谢/.test(t)) {
    if (/荣格|罗振宇|老师|作者/.test(t)) return { kind: "theme", label: "致谢" };
    return { kind: "theme", label: "致谢" };
  }

  if (/终身学习/.test(t) && /与君共勉|明天见/.test(t)) {
    return { kind: "theme", label: "共勉" };
  }
  if (/与君共勉/.test(t)) return { kind: "theme", label: "共勉" };
  if (/明天见/.test(t)) return { kind: "theme", label: "收束" };

  return { kind: "body" };
}
