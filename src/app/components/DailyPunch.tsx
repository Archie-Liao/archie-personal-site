import { SiteLink } from "./SiteLink";
import { getDailyQuote } from "../utils/dailyQuote";
import { getDiaryDayCount } from "../utils/dayCount";
import { siteConfig } from "../site.config";

/** A1-3 · D4 punch 斜切色带 + 日记金句池 */
export function DailyPunch() {
  const quote = getDailyQuote();
  const dayCount = getDiaryDayCount(siteConfig.dayOneDate);

  return (
    <section className="daily-punch" aria-label="每日金句">
      <div className="daily-punch__slice">
        <span className="daily-punch__lab">Cover Story</span>
        {quote.postId ? (
          <SiteLink to={`/post/${quote.postId}`} className="daily-punch__msg" title={quote.postTitle}>
            「{quote.text}」
          </SiteLink>
        ) : (
          <p className="daily-punch__msg">「{quote.text}」</p>
        )}
        <span className="daily-punch__n" aria-hidden="true">
          {String(dayCount).padStart(2, "0")}
        </span>
      </div>

      <style>{`
        .daily-punch {
          width: 100%;
          padding: 0;
        }
        .daily-punch__slice {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem 1.5rem;
          padding: 1.125rem clamp(1.25rem, 4vw, 2rem);
          color: color-mix(in srgb, var(--background) 95%, white);
          background: linear-gradient(
            95deg,
            var(--punch, var(--primary)) 0%,
            color-mix(in srgb, var(--punch, var(--primary)) 82%, #e85a32) 55%,
            color-mix(in srgb, var(--primary) 90%, var(--foreground)) 100%
          );
          clip-path: polygon(0 0, 100% 10%, 100% 100%, 0 90%);
        }
        .daily-punch__lab {
          flex-shrink: 0;
          font-family: var(--font-cond, var(--font-display));
          font-weight: 800;
          font-size: 0.6875rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          opacity: 0.92;
        }
        .daily-punch__msg {
          flex: 1;
          margin: 0;
          min-width: 0;
          font-family: var(--font-serif);
          font-weight: 600;
          font-size: clamp(0.9375rem, 2.2vw, 1.25rem);
          line-height: 1.45;
          letter-spacing: 0.02em;
          text-align: center;
          text-decoration: none;
          color: inherit;
          transition: opacity 0.15s ease;
        }
        .daily-punch__msg:hover { opacity: 0.88; }
        .daily-punch__n {
          flex-shrink: 0;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(2rem, 5vw, 3rem);
          line-height: 1;
          opacity: 0.35;
        }
        @media (max-width: 640px) {
          .daily-punch__slice {
            flex-wrap: wrap;
            justify-content: center;
            clip-path: none;
            padding: 1rem 1.25rem;
          }
          .daily-punch__msg { flex-basis: 100%; order: 2; }
          .daily-punch__n { order: 3; opacity: 0.5; font-size: 1.5rem; }
        }
      `}</style>
    </section>
  );
}
