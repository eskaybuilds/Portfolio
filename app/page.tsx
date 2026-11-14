import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { experience, projects, site, skills } from "@/content/site";
import { formatDate, getPosts } from "@/lib/blog";
import { getCaseStudies } from "@/lib/case-studies";

const button = "inline-flex min-h-11 items-center rounded-md border px-5 text-sm font-semibold";
const mono = "font-mono text-xs uppercase tracking-widest text-muted";
const row = "grid gap-x-8 gap-y-2 border-t border-line py-6 sm:grid-cols-[11rem_1fr]";
const link = "text-link hover:underline";

type SectionProps = {
  id: string;
  title: string;
  blurb: string;
  more?: { label: string; href: string };
  body: ReactNode;
};

function Section({ n, id, title, blurb, more, body }: SectionProps & { n?: number }) {
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

export default async function Home() {
  const caseStudies = await getCaseStudies();
  const posts = (await getPosts()).slice(0, 3);
  // The portrait is optional: it appears once public/portrait.jpg exists.
  const hasPortrait = existsSync(join(process.cwd(), "public/portrait.jpg"));

  // Projects and Blog drop out while empty; numbering follows what is left.
  const sections: (SectionProps | false)[] = [
    {
      id: "work",
      title: "Selected work",
      blurb: "Case studies: what I built, and the decisions behind it.",
      body: (
        <ul>
          {caseStudies.map(({ slug, meta }) => (
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
      ),
    },
    {
      id: "experience",
      title: "Experience",
      blurb: "Every role, with its employment type. Several overlap.",
      body: (
        <ol>
          {experience.map((job) => (
            <li key={job.company + job.dates} className={row}>
              <p className={mono}>
                {job.dates}
                {job.label && <span className="mt-1 block normal-case tracking-normal">{job.label}</span>}
              </p>
              <div>
                <h3 className="text-lg">
                  {job.role}, {job.company}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{job.line}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    projects.length > 0 && {
      id: "projects",
      title: "Projects",
      blurb: "Side projects and open-source work.",
      body: (
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
      ),
    },
    {
      id: "skills",
      title: "Skills",
      blurb: "Grouped as on my CV, mobile first.",
      body: (
        <dl>
          {skills.map(({ group, items }) => (
            <div key={group} className={row}>
              <dt className={mono}>{group}</dt>
              <dd className="leading-relaxed">{items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    posts.length > 0 && {
      id: "blog",
      title: "Blog",
      blurb: "Notes on React Native, payments and building financial products.",
      more: { label: "All posts", href: "/blog" },
      body: (
        <ul>
          {posts.map(({ slug, meta }) => (
            <li key={slug} className={row}>
              <p className={mono}>
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              </p>
              <div>
                <h3 className="text-lg">
                  <Link href={`/blog/${slug}`} className="hover:text-link hover:underline">
                    {meta.title}
                  </Link>
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{meta.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <>
      <section className="py-16 sm:py-24">
        {hasPortrait && (
          <Image
            src="/portrait.jpg"
            alt="Portrait of Sikiru Razak"
            width={112}
            height={112}
            priority
            className="mb-8 size-28 rounded-full object-cover"
          />
        )}
        {site.location && <p className={`${mono} mb-5`}>{site.location}</p>}
        <h1 className="text-5xl tracking-tight sm:text-6xl">{site.name}</h1>
        <p className="mt-5 text-xl text-link sm:text-2xl">{site.title}</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{site.positioning}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="#work" className={`${button} border-accent bg-accent text-on-accent hover:brightness-110`}>
            View work
          </Link>
          <a href={site.cv} download className={`${button} border-line hover:border-muted`}>
            Download CV
          </a>
          <a href={`mailto:${site.email}`} className={`${button} border-line hover:border-muted`}>
            Email me
          </a>
        </div>
      </section>

      {sections
        .filter((section) => section !== false)
        .map((section, index) => (
          <Section key={section.id} n={index + 1} {...section} />
        ))}

      <Section
        id="contact"
        title="Contact"
        blurb="Email is the fastest way to reach me."
        body={
          <>
            <p className="font-serif text-2xl">
              <a href={`mailto:${site.email}`} className={`${link} break-all`}>
                {site.email}
              </a>
            </p>
            <ul className="mt-5 flex flex-wrap gap-6">
              {site.links.map((item) => (
                <li key={item.href}>
                  <a href={item.href} rel="noopener" className={`${link} py-2`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        }
      />
    </>
  );
}
