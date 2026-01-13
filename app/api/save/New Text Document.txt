import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();

  const {
    destination,
    days,
    pace,
    vibes,
    groupType,
    notes,
    itineraryJson,
  } = body;

  // Ensure user exists
  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: {
      email: session.user.email,
      name: session.user.name || "",
      image: session.user.image || "",
    },
  });

  // Save trip
  const trip = await prisma.trip.create({
    data: {
      userId: user.id,
      destination,
      days,
      pace,
      vibes,
      groupType,
      notes,
      itineraryJson,
    },
  });

  return NextResponse.json({ success: true, trip });
}