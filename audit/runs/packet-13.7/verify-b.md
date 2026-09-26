# Verify B — packets 13.7 and 13.8, 390×844, signed out (26 September 2026)

Walked in the Browser pane on a clone of the worktree served on :3017. Every curve move, point and
shading below is a real tap at a point computed from the SVG's own screen transform; JavaScript was used
only to press Next between Learn Mode steps and to read the page.

## Legibility first, because it failed

The first measurement (Diagrams tab, `price-determination`, subsidy drill) found the canvas at **271px
wide rendering a 560-unit viewBox at scale 0.484**: tick labels 4.8px, point labels 5.6px, curve labels
7.3px. Fixed with a narrow frame that matches the canvas 1:1 (`lib/diagram/view.mjs` plotFor). Re-measured
on the same page: viewBox 271×285, scale 1.0, ticks **10px**, point labels **11.5px**, curve labels
**15px**; document width 390.

## 13.7 — Learn Mode, a derived drill at its check-in

`/economics/unit-1/price-determination`, storage cleared, Learn Mode from step 1. Step 30 of 35, the
check-in after "Indirect Taxes": "Before the next chapter: a quick question, the diagram and **a diagram to
draw from memory**." Skipped the question (real tap). The spaced slot reads "DRAW IT FROM MEMORY · Indirect
tax in a competitive market"; canvas 291px, viewBox 291×306. Tapped the supply curve, "Shift up and left"
×6, Next, tapped the new equilibrium, tapped inside the triangle, Mark: **4/4** — "Supply curve shifted up
by 30. Point marked at quantity 35, price 85. Shaded: Welfare loss. Marked: 4 out of 4."

**Defect found and fixed in this walk:** "P₁ 70" was placed across the dashed guide from P₂ 85 and read as
struck through. The label solver kept labels off curves but not off the guides. Guides are now line
obstacles owned by their own point's labels (`lib/diagram/layout.mjs`, `view.mjs` lineObstacles). A/B on
the solver with estimated boxes: on the 271 and 291 frames P₁ crossed a P₂ guide before and does not
after (the 560 frame never did); in the browser after the fix, none of the four point labels has a guide
through it. Regression test in `lib/diagram-specs.test.mjs`.

## 13.7 — Diagrams tab

Same section: "Practise drawing this" sits under "Indirect Taxes: the Wedge, the Split and the Revenue"
and under "Subsidies: the Wedge in Reverse" (the first version matched without plural folding and gave the
subsidy drill a card of its own). Subsidy drill: supply "Shift down and right" ×6, Next, tapped (65, 55),
shaded the triangle, Mark: **4/4**.

## 13.8 — a Business drill

`/business/unit-2/financial-planning`: the tab bar includes Diagrams; one "Practise drawing this", under
"Melaka Bottling: the break-even chart". Tapped the TC line, "Shift up and left" ×4 (the $800 rent rise),
Next, tapped the break-even point (3,500 loaves, $7,000), tapped inside the loss triangle, Mark: **4/4**.

**Copy defect found and fixed:** the point feedback and the chart labels read "$ 7000" and "BE₂ 3500";
they now read "$7,000" and "BE₂ 3,500" (`glyphValue` in `lib/diagram/shape.mjs`); Economics labels are
unchanged ("P₂ 85 and Q₂ 35").

**Left, and said:** at 390px the "TC₂" label sits on the TR line near the top-right, where the two lines
converge; the solver found no line-free spot there and fell back, as it is designed to. Legible (the
label has a halo), not ideal.

## Not walked

The other eight drills were not walked in a browser; `npm run diagram-check` proves each (model full
marks, the wrong way loses exactly the direction mark, regions disjoint and covering, labels clear on the
271, 256 and 560 frames) and `audit/runs/packet-13.7/placement-census.mjs` shows where each lands.
