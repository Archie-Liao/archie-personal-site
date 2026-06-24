# GitHub 首次上传指南

本地已完成 `git init` 和首次 commit。还差：**在 GitHub 建空仓库 + push**。

## 第一步：Git 身份（只需做一次）

在终端执行（换成你的 GitHub 邮箱和名字）：

```powershell
git config --global user.name "Archie Liao"
git config --global user.email "你的邮箱@example.com"
```

> 若不想用 global，去掉 `--global` 只在当前项目生效。

## 第二步：在 GitHub 网页建仓库

1. 打开 <https://github.com/new>
2. Repository name：例如 `archie-personal-site`
3. **不要**勾选 "Add a README"（本地已有，避免冲突）
4. 点 Create repository

## 第三步：连接并推送

把下面命令里的 `你的仓库名` 换成实际名称：

```powershell
Set-Location "d:\Archie-workfiles\personal-website\个人网站搭建指导"
git remote add origin https://github.com/Archie-Liao/你的仓库名.git
git push -u origin main
```

浏览器会提示登录 GitHub（或输入 Personal Access Token）。

## 之后每天收工

```powershell
git add .
git commit -m "docs: 简短描述本次改动"
git push
```

对 Cursor 说：**收工更新 STATUS 并 push**，AI 会帮你写 commit 说明。

## 不会上传的内容

`.gitignore` 已排除：`node_modules/`、`dist/`、`.env`。  
换电脑：`git clone` → `npm i` → `npm run dev`。

## v0 连接（可选）

在 [v0 项目](https://v0.app/liaozq9-6964s-projects) 里选 **Sync with a repo**，指向同一 GitHub 仓库即可。
