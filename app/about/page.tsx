import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { experience, site, skills } from "@/content/site";
import { link, mono, PageHeader, row } from "../section";

export const metadata: Metadata = {
  title: "About",
  description: site.positioning,
  alternates: { canonical: "/about" },
  openGraph: { type: "website", url: "/about", title: "About", description: site.positioning },
};

export default function About() {
  const hasPortrait = existsSync(join(process.cwd(), "public/portrait.jpg"));

  return (
    <section className="py-12 sm:py-16">
      <div className="grid items-start gap-10 sm:grid-cols-[1fr_14rem]">
        <div>
          <PageHeader label={site.title} title="About" blurb={site.positioning} />
        </div>
        {hasPortrait && (
          <Image
            src="/portrait.jpg"
            alt="Portrait of Sikiru Razak"
            width={448}
            height={560}
            priority
            className="aspect-[4/5] w-full max-w-xs rounded-2xl border border-line object-cover"
          />
        )}
      </div>

      <h2 className="mt-14 text-2xl">Skills</h2>
      <dl className="mt-6">
        {skills.map(({ group, items }) => (
          <div key={group} className={row}>
            <dt className={mono}>{group}</dt>
            <dd className="leading-relaxed">{items.join(", ")}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-14 text-2xl">Experience</h2>
      <ol className="mt-6">
        {experience.map((job) => (
          <li key={job.company + job.dates} className={row}>
            <p className={mono}>{job.dates}</p>
            <p>
              {job.role}, {job.company}
            </p>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 text-2xl">Get in touch</h2>
      <ul className="mt-5 flex flex-wrap gap-6">
        <li>
          <a href={`mailto:${site.email}`} className={`${link} py-2`}>
            Email
          </a>
        </li>
        {site.links.map((item) => (
          <li key={item.href}>
            <a href={item.href} rel="noopener" className={`${link} py-2`}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
