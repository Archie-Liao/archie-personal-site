---

doc_type: status
title: 项目状态
status: active
canonical: docs/STATUS.md
authority: 进度与最近决策
revised_at: "2026-07-03 17:55:00"
timezone: Asia/Shanghai

---

## 修订记录（最新在上）

| 北京时间 | 变更 |
|----------|------|
| 2026-07-03 17:55:00 | 收工：project-context Skill v2 + 文档架构索引；sessions/2026-07-03 补 §7 |
| 2026-07-03 11:55:00 | **D4 事故复盘**；新增 `DEMO-BUILD-GATE.md` + gotchas 门控 |
| 2026-07-03 11:45:00 | **D4 turley v0** 交付 · Checkpoint 1 已确认 · Checkpoint 2 待审 |
| 2026-07-03 10:05:13 | **P1/P2 拍板**；roulette 跳过；思维模型信源改本地 md；补「主线流程」 |
| 2026-07-02 18:16:45 | 试吃 6/8 版；站点功能盘点 §5 旅程；COMPLEX-TASK-GATE；对话 #016–#020 |
| 2026-06-30 18:23:09 | 恢复 `---` YAML；Preview 可见元数据 |

# 项目状态

> **新 AI 会话请先读本文 + [AGENTS.md](../AGENTS.md) + [SITE-MANUAL.md](SITE-MANUAL.md) + [AI-COLLABORATION-CHARTER.md](AI-COLLABORATION-CHARTER.md)**  
> 详细计划 → [docs/sessions/](sessions/) · 近期：[2026-07-03.md](sessions/2026-07-03.md) · [2026-07-01.md](sessions/2026-07-01.md)

## 主任务（仅 1 条）

**第一期改版（P1）**：视觉混搭 + 六页 + 旅程 **B/C + A 筛选阅读**（**不上**站内助手）→ 迁入 `src/`

## 主线流程（防失焦 · 新会话先对这条）

```text
① AI 交付 D4 turley + D5 tufte（v0→你点头→v1，动效样例要多）
② 你试吃 D4/D5 → 填 DEMO-TASTING-NOTES（roulette 已跳过）
③ 一起填 sessions/2026-07-01 §6 站点功能盘点表
④ 定稿 DEMO-TASTING「合成决策」→ 混搭清单（从各 demo 偷元件，benchmark 气质锚）
⑤ 迁入 src/（theme.css + 六页）= P1 视觉与阅读路径落地
⑥ P2a content/md + wikilink + graph 双 Tab → P2b wiki/clusters 聚类页 → P3 助手+思维模型
```

| 阶段 | 权威文档 | AI 何时读 |
|------|----------|-----------|
| **现在干什么** | **本文** `STATUS.md` | 每会话自动（gotchas 强制先读） |
| **怎么做细** | `docs/sessions/2026-07-01.md` | 做盘点/分期/畅想时 |
| **视觉偷什么** | `docs/DEMO-TASTING-NOTES.md` | 做 demo / 迁 `src/` 前 |
| **站建成什么样** | `docs/SITE-MANUAL.md` | 改路由/页面后同步 |
| **P2/P3 产品** | sessions §9 + `design-demos/assets/芒格多元思维模型-极简框架版.md` | 做聚类/助手前，**P1 不写代码** |

## 进度快照

| 模块 | 状态 | 备注 |
|------|------|------|
| **协作宪章** | **完成** | [AI-COLLABORATION-CHARTER.md](AI-COLLABORATION-CHARTER.md) |
| **project-context Skill** | **完成 v2** | [.agents/skills/project-context/](../.agents/skills/project-context/README.md) — 通用治理；可复制到其他仓库 |
| **复述门控** | **完成** | [COMPLEX-TASK-GATE.md](COMPLEX-TASK-GATE.md) + `.cursor/hooks` |
| **文档 YAML** | **完成** | [DOC-FRONTMATTER.md](DOC-FRONTMATTER.md)（Preview 首尾空行；Skill 对比 §零） |
| **网站说明书** | **完成** | [SITE-MANUAL.md](SITE-MANUAL.md) |
| **站点功能盘点** | **进行中** | [sessions/2026-07-01.md](sessions/2026-07-01.md) §5 旅程已定 · §6 表待填 |
| **Demo 试吃** | **进行中** | [DEMO-TASTING-NOTES.md](DEMO-TASTING-NOTES.md)：**5/7 有效**（roulette **跳过**；**D4 v0 待试吃**；缺 D5） |
| 设计 demo 交付 | 进行中 | D1–D3 v0/v1 有；**D4 turley v0 已交付**（Checkpoint 2）；**D5 tufte 未交付** |
| 整站视觉混搭 | **阻塞** | benchmark 气质优先；勿整页照搬 D2/D3 |
| 首页 Hero / `src/` | **未迁入** | 等试吃齐 + 混搭清单 |
| 日记 `/posts` | 已有 | mock；旅程 A 侧栏筛选待盘点定稿 |
| 详情 `/post/:id` | 已有 | 字幕 ep86–99；ep86–93 posts 待补 |
| 知识图谱 `/graph` | 已有 | 标签共现；双 Tab **P2** |
| **产品畅想** | **P1 已锁 / P2 已锁** | 助手 **P3**；聚类 **P2b** 先于助手 → sessions §9 |
| 知识库 | 部分 | `dialogues/` #020；`wiki/` `content/` 延后 |
| Logo | 搁置 | [LOGO-FONT-BRIEF.md](LOGO-FONT-BRIEF.md) |
| 部署 | 未开始 | |

### 试吃进度（2026-07-02）

| Demo | 状态 | 一句话 |
|------|------|--------|
| benchmark | ✅ | **production 气质首选**（仅首页） |
| D1 press | ✅ | 温馨；偷 hero 色块、字幕平排 |
| D2 monocle | ✅ | 杂志感；偷动效/双栏思路，不要黑底板 |
| D3 midcentury | ✅ | 元件库；太浮夸不当整站 |
| designer | ✅ | **反例**（柔弱/性冷淡） |
| roulette | ⏭️ | **Archie 跳过试吃** |
| D4 turley | ⏳ | **v0 已交付** · Checkpoint 2 待审 |
| D5 tufte | ⏳ | 待 AI 交付（须丰富动效） |

## 接下来（按优先级）

### Archie

1. **审 D4 turley v0**（Checkpoint 2）→ 试吃后填 DEMO-TASTING-NOTES
2. 一起填 **sessions/2026-07-01 §6** 站点功能盘点表

### AI

1. **交付 D5 tufte** v0（D4 v0 已交 · 待 Archie Checkpoint 2）
2. D4 点头后 → v1 全量 parity（日历、月份折叠、Lead 图、完整 Day94 字幕等）
3. `design-demos/index.html` 八版对比（待做）

### 可延后（P2+）

- ep86–93 `posts.ts`、Logo、站内助手与思维模型引擎（**P3**）
- 聚类页 `wiki/clusters/`（**P2b**，信源已有本地 md，见下）

## 待你决定

- [ ] **待 push**（2026-07-03 commit `555e0f7` · 网络连不上 GitHub，本地终端需代理后 `git push`）
- [ ] **整站混搭**（主阻塞）→ 试吃 D4/D5 后定 DEMO-TASTING 合成表
- [x] **P1** 只做旅程 B/C + A 的筛选/阅读，**不上助手**
- [x] **P2** 聚类页先于思维模型助手
- [ ] Logo / 头像（可暂缓）

## 最近决策

- 2026-07-03 17:50:00：**project-context Skill v2** — 抽象 AGENTS/宪章/多源/复杂任务为可复用 Skill + templates；权威源 `.agents/skills/project-context/`
- 2026-07-03 10:05:13：**P1** = B/C + A 筛选阅读，助手 **P3**；**P2** 聚类先于助手；roulette 跳过；思维模型清单 → `design-demos/assets/芒格多元思维模型-极简框架版.md`（豆包线程作参考，非唯一信源）
- 2026-07-01：COMPLEX-TASK-GATE；站点功能盘点计划（不叫 IA 矩阵）
- 2026-06-30：协作宪章；YAML 规范；对话语料规则
- 2026-06-26：知识库 wiki/content **延后**；SITE-MANUAL；单数据源 md

## 今日摘要（2026-07-03）

- **D4**：turley v0 r2 纸底 folio 交付；Checkpoint 2 待 Archie 审；根因与优先级拍板见 [sessions/2026-07-03.md](sessions/2026-07-03.md)
- **文档架构**：宪章定位置顶；通用规则 vs 项目细则（`MULTI-SOURCE-EXEC-PLAN`）；`DEMO-BUILD-GATE` demo 门控
- **project-context Skill v2**：五层+宪章、复杂任务/多源计划流程、5 份 templates、`scaffold --with-governance`；可复制到其他仓库
- **下一步**：审 D4 → AI 交 D5 tufte v0 → 试吃填 DEMO-TASTING
