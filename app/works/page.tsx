import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { getPublishedWorks } from "@/lib/content";

export const metadata = {
  title: "Works"
};

export default function WorksPage() {
  const works = getPublishedWorks();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <PageIntro eyebrow="Works" title="Non-commercial projects and experiments">
        <p>Film, photography, AI video, writing, game concepts, and other unfinished forms.</p>
      </PageIntro>

      <div className="divide-y divide-line border-y border-line">
        {works.map((work) => (
          <Link key={work.slug} href={`/works/${work.slug}`} className="grid gap-5 py-7 hover:text-muted md:grid-cols-[9rem_1fr]">
            <div className="text-sm text-muted">{work.year}</div>
            <article className="grid gap-5 md:grid-cols-[1fr_11rem]">
              <div>
                <h2 className="text-2xl font-normal text-ink">{work.title}</h2>
                <p className="mt-2 text-sm text-muted">{work.type.join(" / ")}</p>
                <p className="mt-4 max-w-2xl leading-7 text-muted">{work.summary}</p>
              </div>
              {work.cover ? (
                <img src={work.cover} alt="" className="aspect-[4/3] w-full object-cover md:mt-1" />
              ) : null}
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
