/** 首页 Hero 标题区 — 撕纸块 / 毛笔条 + 淡墨纤维（每次刷新） */

export type HeroBackdropTexture = "tear" | "brush" | "wisp";

export type HeroBackdropBlock = {
  id: number;
  kind: "blob" | "rule";
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  skewX: number;
  skewY: number;
  colorVar: string;
  mix: number;
  texture: HeroBackdropTexture;
  opacity?: number;
  blur?: number;
  radius?: string;
  clip?: string;
};

export type HeroBackdropSet = {
  blocks: HeroBackdropBlock[];
  roughSeed: number;
};

const PALETTE = [
  "--primary",
  "--punch",
  "--primary-deep",
  "--ink-green",
  "--gold",
  "--chart-4",
] as const;

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function rnd(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/** 标题字在 backdrop 坐标系里的大致范围 */
const TITLE_ZONE = { left: 18, top: 22, right: 82, bottom: 88 };

function overlapsTitle(left: number, top: number, width: number, height: number): boolean {
  const right = left + width;
  const bottom = top + height;
  return (
    right > TITLE_ZONE.left &&
    left < TITLE_ZONE.right &&
    bottom > TITLE_ZONE.top &&
    top < TITLE_ZONE.bottom
  );
}

/** 撕纸：锯齿外轮廓 */
function clipTornPaper(): string {
  const n = 18 + Math.floor(rnd(0, 10));
  const cx = 50 + rnd(-10, 10);
  const cy = 50 + rnd(-10, 10);
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const jag = 1 + rnd(-0.28, 0.28);
    const rx = rnd(36, 54) * jag;
    const ry = rnd(34, 52) * jag;
    const x = cx + Math.cos(a) * rx;
    const y = cy + Math.sin(a) * ry;
    pts.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
  }
  return `polygon(${pts.join(", ")})`;
}

/** 毛笔：中间肥、两头尖，上下边缘毛糙 */
function clipBrushStroke(axis: "horizontal" | "vertical" | "diagonal"): string {
  const steps = 9 + Math.floor(rnd(0, 5));
  const pts: [number, number][] = [];

  const along = (t: number) => {
    const belly = Math.sin(t * Math.PI);
    const thick = belly * rnd(24, 46) + rnd(4, 12);
    const jitter = rnd(-7, 7);
    return { thick, jitter };
  };

  if (axis === "horizontal") {
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = t * 100;
      const { thick, jitter } = along(t);
      pts.push([x + rnd(-4, 4), 50 - thick + jitter]);
    }
    for (let i = steps; i >= 0; i--) {
      const t = i / steps;
      const x = t * 100;
      const { thick, jitter } = along(t);
      pts.push([x + rnd(-5, 5), 50 + thick + jitter]);
    }
  } else if (axis === "vertical") {
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = t * 100;
      const { thick, jitter } = along(t);
      pts.push([50 - thick + jitter, y + rnd(-4, 4)]);
    }
    for (let i = steps; i >= 0; i--) {
      const t = i / steps;
      const y = t * 100;
      const { thick, jitter } = along(t);
      pts.push([50 + thick + jitter, y + rnd(-5, 5)]);
    }
  } else {
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = 8 + t * 84;
      const y = 92 - t * 84;
      const { thick, jitter } = along(t);
      pts.push([x - thick * 0.55 + jitter, y - thick * 0.45 + rnd(-5, 5)]);
    }
    for (let i = steps; i >= 0; i--) {
      const t = i / steps;
      const x = 8 + t * 84;
      const y = 92 - t * 84;
      const { thick, jitter } = along(t);
      pts.push([x + thick * 0.55 + jitter, y + thick * 0.45 + rnd(-5, 5)]);
    }
  }

  return `polygon(${pts.map(([x, y]) => `${x.toFixed(1)}% ${y.toFixed(1)}%`).join(", ")})`;
}

function buildTornBlob(colorVar: string, mix: number): HeroBackdropBlock {
  return {
    id: 0,
    kind: "blob",
    left: rnd(-38, 22),
    top: rnd(-32, 18),
    width: rnd(88, 175),
    height: rnd(75, 155),
    rotate: rnd(-16, 12),
    skewX: rnd(-5, 5),
    skewY: rnd(-4, 4),
    colorVar,
    mix,
    texture: "tear",
    opacity: rnd(0.45, 0.7),
    clip: clipTornPaper(),
  };
}

function buildBrushBand(colorVar: string, mix: number): HeroBackdropBlock {
  const opacity = rnd(0.45, 0.7);
  const variant = Math.floor(rnd(0, 3));
  if (variant === 0) {
    return {
      id: 0,
      kind: "rule",
      left: rnd(-28, 18),
      top: rnd(-18, 72),
      width: rnd(105, 195),
      height: rnd(22, 42),
      rotate: rnd(-12, 12),
      skewX: rnd(-14, 14),
      skewY: rnd(-6, 6),
      colorVar,
      mix,
      texture: "brush",
      opacity,
      clip: clipBrushStroke("horizontal"),
    };
  }
  if (variant === 1) {
    return {
      id: 0,
      kind: "rule",
      left: rnd(-12, 78),
      top: rnd(-38, 12),
      width: rnd(22, 44),
      height: rnd(115, 210),
      rotate: rnd(-14, 14),
      skewX: rnd(-8, 8),
      skewY: rnd(-12, 12),
      colorVar,
      mix,
      texture: "brush",
      opacity,
      clip: clipBrushStroke("vertical"),
    };
  }
  return {
    id: 0,
    kind: "rule",
    left: rnd(-22, 12),
    top: rnd(-28, 35),
    width: rnd(95, 165),
    height: rnd(58, 98),
    rotate: rnd(-22, 18),
    skewX: rnd(-10, 10),
    skewY: rnd(-10, 10),
    colorVar,
    mix,
    texture: "brush",
    opacity,
    clip: clipBrushStroke("diagonal"),
  };
}

/** 淡墨纤维：叠在主笔触旁，增强毛笔飞白 */
function buildInkFibers(main: HeroBackdropBlock, colorVar: string): HeroBackdropBlock[] {
  const count = Math.random() > 0.25 ? 2 : 1;
  const axis =
    main.clip?.includes("50 -") || main.height < main.width * 0.55
      ? "horizontal"
      : main.height > main.width * 1.4
        ? "vertical"
        : "diagonal";

  return Array.from({ length: count }, (_, i) => ({
    id: 11 + i,
    kind: "rule" as const,
    left: main.left + rnd(-8, 10),
    top: main.top + rnd(-6, 8),
    width: main.width * rnd(0.45, 0.72),
    height: main.height * rnd(0.32, 0.58),
    rotate: main.rotate + rnd(-9, 9),
    skewX: main.skewX + rnd(-6, 6),
    skewY: main.skewY + rnd(-5, 5),
    colorVar,
    mix: Math.round(main.mix * rnd(0.32, 0.52)),
    texture: "wisp" as const,
    opacity: rnd(0.14, 0.32),
    blur: rnd(0.8, 2.2),
    clip: clipBrushStroke(axis),
  }));
}

export function buildHeroTitleBackdrop(): HeroBackdropSet {
  const colorVar = pick(PALETTE);
  /* 存在感减弱：mix / 主块 opacity 下调，避免抢标题 */
  const mix = Math.round(rnd(12, 24));
  const roughSeed = Math.floor(rnd(1, 997));
  const useBrush = Math.random() > 0.4;

  for (let attempt = 0; attempt < 8; attempt++) {
    const main = useBrush ? buildBrushBand(colorVar, mix) : buildTornBlob(colorVar, mix);
    if (overlapsTitle(main.left, main.top, main.width, main.height)) {
      const fibers = useBrush ? buildInkFibers(main, colorVar) : [];
      return { blocks: [main, ...fibers], roughSeed };
    }
  }

  const main = buildTornBlob(colorVar, mix);
  return { blocks: [main], roughSeed };
}
