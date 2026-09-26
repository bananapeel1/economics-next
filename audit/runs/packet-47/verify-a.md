# Packet 47 — Verify A (global-markets-expansion, IAL Business 4.3.2)

Verifier: packet-verifier, fresh context. Did not read `built.md`, `draft-readback.*` or the runner's own
assertions as evidence. 32 claimed ids; structure-06 is already `wont-fix` (not claimed) and I agree with
its note: `audit/raw/bus_spec.txt:1372` reads "4.3.2 Global markets and business expansion".

## Method (chosen to differ from the build's)

1. **Served draft, not files.** `curl localhost:3001/api/sections/global-markets-expansion?draft=1` and
   without `?draft=1`, deep-diffed with my own Python against
   `audit/snapshots/packet-47-bundle__business__global-markets-expansion.json`. `content`, `notes`,
   `diagrams`, `practice` are byte-equal. The only differences are free-tier gating: each block's
   `quizIndices` is remapped to one served item (served quiz[0..4] = bundle Q3/Q9/Q14/Q19/Q25, each from
   its own block), and extras are truncated. So the DB draft is the bundle, and every confirm below is about
   the **staged draft**. Live `data` still serves the old 2-block section (Market Entry Methods / Strategic
   Analysis, Bartlett-Ghoshal included) until the founder publishes; same caveat packets 44 and 46 recorded.
2. **Spec read verbatim.** `bus_spec.txt:1372-1417` (4.3.2 sub-topics 1a-d, 2a-b, 3a, 4a-j, 5a-b) against
   every subsection body, by wording.
3. **Arithmetic recomputed by hand** for every figure in body, notes, chains, quiz and practice.
4. **Diagrams rendered**, not parsed: all 7 SVG scenarios extracted and rasterised with Quick Look, then
   looked at. All five block `diagramId`s resolve to a diagram in the served draft.
5. **Tariffs checked against the SAM data** (`audit/raw/ial-paper-structure.json`, Business Units 3-4:
   4 Calculate/Construct/Explain, 8 Discuss, 12 Assess, 20 Evaluate), not against the item's own proposal.
6. **Recalls read for meaning** against CONTENT-GATE's "a chain with two defensible orders is rewritten or
   replaced", not only against the lexical recall census.
7. Re-ran `node audit/scripts/recall-census.mjs --check` myself: exit 0, this section 17 recalls, 0
   recoverable.

## Verdicts

| id | verdict | evidence |
|---|---|---|
| topFix-01 | CONFIRMED | content[] is 5 blocks = 4.3.2 sub-topics 1-5 (Conditions That Prompt Trade / Country as a Market / Production Location / Mergers, Takeovers and JVs / Expansion and Uncertainty); cost vs differentiation taught as price vs non-price competitiveness in skill-shortages body[0] |
| topFix-02 | CONFIRMED | 0 hits for Bartlett/Ghoshal/transnational/multi-domestic in draft; PESTLE is one sentence (infrastructure-stability body[3], "Unit 3 tool ... 3.3.1"), Ansoff one notes link (notes[1] link, "3.3.1 ... 4.3.3", matches bus_spec:1098/1435) |
| topFix-03 | CONFIRMED | quizIndices on all 5 blocks (3-8, 9-13, 14-18, 19-24, 25-29), practiceIndices cover 0-6 exactly once; I read all 30 MCQs and each is answerable from its block's content (Q0-2, the unpinned pre-test pool, from block 0) |
| topFix-04 | CONFIRMED | practice tariffs Explain 4 / Calculate 4 / Discuss 8 / Assess 12 x2 / Evaluate 20 x2 = SAM Units 3-4 set; every stem anchored to Lumora; "generic strateg" 0 hits; Level 1-4 guidance on every item >4 marks. Residual note: practice[2] (Discuss 8) has no "strong answer" outline, unlike [3]-[6]; its Level 2-3 descriptors carry the worked figures, so self-marking is possible |
| topFix-05 | CONFIRMED | fillin push/pull (pull-factors recall), fillin off-shoring/outsourcing (off-shoring recall), genuine-sequence reorders (PLC chronological; exchange-rate causal), 5 diagrams incl. country comparison (229d51a0) and site comparison (aa51f35f) |
| accuracy-01 | CONFIRMED | pestle-bartlett-ghoshal subsection gone; 0 Bartlett hits in served draft JSON |
| quiz-01 | CONFIRMED | push factors taught in block 0 sub push-factors body[0-3]; Q0/Q4 on them |
| quiz-02 | CONFIRMED | off-shoring vs outsourcing taught in sub off-shoring-and-outsourcing body[1]; Q2/Q6/Q8 on it |
| practice-01 | CONFIRMED | no Analyse 6 remains; replacement practice[2] is Discuss 8 anchored "on Lumora" |
| practice-02 | CONFIRMED | 20-markers [5]/[6] anchored to Lumora's sites / threats; no Porter generic strategies; guidance is Level 1-4 split by `\n` |
| structure-01 | CONFIRMED | content now teaches the same bullets the quiz/flashcards/mistakes test (all rewritten to 4.3.2) |
| structure-02 | CONFIRMED | every block sets quizIndices/practiceIndices; served draft shows the server reads them (free-tier remap per block) |
| structure-03 | **REJECTED** | zero-recall defect gone (17 recalls), but the fix adds a reorder with two defensible orders: stability-resources-and-return-on-investment recall, criterion "each figure is needed before the next one can be calculated", yet step 0 (estimate yearly profit) and step 1 (take the grant off the cost) are independent — a student who nets the grant first is marked wrong on two positions. CONTENT-GATE: such a chain "is rewritten or replaced". No alternative-order support in lib/recall-widgets.js |
| structure-04 | CONFIRMED | blocks have 4/3/3/4/3 subsections, so only one step per block is the stacked last step |
| structure-05 | CONFIRMED | 5 diagrams, each block's diagramId resolves; all 7 scenarios rendered legibly |
| structure-07 | CONFIRMED | notes[] now 5 chapters metaed "4.3.2 · 1a-1d" ... "5a-5b", definitions of the spec bullets; no entry-mode content |
| structure-08 | CONFIRMED | old franchising/FDI/Ansoff/PESTLE-filler misconceptions gone; all 16 subsection misconceptions are conceptual ("Students ..."); notes carry none, so no notes/content duplication |
| structure-09 | CONFIRMED | the named flows are gone; the only flows (exchange-rates-and-exporters body[2], skill-shortages body[2]) are causal chains with a result adding content the prose did not |
| specGap-01 | CONFIRMED | push-factors body[1-2], pull-factors body[1-3] |
| specGap-02 | **REJECTED** | distinction taught (off-shoring body[1]), but the fix introduced an arithmetic misstatement in body[2]: "saves $5.50 a cooker — about a seventh of the $34 average cost". 5.50/34 = 16.2%, about a sixth; a seventh is 14.3% (it would be a seventh of $38, not $34) |
| specGap-03 | CONFIRMED | extending-the-product-life-cycle body[0-3] |
| specGap-04 | CONFIRMED | income-and-ease body[0-2], infrastructure-stability-and-exchange-rates body[0-2]: all five factors |
| specGap-05 | CONFIRMED | costs-and-labour body[0-2], trade-bloc body[0-2], stability-resources body[0-3]: all nine factors |
| specGap-06 | CONFIRMED | reasons-to-grow-and-compete body[0-3] (4a/4b/4c/4e) and reasons-supplies body[0] (4d) |
| specGap-07 | CONFIRMED | exchange-rates-and-exporters body[0-3], exchange-rates-importers-and-profits body[0-2] |
| specGap-08 | CONFIRMED | cost competitiveness defined in off-shoring body[0]; price (cost) vs non-price (differentiation) competitiveness in skill-shortages body[0]; no generic-strategy import |
| specGap-09 | CONFIRMED | skill-shortages-and-competitiveness body[0-2] |
| specGap-10 | CONFIRMED | push-factors body[2] (competition) |
| specGap-11 | CONFIRMED | reasons-competition-law-and-shared-risk body[1] (49% cap, JV the only legal way) |
| specThin-01 | CONFIRMED | pull-factors body[1]: defined with worked profit $4.8m -> $9.2m (checked: 200,000 x ($48 - $26) = $4.4m) |
| specThin-02 | CONFIRMED | mergers-takeovers-and-joint-ventures body[1-3] defines merger, takeover and distinguishes JV |
| specThin-03 | CONFIRMED | reasons-supplies body[2] defines supply chain and distribution network |

Arithmetic checked and correct: 9,000 x 1.01^10 = 9,942; 4,000 x 1.07^10 = 7,869; $17 vs $17.40; 15% -> 20%;
13.33%; $38 -> $34; 10.53%; 200 -> 250 units / $40; $15 -> $12; $2m -> $1.6m; all 30 MCQ keys; both numeric
fill-ins (15.20, 15; 30, 20). Quiz key positions 8/8/7/7.

## Unclaimed but relevant (status not changed)

- `seed/extras-business-unit4.mjs:105` still carries a "Bartlett and Ghoshal's framework guides global
  strategy" extra under `'global-markets-expansion'` (with the old entry-mode chains). Not live, but a
  re-seed would restore the accuracy-01 defect.
- `seed/seed-business-glossary.mjs:161` still defines "Bartlett and Ghoshal model" in the Business glossary.
- Live `data` still serves the old section until publish; every confirm above is conditional on publishing
  the staged draft unchanged.

## Gate

Should not pass: 30 confirmed, 2 rejected (structure-03, specGap-02). Both fixes are one-line content edits
plus re-stage and a field-by-field draft read-back.

---

## Re-verification round 1 (26 Sep 2026, fresh context, did not read built.md or fix1-* logs as evidence)

Scope: `ledger.mjs unverified 47` returned the two ids rejected above (structure-03, specGap-02).

### Method (different from the fix's)

The fix edited `scripts/_packet47-content.mjs` and re-staged. I did not start from the script: I fetched the
**served** draft (`curl localhost:3001/api/sections/global-markets-expansion?draft=1`) and read the two
subsections there, then deep-diffed the served `content` against `tables.content` in
`audit/snapshots/packet-47-bundle__business__global-markets-expansion.json` with my own recursive Python
differ. The only differences are the free-tier `quizIndices` remap (one served item per block), the same
gating seen in round 0; `notes`, `diagrams`, `practice` byte-equal. So the staged draft is the bundle.
Arithmetic recomputed by hand from the typed inputs in `scripts/_packet47-util.mjs:129-132`, not from the
sentence. Recalls read for meaning, and every remaining reorder re-read for a second defensible order.
`node audit/scripts/recall-census.mjs --check`: exit 0, "no section is worse than the baseline".

### Verdicts

| id | verdict | evidence |
|---|---|---|
| structure-03 | CONFIRMED | The stability-resources-and-return-on-investment recall is now a `classify` (served draft): 3 groups (ease of doing business / political stability / natural resources), 2 items each, each item evidence of one factor only (permit time, one-day registration; two coups, three governments fallen; cotton within 50 km, timber shipped in). The two-order criterion string "each figure is needed" has 0 hits in the script, the bundle and the served draft. `classify` is a supported type (`lib/recall-widgets.js:22`, `components/learn-mode/ClassifyRecall.jsx`) and meets the 2-3 group / 4-8 item contract (`lib/content-validator.mjs:114`). Section recall mix: 5 fillin, 6 classify, 4 match, 2 reorder = 17. Both remaining reorders re-read: PLC (decline at home -> search -> launch -> offset) is strictly chronological; exchange-rate (appreciation -> higher foreign price -> switching -> lower volume) is strictly causal. No step in either can swap. Fill-in material the finding named is used: push/pull, off-shoring/outsourcing. |
| specGap-02 | CONFIRMED | Served draft off-shoring-and-outsourcing body[2]: "saves $5.50 a cooker — about a sixth of the $34 average cost". Inputs: 12 − 5 − 1.50 = 5.50; 5.50 / 34 = 16.2% ≈ 1/6 (1/6 = 16.7%, 1/7 = 14.3%). $34 is the right base: it is the post-export average cost the section establishes earlier (content:73, $38 at 400,000 -> $34 at 600,000). "seventh" 0 hits in the served draft; $5.50 appears nowhere else in the bundle (quiz, flashcards, mistakes, practice), so no second copy of the old ratio survives. The distinction itself is still taught in body[1] (LOCATION vs OWNERSHIP, "done both"). |

Residual (not a defect in these ids): the fraction word "sixth" is typed text beside computed figures
(`_packet47-content.mjs:98`), so a later change to `labourHome`/`avgTotal` would not update it. True today.

### Gate

`ledger.mjs unverified 47` -> "gate clear: every claimed item is confirmed". The round-0 unclaimed items
(`seed/extras-business-unit4.mjs:105` Bartlett-Ghoshal extra, `seed/seed-business-glossary.mjs:161`
glossary entry) and the publish caveat (live `data` still the old section) still stand; confirms are about
the staged draft.
