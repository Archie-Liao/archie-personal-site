import { useMemo, useState } from "react";
import { siteConfig } from "../site.config";
import { posts } from "../data/posts";
import { ALL_TAGS } from "../data/tags";
import { PostCard } from "../components/PostCard";

export function PostsListPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  const filtered = useMemo(() => {
    if (!activeTag) return sorted;
    return sorted.filter((p) => p.tags.includes(activeTag as never));
  }, [sorted, activeTag]);

  const featured = sorted.filter((p) => p.featured);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs" style={{ color: "var(--primary)", fontFamily: "var(--font-mono)" }}>
          点我点我～
        </span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>全部日记</h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)", maxWidth: "50ch" }}>
          {siteConfig.postsListIntro}
        </p>
      </header>

      {/* 标签筛选 */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className="filter-pill"
          data-active={!activeTag}
        >
          全部
        </button>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className="filter-pill"
            data-active={activeTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 精选 */}
      {featured.length > 0 && !activeTag && (
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>精选</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {featured.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* 时间线列表 */}
      <section className="flex flex-col">
        <h2 className="text-sm font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
          {activeTag ? `标签：${activeTag}` : "时间线"} · {filtered.length} 篇
        </h2>
        <div className="rounded-xl border px-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} compact />
          ))}
        </div>
      </section>

      <style>{`
        .filter-pill {
          padding: 6px 14px; border-radius: 999px; font-size: 0.8125rem;
          border: 1px solid var(--border); background: var(--card);
          color: var(--muted-foreground); cursor: pointer; transition: all 0.2s;
        }
        .filter-pill[data-active="true"] {
          background: var(--primary); color: var(--primary-foreground); border-color: var(--primary);
        }
        .filter-pill:hover { border-color: var(--primary); }
      `}</style>
    </div>
  );
}
