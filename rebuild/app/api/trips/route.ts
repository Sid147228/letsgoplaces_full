import {configuredProvider,generateItineraryJson,AiProviderError} from "@/lib/ai-provider";
import {authenticate,rest,serviceConfigured,supabaseConfigured} from "@/lib/supabase-server";
import { NextResponse } from "next/server";

type Stop = {time:string;name:string;description:string;area:string;category:string;tip:string;searchQuery:string};
type ActivityDay = {day:number;title:string;morning:string;afternoon:string;evening:string;stops?:Stop[]};
function validDate(value:unknown):value is string {
  if(typeof value!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const parsed=new Date(value+"T00:00:00Z");
  return !Number.isNaN(parsed.valueOf())&&parsed.toISOString().slice(0,10)===value;
}
function cleanStop(value:unknown):Stop|null{
  if(!value||typeof value!=="object"||Array.isArray(value))return null;
  const s=value as Record<string,unknown>;
  const fields=["time","name","description","area","category","tip","searchQuery"] as const;
  if(!fields.every(k=>typeof s[k]==="string"&&(s[k] as string).trim().length>0&&(s[k] as string).length<=400))return null;
  return {time:String(s.time).trim(),name:String(s.name).trim(),description:String(s.description).trim(),area:String(s.area).trim(),category:String(s.category).trim(),tip:String(s.tip).trim(),searchQuery:String(s.searchQuery).trim()};
}
function cleanDay(value:unknown,index:number):ActivityDay|null{
  if(!value||typeof value!=="object")return null;
  const d=value as Record<string,unknown>;
  if(!["title","morning","afternoon","evening"].every(key=>typeof d[key]==="string"&&(d[key] as string).trim().length>0&&(d[key] as string).length<=700))return null;
  if(!Array.isArray(d.stops)||d.stops.length<3||d.stops.length>7)return null;
  const stops=d.stops.map(cleanStop);
  if(stops.some(stop=>stop===null))return null;
  return {day:index+1,title:String(d.title).trim(),morning:String(d.morning).trim(),afternoon:String(d.afternoon).trim(),evening:String(d.evening).trim(),stops:stops as Stop[]};
}
export async function POST(request:Request){
  let body:Record<string,unknown>;
  try{const value:unknown=await request.json();if(!value||typeof value!=="object"||Array.isArray(value))throw Error();body=value as Record<string,unknown>;}
  catch{return NextResponse.json({error:"Invalid request."},{status:400});}
  const {destination,startDate,endDate,budget,pace,interests,travelers}=body;
  if(typeof destination!=="string"||!destination.trim()||destination.length>120||!validDate(startDate)||!validDate(endDate))return NextResponse.json({error:"Enter a destination and valid travel dates."},{status:400});
  const length=Math.round((Date.parse(endDate)-Date.parse(startDate))/86400000)+1;
  if(length<1||length>3)return NextResponse.json({error:"Aero Free supports trips of 1 to 3 days."},{status:400});
  const safeBudget=["budget","moderate","luxury"].includes(String(budget))?String(budget):"moderate";
  const safePace=["relaxed","balanced","active"].includes(String(pace))?String(pace):"balanced";
  const safeInterests=typeof interests==="string"?interests.slice(0,250):"";
  const safeTravelers=typeof travelers==="number"&&Number.isInteger(travelers)&&travelers>=1&&travelers<=12?travelers:2;
  const place=destination.trim();
  const provider=configuredProvider();
  // Only live AI trips consume the lifetime allowance; preview samples do not.
  const persistentMode=Boolean(provider)&&supabaseConfigured()&&serviceConfigured();
  let tripId:string|undefined;
  if(persistentMode){
    let auth;
    try{auth=await authenticate(request);}catch{return NextResponse.json({error:"Authentication temporarily unavailable."},{status:503});}
    if(!auth)return NextResponse.json({error:"Sign in to claim your one free trip."},{status:401});
    let claimed:Response;
    try{claimed=await rest("rpc/claim_free_trip","POST",auth.token,{p_destination:place,p_start_date:startDate,p_end_date:endDate,p_travelers:safeTravelers,p_budget:safeBudget,p_pace:safePace,p_interests:safeInterests});}
    catch{return NextResponse.json({error:"Trip storage temporarily unavailable."},{status:503});}
    if(!claimed.ok){
      const detail=await claimed.json().catch(()=>({})) as {code?:string};
      return NextResponse.json({error:detail.code==="23505"?"Your lifetime Aero Free trip has already been used.":"Could not reserve your free trip."},{status:detail.code==="23505"?409:502});
    }
    const record=await claimed.json() as {id?:string};
    if(!record.id)return NextResponse.json({error:"Could not reserve your trip."},{status:502});
    tripId=record.id;
  }
  if(!provider)return NextResponse.json({error:"Aero AI is not enabled for this deployment. Add GEMINI_API_KEY to the correct Vercel project and deployment environment.",code:"AI_NOT_CONFIGURED"},{status:503,headers:{"Cache-Control":"no-store"}});
  try{
    const raw=await generateItineraryJson("You are Aero, a thoughtful travel planner. Output ONLY a JSON object with a days array, exactly one day for each requested date. Each day requires title, morning, afternoon, evening (short summaries), plus stops (3 to 5 chronologically ordered activity objects). Every stop requires time (suggested HH:MM), name (specific real landmark, neighborhood or attraction; no fabricated business names), description (2 practical sentences on what to see/do), area (neighborhood), category (Food, Culture, Nature, Sightseeing, Shopping or Experience), tip (one useful practical consideration without unsupported claims), searchQuery (precise place and city for Google Maps search). Make each day geographically coherent and distinct. Adapt to pace, interests and budget. Avoid impossible logistics. Do not claim live opening hours, exact prices, live availability, or transit duration. If unsure of a specific business, suggest a well-known neighborhood instead. No markdown.",{destination:place,startDate,endDate,numberOfDays:length,travelers:safeTravelers,budget:safeBudget,pace:safePace,interests:safeInterests});
    const parsed=JSON.parse(raw) as {days?:unknown};
    if(!Array.isArray(parsed.days)||parsed.days.length!==length)throw new AiProviderError("AI_RESPONSE_INVALID",provider);
    const days=parsed.days.map((day,index)=>cleanDay(day,index));
    if(days.some(day=>!day))throw new AeroError("AI_RESPONSE_INVALID");
    if(tripId){
      const saved=await rest("trips?id=eq."+encodeURIComponent(tripId),"PATCH","",{itinerary:{days},status:"ready",updated_at:new Date().toISOString()},true);
      if(!saved.ok)return NextResponse.json({error:"Trip generated but could not be saved. Contact support before retrying."},{status:502});
    }
    return NextResponse.json({mode:"ai-unverified",provider,destination:place,days,tripId,notice:"AI suggestions are not verified against live place or route data."});
  }catch(cause){
    const code=cause instanceof AiProviderError?cause.code:"AI_REQUEST_FAILED";
    console.error("[Aero] Itinerary request failed",{code,provider});
    if(tripId){
      await rest("trips?id=eq."+encodeURIComponent(tripId),"PATCH","",{status:"failed",updated_at:new Date().toISOString()},true).catch(()=>{});
      return NextResponse.json({error:"Aero could not generate your trip. Your reservation is retained; contact support to retry."},{status:503});
    }
    const message=code==="AI_AUTH_FAILED"?"Aero cannot authenticate with the selected AI provider. Verify the API key in Vercel.":code==="AI_RATE_LIMITED"?"The selected AI provider has reached a quota or rate limit. Check its API usage limits.":code==="AI_MODEL_UNAVAILABLE"?"The configured AI model is unavailable for this API project.":code==="AI_TIMEOUT"?"Aero took too long to generate the itinerary. Try again.":code==="AI_RESPONSE_INVALID"?"Aero returned an incomplete itinerary. Please try again.":"Aero could not generate an itinerary. Please try again or check Vercel function logs.";
    return NextResponse.json({error:message,code},{status:503,headers:{"Cache-Control":"no-store"}});
  }
}
