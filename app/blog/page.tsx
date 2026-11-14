import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts } from "@/lib/blog";

const description = "Notes on React Native, payments and building financial products.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", url: "/blog", title: "Blog", description, images: "/opengraph-image" },
};

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <section className="py-12 sm:py-16">
      <h1 className="text-3xl tracking-tight sm:text-4xl">Blog</h1>
      {posts.length === 0 && <p className="mt-6 text-muted">No posts yet.</p>}
      <ul className="mt-10">
        {posts.map(({ slug, meta }) => (
          <li key={slug} className="border-t border-line py-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            </p>
            <h2 className="mt-2 text-xl">
              <Link href={`/blog/${slug}`} className="hover:text-link hover:underline">
                {meta.title}
              </Link>
            </h2>
            <p className="mt-2 leading-relaxed text-muted">{meta.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
