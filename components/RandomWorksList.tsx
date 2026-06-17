"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Work } from "@/lib/types";

function shuffleWorks(works: Work[]) {
  const next = [...works];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }

  return next;
}

export function RandomWorksList({ works, count }: { works: Work[]; count: number }) {
  const [recommendedWorks, setRecommendedWorks] = useState(() => works.slice(0, count));

  useEffect(() => {
    setRecommendedWorks(shuffleWorks(works).slice(0, count));
  }, [count, works]);

  return (
    <div className="divide-y divide-line">
      {recommendedWorks.map((work) => (
        <Link key={work.slug} href={`/works/${work.slug}`} className="block py-5 hover:text-muted">
          <article className="grid gap-2 md:grid-cols-[6.5rem_1fr] md:gap-4">
            <span className="text-sm text-soft">{work.year}</span>
            <span>
              <span className="block text-lg text-ink md:text-xl">{work.title}</span>
              {work.subtitle ? <span className="mt-1 block text-sm text-soft">{work.subtitle}</span> : null}
              <span className="mt-1.5 block text-xs uppercase tracking-wide text-soft">{work.type.join(" / ")}</span>
            </span>
          </article>
        </Link>
      ))}
    </div>
  );
}
