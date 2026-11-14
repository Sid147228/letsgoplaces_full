"use client";

import {useEffect,useMemo,useState, type ReactNode} from "react";
import {CalendarDays, ChevronLeft, ChevronRight, Clock3, Compass, ExternalLink, MapPinned, Printer, Copy, Sparkles, LocateFixed, Lightbulb} from "lucide-react";
import PlacePhoto from "@/components/place-photo";

export type TripStop={time:string;name:string;description:string;area:string;category:string;tip:string;searchQuery:string};
export type TripDay={day:number;title:string;morning:string;afternoon:string;evening:string;stops?:TripStop[]};
export type DashboardTrip={destination:string;days:TripDay[];mode:string;notice?:string;tripId?:string};
type Props={
  trip:DashboardTrip;
  startDate?:string;
  endDate?:string;
  travelers:number;
  copyStatus:string;
  onCopy:()=>void;
  onBack:()=>void;
  editPanel?:ReactNode;
};

function safeMapsSearch(query:string):string {
  return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(query);
}
function dayDirections(stops:TripStop[]):string | null {
  const queries=stops.map(stop=>stop.searchQuery.trim()).filter(Boolean);
  if(queries.length<2)return null;
  const params=new URLSearchParams({api:"1",origin:queries[0],destination:queries[queries.length-1],travelmode:"walking"});
  if(queries.length>2)params.set("waypoints",queries.slice(1,-1).join("|"));
  return "https://www.google.com/maps/dir/?"+params.toString();
}
function dayDate(start:string|undefined,index:number):string|null {
  if(!start||!/\d{4}-\d{2}-\d{2}/.test(start))return null;
  const ms=Date.parse(start+"T12:00:00Z");
  if(!Number.isFinite(ms))return null;
  return new Date(ms+index*86400000).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"});
}
const categoryIcon=(category:string):string=>{
  if(/food|cafe|coffee|restaurant/i.test(category))return "☕";
  if(/nature|park|outdoor/i.test(category))return "🌿";
  if(/culture|museum|history/i.test(category))return "🏛";
  if(/shopping|market/i.test(category))return "🛍";
  return "✦";
};

export default function TripDashboard({trip,startDate,endDate,travelers,copyStatus,onCopy,onBack,editPanel}:Props){
  const [selected,setSelected]=useState(0);
  const [focusedStop,setFocusedStop]=useState<number|null>(null);
  useEffect(()=>{setSelected(0);setFocusedStop(null);},[trip.tripId,trip.destination,trip.days.length]);
  const activeIndex=Math.min(selected,Math.max(0,trip.days.length-1));
  const day=trip.days[activeIndex];
  const stops=useMemo(()=>day?.stops||[],[day]);
  const directions=useMemo(()=>dayDirections(stops),[stops]);
  const totalStops=trip.days.reduce((sum,item)=>sum+(item.stops?.length||0),0);
  const hasDetailedPlan=totalStops>0;
  const canNavigate=trip.days.length>1;
  if(!day)return <section className="trip-dashboard" role="status">Your itinerary has no days yet. Return to the planner and try again.</section>;

  return <section className="trip-dashboard" aria-label="Your Aero trip dashboard">
    <div className="trip-dashboard-hero">
      <div className="trip-dashboard-hero-top"><span className="trip-dashboard-kicker"><Sparkles size={14} aria-hidden="true"/> YOUR JOURNEY WITH AERO</span><span className="trip-dashboard-plan-type">{trip.tripId?"Saved trip":"Trip preview"}</span></div>
      <h1>{trip.destination}<span className="trip-dashboard-dot">.</span></h1>
      <p>Thoughtfully planned days, ready to explore at your own pace.</p>
      <div className="trip-dashboard-facts">
        <span><CalendarDays size={15} aria-hidden="true"/>{startDate&&endDate?startDate+" – "+endDate:trip.days.length+"-day adventure"}</span>
        <span><Compass size={15} aria-hidden="true"/>{trip.days.length} {trip.days.length===1?"day":"days"}</span>
        <span><LocateFixed size={15} aria-hidden="true"/>{hasDetailedPlan?totalStops+" suggested stops":"Planning preview"}</span>
        <span>{travelers} {travelers===1?"traveler":"travelers"}</span>
      </div>
    </div>

    <div className="trip-dashboard-notice" role="note">
      <Sparkles size={17} aria-hidden="true"/>
      <p><strong>{trip.mode==="sample"?"Sample itinerary":"AI-generated itinerary"}.</strong> {trip.notice||"Recommendations are not live-verified."} Places, business hours, prices, and routes have not been independently verified. Map links open Google Maps externally. {trip.tripId?"Your trip is saved to your account.":"Saving requires a configured account."}</p>
    </div>

    <div className="trip-dashboard-actions" aria-label="Trip actions">
      <button type="button" onClick={onCopy}><Copy size={16} aria-hidden="true"/> Copy itinerary</button>
      <button type="button" onClick={()=>window.print()}><Printer size={16} aria-hidden="true"/> Print / save PDF</button>
      {copyStatus&&<span role="status">{copyStatus}</span>}
    </div>

    <nav className="trip-day-nav" aria-label="Choose an itinerary day">
      {trip.days.map((item,index)=><button key={item.day} type="button" className={"trip-day-tab"+(index===activeIndex?" active":"")} aria-current={index===activeIndex?"date":undefined} aria-pressed={index===activeIndex} onClick={()=>{setSelected(index);setFocusedStop(null);}}>
        <span>DAY {String(item.day).padStart(2,"0")}</span>
        <strong>{dayDate(startDate,index)||"Day "+item.day}</strong>
      </button>)}
    </nav>

    <div className="trip-dashboard-grid">
      <div className="trip-dashboard-main">
        {trip.days.map((item,index)=><article key={item.day} className={"trip-dashboard-day"+(index!==activeIndex?" trip-dashboard-hidden":"")} aria-label={"Day "+item.day+": "+item.title}>
          <div className="trip-day-heading"><div><span className="trip-section-eyebrow">YOUR DAY AT A GLANCE</span><h2>{item.title}</h2></div><span className="trip-stop-count">{item.stops?.length?item.stops.length+" stops":"Daily outline"}</span></div>
          {item.stops?.length?<ol className="trip-activity-list">{item.stops.map((stop,stopIndex)=><li className={"trip-activity"+(focusedStop===stopIndex?" focused":"")} key={stopIndex}>
            <button type="button" className="trip-activity-spot" aria-pressed={focusedStop===stopIndex} onClick={()=>setFocusedStop(focusedStop===stopIndex?null:stopIndex)} aria-label={"View details for "+stop.name}><span>{stopIndex+1}</span></button>
            <div className="trip-activity-content">
              <div className="trip-activity-meta"><span><Clock3 size={13} aria-hidden="true"/> {stop.time}</span><span>{categoryIcon(stop.category)} {stop.category}</span></div>
              <h3>{stop.name}</h3>
              <p className="trip-activity-area"><MapPinned size={13} aria-hidden="true"/>{stop.area}</p>
              <div className="trip-activity-detail">
                {index===activeIndex&&<PlacePhoto name={stop.name} query={stop.searchQuery} priority={stopIndex===0}/>}
                <div className="trip-activity-info">
                  <p className="trip-activity-description">{stop.description}</p>
                  <div className="trip-activity-tip"><Lightbulb size={15} aria-hidden="true"/><span><strong>Aero tip:</strong> {stop.tip}</span></div>
                  <a className="trip-activity-map-link" href={safeMapsSearch(stop.searchQuery)} target="_blank" rel="noopener noreferrer">View place in Google Maps <ExternalLink size={13} aria-hidden="true"/></a>
                </div>
              </div>
            </div>
          </li>)}</ol>:<div className="trip-outline"><p><strong>Morning</strong>{item.morning}</p><p><strong>Afternoon</strong>{item.afternoon}</p><p><strong>Evening</strong>{item.evening}</p></div>}
          {canNavigate&&<div className="trip-day-pagination"><button type="button" disabled={activeIndex===0} onClick={()=>{setSelected(activeIndex-1);setFocusedStop(null);}}><ChevronLeft size={15}/> Previous day</button><button type="button" disabled={activeIndex===trip.days.length-1} onClick={()=>{setSelected(activeIndex+1);setFocusedStop(null);}}>Next day <ChevronRight size={15}/></button></div>}
        </article>)}
      </div>

      <aside className="trip-dashboard-aside" aria-label="Day map and route">
        <div className="trip-route-card">
          <div className="trip-route-heading"><span className="trip-route-icon"><MapPinned size={20}/></span><div><span className="trip-section-eyebrow">EXPLORE THE AREA</span><h2>Day {day.day} route</h2></div></div>
          <div className="trip-route-schematic" aria-label="Suggested stop order, not a geographic map">
            {stops.length?<ol>{stops.map((stop,index)=><li key={index} className={focusedStop===index?"focused":""}><span>{index+1}</span><button type="button" onClick={()=>setFocusedStop(focusedStop===index?null:index)}>{stop.name}<small>{stop.area}</small></button></li>)}</ol>:<div className="trip-map-empty"><MapPinned size={25}/><p>Detailed stop locations will appear here when Aero generates a complete plan.</p></div>}
          </div>
          <p className="trip-route-disclaimer">Stop order only — this is not a verified geographic map. Walking directions are estimates generated by Google Maps after opening the link.</p>
          {directions?<a href={directions} target="_blank" rel="noopener noreferrer" className="trip-route-action">Open route in Google Maps <ExternalLink size={14}/></a>:<span className="trip-route-unavailable">Route available with 2+ detailed stops</span>}
        </div>
        <div className="trip-helper-card"><span className="trip-section-eyebrow">AERO REMINDER</span><p>Check opening hours and tickets directly with each attraction before you travel. AI suggestions may need adjustment.</p></div>
      </aside>
    </div>

    {editPanel}
    <div className="trip-dashboard-bottom"><button type="button" onClick={onBack}>← Back to planner</button><p>{trip.tripId?"Your Aero Free trip is saved; additional free trips are not included.":"Account-based trip limits require Supabase configuration."}</p></div>
  </section>;
}
