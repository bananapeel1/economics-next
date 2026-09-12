# Next session brief

Read `PROGRESS.md`, `DECISIONS.md`, then `PROTOCOL.md` (how a packet session runs), then this file.
Work only in this worktree: `/Users/arongijsel/Claude APP/economics-next-remediation`, branch `remediation/2026-09`.
Dev server: launch config `remediation-dev`, port 3001.

## State at handoff (12 September 2026)

- Packets 0 and 1 are built, **verified** (Verify A on every ledger id, Verify B walkthrough at 390px for
  packet 0), and pushed. A PR into `main` is open; the founder merges it. That is ship checkpoint 1.
- The ledger exists: `node audit/scripts/ledger.mjs summary`. Every code finding has a packet. Content items
  default to their section packet.
- Custom agents `packet-verifier` and `student-walkthrough` are in `.claude/agents/`. They load when a session
  is started in this worktree. If the Agent tool does not list them, spawn a general `claude` agent on Sonnet
  and tell it to read the agent file first and adopt it; that is what the setup session did.

## Founder to-dos

1. ~~**Create the events table.**~~ **Done 12 September 2026.** `app_events` exists;
   `node audit/scripts/funnel-events.mjs` returns a summary instead of "does not exist". The table was empty at
   creation, so the baseline accumulating from this date is clean. Do not fill in the PROGRESS.md baseline until
   `sectionStarts` is into the low hundreds.
2. ~~**Merge the open PR.**~~ **Done 12 September 2026.** PR #10 merged to `main` as `2ee430e` and deployed.
   That shipped packets 0-1 *and* the light-mode contrast pass (see below). Ship checkpoint 1 is closed.
3. **Three false marketing claims are still live** — "24 spec points", the "Adaptive" badge and
   "Adaptive flashcard algorithm" wording, in `app/economics/page.js`, `app/business/page.js`,
   `app/ial-revision/page.js` and the unit pages. **The constraint on these has lifted:** they belonged to the
   SEO branch, and that branch merged into `main` on 12 September, so they can now be fixed here like any other
   file. Still outstanding — nothing in packets 0-1 touched them.
4. Decisions still open in `DECISIONS.md`: IAL teacher, freemium boundary, Business extract sourcing, freeze date.

## Light mode (done 12 September 2026, outside the packet plan)

Ronald asked for a light-mode audit mid-session; it is shipped and is not one of the 58 packets.
Report: https://claude.ai/code/artifact/c037aa7a-c8e8-4a15-9d4e-c2af22a7c590

Five root causes, all light-only: dark-tuned colours written as CSS literals; a neutral ramp unusable on white
(`--text-muted` 2.54:1, `--text-dim` 1.47:1); accent tokens shared across both themes; `--bg-primary` and
`--bg-card` both `#ffffff`, so no surface hierarchy and an invisible note hover; and diagram SVG colours baked
into the database, remapped at render time in `components/learn-mode/processSvg.js` rather than migrated.

**`npm run contrast` is the guard.** Static, no browser, no dependencies, exits 1 on a light-mode regression.
Run it before touching `app/globals.css`. `--theme dark` reports **twelve pre-existing dark-mode failures**
(white text on bright accent fills, e.g. white on `#10b981` at 2.54:1) — a real open ticket, not part of this work.

Two traps worth knowing: an alpha tint composites deeper over a page ground than over white, so accents needed a
second darkening pass after the ground changed; and `styles/landing.css` plus `styles/theme-night.css` scope
everything to `.elp-page` / `.rl-night`, which paint their own dark ground and ignore the theme — their pale
colours are correct and must not be "fixed".

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
