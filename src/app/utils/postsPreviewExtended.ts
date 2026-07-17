import type { ContentItem } from "../data/posts";

const MAX_PARAS = 2;
const MAX_CHARS_TOTAL = 220;
const MAX_CHARS_PER_PARA = 120;

/**
 * 列表右栏「阅读延展」——只补主摘要没写过的短注。
 * 禁止：复读 overview / keyPoints（已在上方展示）。
 */
export function getPreviewExtendedParagraphs(post: ContentItem): string[] {
  const used = new Set<string>();
  const pushNorm = (s: string) => used.add(s.replace(/\s+/g, "").slice(0, 48));

  pushNorm(post.aiSummary.overview);
  for (const p of post.aiSummary.keyPoints) pushNorm(p);

  const candidates: string[] = [];

  for (const note of post.archiveNotes ?? []) {
    const t = note.trim();
    if (!t || /验收|滚动|提示/.test(t)) continue;
    const key = t.replace(/\s+/g, "").slice(0, 48);
    if ([...used].some((u) => key.includes(u) || u.includes(key))) continue;
    candidates.push(t);
    used.add(key);
  }

  // 知识卡仅在无 archiveNotes 时补 1 条短注
  if (candidates.length === 0 && post.knowledgeCards[0]) {
    const c = post.knowledgeCards[0];
    candidates.push(`${c.front}：${c.back}`);
  }

  const out: string[] = [];
  let budget = MAX_CHARS_TOTAL;
  for (const raw of candidates) {
    if (out.length >= MAX_PARAS || budget <= 40) break;
    let t = raw.replace(/\*\*/g, "").trim();
    if (t.length > MAX_CHARS_PER_PARA) t = `${t.slice(0, MAX_CHARS_PER_PARA - 1)}…`;
    if (t.length > budget) t = `${t.slice(0, Math.max(40, budget - 1))}…`;
    out.push(t);
    budget -= t.length;
  }
  return out;
}
