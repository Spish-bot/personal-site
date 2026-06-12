import Link from "next/link";
import { about, getRecentUpdates } from "@/lib/content";

const entrances = [
  { label: "About", href: "/about", description: "who I am, what I am paying attention to" },
  { label: "Works", href: "/works", description: "non-commercial projects and experiments" },
  { label: "Notes", href: "/notes", description: "fragments, observations, and daily writing" }
];

export default function HomePage() {
  const updates = getRecentUpdates();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <section className="max-w-3xl">
        <p className="mb-5 text-sm uppercase text-muted">Personal archive</p>
        <h1 className="text-5xl font-normal leading-tight text-ink md:text-7xl">{about.name}</h1>
        <p className="mt-7 max-w-xl text-xl leading-9 text-muted">{about.description}</p>
      </section>

      <section className="mt-20 grid border-y border-line md:grid-cols-3">
        {entrances.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border-b border-line py-7 transition hover:text-muted md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
          >
            <h2 className="text-2xl font-normal">{item.label}</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">{item.description}</p>
          </Link>
        ))}
      </section>

      <section className="mt-20 max-w-2xl">
        <h2 className="mb-6 text-sm uppercase text-muted">Recent updates</h2>
        <div className="divide-y divide-line">
          {updates.map((item) => (
            <Link key={item.href} href={item.href} className="flex gap-5 py-4 hover:text-muted">
              <span className="min-w-28 text-sm text-muted">{item.meta}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
