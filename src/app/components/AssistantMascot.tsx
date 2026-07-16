/** P3 尖兵 · 吉祥物：头像图 + 全身图分开 */

export type MascotPose = "idle" | "jumping" | "perched";

const MASCOT_FACE_SRC = "/assets/img/assistant-mascot-face.png";
const MASCOT_BODY_SRC = "/assets/img/assistant-mascot.png";

type FaceProps = {
  className?: string;
  title?: string;
};

/** 圆位 stamp：特写头像 */
export function AssistantMascotFace({ className, title = "助手吉祥物" }: FaceProps) {
  return (
    <img
      className={["assistant-mascot__face", className].filter(Boolean).join(" ")}
      src={MASCOT_FACE_SRC}
      alt={title}
      draggable={false}
    />
  );
}

type BodyProps = {
  pose: MascotPose;
  className?: string;
};

/** 全身：坐钮 / 跳 / 停抽屉顶 */
export function AssistantMascot({ pose, className }: BodyProps) {
  return (
    <div
      className={["assistant-mascot", className].filter(Boolean).join(" ")}
      data-pose={pose}
      aria-hidden
    >
      <img
        className="assistant-mascot__img"
        src={MASCOT_BODY_SRC}
        alt=""
        draggable={false}
      />
    </div>
  );
}
