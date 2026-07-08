import type { ContentItem } from "../data/posts";
import { CoverImage } from "./CoverArt";

interface VideoPlayerProps {
  post: Pick<ContentItem, "bvid" | "title" | "coverUrl" | "id" | "episode">;
}

/** A3-4 · 版画式装饰框 + 外链 B 站（无倾斜 · 控比） */
export function VideoPlayer({ post }: VideoPlayerProps) {
  const url = `https://www.bilibili.com/video/${post.bvid}`;
  const label =
    post.episode != null ? `EP.${String(post.episode).padStart(3, "0")}` : "视频";

  return (
    <figure className="video-plate m-0">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="video-plate__link group"
      >
        <div className="video-plate__mat">
          <span className="video-plate__corner video-plate__corner--tl" aria-hidden />
          <span className="video-plate__corner video-plate__corner--tr" aria-hidden />
          <span className="video-plate__corner video-plate__corner--bl" aria-hidden />
          <span className="video-plate__corner video-plate__corner--br" aria-hidden />
          <div className="video-plate__inner">
            <span className="video-plate__folio">{label}</span>
            <div className="video-plate__media">
              <CoverImage post={post} className="!scale-100 group-hover:!scale-100" />
              <div className="video-plate__play" aria-hidden>
                <span className="video-plate__play-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--primary)" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <figcaption className="video-plate__cap">
          <span className="video-plate__cap-label">
            <strong>{label}</strong> — 点击在 B 站观看
          </span>
          <span className="video-plate__cap-cta">BILIBILI →</span>
        </figcaption>
      </a>
    </figure>
  );
}
