# Packet 48 — verify, question-first check-ins (26 Sep 2026)

Independent, read-only. Section `government-intervention-firms` (IAL Economics 3.3.5), staged `draft`, not
published. Branch `remediation/2026-09`, HEAD `ef2d0b3` (the #43/#44 merge). Rule applied:
`audit/CONTENT-GATE.md` "The check-in answer rule — UPDATED 26 September 2026 … question first", points 2, 3
and 5, plus the "Update, 26 Sep (later)" paragraphs in `.claude/agents/packet-verifier.md:59` and
`.claude/agents/student-walkthrough.md:52`. Stating the key before answering BLOCKS; a diagram or takeaway
stating it is DEBT; guessability is deferred (point 5) and recorded only as a note.

Nothing in the repo was changed except this file. The :3001 server was not restarted. Scratch evidence
(outside the repo): the signed-out curl payload, the resolver script and its output, in this session's
scratchpad.

## 1. What a check-in shows before the student answers (HEAD code)

`components/LearnModeTab.jsx`, `step.type === 'checkin'` branch:

| Visible BEFORE answer/skip | Where |
|---|---|
| Eyebrow "Chapter N of 6 · <chapter title>" | :806-810 |
| Heading "Chapter check-in" | :811 |
| Intro sentence, which names only the kinds of item (quiz/diagram/calculation/recall), never their content | :818, built at :643-660 |
| Quick quiz card: label "Quick quiz", the stem, and all options | :822-826 → `components/learn-mode/InlineQuiz.jsx:82`, `:84`, `:87-101` |
| "Answer the question first. The diagram and the rest of this check-in will appear below." + "Skip the question" | :827-833 |
| Outside the step body: progress %, chapter dots (all chapter titles, as `title`/`aria-label`, so on hover only), step counter, Report-a-problem, ⋯ menu, nav bar | :721-776, :908-922 |

Held back until `revealCheckin` runs from the quiz's `onResult` (:825) or from Skip (:830): the diagram
(:836), calculation (:837-841), practice (:842), spaced recall (:845-855), explain-it-back (:857-862) and
takeaway (:863). The quiz explanation shows only after answering (`InlineQuiz.jsx:102-107`), and the Report
target carries `{ revealed: false }` before answering (`:135-142`). The revealed set resets per section (:106-107).

Pre-test: when taken it replaces the whole view (`LearnModeTab.jsx:574-581`) and shows all its stems and
options at once, with no marking during or after (`PreTest.jsx:103-132`, `:116-118`, `:162-181`). Its offer
(:704-718) sits above the step-1 body.

## 2. Which item each check-in serves

- Signed out: `curl ?draft=1` returned HTTP 200, `isPremium:false`, 9 quiz items (= bank 3, 7, 11, 15,
  19, 23, 0, 1, 2), with `quizIndices` remapped to `[0]…[5]` by `freeQuizPayload` (`lib/preview-limits.js:64-126`).
- Pro: `sectionPayload(bundle, {isPremium:true})` (`lib/preview-limits.js:257-277`) on
  `audit/snapshots/packet-48-bundle__…json`, with authored pins `[3-6]`, `[7-10]`, … `[23-26]`. The bundle
  run through the free path reproduces the curl payload exactly (content, quiz, diagrams, practice, with key
  order normalised), so it stands in for the draft row. I did not fetch a Pro response from the server.
- Resolved with the app's own `buildSteps` (`lib/learn-steps.js:44-82`), `placeChapterItems`
  (`lib/checkin-placement.js:39-53`, pinned path), `resolvePinnedItem` (`components/learn-mode/utils.js:100-117`),
  `pickPretestQuestions` (`lib/pretest-pool.js:36-42`) and `shuffleAllOptions` (as `StudyApp.jsx:469`).
  **Signed out and Pro resolve to the same six check-in items and the same three pre-test items.**

## 3. On screen (390x844, `?draft=1`, own tab, real key/taps)

The :3001 server serves question-first. At steps 7, 13, 19, 24, 29 and 34, `.lm-checkin-held` was present,
the step body held 0 SVG `<text>` nodes (its one SVG is the 16px report icon) and 0 diagram or takeaway
elements, and the body text matched §2 option for option. "Skip the question" at step 34 revealed the
diagram (12 SVG texts) and the takeaway. The pre-test screen matched §2's three items. I removed the three
`revvy_*_government-intervention-firms` localStorage keys my walk created and closed the tab.
`last-visited-section` was left as it was.

## 4. Verdicts

CHECKIN 1 Controlling Monopolies and Mergers Q3 (step 7): pre-answer — clean. The stem is about rate-of-return regulation and the key is "invest in more capital than it needs". No eyebrow, intro, stem or option states it.
  DEBT: diagram clean (price caps at AC and MC only). Takeaway **states**: "Price caps reward cost cutting; profit caps reward spending." (profit cap = rate-of-return, as taught at step 3).

CHECKIN 2 Promoting Competition and Contestability Q7 (step 13): pre-answer — clean. The key is "lower the cost of the service to the city". Note for the deferred pass: only the key echoes the stem's "city", and C ("without bidding") is the negation of tendering.
  DEBT: diagram clean (privatisation vs rivals, no tendering). Takeaway clean, borderline: it says "Tendering creates competition…" and "More rivals … push prices down" but never says tendering lowers cost.

CHECKIN 3 Protecting Suppliers and Employees Q11 (step 19): pre-answer — clean. The key is "keep a failing strategic firm and its jobs going". Note for the deferred pass: the eyebrow title "…and Employees" cues the only jobs option but does not state what nationalisation is for.
  DEBT: diagram clean (barring foreign suppliers). Takeaway **states**: "Nationalisation saves jobs and serves social aims, at a risk to costs."

CHECKIN 4 The Impact and Limits of Intervention Q15 (step 24): pre-answer — clean. The key is "acts in the interests of the firms it regulates". The word "capture" is the cue, and that is guessability, not stating.
  DEBT: diagram clean (information gap, AC₂, benchmarking). Takeaway clean ("Capture and information gaps weaken what a regulator decides." gives no definition).

CHECKIN 5 Wage Controls in Labour Markets Q19 (step 29): pre-answer — clean. The key is "inelastic".
  DEBT: diagram clean (no elasticity in any view). Takeaway clean.

CHECKIN 6 Taxes, Mobility and Fair Treatment Q23 (step 34): pre-answer — clean. The key is "a grant towards the cost of moving for a job".
  DEBT: diagram clean (tax, retraining, discrimination). Takeaway clean, borderline: "Mobility measures target the barrier: cost, housing, skills." names cost, but skills also matches distractor B. The spaced recall revealed after answering lists "help with the cost of moving". That is post-answer and outside rule 3's diagram/takeaway, so it is noted only.

PRETEST Q0 "A natural monopoly is usually regulated rather than broken up because:": clean on the pre-test screen. **But** the offer screen shows the step-1 body below the offer, at y≈1017 (below the 844 fold). That body states the key almost word for word: "Natural monopolies: one network … supplies the market at the lowest average cost, so the state regulates the single supplier rather than breaking it up." It leaves the screen once "Test yourself first" is tapped. The check-in rule does not cover the pre-test. This is recorded for the caller, not graded BLOCKING here.
PRETEST Q1 "Under a CPI − X price cap … increases its profit if it:": clean. The key "cuts its costs by more than X" echoes "X", and B echoes CPI as "inflation". Its distractor C, "adds capital it does not need", is check-in 1's key in other words, shown unmarked.
PRETEST Q2 "A competition authority is most likely to block a merger that would:": clean. Note: only the key, "substantially lessen competition…", echoes "competition".

## 5. Result

**BLOCKING: no.** 0 of 6 check-ins state the key before the student answers, either signed out or Pro.
DEBT for the rewrite pass: 2 takeaways state the key (CH1, CH3) and 2 are borderline (CH2, CH6). 0 of 6
diagrams state the key, which agrees with Verify B's diagram-first reading.

Not verified: a Pro response from the server (Pro was derived from the bundle through the route's own
function). Whether the 18 Pro-only bank items still match the DB draft (only the 9 served items were compared).
Behaviour on production.
