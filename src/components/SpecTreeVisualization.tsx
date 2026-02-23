import Section from "@/components/Section";

type NodeState = "valid" | "stale" | "needs-work";
type NodeType = "product" | "enabler" | "outcome" | "decision";

interface TreeNode {
  name: string;
  type: NodeType;
  state: NodeState;
  children?: TreeNode[];
}

const specTree: TreeNode = {
  name: "spx-cli.product.md",
  type: "product",
  state: "valid",
  children: [
    {
      name: "15-tree-structure-contract.pdr.md",
      type: "decision",
      state: "valid",
    },
    { name: "15-cli-framework.adr.md", type: "decision", state: "valid" },
    {
      name: "15-randomized-test-generation.adr.md",
      type: "decision",
      state: "valid",
    },
    {
      name: "21-test-harness.enabler/",
      type: "enabler",
      state: "valid",
    },
    {
      name: "22-e2e-harness.enabler/",
      type: "enabler",
      state: "valid",
    },
    {
      name: "32-parse-directory-tree.enabler/",
      type: "enabler",
      state: "valid",
      children: [
        {
          name: "21-spx-lock-state.enabler/",
          type: "enabler",
          state: "valid",
        },
        {
          name: "21-test-link-state.enabler/",
          type: "enabler",
          state: "valid",
        },
      ],
    },
    {
      name: "43-node-status.enabler/",
      type: "enabler",
      state: "valid",
      children: [
        {
          name: "32-node-state-machine.enabler/",
          type: "enabler",
          state: "valid",
        },
      ],
    },
    {
      name: "54-spx-tree-interpretation.outcome/",
      type: "outcome",
      state: "needs-work",
      children: [
        {
          name: "21-parent-child-links.enabler/",
          type: "enabler",
          state: "valid",
        },
        {
          name: "43-status-rollup.outcome/",
          type: "outcome",
          state: "stale",
        },
        {
          name: "54-spx-tree-status.outcome/",
          type: "outcome",
          state: "needs-work",
        },
      ],
    },
    {
      name: "76-cli-integration.outcome/",
      type: "outcome",
      state: "valid",
    },
    {
      name: "87-e2e-workflow.outcome/",
      type: "outcome",
      state: "valid",
      children: [
        {
          name: "43-e2e-validation.outcome/",
          type: "outcome",
          state: "valid",
        },
      ],
    },
  ],
};

function nodeTypeClass(type: NodeType): string {
  switch (type) {
    case "product":
      return "node-product";
    case "enabler":
      return "node-enabler";
    case "outcome":
      return "node-outcome";
    case "decision":
      return "node-decision";
  }
}

function nodeStateClass(state: NodeState): string {
  switch (state) {
    case "valid":
      return "node-state-valid";
    case "stale":
      return "node-state-stale";
    case "needs-work":
      return "node-state-needs-work";
  }
}

function stateLabel(state: NodeState): string {
  switch (state) {
    case "valid":
      return "valid";
    case "stale":
      return "stale";
    case "needs-work":
      return "needs work";
  }
}

function stateColor(state: NodeState): string {
  switch (state) {
    case "valid":
      return "var(--state-valid)";
    case "stale":
      return "var(--state-stale)";
    case "needs-work":
      return "var(--state-needs-work)";
  }
}

function TreeNodeRow({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  return (
    <div>
      <div
        className={`tree-node ${nodeTypeClass(node.type)} ${nodeStateClass(node.state)}`}
        style={{ paddingLeft: `${depth * 1.5}rem` }}
      >
        <span className="text-[var(--foreground)]">{node.name}</span>
        <span className="text-xs ml-auto" style={{ color: stateColor(node.state) }}>
          {stateLabel(node.state)}
        </span>
      </div>
      {node.children && node.children.length > 0 && (
        <div
          className="tree-connector"
          style={{ marginLeft: `${depth * 1.5 + 0.75}rem` }}
        >
          {node.children.map((child, index) => <TreeNodeRow key={index} node={child} depth={0} />)}
        </div>
      )}
    </div>
  );
}

export default function SpecTreeVisualization() {
  return (
    <Section
      id="spec-tree-viz"
      title="A tree in practice"
      maxWidthClass="max-w-5xl"
    >
      <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
        The spx-cli Spec Tree. Each node co-locates a spec, its tests, and a lock file. Color indicates validation
        state.
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--state-valid)" }}
          />
          <span className="text-[var(--text-muted)]">Valid</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--state-stale)" }}
          />
          <span className="text-[var(--text-muted)]">Stale</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "var(--state-needs-work)" }}
          />
          <span className="text-[var(--text-muted)]">Needs work</span>
        </div>
        <div className="flex items-center gap-2 border-l border-[var(--border)] pl-4">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span className="text-[var(--text-muted)]">Product</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--state-valid)]" />
          <span className="text-[var(--text-muted)]">Enabler</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-[var(--state-valid)]" />
          <span className="text-[var(--text-muted)]">Outcome</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 bg-[var(--text-muted)]"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          />
          <span className="text-[var(--text-muted)]">Decision</span>
        </div>
      </div>

      {/* Tree visualization */}
      <div className="card-glass p-6 overflow-x-auto">
        <TreeNodeRow node={specTree} />
      </div>
    </Section>
  );
}
