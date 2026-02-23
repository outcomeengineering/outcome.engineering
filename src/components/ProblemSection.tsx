import Section from "@/components/Section";

const failureModes = [
  {
    title: "Value drift",
    description:
      "When the spec captures only what to build, the product is defined by \"what we did\" rather than \"what it is.\" Dead code accumulates because nobody can tie it back to a purpose. Change requests look arbitrary because the value function isn\u2019t in the artifact being changed.",
  },
  {
    title: "Heuristic context",
    description:
      "Context selection in most agentic workflows is heuristic: grepping for keywords, embedding similarity, tool defaults. As the repo grows, the selection is hard to review and unstable from one run to the next.",
  },
  {
    title: "Spec\u2013test drift",
    description:
      "Even with specs and tests in the repo, the binding between them decays with every change. A spec evolves, tests still pass for the old behavior, and the repo no longer contains a reviewable signal of what is currently believed to be true.",
  },
];

export default function ProblemSection() {
  return (
    <Section id="problem" title="Three failure modes of agentic development">
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
