import Section from "@/components/Section";

const guidelines = [
  {
    title: "Always be converging",
    quote:
      "Iterate on a durable artifact in small, reviewable steps such that each step is reversible and repeatable, and each reduces uncertainty about what the system should do.",
    explanation:
      "Agents will get things wrong. Because every agent starts from the spec \u2014 not the implementation \u2014 mistakes do not compound: go back one step, try again, and the spec anchors the retry.",
  },
  {
    title: "Determinism unless creation is the goal",
    quote: "Never generate what can be derived deterministically.",
    explanation:
      "Curate context rather than letting agents search the codebase. Link traceability explicitly rather than inferring it. Reserve the generative capacity of agents for the parts that require it.",
  },
  {
    title: "Ask what matters",
    quote: "Expose the maximum leverage decisions, let the agent handle the rest.",
    explanation:
      "The structure separates intended behavior (spec) from whether that behavior holds (tests + lock file). Humans write the hypothesis and assertions; agents write the tests and implementation.",
  },
];

export default function GuidelinesSection() {
  return (
    <Section id="guidelines" title="Guidelines">
      <div className="space-y-8">
        {guidelines.map((guideline, index) => (
          <div
            key={guideline.title}
            className={`animate-in opacity-0 animation-delay-${(index + 1) * 100}`}
          >
            <h3 className="font-display text-base font-semibold mb-3">
              {guideline.title}
            </h3>
            <blockquote className="guideline-quote mb-3">
              {guideline.quote}
            </blockquote>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {guideline.explanation}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
