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
    <Section id="problem" title="What goes wrong with AI coding agents">
      <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
        <p>
          AI coding agents generate code so fast that anyone can ship features in minutes. The challenge is staying in
          control as the codebase grows. Plans help, but they are ephemeral &mdash; the next session starts from scratch
          and the plan is just as much a gamble as the code it was supposed to guide.
        </p>
        <p>
          Spec-driven development makes instructions persistent, but progress is still defined as the sum of completed
          tasks. Over dozens of tasks, dead code accumulates because nobody can tie the resulting code fragments back to
          a purpose a human could understand.
        </p>
        <p className="text-[var(--foreground)] font-semibold">
          Both planning and spec-driven development organise work around tasks &mdash; and tasks are the wrong unit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
