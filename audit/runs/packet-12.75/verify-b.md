# Packet 12.75 — Verify B (student walkthrough, 26 Sep 2026)

Page: `http://localhost:3001/economics/market-failure-model-answers` (economics__market-failure, 1.3.5).
Server: the already-running `remediation-dev` (pid 17726, cwd this worktree, started 08:46). `preview_start` refused
because another chat owns the port, so it was not restarted. Viewport 390x844, emulated in a fresh Browser-pane tab.
localStorage, sessionStorage and cookies were cleared, then the page was reloaded. Input was real taps (ref clicks)
and real typing. Nothing in the repo was edited apart from this file. No acceptance script came with the task, so
the steps below come from the brief (E040, E045–E048, E052, E053) and the two named regressions.

Every pixel figure is at 390px CSS width.

step 1: first screen. SiteHeader, then the title "Market Failure — Exam Questions & Model Answers", a
  Practise | Model answers switch (Practise on), "Extract A · 3 questions | Standalone · 3 questions", three
  cards (1 Define · New, 2 Analyse · New, 3 Evaluate · New), chips "Extract A, question 1 · 2 marks · AO1 ·
  About 3 min · Uses Extract A", and the stem with "negative externality of consumption" in serif italic,
  underlined. Below: Extract A | Your answer tabs, an empty answer box, and a dock reading "Question 1 of 3 ·
  Banked 0 / 28 · ← · Show the model answer". No mark scheme or model-answer text is visible. The page does not
  scroll sideways (scrollWidth 390). — PASS (shell, key term and dock visible; nothing leaks)
step 2: tapped "Extract A". The extract shows headline, three paragraphs, "Table 1…" and the source line.
  At 390 the table stacks: `thead` is `display:none`, and each product is one 322px block. Each cell is 298px
  wide (computed width 298px) and shows its column heading as a 10.5px uppercase mono label above a 12.5px
  value. No cell is narrower than its text, the table wrapper is 322 wide with scrollWidth 322, and nothing is
  cut. All four rows × four fields can be read. The cost is length: the table is about 1,000px tall, so the
  four PEDs (-0.6, -0.9, -1.4, -0.4) cannot be compared on one screen. — PASS (the table is legible at 390; the
  unmeasured cell-width failure is absent)
step 3: tapped "Your answer" and typed 32 words. The word count updated. "Saved in this browser only, against
  this question. Nothing is sent anywhere." The primary button changed to "Mark my answer". — PASS
step 4: went back to Extract A and tapped the underlined "AED 0.25". The view switched back to Your answer,
  " AED 0.25" was appended at the cursor, the textarea kept focus, and a toast read "Quoted “AED 0.25”". The
  toast sits over the text below the shell for about 2s. — PASS
step 5: tapped "Mark my answer". The tab now reads "Marking". The draft is shown with "Edit your answer",
  "Tick what your answer did 0 / 2", two criteria each with "Show in the model answer", then the model answer,
  the examiner's note and "The mark scheme as written". A toast "Tick each point your answer made" briefly
  covers part of a criterion. The primary button is already "Next: Analyse", so a student can move on without
  ticking. — PASS
step 6: ticked the definition criterion. It shows "1 / 2" and the dock reads "Banked 1 / 28". — PASS
step 7: tapped "Show in the model answer" on the unticked criterion. The page scrolled to the "Show it on the
  extract" sentence. Its underline is dashed, and a note reads "YOU MISSED THIS — HERE IS HOW IT’S EARNED …".
  The earned sentence above has a solid underline. The words, not colour alone, say earned or missed. — PASS
step 8: tapped "Next: Analyse" in the dock at scrollY ≈ 1316. The dock now reads "Question 2 of 3", but the
  screen shows the bottom of the page: the Data response card and the green "Now try one yourself / Practise
  Market Failure" CTA. Neither the question nor the dock is on screen. The shell's bottom edge is at −703px and
  the Q2 heading at −1375px, with scrollY 1734 = document height − viewport (clamped). Waiting 2.5s with the tab
  visible did not change this. The student had to scroll up about 1,500px to find question 2. — FAIL (expected:
  the next question is on screen)
step 9: reproduced it. On Q2 I typed an answer, marked it, and ticked 3 criteria (Banked 4 / 28). I scrolled to
  scrollY 1994 and tapped "Next: Evaluate". The result was scrollY 1791 (clamped to the bottom), the Q3 heading at
  −1401px, and the screen again showing only the CTA. — FAIL (expected: question 3 is on screen)
step 10: on Q3 (Evaluate · 20) with no draft, tapped "Show the model answer". The panel reads "MODEL ANSWER · NOT
  MARKED · Try it yourself instead · What earns the marks 20 marks", followed by the criteria and the full model
  answer. Banked stays 4 / 28. No "Why this loses marks" panel appears on this item, which matches
  midband-census.txt ("SHELL economics 1.3.5 no panel"). — PASS (no false ceiling; E053's panel is absent here)
step 11: tapped "Next: Standalone questions" at scrollY 1637. The dock now reads "Question 1 of 3 · Banked 0 /
  32", but the screen shows the CTA at the bottom of the page again. The shell's bottom edge is at −702px and the
  heading "Explain what is meant by a negative externality…" at −1267px. — FAIL (expected: the new set's first
  question is on screen)
step 12: scrolled to the top of the Standalone set. It has no Extract/Your answer tabs (a single pane), cards
  "1 Explain · 2 Examine · 3 Evaluate", and the key term "negative externality" in serif italic. I tapped card 2
  (Examine · 8, from the top of the page, so the scroll problem did not show) and then "Show the model answer".
  No mid-band panel appeared. — PASS
step 13: tapped "Model answers" and then Extract A. The cards read "Read". The dock reads "Question 1 of 3 · ← ·
  Next: Analyse" with no Banked figure. The panel reads "MODEL ANSWER · What earns the marks 2 marks" with the
  criteria and the model answer, and shows no score. — PASS
step 14: tapped "Practise". Q1 comes back in marking with my draft and "1 / 2", and the dock reads "Banked
  4 / 28". Switching modes lost nothing. — PASS
step 15: reloaded the page (resume check). It opened in Practise, Extract A, "Question 1 of 3". The cards read
  "1 Define 1/2 ✓ · 2 Analyse 3/6 ✓ · 3 Evaluate Shown". Q1's body shows the draft and its ticks, and the dock
  reads "Banked 4 / 28". The page stores no current-question index. localStorage holds only `rl:attempt:v1:<id>`
  records and `rl:practice:v1:<path>` = `{"mode":"practise","textSize":0}`, so the page cannot resume to an
  out-of-range position. The "step 20 of 9" / blank-body failure cannot occur here, and it did not. The
  trade-off is that a returning student always lands on Q1 of the first set, not where they stopped. — PASS
step 16: text fit at 390. Each card is 115px wide (computed 115.33px) and its text sits inside it. No element
  has an active ellipsis, no clipped overflow holds text, and no text leaves the viewport. The smallest text in
  the shell is 10.5px (the stacked-table column labels). At this width the cards show number, command and state
  only; tariff and minutes appear in the chips under the cards. — PASS
step 17: below the shell there is one h1 on the page (the shell title). `#ps-after` contains the subtitle,
  "6 written questions · 60 marks", the time note, the coverage panel ("This page examines 11 of 35
  requirements…"), the Data response link and the "Now try one yourself" CTA, in that order. The breadcrumb
  ("Economics / Model answers") is `display:none` at 390. At phone width the only way out is SiteHeader (logo,
  "Open the app"). — PASS (matches the spec's "SiteHeader is the way out")

## Blocking defect

Below 1024px, "Next: …", "Next: <set> questions", and by the same code a card tap or ←, change the question but
never move the window. `components/PracticeShell.jsx:538-561`: `go()` and `goSet()` only call `scrollPanesTop()`,
which resets `.ps-pane-body.scrollTop`. That covers the desktop panes. The page itself does not scroll on a
phone. `switchTab` (:695-708) does bring the window back to the tabs; `go` and `goSet` do not. The dock is sticky
and is tapped after scrolling through a long marked answer. The next question is shorter, so the document
shrinks and the browser clamps scrollY to the bottom, leaving the student on the CTA below the shell with no
question and no dock on screen. This was reproduced 3 times (steps 8, 9 and 11) with the tab visible, so it is
not a hidden-tab or smooth-scroll artefact. On a phone this is the main "next" action of the packet.

## Console errors

Two errors on every load, repeated on each of the 3 loads:
1. `Encountered a script tag while rendering React component…`. The JSON-LD `<script>` tags in
   SectionModelAnswersPage.jsx (:468, :474) have existed since HEAD. The warning appears when React re-renders
   the tree on the client after (2).
2. `Uncaught Error: Hydration failed because the server rendered text didn't match the client`. The failure is
   in the Extract A table, first `tbody` row, `th` span. The client renders `<span className="ps-tlabel">Product
   category</span>`, while the server rendered `<span>Carbonated soft drinks</span>`. curl of the served HTML
   returns 0 occurrences of `ps-tlabel`. The source (PracticeShell.jsx:168-173, modified 10:14) has it, and the
   dev server started at 08:46. This matches the known stale-RSC dev-server trap: the SSR output is old and the
   client bundle is current. **Probably an artefact, but not proven.** The main session should restart the
   server by port (lsof on 3001, then kill that pid) and re-check that this error is gone. While it persists, the
   served HTML (no-JS and search) has the stacked table without its column labels. What the student saw was the
   client re-render, which is correct.

No other console errors. The Next dev-overlay pill ("N 2 Issues") covers the dock's ← button at 390. The pill
exists only in dev.

## Audit complaints still visible

- None of the audit's original complaints (a gate, a long run before the first Next, no defensible answer, a text
  box with no button, a recall shown twice, unreadable diagram labels, a wrong-section header) appears on this
  page.
- The Next button strands the student below the shell at phone width (blocking defect above). It is closest to
  "a step that runs to many screens before the first Next button": after each Next, the student must scroll
  about 1,300–1,500px back up to find the question.
