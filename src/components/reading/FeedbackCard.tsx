"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Eye, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";
import type { EvaluateResponse } from "@/types";

interface FeedbackCardProps {
  result: EvaluateResponse | null;
  onLookBack: () => void;
  onTryAgain: () => void;
  onNext: () => void;
  isLastChunk: boolean;
  attempts: number;
  maxAttempts: number;
}

export default function FeedbackCard({
  result,
  onLookBack,
  onTryAgain,
  onNext,
  isLastChunk,
  attempts,
  maxAttempts,
}: FeedbackCardProps) {
  return (
    <AnimatePresence mode="wait">
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className={`rounded-2xl border p-6 ${
            result.correct
              ? "bg-emerald-50 border-emerald-200"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <div className="flex items-start gap-3">
            {result.correct ? (
              <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            )}
            <div className="space-y-3 flex-1">
              <p className="text-slate-800 font-medium">{result.feedback}</p>

              {!result.correct && result.hint && (
                <div className="bg-white/60 rounded-xl p-3 border border-amber-100">
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">Hint:</span> {result.hint}
                  </p>
                </div>
              )}

              {!result.correct && attempts >= maxAttempts && (
                <p className="text-sm text-slate-500 italic">
                  You&apos;ve used all attempts. You can move on to the next
                  section.
                </p>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                {result.correct || attempts >= maxAttempts ? (
                  <Button onClick={onNext}>
                    {isLastChunk ? "View Mastery Report" : "Next Section"}
                  </Button>
                ) : (
                  <>
                    <Button variant="secondary" onClick={onLookBack}>
                      <Eye className="w-4 h-4" />
                      Look Back at Text
                    </Button>
                    <Button variant="ghost" onClick={onTryAgain}>
                      <RotateCcw className="w-4 h-4" />
                      Try Again
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
