# Packet 46, Verify B: student walkthrough (`economics__growth-development`)

26 Sep 2026. Dev server `remediation-dev` on :3001, running from this worktree (pid cwd checked, `next-server` started 11:09).
URL: `/economics/unit-4/growth-development?draft=1`, so this is the STAGED draft; live `data` was not walked.
Viewport 390x844 (innerWidth 390, dpr 2). localStorage, sessionStorage, IndexedDB and cookies were cleared before step 1.
Signed out: no credentials were used.
Every tap was a real pointer tap by ref or coordinate, not `element.click()`. Probes were read-only JS: text, rects and computed styles.
Every pixel figure below is at 390px width.

Verdict: **PASS. No blocking defect.** 41 steps, all rendered with a body. The resume pointer clamps. No tables anywhere. No horizontal overflow on any screen.

## Walk

step 0 (overview): "Learn Mode · Free · 41 steps", Notes "7 topics", Practice "10 questions", header "Growth & Development", SECTION 4.3.6. This is the draft shape, not live's 3 blocks. — PASS

step 0a (Start learning): banner "Want a quick check first?" with two buttons, "Test yourself first" and "Just teach me". — PASS

step 0b (pre-test): 3 MCQs, all on Chapter 1 content: HDI component; growth vs development; HDI uses a geometric mean. I answered D, B, A and saw "2 / 3 correct". Answers are held back, and a "Start learning" button followed. — PASS (every question is taught in steps 1-2)

step 1: Chapter 1 of 7 "Measuring Development", part 1 of 4 "Growth and Development". Contains Key idea, body, real example, misconception, Exam matters and a SORT recall. I sorted 6 items with real taps and saw "✓ All correct!". 459 words; body 2767px tall (3.3 screens). Next sits in the sticky footer (top 790 of 844). — PASS

step 2: part 2 "The HDI: Three Components and How They Are Measured". Goalposts worked through: (72−20)÷(85−20)=0.800. Geometric mean worked through: ∛(0.800×0.600×0.591)=0.657. MATCH recall: I did it and deliberately got 1 wrong, then saw "✗ 3 of 4 matched" with "Try again" and "Show the answer". The wrong slot already shows the correct option under the struck-out one. — PASS

step 3: part 3 "Advantages and Limitations of the HDI", SORT recall, 465 words. — PASS

step 4: part 4 "Other Measures of Development" (the six spec indicators), MATCH recall, 461 words. — PASS

step 5: Chapter 1 check-in. It contains:
- diagram "The HDI: Three Dimensions" with 2 views and 11 labels. The smallest label is 9.4px inline: 313px render of a 400 viewBox, scale 0.782.
- enlarge, opened with a real tap: `lm-diagram-modal-visible` present, transform `matrix(1,0,0,1,0,0)`, computed width 390px = rect 390px. Labels are 12px there.
- quick quiz "health index at 50 years": I tapped 0.462 and saw "Correct!" with the working.
- worked example "Define HDI (2 marks)", with model then textbox then "Mark my answer".
- takeaway: 3 bullets.

— PASS

step 6: Chapter 2 "Constraints: Commodities, Savings and Currency", part 1 of 5 "Volatility of Commodity Prices", REORDER recall. — PASS

step 7: part 2 "Primary Product Dependency: Prebisch-Singer", REORDER recall, 504 words. — PASS

step 8: part 3 "The Savings Gap: Harrod-Domar". Flow 01-04, then g = 12÷4 = 3%. FILL-IN recall: I filled 5% / 21% / fall and saw "✓ All correct!". Distractors: 45%, 18%, rise. — PASS, one content note: "12 percentage points or about $7.2bn a year". Karanda's GDP ($60bn) is not stated anywhere in the draft payload, so the student cannot see where $7.2bn comes from.

step 9: part 4 "The Foreign Currency Gap", MATCH recall. — PASS

step 10: part 5 "Capital Flight", REORDER recall. Capital flight is now taught in prose (ledger quiz-02). — PASS

step 11: Chapter 2 check-in.
- diagram "Commodities, Savings and Foreign Currency", 3 views, smallest label 9.4px. Terms of trade 90÷120×100 = 75.
- quiz "copper 50% of exports, price −20%" (answer 10%).
- GUIDED PRACTICE "Explain … Prebisch-Singer (4 marks)", headed "The opening is given; write the rest".
- "RECALL FROM CHAPTER 1": the step-1 sort, shuffled, not the step just before.

— PASS. Note: the text shown as the "opening" is advice ("Appendix 6 wants linked stages…"), not an opening sentence. "See full guidance ▼", tapped, prints all 4 marked points before the student writes.

**Reload test** at step 11: stored `{v:"41.1q6cl3s", s:10}`. After a reload and "Start learning" I saw "You left off at step 11 of 41. Pick up where you left off?" with Continue and Start over, and the step 11 body rendered underneath. Continue returned to step 11. — PASS

step 12: Chapter 3 "Constraints: People, Debt, Credit and Infrastructure", part 1 of 5 "Demographic Factors", FILL-IN recall (dependency ratio). — PASS

step 13: part 2 "Debt: Household and Overseas", REORDER recall. — PASS

step 14: part 3 "Access to Credit and Banking", MATCH recall. — PASS

step 15: part 4 "Infrastructure", SORT recall. — PASS

step 16: part 5 "Education and Skills", REORDER recall. — PASS

step 17: Chapter 3 check-in.
- diagram "Population Structure and Debt", 3 views, smallest label 9.4px. Young population (42+4)÷54×100 = 85. Debt service view: $1.8bn ÷ $12bn = 15%.
- quiz: dependency ratio (answer 82).
- guided practice: Analyse, 6 marks.
- recall from Chapter 2: the step-6 reorder.

— PASS

step 18: Chapter 4 "Non-Economic Constraints", part 1 of 3 "Corruption and Poor Governance", SORT recall. — PASS

step 19: part 2 "Civil Wars and Terrorism", REORDER recall. — PASS

step 20: part 3 "Migration", MATCH recall. The counter read "STEP 20 OF 41" with a full body. — PASS

step 21: Chapter 4 check-in.
- diagram "Conflict and Corruption on a PPF": PPF to PPF₁, labels distinct, smallest 9.4px.
- quiz on corruption.
- guided practice: Examine, 8 marks.
- recall from Chapter 3: dependency-ratio fill-in, answers 60% / 67 / shrink.

— PASS

step 22: Chapter 5 "Market-Orientated Strategies" (the spec's own term), part 1 of 5 "Trade Liberalisation", REORDER recall. — PASS

step 23: part 2 "Promotion of FDI", FILL-IN recall (Harrod-Domar with FDI). — PASS

step 24: part 3 "Removing Subsidies and Privatisation", SORT recall. — PASS

step 25: part 4 "Floating Exchange Rate Systems", REORDER recall. — PASS

step 26: part 5 "Microfinance Schemes", MATCH recall. — PASS

step 27: Chapter 5 check-in: diagram (9 labels, smallest 9.4px), quiz, guided practice, and the recall from Chapter 4 (the step-18 sort). — PASS

step 28: Chapter 6 "Interventionist Strategies", part 1 of 6 "Development of Human Capital", FILL-IN recall. — PASS

step 29: part 2 "Protectionism", SORT recall. — PASS

step 30: part 3 "Managed Exchange Rates", MATCH recall. — PASS

step 31: part 4 "Infrastructure Development", REORDER recall. — PASS

step 32: part 5 "Promoting Joint Ventures with TNCs", MATCH recall. — PASS

step 33: part 6 "Buffer Stock Schemes", FILL-IN recall (cocoa floor $3). — PASS

step 34: Chapter 6 check-in: buffer-stock diagram (13 labels, smallest 9.4px), quiz, guided practice, recall from Chapter 5. — PASS

step 35: Chapter 7 "Other Strategies and International Institutions", part 1 of 6 "Industrialisation: The Lewis Dual-Sector Model", REORDER recall. Lewis is now taught in prose (ledger quiz-01 / structure-08). — PASS

step 36: part 2 "Development of Tourism", SORT recall. — PASS

step 37: part 3 "Development of Primary Industries" (the spec-coverage "missing" leaf), MATCH recall. — PASS

step 38: part 4 "Aid and Debt Relief", FILL-IN recall. — PASS

step 39: part 5 "The World Bank and the IMF", SORT recall. — PASS

step 40: part 6 "Non-Government Organisations", SORT recall. — PASS

step 41: Chapter 7 check-in.
- diagram "The Lewis Dual-Sector Model", 2 views, 15 labels, smallest 9.2px (307px render, scale 0.767). No label rects overlap. D₁/D₂/D₃ cross $3 at 2/3/4 million on the axis ticks, turning point at 5.
- quiz on surplus labour.
- QUICK CHECK Evaluate (20 marks), with the mark scheme behind "Reveal mark scheme ▼".
- recall from Chapter 6: human-capital fill-in.
- footer button "Complete topic ✓".

— PASS

step 42 (Complete topic): "Topic complete". It shows:
- "100% strength · review tomorrow"
- Score breakdown "Written practice 0/12"
- "What you covered", listing all 7 chapters
- quick-fire drill (10 questions), Smart Practice, flashcards and retry

— PASS. Notes: "100% strength" appeared after 1 of 7 check-in quizzes answered. "0/12" does not match the 7 written tasks the walk offered. Both are component behaviour, not packet content.

**Resume pointer, "step 20 of 9" class:**
- (a) Same-deck pointer past the end, `{v:"41.1q6cl3s", s:60}`, then reload and Start learning: "You left off at step 41 of 41", bar 100%, the step 41 body rendered, footer "Complete topic ✓". — PASS
- (b) Foreign-deck pointer, `{v:"9.0ldd3ck", s:20}` (the "20 of 9" shape): opened at "STEP 1 OF 41", 2%, with the full step 1 body. — PASS. Note: on this signed-out path it restarts silently, with no "this topic has been rebuilt" notice. The signed-in (DB pointer) path was not walked because no credentials were used.

**Tables, the width failure:**
- Learn, all 41 steps: `<table>` count 0 on every step. `document.documentElement.scrollWidth` 390 on every step. No element's rect extends past 390. No horizontal scroll container.
- Notes: 7 topics, 0 tables, no overflow, no grid with 3+ columns.
- Diagrams: 7 diagrams, 0 tables, no overflow. Label-rect overlap check on each default view: none.
- Practice: 10 items, 0 tables, no overflow.
- Flashcards: signed-out preview "Card 1 of 2", no overflow.

— PASS (there is no table to be illegible)

**Other tabs:**
- Practice lists 10 questions with legal command words and tariffs only: Define 2, Calculate 2, Explain 4, Calculate 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20 ×3. There is no "Outline", "Assess", "Define (4)" or 10-mark item left. — PASS against topFix-05.
- The student sees a flat list, with no extract and no Section B / Section C framing. Brief §6 left that shape as the builder's scope decision, so it is recorded here, not failed.

## Console errors

- 2 × `Failed to load resource: 401 (Unauthorized)`, both `POST /api/learn-mode/state`. This is the signed-out writer being refused; progress falls back to localStorage.
- `POST /api/events` requests report `ERR_ABORTED` in the network log (status 204). Nothing is logged to the console for them.
- No other errors or warnings, including no React key or hydration warnings.

## Audit complaints still visible

None.
- Gate: the pre-test is optional, every recall has "Skip", and Next was never disabled.
- Screens before the first Next: none, because Next is a sticky footer. Steps are 392-572 words, 2452-3888px, which is 2.9-4.6 screens at 844px.
- Exercise with no defensible answer: none in the items worked (pre-test, 7 quick-quiz stems read, sort, match and fill-in done with real taps). Reorder was read but not solved by tap.
- Text box with no button: none. All 7 have "Mark my answer".
- Recall shown twice in a row: none. Check-in recalls come from the previous chapter, never the step before.
- Unreadable diagram labels: none. The smallest is 9.2-9.4px inline (12px in the enlarged modal), and labels are legible in screenshots.
- Header naming the wrong section: none. Every step shows "Growth & Development / SECTION 4.3.6" with the correct chapter line.

Non-blocking notes for the builder, not failures:
1. The step 8 "$7.2bn" has no stated GDP behind it.
2. Every "Exam matters" box cites "Appendix 6" to the student by name.
3. The guided-practice "opening" is advice, not an opening sentence.
4. The overview page's server-rendered crawler text is still live `data`, including Sustainability and green growth. This is expected until publish; re-check it after publish.
