export type ModelEdgeRelation = "supports" | "applies-to" | "cross-check";

export type ModelEdge = {
  from: string;
  to: string;
  relation: ModelEdgeRelation;
};

export const MODEL_EDGES: ModelEdge[] = [
  { from: "compound-interest", to: "meta-lattice", relation: "cross-check" },
  { from: "compound-interest", to: "scene-invest", relation: "applies-to" },
  { from: "compound-interest", to: "scene-growth", relation: "applies-to" },
  { from: "meta-invert", to: "social-proof", relation: "supports" },
  { from: "niche", to: "scene-create", relation: "applies-to" },
  { from: "opportunity-cost", to: "scene-invest", relation: "applies-to" },
  { from: "margin-of-safety", to: "meta-circle", relation: "cross-check" },
  { from: "first-principles", to: "meta-lattice", relation: "cross-check" },
  { from: "feedback-loop", to: "scene-create", relation: "applies-to" },
  { from: "moat", to: "scene-growth", relation: "applies-to" },
];
