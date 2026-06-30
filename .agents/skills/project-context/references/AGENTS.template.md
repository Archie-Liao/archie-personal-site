# AGENTS.md — AI 项目入口

> **新 AI 会话必须先读 [docs/STATUS.md](docs/STATUS.md)**（当前进度以 STATUS 为准），再按需查阅本文。

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
| 代码变更 | **git commit** |

## 收工 / 新对话

- **收工**：更新 STATUS → 可选 sessions → `git commit` + `push`
- **新对话**：`git pull` → 读 `@docs/STATUS.md` `@AGENTS.md` → 继续 [任务]

## 文档索引

| 文件 | 用途 |
|------|------|
| [docs/STATUS.md](docs/STATUS.md) | 当前进度（日常唯一入口） |
| [docs/sessions/](docs/sessions/) | 详细计划与当日长文 |
| [docs/sessions/_TEMPLATE.md](docs/sessions/_TEMPLATE.md) | 日志模板 |
| {{TOPIC_DOC_1}} | {{TOPIC_DOC_1_DESC}} |

## 上下文体系

维护流程见项目 Skill：`.agents/skills/project-context/SKILL.md`（或 `@project-context`）。
