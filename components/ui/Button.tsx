"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };

export default function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-900 disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
