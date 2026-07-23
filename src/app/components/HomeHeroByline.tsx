import { useState } from "react";
import { siteConfig } from "../site.config";

type Props = { dayCount: number };

/** A1-1 Hero byline · benchmark 寸照插槽 + 作者行 */
export function HomeHeroByline({ dayCount }: Props) {
  const usePhoto = siteConfig.avatarMode === "photo";
  const [photoOk, setPhotoOk] = useState(usePhoto);

  return (
    <div className="home-hero-byline" aria-label="作者信息">
      <div className="home-hero-byline__portrait">
        {usePhoto && photoOk ? (
          <img
            src={siteConfig.avatarPhotoUrl}
            alt={`${siteConfig.nameZh} ${siteConfig.nameEnShort}`}
            onError={() => setPhotoOk(false)}
          />
        ) : (
          <span className="home-hero-byline__portrait-ph">
            寸照
            <br />
            待补
          </span>
        )}
      </div>
      <p className="home-hero-byline__meta">
        <strong>
          {siteConfig.nameZh} {siteConfig.nameEnShort}
        </strong>
        <span className="home-hero-byline__dot"> · </span>
        视频日记作者
        <br />
        坚持日更
        <span className="home-hero-byline__dot"> · </span>
        已写到第 {dayCount} 天
      </p>

      <style>{`
        .home-hero-byline {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          margin-top: 1.5rem;
        }
        .home-hero-byline__portrait {
          flex: 0 0 auto;
          width: 3.25rem;
          height: 3.25rem;
          border: 1px solid var(--border);
          background: color-mix(in srgb, var(--card) 92%, var(--secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        .home-hero-byline__portrait img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .home-hero-byline__portrait-ph {
          font-family: var(--font-body);
          font-size: 0.625rem;
          line-height: 1.3;
          letter-spacing: 0.08em;
          color: var(--muted-foreground);
        }
        .home-hero-byline__meta {
          margin: 0;
          font-family: var(--font-body);
          font-size: 0.75rem;
          line-height: 1.55;
          letter-spacing: 0.04em;
          color: color-mix(in srgb, var(--muted-foreground) 88%, transparent);
        }
        .home-hero-byline__meta strong {
          font-family: var(--font-serif);
          font-weight: 600;
          color: color-mix(in srgb, var(--logo-wordmark-ink, #633323) 75%, var(--muted-foreground));
        }
        .home-hero-byline__dot {
          color: color-mix(in srgb, var(--muted-foreground) 65%, var(--border));
        }
        @media (max-width: 900px) {
          .home-hero-byline { margin-top: 1.25rem; }
        }
      `}</style>
    </div>
  );
}
