---
doc_type: project_doc
title: 文档生命周期
status: active
canonical: docs/DOC-LIFECYCLE.md
authority: 需求覆盖旧需求
revised_at: "{{YYYY-MM-DD}} 00:00:00"
timezone: "{{TIMEZONE}}"
---

# 文档生命周期 · 新需求覆盖旧需求

## 1. 核心结论

| 问题 | 答案 |
|------|------|
| 旧文件删吗？ | **默认不删**。用 **status 标记** + 修订记录，或 `docs/_archive/` |
| 最新状态放哪？ | **按职责分散**，每条线 **只有一个权威源**（见 §2） |
| 覆盖发生时必做？ | 更新 **权威源** + `STATUS`「最近决策」+（若推翻/搁置）**旧文件文首状态条** |

## 2. 四种处置

| 类型 | 含义 | 旧文件 | 最新状态写入 |
|------|------|--------|--------------|
| **A · 推翻** | 方向错了 | **保留** + `status: superseded` | 权威源 + STATUS |
| **B · 搁置** | 暂停 | **保留** + `status: shelved` | STATUS + 原专题 doc |
| **C · 改写** | 同主题升级 | **原地改** + 修订记录 | 同一权威文件 |
| **D · 探索作废** | 原型试过后否决 | **保留** 原型 + STATUS/sessions 标注 | sessions + STATUS |

**可物理删除**仅当：① 纯临时草稿（如 `.cursor/plans/`）② STATUS 已记录 ③ 权威源已吸收 ④ 维护者同意。

## 3. 权威源地图（按项目填写）

| 你想确认… | 权威源 | 冲突时 |
|-----------|--------|--------|
| 产品现状 / 线框 | `{{PRODUCT_MANUAL_DOC}}` | 覆盖 guidelines 页面描述 |
| 进度 / 下一步 | `docs/STATUS.md` | 覆盖 AGENTS 进度叙述 |
| 代码实际行为 | `{APP_DIR}/` | 覆盖所有文档 |
| 协作 / 硬约束 | `AGENTS.md` + gotchas | 细则以 gotchas 点名的 doc 为准 |
| 专题步骤 | `docs/主题-*.md` | — |
| 原始产品意图 | `guidelines/` | **可能过时**；差异见 STATUS |
| 讨论 WHY | `docs/sessions/` | **只增不改** |

**冲突优先级（高 → 低）**：`{APP_DIR}/` → 产品手册 → `STATUS` → 专题 doc → `guidelines` → 旧 sessions

## 4. AI 执行清单（检测到覆盖时）

1. **判定类型** — A / B / C / D
2. **更新权威源** — 只改 §3 对应的那一个
3. **旧文件** — 状态标记 + 修订记录顶行
4. **STATUS** — 「最近决策」追加 1 条：`日期 · 旧 → 新 · 权威源路径`
5. **sessions** — 讨论 >5 分钟：append delta
6. **guidelines** — **默认不改**；仅维护者明确要求时改
7. **索引** — AGENTS「文档索引」链接仍有效
