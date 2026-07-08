---
doc_type: project_doc
title: 多源任务执行计划 · 本项目细则
status: active
canonical: docs/MULTI-SOURCE-EXEC-PLAN.md
implements: docs/AI-COLLABORATION-CHARTER.md §1.8
revised_at: "2026-07-07 09:35:00"
timezone: Asia/Shanghai
---

# 多源任务执行计划 · 本项目细则

> **通用规则** → [AI-COLLABORATION-CHARTER.md §1.8](AI-COLLABORATION-CHARTER.md#18-多源任务执行计划)（适用场景、使用方式、禁止项）  
> **本文** → 本仓库的路径、优先级起点、完整模板、反面案例

---

## 1. 何时必须写（本项目补充）

在宪章 §1.8 基础上，本仓库 **命中任一** 即必须写计划：

| 条件 | 示例 |
|------|------|
| Skill + 项目 doc | demo：`web-design-engineer/SKILL.md` + `DEMO-TASTING-NOTES.md` |
| ≥2 份权威 doc | 迁 `src/`：`SITE-MANUAL` + `STATUS` + `DEMO-TASTING` |
| 用户拍板优先级 / C 层破例 | D4：Turley recipe vs 试吃 Never |
| demo Checkpoint | 与 `docs/sessions/` Checkpoint 1 **五块执行包**合并落盘 |

---

## 2. 计划落盘（本项目）

| 场景 | 位置 |
|------|------|
| 默认 | 当次回复 `## 执行计划`（摘要） |
| demo / 跨会话 | **`docs/sessions/YYYY-MM-DD.md` 专节**（权威执行包） |
| demo Checkpoint 1 | **[DEMO-BUILD-GATE.md §3 五块](DEMO-BUILD-GATE.md)**：块 1 用本节 §3 模板 + 块 2–5 见 GATE |
| 编码时 | **只认 sessions 当版 Checkpoint 1**；分散 doc 不再现场重拼 |

> 对话里的 `## 执行计划` 是摘要；**Git 里 sessions 五块不全 = 未做计划**（D4 教训）。

---

## 3. 完整模板（块 1 · 非 demo 或 demo 的优先级表部分）

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

### 4.1 `design-demos/*.html`（Archie 拍板 2026-07-03）

| 优先级 | 文件 |
|--------|------|
| 1 | `.agents/skills/web-design-engineer/SKILL.md`（全文，含 Checkpoint；**非**仅 `recipe/*.md`） |
| 2 | `docs/DEMO-TASTING-NOTES.md` |
| 3 | `design-demos/_spec.md` → `docs/STATUS.md` → 对照已有 demo HTML → `docs/sessions/` → `references/style-recipes/*.md` |

关联：[`DEMO-BUILD-GATE.md`](DEMO-BUILD-GATE.md) · [`design-demos/_spec.md`](../design-demos/_spec.md)

### 4.2 改 `src/`（production）

见 [`DOC-LIFECYCLE.md`](DOC-LIFECYCLE.md)：`src/` → `SITE-MANUAL` → `STATUS` + `DEMO-TASTING` → `_spec` / `guidelines`

### 4.3 协作 / 语料

gotchas → 宪章 → 专题 doc → `STATUS`

---

## 5. 反面案例：D4 turley（2026-07-03）

**若遵守 §1.8，计划应含：**

| 优先级 | 参考文件 | 本任务取什么 | 冲突时 |
|--------|----------|--------------|--------|
| 1 | `web-design-engineer/SKILL.md` | Step 3 DS；Checkpoint 1/2 真停；v0→v1 | 流程为准 |
| 2 | `DEMO-TASTING-NOTES.md` | Must 暖纸 folio；Never 粗黑框/大面积色块 | 裁剪 DS 与 recipe |
| 3 | `design-demos/_spec.md` | A 层内容；C 层纸底 + contrast 色块 | 服从 1–2 |
| 4 | `design-demos/benchmark.html` | 纸色、hairline、Playfair folio | — |
| 5 | `.../bloomberg-businessweek-turley.md` | folio 尺度、slam、表格式索引 | 与 2 冲突则丢 hex/满幅 |

**实际错误**：无计划 → recipe 越级为 1 → 跳过 SKILL Checkpoint。

叙事详见 [`sessions/2026-07-03.md`](sessions/2026-07-03.md)。

---

## 修订记录

| 北京时间 | 变更 |
|----------|------|
| 2026-07-07 09:35:00 | §2 demo 执行包 → GATE §3 五块；sessions 为权威落盘 |
| 2026-07-03 14:45:00 | 恢复为项目细则 doc；通用规则仅留宪章 §1.8 |
| 2026-07-03 14:35:00 | 误并入宪章（已纠正） |
| 2026-07-03 14:30:00 | 初版 |
