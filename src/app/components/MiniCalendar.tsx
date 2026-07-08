import { useEffect, useMemo, useState } from "react";

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"] as const;

function beijingYmd(): { y: number; m: number; d: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { y: get("year"), m: get("month"), d: get("day") };
}

function mondayIndex(y: number, m: number): number {
  const js = new Date(`${y}-${String(m).padStart(2, "0")}-01T12:00:00+08:00`).getDay();
  return js === 0 ? 6 : js - 1;
}

function daysInMonth(y: number, m: number): number {
  return new Date(y, m, 0).getDate();
}

type CalCell = { day: number; muted: boolean; today: boolean };

function buildMonthGrid(y: number, m: number, today: number): CalCell[] {
  const cells: CalCell[] = [];
  const lead = mondayIndex(y, m);
  const total = daysInMonth(y, m);

  for (let i = 0; i < lead; i++) {
    const prevM = m === 1 ? 12 : m - 1;
    const prevY = m === 1 ? y - 1 : y;
    const prevTotal = daysInMonth(prevY, prevM);
    cells.push({ day: prevTotal - lead + i + 1, muted: true, today: false });
  }

  for (let d = 1; d <= total; d++) {
    cells.push({ day: d, muted: false, today: d === today });
  }

  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextDay++, muted: true, today: false });
  }

  return cells;
}

/** 迷你月历 · 默认纸色 / stat-band 色带内嵌（D2 cal-mini） */
export function MiniCalendar({ variant = "default" }: { variant?: "default" | "stat-band" }) {
  const [ymd, setYmd] = useState(beijingYmd);

  useEffect(() => {
    const id = setInterval(() => setYmd(beijingYmd()), 60_000);
    return () => clearInterval(id);
  }, []);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("zh-CN", {
        timeZone: "Asia/Shanghai",
        year: "numeric",
        month: "long",
      }).format(new Date()),
    [ymd.m, ymd.y]
  );

  const cells = useMemo(() => buildMonthGrid(ymd.y, ymd.m, ymd.d), [ymd]);

  const table = (
    <table className={`stat-cal__table${variant === "stat-band" ? " stat-cal__table--band" : ""}`}>
      <thead>
        <tr>
          {WEEKDAYS.map((w) => (
            <th key={w}>{w}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: cells.length / 7 }, (_, row) => (
          <tr key={row}>
            {cells.slice(row * 7, row * 7 + 7).map((cell, i) => (
              <td
                key={`${row}-${i}`}
                className={cell.muted ? "stat-cal__mute" : cell.today ? "stat-cal__today" : undefined}
              >
                {cell.today ? <span>{cell.day}</span> : cell.day}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (variant === "stat-band") {
    return (
      <div className="stat-band__cell stat-band__cell--cal">
        <div className="stat-cal stat-cal--band">
          <div className="stat-cal__head">
            <span className="stat-cal__m">{monthLabel}</span>
            <span className="stat-cal__lab">本月</span>
          </div>
          {table}
        </div>
        <style>{`
          .stat-band__cell--cal {
            align-items: center;
            justify-content: center;
            padding: clamp(1.25rem, 3vw, 1.75rem) clamp(0.75rem, 2vw, 1.25rem);
          }
          .stat-cal--band {
            width: min(100%, 13.625rem);
            margin: 0 auto;
          }
          .stat-cal--band .stat-cal__head {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            margin-bottom: 0.45rem;
          }
          .stat-cal--band .stat-cal__m {
            font-family: var(--font-display);
            font-style: italic;
            font-size: 0.8125rem;
            color: color-mix(in srgb, var(--foreground) 78%, var(--muted-foreground));
          }
          .stat-cal--band .stat-cal__lab {
            font-size: 0.625rem;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: var(--muted-foreground);
          }
          .stat-cal__table--band th {
            font-size: 0.625rem;
            font-weight: 500;
            color: var(--muted-foreground);
            padding: 2px 0;
          }
          .stat-cal__table--band td {
            font-size: 0.6875rem;
            text-align: center;
            padding: 3px 0;
            color: color-mix(in srgb, var(--foreground) 72%, var(--muted-foreground));
          }
          .stat-cal__table--band .stat-cal__today {
            color: var(--primary-foreground);
            font-weight: 600;
          }
          .stat-cal__table--band .stat-cal__today span {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.125rem;
            height: 1.125rem;
            background: var(--primary);
            border-radius: 50%;
          }
          .stat-cal__table--band .stat-cal__mute {
            color: color-mix(in srgb, var(--muted-foreground) 42%, transparent);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="stat-cal">
      <div className="stat-cal__head">
        <span className="stat-cal__m">{monthLabel}</span>
        <span className="stat-cal__lab">本月</span>
      </div>
      {table}
      <style>{`
        .stat-cal { width: min(100%, 13.625rem); }
        .stat-cal__head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 0.45rem;
        }
        .stat-cal__m {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 0.8125rem;
          color: color-mix(in srgb, var(--foreground) 78%, var(--muted-foreground));
        }
        .stat-cal__lab {
          font-size: 0.625rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        .stat-cal__table { width: 100%; border-collapse: collapse; }
        .stat-cal__table th {
          font-size: 0.625rem;
          font-weight: 500;
          color: var(--muted-foreground);
          padding: 2px 0;
        }
        .stat-cal__table td {
          font-size: 0.6875rem;
          text-align: center;
          padding: 3px 0;
          color: color-mix(in srgb, var(--foreground) 72%, var(--muted-foreground));
        }
        .stat-cal__today { color: var(--primary-foreground); font-weight: 600; }
        .stat-cal__today span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.125rem;
          height: 1.125rem;
          background: var(--primary);
          border-radius: 50%;
        }
        .stat-cal__mute {
          color: color-mix(in srgb, var(--muted-foreground) 42%, transparent);
        }
      `}</style>
    </div>
  );
}
