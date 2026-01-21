import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const trip = await prisma.trip.findUnique({ where: { id } });

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    const newTrip = await prisma.trip.create({
      data: {
        userId: trip.userId,
        title: `Copy of ${trip.title}`,
        destination: trip.destination,
        days: trip.days,
        pace: trip.pace,
        vibes: trip.vibes,
        groupType: trip.groupType,
        notes: trip.notes,

        // ⭐ FIX: Convert Prisma JsonValue → InputJsonValue
        itineraryJson: JSON.parse(JSON.stringify(trip.itineraryJson)),

        publicId: null, // new trip should not be public
        heroImage: trip.heroImage ?? null, // keep hero image if exists
      },
    });

    return NextResponse.json(newTrip);
  } catch (err) {
    console.error("Duplicate trip failed:", err);
    return NextResponse.json(
      { error: "Unable to duplicate trip" },
      { status: 500 }
    );
  }
}
