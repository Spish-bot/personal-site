import { RandomWorksList } from "@/components/RandomWorksList";
import { getPublishedWorks, getWorkExcerpt, home } from "@/lib/content";

export default function HomePage() {
  const works = getPublishedWorks().map((work) => {
    const isPoem = work.modules.some((module) => module.kind === "poem");
    return {
      slug: work.slug,
      title: work.title,
      year: work.year,
      type: work.type,
      cover: isPoem ? undefined : work.cover,
      excerpt: getWorkExcerpt(work),
      photos: work.album?.photos.map((photo) => photo.src.trim()).filter(Boolean) ?? (!isPoem && work.cover?.trim() ? [work.cover.trim()] : [])
    };
  });

  return (
    <main id="main-content" className="home-index site-width">
      <RandomWorksList works={works} count={home.worksCount} />
    </main>
  );
}
