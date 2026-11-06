# Quiet Personal Site

一个极简、白色、克制的个人网站第一版，用于长期呈现个人介绍、非商业艺术作品和生活随想。

日常维护、内容编辑和发布步骤请查看：[Spish 网站维护手册](./WEBSITE_MAINTENANCE.md)。

## 为什么第一版选择本地 JSON

这个项目优先考虑无代码基础、长期维护和静态部署稳定性。因此没有数据库、登录系统或复杂 CMS，而是使用 `content/` 里的 JSON 文件管理内容，并提供只在本地开发环境可用的 `/admin` 编辑器。

这样做的好处：

- 部署到 Netlify 很直接。
- 内容和页面结构清楚，不依赖外部后台服务。
- 以后可以把同一套内容结构接到轻量后台或 CMS。
- 第一版不会因为“后台系统”变得臃肿。

## 修改内容的位置

- `content/about.json`：作者名、首页描述、个人介绍、图片、联系方式。
- `content/home.json`：首页栏目文字、头像和显示数量。
- `content/works.json`：作品列表和作品详情。
- `content/notes.json`：生活随想列表和详情。
- `content/secret.json`：隐藏页面的介绍和条目。
- `content/README.md`：正文模块格式说明。

如果想隐藏某个作品或随想，把对应条目的 `published` 改成 `false`。

## 本地运行

先安装依赖：

```bash
npm install
```

启动本地预览：

```bash
npm run dev
```

然后打开：

```text
http://localhost:3000
```

## 部署到 Netlify

当前线上站点已经连接 GitHub 仓库。完成本地修改后，把 `main` 分支推送到 GitHub，Netlify 会自动构建并部署。

完整命令和故障处理见 [Spish 网站维护手册](./WEBSITE_MAINTENANCE.md)。

## 页面

- `/`：首页
- `/about`：个人介绍
- `/works`：作品列表
- `/works/[slug]`：作品详情
- `/notes`：随想列表
- `/notes/[slug]`：随想详情
- `/admin`：仅限本地开发环境使用的内容编辑器
- `/secret`：不显示在公开导航中的隐藏页面

`/admin` 可以编辑首页、作品、笔记、Secret 和 About，并把上传图片保存到 `public/images/uploads/`。线上环境会禁用编辑接口。
