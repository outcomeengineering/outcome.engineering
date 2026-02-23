import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Footer from "@/components/Footer";
import { mdxComponents } from "@/components/mdx";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPostBySlug(slug);

  return {
    title: `${meta.title} — Outcome Engineering`,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      publishedTime: meta.date,
      authors: [meta.author],
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);

  const formattedDate = new Date(meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="grid-background" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <main className="min-h-screen flex flex-col">
        <article className="px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <a
              href="/blog"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-8 inline-block"
            >
              &larr; Blog
            </a>

            <header className="mb-12">
              <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-4">
                {meta.title}
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                {meta.author} &middot; {formattedDate}
              </p>
            </header>

            <div className="prose-blog">
              <MDXRemote source={content} components={mdxComponents} />
            </div>
          </div>
        </article>

        <Footer />
      </main>
    </>
  );
}
