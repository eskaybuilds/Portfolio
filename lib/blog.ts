import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { ComponentType } from "react";

export type PostMeta = {
  title: string;
  summary: string;
  date: string; // ISO, e.g. "2027-01-31"
  draft?: boolean; // drafts are never listed or built
};

const dir = join(process.cwd(), "content/blog");

function postSlugs(): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPost(slug: string) {
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as {
    default: ComponentType;
    meta?: Partial<PostMeta>;
  };
  const { title, summary, date, draft } = mod.meta ?? {};
  // Fail the build, not the page, when a post is incomplete.
  if (!title || !summary || !date || Number.isNaN(Date.parse(date))) {
    throw new Error(`content/blog/${slug}.mdx: meta needs title, summary and an ISO date`);
  }
  return { slug, meta: { title, summary, date, draft }, Content: mod.default };
}

export async function getPosts() {
  const all = await Promise.all(postSlugs().map(getPost));
  return all
    .filter((post) => !post.meta.draft)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
