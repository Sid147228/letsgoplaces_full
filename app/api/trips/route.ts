import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // ⭐ FIX: Prisma requires title
    const generatedTitle =
      body.title ||
      `${body.destination || "Trip"} - ${body.days || ""} Days`.trim();

    const trip = await prisma.trip.create({
      data: {
        title: generatedTitle, // ⭐ REQUIRED FIELD
        destination: body.destination,
        days: body.days,
        pace: body.pace,
        vibes: body.vibes,
        groupType: body.groupType,
        notes: body.notes,
        itineraryJson: body.itineraryJson,
        userId: session.user.id,
      },
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    console.error("Error creating trip:", error);
    return NextResponse.json(
      { error: "Failed to create trip" },
      { status: 500 }
    );
  }
}
