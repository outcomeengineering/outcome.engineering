"use client";

import { flattenTree, specTreeDataSimplified } from "@/lib/spec-tree-data";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import PhaseCaption from "./PhaseCaption";
import SpecTreeSVG from "./SpecTreeSVG";

const allNodes = flattenTree(specTreeDataSimplified);

function getNodesByType(type: string) {
  return allNodes.filter((n) => n.type === type);
}

const decisionNodes = getNodesByType("decision");
const enablerNodes = getNodesByType("enabler");
const productNodes = getNodesByType("product");

interface Phase {
  threshold: number;
  nodeIds: string[];
  caption: string | null;
  showLockFiles: boolean;
  highlightPathId: string | null;
  interactive: boolean;
}

const phases: Phase[] = [
  {
    threshold: 0.15,
    nodeIds: productNodes.map((n) => n.id),
    caption: "The product node anchors the tree",
    showLockFiles: false,
    highlightPathId: null,
    interactive: false,
  },
  {
    threshold: 0.3,
    nodeIds: [
      ...productNodes.map((n) => n.id),
      ...decisionNodes.map((n) => n.id),
    ],
    caption: "Decision records capture choices upfront",
    showLockFiles: false,
    highlightPathId: null,
    interactive: false,
  },
  {
    threshold: 0.45,
    nodeIds: [
      ...productNodes.map((n) => n.id),
      ...decisionNodes.map((n) => n.id),
      ...enablerNodes.map((n) => n.id),
    ],
    caption: "Enablers build infrastructure bottom-up",
    showLockFiles: false,
    highlightPathId: null,
    interactive: false,
  },
  {
    threshold: 0.6,
    nodeIds: allNodes.map((n) => n.id),
    caption: "Outcomes express testable hypotheses",
    showLockFiles: false,
    highlightPathId: null,
    interactive: false,
  },
  {
    threshold: 0.75,
    nodeIds: allNodes.map((n) => n.id),
    caption: "Lock files bind specs to test evidence",
    showLockFiles: true,
    highlightPathId: null,
    interactive: false,
  },
  {
    threshold: 0.85,
    nodeIds: allNodes.map((n) => n.id),
    caption: "The context path: deterministic, not heuristic",
    showLockFiles: true,
    highlightPathId: "status-rollup",
    interactive: false,
  },
  {
    threshold: 1.0,
    nodeIds: allNodes.map((n) => n.id),
    caption: "Click any node to see its context",
    showLockFiles: true,
    highlightPathId: null,
    interactive: true,
  },
];

function useCurrentPhase(progress: number): Phase {
  if (progress < 0.05) {
    return {
      threshold: 0,
      nodeIds: [],
      caption: null,
      showLockFiles: false,
      highlightPathId: null,
      interactive: false,
    };
  }
  for (let i = phases.length - 1; i >= 0; i--) {
    if (i === 0) return phases[0];
    if (progress >= phases[i - 1].threshold) return phases[i];
  }
  return phases[0];
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "var(--state-valid)" }}
        />
        <span className="text-[var(--text-muted)]">Valid</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "var(--state-stale)" }}
        />
        <span className="text-[var(--text-muted)]">Stale</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "var(--state-needs-work)" }}
        />
        <span className="text-[var(--text-muted)]">Needs work</span>
      </div>
      <div className="flex items-center gap-2 border-l border-[var(--border)] pl-4">
        <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
        <span className="text-[var(--text-muted)]">Product</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[var(--state-valid)]" />
        <span className="text-[var(--text-muted)]">Enabler</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-sm bg-[var(--state-valid)]" />
        <span className="text-[var(--text-muted)]">Outcome</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 bg-[var(--text-muted)]"
          style={{
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
        />
        <span className="text-[var(--text-muted)]">Decision</span>
      </div>
    </div>
  );
}

function ScrollContent({ progress }: { progress: number }) {
  const phase = useCurrentPhase(progress);
  const visibleNodeIds = useMemo(
    () => new Set(phase.nodeIds),
    [phase.nodeIds],
  );

  return (
    <>
      <SpecTreeSVG
        visibleNodeIds={visibleNodeIds}
        showLockFiles={phase.showLockFiles}
        highlightPathId={phase.highlightPathId}
        interactive={phase.interactive}
      />
      <PhaseCaption caption={phase.caption} />
    </>
  );
}

function ScrollContentWrapper({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [currentProgress, setCurrentProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", setCurrentProgress);

  return <ScrollContent progress={currentProgress} />;
}

export default function SpecTreeScrollContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="spec-tree-viz" aria-labelledby="spec-tree-viz-heading">
      <div ref={containerRef} className="spec-tree-scroll-container">
        <div className="spec-tree-sticky-inner">
          <div className="w-full max-w-5xl mx-auto px-6 flex flex-col gap-3">
            <h2
              id="spec-tree-viz-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              A tree in practice
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
              The spx-cli Spec Tree. Each node co-locates a spec, its tests, and a lock file. Scroll to watch it build.
            </p>
            <Legend />
            <div className="spec-tree-svg-wrapper">
              <ScrollContentWrapper containerRef={containerRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
