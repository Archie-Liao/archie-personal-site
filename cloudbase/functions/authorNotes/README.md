# authorNotes 云函数

与 assistantChat 同一 CloudBase 环境。

## 部署（Archie）

> **零基础逐步说明（含截图式步骤）→** [`docs/AUTHOR-NOTES-DEPLOY.md`](../../../docs/AUTHOR-NOTES-DEPLOY.md)

摘要：

1. 本目录打 zip → 控制台新建普通云函数 `authorNotes`（自动装依赖）
2. 环境变量 `AUTHOR_NOTE_GATE` = 你的口令（勿进 Git）
3. HTTP 访问服务加路径 `/authorNotes`
4. 数据库新建集合 `author_notes`
5. `site.config.ts` 已预填 endpoint（与助手同主机）

## 验收

- GET `?postId=ep099` → `{ ok:true, blocks:[] }`
- 站内登录保存后刷新仍在
- git push 静态站后旁注仍在
