import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const backup = path.join(root, "work/ui-redesign-2026-09-25/before.tar");
const files = [
  "app/globals.css", "app/layout.tsx", "app/page.tsx", "app/about/page.tsx",
  "app/works/page.tsx", "app/works/[slug]/page.tsx", "app/notes/page.tsx",
  "app/notes/[slug]/page.tsx", "app/admin/page.tsx", "app/secret/page.tsx",
  "components/SiteHeader.tsx", "components/SiteFooter.tsx", "components/RandomWorksList.tsx",
  "components/ContentModules.tsx", "components/AdminEditor.tsx", "lib/types.ts", "tailwind.config.ts"
];
if (!existsSync(backup)) {
  console.error("Local UI backup was not found: " + backup);
  process.exit(1);
}
// Only restore interface files. Author content and uploaded images stay untouched.
execFileSync("tar", ["-xf", backup, "-C", root, ...files], { stdio: "inherit" });
console.log("Previous UI restored. Content and images were preserved. Restart the local preview.");
