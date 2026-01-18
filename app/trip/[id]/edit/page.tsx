import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditTripForm from "@app/components/EditTripForm";

export default async function EditTripPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return notFound();
  }

  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
  });

  if (!trip || trip.userId !== session.user.id) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Trip</h1>
      <EditTripForm trip={trip} />
    </div>
  );
}
