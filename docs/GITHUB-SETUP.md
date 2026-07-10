# GitHub 同步与 Git 代理配置

> 仓库：`https://github.com/Archie-Liao/archie-personal-site`  
> 远程使用 **HTTPS** + Windows **Git Credential Manager** 登录。

---

## 本机已配（Archie · v2rayN · 2026-07-09）

| 项 | 值 |
|----|-----|
| 客户端 | **v2rayN 7.x** · 系统代理「自动配置」 |
| 本地端口 | 左下角 **`本地:[mixed:10808]`** → 地址固定 **`127.0.0.1`** · 端口 **`10808`** |
| Git 配置 | **一次性** `git config --global`（写入用户目录，**以后 push 不用重复执行**） |

已执行并验证：

```powershell
git config --global http.https://github.com.proxy http://127.0.0.1:10808
git config --global https.https://github.com.proxy http://127.0.0.1:10808
git config --global --get http.https://github.com.proxy
# → http://127.0.0.1:10808
```

**仍需每次**：打开 v2rayN 并选好节点再 `git push`。若日后改端口，只改一次 `git config` 里的数字即可。

---
## 日常同步

```powershell
Set-Location "d:\Archie-workfiles\personal-website\个人网站搭建指导"

git pull                    # 开始工作前
git add .
git commit -m "描述本次改动"
git push
```

对 Cursor 说：**收工更新 STATUS 并 push**。

---

## 为什么「浏览器能翻墙，git push 却失败」？

| 层 | 是否自动走你的 VPN/代理 |
|----|------------------------|
| 浏览器、部分 App | ✅ 常走系统代理或 TUN |
| **Git 命令行** | ❌ **默认不走**，除非单独配置 |
| Cursor Agent 终端 | ❌ 通常也**没有** `HTTP_PROXY` 环境变量 |

所以会出现：同一台电脑、同一个 Clash，**网页开 GitHub 正常，`git push` 超时**。

---

## 给 Git 配代理（推荐）

### 第一步：查代理端口

在代理客户端界面左下角找 **`本地:[mixed:端口]`** 或 **`本地:[http:端口]`**：

| 客户端 | 界面提示 | 常见端口 | Git 用的地址 |
|--------|----------|----------|----------------|
| **v2rayN**（本机） | `本地:[mixed:10808]` | **10808** | `http://127.0.0.1:10808` |
| Clash / Clash Verge | HTTP / Mixed Port | `7890` / `7897` | `http://127.0.0.1:7890` |
| Surge（本机） | HTTP Proxy | `6152` | `http://127.0.0.1:6152` |

- **地址永远是 `127.0.0.1`**（本机回环），客户端通常只显示端口。  
- **mixed** 端口同时支持 HTTP / SOCKS；Git 优先用 `http://127.0.0.1:端口`。  
- 确保 v2rayN **已启动** · 节点可连（日志里应能看到 `github.com` 走 `[socks >> proxy]`）。

### 第二步：只让 GitHub 走代理（推荐 · 配一次永久生效）

`--global` 写入用户级配置，**以后所有仓库的 GitHub HTTPS 操作都会走代理**，无需每次 push 前重复执行。

**v2rayN 本机（10808）**：

```powershell
git config --global http.https://github.com.proxy http://127.0.0.1:10808
git config --global https.https://github.com.proxy http://127.0.0.1:10808
```

其它客户端把 `10808` 换成你的 HTTP/mixed 端口即可，例如 Clash：

```powershell
git config --global http.https://github.com.proxy http://127.0.0.1:7890
git config --global https.https://github.com.proxy http://127.0.0.1:7890
```

**优点**：只影响 `github.com`，其它 git 操作仍直连。

### 第三步：验证

```powershell
git ls-remote https://github.com/Archie-Liao/archie-personal-site.git HEAD
```

几秒内返回一串 commit hash → 代理生效。

再试：

```powershell
git push
```

### 关闭 GitHub 代理

```powershell
git config --global --unset http.https://github.com.proxy
git config --global --unset https.https://github.com.proxy
```

### 查看当前配置

```powershell
git config --global --get http.https://github.com.proxy
git config --global --get https.https://github.com.proxy
```

---

## 其它方式

### 方式 A：当前终端临时生效（不改全局）

PowerShell（把端口换成你的）：

```powershell
$env:HTTP_PROXY  = "http://127.0.0.1:10808"
$env:HTTPS_PROXY = "http://127.0.0.1:10808"
git push
```

**缺点**：只对**当前终端窗口**有效；Cursor 新开终端或 Agent 终端往往没有这些变量。

### 方式 B：改用 SSH（不依赖 HTTP 代理）

1. [GitHub → Settings → SSH keys](https://github.com/settings/keys) 添加公钥  
2. 测试：`ssh -T git@github.com`  
3. 改远程：

```powershell
git remote set-url origin git@github.com:Archie-Liao/archie-personal-site.git
git push
```

SSH 走 22 端口，有时比 HTTPS 更稳；需先配好 key。

### 方式 C：SOCKS5 代理

若客户端只提供 SOCKS5（如 `127.0.0.1:7891`），Git 2.x 可试：

```powershell
git config --global http.https://github.com.proxy socks5://127.0.0.1:7891
```

部分环境对 SOCKS 支持不如 HTTP 稳，优先用 HTTP 端口。

### 三种代理方式（别混）

| 方式 | 作用范围 | Git 是否用 | 典型场景 |
|------|----------|------------|----------|
| `git config --global http.https://github.com.proxy …` | **持久**，仅 GitHub HTTPS | ✅ 是 | 本机日常 `git pull/push`（推荐） |
| 环境变量 `HTTP_PROXY` / `HTTPS_PROXY` | **当前终端进程** | 仅当 Git 未单独配且工具读 env | Cursor Agent 终端、部分 CLI |
| v2rayN「系统代理」 | 浏览器 / 部分 Win 应用 | ❌ Git 默认不读 | 上网浏览；**不能替代**上面 Git 配置 |

配好 `git config` 后 **不必**每次开终端再 `set HTTP_PROXY`；但 **v2rayN 本体仍要开着**，否则 10808 无流量。

---

## 报错对照

| 报错关键词 | 多半原因 | 处理 |
|------------|----------|------|
| `timed out` / `Failed to connect` | 网络 / **未配代理** | 按上文配 `http.https://github.com.proxy` |
| `Could not resolve host` | DNS / 代理未开 | 开代理 · 或换 DNS |
| `Authentication failed` / `403` | Token / 登录过期 | 重新登录 GitHub · 检查 PAT 权限 |
| `rejected` / `non-fast-forward` | 远程有新提交 | `git pull` 后再 push |
| `RPC failed; curl 56` | 大包 + 弱网 | 配代理 · 或 `git config --global http.postBuffer 524288000` |

---

## 首次克隆（换电脑）

```powershell
git clone https://github.com/Archie-Liao/archie-personal-site.git
cd archie-personal-site
npm i
npm run dev
```

国内 clone 慢时，同样先配 GitHub 代理再 `git clone`。

---

## 不会上传的内容

`.gitignore` 已排除：`node_modules/`、`dist/`、`.env`。

---

## v0 连接（可选）

[v0 项目](https://v0.app/liaozq9-6964s-projects) → **Sync with a repo** → 指向本仓库。
