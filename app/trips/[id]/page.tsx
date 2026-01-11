"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type ItineraryDay = {
  day: number;
  title: string;
  summary: string;
  morning: string;
  afternoon: string;
  evening: string;
};

type Trip = {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  style: string;
  interests: string[];
  days: ItineraryDay[];
};

export default function TripPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    if (!id) return;

    const stored = localStorage.getItem(`trip-${id}`);
    if (!stored) {
      router.push("/plan");
      return;
    }

    setTrip(JSON.parse(stored));
  }, [id, router]);

  const regenerateTrip = async () => {
    if (!trip) return;

    const res = await fetch("/api/generate-trip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        budget: trip.budget,
        style: trip.style,
        interests: trip.interests.join(", "),
      }),
    });

    const newTrip = await res.json();
    const updated = { ...newTrip, id: trip.id };

    localStorage.setItem(`trip-${trip.id}`, JSON.stringify(updated));
    setTrip(updated);
  };

  const regenerateDay = async (dayIndex: number) => {
    if (!trip) return;

    const res = await fetch("/api/generate-trip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        budget: trip.budget,
        style: trip.style,
        interests: trip.interests.join(", "),
      }),
    });

    const newTrip = await res.json();
    const updated = { ...trip };
    updated.days[dayIndex] = newTrip.days[dayIndex];

    localStorage.setItem(`trip-${trip.id}`, JSON.stringify(updated));
    setTrip(updated);
  };

  if (!trip) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-slate-400">Loading your trip…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVIGATION */}
      <nav className="w-full border-b border-white/10 bg-black/40 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          LetsGoPlaces
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/plan" className="hover:text-white text-slate-300">
            Plan a Trip
          </Link>
          <Link href="/trips" className="hover:text-white text-slate-300">
            My Trips
          </Link>
          <button
            onClick={regenerateTrip}
            className="px-4 py-2 rounded-full bg-white text-black font-semibold"
          >
            Regenerate Trip
          </button>
        </div>
      </nav>

      {/* TRIP HEADER */}
      <header className="max-w-5xl mx-auto px-4 py-10 fade-in">
        <h1 className="text-4xl font-bold mb-2">
          {trip.destination}: {trip.days.length}-day itinerary
        </h1>
        <p className="text-slate-300 text-sm">
          {trip.startDate} → {trip.endDate} • {trip.budget} budget • {trip.style} style
        </p>
        {trip.interests.length > 0 && (
          <p className="text-slate-400 text-sm mt-1">
            Interests: {trip.interests.join(", ")}
          </p>
        )}
      </header>

      {/* ITINERARY */}
      <section className="max-w-5xl mx-auto px-4 space-y-6 pb-20">
        {trip.days.map((day, index) => (
          <article
            key={day.day}
            className="rounded-xl border border-white/10 bg-white/5 p-6 fade-up"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold">{day.title}</h2>
              <button
                onClick={() => regenerateDay(index)}
                className="text-xs px-3 py-1 rounded-full bg-white text-black"
              >
                Regenerate Day
              </button>
            </div>

            <p className="text-slate-300 text-sm mb-4">{day.summary}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-slate-400 uppercase text-xs mb-1">Morning</p>
                <p>{day.morning}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase text-xs mb-1">Afternoon</p>
                <p>{day.afternoon}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase text-xs mb-1">Evening</p>
                <p>{day.evening}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}