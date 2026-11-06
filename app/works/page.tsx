import { WorksArchive } from "@/components/WorksArchive";
import { getPublishedWorks } from "@/lib/content";

export const metadata = { title: "Works" };

export default function WorksPage() {
  const previews = getPublishedWorks().map(({ slug, title, subtitle, year, type, length, tags, summary, cover }) => ({
    slug,
    title,
    subtitle,
    year,
    type,
    length,
    tags,
    summary,
    cover
  }));
  return (
    <main id="main-content" className="site-width archive-page">
      <header className="archive-heading"><h1>Works<span className="wordmark-period" aria-hidden="true">*</span></h1></header>
      <WorksArchive works={previews} />
    </main>
  );
}
