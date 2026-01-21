import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

// GET /api/trips → return all trips for logged-in user
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

// POST /api/trips → create a new trip
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await req.json();

  try {
    const newTrip = await prisma.trip.create({
      data: {
        userId,
        title: body.destination || "My Trip",
        destination: body.destination,
        days: body.days,
        pace: body.pace,
        vibes: body.vibes,
        groupType: body.groupType,
        notes: body.notes,
        itineraryJson: body.itineraryJson,
      },
    });

    return NextResponse.json(newTrip);
  } catch (err) {
    console.error("Error creating trip:", err);
    return NextResponse.json(
      { error: "Failed to create trip" },
      { status: 500 }
    );
  }
}
