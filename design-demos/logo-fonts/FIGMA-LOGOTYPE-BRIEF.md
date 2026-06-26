# Figma 字标设计 Brief · 廖智强

> 给 Archie 在 Figma AI / 插件 + 手描定稿用。  
> 字体方向小样（刀隶 A 等）见 [index.html](./index.html)。  
> **勿参考** [logotype-explore.html](./logotype-explore.html)（贴装饰反例，已作废）。

---

## 能力边界（与 AI 协作时）

| 问题 | 答案 |
|------|------|
| SVG 是矢量吗？ | 是。路径放大不糊，适合 Logo 进 `SiteLogo` / `public/assets/logo/` |
| Cursor 能「设计生图」出字标吗？ | 通用文生图不适合中文 Logo 终稿；不能替代 Figma/Glyphs 改轮廓 |
| Cursor 能识图吗？ | 能。可读 reference 图与 Figma 导出截图，做方向评审 |

---

## 已锁定方向（不可变输入）

| 项 | 结论 |
|----|------|
| 骨架 | **A 刀隶**（阿里妈妈刀隶体 / 爨宝子碑气质） |
| 不要 | 汇文铅字残破感；字体旁贴简笔画/图标 |
| 要 | **改字形轮廓**：笔画收放、雁尾/起笔、三字节奏；至多一字有与笔画**一体**的点缀 |
| 混搭 | 廖/智 略精致；**强** 保留力量 |
| nav | 顶栏小 Logo（`SiteLogo variant="nav"`）简化版，无 Hero 级装饰 |
| 英文 | Hero 下 Archie 仍用 Playfair Display 斜体（与中文定制字标组合） |
| 场景色 | 纸 `#F5F0E8` / `#F6F0E2`，暖墨 `#5A4F44`，强字可 `#3A342E`，accent `#CC785C` |

参考图（本地）：

- `reference/字体1.png` — 结构/方笔能量；**不照搬**皇冠、鹰、全屏戏剧
- `reference/字体2.jpeg` — 木刻标题比例感；**不照搬**「太阳」飞白书法

---

## Figma AI / 插件工作流

Figma 原生 AI **不擅长**直接生成可用中文三字 logotype。

```
参考图 → Figma AI 只做气质/风格板
刀隶体「廖智强」底稿 → 钢笔描改轮廓（定稿）
  → Hero 字标 SVG + nav 简化 SVG → 交给 React SiteLogo
```

- **Figma AI / 插件**：风格板、笔画气质、装饰密度参考；**不要**让它直接出最终三字。
- **定稿**：Outline 化、合并路径、手工修笔画。

底稿字体：安装 [阿里妈妈刀隶体](https://www.alibabafonts.com/) 或项目内 `fonts/AlimamaDaoLiTi.woff2`（仅供本地预览）。

---

## 提示词块（可直接复制）

### 块 1 · 项目上下文

粘贴到 Figma AI / 插件 / 外包设计师：

```text
Project: Personal website logotype for 「廖智强」 (Archie Liao).
Site mood: warm cream paper editorial (#F5F0E8), vintage natural-history (butterflies/plants), quiet literary, NOT cyber/neon/purple gradient.
Scope: Chinese wordmark ONLY — three characters 「廖」「智」「强」. English "Archie" stays separate (Playfair Display italic below).
This is LOGOTYPE design (modify glyph outlines), NOT slapping icons next to an existing font.
Base skeleton: Alimama DaoLiTi / 爨宝子碑 style — square brush, triangular bends, strong horizontal tails (雁尾), between clerical and regular script.
User liked sample A (刀隶) but it feels too rustic/plain; wants slightly more refined/ornate while keeping legibility on cream background.
Avoid: distressed/ broken type (old lead type erosion), Huiwen-mincho grain, floating stickers/triangles/leaves beside letters.
Mix: characters 廖/智 slightly refined and lighter; 强 keeps power. At most ONE character may have decoration integrated INTO a stroke (like reference 帝国坟场 level of integration — NOT copying crown/eagle literally).
Deliver: Hero wordmark + simplified nav wordmark (no hero-only ornaments), export SVG, viewBox tight, paths merged.
```

### 块 2 · 参考图怎么用

粘贴时**附上** `reference/字体1.png` 与 `reference/字体2.jpeg`：

```text
Reference A (帝国坟场 title): Take ONLY — integrated structure, chisel/block energy, stroke terminals as design. Do NOT copy — crown on 帝, eagle on 坟, full distressed texture, movie-poster drama.
Reference B (Zuoxiao Zuzhou poster): Take ONLY — compressed woodblock title PROPORTION feel for secondary lockups if needed. Do NOT copy — flying-white calligraphy on 「太阳」 for the main logo.
Primary execution: start from 刀隶体 outlines for 廖智强, refine in vector.
Background preview: #F5F0E8 cream, text #5A4F44 warm ink or #3A342E for 强 only.
```

### 块 3 · Figma AI 风格探索（仅 mood，不出最终字）

```text
Generate a STYLE BOARD only (no final Chinese text): editorial logotype mood board for a literary video-diary website. Warm cream paper, terracotta accent #CC785C, vintage museum print aesthetic. Show stroke language samples: square 隶楷 tails, restrained ornamental terminals, ONE integrated decorative motif merged into a stroke (not separate icons). East Asian typography influence, 爨宝子碑 energy but refined for modern web hero. No purple, no neon, no emoji, no 3D, no grunge erosion.
```

### 块 4 · 单字迭代（刀隶底稿上逐字 — 输出 raster 仅作参考，须钢笔重描）

对「廖」「智」「强」各开 Frame，底图锁定刀隶，替换 `[廖 / 智 / 强]`：

```text
Redesign this single Chinese character outline for a premium editorial logotype.
Character: [廖 / 智 / 强]
Keep: 刀隶 / 爨碑 square bone structure, readable at 52px on #F5F0E8.
For 廖/智: refine — cleaner counters, slightly lighter stroke weight, elegant spacing.
For 强: keep boldest stroke contrast; optional ONE stroke-integrated ornament (not a separate icon).
Output: vector-friendly, minimal nodes, no texture, no broken edges, no mock 3D.
```

### 块 5 · 反例（必贴，防插件走偏）

```text
WRONG: icon sticker above character, leaf emoji, triangle clip-art, CSS scale tricks, separate SVG decoration layer, distressed eroded type, copying 帝国坟场 crown/eagle, calligraphic splatter 太阳 style for whole name.
RIGHT: modify bezier paths of 廖智强; decoration is part of a stroke extension; three-character rhythm unified; works on cream without looking muddy black.
```

### 块 6 · 导出给开发（Checklist）

- [ ] **Hero**：中文「廖智强」纯 SVG，视觉高度约 52–92px（对照 `design-demos/benchmark.html` `.display .zh`）
- [ ] **nav**：同字形、无 Hero 装饰，高度约 21px，字距略加
- [ ] **文件**：`public/assets/logo/wordmark-hero.svg`、`wordmark-nav.svg`（或单 SVG + CSS 缩放）
- [ ] **路径**：`fill` 统一或廖/智 `#5A4F44`、强 `#3A342E`
- [ ] **可访问性**：React 层 `aria-label="廖智强 Archie"`
- [ ] **英文**：Hero 仍用 Playfair 斜体，不必进 SVG（除非一并定制）

定稿后：发 SVG 或截图 → AI 识图评审 → 接入 `src/app/components/SiteLogo.tsx`。

---

## 作废说明

[logotype-explore.html](./logotype-explore.html) 为 **反例**：在刀隶字体上贴 SVG 简笔画 ≠ 字标设计。不再基于此文件迭代。
