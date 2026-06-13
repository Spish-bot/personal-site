import type { ContentModule } from "@/lib/types";

type ContentModulesProps = {
  modules: ContentModule[];
};

export function ContentModules({ modules }: ContentModulesProps) {
  return (
    <div className="space-y-10">
      {modules.map((module, index) => {
        switch (module.kind) {
          case "paragraph":
            return (
              <p key={index} className="content-text">
                {module.text}
              </p>
            );
          case "poem":
            return (
              <div key={index} className="whitespace-pre-line font-serif text-xl leading-loose text-ink md:text-2xl">
                {module.text}
              </div>
            );
          case "image":
            return (
              <figure key={index} className="space-y-3">
                <img src={module.src} alt={module.alt} className="w-full object-cover" />
                {module.caption ? <figcaption>{module.caption}</figcaption> : null}
              </figure>
            );
          case "gallery":
            return (
              <div key={index} className="grid gap-4 sm:grid-cols-2">
                {module.images.map((image) => (
                  <figure key={image.src} className="space-y-3">
                    <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover" />
                    {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            );
          case "video":
            return (
              <figure key={index} className="space-y-3">
                <div className="aspect-video w-full overflow-hidden border border-line bg-white">
                  <iframe
                    src={module.url}
                    title={module.caption ?? "Embedded video"}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {module.caption ? <figcaption>{module.caption}</figcaption> : null}
              </figure>
            );
          case "quote":
            return (
              <blockquote key={index} className="border-l border-ink pl-5 font-serif text-2xl leading-relaxed text-ink">
                {module.text}
              </blockquote>
            );
          case "note":
            return (
              <aside key={index} className="border-y border-line py-6">
                {module.title ? <h2 className="mb-3 text-sm uppercase text-muted">{module.title}</h2> : null}
                <p className="content-text">{module.text}</p>
              </aside>
            );
          case "links":
            return (
              <div key={index} className="flex flex-wrap gap-4 text-sm">
                {module.items.map((item) => (
                  <a key={item.href} href={item.href} className="border-b border-line pb-1 text-ink hover:border-ink">
                    {item.label}
                  </a>
                ))}
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
