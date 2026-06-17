import Link from "next/link";
import { RandomWorksList } from "@/components/RandomWorksList";
import { about, formatDate, getPublishedNotes, getPublishedWorks, home } from "@/lib/content";

export default function HomePage() {
  const works = getPublishedWorks();
  const notes = getPublishedNotes().slice(0, home.notesCount);

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-8 md:px-8 md:py-10">
      <section className="grid gap-8 md:grid-cols-[minmax(0,1fr)_12rem] md:items-start">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-wide text-soft">{home.eyebrow}</p>
          <h1 className="text-5xl font-normal leading-tight text-ink md:text-[3.5rem]">{about.name}</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted md:text-lg">{about.description}</p>
        </div>

        <div className="space-y-4">
          <figure className="w-28 sm:w-36 md:ml-auto md:w-40">
            <img
              src={home.portrait.src}
              alt={home.portrait.alt}
              className="aspect-[4/5] w-full object-cover object-[48%_39%]"
            />
          </figure>
          <Link href="/about" className="block border-y border-line py-3 hover:text-muted">
            <p className="text-xs uppercase tracking-wide text-ink">{home.aboutLabel}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{home.aboutText}</p>
          </Link>
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-8">
        <div className="mb-5 flex items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl font-normal text-ink md:text-3xl">{home.worksEyebrow}</h2>
            <p className="mt-2 text-sm text-soft">{home.worksTitle}</p>
          </div>
          <Link href="/works" className="quiet-link shrink-0 pb-1 text-sm">
            {home.worksLinkLabel}
          </Link>
        </div>

        <RandomWorksList works={works} count={home.worksCount} />
      </section>

      <section className="mt-14 border-t border-line pt-8">
        <div className="mb-5 flex items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl font-normal text-ink md:text-3xl">{home.notesEyebrow}</h2>
            <p className="mt-2 text-sm text-soft">{home.notesTitle}</p>
          </div>
          <Link href="/notes" className="quiet-link shrink-0 pb-1 text-sm">
            {home.notesLinkLabel}
          </Link>
        </div>

        <div className="reading-width divide-y divide-line">
          {notes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="block py-4 hover:text-muted">
              <article className="grid gap-2 md:grid-cols-[6.5rem_1fr] md:gap-4">
                <span className="text-sm text-soft">{formatDate(note.date)}</span>
                <span>
                  <span className="block text-lg text-ink">{note.title}</span>
                  {note.tags?.length ? (
                    <span className="mt-1.5 block text-xs uppercase tracking-wide text-soft">{note.tags.join(" / ")}</span>
                  ) : null}
                </span>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
