# 廖智强 Archie · 个人网站

视频日记与 AI 内容归档。Vite + React 改版中，视觉方向：**benchmark**（暖色出版物流）。

> AI 协作请先读 [AGENTS.md](AGENTS.md) 与 [docs/STATUS.md](docs/STATUS.md)

## 本地运行

```powershell
npm i          # 首次克隆或换电脑后（会生成 node_modules，勿上传 Git）
npm run dev    # 开发预览 → 终端里显示的本地地址
npm run build  # 打包到 dist/（亦勿上传 Git）
```

**注意：** 不要双击根目录 `index.html`（会空白）。设计稿在 [design-demos/](design-demos/)，推荐打开 `benchmark.html`。

## node_modules 是什么？

第三方依赖的安装目录（React、Vite 等）。体积大，**不要上传 GitHub**。  
仓库里只需 `package.json` + `package-lock.json`；换电脑 `git clone` 后执行 `npm i` 即可重建。

## GitHub 同步（简要）

```powershell
git pull                              # 开始工作前
git add .
git commit -m "描述本次改动"
git push
```

首次 push 前需在 [GitHub 新建空仓库](https://github.com/new)，再：

```powershell
git remote add origin https://github.com/Archie-Liao/你的仓库名.git
git push -u origin main
```

## 文档

| 路径 | 说明 |
|------|------|
| [docs/STATUS.md](docs/STATUS.md) | 当前进度与下一步 |
| [guidelines/](guidelines/) | 需求与改版方案 |
| [design-demos/](design-demos/) | HTML 设计稿三版对比 |

## 外链

- B站：<https://space.bilibili.com/24473971>
- GitHub：<https://github.com/Archie-Liao>
- v0 项目：<https://v0.app/liaozq9-6964s-projects>

## 收工

对 Cursor 说：**收工更新 STATUS 并 push**。
