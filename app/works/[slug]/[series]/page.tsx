import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ContentModules } from "@/components/ContentModules";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ReadingProgress } from "@/components/ReadingProgress";
import { getPublishedWorks, getSeries, getWork } from "@/lib/content";

type Props = { params: { slug: string; series: string } };

export function generateStaticParams() {
  return getPublishedWorks().flatMap((work) => (work.album?.series ?? [])
    .filter((series) => series.published)
    .map((series) => ({ slug: work.slug, series: series.slug })));
}

export function generateMetadata({ params }: Props) {
  const work = getWork(params.slug);
  const series = work ? getSeries(work, params.series) : undefined;
  return series ? { title: series.title, description: series.summary } : {};
}

export default function SeriesPage({ params }: Props) {
  const work = getWork(params.slug);
  const series = work ? getSeries(work, params.series) : undefined;
  if (!work || !series || !work.album) notFound();
  const photos = work.album.photos
    .filter((photo) => photo.seriesId === series.id && photo.src.trim())
    .sort((a, b) => a.y - b.y || a.x - b.x);

  return (
    <main id="main-content" className="site-width detail-page">
      <ReadingProgress />
      <Link href={`/works/${work.slug}`} className="text-link back-link"><ArrowLeft size={14} aria-hidden="true" />{work.title}</Link>
      <article className="reading-article wide-article">
        <header className="article-heading series-heading">
          <div className="article-meta meta">
            {series.date ? <time dateTime={series.date}>{series.date.replaceAll("-", ".")}</time> : null}
            <span>{work.type.join(" / ")}</span>
          </div>
          <h1>{series.title}</h1>
          {series.summary ? <p className="article-deck">{series.summary}</p> : null}
        </header>
        <PhotoGallery images={photos} />
        <ContentModules modules={series.modules} />
        <div className="series-end"><Link href={`/works/${work.slug}`} className="text-link"><ArrowLeft size={14} aria-hidden="true" />{work.title}</Link></div>
      </article>
    </main>
  );
}
