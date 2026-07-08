import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { openSitePath } from "../utils/openSitePath";

function readQueryParam(search: string, key: string): string {
  return new URLSearchParams(search).get(key) ?? "";
}

/** P1：顶栏搜索 → /posts?q=… 客户端 filter（MIX-MATCH §1） */
export function SiteSearch({ className = "" }: { className?: string }) {
  const location = useLocation();
  const queryFromUrl = useMemo(() => readQueryParam(location.search, "q"), [location.search]);
  const [q, setQ] = useState(queryFromUrl);

  useEffect(() => {
    setQ(queryFromUrl);
  }, [queryFromUrl]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    openSitePath(trimmed ? `/posts?q=${encodeURIComponent(trimmed)}` : "/posts");
  }

  return (
    <form className={`site-search ${className}`} onSubmit={onSubmit} role="search">
      <label className="sr-only" htmlFor="site-search-input">
        搜索日记
      </label>
      <input
        id="site-search-input"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="搜索…"
        autoComplete="off"
      />
      <style>{`
        .site-search input {
          width: 140px;
          padding: 6px 12px;
          font-size: 0.8125rem;
          font-family: var(--font-body);
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--card);
          color: var(--foreground);
          transition: width 0.2s var(--snap, ease), border-color 0.2s;
        }
        .site-search input:focus {
          outline: none;
          width: 180px;
          border-color: var(--primary);
        }
        .site-search input::placeholder { color: var(--muted-foreground); }
        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); border: 0;
        }
      `}</style>
    </form>
  );
}
