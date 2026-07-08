import { posts } from "../data/posts";

export interface DailyQuote {
  text: string;
  postId: string;
  postTitle: string;
}

const quotePool: DailyQuote[] = posts
  .filter((p) => p.aiSummary.quote?.trim())
  .map((p) => ({
    text: p.aiSummary.quote.replace(/^「|」$/g, "").trim(),
    postId: p.id,
    postTitle: p.title,
  }));

/** 按日期稳定随机 — 同一天全站同一句（MIX-MATCH · D4 punch 金句池） */
export function getDailyQuote(referenceDate = new Date()): DailyQuote {
  if (quotePool.length === 0) {
    return { text: "记录就是生命的延续", postId: "", postTitle: "Cover Story" };
  }
  const seed =
    referenceDate.getFullYear() * 10000 +
    (referenceDate.getMonth() + 1) * 100 +
    referenceDate.getDate();
  return quotePool[seed % quotePool.length];
}
