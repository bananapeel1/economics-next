# Packet 13.2 — Verify A, round 3

Read-only pass, 22 September 2026. Scope: the two ids the round-2 split created (**D029**, **D030**),
the honesty of **D028**'s wont-fix, the three changes fix round 2 made, and whether any of the ten
still-confirmed ids stopped being true. No source file, template, test or script was changed. Two
ledger verdicts were recorded, both confirms.

`fix-round-2.md` is the builder's account and was read as a claim. Every number below is
re-derived. Probes kept beside this file:

- `verify-a-round-3-qs10.mjs` — the Economics card parsed as it renders, over 20,000 draws
- `verify-a-round-3-qs10-exhaustive.mjs` — the same question counted over the whole draw space
- `verify-a-round-3-placement.mjs` — where every drill lands, against live content on :3001
- `verify-a-round-3-reservation.mjs` — D030 as a property over 630 section shapes

**Gates run here, all by hand.** `npm run quant-check` exit 0 (8 × 200 = 1,600 items) ·
`npm run quant-check -- --draws 2000` exit 0 (16,000) · `--draws 5000` exit 0 (40,000, run because
round 2 changed the number the variety floor is computed from) · `npm test` **267/267, 0 fail** ·
`npm run build` **exit 0** · `npm run validate` **exit 0**, `quant.unit` still 15. Disk did not
stop any of them, but see the environment note at the end: it stopped this session dead for a
minute in the middle.

**The dev server on 3001 is serving this code.** Checked first, because that trap is on the record.
`lib_11udtz9._.js` carries `Forecasters instead expect growth of`, two references to
`FORECAST_PAIRS`, `variants: business ? …` and `free.unshift(0)`; `components_0-5s_1x._.js` carries
three `quantDrills` references. Both round-2 edits are in the served bundle, not just on disk.

---

## Verdicts

**D029 CONFIRMED** — "A drill lands on the check-in of the chapter that teaches it, matched on the
template's own title."

`lib/quant-pool.js:114-126`. Re-derived over the live content for all 43 sections: 7 sections carry
drills, 8 placements, 6 chosen by title match, 0 on a legacy block, and every placement scores full
marks on its own answers. The match is doing real work rather than winning a tie: `ped` scores 3 on
"Price Elasticity of Demand (PED)" against 2 on the YED and XED chapters that follow it, and
`index-numbers` scores 2 on "Consumer Price Index (CPI) and Inflation" against 1 on "Inflation:
Causes and Effects" after it — in both cases the `>=` latest-wins rule at `:123` would have taken
the later, weaker chapter if the score had not separated them.

| section | placement | chapter |
|---|---|---|
| meeting-customer-needs | ord 4 (flat 17/21) `percentage-change-business` | Market Positioning and Orientation |
| financial-planning | ord 2 (flat 11/18) `breakeven` | **Break-Even Analysis** |
| decision-making-techniques | ord 0 (flat 3/6) `arr` | Quantitative Techniques *(unmatched)* |
| decision-making-techniques | ord 1 (flat 6/6) `payback` | Sales Forecasting *(unmatched)* |
| consumer-behaviour-demand | ord 2 (flat 13/24) `ped` | **Price Elasticity of Demand (PED)** |
| measures-economic-performance | ord 3 (flat 16/32) `index-numbers` | **Consumer Price Index (CPI) and Inflation** |
| national-income | ord 3 (flat 14/14) `multiplier` | **The Multiplier and National Income** |
| economic-growth | ord 5 (flat 23/23) `percentage-change-economics` | Economic Growth and AD/AS Analysis |

Four land on the chapter that names the method outright. Two land on the latest chapter sharing the
topic word, after the material is taught — defensible under the rule as written, and worth saying
plainly that they are the weaker half of the claim: "Market Positioning and Orientation" does not
teach market share, it is the last of three chapters containing the word "market". **No drill lands
before the chapter that teaches it**, which is the defect the rule exists for. The two unmatched are
on a section whose only chapters are "Quantitative Techniques" and "Sales Forecasting", which share
no word with "Average rate of return" or "Payback period"; matching is a preference by design
(`:101-102`), and the fallback happens to put `arr` on "Quantitative Techniques" anyway.

**D030 CONFIRMED** — "An unmatched drill leaves the first check-in clear while any later one is
free, and takes it only when the alternative is a drill that reaches no student."

`lib/quant-pool.js:128-140`: the free list starts at `i = 1` (`:130`), and slot 0 is unshifted onto
it only under `free.length < unmatched.length && !taken.has(0)` (`:132`). One live case is one data
point for a rule stated in general terms, so the rule was property-tested instead: 1-6 check-ins ×
every subset already claimed by a matched drill × 0-4 unmatched drills = **630 configurations**,
with the control being the same placement with the yield removed.

- an unmatched drill takes the first check-in in **124** of the 630
- in **124 of 124**, the reserve-always control leaves at least one drill unplaced — **0 violations**
- **0** configurations where the first check-in is left empty while a drill reaches nobody
- **0** configurations where the shipping placement places fewer drills than the control

Live, the one case is `arr` on `decision-making-techniques`, flat step 3 of 6, and the control there
leaves `payback` unplaced. Guarded by `lib/quant-pool.test.mjs:140-171`.

**One scope caveat, written into the evidence field so the claim is not read wider than it is.**
"Reaches no student" means *no check-in in this section's Learn Mode sequence*. Since fix round 2,
`QuizTab.jsx:36-40` renders every template a section has, so `payback` reaches a student on the Quiz
tab whether or not placement finds it a slot. What the yield buys is now the Learn-Mode-only
student, not the drill's existence in the product — a narrower thing than the sentence suggests at
first reading, and narrower than it was when fix round 1 made the trade.

---

## Is D028's wont-fix honest?

**It is a claim that was superseded, not a defect being waved through.** Three things decide it:

1. **Nothing was dropped in the split.** D028 asserted two things; D029 restates the first and names
   the mechanism, D030 restates the second *with the exception in the title itself*. The weakened
   half is weakened in writing, where the next reader will hit it, not in a note underneath.
2. **The weakened half is now testable and tested.** "Never lands on the first check-in" became
   "takes it only when…", and that "only when" is a property I could falsify — 630 configurations, 0
   violations. A wave-through leaves nothing to check.
3. **The behaviour is guarded.** `lib/quant-pool.test.mjs:140-171` pins both halves, including the
   yield, and the test was re-titled rather than deleted.

What the note does not say, and should: **its stated reason stopped being true inside the same fix
round that wrote it.** The note justifies the trade with "`payback` reaching no student at all", and
by the end of round 2 `payback` reaches every student who opens the Quiz tab. The trade is still
defensible for Learn Mode on its own, but the sentence in the note is now the round-1 situation, not
the shipping one.

And the cost the reservation existed to prevent is real and now accepted: on
`decision-making-techniques` a 4-mark ARR calculation is the third thing in a six-step section. That
is the step-0 wall, moved one screen. It is written down in `quant-pool.js:96-99` and in D030's
title, which is the most that can be asked of a trade — but it is a choice between two defects, and
the third option (two drills on one check-in, or Learn Mode deferring to the Quiz tab for the
overflow) was never costed.

---

## The three changes fix round 2 made

### 1. The Economics QS10 step — both forecast rates drawn

**(c) Step two and step three no longer contradict each other. HOLDS.** The stem
(`percentage-change.mjs:331-332`) now states only last year's and this year's real GDP and makes no
forecast claim at all. Step two is explicitly counterfactual — "Real GDP next year, **if** it grows
at the same rate again" — and step three opens "Forecasters **instead** expect growth of X% next
year and Y% the year after". "Instead" is carrying the whole load, and it carries it: a conditional
and a forecast that differs from it are not a contradiction. Round 2's finding (the stem asserting
`rateNext` for the same year step two computes at `rateNow`) is closed.

**(b) The arithmetic is true on every draw, with two roundings named. HOLDS.** Parsed out of the
strings the card actually renders, over 20,000 draws, every asserted equality re-computed:

- `correctNote`'s "X% to Y% is a fall of Z percentage points": **0 failures in 20,000**. Both rates
  are drawn at one decimal place and the fall is exact by construction, asserted at
  `percentage-change.mjs:202`. The round-1 shipping defect — "6.25% to 5.7% is a fall of 0.6
  percentage points", where the subtraction gives 0.55 — cannot recur, because `rateNow` is no
  longer the two-decimal growth rate.
- worked solution lines 1, 2 and 4: **0 failures**. Line 4 is the same subtraction as `correctNote`
  and agrees with it.
- `wrongNote`'s "W% is the same fall measured against the rate itself": W is `points / rateNow × 100`
  **rounded to one decimal place**, so it is up to **0.05 pp** from the exact value (7.5% printed for
  7.4626%), in 87% of draws. Every other rate on the card is printed to one decimal place too, and
  the choice the note is explaining prints the same W, so the card is self-consistent. This is
  presentation rounding, not the round-1 failure, which asserted an exact subtraction between two
  figures rounded differently.
- worked solution line 3, "this year × 1.0625 = next year": the printed product is the true product
  **rounded to the 2 dp the step declares** in **73.5%** of draws, gap at most **0.005 bn** against a
  tolerance of 0.05. This is new: it is the direct consequence of dropping `forecastExact` for the
  Economics half (see 2 below), and the Business half — where `forecastExact` is still on — remains
  exact. Defensible, and the source says so at `:72-78`, though that comment's "inside it by four
  orders of magnitude" is nearer one when measured against the tolerance it names.

**(a) A printed figure still reaches step one's answer, in about 1 draw in 5,890. NOT FULLY CLOSED.**

The stem, all three step labels, all three choices and every feedback note were scanned over 20,000
draws for any number within step one's 0.05 tolerance of its answer, and for any sum or difference
of two of them. The stem is clean, the labels are clean, `rateNow` and `rateNext` are held 0.1 clear
of the answer by the draw filter (`:178-180`) and 0.05 by `invariants` (`:203-204`), and round 2's
own finding — `rateNext + points` reconstructing the answer — is gone, because `rateNow` is no
longer the answer. But:

```
seed r3-1194 · Real GDP in the United Arab Emirates was $516 billion last year and $554.7 billion this year.
  step one   Rate of economic growth this year               answer 7.5
  step three choices: "0.5 percentage points — real GDP still rises, more slowly"
                      "0.5% — real GDP falls"
                      "7.5% — real GDP falls"      ← asPctOfRate
  typing 7.5 into step one:  correct, 2/2
```

`asPctOfRate` is guarded against `points` (0.3, `:130` and `:205`) but **against nothing else**. When
it lands on the growth rate the student is being asked to calculate, the card prints that answer in
a distractor — and the same card's step-three feedback then tells the student 7.5% is the *wrong*
reading, while step one has just marked 7.5 right.

Counted over the whole draw space rather than sampled (`verify-a-round-3-qs10-exhaustive.mjs`, with
the pair list re-derived and cross-checked against all 801 pairs the shipping draw produces in
400,000 draws — 0 unexplained):

- **542,810** (set, pair) combinations the draw can produce
- **99** of them print step one's answer on the question face — every one is a 7.5% set meeting the
  single pair `rateNow 6.7 / rateNext 6.2 / points 0.5 / asPctOfRate 7.5`
- **0.017% per draw, about 1 in 5,890**

`quant-check` cannot see it: it has no check that a printed figure is not the answer. The fix is one
line in each of the two places the other two rates are already handled — the draw filter at `:178-180`
and `invariants` at `:203-204` — holding `asPctOfRate` 0.1 and 0.05 clear of `d.pct`. Cost: 99 of
542,810 combinations.

This is smaller than either arrangement it replaces (round 1: every draw; round 2's first attempt:
every draw, plus false arithmetic), and it does not make any confirmed id false — the marking is
correct, the placement is correct, the guards are green. It is the third iteration of the same class
and it should not reach 13.3 unclosed. The source comment at `:112-115` — "Nothing about them is
derivable from the student's own answer and nothing about their answer is derivable from them" — is
the claim this contradicts, and it is the claim that should be made true rather than softened.

One more thing that belongs in the record because it looks like a leak and is not: typing anything
wrong into step one returns "Not correct — the answer is 7.50%." That is fix 6 (`marking.mjs:96-101`),
deliberate, and reasoned about there. It means "no printed figure gives the answer" was only ever a
claim about the question *before* it is marked, which is the right scope, and which is the scope
measured above.

### 2. `variants` is now the stem count — HONEST, and MIN_VARIANTS still bites

`percentage-change.mjs:158-160` declares `ECONOMICS_SETS.length`. Two checks:

- **It is the stem count.** The stem is `(economy, before, after)`, `after` is a strictly monotonic
  function of `pct` for a given `before`, so every set is a distinct stem. Recovered from the
  shipping build: **728** distinct stems, and an independent re-derivation of `cleanPairs` over the
  ten economies gives **728** sets. Declared = reachable, exactly.
- **It is not a dodge, and the opposite declaration would fail.** `MIN_VARIANTS = 500`
  (`quant-check.mjs:31`) is an absolute floor on the declared number and 728 clears it by 228. Had
  the old stems × pairs figure been kept (728 × 801 = 583,128), the *variety floor* would demand
  1,597 distinct stems at 2,000 draws from a space that holds 728 — `quant-check` would fail. The
  honest number is the only one that passes both halves. Green at 200, 2,000 and 5,000 draws.

**Where the 728 came from is worth stating, because it is a trade and the account does not frame it
as one.** With the ten economies but `forecastExact` still on, the space is **191 sets** — below
`MIN_VARIANTS`. The four extra economies alone would not have cleared the floor; dropping the
"doubly-applied percentage lands exactly on 2 dp" constraint is what did, and it is the same change
that makes 73.5% of worked solutions print a rounded product (1 above). Both are defensible; they
are one decision, not two.

### 3. `QuizTab` renders every drill — HOLDS, and `payback` now reaches a student

`QuizTab.jsx:36-40` maps `templatesForSection(...)` rather than taking `[0]`, and renders the result
at `:87` (no quiz bank) and `:152` (normal), each through `QuantCard`. Checked on the real
derivation path — `subjectFrom('WBS13')`, `'3.3.3'` — which returns `arr, payback`, and both build:
`quant:arr:decision-making-techniques:arr:0` and `quant:payback:decision-making-techniques:payback:0`.
Distinct outer keys (`item.template`) so neither displaces the other, and each has its own attempt
counter (`:41`).

**D026 is untouched.** `QuantCard` (`:267-279`) is passed `{item, onReseed}` and no `onResult`, so a
marked drill cannot reach the score. `finalScore` (`:101`) and `score` (`:132`) both reduce over
`displayQuestions` alone, and the POST at `:112-113` sends `total: displayQuestions.length`. The card
says so in its own copy at `:275-277`.

---

## The ten still-confirmed ids — none regressed

None was re-confirmed; statuses are untouched. Each was re-checked against the code as it now stands.

- **D018** — the round-2 rewrite did not touch `specCode`, `specTerm`, `unit` or `qs` on either
  registration (`percentage-change.mjs:372-398`); the spec test is in the 267.
- **D019** — green at 200, 2,000 and **5,000** draws. The extra run matters: round 2 changed the
  number the floor is derived from, and at 5,000 draws the floor is 582 against 728 reachable stems.
- **D020** — live sweep over all 43 sections gives exactly the same 7 drilled sections, right subject
  and unit on each; `templatesForSection` is unchanged.
- **D021** — `quantSeed` (`:53-55`) still returns the literal `sectionId:templateId:attempt`; the only
  `Math.random` under `lib/quant` is in `newSeed` (`rng.mjs:44`), which nothing on these paths calls.
- **D022** — `national-income` places `multiplier` on flat step 14 of 14, a `checkin`; it marks
  6/6 on its own answers. `economic-growth` places `percentage-change-economics` on flat 23 of 23,
  marks 6/6.
- **D023** — `meeting-customer-needs` flat 17 of 21 and `financial-planning` flat 11 of 18, both
  `checkin`, both full marks; `decision-making-techniques` now renders both its drills (flat 3 and
  flat 6).
- **D024** — `CalculationItem.jsx:109` still renders the `own figure rule` tag on `outcome === 'ofr'`,
  `marking.mjs:70-84` still awards full marks on that outcome, and `quant-check`'s own-figures check
  is green over 40,000 items.
- **D025** — `LearnModeTab.jsx:633` still has `currentQuant && 'a calculation'` in the same filtered
  list, reading the same `currentQuant` the mount at `:827` uses. Re-derived because placement
  changed: **all 8** live placements are on `checkin` steps, **0** on `legacy`, so no drill renders
  under a silent sentence.
- **D027** — `npm run validate` exit 0, `quant.unit` reports 15, unchanged.

---

## Unclaimed but relevant (no status changed)

1. **`asPctOfRate` can be step one's answer** — 99 of 542,810 combinations, about 1 draw in 5,890,
   all of them `pct = 7.5` with the pair `6.7 / 6.2 / 0.5 / 7.5`. Two lines, in the two places
   `rateNow` and `rateNext` are already handled. This is the one thing on this list that should not
   ship to 13.3. Detail in section 1 above.
2. **The worked solution's forecast line is exact to 2 dp, not exact** — 73.5% of Economics draws,
   gap ≤ 0.005 bn, and the Business half is still exact. A consequence of the `forecastExact` drop,
   not a mistake, but the two halves of one template now behave differently and nothing says so.
3. **`sentence` at `marking.mjs:36` is still dead** — flagged in round 2, its only caller was
   replaced by fix 6, and no eslint config exists to notice.
4. **`GROWTH_PCTS` has two entries that can never be drawn** — 2.5 and 3 are rejected for every
   economy by the "dividing by the new figure must not land on the right answer" filter
   (`pct² / (100 + pct) ≤ 0.1` holds for both). Harmless, but the list reads as seven rates and is
   five, and the growth stems are therefore 4% or higher.
5. **The `ECONOMIES` comment is stale** — "at $6bn no **whole-dollar** draw in the window survives"
   (`format.mjs:44-45`) describes the pre-round-2 draw; the Economics half now steps in tenths.
6. **D028's note should say that its own reason was overtaken** by the `QuizTab` change in the same
   round. See above.
7. **Disk.** The volume filled completely during this session: for about a minute **no command could
   run at all**, because the harness could not create its own output file. It recovered to ~800 MB
   and every gate then ran, `npm run build` included, finishing with 595 MB free. Nothing was deleted
   to achieve that. The next session may not get the minute back.

## Gate

**Clear.** `node audit/scripts/ledger.mjs unverified 13.2` reports *"gate clear: every claimed item
is confirmed and no scope is left unclaimed"*. Thirteen items: eleven confirmed, D028 wont-fix with
a reason I judge honest, D029 and D030 confirmed here. Every guard green, the build green, and the
two round-2 code changes do what they say.

I would not hold the gate for item 1, but I would not let it out of the packet either: it is the
third arrangement of the same step and the first one small enough to be closed by a guard rather
than a rewrite.
