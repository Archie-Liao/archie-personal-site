import type { ContentItem } from "../data/posts";
import { CoverImage } from "./CoverArt";

interface VideoPlayerProps {
  post: Pick<ContentItem, "bvid" | "title" | "coverUrl" | "id" | "episode">;
}

/** 复古博物封面 + 外链 B 站（不内嵌大播放器，降低视觉权重） */
export function VideoPlayer({ post }: VideoPlayerProps) {
  const url = `https://www.bilibili.com/video/${post.bvid}`;
  const label =
    post.episode != null ? `EP.${String(post.episode).padStart(3, "0")}` : "视频";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="video-cover-link group block mx-auto no-underline"
      style={{ color: "inherit", maxWidth: "28rem" }}
    >
      <figure className="m-0">
        <div
          className="video-cover-link__frame"
          style={{
            border: "1px solid var(--border)",
            padding: 12,
            background: "var(--card)",
            boxShadow: "0 12px 32px -24px rgba(25,25,25,0.22)",
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{ border: "1px solid var(--border)", aspectRatio: "4/3" }}
          >
            <CoverImage post={post} className="!transition-transform duration-700 group-hover:scale-[1.03]" />
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{ background: "rgba(25,25,25,0.08)" }}
              aria-hidden
            >
              <span
                className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
                style={{
                  width: 52,
                  height: 52,
                  background: "rgba(246,240,226,0.92)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 16px rgba(25,25,25,0.12)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--primary)" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <figcaption
          className="flex justify-between items-baseline gap-3 mt-3 pt-3"
          style={{
            borderTop: "1px solid var(--border)",
            fontSize: "0.8125rem",
            color: "var(--muted-foreground)",
          }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
            <strong style={{ fontStyle: "normal", color: "var(--foreground)" }}>{label}</strong>
            {" "}— 点击在 B 站观看
          </span>
          <span style={{ letterSpacing: "0.12em", fontSize: "0.75rem", whiteSpace: "nowrap" }}>
            BILIBILI →
          </span>
        </figcaption>
      </figure>
    </a>
  );
}
