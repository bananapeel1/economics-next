# Packet 13.3 — six Economics quant templates, eight registrations (26 September 2026)

New files only: `lib/quant/templates/{yed,xed,pes,revenue-costs,exchange-rate,terms-of-trade}.mjs`.
**None is registered.** `lib/quant/index.mjs` was not touched; the registry owner adds:

```js
import { yedEconomics, yedBusiness } from './templates/yed.mjs';
import xed from './templates/xed.mjs';
import pes from './templates/pes.mjs';
import revenueCosts from './templates/revenue-costs.mjs';
import { exchangeRateEconomics, exchangeRateBusiness } from './templates/exchange-rate.mjs';
import termsOfTrade from './templates/terms-of-trade.mjs';
```

Money in every stem, label and solution goes through the shared `money()` (two decimals whenever
there are cents), per the main session's change to `format.mjs` during this packet. The templates
were re-run against quant-check as it changed under them (the true-minus reading and the two-decimal
form in check 7, then the new concentration check).

## Registrations

| id | unit · spec · specTerm | spec lines relied on | QS | marks | variants | `--draws 5000` |
|---|---|---|---|---|---|---|
| `yed-economics` | WEC11 · 1.3.2 · "income elasticity" | econ 604-605 (3b formulae), 635-642 (3h: income elastic / inelastic demand, normal vs inferior) | QS2 2767, QS8 2785 | 4 | 1,132,272 | all clean |
| `yed-business` | WBS11 · 1.3.2 · "calculation of income elasticity of demand" | bus 582-586 (5a-c) | QS2 2270, QS7 2284 | 4 | 1,132,272 | all clean |
| `xed` | WEC11 · 1.3.2 · "cross elasticity of demand" | econ 604-605 (3b), 643-647 (3i: substitutes, complements, unrelated) | QS2, QS8 | 4 | 144,085 | all clean |
| `pes` | WEC11 · 1.3.3 · "price elasticity of supply" | econ 669-677 (2a-b: elastic / unitary / inelastic supply) | QS2, QS8 | 4 | 106,641 | all clean |
| `revenue-costs` | WEC13 · 3.3.2 · "marginal revenue" | econ 1298-1301 (1a TR/AR/MR), 1307-1314 (2c incl. "average (total) cost", "marginal cost"), 1350-1351 (4a normal / supernormal / losses); **3.3.1** 1277-1278, 1284-1285 (3a/3c "profit maximisation") | QS6 2779-2781 (IA2: marginal, average, totals), QS9 2788 | 6 | 4,699,114 | all clean |
| `exchange-rate-economics` | WEC14 · 4.3.3 · "relative export prices" | econ 1734-1737 (2d-e appreciation, depreciation), 1759-1762 (3a measures of international competitiveness), 1766 (3b exchange rate) | QS1 2764, QS2 2767 | 5 | 41,202 | all clean |
| `exchange-rate-business` | WBS12 · 2.3.5 · "exchange rates (appreciation, depreciation)" | bus 1013-1016 (1a), with 1415 (4.3.2 5a) and 2259-2261 (appendix 7) | QS1 2267, QS2 2270 | 5 | 41,123 | all clean |
| `terms-of-trade` | WEC14 · 4.3.2 · "calculation of the terms of trade" | econ 1646 (3a), 1647-1656 (3b-c) | QS2, QS5 2777 | 5 | 31,230 | all clean |

`checkSpecCitation` returns `null` for all eight. Every section number has 3 as its middle digit.

Steps, in mark-scheme order:
- **YED** — %ΔQd, %ΔY (real income / average consumer income), YED with its sign (own figure rule
  from both), classification. Economics offers three options (normal & income elastic, normal &
  income inelastic, inferior); Business offers normal / inferior.
- **XED** — %ΔQd of good A, %ΔP of good B, XED with its sign (ofr), substitutes / complements /
  unrelated.
- **PES** — %ΔQs, %ΔP, PES (ofr), elastic / inelastic.
- **revenue-costs** — from TR and TC at four outputs: MR and MC of a named unit, profit-maximising
  output (2 marks), average cost there to the cent (ofr: the student's own output, if it is one of
  the four shown), supernormal profit / normal profit / a loss.
- **exchange-rate** — US$ price at the old rate, at the new rate, % change in the US$ price (2
  marks, ofr), one four-way choice: appreciated/depreciated × more/less price competitive.
- **terms-of-trade** — ToT last year, this year, % change (2 marks, ofr), improved / deteriorated.

Named slips (every numeric step has at least one, each note ≥ 20 chars): divided by the new value;
left out ×100; dropped a meaningful sign (YED, XED, and every negative % step); inverted the
elasticity ratio; divided level changes instead of % changes; average revenue for MR; average cost
for MC; MC or TC for AC; one unit past MC = MR; revenue maximisation; productive efficiency (lowest
AC) — the output-step reasons are merged into one note when two land on the same output, because the
marker returns only the first match; multiplied by the exchange rate (currency direction); the %
change in the rate instead of the price; index points instead of per cent (ToT); export-price change
minus import-price change (ToT, named only where it is wrong by more than twice the tolerance).
`acceptAbs` is used nowhere: YED and XED carry their meaning in the sign, and PES, ToT and the price
change have no sign convention to drop.

## What the draw rejects, and why

The first pass of every attempt makes the same picks in the same order and `accept(picks)` takes or
rejects the set whole; an empty option list becomes a `[null]` placeholder so the pick count never
varies. Rejected everywhere: an answer not exact at its dp (except AC, below); any named slip within
**twice** its step's tolerance of the answer (quant-check asserts once); any answer equal to a printed
figure in signed, absolute and one-decimal form (a $20 price beside a 20% rise; a PES of 4 beside a
$4 price; a $250 price beside Rs 250). Exchange-rate and ToT also reject two slips within twice the
tolerance of each other, so the note a student reads is the one for what they did.

Template-specific:
- **YED**: |YED| = 1 (Economics' boundary; one parameter space for both subjects), |YED| > 3.
- **XED**: |XED| < 0.2, so "unrelated" is never defensible; |XED| > 3.
- **PES**: exactly 1 (unitary elastic is a third spec case); PES > 4.
- **YED, XED, PES**: no percentage change under 5% (4% against 3.85% divided-by-new sits inside
  twice the tolerance, so those sizes were never drawn and were removed rather than left inflating
  the lists).
- **revenue-costs**: the MC = MR crossing is built **between** units k and k+1 (MR − MC =
  (a − c) − s(2n − 1), with a − c = 2ks + δ, |δ| < s), so profit (TR − TC) is greatest at exactly
  one output and the rule and the "largest profit" reading agree. A crossing AT a unit leaves profit
  equal one unit either side — two right answers. The crossing is never at the edge of the four
  outputs; MR stays positive (revenue peaks at the last output, a distinct slip); demand slopes down
  so MR ≠ AR; fixed cost ≥ $20; money answers > 12. "Total cost includes normal profit" is in the
  stem. **AC is rounded to the cent, not required exact**: requiring it let only 4, 5 and most 8-unit
  outputs through, and the concentration check measured "8 units" right in 27.0% of 5,000 draws
  (cap 25%); rounded, the most common output is 18.1%. The solution writes ≈ there (`exactly`).
- **exchange-rate**: the % change in the US$ price is drawn first (±4 … ±25) and only rates and
  prices that suit it are offered; drawing freely put 70% of draws at ±20/25%. New rate on the
  currency's quoting precision and near its window; home prices in whole tens for rupee/shilling;
  floating currencies only (ringgit, Sri Lankan rupee, Kenyan shilling, cedi, euro), because a
  pegged currency's move is a revaluation or devaluation, which 4.3.3 2d-e distinguishes.
- **terms-of-trade**: never 100 in either year (points = per cent there, and the base year's 100
  is printed); import index must move, by −6 to +12 points; |change| ≥ 4%; indices to one decimal.
- **YED and ToT retry inside the drawn change** rather than restarting the attempt: restarting
  weighted each change by how often its figures survive (20% income change 19% of draws; −4% ToT
  change 20%; after filtering alone, ±12.5% ToT took half). Each change now gets an equal share.

## How `variants` was counted

By exhaustion, not multiplied out: a script walks every sequence of picks the first pass of an
attempt can make, runs the template's own `draw` on it through a scripted rng (index by index; a
pick past the m-th means the pass was rejected — a restart or a retry), builds every accepted item
and counts distinct stems (SHA-1 of the stem). Distinct stems rather than accepted leaves, because
weighted picks (`[true, true, false]`) repeat leaves. Leaves walked on the final files: yed-economics
5,523,840 (yed-business 10,990,080 on the pre-retry file, same 1,132,272), xed 411,264, pes 365,568,
terms-of-trade 87,300, exchange-rate 43,256 / 43,271.

revenue-costs has ~28M leaves, too many for one pass (a first run was stopped after 20 CPU minutes
and its count was obsolete anyway after the AC change). The second script is the same walk with two
exact speed-ups — repeated primitive values in a pick array are branched once, and `--first i`
fixes the first pick (the firm) so one run per firm goes in parallel and the counts add, because
the firm's name is in every stem. It reproduced xed (144,085, also as the sum of eight per-pair
runs) and terms-of-trade (31,230) exactly before it was used. revenue-costs: 2,972,160 leaves per
firm, 671,302 distinct stems for each of the seven, **4,699,114** in all. Building every stem costs
1.2 ms (the shared `money()` builds an `Intl` formatter per call), so that count keyed each accepted
item on `[firm, outputs, TR list, TC list]` — exactly what the stem prints — after checking on
100,000 draws that key and stem are one-to-one (98,480 of each, no mismatch). The walk:

```js
// node count-variants.mjs <module> <id> <picks-per-attempt>
const t = Object.values(await import(modUrl)).find((x) => x?.id === id);
class Branch { constructor(n) { this.n = n; } }
const REJECT = Symbol('reject');
const rngFor = (trace) => { let i = 0; const choose = (n) => {
  if (i < trace.length) return trace[i++]; if (i >= m) throw REJECT; throw new Branch(n); };
  return { int: (a, b) => a + choose(b - a + 1), step: (a, b, s) => a + choose(Math.floor((b - a) / s) + 1) * s,
           pick: (arr) => arr[choose(arr.length)], next: () => { throw new Error('not enumerable'); } }; };
const stems = new Set(); const stack = [[]];
while (stack.length) { const trace = stack.pop(); let d;
  try { d = t.draw(rngFor(trace)); } catch (e) {
    if (e instanceof Branch) { for (let k = e.n - 1; k >= 0; k--) stack.push([...trace, k]); continue; }
    if (e === REJECT) continue; throw e; }
  stems.add(sha1(t.build(d).stem)); }
```

Reordering or reweighting picks (exchange-rate change-first, the YED and ToT retries) was recounted
each time and left the distinct-stem counts unchanged, as it should: it moves probability between
the same accepted sets.

quant-check's variety floor assumes uniform sampling and the draws are not uniform, so the expected
distinct stems under the ACTUAL distribution were estimated from 200,000 draws: at 5,000 draws
exchange-rate-economics 4,196 against a floor of 3,766, exchange-rate-business 4,306 against 3,766,
terms-of-trade 3,994 against 3,696. Exchange-rate first measured 3,420 against 3,398 — a pass by 22 —
so its price grids were widened and two contexts added before it was accepted.

## Rule-1 notes (what the IAL specification does not say)

1. **Necessity / luxury: not used.** Neither specification has either word. Economics 1.3.2 3h names
   "income elastic demand", "income inelastic demand" and "normal goods and inferior goods"
   (econ 635-642); Business 1.3.2 5b names "Normal and inferior goods" only (bus 584). The Economics
   choice is one three-way step because "income elastic" for an inferior good is read two ways in
   textbooks; the size question is asked only of a normal good.
2. **XED "unrelated" is offered and never correct.** The spec lists it (econ 647). An XED of exactly
   0 needs a quantity that does not move, which makes step one a trick; a small XED makes "unrelated"
   defensible. The draw keeps |XED| ≥ 0.2 and the note says unrelated goods show an XED of zero.
3. **Profit maximisation is 3.3.1, not 3.3.2.** "profit maximisation" is under 3.3.1 3a/3c
   (econ 1277-1285); MR, MC, AC and normal/supernormal profit are 3.3.2. The template cites 3.3.2
   (four of five steps) and names `3.3.1 · 3c` in `specLeaf`. The spec's wording is
   "average (total) cost"; the card says "average cost". "Revenue maximisation" (a slip note) is
   3.3.1 3a's own term; "productive efficiency" is 3.3.3's (econ 1365).
4. **Exchange rates: neither specification writes "calculate".** Economics supports the conversion
   through "relative export prices" as a measure of international competitiveness (econ 1759-1762)
   and appreciation/depreciation (1734-1737). **Business, registered, on this reading:** 2.3.5 1a
   requires "the effect on businesses of … changes in … exchange rates (appreciation, depreciation)"
   (bus 1013-1016), and appendix 7 requires QS1 ratios and QS2 percentage changes "to apply the
   skills to relevant economic contexts" (bus 2259-2261, 2267, 2270); for an exporter holding its
   home price, the effect of an appreciation IS the change in its foreign-currency price. 2.3.5 is
   cited rather than 4.3.2 5a (bus 1415, "movements in exchange rates") because 2.3.5 names the two
   words the choice turns on. If the founder reads 2.3.5 as qualitative only, drop the
   `exchangeRateBusiness` export; nothing else depends on it.
5. **"Price competitive", "improved", "deteriorated" are not spec words.** Economics says
   "international competitiveness", "relative export prices" and "non-price factors"; 4.3.2 3c says
   "changes in a country's terms of trade" with no direction words. Both pairs are used because they
   are the standard mark-scheme vocabulary and the spec offers no alternative; flagged, not decided.
6. **Topic label for 4.3.3** is "Balance of payments and exchange rates", the product's name; the
   spec heading is "Balance of payments, exchange rates and international competitiveness".
7. **"Deadweight loss"** appears nowhere.
8. **Choices are not shuffled** (the card's behaviour, not these templates'): quant-check reports
   the right choice sits first in 38-66% of draws depending on the template, under its 75% cap.

## Gate, as last run

```
node audit/scripts/quant-check.mjs --module lib/quant/templates/{yed,xed,pes,revenue-costs,exchange-rate,terms-of-trade}.mjs \
  --only yed-economics,yed-business,xed,pes,revenue-costs,exchange-rate-economics,exchange-rate-business,terms-of-trade --draws N
quant-check: 8 templates × 2000 draws = 16000 items, all clean
quant-check: 8 templates × 5000 draws = 40000 items, all clean
```

Distinct stems at 5,000 draws: yed-economics 4,982, yed-business 4,980, xed 4,915, pes 4,864,
revenue-costs 4,999, exchange-rate-economics 4,228, exchange-rate-business 4,331, terms-of-trade
4,057. The same six modules alongside the registry as it stood at the end of this session (14
templates, including the Business ones another 13.3 session had registered): `--draws 200`, 22
templates, all clean — no id collides. `checkSpecCitation`: null ×8.
