import { useCallback, useRef, useState } from "react";
import { SiteLink } from "./SiteLink";
import { getDailyQuote } from "../utils/dailyQuote";
import { getDiaryDayCount } from "../utils/dayCount";
import { siteConfig } from "../site.config";

/** A1-3 · 纸色渐变底（定稿）· 金句 punch 金属字 + 纸色高光 */
export function DailyPunch() {
  const quote = getDailyQuote();
  const dayCount = getDiaryDayCount(siteConfig.dayOneDate);
  const sliceRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0 });
  const [lit, setLit] = useState(false);

  const onSliceMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const slice = sliceRef.current;
    if (!slice) return;
    const msg = slice.querySelector<HTMLElement>(".daily-punch__msg");
    if (!msg) return;
    const r = msg.getBoundingClientRect();
    setSpot({
      x: e.clientX - r.left,
      y: e.clientY - r.top,
    });
    setLit(true);
  }, []);

  const onSliceLeave = useCallback(() => setLit(false), []);

  const sliceStyle = {
    "--spot-x": `${spot.x}px`,
    "--spot-y": `${spot.y}px`,
  } as React.CSSProperties;

  const quoteText = `「${quote.text}」`;

  return (
    <section className="daily-punch" aria-label="每日金句">
      <div
        ref={sliceRef}
        className={`daily-punch__slice${lit ? " is-lit" : ""}`}
        style={sliceStyle}
        onMouseMove={onSliceMove}
        onMouseLeave={onSliceLeave}
      >
        <span className="daily-punch__lab">Cover Story</span>
        {quote.postId ? (
          <SiteLink to={`/post/${quote.postId}`} className="daily-punch__msg" title={quote.postTitle}>
            {quoteText}
          </SiteLink>
        ) : (
          <p className="daily-punch__msg">{quoteText}</p>
        )}
        <span className="daily-punch__n" aria-hidden="true">
          {String(dayCount).padStart(2, "0")}
        </span>
      </div>

      <style>{`
        .daily-punch {
          width: 100%;
          overflow-x: clip;
        }
        .daily-punch__slice {
          --spot-x: 0px;
          --spot-y: 0px;
          width: 100vw;
          max-width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem 1.5rem;
          padding: 1.125rem clamp(1.25rem, 4vw, 2rem);
          color: var(--muted-foreground);
          background: linear-gradient(
            98deg,
            color-mix(in srgb, var(--ink-green) 18%, var(--card)) 0%,
            color-mix(in srgb, var(--accent) 42%, var(--card)) 22%,
            color-mix(in srgb, var(--card) 92%, var(--background)) 48%,
            color-mix(in srgb, var(--punch) 14%, var(--card)) 74%,
            color-mix(in srgb, var(--primary) 22%, var(--secondary)) 100%
          );
          box-shadow:
            inset 4px 0 0 color-mix(in srgb, var(--ink-green) 55%, transparent),
            inset -4px 0 0 color-mix(in srgb, var(--punch) 48%, transparent),
            inset 0 1px 0 color-mix(in srgb, var(--card) 80%, transparent),
            inset 0 -1px 0 color-mix(in srgb, var(--border) 70%, transparent);
          clip-path: polygon(0 0, 100% 8%, 100% 100%, 0 92%);
        }
        .daily-punch__lab {
          flex-shrink: 0;
          font-family: var(--font-cond, var(--font-display));
          font-weight: 800;
          font-size: 0.6875rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--ink-green) 55%, var(--muted-foreground));
        }
        .daily-punch__msg {
          flex: 1;
          margin: 0;
          min-width: 0;
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: clamp(1rem, 2.35vw, 1.3125rem);
          line-height: 1.45;
          letter-spacing: 0.03em;
          text-align: center;
          text-decoration: none;
          color: transparent;
          background-image: linear-gradient(
            112deg,
            color-mix(in srgb, var(--primary-deep) 94%, var(--foreground)) 0%,
            color-mix(in srgb, var(--punch) 92%, var(--foreground)) 16%,
            color-mix(in srgb, var(--background) 22%, var(--primary-deep)) 34%,
            color-mix(in srgb, var(--punch) 90%, var(--foreground)) 48%,
            color-mix(in srgb, var(--background) 32%, var(--primary-deep)) 58%,
            color-mix(in srgb, var(--primary-deep) 92%, var(--punch)) 72%,
            color-mix(in srgb, var(--background) 22%, var(--primary-deep)) 86%,
            color-mix(in srgb, var(--punch) 88%, var(--foreground)) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter:
            drop-shadow(0 1px 0 color-mix(in srgb, var(--foreground) 48%, transparent))
            drop-shadow(0 1px 2px color-mix(in srgb, var(--foreground) 32%, transparent));
          transition: filter 0.2s ease;
        }
        .daily-punch__slice.is-lit .daily-punch__msg {
          background-image:
            radial-gradient(
              circle 12rem at var(--spot-x) var(--spot-y),
              color-mix(in srgb, var(--background) 92%, white) 0%,
              color-mix(in srgb, var(--background) 68%, var(--primary-deep)) 16%,
              color-mix(in srgb, var(--punch) 32%, var(--background)) 32%,
              color-mix(in srgb, var(--primary-deep) 18%, transparent) 48%,
              transparent 78%
            ),
            linear-gradient(
              112deg,
              color-mix(in srgb, var(--primary-deep) 94%, var(--foreground)) 0%,
              color-mix(in srgb, var(--punch) 92%, var(--foreground)) 16%,
              color-mix(in srgb, var(--background) 22%, var(--primary-deep)) 34%,
              color-mix(in srgb, var(--punch) 90%, var(--foreground)) 48%,
              color-mix(in srgb, var(--background) 32%, var(--primary-deep)) 58%,
              color-mix(in srgb, var(--primary-deep) 92%, var(--punch)) 72%,
              color-mix(in srgb, var(--background) 22%, var(--primary-deep)) 86%,
              color-mix(in srgb, var(--punch) 88%, var(--foreground)) 100%
            );
        }
        .daily-punch__msg:hover {
          filter:
            drop-shadow(0 1px 0 color-mix(in srgb, var(--foreground) 55%, transparent))
            drop-shadow(0 1px 3px color-mix(in srgb, var(--punch) 36%, transparent));
        }
        .daily-punch__n {
          flex-shrink: 0;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(2rem, 5vw, 3rem);
          line-height: 1;
          color: color-mix(in srgb, var(--punch) 55%, var(--muted-foreground));
          opacity: 0.55;
        }
        @media (max-width: 640px) {
          .daily-punch__slice {
            flex-wrap: wrap;
            justify-content: center;
            clip-path: none;
            padding: 1rem 1.25rem;
          }
          .daily-punch__msg { flex-basis: 100%; order: 2; }
          .daily-punch__n { order: 3; opacity: 0.45; font-size: 1.5rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .daily-punch__slice.is-lit .daily-punch__msg {
            background-image: linear-gradient(
              112deg,
              color-mix(in srgb, var(--primary-deep) 94%, var(--foreground)) 0%,
              color-mix(in srgb, var(--punch) 92%, var(--foreground)) 16%,
              color-mix(in srgb, var(--background) 22%, var(--primary-deep)) 34%,
              color-mix(in srgb, var(--punch) 90%, var(--foreground)) 48%,
              color-mix(in srgb, var(--background) 32%, var(--primary-deep)) 58%,
              color-mix(in srgb, var(--primary-deep) 92%, var(--punch)) 72%,
              color-mix(in srgb, var(--background) 22%, var(--primary-deep)) 86%,
              color-mix(in srgb, var(--punch) 88%, var(--foreground)) 100%
            );
          }
        }
      `}</style>
    </section>
  );
}
