import Section from "@/components/Section";

const changes = [
  {
    title: "Goals have evidence",
    description:
      "Every assertion either has a passing test bound by a current lock file, or it doesn\u2019t. You always know which goals have evidence behind them and which don\u2019t.",
  },
  {
    title: "Change propagates",
    description:
      "Edit a spec and every lock file in its subtree becomes stale \u2014 the structure shows you the blast radius before you run a single test.",
  },
  {
    title: "Consistent context",
    description:
      "Agents work from the same context every time \u2014 no drift between runs. The path from root to node defines what the agent sees, not what a keyword search happens to return.",
  },
  {
    title: "Staleness is visible",
    description:
      "When the evidence is stale, you see it before anything breaks \u2014 not after. A mismatch between the lock file and the current state does not mean behavior changed \u2014 it means the evidence needs refreshing.",
  },
];

export default function WhatChangesSection() {
  return (
    <Section id="what-changes" title="What changes in practice">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {changes.map((change, index) => (
          <div
            key={change.title}
            className={`card-glass p-6 animate-in opacity-0 animation-delay-${(index + 1) * 100}`}
          >
            <h3 className="font-display text-lg font-semibold mb-3 text-[var(--accent)]">
              {change.title}
            </h3>
            <p className="text-[var(--text-muted)] leading-relaxed">
              {change.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
