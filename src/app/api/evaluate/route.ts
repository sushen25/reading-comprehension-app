import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { buildSystemPrompt } from "@/lib/prompts";
import type { EvaluateRequest, EvaluateResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: EvaluateRequest = await req.json();
    const { question, passageChunk, userAnswer } = body;

    if (!question || !passageChunk || !userAnswer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(passageChunk),
        },
        {
          role: "user",
          content: `Question: ${question}\n\nStudent's answer: ${userAnswer}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 300,
    });

    const raw = completion.choices[0].message.content;
    const parsed: EvaluateResponse = JSON.parse(raw ?? "{}");

    if (typeof parsed.correct !== "boolean" || !parsed.feedback) {
      throw new Error("Malformed AI response");
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Evaluate API error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate answer" },
      { status: 500 }
    );
  }
}
