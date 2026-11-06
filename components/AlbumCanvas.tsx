"use client";

import { useMemo, useRef, useState } from "react";
import { PhotoLightbox } from "@/components/PhotoLightbox";
import { SeriesFrame } from "@/components/SeriesFrame";
import type { AlbumPhoto, PhotoAlbum, PhotoSeries } from "@/lib/types";
import { useSeriesBounds } from "@/lib/useSeriesBounds";

type MobileItem = {
  id: string;
  photos: AlbumPhoto[];
  series?: PhotoSeries;
};

export function AlbumCanvas({ album, workSlug }: { album: PhotoAlbum; workSlug: string }) {
  const [active, setActive] = useState<number | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const photos = useMemo(() => album.photos
    .filter((photo) => photo.src.trim())
    .sort((a, b) => a.y - b.y || a.x - b.x), [album.photos]);
  const series = useMemo(() => album.series.filter((item) => item.published), [album.series]);
  const bounds = useSeriesBounds(container, photos, series);

  const mobileItems = useMemo(() => {
    const items: MobileItem[] = [];
    const groups = new Map<string, MobileItem>();
    photos.forEach((photo) => {
      const parent = series.find((item) => item.id === photo.seriesId);
      if (!parent) {
        items.push({ id: photo.id, photos: [photo] });
        return;
      }
      const existing = groups.get(parent.id);
      if (existing) {
        existing.photos.push(photo);
        return;
      }
      const group = { id: parent.id, photos: [photo], series: parent };
      groups.set(parent.id, group);
      items.push(group);
    });
    return items;
  }, [photos, series]);

  function openPhoto(id: string) {
    const index = photos.findIndex((photo) => photo.id === id);
    if (index >= 0) setActive(index);
  }

  function photoButton(photo: AlbumPhoto) {
    return (
      <button type="button" className="photo-button" onClick={() => openPhoto(photo.id)} aria-label={"放大照片" + (photo.alt ? "：" + photo.alt : "")}>
        <img src={photo.src.trim()} alt={photo.alt} loading="lazy" />
      </button>
    );
  }

  return (
    <>
      <div
        ref={container}
        className="album-canvas"
        style={{ aspectRatio: `1200 / ${Math.max(600, album.canvasHeight)}` }}
      >
        {photos.map((photo) => (
          <figure
            key={photo.id}
            data-album-photo={photo.id}
            className="album-photo"
            style={{
              left: `${photo.x}%`,
              top: `${photo.y}%`,
              width: `${photo.width}%`,
              transform: `rotate(${photo.rotation}deg)`
            }}
          >
            {photoButton(photo)}
            {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
          </figure>
        ))}
        {series.map((item) => bounds[item.id] ? (
          <SeriesFrame
            key={item.id}
            title={item.title}
            href={`/works/${workSlug}/${item.slug}`}
            bounds={bounds[item.id]}
          />
        ) : null)}
      </div>

      <div className="album-mobile">
        {mobileItems.map((item) => item.series ? (
          <section key={item.id} className="mobile-series">
            <SeriesFrame title={item.series.title} href={`/works/${workSlug}/${item.series.slug}`} className="mobile-series-frame" />
            <div className="mobile-series-photos">
              {item.photos.map((photo) => <figure key={photo.id}>{photoButton(photo)}{photo.caption ? <figcaption>{photo.caption}</figcaption> : null}</figure>)}
            </div>
          </section>
        ) : (
          <figure key={item.id}>{photoButton(item.photos[0])}{item.photos[0].caption ? <figcaption>{item.photos[0].caption}</figcaption> : null}</figure>
        ))}
      </div>
      <PhotoLightbox images={photos} active={active} onChange={setActive} />
    </>
  );
}
