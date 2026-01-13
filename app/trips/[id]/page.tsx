"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

type Trip = {
  id: string;
  destination: string;
  days: number;
  pace: string;
  vibes: string;
  groupType: string;
  notes: string;
  itineraryJson: any[];
  createdAt: string;
};

export default function TripPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch trip from DB
  useEffect(() => {
    if (!id) return;

    if (status === "loading") return;

    if (!session) {
      signIn("google");
      return;
    }

    async function fetchTrip() {
      const res = await fetch(`/api/trips/get?id=${id}`);
      const data = await res.json();

      if (!data.trip) {
        router.push("/trips");
        return;
      }

      setTrip(data.trip);
      setLoading(false);
    }

    fetchTrip();
  }, [id, session, status, router]);

  if (loading || !trip) {
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
        </div>
      </nav>

      {/* TRIP HEADER */}
      <header className="max-w-5xl mx-auto px-4 py-10 fade-in">
        <h1 className="text-4xl font-bold mb-2">
          {trip.destination}: {trip.days}-day itinerary
        </h1>

        <p className="text-slate-300 text-sm">
          Saved on {new Date(trip.createdAt).toLocaleDateString()}
        </p>

        <div className="text-slate-400 text-sm mt-2 space-y-1">
          {trip.pace && <p>Pace: {trip.pace}</p>}
          {trip.vibes && <p>Vibes: {trip.vibes}</p>}
          {trip.groupType && <p>Group: {trip.groupType}</p>}
          {trip.notes && <p>Notes: {trip.notes}</p>}
        </div>
      </header>

      {/* ITINERARY */}
      <section className="max-w-5xl mx-auto px-4 space-y-6 pb-20">
        {trip.itineraryJson.map((day: any, index: number) => (
          <article
            key={index}
            className="rounded-xl border border-white/10 bg-white/5 p-6 fade-up"
          >
            <h2 className="text-2xl font-semibold mb-4">Day {day.day}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-slate-400 uppercase text-xs mb-1">Morning</p>
                <p>{day.morning?.title}</p>
                <p className="text-slate-400 text-xs">{day.morning?.desc}</p>
              </div>

              <div>
                <p className="text-slate-400 uppercase text-xs mb-1">Afternoon</p>
                <p>{day.afternoon?.title}</p>
                <p className="text-slate-400 text-xs">{day.afternoon?.desc}</p>
              </div>

              <div>
                <p className="text-slate-400 uppercase text-xs mb-1">Evening</p>
                <p>{day.evening?.title}</p>
                <p className="text-slate-400 text-xs">{day.evening?.desc}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}