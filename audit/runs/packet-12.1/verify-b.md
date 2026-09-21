# Packet 12.1 — Verify B: student walkthrough

Agent: `.claude/agents/student-walkthrough.md`. Dev server `remediation-dev` on port 3001, restarted
before the walk (the process on 3001 had been up since 17 Sep, before every file this packet touched).
Viewport 390×844, `localStorage`/`sessionStorage`/IndexedDB cleared, signed out, real clicks and real
scrolling throughout.

The packet brief is code-and-guard work, so the script below is the student-visible surface the brief
promises to change: the practice mark ladder (E006), the 30 rewritten `Analyse 8` model answers and
their new levels-grid mark schemes (E004), the Business section numbers and the subject-keyed model
answer links (E005), and Learn Mode, whose `MARK_COLORS` twin the packet also rewired.

---

## Walkthrough

**step 1: cold open, home page** — Edexcel IAL landing page, Economics/Business toggle, unit list
1.3.1–1.3.6, section card for Introductory Concepts. Nothing blocks a first-time visitor; no signup
gate before notes. — **PASS** (a student can get in)

**step 2: Economics → Market Failure → Practice tab** — mark ladder renders `All Questions 5 · 2 Marks 0 ·
4 Marks 2 · 6 Marks 2 · 8 Marks 0 · 14 Marks 0 · 20 Marks 1`. The three empty tariffs are greyed and
`disabled`, not hidden, so the row reads as the Economics paper's ladder. Chip counts sum to 5 and
match "All Questions". — **PASS** (E006: Economics ladder 2/4/6/8/14/20, empties disabled)

**step 3: tap "Show Guidance" on a question** — guidance opens inline under the question; one paragraph of
model-answer structure, no dead end, no text box without a button. — **PASS**

**step 4: Market Failure model answers, open the 8-mark card** — header reads
`Examine: how a negative externality of production leads to market failure.` Mark scheme renders as
seven stacked rows: the verbatim Appendix 6 `Examine (8)` description, Levels 1–4 with their mark
ranges, then Indicative content. At 390px each label sits **above** its description (`.ma-mark-row`
goes `flex-direction: column` under 600px), description column 316px, no clipped text, no element
wider than 390px, `document.scrollWidth` exactly 390. Screenshot-verified: every line readable.
— **PASS** (E004; the "passes structure, illegible at 390px" failure mode does **not** occur here)

**step 5: same card, PEEL grid** — 2×2 at 390px (not the desktop 4×1), cells 150px wide, 12px type,
all four cells fully readable, no overflow. — **PASS**

**step 6: same card, scroll to the bottom** — "Likely Score 7–8 / 8", and above it an examiner commentary
that ends *"shows evaluative awareness without being asked to evaluate."* The card now contradicts
itself: its own Level 4 descriptor says a brief assessment *"is the clause that separates Examine from
Analyse"*, and the commentary tells the student the question did not ask for one. — **FAIL**
(see Defect 2)

**step 7: Business → Meeting Customer Needs → Practice tab** — ladder renders
`All 4 · 2 Marks 0 · 4 Marks 1 · 6 Marks 1 · 8 Marks 0 · 10 Marks 1 · 12 Marks 0 · 20 Marks 1` — the
Business ladder, with 10 and 12 present. The Model Answers card links to
`/business/meeting-customer-needs-model-answers`. Before this packet a Business student on this
section was offered the **Economics** Introductory Concepts page; that is closed. — **PASS**
(E005/E006)

**step 8: follow that card** — three answers, all Business, headed 4 marks / 8 marks / 8 marks. Card 2's
sub-header reads `Unit 1 · 1.3.1 **The Market** · Analysis & Evaluation` on a page titled Meeting
Customer Needs. — **FAIL** (see Defect 3: a header naming the wrong section)

**step 9: `/business/the-market-model-answers`** — no cards; an explanatory note instead of a blank list:
*"No model answers are published for this topic yet. The rest of Businessis covered — use the link
below to browse every topic."* The student is not dropped into an empty page, but the sentence has a
missing space (`Businessis`). — **PARTIAL** (page behaves; copy is broken — Defect 4)

**step 10: `/business/raising-finance-model-answers`** — two answers render (`Discuss 8`, `Explain 4`).
This page rendered zero answers before the packet. — **PASS** (E005)

**step 11: `/model-answers` hub → Business** — 20 Business answers listed, every `sectionNumber` in
1.3.1–2.3.5 form. The 1.3.1/"The Market" mislabel from step 8 appears here too. — **PASS** with the
step-8 exception

**step 12: Learn Mode on Market Failure, cold** — pre-test offer ("Test yourself first" / "Just teach
me"), then `STEP 1 OF 17`, `CHAPTER 1 OF 5`, footer `1 / 17`, progress 6%. Advanced with the real Next
button to step 9 (`CHAPTER 3 OF 5 · Public Goods`, 53%). — **PASS**

**step 13: leave to the home page, come back, reopen Learn** — banner reads *"You left off at step 9 of
17. Pick up where you left off?"* with Continue / Start over; the body under it is step 9's real
content, chapter eyebrow correct, footer `9 / 17`. — **PASS** (no "step N of M" with M < N, no blank
body; the known resume-pointer failure does **not** occur)

**step 14: Learn Mode to the end** — step 17 of 17, 100%, `Complete topic ✓`. The final step is headed
"Chapter check-in" and opens *"Before the next chapter: a quick question and one thing from
earlier."* — there is no next chapter; this is chapter 5 of 5 and the last step. The quiz and the
reorder recall both render and are different exercises (no recall shown twice). Also, the resume
banner from step 13 is still on screen at step 17, now reading "You left off at step 17 of 17", because
tapping Next instead of Continue never dismisses it. — **FAIL** on the copy (Defect 5), PASS on the
exercises

**step 15: mid-scroll on a Learn step with a flow chain** — the first screenshot caught the chain with
step 01 visible and a ~250px blank box below it; steps 02, 03 and the result faded in about a second
later. Reveal animation, not a missing chain — re-screenshotted complete. — **PASS** (noted only
because it looks broken for a beat)

**step 16: Economics → Aggregate Demand → Practice tab** — four questions on screen: `4 MARKS Define`,
`6 MARKS Explain`, **`10 MARKS Analyse`**, `20 MARKS Evaluate`. The chip row is
`All Questions 4 · 2 Marks 0 · 4 Marks 1 · 6 Marks 1 · 8 Marks 0 · 14 Marks 0 · 20 Marks 1`. The chip
counts sum to **3** against an "All Questions" count of **4**, and no chip selects the 10-mark
question. — **FAIL** (see Defect 1)

**step 17: Economics → Introductory Concepts** — the section overview card advertises "Practice ·
5 questions"; the Practice tab shows 3. — **FAIL** (pre-existing: see complaints still visible)

---

## Blocking defect

### Defect 1 — the 10-mark question a student can see but can no longer filter to (regression, E006)

On **Aggregate Demand** and **Consumer Behaviour & Demand** the live bank holds a 10-mark `Analyse`
question. It renders in the list, correctly coloured and expandable. But E006 replaced the hardcoded
`MARK_FILTERS` (`4 / 6 / 10 / 20`) with the Economics tariff ladder from `lib/ial-marking.js`
(`2 / 4 / 6 / 8 / 14 / 20`), and 10 is not on it. The chip is not disabled — it does not exist.

What the student ends up with:

- a question list whose chips no longer account for every question in it: `4 + 1 + 1 + 0 + 0 + 1 = 3`
  under a heading that says `All Questions 4`;
- no way to practise that question from the filter row — only "All Questions" reaches it;
- before this packet the `10 Marks` chip was there and worked.

Diagnosis, checked against the live API rather than the UI: 20 of 23 Economics sections carry a
10-mark question. 18 of them are commanded `Assess`, which `isPracticeVisible` already hides, so they
never reach the ladder. The two commanded `Analyse` do, and they are the two that break.

Two honest ways out, neither of which this walkthrough can choose: render the off-ladder tariff as its
own chip so the row still accounts for every visible question, or stop showing a question the ladder
cannot describe. What must not stand is a filter row that silently omits a question it is sitting on
top of.

## Other defects

### Defect 2 — an `Examine 8` card that argues with itself

`negative-externality-tax-8`, on the Market Failure model answers page, is one of the 30 rewritten
items. Its new levels grid ends Level 4 with *"a brief assessment of the arguments, factors or evidence
— the clause that separates Examine from Analyse"*. Its examiner commentary, untouched by the rewrite,
ends *"shows evaluative awareness without being asked to evaluate"*. Likely Score still reads `7–8 / 8`.

This is broader than the one card. Across the 30 rewritten items, **25 examiner commentaries never
mention evaluation or assessment at all**, and every one of the 30 keeps its old `likelyScore`. A
student reading any of them is shown a band descriptor that demands a brief assessment and a worked
answer whose commentary explains why it earned top marks without one. `built.md` discloses the same
gap on the answer bodies (11 items) and defers it to 12.2/12.4; the commentary side is not disclosed
and is the part the student actually reads as the explanation.

### Defect 3 — a card headed with the wrong section

`market-research-8` now carries `sectionNumber: '1.3.1'` (correct per E005's wording match) but still
carries `sectionTitle: 'The Market'`. On `/business/meeting-customer-needs-model-answers` and on the
`/model-answers` hub, the student reads `Unit 1 · 1.3.1 The Market` on a Meeting Customer Needs page.
It is the one item of twenty whose title and number disagree — the same item E005 singles out as the
reason the rule says wording and not arithmetic.

### Defect 4 — missing space in the new empty-state copy

`/business/the-market-model-answers`: *"The rest of Businessis covered"*. Cosmetic, one word, on a page
this packet created.

### Defect 5 — the last step of Learn Mode promises a next chapter

Step 17 of 17, chapter 5 of 5: *"Before the next chapter: a quick question and one thing from
earlier."* There is no next chapter. Pre-existing, not this packet's, but it is a header naming
something that is not there and the audit asked for those. The resume banner also stays on screen for
a student who taps Next rather than Continue.

---

## Console errors

On clean cold loads of the home page, an Economics section, a Business section and a model answers page
in a fresh tab: **no console errors, and no resource returning 4xx or 5xx.**

During the long session in the first tab:

- `POST /api/events` — roughly twenty beacons, each recorded `204 No Content [FAILED: net::ERR_ABORTED]`,
  fired while stepping through Learn Mode. Nothing on screen breaks; the events are aborted in flight.
- one `404` and one `401` for resources, both on the very first page loads before storage was cleared;
  neither reproduced on any clean load afterwards and the request buffer had rolled past them, so the
  URLs could not be identified.
- `WebSocket connection to 'ws://localhost:3001/_next/webpack-hmr' failed` ×3 and `[HMR] connected` /
  `[Fast Refresh]` chatter — dev-server only, not a student's console.

---

## Audit complaints still visible

- **A tariff that appears on no IAL paper, still shown to the student.** Market Failure's Practice tab
  offers `Analyse how external costs of consumption lead to a misallocation of resources. (6 marks)` —
  `Analyse 6` is not an Economics tariff. E002's guard counts 123 of these; the packet reports them and
  does not change them, which is what the brief says it will do. Recording it because the student still
  sees it.
- **A promised count the tab does not deliver.** Introductory Concepts advertises "Practice · 5
  questions" on the section card and shows 3. The gap is `isPracticeVisible` hiding the `Assess 10` and
  one other; the card counts the raw rows. Pre-existing, affects most Economics sections.
- **A header naming the wrong section** — Defect 3 above.
- **A step whose heading describes something that is not there** — Defect 5 above.

Not observed: a gate the student cannot get past; a step that runs to many screens before the first
Next; an exercise with no defensible answer; a text box with no button; a recall shown twice in a row;
a diagram whose labels cannot be read; a table illegible at 390px; a resume pointer reading past its
own total.
