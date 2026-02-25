import CodeExample from "@/components/CodeExample";
import Section from "@/components/Section";

const specContent = `## Outcome

We believe that aggregating child node states into a parent status
will let developers identify stale subtrees without inspecting
each node individually.

### Assertions

- A parent with all valid children reports valid
  ([test](tests/status.unit.test.ts))
- A parent with any stale child reports stale
  ([test](tests/status.unit.test.ts))
- A parent with any needs-work child needs work
  ([test](tests/status.unit.test.ts))`;

const lockContent = `schema: spx-lock/v1
blob: a3b7c12
tests:
  - path: tests/status.unit.test.ts
    blob: 9d4e5f2`;

export default function NodeAnatomySection() {
  return (
    <Section id="node-anatomy" title="What a node looks like" maxWidthClass="max-w-5xl">
      <p className="text-[var(--text-secondary)] leading-relaxed">
        Every assertion links to the test file meant to prove it. The human writes the hypothesis and its assertions;
        the agent writes the tests and implementation to prove them.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        <div>
          <CodeExample code={specContent} filename="status-rollup.md" language="markdown" />
        </div>
        <div className="space-y-4">
          <CodeExample code={lockContent} filename="spx-lock.yaml" language="yaml" />
          <p className="text-[var(--text-muted)] leading-relaxed">
            Every <code className="text-[var(--accent)]">blob</code>{" "}
            is a Git blob hash. The lock file records that the spec and its tests were in agreement at the time of
            writing &mdash; not that they still are.
          </p>
          <p className="text-[var(--text-muted)] leading-relaxed">
            Edit the spec and its blob hash changes. The node is visibly stale &mdash; before anyone runs a test.
          </p>
        </div>
      </div>
    </Section>
  );
}
