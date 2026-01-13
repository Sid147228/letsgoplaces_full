import { getServerSession } from "next-auth";
import authConfig from "@/auth.config";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function MyTripsPage() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <p>Please log in to view your saved trips.</p>
        <Link href="/" className="text-blue-500 underline mt-4 block">
          Go back home
        </Link>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const trips = await prisma.trip.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">My Saved Trips</h1>

      {trips.length === 0 ? (
        <p className="text-gray-500">You haven’t saved any trips yet.</p>
      ) : (
        <ul className="space-y-4">
          {trips.map((trip) => (
            <li
              key={trip.id}
              className="border rounded-lg p-4 hover:shadow transition"
            >
              <h2 className="text-xl font-semibold">{trip.destination}</h2>
              <p className="text-sm text-gray-500">
                Saved on {new Date(trip.createdAt).toLocaleDateString()}
              </p>
              <Link
                href={`/trip/${trip.id}`}
                className="text-blue-500 underline text-sm mt-2 inline-block"
              >
                View details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}