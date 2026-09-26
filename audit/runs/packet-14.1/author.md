# Packet 14.1 — content author's account (26 Sep 2026)

Files edited: `scripts/_packet14-content.mjs` (recalls only; no teaching text changed, so every word count is
as before, max 343) and `scripts/_packet14-assessment.mjs` (quiz 11, 16, 18, 30; the eight practice guidances).
Also the "## Check-in record" section of `audit/specs/packet-14.1.md`. `_packet14-diagrams.mjs` not touched.

Gate: `node scripts/packet-14-decision-making-techniques.mjs` (dry run) exits 0 — 0 BLOCK, 0 new DEBT,
0 `recall.recoverable`, no quiz above 1.2x, collision guard clean (the other agent's diagram work), no PROBLEMS.
Recall mix now 8 fill-in, 5 classify, 2 match, 0 reorder (was 4 reorder, 5 fill-in, 2 match, 4 classify).

## Recalls (ids unchanged, one per subsection)

The principle: every recall now hands the student a case or figures the step does not print, so the answer
has to be produced, not found. The numeric fill-ins have figures that appear nowhere else in the section.

| Subsection | Old → new | What it asks now | Why it cannot be copied |
|---|---|---|---|
| Moving averages | fillin (rule words) → fillin (transfer) | A Colombo juice bar's weeks 1-4 (50, 56, 59, 65): first MA 55, next 60, plotted against week 2. Distractors 165 (the total), 57.5 (mean of four), 3 (last week) | New series; the step works 40/46/43 only |
| Scatter graphs | reorder (flow printed on the step) → classify | Six new variable pairs sorted positive / negative / none (Dubai water sales, Mumbai umbrellas, car age v price, bus fare v riders, shoe size, phone digit) | None of the pairs is on the step; the student applies the dot-pattern rule |
| Limitations of forecasting | match (unchanged) | Situations already new instances; not flagged, left as is | — |
| Simple payback | fillin (rule words) → fillin (transfer) | Karachi kiosk, $30,000, inflows 12/12/20k: 6k left, 0.3, 2.3 years. Distractors 24, 0.5 (previous year's inflow), 3 (rounded up) | New figures; the step's oven gives 2.8 |
| ARR | reorder (flow printed) → fillin (transfer) | Lahore press, $50k, $74k inflows over 4 years: profit 24k, average 6k, ARR 12%. Distractors 48 (whole-life %, the step's misconception), 18.5 (average inflow) | New figures; the flow stays on the step as teaching |
| NPV | fillin (rule words) → fillin (transfer) | Kampala roaster, $20k, 10k and 15k at 0.909/0.826: 9.09k, 12.39k, NPV 1.48k. Distractors 21.48 (total PV), 5 (undiscounted) | New figures; the step's van gives +$3,850 |
| Comparing techniques | classify (paraphrased bullets, not flagged) → classify (new instances) | Six managers' questions sorted by the technique that answers them (overdraft, loan repayment, 9% hurdle, 5% deposit, early v late cash, year-six cash) | Rewritten although not flagged: the old items paraphrased the three bullets |
| Constructing a tree | classify (node features printed) → classify (transfer) | Nairobi-Kigali route: six labels sorted into branch from the square / branch from a circle / end of a branch | New case; the student places costs, probabilities and payoffs |
| Rolling back | reorder (flow printed) → fillin (transfer) | Dhaka garment maker, expand (50k; 0.8×150k, 0.2×40k) v outsource (10k; 0.5×90k, 0.5×50k): EMV 128k, outsource net 60k, chosen net gain 78k. Distractors 70 (outsource EMV), 95 (unweighted) | New tree; the cold-brew figures are not used |
| Tree limitations | match (right halves paraphrased the bullets, not flagged) → match (case instances) | Same four limitations, each matched to a concrete case (borrowed 0.7 odds, family firm's one factory, five-year price assumption, staff morale); distractor is a correct feature, not a limitation | Rewritten although not flagged |
| Nature of CPA | fillin (rule words) → fillin (transfer) | Penang refit routes 9 / 12 / 7 days: critical path via C, 12 days, B can slip 3. Distractors D (shortest route), 9, 5 (D's slack) | New network; the rule words are no longer the answers |
| Completing the network | reorder (flow printed) → fillin (transfer) | Four-activity network: EST at node 3 = 7, float of B = 2, critical path A–C–D. Distractors 5 (lowest, not highest), 0, B–D | New network; the step's fit-out is not used |
| CPA limitations | classify (one item printed) → classify (transfer) | Karachi hospital wing: six events sorted into "the network warns about it" / "the network cannot show it" (float on painting, late steel on a zero-float task, moving electricians; crane clash, monsoon, failed inspection) | New events; the student decides which assumption each breaks |
| Contribution per unit | fillin (formula words) → fillin (transfer) | Manila phone cases, $15 price, $6 variable, 3,000 a month, $20,000 fixed: 9, 27k, 7k. Distractors 45 (revenue), 25 (revenue less fixed) | New figures; the step's cold brew gives $3.50 |
| Contribution decisions | classify (one item printed; the $55/$30 hotel item duplicated quiz 30 and the practice) → classify (all new instances) | Six offers accepted/rejected: school uniforms, bus seats, bought-in bracket; $5 v $5.40, night-shift rush order, $8 v $12 regulars | No item repeats the step, quiz 30 or the Assess |

All classify groups and match pairs carry a `why`; all fill-ins have 2-3 distractors and semantic hints that are
not prefixes. No answer contains a comma (`fillin.token`), so money is in "$ thousand".

## Practice (ids unchanged; questions not touched)

Every item now opens with a scaffold paragraph (how to start, what to separate, what to watch for) with no
figure, no mark allocation and no answer; the mark scheme follows unchanged. Checked with origin/main's
`lib/practice-checklist.js`: each item of 6 marks or fewer gives tick boxes summing to its tariff.

| Item | Scaffold says | Checklist |
|---|---|---|
| Calculate 4, moving averages | total three months, divide by three, write against the middle month; judge the trend from the averages | 4 × 1 |
| Calculate 4, payback | cumulative table first; divide what is left by that year's inflow, not the previous year's; years and months | 4 × 1 |
| Calculate 4, NPV | table year/cash/factor/PV; deal with the cost last, undiscounted; say what the sign means | 4 × 1 |
| Calculate 4, CPA float | formula first, name the node each figure comes from; check every activity for zero float | 4 × 1 |
| Explain 4, extrapolation | name the assumption, ask what is unusual about a new app's history, one chain in context | 4 × 1 |
| Analyse 6, tree limits | two different limitations, each tied to a second branch | 6 × 1 (was flagged: paragraph 1 carried marks) |
| Assess 12, hotel offer | calculation first, both sides, a conditional judgement | levels, no "(n marks)" |
| Evaluate 20, warehouse v vans | every technique, side by side, why they differ, a recommendation that names its condition | levels, no "(n marks)" |

Command words and tariffs unchanged and legal for WBS13 (Appendix 6).

## Quiz

- quiz[11] (NPV −$15,000): distractors lengthened to plausible conditional accepts ("provided its payback
  period is short enough", "only if its ARR is above the firm's target", "its cash inflows are all positive");
  key unchanged; ratio now ≤ 1.0.
- quiz[16] (square node): all four options rewritten to one shape ("a point where the manager picks one option"
  v "a point where chance decides the outcome", etc.); ratio ≤ 1.0; explanation unchanged and consistent.
- quiz[18] (Decision Trees check-in): new case, a Mombasa tea exporter: cost $75,000, 0.3 × $320,000 + 0.7 ×
  $90,000 = $159,000, net gain $84,000. Options $21,000 (high branch only), $130,000 (unweighted average less
  cost), $159,000 (EMV, cost not taken off), $84,000; correctIndex stays 3 (distribution still 8·8·9·7).
  Old id kept explicitly (`decision-making-techniques:quiz:6d3f88f0`) because the id is otherwise hashed from
  the question. The key is not near any diagram figure (nearest $100,000); the explanation names why each
  wrong figure is wrong by value, with no option letters.
- quiz[30] (Contribution check-in): key shortened to "accept, because $55 more than covers the variable cost"
  (ratio < 1.0). The old key's "$25" echoed the Contribution diagram's "$25,000" profit label; the new key has
  no figure that is on the diagram. Explanation now gives $55 − $30 = $25 a room-night, consistent with the
  Assess item's working.

## Rule 4 (siblings)

No teaching text, notes, flashcards, mistakes or extras changed, and no body figure moved: the runner's
cross-surface figure list passes. The recalls use new figures that appear nowhere else. quiz[30] and the
Assess both give $25 a room-night. The old contribution-decisions recall item ($55/$30 hotel) is gone, so
the hotel case now appears only in quiz 30, the Assess and the realExample (no figures).

## Things noticed

- The brief says `reorder.source` accepts "any flow or extras chain in the section". The implementation
  (lib/content-validator.mjs, `flows` built per subsection) accepts only a flow in the SAME subsection or an
  extras chain; a notes flow or another subsection's flow does not count. That contradicts the
  `recall.recoverable` rule text ("a reorder drawn from a flow in ANOTHER subsection — which `reorder.source`
  asks for"). No reorder was kept, so it did not bite here.
- The section now has no reorder recall. The contract does not require one; every sequence the old reorders
  asked for was printed as a flow on the same step.
- The spec's acceptance list names `lib/practice-checklist.js`; it exists on origin/main but not on this
  branch (the branch's InlinePractice.jsx has the older inline split, which fuses the scaffold onto box 1).
  Checked against main's version.
- quiz[14]'s stem is guessable by word echo ("time value of money" / "Net present value"); recorded as
  deferred under the check-in rule's point 5, not changed.

## Verify B round 1 fixes (26 Sep)

1. **practice[3] (CPA Calculate 4), blocking.** Rewritten on its own network: Sunrise Bakery production line,
   P 3 (1→2), Q 4 (1→3), R 2 (2→3), S 6 (2→4), T 3 (3→4), U 3 (4→5); ESTs 0, 3, 5, 9, 12; LFTs 0, 3, 6, 9, 12.
   Asks the float of T = 9 − 3 − 5 = 1 day; critical path P–S–U, 12 days. Floats recomputed for every activity
   (P 0, Q 2, R 1, S 0, T 1, U 0), so exactly one critical path. None of the diagram's letters, the 10-day
   length or "float 2" is the answer. Scaffold paragraph unchanged (no figures); 4 × "(1 mark)", checked with
   main's checklist. Id kept (`decision-making-techniques:practice:94e24a79`) via a new optional keptId on
   PRACTICE rows, since the id is hashed from the question. Rule 4: no card, note, mistake or quiz explanation
   used practice[3]'s figures; the body/notes fit-out example is the body's own and stays. The runner's
   cross-surface list passes ("A–B–D–F" lives in the body and the diagram, not only in practice[3]).
2. **ARR fill-in.** Now $60,000 cost, $132,000 inflows over four years: profit 72k, average 18k, ARR 30%.
   Distractors 120 (whole-life %) and 33 (average inflow). The step's percentages are 12.5, 12, 4 and 15.
3. **practice[6] (Assess 12).** It had no level bands. Added a final paragraph with the four WBS13 SAM bands
   (1–2, 3–4, 5–8, 9–12), descriptors paraphrased from audit/raw/ial-bus-levels.json (WBS13 1(d)/1(e));
   no "(n marks)", so no point allocation and no checklist. practice[7] (Evaluate 20) also has no bands; not
   asked, not changed.

Runner dry run: exit 0, no PROBLEMS.

## Verify B round 1, follow-up: practice[7] (Evaluate 20)

Added a final paragraph with the four WBS13 SAM Evaluate bands (1–4, 5–8, 9–14, 15–20), descriptors paraphrased
from audit/raw/ial-bus-levels.json (WBS13 questions 2 and 3, identical grids). No "(n marks)", so no point
allocation and no checklist; the scaffold paragraph is unchanged. Runner dry run: exit 0, no PROBLEMS.
