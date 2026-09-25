# Packet 13.2 — fix round 2

From Verify A round 2 (`verify-a-round-2.md`), which held six of the seven round-1 fixes, rejected
**D028**, and found two things the round-1 fixes had left or created.

## 1. D028 was rejected, and the rejection is right

Its title asserted two things: that a drill lands on the chapter that teaches it, and that an
unmatched drill *never* lands on the first check-in. Round 1's `payback` fix traded the second away
deliberately — reserving slot 0 left `payback` reaching no student on the only section that carries
it. Round 1's own evidence line ("`:121` starts the spread loop at `i = 1`, so an unmatched drill
structurally cannot take slot 0") had stopped describing the file.

**Marked wont-fix with the reason, and split into D029 and D030**, both claimed and both stating
what the code now does. A confirmation that is no longer true is worse than an open item; so is a
title that quietly means something else than it did when it was verified.

## 2. The Economics forecast leak was only half closed

Round 1 moved `rateNow` out of the stem and left `rateNext` in it. Verify A measured the rest:
every step of a card renders at once, and step three's choices print the fall in points, so
`rateNext + fall` reconstructed this year's growth rate **on screen, in 2000 of 2000 draws** — and
within step one's own 0.05 tolerance.

Worse, and this is the part that makes it more than a leak: `rateNow` could carry two decimals
(6.25%) while `rateNext` was rounded to one, so the feedback read *"6.25% to 5.7% is a fall of 0.6
percentage points"*. **6.25 − 5.7 = 0.55.** The drill was printing a subtraction that does not hold,
in the sentence teaching the student what a percentage point is.

The third arrangement, and the one that has no version of this problem: **both** rates in the QS10
step are drawn, one decimal place each, with the fall exact by construction and neither of them
within 0.1 of the growth rate the student is asked to calculate (`invariants` asserts 0.05, so the
guard is the looser of the two). They live in step three's own label, not the stem, because in the
stem "forecasters expect growth of X% next year" contradicted step two, which asks for next year's
GDP at *this* year's rate. Step three now opens "Forecasters **instead** expect…".

That cost the stem its second varying figure again — the failure mode round 1 hit — so the
constraint that was starving the draw was removed instead: the doubly-applied percentage no longer
has to land exactly on two decimal places, because the step is marked to a tolerance either way.
With four more economies the Economics half now draws from **728 distinct stems**, against 169
before.

`variants` for that template is now the number of stems, not stems × forecast pairs. The pair varies
the item and not the stem, and `quant-check` counts stems — rightly, since the stem is what a student
recognises. Over-declaring told the guard sampling could reach further than it can.

## 3. `payback` still never reached the Quiz tab

Round 1 fixed Learn Mode's placement and left `QuizTab` taking `templatesForSection(...)[0]`, which
is `arr` on the only section that has both. The Quiz tab has no sequence to protect, so it now
renders **every** drill the section has, each with its own attempt counter.

## Gate after round 2

`npm run quant-check` 0 at 200 and 2,000 draws · `npm run build` 0 · `npm test` · `npm run validate`
· `npm run exposure` · `npm run recalls`. D029 and D030 claimed, awaiting round 3.

## Environment, flagged by Verify A round 2 and hit by this session

The machine's disk filled during this round — **280 MB free of 228 GB**, and for a few minutes no
command could run at all, because the harness could not create its own output file. Nothing was
lost. `economics-next/.next` is 2.5 GB and this worktree's is 2.3 GB; the npm cache is 554 MB.
None of them are this session's to delete, and the next session's gate may not survive it.
