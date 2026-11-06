import aboutData from "@/content/about.json";
import homeData from "@/content/home.json";
import notesData from "@/content/notes.json";
import practiceData from "@/content/practice.json";
import secretData from "@/content/secret.json";
import worksData from "@/content/works.json";
import type { About, Home, Note, PracticeEntry, Secret, Work } from "@/lib/types";

export const about = aboutData as About;
export const home = homeData as Home;
export const secret = secretData as Secret;

export function getPublishedWorks(): Work[] {
  return (worksData as Work[])
    .filter((work) => work.published)
    .sort((a, b) => getSortableYear(b.year) - getSortableYear(a.year));
}

function getSortableYear(year: string) {
  const match = year.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

export function getWork(slug: string): Work | undefined {
  return getPublishedWorks().find((work) => work.slug === slug);
}

export function getSeries(work: Work, slug: string) {
  return work.album?.series.find((series) => series.published && series.slug === slug);
}

export function getWorkExcerpt(work: Work) {
  const textModule = work.modules.find((item) =>
    (item.kind === "paragraph" || item.kind === "poem" || item.kind === "quote") && item.text.trim()
  );
  return textModule && "text" in textModule ? textModule.text : "";
}

export function getPublishedNotes(): Note[] {
  return (notesData as Note[])
    .filter((note) => note.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNote(slug: string): Note | undefined {
  return getPublishedNotes().find((note) => note.slug === slug);
}

export function getPublishedPractice(): PracticeEntry[] {
  return (practiceData as PracticeEntry[])
    .filter((entry) => entry.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublishedSecretEntries(): Note[] {
  return (secret.entries as Note[])
    .filter((entry) => entry.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(new Date(`${date}T00:00:00`));
}
