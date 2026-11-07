"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CalendarDays, Compass, Sparkles } from "lucide-react";

type Day = { day: number; title: string; summary: string; morning: string; afternoon: string; evening: string };
type Trip = { destination: string; startDate: string; endDate: string; days: Day[] };

export default function GenerateTripPage() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("moderate");
  const [style, setStyle] = useState("balanced");
  const [interests, setInterests] = useState("local food, nature, hidden gems");
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setTrip(null);
    if (new Date(endDate) < new Date(startDate)) {
      setError("The end date must be on or after the start date.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, startDate, endDate, budget, style, interests }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to create your itinerary.");
      setTrip(data as Trip);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  const field = "mt-2 w-full rounded-xl border border-[#d9e2df] bg-white px-4 py-3 text-[#15363a] outline-none focus:border-[#2c7775] focus:ring-2 focus:ring-[#2c7775]/20";
  return (
    <div className="min-h-screen bg-[#f8f6f0] px-5 py-12 text-[#15363a] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#49736e]"><Sparkles size={16} /> Travel with Aero</span>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl">Let's plan somewhere wonderful.</h1>
          <p className="mt-4 text-lg text-[#5c706f]">Tell us what you love. Build the outline of a trip that feels like you.</p>
          <p className="mt-3 rounded-lg bg-[#e5eee9] px-4 py-3 text-sm text-[#355f5a]">Early preview: itinerary suggestions are sample templates, not yet AI-generated or verified against live places, routes or opening hours.</p>
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,430px)_1fr]">
          <form onSubmit={generate} className="space-y-5 rounded-3xl border border-[#e2e4dd] bg-white p-6 shadow-sm sm:p-8">
            <div><label htmlFor="destination" className="text-sm font-semibold">Where to?</label><input id="destination" required maxLength={120} value={destination} onChange={e=>setDestination(e.target.value)} placeholder="Kyoto, Japan" className={field}/></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label htmlFor="startDate" className="text-sm font-semibold">Start date</label><input id="startDate" type="date" required value={startDate} onChange={e=>setStartDate(e.target.value)} className={field}/></div>
              <div><label htmlFor="endDate" className="text-sm font-semibold">End date</label><input id="endDate" type="date" required min={startDate||undefined} value={endDate} onChange={e=>setEndDate(e.target.value)} className={field}/></div>
            </div>
            <div><label htmlFor="budget" className="text-sm font-semibold">Travel budget</label><select id="budget" value={budget} onChange={e=>setBudget(e.target.value)} className={field}><option value="budget">Budget-friendly</option><option value="moderate">Comfortable</option><option value="luxury">Luxury</option></select></div>
            <div><label htmlFor="style" className="text-sm font-semibold">Your pace</label><select id="style" value={style} onChange={e=>setStyle(e.target.value)} className={field}><option value="relaxed">Slow and relaxed</option><option value="balanced">A little of everything</option><option value="adventurous">Packed with adventure</option></select></div>
            <div><label htmlFor="interests" className="text-sm font-semibold">What interests you?</label><textarea id="interests" rows={3} maxLength={300} value={interests} onChange={e=>setInterests(e.target.value)} placeholder="Food, history, art, hiking..." className={field}/></div>
            {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
            <button disabled={loading} type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#173e43] px-6 py-4 font-semibold text-white hover:bg-[#245c5d] disabled:opacity-50">{loading ? "Creating your preview..." : "Create my trip preview"} <ArrowRight size={18}/></button>
          </form>
          <section aria-live="polite" className="rounded-3xl border border-[#e2e4dd] bg-white p-6 shadow-sm sm:p-8">
            {!trip ? <div className="flex min-h-[370px] flex-col items-center justify-center text-center"><Compass size={42} className="text-[#4d8279]"/><h2 className="mt-5 font-serif text-3xl">Your journey starts here.</h2><p className="mt-3 max-w-sm text-[#637674]">Fill in your travel preferences to preview a day-by-day itinerary.</p></div> :
              <div><div className="flex items-center gap-2 text-sm font-semibold text-[#47756d]"><CalendarDays size={17}/> Sample itinerary · Not live travel data</div><h2 className="mt-3 font-serif text-3xl">{trip.destination}</h2><p className="mt-2 text-sm text-[#657874]">{trip.startDate} to {trip.endDate}</p><div className="mt-7 space-y-4">{trip.days.map(day=><article key={day.day} className="rounded-2xl border border-[#e2e7e1] p-5"><p className="text-xs font-bold uppercase tracking-wider text-[#558079]">Day {day.day}</p><h3 className="mt-2 font-serif text-xl">{day.title}</h3><p className="mt-2 text-sm text-[#5f7270]">{day.summary}</p><div className="mt-4 space-y-2 text-sm"><p><strong>Morning:</strong> {day.morning}</p><p><strong>Afternoon:</strong> {day.afternoon}</p><p><strong>Evening:</strong> {day.evening}</p></div></article>)}</div></div>}
          </section>
        </div>
      </div>
    </div>
  );
}
