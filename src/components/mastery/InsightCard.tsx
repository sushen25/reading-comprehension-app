"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import type { ChunkResult } from "@/types";
import { passageChunks } from "@/data/passage";

interface InsightCardProps {
  result: ChunkResult;
  index: number;
}

export default function InsightCard({ result, index }: InsightCardProps) {
  const chunk = passageChunks.find((c) => c.id === result.chunkId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.15, duration: 0.35 }}
      className="golden-card p-5"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-slate-900 text-sm">
          Part {result.chunkId + 1}: {chunk?.title}
        </h3>
        {result.correct ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full px-2.5 py-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Correct
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 rounded-full px-2.5 py-1">
            <AlertCircle className="w-3.5 h-3.5" />
            Needs Review
          </span>
        )}
      </div>

      <p className="text-sm text-slate-600 mb-2">
        <span className="font-medium">Q:</span> {result.question}
      </p>
      <p className="text-sm text-slate-500 italic mb-2">
        <span className="font-medium not-italic">Your answer:</span>{" "}
        {result.userAnswer}
      </p>
      <p className="text-sm text-slate-700">{result.feedback}</p>

      {!result.correct && result.hint && (
        <div className="mt-2 bg-amber-50 rounded-lg p-2.5 border border-amber-100">
          <p className="text-xs text-amber-800">
            <span className="font-semibold">Key insight:</span> {result.hint}
          </p>
        </div>
      )}

      <p className="text-xs text-slate-400 mt-2">
        Attempts: {result.attempts}
      </p>
    </motion.div>
  );
}
