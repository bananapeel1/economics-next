# Packet 53 — Verify B (student walkthrough, 390x844)

Section `business__influences-business-decisions` (IAL Business 3.3.4), staged draft served through
`http://localhost:3001/business/unit-3/influences-business-decisions?draft=1` on the shared `remediation-dev`
server (port 3001, already running, owned by another session). Signed out, dark theme, viewport emulated
at 390x844 (DPR 2). Storage cleared before the first load. All taps were real clicks on elements found by
their accessibility refs; no `.click()`. No acceptance script was handed over, so the script below is the
brief's "what done means" list walked in order. Every pixel figure is at 390px width.

Run conditions to know about: other sessions were writing to the same origin's localStorage during the walk
(keys for `role-state-macroeconomy`, `managing-change` and market-failure practice came and went, and this
section's own answer log was wiped once mid-walk). Fast Refresh rebuilt the page about ten times, meaning peers
were editing files. None of that changed what was on screen for this section. The Next.js dev "N" badge
covers the bottom-left back-arrow button at 390px, so taps meant for "back" hit the badge. That is dev only.

step 0: section hub shows "Section 3.3.4", "Influences on Business Decisions", Learn Mode "Free · 17 steps", Notes "4 topics", Practice "7 questions", Flashcards "27 cards", Quiz "22 questions" — PASS the staged deck is served (4 chapters / 17 steps), not the live 2-block one
step 0b: the visually hidden SEO block (sr-only) and the RSC payload still carry the LIVE text (Google, Volkswagen, Mendelow "2x2 grid", Patagonia, BP) — PASS for a staged draft (the server render reads `data`; nothing of it is visible at 390px). A screen reader would hear it until publish
step 1 (pre-test): "Want a quick check first?", then 3 questions (power / role / task culture). Answered all three, "3 / 3 correct", "Answers are held back until the end" — PASS
step 2 (step 1 of 17): "Chapter 1 of 4 · Corporate Culture · part 1 of 3 · Strong and Weak Cultures". Key idea, body, Orvana example, Gulf bank example, misconception "strong culture is always a good culture", exam matters, Sort recall. 3.4 screens tall, with Next in a sticky bar always visible. Sorted all six, "✓ All correct!" — PASS
step 3 (2/17): "Power and Role Cultures". Handy named once as an aside ("the names of the types are what matter, not the writer"). Fill-in: answered one blank wrong on purpose. Showed "1 of 2 right", the wrong word struck through with the right word beside it, and "Try again". Retried, "✓ All correct!" — PASS (no `why` line on a wrong fill-in; the right word is shown)
step 4 (3/17): "Task and Person Cultures", Lagos film crew example, Match recall (4 organisations → 4 types). "✓ All correct!" — PASS
step 5 (4/17): chapter 1 check-in. It reads "Before the next chapter: the diagram and a quick question", then diagram "Four Types of Company Culture" (4 boxes), then quick quiz "A strong corporate culture is one in which:", then a Worked example (Discuss, 8 marks) with the model visible by design ("Read the model, then have a go"), then the chapter takeaway. 4.6 screens. Answered A, "Correct!" with a reason — PASS
step 5: check-in answer — clean. Opened "What a correct diagram shows · 4 points" with a tap: "Power: decisions radiate from one central person / Role: authority comes from the job title and the procedure / Task: teams form around a job and are led by expertise / Person: the organisation exists to support independent professionals". Nothing about strength; the key "values are widely shared and deeply held" is not on the diagram
step 5b: question-first flow — could not verify on this build. The check-in renders diagram-first (the diagram card sits above the quiz). Per the 26 Sep update this is not failed
step 6 (5/17): "How Corporate Culture Is Formed" (founder, history, recruitment/promotion/rewards, country and industry), Gulf airline example. Reorder recall: 4 items, set with the ▲/▼ buttons, "✓ Perfect order!" — PASS (the body lists the sources but not a sequence; the order comes from reasoning, not from rereading)
step 7 (6/17): "Why an Established Culture Is Hard to Change" (loss, proof, systems, time and scale), Kenyan hospital merger example. Sort into harder/easier, "✓ All correct!" — PASS
step 8 (7/17): "Can a Culture Be Changed? A Worked Judgement" (for / against / judgement with a condition), Pakistani telecoms example. Match recall with 4 pairs, all set; the result line was not captured — PASS (content renders; result unrecorded)
step 9 (8/17): chapter 2 check-in: diagram "How a Culture Forms and Holds" (a loop of founder's values → hiring/promotion → pay → past success), then quiz "A founder-led snack maker grows from 40 staff to 4,000…", then Guided practice (Explain, 4 marks), which shows only the opening paragraph and puts the rest behind "See full guidance ▼", then "Recall from chapter 1: Strong and Weak Cultures" (the same sort as step 2 with the items reshuffled), then the takeaway. 5.2 screens. Answered A, "Correct!" — PASS
step 9: check-in answer — clean. Checklist: "The founder's values are the first model staff copy / Hiring and promotion spread those values beyond the founder / Pay and bonuses show what the business really values / Success seems to prove the values right, so they are defended". No culture type is named, so "from a power culture towards a role culture" is not on the diagram
step 10 (9/17): "Internal and External Stakeholders". Internal/external taught in the body, and shareholders "either is accepted with a reason". Mendelow named once as an aside. Kenyan mining example. Sort hotel-chain stakeholders, "✓ All correct!" — PASS
step 11 (10/17): "Stakeholder Objectives" (each group's objective, overlap as well as clash). Match: answered 2 of 4 wrong on purpose. Showed "✗ 2 of 4 matched", "Try again", "Show the answer". The answer panel lists every pair with its reason ("Employees depend on the business for their income…") — PASS
step 12 (11/17): "The Shareholder Model and the Stakeholder Model" in the spec's own wording. Friedman and Freeman named once each. Hong Kong coffee-chain example. Fill-in, "✓ All correct!" — PASS
step 13 (12/17): "Conflict Between Profit and Wider Objectives". Ipoh closure worked through (RM9m saving, RM60m → RM69m, about sixteen months to pay back), with a 4-box flow chain that fits at 390px (no horizontal overflow). Pakistani textile example. Sort into gains/loses, "✓ All correct!" — PASS
step 14 (13/17): chapter 3 check-in: diagram "Internal and External Stakeholders" (Internal box inside External, "Shareholders?" on the boundary), then quiz "Which objective is a supplier most likely to have?", then Guided practice (Assess, 12 marks, opening only), then "Recall from chapter 2" (the reorder again, reshuffled), then the takeaway. 5.1 screens. Answered C, "Correct!" — PASS
step 14: check-in answer — clean. Checklist: "Internal stakeholders work within the business: employees and managers / External stakeholders are outside it: customers, suppliers, lenders, government, the community, pressure groups / Shareholders own the company; textbooks class them either way, so give a reason". Suppliers appear only as a label; "regular orders and prompt payment" appears nowhere on the diagram
step 15 (14/17): "Ethics of Strategic Decisions: Profit Against Ethics" (palm oil RM6m, RM60m → RM54m, 10%, a 1.2% price rise to cover it), Ghanaian cocoa example. Match recall, "✓ All correct!" — PASS
step 16 (15/17): "Pay and Rewards" (100 to 1 → 125 to 1 against MEDIAN pay; what a bonus is tied to; a 4-box flow chain), Nigerian bank example. Fill-in "RM2.4m / RM40,000 = ___ to 1" with the options 600 / 6 / 60. Chose 60, "✓ All correct!" — PASS
step 17 (16/17): "Corporate Social Responsibility (CSR)". Greenwashing named once. Kenyan dairy example. Sort into law/CSR, "✓ All correct!" — PASS
step 18 (17/17): chapter 4 check-in: diagram "Weighing Profit Against Ethics" with two views, Profit (RM60m / RM54m) and Pay ratio (100 to 1 / 125 to 1, "Chief executive pay ÷ median pay"). Then quiz "Business ethics is best described as:", then a Quick check (Calculate, 4 marks) asking for the ratio to the LOWEST-PAID workers' pay (RM30,000), with its mark scheme collapsed behind "Reveal mark scheme ▼" (the container measured max-height 0 / overflow hidden before the tap). Then "Recall from chapter 3" and the takeaway. Answered D, "Correct!" — PASS
step 18: check-in answer — clean (quiz). Checklist: "Certified oil: profit RM60m → RM54m a year / Pay: 100 to 1 now, 125 to 1 with the RM1.2m bonus / Size each trade-off before judging it". No definition of ethics on the diagram
step 18b: check-in 4 practice slot (Verify A's round-0 leak) — clean. The item now shown asks for chief executive pay ÷ RM30,000. Its scheme reaches 160 to 1, 40 and 200 to 1. The diagram (both views), the checklist, the caption and the 3b body print 100, 125, RM1.2m, RM6m, RM60m and RM54m, and none of 160, 40 or 200. The fix-round-1 relocation holds on screen
step 19: "Complete topic ✓" → "Topic complete · Influences on Business Decisions · 100% strength · review tomorrow". Score breakdown: Quiz 4/4, Recall 11/13, Written practice 0/8. "What you covered" lists the 4 chapters. Quick fire drill (7 questions), Smart Practice (7 questions), Review flashcards, Retry this topic — PASS (see the note on "0/8" below)
step 20 (resume, real): Retry → Just teach me → Next ×5 to step 6 (pointer `{"v":"17.1qs3tzj","s":5}`) → full reload → Start learning. Showed "You left off at step 6 of 17. Pick up where you left off? Continue / Start over" above "STEP 6 OF 17 · Chapter 2 of 4 · part 2 of 3 · Why an Established Culture Is Hard to Change" with its full body (2,903 characters) and the footer "6 / 17" — PASS no "step N of M" mismatch, no blank body
step 21 (resume, seeded stale pointer, the "step 20 of 9" shape): set the pointer to the bare legacy integer `19` (beyond this 17-step deck), reloaded, tapped Start learning. Showed "STEP 1 OF 17", step 1's full body, footer "1 / 17", and the pointer rewritten to `{"v":"17.1qs3tzj","s":0}`. No "rebuilt" notice, per the founder's 25 Sep ruling (silent restart) — PASS no "step 20 of 17", no blank body
step 22 (tables): no `<table>` element anywhere in Learn (all 17 steps), Notes, Diagrams or Practice at 390px, so there is no cell width to measure. No element in any of those views extends past the 390px viewport (right edge > 391) — PASS
step 23 (diagrams at 390px): 4 diagrams rendered 313px wide inline in Learn and 306px wide in the Diagrams tab. The smallest SVG label is 9.4px inline and 9.2px in the Diagrams tab (every label is 12 units in a 400-unit viewBox). An all-pairs text-box overlap test (tolerance 1.2px) found 0 overlaps and 0 labels clipped at the SVG edge, in every view, including the Pay ratio view — PASS (9.4px is the known programme-wide figure with no phone floor set; recorded, not failed)
step 24 (other tabs): Notes shows "Corporate Culture · 3.3.4 · 1A-1B" with Definition / Mechanism / Implication / Link. The Practice tab shows Source A once, then 7 questions (4, 4, 8, 12, 12, 20, 20 marks), each with guidance behind "Show Guidance". No Google, Volkswagen, Patagonia, "Mendelow's matrix", "2x2" or Carroll text visible in any tab — PASS

Console errors: 4 × "Failed to load resource: the server responded with a status of 401 (Unauthorized)", all from
`POST /api/learn-mode/state` (a signed-out progress write the server refuses). No JavaScript exceptions and no React
errors. `/api/events` beacons show `ERR_ABORTED` with a 204 (normal for sendBeacon). Everything else was HMR / Fast
Refresh logging from peers' edits.

Audit complaints still visible: none of the audit list. No gate the student cannot pass: Next is in a sticky
footer and always visible, and every recall has Skip. Every step is 2.9 to 5.2 screens, with Next always on
screen. Every recall had a defensible answer. No text box without a button: each practice has "Mark my answer",
which was not pressed, so AI marking was not exercised. No recall repeats back to back: the "Recall from
chapter N" repeats sit 6 or more steps after the original. No diagram label overlaps. Every header names 3.3.4
and the right chapter.

Non-blocking, platform-level, recorded for the orchestrator (not packet-53 content):
- Right after a tab switch back into Learn, the resume banner "You left off at step 2 of 17. Pick up where you left
  off?" showed while the student was already on step 2, including once straight after tapping Next. Counter and
  body were correct. Continue dismissed it.
- The completion screen scores "Written practice 0/8". The deck served four written items (8 + 4 + 12 + 4 marks),
  and 8 matches only the first (worked example). "100% strength" was shown with Recall 11/13 and no written answer.
- In the "Quick Recall — Fill in the Blanks" header the label text ends 2px from the Skip button at 390px (gap
  measured 2px, same line). It is likely to touch at 375px. The Sort label has a 96px gap.
- The back-arrow step button has no accessible name (`aria-label` null).
- The Practice tab's filter row shows empty buckets ("2 Marks 0", "6 Marks 0", "10 Marks 0").

Verdict: PASS. No blocking defect. All 4 check-ins are clean for the quick quiz, and check-in 4's practice slot is
clean after fix round 1. The resume pointer shows no mismatched counter or blank body, and there is no table to be
illegible.
