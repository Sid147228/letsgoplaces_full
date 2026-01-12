export default function ItineraryHeader({ destination, days }) {
  return (
    <div className="w-full h-64 bg-gradient-to-b from-black via-slate-900 to-black flex items-end pb-10 px-6 text-center">
      <div className="mx-auto">
        <h1 className="text-4xl font-semibold mb-2">{destination}</h1>
        <p className="text-slate-400 text-sm tracking-wide">
          {days}‑day itinerary • Built for you
        </p>
      </div>
    </div>
  );
}