import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedNotes } from "@/lib/content";
import type { Note } from "@/lib/types";

export const metadata = { title: "Notes" };

export default function NotesPage() {
  const notes = getPublishedNotes();
  const years = new Map<string, Note[]>();
  notes.forEach((note) => {
    const year = note.date.slice(0, 4);
    years.set(year, [...(years.get(year) ?? []), note]);
  });

  return (
    <main id="main-content" className="site-width archive-page notes-page">
      <header className="archive-heading">
        <div><p className="section-label">随想</p><h1>Notes<span className="wordmark-period" aria-hidden="true">*</span></h1></div>
        <div className="archive-aside"><span className="meta">{String(notes.length).padStart(2, "0")} 篇记录</span></div>
      </header>
      <div className="notes-archive">
        {Array.from(years, ([year, entries]) => (
          <section key={year} className="archive-group">
            <h2 className="archive-year">{year}</h2>
            <div className="year-entries">
              {entries.map((note) => (
                <Link key={note.slug} href={"/notes/" + note.slug} className="note-index-entry">
                  <time className="meta" dateTime={note.date}>{note.date.slice(5).replace("-", ".")}</time>
                  <div>
                    <h3>{note.title}</h3>
                    {note.summary ? <p className="entry-summary">{note.summary}</p> : null}
                    {note.tags?.length ? <p className="meta">{note.tags.join(" / ")}</p> : null}
                  </div>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        ))}
        {!notes.length ? <p className="empty-state">暂无笔记。</p> : null}
      </div>
    </main>
  );
}
