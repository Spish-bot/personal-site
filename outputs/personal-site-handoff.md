# 个人网站第一版交付说明

项目已经搭建在当前工作区根目录。

## 内容管理方案

第一版选择本地 JSON 内容管理，而不是复杂后台或数据库。原因是它更适合个人长期维护、Vercel 部署简单、依赖少，也方便以后扩展到轻量后台或 CMS。

## 主要页面

- `/` 首页
- `/about` 个人介绍
- `/works` 作品列表
- `/works/[slug]` 作品详情
- `/notes` 生活随想列表
- `/notes/[slug]` 生活随想详情
- `/admin` 第一版编辑说明页，未来可扩展为后台

## 修改内容

- `content/about.json`：作者名、简介、个人介绍、图片、联系方式。
- `content/works.json`：作品内容。
- `content/notes.json`：生活随想。
- `content/README.md`：内容模块格式说明。

把条目的 `published` 改成 `false` 可以隐藏内容。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 部署到 Vercel

1. 上传到 GitHub。
2. 在 Vercel 新建项目并选择该仓库。
3. Framework Preset 选择 `Next.js`。
4. 使用默认构建命令。
5. Deploy。

当前 Codex 环境没有可用的 Node/npm，所以我没有在这里完成本地构建验证。项目文件已按 Next.js + TypeScript + Tailwind CSS 标准结构准备好。
