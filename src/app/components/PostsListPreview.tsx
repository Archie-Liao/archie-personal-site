import { SiteLink } from "./SiteLink";
import type { ContentItem } from "../data/posts";
import { getRelatedPost } from "../data/posts";
import { TagOrbField } from "./TagOrbField";
import { getPreviewExtendedParagraphs } from "../utils/postsPreviewExtended";
import { formatPostPreviewVol } from "../utils/postPlatform";

/** A2-C · D2 spread 预览 + 圆形 tag 球场（冷暖 · 叠压 · 各向漂移） */
export function PostsListPreview({ post }: { post: ContentItem | null }) {
  if (!post) {
    return (
      <div className="posts-preview posts-preview--empty">
        <p>从左侧索引选一期日记，预览将出现在这里。</p>
      </div>
    );
  }

  const tags = post.tags ?? [];
  const typeLabel = post.type === "video" ? "视频日记" : post.type === "link" ? "外链收藏" : "笔记";
  const relatedPost = getRelatedPost(post.id);
  const extendedParas = getPreviewExtendedParagraphs(post);

  return (
    <div className="posts-preview">
      <TagOrbField>
      <div className="posts-preview__content">
        <header className="posts-preview__head posts-preview__layer">
          <p className="posts-preview__vol">
            VOL.{post.date.replace(/-/g, ".")} · {formatPostPreviewVol(post)}
          </p>
          <span className="posts-preview__type">{typeLabel}</span>
          <h2 className="posts-preview__title">{post.title}</h2>
          <p className="posts-preview__tags">{tags.join(" · ")}</p>
        </header>

        <div className="posts-preview__cols posts-preview__layer posts-preview__layer--float">
          <p className="posts-preview__lead">{post.aiSummary.overview}</p>
          {post.aiSummary.keyPoints.length > 0 && (
            <ul className="posts-preview__points">
              {post.aiSummary.keyPoints.slice(0, 4).map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          )}
        </div>

        <aside className="posts-preview__snippet posts-preview__layer posts-preview__layer--front">
          <h3 className="posts-preview__snippet-label">摘录</h3>
          <p>「{post.aiSummary.quote}」</p>
        </aside>

        {extendedParas.length > 0 && (
          <div className="posts-preview__extended posts-preview__layer posts-preview__layer--front">
            <h3 className="posts-preview__extended-label">阅读延展</h3>
            {extendedParas.map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>
        )}

        <div className="posts-preview__actions posts-preview__layer posts-preview__layer--front">
          <SiteLink to={`/post/${post.id}`} className="posts-preview__cta">
            阅读全文 →
          </SiteLink>
          {relatedPost && (
            <SiteLink to={`/post/${relatedPost.id}`} className="posts-preview__related-link">
              同标签 · {relatedPost.title.length > 18 ? `${relatedPost.title.slice(0, 18)}…` : relatedPost.title}
            </SiteLink>
          )}
        </div>
      </div>
      </TagOrbField>

      <style>{`
        .posts-preview {
          position: relative;
          min-height: 100%;
          overflow: visible;
          background: var(--background);
          border-left: 0;
        }
        .tag-orb-scene {
          min-height: 100%;
        }
        .posts-preview--empty {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 20rem;
          padding: 3rem;
          color: var(--muted-foreground);
          font-family: var(--font-serif);
          font-size: 1.05rem;
        }
        .posts-preview__content {
          position: relative;
          z-index: 1;
          min-height: 100%;
          padding: clamp(2.25rem, 4vw, 3.5rem) clamp(1.75rem, 4vw, 4rem);
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          isolation: isolate;
          pointer-events: none;
        }
        .posts-preview__head,
        .posts-preview__cols,
        .posts-preview__snippet,
        .posts-preview__actions,
        .posts-preview__content a,
        .posts-preview__content button:not(.tag-orb-field__orb) {
          pointer-events: auto;
        }
        .posts-preview__layer {
          position: relative;
        }
        .posts-preview__layer--float {
          z-index: 2;
        }
        .posts-preview__layer--front {
          z-index: 5;
        }
        .posts-preview__head {
          max-width: min(32rem, 100%);
          padding: 1.25rem 0 0;
          z-index: 4;
        }
        .posts-preview__vol {
          margin: 0;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--primary-deep, var(--terracotta));
        }
        .posts-preview__type {
          display: inline-block;
          margin-top: 0.65rem;
          padding: 3px 10px;
          font-size: 0.625rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 1px solid var(--border);
          color: var(--muted-foreground);
          background: color-mix(in srgb, var(--card) 92%, transparent);
          backdrop-filter: blur(4px);
        }
        .posts-preview__title {
          margin: 1rem 0 0.75rem;
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: clamp(1.85rem, 3.8vw, 2.75rem);
          line-height: 1.34;
          letter-spacing: 0.01em;
          text-wrap: balance;
          text-shadow: 0 1px 0 color-mix(in srgb, var(--background) 80%, transparent);
        }
        .posts-preview__tags {
          margin: 0;
          font-size: 0.6875rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--primary);
        }
        .posts-preview__cols {
          column-count: 2;
          column-gap: 2.5rem;
          column-rule: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
          padding: 1.35rem 1.5rem;
          margin-top: -0.5rem;
          background: color-mix(in srgb, var(--card) 82%, transparent);
          backdrop-filter: blur(10px);
          border: 1px solid color-mix(in srgb, var(--border) 65%, transparent);
          box-shadow: 0 12px 40px -24px rgba(40, 32, 24, 0.22);
        }
        @media (max-width: 720px) {
          .posts-preview__cols {
            column-count: 1;
          }
        }
        .posts-preview__lead {
          margin: 0 0 1em;
          font-family: var(--font-serif);
          font-size: 1rem;
          line-height: 1.82;
          color: var(--foreground);
          break-inside: avoid;
        }
        .posts-preview__points {
          margin: 0;
          padding-left: 1.1rem;
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--muted-foreground);
          break-inside: avoid;
        }
        .posts-preview__points li {
          margin-bottom: 0.35rem;
        }
        .posts-preview__snippet {
          margin-top: auto;
          padding: 1.35rem 1.5rem;
          background: color-mix(in srgb, var(--secondary) 92%, var(--card));
          border-left: 4px solid var(--primary);
          box-shadow: 0 8px 32px -16px rgba(40, 32, 24, 0.18);
        }
        .posts-preview__snippet-label {
          margin: 0 0 0.5rem;
          font-size: 0.625rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--primary-deep, var(--terracotta));
        }
        .posts-preview__snippet p {
          margin: 0;
          font-family: var(--font-serif);
          font-size: 1.05rem;
          line-height: 1.7;
          font-style: italic;
          color: var(--foreground);
        }
        .posts-preview__extended {
          padding: 1.25rem 1.5rem 1.5rem;
          background: color-mix(in srgb, var(--card) 88%, var(--background));
          border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
        }
        .posts-preview__extended-label {
          margin: 0 0 0.75rem;
          font-family: var(--font-cond, var(--font-body));
          font-size: 0.625rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        .posts-preview__extended p {
          margin: 0 0 1rem;
          font-family: var(--font-serif);
          font-size: 0.9375rem;
          line-height: 1.82;
          color: color-mix(in srgb, var(--foreground) 92%, var(--muted-foreground));
        }
        .posts-preview__extended p:last-child {
          margin-bottom: 0;
        }
        .posts-preview__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          align-items: center;
          padding-top: 0.5rem;
        }
        .posts-preview__cta {
          display: inline-block;
          padding: 0.7rem 1.35rem;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-decoration: none;
          color: var(--primary-foreground);
          background: var(--primary);
          border: 1px solid var(--primary);
        }
        .posts-preview__related-link {
          font-size: 0.8125rem;
          color: var(--muted-foreground);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          max-width: min(20rem, 100%);
        }
        .posts-preview__related-link:hover {
          color: var(--primary);
          border-color: var(--primary);
        }
      `}</style>
    </div>
  );
}
