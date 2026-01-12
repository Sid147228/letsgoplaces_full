import { sampleTrips } from "@/data/sampleTrips";
import ItineraryDay from "@/components/ItineraryDay";
import Image from "next/image";

export default function SampleTripPage({ params }) {
  const trip = sampleTrips[params.city];

  if (!trip) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Trip not found</h1>
        <p className="text-slate-400 text-sm">
          The sample trip you’re looking for doesn’t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header Image */}
      <div className="relative h-64 w-full rounded-xl overflow-hidden mb-10">
        <Image
          src={trip.image}
          alt={trip.city}
          fill
          className="object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-2">{trip.city}</h1>
      <p className="text-slate-400 mb-8">{trip.focus}</p>

      {/* Itinerary */}
      <div className="space-y-4">
        {trip.itinerary.map((day) => (
          <ItineraryDay key={day.day} {...day} />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="/plan"
          className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90"
        >
          Start planning your own trip
        </a>
      </div>
    </div>
  );
}