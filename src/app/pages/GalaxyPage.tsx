import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Orbit, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { GalaxyStarfield } from "../components/GalaxyStarfield";
import { siteConfig } from "../site.config";
import {
  GALAXY_RINGS,
  GALAXY_VIEW,
  MODEL_EDGES,
  MODEL_NODES,
  computeGalaxyLayout,
  getModelNode,
  nodesByRing,
  type ModelEdge,
  type ModelNode,
} from "../data/mental-models";

const { width: VIEW_W, height: VIEW_H } = GALAXY_VIEW;
const ZOOM_MIN = 0.55;
const ZOOM_MAX = 2.8;
const DEFAULT_K = 1.12;

const LABEL_FONT_SIZE = 16;
const LABEL_GAP = 6;
const DETAIL_W = 296;
const DETAIL_H = 300;

function placeDetailCard(nodePx: number, nodePy: number, canvasW: number, canvasH: number) {
  let left = nodePx + 18;
  let top = nodePy - 16;
  if (left + DETAIL_W > canvasW - 12) left = nodePx - DETAIL_W - 18;
  if (left < 12) left = 12;
  if (top + DETAIL_H > canvasH - 12) top = canvasH - DETAIL_H - 12;
  if (top < 12) top = 12;
  return { left, top };
}

function defaultTransform() {
  return {
    k: DEFAULT_K,
    x: VIEW_W / 2 - (GALAXY_VIEW.centerX * DEFAULT_K),
    y: VIEW_H / 2 - (GALAXY_VIEW.centerY * DEFAULT_K),
  };
}

/** 小圆点意象；标签才是识别重点（对齐 /graph） */
function nodeRadius(node: ModelNode): number {
  if (node.ring === "R1") return 7;
  if (node.ring === "R2") return 5.5;
  return 4.5;
}

/** 标签 + 圆点一体命中区（SVG text 默认难点） */
function nodeHitBox(node: ModelNode, pos: { x: number; y: number }, r: number) {
  const labelBaseline = pos.y + r + LABEL_GAP + LABEL_FONT_SIZE * 0.85;
  const charW = LABEL_FONT_SIZE * 0.95;
  const width = Math.max(64, node.label.length * charW + 20);
  const top = pos.y - r - 8;
  const height = labelBaseline - top + LABEL_FONT_SIZE * 0.55 + 8;
  return {
    x: pos.x - width / 2,
    y: top,
    width,
    height,
    labelBaseline,
  };
}

function nodeFill(node: ModelNode, active: boolean): string {
  if (node.status === "placeholder") {
    return "color-mix(in srgb, var(--muted-foreground) 55%, var(--card))";
  }
  if (active) return "var(--primary)";
  return "color-mix(in srgb, var(--foreground) 72%, var(--primary))";
}

function nodeFillOpacity(node: ModelNode, active: boolean): number {
  if (node.status === "placeholder") return 0.8;
  if (active) return 0.9;
  return 0.85;
}

const DISCIPLINE_LABEL: Record<string, string> = {
  math: "数学与统计",
  psychology: "心理学",
  physics: "物理与工程",
  biology: "生物与生态",
  economics: "微观经济",
  "meta-thinking": "元思维",
};

function edgeBaseOpacity(edge: ModelEdge): number {
  if (edge.relation === "supports") return 0.38;
  if (edge.relation === "cross-check") return 0.3;
  return 0.24;
}

function edgeStrokeWidth(edge: ModelEdge): number {
  if (edge.relation === "supports") return 1.25;
  return 1;
}

function edgeDash(edge: ModelEdge): string | undefined {
  if (edge.relation === "applies-to") return "6 5";
  if (edge.relation === "cross-check") return "3 4";
  return undefined;
}

export function GalaxyPage() {
  const layout = useMemo(() => computeGalaxyLayout(), []);
  const [transform, setTransform] = useState(defaultTransform);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [detailPos, setDetailPos] = useState<{ left: number; top: number } | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<{ sx: number; sy: number; tx: number; ty: number } | null>(null);
  const panMovedRef = useRef(false);
  const suppressClickUntil = useRef(0);

  const selected = selectedId ? getModelNode(selectedId) : undefined;
  const focusIds = useMemo(() => {
    if (!selectedId) return null;
    const set = new Set<string>([selectedId]);
    for (const e of MODEL_EDGES) {
      if (e.from === selectedId) set.add(e.to);
      if (e.to === selectedId) set.add(e.from);
    }
    return set;
  }, [selectedId]);

  const markSuppressClick = useCallback(() => {
    suppressClickUntil.current = Date.now() + 280;
  }, []);

  const shouldSuppressClick = () => Date.now() < suppressClickUntil.current;

  const zoomAtCenter = useCallback((factor: number) => {
    setTransform((t) => {
      const nk = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, t.k * factor));
      const cx = VIEW_W / 2;
      const cy = VIEW_H / 2;
      return {
        k: nk,
        x: cx - ((cx - t.x) / t.k) * nk,
        y: cy - ((cy - t.y) / t.k) * nk,
      };
    });
  }, []);

  const resetView = useCallback(() => setTransform(defaultTransform()), []);

  const nodeToCanvasPx = useCallback(
    (nx: number, ny: number) => {
      const svg = svgRef.current;
      const canvas = canvasRef.current;
      if (!svg || !canvas) return { x: 0, y: 0 };
      const rect = svg.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      const x = ((nx * transform.k + transform.x) / VIEW_W) * rect.width + rect.left - canvasRect.left;
      const y = ((ny * transform.k + transform.y) / VIEW_H) * rect.height + rect.top - canvasRect.top;
      return { x, y };
    },
    [transform]
  );

  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    for (const node of MODEL_NODES) {
      const base = layout.get(node.id);
      if (!base) continue;
      map.set(node.id, { x: base.x, y: base.y });
    }
    return map;
  }, [layout]);

  const updateDetailPos = useCallback(() => {
    if (!selectedId) {
      setDetailPos(null);
      return;
    }
    const pos = positions.get(selectedId);
    const canvas = canvasRef.current;
    const node = getModelNode(selectedId);
    if (!pos || !canvas || !node) return;
    const r = nodeRadius(node);
    const anchorY = pos.y + r + LABEL_GAP + LABEL_FONT_SIZE;
    const { x, y } = nodeToCanvasPx(pos.x, anchorY);
    const { width, height } = canvas.getBoundingClientRect();
    setDetailPos(placeDetailCard(x, y, width, height));
  }, [selectedId, positions, nodeToCanvasPx]);

  useLayoutEffect(() => {
    updateDetailPos();
  }, [updateDetailPos]);

  useEffect(() => {
    const onResize = () => updateDetailPos();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateDetailPos]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const canvas = canvasRef.current;
      if (!canvas?.contains(e.target as Node)) return;
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08;
      zoomAtCenter(factor);
    };
    const el = canvasRef.current;
    el?.addEventListener("wheel", onWheel, { passive: false });
    return () => el?.removeEventListener("wheel", onWheel);
  }, [zoomAtCenter]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) setInfoOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const edgeOpacity = (edge: ModelEdge) => {
    const base = edgeBaseOpacity(edge);
    if (!selectedId || !focusIds) return base;
    const hit = focusIds.has(edge.from) && focusIds.has(edge.to);
    if (hit) return edge.relation === "supports" ? 0.58 : edge.relation === "cross-check" ? 0.42 : 0.32;
    return 0.06;
  };

  const nodeOpacity = (id: string) => {
    if (!selectedId || !focusIds) return 1;
    return focusIds.has(id) ? 1 : 0.22;
  };

  return (
    <div className="galaxy-page">
      <div className="galaxy-page__body">
        <section className="galaxy-canvas-zone" aria-label="思维星系">
          <div className="galaxy-canvas" ref={canvasRef}>
            <GalaxyStarfield />
            <div className="galaxy-canvas__chrome">
              <div className="galaxy-knowledge-wrap" ref={infoRef}>
                <button
                  type="button"
                  className={`galaxy-knowledge-trigger${infoOpen ? " is-open" : ""}`}
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setInfoOpen((o) => !o);
                  }}
                  aria-label="思维星系说明"
                  aria-expanded={infoOpen}
                >
                  <span className="galaxy-knowledge-trigger__ring" aria-hidden />
                  <span className="galaxy-knowledge-trigger__icon" aria-hidden>
                    <Orbit size={15} strokeWidth={2.35} />
                  </span>
                  <span className="galaxy-knowledge-trigger__label">知识</span>
                </button>
                {infoOpen && (
                  <div className="galaxy-info-panel galaxy-info-panel--enter" role="dialog" aria-label="思维星系说明">
                    <header className="galaxy-info-panel__copy">
                      <p className="galaxy-info-panel__kicker">Lattice Galaxy · Mental Models</p>
                      <h2 className="galaxy-info-panel__title">思维星系</h2>
                      <p className="galaxy-info-panel__intro">{siteConfig.galaxyIntro}</p>
                    </header>
                    <div className="galaxy-stats" aria-label="星系统计">
                      {GALAXY_RINGS.map((ring) => (
                        <div key={ring.id} className="galaxy-stats__cell">
                          <span className="galaxy-stats__lab">{ring.id} · {ring.labelEn}</span>
                          <span className="galaxy-stats__val">{nodesByRing(ring.id).length}</span>
                          <span className="galaxy-stats__sub">{ring.label}</span>
                        </div>
                      ))}
                    </div>
                    <footer className="galaxy-info-panel__meta">
                      <span>Fig. 3 — 同心圆层级 · 非力导向</span>
                      <span>P3：站内助手编排</span>
                    </footer>
                  </div>
                )}
              </div>
              <div className="galaxy-canvas__tools">
                <button type="button" className="galaxy-canvas__tool" onClick={() => zoomAtCenter(1.14)} aria-label="放大">
                  <ZoomIn size={15} strokeWidth={2.25} />
                </button>
                <button type="button" className="galaxy-canvas__tool" onClick={() => zoomAtCenter(1 / 1.14)} aria-label="缩小">
                  <ZoomOut size={15} strokeWidth={2.25} />
                </button>
                <button type="button" className="galaxy-canvas__tool" onClick={resetView} aria-label="重置视图">
                  <RotateCcw size={14} strokeWidth={2.25} />
                </button>
              </div>
            </div>

            <svg
              ref={svgRef}
              className="galaxy-canvas__svg"
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio="xMidYMid meet"
              style={{ cursor: isPanning ? "grabbing" : "grab" }}
              onDragStart={(e) => e.preventDefault()}
              onMouseDown={(e) => {
                if ((e.target as Element).closest(".galaxy-node")) return;
                e.preventDefault();
                panMovedRef.current = false;
                panRef.current = { sx: e.clientX, sy: e.clientY, tx: transform.x, ty: transform.y };
                setIsPanning(true);
              }}
              onMouseMove={(e) => {
                if (!panRef.current) return;
                const svg = svgRef.current;
                if (!svg) return;
                const rect = svg.getBoundingClientRect();
                const dx = ((e.clientX - panRef.current.sx) / rect.width) * VIEW_W;
                const dy = ((e.clientY - panRef.current.sy) / rect.height) * VIEW_H;
                if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                  panMovedRef.current = true;
                  markSuppressClick();
                }
                setTransform((t) => ({
                  ...t,
                  x: panRef.current!.tx + dx,
                  y: panRef.current!.ty + dy,
                }));
              }}
              onMouseUp={() => {
                if (panRef.current && !panMovedRef.current) {
                  setSelectedId(null);
                }
                if (panMovedRef.current) markSuppressClick();
                panRef.current = null;
                setIsPanning(false);
              }}
              onMouseLeave={() => {
                if (panMovedRef.current) markSuppressClick();
                panRef.current = null;
                setIsPanning(false);
              }}
            >
              <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
                <g className="galaxy-scene">
                  {GALAXY_RINGS.map((ring) => (
                    <circle
                      key={ring.id}
                      cx={GALAXY_VIEW.centerX}
                      cy={GALAXY_VIEW.centerY}
                      r={ring.layoutRadius}
                      className={`galaxy-ring-guide galaxy-ring-guide--${ring.id}`}
                      fill="none"
                    />
                  ))}
                  <circle
                    cx={GALAXY_VIEW.centerX}
                    cy={GALAXY_VIEW.centerY}
                    r={6}
                    className="galaxy-core-mark"
                    fill="color-mix(in srgb, var(--primary) 18%, var(--background))"
                    stroke="var(--primary)"
                    strokeWidth={1}
                  />
                  {MODEL_EDGES.map((edge) => {
                    const a = positions.get(edge.from);
                    const b = positions.get(edge.to);
                    if (!a || !b) return null;
                    return (
                      <line
                        key={`${edge.from}-${edge.to}`}
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        className={`galaxy-edge galaxy-edge--${edge.relation}`}
                        opacity={edgeOpacity(edge)}
                        strokeWidth={edgeStrokeWidth(edge)}
                        strokeDasharray={edgeDash(edge)}
                        style={{ transition: "opacity 0.25s ease" }}
                      />
                    );
                  })}
                  {MODEL_NODES.map((node) => {
                    const pos = positions.get(node.id);
                    if (!pos) return null;
                    const r = nodeRadius(node);
                    const isSelected = selectedId === node.id;
                    const isHovered = hoveredId === node.id;
                    const isActive = isSelected || isHovered;
                    const hit = nodeHitBox(node, pos, r);
                    return (
                      <g
                        key={node.id}
                        className={`galaxy-node${isSelected ? " galaxy-node--selected" : ""}${isHovered ? " galaxy-node--hovered" : ""}${node.status === "placeholder" ? " galaxy-node--placeholder" : ""}`}
                        style={{ opacity: nodeOpacity(node.id), transition: "opacity 0.25s ease" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (shouldSuppressClick()) return;
                          setSelectedId(node.id);
                        }}
                        onMouseEnter={() => setHoveredId(node.id)}
                        onMouseLeave={() => setHoveredId((id) => (id === node.id ? null : id))}
                        onMouseDown={(e) => e.stopPropagation()}
                        role="button"
                        tabIndex={0}
                        aria-label={node.label}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedId(node.id);
                          }
                        }}
                      >
                        <rect
                          x={hit.x}
                          y={hit.y}
                          width={hit.width}
                          height={hit.height}
                          className="galaxy-node__hit"
                          fill="transparent"
                        />
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={r}
                          className="galaxy-node__shape"
                          fill={nodeFill(node, isActive)}
                          fillOpacity={nodeFillOpacity(node, isActive)}
                          stroke={
                            isActive
                              ? "var(--primary-deep, var(--primary))"
                              : node.status === "placeholder"
                                ? "color-mix(in srgb, var(--muted-foreground) 65%, var(--border))"
                                : "color-mix(in srgb, var(--foreground) 70%, var(--border))"
                          }
                          strokeOpacity={isActive ? 0.95 : 0.88}
                          strokeWidth={isSelected ? 1.5 : 1.25}
                          strokeDasharray={node.status === "placeholder" ? "3 2" : undefined}
                        />
                        <text
                          x={pos.x}
                          y={hit.labelBaseline}
                          textAnchor="middle"
                          className="galaxy-node__label"
                          fontSize={LABEL_FONT_SIZE}
                          fontWeight={500}
                          opacity={node.status === "placeholder" ? 0.55 : 1}
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </g>
            </svg>

            {selected && detailPos && (
              <aside
                className="galaxy-detail galaxy-detail--enter"
                aria-label={`${selected.label} 详情`}
                style={{ left: detailPos.left, top: detailPos.top }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="galaxy-detail__close"
                  onClick={() => setSelectedId(null)}
                  aria-label="关闭详情"
                >
                  ×
                </button>
                <p className="galaxy-detail__ring">
                  {selected.ring} · {GALAXY_RINGS.find((r) => r.id === selected.ring)?.label}
                </p>
                <h2 className="galaxy-detail__title">{selected.label}</h2>
                {selected.discipline && (
                  <p className="galaxy-detail__discipline">{DISCIPLINE_LABEL[selected.discipline] ?? selected.discipline}</p>
                )}
                {selected.status === "placeholder" && (
                  <span className="galaxy-detail__badge">场景占位 · P1.5 补全</span>
                )}
                <p className="galaxy-detail__summary">{selected.summary}</p>
                {selected.usage && (
                  <div className="galaxy-detail__block">
                    <h3>适用</h3>
                    <p>{selected.usage}</p>
                  </div>
                )}
                {selected.limitNote && (
                  <div className="galaxy-detail__block">
                    <h3>边界</h3>
                    <p>{selected.limitNote}</p>
                  </div>
                )}
                <p className="galaxy-detail__ref">{selected.sourceRef}</p>
              </aside>
            )}
          </div>
        </section>

        <nav className="galaxy-index" aria-label="按圈层浏览（窄屏与检索 fallback）">
          {GALAXY_RINGS.map((ring) => (
            <div key={ring.id} className="galaxy-index__group">
              <h3 className="galaxy-index__head">
                {ring.label}
                <span>{ring.labelEn}</span>
              </h3>
              <ul className="galaxy-index__list">
                {nodesByRing(ring.id).map((node) => (
                  <li key={node.id}>
                    <button
                      type="button"
                      className={`galaxy-index__btn${selectedId === node.id ? " is-active" : ""}`}
                      onClick={() => setSelectedId(node.id)}
                    >
                      {node.label}
                      {node.status === "placeholder" && <em>占位</em>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
