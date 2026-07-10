import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Copy,
  Maximize2,
  Minimize2,
  MoreVertical,
  Network,
  Play,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { siteConfig } from "../site.config";
import { posts, getGraphEdges, getPostById, type ContentItem } from "../data/posts";

const VIEW_W = 2400;
const VIEW_H = 520;
const CENTER_X = VIEW_W / 2;
const CENTER_Y = VIEW_H / 2;
const ZOOM_MIN = 0.1;
const ZOOM_MAX = 6;
const DEFAULT_ZOOM_K = 2.2;

function defaultViewForZoom(k: number) {
  return {
    k,
    x: VIEW_W / 2 - CENTER_X * k,
    y: VIEW_H / 2 - CENTER_Y * k,
  };
}

const DEFAULT_VIEW = defaultViewForZoom(DEFAULT_ZOOM_K);
const CARD_W = 256;
const CARD_H = 168;

interface Node {
  id: string;
  title: string;
  keyword: string;
  baseR: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface GraphAppearance {
  showArrows: boolean;
  labelOpacity: number;
  nodeScale: number;
  lineWidth: number;
  labelSize: number;
}

interface GraphPhysics {
  centripetal: number;
  repulsion: number;
  attraction: number;
  linkLength: number;
}

const DEFAULT_APPEARANCE: GraphAppearance = {
  showArrows: false,
  labelOpacity: 44,
  nodeScale: 0.26,
  lineWidth: 0.825,
  labelSize: 10,
};

function nodeScaleFromSlider(v: number): number {
  return 0.12 + (v / 100) * 1.08;
}

function lineWidthFromSlider(v: number): number {
  return 0.08 + (v / 100) * 1.65;
}

function labelSizeFromSlider(v: number): number {
  return 10 + (v / 100) * 11;
}

const DEFAULT_PHYSICS: GraphPhysics = {
  centripetal: 31,
  repulsion: 76,
  attraction: 43,
  linkLength: 43,
};

function nodeKeyword(post: ContentItem): string {
  if (post.knowledgeCards.length > 0) {
    const kw = post.knowledgeCards[0].front.trim();
    if (/[\u4e00-\u9fff]/.test(kw)) return kw.slice(0, 4);
    const word = kw.split(/[\s·/\-]/)[0];
    return word.length > 8 ? `${word.slice(0, 7)}…` : word;
  }
  const tag = post.tags?.[0];
  if (tag) return tag;
  return "文";
}

function nodeBaseRadius(keyword: string): number {
  const extra = /[\u4e00-\u9fff]/.test(keyword)
    ? Math.min(keyword.length * 2.2, 10)
    : Math.min(keyword.length * 1.8, 8);
  return 14 + extra;
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

function focusBlurb(post: ContentItem): string {
  if (post.aiSummary.quote) return post.aiSummary.quote;
  return post.aiSummary.keyPoints[0] ?? "";
}

function buildInitialNodes(): Node[] {
  return posts.map((p, i) => {
    const angle = (i / posts.length) * Math.PI * 2;
    const keyword = nodeKeyword(p);
    return {
      id: p.id,
      title: p.title,
      keyword,
      baseR: nodeBaseRadius(keyword),
      x: CENTER_X + Math.cos(angle) * 340,
      y: CENTER_Y + Math.sin(angle) * 130,
      vx: 0,
      vy: 0,
    };
  });
}

function mapPhysics(p: GraphPhysics) {
  return {
    centripetal: 0.00015 + (p.centripetal / 100) * 0.009,
    repulsionFar: 150 + (p.repulsion / 100) * 1600,
    repulsionNear: 0.02 + (p.repulsion / 100) * 0.14,
    attraction: 0.0015 + (p.attraction / 100) * 0.022,
    linkLength: 60 + (p.linkLength / 100) * 140,
  };
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

function appearanceSliders(a: GraphAppearance) {
  return {
    labelOpacity: a.labelOpacity,
    nodeScale: Math.round(((a.nodeScale - 0.12) / 1.08) * 100),
    lineWidth: Math.round(((a.lineWidth - 0.08) / 1.65) * 100),
    labelSize: a.labelSize,
  };
}

function buildGraphSnapshot(
  transform: { x: number; y: number; k: number },
  appearance: GraphAppearance,
  physics: GraphPhysics
) {
  const sliders = appearanceSliders(appearance);
  return {
    zoom: {
      k: round3(transform.k),
      x: round3(transform.x),
      y: round3(transform.y),
      display: `${round3(transform.k)}×`,
    },
    appearance: {
      showArrows: appearance.showArrows,
      sliders,
      computed: {
        nodeScale: round3(appearance.nodeScale),
        lineWidth: round3(appearance.lineWidth),
        labelSizePx: round3(labelSizeFromSlider(appearance.labelSize)),
      },
    },
    physics: { ...physics },
    hint: "把此 JSON 整段发给 AI，或只改 DEFAULT_VIEW / DEFAULT_APPEARANCE / DEFAULT_PHYSICS",
  };
}

function edgeEndpoints(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  rA: number,
  rB: number
): { x1: number; y1: number; x2: number; y2: number } {
  const dx = bx - ax;
  const dy = by - ay;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  return {
    x1: ax + ux * (rA + 2),
    y1: ay + uy * (rA + 2),
    x2: bx - ux * (rB + 2),
    y2: by - uy * (rB + 2),
  };
}

function placeCard(
  nodePx: number,
  nodePy: number,
  canvasW: number,
  canvasH: number
): { left: number; top: number } {
  let left = nodePx + 18;
  let top = nodePy - 24;
  if (left + CARD_W > canvasW - 12) left = nodePx - CARD_W - 18;
  if (left < 12) left = 12;
  if (top + CARD_H > canvasH - 12) top = canvasH - CARD_H - 12;
  if (top < 12) top = 12;
  return { left, top };
}

function GraphSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="graph-settings__slider">
      <span className="graph-settings__slider-label">{label}</span>
      <input type="range" min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

export function GraphPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef(mapPhysics(DEFAULT_PHYSICS));
  const [nodes, setNodes] = useState<Node[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [appearance, setAppearance] = useState<GraphAppearance>(DEFAULT_APPEARANCE);
  const [physics, setPhysics] = useState<GraphPhysics>(DEFAULT_PHYSICS);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [copyHint, setCopyHint] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [transform, setTransform] = useState({ ...DEFAULT_VIEW });
  const [cardPos, setCardPos] = useState<{ left: number; top: number } | null>(null);
  const dragRef = useRef<{ id: string } | null>(null);
  const panRef = useRef<{ sx: number; sy: number; tx: number; ty: number } | null>(null);
  const panMovedRef = useRef(false);
  const nodeDragMovedRef = useRef(false);
  const nodeDownRef = useRef<{ id: string; sx: number; sy: number } | null>(null);
  const suppressClickUntilRef = useRef(0);
  const markSuppressClick = useCallback(() => {
    suppressClickUntilRef.current = Date.now();
  }, []);
  const shouldSuppressClick = useCallback(
    () => Date.now() - suppressClickUntilRef.current < 420,
    []
  );

  const edges = useMemo(() => getGraphEdges(0.1), []);
  const postMap = useMemo(() => new Map(posts.map((p) => [p.id, p])), []);
  const activePost = selectedId ? getPostById(selectedId) : undefined;
  const topTag = topTagName();

  const focusSet = useMemo(() => {
    if (!selectedId) return null;
    const set = new Set<string>([selectedId]);
    for (const e of edges) {
      if (e.source === selectedId) set.add(e.target);
      if (e.target === selectedId) set.add(e.source);
    }
    return set;
  }, [selectedId, edges]);

  useEffect(() => {
    physicsRef.current = mapPhysics(physics);
  }, [physics]);

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

  const updateCardPos = useCallback(() => {
    if (!selectedId) {
      setCardPos(null);
      return;
    }
    const n = nodes.find((node) => node.id === selectedId);
    const canvas = canvasRef.current;
    if (!n || !canvas) return;
    const r = n.baseR * appearance.nodeScale;
    const { x, y } = nodeToCanvasPx(n.x, n.y + r + 8);
    const { width, height } = canvas.getBoundingClientRect();
    setCardPos(placeCard(x, y, width, height));
  }, [selectedId, nodes, appearance.nodeScale, nodeToCanvasPx]);

  useLayoutEffect(() => {
    updateCardPos();
  }, [updateCardPos]);

  const zoomAtPoint = useCallback((factor: number, px: number, py: number) => {
    setTransform((t) => {
      const newK = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, t.k * factor));
      const ratio = newK / t.k;
      return { k: newK, x: px - ratio * (px - t.x), y: py - ratio * (py - t.y) };
    });
  }, []);

  const zoomAtCanvasCenter = useCallback(
    (factor: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const mx = ((rect.width / 2) / rect.width) * VIEW_W;
      const my = ((rect.height / 2) / rect.height) * VIEW_H;
      zoomAtPoint(factor, mx, my);
    },
    [zoomAtPoint]
  );

  const resetView = useCallback(() => setTransform(defaultViewForZoom(DEFAULT_ZOOM_K)), []);

  const toggleFullscreen = useCallback(async () => {
    const el = canvasRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) await el.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      /* ignore */
    }
  }, []);

  const replayLayout = useCallback(() => {
    setNodes(
      buildInitialNodes().map((n) => ({
        ...n,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
      }))
    );
    resetView();
  }, [resetView]);

  useEffect(() => {
    setNodes(buildInitialNodes());
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(document.fullscreenElement === canvasRef.current);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!settingsOpen && !infoOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (settingsOpen && settingsRef.current?.contains(target)) return;
      if (infoOpen && infoRef.current?.contains(target)) return;
      setSettingsOpen(false);
      setInfoOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [settingsOpen, infoOpen]);

  const copySnapshot = useCallback(async () => {
    const payload = buildGraphSnapshot(transform, appearance, physics);
    const text = JSON.stringify(payload, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      setCopyHint("已复制到剪贴板");
    } catch {
      console.info("[graph] snapshot", payload);
      setCopyHint("已输出到控制台");
    }
    setTimeout(() => setCopyHint(null), 2200);
  }, [transform, appearance, physics]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const endPointer = () => {
      if (panMovedRef.current || nodeDragMovedRef.current) markSuppressClick();
      dragRef.current = null;
      panRef.current = null;
      setIsPanning(false);
      // nodeDownRef 留给节点 onMouseUp 处理选中，避免 pointerup 抢先清空
      if (nodeDragMovedRef.current) nodeDownRef.current = null;
    };

    const onWindowPointerUp = () => endPointer();

    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".graph-node, .graph-node-card__link")) return;
      if (!shouldSuppressClick()) return;
      e.preventDefault();
      e.stopPropagation();
    };

    canvas.addEventListener("click", onClickCapture, true);
    window.addEventListener("mouseup", onWindowPointerUp);

    return () => {
      canvas.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("mouseup", onWindowPointerUp);
    };
  }, [markSuppressClick, shouldSuppressClick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".graph-settings, .graph-info-panel")) return;
      e.preventDefault();
      e.stopPropagation();
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * VIEW_W;
      const my = ((e.clientY - rect.top) / rect.height) * VIEW_H;
      zoomAtPoint(e.deltaY > 0 ? 0.88 : 1.14, mx, my);
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, [zoomAtPoint]);

  const toSvgCoords = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const rect = svg.getBoundingClientRect();
      const vx = ((clientX - rect.left) / rect.width) * VIEW_W;
      const vy = ((clientY - rect.top) / rect.height) * VIEW_H;
      return {
        x: (vx - transform.x) / transform.k,
        y: (vy - transform.y) / transform.k,
      };
    },
    [transform]
  );

  const trySelectNode = useCallback((id: string, clientX: number, clientY: number) => {
    const down = nodeDownRef.current;
    if (!down || down.id !== id) return;
    const dx = clientX - down.sx;
    const dy = clientY - down.sy;
    if (dx * dx + dy * dy > 64 || nodeDragMovedRef.current) return;
    setSelectedId((prev) => (prev === id ? null : id));
    setSettingsOpen(false);
  }, []);

  useEffect(() => {
    if (nodes.length === 0) return;
    let frame: number;
    const tick = () => {
      const cfg = physicsRef.current;
      setNodes((prev) => {
        const next = prev.map((n) => ({ ...n }));
        for (const n of next) {
          n.vx += (CENTER_X - n.x) * cfg.centripetal;
          n.vy += (CENTER_Y - n.y) * cfg.centripetal;
        }
        for (let i = 0; i < next.length; i++) {
          for (let j = i + 1; j < next.length; j++) {
            const dx = next[j].x - next[i].x;
            const dy = next[j].y - next[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const r1 = next[i].baseR * appearance.nodeScale;
            const r2 = next[j].baseR * appearance.nodeScale;
            const minDist = r1 + r2 + 14;
            const nearRepulse = dist < minDist ? (minDist - dist) * cfg.repulsionNear : 0;
            const farRepulse = cfg.repulsionFar / (dist * dist);
            const repulse = nearRepulse + farRepulse;
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
          const force = (dist - cfg.linkLength) * cfg.attraction * e.weight;
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
      if (selectedId) updateCardPos();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [nodes.length, edges, appearance.nodeScale, selectedId, updateCardPos]);

  const nodeR = (n: Node) => n.baseR * appearance.nodeScale;
  const lineStroke = (weight: number) => (0.35 + weight * 1.15) * appearance.lineWidth;
  const labelFontSize = labelSizeFromSlider(appearance.labelSize);
  const cardUiScale = Math.min(1.45, 0.9 + transform.k * 0.12);

  const nodeOpacity = (id: string) => {
    if (!focusSet) return 1;
    return focusSet.has(id) ? 1 : 0.16;
  };

  const edgeOpacity = (source: string, target: string, strong: boolean) => {
    const base = strong ? 0.42 : 0.34;
    if (!focusSet) return base;
    const inFocus = (id: string) => focusSet.has(id);
    if (inFocus(source) && inFocus(target)) return Math.min(base + 0.22, 0.62);
    if (inFocus(source) || inFocus(target)) return base * 0.85;
    return base * 0.22;
  };

  const labelOpacityFor = (id: string) => {
    const base = appearance.labelOpacity / 100;
    if (!focusSet) return base;
    return focusSet.has(id) ? base : base * 0.35;
  };

  return (
    <div className="graph-page graph-page--obsidian">
      <div className="graph-page__body">
        <section className="graph-canvas-zone" aria-label="标签共现力导向图">
          <div className="graph-canvas" ref={canvasRef}>
          <div className="graph-canvas__chrome">
            <div className="graph-knowledge-wrap" ref={infoRef}>
              <button
                type="button"
                className={`graph-knowledge-trigger${infoOpen ? " is-open" : ""}`}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setInfoOpen((o) => !o);
                  setSettingsOpen(false);
                }}
                aria-label="知识图谱说明"
                aria-expanded={infoOpen}
              >
                <span className="graph-knowledge-trigger__ring" aria-hidden />
                <span className="graph-knowledge-trigger__icon" aria-hidden>
                  <Network size={15} strokeWidth={2.35} />
                </span>
                <span className="graph-knowledge-trigger__label">知识</span>
              </button>
              {infoOpen && (
                <div
                  className="graph-info-panel graph-info-panel--enter"
                  role="dialog"
                  aria-label="知识图谱说明"
                  onWheel={(e) => e.stopPropagation()}
                >
                  <div className="graph-info-panel__row">
                    <header className="graph-hero graph-info-panel__copy">
                      <p className="graph-hero__kicker">Knowledge Graph · Field Index</p>
                      <h2 className="graph-hero__title">知识图谱</h2>
                      <p className="graph-hero__intro">{siteConfig.graphIntro}</p>
                    </header>
                    <div className="graph-stats graph-stats--row" aria-label="图谱统计">
                      <div className="graph-stats__cell graph-stats__cell--anim" style={{ animationDelay: "0.05s" }}>
                        <span className="graph-stats__lab">Nodes · 篇目</span>
                        <span className="graph-stats__val">{posts.length}</span>
                        <span className="graph-stats__sub">已归档条目</span>
                      </div>
                      <div className="graph-stats__cell graph-stats__cell--anim" style={{ animationDelay: "0.12s" }}>
                        <span className="graph-stats__lab">Edges · 关联</span>
                        <span className="graph-stats__val">{edges.length}</span>
                        <span className="graph-stats__sub">标签共现 ≥ 阈值</span>
                      </div>
                      <div className="graph-stats__cell graph-stats__cell--anim" style={{ animationDelay: "0.19s" }}>
                        <span className="graph-stats__lab">Top tag</span>
                        <span className="graph-stats__val graph-stats__val--sm">{topTag.split(" · ")[0]}</span>
                        <span className="graph-stats__sub">{topTag}</span>
                      </div>
                    </div>
                  </div>
                  <footer className="graph-info-panel__meta">
                    <span className="graph-info-panel__note">Fig. 2 — 标签共现 · 力导向</span>
                    <span className="graph-info-panel__p2">P2：Tab「按标签 / 按文内链接」</span>
                  </footer>
                </div>
              )}
            </div>
            <div className="graph-canvas__tools graph-canvas__tools--right">
              <button type="button" className="graph-canvas__tool" onClick={() => zoomAtCanvasCenter(1.18)} aria-label="放大">
                <ZoomIn size={15} strokeWidth={2.25} aria-hidden />
              </button>
              <button type="button" className="graph-canvas__tool" onClick={() => zoomAtCanvasCenter(1 / 1.18)} aria-label="缩小">
                <ZoomOut size={15} strokeWidth={2.25} aria-hidden />
              </button>
              <button type="button" className="graph-canvas__tool" onClick={resetView} aria-label="重置视图">
                <RotateCcw size={14} strokeWidth={2.25} aria-hidden />
              </button>
              <button
                type="button"
                className="graph-canvas__tool"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "退出全屏" : "全屏"}
              >
                {isFullscreen ? <Minimize2 size={14} aria-hidden /> : <Maximize2 size={14} aria-hidden />}
              </button>
              <div className="graph-canvas__settings-wrap" ref={settingsRef}>
                <button
                  type="button"
                  className={`graph-canvas__tool${settingsOpen ? " is-active" : ""}`}
                  onClick={() => {
                    setSettingsOpen((o) => !o);
                    setInfoOpen(false);
                  }}
                  aria-label="图谱设置"
                  aria-expanded={settingsOpen}
                >
                  <MoreVertical size={16} strokeWidth={2.25} aria-hidden />
                </button>
                {settingsOpen && (
                  <div
                    className="graph-settings"
                    role="dialog"
                    aria-label="关系图谱设置"
                    onWheel={(e) => e.stopPropagation()}
                  >
                    <p className="graph-settings__title">关系图谱</p>
                    <p className="graph-settings__zoom" aria-live="polite">
                      当前缩放 <strong>{round3(transform.k)}×</strong>
                    </p>
                    <details className="graph-settings__section" open>
                      <summary>外观</summary>
                      <div className="graph-settings__body">
                        <label className="graph-settings__toggle">
                          <span>箭头</span>
                          <input
                            type="checkbox"
                            checked={appearance.showArrows}
                            onChange={(e) => setAppearance((a) => ({ ...a, showArrows: e.target.checked }))}
                          />
                          <span className="graph-settings__switch" aria-hidden />
                        </label>
                        <GraphSlider
                          label="文本透明度"
                          value={appearance.labelOpacity}
                          onChange={(v) => setAppearance((a) => ({ ...a, labelOpacity: v }))}
                        />
                        <GraphSlider
                          label="节点大小"
                          value={Math.round(((appearance.nodeScale - 0.12) / 1.08) * 100)}
                          onChange={(v) => setAppearance((a) => ({ ...a, nodeScale: nodeScaleFromSlider(v) }))}
                        />
                        <GraphSlider
                          label="连线粗细"
                          value={Math.round(((appearance.lineWidth - 0.08) / 1.65) * 100)}
                          onChange={(v) => setAppearance((a) => ({ ...a, lineWidth: lineWidthFromSlider(v) }))}
                        />
                        <GraphSlider
                          label="文字大小"
                          value={appearance.labelSize}
                          onChange={(v) => setAppearance((a) => ({ ...a, labelSize: v }))}
                        />
                      </div>
                    </details>
                    <details className="graph-settings__section" open>
                      <summary>力度</summary>
                      <div className="graph-settings__body">
                        <GraphSlider
                          label="图谱向心力"
                          value={physics.centripetal}
                          onChange={(v) => setPhysics((p) => ({ ...p, centripetal: v }))}
                        />
                        <GraphSlider
                          label="节点间排斥力"
                          value={physics.repulsion}
                          onChange={(v) => setPhysics((p) => ({ ...p, repulsion: v }))}
                        />
                        <GraphSlider
                          label="相连节点吸引力"
                          value={physics.attraction}
                          onChange={(v) => setPhysics((p) => ({ ...p, attraction: v }))}
                        />
                        <GraphSlider
                          label="连线长度"
                          value={physics.linkLength}
                          onChange={(v) => setPhysics((p) => ({ ...p, linkLength: v }))}
                        />
                      </div>
                    </details>
                    <button type="button" className="graph-settings__play" onClick={replayLayout}>
                      <Play size={14} strokeWidth={2.5} aria-hidden />
                      播放动画
                    </button>
                    <button type="button" className="graph-settings__copy" onClick={copySnapshot}>
                      <Copy size={13} strokeWidth={2.25} aria-hidden />
                      复制调参数据
                    </button>
                    {copyHint && <p className="graph-settings__copy-hint">{copyHint}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>

          <svg
            ref={svgRef}
            className="graph-canvas__svg"
            width="100%"
            height="100%"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ cursor: isPanning ? "grabbing" : "grab" }}
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={(e) => {
              if ((e.target as Element).closest(".graph-node")) return;
              e.preventDefault();
              panMovedRef.current = false;
              panRef.current = { sx: e.clientX, sy: e.clientY, tx: transform.x, ty: transform.y };
              setIsPanning(true);
            }}
            onMouseMove={(e) => {
              if (dragRef.current) {
                const { x, y } = toSvgCoords(e.clientX, e.clientY);
                nodeDragMovedRef.current = true;
                markSuppressClick();
                setNodes((prev) =>
                  prev.map((n) => (n.id === dragRef.current!.id ? { ...n, x, y, vx: 0, vy: 0 } : n))
                );
              } else if (panRef.current) {
                const svg = svgRef.current;
                if (!svg) return;
                const rect = svg.getBoundingClientRect();
                const scale = VIEW_W / rect.width;
                const dx = (e.clientX - panRef.current.sx) * scale;
                const dy = (e.clientY - panRef.current.sy) * (VIEW_H / rect.height);
                if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                  panMovedRef.current = true;
                  markSuppressClick();
                }
                setTransform((t) => ({
                  ...t,
                  x: panRef.current!.tx + dx,
                  y: panRef.current!.ty + dy,
                }));
              }
            }}
            onMouseUp={() => {
              if (panRef.current && !panMovedRef.current && !dragRef.current) {
                setSelectedId(null);
              }
              if (panMovedRef.current || nodeDragMovedRef.current) markSuppressClick();
              dragRef.current = null;
              panRef.current = null;
              setIsPanning(false);
            }}
            onMouseLeave={() => {
              if (panMovedRef.current || nodeDragMovedRef.current) markSuppressClick();
              dragRef.current = null;
              panRef.current = null;
              setIsPanning(false);
            }}
          >
            <defs>
              {appearance.showArrows && (
                <>
                  <marker
                    id="graph-arrow-end"
                    viewBox="0 0 14 8"
                    refX="12"
                    refY="4"
                    markerWidth="9"
                    markerHeight="6"
                    markerUnits="userSpaceOnUse"
                    orient="auto"
                  >
                    <path
                      d="M0 0.5 L9 4 L0 7.5 L2.2 4 Z"
                      fill="#CC785C"
                      opacity="0.82"
                    />
                  </marker>
                  <marker
                    id="graph-arrow-start"
                    viewBox="0 0 14 8"
                    refX="2"
                    refY="4"
                    markerWidth="9"
                    markerHeight="6"
                    markerUnits="userSpaceOnUse"
                    orient="auto"
                  >
                    <path
                      d="M14 0.5 L5 4 L14 7.5 L11.8 4 Z"
                      fill="#CC785C"
                      opacity="0.82"
                    />
                  </marker>
                </>
              )}
            </defs>
            <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
              {edges.map((e) => {
                const a = nodes.find((n) => n.id === e.source);
                const b = nodes.find((n) => n.id === e.target);
                if (!a || !b) return null;
                const strong = e.weight >= 0.35;
                const rA = nodeR(a);
                const rB = nodeR(b);
                const { x1, y1, x2, y2 } = edgeEndpoints(a.x, a.y, b.x, b.y, rA, rB);
                const arrowEnd = appearance.showArrows ? "url(#graph-arrow-end)" : undefined;
                const arrowStart = appearance.showArrows ? "url(#graph-arrow-start)" : undefined;
                return (
                  <line
                    key={`${e.source}-${e.target}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className={strong ? "graph-edge--strong" : "graph-edge--weak"}
                    strokeWidth={lineStroke(e.weight)}
                    opacity={edgeOpacity(e.source, e.target, strong)}
                    strokeDasharray={strong ? undefined : "8 4"}
                    markerStart={arrowStart}
                    markerEnd={arrowEnd}
                    style={{ transition: "opacity 0.25s ease" }}
                  />
                );
              })}
              {nodes.map((n) => {
                const r = nodeR(n);
                const isSelected = selectedId === n.id;
                const isHovered = hoveredId === n.id;
                const isActive = isSelected || isHovered;
                const dim = nodeOpacity(n.id);
                return (
                  <g
                    key={n.id}
                    className={`graph-node${isSelected ? " is-selected" : ""}${isHovered ? " is-hovered" : ""}${isActive ? " is-active" : ""}`}
                    opacity={dim}
                    style={{ transition: "opacity 0.25s ease" }}
                    onMouseEnter={() => setHoveredId(n.id)}
                    onMouseLeave={() => setHoveredId((id) => (id === n.id ? null : id))}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      nodeDragMovedRef.current = false;
                      nodeDownRef.current = { id: n.id, sx: e.clientX, sy: e.clientY };
                      dragRef.current = { id: n.id };
                    }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      trySelectNode(n.id, e.clientX, e.clientY);
                      dragRef.current = null;
                      nodeDownRef.current = null;
                      nodeDragMovedRef.current = false;
                    }}
                  >
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={r}
                      className="graph-node__shape"
                      fill={
                        isActive
                          ? "var(--primary)"
                          : "color-mix(in srgb, var(--foreground) 78%, var(--card))"
                      }
                      stroke={isActive ? "var(--primary-deep)" : "color-mix(in srgb, var(--foreground) 45%, var(--border))"}
                      strokeWidth={isSelected ? 2 : 1}
                    />
                    <text
                      x={n.x}
                      y={n.y + r + labelFontSize * 0.55 + 4}
                      textAnchor="middle"
                      fontSize={labelFontSize}
                      fontWeight={600}
                      fill="var(--foreground)"
                      opacity={labelOpacityFor(n.id)}
                      style={{ fontFamily: "var(--font-cond, var(--font-body))", pointerEvents: "none" }}
                    >
                      {n.keyword}
                    </text>
                    <title>{postMap.get(n.id)?.title ?? n.title}</title>
                  </g>
                );
              })}
            </g>
          </svg>

          {activePost && cardPos && (
            <div
              className="graph-node-card graph-node-card--enter"
              style={{
                left: cardPos.left,
                top: cardPos.top,
                transform: `scale(${cardUiScale})`,
                transformOrigin: "top left",
              }}
              role="dialog"
              aria-label="篇目摘要"
            >
              <button
                type="button"
                className="graph-node-card__close"
                onClick={() => setSelectedId(null)}
                aria-label="关闭"
              >
                ×
              </button>
              <p className="graph-node-card__date">{activePost.date}</p>
              <h2 className="graph-node-card__title">{activePost.title}</h2>
              {activePost.tags?.[0] && <span className="graph-node-card__tag">{activePost.tags[0]}</span>}
              {focusBlurb(activePost) && <p className="graph-node-card__hook">「{focusBlurb(activePost)}」</p>}
              <a
                href={`/post/${activePost.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="graph-node-card__link"
                onClick={(e) => {
                  if (shouldSuppressClick()) e.preventDefault();
                }}
              >
                阅读全文 ↗
              </a>
            </div>
          )}
        </div>
        </section>
      </div>
    </div>
  );
}
