# Revvy Learn — Diagram Library v1

**18 annotated, accessible SVG diagrams** mapped to the Edexcel IAL Economics and Business spec. Each SVG is self-contained (inline `<style>`), includes a `<title>` and `<desc>` for screen readers, and renders on both light and dark backgrounds (neutral axes, named colours for curves).

## How to use

- **Inline on a topic page:** `<img src="/diagrams/market-failure.svg" alt="…">` or drop the SVG contents directly into the HTML for CSS-tunable diagrams.
- **Download / print:** SVGs scale losslessly. Export to PNG via browser screenshot or `rsvg-convert -o out.png file.svg`.
- **Flashcards:** strip the labels (edit `<text>` tags) to create a blank version students fill in during retrieval practice.

## The 18 diagrams

| # | File | Used on these topic pages (IAL spec) |
|---|---|---|
| 1 | `supply-demand-equilibrium.svg` | Econ U1 Price Determination, Demand, Supply; Business U1 The Market |
| 2 | `negative-externality-production.svg` | Econ U1 Market Failure (1.3.5); Econ U4 Role of the State |
| 3 | `negative-externality-consumption.svg` | Econ U1 Market Failure (1.3.5) — sugary drinks, plastics, alcohol/tobacco |
| 4 | `positive-externality-consumption.svg` | Econ U1 Market Failure (1.3.5); Government Intervention |
| 5 | `indirect-tax-pigouvian.svg` | Econ U1 Market Failure; Government Intervention; Econ U2 Macro Policies |
| 6 | `consumer-producer-surplus.svg` | Econ U1 Price Determination; Business U1 The Market |
| 7 | `ad-as-short-run.svg` | Econ U2 Aggregate Demand, Aggregate Supply, National Income |
| 8 | `ad-as-long-run.svg` | Econ U2 Aggregate Supply, Macro Policies; Econ U4 Growth and Development |
| 9 | `phillips-curve.svg` | Econ U2 Macroeconomic Objectives & Policies |
| 10 | `lorenz-curve.svg` | Econ U4 Poverty and Inequality; Business U4 Global Markets |
| 11 | `circular-flow.svg` | Econ U2 Measures of Economic Performance, National Income |
| 12 | `monopoly-pricing.svg` | Econ U3 Market Structures; Government Intervention in Markets for Firms |
| 13 | `perfect-competition-lr.svg` | Econ U3 Market Structures & Contestability |
| 14 | `kinked-demand-oligopoly.svg` | Econ U3 Market Structures; Business U3 Competitiveness |
| 15 | `product-life-cycle.svg` | Business U1 Marketing Mix; U3 Business Growth |
| 16 | `boston-matrix.svg` | Business U1 Marketing Mix; U3 Business Objectives & Strategy |
| 17 | `ansoff-matrix.svg` | Business U3 Business Objectives & Strategy; U4 Global Marketing |
| 18 | `j-curve-exchange-rate.svg` | Econ U4 Balance of Payments & Exchange Rates |

## Style conventions

- **Viewport:** `500 × 400` (a couple 520 wide for multi-element diagrams).
- **Axes:** neutral grey `#64748b`, 1.5px. Axis titles top-of-Y-axis and end-of-X-axis.
- **Curves:** 2.5px stroke width. Colour key (consistent across the library):
  - **Indigo** `#4f46e5` — Demand / AR / AD / MPB / private-benefit curves
  - **Red** `#ef4444` — Supply / MC / SRAS / MPC / private-cost curves
  - **Green** `#10b981` — MSC / MSB / LRAS / LRPC / S+tax / social curves
  - **Amber** `#f59e0b` — Deadweight-loss shading; tax revenue rectangles
  - **Green at 20%** / **Red at 20%** — Consumer / producer surplus shading
- **Dashed** `#94a3b8` — projections, second-position curves (e.g. SRPC', MC'), grid.
- **Text:** system UI fonts. Axis titles 14px/600; labels 13-14px/600; notes 12px.

## Accessibility

Every SVG exposes:
- `role="img"` and `aria-labelledby="title desc"`.
- `<title>` — one-line subject ("Monopoly pricing and supernormal profit").
- `<desc>` — 1–2 sentence description a screen reader can speak.

When embedding, still add meaningful `alt` text — more tools honour `alt` than SVG `<title>`.

## v2 backlog — diagrams still to build

The content in `data-response/` and `unit-rewrites/` transparently references these as "on the v2 backlog". They're high-value but either schematic (not curve-based) or niche:

### Schematic / non-curve
- `segmentation-types.svg` — demographic / geographic / psychographic / behavioural bases
- `niche-vs-mass.svg` — market map of positioning extremes
- `market-research-primary-secondary.svg` — classification tree of research types
- `marketing-mix-4ps.svg` / `marketing-mix-7ps.svg` — integrated framework with arrows
- `porters-five-forces.svg`
- `swot-pestle.svg`
- `ishikawa-fishbone.svg`
- `decision-tree.svg`
- `break-even-chart.svg`
- `critical-path-network.svg`

### Elasticity & revenue (curve-based, ~6 items)
- `ped-inelastic-revenue.svg` — inelastic demand with revenue rectangle
- `ped-elastic-revenue.svg` — elastic demand with revenue rectangle
- `ped-inelastic-vs-elastic.svg` — side-by-side behavioural response comparison
- `yed-luxury-shift.svg` / `yed-inferior-shift.svg`
- `xed-substitutes.svg` / `xed-complements.svg`
- `tiered-pricing-comparison.svg` — cross-country price discrimination

### Market-shift variants (curve-based, ~4 items)
- `supply-shift-left.svg` / `demand-shift-right.svg` (dedicated, rather than reusing `supply-demand-equilibrium.svg`)
- `simultaneous-shifts.svg` — both curves moving, ambiguous quantity effect
- `supply-shortage-equilibrium.svg` — disequilibrium with shortage wedge

### Econ U4 specific
- `ppf-opportunity-cost.svg`
- `price-ceiling-floor.svg` — with shortage/surplus wedges
- `subsidy-welfare.svg`
- `natural-monopoly.svg`
- `trade-creation-diversion.svg`
- `exchange-rate-determination.svg`
- `balance-of-payments-schematic.svg`

Build the elasticity and market-shift variants first — they're referenced most often in the data-response pieces.
