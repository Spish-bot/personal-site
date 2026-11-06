"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Work } from "@/lib/types";

type Preview = Pick<Work, "slug" | "title" | "subtitle" | "year" | "type" | "length" | "tags" | "summary" | "cover">;
const genreLabels: Record<string, string> = { Poetry: "诗歌", Novel: "小说", Prose: "散文", Photography: "摄影", Writing: "文字", Film: "影像" };

export function WorksArchive({ works }: { works: Preview[] }) {
  const [category, setCategory] = useState("");
  const genre = (work: Preview) => work.type[work.type.length - 1] || "Writing";
  const categories = Array.from(new Set(works.map(genre)));
  const visible = category ? works.filter((work) => genre(work) === category) : works;
  const groups = new Map<string, Preview[]>();
  visible.forEach((work) => {
    const year = work.year.trim();
    groups.set(year, [...(groups.get(year) ?? []), work]);
  });

  return (
    <>
      <div className="archive-filters" role="group" aria-label="按作品体裁筛选">
        {["", ...categories].map((item) => (
          <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>
            {item ? genreLabels[item] ?? item : "全部"}
            <span className="filter-count">{item ? works.filter((work) => genre(work) === item).length : works.length}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">显示 {visible.length} 件作品</p>
      {Array.from(groups, ([year, items]) => (
        <section key={year} className="archive-group">
          <h2 className={year ? "archive-year" : "archive-year archive-year-label"}>{year || "未标年份"}</h2>
          <div className="year-entries">
            {items.map((work) => (
              <Link key={work.slug} href={"/works/" + work.slug} className={`archive-entry${work.cover?.trim() ? "" : " no-cover"}`}>
                <div className="archive-entry-copy">
                  <p className="meta entry-type">{[work.type.join(" / "), work.length, work.tags?.join(" / ")].filter(Boolean).join(" · ")}</p>
                  <h3>{work.title}</h3>
                  {work.subtitle ? <p className="entry-subtitle">{work.subtitle}</p> : null}
                  {work.summary ? <p className="entry-summary">{work.summary}</p> : null}
                </div>
                {work.cover?.trim() ? <img className="archive-cover" src={work.cover.trim()} alt="" width="180" height="124" loading="lazy" /> : null}
                <ArrowUpRight className="entry-arrow" size={18} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
