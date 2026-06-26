# 项目状态

> 最后更新：2026-06-26 · 维护：Archie / AI  
> **新 AI 会话请先读本文 + [AGENTS.md](../AGENTS.md)**  
> 详细计划与当日长文 → [docs/sessions/](sessions/)

## 主任务（仅 1 条）

**第一期改版**：视觉 + 页面内容（Vite + React，暖色复古出版物流）

## 进度快照

| 模块 | 状态 | 备注 |
|------|------|------|
| 设计方向探索 | 进行中 | **D1 press v1 锁定** · **D2 monocle v1** · **D3 midcentury v0**；D4–D5 未开始 |
| 项目文档 / Git | 完成 | 已 push [archie-personal-site](https://github.com/Archie-Liao/archie-personal-site) |
| 首页 Hero / 整站视觉 | **进行中** | 五版案例库试吃中；选定/混搭后迁入 `src/` |
| 日记列表 `/posts` | 已有 | mock 数据，待视觉微调 |
| 详情页 `/post/:id` | 进行中 | 封面外链 + **真实 TXT 字幕 ep86–99** 已入库；ep86–93 待加 posts 条目 |
| 知识图谱 `/graph` | 已有 | v1 标签共现 |
| 反馈 `/feedback` | 已有 | localStorage |
| 关于 `/about` | 已有 | QR / 九宫格占位 |
| Logo 中文字标 | **搁置** | v7 小样未锁定；React 暂保留刀隶 → [compare-v7-final.html](../design-demos/logo-fonts/compare-v7-final.html) |
| Markdown 内容管道 | 未开始 | 第二期 |
| 部署 Vercel | 未开始 | |

## 接下来（按优先级）

1. **试吃 D3** [`midcentury.html`](../design-demos/midcentury.html) + 填 [`DEMO-TASTING-NOTES.md`](DEMO-TASTING-NOTES.md) → 反馈后 **D3 v1** 或 **D4 turley**
2. 选定 A/B/C 或五版混搭 → 微调 `src/styles/theme.css` + 首页 Hero / 全站组件
3. 为 ep86–93 补 `posts.ts` 条目（字幕已就绪）
4. 校对 `public/subtitles/ep*.txt`（[SUBTITLE-FORMAT.md](SUBTITLE-FORMAT.md)）
5. ep095 AI 摘要待 Archie 补全

## 待你决定

- [ ] **整站 demo**：A/B/C 或 D1–D5 混搭（**当前主阻塞**）
- [ ] 头像 illustration → photo（可暂缓）
- [ ] Logo 字体（已搁置，非阻塞）

## 最近决策

- 2026-06-26：**D3 midcentury.html v0**（Saul Bass 海报学校 · Checkpoint 1 已写入文件头）
- 2026-06-26：**D2 monocle.html v1** + cover-lead 裁切修复
- 2026-06-26：**D1 press.html v1 锁定**；`_spec.md` 三层约束 + `DEMO-TASTING-NOTES.md`
- 2026-06-25：Logo v7 终选页留档未锁定；字幕 TXT 管道 + [SUBTITLE-FORMAT.md](SUBTITLE-FORMAT.md)
- 2026-06-24：协作规则 STATUS + sessions

## 今日摘要（2026-06-26 收工）

- 推送 **D1 press / D2 monocle / D3 midcentury** 三版 HTML demo + BHL 博物图素材
- `_spec.md` 案例库三层约束；`DEMO-TASTING-NOTES.md` 试吃模板
- React：详情页字幕 TXT、视频封面外链、Logo 刀隶、ep94–99 数据对齐
- 详日志 → [sessions/2026-06-25.md](sessions/2026-06-25.md)
