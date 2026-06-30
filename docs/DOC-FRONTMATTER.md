---
doc_type: project_doc
title: 文档文首 YAML 规范
status: active
canonical: docs/DOC-FRONTMATTER.md
revised_at: "2026-06-30 15:35:00"
timezone: Asia/Shanghai
---

## 修订记录（最新在上）

| 北京时间 | 变更 |
|----------|------|
| 2026-06-30 15:35:00 | 更正 Preview 说明；项目 `.vscode` 设 `frontMatter: hide` |
| 2026-06-30 15:30:00 | frontmatter 内禁止空行；去掉装饰行 |

---

# 文档文首 YAML 规范

灵感：Google [OKF](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/) 用 YAML 声明文件状态——**本项目不用 `okf:` 嵌套**，字段**平铺**在 frontmatter 顶层。

## 文件结构（固定顺序）

```
---
doc_type: ...
title: ...
（连续 key: value，中间不要空行）
---
## 修订记录（最新在上）
正文
```

## 编辑器 vs Preview（必读）

| 视图 | YAML 长什么样 |
|------|----------------|
| **源码（Markdown）** | 语法高亮：键名、字符串、布尔值颜色不同 |
| **侧边 Preview**（`Ctrl+Shift+V`） | 本项目已设 **`markdown.preview.frontMatter": "hide"`** → **不显示** frontmatter |
| **内联 Preview**（编辑器右上角 Preview 钮） | Cursor **已知问题**：可能仍把 frontmatter 当大字正文；**不读**上面的设置 |

**为何你看见一大块扎眼的 YAML？**

1. **新版 VS Code 默认** `frontMatter: "table"`，会把 `---` 里内容渲染成**顶部大表**（不是隐藏）。  
2. **Cursor 内联 Preview** 有时更糟：整块当普通大字文本输出。  
3. 之前 frontmatter **中间有空行** 时，还会被截断，后半段像「一级标题」——已禁止空行。

**你怎么做（任选）**

| 做法 | 效果 |
|------|------|
| **推荐** 用 **`Ctrl+Shift+V`** 开侧边预览 | 读本仓库 `.vscode/settings.json` 后应**看不到** frontmatter |
| 改 metadata 时看 **Markdown 源码** | 有 YAML 着色，最稳 |
| 坚持用右上角 **内联 Preview** | 可能仍显示；等 Cursor 修，或暂时忽略顶部块 |
| 在 frontmatter 上 **右键**（侧边预览里） | 部分版本可快速切 hide / table / codeBlock |

本项目 **`.vscode/settings.json`** 已写 `"markdown.preview.frontMatter": "hide"`。若侧边预览仍显示，重载窗口（`Ctrl+Shift+P` → Reload Window）。

**Preview 里没有 YAML 语法彩色** — 正常；彩色只在**源码**里。要彩色 Preview 需扩展（如 Markdown Preview Enhanced），非内置能力。

### frontmatter 书写硬规则

- **不要**在 `---` 块内写空行  
- **不要**写 `# ── 文档元数据 ──` 之类装饰行（无必要；`#` 在块外会被当成标题）  
- 行尾说明用 `docs/DOC-FRONTMATTER.md` 正文表查阅，**尽量别**在 frontmatter 里堆 `# 注释`  
- 嵌套（如 `latest_at:`）用 **2 空格缩进**，子项紧跟父键，中间仍不要空行

---

## 一、通用字段（几乎所有 doc 都有）

| 字段 | 英文 | 中文 | 必填 | 取值示例 |
|------|------|------|------|----------|
| `doc_type` | document type | 文档类型 | ✅ | 见下表 |
| `title` | title | 标题 | ✅ | `网站说明书` |
| `status` | status | 生命周期状态 | ✅ | `active` · `shelved` · `superseded` · `deprecated` |
| `canonical` | canonical path | 权威路径（本文件） | ✅ | `docs/STATUS.md` |
| `revised_at` | last revised | 最后修订时间 | ✅ | `"2026-06-30 15:06:15"` |
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

## 三、排版示例（对话语料）

```yaml
---
doc_type: dialogue_corpus
title: 知识库协作与网站说明书
status: active
canonical: knowledge/raw/dialogues/2026-06-26-知识库协作与网站说明书.md
revised_at: "2026-06-30 15:30:00"
timezone: Asia/Shanghai
speaker: Archie
corpus_use: nuwa_skill_distill
turn_count: 9
---
```

## 四、排版示例（搁置专题）

```yaml
---
doc_type: project_doc
title: Logo 中文字标需求
status: shelved
canonical: docs/LOGO-FONT-BRIEF.md
revised_at: "2026-06-30 15:30:00"
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

## 六、自检清单（AI 写 YAML 前过一遍）

- [ ] **`---` 块内无空行**（避免 Preview 截断 frontmatter）
- [ ] **无「文档元数据」装饰注释行**
- [ ] **无 `okf:` 嵌套** — 字段在顶层
- [ ] `revised_at` **到秒**，北京时间
- [ ] `doc_type` 与追加字段匹配（对话语料必有 `speaker: Archie`）
- [ ] `status: shelved` 必有 `resume_when`
- [ ] `status: superseded` 必有 `superseded_by`
- [ ] 修订记录表**最新行在最上**
- [ ] `AGENTS.md` **不加 YAML**（Cursor 工作区入口）

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

## 八、时间取值命令

```powershell
[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId((Get-Date), 'China Standard Time').ToString('yyyy-MM-dd HH:mm:ss')
```
