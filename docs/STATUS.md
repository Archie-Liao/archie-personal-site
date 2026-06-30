---
doc_type: status
title: 项目状态
status: active
canonical: docs/STATUS.md
authority: 进度与最近决策
revised_at: "2026-06-30 17:14:09"
timezone: Asia/Shanghai
---

## 修订记录（最新在上）

| 北京时间 | 变更 |
|----------|------|
| 2026-06-30 17:14:09 | 收工：sessions/2026-06-30；Preview 设置；宪章 frontmatter 修复 |
| 2026-06-30 15:35:00 | DOC-FRONTMATTER Preview 说明；`.vscode` frontMatter hide |
| 2026-06-30 15:24:38 | 宪章增补 §五–§八 |
| 2026-06-30 15:06:15 | YAML 去 okf；AGENTS 复杂任务节恢复 |
| 2026-06-30 14:37:56 | YAML 文首；DOC-FRONTMATTER |
| 2026-06-26 23:59:59 | SITE-MANUAL、DOC-LIFECYCLE、dialogues 首条 |

# 项目状态

> **新 AI 会话请先读本文 + [AGENTS.md](../AGENTS.md) + [SITE-MANUAL.md](SITE-MANUAL.md) + [AI-COLLABORATION-CHARTER.md](AI-COLLABORATION-CHARTER.md)**  
> 详细计划 → [docs/sessions/](sessions/) · 今日日志 → [2026-06-30.md](sessions/2026-06-30.md)

## 主任务（仅 1 条）

**第一期改版**：视觉 + 页面内容（Vite + React，暖色复古出版物流）

## 进度快照

| 模块 | 状态 | 备注 |
|------|------|------|
| **协作宪章** | **完成** | [`AI-COLLABORATION-CHARTER.md`](AI-COLLABORATION-CHARTER.md) — Archie 优先单独备份 |
| **文档 YAML 规范** | **完成** | [`DOC-FRONTMATTER.md`](DOC-FRONTMATTER.md)；`.vscode` Preview 隐藏 frontmatter |
| **文档生命周期** | **完成** | [`DOC-LIFECYCLE.md`](DOC-LIFECYCLE.md) |
| **网站说明书** | **完成** | [`SITE-MANUAL.md`](SITE-MANUAL.md) ASCII 线框 |
| 设计方向探索 | 进行中 | D1 press v1 · D2 monocle v1 · D3 midcentury v0；**D4–D5 未交付** |
| 项目文档 / Git | 完成 | [archie-personal-site](https://github.com/Archie-Liao/archie-personal-site) |
| 首页 Hero / 整站视觉 | **阻塞** | 五版试吃；[`DEMO-TASTING-NOTES.md`](DEMO-TASTING-NOTES.md) **待填** → 选定后迁入 `src/` |
| 日记列表 `/posts` | 已有 | mock 数据 |
| 详情页 `/post/:id` | 进行中 | 字幕 ep86–99；ep86–93 待 posts 条目 |
| 知识图谱 `/graph` | 已有 | 标签共现；规划双 Tab |
| 知识库 × 网站 | **部分启动** | `knowledge/raw/dialogues/` 已建（#011）；wiki/content 延后 |
| 对话语料 | **已启动** | 触发词：整理对话 / 归档语料 |
| 反馈 `/feedback` | 已有 | localStorage |
| 关于 `/about` | 已有 | 占位 |
| Logo 中文字标 | **搁置** | [LOGO-FONT-BRIEF.md](LOGO-FONT-BRIEF.md) |
| Markdown 管道 | 未开始 | 第二期 |
| 部署 Vercel | 未开始 | |

## 接下来（按优先级）

### 你（Archie）

1. **试吃 D3** [`midcentury.html`](../design-demos/midcentury.html) → 填 [`DEMO-TASTING-NOTES.md`](DEMO-TASTING-NOTES.md)
2. 等 D4/D5 交付后继续试吃 → **定混搭**（从各版「偷」元件，非整页复制）
3. 选定后通知 AI → 迁入 `src/styles` + 组件

### AI / 协作

1. 交付 D4 `turley.html`、D5 `tufte.html` v0（D1/D2 parity）
2. 改页面时同步 `SITE-MANUAL.md`；改协作规则**先改宪章**
3. `design-demos/index.html` 八版对比表（待做）

### 可延后

- ep86–93 补 `posts.ts`、字幕校对、ep095 AI 摘要
- Logo 字体续探

## 待你决定

- [ ] **整站 demo 混搭**（**主阻塞**）→ 见 DEMO-TASTING-NOTES
- [ ] 头像 illustration → photo（可暂缓）
- [ ] Logo 字体（搁置）

## 最近决策

- 2026-06-30 17:14:09：收工更新 STATUS + sessions/2026-06-30；Preview 用侧边预览 + 工作区 hide
- 2026-06-30 15:11:50：**宪章**为协作方法论完整源；禁止 AI 删压复杂任务节
- 2026-06-30 15:24:38：宪章增补 §五–§八（落盘、收工、知识库 IA、mdc 等）
- 2026-06-30 14:37:56：对话归档规则；DOC-FRONTMATTER；guidelines 可能过时
- 2026-06-26 23:59:59：DOC-LIFECYCLE；SITE-MANUAL；知识库 wiki/content 延后

## 今日摘要（2026-06-30）

- **主线交付**：协作宪章 + YAML 规范 + 对话语料 #011 + Preview 修复
- **建站未推进**：demo 试吃仍阻塞；下一步 D3 试吃 → D4/D5 交付 → 混搭 → 迁 `src/`
