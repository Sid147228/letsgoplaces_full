"use client";
import {useEffect,useState} from "react";
import type {Session} from "@supabase/supabase-js";
import {browserSupabase} from "@/lib/supabase-browser";

type Props={onSession:(session:Session|null)=>void};
export default function AeroAuth({onSession}:Props){
  const [session,setSession]=useState<Session|null>(null);
  const [email,setEmail]=useState("");
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");
  const configured=Boolean(browserSupabase());
  useEffect(()=>{
    const supabase=browserSupabase();
    if(!supabase)return;
    let active=true;
    void supabase.auth.getSession().then(({data})=>{if(active){setSession(data.session);onSession(data.session);}}).catch(()=>{if(active)setMessage("Unable to restore your session.");});
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,next)=>{if(active){setSession(next);onSession(next);}});
    return()=>{active=false;subscription.unsubscribe();};
  },[onSession]);
  async function sendLink(){
    const supabase=browserSupabase();if(!supabase)return;
    setBusy(true);setMessage("");
    try{
      const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:window.location.origin+"/plan"}});
      if(error)throw error;
      setMessage("Check your email for a secure sign-in link. Return to this planner after signing in.");
    }catch(e){setMessage(e instanceof Error?e.message:"Unable to send sign-in link.");}
    finally{setBusy(false);}
  }
  async function signOut(){
    const supabase=browserSupabase();if(!supabase)return;
    setBusy(true);
    const {error}=await supabase.auth.signOut();
    if(error)setMessage(error.message);
    setBusy(false);
  }
  if(!configured)return <p className="auth-note">Trip accounts are not connected yet. You can preview the planner, but saved trips and lifetime limits require Supabase setup.</p>;
  if(session)return <div className="auth-signed-in"><span>Signed in as <strong>{session.user.email||"traveler"}</strong></span><button type="button" onClick={signOut} disabled={busy}>Sign out</button></div>;
  return <div className="auth-panel"><div><strong>Save your free trip with Aero</strong><p>Sign in to generate and keep your one lifetime free trip (up to 3 days).</p></div><div className="auth-input-row"><input type="email" aria-label="Email address" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={254}/><button type="button" onClick={sendLink} disabled={busy||!email.includes("@")}>{busy?"Sending…":"Email sign-in link"}</button></div>{message&&<p role="status" className="auth-note">{message}</p>}</div>;
}
