# Packet 13.2 — fix round 3, and the defect class the packet actually found

Verify A round 3 confirmed D029 and D030, judged D028's wont-fix honest, found no regression —
and found one more defect, **of exactly the class round 2 claimed to have eliminated**:

> `asPctOfRate` is guarded against `points` but against nothing else, so it can *be* step one's
> answer: the card prints "7.5% — real GDP falls" as a distractor while step one's answer is
> 7.5%, and typing it scores 2/2 without dividing. 99 of 542,810 combinations, ~1 draw in 5,890.

Two lines closed that one. The interesting part is what happened next.

## The probe that reads the card, not the data

The obvious way to check for this is to enumerate the draw's own number sets and compare fields —
which reuses the filter it is meant to test and can only find what that filter already knows.
So `leak-census.mjs` reads the **shipping output** instead: it builds the item and scans every
string a student can see before answering — stem, labels, prefixes, suffixes, choices — for each
step's answer as a standalone number.

It found three more, in templates nobody had suspected, two of them packet 13.1's:

| template | what leaked | rate |
|---|---|---|
| `breakeven` | the variable cost printed in the stem **was** the contribution | 1 in 23 |
| `arr` | the total net return **was** one of the three cash flows | 1 in 21 |
| `payback` | the cash still to repay **was** one of the cash flows | 1 in 12 |
| `ped` | the percentage change in price **was** the new price ($20 → $25 is a 25% rise) | 1 in ~160 |
| `breakeven` | the margin of safety **was** the selling price | 1 in ~1,700 |

**Five of the eight templates**, and every one of them marked a student correct for typing a
number they could see. None of `quant-check`'s six checks could see it, because from inside a
template every figure is correct: it is the COMBINATION of a correct stem and a correct answer
that leaks, and only the rendered card shows it.

## So the check is now in the guard, not in a probe

`audit/scripts/quant-check.mjs`, check 7: **no answer is printed where the student can read it
before answering.** Three exemptions, each with a reason rather than a threshold:

- a **choice step's own answer** — printing it is what a choice is (but a distractor printing
  ANOTHER step's answer is the subtlest case of all, so choices are scanned);
- the **method line** — it is a formula, never data, and "× 100" made every forecast rounding to
  100.0 read as a leak;
- a **bare small integer** (≤ 12) with no currency or per cent marker — "Months into year 4" has
  to say 4, and a payback of 4 months is then unavoidable rather than readable.

Thousands separators are stripped first, or "$6,240,000" reads as printing a 6.

`printed-answer-ab.txt` removes each template's rejection one at a time at 5,000 draws: 229, 758,
254, 417 and 2 printed-answer failures respectively, nothing when they are all in place.

**Two corrections to that A/B, both from Verify A round 4, and both about the evidence rather than
the claim.** Its B1 figure reproduces at 222 rather than 229 — the run is seeded, so the difference
is the draw order moving, not noise. And its B5 hits are both on the `forecast` step, not the
`change` step the round-3 defect was about: at 200,000 draws the two separate into 39 `change`
(1 in 5,128) and 16 `forecast`. The rejection closes both. But 2 hits in 40,000 was offered as
evidence for the `change` leak and is not evidence for it, which is the same error in miniature as
the one this whole round is about — a measurement true of the thing it measured and quoted for
something else.

## Also in this round

- `ped` declares **1,740** number sets, counted by exhaustion rather than multiplied out. Its
  new rejection takes a real bite out of the 2,700 the old declaration assumed, and since
  `quant-check` reads that number to decide how much variety sampling can reach, over-declaring
  fails the variety floor rather than dodging it.
- `breakeven`'s margin of safety gains a rejection where it would equal the selling price. (An
  earlier draft of this file said the margin was "now drawn rather than derived"; Verify A round 4
  checked the diff and it was always drawn. The change is the rejection, and two of its three
  clauses were dead code — a margin of at least 40 cannot equal a contribution of at most 20 —
  so they are gone.)
- The worked solution writes **≈** where its figure is a rounding and **=** where it is exact.
  Dropping `forecastExact` for the Economics half — the change that recovered its variety — makes
  that line a rounding about three times in four, and a solution that writes `=` over a rounding
  teaches a small lie in a template whose whole claim is that its arithmetic is true.

## Gate after round 3

`npm run quant-check` clean at **200, 2,000 and 5,000 draws** · build 0 · `npm test` · validate ·
exposure · recalls.
