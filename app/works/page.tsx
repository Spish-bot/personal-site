import { WorksArchive } from "@/components/WorksArchive";
import { getPublishedWorks } from "@/lib/content";

export const metadata = { title: "Works" };

export default function WorksPage() {
  const works = getPublishedWorks();
  const previews = works.map(({ slug, title, subtitle, year, type, summary, cover }) => ({ slug, title, subtitle, year, type, summary, cover }));
  return (
    <main id="main-content" className="site-width archive-page">
      <header className="archive-heading">
        <div><p className="section-label">作品</p><h1>Works<span className="wordmark-period" aria-hidden="true">*</span></h1></div>
        <div className="archive-aside"><span className="meta">{String(works.length).padStart(2, "0")} 件作品</span></div>
      </header>
      <WorksArchive works={previews} />
    </main>
  );
}
