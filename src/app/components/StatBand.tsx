import { siteConfig } from "../site.config";
import { getDiaryDayCount } from "../utils/dayCount";
import { BeijingClock } from "./BeijingClock";
import { MiniCalendar } from "./MiniCalendar";

/** A1-2 · D2 三栏 stat-band — lab / 大数字 / sub 层级 · 全宽色带 */
export function StatBand() {
  const dayCount = getDiaryDayCount(siteConfig.dayOneDate);
  const since = siteConfig.dayOneDate.replace(/-/g, ".");

  return (
    <section className="stat-band" aria-label="当下状态">
      <div className="stat-band__inner">
        <BeijingClock variant="stat-cell" />

        <div className="stat-band__cell stat-band__cell--hero">
          <span className="stat-band__lab">Video Diary · 视频日记</span>
          <p className="stat-band__val">
            Day <span className="stat-band__folio">{dayCount}</span>
          </p>
          <span className="stat-band__sub">Since {since}</span>
        </div>

        <MiniCalendar variant="stat-band" />
      </div>

      <style>{`
        .stat-band {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          color: var(--foreground);
          background: color-mix(in srgb, var(--secondary) 88%, var(--background));
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .stat-band__inner {
          max-width: 72rem;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: stretch;
        }
        .stat-band__cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: clamp(1.65rem, 3.5vw, 2.15rem) clamp(1rem, 2.5vw, 1.75rem);
          border-right: 1px solid var(--border);
        }
        .stat-band__cell:last-child {
          border-right: 0;
        }
        .stat-band__cell--hero {
          background: color-mix(in srgb, var(--primary) 6%, var(--secondary));
        }
        .stat-band__lab {
          font-family: var(--font-body);
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted-foreground);
          margin-bottom: 0.65rem;
        }
        .stat-band__val {
          margin: 0;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 700;
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          line-height: 1;
          letter-spacing: 0.02em;
          color: var(--foreground);
        }
        .stat-band__folio {
          font-size: 1.12em;
          font-style: italic;
          color: var(--primary-deep, var(--primary));
        }
        .stat-band__sub {
          margin-top: 0.55rem;
          font-family: var(--font-body);
          font-size: 0.6875rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        @media (max-width: 820px) {
          .stat-band__inner {
            grid-template-columns: 1fr;
          }
          .stat-band__cell {
            border-right: 0;
            border-bottom: 1px solid var(--border);
          }
          .stat-band__cell:last-child {
            border-bottom: 0;
          }
        }
      `}</style>
    </section>
  );
}
