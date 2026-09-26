# Verify B (fix round): packet 44, printed quiz keys (`economics__aggregate-supply`)

This is a targeted re-walk after the fix round of 26 Sep 2026. The founder's decision was "yes do that": fix the two check-in quiz items whose answers are printed above them. I edited no content and no code, and published nothing. My only writes are to this directory.

**Setup.** Server `remediation-dev` on port 3001, reused (`preview_start` reported `reused: true`). Viewport **390x844**. I cleared localStorage, sessionStorage and cookies before the first load, and was signed out. Route: `/economics/unit-2/aggregate-supply?draft=1`. I moved between steps with real taps on `Next →` and real ArrowLeft/ArrowRight key presses. The Back button is covered by the Next.js dev badge at (36,812), so I used the arrow keys for Back. The quiz keys were tapped for real. The diagram view chips were clicked by script, for measurement only. Every pixel figure below is CSS px at 390px width.

**What the fix round changed** (`built.md` §"Fix round (post founder decision)"): quiz[8] is now 40% × 10% = 4%, quiz[14] is now 25m × $30,000 = $750bn and quiz[26] is now 60m × 75% = 45m. The diagram surfaces were left alone and still carry the spine (40m × $20,000 = $800bn; 50m × 80% = 40m).

## The walk

- step 1: `Start learning →` → `Just teach me` → STEP 1 OF 23 · CHAPTER 1 OF 5 "The Characteristics of AS" · part 1 of 3 "What Aggregate Supply Is". **PASS**: same entry as `verify-b.md` steps 1–3.
- step 2: STEP 14 OF 23 · CHAPTER 3 OF 5 "The Shapes of Long-Run AS" · Chapter check-in. The QUICK QUIZ reads "An economy has 25 million workers, each producing $30,000 a year. Its productive capacity, per year, is:", with options A $30bn · B $750bn · C $7,500bn · D $75bn. Neither "$750bn" nor "750" appears anywhere above the quiz, in any of the 3 diagram views. The caption still reads "Capacity $800bn: 40 million × $20,000." and the checklist still reads "A vertical classical LRAS at capacity, $800bn", but neither is now an answer. A real tap on B gave "Correct! … 25 million × $30,000 = $750,000 million, which is $750bn." **PASS**: the answer cannot be read off the screen before the student answers.
- step 3: STEP 14 bounding boxes (390px): diagram card 405–1235, caption `p.diagram-description` 499–582, checklist 962–1214, quiz card 1259–1660 (24px gap below the diagram), options at 1404/1463/1522/1581 (each 51px tall, 8px apart). Diagram∩quiz: **false**. Caption or checklist∩quiz: **none**. Option∩option: **none**. 10 SVG `<text>` labels, 0 pairwise overlaps. Smallest inline label 9.39px (computed font-size × 313/400), which is the V037 ruled state as in `verify-b.md`. Document scrollWidth 390. **PASS**: nothing overlaps.
- step 4: STEP 23 OF 23 · CHAPTER 5 OF 5 "Long-Run AS: Regulation, Population and Competition" · Chapter check-in. The QUICK QUIZ reads "A country has a working-age population of 60 million; 75% of them participate. What is its labour force?", with options A 45 million · B 15 million · C 60 million · D 75 million. Neither "45 million" nor "45" appears above the quiz, in any of the 3 views. The checklist still reads "50 million × 80% = 40 million". That is the rule worked on other figures, and it is not the key. A real tap on A gave "Correct! … 60 million × 75% = 45 million." The footer reads `← Back` · `Complete topic ✓`. **PASS**.
- step 5: STEP 23 bounding boxes (390px): diagram card 428–1190, caption 522–606, checklist 985–1168, quiz card 1214–1640 (24px gap), options at 1385/1444/1503/1562. Diagram∩quiz: **false**. Text blocks∩quiz: **none**. Option overlaps: **none**. 9 SVG labels, 0 overlaps. Smallest inline label 9.39px. scrollWidth 390. **PASS**.
- step 6: STEP 9 (the third leak, found by the fix round's script). The quiz reads "Energy accounts for 40% of firms' costs and the price of energy rises by 10%…" with options 40% · 50% · 4% · 10%. "4%" and "50%" are not on any of the 4 views. The "A tax rise" view still says "Tax adds 2% …", and 2% is no longer a choice. **PASS**.
- step 7: STEP 4 and STEP 18 check-ins: the figure, numeral and verbatim passes find no match. **PASS**, with one SOFT finding at step 18 (see below).
- step 8: Screenshot, one only, taken at STEP 14 after answering. It shows the tail of the checklist, then QUICK QUIZ with B $750bn marked and the explanation. Nothing is clipped and nothing overlaps.

## The same leak on the other check-ins, checked by a script and not by eye

**Method, independent of `leak-probe.mjs`.** The fix round's probe reads the diagrams **table** of a bundle JSON. My check reads the **rendered DOM** instead. For each of the 5 check-ins, it takes every text node that precedes `.lm-quiz-card` in `.lm-step-body`, unioned over every diagram view, and saves them to `verify-b-fix-surfaces.json`. `verify-b-fix-dom-leak.mjs` shares no code with the probe. It uses its own figure parser. It tests **every option** of every pinned item, not just the key, for four things: a unit-bearing figure, a standalone numeral of 13 or more (an axis tick), the full option text, or a run of 3 or more of the option's words.

| run | input | result |
|---|---|---|
| A (control) | live `/api/sections/aggregate-supply`, which is the pre-fix packet the founder published at 05:45 | **3 HARD, exit 1**: "2%" on "Tax adds 2%…", "$800bn" on "Capacity $800bn: 40 million × $20,000." (plus axis tick 800), "40 million" on the checklist |
| B | draft `/api/sections/aggregate-supply?draft=1`, the 5 items a signed-out student sees | **0 HARD, exit 0**, 1 SOFT |
| C | `audit/snapshots/packet-44-bundle__economics__aggregate-supply.json`, all 29 pinned items | **0 HARD, exit 0**, 3 SOFT, 5 NOTE (distractor wording only) |

The control catches exactly the published leaks, and the fix clears them. This agrees with `fix-round-leak-probe-after.log` (0 HARD) by a different route.

**Which item a check-in shows.** `components/learn-mode/utils.js:100-117` (`resolvePinnedItem`) takes the first unused pin. So every student, Pro or not, sees quiz[3], [8], [14], [21] and [26] at the five check-ins. The other pinned items appear only in the Quiz tab, with no diagram above them.

**The SOFT findings (judgement, not fixed here):**
1. **quiz[21], shown at step 18, for every student.** "Productivity is best defined as:" has the key "output per worker or per hour worked". The diagram directly above is titled **"LRAS Shifts: Output per Worker"**. Its caption says "technology, productivity and … each raise output per worker", and the checklist says "Capacity = labour force × output per worker". None of the three distractors ("the total output of the economy", "the number of people in work", "the profit earned per worker") matches any of that wording. A student can pick the key by matching words rather than by knowing the definition. This is not the printed-figure class the founder ruled on: no figure is involved and the definition is not stated. It was on screen when `verify-b.md` passed step 16. It is identical in the live section. If a fix is wanted, the smallest one is to reword the key (for example "the amount produced by each worker or in each hour") and keep the pins. That change belongs at the runner, like this round's.
2. quiz[25] ("more machinery per worker", which the checklist states). It never renders under a diagram (see above), so it is not a check-in leak.
3. quiz[4] matched on the stop-word run "in the price". This is noise.

## Nothing else changed

- **Step count and chapter headers.** Walked: 23 steps. Ch 1 (steps 1–4) "The Characteristics of AS"; ch 2 (5–9) "What Shifts Short-Run AS"; ch 3 (10–14) "The Shapes of Long-Run AS"; ch 4 (15–18) "Long-Run AS: Technology, Productivity and Skills"; ch 5 (19–23) "Long-Run AS: Regulation, Population and Competition". Check-ins fall at 4, 9, 14, 18 and 23. Every part title matches `verify-b.md` steps 3–17. `verify-b.md` shortened two of them: step 10 is "What the Long-Run AS Curve Shows" and step 11 is "The Classical LRAS: Vertical at Capacity". I also derived the steps independently from the served draft `content` and got 23, in the same order.
- **Payload diff, draft against live.** Live is the pre-fix packet, so this diff shows exactly what the fix round changed. Only `quiz` differs, at served items 1, 2 and 4 (bundle 8, 14 and 26), and correctIndex is unchanged. `content`, `notes`, `diagrams`, `practice`, `flashcards`, `extras`, `mistakes` and `counts` are **identical**. The diagram views per check-in are unchanged (3/4/3/3/3, 16 in total).

## Console errors

- `401 (Unauthorized)` on `POST /api/learn-mode/state` while signed out. This is platform behaviour, as in `verify-b.md`.
- The `[diagrams] pin … matched no diagram` warnings that `verify-b.md` recorded on the live page are gone, because live now carries the packet. There were no uncaught exceptions and no React errors. `[Fast Refresh]` lines show another session editing the worktree.

## Audit complaints still visible

None were introduced by this fix. The three platform FAILs in `verify-b.md` (self-mark checklist, the resume banner after an auto-restart, the post-reload score) are outside this packet's scope and were not re-tested.

Minor: the step-14 explanation says "The other figures come from dropping or adding a factor of ten". That fits $75bn and $7,500bn, but $30bn comes from dropping the 25 million, not from a factor of ten. The live item has the same line for its $20bn distractor, so this is inherited, not new.

## For the Books phase

- **Live still carries the leak.** Control run A proves it: 3 HARD on the served live payload. The founder has to re-publish aggregate-supply to ship this fix.
- PROGRESS row 44 must record the founder's 05:45 UTC publish on 26 Sep. The pre-publish backup of the section as it stood before that publish is `audit/snapshots/auto-prepublish-2026-09-26T05-45-10-050Z__economics__aggregate-supply.json`.

## Verdict

**PASS.** The two leaks the founder ruled on (steps 14 and 23), and the third one the fix round found (step 9), are gone from the rendered draft. The DOM-side check covers all 29 pinned items with 0 HARD, and an A/B control proves it catches the live leak. Nothing overlaps at 390px. The 23 steps and 5 chapter headers are unchanged, and only `quiz` differs. One SOFT item remains for a judgement call: step 18's definition quiz, whose key wording is the diagram's title.
