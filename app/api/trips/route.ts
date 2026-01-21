import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getHeroImage } from "@/lib/getHeroImage";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // ⭐ Generate a fallback title if missing
    const generatedTitle =
      body.title ||
      `${body.destination || "Trip"} - ${body.days || ""} Days`.trim();

    // ⭐ Fetch hero image based on destination
    const heroImage = await getHeroImage(body.destination);

    // ⭐ Create trip with heroImage included
    const trip = await prisma.trip.create({
      data: {
        title: generatedTitle,
        destination: body.destination,
        days: body.days,
        pace: body.pace,
        vibes: body.vibes,
        groupType: body.groupType,
        notes: body.notes,
        itineraryJson: body.itineraryJson,
        userId: session.user.id,
        heroImage, // ⭐ NEW FIELD
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
