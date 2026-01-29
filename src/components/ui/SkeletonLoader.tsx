"use client";

import { motion } from "framer-motion";

export default function SkeletonLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3 p-4"
    >
      <div className="flex items-center gap-2 text-golden-600 text-sm font-medium mb-3">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-2 h-2 rounded-full bg-golden-500"
        />
        Our AI tutor is reading your answer...
      </div>
      {[0.8, 0.6, 0.4].map((width, i) => (
        <div
          key={i}
          className="h-3 rounded-full bg-golden-100 animate-pulse-slow"
          style={{ width: `${width * 100}%` }}
        />
      ))}
    </motion.div>
  );
}
