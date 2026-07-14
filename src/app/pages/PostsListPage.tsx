import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { siteConfig } from "../site.config";
import { posts, type ContentItem } from "../data/posts";
import { ALL_TAGS } from "../data/tags";
import { PostsListPreview } from "../components/PostsListPreview";
import { PostListMarker } from "../components/PostListMarker";
import { formatPostLatestLine } from "../utils/postPlatform";

const TYPE_LABELS = [
  { key: "all", label: "全部" },
  { key: "video", label: "视频" },
  { key: "note", label: "笔记" },
  { key: "link", label: "外链" },
] as const;

function groupByMonth(items: ContentItem[]) {
  const map = new Map<string, ContentItem[]>();
  for (const p of items) {
    const key = p.date.slice(0, 7);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  }
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}

function heatBorder(views: number | undefined, maxViews: number) {
  const t = maxViews > 0 ? (views ?? 0) / maxViews : 0;
  if (t > 0.66) return "3px solid var(--data-red, var(--primary))";
  if (t > 0.33) return "3px solid var(--punch, var(--primary))";
  return "3px solid color-mix(in srgb, var(--data-slate, var(--border)) 80%, transparent)";
}

export function PostsListPage() {
  const location = useLocation();
  const queryRaw = useMemo(
    () => new URLSearchParams(location.search).get("q") ?? "",
    [location.search]
  );
  const query = queryRaw.trim().toLowerCase();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<(typeof TYPE_LABELS)[number]["key"]>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});
  const [tagsExpanded, setTagsExpanded] = useState(false);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  const maxViews = useMemo(() => Math.max(...posts.map((p) => p.views ?? 0), 1), []);

  const filtered = useMemo(() => {
    let list = sorted;
    if (activeTag) list = list.filter((p) => (p.tags ?? []).includes(activeTag as never));
    if (activeType !== "all") list = list.filter((p) => p.type === activeType);
    if (query) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.aiSummary.overview.toLowerCase().includes(query) ||
          (p.tags ?? []).some((t) => t.toLowerCase().includes(query))
      );
    }
    return list;
  }, [sorted, activeTag, activeType, query]);

  const monthGroups = useMemo(() => groupByMonth(filtered), [filtered]);

  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !filtered.some((p) => p.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  useEffect(() => {
    const keys = monthGroups.map(([k]) => k);
    setOpenMonths((prev) => {
      const next = { ...prev };
      keys.forEach((k) => {
        if (next[k] === undefined) next[k] = true;
      });
      return next;
    });
  }, [monthGroups]);

  const selected = filtered.find((p) => p.id === selectedId) ?? null;
  const latest = sorted[0];

  return (
    <div className="posts-page">
      <div className="posts-d2-shell">
        <aside className="posts-d2__sidebar">
          <div className="posts-d2__sidebar-head">
            <span className="posts-d2__eyebrow">点我点我</span>
            <h1 className="posts-d2__title">You Can Find Everything！</h1>
            <p className="posts-d2__intro">{siteConfig.postsListIntro}</p>
            {latest && (
              <p className="posts-d2__latest">
                <strong>最新</strong> · {formatPostLatestLine(latest)}
              </p>
            )}
            {query && (
              <p className="posts-d2__search-note">
                搜索「{queryRaw}」· {filtered.length} 篇
              </p>
            )}
          </div>

          <div className="posts-d2__filters">
            {TYPE_LABELS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveType(key)}
                className="posts-d2__filter-btn"
                data-active={activeType === key}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="posts-d2__filters posts-d2__filters--tags" data-expanded={tagsExpanded}>
            <div className="posts-d2__tags-bar">
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className="posts-d2__filter-btn"
                data-active={!activeTag}
              >
                全部标签
              </button>
              {activeTag && !tagsExpanded && (
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className="posts-d2__filter-btn"
                  data-active="true"
                >
                  {activeTag}
                </button>
              )}
              <button
                type="button"
                className="posts-d2__tags-toggle"
                aria-expanded={tagsExpanded}
                onClick={() => setTagsExpanded((v) => !v)}
              >
                {tagsExpanded ? "收起标签" : `展开标签（${ALL_TAGS.length}）`}
              </button>
            </div>
            {tagsExpanded && (
              <div className="posts-d2__tags-list" role="group" aria-label="全部标签">
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className="posts-d2__filter-btn"
                    data-active={activeTag === tag}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="posts-d2__months">
            {monthGroups.map(([month, items]) => (
              <div key={month} className="posts-d2__month-group">
                <button
                  type="button"
                  className="posts-d2__month-btn"
                  aria-expanded={openMonths[month] !== false}
                  data-open={openMonths[month] !== false}
                  onClick={() => setOpenMonths((m) => ({ ...m, [month]: !m[month] }))}
                >
                  <span>{month.replace("-", ".")}</span>
                  <span className="posts-d2__month-meta">
                    <span className="posts-d2__month-count">{items.length}</span>
                    <span className="posts-d2__month-chevron" aria-hidden="true" />
                  </span>
                </button>
                <div className="posts-d2__days-panel" data-open={openMonths[month] !== false}>
                  <ul className="posts-d2__days">
                    {items.map((post) => (
                      <li key={post.id}>
                        <button
                          type="button"
                          className="posts-d2__day"
                          data-active={selectedId === post.id}
                          style={{ borderLeft: heatBorder(post.views, maxViews) }}
                          title={post.views != null ? `阅读量 ${post.views}` : undefined}
                          onClick={() => setSelectedId(post.id)}
                        >
                          <PostListMarker post={post} />
                          <span className="posts-d2__day-body">
                            <span className="posts-d2__day-title">{post.title}</span>
                            <span className="posts-d2__day-sub">{post.date.slice(5)} · {(post.tags ?? []).slice(0, 2).join(" · ")}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p className="posts-d2__empty">没有匹配的日记。</p>}
          </div>

          <div className="posts-d2__sidebar-foot" aria-hidden>
            <span>日记索引</span>
            <span>{filtered.length} 篇</span>
          </div>
        </aside>

        <main className="posts-d2__main">
          <PostsListPreview post={selected} />
        </main>
      </div>
    </div>
  );
}
