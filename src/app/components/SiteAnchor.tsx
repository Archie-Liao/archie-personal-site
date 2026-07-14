import type { AnchorHTMLAttributes, MouseEvent } from "react";

type SiteAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

function scrollToHash(hash: string) {
  if (hash === "#top" || hash === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const id = hash.slice(1);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** 外链 · 新标签；页内锚点 · 同页平滑滚动 */
export function SiteAnchor({
  href = "",
  target = "_blank",
  rel = "noopener noreferrer",
  onClick,
  ...props
}: SiteAnchorProps) {
  const isHash = href.startsWith("#");

  const resolved =
    isHash && typeof window !== "undefined"
      ? `${window.location.pathname}${window.location.search}${href}`
      : href;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isHash) {
      e.preventDefault();
      scrollToHash(href);
    }
    onClick?.(e);
  };

  if (isHash) {
    return <a href={resolved} onClick={handleClick} {...props} />;
  }

  return <a href={resolved} target={target} rel={rel} onClick={onClick} {...props} />;
}
