export type SubtitleParaKind = "theme" | "body";

export interface SubtitleParaMeta {
  kind: SubtitleParaKind;
  label?: string;
}

/** 主题段 + 语义段概括词 — 对齐 CONTENT-FORMAT.md §D，比固定三字更丰富 */
export function classifySubtitleParagraph(text: string): SubtitleParaMeta {
  const t = text.trim();
  const head = t.slice(0, 64);

  if (/^今天是/.test(t)) {
    const m = t.match(/(\d{4})年(\d{1,2})月(\d{1,2})/);
    if (m) return { kind: "theme", label: `${m[2]}.${m[3]} · 日记开场` };
    return { kind: "theme", label: "日记 · 开场" };
  }

  if (/^感谢/.test(t)) {
    if (/荣格|罗振宇|老师|作者/.test(t)) return { kind: "theme", label: "致谢 · 引语来源" };
    return { kind: "theme", label: "致谢 · 结尾" };
  }

  if (/终身学习/.test(t) && /与君共勉|明天见/.test(t)) {
    return { kind: "theme", label: "共勉 · 终身学习" };
  }
  if (/与君共勉/.test(t)) return { kind: "theme", label: "共勉 · 落款" };
  if (/明天见/.test(t)) return { kind: "theme", label: "收束 · 明天见" };

  if (/荣格|心理学观察|罗振宇/.test(head)) {
    return { kind: "theme", label: "核心 · 观察" };
  }
  if (/重大.*问题|人生重大|高考|就业|恋爱|婚恋|抉择/.test(head)) {
    return { kind: "theme", label: "议题 · 人生抉择" };
  }
  if (/长远|成长路上|当时当刻/.test(head)) {
    return { kind: "theme", label: "拉远 · 时间尺度" };
  }
  if (/参加工作|更大的世界|更大的能力|承担责任/.test(head)) {
    return { kind: "theme", label: "展开 · 成长路径" };
  }
  if (/变淡了|迎刃而解|无法逾越/.test(head)) {
    return { kind: "theme", label: "体悟 · 超越难题" };
  }
  if (/不要纠结|成长吧|时间会解决/.test(head)) {
    return { kind: "theme", label: "结论 · 行动" };
  }

  return { kind: "body" };
}
