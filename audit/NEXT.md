# Next session brief

## Packet 2 — code half landed, two actions blocked on the founder

Committed `4d45478`. Verified: F013, F040, F111 (practice pins) and F041 (diagram fallback).
Snapshot taken before anything: `audit/snapshots/2026-09-12-pre-packet-2__*` — 43 sections, 8 tables,
restore path exercised.

**Blocked action 1 — mint the ids.** Dry run is clean: 2,952 ids across 43 sections (769 quiz, 844 cards,
215 practice, 81 diagrams, 272 recall, 583 blocks and subsections, 188 mistakes). It adds an `id` field and
changes nothing else, so no student sees a difference.

```
node scripts/mint-item-ids.mjs             # dry run, prints the plan
node scripts/mint-item-ids.mjs --confirm   # writes
node scripts/mint-item-ids.mjs --verify    # asserts every item has a unique id
```

If it goes wrong: `node scripts/restore-section.mjs audit/snapshots/2026-09-12-pre-packet-2__<subject>__<section>.json --confirm`.

**Blocked action 2 — run the DDL.** `scripts/packet-2-item-id.sql`, once, in the Supabase SQL editor. Read
the comment at the top first: it lists the five silent ways the obvious version of this migration loses
student data, and it is why the column is nullable and question_index survives. Then:

```
node scripts/backfill-item-id.mjs            # dry run
node scripts/backfill-item-id.mjs --confirm  # writes item_id only
```

**Then, to finish packet 2:** switch the five progress routes to dual-write `item_id` alongside
`question_index` (never instead of it), and build the draft/published state — the half of F115 that is not
addressed. Re-pinning content by id is a section-packet job, not this one.

**Still open after this packet:** F052 and F109 (9 of 24 broken diagram refs now rescued by the fallback,
15 blocks still show nothing — 3 of those are in `the-market`, which has no diagrams in the database at all)
and the draft/published half of F115.

**The ledger was not updated.** A concurrent session holds `audit/ledger.json` for a marketing-claims audit
(M001-M182). Claim F013, F040, F111 and F041 for packet 2 once the tree is quiet:
`node audit/scripts/ledger.mjs claim 2 F013 F040 F111 F041`.

---


## Packet 13.1 landed — quant engine (12 September 2026, out of calendar order)

Gate passed: build green, `npm run quant-check` green, `npm run contrast` still clean, Verify A confirmed
D001-D008 with `file:line` evidence (the verifier independently reproduced the guard failing on an
in-tolerance slip). Verify B did not apply: no student-facing surface changed.

It ran now rather than after packet 13 because it is the only packet in `audit/DRILLS.md` with no
prerequisite — it adds `lib/quant/`, a guard script, one admin page and one nav link, touches no student
component, no table and no content row, so it cannot collide with packet 2.

**What exists now:** `lib/quant/` (seeded RNG, marking with the own figure rule and slip detection, four
templates — break-even WBS12, PED WEC11, ARR WBS13, the multiplier WEC12), `npm run quant-check`,
`components/quant/CalculationItem.jsx`, and `/admin/quant` behind the existing admin gate.
Contract: `lib/quant/schema.md`. Read that before touching a template.

**What 13.2 needs from packet 2:** stable item ids, so a quant item can be pinned to a block the way
`quizIndices` pins a question. 13.3 needs `item_id` on `practice_question_progress` so a template can sit
in the SM-2 queue. Both are already in the packet 2 spec below — no extra work, just don't drop them.

**One thing packet 3 inherits:** the quantitative item contract is settled (`lib/quant/schema.md`), so the
validator's "minimum quantitative-item count per unit" check counts items of this shape rather than
defining its own. Tier it DEBT until 13.2 puts real items in sections.

---


Read `PROGRESS.md`, `DECISIONS.md`, then `PROTOCOL.md` (how a packet session runs), then this file.
Work only in this worktree: `/Users/arongijsel/Claude APP/economics-next-remediation`, branch `remediation/2026-09`.
Dev server: launch config `remediation-dev`, port 3001.

## State at handoff (12 September 2026)

- Packet 13.1 (quant engine) is built, verified and pushed — see the section below. The rest of the drill
  programme (13.2-13.8) is specified in `audit/DRILLS.md` and blocked on packets 2, 5, 7 and 12.
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
4. **Click through `/admin/quant` once**, signed in as an admin: pick each of the four templates, answer a
   step wrong and mark it, press "New numbers". Verify A confirmed the code path by inspection; nobody has
   yet looked at the rendered page, and it is a sixty-second check.
5. Decisions still open in `DECISIONS.md`: IAL teacher, freemium boundary, Business extract sourcing, freeze
   date — plus, now, whether the drills are free or premium (due with the freemium boundary before packet 8).

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
