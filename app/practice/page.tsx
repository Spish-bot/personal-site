import { ArrowUpRight } from "lucide-react";
import { getPublishedPractice } from "@/lib/content";
import type { PracticeEntry } from "@/lib/types";

export const metadata = { title: "Practice" };

export default function PracticePage() {
  const entries = getPublishedPractice();
  return (
    <main id="main-content" className="site-width archive-page practice-page">
      <header className="archive-heading">
        <h1>Practice<span className="wordmark-period" aria-hidden="true">*</span></h1>
      </header>
      <div className="practice-list">
        {entries.map((entry) => <PracticeItem key={entry.id} entry={entry} />)}
      </div>
    </main>
  );
}

function PracticeItem({ entry }: { entry: PracticeEntry }) {
  const content = (
    <>
      <time className="meta" dateTime={entry.date}>{entry.date.replaceAll("-", ".")}</time>
      <div className="practice-copy">
        <h2>{entry.title}</h2>
        {entry.organization ? <p className="practice-organization">{entry.organization}</p> : null}
        {entry.summary ? <p className="entry-summary">{entry.summary}</p> : null}
        {entry.type ? <p className="meta">{entry.type}</p> : null}
      </div>
      {entry.href ? <ArrowUpRight size={18} aria-hidden="true" /> : null}
    </>
  );
  return entry.href ? <a className="practice-entry" href={entry.href}>{content}</a> : <article className="practice-entry">{content}</article>;
}
