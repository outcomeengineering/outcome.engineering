import CodeExample from "@/components/CodeExample";
import Section from "@/components/Section";

const contextTree = `spx/
  spx-cli.product.md                          <-- included
  15-tree-structure-contract.pdr.md            <-- included
  15-cli-framework.adr.md                      <-- included
  15-randomized-test-generation.adr.md         <-- included
  21-test-harness.enabler/
    test-harness.md                            <-- included
  32-parse-directory-tree.enabler/
    parse-directory-tree.md                    <-- included
  43-node-status.enabler/
    node-status.md                             <-- included
  54-spx-tree-interpretation.outcome/
    spx-tree-interpretation.md                 <-- included (ancestor)
    21-parent-child-links.enabler/
      parent-child-links.md                    <-- included
    43-status-rollup.outcome/                  [TARGET]
      status-rollup.md                         <-- included
      tests/                                   -- not included
    54-spx-tree-status.outcome/                -- not included
  76-cli-integration.outcome/                  -- not included
  87-e2e-workflow.outcome/                     -- not included`;

export default function ContextInjectionSection() {
  return (
    <Section id="context-injection" title="Deterministic context injection" maxWidthClass="max-w-5xl">
      <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
        <p>
          The <code className="font-mono text-[var(--accent)]">spx</code>{" "}
          CLI walks the tree from the product level down to the target node and applies one structural rule: at each
          directory along the path, inject all lower-index siblings&rsquo; specs. Ancestor specs along the path are
          always included. Test files are excluded.
        </p>
      </div>

      <div className="mt-2">
        <CodeExample
          code={contextTree}
          filename="context for 43-status-rollup.outcome"
          language="text"
        />
      </div>

      <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed mt-4">
        <p>
          The agent sees exactly the context the tree provides. It doesn&rsquo;t search the codebase for &ldquo;prior
          art&rdquo;; the tree provides the authoritative context deterministically.
        </p>
        <p>
          If the deterministic context payload for a single node routinely exceeds an agent&rsquo;s reliable working
          set, the tree is telling you the component is doing too much. The structure forces architectural boundaries.
        </p>
      </div>
    </Section>
  );
}
