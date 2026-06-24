import { useEffect, useState } from "react";
import { getRecentDays } from "../utils/analytics";

export function MiniCalendar() {
  const [days, setDays] = useState(getRecentDays(7));

  useEffect(() => {
    const refresh = () => setDays(getRecentDays(7));
    refresh();
    const id = setInterval(refresh, 10000);
    return () => clearInterval(id);
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>
        浏览记录（本机）
      </span>
      <div className="flex gap-1 flex-wrap">
        {days.length === 0 ? (
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            暂无记录，多逛逛就有啦
          </span>
        ) : (
          days.map((d) => {
            const intensity = Math.min(d.pageViews + d.clicks, 5);
            return (
              <div
                key={d.date}
                title={`${d.date}: ${d.pageViews} 次浏览 · ${d.clicks} 次点击 · ${d.dwellSeconds}s`}
                className="w-8 h-8 rounded-md flex flex-col items-center justify-center text-[10px] border"
                style={{
                  borderColor: d.date === today ? "var(--primary)" : "var(--border)",
                  background: `color-mix(in srgb, var(--primary) ${intensity * 12}%, var(--card))`,
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {d.date.slice(8)}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
