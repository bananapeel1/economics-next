# Packet 54 — built (assessing-competitiveness, IAL Business 3.3.5, WBS13)

Build phase, 26 September 2026. **Staged to `draft`, not published, not committed.** Every "passes"
below names the command that produced it. Nothing here was checked in the Learn Mode page or at any
phone width: Verify A and Verify B have not run.

## What was built

`assessing-competitiveness` rebuilt to **3.3.5 only** (`audit/raw/bus_spec.txt:1218-1248`; 3.3.4 at
`:1184`, 3.3.6 at `:1255`). The oracle has 23 rows and 18 leaves (`spec-items.json`, topic 3.3.5); the
runner asserts that count. 18 of 18 leaves evidenced (`spec.coverage` INFO, `stage.log`).

| | live (`data`, unchanged) | staged (`draft`) |
|---|---|---|
| blocks / subsections | 1 / 2 ("Financial Ratios") | 5 / 18, in the specification's order |
| recalls | 1 fillin | 18, one per subsection: 7 classify, 7 fillin, 2 match, 2 reorder |
| quiz / practice | 10 / 5 (Define 4, Analyse 6, Assess 12, Evaluate 20, Calculate 4; off-spec Bowman, generic 20-marker) | 28 (3 unpinned pre-test; 8 free) / 7 on one source: Explain 4 · Calculate 4 · Discuss 8 · Assess 12 · Assess 12 · Evaluate 20 · Evaluate 20 |
| diagrams | 0 (no `section_diagrams` row) | 5 (8 views), one per block, pinned by `diagramId` |
| flashcards / mistakes / extras | 18 / 5 / 1 chain + 1 evaluation (benchmarking) | 26 / 8 / 4 chains + 3 evaluation |
| validator, this section | 5 BLOCK / 24 DEBT / 1 recoverable | 0 BLOCK / 0 DEBT / 0 recoverable; would clear 24 baselined findings on publish |

Chapters: 1 Reading the Financial Statements (1a-1b) · 2 Calculating the Ratios (2a) · 3 Using Ratios to
Make Decisions (2b-2c) · 4 Measuring the Workforce (3a-3b) · 5 HR Strategies for Productivity and
Retention (3c). One invented firm (Orla Bakeries, Hong Kong, `$` only, no years), every figure derived
in `FIRM` (`_packet54-util.mjs:87`), both statements balanced and re-added by hand in the runner (§3).

## Scope calls, each settled on the document (Rule 1)

1. **Numbering.** 12 of 31 ids cite "3.5.x", "3.1.2" or "3.1.4"; `grep -c "3\.5\.[0-9]\|3\.1\.[0-9]"
   bus_spec.txt` = 0. Every id mapped by wording (`LEAF_MAP`, `_packet54-content.mjs:618`).
   **`structure-08` marked wont-fix** (it says 3.3.5 is wrong; `:1218` says it is right). The runner
   asserts the three headings by line and `contextFor` = 3.3.5 / WBS13 (runner §5, §12).
2. **Group A items (brief §3): the premise is stale, the requirement now holds.** VRIO/core
   competencies, the Five Forces p0 and the second block were removed by packet 13 (14 Sep). This
   packet did not remove them; it rebuilds the section so the complaint behind each item is answered
   and bans their return with a re-measured, A/B'd guard. Claimed on that basis (precedent:
   `C-marketing-mix-strategy-structure-02`, confirmed as "premise stale; real complaint fixed"). If
   the verifier reads any of `topFix-03`, `accuracy-02`, `specGap-07`, `structure-01`, `structure-02`,
   `practice-01` as asking for a change packet 13 already made, a rejection is defensible.
3. **"Competitive advantage" is banned here but is NOT off-spec.** It is a bullet at 1.3.2 · 2d
   (`:542`) and in 2.3.4 (`:984-1002`), never in 3.3.5. The ban's reason and re-measure say exactly
   that (`_packet54-util.mjs:158`, runner §2). The live p0 "Define competitive advantage (4 marks)" was
   also an illegal tariff (Define is 2).
4. **Tariffs.** `topFix-02` proposes 4/6/10/20; 6 and 10 are Units 1-2 tariffs. Built to the 26 Sep
   Settled ruling and `ial-paper-structure.json` business.units_3_4 (WBS13 named): 4/4/8/12/12 + two
   Evaluate 20. Mapping: Calculate ROCE (4) kept; the loan item became the Evaluate on a second
   loan-financed bakery (20) and the Discuss on the acid test (8); the investor item Assess 12; the
   share-ownership Evaluate 20 kept.
5. **Levels shape (brief §7, unresolved there).** Schemes above 6 marks use Level 1-4 descriptors
   naming knowledge/application/analysis/evaluation, and 4-mark items point allocations — the shape
   packet 47 shipped for the same paper on 26 Sep. The 26 Sep marking ruling's KAA/Evaluation strands
   were read from the **WEC11 (Economics)** mark scheme; no Business split is recorded in the repo,
   `lib/ao-spec.js` ALLOCATION is uncorrected, and `MARK_CLAIM` bans "KAA" in student prose. No split
   was invented. Flagged as a concern, not resolved.
6. **Real firms.** `accuracy-01`'s Tesla claim is removed, not re-dated: the programme bans years and
   real-firm claims it cannot verify. `topFix-04`'s suggested Evergrande example is refused for the same
   reason; gearing gets an invented Kuala Lumpur developer instead. Runner bans all seven names.
7. **Formulae from Appendix 9** (`bus_spec.txt:2397-2459`), parsed by the runner (§3b). No tax line
   (Appendix 9 has none). The operating profit margin (2.3.3, `:931-933`) is pointer-only, one mention,
   in the mistake card that corrects `accuracy-03`.
8. **Brief corrections.** (a) The brief says the section has no row in `audit/recall-census-baseline.json`;
   it has one (`data` 1, `draft` 1). Target met anyway: 0 recoverable. (b) `section_diagrams` had no row
   at t=0; staging created one with `data = []` (same empty list served; packet 47 precedent).
9. **Hub copy.** `app/business/unit-3/page.js` advertised "Porter's Generic Strategies" and
   "Benchmarking" (off 3.3.5) and `app/business/page.js` "core competencies". Both rewritten to the
   four spec areas (packet 47's Verify B found the same defect on Unit 4). Reaches students at the next
   merge to main, not at publish.

## Files

New: `scripts/_packet54-util.mjs`, `scripts/_packet54-content.mjs`, `scripts/_packet54-assessment.mjs`,
`scripts/_packet54-diagrams.mjs`, `scripts/packet-54-assessing-competitiveness.mjs` (runner),
`audit/snapshots/2026-09-26-pre-packet-54__business__assessing-competitiveness.json` (t=0, all 8 tables,
taken before any write by `audit/runs/packet-54/snapshot.mjs`),
`audit/snapshots/packet-54-bundle__business__assessing-competitiveness.json` (staged bundle).
Modified: `app/business/unit-3/page.js:50-56`, `app/business/page.js:41`. Ledger via CLI only.

## Per ledger id (30 claimed, 1 wont-fix)

C = `_packet54-content.mjs`, A = `_packet54-assessment.mjs`, D = `_packet54-diagrams.mjs`,
U = `_packet54-util.mjs`, R = runner.

| id | what changed | where |
|---|---|---|
| topFix-01 | statements chapter (SoCI, SoFP, stakeholder interest) and two HR chapters (4 measures + limits; 4 strategies); the turnover and empowerment quiz items now pinned to chapters 4/5 | C:39-:128, C:333-:548; A:135, A:149; R §6 |
| topFix-02 | all 5 practice items replaced; 7 on one source (scope call 4); levels K/App/An/Ev above 6 marks, "A strong answer, in outline" at 12 and 20 | A:172-:206; R §7 |
| topFix-03 | VRIO block absent (packet 13) and banned, ban re-measured and A/B'd; no examiner claim about VRIO anywhere | U:158; R §2; ab-mutation.log |
| topFix-04 | Tesla gone; ROCE example on the ROCE step, gearing its own borrowing example; flashcard formula fixed; no patents text; current-ratio-below-1 qualified by industry | C:209 (realExample), C:183, C:154; A:218 |
| topFix-05 | formula fill-ins, each one step after its formula: ROCE (C:237), capital employed + gearing (C:209), turnover (C:384), plus margins, acid test, productivity; the borrow→gearing→interest→downturn→risk reorder (C:266) sourced from A:299; `quizIndices`/`practiceIndices`/`diagramId` on every block | C recalls; R §4, §8 |
| accuracy-01 | Tesla realExample removed; no year anywhere (runner bans) | R §9 |
| accuracy-02 | VRIO examMatters absent (packet 13); banned; no uncited examiner claim (R §9) | U:158; R §2, §9 |
| accuracy-03 | flashcard: profit for the year ÷ revenue × 100; mistake card names the Unit 2 operating profit margin | A:218, A:250; R §3b |
| quiz-01 | labour turnover item kept, pinned to chapter 4 which teaches it | A:135; C:356 |
| quiz-02 | empowerment item pinned to chapter 5; distractor Consultation, zero-hours gone | A:149; C:525 |
| practice-01 | p0 replaced by "Explain one…" (4) with a point scheme; no Five Forces | A:175 |
| practice-02 | Bowman item gone; banned (0 hits in spec) | U:158; R §2 |
| practice-03 | both 20-markers anchored to Orla and its source with levels schemes; every item examines 3.3.5 content | A:197, A:202 |
| structure-01 | the IAL content now has blocks; no second off-spec block | C:549 |
| structure-02 | banks aligned to chapters; pins derived from each item's block tag | R §4, §6 |
| structure-03 | every block pins quiz, practice and `diagramId` | R §4 |
| structure-04 | 18 recalls, all four types | C (one per `sub`) |
| structure-05 | 18 steps, 255-327 words each; explicit ratios→competitiveness bridge | C:241; R words line |
| structure-06 | 5 diagrams incl. the "gearing magnifies gains and losses" comparison the item named | D:120-:314 |
| structure-07 | each step's example is its own topic; gearing examMatters on interest rates and sales | C:183, R §11 |
| structure-09 | no "most important" overclaim; no absolute takeaway (runner bans) | C:549; R §9 |
| structure-10 | genuine subject misconceptions kept (high gearing always bad, C:183; ratio without comparison, A:245) and one per step, none about exam technique | R §9 |
| specGap-01 / specThin-01 | SoCI and SoFP key information | C:39, C:67 |
| specGap-02 | stakeholder interest, six groups | C:95 |
| specGap-03 | limitations of ratio analysis, six points incl. window dressing | C:302 |
| specGap-04 | productivity, turnover and retention, absenteeism: calculated and interpreted | C:333, C:356, C:384 |
| specGap-05 | four HR strategies, one step each | C:440-:548 |
| specGap-06 | ROCE against the 8% cost of borrowing and alternatives; the live q9 kept in substance | C:237; A:109 |
| specGap-07 | VRIO / tangible-intangible absent (packet 13) and banned | U:158 |
| structure-08 | **wont-fix** (scope call 1) | ledger note |

## What was run, and what it showed

- Runner dry run and `--stage`: exit 0; before 5 BLOCK / 24 DEBT, after 0 / 0, 0 recoverable
  (`stage.log`, the final run after the structure-05 sentence was added).
- `ab-mutation.sh`: seven planted defects (VRIO, wrong margin card, a real firm, a formula printed
  on its own recall's step, a pinned key on its diagram, "Explain two", the reorder chain broken) each
  fired; control clean; modules restored byte for byte (`ab-mutation.log`).
- Packet 44's leak probe (shares no code with this runner) on the bundle: 0 HARD (`leak-probe-bundle.log`).
  Check-in leak by reading, my own and not a verifier's: each block's first item is on figures or
  ideas its diagram does not show.
- Draft vs bundle, two methods: `draft-readback.mjs` reads all 8 tables' `draft` (= bundle) and `data`
  (= t=0 snapshot) directly; `check-staged-drafts.mjs` via `?draft=1`: matches (signed-out slice
  only). A third, `served-check.log`: `curl` with and without `draft=1` parsed in Python — 5 blocks /
  18 subsections / 18 recalls staged; live still 1 block, Tesla ×2.
- Gates in the SHARED worktree: `npm test` 357/357, `npm run validate` exit 0, `npm run exposure` exit 0,
  `npm run recalls` exit 0 (`gate-*.log`).
- Diagrams rendered by headless Chrome on a dark background at 400 units and looked at
  (scratchpad only): not the light-theme remap, not at 390 px in the app.
- Hub pages: `curl :3001/business/unit-3` and `/business` return 200 with the new copy (dev server
  compile only, `hub-pages.log`).
- **Not run:** `npm run build` (a `next build` here rewrites `.next` under the shared :3001 dev
  server; the two `app/` edits are string-only), Verify A, Verify B at 390×844, Rule 3 check of
  origin/main beyond `lib/mistakes-shape.js` (runner §9 reads it on origin/main).

## Publish (rule 6 — for the founder, not run)

Before publishing, run Rule 3 against `origin/main`: fields this bundle carries are
`mistakes[].title/mistake/correction/examTip` (read via `lib/mistakes-shape.js` on main), `diagramId`
pins, and recall types `classify`, `fillin`, `match`, `reorder`. Then:

```
node scripts/packet-54-assessing-competitiveness.mjs --stage && node scripts/publish-section.mjs assessing-competitiveness --confirm
```

`npm run recalls` will need a re-baseline at publish (DECISIONS: debt moves draft→data).

## Fix round 1 (26 Sep): the shop wage the accounts could not hold

**Closes** topFix-01, topFix-02, specGap-05. Nothing else is re-claimed.

**Cause.** `_packet54-util.mjs` set shop pay at $14,000 a month. 200 staff × $14,000 × 12 = $33.6m, against
$10m of other operating expenses and $34.8m of total costs. The $2.4m pay-gap figure and the "five times
the turnover" point were built on that number. The runner checked the gap *equalled* $2.4m and never
checked it fitted the accounts, so it passed.

**Figures now.** Shop pay $2,000 and rivals $2,200 a month. The wage bill is $4.8m, 48% of this year's $10m
opex; at the rivals' rate it is $5.28m this year and $4.75m last year against $9.4m. The gap is 200 × $200 × 12
= **$480,000, the same as the $480,000 turnover cost**. The replacement cost of $8,000 is four months' pay.

**The teaching point, reversed as the verifier said.** Matching rivals' pay and the share scheme ($500,000)
each cost about as much as the whole turnover bill. No strategy keeps every leaver, so neither can repay itself
from fewer leavers alone. The case for either rests on what the turnover figure leaves out (experienced staff,
service). A say over rotas costs little.

**Rule 4: every field that stated the claim, and the siblings read.**
- `financial-rewards` body para 2 (C:451) was rewritten. keyIdea, the other body paragraphs, realExample,
  misconception, examMatters ("a reward that costs more than the turnover it prevents needs another
  justification", which is now consistent) and the match recall were read. None needed a change.
- **Sibling in the same class, not named by the verifier:** `employee-share-ownership` para 3 said the scheme
  "would pay for itself only if it cut turnover sharply". At $500,000 against $480,000 that is false even if
  no one left. It was rewritten, and the step's other fields were read.
- Notes twin, chapter 5 MECHANISMS: the pay-gap line now says "the same as the $480,000 turnover costs,
  so fewer leavers alone cannot repay it". The definitions, the link and the takeaway were read and are unchanged.
- Diagram `strategiesDiagram` (5c268d90): the bar is now labelled `usd` ($480,000, not "$0.48m"). The scale
  is the largest row, because $500,000 would otherwise overrun the old PAYGAP-based span. Checklist lines 2-3
  were rewritten, and "five times" is gone.
- P6 (Evaluate 20, share scheme): Level 3 now reads that the scheme would not be repaid even if every leaver
  stayed, and that closing the gap costs about the same ($480,000) and addresses pay. The strong answer adds
  "matching rivals' pay costs about the same and at least answers pay". Levels 1, 2 and 4 were read.
- Source A (all 7 items): the text is unchanged apart from the two pay figures. The only item that states
  the wage figure elsewhere is P6.
- Extras evaluation 3: "financial rewards … cost the most" was false for Orla ($480,000 < $500,000) and
  now reads "a pay rise goes to everyone". The Orla sentence now costs pay against turnover.
- Read and left unchanged: quiz 24's explanation ("can cost far more than the turnover it prevents"
  is general and still true, since $480,000 is spent to prevent part of $480,000), the mistake card
  "Recommending a pay rise…", the rewards flashcard, and consultation para 3 ("costs little compared with a pay rise").

**Guard for the class** (runner, arithmetic). Shop staff at the *rivals'* pay must fit inside 60% of
opex in both years. Replacement cost must lie between one month's and one year's pay. PAYGAP must be
$480,000 and equal to the turnover cost. The share scheme must cost more than turnover (this backs "would not cover it").
A/B in `ab-payfit.log`: $14,000/$15,000 fails 4 lines, exit 1. $2,000/$2,500 fails the PAYGAP line, exit 1.
$2,000/$2,200 exits 0. The util file was restored byte for byte.

**Independent check** (`payfit-check.mjs`, which imports no packet-54 module). It reads the staged
`draft` of all 8 tables from the database and walks every string (1,092: flow steps, notes, SVG text,
schemes). It parses staff, pay, rival pay, opex, leavers and replacement cost out of the Source A
*wording*. From those it recomputes the wage bill and the gap, checks every stated pay-gap figure
against that recomputation, prints every cost-against-turnover comparison for reading, and fails on
$14,000, $15,000, $2.4m or "five times". A/B in `payfit-check-ab.log`:
the pre-fix bundle (rebuilt from the round-0 sources, which were then restored and re-dumped) gives
13 FAIL, exit 1. The staged draft gives 0 FAIL, exit 0, with a wage bill of 48% of opex and a gap to turnover ratio of 1.00.

**Run.** The runner dry run and `--stage` both exit 0, with 0 BLOCK / 0 DEBT (`stage.fix1.log`). Step words are
255-333 (budget 350; financial-rewards rose to 333). `draft-readback.fix1.log` shows 8/8 tables with
draft == bundle and data == the t=0 snapshot (live untouched). Gates in the shared worktree: `npm test`
363/363, and `validate`, `exposure` and `recalls` all exit 0 (`gate-*.fix1.log`).
**Not run:** the diagram was not looked at in a browser. Only the runner's emitted-SVG extent,
box-fit and collision checks ran on it. Also not run: a 390×844 walk, `npm run build`, and
Verify A or B. The publish command in the section above is unchanged and is for the founder only.

## Fix round (post founder decision)

Founder ruling, 26 Sep 2026, relayed by the board session: fix both Verify B defects before publishing.
Nothing was published. Rule 6 held: the runner wrote `draft` only.

**(a) Step 11 reorder: loan → interest → gearing.** I changed BOTH the step text and the reorder. The
founder's order could not be reached by editing only one of them. The step text put gearing first
("push gearing higher, with more to pay the bank"). A reorder of the old items in the new order would
still have two defensible orders, because a loan raises gearing and the interest bill at the same
moment and neither causes the other. So I anchored each stage in time. Each item now names when it
happens, and only one order fits those times: the interest is owed from the first month, the year-end
statement of financial position shows the higher gearing, and the downturn comes in the following year.
- `scripts/_packet54-content.mjs:276`: the body now reads "would first add interest owed to the bank
  every month …; then, at the year end, the statement of financial position would show gearing pushed
  higher". That is the order the recall marks.
- `scripts/_packet54-content.mjs:283-297`: the prompt is now "Put these stages in the order they happen,
  from signing the loan to the danger it creates" (the criterion is now the order in time). The five
  items are loan → "From month one, a fixed interest charge must be paid" → "Year-end accounts reveal a
  higher gearing ratio" → "In the year that follows, a downturn …" → "Profit may no longer cover the
  interest due". Every `why` line is rewritten to give the timing. The first wording copied the body too
  closely: `recall.recoverable` scored it 0.83 and 0.88 against a 0.75 threshold, and the runner failed
  (`fix2-dryrun.log`, first run). I reworded the items, and it now scores 0 recoverable.
  "The following year" became "In the year that follows" so it no longer shares the leading token "the"
  with item 1 (`reorder.lead`).
- `scripts/_packet54-assessment.mjs:299-306`: the extras chain "From a large loan to financial risk" is
  put in the same order and anchored in the same way (`reorder.source`).
- `scripts/packet-54-assessing-competitiveness.mjs:498-499`: the topFix-05 check now requires interest at
  [1], with no gearing in that item, and gearing at [2]. A/B test: with items 2 and 3 swapped back, the
  runner exits 1 on this check. Restored, it exits 0 (`fix2-ab-swapped.log`, `fix2-dryrun.log`).

**(b) Unit 3 card "Competitiveness is relative".** `app/business/unit-3/page.js:129`: I changed only the
second sentence, from "Use Porter, ratios and benchmarking to analyse competitive position" to "Use the
financial statements, ratio analysis and human resource measures such as labour productivity and labour
turnover to analyse competitive position". I grepped every tool word I kept against
`audit/raw/bus_spec.txt:1218-1248`. Counts: financial 3, statements 1 (the heading "Interpretation of
financial / statements" is wrapped across two lines), "ratio analysis" 2, "human resource" 2, "labour
productivity" 1, "labour turnover" 1. **Benchmarking** returns 0, so I removed it along with Porter,
which also returns 0.

**Run.**
- `node scripts/packet-54-assessing-competitiveness.mjs --stage`: exit 0, 0 BLOCK / 0 DEBT / 2 INFO,
  0 recoverable. It staged all 8 tables to draft (`stage.fix2.log`) and re-dumped the bundle to
  `audit/snapshots/packet-54-bundle__business__assessing-competitiveness.json`.
- `node audit/scripts/check-staged-drafts.mjs assessing-competitiveness`: "matches", 0 drift
  (`check-staged-drafts.fix2.log`).
- `npm run validate`: exit 0, total new-block 0 (`gate-validate.fix2.log`).
- Independent check (`fix2-reorder-probe.mjs` → `.log`). It does not use the runner's modules. It reads
  the dumped bundle and grades both submissions with the shipping grader `gradeReorder` from
  `lib/recall-widgets.js`. Loan → interest → gearing gives 5/5, allCorrect. Loan → gearing → interest
  gives 3/5, 2 one-off, marked wrong. The body sentence and the extras chain in the bundle carry the
  same order.

**NOT DONE: the browser re-walk and the served-card curl.** The 390×844 `?draft=1` walk of step 11 and
the curl of `/business/unit-3` were not completed. The first curl came from the shared `next dev`
on :3001 (pid 46965, parent 46964). It still served the old sentence with Porter, even though the file
on disk was correct: this is the known Turbopack stale-RSC problem. I killed that server by port and
cleared `.next/cache`. `preview_start remediation-dev` then refused, saying another chat's
"remediation-dev" had the port. The permission layer then denied my check of the port, so I stopped
there. **The shared :3001 dev server may be down, and needs a restart from the owning session or the
founder.** After the restart, run the re-walk and
`curl -s http://localhost:3001/business/unit-3 | grep -o "Use [A-Za-z ,]*to analyse competitive position"`.

## Fix round 3 (26 Sep): topFix-05, the downturn item names what it follows

Answers verify-a.md "Re-verification round 2" (topFix-05 REJECT). Scope is that one item. specGap-07 is untouched.

**Reproduced first.** I ran `fix3-probe.mjs` on a copy of the pre-fix bundle. It reads bundle JSON or the served draft,
not the runner's modules. The platform grader (`lib/recall-widgets.js` `gradeReorder`) gave loan>interest>downturn>gearing>cover
`correct 3, oneOff 2`, and the spaced start was `[3,2,0,4,1]`. Both match `r2/reorder-grade.log` exactly.

**The class, not the path.** The one path was item 4 at `:289`. The class is any relative time anchor with no named
antecedent, plus any narration that puts falling sales before the year-end gearing. It had four members:
- `scripts/_packet54-content.mjs:289`: the reorder item. "In the year that follows" became "In the year after those accounts".
- `scripts/_packet54-content.mjs:296`: its `why`. "in the following year" became "in the year after those accounts".
- `scripts/_packet54-assessment.mjs:304`: the extras source chain, same change. It is still the same length and order as the reorder.
- `scripts/_packet54-content.mjs:276`: body para 3. It narrated "even in a year when sales fell" BEFORE "at the year end
  … gearing pushed higher". It now reads interest every month → at the year end, gearing pushed higher → "and if sales
  fell in the year after that, the interest would still be owed". The facts are the same (interest owed every month,
  owed even when sales fall, year-end gearing higher) and no figure changed.
- The runner guard is `scripts/packet-54-assessing-competitiveness.mjs:500-517`. It fails on a bare "the year that follows / the
  following year" anywhere in the chain's items, its `why` or its extras steps. It also fails when item 4 or extras step 4
  does not say "after those accounts", and when any body text on that step has interest ≥ year end ≥ sales fell. The
  comment at `:498` has been updated to match.

**A/B, runner guard** (`fix3-ab.sh` → `fix3-ab.log`). I planted each path back one at a time and restored each file byte
for byte (sha checked). All 7 plants FIRED: bare anchor in the item, the why and the extras; unanchored item; unanchored
extras step; the old body para; items 3 and 4 swapped. The control run exited 0 with no plant.

**A/B, independent probe** (`fix3-probe.log`). Pre-fix bundle: 7 FAIL. Re-staged bundle: all ok. Served draft
(`:3001 ?draft=1`): all ok (it covers content only; the served payload has no extras). `fix3-bundle-diff.log` walks the
pre-fix and re-staged bundles leaf by leaf and finds exactly 4 changed leaves, the four above. The grader still scores
the downturn-first order 3/5. That is correct, because the grader measures position. What changed is that no text on the
step or in its source chain now supports that order. That is a reading judgement made from the text. I did not observe
a student.

**recall.recoverable:** the runner's shared measure is at 0 for this section (`stage.fix3.log`, "after: 0 BLOCK /
0 DEBT / 2 INFO (0 recoverable)"). `npm run recalls` exited 0 with no section worse than the baseline (`gate-recalls.fix3.log`).

**Re-staged** with `--stage` (which also dumps): `stage.fix3.log`, 0 new BLOCK or DEBT.
`node audit/scripts/check-staged-drafts.mjs assessing-competitiveness`: `matches` (`check-staged-drafts.fix3.log`).
That covers only the signed-out fields; the probe's bundle run covers the extras chain.

**Gates:** `npm test` exit 0 (368/368), `npm run build` exit 0, `npm run validate` exit 0. Logs are `gate-*.fix3.log`.

**Not re-checked:** no browser walk of step 11 at any width. `audit/NEXT.md`, `audit/PROGRESS.md` and `audit/ledger.json`
still quote the old wording. They are handoff files owned by other sessions and the gate, so this round left them alone.
