"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";

type Day = { day: number; title: string; morning: string; afternoon: string; evening: string };
type Trip = { destination: string; days: Day[]; mode: string };
export default function Planner() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("moderate");
  const [pace, setPace] = useState("balanced");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState<Trip | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setResult(null); setLoading(true);
    try {
      const response = await fetch("/api/trips", { method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({destination,startDate,endDate,budget,pace,interests}) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not create itinerary.");
      setResult(payload as Trip);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Something went wrong."); }
    finally { setLoading(false); }
  }
  return <><header className="shell nav"><Link href="/" className="logo">lets<span>g0</span>places</Link><Link href="/" className="navlink">← Home</Link></header><main className="shell section"><div className="eyebrow">Plan with Aero</div><h1 style={{fontSize:"clamp(38px,5vw,58px)"}}>Where to next?</h1><p className="lead">Start with the essentials. We'll turn them into a travel plan.</p><form onSubmit={submit} className="card"><div className="formgrid"><div><label htmlFor="destination">Destination</label><input id="destination" value={destination} onChange={e=>setDestination(e.target.value)} required maxLength={120} placeholder="e.g. Lisbon, Portugal" /></div><div><label htmlFor="budget">Budget</label><select id="budget" value={budget} onChange={e=>setBudget(e.target.value)}><option value="budget">Budget-friendly</option><option value="moderate">Comfortable</option><option value="luxury">Luxury</option></select></div><div><label htmlFor="start">Start date</label><input id="start" type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} required /></div><div><label htmlFor="end">End date</label><input id="end" type="date" min={startDate||undefined} value={endDate} onChange={e=>setEndDate(e.target.value)} required /></div><div><label htmlFor="pace">Travel pace</label><select id="pace" value={pace} onChange={e=>setPace(e.target.value)}><option value="relaxed">Relaxed</option><option value="balanced">Balanced</option><option value="active">Active</option></select></div><div><label htmlFor="interests">Interests</label><input id="interests" value={interests} onChange={e=>setInterests(e.target.value)} maxLength={250} placeholder="Food, art, nature..." /></div></div><button className="cta" type="submit" disabled={loading}>{loading?"Planning…":"Build my itinerary →"}</button>{error&&<p className="error" role="alert">{error}</p>}</form>{result&&<section className="section" aria-live="polite"><h2>Your {result.destination} itinerary</h2><p className="muted">{result.mode==="sample"?"Sample itinerary only — AI recommendations and verified places are not connected yet.":"AI-generated itinerary. Check opening hours and availability before visiting."}</p><div className="days">{result.days.map(day=><article key={day.day} className="card day"><h3>{day.title}</h3><p><strong>Morning:</strong> {day.morning}</p><p><strong>Afternoon:</strong> {day.afternoon}</p><p><strong>Evening:</strong> {day.evening}</p></article>)}</div></section>}</main></>;
}
