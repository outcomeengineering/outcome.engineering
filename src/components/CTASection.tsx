export default function CTASection() {
  return (
    <section
      id="cta"
      className="px-6 py-16 md:py-24"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          id="cta-heading"
          className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-4"
        >
          Build with outcomes, not just features
        </h2>
        <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
          The Spec Tree is open source. Read the methodology, explore the CLI, or try it in your next project.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://docs.outcome.engineering" className="btn-primary">
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
            href="https://github.com/outcomeengineering"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            aria-label="View on GitHub (opens in new tab)"
          >
            View on GitHub
          </a>
          <a
            href="https://github.com/outcomeengineering/spx-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            aria-label="Try spx CLI (opens in new tab)"
          >
            Try spx
          </a>
        </div>
      </div>
    </section>
  );
}
