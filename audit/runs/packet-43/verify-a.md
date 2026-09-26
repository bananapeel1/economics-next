# Verify A — packet 43 (economics__economic-growth, IAL 2.3.5)

Read-only. `audit/runs/packet-43/built.md` was NOT read, and neither were the builder's probes
(`verify-draft-db.mjs`, `verify-placement.mjs`) or the gate logs, except `gate.log`/`stage.log` for timestamps.
Started from `node audit/scripts/ledger.mjs unverified 43` (26 claimed; structure-03 and specGap-07 are
already wont-fix and were not judged) and `git diff` / `git diff --cached`. Packet 43's diff is content-only:
`scripts/_packet43-*.mjs`, `scripts/packet-43-economic-growth.mjs`, the two snapshots. No component or lib file
changed for this packet, so every platform behaviour below is pre-existing code, read directly.

## Independence — how this pass differs from the builder's checks

1. **The corpus judged is the staged bundle**, `audit/snapshots/packet-43-bundle__economics__economic-growth.json`
   (00:25:44, after the last module edit at 00:25:42). Cross-checked against
   `curl "localhost:3001/api/sections/economic-growth?draft=1"` with my own Python comparator: notes, practice and
   diagrams are byte-for-byte canonical-equal. Content, quiz, flashcards, mistakes and extras differ only
   in the signed-out projection (`isPremium: false`): the quiz is Q3, Q8, Q15, Q20, Q27, Q0, Q1, Q2, each
   identical to the bundle's; each block's `quizIndices` is rewritten to its first pin. Nothing else differs.
   **Live `data` still holds the pre-packet section**; every verdict below is on the staged draft, per the
   convention of packets 37, 40, 41 and 42.
2. **I did not rely on the runner or the gate.** I dumped every leaf to text and read all 21 subsections,
   34 quiz items, 10 practice items, 27 flashcards, 8 mistakes, the extras and the notes. Then I:
   - parsed every SVG with an XML parser and checked the geometry (PPF: point A is 78px inside PPF₁, B lies on
     PPF₁, C on PPF₂. LRAS: the second equilibrium is right of and below the first. The output-gap chart's
     plotted y-values convert back to $490bn/$500bn at Year 3, $525.3bn at Year 5 and $562.9bn/$551.9bn at
     Year 7)
   - re-derived every number in the text: 20.1m × $25,500 = $512.55bn = 2.51%, tax $98bn → $101.5bn,
     trade surplus $20bn → deficit $8bn, the Year 5 gap of +1/0/−1% under 2/2.5/3% trends, inequality shares
     9.1% → 8.0%
   - computed pairwise token-Jaccard over quiz and practice together
   - read Appendix 6 (`econ_spec.txt:2696-2747`) against every "Appendix 6" citation in the section
   - read the pin resolvers (`lib/checkin-placement.js`, `components/learn-mode/utils.js`,
     `lib/learn-steps.js`, `lib/pretest-pool.js`, `components/learn-mode/FillInRecall.jsx`,
     `lib/recall-widgets.js`) to see what a student is actually served
3. The validator ran once, directly on the staged bundle. `npm run validate` reads live `data` only, so it
   cannot see a staged section. Result: block 0 · debt 0 · 23/23 spec leaves (100%).

## Verdicts

| id | verdict | evidence |
|---|---|---|
| topFix-01 | CONFIRMED | Every block pins by `diagramId`. content[0] → `27bc75b7` (PPF plus AD scenarios, chapter 1), content[4] → `4696fc39` (output gap), content[1] → `0d0b3448`, content[3] → `caa798a1`, content[2] → `null` (decided). All resolve by id through `utils.js:130-135` from `checkin-placement.js:46`. There is no `diagramRef` anywhere in the bundle. |
| structure-01 | CONFIRMED | Same evidence. 4 of 5 check-ins resolve a diagram by id, and the PPF diagram is now pinned. |
| diagram-01 | CONFIRMED | The string `ad-as-growth` is gone. Chapter 1 pins `27bc75b7`, which exists (diagrams[0]). |
| diagram-02 | CONFIRMED | `ad-as-shifts` is gone. The causes chapter pins `0d0b3448`, which exists (diagrams[1]); it shows the LRAS₁→LRAS₂ shift, and the geometry was checked. |
| diagram-03 | CONFIRMED | `ad-as-growth-analysis` is gone along with its block. The section has 5 blocks and none of them is an AD/AS-analysis block. |
| accuracy-01 | CONFIRMED | The only uses of "along" are content[0].sections[0].body[2], the misconception, the recall why, notes[0], quiz[1] and quiz[3] options, and mistakes[0]. Each calls a movement along the frontier reallocation, and each says actual growth is inside → towards. The examMatters no longer mentions the PPF. |
| topFix-04 | CONFIRMED | The PPF fix is as above. "SRAS", "elastic", "real wage", "boom", "slump", "trough", "cycle" and "current account" each have 0 hits anywhere, SVG text included. The AS model is one Keynesian LRAS throughout (content[0].sections[1], diagram 27bc75b7, practice[9]). |
| practice-01 | CONFIRMED | practice[0] is Define, 2 marks: "potential economic growth", with 1+1 guidance. It is chapter 1's first pin, so it is what Learn Mode serves first (raw-order `practiceIndices`, `checkin-placement.js:50-51`). |
| practice-02 | CONFIRMED | Every practice item passes a check for "developing countr", "Assess" or a 10-mark tariff: 0 hits. FDI is now practice[2], "Analyse how FDI may increase potential growth (6)", which is 2.3.5 1d. It is also taught in content[1].sections[0]. |
| topFix-03 | **REJECTED** | Most of it is done: Unit-4 FDI removed, Define 2, no "Outline", and every tariff matches Appendix 6 (Define 2, Explain 4, Analyse 6, Calculate 2/4, Examine 8, Discuss 14, Evaluate 20, Draw 4). Practice is mapped by topic. **What remains:** the item asks for "levels-based KAA/evaluation descriptors", and CONTENT-GATE.md:38 says to "require level bands". practice[6] (Evaluate 20), practice[8] (Discuss 14) and practice[4] (Examine 8) state "levels-marked" and describe a strong response. None of them carries a Level 1–4 ladder: "Level" + digit has 0 hits, and practice[6] never names knowledge, application or analysis. Packets 37, 40 and 42 each shipped Level 1–4 descriptors on these tariffs, and their verifiers confirmed on that basis. |
| structure-05 | CONFIRMED | The pins are topical and raw-order: ch1 → p0/p1 (actual/potential, exports), ch2 → p2/p3 (FDI, productivity), ch3 → p4/p5 (firms, tax), ch4 → p6/p7 (growth desirable, trade deficit), ch5 → p8/p9 (positive gap, draw a negative gap). The 20-mark p6 and the 14-mark p8 are each their chapter's first pin, so both are served. |
| structure-06 | CONFIRMED | The `quizIndices` are chapter-addressed Q3–Q33, not Q0–Q5. The pre-test is `pickPretestQuestions` (`lib/pretest-pool.js:40-45`): the first 3 unreserved questions, deterministically Q0–Q2, all chapter-1 material. It is not a random 3 of a duplicate bank. Quiz-to-quiz Jaccard is at most 0.37. Residual, platform-wide rather than this section: each check-in serves one question (`utils.js:100-117`), so 29 of 34 reach Learn Mode only as fallbacks. |
| structure-02 | CONFIRMED | The AD/AS block is gone. There are 5 blocks and 1 reorder in the section (the balance-of-trade chain), so no duplicated LRAS reorder is possible. The flows don't overlap: the AD three-ranges flow is in content[0], the competition chain in content[1]. |
| topFix-05 | CONFIRMED | The block is merged away. Quiz near-duplicates are gone (max 0.37). New items cover export-led growth (q6, q7), trend (q27), firms (q18) and current vs future (q21). All four topics are taught in content (below). |
| topFix-02 | CONFIRMED | None of the six named recalls survives. The two rankings are now classify (environmental-costs, investment-and-fdi, innovation). The cyclic reorder can't occur: the trade-cycle block is gone (structure-03, wont-fix). Only one reorder exists. The named fill-ins were replaced by classify/match (actual-and-potential, AD, benefits). All 7 fill-ins carry 3 authored distractors. There is one new residual, see below. |
| structure-10 | CONFIRMED | The bank is no longer 3 words. `fillinChips` (`recall-widgets.js:179-200`) puts authored distractors in the bank, and every fill-in here has 3, giving a 6-chip bank. I checked all 21 blanks for a grammatical or type giveaway and found one: export-led blank 1, below. The other 20 have a semantically competing chip. |
| structure-04 | CONFIRMED | The step model is one subsection per teach step, with a separate check-in step carrying the diagram, quiz, practice and takeaway (`lib/learn-steps.js:62-80`). No teaching section is bundled with the end-of-chapter widgets, whatever the subsection count. |
| structure-07 | CONFIRMED | I read all 21 misconceptions. Each is a conceptual error: along vs inside the PPF, AD always raising output, money inflow ≠ FDI, bigger labour force ≠ living standards, longer hours ≠ productivity, and so on. None is exam technique; that material sits in examMatters. |
| structure-08 | CONFIRMED | All 20 takeaways are content. The costs chapter's includes "Rising incomes pull in imports, pushing the balance of trade into deficit". No "label diagrams" advice appears. |
| structure-09 | CONFIRMED | There are no cycle-phase names on any surface (0 hits, SVG text included). "sustainable" appears once, as the definition of potential output. The Q6/Q16 conflict is gone. "Keynesian long-run AS" is used identically in content, diagram and practice. |
| specGap-01 | CONFIRMED | content[0].sections[2] "International Trade and Export-Led Growth", plus the extras chain. |
| specGap-02 | CONFIRMED | content[4].sections[0] defines the trend rate and gives Loriana's years against it. |
| specGap-03 | CONFIRMED | content[2].sections[1] "Profits and Investment", including costs to firms, plus practice[4]. |
| specGap-04 | CONFIRMED | content[3].sections[0], "current and future living standards", plus diagram `caa798a1` (A/B today, frontiers ten years on). |
| specGap-05 | CONFIRMED | content[3].sections[2] "Balance of Trade Deficits", in the costs chapter. This is the spec's own wording (3a). |
| specGap-06 | CONFIRMED | content[3].sections[4] "Inflation" sits in the costs chapter. |

## New defects found (not claimed by any id; the gate owner decides what to do with them)

1. **Grammar giveaway in a new fill-in.** `export-led-growth` recall, blank 1: "…spending on Loriana's
   output as an ___." Of the six chips, only "injection" takes "an". "withdrawal" is the distractor authored
   to compete with it, and the article rules it out. This is the structure-10 class in a recall this packet wrote.
   The same recall's hint for "economies of scale" ("what falls as output grows…") describes average cost.
2. **Quiz and practice duplicate.** quiz[17] and practice[5] are the same question with the same numbers
   ($490bn → $507.4bn at 20%, answer $3.5bn; Jaccard 0.60). quiz[13] repeats practice[3] stage 1 (0.35).
3. **Longest option is the answer.** The correct option is the longest in 20 of 34 quiz items; 8.5 would be chance.
4. **Rounding.** At 1.5% growth the doubling time is 46.6 years, and the rule of 70 gives 46.7. The text and
   flashcard[14] say "about 46". Year 4 GDP of $507.4bn is 3.55% growth, while the text says 3.5%. Both are
   minor.

Every Appendix 6 citation in the section was checked against `econ_spec.txt:2696-2747` and holds: Define 2;
Explain-a-reason needs a two-stage chain; Analyse needs a chain, depth over breadth; Examine needs a brief
assessment; Calculate involves several stages. Every cross-topic reference is correct: the multiplier is
2.3.4 (:1078), Keynesian LRAS 2.3.3 (:1041), demand-pull 2.3.1 (:917), recession 2.3.1 1g (:902),
supply-side policy 2.3.6 (:1151).

## Unclaimed but relevant

None in the ledger. `ledger.mjs packet 43` lists 28 ids: 26 claimed and 2 wont-fix.

## Gate

The gate should not pass yet: topFix-03 is rejected because p4, p6 and p8 have no level bands. Adding
Level 1–4 descriptors to those three guidance texts would close it, and the export-led "an ___" blank is
worth fixing in the same restage.

---

# Verify A, re-verification round 1 (26 Sep): topFix-03 only

`built.md` was not read, and neither was the builder's fix-round probe (`probe-ladders.mjs`). `unverified 43` listed
one id, topFix-03, which round 0 rejected.

## Method (different from the fix's)

- **Corpus.** I read the DB draft through the dev server (`curl localhost:3001/api/sections/economic-growth?draft=1`),
  not the bundle file. Its `practice` is canonical-JSON equal to `packet-43-bundle` (mtime 00:45:43, after the
  00:44:58 edit to `_packet43-assessment.mjs`). The index and working tree agree for every packet-43 file
  (`git diff` shows no unstaged change to them). Live `data` still serves the old 5-item bank, so the verdict is on
  the staged draft, as with packets 37 to 42.
- **What the student sees.** I read `components/learn-mode/InlinePractice.jsx:41-43,134,166-168`. Guidance is split
  on `\n`. Guided mode shows paragraph 0 before the attempt and the rest only after "See full guidance" or "Mark my
  answer". Independent mode shows everything only on reveal. So I checked where the ladder sits by paragraph, and did
  not stop at whether the words are present.
- **The diagram clause.** I checked it against Appendix 6 as the primary text (`econ_spec.txt:2696-2747`), not
  against the builder's claim.

## Clause by clause

| clause | state in the draft |
|---|---|
| remove the Unit-4 FDI question | The pre-packet "Assess … FDI … developing countries" is gone. "developing countr", "Assess" and "Unit 4" each have 0 hits. FDI survives only as p2, Analyse 6, on potential growth (2.3.5 1d). |
| Define 4 → 2 | p0 is Define, 2 marks. |
| Outline → Explain | "Outline" has 0 hits. |
| map by topic, not sorted index | The blocks pin [0,1] [2,3] [4,5] [6,7] [8,9], each on its own topic. They resolve against RAW `practiceData` (`lib/checkin-placement.js:51`). `sortedPractice` (:32) is not used for pins. |
| levels-based descriptors | **Now present.** p4 Examine 8 has Level 1 to 3, plus "the brief assessment that lifts an answer to the top of the range". p6 Evaluate 20 has Level 1 to 4, with Level 4 as a supported judgement that questions "always". p8 Discuss 14 has Level 1 to 4, with Level 4 recognising the other viewpoint and a critical assessment on measurement. Every ladder is in paragraph 2, and paragraph 0 has 0 "Level n" hits, so no ladder shows before the attempt. None of the three has a "(n marks)" allocation (`practice.levels`, content-validator.mjs:773). "levels-marked" and "KAA" have 0 hits: DECISIONS 2026-09-17 (packet 29) bans both from student prose, so bands and not KAA labels are the settled form, as in packets 37, 40 and 42. |
| "with a required diagram" | Not bolted on, which is correct. Appendix 6 credits "diagrams where appropriate" under Analyse (:2722) and Examine (:2727) and says nothing about diagrams under Discuss (:2733) or Evaluate (:2741). NEXT.md:4936-4939 refused this exact clause for packet 28, and that refusal was confirmed. p6 still tells the student to "plan where a diagram would make one of your chains clearer" and names the PPF in Level 3, which is advice and not an invented requirement. |

Verdict: **CONFIRMED**. Every clause in the title is closed or refused on primary-text grounds, and the rejection
reason from round 0 no longer holds.

## Residuals, not claimed by any id (for the gate owner)

1. The round-0 grammar giveaway is still in the draft: export-led-growth recall, blank 1, "…output as an ___."
   Only "injection" takes "an".
2. The self-mark checklist for p4, p6 and p8 is the whole guidance as one checkbox, because
   `checklistFrom` (InlinePractice.jsx:7-17) splits only on "(n marks)". This is platform-wide and pre-existing.
3. p0 and p2 guidance say "earns nothing". That matches the packet-17/34 runner-local MARK_CLAIM pattern, and it
   also appeared in round 0. `lib/content-validator.mjs` has no such rule. This is style, not a topFix-03 defect.

`ledger.mjs unverified 43` after recording: gate clear, 0 unverified.
