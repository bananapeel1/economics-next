# Next session brief

## Do first, two minutes: create the events table

Packet 1 shipped the funnel instrumentation, but there is no DDL path from code (the `exec_sql` RPC the
old pdf script used is gone). Until the table exists, `POST /api/events` answers 202 and drops events.

1. Open the Supabase SQL editor and paste **`scripts/create-app-events-table.sql`**. Run it once.
2. Confirm: `node audit/scripts/funnel-events.mjs` should print a summary instead of "does not exist".
3. The clean step-0 baseline then accumulates on its own. Re-read it after ~2 weeks and record it in
   `audit/PROGRESS.md` under Baselines.

## Still open from packet 0

- Three false marketing claims ("24 spec points", the "adaptive algorithm" wording, the hero badge) in
  `app/economics/page.js`, `app/business/page.js`, `app/ial-revision/page.js` and the unit pages. Another
  session (branch `feat/seo-page-structure`, formerly `feat/night-school`) is still editing those files in
  this same working tree. Coordinate before touching them.

## Then: packet 2 — Ids and safety net

Read `audit/PLAN.md` packet 2. No further content may be pushed before this lands.

- Mint a stable `id` on every quiz, practice, flashcard, recall and diagram item across all 43 sections
  (in place: add a field, move nothing). Deterministic ids (e.g. `sectionId:quiz:<hash of stem>`) so a
  re-run is idempotent.
- Add `item_id TEXT` to `practice_question_progress`, backfill from `question_index` using
  `audit/content-sections/` as the authority, switch the five API routes that read/write it
  (`app/api/practice/progress`, `app/api/flashcards-practice/progress`, `app/api/written-practice/*`,
  `app/api/learn-mode/progress` (dead; delete), `app/api/progress/quiz`) to `item_id`. Keep
  `question_index` as a dead column until packet 4.
- Switch block pinning (`quizIndices`, `practiceIndices`, `diagramRef`) to ids in `LearnModeTab.jsx`,
  with an index fallback for one release.
- `scripts/snapshot-section.mjs <ids…>` and `scripts/restore-section.mjs <file>` across all eight
  content tables. `audit/scripts/snapshot-touched-sections.mjs` is a starting point.
- A draft/published state so a packet's writes land unpublished and go live as one statement.
- The tree already has a branch and the handoff pack; the t=0 content dump is `audit/content-sections/`.

Exit: commit with `packet-2` in the subject, update `audit/PROGRESS.md`, rewrite this file for packet 3.
