import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authConfig from "@/auth/config";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = (await getServerSession(authConfig)) as Session | null;

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const email = session.user.email;

  try {
    // 1. Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 2. Fetch trips using user.id (NOT email)
    const trips = await prisma.trip.findMany({
      where: { userId: user.id },
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