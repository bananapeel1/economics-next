# Verify B — packet 39b, `trade-global-economy`, signed out at 390×844

Walked in the main session (the agent cannot reach the Browser pane), 21 September 2026, against
`http://localhost:3001/economics/unit-4/trade-global-economy?draft=1`, viewport emulated at 375×812
with the mobile device profile. Signed out throughout.

**VERDICT: PASS, after one defect found here and fixed.** The defect was a contrast failure no
existing guard could see, and it is now a rule in the runner.

## What the deck looks like now

| | before 39b | after |
|---|---|---|
| chapters | 5 (4 built by 39a + the carried protectionism block) | **10** |
| steps | 30 | **61** |
| Notes topics | 6 | **9** |
| practice questions | 8 | **14** |
| diagrams | 7 | **11** |

The chapter navigator lists all ten with the right titles, in the right order, and 39a's four are
untouched at the front: step 1 still opens on "Why Countries Specialise", chapter 1 of 10.

## The defect this walkthrough found

**The ladder diagram's first rung was `#0b1020` text on a `#64748b` bar: 3.98:1, against the 4.5:1
WCAG minimum for text this size.** These labels render at about 10.9 CSS px, so the minimum applies.
I noticed it by looking, then measured it rather than trusting the impression.

**`npm run contrast` passes on it, and is right to.** That guard reads
`components/learn-mode/processSvg.js` and checks that themed colour declarations resolve through a
token; it does not measure an authored SVG's own `<text>` against the `<rect>` behind it. Nothing in
the programme did.

So the check now lives in the runner, and adding it immediately found four more that I had NOT
spotted by eye:

```
A Tariff: Who Gets What        "c"      1.82:1   light label on a solid amber area
A Quota: the Same Loss…        "rent"   3.11:1   light label on a solid blue area
The Infant Industry Case       "$90"    1.82:1   light label on a SOLID amber region
The Infant Industry Case       "protected"       same region
A Tariff / A Quota / A Subsidy "$20"    3.98:1   SLATE text on the page background
```

Measured across every colour the module uses, on the page background: INK 16, AXIS 7.38, AMBER 8.82,
BLUE 5.15, RED 5.03, GREEN 5.02, MUTED 4.94 — and **SLATE 3.98, the only one below the floor**. On a
solid fill the light label loses everywhere (1.82 on amber, 3.11 on blue, 3.18 on green) and the dark
one wins everywhere (8.82, 5.15, 5.02).

Fixes: `SLATE` became `#94a3b8` (7.38), labels sitting on a solid fill became `#0b1020`, and the
infant diagram's protected region became a 0.16-opacity wash instead of a solid block. Re-measured on
the rendered DOM afterwards: **worst contrast across all 11 diagrams is 4.94:1**, and it is a packet
39a subtitle rather than anything built here.

## Diagram legibility, measured rather than eyeballed

`getComputedTextLength()` and `getBBox()` on the rendered DOM, all 11 diagrams in the Diagrams tab:

```
rendered width 291 px · viewBox 400×360 · effective face 8.7 px to 10.9 px
text leaving the frame: 0 of 11 diagrams, 0 of 144 labels
```

Learn Mode's column is 298 px and gives 8.9–11.2; the Diagrams tab is 291 px and gives 8.7–10.9. Same
convention, slightly narrower column.

**V037 CLOSED WHILE THIS PACKET WAS BEING VERIFIED, and its answer changes how to read these
numbers.** Packet 11 landed it at `91c9eca`, and its own measurement is the same as the one above,
taken independently in another session: "Learn Mode draws an SVG at 298px and the Diagrams tab at
291px, so labels land at 6.98-8.94px against 16px body copy on the BEST-case diagram in the corpus;
85 of 85 live and 239 of 287 staged diagrams have a smallest label under 8px." Its resolution is that
**the full-screen sheet enlarges the whole drawing, rather than a font floor being raised** — so the
400-unit frame and the 15/12 faces stay as they are, and the small rendered size is answered by the
enlarge affordance rather than by shrinking what a diagram may say. Every diagram in this section
carries `Enlarge diagram`, which is that path.

The tariff diagram is the one `accuracy-01` is about, and it renders as intended: both curves, the
$20 world price and $30 tariff price, four shaded areas labelled a, b, c and d, quantity ticks at 20,
40, 80 and 100, and the note reading `300 + 100 + 400 + 100 = 900` above `a to producers, c to the
state, b and d lost`.

## One thing that is not a defect, and is worth knowing

**A signed-out reader of this section no longer gets a pre-test, and that is the documented design.**
`FREE_QUIZ_MAX` is 10 and the section now has TEN chapters, so every free slot is spent giving each
check-in its question and `PRETEST_HEADROOM` gets nothing. `lib/preview-limits.js:99-102` says so in
terms — "at nine or ten the payload is full, so PRETEST_HEADROOM gets nothing and the pre-test does
not run — it hides rather than spoils itself" — and names one section already in that position. This
is the second.

The property that matters is the one it is traded against, and that holds: **10 of 10 chapters
resolve a question in the anonymous payload**. 39a's `verify-draft.mjs` asserted "at least three
pre-test items reached the payload", which was correct for a five-chapter section and wrong for a
ten-chapter one; the assertion is now the documented either/or and fails if the payload is being
spent on neither.

## Console

One `401 (Unauthorized)` on load, which is the session check for a signed-out visitor. No error from
the app's own code and none from any content.
