"use client";

import { useState } from "react";
import type { ImageItem } from "@/lib/types";

export type UploadedImage = {
  src: string;
  alt: string;
};

export function ImageUploader({
  label,
  multiple = true,
  onUploaded
}: {
  label: string;
  multiple?: boolean;
  onUploaded: (images: UploadedImage[]) => void;
}) {
  const [message, setMessage] = useState("");

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setMessage("Uploading...");
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));
      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const body = await response.json();
      if (!response.ok) {
        setMessage(body.message ?? "Upload failed.");
        return;
      }
      onUploaded(body.images as UploadedImage[]);
      setMessage(`Added ${(body.images as UploadedImage[]).length} image(s). Remember to save.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    }
  }

  return (
    <div className="space-y-2 border border-dashed border-line bg-paper p-3">
      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-wide text-muted">{label}</span>
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(event) => {
            void upload(event.target.files);
            event.target.value = "";
          }}
          className="block w-full text-sm text-muted file:mr-3 file:border file:border-line file:bg-white file:px-3 file:py-2 file:text-sm file:text-ink"
        />
      </label>
      {message ? <p className="text-xs text-muted">{message}</p> : null}
    </div>
  );
}

export function ImagePreviewGrid({ images }: { images: ImageItem[] }) {
  const visibleImages = images.filter((image) => image.src);
  if (!visibleImages.length) return <p className="text-xs text-muted">No image preview yet.</p>;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {visibleImages.map((image, index) => (
        <figure key={`${image.src}-${index}`} className="space-y-2 border border-line bg-white p-2">
          <img src={image.src} alt={image.alt || ""} className="aspect-[4/3] w-full object-cover" />
          <figcaption className="break-all text-xs leading-5 text-muted">{image.caption || image.alt || image.src}</figcaption>
        </figure>
      ))}
    </div>
  );
}
