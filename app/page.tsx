import Link from "next/link";
import { about, formatDate, getPublishedNotes, getPublishedWorks } from "@/lib/content";

export default function HomePage() {
  const works = getPublishedWorks().slice(0, 3);
  const notes = getPublishedNotes().slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <section className="grid gap-14 md:grid-cols-[1fr_17rem] md:items-start">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm uppercase text-muted">Personal archive</p>
          <h1 className="text-5xl font-normal leading-tight text-ink md:text-7xl">{about.name}</h1>
          <p className="mt-7 max-w-xl text-xl leading-9 text-muted">{about.description}</p>
        </div>

        <div className="space-y-6 md:pt-2">
          <figure className="w-44 sm:w-56 md:w-full">
            <img
              src="/images/spish-dog-portrait.jpg"
              alt="Dog persona portrait"
              className="aspect-[4/5] w-full object-cover object-[48%_42%]"
            />
          </figure>
          <Link href="/about" className="block border-y border-line py-6 hover:text-muted">
            <p className="text-sm uppercase text-ink">About</p>
            <p className="mt-4 text-sm leading-7 text-muted">
              A fixed note on who I am, what I am paying attention to, and where this archive begins.
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-24 border-t border-line pt-10">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm uppercase text-muted">Works</p>
            <h2 className="text-3xl font-normal text-ink">Projects and experiments</h2>
          </div>
          <Link href="/works" className="shrink-0 border-b border-line pb-1 text-sm hover:border-ink">
            All works
          </Link>
        </div>

        <div className="divide-y divide-line">
          {works.map((work) => (
            <Link key={work.slug} href={`/works/${work.slug}`} className="grid gap-3 py-6 hover:text-muted md:grid-cols-[8rem_1fr]">
              <span className="text-sm text-muted">{work.year}</span>
              <span>
                <span className="block text-xl text-ink">{work.title}</span>
                <span className="mt-2 block max-w-2xl text-sm leading-6 text-muted">
                  {work.type.join(" / ")} · {work.summary}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-line pt-10">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm uppercase text-muted">Notes</p>
            <h2 className="text-3xl font-normal text-ink">Recent writing</h2>
          </div>
          <Link href="/notes" className="shrink-0 border-b border-line pb-1 text-sm hover:border-ink">
            All notes
          </Link>
        </div>

        <div className="max-w-3xl divide-y divide-line">
          {notes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="grid gap-3 py-5 hover:text-muted md:grid-cols-[8rem_1fr]">
              <span className="text-sm text-muted">{formatDate(note.date)}</span>
              <span>
                <span className="block text-xl text-ink">{note.title}</span>
                <span className="mt-2 block text-sm leading-6 text-muted">{note.summary}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
