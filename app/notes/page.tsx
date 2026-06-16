import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { formatDate, getPublishedNotes } from "@/lib/content";

export const metadata = {
  title: "Notes"
};

export default function NotesPage() {
  const notes = getPublishedNotes();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <PageIntro eyebrow="Notes" title="Fragments, observations, and daily writing">
        <p>Short texts, long texts, images, and records that do not need to become formal essays.</p>
      </PageIntro>

      <div className="reading-width divide-y divide-line border-y border-line">
        {notes.map((note) => (
          <Link key={note.slug} href={`/notes/${note.slug}`} className="block py-8 hover:text-muted">
            <article className="grid gap-3 md:grid-cols-[8rem_1fr]">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-soft md:block">
                <time dateTime={note.date}>{formatDate(note.date)}</time>
                {note.tags?.length ? <span className="md:mt-2 md:block">{note.tags.join(" / ")}</span> : null}
              </div>
              <div>
                <h2 className="text-2xl font-normal leading-snug text-ink">{note.title}</h2>
                <p className="mt-4 leading-7 text-muted">{note.summary}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
