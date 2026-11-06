"use client";

import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("spish-theme", next);
    setTheme(next);
  }

  if (pathname.startsWith("/admin")) return null;

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "切换到日间模式" : "切换到夜间模式"}
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "日间模式" : "夜间模式"}
    >
      {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  );
}
