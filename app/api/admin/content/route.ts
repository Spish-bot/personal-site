import { readFile, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import type { About, Home, Note, Secret, Work } from "@/lib/types";

const contentDir = path.join(process.cwd(), "content");

async function readJson<T>(fileName: string): Promise<T> {
  const file = await readFile(path.join(contentDir, fileName), "utf8");
  return JSON.parse(file) as T;
}

async function writeJson(fileName: string, value: unknown) {
  const text = `${JSON.stringify(value, null, 2)}\n`;
  await writeFile(path.join(contentDir, fileName), text, "utf8");
}

function localOnly() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ message: "Admin editing is only available in local development." }, { status: 403 });
  }
  return null;
}

export async function GET() {
  const blocked = localOnly();
  if (blocked) return blocked;

  const [about, home, works, notes, secret] = await Promise.all([
    readJson<About>("about.json"),
    readJson<Home>("home.json"),
    readJson<Work[]>("works.json"),
    readJson<Note[]>("notes.json"),
    readJson<Secret>("secret.json")
  ]);

  return NextResponse.json({ about, home, works, notes, secret });
}

export async function PUT(request: Request) {
  const blocked = localOnly();
  if (blocked) return blocked;

  const body = (await request.json()) as {
    about?: About;
    home?: Home;
    works?: Work[];
    notes?: Note[];
    secret?: Secret;
  };

  if (!body.about || !body.home || !Array.isArray(body.works) || !Array.isArray(body.notes) || !body.secret) {
    return NextResponse.json({ message: "Missing about, home, works, notes, or secret data." }, { status: 400 });
  }

  await Promise.all([
    writeJson("about.json", body.about),
    writeJson("home.json", body.home),
    writeJson("works.json", body.works),
    writeJson("notes.json", body.notes),
    writeJson("secret.json", body.secret)
  ]);

  return NextResponse.json({ ok: true });
}
