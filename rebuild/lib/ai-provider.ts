/** Private server-only provider adapter. Never expose API keys or raw responses. */
export type Provider = "gemini" | "openai";
export type AiFailureCode = "AI_AUTH_FAILED" | "AI_RATE_LIMITED" | "AI_MODEL_UNAVAILABLE" | "AI_PROVIDER_ERROR" | "AI_TIMEOUT" | "AI_RESPONSE_INVALID";
export class AiProviderError extends Error {
  constructor(public readonly code: AiFailureCode, public readonly provider: Provider) {
    super(code);
    this.name = "AiProviderError";
  }
}
export function configuredProvider():Provider|null {
  if(process.env.GEMINI_API_KEY?.trim()) return "gemini";
  if(process.env.OPENAI_API_KEY?.trim()) return "openai";
  return null;
}
export function modelName(provider:Provider):string {
  return provider==="gemini" ? (process.env.GEMINI_MODEL||"gemini-3.5-flash-lite") : (process.env.OPENAI_MODEL||"gpt-4o-mini");
}
function errorCode(status:number):AiFailureCode {
  return status===401||status===403?"AI_AUTH_FAILED":status===429?"AI_RATE_LIMITED":status===404?"AI_MODEL_UNAVAILABLE":"AI_PROVIDER_ERROR";
}
export async function generateItineraryJson(system:string,details:unknown):Promise<string> {
  const provider=configuredProvider();
  if(!provider)throw new Error("AI_NOT_CONFIGURED");
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),45000);
  try {
    let model=modelName(provider);
    let response:Response;
    if(provider==="gemini") {
      const requestBody=JSON.stringify({
        systemInstruction:{parts:[{text:system}]},
        contents:[{role:"user",parts:[{text:JSON.stringify(details)}]}],
        generationConfig:{responseMimeType:"application/json",temperature:0.4,maxOutputTokens:8192}
      });
      const callGemini=(name:string)=>fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/"+encodeURIComponent(name)+":generateContent",
        {method:"POST",signal:controller.signal,cache:"no-store",
          headers:{"Content-Type":"application/json","x-goog-api-key":process.env.GEMINI_API_KEY!},
          body:requestBody}
      );
      response=await callGemini(model);
      // Legacy 2.5 and some newer models can respond 404 for recently created projects.
      // Only retry a model-not-found response, never authentication, billing or quota failures.
      if(response.status===404&&model!=="gemini-3.8-flash") {
        console.warn("[Aero] Gemini model unavailable, trying supported alternative",{model,status:404});
        model="gemini-3.8-flash";
        response=await callGemini(model);
      }
    } else {
      response=await fetch("https://api.openai.com/v1/chat/completions",{
        method:"POST",signal:controller.signal,cache:"no-store",
        headers:{"Content-Type":"application/json",Authorization:"Bearer "+process.env.OPENAI_API_KEY!},
        body:JSON.stringify({model,temperature:0.4,response_format:{type:"json_object"},messages:[{role:"system",content:system},{role:"user",content:JSON.stringify(details)}]})
      });
    }
    if(!response.ok) {
      const code=errorCode(response.status);
      console.error("[Aero] Provider rejected request",{provider,model,status:response.status,code});
      throw new AiProviderError(code,provider);
    }
    if(provider==="gemini"){
      const payload=await response.json() as {candidates?:Array<{content?:{parts?:Array<{text?:string}>};finishReason?:string}>};
      const candidate=payload.candidates?.[0];
      const raw=candidate?.content?.parts?.map(part=>part.text||"").join("")||"";
      if(!raw.trim()||candidate?.finishReason==="SAFETY")throw new AiProviderError("AI_RESPONSE_INVALID",provider);
      return raw;
    }
    const payload=await response.json() as {choices?:Array<{message?:{content?:string}}>} ;
    const raw=payload.choices?.[0]?.message?.content;
    if(!raw?.trim())throw new AiProviderError("AI_RESPONSE_INVALID",provider);
    return raw;
  }catch(error){
    if(error instanceof AiProviderError)throw error;
    if(error instanceof Error&&error.name==="AbortError")throw new AiProviderError("AI_TIMEOUT",provider);
    console.error("[Aero] Provider transport failure",{provider,reason:error instanceof Error?error.name:"unknown"});
    throw new AiProviderError("AI_PROVIDER_ERROR",provider);
  }finally{clearTimeout(timer);}
}
