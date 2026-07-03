# AGENTS.md — AI 项目入口

> **新 AI 会话必须先读 [docs/STATUS.md](docs/STATUS.md)**（当前进度以 STATUS 为准），再按需查阅本文。

## 规则写在哪（增删规则前先读）

> **自动进 AI 上下文的只有**：**本文件** + `.cursor/rules/*.mdc`（`alwaysApply`）。宪章、`docs/` 专题 **不会**自动全文注入 → 新规则须在此登记 + gotchas 一行。

| 写什么 | 写哪 |
|--------|------|
| 每会话硬约束（≤15 条） | `.cursor/rules/project-gotchas.mdc` |
| **全局可复用**协作规则 | `docs/AI-COLLABORATION-CHARTER.md` |
| **本项目**细则（路径、案例、起点表） | `docs/` 专题 + **本表「文档索引」** |
| 进度 / 决策 | `docs/STATUS.md` |
| 专题步骤 | `docs/主题-*.md` |
| 稳定产品需求 | `guidelines/`（少改） |

**新增规则顺序**：① 通用句 → 宪章 → ② 本项目表/案例 → 专题 doc → ③ **更新本节或 gotchas** → ④ STATUS 一行。

## 上下文注入

| 每会话自动 | 按需 Read / `@` |
|------------|-----------------|
| 本文件 | `docs/AI-COLLABORATION-CHARTER.md`（复杂任务、改规则） |
| `project-gotchas.mdc`、`project-conventions.mdc` | 专题 doc（gotchas 点名） |
| | `docs/STATUS.md`（新任务必读） |

## 项目是什么

{{PROJECT_ONE_LINER}}

- 人类读者：[README.md](README.md)
- 稳定需求：[guidelines/](guidelines/) 或 [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)

## 快速启动

```bash
{{DEV_INSTALL_COMMAND}}   # 例如 npm i
{{DEV_RUN_COMMAND}}       # 例如 npm run dev
```

## 技术栈

| 层 | 选型 |
|----|------|
| {{STACK_ROW_1}} | |
| {{STACK_ROW_2}} | |

## 目录地图

```
{{DIRECTORY_TREE}}
```

占位：`{EXPLORE_DIR}/` = 原型探索 · `{APP_DIR}/` = 生产代码

## 已锁定决策（摘要）

- {{DECISION_1}}
- {{DECISION_2}}

详情见 guidelines / STATUS「最近决策」。

## 本项目特有问题与解法

1. {{GOTCHA_1}}
2. {{GOTCHA_2}}

（完整硬约束见 `.cursor/rules/project-gotchas.mdc`）

## 规划与文档：何时用 STATUS / sessions / Plan

| 场景 | 做法 |
|------|------|
| 日常进度 | 只改 **docs/STATUS.md**（主任务 + **进度快照表** + 接下来） |
| 详细计划 | **docs/sessions/YYYY-MM-DD.md** |
| 子任务 | STATUS 改一行 → Agent 直接改代码，**不新建** `.cursor/plans/` |
| 多源任务 | 动手前 **`## 执行计划`** → 见宪章 §1.8、`MULTI-SOURCE-EXEC-PLAN.md` |
| 复杂任务 | 首条 **`## 复述需求`** → 见 `COMPLEX-TASK-GATE.md` |
| 代码变更 | **git commit** |

## 收工 / 新对话

- **收工**：更新 STATUS → 可选 sessions → `git commit` + `push`
- **新对话**：`git pull` → 读 `@docs/STATUS.md` `@AGENTS.md` → 继续 [任务]

## 文档索引

| 文件 | 用途 |
|------|------|
| [docs/STATUS.md](docs/STATUS.md) | 当前进度（日常唯一入口） |
| [docs/AI-COLLABORATION-CHARTER.md](docs/AI-COLLABORATION-CHARTER.md) | 全局协作规则（通用；不含本项目路径表） |
| [docs/COMPLEX-TASK-GATE.md](docs/COMPLEX-TASK-GATE.md) | 复杂任务硬触发 |
| [docs/MULTI-SOURCE-EXEC-PLAN.md](docs/MULTI-SOURCE-EXEC-PLAN.md) | 多源计划本项目细则 |
| [docs/DOC-LIFECYCLE.md](docs/DOC-LIFECYCLE.md) | 文档覆盖旧需求 |
| [docs/sessions/](docs/sessions/) | 详细计划与当日长文 |
| [docs/sessions/_TEMPLATE.md](docs/sessions/_TEMPLATE.md) | 日志模板 |
| {{TOPIC_DOC_1}} | {{TOPIC_DOC_1_DESC}} |

## 上下文体系

维护流程见 [`.agents/skills/project-context/SKILL.md`](.agents/skills/project-context/SKILL.md)（或 `@project-context`）。
