# Aero backend setup (preview branch only)

## Current behavior
- Without GEMINI_API_KEY or OPENAI_API_KEY, /api/trips returns **HTTP 503 AI_NOT_CONFIGURED**, not a fake itinerary.
- With an AI provider and **no Supabase variables set**, /api/trips generates an unverified, unsaved itinerary. If **some** Supabase credentials are set but others are missing, generation fails closed with HTTP 503 instead of bypassing entitlement rules. Provider failures return safe HTTP 503 codes.
- With an AI provider + complete Supabase credentials, the API **requires a Supabase access token** and atomically claims one lifetime trip per account. The planner contains passwordless email sign-in, sends the bearer token and offers a My Trips library; however, the end-to-end flow still needs testing on a dedicated active Supabase project.
- Place photo rendering is optional and requires its own Google Places API key; full verified maps and locations are not yet implemented.

## Server environment variables
- GEMINI_API_KEY (server only; preferred when configured)\n- GEMINI_MODEL (optional; defaults to gemini-3.5-flash-lite)\n- OPENAI_API_KEY (server only; fallback when Gemini key is absent)
- OPENAI_MODEL (optional; defaults to gpt-4o-mini)
- SUPABASE_URL (server only)
- SUPABASE_ANON_KEY (server only)
- SUPABASE_SERVICE_ROLE_KEY (server only; **never** use NEXT_PUBLIC_ for this)

Run `supabase/migrations/20261111_aero_free.sql` in the Supabase SQL editor before enabling persistence. Do not run the migration on the production database without reviewing the one-trip unique index and free-plan assumptions.

## Security model
- Supabase Auth verifies the bearer token against /auth/v1/user.
- Postgres function claim_free_trip uses auth.uid() and a unique user_id index to enforce the lifetime trip claim under concurrent requests.
- RLS permits users to read their own trips, not to write trip status or AI output.
- Only the server uses the service-role credential to save generated output.
- The 3-day limit is validated in both API and database.
- One AI edit is implemented in the rebuild backend/UI but is **not live until the Supabase migration and credentials are configured**.
- A failed AI generation currently leaves the trip reserved as failed, rather than silently allowing extra attempts. Recovery tooling is still required before launch.

## Remaining launch blockers
1. Build and test Supabase sign-in UI and token forwarding.
2. Add a safe retry path for failed generation.
3. Implement one-edit-per-trip transaction and Aero edit UI.
4. Verify places and routes through an approved maps provider.
5. Add API abuse controls, observability, and automated tests.
6. Verify deployment/build and database migration in the preview environment.

Never configure the production Vercel project from this branch.

## Deployment diagnostics

GET `/api/health` to check `aiConfigured`, `deploymentEnvironment`, `gitBranch`, and `gitSha` without exposing the API key. If this path returns 404, the new code has not been deployed. The `release` marker is `aero-detailed-2026-11-11-r2`. This endpoint reports whether an environment variable exists; it does not prove the key is valid or funded.

## Gemini development

Create a Gemini API key in Google AI Studio and add `GEMINI_API_KEY` to the **letsg0places-rebuild-preview** Vercel project, targeting the environment that hosts the rebuild (Production and Preview if both are in use). Redeploy after adding or editing environment variables. With both keys present, Gemini is selected; if Gemini returns an error, Aero reports the error instead of silently charging OpenAI. Gemini's free API quota is not the same as a Google AI Ultra app subscription. `/api/health` lists the active provider and deployment environment without exposing secrets.

## Account implementation added 12 Nov 2026

- Added `@supabase/supabase-js` browser auth, a passwordless email sign-in component and session-based requests.
- Environment variables required for browser: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public anon key, NEVER a service role key).
- Environment variables required on server: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only).
- Enable email OTP/magic-link and allow the rebuild preview URL and `/plan` as redirect destinations in the dedicated Supabase Auth project.
- Apply both migrations in order: `20261111_aero_free.sql`, `20261112_aero_one_edit.sql` on a **dedicated rebuild Supabase project**. The pre-existing `letsgoplaces` Supabase project is inactive and was NOT modified.
- The one-edit RPC uses atomic conditional UPDATE so concurrent edit attempts cannot each claim a free edit. Failed edit generations now reset to `failed` and can be retried (maximum 3 provider attempts); permanent errors that prevent resetting the lock still require support.
- Account switches clear cached trip data in the browser. Auth and saved trips have NOT been tested against a running Supabase instance yet.
- Vercel `GEMINI_API_KEY` is now detected for Production in the rebuild project as of 12 Nov; the application still needs the next deployment and runtime testing.

## Development release checkpoint

Latest Supabase integration includes passwordless email login, owner-only saved-trip retrieval, one lifetime trip claim and one successful AI edit with at most three total edit-generation attempts. These features were committed only to `rebuild/clean-mvp`; **no database migration has been applied** to the inactive legacy `letsgoplaces` Supabase project. Before public activation, create/choose a dedicated rebuild Supabase project, run both migrations, set the public anon and server-only service credentials, configure Auth redirect allowlists, and perform integration and concurrency tests. Never share service role keys in browser variables.

### Gemini model availability (November 2026)
New Gemini API projects may receive HTTP 404 for Gemini 2.5 models. Aero defaults to `gemini-3.5-flash-lite` and retries `gemini-3.8-flash` only when the primary model returns 404. `GEMINI_MODEL` can override the primary model; check current account entitlements and free-tier quotas independently. The preview project is separate from the legacy production project.

## My Trips, archive and latest release checkpoint (14 Nov 2026)

- New `/my-trips` authenticated library with owner-visible destination cards, dates, trip status and reopen links to `/plan?tripId=<uuid>`.
- Owner-only `POST /api/trips/archive` invokes `archive_free_trip`. It **removes the itinerary content** and hides the record from My Trips, but intentionally **preserves a minimal claim row** for lifetime free-trip enforcement. This is NOT full account/data deletion. Full erasure must be a separate user-rights/account deletion flow.
- Apply **three migrations in order** on a **new, dedicated rebuild Supabase project**: `20261111_aero_free.sql`, `20261112_aero_one_edit.sql`, `20261114_aero_archive.sql`.
- Auth email Redirect URLs: configure rebuild preview `/plan` and `/my-trips` in Supabase; the login component redirects to `/plan`.
- Needed browser env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`; needed server env: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only). No keys in source control.
- `npm run check` runs TypeScript and built-in Node policy tests; `npm test` checks calendar dates, three-day limits and UUID parsing. Node 22+ is needed for TS stripping.
- Before enabling broadly: test cross-account isolation, archived-trip visibility, DB claim concurrency and restore prevention; review RLS and PostgREST access; run SQL security advisors.
- Do not apply migrations to the dormant legacy database. Supabase organization/project choice is pending.
