# Drill programme — packets 13.1 to 13.8

An insert into `PLAN.md`, not a replacement for it. Two new item types: **quantitative drills** with randomised
numbers, and **drawing drills** where the student shifts a curve instead of labelling a finished diagram.
Both are marked by arithmetic and geometry — no model call, no marking cost per attempt.

Prototypes of both: https://claude.ai/code/artifact/a7e2b3b4-ba20-4775-9f54-978477dc406c

Numbered 13.1–13.8 because they run **after packet 13 and before packet 14**. Inserting integers would mean
reassigning 1,170 content ledger items; decimals cost nothing and say where the work sits. `ledger.mjs packet
13.1` works as-is.

---

## Why this goes before the content stage, not after

Three facts from the ledger, not from taste.

1. **110 content items across 24 sections ask for quantitative material.** Calculations, worked examples,
   elasticity values from data, index numbers, break-even. Heaviest: `national-income` (14), `aggregate-demand`
   (14), `financial-planning` (12), `decision-making-techniques` (11). They are scheduled into packets 14–56.
   Today there is nowhere to put them — `section_quiz` stores `{ question, options, correctIndex, explanation }`
   and has no numeric type, no tolerance, no working, no marks. Author them before the engine exists and those
   24 sections get rewritten twice. This is the same argument `PLAN.md` makes for packet 7 preceding recall
   authoring, and it has the same answer.

2. **Packet 3's validator includes "a minimum quantitative-item count per unit".** That check needs an item
   type to count. The contract has to be fixed in the packet 3 session (see the addendum below) or the check
   is written against nothing.

3. **The quant engine makes the 43 content sessions cheaper, not dearer.** Eighteen templates authored once
   replace per-section quantitative authoring in 24 sections. The drawing drills do the opposite: they add
   twelve authoring jobs whose expected regions are mark-scheme claims. That asymmetry drives the
   recommendation below.

---

## What it costs, and the recommendation

Eight sessions inserted between 13 and 14. Fifty-eight packets becomes sixty-six: about **1.6 extra weeks** at
one session a day. Against the 1 November freeze proposed in `DECISIONS.md`, that is the top-ten content
sections landing roughly two weeks later.

**Recommendation: split the programme.** Run 13.1–13.4 (quantitative) before the content stage. Defer
13.5–13.8 (drawing) until after the top-ten sections have shipped.

Why: the quant half pays for itself inside the content stage and is the cheaper half to verify — text inputs
work on every phone in the core markets, and a wrong tolerance is caught by a script. The drawing half needs
twelve authored specs, a teacher to confirm each expected region, and a touch interaction that can quietly fail
on a 390px screen. If the freeze holds, January gets the calculations and June gets the diagrams.

Both halves are specified below either way, because the choice is the founder's.

---

## Prerequisites — packets that must land first

| Packet | What the drills need from it | Ledger |
|---|---|---|
| **2** | Stable item ids, `item_id` on `practice_question_progress`, and diagramRef pinning by id. 62% of diagramRefs never match a diagram today, so a drawing drill has nothing reliable to attach to | F041, F052 |
| **3** | The quantitative check in validator v2, and the item contract fixed in the same session | — |
| **5** | Mobile diagram sizing. SVGs render at 270px on phones with ~5px text and the enlarge modal is no bigger. A drag-a-curve drill is unusable at that size | F088, F062 |
| **7** | Widget mounting and the recall-slot switch. `DiagramLabelDrill` is one of three components shipped and never mounted; the drawing drill claims the same slot | F061 |
| **12** | The Diagrams tab is Economics-only, so Business drawing drills have no surface until this resolves. Learn Mode takes them either way | — |
| **13** | Off-spec terminology strip. Every spec must say **welfare loss**, never "deadweight loss" | — |

---

## Packet 3 addendum — not a new packet

Fix the quantitative item contract inside the packet 3 session, before the validator check is written. About
45 minutes. Output: a schema note in `lib/quant/schema.md`, three fixture items, and a `DECISIONS.md` entry.

```
{ id,                       // minted by packet 2
  subject, unit, specCode,  // e.g. 'business', 'WBS12', '2.3.1'
  template,                 // generator id
  ranges,                   // the draw, with the constraints that keep answers clean
  steps: [ { label, method, marks, answer, tolerance, unit,
             ofr,           // accepted carry-forward from earlier steps
             slips } ],     // known wrong methods → the feedback each earns
  solution }                // worked lines, with the drawn numbers substituted
```

The validator counts items of this type per unit at tier **DEBT** until 13.2 lands, then the tier is the
founder's call.

---

## Packets

### 13.1 — Quant engine

**Build.** `lib/quant/`: seeded RNG so an attempt is reproducible from its id, the template runner, and the
marking function — tolerance, method marks, own figure rule, slip detection.
`components/quant/CalculationItem.jsx` renders and marks an item. Three fixtures only; templates come next.
Add the `feature` array and `add` subcommand to the ledger (see **Ledger** below).

**Why here.** Everything else in the programme is content sitting on this.

**Acceptance.** `npm run quant-check` green. The three fixtures render and mark at `/admin/quant`. Build green.

**Verify B.** No — nothing student-facing yet.

### 13.2 — Six templates, wired into Learn Mode and the Quiz tab

**Build.** Break-even and margin of safety (WBS12), investment appraisal — payback and ARR (WBS13), percentage
change (both subjects), index numbers and real vs nominal (WEC12), the multiplier (WEC12), PED from data
(WEC11). Chosen by ledger demand, heaviest sections first. Quant items join the `InlineQuiz` distribution in
`LearnModeTab.jsx` and render in `QuizTab`.

**Acceptance.** Verify B at 390px on one Economics and one Business section: a calculation appears in Learn
Mode, marks correctly, and a second step built correctly on a wrong first answer still scores, badged as the
own figure rule.

### 13.3 — Twelve more templates, and Smart Practice

**Build.** NPV, gearing, ROCE, labour productivity, capacity utilisation, market share and growth (Business);
YED, XED, PES, MC/MR/AC, exchange rate conversion, real vs nominal income (Economics). Quant items enter the
SM-2 queue in `lib/spaced-repetition.js` keyed by `item_id` from packet 2.

**Why it matters.** This is the first item type in the product whose answer cannot be memorised between
reviews — only the method survives. It fixes a real weakness in scheduling multiple choice.

**Acceptance.** A due quant item appears in a `/practice` session, is rescheduled by SM-2 after answering, and
shows different numbers on the next review.

### 13.4 — The calculations session, and measuring it

**Build.** `/calculations-practice` mirroring `/flashcards-practice`; `CalculationsEngine` beside
`FlashcardsEngine` and `WrittenPracticeEngine`; strength and progress wiring; `quant_start`, `quant_submit`,
`quant_correct` added to the `lib/funnel.js` allow-list so the feature is measurable from the day it ships —
packet 1's rule, applied here.

**Ship checkpoint.** PR into `main`. The quantitative half is complete and in front of students before the
content stage starts.

### 13.5 — Diagram spec format and the marking engine

**Build.** `lib/diagram/`: the spec schema (axes, curves as `{ intercept, slope }`, named regions as polygon
recipes, the expected curve, direction and regions, tolerances, per-branch feedback), the marking functions,
and the label placement solver — measured boxes, each label sliding only along its own guide, optional labels
dropped rather than overlapped. `npm run diagram-check` lands here.

**Acceptance.** `diagram-check` green on two pilot specs.

### 13.6 — The drill component

**Build.** Pointer, touch and keyboard paths; a tap-to-select-then-nudge fallback for phones; the three-step
flow; a marked attempt that can be replayed; an ARIA description of the attempt so a screen reader gets the
same information as the canvas, to packet 11's standard.

**Acceptance.** Verify B at 390px: shift a curve with a finger, mark it, read the feedback, without pinch-zoom
at any point.

### 13.7 — Six Economics specs, wired

**Build.** Indirect tax, subsidy, maximum price, minimum wage, negative externality, AD/AS shock. Wired into
the Learn Mode recall slot so a drill returns two or three steps after `InlineDiagram` taught the diagram, and
into the Diagrams tab as "practise drawing this". `DiagramLabelDrill` rides along on the same surface.

**Acceptance.** Verify B at 390px on `market-failure` and `government-intervention`.

### 13.8 — Six Business and macro specs, and the Business surface

**Build.** Break-even chart, decision tree, PPF, tariff, exchange rate, monopoly vs competition. Closes
`C-financial-planning-structure-01`: that section has zero diagrams while containing an entire break-even
subsection. Depends on packet 12's resolution of the Economics-only Diagrams tab; if 12 removes the tab from
what is sold instead of enabling it, these live in Learn Mode only and the packet says so in `DECISIONS.md`.

**Ship checkpoint.** PR into `main`.

---

## The two guard scripts

The repo has no tests and `npm run build` is the floor. These are the drill equivalent of `npm run contrast`:
static, no browser, no network, exit non-zero on failure.

**`npm run quant-check`** — for every template, draw 200 instances and assert:

- every answer is representable at its declared precision;
- no degenerate draw: zero contribution, negative break-even, a PED of exactly 1 where the classification step
  would be ambiguous;
- every own-figure chain resolves to a finite number;
- **every declared slip value differs from the correct answer by more than the tolerance.** A slip that falls
  inside tolerance marks a wrong method as correct. It is the one failure in this design that silently teaches
  the wrong thing, and it is invisible in review.

**`npm run diagram-check`** — for every spec, assert:

- the model attempt scores full marks;
- an attempt shifted the wrong way loses exactly the direction mark and nothing else;
- the named regions are disjoint and their union is the whole surplus area;
- the label solver places every label with zero overlaps across the full range of student shifts, at both
  390px and 1024px.

Worth saying plainly: these are the first items in Revvy Learn that a script can prove correct. Everything else
in the product needs a human to read it.

---

## Ledger

The drill work has no audit findings behind it, so it has no ids, so `ledger.mjs unverified <n>` would pass
vacuously and step 2 of the protocol gate would be a no-op.

Fixed in 13.1: add a `feature` array to `audit/ledger.json` and an `add` subcommand to `ledger.mjs` (about
thirty lines), then mint `D001…` — one id per acceptance check, assigned to its packet. Claim, Verify A with
`file:line` evidence, and the `unverified` gate then work unchanged. Nothing else in `PROTOCOL.md` changes.

---

## Decisions that are the founder's, not the plan's

1. **Both halves now, or quant now and drawing after the top-ten sections.** Recommendation above: split.
2. **Teacher sign-off on the diagram specs.** An expected region is a mark-scheme claim. Either add roughly
   four hours to the IAL teacher's brief, or write the gate honestly as "the founder reviewed it".
3. **Free or premium.** Learn Mode is free, so drills there are free. The session route is the natural premium
   hook. Decide alongside the freemium boundary already due before packet 8.
4. **If the 1 November freeze holds, 13.5–13.8 are June work.** Say so now rather than discovering it in
   November.

---

## Out of scope

- **Freehand drawing.** The drill trains the decision — which curve, which way, which area — not the pen. Say
  that in the copy and pair each drill with a blank-paper prompt.
- **AI marking of either drill.** The entire point is that neither needs it.
- **Specs for the 19 existing SVGs.** They stay as blobs for reading. Specs are authored fresh for the twelve
  diagrams that are drilled.

---

## Definition of done

Per packet, unchanged from `PROTOCOL.md`: build green · guard script green · every claimed `D0xx` confirmed by
Verify A with evidence · walkthrough clean at 390px where it applies · `PROGRESS.md` row updated · committed
with `packet-13.x:` in the subject · pushed. Shipped at the checkpoints after 13.4 and 13.8.
