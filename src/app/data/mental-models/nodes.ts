import type { GalaxyRingId } from "./rings";

export type ModelDiscipline =
  | "math"
  | "psychology"
  | "physics"
  | "biology"
  | "economics"
  | "meta-thinking";

export type ModelNodeStatus = "active" | "placeholder";

export type ModelNode = {
  id: string;
  label: string;
  ring: GalaxyRingId;
  discipline?: ModelDiscipline;
  status: ModelNodeStatus;
  summary: string;
  usage?: string;
  limitNote?: string;
  sourceRef: string;
};

export const MODEL_NODES: ModelNode[] = [
  // R1 · 元规则
  {
    id: "meta-lattice",
    label: "格栅理论",
    ring: "R1",
    status: "active",
    summary:
      "将不同学科的核心原理交织成网格状思维网络，多维度交叉验证问题，破解「手里拿锤子，看什么都像钉子」。",
    usage: "任何重要判断前，刻意从 ≥2 个学科调取模型交叉验证。",
    limitNote: "格栅是方法，不能代替对具体领域的深度钻研。",
    sourceRef: "框架 §第一层 #1",
  },
  {
    id: "meta-lollapalooza",
    label: "Lollapalooza效应",
    ring: "R1",
    status: "active",
    summary: "多个不同模型同向共振时，结论可靠性非线性提升；单一模型结论不可靠。",
    usage: "检查：各模型推导是否同向？矛盾则说明需补充维度或缩小问题。",
    limitNote: "同向共振也可能集体偏误，须保留逆向排查。",
    sourceRef: "框架 §第一层 #2",
  },
  {
    id: "meta-invert",
    label: "逆向思考",
    ring: "R1",
    status: "active",
    summary: "先搞清楚「什么会让我失败」，排除失败因素，剩下的才是成功路径。",
    usage: "决策前列出失败清单；内容创作先做「避坑」再谈「爆款」。",
    limitNote: "逆向排查不能替代正向构建与执行。",
    sourceRef: "框架 §第一层 #3",
  },
  {
    id: "meta-circle",
    label: "能力圈边界",
    ring: "R1",
    status: "active",
    summary: "每个模型有明确适用范围；超出边界强行使用必然出错。",
    usage: "每条结论须说明适用边界与「不适用的情况」。",
    limitNote: "能力圈会随学习扩大，但扩张须慢于行动半径。",
    sourceRef: "框架 §第一层 #4",
  },
  {
    id: "meta-checklist",
    label: "清单化决策",
    ring: "R1",
    status: "active",
    summary: "将核心模型做成固定检查清单，逐项过审，对抗大脑的遗漏与选择性忽略。",
    usage: "重要决策走清单，而非凭直觉扫一眼。",
    limitNote: "清单过细会僵化；须定期根据复盘修剪。",
    sourceRef: "框架 §第一层 #5",
  },

  // R2 · 数学与统计
  {
    id: "compound-interest",
    label: "复利原理",
    ring: "R2",
    discipline: "math",
    status: "active",
    summary: "增长在积累基础上指数级放大；微小优势或劣势经时间拉开巨大差距。",
    usage: "认知：长期主义、积累效应。创作：选题长期价值、个人品牌积累。",
    sourceRef: "框架 §第二层 · 数学与统计",
  },
  {
    id: "margin-of-safety",
    label: "安全边际",
    ring: "R2",
    discipline: "math",
    status: "active",
    summary: "永远留容错空间，不把资源用到极限；计划与执行之间须预留缓冲。",
    usage: "风险控制、时间规划、选题产能预留。",
    sourceRef: "框架 §第二层 · 数学与统计",
  },
  {
    id: "decision-tree",
    label: "决策树",
    ring: "R2",
    discipline: "math",
    status: "active",
    summary: "把复杂问题拆成多分支节点，逐层计算路径期望值，再选较优解。",
    usage: "复杂问题结构化拆解、多方案比较。",
    sourceRef: "框架 §第二层 · 数学与统计",
  },

  // R2 · 心理学
  {
    id: "social-proof",
    label: "社会认同",
    ring: "R2",
    discipline: "psychology",
    status: "active",
    summary: "人自动参照他人行为判断自己该怎么做；从众既省力也危险。",
    usage: "理解从众、设计内容的社会认同触点。",
    sourceRef: "框架 §第二层 · 心理学 #15",
  },
  {
    id: "loss-aversion",
    label: "被剥夺超级反应",
    ring: "R2",
    discipline: "psychology",
    status: "active",
    summary: "失去的痛苦远大于得到的快乐；损失厌恶塑造大量非理性决策。",
    usage: "稀缺/损失叙事、风险评估中的「怕失去」维度。",
    sourceRef: "框架 §第二层 · 心理学 #14",
  },
  {
    id: "availability-bias",
    label: "错误衡量易得性",
    ring: "R2",
    discipline: "psychology",
    status: "active",
    summary: "大脑高估「容易想到」之事的重要性；鲜活案例≠高概率。",
    usage: "纠正凭印象判断；设计记忆点但不混淆频率。",
    sourceRef: "框架 §第二层 · 心理学 #18",
  },

  // R2 · 物理与工程
  {
    id: "redundancy",
    label: "冗余备份",
    ring: "R2",
    discipline: "physics",
    status: "active",
    summary: "关键系统须有备份；单点故障不应导致整体崩溃。",
    usage: "风险预案、抗脆弱、多渠道分发与选题储备。",
    sourceRef: "框架 §第二层 · 物理与工程",
  },
  {
    id: "feedback-loop",
    label: "反馈回路",
    ring: "R2",
    discipline: "physics",
    status: "active",
    summary: "输出反过来影响输入；正反馈加速变化，负反馈维持稳定。",
    usage: "理解增长/衰退循环、传播飞轮与用户反馈优化。",
    sourceRef: "框架 §第二层 · 物理与工程",
  },

  // R2 · 生物与生态
  {
    id: "niche",
    label: "生态位",
    ring: "R2",
    discipline: "biology",
    status: "active",
    summary: "每个物种有独特生存空间；错位竞争比正面硬刚更易存活。",
    usage: "个人定位、差异化、细分赛道与内容边界。",
    sourceRef: "框架 §第二层 · 生物与生态",
  },
  {
    id: "natural-selection",
    label: "自然选择",
    ring: "R2",
    discipline: "biology",
    status: "active",
    summary: "环境筛选最适配者；不是最强存活，是最能适应变化者存活。",
    usage: "赛道选择、风格进化、接受渐进式迭代。",
    sourceRef: "框架 §第二层 · 生物与生态",
  },

  // R2 · 微观经济
  {
    id: "opportunity-cost",
    label: "机会成本",
    ring: "R2",
    discipline: "economics",
    status: "active",
    summary: "做 A 的成本是放弃 B 的最大收益；凡事都有看不见的代价。",
    usage: "选题取舍、时间投入判断、资源分配。",
    sourceRef: "框架 §第二层 · 微观经济学",
  },
  {
    id: "moat",
    label: "护城河",
    ring: "R2",
    discipline: "economics",
    status: "active",
    summary: "难以复制的核心优势；没有护城河的高利润不可持续。",
    usage: "核心竞争力、个人品牌壁垒、长期价值评估。",
    sourceRef: "框架 §第二层 · 微观经济学",
  },

  // R2 · 元思维
  {
    id: "first-principles",
    label: "第一性原理",
    ring: "R2",
    discipline: "meta-thinking",
    status: "active",
    summary: "回到最根本事实，从基础原理重新推导，而非类比和模仿。",
    usage: "本质思考、创新、深度分析类选题。",
    sourceRef: "框架 §第二层 · 元思维",
  },

  // R3 · 场景占位
  {
    id: "scene-invest",
    label: "投资决策",
    ring: "R3",
    status: "placeholder",
    summary: "场景化应用层 · 待补充案例与模型组合路径。",
    sourceRef: "IA §四 R3",
  },
  {
    id: "scene-relate",
    label: "人际沟通",
    ring: "R3",
    status: "placeholder",
    summary: "场景化应用层 · 待补充案例与模型组合路径。",
    sourceRef: "IA §四 R3",
  },
  {
    id: "scene-growth",
    label: "个人成长",
    ring: "R3",
    status: "placeholder",
    summary: "场景化应用层 · 待补充案例与模型组合路径。",
    sourceRef: "IA §四 R3",
  },
  {
    id: "scene-create",
    label: "内容创作",
    ring: "R3",
    status: "placeholder",
    summary: "场景化应用层 · 待补充案例与模型组合路径。",
    sourceRef: "IA §四 R3",
  },
];
