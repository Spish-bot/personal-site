import Link from "next/link";
import { about } from "@/lib/content";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Notes", href: "/notes" }
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-7 text-sm md:px-8">
      <Link href="/" className="text-ink transition hover:text-muted">
        {about.name}
      </Link>
      <nav className="flex items-center gap-5 text-soft">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-ink">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
