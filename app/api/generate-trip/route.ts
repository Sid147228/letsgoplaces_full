// app/api/generate-trip/route.ts
import { NextResponse } from "next/server";

type TripRequest = {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  style: string;
  interests: string;
};

type ItineraryDay = {
  day: number;
  title: string;
  summary: string;
  morning: string;
  afternoon: string;
  evening: string;
};

type TripResponse = {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  style: string;
  interests: string[];
  days: ItineraryDay[];
};

function getNumberOfDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  const days = Math.round(diff / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(days, 1);
}

export async function POST(request: Request) {
  const body = (await request.json()) as TripRequest;

  const { destination, startDate, endDate, budget, style, interests } = body;

  if (!destination || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const daysCount = getNumberOfDays(startDate, endDate);
  const interestsList = interests
    ? interests.split(",").map((i) => i.trim()).filter(Boolean)
    : [];

  // Simple mock itinerary generator to keep things working without external APIs
  const days: ItineraryDay[] = Array.from({ length: daysCount }).map(
    (_, index) => {
      const dayNumber = index + 1;
      return {
        day: dayNumber,
        title: `Day ${dayNumber} in ${destination}`,
        summary: `A ${style} day in ${destination} tailored for a ${budget} budget${
          interestsList.length ? `, focusing on ${interestsList.join(", ")}` : ""
        }.`,
        morning: `Explore a iconic neighborhood in ${destination}, grab coffee at a local spot, and ease into the day.`,
        afternoon: `Visit a key landmark or museum, followed by a relaxed walk through a scenic area.`,
        evening: `Dinner at a recommended restaurant and a gentle evening activity that matches your travel style.`,
      };
    }
  );

  const response: TripResponse = {
    destination,
    startDate,
    endDate,
    budget,
    style,
    interests: interestsList,
    days,
  };

  return NextResponse.json(response);
}