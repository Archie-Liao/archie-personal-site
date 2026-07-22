# project-context Skill

跨会话、跨设备、跨 AI 工具的 **项目治理** 流程：五层 + 宪章层文档架构、复杂任务门控、多源执行计划、STATUS/sessions 收工 ritual。

**权威编辑源**：本仓库 `.agents/skills/project-context/`（复制整个文件夹到其他项目即可复用）。

## 何时使用

- 新项目 **bootstrap**（`scaffold.mjs`）
- **收工**：「收工更新 STATUS 并 push」
- **开新对话**：先读 STATUS + AGENTS
- **复杂任务** / **多源任务** / **加项目规则**
- 迁移到其他仓库

在 Cursor 中说 `@project-context` 或「按 project-context 收工」。

## 存放路径说明

| 路径 | 说明 |
|------|------|
| `.agents/skills/project-context/` | **本 Skill 权威源**（本仓库惯例；与 huashu-design 等并列） |
| `.cursor/skills/project-context/` | Cursor 官方推荐的项目 Skill 路径；复制时可二选一 |
| `~/.cursor/skills/` | 个人 Skill；**本 Skill 不放在此**（按维护者选定以 `.agents/skills` 为准） |

复制到新项目后：确保 Cursor 能发现 Skill 目录（项目内 `.agents/skills` 或 `.cursor/skills` 均可，以你团队约定为准）。

## 文件结构

```
project-context/
├── SKILL.md
├── manifest.json
├── README.md
├── references/
│   ├── five-layer-architecture.md
│   ├── rule-placement-decision-tree.md
│   ├── collaboration-charter.template.md
│   ├── COLLABORATION-CONSTRAINTS-TABLE.md  ← **跨项目规则约束速查表（优先拷这个）**
│   ├── complex-task-gate.template.md
│   ├── multi-source-exec-plan.template.md
│   ├── doc-lifecycle.template.md
│   ├── AGENTS.template.md
│   ├── STATUS.template.md
│   ├── session-TEMPLATE.md
│   ├── gotchas.template.mdc
│   ├── conventions.template.mdc
│   └── tool-matrix.md
└── scripts/
    └── scaffold.mjs
```

## Bootstrap

```bash
node .agents/skills/project-context/scripts/scaffold.mjs --dry-run
node .agents/skills/project-context/scripts/scaffold.mjs
node .agents/skills/project-context/scripts/scaffold.mjs --with-governance
node .agents/skills/project-context/scripts/scaffold.mjs --force
```

- **默认**：AGENTS、STATUS、sessions 模板、gotchas、conventions
- **`--with-governance`**：额外生成协作宪章、COMPLEX-TASK-GATE、MULTI-SOURCE-EXEC-PLAN、DOC-LIFECYCLE 骨架

## 复制到其他项目

1. 复制 `.agents/skills/project-context/` 到新仓库
2. 运行 `scaffold.mjs --with-governance`（不覆盖已有定制文件）
3. 填 `project-gotchas.mdc`（≤15 条）与 `MULTI-SOURCE-EXEC-PLAN.md` 优先级起点
4. 新对话跑 SKILL.md 内 Smoke test

## 与本仓库

本项目的**事实**在 `.cursor/rules/project-gotchas.mdc`、`docs/STATUS.md`、`docs/AI-COLLABORATION-CHARTER.md`；Skill 只教**通用流程**。本项目宪章/门控已高度定制，**不要**用 `--force` 覆盖。

## 版本

见 `manifest.json`（v2.0.0：宪章层 + 复杂任务 + 多源计划）。

## create-skill 合规

- `SKILL.md` ≤500 行，细则在 `references/`
- `description` 第三人称 + WHAT/WHEN
- 未设 `disable-model-invocation`：与 gotchas「先读 STATUS」配合，允许 ambient 触发；显式 `@project-context` 亦可
