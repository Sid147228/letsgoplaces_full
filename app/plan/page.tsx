"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useRouter } from "next/navigation";

export default function PlanPage() {
  const router = useRouter();

  // Form state
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [tripTypes, setTripTypes] = useState<string[]>([]);
  const [pace, setPace] = useState("");
  const [interests, setInterests] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Modal + loader state
  const [showDaysModal, setShowDaysModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const allTripTypes = [
    "Adventure",
    "Food",
    "Culture",
    "Nightlife",
    "Photography",
    "Nature",
    "Luxury",
    "Budget",
    "Hidden gems",
  ];

  // Toggle trip type
  function toggleTripType(type: string) {
    setTripTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  // Calculate days if dates provided
  function calculateDays() {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return diff > 0 ? diff : null;
  }

  // Handle submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const daysFromDates = calculateDays();

    if (daysFromDates) {
      // We have exact days → go straight to loader
      startLoadingAndRedirect(daysFromDates);
    } else {
      // No dates → ask user 3 or 5 days
      setShowDaysModal(true);
    }
  }

  // Start loader → redirect
  function startLoadingAndRedirect(days: number) {
    setShowDaysModal(false);
    setLoading(true);

    const params = new URLSearchParams({
      destination,
      description,
      pace,
      days: String(days),
      types: tripTypes.join(","),
      interests,
    });

    setTimeout(() => {
      router.push(`/itinerary?${params.toString()}`);
    }, 1500);
  }

  return (
    <div className="bg-black min-h-screen text-white relative">
      <NavBar />

      {/* Cinematic Loader */}
      {loading && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="flex gap-4 mb-6 text-3xl">
            <span className="animate-bounce">✈️</span>
            <span className="animate-bounce delay-150">📍</span>
            <span className="animate-bounce delay-300">📷</span>
            <span className="animate-bounce delay-500">🌍</span>
          </div>
          <p className="text-xl font-medium">Crafting your itinerary…</p>
        </div>
      )}

      {/* Days Modal */}
      {showDaysModal && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 text-center max-w-xs w-full">
            <p className="text-sm text-slate-300 mb-6">
              How long is your trip?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => startLoadingAndRedirect(3)}
                className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium"
              >
                3 days (weekend)
              </button>
              <button
                onClick={() => startLoadingAndRedirect(5)}
                className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium"
              >
                5 days (full week)
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6 pt-20 pb-20">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Plan your trip
        </h1>
        <p className="text-slate-400 text-sm md:text-base mb-12">
          Tell us what you’re dreaming of — destination, dates, vibe, pace, interests.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Description */}
          <div>
            <label className="block text-xs text-slate-400 mb-2">
              Describe your trip
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: 5 days in Tokyo with my partner. We love food, design, quiet mornings…"
              className="w-full h-40 px-4 py-3 rounded-xl bg-white text-black text-sm resize-none"
            />
          </div>

          {/* Trip Types */}
          <div>
            <label className="block text-xs text-slate-400 mb-3">
              Trip type (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {allTripTypes.map((type) => {
                const selected = tripTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleTripType(type)}
                    className={`px-3 py-1.5 rounded-full text-[11px] border transition-colors ${
                      selected
                        ? "bg-white text-black border-white"
                        : "border-white/20 text-slate-300 hover:border-white/60"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-xs text-slate-400 mb-2">
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Paris, Tokyo, New York…"
              className="w-full px-4 py-3 rounded-xl bg-white text-black text-sm"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-slate-400 mb-2">
                Start date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white text-black text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2">
                End date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white text-black text-sm"
              />
            </div>
          </div>

          {/* Pace */}
          <div>
            <label className="block text-xs text-slate-400 mb-2">
              Travel pace
            </label>
            <select
              value={pace}
              onChange={(e) => setPace(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white text-black text-sm"
            >
              <option value="">Select</option>
              <option value="Slow">Slow & relaxed</option>
              <option value="Balanced">Balanced</option>
              <option value="Fast">Fast & packed</option>
            </select>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-xs text-slate-400 mb-2">
              Interests (optional)
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Food, museums, nightlife, shopping…"
              className="w-full px-4 py-3 rounded-xl bg-white text-black text-sm"
            />
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-sm"
          >
            Build my trip →
          </button>
        </form>
      </div>
    </div>
  );
}