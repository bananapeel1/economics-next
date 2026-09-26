# Packet 46 — Verify A (packet-verifier, read-only)

Section `economics__growth-development` (WEC14, IAL 4.3.6). 25 claimed ids. I did not read `built.md`.
Its `brief.md` was read for the spec quote only, and every spec claim below was re-grepped against
`audit/raw/econ_spec.txt` myself.

## Method (chosen to differ from the build's)

The builder's runner builds the bundle from `scripts/_packet46-*.mjs` and checks it with
`validateSection` plus its own packet checks. I did not use either as evidence. What I did instead:

1. **Served draft, not files.** `curl localhost:3001/api/sections/growth-development?draft=1` (and live),
   saved to my scratchpad. Canonical (key-sorted) deep compare against
   `audit/snapshots/packet-46-bundle__economics__growth-development.json`: `notes`, `diagrams`,
   `practice` are identical. `content` is identical except `quizIndices`, which the free payload
   re-indexes. Each served index maps back to the bundle's first pin for its chapter (bundle Q3, Q8,
   Q14, Q19, Q24, Q30, Q36). All 10 served quiz items exist verbatim in the bundle's 44, and `extras`
   differs only by free-tier truncation. So the DB draft is the bundle, and I read the bundle as the
   draft. **Every confirm below is about the staged draft.** Live (`data`) still serves the old
   3-block section until publish, which is the same caveat packet 44's Verify A recorded.
2. **I read the draft itself.** I dumped all 34 subsections (body, key idea, example, misconception,
   exam lens, recall), all 44 quiz items with keys and explanations, all 10 practice items, 43
   flashcards, 7 mistakes, extras, 7 notes and 16 diagram views (SVG text labels extracted), then
   read them in full. This is the judgement the builder's lexical checks cannot make: I checked
   that each quiz key is taught in prose before its check-in, and that no joke distractors remain.
3. **Ran the production client code on the served draft**: `lib/learn-steps.js buildSteps` +
   `lib/checkin-placement.js placeChapterItems` + `pickSpacedRecall`, on both the full bundle and the
   served free payload. This gives 41 steps (34 teach, 7 check-in) and 0 teach steps without a
   recall. Every check-in resolves a diagram **by pin** (`diagramHow = 'pin'`), a quiz item and a
   practice item, all topical to their chapter.
4. **Recomputed every number by hand**: the HDI (∛(0.8·0.6·0.591) = 0.657), the health index,
   g = s ÷ k, the savings gap ($7.2bn), the export-earnings shares, terms of trade (75), both
   dependency ratios (85, 59), debt service, aid and FDI growth, the buffer stock off the implied
   demand line both ways (400 @ $2.00, 320 @ $2.40), and every fillin answer. All of them check out.
5. **Spec grep of my own**: 0 hits in `econ_spec.txt` for Fairtrade, Dutch disease, Kuznets, green
   growth, sustainab*. "fair trade" appears only at `:2615`, an EPQ topic. Capital flight is at
   `:1921` and the foreign currency gap at `:1920`. The Lewis model is at `:1960`.
6. **Whole-bundle term grep** across every table: 0 hits for Paris, 1.5 °C, $100bn, climate, Kuznets,
   green growth, sustainab*, Dutch, Fairtrade, Washington, SAP / structural adjustment, MPI / IHDI /
   Gini, "examiner", "Wrong —", "Instead write", Outline.
7. I also ran the gates as a regression check only, not as evidence. `validateSection` on the
   bundle, run with a DB-free context: 0 BLOCK, 1 DEBT (`quant.unit`, baselined), 43 of 43 leaves,
   0 `recall.recoverable`. `npm run validate` exits 0, `npm run recalls` reports "no section worse
   than baseline", and `npm run exposure` exits 0. Its "growth-development (1) DECIDED" row is
   the LIVE old content.

## Verdicts

All line numbers are in `audit/snapshots/packet-46-bundle__economics__growth-development.json`.

| id | verdict | evidence |
|---|---|---|
| topFix-01 | CONFIRMED | Each of the 7 blocks has `diagramId`, `quizIndices` and `practiceIndices` (:251-253, 615, 926, 1140, 1447, 1789, 2132). All 7 ids resolve to a diagram, and `placeChapterItems` places each one by pin. All 34 subsections carry a recall (4 types), and the Lewis reorder is at :1807ff. The ledger names `diagramRef`, but the renderer pins by `diagramId` (`components/learn-mode/utils.js:130`), which is the current field. |
| topFix-02 | CONFIRMED | Strategies now sit in 3 blocks on the spec's taxonomy: Market-Orientated (:1154), Interventionist (:1462) and Other Strategies and International Institutions (:1804). They cover privatisation and subsidy removal (:1272), floating rates (:1322), managed rates (:1565), JVs (:1682), Lewis in its own subsection (:1807), tourism (:1872), primary industries (:1922), debt relief (:1977) and NGOs (:2077). Fairtrade is not added, correctly, because it has 0 hits in `econ_spec.txt`. |
| topFix-03 | CONFIRMED | Capital flight is taught at :545 and the foreign currency gap at :471. The Lewis turning point is taught at :1843. Dutch disease is gone from every table, which is the spec-safe path because it is not in `econ_spec.txt`. The old Q11 is removed, and all 44 current items' distractors were read: none are jokes. |
| topFix-04 | CONFIRMED | The Sustainability block is gone, and 0 hits for sustainab*/Kuznets/green growth remain. Its step is reused for constraints: blocks at :266, :631 and :940 teach every 2a/2b leaf. Environmental cost survives only as a short evaluation card pointing to 2.3.5 (:3549), which is exactly the "demote" the item asks for. |
| topFix-05 | CONFIRMED | The Paris Agreement is gone. Practice is Define 2, Calc 2, Explain 4, Calc 4, Analyse 6, Examine 8, Discuss 14 and Evaluate 20 ×3, all on Appendix 6 (:2999ff, Define 2 at :3002). There is no Outline, Assess or 10-mark item. The 8/14/20-mark guidance uses Levels. The contradiction is resolved at :26 ("Nor is development wholly waiting on growth"), with a misconception at :33 that names it. |
| accuracy-01 | CONFIRMED | The sentence is removed along with the green-growth subsection. Across all tables there are 0 hits for "Paris", "1.5°C"/"degrees", "$100bn", "196 countries" and "climate". |
| accuracy-02 | CONFIRMED | The EKC and green-growth examMatters are removed. There are 0 hits for "examiner" anywhere. Every exam lens now cites Appendix 6 or a spec bullet (e.g. :34, :69). |
| quiz-01 | CONFIRMED | The Lewis items (Q36-38, e.g. quiz:c36e9ef0 :2903, quiz:4b20e06e :2927) are taught in lewis-model (:1807-1860): surplus labour, reinvestment and the turning point. |
| quiz-02 | CONFIRMED | Q13 (quiz:bfc94a44, :2627) is keyed to "residents moving savings out". This is defined in the capital-flight subsection (:545ff), and its check-in chapter is block 1. |
| structure-01 | CONFIRMED | There are 34 of 34 recalls (10 reorder, 6 fillin, 9 classify, 9 match), and `buildSteps` shows 0 teach steps without a recall. |
| structure-02 | CONFIRMED | Every block is pinned. A placement run on the served draft gives each of the 7 check-ins its own diagram, quiz and practice, and each is topical (e.g. block 3: PPF diagram, corruption Q, Examine on corruption). No chapter is left without coverage. |
| structure-03 | CONFIRMED | I read all 44 items against the prose, and each key is taught. The pre-test pool is the first 3 unreserved items (`lib/pretest-pool.js`). Those are Q0-Q2 (HDI component, growth vs development, geometric mean), all taught in block 0 (:9-125). The five named untaught items are gone or now taught. |
| structure-04 | CONFIRMED | Steps are one subsection each (`lib/learn-steps.js:48-62`), at about 270-370 words including every field. Each step's recall sits directly below its teaching, and chapter openers ramp (e.g. growth vs development, then HDI, then limitations, then other measures). There is no `step.words` finding. |
| structure-05 | CONFIRMED | Block 1's old takeaway is replaced. I checked all 21 new takeaway bullets against their chapter bodies. Each is shown there, and debt is its own subsection (:684). |
| structure-06 | CONFIRMED | The 7 notes titles equal the 7 Learn block titles. There are 0 hits for Washington/geography/disease burden. The diagram at index 4 is "Market-Orientated Strategies at Work", matching the block title (:1154). |
| structure-07 | CONFIRMED | The green-growth filler misconception is gone, and the "Wrong — … Instead write:" template has 0 hits. The 34 misconceptions each name a specific error. They share the "Students …" opening used by every verified rebuild (packets 43/44/45: 100%), but their bodies are not templated. |
| structure-08 | CONFIRMED | Lewis has its own subsection (:1807) and Prebisch-Singer has its own (:334), each with prose, a flow and a recall. The Lewis diagram is pinned to the block 6 check-in. |
| structure-09 | CONFIRMED | Sustainability is removed. "Other strategies" and "International institutions" now have a block (:1804) with 6 subsections. The order follows spec 1, then 2a, then 2b, then 3a, 3b, and 3c/3d. |
| specGap-01 | CONFIRMED | HDI limitations are taught at :125ff, and all six spec 1c indicators at :184ff. MPI/IHDI/Gini are correctly not added because they are not in 4.3.6. |
| specGap-02 | CONFIRMED | Every 2a/2b leaf has a subsection: foreign currency gap :471, capital flight :545, demographics :634, debt :684, credit :749, infrastructure :801, education :856, corruption/governance :943, conflict :1015, migration :1080. Property rights sit inside poor governance. |
| specGap-03 | CONFIRMED | Subsidy removal and privatisation are taught at :1272 and floating rates at :1322, each in prose with a recall. |
| specGap-04 | CONFIRMED | Human capital is taught at :1465, managed rates at :1565 and JVs at :1682. |
| specGap-05 | CONFIRMED | Lewis is taught at :1807, tourism at :1872, primary industries at :1922 and debt relief at :1977. Fairtrade is off-spec and correctly not added. |
| specGap-06 | CONFIRMED | The World Bank and IMF are taught at :2027 and NGOs at :2077. The "4.3.5" parenthetical does not hold, because 4.3.5 has no institution bullet. |
| specGap-07 | CONFIRMED | The spec grep returns 0 hits for sustainab*/Kuznets/green growth, and the block is removed. |

## Unclaimed but relevant

None. The only other ledger rows mentioning this section are V056, V057 and V059, all already confirmed.
The live exposure census still shows growth-development with one chapter at DECIDED `quizIndices: []`.
That is the old published content, and publishing clears it.

## Not verified here

- The 390px walkthrough is Verify B's job.
- Real-world example facts were spot-checked from general knowledge, not a primary source. These
  include the HDI top and bottom values, Nigeria's subsidy, Egypt's float, the Maldives in 2020,
  HIPC, Debswana and Tin Council. None was implausible.
- Publish is pending. Until then a student sees the old section, and every confirm is about the
  draft.

## Gate

All 25 claimed ids are confirmed against the served draft. From Verify A's side, the packet gate can
pass once Verify B and the publish step follow.
