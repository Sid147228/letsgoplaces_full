# Aero dashboard — review checkpoint

Commit target: `rebuild/clean-mvp` (do not merge or deploy automatically).

## Scope

- New `components/trip-dashboard.tsx` with a destination header, trip overview, day selector, individual activity timeline and route-order sidebar
- Stop category, neighborhood, estimated time, rich description and tip
- External links: each place search in Google Maps; entire day as a suggested walking directions request
- Copy itinerary, browser print/PDF, existing free-edit panel and return-to-planner action remain available
- Day switching requires no server calls and works for 1–3 day free plans
- Print includes **all** trip days, not just the selected tab
- Saved-trip date range is restored when opening a saved trip

## Accuracy and safety

The sidebar is **not an embedded interactive geographic map**. It displays ordered locations, without imaginary pins or travel-time claims. External Google Maps URLs may resolve to different venues; places and routing remain unverified until Google Places is integrated. No cost estimates or opening hours are invented. Error and preview notices remain visible.

## Review checklist

1. Generate a 3-day detailed itinerary using Gemini in the preview environment after deployment is permitted.
2. Switch days 1 → 2 → 3; verify distinct activities and that only the selected day's timeline and sidebar are visible.
3. Select a numbered stop in the route-order list and confirm the matching stop is visually emphasized.
4. Open an individual Google Maps search and a day route using the external links.
5. Copy the full itinerary, then confirm all three days appear in the clipboard content.
6. Print / Save PDF and verify all days (including hidden tabs) are visible in print.
7. Resize to 375px and tablet width: tabs should scroll, no horizontal page overflow, route panel moves below activity timeline.
8. Test a 1-day result, legacy summary-only itinerary, and an empty day array.
9. Reload a previously saved trip; confirm dates and the single-edit entitlement UI.
10. Verify keyboard focus states on day tabs, navigation, stop controls and external links.

## Deployment status

No deployment was triggered for this dashboard milestone. Latest Vercel Ready deployment previously observed was commit `254e40e`; this dashboard has not been visually validated in a running build. The dedicated rebuild Supabase migration and live account flow are also pending integration testing.
