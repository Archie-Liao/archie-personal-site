import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { ContentItem } from "../data/posts";
import {
  borderAnchor,
  buildMindmapModel,
  clampPct,
  curvedPath,
  initialMindmapPositions,
  nodeCenter,
  type MindmapRelation,
} from "../utils/mindmapStructure";

interface EdgePath {
  id: string;
  d: string;
  relation: MindmapRelation;
}

/** A3-3 · 曲线连框 · 拖节点线跟随 · 关键词节点 */
export function PostMindmap({ post }: { post: ContentItem }) {
  const model = useMemo(() => buildMindmapModel(post), [post]);
  const [positions, setPositions] = useState(() => initialMindmapPositions(model));
  const [edges, setEdges] = useState<EdgePath[]>([]);
  const [layerSize, setLayerSize] = useState({ w: 600, h: 300 });
  const [litId, setLitId] = useState<string | null>("core");

  const layerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>());
  const dragRef = useRef<{ id: string; moved: boolean } | null>(null);

  useEffect(() => {
    setPositions(initialMindmapPositions(model));
    setLitId("core");
  }, [model, post.id]);

  const measureEdges = useCallback(() => {
    const layer = layerRef.current;
    const coreEl = nodeRefs.current.get("core");
    if (!layer || !coreEl) return;

    const lr = layer.getBoundingClientRect();
    setLayerSize({ w: lr.width, h: lr.height });

    const coreCenter = nodeCenter(coreEl, lr);
    const next: EdgePath[] = [];

    for (const branch of model.branches) {
      const el = nodeRefs.current.get(branch.id);
      if (!el) continue;
      const targetCenter = nodeCenter(el, lr);
      const start = borderAnchor(coreEl, lr, targetCenter);
      const end = borderAnchor(el, lr, coreCenter);
      next.push({
        id: branch.id,
        d: curvedPath(start, end, branch.relation === "strong" ? 0.32 : 0.4),
        relation: branch.relation,
      });
    }

    setEdges(next);
  }, [model]);

  useLayoutEffect(() => {
    measureEdges();
    const layer = layerRef.current;
    if (!layer) return;

    const ro = new ResizeObserver(measureEdges);
    ro.observe(layer);
    return () => ro.disconnect();
  }, [measureEdges, positions]);

  const setNodeRef = (id: string) => (el: HTMLButtonElement | null) => {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  };

  const onPointerDown = (id: string) => (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    dragRef.current = { id, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
    setLitId(id);
  };

  const onPointerMove = (id: string) => (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragRef.current?.id !== id) return;
    dragRef.current.moved = true;
    const layer = layerRef.current;
    if (!layer) return;
    const r = layer.getBoundingClientRect();
    const x = clampPct(((e.clientX - r.left) / r.width) * 100, 8, 92);
    const y = clampPct(((e.clientY - r.top) / r.height) * 100, 12, 88);
    setPositions((prev) => ({ ...prev, [id]: { x, y } }));
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

  return (
    <div className="post-mindmap" aria-label="思维导图">
      <div className="post-mindmap__layer" ref={layerRef}>
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
            className={`post-mindmap__node post-mindmap__node--${branch.role}${
              litId === branch.id ? " is-lit" : ""
            }`}
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
      <p className="post-mindmap__hint">点击高亮关联 · 拖动节点 · 实线强相关 · 虚线延伸要点</p>
    </div>
  );
}
