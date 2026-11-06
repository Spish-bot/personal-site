import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RandomWorksList } from "@/components/RandomWorksList";
import { about, getPublishedNotes, getPublishedWorks, home } from "@/lib/content";

export default function HomePage() {
  const works = getPublishedWorks();
  const allNotes = getPublishedNotes();
  const notes = allNotes.slice(0, home.notesCount);
  const photography = works.find((work) => work.type.some((type) => type.toLowerCase() === "photography") && work.cover?.trim());
  const workPreviews = works.map(({ slug, title, year, type, summary, cover }) => ({ slug, title, year, type, summary, cover }));

  return (
    <main id="main-content" className="home-page">
      <section className="home-hero site-width" aria-labelledby="home-title">
        <div className="home-identity">
          <p className="hero-eyebrow"><span className="signal-dot" aria-hidden="true" />{home.eyebrow}</p>
          <h1 id="home-title">{about.name}<span className="wordmark-period" aria-hidden="true">*</span></h1>
          <p className="home-description">{about.description}</p>
        </div>
        <Link href="/about" className="home-portrait" aria-label={home.aboutLabel}>
          <span className="portrait-frame">
            {home.portrait.src.trim() ? <img src={home.portrait.src.trim()} alt={home.portrait.alt} width="1080" height="1080" /> : null}
          </span>
          <span className="portrait-caption"><span>{home.aboutText}</span><span className="text-link">{home.aboutLabel}<ArrowUpRight size={15} aria-hidden="true" /></span></span>
        </Link>
        <svg className="hero-current" viewBox="0 0 900 160" fill="none" aria-hidden="true">
          <path d="M0 108C143 26 247 156 388 81C523 10 638 140 900 45" pathLength="1" />
        </svg>
      </section>

      <div id="archive" className="home-archive site-width">
        <section className="home-works" aria-labelledby="home-works-title">
          <header className="section-heading">
            <div>
              <p className="section-label">{home.worksEyebrow}</p>
              <h2 id="home-works-title">{home.worksTitle}<span className="section-count">{String(works.length).padStart(2, "0")}</span></h2>
            </div>
            <Link className="text-link" href="/works">{home.worksLinkLabel}<ArrowUpRight size={15} aria-hidden="true" /></Link>
          </header>
          <RandomWorksList works={workPreviews} count={home.worksCount} />
        </section>

        <section className="home-notes" aria-labelledby="home-notes-title">
          <header className="section-heading">
            <div>
              <p className="section-label">{home.notesEyebrow}</p>
              <h2 id="home-notes-title">{home.notesTitle}<span className="section-count">{String(allNotes.length).padStart(2, "0")}</span></h2>
            </div>
            <Link className="text-link" href="/notes">{home.notesLinkLabel}<ArrowUpRight size={15} aria-hidden="true" /></Link>
          </header>
          <div className="home-note-list">
            {notes.map((note) => (
              <Link key={note.slug} href={"/notes/" + note.slug} className="home-note-entry">
                <time className="meta" dateTime={note.date}><span>{note.date.slice(0, 4)}</span>{note.date.slice(5).replace("-", ".")}</time>
                <span className="home-note-copy"><h3>{note.title}</h3><p>{note.summary}</p></span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      {photography ? (
        <section className="home-photography" aria-labelledby="photography-title">
          <Link href={"/works/" + photography.slug} className="photography-link site-width">
            <figure><img src={photography.cover!.trim()} alt={photography.title} width="1616" height="1080" loading="lazy" /></figure>
            <div className="photography-copy">
              <p className="section-label">{photography.type.join(" / ")}</p>
              <h2 id="photography-title">{photography.title}</h2>
              <p>{photography.summary}</p>
              <span className="text-link" aria-hidden="true"><ArrowUpRight size={18} /></span>
            </div>
          </Link>
        </section>
      ) : null}
    </main>
  );
}
