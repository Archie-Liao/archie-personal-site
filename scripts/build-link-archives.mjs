/**
 * 把外链原文转成 archiveNotes JSON（一段一条），供 posts.ts import。
 * 运行：node scripts/build-link-archives.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "src", "app", "data", "archive");
fs.mkdirSync(outDir, { recursive: true });

function stripInlineMd(s) {
  return s
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1（$2）")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** Markdown → archiveNotes：#/## 作小标题，空行分段 */
function mdToNotes(md) {
  const notes = [];
  const blocks = md.replace(/\r\n/g, "\n").split(/\n{2,}/);
  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 1 && /^#{1,3}\s+/.test(lines[0])) {
      notes.push("## " + lines[0].replace(/^#{1,3}\s+/, "").trim());
      continue;
    }
    if (/^#{1,3}\s+/.test(lines[0]) && lines.length > 1) {
      notes.push("## " + lines[0].replace(/^#{1,3}\s+/, "").trim());
      const rest = stripInlineMd(lines.slice(1).join("\n"));
      if (rest) notes.push(rest);
      continue;
    }
    // 列表项：逐条
    if (lines.every((l) => /^[-*]\s+/.test(l) || /^\d+\.\s+/.test(l))) {
      for (const l of lines) {
        const t = stripInlineMd(l.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, (m) => m));
        if (t) notes.push(t);
      }
      continue;
    }
    const t = stripInlineMd(lines.join("\n"));
    if (t) notes.push(t);
  }
  return notes;
}

function writeJson(id, notes) {
  const p = path.join(outDir, `${id}.json`);
  fs.writeFileSync(p, JSON.stringify(notes, null, 2) + "\n", "utf8");
  console.log(id, notes.length, "notes →", path.relative(root, p));
  // 同步一份到 public 便于人眼核对
  const pub = path.join(root, "public", "assets", "archive", id);
  fs.mkdirSync(pub, { recursive: true });
  fs.writeFileSync(path.join(pub, "archive-notes.json"), JSON.stringify({ post_id: id, notes }, null, 2) + "\n", "utf8");
}

// ── 1. Karpathy Gist ──
{
  const md = fs.readFileSync(path.join(root, "public/assets/archive/link-llm-wiki/raw.md"), "utf8");
  writeJson("link-llm-wiki", mdToNotes(md));
}

// ── 2. Karpathy 推文 ──
{
  const fx = JSON.parse(fs.readFileSync(path.join(root, "public/assets/archive/link-karpathy-x/fx.json"), "utf8"));
  const text = fx.tweet.text.replace(/\r\n/g, "\n");
  fs.writeFileSync(path.join(root, "public/assets/archive/link-karpathy-x/tweet.txt"), text, "utf8");
  const notes = [];
  notes.push("## LLM Knowledge Bases");
  // 按双换行；单换行后若下一行像小节标题（短行+冒号）则拆
  const paras = text.split(/\n{2,}/);
  for (const p of paras) {
    const t = p.trim();
    if (!t || t === "LLM Knowledge Bases") continue;
    // Data ingest: / IDE: 等小节
    const sub = /^(Data ingest|IDE|Q&A|Output|Linting|Extra tools|Further explorations|TLDR):\s*([\s\S]*)$/i.exec(t);
    if (sub) {
      notes.push("## " + sub[1]);
      const body = sub[2].trim();
      if (body) notes.push(body);
      continue;
    }
    // 整段以小节标题开头
    const lines = t.split("\n");
    if (lines.length > 1 && /^(Data ingest|IDE|Q&A|Output|Linting|Extra tools|Further explorations|TLDR):$/i.test(lines[0].trim())) {
      notes.push("## " + lines[0].replace(/:$/, "").trim());
      const body = lines.slice(1).join("\n").trim();
      if (body) notes.push(body);
      continue;
    }
    notes.push(t.replace(/\n/g, " "));
  }
  writeJson("link-karpathy-x", notes);
}

// ── 3. Dan Koe 头条中英对照（WebFetch 正文逐段；导读+中英对照全文）──
{
  const raw = fs.readFileSync(path.join(root, "public/assets/archive/link-toutiao-dan-koe/source.txt"), "utf8");
  let body = raw.replace(/\r\n/g, "\n");
  // 去掉 WebFetch 重复页眉行
  body = body.replace(/^Dan Koe 的《[^》]+》完整中英对照版 - 今日头条\n+/, "");
  body = body.replace(/^#\s+/, "## ");
  const notes = [];
  for (const block of body.split(/\n{2,}/)) {
    let t = block.trim();
    if (!t) continue;
    // 段内换行：头条多为单行；若多行则拼成一段（中英对照不插空格）
    const lines = t.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 1 && /^#{1,3}\s+/.test(lines[0])) {
      notes.push("## " + lines[0].replace(/^#{1,3}\s+/, ""));
      continue;
    }
    if (/^#{1,3}\s+/.test(lines[0])) {
      notes.push("## " + lines[0].replace(/^#{1,3}\s+/, ""));
      const rest = lines.slice(1).join("");
      if (rest) notes.push(rest);
      continue;
    }
    // 罗马数字章节（英中粘连）当小标题
    if (/^(I{1,3}|IV|V|VI|VII|VIII|IX|X)\s*[–—-]/.test(lines[0]) && lines[0].length < 220) {
      notes.push("## " + lines.join(""));
      continue;
    }
    if (lines[0] === "——" || lines[0] === "---") {
      notes.push("——");
      continue;
    }
    notes.push(lines.join(""));
  }
  // 去掉头条页脚 UI
  const cut = notes.findIndex((n) => n === "举报" || /^评论\s*\d+$/.test(n) || n === "网站地图");
  const cleaned = cut >= 0 ? notes.slice(0, cut) : notes;
  writeJson("link-toutiao-dan-koe", cleaned);
}
