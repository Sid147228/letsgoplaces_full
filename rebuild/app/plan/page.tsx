"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import type {Session} from "@supabase/supabase-js";
import AeroAuth from "@/components/aero-auth";
import {browserSupabase} from "@/lib/supabase-browser";

type Stop = {time:string;name:string;description:string;area:string;category:string;tip:string;searchQuery:string};
type Day = { day: number; title: string; morning: string; afternoon: string; evening: string; stops?: Stop[] };
type Trip = { destination: string; days: Day[]; mode: string; notice?: string; tripId?: string };
const interestOptions = ["Food & cafés","Art & culture","Nature","Hidden gems","History","Shopping","Adventure"];
const dayCount = (start:string,end:string) => {if(!start||!end)return 0;const a=Date.parse(start+"T00:00:00Z"),b=Date.parse(end+"T00:00:00Z");return Number.isFinite(a)&&Number.isFinite(b)?Math.round((b-a)/86400000)+1:0;};

export default function Planner() {
  const [step,setStep]=useState(1);
  const [destination,setDestination]=useState("");
  const [startDate,setStartDate]=useState("");
  const [endDate,setEndDate]=useState("");
  const [travelers,setTravelers]=useState(2);
  const [budget,setBudget]=useState("moderate");
  const [pace,setPace]=useState("balanced");
  const [interests,setInterests]=useState<string[]>([]);
  const [result,setResult]=useState<Trip|null>(null);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const [copyStatus,setCopyStatus]=useState("");
  const [session,setSession]=useState<Session|null>(null);
  const [savedTrips,setSavedTrips]=useState<Array<{id:string;destination:string;start_date:string;end_date:string;status:string;ai_edits_used?:number;itinerary?:{days?:Day[]}|null}>>([]);
  const [savedError,setSavedError]=useState("");
  const [editInstruction,setEditInstruction]=useState("");
  const [editBusy,setEditBusy]=useState(false);
  const [editUsed,setEditUsed]=useState(false);
  const [editError,setEditError]=useState("");
  const days=dayCount(startDate,endDate);
  function next(){setError("");if(step===1){if(!destination.trim()||!startDate||!endDate||days<1){setError("Enter your destination and valid travel dates.");return;}if(days>3){setError("Aero Free supports trips of up to 3 days. Aero Plus is coming soon.");return;}}setStep(Math.min(3,step+1));}
  function toggleInterest(item:string){setInterests(old=>old.includes(item)?old.filter(x=>x!==item):[...old,item]);}
  async function applyFreeEdit(){
    if(!result?.tripId||!session||editUsed)return;
    setEditError("");setEditBusy(true);
    try{
      const response=await fetch("/api/trips/edit",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+session.access_token},body:JSON.stringify({tripId:result.tripId,instruction:editInstruction})});
      const payload=await response.json() as Trip & {error?:string};
      if(!response.ok)throw Error(payload.error||"Could not edit the itinerary.");
      setResult(payload);setEditInstruction("");setEditUsed(true);
    }catch(e){setEditError(e instanceof Error?e.message:"Could not complete the edit.");setEditUsed(true);}
    finally{setEditBusy(false);}
  }
  async function copyItinerary(){
    if(!result)return;
    const lines=[`Aero itinerary · ${result.destination}`,`${startDate} to ${endDate} · ${travelers} travelers`,"AI-generated suggestions — verify places, opening hours and availability before visiting.",""];
    for(const day of result.days){
      lines.push(day.title);
      if(day.stops?.length)for(const stop of day.stops)lines.push(`${stop.time} — ${stop.name} (${stop.area})`,stop.description,`Tip: ${stop.tip}`,"");
      else lines.push(`Morning: ${day.morning}`,`Afternoon: ${day.afternoon}`,`Evening: ${day.evening}`,"");
    }
    try{await navigator.clipboard.writeText(lines.join("\n"));setCopyStatus("Copied itinerary to clipboard.");}
    catch{setCopyStatus("Copy unavailable. Try printing or saving as PDF.");}
  }
  async function loadSavedTrips(){
    if(!session)return;
    setSavedError("");
    try{
      const response=await fetch("/api/trips/mine",{headers:{Authorization:"Bearer "+session.access_token},cache:"no-store"});
      const data=await response.json() as {trips?:typeof savedTrips;error?:string};
      if(!response.ok)throw Error(data.error||"Could not load saved trips");
      setSavedTrips(data.trips||[]);
    }catch(e){setSavedError(e instanceof Error?e.message:"Could not load saved trips.");}
  }
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();setError("");setLoading(true);
    if(browserSupabase()&&!session){setError("Sign in using your email to generate your lifetime Aero Free trip.");setLoading(false);return;}
    try{
      const response=await fetch("/api/trips",{method:"POST",headers:{"Content-Type":"application/json",...(session?{Authorization:"Bearer "+session.access_token}:{})},body:JSON.stringify({destination,startDate,endDate,travelers,budget,pace,interests:interests.join(", ")})});
      const payload=await response.json();
      if(!response.ok)throw new Error(payload.error||"Could not create itinerary.");
      setResult(payload as Trip);setEditUsed(false);setEditError("");
      if(session)void loadSavedTrips();
    }catch(cause){setError(cause instanceof Error?cause.message:"Something went wrong.");}
    finally{setLoading(false);}
  }
  return <div className="planner-page">
    <header className="site-header"><div className="shell header-inner"><Link href="/" className="brand"><span className="brand-symbol">✳</span>lets<span className="brand-accent">g0</span>places<span className="brand-period">.</span></Link><Link href="/" className="planner-home">← Back to home</Link></div></header>
    <main className="planner-shell">
      {!result?<><div className="planner-intro"><span className="planner-eyebrow">✦ MEET AERO, YOUR TRAVEL COMPANION</span><h1>A great trip starts <em>here.</em></h1><p>A few details, and we'll help you shape your next getaway.</p></div>
        <AeroAuth onSession={setSession}/>{session&&<div className="saved-trip-controls"><button type="button" onClick={loadSavedTrips}>View saved trips</button>{savedError&&<span role="alert">{savedError}</span>}{savedTrips.map(trip=><button key={trip.id} type="button" disabled={!trip.itinerary?.days?.length} onClick={()=>{if(trip.itinerary?.days){setResult({destination:trip.destination,days:trip.itinerary.days,mode:"ai-unverified",tripId:trip.id,notice:"Previously saved AI itinerary; places and opening hours are not live-verified."});setEditUsed((trip.ai_edits_used||0)>=1);setEditError("");}}}>{trip.destination} · {trip.status}</button>)}</div>}<div className="planner-progress"><span>YOUR TRIP, YOUR WAY</span><span>STEP {step} OF 3</span></div><div className="planner-progress-track"><div style={{width:`${step/3*100}%`}}/></div>
        <form onSubmit={submit} className="planner-panel">
          {step===1&&<><div className="planner-step-label">01 / THE ESSENTIALS</div><h2>Where are we taking you?</h2><p className="planner-step-desc">Start with a destination and your travel dates.</p><div className="planner-fields"><div className="planner-field full"><label htmlFor="destination">Where would you like to go?</label><input id="destination" value={destination} onChange={e=>setDestination(e.target.value)} placeholder="e.g. Lisbon, Portugal" maxLength={120} required/></div><div className="planner-field"><label htmlFor="start">Arriving</label><input id="start" type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} required/></div><div className="planner-field"><label htmlFor="end">Leaving</label><input id="end" type="date" min={startDate||undefined} value={endDate} onChange={e=>setEndDate(e.target.value)} required/></div><div className="planner-field full"><label htmlFor="travelers">How many travelers?</label><select id="travelers" value={travelers} onChange={e=>setTravelers(Number(e.target.value))}>{Array.from({length:12},(_,i)=><option key={i+1} value={i+1}>{i+1} {i===0?"traveler":"travelers"}</option>)}</select></div></div><div className="planner-hint">✧ Aero Free includes one trip of up to 3 days.</div></>}
          {step===2&&<><div className="planner-step-label">02 / YOUR TRAVEL STYLE</div><h2>What feels like your kind of trip?</h2><p className="planner-step-desc">We'll shape the itinerary around your budget and preferred pace.</p><div className="planner-fields"><div className="planner-field full"><label htmlFor="budget">Your budget style</label><select id="budget" value={budget} onChange={e=>setBudget(e.target.value)}><option value="budget">Budget-friendly — make every penny count</option><option value="moderate">Comfortable — a little of everything</option><option value="luxury">Luxury — treat yourself</option></select></div><div className="planner-field full"><label htmlFor="pace">Your ideal pace</label><select id="pace" value={pace} onChange={e=>setPace(e.target.value)}><option value="relaxed">Relaxed — plenty of breathing room</option><option value="balanced">Balanced — a little of both</option><option value="active">Active — make the most of every day</option></select></div></div></>}
          {step===3&&<><div className="planner-step-label">03 / THE FUN PART</div><h2>What makes you curious?</h2><p className="planner-step-desc">Choose the things you'd love to explore. You can select more than one.</p><div className="interest-grid">{interestOptions.map(item=><button type="button" key={item} aria-pressed={interests.includes(item)} className={`interest-pill ${interests.includes(item)?"selected":""}`} onClick={()=>toggleInterest(item)}>{interests.includes(item)?"✓ ":"+ "}{item}</button>)}</div><div className="trip-recap"><strong>Your adventure</strong><span>{destination} · {days} {days===1?"day":"days"} · {travelers} {travelers===1?"traveler":"travelers"}</span></div></>}
          {error&&<p className="planner-error" role="alert">{error}</p>}
          <div className="planner-actions">{step>1?<button type="button" className="planner-back" onClick={()=>{setStep(step-1);setError("");}}>← Previous</button>:<span/>}{step<3?<button type="button" className="planner-next" onClick={next}>Continue <span>↗</span></button>:<button type="submit" className="planner-next" disabled={loading}>{loading?"Building your trip…":"Create my itinerary ✦"}</button>}</div>
        </form><div className="planner-footer-note">✦ Thoughtful travel planning, made simple. <span>Free preview · No account required</span></div></>:
        <section className="itinerary-view" aria-live="polite"><div className="planner-eyebrow">✦ YOUR TRIP WITH AERO</div><h1>{result.destination}, <em>here we come.</em></h1><p className="planner-step-desc">{result.days.length}-day itinerary · {travelers} {travelers===1?"traveler":"travelers"}</p><div className="preview-notice"><strong>Preview itinerary</strong><p>{result.mode==="sample"?"This is a sample itinerary. "+(result.notice||"AI is not connected yet."):"This itinerary was generated by Aero AI. "+(result.notice||"Recommendations are unverified.")} Map links open external searches; verified place data, integrated maps, account-based free limits, and saving are not connected yet.</p></div><div className="itinerary-toolbar"><button type="button" className="itinerary-tool" onClick={copyItinerary}>↗ Copy itinerary</button><button type="button" className="itinerary-tool" onClick={()=>window.print()}>↓ Print / save PDF</button>{copyStatus&&<span role="status" className="itinerary-copy-status">{copyStatus}</span>}</div><div className="itinerary-days">{result.days.map(day=><article key={day.day} className="itinerary-day"><div className="itinerary-day-heading"><span>DAY {String(day.day).padStart(2,"0")}{startDate?" · "+new Date(Date.parse(startDate+"T12:00:00Z")+(day.day-1)*86400000).toLocaleDateString("en-GB",{day:"numeric",month:"short",timeZone:"UTC"}):""}</span><h2>{day.title}</h2></div>{day.stops?.length?<div className="aero-stops">{day.stops.map((stop,index)=><div className="aero-stop" key={index}><div className="aero-stop-time">{stop.time}</div><div className="aero-stop-content"><div className="aero-stop-category">{stop.category} · {stop.area}</div><h3>{stop.name}</h3><p>{stop.description}</p><div className="aero-stop-tip"><strong>Aero tip</strong> {stop.tip}</div><a href={"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(stop.searchQuery)} target="_blank" rel="noopener noreferrer" className="aero-map-link" aria-label={"Search for "+stop.name+" on Google Maps"}>Find on Google Maps ↗</a></div></div>)}</div>:<div className="itinerary-activities"><p><strong>☀ Morning</strong>{day.morning}</p><p><strong>◒ Afternoon</strong>{day.afternoon}</p><p><strong>☾ Evening</strong>{day.evening}</p></div>}</article>)}</div>{result.tripId&&session&&<section className="aero-edit-panel"><h2>Refine your itinerary with Aero</h2><p>Aero Free includes one AI edit per lifetime trip. Ask for a change such as “Make day two more relaxed and include a museum.”</p><textarea aria-label="Describe your itinerary edit" value={editInstruction} onChange={e=>setEditInstruction(e.target.value)} rows={3} maxLength={500} disabled={editUsed||editBusy} placeholder="What would you like Aero to change?"/><div className="aero-edit-actions"><button type="button" onClick={applyFreeEdit} disabled={editUsed||editBusy||editInstruction.trim().length<5}>{editBusy?"Updating itinerary…":editUsed?"Free AI edit used":"Apply my free AI edit"}</button><span>{editUsed?"0 edits remaining":"1 free edit remaining"}</span></div>{editError&&<p role="alert" className="planner-error">{editError}</p>}</section>}<div className="result-actions"><button type="button" className="planner-next" onClick={()=>{setResult(null);setStep(1);}}>Plan another preview ↗</button><span>Free plan limits will be enforced when accounts are enabled.</span></div></section>}
    </main>
  </div>;
}
