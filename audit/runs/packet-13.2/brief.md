# Packet 13.2 — six drill templates, wired into Learn Mode and the Quiz tab

Written 22 September 2026, at the start of the session. **This file contains no results.** Everything
below is a claim to check or a decision to make; the outcomes are in `built.md`, `verify-a.md` and
`verify-b.md`.

## What the plan asks for

`audit/DRILLS.md` § 13.2:

> **Build.** Break-even and margin of safety (WBS12), investment appraisal — payback and ARR (WBS13),
> percentage change (both subjects), index numbers and real vs nominal (WEC12), the multiplier
> (WEC12), PED from data (WEC11). Chosen by ledger demand, heaviest sections first. Quant items join
> the `InlineQuiz` distribution in `LearnModeTab.jsx` and render in `QuizTab`.
>
> **Acceptance.** Verify B at 390px on one Economics and one Business section: a calculation appears
> in Learn Mode, marks correctly, and a second step built correctly on a wrong first answer still
> scores, badged as the own figure rule.

## What is already here (packet 13.1, `d67a644`, D001–D008 confirmed)

`lib/quant/` — `rng.mjs` (mulberry32 + FNV-1a string seeds), `marking.mjs` (tolerance / own figure
rule / named slips), `index.mjs` (registry, `buildItem`), `format.mjs`, `schema.md` (the contract),
four templates (`breakeven`, `ped`, `arr`, `multiplier`), `components/quant/CalculationItem.jsx`,
`/admin/quant`, and `npm run quant-check` (six per-draw checks plus variety, `MIN_VARIANTS = 500`).

Nothing student-facing mounts any of it. That is this packet's whole job.

## The blocker, and why it is clear

PROGRESS says "blocked on packet 2 (item ids)". Packet 2 minted 2,952 item ids and added `item_id` to
`practice_question_progress` on 12 September. The drills need ids for the **SM-2 queue**, which is
packet **13.3**; 13.2 mounts generated items in Learn Mode and the Quiz tab, where nothing is queued
and nothing is stored. Proceeding.

## The thing the brief must flag before any code is written

Three of the four shipped templates carry a `specCode` that **does not exist in the IAL
specification**. To be checked against `audit/raw/*_spec.txt`, not from memory:

| template | ships | the claim to check |
|---|---|---|
| `ped` | `1.2.4` | PED is `1.3.2` Consumer behaviour and demand, topic 3 |
| `multiplier` | `2.4.2` | the multiplier is `2.3.4` National income, topic 4 |
| `breakeven` | `2.3.1` | break-even and margin of safety are `2.3.2` Financial planning, topic 3 |
| `arr` | `3.3.3` | ARR is `3.3.3` Decision-making techniques, topic 2 — believed already right |

Every IAL section number has **3 as its middle digit** (`1.3.1` … `4.3.6`); `1.2.4` and `2.4.2` are UK
GCE numbers. This is load-bearing here and nowhere else so far: the wiring matches a template to a
section **by spec number**, so a wrong code means the drill never appears. It is the reason to check
this before building the pool, not after.

## Build

1. **Correct the three spec codes** and add two reference fields to the contract: `specLeaf` (the
   topic and leaf, e.g. `1.3.2 · 3b`) and `qs` (the code from the quantitative-skills appendix —
   `econ_spec.txt:2760-2800`, `bus_spec.txt:2265-2295`), so a template says which skill it drills.
2. **Three new template modules**, taking the registry to eight registrations across the six named
   areas: `payback` (WBS13 · 3.3.3 · QS6), `index-numbers` (WEC12 · 2.3.1 · QS5 + QS7 — index, the
   inflation rate between two index values, and a nominal wage deflated to real terms), and
   `percentage-change` (one generator registered twice: `percentage-change-business` WBS11 · 1.3.1 ·
   QS2, market share and sales growth; `percentage-change-economics` WEC12 · 2.3.5 · QS2 + QS10, a
   real GDP growth rate and the percentage-point trap).
3. **`lib/quant-pool.js`** — pure, no React: `templatesForSection({subject, unitCode, number})`,
   a deterministic seed per `(sectionId, templateId, attempt)`, and the placement of items into
   check-in slots. No database, no content authoring, nothing stored.
4. **Learn Mode** — `LearnModeTab.jsx` builds a `quantMap` beside `quizMap` and renders
   `CalculationItem` at the check-in. The "Before the next chapter:" sentence must name the
   calculation, or it repeats packet 16's "Three questions" defect in a new place.
5. **Quiz tab** — a calculation card above the MCQs, from `unitCode` + `sectionNumber` props that
   `StudyApp` already computes for `PracticeQuestionsTab`.
6. **`lib/quant-pool.test.mjs`**, added to `npm test`.

## Decisions taken here, to be argued in DECISIONS.md

- **The drill does not join the quiz score.** `QuizTab` saves `{score, total}` and compares bests
  "like with like" on `total`; adding a generated item to the total would silently re-bucket every
  historical attempt row. It is a drill beside the quiz, with its own marking.
- **No entitlement gate.** A generated item is not a content bank, so withholding it protects
  nothing, and any gate would have to carry the three-valued `isPremium` (V-series). Founder's to
  overturn.
- **One template per section, not a queue.** Depth, scheduling and the calculations session are
  13.3 and 13.4.

## Acceptance checks (one ledger id each, minted with `ledger.mjs add`)

- **D018** every registered template cites a spec number that exists in the IAL spec for its subject
- **D019** `npm run quant-check` green over every template at 2,000 draws
- **D020** the pool maps a section to its templates by subject and spec number, and to nothing where
  no template claims that section
- **D021** the seed is a pure function of `(sectionId, templateId, attempt)`; a new attempt redraws
- **D022** a calculation appears at a Learn Mode check-in on an Economics section and marks correctly
- **D023** a calculation appears at a Learn Mode check-in on a Business section and marks correctly
- **D024** the own figure rule is visible to the student: a second step built correctly on a wrong
  first answer scores and is badged
- **D025** the check-in sentence names the calculation when one is shown, and does not when none is
- **D026** the Quiz tab renders the calculation for its section, and the quiz score is unchanged by it
- **D027** `quant.unit` DEBT clears for the units this packet registers a template for

## Verify B script (390×844)

1. `/economics/national-income` (WEC12 · 2.3.4, the multiplier) → Learn Mode → walk to the first
   chapter check-in → the calculation is there, method lines visible, inputs reachable at 390px.
2. Answer step one **wrong**, carry it correctly into step two, mark → step two scores, "own figure
   rule" badge.
3. `/business/meeting-customer-needs` (WBS11 · 1.3.1, percentage change) → same, first check-in.
4. Quiz tab on both → the calculation card is above the MCQs; submitting the MCQs scores only them.
5. Console clean.

## Exit

Build green · `npm test` · `npm run validate` · `npm run exposure` · `npm run recalls` ·
`npm run quant-check` · every claimed id confirmed · PROGRESS row · commit `packet-13.2:` · push.
