# Packet 12.7 — built (author pass, 26 Sep 2026)

Spec: `audit/specs/packet-12.7.md`. Nothing staged, nothing committed (spec "Commit hygiene"; see
Contradictions). Nothing live written: all changes are repo files. Ledger: `claim 12.7 E039 E042 E043 E044`.

## E043 — the extract's Define (2) and Analyse (6) in the bank; generics lose `stimulus`; B1 note gone

- `data/modelAnswersExpansion.js:155-170` block comment; items at `:172` (`mf-extract-define-consumption-externality-2`)
  and `:241` (`mf-extract-analyse-plastic-bag-charge-6`), inserted before the 8-mark generic. Full field
  parity with the 8-mark item (id, specItems, subject, unit, sectionNumber, sectionTitle, marks, stimulusRef,
  ao, kind, type, commandWord, question, markScheme, peel, answerParagraphs, annotationLegend,
  examinerCommentary, likelyScore) plus criteria/script/stimulus/minutes. Model-answer text = md Q1/Q2
  verbatim (checked by `drift-check.mjs`, below). `minutes` from `minutesForMarks`: 3 and 8.
- `specItems` by wording (`audit/raw/spec-items.json`; 43 ECON-1.3.5 items, not the spec's "63"):
  Define `2c-4` (external costs of consumption), `2e-4` (environment); Analyse `2c-4`, `2b`, `2d-3`, `1a`.
- **Define criteria are NOT labelled AO1/AO2** as the spec asked: Appendix 6 (`econ_spec.txt:2704`) says
  Define "requires knowledge and understanding only", `lib/ao-spec.js` encodes AO1 only, `contractProblems`
  (via `npm run spec-coverage` `specid`) requires `ao` to match, and the page's AO chip would read "AO1"
  above an "AO2" band. Bands are "The definition (1 mark)" / "The extract's example (1 mark)"; rationale
  in the comment at `data/modelAnswersExpansion.js` above the Define item's `criteria`. Analyse is
  2 AO1 / 2 AO2 / 2 AO3 as specified.
- `stimulus` removed from the three generics, each replaced by a one-line reason:
  `data/modelAnswersData.js:290` (4m), `data/modelAnswersExpansion.js:626` (8m), `:770` (20m).
- B1 disclaimer + its comment replaced by one sentence: `components/SectionModelAnswersPage.jsx:258-263`
  ("The first questions below are set on this extract, and their application marks are awarded for using it.")
- **Order (component change, the smallest found):** `lib/model-answers-route.js:43-52`, `writtenFor()` now
  partitions: items carrying `stimulus` first, sorted by marks; the rest in bank order. A page with no
  `stimulus` item returns the identical list (early return `:51`). Needed because `MODEL_ANSWERS` is
  BASE then EXPANSION, so the generic 4m (BASE) would otherwise precede anything added to EXPANSION.
  Served order at :3001 and in the scratch-build prerender: 2, 6, 20 (extract), then 4, 8, 20 (generic).

## E044 — Evaluate re-tariffed 10 → 20, authored to a 20-mark exemplar, same text in both places

- `content/data-response/econ-u1-market-failure.md:32` question heading "(20 marks)"; `:52` answer heading;
  `:54-66` new answer (7 paragraphs, ~1,180 words); `:68` examiner note rewritten for 20 marks (AO 4/4/6/6,
  qualitative top band — no numeric IAL level grid exists in `econ_spec.txt` or the repo, so none is stated);
  `:74` Common Mistakes "10-mark" → "20-mark" (neighbour of the same edit). Q1/Q2 untouched.
- Bank item `data/modelAnswersExpansion.js:331` (`mf-extract-evaluate-soft-drinks-excise-20`): 20 one-mark
  criteria, AO1 4 · AO2 4 · AO3 6 · AO4 6, each pointing at its own segment; markScheme quotes Appendix 6
  Evaluate (`econ_spec.txt:2741-2747`) plus the four AO rows; `specItems` `2c-4`, `2e-2`, `1b-3`, `2d-3`.
- What was deepened over the 10-mark version: the -0.6 PED used to PREDICT a ~30% fall, tested against the
  32%, and tied to the critics' pass-through claim; the USD 25 bn / 12.3% evidence tested (stock/time lag,
  attribution, internal vs external share) instead of accepted; externality vs information failure pulled
  apart; regressivity QUANTIFIED from the extract (1.5 × 0.68 ≈ 1.02 — spending roughly unchanged on
  two-thirds of the volume); flat-rate-on-price vs sugar-based levy tied to the extract's "without significant
  reformulation"; government failure made specific (50% = AED 1.20 only at AED 2.40/litre, price not given);
  conditional judgement with its criterion and reversal condition. Numbers in the answer not in the
  stimulus: 0.68, 1.02, 1.5, 2.40, 30 — all derived arithmetic, stated as such. None invented.
- Drift: `audit/runs/packet-12.7/drift-check.mjs` (locates answers by md heading, normalises markup) →
  `drift-check.log`: Q1, Q2, Q3 md text == bank `answerParagraphs` == joined `script` segments; tariffs and
  stems equal; AO split printed. Exit 0.
- Neighbour: `app/data-response/[slug]/page.jsx:14` meta description "2/6/10-mark ladder" → "2/6/20".
- For Verify A: this is new marking — read it against Appendix 6 Evaluate and the AO split, not only the sum.

## E039 — `segRole`, R7, rendered without colour

- Data: every criterion on all six retrofitted items carries an explicit `segRole` (48 total); `'missed'` only on
  the 8-mark generic `c7`/`c8` (`data/modelAnswersExpansion.js:585-586`), comment `:571-574`. The 20-mark
  generic's script has no "not earned" segment note (`likelyScore` 18–20), so all 17 are `'earned'`.
- Validator: `audit/scripts/validate-model-answers.mjs:123-129` (R7, requires the field; header `:23`, `:36-39`).
- Render: `components/MarkedScriptAttempt.jsx:34-41` (`ROLE_LABEL`, `roleOf`, absent = earned), `:116`,
  `:186-190` (summary says "earned, or missed" only on an item that has a missed criterion), `:198-222`
  (segment class `is-earned`/`is-missed`, `data-seg-role`, per-criterion label). CSS
  `components/model-answers-layout.css:424-426` (dashed rule) and `:434` (label). No colour added or changed.
- Proof and 390x844 + 1280x800 measurements: `audit/runs/packet-12.7/validator-ab.md`.

## E042 — nothing else moved (author's own evidence; Verify must use a different method)

- `snapshot-pages.mjs` fetched all 32 pages' `<main>` from :3001 before and after (scripts/styles stripped;
  a second "before" run was byte-identical, so the snapshot is deterministic): **31 pages identical, only
  `economics__market-failure-model-answers.html` differs** (`pages-before/`, `pages-after/`).
- 1.3.5 draft + ticks across reload, all six questions (3 new), Browser pane at 390x844, JS-driven input:
  after reload every textarea held its probe text and every tick survived (8m: 3 of 8). Keys were restored
  to their prior empty values afterwards.
- `npm run spec-coverage`: zerocov 0 before and after (`pre-`/`post-spec-coverage.log`); failures 123 tariff
  both times (pre-existing, exit 1 both times); market-failure 8 → 11 questions, 9 → 13 leaves examined.

## Gate-style runs (this tree, 26 Sep)

`npm test` 303/303 (`gate-test.log`) · `npm run validate` exit 0, model answers 0 findings (`gate-validate.log`)
· `next build` exit 0 in a scratch COPY of the working tree (includes other sessions' uncommitted edits;
not run in the shared tree because another chat's dev server is on it) (`build-scratch-tree.log`).

## Consequences outside the 32 section pages (expected, recorded)

- 1.3.5's "why this loses marks" panel moves from the generic 20m to the extract's Evaluate 20
  (`highestTariffItem` breaks the 20/20 tie on paragraph count, 7 > 5). Its evaluative paragraphs are labelled
  "Evaluation — …" so `CLOSING_LABEL` cuts them: panel reads "2 of 7 paragraphs".
- `/model-answers` hub: 66 → 69 answers; the mark filter gains "2 marks" and "6 marks" (first Define/Analyse
  items in the bank).

## Not done / flagged

- md Q2 answer (copied verbatim, as specified) frames a consumption externality as MSC > MPC, while the same
  file's diagram reference uses MPB/MSB; its examiner note uses "Level 3 (5–6)" for a 6-mark question that
  `lib/ial-marking.js` says is point-marked. Left as written; for the founder.
- A 2/6/20 extract set is not an IAL Section C shape (`econ_spec.txt:374-375`: Section C five parts, 34 marks;
  20-mark Evaluate is the Section D essay). Founder ruling 2026-09-25 is settled; noted only.
