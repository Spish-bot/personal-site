"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImageItem } from "@/lib/types";

export function PhotoGallery({ images }: { images: ImageItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = active !== null;
  const visible = images.filter((image) => image.src.trim());
  const image = active !== null ? visible[active] : undefined;

  useEffect(() => {
    const element = dialog.current;
    if (!element || !isOpen) return;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  function move(direction: number) {
    setActive((index) => index === null ? null : (index + direction + visible.length) % visible.length);
  }

  return (
    <>
      <div className="photo-grid">
        {visible.map((item, index) => (
          <figure key={item.src + index}>
            <button type="button" className="photo-button" onClick={() => setActive(index)} aria-label={"放大照片 " + (index + 1) + (item.alt ? "：" + item.alt : "")}>
              <img src={item.src.trim()} alt={item.alt} loading="lazy" />
            </button>
            <figcaption><span className="photo-number">{String(index + 1).padStart(2, "0")}</span><span>{item.caption}</span></figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-label="照片查看"
        onClose={() => setActive(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        }}
      >
        <div className="lightbox-layout">
          <div className="lightbox-toolbar">
            <p className="meta" aria-live="polite">{String((active ?? 0) + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}</p>
            <button type="button" className="icon-button" aria-label="关闭照片" title="关闭照片" onClick={() => setActive(null)} autoFocus><X size={20} /></button>
          </div>
          <div className="lightbox-stage">
            <button type="button" className="icon-button" aria-label="上一张照片" title="上一张照片" disabled={visible.length < 2} onClick={() => move(-1)}><ChevronLeft size={20} /></button>
            {image ? <img src={image.src.trim()} alt={image.alt} /> : <span />}
            <button type="button" className="icon-button" aria-label="下一张照片" title="下一张照片" disabled={visible.length < 2} onClick={() => move(1)}><ChevronRight size={20} /></button>
          </div>
          <p className="lightbox-caption">{image?.caption}</p>
        </div>
      </dialog>
    </>
  );
}
