export interface PassageChunk {
  id: number;
  title: string;
  content: string;
  highlightRange: {
    start: number;
    end: number;
  };
}

export interface ChunkQuestion {
  chunkId: number;
  question: string;
}

export interface EvaluateRequest {
  question: string;
  passageChunk: string;
  userAnswer: string;
}

export interface EvaluateResponse {
  correct: boolean;
  feedback: string;
  hint: string;
}

export interface ChunkResult {
  chunkId: number;
  question: string;
  userAnswer: string;
  correct: boolean;
  feedback: string;
  hint: string;
  attempts: number;
}

export type SessionPhase = "reading" | "mastery";
