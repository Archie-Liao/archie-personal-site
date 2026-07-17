import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import type { DailyQuote } from "../utils/dailyQuote";

type Phase = "enter" | "exit";

type Props = {
  quote: DailyQuote;
  phase: Phase;
  onRequestClose: () => void;
  onExitDone: () => void;
};

/** /posts 导语卡点击：居中弹出金句（同源 quotes.json） */
export function PostsQuotePop({ quote, phase, onRequestClose, onExitDone }: Props) {
  const titleId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onRequestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onRequestClose]);

  const quoteText = `「${quote.text}」`;

  return createPortal(
    <div
      className="posts-quote-pop"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onRequestClose}
    >
      <div
        className="posts-quote-pop__card"
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          if (phase === "exit") onExitDone();
        }}
      >
        <p className="posts-quote-pop__lab">Cover Story</p>
        <p id={titleId} className="posts-quote-pop__msg">
          {quoteText}
        </p>
        {quote.postTitle ? (
          <p className="posts-quote-pop__src">{quote.postTitle}</p>
        ) : null}
        <button type="button" className="posts-quote-pop__close" onClick={onRequestClose}>
          关闭
        </button>
      </div>
    </div>,
    document.body
  );
}
