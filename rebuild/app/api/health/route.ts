import {NextResponse} from "next/server";
import {supabaseConfigured,serviceConfigured} from "@/lib/supabase-server";

export const dynamic="force-dynamic";
/**
 * Public, read-only deployment diagnostics. Never exposes secret values.
 * A build identifier helps distinguish the current branch from stale deployments.
 */
export async function GET(){
  return NextResponse.json({
    service:"aero",
    release:"aero-detailed-2026-11-11-r2",
    aiConfigured:Boolean(process.env.OPENAI_API_KEY?.trim()),
    model:process.env.OPENAI_MODEL||"gpt-4o-mini",
    supabaseConfigured:supabaseConfigured()&&serviceConfigured(),
    deploymentEnvironment:process.env.VERCEL_ENV||"unknown",
    gitBranch:process.env.VERCEL_GIT_COMMIT_REF||"unknown",
    gitSha:process.env.VERCEL_GIT_COMMIT_SHA?.slice(0,12)||"unknown"
  },{headers:{"Cache-Control":"no-store, max-age=0"}});
}
