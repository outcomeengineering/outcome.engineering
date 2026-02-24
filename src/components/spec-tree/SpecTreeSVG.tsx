"use client";

import { flattenTree, getAncestorPath, getLowerIndexSiblings, specTreeDataSimplified } from "@/lib/spec-tree-data";
import type { SpecNode } from "@/lib/spec-tree-data";
import { useCallback, useMemo, useState } from "react";
import SVGTreeEdge from "./SVGTreeEdge";
import SVGTreeNode from "./SVGTreeNode";
import { computeTreeLayout2D } from "./TreeLayout2D";

interface SpecTreeSVGProps {
  visibleNodeIds: Set<string>;
  showLockFiles: boolean;
  highlightPathId: string | null;
  interactive: boolean;
}

export default function SpecTreeSVG({
  visibleNodeIds,
  showLockFiles,
  highlightPathId,
  interactive,
}: SpecTreeSVGProps) {
  const layout = useMemo(() => computeTreeLayout2D(specTreeDataSimplified), []);
  const allNodes = useMemo(() => flattenTree(specTreeDataSimplified), []);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const activeHighlightId = interactive ? selectedNodeId : highlightPathId;

  const { pathNodeIds, contextNodeIds } = useMemo(() => {
    if (!activeHighlightId) {
      return { pathNodeIds: new Set<string>(), contextNodeIds: new Set<string>() };
    }

    const path = getAncestorPath(specTreeDataSimplified, activeHighlightId);
    const pathIds = new Set(path.map((n) => n.id));

    const siblings = getLowerIndexSiblings(specTreeDataSimplified, activeHighlightId);
    const contextIds = new Set([...pathIds, ...siblings.map((n) => n.id)]);

    return { pathNodeIds: pathIds, contextNodeIds: contextIds };
  }, [activeHighlightId]);

  const handleNodeClick = useCallback(
    (node: SpecNode) => {
      if (!interactive) return;
      setSelectedNodeId((prev) => (prev === node.id ? null : node.id));
    },
    [interactive],
  );

  const handleBackgroundClick = useCallback(() => {
    if (interactive) setSelectedNodeId(null);
  }, [interactive]);

  const hasSelection = !!activeHighlightId;
  const { viewBox } = layout;

  return (
    <svg
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="xMidYMid meet"
      className="spec-tree-svg"
      onClick={handleBackgroundClick}
      role="img"
      aria-label="Spec Tree visualization showing the spx-cli project structure"
    >
      <defs>
        <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#f59e0b" floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {layout.edges.map(({ parentId, childId }) => {
        const fromPos = layout.positions.get(parentId);
        const toPos = layout.positions.get(childId);
        if (!fromPos || !toPos) return null;

        const edgeVisible = visibleNodeIds.has(parentId) && visibleNodeIds.has(childId);
        const isOnPath = hasSelection && pathNodeIds.has(parentId) && pathNodeIds.has(childId);
        const isDimmed = hasSelection && !isOnPath;

        return (
          <SVGTreeEdge
            key={`${parentId}-${childId}`}
            from={fromPos}
            to={toPos}
            visible={edgeVisible}
            highlighted={isOnPath}
            dimmed={isDimmed}
            delay={0}
          />
        );
      })}

      {allNodes.map((node, i) => {
        const pos = layout.positions.get(node.id);
        if (!pos) return null;

        const nodeVisible = visibleNodeIds.has(node.id);
        const isHighlighted = hasSelection && pathNodeIds.has(node.id);
        const isDimmed = hasSelection && !contextNodeIds.has(node.id);
        const showLock = showLockFiles && node.hasLockFile;

        return (
          <SVGTreeNode
            key={node.id}
            node={node}
            x={pos.x}
            y={pos.y}
            visible={nodeVisible}
            highlighted={isHighlighted}
            dimmed={isDimmed}
            showLockIndicator={showLock}
            onClick={handleNodeClick}
            delay={i * 0.02}
          />
        );
      })}
    </svg>
  );
}
