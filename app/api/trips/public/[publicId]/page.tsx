"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getActivityIcon } from "@/app/components/ui/ActivityIcon";

export default function PublicTripPage() {
  const params = useParams();
  const publicId = params?.publicId as string;

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTrip() {
      try {
        const res = await fetch(`/api/trips/public/${publicId}`);
        if (!res.ok) {
          setTrip(null);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setTrip(data);

        const raw =
          typeof data.itineraryJson === "string"
            ? data.itineraryJson
            : JSON.stringify(data.itineraryJson || []);

        setItinerary(JSON.parse(raw));
      } catch (err) {
        console.error("Failed to load public trip:", err);
        setTrip(null);
      } finally {
        setLoading(false);
      }
    }

    if (publicId) fetchTrip();
  }, [publicId]);

  if (loading) {
    return (
      <div className="text-white text-center py-20">
        Loading trip…
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="text-white text-center py-20">
        This trip is no longer available.
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pb-20">
      {/* Header */}
      <header className="py-10 text-center space-y-2 border-b border-white/10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {trip.title}
        </h1>

        <p className="text-slate-400 text-sm">
          {trip.destination} • {trip.days} days
        </p>

        <p className="text-xs text-slate-500 mt-2">
          Public trip — shared via LetsGoPlaces
        </p>
      </header>

      {/* Itinerary */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {itinerary.map((day: any, index: number) => (
          <div key={index} className="space-y-6">
            <h2 className="text-xl font-semibold">Day {day.day}</h2>

            {/* Morning */}
            <div className="flex gap-4 items-start">
              {getActivityIcon("morning")}
              <div>
                <h3 className="font-semibold">{day.morning.title}</h3>
                <p className="text-slate-400 text-sm">{day.morning.desc}</p>
              </div>
            </div>

            {/* Afternoon */}
            <div className="flex gap-4 items-start">
              {getActivityIcon("afternoon")}
              <div>
                <h3 className="font-semibold">{day.afternoon.title}</h3>
                <p className="text-slate-400 text-sm">{day.afternoon.desc}</p>
              </div>
            </div>

            {/* Evening */}
            <div className="flex gap-4 items-start">
              {getActivityIcon("evening")}
              <div>
                <h3 className="font-semibold">{day.evening.title}</h3>
                <p className="text-slate-400 text-sm">{day.evening.desc}</p>
              </div>
            </div>

            <hr className="border-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
