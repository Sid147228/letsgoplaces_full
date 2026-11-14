"use client";

import {useCallback,useEffect,useState} from "react";
import Link from "next/link";
import type {Session} from "@supabase/supabase-js";
import {ArrowLeft,ArrowRight,CalendarDays,BookmarkCheck,MapPin,Trash2,RefreshCw,LockKeyhole} from "lucide-react";
import AeroAuth from "@/components/aero-auth";

type StoredTrip={
  id:string;destination:string;start_date:string;end_date:string;travelers:number;
  status:"pending"|"ready"|"failed";created_at:string;edit_state?:string;
  itinerary?:{days?:Array<{stops?:unknown[]}>}|null;
};
type TripsResponse={trips?:StoredTrip[];error?:string};

function dateLabel(value:string){
  const date=new Date(value+"T12:00:00Z");
  return Number.isNaN(date.valueOf())?value:date.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"});
}
function tripDays(trip:StoredTrip){
  const start=Date.parse(trip.start_date+"T12:00:00Z");
  const end=Date.parse(trip.end_date+"T12:00:00Z");
  return Number.isFinite(start)&&Number.isFinite(end)?Math.max(1,Math.min(3,Math.round((end-start)/86400000)+1)):1;
}

export default function MyTrips(){
  const [session,setSession]=useState<Session|null>(null);
  const [trips,setTrips]=useState<StoredTrip[]>([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [notice,setNotice]=useState("");
  const [removing,setRemoving]=useState<string|null>(null);

  const onSession=useCallback((next:Session|null)=>{
    setSession(old=>old?.access_token===next?.access_token?old:next);
    if(!next){setTrips([]);setError("");}
  },[]);

  const load=useCallback(async(token:string,signal?:AbortSignal)=>{
    setError("");setLoading(true);
    try{
      const response=await fetch("/api/trips/mine",{cache:"no-store",signal,headers:{Authorization:"Bearer "+token}});
      const data=await response.json() as TripsResponse;
      if(!response.ok)throw Error(data.error||"Unable to load your trips.");
      if(!signal?.aborted)setTrips(data.trips||[]);
    }catch(cause){
      if(!signal?.aborted)setError(cause instanceof Error?cause.message:"Unable to load your trips.");
    }finally{if(!signal?.aborted)setLoading(false);}
  },[]);

  useEffect(()=>{
    if(!session?.access_token)return;
    const controller=new AbortController();
    void load(session.access_token,controller.signal);
    return()=>controller.abort();
  },[session?.access_token,load]);

  async function removeTrip(trip:StoredTrip){
    if(!session||removing)return;
    const ok=window.confirm("Remove your "+trip.destination+" itinerary from My Trips? Its itinerary content will be deleted, but your lifetime Aero Free trip allowance will remain used. This cannot be undone.");
    if(!ok)return;
    setRemoving(trip.id);setError("");setNotice("");
    try{
      const response=await fetch("/api/trips/archive",{
        method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+session.access_token},
        body:JSON.stringify({tripId:trip.id})
      });
      const result=await response.json() as {archived?:boolean;error?:string};
      if(!response.ok||!result.archived)throw Error(result.error||"Could not remove your trip.");
      setTrips(old=>old.filter(item=>item.id!==trip.id));
      setNotice("Itinerary removed. Your one lifetime free-trip allowance remains used.");
    }catch(cause){setError(cause instanceof Error?cause.message:"Unable to remove trip.");}
    finally{setRemoving(null);}
  }

  return <div className="planner-page">
    <header className="site-header"><div className="shell header-inner">
      <Link href="/" className="brand"><span className="brand-symbol">✳</span>lets<span className="brand-accent">g0</span>places<span className="brand-period">.</span></Link>
      <Link href="/plan" className="planner-home"><ArrowLeft size={15} aria-hidden="true"/> Plan a trip</Link>
    </div></header>
    <main className="my-trips-shell">
      <div className="my-trips-heading">
        <div><span className="planner-eyebrow">✦ YOUR AERO ACCOUNT</span><h1>My <em>Trips.</em></h1><p>All your saved adventures, in one place.</p></div>
        <Link href="/plan" className="my-trips-primary">Open trip planner <ArrowRight size={16} aria-hidden="true"/></Link>
      </div>
      <AeroAuth onSession={onSession}/>
      {session?<section aria-label="Saved trip library">
        <div className="my-trips-library-title"><h2>Saved itineraries</h2><button type="button" onClick={()=>void load(session.access_token)} disabled={loading}><RefreshCw size={15} aria-hidden="true"/> Refresh</button></div>
        {error&&<p className="planner-error" role="alert">{error}</p>}
        {notice&&<p className="my-trips-notice" role="status">{notice}</p>}
        {loading?<p role="status" className="my-trips-loading">Loading your trips…</p>:trips.length?<div className="my-trips-grid">
          {trips.map(trip=><article className="my-trip-card" key={trip.id}>
            <div className="my-trip-card-art"><MapPin size={24} aria-hidden="true"/><span>{trip.status==="ready"?"Saved itinerary":trip.status==="pending"?"Generating":"Needs attention"}</span></div>
            <div className="my-trip-card-content">
              <h3>{trip.destination}</h3>
              <div className="my-trip-card-info"><span><CalendarDays size={15} aria-hidden="true"/> {dateLabel(trip.start_date)} – {dateLabel(trip.end_date)}</span><span>{tripDays(trip)} {tripDays(trip)===1?"day":"days"} · {trip.travelers||2} travelers</span></div>
              <p className="my-trip-card-summary">{trip.status==="ready"?((trip.itinerary?.days?.reduce((n,day)=>n+(day.stops?.length||0),0)||0)+" planned stops across your itinerary"):"Your saved trip is not ready to open yet."}</p>
              <div className="my-trip-card-actions">
                {trip.status==="ready"&&trip.itinerary?.days?.length?<Link href={"/plan?tripId="+encodeURIComponent(trip.id)}>Open itinerary <ArrowRight size={14} aria-hidden="true"/></Link>:<span className="my-trip-disabled">Not available to open</span>}
                <button type="button" disabled={removing!==null} onClick={()=>void removeTrip(trip)}><Trash2 size={14} aria-hidden="true"/>{removing===trip.id?"Removing…":"Remove"}</button>
              </div>
            </div>
          </article>)}
        </div>:!error?<div className="my-trips-empty"><BookmarkCheck size={32} aria-hidden="true"/><h2>No saved trips yet</h2><p>When you create an itinerary while signed in, you'll find it here.</p><Link href="/plan">Start planning <ArrowRight size={15} aria-hidden="true"/></Link></div>:null}
        <div className="my-trips-policy"><LockKeyhole size={17} aria-hidden="true"/><p>Your trips are private to your account. Removing an itinerary deletes its content, but does not reset the one-trip lifetime allowance. Account deletion is a separate process.</p></div>
      </section>:<div className="my-trips-empty"><LockKeyhole size={30} aria-hidden="true"/><h2>Sign in to see your saved trips</h2><p>Use the email sign-in above to securely access your trip library.</p></div>}
    </main>
  </div>;
}
