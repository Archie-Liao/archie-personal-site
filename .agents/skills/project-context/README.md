# project-context Skill

跨会话、跨设备、跨 AI 工具的项目上下文维护流程（五层文档架构 + Git 同步）。

## 何时使用

- 新项目 **bootstrap** 上下文骨架
- **收工**：「收工更新 STATUS 并 push」
- **开新对话**：告诉 Agent 先读 STATUS + AGENTS
- 迁移到其他仓库（复制整个 `.agents/skills/project-context/` 或安装到 `~/.cursor/skills/`）

## 文件结构

```
project-context/
├── SKILL.md              # 主流程（Agent 读这个）
├── manifest.json
├── README.md
├── references/           # 模板与架构说明
│   ├── five-layer-architecture.md
│   ├── tool-matrix.md
│   ├── AGENTS.template.md
│   ├── STATUS.template.md
│   ├── session-TEMPLATE.md
│   ├── gotchas.template.mdc
│   └── conventions.template.mdc
└── scripts/
    └── scaffold.mjs      # 一键生成骨架（不覆盖已有定制文件）
```

## Bootstrap

在项目根目录：

```bash
node .agents/skills/project-context/scripts/scaffold.mjs --dry-run   # 预览
node .agents/skills/project-context/scripts/scaffold.mjs               # 创建缺失文件
node .agents/skills/project-context/scripts/scaffold.mjs --force       # 仅覆盖仍带 scaffold 标记的文件
```

## 与本仓库

本项目的**事实**在 `.cursor/rules/project-gotchas.mdc` 与 `docs/STATUS.md`；Skill 只教**通用流程**。在 Cursor 中说 `@project-context` 或「按 project-context 收工」即可触发。

## 版本

见 `manifest.json`（当前 1.0.0）。
