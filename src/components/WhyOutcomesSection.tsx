import Section from "@/components/Section";

export default function WhyOutcomesSection() {
  return (
    <Section id="why-outcomes" title="Why outcomes are the right interface" maxWidthClass="max-w-5xl">
      <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
        <p className="text-[var(--foreground)] font-semibold">
          Specs are not for planning. The spec is the product&rsquo;s source of truth &mdash; what users should be able
          to do, expressed as testable assertions.
        </p>
        <p>
          Every spec begins with an outcome hypothesis: the reason this node exists, expressed as a belief about what
          change it will produce. Assertions define what must be true about the output for the hypothesis to become
          verifiable. There is no outcome without an output.
        </p>
        <p>
          Product managers and UX researchers already have the material &mdash; business goals, customer research,
          validated needs. But it lives in their tools, not where engineers and agents actually work. The outcome
          hypothesis bridges that gap. It translates what PM and UX know into a form that lives alongside the work
          &mdash; where every person and every agent encounters it at the moment of decision.
        </p>
        <p>
          This isn&rsquo;t optimized for any one agent or any one generation of AI tooling. The outcome hypothesis is a
          stable interface for human intent that will only become more valuable as agents get better at working with it.
        </p>
      </div>
    </Section>
  );
}
