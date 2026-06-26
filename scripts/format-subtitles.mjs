/**
 * 语音导出字幕 → public/subtitles/ep*.txt
 * 规则见 docs/SUBTITLE-FORMAT.md
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "design-demos", "视频日记字幕稿");
const OUT_DIR = path.join(ROOT, "public", "subtitles");

const PARA_START = /^(今天是|感谢|终身学习)/;
const NEW_CLAUSE = /^(但是|所以|另外|感谢|不要|那些|其实|然后|你会发现|那么|还有一个|另外一个)/;
const LIST_NEXT = /^(或者|比如|还有)/;
const INCOMPLETE_END = /[当在是和与跟给被把将从向以为以]$/;
const MAX_SENTENCE_LEN = 120;

function endsDateLine(line) {
  return /(\d{1,2}号|\d{1,2}日)$/.test(line) && /今天|年|月/.test(line);
}

function joinPunct(prev, next, bufLen) {
  if (endsDateLine(prev)) return "。";
  if (NEW_CLAUSE.test(next) && bufLen >= 10) return "。";
  if (LIST_NEXT.test(next)) return "，";
  return "，";
}

function cleanup(text) {
  return text
    .replace(/看来当至少/g, "看来，至少")
    .replace(/面对，人生/g, "面对人生")
    .replace(/伴随着，你/g, "伴随着你")
    .replace(/，+/g, "，")
    .replace(/。+/g, "。");
}

function punctuateLines(lines) {
  if (lines.length === 0) return "";

  let buf = lines[0];

  for (let i = 1; i < lines.length; i++) {
    const prev = lines[i - 1];
    const line = lines[i];

    if (INCOMPLETE_END.test(prev) || prev.endsWith("当")) {
      buf += line;
      continue;
    }

    const sep = joinPunct(prev, line, buf.length);
    if (!/[。！？，、：；]$/.test(buf)) buf += sep;
    buf += line;
  }

  if (!/[。！？]$/.test(buf)) buf += "。";
  return cleanup(buf);
}

/** 按 。！？ 拆句；超长句在 ，； 处二次拆段 */
function splitToParagraphs(text) {
  const raw = text.match(/[^。！？]+[。！？]?/g)?.filter((s) => s.trim()) ?? [text];
  const out = [];

  for (let sentence of raw) {
    sentence = sentence.trim();
    if (!sentence) continue;

    if (sentence.length <= MAX_SENTENCE_LEN) {
      out.push(sentence);
      continue;
    }

    let rest = sentence;
    while (rest.length > MAX_SENTENCE_LEN) {
      let cut = -1;
      const chunk = rest.slice(0, MAX_SENTENCE_LEN + 1);
      for (let i = chunk.length - 1; i >= 40; i--) {
        if (/[，；]/.test(chunk[i])) {
          cut = i + 1;
          break;
        }
      }
      if (cut <= 0) break;
      out.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut).trim();
    }
    if (rest) out.push(rest);
  }

  return out;
}

function formatFile(raw) {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const groups = [];
  let group = [];

  for (const line of lines) {
    if (PARA_START.test(line) && group.length > 0) {
      groups.push(group);
      group = [];
    }
    group.push(line);
  }
  if (group.length) groups.push(group);

  const paragraphs = groups.flatMap((g) => splitToParagraphs(punctuateLines(g)));
  return paragraphs.join("\n\n") + "\n";
}

function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error("源目录不存在:", SRC_DIR);
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs.readdirSync(SRC_DIR).filter((f) => f.endsWith(".txt"));
  let count = 0;

  for (const f of files) {
    const m = f.match(/^(\d+)/);
    if (!m) continue;
    const ep = m[1].padStart(3, "0");
    const raw = fs.readFileSync(path.join(SRC_DIR, f), "utf8");
    const out = formatFile(raw);
    fs.writeFileSync(path.join(OUT_DIR, `ep${ep}.txt`), out, "utf8");
    const paraCount = out.trim().split(/\n\s*\n/).length;
    console.log(`ep${ep} ← ${f} (${paraCount} 段)`);
    count++;
  }

  console.log(`Done: ${count} files → ${OUT_DIR}`);
}

main();
