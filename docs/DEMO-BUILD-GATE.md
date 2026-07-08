# Demo 交付门控（D1–D5）

> **通用规则** → [AI-COLLABORATION-CHARTER.md §1.8](AI-COLLABORATION-CHARTER.md)  
> **本项目 demo 优先级与多源案例** → [MULTI-SOURCE-EXEC-PLAN.md §4.1](MULTI-SOURCE-EXEC-PLAN.md)  
> **试吃底线** → `DEMO-TASTING-NOTES.md` · **内容块** → `design-demos/_spec.md`

**下层不得违反上层。①② 为硬约束；③ 可并列但都必须服从 ①②。**

| 级 | 来源 | 管什么 |
|----|------|--------|
| **① 最顶级** | `.agents/skills/web-design-engineer/SKILL.md` | **完整技能**：Step 0–7、Step 3a 四问、**Step 3 先声明 Design System**、🛑 **Checkpoint 1/2/3 真等用户**、v0 再 v1、Pre-delivery Checklist、反 AI slop、Tweaks、动效规范。**不是**只读 recipe 某一个 `.md`。 |
| **② 第二** | `docs/DEMO-TASTING-NOTES.md` | **Must / Never / 合成决策** — 你的试吃底线；裁剪 ① 里 recipe 的 hex/面积/气质（如勿大面积色块、勿粗黑框）。 |
| **③ 其余** | 见下表 | 填内容、填约束、填进度；**不得**压过 ① 的流程或 ② 的 Never。 |

### ③ 其余（AI 读档顺序建议）

| 顺序 | 文件 | 作用 |
|------|------|------|
| 3a | `design-demos/_spec.md` | A 层必过；B/C 层破例；**案例库差异化**；14 期内容；**三视图** |
| 3b | `docs/STATUS.md` | 当前做哪版、试吃进度 |
| 3c | 已完成最接近的 demo HTML | `benchmark.html` 等 — **仅抽 token / 对照差异，不可整页照搬布局** |
| 3d | `docs/sessions/` 当版 Checkpoint 1 | **任务执行包**（§3 五块）落盘 |
| 3e | `references/style-recipes/<school>.md` | 技能 Step 2 第 4 项；**仅 signature moves**；与 ② 冲突则裁剪 |
| 3f | `AGENTS.md`、gotchas、宪章 | 环境硬约束（loli 字体、纸底、不改 guidelines） |

**分散 doc vs 任务执行包**

| 类型 | 放哪 | 何时用 |
|------|------|--------|
| **稳定规则** | 宪章、MULTI-SOURCE、GATE、`_spec`、试吃 | 定义读哪些源、冲突谁赢 |
| **单次任务执行包** | `sessions/YYYY-MM-DD.md` 当版 Checkpoint 1 **一节** | **写 HTML 前**合并成一页；编码时**只认这一节** |

**常见误判（D4 事故）**

| 错误 | 正确 |
|------|------|
| 只写 DS、不写差异矩阵与 `_spec` checklist | Checkpoint 1 = **§3 五块**，不是仅 Design System |
| 把 `turley.md` recipe 当最高指令 | recipe 在 ③e，且须过 ② Never |
| 把 SKILL 排到 P3、只当「动效参考」 | **SKILL 全文 = ①**，含 Checkpoint 与 v0 流程 |
| 口头 Checkpoint 1、不落盘就开写 | **sessions 五块落盘** → Archie 点头 → v0 |
| 从 benchmark **照搬布局**却称「抽 token」 | token 可抽；**Layout/Type/Motion 须差异矩阵写清「必须不同」** |
| 跳过 v0 直接堆全量 | 技能 Step 4：v0 → 🛑 Checkpoint 2 → 再 v1 |

---

## 2. 技能 ① 强制流程（摘要，细则以 SKILL 为准）

```
读 SKILL.md 全文
  → Step 3a 四问（叙事/距离/温度/容量）
  → 写 sessions §3 五块（任务执行包）— 不是只写 DS
  → 🛑 Checkpoint 1：落盘 → Archie 确认，真停
  → Step 4：v0（对照执行包块 5 checklist）
  → 🛑 Checkpoint 2：像素验收 → 真停
  → Step 5：v1 全量（parity _spec）
  → Pre-delivery Checklist（SKILL 文末）
```

**与 ② 合并点**：块 3（DS）须显式写 Never 天花板；recipe 色值若撞 Never，在块 1/3 就写「裁剪/丢弃」。

---

## 3. Checkpoint 1 · 任务执行包（五块 · 必全）

> **写 `design-demos/*.html` 前**：在 `docs/sessions/YYYY-MM-DD.md` 开专节（如 `## D5 tufte · Checkpoint 1`），**五块齐全**方可请求 Archie 点头。  
> 块 1 与 [MULTI-SOURCE-EXEC-PLAN.md §3](MULTI-SOURCE-EXEC-PLAN.md) 同构；demo 任务 **块 1–5 合并进 sessions 一节**，不散落对话。

### 块 1 · 参考来源与优先级

（逐任务填表；demo 起点见 MULTI-SOURCE §4.1）

| 优先级 | 参考文件（完整路径） | 本任务取什么 | 冲突时 |
|--------|----------------------|--------------|--------|
| 1 | `.agents/skills/web-design-engineer/SKILL.md` | Checkpoint 流程；Step 3a/3；v0→v1 | 以本行为准 |
| 2 | `docs/DEMO-TASTING-NOTES.md` | Must / Never / 合成决策 | 裁剪 DS 与 recipe |
| 3 | `design-demos/_spec.md` | A 层；三视图；案例库差异化 | 服从 1–2 |
| … | … | … | … |

**冲突裁决**（1～3 条 bullet）

**执行步骤**（1. Checkpoint 1 落盘 → 2. v0 → 3. Checkpoint 2 …）

**硬天花板**（Never + 本版 C 层破例上限）

**交付物**（如 `turley.html` v0 · Home/List/Detail）

**需确认后再动手**

- [ ] 块 1 优先级表无误

### 块 2 · 差异矩阵 vs benchmark（案例库必过）

> `_spec` 要求 D1–D5 **视觉学校各异**；benchmark 是 production 气质锚，**不是**每版布局模板。  
> **每行必须写「本版必须不同」**，禁止写「同 benchmark」。

| 维度 | benchmark（勿照搬） | 本版 Dx **必须** |
|------|---------------------|------------------|
| **Layout** | Hero 双栏 + 三等分精选卡 | （例：spread / 行式索引 / 侧栏 List） |
| **Type** | Playfair 标题 + 舒适正文 | （例：Condensed 报头 + folio 数字） |
| **Color** | 单一赤陶 accent + 纸底 | （例：punch 斜切色带；ground 仍暖纸） |
| **Motion** | 几乎静态 | （例：导航/按钮分链动效菜单） |
| **Footer / chrome** | 四栏出版物页脚 | （例：issue 条 + colophon 网格） |

**非目标（≤3 条）**

- 不要 …
- 不要 …
- 不要 …

### 块 3 · Design System + 技能自检

```markdown
#### ① 技能自检
- [ ] 已读 web-design-engineer/SKILL.md（非仅 recipe）
- [ ] Step 3a 四问已答
- [ ] 本版 recipe：___ · 采用/裁剪/丢弃清单

#### ② 试吃天花板
- Must：…
- Never：…

#### Design System
- Token · 字体 · 布局 · C 层破例（≤3，面积上限）
- 动效菜单（≥3，须可试吃）

#### BorrowableParts（≥3）
```

### 块 4 ·（可选）recipe 裁剪表

| Recipe 项 | 采用 / 裁剪 / 丢弃 | 说明 |

### 块 5 · `_spec` 交付 checklist（v0 对照）

复制自 [`design-demos/_spec.md`](../design-demos/_spec.md) 交付前自检 + Tweaks：

- [ ] Checkpoint 1 五块已写入 **sessions**（非仅对话）
- [ ] **Home + List + Detail** 三视图（Tweaks 可切换）
- [ ] Tweaks：≥1 密度/accent 参数 + ≥1 创意参数（按 school）
- [ ] fonts.loli.net · 本地图 · **真内容全量**（14 期 · 精选三入口 · List 预览 · Detail 四块；**禁止占位符/「v1 再补」**）
- [ ] 导航「点我点我」+ tooltip
- [ ] 无紫渐变 / emoji 图标 / display 主视觉用 Inter
- [ ] `prefers-reduced-motion` 已考虑
- [ ] HTML 头注释：BorrowableParts ≥3 · C 层破例已列

### Archie

- [ ] **同意开 v0（Checkpoint 1）** — 日期 · 签名

---

## 4. D4 事故（根因更正）

| 项 | 内容 |
|----|------|
| **现象** | 整屏高饱和橙；后 v0 又像 benchmark |
| **根因 1** | **未执行 ① SKILL** 全流程 |
| **根因 2** | **未执行 ②** Never 裁剪 |
| **根因 3** | recipe 越级 |
| **根因 4（补）** | Checkpoint 1 **只有 DS**，缺 **差异矩阵 + 三视图 checklist** → 见 [`sessions/2026-07-03.md`](sessions/2026-07-03.md) §8–§9 |

---

## 5. D5 开写前清单

- [ ] **①** 通读 `web-design-engineer/SKILL.md`
- [ ] **②** 读 `DEMO-TASTING-NOTES` Must/Never + 合成决策
- [ ] **③** `_spec` · STATUS · `tufte-dataink.md` recipe
- [ ] sessions 写入 **D5 Checkpoint 1**（**§3 五块齐全**）→ **Archie 点头** → 再写 `tufte.html` v0
- [ ] v0 对照 **块 5 checklist** → **Checkpoint 2 真停** → 再 v1

**D5 范例**：复制 §3 模板到 `sessions/YYYY-MM-DD.md`；差异矩阵勿抄 D4，逐行填 tufte 学校特征。

---

## 修订记录

| 北京时间 | 变更 |
|----------|------|
| 2026-07-07 09:35:00 | **§3 升级为五块任务执行包**（优先级表 + 差异矩阵 + DS + checklist）；补 D4 根因 4 |
| 2026-07-03 14:20:00 | Archie 拍板 ①→②→③ |
| 2026-07-03 11:55:00 | 初版 |
