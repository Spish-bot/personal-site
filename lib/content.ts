import aboutData from "@/content/about.json";
import notesData from "@/content/notes.json";
import worksData from "@/content/works.json";
import type { About, Note, Work } from "@/lib/types";

export const about = aboutData as About;

export function getPublishedWorks(): Work[] {
  return (worksData as Work[])
    .filter((work) => work.published)
    .sort((a, b) => Number(b.year) - Number(a.year));
}

export function getWork(slug: string): Work | undefined {
  return getPublishedWorks().find((work) => work.slug === slug);
}

export function getPublishedNotes(): Note[] {
  return (notesData as Note[])
    .filter((note) => note.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNote(slug: string): Note | undefined {
  return getPublishedNotes().find((note) => note.slug === slug);
}

export function getRecentUpdates() {
  const works = getPublishedWorks().slice(0, 2).map((work) => ({
    title: work.title,
    href: `/works/${work.slug}`,
    meta: `${work.year} / ${work.type.join(", ")}`
  }));

  const notes = getPublishedNotes().slice(0, 3).map((note) => ({
    title: note.title,
    href: `/notes/${note.slug}`,
    meta: formatDate(note.date)
  }));

  return [...notes, ...works].slice(0, 5);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(new Date(`${date}T00:00:00`));
}
