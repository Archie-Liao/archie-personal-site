/**
 * P3 · authorNotes
 * 亲笔旁注读写 · 真源在 CloudBase 数据库集合 author_notes
 *
 * 环境变量：
 * - AUTHOR_NOTE_GATE  写/导出/校验登录用口令（勿进 Git）
 *
 * HTTP：
 * - OPTIONS
 * - GET  ?postId=ep099          公开读一篇
 * - POST { action:"login", gate }
 * - POST { action:"save", gate, postId, blocks }
 * - POST { action:"export", gate }  导出全部（换库用）
 */

const cloud = require("@cloudbase/node-sdk");

const COLLECTION = "author_notes";

function corsHeaders() {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, X-Author-Gate",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
}

function isHttpEvent(event) {
  return Boolean(
    event &&
      (event.httpMethod ||
        event.requestContext ||
        typeof event.body === "string" ||
        (event.headers && (event.path || event.url))),
  );
}

function httpResponse(statusCode, data) {
  return {
    statusCode,
    headers: corsHeaders(),
    body: JSON.stringify(data),
  };
}

function parsePayload(event) {
  let payload = event || {};
  if (typeof event?.body === "string") {
    try {
      payload = JSON.parse(event.body || "{}");
    } catch {
      payload = {};
    }
  } else if (event?.body && typeof event.body === "object") {
    payload = event.body;
  }
  if (payload?.data && typeof payload.data === "object" && !payload.action && !payload.postId) {
    payload = payload.data;
  }
  return payload;
}

function queryPostId(event) {
  const q = event?.queryStringParameters || event?.queryString || {};
  if (typeof q.postId === "string") return q.postId.trim();
  const raw = event?.queryString || "";
  if (typeof raw === "string" && raw.includes("postId=")) {
    try {
      return new URLSearchParams(raw.startsWith("?") ? raw.slice(1) : raw).get("postId") || "";
    } catch {
      return "";
    }
  }
  return "";
}

function gateFrom(event, payload) {
  const h = event?.headers || {};
  const headerGate =
    h["x-author-gate"] || h["X-Author-Gate"] || h["X-AUTHOR-GATE"] || "";
  const bodyGate = typeof payload.gate === "string" ? payload.gate : "";
  return String(headerGate || bodyGate || "").trim();
}

function checkGate(gate) {
  const expected = (process.env.AUTHOR_NOTE_GATE || "").trim();
  if (!expected) return { ok: false, error: "服务端未配置 AUTHOR_NOTE_GATE" };
  if (!gate || gate !== expected) return { ok: false, error: "口令不对" };
  return { ok: true };
}

function sanitizeBlocks(blocks) {
  if (!Array.isArray(blocks)) return [];
  return blocks.slice(0, 40).map((b, i) => {
    if (!b || typeof b !== "object") {
      return { id: `b${i}`, type: "prose", text: "" };
    }
    const id = typeof b.id === "string" && b.id ? b.id : `b${i}-${Date.now()}`;
    if (b.type === "mindmap") {
      return {
        id,
        type: "mindmap",
        center: String(b.center || "中心议题").slice(0, 80),
        layout: b.layout === "map" ? "map" : "logic",
        children: sanitizeTree(b.children),
        positions: b.positions && typeof b.positions === "object" ? b.positions : undefined,
      };
    }
    return {
      id,
      type: "prose",
      text: String(b.text || "").slice(0, 20000),
    };
  });
}

function sanitizeTree(nodes) {
  if (!Array.isArray(nodes)) return [];
  return nodes.slice(0, 40).map((n, i) => ({
    id: typeof n?.id === "string" && n.id ? n.id : `n${i}`,
    text: String(n?.text || "").slice(0, 80),
    children: sanitizeTree(n?.children),
  }));
}

function getDb() {
  const app = cloud.init({ env: cloud.SYMBOL_CURRENT_ENV });
  return app.database();
}

exports.main = async (event) => {
  const http = isHttpEvent(event);
  const method = (event?.httpMethod || event?.requestContext?.http?.method || "GET").toUpperCase();

  if (http && method === "OPTIONS") {
    return httpResponse(204, {});
  }

  const payload = parsePayload(event);

  try {
    if (http && method === "GET") {
      const postId = queryPostId(event) || (typeof payload.postId === "string" ? payload.postId.trim() : "");
      if (!postId) {
        return httpResponse(400, { ok: false, error: "缺少 postId" });
      }
      const db = getDb();
      const res = await db.collection(COLLECTION).where({ postId }).limit(1).get();
      const row = res.data && res.data[0];
      if (!row) {
        return httpResponse(200, { ok: true, postId, blocks: [], updatedAt: null });
      }
      return httpResponse(200, {
        ok: true,
        postId: row.postId,
        blocks: row.blocks || [],
        updatedAt: row.updatedAt || null,
      });
    }

    if (!http && payload.action === "get") {
      const postId = String(payload.postId || "").trim();
      if (!postId) return { ok: false, error: "缺少 postId" };
      const db = getDb();
      const res = await db.collection(COLLECTION).where({ postId }).limit(1).get();
      const row = res.data && res.data[0];
      if (!row) return { ok: true, postId, blocks: [], updatedAt: null };
      return {
        ok: true,
        postId: row.postId,
        blocks: row.blocks || [],
        updatedAt: row.updatedAt || null,
      };
    }

    const action = typeof payload.action === "string" ? payload.action : "save";
    const gate = gateFrom(event, payload);
    const auth = checkGate(gate);
    if (!auth.ok) {
      return http ? httpResponse(401, auth) : auth;
    }

    if (action === "login") {
      const ok = { ok: true, authed: true };
      return http ? httpResponse(200, ok) : ok;
    }

    if (action === "export") {
      const db = getDb();
      const res = await db.collection(COLLECTION).limit(500).get();
      const notes = (res.data || []).map((row) => ({
        postId: row.postId,
        blocks: row.blocks || [],
        updatedAt: row.updatedAt || null,
      }));
      const ok = {
        ok: true,
        exportedAt: new Date().toISOString(),
        notes,
      };
      return http ? httpResponse(200, ok) : ok;
    }

    const postId = String(payload.postId || "").trim();
    if (!postId) {
      const err = { ok: false, error: "缺少 postId" };
      return http ? httpResponse(400, err) : err;
    }
    const blocks = sanitizeBlocks(payload.blocks);
    const updatedAt = new Date().toISOString();
    const db = getDb();
    const existing = await db.collection(COLLECTION).where({ postId }).limit(1).get();

    if (existing.data && existing.data[0] && existing.data[0]._id) {
      await db.collection(COLLECTION).doc(existing.data[0]._id).update({
        blocks,
        updatedAt,
        updatedBy: "archie",
      });
    } else {
      await db.collection(COLLECTION).add({
        postId,
        blocks,
        updatedAt,
        updatedBy: "archie",
      });
    }

    const ok = { ok: true, postId, blocks, updatedAt };
    return http ? httpResponse(200, ok) : ok;
  } catch (e) {
    const err = {
      ok: false,
      error: "旁注服务异常",
      detail: e && e.message ? String(e.message).slice(0, 200) : "unknown",
    };
    return http ? httpResponse(500, err) : err;
  }
};
