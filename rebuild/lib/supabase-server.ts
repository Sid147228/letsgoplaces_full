/** Supabase Auth verification and REST calls without exposing service-role keys. */
export type AuthUser = { id:string; email?:string };
const base=()=>process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon=()=>process.env.SUPABASE_ANON_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export function supabaseConfigured(){return Boolean(base()&&anon());}
export function serviceConfigured(){return Boolean(base()&&process.env.SUPABASE_SERVICE_ROLE_KEY);}
export async function authenticate(request:Request):Promise<{token:string;user:AuthUser}|null>{
  const match=/^Bearer (.+)$/i.exec(request.headers.get("authorization")||"");
  if(!match||!supabaseConfigured())return null;
  const response=await fetch(base()+"/auth/v1/user",{headers:{apikey:anon()!,Authorization:"Bearer "+match[1]},cache:"no-store"});
  if(!response.ok)return null;
  const user=await response.json() as AuthUser;
  if(typeof user.id!=="string"||!user.id)return null;
  return {token:match[1],user};
}
export async function rest(path:string,method:string,token:string,body?:unknown,service=false):Promise<Response>{
  const key=service?process.env.SUPABASE_SERVICE_ROLE_KEY:anon();
  if(!base()||!key)throw Error("Supabase is not configured");
  return fetch(base()+"/rest/v1/"+path,{method,cache:"no-store",headers:{apikey:key,Authorization:"Bearer "+(service?key:token),"Content-Type":"application/json",Prefer:"return=representation"},body:body===undefined?undefined:JSON.stringify(body)});
}
