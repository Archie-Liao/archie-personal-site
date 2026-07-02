---

doc_type: project_doc
title: 文档文首 YAML 规范
status: active
canonical: docs/DOC-FRONTMATTER.md
revised_at: "2026-07-02 11:15:49"
timezone: Asia/Shanghai

---

## 修订记录（最新在上）

| 北京时间 | 变更 |
|----------|------|
| 2026-07-02 11:15:49 | 更正 Preview 空行规则（首尾各空一行）；补 `revised_at` 规则；区分 Skill YAML |
| 2026-07-01 18:30:49 | （已作废）误写「字段间禁止空行」 |
| 2026-06-30 18:23:09 | 恢复 `---` YAML；Preview 刻意显示 |

---

# 文档文首 YAML 规范

灵感：Google [OKF](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/) 用 YAML 声明文件状态——**本项目不用 `okf:` 嵌套**，字段**平铺**在 frontmatter 顶层。

## 零、文首 YAML 是干什么的

| 作用 | 说明 |
|------|------|
| **状态声明** | 这文件还生效吗？`active` / `shelved` / `superseded`；搁置何时重启 |
| **权威路径** | `canonical` — 同名话题以哪份为准 |
| **最后修订** | `revised_at` + 下方修订记录表（给你和 AI 扫变更） |
| **类型分字段** | `doc_type` 决定要不要 `speaker`、`may_be_stale` 等（见 §二） |
| **生命周期** | 配合 [DOC-LIFECYCLE.md](DOC-LIFECYCLE.md) — 新需求覆盖旧需求时**改 status，不静默删文** |

**不做什么**：不驱动网站前端；不替代 STATUS/SITE-MANUAL 正文；`AGENTS.md` **不加** YAML（Cursor 工作区入口例外）。

### 与 Cursor **Skill** 文首 YAML 的区别（重要）

| | **Skill 的 `SKILL.md`** | **本仓库 `docs/*.md` 文首 YAML** |
|---|-------------------------|----------------------------------|
| **frontmatter 里有什么** | `name` + **`description`（触发场景）** | `doc_type` / `status` / `revised_at` 等 **文档状态** |
| **Agent 会不会自动读** | Skill 列表会注入 **description**，用于「该不该用这个技能」；**全文**通常在你 `@` 技能或任务匹配时才读 | **不会**因 YAML  alone 自动注入全文；要读须 **打开文件**、被 **gotchas/AGENTS 点名**，或你 **`@docs/...`** |
| **类似「使用场景」的字段** | ✅ `description` 就是 | ❌ 本项目 doc **没有**等价字段；用途看 `doc_type` + `authority` + 标题 |
| **你的理解** | ✅ 大体对：Skill 靠 description 做路由，不必每次读完 SKILL | ⚠️ **不要套用**到项目 doc — 我们的 YAML 是 **给你我扫状态**，不是 Cursor 的 skill 路由机制 |

之前没写清 Skill 对比，是遗漏；二者 **格式相似、机制不同**。

### AI 怎么「读」项目 doc 的 YAML

- 读文件时当普通文本解析 `key: value`；无专用 build 步骤。
- **`---` 后、闭合 `---` 前各空一行**：只影响 Preview 样式；**不影响** AI 识别。
- **字段之间可空行**（你已验证 Preview 正常）；以前「禁止字段间空行」是误判，已作废。
- 决策时看 `status` / `may_be_stale` / `latest_at` 等字段。

## 文件结构（固定顺序）

```
---
（此处空一行 — Cursor Preview：字段不易被渲染成粗体）
doc_type: ...
title: ...
（字段之间可空行 — 不影响 Preview）
（此处空一行）
---
## 修订记录（最新在上）
正文
```

## Preview 里 YAML 怎么显示

**元数据给你（Archie）和 AI 都要读** — 刻意不隐藏。

| 视图 | 表现 |
|------|------|
| **源码** | YAML 语法高亮 |
| **Preview** | 显示 frontmatter；**首尾各空一行** 可改善字段粗体问题 |

### 书写规则（Preview 版 · 2026-07-02）

- **必须**：开 `---` **后**空一行；闭 `---` **前**空一行
- **允许**：字段与字段之间空行（排版可读；不影响 Preview）
- **不要**：在 YAML 块里写 `# ── 文档元数据 ──` 装饰行
- 嵌套（`latest_at:`）用 **2 空格缩进**

## 时间标注规则（`revised_at` 与修订记录表）

**写在本文件 §八命令 + 此处规则；gotchas 要求北京时间到秒。**

| 规则 | 说明 |
|------|------|
| **何时写** | 每次 **实质修改** 该文件内容时（不是只改错别字可酌情） |
| **取值** | 修改完成时刻的 **电脑北京时间，精确到秒** |
| **怎么取** | 运行 §八 PowerShell 命令；**禁止**抄上一轮对话里的旧时间 |
| **两处同步** | frontmatter 的 `revised_at` = 修订记录表 **最上一行** 的时间 |
| **修订记录表** | 最新一行在最上；写 **人话摘要**（改了什么） |

**我（AI）之前乱标时间的原因**：用了更早一条 shell 结果（如 18:30:49），而不是 **落笔保存当下** 再跑一次命令 — 这是执行错误，不是规则允许。

---

## 一、通用字段（几乎所有 doc 都有）

| 字段 | 英文 | 中文 | 必填 | 取值示例 |
|------|------|------|------|----------|
| `doc_type` | document type | 文档类型 | ✅ | 见下表 |
| `title` | title | 标题 | ✅ | `网站说明书` |
| `status` | status | 生命周期状态 | ✅ | `active` · `shelved` · `superseded` · `deprecated` |
| `canonical` | canonical path | 权威路径（本文件） | ✅ | `docs/STATUS.md` |
| `revised_at` | last revised | 最后修订时间 | ✅ | `"2026-07-02 11:15:49"` |
| `timezone` | timezone | 时区 | ✅ | `Asia/Shanghai` |

**`status` 含义**

| 值 | 中文 | 何时用 |
|----|------|--------|
| `active` | 现行有效 | 默认 |
| `shelved` | 搁置 | 暂停，日后可能续做 |
| `superseded` | 已被取代 | 旧方案，有新权威源 |
| `deprecated` | 废弃 | 不再使用，仅留档 |

---

## 二、按 `doc_type` 追加字段

| doc_type | 中文 | 追加字段 | 说明 |
|----------|------|----------|------|
| `status` | 项目进度 | `authority` | 固定写 `进度与最近决策` |
| `site_manual` | 网站说明书 | `authority` | 固定写 `网站现状与线框` |
| `project_doc` | 专题规范 | `authority` | 如 `需求覆盖` · `YAML规范` |
| `dialogue_corpus` | 对话语料 | `speaker` · `corpus_use` · `turn_count` | 女娲蒸馏；`speaker` 固定 `Archie` |
| `guideline` | 原始需求 | `may_be_stale` · `latest_at` | `latest_at` 指向现行文档路径 |
| `session_log` | 当日日志 | `session_date` | `YYYY-MM-DD` |

### 按 `status` 再追加（与 doc_type 正交）

| status | 追加字段 | 中文 |
|--------|----------|------|
| `shelved` | `shelved_reason` | 搁置原因 |
| `shelved` | `resume_when` | 何时重启 |
| `superseded` | `superseded_by` | 新权威源路径 |
| `superseded` | `superseded_at` | 取代时间（到秒） |
| `deprecated` | `deprecated_reason` | 废弃原因 |
| `deprecated` | `latest_at` | 现行见哪（路径或 map） |

---

## 三、排版示例（带 Preview 空行）

```yaml
---

doc_type: dialogue_corpus
title: 知识库协作与网站说明书
status: active
canonical: knowledge/raw/dialogues/2026-06-26-知识库协作与网站说明书.md
revised_at: "2026-07-02 11:15:49"
timezone: Asia/Shanghai
speaker: Archie
corpus_use: nuwa_skill_distill
turn_count: 15

---
```

## 四、排版示例（搁置专题）

```yaml
---

doc_type: project_doc
title: Logo 中文字标需求
status: shelved
canonical: docs/LOGO-FONT-BRIEF.md
revised_at: "2026-07-02 11:15:49"
timezone: Asia/Shanghai
shelved_reason: 多轮 v3–v7 未锁定；先推进整站视觉
resume_when: 整站 demo 混搭锁定后
latest_demo: design-demos/logo-fonts/compare-v7-final.html

---
```

## 五、排版示例（可能过时的 guideline）

```yaml
---

doc_type: guideline
title: 个人网站改版实施计划
status: active
may_be_stale: true
canonical: guidelines/个人网站改版方案.md
revised_at: "2026-03-01 00:00:00"
timezone: Asia/Shanghai
latest_at:
  site_layout: docs/SITE-MANUAL.md
  progress: docs/STATUS.md
  visual: docs/DEMO-TASTING-NOTES.md

---
```

---

## 六、自检清单（AI 改 doc 前过一遍）

- [ ] **`---` 后、闭 `---` 前各空一行**（Preview）
- [ ] 字段间空行 **允许**
- [ ] **`revised_at` = 修订表首行 = 保存前刚跑的北京时间（到秒）**
- [ ] **无 `okf:` 嵌套**
- [ ] `doc_type` 与追加字段匹配
- [ ] `AGENTS.md` **不加 YAML**

## 七、哪些文件必须有 YAML

| 路径 | doc_type |
|------|----------|
| `docs/STATUS.md` | `status` |
| `docs/SITE-MANUAL.md` | `site_manual` |
| `docs/AI-COLLABORATION-CHARTER.md` | `project_doc` |
| `docs/DOC-*.md` | `project_doc` |
| `docs/LOGO-FONT-BRIEF.md` | `project_doc` |
| `knowledge/raw/dialogues/*.md` | `dialogue_corpus` |
| `guidelines/*.md` | `guideline` |

## 八、时间取值命令（保存前运行）

```powershell
[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId((Get-Date), 'China Standard Time').ToString('yyyy-MM-dd HH:mm:ss')
```
