# Verify B — packet 42, student walkthrough (`business__resource-management`)

First-time student, signed out, storage cleared, viewport **390x844**, dev server `remediation-dev`
on port 3001 (already running from another session; not restarted — the served payload was
checked with `curl` before the walk rather than trusted).

Route walked: `http://localhost:3001/business/unit-2/resource-management?draft=1`.
Nothing was edited. Every pixel figure below states the viewport width it was taken at.

## Which corpus the student was shown, and which one a student gets today

The packet is staged to the `draft` column. `app/business/[unit]/[topic]/page.jsx` and
`app/api/sections/[id]/route.js` both read `data` unless `?draft=1` is passed, and the API refuses
that flag in a production build. Measured on the running server:

| route | blocks the student sees |
|---|---|
| `/api/sections/resource-management` (the student path) | `Methods of Production · Capacity Utilisation · Inventory Management · Quality Management` — quiz 7, practice 5, **diagrams 0** |
| `…?draft=1` (walked here) | `Production, Productivity and Efficiency · Capacity Utilisation · Inventory Control · Quality Management` — quiz 7 of 35, practice 10, **diagrams 4** |

So **a student today still gets the pre-packet section**, Toyota sentence included. That is the
protocol working as intended, not a defect; it is stated because "what the student ends up with"
is, until the founder publishes, nothing from this packet.

One consequence worth knowing: the old text is still in the served HTML of the draft page, in the
off-screen SEO block (`<p>` at x=-1, width 1px, at 390px viewport) which is built server-side from
`data`. It is not visible to a student and not reachable by scrolling, but any text-extraction of
that page returns the **old** content. A probe that greps the page body rather than the rendered
Learn panel would read the wrong corpus and conclude the packet had not shipped.

---

## The walk

- **step 1: landing.** `SECTION 2.3.4` · `Unit 2: Managing Business Activities` · "Resource
  Management" · "Learn Mode · ✓Free · 30 steps" · `Start learning →`. Free resources tiles: Learn
  30 steps, Notes 4 topics, Diagrams "All annotated", Practice 10 questions. — **PASS** (section
  number, unit and title all name this section).
- **step 2: enter Learn Mode.** Optional pre-test offered: "Want a quick check first? Three
  questions on what you might already know. Optional, and nothing is marked." with
  `Test yourself first` / `Just teach me`. — **PASS** (no gate; both exits work).
- **step 3: STEP 1 OF 30 · CHAPTER 1 OF 4 · Production, Productivity and Efficiency · part 1 of
  10 · "Job and Batch Production".** Key idea, body, a 3-node flow, `🔧 REAL EXAMPLE`,
  `COMMON MISCONCEPTION`, `EXAM MATTERS`, then `🧠 QUICK RECALL — SORT`. — **PASS** on structure,
  **FAIL on the opening sentence** (see Blocking, below).
- **step 4: the recall, with real taps.** Tapped an item then a group; all four placed; `Check
  groups` → "✓ All correct!", each chip re-labelled "…: correct." — **PASS** (the widget has a
  button, it marks, and it gives feedback).
- **step 5: STEP 2 OF 30 · part 2 of 10 · "Flow and Cell Production".** Cell is taught beside job,
  batch and flow, not inside a lean aside. — **PASS** (`specGap-04` is true on screen).
- **step 6: chapter jump.** Chapter buttons read "Chapter 3: Inventory Control (not reached yet)";
  tapping it leaves the student on the current step. — **PASS** (sequencing, not a gate).
- **step 7: reload mid-section, then re-enter.** Banner: **"You left off at step 6 of 30. Pick up
  where you left off?"** with `Continue` / `Start over`. Body rendered in full underneath
  (STEP 6 OF 30 · CHAPTER 1 OF 4 · part 6 of 10 · "Improving Productivity, and Why It Makes a
  Business Competitive"). — **PASS**, and this is the named resume-pointer failure not reproducing
  (see below).
- **step 8: single `Next →`.** STEP 7 OF 30 · part 7 of 10 · "Efficiency: Production at Minimum
  Average Cost", key idea present. — **PASS**.
- **step 9: Diagrams tab.** 4 diagrams, each with named scenario chips (e.g. "Minimum average
  cost" / "Labour against capital"), an `Enlarge diagram` button and a "WHAT A CORRECT DIAGRAM
  SHOWS" panel. — **PASS** on presence (was 0 diagrams live).
- **step 10: enlarge sheet, opened by a real tap.** `Fit / Read / Closer` stops, "Read" selected,
  "Drag sideways to see the rest — or tap Fit". — **PASS** (measurements below).
- **step 11: Practice tab.** 10 questions, filter chips `All 10 · 2 Marks 1 · 4 Marks 5 · 6 Marks
  1 · 8 Marks 1 · 10 Marks 1 · 12 Marks 0 · 20 Marks 1`. First item: **"Define the term
  'productivity'. (2 marks)"** with a `Define` command-word tag and a `▶ Show Guidance` button. —
  **PASS** (`practice-01`'s "Define … (4 marks)" is gone as the student sees it).
- **step 12: Quiz tab, signed out.** Q1 "A workshop builds one wheelchair at a time to each user's
  measurements. This is:" → job / batch / cell / flow. Q2 "A hotel with 250 rooms let 190 last
  night. Capacity utilisation was:" → 132% / 60 rooms / 76% / 24%. `Submit Answers` present. —
  **PASS** (no option prints its own answer; the correct option is not in the same slot twice).

---

## The two failures this programme has already shipped

### 1. A table illegible at 390px because nothing measured cell width — NOT PRESENT, but the width figure in Verify A is out of scope

There is no table anywhere in the teaching content to be illegible: body block types across all 26
subsections are `paragraph` ×108 and `flow` ×5, and the served draft contains **0** `<table>` and
**0** markdown pipe rows.

The analogue — the drawing whose labels are sized in viewBox units and rendered at some other scale
— **was** measured, in the browser, at 390px, and it is where Verify A's number does not hold:

| | inline, in the Diagrams tab | enlarge sheet |
|---|---|---|
| SVG rendered width @ 390px viewport | **306.0 px** | **400.0 px** |
| viewBox width | 400 u | 400 u |
| scale | **0.765** | **1.000** |
| smallest label, as authored | 12 u | 12 u |
| **smallest label, as rendered** | **9.18 CSS px** | **12.00 CSS px** |
| labels under 12 CSS px | **31 of 35** | **0 of 7** |
| label collisions / viewBox overflow | 0 | 0 |

Verify A reports "smallest label 12px at viewBox 400 (**≈11.7 CSS px at 390**), the F088
precedent". 11.7px assumes the drawing occupies ~382px. It occupies **306px** — the tab content is
384px and the diagram card's padding takes the rest — so the real inline figure is **9.18 CSS px**,
about 22% smaller than reported. The 12px figure is true of the **sheet**, which
`lib/diagram-enlarge.js` sizes precisely to deliver it (12 × 400 ÷ 12 = 400px). A sheet-grade
number was attached to an inline scope.

**This is not a new defect and not a missing font floor.** `DECISIONS.md` (21 September, packet 11,
V037) rules on exactly this and says so in terms: *"The inline diagram stays at 298px with 7-9px
labels… Shipping that would look like progress and not be any."* The sheet is the phone answer, and
here it works. What is worth recording is that this is the **fifth** instance of the thing that file
already names four times — a true measurement quoted past the width it was taken at.

The sheet measurement was taken against the animation guard: opened by a real tap, visible class
`lm-diagram-modal-v` present, transform `matrix(1, 0, 0, 1, 0, 0)`, and
`getComputedStyle(svg).width` = `400px` equal to `getBoundingClientRect().width` = 400.0. No 0.92
artefact. The sheet is 400px in a 390px pane, so the student drags 10px sideways, or taps Fit.

### 2. A resume pointer rendering "step 20 of 9" with a blank body — NOT REPRODUCED

The anonymous pointer is written to `localStorage` as
`revvy_learnmode_3_resource-management_section` = `{"v":"30.1n9ghfh","s":5}` — a step **and a
version fingerprint** (30 steps + hash). On reload the student is offered "You left off at step
**6 of 30**", the count is right, the body renders, and `Continue` / `Start over` both work. The
`step >= totalSteps` case cannot arise from this packet in the ordinary direction: the deck grows
10 subsections → 26 subsections / 30 steps, so an old pointer is in range, and
`lib/learn-steps.js` treats a draft served through `?draft=1` as never published, making every
legacy pointer correctly foreign to it.

**One thing I saw and could not reproduce, recorded rather than claimed.** While tapping `Next →`
four times in quick succession I caught a frame showing `STEP 5 OF 30` with a **completely blank
body** — progress bar, chapter dots and step counter present, nothing below. It resolved to step 6
on its own within ~3s. A single deliberate `Next →` tap, screenshotted with no wait, showed no
blank frame at all. I am calling this a transient during rapid advancement, **not** the named
defect; it is written down because it is the same shape as the named defect, and one sighting is
not enough to say which it is.

---

## Blocking defect: the student reads the audit's own scaffolding

**20 of 26 subsections open their body text with the spec-audit's leaf numbering**, addressed to
the checker rather than to the student. 25 occurrences in total, every one of them in
`content[].sections[].body[].text` — the prose a student reads, not a metadata field:

> **Leaf 1a** names **four** methods of production: job, batch, flow, cell.
> **Leaf 1b-2** asks for the factors influencing productivity, and the useful…
> **Leaf 1c-1** gives efficiency a precise test: **production at minimum average cost**…
> **Leaf 3a** asks for the **interpretation of an inventory control diagram**…
> **Leaf 4c** is **continuous improvement (Kaizen)**. Its claim is that a gr…

A sixteen-year-old has no referent for "Leaf 1b-4". Nothing on screen defines "leaf", the numbering
is never introduced, and it is the **first sentence** of nearly every step — so the opening line of
20 of 30 steps is about the specification's document structure rather than about the business idea.
Several also read as the specification talking ("Leaf 2b **asks for** the implications…", "The
**specification defines** efficiency as…"), which puts the student outside the material looking in.

This is visible on screen at step 1 and is not mentioned in Verify A, which checked whether each
leaf was *covered* — it is, thoroughly — and not how the coverage reads. The content is accurate,
well worked and correctly scoped; it is addressed to the wrong reader.

Full list of the 20 openers, with ids, is reproducible with:

```
curl -s "localhost:3001/api/sections/resource-management?draft=1" \
  | node -e "…" # body[0].text matched against /^\**\s*[Ll]eaf \d[a-f]/
```

## Smaller things a student meets

- **"A Anvari Cycles customer orders a frame…"** — `b0s0` `realExample`, on screen at step 1. One
  occurrence in the whole section (the only `A` + vowel-word hit in the payload).
- **Every step is 3.5–3.9 phone screens before the `Next →` button** at 390x844: step 1 is
  3103px of scroll in a 793px pane (3.91 screens), step 7 is 2812px (3.55 screens). Thirty of
  them. The audit's "runs to many screens before the first Next" complaint is still literally
  true, though it is now one subsection per step rather than two, which is what `structure-04`
  asked for. Flagging the figure, not calling it a regression.
- **The resume banner does not dismiss.** After tapping `Continue` it stays on screen and keeps
  re-rendering with the new number ("You left off at step 7 of 30…") as the student advances,
  holding ~130px of an 844px screen for the rest of the session.
- **The sidebar calls the section "Resources"** while every other surface calls it "Resource
  Management". Pre-existing (`sections.short_title`), untouched by this packet.
- The Next.js dev-tools bubble sits over the bottom-left of the content at 390px. Dev only.

## Console

**No console errors.** Whole session: three `[HMR] connected` logs and three React DevTools info
notices, nothing else. No warnings, no failed requests.

## Audit complaints still visible

- **A gate the student cannot get past** — none. All 30 Learn steps are free and reachable signed
  out; Quiz / Flashcards / Mistakes carry a lock glyph on the tab but render their free preview.
- **A step running to many screens before Next** — still true, 3.5–3.9 screens, measured above.
- **An exercise with no defensible answer** — none found in the recalls walked; the sort marked
  correctly and the two quiz items read cleanly.
- **A text box with no button** — none. `Check groups`, `Submit Answers`, `Show Guidance` all
  present and wired.
- **A recall shown twice in a row** — no. 26 recalls over 26 subsections, 0 repeated prompts,
  1 adjacent same-type pair (classify → classify) across the whole sequence.
- **A diagram whose labels cannot be read** — inline, yes, at **9.18 CSS px @ 390px**; via
  `Enlarge diagram`, no, **12.00 CSS px @ 390px**. Ruled and accepted by packet 11 / V037.
- **A header naming the wrong section** — no. `SECTION 2.3.4`, `CHAPTER n OF 4`, `part n of 10`
  and the chapter titles all agree with the content beneath them, at every step walked.

## Verdict

**Qualified pass, with one blocking content defect.** The rebuild is real and it holds up under a
student's hands: the chapters follow the specification's own order, cell production is a method,
the inventory diagram exists and is legible when enlarged, the 2-mark Define is a 2-mark Define,
the quiz no longer answers B every time, the recalls mark and give feedback, resume works, and
there are no console errors.

The blocker is that 20 of 26 subsections open by addressing the specification instead of the
student. It is a rewrite of 25 sentences, not a rebuild — but it is the first thing a student
reads on two steps out of three, so it should not publish as it stands.
