# Next session brief

Read `PROGRESS.md`, `DECISIONS.md`, then `PROTOCOL.md` (how a packet session runs), then this file.
Work only in this worktree: `/Users/arongijsel/Claude APP/economics-next-remediation`, branch `remediation/2026-09`.
Dev server: launch config `remediation-dev`, port 3001.

## State at handoff (setup session, 12 September 2026)

- Packets 0 and 1 are built, **verified** (Verify A on every ledger id, Verify B walkthrough at 390px for
  packet 0), and pushed. A PR into `main` is open; the founder merges it. That is ship checkpoint 1.
- The ledger exists: `node audit/scripts/ledger.mjs summary`. Every code finding has a packet. Content items
  default to their section packet.
- Custom agents `packet-verifier` and `student-walkthrough` are in `.claude/agents/`. They load when a session
  is started in this worktree. If the Agent tool does not list them, spawn a general `claude` agent on Sonnet
  and tell it to read the agent file first and adopt it; that is what the setup session did.

## Founder to-dos that block measurement (not code)

1. **Create the events table.** Supabase SQL editor → paste `scripts/create-app-events-table.sql` → run once.
   Until then `POST /api/events` answers 202 and drops events, so no clean baseline accumulates.
   Confirm with `node audit/scripts/funnel-events.mjs` (prints a summary instead of "does not exist").
2. **Merge the open PR** so packets 0 and 1 reach students. Vercel deploys `main`.
3. Still open from packet 0: three false marketing claims ("24 spec points", "adaptive algorithm" wording, the
   hero badge) live in `app/economics/page.js`, `app/business/page.js`, `app/ial-revision/page.js` and the unit
   pages. Those files belong to the SEO branch (`feat/seo-page-structure`, sibling folder `economics-next`).
   Fix them there or after that branch merges; do not edit them in this worktree.
4. Decisions still open in `DECISIONS.md`: IAL teacher, freemium boundary, Business extract sourcing, freeze date.

## Then: packet 2 — Ids and safety net

`node audit/scripts/ledger.mjs packet 2` lists the seven code findings. Read `PLAN.md` packet 2 and the
finding records (`ledger.mjs show F0xx`) rather than `audit/raw/`. No further content may be pushed before
this lands.

- Mint a stable `id` on every quiz, practice, flashcard, recall and diagram item across all 43 sections
  (in place: add a field, move nothing). Deterministic ids (e.g. `sectionId:quiz:<hash of stem>`) so a
  re-run is idempotent. Snapshot all 43 sections first (`audit/scripts/snapshot-touched-sections.mjs`).
- Add `item_id TEXT` to `practice_question_progress`, backfill from `question_index` using
  `audit/content-sections/` as the authority, switch the API routes that read/write it
  (`app/api/practice/progress`, `app/api/flashcards-practice/progress`, `app/api/written-practice/*`,
  `app/api/progress/quiz`) to `item_id`. Keep `question_index` as a dead column until packet 4.
  The old `app/api/learn-mode/progress` route is already deleted.
- Switch block pinning (`quizIndices`, `practiceIndices`, `diagramRef`) to ids in `LearnModeTab.jsx`,
  with an index fallback for one release.
- `scripts/snapshot-section.mjs <ids…>` and `scripts/restore-section.mjs <file>` across all eight
  content tables.
- A draft/published state so a packet's writes land unpublished and go live as one statement.
- DDL again has no path from code: write the SQL to `scripts/` and put the "run this once" step at the top
  of the next brief, as packet 1 did.

Write the `## Packet 2 spec` block at the top of this file before building (ids to close, acceptance checks),
then follow PROTOCOL.md steps 2–6. Exit: build green, `ledger.mjs unverified 2` clear, `PROGRESS.md` row
updated, commit `packet-2: …`, push, rewrite this file for packet 3.
