# AGENTS.md — AI 项目入口

> **新 AI 会话必须先读 [docs/STATUS.md](docs/STATUS.md)**（当前进度以 STATUS 为准），再按需查阅本文与 guidelines。

## 项目是什么

廖智强 Archie 的个人网站：**视频日记 + AI/网络优质内容归档**。  
Figma Make 导出为 Vite + React 项目，第一期**暖色复古出版物流**改版中。`design-demos/` 三版探索已完成，**整站方向待用户选定**（AI 曾推荐 benchmark，未锁定）。

- 人类读者：[README.md](README.md)
- 需求与分期：[guidelines/个人网站改版方案.md](guidelines/个人网站改版方案.md)
- 设计约束：[design-demos/_spec.md](design-demos/_spec.md)
- v0 探索项目：<https://v0.app/liaozq9-6964s-projects>

## 快速启动

```powershell
# React 站点（项目根目录）
npm i          # 首次或换电脑后
npm run dev    # 本地预览，勿双击根 index.html

# 设计稿对比（独立 HTML，不经 Vite）
cd design-demos
python -m http.server 8765
# 浏览器打开 http://127.0.0.1:8765/index.html
# 或直接双击 design-demos/benchmark.html
```

## 技术栈

| 层 | 选型 |
|----|------|
| UI | React 18 + TypeScript |
| 构建 | Vite 6 |
| 路由 | React Router 7 |
| 样式 | Tailwind 4 + `src/styles/theme.css` |
| 内容（目标） | Markdown + frontmatter（**现用** `src/app/data/posts.ts` mock） |
| 本地存储 | localStorage（反馈、浏览日历） |
| 配置 | `src/app/site.config.ts`（外链、Day1、头像模式） |

## 目录地图

```
src/app/pages/       # 页面组件
src/app/components/  # 布局、卡片、时钟等
src/app/data/        # posts.ts, tags.ts, mockPosts.ts
src/app/site.config.ts
design-demos/        # 三版 HTML 设计稿（benchmark 为选定方向）
guidelines/          # 需求与改版方案（稳定，少改）
docs/STATUS.md       # 活进度（每次收工更新）
docs/sessions/       # 详细计划 + 当日长文（见 _TEMPLATE.md）
public/assets/       # 静态资源
```

## 路由与功能

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | HomePage | Hero 双栏、北京时间、Day 计数、精选/时间线 |
| `/posts` | PostsListPage | 全量列表 + 标签筛选 |
| `/post/:id` | PostPage | AI 总结 → 知识卡片 → 视频/外链 → 字幕 |
| `/graph` | GraphPage | 标签共现知识图谱 |
| `/feedback` | FeedbackPage | 表单 → localStorage |
| `/about` | AboutPage | 简介、微信 QR 占位、人生阶段网格 |

## 已锁定决策（摘要）

- 视觉气质：暖奶油纸 + 复古博物点缀 + 单一暖 accent（具体 A/B/C demo **待用户选定**）
- 配色参考：纸 `#F6F0E2` / `#F5F0E8`，accent 赤陶 `#CC785C`（benchmark 方案）
- Day 1：`2026-03-14`（见 site.config.ts）
- 反馈：第一期仅 localStorage，无后端
- 框架：继续 Vite + React，第一期不迁 Next.js
- Git：**不上传** `node_modules/`、`dist/`

详情见 [guidelines/个人网站改版方案.md](guidelines/个人网站改版方案.md)。

## 本项目特有问题与解法

1. **根目录 `index.html` 双击空白** — 它是 React 入口，必须 `npm run dev`，不是设计稿。
2. **`design-demos/` 与 Vite 无关** — 独立 HTML；视觉探索改 demos，功能实现改 `src/`。
3. **字体** — 大陆环境用 `fonts.loli.net`，勿直连 Google Fonts（会阻塞或回退系统字体）。
4. **Figma 资源** — `vite.config.ts` 中 `figma:asset/` 别名解析。
5. **SPA 部署** — 深链 `/post/:id` 需 Vercel/Netlify rewrite 到 `index.html`。
6. **node_modules** — 本地开发必需；Git 只存 `package.json`，换机 `npm i` 重建。

## v0 / Cursor / GitHub 工作流

v0 是 [Vercel 的 AI 建站工具](https://v0.app)，可预览 UI、Sync GitHub、Deploy Vercel。与当前 Vite 项目**栈不同**，可并行试：

| 路径 | 做法 |
|------|------|
| A · v0 原型 | v0 出 UI → 满意后合并进 `src/` 或推 GitHub 分支 |
| B · Cursor 为主 | design-demos 定视觉 → 改 `src/`（当前主线） |
| C · v0 快速 demo | v0 Deploy Vercel 得临时 URL，确认后再迁入主仓 |

**GitHub 是中心枢纽**：源码 + `docs/STATUS.md` 同步；换设备 `git pull` → `npm i` → `npm run dev`。

### 收工 ritual（对用户）

> **收工更新**：更新 `docs/STATUS.md`；必要时归档 `docs/sessions/YYYY-MM-DD.md`；`git add` + `commit` + `push`。

### 新对话开场（对用户）

> 请先 `git pull`，读 `@docs/STATUS.md` 和 `@AGENTS.md`，继续 [任务]。

## 规划与文档：何时用 STATUS / sessions / Plan

| 场景 | 做法 |
|------|------|
| 日常进度、下一步、阻塞 | 只改 **docs/STATUS.md**（含**主任务 + 进度快照表 + 接下来**；保持约一页） |
| 详细计划、多方案讨论、步骤清单 | 写入 **docs/sessions/YYYY-MM-DD.md**（用 [_TEMPLATE.md](docs/sessions/_TEMPLATE.md)） |
| 子任务（Logo 字体、某块颜色、间距） | STATUS「进行中」加一行 → **Agent 直接改**，不新建 `.cursor/plans/` |
| 跨多天的大重构 | 可在 Plan 模式起草，**定稿后归档到 sessions**，仍以 STATUS 为入口 |
| 代码改了什么 | **git commit**，不重复写进 sessions |

**禁止：** 每个小需求都新建一份 `.cursor/plans/*.plan.md`（易重复、不进 Git、难追溯）。

## 给 AI 的工作约定

1. 动手改代码前先读 **docs/STATUS.md**；细节读当日 **docs/sessions/**。
2. 决策写入 STATUS「最近决策」；长方案写 sessions 对应小节。
3. 不要擅自改 **guidelines/** 除非用户明确要求。
4. 视觉改版对照用户**已选定**的 design-demo + **_spec.md**（选定前勿假定 benchmark）。
5. 收工：更新 STATUS → 补 sessions → 准备 commit message。
6. 不要提交 `node_modules`、`.env`、`dist/`。

## 文档索引

| 文件 | 用途 |
|------|------|
| [docs/STATUS.md](docs/STATUS.md) | 当前进度（日常唯一入口） |
| [docs/DEMO-TASTING-NOTES.md](docs/DEMO-TASTING-NOTES.md) | 八版 demo 试吃笔记（混搭用） |
| [docs/LOGO-FONT-BRIEF.md](docs/LOGO-FONT-BRIEF.md) | Logo 中文字标需求（确认版） |
| [docs/SUBTITLE-FORMAT.md](docs/SUBTITLE-FORMAT.md) | 字幕 TXT 排版规则（AI 处理源稿必读） |
| [docs/sessions/](docs/sessions/) | 详细计划与当日长文 |
| [docs/sessions/_TEMPLATE.md](docs/sessions/_TEMPLATE.md) | 日志结构模板 |
| [docs/GITHUB-SETUP.md](docs/GITHUB-SETUP.md) | GitHub 首次上传步骤 |
| [guidelines/个人网站改版方案.md](guidelines/个人网站改版方案.md) | 需求、站点地图、分期 |
| [guidelines/网站需求填空.md](guidelines/网站需求填空.md) | 原始需求 |
| [design-demos/_spec.md](design-demos/_spec.md) | 三版设计共同约束 |
