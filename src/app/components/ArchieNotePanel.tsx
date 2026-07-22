import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ArchieMindmapCanvas } from "./ArchieMindmapCanvas";
import type { ArchieNoteBlock, ArchieNoteDoc } from "../types/archieNote";
import { emptyMindmapBlock, emptyProseBlock } from "../types/archieNote";
import {
  clearArchieNoteGate,
  downloadJson,
  exportArchieNotes,
  fetchArchieNote,
  getArchieNoteGate,
  loginArchieNote,
  saveArchieNote,
} from "../utils/archieNoteApi";
import "../../styles/archie-note.css";

type Props = {
  postId: string;
};

const EMPTY_HINT =
  "本篇旁注待 Archie 亲笔——评书、灵感、闲话皆可；思维导图只是可选形式之一，不是必填。";

export function ArchieNotePanel({ postId }: Props) {
  const [doc, setDoc] = useState<ArchieNoteDoc>({
    postId,
    blocks: [],
    updatedAt: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authed, setAuthed] = useState(() => Boolean(getArchieNoteGate()));
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ArchieNoteBlock[]>([]);
  const [busy, setBusy] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [gateInput, setGateInput] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await fetchArchieNote(postId);
      setDoc(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "加载失败");
      setDoc({ postId, blocks: [], updatedAt: null });
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    void reload();
    setEditing(false);
    setAuthed(Boolean(getArchieNoteGate()));
    setLoginOpen(false);
    setGateInput("");
  }, [reload]);

  const submitLogin = async () => {
    const trimmed = gateInput.trim();
    if (!trimmed) {
      setError("请输入作者口令");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await loginArchieNote(trimmed);
      setAuthed(true);
      setLoginOpen(false);
      setGateInput("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "登录失败");
    } finally {
      setBusy(false);
    }
  };

  const onLogout = () => {
    clearArchieNoteGate();
    setAuthed(false);
    setEditing(false);
  };

  const startEdit = () => {
    setDraft(doc.blocks.length ? structuredClone(doc.blocks) : []);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft([]);
  };

  const onSave = async () => {
    setBusy(true);
    setError(null);
    try {
      const saved = await saveArchieNote(postId, draft);
      setDoc(saved);
      setEditing(false);
      setDraft([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "保存失败");
    } finally {
      setBusy(false);
    }
  };

  const onExportThis = async () => {
    setBusy(true);
    setError(null);
    try {
      downloadJson(`archie-note-${postId}.json`, {
        postId: doc.postId,
        blocks: doc.blocks,
        updatedAt: doc.updatedAt,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "导出失败");
    } finally {
      setBusy(false);
    }
  };

  const onExportAll = async () => {
    setBusy(true);
    setError(null);
    try {
      const payload = await exportArchieNotes();
      const day = new Date().toISOString().slice(0, 10);
      downloadJson(`archie-notes-export-${day}.json`, payload);
    } catch (e) {
      setError(e instanceof Error ? e.message : "导出失败");
    } finally {
      setBusy(false);
    }
  };

  const updateBlock = (id: string, next: ArchieNoteBlock) => {
    setDraft((prev) => prev.map((b) => (b.id === id ? next : b)));
  };

  const removeBlock = (id: string) => {
    setDraft((prev) => prev.filter((b) => b.id !== id));
  };

  const blocks = editing ? draft : doc.blocks;
  const empty = !loading && blocks.length === 0;

  const authActions: ReactNode = authed ? (
    editing ? (
      <>
        <button
          type="button"
          className="archie-note__btn archie-note__btn--primary"
          disabled={busy}
          onClick={() => void onSave()}
        >
          保存
        </button>
        <button
          type="button"
          className="archie-note__btn"
          disabled={busy}
          onClick={cancelEdit}
        >
          取消
        </button>
      </>
    ) : (
      <>
        <button
          type="button"
          className="archie-note__btn archie-note__btn--primary"
          disabled={busy || loading}
          onClick={startEdit}
        >
          编辑
        </button>
        <button
          type="button"
          className="archie-note__btn"
          disabled={busy}
          onClick={() => void onExportThis()}
        >
          导出本篇
        </button>
        <button
          type="button"
          className="archie-note__btn"
          disabled={busy}
          onClick={() => void onExportAll()}
        >
          导出全部
        </button>
        <button
          type="button"
          className="archie-note__btn"
          disabled={busy}
          onClick={onLogout}
        >
          退出登录
        </button>
      </>
    )
  ) : (
    <button
      type="button"
      className="archie-note__btn archie-note__btn--primary"
      disabled={busy}
      onClick={() => {
        setLoginOpen(true);
        setError(null);
      }}
    >
      作者登录
    </button>
  );

  return (
    <div className="archie-note">
      <div className="archie-note__title-row">
        <h2 className="post-section-title">
          <span className="post-section-title__bar" aria-hidden />
          亲笔旁注
        </h2>
        <div className="archie-note__bar-right">{authActions}</div>
      </div>

      {loginOpen && !authed && (
        <form
          className="archie-note__login"
          onSubmit={(e) => {
            e.preventDefault();
            void submitLogin();
          }}
        >
          <label className="archie-note__login-label" htmlFor="archie-note-gate">
            作者口令
          </label>
          <input
            id="archie-note-gate"
            className="archie-note__login-input"
            type="password"
            autoComplete="current-password"
            value={gateInput}
            onChange={(e) => setGateInput(e.target.value)}
            placeholder="输入口令后回车或点确认"
            disabled={busy}
            autoFocus
          />
          <button
            type="submit"
            className="archie-note__btn archie-note__btn--primary"
            disabled={busy}
          >
            确认
          </button>
          <button
            type="button"
            className="archie-note__btn"
            disabled={busy}
            onClick={() => {
              setLoginOpen(false);
              setGateInput("");
            }}
          >
            取消
          </button>
        </form>
      )}

      <div className="archie-note__bar">
        <div className="archie-note__bar-left">
          {doc.updatedAt && !editing && (
            <span className="archie-note__meta">
              云端更新 {formatTime(doc.updatedAt)}
            </span>
          )}
          {editing && <span className="archie-note__meta">编辑中</span>}
        </div>
      </div>

      {error && (
        <p className="archie-note__error" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p className="archie-note__empty">加载旁注…</p>
      ) : empty && !editing ? (
        <p className="archie-note__empty">{EMPTY_HINT}</p>
      ) : (
        <div className="archie-note__blocks">
          {blocks.map((block) => (
            <div key={block.id} className="archie-note__block" data-type={block.type}>
              {editing && (
                <div className="archie-note__block-head">
                  <span className="archie-note__badge">
                    {block.type === "prose" ? "段落" : "导图"}
                  </span>
                  <button
                    type="button"
                    className="archie-note__btn archie-note__btn--ghost"
                    onClick={() => removeBlock(block.id)}
                  >
                    删除块
                  </button>
                </div>
              )}
              {!editing && block.type === "mindmap" && (
                <span className="archie-note__badge">导图</span>
              )}
              {block.type === "prose" ? (
                editing ? (
                  <textarea
                    className="archie-note__textarea"
                    value={block.text}
                    onChange={(e) =>
                      updateBlock(block.id, { ...block, text: e.target.value })
                    }
                    rows={5}
                  />
                ) : (
                  <div className="archie-note__prose">
                    {block.text.split(/\n+/).filter(Boolean).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )
              ) : (
                <ArchieMindmapCanvas
                  block={block}
                  editable={editing}
                  onChange={(next) => updateBlock(block.id, next)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="archie-note__add">
          <button
            type="button"
            className="archie-note__btn"
            onClick={() => setDraft((prev) => [...prev, emptyProseBlock()])}
          >
            + 段落
          </button>
          <button
            type="button"
            className="archie-note__btn"
            onClick={() => setDraft((prev) => [...prev, emptyMindmapBlock()])}
          >
            + 导图
          </button>
        </div>
      )}
    </div>
  );
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString("zh-CN", { hour12: false });
  } catch {
    return iso;
  }
}
