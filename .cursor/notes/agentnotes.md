# Agent Notes

## User & Process Preferences
- Follow detailed planning workflow; wait for plan approval before coding and prefer absolute paths when running tools.
- Keep `.cursor` knowledge base up to date (rules, tools, docs, notes). Required note files: `project_checklist.md`, `notebook.md`, `agentnotes.md`.
- Use todo tracking via `todo_write`, marking tasks in progress sequentially.
- Avoid starting local servers unless explicitly asked; provide concise, structured status updates.

## Project Structure Insights
- Next 15 app using `/src/app` routes with tanstack form front-end and Supabase persistence.
- Supabase access now flows through `src/lib/supabase-config.ts`, which normalizes URLs (including Postgres connection strings) before instantiating clients.
- `.cursor/tools` now populated with shared helpers (`chat_summary_tool.py`, `createdocumentation.py`, etc.).

## Working Notes
- Pending work: document the Supabase URL expectations, update notes, and run lint/tests plus review logging.
- Security follow-up: enable RLS for `survey_responses` once service-role policies defined; admin password currently defaulting if env missing.
- The survey header now uses `/public/vln_logo.png` everywhere: step 0 renders it inside an `<h1>` (with an `sr-only` text label) via the new `SurveyLogo` helper, and later steps reuse the same component in a compact variant.
- Steps 1–5 now mirror the Google Form: new role wording, updated perception/trust scales, expanded community factors, a 1–7 usability toggle, refreshed resource list, and granular referral frequency (stored as both a boolean and `refer_others_detail` so reporting stays rich).
