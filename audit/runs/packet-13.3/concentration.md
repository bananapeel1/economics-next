# quant-check check 8: answer concentration (26 Sep 2026, packet 13.3)

Files touched: `audit/scripts/quant-check.mjs`, `lib/quant/templates/{multiplier,ped,payback,percentage-change}.mjs`.
Nothing else: no registry, format, marking or test edits. No git writes.

## The rule

This check runs over the whole draw set, per template and per step, like the variety check.

- **Numeric step.** The single typed figure that the most draws would mark correct is right in at most **25%** of draws.
  "Would mark correct" follows the marker's own rule: the figure is inside that draw's `tolerance`, and on the absolute
  value where the step is `acceptAbs`. So a cluster of near-identical answers counts as one answer.
- **Choice step.** No choice text is the right one in more than **75%** of draws. The same cap applies to a two-choice
  step and to a step with three or more choices.
- **Choice position (added beyond the brief).** No choice position is the right one in more than **75%** of draws.
  `components/quant/CalculationItem.jsx` renders `step.choices` in array order and does not shuffle them, so "always
  the middle one" can be learned. Position is read within each choice count, because the student can see the count.
- **Noise.** A share fails only when it is above its cap by more than 3 standard errors of a share at the cap. For
  the numeric cap that is +9.2 points at 200 draws, +2.9 at 2,000 and +1.8 at 5,000.
  - The cost is at the default 200 draws, where only a share over 34% fails. `percentage-change-economics`, at 31%,
    passed 200 draws and failed 2,000. Use `--draws 2000` to hold a template to 25%.
- **Small runs.** Under 200 draws the check is skipped, and the final line says so. For example, at 20 draws:
  `… all clean (concentration not measured under 200 draws)`.
- **Verbose.** `--verbose` prints every step's reading. All concentration failures are listed, because there is one
  line per template step.

## Proof it fails: before any fix, the original eight templates

| Template · step | 3,000 draws | 5,000 draws |
|---|---|---|
| `multiplier` · `k` = 2.5 | 69.9% | 70.1% |
| `multiplier` · `leakages` = 0.4 | 69.9% | 70.1% |
| `ped` · `pctP` = 10 | 39.6% | 39.0% |
| `payback` · `months` = 10 | 36.4% | 36.3% |
| `percentage-change-economics` · `change` = 6.25 | 30.4% | 31.4% |
| `payback` · `verdict`: always the 2nd of 3 choices | 100% | 100% |
| `percentage-change-economics` · `points`: always the 1st of 3 choices | 100% | 100% |

- The first five rows are exactly the four templates and steps the brief named.
- The last two rows are new, caught by the position reading.
- Every other step was at or below 21.1%. Every other choice step was at or below 61.1% by text and by position.

## Fixes

Before and after are measured at 5,000 draws.

| Template | Worst step, before → after | `variants`, before → after |
|---|---|---|
| `multiplier` | `k` / `leakages` 70.1% → **13.2%** | 570 → **2,193** |
| `ped` | `pctP` 39.0% → 14.7%. The new worst step is `pctQ` at **18.6%**. | 1,740 → **4,284** |
| `payback` | `months` 36.3% → **12.0%**. `verdict` position 100% → **33.9%**. | 17,010 (a floor) → **3,258,661** |
| `percentage-change-economics` | `change` 31.4% → **20.8%**. `points` position 100% → **33.5%**. | 728 → 728 |

### multiplier

- The leakage total is drawn evenly from 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.55 and 0.6. Then a triple that sums to it
  is drawn.
- Only four totals give an exact reciprocal at 2 dp, so k is now 1 ÷ the total **to two decimal places**. That is what
  the step label already said.
- ΔGDP is the rounded k × the spend. The spend is kept to whole hundreds where k's last digit is odd, so the answer is
  a whole number and the solution line is true arithmetic.
- A student using the unrounded k lands about 0.1% away, inside the step's 1.2% tolerance.
- The solution uses `≈` where 1 ÷ the total is inexact.
- 0.5 is still excluded.
- `variants` is Σ over totals of triples × valid spends, counted by exhaustion.

### ped

- The price change is drawn first, evenly, from {5, 10, 12.5, 20, 25, 40, 50}.
- 12.5 and 25 were added to the quantity changes.
- |PED| ≤ 4, the old implicit maximum.
- Every rejection moved into one `clean()` predicate, and the draw and the count share it.
- `variants` is 714 clean sets out of 1,400, times 6 goods.

### payback

- The year is drawn first, evenly. Then a month is drawn evenly among the months that year can reach: year 2 cannot
  pay back in months 1-3. Then a set is picked from an enumeration.
- The choices are every year of the table, in words ("the third year"), so the draw no longer refuses months equal to
  a year number.
- The table is always five years long. Before, a fifth year appeared only when the payback year was 4.
- The enumeration is built per year on first use, and `variants` is a memoised getter, so the import costs 0.7ms
  rather than about 30ms. This matters because the module loads in the browser.
- `variants` counts, by exhaustion, 17,233 clean sets × the later flows that stay off the shortfall × 7 firms.

### percentage-change-economics

- The rate is drawn first, evenly, over the 5 rates that have sets. 2.5 and 3 never pass condition 4.
- The right QS10 choice goes in a random place among the three.
- The sets are unchanged, so `variants` is unchanged.
- The Business half is byte-identical over 5,000 seeds.

### What this changes for stored items

Seeds now rebuild different figures for these four ids. That is by design, since only `{template, seed}` is stored.

## Variety floor after the fixes

| Template | Distinct stems at 2,000 draws (floor) | Distinct stems at 5,000 draws (floor) |
|---|---|---|
| `multiplier` | 1,158 (1,049) | 1,784 (1,575) |
| `ped` | 1,549 (1,278) | 2,871 (2,360) |
| `payback` | 1,999 (1,599) | 4,990 (3,996) |
| `percentage-change-economics` | 652 (545) | 725 (581) |

## Results

- `node audit/scripts/quant-check.mjs --draws 5000`: **`quant-check: 14 templates × 5000 draws = 70000 items, all clean`**.
  - Six Business templates were registered by another session mid-run.
- The original eight were also clean at 20, 200, 2,000 and 5,000 draws.
- `node --test lib/quant-pool.test.mjs lib/quant-practice.test.mjs`: **27/27 pass**.

## Check 8 on the new templates

Each was run with `--module … --only …` at 5,000 draws. None fails check 8.

| Template | Worst numeric step | Choice steps (text / position) |
|---|---|---|
| `npv` | 1.3% | 50.8% / 50.8% |
| `gearing` | 2.6% | 50.1% / 50.1% |
| `roce` | 1.3% | none |
| `labour-productivity` | 6.1% | none |
| `capacity-utilisation` | 2.0% | none |
| `decision-tree` | 1.5% | 50.0% / 50.0% |
| `yed-business` | 11.6% | 65.7% / 65.7% |
| `yed-economics` | 11.2% | 40.2% / 40.2% |
| `xed` | 12.7% | 50.7% / 50.7% |
| `pes` | 15.5% | 57.7% / 57.7% |
| `revenue-costs` | 18.1% (`output` = 7) | 47.1% / 47.1% |
| `exchange-rate-business` | 8.3% | 11.5% / **51.7%**: 1st of 4 |
| `exchange-rate-economics` | 7.8% | 15.9% / **51.7%**: 1st of 4 |
| `terms-of-trade` | 9.1% | 50.5% / 50.5% |

- `revenue-costs` exits 1 on **variety**, not concentration, because it declares `variants` 0. It is probably
  mid-edit.
- `exchange-rate`: the first of 4 choices is right in 52% of draws, against a 25% baseline for four choices. That is
  under the cap but worth a look.

## Found, not fixed (outside check 8)

In `payback`, the payback year's cash flow is the **largest in the table** in 79.1% of draws. It was 79.2% before this
change. Counting also "the only flow that isn't a multiple of $2,000", it is 83.9% (89.4% before).

"Pick the biggest flow" therefore scores the `verdict` mark about four times in five. Check 8 cannot see this, because
it depends on the stem. Fixing it means changing the windows the later flows are drawn from, which is a design call.
