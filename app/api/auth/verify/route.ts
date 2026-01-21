import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect("/auth/error?reason=invalid-token");
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record || record.expires < new Date()) {
    return NextResponse.redirect("/auth/error?reason=expired-token");
  }

  // Activate user
  await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
  });

  // Delete token
  await prisma.verificationToken.delete({
    where: { token },
  });

  return NextResponse.redirect("/auth/signin?verified=true");
}
