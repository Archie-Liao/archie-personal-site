import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import type { ArchieMindmapBlock } from "../types/archieNote";
import {
  ARCHIE_MM_CORE_ID,
  addChildNode,
  addSiblingNode,
  clampPct,
  collectDescendantIds,
  computeArchieMindmapPositions,
  curvedEdgePx,
  findNode,
  removeNode,
  setLayoutMode,
  updateNodeText,
  walkNodes,
  type PctPos,
} from "../utils/archieMindmapLayout";
import {
  borderAnchor,
  nodeCenter,
} from "../utils/mindmapStructure";

type Props = {
  block: ArchieMindmapBlock;
  editable: boolean;
  onChange?: (block: ArchieMindmapBlock) => void;
};

type Edge = { id: string; d: string };
type Px = { x: number; y: number };

/** 框边缘再外推 gap，避免线贴字心 / 贴边 */
function gapOutside(
  el: HTMLElement,
  layerRect: DOMRect,
  toward: Px,
  gapPx = 10,
): Px {
  const c = nodeCenter(el, layerRect);
  const edge = borderAnchor(el, layerRect, toward);
  const dx = toward.x - c.x;
  const dy = toward.y - c.y;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x: edge.x + (dx / len) * gapPx,
    y: edge.y + (dy / len) * gapPx,
  };
}

export function ArchieMindmapCanvas({ block, editable, onChange }: Props) {
  const layout = block.layout === "map" ? "map" : "logic";
  const [positions, setPositions] = useState<Record<string, PctPos>>(() =>
    computeArchieMindmapPositions(block),
  );
  const [selectedId, setSelectedId] = useState<string | null>(ARCHIE_MM_CORE_ID);
  const [layerSize, setLayerSize] = useState({ w: 640, h: 400 });
  const [edges, setEdges] = useState<Edge[]>([]);
  const layerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const positionsRef = useRef(positions);
  positionsRef.current = positions;
  const dragRef = useRef<{
    id: string;
    moved: boolean;
    start: PctPos;
    origin: Record<string, PctPos>;
  } | null>(null);

  useEffect(() => {
    setPositions(computeArchieMindmapPositions(block));
  }, [block.id, block.layout, block.center, block.children, block.positions]);

  const measureEdges = useCallback(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const lr = layer.getBoundingClientRect();
    const w = Math.round(lr.width);
    const h = Math.round(lr.height);
    setLayerSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    if (w < 1 || h < 1) return;

    const next: Edge[] = [];
    walkNodes(block.children || [], (node, parentId) => {
      const fromEl = nodeRefs.current.get(parentId);
      const toEl = nodeRefs.current.get(node.id);
      if (!fromEl || !toEl) return;
      const towardChild = nodeCenter(toEl, lr);
      const towardParent = nodeCenter(fromEl, lr);
      const start = gapOutside(fromEl, lr, towardChild, 10);
      const end = gapOutside(toEl, lr, towardParent, 10);
      next.push({ id: `${parentId}->${node.id}`, d: curvedEdgePx(start, end) });
    });
    setEdges((prev) => {
      if (
        prev.length === next.length &&
        prev.every((e, i) => e.id === next[i].id && e.d === next[i].d)
      ) {
        return prev;
      }
      return next;
    });
  }, [block.children]);

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
  }, [layout, positions, measureEdges, block.center]);

  const emit = (next: ArchieMindmapBlock) => {
    onChange?.(next);
  };

  const commitPositions = (nextPos: Record<string, PctPos>) => {
    setPositions(nextPos);
    if (!editable) return;
    emit({ ...block, positions: nextPos });
  };

  const onPointerDown = (id: string) => (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!editable || e.button !== 0) {
      setSelectedId(id);
      return;
    }
    const layer = layerRef.current;
    if (!layer) return;
    const r = layer.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;

    const node =
      id === ARCHIE_MM_CORE_ID ? null : findNode(block.children || [], id);
    const ids =
      id === ARCHIE_MM_CORE_ID
        ? [id]
        : node
          ? [id, ...collectDescendantIds(node)]
          : [id];

    const origin: Record<string, PctPos> = {};
    for (const nid of ids) {
      origin[nid] = { ...(positions[nid] ?? { x: 50, y: 50 }) };
    }
    dragRef.current = {
      id,
      moved: false,
      start: {
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      },
      origin,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    setSelectedId(id);
  };

  const onPointerMove = (id: string) => (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== id || !editable) return;
    drag.moved = true;
    const layer = layerRef.current;
    if (!layer) return;
    const r = layer.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    const dx = px - drag.start.x;
    const dy = py - drag.start.y;
    const next: Record<string, PctPos> = { ...positions };
    for (const [nid, o] of Object.entries(drag.origin)) {
      next[nid] = { x: clampPct(o.x + dx), y: clampPct(o.y + dy, 6, 94) };
    }
    setPositions(next);
  };

  const onPointerUp = () => {
    const drag = dragRef.current;
    if (drag?.moved && editable) {
      commitPositions(positionsRef.current);
    }
    dragRef.current = null;
    requestAnimationFrame(() => measureEdges());
  };

  const selectedIsCore = selectedId === ARCHIE_MM_CORE_ID;
  const selectedNode =
    selectedId && !selectedIsCore
      ? findNode(block.children || [], selectedId)
      : null;
  const selectedText = selectedIsCore
    ? block.center
    : selectedNode?.text ?? "";

  const setNodeRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  };

  return (
    <div className="archie-mm" data-editable={editable ? "1" : "0"} data-layout={layout}>
      {editable && (
        <div className="archie-mm__toolbar">
          <button
            type="button"
            className="archie-mm__btn"
            disabled={!selectedId}
            onClick={() => selectedId && emit(addChildNode(block, selectedId))}
          >
            加子节点
          </button>
          <button
            type="button"
            className="archie-mm__btn"
            disabled={!selectedId || selectedIsCore}
            onClick={() => selectedId && emit(addSiblingNode(block, selectedId))}
          >
            加同级
          </button>
          <button
            type="button"
            className="archie-mm__btn archie-mm__btn--danger"
            disabled={!selectedId || selectedIsCore}
            onClick={() => selectedId && emit(removeNode(block, selectedId))}
          >
            删除
          </button>
          <button
            type="button"
            className="archie-mm__btn"
            onClick={() =>
              emit(setLayoutMode(block, layout === "logic" ? "map" : "logic"))
            }
          >
            {layout === "logic" ? "切到导图" : "切到逻辑图"}
          </button>
          <span className="archie-mm__tag">
            {layout === "logic" ? "逻辑图" : "思维导图"}
          </span>
        </div>
      )}

      <div className="archie-mm__layer post-mindmap__layer" ref={layerRef} data-layout={layout}>
        <svg
          className="post-mindmap__svg"
          viewBox={`0 0 ${layerSize.w} ${layerSize.h}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          {edges.map((edge) => (
            <path
              key={edge.id}
              d={edge.d}
              className="post-mindmap__edge post-mindmap__edge--strong"
            />
          ))}
        </svg>

        <NodeChip
          id={ARCHIE_MM_CORE_ID}
          text={block.center}
          pos={positions[ARCHIE_MM_CORE_ID] ?? { x: 50, y: 50 }}
          level="core"
          selected={selectedId === ARCHIE_MM_CORE_ID}
          editable={editable}
          nodeRef={setNodeRef(ARCHIE_MM_CORE_ID)}
          onPointerDown={onPointerDown(ARCHIE_MM_CORE_ID)}
          onPointerMove={onPointerMove(ARCHIE_MM_CORE_ID)}
          onPointerUp={onPointerUp}
          onTextChange={(t) => emit(updateNodeText(block, ARCHIE_MM_CORE_ID, t))}
        />

        {(() => {
          const chips: ReactNode[] = [];
          let swatch = 0;
          walkNodes(block.children || [], (node, _parent, depth) => {
            const level = depth === 1 ? "l2" : "l3";
            const s = depth === 1 ? swatch++ % 8 : 0;
            chips.push(
              <NodeChip
                key={node.id}
                id={node.id}
                text={node.text}
                pos={positions[node.id] ?? { x: 50, y: 50 }}
                level={level}
                swatch={s}
                selected={selectedId === node.id}
                editable={editable}
                nodeRef={setNodeRef(node.id)}
                onPointerDown={onPointerDown(node.id)}
                onPointerMove={onPointerMove(node.id)}
                onPointerUp={onPointerUp}
                onTextChange={(t) => emit(updateNodeText(block, node.id, t))}
              />,
            );
          });
          return chips;
        })()}
      </div>

      {editable && selectedId && (
        <label className="archie-mm__edit">
          <span>编辑节点</span>
          <input
            value={selectedText}
            onChange={(e) => emit(updateNodeText(block, selectedId, e.target.value))}
            maxLength={80}
          />
        </label>
      )}
    </div>
  );
}

function NodeChip({
  id,
  text,
  pos,
  level,
  swatch = 0,
  selected,
  editable,
  nodeRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onTextChange,
}: {
  id: string;
  text: string;
  pos: PctPos;
  level: "core" | "l2" | "l3";
  swatch?: number;
  selected: boolean;
  editable: boolean;
  nodeRef: (el: HTMLDivElement | null) => void;
  onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
  onTextChange: (t: string) => void;
}) {
  const cls = [
    "archie-mm__node",
    "post-mindmap__node",
    level === "core" && "post-mindmap__node--core",
    level === "l2" && "post-mindmap__node--l2",
    level === "l3" && "post-mindmap__node--l3",
    selected && "is-selected",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={nodeRef}
      role="button"
      tabIndex={0}
      className={cls}
      data-swatch={level === "l2" ? String(swatch) : undefined}
      data-id={id}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {editable && selected ? (
        <input
          className="archie-mm__node-input"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          maxLength={80}
        />
      ) : (
        <span className="post-mindmap__keyword">{text || "…"}</span>
      )}
    </div>
  );
}
