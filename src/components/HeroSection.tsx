import Wordmark from "@/components/Wordmark";

export default function HeroSection() {
  return (
    <header className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 relative">
      <div className="text-center max-w-2xl mx-auto">
        {/* Wordmark with glow */}
        <div className="animate-in opacity-0 mb-8">
          <Wordmark className="mx-auto" />
        </div>

        {/* Tagline */}
        <p className="animate-in opacity-0 animation-delay-100 text-lg md:text-xl text-[var(--text-secondary)] mb-4 leading-relaxed font-display">
          Spec-driven development for AI agents.
        </p>

        {/* Subtitle */}
        <p className="animate-in opacity-0 animation-delay-200 text-sm md:text-base text-[var(--text-muted)] mb-10 leading-relaxed">
          A git-native product structure with outcome hypotheses, drift detection, and deterministic context.
        </p>

        {/* CTAs */}
        <div className="animate-in opacity-0 animation-delay-300 flex flex-wrap justify-center gap-4">
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
            GitHub
          </a>
        </div>
      </div>

      {/* Placeholder for future 3D Spec Tree canvas (Phase 5) */}
      <div id="tree-canvas-anchor" aria-hidden="true" />
    </header>
  );
}
