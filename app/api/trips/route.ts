import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

// GET — fetch all trips for the logged‑in user
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trips = await prisma.trip.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(trips);
}

// POST — create a new trip
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  try {
    const trip = await prisma.trip.create({
      data: {
        destination: body.destination,
        days: body.days,
        pace: body.pace,
        vibes: body.vibes,
        groupType: body.groupType,
        notes: body.notes,
        itineraryJson: body.itineraryJson,
        userId: session.user.id, // direct relation
      },
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (err) {
    console.error("Error saving trip:", err);
    return NextResponse.json(
      { error: "Failed to save trip" },
      { status: 500 }
    );
  }
}
