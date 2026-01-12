"use client";

import React from "react";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function SectionCard({
  title,
  subtitle,
  icon,
  children,
}: SectionCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5">
      <div className="flex items-start gap-3 mb-3">
        {icon && <div className="text-white/80 mt-0.5">{icon}</div>}
        <div>
          <h2 className="text-sm font-medium">{title}</h2>
          {subtitle && (
            <p className="text-[11px] text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}