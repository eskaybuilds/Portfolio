import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/case-studies";
import { CaseStudyList, PageHeader } from "../section";

const description = "Case studies: what I built, and the decisions behind it.";

export const metadata: Metadata = {
  title: "Work",
  description,
  alternates: { canonical: "/work" },
  openGraph: { type: "website", url: "/work", title: "Work", description },
};

export default async function WorkIndex() {
  return (
    <section className="py-12 sm:py-16">
      <PageHeader label="Index" title="Selected work" blurb={description} />
      <div className="mt-10">
        <CaseStudyList items={await getCaseStudies()} />
      </div>
    </section>
  );
}
