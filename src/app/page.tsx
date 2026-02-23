import DocCard from "@/components/DocCard";
import Footer from "@/components/Footer";
import Wordmark from "@/components/Wordmark";

const docLinks = [
  {
    title: "Guide",
    description: "From outputs to outcomes. The Spec Tree, deterministic context, and the operational loop.",
    href: "https://docs.outcome.engineering/guide/overview",
  },
  {
    title: "Reference",
    description: "Node types, index numbering, lock files, filesystem conventions, and spx CLI commands.",
    href: "https://docs.outcome.engineering/reference/node-types",
  },
  {
    title: "Blog",
    description: "Growing a Spec Tree for Deterministic Context — the first post on Outcome Engineering.",
    href: "/blog",
  },
  {
    title: "GitHub",
    description: "spx-cli, spx-claude, and this site. All open source under the MIT License.",
    href: "https://github.com/outcomeengineering",
  },
];

export default function Home() {
  return (
    <>
      {/* Background layers */}
      <div className="grid-background" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <main className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <header className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            {/* Wordmark with glow */}
            <div className="animate-in opacity-0 mb-8">
              <Wordmark className="mx-auto" />
            </div>

            {/* Tagline */}
            <p className="animate-in opacity-0 animation-delay-100 text-lg md:text-xl text-[var(--text-secondary)] mb-10 leading-relaxed font-display">
              Spec-driven development for AI agents.
              <br />
              <span className="text-[var(--text-muted)]">
                A git-native product structure with outcome hypotheses, drift detection, and deterministic context.
              </span>
            </p>

            {/* CTAs */}
            <div className="animate-in opacity-0 animation-delay-200 flex flex-wrap justify-center gap-4">
              <a
                href="https://docs.outcome.engineering"
                className="btn-primary"
              >
                Read the docs
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/outcomeengineering/outcome.engineering"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label="View on GitHub (opens in new tab)"
              >
                GitHub
              </a>
            </div>
          </div>
        </header>

        {/* Doc Cards Section */}
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {docLinks.map((doc, index) => (
                <DocCard
                  key={doc.title}
                  title={doc.title}
                  description={doc.description}
                  href={doc.href}
                  className={`animate-in opacity-0 animation-delay-${(index + 3) * 100}`}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
