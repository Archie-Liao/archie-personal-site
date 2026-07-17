import { useParams } from "react-router";
import { SiteLink } from "../components/SiteLink";
import { getPostById } from "../data/posts";
import { VideoPlayer } from "../components/VideoPlayer";
import { SubtitleViewer } from "../components/SubtitleViewer";
import { PostDetailGutter, PostMarginColumn } from "../components/PostMarginColumn";
import { PostMindmap } from "../components/PostMindmap";
import { PostSectionTitle } from "../components/PostSectionTitle";
import { getPostPlatformLabel } from "../utils/postPlatform";
import { renderInlineMarks } from "../utils/inlineMarks";

export function PostPage() {
  const { id } = useParams<{ id: string }>();
  const post = getPostById(id ?? "");

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p style={{ color: "var(--muted-foreground)" }}>找不到这篇内容</p>
        <SiteLink to="/posts" className="mt-4 inline-block text-sm" style={{ color: "var(--primary)" }}>
          ← 返回列表
        </SiteLink>
      </div>
    );
  }

  const tags = post.tags ?? [];
  const hasAux = post.knowledgeCards.length > 0;
  const typeLabel =
    post.type === "video" ? "视频日记" : post.type === "link" ? "外链收藏" : "笔记";
  const heroOver =
    post.episode != null ? `Day ${post.episode} · ${post.date}` : `${typeLabel} · ${post.date}`;
  const platformLabel = getPostPlatformLabel(post);

  return (
    <div className="post-page">
      <div className="post-shell">
        <article className="post-main">
          <SiteLink to="/posts" className="post-back">
            ← 返回日记列表
          </SiteLink>

          <header className="post-hero post-hero--spread">
            <div className="post-hero__spread">
              {post.episode != null ? (
                <span className="post-hero__folio" aria-hidden="true">
                  {post.episode}
                </span>
              ) : platformLabel ? (
                <span className="post-hero__folio post-hero__folio--platform" aria-label={`来自 ${platformLabel}`}>
                  <span className="post-hero__folio-from">来自</span>
                  <span className="post-hero__folio-platform">{platformLabel}</span>
                </span>
              ) : null}
              <div className="post-hero__text">
                <span className="post-hero__over">{heroOver}</span>
                <h1 className="post-hero__title">{post.title}</h1>
                <p className="post-hero__tagline">{tags.join(" · ")}</p>
              </div>
            </div>
          </header>

          <section className="post-section post-section--summary">
            <PostSectionTitle>AI 总结</PostSectionTitle>

            <div className="post-summary">
              {(() => {
                const paras = post.aiSummary.overview.split(/\n\n+/).filter(Boolean);
                const [lead, ...rest] = paras;
                return (
                  <>
                    {lead && (
                      <div className="post-summary__hero">
                        <p className="post-summary__eyebrow">导读</p>
                        <p className="post-summary__lead">{renderInlineMarks(lead)}</p>
                      </div>
                    )}
                    {rest.length > 0 && (
                      <div className="post-summary__body">
                        {rest.map((para, i) => (
                          <p key={i} className="post-summary__para">
                            {renderInlineMarks(para)}
                          </p>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}

              {post.aiSummary.keyPoints.length > 0 && (
                <div className="post-summary__points-wrap">
                  <p className="post-summary__eyebrow">要点</p>
                  <ol className="post-summary__points">
                    {post.aiSummary.keyPoints.map((point, i) => (
                      <li key={i}>
                        <span className="post-summary__num" aria-hidden>
                          {i + 1}
                        </span>
                        <span>{renderInlineMarks(point)}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {post.aiSummary.quote && !/待补/.test(post.aiSummary.quote) && (
                <blockquote className="post-summary__quote">「{post.aiSummary.quote}」</blockquote>
              )}

              {hasAux && (
                <div className="post-summary__aux">
                  <div className="post-summary__keywords" aria-label="关键词">
                    <span className="post-summary__label">关键词</span>
                    <div className="post-summary__keywords-row">
                      {post.knowledgeCards.map((card) => (
                        <span key={card.id} className="post-summary__kw" title={card.front}>
                          {card.front.split(/[\s·]/)[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="post-summary__checks" aria-label="可落地检查">
                    <span className="post-summary__label">可落地检查</span>
                    <ul className="post-summary__check-list">
                      {post.knowledgeCards.map((card) => (
                        <li key={card.id} className="post-summary__check-item">
                          <strong className="post-summary__check-kw">{card.front}</strong>
                          <span className="post-summary__check-rule">{toCheckRule(card.back)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="post-section">
            <PostSectionTitle>思维导图</PostSectionTitle>
            <PostMindmap post={post} />
          </section>

          <section className="post-section">
            <PostSectionTitle>{post.bvid ? "视频" : "原文"}</PostSectionTitle>
            {post.bvid ? (
              <VideoPlayer post={post} />
            ) : post.sourceUrl ? (
              <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="post-link-card">
                <span className="post-link-card__label">{post.sourceName ?? "阅读原文"}</span>
                <p className="post-link-card__url">{post.sourceUrl}</p>
              </a>
            ) : null}
          </section>

          {post.archiveNotes && post.archiveNotes.length > 0 && (
            <section className="post-section post-section--archive">
              <PostSectionTitle>归档摘抄</PostSectionTitle>
              <div className="post-archive">
                {post.archiveNotes.map((note, i) => (
                  <p key={i} className="post-archive__para">
                    {note}
                  </p>
                ))}
              </div>
            </section>
          )}

          {post.subtitlePath && (
            <section className="post-section">
              <PostSectionTitle>完整字幕</PostSectionTitle>
              <SubtitleViewer path={post.subtitlePath} />
            </section>
          )}
        </article>

        <aside className="post-detail-aside" aria-label="边注">
          <PostDetailGutter />
          <PostMarginColumn key={post.id} post={post} />
        </aside>
      </div>
    </div>
  );
}

function toCheckRule(back: string): string {
  const first = back.split(/[。！？.!?]/)[0]?.trim();
  if (!first) return back;
  return first.endsWith("。") || first.endsWith(".") ? first : `${first}。`;
}
