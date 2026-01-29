"use client";

interface HighlightedTextProps {
  text: string;
  range: { start: number; end: number };
  isActive: boolean;
}

export default function HighlightedText({
  text,
  range,
  isActive,
}: HighlightedTextProps) {
  const before = text.slice(0, range.start);
  const highlighted = text.slice(range.start, range.end);
  const after = text.slice(range.end);

  return (
    <p className="font-display text-slate-800 leading-relaxed text-base md:text-lg">
      {before}
      <mark
        className={
          isActive
            ? "highlight-active animate-highlight-fade"
            : "bg-transparent"
        }
      >
        {highlighted}
      </mark>
      {after}
    </p>
  );
}
