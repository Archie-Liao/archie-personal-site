import {
  buildDensityChart,
  getEpisodeRange,
  getPublishDensityForChart,
} from "../utils/publishDensity";

/** A1-5 · D5 chart-band — 日记发布密度（非点击 analytics） */
export function PublishDensityChart() {
  const { buckets, isMock, totalIssues } = getPublishDensityForChart();
  const chart = buildDensityChart(buckets, totalIssues);
  const epRange = getEpisodeRange();
  const peak = chart.markers.find((m) => m.isPeak);

  const title = isMock
    ? "Fig. 1 — 日记发布密度 · 示意"
    : epRange != null
      ? `Fig. 1 — 日记发布密度 · EP.${String(epRange.min).padStart(2, "0")}–${String(epRange.max).padStart(2, "0")}`
      : "Fig. 1 — 日记发布密度";

  return (
    <section className="publish-chart" aria-label="日记发布密度">
      <div className="publish-chart__cap">
        <div className="publish-chart__head">
          <h2 className="publish-chart__title">{title}</h2>
          <p className="publish-chart__note">
            {isMock ? (
              <>
                <span className="publish-chart__mock-badge">示意</span>
                按月期数 · 共 {chart.totalIssues} 篇（模拟）· 峰值 {chart.peakLabel} · 部署后接真实发布记录
              </>
            ) : (
              <>按月期数 · 共 {chart.totalIssues} 篇 · 峰值 {chart.peakLabel}</>
            )}
          </p>
        </div>
      </div>

      <div className="publish-chart__plot-wrap">
        <svg
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          preserveAspectRatio="xMidYMid meet"
          className="publish-chart__svg"
          role="img"
          aria-label={`${chart.startLabel} 至 ${chart.endLabel} 每月发布篇数折线`}
        >
          <defs>
            <linearGradient id="publish-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--data-red, var(--primary))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--data-red, var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>

          <text className="publish-chart__y-max" x={chart.plotLeft - 6} y={16} textAnchor="end">
            {chart.maxCount}
          </text>
          <text className="publish-chart__y-unit" x={chart.plotLeft - 6} y={26} textAnchor="end">
            篇/月
          </text>

          {chart.markers.map((m, i) => (
            <line
              key={`grid-${i}`}
              className="publish-chart__grid"
              x1={m.x}
              y1={m.y}
              x2={m.x}
              y2={chart.baselineY}
            />
          ))}

          <path className="publish-chart__area" d={chart.areaPath} />
          <path className="publish-chart__line publish-chart__line--spark" d={chart.linePath} />
          <path className="publish-chart__baseline" d={chart.baselinePath} />

          {chart.markers.map((m, i) => (
            <circle
              key={`dot-${i}`}
              className={`publish-chart__dot${m.isPeak ? " publish-chart__dot--peak" : ""}`}
              cx={m.x}
              cy={m.y}
              r={m.isPeak ? 2.75 : 2}
            >
              <title>{`${m.yearLabel ? `${m.yearLabel}年` : ""}${m.monthLabel} · ${m.count} 篇`}</title>
            </circle>
          ))}

          {peak ? (
            <text className="publish-chart__peak-label" x={peak.x} y={peak.y - 7} textAnchor="middle">
              {peak.count}
            </text>
          ) : null}

          {chart.markers.map((m, i) => (
            <g key={`tick-${i}`}>
              <text className="publish-chart__month" x={m.x} y={chart.baselineY + 14} textAnchor="middle">
                {m.monthLabel}
              </text>
              {m.yearLabel ? (
                <text className="publish-chart__year" x={m.x} y={chart.baselineY + 24} textAnchor="middle">
                  {m.yearLabel}
                </text>
              ) : null}
            </g>
          ))}
        </svg>
      </div>

      <style>{`
        .publish-chart {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          padding: 1.1rem 0 0.75rem;
          background: color-mix(in srgb, var(--secondary) 65%, var(--background));
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .publish-chart__cap {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 2rem) 0.5rem;
        }
        .publish-chart__head {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.35rem 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid color-mix(in srgb, var(--border) 65%, transparent);
        }
        .publish-chart__title {
          margin: 0;
          font-family: var(--font-body);
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        .publish-chart__note {
          margin: 0;
          font-size: 0.6875rem;
          letter-spacing: 0.03em;
          color: color-mix(in srgb, var(--muted-foreground) 88%, transparent);
        }
        .publish-chart__mock-badge {
          display: inline-block;
          margin-right: 0.4rem;
          padding: 1px 6px;
          font-size: 0.5625rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--punch, var(--primary));
          border: 1px dashed color-mix(in srgb, var(--punch, var(--primary)) 45%, var(--border));
          border-radius: 2px;
          vertical-align: 0.05em;
        }
        .publish-chart__plot-wrap {
          padding: 0.25rem clamp(0.75rem, 2.5vw, 2rem) 0;
        }
        .publish-chart__svg {
          width: 100%;
          height: auto;
          aspect-ratio: 800 / 128;
          max-height: 10.5rem;
          display: block;
        }
        .publish-chart__grid {
          stroke: color-mix(in srgb, var(--data-slate, var(--muted-foreground)) 40%, var(--border));
          stroke-width: 0.75;
          stroke-dasharray: 2 4;
          opacity: 0.32;
        }
        .publish-chart__area {
          fill: url(#publish-chart-fill);
        }
        .publish-chart__line {
          fill: none;
          stroke: color-mix(in srgb, var(--data-red, var(--primary)) 88%, var(--muted-foreground));
          stroke-width: 1.35;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .publish-chart__line--spark {
          stroke-dasharray: 900;
          stroke-dashoffset: 900;
          animation: publishSpark 1.1s var(--snap, ease) forwards;
        }
        .publish-chart__baseline {
          fill: none;
          stroke: color-mix(in srgb, var(--data-slate, var(--muted-foreground)) 55%, var(--border));
          stroke-width: 0.85;
          opacity: 0.45;
        }
        .publish-chart__dot {
          fill: var(--background, var(--card));
          stroke: color-mix(in srgb, var(--data-red, var(--primary)) 80%, var(--muted-foreground));
          stroke-width: 1.1;
        }
        .publish-chart__dot--peak {
          fill: var(--background, var(--card));
          stroke: var(--data-red, var(--primary));
          stroke-width: 1.35;
        }
        .publish-chart__peak-label {
          font-family: var(--font-mono, var(--font-body));
          font-size: 8px;
          font-weight: 600;
          fill: color-mix(in srgb, var(--data-red, var(--primary)) 85%, var(--muted-foreground));
        }
        .publish-chart__y-max {
          font-family: var(--font-mono, var(--font-body));
          font-size: 8px;
          font-weight: 600;
          fill: color-mix(in srgb, var(--muted-foreground) 80%, transparent);
        }
        .publish-chart__y-unit {
          font-family: var(--font-body);
          font-size: 7px;
          letter-spacing: 0.06em;
          fill: color-mix(in srgb, var(--muted-foreground) 65%, transparent);
        }
        .publish-chart__month {
          font-family: var(--font-body);
          font-size: 9px;
          fill: color-mix(in srgb, var(--muted-foreground) 88%, transparent);
        }
        .publish-chart__year {
          font-family: var(--font-mono, var(--font-body));
          font-size: 7.5px;
          letter-spacing: 0.04em;
          fill: color-mix(in srgb, var(--muted-foreground) 62%, transparent);
        }
        @keyframes publishSpark {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .publish-chart__line--spark {
            stroke-dashoffset: 0;
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
