# Packet 38 — Verify B, the student walkthrough

390 × 844, storage cleared, signed out, `?draft=1`, walked step by step on the dev server at
`localhost:3001`. The acceptance script is the one in this packet's spec block in `NEXT.md`.

**Three of the eight checks FAILED, and none is this packet's to fix.** Check 5 was originally
recorded as a qualified pass on a measurement that was wrong; it is corrected below, and the
correction is the most useful thing in this report.

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

## 5 · The enlarge view at 390px — **FAIL. Packet 37's blocking defect reproduces exactly.**

**This section originally recorded a qualified PASS at 789px and it was wrong.** The correction is
below the measurement, because the measurement is the point.

Measured with a REAL tap, `lm-diagram-modal-visible` present on the backdrop and the modal's
transform asserted as the identity matrix before any rect was read:

```
svg computed width 858px · rect 858 × 644
pane clientWidth 390 · scrollWidth 882 · 492px hidden
smallest label in the sheet 12 CSS px · document scrollWidth 390 (no page scroll)
44% of the drawing visible · 5 of 9 labels off-screen
hidden: the title, "Unemployment (%)", "SRPC", the "6%" tick, the caption
```

**And the 12px is a 390px figure only.** `F088`'s own evidence field bounds it: *"the 12px claim
holds at 390 only; at 375/360px those 11 labels are 11.55/11.09px (pinch-zoom covers it)."* Every
"smallest label 12px" in this report and in packet 37's is measured at 390. On a 375px phone the
smallest authored labels fall below 12. This report did not measure 375.

**858 is `220vw` at a 390px viewport** — `app/globals.css:6071` and `:7559`. It is a viewport unit,
so it is the same number for every diagram in every section, whatever the viewBox. And **44% is
packet 37's own figure verbatim**: "At 390 px the student sees the left 44% of the drawing."

### The error, because it is the more useful half

The first run of this check opened the sheet with a scripted `element.click()`. That mounts the
modal but never applies `lm-diagram-modal-visible`, so it sits at its resting
`transform: matrix(0.92, 0, 0, 0.92, 0, 0)`. `getBoundingClientRect()` returns the **transformed**
box — 789 = 858 × 0.92 — while `getComputedStyle().width` said 858 the whole time. The two
disagreed and nothing looked at both.

On that reading this report claimed a qualified pass, claimed the figure differed from packet 37's
858, and claimed **"both marked points and the arrow between them are visible without scrolling"**.
The 6% tick is one of the five hidden labels. That sentence stated a scope it had not measured,
which is the exact failure class this programme is currently writing into `BRAIN.md`, produced by
the session that helped phrase it.

**The guard, for any Verify B that measures rendering:** a scripted click opens a modal without its
entry animation, so any `getBoundingClientRect()` taken afterwards is silently scaled. Tap as a
student does; assert the visible class and an identity transform before reading a rect; and record
`getComputedStyle().width` beside `getBoundingClientRect().width` so a mismatch is visible rather
than silent.

### What this does and does not mean for the packet

It is **V037**, filed on packet 11, programme-wide, and reproduces on every section with a diagram —
it is not caused by this packet and no content packet can fix it. Packet 36's precedent holds: a
walkthrough complaint about rendering is not a rejection until it has a baseline. The packet's gate
stands.

What changes is the claim. Packet 38 does **not** show the sheet behaving better than packet 37's,
does **not** narrow V037, and offers packet 37's gate nothing. The open question is the original
one: whether a sheet showing 44% of a drawing at 12px labels is acceptable.

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
- **The diagram at other viewport widths.** Only 390px was measured. Since the sheet is sized in
  `vw`, a different viewport gives a different number by construction.
- **Whether the other six diagrams' sheets differ.** Only the chapter-7 Phillips curve was
  re-measured after the artefact was found. They are sized by the same `220vw` rule, so they should
  all be 858 at 390px, but that is an inference and not a measurement.
