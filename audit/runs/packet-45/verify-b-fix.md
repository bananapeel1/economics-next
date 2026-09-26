# Verify B, fix round: check-in answers (packet 45, `economics__labour-markets`, 26 September 2026)

This walk applies the CONTENT-GATE rule "The check-in answer rule — BLOCKING, 26 September 2026". I did not write
the fix and I edited no content. Server: `remediation-dev` on :3001. It belongs to another chat, so I reused it
(`preview_start` refused to start a second copy). Route: `/economics/unit-3/labour-markets?draft=1`, signed out, at a
390x844 viewport (`innerWidth` 390 at every check-in). Every pixel figure below is CSS px at 390px width.

**Limitation.** The Browser pane was never on screen. `get_layout` returned no windows, and every `screenshot` and
real `left_click` timed out with "the Browser pane is not displayed, so the page is not compositing frames". So:
(a) **I have no screenshot**. (b) I moved between steps and views with scripted `element.click()`, not real taps.
(c) I read on-screen text and measured boxes from the live DOM with `javascript_tool`. Layout is computed without
compositing, so the boxes are real. No overlay was opened, so the "animates in" caveat does not apply. The main
session should take the one screenshot this walk owes.

## (1) From the served `?draft=1` payload, by a method other than the fixer's

I captured the payload with curl (`verifyb-fix-served-draft.json`). `verifyb-fix-read.mjs` resolves each block with
the app's `resolvePinnedDiagram` / `resolvePinnedItem`. It calls them per block and does not use `placeChapterItems`.
It prints every string in the diagram object, found by a recursive walk, including all SVG `<text>`. Output is in
`verifyb-fix-read.log`. There are 5 check-ins, and each one has both a diagram and a quiz:

- step 6 (ch1, diagram 0cb19ee8, quiz 9ad88246, key "shift to the left"): **clean**. The diagram draws only a
  *rise*: "Price or productivity rises: a shift", MRP → MRP₁, "Shirt price $3 → $4: 6 → 7 at $12". No text on it
  names a fall or a leftward shift. Its checklist line "a price or productivity change as a new curve" tells the
  student this is a shift, but not which way. The direction comes from derived demand, taught at step 1: "The link
  runs both ways".
- step 12 (ch2, b00dccd9, quiz 7929c937, key "shift to the right"): **clean**. No diagram surface mentions a
  retirement age. The diagram shows both directions (net migration moves supply right; a licence, tax or benefits
  move it left), so the student has to classify the new case. It is taught at step 10: "A later retirement age keeps
  experienced workers in".
- step 18 (ch3, 8898e521, quiz 266cfd23, key "workers without a post offer to work for less"): **clean**. This is the
  closest call. "Below it, a shortage; above it, a surplus." gives the premise, that there is a surplus. It does not
  say how the wage moves. No diagram text says the wage is bid down or that anyone offers to work for less.
  "Next step of reasoning" is the rule's own allowed move. It is taught at step 13: "the wage is bid down". A second
  human reader may still want to weigh this one.
- step 22 (ch4, 8da82be6, quiz 3c03bafa, key "output per worker rose with the deal"): **clean**. The diagram shows
  only the jobs-lost outcome ("A surplus of 18,000; 6,000 fewer jobs.") and restricted entry ("$15, 30,000"). Neither
  productivity nor output per worker appears on it. It is taught at step 20: "a deal that raises productivity… can
  offset it".
- step 26 (ch5, 98be411e, quiz 66a69dd2, key "homes near the vacant jobs cost far more"): **clean**. The diagram says
  workers "cannot move South" and "The gap persists because workers cannot move", but never why. Housing appears
  nowhere on it. It is taught at step 23: "Housing costs: homes in the growing region cost far more".

Served live and served draft were compared field by field (`verifyb-fix-live-vs-draft.log`). content, notes,
diagrams, practice, flashcards, extras, mistakes and counts are **identical**. Only `quiz` differs: served slots 0–4
have new ids, and slots 5–7 are byte-identical. The pins are identical: `diagramId` ×5, `quizIndices` [0]..[4]. The
served keys are unchanged per slot (draft 0,0,2,0,3 = live 0,0,2,0,3).

## (2) On screen, 390x844, `?draft=1`

I walked from step 1 by `Next →` after "Just teach me". At each check-in I clicked every view chip and read the SVG
text of the active view, the title, the description, the checklist and the quiz. **The checklist is not collapsed
here.** In the Learn check-in, `.diagram-checklist` has no toggle, and all its `li` have height > 0 and
`visibility: visible`. On-screen text matches the payload read in (1) word for word. Options are shuffled for
display.

- step 6: check-in answer — **clean**. On screen: C "shift to the left". Tapping it shows "Correct!".
- step 12: check-in answer — **clean**. On screen: C "shift to the right". Tapping it shows "Correct!".
- step 18: check-in answer — **clean**. On screen: B "workers without a post offer to work for less". Tapping it
  shows "Correct!".
- step 22: check-in answer — **clean**. On screen: D "output per worker rose with the deal". Tapping it shows
  "Correct!".
- step 26: check-in answer — **clean**. On screen: D "homes near the vacant jobs cost far more". Tapping it shows
  "Correct!". The footer shows `Complete topic ✓`.

**Bounding boxes (390px):**
- **Question and options.** At all 5 check-ins the question and the four option buttons do not overlap. They are
  301px wide at x42, and the options are 51px tall with an 8px gap. The diagram card and the quiz card do not
  overlap.
- **SVG labels, all 15 views.** One pair of text boxes intersects, at step 6, view "A higher wage": the tick labels
  "$12" and "$15" (y 843.1 and 831.3, box height 12.5) overlap by **0.7px** vertically. That is line-box padding, not
  ink. The diagram is byte-identical to live and outside this fix. Everything else: 0 overlaps.

## (3) Rewritten items: key and figures

- **Q 9ad88246.** Product demand falls, so labour demand shifts left. It is the one correct option: "move down along"
  needs a wage change, and the other two are wrong. It has no figures.
- **Q 7929c937.** A later retirement age shifts supply right. It is the one correct option: "move up along" needs a
  wage change. Its only figure, "two years", appears on no diagram and is consistent with the section.
- **Q 266cfd23.** The surplus bids the wage down. It is the one correct option. "Firms compete… more pay" is the
  shortage case. The two curve-shift options are not caused by the disequilibrium, and a leftward supply shift would
  raise the wage. It has no figures.
- **Q 3c03bafa.** A productivity rise shifts demand right and holds employment. It is the one correct option.
  Longer apprenticeships restrict entry, which the diagram shows still gives 30,000 < 36,000. More applicants only
  widen the surplus, and falling product demand costs jobs. It has no figures.
- **Q 66a69dd2.** Housing costs are the barrier. It is the one correct option. A higher wage is a reason to move,
  and the other two explain why the jobless and the vacancies exist, not the immobility. It has no figures.
- **Source.** `git diff HEAD -- scripts/_packet45-assessment.mjs` changes only these 5 `qi(...)` calls and their
  comments.

## Unchanged steps

- **Steps: 26**, both served and on screen (`STEP n OF 26`).
- **Chapter headers.** On screen they are "CHAPTER 1 OF 5 · The Demand for Labour", "2 · The Supply of Labour",
  "3 · Wage Determination in a Competitive Market", "4 · Trade Unions and Public-Sector Pay" and "5 · Market Failure
  in the Labour Market". This is identical to `verify-b.md`.
- **Check-in positions.** They are at steps 6/12/18/22/26.

## Console errors, and complaints still visible

**Console errors:** HMR websocket failures and `ERR_CONNECTION_REFUSED` (another chat's server restarts), plus
`POST /api/learn-mode/state` → 401 (signed out, expected). No application errors.

**Audit complaints still visible:** none from this fix's scope.

## Verdict

**PASS.** 5 of 5 check-ins read **clean**, both from the payload and on screen, and every key is the one correct
option. **Owed:** one screenshot, because the pane was not displayed.
