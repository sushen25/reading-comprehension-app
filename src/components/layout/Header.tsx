"use client";

import { Bug } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-golden-500 via-golden-400 to-golden-500 py-4 px-6 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
          <Bug className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg md:text-xl tracking-tight">
            EdAccelerator
          </h1>
          <p className="text-white/80 text-xs md:text-sm">
            AI-Powered Reading Comprehension
          </p>
        </div>
      </div>
    </header>
  );
}
