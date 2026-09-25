# Packet 2.92 — Verify A (V060), independent method

Read-only, production only (Supabase service key GET requests + `https://revvylearn.com` signed out).
No file in this worktree touched; no write anywhere. Scripts and notes live under my own scratch dir,
not `audit/runs/packet-2.92/` (that directory holds only this file, written by me).

## Method (deliberately not the builder's probe)

Extracted `origin/main` (`fa3d5d1`, confirmed via `git rev-parse origin/main`) `lib/` and
`components/learn-mode/` into my own scratch dir with `git archive`, independent of the copy the builder
used (hash-checked `lib/checkin-placement.js` against `git show origin/main:...` — identical). Read
`lib/checkin-placement.js`, `lib/learn-steps.js`, `components/learn-mode/utils.js`,
`lib/checkin-fallback.js` myself to confirm the real contract (`resolvePinnedItem`, `resolvePinnedDiagram`,
`decidedNoQuestion`, `matchDiagramsToBlocks`) before writing anything, rather than trusting the builder's
comments about it.

Wrote my own script (`check.mjs`, not copied from `audit/runs/packet-2.92/live-pins.mjs`) that:
- fetches all 8 tables for all 8 sections directly over PostgREST,
- diffs **all 8 tables** against the bundle (the spec text says "any other differing path fails" — the
  builder's probe only hard-fails on the 4 tables a check-in reads and downgrades the rest to notes; my
  script checks all 8 and found no diffs anywhere outside the two confirmed exceptions),
- also flags a block that still carries a legacy `diagramRef` with no `diagramId` (a case the builder's
  hand-rolled pin reader can't see, since it only reads `diagramId`) — none found,
- also flags a quiz slot filled with no pin field present at all (i.e. the V026 vocabulary fallback firing,
  which looks like a pin on screen but isn't one) — none found across 56 check-ins,
- runs production's real `placeChapterItems`/`buildSteps` for both a Pro bank (whole live tables) and a
  signed-out bank (the live `/api/sections/<id>` payload), and cross-checks free-reader-shown against
  Pro-reader-shown per chapter.

Output: `8 sections checked, 0 problem(s) total` (all 8 sections, all 56 check-ins, all three item kinds).

## Hand checks, no script

- **types-sizes-businesses "none-to-place" exemption (ch4, "Constraints on Growth and Its Impact")**:
  pulled `section_content.data` and `section_diagrams.data` directly. Chapter 4 (index 3) has no
  `diagramId`/`diagramRef`; the other 5 chapters each carry a distinct `diagramId`
  (`700a5f13`/`32abe8ef`/`cb26fb4e`/`17cf2e3e`/`d5e500fa`), which are exactly the 5 rows in
  `section_diagrams`. Every diagram is claimed once; chapter 4 has nothing left. The exemption is real,
  not a script artefact.
- **V036 (globalisation, confirmed under packet 2.7)**: live `section_practice.data[5].guidance` reads
  "...so weighing the competing effects in a sentence or two is required, and a full evaluation is not."
  The bundle (`packet-33-bundle`) reads "...so a short conclusion is required rather than a full
  evaluation." Live carries the fix; matches V036's own evidence text.
- **V031 (market-structures-contestability, confirmed under packet 2.7)**: live
  `section_diagrams.data[6].scenarios[2].svg` has 11 `<line>` elements and an `MR` label; the bundle
  (`packet-29-bundle`) has 9. Matches V031's own evidence ("now carries 11 lines, and the two dashed ones
  are MR").
- **Ledger status of both exceptions**: `ledger.mjs show V036` / `show V031` — both `status: confirmed`,
  `packet: 2.7`. The two allowed bundle diffs are not the builder's assumption; they're closed findings.

## Live walkthrough, a different section from the builder's Verify B

Builder's `verify-b.md` covered `business-objectives-strategy` chapter 1. I covered
`types-sizes-businesses` chapter 1 instead, on `https://revvylearn.com/economics/unit-3/types-sizes-businesses`,
signed out, mobile viewport, "Just teach me" (skip pre-test).

Predicted from the API before opening the browser (`block[0]`: `quizIndices:[0]`, `practiceIndices:[0,1]`,
`diagramId: types-sizes-businesses:diagram:700a5f13`): diagram "The Five Types of Business", quiz "A
state-owned enterprise is best defined as an organisation that is:", practice "Define the term
'co-operative'. (2 marks)".

Step 5 of 30, "CHAPTER 1 OF 6 · Types of Business · Chapter check-in", showed exactly those three: the
named diagram, the named quiz question with its four options, and the named worked example, Pro answer
behind the lock. Console showed the same signed-out `POST /api/learn-mode/state → 401` the builder saw and
dismissed — expected, unrelated to pins.

(Note for whoever reads this: this app's Learn Mode scroll-jacks — a wheel-scroll or End/Home keypress can
silently jump a whole step in either direction depending on gesture size, so don't trust scroll position to
tell you which step you're on. The footer Next/Back buttons are reliable; a tall custom viewport
(`resize_window` with a large height) that fits a whole step without scrolling sidesteps the problem
entirely.)

## Verdict

All five acceptance checks pass by two independent methods (script + hand) plus one independent visual
walkthrough. V060 confirmed.
