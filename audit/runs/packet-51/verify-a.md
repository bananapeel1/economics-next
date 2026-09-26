# Packet 51 — Verify A (poverty-inequality, IAL 4.3.4)

Verifier: packet-verifier (fresh context, did not read built.md). 26 Sep 2026.

## Method (different from the build's)

- Content source: fetched `curl localhost:3001/api/sections/poverty-inequality?draft=1` myself. The route
  gates to the non-premium slice (10 of 30 quiz, 2 of 32 flashcards, 0 of 7 mistakes, 1 of 4 chains), so I
  compared the served slice to `audit/snapshots/packet-51-bundle__economics__poverty-inequality.json` with
  my own key-sorted deep diff: content/notes/diagrams/practice identical; the only content differences are
  quizIndices re-indexed to served positions (bundle positions 3,7,11,14,19,22,26 = the first pin of each
  block); every served quiz/flashcard id is byte-identical in the bundle. I then read the full bundle as
  the draft. Live `data` is untouched (not published).
- Arithmetic re-derived from the stated Marenda tenths ([1.8, 2.6, 3.2, 4.0, 5.6, 6.4, 7.6, 9.4, 12.4,
  22.0]) with my own trapezoid Gini in Python, not the builder's util: Gini 0.3907 (A 0.1953, B 0.3047),
  poorer half 22.93%, top tenth 29.33%, poorest tenth 2.4%, median 6.00; richest two tenths to 16.40/37.00
  gives Gini 0.4851 with median still 6.00 and 3 of 10 below $3.60; war (-30% poorer half) leaves 4 of 10
  below $3.00. All content figures agree. Poverty gap $0.80 × 4m = $3.2m, benefit cost 6m × $0.90 = $5.4m =
  2m × $2.70; compounding 1.06^30 = 5.74, 1.02^30 = 1.81; every fillin answer recomputed and correct.
- Answer-length cue measured by reading all 30 option sets with character counts (not the validator).
- Spec coverage read against `audit/raw/econ_spec.txt:1788-1817` leaf by leaf, by reading body text.
- Check-in quiz selection read from code: `lib/checkin-placement.js:48` -> `resolvePinnedItem`
  (`components/learn-mode/utils.js:111-113`) takes the FIRST unused index of `quizIndices`; blocks' pins are
  disjoint, so each check-in shows the first pin. Diagram by `diagramId` -> `diagramMap` -> `InlineDiagram`
  (`components/LearnModeTab.jsx:602,813,867`).

## Check-in answer rule (BLOCKING)

| Check-in | Diagram | Quiz shown | Verdict |
|---|---|---|---|
| ch1 Absolute and Relative Poverty | D0 Absolute and Relative Poverty | Q3 which measure shows depth (poverty gap) | clean: D0 never names depth/gap |
| ch2 Growth, Skills, Benefits, Tax | D1 Growth and Benefits | Q7 food sales tax replacing top income tax | clean: D1 shows tax on rich funding benefit, not a spending tax |
| ch3 Structural Change, Aid, Conflict | D2 Structural Change, Aid and Conflict | Q11 structural change raises poverty when | clean: D2 says mills close, $4.00 to $2.40, never skills mismatch |
| ch4 Measuring Inequality | D3 Lorenz/Gini | Q14 which is wealth (farmland) | clean: D3 contrasts income/wealth curves, never defines wealth as assets |
| ch5 Causes of Inequality | D4 Why Wealth Concentrates | Q19 lasting gap between two countries | clean |
| ch6 Impact of Inequality | D5 Schooling and Health | Q22 why inequality raises saving | clean |
| ch7 Development, Change, Capitalism | D6 Kuznets / asset income | Q26 automation and the pay gap | clean |

CHECKIN 1 clean · CHECKIN 2 clean · CHECKIN 3 clean · CHECKIN 4 clean · CHECKIN 5 clean · CHECKIN 6 clean ·
CHECKIN 7 clean. No numeric check-in question, so the near-miss rule does not arise.

Latent (not a gate failure today): later pins in the same blocks WOULD leak if ever first — Q6 vs D0 "Median
still $6.00: relative poverty still 30%"; Q15 vs D3 checklist "Horizontal axis: cumulative % of population";
Q20 vs D4 "an asset earning a steady return that is reinvested"; Q27 vs D6 "A hypothesis: inequality rises,
then falls"; Q28 vs D6 "Some fast growers never saw the rise."; Q29 vs D6 "Profit, rent and interest go
mostly to the top". Any reorder of `quizIndices` turns these into leaks.

## Per id

- topFix-01 CONFIRMED. Every leaf the item names has body teaching: income vs wealth
  (content[3].sections[0]), headcount/gap/MPI (content[0].sections[1].body[2]), causes of poverty
  (content[1], content[2], seven subsections = the seven 1c bullets), between countries
  (content[4].sections[2]), Kuznets (content[6].sections[0]), capitalism (content[6].sections[2]). All 21
  spec leaves found in body by reading. Every quiz/practice/flashcard concept checked has a body source.
- topFix-02 CONFIRMED. content[0].sections[0].body[1] (median-based line), body[3] ("Relative poverty is
  not the same thing as inequality ... inequality rises but relative poverty does not change"), realExample
  now China/absolute vs inequality, misconception and mistakes[0] agree; no string pairs relative poverty
  with a rising Gini anywhere in the bundle (scanned every string for relative + inequal/gini/rich).
- topFix-03 REJECTED. Length cue fixed, old quiz[1] explanation gone ("primarily" 0 hits), "within a
  country" giveaway gone. But the absurd-distractor defect is rebuilt, not removed: quiz[9] (the very index
  named) now has three non-plausible distractors — "schooling lowers the wages of skilled workers", "poor
  households already have the most schooling", "training raises the absolute poverty line itself";
  quiz[29][2] "competition always drives every firm's profit to zero" is the old quiz[9] "competition ...
  profits always distributed equally" absurdity again; quiz[25] has "are recorded in a separate population
  census" and "are older on average than richer people" beside a correct option that is also the longest;
  quiz[13][1] "the poverty line is raised whenever a war ends". Needs plausible near-misses.
- topFix-04 CONFIRMED. Recalls: reorder on the Lorenz->Gini procedure content[3].sections[1].recall (5
  steps ending A/(A+B)); fillin on Gini endpoints and formula content[3].sections[2].recall (zero / one /
  0.24, recomputed); fillin on both poverty definitions content[0].sections[0].recall. Diagram hooks are
  `diagramId` pins (the current mechanism; `diagramRef` is legacy) on all 7 blocks, each id present in the
  diagrams table; Lorenz (D3) on the Lorenz chapter, Kuznets (D6) on the Kuznets chapter. Check-ins clean.
- topFix-05 CONFIRMED. $3.00/day 2021 PPP with World Bank June 2025 source at
  content[0].sections[1].body[0]; 0 hits for 2.15 / 2022 PPP / 70% / top-rate claim; practice commands and
  tariffs all in lib/ial-marking.js ECONOMICS (Define 2, Calculate 2/4, Explain 4, Analyse 6, Examine 8,
  Discuss 14, Evaluate 20); 0 hits for Outline / "Define the difference"; 8+ mark guidance is level
  descriptors with no point allocation, per DECISIONS 2026-09-17 (packet 29: KAA split banned from prose).
- accuracy-01 CONFIRMED. Every poverty-line mention is $3.00 (body, notes[0], flashcards[2], D0 SVG "Absolute
  line $3.00", D2 checklist); none says $2.15 or a PPP year other than 2021.
- accuracy-02 CONFIRMED. Same evidence as topFix-02; extras.chains[0] works the case numerically (Gini
  0.39 -> 0.49, relative still 30%), which I re-derived independently.
- quiz-01 CONFIRMED. Correct option strictly longest in 5 of 30 (q8, q13, q17, q25, q29), tied-longest in 5
  (q10, q11, q20, q22, q28): "pick the longest" expects 7.5/30 = 25%, i.e. chance. In the 10 served to a
  non-premium student it is strictly longest in 0. correctIndex spread 8/8/7/7.
- structure-01 CONFIRMED. 24 of 24 subsections carry a recall (fillin/reorder/match/classify), incl. the
  two the item names.
- structure-02 CONFIRMED. All 7 blocks carry diagramId + quizIndices + practiceIndices; placement code
  resolves them (lib/checkin-placement.js:46-52) and LearnModeTab renders InlineDiagram from diagramMap.
- structure-03 CONFIRMED. Old bank replaced; each of the 30 quiz, 10 practice and 32 flashcards reads to a
  body source (spot-checked all; e.g. q18 crossing curves -> content[3].sections[1].body[3], q24 nurses ->
  content[5].sections[3].body[2], F19 Gini limits -> content[3].sections[2].body[3]).
- structure-04 CONFIRMED. 7 blocks, 24 subsections; measures precede causes; income/wealth and Kuznets
  have their own subsections.
- structure-05 REJECTED. Lorenz/Gini misconceptions are now the real ones (axes swap, above diagonal,
  "0.4 = 40% poor") and the consequences-redistribution one is gone. But the item's own example of an
  ideological non-exam misconception is back in the same place: content[4].sections[0].misconception
  "Students explain income inequality only by effort" = the audit's "caused only by effort or talent";
  content[6].sections[2].misconception ("capitalism 'is fair because everyone can succeed'") is the same
  kind. Evaluation points restated as misconceptions also recur (content[5].sections[0] "always needed
  for incentives or always harms", content[2].sections[1] aid "always reduces poverty or never works"),
  which is the consequences-redistribution defect again.
- structure-06 CONFIRMED. No Laffer anywhere; every takeaway in all 7 blocks traces to its own body.
- structure-07 CONFIRMED. 0 hits for "top marks" / "highest marks"; the 24 examMatters end differently.
- specGap-01 CONFIRMED. content[3].sections[0] (flow vs stock, examples, Marenda shares) + classify recall.
- specGap-02 CONFIRMED. content[0].sections[1].body[2] teaches headcount, gap and MPI with worked figures.
- specGap-03 CONFIRMED. Body now teaches causes of changes in poverty — all seven spec 1c bullets
  (econ_spec.txt:1795-1801). The item's "demographic change" is not a spec bullet and is not taught; that is
  correct scope, not a gap.
- specGap-04 CONFIRMED. content[4].sections[2].body[1]: capital/infrastructure, institutions, primary
  dependence, colonial history, human capital, technology, conflict.
- specGap-05 CONFIRMED. content[6].sections[0] (Kuznets with evidence) and content[6].sections[1]
  (technology, globalisation, structural shifts).
- specGap-06 CONFIRMED. content[6].sections[2].body[1] (ownership, returns to capital vs labour,
  accumulation) with body[2] asset-income shares.
- specGap-07 CONFIRMED. Spec 2b is a closed list (Lorenz, Gini); 0 hits for "income share ratio" / "Palma",
  so no practice guidance names an untaught measure.
- specThin-01 CONFIRMED. content[2].sections[0] defines structural change and explains both directions with
  a worked Marenda case and a flow.

## Other defects seen (not ledger items)

- content[2].sections[1].misconception is ungrammatical: "large sums given to weak governments much weaker
  ones" (missing verb).
- content[4].sections[1].recall correctOrder[2] "She reinvested" breaks the present tense of its siblings.
- practice[0].guidance opening "Two marks means two separate points" names a mark tariff in the scaffold
  paragraph (practice[0] is not guided, so low impact).

## Unclaimed but relevant

None: all 23 packet-51 ids are claimed; no other-packet ledger item names this section.

## Gate

Should not pass: topFix-03 and structure-05 are rejected (both are rewrites of a few strings). Check-ins
are all clean.

---

# Re-verification round 1 (26 Sep 2026, fresh context, built.md not read)

## Method

- Fetched `localhost:3001/api/sections/poverty-inequality?draft=1` myself; its 10 quiz items are
  byte-identical to bundle items and its content equals the bundle's once `quizIndices` is ignored, so the
  staged bundle (`audit/snapshots/packet-51-bundle__...json`, worktree == index) is the draft under test.
- Diffed the round-0 served slice (`api-draft.json`, 12:39) against today's: only content and quiz changed;
  quiz items changed = Q1, Q2, Q11, Q19, Q22 of the served slice (three are check-in questions).
- Read all 30 option sets and explanations by eye, with character counts, and all 24 subsection
  misconceptions plus the mistakes table. No validator or builder probe used.

## Check-in answer rule (re-checked for the changed first pins)

- ch3: Q11 "displaced workers lack skills for the growing industries" vs D2 (bars, "mills close: one tenth
  drops from $4.00 to $2.40 in informal work") — clean, D2 never names a skills mismatch.
- ch5: Q19 "less capital and skills per worker in the poorer one" vs D4 (asset vs wage compounding) — clean.
- ch6: Q22 "richer households save a larger share" vs D5 (schooling / life expectancy by fifth) — clean.
- ch1, ch2, ch4, ch7 first pins unchanged since round 0 (clean). CHECKIN 1-7 clean.

## Per id

- structure-05 CONFIRMED. The four points of the item: (1) growth misconception is a real error and
  survives as content[1].sections[0] and mistakes[1]; (2) Lorenz/Gini now carry the real errors (bundle:769
  axes swap / above diagonal; :818 "Gini 0.4 = 40% poor"), and the axis error is also in mistakes[2];
  (3) the ideological "effort or talent" misconception is gone: :897 is now "pay differences alone, leaving
  out people with no pay", :1524 "only through differences in pay; ownership is a second source" — both
  analytical; (4) no misconception is an always/never evaluation point any more: :560 aid is "every dollar
  of aid is money handed to the poor" (tied aid, loans), :1107 enterprise vs incentives distinction. Grep of
  every string for effort/talent/"is fair"/"perfect measure"/automatically/always-never: only teaching text.
- topFix-03 REJECTED again. Fixed: length cue (strictly longest in 5/30: q8, q11, q13, q17, q29), the
  round-0 strings (old q9/q25/q13/q29 distractors), "within a country" giveaway, q1 explanation.
  Still reachable: quiz[29] is the direct successor of old quiz[9] (same "free market ... inequality" stem)
  and two of its three distractors are eliminated by the stem, not by economics of inequality:
  [2] "the state sets the wage paid in each occupation" (bundle:2226; its own explanation: "In a free
  market, wages are set by markets, not by the state") and [0] "minimum wages hold low pay above what firms
  can afford" (:2224, a non-market floor that would narrow inequality). The correct [1] is also the longest
  (57 vs 54). quiz[13][3] "prices fall as soon as the fighting stops" (:2035) argues poverty falls,
  answering the opposite of "why does poverty stay high". Source: scripts/_packet51-assessment.mjs:93,149.
  Weak but not rejected on: quiz[24][1] "leave the sending country's economy unaffected".

## Minor (not ledger items)

- quiz[29] explanation refutes only [2]; [0] and [3] are never refuted. quiz[13] leaves [0] unrefuted.
- `ledger.mjs packet 51 --open` prints 0 items although topFix-03 is `not-fixed`; it appears to list only
  status `open`.

## Gate

Should not pass: topFix-03 still rejected (three distractor strings in two items). Check-ins clean.

---

# Re-verification round 2 (26 Sep 2026, fresh context, built.md not read)

## Method

- `ledger.mjs unverified 51`: one id, C-poverty-inequality-topFix-03 (claimed after fix2).
- Read all 30 quiz items of the staged bundle (`audit/snapshots/packet-51-bundle__...json`, index == worktree)
  by eye with character counts, then compared them with the 10 pre-packet items
  (`2026-09-26-pre-packet-51__...json`) to map each named defect to its successor.
- Fetched `localhost:3001/api/sections/poverty-inequality?draft=1` myself (13:22): the 10 served items
  (bundle indices 3,7,11,14,19,22,26,0,1,2) are byte-equal to the bundle. quiz[13] and quiz[29] are
  premium-only and not served signed-out, so for them the bundle, generated by the fix2 stage run that
  reports `staged to draft ok`, is the evidence; the script source (`_packet51-assessment.mjs:92-94, 148-150`)
  agrees with it once options are shuffled.
- Walked every string in the bundle for "within a country", the round-0/1 rejected strings and the old q1
  explanation. Counted strictly-longest and strictly-shortest correct options. No builder probe or validator
  was used.

## topFix-03, part by part

1. Length cue: correct option strictly longest in 3/30 (q8 51 vs 49, q11 56 vs 55, q17 51 vs 48), tied in 6,
   strictly shortest in 4/30. Chance would be ~7.5 each way, so no cue in either direction. Correct index
   spread 8/8/7/7.
2. Absurd distractors (old q3, old q9): old q3's distractors (cut education spending, etc.) are gone; old
   q9's successor quiz[29] (bundle:2222) now offers [0] "wages are highest in the jobs most useful to
   society" (the common just-deserts misconception), [2] "goods are rationed by price rather than by need"
   (true of markets but about allocation, not distribution), [3] "taxes are levied only on income from work"
   (false but plausible). None is ruled out by "In a free market economy", and the explanation refutes all
   three. Correct [1] is 50ch against [0] 52ch. The round-1 strings ("the state sets the wage", "minimum
   wages hold low pay...") are absent from the whole bundle.
   quiz[13] (bundle:2030): "prices fall as soon as the fighting stops" is gone. [0] "the median income rises
   sharply once peace returns" is a relative-poverty near-miss (a sharply rising median would keep relative
   poverty high), and the explanation refutes its premise ("recover slowly rather than sharply"); [1] and [3]
   are refuted too. Correct [2] 57ch vs [1] 59ch.
3. "within a country" giveaway: the phrase survives only in teaching text (content[4], content[5], notes,
   practice[9], flashcards[20], diagrams[4]); no quiz stem or option contains it. The old between/within
   item is replaced by quiz[19], whose stem gives no cue.
4. quiz[1] explanation: "relative poverty exists primarily in developed countries" is absent everywhere;
   the new quiz[1] explanation is correct.

Also considered and not rejected: quiz[23][1] "equal wages remove the reward for taking risks" contradicts
the stem's "extreme inequality", but it deliberately targets the enterprise-vs-incentives confusion the
section teaches (bundle:1107 misconception; the recall sorts statements into strengthens/weakens), so it
is diagnostic, not absurd. quiz[11][1]/[3] are types of structural change that lower poverty, a legitimate
discrimination task. quiz[24][1] remains weak (noted round 1).

CONFIRMED C-poverty-inequality-topFix-03.

## Gate

All 23 packet-51 ids confirmed; `packet 51 --open` prints 0 item lines. Check-ins unchanged since round 1
(fix2 touched only quiz[13] and quiz[29], neither a first pin), so CHECKIN 1-7 remain clean. Gate may pass.
