import { notFound } from "next/navigation";
import { ContentModules } from "@/components/ContentModules";
import { formatDate, getNote, getPublishedNotes } from "@/lib/content";

type NoteDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getPublishedNotes().map((note) => ({
    slug: note.slug
  }));
}

export function generateMetadata({ params }: NoteDetailPageProps) {
  const note = getNote(params.slug);

  if (!note) {
    return {};
  }

  return {
    title: note.title,
    description: note.summary
  };
}

export default function NoteDetailPage({ params }: NoteDetailPageProps) {
  const note = getNote(params.slug);

  if (!note) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <article className="reading-width mx-auto">
        <header className="mb-14">
          <p className="mb-5 text-xs uppercase tracking-wide text-soft">
            <time dateTime={note.date}>{formatDate(note.date)}</time>
            {note.tags?.length ? ` / ${note.tags.join(" / ")}` : ""}
          </p>
          <h1 className="text-4xl font-normal leading-tight text-ink md:text-5xl">{note.title}</h1>
        </header>
        <ContentModules modules={note.modules} />
      </article>
    </main>
  );
}
