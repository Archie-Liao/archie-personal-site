import type { ContentItem } from "../data/posts";

/** 预览区延展阅读（列表右栏偏短时的补充段落 · 摘抄自条目本身） */
export function getPreviewExtendedParagraphs(post: ContentItem): string[] {
  const paras: string[] = [];

  if (post.aiSummary.overview.trim()) {
    paras.push(post.aiSummary.overview.trim());
  }

  for (const point of post.aiSummary.keyPoints) {
    const t = point.trim();
    if (t && !/待补/.test(t)) paras.push(t);
  }

  if (post.knowledgeCards.length > 0) {
    for (const card of post.knowledgeCards.slice(0, 2)) {
      paras.push(`${card.front} — ${card.back}`);
    }
  }

  if (post.archiveNotes?.length) {
    for (const note of post.archiveNotes.slice(0, 3)) {
      paras.push(note.trim());
    }
  }

  return paras;
}
