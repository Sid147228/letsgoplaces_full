"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlanPage() {
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");

  // Detect destination from user input
  function detectDestination() {
    const text = (description + " " + destination).toLowerCase();

    if (text.includes("paris")) return "paris";
    if (text.includes("tokyo")) return "tokyo";
    if (text.includes("new york") || text.includes("nyc")) return "newyork";

    return null;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const detected = detectDestination();

    if (detected) {
      router.push(`/sample/${detected}`);
    } else {
      router.push("/sample/paris"); // fallback for now
    }
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-2xl mx-auto px-6 py-20">
        
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Plan your trip
        </h1>
        <p className="text-slate-400 text-sm md:text-base mb-12">
          Tell us what you’re dreaming of — destination, dates, vibe, pace, interests.
          The more you share, the better your itinerary becomes.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Freeform Trip Description */}
          <div>
            <label className="block text-xs text-slate-400 mb-2">
              Describe your trip
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: 5 days in Tokyo in April with my partner. We love food, design, quiet mornings, and exploring neighborhoods at a relaxed pace."
              className="w-full h-40 px-4 py-3 rounded-xl bg-white text-black placeholder-slate-500 text-sm resize-none"
            />
            <p className="text-[11px] text-slate-500 mt-2">
              You can write as much or as little as you like.
            </p>
          </div>

          {/* Optional Structured Inputs */}
          <div className="space-y-6">

            {/* Destination */}
            <div>
              <label className="block text-xs text-slate-400 mb-2">
                Destination (optional)
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Paris, Tokyo, New York..."
                className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-slate-500 text-sm"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-slate-400 mb-2">
                  Start date (optional)
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl bg-white text-black text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-2">
                  End date (optional)
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl bg-white text-black text-sm"
                />
              </div>
            </div>

            {/* Travel style */}
            <div>
              <label className="block text-xs text-slate-400 mb-2">
                Who are you traveling with? (optional)
              </label>
              <select className="w-full px-4 py-3 rounded-xl bg-white text-black text-sm">
                <option value="">Select</option>
                <option value="couple">Couple</option>
                <option value="family">Family</option>
                <option value="solo">Solo</option>
                <option value="friends">Friends</option>
              </select>
            </div>

            {/* Pace */}
            <div>
              <label className="block text-xs text-slate-400 mb-2">
                Travel pace (optional)
              </label>
              <select className="w-full px-4 py-3 rounded-xl bg-white text-black text-sm">
                <option value="">Select</option>
                <option value="slow">Slow & relaxed</option>
                <option value="balanced">Balanced</option>
                <option value="fast">Fast & packed</option>
              </select>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-xs text-slate-400 mb-2">
                Interests (optional)
              </label>
              <input
                type="text"
                placeholder="Food, museums, nightlife, shopping..."
                className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-slate-500 text-sm"
              />
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white font-semibold text-sm"
          >
            Build my trip →
          </button>

          <p className="text-center text-xs text-slate-500 mt-4">
            For now, this will show you a sample itinerary.
          </p>
        </form>
      </div>
    </div>
  );
}