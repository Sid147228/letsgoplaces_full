// app/plan/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlanTrip() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("medium");
  const [style, setStyle] = useState("balanced");
  const [interests, setInterests] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams({
      destination,
      startDate,
      endDate,
      budget,
      style,
      interests,
    });

    router.push(`/generate?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-3">
          Plan Your Perfect Trip
        </h1>
        <p className="text-center text-slate-300 mb-10">
          Tell LetsGoPlaces how you like to travel and we&apos;ll build a calm, smart itinerary for you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10"
        >
          {/* Destination */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Destination
            </label>
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Paris, Tokyo, New York..."
              className="w-full px-4 py-3 rounded-lg bg-white text-black"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Start Date
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-black"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                End Date
              </label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-black"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Budget Level
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white text-black"
            >
              <option value="budget">Budget</option>
              <option value="medium">Medium</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          {/* Travel Style */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Travel Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white text-black"
            >
              <option value="relaxed">Relaxed</option>
              <option value="balanced">Balanced</option>
              <option value="adventurous">Adventurous</option>
            </select>
          </div>

          {/* Interests */}
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Interests (comma separated)
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Food, nightlife, museums, nature..."
              className="w-full px-4 py-3 rounded-lg bg-white text-black"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-slate-200 transition"
          >
            Generate My Trip
          </button>
        </form>
      </div>
    </main>
  );
}