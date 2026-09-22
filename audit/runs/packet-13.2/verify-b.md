# Packet 13.2 — Verify B: signed-out student walkthrough

22 September 2026. Viewport **390×844**, dark theme unless stated, signed out throughout, dev server
`remediation-dev` on :3001, own browser tab (`tab-1`). No file was changed.

Every pixel figure below is measured at 390px.

---

## Step 1 — `/economics/unit-2/national-income`, Learn tab, decline the pre-test, walk to the end

Landing: `SECTION 2.3.4`, `Unit 2: Macroeconomic Performance & Policy`, "Learn Mode · ✓Free · 14 steps".

The section carried a finished run from an earlier session ("You left off at step 14 of 14"), and
`revvy_section_state_1_national-income` held `{"pretestState":"skipped"}`, so the pre-test was not
offered. I removed that key and `revvy_learnmode_1_national-income_section` for this one section and
reloaded, which is the state a first-time student arrives in. **Nothing else in storage was touched.**

Pre-test then offered:

> **Want a quick check first?** Three questions on what you might already know. Optional, and nothing
> is marked.  `[Test yourself first] [Just teach me]`

Declined with **Just teach me**. It dismissed cleanly and left step 1 of 14 on screen.

Walked 1 → 14. Four chapters, four check-ins. Each is reported as **sentence → what was actually on
the page**.

### Check-in 1 — step 3 of 14, Chapter 1 of 4, The Circular Flow of Income

> Before the next chapter: **the diagram and a quick question.**

Carried, in order:
- 📊 **Diagram** — "Circular Flow of Income", two toggles (Two-Sector Model / Full Open Economy),
  "Tap to enlarge", and a "What a correct diagram shows" list of six points.
- 💡 **Quick quiz** — "…which of the following is classified as a withdrawal?" (B, household spending
  on imported goods, is present and correct).
- 📖 **Worked example** — "Define the term 'circular flow of income'." 4 marks, model answer printed,
  then "Your answer" + "Mark my answer".
- ▸ Explain it back, Chapter takeaway.

**Both things the sentence names are there.** No calculation is promised and none appears. The worked
example is not named — see Observation O1.

### Check-in 2 — step 7 of 14, Chapter 2 of 4, Injections and Withdrawals

> Before the next chapter: **the diagram, a quick question and one thing from earlier.**

Carried: 📊 Diagram "Injections and Withdrawals Equilibrium"; 💡 Quick quiz ("MPS 0.1, MRT 0.2,
MPM 0.2 → multiplier?" — 0.5 leakages → 2.0, option D, correct); 🧭 Guided practice (6 marks, opening
given); 🧠 **Recall from Chapter 1** — reorder the two-sector flow; Explain it back; takeaway.

**All three named things are there,** and "one thing from earlier" is genuinely from chapter 1. No
calculation promised, none shown. Guided practice not named (O1).

### Check-in 3 — step 10 of 14, Chapter 3 of 4, Equilibrium National Income

> Before the next chapter: **a quick question and one thing from earlier.**

Carried: 💡 Quick quiz ("G +£5bn, multiplier 2.5 → ?" — £12.5bn, option A, correct); a notice reading
"The practice question for this chapter is being rewritten to match the IAL exam format."; 🧠 Recall
from Chapter 2 (reorder injections); Explain it back; takeaway.

**Matches.** Critically for D025: **no calculation is promised here and none is shown.**

### Check-in 4 — step 14 of 14, Chapter 4 of 4, The Multiplier and National Income

> Before the next chapter: **a quick question, a calculation and one thing from earlier.**

Carried: 💡 Quick quiz (injections/withdrawals combination, B correct); **the calculation**; ✍️ Quick
check (20-mark essay + "Reveal mark scheme"); 🧠 Recall from Chapter 3 (fill in the blanks); Explain
it back; takeaway.

**The calculation is named and the calculation is there.** The drill landed on check-in 4, one
chapter after "The Multiplier Formula" (step 12) — i.e. after the student has been taught 1/MPW.

One defect in the sentence itself: this is **chapter 4 of 4** and the button beneath it says
"Complete topic ✓". "Before the *next chapter*" promises a chapter that does not exist. Same wording
recurs on the last check-in of every section I walked (see D1).

**Step 1: PASS** (with D1 against the sentence).

---

## Step 2 — answer the first step wrong, carry it correctly, mark

The card, before marking:

```
WEC12 · 2.3.4    National income    4 marks

In a small open economy the marginal propensity to save is 0.2, the marginal rate of
tax is 0.1 and the marginal propensity to import is 0.1. The government raises
spending by $600m.

Sum of the leakages                      MPS + MRT + MPM · 1 mark          [      ]
The multiplier, to two decimal places    1 ÷ the sum of the leakages · 2 marks  [      ]
Change in real GDP                       the multiplier × the change in
                                         government spending · 1 mark      [ $      m ]

Answer the steps, then mark your working. A wrong figure carried correctly into the
next step still earns its mark — the same own figure rule an examiner applies.

[Mark my working] [Worked solution] [New figures]
```

Tariffs 1 + 2 + 1 = 4, which is what the "4 marks" chip claims. Correct answers are 0.4, 2.50, 1500.
All three inputs reachable and typable at 390px; method lines visible under every label; nothing
clipped.

**What I typed:** step 1 `0.5` (wrong — it should be 0.4), then carried 0.5 through honestly:
step 2 `2.00` (= 1 ÷ 0.5), step 3 `1200` (= 2.00 × 600).

**Score: 3 / 4.** Per-step feedback, verbatim:

| step | box | feedback |
|---|---|---|
| Sum of the leakages | red border, `0.5` | `Not correct. MPS + MRT + MPM.` |
| The multiplier | green border, `2.00` | **`OWN FIGURE RULE`** (amber pill) `Method is right and your own earlier figure is carried forward correctly, so the mark stands.` |
| Change in real GDP | green border, `1200` | **`OWN FIGURE RULE`** `Method is right and your own earlier figure is carried forward correctly, so the mark stands.` |

Closing line under the card:

> Own figure rule applied: a step built correctly on an earlier wrong answer still scored. Nothing
> here needed a model — it is arithmetic against a tolerance.

**Is the student told a wrong first answer still earned its later marks? Yes, three times over** —
before marking (the instruction above the buttons), on each dependent step (the badge plus the
sentence), and in the summary line. Unambiguous.

**Step 2: PASS.** D022 and D024 confirmed on Economics.

---

## Step 3 — "New figures"

Pressed with the card in its marked, worked-solution-open state.

**Changed:**
- The stem numbers: MPS `0.2 → 0.05`, MRT `0.1 → 0.05`, MPM `0.1 → 0.1`, G `$600m → $300m`.
- The item id on every input: `quant:multiplier:national-income:multiplier:**0**-leakages` →
  `…:**1**-leakages` (same for `-k`, `-change`). The attempt bumped 0 → 1.
- All three boxes cleared, all red/green borders cleared, all per-step feedback cleared.
- The `3/4` score chip disappeared.
- The worked solution collapsed; the button went back from "Hide worked solution" to "Worked solution".

**Did not change:**
- The `WEC12 · 2.3.4` chip, the `National income` chip, the `4 marks` chip.
- All three step labels, all three method lines, all three mark tariffs.
- The own-figure-rule instruction sentence.
- The three buttons and their order.

That is the behaviour the Quiz tab advertises ("the method stays and the numbers change"), and the new
draw is a different arithmetic shape (leakages 0.2 instead of 0.4), not a cosmetic reskin.

**Step 3: PASS.**

---

## Step 4 — "Worked solution", checked line by line

**Against attempt 0** (MPS 0.2, MRT 0.1, MPM 0.1, G +$600m):

| line shown | my check |
|---|---|
| `Leakages = 0.2 + 0.1 + 0.1 = 0.4` | 0.4 ✓ — all three inputs are the ones in the stem |
| `Multiplier = 1 ÷ 0.4 = 2.5` | 2.5 ✓ |
| `ΔGDP = 2.5 × $600m = $1,500m` | 1500 ✓ — $600m is the stem's figure |

**Against attempt 1** (MPS 0.05, MRT 0.05, MPM 0.1, G +$300m):

| line shown | my check |
|---|---|
| `Leakages = 0.05 + 0.05 + 0.1 = 0.2` | ✓ |
| `Multiplier = 1 ÷ 0.2 = 5` | ✓ |
| `ΔGDP = 5 × $300m = $1,500m` | ✓ |

Every line uses the numbers actually in the question and every line is arithmetically right, on both
draws. Renders in monospace, no overflow at 390px.

One mismatch, small but real: the step is headed **"The multiplier, to two decimal places"** and the
worked solution answers it **`2.5`** and **`5`**. A student copying the model writes 2.5 and has not
done what the question asked (D3).

**Step 4: PASS** (with D3).

---

## Step 5 — `/business/unit-1/meeting-customer-needs`, Learn tab, same walk

`SECTION 1.3.1`, `Unit 1: Marketing and People`, 21 steps, 6 chapters. Section state cleared the same
way; the pre-test was offered and I declined it with "Just teach me".

Six check-ins:

| step | chapter | sentence | what was there |
|---|---|---|---|
| 4 | 1 · The Market: Mass vs Niche | "a quick question." | quick quiz only (+ explain it back, takeaway) — matches |
| 7 | 2 · Competition, Risk and Uncertainty | "a quick question." | quick quiz only — matches |
| 11 | 3 · Market Research Methods | "a quick question." | quick quiz **+ guided practice (6 marks)** — quiz matches; guided practice not named (O1) |
| 14 | 4 · Sampling Methods | "a quick question." | quick quiz only — matches |
| **17** | **5 · Market Positioning and Orientation** | **"a quick question and a calculation."** | quick quiz (Dyson → product orientation, D, correct) **+ the calculation** + quick check (10 marks) — matches |
| 21 | 6 · Segmentation and Competitive Advantage | "a quick question." | quick quiz only — matches, except "before the next chapter" at 6 of 6 (D1) |

**Exactly one check-in promises a calculation and exactly one carries one.** The other five say only
"a quick question" and carry no calculation. D025 holds in both directions on this section.

### The calculation

```
WBS11 · 1.3.1    Meeting customer needs    6 marks

Zahrat Cafés, Dubai had sales revenue of $3,610,000 last year and $3,898,800 this
year. The market it sells into was worth $24,367,500 this year.

Percentage change in sales revenue
  (new figure − original figure) ÷ original figure × 100 · 2 marks     [        % ]
Sales revenue next year, if it changes by the same percentage again
  this year's figure × (1 + the percentage change ÷ 100) · 2 marks     [ $        ]
Market share this year
  the firm's sales revenue ÷ total market size × 100 · 2 marks         [        % ]
```

Tariffs 2 + 2 + 2 = 6 ✓. Arithmetic of the question checked independently: 288,800 / 3,610,000 = **8%
exactly**; 3,898,800 / 24,367,500 = **16% exactly**; 3,898,800 × 1.08 = **4,210,704**. The numbers are
chosen so that every answer is clean. The English is correct and the stem reads as an IAL stem would;
the minus sign is a true `−` and the apostrophes are curly.

**Wrong-first-answer test.** Step 1 `7` (should be 8). Step 3 does not depend on step 1, so I answered
it correctly (`16`); step 2 does, so I carried 7 honestly: 3,898,800 × 1.07 = `4171716`.

**Score: 4 / 6.**

| step | feedback |
|---|---|
| Percentage change | `Not correct. (new figure − original figure) ÷ original figure × 100.` |
| Next year | **`OWN FIGURE RULE`** `Method is right and your own earlier figure is carried forward correctly, so the mark stands.` |
| Market share | `Correct.` |

> Own figure rule applied: a step built correctly on an earlier wrong answer still scored.

Step 3, which does not depend on the wrong figure, was marked on its own merits rather than being
swept up in the own-figure branch. That is the right behaviour and it is the case a lazier
implementation gets wrong.

**Worked solution**, checked against the stem:

| line | check |
|---|---|
| `Change in revenue = $3,898,800 − $3,610,000 = $288,800` | ✓ |
| `Percentage change = $288,800 ÷ $3,610,000 × 100 = 8%` | ✓ |
| `Next year = $3,898,800 × 1.08 = $4,210,704` | ✓ |
| `Market share = $3,898,800 ÷ $24,367,500 × 100 = 16%` | ✓ |

**Step 5: PASS.** D023 and D024 confirmed on Business.

---

## Step 6 — the Quiz tab on both sections

The Quiz tab is **not visible in the tab strip at 390px**. The strip shows Learn · Notes · Diagrams ·
Practice · Flashcards and a `›` chevron; Quiz is two scroll-steps to the right, and it renders with a
padlock beside its name — yet it opens and works fully for a signed-out student (O3). Pre-existing,
not this packet.

### `national-income`

Order on screen, top to bottom:

1. `CALCULATION PRACTICE · WEC12 · NATIONAL INCOME` (section heading)
2. the calculation card, identical to the Learn Mode one, at attempt 0
3. the line: **"Marked on its own, step by step — it is not part of the quiz score below. Every time
   you ask for new figures the method stays and the numbers change."**
4. `QUESTION 1`, `QUESTION 2`, `Submit Answers`

So the calculation sits **above** the MCQs and the student is told plainly that it is not in the quiz
score and what "New figures" does.

Filled the calculation **correctly** (0.4 / 2.50 / 1500) → **4/4**, with:

> Full marks. A new seed gives a fresh set of figures from the same template, so the method is the
> only thing worth memorising.

Then answered Q1 right and Q2 wrong and submitted:

> **1/2** — "1 of 2 in the preview. The full quiz for this section has 24 questions." `[Try Again]`

The 4 drill marks are nowhere in that total.

### `meeting-customer-needs`

Same layout, same sentence, heading `CALCULATION PRACTICE · WBS11 · MEETING CUSTOMER NEEDS`.

I ran it the opposite way round to close the other direction: filled the calculation **completely
wrong** (99 / 1 / 2) → **0/6**, verdict "Marked against the method, not just the final number. Each
wrong answer is checked against the usual slips before it scores zero." Then answered **both** MCQs
correctly and submitted:

> **2/2** — "2 of 2 in the preview. The full quiz for this section has 25 questions."

**The drill neither adds to nor subtracts from the quiz score, in either direction.**

**Step 6: PASS.** D026 confirmed on both sections.

---

## Step 7 — `/economics/unit-4/poverty-inequality`: no calculation anywhere

`SECTION 4.3.4`, 6 steps, 2 chapters. Walked all six.

- Check-in step 3 (Ch1 Types of Poverty): "Before the next chapter: **the diagram and a quick
  question.**" → diagram (Absolute vs Relative Poverty), quick quiz, worked example. **No calculation
  promised.**
- Check-in step 6 (Ch2 Causes and Consequences): "Before the next chapter: **a quick question.**" →
  quick quiz plus the "practice question … being rewritten" notice. **No calculation promised.**

Measured across the whole document, on the Learn tab and again on the Quiz tab:

```
CalculationItem nodes: 0     inputs with id starting "quant:": 0
the word "calculation" anywhere in the page text: false
"calculation practice" heading: false
```

The Quiz tab opens straight onto `QUESTION 1` with no card above it.

**Step 7: PASS.** The pool maps this section to nothing, and nothing on its check-ins hints otherwise.

---

## Step 8 — console and network, every page

**No JavaScript errors on any page.** No React warning, no hydration error, no error from any
`quant`/`CalculationItem` path.

What is there, on all three sections and pre-existing:

| what | detail |
|---|---|
| `POST /api/learn-mode/state → 401 Unauthorized` | the only 4xx/5xx of the run. It is a red console error on every Learn Mode page for a signed-out student; progress still persists in `localStorage`, so nothing visibly breaks |
| `POST /api/events → 204 No Content [FAILED: net::ERR_ABORTED]` | ~100 of them per page. Status 204 means the server took them; the ABORTED is the beacon being torn down. Noise, not failure |
| `[diagrams] pin "National Income Equilibrium" matched no diagram` and `pin "The Multiplier" matched no diagram` | warnings, `national-income` only — a notes pin naming a diagram the section does not have |

`performance.getEntriesByType('resource')` at the end of each section: `[["/api/learn-mode/state",401]]`
on the two Learn Mode sections, `[]` on `poverty-inequality`. **Nothing the drills request fails.**

**Step 8: PASS.**

---

## Defects

**D1 — "Before the next chapter" on the last chapter's check-in.** On `national-income` the sentence
runs "Before the next chapter: a quick question, a calculation and one thing from earlier" at
**chapter 4 of 4**, under a button reading "Complete topic ✓". Same on `meeting-customer-needs` at
chapter 6 of 6 and on `poverty-inequality` at chapter 2 of 2. The clause this packet added ("a
calculation") is correct; the frame it is added to is not, and on `national-income` the calculation
sits on exactly the check-in where the frame is wrong. Pre-existing wording, newly load-bearing.

**D2 — the wrong-step feedback repeats the method and never gives the answer.** "Not correct. MPS +
MRT + MPM." restates, word for word, the method line already printed above the input. A student who
got 0.5 is told nothing they did not already have on screen. The worked solution has the answer, but
the student has to know to ask for it. (Low severity: a drill that hands over the answer on the first
wrong try has less value. Recording it as judged, not as a blocker.)

**D3 — the worked solution does not answer the question it is modelling.** The step says "The
multiplier, **to two decimal places**"; the worked solution prints `Multiplier = 1 ÷ 0.4 = 2.5` and,
on the redraw, `1 ÷ 0.2 = 5`. Systematic across both draws. A student copying the model writes 2.5
where the question asked for 2.50.

---

## Observations (measured, not rejections)

**O1 — the check-in sentence never names the written practice.** Of the 12 check-ins I walked, five
carried a Worked example / Guided practice / Quick check with a "Mark my answer" box, and the sentence
named it on none of them. It is consistent across every check-in in all three sections, so it is not
something this packet introduced; but "a quick question, a calculation and one thing from earlier"
under-describes a page that also holds a 20-mark essay. The clause this packet owns is accurate: the
calculation is named where present and absent where not, on all 12.

**O2 — dark-mode contrast of the method line is 2.83:1 at 11px, and the guard cannot see it.**
Measured at 390px on `meeting-customer-needs`, `CalculationItem-module__method` is `--text-dim` on
`--bg-card`. That is the lowest-contrast text on the page (the lowest pre-existing is 3.42:1 on the
sidebar section numbers), and it is the only line that tells the student the method.

Before calling it a regression I compared it with what the product already does: `--text-dim` appears
**25 times in `app/globals.css`** at 9–13px, and the token itself scores 3.29:1 on the dark card
surface wherever it is used. So the component follows the house pattern and this is a property of the
token, not a choice this packet made. **Not a rejection.**

Worth recording anyway, because `npm run contrast` reads **only `app/globals.css`**
(`audit/scripts/contrast-check.mjs`, `const CSS = …'app','globals.css'`). `CalculationItem.module.css`
is a CSS Module, so the guard is structurally blind to it: a genuine regression in this file would
never fail CI.

Full measurement of the card, both themes, 390px (composited alpha, WCAG 1.4.3):

| element | size | light | dark |
|---|---|---|---|
| spec chip `WEC12 · 2.3.4` | 11px | 5.73 | 3.47 |
| section chip | 11px | 5.23 | — |
| marks chip | 11px | 5.92 | 3.60 |
| stem | 15.5px | 17.74 | — |
| step label | 14.5px | 17.74 | — |
| **method line** | **11px** | **5.54** | **2.83** |
| `%` / `$` affix | 12px | 4.90 | — |
| own-figure instruction | 13.5px | 7.56 | — |
| "Not correct…" | 13px | — | 10.51 |
| "Own figure rule applied…" | 13.5px | — | 6.39 |
| score `2/6` | 18px | — | 4.14 |
| Mark my working | 13.5px | 6.62 | 4.14 |
| Worked solution / New figures | 13.5px | 10.31 | — |

**In light mode every element in the card clears 4.5:1** (lowest 4.90). The light-mode regression class
from the September audit has not recurred here.

**O3 — the Quiz tab is off-screen and padlocked at 390px, yet works.** Two scroll-steps right of the
visible strip, rendered with a 🔒 beside the label, and it opens and marks normally for a signed-out
student. Pre-existing; it means the surface this packet mounted a drill on is the hardest one for a
phone student to find.

**O4 — smaller things in the card.**
- The field wrapper is **321 × 37 CSS px**. Comparable product controls on the same page: "Mark my
  working" 41px, "Mark my answer" 35px, "Check answers" 32px. In line with the product; not a defect.
- Every input is properly labelled — `label[for]` → input `id` on all three steps, checked in the DOM.
  A screen-reader student hears "Sum of the leakages".
- The student's own figure echoes back unformatted (`4171716`) while the stem uses `$3,898,800`.
- "Full marks. **A new seed** gives a fresh set of figures…" — "seed" is developer vocabulary in
  copy written for a sixteen-year-old. The button beside it already says "New figures".
- Chapter progress dots are buttons at **13 × 3 CSS px**. Pre-existing Learn Mode chrome, not this
  packet, but unusable on a phone.

---

## Instrument note

The **Next.js dev-tools portal covers the Learn Mode "← Back" button entirely** at 390px. The button
is at CSS (14, 790) 44 × 44; `document.elementsFromPoint` returns `NEXTJS-PORTAL` first at its centre
and at every corner I tried, and four real taps on it did nothing. Dev-build only — the portal does
not ship — so it is not a product defect, but it means **"Back" cannot be tested by tapping on this
server**. I navigated backwards with `ArrowLeft`, which worked, to re-read check-ins 1 and 3 on
`national-income`.

## Verdict

Seven of seven scripted steps PASS. D022, D023, D024, D025, D026 and the negative half of D020
confirmed by walking them. Three defects, all in copy rather than in the marking: one pre-existing
sentence frame that the new clause now sits inside (D1), thin feedback on a wrong step (D2), and a
worked solution that does not honour its own "to two decimal places" instruction (D3).
