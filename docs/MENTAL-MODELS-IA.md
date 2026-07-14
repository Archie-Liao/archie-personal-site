---
doc_type: topic_spec
title: 思维模型星系 · 信息架构
status: active
canonical: docs/MENTAL-MODELS-IA.md
authority: /galaxy 圈层布局 · 节点归属 · P3 助手同源数据
depends_on: design-demos/assets/芒格多元思维模型-极简框架版.md
revised_at: "2026-07-14 14:20:14"
timezone: Asia/Shanghai
---

## 修订记录（最新在上）

| 北京时间 | 变更 |
|----------|------|
| 2026-07-14 14:20:14 | §一 区分 **完整 P3** vs **P3 尖兵**（链 SPIKE） |
| 2026-07-14 10:31:33 | **P1 先这样** · 框架保留 · **§四节点表内容后审** |
| 2026-07-14 09:43:32 | **§五** 螺旋试排推翻 · **还原同心圆** |
| 2026-07-14 09:12:32 | （已推翻）曾改为三臂/单臂黄金螺旋试排 |
| 2026-07-13 18:10:53 | **§二** 顶栏定稿「思维星系」· P1 MVP polish 待验收 |
| 2026-07-13 17:25:00 | **§六** 执行 3–4 完成：`mental-models` 数据 + `GalaxyPage` MVP |

# 思维模型星系 · 信息架构

> **信源正文**：[`design-demos/assets/芒格多元思维模型-极简框架版.md`](../design-demos/assets/芒格多元思维模型-极简框架版.md)（芒格 v1 · 无第三方演绎）  
> **视觉施工图**：[`P1-MIX-MATCH-LIST.md`](P1-MIX-MATCH-LIST.md) §8.13  
> **线框（动工后同步）**：[`SITE-MANUAL.md`](SITE-MANUAL.md)

## 一、产品定位

| 层 | 做什么 | 阶段 |
|----|--------|------|
| **`/galaxy` 检索学习** | 圈层式知识星系：层级 + 模型间关联 · 点节点阅读 | **P1 先这样 · 框架**（节点正文后审） |
| **站内助手编排** | 输入具体事件 → 5 步调用流程 → 结合本站语料 | **完整 P3**（尖兵之后） |
| **P3 尖兵** | 通聊 UI + DeepSeek（无完整编排） | **施工图** → [`P3-ASSISTANT-SPIKE.md`](P3-ASSISTANT-SPIKE.md) |

**与 `/graph` 区分**：`/graph` = 日记/标签**内容共现**；`/galaxy` = **思维模型层级与关联**（固定同心圆，非力导向共现）。

## 二、Archie 拍板（2026-07-13）

1. **圆心**：芒格 **5 条元规则**（非豆包「理性/实证/熵增」替代圆心）  
2. **首版**：**3 圈 MVP**（非一次上满豆包 5 层）  
3. **路由**：`/galaxy` · 顶栏 **「思维星系」**（已定稿）
4. **豆包公理**：P1.5 可选「注释性卫星」小节点；**MVP 可不做**

### 3 圈 MVP 定义

| 圈 | 名称 | 内容 | MVP 状态 |
|----|------|------|----------|
| **R1 内** | 元规则 | 格栅、Lollapalooza、逆向思考、能力圈、清单化决策 | **全量 5 节点** |
| **R2 中** | 学科模型 | 6 大学科各选 **代表模型**（非一次铺完全部表格） | **每学科 2～4 个**，见 §四 |
| **R3 外** | 场景应用 | 投资决策、人际沟通、个人成长、内容创作… | **占位节点** `status: placeholder` |

**P1.5**：扩到豆包式 5 层 · 补卫星公理 · 场景实节点与 R2 多边连线  
**P2b**：场景节点链 `wiki/clusters/`、日记标签  
**P3**：助手读取同一 `mental-models` 数据集 + 框架 md 第三层调用流程

## 三、数据形状（实现前须遵守）

```text
mental-models/
  rings.ts      # R1 | R2 | R3 圈定义
  nodes.ts      # id, label, ring, discipline?, summary, sourceRef
  edges.ts      # from, to, relation: supports | applies-to | cross-check
```

- **单源**：从框架 md 洗入 ts/json；**禁止**页面硬编码长文  
- **节点 id**：kebab-case，稳定不改（`compound-interest`, `meta-lattice`）  
- **P3**：助手与 `/galaxy` 共用 `nodes` + `edges`

## 四、节点草案（MVP · 待 Archie 审）

### R1 · 元规则（圆心）

| id | 显示名 | sourceRef |
|----|--------|-----------|
| `meta-lattice` | 格栅理论 | 框架 §第一层 #1 |
| `meta-lollapalooza` | Lollapalooza效应 | #2 |
| `meta-invert` | 逆向思考原则 | #3 |
| `meta-circle` | 能力圈边界 | #4 |
| `meta-checklist` | 清单化决策 | #5 |

### R2 · 学科代表模型（中圈）

| 学科 | id 示例 | 显示名 |
|------|---------|--------|
| 数学与统计 | `compound-interest` | 复利原理 |
| | `margin-of-safety` | 安全边际 |
| | `decision-tree` | 决策树 |
| 心理学 | `social-proof` | 社会认同 |
| | `loss-aversion` | 被剥夺超级反应 |
| | `availability-bias` | 错误衡量易得性 |
| 物理与工程 | `redundancy` | 冗余备份 |
| | `feedback-loop` | 反馈回路 |
| 生物与生态 | `niche` | 生态位 |
| | `natural-selection` | 自然选择 |
| 微观经济 | `opportunity-cost` | 机会成本 |
| | `moat` | 护城河 |
| 元思维 | `first-principles` | 第一性原理 |

> 完整表格见框架 md 第二层；MVP **每学科先上表内条目**，其余标 `planned` 后续追加。

### R3 · 场景（外圈占位）

| id | 显示名 | MVP |
|----|--------|-----|
| `scene-invest` | 投资决策 | placeholder |
| `scene-relate` | 人际沟通 | placeholder |
| `scene-growth` | 个人成长 | placeholder |
| `scene-create` | 内容创作 | placeholder |

### 边（示例 · MVP 最少集）

| from | to | relation |
|------|-----|----------|
| `compound-interest` | `meta-lattice` | cross-check |
| `compound-interest` | `scene-invest` | applies-to |
| `compound-interest` | `scene-growth` | applies-to |
| `meta-invert` | `social-proof` | supports |
| `niche` | `scene-create` | applies-to |
| `opportunity-cost` | `scene-invest` | applies-to |

## 五、交互原则（`/galaxy`）

- **布局**：固定同心圆 + 圈上角度分布；**不用**力导向（避免与 `/graph` 撞车）  
- **动效**：默认**静态**（无公转）；**点击节点不跳动**（吸取 tag 球教训）  
- **阅读**：点节点 → 旁侧浮卡跟随节点（定义 · 适用 · 局限性）  
- **窄屏**：星系 hero + 下方按圈折叠文字索引（fallback，非主界面）  
- **全屏**：对齐 `/graph`（`100svh`、暖纸底、左上「知识」说明弹层）

> **已推翻（2026-07-14）**：黄金螺旋 / 三臂螺旋试排 — 目视不如同心圆；已还原。

## 六、执行顺序（给 AI / Archie）

| 序 | 谁 | 做什么 | 产出 |
|----|-----|--------|------|
| 1 | Archie | **全站视觉扫收工**或明确「并行」 | 避免与 polish 抢时间 |
| 2 | Archie | **审 §四节点表**（删改代表模型、场景名） | IA 定稿 |
| 3 | AI | 洗数据 `src/app/data/mental-models/*.ts` | 可导入节点/边 |
| 4 | AI | `GalaxyPage` + 路由 + 顶栏 + `galaxy-page.css` | `/galaxy` MVP |
| 5 | 双方 | 对照 MIX-MATCH §8.13 验收 | 先这样 / 返工 |
| 6 | — | P2/P3 按 STATUS 主线 | 不提前做助手 |

## 七、明确不做（MVP）

- 站内 LLM 对话、事件拆解引擎  
- 豆包公理卫星（可 P1.5）  
- 5 层满配、全部误判倾向 25 条上球  
- 与日记/`/graph` 的实时数据联动（P2 以后）
