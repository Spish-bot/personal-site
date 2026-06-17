import { notFound } from "next/navigation";
import { ContentModules } from "@/components/ContentModules";
import { getPublishedWorks, getWork } from "@/lib/content";

type WorkDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getPublishedWorks().map((work) => ({
    slug: work.slug
  }));
}

export function generateMetadata({ params }: WorkDetailPageProps) {
  const work = getWork(params.slug);

  if (!work) {
    return {};
  }

  return {
    title: work.title,
    description: work.summary
  };
}

export default function WorkDetailPage({ params }: WorkDetailPageProps) {
  const work = getWork(params.slug);

  if (!work) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <article className="reading-width mx-auto">
        <header className="mb-14">
          <p className="mb-5 text-xs uppercase tracking-wide text-soft">
            {work.year} / {work.type.join(" / ")}
          </p>
          <h1 className="text-4xl font-normal leading-tight text-ink md:text-5xl">{work.title}</h1>
          {work.subtitle ? <p className="mt-4 text-sm text-soft">{work.subtitle}</p> : null}
        </header>
        <ContentModules modules={work.modules} />
      </article>
    </main>
  );
}
