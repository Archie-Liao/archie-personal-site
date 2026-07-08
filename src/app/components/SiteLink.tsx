import { Link, type LinkProps } from "react-router";

/** 站内跳转 · 新标签（顶栏 / Logo 请继续用 react-router Link） */
export function SiteLink({ to, target = "_blank", rel = "noopener noreferrer", ...props }: LinkProps) {
  return <Link to={to} target={target} rel={rel} {...props} />;
}
