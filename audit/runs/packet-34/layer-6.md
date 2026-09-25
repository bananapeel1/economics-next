# Packet 34 — Layer 6, adversarial review (Sonnet, 18 September 2026)

Run before publish on a COPY of the staged bundle with two defects planted, so that a brief which
misses its own canary has its output voided. The copy was `audit/runs/packet-34/canary-bundle.json`;
it is not committed, because a bundle with deliberate errors in the repository is a hazard of its own.

**The two canaries**

1. `notes`, "The Possible Benefits", MECHANISMS: the world producer's output changed from 600,000 to
   300,000, so the $70 average cost no longer follows from the arithmetic beside it.
2. `quiz`, the consumer-surplus item: the explanation's working changed from 40,000 buyers to 50,000,
   contradicting its own stem and its own keyed option.

**Both were caught, and they were findings 1 and 2.** The report named the four other surfaces that
disagree with canary 1 (the `economies-of-scale` body, a flashcard, a mistake and another quiz item's
explanation), which is the census working rather than a lucky hit.

## Census it returned

5/5 blocks · 26/26 subsections · 26/26 quiz · 8/8 practice · 25/25 flashcards · 7/7 mistakes · 5/5
diagrams including SVG `<text>` · 4/4 chains + 2/2 evaluation · **146 calculations recomputed** · **68
contradiction pairs examined** · 22/22 spec leaves checked, 0 untaught and 0 taught-but-off-spec ·
26/26 recalls · 26/26 real examples, 0 real companies, countries or years · 0 UK institutions, 0
second currency, 0 uncited examiner claims.

## The one real finding, and what it cost to fix

**A printed ratio that did not divide the printed figures.** The section gave output as $284.3bn and
trade as $221.0bn and then called the ratio 77.8% — the division of the UNROUNDED series, 77.76%. A
student dividing the two numbers in front of them gets 77.7%, and is right. It appeared on ten
surfaces, including both the axis label and the caption of the openness chart, because they are all
generated from one field.

**Nothing in the pipeline could see it, and the reason is worth keeping.** Every figure check in the
runner recomputes a value from the same unrounded source the content used, so all of them agreed with
each other and every one of them was blind to the difference between the derivation and the display.
The fix is in `_packet34-util.mjs`: `openness` now divides the rounded series, so the ratio is the
arithmetic a reader can do on the page. The runner asserts it with the two numbers the page shows,
and the check is A/B'd — reintroducing the unrounded derivation fires two problems.

Cleaned in the same pass: the worked price fall used 30,000 new buyers, so its $0.45m part printed as
$0.5m and its $1.65m total as $1.7m under the one-decimal money formatter. 40,000 new buyers makes
both parts exact.

## The finding that is refused, with the reason

**HIGH: "quiz items 0-2 are referenced by zero blocks", proposed fix "pin them to chapter 1".**
Refused. Those three are the pre-test pool. `PreTest.jsx` slices the UNRESERVED items at three
(`PRETEST_HEADROOM`), so an item pinned to a chapter is no longer available to the pre-test, and
following the fix would leave the pre-test with nothing to offer. Measured on this bundle:
`freeQuizPayload()` returns 8 items of `FREE_QUIZ_MAX` 10, all five chapters resolve a check-in
question, and the unreserved pool is exactly 3. Verify B saw three questions on screen.

The reviewer was reading the wiring rule in `audit/CONTENT-GATE.md` — "every quiz and practice index
referenced by exactly one block" — which predates packet 16's pre-test design and is now wrong as
stated. The validator has been corrected (it reports no finding here); the prose has not. See
DECISIONS, 18 September.

**MEDIUM finding 4 was the real one above.** No other findings were returned.
