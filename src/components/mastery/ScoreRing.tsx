"use client";

import { motion } from "framer-motion";

interface ScoreRingProps {
  score: number;
  total: number;
}

export default function ScoreRing({ score, total }: ScoreRingProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = score / total;
  const strokeDashoffset = circumference * (1 - progress);

  const color =
    score === total
      ? "#10b981"
      : score >= total / 2
        ? "#fbbf24"
        : "#d97706";

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="180" height="180" viewBox="0 0 180 180" className="block">
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="12"
        />
        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          transform="rotate(-90 90 90)"
        />
        <text
          x="90"
          y="85"
          textAnchor="middle"
          className="fill-slate-900 text-3xl font-bold"
          dominantBaseline="central"
        >
          {score}/{total}
        </text>
        <text
          x="90"
          y="115"
          textAnchor="middle"
          className="fill-slate-500 text-xs"
          dominantBaseline="central"
        >
          correct
        </text>
      </svg>
    </div>
  );
}
