import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "../auth/[...nextauth]/route";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";

export async function GET() {
  // Explicitly type the session to avoid TS inferring `{}`.
  const session = (await getServerSession(authConfig)) as Session | null;

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const userEmail = session.user.email;

  try {
    const trips = await prisma.trip.findMany({
      where: { userEmail },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ trips });
  } catch (error) {
    console.error("Error fetching trips:", error);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 }
    );
  }
}