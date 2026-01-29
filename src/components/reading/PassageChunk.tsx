"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import HighlightedText from "@/components/ui/HighlightedText";
import type { PassageChunk as PassageChunkType } from "@/types";

interface PassageChunkProps {
  chunk: PassageChunkType;
  isHighlighted: boolean;
}

const PassageChunk = forwardRef<HTMLDivElement, PassageChunkProps>(
  ({ chunk, isHighlighted }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="golden-card p-6 md:p-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-golden-500" />
          <h2 className="text-lg font-bold text-slate-900">{chunk.title}</h2>
        </div>
        <HighlightedText
          text={chunk.content}
          range={chunk.highlightRange}
          isActive={isHighlighted}
        />
      </motion.div>
    );
  }
);

PassageChunk.displayName = "PassageChunk";

export default PassageChunk;
