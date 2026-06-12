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
      <article className="mx-auto max-w-3xl">
        <header className="mb-12">
          <p className="mb-4 text-sm uppercase text-muted">
            <time dateTime={note.date}>{formatDate(note.date)}</time>
            {note.tags?.length ? ` / ${note.tags.join(" / ")}` : ""}
          </p>
          <h1 className="text-4xl font-normal leading-tight text-ink md:text-6xl">{note.title}</h1>
          <p className="mt-7 text-xl leading-9 text-muted">{note.summary}</p>
        </header>
        <ContentModules modules={note.modules} />
      </article>
    </main>
  );
}
