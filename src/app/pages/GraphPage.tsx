import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SiteLink } from "../components/SiteLink";
import { siteConfig } from "../site.config";
import { posts, getGraphEdges, getPostById, type ContentItem } from "../data/posts";
import { getPostListMarker } from "../utils/postPlatform";

interface Node {
  id: string;
  title: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  pillW: number;
  pillH: number;
}

function nodePillLabel(post: ContentItem): string {
  const marker = getPostListMarker(post);
  if (marker.kind === "episode") return marker.value.padStart(2, "0");
  return marker.value.length > 5 ? `${marker.value.slice(0, 4)}…` : marker.value;
}

function pillSize(label: string): { w: number; h: number } {
  const w = Math.max(36, label.length * 7.5 + 16);
  return { w, h: 22 };
}

function topTagName(): string {
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.tags ?? []) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  let best = "—";
  let max = 0;
  counts.forEach((n, tag) => {
    if (n > max) {
      max = n;
      best = tag;
    }
  });
  return max > 0 ? `${best} · ${max}` : "—";
}

export function GraphPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const dragRef = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const panRef = useRef<{ sx: number; sy: number; tx: number; ty: number } | null>(null);

  const edges = useMemo(() => getGraphEdges(0.1), []);
  const postMap = useMemo(() => new Map(posts.map((p) => [p.id, p])), []);
  const activePost = activeId ? getPostById(activeId) : undefined;
  const topTag = topTagName();

  useEffect(() => {
    setNodes(
      posts.map((p, i) => {
        const angle = (i / posts.length) * Math.PI * 2;
        const label = nodePillLabel(p);
        const { w, h } = pillSize(label);
        return {
          id: p.id,
          title: p.title,
          x: 400 + Math.cos(angle) * 180,
          y: 250 + Math.sin(angle) * 160,
          vx: 0,
          vy: 0,
          pillW: w,
          pillH: h,
        };
      })
    );
  }, []);

  useEffect(() => {
    if (nodes.length === 0) return;
    let frame: number;
    const tick = () => {
      setNodes((prev) => {
        const next = prev.map((n) => ({ ...n }));
        const centerX = 400;
        const centerY = 250;
        for (const n of next) {
          n.vx += (centerX - n.x) * 0.002;
          n.vy += (centerY - n.y) * 0.002;
        }
        for (let i = 0; i < next.length; i++) {
          for (let j = i + 1; j < next.length; j++) {
            const dx = next[j].x - next[i].x;
            const dy = next[j].y - next[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const repulse = 900 / (dist * dist);
            next[i].vx -= (dx / dist) * repulse;
            next[i].vy -= (dy / dist) * repulse;
            next[j].vx += (dx / dist) * repulse;
            next[j].vy += (dy / dist) * repulse;
          }
        }
        edges.forEach((e) => {
          const a = next.find((n) => n.id === e.source);
          const b = next.find((n) => n.id === e.target);
          if (!a || !b) return;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (dist - 130) * 0.01 * e.weight;
          a.vx += (dx / dist) * force;
          a.vy += (dy / dist) * force;
          b.vx -= (dx / dist) * force;
          b.vy -= (dy / dist) * force;
        });
        for (const n of next) {
          if (dragRef.current?.id === n.id) continue;
          n.vx *= 0.85;
          n.vy *= 0.85;
          n.x += n.vx;
          n.y += n.vy;
        }
        return next;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [nodes.length, edges]);

  const toSvg = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const rect = svg.getBoundingClientRect();
      return {
        x: (clientX - rect.left - transform.x) / transform.k,
        y: (clientY - rect.top - transform.y) / transform.k,
      };
    },
    [transform]
  );

  return (
    <div className="graph-page">
      <header className="graph-hero">
        <p className="graph-hero__kicker">Knowledge Graph · Field Index</p>
        <h1 className="graph-hero__title">知识图谱</h1>
        <p className="graph-hero__intro">{siteConfig.graphIntro}</p>
      </header>

      <div className="graph-stats" aria-label="图谱统计">
        <div className="graph-stats__cell">
          <span className="graph-stats__lab">Nodes · 篇目</span>
          <span className="graph-stats__val">{posts.length}</span>
          <span className="graph-stats__sub">已归档条目</span>
        </div>
        <div className="graph-stats__cell">
          <span className="graph-stats__lab">Edges · 关联</span>
          <span className="graph-stats__val">{edges.length}</span>
          <span className="graph-stats__sub">标签共现 ≥ 阈值</span>
        </div>
        <div className="graph-stats__cell">
          <span className="graph-stats__lab">Top tag</span>
          <span className="graph-stats__val" style={{ fontSize: "1.25rem" }}>
            {topTag.split(" · ")[0]}
          </span>
          <span className="graph-stats__sub">{topTag}</span>
        </div>
      </div>

      <section className="graph-plot" aria-label="标签共现力导向图">
        <div className="graph-plot__cap">
          <p className="graph-plot__fig">Fig. 2 — 标签共现 · 力导向</p>
          <p className="graph-plot__note">节点 = 期数 / 平台 · 边越粗 = 标签越近</p>
        </div>
        <div className="graph-plot__frame">
          <div className="graph-plot__canvas">
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              viewBox="0 0 800 500"
              style={{ cursor: panRef.current ? "grabbing" : "grab" }}
              onWheel={(e) => {
                e.preventDefault();
                const factor = e.deltaY > 0 ? 0.9 : 1.1;
                setTransform((t) => ({ ...t, k: Math.min(3, Math.max(0.4, t.k * factor)) }));
              }}
              onMouseDown={(e) => {
                if ((e.target as Element).closest(".graph-node-pill")) return;
                panRef.current = { sx: e.clientX, sy: e.clientY, tx: transform.x, ty: transform.y };
              }}
              onMouseMove={(e) => {
                if (dragRef.current) {
                  const { x, y } = toSvg(e.clientX, e.clientY);
                  setNodes((prev) =>
                    prev.map((n) =>
                      n.id === dragRef.current!.id ? { ...n, x, y, vx: 0, vy: 0 } : n
                    )
                  );
                } else if (panRef.current) {
                  setTransform((t) => ({
                    ...t,
                    x: panRef.current!.tx + e.clientX - panRef.current!.sx,
                    y: panRef.current!.ty + e.clientY - panRef.current!.sy,
                  }));
                }
              }}
              onMouseUp={() => {
                dragRef.current = null;
                panRef.current = null;
              }}
              onMouseLeave={() => {
                dragRef.current = null;
                panRef.current = null;
              }}
            >
              <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
                {edges.map((e) => {
                  const a = nodes.find((n) => n.id === e.source);
                  const b = nodes.find((n) => n.id === e.target);
                  if (!a || !b) return null;
                  const strong = e.weight >= 0.35;
                  return (
                    <line
                      key={`${e.source}-${e.target}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      className={strong ? "graph-edge--strong" : "graph-edge--weak"}
                      strokeWidth={1 + e.weight * 2.5}
                      opacity={activeId && activeId !== e.source && activeId !== e.target ? 0.25 : 0.65}
                      strokeDasharray={strong ? undefined : "4 4"}
                    />
                  );
                })}
                {nodes.map((n) => {
                  const post = postMap.get(n.id);
                  const label = post ? nodePillLabel(post) : n.id;
                  const isActive = activeId === n.id;
                  return (
                    <g
                      key={n.id}
                      className={`graph-node-pill${isActive ? " is-active" : ""}`}
                      transform={`translate(${n.x - n.pillW / 2}, ${n.y - n.pillH / 2})`}
                      onMouseEnter={() => setActiveId(n.id)}
                      onMouseLeave={() => setActiveId((id) => (id === n.id ? null : id))}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        dragRef.current = { id: n.id, ox: 0, oy: 0 };
                        setActiveId(n.id);
                      }}
                    >
                      <rect
                        width={n.pillW}
                        height={n.pillH}
                        rx={3}
                        fill={
                          isActive
                            ? "var(--primary)"
                            : "color-mix(in srgb, var(--card) 92%, var(--background))"
                        }
                        stroke={isActive ? "var(--primary-deep)" : "var(--primary)"}
                        strokeWidth={1.2}
                      />
                      <text
                        x={n.pillW / 2}
                        y={n.pillH / 2 + 4}
                        textAnchor="middle"
                        fontSize={10}
                        fontWeight={700}
                        fill={isActive ? "var(--primary-foreground)" : "var(--primary-deep, var(--primary))"}
                        style={{ fontFamily: "var(--font-cond, var(--font-body))", pointerEvents: "none" }}
                      >
                        {label}
                      </text>
                      <title>{n.title}</title>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>
        <p className="graph-plot__hint">
          滚轮缩放 · 拖动画布平移 · 拖动节点 · 悬停 pill 查看下方摘要
        </p>
        <p className="graph-plot__p2">P2：同页切换「按标签 / 按文内链接」（content md 上线后）</p>
      </section>

      {activePost && (
        <aside className="graph-focus" aria-live="polite">
          <p className="graph-focus__kicker">选中篇目</p>
          <p className="graph-focus__title">{activePost.title}</p>
          <p className="graph-focus__meta">
            {(activePost.tags ?? []).slice(0, 4).join(" · ")} · {activePost.date}
          </p>
          <SiteLink to={`/post/${activePost.id}`} className="graph-focus__link">
            阅读全文 →
          </SiteLink>
        </aside>
      )}
    </div>
  );
}
