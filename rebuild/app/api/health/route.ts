import {configuredProvider,modelName} from "@/lib/ai-provider";
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
    release:"aero-gemini-2026-11-11-r3",
    aiConfigured:Boolean(configuredProvider()),
    aiProvider:configuredProvider()||"none",
    model:configuredProvider()?modelName(configuredProvider()!):"none",
    supabaseConfigured:supabaseConfigured()&&serviceConfigured(),
    deploymentEnvironment:process.env.VERCEL_ENV||"unknown",
    gitBranch:process.env.VERCEL_GIT_COMMIT_REF||"unknown",
    gitSha:process.env.VERCEL_GIT_COMMIT_SHA?.slice(0,12)||"unknown"
  },{headers:{"Cache-Control":"no-store, max-age=0"}});
}
