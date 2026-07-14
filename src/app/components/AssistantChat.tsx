import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LogoStampFingerprint } from "./LogoStampFingerprint";
import { siteConfig } from "../site.config";
import "../../styles/assistant-chat.css";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

const FAKE_REPLIES = [
  "收到。云函数地址还没配上（site.config.assistant.endpoint 为空），所以仍是演示回复。",
  "好问题。配置好 endpoint 并打开 HTTP 访问后，这里就会变成 DeepSeek 真聊。",
  "先记在这儿。提示：点右下角可随时关掉抽屉。",
];

const WIDTH_KEY = "archie-assistant-drawer-width";
const DEFAULT_WIDTH = 360;
const MIN_WIDTH = 280;

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function clampWidth(w: number) {
  const max = Math.max(MIN_WIDTH, Math.min(720, window.innerWidth - 24));
  return Math.round(Math.min(max, Math.max(MIN_WIDTH, w)));
}

function readSavedWidth() {
  try {
    const raw = localStorage.getItem(WIDTH_KEY);
    if (!raw) return DEFAULT_WIDTH;
    const n = Number(raw);
    return Number.isFinite(n) ? clampWidth(n) : DEFAULT_WIDTH;
  } catch {
    return DEFAULT_WIDTH;
  }
}

type ApiOk = { ok: true; reply: string };
type ApiErr = { ok: false; error?: string };

async function askAssistant(messages: ChatMessage[]): Promise<string> {
  const endpoint = siteConfig.assistant.endpoint?.trim();
  if (!endpoint) {
    const i = Math.floor(Math.random() * FAKE_REPLIES.length);
    return FAKE_REPLIES[i]!;
  }

  const history = messages
    .filter((m) => m.id !== "welcome")
    .map((m) => ({
      role: m.role,
      content: m.text,
    }));

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history }),
  });

  let data: ApiOk | ApiErr | null = null;
  try {
    data = (await res.json()) as ApiOk | ApiErr;
  } catch {
    data = null;
  }

  if (!res.ok || !data || data.ok === false) {
    throw new Error(
      (data && "error" in data && data.error) || `请求失败（HTTP ${res.status}）`,
    );
  }

  return data.reply || "（没有收到文字回复）";
}

/** P3 尖兵：浮钮 + 抽屉 · Logo stamp · 有 endpoint 则走云函数 */
export function AssistantChat() {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const widthRef = useRef(DEFAULT_WIDTH);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [resizing, setResizing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      text: siteConfig.assistant.welcomeMessage,
    },
  ]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setWidth(readSavedWidth());
  }, []);

  useEffect(() => {
    widthRef.current = width;
  }, [width]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, close]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open, busy]);

  useEffect(() => {
    if (!resizing) return;
    const onMove = (e: PointerEvent) => {
      const next = clampWidth(window.innerWidth - e.clientX - 12);
      setWidth(next);
    };
    const onUp = () => {
      setResizing(false);
      try {
        localStorage.setItem(WIDTH_KEY, String(widthRef.current));
      } catch {
        /* ignore */
      }
      document.body.style.removeProperty("cursor");
      document.body.style.removeProperty("user-select");
    };
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.body.style.removeProperty("cursor");
      document.body.style.removeProperty("user-select");
    };
  }, [resizing]);

  const send = useCallback(async () => {
    const text = draft.trim();
    if (!text || busy) return;
    setDraft("");
    const userMsg: ChatMessage = { id: makeId(), role: "user", text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setBusy(true);
    try {
      const reply = await askAssistant(nextMessages);
      setMessages((m) => [...m, { id: makeId(), role: "assistant", text: reply }]);
    } catch (err) {
      const tip = err instanceof Error ? err.message : "请求失败，请稍后再试。";
      setMessages((m) => [
        ...m,
        { id: makeId(), role: "assistant", text: `抱歉：${tip}` },
      ]);
    } finally {
      setBusy(false);
    }
  }, [draft, busy, messages]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  const startResize = (e: React.PointerEvent) => {
    if (window.matchMedia("(max-width: 480px)").matches) return;
    e.preventDefault();
    e.stopPropagation();
    setResizing(true);
  };

  return (
    <div className="assistant-chat" data-open={open} data-resizing={resizing || undefined}>
      <button
        type="button"
        className="assistant-chat__fab"
        aria-expanded={open}
        aria-controls="assistant-drawer"
        onClick={() => setOpen((v) => !v)}
        title={open ? "关闭助手" : "打开助手"}
      >
        <span className="assistant-chat__fab-avatar" aria-hidden>
          <LogoStampFingerprint />
        </span>
        <span className="assistant-chat__fab-label">{open ? "收起" : "助手"}</span>
      </button>

      <div
        id="assistant-drawer"
        ref={panelRef}
        className="assistant-chat__drawer"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        hidden={!open}
        style={{ width }}
      >
        <button
          type="button"
          className="assistant-chat__resize"
          aria-label="拖动调整助手宽度"
          title="拖动调整宽度"
          onPointerDown={startResize}
        />
        <header className="assistant-chat__header">
          <div className="assistant-chat__brand">
            <span className="assistant-chat__avatar" aria-hidden>
              <LogoStampFingerprint />
            </span>
            <div className="assistant-chat__titles">
              <h2 id={titleId} className="assistant-chat__title">
                {siteConfig.assistant.name}
              </h2>
              <p className="assistant-chat__badge">{siteConfig.assistant.disclaimer}</p>
            </div>
          </div>
          <button type="button" className="assistant-chat__close" onClick={close} aria-label="关闭">
            ×
          </button>
        </header>

        <div className="assistant-chat__messages" ref={listRef} role="log" aria-live="polite">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`assistant-chat__bubble assistant-chat__bubble--${msg.role}`}
            >
              {msg.role === "assistant" && (
                <span className="assistant-chat__bubble-avatar" aria-hidden>
                  <LogoStampFingerprint />
                </span>
              )}
              <p className="assistant-chat__bubble-text">{msg.text}</p>
            </div>
          ))}
          {busy && (
            <div className="assistant-chat__bubble assistant-chat__bubble--assistant assistant-chat__bubble--pending">
              <span className="assistant-chat__bubble-avatar" aria-hidden>
                <LogoStampFingerprint />
              </span>
              <p className="assistant-chat__bubble-text">……</p>
            </div>
          )}
        </div>

        <footer className="assistant-chat__composer">
          <textarea
            ref={inputRef}
            className="assistant-chat__input"
            rows={2}
            placeholder="说点什么…（Enter 发送，Shift+Enter 换行）"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={busy}
          />
          <button
            type="button"
            className="assistant-chat__send"
            onClick={() => void send()}
            disabled={busy || !draft.trim()}
          >
            发送
          </button>
        </footer>
      </div>
    </div>
  );
}
