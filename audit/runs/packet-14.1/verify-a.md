# Packet 14.1 — Verify A (26 Sep 2026)

Inputs: working-tree diff of scripts/packet-14-*.mjs and _packet14-*.mjs vs HEAD (66ba20d); dump
audit/snapshots/packet-14-bundle__business__decision-making-techniques.json; `?draft=1` on :3001; PR #63;
origin/main at 540825f.

Draft vs dump: canonical deep-equal (sorted keys) on content (minus quizIndices), notes, diagrams, practice:
identical. Signed-out quiz is dump indices [3,14,18,23,30,0,1,2], flashcards [0,1], extras chain 0 and
evaluation 0; quizIndices re-indexed [0]..[4]. Runner dry run exit 0 (0 BLOCK, 0 DEBT, 0 recoverable,
collision guard clean). `npm run recalls` exit 0.

## Ids

- recheck-01 CONFIRMED — 15 recalls (8 fillin, 5 classify, 2 match, 0 reorder). Read each against its own
  step: every fillin uses figures the step does not carry (recomputed: 55/60/wk 2; 6/0.3/2.3; 24/6/12;
  9.09/12.39/1.48; 128/60/78; C/12/3; 7/2/A–C–D; 9/27/7, all correct); classify and match items are novel
  cases; no answer is copyable. Each prompt names its criterion; every group and pair has a `why`; fill-in
  hints are semantic, 2-3 distractors each, each a real wrong path (165 = sum, 57.5 = four-week mean,
  21.48 = PV total, 70 = outsource EMV, 24 = two-year inflow).
- recheck-02 CONFIRMED — every first paragraph is a scaffold with no figure, mark or answer (P3's gives the
  float method, not a value). origin/main `checklistFrom` on the dump: P0-P4 4 boxes = 4, P5 6 boxes = 6
  (two 3-point chains). P6 Assess 12 and P7 Evaluate 20 carry no "(n marks)". All pairs legal per
  bus_spec.txt:2218-2248. Figures in P6 (39,000) and P7 (NPV 0.299m / 0.477m, payback 3.1 / 2.5, ARR 7%)
  recomputed and correct. Note: P6/P7 describe KAA/evaluation, not explicit Level 1-4 bands.
- recheck-03 CONFIRMED — see check-in lines. Correct/longest distractor, max 1.20 (quiz 12, at the limit),
  then 1.18 (6); positions 8·8·9·7. Every quiz key recomputed or re-read: one defensible answer each.
- recheck-04 CONFIRMED — independent check: 6 emitted SVGs rendered in the browser (DM Sans loaded), text
  getBoundingClientRect vs 0.5u samples of every line/path/polyline/polygon: 0 line-through-text, 0
  text/text, 0 off-canvas. Shape overlaps are intended only (CPA digits inside node circles, bar labels,
  "Forecast" inside its 0.18-opacity band). D3 arrowhead markers (which the guard cannot see) checked by
  hand: ≥5u clear of node digits and activity labels. Tree probability labels now clear their branches by
  ~4.5-5.5u. Every <text> has font-size (min 9u), so main's DiagramEnlarge.jsx:20-31 sizes the sheet. The
  390x844 sheet itself was not walked (Verify B).
- recheck-05 CONFIRMED — every field is read on origin/main (BodyRenderer, NoteSection, *Recall.jsx +
  recall-widgets.js:187 distractors, InlineDiagram scenarios/description/checklist, mistakes-shape
  canonical, ExtrasTab chains/evaluation, NotesTab, FlashcardsTab front/back, InlineQuiz correctIndex,
  InlinePractice guidance split + filter(Boolean)). Nothing required is missing. Spec numbers only
  3.3.3.1a/1b/2c/4b/3.3.3.1; no £. All 20 leaves of bus_spec.txt:1146-1177 taught; sensitivity 0.
- recheck-06 CONFIRMED — PR #63 tile a-e = Quantitative Sales Forecasting, Investment Appraisal, Decision
  Trees, Critical Path Analysis, Contribution (spec order and words); hub meta the same five. Checks:
  Vercel pass, Vercel Preview Comments pass. OPEN, not merged.

## Check-ins (question first on origin/main, LearnModeTab.jsx:816-845)

- CHECKIN Ch1 Sales Forecasting quiz[3]: pre-answer clean · diagram LEAKS (DEBT): view 2 SVG label
  "Positive correlation" states the key "a positive correlation".
- CHECKIN Ch2 Investment Appraisal quiz[14]: clean. The diagram shows payback only, with no NPV,
  discounting or time value.
- CHECKIN Ch3 Decision Trees quiz[18]: clean. The question has its own figures. EMV 159,000 − 75,000 =
  84,000. The nearest tree figure to the key is 100,000. Distractors 21k/130k/159k sit nearer 20k/140k/150k,
  so proximity points away from the key. The diagram's "net gain = EMV − cost" is method, not the key.
- CHECKIN Ch4 Critical Path Analysis quiz[23]: clean. The diagram's "float 2" and the formula are method.
  Options 0, 3 and 4 all appear on the diagram as node values, so proximity does not single out the key.
- CHECKIN Ch5 Contribution quiz[30]: clean. The diagram shows the cold brew per cup and per month, with no
  special order.

Builder's record in specs/packet-14.1.md agrees on all five.

## topFix-04 judgement

This packet regresses C-decision-making-techniques-topFix-04 **in letter**. Its three reorders (forecast
steps, tree roll-back and network completion) are gone, as is the ARR reorder. The item's confirmed evidence
(`_packet14-content.mjs:329-344, 443-457, 78-94`) now points at nothing. The removal was forced: each reorder
was a verbatim copy of the flow printed on the same step (HEAD :79 vs sub 0.1 flow, :192 vs 1.1, :330 vs
2.1, :443 vs 3.1). That is exactly recall.recoverable, so they could not survive recheck-01 without deleting
the teaching flows.

In substance, roll-back (2.1: 128 → 60 → 78) and forward/backward pass/float (3.1: EST 7 → float 2 → path)
are now executed on fresh figures, which cannot be done out of order. The float and EMV fill-ins asked by
topFix-04 are both present. The forecasting sequence (collect → smooth → line → extend) is no longer
exercised as a sequence by any recall.

Not a reason to reject recheck-01. topFix-04's evidence needs re-pointing, or a note from the brain or the
founder, with the forecasting gap recorded.

## Other things noticed (not in the ids)

- notes[2] (Decision Trees) and content sub 0.1 flows use `resultType: 'neutral'`. On origin/main,
  NotesTab.jsx:121 renders anything but 'good' as `bad`, which is red styling on "The best expected return
  after cost…". The Learn-mode FlowChain handles neutral. Carried from packet 14 (HEAD :694).
- Notes items carry `tag: 'exam'`, which nothing on main reads. This is a dead field and harmless (37 uses
  across scripts).
- "break-even" appears twice as a Unit 2 cross-reference (sub 4.0 paragraph and a notes `link` item), with
  its formula. It does not teach break-even, but the spec's "break-even absent" is literally untrue.
- quiz[12] sits at exactly 1.20x, the boundary.
- Recall 4.1: "An $8 price… regular customers pay $12 and will demand the same" gives no variable cost, so
  "on contribution grounds" relies on the displaced-sales argument. It is defensible, but the thinnest item.

Gate: nothing blocking from Verify A. The Ch1 diagram leak is DEBT under question-first.
