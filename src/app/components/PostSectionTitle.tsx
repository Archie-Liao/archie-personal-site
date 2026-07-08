export function PostSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="post-section-title">
      <span className="post-section-title__bar" aria-hidden />
      {children}
    </h2>
  );
}
