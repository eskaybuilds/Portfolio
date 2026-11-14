import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPost, getPosts } from "@/lib/blog";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  // A static export needs at least one page here, so the unlinked draft template stands in until a post exists.
  return posts.length > 0 ? posts.map(({ slug }) => ({ slug })) : [{ slug: "example" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getPost(slug);
  return {
    title: meta.title,
    description: meta.summary,
    robots: meta.draft ? { index: false } : undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${slug}`,
      title: meta.title,
      description: meta.summary,
      publishedTime: meta.date,
      images: "/opengraph-image.png",
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const { meta, Content } = await getPost(slug);

  return (
    <article className="py-12 sm:py-16">
      <Link href="/blog" className="py-2 text-sm text-link hover:underline">
        ← All posts
      </Link>
      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
        <time dateTime={meta.date}>{formatDate(meta.date)}</time>
      </p>
      <h1 className="mt-2 text-3xl tracking-tight sm:text-4xl">{meta.title}</h1>
      <div className="prose mt-10 max-w-none">
        <Content />
      </div>
    </article>
  );
}
