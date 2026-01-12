"use client";

import React from "react";

interface IconOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function IconOption({
  label,
  selected,
  onClick,
}: IconOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-[11px] transition-all ${
        selected
          ? "bg-white text-black border-white"
          : "border-white/20 text-slate-200 hover:border-white/60"
      }`}
    >
      {label}
    </button>
  );
}