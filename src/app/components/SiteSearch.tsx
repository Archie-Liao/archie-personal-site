import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import {
  SEARCH_IDLE_PHRASES,
  searchIdleFullText,
  type SearchIdlePhrase,
} from "../data/searchIdlePhrases";
import { openSitePath } from "../utils/openSitePath";

function readQueryParam(search: string, key: string): string {
  return new URLSearchParams(search).get(key) ?? "";
}

type Phase = "type" | "hold" | "delete" | "gap";

function IdleTypedView({ phrase, typed }: { phrase: SearchIdlePhrase; typed: string }) {
  const prefix = phrase.prefix ? `${phrase.prefix} ` : "";
  if (!prefix) {
    return <span className="site-search__idle-body">{typed}</span>;
  }
  if (typed.length <= prefix.length) {
    return <span className="site-search__idle-prefix">{typed}</span>;
  }
  return (
    <>
      <span className="site-search__idle-prefix">{prefix}</span>
      <span className="site-search__idle-body">{typed.slice(prefix.length)}</span>
    </>
  );
}

/**
 * P1：顶栏搜索 → /posts?q=…
 * 空闲时打字机循环站内向文案（用户聚焦/输入后立刻停）。
 */
export function SiteSearch({ className = "" }: { className?: string }) {
  const location = useLocation();
  const queryFromUrl = useMemo(() => readQueryParam(location.search, "q"), [location.search]);
  const [q, setQ] = useState(queryFromUrl);
  const [focused, setFocused] = useState(false);
  const [idleText, setIdleText] = useState("");
  const [idlePhrase, setIdlePhrase] = useState<SearchIdlePhrase | null>(null);
  const [caretOn, setCaretOn] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const phraseIndex = useRef(0);

  useEffect(() => {
    setQ(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const userBusy = focused || q.length > 0 || queryFromUrl.length > 0;

  useEffect(() => {
    if (userBusy || reduceMotion || SEARCH_IDLE_PHRASES.length === 0) {
      setIdleText("");
      setIdlePhrase(null);
      return;
    }

    let cancelled = false;
    let timer = 0;
    let phase: Phase = "type";
    let text = "";
    const phrases = SEARCH_IDLE_PHRASES;

    const current = () => phrases[phraseIndex.current % phrases.length]!;

    const tick = () => {
      if (cancelled) return;
      const phrase = current();
      const full = searchIdleFullText(phrase);
      setIdlePhrase(phrase);

      if (phase === "type") {
        if (text.length < full.length) {
          text = full.slice(0, text.length + 1);
          setIdleText(text);
          timer = window.setTimeout(tick, 95 + Math.random() * 55);
          return;
        }
        phase = "hold";
        timer = window.setTimeout(tick, 2800);
        return;
      }

      if (phase === "hold") {
        phase = "delete";
        timer = window.setTimeout(tick, 60);
        return;
      }

      if (phase === "delete") {
        if (text.length > 0) {
          text = text.slice(0, -1);
          setIdleText(text);
          timer = window.setTimeout(tick, 48 + Math.random() * 30);
          return;
        }
        phase = "gap";
        timer = window.setTimeout(tick, 900);
        return;
      }

      phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
      phase = "type";
      timer = window.setTimeout(tick, 200);
    };

    timer = window.setTimeout(tick, 700);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [userBusy, reduceMotion]);

  useEffect(() => {
    if (userBusy || reduceMotion) return;
    const id = window.setInterval(() => setCaretOn((v) => !v), 620);
    return () => window.clearInterval(id);
  }, [userBusy, reduceMotion]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    openSitePath(trimmed ? `/posts?q=${encodeURIComponent(trimmed)}` : "/posts");
  }

  const showIdle = !userBusy && !reduceMotion;
  const placeholder = reduceMotion || userBusy ? "搜索…" : " ";

  return (
    <form className={`site-search ${className}`} onSubmit={onSubmit} role="search">
      <label className="sr-only" htmlFor="site-search-input">
        搜索日记
      </label>
      <div className={`site-search__shell${showIdle ? " site-search__shell--idle" : ""}`}>
        {showIdle && idlePhrase && (
          <span className="site-search__idle" aria-hidden="true">
            <span className="site-search__idle-text">
              <IdleTypedView phrase={idlePhrase} typed={idleText} />
            </span>
            <span className={`site-search__caret${caretOn ? " is-on" : ""}`} />
          </span>
        )}
        <input
          id="site-search-input"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>
      <style>{`
        .site-search__shell {
          position: relative;
          display: inline-block;
        }
        .site-search input {
          width: 148px;
          padding: 6px 12px;
          font-size: 0.8125rem;
          font-family: var(--font-body);
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--card);
          color: var(--foreground);
          transition: width 0.25s var(--snap, ease), border-color 0.2s, box-shadow 0.2s;
        }
        .site-search__shell--idle input {
          width: min(240px, 42vw);
          border-color: color-mix(in srgb, var(--border) 88%, transparent);
          color: transparent;
          caret-color: transparent;
        }
        .site-search input:focus {
          outline: none;
          width: min(220px, 48vw);
          border-color: var(--primary);
          color: var(--foreground);
          caret-color: var(--foreground);
        }
        .site-search input::placeholder { color: var(--muted-foreground); }
        .site-search__idle {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding: 0 12px;
          pointer-events: none;
          overflow: hidden;
          white-space: nowrap;
          font-size: 0.8125rem;
          font-family: var(--font-body);
        }
        .site-search__idle-text {
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: calc(100% - 10px);
        }
        .site-search__idle-prefix {
          color: var(--primary);
          font-weight: 500;
        }
        .site-search__idle-body {
          color: color-mix(in srgb, var(--muted-foreground) 58%, transparent);
        }
        .site-search__caret {
          flex: 0 0 auto;
          width: 1.5px;
          height: 0.9em;
          margin-left: 1px;
          background: color-mix(in srgb, var(--muted-foreground) 50%, transparent);
          opacity: 0;
          border-radius: 1px;
        }
        .site-search__caret.is-on { opacity: 0.55; }
        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); border: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .site-search__idle { display: none; }
          .site-search__shell--idle input {
            width: 148px;
            color: var(--foreground);
            border-color: var(--border);
          }
        }
      `}</style>
    </form>
  );
}
