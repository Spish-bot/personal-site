import type { ContentModule } from "@/lib/types";
import { PhotoGallery } from "@/components/PhotoGallery";

export function ContentModules({ modules }: { modules: ContentModule[] }) {
  return (
    <div className="content-modules">
      {modules.map((module, index) => {
        switch (module.kind) {
          case "paragraph":
            return module.text.trim() ? <p key={index} className="content-text">{module.text}</p> : null;
          case "heading":
            return <h2 key={index} className="content-heading">{module.text}</h2>;
          case "poem":
            return <div key={index} className="poem-text">{module.text}</div>;
          case "date":
            return module.text.trim() ? <p key={index} className="content-date">{module.text}</p> : null;
          case "image":
            return (
              <figure key={index} className="content-image">
                <img src={module.src.trim()} alt={module.alt} loading="lazy" />
                {module.caption ? <figcaption>{module.caption}</figcaption> : null}
              </figure>
            );
          case "gallery":
            return <PhotoGallery key={index} images={module.images} />;
          case "yearGallery":
            return (
              <section key={index}>
                <div className="gallery-year-heading">
                  <h2>{module.year}</h2>
                  <span className="meta">{String(module.images.length).padStart(2, "0")} 张</span>
                  {module.note ? <p>{module.note}</p> : null}
                </div>
                {module.images.length ? <PhotoGallery images={module.images} /> : <p className="empty-state">这一年的街头照片还没有放进来。</p>}
              </section>
            );
          case "video":
            return (
              <figure key={index} className="content-image">
                <iframe src={module.url} title={module.caption || "视频"} className="content-video" loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                {module.caption ? <figcaption>{module.caption}</figcaption> : null}
              </figure>
            );
          case "quote":
            return <blockquote key={index} className="content-text content-quote">{module.text}</blockquote>;
          case "note":
            return (
              <aside key={index} className="content-note">
                {module.title ? <h2>{module.title}</h2> : null}
                <p className="content-text">{module.text}</p>
              </aside>
            );
          case "links":
            return (
              <div key={index} className="content-links">
                {module.items.map((item) => <a key={item.href} href={item.href} className="quiet-link">{item.label}</a>)}
              </div>
            );
          case "divider":
            return <hr key={index} className="border-line" />;
          default:
            return null;
        }
      })}
    </div>
  );
}
