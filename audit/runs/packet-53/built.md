# Packet 53 — built (influences-business-decisions, IAL Business 3.3.4, WBS13)

Build phase, 26 September 2026. **Staged to `draft`, not published, not committed.** Every "passes"
below names the command that produced it. Nothing here was checked in the Learn Mode page or at any
phone width: Verify A and Verify B have not run.

## Handoff-document check

`audit/NEXT.md` has no `## Packet 53 spec` heading (the same gap packets 41-47 hit). The newest
handoff at the end of the file ("packet 45 closed (brain)") lists 53 among packets with live same-hour
activity; that activity was this packet's own brief. PROGRESS.md row 106 says 53 is "not started".
PROTOCOL, the DECISIONS Settled list and CONTENT-GATE (recall contract, per-section checklist, check-in
answer rule) did not contradict each other or the ledger for this packet. Not escalated.

## What was built

`influences-business-decisions` rebuilt to **3.3.4 only** (`audit/raw/bus_spec.txt:1184-1211`: heading
at `:1184`, 3.3.5 at `:1218`). The oracle has 17 rows and 15 leaves (`spec-items.json`, topic 3.3.4); the
runner asserts that count. 15 of 15 leaves are evidenced (`spec.coverage` INFO, `stage.log`).

| | live (`data`, unchanged) | staged (`draft`) |
|---|---|---|
| blocks / subsections | 2 / 4 (Culture & Stakeholders; Ethics & CSR) | 4 / 13: Corporate Culture (1a-1b) · Forming and Changing a Culture (1c-1d) · Stakeholder Model Versus Shareholder Model (2a-2d) · Business Ethics (3a-3c) |
| recalls | 0 | 13, one per subsection: 5 classify, 3 fill-in, 4 match, 1 reorder |
| quiz / practice | 9 / 5 (Define 4, Analyse 6, Assess 10, Outline 4, Evaluate 20) | 22 (3 unpinned pre-test, keys 6/6/5/5) / 7 on one source: Explain 4 · Calculate 4 · Discuss 8 · Assess 12 · Assess 12 · Evaluate 20 · Evaluate 20 |
| diagrams | 0 | 4 (5 views), one per block, pinned by `diagramId` |
| flashcards / mistakes / extras | 18 / 5 / 4 chains + 3 evaluation | 27 / 7 / 4 chains + 3 evaluation |
| validator, this section | 12 BLOCK / 20 DEBT | 0 BLOCK / 0 DEBT / 4 INFO, 0 recoverable recalls; 28 baselined findings clear on publish |

One firm carries every figure (`FIRM`, `scripts/_packet53-util.mjs:84`): Orvana, an invented Malaysian
snack maker; one currency (RM); no year; no real company. The live section's Google, Volkswagen,
Patagonia and BP examples (dated, unsourced) are gone and banned by the runner.

## Scope calls, each settled on the document (Rule 1)

1. **Numbering.** 15 of 26 ids cite "3.4.1"-"3.4.4". `grep -c "3\.4\.[0-9]" bus_spec.txt` = 0. Every id
   was mapped by its wording (`LEAF_MAP`, `_packet53-content.mjs:432`); the runner asserts the 3.3.3-3.3.6
   headings by line and `contextFor` = 3.3.4 / WBS13.
2. **UK GCE 3.4.1 (short-termism; evidence-based vs subjective decisions) and animal welfare.**
   "short-termis", "long-termis", "subjective", "intuiti", "animal" are 0 hits in `bus_spec.txt`;
   "evidence-based" occurs only at `:1566`/`:2129` (assessment-objective prose), outside 3.3.4 — the
   runner asserts both. **Wont-fix: specGap-01, specGap-02, specGap-08, topFix-01** (notes on the items).
3. **Asides, per DECISIONS (packets 13/16/18: name the standard term once, never assess it).** Handy,
   Mendelow, Friedman, Freeman, greenwashing and groupthink are 0 hits in the spec. Each appears once, in
   teaching text; none on any quiz, practice, recall, flashcard or mistake (runner §2, A/B'd). So
   topFix-03's "Mendelow quadrant ↔ strategy" fill-in and Mendelow diagram are **refused**; the four
   culture types (spec words, 1b) are recalled and drawn instead, and chapter 3 draws internal/external
   (2a). Carroll's pyramid is banned (topFix-05).
4. **Paper shape.** 3.3.4 is Unit 3: DECISIONS Settled 26 Sep + `ial-paper-structure.json`
   business.units_3_4 = one source set 4/4/8/12/12 plus two Evaluate 20s. Appendix 6 is parsed by the
   runner (Assess 12 for Units 3/4). The live Assess 10, Analyse 6, Define 4 and Outline 4 are gone.
5. **The live section is not the brief's snapshot.** The brief read `audit/content-sections/` (t=0) and
   said both blocks had null pins. The live row read today (`2026-09-26-pre-packet-53__…json`) carries
   packet 2.9's pins (block 1 quiz [2] / practice [4], block 2 quiz [6] / practice [1]) and 5 mistakes.
   So structure-05's "no quizIndices/practiceIndices" was already partly out of date before this packet.
6. **Check-in answer rule.** Each block's pinned quiz items are written about what its diagram does not
   show (chapter 1 draws the four types, so its pins are on strong/weak culture and the type-naming items
   are the unpinned pre-test; chapter 3 draws who is internal/external, so its pins are on objectives, the
   models and conflict). Builder's own reader pass over every pinned item (`checkin-surfaces.txt`, first version) made two
   changes: chapter 2's diagram subtitle "who fits, who rises" → "who fits, who leads" (echoed the key
   "managers who rose…"), and chapter 4's percentage item re-figured from RM2m/RM25m = 8% (the only option
   near the 10% the profit diagram implies — the packet-46 near-miss rule) to RM3m/RM12m = 25%. **This is
   the builder's reading, not Verify A's or Verify B's required `leaks`/`clean` line.**

## Files (all new)

- `scripts/_packet53-util.mjs` — ids, formatters, `FIRM` :84, `BANNED` :130, `ASIDES` :143.
- `scripts/_packet53-content.mjs` — 13 subsections (:38-:366), `BLOCK_PLAN` :372, `LEAF_MAP` :432, `NOTES` :459.
- `scripts/_packet53-assessment.mjs` — `QUIZ` :59, `EXTRACT` :147, `PRACTICE` :149, `FLASHCARDS` :187, `MISTAKES` :221, `EXTRAS` :258.
- `scripts/_packet53-diagrams.mjs` — 4 diagrams (:76, :111, :151, :193), `DIAGRAMS` :209.
- `scripts/packet-53-influences-business-decisions.mjs` — the runner (dry run / `--dump` / `--stage`), §1-§12.
- `audit/snapshots/2026-09-26-pre-packet-53__business__influences-business-decisions.json` — t=0 snapshot, all 8 tables, taken before the write (`snapshot.mjs`, `snapshot.log`).
- `audit/snapshots/packet-53-bundle__business__influences-business-decisions.json` — the staged bundle.
- `audit/runs/packet-53/` — `snapshot.mjs`, `draft-before.mjs`, `draft-readback.mjs`, `ab-mutation.sh` and the logs below.

## Per ledger id (22 claimed, 4 wont-fix)

C = `_packet53-content.mjs`, A = `_packet53-assessment.mjs`, D = `_packet53-diagrams.mjs`, R = the runner.

| id | what changed | where |
|---|---|---|
| topFix-01 | **wont-fix** — content is UK GCE 3.4.1 (scope call 2); the structural half is claimed under structure-01/topFix-04, the practice half under practice-01 | ledger note |
| topFix-02 | internal/external stakeholders and their objectives taught in body; a decision-level conflict (Ipoh closure, RM9m saving vs 300 jobs) worked with a causal flow; examMatters rewritten without "draw the grid" or any examiner claim | C:194-213, :216-237, :265-291 (examMatters :281) |
| topFix-03 | a recall on every subsection (13); the four types matched to organisations with a `why` each; a typology diagram (1b) and an internal/external diagram (2a). Mendelow fill-in/diagram and Friedman/Freeman recalls **refused** (asides are never assessed, scope call 3); the shareholder/stakeholder models are recalled in the spec's words instead | C:85-108 (match), :240-262 (fill-in); D:64-91, :128-165 |
| topFix-04 | 4 blocks / 13 steps; culture split from stakeholders; ethics and CSR no longer repeat a for/against list (runner checks no two chapter-4 paragraphs share ≥3 of the list's nouns); freed space → pay and rewards (3b) and a worked judgement subsection. Animal welfare refused (scope call 2) | C:372-410, :319-346, :168-191; R §9 |
| topFix-05 | "3-5 years" item replaced by one on why culture change takes years (1d); every practice stem anchored to Orvana on Source A; Carroll gone and banned. The "Mendelow/short-termism question" alternative refused | A:95; A:147-183; util `BANNED[3]` |
| accuracy-01 | "Draw the 2x2 grid… Examiners reward…" gone; Mendelow named once as a planning aside; runner bans the grid instruction, quadrant labels and uncited examiner claims | C:201, :205; R §9, §10 |
| accuracy-02 | internal/external taught in body before it is tested; body says shareholders may be classed either way with a reason; no recall classes a shareholder | C:199-200; D:151-165; R §8 |
| quiz-01 | the unsourced "3-5 years" item and flashcard gone (runner bans "3-5 years"/"experts estimate"); replacement on 1d, taught at C:144-166 ("years, not months") | A:95; R §6 |
| practice-01 | the short-termism Assess 10 is gone; the set is the Units 3-4 Section A shape; every stem names the firm on its source | A:149-183; R §7 |
| structure-01 | 4 blocks of 3-4 subsections (runner refuses a block under 3) | C:372; R §4 |
| structure-02 | culture and stakeholders in separate chapters (runner asserts chapter 1 never says "stakeholder"); ethics/CSR duplication removed | C:372-410; R §4, §9 |
| structure-03 | 13 recalls, all four types | C (one `recall` per `sub`) |
| structure-04 | 4 diagrams, one per block, on spec bullets (1b, 1c-1d, 2a, 3a-3b) | D:209 |
| structure-05 | `quizIndices`/`practiceIndices` derived from each item's block tag; every block pins quiz and practice | R:44-50, §4 |
| structure-06 | "strong culture is always good" is now the 1a subsection's misconception; every subsection has its own subject misconception (runner refuses exam-technique wording and repeats) | C:48; R §9 |
| structure-07 | "Can a Culture Be Changed? A Worked Judgement" models for/against/judgement-with-condition in body; examMatters end on a condition; 3 extras evaluation paragraphs | C:168-191; A:258+ |
| structure-08 | chapter 4 takeaway "Ethics often costs profit; size the trade-off before judging it." (runner asserts it) | C:404 |
| specGap-01, -02, -08 | **wont-fix** (scope call 2) | ledger notes |
| specGap-03 | how culture is formed: founder/leaders, history, recruitment/promotion/rewards, country/industry; reorder recall from an extras chain | C:111-142; A extras chain 1 |
| specGap-04 | difficulties in changing an established culture, in body (loss, proof, systems, time/scale) plus the worked judgement | C:144-191 |
| specGap-05 | 2a/2b in body | C:194-237 |
| specGap-06 | 2c models in the spec's words; 2d worked at decision level (closure, payback ~16 months, trust flow, softening options) | C:240-291 |
| specGap-07 | pay and rewards: pay ratio 100 → 125 to 1, the case for/against, what a bonus is tied to; fill-in and Calculate 4 | C:319-346; A:154 |
| specGap-09 | resolved on the document: neither Mendelow nor Handy is in `bus_spec.txt`; both are single asides, never assessed | util `ASIDES`; R §2 |

## What was run, and what each run covers

- Runner, dry run then `--dump --stage`: exit 0. Before 12 BLOCK / 20 DEBT; after 0 BLOCK / 0 DEBT / 4
  INFO, 0 new, 0 recoverable; 28 baselined findings clear on publish (`runner-1.log`, `stage.log`).
  `runner-0.log` is the first run (4 long-correct keys, 4 word budgets, a reorder lead, a substitution
  probe that could not see `RMNaNm`), all fixed.
- `ab-mutation.sh`: 11 guards each planted and each fired, including the validator's own
  `recall.recoverable` on a planted give-away, an aside on an assessed surface, a pinned key on its
  diagram, and a key figure on a diagram; modules restored and `shasum -c` OK (`ab-mutation.log`).
- Before staging, `draft-before.mjs`: every table's `draft` was null (no one else's staged work was
  overwritten). After: `draft-readback.mjs` reads all 8 tables' `draft` and `data` directly — `draft` ==
  bundle for all 8, `data` == the t=0 snapshot for all 8 (`section_diagrams` had no row; staging created
  it with `data = []`, packet 47's precedent) (`draft-readback.log`).
- Second method, through the API: `check-staged-drafts.mjs` via `?draft=1` — matches (signed-out slice
  only). `curl` of `?draft=1` walked for recall shapes by Python, not by module id: 4 blocks, 13 recalls,
  aside counts Handy 1 / Mendelow 1 / Friedman 1, Carroll / short-termism / Google / Patagonia 0; the same
  curl without `draft=1` still serves the two old blocks (`served-check.log`).
- Rule 3, partial: origin/main (`ba01f38`) has all four recall widgets, reads `diagramId` in
  `lib/checkin-placement.js`, and its own `readMistake` reads these 7 mistakes with 0 empty fields
  (`main-mistakes-shape.log`). Not checked: any other field against main.
- Diagrams rendered by headless Chrome on a dark background at 400 units and looked at: no clipping or
  overlap seen. Not the light-theme remap, not in the app, not at 390px.
- Gates in the SHARED worktree: `npm run validate` 0, `npm run exposure` 0, `npm run recalls` 0.
  **`npm test` 339/342: 3 failures, all Economics 1.3.5** (`lib/mid-band-answer.test.mjs:113`,
  `lib/practice-shell.test.mjs:30`, `lib/spec-coverage.test.mjs:207`), caused by
  `content/data-response/econ-u1-market-failure.md`, modified at 12:40 today by another session (packet
  12.8 is reserved/running in NEXT.md). No packet-53 file is read by those tests (`gate-test.log`).
- **Not run:** `npm run build` (would rewrite `.next` under the shared :3001 dev server; this packet
  touches no file under `app/` or `components/`); Verify A; Verify B at 390×844.

## For the verifiers

Verify A and Verify B must each write the reader's `leaks`/`clean` line for all 4 check-ins
(CONTENT-GATE, 26 Sep). `checkin-surfaces.txt` lists every diagram surface and every pinned item, regenerated
from the staged bundle after the two fixes in scope call 6; read it against the served draft, not instead of it.

## Publish (rule 6 — for the founder, not run)

Before publishing, finish Rule 3 against `origin/main` for the remaining fields. Then:

```
node scripts/packet-53-influences-business-decisions.mjs --stage && node scripts/publish-section.mjs influences-business-decisions --confirm
```

Undo after a publish: `publish-section.mjs` writes an `auto-prepublish-…` snapshot; restore from it with
`scripts/restore-section.mjs <that file> --confirm`. The t=0 snapshot above is the fallback.

## Fix round 1 — C-influences-business-decisions-specGap-07 (26 September 2026)

**The rejection was right.** Check-in 4 served practice[1], "Calculate the ratio of Orvana's chief
executive's pay to its median employee's pay, before and after the proposed bonus", under the ethics
diagram. The diagram's "Pay ratio" view and its checklist print 100 to 1 and 125 to 1. The body (3b,
`_packet53-content.mjs:324`) and its notes twin (`:525`) work the same division, so all 4 marks were
printed above the question. The item also reached RM6m (RM4.8m + RM1.2m), and the diagram prints that
figure with a different meaning ("Certified oil costs RM6m a year more").

**Fix: the item moved, and the diagram, body and notes did not** (CONTENT-GATE's check-in answer rule,
packet 44's model):
- `_packet53-util.mjs` FIRM gains `lowPay` RM30,000 (the lowest-paid factory workers) and `lowRatio` 160,
  `lowRatioAfter` 200, `lowRatioRise` 40. The header comment says why.
- `_packet53-assessment.mjs` `EXTRACT` carries the new figure: "...the median employee earns RM48,000, and
  the lowest-paid factory workers earn RM30,000". The comment that the source carries every figure stays
  true. Because the source is shared, all 7 practice stems (and so all 7 practice ids) changed. The pins
  are indices, and `content` is byte-identical, so the pins are unchanged: `[[2],[0,5],[3,6],[1,4]]`.
- The Calculate item (practice[1]) now asks for the ratio to the lowest-paid workers' pay. Its scheme is
  RM4.8m ÷ RM30,000 = 160 to 1; the bonus adds RM1.2m ÷ RM30,000 = 40; so the ratio becomes 200 to 1. The
  scheme never writes RM6m. Its misreading line is now "stopping at 40 to 1 gives the increase". Its
  opening paragraph carries no figure (the runner checks this).
- **Rule 4, the same entry and its twins:** I read the item's question, guidance, command, marks and
  block. The 3b body, the 3b notes twin, the pay-and-rewards recall (RM2.4m/RM40,000 = 60, its own
  figures), the pinned chapter-4 quiz items (Q18 is RM1.5m/RM50,000 = 30 to 1, its own figures), the pay
  flashcard, the bonus extras chain and the mistakes print none of 160, 200, "40 to 1" or RM30,000. A
  search of the served draft finds those strings only in `practice`.

**The class, not just the item.** The runner's check-in key check (§ diagrams) read **quiz keys only**.
So did `checkin-surfaces.txt`. That is why this leak got past round 0's own guard. The runner now also
checks the practice item each check-in SHOWS, which is each block's first pin. `resolvePinnedItem` serves
the first unused pin, and the runner asserts that the blocks' pins are disjoint. For that item, any figure
the scheme reaches (including "N to 1") that its own stem does not give must not be printed on the
chapter's diagram.
- **What it does not check, as its comment says:** second pins and the Practice tab. Chapter 4's palm-oil
  Assess 12 (practice[4], the second pin) reaches RM6m and RM54m, which the ethics diagram draws. It is not
  served at a check-in: the probe below finds practice[1] placed there by main's code. Chapter 3's
  factory Assess 12 reaches RM69m, which the 2d body teaches. Neither figure appears on chapter 3's
  diagram, and it is one Level 2 application figure, not the judgement. I record these two and leave
  them unchanged.
- `checkin-surfaces.txt` now ends with the practice item each check-in shows, taken from the served
  draft.

**Also fixed, because the runner could not run clean without it.** PR #40 (merged into this branch at
12:43, `8a06aa3`, after round 0 staged at 12:38) moved `MistakesTab.jsx` onto `lib/mistakes-shape.js`'s
`readMistake`. The runner's string test for `item.mistake`/`item.correction` then failed on an unchanged
bundle. The runner now checks three things: the tab imports and calls `readMistake`; it renders
`item.title/wrong/right/examTip`; and the shipping `mistakeGaps` finds no gap in any of the 7 cards. The
bundle's `mistakes` table is byte-identical to round 0's.

**What was run, and what each run covers**
- `fix1-ab.sh` → `fix1-ab.log`. The pre-fix util and assessment, run under this round's runner, make the
  new guard fire 6 times on practice 1 (100, 125, RM6m, 100 to 1, 125 to 1, 25 to 1). A planted RM54m in
  the fixed scheme fires it once. Dropping `correction` from every mistake card makes `mistakeGaps` fire
  7 times. After the restore, `shasum -c` reports OK and the clean run has 0 failed checks.
- `ab-mutation.sh` (round 0's 11 guards), re-run against the fixed modules: 11 of 11 FIRE, and the clean
  run passes (`fix1-ab-mutation-rerun.log`).
- **The second method, independent of the runner** (`fix1-checkin-probe.mjs` → `fix1-checkin-probe.log`).
  The probe reads the SERVED draft (`GET :3001/api/sections/influences-business-decisions?draft=1`,
  signed out) and places items with origin/main's own `buildSteps` + `placeChapterItems`
  (`git archive origin/main` at `da0544d`, extracted to the scratchpad). It takes SVG text by stripping
  tags and reads every numeral, with no ≥13 or RM/% filter. Result: check-in 4 places practice[1]
  Calculate 4; its scheme reaches 160, 40 and 200; the diagram prints none of them, and neither does the
  chapter's body or notes. 0 figures leak across all 4 check-ins; exit 0. **A/B:** the same probe on the
  round-0 bundle reports 100, 6 and 125 printed on the diagram, and exits 1
  (`fix1-checkin-probe-ab.log`).
- `draft-readback.mjs`, run before staging (`fix1-draft-before.log`), showed the draft still equal to the
  round-0 bundle for all 8 tables, so no one else's staged work was overwritten. `--dump --stage`
  followed (`fix1-stage.log`: 0 BLOCK / 0 DEBT / 4 INFO, 0 new). Then `draft-readback.mjs`
  (`fix1-draft-readback.log`): draft == bundle and data == the t=0 snapshot for all 8 tables, so live is
  untouched. Bundle diff against round 0 (`fix1-bundle-diff.log`): only `practice` changed, and within it
  only the 7 ids and questions plus practice[1]'s guidance.
- Gates in the shared worktree: `npm run validate` 0 · `npm run recalls` 0 · `npm run exposure` 0 ·
  `npm test` 356/356 (the three Economics 1.3.5 failures from round 0 are gone; this packet did not
  touch them).
- Ledger: `ledger.mjs claim 53 C-influences-business-decisions-specGap-07` (`fix1-ledger-claim.txt`). It
  is claimed, not confirmed.
- **Not run:** `npm run build` (same reason as round 0); Verify A; Verify B. **Not looked at on screen or
  at any width.** The claim that check-in 4 is clean rests on the served JSON plus main's placement code,
  not on a rendered page.

`fix1-before/` holds the round-0 util, assessment, runner and bundle for the A/B.
