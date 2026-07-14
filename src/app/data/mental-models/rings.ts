export type GalaxyRingId = "R1" | "R2" | "R3";

export type GalaxyRing = {
  id: GalaxyRingId;
  label: string;
  labelEn: string;
  /** 布局半径（SVG 坐标，圆心为画布中心 · 同心圆） */
  layoutRadius: number;
  description: string;
};

export const GALAXY_RINGS: GalaxyRing[] = [
  {
    id: "R1",
    label: "元规则",
    labelEn: "Meta Rules",
    layoutRadius: 72,
    description: "芒格体系的「操作系统」——所有模型调用须遵循。",
  },
  {
    id: "R2",
    label: "学科模型",
    labelEn: "Discipline Models",
    layoutRadius: 210,
    description: "按学科提炼的高频核心模型，跨学科交叉验证。",
  },
  {
    id: "R3",
    label: "场景应用",
    labelEn: "Scenarios",
    layoutRadius: 340,
    description: "落地场景占位；P1.5 起与模型多边连线、P2 链主题聚类。",
  },
];
