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
              className="text-[0.68rem] tracking-[0.2em] uppercase text-[rgba(180,200,150,0.45)] mb-6 font-medium"
              style={{ opacity: textFade }}
            >
              Outcome Engineering
            </motion.div>
            <motion.h1
              ref={h1Ref}
              className="hero-h1 font-display text-[1.75rem] md:text-[3.2rem] leading-[1.14] text-[#e8f0e0] font-normal mb-4 relative z-10"
              style={{ marginLeft: h1MarginLeft, width: h1Width }}
            >
              Rooted in <span className="text-[rgba(210,180,110,0.9)]">understanding</span>,
              <br />
              branching toward
              <br />
              <span className="text-[rgba(140,210,100,0.9)] italic">outcomes</span>
            </motion.h1>
            <motion.div style={{ opacity: textFade }}>
              <p className="text-[0.95rem] leading-[1.75] text-[rgba(190,200,175,0.45)] mb-8 font-light">
                We start beneath the surface &mdash; with your business goals and customer insight &mdash; then engineer
                outcome hypotheses that grow into measurable, thriving results.
              </p>
              <div className="flex gap-[1.4em] mb-8 border-t border-white/[0.06] pt-5">
                <div className="flex-1">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[rgba(210,180,110,0.8)] mb-1">
                    Roots
                  </div>
                  <div className="text-[0.72rem] leading-[1.5] text-[rgba(200,200,190,0.35)]">
                    Business goals and deep customer understanding form the foundation.
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[rgba(170,150,120,0.7)] mb-1">
                    Branches
                  </div>
                  <div className="text-[0.72rem] leading-[1.5] text-[rgba(200,200,190,0.35)]">
                    Outcome hypotheses &mdash; structured, testable paths forward.
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[rgba(120,185,90,0.8)] mb-1">
                    Leaves
                  </div>
                  <div className="text-[0.72rem] leading-[1.5] text-[rgba(200,200,190,0.35)]">
                    Thriving outcomes that prove the structure works.
                  </div>
                </div>
              </div>
              <a
                href="https://docs.outcome.engineering"
                className="inline-flex items-center gap-[0.6em] px-7 py-3 border border-[rgba(180,200,150,0.18)] text-[rgba(210,230,190,0.75)] text-[0.82rem] tracking-[0.05em] no-underline rounded-sm transition-all hover:bg-[rgba(180,200,150,0.07)] hover:border-[rgba(180,200,150,0.35)]"
              >
                Read the methodology &rarr;
              </a>
            </motion.div>
          </motion.div>

          {/* Spec tree overlay: slides up from bottom */}
          <motion.div className="hero-spec-overlay" style={{ y: specTreeY }}>
            <HeroSpecTree />
          </motion.div>
        </div>

        {/* Ground line */}
        <motion.div className="hero-ground-line" style={{ opacity: groundFade }}>
          <span>Outcome Hypothesis</span>
        </motion.div>

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
