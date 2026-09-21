# Packet 38 — Verify B, the student walkthrough

390 × 844, storage cleared, signed out, `?draft=1`, walked step by step on the dev server at
`localhost:3001`. The acceptance script is the one in this packet's spec block in `NEXT.md`.

Two of the eight checks are recorded as FAILED or QUALIFIED, and neither is this packet's to fix.
Both are written up with the measurement that settles whose they are.

## 1 · The pre-test asks three questions — PASS, with a finding underneath it

Seven blocks keeps the pre-test at three. Composed from the shipping functions over the STAGED
draft (`audit/runs/packet-38/pretest-probe.mjs`), and by `audit/scripts/exposure-census.mjs`
independently: `macroeconomic-objectives-policies  pin  7  7  10  39  3` — seven chapters, **all
seven served a check-in question**, ten quiz items sent to a signed-out reader, a bank of 39, and a
**three**-question pre-test. `npm run exposure` exits 0 with 0 starved chapters.

**None of the three is about the Phillips curve**, which is what the acceptance script asked and
what `quiz-01` is about.

**But two of the three are pinned to chapters the student has not reached** — chapters 2 and 3:

```
SIGNED OUT — steps 37 · check-ins 7 · quiz sent 10 · pre-test 3
  1. A government collects $228bn in tax and spends $260bn. Its budget position is a:   (ch 1)
  2. Which pair correctly matches a policy to whose decision it is?                     (ch 2)
  3. Which is NOT one of the monetary policy instruments named in this topic?           (ch 3)
PRO — pre-test 3, all three from chapter 1
```

**A/B'd before blaming this packet** (`audit/runs/packet-38/pretest-ab.mjs`). The control is the
LIVE copy of this same section, and then every other section in both corpora:

| corpus | sections whose signed-out pre-test asks about an unreached chapter | premature questions |
|---|---|---|
| `data` (live) | **22 of 43** | 44 |
| `draft` (staged) | **29 of 43** | 58 |

`macroeconomic-objectives-policies` reads **`(5 ch): 2 of 3 — ch2, ch3` live** and
**`(7 ch): 2 of 3 — ch2, ch3` staged.** Identical. The rebuild neither caused it nor cured it, and
the signature `2 of 3 — ch2, ch3` is the same on every affected section in both corpora.

The mechanism is the one packet 25 measured from the other end: `freeQuizPayload()` takes
`PREVIEW_LIMITS.quiz` (2) for the Quiz tab FIRST, then one pin per block, and only then tops the
pre-test up. Those two Quiz-tab items are not chosen for chapter, so they are what the pre-test
falls back on. Packet 2.5 / V021 closed "the pre-test asks a question a check-in will ask"; this is
the neighbouring defect — *the pre-test asks a question from a chapter you have not opened* — and it
is invisible to `npm run exposure`, which counts pre-test LENGTH and not what the questions are
about. **A code finding, programme-wide, owned by no packet. Logged for the next code packet.**

## 2 · Chapter 1, step 1 — PASS

`STEP 1 OF 37 · CHAPTER 1 OF 7 · What Governments Are Aiming At · part 1 of 6 · Economic Growth`.
Key Idea is the rebuilt one. The live section's invented **UK 2% growth target** (`topFix-04`) is
gone: 0 hits for it in the served draft.

## 3 · Every chapter is served a check-in question — PASS

Seven chapter dots with the correct seven titles read out of the DOM:
`Chapter 1: What Governments Are Aiming At` … `Chapter 7: Conflicts Between Objectives`.
`served 7` of `ch 7`, `starved 0`.

## 4 · The chapter-7 diagram renders — PASS

It renders **inline at 307 CSS px** on step 37 (`viewBox="0 0 400 300"`, 9 text nodes). That is the
~313px Learn Mode column the 400-unit frame was authored against, so a 15-unit label lands at
11.5px and a 12-unit one at 9.2px. Four diagrams rendered nothing at all on the live section
(`structure-01`); seven render here, one per chapter.

## 5 · The enlarge view at 390px — QUALIFIED PASS, and it is NOT packet 37's defect

Measured in the browser with the sheet open:

```
inline 307px · modal svg 789 × 592 · pane client 390 / scroll 882 → 492px hidden
smallest label in the sheet: 12 CSS px · document scrollWidth 390 = viewport (no page scroll)
```

**789px and "492 of 882 hidden" are the exact numbers `DECISIONS.md` already records** for the
full-screen sheet (packet 31, 17 September), where that measurement was explicitly ruled to
*correct* packet 29's note that had called it a defect. `InlineDiagram.jsx:56-58` says so in the
source: the sheet draws at twice the viewport width on purpose, so labels that are 9px inline
become 12px and legible, and it prints its own hint — "Pinch or scroll to zoom".

So the horizontal scroll is the design, not a regression. What matters pedagogically is whether the
comparison the diagram exists to make survives the initial view, and here it does: **both marked
points — 6% unemployment at 3% inflation, and 4% at 5.5% — and the arrow between them are visible
without scrolling.** The curve's tail, the `SRPC` label and the x-axis caption are to the right.
That is a real cost and it is the open item **V037**, not this packet's.

Packet 37's blocker measured **858px** on the same 390px phone; this is 789. The difference is
aspect ratio, not a fix, and this packet does not claim to have fixed V037.

## 6 · The last step does not say "Before the next chapter" — **FAIL**

It does.

```
STEP 37 OF 37  ·  Chapter check-in
"Before the next chapter: the diagram, a quick question and one thing from earlier."
```

There is no next chapter. This is the third defect in packet 37's Verify B report, still open, and
it reproduces here because it is not content: **`components/LearnModeTab.jsx:560`** returns that
sentence unconditionally. `blockCount` and `step.blockIndex` are both already in scope ten lines
above it (`:549-550`), so the condition it needs is to hand. It affects every section with a
check-in on its final chapter, not just this one.

**Not fixed here.** It is a code change across all 43 sections and it belongs to the packet that
owns `LearnModeTab`, not to a content packet. Recorded, with the line.

The Next button itself is correct: on step 37 it reads **"Complete topic ✓"**, not "Next".

## 7 · No horizontal page scroll — PASS

`document.documentElement.scrollWidth` is 390 against a 390px viewport on every step walked,
including with the diagram sheet open.

## 8 · Console

No errors from the section during the walk.

---

## What this walkthrough could not verify

- **Signed in and Pro.** Everything above is the signed-out path. The Pro pre-test was checked by
  composing the shipping functions (three questions, all chapter 1) but not walked on screen.
- **The Notes tab.** It is server-rendered from the `data` column, so it still shows the OLD
  section and will until publication (DECISIONS, 16 September). The rebuilt notes were verified
  against the `draft` column instead, in `audit/runs/packet-38/verify-draft.mjs`.
- **The diagram at other viewport widths.** Only 390px was measured.
