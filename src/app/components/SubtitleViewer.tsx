import { useEffect, useState } from "react";
import { classifySubtitleParagraph } from "../utils/subtitleParaMeta";

interface SubtitleViewerProps {
  /** public/ 下 TXT 路径，如 /subtitles/ep099.txt */
  path: string;
}

/** 完整字幕：D1 平排 + 主题/语义段概括词 + 正文菱形符号 */
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
    <div className="subtitle-excerpt">
      {paragraphs.map((para, i) => {
        const meta = classifySubtitleParagraph(para);
        const body = para.replace(/\n/g, "");

        if (meta.kind === "theme" && meta.label) {
          return (
            <p key={i} className="subtitle-para subtitle-para--theme">
              <span className="subtitle-para__kicker">{meta.label}</span>
              <span className="subtitle-para__text">{body}</span>
            </p>
          );
        }

        return (
          <p key={i} className="subtitle-para">
            <span className="subtitle-para__mark" aria-hidden />
            <span className="subtitle-para__text">{body}</span>
          </p>
        );
      })}
    </div>
  );
}
