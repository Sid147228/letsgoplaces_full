import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface TripPageProps {
  params: {
    id: string;
  };
}

export default async function TripPage({ params }: TripPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">You must be logged in to view this trip.</h2>
      </div>
    );
  }

  const trip = await prisma.trip.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!trip || trip.userId !== session.user.id) {
    return notFound();
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{trip.destination}</h1>

      <div className="text-gray-600 mb-4">
        <p><strong>Days:</strong> {trip.days}</p>

        {trip.pace && (
          <p><strong>Pace:</strong> {trip.pace}</p>
        )}

        {trip.vibes && (
          <p><strong>Vibes:</strong> {trip.vibes}</p>
        )}

        {trip.groupType && (
          <p><strong>Group Type:</strong> {trip.groupType}</p>
        )}

        {trip.notes && (
          <p className="mt-2"><strong>Notes:</strong> {trip.notes}</p>
        )}
      </div>

      {trip.itineraryJson && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Itinerary</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(trip.itineraryJson, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
