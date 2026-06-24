import { siteConfig } from "../site.config";

const PLATE_SRC = "/assets/img/Pieris_butterfly_plate_Pieris_wollastoni-PD.png";

/** Hero 右侧 — 复古博物版画（benchmark 方向：细框 + 图版说明） */
export function HeroIllustration() {
  if (siteConfig.avatarMode === "photo") {
    return (
      <div
        className="relative w-full max-w-md mx-auto"
        style={{ border: "1px solid var(--border)", padding: 14, background: "var(--card)" }}
      >
        <div style={{ border: "1px solid var(--border)", padding: 8 }}>
          <img
            src={siteConfig.avatarPhotoUrl}
            alt={siteConfig.name}
            className="w-full aspect-square object-cover"
            style={{ display: "block" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <figcaption
          className="flex justify-between items-baseline gap-4 mt-3 pt-3"
          style={{ borderTop: "1px solid var(--border)", fontSize: "0.8125rem", color: "var(--muted-foreground)" }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
            <strong style={{ fontStyle: "normal" }}>{siteConfig.nameZh}</strong> — 寸照
          </span>
          <span style={{ letterSpacing: "0.14em", fontSize: "0.75rem" }}>PL. 00</span>
        </figcaption>
      </div>
    );
  }

  return (
    <figure className="relative w-full max-w-md mx-auto m-0">
      <div
        style={{
          border: "1px solid var(--border)",
          padding: 14,
          background: "var(--card)",
          boxShadow: "0 18px 40px -28px rgba(25,25,25,0.25)",
        }}
      >
        <div style={{ border: "1px solid var(--border)", padding: 10 }}>
          <img
            src={PLATE_SRC}
            alt="Pieris wollastoni 粉蝶 · 复古博物手工版画"
            className="w-full h-auto"
            style={{ display: "block", mixBlendMode: "multiply" }}
          />
        </div>
      </div>
      <figcaption
        className="flex justify-between items-baseline gap-4 mt-3 pt-3"
        style={{ borderTop: "1px solid var(--border)", fontSize: "0.8125rem", color: "var(--muted-foreground)" }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
          <strong style={{ fontStyle: "normal", color: "var(--foreground)" }}>Pieris wollastoni</strong>
          {" "}— 粉蝶｜复古博物手工版画
        </span>
        <span style={{ letterSpacing: "0.14em", fontSize: "0.75rem", whiteSpace: "nowrap" }}>PL. 01</span>
      </figcaption>
    </figure>
  );
}
