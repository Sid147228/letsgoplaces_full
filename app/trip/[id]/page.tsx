import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getActivityIcon } from "@app/components/ui/ActivityIcon";
import DeleteTripButton from "@app/components/DeleteTripButton";

interface TripPageProps {
  params: {
    id: string;
  };
}

export default async function TripPage({ params }: TripPageProps) {
  const session = await getServerSession(authOptions);

  // User must be logged in
  if (!session || !session.user?.id) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-semibold">You must be logged in to view this trip.</h2>
        <p className="text-slate-400 mt-2">Please sign in and try again.</p>
      </div>
    );
  }

  // Fetch trip
  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
  });

  // Trip not found or belongs to another user
  if (!trip || trip.userId !== session.user.id) {
    return notFound();
  }

  // Parse itinerary JSON safely
  let itinerary: any[] = [];
  try {
    itinerary = JSON.parse(trip.itineraryJson || "[]");
  } catch {
    itinerary = [];
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Destination */}
      <h1 className="text-4xl font-bold mb-4">{trip.destination}</h1>

      {/* Meta info */}
      <div className="text-slate-400 mb-6 space-y-1">
        <p><strong className="text-white">Days:</strong> {trip.days}</p>

        {trip.pace && (
          <p><strong className="text-white">Pace:</strong> {trip.pace}</p>
        )}

        {trip.vibes && (
          <p><strong className="text-white">Vibes:</strong> {trip.vibes}</p>
        )}

        {trip.groupType && (
          <p><strong className="text-white">Group Type:</strong> {trip.groupType}</p>
        )}

        {trip.notes && (
          <p className="mt-2">
            <strong className="text-white">Notes:</strong> {trip.notes}
          </p>
        )}

        <p className="text-xs text-slate-500 mt-3">
          Created on {new Date(trip.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Itinerary */}
      <div className="mt-10 space-y-8">
        <h2 className="text-2xl font-semibold mb-2">Itinerary</h2>

        {itinerary.length === 0 && (
          <p className="text-slate-400">No itinerary data available.</p>
        )}

        {itinerary.map((day: any, index: number) => (
          <div
            key={index}
            className="border border-white/10 rounded-xl p-6 bg-black/40 backdrop-blur"
          >
            {/* Day Header */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Day {index + 1}</h3>
              {day.summary && (
                <p className="text-slate-400 text-sm mt-1">{day.summary}</p>
              )}
            </div>

            {/* Activities */}
            <div className="space-y-3">
              {day.activities?.map((activity: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="mt-1">{getActivityIcon(activity)}</div>
                  <p className="text-slate-200">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-white/10 my-10" />

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link
          href="/my-trips"
          className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold"
        >
          Back to My Trips
        </Link>

        <DeleteTripButton tripId={trip.id} />
      </div>
    </div>
  );
}
s