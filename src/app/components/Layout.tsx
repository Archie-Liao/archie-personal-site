import { Link, useLocation } from "react-router";
import { useEffect } from "react";
import { siteConfig } from "../site.config";
import { trackPageView, addDwellSeconds } from "../utils/analytics";
import { SiteLogo } from "./SiteLogo";
import { VintageDivider } from "./Decorations";

const navLinks = [
  { href: "/graph", label: "知识图谱" },
  { href: "/posts", label: "日记", tooltip: "点我点我～" },
  { href: "/feedback", label: "反馈" },
  { href: "/about", label: "关于我" },
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
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: "var(--font-body)", background: "var(--background)", color: "var(--foreground)" }}
    >
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "color-mix(in srgb, var(--background) 92%, transparent)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="logo-breathe inline-flex"
            style={{ textDecoration: "none" }}
          >
            <SiteLogo variant="nav" />
          </Link>

          <nav className="flex items-center">
            {navLinks.map((link) => {
              const active = location.pathname === link.href || location.pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  title={link.tooltip}
                  className={`nav-link${active ? " nav-link--active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="py-10 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <VintageDivider className="mb-8" />
        </div>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {siteConfig.nameZh} · {siteConfig.tagline}
          </span>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href={siteConfig.links.bilibili} target="_blank" rel="noopener noreferrer" className="footer-link">
              B站
            </a>
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="footer-link">
              GitHub
            </a>
            <a href={siteConfig.links.xiaohongshu} target="_blank" rel="noopener noreferrer" className="footer-link">
              小红书
            </a>
          </div>
          <p className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>
            © {new Date().getFullYear()} Archie
          </p>
        </div>
      </footer>

      <style>{`
        .nav-link {
          position: relative;
          margin: 0 10px;
          padding: 6px 2px;
          font-size: 0.9375rem;
          color: var(--muted-foreground);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--foreground); }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 1.5px;
          background: var(--primary);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease;
        }
        .nav-link:hover::after { transform: scaleX(0.5); }
        .nav-link--active { color: var(--primary); }
        .nav-link--active::after { transform: scaleX(1); }
        .footer-link {
          color: var(--muted-foreground);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--primary); }
      `}</style>
    </div>
  );
}
