import { useEffect, useState } from "react";

interface SubtitleViewerProps {
  /** public/ 下 TXT 路径，如 /subtitles/ep099.txt */
  path: string;
}

/** 完整字幕：纯文本段落，无时间轴 */
export function SubtitleViewer({ path }: SubtitleViewerProps) {
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setText(null);
    setError(false);

    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.text();
      })
      .then((body) => {
        if (!cancelled) setText(body.trim());
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  if (error) {
    return (
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        字幕稿加载失败
      </p>
    );
  }

  if (text == null) {
    return (
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        加载字幕…
      </p>
    );
  }

  const paragraphs = text.split(/\n\s*\n/).filter(Boolean);

  return (
    <div
      className="rounded-xl border px-6 py-5 flex flex-col gap-4"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      {paragraphs.map((para, i) => (
        <p key={i} className="text-sm leading-relaxed m-0" style={{ color: "var(--foreground)" }}>
          {para.replace(/\n/g, "")}
        </p>
      ))}
    </div>
  );
}
