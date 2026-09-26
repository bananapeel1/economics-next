# Packet 52 — Verify A (role-state-macroeconomy, IAL 4.3.5)

Verifier: packet-verifier, fresh context, 26 Sep 2026. I did not read `built.md`. I read `brief.md`, the
ledger (`ledger.mjs unverified 52`, `show` for all 29 ids), the diff stat, and the content itself.

## Method: how this differs from the build's own checks

The build writes through `scripts/_packet52-*.mjs` into `draft`, dumps a bundle and runs the validator.
I did not trust the bundle alone, and I did not use the validator as evidence.

1. **What the database holds, not what the file says.** I fetched
   `localhost:3001/api/sections/role-state-macroeconomy?draft=1` and compared it with
   `audit/snapshots/packet-52-bundle__economics__role-state-macroeconomy.json` after sorting keys.
   `notes`, `diagrams`, `practice` are identical. `quiz` (10 of 43) and `flashcards` (2 of 37) match
   by id. `content` is identical apart from `quizIndices`, `extras` apart from length (chains 1 of 4,
   evaluation 1 of 3). Every difference is the signed-out free-tier cut: the API serves quiz items
   0–6 as `bundle.quiz[content[i].quizIndices[0]]`, all 7 ids matched. So the bundle is the staged
   draft, and I read content from it.
2. **Read everything.** I rendered all 7 blocks, 35 subsections (body, keyIdea, examMatters,
   realExample, misconception, recall), the 3-item takeaways, 7 notes, 37 flashcards, 7 mistakes,
   4 chains, 3 evaluations, 10 practice items with guidance and 43 quiz items. Then I read them.
3. **Arithmetic by hand.** I recomputed every figure: Solmara 24+84+52=160 (6/21/13/40% of 400).
   Progressive tax at $10k/$50k/$100k gives 500/9,500/24,500, which is 5/19/24.5%. The sales tax
   gives 9%/4%, and the 10→15% rise gives $450 (4.5%) and $2,000 (2%). Crowding out: 20−8=12, 40%.
   Deficit: 160−144=16 (4%). Debt: 240→256→250. Structural 16 + cyclical 12 = 28 (7%, of which 3% cyclical).
   Debt interest: 240×5%=12 (8.3% of 144) and 240×7%=16.8 (11.7%). FDI: 15%→17%. Transfer pricing: 12
   vs 1.5+1.75=3.25, loss 10.5. Laffer: 400t(1−t) gives 84 at .3/.7, 51 at .15/.85 and 100 at .5.
   Practice: $40k gives 6,500 (16.25%); $20k gives 1,500 (7.5%); $80k gives 18,500 (23.1%). Quiz[7]
   gives 30% (22.5% without transfers), quiz[12] 30%, [21] $8bn, [23] $7m→$8m, [28] $530bn, [29] $18bn.
   Recall fill-ins give $5bn, 4%, $325bn, $20bn and 12.5%. **All correct.**
4. **Check-in placement through the shipping code.** I ran `buildSteps()` from `lib/learn-steps.js`
   and then `placeChapterItems()` from `lib/checkin-placement.js` on the bundle, which is the same
   function the client imports. Result: 42 steps, 7 check-ins, every diagram placed by `pin` (none by
   title guess), and every check-in has a question and a worked example.
5. **Independent string search** over the whole bundle, all tables: NHS, council, England, UK,
   United Kingdom, Brit, £, 45%, UBI, basic income, merit good, demerit, public good, moral hazard,
   principal, poverty trap, HMRC, Bank of England, incidence, loanable, age 18 all return **0**. "below
   zero" returns 1 hit, the correct ECB statement (bundle :1657).
6. Tariffs checked against `lib/ial-marking.js:17-28` directly, not through the validator.
7. Gates run myself: `npm run recalls` exit 0 ("no section is worse than the baseline", draft 999
   recalls, same 308 recoverable as live, so the 35 new ones add none). `npm run exposure` exit 0: the
   draft's DECIDED-empty list no longer includes role-state-macroeconomy, where live has one. Validator run on the
   bundle tables for information only: 0 BLOCK, 0 DEBT.

## Check-in answers (CONTENT-GATE, blocking)

All 7 check-ins carry both a diagram and a quiz. For each one I read the diagram's title, description,
checklist, every view label and every SVG `<text>`, then all options.

- CHECKIN 1 Public Expenditure **clean**. The diagram shows a $24/84/52bn split and 6/21/13/40% of
  GDP. Q: as GDP per head rises, the spending share tends to rise. Nothing in the diagram relates
  the share to income.
- CHECKIN 2 Public Spending as a Share of GDP **clean**. The Crowding Out diagram shows AD₀→AD₁→AD₂,
  $20bn−$8bn and rates 4%→5%. Q: when is crowding out *least* likely (deep recession, idle savings)?
  The diagram never states conditions.
- CHECKIN 3 Taxes **clean**. The Laffer and tax-structure diagram shows 30%, 15%, 85%, 70%, $84bn,
  $51bn, 5/19/24.5% and 9/6/4%. Q: the marginal rate goes 20→30%, so of $500 she keeps $350. The key
  needs 70%×500, and no diagram figure is near 350. The distractor $150 = 30%×500.
- CHECKIN 4 Tax Changes and the Macroeconomy **clean**. The AD/AS tax diagram shows no FDI. Q: when
  does a corporation-tax cut attract FDI?
- CHECKIN 5 Fiscal Deficits **clean**. The deficit/debt/cycle diagram shows no generations and no
  asset lives. Q: which borrowing is fairest between generations (a railway)?
- CHECKIN 6 Macroeconomic Policies **clean**. The diagram shows *higher* rates to control inflation
  and an oil shock. Q: what did central banks do in 2008? The key is "cut rates close to zero", and
  the diagram does not state it.
- CHECKIN 7 TNCs **clean**. The transfer-pricing diagram shows H/L profit and tax. Q: a revised growth
  figure illustrates "inaccurate information". The diagram has no data-quality content.

0 leaks.

## Verdicts

Line numbers refer to `audit/snapshots/packet-52-bundle__economics__role-state-macroeconomy.json`
(= staged draft, see Method 1).

- **topFix-01 CONFIRMED.** There are now 7 blocks in spec order. 1a/1b (:9), 1c (:272-369), 2a-2c
  (:441-642, :724-895), 3a-3c (:968-1285), 4a/4b (:1356-1645) and 4c/4d/4e (:1713-1992). Public and
  merit goods: 0 hits.
- **topFix-02 CONFIRMED.** All 7 blocks carry `diagramId`, `quizIndices` and `practiceIndices`
  (:255/256/263 … :2047/2056). `placeChapterItems` resolves all 7 diagrams by pin. I read every pinned
  quiz and practice item, and each tests its own block. Tax Incidence was deliberately dropped because
  it is 1.3.4 vocabulary with 0 hits in 4.3.5. It is replaced by the AD/AS tax diagram (:3275). The
  defect, unwired blocks, cannot occur.
- **topFix-03 CONFIRMED.** Every one of the 35 subsections has a recall. The four the item asked
  for exist: the crowding-out reorder (:350), the automatic-stabiliser reorder (:1103), the flow/stock
  fill-in (:1050) and the progressive/proportional/regressive fill-in (:515). `npm run recalls` exit
  0.
- **topFix-04 CONFIRMED.** The practice set was rebuilt from scratch: Define 2, Explain 4,
  Calculate 2, Calculate 4, Analyse 6, Evaluate 20, Examine 8, Discuss 14, Evaluate 20, Evaluate 20
  (:2898-2961). Every pair is in `ECONOMICS.tariffs`. There is no Assess, Outline or 10-mark item,
  and every item above 6 marks uses Level 1-4 bands.
- **topFix-05 CONFIRMED.** UK tokens and UBI return 0 hits. Examples now include Hong Kong/Singapore
  tax (:460, :1384), Sri Lanka and Jamaica under IMF programmes (:1447) and Brazil's central bank.
  The ECB sub-zero statement is correct (:1657).
- **accuracy-01 CONFIRMED.** Public goods and merit goods are gone from every table (0 hits). Block 1
  is now 4.3.5·1a/1b (:9).
- **practice-01 CONFIRMED.** practice[0] is now "Define the term 'transfer payments'. (2 marks)"
  (:2900) with a 2-point definition in its guidance. "Define fiscal policy (4)" no longer exists.
- **structure-01 CONFIRMED.** All 43 quiz items, 10 practice items, 7 diagrams and 4 chains test
  material a subsection teaches. I checked this item by item: for example, quiz on the 2008 crisis is
  taught at :1645 and transfer pricing at :1774.
- **structure-02 CONFIRMED.** Same evidence as topFix-02.
- **structure-03 CONFIRMED.** 35 recalls (classify, match, fillin, reorder). The step build gives 42
  steps.
- **structure-04 CONFIRMED.** The blocks ramp through spending, share of GDP, taxes, tax
  macro-effects, deficits and debt, policies, then TNCs and policymakers' problems. This follows the
  spec's 1→4 order.
- **structure-05 CONFIRMED.** Policy is now a whole block (:1356). It covers the five tools
  (:1359-1360) including exchange rate and direct controls, the four aims, 2008, and a separate TNC and
  policymaker-problems block (:1713).
- **structure-06 CONFIRMED.** UBI returns 0 hits. The block-6 takeaway (:1693) is the five tools.
- **structure-07 CONFIRMED.** The mistakes table is now 7 real 4.3.5 errors, including deficit vs debt
  (:3157), VAT "proportional" and a stimulus called a stabiliser. Each subsection has its own
  misconception, and none mentions UBI.
- **structure-08 CONFIRMED.** The 7 notes titles match the new blocks and carry spec meta (:2061-). The
  37 flashcards (:2967-) contain 0 hits for demerit, moral hazard or principal, and every card's term
  is taught.
- **specGap-01 CONFIRMED** :4-44 teaches capital, current and transfer spending with figures and a
  classify recall.
- **specGap-02 CONFIRMED** :76, :144 and :197 teach the spec's own three reasons, word for word
  (changing incomes, changing age distributions, changing expectations). "Crises" appears under
  expectations.
- **specGap-03 CONFIRMED** :272, :327 and :369 teach productivity and growth, crowding out, and
  levels of taxation, the spec's three. "Living standards" and "equality" were ledger over-reach.
- **specGap-04 CONFIRMED** :491 defines all three by average rate, with a worked Solmara schedule.
- **specGap-05 CONFIRMED.** Seven subsections: incentives :540, Laffer :593, distribution :642,
  output and employment :724, price level :791, trade balance :845, FDI :895.
- **specGap-06 CONFIRMED** :1079 covers automatic stabilisers vs discretionary policy with figures.
- **specGap-07 CONFIRMED** :1026 covers deficit vs debt and :1122 covers structural vs cyclical.
- **specGap-08 CONFIRMED** :1172 covers the factors; :1231 and :1285 cover interest rates, debt
  servicing and intergenerational equity, the spec's three. Credit ratings and inflation risk were
  ledger over-reach.
- **specGap-09 CONFIRMED** :1359-1360 covers exchange-rate policy and direct controls, used across four
  aims.
- **specGap-10 CONFIRMED** :1716 covers tax avoidance, :1774 transfer pricing and the arm's-length
  principle, and :1817 the limits.
- **specGap-11 CONFIRMED** :1933 covers inaccurate information and risks and uncertainties; :1992
  covers the inability to control shocks.
- **specGap-12 CONFIRMED.** The loanable-funds diagram is gone ("loanable" returns 0). Crowding out is
  drawn on AD/AS (:327, diagram :3229).
- **specThin-01 CONFIRMED** :968 defines deficit, surplus and a balanced budget, with a % of GDP
  figure and a fill-in.
- **specThin-02 CONFIRMED** :1026 covers flow vs stock with the 240→256→250 worked path and the point
  that a falling deficit is not a falling debt.

## Caveats and unclaimed but relevant

- All of this is the **staged draft**. The live `data` row (`/api/sections/role-state-macroeconomy`
  without `?draft=1`) still serves the old two-block section until publish. The confirmations hold
  for what publish will write. Gate step 5 (restage and read back field by field) and the publish
  read-back are the checks that this is what reaches students.
- quiz[0-2] are not referenced by any block. They are on-topic (1a/1b) and feed the pre-test, and
  `exposure` is green. This is not a defect.
- **E030** (packet 12.5, open): 4.3.5 has no model answers. It is not this packet's, and the diff does
  not touch it.

Gate: Verify A passes. All 29 are confirmed and there are 0 check-in leaks.

---

# Re-verification after walkthrough fix round B1 (26 Sep, packet-verifier)

Method: I did not read built.md. I diffed the served draft before B1 (`api-draft.json`) against the served draft after it (`api-draft-fix-b1.json`) field by field. Then I checked that the staged bundle (`audit/snapshots/packet-52-bundle__…json`, index == worktree) matches the post-B1 served content. They are equal apart from quizIndices, which the API remaps and which still resolve to the same questions in all 7 chapters. I found the source lines in `scripts/_packet52-content.mjs:618,787,799,987`. I judged every new recall item by reading it against its group's stated rule and the subsection body, and not with any census or overlap tool. I checked the field shape against the grader in `lib/recall-widgets.js:239-258` (`groups[].items`, 2-3 groups, 4-8 items).

## What B1 changed (from the diff, not from a claim)
- `content[4].sections[2].recall` (automatic stabilisers): the 4-item reorder is now a classify. The groups are Automatic stabiliser (corporation tax falls, jobless draw support, sales-tax receipts drop) and Discretionary policy (port/railway programme, sales-tax rate cut, parliament raises the benefit). Each item fits exactly one rule: "follows from existing rules, nobody decides" or "needs a deliberate decision". This removes the parallel-middle-pair fault the walkthrough found at step 23.
- `content[5].sections[1]` (reducing deficits): the hiring-freeze item is replaced by "Letting the currency fall…". The group rules are now "changes a tax or a line of public spending in the budget" and "interest rates, the exchange rate or the supply side, without changing a tax or a spending line". The fiscal items are petrol subsidies (a spending line), a GST rate (a tax) and postponed ministry buildings (capital spending). The other items are low rates (monetary), a falling currency (exchange rate) and telecoms entry (supply side). Each fits exactly one rule. The body bullet on direct controls now reads "legal limits on how much state-owned firms may borrow", which no longer contradicts the Fiscal rule.
- `content[6].sections[1].recall` (transfer pricing): the reorder is now a classify, Accepted at arm's length vs Challenged. The items are copper at the quoted price, a loan at the bank rate and parts at the outside-buyer price, against ore at half the world price, a 3× management fee and a loan at 3× the market rate. The body at :1781ff names goods, services and loans, and defines the arm's-length test that decides each item. This removes the step-37 parallel pair.
- Notes, quiz, practice, diagrams, flashcards, extras and mistakes are byte-identical before and after B1.

## Ids re-checked because B1 touched them
- topFix-03 CONFIRMED (re-recorded). Three of the four recalls the audit named are still present: the crowding-out reorder at :351, the tax-structure fillin at :516 and the flow/stock fillin at :1051. The fourth, the automatic-stabiliser chain, is now a classify. This is a deliberate deviation from the literal proposal. The builder's 4-item version split the audit's single node "tax take falls, benefits rise" into two parallel items, which gave two defensible orders, and CONTENT-GATE rejects that. The classify tests the spec's own distinction, 4.3.5(c), automatic vs discretionary. The defect, a section with no recall widgets, cannot recur: 35/35 subsections carry a recall.
- structure-03 CONFIRMED (re-recorded). There are 35 recalls: classify 17, match 7, fillin 8, reorder 3. The reorders left (:351 crowding out, :771 output chain, :1681 2008 chronology) each have one order.
- specGap-06 CONFIRMED (re-recorded, :1079-1124).
- specGap-09 CONFIRMED (re-recorded). The definitions are at :1379 and :1381 and are used per aim at :1443-1444, :1497-1499 and :1611.
- specGap-10 CONFIRMED (re-recorded, :1781-1830).
- The other 24 ids are untouched by B1 because their fields are byte-identical. Their earlier verdicts stand and were not re-recorded.

## Check-in answers (question-first is live, so only a stem, option, intro or title stating the answer rejects)
B1 changed no quiz, diagram, chapter title or intro. I re-read the 7 stems and options against the chapter titles:
- CHECKIN 1 clean · CHECKIN 2 clean · CHECKIN 3 clean · CHECKIN 4 clean · CHECKIN 5 clean · CHECKIN 6 clean · CHECKIN 7 clean

## Noted, not blocking
- Practice guidance at bundle :2971 still lists "pay freezes are quick but can damage services" among the deficit tools, without naming the tool. It does not contradict any graded item.
- The B1 stabiliser classify items can be recovered from the body paragraph directly above (the INFO class). The `npm run recalls` census (gate-recalls-fix-b1.log) reports no section worse than baseline.

Unclaimed but relevant: none. `ledger.mjs packet 52 --open` shows 0 items.
Gate: all 29 ids are confirmed. B1 introduced no regression visible in the diff.
