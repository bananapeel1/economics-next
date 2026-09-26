# Packet 48 — Verify A (packet-verifier, fresh context, 26 Sep 2026)

Not read: `audit/runs/packet-48/built.md`. Read: PROTOCOL.md, CONTENT-GATE.md (recall contract, per-section
checklist, check-in answer rule), `brief.md` (the pre-build brief), `econ_spec.txt:1485-1535` and
Appendix 6 (`:2696-2750`), the 33 ledger entries, the pre-packet snapshot, the packet bundle, and the staged
draft as served.

## What was checked, and how (methods chosen to differ from the build's)

1. **The thing verified is the staged draft, not the file.** `curl localhost:3001/api/sections/government-intervention-firms?draft=1`
   compared key-sorted, row by row (matched by id), against
   `audit/snapshots/packet-48-bundle__economics__government-intervention-firms.json` ("bundle" below).
   Every row the signed-out draft returns is identical to the bundle's: content 6/6 (only `quizIndices`
   differ, which is the route's preview remapping; each remapped index resolves to the same bundle
   question, checked by id), notes 6/6, quiz 9/9, practice 9/9, flashcards 2/2, diagrams 6/6, extras
   differ only by key order and preview truncation. Live `data` is still the pre-packet 3-block version
   (published 25 Sep); this packet stages only. Verdicts are on the staged content.
2. **Diagram geometry, parsed from the SVG primitives** (my own parser, not the builder's generator):
   for every view, each marked circle's distance to every solid curve, and every pairwise curve
   intersection; then pixel-to-value scales derived from two labelled ticks and every labelled value
   recomputed from the curve equations implied by the content's own numbers.
3. **Arithmetic re-derived from the prose**, independently of the diagrams: every worked number in the
   body, recalls, quiz, practice and extras.
4. **String census, pre vs post** (grep over both snapshots): Laffer 2→0, poverty trap 4→0, 25-mark 1→0,
   Outline 2→0, RPI 27→0, CMA 26→0, UK 12→0, Ofwat/Ofgem/Ofcom 4→0, "(10" marks 1→0, consumer
   sovereignty 1→0, dynamic efficiency 6→0. "Assess" 5 hits are all "assessment" inside Examine/Discuss
   mark schemes, not a command word.
5. **Check-in placement read from the code path that serves it** (`lib/checkin-placement.js` →
   `resolvePinnedItem` takes the first unused pinned index): check-in questions are Q3, Q7, Q11, Q15, Q19,
   Q23, for a paying student and (checked via the draft's remapped ids) a signed-out one. Pre-test
   (`lib/pretest-pool.js`: first 3 unreserved) is Q0, Q1, Q2.
6. `node audit/scripts/recall-census.mjs --section government-intervention-firms`: STAGED 28 recalls,
   0 recoverable (section has no baseline row, so it is held to zero and meets it).

### Arithmetic (all consistent)

- Natural monopoly: P = 100 − Q, MC = 20, AC = 20 + 1200/Q. MR = MC at 40 → P 60, AC 50; AC cap 60 → 40;
  MC cap 80 → AC 35, loss (35−20)×80k = $1,200k/day. CPI−X 5%−2% on $40 = $41.20. Claimed AC₂ = AC + 10:
  D meets AC₂ at Q = 40 (larger root of Q² − 70Q + 1200), cap $60, profit above normal (60−50)×40k = $400k.
- Rate of return 8% × $500m = $40m; × $600m = $48m.
- Telecoms: P = 120 − 2Q; MC 40 → Q 20, P 80; MC 32 → Q 22, P 76; P = MC → Q 44.
- Cement: linear S_home and D through the stated points; $24/52k/28k and $30/40k consistent.
- Warehouse: L = 80 − 4W, L = 4W − 16 → $12, 32k; floor $14 → 24k/40k, surplus 16k; employer tax $2 →
  $11 received, $13 paid, 28k; supply +8k → $11, 36k; demand −16k → $10, 24k.
- Monopsony: S W = 2 + L/2, MCL = 2 + L, MRP = 20 − L/2 → 12k at $8; competitive $11, 18k; floor $10 → 16k;
  MRP = 14 at 12k confirms the "above $14" sentence.
- Max wage 1,600 at $120; cap $100 → 1,200 willing, 2,000 wanted, shortage 800.
- Recalls: 6% − 4% = 2; cleaners 58 − 44 = 14, 50 − 44 = 6. Q5 4% − 1% on $50 = $51.50. P0 $40.80.

### Diagram geometry (parser output, all on-curve to < 0.1px)

- D0 Regulating a Natural Monopoly (bundle:2678): AC path falls monotonically across the whole drawn
  range (y 56 → 170.7); MR∩MC computed at (156.6,188.8), marker at (156.5,188.8); price marker on D
  at the same x; AC cap marker at the D∩AC intersection (207.9,155.6); MC cap marker at D∩MC (259.1,188.8)
  with AC marked above it and captioned as a loss needing a subsidy.
- D1 Privatisation and Competition (bundle:2703): privatisation is drawn as MC falling from $40 to $32
  with MR = MC re-solved (148,177.7); no supply curve exists in the diagram; competition is price to MC.
- D2 Barring Foreign Suppliers, D3 An Information Gap, D4 Wage Controls, D5 Taxes, Training and
  Discrimination: every marker sits on the curves it claims; D4 view "Minimum wage, one employer" draws the kinked MCL as a
  3px flat segment at $10 to L = 16, a vertical jump to MCL = 18 at L = 16, and the old MCL beyond.
- Note, not a ledger defect: D4 and D5 use a zoomed window (origin ≈ W 4, L 10 in the warehouse views;
  W 60, L 400 in the max-wage view) with no axis break. All labelled values are correct.

## Check-in answer rule (CONTENT-GATE, blocking)

```
CHECKIN 1 Controlling Monopolies and Mergers   D0 + Q3 (rate-of-return → over-invest)      clean
CHECKIN 2 Promoting Competition               D1 + Q7 (tendering → lower cost to city)    clean
CHECKIN 3 Protecting Suppliers and Employees  D2 + Q11 (nationalisation → keep jobs)      clean
CHECKIN 4 The Impact and Limits               D3 + Q15 (capture definition)               clean
CHECKIN 5 Wage Controls in Labour Markets     D4 + Q19 (elasticity → inelastic)           clean
CHECKIN 6 Taxes, Mobility and Fair Treatment  D5 + Q23 (geographical → relocation grant)  clean
```

Read title, description, checklist, every view label and every SVG `<text>` against question and all
options. None states the key. Nearest calls: CHECKIN 4 — D3 says the regulator "relies on the firm's own,
overstated figures" and names the limit "asymmetric information"; it never says the regulator acts in the
firm's interest, and it names a different limit. CHECKIN 6 — D5's retraining view lets a student rule out
the coding-course distractor, but nothing on it mentions moving or relocation. **Q18 (benchmarking →
information gap) WOULD leak against D3's checklist** ("asymmetric information, which benchmarking can
narrow"); it is index 4 of chapter 4's pins and never reaches the check-in (Q15 always resolves first, and
the signed-out payload does not carry Q18 at all). No numeric near-miss: no key is a number except Q5,
which is not a check-in question.

## Per-id verdicts

All 33 confirmed. Evidence is the bundle line plus the method above.

- topFix-01: Laffer / poverty trap / old q6 gone (census); on-spec MCQs on SLC (Q2, bundle:2080),
  predatory pricing vs abuse (Q6), performance targets (Q4); all six blocks pin diagramId + quizIndices +
  practiceIndices (bundle:381-388 … 1740-1747), and each pinned quiz/practice item is taught in its block.
- topFix-02: D0, D1, D4 per geometry above; the competitive NMW diagram is D4 view "Minimum wage, many employers".
- topFix-03: chapter 2 "Promoting Competition and Contestability" (bundle:394) teaches deregulation, tendering,
  small business/FDI, trade liberalisation; monopsony buyers at bundle:879; five-impact summary at
  bundle:1012. "Move the minimum wage to 3.3.4" is contradicted by the spec (3.3.5 2b, econ_spec:1530)
  and SPEC-OWNERSHIP row 28, so not doing it is correct.
- topFix-04: fillin CPI−X (bundle:118), reorder merger review, chronological (bundle:357), reorder
  Averch-Johnson chain (bundle:186), each with criterion and `why`.
- topFix-05: 25-mark 0, Outline 0, Define is 2 (bundle:2394), Evaluate schemes are KAA + evaluation levels
  (bundle:2390); HK Competition Commission / Competition Commission of Pakistan (bundle:264), KFTC–Google
  (bundle:284), Singapore Grab–Uber (bundle:352).
- accuracy-01: privatisation examMatters now "An Evaluate on privatisation carries 20 marks" (bundle:533).
- accuracy-02 / accuracy-03: geometry above.
- quiz-01 / quiz-03: census 0; quiz-02: occupational immobility is now taught (bundle:1607) and every
  quiz item is pinned to the block that teaches it.
- structure-01: 28 recalls, one per subsection, all four types, census 0 recoverable.
- structure-02 / -03: all six diagrams pinned one per block; the unplaceable diagram no longer exists.
- structure-04: all 27 MCQs are on 3.3.5; pre-test draws Q0-Q2, all chapter-1 content.
- structure-05: the mixed block is gone; limits sit with impacts (bundle:1009), wages in their own block.
- structure-06: blocks follow 1a-b, 1c, 1d, 1e-f, 2a-b, 2b (notes meta), impact summary present.
- structure-07: MRP glossed and the MCL mechanism explained where used (bundle:1372); ACL unused.
- structure-08: 36 flashcards, all on this section; none of the four drifting terms remain.
- specGap-01…13, specThin-01: each spec bullet has its own subsection (line numbers in the ledger evidence);
  exploitation is defined (bundle:763) and taught again in 2b (bundle:1677). specGap-07/-08 were "no gap"
  items; capture, information gaps and nationalisation remain taught (bundle:1068, 1133, 938).

## Observed, not ledger defects

- P2 guidance opens "Two marks means two separate points." CONTENT-GATE item 6 says the opening carries
  no mark allocation. The tariff is already printed in the question, so this gives nothing away, but it is
  the letter of the rule.
- Block 1 pins practice [1,2,3]; only P1 (Evaluate 20) reaches the check-in, so P2/P3 appear only on the
  Practice tab.
- Q7's distractors are weak: three of the four are the opposite of tendering.

## Unclaimed but relevant

- C-labour-markets-specGap-03, -04, -07 (packet 45, wont-fix, handed to packet 48): competitive NMW,
  maximum wages and immobility measures, and discrimination analysis are now taught here (bundle:1312,
  1549/1607, 1677). Status not changed.

## Gate

Verify A passes: 33/33 confirmed, 6/6 check-ins clean. Staged, not published: the student-facing defects
remain live until `publish-section.mjs --confirm`.
