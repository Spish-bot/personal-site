import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const uploadDir = path.join(process.cwd(), "public", "images", "uploads");

function localOnly() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ message: "Image upload is only available in local development." }, { status: 403 });
  }
  return null;
}

function cleanName(name: string) {
  const extension = path.extname(name).toLowerCase() || ".jpg";
  const base = path
    .basename(name, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  return `${Date.now()}-${base || "image"}${extension}`;
}

export async function POST(request: Request) {
  const blocked = localOnly();
  if (blocked) return blocked;

  const formData = await request.formData();
  const files = formData.getAll("files").filter((item): item is File => item instanceof File);

  if (!files.length) {
    return NextResponse.json({ message: "No image files were provided." }, { status: 400 });
  }

  await mkdir(uploadDir, { recursive: true });

  const images = await Promise.all(
    files.map(async (file) => {
      if (!file.type.startsWith("image/")) {
        throw new Error(`${file.name} is not an image.`);
      }

      const fileName = cleanName(file.name);
      const bytes = Buffer.from(await file.arrayBuffer());
      await writeFile(path.join(uploadDir, fileName), bytes);

      return {
        src: `/images/uploads/${fileName}`,
        alt: path.basename(file.name, path.extname(file.name)).replace(/[-_]+/g, " ")
      };
    })
  );

  return NextResponse.json({ images });
}
