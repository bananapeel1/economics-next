# Packet 49: Verify B (student walkthrough at 390x844), 26 Sep 2026

Section: business__business-growth (IAL Business 3.3.2), staged draft.

**Setup.** At the start, `remediation-dev` on :3001 was running under another chat (pid 46964). `curl /api/sections/business-growth?draft=1` returned 200 and 92,056 B: 5 blocks, 7 practice items and 8 quiz items (the signed-out sample). I walked on an isolated origin, `p49b.localhost:3001`, with the viewport at 390x844. Before the first page I cleared localStorage, sessionStorage, cookies and IndexedDB (there was no IndexedDB). I reached the section by tapping Unit 3 → 3.3.2 "Open in app", then added `?draft=1` because the packet is staged, not published.

Every answer, recall move, tab, checklist, guidance toggle and enlarge was a real tap (by ref or coordinate), never `element.click()`. The only direct localStorage writes were the resume-pointer plants in step 26. Verdicts come from the DOM: visible text, computed style, rects and SVG text boxes. Every pixel figure is at 390px viewport width.

**The dev server died mid-walk.** After step 25, :3001 stopped answering (`curl` gave 000) and no `next dev` process was left. A peer session had stopped it. I restarted it with `preview_start remediation-dev`, and it is still running under this session. Browser storage on my origin survived, so step 26 continued from the real step-20 pointer.

I edited nothing except this file. At the end I cleared my origin's storage and reset the viewport.

No acceptance script was supplied, so I walked the whole Learn Mode flow, then Notes, Practice and Diagrams, and checked the two shipped failure classes on purpose: table cell width, and "step 20 of 9".

step 1: Unit 3 hub (`/business/unit-3`). The 3.3.2 tile's description still reads "…organic vs external growth, mergers, takeovers, demergers and the reasons businesses choose different paths". Its sub-tile c is "Demergers & Staying Small / Demergers · splitting up · staying small · niche markets", and d still lists "diversification · synergies". The staged section teaches neither demergers nor staying small, and both are ruled off-spec for 3.3.2 (`app/business/unit-3/page.js:25,29`). — FAIL (non-blocking for staging; hub copy, same class as packets 54 and 55 step 1). Expected: the tile describes what the section teaches.

step 2: section hub. The header reads "SECTION 3.3.2 · Unit 3: Business Decisions and Strategy", title "Business Growth". Without `?draft=1` it shows live: Learn 5 steps, Notes 3 topics, Practice 5, no Diagrams tab. With `?draft=1` it shows Learn Mode "✓ Free · 20 steps", Notes "5 topics", Diagrams "All annotated", Practice "7 questions", Flashcards "28 cards" and Quiz "25 questions" (Pro). — PASS. Expected: the right header, and counts that match the draft (15 subsections + 5 check-ins = 20).

step 3: "Start learning" → a card "Want a quick check first? Three questions … Optional, and nothing is marked", with "Test yourself first / Just teach me". The pre-test asks: economies of scale mean cost per unit falls; one hospital scanner spread over thousands of patients is a technical economy; which is an external economy (a local college training workers for the industry). I answered A/C/D and got "3 / 3 correct … Answers are held back until the end" and "Start learning →". — PASS. Expected: an optional pre-test with defensible answers and no gate.

step 4: step 1 of 20, "CHAPTER 1 OF 5 · Why Businesses Grow · part 1 of 3 · Internal Economies of Scale". It shows the five internal economies, the Tanjong Bakes example and a Hong Kong shipping-line example. The misconception is "total costs rise; cost per unit falls". The sticky "1 / 20 Next →" bar sits at y=790 on the first screen. MATCH (5 savings → 5 economies): "✓ All correct!". — PASS

step 5: step 2 of 20, "External Economies of Scale": skilled labour pool, specialist suppliers and shared infrastructure, with a Pakistani surgical-instrument cluster example. SORT internal/external (6 items): "✓ All correct!". — PASS

step 6: step 3 of 20, "Market Power, Market Share and Profitability". It covers the three further objectives, with Tanjong at 8% share and S$6m profit. The misconception is that share is not profit. SORT into 3 groups (power / share and name / profitability): "✓ All correct!". — PASS

step 7: step 4 of 20, "Chapter check-in". **Question-first confirmed.** Before I answered, the step body held 470 characters of text: the eyebrow, "Before the next chapter: a quick question and the diagram", the stem, options A-D and "Answer the question first… / Skip the question". It had no diagram title and no practice. The question: a bakery chain buys half its flour supplier's output; which objective? I answered "market power over a supplier" and got "Correct!", with an explanation that refutes all three distractors. Then the rest appeared.
- DIAGRAM "Sources of Economies of Scale": 15 labels, 313px (computed 313px), smallest label 9.4px at 390px, 0 clipped, 0 overlapping, 0 spilling out of their boxes.
- Enlarge: a real tap on the SVG opened the modal. Class `lm-diagram-modal-backdrop lm-diagram-modal-visible`, inner transform `matrix(1, 0, 0, 1, 0, 0)`, computed width 390px = rect width 390px, SVG 400px, labels 12.0px, 0 clipped. It closed with ×.
- WORKED EXAMPLE (Calculate, 4): the model answer is shown by design: S$0.18 ÷ S$0.80 = 22.5%, with 29% named as the wrong-base error. The arithmetic is correct. I typed an answer and tapped "Mark my answer", which gave "Tick what your answer includes … 0 of 4". I ticked four and got "4 of 4 marks claimed".

The same two tick-list defects as packet 54 appear here:
- (a) The first checkbox's label is the scaffold paragraph glued to the first mark line.
- (b) The note "Dividing by the new cost of S$0.62 gives about 29%…" is rendered as a fifth tickable checkbox that carries no mark.

**New cosmetic finding:** the whole of Source A plus the question renders as one `p.lm-practice-question` in 17px bold. That is 1,257 characters and 944px tall, more than one full screen of bold text, with the actual question buried at the end. The same block repeats at the step 8, 12, 16 and 20 check-ins. The step body is 3,692px tall, and the sticky Next stays reachable. — PASS (with 3 cosmetic defects: the two tick-list defects and the bold source wall)

step 7a: step 4: check-in answer — clean. The caption, the six checklist lines ("Purchasing: larger orders win discounts" … "External: skilled workers…") and every SVG label describe sources of cost savings. None of them states market power or power over a supplier.

step 8: step 5 of 20, "CHAPTER 2 OF 5 · Organic Growth · Organic and Inorganic Growth". The route decides it, not the finance. SORT organic/inorganic (6): "✓ All correct!". — PASS

step 9: step 6 of 20, "Methods of Growing Organically": outlets and capacity, new products, new markets, selling online. Franchising is a pointer only ("covered in 2.3.1"). The Kuala Lumpur tea-shop example is invented. MATCH (4 plans → 4 methods): "✓ All correct!". — PASS

step 10: step 7 of 20, "Organic Growth: Advantages and Disadvantages". "Reaches only 55 cafés in two years, while buying Golden Crust would reach 70": 40+15 and 40+30, correct. SORT advantage/disadvantage (6): "✓ All correct!". — PASS

step 11: step 8 of 20, "Chapter check-in". Question-first: only the question was shown ("Which of these is a disadvantage of organic growth?"). **I tested "Skip the question" here.** It revealed the diagram, guided practice, recall and takeaway, and the quiz stayed answerable. I answered "limited by the finance the firm can generate" and got "Correct!", with the distractors refuted.
- DIAGRAM "Methods of Organic Growth": 14 labels, 313px, smallest 9.4px at 390px, 0 clipped, 0 overlapping.
- GUIDED PRACTICE (Explain, 4): the opening is scaffold only. "See full guidance ▼" is collapsed until tapped. It then shows K/A/An/An marks (55 vs 70 cafés).
- RECALL FROM CHAPTER 1: the step-1 match, reshuffled, 7 steps later: "✓ All correct!".

Body height is 4,220px. — PASS

step 11a: step 8: check-in answer — clean. The checklist (the four routes: outlets and capacity, new products, new markets, online sales) and the labels say nothing about finance limits or any disadvantage.

step 12: step 9 of 20, "CHAPTER 3 OF 5 · Mergers and Takeovers · part 1 of 3". Merger vs takeover (over half the voting shares; friendly or hostile), and six reasons for mergers and takeovers. "Lift its share of the market from 8% to 14%": 8+6, correct. The example is a Gulf bank merger. REORDER (5: pick a target → bid → control passes → combine offices → costs fall) has exactly one defensible order. I built it by tap-to-position and arrows and got "✓ Perfect order!". — PASS

step 13: step 10 of 20, "Horizontal and Vertical Integration". It works through the stages of production, then backward and forward. Tanjong's three options are classified correctly: Golden Crust is horizontal, the mill is backward and a delivery firm is forward. SORT (6 chocolate-maker deals into backward / same stage / forward): "✓ All correct!". — PASS

step 14: step 11 of 20, "Conglomerates": spreads risk, few savings, a possible valuation discount. The example is a Nigerian cement/sugar/salt group. FILL-IN (steel mill = backward, showrooms = forward, rival = horizontal; distractors conglomerate and organic): "✓ All correct!". This recall tests step 10, not the conglomerate step it sits on. — PASS

step 15: step 12 of 20, "Chapter check-in". Question-first: only the question was shown ("main difference between a merger and a takeover"). I answered "a takeover is one firm buying control of another" and got "Correct!".
- DIAGRAM "Horizontal, Vertical and Conglomerate Integration" is a chain: wheat farms → flour mill → Tanjong Bakes → supermarkets → consumers, with Golden Crust and a laundry chain. It has 13 labels, 313px, smallest 9.4px at 390px, 0 clipped, 0 overlapping, and it is legible in a screenshot.
- GUIDED PRACTICE (Discuss, 8: "benefits … of taking over Straits Flour Mill"): the opening is scaffold only. The guidance shows Level 1-4 descriptors with no mark bands, ending "Discuss needs this assessment; it does not need a final recommendation".
- **DEBT:** the diagram directly above labels the flour mill "Buy it: backward vertical". Identifying backward vertical integration is the scheme's Level 2 step, so part of the answer is on screen.
- RECALL FROM CHAPTER 2: the step-5 sort, reshuffled: "✓ All correct!".

Height is 4,435px. — PASS (DEBT: the practice's first step is labelled on the diagram above it)

step 15a: step 12: check-in answer — clean. The checklist (horizontal / backward / forward / conglomerate) and the labels do not mention how control changes, or merger versus takeover.

step 16: step 13 of 20, "CHAPTER 4 OF 5 · Inorganic Growth: Risks and Rewards · Financial Risks and Rewards of a Takeover". Worked case: S$50m − S$32m = S$18m premium; 5% × S$30m = S$1.5m interest; S$4m + S$1m − S$1.5m = S$3.5m. All correct. FILL-IN (45 − 30 = 15; 5% × 20 = 1; distractors 4 and 75): "✓ All correct!". — PASS

step 17: step 14 of 20, "Inorganic Growth: Advantages and Disadvantages". A 3-stage flow chain (takeover → cultures clash → savings shrink → RESULT) renders in full. No crash, and scrollWidth stays at 390. SORT advantage/disadvantage (6): "✓ All correct!". — PASS

step 18: step 15 of 20, "Organic or Inorganic? A Worked Judgement". The judgement is conditional on the savings arriving. MATCH (4 situations → route plus reason): "✓ All correct!". — PASS

step 19: step 16 of 20, "Chapter check-in". Question-first: only the question was shown (S$50m paid for net assets of S$35m; the premium). I answered S$15m and got "Correct!", with 85 and the other distractors explained.
- DIAGRAM "Weighing a Takeover" (rewards against risks): 12 labels, 313px, smallest 9.4px at 390px, 0 clipped, 0 overlapping.
- GUIDED PRACTICE (Assess, 12): the scheme's figures are S$36m − S$20m = S$16m, 6% × S$24m = S$1.44m, and S$3m + S$1.5m − S$1.44m = S$3.06m. All correct.
- RECALL FROM CHAPTER 3: the step-9 reorder, reshuffled: "✓ Perfect order!".

Height is 4,256px. — PASS

step 19a: step 16: check-in answer — clean. The checklist ("Risks: paying a premium, the cost of the finance…") names the concept but gives no figure. Neither 15, 35 nor 50 appears on the diagram, the caption or the checklist.

step 20: step 17 of 20, "CHAPTER 5 OF 5 · Problems Arising From Growth · Diseconomies of Scale". Coordination, communication and motivation; unit cost, not total cost. MATCH (3 problems → 3 causes): "✓ All correct!". — PASS

step 21: step 18 of 20, "Internal Communication". Layers, sites and departments, with Tanjong going from 3 to 5 layers and a Kenyan bank example. A 3-stage flow chain renders. SORT worse/better (6): "✓ All correct!". — PASS

step 22: step 19 of 20, "Overtrading". The timing gap is 60-day supermarket credit against 30-day flour terms. FILL-IN (45 − 15 = 30; 20 − 15 = 5; distractors 35 and 60): "✓ All correct!". — PASS

step 23: step 20 of 20, "Chapter check-in", progress 100%. Question-first: only the question was shown ("a cause of diseconomies of scale"). I answered "messages passing through more layers of management" and got "Correct!".
- DIAGRAM "Economies and Diseconomies of Scale" (a U-shaped cost curve): 6 labels, 313px, smallest 9.4px at 390px, 0 clipped, 0 overlapping.
- QUICK CHECK "You're on your own — write it, then mark it" (Assess, 12: problems of growing to 70 cafés): a text box, "Mark my answer" and "Reveal mark scheme ▼". `.lm-practice-answer` has max-height 0px, overflow hidden and height 0 until tapped.
- RECALL FROM CHAPTER 4: the step-13 fill-in. **I entered a wrong value on purpose** (75 for the premium). It was marked "1 of 2 right", with 15 shown and a "Try again" button.

The bar reads "20 / 20 Complete topic ✓". — PASS

step 23a: step 20: check-in answer — clean. The checklist (left of the lowest point: economies; right: diseconomies; growth lowers unit cost only up to a point) and the labels never mention layers of management or communication.

step 24: TABLE WIDTH check (the illegible-at-390px class). Steps 1-20, Notes, Practice and Diagrams contain 0 `<table>` elements on every screen, and `document.documentElement.scrollWidth` = 390 on every screen. Tabular content appears only as SVG diagrams and flow chains. For those I measured width, not structure. Every `<text>` box lies inside the smallest `<rect>` containing its centre (0 spills), and no two labels overlap, on all 5 diagrams. The smallest label is 9.4px inline (9.2px on the Diagrams tab at 306px) and 12.0px in the enlarge modal. — PASS

step 25: Completion. "Continue" → answer → "Complete topic ✓" → "Topic complete · Business Growth · 100% strength · review tomorrow". "What you covered" lists the 5 chapters, then "Quick fire drill (8 questions)", "Smart Practice: all 8 questions", "Review flashcards" and "Retry this topic". The Score Breakdown reads "Quiz 1/1 · Written practice 0/2". It counts only the check-in answered after the step-26 reload, not the four answered earlier (platform, cosmetic). — PASS

step 26: RESUME POINTER (the "step 20 of 9" check). At step 20, localStorage held `{"v":"20.1s65keb","s":19}`.
- (a) Reload `?draft=1` → "Start learning" → "You left off at step 20 of 20. Pick up where you left off? Continue / Start over", with the step-20 body rendered question-first (471 chars).
- (b) The same pointer on the LIVE URL (5 steps) → "STEP 1 OF 5" with a body (2,218 chars); the pointer was rewritten to `{"v":"5.fuoggq","s":0}`. Live Learn Mode opened on first tap with no crash, so the 14 Sep `reading 'map'` note (brief §5) does not reproduce on this build.
- (c) Planted live pointer `{"v":"5.fuoggq","s":4}` on the draft (the post-publish case) → "STEP 1 OF 20" with a body (2,831 chars); the pointer was rewritten to `{"v":"20.1s65keb","s":0}`.
- (d) Planted out-of-range `{"v":"20.1s65keb","s":40}` on the draft → clamped to "You left off at step 20 of 20", with a body; the pointer was rewritten to `s:19`.

Never N > M and never a blank body. — PASS

step 27: Notes tab (`?draft=1`). Five chapter notes named after the chapters, tagged "3.3.2 · 1a", "· 1b, 2a-2b", "· 3a", "· 3a, 3b" and "· 4a-4c", in IAL numbering. Each has a key idea, definitions, mechanisms and 3 takeaways. The cross-references are "how a small business competes is covered in 2.3.5" and "Overtrading as a cause of business failure also appears in 2.3.3". I checked both against `bus_spec.txt` (:1032 is under 2.3.5; :946 is under 2.3.3), and both are correct. There are no demergers, no Ansoff and no barriers to entry. No tables; scrollWidth 390. — PASS

step 28: Practice tab. "Source A" renders once, with "Every question below uses this source.", then 7 tasks: Calculate 4, Explain 4, Discuss 8, Assess 12, Assess 12, Evaluate 20 (Plan A vs Plan B) and Evaluate 20 (profitability). Guidance is collapsed behind "Show Guidance". I opened the second Evaluate: Level 1-4 descriptors, figures consistent with Source A. The filter chips read 2 Marks 0 / 6 Marks 0 / 10 Marks 0 (platform chips, cosmetic). There is no Ansoff and no barriers to entry. — PASS

step 29: Diagrams tab: 5 diagrams ("Sources of Economies of Scale", "Methods of Organic Growth", "Horizontal, Vertical and Conglomerate Integration", "Weighing a Takeover", "Economies and Diseconomies of Scale"). Each is 306px wide, smallest label 9.2px at 390px, 0 clipped, 0 overlapping. — PASS

step 30: SSR/SEO text. With `?draft=1`, the page's `sr-only` block still holds the LIVE section ("Growth Methods", Starbucks, Facebook/Instagram, "Small firms persist in every economy…"). None of it is visible on screen. — PASS for a sighted student (preview artefact); re-check after publish.

Check-in answers: step 4 clean · step 8 clean · step 12 clean · step 16 clean · step 20 clean. Question-first was confirmed at all five check-ins, and "Skip the question" was tested at step 8.

Console errors: two "Failed to load resource: 401 (Unauthorized)". Both are `POST /api/learn-mode/state`, the signed-out server save; the local pointer saved correctly. There are also two "WebSocket connection to ws://p49b.localhost:3001/_next/webpack-hmr failed", which is dev-only HMR on the isolated origin across the server restart. I saw no uncaught exception, including no `reading 'map'`. One caveat: the console buffer I could read starts at the pages loaded after the server restart. Before that, every step body rendered, so there was no visible symptom of an error.

Audit complaints still visible:
- A hub page advertising content the section no longer teaches: "demergers" and "Demergers & Staying Small" on the 3.3.2 tile of `/business/unit-3` (step 1). This reaches students at merge, not at publish.
- A practice item partly answered by the diagram above it: the step-12 Discuss 8 on the flour mill sits under a diagram labelled "Buy it: backward vertical" (step 15). This is DEBT, not gate-blocking.
- Cosmetic: at every check-in, Source A plus the question renders as one 944px wall of 17px bold text. The tick list glues the scaffold to the first mark line and makes the wrong-base note tickable (step 7).
- None of: a gate the student cannot pass, a step that runs many screens before the first Next (the Next bar is sticky; check-ins are 3.7-4.4k px), an exercise with no defensible answer, a text box with no button, a recall twice in a row, an unreadable diagram (9.4px inline, 12px enlarged), a wrong-section header, an illegible table, or "step N of M" with N > M.
