import { ArrowUpRight } from "lucide-react";
import { about } from "@/lib/content";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main id="main-content" className="site-width about-page">
      <header className="about-heading">
        <p className="section-label">About</p>
        <h1>{about.name}<span className="wordmark-period" aria-hidden="true">*</span></h1>
        <p>{about.description}</p>
      </header>
      <div className="about-layout">
        {about.images?.length ? (
          <div className="about-images">
            {about.images.map((image, index) => (
              <figure key={index}>
                <img src={image.src.trim()} alt={image.alt} width="1080" height="1080" />
                {image.caption ? <figcaption>{image.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        ) : null}
        <div className="about-copy">
          {about.intro.map((paragraph, index) => <p key={index} className="content-text">{paragraph}</p>)}
          {about.links?.length ? (
            <div className="about-contact">
              {about.links.map((link) => <a key={link.href} href={link.href} className="text-link">{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
