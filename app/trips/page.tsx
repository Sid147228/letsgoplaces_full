"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

type Trip = {
  id: string;
  destination: string;
  days: number;
  createdAt: string;
};

export default function TripsPage() {
  const { data: session, status } = useSession();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    // If user is not logged in → trigger Google login
    if (!session) {
      signIn("google");
      return;
    }

    async function fetchTrips() {
      const res = await fetch("/api/trips/list");
      const data = await res.json();
      setTrips(data.trips || []);
      setLoading(false);
    }

    fetchTrips();
  }, [session, status]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-10">
        <p className="text-slate-400">Loading your trips…</p>
      </main>
    );
  }

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
              {trip.days} days • Saved on{" "}
              {new Date(trip.createdAt).toLocaleDateString()}
            </p>

            <div className="flex gap-3">
              <Link
                href={`/trips/${trip.id}`}
                className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold"
              >
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}