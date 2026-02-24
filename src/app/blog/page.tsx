import DocCard from "@/components/DocCard";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Outcome Engineering",
  description: "Articles on spec-driven development, the Spec Tree, and building software with AI agents.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <div className="grid-background" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <main className="min-h-screen flex flex-col">
        <div className="px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-8 inline-block"
            >
              &larr; Home
            </Link>

            <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-4">
              Blog
            </h1>
            <p className="text-[var(--text-muted)] mb-10 leading-relaxed">
              Articles on the Spec Tree methodology, deterministic context, and building software with AI agents.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {posts.map((post) => (
                <DocCard
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  href={`/blog/${post.slug}`}
                />
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
