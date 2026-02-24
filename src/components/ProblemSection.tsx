import Section from "@/components/Section";

const failureModes = [
  {
    title: "Goal drifts out of sight",
    description:
      "Specs capture what to build, but not why it exists. Over time, the product is defined by what was built rather than what it should be. Dead code accumulates because nobody can tie it back to a purpose.",
  },
  {
    title: "Agents imitate whatever they find",
    description:
      "Context selection is heuristic: grepping for keywords, embedding similarity, tool defaults. As the repo grows, agents pick up patterns without knowing which ones are current or correct.",
  },
  {
    title: "Instructions decay silently",
    description:
      "Specs evolve, but tests still pass for old behavior. The binding between what you intended and what the code does erodes with every change — and nothing signals the gap.",
  },
];

export default function ProblemSection() {
  return (
    <Section id="problem" title="Three things quietly go wrong">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {failureModes.map((mode, index) => (
          <div
            key={mode.title}
            className={`card-glass p-6 animate-in opacity-0 animation-delay-${(index + 1) * 100}`}
          >
            <h3 className="font-display text-lg font-semibold mb-3 text-[var(--accent)]">
              {mode.title}
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {mode.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
