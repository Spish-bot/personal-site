"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { About, ContentModule, ImageItem, LinkItem, Note, Secret, Work } from "@/lib/types";

type AdminData = {
  about: About;
  works: Work[];
  notes: Note[];
  secret: Secret;
};

type Section = "notes" | "works" | "secret" | "about";
type UploadedImage = {
  src: string;
  alt: string;
};

const emptyAbout: About = {
  name: "",
  description: "",
  intro: [""],
  images: [],
  links: []
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function listToText(items?: string[]) {
  return (items ?? []).join(", ");
}

function textToList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function linksToText(items?: LinkItem[]) {
  return (items ?? []).map((item) => `${item.label} | ${item.href}`).join("\n");
}

function textToLinks(value: string): LinkItem[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label = "", href = ""] = line.split("|").map((part) => part.trim());
      return { label, href };
    })
    .filter((item) => item.label || item.href);
}

function imagesToText(items?: ImageItem[]) {
  return (items ?? []).map((item) => `${item.src} | ${item.alt} | ${item.caption ?? ""}`).join("\n");
}

function textToImages(value: string): ImageItem[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [src = "", alt = "", caption = ""] = line.split("|").map((part) => part.trim());
      return { src, alt, ...(caption ? { caption } : {}) };
    })
    .filter((item) => item.src || item.alt);
}

function makeModule(kind: ContentModule["kind"]): ContentModule {
  switch (kind) {
    case "image":
      return { kind, src: "", alt: "", caption: "" };
    case "gallery":
      return { kind, images: [] };
    case "yearGallery":
      return { kind, year: String(new Date().getFullYear()), note: "", images: [] };
    case "video":
      return { kind, url: "", caption: "" };
    case "note":
      return { kind, title: "", text: "" };
    case "links":
      return { kind, items: [] };
    case "divider":
      return { kind };
    case "poem":
    case "quote":
    case "paragraph":
    default:
      return { kind, text: "" };
  }
}

function Field({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-ink";
const textareaClass =
  "min-h-28 w-full border border-line bg-white px-3 py-2 text-sm leading-7 text-ink outline-none transition focus:border-ink";
const buttonClass = "border border-line px-3 py-2 text-sm text-ink hover:border-ink disabled:opacity-40";
const primaryButtonClass = "border border-ink bg-ink px-4 py-2 text-sm text-white disabled:opacity-40";

export function AdminEditor() {
  const [section, setSection] = useState<Section>("notes");
  const [data, setData] = useState<AdminData | null>(null);
  const [selectedWork, setSelectedWork] = useState(0);
  const [selectedNote, setSelectedNote] = useState(0);
  const [selectedSecretEntry, setSelectedSecretEntry] = useState(0);
  const [status, setStatus] = useState("Loading local content...");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error((await response.json()).message ?? "Failed to load content.");
        return response.json() as Promise<AdminData>;
      })
      .then((nextData) => {
        setData(nextData);
        setStatus("Local content loaded.");
      })
      .catch((error: Error) => setStatus(error.message));
  }, []);

  const selectedItem = useMemo(() => {
    if (!data) return null;
    if (section === "works") return data.works[selectedWork] ?? null;
    if (section === "notes") return data.notes[selectedNote] ?? null;
    if (section === "secret") return data.secret.entries[selectedSecretEntry] ?? null;
    return null;
  }, [data, section, selectedNote, selectedSecretEntry, selectedWork]);

  function updateData(nextData: AdminData) {
    setData(nextData);
    setDirty(true);
  }

  async function save() {
    if (!data) return;
    setStatus("Saving...");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const body = await response.json();
      setStatus(body.message ?? "Save failed.");
      return;
    }
    setDirty(false);
    setStatus("Saved. Refresh the public pages to preview the latest local content.");
  }

  function addWork() {
    if (!data) return;
    const next: Work = {
      slug: `new-work-${Date.now()}`,
      title: "Untitled work",
      year: String(new Date().getFullYear()),
      type: ["Writing"],
      summary: "",
      published: true,
      modules: [{ kind: "paragraph", text: "" }]
    };
    updateData({ ...data, works: [next, ...data.works] });
    setSelectedWork(0);
    setSection("works");
  }

  function addNote() {
    if (!data) return;
    const next: Note = {
      slug: `new-note-${Date.now()}`,
      title: "Untitled note",
      date: today(),
      summary: "",
      tags: [],
      published: true,
      modules: [{ kind: "paragraph", text: "" }]
    };
    updateData({ ...data, notes: [next, ...data.notes] });
    setSelectedNote(0);
    setSection("notes");
  }

  function addSecretEntry() {
    if (!data) return;
    const next: Note = {
      slug: `secret-${Date.now()}`,
      title: "Untitled secret",
      date: today(),
      summary: "",
      tags: ["hidden"],
      published: true,
      modules: [{ kind: "paragraph", text: "" }]
    };
    updateData({ ...data, secret: { ...data.secret, entries: [next, ...data.secret.entries] } });
    setSelectedSecretEntry(0);
    setSection("secret");
  }

  function deleteWork(index: number) {
    if (!data) return;
    const item = data.works[index];
    if (!item || !window.confirm(`确定删除《${item.title}》吗？`)) return;
    const works = data.works.filter((_, itemIndex) => itemIndex !== index);
    updateData({ ...data, works });
    setSelectedWork(Math.max(0, index - 1));
  }

  function deleteNote(index: number) {
    if (!data) return;
    const item = data.notes[index];
    if (!item || !window.confirm(`确定删除《${item.title}》吗？`)) return;
    const notes = data.notes.filter((_, itemIndex) => itemIndex !== index);
    updateData({ ...data, notes });
    setSelectedNote(Math.max(0, index - 1));
  }

  function deleteSecretEntry(index: number) {
    if (!data) return;
    const item = data.secret.entries[index];
    if (!item || !window.confirm(`确定删除《${item.title}》吗？`)) return;
    const entries = data.secret.entries.filter((_, itemIndex) => itemIndex !== index);
    updateData({ ...data, secret: { ...data.secret, entries } });
    setSelectedSecretEntry(Math.max(0, index - 1));
  }

  function updateWork(index: number, nextWork: Work) {
    if (!data) return;
    updateData({ ...data, works: data.works.map((work, itemIndex) => (itemIndex === index ? nextWork : work)) });
  }

  function updateNote(index: number, nextNote: Note) {
    if (!data) return;
    updateData({ ...data, notes: data.notes.map((note, itemIndex) => (itemIndex === index ? nextNote : note)) });
  }

  function updateSecretEntry(index: number, nextEntry: Note) {
    if (!data) return;
    updateData({
      ...data,
      secret: {
        ...data.secret,
        entries: data.secret.entries.map((entry, itemIndex) => (itemIndex === index ? nextEntry : entry))
      }
    });
  }

  function updateSecret(nextSecret: Secret) {
    if (!data) return;
    updateData({ ...data, secret: nextSecret });
  }

  function updateAbout(nextAbout: About) {
    if (!data) return;
    updateData({ ...data, about: nextAbout });
  }

  if (!data) {
    return <p className="border-y border-line py-8 text-sm text-muted">{status}</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-line py-4">
        <div className="flex gap-2">
          {(["notes", "works", "secret", "about"] as Section[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSection(item)}
              className={section === item ? primaryButtonClass : buttonClass}
            >
              {item === "notes" ? "Notes" : item === "works" ? "Works" : item === "secret" ? "Secret" : "About"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted">{dirty ? "Unsaved changes" : status}</p>
          <button type="button" onClick={save} className={primaryButtonClass} disabled={!dirty}>
            Save to local files
          </button>
        </div>
      </div>

      {section === "notes" ? (
        <TwoColumnEditor
          title="Notes"
          onAdd={addNote}
          items={data.notes.map((note) => ({ title: note.title, meta: note.date, published: note.published }))}
          selected={selectedNote}
          onSelect={setSelectedNote}
          onDelete={deleteNote}
        >
          {selectedItem ? (
            <NoteForm note={selectedItem as Note} onChange={(note) => updateNote(selectedNote, note)} />
          ) : (
            <EmptyState label="No note selected." />
          )}
        </TwoColumnEditor>
      ) : null}

      {section === "works" ? (
        <TwoColumnEditor
          title="Works"
          onAdd={addWork}
          items={data.works.map((work) => ({ title: work.title, meta: work.year, published: work.published }))}
          selected={selectedWork}
          onSelect={setSelectedWork}
          onDelete={deleteWork}
        >
          {selectedItem ? (
            <WorkForm work={selectedItem as Work} onChange={(work) => updateWork(selectedWork, work)} />
          ) : (
            <EmptyState label="No work selected." />
          )}
        </TwoColumnEditor>
      ) : null}

      {section === "secret" ? (
        <SecretEditor
          secret={data.secret}
          selected={selectedSecretEntry}
          selectedItem={selectedItem as Note | null}
          onSelect={setSelectedSecretEntry}
          onAdd={addSecretEntry}
          onDelete={deleteSecretEntry}
          onChangeSecret={updateSecret}
          onChangeEntry={(entry) => updateSecretEntry(selectedSecretEntry, entry)}
        />
      ) : null}

      {section === "about" ? <AboutForm about={data.about ?? emptyAbout} onChange={updateAbout} /> : null}
    </div>
  );
}

function TwoColumnEditor({
  title,
  items,
  selected,
  children,
  onAdd,
  onSelect,
  onDelete
}: {
  title: string;
  items: { title: string; meta: string; published: boolean }[];
  selected: number;
  children: ReactNode;
  onAdd: () => void;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase text-muted">{title}</h2>
          <button type="button" onClick={onAdd} className={buttonClass}>
            New
          </button>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {items.map((item, index) => (
            <button
              key={`${item.title}-${item.meta}-${index}`}
              type="button"
              onClick={() => onSelect(index)}
              className={`block w-full px-3 py-4 text-left ${selected === index ? "bg-white" : ""}`}
            >
              <span className="block text-sm text-ink">{item.title}</span>
              <span className="mt-1 block text-xs uppercase text-muted">
                {item.meta} / {item.published ? "Published" : "Draft"}
              </span>
            </button>
          ))}
        </div>
        {items[selected] ? (
          <button type="button" onClick={() => onDelete(selected)} className="text-sm text-muted hover:text-ink">
            Delete selected
          </button>
        ) : null}
      </aside>
      <section>{children}</section>
    </div>
  );
}

function WorkForm({ work, onChange }: { work: Work; onChange: (work: Work) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title">
          <input className={inputClass} value={work.title} onChange={(event) => onChange({ ...work, title: event.target.value })} />
        </Field>
        <Field label="Subtitle, optional">
          <input className={inputClass} value={work.subtitle ?? ""} onChange={(event) => onChange({ ...work, subtitle: event.target.value || undefined })} />
        </Field>
        <Field label="Slug">
          <input className={inputClass} value={work.slug} onChange={(event) => onChange({ ...work, slug: slugify(event.target.value) })} />
        </Field>
        <Field label="Year">
          <input className={inputClass} value={work.year} onChange={(event) => onChange({ ...work, year: event.target.value })} />
        </Field>
        <Field label="Type tags, comma separated">
          <input className={inputClass} value={listToText(work.type)} onChange={(event) => onChange({ ...work, type: textToList(event.target.value) })} />
        </Field>
      </div>
      <Field label="Summary">
        <textarea className={textareaClass} value={work.summary} onChange={(event) => onChange({ ...work, summary: event.target.value })} />
      </Field>
      <Field label="Cover image URL, optional">
        <input className={inputClass} value={work.cover ?? ""} onChange={(event) => onChange({ ...work, cover: event.target.value || undefined })} />
      </Field>
      {work.cover ? <ImagePreviewGrid images={[{ src: work.cover, alt: `${work.title} cover` }]} /> : null}
      <ImageUploader
        label="Upload cover image"
        multiple={false}
        onUploaded={(images) => onChange({ ...work, cover: images[0]?.src ?? work.cover })}
      />
      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" checked={work.published} onChange={(event) => onChange({ ...work, published: event.target.checked })} />
        Published
      </label>
      <ModuleList modules={work.modules} onChange={(modules) => onChange({ ...work, modules })} />
    </div>
  );
}

function NoteForm({ note, onChange }: { note: Note; onChange: (note: Note) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title">
          <input className={inputClass} value={note.title} onChange={(event) => onChange({ ...note, title: event.target.value })} />
        </Field>
        <Field label="Slug">
          <input className={inputClass} value={note.slug} onChange={(event) => onChange({ ...note, slug: slugify(event.target.value) })} />
        </Field>
        <Field label="Date">
          <input className={inputClass} type="date" value={note.date} onChange={(event) => onChange({ ...note, date: event.target.value })} />
        </Field>
        <Field label="Tags, comma separated">
          <input className={inputClass} value={listToText(note.tags)} onChange={(event) => onChange({ ...note, tags: textToList(event.target.value) })} />
        </Field>
      </div>
      <Field label="Summary">
        <textarea className={textareaClass} value={note.summary} onChange={(event) => onChange({ ...note, summary: event.target.value })} />
      </Field>
      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" checked={note.published} onChange={(event) => onChange({ ...note, published: event.target.checked })} />
        Published
      </label>
      <ModuleList modules={note.modules} onChange={(modules) => onChange({ ...note, modules })} />
    </div>
  );
}

function SecretEditor({
  secret,
  selected,
  selectedItem,
  onSelect,
  onAdd,
  onDelete,
  onChangeSecret,
  onChangeEntry
}: {
  secret: Secret;
  selected: number;
  selectedItem: Note | null;
  onSelect: (index: number) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
  onChangeSecret: (secret: Secret) => void;
  onChangeEntry: (entry: Note) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-4 border-y border-line py-6">
        <Field label="Secret page title">
          <input className={inputClass} value={secret.title} onChange={(event) => onChangeSecret({ ...secret, title: event.target.value })} />
        </Field>
        <Field label="Intro lines, one paragraph per line">
          <textarea
            className={textareaClass}
            value={secret.intro.join("\n")}
            onChange={(event) => onChangeSecret({ ...secret, intro: event.target.value.split("\n") })}
          />
        </Field>
      </div>

      <TwoColumnEditor
        title="Secret entries"
        onAdd={onAdd}
        items={secret.entries.map((entry) => ({ title: entry.title, meta: entry.date, published: entry.published }))}
        selected={selected}
        onSelect={onSelect}
        onDelete={onDelete}
      >
        {selectedItem ? <NoteForm note={selectedItem} onChange={onChangeEntry} /> : <EmptyState label="No secret entry selected." />}
      </TwoColumnEditor>
    </div>
  );
}

function AboutForm({ about, onChange }: { about: About; onChange: (about: About) => void }) {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name">
          <input className={inputClass} value={about.name} onChange={(event) => onChange({ ...about, name: event.target.value })} />
        </Field>
        <Field label="Short description">
          <input className={inputClass} value={about.description} onChange={(event) => onChange({ ...about, description: event.target.value })} />
        </Field>
      </div>
      <Field label="Intro paragraphs, one paragraph per line">
        <textarea className={textareaClass} value={(about.intro ?? []).join("\n")} onChange={(event) => onChange({ ...about, intro: event.target.value.split("\n") })} />
      </Field>
      <Field label="Images, one per line: src | alt | caption">
        <textarea className={textareaClass} value={imagesToText(about.images)} onChange={(event) => onChange({ ...about, images: textToImages(event.target.value) })} />
      </Field>
      <ImagePreviewGrid images={about.images ?? []} />
      <ImageUploader
        label="Upload about images"
        onUploaded={(images) => onChange({ ...about, images: [...(about.images ?? []), ...images] })}
      />
      <Field label="Links, one per line: label | href">
        <textarea className={textareaClass} value={linksToText(about.links)} onChange={(event) => onChange({ ...about, links: textToLinks(event.target.value) })} />
      </Field>
    </div>
  );
}

function ModuleList({ modules, onChange }: { modules: ContentModule[]; onChange: (modules: ContentModule[]) => void }) {
  function updateModule(index: number, module: ContentModule) {
    onChange(modules.map((item, itemIndex) => (itemIndex === index ? module : item)));
  }

  function removeModule(index: number) {
    onChange(modules.filter((_, itemIndex) => itemIndex !== index));
  }

  function moveModule(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= modules.length) return;
    const next = [...modules];
    const [item] = next.splice(index, 1);
    next.splice(nextIndex, 0, item);
    onChange(next);
  }

  return (
    <div className="space-y-4 border-t border-line pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm uppercase text-muted">Content modules</h3>
        <select
          className={inputClass}
          value=""
          onChange={(event) => {
            const kind = event.target.value as ContentModule["kind"];
            if (kind) onChange([...modules, makeModule(kind)]);
          }}
        >
          <option value="">Add module...</option>
          <option value="paragraph">Paragraph</option>
          <option value="poem">Poem / preserved line breaks</option>
          <option value="note">Note block</option>
          <option value="image">Image</option>
          <option value="gallery">Gallery</option>
          <option value="yearGallery">Year gallery</option>
          <option value="video">Video</option>
          <option value="links">Links</option>
          <option value="divider">Divider</option>
        </select>
      </div>

      <div className="space-y-5">
        {modules.map((module, index) => (
          <div key={index} className="space-y-4 border border-line bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs uppercase text-muted">
                {index + 1}. {module.kind}
              </p>
              <div className="flex gap-2">
                <button type="button" className={buttonClass} onClick={() => moveModule(index, -1)} disabled={index === 0}>
                  Up
                </button>
                <button type="button" className={buttonClass} onClick={() => moveModule(index, 1)} disabled={index === modules.length - 1}>
                  Down
                </button>
                <button type="button" className={buttonClass} onClick={() => removeModule(index)}>
                  Delete
                </button>
              </div>
            </div>
            <ModuleFields module={module} onChange={(nextModule) => updateModule(index, nextModule)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ModuleFields({ module, onChange }: { module: ContentModule; onChange: (module: ContentModule) => void }) {
  switch (module.kind) {
    case "paragraph":
    case "poem":
    case "quote":
      return (
        <Field label={module.kind === "poem" ? "Text, line breaks preserved" : "Text"}>
          <textarea className={textareaClass} value={module.text} onChange={(event) => onChange({ ...module, text: event.target.value })} />
        </Field>
      );
    case "note":
      return (
        <div className="space-y-4">
          <Field label="Small title, optional">
            <input className={inputClass} value={module.title ?? ""} onChange={(event) => onChange({ ...module, title: event.target.value })} />
          </Field>
          <Field label="Text">
            <textarea className={textareaClass} value={module.text} onChange={(event) => onChange({ ...module, text: event.target.value })} />
          </Field>
        </div>
      );
    case "image":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Image URL">
            <input className={inputClass} value={module.src} onChange={(event) => onChange({ ...module, src: event.target.value })} />
          </Field>
          {module.src ? <ImagePreviewGrid images={[module]} /> : null}
          <Field label="Alt text">
            <input className={inputClass} value={module.alt} onChange={(event) => onChange({ ...module, alt: event.target.value })} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Caption, optional">
              <input className={inputClass} value={module.caption ?? ""} onChange={(event) => onChange({ ...module, caption: event.target.value })} />
            </Field>
          </div>
          <div className="md:col-span-2">
            <ImageUploader
              label="Upload image"
              multiple={false}
              onUploaded={(images) => {
                const image = images[0];
                if (image) onChange({ ...module, src: image.src, alt: module.alt || image.alt });
              }}
            />
          </div>
        </div>
      );
    case "gallery":
      return (
        <div className="space-y-3">
          <Field label="Images, one per line: src | alt | caption">
            <textarea className={textareaClass} value={imagesToText(module.images)} onChange={(event) => onChange({ ...module, images: textToImages(event.target.value) })} />
          </Field>
          <ImagePreviewGrid images={module.images} />
          <ImageUploader label="Upload gallery images" onUploaded={(images) => onChange({ ...module, images: [...module.images, ...images] })} />
        </div>
      );
    case "yearGallery":
      return (
        <div className="space-y-4">
          <Field label="Year">
            <input className={inputClass} value={module.year} onChange={(event) => onChange({ ...module, year: event.target.value })} />
          </Field>
          <Field label="Year note, optional">
            <textarea className={textareaClass} value={module.note ?? ""} onChange={(event) => onChange({ ...module, note: event.target.value })} />
          </Field>
          <Field label="Images, one per line: src | alt | caption">
            <textarea className={textareaClass} value={imagesToText(module.images)} onChange={(event) => onChange({ ...module, images: textToImages(event.target.value) })} />
          </Field>
          <ImagePreviewGrid images={module.images} />
          <ImageUploader label="Upload year images" onUploaded={(images) => onChange({ ...module, images: [...module.images, ...images] })} />
        </div>
      );
    case "video":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Embed URL">
            <input className={inputClass} value={module.url} onChange={(event) => onChange({ ...module, url: event.target.value })} />
          </Field>
          <Field label="Caption, optional">
            <input className={inputClass} value={module.caption ?? ""} onChange={(event) => onChange({ ...module, caption: event.target.value })} />
          </Field>
        </div>
      );
    case "links":
      return (
        <Field label="Links, one per line: label | href">
          <textarea className={textareaClass} value={linksToText(module.items)} onChange={(event) => onChange({ ...module, items: textToLinks(event.target.value) })} />
        </Field>
      );
    case "divider":
      return <p className="text-sm text-muted">A quiet horizontal divider will appear here.</p>;
    default:
      return null;
  }
}

function EmptyState({ label }: { label: string }) {
  return <p className="border-y border-line py-8 text-sm text-muted">{label}</p>;
}

function ImagePreviewGrid({ images }: { images: ImageItem[] }) {
  const visibleImages = images.filter((image) => image.src);

  if (!visibleImages.length) {
    return <p className="text-xs text-muted">No image preview yet.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {visibleImages.map((image) => (
        <figure key={`${image.src}-${image.alt}`} className="space-y-2 border border-line bg-white p-2">
          <img src={image.src} alt={image.alt || ""} className="aspect-[4/3] w-full object-cover" />
          <figcaption className="break-all text-xs leading-5 text-muted">{image.caption || image.alt || image.src}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function ImageUploader({
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

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData
    });

    const body = await response.json();
    if (!response.ok) {
      setMessage(body.message ?? "Upload failed.");
      return;
    }

    onUploaded(body.images as UploadedImage[]);
    setMessage(`Added ${(body.images as UploadedImage[]).length} image(s). Remember to save.`);
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
