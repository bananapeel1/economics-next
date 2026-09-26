# Packet 44 — Verify A (packet-verifier, 26 Sep 2026)

Scope: `node audit/scripts/ledger.mjs unverified 44` = 26 claimed ids (specGap-06 already wont-fix, not
re-judged). `built.md` not read. The diff for this packet is new files only (scripts/_packet44-*.mjs,
scripts/packet-44-aggregate-supply.mjs, snapshots, SPEC-OWNERSHIP row 27); no shared renderer code changed
for packet 44.

## Method (deliberately not the builder's)

The builder's checks live in `scripts/packet-44-aggregate-supply.mjs` (runner assertions) and
`audit/runs/packet-44/draft-readback.mjs`. I used neither.

1. **Served draft, not files.** `curl localhost:3001/api/sections/aggregate-supply?draft=1` and without
   `?draft=1`. Deep diff against `audit/snapshots/packet-44-bundle__economics__aggregate-supply.json`:
   `notes`, `diagrams`, `practice` byte-equal; `content` differs only in `quizIndices` (the free-tier
   API remaps them onto its 8-item quiz slice; each remapped index points at the same quiz id as the
   bundle's first pin: draft quiz[0..4] = bundle Q3/Q8/Q14/Q21/Q26); `extras` differs only by free-tier
   truncation. `counts` = quiz 32, flashcards 34, mistakes 7 = bundle. Live `data` still holds the old
   section (3 diagrams, 5 practice) — the draft is staged, not published. **Every confirm below is a
   statement about the staged draft, which is not yet what a student sees**, the same caveat SPEC-OWNERSHIP
   row 27 records.
2. **The real client placement run on the served draft.** `lib/learn-steps.js buildSteps` +
   `lib/checkin-placement.js placeChapterItems` + `pickSpacedRecall`, fed the API JSON (free) and the
   bundle (premium). This is the renderer, not a restatement of it; the data came from the server.
   Result, both tiers identical: 23 steps; each chapter gets its own diagram, quiz and practice:
   - ch0 Characteristics — "Movement Along and Shift of AS" / Q "Real national output ... constant prices" / Define AS (2)
   - ch1 SRAS shifters — "What Shifts SRAS" / Q energy 20% x 10% / Calculate 40% x 15% (2)
   - ch2 LRAS shapes — "Classical and Keynesian LRAS" / Q 40m x $20,000 capacity / Draw classical adjustment (4)
   - ch3 tech/productivity/skills — "LRAS Shifts: Output per Worker" / Q productivity definition / Examine education (8)
   - ch4 regulation/population/competition — "LRAS Shifts: The Labour Force" / Q labour force 50m x 80% / Evaluate ageing (20)
   - spaced recall at each check-in comes from an earlier chapter; never equal to the step just before it.
3. **Recall shapes read from the bundle by hand**, not through `validate`: 3 fill-ins, every template line
   has 0 or 1 `___`, every answer one token, 3 authored distractors each, hints descriptive (no letter
   counts). Arithmetic re-done: 0.2x15+0.1x20=5; 5m x $40k=200, +10%=220; 30m x 70%=21, +10pp=3. 5 reorders,
   all four-step causal chains, no `shuffled` field (and `lib/recall-widgets.js:15` ignores it anyway).
4. **Diagram geometry recomputed from the SVG path coordinates** for "Classical adjustment": SRAS, AD,
   AD1, SRAS1 all pass through their labelled points ((800,100), (770,94), (800,88)) to 0.05px; the AD
   shift and SRAS shift are both 141px = $60bn at 2.35px/bn. Own text-bbox overlap check over all 16
   scenarios: 0 overlaps, 0 off-canvas. A/B: moving the AD label to y=131 is caught (AD / SRAS1).
5. **Duplication measured by difflib** over quiz question+answer: post max 0.59; control on the
   pre-packet snapshot (`2026-09-26-pre-packet-44`) max 0.74 (its Q0/Q11, Q1/Q5 pairs — the ledger's
   named duplicates). So the metric sees the defect class and it is gone.
6. **Grep over every string in the bundle** (content, notes, quiz, practice, flashcards, mistakes,
   extras): no "stagflation", "COVID", "2008", "2019", "2022", "UK manufactur", "output gap",
   "potential output", "never work". "equilibri" appears once (classical-lras examMatters, the two
   points of the 3a diagram); "steep" appears only inside the misconception and mistake that correct the
   SRAS/Keynesian conflation. Cross-topic mentions are pointers: 2.3.4 x2, 2.3.6 x2, 2.3.2 x2 — all real
   headings (`econ_spec.txt:976, 1056, 1132`).
7. **Every prose number recomputed** (25%x20%=5% -> $775bn at SRAS slope $5bn/pt; 30%x10%=3% -> $785bn;
   2% -> $790bn; +8% -> $760bn; 40m x $20k=$800bn; +5% -> $840bn; +3% -> $824bn; 10m x $20k x 8%=$16bn;
   49m x 0.8=39.2m -> $784bn; 50m x 82%=41m -> $820bn; 1.5m x $20k=$30bn; AD -60 -> (770,94) -> (800,88)).
   All consistent. Practice tariffs checked against Appendix 6 (`econ_spec.txt:2696-2745`): Define 2,
   Explain 4, Calculate 2 and 4, Analyse 6, Draw 4, Examine 8, Discuss 14, Evaluate 20 — all valid; no
   Assess, Outline, 6-mark Explain or 10-mark item. P3 working 0.25x12 - 0.20x5 = +2%, SRAS left: correct.

## Verdicts

- topFix-01 CONFIRMED — bundle content[1].sections[3], [3].sections[0..1], [4].sections[1] fill-ins: one
  `___` per line, single-token answers, 3 distractors each; parser `lib/recall-widgets.js:140-155`.
- topFix-02 CONFIRMED — placement run above: each chapter's quiz and practice is on its own chapter's topic,
  free and premium.
- topFix-03 CONFIRMED — 5 diagrams, each block pins by `diagramId` and each resolves
  (`lib/checkin-placement.js:46`); the self-correcting mechanism is drawn (diagram 84e3e9ae "Classical
  adjustment", SRAS1 closing a negative gap). The positive-gap half moved with output gaps to its owner
  (SPEC-OWNERSHIP row 27); classical-lras body states it in words ("push output above capacity ... neither lasts").
- topFix-04 CONFIRMED — none of the four named examples survives (grep, method 6). Replacements checked:
  Kenya mobile money, Singapore SkillsFuture, Japan/Hong Kong ageing, Nigeria young, Gulf migrant labour,
  Nigeria/Kenya medical emigration, Pakistan/Kenya competition authorities, Singapore/Pakistan oil imports:
  all accurate and IAL-centre appropriate.
- topFix-05 CONFIRMED — the "Macroeconomic Equilibrium" and "AD/AS Events" blocks are gone (scope narrowed
  to 2.3.3); generic reorders replaced (method 3); quiz duplication gone (method 5); block 0 takeaway
  no longer says SRAS steepens.
- accuracy-01 CONFIRMED — UK 2022 example gone; sras-curve realExample is a fictional workshop whose
  direction (prices up, contracted wages fixed, output up) is the textbook SRAS mechanism.
- accuracy-02 CONFIRMED — "UK 2019 ... macroeconomic equilibrium" gone with the block.
- practice-01 CONFIRMED — practice[0] is "Define the term 'aggregate supply'. (2 marks)", 2 clauses x 1
  mark; no LRAS Define remains; the old sort-by-marks path is not used on the pinned path
  (`lib/checkin-placement.js:51`).
- structure-01 CONFIRMED — placement run (method 2).
- structure-02 CONFIRMED — `lib/checkin-placement.js:51` resolves practiceIndices against raw order; every
  chapter's first practice pin is on topic (method 2).
- structure-03 CONFIRMED — as topFix-03.
- structure-04 CONFIRMED — one subsection per teach step (`lib/learn-steps.js:52`), spaced recalls only from
  earlier chapters (`lib/learn-steps.js:116`); run on the served draft: no spaced pick equals the preceding
  own recall. Blocks 0 and 3 still have 3 subsections, and it no longer matters.
- structure-05 CONFIRMED — stagflation / AD-right repetition gone; classical vs Keynesian taught in block 2
  only (keynesian-lras = the three ranges, two-shapes-compared = the wage assumption; distinct examMatters).
- structure-06 CONFIRMED — 5 reorders, each a 4-step causal chain on economics (method 3); `shuffled`
  absent and ignored.
- structure-07 CONFIRMED — as topFix-01.
- structure-08 CONFIRMED — section is 2.3.3 only; equilibrium and output gaps are pointers (method 6);
  the classical adjustment stays as 3a's explanation of the vertical LRAS.
- structure-09 CONFIRMED — takeaway fixed; the "Keynesians say markets never work" straw man is gone;
  the seven mistakes are all observable student errors.
- structure-10 CONFIRMED (property preserved) — classical and Keynesian LRAS still paired in one chapter
  (block 2); ramp concept -> SRAS -> LRAS shapes -> LRAS factors, practice tariffs rise 2/4 -> 2/4/6 ->
  4/14 -> 8 -> 20.
- specGap-01 CONFIRMED — productivity subsection (block 3) teaches it as the output-per-worker term of
  capacity with a worked shift ($824bn). The item's "relative to other economies" is its own gloss; the
  spec bullet is bare "productivity" (`econ_spec.txt:1045`).
- specGap-02 CONFIRMED — demography (ageing, participation, birth-rate lag) and net-migration (inflow,
  skilled emigration) subsections, each with mechanism and figures.
- specGap-03 CONFIRMED — regulations-and-tax: compliance cost (licences, forms per worker hired) vs
  enabling rules, plus tax as an LRAS incentive (the unticketed half of the bullet).
- specGap-04 CONFIRMED — competition-policy: rivalry -> cost cutting/innovation -> output per worker -> LRAS.
- specGap-05 CONFIRMED — movement-and-shift body para 3 (`scripts/_packet44-content.mjs:139`), diagram
  4e583d16 scenario "Along a vertical LRAS", Q7, classify item.
- specGap-07 **REJECTED** — the item's observation still holds: the only SR/LR equilibrium diagram is the
  classical one; diagram 84e3e9ae "Keynesian: three ranges" draws LRAS alone, with no AD, SRAS or
  equilibrium point. The Keynesian consequence is stated in words only (two-shapes-compared body[2]). The
  honest disposition is the one specGap-06 got: wont-fix/reassign, because 2.3.4 3b is owned by
  national-income, whose `packet-37-bundle` diagram "The Multiplied Shift of AD" has a "Three AS shapes"
  scenario. It is not "fixed here", so it cannot be confirmed.
- diagram-01 CONFIRMED — no block pins by title any more; all five `diagramId`s resolve (method 2).
- diagram-02 CONFIRMED — as diagram-01.

## Unclaimed but relevant (status untouched)

- No other ledger item names aggregate-supply outside packet 44 (only E028, unrelated).
- Not in the ledger: quiz[14] explanation says every wrong option comes from "dropping or adding a factor
  of ten", but the "$20bn" option does not (it drops the 40m factor). A small factual slip in an
  explanation.
- Not in the ledger: chapter 2's inline quiz (Q8, energy 20% x 10%) and inline practice (P2, 40% x 15%)
  are the same calculation back to back; the check-in asks one skill twice.

## Gate

Not yet: 25 of 26 confirmed, specGap-07 rejected, and the builder needs to record it as wont-fix with a
note (or add a Keynesian equilibrium scenario) before `unverified 44` can exit 0; publish is still pending,
so none of this is visible to a student yet.

---

# Round 1 re-verification (packet-verifier, 26 Sep 2026)

`built.md` not read. `ledger.mjs unverified 44` now prints "gate clear" and exits 0: 0 ids unverified.

## What changed since round 0

File mtimes: no content file moved after round 0 (verify-a.md written 01:03). `scripts/_packet44-*.mjs`,
`scripts/packet-44-aggregate-supply.mjs`, the packet-44 bundle snapshot (00:38) and SPEC-OWNERSHIP (00:44)
all predate it. Only `audit/ledger.json` changed (01:06): specGap-07 moved from rejected to **wont-fix**
with a note. So the 25 round-0 confirms stand on unchanged content and were not re-judged; the one
previously rejected id is the only thing to re-check.

## specGap-07 — the wont-fix, checked against sources, not against the note

The note is the builder's argument, so each premise was checked directly:

1. The item's phrase "equilibrium in the short run and long run" is in `audit/raw/econ_spec.txt` only at
   :1374 and :1383 (perfect and monopolistic competition, firm theory), plus :1376/:1384 (efficiency).
   Never in 2.3.x. The item's "2.4.3" is UK numbering and does not exist in the IAL spec. **Holds.**
2. 2.3.3 · 3a (`econ_spec.txt:1039-1041`) is "Different shapes of AS curve: Keynesian, classical" — shapes
   only. The section draws both (`scripts/_packet44-diagrams.mjs:258-272`). **Holds.**
3. What a demand shift does to equilibrium output against each shape is 2.3.4 · 3b (`:1076-1077`,
   "Causes of changes in equilibrium real national output, as a result of shifts in AD and/or AS curves").
   `audit/SPEC-OWNERSHIP.md:27` assigns it to `national-income`. **Holds.**
4. The owner teaches it: `audit/snapshots/packet-37-bundle__economics__national-income.json`
   `tables.diagrams[5]` "The Multiplied Shift of AD", scenario "Three AS shapes" (flat / upward-sloping /
   vertical AS against one AD shift), pinned by `content[5]`. Found by walking the bundle JSON, not by the
   note's line numbers. **Holds, with the same caveat as row 27: staged, not published.**
5. aggregate-supply points at it: `scripts/_packet44-content.mjs:393` two-shapes-compared body[2] states
   the classical vs Keynesian consequence in words and names 2.3.4 as the owner. **Holds.**

One small inaccuracy in the note: it calls `_packet37-util.mjs:295` a "ban" on "Keynesian". It is a
POINTER_ONLY budget of 12 mentions, not a ban. It does not change the disposition.

Verdict: this is the disposition round 0 said was the honest one (wont-fix/reassign, like specGap-06). The
item is a question built on a spec line that does not exist for AD/AS. The real leaf nearest to it is owned
and drawn by national-income. Status left as **wont-fix**. No confirm or reject was recorded: a confirm
would claim a fix that was never made, and a reject would reopen a correct refusal.

## Round-0 side notes (not ledger items), re-checked

Both are still present, because no content changed: quiz[14]'s "factor of ten" explanation vs its "$20bn"
option, and chapter 2's back-to-back energy-cost calculations (Q8 / P2). Neither blocks the gate, and
neither is in the ledger.

## Gate

The ledger gate passes: every claimed id is confirmed, and specGap-06/07 are wont-fix with verified
notes. The caveat from round 0 still stands: the aggregate-supply draft, and the national-income draft that
specGap-07 relies on, are both staged, so a student cannot see any of this until they publish.
