import {authenticate,rest,serviceConfigured,supabaseConfigured} from "@/lib/supabase-server";
import { NextResponse } from "next/server";

type ActivityDay = {day:number;title:string;morning:string;afternoon:string;evening:string};
function validDate(value:unknown):value is string {
  if(typeof value!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const parsed=new Date(value+"T00:00:00Z");
  return !Number.isNaN(parsed.valueOf())&&parsed.toISOString().slice(0,10)===value;
}
function sample(destination:string,length:number,budget:string,pace:string,interests:string):ActivityDay[]{
  return Array.from({length},(_,index)=>({day:index+1,title:`Day ${index+1} · ${destination}`,morning:"Explore a neighborhood and enjoy breakfast.",afternoon:`Discover a cultural or outdoor attraction${interests?` inspired by ${interests}`:""}.`,evening:`Enjoy a ${budget} dinner and a ${pace} evening.`}));
}
function cleanDay(value:unknown,index:number):ActivityDay|null{
  if(!value||typeof value!=="object")return null;
  const d=value as Record<string,unknown>;
  if(!["title","morning","afternoon","evening"].every(key=>typeof d[key]==="string"&&(d[key] as string).trim().length>0&&(d[key] as string).length<=700))return null;
  return {day:index+1,title:String(d.title).trim(),morning:String(d.morning).trim(),afternoon:String(d.afternoon).trim(),evening:String(d.evening).trim()};
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
  const key=process.env.OPENAI_API_KEY;
  // Only live AI trips consume the lifetime allowance; preview samples do not.
  const persistentMode=Boolean(key)&&supabaseConfigured()&&serviceConfigured();
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
  if(!key)return NextResponse.json({mode:"sample",destination:place,days:sample(place,length,safeBudget,safePace,safeInterests),notice:"AI generation is not configured."});
  try{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),18000);
    let response:Response;
    try{
      response=await fetch("https://api.openai.com/v1/chat/completions",{
        method:"POST",signal:controller.signal,
        headers:{"Authorization":`Bearer ${key}`,"Content-Type":"application/json"},
        body:JSON.stringify({
          model:process.env.OPENAI_MODEL||"gpt-4o-mini",
          temperature:0.5,
          response_format:{type:"json_object"},
          messages:[
            {role:"system",content:"You are Aero, a practical travel itinerary assistant. Return ONLY a JSON object with a days array. Each day must have title, morning, afternoon, evening as concise, useful strings. Do not claim opening hours, exact prices, travel times, or availability are verified. Do not invent exact addresses. Prefer well-known attractions and realistic geographic groupings. Make each day distinct. No markdown."},
            {role:"user",content:JSON.stringify({destination:place,startDate,endDate,numberOfDays:length,travelers:safeTravelers,budget:safeBudget,pace:safePace,interests:safeInterests})}
          ]
        })
      });
    }finally{clearTimeout(timeout);}
    if(!response.ok)throw Error("AI service unavailable");
    const payload=await response.json() as {choices?:Array<{message?:{content?:string}}>} ;
    const parsed=JSON.parse(payload.choices?.[0]?.message?.content||"{}") as {days?:unknown};
    if(!Array.isArray(parsed.days)||parsed.days.length!==length)throw Error("Invalid AI response");
    const days=parsed.days.map((day,index)=>cleanDay(day,index));
    if(days.some(day=>!day))throw Error("Invalid itinerary format");
    if(tripId){
      const saved=await rest("trips?id=eq."+encodeURIComponent(tripId),"PATCH","",{itinerary:{days},status:"ready",updated_at:new Date().toISOString()},true);
      if(!saved.ok)return NextResponse.json({error:"Trip generated but could not be saved. Contact support before retrying."},{status:502});
    }
    return NextResponse.json({mode:"ai-unverified",destination:place,days,tripId,notice:"AI suggestions are not verified against live place or route data."});
  }catch{
    if(tripId){
      await rest("trips?id=eq."+encodeURIComponent(tripId),"PATCH","",{status:"failed",updated_at:new Date().toISOString()},true).catch(()=>{});
      return NextResponse.json({error:"Aero could not generate your trip. Your reservation is retained; contact support to retry."},{status:503});
    }
    return NextResponse.json({mode:"sample",destination:place,days:sample(place,length,safeBudget,safePace,safeInterests),notice:"AI generation was unavailable. Showing a sample itinerary instead."});
  }
}
