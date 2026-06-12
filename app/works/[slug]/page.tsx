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
      <article className="mx-auto max-w-3xl">
        <header className="mb-12">
          <p className="mb-4 text-sm uppercase text-muted">
            {work.year} / {work.type.join(" / ")}
          </p>
          <h1 className="text-4xl font-normal leading-tight text-ink md:text-6xl">{work.title}</h1>
          <p className="mt-7 text-xl leading-9 text-muted">{work.summary}</p>
        </header>
        <ContentModules modules={work.modules} />
      </article>
    </main>
  );
}
