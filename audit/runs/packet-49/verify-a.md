# Packet 49 — Verify A (packet-verifier, fresh context), 26 Sep 2026

Scope: `node audit/scripts/ledger.mjs unverified 49` → 23 claimed ids. The other 4 of the packet's 27
(`accuracy-01`, `accuracy-02`, `specGap-05`, `specGap-06`) are already `wont-fix` and were not re-judged,
only cross-checked (below). `built.md` was not read.

## Method (different from the builder's)

The builder's own checks live in `scripts/packet-49-business-growth.mjs` (regex bans, per-item 1.5x length
rule, its own readback of the database rows). None of that was reused. Evidence here comes from:

1. Reading the whole bundle by eye, dumped with ad-hoc node one-liners from
   `audit/snapshots/packet-49-bundle__business__business-growth.json` (all 15 subsections, 25 quiz items with
   every option and explanation, 7 practice items with guidance, 5 diagrams' checklist and every SVG `<text>`,
   notes, extras, mistakes, flashcards).
2. A fresh fetch of what the app actually serves: `curl http://localhost:3001/api/sections/business-growth?draft=1`
   (signed out), deep-compared key-order-insensitively with the bundle. notes, practice, diagrams: EQUAL.
   quiz 8 / flashcards 2 / mistakes 0 / pins rewritten to one per chapter: the signed-out preview limit
   (`lib/preview-limits.js`), and every served quiz item is byte-equal to its bundle item. So the staged
   draft is the bundle.
3. Platform reading: `lib/learn-steps.js:45-83` (one teach step per subsection, check-in carries the block's
   `diagramId`/`quizIndices`/`practiceIndices`), `lib/checkin-placement.js:46-51` (pins resolved),
   `components/LearnModeTab.jsx:73-76` (all four recall types rendered), and the four recall components
   exist on `origin/main` (`git cat-file -e`).
4. Spec: `audit/raw/bus_spec.txt:1117-1142` (3.3.2), `:872` (franchising is 2.3.1 · 4b), `:1032`
   (small business is 2.3.5 · 3b). Paper shape: `audit/raw/ial-paper-structure.json`, business units_3_4.
5. Arithmetic recomputed by hand: 0.18/0.80 = 22.5%; 36−20 = 16; 6% × 24 = 1.44; 3 + 1.5 − 1.44 = 3.06;
   15 × 0.4 = 6; 36/240 = 15%; 50−35 = 15; 45−30 = 15; 5% × 20 = 1; 45−15 = 30; 20−15 = 5; 8+6 = 14.
   All correct. D4's dashed "lowest cost" line x=160 equals the polyline's max-y point (160,150).

Staged, not published: live (`?draft` absent) still serves the old 2-block section. Verdicts are on the
staged draft, the programme's convention for "verified, staged not published".

## Section as built

5 chapters x 3 subsections, each with a recall (4 match, 7 classify, 1 reorder, 3 fillin), a pinned diagram,
pinned quiz and practice. Chapters map 1:1 onto 3.3.2's four topics (Growth 1a; Organic 1b/2a/2b; M&T 3a;
risks/rewards 3a-3b; Problems 4a-4c). 0 hits in bundle AND served draft for demerg, eBay, Skype, Ansoff,
barrier, CMA, MegaRetail, "staying small", UK, £, 3.2.x, 3.1.3.

## Verdicts

| id | verdict | evidence |
|---|---|---|
| topFix-01 | CONFIRM | Economies (block 0, bundle :9-212) and diseconomies/communication/overtrading (block 4, :798-990) are now taught; every block pins its own quiz/practice (:201/:207 … :981/:988). Every one of 25 quiz items tests something a subsection teaches, at or before its pinned chapter. |
| topFix-02 | CONFIRM | No demergers subsection anywhere (0 hits, bundle and served draft); "Problems Arising From Growth" chapter exists (:798, subsections :801/:852/:925). |
| topFix-03 | CONFIRM | D2 "Horizontal, Vertical and Conglomerate Integration" (:1818) is the chain farms > mill > Tanjong Bakes > supermarkets > consumers with backward/horizontal/forward/conglomerate labels (:1830), pinned to the integration chapter (block 2 diagramId :586). Backward/forward are labels beside the target box rather than arrows from the firm; horizontal has an arrow. Mistakes[1] (:1738) now points at "the chapter's diagram". |
| topFix-04 | CONFIRM | fillin car maker/steel mill/showrooms/rival = backward/forward/horizontal (:556-557); reorder of takeover target > bid premium > control > combine > costs fall (:447-448). |
| topFix-05 | CONFIRM | Practice is 4 Calculate / 4 Explain / 8 Discuss / 12 Assess / 12 Assess + 2 x 20 Evaluate (Units 3-4 Section A + B/C, ial-paper-structure.json); "Assess the financial risks and rewards … of taking over Golden Crust" (:1559); Level 1-4 schemes on 8/12/20; no Ansoff/barriers/CMA/MegaRetail. |
| quiz-01 | CONFIRM | Internal vs external economies taught (subsections :9-212); the matching quiz item (:1260) is answerable from them. |
| quiz-02 | CONFIRM | Diseconomies taught as a concept with three causes (:801); Q20/Q22 pinned to that chapter. |
| quiz-03 | CONFIRM | Overtrading subsection (:925) teaches cause, example and avoidance. |
| quiz-04 | CONFIRM | Overtrading items (:1512, :1524) are pinned to the chapter that teaches it; both explanations refute all three distractors (e.g. recruiting ahead "pay cash out sooner"). |
| practice-01 | CONFIRM | Ansoff item gone (0 hits); replaced by on-spec items naming the firm. |
| practice-02 | CONFIRM | Barriers item gone (0 hits); 4-markers are Calculate (:1538) and Explain one disadvantage of Plan A (:1545). |
| structure-01 | CONFIRM | See topFix-01; PreTest draws only unpinned items (reservedQuestions), which are Q0-Q2, all taught in chapter 1. |
| structure-02 | CONFIRM | 15 recalls, one per subsection (lines listed under `"recall"`). |
| structure-03 | CONFIRM | 5 diagrams, one pinned per chapter; D2 is the chain. |
| structure-04 | CONFIRM | Pairing no longer exists: `lib/learn-steps.js:51-65` makes one step per subsection; the staying-small/demergers chapter is gone; each chapter's three subsections are one topic. |
| structure-05 | CONFIRM | The why-grow and what-goes-wrong logic is teaching text now (blocks 0 and 4), and practice climbs 4 > 4 > 8 > 12 > 12 > 20 > 20 by chapter pin. |
| structure-06 | CONFIRM | Block 3 takeaway: "Culture clash is one reason takeovers disappoint; overpaying is another." (:781); no demergers takeaway. |
| structure-07 | CONFIRM | No demergers misconception; the organic-growth "always safest" misconception kept; all 15 are specific errors with a correction. The staying-small one left with its off-spec subsection (SPEC-OWNERSHIP.md:30). |
| structure-08 | CONFIRM | notes has 5 entries whose titles equal the 5 chapter titles (:996, :1050, :1096, :1146, :1188). |
| specGap-01 | CONFIRM | Five named internal economies, external economies, market power, share/brand and profitability all taught (block 0). |
| specGap-02 | CONFIRM | 4a/4b/4c each have their own subsection (:801, :852, :925). |
| specGap-03 | CONFIRM | Reasons (:433): speed, power/share, synergy-type savings, capabilities, supplies/outlets, spreading risk; financial risks and rewards (:603): premium, interest and gearing, dilution, worked figures. Share-price reaction/EPS not taught; not an IAL 3.3.2 leaf. |
| specGap-04 | CONFIRM | Methods: outlets/capacity, new products, new markets, online (:270); franchising/licensing named as a method with a pointer to 2.3.1 (:284), which is where bus_spec.txt:872 puts franchising. |

## Check-in answers (CONTENT-GATE, question first)

Read every chapter's diagram (title, description, checklist, all SVG text) against its pinned quiz items,
and the signed-out preview's one-per-chapter slot (Q3, Q7, Q10, Q15, Q20).

- CHECKIN 1 Why Businesses Grow (D0 sources of economies; Q3-Q6 market power/share/brand/profit) — clean.
  D0 would print the answers to Q1 (technical) and Q2 (external), and those two are deliberately unpinned.
- CHECKIN 2 Organic Growth (D1 four routes; Q7-Q9 disadvantages/risk) — clean.
- CHECKIN 3 Mergers and Takeovers (D2 chain; Q10-Q14) — clean. Q13's key "spread risk" is not on D2.
- CHECKIN 4 Inorganic Growth: Risks and Rewards (D3 rewards/risks; Q15-Q19) — clean. D3 names "a premium",
  not the figure; no dilution on it.
- CHECKIN 5 Problems Arising From Growth (D4 cost curve; Q20-Q24) — clean. D4 names no causes.

No stem, option or chapter title states its key.

## Observations, not rejections

1. **Length tell, class-level.** The correct option is the uniquely longest in 13 of 25 items (52%, chance
   25%). In chapter 5, 4 of the 5 pinned keys are the longest (Q20, Q21, Q23, Q24). The packet's check and
   the validator's `quiz.long-correct` both use a per-item 1.5x ratio, and nothing here exceeds 1.42x, so
   both pass. That shared rule is blind to the aggregate. Pre-packet bank: 4/10. It is programme-wide:
   16 other packet bundles measure 36-64%, except `poverty-inequality` (10%) and `labour-markets` (13%),
   which shows it can be avoided. No claimed id's title covers it, so it is not a rejection here.
   It is worth a ledger item and an aggregate rule.
2. Q14 (chapter 3 check-in: "two workforces refuse to adopt one way of working") draws on integration
   difficulty that is taught in chapter 4. The item is answerable from chapter 3's reorder and "savings from
   combining", so this is not a leak or an untaught item, but it is the closest thing to a forward reference.
3. topFix-03 asked for arrows for all three directions. Only horizontal is an arrow. Backward and forward
   are labels beside the target box. The defect the ids name (no diagram) is gone.

## Unclaimed but relevant

- `accuracy-01`, `accuracy-02`, `specGap-06` (wont-fix): my own greps of the bundle and of the served draft
  find 0 demerg/eBay/Skype, which is consistent with their wont-fix notes.
- `specGap-05` (wont-fix): the reasoning checks out against bus_spec.txt. "Staying small" has 0 hits, and
  "small business" appears only at :1032 (2.3.5 · 3b). The one pointer is in the chapter 1 notes. It is not
  assessed.

## Gate

All 23 claimed ids confirmed, and every check-in is clean. On Verify A's evidence the packet gate can pass.
The length-tell observation should be recorded as programme debt, not packet-49 debt.
