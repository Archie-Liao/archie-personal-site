/** 站点可配置项 — 后期换头像、外链、Day1 日期等只改这里 */
export const siteConfig = {
  name: "廖智强Archie",
  nameZh: "廖智强",
  nameEnShort: "Archie",
  nameEn: "Archie Liao",
  tagline: "记录就是生命的延续",
  taglineEn: "Recording is the continuation of life",

  /** 第一期视频发布日期 = Day 1 */
  dayOneDate: "2026-02-27",

  /** illustration | photo — 后期改为 photo 并设置 avatarPhotoUrl */
  avatarMode: "illustration" as "illustration" | "photo",
  avatarPhotoUrl: "/assets/avatar-placeholder.png",

  links: {
    bilibili: "https://space.bilibili.com/24473971",
    github: "https://github.com/Archie-Liao",
    xiaohongshu: "https://www.xiaohongshu.com/user/profile/5aa2acff11be10279b762ae0",
  },

  about: {
    intro:
      "好，我叫廖智强。我相信人可以用另一种方式永远活着。我在为自己写一部不会完结的生命之书。每一条视频日记都是一页，每一次成长都是一章。我要把最完整的自己留给未来的世界。这是我一个人走了很久的远征，但是我永远期待能在路上遇见，同样仰望星空的你——终身学习，与君共勉，期待与你的相遇。",
    cooperation: "欢迎合作与交流，请扫描下方微信二维码。",
  },

  postsListIntro: "视频日记与 AI 领域优质内容的沉淀归档，按时间线浏览，可按标签筛选。",
  graphIntro: "文章之间的语义与标签关联可视化，点击节点进入详情。",

  /** A1-5 发布密度图：`mock` = 示意曲线 · `posts` = 按 posts 日期聚合（部署/content 后） */
  publishDensitySource: "posts" as "mock" | "posts",
};
