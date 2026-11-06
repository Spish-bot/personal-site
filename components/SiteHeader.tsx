import Link from "next/link";
import { about } from "@/lib/content";
import { SiteNavigation } from "@/components/SiteNavigation";

export function SiteHeader() {
  return (
    <header className="site-header-wrap">
      <div className="site-header site-width">
        <Link href="/" className="site-wordmark" aria-label={about.name + " · 首页"}>
          {about.name}<span className="wordmark-period" aria-hidden="true">*</span>
        </Link>
        <SiteNavigation />
      </div>
    </header>
  );
}
