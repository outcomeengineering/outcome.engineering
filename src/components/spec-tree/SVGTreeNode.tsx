"use client";

import type { NodeType, SpecNode } from "@/lib/spec-tree-data";
import { stateColor } from "@/lib/spec-tree-data";
import { motion } from "framer-motion";

interface SVGTreeNodeProps {
  node: SpecNode;
  x: number;
  y: number;
  visible: boolean;
  highlighted: boolean;
  dimmed: boolean;
  showLockIndicator: boolean;
  onClick: (node: SpecNode) => void;
  delay: number;
}

const MAX_LABEL_LENGTH = 22;

function truncateLabel(label: string): string {
  if (label.length <= MAX_LABEL_LENGTH) return label;
  return label.slice(0, MAX_LABEL_LENGTH - 1) + "\u2026";
}

function nodeColor(node: SpecNode): string {
  return node.type === "product" ? "#f59e0b" : stateColor(node.state);
}

function nodeRadius(type: NodeType): number {
  switch (type) {
    case "product":
      return 14;
    case "enabler":
      return 9;
    case "outcome":
      return 10;
    case "decision":
      return 8;
  }
}

function NodeShape({
  type,
  color,
  highlighted,
  dimmed,
}: {
  type: NodeType;
  color: string;
  highlighted: boolean;
  dimmed: boolean;
}) {
  const opacity = dimmed ? 0.2 : 1;
  const r = nodeRadius(type);
  const glowFilter = highlighted ? "url(#node-glow)" : undefined;

  switch (type) {
    case "product":
      return (
        <motion.circle
          r={r}
          fill={color}
          opacity={opacity}
          filter={glowFilter}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      );
    case "enabler":
      return (
        <motion.circle
          r={r}
          fill={color}
          opacity={opacity}
          filter={glowFilter}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      );
    case "outcome":
      return (
        <motion.rect
          x={-r}
          y={-r}
          width={r * 2}
          height={r * 2}
          rx={3}
          fill={color}
          opacity={opacity}
          filter={glowFilter}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      );
    case "decision":
      return (
        <motion.polygon
          points={`0,${-r} ${r},0 0,${r} ${-r},0`}
          fill={color}
          opacity={opacity}
          filter={glowFilter}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      );
  }
}

export default function SVGTreeNode({
  node,
  x,
  y,
  visible,
  highlighted,
  dimmed,
  showLockIndicator,
  onClick,
  delay,
}: SVGTreeNodeProps) {
  const color = nodeColor(node);
  const labelOpacity = dimmed ? 0.25 : 0.9;
  const r = nodeRadius(node.type);

  return (
    <motion.g
      transform={`translate(${x}, ${y})`}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, delay }}
      style={{ cursor: visible ? "pointer" : "default" }}
      onClick={(e) => {
        if (visible) {
          e.stopPropagation();
          onClick(node);
        }
      }}
      role="button"
      aria-label={`${node.label} — ${node.type}, ${node.state}`}
    >
      <NodeShape
        type={node.type}
        color={color}
        highlighted={highlighted}
        dimmed={dimmed}
      />

      {showLockIndicator && (
        <motion.text
          x={-r - 6}
          textAnchor="end"
          dominantBaseline="central"
          fontSize="12"
          fill="#f59e0b"
          initial={{ opacity: 0 }}
          animate={{ opacity: dimmed ? 0.2 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          🔒
        </motion.text>
      )}

      <motion.text
        x={r + 8}
        dominantBaseline="central"
        textAnchor="start"
        fontSize="14"
        fontFamily="var(--font-mono)"
        fill="#fafafa"
        opacity={labelOpacity}
      >
        <title>{node.label}</title>
        {truncateLabel(node.label)}
      </motion.text>
    </motion.g>
  );
}
