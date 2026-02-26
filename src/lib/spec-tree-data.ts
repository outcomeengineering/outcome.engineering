export type NodeState = "valid" | "stale" | "needs-work";
export type NodeType = "product" | "enabler" | "outcome" | "decision";

export interface SpecNode {
  id: string;
  slug: string;
  label: string;
  type: NodeType;
  state: NodeState;
  index: number;
  children: SpecNode[];
  depth: number;
  hasLockFile: boolean;
  hasTests: boolean;
  purpose?: string;
}

function node(
  id: string,
  slug: string,
  label: string,
  type: NodeType,
  state: NodeState,
  index: number,
  depth: number,
  opts?: {
    hasLockFile?: boolean;
    hasTests?: boolean;
    purpose?: string;
    children?: SpecNode[];
  },
): SpecNode {
  return {
    id,
    slug,
    label,
    type,
    state,
    index,
    depth,
    hasLockFile: opts?.hasLockFile ?? (state === "valid"),
    hasTests: opts?.hasTests ?? (type !== "decision" && type !== "product"),
    purpose: opts?.purpose,
    children: opts?.children ?? [],
  };
}

export const specTreeData: SpecNode = node(
  "root",
  "spx-cli.product.md",
  "spx-cli",
  "product",
  "valid",
  0,
  0,
  {
    hasLockFile: false,
    hasTests: false,
    purpose: "CLI tool for managing the Spec Tree",
    children: [
      node(
        "pdr-tree-structure",
        "15-tree-structure-contract.pdr.md",
        "tree-structure-contract",
        "decision",
        "valid",
        15,
        1,
      ),
      node(
        "adr-cli-framework",
        "15-cli-framework.adr.md",
        "cli-framework",
        "decision",
        "valid",
        15,
        1,
      ),
      node(
        "adr-randomized-test",
        "15-randomized-test-generation.adr.md",
        "randomized-test-generation",
        "decision",
        "valid",
        15,
        1,
      ),
      node(
        "test-harness",
        "21-test-harness.enabler/",
        "test-harness",
        "enabler",
        "valid",
        21,
        1,
        { purpose: "Shared test utilities and fixtures" },
      ),
      node(
        "e2e-harness",
        "22-e2e-harness.enabler/",
        "e2e-harness",
        "enabler",
        "valid",
        22,
        1,
        { purpose: "End-to-end test infrastructure" },
      ),
      node(
        "parse-directory-tree",
        "32-parse-directory-tree.enabler/",
        "parse-directory-tree",
        "enabler",
        "valid",
        32,
        1,
        {
          purpose: "Walks filesystem to build the tree structure",
          children: [
            node(
              "spx-lock-state",
              "21-spx-lock-state.enabler/",
              "spx-lock-state",
              "enabler",
              "valid",
              21,
              2,
              { purpose: "Reads and validates spx-lock.yaml" },
            ),
            node(
              "test-link-state",
              "21-test-link-state.enabler/",
              "test-link-state",
              "enabler",
              "valid",
              21,
              2,
              { purpose: "Resolves test file associations" },
            ),
          ],
        },
      ),
      node(
        "node-status",
        "43-node-status.enabler/",
        "node-status",
        "enabler",
        "valid",
        43,
        1,
        {
          purpose: "Computes validation state for each node",
          children: [
            node(
              "node-state-machine",
              "32-node-state-machine.enabler/",
              "node-state-machine",
              "enabler",
              "valid",
              32,
              2,
              { purpose: "State transition logic: valid/stale/needs-work" },
            ),
          ],
        },
      ),
      node(
        "tree-interpretation",
        "54-tree-interpretation.outcome/",
        "tree-interpretation",
        "outcome",
        "needs-work",
        54,
        1,
        {
          hasLockFile: false,
          purpose: "Users can interpret the full tree status at a glance",
          children: [
            node(
              "parent-child-links",
              "21-parent-child-links.enabler/",
              "parent-child-links",
              "enabler",
              "valid",
              21,
              2,
              { purpose: "Resolves parent-child relationships" },
            ),
            node(
              "status-rollup",
              "43-status-rollup.outcome/",
              "status-rollup",
              "outcome",
              "stale",
              43,
              2,
              {
                hasLockFile: true,
                purpose: "Parent status reflects worst child state",
              },
            ),
            node(
              "spx-tree-status",
              "54-tree-status.outcome/",
              "spx-tree-status",
              "outcome",
              "needs-work",
              54,
              2,
              {
                hasLockFile: false,
                purpose: "Full tree status display in terminal",
              },
            ),
          ],
        },
      ),
      node(
        "cli-integration",
        "76-cli-integration.outcome/",
        "cli-integration",
        "outcome",
        "valid",
        76,
        1,
        { purpose: "spx CLI commands work end-to-end" },
      ),
      node(
        "e2e-workflow",
        "87-e2e-workflow.outcome/",
        "e2e-workflow",
        "outcome",
        "valid",
        87,
        1,
        {
          purpose: "Complete workflow validates from init to verify",
          children: [
            node(
              "e2e-validation",
              "43-e2e-validation.outcome/",
              "e2e-validation",
              "outcome",
              "valid",
              43,
              2,
              { purpose: "End-to-end validation passes" },
            ),
          ],
        },
      ),
    ],
  },
);

export function flattenTree(node: SpecNode): SpecNode[] {
  const result: SpecNode[] = [node];
  for (const child of node.children) {
    result.push(...flattenTree(child));
  }
  return result;
}

export function getNodeById(
  root: SpecNode,
  id: string,
): SpecNode | undefined {
  if (root.id === id) return root;
  for (const child of root.children) {
    const found = getNodeById(child, id);
    if (found) return found;
  }
  return undefined;
}

export function getAncestorPath(
  root: SpecNode,
  targetId: string,
): SpecNode[] {
  if (root.id === targetId) return [root];
  for (const child of root.children) {
    const path = getAncestorPath(child, targetId);
    if (path.length > 0) return [root, ...path];
  }
  return [];
}

export function getLowerIndexSiblings(
  root: SpecNode,
  targetId: string,
): SpecNode[] {
  const path = getAncestorPath(root, targetId);
  const siblings: SpecNode[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const parent = path[i];
    const childOnPath = path[i + 1];
    for (const sibling of parent.children) {
      if (sibling.id !== childOnPath.id && sibling.index < childOnPath.index) {
        siblings.push(sibling);
      }
    }
  }

  return siblings;
}

const STATE_COLORS: Record<NodeState, string> = {
  valid: "#22c55e",
  stale: "#f59e0b",
  "needs-work": "#737373",
};

export function stateColor(state: NodeState): string {
  return STATE_COLORS[state];
}

export function stateLabel(state: NodeState): string {
  return state === "needs-work" ? "needs work" : state;
}

/**
 * Simplified tree for the landing page visualization.
 * 9 nodes (5 at depth 1, 3 at depth 2) — all node types and states represented.
 */
export const specTreeDataSimplified: SpecNode = node(
  "root",
  "spx-cli.product.md",
  "spx-cli",
  "product",
  "valid",
  0,
  0,
  {
    hasLockFile: false,
    hasTests: false,
    purpose: "CLI tool for managing the Spec Tree",
    children: [
      node(
        "adr-cli-framework",
        "15-cli-framework.adr.md",
        "cli-framework",
        "decision",
        "valid",
        15,
        1,
        { hasLockFile: false, hasTests: false },
      ),
      node(
        "test-harness",
        "21-test-harness.enabler/",
        "test-harness",
        "enabler",
        "valid",
        21,
        1,
        { purpose: "Shared test utilities and fixtures" },
      ),
      node(
        "parse-directory-tree",
        "32-parse-directory-tree.enabler/",
        "parse-directory-tree",
        "enabler",
        "valid",
        32,
        1,
        {
          purpose: "Walks filesystem to build the tree structure",
          children: [
            node(
              "spx-lock-state",
              "21-spx-lock-state.enabler/",
              "spx-lock-state",
              "enabler",
              "valid",
              21,
              2,
              { purpose: "Reads and validates spx-lock.yaml" },
            ),
          ],
        },
      ),
      node(
        "tree-interpretation",
        "54-tree-interpretation.outcome/",
        "tree-interpretation",
        "outcome",
        "needs-work",
        54,
        1,
        {
          hasLockFile: false,
          purpose: "Users can interpret the full tree status at a glance",
          children: [
            node(
              "status-rollup",
              "43-status-rollup.outcome/",
              "status-rollup",
              "outcome",
              "stale",
              43,
              2,
              {
                hasLockFile: true,
                purpose: "Parent status reflects worst child state",
              },
            ),
            node(
              "spx-tree-status",
              "54-tree-status.outcome/",
              "spx-tree-status",
              "outcome",
              "needs-work",
              54,
              2,
              {
                hasLockFile: false,
                purpose: "Full tree status display in terminal",
              },
            ),
          ],
        },
      ),
      node(
        "e2e-workflow",
        "87-e2e-workflow.outcome/",
        "e2e-workflow",
        "outcome",
        "valid",
        87,
        1,
        { purpose: "Complete workflow validates from init to verify" },
      ),
    ],
  },
);
