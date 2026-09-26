# Verify B — packet 43, student walkthrough (`economics__economic-growth`)

The walk was done as a first-time student, signed out, with localStorage, sessionStorage and cookies cleared before
the first load. The viewport was **390x844** and the dev server was `remediation-dev` on port 3001. That server
was already running and was reused, not restarted. Every action was a real tap or real typing through the Browser
pane. Nothing was edited. Every pixel figure is at 390px width.

Route: `http://localhost:3001/economics/unit-2/economic-growth?draft=1`.

## Which corpus the student saw

The packet is staged to `draft` only. `/api/sections/economic-growth` (the student path) still serves the old
section: 6 blocks, including "The Business (Trade) Cycle" and "Economic Growth and AD/AS Analysis", 23 Learn
steps, 5 practice items and 3 diagrams. On that page the console warns that 4 diagram pins (`ad-as-growth`,
`trade-cycle-diagram`, `ad-as-shifts`, `ad-as-growth-analysis`) matched no diagram. **Until the founder publishes,
a student gets nothing from this packet.** Everything below is the `?draft=1` walk.

The draft page's first paint shows live counts ("23 steps", "6 topics", "5 questions"). After the draft refetch it
shows "26 steps · 5 topics · 10 questions · 27 cards · 34 questions". This flash only happens in draft preview,
because the server-rendered shell reads `data`. It is not a student issue after publish.

The Next.js dev "N" badge sits on top of the footer's `← Back` button at 390px. `elementFromPoint` on the Back
button hits `NEXTJS-PORTAL`. That badge exists only in dev, so I hid it for the walk to tap Back. It is not a
product defect.

---

## The walk

- step 1: Landing shows `SECTION 2.3.5` · "Unit 2: Macroeconomic Performance & Policy" · "Economic Growth" · Learn
  Mode "✓ Free · 26 steps" · `Start learning →`. — **PASS**: section number, unit and title are all this section's.
- step 2: `Start learning →` offers "Want a quick check first? Three questions…" with `Test yourself first` /
  `Just teach me`. — **PASS**: nothing gates the student.
- step 3: Pre-test. Three questions on PPF/AD with one taught answer each. I answered B, C (wrong on purpose) and
  B, then tapped `Check my answers`. It showed "2 / 3 correct … Answers are held back until the end" and
  `Start learning →`. — **PASS**.
- step 4: STEP 1 OF 26 · CHAPTER 1 OF 5 · "Actual and Potential Growth" · part 1 of 3. The screen shows a key idea,
  a body that uses "a movement from inside the PPF towards the frontier" and says "a movement along the frontier is
  neither", a real example, a misconception and exam matters. — **PASS**: accuracy-01/topFix-04 are true on screen.
- step 5: QUICK RECALL — SORT (Actual only / Potential / Neither — a reallocation). I tapped all 5 items into
  groups, then `Check groups`. It showed "✓ All correct!" — **PASS**: the recall has a button and marks the answer.
- step 6: STEP 2 · "Actual Growth and Aggregate Demand". Its QUICK RECALL — MATCH pairs 4 events with C/I/G/(X−M).
  I tapped all 4, then `Check matches`. It showed "✓ All correct!" — **PASS**: a match recall is new to this section.
- step 7: STEP 3 · "International Trade and Export-Led Growth". Export-led growth is taught in the body (specGap-01).
  In the FILL IN THE BLANKS recall I made blank 3 wrong on purpose. It showed "2 of 3 right · Try again", with the
  wrong word struck and the right one shown. — **PASS** on the widget. **Note**: blank 1 still reads "…Loriana's
  output as an ___". "an" fits only "injection" and not "withdrawal", so grammar gives the answer away. verify-a
  residual 1 flagged this and it is still on screen.
- step 8: STEP 4 · Chapter check-in, shown under a DIAGRAM heading. "Actual and Potential Growth" has 3 view chips:
  On the PPF / AD, spare capacity / AD, near capacity. I tapped each one. The labels (PPF₁, PPF₂, A, B, C, AD₁,
  AD₂, LRAS, Y₁, Y₂, P) are legible, and the smallest rendered text is 12px at 390. It is followed by QUICK QUIZ
  (3% vs 2.5%). I tapped C and got "Correct!" with an explanation and a confidence prompt. — **PASS**: a diagram
  renders in Learn Mode, so topFix-01 is true on screen.
- step 9: The same check-in has 📖 WORKED EXAMPLE "Define the term 'potential economic growth'. 2 marks"
  (practice-01). Worked mode shows the model on purpose ("Read the model, then have a go"). I typed an answer and
  tapped `Mark my answer`. The "Tick what your answer includes" checklist has **3 boxes for a 2-mark item**:
  (1) the whole scaffold paragraph fused onto the first mark point, "A definition has two parts… An increase in an
  economy's productive capacity 1 mark"; (2) the second mark point; (3) the caveat "'An increase in real GDP'…
  earns nothing here…", which has no mark and can be ticked. Ticking box 3 alone leaves "0 of 2 marks claimed".
  — **FAIL (non-blocking)**: the self-mark list reads wrong to a student. The cause is `checklistFrom` splitting on
  "(n mark)" (verify-a residual 2, platform-wide). This packet's guidance shape (scaffold, then 2 points, then a
  caveat) is what exposes it on the very first practice item a student meets.
- step 10: STEP 5–9 · Chapter 2 "The Causes of Potential Growth", parts 1–5. The subsections are Domestic
  Investment and FDI, Innovation, A Growing Labour Force and Net Migration, **The Degree of Competition**, and
  Productivity and the Rate of Growth. — **PASS**: both missing spec items (FDI and degree of competition) are
  taught in main content.
- step 11: STEP 10 · check-in. The diagram "Potential Growth: Long-Run AS Shifts Right" has legible labels (smallest
  12.2px at 390). A real tap on it opened the enlarge modal. I read it only once the visible class was on and the
  transform was the identity matrix (at first it read `matrix(0.92…)`, the entry animation, so I discarded that
  reading). In the modal the SVG is 400px CSS wide in a 390px pane (scrollWidth 424). This is by design: the "Read"
  zoom says "Drag sideways to see the rest — or tap Fit". The smallest label in the modal is 14.5px. Then come a
  QUICK QUIZ on FDI, 🧭 GUIDED PRACTICE "Analyse how foreign direct investment may increase an economy's potential
  growth. 6 marks" (the ladder is hidden behind "See full guidance ▼"), and "RECALL FROM CHAPTER 1", which is the
  step-1 sort, spaced. — **PASS**.
- step 12: STEP 11–13 · Chapter 3 "The Benefits of Growth". Step 12 "Profits and Investment" teaches the impact on
  firms (specGap-03). — **PASS**.
- step 13: STEP 14 · check-in. It has **no diagram** (chapter 3 is `diagramId: null` by decision), a GDP-per-head
  quiz, guided Examine 8 and a recall from chapter 2. — **PASS**: no empty diagram slot appears.
- step 14: STEP 15–19 · Chapter 4 "The Costs of Growth". The screens are Opportunity Costs, Environmental Costs,
  **Balance of Trade Deficits** (the only REORDER recall), Increased Inequality, and Inflation. — **PASS**: 3a is
  taught bullet by bullet.
- step 15: STEP 20 · check-in, about 6 screens long. The diagram "The Opportunity Cost of Growth" has Today and Ten
  years on views, and both are legible. Next is a quiz, then a calculation drill ("Real GDP in Jordan was $57.6
  billion…"). I typed 6.25 and 65.03, tapped the percentage-points choice, then `Mark my working`. It showed "6/6 ·
  Correct · Correct · Full marks". The inputs are 283px and 226px wide at 390, with 15px text. Then come guided
  Evaluate 20 and a recall from chapter 3. — **PASS**. **Note**: part 3's printed hint, "a fall in a rate is
  measured in percentage points", names the unit that only the correct option uses. The drill prints its own
  answer. This comes from the quant template, not from this packet's content.
- step 16: STEP 21–25 · Chapter 5 "Output Gaps". The screens are Actual Growth and the Long-Term Trend (the trend
  rate is taught, specGap-02), Positive and Negative Output Gaps, Characteristics of a Positive Output Gap,
  Characteristics of a Negative Output Gap, and Why Output Gaps Are Hard to Measure. — **PASS**.
- step 17: STEP 26 · final check-in. The diagram "Output Gaps: Actual Output and the Trend" has The gap / Three
  estimates views, with legible axis and labels (smallest 12px at 390). Then come a trend-rate quiz and ✍️ QUICK
  CHECK Discuss 14. Its Level 1–4 ladder is in the DOM but inside a `max-height:0; overflow:hidden` wrapper until
  "Reveal mark scheme ▼", so the student cannot see it. Last is a recall from chapter 4 (a match that is different
  from step 25's). The footer reads `Complete topic ✓`, which I did not tap. — **PASS**.
- step 18: Reload mid-section. I tapped Back to STEP 20, then reloaded and tapped `Start learning →`. The screen
  showed **"You left off at step 20 of 26. Pick up where you left off?"** with `Continue` / `Start over`, and the
  body rendered in full underneath (CHAPTER 4 OF 5 · Chapter check-in · diagram). `Continue` landed on STEP 20 OF
  26. — **PASS**: the "step 20 of 9 / blank body" failure does not reproduce.
- step 19: Cross-version resume, which is the shape of the publish. I walked the live page to STEP 22 OF 23, so the
  pointer was `{"v":"23.13qdyma","s":21}`. Then I opened the draft and tapped `Start learning →`. It landed on
  **STEP 1 OF 26** with a full body and no stale "step 22 of 26" and no blank. — **PASS**: the stale pointer is
  discarded by its version.
- step 20: Right after that auto-restart, one tap on `Next →` showed **"You left off at step 2 of 26. Pick up where
  you left off?"** at the top of the step the student is already on. It keeps showing at every step until
  dismissed, and "Start over" sends them back to step 1. — **FAIL (non-blocking, pre-existing platform)**. The count
  is right and the body renders. The cause is `LearnModeTab.jsx:659`, which renders the banner on
  `isResuming && safeStep > 0`. A session that begins at a stored step 0 never shows or dismisses the banner, so it
  appears the moment the student moves forward. The same thing happens on the live page ("You left off at step 3 of
  23"), so packet 43 did not introduce it. But publishing this packet changes the step version (23 → 26). Every
  mid-section student will be auto-restarted, and every one of them will then meet this banner.
- step 21: Tabs. **Notes**: 5 chapter topics. **Diagrams**: 4 diagrams, smallest label 12px at 390. **Practice**: 10
  items, Define 2 · Explain 4 · Analyse 6 · Calculate 4 · Examine 8 · Calculate 2 · Evaluate 20 · Explain 4 ·
  Discuss 14 · Draw 4, with no Assess and no Outline. **Flashcards**: preview 2. **Extras**: preview 2 of 8.
  **Quiz**: the calculation drill. **Mistakes**: Pro gate. — **PASS**.

### The two failures this programme has shipped before

- **Table illegible at 390 because nothing measured cell width.** On every step and tab I measured every `<table>`
  in `.tab-content` (cell widths, min font, overflowing cells) and found **none**. No grid layout with two or more
  columns exists in the Notes either. The draft payload has no `table`/`rows`/`columns`/`headers` key and no
  `<table` string. **Not applicable: there is no table in this section to be illegible.** Document scrollWidth
  stayed 390 on every step and tab.
- **Resume pointer "step 20 of 9" with a blank body.** It does not reproduce on a same-version reload (step 18) or
  on a cross-version reload (step 19). A related banner fault is recorded at step 20.

## Console errors

- `Failed to load resource: 401 (Unauthorized)`. This is `POST /api/learn-mode/state` while signed out. It is
  platform behaviour and not caused by this section.
- `[diagrams] pin "ad-as-growth" / "trade-cycle-diagram" / "ad-as-shifts" / "ad-as-growth-analysis" matched no
  diagram` (×2). These come only from the **live** (non-draft) page, the pre-packet `data`. The draft logged none.
- `[funnel] unknown event rebuilt_auto_restart` (×2, warn). `LearnModeTab.jsx:395` fires an event that
  `lib/funnel.js` does not list, so the cross-version restart is not counted.
- `[Fast Refresh] rebuilding` once mid-walk. Another session edited a file. It had no visible effect.
- No uncaught exceptions and no React errors on the draft.

## Audit complaints still visible

- A gate the student cannot get past: none.
- A step that runs many screens before the first Next: none. Next is sticky in the footer on every step. Steps are
  3.2–3.8 screens, and the check-ins are 3.6–6 screens (step 20 is the longest).
- An exercise with no defensible answer: none found. Two answers are given away: a grammar giveaway in step 3's
  fill-in ("as an ___"), and the drill hint naming "percentage points" at step 20.
- A text box with no button: none. Every answer box has `Mark my answer`.
- A recall shown twice in a row: none. The recalls in check-ins come from earlier chapters and differ from the
  recall on the step before.
- A diagram whose labels cannot be read: none at 390. The smallest label is 12px inline and 14.5px in the modal.
- A header naming the wrong section: none. SECTION 2.3.5 and "Economic Growth" appear throughout, and every
  chapter header matches its content.
- Minor, for the gate owner: student text cites "Appendix 6" in 6 `examMatters` boxes, and diagram captions start
  "IAL 2.3.5 · 1a, 1b:". This follows the programme's existing convention, but a first-time student will not know
  what either refers to.

## Verdict

**PASS. No blocking defect.** On a phone, the student gets a coherent 26-step, 5-chapter section on 2.3.5. It has
diagrams in 4 of the 5 check-ins, and all are legible at 390. Recalls, quizzes, practice and the calculation drill
all mark. It has no tables, and resuming works on both same-version and cross-version reloads. There are two
non-blocking FAILs. Step 9 is the self-mark checklist that fuses the scaffold with mark point 1 and offers a 0-mark
caveat as a tickbox. Step 20 is a pre-existing "You left off at step N" banner that follows a student who just
restarted, which publishing this packet will trigger for every mid-section student.
