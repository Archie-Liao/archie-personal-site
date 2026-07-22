/** 亲笔旁注 · 块模型（与云库 / 导出 JSON 一致） */

export type ArchieMindmapNode = {
  id: string;
  text: string;
  children: ArchieMindmapNode[];
};

export type ArchieProseBlock = {
  id: string;
  type: "prose";
  text: string;
};

export type ArchieMindmapBlock = {
  id: string;
  type: "mindmap";
  center: string;
  layout?: "logic" | "map";
  children: ArchieMindmapNode[];
  positions?: Record<string, { x: number; y: number }>;
};

export type ArchieNoteBlock = ArchieProseBlock | ArchieMindmapBlock;

export type ArchieNoteDoc = {
  postId: string;
  blocks: ArchieNoteBlock[];
  updatedAt: string | null;
};

export function newNoteId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function emptyMindmapBlock(): ArchieMindmapBlock {
  return {
    id: newNoteId("mm"),
    type: "mindmap",
    center: "中心议题",
    layout: "logic",
    children: [
      { id: newNoteId("n"), text: "主枝 1", children: [] },
      { id: newNoteId("n"), text: "主枝 2", children: [] },
    ],
  };
}

export function emptyProseBlock(): ArchieProseBlock {
  return { id: newNoteId("p"), type: "prose", text: "" };
}
