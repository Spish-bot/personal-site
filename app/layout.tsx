import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    default: about.name,
    template: `%s / ${about.name}`
  },
  description: about.description
};

const themeScript = `
  try {
    const saved = localStorage.getItem('spish-theme');
    const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  } catch (_) {}
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body id="top" className="min-h-screen antialiased">
        <a href="#main-content" className="skip-link">跳到正文</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
