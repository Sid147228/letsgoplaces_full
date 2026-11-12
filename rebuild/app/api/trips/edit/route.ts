import {NextResponse} from "next/server";
import {authenticate,rest,supabaseConfigured,serviceConfigured} from "@/lib/supabase-server";
import {configuredProvider,generateItineraryJson,AiProviderError} from "@/lib/ai-provider";

type Stop={time:string;name:string;description:string;area:string;category:string;tip:string;searchQuery:string};
type Day={day:number;title:string;morning:string;afternoon:string;evening:string;stops:Stop[]};
type StoredTrip={id:string;user_id:string;destination:string;start_date:string;end_date:string;itinerary:{days:Day[]}|null};
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function validateDay(value:unknown,index:number):Day|null{
  if(!value||typeof value!=="object"||Array.isArray(value))return null;
  const d=value as Record<string,unknown>;
  if(!["title","morning","afternoon","evening"].every(k=>typeof d[k]==="string"&&(d[k] as string).trim().length>0&&(d[k] as string).length<=700))return null;
  if(!Array.isArray(d.stops)||d.stops.length<3||d.stops.length>7)return null;
  const stops:Stop[]=[];
  for(const raw of d.stops){
    if(!raw||typeof raw!=="object"||Array.isArray(raw))return null;
    const stop=raw as Record<string,unknown>;
    if(!["time","name","description","area","category","tip","searchQuery"].every(k=>typeof stop[k]==="string"&&(stop[k] as string).trim().length>0&&(stop[k] as string).length<=400))return null;
    stops.push({time:String(stop.time),name:String(stop.name),description:String(stop.description),area:String(stop.area),category:String(stop.category),tip:String(stop.tip),searchQuery:String(stop.searchQuery)});
  }
  return {day:index+1,title:String(d.title),morning:String(d.morning),afternoon:String(d.afternoon),evening:String(d.evening),stops};
}
export async function POST(request:Request){
  if(!supabaseConfigured()||!serviceConfigured()||!configuredProvider())
    return NextResponse.json({error:"AI editing is not configured."},{status:503});
  let body:unknown;
  try{body=await request.json();}catch{return NextResponse.json({error:"Invalid request."},{status:400});}
  if(!body||typeof body!=="object"||Array.isArray(body))return NextResponse.json({error:"Invalid request."},{status:400});
  const {tripId,instruction}=body as Record<string,unknown>;
  if(typeof tripId!=="string"||!uuid.test(tripId)||typeof instruction!=="string"||instruction.trim().length<5||instruction.length>500)
    return NextResponse.json({error:"Enter a trip and a clear edit request (5–500 characters)."},{status:400});
  const auth=await authenticate(request).catch(()=>null);
  if(!auth)return NextResponse.json({error:"Sign in to edit your saved trip."},{status:401});
  const fetched=await rest("trips?id=eq."+encodeURIComponent(tripId)+"&select=id,user_id,destination,start_date,end_date,itinerary,status,ai_edits_used","GET",auth.token).catch(()=>null);
  if(!fetched?.ok)return NextResponse.json({error:"Unable to access the trip."},{status:502});
  const rows=await fetched.json() as StoredTrip[];
  const trip=rows[0];
  if(!trip?.itinerary?.days?.length)return NextResponse.json({error:"Saved itinerary not found."},{status:404});
  // Claim exactly one edit BEFORE making the provider call.
  const claim=await rest("rpc/claim_free_edit","POST",auth.token,{p_trip_id:tripId}).catch(()=>null);
  if(!claim?.ok)return NextResponse.json({error:"Your one free Aero edit has already been used, or this trip isn't ready."},{status:409});
  try{
    const raw=await generateItineraryJson(
      "You are Aero, a thoughtful itinerary editor. Return ONLY valid JSON with a days array having exactly the original day count. Each day requires title, morning, afternoon, evening and stops (3 to 5). Each stop requires time, name, description, area, category, tip, searchQuery. Preserve geographic realism and the user's stated destination, trip length and dates. Follow the new edit instruction where practical. Do not invent businesses, hours, prices, addresses or travel times; do not claim real-time verification.",
      {destination:trip.destination,startDate:trip.start_date,endDate:trip.end_date,existingDays:trip.itinerary.days,instruction:instruction.trim()}
    );
    const parsed=JSON.parse(raw) as {days?:unknown};
    if(!Array.isArray(parsed.days)||parsed.days.length!==trip.itinerary.days.length)throw Error("Invalid day count");
    const days=parsed.days.map(validateDay);
    if(days.some(day=>!day))throw Error("Invalid day structure");
    const saved=await rest("trips?id=eq."+encodeURIComponent(tripId),"PATCH","",{itinerary:{days},edit_state:"completed",updated_at:new Date().toISOString()},true);
    if(!saved.ok)throw Error("Save failed");
    return NextResponse.json({destination:trip.destination,days,mode:"ai-unverified",tripId,notice:"One Aero Free edit used. Verify activity details before visiting."},{headers:{"Cache-Control":"no-store"}});
  }catch(e){
    console.error("[Aero] Free edit failed",{code:e instanceof AiProviderError?e.code:"EDIT_FAILED"});
    const reset=await rest("trips?id=eq."+encodeURIComponent(tripId)+"&edit_state=eq.in_progress","PATCH","",{edit_state:"failed",updated_at:new Date().toISOString()},true).catch(()=>null);
    if(!reset?.ok)return NextResponse.json({error:"Aero couldn't complete the edit and couldn't release the retry lock. Contact support."},{status:503});
    return NextResponse.json({error:"Aero couldn't complete your edit. You can retry up to three provider attempts without using an extra edit.",retryAllowed:true},{status:503});
  }
}
