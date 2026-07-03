---
name: project-context
description: "Maintains cross-session project governance: five-layer docs, collaboration charter, complex-task gate, multi-source exec plans, STATUS/sessions rituals, and rule placement. Use when bootstrapping a repo, end-of-day wrap-up (收工), starting a new AI chat, adding project rules, multi-source tasks, complex tasks, doc architecture, or copying context setup to another project."
---

# Project Context — 跨会话项目治理

Git 同步的 Markdown 是**单一真相源**；`.cursor/plans/` 只是临时草稿，**不能**当进度源。

Skill 教**怎么做**；gotchas / 宪章 / 专题 doc 记**这个项目是什么**。

## 分工

| 载体 | 放什么 |
|------|--------|
| **Skill（本文件）** | 通用流程、模板路径、复杂任务 / 多源 / 收工 ritual |
| **`.cursor/rules/*.mdc`** | 该项目**事实**（命令、坑点、专题 doc 路径） |
| **`docs/AI-COLLABORATION-CHARTER.md`** | **全局可复用**协作规则（不自动注入；须索引） |
| **`AGENTS.md`** | 项目入口：栈、目录、**规则写在哪**、文档索引 |
| **`docs/STATUS.md`** | 活进度：主任务 + **进度快照表** + 接下来 |
| **`docs/sessions/`** | 当日长文、多方案讨论 |
| **`guidelines/`** | 稳定需求（少改） |

架构详解 → [references/five-layer-architecture.md](references/five-layer-architecture.md)  
规则落盘 → [references/rule-placement-decision-tree.md](references/rule-placement-decision-tree.md)

## 何时使用（触发词）

- 新项目 **bootstrap** / **脚手架**
- **收工**、**新对话开场**
- **加一条项目规则**、**文档架构**
- **复杂任务**、**多源任务**、**执行计划**
- **复制到其他项目**、迁移上下文体系

执行本 Skill 的复杂升级任务时，Agent **自身**也应先输出 `## 复述需求`（若命中复杂任务门控）。

---

## 流程 0 · 复杂任务 / 多源（动手前）

### 0a · 复杂任务门控

命中触发 → 首条回复**必须**以 `## 复述需求` 开头，然后信息清单、完备度声明；缺关键项 **只规划不写码**。

模板与关键词 → [references/complex-task-gate.template.md](references/complex-task-gate.template.md)

### 0b · 多源执行计划

任务依赖 **≥2 个权威文件**（Skill、docs、`_spec`、`guidelines` 等）→ 编码前输出 **`## 执行计划`** + 优先级表。

- 通用规则：宪章 §1.8（见 [collaboration-charter.template.md](references/collaboration-charter.template.md)）
- 本项目路径/案例：[multi-source-exec-plan.template.md](references/multi-source-exec-plan.template.md)

**禁止**：只读 Skill 子文件（如单个 recipe）而声称已执行全文 Skill。

---

## 流程 1 · Bootstrap（新项目一次）

```bash
node .agents/skills/project-context/scripts/scaffold.mjs              # 核心骨架
node .agents/skills/project-context/scripts/scaffold.mjs --with-governance   # + 宪章/门控/多源/doc 生命周期
node .agents/skills/project-context/scripts/scaffold.mjs --dry-run    # 预览
node .agents/skills/project-context/scripts/scaffold.mjs --force      # 仅覆盖带 scaffold 标记的文件
```

1. 填写占位符：`{{PROJECT_NAME}}`、`{EXPLORE_DIR}`、`{APP_DIR}`、命令等（见模板）
2. 从 [references/](references/) 定制 gotchas / conventions（≤15 条硬约束）
3. `git init` → `.gitignore` → 首次 commit

---

## 流程 2 · 开新对话

**Cursor：**
```
请先 git pull，读 @docs/STATUS.md 和 @AGENTS.md，然后继续 [任务]
```

Agent：**先读 STATUS**，再 AGENTS + gotchas；复杂任务 / 改规则 → Read 宪章；专题任务 → `@docs/主题-xxx.md`。

非 Cursor → [references/tool-matrix.md](references/tool-matrix.md)

---

## 流程 3 · 工作中

| 场景 | 做法 |
|------|------|
| 日常进度 | 只改 **docs/STATUS.md**（含进度快照**表**） |
| 详细计划 | **docs/sessions/YYYY-MM-DD.md** |
| 子任务 | STATUS 改一行 → **直接改代码**，不新建 `.cursor/plans/` |
| 新规则 | [rule-placement-decision-tree.md](references/rule-placement-decision-tree.md) |
| 需求覆盖旧需求 | [doc-lifecycle.template.md](references/doc-lifecycle.template.md) |
| 探索 vs 实现 | 改 `{EXPLORE_DIR}/` vs `{APP_DIR}/`（gotchas 写明） |

---

## 流程 4 · 收工

用户说：**收工更新 STATUS 并 push**

1. **STATUS** — 日期、进度快照表、接下来（≤5）、最近决策、今日摘要
2. **sessions** — 仅当有长讨论：写 **delta**，不重复 STATUS 整表
3. **防漂移** — AGENTS 索引链接有效；覆盖需求按 doc-lifecycle
4. **Git** — `git add`（无 secrets）→ `commit` → `push`；失败记入 STATUS「待你决定」
5. **不要**为收工建 `.cursor/plans/`

## STATUS 必填区块

```markdown
## 主任务（仅 1 条）
## 进度快照        ← 必须是表格
## 接下来（按优先级）
## 待你决定
## 最近决策
## 今日摘要
```

---

## 流程 5 · 复制到其他项目

1. 复制整个 `.agents/skills/project-context/` 到新仓库（权威源在本路径；Cursor 默认也认 `.cursor/skills/`，二选一并在 README 说明）
2. 在新仓库根运行 `scaffold.mjs`（建议 `--with-governance`）
3. 填 gotchas 项目事实；填 `MULTI-SOURCE-EXEC-PLAN.md` 优先级起点表
4. 跑 Smoke test（下节）

---

## 反模式

- 用 `.cursor/plans/` 当进度源
- 宪章/专题 **只写文件、不索引** → 下一会话 AI 看不见
- 多源任务 **无优先级表就写码**
- Skill 子文件（recipe）**越级**为最高权威
- 把专题细则全堆进 alwaysApply（token 爆炸）
- AGENTS 写锁定方向，STATUS 写「待选定」→ **以 STATUS 为准**
- 收工只改 STATUS 不 commit/push（换机丢进度）

---

## Smoke test

新对话仅读 STATUS + AGENTS + gotchas 后，Agent 应能：

- [ ] 说出主任务 + 接下来 2 步
- [ ] 复杂任务首条含 `## 复述需求`
- [ ] 多源任务能产出 `## 执行计划` 优先级表
- [ ] 知道子任务不建 `.cursor/plans/`
- [ ] 知道新规则须同步 AGENTS + gotchas
- [ ] 收工后 STATUS 日期 = 当天

---

## 参考文件

| 文件 | 用途 |
|------|------|
| [five-layer-architecture.md](references/five-layer-architecture.md) | 五层 + 宪章层 |
| [rule-placement-decision-tree.md](references/rule-placement-decision-tree.md) | 规则写哪 |
| [collaboration-charter.template.md](references/collaboration-charter.template.md) | 协作宪章模板 |
| [complex-task-gate.template.md](references/complex-task-gate.template.md) | 复杂任务门控 |
| [multi-source-exec-plan.template.md](references/multi-source-exec-plan.template.md) | 多源计划细则 |
| [doc-lifecycle.template.md](references/doc-lifecycle.template.md) | 文档覆盖 |
| [AGENTS.template.md](references/AGENTS.template.md) | 项目入口 |
| [STATUS.template.md](references/STATUS.template.md) | 进度 |
| [session-TEMPLATE.md](references/session-TEMPLATE.md) | 当日日志 |
| [gotchas.template.mdc](references/gotchas.template.mdc) | 硬约束 |
| [conventions.template.mdc](references/conventions.template.mdc) | 元规则 |
| [tool-matrix.md](references/tool-matrix.md) | Cursor / CLI |
