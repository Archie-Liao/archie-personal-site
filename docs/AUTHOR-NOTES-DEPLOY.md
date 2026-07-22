---
doc_type: topic_spec
title: 亲笔旁注 · 腾讯云部署手把手（Archie 第一次）
status: active
canonical: docs/AUTHOR-NOTES-DEPLOY.md
authority: CloudBase 旁注云函数部署步骤
depends_on: docs/P3-AUTHOR-NOTE-SPIKE.md · cloudbase/functions/authorNotes/
revised_at: "2026-07-22 15:35:00"
timezone: Asia/Shanghai
---

## 修订记录（最新在上）

| 北京时间 | 变更 |
|----------|------|
| 2026-07-22 15:35:00 | 初版：对照已跑通的 `assistantChat` 写零基础步骤 |

# 亲笔旁注 · 腾讯云部署手把手

> 你已经部署过 **助手** `assistantChat`，旁注是**同一环境里再加一个函数**。  
> 仓库代码在：`cloudbase/functions/authorNotes/`（`index.js` + `package.json`）。  
> 前端已预填：`site.config.ts` → `authorNotes.endpoint`（主机与助手相同，路径换成 `/authorNotes`）。

**目标地址长这样（部署成功后）：**

`https://archie-d4giq03kg9e46530b-1453642667.ap-shanghai.app.tcloudbase.com/authorNotes`

---

## 开始前准备（5 分钟）

1. 电脑上打开文件夹：  
   `个人网站搭建指导\cloudbase\functions\authorNotes`  
   （正确目录名是 **`authorNotes`**，和 `assistantChat` 并列。若资源管理器显示怪名字，进 `cloudbase\functions\` 找带 `index.js` + `package.json` 的那个旁注目录。）
2. 打成 zip，**根目录**必须直接是 `index.js` + `package.json`（不要套一层 `authorNotes/`）。  
   - **推荐**：仓库里已有现成包 `cloudbase/authorNotes-upload.zip`（用命令打的，结构正确）  
   - 若自己打：360 右键常会多套一层文件夹 → **不要用**；可用 PowerShell：  
     `Compress-Archive -Path index.js,package.json -DestinationPath authorNotes-upload.zip`  
   - 用压缩软件打开 zip：第一层就应看到两个文件，没有中间文件夹
3. 想好一个**只有你知道的口令**（旁注登录用），例如一串自己记得住的密码。  
   **不要**发到聊天、不要写进 Git。

---

## 第 1 步：打开云开发控制台

1. 浏览器打开：[云开发 CloudBase 控制台](https://console.cloud.tencent.com/tcb)  
   （或你平时打开助手函数用的那个入口）
2. 选中环境：**archie-d4giq03kg9e46530b**（和静态站、助手同一个）
3. 左侧进 **云函数**（有的界面叫「云函数」/「函数」）

你会看到列表里已有 **`assistantChat`**——旁边我们要新建 **`authorNotes`**。

---

## 第 2 步：新建云函数 `authorNotes`

1. 点 **新建** / **创建云函数**
2. 建议选 **普通云函数**（与 `assistantChat` 同类；代码是 `exports.main`，不是 Express 监听 9000 那种）
3. 填写：
   - **函数名称**：`authorNotes`（建议完全一致，方便和 HTTP 路径对齐）
   - **运行环境**：Node.js 16 / 18 均可（有 18 优先）
4. **提交方式**：本地上传 zip / 上传文件夹  
   - 选你打好的 `authorNotes.zip`
5. **自动安装依赖**：打开（需要装 `@cloudbase/node-sdk`）
6. 创建并等待部署完成（一两分钟）

若创建失败：检查 zip 里是否直接有 `index.js`、`package.json`。

---

## 第 3 步：配置环境变量（口令）

1. 点开函数 **`authorNotes`**
2. 找到 **函数配置** / **环境变量**
3. 新增：
   - 名称：`AUTHOR_NOTE_GATE`
   - 值：你刚才想好的口令
4. **保存**，必要时再点一次 **部署**（有的控制台改环境变量要重新部署才生效）

---

## 第 4 步：开通 HTTP 访问（和助手一样）

助手现在是：`…app.tcloudbase.com/assistantChat`  
旁注要做成：`…app.tcloudbase.com/authorNotes`

1. 进 **环境配置** → **HTTP 访问服务**（或「HTTP 访问」）
2. **新建**一条关联：
   - 关联资源：云函数 → 选 **`authorNotes`**
   - 触发路径：`/authorNotes`
   - 域名：用现有的默认域名（和助手同一条即可）
3. 确定，等几分钟生效

测一下（浏览器地址栏直接打开）：

```text
https://archie-d4giq03kg9e46530b-1453642667.ap-shanghai.app.tcloudbase.com/authorNotes?postId=ep099
```

**成功**：页面出现 JSON，类似：

```json
{"ok":true,"postId":"ep099","blocks":[],"updatedAt":null}
```

**失败**：把状态码/整页文字截图发给我（常见：路径还没生效、函数名不一致、还在部署中）。

> 若你控制台里助手的 HTTP 路径不是 `/assistantChat` 而是别的，旁注按**同一套规则**建一条指向 `authorNotes` 的路径，然后把最终完整 URL 告诉我，我帮你改 `site.config.ts`。

---

## 第 5 步：新建数据库集合

1. 左侧进 **文档型数据库** / **数据库**
2. **添加集合**，名称务必：`author_notes`（下划线，复数 notes）
3. 权限建议（尖兵够用）：
   - 可读：所有用户（或仅登录用户——前端是公开读旁注，**建议所有用户可读**）
   - 可写：**仅管理端 / 仅云函数**（不要「所有用户可写」）  
   云函数用 Node SDK 在服务端写，一般不受客户端安全规则卡住；若保存时报权限错，把报错发我再调。

---

## 第 6 步：在网站上试

1. 打开本地或线上站 → 任意一篇详情（如 ep099）
2. 「亲笔旁注」区应能加载（不再报「未配置」类错误）
3. 点 **作者登录** → 输入你设的 `AUTHOR_NOTE_GATE` 口令
4. **编辑** → 加一段文字或导图 → **保存**
5. 刷新页面，字还在
6. （可选）再 `git push` 一次静态站，再打开线上详情，旁注仍在 = 防覆盖验收通过

---

## 你卡在哪一步时怎么说

发我这三样之一即可：

- 第几步 + 截图  
- 浏览器打开 `…/authorNotes?postId=ep099` 的完整返回  
- 云函数日志里红色报错（函数详情 → 日志）

---

## 和「静态网站自动部署」的关系

| | |
|--|--|
| **GitHub → 静态托管** | 只更新网页外壳（React），**不管**旁注内容 |
| **本指南的云函数 + 数据库** | 旁注真源；你站内保存写到这里 |

两套是分开的，所以 push 网页**不会**盖掉云里的旁注。
