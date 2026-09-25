# Packet 13.2 — fix round 5

Verify A round 5 confirmed round 4's payback fix closed the two-mark leak (5,000 of 5,000 → 0),
reproduced the A/B exactly, found no regression — and found **one thing that changes what a student
sees**, which is the bar the round was given.

## The fix for round 4's leak introduced a smaller one

`payback`'s last step became a choice between year numbers. The step above it was labelled
**"Months into year 4 before the investment is repaid"**, and the answer to the choice is
**"year 4"**. All steps render at once, so the last mark — 1 of the item's 5 — was free in 5,000
draws of 5,000. Step one's label ("Cash still to be repaid at the end of year 3") eliminated one
of the remaining two distractors as well.

No rejection could fix it: the label named the answer by construction. Three changes did.

1. **The year goes first and no later label names it.** "Cash still to be repaid when *that year*
   begins", "Months into *that year*…". Working out which year the money comes back in is the
   method, not a fact to hand over in a heading — so the item is better for it, not merely safer.
2. **`quant-check`'s own-figure check now finds the first NUMERIC step**, not `steps[0]`. A
   template opening with a choice would otherwise skip check 6 entirely and look green while the
   own figure rule went unexercised. That latent hole went live the moment payback was reordered.
3. **The stem stopped numbering the years.** "year 1 $22,000, year 2 $22,000…" put the digits 1–4
   in the stem, and a payback of 2 months coincided with one in 369 draws of 5,000; "over the next
   **four** years, in order" removed the last of them.

## Checked with the verifier's instrument, not mine

`verify-a-round-4-marker-oracle.mjs` is round 4's own probe: it tokenises every visible field and
hands each token to the real marker, so it is blind to check 7's sign, boundary and formatting
decisions. **Run unchanged against the fix, `payback` is CLEAN** — from 5,000/5,000 on
`verdict.choice1` and `.choice2`, through 369 and then 37 as each stem source was removed, to zero.
Seven of eight templates clean; the eighth row is the "× 100" method-line case the oracle counts
and check 7 exempts by design. `marker-oracle-after-round-5.txt` is the run.

## Round 5's other findings, none of which reaches a student

- **`quant-check.mjs:141` skips a choice step's answer everywhere**, not just in its own choices —
  broader than the reason given beside it. Not live: every choice answer is a string, so
  `Number.isFinite` already excludes them. Recorded rather than changed, because narrowing it
  needs a case to calibrate against and there is none.
- **The small-integer exemption is still defeatable by construction** — a bare small integer in a
  stem, or "6 per cent" written in words — and neither is live today.
- A tautological invariant at `multiplier.mjs:58`, the unscanned meta chips, and the method-line
  exemption being enforced by absence rather than by an assertion.

All four are in `verify-a-round-5.md` and carried into NEXT.md for 13.3.

## Gate after round 5

`npm run quant-check` clean at 200, 2,000 and 5,000 draws · `npm test` 267/267 · build 0 ·
validate 0 · exposure 0 · recalls 0 · the round-4 marker oracle clean on `payback`.
