import { about } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-20 flex w-full max-w-5xl flex-col gap-4 border-t border-line px-5 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
      <p>© {new Date().getFullYear()} {about.name}</p>
      <div className="flex flex-wrap gap-4">
        {about.links?.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-ink">
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
