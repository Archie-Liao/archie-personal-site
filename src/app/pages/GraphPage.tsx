import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { siteConfig } from "../site.config";
import { posts, getGraphEdges } from "../data/posts";

interface Node {
  id: string;
  title: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export function GraphPage() {
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const dragRef = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const panRef = useRef<{ sx: number; sy: number; tx: number; ty: number } | null>(null);

  const edges = getGraphEdges(0.1);
  const edgeCount = new Map<string, number>();
  edges.forEach((e) => {
    edgeCount.set(e.source, (edgeCount.get(e.source) ?? 0) + 1);
    edgeCount.set(e.target, (edgeCount.get(e.target) ?? 0) + 1);
  });

  useEffect(() => {
    const w = 800;
    const h = 500;
    setNodes(
      posts.map((p, i) => {
        const angle = (i / posts.length) * Math.PI * 2;
        const count = edgeCount.get(p.id) ?? 0;
        return {
          id: p.id,
          title: p.title,
          x: w / 2 + Math.cos(angle) * 180,
          y: h / 2 + Math.sin(angle) * 160,
          vx: 0,
          vy: 0,
          size: 8 + count * 4,
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
            const repulse = 800 / (dist * dist);
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
          const force = (dist - 120) * 0.01 * e.weight;
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
  }, [nodes.length, edges.length]);

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
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-6">
      <header>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>知识图谱</h1>
        <p className="text-sm mt-2" style={{ color: "var(--muted-foreground)" }}>
          {siteConfig.graphIntro}
        </p>
      </header>

      <div
        className="relative rounded-xl border overflow-hidden"
        style={{ background: "var(--card)", borderColor: "var(--border)", height: 520 }}
      >
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
            if ((e.target as Element).tagName === "circle") return;
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
              return (
                <line
                  key={`${e.source}-${e.target}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="var(--border)"
                  strokeWidth={1 + e.weight * 2}
                  opacity={0.6}
                />
              );
            })}
            {nodes.map((n) => (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.size}
                  fill={hovered === n.id ? "var(--primary)" : "color-mix(in srgb, var(--primary) 70%, white)"}
                  stroke="var(--primary)"
                  strokeWidth={1.5}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => navigate(`/post/${n.id}`)}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    dragRef.current = { id: n.id, ox: 0, oy: 0 };
                  }}
                />
                {hovered === n.id && (
                  <text
                    x={n.x}
                    y={n.y - n.size - 8}
                    textAnchor="middle"
                    fontSize={11}
                    fill="var(--foreground)"
                    style={{ fontFamily: "var(--font-body)", pointerEvents: "none" }}
                  >
                    {n.title.length > 20 ? n.title.slice(0, 20) + "…" : n.title}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>
      </div>
      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
        滚轮缩放 · 拖动画布平移 · 拖动节点 · 点击节点进入详情
      </p>
    </div>
  );
}
