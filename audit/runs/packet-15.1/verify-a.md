# Packet 15.1 — Verify A (packet-verifier, 26 September 2026)

Snapshot rebuilt in memory from the three worktree modules: identical to `audit/snapshots/packet-15-bundle__economics__introductory-concepts.json` on all 8 tables. The runner dry run was refused by the permission classifier because it reads the DB. So was `npm run recalls` (also DB). Main's validator (`p151-main`, 540825f) was run on the snapshot instead, with an A/B against HEAD's modules.

## Ids
- recheck-01 CONFIRMED (static half only; no browser here). Recall fields: classify{prompt,groups[name,items,why]}, reorder{prompt,correctOrder,why[]} with no `shuffled`, match{prompt,pairs[left,right,why],distractors}, fillin{prompt,template,answers,hints,distractors}. Main's ReorderRecall.jsx:16-20 seeds its order via `reorderStartOrder` and ignores `shuffled`. recall-widgets.js reads exactly these fields. Quiz `correctIndex` is read at InlineQuiz.jsx:35. The render and 0-errors half rests on verify-b.md.
- recheck-02 CONFIRMED. All 9 guidances are 2 paragraphs, and none of the 9 openings gives a figure, a mark or an answer. Validator A/B: 9 practice.opening DEBT on HEAD, 0 on the worktree.
- recheck-03 CONFIRMED. Main's `checklistFrom` gives 4/4/2/4/4/4/6 boxes that sum to each tariff. Examine 8 and Evaluate 20 give 0 boxes.
- recheck-04 **REJECTED**. The count passes (0 recoverable on the worktree against 11 on HEAD). But the recalls were paraphrased below the lexical floor, and the answers can still be recovered by scrolling up:
  - The reorders in "Models…", "Scarcity and Opportunity Cost" and "Capital Goods and Consumer Goods" each repeat a body flow in the same subsection, one for one and in the same order.
  - In the renewables match, "Crude oil" became "A natural gas field". Both appear in the same body sentence, "fixed stock formed over geological time: crude oil, natural gas", and the right-hand side is copied from it word for word.
  - The fuel-subsidy pair is a paraphrase that sits beside the body bullet "Both agree a fuel subsidy lowers transport costs".
- recheck-05 CONFIRMED. Blocks 1-2 have `diagramId === null`, and main's checkin-placement.js:61 skips them. All 4 diagrams are pinned.
- recheck-06 CONFIRMED (see the check-in lines below).
- recheck-07 CONFIRMED. The key is the longest option in 5 of 32 items. The worst ratio is exactly 1.20 (item 17: 48/40, which 15.1 did not change). Answer positions are 8/8/8/8.
- recheck-08 CONFIRMED. No d.d.d numbering anywhere. Every leaf of 510-568 is taught, and there are no off-spec terms.
- recheck-09 CONFIRMED. Every scenario reaches 12.00px in main's enlarge sheet. The guard's 5 flags come from its estimate: CoreText widths (Arial, Helvetica and SF) end at 467.7/500 or less, and "Private & public sector" ends at 299.5 against "State ownership" at x=340. verify-b.md does not contain the real-glyph measure that NEXT.md:43 says it does.

## Check-ins (question first)
- CHECKIN ch1 The Nature of Economics: clean
- CHECKIN ch2 Positive and Normative Economics: clean (the "should" tell is the skill being tested)
- CHECKIN ch3 Scarcity, Choice and Opportunity Cost: clean
- CHECKIN ch4 Production Possibility Frontiers: clean (the answer has to be calculated, 8/10)
- CHECKIN ch5 Specialisation, Money and Financial Markets: clean; stem-guessable ("currency", and only one option says currencies), DEBT
- CHECKIN ch6 Free Market, Mixed and Command Economies: clean; stem-guessable, DEBT

## Diagram DEBT
- DEBT ch3 Scarcity diagram: clean. It says "A free good is not scarce" and names no option.
- DEBT ch4 Maraya PPF: leaks. The SVG reads "= 8 ÷ 10 = 0.8 capital goods", and the description and checklist both say 0.8.
- DEBT ch5 Money vs barter: clean. It is about money, not forward markets.
- DEBT ch6 Three systems: leaks. "Regulation" and "Welfare provision" sit under Mixed, which is the key.
- The takeaways for ch2 ("should"), ch4 and ch6 ("provides, regulates, redistributes") also state the key. DEBT.

## Outside the ids
- Step 19's financial-markets match pairs "An importer fixes the price of a currency for delivery in six months" with the forward market. Step 20's check-in asks the same question. This is not a stem leak, but the item is a near-duplicate one step earlier.
- The ch1 check-in distractor was lengthened to "Governments will not allow economists to experiment on their own citizens". Ethics is a real reason economists rarely experiment, so this is now a defensible second answer.
- The new social-science classify item "Keep a whole nation unaware its choices are being watched" (Not possible) is contestable, because administrative data is studied without anyone noticing.
- The specialisation "Risk" item "A machine takes over the only task a packer was trained for" is defensible as a benefit, since mechanisation is already a listed benefit.
- The capital-goods reorder `why[0]` still says "choice of combination", which does not match the reworded item.
- Everything else reads as correct against the spec: the PPF coordinates, the money functions, the free and economic goods, and the system descriptions.

**Gate: should not pass until recheck-04 is fixed or restated. Four or more recalls were reworded to slip under the lexical floor, not rewritten, so the answer is still printed above them.**

## Round 2 (re-staged, re-dumped bundle)

I rebuilt the bundle from the worktree modules and it matches the re-dumped snapshot on all 8 tables. Main's validator finds 0 `recall.recoverable` and 0 BLOCK.

- **recheck-01 static half: still holds.** Recall fields are unchanged (classify, reorder with no `shuffled`, match, fillin). Every reorder has one `why` line per item. Blocks 1-2 still have `diagramId: null`.
- **recheck-07: still holds.** The key is strictly the longest option in 5 of 32 items. The worst ratio is still exactly 1.20 (item 17). Positions are 8/8/8/8. The new ch1 distractor (60 characters) is longer than the key (54).
- **recheck-04: REJECTED again.** I read all 18 recalls against their own subsection's key idea, body, example, misconception and exam note.
  - I withdraw round 1's reorder objection. CONTENT-GATE.md:45 *requires* a reorder to set-match its own subsection's flow, and all three reorders are now applied to new cases (fuel study, farmer's field, canals).
  - The census count passes (0 against a baseline of 9).
  - The check's own title ("no recall answer is recoverable by scrolling up") is still false for six recalls:
    1. **Opportunity Cost Through Marginal Analysis (fill-in).** The template repeats the body line for line: the body prints "Consumer goods gained = 30 − 20 = **10**", and 8 and 0.8 are printed the same way.
    2. **Role of the State (fill-in).** The four bold body headings are the four answers, and a hint copies the body sentence "changes the rules rather than replacing the market".
    3. **Role of Financial Markets (match).** Three pairs paraphrase the body bullets: the letter of credit, shares that are never repaid, and income put aside safely for a return.
    4. **Advantages and Disadvantages (match).** Two pairs echo the "Against" bullets: "little pressure to cut costs" with "no profit or competition", and costs imposed on third parties being ignored.
    5. **Specialisation (classify).** The three Benefit items restate Dexterity, Time saved and Machinery ("Narrow tasks can be mechanised").
    6. **Free Goods (classify).** Daylight on a field, seawater, and clean air in a city echo the body's own examples.
  - These six were not changed in round 2 and were missed in round 1. Either rewrite them, or restate the check as "within the census baseline at the lexical floor" and record the six as DEBT. That choice belongs to the coordinator or the founder.
- **Rewritten recalls: one new second defensible answer.** In the renewables match, "Wind over a coastal ridge" fits "Can last indefinitely at its current rate of use". "A cocoa farm that replants as it harvests" equally fits "Using it today leaves just as much tomorrow". Swapping the two is defensible. The other rewrites are economically correct and uniquely ordered: social science, models/fuel, value judgements, the farmer, the canals, and the packer.
- **Round 1's items outside the ids:**
  1. Step 19 near-duplicate: fixed (the forward-market pair is now coffee beans, a commodity).
  2. Ch1 ethics distractor: fixed ("Economists are not trained in scientific methods of any kind").
  3. "Keep a whole nation unaware": fixed (replaced with "Rewind a decade…").
  4. Packer item: acceptable ("has no work once a machine does it").
  5. Capital-goods `why[0]`: fixed.
- New, minor: the shift recall's "An earthquake destroys a third of the ports" repeats the key of quiz item 17 word for word.

**Gate, round 2: should not pass while recheck-04 stays rejected. The renewables match also needs its ambiguity removed.**

## Round 3 (re-staged, re-dumped bundle)

The snapshot still equals the worktree modules on all 8 tables. Main's validator reports 0 `recall.recoverable` and 0 BLOCK. The recall mix is now 9 classify, 3 reorder, 5 match and 1 fill-in. The Role of the State recall changed from a fill-in to a match, and the Two Extremes recall from a match to a classify. Both keep main's field shapes, so recheck-01's static half still holds.

- **recheck-04: CONFIRMED.** I read all 18 recalls against every visible field of their own subsection.
  - The six named in round 2 are now application items, and none of their answers is printed above them:
    - the Tamar fill-in (10, 6, 0.6);
    - the state-roles match (mosquito spraying, pesticide ban, pensions, recession spending);
    - the financial-markets match (pension, mortgage, start-up sale, Lagos–Dubai payment);
    - the two-extremes classify (tannery, nail tonnage, bread and coats);
    - the Benefit items in the specialisation classify (tailor, baker, sweet wrapping);
    - the free goods classify (snow, sand, wind, charity tap water).
  - The reorders set-match their own flow as CONTENT-GATE.md:45 requires, applied to new cases.
  - Residual DEBT, not blocking: the specialisation Risk item "Repetitive work lowers motivation" paraphrases the body's "Monotony, so lower motivation" and the ch5 quiz key (Q23).
- **Renewables match:** now unique. Wind pairs only with "No amount of use today can reduce it", and the cocoa farm only with "Lasts only while harvesting keeps pace with regrowth".
- **Earthquake duplicate:** fixed ("A flood washes away a quarter of the farmland"). No recall item repeats a quiz key word for word.
  - DEBT: "A delivery van" (ch3 factors classify) anticipates Q19's key "A delivery van used by a bakery" in ch4. It is not verbatim and was not rewritten this round.
- **Economic correctness of the rewrites:** correct and unambiguous. Tamar's cost is 6 ÷ 10 = 0.6, and 1.67 is the inverted-fraction distractor. Mosquito spraying is non-excludable, so it is provision. The drug price, the pollution and the boom-and-slump are free-market weaknesses, and the nail target, the bread and coats, and the one car model are command weaknesses.
- **New wording defect (minor, cheap to fix):** "Bottled water sold at the same beach" has no antecedent now that "Seawater at a remote beach" has gone.
- **recheck-07: still holds.** The key is strictly the longest option in 5 of 32 items, the worst ratio is 1.200, and positions are 8/8/8/8.

**Gate, round 3: can pass. `ledger.mjs unverified 15.1` reports "gate clear". The "same beach" wording is worth fixing before publish, but it does not block.**

**Round 3 follow-up:** both one-line edits hold. "Bottled water sold at a beach kiosk" (Free Goods, Economic good) no longer refers back to a removed item. "A clerk stamping forms all day stops noticing errors" (Specialisation, Risk) applies the body's "Monotony … worse quality" to a new case and no longer paraphrases the Q23 key. Neither appears in the body or any quiz option, the snapshot still equals the modules, and main's validator still finds 0 recall.recoverable. recheck-04 stays CONFIRMED, and the earlier Repetitive-work DEBT is cleared.
