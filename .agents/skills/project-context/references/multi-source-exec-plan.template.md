---
doc_type: project_doc
title: 多源任务执行计划 · 本项目细则
status: active
canonical: docs/MULTI-SOURCE-EXEC-PLAN.md
implements: docs/AI-COLLABORATION-CHARTER.md §1.8
revised_at: "{{YYYY-MM-DD}} 00:00:00"
timezone: "{{TIMEZONE}}"
---

# 多源任务执行计划 · 本项目细则

> **通用规则** → [AI-COLLABORATION-CHARTER.md §1.8](AI-COLLABORATION-CHARTER.md)  
> **本文** → 本仓库的路径、优先级起点、完整模板、反面案例

---

## 1. 何时必须写（本项目补充）

在宪章 §1.8 基础上，本仓库 **命中任一** 即必须写计划：

| 条件 | 示例 |
|------|------|
| Skill + 项目 doc | `{{SKILL_EXAMPLE}}` + `{{TOPIC_DOC_EXAMPLE}}` |
| ≥2 份权威 doc | 迁 `{APP_DIR}/`：`{{MANUAL_DOC}}` + `STATUS` + 专题 doc |
| 用户拍板优先级 | 子文件 vs 全文 Skill 层级不清 |
| 跨会话 Checkpoint | 与 `docs/sessions/` 合并落盘 |

---

## 2. 计划落盘（本项目）

| 场景 | 位置 |
|------|------|
| 默认 | 当次回复 `## 执行计划` |
| 跨会话 / 多步 | `docs/sessions/YYYY-MM-DD.md` |
| 与 Checkpoint 合并 | sessions 专节 + 交付物头注释一致 |

---

## 3. 完整模板

```markdown
## 执行计划 · [任务一句话]

### 参考来源与优先级
| 优先级 | 参考文件（完整路径） | 本任务取什么 | 冲突时 |
|--------|----------------------|--------------|--------|
| 1 | … | … | 以本行为准 |
| 2 | … | … | 服从 1，裁剪本行 |

### 冲突裁决
- …

### 执行步骤
1. …

### 硬天花板
- …

### 交付物
- …

### 需确认后再动手
- [ ] 优先级表无误
```

---

## 4. 按任务类型的优先级起点

**须逐任务填表，禁止整表盲抄。**

### 4.1 `{EXPLORE_DIR}/`（原型 / demo）

| 优先级 | 文件 |
|--------|------|
| 1 | `{{DOMAIN_SKILL_PATH}}`（**全文**，非仅子文件） |
| 2 | `{{DOMAIN_CONSTRAINT_DOC}}` |
| 3 | `{{EXPLORE_DIR}}/_spec.md` → `docs/STATUS.md` → sessions |

### 4.2 改 `{APP_DIR}/`（production）

| 优先级 | 文件 |
|--------|------|
| 1 | `{APP_DIR}/`（已实现行为） |
| 2 | `{{PRODUCT_MANUAL_DOC}}` |
| 3 | `docs/STATUS.md` + 相关专题 doc |
| 4 | `guidelines/`（可能过时） |

### 4.3 协作 / 语料

gotchas → 宪章 → 专题 doc → `STATUS`

---

## 5. 反面案例（填写区）

> 发生多源冲突时，在此记录：**若无计划会怎样错**、**正确优先级表应长什么样**。

| 日期 | 任务 | 错误 | 正确优先级要点 |
|------|------|------|----------------|
| {{YYYY-MM-DD}} | （示例） | 无计划直写码 | Skill 全文 > 专题 doc > _spec |

---

## 修订记录

| 日期 | 变更 |
|------|------|
| {{YYYY-MM-DD}} | 自 project-context Skill 模板初始化 |
