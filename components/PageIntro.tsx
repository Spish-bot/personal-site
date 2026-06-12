import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
};

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <section className="mb-12 max-w-2xl">
      {eyebrow ? <p className="mb-4 text-sm uppercase text-muted">{eyebrow}</p> : null}
      <h1 className="text-4xl font-normal leading-tight text-ink md:text-5xl">{title}</h1>
      {children ? <div className="mt-6 space-y-4 text-lg leading-8 text-muted">{children}</div> : null}
    </section>
  );
}
