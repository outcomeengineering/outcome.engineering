import CodeExample from "@/components/CodeExample";
import Section from "@/components/Section";

const statusOutput = `$ spx status --tree 54-spx-tree-interpretation.outcome
54-spx-tree-interpretation.outcome/    needs work (no lock file)
  21-parent-child-links.enabler/       valid
  43-status-rollup.outcome/            stale
    status-rollup.md changed           (was a3b7c12, now 5e9f1d8)
  54-spx-tree-status.outcome/          needs work (no lock file)`;

const lockOutput = `$ spx lock 54-spx-tree-interpretation.outcome/43-status-rollup.outcome
Running tests...
  tests/status.unit.test.ts            3 passed
Lock regenerated: 43-status-rollup.outcome/spx-lock.yaml`;

const verifyOutput = `$ spx verify --tree 54-spx-tree-interpretation.outcome
54-spx-tree-interpretation.outcome/    needs work
  21-parent-child-links.enabler/       valid
  43-status-rollup.outcome/            valid
  54-spx-tree-status.outcome/          needs work`;

const commands = [
  {
    code: statusOutput,
    description:
      "spx status reads the tree and shows node states without running tests. Stale nodes show which file changed and the old vs. new hash.",
  },
  {
    code: lockOutput,
    description:
      "spx lock runs tests and writes the lock file \u2014 only when all pass. If tests fail, the existing lock file stays unchanged.",
  },
  {
    code: verifyOutput,
    description:
      "spx verify compares hashes without running tests \u2014 cheap verification that the lock still holds.",
  },
];

export default function OperationalLoopSection() {
  return (
    <Section id="operational-loop" title="The operational loop">
      <p className="text-[var(--text-secondary)] leading-relaxed">
        Three commands form the core loop: inspect state, lock validated nodes, and verify cheaply.
      </p>
      <div className="space-y-6 mt-2">
        {commands.map((cmd, index) => (
          <div
            key={index}
            className={`animate-in opacity-0 animation-delay-${(index + 1) * 100}`}
          >
            <CodeExample
              code={cmd.code}
              filename="terminal"
              language="text"
            />
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-2">
              {cmd.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
