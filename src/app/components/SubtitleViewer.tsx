import type { Subtitle } from "../data/posts";

interface SubtitleViewerProps {
  subtitles: Subtitle[];
}

export function SubtitleViewer({ subtitles }: SubtitleViewerProps) {
  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden border"
      style={{ borderColor: "var(--border)" }}
    >
      {subtitles.map((subtitle, i) => (
        <div
          key={`${subtitle.time}-${i}`}
          className="flex items-start gap-4 px-5 py-3"
          style={{
            background: i % 2 === 0 ? "var(--card)" : "var(--secondary)",
            borderBottom: i < subtitles.length - 1 ? "1px solid var(--border)" : "none",
          }}
        >
          <span
            className="shrink-0 text-xs pt-0.5 w-16"
            style={{ color: "var(--primary)", fontFamily: "var(--font-mono)" }}
          >
            {subtitle.time}
          </span>
          <span className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
            {subtitle.text}
          </span>
        </div>
      ))}
    </div>
  );
}
