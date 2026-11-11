# Aero backend setup (preview branch only)

## Current behavior
- Without OPENAI_API_KEY, /api/trips returns **HTTP 503 AI_NOT_CONFIGURED**, not a fake itinerary.
- With OPENAI_API_KEY but without all Supabase credentials, /api/trips generates **unverified AI** itineraries; these are not persisted and the lifetime allowance is not enforceable. Provider failures return explicit, safe HTTP 503 errors and a diagnostic code.
- With OpenAI + Supabase credentials, the API **requires a Supabase access token** in the Authorization: Bearer header and atomically claims one lifetime trip per account. **The current planner UI does not yet sign users in or send this token**. Do not enable all credentials for public users until the sign-in flow is implemented.
- There is no Google Places verification or map integration yet.

## Server environment variables
- OPENAI_API_KEY (server only)
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
- One AI edit is **not yet implemented**.
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
