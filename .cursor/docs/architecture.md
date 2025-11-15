# Architecture Overview

- Next.js 15 App Router project rooted under `src/app`.
- Multi-step survey client lives in `src/components/survey` and is rendered on `/` via `MultiStepSurvey`.
- Server persistence handled through Supabase via API routes:
  - `src/app/api/survey/submit/route.ts` for public submissions.
  - `src/app/api/responses/route.ts` for admin listings.
- Shared schema/types in `src/lib/survey-schema.ts` and `src/types/survey.ts`.
- Admin tooling uses service-role Supabase client; fetch failures occur when Supabase URL env is not the HTTPS REST endpoint.
