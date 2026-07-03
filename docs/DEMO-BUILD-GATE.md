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
| 3a | `design-demos/_spec.md` | A 层必过；B/C 层破例范围；14 期内容块 |
| 3b | `docs/STATUS.md` | 当前做哪版、试吃进度 |
| 3c | 已完成最接近的 demo HTML | `benchmark.html`、`press.html` 等 — 抽 token |
| 3d | `docs/sessions/` 当版 Checkpoint 1 | DS **落盘**（技能 Step 3 的输出） |
| 3e | `references/style-recipes/<school>.md` | 技能 Step 2 第 4 项；**仅 signature moves**；与 ② 冲突则裁剪 |
| 3f | `AGENTS.md`、gotchas、宪章 | 环境硬约束（loli 字体、纸底、不改 guidelines） |

**常见误判（D4 事故）**

| 错误 | 正确 |
|------|------|
| 把 `turley.md` recipe 当最高指令 | recipe 在 ③e，且须过 ② Never |
| 把 SKILL 排到 P3、只当「动效参考」 | **SKILL 全文 = ①**，含 Checkpoint 与 v0 流程 |
| 口头 Checkpoint 1、不落盘就开写 | 技能 Step 3 + §2 模板 → **sessions 落盘** → 你点头 → v0 |
| 跳过 v0 直接堆全量 | 技能 Step 4：v0 → 🛑 Checkpoint 2 → 再 v1 |

---

## 2. 技能 ① 强制流程（摘要，细则以 SKILL 为准）

```
读 SKILL.md 全文
  → Step 3a 四问（叙事/距离/温度/容量）
  → Step 3 声明 Design System（Markdown）
  → 🛑 Checkpoint 1：落盘 sessions（§3 模板）→ 等你确认，真停
  → Step 4：v0（结构 + token + 占位，非全量）
  → 🛑 Checkpoint 2：给你看像素 → 真停
  → Step 5：v1 全量（parity _spec）
  → Pre-delivery Checklist（SKILL 文末）
```

**与 ② 合并点**：Step 3 声明 DS 时，必须显式写「DEMO-TASTING Never 天花板」；recipe 色值若撞 Never，在 Checkpoint 1 就写「裁剪/丢弃」，不得留到写代码。

---

## 3. Checkpoint 1 落盘模板（技能 Step 3 输出）

写入 `docs/sessions/YYYY-MM-DD.md`，例如 `## D5 tufte · Checkpoint 1`：

```markdown
### ① 技能自检
- [ ] 已读 web-design-engineer/SKILL.md（非仅 recipe）
- [ ] Step 3a 四问已答
- [ ] 本版对应 recipe：___ · 采用/裁剪/丢弃清单

### ② 试吃天花板
- Must：…
- Never：…（逐条对照，DS 不得违反）

### Design System
- 纸底 / accent / C 层破例（≤3，每条面积上限）
- 字体 · 布局 · 动效菜单

### BorrowableParts（≥3）

### Archie：□ 同意开 v0（Checkpoint 1）
```

---

## 4. D4 事故（根因更正）

| 项 | 内容 |
|----|------|
| **现象** | 整屏高饱和橙、粗黑框；像警示站 |
| **根因 1** | **未执行 ① SKILL**：无 Step 3a/3 落盘、Checkpoint 1 口头化、未 v0→等审→v1 |
| **根因 2** | **未执行 ②**：未用 tasting Never 裁剪 DS |
| **根因 3** | 把 ③e recipe 字面当方案（越级） |
| **曾写错的 GATE** | 初版把 SKILL 排到 P3 — **已按 Archie 拍板改正** |

---

## 5. D5 开写前清单

- [ ] **①** 通读 `web-design-engineer/SKILL.md`
- [ ] **②** 读 `DEMO-TASTING-NOTES` Must/Never + 合成决策
- [ ] **③** `_spec` · STATUS · 对照 HTML · `tufte-dataink.md` recipe
- [ ] sessions 写入 **D5 Checkpoint 1**（§3）→ **Archie 点头** → 再写 `tufte.html` v0
- [ ] v0 交付 → **Checkpoint 2 真停** → 再 v1

---

## 修订记录

| 北京时间 | 变更 |
|----------|------|
| 2026-07-03 14:20:00 | **Archie 拍板**：① SKILL 最顶级 → ② 试吃笔记 → ③ 其余；修正初版把 SKILL 排 P3 的错误 |
| 2026-07-03 11:55:00 | 初版（优先级表有误，已作废） |
