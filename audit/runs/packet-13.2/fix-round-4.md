# Packet 13.2 — fix round 4

Verify A round 4 audited the guard that came out of round 3, found no regression in the twelve
confirmed ids — and **defeated one of check 7's three exemptions, at 100% of draws.**

## 1. `payback` printed its own answer in two of three choices, on every draw

The last step offered the whole period: "3 years 7 months" against "4 years 7 months" against
"3 years 5 months". The month count is the answer to the step above it, and it was on the screen
by construction. Round 4 measured the attack — **type the month that appears twice, score 2 of 2,
in 5,000 draws out of 5,000, with no arithmetic.**

Check 7 could not see it, and the reason matters more than the instance: its small-integer
exemption was written for the *coincidence* of "Months into year 4" in a label, and a month count
is a small integer. **A number in a choice is never a coincidence** — choices are built from the
answers. So the stem and the labels are now scanned with the exemption and the choices without it.

The step itself is now about the year alone, which is the off-by-one it exists to test: payback
falls DURING the year that clears the balance, not at the end of the year before.
`choice-exemption-ab.txt`: the whole-period choice restored fails **5,000 of 5,000** against the
guard as it now stands, and passes clean against the guard as it was.

## 2. Two more blind spots in check 7, both found by round 4 rather than by me

- **`acceptAbs` was ignored.** An elasticity of −0.4 is marked correct as 0.4, so a card printing
  "0.4" leaks it. Searching only the signed form saw 758 of `ped`'s leaks where the template's own
  invariant saw 1,082.
- **The right boundary excluded a full stop**, so the same leak fired mid-stem and went silent at
  the end of a sentence — 151 of `payback`'s 568. Character classes are now lookarounds.

## 3. Things I had claimed that were not true

- **`index-numbers` had the identical `=`-over-a-rounding defect** that round 3 fixed in
  `percentage-change`, untouched, in 4,779 draws of 5,000. The `exactly` helper has moved to
  `format.mjs` so there is one copy and 13.3's templates inherit it.
- **"breakeven's margin is now drawn rather than derived" was wrong.** It was always drawn; the
  change was the rejection. Round 4 read the diff. Two of that rejection's three clauses were also
  dead code — a margin of at least 40 cannot equal a contribution of at most 20 — and a guard
  clause that cannot fire is worse than none, because it reads as protection. Gone.
- **`printed-answer-ab.txt`'s B5 evidence is misattributed.** Both its hits are on the `forecast`
  step, not the `change` step the round-3 defect was about; at 200,000 draws they separate into 39
  and 16. The rejection closes both, so the claim holds — but the number quoted for it was a
  measurement of something else, which is the same error in miniature as the one the round is about.
  Corrected in `fix-round-3.md` rather than quietly restated.
- **`payback` printed "1 years 7 months"** in 1,116 draws of 5,000 — in the *correct answer*
  string, not a distractor. Pluralised.

## 4. Stale evidence on three confirmed ids, left for a verifier

`D007` cites `ped`'s variants as `5*3*6*5*6`, which is now a counted 1,740; `D019` cites
`quant-check.mjs:149-164` for the variety floor, now `:179-207`; `D006` cites `:66-79` for the slip
check, now `:81-99`. All three still hold in substance. **The builder does not rewrite verification
evidence** — that is the line the programme drew after a bookkeeping agent authored a fix — so they
are recorded here and in NEXT.md for the next verifier to correct.

## Gate after round 4

`npm run quant-check` clean at 200, 2,000 and 5,000 draws · `npm test` 267/267 · build 0 ·
validate 0 · exposure 0 · recalls 0.
