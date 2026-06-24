# 廖智强 Archie 个人网站 — 实现方案

## Context

用户是内容创作者，需要一个个人日更视频日记博客网站，沉淀每期视频的 AI 总结、知识卡片、完整字幕。核心是**内容优先**，面向粉丝和同频学习者。

---

## 整体架构

采用 React Router 多页面结构，主色调偏向**深色沉浸式**风格（适合内容阅读），字体干净、排版舒适。

### 页面结构

```
/ (首页)          — 最新视频日记列表，卡片式布局
/post/:id         — 单篇日记详情页（核心页）
/about            — 关于 Archie
```

---

## 核心页面设计

### 1. 首页 `/`

- **顶部导航栏**：Logo「廖智强 Archie」+ 导航链接（日记、关于）
- **Hero 区**：一句话定位语 + 最新一期视频封面高亮展示
- **日记列表**：卡片网格，每张卡片含：
  - 视频封面缩略图
  - 期号 + 标题
  - 发布日期
  - AI 摘要（2-3 句）
  - 标签（知识卡片数量、字幕标记）

### 2. 详情页 `/post/:id` — 核心页

内容分四个 Tab / 区块：

| 区块 | 内容 |
|------|------|
| 🎬 视频 | 嵌入视频播放器（YouTube/B站 iframe）|
| 🤖 AI 总结 | 结构化摘要，要点列表，金句高亮 |
| 🃏 知识卡片 | 卡片式知识点，可翻转展示（正面概念/背面解释）|
| 📝 完整字幕 | 时间轴字幕，可搜索关键词 |

### 3. 关于页 `/about`

- 头像 + 个人介绍
- 创作理念
- 社交媒体链接

---

## Mock 数据结构

```typescript
interface Post {
  id: string;
  episode: number;          // 期号，如 42
  title: string;
  date: string;
  coverUrl: string;
  videoUrl: string;         // B站 bvid，如 "BV1xx411c7mD"
  aiSummary: {
    overview: string;
    keyPoints: string[];
    quote: string;
  };
  knowledgeCards: {
    id: string;
    front: string;          // 概念名
    back: string;           // 解释
    tag: string;
  }[];
  subtitles: {
    time: string;           // "00:01:23"
    text: string;
  }[];
  tags: string[];
}
```

---

## 技术选型

| 需求 | 方案 |
|------|------|
| 路由 | `react-router` v7（已安装）|
| 图标 | `lucide-react`（已安装）|
| 动画 | `motion/react`（已安装）|
| 卡片翻转 | CSS 3D transform（原生，无需额外包）|
| 字幕搜索 | React state 过滤（纯前端）|
| 图片 | `ImageWithFallback` 组件 + Unsplash |
| 样式 | Tailwind v4 + 自定义深色主题 tokens |

---

## 文件结构

```
src/app/
├── App.tsx                          # Router 配置
├── components/
│   ├── Layout.tsx                   # 顶部导航 + 页脚
│   ├── PostCard.tsx                 # 首页日记卡片
│   ├── VideoPlayer.tsx              # 视频嵌入组件
│   ├── KnowledgeCard.tsx            # 可翻转知识卡片
│   ├── SubtitleViewer.tsx           # 字幕时间轴+搜索
│   └── figma/ImageWithFallback.tsx  # 已存在
├── pages/
│   ├── HomePage.tsx                 # 首页
│   ├── PostPage.tsx                 # 详情页
│   └── AboutPage.tsx               # 关于页
└── data/
    └── mockPosts.ts                 # Mock 数据（3-5 篇示例）
```

---

## 主题风格

- **背景**：深灰近黑 `#0f0f0f`，内容区略浅 `#1a1a1a`
- **主色调**：暖橙金 `#f5a623`（呼应视频/创作感）
- **字体**：系统 sans-serif，中文用 Noto Sans SC（Google Fonts）
- **卡片**：圆角 `12px`，微妙边框光感，hover 有轻微上浮动画

---

## 验证方式

1. 首页能看到视频日记卡片列表，点击进入详情页
2. 详情页四个区块（视频/AI总结/知识卡片/字幕）均正常渲染
3. 知识卡片点击后有翻转动画
4. 字幕区输入关键词能过滤结果
5. 关于页正常显示
6. 移动端响应式布局正常

---

## 待确认事项（已在下方提问用户）

- 视频平台（B站/YouTube/两者都有）
- 是否需要暗色/亮色主题切换
- 社交媒体平台链接
