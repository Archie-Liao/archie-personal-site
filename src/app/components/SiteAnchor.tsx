import type { AnchorHTMLAttributes } from "react";

type SiteAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

/** 外链 + 页内锚点 · 新标签 */
export function SiteAnchor({ href = "", target = "_blank", rel = "noopener noreferrer", ...props }: SiteAnchorProps) {
  const resolved =
    href.startsWith("#") && typeof window !== "undefined"
      ? `${window.location.pathname}${window.location.search}${href}`
      : href;

  return <a href={resolved} target={target} rel={rel} {...props} />;
}
