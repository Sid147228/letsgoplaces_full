"use client";

import { useSearchParams } from "next/navigation";
import ItineraryHeader from "./components/ItineraryHeader";
import DayTabs from "./components/DayTabs";
import DayTimeline from "./components/DayTimeline";
import ItineraryActions from "./components/ItineraryActions";
import SaveTripButton from "@/components/SaveTripButton";
import { useState } from "react";

export default function ItineraryPage() {
  const params = useSearchParams();

  const destination = params.get("destination") || "Your destination";
  const days = Number(params.get("days") || 3);

  const [activeDay, setActiveDay] = useState(1);

  // Mock itinerary data (AI will replace this later)
  const itinerary = Array.from({ length: days }).map((_, i) => ({
    day: i + 1,
    morning: {
      title: "Morning walk & coffee",
      desc: "Start your day with a calm walk and a specialty coffee spot.",
      img: "/morning.jpg",
    },
    afternoon: {
      title: "Explore local culture",
      desc: "Visit a museum or a neighborhood with strong cultural identity.",
      img: "/afternoon.jpg",
    },
    evening: {
      title: "Dinner & golden hour",
      desc: "End the day with a scenic dinner spot and a sunset walk.",
      img: "/evening.jpg",
    },
  }));

  // Trip object to save
  const generatedTrip = {
    destination,
    days,
    pace: "",
    vibes: "",
    groupType: "",
    notes: "",
    itineraryJson: itinerary,
  };

  return (
    <div className="bg-black text-white min-h-screen pb-20">
      <ItineraryHeader destination={destination} days={days} />

      <div className="max-w-5xl mx-auto px-6">

        {/* Action bar with Save Trip button */}
        <div className="flex items-center justify-between mb-6">
          <ItineraryActions />
          <SaveTripButton trip={generatedTrip} />
        </div>

        <DayTabs
          days={days}
          activeDay={activeDay}
          onChange={(d) => setActiveDay(d)}
        />

        <DayTimeline data={itinerary[activeDay - 1]} />
      </div>
    </div>
  );
}