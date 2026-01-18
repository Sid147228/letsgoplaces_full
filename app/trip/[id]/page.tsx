"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import prisma from "@/lib/prisma";
import ActivityIcon from "@/app/components/ui/ActivityIcon";
import DeleteTripButton from "@/app/components/DeleteTripButton";

export default function TripDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTrip() {
      try {
        const res = await fetch(`/api/trips/${id}`);
        const data = await res.json();
        setTrip(data);

        // ⭐ FIX: Safely parse itineraryJson regardless of type
        const raw =
          typeof data.itineraryJson === "string"
            ? data.itineraryJson
            : JSON.stringify(data.itineraryJson || []);

        const parsed = JSON.parse(raw);
        setItinerary(parsed);
      } catch (err) {
        console.error("Failed to load trip:", err);
        setItinerary([]);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="text-white text-center py-20">
        Loading your trip...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="text-white text-center py-20">
        Trip not found.
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

        <div className="flex justify-center mt-4">
          <DeleteTripButton tripId={trip.id} />
        </div>
      </header>

      {/* Itinerary */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {itinerary.map((day: any, index: number) => (
          <div key={index} className="space-y-6">
            <h2 className="text-xl font-semibold">Day {day.day}</h2>

            {/* Morning */}
            <div className="flex gap-4 items-start">
              <ActivityIcon type="morning" />
              <div>
                <h3 className="font-semibold">{day.morning.title}</h3>
                <p className="text-slate-400 text-sm">{day.morning.desc}</p>
              </div>
            </div>

            {/* Afternoon */}
            <div className="flex gap-4 items-start">
              <ActivityIcon type="afternoon" />
              <div>
                <h3 className="font-semibold">{day.afternoon.title}</h3>
                <p className="text-slate-400 text-sm">{day.afternoon.desc}</p>
              </div>
            </div>

            {/* Evening */}
            <div className="flex gap-4 items-start">
              <ActivityIcon type="evening" />
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
