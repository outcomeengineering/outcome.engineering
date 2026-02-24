import type { StoryStepData } from "@/components/StoryStep";
import TreeFragment, { type TreeLine } from "@/components/TreeFragment";

// ─── Helpers ───

const valid = { label: "\u25CF valid", stateClass: "st-s-valid" };
const stale = { label: "\u25D0 stale", stateClass: "st-s-stale" };
const needs = { label: "\u25CB needs work", stateClass: "st-s-needs" };

function tree(lines: TreeLine[]) {
  return <TreeFragment lines={lines} />;
}

// ─── Principle Steps (3) ───

export const principleSteps: StoryStepData[] = [
  {
    id: "converging",
    heading: "Always be converging",
    quote:
      "Iterate on a durable artifact in small, reviewable steps \u2014 each reversible and repeatable, each reducing uncertainty about what the system should do.",
    body: [
      "Agents will get things wrong. Because every agent starts from the spec \u2014 not the implementation \u2014 mistakes do not compound. Go back one step, try again, and the spec anchors the retry.",
    ],
    visual: tree([
      { chrome: "", name: "spx/", nameClass: "st-product" },
      { chrome: "\u251C\u2500\u2500 ", name: "spx-cli.product.md", nameClass: "st-product" },
      {
        chrome: "\u251C\u2500\u2500 ",
        name: "21-test-harness.enabler/",
        nameClass: "st-enabler",
        status: valid,
        dim: true,
      },
      {
        chrome: "\u251C\u2500\u2500 ",
        name: "32-parse-directory-tree.enabler/",
        nameClass: "st-enabler",
        status: valid,
        dim: true,
      },
      {
        chrome: "\u2514\u2500\u2500 ",
        name: "54-spx-tree-interpretation.outcome/",
        nameClass: "st-outcome",
        status: needs,
      },
      { chrome: "    \u251C\u2500\u2500 ", name: "spx-tree-interpretation.md" },
      { chrome: "    \u251C\u2500\u2500 ", name: "43-status-rollup.outcome/", nameClass: "st-outcome", status: stale },
      {
        chrome: "    \u2514\u2500\u2500 ",
        name: "54-spx-tree-status.outcome/",
        nameClass: "st-outcome",
        status: needs,
      },
    ]),
  },
  {
    id: "determinism",
    heading: "Determinism unless creation is the goal",
    quote: "Never generate what can be derived deterministically.",
    body: [
      "The path from root to node defines what context an agent receives: ancestor specs and lower-index siblings. No keyword search. No embedding lottery.",
      "Curate context rather than letting agents search the codebase. Link traceability explicitly rather than inferring it. Reserve generative capacity for the parts that require it.",
    ],
    visual: tree([
      { chrome: "", name: "spx/", nameClass: "st-product" },
      { chrome: "\u251C\u2500\u2500 ", name: "spx-cli.product.md", nameClass: "st-product" },
      { chrome: "\u251C\u2500\u2500 ", name: "15-cli-framework.adr.md", nameClass: "st-decision" },
      { chrome: "\u251C\u2500\u2500 ", name: "21-test-harness.enabler/", nameClass: "st-enabler", status: valid },
      {
        chrome: "\u251C\u2500\u2500 ",
        name: "32-parse-directory-tree.enabler/",
        nameClass: "st-enabler",
        status: valid,
      },
      {
        chrome: "\u2514\u2500\u2500 ",
        name: "54-spx-tree-interpretation.outcome/",
        nameClass: "st-outcome",
        dim: true,
      },
      { chrome: "    \u2514\u2500\u2500 ", name: "43-status-rollup.outcome/", nameClass: "st-outcome", dim: true },
    ]),
  },
  {
    id: "ask-what-matters",
    heading: "Ask what matters",
    quote: "Expose the maximum-leverage decisions. Let the agent handle the rest.",
    body: [
      "The structure separates intended behavior (spec) from whether that behavior holds (tests + lock file). Humans write the hypothesis and assertions; agents write the tests and implementation.",
    ],
    visual: tree([
      { chrome: "", name: "54-spx-tree-interpretation.outcome/", nameClass: "st-outcome" },
      { chrome: "\u251C\u2500\u2500 ", name: "spx-tree-interpretation.md" },
      { chrome: "\u2502   ", name: "\u2191 human writes hypothesis + assertions", dim: true },
      { chrome: "\u251C\u2500\u2500 ", name: "tests/" },
      { chrome: "\u2502   ", name: "\u2191 agent writes tests + implementation", dim: true },
      { chrome: "\u2514\u2500\u2500 ", name: "spx-lock.yaml" },
      { chrome: "    ", name: "\u2191 system binds spec to evidence", dim: true },
    ]),
  },
];

// ─── Spec Tree Walkthrough Steps (5) ───

export const specTreeSteps: StoryStepData[] = [
  {
    id: "product-node",
    heading: "The product node anchors everything",
    body: [
      "Every Spec Tree starts with a single product file at its root. This file captures what the product is and why it exists \u2014 the value function that every other node must trace back to.",
      "When product learning changes, the spec still contains why it exists. Every outcome has evidence because it traces back to this root.",
    ],
    visual: tree([
      { chrome: "", name: "spx/", nameClass: "st-product" },
      { chrome: "\u251C\u2500\u2500 ", name: "spx-cli.product.md", nameClass: "st-product" },
      { chrome: "\u251C\u2500\u2500 ", name: "15-cli-framework.adr.md", nameClass: "st-decision", dim: true },
      { chrome: "\u251C\u2500\u2500 ", name: "21-test-harness.enabler/", nameClass: "st-enabler", dim: true },
      { chrome: "\u2514\u2500\u2500 ", name: "...", dim: true },
    ]),
  },
  {
    id: "decision-records",
    heading: "Decision records capture choices upfront",
    body: [
      "ADRs and PDRs sit alongside the specs they affect. Architecture decisions (ADR) and product decisions (PDR) are captured before implementation begins.",
      "When an agent needs context, it doesn\u2019t guess \u2014 it reads the decision record on the path from root to its current node. Context is deterministic.",
    ],
    visual: tree([
      { chrome: "", name: "spx/", nameClass: "st-product", dim: true },
      { chrome: "\u251C\u2500\u2500 ", name: "spx-cli.product.md", nameClass: "st-product", dim: true },
      { chrome: "\u251C\u2500\u2500 ", name: "15-cli-framework.adr.md", nameClass: "st-decision" },
      { chrome: "\u251C\u2500\u2500 ", name: "15-tree-structure-contract.pdr.md", nameClass: "st-decision" },
      { chrome: "\u251C\u2500\u2500 ", name: "21-test-harness.enabler/", nameClass: "st-enabler", dim: true },
      { chrome: "\u2514\u2500\u2500 ", name: "...", dim: true },
    ]),
  },
  {
    id: "enablers",
    heading: "Enablers build infrastructure bottom-up",
    body: [
      "Enabler nodes (marked with .enabler) are infrastructure \u2014 shared utilities, parsers, test harnesses. The numeric prefix encodes dependency order: lower numbers are dependencies for higher ones.",
      "Index 21 (test-harness) must be valid before index 32 (parse-directory-tree) can be worked on. The tree encodes this constraint in the filename.",
    ],
    visual: tree([
      { chrome: "", name: "spx/", nameClass: "st-product", dim: true },
      { chrome: "\u251C\u2500\u2500 ", name: "spx-cli.product.md", nameClass: "st-product", dim: true },
      { chrome: "\u251C\u2500\u2500 ", name: "15-cli-framework.adr.md", nameClass: "st-decision", dim: true },
      { chrome: "\u251C\u2500\u2500 ", name: "21-test-harness.enabler/", nameClass: "st-enabler", status: valid },
      {
        chrome: "\u251C\u2500\u2500 ",
        name: "32-parse-directory-tree.enabler/",
        nameClass: "st-enabler",
        status: valid,
      },
      { chrome: "\u251C\u2500\u2500 ", name: "43-node-status.enabler/", nameClass: "st-enabler", status: valid },
      {
        chrome: "\u251C\u2500\u2500 ",
        name: "54-spx-tree-interpretation.outcome/",
        nameClass: "st-outcome",
        dim: true,
      },
      { chrome: "\u2514\u2500\u2500 ", name: "...", dim: true },
    ]),
  },
  {
    id: "outcomes",
    heading: "Outcomes express testable hypotheses",
    body: [
      "Outcome nodes (marked with .outcome) each begin with a belief about what change the software will produce \u2014 an outcome hypothesis with testable assertions.",
      "When a spec changes, its lock file hash breaks. Parent nodes inherit the worst child state. Staleness bubbles up to the root \u2014 nothing hides. Three states \u2014 valid, stale, needs work \u2014 tell you exactly where the product stands.",
    ],
    visual: tree([
      { chrome: "", name: "spx/", nameClass: "st-product", dim: true },
      { chrome: "\u251C\u2500\u2500 ", name: "...", dim: true },
      {
        chrome: "\u251C\u2500\u2500 ",
        name: "54-spx-tree-interpretation.outcome/",
        nameClass: "st-outcome",
        status: stale,
      },
      { chrome: "\u2502   \u251C\u2500\u2500 ", name: "spx-tree-interpretation.md" },
      {
        chrome: "\u2502   \u251C\u2500\u2500 ",
        name: "21-parent-child-links.enabler/",
        nameClass: "st-enabler",
        status: valid,
      },
      {
        chrome: "\u2502   \u251C\u2500\u2500 ",
        name: "43-status-rollup.outcome/",
        nameClass: "st-outcome",
        status: stale,
      },
      {
        chrome: "\u2502   \u2514\u2500\u2500 ",
        name: "54-spx-tree-status.outcome/",
        nameClass: "st-outcome",
        status: needs,
      },
      { chrome: "\u2514\u2500\u2500 ", name: "...", dim: true },
    ]),
  },
  {
    id: "lock-files",
    heading: "Lock files bind specs to evidence",
    body: [
      "Each node can have a spx-lock.yaml that records Git blob hashes for the spec and its tests. When either side changes, the hash breaks and the node is visibly stale \u2014 before anyone runs a test.",
      "This is drift detection: the binding between spec and tests never silently decays.",
    ],
    visual: (
      <div className="story-visual-inner">
        <div className="font-mono text-sm leading-[1.8]">
          <div className="text-[var(--text-muted)] mb-2">## spx-lock.yaml</div>
          <div>
            schema: <span className="text-[rgba(210,220,200,0.8)] font-semibold">spx-lock/v1</span>
          </div>
          <div>
            blob: <span className="text-[var(--accent)]">a3b7c12</span>
          </div>
          <div className="text-[rgba(200,210,190,0.5)]">tests:</div>
          <div className="text-[rgba(200,210,190,0.5)]">
            {"  "}- path: tests/status.unit.test.ts
          </div>
          <div>
            {"    "}blob: <span className="text-[var(--accent)]">9d4e5f2</span>
          </div>
          <div className="mt-2 opacity-30"># When either blob changes,</div>
          <div className="opacity-30">
            # the node becomes <span className="text-[var(--state-stale)] opacity-100">{"\u25D0 stale"}</span>
          </div>
        </div>
      </div>
    ),
  },
];
