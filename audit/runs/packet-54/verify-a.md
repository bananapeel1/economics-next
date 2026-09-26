# Packet 54 — Verify A (packet-verifier, fresh context)

Did not read `built.md`. Started from `ledger.mjs unverified 54` (30 claimed, structure-08 already wont-fix) and the diff.

## Method (independent of the builder's)

1. Fetched the live draft myself: `curl localhost:3001/api/sections/assessing-competitiveness?draft=1` (200, 106 KB).
2. Compared it key-order-insensitively with `audit/snapshots/packet-54-bundle__business__assessing-competitiveness.json`:
   notes, practice, diagrams equal; content differs only in `quizIndices` (the anonymous slice remaps pins to 0-4);
   the 8 served quiz items and 2 served flashcards are byte-equal to snapshot quiz 3/7/12/17/23/0/1/2 and cards 0/1;
   extras differ only by the anonymous truncation. So the snapshot is the draft, and I read the snapshot for the gated rest.
3. Read every field end to end (dumped to text: 5 blocks, 18 subsections, 28 quiz, 7 practice, 26 cards, 8 mistakes,
   5 notes, 4 chains, 3 evaluations, 5 diagrams with every SVG `<text>`).
4. Re-did every figure by hand against the case, and every formula against `audit/raw/bus_spec.txt` Appendix 9
   (lines 2395-2455) and 3.3.5 (1218-1248). Recomputed the gearing diagram (21.3c / 38c / 3.6c / −2c) from $20m CE at 8%.
5. Ran `lib/content-validator.mjs validateSection` offline on the snapshot with a hand-built ctx (no DB): 0 BLOCK,
   0 DEBT, `spec.coverage` 18/18 — lexical, so coverage was judged by reading, leaf by leaf, not by that number.
6. Checked practice tariffs against `audit/raw/ial-paper-structure.json` units_3_4: 4+4+8+12+12 source set (P0-P4),
   two Evaluate 20s (P5, P6), command words Explain/Calculate/Discuss/Assess/Evaluate — exact match.

## New defect found: the case's wage figure is impossible against its own accounts

`scripts/_packet54-util.mjs:143-144` types shop pay at **$14,000 a month** (rivals $15,000). 200 shop staff ×
$14,000 × 12 = **$33.6m a year**. The same Source A gives other operating expenses of **$10m** and cost of sales of
$24m: all costs together are $34.8m, which would have to cover shop wages ($33.6m) plus bakers, flour, rent for 24
shops, marketing and office salaries. Whichever line shop pay sits on, it cannot fit. The $2.4m "closing the pay
gap" figure (200 × $1,000 × 12) and every conclusion built on it — "about five times the turnover", "financial
rewards cost the most" — rest on it:

- content `financial-rewards` body ¶2 (`_packet54-content.mjs:451`): "Closing the gap for 200 staff would cost about $2.4m a year, far more than the $480,000…"
- notes block 5 mechanism (`_packet54-content.mjs:733`); diagram `5c268d90` bar "Matching rivals' pay $2.4m" and checklist "about five times" (`_packet54-diagrams.mjs:279-306`)
- extras evaluation "Which HR strategy fits the problem?"; Source A in all 7 practice items; P6's Level 3 and strong-answer outline ("closing the pay gap would cost $2.4m a year").

A consistent wage (the shop wage bill has to fit inside a $10m opex line) makes the gap cost a few hundred thousand
dollars, the same order as turnover, which changes the P6 judgement and the block 5 teaching. The builder's own
assertion (`packet-54-assessing-competitiveness.mjs:189`) checks PAYGAP = 2.4e6 and 5× turnover, the arithmetic of
the figure, never whether the figure fits the accounts: the same blind spot as the fix.

## Verdicts

| id | verdict | evidence |
|---|---|---|
| topFix-01 | REJECT | Both blocks exist (block 0 statements + stakeholders; blocks 3-4 HR measures + 4 strategies; old q6/q7 now Q21 in block 3, Q25 in block 4), but the HR-strategies half teaches its cost comparison from the impossible wage (above) |
| topFix-02 | REJECT | 7 on-section items at 4/4/8/12/12/20/20 with levels schemes and scaffold-first openings, but Source A, shared by all 7, is internally impossible, and P6's scheme and judgement rest on the $2.4m it produces |
| topFix-03 | confirm | VRIO / core-competencies block absent (0 hits for VRIO, "Examiners", "tangible", "competitive advantage" in the bundle) |
| topFix-04 | confirm | Tesla 0 hits; gearing gets its own example (Kuala Lumpur developer); card 5 = profit for the year ÷ revenue; patents 0 hits; current ratio qualified by business type (liquidity ¶4, mistake 2, Lagos example) |
| topFix-05 | confirm | Fill-ins on ROCE (interpreting-roce), gearing and capital employed (return-on-capital-employed), labour turnover (absenteeism); reorder is the exact borrow→gearing→interest→downturn→cover chain (interpreting-liquidity-and-gearing); every block carries quizIndices/practiceIndices/diagramId |
| accuracy-01 | confirm | Tesla claim gone; liquidity (Lagos supermarket) and gearing (KL developer) each have their own example |
| accuracy-02 | confirm | the vrio-framework field and any "examiners reward" claim are absent |
| accuracy-03 | confirm | card 5: profit for the year ÷ revenue × 100 (spec Appendix 9 :2418-2420); mistake 1 names operating margin as 2.3.3 (spec :931-933) |
| quiz-01 | confirm | turnover questions Q17/Q21 pinned to block 3, whose labour-turnover-and-retention subsection teaches the formula |
| quiz-02 | confirm | empowerment Q25 in block 4 (taught in empowerment-strategies); distractor "Consultation", no zero-hours |
| practice-01 | confirm | no Five Forces anywhere; the 4-mark item is "Explain one reason…" (P0) with a point-marked scheme |
| practice-02 | confirm | Bowman 0 hits; the 8-mark slot is an acid-test Discuss on the case |
| practice-03 | confirm | smartphone question gone; both 20-markers are anchored on the case with levels and an indicative judgement; P1-P4 and P6 examine ratios, statements and HR (P6's $2.4m defect is filed under topFix-02) |
| structure-01 | confirm | 5 blocks map to spec 1a-1b, 2a, 2b-2c, 3a-3b, 3c |
| structure-02 | confirm | quiz and practice both on-content, pinned per block (block 0 Q3-6 P0 … block 4 Q23-27 P6) |
| structure-03 | confirm | every block has quizIndices, practiceIndices and diagramId |
| structure-04 | confirm | 18 recalls on 18 subsections (2 reorder, 7 fill-in, 2 match, 7 classify) |
| structure-05 | confirm | 18 subsection steps over 5 blocks; the bridge "Ratios assess competitiveness because…" opens interpreting-roce-and-margins, and productivity ¶4 ties wages per worker to competitiveness |
| structure-06 | confirm | 5 diagrams incl. "Gearing Magnifies Gains and Losses"; its figures recompute exactly |
| structure-07 | confirm | gearing-ratio has a gearing example and gearing-specific examMatters (interest rates, sales stability) |
| structure-09 | confirm | no "most important" anywhere; the only "always" is net assets = total equity and misconceptions naming "always" as the error |
| structure-10 | confirm | an observation, not a defect: the genuine on-spec misconceptions survive (mistake 0, ratio in isolation; mistake 3 and the gearing misconception, high gearing always bad); the two VRIO ones went with the off-spec block |
| specGap-01 | confirm | subsections statement-of-comprehensive-income and statement-of-financial-position |
| specGap-02 | confirm | stakeholder subsection: shareholders, lenders, suppliers, employees, managers, government |
| specGap-03 | confirm | limitations-of-ratio-analysis: historical data, window dressing, accounting choices, different businesses, qualitative, inflation |
| specGap-04 | confirm | labour-productivity, labour-turnover-and-retention, absenteeism, limitations-of-these-calculations, each with a worked calculation |
| specGap-05 | REJECT | all four strategies taught, but financial-rewards ¶2 and diagram 5c268d90 compare a $2.4m pay gap that cannot exist inside the section's own accounts |
| specGap-06 | confirm | interpreting-roce-and-margins ¶2: ROCE 20% against 8% borrowing; tested by Q13 |
| specGap-07 | confirm | VRIO / tangible vs intangible absent |
| specThin-01 | confirm | statement-of-comprehensive-income defines each line, with a worked cascade (40 − 24 − 10 − 0.8 = 5.2) |

## Check-in answers (CONTENT-GATE, question first)

Check-ins resolve through `lib/checkin-placement.js` → first pin per block.

- CHECKIN 1 "Reading the Financial Statements": diagram 87c73972 / Q3. **clean** on the diagram (no 1.5 anywhere). BORDERLINE (debt, not blocking): the key "$1.5m" equals the stem's own opex figure, so "pick the number in the stem" scores it. It does not state the answer, so it is debt under point 5; worth changing the figures in the later rewrite pass.
- CHECKIN 2 "Calculating the Ratios": fc53ab8e / Q7 (unchanged gross margin, falling PFY margin). **clean**: the diagram shows both margins falling.
- CHECKIN 3 "Using Ratios to Make Decisions": 2e9904d3 / Q12 (what reduces gearing). **clean**.
- CHECKIN 4 "Measuring the Workforce": f21a47cf / Q17 (8 of 40 = 20%). **clean**: the diagram shows 15/30/90/80/3/5, and no key is near a diagram number.
- CHECKIN 5 "HR Strategies…": 5c268d90 / Q23 (why ESOP barely moves effort). **clean**.

No blocking leak.

## Noted, not rejected

- Levels schemes carry no mark bands, and the 20-markers are one 4-level ladder rather than the 26 Sep ruling's KAA 12 (L1-4) + Evaluation 8 (L1-3). Packets 51 and 55 use the same house shape, and the ruling assigns the re-expression to its own packet.
- Interest $0.8m = 8% of the year-end $10m loan, though the loan rose during the year. A tolerable simplification.

## Unclaimed but relevant

None open. structure-08 is already wont-fix (3.3.5 is correct).

## Gate

Should not pass: topFix-01, topFix-02 and specGap-05 stay open until the shop-pay figure agrees with the accounts and the pay-gap comparison, diagram 5c268d90, the notes, the extras and P6 are re-derived from it and re-staged.

---

# Round 1 re-verification (packet-verifier, fresh context, 26 Sep)

Did not read `built.md`, `payfit-check.mjs` or its logs. Re-checked the three round-0 rejects myself.

## Method (different from the fix's)

The fix's own guard is an inequality in the runner (`packet-54-assessing-competitiveness.mjs:191-197`: wage bill
at rivals' pay <= 60% of opex; replacement cost between 1 and 12 months' pay) plus `payfit-check.mjs`. I used neither:

1. Fetched the served draft myself, `curl localhost:3001/api/sections/assessing-competitiveness?draft=1` (200, 106,830 B),
   and compared key-order-insensitively with `audit/snapshots/packet-54-bundle__business__assessing-competitiveness.json`:
   practice, notes, diagrams equal; content equal once `quizIndices` (anonymous remap) is dropped; extras.evaluation
   served is item 0 of the snapshot's 3 (anonymous truncation, `counts.extrasEvaluation: 3`). So the fix is staged,
   and the snapshot is what a premium student gets.
2. Searched the served draft and the snapshot for every figure the old wage produced: `14,000`, `15,000`, `2.4m`,
   `$1,000`, `33.6`, "five times the", "cost the most": 0 hits each ("five times" survives only as interest cover,
   7.5x and 25x, which is correct: 6/0.8, 5/0.2).
3. Read every place the pay figure reaches: financial-rewards para 2 and the ESOP para 3 (block 4), notes block 5
   mechanism, diagram 5c268d90 (title, description, checklist, every SVG `<text>`, bar widths), extras evaluation
   "Which HR strategy fits the problem?", Source A in all 7 practice items, P6 guidance Levels 1-4 and strong answer,
   Q21-Q27 and their explanations.
4. Re-did the arithmetic by hand and tested the conclusion for scale-dependence, which the fix's inequality cannot see.

## Findings

- Wage bill fits the accounts: 200 x $2,000 x 12 = $4.8m inside other operating expenses $10m (leaves $5.2m for
  24 shops' rent, delivery, marketing, head office); last year 180 x $2,000 x 12 = $4.32m inside $9.4m. Bakers (50)
  sit in cost of sales $24m. Source (`_packet54-util.mjs:145-146`) and every served string agree.
- Pay-gap cost: 200 x ($2,200 - $2,000) x 12 = $480,000; turnover cost 60 x $8,000 = $480,000; ESOP $500,000.
  Diagram bars 240/250/240 px for 480k/500k/480k: one scale (0.0005 px/$). Text, notes, diagram checklist, extras
  and P6 all now say "about the same", with the correct inference "fewer leavers alone cannot repay it".
- The conclusion is no longer an artefact: it is scale-invariant. Per head per year, closing a 10% gap costs
  0.1 x 12W = 1.2W; turnover at 30% with replacement at 4 months' pay costs 0.3 x 4W = 1.2W. Any wage level W gives
  the same comparison, so the teaching and the P6 judgement do not depend on the absolute pay figure.
- Check-in 5 (diagram 5c268d90 / Q23, "one worker's effort barely moves the share price"): **clean**; the diagram
  states costs only. Stem, options, block title and intro do not state the answer.

## Noted, not rejected (debt)

- Realism: `_packet54-util.mjs:57` declares the `$` to be Hong Kong dollars, and the case is "a Hong Kong bakery
  chain" with 250 possible working days per worker (full time). Read as HK$, $2,000 a month is far below Hong Kong's
  statutory minimum wage for full-time work (roughly HK$7,000+ a month). No student-facing string names the
  currency (0 hits for HK$, HKD, US$, USD), and read as US$ the wage is realistic, so this is a plausibility debt for
  a later rewrite pass (state the currency or rescale the firm), not a reachable teaching error: by the
  scale-invariance above, no conclusion changes.

## Verdicts, round 1

| id | verdict | evidence |
|---|---|---|
| topFix-01 | confirm | both blocks present (round 0); the HR-strategies half now teaches from a wage bill that fits the accounts (`_packet54-util.mjs:145`, $4.8m inside $10m); stale $2.4m/"five times" 0 hits in served draft |
| topFix-02 | confirm | 7 on-section items with levels schemes; Source A (`_packet54-assessment.mjs:172`) now internally consistent; P6 L3 and strong answer (`:204`) use $480,000 = turnover cost, recomputed by hand |
| specGap-05 | confirm | all four strategies taught; financial-rewards para 2 (`_packet54-content.mjs:451`) and diagram 5c268d90 (`_packet54-diagrams.mjs:279-285`) compare $480k with $480k, a comparison that holds at any wage level |

## Gate (round 1)

All 30 claimed ids confirmed (structure-08 wont-fix). The packet gate may pass on verification; the HK$ wage
realism is recorded as debt.

---

## Re-verification round 2

packet-verifier, fresh context, 26 Sep. Scope: topFix-05 and specGap-07 only. The fix under test is the post-founder
"fix both Verify B defects" round (step-11 reorder; Unit 3 hub card). The rejection it answers is `verify-b.md` steps 1
and 14, not round 1 above (round 1 confirmed everything). I did not read `built.md`, `fix2-reorder-probe.mjs` or any
`*.fix2.log`. Working output: `audit/runs/packet-54/r2/`.

### Method (not the fix's)

1. `curl localhost:3001/api/sections/assessing-competitiveness?draft=1` (200, 107,045 B; dev server pid 60087, cwd this
   worktree). Content equals the snapshot once `quizIndices` is dropped; notes, diagrams and practice are equal. The
   snapshot is what gets published.
2. I reproduced Verify B's step-14 measurement with the platform grader (`lib/recall-widgets.js` `gradeReorder`, which the
   fix did not touch) on the served recall, not in a browser. The Browser pane was hidden, so taps were refused.
   Log: `r2/reorder-grade.log`.
3. I read every other place the loan/interest/gearing sequence appears: step body, notes block 3, all 4 extras chains,
   diagram SVG text, quiz explanations and mistakes. I also read the section's other reorder (consultation).
4. For specGap-07 I counted off-spec terms in the served draft, the snapshot, and the served `/business`,
   `/business/unit-3` and live section HTML.

### Findings

- **Verify B's path is closed.** Loan > interest > gearing > downturn > cover now grades 5/5. The old key
  (loan > gearing > interest) grades 3/5. That is intended: "From month one" and "Year-end accounts" now fix the order
  of those two items (`scripts/_packet54-content.mjs:287-288`), and the body para 3 (`:276`) matches it. The extras
  chain "From a large loan to financial risk" matches too (`_packet54-assessment.mjs:302-305`). No other string
  in the bundle puts gearing before interest. The consultation reorder has one defensible order.
- **A path the rejection did not name is still open.** `_packet54-content.mjs:289` "In the year that follows, a downturn
  cuts its operating profit" does not say which event the year follows. Body para 3 (`:276`) says "first add interest
  owed to the bank every month, even in a year when sales fell; then, at the year end, ... gearing pushed higher". It
  puts falling sales *before* the year-end gearing. So loan > interest > downturn > gearing > cover is defensible:
  a downturn in the loan's first year, then the year-end accounts, then cover fails. The grader gives it
  `correct 3, oneOff 2`, which is the "3 of 5 · 2 one place off" Verify B saw. The spaced showing
  (`reorderStartOrder` [3,2,0,4,1]) opens with the downturn item first, with no antecedent next to it. This is a
  reading judgement. I did not observe a student make this error. Fix: anchor the item, e.g. "In the year after
  those accounts, …".
- **specGap-07:** served draft and snapshot have 0 hits each for VRIO, core competenc*, tangible/intangible,
  distinctive capabilit*, Porter, benchmark*, competitive advantage, five forces, Bowman and Tesla. `/business/unit-3`
  serves the new card, `app/business/unit-3/page.js:129` (2 hits, 0 Porter/benchmarking). `/business` serves the new
  meta, `app/business/page.js:41`. Measured, not a defect of this fix: the live (unpublished) section page still
  carries old text (1 "Porter … stuck in the middle", 5 "benchmark"), and so do the legacy `seed/*unit3*.mjs` files,
  which no npm script runs. The live page changes only when the draft is published.

### Verdicts, round 2

| id | verdict | evidence |
|---|---|---|
| topFix-05 | REJECT | `_packet54-content.mjs:289` + body `:276`: loan>interest>downturn>gearing>cover is defensible and grades 3/5 (`r2/reorder-grade.log`) |
| specGap-07 | confirm | 0 off-spec hits in served draft/snapshot; hub card `app/business/unit-3/page.js:129` and meta `app/business/page.js:41` served clean |

### Gate (round 2)

`npm test` exit 0 (368/368), `npm run build` exit 0, `npm run validate` exit 0 (validate reads live content, not this
draft). Logs are in `r2/gate-*.log`. `ledger.mjs unverified 54`: GATE BLOCKED, 1 claimed item not confirmed
(topFix-05). The gate should not pass until the downturn item names what the year follows, and the draft is
re-staged.

---

## Re-verification round 3

packet-verifier, fresh context, 26 Sep. Scope: topFix-05 only. The fix under test landed at 15:33-15:34, outside the
fix loop. It answers the round 2 rejection above. I did not read `built.md` or any `fix3-*` file, and I did not use them
as evidence. Working output: `audit/runs/packet-54/r3/`.

### Method

1. `curl localhost:3001/api/sections/assessing-competitiveness?draft=1` returned 200 and 107,108 B (next-server pid 60088,
   cwd this worktree). I saved it as `r3/served-draft.json`. I compared it with the snapshot after sorting keys and
   dropping `quizIndices`. content, notes, diagrams and practice are equal (`r3/served-vs-snapshot.log`). mistakes are
   empty in the served draft because of the Pro gate, and that is not a difference in the content.
2. I diffed the round 2 served draft (`r2/served-draft.json`) against the new snapshot by string. The fix changed three
   strings, and nothing else in the text: body para 3 (`scripts/_packet54-content.mjs:276`), recall item 4 (`:289`) and
   its `why` (`:296`). The extras chain (`_packet54-assessment.mjs:305`) also reads "In the year after those accounts".
   It was not in the free-tier served draft for either round. The served draft has 1 of 4 chains, because of the Pro
   gate.
3. I reproduced round 2's measurement with the platform grader (`lib/recall-widgets.js` `gradeReorder` /
   `reorderStartOrder`, last committed 12:47, untouched) on the served recall. Log: `r3/reorder-grade.log`.
4. I checked whether each position is fixed by the text alone, not by the grader. I read every string in the snapshot
   that mentions a loan or borrowing together with gearing or interest: step bodies, examMatters, realExamples, notes,
   practice guidance, mistakes, diagram SVG and extras evaluation.

### Findings

- **The round 2 path is closed by the text.** The grader still gives loan > interest > downturn > gearing > cover
  `correct 3, oneOff 2`. That result is fixed by construction. What changed is that this order now contradicts the item
  text. `:289` "In the year after those accounts, a downturn …" points back to `:288` "Year-end accounts reveal …", so
  the downturn cannot come before gearing. Body `:276` now reads "then, at the year end, … gearing pushed higher; and if
  sales fell in the year after that". The old "even in a year when sales fell" is gone (0 hits in the served draft).
- **Paths the rejection did not name.** Each position is now fixed by the text:
  - The prompt (`:283`, "from signing the loan to the danger it creates") fixes the first and last items.
  - "From month one" < "Year-end" < "the year after those accounts" orders the middle three.
  - The alternative loan > interest > gearing > cover > downturn contradicts both "no longer" in `:290` and the prompt's
    "danger" at the end.
  - The old key (gearing before interest) contradicts "From month one" and "Year-end".
  - No string in the bundle puts falling sales before the year-end gearing. The gearing step's "interest is due every
    year" (`:190`) states no order.
  - Start orders are unchanged: first [2,3,1,4,0], spaced [3,2,0,4,1]. The spaced showing still opens on the downturn
    item, but "those accounts" now names its antecedent, which is on screen in the same list.
- **Debt, not a rejection.** Body para 3 (`:276`) narrates the full order on the recall's own step, so the order can be
  recovered by scrolling up. It already did this in round 2. Per `revvylearn_recall_recoverable`, that is INFO.
- I judged this by reading. I did not observe a student taking this recall, and I measured no render width.

### Verdict, round 3

| id | verdict | evidence |
|---|---|---|
| topFix-05 | confirm | `_packet54-content.mjs:289` anchors the downturn to `:288`; the prompt `:283` pins both ends; the served draft equals the snapshot; the key grades 5/5 (`r3/reorder-grade.log`) |

### Gate (round 3)

`npm test` exit 0 (368/368), `npm run build` exit 0, `npm run validate` exit 0 (0 findings; validate reads live content,
not this draft). Logs: `r3/gate-*.log`, exits in `r3/gate-exit.txt`. `ledger.mjs unverified 54`: "gate clear: every
claimed item is confirmed and no scope is left unclaimed".
