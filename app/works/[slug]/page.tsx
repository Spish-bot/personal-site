import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ContentModules } from "@/components/ContentModules";
import { ReadingFooter } from "@/components/ReadingFooter";
import { ReadingProgress } from "@/components/ReadingProgress";
import { getPublishedWorks, getWork } from "@/lib/content";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPublishedWorks().map((work) => ({ slug: work.slug }));
}

export function generateMetadata({ params }: Props) {
  const work = getWork(params.slug);
  return work ? { title: work.title, description: work.summary } : {};
}

export default function WorkDetailPage({ params }: Props) {
  const work = getWork(params.slug);
  if (!work) notFound();
  const isPhotographic = work.modules.some((module) => module.kind === "yearGallery");
  return (
    <main id="main-content" className="site-width detail-page">
      <ReadingProgress />
      <Link href="/works" className="text-link back-link"><ArrowLeft size={14} aria-hidden="true" />Works</Link>
      <article className={"reading-article" + (isPhotographic ? " wide-article" : "")}>
        <header className="article-heading">
          <div className="article-meta meta">
            {work.year ? <span>{work.year}</span> : null}
            <span>{work.type.join(" / ")}</span>
          </div>
          <h1>{work.title}</h1>
          {work.subtitle ? <p className="article-subtitle">{work.subtitle}</p> : null}
          {work.summary ? <p className="article-deck">{work.summary}</p> : null}
        </header>
        <ContentModules modules={work.modules} />
        <ReadingFooter entries={getPublishedWorks()} slug={work.slug} section="works" />
      </article>
    </main>
  );
}
