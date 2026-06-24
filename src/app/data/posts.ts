import type { SiteTag } from "./tags";

export interface KnowledgeCard {
  id: string;
  front: string;
  back: string;
  tag: string;
}

export interface Subtitle {
  time: string;
  text: string;
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
  subtitles?: Subtitle[];
}

export const posts: ContentItem[] = [
  {
    id: "ep099",
    type: "video",
    episode: 99,
    title: "成长会自动消解很多难题",
    date: "2025-06-20",
    coverUrl: "",
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
    subtitles: [
      { time: "00:00:00", text: "大家好，我是 Archie，第 99 期视频日记。" },
      { time: "00:00:08", text: "今天想聊一个我最近越来越确定的感受：成长会自动消解很多难题。" },
      { time: "00:00:22", text: "不是说难题会消失，而是它在你能力坐标系里的「尺寸」变了。" },
      { time: "00:00:35", text: "三个月前让我失眠的事，现在回头看，可能只是当时水位不够。" },
      { time: "00:00:48", text: "行动会改变你对问题的定义，这是静态思考很难抵达的地方。" },
      { time: "00:01:02", text: "如果你也感觉卡住，不妨先记录、再行动，让成长自己说话。" },
    ],
  },
  {
    id: "ep098",
    type: "video",
    episode: 98,
    title: "学会用筷子，却发现没菜可夹",
    date: "2025-06-19",
    coverUrl: "",
    bvid: "BV1GJ411x7h7",
    tags: ["AI", "方法", "随想", "原创"],
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
    subtitles: [
      { time: "00:00:00", text: "第 98 期，一个有点怪的比喻：学会用筷子，却发现没菜可夹。" },
      { time: "00:00:12", text: "这两年 AI 工具学得太快了，快到我经常觉得自己只是在练筷子功。" },
      { time: "00:00:25", text: "真正稀缺的是问题、上下文、和愿意长期打磨的领域。" },
    ],
  },
  {
    id: "ep097",
    type: "video",
    episode: 97,
    title: "手机被忽视，AI正在重蹈覆辙",
    date: "2025-06-18",
    coverUrl: "",
    bvid: "BV1GJ411x7h7",
    tags: ["AI", "社会", "观点", "原创"],
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
    subtitles: [
      { time: "00:00:00", text: "第 97 期，聊聊 AI 和手机早期有多像。" },
      { time: "00:00:10", text: "还记得智能手机刚开始也是功能又多又杂吗？" },
    ],
  },
  {
    id: "ep096",
    type: "video",
    episode: 96,
    title: "信息爆炸！别怕错过优质内容",
    date: "2025-06-17",
    coverUrl: "",
    bvid: "BV1GJ411x7h7",
    tags: ["认知", "方法", "记录", "原创"],
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
    subtitles: [
      { time: "00:00:00", text: "第 96 期，信息爆炸时代，如何不怕错过？" },
    ],
  },
  {
    id: "ep095",
    type: "video",
    episode: 95,
    title: "一个比喻讲透AI与人的关系",
    date: "2025-06-16",
    coverUrl: "",
    bvid: "BV1GJ411x7h7",
    tags: ["AI", "认知", "观点", "原创"],
    views: 65,
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
    subtitles: [
      { time: "00:00:00", text: "第 95 期，三个比喻讲透 AI 和人的关系。" },
    ],
  },
  {
    id: "link-fugu",
    type: "link",
    title: "Sakana AI 发布 Fugu 多智能体编排系统",
    date: "2025-06-15",
    coverUrl: "",
    sourceUrl: "https://aihot.virxact.com/all",
    sourceName: "AI HOT",
    tags: ["AI", "商业", "文章"],
    views: 54,
    featured: true,
    aiSummary: {
      overview:
        "Sakana AI 推出 Fugu / Fugu Ultra，通过单一 API 编排多智能体团队，基准表现对标 Claude Fable 5 与 Mythos。适合作为「外链收藏」类型的示例条目。",
      keyPoints: [
        "编排层可能是下一跳：不是更大基座，而是更聪明的测试时调度",
        "多 agent 协作从实验室走向可调用 API",
        "出口管制与区域可用性仍是现实约束",
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
    ],
  },
  {
    id: "link-glm",
    type: "link",
    title: "GLM-5.2 与 Fable 5 同 prompt 测评对比",
    date: "2025-06-14",
    coverUrl: "",
    sourceUrl: "https://aihot.virxact.com/all",
    sourceName: "AI HOT",
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
    title: "踩了两个坑，总结出两大洞见",
    date: "2025-06-13",
    coverUrl: "",
    bvid: "BV1GJ411x7h7",
    tags: ["复盘", "方法", "记录", "原创"],
    views: 41,
    aiSummary: {
      overview: "复盘两期内容制作中的失误：过度追求完整字幕而延迟发布、摘要写得太长失去 skim 价值。提出「最小可发布单元」原则。",
      keyPoints: [
        "先发布可检索版本，再迭代丰富度",
        "摘要的第一屏必须回答「这期值不值得点」",
        "错误日志和成功日志同样值得沉淀",
      ],
      quote: "完美是发布的敌人，可检索的草稿是朋友。",
    },
    knowledgeCards: [],
    subtitles: [
      { time: "00:00:00", text: "第 94 期，两个坑，两个洞见。" },
    ],
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
export function getGraphEdges(threshold = 0.15): { source: string; target: string; weight: number }[] {
  const edges: { source: string; target: string; weight: number }[] = [];
  for (let i = 0; i < posts.length; i++) {
    for (let j = i + 1; j < posts.length; j++) {
      const a = posts[i];
      const b = posts[j];
      const tagOverlap = a.tags.filter((t) => b.tags.includes(t)).length;
      const tagScore = tagOverlap / Math.max(a.tags.length, b.tags.length, 1);
      const wordsA = new Set(a.title.split(/\s+/));
      const wordsB = new Set(b.title.split(/\s+/));
      let wordOverlap = 0;
      wordsA.forEach((w) => {
        if (wordsB.has(w)) wordOverlap++;
      });
      const wordScore = wordOverlap / Math.max(wordsA.size, wordsB.size, 1);
      const weight = tagScore * 0.7 + wordScore * 0.3;
      if (weight >= threshold) {
        edges.push({ source: a.id, target: b.id, weight });
      }
    }
  }
  return edges;
}
