import {NextResponse} from "next/server";

export const runtime="nodejs";
export const dynamic="force-dynamic";

type Attribution={displayName?:string;uri?:string};
type Photo={name?:string;authorAttributions?:Attribution[]};
type Place={displayName?:{text?:string};photos?:Photo[]};
const photoPattern=/^places\/[A-Za-z0-9_-]{5,}\//; // Extra validation below before proxying
const safePhoto=/^places\/[A-Za-z0-9_-]{5,}\/photos\/[A-Za-z0-9_-]{10,600}$/;

const unavailable=()=>NextResponse.json({photo:null},{headers:{"Cache-Control":"no-store"}});
function normalize(input:string){return input.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();}
function plausibleMatch(requested:string,actual:string):boolean{
  const stopwords=new Set(["the","and","of","at","in","new","city","museum","park","gallery","center","centre"]);
  const wanted=normalize(requested).split(" ").filter(word=>word.length>=3&&!stopwords.has(word));
  const found=new Set(normalize(actual).split(" "));
  if(!wanted.length)return normalize(requested)===normalize(actual);
  return wanted.filter(word=>found.has(word)).length/wanted.length>=0.5;
}
function allowedAttribution(url:unknown):string|null{
  if(typeof url!=="string")return null;
  try{
    const parsed=new URL(url.startsWith("//")?"https:"+url:url);
    return parsed.protocol==="https:"?parsed.toString():null;
  }catch{return null;}
}
function key(){return process.env.GOOGLE_PLACES_API_KEY||process.env.GOOGLE_MAPS_API_KEY;}

export async function GET(request:Request){
  const apiKey=key();
  // No key means no requests to Google, and a graceful UI placeholder.
  if(!apiKey)return unavailable();
  const url=new URL(request.url);
  const photo=url.searchParams.get("photo");
  if(photo!==null){
    if(photo.length>700||!safePhoto.test(photo))return new Response(null,{status:400});
    try{
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),9000);
      let response:Response;
      try{
        response=await fetch("https://places.googleapis.com/v1/"+photo+"/media?maxWidthPx=720",{
          headers:{"X-Goog-Api-Key":apiKey},cache:"no-store",signal:controller.signal,
          redirect:"follow"
        });
      }finally{clearTimeout(timeout);}
      const mime=response.headers.get("content-type")||"";
      if(!response.ok||!/^image\/(jpeg|png|webp|gif)/i.test(mime))return new Response(null,{status:404,headers:{"Cache-Control":"no-store"}});
      const data=await response.arrayBuffer();
      if(data.byteLength>3500000)return new Response(null,{status:413});
      return new Response(data,{headers:{"Content-Type":mime,"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
    }catch{return new Response(null,{status:502,headers:{"Cache-Control":"no-store"}});}
  }

  const query=url.searchParams.get("q")?.trim()||"";
  const name=url.searchParams.get("name")?.trim()||"";
  if(!query||query.length>150||name.length<3||name.length>120)return unavailable();
  try{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),7500);
    let response:Response;
    try{
      response=await fetch("https://places.googleapis.com/v1/places:searchText",{
        method:"POST",cache:"no-store",signal:controller.signal,
        headers:{"X-Goog-Api-Key":apiKey,"X-Goog-FieldMask":"places.displayName,places.photos","Content-Type":"application/json"},
        body:JSON.stringify({textQuery:query,pageSize:1})
      });
    }finally{clearTimeout(timeout);}
    if(!response.ok){
      console.warn("[Aero photos] Places lookup unavailable",{status:response.status});
      return unavailable();
    }
    const payload=await response.json() as {places?:Place[]};
    const place=payload.places?.[0];
    if(!place?.displayName?.text||!plausibleMatch(name,place.displayName.text))return unavailable();
    const image=place.photos?.find(p=>p.name&&safePhoto.test(p.name));
    if(!image?.name)return unavailable();
    const attribution=(image.authorAttributions||[]).slice(0,3).map(person=>({
      name:typeof person.displayName==="string"?person.displayName.slice(0,100):"Contributor",
      url:allowedAttribution(person.uri)
    }));
    return NextResponse.json({photo:"/api/places/photo?photo="+encodeURIComponent(image.name),attribution,placeName:place.displayName.text},{
      headers:{"Cache-Control":"no-store"}
    });
  }catch{return unavailable();}
}
