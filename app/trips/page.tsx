"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type TripSummary = {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
};

export default function TripsPage() {
  const [trips, setTrips] = useState<TripSummary[]>([]);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith("trip-"));
    const list = keys.map((key) => {
      const t = JSON.parse(localStorage.getItem(key) || "{}");
      return {
        id: t.id,
        destination: t.destination,
        startDate: t.startDate,
        endDate: t.endDate,
      };
    });
    setTrips(list);
  }, []);

  const deleteTrip = (id: string) => {
    localStorage.removeItem(`trip-${id}`);
    setTrips((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">My Trips</h1>

      {trips.length === 0 && (
        <p className="text-slate-400">No trips saved yet. Start planning!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="border border-white/10 bg-white/5 p-6 rounded-xl fade-up"
          >
            <h2 className="text-xl font-semibold mb-1">{trip.destination}</h2>
            <p className="text-slate-400 text-sm mb-4">
              {trip.startDate} → {trip.endDate}
            </p>

            <div className="flex gap-3">
              <Link
                href={`/trip/${trip.id}?id=${trip.id}`}
                className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold"
              >
                View Trip
              </Link>
              <button
                onClick={() => deleteTrip(trip.id)}
                className="px-4 py-2 rounded-full border border-white/20 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}