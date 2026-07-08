import { posts } from "../data/posts";
import { siteConfig } from "../site.config";

export interface DensityBucket {
  key: string;
  label: string;
  count: number;
}

export type PublishDensitySource = "mock" | "posts";

/** P1 示意曲线；部署接 content/ 后在 site.config 改为 "posts" */
export function getPublishDensitySource(): PublishDensitySource {
  return siteConfig.publishDensitySource ?? "mock";
}

/** 按月聚合日记发布篇数（非网站点击 analytics） */
export function getMonthlyPublishDensityFromPosts(): DensityBucket[] {
  const map = new Map<string, number>();
  for (const p of posts) {
    const key = p.date.slice(0, 7);
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  const keys = [...map.keys()].sort();
  if (keys.length === 0) return [];

  const [startY, startM] = keys[0].split("-").map(Number);
  const [endY, endM] = keys[keys.length - 1].split("-").map(Number);

  const buckets: DensityBucket[] = [];
  let y = startY;
  let m = startM;
  while (y < endY || (y === endY && m <= endM)) {
    const key = `${y}-${String(m).padStart(2, "0")}`;
    buckets.push({
      key,
      label: `${y}.${String(m).padStart(2, "0")}`,
      count: map.get(key) ?? 0,
    });
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return buckets;
}

/** 从 Day1 起 12 个月 ·  seeded 示意密度（刷新稳定，非真实 analytics） */
export function getMockMonthlyPublishDensity(monthCount = 12): DensityBucket[] {
  const [startY, startM, startD] = siteConfig.dayOneDate.split("-").map(Number);
  let seed = startY * 10000 + startM * 100 + startD;
  const buckets: DensityBucket[] = [];
  let y = startY;
  let m = startM;

  for (let i = 0; i < monthCount; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    const wave = Math.sin(i * 0.85) * 2;
    const count = Math.max(1, Math.min(9, Math.round(3 + (seed % 5) + wave)));

    const key = `${y}-${String(m).padStart(2, "0")}`;
    buckets.push({
      key,
      label: `${y}.${String(m).padStart(2, "0")}`,
      count,
    });

    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return buckets;
}

export function getPublishDensityForChart(): {
  buckets: DensityBucket[];
  isMock: boolean;
  totalIssues: number;
} {
  const source = getPublishDensitySource();
  if (source === "posts") {
    const buckets = getMonthlyPublishDensityFromPosts();
    return { buckets, isMock: false, totalIssues: posts.length };
  }
  const buckets = getMockMonthlyPublishDensity();
  const total = buckets.reduce((s, b) => s + b.count, 0);
  return { buckets, isMock: true, totalIssues: total };
}

export function getEpisodeRange(): { min: number; max: number } | null {
  const eps = posts.map((p) => p.episode).filter((n): n is number => n != null);
  if (eps.length === 0) return null;
  return { min: Math.min(...eps), max: Math.max(...eps) };
}

export interface ChartPoint {
  x: number;
  y: number;
}

export interface ChartMarker {
  x: number;
  y: number;
  /** 0–100，供 HTML 轴标签对齐 */
  xPercent: number;
  count: number;
  monthLabel: string;
  /** 跨年时在月份下方补年份 */
  yearLabel: string | null;
  isPeak: boolean;
}

const CHART_W = 800;
const PAD_LEFT = 44;
const PAD_RIGHT = 44;
const PAD_TOP = 18;
/** 折线区底边（轴线上方） */
const BASELINE_Y = 88;
/** 含横轴月份的总高度 */
const CHART_H = 128;

function axisLabelsForKey(key: string, prevYear: number | null): Pick<ChartMarker, "monthLabel" | "yearLabel"> {
  const [y, m] = key.split("-").map(Number);
  return {
    monthLabel: `${m}月`,
    yearLabel: prevYear === null || prevYear !== y ? String(y) : null,
  };
}

export function buildDensityChart(
  buckets: DensityBucket[],
  totalIssues?: number
): {
  width: number;
  height: number;
  areaPath: string;
  linePath: string;
  baselinePath: string;
  baselineY: number;
  plotLeft: number;
  plotRight: number;
  maxCount: number;
  markers: ChartMarker[];
  startLabel: string;
  endLabel: string;
  totalIssues: number;
  peakLabel: string;
} {
  const baselineY = BASELINE_Y;
  const plotLeft = PAD_LEFT;
  const plotRight = CHART_W - PAD_RIGHT;
  const plotWidth = plotRight - plotLeft;

  if (buckets.length === 0) {
    return {
      width: CHART_W,
      height: CHART_H,
      areaPath: "",
      linePath: "",
      baselinePath: `M${plotLeft},${baselineY} L${plotRight},${baselineY}`,
      baselineY,
      plotLeft,
      plotRight,
      maxCount: 0,
      markers: [],
      startLabel: "—",
      endLabel: "—",
      totalIssues: 0,
      peakLabel: "0",
    };
  }

  const max = Math.max(...buckets.map((b) => b.count), 1);
  const plotH = baselineY - PAD_TOP;
  const step = buckets.length <= 1 ? 0 : plotWidth / (buckets.length - 1);
  const peak = buckets.reduce((a, b) => (b.count > a.count ? b : a), buckets[0]);

  let prevYear: number | null = null;
  const markers: ChartMarker[] = buckets.map((b, i) => {
    const [y] = b.key.split("-").map(Number);
    const labels = axisLabelsForKey(b.key, prevYear);
    prevYear = y;
    const x = buckets.length <= 1 ? plotLeft + plotWidth / 2 : plotLeft + i * step;
    const yPos = PAD_TOP + plotH * (1 - b.count / max);
    const xPercent = (x / CHART_W) * 100;
    return {
      x,
      y: yPos,
      xPercent,
      count: b.count,
      isPeak: b.key === peak.key,
      ...labels,
    };
  });

  const points: ChartPoint[] = markers.map(({ x, y }) => ({ x, y }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const last = points[points.length - 1];
  const first = points[0];
  const areaPath = `${linePath} L${last.x.toFixed(1)},${baselineY} L${first.x.toFixed(1)},${baselineY} Z`;
  const baselinePath = `M${plotLeft},${baselineY} L${plotRight},${baselineY}`;

  return {
    width: CHART_W,
    height: CHART_H,
    areaPath,
    linePath,
    baselinePath,
    baselineY,
    plotLeft,
    plotRight,
    maxCount: max,
    markers,
    startLabel: buckets[0].label,
    endLabel: buckets[buckets.length - 1].label,
    totalIssues: totalIssues ?? posts.length,
    peakLabel: `${peak.label} · ${peak.count} 篇`,
  };
}
