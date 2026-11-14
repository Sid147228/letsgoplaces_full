import {NextResponse} from "next/server";
import {authenticate,rest,supabaseConfigured} from "@/lib/supabase-server";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request:Request){
  if(!supabaseConfigured())return NextResponse.json({error:"Trip accounts are not configured yet."},{status:503,headers});
  let body:unknown;
  try{body=await request.json();}catch{return NextResponse.json({error:"Invalid request."},{status:400,headers});}
  if(!body||typeof body!=="object"||Array.isArray(body))return NextResponse.json({error:"Invalid request."},{status:400,headers});
  const {tripId}=body as Record<string,unknown>;
  if(typeof tripId!=="string"||!uuid.test(tripId))
    return NextResponse.json({error:"Invalid trip identifier."},{status:400,headers});
  try{
    const auth=await authenticate(request);
    if(!auth)return NextResponse.json({error:"Sign in to manage your trips."},{status:401,headers});
    const response=await rest("rpc/archive_free_trip","POST",auth.token,{p_trip_id:tripId});
    if(!response.ok){
      console.error("[Aero] Trip archive rejected",{status:response.status});
      return NextResponse.json({error:"Could not remove this trip from your library."},{status:502,headers});
    }
    const archived=await response.json() as boolean;
    if(archived!==true)return NextResponse.json({error:"Trip not found or already removed."},{status:404,headers});
    return NextResponse.json({archived:true,notice:"Itinerary content was removed; your lifetime Aero Free claim remains recorded."},{headers});
  }catch{
    return NextResponse.json({error:"Trip storage is temporarily unavailable."},{status:503,headers});
  }
}
