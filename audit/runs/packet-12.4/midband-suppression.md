# E028 — the mid-band panel, suppressed where it cannot be a near miss

Packet 12.4. Measured before the rule was written and again after, from the served HTML.

## The condition, named and tested

`topsOutInModelAnswersOwnBand(item, attempt)` in `lib/mid-band-answer.js`, with `markRange` beside
it for the parsing. It is TRUE when the panel would say the truncated attempt "tops out" in the band
the model answer above it is already marked in — the student is shown two answers, told one is
worse, and given the same band for both.

It applies only to the `levels` scheme. Under `objectives` the bands are AO allocations (AO4 is 6 of
20 marks) and the likely score is a total out of 20, so comparing them would be a category error,
and a truncated `Evaluate 20` genuinely cannot reach AO4.

`midBandAttempt` returns null when it fires. That is the single choke point: `highestTariffItem`
already filters on a null attempt, so a section holding a second item that can carry an honest panel
keeps one, and neither caller can render a suppressed panel by forgetting to ask.

Seven unit tests in `lib/mid-band-answer.test.mjs`, including the range parser (a "Level 3 — 5–6
marks" row whose level number must not be read as the band), both controls, and a sweep asserting no
section in the real bank shows a panel in its own band.

## What changed, page by page

| | before | after |
|---|---|---|
| pages showing a panel | 29 | 20 |
| of those, topping out in the model answer's own band | **10** | **0** |
| pages showing no panel | 3 | 12 |

Nine sections lost their panel outright — every one an 8-mark `levels` item whose model answer is
marked 5–6 / 8 against a "Level 3 — 5–6 marks" ceiling:

- `marketing-mix` (Business 1.3.3) — `biz-product-life-cycle-8`
- `entrepreneurs-leaders` (Business 1.3.5) — `biz-entrepreneur-role-8`
- `introductory-concepts` (Economics 1.3.1) — `ppf-economic-growth-8`
- `demand` (Economics 1.3.2) — `yed-business-strategy-8`
- `price-determination` (Economics 1.3.4) — `maximum-price-8`
- `types-sizes-businesses` (Economics 3.3.1) — `econ-diseconomies-scale-8`
- `revenue-costs-profits` (Economics 3.3.2) — `profit-maximisation-mc-mr-8`
- `labour-markets` (Economics 3.3.4) — `monopsony-wages-8`
- `government-intervention-firms` (Economics 3.3.5) — `econ-competition-policy-8`

One section kept its panel by falling back: `national-income` (Economics 2.3.4) moved from
`circular-flow-8` (5–6 / 8, suppressed) to `multiplier-effect-8` (7–8 / 8), which is a real near
miss. The three pages that already showed no panel — `the-market`, `raising-finance`,
`resource-management` — are unchanged.

## What this does not fix

Authoring a multi-paragraph answer for the nine suppressed sections, so their highest-tariff item can
carry an honest panel again, is the alternative fix and was out of scope here. The panel is gone on
those nine pages, not replaced. Each is a single item whose model answer is itself only mid-band —
which is the more interesting finding underneath E028, and a content packet's to take.
