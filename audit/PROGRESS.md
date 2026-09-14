# Remediation progress

One row per packet. A packet is done when the PROTOCOL.md gate passes: build green, every claimed ledger id
confirmed by a verifier, walkthrough clean where applicable, validator green (packet 3+), this row updated,
committed with the packet id in the subject line, pushed. Coverage lives in `ledger.json`.

Plan: `audit/PLAN.md` (58 packets). Source data: `audit/README.md`.

## Foundation and repair

| # | Packet | Status | Commit | Snapshot | Validator |
|---|--------|--------|--------|----------|-----------|
| 0 | Day 0 hotfix | done and verified. Code + content 2026-09-12 (2 code + 18 content ids). Marketing: 182 claims found, all corrected and confirmed (M001-M182), gate clear |  069ddb4 | audit/snapshots/2026-09-11-{pre,post}-packet-0__* | n/a (packet 3) |
| 1 | Measure or don't bother | done and verified 2026-09-12 (Verify A: F021 F022 F042 F043 confirmed; dead progress route deleted in the setup commit to close F023 F049; F026 F030 moved to packet 5). app_events table SQL still to run once (see NEXT.md) | cdb24dc + setup commit | | n/a (packet 3) |
| 2 | Ids and safety net | **done except F052, F109, F115** (diagram blocks still pin by ref: 0 of 39 carry diagramId, 24 of 39 resolve to nothing; no draft/published state). 2026-09-12: — 2,952 item ids minted, item_id column added and 1,041 of 1,069 progress rows backfilled (28 NULL by design: 27 written-practice rows whose index points into a filtered subset, 1 stale index). Pin resolution fixed and verified (F013 F040 F111 F041 confirmed). Dual-write live on all three progress routes and engines. Draft/published tooling written; `scripts/packet-2-draft-state.sql` still to run. F052/F109 improved not closed; F115 substantially addressed | 4d45478 + | audit/snapshots/2026-09-12-pre-packet-2__* | n/a |
| 3 | Validator v2 + golden set | **done and verified 2026-09-14** (Verify A round 1 rejected F073/F110/F116; fixed in 507e09b; round 2 confirmed all six, `unverified 3` clear) — `lib/content-validator.mjs` (50 rules, BLOCK/DEBT/INFO) inside the write path via `scripts/_content-write.mjs`, decision shared in `lib/content-gate.mjs` with the two admin routes; direct writes of `data` refused in `scripts/_db.mjs` on every `from()`; every seed/one-off script imports the guarded client and `lib/write-path.test.mjs` scans for new writers; `publish-section.mjs` re-validates, reads back and validates the live row; keys carry an item fingerprint; reference assets generated from the spec text and verified (`tariff-census.json` 16 rows cited, footers stripped; `spec-items.json` 1,125 leaves, 0 leaks / 0 missed, full token census 0 missing); 95 tests; baseline rewritten under the new keys (1,131 BLOCK, 1,358 DEBT, 2,489 keys) and `npm run validate` green against it. Claims: F073 F082 F105 F106 F110 F116. Reassigned with notes: F083→5, F107→7, F108→14, F112→7 | c505f70 · 507e09b · (this commit) | n/a — no content written | `npm run validate` exit 0 · `npm test` 95/95 |
| 4 | Progress and mastery truth | not started | | | n/a |
| 5 | Step 0 | **VERIFIED 2026-09-14 (Fable 5.1): 32 of 32 ids confirmed on round 3 (`d032302`); Verify B done; NOT shipped — hold for the checkpoint ~26 Sep so packet 58 can attribute the change.** Rounds: 1 rejected seven (draft wiped on mount, "." checkbox, orphaned content tab, two writers for the step pointer, sheet not bigger, font floor, sub-12px labels); 2 rejected two (`touch-action: pinch-zoom` blocked panning; the floor was a relayout); 3 clear. Post-gate one-liners measured, not re-verified: tab strip scroll padding, desktop sheet width — the step model moved to `lib/learn-steps.js`: one subsection per teach step with its own recall below the teaching, one check-in step per chapter (diagram, quiz, practice, a spaced recall from an earlier chapter with a cue, explain-it-back, takeaway); the overview counts steps with the same function. Mobile pass: rail hidden, 15px body, 44px touch targets, sticky Back·step·Next bar, textareas 16px, diagrams at card width with a minimum label size and a 2x pinch-zoom sheet, tab strip scrolls the active tab into view with an overflow chevron. Immediate step swap with the enter animation; keyboard nav via refs, off on pre-test/completion and inside widgets; clickable chapter dots. One navigation handler keeps the browsing tab, updates the URL, reads the new section's saved step (max of server and local), clamps it; resume banner on reload. Explain It Back has a free compare-and-self-check path with a saved draft; InlinePractice has an answer box in all modes with a self-mark checklist and a locked Pro control; '(N marks)' stripped at render. Depth signal from `/api/sections/depth` on sidebar rows and the header (22 of 43 sections thin). Verify B at 390×844: introductory-concepts 14 steps both screens, one heading per step, recall below title on all 9 teach steps, spaced recall on check-ins 2-5 only and from an earlier chapter with a different reorder order, Next visible without scrolling, step height 2,812px (was 5,300-5,900), tab kept across a sidebar change, resume banner on reload. Claims: 32 ids (see ledger) | (this commit) | n/a — no content written | `npm run validate` exit 0 · `npm test` 105/105 |
| 6 | Re-entry v0 | not started | | | n/a |
| 7 | Widget mechanics | **VERIFIED 2026-09-14 (Fable 5.1): Verify A 14 of 14 ids on round 1 (`bcd62ce`, `2c57920`); Verify B 15 of 16 at 390×844, the one failure (a spare blank on a mismatched live fill-in drawn as a fillable box) fixed post-gate and measured; NOT shipped — goes with packet 5 at the checkpoint ~26 Sep** — the recall contract: four types (`reorder`, `fillin`, `match`, `classify`) with grading and seeded ordering in `lib/recall-widgets.js` (tested), the authoring contract in `CONTENT-GATE.md`, exemplars in `lib/recall-fixtures.js`, gallery at `/admin/widgets` and `/dev/widgets`. Every widget: check, partial credit, Try again with correct items locked, the answer with its `why` lines; a visible Skip that counts, persists locally and brings the recall back at the next check-in; the completion screen names skips. Fill-in: every segment rendered, mismatched recalls completable, tap-a-blank targeting, no drag-and-drop, wrong word struck through beside the answer, distractor chips (authored or two from the section), letter-prefix hints never shown. Reorder: seeded start order (never identity, first item never in place, spaced showing differs), `shuffled` inert. InteractiveDiagram and RecallCheckpoint deleted; DiagramLabelDrill wired behind a button for SVGs with ≥3 `text.draggable` labels (0 of 74 live today). Validator: +`schema.recall-type`, `recall.why`, `fillin.distractors`, `fillin.leak`, `match.*`, `classify.*`; −`reorder.permutation`/`identity`/`shuffle-reuse`, `fillin.one-per-line`; `fillin.token` commas only. F057 F107 → packet 57 with a note (content half: 18 not-orderable + 48 weak reorders convert per section). Claims: F050 F051 F054 F055 F056 F060 F061 F063 F112 F113 W001 W002 W003 W004 | bcd62ce · 2c57920 | n/a — no content written | baseline 2,187 → 2,455 keys (+137 `fillin.distractors`, +127 `recall.why`, +30 `fillin.leak`; −26 retired) · `npm run validate` exit 0 · `npm test` 132/132 |
| 8 | Quiz hygiene | not started | | | n/a |
| 9 | AI correctness | **done 2026-09-12** — F003, F014, F015, F018, F020 confirmed; F019 wont-fix with reason (shared limiter, still per-instance memory). New: `lib/ial-marking.js` (spec-sourced tariffs, paper structures, 20-mark structure) and `lib/subscription-lookup.js`. Verify B: completion screen checked live at 390px | (this commit) | n/a | n/a (packet 3) |
| 10 | Smart Practice engine | **done and verified 2026-09-12** — all six confirmed (F075 F076 F077 F078 F084 F085). Verify A rejected three times: the event-object leak into `practiseEarly`, the missing due counts, and the missing anonymous fallback. Verify B at 390px covered the picker; the four in-session checks now need an account, see below | 999b378 + 2aec587 | n/a | n/a (packet 3) |
| 11 | Performance and accessibility | not started | | | n/a |
| 12 | Monetisation coherence | not started | | | n/a |
| 13 | Off-spec strip and dedupe | **built 2026-09-14; Verify A rounds 1 and 2 each rejected D010/D011; passes 3, 3b, 3c and 4 PUBLISHED 2026-09-14 (round 3 rejected both ids again: a notes FLOW and two misconceptions still defining external benefits by information failure, and two sections still teaching another's topic in takeaways and a flashcard; pass 4 read every field of the affected entries and re-ran the ownership map over body text) (swap artefacts, the information-failure over-reach across a whole subsection, six DWL diagram labels re-placed by geometry, monopoly body text out of 1.3.5, then a leaked fill-in answer and a two-word budget overrun the baseline diff caught); baseline 2,455 → 2,448; census clear including DWL; round 3 running** — the first content packet, and the first to write through packet 3's gate. Eight frameworks the IAL specification does not contain are gone from live content (census: 0 hits): merit/demerit goods, deadweight loss, VRIO, core competencies, distinctive capabilities, the balanced scorecard, the triple bottom line, the accelerator. Five blocks removed across four sections (merit/demerit and market-power from market-failure, behavioural from price-determination, the accelerator from aggregate-demand, core competencies from assessing-competitiveness); the specification's own vocabulary replaces the GCE labels in 13 sections; `audit/SPEC-OWNERSHIP.md` written and two of its three duplications resolved (the multiplier is left whole with a manifest, because splitting it would strand 8 quiz items); F081 closed by rewriting 19 duplicate stems, including the two identical stems that carried different correct answers. Second-order fixes inherited by touching the text: 3 command words that do not exist in IAL Economics, 2 wrong tariffs, 4 UK-only institutions, 7 length tells, 2 sections given their first recall. Found and fixed in the gate itself: `jsonb` key-order normalisation broke every read-back check (`sameJson`), and `MPC` was read as the Bank of England committee in 130 places where it means marginal private cost. Claims: F081 D009 D010 D011 D012 | (this commit) | audit/snapshots/2026-09-14-pre-packet-13__* | baseline 2,489 -> 2,187 keys; BLOCK 1,131 -> 902; `npm run validate` exit 0 · `npm test` 105/105 |

## Drill programme — packets 13.1 to 13.8

Plan: `audit/DRILLS.md`. Founder decision 2026-09-12: split the programme, quant (13.1-13.4) before the
content stage, drawing (13.5-13.8) after the top-ten sections.

| # | Packet | Status | Commit | Snapshot | Validator |
|---|--------|--------|--------|----------|-----------|
| 13.1 | Quant engine | done and verified 2026-09-12 (Verify A: D001-D008 confirmed with file:line evidence; the verifier independently reproduced the guard failing on an in-tolerance slip). Verify B n/a — no student-facing surface. Built out of calendar order: no prerequisite, adds only new files, so it cannot conflict with packet 2 | d67a644 | none — no content write | n/a (packet 3) |
| 13.2 | Six templates, Learn Mode and Quiz | blocked on packet 2 (item ids) | | | |
| 13.3 | Twelve more templates, Smart Practice | blocked on packet 2 (`item_id`) | | | |
| 13.4 | Calculations session + funnel events | blocked on 13.2, 13.3 | | | |
| 13.5 | Diagram spec format and marking | deferred per the split | | | |
| 13.6 | The drill component | deferred per the split | | | |
| 13.7 | Six Economics specs | deferred; needs packets 5 and 7 | | | |
| 13.8 | Six Business specs + Business surface | deferred; needs packet 12 | | | |

## Content — one section per packet, traffic order

| # | Section | Opens | Status | Commit | Snapshot | Validator |
|---|---------|-------|--------|--------|----------|-----------|
| 14 | decision-making-techniques (format pilot) | 9 | not started | | | |
| 15 | introductory-concepts | 192 | not started | | | |
| 16 | meeting-customer-needs | 123 | not started | | | |
| 17 | consumer-behaviour-demand | 52 | not started | | | |
| 18 | the-market | 44 | not started | | | |
| 19 | planning-raising-finance | 35 | not started | | | |
| 20 | types-sizes-businesses | 34 | not started | | | |
| 21 | measures-economic-performance | 33 | not started | | | |
| 22 | marketing-mix-strategy | 32 | not started | | | |
| 23 | supply | 30 | not started | | | |
| 24 | price-determination | 28 | not started | | | |
| 25 | market-failure | 28 | not started | | | |
| 26 | government-intervention | 26 | not started | | | |
| 27 | business-objectives-strategy | 26 | not started | | | |
| 28 | revenue-costs-profits | 25 | not started | | | |
| 29 | market-structures-contestability | 24 | not started | | | |
| 30 | managing-people | 22 | not started | | | |
| 31 | financial-planning | 19 | not started | | | |
| 32 | aggregate-demand | 19 | not started | | | |
| 33 | globalisation (business) | 18 | not started | | | |
| 34 | causes-effects-globalisation | 18 | not started | | | |
| 35 | entrepreneurs-leaders | 17 | not started | | | |
| 36 | managing-finance | 16 | not started | | | |
| 37 | national-income | 16 | not started | | | |
| 38 | macroeconomic-objectives-policies | 16 | not started | | | |
| 39 | trade-global-economy | 15 | not started | | | |
| 40 | balance-payments-exchange-rates | 14 | not started | | | |
| 41 | external-influences | 14 | not started | | | |
| 42 | resource-management | 13 | not started | | | |
| 43 | economic-growth | 13 | not started | | | |
| 44 | aggregate-supply | 13 | not started | | | |
| 45 | labour-markets | 13 | not started | | | |
| 46 | growth-development | 12 | not started | | | |
| 47 | global-markets-expansion | 11 | not started | | | |
| 48 | government-intervention-firms | 11 | not started | | | |
| 49 | business-growth | 10 | not started | | | |
| 50 | managing-change | 9 | not started | | | |
| 51 | poverty-inequality | 8 | not started | | | |
| 52 | role-state-macroeconomy | 8 | not started | | | |
| 53 | influences-business-decisions | 7 | not started | | | |
| 54 | assessing-competitiveness | 7 | not started | | | |
| 55 | global-marketing | 7 | not started | | | |
| 56 | global-industries-mncs | 6 | not started | | | |

## Close

| # | Packet | Status | Commit | Snapshot | Validator |
|---|--------|--------|--------|----------|-----------|
| 57 | Cross-surface consistency | not started | | | n/a |
| 58 | Re-measure the funnel | not started | | | n/a |

## Baselines (fill in at packet 1, never edit afterwards)

- Step-0 pass rate, clean instrumentation: _collecting once `app_events` exists; compute with `node audit/scripts/funnel-events.mjs`. Definition: step_next(step=0) over learn_open per (student, section), anonymous included._
- Section completion rate: _pending_
- Validator violation count per check: _pending (packet 3)_

## Baselines from the audit (dirty instrumentation, upper bound on abandonment)

- 825 of 1,093 section starts never passed step 0 (75%), 211 signed-in students
- introductory-concepts 192 starts / 167 stuck; meeting-customer-needs 123 / 101
- 16 premium active, 40 free/cancelled, 6 free/inactive
