import {NextResponse} from "next/server";
import {authenticate,rest,supabaseConfigured} from "@/lib/supabase-server";
export const dynamic="force-dynamic";

const headers={"Cache-Control":"no-store"};
export async function GET(request:Request){
  if(!supabaseConfigured())return NextResponse.json({error:"Trip accounts are not configured yet."},{status:503,headers});
  try{
    const auth=await authenticate(request);
    if(!auth)return NextResponse.json({error:"Sign in to view your trips."},{status:401,headers});
    const query="trips?select=id,destination,start_date,end_date,travelers,status,itinerary,ai_edits_used,edit_state,edit_attempts,created_at&archived_at=is.null&order=created_at.desc&limit=20";
    const response=await rest(query,"GET",auth.token);
    if(!response.ok){
      console.error("[Aero] Saved trips query failed",{status:response.status});
      return NextResponse.json({error:"Could not load your trips."},{status:502,headers});
    }
    const trips=await response.json();
    return NextResponse.json({trips},{headers});
  }catch{
    return NextResponse.json({error:"Trip storage is temporarily unavailable."},{status:503,headers});
  }
}
