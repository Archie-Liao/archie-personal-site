import { Link, useLocation } from "react-router";
import { useEffect } from "react";
import { trackPageView, addDwellSeconds } from "../utils/analytics";
import { SiteLogo } from "./SiteLogo";
import { SiteSearch } from "./SiteSearch";
import { SiteFooter } from "./SiteFooter";

const navLinks = [
  { href: "/graph", label: "知识图谱", motion: "graph" as const },
  { href: "/posts", label: "日记", tooltip: "点我点我～", motion: "diary" as const },
  { href: "/feedback", label: "反馈", motion: "feedback" as const },
  { href: "/about", label: "关于我", motion: "default" as const },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
    const start = Date.now();
    return () => {
      const seconds = Math.round((Date.now() - start) / 1000);
      if (seconds > 0) addDwellSeconds(seconds);
    };
  }, [location.pathname]);

  return (
    <div id="top" className="min-h-screen flex flex-col"
      style={{ fontFamily: "var(--font-body)", background: "var(--background)", color: "var(--foreground)" }}
    >
      <header
        className="sticky top-0 z-50 border-b site-header"
        role="banner"
        aria-label="站点顶栏"
        style={{
          background: "color-mix(in srgb, var(--background) 92%, transparent)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-[5.25rem] flex items-center justify-between gap-4">
          <Link
            to="/"
            className="brand-link inline-flex items-center"
            style={{ textDecoration: "none" }}
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <SiteLogo variant="nav" />
          </Link>

          <div className="flex items-center gap-3 sm:gap-5 flex-1 justify-end">
            <SiteSearch className="hidden sm:block" />
            <nav className="flex items-center shrink-0" aria-label="主站导航">
              {navLinks.map((link) => {
                const active =
                  location.pathname === link.href || location.pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    title={link.tooltip}
                    className={`nav-link nav-link--${link.motion}${active ? " nav-link--active" : ""}`}
                  >
                    {link.label}
                    {link.tooltip && <span className="nav-tip">{link.tooltip}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />

      <style>{`
        .brand-link {
          transition: transform 0.14s var(--snap, ease);
        }
        .brand-link:hover {
          transform: translateY(-2px) rotate(-0.4deg);
        }
        .brand-link:active {
          transform: scale(0.98);
        }
        .nav-link {
          position: relative;
          margin: 0 8px;
          padding: 6px 2px;
          font-size: 0.9375rem;
          color: var(--muted-foreground);
          text-decoration: none;
        }
        .nav-link--diary {
          color: var(--punch, var(--primary));
          font-weight: 500;
        }
        .nav-tip {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%) scale(0.92);
          background: var(--foreground);
          color: var(--background);
          font-size: 10px;
          letter-spacing: 0.06em;
          padding: 4px 8px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.12s, transform 0.12s var(--snap, ease);
          border-radius: 2px;
        }
        .nav-link--diary:hover .nav-tip {
          opacity: 1;
          transform: translateX(-50%) scale(1);
        }
        .nav-link--graph::after {
          content: "";
          position: absolute;
          left: 0; bottom: 0;
          height: 2px; width: 0;
          background: var(--primary);
          transition: width 0.12s var(--snap, ease);
        }
        .nav-link--graph:hover::after,
        .nav-link--graph.nav-link--active::after { width: 100%; }
        .nav-link--feedback::before {
          content: "";
          position: absolute;
          inset: -4px -8px;
          background: color-mix(in srgb, var(--gold) 35%, transparent);
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
          z-index: -1;
          transition: transform 0.14s var(--snap, ease), opacity 0.14s;
        }
        .nav-link--feedback:hover::before {
          opacity: 1;
          transform: scaleX(1);
        }
        .nav-link--default::after,
        .nav-link--diary::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 1.5px;
          background: var(--primary);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease;
        }
        .nav-link--default:hover::after { transform: scaleX(0.5); }
        .nav-link--active { color: var(--primary); }
        .nav-link--active.nav-link--default::after,
        .nav-link--active.nav-link--diary::after { transform: scaleX(1); }
        .nav-link--diary:hover {
          animation: diaryPop 0.35s var(--snap, ease);
        }
        @keyframes diaryPop {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-3px); }
          70% { transform: translateY(1px); }
        }
      `}</style>
    </div>
  );
}
