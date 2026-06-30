---
name: project-context
description: "Maintains cross-session project context with AGENTS.md, docs/STATUS.md, docs/sessions/, and five-layer doc rules. Use when bootstrapping a repo, starting a new AI chat, end-of-day wrap-up (收工更新), git push handoff, migrating projects, or when the user mentions 项目上下文、STATUS、sessions、新对话怎么继续."
---

# Project Context — 跨会话项目上下文

Git 同步的 Markdown 是**单一真相源**；`.cursor/plans/` 只是临时草稿，**不能**当进度源。

## 分工（必读）

| 载体 | 放什么 |
|------|--------|
| **Skill（本文件）** | 通用流程、模板路径、收工/开对话 ritual |
| **`.cursor/rules/*.mdc`** | 该项目**事实**（命令、坑点、专题 doc 路径） |
| **`AGENTS.md`** | 项目入口：栈、目录、索引 |
| **`docs/STATUS.md`** | 活进度：主任务 + **进度快照表** + 接下来 |
| **`docs/sessions/`** | 当日长文、多方案讨论 |
| **`guidelines/`** | 稳定需求（少改） |

Skill 教**怎么做**；gotchas 记**这个项目是什么**。

## 五层架构

详见 [references/five-layer-architecture.md](references/five-layer-architecture.md)。

1. **硬约束** — `.cursor/rules/*-gotchas.mdc`（`alwaysApply: true`，≤15 条）
2. **元规则** — `.cursor/rules/*-conventions.mdc`（规则写哪、怎么进上下文）
3. **专题规范** — `docs/主题-xxx.md`（细则；gotchas **一行索引**）
4. **活状态** — `docs/STATUS.md` + `docs/sessions/YYYY-MM-DD.md`
5. **稳定需求** — `guidelines/` 或 `docs/REQUIREMENTS.md`

## 何时读哪份文档

| 场景 | 做法 |
|------|------|
| 日常进度、下一步 | 只改 **docs/STATUS.md**（含进度快照**表** + 接下来；约一页） |
| 详细计划、多方案 | **docs/sessions/YYYY-MM-DD.md**（用 [session-TEMPLATE.md](references/session-TEMPLATE.md)） |
| 子任务（字体、颜色、间距） | STATUS 表改一行 → **直接改代码**，不新建 `.cursor/plans/` |
| 大重构起草 | Plan 模式可草稿 → **定稿归档 sessions**，仍以 STATUS 为入口 |
| 代码变更 | **git commit**；不必复制进 sessions |

**禁止：** 每个小需求新建 `.cursor/plans/*.plan.md`。

## 流程 1 · Bootstrap（新项目一次）

1. 在项目根运行（或 Agent 等价操作）：
   ```bash
   node .agents/skills/project-context/scripts/scaffold.mjs
   ```
   - 默认：**不覆盖**已有文件
   - `node .../scaffold.mjs --dry-run` 预览
   - `node .../scaffold.mjs --force` 仅覆盖带 `.template` 标记的骨架文件

2. 填写占位符：`{{PROJECT_NAME}}`、`{{STACK}}`、`{{DEV_COMMAND}}` 等（见模板）

3. 创建 `.cursor/rules/project-gotchas.mdc` 与 `project-conventions.mdc`（从 [references/](references/) 复制并改项目事实）

4. `git init` → `.gitignore`（排除 `node_modules/`、`dist/`、`.env`）→ 首次 commit

模板：[AGENTS.template.md](references/AGENTS.template.md) · [STATUS.template.md](references/STATUS.template.md)

## 流程 2 · 开新对话

**Cursor：**
```
请先 git pull，读 @docs/STATUS.md 和 @AGENTS.md，然后继续 [任务]
```

**非 Cursor（CLI / 网页）：** 用户粘贴 STATUS 全文或「主任务 + 接下来 + 待决定」三节。详见 [tool-matrix.md](references/tool-matrix.md)。

Agent **必须先读 STATUS**，再读 AGENTS；专题任务再 `@docs/主题-xxx.md`。

## 流程 3 · 收工（End of day）

用户说：**收工更新 STATUS 并 push**（国内 GitHub 常需代理）。

Agent 顺序执行：

1. **更新 STATUS**
   - 「最后更新」日期 = 今天
   - 进度快照表：模块状态与备注
   - 「接下来」按优先级（≤5 条）
   - 「最近决策」倒序，保留最近 5 条
   - 「今日摘要」3～5 bullet + 链到 sessions

2. **sessions** — 仅当今日有长讨论：新建/追加 `docs/sessions/YYYY-MM-DD.md`（写 **delta**，不重复 STATUS 整表）

3. **防漂移** — AGENTS「文档索引」链接的文件必须存在；过时条目删除或更新；**需求被覆盖**时按 [DOC-LIFECYCLE.md](../../docs/DOC-LIFECYCLE.md) 更新权威源 + 旧文件状态条

4. **Git** — `git status` → `git add`（不含 secrets）→ `commit` → `push`
   - push 失败：STATUS「待你决定」加 `[ ] 待 push（网络/代理）`

5. **不要**为收工单独建 `.cursor/plans/`

## 流程 4 · 新增项目规则

按 [conventions.template.mdc](references/conventions.template.mdc) 决策树：

- 3～10 条 bullet → `.cursor/rules/*.mdc`
- 步骤 + 示例 + 脚本 → `docs/主题-xxx.md` + gotchas **一行链接**
- 一次性决策 → STATUS「最近决策」+ 可选 sessions

## STATUS 必填区块（不可删）

```markdown
## 主任务（仅 1 条）
## 进度快照        ← 必须是表格，不是纯 checklist
## 接下来（按优先级）
## 待你决定
## 最近决策
## 今日摘要
```

## 反模式

- 用 `.cursor/plans/` 当进度源
- STATUS 删进度表只留 todo
- 把专题细则全堆进 alwaysApply（token 爆炸）
- AGENTS 写锁定的视觉/方向，但 STATUS 写「待用户选定」→ **以 STATUS 为准**
- 新需求只写 sessions/新 md，**不更新权威源** → 下一会话 AI 仍按旧 doc 干活
- 覆盖旧需求时 **删文件** 且 STATUS 无记录 → 无法追溯
- `guidelines/` 与 SITE-MANUAL 长期不一致 → 应在 STATUS 或 SITE-MANUAL 标注差异，而非 silent 忽略
- 收工只改 STATUS 不 push（换机丢进度）

## Smoke test（Skill 验收）

新对话仅读 STATUS + AGENTS 后，Agent 应能：

- [ ] 说出主任务 + 接下来 2 步
- [ ] 知道子任务不建 `.cursor/plans/`
- [ ] 知道专题规则在 `docs/xxx.md`（由 gotchas 索引）
- [ ] 收工后 STATUS 日期 = 当天
- [ ] 最近一条 `git log` 与「今日摘要」一致

## 参考文件

| 文件 | 用途 |
|------|------|
| [five-layer-architecture.md](references/five-layer-architecture.md) | 五层详解 |
| [tool-matrix.md](references/tool-matrix.md) | Cursor / CLI / v0 |
| [AGENTS.template.md](references/AGENTS.template.md) | 项目入口模板 |
| [STATUS.template.md](references/STATUS.template.md) | 进度模板 |
| [session-TEMPLATE.md](references/session-TEMPLATE.md) | 当日日志模板 |
| [gotchas.template.mdc](references/gotchas.template.mdc) | 硬约束模板 |
| [conventions.template.mdc](references/conventions.template.mdc) | 元规则模板 |
