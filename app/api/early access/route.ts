import { NextResponse } from "next/server";
import { saveEarlyAccessLead } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await saveEarlyAccessLead({ email, source });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Early access error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again shortly." },
      { status: 500 }
    );
  }
}