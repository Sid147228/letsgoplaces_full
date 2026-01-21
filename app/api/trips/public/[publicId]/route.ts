import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { publicId: string } }
) {
  const { publicId } = params;

  try {
    const trip = await prisma.trip.findUnique({
      where: { publicId },
    });

    if (!trip) {
      return NextResponse.json(
        { error: "Trip not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(trip);
  } catch (err) {
    console.error("Failed to fetch public trip:", err);
    return NextResponse.json(
      { error: "Unable to load trip" },
      { status: 500 }
    );
  }
}
