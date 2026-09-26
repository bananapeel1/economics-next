# Packet 52 — built (role-state-macroeconomy, IAL Economics 4.3.5, WEC14)

Build phase, 26 September 2026. **The work is staged to `draft`. It is not published and not committed.**
Every "passes" below names the command that produced it. Nobody has walked this in Learn Mode or on a phone
(Verify B has not run), and I did not run `npm run build` (see "Not done").

## Documents, and the contradiction check

I read `audit/PROTOCOL.md`, `audit/SESSION-PROMPT.md`, `PROGRESS.md` row 52 ("not started"), the Settled
list in `DECISIONS.md` (the three 26 Sep entries in full), `CONTENT-GATE.md` (the recall contract, the F116
pass and the new BLOCKING check-in answer rule), `SPEC-OWNERSHIP.md`, `brief.md` and all 29 ledger items.

**`NEXT.md` has no `## Packet 52 spec` block.** I checked this with `grep -n "Packet 52" audit/NEXT.md`, which
finds only a cross-reference at :2193. Packets 41 and 43-46 had the same gap. The ledger and `brief.md`
supplied the scope instead. I found no contradiction between the documents.

One brief fact was stale. The brief read `audit/content-sections/`, which is out of date. The live section
(the t=0 snapshot below) already carried `diagramId` and `quizIndices` on both blocks, from packets 2.9 and
2.91. Chapter 1 was pinned `quizIndices: []` and `diagramId: null`. Its title was "Market Failure and the
State" and its subsections were "Public Goods" and "External Benefits and Redistribution". This does not
change any ledger item's substance, because the rebuild replaces all of it.

## What was built

`role-state-macroeconomy` was rebuilt to **4.3.5 and only 4.3.5**. I read the spec span directly:
`econ_spec.txt:1824-1893`, with sub-topics at :1828, :1840, :1853 and :1873, and 2008 at :1880. The oracle is
`spec-items.json` topic 4.3.5: 47 rows and 38 leaves, 14 of them in section 4. The runner asserts these
counts. **The runner's `validateSection` pass finds 38 of 38 leaves evidenced.** That includes 4b (2008) and
4d, which no ledger item names (brief §4.1-4.3).

| | live (`data`, unchanged) | staged (`draft`) |
|---|---|---|
| blocks / subsections | 2 / 4 | 7 / 35, in the spec's order |
| recalls | 0 | 35: 15 classify, 7 match, 8 fill-in, 5 reorder |
| quiz / practice | 12 / 5 (Define 4, Explain 6, Assess 10, Evaluate 20, Outline 4) | 43 (3 unpinned pre-test) / 10 (Define 2, Explain 4, Calculate 2, Calculate 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20 ×3) |
| diagrams | 5 (loanable funds, tax incidence among them) | 7 (15 views), one per block, pinned by `diagramId` |
| flashcards / mistakes / extras | 18 / 4 / 4 chains + 3 evaluation | 37 / 7 / 4 chains + 3 evaluation |
| validator, this section | 16 BLOCK / 35 DEBT | 0 BLOCK / 1 DEBT (`quant.unit`, baselined, carried) / 0 recoverable; 46 baselined findings would clear on publish |

The chapters are:
1. Public Expenditure (1a, 1b)
2. Public Spending as a Share of GDP (1c)
3. Taxes: Types, Incentives and Revenue (2a, 2b, 2c-1..3)
4. Tax Changes and the Macroeconomy (2c-4..7)
5. Fiscal Deficits and the National Debt (3a, 3b, 3c)
6. Macroeconomic Policies in Use (4a, 4b)
7. TNCs and the Limits of Policy (4c, 4d, 4e)

Seven is the ceiling: 3 + 7 = 10 = `FREE_QUIZ_MAX`. The spine is one invented economy, Solmara, in US
dollars, with no year except the specification's own 2008 (`scripts/_packet52-util.mjs:89`).

## Files

New files:
- `scripts/_packet52-util.mjs` — the spine at :89, the spec lists at :219-231, `BANNED_ELSEWHERE` at :237 and `POINTER_ONLY` at :255.
- `scripts/_packet52-content.mjs` — 35 subsections at :48-:1104, `BLOCK_PLAN` at :1135, `LEAF_MAP` at :1223 and `NOTES` at :1275.
- `scripts/_packet52-assessment.mjs` — `QUIZ` at :59, `PRACTICE` at :214, `FLASHCARDS` at :250, `MISTAKES` at :294 and `EXTRAS` at :339.
- `scripts/_packet52-diagrams.mjs` — `ADAS` at :98, 7 diagrams at :139-:400 and `DIAGRAMS` at :441.
- `scripts/packet-52-role-state-macroeconomy.mjs` — the runner, sections §1-§12.
- `audit/snapshots/2026-09-26-pre-packet-52__economics__role-state-macroeconomy.json` — t=0 of all 8 tables' `data`.
- `audit/snapshots/2026-09-26-pre-packet-52-draft__economics__role-state-macroeconomy.json` — t=0 `draft` columns. All were null.
- `audit/snapshots/packet-52-bundle__economics__role-state-macroeconomy.json` — the staged bundle.

No existing repository file was modified. `audit/ledger.json` changed through `ledger.mjs claim` only.

## Per ledger id: 29 claimed, 0 wont-fix

References use these short names: C = `_packet52-content.mjs`, A = `_packet52-assessment.mjs`,
D = `_packet52-diagrams.mjs`, R = the runner, U = `_packet52-util.mjs`.

| id | what changed | where |
|---|---|---|
| topFix-01 | Rebuilt as 7 spec-ordered blocks. The item suggested 3; the spec has 4 numbered points, and 35 steps fit only under 7 check-ins. Public and merit goods were removed and are banned, and the owning lines were asserted at 1.3.5 :732/:781. | C:1135; U:237; R:99, R:251, R:312-318 |
| topFix-02 | Each block pins its own `diagramId` (the current contract; `diagramRef` asserted absent), plus quiz and practice pins derived from item tags. The **"Tax Incidence" part is refused**: incidence is 1.3.4 · 4b (:713), 0 hits in 4.3.5. The live diagram and `quiz[10]` are not carried. Loanable funds was replaced by AD/AS. | R:49-58, R:219-236; D:186, D:291 |
| topFix-03 | One recall per subsection (35). Crowding-out reorder, automatic-stabiliser reorder, deficit=flow / debt=stock / surplus fill-in, and a progressive/proportional/regressive fill-in. Four reorders are sourced from extras chains. | C:200, C:599, C:569, C:288; A:339; R:484-487 |
| topFix-04 | Define is 2. The Explain is at 4. **The `Assess (10)` → "levels guidance" fix is refused**, because Assess and 10 are not IAL tariffs; the item was rebuilt at Examine 8 / Evaluate 20 instead. **"Distinguish between" is refused**: it is not in Appendix 6, and its one spec hit is QS10, which R asserts. Guidance above 6 marks uses levels. | A:214-247; R:309-310, R:383-426 |
| topFix-05 | No UK framing, UBI removed entirely (0 hits), no 20/40/45 bands, no age-18 rule and no "cannot fall below zero" (ECB negative rates stated at C:906). Added: the Hong Kong and Singapore tax structures, Sri Lanka and Jamaica under IMF programmes, Brazil's central bank cycle, and Nigeria, Japan, Thailand and others. | C:263, C:783, C:814; R:545-553 |
| accuracy-01 | The public goods / external benefits block is gone. "Merit good" is banned (0 hits) and `terms.off-spec` stays clear. | U:237-240; R:99 |
| practice-01 | "Define fiscal policy (4)" was replaced by "Define transfer payments (2)", whose guidance does not reward uses of the term. R asserts this. | A:215; R:428-430 |
| structure-01 | Every quiz term is taught in prose. R checks this with the KEY_TERMS test, and the ten topics the live bank tested untaught are asserted taught. | R:353-361 |
| structure-02 | All 7 blocks carry a diagram, quiz and practice pin. The `?draft=1` fetch serves each block's own first quiz item (`draft-readback.log`). | R:219-236 |
| structure-03 | 35 recalls, all four types. | R:433-492 |
| structure-04 | The ramp follows the spec: spending, then tax, then deficits and debt, then policy. | C:1135 |
| structure-05 | Policy is now two whole chapters. The five tools are taught at C:749, and R asserts each tool's words. | R:253-256 |
| structure-06 | UBI is gone. R refuses an off-spec takeaway. | R:514 |
| structure-07 | Misconceptions come from 4.3.5 itself: deficit vs debt, sales tax "proportional", crowding out as total, stimulus as a stabiliser. R asserts four of them. | R:516 |
| structure-08 | Notes mirror the 7 new chapters. The demerit, moral hazard and "principal" flashcards are gone, and R asserts this. | C:1275; R:533 |
| specGap-01 | Capital, current and transfer are taught. | C:48 |
| specGap-02 | The spec's three named reasons are taught under their own wording. The item's "demand for services, crises" is used only as illustration. | C:79, C:111, C:139 |
| specGap-03 | The spec's three 1c items are taught. **"Living standards" and "equality" are refused as 1c items.** Poverty and inequality are taught at 4a-4 (C:875). | C:174, C:200, C:234 |
| specGap-04 | All three structures, judged by average rate, in figures. | C:288; D:249 |
| specGap-05 | All 7 of 2c, one subsection each; output and employment, and the price level, are separate. | C:318-C:506 |
| specGap-06 | Automatic stabilisers vs discretionary policy. This packet is now the sole home (DECISIONS packet 38). | C:599 |
| specGap-07 | Deficit vs debt, and structural vs cyclical. | C:569, C:633; D:323 |
| specGap-08 | 3b factors, plus 3c's exact three (interest rates, debt servicing, intergenerational equity). **"Credit ratings" and "inflation risk" are refused** (0 hits, banned). Crowding out stays in 1c. | C:658, C:692, C:722; U:243 |
| specGap-09 | Exchange-rate policy and direct controls, with non-UK uses: Singapore MAS, India export bans, Malaysia capital controls. | C:749, C:814, C:846 |
| specGap-10 | All three 4c bullets, including tax avoidance, which the item omitted. | C:946, C:978, C:1012 |
| specGap-11 | 4e: inaccurate information and risks/uncertainties at C:1073, inability to control external shocks at C:1104. | C:1073, C:1104 |
| specGap-12 | The loanable-funds diagram is dropped and banned (0 hits). Crowding out is drawn on AD/AS with AD₀ → AD₁ → AD₂. | D:186; U:242 |
| specThin-01 | Deficits vs surpluses, taught in figures. | C:535 |
| specThin-02 | Deficit (flow) vs debt (stock). This is the same leaf as specGap-07, closed once at C:569. | C:569 |

These are not on the ledger, but I built them because the oracle has them: 4b (2008) at C:906 and 4d (local,
national and global) at C:1043.

## Scope decisions made here, not on the ledger

- The live `diagrams[4]` "Tax Incidence" and `quiz[10]` (incidence) are **removed, not moved**. 1.3.4 was already rebuilt (packet 24), which is the packet-21 precedent.
- Neighbours are pointer-only within a counted budget, and each pointer must cite its owner (U:255):
  - 2.3.6: instruments and QE
  - 4.3.3: exchange rate systems
  - 4.3.4: poverty and inequality measures
  - 4.3.2: tariffs
  - 2.3.4: the multiplier
  - 3.3.5: the minimum wage
- I did not add a `SPEC-OWNERSHIP.md` row. No topic was reassigned; incidence and public goods already sit with their owners.

## Checks run (command → result)

- `node scripts/packet-52-role-state-macroeconomy.mjs --dump --stage` → all packet checks pass; 0 new BLOCK and 0 new DEBT; all 8 tables staged (`stage.log`). The diagram geometry guards were A/B'd inside the runner.
- `audit/runs/packet-52/draft-readback.mjs` → every table's `draft` equals the bundle, and every `data` equals the t=0 snapshot, so live is untouched. The served `?draft=1` content matches the bundle subsection by subsection (0 differ). Served quiz, practice and diagrams are identical by id. Each block's first served quiz is its own. Log: `draft-readback.log`.
- `npm run validate` exit 0 · `npm run recalls` exit 0 · `npm run exposure` exit 0. For exposure, the draft has 0 starved or undecided chapters for this section; the live section's decided-empty chapter 1 disappears.
- `node audit/scripts/check-staged-drafts.mjs role-state-macroeconomy` exit 0.
- **`npm test`: 339 pass, 3 fail (`gate-test.log`).** The three failures are `lib/mid-band-answer.test.mjs:113`, `lib/practice-shell.test.mjs:30` and `lib/spec-coverage.test.mjs:207`. All three assert on Economics 1.3.5 (market-failure) model answers in `data/modelAnswersData.js` and `content/data-response/econ-u1-market-failure.md`. Both files carry another session's unstaged edits (`git status`). None of the tests reads a `_packet52` file or this section. I attributed them by reading the assertions; I did not A/B them against HEAD.
- `render-diagrams.mjs` → `diagrams-grid.png`. I looked at all 15 views by eye, then widened the crowding-out and Laffer spacing and re-checked them.
- `ledger.mjs claim 52 …` → 29 claimed (`ledger-after-claim.txt`).

## Not done / not verified

- I did not run `npm run build`. No `app/` or `lib/` file was changed.
- Verify A, Verify B, Layer 6 and the F116 human pass have not run. The check-in answer rule was self-checked by me for all 7 check-ins, and I found each clean. Each check-in quiz asks about something its diagram does not show. That self-check is the builder's, not the independent reader's that the rule requires.
- Real-world examples were checked from memory, not against sources. Each is dateless, and some may be imprecise; examples include Sri Lanka's VAT, Jamaica's debt ratio, Pakistan's and Egypt's interest share, and Nigeria's GDP rebasing.
- `?draft=1` serves Notes only after publication, so the Notes tab has not been seen served.
- Rule 3 is not checked: whether origin/main can read every field. It matters only at publish. The bundle uses the same field shapes as packet 46, which is already published.
- `practiceIndices` put an Evaluate 20 second in chapters 4 and 6. Packet 45 found that only the first practice pin reaches Learn Mode, so those two Evaluates appear on the practice page only. The chapter 7 Evaluate is first.
- Publish is the founder's step: `node scripts/publish-section.mjs role-state-macroeconomy` to diff, then `node scripts/publish-section.mjs role-state-macroeconomy --confirm`. The usage is at `scripts/publish-section.mjs:5-6`.

## Fix round B1 — the three recalls Verify B flagged (26 September 2026)

Source: `verify-b.md` steps 18, 23 and 27. All three are content faults, fixed in the modules, re-staged to `draft`,
and re-walked by real taps. **Still not published and not committed.**

### What changed

| Walkthrough step | Was | Now | Rule applied |
|---|---|---|---|
| 23 (step-23 recall, `automatic-stabilisers-and-discretionary-policy`) | a 4-item reorder whose items 2 and 3 ("treasury collects less", "jobless draw support") are parallel effects of item 1, so two orders were defensible | a **classify**: Automatic stabiliser (3) vs Discretionary policy (3). It tests the 3a-2 leaf's own distinction: the decision. It includes "Parliament votes to raise the weekly unemployment benefit" against "More newly jobless workers start drawing unemployment support", which is the section's own misconception | CONTENT-GATE Layer 1a rule 2: where a second reading survives, the item "becomes a different exercise type … rather than being reworded". This also satisfies the recall contract's "rewritten or replaced" |
| 30 (`reducing-fiscal-deficits-and-debt`) | "A freeze on hiring across the civil service" was sorted under Another tool, although it cuts public spending and so met the Fiscal rule as written | replaced by "Letting the currency fall so exports become cheaper and growth picks up" (exchange-rate policy). Both `why` lines are rewritten to state the membership rule exactly: Fiscal is "a tax or a line of public spending in the budget", and Another tool is "interest rates, the exchange rate or the supply side, without changing a tax or a spending line" | one group per item |
| 37 (`regulation-of-transfer-pricing`) | a reorder whose middle pair ("little profit left in H", "large profit in L") are simultaneous results of the transfer price | a **classify**: "Accepted: at arm's length" (3) vs "Challenged: not at arm's length" (3), priced goods, loans and fees. It tests the 4c-2 leaf (the regulation) and the section's misconception that any trade between subsidiaries is avoidance | Layer 1a rule 2, as above |

Rule 4, other fields of the same entries and their twins:
- **Step-30 body bullet fixed.** It read "Direct controls — freezes on public sector pay or hiring …". That is the same ambiguity as the recall item, and it disagreed with the section's own definition at the five-tools step ("rules that set outcomes directly instead of working through prices"). It now reads "rules that cap an outcome instead of changing the budget, such as legal limits on how much state-owned firms may borrow".
- **Extras chain "Automatic stabilisers in a recession" (`_packet52-assessment.mjs`) fixed.** It showed the same parallel pair as two sequential steps. The two are merged into one step ("… receipts fall by $16bn and, at the same time, claims … rise by $12bn"), so the chain now has 4 steps and the same figures.
- **Read and left unchanged:** the key idea, body, real example, misconception and exam note of all three subsections; notes chapters 5, 6 and 7 (the definitions of automatic stabilisers, direct controls and transfer price agree with the new recalls); quiz items B5 "Which of these is an automatic stabiliser?" and "widen a deficit with no new decision", B6 "direct control", and B7 transfer pricing and arm's length; flashcards; and mistakes. None of them conflicts with the new recalls. The transfer-pricing extras chain lists H and then L in a chain titled "in figures". I left it as a calculation order, because it is not graded and does not claim that L's profit is caused by H's.
- A first draft of the step-37 item "Copper sold to its own trading arm at the world market price" was flagged `recall.recoverable` (0.75) by the runner against the body's "If the trading arm pays the market price". I reworded it to "A mine invoices its sister sales company for copper at the day's quoted metal price", and the runner then reported 0 recoverable.

Recalls now: 35 in total, made up of 17 classify, 7 match, 8 fill-in and 3 reorder. All four types are still present.

**Ledger claim changed in part:** topFix-03 asked for an "automatic-stabiliser reorder". It is now a classify, for the reason above. The topFix-03 row in the table above ("automatic-stabiliser reorder") is therefore stale for that one recall. The crowding-out reorder, the flow/stock fill-in and the tax-structure fill-in are unchanged. The runner's topFix-03 assertion now requires the automatic-vs-discretionary classify. I did not touch `audit/ledger.json`.

### Runner guards added (`scripts/packet-52-role-state-macroeconomy.mjs`, §8)

There are three guards. The first requires the stabiliser recall to be the Automatic stabiliser / Discretionary policy classify. The second fires if a hiring freeze or pay freeze is sorted outside Fiscal policy in the step-30 classify. The third fires if the transfer-pricing recall is a reorder again. **A/B:** I ran a copy of the new runner, with imports rewritten, against the pre-fix `_packet52-content.mjs` taken from the index (`git show :scripts/…`, in scratchpad). All three guards fired. Against the fixed modules, all three passed.

### Checks run (command → result)

- `node scripts/packet-52-role-state-macroeconomy.mjs --dump --stage` → all packet checks pass. The runner reported 0 new BLOCK / 0 new DEBT, 0 recoverable, and all 8 tables staged (`stage-fix-b1.log`). The bundle was rewritten.
- Dev server: I stopped pid 37357 on :3001, ran `rm -rf .next/cache`, and started a new `remediation-dev` (preview_start). Other sessions share :3001, so their pages were interrupted by this restart.
- `curl localhost:3001/api/sections/role-state-macroeconomy?draft=1` → `api-draft-fix-b1.json`. I compared it with the bundle by a separate node script: all 35 subsections are identical field by field, and so are notes, practice and diagrams. The signed-out quiz slice (10), flashcards (2), extras chain 1 and evaluation 1 match the bundle by id. Pro-gated rows (mistakes, extras chains 2-4) are not served signed out, so the curl comparison does not cover them.
- `node audit/runs/packet-52/draft-readback.mjs` (DB read) → all 8 tables have `draft == bundle` and `data == t=0 snapshot`, so live is untouched. This is the only check that covers the merged extras chain. Its API half reads the older `api-draft.json` file, so only its DB half counts here (`draft-readback-fix-b1.log`).
- `npm run validate` exit 0 (0 findings) · `npm run recalls` exit 0 · `npm run exposure` exit 0 · `node audit/scripts/check-staged-drafts.mjs role-state-macroeconomy` exit 0 (`*-fix-b1.log`).
- `npm test` → 357 pass, 0 fail (`gate-test-fix-b1.log`). The 3 failures recorded at build time are gone; that was another session's change, not this one.
- **Real taps at a 390x844 viewport, `?draft=1`, signed out, on the restarted server.** I planted the resume pointer for steps 23, 30 and 37 in turn, then used Start learning → the banner "left off at step N of 42". I sorted every item with ref taps (item, then group) and pressed Check groups. Step 23 gave "✓ All correct!". Step 30 gave "✓ All correct!", with the new direct-controls bullet read from the DOM. Step 37 gave "✓ All correct!", with scrollWidth 390. Console: 401 ×3 (the signed-out state save) and one `webpack-hmr` WebSocket failure. I did not test wrong sorts, and I did not look at the "why" feedback.
- Afterwards I removed this section's `revvy_learnmode_…_section` pointer from localStorage. The pre-test, strength and section-state keys were left as I found them.

### Not done / not verified

- `npm run build` was not run. No `app/` or `lib/` file changed.
- Verify B has not re-walked these three steps; my taps are the builder's, not the independent walkthrough. The two new classify recalls have not been through the F116 human pass.
- The real examples are unchanged; none were added.
- Publish is still the founder's step: `node scripts/publish-section.mjs role-state-macroeconomy`, then `… --confirm`.
