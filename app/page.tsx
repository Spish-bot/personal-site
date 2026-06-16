import Link from "next/link";
import { about, formatDate, getPublishedNotes, getPublishedWorks } from "@/lib/content";

export default function HomePage() {
  const works = getPublishedWorks().slice(0, 2);
  const notes = getPublishedNotes().slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-24">
      <section className="grid gap-16 md:grid-cols-[1fr_15rem] md:items-start">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-wide text-soft">Personal archive</p>
          <h1 className="text-5xl font-normal leading-tight text-ink md:text-7xl">{about.name}</h1>
          <p className="mt-8 max-w-xl text-lg leading-9 text-muted md:text-xl">{about.description}</p>
        </div>

        <div className="space-y-7 md:pt-1">
          <figure className="w-36 sm:w-44 md:ml-auto md:w-48">
            <img
              src="/images/spish-dog-portrait.jpg"
              alt="Dog persona portrait"
              className="aspect-[4/5] w-full object-cover object-[48%_39%]"
            />
          </figure>
          <Link href="/about" className="block border-y border-line py-5 hover:text-muted">
            <p className="text-xs uppercase tracking-wide text-ink">About</p>
            <p className="mt-4 text-sm leading-7 text-muted">
              A fixed note on who I am, what I am paying attention to, and where this archive begins.
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-28 border-t border-line pt-12">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-wide text-soft">Works</p>
            <h2 className="text-2xl font-normal text-ink md:text-3xl">Project archive</h2>
          </div>
          <Link href="/works" className="quiet-link shrink-0 pb-1 text-sm">
            All works
          </Link>
        </div>

        <div className="divide-y divide-line">
          {works.map((work) => (
            <Link key={work.slug} href={`/works/${work.slug}`} className="grid gap-4 py-7 hover:text-muted md:grid-cols-[7rem_1fr]">
              <span className="text-sm text-soft">{work.year}</span>
              <span>
                <span className="block text-xl text-ink">{work.title}</span>
                {work.subtitle ? <span className="mt-2 block text-sm text-soft">{work.subtitle}</span> : null}
                <span className="mt-2 block text-xs uppercase tracking-wide text-soft">{work.type.join(" / ")}</span>
                <span className="mt-3 block max-w-2xl text-sm leading-7 text-muted">{work.summary}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-10 border-t border-line pt-12 md:grid-cols-[12rem_1fr]">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-wide text-soft">Notes</p>
            <h2 className="text-2xl font-normal text-ink md:text-3xl">Recent writing</h2>
          </div>
          <Link href="/notes" className="quiet-link shrink-0 pb-1 text-sm md:hidden">
            All notes
          </Link>
        </div>

        <div className="max-w-3xl divide-y divide-line">
          {notes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="grid gap-3 py-5 hover:text-muted md:grid-cols-[8rem_1fr]">
              <span className="text-sm text-soft">{formatDate(note.date)}</span>
              <span>
                <span className="block text-lg text-ink md:text-xl">{note.title}</span>
                <span className="mt-2 block text-sm leading-7 text-muted">{note.summary}</span>
              </span>
            </Link>
          ))}
          <Link href="/notes" className="quiet-link mt-6 hidden w-fit pb-1 text-sm md:inline-block">
            All notes
          </Link>
        </div>
      </section>
    </main>
  );
}
