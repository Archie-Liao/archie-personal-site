export { GALAXY_RINGS, type GalaxyRing, type GalaxyRingId } from "./rings";
export { MODEL_NODES, type ModelNode, type ModelDiscipline, type ModelNodeStatus } from "./nodes";
export { MODEL_EDGES, type ModelEdge, type ModelEdgeRelation } from "./edges";
export { computeGalaxyLayout, GALAXY_VIEW, type NodePosition } from "./layout";

import { MODEL_NODES } from "./nodes";

const nodeMap = new Map(MODEL_NODES.map((n) => [n.id, n]));

export function getModelNode(id: string) {
  return nodeMap.get(id);
}

export function nodesByRing(ring: "R1" | "R2" | "R3") {
  return MODEL_NODES.filter((n) => n.ring === ring);
}
