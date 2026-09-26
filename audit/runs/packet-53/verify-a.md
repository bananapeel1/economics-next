# Packet 53 — Verify A (packet-verifier, read-only)

Section: `influences-business-decisions` (IAL Business 3.3.4). 22 claimed ids; 4 wont-fix left untouched
(topFix-01, specGap-01, specGap-02, specGap-08: all UK-GCE-only asks, 0 hits in `audit/raw/bus_spec.txt`).
`built.md` was not read.

## Method (chosen to differ from the build)

The build writes modules (`scripts/_packet53-*.mjs`) → bundle → `draft`. I did not judge from the modules.

1. Pulled what the server actually serves: `curl localhost:3001/api/sections/influences-business-decisions?draft=1`
   (staged) and without `draft=1` (live). Live is still the old 2-block deck. The packet is staged, not published.
2. The API is the free-tier view (`isPremium:false`): quiz 7 of 22, flashcards 2 of 27, mistakes 0 of 7,
   extras 1+1 of 4+3, and `quizIndices` remapped by `sectionPayload`. So I compared it with
   `audit/snapshots/packet-53-bundle__...json`. content (except the remapped `quizIndices`), notes,
   diagrams and practice are **identical**. Quiz, flashcards, mistakes and extras match item for item
   (quiz by id: API items = bundle quiz[3,7,11,16,0,1,2]). The full banks were then read from the bundle.
3. Ran regex sweeps over every string in draft, bundle and live for the removed defects: `3-5 years`,
   `Carroll`, `short-termis`, `long-termis`, `2x2`, `examiner*`, `pyramid`, `3.4.x`, `animal`,
   `shareholders are internal`. The draft and bundle have 0 hits for every one of them. Live still has
   Carroll 1, short-termism 2, 2x2 1, examiner 3, which is the old deck and the control. Mendelow, Handy,
   Friedman and Freeman each appear exactly once, as an attributed aside.
4. Check-in placement: ran the shipping `lib/checkin-placement.js` + `lib/learn-steps.js` on the served draft.
   17 steps (13 teach + 4 check-ins). The check-ins resolve to diagram 56c7cc6d / 0f4dfd47 / 4f08818e /
   2c03bce8. Their quizzes are bundle quiz 3 / 7 / 11 / 16 (the same items for premium, first unclaimed of
   each pin list, and free, remapped). Their practice items are p2 Discuss / p0 Explain / p3 Assess / p1 Calculate.
5. Then read every block, subsection, recall, quiz item, practice item and guidance, diagram (title,
   description, checklist, view labels, every SVG `<text>`), flashcard, mistake, chain and evaluation by eye.
   I rechecked every figure by hand: 20,000×RM300 = RM6m; 60→54 = 10%; 1.2%×500m = 6m; 12/9 yr ≈ 16 months;
   4.8m/48k = 100; 6m/48k = 125; quiz 17 3/12 = 25%; quiz 18 1.5m/50k = 30; recall 2.4m/40k = 60.

## Check-in answers (CONTENT-GATE, blocking)

- `CHECKIN 1 Corporate Culture clean`: the diagram "Four Types of Company Culture" labels power, role, task and
  person by who decides. The quiz asks what a *strong* culture is (key: "values are widely shared and deeply
  held"). The diagram says nothing about strength.
- `CHECKIN 2 Forming and Changing a Culture clean`: the diagram "How a Culture Forms and Holds" shows a loop of
  founder, hiring/promotion, pay and past success. The quiz is a 40→4,000 staff firm moving from a power
  culture to a role culture. No culture type appears on the diagram.
- `CHECKIN 3 Stakeholder Model Versus Shareholder Model clean`: the diagram shows internal and external
  groups, with shareholders on the boundary. The quiz asks what a supplier wants (key: "regular orders and
  prompt payment"). No objectives appear on the diagram.
- `CHECKIN 4 Business Ethics clean` (quiz): the diagram "Weighing Profit Against Ethics" shows profit bars
  and pay-ratio bars. The quiz asks for the definition of ethics (key: "morally right, not only what is
  legal"). No definition appears on the diagram.
- **CHECKIN 4, practice slot: LEAKS.** The worked-example slot below the same diagram is practice[1],
  "Calculate the ratio of Orvana's chief executive's pay to its median employee's pay, before and after the
  proposed bonus (4 marks)". Diagram view 2, "Pay ratio", prints the two bars "100 to 1" and "125 to 1" with
  the labels "Now" and "With the bonus". The checklist reads "Pay: 100 to 1 now, 125 to 1 with the RM1.2m
  bonus". The pay-and-rewards body works the same division with the same figures
  (`scripts/_packet53-content.mjs:324`). All 4 marks are printed above the question. The CONTENT-GATE rule
  names the quick quiz, but this is the same defect in the next slot down. Recorded as a regression on
  specGap-07, whose 3b build introduced the body figures, the diagram view
  (`scripts/_packet53-diagrams.mjs:199,204`) and the practice (`scripts/_packet53-assessment.mjs:154`).
  Fix: give the Calculate item its own figures, as packet 44 did, or pin practice 4 first in chapter 4.

## Verdicts

| id | verdict | evidence |
|---|---|---|
| topFix-02 | CONFIRMED | `_packet53-content.mjs:199-201` internal/external taught with the Ipoh decision; `:205` examMatters asks for stakeholders identified in context, with no grid and no "examiners reward"; `:281` conflict with the profit objective plus a justified priority. |
| topFix-03 | CONFIRMED | 13/13 subsections carry a recall: 5 classify, 4 match, 3 fillin, 1 reorder. Power/role fillin plus task/person match cover culture type ↔ feature, and the shareholder/stakeholder fillin covers Friedman/Freeman. 4/4 blocks pin a diagram that resolves, including the four-culture typology. The Mendelow matrix and Mendelow recall were deliberately replaced by the on-spec 2a diagram, because the spec names no Mendelow (0 hits). The defect, empty slots, cannot occur. |
| topFix-04 | CONFIRMED | 4 blocks, 13 subsections, 17 steps. Culture (blocks 0-1) is split from stakeholders (block 2). The for/against list now appears once, in CSR body[3], and the ethics subsection is about the trade-off instead. Pay & rewards (`:323`) and the worked judgement (`:169-175`) were added. Animal welfare is wont-fix via specGap-08. |
| topFix-05 | CONFIRMED | "3-5 years" has 0 hits in all 22 quiz items and 27 flashcards. Quiz 9-10 now test spec 1d. Every practice stem is anchored to Source A/Orvana. Carroll and pyramid have 0 hits anywhere. |
| accuracy-01 | CONFIRMED | `:205`: "draw the 2x2 grid" and the uncited "examiners reward" are gone (0 hits for `examiner` in the bundle). Mendelow is one aside (`:201`, "the influence itself is what counts"). |
| accuracy-02 | CONFIRMED | `:199` internal/external in the body; `:200` shareholder classification contested, either accepted with a reason; stakeholder-objectives subsection lists every group. Flashcard 15 matches. The old quiz explanation calling shareholders internal is gone. |
| quiz-01 | CONFIRMED | The old q7/q8 is removed. Every quiz item is answerable from content[]. The replacements (quiz 9, 10) test difficulty of change, which is taught at `:148-151`. |
| practice-01 | CONFIRMED | The short-termism Assess question is gone (0 hits for short-termis in the bundle). The 7 practice items are all spec 3.3.4 and all anchored to Orvana. |
| structure-01 | CONFIRMED | buildSteps on the served draft gives 17 steps, one subsection per teach step, and 4 check-ins. |
| structure-02 | CONFIRMED | Culture and stakeholders are separate blocks. Ethics and CSR no longer duplicate the brand, talent and regulation list. |
| structure-03 | CONFIRMED | 13 recalls across 4 widget types. Every widget type used is read by its renderer (`components/learn-mode/*Recall.jsx`). |
| structure-04 | CONFIRMED | 4 diagrams, each pinned by `diagramId` and each resolved by `checkin-placement` as a pin. |
| structure-05 | CONFIRMED | Every block carries `quizIndices` and `practiceIndices`, and the placement run lands topical items in every chapter. |
| structure-06 | CONFIRMED | `:48` "strong culture is always good" is now the misconception in content[]. The Mendelow-static filler is gone. The CSR misconception is now "CSR is charity", with no overclaim. |
| structure-07 | CONFIRMED | "Can a Culture Be Changed? A Worked Judgement" (`:169-175`) models for, against and a conditional judgement. The examMatters fields give judgement criteria. |
| structure-08 | CONFIRMED | Block 3 takeaway[0], "Ethics often costs profit; size the trade-off before judging it." (`:404`). |
| specGap-03 | CONFIRMED | `:115-120` founder, history, recruitment/promotion/rewards, country/industry, plus a reorder recall and a diagram. |
| specGap-04 | CONFIRMED | `:148-151` loss, proof, systems, time/scale in the body, plus the Orvana case and a classify recall. |
| specGap-05 | CONFIRMED | Same lines as accuracy-02, plus the stakeholder-objectives subsection. |
| specGap-06 | CONFIRMED | `:270` Ipoh closure with figures, a flow and softening options. The Assess and Evaluate practice items are built on it. |
| specGap-07 | **REJECTED** | Pay & rewards is now taught (`:323-335`), but the build added a check-in leak (see above). The Calculate practice pinned under chapter 4's diagram asks for 100:1 and 125:1, which that diagram's "Pay ratio" view and checklist print (`_packet53-diagrams.mjs:199,204`; `_packet53-assessment.mjs:154`). |
| specGap-09 | CONFIRMED | The spec names neither Handy nor Mendelow (0 hits). Content uses each only as an attributed aside: `:64` "the names of the types are what matter, not the writer" and `:201`. |

## Unclaimed but relevant (status not changed)

- **Every extended practice item is answered by the chapter's own teaching.** practice[5] (Evaluate, whether
  the CEO changes the culture, 20 marks) is answered by body `:175`, which states the Level 4 judgement almost
  word for word. practice[4] (palm oil) repeats `:300-302`: RM6m, 10% and 1.2%. practice[6] repeats the
  extras evaluation "Shareholder model or stakeholder model?". practice[0] and [3] are answered by the Orvana
  paragraphs `:151` and `:201`. The running case makes teaching and assessment the same text. No ledger id
  names this. It is weaker than the Calculate leak, because a student still has to write the answer, but it
  cuts the value of the practice set.
- Brief §3: the `practice.opening` split is in place. Every guidance field has a scaffold first line that
  shows no figures and no answer.
- Brief §3: the quiz bank grew from 9 to 22 items. `correctIndex` spread is {0:6, 1:6, 2:5, 3:5}.

## Gate

The gate should not pass. specGap-07 is rejected for a printed-answer leak at check-in 4. The other 21
claimed ids are confirmed against the staged draft. The live row is still the pre-packet deck.

## Re-verification round 1 (26 Sep, packet-verifier; built.md not read)

Only specGap-07 was unverified. The other 21 claimed ids were confirmed in round 0; the fix touched
`_packet53-assessment.mjs`, `_packet53-util.mjs` and the runner only (diffed against
`audit/runs/packet-53/fix1-before/`), and `_packet53-content.mjs` / `_packet53-diagrams.mjs` are unchanged.

**What changed.** The Calculate item (`scripts/_packet53-assessment.mjs:161`) now asks for the ratio of
chief executive pay to the pay of the *lowest-paid factory workers* (RM30,000, added to EXTRACT at
`:147` and to FIRM at `_packet53-util.mjs:118-121`). Scheme: 160 to 1, +40, 200 to 1.

**Method (not the runner's).** The runner's new check assumes "the first pin is the one shown" and matches
figures with its own `surfaces()` helper. I did not use that. Instead:
1. Fetched the served draft (`/api/sections/influences-business-decisions?draft=1` on :3001) and ran the
   shipping `buildSteps` + `placeChapterItems` on it. Check-in 4 (step 16, "Business Ethics") still
   resolves diagram 2c03bce8 plus practice[1], the new Calculate item. `getPracticeMode`
   (`components/LearnModeTab.jsx:335-341`) makes the last practice step `independent`. So `InlinePractice`
   shows the answer box and hides the scheme behind "Reveal mark scheme".
2. Extracted the visible text of every string in the served draft and in the full bundle (premium banks).
   I kept only SVG `<text>/<tspan>` bodies, so coordinates were dropped. Then I searched for 160, 200, 40,
   30,000 and "lowest-paid". Outside practice[1]'s own scheme and the shared EXTRACT, the only hit is
   quiz "40 staff". That is unrelated. The chapter-4 diagram prints only 100 to 1 and 125 to 1 (median),
   plus RM60m/RM54m.
3. A/B. I wrote a probe that uses the shipping placement: for each check-in, take the numbers in the
   shown practice's scheme that its stem does not give, and look for them in the diagram's title,
   description, checklist, view labels and SVG text. Run on the control, `fix1-before/bundle.json`, it
   flags Calculate 4 as [100, 6, 125]. Run on the current bundle and on the served draft, it flags
   Calculate 4 as []. (The "3" hits on blocks 0 and 2 are "Level 3" matching "IAL 3.3.4". They are noise.)
4. Arithmetic by hand: 4.8m/30k = 160; 6.0m/30k = 200; 1.2m/30k = 40. The scheme is right.

Pay & rewards is still taught in content[]: "Pay and Rewards" is block 3, subsection 2, in the served
draft, with a fillin recall. The spec is bus_spec.txt:1210, "b) Pay and rewards". The body shows the method
on the median figures. The student has to apply it to different figures, which is packet 44's model and
not a printed answer.

| id | verdict | evidence |
|---|---|---|
| specGap-07 | CONFIRMED | Taught at `_packet53-content.mjs:323-335`. The check-in 4 Calculate item (`_packet53-assessment.mjs:161`) has its own figures, and they appear nowhere a student sees before the reveal. The shipping placement serves it in independent mode. The A/B probe flags the control and clears the fix. |

Note, not a rejection: the palm-oil Assess 12 (practice[4], chapter 4's second pin) reaches RM6m and RM54m,
which the chapter-4 diagram draws. It is not served at the check-in, because the shipping placement serves
practice[1]. It appears only in the Practice tab, which shows no diagram. The runner's comment says so too.

Gate: every claimed id confirmed; `ledger.mjs unverified 53` reports gate clear; `packet 53 --open` 0 items.
