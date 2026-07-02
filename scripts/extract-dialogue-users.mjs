import fs from "fs";
import path from "path";

const transcript =
  process.argv[2] ||
  "C:/Users/Administrator/.cursor/projects/d-Archie-workfiles-personal-website/agent-transcripts/800acde8-66f7-47ba-ad0a-e1f795d9ce19/800acde8-66f7-47ba-ad0a-e1f795d9ce19.jsonl";
const start = Number(process.argv[3] || 64);
const out =
  process.argv[4] ||
  path.join(process.cwd(), "docs/sessions/_extract-users.txt");

const users = [];
for (const line of fs.readFileSync(transcript, "utf8").split("\n")) {
  if (!line.trim()) continue;
  const o = JSON.parse(line);
  if (o.role !== "user") continue;
  const t = o.message?.content;
  const text = Array.isArray(t)
    ? t.filter((x) => x.type === "text").map((x) => x.text).join("")
    : String(t);
  const m = text.match(/<user_query>\s*([\s\S]*?)\s*<\/user_query>/);
  users.push(m ? m[1].trim() : text.trim());
}

let buf = "";
for (let i = start; i < users.length; i++) {
  buf += `===== INDEX ${i} len=${users[i].length} =====\n${users[i]}\n\n`;
}
fs.writeFileSync(out, buf, "utf8");
console.log(`wrote ${users.length - start} messages to ${out}`);
