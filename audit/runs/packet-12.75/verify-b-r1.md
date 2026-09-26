# Packet 12.75 — Verify B, round 1 (after fix round B1, 26 Sep 2026)

Page: `http://localhost:3001/economics/market-failure-model-answers` (economics__market-failure, 1.3.5).
Server: `remediation-dev` restarted by port before anything was looked at. The old next-server (pid 56342,
cwd this worktree, started 10:58:20) was killed after `lsof` on 3001. `preview_start remediation-dev` then
started a new server (pid 60090). The first curl of the served HTML returns 16 `ps-tlabel`, so the SSR output
is current (verify-b served 0). `components/PracticeShell.jsx` was last modified at 10:58:13 and is untracked.
Viewport 390x844, emulated. localStorage, sessionStorage and cookies were cleared, then the page was reloaded.
Input was real pointer clicks. A capture-phase `pointerdown` logger recorded `scrollY` at the moment of every
dock tap, so each pre-tap position below is measured, not assumed. Every pixel figure is at 390px CSS width.
Nothing in the repo was edited apart from this file.

Scope: verify-b's blocking defect was "Next / Next set / ← / card tap change the question but never move the
window at <1024px" (verify-b steps 8, 9 and 11). Those three steps were reproduced exactly: long marked or
shown answer, scroll deep, tap the dock. ← and the card tap were added. Study mode was added because it uses
the same `go()`.

step 1: first screen after clearing. SiteHeader, then the title, Practise | Model answers, "Extract A · 3 questions |
  Standalone · 3 questions", cards 1 Define / 2 Analyse / 3 Evaluate (New), and the stem with the key term in serif
  italic. The dock reads "Question 1 of 3 · Banked 0 / 28 · ← · Show the model answer". scrollWidth is 390. — PASS
step 2: typed a one-sentence answer on Q1 and tapped "Mark my answer". The dock reads "Next: Analyse". Ticked the
  definition criterion, and the dock reads "Banked 1 / 28". — PASS
step 3 (verify-b step 8): scrolled into the marked answer (the examiner's note on screen, the dock stuck at 688px)
  and tapped "Next: Analyse". Before the tap: scrollY 1427.5 (the first attempt was a ref click, whose tool
  scrolls the target into view, so the logged coordinate re-run below is the one that counts). After the tap:
  scrollY 79.5, the question row top at 68px (just under the 60px header), the Q2 stem "Analyse how the AED 0.25
  charge on single-use plastic bags…" at 279px, the Extract A | Your answer tabs and the answer box on screen, and
  the dock at 758px reading "Question 2 of 3 · Banked 1 / 28". The document went from 3,709 to 2,578px. —
  PASS (expected: the next question is on screen)
step 4 (verify-b step 9): on Q2, typed a three-sentence answer, marked it, and ticked 3 criteria (Banked 4 / 28, the same
  state as verify-b). Scrolled to scrollY 2979.5. That is past the shell's bottom edge at 3559, so the dock is
  unstuck at 551px and the page-info block shows below it, which is deeper than verify-b's 1994. Tapped "Next:
  Evaluate" by coordinate. The logger shows pointerdown at scrollY 2979.5 on "Next: Evaluate". After the tap:
  scrollY 79.5, the question row at 68px, the Q3 stem "Evaluate the view that the current 50% excise tax…" at
  310px, and the dock at 758px reading "Question 3 of 3 · Banked 4 / 28 · Show the model answer". The document
  went from 5,106 to 2,635px. — PASS (expected: question 3 is on screen)
step 5: on Q3 with no draft, tapped "Show the model answer". The dock reads "Next: Standalone questions", Banked
  stays 4 / 28, and no "Why this loses marks" panel appears. — PASS
step 6 (verify-b step 11): scrolled through the 20-mark model answer (document 11,075px) to scrollY 9079.5, just past
  the shell's bottom edge at 9528, with the dock at 420px. Tapped "Next: Standalone questions". The logger shows
  pointerdown at scrollY 9079.5. After the tap: scrollY 79.5, "Standalone · 3 questions" selected, the question row
  at 68px, the stem "Explain what is meant by a negative externality and give one example." at 279px, the answer
  box on screen, and the dock at 758px reading "Question 1 of 3 · Banked 0 / 32". — PASS (expected: the new set's
  first question is on screen)
step 7 (← , named in verify-b's defect): in Standalone, Q1 Show the model answer → Next: Examine → Show the model
  answer. Scrolled to scrollY 3079.5 (shell bottom 3568, dock at 459px) and tapped ←. The logger shows pointerdown
  on "←" at scrollY 3079.5. After the tap: scrollY 79.5, the question row at 68px, the Q1 stem at 279px, and the
  dock reading "Question 1 of 3 · Next: Examine". — PASS
step 8 (card tap, and a check that the window is never pulled down): at scrollY 0, tapped card "3 Evaluate". The
  dock reads "Question 3 of 3", the stem "Evaluate the view that government intervention is always nec…" is at
  359px, and scrollY stays 0. The fix moves the window up only. — PASS
step 9: reloaded (resume check). It opened at scrollY 0, Extract A, "Question 1 of 3 · Banked 4 / 28". The cards
  read "1 Define 1/2 · 2 Analyse 3/6 · 3 Evaluate Shown". — PASS
step 10: tapped "Model answers". The cards read "Read" and the dock reads "Question 1 of 3 · ← · Next: Analyse" with
  no Banked figure. The panel shows "What earns the marks 2 marks" and the model answer's own "Marked 2 / 2 · Select
  a sentence…" annotation, which scores the model answer, not the student. Scrolled to scrollY 1300 (dock at
  409px) and tapped "Next: Analyse". Afterwards: scrollY 79.5, the question row at 68px, and the Q2 stem at 279px.
  — PASS
step 11: tapped "Practise". The dock reads "Question 2 of 3 · Banked 4 / 28". The Q2 draft ("…welfare loss
  triangle…") and its 3/6 ticks are still there, and the cards read 1/2 · 3/6 · Shown. Switching modes lost
  nothing. — PASS

## Console errors

no console errors on the loads after the restart. The console logged the restart itself as "WebSocket
connection to ws://localhost:3001/_next/webpack-hmr failed". Every load after it shows only "[HMR] connected"
and the React DevTools info line. That includes the load bracketed by `R1-MARK-before-reload` /
`R1-MARK-after-load` and all the interaction afterwards. verify-b's two errors are gone: "Hydration failed …
ps-tlabel" and the "Encountered a script tag" warning that followed it. The hydration error was the stale-SSR
artefact that verify-b suspected. The restart cleared it, and the served HTML now carries the column labels
(16 `ps-tlabel`). The dev overlay pill now reads "N" with no issue count. It still sits over the dock's
bottom-left corner at 390px (dev only).

## Audit complaints still visible

none

## Notes (non-blocking)

- Control: the pre-fix behaviour is verify-b steps 8, 9 and 11. Those were the same actions on the same page
  before B1, and each ended with the window clamped to the bottom and the question 1,267–1,401px above the
  viewport. This round used the same actions from equal or deeper starting positions. None of the fixer's
  `verify-b1/*.mjs` scripts were used.
- Storage was not isolated for the whole run. Another Browser-pane tab (`tab-2`) is open on the same origin,
  localhost:3001, and keys this page never writes (`revvy_section_state_1_labour-markets`,
  `revvy_learnmode_seen`, …) appeared in localStorage during the run. No `rl:*` key was affected, so no step's
  result depends on it.
- At the start the Browser pane was hidden (`visibilityState: hidden`). It was `visible` at every dock tap
  from step 3 on. In any case the fix runs from a post-commit effect, not rAF (`later()`, PracticeShell.jsx
  :468-480), so a hidden tab would not stall it.
- Only the 390px behaviour was verified. `toQuestion()` returns early when `isDesktop()` is true, and this
  round did not exercise desktop.
