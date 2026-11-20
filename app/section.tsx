import type { ReactNode } from "react";
import Link from "next/link";
import { projects } from "@/content/site";
import type { getCaseStudies } from "@/lib/case-studies";

export const button = "inline-flex min-h-11 items-center rounded-md border px-5 text-sm font-semibold";
export const mono = "font-mono text-xs uppercase tracking-widest text-muted";
export const row = "grid gap-x-8 gap-y-2 border-t border-line py-6 sm:grid-cols-[11rem_1fr]";
export const link = "text-link hover:underline";

export type SectionProps = {
  id: string;
  title: string;
  blurb: string;
  more?: { label: string; href: string };
  body: ReactNode;
};

export function Section({ n, id, title, blurb, more, body }: SectionProps & { n?: number }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-line py-14">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          {n && <p className={mono}>{String(n).padStart(2, "0")}</p>}
          <h2 id={`${id}-heading`} className="mt-2 text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-muted">{blurb}</p>
        </div>
        {more && (
          <Link href={more.href} className={`${link} py-1 text-sm`}>
            {more.label} →
          </Link>
        )}
      </div>
      <div className="mt-8">{body}</div>
    </section>
  );
}

/** Page title block shared by the index pages (Work, Projects, About). */
export function PageHeader({ label, title, blurb }: { label: string; title: string; blurb: string }) {
  return (
    <>
      <p className={mono}>{label}</p>
      <h1 className="mt-3 text-3xl tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">{blurb}</p>
    </>
  );
}

export function CaseStudyList({ items }: { items: Awaited<ReturnType<typeof getCaseStudies>> }) {
  return (
    <ul>
      {items.map(({ slug, meta }) => (
        <li key={slug} className={row}>
          <p className={mono}>
            {meta.period}
            <span className="mt-1 block normal-case tracking-normal">{meta.role}</span>
          </p>
          <div>
            <h3 className="text-xl">
              {meta.company}: {meta.title}
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{meta.summary}</p>
            <p className="mt-3 font-mono text-xs text-muted">{meta.stack.join(" · ")}</p>
            <Link href={`/work/${slug}`} className={`${link} mt-4 inline-block py-1 font-semibold`}>
              Read the case study<span className="sr-only">: {meta.company}</span> →
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ProjectList() {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.href} className={row}>
          <p className={mono}>{project.tags.join(" · ")}</p>
          <div>
            <h3 className="text-lg">
              <a href={project.href} rel="noopener" className="hover:text-link hover:underline">
                {project.name}
              </a>
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{project.line}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
