import OutcomeTreeSVG from "@/components/OutcomeTreeSVG";

export default function HeroSection() {
  return (
    <header className="hero">
      <div className="hero-grid">
        {/* Tree column: SVG tree + annotations */}
        <div className="hero-tree-col">
          <OutcomeTreeSVG variant="full" />
        </div>

        {/* Text column */}
        <div className="hero-text-col">
          <div className="text-xs tracking-[0.2em] uppercase text-[rgba(180,200,150,0.7)] mb-6 font-medium">
            Outcome Engineering
          </div>
          <h1 className="hero-h1 font-display leading-[1.14] text-[#e8f0e0] font-normal mb-4 relative z-10">
            Rooted in <span className="text-[rgba(210,180,110,0.95)]">understanding</span>,
            <br />
            branching toward
            <br />
            <span className="text-[rgba(140,210,100,0.95)] italic">outcomes</span>
          </h1>
          <p className="text-base leading-[1.75] text-[#b8c0a8] mb-8 font-light">
            Start with business goals and customer insight at the roots, express outcome hypotheses as testable specs,
            and let the structure prove what works.
          </p>
          <div className="flex gap-[1.4em] mb-8 border-t border-white/[0.08] pt-5">
            <div className="flex-1">
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#d4b870] mb-1">Roots</div>
              <div className="text-sm leading-[1.5] text-[#a8a89e]">
                Business goals and deep customer understanding form the foundation.
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#b8a078] mb-1">Branches</div>
              <div className="text-sm leading-[1.5] text-[#a8a89e]">
                Outcome hypotheses &mdash; structured, testable paths forward.
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7dba5a] mb-1">Leaves</div>
              <div className="text-sm leading-[1.5] text-[#a8a89e]">
                Thriving outcomes that prove the structure works.
              </div>
            </div>
          </div>
          <a
            href="https://github.com/outcomeengineering"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[0.6em] px-7 py-3 border border-[rgba(180,200,150,0.25)] text-[#d0e0c0] text-sm tracking-[0.05em] no-underline rounded-sm transition-all hover:bg-[rgba(180,200,150,0.07)] hover:border-[rgba(180,200,150,0.45)]"
          >
            View on GitHub &rarr;
          </a>
        </div>
      </div>
    </header>
  );
}
