import quotesData from "../data/quotes.json";

export interface DailyQuote {
  text: string;
  postId: string;
  postTitle: string;
}

const quotePool: DailyQuote[] = quotesData.filter((q) => q.text?.trim());

const FALLBACK: DailyQuote = {
  text: "记录就是生命的延续",
  postId: "",
  postTitle: "Cover Story",
};

/** 按日期稳定随机 — 同一天全站同一句（MIX-MATCH · D4 punch · `quotes.json`） */
export function getDailyQuote(referenceDate = new Date()): DailyQuote {
  if (quotePool.length === 0) return FALLBACK;
  const seed =
    referenceDate.getFullYear() * 10000 +
    (referenceDate.getMonth() + 1) * 100 +
    referenceDate.getDate();
  return quotePool[seed % quotePool.length];
}

/** 真随机一句（列表导语卡点击）；尽量避开上一句 */
export function getRandomQuote(avoidText?: string): DailyQuote {
  if (quotePool.length === 0) return FALLBACK;
  if (quotePool.length === 1) return quotePool[0];
  let next = quotePool[Math.floor(Math.random() * quotePool.length)];
  let tries = 0;
  while (avoidText && next.text === avoidText && tries < 10) {
    next = quotePool[Math.floor(Math.random() * quotePool.length)];
    tries += 1;
  }
  return next;
}
