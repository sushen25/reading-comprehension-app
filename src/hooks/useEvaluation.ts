"use client";

import { useState } from "react";
import type { EvaluateRequest, EvaluateResponse } from "@/types";

export function useEvaluation() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EvaluateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function evaluate(req: EvaluateRequest): Promise<EvaluateResponse> {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      if (!res.ok) throw new Error("Evaluation failed");
      const data: EvaluateResponse = await res.json();
      setResult(data);
      return data;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return { evaluate, isLoading, result, error, reset };
}
