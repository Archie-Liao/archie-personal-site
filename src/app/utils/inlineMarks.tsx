import { Fragment, type ReactNode } from "react";

/** 支持 `**加粗**` 轻标记；无 HTML 注入 */
export function renderInlineMarks(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={i} className="inline-mark--strong">
          {bold[1]}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
