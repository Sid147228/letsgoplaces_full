"use client";

import React, { useState, useEffect, FormEvent } from "react";
import NavBar from "../components/NavBar";

type TripSummary = {
  destination: string;
  days: string;
  style: string;
  pace: string;
  interests: string[];
  tripTypes: string[];
};

type ItineraryDay = {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
};

export default function PlanPage() {
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [tripTypes, setTripTypes] = useState<string[]>([]);
  const [summary, setSummary] = useState<TripSummary>({
    destination: "",
    days: "",
    style: "",
    pace: "",
    interests: [],
    tripTypes: [],
  });

  const [loading, setLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<ItineraryDay[] | null>(null);

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

  // Destination detection
  function detectDestination(text: string) {
    const t = text.toLowerCase();
    if (t.includes("paris")) return "Paris";
    if (t.includes("tokyo")) return "Tokyo";
    if (t.includes("new york") || t.includes("nyc")) return "New York";
    return "";
  }

  // Live parsing logic
  useEffect(() => {
    const combined = (description + " " + destination).toLowerCase();

    const detectedDestination = detectDestination(combined);

    // Detect days (e.g., "5 days")
    const daysMatch = combined.match(/(\d+)\s*days?/);
    const days = daysMatch ? daysMatch[1] : "";

    // Detect travel style
    let style = "";
    if (combined.includes("couple") || combined.includes("partner")) style = "Couple";
    if (combined.includes("family")) style = "Family";
    if (combined.includes("solo")) style = "Solo";
    if (combined.includes("friends")) style = "Friends";

    // Detect pace
    let pace = "";
    if (combined.includes("slow") || combined.includes("relaxed")) pace = "Slow & relaxed";
    if (combined.includes("balanced")) pace = "Balanced";
    if (combined.includes("fast") || combined.includes("packed")) pace = "Fast & packed";

    // Detect interests
    const interestKeywords = [
      "food",
      "design",
      "museums",
      "nightlife",
      "shopping",
      "cafes",
      "parks",
      "coffee",
      "art",
    ];
    const interests = interestKeywords.filter((word) => combined.includes(word));

    setSummary({
      destination: detectedDestination,
      days,
      style,
      pace,
      interests,
      tripTypes,
    });
  }, [description, destination, tripTypes]);

  // Toggle trip type selection
  function toggleTripType(type: string) {
    setGeneratedItinerary(null); // reset when user changes filters
    setTripTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  // Simple inline "generator" for now (we’ll later swap with real AI)
  function buildMockItinerary(): ItineraryDay[] {
    const dest = summary.destination || "Your destination";
    const daysCount = summary.days ? parseInt(summary.days, 10) || 3 : 3;
    const baseTypes = summary.tripTypes.length > 0 ? summary.tripTypes.join(", ").toLowerCase() : "";
    const interestText =
      summary.interests.length > 0 ? summary.interests.join(", ").toLowerCase() : "";

    const result: ItineraryDay[] = [];

    for (let i = 1; i <= Math.min(daysCount, 5); i++) {
      result.push({
        day: i,
        title: `Day ${i} in ${dest}`,
        morning: `Slow morning exploring a neighborhood that matches your vibe, with coffee and a light walk. Focus on ${baseTypes || interestText || "local highlights"}.`,
        afternoon: `Afternoon spent discovering a mix of must-see spots and quieter corners. We’ll keep things ${summary.pace || "balanced"} so it never feels rushed.`,
        evening: `Evening with a ${baseTypes || "curated"} spot for dinner and a relaxed way to end the day — think views, atmosphere, and places that feel like you.`,
      });
    }

    return result;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setGeneratedItinerary(null);

    // Simulate "AI thinking" for now
    setTimeout(() => {
      const mock = buildMockItinerary();
      setGeneratedItinerary(mock);
      setLoading(false);
    }, 1500);
  }

  return (
    <div className="bg-black min-h-screen text-white relative">
      <NavBar />

      {/* Cinematic Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <p className="text-xl font-medium mb-4">Building your trip…</p>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6 pt-20 pb-20">
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

          {/* Trip Type Selector (pills) */}
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

          {/* Trip Summary Preview */}
          <div className="mt-10 p-5 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-semibold mb-3">Trip summary</h3>

            <div className="space-y-2 text-xs text-slate-300">
              <p>
                <span className="text-slate-400">Destination:</span>{" "}
                {summary.destination || "—"}
              </p>
              <p>
                <span className="text-slate-400">Days:</span>{" "}
                {summary.days || "—"}
              </p>
              <p>
                <span className="text-slate-400">Travel style:</span>{" "}
                {summary.style || "—"}
              </p>
              <p>
                <span className="text-slate-400">Pace:</span>{" "}
                {summary.pace || "—"}
              </p>
              <p>
                <span className="text-slate-400">Trip type:</span>{" "}
                {summary.tripTypes.length > 0
                  ? summary.tripTypes.join(", ")
                  : "—"}
              </p>
              <p>
                <span className="text-slate-400">Interests:</span>{" "}
                {summary.interests.length > 0
                  ? summary.interests.join(", ")
                  : "—"}
              </p>
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
            For now, this generates a sample itinerary on this page.
          </p>
        </form>

        {/* Generated Itinerary Section */}
        {generatedItinerary && (
          <section className="mt-16 border-t border-white/10 pt-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Your sample itinerary
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              This is a simple preview. Later, this will be powered by a full AI engine with maps,
              restaurants, and more.
            </p>

            <div className="space-y-6">
              {generatedItinerary.map((day) => (
                <div
                  key={day.day}
                  className="rounded-xl bg-white/5 border border-white/10 p-4 text-xs space-y-3"
                >
                  <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">
                    Day {day.day}
                  </p>
                  <p className="text-sm font-medium text-white">{day.title}</p>
                  <div className="space-y-2 text-slate-300">
                    <p>
                      <span className="text-slate-400">Morning:</span> {day.morning}
                    </p>
                    <p>
                      <span className="text-slate-400">Afternoon:</span> {day.afternoon}
                    </p>
                    <p>
                      <span className="text-slate-400">Evening:</span> {day.evening}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}