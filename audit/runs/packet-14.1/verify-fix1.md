# Packet 14.1 — fix round 1 verify (26 Sep 2026)

Inputs: audit/snapshots/packet-14-bundle__business__decision-making-techniques.json (dump);
`/api/sections/decision-making-techniques?draft=1` on :3001; origin/main 540825f (`lib/practice-checklist.js`
extracted to the scratchpad and run on the dump); audit/raw/ial-bus-levels.json; audit/raw/bus_spec.txt:2212-2248.
Staged draft vs dump: canonical deep-equal on practice, notes, diagrams, content (minus quizIndices): identical.
quiz/flashcards/extras/mistakes differ only by the signed-out preview subset (as in verify-a).
Notes flows: resultType 'good' on all five (Decision Trees included).

## A. practice[3] (CPA Calculate 4) — PASS

Recomputed from the question's own data (P 1→2 3; Q 1→3 4; R 2→3 2; S 2→4 6; T 3→4 3; U 4→5 3):
EST 0, 3, max(4, 5)=5, max(9, 8)=9, 12; LFT 12, 9, 6, min(4, 3)=3, min(0, 2)=0. Both match the stated figures.
Floats: P 0, Q 2, R 1, S 0, T 9−3−5 = 1, U 0. Critical path P–S–U = 3+6+3 = 12 days. The answer is correct.

CPA diagram (every SVG `<text>`, description, checklist): activities A–F, node times 0/2/5/4-6/9/10, "float 2"
twice, "Critical path A–B–D–F = … = 10 days", description "C and E each have two days of float". None of
the practice's answers appears: no float 1, no P–U letters, no 12, no 3+6+3. The only shared tokens are
small integers used as node numbers or durations (1, 3, 5, 6, 9), and none of them is a float or a path
length. The practice is written, not multiple-choice, so proximity cannot pick an answer. The network
is different, with 5 nodes, not 6. Outside practice, the bundle has no "production line", "conveyor"
or P–S–U, so the teaching does not work this case.
First guidance paragraph: method only (formula, which node, check every activity). No figure, mark or answer.
origin/main `checklistFrom`: 4 boxes × 1 = 4 = tariff (P0-P4 4/4, P5 6/6, P6/P7 0 boxes).

## B. ARR fill-in — PASS

Press: $132k − $60k = 72; 72 ÷ 4 = 18; 18 ÷ 60 = 30%. The answers 72 / 18 / 30 are correct.
Token search of the step (body, keyIdea, realExample, misconception, examMatters, flow) finds no 72, 18 or 30.
"18" occurs only inside "$180,000", which is a different figure. The real example still says 12%, and it no
longer matches any blank. At 390x844 on step 6 the page text above QUICK RECALL gives the same result.

## C. practice[6]/[7] level bands — PASS

P6 Assess 12: L1 1–2, L2 3–4, L3 5–8, L4 9–12. This equals WBS13 1(d)/1(e) in ial-bus-levels.json.
P7 Evaluate 20: L1 1–4, L2 5–8, L3 9–14, L4 15–20. This equals WBS13 Q2/Q3.
The descriptors are faithful paraphrases: the L3 Assess "attempt at assessment … not weighing competing
arguments", the L4 "balanced, wide-ranging … supported judgement", and the Evaluate L4 "full awareness of
validity … recommendation". The tariffs are legal per Appendix 6 (Assess 12 [Units 3/4], Evaluate 20).
Neither guidance carries any "(n mark[s])" allocation, and main's checklistFrom returns 0 boxes for both.
The first paragraphs have no figures.

## D. Browser — PASS

Own tab, 390x844, localStorage and sessionStorage cleared, Learn → Just teach me.
- Step 6 ARR: the answers cannot be copied (see B).
- Ch 4 check-in (step 17): only the question shows first. Answered C "3 days" → Correct. The enlarged
  sheet is visible (`lm-diagram-modal-visible`) at the Read stop, with SVG text 15-19px. It shows A–F,
  float 2 ×2 and A–B–D–F = 10 days. The checklist, opened, gives method only. The practice card (guided)
  shows the question and the scaffold paragraph, with the rest collapsed. The diagram does not give the
  practice's answer (T = 1, P–S–U, 12).
  The calculation item on this check-in (Doha payback) is unrelated.
- Ch 5 check-in (step 20): only the question shows first. Answered A → Correct. The enlarged diagram shows
  the cold brew ($6.00 / $2.50 / $3.50 / $70,000 / $45,000 / $25,000). There is no hotel and no
  accept/reject, so it does not give the P6 answer. The P6 card is independent: its mark scheme is
  collapsed (`.lm-practice-answer` height 0), and the level bands render when it is revealed. Its
  "$25,000" profit is a different quantity from the practice's $25 per room-night.
- Observation, not a diagram leak and not in scope: the Ch 5 quiz feedback, shown after answering, states
  "$55 − $30 = $25 a room-night". The P6 practice directly below uses the same hotel figures, so that
  feedback hands the student the knowledge step of the 12-marker. Verify B also recorded this.
- Viewport reset to desktop; tab closed.

Harness notes: in this tab `document.visibilityState` was "hidden", but the modal still had the visible
class, so the 0.92 artefact did not apply. `git fetch origin main` was run once to read main, and
origin/main was unchanged (540825f).
