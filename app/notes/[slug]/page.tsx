import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ContentModules } from "@/components/ContentModules";
import { ReadingFooter } from "@/components/ReadingFooter";
import { ReadingProgress } from "@/components/ReadingProgress";
import { getNote, getPublishedNotes } from "@/lib/content";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPublishedNotes().map((note) => ({ slug: note.slug }));
}

export function generateMetadata({ params }: Props) {
  const note = getNote(params.slug);
  return note ? { title: note.title, description: note.summary } : {};
}

export default function NoteDetailPage({ params }: Props) {
  const note = getNote(params.slug);
  if (!note) notFound();
  return (
    <main id="main-content" className="site-width detail-page">
      <ReadingProgress />
      <Link href="/notes" className="text-link back-link"><ArrowLeft size={14} aria-hidden="true" />Notes</Link>
      <article className="reading-article">
        <header className="article-heading">
          <div className="article-meta meta">
            <time dateTime={note.date}>{note.date.replaceAll("-", ".")}</time>
            {note.tags?.length ? <span>{note.tags.join(" / ")}</span> : null}
          </div>
          <h1>{note.title}</h1>
          {note.summary ? <p className="article-deck">{note.summary}</p> : null}
        </header>
        <ContentModules modules={note.modules} />
        <ReadingFooter entries={getPublishedNotes()} slug={note.slug} section="notes" />
      </article>
    </main>
  );
}
