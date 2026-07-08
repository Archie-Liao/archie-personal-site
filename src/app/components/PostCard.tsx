import { SiteLink } from "./SiteLink";
import type { ContentItem } from "../data/posts";
import { trackClick } from "../utils/analytics";
import { CoverImage } from "./CoverArt";

interface PostCardProps {
  post: ContentItem;
  featured?: boolean;
  compact?: boolean;
}

export function PostCard({ post, featured = false, compact = false }: PostCardProps) {
  const typeLabel = post.type === "video" ? "视频" : post.type === "link" ? "收藏" : "笔记";
  const tags = post.tags ?? [];

  if (compact) {
    return (
      <SiteLink
        to={`/post/${post.id}`}
        onClick={() => trackClick()}
        className="flex items-start gap-4 py-4 border-b group"
        style={{ borderColor: "var(--border)", textDecoration: "none", color: "inherit" }}
      >
        <span className="text-xs w-14 shrink-0 pt-1" style={{ color: "var(--primary)", fontFamily: "var(--font-mono)" }}>
          {post.date.slice(5)}
        </span>
        <div className="flex-1 min-w-0">
          <h3
            className="leading-snug group-hover:underline"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", color: "var(--foreground)" }}
          >
            {post.episode != null && `Day${post.episode}：`}
            {post.title}
          </h3>
          <p className="text-sm mt-1 line-clamp-2" style={{ color: "var(--muted-foreground)" }}>
            {post.aiSummary.overview}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        </div>
      </SiteLink>
    );
  }

  return (
    <SiteLink
      to={`/post/${post.id}`}
      onClick={() => trackClick()}
      className="group flex flex-col rounded-xl overflow-hidden border transition-all hover:-translate-y-0.5"
      style={{
        background: "var(--card)",
        borderColor: featured ? "var(--primary)" : "var(--border)",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div className="relative overflow-hidden" style={{ background: "var(--muted)", height: featured ? 200 : 160 }}>
        <CoverImage post={post} />
        <div className="absolute top-3 left-3 flex gap-2">
          {post.episode != null && (
            <span className="badge">{String(post.episode).padStart(3, "0")}</span>
          )}
          <span className="badge-outline">{typeLabel}</span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5 gap-2">
        <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>
          {post.date}
        </span>
        <h3
          className="leading-snug line-clamp-2"
          style={{ fontFamily: "var(--font-display)", fontSize: featured ? "1.2rem" : "1.05rem" }}
        >
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-2 flex-1" style={{ color: "var(--muted-foreground)" }}>
          {post.aiSummary.overview}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>
      </div>
      <style>{`
        .badge {
          padding: 2px 8px; border-radius: 4px; font-size: 11px;
          background: var(--primary); color: var(--primary-foreground);
          font-family: var(--font-mono);
        }
        .badge-outline {
          padding: 2px 8px; border-radius: 4px; font-size: 11px;
          background: rgba(255,252,248,0.9); border: 1px solid var(--border);
          font-family: var(--font-mono); color: var(--muted-foreground);
        }
        .tag-pill {
          padding: 2px 8px; border-radius: 999px; font-size: 11px;
          border: 1px solid var(--border); color: var(--muted-foreground);
        }
      `}</style>
    </Link>
  );
}
