import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const extractPath = path.join(ROOT, "docs/sessions/_extract-users.txt");
const dialoguePath = path.join(
  ROOT,
  "knowledge/raw/dialogues/2026-06-26-知识库协作与网站说明书.md"
);

const extract = fs.readFileSync(extractPath, "utf8");
const blocks = new Map();
for (const m of extract.matchAll(
  /===== INDEX (\d+) len=\d+ =====\n([\s\S]*?)(?=\n===== INDEX|\s*$)/g
)) {
  blocks.set(Number(m[1]), m[2].trim());
}

/** newest # first: [turnNum, index, assistant one-liner, time optional] */
const TURNS = [
  [
    22,
    75,
    "用户指出 #019 等轮次摘要冒充原文；查规则位置（宪章/AGENTS/gotchas）；从 transcript 逐字修复 #012–#022 并强化 gotchas 硬约束。",
    "2026-07-02 18:23:13",
  ],
  [
    21,
    74,
    "更新 STATUS；归档 #016–#020（本轮已改为逐字修复）。",
    "2026-07-02 18:16:45",
  ],
  [
    20,
    73,
    "Skill DIY 可行性 + D2/designer 试吃 + 旅程 A/B/C + 豆包思维模型 + knowledge_skill 借鉴；写入 DEMO-TASTING-NOTES 与 sessions §9。",
    "2026-07-02 18:14:38",
  ],
  [
    19,
    72,
    "结论：Skill 与项目 doc 两套 Cursor 机制不同，非 YAML 格式限制；用户「分类成本」分析大体正确；DIY summary 注入可行但有维护/token 弊端。",
    "2026-07-02 18:12:00",
  ],
  [
    18,
    71,
    "三句话结论：两套机制不同；Skill 靠 description 路由、@ 读全文；项目 doc YAML 是状态标签、不自动注入。",
    "2026-07-02 18:10:00",
  ],
  [
    17,
    70,
    "更正 DOC-FRONTMATTER：Preview 首尾空行、字段间空行、revised_at 须实时北京时间到秒；补 Skill vs doc 对比。",
    "2026-07-02 18:08:00",
  ],
  [
    16,
    69,
    "DOC-FRONTMATTER Preview 空行规则；写入 benchmark/D1 试吃全文至 DEMO-TASTING-NOTES。",
    "2026-07-02 18:05:00",
  ],
  [
    15,
    68,
    "归档 #012–#015；说明试吃笔记可填范围；用户旅程写法 + 三条示例；引导填 sessions/2026-07-01 §5。",
    "2026-07-01 18:30:49",
  ],
  [
    14,
    67,
    "新建 COMPLEX-TASK-GATE + sessionStart Hook；D3 试吃补粗黑边框不要；sessions/2026-07-01 站点功能盘点计划。",
    "2026-07-01 17:47:40",
  ],
  [
    13,
    65,
    "承认 AskQuestion 不适合试吃；改对话逐字段填 DEMO-TASTING-NOTES，不再弹卡片。",
    "2026-07-01 17:30:00",
  ],
  [
    12,
    66,
    "写入 DEMO-TASTING-NOTES D3 节；查 SITE-MANUAL/06-26；给站点功能盘点计划；说明复杂任务复述规则。",
    "2026-07-01 17:20:00",
  ],
];

function formatTurn(num, time, body, assistant) {
  return `## #${String(num).padStart(3, "0")} · Archie · ${time}

${body}

### Assistant

${assistant}

---
`;
}

let md = fs.readFileSync(dialoguePath, "utf8");

const headerEnd = md.indexOf("## #020");
const tailStart = md.indexOf("## #011");
if (headerEnd === -1 || tailStart === -1) {
  throw new Error("Could not find splice points in dialogue file");
}

const header = md.slice(0, headerEnd);
const tail = md.slice(tailStart);

const newTurns = TURNS.map(([num, idx, asst, time]) => {
  const body = blocks.get(idx);
  if (!body) throw new Error(`Missing transcript index ${idx} for #${num}`);
  return formatTurn(num, time, body, asst);
}).join("\n");

const revisedAt = "2026-07-02 18:23:13";
let out = header.replace(/turn_count: \d+/, `turn_count: 22`);
out = out.replace(
  /\| 2026-07-02 18:16:45 \| 新增 #016–#020[^|]*\|/,
  `| ${revisedAt} | **逐字修复** #012–#022（transcript 原文）；强化 gotchas 禁止摘要冒充 Archie |\n| 2026-07-02 18:16:45 | 新增 #016–#020（曾误用摘要，已作废） |`
);
out += newTurns + "\n" + tail;

fs.writeFileSync(dialoguePath, out, "utf8");
console.log("Patched dialogue file with turns #012-#022, turn_count=22");
