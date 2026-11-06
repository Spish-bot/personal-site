"use client";

import { useEffect, useState, type RefObject } from "react";
import type { FrameBounds } from "@/components/SeriesFrame";
import type { AlbumPhoto, PhotoSeries } from "@/lib/types";

export function useSeriesBounds(
  containerRef: RefObject<HTMLElement>,
  photos: AlbumPhoto[],
  series: PhotoSeries[]
) {
  const [bounds, setBounds] = useState<Record<string, FrameBounds>>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const parent = container.getBoundingClientRect();
      const next: Record<string, FrameBounds> = {};
      series.forEach((item) => {
        const members = photos.filter((photo) => photo.seriesId === item.id);
        const rectangles = members.flatMap((photo) => {
          const element = Array.from(container.querySelectorAll<HTMLElement>("[data-album-photo]"))
            .find((candidate) => candidate.dataset.albumPhoto === photo.id);
          return element ? [element.getBoundingClientRect()] : [];
        });
        if (!rectangles.length) return;
        const left = Math.min(...rectangles.map((rect) => rect.left)) - parent.left - 14;
        const top = Math.min(...rectangles.map((rect) => rect.top)) - parent.top - 34;
        const right = Math.max(...rectangles.map((rect) => rect.right)) - parent.left + 14;
        const bottom = Math.max(...rectangles.map((rect) => rect.bottom)) - parent.top + 16;
        next[item.id] = {
          left: Math.max(0, left),
          top: Math.max(0, top),
          width: Math.min(parent.width, right) - Math.max(0, left),
          height: bottom - Math.max(0, top)
        };
      });
      setBounds(next);
    };

    const observer = new ResizeObserver(update);
    observer.observe(container);
    container.querySelectorAll<HTMLElement>("[data-album-photo]").forEach((element) => observer.observe(element));
    const frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [containerRef, photos, series]);

  return bounds;
}
