import type { GalaxyRingId } from "./rings";
import { GALAXY_RINGS } from "./rings";
import { MODEL_NODES } from "./nodes";

export type NodePosition = {
  x: number;
  y: number;
  ringId: GalaxyRingId;
  angle: number;
};

const CENTER_X = 600;
const CENTER_Y = 400;

const RING_BY_ID = Object.fromEntries(GALAXY_RINGS.map((r) => [r.id, r])) as Record<
  "R1" | "R2" | "R3",
  (typeof GALAXY_RINGS)[number]
>;

/** 按圈层固定角度分布（同心圆 · 非力导向） */
export function computeGalaxyLayout(): Map<string, NodePosition> {
  const byRing = {
    R1: MODEL_NODES.filter((n) => n.ring === "R1"),
    R2: MODEL_NODES.filter((n) => n.ring === "R2"),
    R3: MODEL_NODES.filter((n) => n.ring === "R3"),
  };

  const map = new Map<string, NodePosition>();

  (["R1", "R2", "R3"] as const).forEach((ringId) => {
    const nodes = byRing[ringId];
    const radius = RING_BY_ID[ringId].layoutRadius;
    /** 圈间起始角错开，避免三圈节点对齐成放射线 */
    const ringStart: Record<GalaxyRingId, number> = {
      R1: -Math.PI / 2,
      R2: -Math.PI / 2 + Math.PI / 4.5,
      R3: -Math.PI / 2 + (Math.PI * 2) / 3.2,
    };
    const start = ringStart[ringId];

    nodes.forEach((node, i) => {
      const golden = (i * 2.399963) % (Math.PI * 2);
      const angle = start + (i / nodes.length) * Math.PI * 2 + golden * 0.06;
      map.set(node.id, {
        x: CENTER_X + Math.cos(angle) * radius,
        y: CENTER_Y + Math.sin(angle) * radius,
        ringId,
        angle,
      });
    });
  });

  return map;
}

export const GALAXY_VIEW = {
  width: 1200,
  height: 800,
  centerX: CENTER_X,
  centerY: CENTER_Y,
};
