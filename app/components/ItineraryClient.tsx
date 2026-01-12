"use client";

import { useSearchParams } from "next/navigation";
import NavBar from "../components/NavBar";

export default function ItineraryClient() {
  const params = useSearchParams();

  const destination = params.get("destination") || "Your destination";
  const description = params.get("description") || "";
  const days = Number(params.get("days") || 3);
  const pace = params.get("pace") || "Balanced";
  const types = params.get("types")?.split(",").filter(Boolean) || [];
  const interests = params.get("interests")?.split(",").filter(Boolean) || [];

  function generateDay(day: number) {
    const vibe = types[0] || "local";
    const interest = interests[0] || "culture";

    return {
      morning: `Explore a calm neighborhood in ${destination}. Start with a coffee and a light walk. Focus on ${vibe.toLowerCase()} and ${interest.toLowerCase()} vibes.`,
      afternoon: `Visit a signature spot that reflects your interests. Keep the pace ${pace.toLowerCase()} to avoid rushing.`,
      evening: `Dinner at a curated restaurant followed by a relaxed evening activity that matches your trip type.`,
    };
  }

  const itinerary = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    ...generateDay(i + 1),
  }));

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />

      <div className="max-w-3xl mx-auto px-6 pt-20 pb-20">
        <div className="mb-12 p-6 rounded-xl bg-white/5 border border-white/10">
          <h1 className="text-2xl font-semibold mb-4">
            Your {days}-day trip to {destination}
          </h1>
          <div className="space-y-2 text-sm text-slate-300">
            <p><span className="text-slate-400">Pace:</span> {pace}</p>
            <p><span className="text-slate-400">Trip types:</span> {types.join(", ") || "—"}</p>
            <p><span className="text-slate-400">Interests:</span> {interests.join(", ") || "—"}</p>
            <p><span className="text-slate-400">Your brief:</span> {description || "—"}</p>
          </div>
        </div>

        <div className="space-y-8">
          {itinerary.map((day) => (
            <div
              key={day.day}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-2">
                Day {day.day}
              </p>

              <div className="space-y-4 text-sm text-slate-300">
                <p><span className="text-slate-400">Morning:</span> {day.morning}</p>
                <p><span className="text-slate-400">Afternoon:</span> {day.afternoon}</p>
                <p><span className="text-slate-400">Evening:</span> {day.evening}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}