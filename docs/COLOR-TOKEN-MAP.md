---
doc_type: project_doc
title: 配色 token 站点对照与调整指南
status: active
canonical: docs/COLOR-TOKEN-MAP.md
authority: P1 配色可执行对照
revised_at: "2026-07-13 15:27:57"
timezone: Asia/Shanghai
---

## 修订记录（最新在上）

| 北京时间 | 变更 |
|----------|------|
| 2026-07-13 15:27:57 | Huemint D 定稿迁入 theme.css · 更新 §0 词典 · 靛蓝微点缀入正式 |
| 2026-07-10 17:31:00 | §0 中文色名词典 · theme.css 中文注释 · 小样改中文优先 |
| 2026-07-10 17:23:00 | §1 补 L1/L2 颜料罐类比 · Hero 标题随机色块 |
| 2026-07-10 17:05:00 | 初版：三层模型 · 路由对照表 · 调整工作流 · 金句配方说明 |

# 配色 token 站点对照与调整指南

> **权威色值**：[`src/styles/theme.css`](../src/styles/theme.css)  
> **可视化小样**：[`design-demos/color-tokens.html`](../design-demos/color-tokens.html)  
> **本文**：把小样里的色块 ↔ 线上具体位置 ↔ 改哪一行对上号。

---

## 0. 中文色名词典（不用背英文 token）

> **`--primary` 不是「一种颜色」的名字**，而是程序员写的**用途标签**。  
> `primary` = 主强调色 · `foreground` = 前景字色 · `background` = 背景 · `punch` = 编辑点缀色 ……  
> **你只需要认：中文名 + 色块 + 网站上哪一块。**

| 你就记这个 | 代码里的名字 | 当前 hex | 网站上指什么 |
|------------|--------------|----------|--------------|
| **暖奶油纸底** | `--background` | `#fdf9f5` | 整页背景（Huemint 锚点） |
| **胡桃墨字** | `--foreground` | `#633323` | 正文、标题 |
| **浅卡片底** | `--card` | `#fffcfa` | 卡片、输入框 |
| **橙强调（链接）** | `--primary` | `#f2640b` | 链接、主按钮、图谱节点 |
| **深橙** | `--primary-deep` | `#d9580a` | 链接 hover、金句暗部 |
| **日记橙** | `--punch` | `#e05c0a` | 顶栏「日记」、金句左线 |
| **暖米浅面** | `--secondary` | `#f5ebe3` | 次要背景（金句条配方） |
| **浅靛蓝点缀面** | `--accent` | `#e8e9f8` | 浅装饰底（金句条、页脚） |
| **弱化褐字** | `--muted-foreground` | `#8a6b58` | 日期、说明 |
| **靛蓝标签** | `--ink-green` | `#4849d0` | 标签、靛蓝微点缀 |
| **胡桃铜描金** | `--gold` | `#a67c52` | 顶栏分隔线 |
| **数据橙** | `--data-red` | `#f2640b` | 图表 / 图谱强调 |
| **数据靛蓝** | `--data-slate` | `#4849d0` | 图表弱对比 |

> **Huemint 溯源**：[website-2/#palette=fdf9f5-633323-f2640b-4849d0](https://huemint.com/website-2/#palette=fdf9f5-633323-f2640b-4849d0) · 对比小样 → `design-demos/color-tokens-compare.html`

**你要改「链接橙」** → 打开 `theme.css`，搜 **「橙强调」** 或 `--primary`，改 `#f2640b`。  
**你要改「日记橙」** → 搜 **「日记」** 或 `--punch`，改 `#e05c0a`。

---

## 1. 先建立三层模型（懵的根源）

> **一句话**：L1 是颜料罐上的标签，L2 是调好的涂料，L3 是某一面墙单独调的特效漆。

| 层 | 是什么 | 改哪里 | 例子 |
|----|--------|--------|------|
| **L1 · Token（颜料名）** | `theme.css` 里定义的 **单一颜色变量**，全站共用 | `src/styles/theme.css` 的 `:root` | `--primary: #CC785C` = 「陶土橙」这一罐 |
| **L2 · 配方（调好的漆）** | 组件用 `color-mix` **把几罐 L1 按百分比混在一起** | 对应组件的 CSS | 金句条背景 = 82% secondary + 16% punch + … |
| **L3 · 特例（特效漆）** | 某一块 **多段渐变 / 复杂效果**，不对应单行 token | 该组件文件 | 金句金属字 8 段 `linear-gradient` |

**L1 vs L2 怎么分？**

- **L1**：小样色块上印的名字（`--primary`、`--punch`）。改一行 hex，**所有引用这个变量**的地方一起变。
- **L2**：小样 **没有单独一块色** 对应它。线上颜色 = L1 混合出来的。例如金句条背景不是 `--punch` 纯色，而是 `punch 16% + card + accent` 的配方。要改「条子更橙」→ 改配方里的 **百分比**，或先改 L1 的 `--punch` 让配方整体偏橙。

**小样页只展示 L1**；你看到的很多效果是 **L2 配方**。所以会觉得「色块对了，但不知道网站上哪一块就是它」——需要 **L1 + 路由 + 组件** 三张表一起看。

---

## 2. 我想改 X，应该动谁？（决策树）

```
想改的颜色出现在哪？
│
├─ 几乎全站一起变（纸更黄、链接更橙）
│   └─ 改 theme.css 对应 --token → npm run dev 刷新
│
├─ 只有某一页 / 某一组件
│   ├─ 先搜组件里 var(--xxx) 或 color-mix
│   └─ 若混的是 token → 优先改 token；若混的比例不对 → 改该组件配方
│
└─ 只有金句金属字 / 金句条渐变
    └─ token 只影响一部分；金属渐变在 DailyPunch.tsx 内联样式（见 §5）
```

**推荐工作流**

1. 在 [`color-tokens.html`](../design-demos/color-tokens.html) 或本文 §0 找到要调的 **token 名**（如 `--primary`）。
2. 查本文 **§3 路由对照表**，看该 token 出现在哪些页面、哪些块。
3. **试色（不动正式配色）**：改 [`theme-experiment.css`](../src/styles/theme-experiment.css) → `npm run dev:color` → 浏览真页面；右下角有「实验配色」角标。
4. **定稿迁入**：对 AI 说「把实验配色应用到正式 theme.css」→ 抄 hex 进 `theme.css` → `npm run dev` 验收。
5. 若只有一块不对 → 用编辑器 **全局搜索** `var(--primary)` 定位配方文件，微调 `color-mix` 百分比。
6. 金句等特殊效果 → 直接改 `DailyPunch.tsx`（§5）。

---

## 3. 路由对照表（L1 token → 线上位置）

### 全站底层

| Token | 线上你能看到的位置 | 主要文件 |
|-------|-------------------|----------|
| `--background` | 页面大底、详情页输入框底、边注底 | `theme.css` body、`post-detail.css` |
| `--foreground` | 正文、标题、顶栏默认字 | 全站 `text-foreground`、各页内联 |
| `--card` | 卡片面、弹层底、图谱侧卡 | `PostCard`、`graph-page.css` |
| `--muted-foreground` | 日期、说明、元数据灰字 | `HomePage`、列表、详情 |
| `--border` | 卡片边、输入框边、分隔 | 全局 |

### 导航与品牌

| Token | 线上位置 | 文件 |
|-------|----------|------|
| `--punch` | 顶栏 **「日记」** 链接字色 | `Layout.tsx` `.nav-link--diary` |
| `--primary` | 顶栏 hover 下划线、当前页高亮、**「图谱」** 等链 | `Layout.tsx` |
| `--gold` | 顶栏底部分隔线（淡金） | `Layout.tsx` |
| `--logo-stamp-ink` | 顶栏 Logo 字标 A+期数 | `Layout.tsx` / stamp 组件 |

### 首页 `/`

| Token | 线上位置 | 文件 |
|-------|----------|------|
| `--secondary` / `--accent` | **DailyPunch 色带渐变底**（配方，非纯色） | `DailyPunch.tsx` |
| `--punch` | 色带左赭石竖线、Cover Story 字、Day 编号淡色 | `DailyPunch.tsx` |
| `--primary-deep` / `--punch` | **金句金属字**（配方渐变，见 §5） | `DailyPunch.tsx` |
| `--primary` | Hero 短横线、卷首语链接、时间线 Day、精选卡序号 | `HomePage.tsx` |
| `--ink-green` | 标签球选中态（列表页更多） | `posts-list.css` |
| `--chart-1`…`--chart-5` | 首页 **发布密度** 小条形图 | `HomePage.tsx` / chart 组件 |

### 列表 `/posts`

| Token | 线上位置 | 文件 |
|-------|----------|------|
| `--card` / `--secondary` | 左栏月历底、右栏预览卡 | `posts-list.css`、`PostsListPreview.tsx` |
| `--primary` | 选中行左边线、读全文按钮、预览内链接 | `PostsListPreview.tsx` |
| `--primary-deep` | VOL kicker、摘录标题强调 | `PostsListPreview.tsx` |
| `--accent-foreground` / `--ink-green` | 标签 pill 字色与底 | 列表 tag 样式 |

### 详情 `/post/:id`

| Token | 线上位置 | 文件 |
|-------|----------|------|
| `--punch` | Hero 期数 pill、导图节点描边、关键词强调 | `post-detail.css` |
| `--primary` | 文内链接、导图连线 | `post-detail.css`、`PostMindmap` |
| `--card` | 知识卡片、视频 mat 底 | `post-detail.css` |
| `--gold` | 全局 `.text-gold` 装饰（若有） | `index.css` |

### 图谱 `/graph`

| Token | 线上位置 | 文件 |
|-------|----------|------|
| `--primary` / `--primary-deep` | 节点圆、连线、知识按钮、侧卡标题 | `graph-page.css` |
| `--data-red` | 图谱 **高权重边**（数据编码） | `graph-page.css` |
| `--card` | 节点旁卡、调参面板 | `graph-page.css` |

### 图表专用（勿滥用）

| Token | 仅用于 |
|-------|--------|
| `--data-red` | 图谱强调边、数据图强对比 |
| `--data-slate` | 数据图弱对比 |
| `--chart-1`…`5` | 发布密度、about 等指标条 |

> **硬约束**：`punch` 禁止大面积铺底；`data-*` 不进正文 UI。

---

## 4. 常见调整场景速查

| 你说的话 | 改什么 | 预期影响范围 |
|----------|--------|--------------|
| 「纸底再暖一点」 | `--background`、`--card`（常一起微调） | 全站 |
| 「链接/按钮太橙」 | `--primary`、`--primary-deep` | 链接、按钮、图谱、时间线点缀 |
| 「日记两个字太跳」 | `--punch` | 顶栏日记 + 金句条边线/编号（配方里也有 punch） |
| 「标签绿太深」 | `--ink-green`、`--accent-foreground` | 列表/详情标签 |
| 「金句字太亮/太灰」 | **§5 配方**（不只改 punch） | 仅首页金句 |
| 「金句条背景」 | `DailyPunch.tsx` 渐变百分比 | 仅色带 |
| 「图谱节点颜色」 | `--primary` + `graph-page.css` | 仅 `/graph` |
| 「图表红色」 | `--data-red`、`--chart-*` | 仅图表 |

---

## 5. 金句金属字（L3 配方 · 不在 theme 单行里）

文件：[`src/app/components/DailyPunch.tsx`](../src/app/components/DailyPunch.tsx)  
类名：`.daily-punch__msg`

| 效果 | 用的 token | 调法 |
|------|-----------|------|
| 暗赭石带 | `--primary-deep` + `--foreground` | 提高 `primary-deep` 的 % → 更纯、更深 |
| 亮橙带 | `--punch` + `--foreground` | 提高 `punch` 的 % → 更饱和 |
| 纸色高光 | `--background` + `--primary-deep` | **降低** `background` 的 % → 高光更暗、金属感更重 |
| 鼠标光斑 | `--background` + `--primary-deep` | `.is-lit` 里 radial-gradient 段 |

**本次（2026-07-10）**：按「降明度、提纯度」—— punch/primary-deep 占比 ↑，background 高光占比 ↓。

---

## 6. 与小样页联动用法

1. 打开 `design-demos/index.html` → **P1 站点配色** → `color-tokens.html`。
2. 色块下方有 token 名；对照本文 **§3** 找路由。
3. 本地同时开 `npm run dev`，改 `theme.css` 后 **小样页与线上站同步**（小样链了同一份 `theme.css`）。
4. 场景小样区三块对应：
   - **Cover Story 条** = 首页 DailyPunch（背景 + 金句）
   - **纸底+墨字** = 正文默认
   - **卡片+标签+chart** = 列表卡 / 发布密度

---

## 7. 相关文档

- 试吃硬约束：[`DEMO-TASTING-NOTES.md`](DEMO-TASTING-NOTES.md)
- A1-3 块定义：[`P1-MIX-MATCH-LIST.md`](P1-MIX-MATCH-LIST.md) §8.5
- 站点线框：[`SITE-MANUAL.md`](SITE-MANUAL.md)
