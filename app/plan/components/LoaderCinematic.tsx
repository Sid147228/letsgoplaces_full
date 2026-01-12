"use client";

import React from "react";

export default function LoaderCinematic() {
  return (
    <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="flex gap-4 mb-6 text-3xl">
        <span className="animate-bounce">✈️</span>
        <span className="animate-bounce [animation-delay:0.15s]">📍</span>
        <span className="animate-bounce [animation-delay:0.3s]">📷</span>
        <span className="animate-bounce [animation-delay:0.45s]">🌍</span>
      </div>
      <p className="text-base font-medium">Crafting your itinerary…</p>
    </div>
  );
}