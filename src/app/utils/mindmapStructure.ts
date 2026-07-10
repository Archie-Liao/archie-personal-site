import type { ContentItem } from "../data/posts";

/** 与中心议题关联强度 → 曲线实/虚 */
export type MindmapRelation = "strong" | "weak";

export type MindmapBranchRole = "keyword" | "concept" | "point";

export interface MindmapBranch {
  id: string;
  role: MindmapBranchRole;
  relation: MindmapRelation;
  /** 节点上方小标签：关键词 / 概念 / 要点 */
  kicker: string;
  /** 节点框内只显示关键词（2～8 字），非整句 */
  keyword: string;
  /** hover 完整说明 */
  hint: string;
  defaultX: number;
  defaultY: number;
}

export interface MindmapModel {
  /** 中心议题短语（≤10 字） */
  coreTopic: string;
  coreHint: string;
  branches: MindmapBranch[];
}

const SLOT_LAYOUT: { x: number; y: number }[] = [
  { x: 24, y: 24 },
  { x: 76, y: 24 },
  { x: 20, y: 76 },
  { x: 80, y: 76 },
  { x: 50, y: 16 },
  { x: 50, y: 84 },
];

/** 去掉口语 filler，保留议题短语 */
export function extractCoreTopic(title: string): string {
  const t = title
    .replace(/会自动|真的会|很多|如何|为什么|一下|其实/g, "")
    .replace(/[！!？?。]/g, "")
    .trim();
  if (t.length <= 10) return t;
  return `${t.slice(0, 9)}…`;
}

/** 知识卡片 front → 中文关键词 */
export function extractCardKeyword(front: string): string {
  const zh = front.split(/\s+/)[0]?.split(/[·|/]/)[0]?.trim() ?? front;
  if (zh.length <= 8) return zh;
  return `${zh.slice(0, 7)}…`;
}

/** AI 要点句 → 2～6 字关键词 */
export function extractPointKeyword(point: string): string {
  const quoted = point.match(/「([^」]{2,8})」/);
  if (quoted) return quoted[1];

  const beforeDash = point.split(/[———]/)[0]?.trim() ?? point;
  if (beforeDash.length <= 8) {
    return beforeDash.replace(/[，。；、]/g, "").slice(0, 8);
  }

  const afterDe = beforeDash.match(/的([^，。；、]{2,6})/);
  if (afterDe) return afterDe[1];

  return beforeDash.replace(/[，。；、]/g, "").slice(0, 6);
}

/**
 * 思维导图基础结构（A3-3）
 *
 * 中心 ──实曲线── 强相关（knowledgeCards · 关键词/概念）
 *   └──虚曲线── 弱相关（keyPoints 提炼词 · 要点）
 *
 * 节点框内 **仅关键词**；完整句放 hint / AI 总结区。
 */
export function buildMindmapModel(post: ContentItem): MindmapModel {
  const branches: MindmapBranch[] = [];
  let slot = 0;

  for (const card of post.knowledgeCards) {
    if (slot >= SLOT_LAYOUT.length) break;
    const pos = SLOT_LAYOUT[slot];
    branches.push({
      id: card.id,
      role: "keyword",
      relation: "strong",
      kicker: "关键词",
      keyword: extractCardKeyword(card.front),
      hint: card.front,
      defaultX: pos.x,
      defaultY: pos.y,
    });
    slot += 1;
  }

  for (const [i, point] of post.aiSummary.keyPoints
    .filter((p) => p.trim() && !/待补/.test(p))
    .entries()) {
    if (slot >= SLOT_LAYOUT.length) break;
    const pos = SLOT_LAYOUT[slot];
    branches.push({
      id: `kp-${i}`,
      role: "point",
      relation: "weak",
      kicker: "要点",
      keyword: extractPointKeyword(point),
      hint: point,
      defaultX: pos.x,
      defaultY: pos.y,
    });
    slot += 1;
  }

  if (branches.length === 0 && post.tags.length > 0) {
    for (const tag of post.tags.slice(0, 4)) {
      if (slot >= SLOT_LAYOUT.length) break;
      const pos = SLOT_LAYOUT[slot];
      branches.push({
        id: `tag-${tag}`,
        role: "concept",
        relation: slot < 2 ? "strong" : "weak",
        kicker: "主题",
        keyword: tag,
        hint: tag,
        defaultX: pos.x,
        defaultY: pos.y,
      });
      slot += 1;
    }
  }

  return {
    coreTopic: extractCoreTopic(post.title),
    coreHint: post.title,
    branches,
  };
}

export function initialMindmapPositions(model: MindmapModel): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {
    core: { x: 50, y: 50 },
  };
  for (const b of model.branches) {
    positions[b.id] = { x: b.defaultX, y: b.defaultY };
  }
  return positions;
}

interface Point {
  x: number;
  y: number;
}

export function nodeCenter(el: HTMLElement, layerRect: DOMRect): Point {
  const r = el.getBoundingClientRect();
  return {
    x: r.left + r.width / 2 - layerRect.left,
    y: r.top + r.height / 2 - layerRect.top,
  };
}

/** 矩形边缘上朝向 target 的锚点（连线接在框上） */
export function borderAnchor(el: HTMLElement, layerRect: DOMRect, toward: Point): Point {
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2 - layerRect.left;
  const cy = r.top + r.height / 2 - layerRect.top;
  const dx = toward.x - cx;
  const dy = toward.y - cy;
  if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
    return { x: cx, y: cy };
  }
  const hw = r.width / 2;
  const hh = r.height / 2;
  const sx = Math.abs(dx) > 0.001 ? hw / Math.abs(dx) : Number.POSITIVE_INFINITY;
  const sy = Math.abs(dy) > 0.001 ? hh / Math.abs(dy) : Number.POSITIVE_INFINITY;
  const s = Math.min(sx, sy);
  return { x: cx + dx * s, y: cy + dy * s };
}

/** 二次贝塞尔曲线 */
export function curvedPath(from: Point, to: Point, bend = 0.2): string {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * len * bend;
  const cy = my + ny * len * bend;
  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

export function clampPct(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
