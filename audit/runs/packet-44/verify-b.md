# Verify B — packet 44, student walkthrough (`economics__aggregate-supply`)

The walk was done as a first-time student on 26 September 2026. I was signed out, and localStorage, sessionStorage and
cookies were cleared before the first load. The viewport was **390x844** (DPR 2) and the server was `remediation-dev` on
port 3001. That server belongs to another chat and was reused, not restarted. `preview_start` refused to start a
second one. Taps and typing were real pointer and keyboard input through the Browser pane, with one exception:
the Diagrams-tab sweep of all 16 scenario views used scripted chip clicks, and it was for measurement only. Nothing
was edited. Every pixel figure is CSS px at 390px width.

Route: `http://localhost:3001/economics/unit-2/aggregate-supply?draft=1`.

## Which corpus the student saw

The packet is staged to `draft` only. `/api/sections/aggregate-supply` is the path a real student uses, and it still
serves the old section: 5 blocks ("Short-Run Aggregate Supply (SRAS)" … "Short-Run vs Long-Run Adjustment"), 13
subsections, 18 Learn steps, 5 practice items and 3 diagrams. On that page the console warns that pins "AD/AS Shifts"
and "Self-Correcting Mechanism" matched no diagram (×4). The off-screen SEO block of the draft page also still
carries the old text ("UK manufacturers in early 2022…", "The UK economy in 2019…"), because it is built from
`data`. **Until the founder publishes, a student gets nothing from this packet.** Everything below is the
`?draft=1` walk.

On first paint the draft hub shows the live counts ("18 steps", "Practice 5 questions"). After the draft refetch it
shows "23 steps · 5 topics · 9 questions · 34 cards · 32 questions". This flash happens only in draft preview.

---

## The walk

- step 1: Landing shows `SECTION 2.3.3` · "Unit 2: Macroeconomic Performance & Policy" · "Aggregate Supply" · Learn
  Mode "✓ Free · 23 steps" · `Start learning →`. — **PASS**: section number, unit and title are all this section's.
- step 2: `Start learning →` shows "Want a quick check first? … Optional, and nothing is marked." with `Test yourself
  first` / `Just teach me`, and step 1 renders underneath. — **PASS**: nothing gates the student.
- step 3: STEP 1 OF 23 · CHAPTER 1 OF 5 "The Characteristics of AS" · part 1 of 3 "What Aggregate Supply Is". The
  screen shows a key idea, a body that introduces the fictional economy Tellmar ($800bn at a price level of 100), a
  real example, a misconception about "price"/"quantity" axis labels, exam matters, and QUICK RECALL — MATCH (4 terms,
  5 options). I tapped all 4 pairs, then `Check matches`. It showed "✓ All correct!" — **PASS**.
- step 4: STEP 2 "Why the SRAS Curve Slopes Upward". The body has a 4-node flow and uses the furniture workshop as
  its example, with no date and no UK. In QUICK RECALL — REORDER (garment maker) I used the ▲ arrows, then `Check
  order`. It showed "✓ Perfect order!" — **PASS**: accuracy-01 is true on screen.
- step 5: STEP 3 "A Movement Along or a Shift". The SORT recall has 6 events, including "On a vertical LRAS, the price
  level rises and output is unchanged". I placed all 6 with taps. It showed "✓ All correct!" — **PASS**: specGap-05
  is taught.
- step 6: STEP 4 · Chapter check-in. DIAGRAM "Movement Along and Shift of AS" has 3 views. Then come QUICK QUIZ
  (constant prices), where I tapped A and then "Somewhat sure" and got "Correct!" with an explanation, and 📖 WORKED
  EXAMPLE "Define the term 'aggregate supply'. 2 marks", which has an answer box and `Mark my answer`. Last is a
  3-line chapter takeaway. — **PASS**: practice-01 is a 2-mark Define on screen.
- step 7: Enlarge sheet on step 6's diagram, opened by a real tap on the drawing. The first read showed
  `matrix(0.92…)`, with rect 368 against a computed width of 400px, so I discarded it. After settling the transform
  was `matrix(1,0,0,1,0,0)` and rect 400 = computed 400px. The smallest label was **12.0px**, with 0 overlaps. The
  pane is 390 wide with scrollWidth 424, and the hint reads "Drag sideways to see the rest — or tap Fit". — **PASS**.
- step 8: STEPS 5–8 · Chapter 2 "What Shifts Short-Run AS": Costs of Raw Materials and Energy, Exchange Rates, Tax
  Rates, Three Causes One Mechanism. I skipped the recalls at steps 5–7 with `Skip`. Each skip showed "Skipped. This
  check comes back at the next chapter check-in." At step 8, in FILL IN THE BLANKS, I tapped 5 and less. It showed
  "✓ All correct!". Each template line has one blank. — **PASS**: topFix-01 and structure-07 are true on screen.
- step 9: STEP 9 · check-in. DIAGRAM "What Shifts SRAS" has 4 views. Then come a QUICK QUIZ (20% × 10%), where I
  tapped 2% and "Certain" and got "Correct!", and 🧭 GUIDED PRACTICE "Calculate … 40% … 15% (2 marks)" showing only
  the opening, with the rest behind "See full guidance ▼". Last is RECALL FROM CHAPTER 1, which is step 3's match,
  reshuffled. — **PASS** on content and placement.
- step 10: Same check-in: I typed "Unit costs rise by 0.4 x 15% = 6%." and tapped `Mark my answer`. "Tick what your
  answer includes" shows **3 boxes for a 2-mark item**. (1) is the whole opening paragraph ("Appendix 6 defines
  Calculate… Before multiplying anything…") fused onto the first clause "…= 0.4 × 15% 1 mark". (2) is "= a 6% rise
  1 mark". (3) is "The common error is to answer 15%…", which has no mark and can be ticked. — **FAIL
  (non-blocking, platform)**: the self-mark list reads wrong to a student. This is the same `checklistFrom` split
  on "(n mark)" that packet 43's Verify B recorded at its step 9. The content follows the practice.opening rule. The
  renderer is what fuses the opening onto mark point 1.
- step 11: STEPS 10–13 · Chapter 3 "The Shapes of Long-Run AS": What the LRAS Curve Shows, The Classical LRAS, The
  Keynesian LRAS: Three Ranges, Why the Two Shapes Disagree. At step 12's MATCH I made the vertical range wrong on
  purpose. It showed "✗ 2 of 3 matched · Try again · Show the answer". `Show the answer` listed the three pairs, each
  with a reason. — **PASS**: the widget marks wrong answers and explains them.
- step 12: STEP 14 · check-in. DIAGRAM "Classical and Keynesian LRAS" has 3 views. On a real tap, "Classical
  adjustment" draws AD, AD₁, SRAS, SRAS₁ and LRAS on one diagram. The short run is $770bn at 94 and the long run is
  back to $800bn at 88, and the labels are legible. — **PASS**: topFix-03 and the self-correcting mechanism are on
  screen.
- step 13: Same check-in, QUICK QUIZ "40 million workers, each producing $20,000 … productive capacity is". I tapped
  $800bn and got "Correct!" — **FAIL (non-blocking)**: the answer is printed about one screen above the question.
  The diagram's own caption reads "Capacity $800bn: 40 million × $20,000." and the checklist item reads "A vertical
  classical LRAS at capacity, $800bn". The same happens at step 23 (see step 20 below).
- step 14: Same check-in, 🧭 GUIDED PRACTICE "Draw a diagram … classical LRAS … fall in AD … (4 marks)". The student
  gets a text box and `Mark my answer`, and there is nothing to draw on. — **Note**: this is a platform shape for
  Draw items, not something this packet introduced. The spaced recall is step 5's skipped bakery reorder, which comes
  from chapter 2. That is one check-in later than the skip message promised, because the step-9 check-in only draws
  from chapter 1.
- step 15: STEPS 15–17 · Chapter 4: The State of Technology, Productivity, Education and Skills. At step 16's
  FILL IN THE BLANKS (5m × $40k) I tapped 200 and **240** (wrong on purpose). It showed "1 of 2 right · Try again",
  with 240 struck and 220 shown. — **PASS**: specGap-01 is taught with a mechanism, and the widget marks.
- step 16: STEP 18 · check-in. DIAGRAM "LRAS Shifts: Output per Worker" has 3 views. QUICK QUIZ asks for the
  definition of productivity. 🧭 GUIDED PRACTICE is "Examine … education and training … (8 marks)". `See full
  guidance ▼` reveals the Level 1–3 ladder only after a tap. The recall is step 6's skipped sort (chapter 2). —
  **PASS**.
- step 17: STEPS 19–22 · Chapter 5: Government Regulations and Tax, Demography, Net Migration, Competition Policy.
  All four are taught as mechanisms, including tax as a long-run incentive (specGap-03), working-age × participation
  (specGap-02) and cartel → cost pressure → output per worker (specGap-04). — **PASS**.
- step 18: I reloaded mid-section at STEP 20 and tapped `Start learning →`. The screen showed **"You left off at
  step 20 of 23. Pick up where you left off?"** with `Continue` / `Start over`, and the body rendered in full
  underneath (CHAPTER 5 OF 5 · part 2 of 4 · "Demography"). `Continue` landed on STEP 20 OF 23. The stored pointer
  was `{"v":"23.dbgeec","s":19}`. — **PASS**: the "step 20 of 9 / blank body" failure does not reproduce.
- step 19: STEP 23 · final check-in. DIAGRAM "LRAS Shifts: The Labour Force" has 3 views. Then come QUICK QUIZ
  (50m × 80%), ✍️ QUICK CHECK "Evaluate … ageing population … inevitably … (20 marks)" and the recall (the bakery
  reorder again). The Evaluate's Level 1–4 ladder is in the DOM, but inside `.lm-practice-answer` (`max-height:0;
  overflow:hidden`, height 0) until "Reveal mark scheme ▼", so the student cannot see it. The footer reads
  `Complete topic ✓`. — **PASS**.
- step 20: Step 23's QUICK QUIZ "50 million … 80% participate. Its labour force is". I tapped 40 million and got
  "Correct!" — **FAIL (non-blocking)**: the answer is printed directly above the question. The checklist item under
  the diagram reads "Labour force = working-age population × participation: 50 million × 80% = 40 million", and step
  20's body used the same numbers ("In Tellmar: 50 million × 80% = 40 million").
- step 21: `Complete topic ✓` shows "Topic complete · Aggregate Supply · 100% strength · review tomorrow" and the 5
  chapter titles. SCORE BREAKDOWN reads "Quiz 1/1 · Recall 0/2 · 2 skipped · Written practice 0/2". The student had
  in fact answered 5 quizzes correctly and 5 recalls (4 correct first time), skipped 11, and written 1 answer.
  Stored state: `revvy_answers` holds all 5 quiz answers, `recallSkipped` lists 11, but `scores` = quiz 1/1, recall
  0/2. — **FAIL (non-blocking, platform)**: after a mid-section reload, the breakdown counts only the session since
  the reload. Nothing in it is specific to this section.
- step 22: Cross-version resume, which has the shape of the publish. I cleared storage, walked the live page to STEP
  7 OF 18 (pointer `{"v":"18.i2h8r1","s":6}`), then opened the draft and tapped `Start learning →`. It landed on
  **STEP 1 OF 23** with a full body. There was no out-of-range step and no blank. In the other direction, the draft
  pointer `s:22` opened on the 18-step live page was discarded to `s:0`. — **PASS**: the stale pointer is discarded
  by its version.
- step 23: Right after that auto-restart, one tap on `Next →` showed **"You left off at step 2 of 23. Pick up where
  you left off?"** above the step the student was already on. — **FAIL (non-blocking, pre-existing platform)**. This
  is the same `LearnModeTab.jsx` banner fault recorded by packet 43. Publishing changes this section's step version
  (18 → 23), so every mid-section student will be auto-restarted and will then meet this banner.
- step 24: Pre-test, with storage cleared. `Test yourself first` shows 3 questions (vertical axis, why SRAS slopes,
  price-level change). I answered C, C and B (the last wrong on purpose) and tapped `Check my answers`. It showed "2 /
  3 correct … Answers are held back until the end" and `Start learning →`. — **PASS**.
- step 25: Tabs. **Notes**: 5 chapters, tagged "2.3.3 · 1a, 1b, 1c" / "2a" / "3a" / "3b" / "3b" (real IAL numbers).
  The body text is ≥12px, and the only sub-12px text is platform chrome labels (9.5–11px). **Diagrams**: 5 diagrams
  and 16 views: Movement Along and Shift of AS · What Shifts SRAS · Classical and Keynesian LRAS · LRAS Shifts:
  Output per Worker · LRAS Shifts: The Labour Force. **Practice**: 9 items: Define 2 · Explain 4 · Calculate 2 ·
  Calculate 4 · Analyse 6 · Draw 4 · Discuss 14 · Examine 8 · Evaluate 20. There is no Assess, no Outline, no 6-mark
  Explain and nothing worth 10 marks. **Flashcards**: preview 2 of 2 ("Define aggregate supply."). **Quiz**: 2 free
  questions. **Mistakes**: Pro gate. **Extras**: "Preview — 2 of 6", chain "From an oil price rise to a shift in
  SRAS". Document scrollWidth was 390 on every tab. — **PASS**.

### The two failures this programme has shipped before

- **Table illegible at 390 because nothing measured cell width.** On all 23 steps and all 8 tabs I counted `<table>`
  elements and every element whose rect crossed 0 or 390. I found **0 tables**. The only elements beyond 390 were the
  tab bar's intended horizontal scroller and the unit badge. No diagram is a table (`.lm-diagram-table` count 0). The
  Notes tab has no multi-column grid. The draft payload's block types are paragraph 62, definition 14, mechanism 13,
  flow 5, reorder 5, classify 5, link 5, match 4, fillin 4 and bullets 2, and it has no `table`, `rows` or `|---`.
  **Not applicable: this section has no table to be illegible.**
- **Resume pointer "step 20 of 9" with a blank body.** It does not reproduce. I tried a same-version reload at step
  20 (step 18 above), the live → draft direction (step 22), and draft → live, where the pointer went from s:22 to an
  18-step deck and was discarded. The only related fault is the banner at step 23.

### Diagram label size, measured as font size and not as box height

Inline, every one of the 16 views renders its smallest label at **9.18px** (Diagrams tab, SVG 306px wide, viewBox 400,
k 0.765) or **9.39px** (Learn check-ins, 313px wide). I computed this as computed `font-size` × (rendered width ÷
viewBox width). I found 0 text-box overlaps and 0 labels off the canvas in all 16. The text's `getBoundingClientRect`
height is 12.0px, so a probe that reads box height will report "12px inline". Packet 43's Verify B reports "smallest
12px at 390" inline, which may be that reading. In the enlarge sheet the labels are **12.0px** (step 7, and the
"Keynesian: three ranges" sheet in the Diagrams tab, both at the identity transform). This matches the 21 September
V037 ruling ("the inline diagram stays at 298px with 7-9px labels"; the sheet is the phone answer). It is not a new
defect. The inline figure should not be quoted as 12px.

## Console errors

- `Failed to load resource: 401 (Unauthorized)`: `POST /api/learn-mode/state` while signed out. This is platform
  behaviour.
- `[diagrams] pin "AD/AS Shifts" / "Self-Correcting Mechanism" matched no diagram` (×4, warn). These come only from the
  **live** page (pre-packet `data`), and the draft logged none. They are the diagram-01/diagram-02 defect, still live
  until publish.
- `[funnel] unknown event rebuilt_auto_restart` (×2, warn), fired by the cross-version restart at step 22. This
  matches packet 43.
- The draft walk had no uncaught exceptions and no React errors.

## Audit complaints still visible

- A gate the student cannot get past: none. `Next →` is never blocked by an unanswered recall, quiz or practice.
- A step that runs many screens before the first Next: none. `Next →` is sticky in the footer on every step. Teaching
  steps are 2,236–2,783px (2.6–3.3 screens at 844) and check-ins are 2,709–3,645px (3.2–4.3 screens).
- An exercise with no defensible answer: none found. Two quiz answers are printed directly above their question
  (steps 13 and 20).
- A text box with no button: none. Every answer box has `Mark my answer`. The step-14 Draw item offers only a text
  box, and that is platform behaviour.
- A recall shown twice in a row: none. Check-in recalls come from earlier chapters and differ from the recall on the
  step before. The bakery reorder appears at both step 14 and step 23 because the student never answered it.
- A diagram whose labels cannot be read: none in the sheet (12.0px). Inline labels are 9.2–9.4px, which is the ruled
  V037 state.
- A header naming the wrong section: none. Every screen shows SECTION 2.3.3 and "Aggregate Supply", and every chapter
  header matches its content. The equilibrium and output-gap blocks are gone.
- Minor: diagram captions start "IAL 2.3.3 · 1b and 1c:" and 15 of the 18 exam-matters boxes cite "Appendix 6" (counted from the
  served draft payload). This is the
  programme's convention, but a first-time student will not know what either means.

## Verdict

**PASS. No blocking defect.** On a phone the student gets a coherent 23-step, 5-chapter section on 2.3.3 only. It has
one diagram per chapter check-in (5 diagrams, 16 views, no overlaps), on-topic quiz and practice at every check-in,
and 9 practice items on legal command-word tariffs. Every recall, quiz and practice item marks. It has no tables, and
resume works on same-version and cross-version reloads. There are four non-blocking FAILs:

1. The quiz at step 14 (40m × $20,000) and the quiz at step 23 (50m × 80%) have their answers printed in the diagram
   caption and checklist directly above. This one belongs to this packet.
2. The self-mark checklist fuses the opening with mark point 1 and offers a 0-mark tickbox (platform, as packet 43).
3. The "You left off at step 2" banner follows an auto-restart (platform, as packet 43). Publishing will trigger it
   for every mid-section student.
4. After a mid-section reload, the completion score breakdown counts only the post-reload session (platform).
