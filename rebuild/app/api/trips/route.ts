import { NextResponse } from "next/server";
function date(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value + "T00:00:00Z");
  return !Number.isNaN(d.valueOf()) && d.toISOString().slice(0,10) === value;
}
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { const value: unknown = await request.json(); if (!value || typeof value !== "object" || Array.isArray(value)) throw Error(); body = value as Record<string,unknown>; }
  catch { return NextResponse.json({error:"Invalid request."},{status:400}); }
  const { destination, startDate, endDate, budget, pace, interests } = body;
  if (typeof destination !== "string" || !destination.trim() || destination.length>120 || !date(startDate) || !date(endDate)) return NextResponse.json({error:"Enter a destination and valid travel dates."},{status:400});
  const length = Math.round((Date.parse(endDate)-Date.parse(startDate))/86400000)+1;
  if (length<1 || length>21) return NextResponse.json({error:"Trips must be between 1 and 21 days."},{status:400});
  const safeBudget = ["budget","moderate","luxury"].includes(String(budget))?String(budget):"moderate";
  const safePace = ["relaxed","balanced","active"].includes(String(pace))?String(pace):"balanced";
  const safeInterests = typeof interests==="string"?interests.slice(0,250):"";
  const days=Array.from({length},(_,index)=>({day:index+1,title:`Day ${index+1} · ${destination.trim()}`,morning:"Explore a local neighborhood and enjoy breakfast.",afternoon:`Discover a cultural or outdoor attraction${safeInterests?` inspired by ${safeInterests}`:""}.`,evening:`Enjoy a ${safeBudget} dinner and a ${safePace} evening.`}));
  return NextResponse.json({mode:"sample",destination:destination.trim(),days});
}
