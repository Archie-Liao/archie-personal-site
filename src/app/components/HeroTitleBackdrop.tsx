import type { HeroBackdropBlock } from "../utils/heroTitleBackdrop";

type Props = {
  blocks: HeroBackdropBlock[];
  roughSeed: number;
};

function filterFor(block: HeroBackdropBlock): string | undefined {
  if (block.texture === "wisp") {
    return block.blur ? `blur(${block.blur}px)` : "blur(1.2px)";
  }
  if (block.texture === "tear") return "url(#hero-title-tear)";
  if (block.texture === "brush") return "url(#hero-title-brush)";
  return undefined;
}

function bleedShadow(block: HeroBackdropBlock): string | undefined {
  const spread = 4 + (block.mix % 4);
  const alpha = block.texture === "brush" ? "12%" : "8%";
  return `0 0 ${spread}px color-mix(in srgb, var(${block.colorVar}) ${alpha}, transparent)`;
}

/** A1-1 Hero 标题背后 · 撕纸 / 毛笔随机装饰 */
export function HeroTitleBackdrop({ blocks, roughSeed }: Props) {
  return (
    <div className="home-hero-title-backdrop" aria-hidden="true">
      <svg className="home-hero-title-backdrop__filters" aria-hidden="true">
        <defs>
          <filter id="hero-title-tear" x="-18%" y="-18%" width="136%" height="136%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.038"
              numOctaves="4"
              seed={roughSeed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="11"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="hero-title-brush" x="-22%" y="-22%" width="144%" height="144%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.055 0.82"
              numOctaves="3"
              seed={roughSeed + 17}
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="0.45" />
          </filter>
        </defs>
      </svg>

      {blocks.map((b) => (
        <span
          key={b.id}
          className={`home-hero-title-backdrop__piece home-hero-title-backdrop__piece--${b.kind} home-hero-title-backdrop__piece--${b.texture}`}
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `${b.width}%`,
            height: `${b.height}%`,
            transform: `rotate(${b.rotate}deg) skew(${b.skewX}deg, ${b.skewY}deg)`,
            opacity: b.opacity ?? 1,
            ["--piece-opacity" as string]: b.opacity ?? 1,
            background: `color-mix(in srgb, var(${b.colorVar}) ${b.mix}%, transparent)`,
            borderRadius: b.radius,
            clipPath: b.clip,
            filter: filterFor(b),
            boxShadow: b.texture !== "wisp" ? bleedShadow(b) : undefined,
          }}
        />
      ))}

      <style>{`
        .home-hero-title-backdrop {
          position: absolute;
          inset: -55% -45% -60% -40%;
          z-index: 0;
          pointer-events: none;
          overflow: visible;
        }
        .home-hero-title-backdrop__filters {
          position: absolute;
          width: 0;
          height: 0;
          overflow: hidden;
        }
        .home-hero-title-backdrop__piece {
          position: absolute;
          display: block;
          transform-origin: center center;
          mix-blend-mode: multiply;
        }
        @media (prefers-reduced-motion: no-preference) {
          .home-hero-title-backdrop__piece {
            animation: hero-backdrop-in 0.55s var(--snap, ease) both;
          }
          .home-hero-title-backdrop__piece--wisp { animation-delay: 0.06s; }
          @keyframes hero-backdrop-in {
            from { opacity: 0; }
            to { opacity: var(--piece-opacity, 1); }
          }
        }
      `}</style>
    </div>
  );
}
