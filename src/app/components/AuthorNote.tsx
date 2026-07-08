import { siteConfig } from "../site.config";

/** A1-6 · benchmark `note-inner` — 首字放大异色 · 单栏卷首语 */
export function AuthorNote() {
  const body = siteConfig.about.intro.startsWith("你")
    ? siteConfig.about.intro.slice(1)
    : siteConfig.about.intro;

  return (
    <section className="author-note" aria-label="卷首语">
      <div className="author-note__inner">
        <span className="author-note__eyebrow">卷首语 · A Note from the Author</span>
        <p className="author-note__text">
          <span className="author-note__drop" aria-hidden="true">
            你
          </span>
          {body}
        </p>
        <div className="author-note__sign">
          <span className="author-note__line" aria-hidden="true" />
          <span className="author-note__who">
            <strong>
              {siteConfig.nameZh} {siteConfig.nameEnShort}
            </strong>
            {" · 二〇二六"}
          </span>
          <span className="author-note__line" aria-hidden="true" />
        </div>
      </div>

      <style>{`
        .author-note {
          padding: clamp(5rem, 10vw, 6rem) 0 clamp(5.5rem, 11vw, 6.5rem);
        }
        .author-note__inner {
          max-width: 45rem;
          margin: 0 auto;
          text-align: center;
        }
        .author-note__eyebrow {
          display: block;
          margin-bottom: 1.625rem;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--primary-deep, var(--terracotta));
        }
        .author-note__text {
          margin: 0;
          font-family: var(--font-serif);
          font-weight: 500;
          font-size: clamp(1.125rem, 2.2vw, 1.25rem);
          line-height: 1.92;
          letter-spacing: 0.02em;
          color: var(--foreground);
          text-align: justify;
          text-wrap: pretty;
        }
        .author-note__drop {
          float: left;
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--primary);
          font-size: clamp(3.75rem, 8vw, 4.375rem);
          line-height: 0.78;
          padding: 0.25rem 0.875rem 0 0;
          margin-top: 0.25rem;
        }
        .author-note__sign {
          margin-top: 2.125rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.875rem;
        }
        .author-note__line {
          width: 1.75rem;
          height: 1px;
          background: var(--border);
          flex-shrink: 0;
        }
        .author-note__who {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 0.9375rem;
          color: var(--muted-foreground);
        }
        .author-note__who strong {
          font-style: normal;
          font-family: var(--font-serif);
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--foreground);
        }
      `}</style>
    </section>
  );
}
