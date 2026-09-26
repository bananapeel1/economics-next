# Packet 13.8 — drawing-drill specs (break-even chart, tariff, exchange rate, monopoly; PPF assessed)

Four new spec files, none registered (the main session registers in `lib/diagram/index.mjs`):

- `lib/diagram/specs/break-even-chart.mjs`
- `lib/diagram/specs/tariff.mjs`
- `lib/diagram/specs/exchange-rate.mjs`
- `lib/diagram/specs/monopoly.mjs`

No engine, component, test, registry or other spec was touched. Each file's header carries its
WHY-THIS-SECTION note.

## The specs

| id | subject · unit · specCode | specTerm (spec lines) | marks | Learn Mode check-in | Diagrams-tab card |
|---|---|---|---|---|---|
| `break-even-chart` | business · WBS12 · 2.3.2 | "break-even charts" (bus_spec.txt:905, leaf 3e; topic 3 :900-906) | 4 (M1-M4, shade `loss`) | 3 of 0-4, after **Cash Flow** — moved on from Break-Even (see below) | "Melaka Bottling: the break-even chart" |
| `tariff` | economics · WEC14 · 4.3.2 | "tariffs" (econ_spec.txt:1692; 5b :1691, 5c impacts :1696-1699) | 4 (shade `dwlC`+`dwlP`) | 9 of 0-9, after **Who Gains and Who Loses** (last step of the section) | "A Tariff: Who Gets What" |
| `exchange-rate` | economics · WEC14 · 4.3.3 | "relative interest rates" (econ_spec.txt:1727; 2c :1726) | 3 (no area) | 2 of 0-6, after **What Moves a Floating Rate** | "The Market for a Floating Currency" |
| `monopoly` | economics · WEC13 · 3.3.3 | "costs and benefits of monopoly" (econ_spec.txt:1427; 6c :1426) | 2 (no shift; shade `dwl`) | 6 of 0-7, after **Monopoly** | "Monopoly: Equilibrium, Welfare Loss and Price Discrimination" |

Topics (the chip): Financial planning · Trade and the global economy · Balance of payments and
exchange rates · Market structures and contestability — the quant templates' chips for the same sections.

## Proof

- **Guard**, each alone and all four together:
  `node audit/scripts/diagram-check.mjs --module lib/diagram/specs/<file>.mjs --only <id>` → all clean
  (break-even 8 region sets sampled, tariff 6, exchange-rate 0 (no family), monopoly 1). All four
  together with the registry and fixtures: `10 spec(s) (4 from --module) + 6 shape fixture(s), 79 region
  sets sampled, all clean`.
- **Citation**: `checkSpecCitation(spec)` → `null` for all four. Controls, same specTerm under the
  neighbouring sections, all refused: break-even under 2.3.1 and 2.3.3; tariff under 4.3.1 and 4.3.3
  (and "tariffs" is absent from 1.3.6); exchange-rate under 4.3.2 and 4.3.4 (and "relative interest
  rates" is absent from 2.3.6, the monetary-policy section); monopoly under 3.3.2 and 3.3.4.
- **Placement**: LearnModeTab's `quantMap` + `drillMap` replicated over the live payload from :3001
  (26 Sep), through `buildSteps`, `placeQuantItems` and `placeDiagramDrills`, chapter titles joined with
  their diagram titles exactly as the component does. Run twice: with today's quant registry, and with
  every template in `lib/quant/templates/` (terms-of-trade and exchange-rate-economics are not
  registered yet). Same answer both times. `?draft=1` returns identical bytes — the :3001 server is a
  production build, where the route ignores the flag — so the draft stand-in was the latest packet
  bundles in `audit/snapshots/` (packet-31/39b/40/29): same chapter titles, same placements.
  - financial-planning: the break-even calculation holds check-in 2 ("Break-Even"), which is also the
    drill's best match (score 2: "break", "chart"). A drawing never shares a check-in with a
    calculation, so it moves to the next free one — **check-in 3, after Cash Flow** (flat step 24 of 30).
    Still after the teaching; it arrives one chapter later as a spaced recall. Right, given the rule.
  - trade-global-economy: terms-of-trade (once registered) takes check-in 3; the tariff matches only
    chapter 9 ("A Tariff: Who Gets What") — **check-in 9**. Right: chapter 8 teaches the mechanism,
    chapter 9 the four areas the drill shades. A `placeWith` of the chapter title was tried and
    rejected: "gains" would pull the Diagrams-tab drill onto "The Gain From Specialising" card
    (that matcher takes the FIRST best, strictly), so the title alone is safer.
  - balance-payments-exchange-rates: without `placeWith`, any title with "floating exchange rate" loses
    to chapter 3, "Exchange Rate Systems and Intervention" (diagram "Floating, Fixed and Managed
    Rates"), which is intervention, not the factor. The title avoids "exchange" and `placeWith` names
    chapter 2 and its diagram: score 5 against 2. exchange-rate-economics (once registered) takes
    check-in 3. **Check-in 2.** Right.
  - market-structures-contestability: no calculation in this section; score 4 on chapter 6, 0
    elsewhere. The title avoids "competition" and "price", which four other chapters carry.
    **Check-in 6.** Right.
- **Every branch read as a student**: `modelAttempt()` and `mark()` for the model, each wrong curve
  both ways, both moved, nothing moved, wrong direction, right way at half size, no point, the old
  quantity, every distractor, a stray point, nothing shaded, every region alone, every authored combo,
  everything shaded. Models: 4/4, 4/4, 3/3, 2/2. The read found one real defect, fixed: three
  break-even strings quoted the model's numbers (3,500 loaves, $5,800, "1,000 loaves") where M3/M4 are
  judged on the student's own diagram, so a student who moved TC by $400 and shaded correctly would
  have been told a wrong figure. The tariff revenue string had the same flaw ("$20 on each tyre").
  All now describe the student's diagram, not the model's.

## Design choices worth knowing

- **Break-even is not the calculation twice.** The prompt prints no price and no variable cost; the
  contribution is $0.80, which `breakeven.mjs` can never draw (whole dollars $6-$20); the question is
  about what a change does to the chart (leaf 3e), not what a figure is (3c/3d). No FC line is drawn: it
  would have to move with TC, and M1 requires exactly one line to move. The drill is about FIXED
  costs only, because a variable-cost change pivots TC, which the engine cannot draw. `nudge` $200,
  because the "old quantity" band is one nudge wide in QUANTITY units (200 of 5,000 = 4%).
- **Tariff numbers differ from the chapter's** ($20 world price, $10 tariff): Pw $40, tariff $20.
  `range` 30 stays short of prohibitive (Pw + t < $75, the no-trade price).
- **Exchange rate states the inflow (€20bn a day)** so the engine's "the gap should read 20" line
  refers to a number the student was given. With D at slope −1, 20bn right is 20 cents up.
  Labels follow the section's own checklist, "D to D₁", so the new point is ER₁/Q₁.
- **Monopoly is framed as a merger with unchanged costs**, because the welfare-loss triangle compares
  monopoly with competition at the SAME constant MC = AC. A natural-monopoly story would make this
  triangle the wrong picture. With MC = AC constant the rectangle is exactly supernormal profit.

## PPF: no spec, deliberately

An honest PPF drill is not possible on this engine. What it can draw is a straight downward line
shifted in parallel. IAL 1.3.1 topic 4a asks for PPFs to show "opportunity cost (using marginal
analysis)" (econ_spec.txt:532), i.e. increasing marginal opportunity cost, i.e. a frontier bowed
outward. The product teaches exactly that ("Opportunity Cost Through Marginal Analysis": "increasing
marginal opportunity cost ... why the frontier is bowed outward rather than straight"), and its own
PPF diagram checklist says "drawn as a curve bowed outward from the origin, never straight". A
straight-line drill would mark as correct the very picture the section tells students is wrong.
(Straight PPFs are right for comparative advantage, 4.3.2 topic 1, but that is a different drill:
two countries, specialisation and trade, not growth.)

What the engine would need for an honest one:

1. A **curved line type** — e.g. a quarter-ellipse or `y = a·(1 − (x/b)^k)` with k > 1 — with its own
   `priceAt`, intersection, `segment` for drawing, and `lineObstacles` for the label solver
   (`segment()` and `endAnchor()` assume straight lines today).
2. **Shift semantics beyond an intercept change**: an outward scaling (both intercepts, growth in
   both goods) and a one-axis stretch (technology in one good only, the pivot that biased growth draws).
   A shift is currently one number, `Δintercept`.
3. **A point that is not an intersection**: "mark a point inside / on / beyond the frontier" needs a
   classification mark (where the click is relative to the curve), not `near(click, intersect(a, b))`.
4. **A region family** for attainable against unattainable output, with a `WHOLE` for the guard.
5. Possibly a **two-point reading** (A → B along the curve) to mark opportunity cost as Δcapital ÷
   Δconsumer goods, which is the marginal analysis the spec names.

## Economics and business judgements I was unsure of (flagged, not guessed — founder sign-off)

1. **Does IAL Business set "draw" at all?** The headers of the economics specs say "Draw carries 4
   marks in Economics". I found no equivalent claim for Business, and 2.3.2 3e says "Interpretation of
   break-even charts", not construction. The break-even drill's four marks are the drill's own scheme
   (line, direction, point, area); whether a Business paper ever asks for the shift to be drawn is
   unchecked.
2. **Break-even: shading the loss area.** The section's diagram shades loss and profit, and the family
   offers both. I chose loss. A Business mark scheme may never ask for an area to be shaded at all;
   reading the break-even output and margin of safety is the more usual interpretation question (both
   are in the feedback, neither is marked).
3. **Exchange rate: is a SUPPLY shift also credited?** Higher relative interest rates mainly raise
   demand for the currency (foreign savers buy it — what the section teaches), but home savers may also
   send less abroad, reducing supply. The drill marks demand only; the M1 and both-moved feedback say
   the supply effect exists and is secondary rather than calling it wrong. If IAL mark schemes award a
   leftward supply shift here, M1 is harsher than an examiner.
4. **Exchange rate: axis labelling.** "Exchange rate (US cents per euro)" on the vertical and "Quantity
   of euros (bn per day)" on the horizontal. Mark schemes also accept "price of the euro" / "$/€". The
   euro is used because it floats; the move ($1.10 → $1.20) is large for one rate decision and is
   illustrative.
5. **Tariff: both triangles as THE welfare loss.** The drill requires `dwlC` + `dwlP` (the section's
   areas b and d). One triangle alone gets its own "that is half of it" feedback and no mark. Whether an
   IAL scheme gives partial credit for one triangle is unchecked. The diagram assumes a small importing
   country (price rises by the full tariff).
6. **Tariff labels.** D and S (as the section's diagram), with names "Domestic demand/supply"; the
   world price line is "Pw", raised to "Pw + t". Some schemes expect "Sdom/Ddom" and "Pw + tariff".
7. **Monopoly: "welfare loss" is not a 3.3.3 phrase.** The spec says it only under 1.3.5 (:750); 3.3.3
   carries it as allocative efficiency and "costs … to consumers". The section's chapter says "welfare
   loss", and the drill follows it.
8. **Monopoly: the comparison assumes constant costs (MC = AC, no economies of scale).** Stated in the
   prompt. A mark scheme comparing monopoly with competition may expect the student to note that
   assumption.
9. **Engine behaviour seen while walking the branches, not changed (not mine to change):** with
   NOTHING moved, M3 says "…on a diagram where the wrong curve moved"; the M3 "correct" note prints the
   break-even money value as "$ 7000" (glyph, space, no thousands separator).
