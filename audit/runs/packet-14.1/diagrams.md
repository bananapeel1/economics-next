# Packet 14.1 — diagram label moves (scripts/_packet14-diagrams.mjs only)

Guard: `node scripts/packet-14-decision-making-techniques.mjs` (dry run). Before: 11 diagram lines in PROBLEMS.
After: 0 (PROBLEMS 32 → 21; the 21 left are quiz length tells, recall.recoverable and practice.opening, not diagrams).
No word, number, colour, id, font size or frame changed; nothing removed. Draggable labels (Decision node,
Chance node, Payoffs) not moved. Stacked pairs now ≥ 1.3 × face apart.

| Diagram | Label | Old x,y | New x,y | Why |
|---|---|---|---|---|
| Sales forecasting / MA | "Trend, extended into the future" (+ its dashed swatch 88→102) | 114,92 | 114,106 | sat on the 70 gridline (y 92); now 6 units below it |
| Sales forecasting / MA | "February = (40 + 46 + 43) ÷ 3 = 43.0" | 114,108 | 114,122 | follows the row above; still clear of the sales line |
| Sales forecasting / MA | y ticks 40–80 | 62,· | 58,· | "80" touched the y-axis arrowhead (guard cannot see markers) |
| Sales forecasting / MA | month ticks J…F | ·,314 | ·,319 | last "F" sat under the x-axis arrowhead |
| Sales forecasting / scatter | y ticks $100k–$400k | 62,· | 58,· | "$400k" touched the y-axis arrowhead |
| Sales forecasting / scatter | x ticks $0k–$50k | ·,314 | ·,319 | "$50k" sat under the x-axis arrowhead |
| Payback | "+$10k" (year 3 point) | 360,126.4 | 360,116.4 | touched the rising cash-flow segment; 20 above its dot now, 9 clear of the line. Left-of-dot was tried and rejected: it sat over the red payback dot and read as its value |
| Payback | "The line crosses zero here:" | 354,181.3 | 354,170.3 | pair lifted so the second line clears the −$40k gridline (190.9) |
| Payback | "the cost is recovered" | 354,193.3 | 354,182.3 | was on the −$40k gridline; spacing 12 = 1.33 × 9 |
| Decision tree | "cost $200,000" | 120,180 | 120,181 | stacked at exactly 1.2 × face under "Launch cold brew"; now 1.3 |
| Decision tree | "cost $20,000" | 72,244 | 72,245 | same, under "Licence the recipe" |
| Decision tree | "High demand 0.6" | 300,68 start | 316.5,62 middle | centred on its branch midpoint, above the rising branch (≈4 clear) |
| Decision tree | "Low demand 0.4" | 300,138 start | 316.5,143 middle | below the falling branch (≈4 clear) |
| Decision tree | "Strong uptake 0.5" | 300,208 start | 316.5,200 middle | above the rising branch (≈4.5 clear) |
| Decision tree | "Weak uptake 0.5" | 300,278 start | 316.5,284 middle | below the falling branch (≈4.4 clear) |
| Critical path | "float 2" (under C) | 200,248 | 200,249 | 1.2 → 1.3 × face under "C (2)" |
| Critical path | "float 2" (under E) | 350,248 | 350,249 | same under "E (3)" |
| Critical path | "A (2)" | 110,164 | 110,157 | its right half sat on the red arrowhead (marker, invisible to the guard) |
| Critical path | "F (1)" | 425,164 | 425,157 | sat on the red arrowhead into node 6 |

## What the guard cannot see (checked by rendering every view and by a circle/arrowhead/rect scan)

- Markers scale with stroke-width (markerUnits default), so the critical-path arrowheads are ~31 units long;
  F's shaft (36 units) is almost all arrowhead. Labels are now clear; the size itself is a marker choice, not
  a label, so it is left alone.
- EST/LFT/number text inside the node circles is intended; the arrow tips into nodes 3 and 5 stop at the
  circle edge, a few units from "5" and "9", outside the circle, not over the text.
- White labels inside the contribution bars sit wholly inside their rects; no text crosses a rect edge.
- Rotated y-axis titles are not measured by the guard; rendered, none touches a tick label.

## Follow-up: arrowhead size (coordinator request)

- `arrRed` and `arrBlue` (used only by the six network arrows) now carry `markerUnits="userSpaceOnUse"` with a fixed
  14 × 11-unit head (was 9 × 7 in stroke-width units: ~31 long on the 3.5 critical arrows, ~22 on the 2.5 blue ones).
  Red and blue heads are now the same size whatever the stroke. F's shaft is 36 units long, so 22 units of it now
  show before the 14-unit head. The axis marker `arr` and every colour are unchanged.
- Runner: 0 diagram problems (PROBLEMS 21, none diagram). Scan and render: no arrowhead over any label; the only
  hits are the B and E tips at the edges of nodes 3 and 5, outside the circles near "5" and "9", as before.
