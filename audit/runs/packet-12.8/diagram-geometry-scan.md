# Diagram geometry scan (packet 12.8 close-out, E082 class) — REPORT ONLY

26 Sep 2026. Script: `audit/runs/packet-12.8/diagram-geometry-scan.mjs` (full output: `diagram-geometry-scan.log`).
Question asked of every `public/diagrams/*.svg` that draws its curves as plain `<line>` elements and marks
points with dots (`<circle>`, r ≤ 6): does each dot lie within 3 px of an intersection of two drawn lines?
"Drawn lines" are `<line>` elements that are not dashed guides (a class whose CSS sets `stroke-dasharray`)
and not grid lines; axes count (a dot may mark an intercept), axis × axis does not. Segments intersect
within their extents (0.5 px slack). **Nothing here was fixed; the only diagram changed is E082's.**

**A/B.** Pointed at the pre-fix `positive-externality-consumption.svg` (kept as
`positive-externality-consumption.before.svg`), the scan reports both of its dots off: (230, 220) 9.17 px
from S × MPB, and (310, 260) 76.68 px from S × MSB. On the fixed file both are 0.00-0.01 px. So the scan can
see the E082 defect, and the E082 fix removes it.

## Result on the current tree

8 files measured, 12 dots, 6 more than 3 px from any intersection of two drawn lines.
| file | dot | nearest intersection of two drawn lines | distance (px) |
|---|---|---|---|
| ad-as-long-run.svg | dot (290, 220) | (290.00, 228.53) lras#2 × ad#3 | 8.53 |
| indirect-tax-pigouvian.svg | dot (250, 140) | (234.58, 175.00) s-tax#3 × d#4 | 38.24 |
| negative-externality-consumption.svg | dot (310, 222) | (270.00, 200.00) s#2 × mpb#3 | 45.65 |
| negative-externality-consumption.svg | dot (230, 200) | (226.75, 230.53) s#2 × msb#4 | 30.71 |
| negative-externality-production.svg | dot (320, 220) | (270.00, 200.00) mpc#2 × d#4 | 53.85 |
| negative-externality-production.svg | dot (220, 186) | (241.67, 180.00) msc#3 × d#4 | 22.48 |


Reading the six rows (not verified beyond the geometry; for whoever owns these diagrams):
- `negative-externality-consumption.svg` (both dots) and `negative-externality-production.svg` (both dots)
  have the same shape of defect as E082: the marked optimum/market points are 22-54 px from where the drawn
  curves cross. `negative-externality-consumption.svg` is the diagram `content/data-response/econ-u1-market-failure.md`
  names under "Diagram Reference", and the one the 12.8 spec suggests for a Draw model answer.
- `indirect-tax-pigouvian.svg` (250, 140): 38 px from S+tax × D. Also named in that "Diagram Reference".
- `ad-as-long-run.svg` (290, 220): 8.5 px vertically from LRAS × AD.

## Not measured

- ad-as-short-run.svg (1 non-axis solid <line>, 1 dot(s))
- ansoff-matrix.svg (0 non-axis solid <line>, 0 dot(s), has transform)
- boston-matrix.svg (0 non-axis solid <line>, 0 dot(s), has transform)
- circular-flow.svg (0 non-axis solid <line>, 0 dot(s))
- j-curve-exchange-rate.svg (0 non-axis solid <line>, 2 dot(s))
- lorenz-curve.svg (2 non-axis solid <line>, 0 dot(s))
- monopoly-pricing.svg (1 non-axis solid <line>, 3 dot(s))
- perfect-competition-lr.svg (1 non-axis solid <line>, 1 dot(s))
- phillips-curve.svg (1 non-axis solid <line>, 1 dot(s))
- product-life-cycle.svg (0 non-axis solid <line>, 0 dot(s))

Files whose curves are `<path>`/`<polyline>` (for example `monopoly-pricing.svg`, 3 dots on Bézier curves)
are outside this scan's question as set ("plain `<line>` curves"); their dots are not checked.
