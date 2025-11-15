# Notebook

## 2025-11-14
- Seeing `TypeError: fetch failed` bubbling from Supabase client inside `/api/survey/submit`; likely caused by invalid Supabase URL env (possibly Postgres connection string).
- Audited `/api/survey/submit`, `/api/responses`, and shared Supabase helpers; all trust `NEXT_PUBLIC_SUPABASE_URL` blindly, so a Postgres connection string causes Undici `fetch failed` because the host uses the `postgresql://` scheme.
- Imported shared `.cursor/tools` utilities plus research notes repo for future automation.
- Built `src/lib/supabase-config.ts` to normalize/restify URLs (including connection strings) and wired it through both API routes plus shared Supabase helpers.
- Added Vitest along with `tests/supabase-config.test.ts` to lock in the normalization logic.
- Documented environment expectations plus notes, then ran `pnpm lint` and `pnpm test` to verify everything passes.
- Swapped the “Annual Survey” text heading for the new `/public/vln_logo.png` asset inside `MultiStepSurvey`, keeping an `<h1>` wrapper with `sr-only` text so screen readers still announce the page title; sizing is handled via responsive width classes.
- Extended the PNG usage to every step by introducing a `SurveyLogo` helper that renders the same asset in both heading and compact variants, so the SVG no longer shows after step 0.
- Refined the Step 0 intro copy to left-align in a balanced `py-6 sm:py-8` wrapper, keeping the first/last sentences semibold per branding guidance.
- Replaced all survey questions (Steps 1–5) with the Google Form wording, including new role options, refreshed perception scales, the 1–7 usability scale, updated community factors, and expanded referral frequency responses; added derived referral detail storage so admin reporting keeps the nuanced values.
- Synced schema/types/defaults/API logic with the new enums, bumped Supabase constraints (role/trustworthiness/ease scores) and added a `refer_others_detail` column; admin responses table and review step now show the richer labels while keeping backward compatibility with existing rows.
