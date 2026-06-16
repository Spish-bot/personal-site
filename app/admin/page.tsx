import Link from "next/link";
import { AdminEditor } from "@/components/AdminEditor";
import { PageIntro } from "@/components/PageIntro";

export const metadata = {
  title: "Admin"
};

export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <PageIntro eyebrow="Admin" title="Local content editor">
        <p>这个页面用于本地维护内容：新增、删除、编辑作品和随想，也可以修改 About。保存后刷新公开页面即可预览。</p>
      </PageIntro>

      <AdminEditor />

      <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">
        保存只会更新本地 <span className="font-mono text-ink">content</span> 文件。确认满意后，再用 Git 上传到 GitHub / Netlify。
        公开页面只显示 <span className="font-mono text-ink">published</span> 的作品和随想。
      </p>

      <Link href="/" className="mt-10 inline-block border-b border-line pb-1 text-sm hover:border-ink">
        Back home
      </Link>
    </main>
  );
}
