# Packet 13.7 — the drawing-drill engine, generalised

26 Sep 2026. Engine work only: no commit, no build, no dev server started (the peers' :3001 was used
read-only for the live check below). Files touched are exactly the ones the brief allowed.

## What changed, per file

| File | Change |
|---|---|
| `lib/diagram/geometry.mjs` | `quantityAt` returns null for a horizontal line (was Infinity/NaN). New `readPoint(curves, { cross: [a, b], readOn })` — with `readOn` omitted it returns `intersect(a, b)` itself, float for float. |
| `lib/diagram/regions.mjs` | Families are now declarations: `curves`, `moves`, `direction`, `point`, `origin`, plus an independent `WHOLE` (the area each partitions). Six new families: `maxPrice`, `minWage`, `negativeExternality`, `tariff`, `breakEven`, `monopoly`. A family builds only when ITS curve, alone, moved ITS way (see the A/B). `buildRegions(spec, own)`; the old `(family, curves, shifted)` form still works. New `wholeFor`, `familyOf`. The two original recipes are byte-identical. |
| `lib/diagram/shape.mjs` (new) | Every default in one place: `hasShift`, `movableOf`, `directionOf`, `pointSpec`, `originSpec`, `marksFor`, `curveMeta`, `glyphsFor`, `stepsFor`, `criteriaFor`, `unitOf`, `rangeOf`. |
| `lib/diagram/marking.mjs` | M1/M2 only with a shift; M3 on `readPoint` of the student's own curves, with `distractors` (named wrong points) checked first; M4 only with `expect.regions`. Rule lines and notes built from spec labels — identical strings for the two 13.5 specs. `modelAttempt` generalised. |
| `lib/diagram/view.mjs` (new) | The component's pure half: frame, adaptive `tickStep`, `segment` (horizontal lines), `scene`, `labelLayout` (deterministic priority order), `lineObstacles`, `describe` (ARIA), slope-aware `nudgeLabels`/`keyDirection`, and the step machine `drillReducer`. Guard, tests and component call the same functions. |
| `lib/diagram/layout.mjs` | Solver takes `lines` and prefers spots off every drawn line (falls back to "no label overlap" when none is free); Q labels may flip left of their guide; curve labels get a third row and diagonals. `overlaps()` also checks labels against ticks/titles, and its pair ids were wrong once any label was hidden — fixed. |
| `lib/diagram/specs/max-price.mjs`, `negative-externality.mjs` (new) | The two pilots, with WHY-THIS-SECTION headers and full per-branch feedback. |
| `lib/diagram/fixtures.mjs` (new) | Shape fixtures — min wage, tariff, break-even, monopoly, AD/AS, currency. Not registered, not content; the guard proves every family and point shape on them. |
| `lib/diagram/index.mjs` | Registers the two pilots; exports shape/view helpers; `listSpecs().marks` from `marksFor`. `specs`, `getSpec`, `listSpecs` and the fields `diagram-pool.js` reads are unchanged. |
| `lib/diagram/schema.md` | Rewritten as the author's guide to every shape. |
| `components/diagram/DiagramDrawDrill.jsx` + `.module.css` | Renders any spec (named curves, roles, ghost styles, spec steps and glyphs, adaptive ticks). Props unchanged. Three 13.6 defects fixed, below. New role colours `policy`/`marginal` from existing tokens; no literals. |
| `audit/scripts/diagram-check.mjs` | Eight checks over registered specs + fixtures; `--module <path>` (repeatable) and `--only a,b`, same shape as quant-check. |
| `lib/diagram-specs.test.mjs` | +12 tests, including one that runs the whole guard, so `npm test` (the gate) sees it. |
| `app/admin/diagram-drills/page.js` | Shows the fixtures under their own heading. |

`components/learn-mode/DiagramRecall.jsx` was not touched (no API change). Its comments cite
`DiagramDrawDrill.jsx:341` and `:192`; those line numbers are now stale.

## New spec fields

`curves.*.{label, short, name, role, shiftedLabel, ghostLabel, ghost}`, `movable`, `nudge`, `range`,
`point: { cross, readOn }`, `origin`, `glyphs`, `steps`, `criteria`, `distractors`,
`feedback.{noPoint, equilibriumWrong}`, `placeWith` (read by `lib/diagram-pool.js`), `axes.*.{tick, short}`.
All optional; the two 13.5 specs use none and are unchanged on disk.

## A/B — the two 13.5 specs, old engine vs new

Old `lib/diagram` copied to scratch before any edit. Every combination of: nothing / S / D / both
moved (±5…±55), 7 point clicks (own crossing, none, near, far, old quantity, original equilibrium,
random), and every shading (none, each region, each pair, all, a bogus key). Full result objects
compared, not just totals.

| | attempts | byte-identical | marks differ | every differing row |
|---|---|---|---|---|
| indirect-tax | 11,340 | 3,024 | 231 | demand moved (alone or with supply) |
| subsidy | 5,670 | 1,512 | 231 | demand moved (alone or with supply) |

**Identical on every attempt where only supply or nothing moved** — all 4,536, including model,
wrong direction, own-figure (S +20 / −20), old-quantity click and every wrong shading. Named rows:

| Attempt | tax old → new | subsidy old → new |
|---|---|---|
| model | 4/4 → 4/4 | 4/4 → 4/4 |
| wrong direction | 1/4 → 1/4 | 1/4 → 1/4 |
| own figure (±20) | 4/4 → 4/4 | 4/4 → 4/4 |
| point at old quantity | 3/4 → 3/4 | 3/4 → 3/4 |
| each wrong shading (cb, pb, cs, ps, cb+pb, cb+dwl / cg, pg, cg+pg) | 3/4 → 3/4 | 3/4 → 3/4 |
| nothing moved | 0/4 → 0/4 | 0/4 → 0/4 |
| **wrong curve (D) + shade dwl** | **1/4 → 0/4** | **1/4 → 0/4** |
| **both moved + shade dwl** | **3/4 → 2/4** | **3/4 → 2/4** |

The difference is deliberate and is a bug fix. The old family checked only the SIGN of whichever
curve moved first, so moving demand built tax regions on an unmoved supply curve. On the old engine,
tax with D +30: `cb` and `pb` are the same rectangle (area 975 each), `ps` overlaps both, and `dwl`
has zero area — yet shading it earned M4. Subsidy with D −30: `cg` = `pg`, `dwl` area 0. In the UI
the two burden rectangles sat on top of each other in step 3. The old guard swept only the target
curve, so it never saw this; the new one sweeps every movable curve. The other differing rows are
notes only (M4 now says "shift the curve that should move" instead of "fix the direction").

## The guard

Final: `diagram-check: 4 spec(s) + 6 shape fixture(s), 64 region sets sampled, all clean`.
`node --test lib/diagram-specs.test.mjs`: 16/16. With `content-validator`, `learn-steps`,
`recall-widgets`, `diagram-pool`: 184/184.

Each new check made to fail on purpose, in a scratch mirror (control green first):

| Mutation | Went red on |
|---|---|
| old "sign of first moved curve" rule | disjoint (tax D +5, subsidy, max-price S, min-wage D) |
| family ignores its direction | backwards (7 specs) |
| externality `dwl` drawn as the tax triangle | disjoint + covering |
| max-price `cs` corner overshoots demand | covering (regions ≠ whole) — the pre-13.7 covering check passed this |
| max-price `cs` starts above D's intercept | covering (regions ≠ whole) |
| externality `ext` stops short of MPC | covering ("in the area but in no region") |
| spec `point` ≠ its family's | shape |
| spec direction ≠ its family's | shape + model + backwards |
| curve the family reads renamed | shape |
| `marksFor` off by one | shape (drill vs scheme, listSpecs) |
| `rightRegion` removed | shape (feedback) |
| x-axis too short for the origin | shape (off canvas) |
| solver never moves a label | labels (P1 × P2, Q1 × Q2) |
| solver blind to ticks | labels (× fixed) |
| `specCode: '1.4.3'` on max-price | spec code |

The guard also caught two real problems while this was built: the tariff fixture's range let the
world-price line leave the canvas (label on the x-axis ticks; range cut to 30), and a quantity label
near the right edge had nowhere to go (the flip candidate).

## Render check

- **SSR**: the component transpiled with Next's own babel and rendered with `react-dom/server` for all
  4 specs + 6 fixtures in 5 states each (initial, shifted, point, shading, marked; state seeded) —
  47 renders, no throw, no NaN/undefined, every curve label, step name, glyph and criterion present,
  drag targets only in the shift step. Rasterised with `qlmanage` and inspected by eye.
- **Live**, on the peers' dev server (:3001, this worktree), 375px viewport: `/dev/widgets` indirect
  tax — six arrow taps give +30 and stay in step 1 (the 13.6 drill left step 1 after one tap), Next,
  tap the point, shade, Mark → 4/4; keyboard on demand: ArrowRight ×3 + ArrowUp = "Demand shifted up
  by 20", focus kept; a mouse drag of S by 30 advances and the release click is swallowed.
  `/economics/unit-1/market-failure` Diagrams tab: the externality drill (via diagram-pool); MPC stays
  solid under a red MSC; shading the tax-shaped triangle gets its own feedback. `…/government-intervention`:
  max-price; clicking Qd gets the excess-demand feedback. No horizontal scroll.

## 13.6 defects fixed on the way

1. One arrow tap moved the curve 5 and left the shift step, taking the arrows with it; keyboard users
   lost focus after one key. Only a finished drag advances now; "Next" does the rest.
2. Arrow buttons and keys said "up / left" for demand, where up is RIGHT.
3. Labels were moved by rewriting x/y, so each re-measure measured the last answer and labels hopped
   back onto each other on the next render. They move by `transform` now (getBBox ignores it).
4. "Show model answer" drew its point red (unsnapped). S₂ sat on its own line.

## Not done, and flagged

- **Text size on a phone (pre-existing, not fixed).** The canvas is a 560-unit viewBox scaled to the
  column: 286px wide in `/dev/widgets` and 256px in the Diagrams tab at a 375px viewport. Curve labels
  (15 units) render at ~7px, point labels ~5.5px, ticks ~5px — far under a 12px floor. Needs a design
  decision (narrower viewBox on phones, or text sized from the rendered width).
- Labels can still cross a line when no line-free spot exists (the solver prefers, not guarantees).
- The M3 note "from a curve that moved the wrong way" also shows when nothing or the wrong curve moved.
  Left identical to keep the A/B clean.
- The new drills are live in the Diagrams tab and Learn Mode as soon as this merges (diagram-pool
  derives them from specCode). DRILLS.md decision 2 — teacher sign-off on expected regions — applies.

## Economics I was unsure of (not guessed; for the founder or the IAL teacher)

1. Max price: the welfare-loss triangle assumes the goods sold reach the buyers who value them most.
   I could not confirm whether IAL mark schemes award that triangle for a maximum-price diagram or
   expect the excess demand (Qs to Qd) labelled instead; the drill marks the triangle, per the brief,
   and teaches excess demand in the Qd feedback.
2. The externality y-axis reads "Costs and benefits ($ per tonne)"; some IAL diagrams use "Price,
   costs, benefits". Cosmetic, but a teacher should pick.
3. Fixtures only (not content): tariff expects both welfare-loss triangles shaded; minimum wage calls
   the area above the wage "employers' surplus"; monopoly assumes constant MC = AC so the profit
   rectangle is exact. Each needs checking when its real spec is written.
