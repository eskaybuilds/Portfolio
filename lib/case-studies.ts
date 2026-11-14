import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { ComponentType } from "react";

export type CaseStudyMeta = {
  company: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  stack: string[];
  order: number; // position on the home page, lowest first
};

const required = ["company", "title", "summary", "role", "period", "stack", "order"] as const;

export function caseStudySlugs(): string[] {
  return readdirSync(join(process.cwd(), "content/case-studies"))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getCaseStudy(slug: string) {
  const mod = (await import(`@/content/case-studies/${slug}.mdx`)) as {
    default: ComponentType;
    meta?: Partial<CaseStudyMeta>;
  };
  // Fail the build, not the page, when a content file is incomplete.
  for (const key of required) {
    if (mod.meta?.[key] === undefined) {
      throw new Error(`content/case-studies/${slug}.mdx: meta.${key} is missing`);
    }
  }
  return { slug, meta: mod.meta as CaseStudyMeta, Content: mod.default };
}

export async function getCaseStudies() {
  const all = await Promise.all(caseStudySlugs().map(getCaseStudy));
  return all.sort((a, b) => a.meta.order - b.meta.order);
}
