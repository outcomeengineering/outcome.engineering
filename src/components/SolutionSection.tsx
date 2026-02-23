import CodeExample from "@/components/CodeExample";
import Section from "@/components/Section";

const innovations = [
  {
    title: "Outcome hypothesis as organizing principle",
    description:
      "Every node begins with a belief about what change it will produce \u2014 making value explicit and keeping it in the artifact that gets changed. When product learning changes, the spec still contains why it exists.",
  },
  {
    title: "Drift detection via lock file",
    description:
      "Git blob hashes bind spec content to test evidence. When either side changes, the hash breaks and the node is visibly stale \u2014 before anyone runs a test.",
  },
  {
    title: "Deterministic context from tree structure",
    description:
      "The path from root to node defines what context an agent receives \u2014 lower-index siblings at each directory along the path, plus ancestor specs. This replaces heuristic context selection.",
  },
];

const treeStructureCode = `spx/
\u251C\u2500\u2500 spx-cli.product.md
\u251C\u2500\u2500 15-tree-structure-contract.pdr.md
\u251C\u2500\u2500 21-test-harness.enabler/
\u2502   \u251C\u2500\u2500 test-harness.md
\u2502   \u2514\u2500\u2500 tests/
\u251C\u2500\u2500 32-parse-directory-tree.enabler/
\u2502   \u251C\u2500\u2500 parse-directory-tree.md
\u2502   \u2514\u2500\u2500 tests/
\u251C\u2500\u2500 43-node-status.enabler/
\u2502   \u251C\u2500\u2500 node-status.md
\u2502   \u2514\u2500\u2500 tests/
\u251C\u2500\u2500 54-spx-tree-interpretation.outcome/
\u2502   \u251C\u2500\u2500 spx-tree-interpretation.md
\u2502   \u251C\u2500\u2500 43-status-rollup.outcome/
\u2502   \u2514\u2500\u2500 tests/
\u2514\u2500\u2500 76-cli-integration.outcome/
    \u251C\u2500\u2500 cli-integration.md
    \u2514\u2500\u2500 tests/`;

const specCode = `## Outcome

We believe that aggregating child node states into a
parent status will let developers identify stale subtrees
without inspecting each node individually.

### Assertions

- A parent with all valid children reports valid
  ([test](tests/status.unit.test.ts))
- A parent with any stale child reports stale
  ([test](tests/status.unit.test.ts))
- A parent with any needs-work child needs work
  ([test](tests/status.unit.test.ts))`;

const lockFileCode = `schema: spx-lock/v1
blob: a3b7c12
tests:
  - path: tests/status.unit.test.ts
    blob: 9d4e5f2`;

export default function SolutionSection() {
  return (
    <Section id="solution" title="The Spec Tree">
      <p className="text-[var(--text-secondary)] leading-relaxed">
        A git-native product structure that combines three independently valuable mechanisms.
      </p>

      <div className="space-y-6 mt-2">
        {innovations.map((item, index) => (
          <div
            key={item.title}
            className={`animate-in opacity-0 animation-delay-${(index + 1) * 100}`}
          >
            <h3 className="font-display text-base font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <CodeExample
          code={treeStructureCode}
          filename="spx/ directory"
          language="text"
        />
        <div className="space-y-4">
          <CodeExample
            code={specCode}
            filename="status-rollup.md"
            language="markdown"
          />
          <CodeExample
            code={lockFileCode}
            filename="spx-lock.yaml"
            language="yaml"
          />
        </div>
      </div>
    </Section>
  );
}
