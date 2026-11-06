"use client";

import { useState } from "react";
import { PhotoLightbox } from "@/components/PhotoLightbox";
import type { ImageItem } from "@/lib/types";

export function PhotoGallery({ images }: { images: ImageItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const visible = images.filter((image) => image.src.trim());

  return (
    <>
      <div className="photo-grid">
        {visible.map((item, index) => (
          <figure key={item.src + index}>
            <button type="button" className="photo-button" onClick={() => setActive(index)} aria-label={"放大照片 " + (index + 1) + (item.alt ? "：" + item.alt : "")}>
              <img src={item.src.trim()} alt={item.alt} loading="lazy" />
            </button>
            {item.caption ? <figcaption>{item.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
      <PhotoLightbox images={visible} active={active} onChange={setActive} />
    </>
  );
}
