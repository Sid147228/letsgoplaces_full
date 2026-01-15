import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function TripDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">You must be logged in to view this trip.</h2>
      </div>
    );
  }

  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
  });

  if (!trip) {
    return notFound();
  }

  if (trip.userEmail !== session.user.email) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">You do not have access to this trip.</h2>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{trip.title}</h1>

      <p className="text-gray-600 text-lg mb-2">{trip.destination}</p>

      {trip.startDate && trip.endDate && (
        <p className="text-gray-500 mb-4">
          {trip.startDate} → {trip.endDate}
        </p>
      )}

      {trip.imageUrl && (
        <img
          src={trip.imageUrl}
          alt={trip.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      {trip.days && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Trip Duration</h2>
          <p>{trip.days} days</p>
        </div>
      )}

      {trip.tripData && (
        <div>
          <h2 className="text-2xl font-semibold mb-3">Itinerary</h2>
          <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap text-sm">
            {JSON.stringify(trip.tripData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
