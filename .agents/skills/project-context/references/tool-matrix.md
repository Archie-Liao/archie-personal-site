# 工具适配矩阵

跨 AI 工具时，**只有 Git 里的 Markdown 是共用的**；Cursor Rules 仅 Cursor 自动注入。

| 工具 | 自动获得 | 用户必须做 |
|------|----------|------------|
| **Cursor** | `alwaysApply` rules + 用户 @ 文件 | 新对话：`@docs/STATUS.md` `@AGENTS.md`；收工：说「收工更新 STATUS 并 push」 |
| **Claude Code / Codex CLI** | 无项目 rules | `git pull`；对话首条粘贴或 `@` STATUS + AGENTS |
| **Claude.ai / 网页** | 无 | 上传或粘贴 STATUS「主任务 + 进度表 + 接下来 + 待决定」 |
| **v0** | 无 | 从 STATUS 复制视觉/需求摘要进首条 prompt；代码 Sync GitHub 后 Cursor 继续 |

## Cursor 新对话模板

```text
请先 git pull，读 @docs/STATUS.md 和 @AGENTS.md，然后继续 [具体任务]
```

## 非 Cursor 新对话模板

```text
以下是项目 STATUS（摘要）。请先理解进度，再 [具体任务]。

---
[粘贴 STATUS 全文或四节：主任务 / 进度快照表 / 接下来 / 待你决定]
---
```

## v0 首条 prompt 模板

从 STATUS 提取（不要贴全文）：

```text
项目：[主任务一句话]
视觉/方向：[待决定项或已锁定决策]
当前阻塞：[待你决定第一条]
请做：[具体 UI 任务]
约束：[从 AGENTS 或 guidelines 摘 3 条]
```

## 收工与 Git

| 步骤 | 所有工具一致 |
|------|----------------|
| 更新 STATUS | 是 |
| 可选 sessions | 是 |
| git commit | 是 |
| git push | 是（国内常需代理） |

push 失败时在 STATUS「待你决定」记阻塞，避免下一对话误以为已同步。

## @project-context Skill

Skill **不会**自动加载（除非用户 @ 或说「收工更新」「bootstrap 项目上下文」）。

- **应 @ skill 时**：bootstrap 新项目、设计协作规则、审查 STATUS 结构
- **不必 @ skill 时**：日常改代码（gotchas + STATUS 已够）
