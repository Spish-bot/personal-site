import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AdminEditor } from "@/components/AdminEditor";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminPage() {
  return (
    <main id="main-content" className="site-width archive-page">
      <header className="archive-heading">
        <div><p className="meta accent">Local editor</p><h1>内容编辑</h1></div>
        <Link href="/" target="_blank" rel="noopener noreferrer" className="text-link">预览首页<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </header>
      <AdminEditor />
    </main>
  );
}
