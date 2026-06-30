# Frontmatter 速查卡

## 必填字段

```yaml
---
title: "页面标题"
type: personal|external
category: daily|summary|opinion|articles|books|papers
private: true|false
tags: ["主题标签", "类型标签"]
datetime: "2026-05-18 14:30:00"
sources:
  - raw/personal/daily/某文件.md
stale: false
---
```

## 选填字段

```yaml
---
keywords: ["关键词1", "关键词2", "关键词3"]
confidence: 0.95
version: "v1.0"
status: "草稿|已整理|最终稿"
referencedBy: ["[[页面A]]", "[[页面B]]"]
attachments: ["screenshot.png"]
---
```

## 完整示例

```yaml
---
title: "自媒体赛道选择的暴力破解法"
type: personal
category: opinion
private: false
tags: ["自媒体", "方法", "观点", "原创"]
datetime: "2026-05-18 14:30:00"
sources:
  - raw/personal/daily/零散记录-2026-05-18-143000.md
stale: false
keywords: ["自媒体", "赛道", "暴力破解"]
confidence: 0.95
version: "v1.0"
status: "已整理"
---
```
