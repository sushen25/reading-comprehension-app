# EdAccelerator — Reading Comprehension Interface

A reading comprehension tool built for the EdAccelerator technical assessment. Students read a passage about honeybees in digestible chunks, answer free-text questions, and get real-time feedback from an AI tutor that actually explains *why* they're right or wrong.

**Live demo:** [TODO: add Vercel URL]

---

## How I interpreted the feedback

The user feedback pointed at a few clear problems, and each one shaped a specific part of the build:

**"It's annoying seeing the entire passage all at once."**
I split the passage into 3 logical chunks (hive hierarchy, worker roles, waggle dance). You only see one chunk at a time with its corresponding question. A progress bar at the top shows where you are. This also has the side benefit of making each question feel more manageable — you're only reading and thinking about one topic at a time.

**"Multiple choice is too easy, I can just guess."**
All answers are free-text. There's nothing to guess from. You type what you understand in your own words, and the AI evaluates whether you actually got it. This is a much better signal of real comprehension than picking from 4 options.

**"I finish the questions and immediately forget what I read."**
At the end, there's a Mastery Report that shows your score, every question you answered, what you wrote, and the AI's feedback for each one. It's a summary of what you understood and what you missed, so you walk away with something more than just a number.

**"When I get an answer wrong, I don't really learn why."**
When you get something wrong, the AI gives you a specific hint that points to a part of the passage without giving the answer away. There's also a "Look Back at Text" button that scrolls you back to the passage and highlights the relevant sentences. The goal is to make the correction loop actually useful — you read the hint, look at the highlighted text, and try again.

**"It feels like a test, not like learning."**
The AI is prompted as a Socratic tutor, not a grading machine. When you're right, it reinforces the concept briefly. When you're wrong, it's encouraging and nudges you in the right direction. The whole tone is warmer than a typical quiz.

**"I want to go back and re-read a specific part."**
The "Look Back at Text" feature handles this. When you get a wrong answer, it highlights the exact sentences in the passage that are relevant to the question and auto-scrolls to them.

**"My younger brother uses the app too and he's way slower at reading."**
The chunked passage approach helps here — shorter sections are less overwhelming for slower readers. The two-attempt system also means you're not penalized harshly for needing a second try. This is an area where there's room for more work (adjustable chunk sizes, reading speed controls, etc.) but the current structure is a reasonable starting point.

## AI question generation approach

Questions are pre-authored per chunk rather than generated on-the-fly. I went this route because:

1. The passage is static and known ahead of time, so there's no real benefit to generating questions dynamically each time
2. Pre-authored questions let me be deliberate about what each question tests — chunk 1 asks about the queen's role (a common misconception from the passage), chunk 2 requires synthesizing the age-based role system, chunk 3 tests understanding of the waggle dance mechanics
3. It avoids an extra API call on every page load and keeps the experience snappy

Where AI *does* come in is **answer evaluation**. Each student answer is sent to GPT-4o along with the passage chunk and question. The model is prompted as a Socratic tutor and evaluates semantic meaning, not keywords. It returns structured JSON with a correctness flag, feedback, and a hint (if wrong). I use OpenAI's JSON mode (`response_format: { type: "json_object" }`) to guarantee parseable output.

The system prompt is in `src/lib/prompts.ts` — it tells the model to be generous (if a student captures the core idea imprecisely, it still counts), to keep feedback to 1-2 sentences, and to make hints point at specific parts of the passage without revealing the answer.

## Key decisions

**Chunked passage with per-chunk questions** — The passage is split into 3 parts based on topic. Each chunk is shown alongside its question in a two-column layout on desktop (stacked on mobile). This directly addresses the "wall of text" complaint and keeps the cognitive load per section reasonable.

**Free-text input with semantic evaluation** — No multiple choice. The AI evaluates meaning, not exact wording. This is harder to game and is a better test of whether someone actually understood what they read.

**2-attempt limit per question** — If you get it wrong, you get a hint and can try again. After 2 wrong attempts, you can move on. This keeps things from feeling punishing while still encouraging effort.

**"Look Back at Text" with highlighting** — Each chunk has a pre-defined `highlightRange` (character offsets) marking the most relevant sentences for its question. When the student clicks "Look Back," those sentences get a golden highlight and the page scrolls to the passage. This makes the re-reading targeted instead of aimless.

**Mastery Report at the end** — Shows score, per-question breakdown, what the student wrote, and the AI feedback. Gives the session a sense of closure and something to review.

**Temperature 0.3 on the API call** — Low enough for consistent grading across attempts, high enough to keep the language from being robotic.

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (page transitions, animated score ring, staggered card reveals)
- OpenAI SDK (GPT-4o, JSON mode)
- Lucide React (icons)

## Running locally

```bash
git clone <repo-url>
cd EdAccelerator
npm install
```

Create a `.env.local` file:

```
OPENAI_API_KEY=your_key_here
```

Then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/
│   ├── api/evaluate/route.ts    # OpenAI evaluation endpoint
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page (all state management)
│   └── globals.css              # Tailwind + custom utilities
├── components/
│   ├── layout/                  # Header, ProgressBar
│   ├── reading/                 # PassageChunk, QuestionPanel, FeedbackCard
│   ├── mastery/                 # MasteryReport, ScoreRing, InsightCard
│   └── ui/                      # Button, SkeletonLoader, HighlightedText
├── data/passage.ts              # Passage chunks, questions, highlight ranges
├── hooks/useEvaluation.ts       # Fetch hook for the evaluate API
├── lib/
│   ├── openai.ts                # OpenAI client
│   └── prompts.ts               # Socratic tutor system prompt
└── types/index.ts               # TypeScript interfaces
```

## What I'd improve with more time

- **Dynamic question generation** — Use AI to generate varied questions per session so repeat attempts feel fresh. The current architecture already sends the chunk to the API, so this would be a straightforward extension.
- **Adaptive difficulty** — Track how quickly a student answers correctly and adjust question complexity. The "younger brother" feedback suggests this would matter a lot.
- **Reading speed/accessibility controls** — Font size adjustment, a "read aloud" mode, adjustable chunk sizes.
- **Persistence** — Save progress and results to a database so students can review past sessions. Right now everything is in-memory and resets on refresh.
- **Better highlight ranges** — Currently these are hardcoded character offsets. A more robust approach would have the AI identify relevant sentences dynamically based on the student's specific wrong answer.
- **Rate limiting** — The API route has no rate limiting. Fine for a demo, not for production.

## Time spent

~5 hours total. Most of the time went into the feedback loop design (getting the chunking, highlighting, and Socratic hint flow to feel right) and prompt engineering for consistent grading.
