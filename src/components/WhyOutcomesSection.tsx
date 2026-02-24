import OutcomeTreeSVG from "@/components/OutcomeTreeSVG";
import Section from "@/components/Section";

const layers = [
  {
    label: "Roots",
    color: "text-amber-600/80",
    heading: "Goals and understanding",
    description:
      "Below the surface: the business goals, user research, and domain knowledge that inform what to build. These are the inputs to every outcome hypothesis.",
  },
  {
    label: "Trunk",
    color: "text-amber-600/80",
    heading: "The outcome hypothesis",
    description:
      "The interface between product thinking and engineering. Each outcome states a belief about what change the software will produce — and what evidence would confirm it.",
  },
  {
    label: "Canopy",
    color: "text-green-500/80",
    heading: "Validated outcomes",
    description:
      "Above ground: the specs, tests, and lock files that make each outcome visible. Green leaves are validated. Amber means stale. Gray means work is needed.",
  },
];

export default function WhyOutcomesSection() {
  return (
    <Section id="why-outcomes" title="Why outcomes are the right interface" maxWidthClass="max-w-5xl">
      <p className="text-[var(--text-secondary)] leading-relaxed">
        Outcomes bridge the gap between what the product should do and what the code actually does. They are present at
        the moment of every decision — and they are the stable interface for every future agent.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 items-center">
        {/* Tree illustration */}
        <div className="animate-in opacity-0 animation-delay-100">
          <OutcomeTreeSVG className="max-w-[320px] mx-auto lg:mx-0" />
        </div>

        {/* Layer explanations */}
        <div className="space-y-6">
          {layers.map((layer, index) => (
            <div
              key={layer.label}
              className={`animate-in opacity-0 animation-delay-${(index + 1) * 100 + 100}`}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className={`font-mono text-xs uppercase tracking-wider ${layer.color}`}>
                  {layer.label}
                </span>
                <span className="text-[var(--border)] select-none">/</span>
                <h3 className="font-display text-base font-semibold">
                  {layer.heading}
                </h3>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {layer.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
