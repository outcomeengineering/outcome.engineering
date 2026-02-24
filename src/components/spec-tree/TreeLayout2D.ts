import type { SpecNode } from "@/lib/spec-tree-data";

export interface NodePosition {
  x: number;
  y: number;
}

export interface Edge {
  parentId: string;
  childId: string;
}

export interface TreeLayout {
  positions: Map<string, NodePosition>;
  edges: Edge[];
  viewBox: { x: number; y: number; width: number; height: number };
}

const HORIZONTAL_SPACING = 220;
const VERTICAL_SPACING = 80;
const PADDING_X = 40;
const PADDING_Y = 30;
const LABEL_RIGHT_PADDING = 180; // space for labels on rightmost nodes

/**
 * Left-to-right tree layout.
 * x = depth * HORIZONTAL_SPACING (root at left, children rightward)
 * y = computed so each parent is centered among its children
 */

/** Count leaf nodes in subtree (leaves determine vertical space needed). */
function countLeaves(node: SpecNode): number {
  if (node.children.length === 0) return 1;
  return node.children.reduce((sum, c) => sum + countLeaves(c), 0);
}

/**
 * Assign positions recursively.
 * Returns the y-range [minY, maxY] consumed by this subtree.
 */
function assignPositions(
  node: SpecNode,
  startY: number,
  positions: Map<string, NodePosition>,
  edges: Edge[],
): { minY: number; maxY: number } {
  const x = node.depth * HORIZONTAL_SPACING;

  if (node.children.length === 0) {
    const y = startY;
    positions.set(node.id, { x, y });
    return { minY: y, maxY: y };
  }

  let currentY = startY;
  let childMinY = Infinity;
  let childMaxY = -Infinity;

  for (const child of node.children) {
    edges.push({ parentId: node.id, childId: child.id });
    const range = assignPositions(child, currentY, positions, edges);
    childMinY = Math.min(childMinY, range.minY);
    childMaxY = Math.max(childMaxY, range.maxY);
    currentY = range.maxY + VERTICAL_SPACING;
  }

  // Center parent among its children
  const y = (childMinY + childMaxY) / 2;
  positions.set(node.id, { x, y });

  return { minY: childMinY, maxY: childMaxY };
}

export function computeTreeLayout2D(root: SpecNode): TreeLayout {
  const positions = new Map<string, NodePosition>();
  const edges: Edge[] = [];
  assignPositions(root, 0, positions, edges);

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const pos of positions.values()) {
    minX = Math.min(minX, pos.x);
    maxX = Math.max(maxX, pos.x);
    minY = Math.min(minY, pos.y);
    maxY = Math.max(maxY, pos.y);
  }

  return {
    positions,
    edges,
    viewBox: {
      x: minX - PADDING_X,
      y: minY - PADDING_Y,
      width: maxX - minX + PADDING_X * 2 + LABEL_RIGHT_PADDING,
      height: maxY - minY + PADDING_Y * 2,
    },
  };
}
