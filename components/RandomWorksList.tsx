"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Work } from "@/lib/types";

type WorkPreview = Pick<Work, "slug" | "title" | "year" | "type" | "cover"> & {
  photos: string[];
  excerpt: string;
};

type SavedWork = {
  slug: string;
  cover?: string;
};

const storageKey = "spish-home-works-v2";

function shuffle(works: WorkPreview[]) {
  const next = [...works];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }
  return next;
}

function chooseCover(work: WorkPreview, preferred?: string) {
  const pool = work.photos.length ? work.photos : work.cover?.trim() ? [work.cover.trim()] : [];
  const cover = preferred && pool.includes(preferred) ? preferred : pool[Math.floor(Math.random() * pool.length)];
  return { ...work, cover };
}

function initialSelection(works: WorkPreview[], count: number) {
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "[]") as SavedWork[];
    const restored = saved.flatMap((entry) => {
      const work = works.find((item) => item.slug === entry.slug);
      return work ? [chooseCover(work, entry.cover)] : [];
    });
    const remaining = shuffle(works.filter((work) => !restored.some((item) => item.slug === work.slug))).map((work) => chooseCover(work));
    return [...restored, ...remaining].slice(0, count);
  } catch {
    return shuffle(works).slice(0, count).map((work) => chooseCover(work));
  }
}

export function RandomWorksList({ works, count }: { works: WorkPreview[]; count: number }) {
  const limit = Math.min(works.length, Math.max(0, Math.floor(count)));
  const [selected, setSelected] = useState(() => works.slice(0, limit));

  useEffect(() => {
    const next = initialSelection(works, limit);
    setSelected(next);
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(next.map((work) => ({ slug: work.slug, cover: work.cover }))));
    } catch {}
  }, [limit, works]);

  return (
    <div className="work-collage">
      {selected.map((work, index) => (
        <Link
          key={work.slug}
          href={"/works/" + work.slug}
          className={`collage-card collage-slot-${index}${work.cover?.trim() ? " has-cover" : " text-fragment"}`}
        >
          {work.cover?.trim() ? (
            <span className="collage-image"><img src={work.cover.trim()} alt="" loading={index > 1 ? "lazy" : undefined} /></span>
          ) : (
            <span className="fragment-paper">
              <span className="meta">{work.type.join(" / ")}</span>
              <span className="fragment-title">{work.title}</span>
              <span className="fragment-text">{work.excerpt}</span>
            </span>
          )}
          <span className="collage-caption">
            <span>
              <span className="collage-title">{work.title}</span>
              <span className="meta">{[work.type.join(" / "), work.year].filter(Boolean).join(" · ")}</span>
            </span>
            <ArrowUpRight size={19} aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}
