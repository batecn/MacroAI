# MacroAI

一款 Windows 桌面宏自动化工具，支持图像识别、OCR 文字识别、界面变化检测、Lua 脚本编程和可视化节点编排。

[→ 访问官网](https://sowe.com) | [→ 使用说明](https://sowe.com/macroai/docs/zh/user-guide.html) | [→ API 参考](https://sowe.com/macroai/docs/zh/api-reference.html)

## 下载

通过 [GitHub Releases](https://github.com/user/MacroAI/releases) 获取最新版本安装包。

## 功能

- **可视化节点编辑器** — 拖拽式工作流编排，19 种节点类型
- **图像识别** — OpenCV 模板匹配，支持自定义区域和阈值
- **OCR 文字识别** — Windows OCR 引擎，屏幕文字识别与比对
- **界面变化检测** — 网格比对与条形图颜色追踪
- **Lua 脚本引擎** — 完整的 Lua API
- **后台模式** — Win32 PostMessage 后台输入，不抢占焦点
- **多语言支持** — 中文 / English

---

## 开始前的准备工作

### 前置条件

- 在 [GitHub](https://github.com) 上新建一个仓库（如 `MacroAI`）
- 一个 [Cloudflare](https://www.cloudflare.com) 账号，域名已托管在 Cloudflare

---

## Cloudflare Pages 部署步骤

### 1. 连接到 GitHub

| 步骤 | 操作 |
|------|------|
| ① | 登录 Cloudflare Dashboard → **Workers & Pages** → **Pages** |
| ② | 点击 **Create** → **Connect to Git** |
| ③ | 授权 Cloudflare 访问你的 GitHub 账号，选择刚刚创建的 `MacroAI` 仓库 |
| ④ | 点击 **Begin setup** |

### 2. 构建配置

| 配置项 | 值 |
|--------|-----|
| Project name | `macroai`（自动生成，可改） |
| Production branch | `main`（或 `master`） |
| Build command | **留空**（纯静态站点） |
| Build output directory | `website` |

点击 **Save and Deploy**，等待首次部署完成。

### 3. 绑定域名

| 步骤 | 操作 |
|------|------|
| ① | 在 Pages 项目页面 → **Custom domains** → **Set up a custom domain** |
| ② | 输入 `sowe.com` → 点击 **Continue** |
| ③ | Cloudflare 会自动添加 DNS 记录，确认后等待生效（约 1-5 分钟） |

### 4. 配置域名重定向（在 Cloudflare Dashboard 中）

`www.sowe.com` → `sowe.com` 的 301 跳转，有两种方式：

**方式 A：Page Rules（推荐）**

| 规则 | 值 |
|------|-----|
| URL | `www.sowe.com/*` |
| Setting | **Forwarding URL** (301) |
| Destination URL | `https://sowe.com/$1` |

**方式 B：在同一 Pages 项目中添加 `www.sowe.com` 域名**

| 步骤 | 操作 |
|------|------|
| ① | Pages 项目 → **Custom domains** → **Set up a custom domain** |
| ② | 输入 `www.sowe.com` |
| ③ | 完成后添加一个 Page Rule：`www.sowe.com/*` → Forward 301 → `https://sowe.com/$1` |

### 5. 验证

访问以下 URL 确认正常：
- `https://sowe.com` — MacroAI 官网首页
- `https://sowe.com/macroai/docs/zh/user-guide.html` — 使用说明
- `https://sowe.com/macroai/docs/en/user-guide.html` — User Guide（English）

---

## 首次推送本仓库到 GitHub

首次部署前，需要将本仓库推送到 GitHub：

```bash
# 在 website/ 目录下执行
git init
git add .
git commit -m "初始提交：MacroAI 官网 + 文档"

# 关联远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/MacroAI.git

# 推送到 GitHub
git push -u origin main
```

推送完成后，Cloudflare Pages 会自动检测到变更并部署（约 1-2 分钟）。

---

## 更新说明

### 文档更新

文档源文件位于主项目 `locale/{lang}/help/*.md`，修改后执行构建：

```bash
# 在主项目目录下执行
cd website
python build_docs.py
# 输出: macroai/docs/{lang}/{page}.html
```

提交并推送：

```bash
git add .
git commit -m "更新文档：xxx"
git push
```

Cloudflare Pages 自动部署，约 1 分钟后生效。

### 网站内容更新

修改 `index.html`、CSS、JS 等文件后：

```bash
git add .
git commit -m "更新首页内容"
git push
```

### 发布新版本

1. 在主项目运行打包脚本，生成安装包到 `dist/`
2. 在 GitHub Releases 页面创建新 Release，上传以下文件：

   | 文件 | 说明 |
   |------|------|
   | `MacroAI_v{VERSION}_setup.exe` | 安装包 |
   | `MacroAI_v{VERSION}_portable.zip` | 绿色便携版 |
   | `MacroAI_Update_v{VERSION}.exe` | 增量更新包 |

3. 修改本站 `index.html` 中的版本号和下载链接：

   | 位置 | 修改项 |
   |------|--------|
   | #download 区域 | 版本号、更新日期、更新日志内容 |
   | 下载按钮链接 | 指向 GitHub Releases 对应文件 |

4. 提交推送：

```bash
git add .
git commit -m "发布 v{VERSION}"
git push
```
