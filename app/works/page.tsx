import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { getPublishedWorks } from "@/lib/content";
import type { Work } from "@/lib/types";

export const metadata = {
  title: "Works"
};

export default function WorksPage() {
  const works = getPublishedWorks();
  const groupedWorks = groupWorksByYear(works);

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <PageIntro eyebrow="Works" title="Non-commercial projects and experiments">
        <p>Film, photography, AI video, writing, game concepts, and other unfinished forms.</p>
      </PageIntro>

      <div className="border-y border-line">
        {groupedWorks.map((group) => (
          <section key={group.year} className="grid gap-6 border-b border-line py-8 last:border-b-0 md:grid-cols-[8rem_1fr]">
            <h2 className="text-sm text-soft">{group.year}</h2>
            <div className="divide-y divide-line">
              {group.items.map((work) => (
                <Link key={work.slug} href={`/works/${work.slug}`} className="block py-7 first:pt-0 last:pb-0 hover:text-muted">
                  <article className="grid gap-6 md:grid-cols-[1fr_10rem]">
                    <div>
                      <h3 className="text-2xl font-normal leading-snug text-ink">{work.title}</h3>
                      {work.subtitle ? <p className="mt-2 text-sm text-soft">{work.subtitle}</p> : null}
                      <p className="mt-3 text-xs uppercase tracking-wide text-soft">{work.type.join(" / ")}</p>
                      <p className="mt-5 max-w-2xl leading-7 text-muted">{work.summary}</p>
                    </div>
                    {work.cover ? (
                      <img src={work.cover} alt="" className="aspect-[4/3] w-full object-cover opacity-90 md:mt-1" />
                    ) : null}
                  </article>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function groupWorksByYear(works: Work[]) {
  const groups = new Map<string, Work[]>();

  works.forEach((work) => {
    const year = work.year.trim() || "Other";
    groups.set(year, [...(groups.get(year) ?? []), work]);
  });

  return Array.from(groups, ([year, items]) => ({ year, items }));
}
