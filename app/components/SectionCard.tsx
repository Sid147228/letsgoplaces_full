"use client";

import React from "react";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function SectionCard({
  title,
  subtitle,
  children,
}: SectionCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5">
      <div className="mb-3">
        <h2 className="text-sm font-medium">{title}</h2>
        {subtitle && (
          <p className="text-[11px] text-slate-400 mt-1">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}