"use client";

import { motion } from "framer-motion";
import type { NodePosition } from "./TreeLayout2D";

interface SVGTreeEdgeProps {
  from: NodePosition;
  to: NodePosition;
  visible: boolean;
  highlighted: boolean;
  dimmed: boolean;
  delay: number;
}

function buildCubicPath(from: NodePosition, to: NodePosition): string {
  const midX = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
}

export default function SVGTreeEdge({
  from,
  to,
  visible,
  highlighted,
  dimmed,
  delay,
}: SVGTreeEdgeProps) {
  const d = buildCubicPath(from, to);
  const strokeColor = highlighted ? "#f59e0b" : "rgba(245, 158, 11, 0.3)";
  const strokeWidth = highlighted ? 3 : 2;
  const opacity = dimmed ? 0.08 : 1;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      opacity={visible ? opacity : 0}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: visible ? 1 : 0,
        opacity: visible ? opacity : 0,
      }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    />
  );
}
