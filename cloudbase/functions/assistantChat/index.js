/**
 * P3 尖兵 · assistantChat
 * 浏览器 → 本函数 → DeepSeek（密钥只在云端环境变量 DEEPSEEK_API_KEY）
 *
 * 支持：
 * - CloudBase callFunction（event 即 data）
 * - HTTP 触发（event.body 为 JSON 字符串）
 */

const SYSTEM_PROMPT = `你是个人站「Archie 助手」试点：做通用通聊。
你目前还读不到站内日记、字幕或笔记。若用户问「站里写过什么」，请诚实说明尚未接知识库，仍可做一般讨论。
回答简洁、友好，默认中文。`;

function corsHeaders() {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
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

  // 个别网关会再包一层
  if (payload?.data && typeof payload.data === "object" && !payload.message && !payload.messages) {
    payload = payload.data;
  }

  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const messages = Array.isArray(payload.messages) ? payload.messages : null;
  return { message, messages };
}

function buildChatMessages({ message, messages }) {
  const out = [{ role: "system", content: SYSTEM_PROMPT }];

  if (messages && messages.length) {
    for (const m of messages.slice(-12)) {
      if (!m || (m.role !== "user" && m.role !== "assistant")) continue;
      if (typeof m.content !== "string") continue;
      out.push({ role: m.role, content: m.content.slice(0, 4000) });
    }
    return out.length > 1 ? out : null;
  }

  if (message) {
    out.push({ role: "user", content: message.slice(0, 4000) });
    return out;
  }

  return null;
}

exports.main = async (event) => {
  const http = isHttpEvent(event);
  const method = (event?.httpMethod || event?.requestContext?.http?.method || "").toUpperCase();

  if (http && method === "OPTIONS") {
    return httpResponse(204, {});
  }

  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) {
    const err = { ok: false, error: "助手后厨未配置密钥，请稍后再试。" };
    return http ? httpResponse(500, err) : err;
  }

  const chatMessages = buildChatMessages(parsePayload(event));
  if (!chatMessages) {
    const err = { ok: false, error: "请先说点什么。" };
    return http ? httpResponse(400, err) : err;
  }

  try {
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = {
        ok: false,
        error: "模型暂时没空理会，请稍后再试。",
        detail: (data && data.error && data.error.message) || `HTTP ${res.status}`,
      };
      return http ? httpResponse(502, err) : err;
    }

    const reply =
      (data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content &&
        String(data.choices[0].message.content).trim()) ||
      "（模型没有返回文字）";

    const ok = { ok: true, reply };
    return http ? httpResponse(200, ok) : ok;
  } catch {
    const err = { ok: false, error: "连不上模型，请检查网络或稍后再试。" };
    return http ? httpResponse(502, err) : err;
  }
};
