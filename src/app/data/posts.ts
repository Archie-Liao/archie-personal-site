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
  /**
   * Archie 亲笔旁注（评书 / 灵感 / 闲话；导图等可视化另议）。
   * 空则详情页显示「待亲笔」占位，不再自动抽关键词导图。
   */
  authorNote?: string;
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
    date: "2026-06-05",
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
    date: "2026-06-04",
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
    date: "2026-06-03",
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
    date: "2026-06-02",
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
    date: "2026-06-01",
    coverUrl: videoCover("ep095"),
    bvid: "BV1GJ411x7h7",
    tags: ["社会", "观点", "原创"],
    views: 65,
    aiSummary: {
      overview:
        "六一路过西西弗少儿区，打破「环球中心没人带孩子」的刻板印象：平时上班路过看不到的人群，节假日才显现。平台与商家往往做过调研，观众用片面时间切片判断，容易误判对方「蠢」。",
      keyPoints: [
        "观察窗口偏了，结论就会偏——别用工作日午后推断周末客流",
        "「少儿专区」不是拍脑袋：背后通常有实地与数据",
        "认知更新靠换时间点出现，而不是在熟悉路径上重复确认",
      ],
      quote: "其实没有那么多蠢人——是你没在对的时间看见他们。",
    },
    knowledgeCards: [],
    subtitlePath: "/subtitles/ep095.txt",
  },
  {
    id: "link-llm-wiki",
    type: "link",
    title: "Karpathy · LLM Wiki：用 LLM 编译个人知识库",
    date: "2026-04-04",
    coverUrl: "",
    sourceUrl: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
    sourceName: "Gist",
    tags: ["AI", "知识管理", "方法"],
    views: 54,
    featured: true,
    aiSummary: {
      overview:
        "**核心差别：编译，而不是每次重搜。** Andrej Karpathy 提出用 LLM 增量维护一套互链的 markdown wiki：知识写进文件并持续更新，而不是像常见 RAG 那样每次提问再拼碎片。\n\n**三层结构。** Raw 原料只读；Wiki 由 LLM 撰写与互链；Schema（如 AGENTS.md）规定摄入、问答、体检怎么做。日常操作是 Ingest、Query、Lint；index.md 管目录，log.md 管时间线。\n\n**对本站的启发。** `knowledge/raw/` → 将来的 wiki/content 编译层 → 站内助手问答。人负责选源与提问，Agent 负责记账式维护；中等规模往往不必先上向量库。",
      keyPoints: [
        "**持久 wiki** 是复利资产：交叉引用与综合不在每次提问时重算",
        "人负责选源与提问；**LLM 负责**摘要、互链、维护",
        "**Schema** 把通用聊天变成守纪律的 wiki 维护者",
        "Ingest / Query / Lint；**好答案可回写**进 wiki",
        "index.md + log.md 在中等规模可替代重型 RAG",
        "与本站路线对齐：**raw → 编译 → 只读展示 + 助手**",
      ],
      quote: "Wiki is a persistent, compounding artifact — compiled once, kept current.",
    },
    knowledgeCards: [
      {
        id: "kc-wiki-1",
        front: "Compile vs RAG",
        back: "RAG 每次提问重拼碎片；Compile 先把知识写进互链 md，再在已编译层上问答。",
        tag: "AI",
      },
      {
        id: "kc-wiki-2",
        front: "Raw / Wiki / Schema",
        back: "原料只读；wiki 由 LLM 写；schema 规定约定与工作流。",
        tag: "方法",
      },
      {
        id: "kc-wiki-3",
        front: "Ingest · Query · Lint",
        back: "摄入更新多页；问答可回写；定期体检矛盾与孤儿页。",
        tag: "方法",
      },
    ],
    archiveNotes: [
      "原文：[gist llm-wiki.md](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) · 设计为可粘贴进 Agent 的 idea file。",
      "配套推文：[Karpathy on X](https://x.com/karpathy/status/2039805659525644595) 描述 raw→wiki、Obsidian 浏览、问答回写。",
      "对本站：与 `knowledge/raw/dialogues/` + 延后 `wiki/`/`content/` 同构；P2 捡料先填 raw，再谈编译。",
    ],
  },
  {
    id: "link-karpathy-x",
    type: "link",
    title: "Karpathy：LLM Knowledge Bases（推文）",
    date: "2026-04-02",
    coverUrl: "",
    sourceUrl: "https://x.com/karpathy/status/2039805659525644595",
    sourceName: "X",
    tags: ["AI", "知识管理", "观点"],
    views: 48,
    aiSummary: {
      overview:
        "**把 token 花在操作知识上。** Karpathy 描述近期大量吞吐用于维护个人研究知识库，而不是只写代码：原料进 raw/，LLM 编译成互链 wiki，用 Obsidian 浏览。\n\n**问答会回写。** wiki 够大后可直接对它做复杂提问；好答案、幻灯片、图表可以再归档进 wiki，让探索也复利。中等规模未必需要 fancy RAG。",
      keyPoints: [
        "原料索引 → **LLM 编译 wiki** → Obsidian 浏览",
        "问答与探索的输出应**回写**，使探索也复利",
        "**Lint** 可发现矛盾与新文章候选",
        "规模起来后再考虑检索工具甚至微调",
      ],
      quote: "Raw data is compiled by an LLM into a .md wiki — you rarely edit the wiki by hand.",
    },
    knowledgeCards: [],
  },
  {
    id: "link-toutiao-dan-koe",
    type: "link",
    title: "Dan Koe 的《如何在一天内彻底改变你的人生》完整中英对照版",
    date: "2026-04-01",
    coverUrl: "",
    sourceUrl: "https://www.toutiao.com/article/7623674696139063817/",
    sourceName: "今日头条",
    tags: ["人生", "方法", "认知"],
    views: 42,
    aiSummary: {
      overview:
        "**原文标题即本条标题。** 今日头条转载/整理的是 Dan Koe 现象级长文《How to fix your entire life in 1 day》的**完整中英对照**，不是 Karpathy / LLM Wiki 解读。\n\n**一天协议在改什么。** 重点不是 24 小时内外在翻盘，而是用一天打断自动驾驶：挖清愿景与反愿景、重写身份声明、用微行动落地，把人生当成可迭代的操作系统。\n\n**为什么收藏。** 适合当「自我校准日」操作手册；读中英对照时先抓结构（早/中/晚），再挑能立刻做的一小节，避免当成鸡汤通读。",
      keyPoints: [
        "**身份先于习惯**：卡住往往是旧身份，不是缺自律",
        "早晨做**心理挖掘**：愿景 / 反愿景 / 身份声明",
        "白天**打断自动驾驶**：随机提醒，问自己在靠近还是逃避",
        "晚上**整合**：写下阻碍模式 + 年/月/日杠杆行动",
        "把人生**游戏化**：目标当主线任务，降低长期执行摩擦力",
      ],
      quote: "困住你的往往不是生活本身，而是你从未认真设计过如何好好生活。",
    },
    knowledgeCards: [
      {
        id: "kc-koe-1",
        front: "身份重塑",
        back: "习惯是表象；先改「我是哪种人」的声明，行为才跟得上。",
        tag: "认知",
      },
      {
        id: "kc-koe-2",
        front: "反愿景",
        back: "写清绝不接受的生活画面，比只写正向目标更能拉出真实动机。",
        tag: "方法",
      },
      {
        id: "kc-koe-3",
        front: "微启动",
        back: "重启日末尾只做一件能感到「我在创造」的小事，种下行动种子。",
        tag: "方法",
      },
    ],
    archiveNotes: [
      "平台标题以头条页为准；本条 id 由误标的 LLM Wiki 解读更正为 Dan Koe 中英对照（2026-07-17）。",
      "原文英文题：How to fix your entire life in 1 day · 作者 Dan Koe。",
    ],
  },
  {
    id: "ep094",
    type: "video",
    episode: 94,
    title: "一个比喻讲透AI与人的关系",
    date: "2026-05-31",
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
