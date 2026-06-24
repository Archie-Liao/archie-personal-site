import { useEffect, useState } from "react";

function formatBeijingTime(date: Date): string {
  return date.toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
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

export function BeijingClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="text-lg tabular-nums"
        style={{ fontFamily: "var(--font-mono)", color: "var(--foreground)" }}
      >
        {formatBeijingTime(now)}
      </span>
      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
        北京时间 · {formatBeijingDate(now)}
      </span>
    </div>
  );
}
