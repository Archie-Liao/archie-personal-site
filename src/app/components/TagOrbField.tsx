import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ALL_TAGS } from "../data/tags";

const WARM = ["#C4735A", "#D4926A", "#B85C42", "#CC785C"] as const;
const COOL = ["#5E8FA8", "#6A9A96", "#7289A6", "#4F7F8C"] as const;

const SMALL_ORB_MAX = 3.8;
const RESPAWN_MS = 6500;
const SPAWN_MS = 900;
/** 飘动略快一点（原 duration × 系数，越小越快） */
const FLOAT_SPEED = 0.76;

const ORB_TAG_SLOTS: readonly string[] = [
  "人生",
  "AI",
  "认知",
  "商业",
  "方法",
  "职场",
  "社会",
  "观点",
  "记录",
  "自媒体",
  "灵感",
  "原创",
];

type OrbSpec = {
  left: string;
  top: string;
  size: number;
  z: number;
  warm: boolean;
  baseOpacity: number;
  duration: number;
  delay: number;
  drift: [number, number][];
};

const ORB_SPECS: OrbSpec[] = [
  { left: "-5%", top: "0%", size: 11, z: 0, warm: false, baseOpacity: 0.38, duration: 34, delay: 0, drift: [[18, -12], [-10, 22], [14, 8]] },
  { left: "56%", top: "-3%", size: 7.2, z: 1, warm: true, baseOpacity: 0.52, duration: 28, delay: 2, drift: [[-16, 14], [12, -18], [-8, 10]] },
  { left: "80%", top: "12%", size: 2.8, z: 2, warm: false, baseOpacity: 0.62, duration: 24, delay: 1, drift: [[10, 16], [-14, -8], [6, 12]] },
  { left: "10%", top: "20%", size: 6.2, z: 1, warm: true, baseOpacity: 0.48, duration: 31, delay: 4, drift: [[-12, -16], [20, 6], [-6, 18]] },
  { left: "40%", top: "28%", size: 10.2, z: 0, warm: false, baseOpacity: 0.34, duration: 38, delay: 3, drift: [[8, -22], [-18, 10], [12, 14]] },
  { left: "4%", top: "46%", size: 2.6, z: 3, warm: true, baseOpacity: 0.7, duration: 22, delay: 0.5, drift: [[14, 10], [-10, -14], [8, -6]] },
  { left: "66%", top: "42%", size: 8.5, z: 1, warm: true, baseOpacity: 0.44, duration: 33, delay: 5, drift: [[-20, 8], [10, 20], [-12, -10]] },
  { left: "30%", top: "56%", size: 3.2, z: 2, warm: false, baseOpacity: 0.58, duration: 26, delay: 2.5, drift: [[16, -10], [-8, 16], [10, 8]] },
  { left: "84%", top: "58%", size: 5.8, z: 2, warm: false, baseOpacity: 0.5, duration: 29, delay: 1.5, drift: [[-14, 18], [12, -12], [-6, 14]] },
  { left: "16%", top: "70%", size: 7.8, z: 0, warm: true, baseOpacity: 0.4, duration: 36, delay: 6, drift: [[10, 14], [-16, -6], [8, 18]] },
  { left: "50%", top: "66%", size: 2.7, z: 3, warm: true, baseOpacity: 0.65, duration: 23, delay: 3.5, drift: [[-10, 12], [14, -8], [-8, -14]] },
  { left: "62%", top: "80%", size: 3.5, z: 3, warm: false, baseOpacity: 0.55, duration: 27, delay: 4.5, drift: [[12, -16], [-10, 10], [6, 12]] },
];

const ORB_OPACITY_SCALE = 0.38;

function pickColor(spec: OrbSpec, i: number) {
  const pool = spec.warm ? WARM : COOL;
  return pool[i % pool.length];
}

function orbLabel(tag: string, sizeRem: number) {
  if (sizeRem < 4.5) return "";
  return tag.length <= 3 ? tag : tag.slice(0, 2);
}

function isSmallOrb(sizeRem: number) {
  return sizeRem <= SMALL_ORB_MAX;
}

type OrbPhase = "idle" | "popping" | "hidden" | "spawning";

interface TagOrbFieldProps {
  children: ReactNode;
}

export function TagOrbField({ children }: TagOrbFieldProps) {
  const [phases, setPhases] = useState<Record<number, OrbPhase>>({});
  const respawnTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const timers = respawnTimers.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  const scheduleRespawn = useCallback((index: number) => {
    const existing = respawnTimers.current.get(index);
    if (existing) clearTimeout(existing);

    const timer = setTimeout(() => {
      respawnTimers.current.delete(index);
      setPhases((prev) => ({ ...prev, [index]: "spawning" }));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.setTimeout(() => {
          setPhases((prev) => {
            if (prev[index] !== "spawning") return prev;
            return { ...prev, [index]: "idle" };
          });
        }, 80);
      }
    }, RESPAWN_MS);

    respawnTimers.current.set(index, timer);
  }, []);

  const handlePopEnd = useCallback(
    (index: number) => {
      setPhases((prev) => {
        if (prev[index] !== "popping") return prev;
        return { ...prev, [index]: "hidden" };
      });
      scheduleRespawn(index);
    },
    [scheduleRespawn]
  );

  const handleSpawnEnd = useCallback((index: number) => {
    setPhases((prev) => {
      if (prev[index] !== "spawning") return prev;
      return { ...prev, [index]: "idle" };
    });
  }, []);

  const handlePop = useCallback(
    (index: number, wrapEl: HTMLElement | null) => {
      if (wrapEl) {
        const frozen = window.getComputedStyle(wrapEl).transform;
        if (frozen && frozen !== "none") {
          wrapEl.style.transform = frozen;
        }
      }

      setPhases((prev) => {
        if (prev[index] === "popping" || prev[index] === "hidden") return prev;
        return { ...prev, [index]: "popping" };
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.setTimeout(() => handlePopEnd(index), 80);
      }
    },
    [handlePopEnd]
  );

  const handleAnimationEnd = useCallback(
    (index: number, el: HTMLElement) => {
      if (el.classList.contains("tag-orb-field__orb--pop")) handlePopEnd(index);
      if (el.classList.contains("tag-orb-field__orb--spawn")) handleSpawnEnd(index);
    },
    [handlePopEnd, handleSpawnEnd]
  );

  const renderOrb = (i: number, layer: "bg" | "fg") => {
    const spec = ORB_SPECS[i];
    const phase = phases[i] ?? "idle";
    if (phase === "hidden") return null;

    const tag = ORB_TAG_SLOTS[i] ?? ALL_TAGS[i % ALL_TAGS.length];
    const small = isSmallOrb(spec.size);

    if (layer === "bg" && small) return null;
    if (layer === "fg" && !small) return null;

    const label = orbLabel(tag, spec.size);
    const [d1, d2, d3] = spec.drift;
    const fontSize = Math.max(0.625, spec.size * 0.19);
    const orbOpacity = spec.baseOpacity * ORB_OPACITY_SCALE;

    const className = [
      "tag-orb-field__orb",
      small ? "tag-orb-field__orb--small" : "",
      phase === "popping" ? "tag-orb-field__orb--pop" : "",
      phase === "spawning" ? "tag-orb-field__orb--spawn" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const floatDuration = spec.duration * FLOAT_SPEED;
    const driftStyle = {
      "--d1x": `${d1[0]}px`,
      "--d1y": `${d1[1]}px`,
      "--d2x": `${d2[0]}px`,
      "--d2y": `${d2[1]}px`,
      "--d3x": `${d3[0]}px`,
      "--d3y": `${d3[1]}px`,
    } as React.CSSProperties;

    const style = {
      left: spec.left,
      top: spec.top,
      width: `${spec.size}rem`,
      height: `${spec.size}rem`,
      zIndex: spec.z,
      background: pickColor(spec, i),
      fontSize: `${fontSize}rem`,
      animationDuration:
        phase === "popping"
          ? undefined
          : phase === "spawning"
            ? `${SPAWN_MS}ms`
            : `${floatDuration}s`,
      animationDelay: phase === "idle" ? `${spec.delay}s` : undefined,
      "--orb-opacity": phase === "popping" ? 1 : orbOpacity,
      ...driftStyle,
    } as React.CSSProperties;

    if (small) {
      const wrapPaused = phase === "popping" || phase === "spawning";
      const wrapClass = [
        "tag-orb-field__orb-wrap",
        "tag-orb-field__orb-wrap--float",
        wrapPaused ? "tag-orb-field__orb-wrap--paused" : "",
      ]
        .filter(Boolean)
        .join(" ");

      const wrapStyle = {
        left: spec.left,
        top: spec.top,
        width: `${spec.size}rem`,
        height: `${spec.size}rem`,
        zIndex: spec.z,
        animationDuration: `${floatDuration}s`,
        animationDelay: phase === "idle" ? `${spec.delay}s` : undefined,
        ...driftStyle,
      } as React.CSSProperties;

      const btnStyle = {
        background: pickColor(spec, i),
        fontSize: `${fontSize}rem`,
        "--orb-opacity": phase === "popping" ? 1 : orbOpacity,
      } as React.CSSProperties;

      return (
        <span key={`orb-wrap-${layer}-${i}`} className={wrapClass} style={wrapStyle} data-orb-wrap={i}>
          <button
            type="button"
            className={className}
            style={btnStyle}
            aria-label={`${tag} · 点击破裂`}
            onClick={(e) => {
              e.stopPropagation();
              handlePop(i, e.currentTarget.parentElement as HTMLElement | null);
            }}
            onAnimationEnd={(e) => handleAnimationEnd(i, e.currentTarget)}
          >
            {label && <span className="tag-orb-field__label">{label}</span>}
          </button>
        </span>
      );
    }

    return (
      <span key={`orb-${layer}-${i}`} className={className} style={style} aria-hidden="true">
        {label && <span className="tag-orb-field__label">{label}</span>}
      </span>
    );
  };

  return (
    <div className="tag-orb-scene">
      <div className="tag-orb-field tag-orb-field--bg" aria-hidden="true">
        {ORB_SPECS.map((_, i) => renderOrb(i, "bg"))}
      </div>

      {children}

      <div className="tag-orb-field tag-orb-field--fg">
        {ORB_SPECS.map((_, i) => renderOrb(i, "fg"))}
      </div>

      <style>{`
        .tag-orb-scene {
          position: relative;
          min-height: inherit;
        }
        .tag-orb-field {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: visible;
        }
        .tag-orb-field--bg { z-index: 0; }
        .tag-orb-field--fg { z-index: 8; }
        .tag-orb-field__orb-wrap {
          position: absolute;
          display: block;
        }
        .tag-orb-field__orb-wrap--float {
          animation: tagOrbFloat ease-in-out infinite;
          will-change: transform;
        }
        .tag-orb-field__orb-wrap--paused {
          animation-play-state: paused;
        }
        .tag-orb-field__orb {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          aspect-ratio: 1;
          padding: 0;
          margin: 0;
          opacity: var(--orb-opacity, 0.28);
          color: rgba(255, 252, 245, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.26);
          box-shadow: 0 4px 18px rgba(40, 32, 24, 0.08);
          animation: tagOrbFloat ease-in-out infinite;
          will-change: transform, opacity;
        }
        .tag-orb-field__orb-wrap .tag-orb-field__orb {
          position: relative;
          width: 100%;
          height: 100%;
          animation: none;
        }
        .tag-orb-field__orb--small {
          pointer-events: auto;
          cursor: pointer;
        }
        .tag-orb-field__orb--small:hover:not(.tag-orb-field__orb--pop):not(.tag-orb-field__orb--spawn) {
          filter: brightness(1.1);
        }
        .tag-orb-field__orb--small:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 3px;
        }
        .tag-orb-field__orb--pop {
          pointer-events: none;
          animation: orbPop 0.55s ease-out forwards !important;
        }
        .tag-orb-field__orb--spawn {
          pointer-events: none;
          animation: orbSpawn 0.9s ease-out forwards !important;
        }
        .tag-orb-field__label {
          font-family: var(--font-serif);
          font-weight: 700;
          letter-spacing: 0.06em;
          line-height: 1;
          text-align: center;
          padding: 0.15em;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
          pointer-events: none;
        }
        @keyframes tagOrbFloat {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(var(--d1x), var(--d1y)); }
          50% { transform: translate(var(--d2x), var(--d2y)); }
          75% { transform: translate(var(--d3x), var(--d3y)); }
        }
        @keyframes orbPop {
          0% { transform: scale(1); opacity: 1; filter: blur(0); }
          35% { transform: scale(1.12); opacity: 0.88; filter: blur(0); }
          100% { transform: scale(1.45); opacity: 0; filter: blur(5px); }
        }
        @keyframes orbSpawn {
          0% {
            transform: scale(0.12);
            opacity: 0;
            filter: blur(10px);
          }
          55% {
            transform: scale(1.06);
            opacity: var(--orb-opacity);
            filter: blur(0);
          }
          100% {
            transform: scale(1);
            opacity: var(--orb-opacity);
            filter: blur(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .tag-orb-field__orb-wrap--float { animation: none; }
          .tag-orb-field__orb { animation: none; }
          .tag-orb-field__orb--pop { animation: none; opacity: 0; }
          .tag-orb-field__orb--spawn { animation: none; opacity: var(--orb-opacity); }
        }
      `}</style>
    </div>
  );
}
