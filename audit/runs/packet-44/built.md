# Packet 44 — built (aggregate-supply, IAL Economics 2.3.3)

Build phase, 26 September 2026. **Staged to `draft`, not published, not committed.** Every "passes"
below names the command that produced it; nothing here was checked on a phone or in the Learn Mode
page (Verify B has not run).

## What was built

`aggregate-supply` rebuilt to **2.3.3 and only 2.3.3** (`audit/raw/econ_spec.txt:1026-1049`, span
confirmed by reading the file: heading at `:1026`, last bullet "competition policy." at `:1049`,
2.3.4 heading at `:1056`). Oracle: 17 rows / 14 leaves (`spec-items.json`, topic 2.3.3), asserted by
the runner. 14 of 14 leaves evidenced (`spec.coverage` INFO in the stage result).

| | live (`data`, unchanged) | staged (`draft`) |
|---|---|---|
| blocks / subsections | 5 / 13 | 5 / 18 |
| recalls | 13 (2-blank fill-ins, 3 procedure reorders) | 18: 5 reorder, 5 classify, 4 match, 4 fill-in |
| quiz / practice | 25 / 5 (4 of 5 illegal tariffs or command words) | 32 (3 unpinned pre-test) / 9 (all 8 command words, both Calculate tariffs) |
| diagrams | 3, two blocks pinning titles that do not exist | 5 (16 views), one per block, pinned by id |
| flashcards / mistakes / chains | 18 / 3 / — | 34 / 7 / 4 + 2 evaluation |
| validator on this section | 28 BLOCK / 45 DEBT / 12 recoverable recalls | 0 BLOCK / 0 DEBT / 0 recoverable |

Chapters, in the specification's order: 1 The Characteristics of AS (1a-1c) · 2 What Shifts
Short-Run AS (2a-1..3) · 3 The Shapes of Long-Run AS (3a) · 4 Long-Run AS: Technology,
Productivity and Skills (3b-1..3) · 5 Long-Run AS: Regulation, Population and Competition (3b-4..6).

**Scope decision, and why it is not a new decision.** The live section taught 2.3.4 · 3
(equilibrium; `national-income`, packet 37) in two blocks and 2.3.5 · 4 (output gaps;
`economic-growth`) in one subsection. The brief (§4) left "narrow to 2.3.3 or keep a 5-block bridge"
open. `audit/SPEC-OWNERSHIP.md`'s settled rule ("a topic is taught in the section whose
specification number contains it, and nowhere else") already answers it, and the packet goal is
"rebuild to the IAL specification"; so the rebuild narrows, and a row was added to
`audit/SPEC-OWNERSHIP.md` (the new last row of "The map") before claiming. The classical adjustment
("self-correcting mechanism") is KEPT, because it is 3a-2's explanation of why the classical LRAS is
vertical (`:1042`). If the founder wants the bridge instead, that reverses `structure-08`,
`topFix-05`, `structure-05` and `specGap-06`.

## Files (all new unless stated)

- `scripts/_packet44-util.mjs` — ids, formatters, the economy (`ECON` :85; capacity = workers ×
  output per worker :94), `SRAS_FACTORS`/`LRAS_FACTORS`, `BANNED_ELSEWHERE` :200, `POINTER_ONLY` :214.
- `scripts/_packet44-content.mjs` — 18 subsections (:60-:637), `BLOCK_PLAN` :639, `LEAF_MAP` :709,
  `NOTES` :737.
- `scripts/_packet44-assessment.mjs` — `QUIZ` :58, `PRACTICE` :181, `FLASHCARDS` :214,
  `MISTAKES` :255, `EXTRAS` :298.
- `scripts/_packet44-diagrams.mjs` — 5 diagrams (:162, :197, :258, :293, :309), `DIAGRAMS` :326.
- `scripts/packet-44-aggregate-supply.mjs` — the runner (dry run / `--dump` / `--stage`).
- `audit/SPEC-OWNERSHIP.md` (modified) — one row added for equilibrium and output gaps.
- `audit/snapshots/2026-09-26-pre-packet-44__economics__aggregate-supply.json` — t=0 snapshot of
  all 8 tables, taken before the write (`audit/runs/packet-44/snapshot.mjs`).
- `audit/snapshots/packet-44-bundle__economics__aggregate-supply.json` — the staged bundle.

## Per ledger id (26 claimed, 1 wont-fix)

| id | what changed | where |
|---|---|---|
| topFix-01 | every fill-in has one `___` per template line and single-token answers, 2-3 distractors, semantic hints; runner refuses a 2-blank line | content :266, :427, :457, :555; runner :390 |
| topFix-02 | quiz/practice pins DERIVED from each item's block tag; each block gets its own items; the Define is 2 marks; no "Explain two factors (Outline)" item — Outline does not exist | runner :55-:66; assessment :58, :181-:182 |
| topFix-03 | every block pins its own diagram by `diagramId`; the self-correcting mechanism is drawn as the "Classical adjustment" scenario (AD, AD₁, SRAS, SRAS₁, LRAS on one diagram) | diagrams :219, :258; runner :596-:599 |
| topFix-04 | the 2022 UK, 2019 UK, "had not predicted stagflation" and COVID examples are gone; no year, no UK frame survives (runner bans both, and each phrase) | runner :603-:607 and the locale block in §9 |
| topFix-05 | equilibrium blocks not taught here at all (SPEC-OWNERSHIP); no generic procedure reorders; bank rebuilt (no near-dup stems ≥0.5); "SRAS steepens" takeaway gone and refuted in the Keynesian misconception | content :366; runner §6 near-dup, :467-:469 |
| accuracy-01 | UK 2022 manufacturers example removed; SRAS example is a fictional workshop with no date | content :89-:128 (realExample) |
| accuracy-02 | "UK 2019 close to macroeconomic equilibrium" removed with the equilibrium block | runner :607 asserts absence |
| practice-01 | "Define aggregate supply (2 marks)", scheme = two definitional clauses only | assessment :182 |
| structure-01 | LRAS chapter's inline quiz is LRAS/capacity material; runner asserts the LRAS chapter's first item is not an SRAS item | runner §6 (structure-01 check) |
| structure-02 | code half already true on this branch and origin/main: `lib/checkin-placement.js:51` resolves `practiceIndices` against RAW order; content half: every block has its own on-topic practice | assessment :181; runner §4 |
| structure-03 | as topFix-03: no `diagramRef` anywhere, every `diagramId` resolves, no shared pin | runner §4 |
| structure-04 | one recall per subsection, id minted from the subsection; the step model (`lib/learn-steps.js` buildSteps, one teach step per subsection) removes the solo-step pairing | runner §4 recall-id check |
| structure-05 | stagflation / AD-right / classical-vs-Keynesian are each taught once; flows unique (runner) | runner :603-:611 |
| structure-06 | 5 reorders, all causal chains with named criteria; no `shuffled`; no item shared between reorders; procedure-verb items refused | content :111, :178, :330, :492, :618; runner :386, :407-:408 |
| structure-07 | as topFix-01 (same defect) | runner :390-:391 |
| structure-08 | section is 2.3.3 only; "2.4.3" and "2.5.2" asserted ABSENT from econ_spec.txt; neighbours pointer-only with topic numbers | runner :273; util :214 |
| structure-09 | SRAS/Keynesian conflation removed and refuted (Keynesian misconception); straw-man misconception gone | content :366; runner :467-:469 |
| structure-10 | positive observation preserved: SRAS before LRAS; classical and Keynesian consecutive in one chapter, followed by a comparison step (now one subsection per step, the programme-wide step model) | content :639 |
| specGap-01 | `productivity` subsection: output per worker, capacity = workers × output per worker, +3% → $824bn. The item's "relative to other economies" is its own gloss; the spec bullet is bare "productivity" (`:1045`) | content :442 |
| specGap-02 | `demography` (working-age × participation, ageing −1m → $784bn, participation, births lag) and `net-migration` (immigration − emigration, skilled emigration, zero-net-but-skills case) | content :539, :569 |
| specGap-03 | `regulations-and-tax`: compliance cost vs capacity-raising rules, AND tax as a long-run incentive (the spec bullet's other half, `:1047`) | content :513 |
| specGap-04 | `competition-policy`: cartels, mergers, barriers → pressure to cut costs and innovate → output per worker → LRAS | content :597 |
| specGap-05 | "on a vertical long-run curve … a movement along it changes the price level and leaves real output exactly where it was" + diagram scenario "Along a vertical LRAS". Leaf is 2.3.3 · 1c (`:1034`), not the cited 2.3.1 | content :139; diagrams :162 |
| specGap-07 | SRAS and LRAS on one diagram (classical adjustment) plus the Keynesian non-adjustment chain; cited "2.4.3" does not exist | diagrams :219; assessment :312 |
| diagram-01, diagram-02 | as topFix-03 | runner §4 |
| **specGap-06 (wont-fix)** | leaf is 2.3.5 · 4d (`:1125`), owned by economic-growth; output gaps no longer taught here; note recorded in the ledger | ledger note |

## What was run, and what it measured

- `node scripts/packet-44-aggregate-supply.mjs` — exit 0, 0 new BLOCK / 0 new DEBT on this section,
  0 `recall.recoverable` (the shared validator measure), 14/14 leaves (`runner.log`).
- Mutation A/B of the runner (`ab-mutation.sh`, `ab-mutation.log`): clean copy passes; 11 of 12
  planted defects fail with the named message (year+UK example, uncited output-gap pointer, typed
  LRAS figure, 2-blank fill-in line, Define (4), colliding label, mis-mapped leaf, near-dup stem,
  banned word, long-run point off AD₁, `shuffled`). The 12th (block with no diagram) fails closed
  by crashing (exit 1), not with a message.
- Stage: `stageBundle` wrote all 8 `draft` columns; `ok:true`, 0 BLOCK / 0 DEBT.
- Independent read-back (`draft-readback.mjs`, `draft-readback.log`): each table's `draft`, read
  directly, equals the dumped bundle key-order-insensitively; each table's `data` is still the old
  content (live not written). Through the API route `localhost:3001/api/sections/aggregate-supply?draft=1`
  (signed out, so the free payload only): the 8 quiz items and 2 flashcards served are byte-identical
  to the bundle, and each chapter's served question is its own first item. Premium-only fields were
  checked through the database read only, not through the page.
- Diagrams rendered to PNG with sharp at 400 units and looked at (`diagrams-grid.png`) — dark
  background only; not the light-theme remap, not at 390 px in the app.
- `npm test` 303/303, `npm run recalls` exit 0 (aggregate-supply draft 0 of 18 recoverable),
  `npm run exposure` exit 0, `npm run validate` exit 0 — all run in the SHARED worktree, which holds
  other sessions' uncommitted changes, so they are not a gate on a commit of these files alone.
- **Not run:** `npm run build` (a `next build` in this worktree would rewrite `.next` under the dev
  server another session has on :3001; no file this packet touches is imported by `app/`). Verify A,
  Verify B (390×844 walkthrough), Layer 6 adversarial review, Layer 4 corroboration by a reviewer
  with search.

## Publish (rule 6 — for the founder, not run)

```
node scripts/packet-44-aggregate-supply.mjs --stage && node scripts/publish-section.mjs aggregate-supply --confirm
```

Before it: rule 3 field check against origin/main. The content uses only fields packet 37/42 already
staged (`diagramId`, `quizIndices`, `practiceIndices`, recall `type` reorder/fillin/match/classify,
`why`, `criterion`, `distractors`, body types paragraph/flow/bullets); `origin/main`'s
`lib/checkin-placement.js:46,:51` reads `diagramId` and raw `practiceIndices`. Recall widgets on
origin/main were not re-read field by field in this phase.

## For the next phase

- `audit/PROGRESS.md` row 44, `NEXT.md` and `DECISIONS.md` were NOT touched (handoff-file race);
  the gate phase writes them. Suggested DECISIONS entry: the SPEC-OWNERSHIP row above.
- The live section's own validator line shows 3 DEBT outside the baseline on `data`
  (`validate-content.mjs`, "new-debt 3") — pre-existing live content, cleared on publish.
- Real examples a Layer 4 reviewer should corroborate (no year or figure attached to any):
  Singapore and Pakistan import most of the oil they use; Kenya mobile money; Singapore SkillsFuture
  credit; Japan and Hong Kong ageing, Nigeria young; UAE/Qatar reliance on migrant workers; Nigerian
  and Kenyan doctor/nurse emigration; Competition Commission of Pakistan and Kenya's Competition
  Authority fining cartels and blocking mergers.

## Fix round 1 — specGap-07 (26 September 2026)

**Correction to the claim table above:** the row "specGap-07 | SRAS and LRAS on one diagram (classical
adjustment) plus the Keynesian non-adjustment chain" claimed a fix that was not made. Verify A
(`verify-a.md:108-113`) rejected it and was right. Diagram `84e3e9ae`, scenario "Keynesian: three
ranges" (`scripts/_packet44-diagrams.mjs:240-271`), draws the Keynesian curve alone. It has no AD, no
SRAS and no equilibrium point. The Keynesian outcome appears only in words: two-shapes-compared
body[2] (`_packet44-content.mjs:393`) and the chain at `_packet44-assessment.mjs:323`.

**Disposition: wont-fix, reassigned in substance to national-income, following specGap-06.**
`node audit/scripts/ledger.mjs wontfix C-aggregate-supply-specGap-07 --note ...`. The note keeps
the 13 Sep spec-numbering warning, because `wontfix` overwrites the note.
Checked against the specification by wording (rule 1), not by the item's number:
- "short run and long run" appears in `econ_spec.txt` only at :684 (the general distinction) and at
  :1374 / :1383 (firm theory). No AD/AS requirement uses the phrase. The cited "2.4.3" does not exist.
- 2.3.3 · 3a (`:1039-1042`) asks only for the two SHAPES. This section draws both.
- The effect of an AD shift on equilibrium output, for each shape, is 2.3.4 · 3b (`:1076-1077`). That
  belongs to national-income under `audit/SPEC-OWNERSHIP.md`.
- I checked this by a different method from the verifier, which read `packet-37-bundle`. I read the
  packet-37 source modules. `_packet37-diagrams.mjs:414-422` defines "The Multiplied Shift of AD",
  scenario "Three AS shapes": one AD shift against flat, upward-sloping and vertical AS, with output
  and price given for each. `_packet37-content.mjs:572` and `:817-818` teach the same result in
  prose. `curl localhost:3001/api/sections/national-income?draft=1` returned "Three AS shapes" twice.
  The same request without `?draft=1` also returned it twice. I did not check production, and I did
  not work out why the non-draft route serves it while PROGRESS row 37 reads "STAGED NOT PUBLISHED".

**Rule 4 read of the same entry and its notes twin. No content edit was needed, so nothing was
re-staged.** I read these fields: the diagram's description, checklist and three scenario labels
(`:258-272`); the two-shapes-compared paragraphs, realExample, misconception, examMatters and
classify recall (`:393-410`); the block 3 notes twin (`:782-803`: definitions, mechanisms, takeaway);
and the Keynesian chain. None of them claims a Keynesian equilibrium diagram. The description says
"AD, SRAS and LRAS on one diagram" of the classical scenario only. body[2] already hands the
demand-to-output question to "topic 2.3.4".

**Gap to note, not to fix here:** national-income does not use the word "Keynesian". Its own ban
(`_packet37-util.mjs:295`) sends the shape names to this section. So the name is taught here and the
equilibrium outcome is taught there, as the Below-capacity / AS-flat panel. No single diagram
labels an AD shift on a curve called "Keynesian".

**Ran:** `node audit/scripts/ledger.mjs unverified 44` gave exit 0, "gate clear". I cross-checked by
reading `audit/ledger.json` directly with python, not through the CLI. specGap-07 is `wont-fix`,
`closed_by packet-44`. Packet 44 now stands at 25 confirmed and 2 wont-fix.
**Did not run:** a re-stage, `npm run build`, validate, test, recalls or exposure. No module changed
this round, so the earlier results in this file were not re-measured.

## Fix round (post founder decision) — printed quiz keys (26 September 2026)

**Decision:** the founder said "yes do that" on 26 Sep 2026: fix the two check-in quiz items whose
answers are printed above them (Verify B, `verify-b.md` steps 13 and 20). **Context:** the founder
PUBLISHED aggregate-supply at 05:45 UTC on 26 Sep, before this fix. The backup is
`audit/snapshots/auto-prepublish-2026-09-26T05-45-10-050Z__economics__aggregate-supply.json`. The
live section still carries all three leaks listed below. This round re-staged to DRAFT only. The
founder re-publishes. The Books phase has to record the 05:45 publish in PROGRESS row 44.

**The probe comes before the fix.** `audit/runs/packet-44/leak-probe.mjs` imports nothing from the
runner or its modules. It reads a bundle JSON and, for each block, collects everything
`components/learn-mode/InlineDiagram.jsx:66-100` renders for that block's diagram: title,
description, scenario labels, the `<text>` of every view and the checklist. It then tests each
pinned quiz key for two kinds of match. A HARD match is the key's text verbatim, or a unit-bearing
figure of the key, not given in the stem. A SOFT match is a bare numeral of 13 or more, such as an
axis tick. A/B: the pre-fix bundle gives **exit 1, 12 HARD matches on 3 items**
(`fix-round-leak-probe-before.log`). The fixed dump gives **exit 0, 0 HARD, 0 SOFT, 29 of 29 ok**
(`fix-round-leak-probe-after.log`).

**The script found a third leak that Verify B had not reported.** Block 2's quiz[8] asks for
20% × 10%, and the key is 2%. The check-in's "A tax rise" view, one tap away, has the caption
"Tax adds 2% to the cost of each unit." The figure is a coincidence, but the leak rule treats a number in a choice as never
a coincidence, so it is fixed too. No other check-in item matches.

**The fix is in the items, not the surfaces.** The caption and checklist carry the spine
(40m × $20,000 = $800bn; 50m × 80% = 40m), so they stay. Each item now applies the same rule to its
own figures. None of the new figures appear on the block's diagram surfaces:
- `scripts/_packet44-assessment.mjs:92-94`: quiz[8] is now 40% × 10% = **4%** (distractors 10%, 40%, 50%).
- `scripts/_packet44-assessment.mjs:114-116`: quiz[14] is now 25m × $30,000 = **$750bn** (distractors $75bn,
  $7,500bn, $30bn).
- `scripts/_packet44-assessment.mjs:156-158`: quiz[26] is now 60m × 75% = **45 million** (distractors 60m,
  15m, 75m). The item no longer reads the `E` spine.
- `scripts/packet-44-aggregate-supply.mjs:199-202`: the independent arithmetic asserts are updated to
  4%, $750bn and 45m.
- `scripts/_packet44-assessment.mjs:88-91`: the comment explains the stem wording. `placeKeys` deals
  every key by the stem-hash RANK, so a freely reworded stem re-dealt the keys of **18 unchanged,
  published items**. I measured that first. Each new stem was chosen from a generated set of wordings
  so that its hash falls in its predecessor's rank. Result: **0 keys moved**, and the histogram is
  still 8/8/8/8.

**What changed, measured against the pre-fix dump:** quiz items 8, 14 and 26 changed in id,
question, options and explanation. correctIndex did not change. content, notes, practice,
flashcards, mistakes, diagrams and extras are byte-identical. The pins are unchanged
(`[[3..7],[8..13],[14..20],[21..25],[26..31]]`), and so is the spine line.

**Ran:**
- `node scripts/packet-44-aggregate-supply.mjs --dump --stage` exited 0: 0 BLOCK / 0 DEBT / 2 INFO,
  0 recoverable. Only `section_quiz` was staged; the other 7 tables were unchanged
  (`fix-round-stage.log`).
- `node audit/scripts/check-staged-drafts.mjs aggregate-supply` reported **matches**, 0 drift.
- For a different method, `fix-round-readback.mjs` read the `draft` and `data` columns straight from
  the database: the draft quiz matches the dump on 0 differing items, and live `data` differs from the
  dump only at [8, 14, 26], so live was not written. Leak probe on the DB draft: 0 HARD. On DB live:
  12 HARD on 3 items, which is the published leak waiting for the re-publish.
- `npm run validate` exited 0. There are 0 new BLOCK programme-wide, and aggregate-supply reads
  0/0/0/0. The 162 new DEBT are in other sections.

**Out of scope, left alone:** "4%" appears in chapter 1 prose (a 4% price-level rise), well before
block 2's check-in and not on its diagram. The three platform FAILs from `verify-b.md` were not
touched.
