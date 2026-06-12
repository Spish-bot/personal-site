# Quiet Personal Site

一个极简、白色、克制的个人网站第一版，用于长期呈现个人介绍、非商业艺术作品和生活随想。

## 为什么第一版选择本地 JSON

这个项目优先考虑无代码基础、长期维护和 Vercel 部署稳定性。因此第一版没有数据库、登录系统或复杂 CMS，而是使用 `content/` 里的 JSON 文件管理内容。

这样做的好处：

- 部署到 Vercel 很直接。
- 内容和页面结构清楚，不依赖外部后台服务。
- 以后可以把同一套内容结构接到轻量后台或 CMS。
- 第一版不会因为“后台系统”变得臃肿。

## 修改内容的位置

- `content/about.json`：作者名、首页描述、个人介绍、图片、联系方式。
- `content/works.json`：作品列表和作品详情。
- `content/notes.json`：生活随想列表和详情。
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

## 部署到 Vercel

1. 把这个项目上传到 GitHub。
2. 在 Vercel 新建项目，选择这个 GitHub 仓库。
3. Framework Preset 选择 `Next.js`。
4. Build Command 使用默认的 `next build`。
5. 点击 Deploy。

部署后，每次修改 `content/` 里的内容并推送到 GitHub，Vercel 会自动更新网站。

## 页面

- `/`：首页
- `/about`：个人介绍
- `/works`：作品列表
- `/works/[slug]`：作品详情
- `/notes`：随想列表
- `/notes/[slug]`：随想详情
- `/admin`：第一版编辑说明页，未来可扩展为表单后台

## 后续可扩展方向

- 给 `/admin` 增加真正的表单编辑能力。
- 接入 Sanity、Contentful 或其他轻量 CMS。
- 支持本地图片上传和自动压缩。
- 增加中英文切换。
