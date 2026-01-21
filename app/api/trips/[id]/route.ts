import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { generateHeroImage } from "@/lib/generateHeroImage";
import { getHeroImage } from "@/lib/getHeroImage";

// DELETE — remove a trip
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
  });

  if (!trip || trip.userId !== session.user.id) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  await prisma.trip.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}

// PATCH — update trip OR regenerate hero image
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // ⭐ CASE 1 — Regenerate hero image
  if (body.regenerateHero) {
    const trip = await prisma.trip.findUnique({
      where: { id: params.id },
    });

    if (!trip || trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const prompt = `
      Cinematic travel photography of ${trip.destination}.
      Mood: ${trip.vibes}.
      Travel style: ${trip.pace}.
      Ultra‑wide, natural lighting, editorial style.
    `;

    // Try AI → fallback to Unsplash
    const aiImage = await generateHeroImage(prompt);
    const fallback = await getHeroImage(trip.destination);

    const updated = await prisma.trip.update({
      where: { id: params.id },
      data: {
        heroImage: aiImage || fallback,
      },
    });

    return NextResponse.json(updated);
  }

  // ⭐ CASE 2 — Normal trip update
  const updated = await prisma.trip.update({
    where: { id: params.id },
    data: {
      destination: body.destination,
      days: body.days,
      pace: body.pace,
      vibes: body.vibes,
      groupType: body.groupType,
      notes: body.notes,
    },
  });

  return NextResponse.json(updated);
}
