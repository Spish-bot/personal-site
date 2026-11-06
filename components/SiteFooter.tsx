import { ArrowUp, ArrowUpRight } from "lucide-react";
import { about } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer site-width">
      <div className="footer-identity">
        <p>{about.description}</p>
      </div>
      <div className="footer-meta">
        <div className="footer-links">
          {about.links?.map((link) => (
            <a key={link.href} href={link.href}>{link.label}<ArrowUpRight size={13} aria-hidden="true" /></a>
          ))}
        </div>
        <p className="meta">© {new Date().getFullYear()}</p>
      </div>
      <a href="#top" className="back-to-top" aria-label="返回页面顶部"><ArrowUp size={17} aria-hidden="true" /></a>
    </footer>
  );
}
