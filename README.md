# 廖智强 Archie · 个人网站

<p align="center">
  <strong>记录就是生命的延续</strong><br>
  <em>Recording is the continuation of life</em>
</p>

<p align="center">
  视频日记 + AI / 网络优质内容归档 · 知识存储 · 学习 · 检索
</p>

<p align="center">
  <a href="https://github.com/Archie-Liao/archie-personal-site">GitHub</a>
  ·
  <a href="https://space.bilibili.com/24473971">B站</a>
  ·
  <a href="docs/STATUS.md">进度</a>
  ·
  <a href="docs/SITE-MANUAL.md">站说明书</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React 18">
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite 6">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind 4">
  <img src="https://img.shields.io/badge/status-P1%20改版中-CC785C" alt="P1 改版中">
</p>

---

## 这是什么

个人知识站点的 **production 代码库**（非纯静态页）。第一期（P1）在做**暖色复古出版物流**视觉混搭：多版 design demo 试吃 → 迁入 `src/` 线上站。

| | |
|---|---|
| **线上形态** | Vite SPA · 六页 · 静态 build |
| **内容** | 视频日记期数 + 外链收藏 + AI 总结 / 导图 / 字幕 |
| **协作** | Cursor + `AGENTS.md` + 分层文档治理 |
| **部署** | 尚未上线（本地 `npm run dev` 预览） |

---

## 功能一览

| 页面 | 路径 | 要点 |
|------|------|------|
| 首页 | `/` | Hero · Day 计数 · 精选三卡 · 发布密度图 · 时间线 |
| 日记列表 | `/posts` | 左栏按月索引 + 右栏 spread 预览 · tag 球 · 搜索 `?q=` |
| 详情 | `/post/:id` | AI 总结 · 可拖思维导图 · 视频/字幕 · tufte 边注 |
| 知识图谱 | `/graph` | 标签共现力导向图 |
| 关于 | `/about` | 简介 · 人生阶段 · 站点统计带 |
| 反馈 | `/feedback` | localStorage 暂存 |

**视觉参考**：纸底 `#F6F0E2` · accent `#CC785C` · 设计探索见 [`design-demos/`](design-demos/)（`benchmark` / `turley` / `tufte` 等）。

---

## 快速开始

**环境**：Node.js 18+ · Windows / macOS / Linux

```powershell
git clone https://github.com/Archie-Liao/archie-personal-site.git
cd archie-personal-site
npm i
npm run dev
```

浏览器打开终端显示的地址（常见 `http://127.0.0.1:5173`）。

> **不要**双击根目录 `index.html` — 会空白；必须走 Vite 开发服务器。

```powershell
npm run build    # 产出 dist/（勿提交 Git）
```

**设计稿预览**（独立于 Vite）：

```powershell
cd design-demos
python -m http.server 8765
# http://127.0.0.1:8765/index.html
```

---

## 仓库结构

```
├── src/app/              # 线上站：页面、组件、mock 数据
│   ├── pages/            # Home · Posts · Post · Graph · About · Feedback
│   ├── components/       # Logo · 边注 · 导图 · tag 球 …
│   └── data/posts.ts     # 当前内容（规划迁 content/*.md）
├── design-demos/         # 视觉探索 HTML（D1–D5 试吃库）
├── docs/                 # STATUS · SITE-MANUAL · 混搭清单 · sessions
├── knowledge/raw/        # 对话原文（女娲语料）
├── public/               # 静态资源 · Logo 指纹图
└── AGENTS.md             # AI 协作入口（Cursor 工作区规则）
```

---

## 开发进度

当前：**P1 改版 · 阶段 C polish 进行中**（B 主块已「先这样」）

详见 [`docs/STATUS.md`](docs/STATUS.md) · 当日叙事 [`docs/sessions/2026-07-08.md`](docs/sessions/2026-07-08.md)

| 阶段 | 状态 |
|------|------|
| Demo 试吃 D1–D5 | ✅ |
| A 六页骨架 | ✅ |
| B 视觉填皮 | ✅ 主块 |
| C 动效 / 收尾 | 🔄 |
| P2 content/md + 双链图谱 | 规划 |
| 部署 | 未开始 |

---

## 文档索引

| 文档 | 给谁看 |
|------|--------|
| [docs/STATUS.md](docs/STATUS.md) | 进度 · 下一步 · 最近决策 |
| [docs/SITE-MANUAL.md](docs/SITE-MANUAL.md) | 网站线框与路由（改页面必同步） |
| [docs/P1-MIX-MATCH-LIST.md](docs/P1-MIX-MATCH-LIST.md) | P1 视觉施工图 |
| [AGENTS.md](AGENTS.md) | AI / 新会话协作入口 |
| [docs/GITHUB-SETUP.md](docs/GITHUB-SETUP.md) | **Git push · 代理配置** |
| [design-demos/](design-demos/) | 视觉 demo 案例库 |

---

## Git push 与代理（国内常见）

浏览器能开 GitHub，**不等于** `git push` 也走代理。需单独配置：

```powershell
# 把 10808 换成你 v2rayN 左下角 mixed 端口（本机已配可跳过）
git config --global http.https://github.com.proxy http://127.0.0.1:10808
git config --global https.https://github.com.proxy http://127.0.0.1:10808

git ls-remote https://github.com/Archie-Liao/archie-personal-site.git HEAD   # 验证
git push
```

完整说明、报错对照、SSH 备选 → **[docs/GITHUB-SETUP.md](docs/GITHUB-SETUP.md)**

---

## 协作（Cursor）

新会话建议：

```text
git pull
读 docs/STATUS.md + docs/SITE-MANUAL.md
继续 [任务]
```

收工：对 AI 说 **「收工更新 STATUS 并 push」**。

---

## 许可与说明

个人项目 · 内容版权归作者。`node_modules/`、`dist/`、`.env` 不入库；克隆后 `npm i` 重建依赖。
