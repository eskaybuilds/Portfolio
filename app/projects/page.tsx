import type { Metadata } from "next";
import { PageHeader, ProjectList } from "../section";

const description = "Side projects and open-source work.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { type: "website", url: "/projects", title: "Projects", description },
};

export default function ProjectsIndex() {
  return (
    <section className="py-12 sm:py-16">
      <PageHeader label="Index" title="Projects" blurb={description} />
      <div className="mt-10">
        <ProjectList />
      </div>
    </section>
  );
}
