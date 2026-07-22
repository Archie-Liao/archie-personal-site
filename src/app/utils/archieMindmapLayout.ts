/** 亲笔旁注导图 · 树布局与树编辑辅助 */
import type { ArchieMindmapBlock, ArchieMindmapNode } from "../types/archieNote";
import { newNoteId } from "../types/archieNote";

export type PctPos = { x: number; y: number };

const CORE_ID = "core";

export function clampPct(n: number, min = 5, max = 95) {
  return Math.min(max, Math.max(min, n));
}

export function walkNodes(
  children: ArchieMindmapNode[],
  visit: (node: ArchieMindmapNode, parentId: string, depth: number) => void,
  parentId = CORE_ID,
  depth = 1,
) {
  for (const n of children) {
    visit(n, parentId, depth);
    if (n.children?.length) walkNodes(n.children, visit, n.id, depth + 1);
  }
}

export function flattenNodeIds(block: ArchieMindmapBlock): string[] {
  const ids = [CORE_ID];
  walkNodes(block.children || [], (n) => {
    ids.push(n.id);
  });
  return ids;
}

export function findNode(
  children: ArchieMindmapNode[],
  id: string,
): ArchieMindmapNode | null {
  for (const n of children) {
    if (n.id === id) return n;
    const hit = findNode(n.children || [], id);
    if (hit) return hit;
  }
  return null;
}

export function findParentId(
  children: ArchieMindmapNode[],
  id: string,
  parentId: string = CORE_ID,
): string | null {
  for (const n of children) {
    if (n.id === id) return parentId;
    const hit = findParentId(n.children || [], id, n.id);
    if (hit) return hit;
  }
  return null;
}

export function collectDescendantIds(node: ArchieMindmapNode): string[] {
  const out: string[] = [];
  const walk = (n: ArchieMindmapNode) => {
    for (const c of n.children || []) {
      out.push(c.id);
      walk(c);
    }
  };
  walk(node);
  return out;
}

function countLeaves(nodes: ArchieMindmapNode[]): number {
  if (!nodes.length) return 1;
  return nodes.reduce((s, n) => s + (n.children?.length ? countLeaves(n.children) : 1), 0);
}

/** 逻辑图：中心靠左，主枝向右分层展开 */
function layoutLogicTree(block: ArchieMindmapBlock): Record<string, PctPos> {
  const pos: Record<string, PctPos> = { [CORE_ID]: { x: 14, y: 50 } };
  const roots = block.children || [];
  const total = Math.max(countLeaves(roots), 1);
  let cursor = 0;

  const place = (nodes: ArchieMindmapNode[], depth: number) => {
    for (const n of nodes) {
      const leaves = n.children?.length ? countLeaves(n.children) : 1;
      const mid = cursor + leaves / 2;
      const y = clampPct(8 + ((mid - 0.5) / total) * 84, 8, 92);
      const x = clampPct(14 + depth * 22, 10, 92);
      pos[n.id] = { x, y };
      cursor += leaves;
      if (n.children?.length) {
        const saved = cursor;
        cursor -= leaves;
        place(n.children, depth + 1);
        cursor = saved;
      }
    }
  };

  place(roots, 1);
  return pos;
}

/** 导图：中心放射，主枝环绕 */
function layoutMapTree(block: ArchieMindmapBlock): Record<string, PctPos> {
  const pos: Record<string, PctPos> = { [CORE_ID]: { x: 50, y: 50 } };
  const roots = block.children || [];
  const n = Math.max(roots.length, 1);

  roots.forEach((root, i) => {
    const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const rx = 28;
    const ry = 26;
    const x = clampPct(50 + Math.cos(angle) * rx, 8, 92);
    const y = clampPct(50 + Math.sin(angle) * ry, 10, 90);
    pos[root.id] = { x, y };

    const kids = root.children || [];
    kids.forEach((child, j) => {
      const mid = (kids.length - 1) / 2;
      const outward = {
        x: Math.cos(angle) * 16,
        y: Math.sin(angle) * 14,
      };
      const tang = {
        x: -Math.sin(angle) * ((j - mid) * 10),
        y: Math.cos(angle) * ((j - mid) * 10),
      };
      pos[child.id] = {
        x: clampPct(x + outward.x + tang.x, 5, 95),
        y: clampPct(y + outward.y + tang.y, 8, 92),
      };
      for (const grand of child.children || []) {
        pos[grand.id] = {
          x: clampPct(pos[child.id].x + outward.x * 0.7, 5, 95),
          y: clampPct(pos[child.id].y + outward.y * 0.7, 8, 92),
        };
      }
    });
  });

  /* deeper levels: place near parent if missing */
  walkNodes(roots, (node, parentId) => {
    if (pos[node.id]) return;
    const p = pos[parentId] || { x: 50, y: 50 };
    pos[node.id] = {
      x: clampPct(p.x + 12, 5, 95),
      y: clampPct(p.y + 8, 8, 92),
    };
  });

  return pos;
}

export function computeArchieMindmapPositions(
  block: ArchieMindmapBlock,
): Record<string, PctPos> {
  const layout = block.layout === "map" ? "map" : "logic";
  const auto = layout === "map" ? layoutMapTree(block) : layoutLogicTree(block);
  const saved = block.positions || {};
  const merged: Record<string, PctPos> = { ...auto };
  for (const [id, p] of Object.entries(saved)) {
    if (p && typeof p.x === "number" && typeof p.y === "number") {
      merged[id] = { x: clampPct(p.x), y: clampPct(p.y) };
    }
  }
  return merged;
}

/** 像素坐标贝塞尔（锚点已在节点框外） */
export function curvedEdgePx(
  from: { x: number; y: number },
  to: { x: number; y: number },
): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const c1x = from.x + dx * 0.4;
  const c1y = from.y;
  const c2x = from.x + dx * 0.6;
  const c2y = to.y;
  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

/** @deprecated 中心点连线；改用框外锚点 + curvedEdgePx */
export function curvedEdge(
  from: PctPos,
  to: PctPos,
  w: number,
  h: number,
): string {
  return curvedEdgePx(
    { x: (from.x / 100) * w, y: (from.y / 100) * h },
    { x: (to.x / 100) * w, y: (to.y / 100) * h },
  );
}

export function updateNodeText(
  block: ArchieMindmapBlock,
  nodeId: string,
  text: string,
): ArchieMindmapBlock {
  if (nodeId === CORE_ID) {
    return { ...block, center: text };
  }
  const cloneKids = (nodes: ArchieMindmapNode[]): ArchieMindmapNode[] =>
    nodes.map((n) =>
      n.id === nodeId
        ? { ...n, text }
        : { ...n, children: cloneKids(n.children || []) },
    );
  return { ...block, children: cloneKids(block.children || []) };
}

export function addChildNode(
  block: ArchieMindmapBlock,
  parentId: string,
): ArchieMindmapBlock {
  const child: ArchieMindmapNode = {
    id: newNoteId("n"),
    text: "新主题",
    children: [],
  };
  if (parentId === CORE_ID) {
    return { ...block, children: [...(block.children || []), child] };
  }
  const inject = (nodes: ArchieMindmapNode[]): ArchieMindmapNode[] =>
    nodes.map((n) =>
      n.id === parentId
        ? { ...n, children: [...(n.children || []), child] }
        : { ...n, children: inject(n.children || []) },
    );
  return { ...block, children: inject(block.children || []) };
}

export function addSiblingNode(
  block: ArchieMindmapBlock,
  nodeId: string,
): ArchieMindmapBlock {
  if (nodeId === CORE_ID) return addChildNode(block, CORE_ID);
  const parentId = findParentId(block.children || [], nodeId);
  if (!parentId) return block;
  return addChildNode(block, parentId);
}

export function removeNode(
  block: ArchieMindmapBlock,
  nodeId: string,
): ArchieMindmapBlock {
  if (nodeId === CORE_ID) return block;
  const filter = (nodes: ArchieMindmapNode[]): ArchieMindmapNode[] =>
    nodes
      .filter((n) => n.id !== nodeId)
      .map((n) => ({ ...n, children: filter(n.children || []) }));
  const nextPos = { ...(block.positions || {}) };
  delete nextPos[nodeId];
  return { ...block, children: filter(block.children || []), positions: nextPos };
}

export function setLayoutMode(
  block: ArchieMindmapBlock,
  layout: "logic" | "map",
): ArchieMindmapBlock {
  const next = { ...block, layout, positions: undefined };
  return { ...next, positions: computeArchieMindmapPositions(next) };
}

export { CORE_ID as ARCHIE_MM_CORE_ID };
