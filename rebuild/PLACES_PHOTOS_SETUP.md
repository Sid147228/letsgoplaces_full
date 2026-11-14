# Aero itinerary place photos

## What is implemented

- Optional one-photo-per-stop activity cards. Desktop: side-by-side image/text; mobile: image above text.
- Server-only Google Places API (New) Text Search and Place Photos. No Google API key is sent to browsers.
- Requests are only made for the currently selected day, not all trip days.
- Names are checked against the returned place to avoid obvious incorrect images.
- Google Maps and contributor photo attribution appear beneath each returned photo.
- Missing keys, unmatched places, expired photos and API failures produce a neutral placeholder. No random or AI-fabricated substitute photos.
- Google photo names and images are not stored in Supabase or persistent app caches.
- Print/PDF remains text-first and includes every day.

## Setup for separate rebuild preview project

1. In Google Cloud Console, create or select a Google Maps Platform project **with billing enabled**, and enable **Places API (New)**.
2. Create a **separate server-side API key** permitted to use Places API (New), not your Gemini API key. Add strict API restrictions. Vercel's outbound IP addresses can vary; don't apply a fixed IP restriction unless you have a configured stable egress service.
3. In the Vercel **letsg0places-rebuild-preview** project add `GOOGLE_PLACES_API_KEY` to the applicable environment, normally Production. Never use a `NEXT_PUBLIC_` prefix or commit the key.
4. Apply a small quota and budget alerts in Google Cloud before allowing photo requests. Text Search requests using `places.photos` and `places.displayName` have chargeable Google Maps Platform SKUs; Place Photos can also incur charges. Google AI Ultra does **not** include these Maps Platform requests.
5. Redeploy the rebuild only when ready. GET `/api/health` should show `placesPhotosConfigured:true` (never exposes the key).
6. Test places with unique names in different cities, tabs 1–3, attribution links, no-photo fallback, iPhone width and print.

## Cost and policy notes

The browser asks for metadata when a stop image first appears; it then requests the photo media through a server-only proxy. This is **not** a general-purpose free image search. It incurs live Places Text Search and Photo requests per rendered stop, and some tab transitions can make fresh requests. Limit quotas to protect your budget before opening the site publicly. Google photo resource names can expire and are deliberately not stored. Photos must carry the required Google Maps and author attributions. Google Maps attribution/policy requirements, your public Terms of Use and Privacy Policy must be satisfied before launch.

Authoritative docs:
- https://developers.google.com/maps/documentation/places/web-service/place-photos
- https://developers.google.com/maps/documentation/places/web-service/text-search
- https://developers.google.com/maps/documentation/places/web-service/policies
- https://developers.google.com/maps/documentation/places/web-service/usage-and-billing

## Known gaps

- Live photo lookup requires Google Places billing/key and has not been tested with real Google results.
- The UI presently uses ordered map links, not verified map pins.
- There is no application-wide distributed per-user rate limiter; enforce Google Cloud quotas and add a production abuse-control layer before high-traffic launch.
