"use client";

import React from "react";

interface TripSummaryProps {
  destination: string;
  startDate: string;
  endDate: string;
  group: string;
  vibes: string[];
  pace: string;
  budget: string;
  notes: string;
}

export default function TripSummary({
  destination,
  startDate,
  endDate,
  group,
  vibes,
  pace,
  budget,
  notes,
}: TripSummaryProps) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-400 mb-3">
        Trip overview
      </p>
      <div className="space-y-2 text-xs text-slate-200">
        <p>
          <span className="text-slate-400">Destination:</span>{" "}
          {destination || "—"}
        </p>
        <p>
          <span className="text-slate-400">Dates:</span>{" "}
          {startDate && endDate ? `${startDate} → ${endDate}` : "Not sure yet"}
        </p>
        <p>
          <span className="text-slate-400">Group:</span> {group || "—"}
        </p>
        <p>
          <span className="text-slate-400">Vibe:</span>{" "}
          {vibes.length ? vibes.join(", ") : "—"}
        </p>
        <p>
          <span className="text-slate-400">Pace:</span> {pace || "—"}
        </p>
        <p>
          <span className="text-slate-400">Budget:</span> {budget || "—"}
        </p>
        <p>
          <span className="text-slate-400">Notes:</span>{" "}
          {notes ? notes : "—"}
        </p>
      </div>
    </div>
  );
}