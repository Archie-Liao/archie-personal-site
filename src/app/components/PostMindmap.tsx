import {
  Component,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import type { ContentItem } from "../data/posts";
import {
  avoidBandPath,
  buildMindmapModel,
  clampPct,
  collectDescendantIds,
  coreGapStart,
  curvedPath,
  initialMindmapPositions,
  nodeCenter,
  sideDockAnchor,
  type MindmapRelation,
} from "../utils/mindmapStructure";

interface EdgePath {
  id: string;
  d: string;
  relation: MindmapRelation;
}

function edgesEqual(a: EdgePath[], b: EdgePath[]) {
  if (a.length !== b.length) return false;
  return a.every(
    (e, i) => e.id === b[i].id && e.d === b[i].d && e.relation === b[i].relation
  );
}

class MindmapErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <p className="post-mindmap__hint" role="alert">
          思维导图暂时无法显示（已拦截错误，不影响下文）
        </p>
      );
    }
    return this.props.children;
  }
}

/** A3-3 · 按结构选逻辑图/导图 · 拖父带子 · 连线随锚点变换 */
function PostMindmapCanvas({ post }: { post: ContentItem }) {
  const model = useMemo(() => buildMindmapModel(post), [post]);
  const [positions, setPositions] = useState(() => initialMindmapPositions(model));
  const [edges, setEdges] = useState<EdgePath[]>([]);
  const [layerSize, setLayerSize] = useState({ w: 640, h: 480 });
  const [litId, setLitId] = useState<string | null>("core");

  const layerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>());
  const measuringRef = useRef(false);
  const dragRef = useRef<{
    id: string;
    moved: boolean;
    startPointer: { x: number; y: number };
    origin: Record<string, { x: number; y: number }>;
  } | null>(null);

  useEffect(() => {
    setPositions(initialMindmapPositions(model));
    setLitId("core");
  }, [model, post.id]);

  const resetLayout = useCallback(() => {
    setPositions(initialMindmapPositions(model));
    setLitId("core");
  }, [model]);

  const measureEdges = useCallback(() => {
    if (measuringRef.current) return;
    const layer = layerRef.current;
    const coreEl = nodeRefs.current.get("core");
    if (!layer || !coreEl) return;

    measuringRef.current = true;
    try {
      const lr = layer.getBoundingClientRect();
      const w = Math.round(lr.width);
      const h = Math.round(lr.height);
      setLayerSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));

      const next: EdgePath[] = [];
      for (const branch of model.branches) {
        const el = nodeRefs.current.get(branch.id);
        if (!el) continue;
        const targetCenter = nodeCenter(el, lr);
        const parentId = branch.parentId;
        const parentEl = nodeRefs.current.get(parentId === "core" ? "core" : parentId);
        if (!parentEl) continue;

        let start: { x: number; y: number };
        let end: { x: number; y: number };
        if (parentId === "core") {
          const coreCenter = nodeCenter(parentEl, lr);
          start = coreGapStart(parentEl, lr, targetCenter, 18);
          end = sideDockAnchor(el, lr, coreCenter);
        } else {
          const parentCenter = nodeCenter(parentEl, lr);
          start = sideDockAnchor(parentEl, lr, targetCenter);
          end = sideDockAnchor(el, lr, parentCenter);
        }
        const useAvoid =
          model.layout === "logic" && parentId === "core" && branch.level === 3;
        next.push({
          id: branch.id,
          d: useAvoid
            ? avoidBandPath(start, end)
            : curvedPath(start, end, branch.relation === "strong" ? 0.28 : 0.36),
          relation: branch.relation,
        });
      }

      setEdges((prev) => (edgesEqual(prev, next) ? prev : next));
    } finally {
      requestAnimationFrame(() => {
        measuringRef.current = false;
      });
    }
  }, [model]);

  useLayoutEffect(() => {
    measureEdges();
    const layer = layerRef.current;
    if (!layer || typeof ResizeObserver === "undefined") return;

    let frame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => measureEdges());
    });
    ro.observe(layer);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [measureEdges, positions]);

  const setNodeRef = (id: string) => (el: HTMLButtonElement | null) => {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  };

  const onPointerDown = (id: string) => (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    const layer = layerRef.current;
    if (!layer) return;
    const r = layer.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    const ids = [id, ...collectDescendantIds(model, id)];
    const origin: Record<string, { x: number; y: number }> = {};
    for (const nid of ids) {
      origin[nid] = { ...(positions[nid] ?? { x: 50, y: 50 }) };
    }
    dragRef.current = {
      id,
      moved: false,
      startPointer: {
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      },
      origin,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    setLitId(id);
  };

  const onPointerMove = (id: string) => (e: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== id) return;
    drag.moved = true;
    const layer = layerRef.current;
    if (!layer) return;
    const r = layer.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    const dx = px - drag.startPointer.x;
    const dy = py - drag.startPointer.y;

    setPositions((prev) => {
      const next = { ...prev };
      for (const [nid, o] of Object.entries(drag.origin)) {
        next[nid] = {
          x: clampPct(o.x + dx, 5, 95),
          y: clampPct(o.y + dy, 6, 94),
        };
      }
      return next;
    });
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const onClick = (id: string) => (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragRef.current?.moved) {
      e.preventDefault();
      return;
    }
    setLitId(id);
  };

  const pos = (id: string) => positions[id] ?? { x: 50, y: 50 };
  const layoutLabel = model.layoutReason;

  return (
    <div className="post-mindmap" data-layout={model.layout} aria-label="思维导图">
      <div className="post-mindmap__toolbar">
        <span className="post-mindmap__layout-tag" title="构图判定见 docs/MINDMAP-RULES.md §4">
          {layoutLabel}
        </span>
        <button type="button" className="post-mindmap__reset" onClick={resetLayout}>
          还原默认布局
        </button>
      </div>
      <div className="post-mindmap__layer" ref={layerRef} data-layout={model.layout}>
        <svg
          className="post-mindmap__svg"
          viewBox={`0 0 ${layerSize.w} ${layerSize.h}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          {edges.map((edge) => {
            const dimOthers = litId && litId !== "core";
            return (
              <path
                key={edge.id}
                d={edge.d}
                className={`post-mindmap__edge post-mindmap__edge--${edge.relation}${
                  litId === edge.id ? " is-lit" : ""
                }${dimOthers && litId !== edge.id ? " is-dim" : ""}`}
              />
            );
          })}
        </svg>

        <button
          type="button"
          ref={setNodeRef("core")}
          className={`post-mindmap__node post-mindmap__node--core${litId === "core" ? " is-lit" : ""}`}
          style={{ left: `${pos("core").x}%`, top: `${pos("core").y}%` }}
          title={model.coreHint}
          onPointerDown={onPointerDown("core")}
          onPointerMove={onPointerMove("core")}
          onPointerUp={onPointerUp}
          onClick={onClick("core")}
        >
          <span className="post-mindmap__kicker">中心议题</span>
          <span className="post-mindmap__keyword">{model.coreTopic}</span>
        </button>

        {model.branches.map((branch) => (
          <button
            key={branch.id}
            type="button"
            ref={setNodeRef(branch.id)}
            className={`post-mindmap__node post-mindmap__node--l${branch.level} post-mindmap__node--${branch.role}${
              litId === branch.id ? " is-lit" : ""
            }`}
            data-swatch={branch.level === 2 ? String(branch.swatch) : undefined}
            style={{ left: `${pos(branch.id).x}%`, top: `${pos(branch.id).y}%` }}
            title={branch.hint}
            onPointerDown={onPointerDown(branch.id)}
            onPointerMove={onPointerMove(branch.id)}
            onPointerUp={onPointerUp}
            onClick={onClick(branch.id)}
          >
            <span className="post-mindmap__kicker">{branch.kicker}</span>
            <span className="post-mindmap__keyword">{branch.keyword}</span>
          </button>
        ))}
      </div>
      <p className="post-mindmap__hint">
        知识卡=卡片词条 · AI要点=总结条目 · 分带布局防线穿框 · 拖父整枝跟随
      </p>
    </div>
  );
}

export function PostMindmap({ post }: { post: ContentItem }) {
  return (
    <MindmapErrorBoundary>
      <PostMindmapCanvas post={post} />
    </MindmapErrorBoundary>
  );
}
