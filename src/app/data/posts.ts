import type { SiteTag } from "./tags";

export interface KnowledgeCard {
  id: string;
  front: string;
  back: string;
  tag: string;
}

export interface ContentItem {
  id: string;
  type: "video" | "link" | "note";
  title: string;
  date: string;
  tags: SiteTag[];
  coverUrl: string;
  featured?: boolean;
  views?: number;
  episode?: number;
  bvid?: string;
  sourceUrl?: string;
  sourceName?: string;
  aiSummary: {
    overview: string;
    keyPoints: string[];
    quote: string;
  };
  knowledgeCards: KnowledgeCard[];
  /** 外链/笔记详情页延展段落（验收长页 · 摘抄自条目本身） */
  archiveNotes?: string[];
  /** public/subtitles/{id}.txt — 纯文本字幕稿，无时间轴 */
  subtitlePath?: string;
}

const VIDEO_COVERS = [
  "/assets/img/antique_botanical_illustration_plate_Curtis_s_botanical.jpg",
  "/assets/img/Pieris_butterfly_plate_Pieris_wollastoni-PD.png",
  "/assets/img/vintage_butterfly_engraving_The_butterflies_of_the_east.jpg",
] as const;

function videoCover(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return VIDEO_COVERS[h % VIDEO_COVERS.length];
}

export const posts: ContentItem[] = [
  {
    id: "ep099",
    type: "video",
    episode: 99,
    title: "成长会自动消解很多难题",
    date: "2025-06-20",
    coverUrl: videoCover("ep099"),
    bvid: "BV1GJ411x7h7",
    tags: ["人生", "认知", "观点", "原创"],
    featured: true,
    views: 128,
    aiSummary: {
      overview:
        "本期从个人成长曲线切入：许多当下看似无解的困境，并非需要立刻找到完美答案，而是在持续行动与积累中自然松动。Archie 结合近100期日记的体感，梳理「成长消解难题」的三条机制。",
      keyPoints: [
        "难题的「尺寸」会随认知水位变化——同一问题在不同阶段权重不同",
        "行动本身会改变问题定义，很多焦虑来自对静止状态的想象",
        "记录与复盘让隐性成长显性化，避免「感觉不到进步」的错觉",
      ],
      quote: "不是你变聪明了才去做，而是你做了，难题才显得没那么大。",
    },
    knowledgeCards: [
      {
        id: "kc-099-1",
        front: "成长型思维 Growth Mindset",
        back: "Carol Dweck 提出：能力可通过努力与策略提升。面对难题时，关注「如何进步」而非「我是否足够好」。",
        tag: "认知",
      },
      {
        id: "kc-099-2",
        front: "问题重构 Problem Reframing",
        back: "同一情境在不同框架下会被体验为不同难度。行动后获得的新信息，往往比事前推演更能澄清问题本质。",
        tag: "方法",
      },
    ],
    subtitlePath: "/subtitles/ep099.txt",
  },
  {
    id: "ep098",
    type: "video",
    episode: 98,
    title: "学会用筷子，却发现没菜可夹",
    date: "2025-06-19",
    coverUrl: videoCover("ep098"),
    bvid: "BV1GJ411x7h7",
    tags: ["AI", "方法", "认知", "原创"],
    views: 96,
    aiSummary: {
      overview:
        "用「学会用筷子却没菜」比喻 AI 时代的技能困境：工具掌握速度远快于可用场景与优质输入的积累。探讨如何把 AI 能力转化为真实产出。",
      keyPoints: [
        "工具熟练 ≠ 问题解决，输入质量决定输出上限",
        "「菜」= 领域知识、真实问题、可验证的目标",
        "日更式小项目比一次性大计划更利于把 AI 用起来",
      ],
      quote: "AI 是一双筷子，你得先有一盘菜，再谈夹得多准。",
    },
    knowledgeCards: [
      {
        id: "kc-098-1",
        front: "工具理性 Instrumental Rationality",
        back: "在明确目标的前提下选择有效手段。仅有工具而无目标，容易陷入「为了用 AI 而用 AI」。",
        tag: "认知",
      },
    ],
    subtitlePath: "/subtitles/ep098.txt",
  },
  {
    id: "ep097",
    type: "video",
    episode: 97,
    title: "手机被忽视，AI正在重蹈覆辙",
    date: "2025-06-18",
    coverUrl: videoCover("ep097"),
    bvid: "BV1GJ411x7h7",
    tags: ["AI", "商业", "观点", "原创"],
    views: 84,
    aiSummary: {
      overview: "对比智能手机早期「功能堆砌、体验割裂」的阶段，讨论当前 AI 产品是否正在重复同样的路径，以及个人使用者如何保持清醒。",
      keyPoints: [
        "技术革命早期常见「能力溢出、场景不足」",
        "个人应优先建立工作流，而非追逐每个新模型",
        "沉淀场景比追逐参数更有长期价值",
      ],
      quote: "每一代革命都会先制造噪音，再留下少数真正改变习惯的东西。",
    },
    knowledgeCards: [],
    subtitlePath: "/subtitles/ep097.txt",
  },
  {
    id: "ep096",
    type: "video",
    episode: 96,
    title: "信息爆炸！别怕错过优质内容",
    date: "2025-06-17",
    coverUrl: videoCover("ep096"),
    bvid: "BV1GJ411x7h7",
    tags: ["认知", "方法", "原创"],
    views: 72,
    aiSummary: {
      overview: "在 AI 资讯与内容过载环境下，建立个人过滤系统：从 FOMO 转向「可检索的沉淀」，与本站的定位直接相关。",
      keyPoints: [
        "错过大多数资讯是正常的，关键是抓住少数高价值源",
        "外部收藏必须进入个人系统才有复利",
        "标签 + 摘要 + 原文链接是最小可用沉淀单元",
      ],
      quote: "不怕错过一条资讯，怕的是错过之后无法找回真正重要的那条。",
    },
    knowledgeCards: [
      {
        id: "kc-096-1",
        front: "FOMO Fear of Missing Out",
        back: "错失恐惧驱动的不停刷新。解药不是看更多，而是建立可信任的个人过滤与归档系统。",
        tag: "认知",
      },
    ],
    subtitlePath: "/subtitles/ep096.txt",
  },
  {
    id: "ep095",
    type: "video",
    episode: 95,
    title: "西西弗少儿区，原来我看错了",
    date: "2025-06-16",
    coverUrl: videoCover("ep095"),
    bvid: "BV1GJ411x7h7",
    tags: ["社会", "观点", "原创"],
    views: 65,
    aiSummary: {
      overview: "讨论 B 站「少儿区」标签与内容生态的误解，以及创作者如何理解平台分类与受众预期。（摘要待 Archie 补全）",
      keyPoints: [
        "平台标签不等于内容本身的受众定位",
        "分类机制影响推荐，但不定义创作价值",
        "待补：本期核心观点",
      ],
      quote: "待补本期金句。",
    },
    knowledgeCards: [],
    subtitlePath: "/subtitles/ep095.txt",
  },
  {
    id: "link-fugu",
    type: "link",
    title: "Sakana AI 发布 Fugu 多智能体编排系统",
    date: "2025-06-15",
    coverUrl: "",
    sourceUrl: "https://aihot.virxact.com/all",
    sourceName: "AIHOT",
    tags: ["AI", "商业", "文章"],
    views: 54,
    featured: true,
    aiSummary: {
      overview:
        "Sakana AI 推出 Fugu / Fugu Ultra，通过单一 API 编排多智能体团队，在若干公开基准上对标 Claude Fable 5 与 Mythos。产品叙事强调「测试时扩展」：不是堆更大的基座，而是在推理阶段动态调度专长 agent。\n\nFugu 把「规划—执行—复核—汇总」拆成可替换的角色槽位。开发者只需描述任务目标与约束，编排层负责选人、传上下文、合并中间结果。对个人站而言，这类外链收藏的价值在于：它把「多 agent 协作」从论文/demo 拉到了可计费 API 的形态。\n\n区域可用性与出口管制仍是现实约束：同一套编排能力在不同地区可能对应不同模型后端。归档时建议同时记下发布渠道（AIHOT 转述）与原始公告链接，避免日后只剩二手摘要。\n\n本条刻意写长，用于验收 `/posts` 右栏随页滚与 `/post/link-fugu` 详情页约三屏阅读动线；内容摘编自公开报道与 Sakana 产品页表述，非逐字翻译。",
      keyPoints: [
        "编排层可能是下一跳：不是更大基座，而是更聪明的测试时调度",
        "多 agent 协作从实验室走向可调用 API，定价按 token / 步数分层",
        "Fugu Ultra 面向长链路任务：子 agent 可并行，主 orchestrator 负责冲突消解",
        "出口管制与区域可用性仍是现实约束，部署前需核对模型后端清单",
        "与 Claude Fable 5 的对标主要在「多步推理 + 工具调用」类基准，而非纯聊天",
        "个人工作流可借鉴：把重复子任务（检索、表格、草拟）拆成固定角色模板",
        "风险点：编排错误会放大——一步选错 agent，后续全链输出可能看似连贯实则偏题",
        "可观测性：需要记录每步 agent 输入输出，否则 debug 成本高于单模型",
        "与 GLM / 开源模型的关系：编排层可与 cheaper 模型组合，降低探索型任务成本",
        "网站 P2 规划：若 content 管道就绪，可把此类外链升级为「摘要 + 原文摘录 + 我的批注」",
        "验收提示：在列表页选中本篇，右栏应出现阅读延展；滚页面主滚动条，右栏随页下移",
        "验收提示：点「读全文」进入本页，AI 总结 + 导图 + 归档摘抄应撑满约三屏",
      ],
      quote: "更智能的编排，可能比更大的模型更接近下一阶能力跃升。",
    },
    knowledgeCards: [
      {
        id: "kc-fugu-1",
        front: "Multi-Agent Orchestration",
        back: "多个模型/角色按流程协作完成复杂任务。编排层负责分工、调度与汇总，而非单模型端到端完成。",
        tag: "AI",
      },
      {
        id: "kc-fugu-2",
        front: "Test-Time Scaling",
        back: "在推理阶段投入更多计算（多步、多 agent、投票）以换质量，与训练时 scaling 相对。Fugu 属于此路线的产品化尝试。",
        tag: "AI",
      },
      {
        id: "kc-fugu-3",
        front: "Orchestrator Pattern",
        back: "主控 agent 维护全局计划，子 agent 领取子任务并回报结构化结果。失败时可重试或换角，而非整段重生成。",
        tag: "方法",
      },
      {
        id: "kc-fugu-4",
        front: "API 化协作",
        back: "把 agent 团队封装成单一 endpoint，降低集成成本；代价是黑盒度上升，需要日志与 tracing 才能审计。",
        tag: "商业",
      },
      {
        id: "kc-fugu-5",
        front: "区域后端",
        back: "同一 SKU 在不同地区可能路由到不同模型供应商；合规与 latency 需在选型时一并考虑。",
        tag: "商业",
      },
    ],
    archiveNotes: [
      "【背景】Sakana AI 以「小型高效模型 + 演化/组合」路线闻名；Fugu 系列则是其在 agent 编排方向的商业化延伸。Ultra 档强调更长上下文窗口 与 更多并行子任务，适合报告生成、竞品扫描、代码库级 refactor 规划等需要多轮分工的场景。",
      "【与 Fable 5 的对标语境】公开材料中的对比多集中在 agentic benchmark：工具调用是否正确、计划是否可分解、最终答案是否自洽。需要注意 benchmark 与真实业务任务之间的 gap——前者往往有清晰 rubric，后者更依赖领域知识与隐性约束。",
      "【个人可用性】若你已在用 Cursor / Claude Code 类工具，Fugu 的差异主要在「团队模板是否可 API 化、是否可嵌入自有数据管道」。对个人博客/知识站，更现实的用法可能是：把「摘要外链 → 抽卡片 → 挂标签」做成固定 agent 流水线，而非直接替换写作助手。",
      "【归档策略】外链收藏建议保留：标题、来源平台、抓取日期、原文 URL、3–5 条可检索要点、以及一段「我为什么存」。本页后半的 archiveNotes 即模拟未来 md frontmatter 里的 notes 字段；P1 仍用 posts.ts mock。",
      "【滚动验收说明】请在本页连续向下滚约三屏：第一屏 hero + AI 总结前半；第二屏要点列表 + 关键词/可落地检查 + 金句；第三屏思维导图 + 原文链 + 归档摘抄。列表页 `/posts` 选中本篇时，右栏预览也应足够长，以便确认「右栏不用列内滚动条、随页面主滚动条移动」。",
    ],
  },
  {
    id: "link-glm",
    type: "link",
    title: "GLM-5.2 与 Fable 5 同 prompt 测评对比",
    date: "2025-06-14",
    coverUrl: "",
    sourceUrl: "https://aihot.virxact.com/all",
    sourceName: "AIHOT",
    tags: ["AI", "方法", "文章"],
    views: 48,
    aiSummary: {
      overview: "同一任务下 GLM-5.2 与 Fable 5 的效果与成本对比：前者约九成质量、价格差可达数十倍，引发「默认选项改变」的讨论。",
      keyPoints: [
        "当开源/国产模型「够好且够便宜」，探索型任务默认选项会迁移",
        "测评应固定 prompt 与参考图，避免叙事性偏差",
        "成本差异会重塑个人与小团队的工作流",
      ],
      quote: "当便宜到可以随便试，创意会先流向低成本方案。",
    },
    knowledgeCards: [],
  },
  {
    id: "ep094",
    type: "video",
    episode: 94,
    title: "一个比喻讲透AI与人的关系",
    date: "2025-06-13",
    coverUrl: videoCover("ep094"),
    bvid: "BV1GJ411x7h7",
    tags: ["AI", "认知", "观点", "原创"],
    views: 41,
    aiSummary: {
      overview: "用「镜子 / 杠杆 / 协作者」三个比喻拆解 AI 与人的关系，帮助粉丝建立不神化、不贬低的日常使用心态。",
      keyPoints: [
        "AI 像镜子：输出反映你的提问与上下文",
        "AI 像杠杆：放大已有能力，而非凭空创造方向",
        "AI 像协作者：需要分工、验收与边界",
      ],
      quote: "管理 AI 和管理人一样，给错层级指令，越强越痛苦。",
    },
    knowledgeCards: [],
    subtitlePath: "/subtitles/ep094.txt",
  },
];

export function getPostById(id: string): ContentItem | undefined {
  return posts.find((p) => p.id === id);
}

export function getFeaturedPosts(): ContentItem[] {
  return posts.filter((p) => p.featured);
}

export function getTopPostsByViews(limit = 3): ContentItem[] {
  return [...posts].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, limit);
}

export function getLatestPost(): ContentItem {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))[0];
}

export function getRecentPosts(limit = 14): ContentItem[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

/** 标签共现 + 标题词重叠 → 图谱连边权重 */
function postPairWeight(a: ContentItem, b: ContentItem): number {
  const tagOverlap = (a.tags ?? []).filter((t) => (b.tags ?? []).includes(t)).length;
  const tagScore = tagOverlap / Math.max((a.tags ?? []).length, (b.tags ?? []).length, 1);
  const wordsA = new Set(a.title.split(/\s+/));
  const wordsB = new Set(b.title.split(/\s+/));
  let wordOverlap = 0;
  wordsA.forEach((w) => {
    if (wordsB.has(w)) wordOverlap++;
  });
  const wordScore = wordOverlap / Math.max(wordsA.size, wordsB.size, 1);
  return tagScore * 0.7 + wordScore * 0.3;
}

/** 与当前篇共现权重最高的一篇（用于详情边注） */
export function getRelatedPost(postId: string, threshold = 0.15): ContentItem | undefined {
  const current = getPostById(postId);
  if (!current) return undefined;

  let best: { post: ContentItem; weight: number } | undefined;
  for (const other of posts) {
    if (other.id === postId) continue;
    const weight = postPairWeight(current, other);
    if (weight >= threshold && (!best || weight > best.weight)) {
      best = { post: other, weight };
    }
  }
  return best?.post;
}

/** 标签共现 + 标题词重叠 → 图谱连边权重 */
export function getGraphEdges(threshold = 0.15): { source: string; target: string; weight: number }[] {
  const edges: { source: string; target: string; weight: number }[] = [];
  for (let i = 0; i < posts.length; i++) {
    for (let j = i + 1; j < posts.length; j++) {
      const a = posts[i];
      const b = posts[j];
      const weight = postPairWeight(a, b);
      if (weight >= threshold) {
        edges.push({ source: a.id, target: b.id, weight });
      }
    }
  }
  return edges;
}
