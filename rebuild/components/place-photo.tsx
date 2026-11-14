"use client";

import {useEffect,useState} from "react";
import {ImageOff, MapPin} from "lucide-react";

type Attribution={name:string;url:string|null};
type PhotoInfo={photo:string|null;attribution?:Attribution[];placeName?:string};
type Props={name:string;query:string;priority?:boolean};

/** Photo lookup runs only when the card mounts (the selected day), not for all trip days. */
export default function PlacePhoto({name,query,priority=false}:Props){
  const [info,setInfo]=useState<PhotoInfo|null>(null);
  const [loading,setLoading]=useState(true);
  const [failed,setFailed]=useState(false);
  useEffect(()=>{
    const controller=new AbortController();
    setInfo(null);setFailed(false);setLoading(true);
    const params=new URLSearchParams({name,q:query});
    void fetch("/api/places/photo?"+params.toString(),{signal:controller.signal,cache:"no-store"})
      .then(async response=>response.ok?await response.json() as PhotoInfo:{photo:null})
      .then(payload=>{if(!controller.signal.aborted){setInfo(payload);setLoading(false);}})
      .catch(()=>{if(!controller.signal.aborted){setInfo({photo:null});setLoading(false);}});
    return()=>controller.abort();
  },[name,query]);

  const photo=info?.photo&&!failed;
  return <figure className={"aero-place-photo"+(photo?" has-photo":"")} aria-label={"Photo for "+name}>
    {photo?<img src={info.photo!} alt={"Photo of "+(info?.placeName||name)} loading={priority?"eager":"lazy"} decoding="async" onError={()=>setFailed(true)}/>:<div className="aero-photo-placeholder">
      {loading?<span className="aero-photo-shimmer" aria-label="Looking for a place photo"/>:<><ImageOff size={22} aria-hidden="true"/><span>Photo unavailable</span></>}
    </div>}
    {photo&&<figcaption>
      <span><MapPin size={12} aria-hidden="true"/> Place photo via Google Maps</span>
      {info?.attribution?.length? <span className="aero-photo-credits">
        {info.attribution.map((author,index)=>author.url?<a key={index} href={author.url} target="_blank" rel="noopener noreferrer">{author.name}</a>:<span key={index}>{author.name}</span>)}
      </span>:null}
    </figcaption>}
  </figure>;
}
