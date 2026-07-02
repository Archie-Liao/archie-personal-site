---

doc_type: status
title: 项目状态
status: active
canonical: docs/STATUS.md
authority: 进度与最近决策
revised_at: "2026-07-02 18:16:45"
timezone: Asia/Shanghai

---

## 修订记录（最新在上）

| 北京时间 | 变更 |
|----------|------|
| 2026-07-02 18:16:45 | 试吃 6/8 版；站点功能盘点 §5 旅程；COMPLEX-TASK-GATE；对话 #016–#020 |
| 2026-06-30 18:23:09 | 恢复 `---` YAML；Preview 可见元数据 |

# 项目状态

> **新 AI 会话请先读本文 + [AGENTS.md](../AGENTS.md) + [SITE-MANUAL.md](SITE-MANUAL.md) + [AI-COLLABORATION-CHARTER.md](AI-COLLABORATION-CHARTER.md)**  
> 详细计划 → [docs/sessions/](sessions/) · 近期：[2026-07-01.md](sessions/2026-07-01.md)

## 主任务（仅 1 条）

**第一期改版**：视觉混搭（benchmark 气质为主）+ 六页功能（P1）→ 迁入 `src/`

## 进度快照

| 模块 | 状态 | 备注 |
|------|------|------|
| **协作宪章** | **完成** | [AI-COLLABORATION-CHARTER.md](AI-COLLABORATION-CHARTER.md) |
| **复述门控** | **完成** | [COMPLEX-TASK-GATE.md](COMPLEX-TASK-GATE.md) + `.cursor/hooks` |
| **文档 YAML** | **完成** | [DOC-FRONTMATTER.md](DOC-FRONTMATTER.md)（Preview 首尾空行；Skill 对比 §零） |
| **网站说明书** | **完成** | [SITE-MANUAL.md](SITE-MANUAL.md) |
| **站点功能盘点** | **进行中** | [sessions/2026-07-01.md](sessions/2026-07-01.md) §5 旅程已定 · §6 表待填 |
| **Demo 试吃** | **进行中** | [DEMO-TASTING-NOTES.md](DEMO-TASTING-NOTES.md)：**6/8 已填**（缺 roulette、D4/D5） |
| 设计 demo 交付 | 进行中 | D1–D3 v0/v1 有；**D4 turley、D5 tufte 未交付** |
| 整站视觉混搭 | **阻塞** | benchmark 气质优先；勿整页照搬 D2/D3 |
| 首页 Hero / `src/` | **未迁入** | 等试吃齐 + 混搭清单 |
| 日记 `/posts` | 已有 | mock；旅程 A 侧栏筛选待盘点定稿 |
| 详情 `/post/:id` | 已有 | 字幕 ep86–99；ep86–93 posts 待补 |
| 知识图谱 `/graph` | 已有 | 标签共现；双 Tab **P2** |
| **产品畅想** | **探讨中** | 思维模型助手 + wiki/clusters → sessions §9；**P2/P3** |
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
| roulette | ⏳ | 未试吃 |
| D4 / D5 | ⏳ | 待 AI 交付（须丰富动效） |

## 接下来（按优先级）

### Archie

1. **试吃 roulette**（可选）→ 补 DEMO-TASTING-NOTES
2. **拍板** sessions §9：P1 范围 + 聚类页是否先于思维模型助手
3. 一起填 **§6 站点功能盘点表**（基于 §5 三条旅程）

### AI

1. **交付 D4、D5** v0（动效样例要多，供试吃）
2. 试吃齐后 → 更新合成决策表 → 混搭清单 → 迁 `src/`
3. `design-demos/index.html` 八版对比（待做）

### 可延后

- ep86–93 `posts.ts`、字幕校对、Logo、豆包思维模型清单（提供后专拆）

## 待你决定

- [ ] **整站混搭**（主阻塞）→ DEMO-TASTING-NOTES 合成表
- [ ] **P1** 是否只做旅程 B/C + A 的筛选阅读（助手 **P3**）
- [ ] **P2** 聚类页先于站内助手？
- [ ] Logo / 头像（可暂缓）

## 最近决策

- 2026-07-02 18:16:45：试吃 benchmark/D1/D2/designer 落盘；旅程 A/B/C 定稿；DOC-FRONTMATTER Preview 规则更正
- 2026-07-01：COMPLEX-TASK-GATE；站点功能盘点计划（不叫 IA 矩阵）
- 2026-06-30：协作宪章；YAML 规范；对话语料规则
- 2026-06-26：知识库 wiki/content **延后**；SITE-MANUAL；单数据源 md

## 今日摘要（2026-07-02）

- **试吃**：6 版笔记完成；benchmark = 视觉锚点
- **盘点**：三条用户旅程写入 sessions；产品畅想 §9（思维模型/clusters）仅规划
- **协作**：Skill YAML ≠ 项目 doc YAML（机制不同）；复述门控已落盘
