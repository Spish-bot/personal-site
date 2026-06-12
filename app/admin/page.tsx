import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";

export const metadata = {
  title: "Admin"
};

const editableFiles = [
  {
    label: "About",
    path: "content/about.json",
    note: "修改作者名、首页描述、个人介绍、图片和联系方式。"
  },
  {
    label: "Works",
    path: "content/works.json",
    note: "新增、编辑、隐藏或删除作品。"
  },
  {
    label: "Notes",
    path: "content/notes.json",
    note: "新增、编辑、隐藏或删除生活随想。"
  }
];

export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <PageIntro eyebrow="Admin" title="A small editing map">
        <p>
          第一版使用本地 JSON 内容文件，保持部署简单、长期稳定。未来如果需要真正的表单后台，可以从这个页面继续扩展。
        </p>
      </PageIntro>

      <div className="max-w-3xl divide-y divide-line border-y border-line">
        {editableFiles.map((item) => (
          <section key={item.path} className="py-6">
            <p className="text-sm uppercase text-muted">{item.label}</p>
            <h2 className="mt-2 font-mono text-lg text-ink">{item.path}</h2>
            <p className="mt-3 leading-7 text-muted">{item.note}</p>
          </section>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">
        更详细的模块格式在 <span className="font-mono text-ink">content/README.md</span>。公开页面只显示{" "}
        <span className="font-mono text-ink">published: true</span> 的作品和随想。
      </p>

      <Link href="/" className="mt-10 inline-block border-b border-line pb-1 text-sm hover:border-ink">
        Back home
      </Link>
    </main>
  );
}
