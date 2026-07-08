import { useState } from "react";

interface FeedbackEntry {
  message: string;
  contact?: string;
  date: string;
}

const KEY = "archie-feedback";

export function FeedbackPage() {
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const entry: FeedbackEntry = {
      message: message.trim(),
      contact: contact.trim() || undefined,
      date: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem(KEY) ?? "[]") as FeedbackEntry[];
      existing.push(entry);
      localStorage.setItem(KEY, JSON.stringify(existing));
    } catch {
      localStorage.setItem(KEY, JSON.stringify([entry]));
    }
    setMessage("");
    setContact("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="page-shell">
      <div className="page-shell__inner flex flex-col gap-8">
        <div className="max-w-xl mx-auto w-full flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <span className="text-xs" style={{ color: "var(--primary)", fontFamily: "var(--font-mono)" }}>
          反馈
        </span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>说说你的想法</h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          发现 bug、想要的功能、看不顺眼的地方——都可以告诉我。第一期暂存本机，后续可接入邮件通知。
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="feedback-msg">
            想说点什么？
          </label>
          <textarea
            id="feedback-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={2000}
            rows={8}
            placeholder="比如：首页字号可以再大一点…"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-y"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              fontFamily: "var(--font-body)",
            }}
          />
          <span className="text-xs self-end" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>
            {message.length} / 2000
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="feedback-contact">
            联系方式（选填）
          </label>
          <input
            id="feedback-contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="邮箱 / 微信 / 手机号"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!message.trim()}
          className="self-start px-6 py-2.5 rounded-xl text-sm disabled:opacity-50"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            cursor: message.trim() ? "pointer" : "not-allowed",
          }}
        >
          {sent ? "已收到，谢谢！" : "发送反馈"}
        </button>
      </form>
        </div>
      </div>
    </div>
  );
}
