import { NextResponse } from "next/server";

type ItineraryDay = {
  day: number;
  title: string;
  summary: string;
  morning: string;
  afternoon: string;
  evening: string;
};

function validDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\\d{4}-\\d{2}-\\d{2}$/.test(value)) return false;
  const parsed = new Date(value + "T00:00:00.000Z");
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid JSON object");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { destination, startDate, endDate, budget, style, interests } = body;
  if (typeof destination !== "string" || !destination.trim() || destination.length > 120 ||
      !validDate(startDate) || !validDate(endDate)) {
    return NextResponse.json({ error: "Provide a destination and valid start and end dates." }, { status: 400 });
  }

  const start = Date.parse(startDate + "T00:00:00.000Z");
  const end = Date.parse(endDate + "T00:00:00.000Z");
  const daysCount = Math.round((end - start) / 86400000) + 1;
  if (daysCount < 1 || daysCount > 21) {
    return NextResponse.json({ error: "Trip length must be between 1 and 21 days." }, { status: 400 });
  }
  if (typeof interests === "string" && interests.length > 300) {
    return NextResponse.json({ error: "Interests are too long." }, { status: 400 });
  }

  const allowedBudgets = ["budget", "moderate", "luxury"];
  const allowedStyles = ["relaxed", "balanced", "adventurous"];
  const selectedBudget = typeof budget === "string" && allowedBudgets.includes(budget) ? budget : "moderate";
  const selectedStyle = typeof style === "string" && allowedStyles.includes(style) ? style : "balanced";
  const interestsList = typeof interests === "string"
    ? interests.split(",").map(item => item.trim()).filter(Boolean).slice(0, 12)
    : [];

  // Demo-only response: real AI generation and verified Places data are not connected yet.
  const days: ItineraryDay[] = Array.from({ length: daysCount }, (_, index) => {
    const day = index + 1;
    return {
      day,
      title: `Day ${day} in ${destination.trim()}`,
      summary: `A ${selectedStyle} day with a ${selectedBudget} budget${interestsList.length ? `, inspired by ${interestsList.join(", ")}` : ""}.`,
      morning: "Explore a neighborhood on foot and try a local breakfast spot.",
      afternoon: "Choose a landmark, museum or outdoor experience that matches your interests.",
      evening: "Enjoy dinner and a relaxed evening activity.",
    };
  });

  return NextResponse.json({
    preview: true,
    dataSource: "sample-template",
    destination: destination.trim(),
    startDate,
    endDate,
    budget: selectedBudget,
    style: selectedStyle,
    interests: interestsList,
    days,
  });
}
