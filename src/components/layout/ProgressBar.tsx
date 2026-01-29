"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentChunk: number;
  totalChunks: number;
}

export default function ProgressBar({
  currentChunk,
  totalChunks,
}: ProgressBarProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-500 font-medium">
        Part {currentChunk + 1} of {totalChunks}
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: totalChunks }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full ${
              i <= currentChunk ? "bg-golden-500" : "bg-golden-100"
            }`}
            initial={{ width: 24 }}
            animate={{ width: i === currentChunk ? 40 : 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        ))}
      </div>
    </div>
  );
}
