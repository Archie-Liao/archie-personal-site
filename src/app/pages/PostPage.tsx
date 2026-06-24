import { Link, useParams } from "react-router";
import { getPostById } from "../data/posts";
import { VideoPlayer } from "../components/VideoPlayer";
import { KnowledgeCard } from "../components/KnowledgeCard";
import { SubtitleViewer } from "../components/SubtitleViewer";

export function PostPage() {
  const { id } = useParams<{ id: string }>();
  const post = getPostById(id ?? "");

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p style={{ color: "var(--muted-foreground)" }}>找不到这篇内容</p>
        <Link to="/posts" className="mt-4 inline-block text-sm" style={{ color: "var(--primary)" }}>
          ← 返回列表
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-10">
      <Link to="/posts" className="text-sm" style={{ color: "var(--muted-foreground)", textDecoration: "none" }}>
        ← 返回日记列表
      </Link>

      <header className="flex flex-col gap-4 border-b pb-8" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-wrap items-center gap-3">
          {post.episode != null && (
            <span className="ep-badge">EP.{String(post.episode).padStart(3, "0")}</span>
          )}
          <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>
            {post.date}
          </span>
          <span className="text-xs px-2 py-0.5 rounded border" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
            {post.type === "video" ? "视频日记" : post.type === "link" ? "外链收藏" : "笔记"}
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", lineHeight: 1.3 }}>
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </header>

      {/* AI 总结 */}
      <section className="flex flex-col gap-4">
        <SectionTitle>AI 总结</SectionTitle>
        <div className="p-6 rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-base leading-relaxed" style={{ color: "var(--foreground)" }}>
            {post.aiSummary.overview}
          </p>
        </div>
        {post.aiSummary.keyPoints.length > 0 && (
          <ul className="flex flex-col gap-3">
            {post.aiSummary.keyPoints.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span className="num-badge">{i + 1}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
        <blockquote
          className="px-6 py-4 rounded-xl border-l-[3px] italic"
          style={{ borderLeftColor: "var(--primary)", background: "var(--accent)", border: "1px solid var(--border)", borderLeft: "3px solid var(--primary)" }}
        >
          <p style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}>
            「{post.aiSummary.quote}」
          </p>
        </blockquote>
      </section>

      {/* 知识卡片 */}
      {post.knowledgeCards.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionTitle>知识卡片</SectionTitle>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            点击卡片展开详细解释 · 共 {post.knowledgeCards.length} 张
          </p>
          <div className="grid gap-3">
            {post.knowledgeCards.map((card) => (
              <KnowledgeCard key={card.id} card={card} />
            ))}
          </div>
        </section>
      )}

      {/* 视频 / 外链 */}
      <section className="flex flex-col gap-4">
        <SectionTitle>{post.bvid ? "视频" : "原文"}</SectionTitle>
        {post.bvid ? (
          <>
            <VideoPlayer bvid={post.bvid} title={post.title} />
            <a
              href={`https://www.bilibili.com/video/${post.bvid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm self-end"
              style={{ color: "var(--primary)", textDecoration: "none" }}
            >
              在 B 站观看 →
            </a>
          </>
        ) : post.sourceUrl ? (
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xl border block transition-colors hover:border-primary"
            style={{ background: "var(--card)", borderColor: "var(--border)", textDecoration: "none", color: "inherit" }}
          >
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{post.sourceName ?? "阅读原文"}</span>
            <p className="mt-2 text-sm" style={{ color: "var(--primary)" }}>{post.sourceUrl}</p>
          </a>
        ) : null}
      </section>

      {/* 字幕 */}
      {post.subtitles && post.subtitles.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionTitle>完整字幕</SectionTitle>
          <SubtitleViewer subtitles={post.subtitles} />
        </section>
      )}

      <style>{`
        .ep-badge {
          padding: 2px 8px; border-radius: 4px; font-size: 12px;
          background: var(--primary); color: var(--primary-foreground);
          font-family: var(--font-mono);
        }
        .tag {
          padding: 2px 10px; border-radius: 999px; font-size: 12px;
          border: 1px solid var(--border); color: var(--muted-foreground);
        }
        .num-badge {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; background: var(--primary); color: var(--primary-foreground);
          font-family: var(--font-mono);
        }
      `}</style>
    </article>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="flex items-center gap-3"
      style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--foreground)" }}
    >
      <span className="w-1 h-6 rounded-full" style={{ background: "var(--primary)" }} />
      {children}
    </h2>
  );
}
