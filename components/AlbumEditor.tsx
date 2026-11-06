"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { SeriesFrame } from "@/components/SeriesFrame";
import type { AlbumPhoto, PhotoAlbum, PhotoSeries } from "@/lib/types";
import { useSeriesBounds } from "@/lib/useSeriesBounds";

const inputClass = "w-full border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-ink";
const textareaClass = "min-h-24 w-full border border-line bg-white px-3 py-2 text-sm leading-7 text-ink outline-none transition focus:border-ink";
const buttonClass = "min-h-11 border border-line px-3 py-2 text-sm text-ink hover:border-ink disabled:opacity-40";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block space-y-2"><span className="text-xs uppercase tracking-wide text-muted">{label}</span>{children}</label>;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function photoPosition(index: number) {
  return {
    x: 4 + (index % 3) * 32,
    y: 4 + Math.floor(index / 3) * 31,
    width: 28,
    rotation: 0
  };
}

export function AlbumEditor({ album, onChange }: { album: PhotoAlbum; onChange: (album: PhotoAlbum) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const gesture = useRef<{
    id: string;
    mode: "move" | "resize";
    pointerId: number;
    startX: number;
    startY: number;
    photo: AlbumPhoto;
  } | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(album.photos[0]?.id ?? null);
  const bounds = useSeriesBounds(container, album.photos, album.series);
  const selected = album.photos.find((photo) => photo.id === selectedPhoto);

  function updatePhoto(id: string, patch: Partial<AlbumPhoto>) {
    onChange({ ...album, photos: album.photos.map((photo) => photo.id === id ? { ...photo, ...patch } : photo) });
  }

  function updateSeries(id: string, patch: Partial<PhotoSeries>) {
    onChange({ ...album, series: album.series.map((series) => series.id === id ? { ...series, ...patch } : series) });
  }

  function startGesture(event: PointerEvent<HTMLElement>, photo: AlbumPhoto, mode: "move" | "resize") {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = { id: photo.id, mode, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, photo };
    setSelectedPhoto(photo.id);
  }

  function moveGesture(event: PointerEvent<HTMLElement>) {
    const current = gesture.current;
    const rect = container.current?.getBoundingClientRect();
    if (!current || !rect || current.pointerId !== event.pointerId) return;
    const photo = album.photos.find((item) => item.id === current.id);
    if (!photo) return;
    if (current.mode === "move") {
      const x = clamp(current.photo.x + ((event.clientX - current.startX) / rect.width) * 100, 0, 100 - photo.width);
      const y = clamp(current.photo.y + ((event.clientY - current.startY) / rect.height) * 100, 0, 96);
      updatePhoto(photo.id, { x, y });
    } else {
      const width = clamp(current.photo.width + ((event.clientX - current.startX) / rect.width) * 100, 12, 100 - photo.x);
      updatePhoto(photo.id, { width });
    }
  }

  function endGesture(event: PointerEvent<HTMLElement>) {
    if (gesture.current?.pointerId !== event.pointerId) return;
    gesture.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handlePhotoKey(event: React.KeyboardEvent<HTMLElement>, photo: AlbumPhoto) {
    const step = event.shiftKey ? 5 : 1;
    if (event.key === "ArrowLeft") updatePhoto(photo.id, { x: clamp(photo.x - step, 0, 100 - photo.width) });
    else if (event.key === "ArrowRight") updatePhoto(photo.id, { x: clamp(photo.x + step, 0, 100 - photo.width) });
    else if (event.key === "ArrowUp") updatePhoto(photo.id, { y: clamp(photo.y - step, 0, 96) });
    else if (event.key === "ArrowDown") updatePhoto(photo.id, { y: clamp(photo.y + step, 0, 96) });
    else if (event.key === "+" || event.key === "=") updatePhoto(photo.id, { width: clamp(photo.width + step, 12, 100 - photo.x) });
    else if (event.key === "-") updatePhoto(photo.id, { width: clamp(photo.width - step, 12, 100 - photo.x) });
    else return;
    event.preventDefault();
  }

  function addSeries() {
    const id = `series-${Date.now()}`;
    onChange({
      ...album,
      series: [...album.series, { id, slug: id, title: "", date: "", summary: "", published: false, modules: [] }]
    });
  }

  function removeSeries(id: string) {
    if (!window.confirm("Delete selected series?")) return;
    onChange({
      ...album,
      series: album.series.filter((series) => series.id !== id),
      photos: album.photos.map((photo) => photo.seriesId === id ? { ...photo, seriesId: undefined } : photo)
    });
  }

  return (
    <div className="space-y-6 border-y border-line py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm uppercase text-muted">Album</h3>
        <div className="flex gap-2"><button type="button" className={buttonClass} onClick={addSeries}>New series</button></div>
      </div>
      <div className="max-w-48">
        <Field label="Canvas height">
          <input className={inputClass} type="number" min="600" max="4000" step="50" value={album.canvasHeight} onChange={(event) => onChange({ ...album, canvasHeight: clamp(Number(event.target.value) || 1350, 600, 4000) })} />
        </Field>
      </div>
      <div
        ref={container}
        className="album-editor-canvas"
        style={{ aspectRatio: `1200 / ${album.canvasHeight}` }}
      >
        {album.photos.map((photo) => (
          <figure
            key={photo.id}
            data-album-photo={photo.id}
            data-selected={selectedPhoto === photo.id ? "true" : undefined}
            className="album-editor-photo"
            tabIndex={0}
            aria-label={photo.alt || photo.id}
            style={{ left: `${photo.x}%`, top: `${photo.y}%`, width: `${photo.width}%`, transform: `rotate(${photo.rotation}deg)` }}
            onPointerDown={(event) => startGesture(event, photo, "move")}
            onPointerMove={moveGesture}
            onPointerUp={endGesture}
            onPointerCancel={endGesture}
            onKeyDown={(event) => handlePhotoKey(event, photo)}
            onFocus={() => setSelectedPhoto(photo.id)}
          >
            <img src={photo.src.trim()} alt={photo.alt} draggable="false" />
            {selectedPhoto === photo.id ? (
              <span
                className="album-resize-handle"
                aria-hidden="true"
                onPointerDown={(event) => startGesture(event, photo, "resize")}
                onPointerMove={moveGesture}
                onPointerUp={endGesture}
                onPointerCancel={endGesture}
              />
            ) : null}
          </figure>
        ))}
        {album.series.map((series) => bounds[series.id] ? <SeriesFrame key={series.id} title={series.title} bounds={bounds[series.id]} /> : null)}
      </div>

      <ImageUploader
        label="Upload album photos"
        onUploaded={(images) => onChange({
          ...album,
          photos: [...album.photos, ...images.map((image, index) => ({
            ...image,
            id: `photo-${Date.now()}-${index}`,
            ...photoPosition(album.photos.length + index)
          }))]
        })}
      />

      {selected ? (
        <div className="space-y-4 border border-line bg-white p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Alt text"><input className={inputClass} value={selected.alt} onChange={(event) => updatePhoto(selected.id, { alt: event.target.value })} /></Field>
            <Field label="Annotation"><textarea className={textareaClass} value={selected.caption ?? ""} onChange={(event) => updatePhoto(selected.id, { caption: event.target.value })} /></Field>
            <Field label="Date"><input className={inputClass} value={selected.date ?? ""} onChange={(event) => updatePhoto(selected.id, { date: event.target.value })} /></Field>
            <Field label="Series">
              <select className={inputClass} value={selected.seriesId ?? ""} onChange={(event) => updatePhoto(selected.id, { seriesId: event.target.value || undefined })}>
                <option value="" />
                {album.series.map((series) => <option key={series.id} value={series.id}>{series.title || series.slug}</option>)}
              </select>
            </Field>
            <Field label="X"><input className={inputClass} type="number" min="0" max="100" value={selected.x} onChange={(event) => updatePhoto(selected.id, { x: clamp(Number(event.target.value), 0, 100 - selected.width) })} /></Field>
            <Field label="Y"><input className={inputClass} type="number" min="0" max="96" value={selected.y} onChange={(event) => updatePhoto(selected.id, { y: clamp(Number(event.target.value), 0, 96) })} /></Field>
            <Field label="Width"><input className={inputClass} type="number" min="12" max="100" value={selected.width} onChange={(event) => updatePhoto(selected.id, { width: clamp(Number(event.target.value), 12, 100 - selected.x) })} /></Field>
            <Field label="Rotation"><input className={inputClass} type="number" min="-20" max="20" step="0.1" value={selected.rotation} onChange={(event) => updatePhoto(selected.id, { rotation: clamp(Number(event.target.value), -20, 20) })} /></Field>
          </div>
          <button type="button" className={buttonClass} onClick={() => {
            onChange({ ...album, photos: album.photos.filter((photo) => photo.id !== selected.id) });
            setSelectedPhoto(null);
          }}>Remove photo from album</button>
        </div>
      ) : null}

      <div className="space-y-4">
        {album.series.map((series) => (
          <div key={series.id} className="space-y-4 border border-line bg-white p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Series title"><input className={inputClass} value={series.title} onChange={(event) => updateSeries(series.id, { title: event.target.value })} /></Field>
              <Field label="Series slug"><input className={inputClass} value={series.slug} onChange={(event) => updateSeries(series.id, { slug: event.target.value.trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "") })} /></Field>
              <Field label="Date"><input className={inputClass} value={series.date ?? ""} onChange={(event) => updateSeries(series.id, { date: event.target.value })} /></Field>
              <label className="flex min-h-11 items-center gap-2 pt-6 text-sm text-ink"><input type="checkbox" checked={series.published} onChange={(event) => updateSeries(series.id, { published: event.target.checked })} />Published</label>
            </div>
            <Field label="Summary"><textarea className={textareaClass} value={series.summary ?? ""} onChange={(event) => updateSeries(series.id, { summary: event.target.value })} /></Field>
            <button type="button" className={buttonClass} onClick={() => removeSeries(series.id)}>Delete series</button>
          </div>
        ))}
      </div>
    </div>
  );
}
