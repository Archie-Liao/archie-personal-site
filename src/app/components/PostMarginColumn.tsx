import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { SiteLink } from "./SiteLink";
import { getRelatedPost, type ContentItem } from "../data/posts";

interface PostMarginColumnProps {
  post: ContentItem;
}

/** 滚轮时边注略滞后于主栏，再柔和回位 */
function useMarginScrollDrag(floatRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 900px)").matches;
    if (reduced || narrow) return;

    let lag = 0;
    let lastScrollY = window.scrollY;
    let raf = 0;
    let ticking = false;

    const apply = () => {
      const el = floatRef.current;
      if (el) {
        el.style.transform = Math.abs(lag) > 0.08 ? `translate3d(0, ${lag}px, 0)` : "";
      }
    };

    const step = () => {
      lag *= 0.86;
      apply();
      if (Math.abs(lag) > 0.08) {
        raf = requestAnimationFrame(step);
      } else {
        lag = 0;
        apply();
        ticking = false;
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY;
      lastScrollY = y;

      lag += dy * 0.2;
      lag = Math.max(-32, Math.min(32, lag));
      apply();

      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(step);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [floatRef]);
}

/**
 * 主栏与边栏之间的装饰区隔（与边栏同高 · 1px 单轨 + 中心菱形）
 */
export function PostDetailGutter() {
  return (
    <div className="post-detail-gutter" aria-hidden="true">
      <div className="post-detail-gutter__rail">
        <span className="post-detail-gutter__ornament" />
      </div>
    </div>
  );
}

/**
 * A3-M · 右侧整列边注。
 * sticky 视口旁 + 滚轮拖拽延迟回弹；窄屏折叠主栏下。
 */
export function PostMarginColumn({ post }: PostMarginColumnProps) {
  const floatRef = useRef<HTMLDivElement>(null);
  useMarginScrollDrag(floatRef);

  const tags = post.tags ?? [];
  const typeLabel =
    post.type === "video" ? "视频日记" : post.type === "link" ? "外链收藏" : "笔记";
  const relatedPost = getRelatedPost(post.id);

  let revealIndex = 0;

  return (
    <aside className="post-margin-column" aria-label="边注与拓展">
      <div ref={floatRef} className="post-margin-column__float">
        {post.episode != null && (
          <div className="post-margin__folio" aria-hidden="true">
            <span className="post-margin__folio-num">{post.episode}</span>
            <span className="post-margin__folio-lab">Day</span>
          </div>
        )}

        <MarginNote revealIndex={revealIndex++} index={1} label="Side-note">
          <p>
            {typeLabel} · {post.date.replace(/-/g, ".")}
            {post.views != null && (
              <>
                <br />
                <span className="post-margin__muted">示意阅读 {post.views.toLocaleString()}</span>
              </>
            )}
          </p>
        </MarginNote>

        {tags.length > 0 && (
          <MarginNote revealIndex={revealIndex++} index={2} label="Tags">
            <p className="post-margin__tags">
              {tags.map((t, i) => (
                <span key={t}>
                  {i > 0 && " · "}
                  <span className={i % 2 === 0 ? "post-margin__tag--warm" : "post-margin__tag--cool"}>
                    {t}
                  </span>
                </span>
              ))}
            </p>
          </MarginNote>
        )}

        {post.knowledgeCards[0] && (
          <MarginNote revealIndex={revealIndex++} index={3} label="Principle">
            <p className="post-margin__quote">「{post.knowledgeCards[0].back.slice(0, 72)}…」</p>
            <span className="post-margin__cite">{post.knowledgeCards[0].front}</span>
          </MarginNote>
        )}

        <MarginNote revealIndex={revealIndex++} index={4} label="Excerpt">
          <p className="post-margin__quote">「{truncateQuote(post.aiSummary.quote, 56)}」</p>
        </MarginNote>

        {relatedPost && (
          <MarginNote revealIndex={revealIndex++} index={5} label="Related">
            <SiteLink to={`/post/${relatedPost.id}`} className="post-margin__related">
              <span className="post-margin__related-kicker">同标签共现</span>
              <span className="post-margin__related-title">{relatedPost.title}</span>
              <span className="post-margin__related-meta">
                Day {relatedPost.episode} · {relatedPost.date.replace(/-/g, ".")}
              </span>
            </SiteLink>
          </MarginNote>
        )}
      </div>
    </aside>
  );
}

function MarginNote({
  index,
  label,
  revealIndex,
  children,
}: {
  index: number;
  label: string;
  revealIndex: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -2% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="post-margin__note"
      style={{ ["--reveal-delay" as string]: `${revealIndex * 110}ms` }}
    >
      <span className="post-margin__num">
        Note {index} · {label}
      </span>
      {children}
    </div>
  );
}

function truncateQuote(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
}
