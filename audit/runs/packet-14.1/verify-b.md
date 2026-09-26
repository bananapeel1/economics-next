# Packet 14.1 — Verify B (student walkthrough)

26 Sep 2026. http://localhost:3001/business/unit-3/decision-making-techniques?draft=1, viewport 390x844
(custom size; the "mobile" preset is 375x812), signed out, localStorage + sessionStorage cleared, reloaded.
Real taps throughout (ref clicks, or coordinate taps in the screenshot frame); scrolling by the page.
Build on :3001 is the remediation worktree at 66ba20d.

Harness notes (not product findings)
- First tab (tab-1) was navigated to `/` by another session mid-walk after I fronted it. Restarted in a
  background tab (tab-2): storage cleared again, Start learning → Just teach me, steps 1-3 re-passed with
  Next, walk resumed at step 4. Steps 1-3 attempts below are from tab-1; everything from step 4 is tab-2.
- Shared localStorage held a peer's keys (`revvy_*_introductory-concepts`) — cleared before the tab-2 run.
- In tab-1 the pane was hidden and `document.visibilityState` was `hidden`: the enlarge sheet mounted
  without `lm-diagram-modal-visible` at `matrix(0.92…)` (the known hidden-tab rAF artefact). That
  measurement was discarded. Every measurement below was taken with the visible class present, transform
  `matrix(1, 0, 0, 1, 0, 0)`, and `getComputedStyle(svg).width` equal to the rect width.
- Overview before hydration showed the LIVE section ("6 steps / 3 topics / 5 questions"); after hydration
  "20 steps / 5 topics / 8 questions". The page also carries an `sr-only` block of the live March section
  (£500m pharma tree, "Critical Path Analysis (CPA)") — SSR ignores `?draft=1`; screen-reader only.

## Teach steps (15)

Every teach step: one H2 (the sub-section title), eyebrow `CHAPTER n OF 5 · <chapter> · part k of m`
(`.lm-eyebrow`), teaching, then exactly one QUICK RECALL, which is the last block of the step body
(`recallsCount` 1, recall offset after all teaching text). Answer-visibility = the recall's answers searched
for in the step text above the recall (fill-in: each answer as a number/token; classify/match: every item
text), then read by eye.

| Step | Eyebrow | H2 | Recall | Answer copyable from above? |
|---|---|---|---|---|
| 1 | Ch 1 of 5 · Sales Forecasting · part 1 of 3 | Moving averages | fill-in (55, 60, 2) | No. Teaching uses Kopi Kita figures; only "2.6" matches a digit |
| 2 | Ch 1 · part 2 of 3 | Scatter graphs, the line of best fit and extrapolation | classify (6 pairs → +/−/none) | No. Rule taught, none of the six pairs appears |
| 3 | Ch 1 · part 3 of 3 | Limitations of quantitative forecasting | match (4 + 1 distractor) | No. Limitations taught, none of the situations appears |
| 5 | Ch 2 of 5 · Investment Appraisal · part 1 of 4 | Simple payback | fill-in (6, 0.3, 2.3) | No ("6" only in "Appendix 6") |
| 6 | Ch 2 · part 2 of 4 | Average rate of return | fill-in (24, 6, 12) | **Partly.** The last blank's answer is 12 (%), and the real example above it says "a machine returning 12% a year on average". That is a different case, but a student filling the ARR blank can match 12 to it |
| 7 | Ch 2 · part 3 of 4 | Net present value | fill-in (9.09, 12.39, 1.48) | No |
| 8 | Ch 2 · part 4 of 4 | Interpreting and comparing the techniques | classify (6 → payback/ARR/NPV) | No |
| 10 | Ch 3 of 5 · Decision Trees · part 1 of 3 | Constructing a decision tree | classify (Kigali route, 6 labels) | No |
| 11 | Ch 3 · part 2 of 3 | Rolling back: expected value and net gain | fill-in (128, 60, 78) | No |
| 12 | Ch 3 · part 3 of 3 | Limitations of decision trees | match (4) | No |
| 14 | Ch 4 of 5 · Critical Path Analysis · part 1 of 3 | Nature and purpose of critical path analysis | fill-in (C, 12, 3) | No (matches were "CHAPTER" and "part 1 of 3") |
| 15 | Ch 4 · part 2 of 3 | Completing the network: EST, LFT and float | fill-in (7, 2, A–C–D) | No. "2" appears as the float of C/E in the teaching's different network, not derivable for B |
| 16 | Ch 4 · part 3 of 3 | Limitations of critical path analysis | classify (6 → warns / cannot show) | No |
| 18 | Ch 5 of 5 · Contribution · part 1 of 2 | Contribution per unit and total contribution | fill-in (9, 27, 7) | No |
| 19 | Ch 5 · part 2 of 2 | Contribution as a decision-making tool | classify (6 → accept/reject) | No |

Step bodies also carry an H4 box title on worked examples (e.g. step 1 "A three-period moving average");
only one H2 per step.

Real attempts (tab-1):
- Fill-in, step 1: blank 1 ← 165 (wrong), blank 2 ← 60, blank 3 ← 3 (wrong) → Check answers →
  "1 of 3 right", each wrong word shown struck with the right one beside it (165→55, 3→2), "Try again".
- Classify, step 2: rain/umbrella put in Negative (wrong), rest correct → Check groups →
  "✗ 5 of 6 in the right group", wrong item marked "→ Positive correlation", "Try again", "Show the answer".
  Show the answer lists the three groups with a one-line why each.
- Match, step 3: "Assumes the pattern continues" ← seasonal distractor (wrong), rest correct →
  "✗ 3 of 4 matched", "Try again", "Show the answer". Try again kept the 3 right pairs, cleared the wrong
  slot back to "tap to match" and returned both unused options to the pool.

## Check-ins (5)

Order on arrival at every check-in: eyebrow `CHAPTER n OF 5 · <chapter>`, "Chapter check-in", intro line
("Before the next chapter: a quick question and the diagram…"), the QUICK QUIZ, then "Answer the question
first. The diagram and the rest of this check-in will appear below." and "Skip the question". Only the quiz
card is rendered (`.lm-content` children: `lm-quiz-card`, `lm-checkin-held`). **Question-first is present
on this build and verified**; at step 4 "Skip the question" revealed the diagram, practice, explain-back and
takeaway. After answering, the order is: quiz feedback + confidence → diagram → (calculation item at Ch 2
and Ch 4) → practice card → spaced recall (Ch 2-5) → Explain it back → Chapter takeaway.

Enlarged sheet: opened by a real tap on the inline diagram; class `lm-diagram-modal-backdrop
lm-diagram-modal-visible`, modal transform identity, modal CSS width 390px. Default zoom stop "Read".
Measurement per text: font px = computed font-size × CTM scale (CSS px), plus rect height; overlaps =
pairwise text-rect intersections > 1px both ways; "on a line" = ≥ 2 sampled points (every 1.5 units) of any
stroked line/path/polyline/polygon/rect/circle inside the middle band of a text rect.
Checker A/B (step 4, moving-average view): injecting a horizontal line through "Trend, extended into the
future", a vertical line across it, and a duplicate label 3 units lower was reported (4 on-line hits, 1
overlap); after removing them, 0 and 0.

| Check-in | Quiz (pinned) | Diagram, enlarged at 390x844, Read stop | Checklist opened | Quiz answer in diagram text? |
|---|---|---|---|---|
| Ch 1, step 4 | scatter dots rising → key "a positive correlation" | Moving-average view: 26 texts, smallest 12.01px ("February = (40 + 46 + 43) ÷ 3 = 43.0", rect 15.5px), 0 overlaps, 0 on a line. Scatter view: 17 texts, smallest 12.01px ("Forecast: about $330k…"), 0 / 0. svg 667px CSS = 667px rect | 5 points, read | **leaks** (scatter view SVG label "Positive correlation") — only after answering or skipping, because the question renders first: DEBT under the question-first rule, not blocking |
| Ch 2, step 9 | time value of money → "Net present value" | Payback: 22 texts, smallest 12.01px ("the cost is recovered"), 0 / 0 | 4 points, read | clean (payback only; no NPV, discounting or time value) |
| Ch 3, step 13 | tea exporter → "$84,000" | Decision tree: 20 texts, smallest 12.01px (roll-back caption), 0 / 0. Screenshots taken at Read and at Fit (Fit = 366px wide, smallest 6.59px, still 0 / 0). Probability labels sit above/below their branches, not across them | 5 points, read | clean ($84,000 appears nowhere; tree shows $340,000/$140,000/$200,000/$180,000) |
| Ch 4, step 17 | EST 8, dur 4, LFT 15 → "3 days" | Fit-out network: 29 texts, smallest 12.01px ("Activity (duration in days)…"), 0 / 0. Screenshots at Read and Fit; node numbers sit inside their split circles clear of the dividers | 5 points, read | clean (shows "float 2" and the formula; no 3) |
| Ch 5, step 20 | hotel special order → "accept, because $55 more than covers the variable cost" | Contribution bars: 14 texts, smallest 12.00px ("Contribution pays the fixed costs first…"), 0 / 0; svg 600px | 4 points, read | clean (cold brew per cup / per month only) |

Quiz feedback seen: Ch 1 wrong (D) → "Not quite. Higher spend goes with higher sales, which is a positive
correlation…"; Ch 3 wrong ($159,000) → full EMV working and why each distractor is wrong; Ch 2, 4, 5 correct
→ "Correct!" with the working.

## Practice cards (5 seen; mode by position: worked → guided ×3 → independent)

| Check-in | Mode | Text above the answer box before writing | Mark my answer → checklist |
|---|---|---|---|
| Ch 1 (4 marks, Kopi Kita moving averages) | Worked example ("Read the model, then have a go") | Question, "4 marks", scaffold paragraph, then **the full model answer with every figure and "(1 mark)" allocation** (43.0, 45.7, 48.3, 50.7, trend). This is the worked-example mode by design; `InlinePractice.jsx` renders all guidance paragraphs in `worked` mode identically on origin/main. The same question is also worked in the step 1 teaching | 4 boxes, 4 marks: box 1 = scaffold paragraph + "February … = 43.0" (branch splitter, main differs); 2 March; 3 April and May; 4 trend. "0 of 4 marks claimed" |
| Ch 2 (4 marks, Lagos van NPV) | Guided | Question, "4 marks", scaffold only ("Set the working out as a table…"), "See full guidance ▼" collapsed. No figure, mark or answer beyond the question's own data | 4 boxes/4 marks: box 1 = scaffold + "Present value of year 1 … $18,180" (branch splitter, main differs); 2 years 2-3; 3 total $53,850; 4 NPV +$3,850. Note: same van/figures as the step 7 teaching worked example (answer $3,850 on an earlier step) |
| Ch 3 (6 marks, Sunrise Bakery two limitations) | Guided | Question, "6 marks", scaffold only, rest collapsed. Clean | 7 boxes: 6 × 1 mark + box 7 "Other valid limitations…" with no mark (closing caveat as a box; box 1 carries the scaffold) — branch splitter, main differs. "0 of 6 marks claimed" |
| Ch 4 (4 marks, Kopi Kita network: float of C + critical path) | Guided | Card text itself clean (question data + scaffold). **But the diagram rendered directly above the card on the same check-in states the answer**: SVG labels "C (2) float 2" and "Critical path A–B–D–F = 2 + 3 + 4 + 1 = 10 days", and the diagram description "The red route, A–B–D–F, is the critical path: 10 days… C and E each have two days of float." The practice asks exactly "Calculate the total float of activity C and identify the critical path" on the same network | 4 boxes/4 marks: box 1 scaffold + formula (branch splitter); 2 "Activity C: 6 − 2 − 2 = 2 days"; 3 A, B, D, F; 4 10 days |
| Ch 5 (12 marks, Palm Bay Hotel Assess) | Independent ("You're on your own") | Question and "12 marks" only; answer box first; mark scheme collapsed (`.lm-practice-answer` height 0) until revealed. The quiz feedback above (after answering) states "$55 − $30 = $25 a room-night", the knowledge step of this 12-marker | 1 box (whole guidance, no "(n marks)") + "0 of 1 points covered · questions above 6 marks are levels-marked…". Revealed scheme has Knowledge/Analysis/Evaluation paragraphs and "This tariff is levels-marked" but no numeric level bands (for Verify A against recheck-02) |

Calculation items (Ch 2 ARR 4 marks, Ch 4 payback 5 marks) show each step's formula and "· n mark(s)"
above its input — a separate component, not the practice card; recorded, not judged.

Spaced recall: Ch 2, 3 and 4 check-ins all re-showed the same Ch 1 "Moving averages" fill-in (I left it
unanswered each time in tab-2); Ch 5 showed Ch 2 "Simple payback".

## Completion

"Complete topic ✓" → "Topic complete · Decision-Making Techniques · 100% strength · review tomorrow";
Score breakdown Quiz 3/4, Written practice 5/10; "What you covered": Sales Forecasting, Investment Appraisal,
Decision Trees, Critical Path Analysis, Contribution — all five chapters.

## Console

Errors: 2, both `Failed to load resource … 401 (Unauthorized)` = `POST /api/learn-mode/state` (signed out,
expected). `POST /api/events` beacons show `ERR_ABORTED` with 204 in the network log (not console errors).
No other console errors or warnings.

## Acceptance (check 4 + brief)

| Point | Result |
|---|---|
| Overview → Learn → 20 steps → completion, signed out, storage cleared | PASS |
| Teach step: one H2 + eyebrow "Chapter n of 5 · <chapter> · part k of m" (15/15) | PASS |
| Exactly one recall, below the teaching (15/15) | PASS |
| Recall answer not visible above it | PASS on 14/15; **step 6 FLAG**: ARR answer "12" matches "12% a year" in the real example above (different case; judge whether it is copyable) |
| Real fill-in / classify / match attempt: wrong → Check → feedback, Try again, Show the answer | PASS |
| Check-in: question first, only the question before answering; Skip reveals the rest | PASS (verified on :3001) |
| Diagrams enlarged readable (smallest ≥ 11px) at 390x844, Read stop | PASS — every diagram and view 12.00-12.01px |
| No label overlapping another or sitting on a line (checker A/B-proven) | PASS — 0/0 on all 6 views |
| Screenshots of enlarged decision tree and network | PASS (Read and Fit) |
| Diagram checklist opened on each check-in | PASS (5/5) |
| Leaks/clean per check-in | Ch1 leaks ("Positive correlation", shown only after the question: DEBT); Ch2-5 clean |
| Practice text above the answer box: no figure, mark, answer | Guided and independent card text: PASS. **Ch 4 FAIL**: the diagram above the card on the same step states the card's answer (C float 2; A–B–D–F, 10 days). Ch 1 worked example shows the full model by design (same on main) — flag, not judged as content |
| "Mark my answer" shows a checklist for items ≤ 6 marks | PASS (4/4/6/4 marks); first box carries the scaffold on every one and Ch 3 has a zero-mark 7th box: branch splitter, main differs |
| Completion names all five chapters | PASS |
| Console: only expected signed-out 401s | PASS |

Could not verify: main's `lib/practice-checklist.js` split (branch lacks it); the published (non-draft)
SSR / sr-only content; anything signed in.
