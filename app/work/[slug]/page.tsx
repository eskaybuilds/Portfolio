import type { Metadata } from "next";
import Link from "next/link";
import { caseStudySlugs, getCaseStudy } from "@/lib/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getCaseStudy(slug);
  const title = `${meta.company}: ${meta.title}`;
  return {
    title,
    description: meta.summary,
    alternates: { canonical: `/work/${slug}` },
    // Setting openGraph here drops the inherited image, so name it again.
    openGraph: { type: "article", url: `/work/${slug}`, title, description: meta.summary, images: "/opengraph-image.png" },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const { meta, Content } = await getCaseStudy(slug);

  return (
    <article className="py-12 sm:py-16">
      <Link href="/#work" className="py-2 text-sm text-link hover:underline">
        ← All work
      </Link>
      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
        {meta.role} · {meta.period}
      </p>
      <h1 className="mt-2 text-3xl tracking-tight sm:text-4xl">
        {meta.company}: {meta.title}
      </h1>
      <p className="mt-4 font-mono text-xs text-muted">Stack: {meta.stack.join(", ")}</p>
      <div className="prose mt-10 max-w-none">
        <Content />
      </div>
    </article>
  );
}
