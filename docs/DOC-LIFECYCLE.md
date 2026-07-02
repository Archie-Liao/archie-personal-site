---

doc_type: project_doc
title: 文档生命周期
status: active
canonical: docs/DOC-LIFECYCLE.md
authority: 需求覆盖旧需求
revised_at: "2026-06-30 18:23:09"
timezone: Asia/Shanghai

---

## 修订记录（最新在上）

| 北京时间 | 变更 |
|----------|------|
| 2026-06-30 18:23:09 | 恢复 `---` YAML frontmatter |
| 2026-06-26 23:59:59 | 初版：四种处置、权威源地图 |

# 文档生命周期 · 新需求覆盖旧需求

> **读者**：Archie + AI · **YAML 细则**：[DOC-FRONTMATTER.md](DOC-FRONTMATTER.md)

---

## 1. 核心结论（先读这段）

| 问题 | 答案 |
|------|------|
| 旧文件删吗？ | **默认不删**。用 **YAML `status`** + **修订记录表**（置顶）或 `docs/_archive/` |
| 最新状态放哪？ | **按职责分散**，每条线 **只有一个权威源**（见 §3），不是全部堆进一个文件。 |
| AI 经常读哪些？ | P0：`gotchas` + `AGENTS` · P1：`STATUS` + `SITE-MANUAL` · P2：专题 doc · P3：`guidelines`（可能过时） |
| 覆盖发生时必做？ | 更新 **权威源** + `STATUS`「最近决策」一行 +（若推翻/搁置）**旧文件文首状态条** |

---

## 2. 四种处置（覆盖类型）

| 类型 | 含义 | 旧文件 | 最新状态写入 |
|------|------|--------|--------------|
| **A · 推翻** | 方向错了，不再采用 | **保留** + YAML `status: superseded` + `superseded_by` | 权威源 + STATUS |
| **B · 搁置** | 暂停，日后可能续做 | **保留** + YAML `status: shelved` + `resume_when` | STATUS + 原专题 doc |
| **C · 改写** | 同主题升级 | **原地改** + `revised_at` 到秒 + 修订记录一行 | 同一权威文件 |
| **D · 探索作废** | demo 试过后否决 | **保留** demo + STATUS/sessions 标注 | sessions + STATUS |

**只有同时满足** 才可物理删除：① 纯临时草稿（如 `.cursor/plans/`）② 已在 STATUS 记录 ③ 权威源已吸收其信息 ④ 用户同意或明显重复垃圾文件。

---

## 3. 权威源地图（最新状态放哪）

**不是一个大文件**，而是 **一条需求线 → 一个权威源**：

| 你想确认… | 权威源（以它为准） | 冲突时 |
|-----------|-------------------|--------|
| 网站现在几页、什么布局 | `docs/SITE-MANUAL.md` | 覆盖 `guidelines` 里的页面描述 |
| 做到哪、下一步、最近决策 | `docs/STATUS.md` | 覆盖 AGENTS 里的进度叙述 |
| 代码实际行为 | `src/` | 覆盖所有文档 |
| 协作 / 硬约束 | `AGENTS.md` + `.cursor/rules/*.mdc` | 细则以 gotchas 点名的 `docs/*.md` 为准 |
| 字幕怎么排版 | `docs/SUBTITLE-FORMAT.md` | — |
| Logo 字标（专题） | `docs/LOGO-FONT-BRIEF.md` | 搁置时以文首状态条为准 |
| demo 试吃结论 | `docs/DEMO-TASTING-NOTES.md` | 覆盖 AGENTS 里「推荐 benchmark」等旧句 |
| 原始产品意图（少动） | `guidelines/` | **可能过时**；差异见 STATUS / SITE-MANUAL |
| 讨论过程与 WHY | `docs/sessions/` | **只增不改**（append delta） |

**冲突优先级（高 → 低）**：`src/`（已实现）→ `SITE-MANUAL`（产品现状）→ `STATUS`（进度与决策）→ 专题 doc → `guidelines` → 旧 sessions。

---

## 4. AI 执行清单（检测到「新需求覆盖旧需求」时）

1. **判定类型** — A 推翻 / B 搁置 / C 改写 / D 探索作废  
2. **更新权威源** — 只改 §3 里对应的那一个（勿在 AGENTS 重复写整站线框）  
3. **旧文件** — 更新 YAML `status` / `superseded_by` / `resume_when` + **修订记录表顶行**（`revised_at` 北京时间到秒）  
4. **STATUS** — 「最近决策」追加 1 条：`日期 · 旧 → 新 · 权威源路径`  
5. **sessions** — 若讨论 >5 分钟或有多方案：当日日志 append 一小节（写 delta，不复制 STATUS 整表）  
6. **guidelines** — **默认不改**；仅当用户明确说「更新需求文档」或产品定义本身变了才改，并加修订说明  
7. **索引** — AGENTS「文档索引」链接仍有效

> 文首字段全集见 [DOC-FRONTMATTER.md](DOC-FRONTMATTER.md)。旧版 `> **状态：搁置**` 引用块逐步迁移为 YAML。

---

## 5. `docs/_archive/` 何时用

| 用 | 不用 |
|----|------|
| 整份 doc 被新文件 **取代**（旧文件名会误导） | 仅改几段 → 原地改 + 状态条即可 |
| 从 guidelines 迁出大段已作废方案 | design-demos（探索稿保留在原位） |
| sessions 永不进 archive（按日期永久保留） | 不要用 archive 当垃圾桶不写 STATUS |

命名：`docs/_archive/YYYY-MM-主题.md`，文首写 `取代者：` 链接。

---

## 6. 本项目已发生的例子

| 事件 | 类型 | 当时做法 | 规范化后应 |
|------|------|----------|------------|
| Awwwards 设计站参考 | A 推翻 | sessions「已否决」 | ✅ + STATUS 决策行（已有） |
| Logo 字体多轮 | B 搁置 | LOGO-FONT-BRIEF 文首搁置 | ✅ 范本 |
| 知识库立即全建 → 延后 | A 推翻 | STATUS + sessions | ✅；guidelines 未改（对） |
| benchmark 推荐 vs demo 试吃 | C 改写 | AGENTS 曾写死 benchmark | ✅ 已改指向 STATUS + DEMO-TASTING |
| `guidelines/改版方案` Hero 方案 C | 可能过时 | 未同步 SITE-MANUAL | ✅ guidelines 文首已加 may_be_stale |
