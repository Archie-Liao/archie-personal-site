import type { ContentItem } from "../data/posts";

/** 与中心议题关联强度 → 曲线实/虚 */
export type MindmapRelation = "strong" | "weak";

export type MindmapBranchRole = "keyword" | "concept" | "point";

/** 2 = 中心下一环（彩色底）；3 = 再下一环（无底色，靠字号） */
export type MindmapLevel = 2 | 3;

/**
 * 布局选型（对齐 XMind 结构说明）：
 * - logic：逻辑图 — 主题在左，主/子题向右展开（适合分析、金字塔层级）
 * - map：思维导图 — 中心放射（适合少节点发散）
 * @see https://xmind.com/blog/how-to-combine-different-structures-in-xmind-and-why
 */
export type MindmapLayout = "logic" | "map";

export interface MindmapBranch {
  id: string;
  role: MindmapBranchRole;
  relation: MindmapRelation;
  level: MindmapLevel;
  /** 二级节点色板序号（同环内各不相同）；三级忽略 */
  swatch: number;
  /** 挂载父节点：二级挂 core；三级挂某个二级 id */
  parentId: "core" | string;
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
  layout: MindmapLayout;
  /** 为何选该布局（给工具栏/自检看） */
  layoutReason: string;
  /** 中心议题短语（精简后完整显示，目标 ≤8 字、勿省略号截断） */
  coreTopic: string;
  coreHint: string;
  /** 中心默认坐标（布局+整体居中后） */
  coreX: number;
  coreY: number;
  branches: MindmapBranch[];
}

/** 二级环明亮色板长度（CSS data-swatch 0…N-1 一一对应） */
export const MINDMAP_L2_SWATCH_COUNT = 8;

interface Point {
  x: number;
  y: number;
}

/** 中心议题用：去套话/标点，**不删**「过/的」等实词内字（避免「错过」→「错」） */
function lightCompress(s: string): string {
  let t = s
    .replace(
      /会自动|真的会|很多|如何|为什么|一下|其实|原来|正在|一个|比喻|讲透|关于|那些|这个|那种|完整中英对照版|的《|》/g,
      ""
    )
    .replace(/[！!？?。「」""''：:；;]/g, "")
    .replace(/[·|/]/g, " ")
    .trim();
  /* 含拉丁词：保留空格，避免 KarpathyLLM；纯中文去空格 */
  if (/[A-Za-z]{2,}/.test(t)) {
    return t.replace(/\s+/g, " ").trim();
  }
  return t.replace(/\s+/g, "").trim();
}

/** 节点短词用：可再压虚词；仍禁止半截词优先——过长才硬切 */
function compressPhrase(s: string): string {
  return lightCompress(s)
    .replace(/被|的|了|着|与|和|对|在|把|就|还|又|也|都|很|更|最/g, "")
    .trim();
}

function scoreCoreCandidate(p: string): number {
  let s = p.length;
  if (/AI|覆辙|杠杆|爆炸/.test(p)) s += 16;
  if (/[A-Za-z0-9]|认知|成长|关系/.test(p)) s += 6;
  if (/^[\u4e00-\u9fff]{2,8}$/.test(p)) s += 8;
  if (/^[A-Za-z][\w .-]{1,18}$/.test(p) && p.length <= 16) s += 12;
  if (p.length >= 4 && p.length <= 10) s += 6;
  if (p.length > 12) s -= 10;
  /* 偏「背景铺垫」的前半句略降权 */
  if (/被忽视|学会|原来/.test(p)) s -= 4;
  return s;
}

/**
 * 中心议题编写规则（详见 docs/MINDMAP-RULES.md）：
 * 1. 优先完整分句（按 ，！？： 切开），不拼残句
 * 2. 只 lightCompress，不拆「错过」这类词
 * 3. 中文目标 2～10 字；拉丁可略长；**单行完整显示**、禁止「…」
 * 例：「信息爆炸！别怕错过优质内容」→「信息爆炸」
 * 例：「手机被忽视，AI正在重蹈覆辙」→「AI重蹈覆辙」
 */
export function extractCoreTopic(title: string): string {
  const raw = title.replace(/\s+/g, " ").trim();
  if (!raw) return "议题";

  /* 长外链标题：优先作者/品牌短标，避免半截中文句 */
  const brand = raw.match(/^(Karpathy|Dan\s*Koe)/i);
  if (brand && raw.length > 24) {
    return brand[1].replace(/\s+/g, " ");
  }

  const parts = raw
    .split(/[，,！!？?：:；;]/)
    .map((p) => lightCompress(p))
    .filter((p) => p.length >= 2);

  if (parts.length >= 1) {
    const ranked = [...parts].sort((a, b) => scoreCoreCandidate(b) - scoreCoreCandidate(a));
    const best = ranked[0];
    const maxLen = /[A-Za-z]{2,}/.test(best) ? 18 : 10;
    if (best.length <= maxLen) return best;
    return best.slice(0, maxLen).trim();
  }

  const t = lightCompress(raw) || raw.replace(/[，,！!？?。]/g, "");
  const maxLen = /[A-Za-z]{2,}/.test(t) ? 18 : 10;
  if (t.length <= maxLen) return t;
  return t.slice(0, maxLen).trim();
}

/** 知识卡片 front → 中文关键词（完整显示，≤8） */
export function extractCardKeyword(front: string): string {
  const zh = front.split(/\s+/)[0]?.split(/[·|/]/)[0]?.trim() ?? front;
  const t = lightCompress(zh) || zh;
  if (t.length <= 8) return t;
  const tight = compressPhrase(zh) || t;
  if (tight.length <= 8) return tight;
  return t.slice(0, 8);
}

/** AI 要点句 → 短关键词（完整显示） */
export function extractPointKeyword(point: string): string {
  const quoted = point.match(/「([^」]{2,8})」/);
  if (quoted) return quoted[1];

  const beforeDash = point.split(/[———]/)[0]?.trim() ?? point;
  const light = lightCompress(beforeDash) || beforeDash.replace(/[，。；、]/g, "");
  if (light.length <= 8) return light;

  const tight = compressPhrase(beforeDash);
  if (tight && tight.length <= 8) return tight;

  const afterDe = beforeDash.match(/的([^，。；、]{2,6})/);
  if (afterDe) return afterDe[1];

  return light.slice(0, 8);
}

export function clampPct(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** 有三级或二级≥3 → 逻辑图；否则中心放射（少节点发散） */
export function chooseMindmapLayout(l2Count: number, hasL3: boolean): MindmapLayout {
  if (hasL3 || l2Count >= 3) return "logic";
  return "map";
}

export function describeLayoutReason(layout: MindmapLayout, l2Count: number, hasL3: boolean): string {
  if (layout === "logic") {
    if (hasL3 && l2Count > 0) return "逻辑图 · 有知识卡+AI要点（分析层级）";
    if (hasL3) return "逻辑图 · 有 AI要点层级";
    if (l2Count >= 3) return "逻辑图 · 主分支≥3";
    return "逻辑图";
  }
  return "导图 · 少节点发散（L2<3 且无 L3）";
}

/**
 * 构图算完后，把整组节点平移（必要时微缩）使包围盒居中于画框。
 * 相对位置不变；边距 pad% 内不贴边。
 */
export function centerComposition(core: Point, branches: MindmapBranch[], pad = 10): void {
  if (branches.length === 0) {
    core.x = 50;
    core.y = 50;
    return;
  }

  const xs = [core.x, ...branches.map((b) => b.defaultX)];
  const ys = [core.y, ...branches.map((b) => b.defaultY)];
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const spanX = Math.max(maxX - minX, 1);
  const spanY = Math.max(maxY - minY, 1);
  const avail = 100 - 2 * pad;

  let scale = 1;
  if (spanX > avail) scale = Math.min(scale, avail / spanX);
  if (spanY > avail) scale = Math.min(scale, avail / spanY);

  const place = (x: number, y: number) => ({
    x: 50 + (x - midX) * scale,
    y: 50 + (y - midY) * scale,
  });

  const c = place(core.x, core.y);
  core.x = c.x;
  core.y = c.y;
  for (const b of branches) {
    const p = place(b.defaultX, b.defaultY);
    b.defaultX = p.x;
    b.defaultY = p.y;
  }

  /* 再兜一层边距（缩放后仍可能贴边） */
  const xs2 = [core.x, ...branches.map((b) => b.defaultX)];
  const ys2 = [core.y, ...branches.map((b) => b.defaultY)];
  let dx = 0;
  let dy = 0;
  const minX2 = Math.min(...xs2);
  const maxX2 = Math.max(...xs2);
  const minY2 = Math.min(...ys2);
  const maxY2 = Math.max(...ys2);
  if (minX2 < pad) dx = pad - minX2;
  else if (maxX2 > 100 - pad) dx = 100 - pad - maxX2;
  if (minY2 < pad) dy = pad - minY2;
  else if (maxY2 > 100 - pad) dy = 100 - pad - maxY2;
  if (dx !== 0 || dy !== 0) {
    core.x += dx;
    core.y += dy;
    for (const b of branches) {
      b.defaultX += dx;
      b.defaultY += dy;
    }
  }
}

/** 逻辑图：主题左；有「挂 core 的 L3」时上下分带，避免线穿 L2 色块 */
function layoutLogic(branches: MindmapBranch[]): { core: Point } {
  const l2 = branches.filter((b) => b.level === 2);
  const underCore = branches.filter((b) => b.level === 3 && b.parentId === "core");
  const underL2 = branches.filter((b) => b.level === 3 && b.parentId !== "core");
  const splitBands = l2.length > 0 && underCore.length > 0;

  if (splitBands) {
    /* 上带 = 知识卡；下带 = AI要点；中间留空廊，线不穿色块 */
    const l2Top = 12;
    const l2Bot = 42;
    const l3Top = 60;
    const l3Bot = 90;
    const n2 = Math.max(l2.length, 1);
    const n3 = Math.max(underCore.length, 1);
    l2.forEach((b, i) => {
      b.defaultX = 48;
      b.defaultY = l2Top + ((i + 0.5) / n2) * (l2Bot - l2Top);
    });
    underCore.forEach((b, j) => {
      b.defaultX = 48;
      b.defaultY = l3Top + ((j + 0.5) / n3) * (l3Bot - l3Top);
    });
    return { core: { x: 13, y: 36 } };
  }

  const top = 14;
  const bottom = 86;
  const span = bottom - top;
  const n = Math.max(l2.length, 1);
  l2.forEach((b, i) => {
    b.defaultX = 44;
    b.defaultY = top + ((i + 0.5) / n) * span;
  });

  const byParent = new Map<string, MindmapBranch[]>();
  for (const b of underL2) {
    const list = byParent.get(b.parentId) ?? [];
    list.push(b);
    byParent.set(b.parentId, list);
  }

  const l3Placed: MindmapBranch[] = [];
  for (const parent of l2) {
    const kids = byParent.get(parent.id) ?? [];
    const k = kids.length;
    kids.forEach((child, j) => {
      const mid = (k - 1) / 2;
      child.defaultX = 74;
      child.defaultY = parent.defaultY + (j - mid) * 11;
      l3Placed.push(child);
    });
  }

  l3Placed.sort((a, b) => a.defaultY - b.defaultY);
  const minGap = 9;
  for (let i = 1; i < l3Placed.length; i++) {
    if (l3Placed[i].defaultY - l3Placed[i - 1].defaultY < minGap) {
      l3Placed[i].defaultY = l3Placed[i - 1].defaultY + minGap;
    }
  }
  for (const c of l3Placed) {
    c.defaultY = clampPct(c.defaultY, 8, 92);
  }

  return { core: { x: 12, y: 50 } };
}

/** 导图：左右交替槽位；挂 core 的 L3 放外圈，避开 L2 框 */
function layoutMap(branches: MindmapBranch[]): { core: Point } {
  const slots = [
    { x: 18, y: 22 },
    { x: 82, y: 22 },
    { x: 14, y: 50 },
    { x: 86, y: 50 },
    { x: 20, y: 78 },
    { x: 80, y: 78 },
  ];
  const l2 = branches.filter((b) => b.level === 2);
  l2.forEach((b, i) => {
    const s = slots[i % slots.length];
    b.defaultX = s.x;
    b.defaultY = s.y;
  });

  const byParent = new Map<string, MindmapBranch[]>();
  for (const b of branches) {
    if (b.level !== 3) continue;
    const list = byParent.get(b.parentId) ?? [];
    list.push(b);
    byParent.set(b.parentId, list);
  }

  const underCore = byParent.get("core") ?? [];
  underCore.forEach((child, j) => {
    const s = slots[(l2.length + j) % slots.length];
    child.defaultX = clampPct(s.x < 50 ? s.x - 6 : s.x + 6, 5, 95);
    child.defaultY = clampPct(s.y + (j % 2 === 0 ? -10 : 10), 8, 92);
  });

  for (const parent of l2) {
    const kids = byParent.get(parent.id) ?? [];
    const outward = parent.defaultX < 50 ? -1 : 1;
    const k = kids.length;
    kids.forEach((child, j) => {
      const mid = (k - 1) / 2;
      child.defaultX = clampPct(parent.defaultX + outward * 16, 5, 95);
      child.defaultY = clampPct(parent.defaultY + (j - mid) * 12, 8, 92);
    });
  }

  return { core: { x: 50, y: 50 } };
}

/**
 * 思维导图基础结构（A3-3）
 *
 * 按内容选布局（XMind）：有层级 → 逻辑图；少节点 → 中心导图。
 * L2 知识卡彩色 · L3 要点无底色靠字号。
 */
export function buildMindmapModel(post: ContentItem): MindmapModel {
  const branches: MindmapBranch[] = [];
  let swatch = 0;

  for (const card of post.knowledgeCards.slice(0, 6)) {
    branches.push({
      id: card.id,
      role: "keyword",
      relation: "strong",
      level: 2,
      swatch: swatch % MINDMAP_L2_SWATCH_COUNT,
      parentId: "core",
      kicker: "知识卡",
      keyword: extractCardKeyword(card.front),
      hint: card.front,
      defaultX: 0,
      defaultY: 0,
    });
    swatch += 1;
  }

  const points = post.aiSummary.keyPoints.filter((p) => p.trim() && !/待补/.test(p));
  const l2Parents = branches.filter((b) => b.level === 2);

  if (l2Parents.length > 0) {
    /*
     * 无显式归属字段前：要点只挂 core（弱相关 L3），禁止轮询挂到知识卡冒充父子。
     * 有人工/结构化 parentId 后再挂到对应 L2。
     */
    for (const [i, point] of points.entries()) {
      branches.push({
        id: `kp-${i}`,
        role: "point",
        relation: "weak",
        level: 3,
        swatch: 0,
        parentId: "core",
        kicker: "AI要点",
        keyword: extractPointKeyword(point),
        hint: point,
        defaultX: 0,
        defaultY: 0,
      });
    }
  } else {
    for (const [i, point] of points.slice(0, 6).entries()) {
      branches.push({
        id: `kp-${i}`,
        role: "point",
        relation: "weak",
        level: 2,
        swatch: swatch % MINDMAP_L2_SWATCH_COUNT,
        parentId: "core",
        kicker: "AI要点",
        keyword: extractPointKeyword(point),
        hint: point,
        defaultX: 0,
        defaultY: 0,
      });
      swatch += 1;
    }
  }

  if (branches.length === 0 && post.tags.length > 0) {
    for (const tag of post.tags.slice(0, 4)) {
      branches.push({
        id: `tag-${tag}`,
        role: "concept",
        relation: "strong",
        level: 2,
        swatch: swatch % MINDMAP_L2_SWATCH_COUNT,
        parentId: "core",
        kicker: "主题",
        keyword: tag,
        hint: tag,
        defaultX: 0,
        defaultY: 0,
      });
      swatch += 1;
    }
  }

  const l2Count = branches.filter((b) => b.level === 2).length;
  const hasL3 = branches.some((b) => b.level === 3);
  const layout = chooseMindmapLayout(l2Count, hasL3);
  const corePos = layout === "logic" ? layoutLogic(branches) : layoutMap(branches);
  centerComposition(corePos.core, branches, 10);

  return {
    layout,
    layoutReason: describeLayoutReason(layout, l2Count, hasL3),
    coreTopic: extractCoreTopic(post.title),
    coreHint: post.title,
    coreX: corePos.core.x,
    coreY: corePos.core.y,
    branches,
  };
}

export function initialMindmapPositions(model: MindmapModel): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {
    core: { x: model.coreX, y: model.coreY },
  };
  for (const b of model.branches) {
    positions[b.id] = { x: b.defaultX, y: b.defaultY };
  }
  return positions;
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

/**
 * 中心议题：线**不贴字**。先算朝外方向的外缘，再沿径向再空出 gapPx。
 */
export function coreGapStart(
  coreEl: HTMLElement,
  layerRect: DOMRect,
  toward: Point,
  gapPx = 20
): Point {
  const c = nodeCenter(coreEl, layerRect);
  const edge = borderAnchor(coreEl, layerRect, toward);
  const dx = toward.x - c.x;
  const dy = toward.y - c.y;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x: edge.x + (dx / len) * gapPx,
    y: edge.y + (dy / len) * gapPx,
  };
}

/**
 * 外围节点：贴朝向参照点的侧边中点（逻辑图多为左右对接）。
 * 拖动后按相对位置重算，避免线穿进框。
 */
export function sideDockAnchor(el: HTMLElement, layerRect: DOMRect, toward: Point): Point {
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2 - layerRect.left;
  const cy = r.top + r.height / 2 - layerRect.top;
  const dx = toward.x - cx;
  const dy = toward.y - cy;
  /* 主轴更偏水平 → 左右边；更偏竖直 → 上下边（拖动时连线跟着变） */
  if (Math.abs(dx) >= Math.abs(dy)) {
    const onRight = cx >= toward.x;
    return {
      x: onRight ? r.left - layerRect.left : r.right - layerRect.left,
      y: cy,
    };
  }
  const onBottom = cy >= toward.y;
  return {
    x: cx,
    y: onBottom ? r.top - layerRect.top : r.bottom - layerRect.top,
  };
}

/**
 * 逻辑图「避让」连线：先在靠近中心的竖廊拐弯，再水平接入，
 * 避免穿过中间列的 L2 色块（core→AI要点 专用）。
 */
export function avoidBandPath(from: Point, to: Point): string {
  const laneX = from.x + Math.max(32, Math.min(72, Math.abs(to.x - from.x) * 0.28));
  const c1x = laneX;
  const c1y = from.y;
  const c2x = laneX;
  const c2y = to.y;
  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

/**
 * XMind 式连线：沿主轴抽出再接入。
 * 拖动后根据起终点相对位置改控制点（横/竖主轴切换）。
 */
export function curvedPath(from: Point, to: Point, bend = 0.28): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);

  if (absX >= absY) {
    const side = Math.sign(dx) || 1;
    const pull = Math.min(Math.max(absX * (0.45 + bend * 0.35), 36), len * 0.55, 160);
    const c1x = from.x + side * pull;
    const c1y = from.y + dy * 0.12;
    const c2x = to.x - side * Math.min(Math.max(absX * 0.28, 24), 80);
    const c2y = to.y;
    return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
  }

  const side = Math.sign(dy) || 1;
  const pull = Math.min(Math.max(absY * (0.45 + bend * 0.35), 28), len * 0.55, 120);
  const c1x = from.x + dx * 0.12;
  const c1y = from.y + side * pull;
  const c2x = to.x;
  const c2y = to.y - side * Math.min(Math.max(absY * 0.28, 20), 64);
  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

/** 某节点的全部子孙（拖动父题时整枝平移，对齐 XMind 主题树行为） */
export function collectDescendantIds(model: MindmapModel, rootId: string): string[] {
  const kids = model.branches.filter((b) => b.parentId === rootId).map((b) => b.id);
  const all = [...kids];
  for (const id of kids) {
    all.push(...collectDescendantIds(model, id));
  }
  return all;
}
