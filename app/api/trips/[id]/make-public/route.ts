import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Generate a new publicId
    const publicId = nanoid(12);

    const updated = await prisma.trip.update({
      where: { id },
      data: { publicId },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Failed to generate publicId:", err);
    return NextResponse.json(
      { error: "Unable to generate public link" },
      { status: 500 }
    );
  }
}
