# Verify B — packet 39a, `trade-global-economy`, signed out at 390×844

Walked in the main session (the agent cannot reach the Browser pane), 21 September 2026, against
`http://localhost:3001/economics/unit-4/trade-global-economy?draft=1`, viewport emulated at 375×812
with the mobile device profile. Signed out throughout — the Pro surfaces are the founder's pass.

**VERDICT: PASS.** No defect attributable to this packet. Three pre-existing issues seen and named
below, none of them introduced here.

## What was walked

| step | what was checked | result |
|---|---|---|
| landing | the section card | **stale on the server, correct after hydration** — see below |
| pre-test | three questions offered and answered | all three are this packet's unpinned items, all on taught material |
| 1 | chapter 1 part 1 of 5 | "Why Countries Specialise", key idea as authored |
| 6 | chapter 1 check-in | diagram **The Gain From Specialising**, quiz, practice |
| 14 | chapter 2 check-in | diagram **Share of world exports**, quiz, practice |
| 22 | chapter 3 check-in | diagram **Two indices, one ratio**, quiz, practice |
| 27 | chapter 4 check-in | diagram **Price up, volume down, revenue down**, quiz, practice |
| 30 | chapter 5 check-in (the CARRIED block) | diagram **Welfare Effects of a Tariff**, quiz, **practice** |
| 30 | end of deck | 100%, "Complete topic ✓" |

**Five chapters of five resolve a diagram, a question AND a practice item.** Step 30 is the one that
mattered: chapter 5 is the live protectionism block, which this packet wires but does not rewrite.
`LearnModeTab.jsx:255` decides `hasRefs` for the whole section, so an unwired block in a wired
section would have fallen to the title fallback for its diagram, `fallbackItemForBlock` for its quiz
and **nothing at all** for its practice. It resolves all three.

## Diagram legibility, measured rather than eyeballed

`getComputedTextLength()` and `getBBox()` on the rendered DOM, on each of the four check-in diagrams
this packet authored:

```
rendered width 298 px · viewBox 400×360 · scale 0.745
effective face 8.9 px (secondary) to 11.2 px (anything a student must read)
text leaving the frame: 0 of 14, on every one of the four
```

Packet 37 measured 11.7 / 9.4 on a 313 px column with the same 400-unit convention; 298 px gives
11.2 / 8.9, which is the same convention at a slightly narrower column and not a change in it.
**V037 on packet 11 — whether the convention itself is right — is still the open item.**

The first measurement I took was wrong and is worth recording: `getComputedStyle(text).fontSize`
inside a scaled `viewBox` returns the AUTHORED unit, not the rendered size, so it reported 12–15 "px"
for faces that render at 8.9–11.2. Multiply by `renderedWidth / viewBoxWidth` or the number means
nothing.

## The gain diagram, which is what `topFix-03` is about

Chapter 1's check-in draws grain 80 → 100 and cloth 50 → 50: **one bar pair moves and the other is
identical**, so the gain needs no trade-off to justify it. The live diagram it replaces showed the
ambiguous full-specialisation result. The note under the chart states the alternative
("Complete specialisation gives 120 grain and 40 cloth — a trade-off, not a gain"), and
`Tap to enlarge` is present.

## Three things seen that are NOT this packet's

1. **The server-rendered shell ignores `?draft=1`.** The landing card first paints the LIVE counts —
   "6 steps · 4 topics · 5 questions" — and corrects to the draft's "30 steps · 6 topics · 8
   questions" only after hydration. Confirmed again, third packet running (33, 37, this one). A
   walkthrough that reads the shell rather than the hydrated page reads the wrong section.
2. **V006: "Before the next chapter" on the LAST chapter.** Step 30 is chapter 5 of 5 and still
   promises a next chapter. Live behaviour, reported by packets 33 and 37 as well.
3. **The carried tariff practice item says `Explain … 6 marks`.** `tariff-census.json` gives IAL
   Economics `Explain` as **4**. It is live today and it is `topFix-05`'s tariff clause, which this
   packet assigned to 39b — but note that 39a's wiring pins it to chapter 5, so it is now the last
   practice item a student meets. Worth doing early in 39b.

## Guided practice: no mark scheme over an empty box

The one practice item rendered on step 30 was in **QUICK CHECK** mode — "You're on your own — write
it, then mark it" — with the scheme behind `Reveal mark scheme ▼`, not printed above the answer box.
A static approximation of `getPracticeMode` disagreed with the rendered page about which items are
guided, so the page is what this report records. The validator's own `practice.opening` rule reports
the two CARRIED items as DEBT and none of this packet's six, which is the check that models the
component.

## Console

One `401 (Unauthorized)` on load, which is the session check for a signed-out visitor. No error from
the app's own code, and none from any content on any step walked.
