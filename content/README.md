# 内容修改说明

第一版内容都放在这个 `content` 文件夹里：

- `about.json`：修改个人介绍、首页描述、联系方式。
- `works.json`：修改作品列表和作品详情内容。
- `notes.json`：修改生活随想列表和详情内容。

常用字段：

- `slug`：页面地址，只用英文小写、数字和连字符，例如 `my-first-film`。
- `published`：设为 `true` 会公开显示，设为 `false` 会隐藏。
- `modules`：详情页正文模块，可以自由组合段落、图片、图片组、视频、引用、分隔线、链接和创作说明。

支持的正文模块示例：

```json
{ "kind": "paragraph", "text": "一段正文。" }
{ "kind": "poem", "text": "第一行\n第二行\n\n第二段第一行" }
{ "kind": "image", "src": "https://...", "alt": "图片描述", "caption": "可选说明" }
{ "kind": "gallery", "images": [{ "src": "https://...", "alt": "图片描述" }] }
{ "kind": "video", "url": "https://www.youtube.com/embed/...", "caption": "可选说明" }
{ "kind": "quote", "text": "一段引用。" }
{ "kind": "divider" }
{ "kind": "note", "title": "创作说明", "text": "说明文字。" }
{ "kind": "links", "items": [{ "label": "链接名称", "href": "https://..." }] }
```
