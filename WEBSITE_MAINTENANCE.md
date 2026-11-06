# Spish 网站维护手册

这份手册用于以后在本机新增或修改内容、预览网站并发布到 `spish.me`。

项目目录：

```text
/Users/spish/Documents/Codex/2026-06-12/ai-1-2-ai-3-1
```

本项目的内容保存在本地 JSON 文件中，图片也保存在项目内。`/admin` 是本地编辑器，不是线上后台。只有把修改提交并推送到 GitHub 后，线上网站才会更新。

## 一、每次更新网站：照着这份清单做

### 1. 打开项目并启动预览

打开“终端”，输入：

```bash
cd /Users/spish/Documents/Codex/2026-06-12/ai-1-2-ai-3-1
npm run dev
```

看到类似下面的内容，说明预览已经启动：

```text
Local: http://localhost:3000
```

在浏览器打开：

- 网站首页：<http://localhost:3000>
- 本地编辑器：<http://localhost:3000/admin>
- 隐藏页面：<http://localhost:3000/secret>

运行预览的终端需要保持开启。不要把 Git 命令继续输入到正在运行 `npm run dev` 的同一个终端里；发布时请新开一个终端窗口或标签页。

### 2. 在 `/admin` 修改内容

编辑器顶部有五个栏目：

- `Home`：首页名称、介绍、头像、Works/Notes 标题和显示数量。
- `Notes`：新增、修改、隐藏或删除笔记。
- `Works`：新增、修改、隐藏或删除作品，以及设置年份和体裁。
- `Secret`：编辑 `/secret` 的介绍和条目。
- `About`：编辑个人介绍、图片和链接。

完成修改后，点击右上角的 `Save to local files`。出现保存成功提示后，再刷新公开页面检查效果。

注意：点击保存只会修改本机文件，不会自动更新线上网站。

### 3. 检查页面

发布前至少检查：

- 首页标题、随机 Works 和最新 Notes 是否正常。
- 新增条目能否点开，正文段落和换行是否正确。
- 图片是否完整显示，手机窄屏下是否溢出。
- 日期、年份、体裁和链接是否正确。
- 不准备公开的内容是否取消勾选 `Published`。

### 4. 检查网站能否构建

页面检查完毕后，回到运行预览的终端，按 `Control + C` 停止预览。不要让 `npm run dev` 和 `npm run build` 同时运行，它们会共同使用 `.next` 目录，可能造成缓存异常。

然后输入：

```bash
cd /Users/spish/Documents/Codex/2026-06-12/ai-1-2-ai-3-1
npm run build
```

如果构建失败，先不要发布。保留终端里的报错信息，再修复问题。

### 5. 发布到线上

构建成功后，在同一个新终端中依次输入：

```bash
git status
git add -A
git commit -m "Update website content"
git push origin main
```

提交说明可以换成更具体的英文，例如：

```bash
git commit -m "Add October notes and photos"
```

推送成功后，GitHub 会收到新版本，Netlify 会自动开始部署。通常等待几分钟后刷新 <https://spish.me> 即可看到更新。

## 二、新增作品或笔记

### 新增作品

1. 进入 `/admin`，选择 `Works`。
2. 点击 `New`。
3. 填写标题、Slug、年份和体裁。
4. 按顺序添加正文模块。
5. 需要公开时勾选 `Published`。
6. 点击 `Save to local files`，刷新作品页面检查。

### 新增笔记

1. 进入 `/admin`，选择 `Notes`。
2. 点击 `New`。
3. 填写标题、Slug、日期和标签。
4. 添加正文模块。
5. 需要公开时勾选 `Published`。
6. 保存并刷新笔记页面检查。

### Slug 是什么

Slug 是页面地址的最后一段。例如：

```text
标题：我的南京游记
Slug：nanjing-travel-notes
地址：https://spish.me/notes/nanjing-travel-notes
```

Slug 建议只使用英文小写字母、数字和连字符。内容发布后尽量不要修改 Slug，否则旧网址会失效。

## 三、正文模块怎么选

| 模块 | 用途 |
| --- | --- |
| `Paragraph` | 普通文章段落 |
| `Section heading` | 文章内的小节标题，如“一、二、三” |
| `Poem` | 诗歌，保留原始换行与空行 |
| `Note block` | 补充说明 |
| `Image` | 单张图片 |
| `Gallery` | 多张图片组成的图片组 |
| `Year gallery` | 按年份整理的摄影图片组 |
| `Video` | 嵌入视频，需要可嵌入的网址 |
| `Links` | 外部链接列表 |
| `Divider` | 正文分隔线 |

模块右上角的 `Up`、`Down` 和 `Delete` 可以调整顺序或删除模块。

不要为了突出一句话随意使用特殊模块；普通正文和诗歌应尽量忠实保留原文结构。

## 四、图片管理

在 Home、Works、About 或图片模块中点击上传控件选择图片。上传后会立即出现预览，但仍需点击 `Save to local files`。

上传的图片保存在：

```text
public/images/uploads/
```

发布时一定要使用 `git add -A`，这样新图片才会和文字一起上传到 GitHub。只修改图片路径、却没有把图片文件提交上去，会导致线上出现破图。

建议：

- 上传前删除明显重复或不需要的照片。
- 文件名不必手动处理，编辑器会生成适合网页使用的新文件名。
- 为图片填写简短准确的 Alt text，方便无障碍阅读和图片加载失败时识别内容。
- 原图过大时先适当压缩，避免页面加载过慢。
- 不要直接删除仍被作品引用的图片文件。

## 五、隐藏、删除与 Secret

### 暂时隐藏内容

取消勾选条目的 `Published`，再保存和发布。内容仍保存在项目中，但不会出现在公开列表或详情页。

如果只是暂时不想公开，优先使用这种方式，而不是删除条目。

### 删除内容

选择条目后点击 `Delete selected`。删除后仍需点击 `Save to local files` 才会写入文件。

删除前建议先确认它已被 Git 记录；这样即使误删，也可以从历史版本恢复。

### `/secret` 的实际安全性

`/secret` 只是没有出现在网站导航里，并设置为不让搜索引擎索引。它没有密码保护，任何知道网址的人仍然可以访问，所以不要在里面放真正敏感的信息。

## 六、备份和回撤

Git 的每次 commit 都是一个可以追溯的版本。发布前运行：

```bash
git status
```

查看最近版本：

```bash
git log --oneline -10
```

如果刚发布的最新版本有问题，最稳妥的线上回撤方式是新建一个反向提交：

```bash
git revert --no-edit HEAD
git push origin main
```

这会保留历史记录，同时生成一个撤销最新版本的新 commit。只在确认要撤销的确实是最新一次提交时使用；不确定时先把 `git log --oneline -10` 的结果交给 Codex 查看。

项目另有：

```bash
npm run ui:restore
```

这个命令只用于回到 2026 年 9 月这次整体 UI 改版之前的界面，不是日常内容回撤工具。运行它之前先停止本地预览。

不要使用 `git reset --hard`，它可能直接丢失尚未保存的修改。

## 七、常见问题

### 输入命令后“什么都没有”

如果终端正在显示 `npm run dev` 的运行日志，它正被预览服务器占用。按 `Control + C` 可以停止预览，或者新开一个终端窗口执行 Git 命令。

### `zsh: no matches found: app/notes/[slug]/page.tsx`

方括号被终端当成了特殊字符。发布时不用逐个填写文件名，直接使用：

```bash
git add -A
```

### `Failed to connect to github.com port 443`

这是当前网络无法连接 GitHub，不代表本地 commit 丢失。更换网络或调整 VPN 后，只需重试：

```bash
git push origin main
```

### `nothing to commit`

先运行：

```bash
git status
```

如果显示工作区干净，说明当前修改已经提交，下一步只需 `git push origin main`。如果 `/admin` 的修改没有出现，检查是否点击了 `Save to local files`。

### 本地出现 `Cannot find module ./.next/...`

这是本地构建缓存损坏。先停止预览，确认终端位于项目目录，再运行：

```bash
rm -rf .next
npm run dev
```

`.next` 只是自动生成的缓存，不包含文章和图片。

### 线上没有变化

依次检查：

1. `git push origin main` 是否成功完成。
2. GitHub 仓库的最新 commit 是否与本机一致。
3. Netlify 的最新部署是否成功。
4. 部署完成后强制刷新浏览器页面。

### `/admin` 在线上不能保存

这是正常设计。编辑 API 只在本地开发环境开放，以免任何访问者修改网站。必须在本机运行 `npm run dev` 后使用 `/admin`。

## 八、项目里的重要位置

| 路径 | 内容 |
| --- | --- |
| `content/home.json` | 首页栏目文字和显示数量 |
| `content/about.json` | 名称、首页说明、About 内容和联系方式 |
| `content/works.json` | 所有作品 |
| `content/notes.json` | 所有笔记 |
| `content/secret.json` | `/secret` 的说明和条目 |
| `public/images/uploads/` | 编辑器上传的图片 |
| `app/` | 页面结构和路由 |
| `components/` | 页面组件和编辑器 |
| `app/globals.css` | 全站主要排版和样式 |

日常新增内容优先使用 `/admin`，不要直接修改程序文件。涉及排版、组件、导航或新功能时，再交给 Codex 修改代码。

## 九、第一次换电脑时

新电脑需要先安装 Git 和 Node.js，然后从 GitHub 获取项目并安装依赖：

```bash
git clone https://github.com/Spish-bot/personal-site.git
cd personal-site
npm install
npm run dev
```

确认网站能打开后，再使用 `/admin` 维护内容。

## 十、最短版备忘

```bash
# 1. 启动本地预览
cd /Users/spish/Documents/Codex/2026-06-12/ai-1-2-ai-3-1
npm run dev

# 2. 浏览器打开 http://localhost:3000/admin，编辑并保存

# 3. 检查页面后按 Control + C 停止预览，再检查并发布
cd /Users/spish/Documents/Codex/2026-06-12/ai-1-2-ai-3-1
npm run build
git add -A
git commit -m "Update website content"
git push origin main
```


## 十一、Kimi 维护与线上更新约定

- 当 Spish 说“更新到网上”或表达相同意思时，即授权执行发布：停止本地预览，运行 `npm run build`，检查 `git status`，提交当前修改并推送到 `origin main`，随后检查 `https://spish.me` 的实际更新结果。
- 推送遇到网络连接问题时，可以先打开 Spish 本机名为 `spv` 的代理工具，再重试。只有现有 Git 凭据无法完成推送时，才向 Spish 询问账号或登录方式。
- 不替 Spish 撰写公开页面中的标题、解释、注释、副标题、宣传语或其他文案。只使用 Spish 已有的内容；需要新增文案时留空或等待 Spish 提供。
- 发布完成后如实说明构建、推送和线上检查结果；未确认线上变化时，不声称已经上线。
