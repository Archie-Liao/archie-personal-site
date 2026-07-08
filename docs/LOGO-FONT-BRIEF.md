---
doc_type: project_doc
title: Logo 字标需求（stamp + 中英叠排）
status: active
canonical: docs/LOGO-FONT-BRIEF.md
revised_at: "2026-07-08 14:46:00"
timezone: Asia/Shanghai
resume_when: Archie 主动要求再迭代 Logo
latest_demo: design-demos/logo-fonts/compare-nav-stamp.html
depends_on: docs/DEMO-TASTING-NOTES.md · design-demos/turley.html brand-mark
---

## 修订记录（最新在上）

| 北京时间 | 变更 |
|----------|------|
| 2026-07-08 14:46:00 | stamp 字色→**#4A2E1C 深胡桃褐** · Logo **v1 暂定**（后续再迭代） |
| 2026-07-08 14:40:00 | Archie→Barlow Condensed(F6) · stamp 暖铜褐 |
| 2026-07-08 14:35:00 | **字体锁定** — A=Italianno · 期数=Playfair900斜 · 中文=Noto Serif700 |
| 2026-07-08 11:52:00 | stamp 即梦指纹 PNG · Day1→2026-02-27 · Logo 放大 |
| 2026-07-08 11:35:00 | **Archie 续做 Logo** — 繁简对比 · stamp 去点 · 指纹背景 · 协作门控 · compare-nav-stamp v2 |
| 2026-06-30 18:23:09 | 恢复 `---` YAML frontmatter |
| 2026-06-25 18:00:00 | 搁置决定（v3–v7 未锁定） |

# Logo 字标需求

> **权威源**：本文件 + [`compare-nav-stamp.html`](../design-demos/logo-fonts/compare-nav-stamp.html)  
> **线上组件**：`src/app/components/SiteLogo.tsx` · `src/styles/index.css`  
> **期数逻辑**：`getDiaryDayCount(siteConfig.dayOneDate)` — **每日自动**，无需 build

---

## 1. 当前结构（D4 turley 思路）

| 块 | 内容 | 说明 |
|----|------|------|
| **stamp** | `A` + 期数 | 如 `A117`（**无中间点**） |
| **叠排字标** | 廖智强 / ARCHIE | 中文上、英文下，共用中线 |

### 2.0b 首页 Hero 大标题（≠ 顶栏 Logo）

| 块 | 字体 | 组件 |
|----|------|------|
| **廖智强** | Noto Serif SC 700（大 display） | `HomeHeroTitle.tsx` |
| **Archie.** | Playfair Display 600 斜体 + 赤陶 `.` | 同上 · benchmark 路线 |

> Hero **不用** stamp / 指纹 / Italianno / Barlow；期数在 eyebrow「卷首 · Vol. N」。

---

## 2. Archie 要求（2026-07-08）

### 2.0 字体锁定 ✅（2026-07-08 · 已迁 `src/`）

| 部位 | 小样 | 字体 | token |
|------|------|------|-------|
| 字母 **A** | F5b | **Italianno** | `--font-logo-script` |
| **期数** | F1 | **Playfair Display 900 斜体** | `--font-logo-folio` |
| **Archie** | F6 | **Barlow Condensed 700 大写** | `--font-logo-en` |
| **廖智强** | Z1 | **Noto Serif SC 700** | `--font-logo` |

> 混搭说明：stamp 内 A 与期数 **分字体**；与 compare 页「整段同字体」不同，按 Archie 指定拆分。

### 2.1 繁简对比（核心）

| 轴 | 要求 | 反例（勿再犯） |
|----|------|----------------|
| **中文** | 中正、朴实、可辨 | 刀隶/过花 |
| **英文 + stamp 数字** | **强装饰** — 花体/展示体；**哪怕略难认也可** | Playfair 斜体、Barlow Condensed 当「够装饰」 |
| **关系** | 简（中文）× 繁（英数）形成张力 | 全站 folio 惯例代替 Logo 专项需求 |

### 2.2 stamp 视觉

| 项 | 要求 |
|----|------|
| **格式** | `A117`，**不要** `A·117` 中间点 |
| **背景** | PNG **透明底**（即梦导出）— 直接 `<img>` · **禁止** `mix-blend-mode` 去底 |
| **资产** | 源：`design-demos/jimeng-2026-07-08-2112.png` · 线上：`public/images/logo-stamp-fingerprint-jimeng.png` |

### 2.3 期数更新

- **Day 1** = `site.config.ts` → `dayOneDate: "2026-02-27"`
- **算法**：本地日期 − dayOne + 1；访问日变更即显示新期数（客户端，无后端）
- **无需** 每日 build / cron

### 2.4 字体小样（已定稿）

**路径**：`design-demos/logo-fonts/compare-nav-stamp.html` — 选型参考；**生产以 §2.0 为准**。

---

## 2.5 旧节（选型流程 · 已完成）

| 步骤 | 轴 | 代号 |
|------|-----|------|
| ① | 装饰 | F1–F6 |
| ② | 中文 | Z1–Z5 |

---

## 3. 协作门控

> **事故**：compare 第一版只换中文，stamp/英文用 Condensed+Playfair — 与「繁简花体」不符。

### 3.1 以后做 Logo / 字标小样，AI 必须：

1. **先更新本文件 §2**（或 STATUS「最近决策」一行），再写 compare HTML / 改 `src/`
2. **首条回复复述**双轴：中文简 / 英数繁；若 Archie 说「花体」，**不得**擅自映射为 benchmark folio
3. **compare 页结构**须显式两节：装饰轴 + 中文轴；文首 **correction** 写清与上轮差异
4. **stamp 纹理**与 **字体** 分两轨记录 — 纹理可先行 v0（背景图），字体等 F/Z 锁定
5. **Checkpoint**：Archie 在浏览器看过 compare **并回复代号** → 才迁 `src/` 定稿

### 3.2 与 DEMO-BUILD-GATE 关系

- 新建/大改 `design-demos/logo-fonts/*.html`：仍走 web-design-engineer SKILL；**另加**读本文件 §2–§3
- 小改 `src/SiteLogo`：读本文件 + STATUS；字体未锁定则只动结构/纹理/对齐

---

## 4. 历史探索（搁置前）

- v3 中英搭配 → v4–v6 Ref-4 → v7 三选一（均未锁定）
- 2026-06-24 曾选刀隶方向 → Figma brief；整站 B 阶段改用 turley stamp 结构

## 5. 站点色（仍适用）

纸 `#F6F0E2` / `#F5F0E8` · 暖墨 `#2A2622` · punch `#D4562A` · accent `#CC785C`
