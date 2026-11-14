/** Small framework-independent policy helpers shared by Aero APIs and tests. */
export function validDate(value:unknown):value is string{
  if(typeof value!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const parsed=new Date(value+"T00:00:00Z");
  return Number.isFinite(parsed.valueOf())&&parsed.toISOString().slice(0,10)===value;
}
export function freeTripDays(start:unknown,end:unknown):number{
  if(!validDate(start)||!validDate(end))return 0;
  const count=Math.round((Date.parse(end)-Date.parse(start))/86400000)+1;
  return count>=1&&count<=3?count:0;
}
export function validTripId(value:unknown):value is string{
  return typeof value==="string"&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
