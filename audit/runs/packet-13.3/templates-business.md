# Packet 13.3: six Business quant templates

Authored 26 Sep 2026. These are new files only. The registry (`lib/quant/index.mjs`), `format.mjs`, `marking.mjs`
and the tests are untouched. **None of the six is registered yet.** Wiring them into `REGISTRY` is left to the
session that owns `index.mjs`.

| Template | File | Unit · spec | specTerm | Marks | Variants (counted) |
|---|---|---|---|---|---|
| `npv` | `lib/quant/templates/npv.mjs` | WBS13 · 3.3.3, 2c/2d | net present value | 5 (1+1+2+choice 1) | 5,814,305 |
| `gearing` | `lib/quant/templates/gearing.mjs` | WBS13 · 3.3.5, 2a/2b | gearing ratio | 4 (1+2+choice 1) | 253,823,003 |
| `roce` | `lib/quant/templates/roce.mjs` | WBS13 · 3.3.5, 2a/2b | return on capital employed | 4 (1+1+2) | 97,345,444,910 |
| `labour-productivity` | `lib/quant/templates/labour-productivity.mjs` | WBS13 · 3.3.5, 3a | labour productivity | 4 (1+1+2) | 54,626,348 |
| `capacity-utilisation` | `lib/quant/templates/capacity-utilisation.mjs` | WBS12 · 2.3.4, 2a/2c | capacity utilisation | 6 (2+2+2) | 1,124,235 |
| `decision-tree` | `lib/quant/templates/decision-tree.mjs` | WBS13 · 3.3.3, 3a/3b | decision tree | 5 (1+1+2+choice 1) | 6,203,818,404 |

`checkSpecCitation` returns `null` for all six.

Each template's `quant-check --module <file> --only <id> --draws 5000` prints `all clean`. A combined 6 × 5,000
run also prints `all clean` (30,000 items).

## Specification lines relied on (`audit/raw/bus_spec.txt`)

- 2.3.4 Resource management, line 965. Capacity utilisation formula at 985-986, and "Ways of improving capacity
  utilisation" at 988-989. Productivity is defined as "output per unit of input per time period" at 974-975.
- 3.3.3 Decision-making techniques, line 1146. "Discounted cash flow (net present value only)" is at 1158, and
  "Calculations and interpretations" at 1159-1160. Decision trees are at 1162-1164.
- 3.3.5 Assessing competitiveness, line 1218. Ratio analysis (gearing ratio and ROCE) is at 1229-1235, and labour
  productivity at 1237-1239.
- Appendix 9 formulae, 2397-2450. The income statement chain is at 2405-2415. Capital employed = non-current
  liabilities + total equity is at 2436. Gearing is at 2440-2441 and ROCE at 2447-2450. Line 1063-1066 says Unit 3
  ratios "will not be supplied in the examination".
- QS codes: QS1 at 2267, QS2 at 2270, QS6 at 2281 and QS8 at 2287. The tags are: npv QS6; gearing, roce and
  labour-productivity QS1+QS2; capacity-utilisation QS2; decision-tree QS1+QS8.

## How each draw is built, and what it refuses

Each draw works backwards from its answers, and every answer is exact at the precision its step asks for. There is
one shared quality rule, stricter than check 4:
- A slip must clear the answer even after the student rounds it to the card's dp.
- Two slips on one step may never share a figure. If they did, the feedback would name the wrong method.

`variants` is counted by an exported `countVariants()` in each file. It enumerates the same grid through the same
accept functions that `draw` uses, and all six declared figures equal their counts. Where the space is too large to
enumerate, the accept test is split into parts that take disjoint parameters: gearing (share capital ⟂ current
liabilities) and roce (expenses ⟂ current liabilities, given the loan). That makes the count an exact sum of
products. decision-tree pairs A with B using a binary search over B's net values. That result was cross-checked
against an independent histogram count that calls `pairOk` directly, and the two are identical. The printed stem
determines every parameter, so the number of parameter sets equals the number of stems.

- **npv.** The discount factors are printed to 3 dp, the published-table values held as thousandths. An IAL
  paper supplies them. Cash flows are in $1,000s, so every PV is whole dollars. The investment is drawn within
  ±20% of the total PV, which puts the verdict at 51/49. Refused draws: |NPV| < $1,000; any answer (or its
  magnitude) equal to a printed figure; and the undiscounted-NPV slip equal to the reversed-NPV slip.
- **gearing.** The ratio is drawn first in tenths of a per cent. Non-current liabilities = ratio × capital
  employed, in whole dollars. The side of 50% is drawn first, so the choice is 50/50.
- **roce.** ROCE is drawn first in tenths of a per cent, over 5.0-35.0%. Interest is 4-10% of non-current
  liabilities, so the stem stays plausible. The stem prints interest (the profit-for-the-year slip) and current
  liabilities (the capital slip).
- **labour-productivity.** The % change is drawn first, in 0.5-point steps across ±4.0-25.0%. The workforce
  always changes, so output growth never equals productivity growth. In 1,068 of 5,000 draws output and
  productivity move in opposite directions. Values below 4% are excluded because the "divided by the new figure"
  slip would round onto the answer.
- **capacity-utilisation.** Utilisation is drawn first in tenths, over 40.0-88.0%. The step-3 capacity cut is
  picked from the hundreds that divide 10 × output (so the new CU is exact). The cut is at most 40% of capacity
  and the new CU at most 98%. Refused draws: new CU = target; extra output = a printed figure.
- **decision-tree.** Every printed amount is a multiple of $5,000, and every expected value is drawn not to be.
  That way no answer can equal any printed figure. The net figures differ by $2,000-$30,000 and at least one is
  positive. The cost reverses the gross ranking in 1,707 of 5,000 draws. The choice is 50/50.

## Defects found by reading the answers, not the checks

quant-check was green on both first drafts. The problems only showed in the answer distributions:
- **roce.** The first draft drew operating profit in whole $000s. For any capital employed sharing only a factor of
  10 with 1,000, ROCE could then only be a multiple of 10%. **56% of 5,000 draws answered 10, 20 or 30.**
- **gearing.** The same defect: 50% of draws landed on multiples of 10. Separately, "total equity provides more
  than half" was the right answer in 68% of draws.

Both are fixed by drawing the ratio first. Measured over 5,000 draws, the most common single answer now takes
0.6% (roce) and 0.4% (gearing). **Suggest adding an answer-concentration check to quant-check.** Checks 1-7
cannot see this class of defect.

## Rule-1 notes: DRILLS.md against the IAL specification

- **Gearing threshold.** The spec sets no threshold, although textbooks call gearing above 50% "highly geared". The
  choice therefore asserts only a definitional fact: whether non-current liabilities or total equity provide more
  than half of capital employed. The words "highly geared" appear nowhere.
- **Decision tree.** DRILLS.md puts it in 13.8 as a *diagram*. Here it is arithmetic only, so 3.3.3 3a
  ("Construct … diagrams") is still not drilled. The 13.8 diagram spec is still needed.
- **Market share and growth.** DRILLS.md's 13.3 Business list includes this item, but it was not in my brief and was
  not authored.
- **Labour productivity.** 3.3.5 names it without a formula. I used the spec's own 2.3.4 definition, output per
  worker per month.
- **Terms not in the spec.** "Discount factor", "expected value", "probability" and "net cash inflows" do not appear
  in the spec text. The first three are the unavoidable vocabulary of techniques the spec does name (DCF, decision
  trees). "Net cash inflows" follows the existing `arr` and `payback` templates.

## For the owner of shared files (not changed here)

- **`lib/quant/marking.mjs` `format()`, wrong-answer note.**
  - A negative money answer renders as `$-10420`, with no true minus and no thousands separator. Both npv and
    decision-tree can have negative answers.
  - A multi-word suffix is joined to the number with no space (`500units per worker`). To avoid that,
    labour-productivity uses the suffix `units` and says "in units per worker" in the label.
