import { PageIntro } from "@/components/PageIntro";
import { about } from "@/lib/content";

export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <PageIntro eyebrow="About" title={about.name}>
        {about.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PageIntro>

      {about.images?.length ? (
        <div className="mt-14 grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4 text-sm leading-7 text-muted">
            <p>Links</p>
            <div className="flex flex-col items-start gap-3">
              {about.links?.map((link) => (
                <a key={link.href} href={link.href} className="border-b border-line pb-1 text-ink hover:border-ink">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            {about.images.map((image) => (
              <figure key={image.src} className="space-y-3">
                <img src={image.src} alt={image.alt} className="max-h-[560px] w-full object-cover object-[48%_38%]" />
                {image.caption ? <figcaption>{image.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}
