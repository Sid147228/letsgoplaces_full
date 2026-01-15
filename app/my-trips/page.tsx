import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function MyTripsPage() {
  const session = await auth();

  if (!session || !session.user?.email) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">You must be logged in to view your trips.</h2>
      </div>
    );
  }

  const trips = await prisma.trip.findMany({
    where: {
      userEmail: session.user.email,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (trips.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">No trips saved yet.</h2>
        <p className="text-gray-500 mt-2">Start planning your first adventure.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Trips</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <Link
            key={trip.id}
            href={`/trip/${trip.id}`}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {trip.imageUrl && (
              <img
                src={trip.imageUrl}
                alt={trip.title}
                className="w-full h-40 object-cover rounded"
              />
            )}

            <h3 className="text-xl font-semibold mt-3">{trip.title}</h3>
            <p className="text-gray-600">{trip.destination}</p>

            {trip.startDate && trip.endDate && (
              <p className="text-sm text-gray-500 mt-1">
                {trip.startDate} → {trip.endDate}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
