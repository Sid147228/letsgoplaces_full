"use client";

import { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function CTAButton({
  className,
  variant = "primary",
  children,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-60 disabled:cursor-not-allowed";
  const variants: Record<typeof variant, string> = {
    primary:
      "bg-brand text-white hover:bg-brand/90 focus-visible:ring-brand",
    secondary:
      "bg-white text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-200",
    ghost:
      "border border-white/15 text-slate-50 hover:border-white/40 focus-visible:ring-white/30"
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}