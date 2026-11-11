import {NextResponse} from "next/server";
import {authenticate,rest,supabaseConfigured} from "@/lib/supabase-server";
export const dynamic="force-dynamic";
export async function GET(request:Request){
  if(!supabaseConfigured())return NextResponse.json({error:"Trip accounts are not configured yet."},{status:503});
  const auth=await authenticate(request);
  if(!auth)return NextResponse.json({error:"Sign in to view your trips."},{status:401});
  const response=await rest("trips?select=id,destination,start_date,end_date,status,itinerary,ai_edits_used,created_at&order=created_at.desc&limit=20","GET",auth.token);
  if(!response.ok)return NextResponse.json({error:"Could not load trips."},{status:502});
  return NextResponse.json({trips:await response.json()},{headers:{"Cache-Control":"no-store"}});
}
