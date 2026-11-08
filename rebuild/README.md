# letsg0places — clean rebuild

Independent Next.js application in `rebuild/`, isolated from the legacy root application.

## Local development
```bash
cd rebuild
npm install
npm run typecheck
npm run build
npm run dev
```

## Deployment
Create a **separate Vercel project** with this repository and set **Root Directory** to `rebuild`. Do not change the existing production deployment.

## Current scope
Premium landing page, responsive planner, validated sample itinerary API. **Sample itinerary is not AI-generated**. Real Aero AI, Google Places, Supabase and trip editing are planned integrations, not yet implemented.
