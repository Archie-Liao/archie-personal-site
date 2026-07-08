import { useEffect, useState } from "react";

function beijingNow(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" }));
}

function formatBeijingTimeParts(date: Date): { hms: string; sec: string; full: string } {
  const full = date.toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const sec = full.slice(-2);
  return { hms: full.slice(0, -3), sec, full };
}

function formatBeijingDate(date: Date): string {
  return date.toLocaleDateString("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

export function BeijingClock({ variant = "default" }: { variant?: "default" | "stat-cell" }) {
  const [now, setNow] = useState(beijingNow);

  useEffect(() => {
    const id = setInterval(() => setNow(beijingNow()), 1000);
    return () => clearInterval(id);
  }, []);

  const { hms, sec, full } = formatBeijingTimeParts(now);
  const dateLine = formatBeijingDate(now);

  if (variant === "stat-cell") {
    return (
      <div className="stat-band__cell">
        <span className="stat-band__lab">Beijing Now · 北京时间</span>
        <p className="stat-band__val stat-band__val--clock">
          <span>{hms}</span>
          <span className="stat-band__sec">:{sec}</span>
        </p>
        <span className="stat-band__sub">{dateLine}</span>
        <style>{`
          .stat-band__val--clock {
            font-family: var(--font-display);
            font-style: normal;
            font-variant-numeric: tabular-nums;
            letter-spacing: 0.04em;
          }
          .stat-band__sec {
            font-style: italic;
            color: var(--primary-deep, var(--primary));
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="text-lg tabular-nums"
        style={{ fontFamily: "var(--font-mono)", color: "var(--foreground)" }}
      >
        {full}
      </span>
      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
        北京时间 · {dateLine}
      </span>
    </div>
  );
}
