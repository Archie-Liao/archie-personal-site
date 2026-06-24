import { useState } from "react";
import type { KnowledgeCard as KnowledgeCardType } from "../data/posts";

interface KnowledgeCardProps {
  card: KnowledgeCardType;
}

export function KnowledgeCard({ card }: KnowledgeCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full text-left p-5 flex items-start justify-between gap-3"
        style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--foreground)" }}>
          {card.front}
        </span>
        <span className="flex items-center gap-2 shrink-0">
          <span
            className="px-2 py-0.5 rounded-full text-xs border"
            style={{ borderColor: "var(--primary)", color: "var(--primary)", fontFamily: "var(--font-mono)" }}
          >
            {card.tag}
          </span>
          <span style={{ color: "var(--muted-foreground)" }}>{expanded ? "−" : "+"}</span>
        </span>
      </button>
      {expanded && (
        <div className="px-5 pb-5 pt-0 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--muted-foreground)" }}>
            {card.back}
          </p>
        </div>
      )}
    </div>
  );
}
