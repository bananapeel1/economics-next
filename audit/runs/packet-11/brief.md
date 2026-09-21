# Packet 11 — V037: diagram labels are 7–9 px on a phone

Measured 21 September 2026 at **375×812**, not 390. 390 is the best case and the 12px figure this
sheet was tuned to has been quoted unbounded by packets 37 and 38; at 375 the same label is 11.55px.
Every modal number below was read after asserting `lm-diagram-modal-visible` is present and the
sheet's transform is the identity matrix, with computed width recorded beside rect width — the
0.92-artefact guard that packet 38's Verify B missed (it published 789 for an 858 sheet).

## What is actually true

**E1 · Inline is illegible and cannot be fixed by scaling.** Learn Mode renders the SVG at **298px**
inside a 375px viewport. On `supply — Supply Curve: Movements and Shifts`, the *best-case* diagram in
the corpus (500u frame, 12u smallest face), labels measure **7.15–8.94px** against 16px body copy.
The corpus worst case (500u/7u) is 4.17px. Census: **85/85 live and 239/287 staged** diagrams have a
smallest label under 8px; 372/372 are under 12px.

**E2 · The Diagrams tab has no enlarge at all.** `components/DiagramsTab.jsx` renders
`.diagram-svg-wrapper` with no click handler, no modal, no hint — measured at 375px: **291px wide,
labels 6.98–8.73px, 0 clickable wrappers, 0 enlarge hints, `cursor: auto`**. The tab whose entire
purpose is diagrams, advertised on the section hub as "Diagrams · All annotated", is the one surface
with no way to read the annotations. This is not in V037's write-up; it is the larger half of it.

**E3 · The enlarge sheet cannot show the whole diagram.** Fixed `220vw` = **825px in a 369px pane →
43.5% visible, 480px hidden**. `visualViewport.scale` is pinned at 1, so pinch cannot zoom *out*, and
the only control in the sheet is Close. On the supply diagram the two shifted curves — the comparison
the diagram exists to make — are off-screen, and there is no way back to the whole without closing.

**E4 · `220vw` is the wrong unit, and it misses its own floor on two frames at 375px.** It was tuned
for 500u/7u — the comment that set it says "the smallest authored label, 7 units on a 500 box, is 12px
here at 390px", and it is, *at 390*. At **375 that same label is 11.55px**, so the frame the constant
was tuned for does not clear the floor on the width most phones actually are. The other miss is
**1010u at 7.35px — barely better than the 6.98px inline**. Meanwhile 400u/12u gets 24.75px and is
charged ~470px of scroll for text that was never at risk. The corpus spans **400u x30, 440u x64,
500u x197, 526u x1, 560u x79, 1010u x1**; F088's census that justified 220vw ran on 14 September over
`data` only, when every live viewBox was 500 wide, and authoring moved to 440u on 18 September and
400u after that — all of it staged in `draft`, where the census never looked. Legibility is a property
of `face/vbW`, not of the viewport.

**E5 · The hint is untrue.** "Pinch or scroll to zoom" — scrolling pans; it does not zoom. Nothing
signals that the drawing continues past the right edge.

## What this packet does NOT do

- **No font floor.** F088 tried two and both were a relayout: 1/28 of the viewBox raised 1,419 of
  1,420 labels; 1/36 still raised 1,281 of 1,377 and put 18 overlapping pairs on a diagram that had
  none, because a label's size and its neighbours' positions were authored together. Every change
  below is a *uniform scale*, which cannot overlap anything.
- **No widening of the inline diagram.** 298→351px is available (20% of the screen is card padding)
  but takes the best case from 7.15px to 8.4px — still illegible, so it is churn, not progress.
- **No content or DB writes.** No section is touched; `audit/content-sections/` is not restored from.

## The fix

1. **Extract the sheet** into `components/learn-mode/DiagramEnlarge.jsx` so both surfaces share it.
2. **Per-diagram width.** The sheet sizes the drawing from the diagram's own geometry —
   `12px × vbW / smallestFace`, floored at the pane width and capped — instead of `220vw`. Every
   frame size hits the 12px floor, including 1010u; frames that do not need 825px stop asking for it.
3. **A zoom control with a Fit stop**: Fit / Read / Closer. **Fit is the state that is currently
   unreachable** and is what a matrix or a two-curve comparison needs.
4. **Give DiagramsTab the same tap-to-enlarge.**
5. **An honest hint and an overflow cue.**

## Acceptance checks (375×812, signed out)

- **V037** — umbrella.
- **V046** — Diagrams tab: every diagram card is tappable and opens the sheet.
- **V047** — the sheet exposes a Fit stop that puts the whole drawing inside the pane
  (`scrollWidth <= clientWidth + 1`).
- **V048** — at the Read stop, the smallest authored label measures ≥ 12px at 375px on every frame
  size in the corpus, 400u through 1010u.

Walkthrough script: `/economics/unit-1/supply` at 375×812 → Learn Mode → Next ×3 → step 4 diagram →
tap → Fit → Read → Closer → close. Then the Diagrams tab → tap the first card → same three stops.
