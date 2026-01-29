"use client";

import { useState, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import ProgressBar from "@/components/layout/ProgressBar";
import PassageChunk from "@/components/reading/PassageChunk";
import QuestionPanel from "@/components/reading/QuestionPanel";
import FeedbackCard from "@/components/reading/FeedbackCard";
import MasteryReport from "@/components/mastery/MasteryReport";
import { useEvaluation } from "@/hooks/useEvaluation";
import { passageChunks, chunkQuestions } from "@/data/passage";
import type { SessionPhase, ChunkResult, EvaluateResponse } from "@/types";

const MAX_ATTEMPTS = 2;

export default function Home() {
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [phase, setPhase] = useState<SessionPhase>("reading");
  const [results, setResults] = useState<ChunkResult[]>([]);
  const [showHighlight, setShowHighlight] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lastAnswer, setLastAnswer] = useState("");
  const [feedbackResult, setFeedbackResult] =
    useState<EvaluateResponse | null>(null);

  const passageRef = useRef<HTMLDivElement>(null);
  const { evaluate, isLoading, error, reset } = useEvaluation();

  const chunk = passageChunks[currentChunkIndex];
  const question = chunkQuestions[currentChunkIndex];

  const handleSubmit = useCallback(
    async (answer: string) => {
      setShowHighlight(false);
      setLastAnswer(answer);
      setFeedbackResult(null);

      try {
        const result = await evaluate({
          question: question.question,
          passageChunk: chunk.content,
          userAnswer: answer,
        });
        setAttempts((prev) => prev + 1);
        setFeedbackResult(result);
      } catch {
        // error state is handled by the hook
      }
    },
    [chunk, question, evaluate]
  );

  const handleLookBack = useCallback(() => {
    setShowHighlight(true);
    passageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  const handleTryAgain = useCallback(() => {
    setFeedbackResult(null);
    setShowHighlight(false);
    reset();
  }, [reset]);

  const handleNext = useCallback(() => {
    const newResult: ChunkResult = {
      chunkId: chunk.id,
      question: question.question,
      userAnswer: lastAnswer,
      correct: feedbackResult?.correct ?? false,
      feedback: feedbackResult?.feedback ?? "",
      hint: feedbackResult?.hint ?? "",
      attempts,
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    if (currentChunkIndex < passageChunks.length - 1) {
      setCurrentChunkIndex((prev) => prev + 1);
      setShowHighlight(false);
      setAttempts(0);
      setFeedbackResult(null);
      setLastAnswer("");
      reset();
    } else {
      setPhase("mastery");
    }
  }, [
    chunk,
    question,
    lastAnswer,
    feedbackResult,
    attempts,
    results,
    currentChunkIndex,
    reset,
  ]);

  const handleRestart = useCallback(() => {
    setCurrentChunkIndex(0);
    setPhase("reading");
    setResults([]);
    setShowHighlight(false);
    setAttempts(0);
    setFeedbackResult(null);
    setLastAnswer("");
    reset();
  }, [reset]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 md:py-10">
        <AnimatePresence mode="wait">
          {phase === "reading" ? (
            <div key={`chunk-${currentChunkIndex}`} className="space-y-6">
              <ProgressBar
                currentChunk={currentChunkIndex}
                totalChunks={passageChunks.length}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <PassageChunk
                    ref={passageRef}
                    chunk={chunk}
                    isHighlighted={showHighlight}
                  />
                </div>

                <div className="space-y-4">
                  <QuestionPanel
                    question={question.question}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    disabled={
                      feedbackResult !== null &&
                      (feedbackResult.correct || attempts >= MAX_ATTEMPTS)
                    }
                  />

                  {error && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                      Something went wrong evaluating your answer. Please try
                      again.
                    </div>
                  )}

                  <FeedbackCard
                    result={feedbackResult}
                    onLookBack={handleLookBack}
                    onTryAgain={handleTryAgain}
                    onNext={handleNext}
                    isLastChunk={
                      currentChunkIndex === passageChunks.length - 1
                    }
                    attempts={attempts}
                    maxAttempts={MAX_ATTEMPTS}
                  />
                </div>
              </div>
            </div>
          ) : (
            <MasteryReport
              key="mastery"
              results={results}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
