"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const items = [
  { href: "/works", label: "Works" },
  { href: "/practice", label: "Practice" },
  { href: "/about", label: "About" },
  { href: "/notes", label: "Notes" }
];

export function SiteNavigation() {
  const pathname = usePathname();
  return (
    <div className="site-navigation">
      <nav className="site-nav" aria-label="主导航">
        {items.map(({ href, label }) => (
          <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(href + "/") ? "page" : undefined}>
            {label}
          </Link>
        ))}
      </nav>
      <ThemeToggle />
    </div>
  );
}
