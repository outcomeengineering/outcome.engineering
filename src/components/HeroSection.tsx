"use client";

import HeroSpecTree from "@/components/HeroSpecTree";
import OutcomeTreeSVG from "@/components/OutcomeTreeSVG";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

function useAnimationTargets() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const treeColRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const [targets, setTargets] = useState({ liftPx: 0, expandPx: 0 });

  const compute = useCallback(() => {
    const h1 = h1Ref.current;
    const treeCol = treeColRef.current;
    const textCol = textColRef.current;
    if (!h1 || !treeCol || !textCol) return;

    const h1Rect = h1.getBoundingClientRect();
    const treeRect = treeCol.getBoundingClientRect();
    const targetY = treeRect.top + treeRect.height * 0.05;
    const liftPx = targetY - h1Rect.top;

    const textPadLeft = parseFloat(getComputedStyle(textCol).paddingLeft);
    const expandPx = treeRect.width + textPadLeft;

    setTargets({ liftPx, expandPx });
  }, []);

  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(compute);
    });

    const observer = new ResizeObserver(compute);
    if (h1Ref.current) observer.observe(h1Ref.current);
    if (treeColRef.current) observer.observe(treeColRef.current);

    return () => {
      cancelAnimationFrame(raf1);
      observer.disconnect();
    };
  }, [compute]);

  return { h1Ref, treeColRef, textColRef, targets };
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { h1Ref, treeColRef, textColRef, targets } = useAnimationTargets();

  // Map 0-0.85 scroll range to 0-1 transition progress
  const t = useTransform(scrollYProgress, [0, 0.85], [0, 1], { clamp: true });

  // Animated values
  const textFade = useTransform(t, [0, 1], [1, 0]);
  const annotationFade = useTransform(t, [0, 1], [1, 0]);
  const specTreeY = useTransform(t, (v) => `${(1 - v) * 100}vh`);
  const groundFade = useTransform(t, [0, 1], [0, 1]);
  const scrollHintFade = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // H1 expansion and text panel lift (depend on measured DOM values)
  const textLiftY = useTransform(t, (v) => v * targets.liftPx);
  const h1MarginLeft = useTransform(t, (v) => v * -targets.expandPx);
  const h1Width = useTransform(t, (v) => `calc(100% + ${v * targets.expandPx}px)`);

  return (
    <header ref={containerRef} className="hero-scroll-container">
      <div className="hero-sticky">
        <div className="hero-grid">
          {/* Left column: SVG tree + annotations */}
          <div ref={treeColRef} className="hero-tree-col">
            <OutcomeTreeSVG variant="full" />
            <motion.div className="hero-annotation hero-ann-leaves" style={{ opacity: annotationFade }}>
              Thriving Outcomes
            </motion.div>
            <motion.div className="hero-annotation hero-ann-branches" style={{ opacity: annotationFade }}>
              Outcome Hypotheses
            </motion.div>
            <motion.div className="hero-annotation hero-ann-roots" style={{ opacity: annotationFade }}>
              Goals &amp; Understanding
            </motion.div>
          </div>

          {/* Right column: Narrative text */}
          <motion.div ref={textColRef} className="hero-text-col" style={{ y: textLiftY }}>
            <motion.div
              className="text-xs tracking-[0.2em] uppercase text-[rgba(180,200,150,0.7)] mb-6 font-medium"
              style={{ opacity: textFade }}
            >
              Outcome Engineering
            </motion.div>
            <motion.h1
              ref={h1Ref}
              className="hero-h1 font-display text-[1.75rem] md:text-[3.2rem] leading-[1.14] text-[#e8f0e0] font-normal mb-4 relative z-10"
              style={{ marginLeft: h1MarginLeft, width: h1Width }}
            >
              Rooted in <span className="text-[rgba(210,180,110,0.95)]">understanding</span>,
              <br />
              branching toward
              <br />
              <span className="text-[rgba(140,210,100,0.95)] italic">outcomes</span>
            </motion.h1>
            <motion.div style={{ opacity: textFade }}>
              <p className="text-base leading-[1.75] text-[#b8c0a8] mb-8 font-light">
                Start with business goals and customer insight at the roots, express outcome hypotheses as testable
                specs, and let the structure prove what works.
              </p>
              <div className="flex gap-[1.4em] mb-8 border-t border-white/[0.08] pt-5">
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#d4b870] mb-1">
                    Roots
                  </div>
                  <div className="text-sm leading-[1.5] text-[#a8a89e]">
                    Business goals and deep customer understanding form the foundation.
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#b8a078] mb-1">
                    Branches
                  </div>
                  <div className="text-sm leading-[1.5] text-[#a8a89e]">
                    Outcome hypotheses &mdash; structured, testable paths forward.
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7dba5a] mb-1">
                    Leaves
                  </div>
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
            </motion.div>
          </motion.div>

          {/* Ground line — inside grid so z-index is comparable with overlay */}
          <motion.div className="hero-ground-line" style={{ opacity: groundFade }}>
            <span>Outcome Hypothesis</span>
          </motion.div>

          {/* Spec tree overlay: slides up from bottom */}
          <motion.div className="hero-spec-overlay" style={{ y: specTreeY }}>
            <HeroSpecTree />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div className="hero-scroll-hint" style={{ opacity: scrollHintFade }}>
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>
    </header>
  );
}
