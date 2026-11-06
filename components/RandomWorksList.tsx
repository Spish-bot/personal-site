"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Shuffle } from "lucide-react";
import type { Work } from "@/lib/types";

type WorkPreview = Pick<Work, "slug" | "title" | "year" | "type" | "summary" | "cover">;

function chooseWorks(works: WorkPreview[], count: number) {
  const next = [...works];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }
  return next.slice(0, count);
}

export function RandomWorksList({ works, count }: { works: WorkPreview[]; count: number }) {
  const limit = Math.min(works.length, Math.max(0, Math.floor(count)));
  const [selected, setSelected] = useState(() => works.slice(0, limit));
  const [active, setActive] = useState(0);
  const activeWork = selected[active] ?? selected[0];

  useEffect(() => {
    setSelected(chooseWorks(works, limit));
    setActive(0);
  }, [limit, works]);

  function refresh() {
    const next = chooseWorks(works, limit);
    if (works.length > limit && next.every((work) => selected.some((item) => item.slug === work.slug))) {
      const alternative = works.find((work) => !next.some((item) => item.slug === work.slug));
      if (alternative && next.length) next[next.length - 1] = alternative;
    }
    setSelected(next);
    setActive(0);
  }

  return (
    <div className="home-work-browser">
      <div className="home-work-column">
        <div className="home-work-list">
          {selected.map((work, index) => (
            <Link
              key={work.slug}
              href={"/works/" + work.slug}
              className="home-work-entry"
              data-active={activeWork?.slug === work.slug ? "true" : undefined}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span className="work-main">
                <span className="work-title">{work.title}</span>
                <span className="work-summary">{work.summary}</span>
              </span>
              <span className="entry-meta"><span>{work.type[work.type.length - 1]}</span>{work.year ? <span>{work.year}</span> : null}</span>
              <ArrowUpRight className="entry-arrow" size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
        {works.length > 1 && limit > 0 ? (
          <button type="button" className="text-link shuffle-link" onClick={refresh} title="随机推荐另一组作品">
            <Shuffle size={14} aria-hidden="true" />换一组
          </button>
        ) : null}
      </div>
      {activeWork ? (
        <Link href={"/works/" + activeWork.slug} className={"work-preview" + (activeWork.cover?.trim() ? " has-image" : " text-only")} aria-label={"预览作品：" + activeWork.title}>
          {activeWork.cover?.trim() ? (
            <img key={activeWork.slug} src={activeWork.cover.trim()} alt="" loading="lazy" />
          ) : (
            <div key={activeWork.slug} className="text-preview">
              <span className="meta">{activeWork.type.join(" / ")}</span>
              <p>{activeWork.summary}</p>
            </div>
          )}
          <span className="preview-caption"><strong>{activeWork.title}</strong><ArrowUpRight size={16} aria-hidden="true" /></span>
        </Link>
      ) : null}
    </div>
  );
}
