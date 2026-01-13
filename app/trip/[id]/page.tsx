import { getServerSession } from "next-auth";
import authConfig from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface TripPageProps {
  params: {
    id: string;
  };
}

export default async function TripDetailPage({ params }: TripPageProps) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <p>You must be logged in to view this trip.</p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
  });

  if (!trip || trip.userId !== user?.id) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{trip.destination}</h1>

      <p className="text-gray-600 mb-2">
        Saved on {new Date(trip.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Trip Details</h2>
        <pre className="text-sm text-gray-700 whitespace-pre-wrap">
          {JSON.stringify(trip, null, 2)}
        </pre>
      </div>
    </div>
  );
}