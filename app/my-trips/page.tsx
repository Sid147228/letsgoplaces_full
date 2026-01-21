import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getDestinationImage } from "@/lib/getDestinationImage";

export default async function MyTripsPage() {
  const session = await getServerSession(authOptions);

  // Full protection: redirect if not logged in
  if (!session || !session.user?.id) {
    redirect("/auth/signin");
  }

  const userId = session.user.id;

  // Fetch trips for this user
  const trips = await prisma.trip.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  // Empty state
  if (trips.length === 0) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-semibold">No trips saved yet.</h2>
        <p className="text-slate-400 mt-2">Start planning your first adventure.</p>

        <Link
          href="/plan"
          className="inline-block mt-6 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold"
        >
          Plan a trip
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">My Trips</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => {
          const image = getDestinationImage(trip.destination);

          return (
            <Link
              key={trip.id}
              href={`/trip/${trip.id}`}
              className="group rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur hover:bg-black/60 transition shadow-sm hover:shadow-lg"
            >
              {/* Thumbnail */}
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={image}
                  alt={trip.destination}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{trip.destination}</h3>

                {trip.days && (
                  <p className="text-slate-400 text-sm">{trip.days} days</p>
                )}

                <p className="text-xs text-slate-500 mt-2">
                  Created on {new Date(trip.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
