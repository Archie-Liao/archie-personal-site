/**
 * 复古装饰系统 — 统一描线风格的植物 / 蝴蝶线描，克制使用。
 * 用法：
 *  <VintageDivider />            section 分隔（叶饰居中）
 *  <CornerSprig />               角落植物点缀（绝对定位，低透明度）
 *  <ButterflyLine />            蝴蝶线描（accent，少量）
 * 真正的复古博物图（蝴蝶版画）后续可替换进对应插槽。
 */

/** 叶饰分隔线 */
export function VintageDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`vintage-divider ${className}`} role="separator" aria-hidden>
      <span className="vintage-divider__line" />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="vintage-divider__leaf">
        <path
          d="M12 3 C7 8 7 16 12 21 C17 16 17 8 12 3 Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M12 5.5 V18.5" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      </svg>
      <span className="vintage-divider__line" />
    </div>
  );
}

/** 角落植物枝叶点缀（绝对定位；用 className 控制 top/left 等位置） */
export function CornerSprig({
  className = "",
  flip = false,
  size = 120,
}: {
  className?: string;
  flip?: boolean;
  size?: number;
}) {
  return (
    <svg
      className={`corner-sprig ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
        {/* 主枝 */}
        <path d="M8 112 C 36 96, 56 74, 72 44 C 80 28, 88 16, 96 8" />
        {/* 叶片（沿枝分布） */}
        <path d="M64 56 C 72 50, 82 50, 88 56 C 80 62, 70 62, 64 56 Z" strokeWidth="1" />
        <path d="M54 72 C 60 64, 70 62, 78 66 C 70 74, 60 76, 54 72 Z" strokeWidth="1" />
        <path d="M40 88 C 46 80, 56 78, 64 82 C 56 90, 46 92, 40 88 Z" strokeWidth="1" />
        <path d="M78 40 C 82 32, 90 28, 98 30 C 94 38, 86 42, 78 40 Z" strokeWidth="1" />
        {/* 小浆果点缀 */}
        <circle cx="92" cy="16" r="2" fill="currentColor" stroke="none" opacity="0.7" />
        <circle cx="100" cy="22" r="1.6" fill="currentColor" stroke="none" opacity="0.6" />
      </g>
    </svg>
  );
}

/** 蝴蝶线描（左半绘制 + 镜像，保证对称） */
export function ButterflyLine({
  className = "",
  width = 72,
  color = "currentColor",
}: {
  className?: string;
  width?: number;
  color?: string;
}) {
  const half = (
    <>
      <path d="M0 -10 C -14 -26 -34 -20 -30 -6 C -28 2 -10 0 0 -6" />
      <path d="M0 -4 C -10 6 -26 8 -24 18 C -22 26 -8 16 0 8" />
    </>
  );
  return (
    <svg
      className={className}
      width={width}
      viewBox="-36 -28 72 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g stroke={color} strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" fill="none">
        {/* 身体 + 触角 */}
        <line x1="0" y1="-18" x2="0" y2="20" />
        <path d="M0 -16 C -3 -22 -7 -24 -10 -24" />
        <path d="M0 -16 C 3 -22 7 -24 10 -24" />
        {/* 左翅 */}
        <g>{half}</g>
        {/* 右翅（镜像） */}
        <g transform="scale(-1,1)">{half}</g>
      </g>
    </svg>
  );
}
