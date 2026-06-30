# AGENTS.md — AI 项目入口

> **新 AI 会话必须先读** [docs/STATUS.md](docs/STATUS.md)（进度）+ [docs/SITE-MANUAL.md](docs/SITE-MANUAL.md)（网站现状）+ **[docs/AI-COLLABORATION-CHARTER.md](docs/AI-COLLABORATION-CHARTER.md)**（协作根本规则 · **禁止删改缩写**），再按需查阅本文。

## 项目是什么

廖智强 Archie 的个人网站：**视频日记 + AI/网络优质内容归档**（知识存储 / 学习 / 检索）。  
Vite + React；第一期暖色复古出版物流改版中。`design-demos/` **D1–D5 案例库试吃**（D4–D5 未交付）；**整站视觉待选定/混搭** → 见 [STATUS](docs/STATUS.md) + [DEMO-TASTING-NOTES](docs/DEMO-TASTING-NOTES.md)（**勿假定**某一 demo 已锁定）。

- 人类读者：[README.md](README.md)
- 网站现状（线框）：[docs/SITE-MANUAL.md](docs/SITE-MANUAL.md)
- 原始需求（可能过时）：[guidelines/个人网站改版方案.md](guidelines/个人网站改版方案.md)
- 设计约束：[design-demos/_spec.md](design-demos/_spec.md)

## 快速启动

```powershell
npm i          # 项目根目录，首次或换电脑
npm run dev    # 本地预览；勿双击根 index.html

cd design-demos && python -m http.server 8765
# http://127.0.0.1:8765/index.html
```

## 技术栈

| 层 | 选型 |
|----|------|
| UI | React 18 + TypeScript |
| 构建 | Vite 6 · React Router 7 |
| 样式 | Tailwind 4 + `src/styles/theme.css` |
| 内容 | **现用** `src/app/data/posts.ts` · **规划** `content/` build 读 md |
| 知识生产 | **已建** `knowledge/raw/dialogues/` · **延后** `wiki/`、`content/` |
| 配置 | `src/app/site.config.ts` |

## 目录地图

「仓库里主要文件夹是干什么的」——左边是路径，右边是说明：

| 路径 | 是什么 |
|------|--------|
| `src/app/pages/` | **线上站**页面代码（首页、日记列表、详情页…） |
| `src/app/data/posts.ts` | 日记 **mock 数据**（将来换成 `content/*.md`） |
| `design-demos/` | **视觉探索** HTML（D1–D5），不是线上站，双击可预览 |
| `docs/STATUS.md` | 进度、下一步、最近决策 |
| `docs/SITE-MANUAL.md` | 给你看的网站说明书（几页、什么布局） |
| `docs/sessions/` | 某天讨论的长文记录 |
| `knowledge/raw/dialogues/` | **你的对话原文**（女娲蒸馏语料） |
| `docs/AI-COLLABORATION-CHARTER.md` | **协作根本规则**（复杂任务/对话/覆盖旧需求/读档优先级） |
| `guidelines/` | 早期需求文档（**可能过时**，以 SITE-MANUAL 为准） |

## 路由与功能

> 线框与 `[已实现]`/`[规划]` 以 **SITE-MANUAL** 为准。

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | HomePage | Hero、时钟/Day、精选、时间线 |
| `/posts` | PostsListPage | 列表 + 标签筛选 |
| `/post/:id` | PostPage | AI 总结 → 知识卡片 → 视频 → 字幕 |
| `/graph` | GraphPage | 标签共现；**规划** 同页双 Tab（标签 \| 文内链接） |
| `/feedback` | FeedbackPage | localStorage |
| `/about` | AboutPage | 简介、QR 占位 |

## 已锁定决策（摘要）

- 站点定位：知识存储 / 检索，非炫技 portfolio
- 纸色 / accent 参考范围：见 STATUS 与试吃笔记（**非**锁定某一 demo）
- Day 1：`2026-03-14`（`site.config.ts`）
- 反馈：localStorage，无后端
- 单数据源 md（规划）；访客**只读**，无网页改仓库
- Git：不上传 `node_modules/`、`dist/`

## 本项目特有问题

1. 根 `index.html` 须 `npm run dev`
2. `design-demos/` 独立于 Vite；视觉改 demos，功能改 `src/`
3. 字体用 `fonts.loli.net`，勿直连 Google Fonts
4. SPA 深链需部署 rewrite 到 `index.html`

## 给 AI 的工作约定

1. 改代码前读 **STATUS** + **SITE-MANUAL**；长讨论读当日 **sessions/**
2. 改 `src/` 路由/页面 → **同步 SITE-MANUAL**
3. 决策 → STATUS「最近决策」；覆盖旧需求 → [DOC-LIFECYCLE.md](docs/DOC-LIFECYCLE.md)
4. **勿擅自改** `guidelines/`（除非 Archie 明确要求）
5. 视觉以 **STATUS + DEMO-TASTING** 为准，选定前勿假定某一 demo
6. 收工：STATUS → 必要时 SITE-MANUAL → sessions → commit
7. 不提交 `node_modules`、`.env`、`dist/`

## 文档文首 YAML 与修订记录

> 细则：[docs/DOC-FRONTMATTER.md](docs/DOC-FRONTMATTER.md)（**无 `okf:` 前缀**；字段中英对照；按 `doc_type` 分字段）

- 会变的 `docs/*.md`、`knowledge/raw/dialogues/*.md`：**YAML frontmatter** + **`## 修订记录` 置顶**（最新在上）
- `revised_at`：**北京时间到秒**；取时见 DOC-FRONTMATTER §八
- `AGENTS.md` **不加 YAML**（Cursor 入口）；变更记入本节「修订记录」或 STATUS

## 新需求覆盖旧需求

> **完整版 → [AI-COLLABORATION-CHARTER.md](docs/AI-COLLABORATION-CHARTER.md) §三** · 细则 [DOC-LIFECYCLE.md](docs/DOC-LIFECYCLE.md)

- **默认不删**旧文件；改 YAML `status` + 修订记录 + 更新权威源
- 权威源分散：网站 → SITE-MANUAL · 进度 → STATUS · 专题 → `docs/主题-*.md`
- 冲突优先级：`src/` → SITE-MANUAL → STATUS → 专题 → guidelines

## 对话语料归档（女娲蒸馏用）

> **完整版 → [AI-COLLABORATION-CHARTER.md](docs/AI-COLLABORATION-CHARTER.md) §二**

**触发词**：`整理对话` · `归档语料` · `保存这次讨论`

| 规则 | 内容 |
|------|------|
| 路径 | `knowledge/raw/dialogues/YYYY-MM-DD-主题.md` |
| 读序 | **最新轮次在最上**（`#009` → `#001`） |
| 轮次 | 本会话内 Archie 第 N 次发言 = `#00N`，**从 1 递增**；不用 Cursor transcript 行号 |
| Archie | **原文完整**，不改写 |
| Assistant | **一行摘要**或省略 |
| 称谓 | 固定 **Archie** |
| 时间 | 实时归档：每条 `revised_at` 到秒；补档注明「无原始时间戳」 |
| 排版 | `## #00N · Archie` → 正文 → `### Assistant` → 一行；见 dialogues 范例 |

## 复杂任务与判断（通用 · 每会话必守）

> **完整版（背景 + 自检 + 警示）→ [docs/AI-COLLABORATION-CHARTER.md](docs/AI-COLLABORATION-CHARTER.md) §一**  
> 下文为每会话注入摘要；**改规则须先改宪章，禁止只删 AGENTS 不维护宪章。**

### 底层方法论（结论 · 不含步骤表）

**流程 1 · 复杂任务 / 信息是否充足**

- **先外化，再行动** — 最大风险是脑内模型不完整仍动手；复述与清单是把假设变成可检查的文字。
- **清单随任务变** — 「缺什么会做错」取决于具体任务；专用 Gate 只是某分支的清单，不是全局万能表。
- **完备度是责任声明** — 明确「还缺 X，缺了会导致 Y」比假装全懂重要；缺关键项时 **只规划不写码**。
- **默认小步试点** — 信息够时也先小范围验证，再铺开，便于复核与回滚。

**流程 2 · 复杂判断 / 决策可复核**

- **判断要留证据链** — 好结论能回答「为何选 A 不选 B」，日后可对照事实检验。
- **「不做 / 延后」是合法选项** — 与「现在做」同等认真比较，避免为动而动。
- **量化是对抗直觉偏误** — 自设维度与权重不是官僚流程，是让双方对同一标准说话。
- **推荐与假设分离** — 写清依赖哪些未验证前提；前提不成立时推荐应如何变。
- **时机是决策的一部分** — 「对不对」与「现在做对不对」是两道题；分期本身是可复核的判断。

### 何时视为「复杂任务」（自动识别，命中任一即启用）

- 架构 / 数据流 / 多系统整合（如网站 + Obsidian + OKF）
- 新增路由或改变信息架构
- 不可逆或高返工成本（内容格式、目录大规模迁移）
- Archie 说「探讨」「不确定什么时候做」「你定标准」
- 需求跨多条线（视觉 + 内容 + 知识库同时动）

### 复杂任务四步（信息是否够用）

1. **复述需求** — 用自己的话写清目标、约束、非目标；Archie 未反对视为可继续；**应写入 AGENTS 协作节或对话归档，帮 Archie 理清思路**。
2. **自定信息清单** — 按任务类型列 5～10 条「没有则做不对」的信息（不限于 Gate；Gate 0–3 仅用于**知识库×网站**分支，见 STATUS）。
3. **完备度声明** — 写明：已满足 / 仍缺 / 缺了会怎样；**缺关键项则只规划不写代码**。
4. **执行或归档** — 动手则小步试点；仅探讨则写入 `docs/sessions/` + STATUS「最近决策」。

### 复杂判断四步（结论要可复核）

1. 至少 **2 个选项**（含「不做 / 延后」）。
2. **可量化标准** — 自列 3～6 个维度 + 权重或 1–5 分表（任务相关，非固定模板）。
3. **推荐 + 假设** — 写明依赖哪些未验证假设。
4. **时机判断** — 若涉及分期：现在做 / 视觉锁定后做 / 内容管道前做，并给一句理由。

### 上下文注入优先级

> **完整版 → [AI-COLLABORATION-CHARTER.md](docs/AI-COLLABORATION-CHARTER.md) §四**

见 [.cursor/rules/project-conventions.mdc](.cursor/rules/project-conventions.mdc)（P0 gotchas+AGENTS → P1 STATUS+SITE-MANUAL+宪章 → P2 专题 doc → P3 guidelines）

## 规划与文档分工

| 场景 | 写哪 |
|------|------|
| 进度、下一步 | STATUS.md |
| 网站线框、功能现状 | SITE-MANUAL.md |
| 多方案长讨论 | sessions/YYYY-MM-DD.md |
| 协作硬约束 | gotchas.mdc + 本文件 |
| 专题细则 | docs/主题-*.md |
| 原始产品需求 | guidelines/（少改） |

**禁止**：子任务新建 `.cursor/plans/*.plan.md`

### 收工 ritual

更新 STATUS（含 `revised_at` 到秒）→ 必要时 SITE-MANUAL / YAML / 修订记录 → sessions delta → commit（Archie 要求时 push）

### 新对话开场（对 Archie）

> 请先 `git pull`，读 `@docs/STATUS.md` + `@docs/SITE-MANUAL.md`，继续 [任务]。

## 文档索引

| 文件 | 用途 |
|------|------|
| [docs/AI-COLLABORATION-CHARTER.md](docs/AI-COLLABORATION-CHARTER.md) | **协作根本规则（宪章）· Archie 优先备份** |
| [docs/STATUS.md](docs/STATUS.md) | 进度、阻塞、最近决策 |
| [docs/SITE-MANUAL.md](docs/SITE-MANUAL.md) | 给人看的网站说明书 + ASCII 线框 |
| [docs/DOC-FRONTMATTER.md](docs/DOC-FRONTMATTER.md) | YAML 文首 + 修订记录规范 |
| [docs/DEMO-TASTING-NOTES.md](docs/DEMO-TASTING-NOTES.md) | demo 试吃与混搭 |
| [docs/SUBTITLE-FORMAT.md](docs/SUBTITLE-FORMAT.md) | 字幕排版 |
| [docs/LOGO-FONT-BRIEF.md](docs/LOGO-FONT-BRIEF.md) | Logo（搁置） |
| [docs/sessions/](docs/sessions/) | 当日长文 |
| [guidelines/](guidelines/) | 原始需求（可能过时） |
| [design-demos/_spec.md](design-demos/_spec.md) | demo 共同约束 |

## 修订记录（AGENTS）

| 北京时间 | 变更 |
|----------|------|
| 2026-06-30 15:11:50 | 新建 **AI-COLLABORATION-CHARTER.md** 完整宪章；AGENTS 链宪章、禁止再删复杂任务节 |
| 2026-06-30 15:06:15 | 恢复复杂任务全文；对话 #轮次倒序 |
| 2026-06-26 23:59:59 | SITE-MANUAL 入口；复杂任务/判断；对话触发词 |
