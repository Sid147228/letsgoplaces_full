"use client";

import { cn } from "@/lib/utils";

export default function Button({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition bg-black text-white hover:bg-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
