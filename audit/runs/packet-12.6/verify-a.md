# Verify A — packet 12.6, re-verification after walkthrough fix round B1

22 September 2026 · `packet-verifier` · read-only (ledger CLI only) · dev server `remediation-dev` on 3001,
viewport 390x844.

I did not read `built.md`, `verify-b.md`, or any `ab-*` capture in this directory. Everything below is
measured from the working tree, the staged diff, and the running page.

## What round B1 actually changed

`ledger.mjs unverified 12.6` printed "gate clear" on entry: all five ids were already `confirmed` by the
first pass. So the only question this pass can answer is whether B1 moved anything under those confirmations.

Nothing in the staged diff is labelled "B1", so I located the delta by mtime against the rest of the packet:

| file | mtime | round |
|---|---|---|
| `audit/scripts/validate-model-answers.mjs` | 19:13 | build |
| `lib/stimulus.js` | 19:14 | build |
| `components/MarkedScriptAttempt.jsx` | 19:15 | build |
| `lib/model-answers-route.js` | 19:15 | build |
| `data/modelAnswersData.js` | 19:23 | build |
| `data/modelAnswersExpansion.js` | 19:24 | build |
| **`components/SectionModelAnswersPage.jsx`** | **19:59** | **B1** |
| **`components/model-answers-layout.css`** | **20:01** | **B1** |

Two files, and both are shared by all 32 pages, so B1's blast radius is E035, E036 and E037. E033 and E034
are untouched by it; I re-derived them anyway by a method the first pass did not use, because their evidence
fields are what the gate rests on.

B1's two edits, read out of the diff:

1. `StimulusBlock`'s `lab-note` prose. It used to read "The application marks below are awarded for using
   it, not for remembering a textbook example." It now says the answers below were written before the
   extract was attached and points at `/data-response/econ-u1-market-failure`.
2. `.lab-stimulus-table`'s `min-width: 460px` floor is gone, and `.lab-stimulus-table-wrap` gained a
   four-layer `local`/`scroll` gradient that paints an edge shadow only while the box is scrollable.

## E033 — the guard, proved by mutation

**Different method from both the fix and the first pass.** The first pass mutated a sandbox *copy of the
repo* one rule at a time and watched `npm run validate`'s exit code. I did not touch any file: I sliced the
module's source at `const findings = checkBank();`, loaded the half above it as a library
(`scratchpad/valcore.mjs`), and drove `checkItem()` with twelve in-memory objects cloned from
`negative-externality-tax-8`. No process exit codes involved, so a rule that "fires" by some unrelated crash
cannot be mistaken for a rule that works.

| case | result |
|---|---|
| control, unmutated retrofitted item | silent |
| control, a non-retrofitted item | silent |
| R1 one criterion's `marks` +1 | FIRES — "criteria marks sum to 9, item is 8 marks" |
| R1 drop the last criterion | FIRES — "sum to 7, item is 8 marks" |
| R2 `seg` → `p9z` (nonexistent anywhere) | FIRES |
| R2 `seg` → `p4e`, a **real segment id on another item** | FIRES — cross-item resolution is not forgiven |
| R3 duplicate a segment id | FIRES — "segment id \"p1a\" appears 2 times" |
| R4 `marks: 7`, criteria sum kept at 7 | FIRES — "legal: 2, 4, 6, 8, 14, 20" |
| R4 `marks: 10`, criteria sum kept at 10 | FIRES — 10 is legal Business, not Economics |
| R5 `criteria` without `script` | FIRES |
| R5 `script` without `criteria` | FIRES |
| R6 `stimulus: 'no-such-extract'` | FIRES |
| R6 real stimulus | silent |

Both R4 cases keep the criteria sum equal to the mutated tariff, so R1 cannot be what fired. The tariff list
in the message is `2, 4, 6, 8, 14, 20` for Economics and `2, 4, 6, 8, 10, 12, 20` for Business, both returned
by `tariffsFor()`; `lib/practice-tariffs.js:17` imports them from `lib/ial-marking.js`, and stripping comment
lines from `validate-model-answers.mjs` leaves **no numeric array literal at all** — there is no second source
of truth in the new file, which is what the spec's R4 note demands.

Wiring: `package.json:15` — `validate` is `validate-content.mjs && validate-model-answers.mjs`.
`npm run validate` exits 0 and its last lines are this script's ("66 in the bank, 3 carrying the
marked-script shape / 0 findings"), so the second command is reached, not short-circuited.

**CONFIRMED.**

## E034 — 1.3.5 carries the shape, and nothing was removed

Recomputed from the imported module, not from the validator (a check that reuses the implementation cannot
see its blind spot):

| item | marks | criteria | sum | segments | unique | unresolved | orphan |
|---|---|---|---|---|---|---|---|
| `neg-externality-4` | 4 | 4 | **4** | 4 | 4 | 0 | 0 |
| `negative-externality-tax-8` | 8 | 8 | **8** | 8 | 8 | 0 | 0 |
| `market-failure-government-intervention-20` | 20 | 17 | **20** | 17 | 17 | 0 | 0 |

"No existing field removed" checked by importing HEAD's `data/modelAnswersData.js` (via
`git show HEAD:…`, with its expansion import repointed) alongside the working one and comparing all 66 items
key by key: 66 vs 66, no id added, no id removed, **`removed = []` on every item**. The three 12.6 items add
only `criteria`, `script`, `stimulus`, `minutes` (plus `specItems`, which 45 items gain — packet 12.4's, not
this one's). Exactly two pre-existing fields changed anywhere in the bank, `sectionNumber`/`sectionTitle` on
`economies-scale-4` and `econ-diseconomies-scale-8`; those are packet 12.4's rehoming and are outside 12.6.

**CONFIRMED.**

## E035 — the extract is attached and in the flow, after B1

Measured live at 390x844 on the running page, after B1:

- `.lab-stimulus` count **1** (once per page, not once per question), `display: block`, `visibility:
  visible`, `opacity: 1`.
- `closest('details')` → `null`, `closest('dialog')` → `null`, no `[hidden]` ancestor. No interaction is
  needed to read it.
- `stimTop 1104.6` against `questionsTop 2760.0` — above the questions, in the flow.
- All three items on the page carry `stimulus: 'econ-u1-market-failure'`, and all three carry AO2, so every
  question with application marks has it.
- Page `scrollWidth` 390 = `innerWidth`. No horizontal page scroll.

**The B1 table fix is real, and I measured the rendered geometry rather than re-deriving `min-content`, which
is the number the fix's own comment argues from.** With the 460px floor removed the table's computed
`min-width` is `0px`, its box is 317px, and `wrap.scrollWidth` is **317** against `wrap.clientWidth` **317** —
it does not overflow at all, so nothing is off-screen at rest. Column widths 93.2 / 63.8 / 79.2 / 79.7px; no
cell has `scrollWidth > clientWidth`, so no text is clipped. Type is 13px body / 12px head, and the smallest
computed font anywhere in the block is **12px**, at the floor, not below it. A screenshot at 390 shows all
four columns including "Estimated price elasticity of demand" with −0.6 / −0.9 / −1.4 / −0.4 legible — the
column the old floor was pushing out of view.

B1's new note makes a checkable promise: "The link at the end of this extract goes to answers that do use
it." `/data-response/econ-u1-market-failure` returns **200** and its text contains `AED 0.18` ×3, `-1.4` ×3
and `45%` ×4. The promise is kept.

I also checked the claim B1's comment makes about the old note, because a fix round that rewrites prose is
the easiest place to launder a false statement into a true-sounding one. It is accurate, and I found it
independently by dumping the three items' `script` segments: the marks are earned on a coal-fired power
station (`p2a` of the 4), a steel factory (`p2a` of the 8) and the UK Soft Drinks Industry Levy (`p2c` of the
20). Not one of the three cites the UAE extract — no `AED`, no `-1.4`, no `45%`. So the spec's own note
("1.3.5's existing model answers cite the extract correctly (AED 0.18 per bag, PED -1.4, 45% fall)") was
**false**; those figures live in `content/data-response/econ-u1-market-failure.md`'s own answers, not in the
bank. B1 removing the sentence that depended on it is the correct call, and re-authoring the three answers
against this extract would be new marking, which E034 forbids inside this packet.

Residual, recorded not hidden: the page now ships an extract its own model answers do not apply. That is a
12.8 problem, it is disclosed to the student in the note rather than papered over, and it is not what E035's
title names. E035 names attachment and in-flow rendering, and both are fully true.

**CONFIRMED**, with that residual noted.

## E036 — the attempt loop, re-driven after B1

Cleared `rl:attempt:v1:*`, reloaded, and drove the 20-mark item:

- Fresh state reads `0 of 4` / `0 of 8` / `0 of 20`. Three `.lab-attempt` blocks, aria-labels
  "Attempt and self-mark: Explain (4 marks) / Examine (8) / Evaluate (20)". Criteria counts 4 / 8 / 17,
  segment counts 4 / 8 / 17.
- Ticked `c1` then `c5`: total went to **"3 of 20 marks claimed — 2 of 17 criteria ticked"**. It moves on the
  tick; `querySelectorAll('button')` inside `.lab-attempt` is **0**, so there is no score button and the
  `<details>` summary is the only control.
- `.lab-script-seg.is-marked` appeared on `seg-…-p1a` and `seg-…-p2c`, each with its own claim line
  ("1 mark — AO1 — knowledge (4 marks)", "2 marks — AO2 — application (4 marks)"), and the script opened
  itself.
- `localStorage['rl:attempt:v1:market-failure-government-intervention-20']` =
  `{"draft":"VERIFIER DRAFT 12.6 B1","ticked":["c1","c5"]}`. After a full reload the draft, both ticks, both
  marked segments and the open script all came back.
- B1 touchpoint checked: every `.lab-criterion > label` measures ≥44px — the B1 CSS edit did not shrink a tap
  target below the packet 5 floor.
- Only the three 1.3.5 items carry `criteria` in the whole 66-item bank.
- Console: nothing but Turbopack HMR websocket noise. No React warnings, no app errors.

**CONFIRMED.**

## E037 — nothing else moved, re-checked against B1's delta

The first pass proved this with a purpose-built control (tree cloned, 12.6 surgically removed, 32 pages
diffed). I did not repeat that; I tested the thing B1 could have broken, which is that its two edits land in
files every page shares.

Two routes exist for B1 to reach another page, and I closed both by measurement rather than by reading the
null-guard in `StimulusBlock`:

1. **Markup.** Fetched eight other pages — `meeting-customer-needs`, `the-market`, `external-influences`
   (Business), `demand`, `government-intervention`, `labour-markets`, `poverty-inequality`,
   `price-determination` (Economics) — and counted 12.6 markers in the served HTML.
   `lab-stimulus` **0**, `lab-attempt` **0**, `lab-criteri*` **0**, `lab-script` **0**, `MarkedScriptAttempt`
   **0**, on all eight.
2. **Cascade.** On `/business/meeting-customer-needs-model-answers` I walked `document.styleSheets` (3 sheets,
   2316 selectors) and pulled out every rule whose selector mentions a 12.6 class. **All 38 of packet 12.6's
   rules are served on that page and every one of them matches 0 elements.** Every new selector is scoped to
   a class 12.6 mints; a tree-wide grep confirms no other component or stylesheet uses `lab-stimulus`,
   `lab-attempt`, `lab-criteri*` or `lab-script*`. So the B1 CSS delta — including removing the 460px floor —
   cannot alter any page but Market Failure. Page `scrollWidth` 390 = `innerWidth` there too.

The `.lab-details lab-attempt-script` pairing is the one place 12.6 reuses a pre-existing class, and the only
rule B1's file adds for it is `.lab-attempt-script { margin-top: 12px }`, which is 12.6-scoped.

Caveat carried forward from the first pass and unchanged: `/business/the-market-model-answers` does differ
from HEAD (it is the empty page, 32KB against 62–98KB for the others), but that is packet 12.4's E027/E031
empty-state work in the same staged file, not 12.6. The correct control for E037 is HEAD-plus-other-in-flight
minus 12.6, which is what the first pass built.

**CONFIRMED.**

## Unclaimed but relevant

`ledger.mjs packet 12.6` lists exactly the five ids E033–E037 and all five are claimed. Nothing assigned to
this packet is unclaimed.

## Gate

`npm run validate` exits 0 with the model-answer script reached. All five ids stand after round B1; B1 fixed
a false sentence and a 460px floor that was hiding a column, and introduced nothing that reaches another page.
The gate should pass, with the E035 residual (the three 1.3.5 answers do not apply the attached extract)
carried into packet 12.8 rather than closed here.
