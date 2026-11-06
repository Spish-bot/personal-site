"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImageItem } from "@/lib/types";

export function PhotoLightbox({
  images,
  active,
  onChange
}: {
  images: ImageItem[];
  active: number | null;
  onChange: (index: number | null) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = active !== null;
  const image = active !== null ? images[active] : undefined;
  const annotation = image?.caption?.trim();

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
    if (active === null || !images.length) return;
    onChange((active + direction + images.length) % images.length);
  }

  return (
    <dialog
      ref={dialog}
      className="photo-dialog"
      aria-label="照片查看"
      onClose={() => onChange(null)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      <div className="lightbox-layout">
        <div className="lightbox-toolbar">
          <p className="meta" aria-live="polite">{String((active ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</p>
          <button type="button" className="icon-button" aria-label="关闭照片" title="关闭照片" onClick={() => onChange(null)} autoFocus><X size={20} /></button>
        </div>
        <div className={annotation ? "lightbox-body has-annotation" : "lightbox-body"}>
          <div className="lightbox-stage">
            <button type="button" className="icon-button" aria-label="上一张照片" title="上一张照片" disabled={images.length < 2} onClick={() => move(-1)}><ChevronLeft size={20} /></button>
            {image ? <img src={image.src.trim()} alt={image.alt} /> : <span />}
            <button type="button" className="icon-button" aria-label="下一张照片" title="下一张照片" disabled={images.length < 2} onClick={() => move(1)}><ChevronRight size={20} /></button>
          </div>
          {annotation ? <aside className="lightbox-annotation" aria-label="照片注释" aria-live="polite"><p>{annotation}</p></aside> : null}
        </div>
      </div>
    </dialog>
  );
}
