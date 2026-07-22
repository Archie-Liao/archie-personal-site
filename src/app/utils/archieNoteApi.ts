/** 亲笔旁注 · CloudBase HTTP API（门闩存在 localStorage） */
import { siteConfig } from "../site.config";
import type { ArchieNoteBlock, ArchieNoteDoc } from "../types/archieNote";

const GATE_KEY = "archie-note-gate";

export function getArchieNoteGate(): string {
  try {
    return localStorage.getItem(GATE_KEY)?.trim() || "";
  } catch {
    return "";
  }
}

export function setArchieNoteGate(gate: string) {
  try {
    if (gate) localStorage.setItem(GATE_KEY, gate);
    else localStorage.removeItem(GATE_KEY);
  } catch {
    /* ignore */
  }
}

export function clearArchieNoteGate() {
  setArchieNoteGate("");
}

function endpoint(): string {
  const ep = (siteConfig as { authorNotes?: { endpoint?: string } }).authorNotes?.endpoint?.trim();
  return ep || "";
}

async function parseJson(res: Response): Promise<Record<string, unknown>> {
  const text = await res.text();
  try {
    return JSON.parse(text || "{}") as Record<string, unknown>;
  } catch {
    return { ok: false, error: text.slice(0, 200) || "invalid json" };
  }
}

export async function fetchArchieNote(postId: string): Promise<ArchieNoteDoc> {
  const base = endpoint();
  if (!base) {
    return { postId, blocks: [], updatedAt: null };
  }
  const url = `${base}?postId=${encodeURIComponent(postId)}`;
  const res = await fetch(url, { method: "GET" });
  const data = await parseJson(res);
  if (!res.ok || data.ok === false) {
    throw new Error(String(data.error || `加载失败 (${res.status})`));
  }
  return {
    postId: String(data.postId || postId),
    blocks: Array.isArray(data.blocks) ? (data.blocks as ArchieNoteBlock[]) : [],
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : null,
  };
}

export async function loginArchieNote(gate: string): Promise<void> {
  const base = endpoint();
  if (!base) throw new Error("未配置 authorNotes.endpoint");
  const res = await fetch(base, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "login", gate }),
  });
  const data = await parseJson(res);
  if (!res.ok || data.ok === false) {
    throw new Error(String(data.error || "口令不正确"));
  }
  setArchieNoteGate(gate);
}

export async function saveArchieNote(
  postId: string,
  blocks: ArchieNoteBlock[],
): Promise<ArchieNoteDoc> {
  const base = endpoint();
  if (!base) throw new Error("未配置 authorNotes.endpoint");
  const gate = getArchieNoteGate();
  if (!gate) throw new Error("未登录");
  const res = await fetch(base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Author-Gate": gate,
    },
    body: JSON.stringify({ action: "save", gate, postId, blocks }),
  });
  const data = await parseJson(res);
  if (!res.ok || data.ok === false) {
    throw new Error(String(data.error || "保存失败"));
  }
  return {
    postId: String(data.postId || postId),
    blocks: Array.isArray(data.blocks) ? (data.blocks as ArchieNoteBlock[]) : blocks,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : null,
  };
}

export type ArchieNoteExportPayload = {
  exportedAt: string;
  notes: ArchieNoteDoc[];
};

export async function exportArchieNotes(): Promise<ArchieNoteExportPayload> {
  const base = endpoint();
  if (!base) throw new Error("未配置 authorNotes.endpoint");
  const gate = getArchieNoteGate();
  if (!gate) throw new Error("未登录");
  const res = await fetch(base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Author-Gate": gate,
    },
    body: JSON.stringify({ action: "export", gate }),
  });
  const data = await parseJson(res);
  if (!res.ok || data.ok === false) {
    throw new Error(String(data.error || "导出失败"));
  }
  return {
    exportedAt: typeof data.exportedAt === "string" ? data.exportedAt : new Date().toISOString(),
    notes: Array.isArray(data.notes) ? (data.notes as ArchieNoteDoc[]) : [],
  };
}

export function downloadJson(filename: string, payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
