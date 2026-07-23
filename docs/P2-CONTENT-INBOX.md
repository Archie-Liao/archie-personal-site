---
doc_type: topic_spec
title: P2 内容收件箱 · 施工图
status: active
canonical: docs/P2-CONTENT-INBOX.md
authority: P2a 捡料 / 字幕上站 / 外链归档执行进度（排版细则以 CONTENT-FORMAT 为准）
depends_on: docs/CONTENT-FORMAT.md · docs/STATUS.md · docs/SITE-MANUAL.md
revised_at: "2026-07-23 15:12:29"
timezone: Asia/Shanghai
---

## 修订记录（最新在上）

| 北京时间 | 变更 |
|----------|------|
| 2026-07-23 15:12:29 | +花叔外链；区块名改 **站内镜像** |
| 2026-07-23 15:04:20 | 外链归档：**完整镜像**（含配图）；`link-bili-liang-wefeng-4h` 图入 `public/assets/archive/` |
| 2026-07-23 14:38:25 | **突发外链**：`link-bili-liang-wefeng-4h` · 梁文锋四小时投资人会议实录（elsewhere / B站动态 2026-07-23）|
| 2026-07-22 17:50:00 | **B站链接**：确认是投稿列表 API 风控；改搜「廖智强Archie」翻页已拿到 Day1–130；站内 ep094–099 真 `bvid` 已写入 `posts.ts` |
| 2026-07-22 17:39:29 | **B站链接**：合集可拉 41 条→[`BILI-VIDEO-MAP.json`](BILI-VIDEO-MAP.json)；站内 ep094–099 不在合集且全量列表 API 风控，待 Archie 导出/粘贴 |
| 2026-07-17 10:24:32 | 排版权威改链 [`CONTENT-FORMAT.md`](CONTENT-FORMAT.md)；Dan Koe `date` = **2026-04-01** |
| 2026-07-17 10:18:14 | **日期硬规则** · 视频按字幕日修正 ep094–099；延展去重限字；列表右栏加宽 |
| 2026-07-17 09:57:49 | 头条外链更正为 **Dan Koe 中英对照**；预览改单栏；标题/总结排版规则补记 |
| 2026-07-17 09:26:37 | 初稿 · 本批 129 字幕 + 外链替换计划；Day* 文件名已去前缀 |

# P2 内容收件箱 · 施工图

> 对标 [`P3-ASSISTANT-SPIKE.md`](P3-ASSISTANT-SPIKE.md)：**本文件管批次与上站清单**。  
> 字幕断句/标点与文案硬规则 → [`CONTENT-FORMAT.md`](CONTENT-FORMAT.md) + `scripts/format-subtitles.mjs`。

## 复述需求（本批）

| | |
|--|--|
| **目标** | 把 `design-demos/视频日记字幕稿/` 的源稿洗进站；外链用真实收藏替换旧 AIHOT mock |
| **约束** | 访客只读；P1 仍用 `posts.ts`；不建完整 `content/` 管道 |
| **非目标** | wiki 聚类页、graph 双 Tab、完整 RAG、小蓝宠 B4（可并行） |

## 原则

**先捡、后洗、再上站。**

| 收件箱 | 路径 / 形态 | 本批 |
|--------|-------------|------|
| **A · 视频日记** | `design-demos/视频日记字幕稿/{期数}：{标题}.txt` | **进行中** |
| **B · 优质外链** | `posts.ts` type=`link` | **5 条** |
| **C · 个人笔记** | `knowledge/raw/` | 未开 |

## 标题与摘要撰写（外链 / 日记）

| 规则 | 做法 |
|------|------|
| **有原文标题** | **必须用原文标题**（勿凭 URL 猜题） |
| **无标题** | AI 概括编写，短、可检索 |
| **摘要分段** | `\n\n` 分段；段勿巨长、亦勿碎成单句堆；**段首句概括本段** |
| **加粗** | 总结句/关键词用 `**…**`（`inlineMarks` 渲染） |

列表日期规则见 [`CONTENT-FORMAT.md`](CONTENT-FORMAT.md) **§A**。

## 列表时间显示规则（摘要）

> **完整 → [`CONTENT-FORMAT.md`](CONTENT-FORMAT.md)**

| 位置 | 规则 |
|------|------|
| 月分组头 | `YYYY.MM` |
| 行内副标题 | `MM-DD · 标签` |
| 右栏 VOL | `VOL.YYYY.MM.DD · 平台/期数` |

**`date` 取值**：视频 ← 字幕「今天是…」；外链 ← **页面发布时间**（如头条标题下 `2026-04-01`），否则 ← 上传日。  
ep094–099：`2026-05-31`～`06-05`；Dan Koe：`2026-04-01`。

## 源稿命名（已统一）

- 规范：`{数字}：{标题}.txt`（全角或半角冒号均可；脚本只认**开头数字**）
- **2026-07-17**：原 `Day58：…`–`Day85：…` 已批量改为 `58：…`–`85：…`（去掉 `Day` 前缀）
- 发布：`public/subtitles/ep{NNN}.txt`（`node scripts/format-subtitles.mjs`）

## 现状快照（2026-07-17）

| 项 | 数 |
|----|-----|
| 源稿 txt | ~129 |
| 已发布 `public/subtitles/ep*.txt` | 14（ep086–099） |
| `posts.ts` 视频日记 | 6（ep094–099） |
| `posts.ts` 外链 | 5（见下） |

### 外链 B（已落地）

| id | 来源 | URL |
|----|------|-----|
| `link-bili-liang-wefeng-4h` | bilibili 动态 | **2026-07-23** · 梁文锋四小时投资人会议实录（elsewhere） |
| `link-bili-huashu-agi-commons` | bilibili 动态 | **2026-07-23** · 花叔《通往AGI的常识》 |
| `link-llm-wiki` | Gist | https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f |
| `link-karpathy-x` | X | https://x.com/karpathy/status/2039805659525644595 |
| `link-toutiao-dan-koe` | 今日头条 | **2026-04-01** 发布 · Dan Koe 中英对照 |

~~`link-fugu` / `link-glm`（AIHOT mock）~~ **已删除**。

## 执行阶段

| 阶段 | 做什么 | 验收 | 状态 |
|------|--------|------|------|
| **I0** | 施工图 + 命名规范 | 本文 + Day 去前缀 | ✅ |
| **I1** | 盘点：文件名 → ep 号对照；标注重跑/新增 | 对照表写入本文或附录 | 待 |
| **I2** | 跑 `format-subtitles.mjs`；抽检一句一段 | `public/subtitles/` 更新 | 待 |
| **I3** | 补 `posts.ts`：优先 ep086–093（字幕已有） | 列表可见 | 待 |
| **I4** | 其余期：有日期/链接再加条目；否则只入库字幕 | 不全空挂车 | 待 |
| **I5** | （后）`content/*.md` 单数据源 | 另开任务 | 延后 |

## Archie 需补的元数据（视频）

每期上列表至少要有：

1. 标题（可用文件名）  
2. 日期  
3. 平台链接（bvid / 抖音等，可后补）  
4. 3～5 标签  

没有链接也可以先上站（字幕 + 标题），外链字段留空。

## AI 开场（下一批）

```text
git pull
读 @docs/STATUS.md + @docs/P2-CONTENT-INBOX.md + @docs/CONTENT-FORMAT.md
继续 I1 盘点 或 I2 跑字幕脚本
```

## 与小蓝宠

吉祥物 B4 仍见 [`MASCOT-BRIEF.md`](MASCOT-BRIEF.md)；与本施工图**并行**，互不阻塞。
