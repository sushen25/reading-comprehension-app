"use client";

import { motion } from "framer-motion";
import { Award, RotateCcw } from "lucide-react";
import ScoreRing from "./ScoreRing";
import InsightCard from "./InsightCard";
import Button from "@/components/ui/Button";
import type { ChunkResult } from "@/types";

interface MasteryReportProps {
  results: ChunkResult[];
  onRestart: () => void;
}

function getOverallInsight(score: number, total: number): string {
  if (score === total)
    return "Outstanding! You demonstrated thorough comprehension of honeybee biology.";
  if (score >= total / 2)
    return "Great work! You have a solid grasp of most concepts. Review the highlighted areas for the topics you missed.";
  if (score >= 1)
    return "Good effort! Consider re-reading the passages more carefully, focusing on the specific details mentioned.";
  return "This is a challenging topic! Take your time re-reading each section and focus on the key details.";
}

export default function MasteryReport({
  results,
  onRestart,
}: MasteryReportProps) {
  const totalCorrect = results.filter((r) => r.correct).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center space-y-2"
      >
        <div className="flex justify-center">
          <div className="bg-golden-100 rounded-full p-3">
            <Award className="w-8 h-8 text-golden-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Your Mastery Report
        </h2>
        <p className="text-slate-500">
          The Secret Life of Honeybees
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <ScoreRing score={totalCorrect} total={results.length} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-slate-600 font-medium px-4"
      >
        {getOverallInsight(totalCorrect, results.length)}
      </motion.p>

      <div className="space-y-3">
        {results.map((result, i) => (
          <InsightCard key={result.chunkId} result={result} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center pt-2 pb-8"
      >
        <Button variant="secondary" onClick={onRestart}>
          <RotateCcw className="w-4 h-4" />
          Try Again
        </Button>
      </motion.div>
    </motion.div>
  );
}
