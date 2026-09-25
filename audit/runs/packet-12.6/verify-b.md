# Verify B — packet 12.6, student walkthrough

First-time student, no account, storage cleared, **390 × 844** (custom size — the pane's `mobile` preset is
375 × 812 and was overridden; every pixel figure below is at 390px viewport width). Dev server `remediation-dev`
on port 3001, already running and confirmed serving current source by `curl` before the browser was opened
(`200`, 178,943 bytes, `lab-stimulus` present) — the stale-Turbopack trap was checked, not assumed.

Real taps and real typing throughout. Nothing was fixed and no file outside this one was written.

Route walked: `/economics/market-failure` → tapped **View Model Answers →** → `/economics/market-failure-model-answers`.

---

## Step by step

**step 1: the notes page at 390px** — `Market Failure — every type, every diagram`, sticky JUMP TO bar, hero,
`Open in app →`. `scrollWidth` 390, no page-level horizontal scroll. Five separate links to the model-answers
page exist. — PASS (a student can find the packet's page without a deep link)

**step 2: tapped "View Model Answers →"** — lands on `Market Failure — Exam Questions & Model Answers`,
`Section 1.3.5 — Annotated model answers for negative externalities…`, `ECONOMICS · WEC11 · UNIT 1 · 1.3.5`,
`3 written questions · 32 marks`. Header names the right section and the right subject. Page height 9,264px.
— PASS (no wrong-section header, no gate, nothing locked; the only paywall word anywhere on the page is one
`Pro` in the closing CTA, and it gates AI marking in the app, not this content)

**step 3: first screen after the title** — an audit panel: **"This page examines 6 of 35 requirements in
1.3.5 Market Failure — 17.1%"**, then a bulleted list of six `ECON-1.3.5-…` requirement codes, then a
disclosure **"29 requirements in 1.3.5 that no question on this page examines"**. Top 535px, height 549px.
— FAIL *(soft)* — see Finding 3. Not a 12.6 id; recorded because it is what a student meets first.

**step 4: the extract (E035)** — `The extract these questions are answered from`, top **1105px (1.31 screens)**,
height 1467px, running to 2572px. Plain `<section class="lab-stimulus">` in document flow, no ancestor
`<details>` or `<dialog>`, fully painted on load. **No interaction of any kind is required to read the prose.**
— PASS against E035 as written

**step 5: Table 1, at 390px** — top 2168px. **FAIL — blocking. See Finding 1.**

**step 6: first question** — `Explain · 4 marks · AO1 · AO2 · 5 min` — *"Explain what is meant by a negative
externality and give one example."* The `Exam questions` heading is at 2603px = **3.08 screens** below the
top; the first attempt box at 2822px = **3.34 screens**. — PASS on content, FAIL *(soft)* on depth (Finding 3)

**step 7: typed a real answer** — tapped the textarea (274 × 153px), typed 80 characters. Placeholder read
*"Write your answer here. It stays in this browser."* and the note under it explains the storage honestly
(*"Close the tab and come back and it is still here; open it on another device and it is not."*). — PASS

**step 8: ticked one criterion with a real tap** — the tick target is the whole label (272 × 83px), not the
18 × 18px box, so it is thumb-sized. Total moved `0 of 4 marks claimed — 0 of 4 criteria ticked` →
**`1 of 4 marks claimed — 1 of 4 criteria ticked`**. The marked-script disclosure **opened by itself** and its
summary changed to `The marked script — 1 segment marked`. — PASS (E036: total counts marks against the
tariff, not ticks)

**step 9: the linked segment** — `seg-neg-externality-4-p1a` highlighted, 248px wide at 390px viewport, with
its own claim line `1 mark — 1–2 marks — definition` and the reason (*"The third-party clause is the first
definition mark…"*). Legible, no clipping, no overlap. — PASS

**step 10: looked for a score button** — `document.querySelectorAll('.lab-attempt button')` → `[]`. Nothing
on screen offers to score the answer. — PASS (E036)

**step 11: reloaded the page** — draft returned verbatim, tick still on, total back to `1 of 4`, segment still
marked. Keys `rl:attempt:v1:neg-externality-4`, `…:negative-externality-tax-8`,
`…:market-failure-government-intervention-20`. — PASS (E036). *Minor:* all three keys exist although only one
question was touched, so an empty record is written on mount for every question. Harmless, not student-visible.

**step 12: read the rest of the page** — questions 2 (`Examine · 8 marks · 11 min`) and 3 (`Evaluate ·
20 marks · 26 min`), each with the same attempt block, `Mark scheme`, `Model answer — 5–6 / 8` and
`— 18–20 / 20`, `Examiner commentary`, and on the 20-mark item `Why this loses marks — a mid-band attempt at
the same question`. Then `Data response` and `Now try one yourself`. No recall shown twice, no text box
without a control, no dead end. — PASS

**step 13: the extract against the questions** — **FAIL — blocking. See Finding 2.**

**step 14: resume pointer** — searched the rendered page for `step N of M`: **zero matches**. The only
`N of M` strings are `6 of 35` (coverage), `0 of 4`, `0 of 8`, `0 of 20`, `0 of 17` — all attempt totals,
all correct at their tariff, none a step counter. The "step 20 of 9" defect lives in
`components/LearnModeTab.jsx:762`, which `git diff HEAD` shows is **untouched by this packet**, and whose
`safeStep` is clamped (`clampStep(currentStep, totalSteps)` / `resolvePointer`). No blank body anywhere.
— PASS, not reachable on this packet's surface

**Console:** no errors, no warnings, no React key or hydration messages across the whole session. Only
`[HMR] connected`, `[Fast Refresh]` and the React DevTools notice. **No console errors.**

---

## Finding 1 — BLOCKING. The extract's table loses a whole column at 390px, silently

This is the failure the brief said to look for, and it is here.

| measured at 390px viewport | value |
|---|---|
| table `getBoundingClientRect().width` | 460.0px |
| table `getComputedStyle().width` | 460px (`min-width: 460px`) — rect and computed agree, so this is the product, not an animation |
| scroll box `.lab-stimulus-table-wrap` `clientWidth` | **317px** |
| `scrollWidth - clientWidth` | **143px off-screen (31% of the table)** |
| column widths | 117.7 / 83.9 / 123.6 / **133.8** |
| page-level horizontal scroll | none (`document.scrollWidth` 390) |

317px reaches the end of column 3 and no further. **Column 4 — "Estimated price elasticity of demand",
carrying −0.6, −0.9, −1.4, −0.4 — is entirely off-screen at rest and the student is never told it is there.**

Every structural check passes and misses it: the section is in flow, not in a `<details>`, not in a
`<dialog>`, no `@media` rule hides it, the page does not scroll sideways, the cells are 12–13px and wrap
cleanly. What nobody measured is that the *box* is 317px and the *table* is 460px. Verify A recorded
`min-width: 460px` inside `overflow-x: auto` and read it as the fix; at 390px it is the defect.

There is **no affordance**: `::after` content `none`, no mask-image, no box-shadow, no fade, no caption, no
"swipe" note. The wrap's only signal is the native scrollbar, which the desktop screenshot renders as a grey
track but which iOS Safari hides until a gesture has already begun. The column is reachable —
`scrollLeft` goes to 143 — but nothing tells a student to reach for it.

Why it matters beyond tidiness: `content/data-response/econ-u1-market-failure.md:50` states that
*"Level 3 (5–6) answers explicitly link elasticity (−1.4) to the size of the behavioural response"*, and
`:71` makes evaluating by PED the condition for Level 4. The number that separates Level 2 from Level 3 on
the source extract is the one number the phone does not show. On the rendered page `−1.4` appears exactly
once and `elasticit*` exactly once — both inside the hidden column.

## Finding 2 — BLOCKING. The page tells the student the extract earns the marks; the exemplars never use it

Directly above the extract, in `.lab-note`:

> "Read this first. The application marks below are awarded for using it, not for remembering a textbook example."

With **every disclosure forced open**, the whole questions block (`.lab-block`, 24,753 characters of question
stems, criteria, mark schemes, model answers, marked scripts, examiner commentary and the mid-band attempt)
contains:

- `AED …` — **0 occurrences**
- `UAE` / `Dubai` / `Gulf` / `GCC` — **0 occurrences**
- `elastic*` — **0 occurrences**
- `plastic bag` — **0 occurrences**
- percentages — **one**, and it is `34%`, in the 20-mark script: *"The UK's sugar tax (Soft Drinks Industry
  Levy), introduced in 2018, reduced sugary drink consumption by 34% … Two application marks"*

So the one place the page shows a student where application marks are earned, it earns them from a **UK
textbook example** — the exact thing the note above the extract says will not earn them. A student who
follows the instruction and quotes the UAE table is following advice that the page's own model answer
contradicts two screens later.

The three question stems are pure theory and name nothing in the extract:

1. *Explain what is meant by a negative externality and give one example.* (4)
2. *Examine how a negative externality of production leads to market failure.* (8)
3. *Evaluate the view that government intervention is always necessary to correct market failure.* (20)

E035's acceptance is "renders in the page flow, not gated" and by that wording it passes — the extract is
attached and visible. But the student outcome is a 1,467px extract (1.7 screens) presented as required
reading for questions that do not use it, in front of exemplars that model the opposite behaviour. The
spec's own open question — *which 1.3.5 items "carry application marks"* (brief, "Contradictions", item 2) —
was resolved at Build time as "all three carry `AO2`, so attach it to all three". Read by AO tag rather than
by whether the question can be answered from the extract, that judgement produced this. The founder should
decide whether these three items should carry `stimulus` at all, or whether the note should be reworded.

## Finding 3 — soft. The student meets an audit panel before any economics

Order down the page at 390 × 844: title (0.19 screens) → **coverage panel, 549px, "This page examines 6 of 35
requirements… 17.1%" + six `ECON-1.3.5-…` codes + a disclosure listing 29 more** (0.63) → extract, 1,467px
(1.31) → **first question at 3.08 screens, first attempt box at 3.34 screens**.

A sixteen-year-old opening this to practise market failure scrolls past a spec-coverage percentage and
internal requirement identifiers, then a 1.7-screen news extract, before reaching a single exam question.
The panel's own copy concedes it is measuring the wrong thing for a student ("not the whole question bank,
and not the revision notes, which are measured separately and are much better covered"). This is packet
12.4's `E031` panel, not 12.6's, and the extract's position is what E035 asked for — flagged as a
compounding student-experience cost, not as a 12.6 rejection.

---

## Audit complaints still visible

- **A diagram/table whose content cannot be read** — yes, Finding 1 (column 4 of Table 1).
- **A step that runs to many screens before the first thing to do** — yes, 3.34 screens, Finding 3.
- A gate the student cannot get past — none. An exercise with no defensible answer — none; all criteria are
  defensible and every tick names the mark it claims. A text box with no button — none (the design is
  deliberately buttonless and says so). A recall shown twice — none. A header naming the wrong section —
  none.

## Verdict

**E033, E034, E036, E037: no student-visible defect found.** The attempt loop is the best thing in the
packet — real typing, a tick that moves a mark total against the tariff, a segment that lights up with the
reason it earns its mark, no score button, survives reload, and not one console error.

**E035: reject.** It is rendered where the spec asked, but what the student ends up with is a table missing
its decisive column at phone width with nothing to say so (Finding 1), attached to three questions that
never use it, under a note that the page's own exemplar contradicts (Finding 2).
