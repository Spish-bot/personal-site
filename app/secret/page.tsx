import { ContentModules } from "@/components/ContentModules";
import { formatDate, getPublishedSecretEntries, secret } from "@/lib/content";

export const metadata = {
  title: secret.title
};

export default function SecretPage() {
  const entries = getPublishedSecretEntries();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <section className="reading-width">
        <p className="mb-5 text-xs uppercase tracking-wide text-soft">Hidden room</p>
        <h1 className="text-4xl font-normal leading-tight text-ink md:text-5xl">{secret.title}</h1>
        <div className="mt-8 space-y-4">
          {secret.intro.map((paragraph) => (
            <p key={paragraph} className="content-text">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="reading-width mt-16 divide-y divide-line border-y border-line">
        {entries.map((entry) => (
          <article key={entry.slug} className="py-9">
            <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-soft">
              <time dateTime={entry.date}>{formatDate(entry.date)}</time>
              {entry.tags?.length ? <span>{entry.tags.join(" / ")}</span> : null}
            </div>
            <h2 className="text-2xl font-normal leading-snug text-ink">{entry.title}</h2>
            <p className="mt-4 leading-7 text-muted">{entry.summary}</p>
            {entry.modules.length ? (
              <div className="mt-8">
                <ContentModules modules={entry.modules} />
              </div>
            ) : null}
          </article>
        ))}
      </section>
    </main>
  );
}
