/** 站内路径在新标签打开（顶栏 / Logo 除外，仍用同页 Link） */
export function openSitePath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = `${window.location.origin}${normalized}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
