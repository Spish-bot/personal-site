import Link from "next/link";
import type { CSSProperties } from "react";

export type FrameBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function SeriesFrame({
  title,
  href,
  bounds,
  className = ""
}: {
  title: string;
  href?: string;
  bounds?: FrameBounds;
  className?: string;
}) {
  const style = bounds ? {
    left: bounds.left,
    top: bounds.top,
    width: bounds.width,
    height: bounds.height
  } : undefined;
  const content = (
    <>
      <svg className="series-frame-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 4 C24 1 73 3 98 2 C99 26 97 75 98 98 C70 97 28 100 3 97 C1 71 4 28 2 4 Z" pathLength="1" />
        <path d="M3 6 C29 4 72 5 97 4 M96 96 C69 95 31 98 5 95" pathLength="1" />
      </svg>
      {title ? <span className="series-frame-title">{title}</span> : null}
    </>
  );

  if (href) {
    return <Link href={href} className={`series-frame ${className}`} style={style} aria-label={title || "Series"}>{content}</Link>;
  }
  return <div className={`series-frame ${className}`} style={style as CSSProperties | undefined}>{content}</div>;
}
