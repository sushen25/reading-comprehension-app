"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";
import SkeletonLoader from "@/components/ui/SkeletonLoader";

interface QuestionPanelProps {
  question: string;
  onSubmit: (answer: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export default function QuestionPanel({
  question,
  onSubmit,
  isLoading,
  disabled,
}: QuestionPanelProps) {
  const [answer, setAnswer] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setAnswer("");
    textareaRef.current?.focus();
  }, [question]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (answer.trim() && !isLoading && !disabled) {
      onSubmit(answer.trim());
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="golden-card p-6 md:p-8"
    >
      <h3 className="text-sm font-semibold uppercase tracking-wider text-golden-600 mb-2">
        Question
      </h3>
      <p className="text-slate-800 font-medium mb-4">{question}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          ref={textareaRef}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isLoading || disabled}
          placeholder="Type your answer here..."
          rows={4}
          className="w-full rounded-xl border border-golden-200 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-transparent transition-all resize-none disabled:opacity-50"
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!answer.trim() || isLoading || disabled}
          >
            <Send className="w-4 h-4" />
            Submit Answer
          </Button>
        </div>
      </form>

      {isLoading && <SkeletonLoader />}
    </motion.div>
  );
}

export function resetQuestionPanel(
  ref: React.RefObject<HTMLTextAreaElement | null>
) {
  ref.current?.focus();
}
