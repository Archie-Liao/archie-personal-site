# 项目状态

> 最后更新：2026-06-23 · 维护：Archie / AI  
> **新 AI 会话请先读本文 + [AGENTS.md](../AGENTS.md)**

## 当前阶段

第一期改版 · 视觉方向 **benchmark** · 文档体系已建立 · **待首次 push GitHub**（本地 commit `49910b2` 已完成）

## 进度快照

| 模块 | 状态 | 备注 |
|------|------|------|
| 设计方向探索 | 完成 | `design-demos/` 三版 HTML，选定 benchmark |
| 首页 Hero / 主题 | 进行中 | React 已按 benchmark 移植基础样式 |
| 日记列表 `/posts` | 已有 | mock 数据，待视觉微调 |
| 详情页 `/post/:id` | 已有 | 长页滚动结构 |
| 知识图谱 `/graph` | 已有 | v1 标签共现 |
| 反馈 `/feedback` | 已有 | localStorage |
| 关于 `/about` | 已有 | QR 占位 |
| Markdown 内容管道 | 未开始 | 仍用 `src/app/data/posts.ts` |
| Git / GitHub | 进行中 | 本地已 commit；待建远程仓库并 push（见 [GITHUB-SETUP.md](GITHUB-SETUP.md)） |
| 部署 Vercel | 未开始 | 无 vercel.json |

## 下一步（按优先级）

1. 在 GitHub 创建空仓库并完成首次 `git push`
2. 对照 `design-demos/benchmark.html` 微调 React 首页排版与间距
3. 头像真图 / 微信 QR 替换（`site.config.ts`）
4. 第二期：Markdown 内容目录 + 批量导入脚本

## 阻塞 / 待你决定

- [ ] GitHub 远程仓库名称（建议 `archie-personal-site` 或 `personal-website`）
- [ ] 头像何时从 illustration 切到 photo
- [ ] v0 项目是否 Connect 同一 GitHub 仓库（可暂缓）

## 最近决策

- 2026-06-23：建立项目上下文文档体系（AGENTS.md + docs/STATUS.md + sessions）
- 2026-06-23：设计方向选 **benchmark**（非 roulette / designer）
- 2026-06-23：继续 Vite + React，不迁 Next.js（见 guidelines/个人网站改版方案.md）
- 2026-06-23：**不上传** node_modules，依赖 `package.json` + `npm i`

## 今日会话摘要

### 2026-06-23

- **做了**：三版 design-demos、修复对比页 file:// 空白、项目文档体系方案落地
- **未做**：GitHub 远程 push、React 首页细节对齐 benchmark
- **下次从这里继续**：完成 `git push` → 首页 benchmark 微调
