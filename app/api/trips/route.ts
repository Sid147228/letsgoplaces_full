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

  const {
    title,
    destination,
    imageUrl,
    startDate,
    endDate,
    days,
    pace,
    vibes,
    groupType,
    notes,
    itineraryJson,
  } = body;

  const trip = await prisma.trip.create({
    data: {
      title,
      destination,
      imageUrl,
      startDate,
      endDate,
      days,
      pace,
      vibes,
      groupType,
      notes,
      itineraryJson,
      user: {
        connect: { id: session.user.id },
      },
    },
  });

  return NextResponse.json(trip, { status: 201 });
}