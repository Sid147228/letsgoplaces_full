"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type ItineraryDay = {
  day: number;
  title: string;
  summary: string;
  morning: string;
  afternoon: string;
  evening: string;
};

type Trip = {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  style: string;
  interests: string[];
  days: ItineraryDay[];
};

export default function GenerateTripPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const destination = searchParams.get("destination") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const budget = searchParams.get("budget") || "";
  const style = searchParams.get("style") || "";
  const interests = searchParams.get("interests") || "";

  useEffect(() => {
    if (!destination || !startDate || !endDate) {
      setError("Missing required trip details. Please start again.");
      setLoading(false);
      return;
    }

    const generateTrip = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/generate-trip", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            destination,
            startDate,
            endDate,
            budget,
            style,
            interests,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to generate trip");
        }

        const data = (await res.json()) as Trip;
        setTrip(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while generating your trip.");
      } finally {
        setLoading(false);
      }
    };

    generateTrip();
  }, [destination, startDate, endDate, budget, style, interests]);

  const handleRegenerate = () => {
    // For now just re-call the API with the same params
    router.refresh();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sm text-slate-400 mb-3">Crafting your trip...</p>
          <h1 className="text-3xl font-semibold mb-2">
            Building a calm itinerary for {destination}
          </h1>
          <p className="text-slate-300">
            LetsGoPlaces is piecing together days that match your style.
          </p>
        </div>
      </main>
    );
  }

  if (error || !trip) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || "Something went wrong."}</p>
          <button
            onClick={() => router.push("/plan")}
            className="px-4 py-2 rounded-full bg-white text-black font-semibold"
          >
            Back to Planner
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400 mb-1">Your AI‑crafted itinerary</p>
            <h1 className="text-3xl md:text-4xl font-bold">
              {trip.destination}: {trip.days.length}‑day trip
            </h1>
            <p className="text-slate-300 mt-2 text-sm">
              {trip.startDate} → {trip.endDate} • {trip.budget} budget • {trip.style} style
            </p>
            {trip.interests.length > 0 && (
              <p className="text-slate-400 text-sm mt-1">
                Focused on: {trip.interests.join(", ")}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/plan")}
              className="px-4 py-2 rounded-full border border-white/30 text-sm"
            >
              Start Over
            </button>
            <button
              onClick={handleRegenerate}
              className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold"
            >
              Regenerate Trip
            </button>
          </div>
        </header>

        <section className="space-y-6">
          {trip.days.map((day) => (
            <article
              key={day.day}
              className="rounded-xl border border-white/10 bg-white/5 p-5 md:p-6"
            >
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-xl font-semibold">{day.title}</h2>
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  Day {day.day}
                </span>
              </div>
              <p className="text-slate-300 text-sm mb-4">{day.summary}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 uppercase text-xs mb-1">Morning</p>
                  <p className="text-slate-100">{day.morning}</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase text-xs mb-1">Afternoon</p>
                  <p className="text-slate-100">{day.afternoon}</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase text-xs mb-1">Evening</p>
                  <p className="text-slate-100">{day.evening}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}