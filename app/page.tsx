import Link from "next/link";
import { experience, projects, site, skills } from "@/content/site";
import { formatDate, getPosts } from "@/lib/blog";
import { getCaseStudies } from "@/lib/case-studies";
import { button, CaseStudyList, link, mono, ProjectList, row, Section, type SectionProps } from "./section";

export default async function Home() {
  const caseStudies = await getCaseStudies();
  const posts = (await getPosts()).slice(0, 3);

  // Projects and Blog drop out while empty; numbering follows what is left.
  const sections: (SectionProps | false)[] = [
    {
      id: "work",
      title: "Selected work",
      blurb: "Case studies: what I built, and the decisions behind it.",
      body: <CaseStudyList items={caseStudies} />,
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
      body: <ProjectList />,
    },
    {
      id: "skills",
      title: "Skills",
      blurb: "Grouped by area, mobile first.",
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
        {site.location && <p className={`${mono} mb-5`}>{site.location}</p>}
        <h1 className="text-5xl tracking-tight sm:text-6xl">{site.name}</h1>
        <p className="mt-5 text-xl text-link sm:text-2xl">{site.title}</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{site.positioning}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="#work" className={`${button} border-accent bg-accent text-on-accent hover:brightness-110`}>
            View work
          </Link>
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
