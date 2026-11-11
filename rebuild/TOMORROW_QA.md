# Tomorrow's Aero QA checkpoint

Branch: `rebuild/clean-mvp`
Project: `letsg0places-rebuild-preview` (not the original production project)

## What was prepared today

- Gemini-first backend adapter: `lib/ai-provider.ts`
- Structured 3-to-5-stop/day itinerary generation and output checks
- User-facing errors instead of fake fallback itineraries
- Safe deployment diagnostics: `GET /api/health`
- Copy itinerary and Print / Save PDF buttons
- Dated day headings and print stylesheet

## Before deployment

1. Verify `GEMINI_API_KEY` appears in the **rebuild preview** project's Vercel environment variable list. It was not present when last checked. Assign it to the relevant environment(s), including Production if using the rebuild project's primary URL. Do not paste the key into chats or logs.
2. Deploy the newest commit of `rebuild/clean-mvp`. Direct API deployment was blocked by `402 api-deployments-free-per-day` on 11 Nov 2026.
3. Verify `/api/health` reports release `aero-gemini-2026-11-11-r3`, `aiProvider=gemini`, `aiConfigured=true`, and expected branch.
4. Test a 1-day itinerary and a 3-day itinerary; inspect completeness, varied stops, relevant neighborhoods, print, and copy.
5. If generation fails, inspect sanitized function logs. No secret values should appear. Test the model quota and API key eligibility.
6. Check build logs and `npm run typecheck` in the rebuild root.
7. Verify free plan 3-day rule at server side; lifetime trip and one-edit limits are still incomplete end-to-end.
8. Treat hours, ticket prices and Google Maps search results as unverified until Google Places integration is finished.

## Do not confuse

- `OPENAI_API_KEY` is not required when Gemini is configured.
- The Google AI Ultra app plan does not itself guarantee paid API quota.
- `Print / save PDF` is browser print, not server generated PDF.
- Saved trips and sign-in still need completion; no misleading “saved” claim.
