import Link from "next/link";

type Entry = { title: string; slug: string };

export function ReadingFooter({ entries, slug, section }: { entries: Entry[]; slug: string; section: "works" | "notes" }) {
  const index = entries.findIndex((entry) => entry.slug === slug);
  const previous = entries[index - 1];
  const next = entries[index + 1];
  return (
    <nav className="reading-footer" aria-label="继续阅读">
      {previous ? <Link href={"/" + section + "/" + previous.slug}><span className="meta">上一篇</span><span className="adjacent-title">{previous.title}</span></Link> : <span />}
      {next ? (
        <Link href={"/" + section + "/" + next.slug}><span className="meta">下一篇</span><span className="adjacent-title">{next.title}</span></Link>
      ) : (
        <Link href={"/" + section}><span className="meta">返回目录</span><span className="adjacent-title">{section === "works" ? "全部作品" : "全部笔记"}</span></Link>
      )}
    </nav>
  );
}
