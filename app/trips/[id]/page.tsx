import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

import DestinationDeals from "@/app/components/deals/DestinationDeals";
import { AffiliateBookingCard } from "@/components/affiliate/AffiliateBookingCard";

interface TripPageProps {
  params: {
    id: string;
  };
}

export default async function TripDetailsPage({ params }: TripPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">You must be logged in to view this trip.</h2>
      </div>
    );
  }

  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
  });

  if (!trip || trip.userId !== session.user.id) {
    return notFound();
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-10">
      {/* Trip Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">{trip.destination}</h1>

        <div className="text-gray-400 mb-4 space-y-1">
          <p><strong>Days:</strong> {trip.days}</p>
          {trip.pace && <p><strong>Pace:</strong> {trip.pace}</p>}
          {trip.vibes && <p><strong>Vibes:</strong> {trip.vibes}</p>}
          {trip.groupType && <p><strong>Group Type:</strong> {trip.groupType}</p>}
          {trip.notes && (
            <p className="mt-2"><strong>Notes:</strong> {trip.notes}</p>
          )}
        </div>
      </div>

      {/* Recommended Deals (Supabase) */}
      <DestinationDeals destination={trip.destination} tripId={trip.id} />

      {/* Affiliate Booking Suggestions */}
      <div className="space-y-4">
        <AffiliateBookingCard
          type="hotel"
          name={`${trip.destination} Hotels`}
          destination={trip.destination}
          tripId={trip.id}
        />

        <AffiliateBookingCard
          type="activity"
          name={`Top Activities in ${trip.destination}`}
          destination={trip.destination}
          tripId={trip.id}
        />
      </div>

      {/* Itinerary JSON */}
      {trip.itineraryJson && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Itinerary</h2>
          <pre className="bg-white/5 border border-white/10 p-4 rounded text-sm overflow-x-auto text-gray-300">
            {JSON.stringify(trip.itineraryJson, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
