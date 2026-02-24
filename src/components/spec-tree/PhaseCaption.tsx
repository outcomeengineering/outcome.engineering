"use client";

import { AnimatePresence, motion } from "framer-motion";

interface PhaseCaptionProps {
  caption: string | null;
}

export default function PhaseCaption({ caption }: PhaseCaptionProps) {
  return (
    <div className="flex justify-center pointer-events-none mt-4 min-h-[2.5rem]">
      <AnimatePresence mode="wait">
        {caption && (
          <motion.p
            key={caption}
            className="text-sm md:text-base font-mono text-[var(--accent-light)] bg-[var(--surface)] backdrop-blur-sm px-4 py-2 rounded-lg border border-[var(--border)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {caption}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
