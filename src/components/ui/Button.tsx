"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]";

  const variants = {
    primary:
      "bg-golden-500 text-white hover:bg-golden-600 active:bg-golden-700 shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-golden-700 border border-golden-300 hover:bg-golden-50 active:bg-golden-100",
    ghost:
      "bg-transparent text-golden-600 hover:bg-golden-50 active:bg-golden-100",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
