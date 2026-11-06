import { ContentModules } from "@/components/ContentModules";
import { getPublishedSecretEntries, secret } from "@/lib/content";

export const metadata = { title: secret.title, robots: { index: false, follow: false } };

export default function SecretPage() {
  const entries = getPublishedSecretEntries();
  return (
    <main id="main-content" className="site-width secret-page">
      <header className="archive-heading">
        <div><p className="meta accent">Hidden room</p><h1>{secret.title}</h1></div>
      </header>
      <div className="secret-intro">
        {secret.intro.map((paragraph, index) => <p key={index} className="content-text">{paragraph}</p>)}
      </div>
      {entries.map((entry) => (
        <article key={entry.slug} className="secret-entry">
          <time className="meta" dateTime={entry.date}>{entry.date.replaceAll("-", ".")}</time>
          <h2>{entry.title}</h2>
          <ContentModules modules={entry.modules} />
        </article>
      ))}
    </main>
  );
}
