# Packet 12.8 — built (build phase, 26 September 2026)

Authoritative spec `audit/specs/packet-12.8.md`, read in full with its Notes; brief `brief.md` read first.
Handoff files read: `audit/PROTOCOL.md`, `audit/NEXT.md` (the 12.8 reservation block and the newest
Handoff heading), `audit/PROGRESS.md` (12.6/12.75 rows; no 12.8 row exists), `audit/DECISIONS.md`
Settled (2026-09-22 to 2026-09-26), `audit/CONTENT-GATE.md` incl. the recall contract. No contradiction
among them for this packet (the retrofit-vs-pilot wording is settled by DECISIONS 2026-09-26).

**Nothing staged, nothing committed** (task header and spec: "stage nothing and commit nothing"; the
later "stage explicitly" line is read as the rule for whoever does stage). No live content written: this
packet's content is repository data (`data/*.js`, `content/data-response/*.md`), not Supabase sections.
Dev server on 3001 was restarted by port twice (before the "before" snapshot, and before the sweeps).

## Checked against the code, and what did not hold

- **E063's premise is wrong.** `--rlh-h` IS defined: `styles/theme-night.css:154`
  (`.elp-page.elp-page, .rl-night.rl-night { --rlh-h: 60px; }`), and `.rlh` takes its height FROM it
  (`:158-160`, `height: var(--rlh-h)`). `components/practice-shell.css` and `PracticeShell.jsx` only read
  it, which is what the brief checked; the definition lives in theme-night.css. The frame and the header
  therefore already agreed by construction; the gap is a header sized some other way. Fix below.
- **The spec's "(c) unchanged" and E055 collide on one sentence.** E055 names the MSC>MPC framing of the
  6-mark answer as the inconsistency, and R13/E062 require the md and the bank to say the same words.
  Resolved by changing that one sentence in both (MSB below MPB, as the (e) answer and the diagram the md
  names), c1's wording and the p1a note; marks, segments and every other sentence unchanged. Recorded in
  the item (`data/modelAnswersExpansion.js:444-450`).
- **IAL level descriptors** are not in the repo. Read from Pearson's WEC11 SAM mark scheme (the source
  `audit/raw/ial-paper-structure.json` cites; PDF fetched, text extracted to the scratchpad, not committed):
  short answers point-marked (Draw/Calculate K1 A3; Explain K2 A2 or K1 A1 An2), 12(d) Examine 8
  point-marked K2 A2 An2 E2, 12(e) Discuss 14 KAA 8 (levels 1-3/4-6/7-8) + evaluation 6 (1-2/3-4/5-6),
  essays KAA 12 (1-3/4-6/7-9/10-12) + evaluation 8 (1-3/4-6/7-8). New/re-levelled items follow these,
  descriptors paraphrased. Two consequences flagged below (8-mark levels, 20-mark AO split).
- **The shipped diagram asset cut its own label**: `positive-externality-consumption.svg` drew "MPC = MSC"
  from x=446 to 520 in a 500-wide viewBox. Widened the viewBox to 540 (`public/diagrams/...svg:1`); all 12
  `<text>` bboxes measured inside it (getBBox in the browser, a different method from the text-fit sweep,
  which cannot see inside an `<img>`). The file is referenced nowhere else in code.
- **A pre-existing grid defect in 12.75's shell**: the desktop `.ps-set` placed the panes in the second,
  auto track (the hidden tab bar takes no cell) and left the `1fr` track empty (measured rows
  `372px 96px 0px`). Harmless with a two-line question head; with a context table above the stem it
  squeezed the answer pane to 96px at 1440×900. Fixed (`components/practice-shell.css:160-169`).

## Per ledger id

**E057 — `paper` field, R9-R13, one source of truth.**
- `lib/ial-paper.js` (new): the only reader of `audit/raw/ial-paper-structure.json` (fs, root found as
  `lib/spec-coverage.js` does); `paperFor`, `paperSection`, `sectionOfKind`, `sectionMarks`,
  `commandWordsFor`. No number from the file is restated in the validator or the shell.
- `audit/scripts/validate-model-answers.mjs`: header doc `:29-46`; R9 per item `:128`, `:189-240`
  (section/kind exist and match, tariff and command word legal per `commandWordByTariff`/`commandWords`,
  part a-e, context required for short answers and essays, a Draw item's `diagram.src` exists in
  `public/diagrams/`); R10-R13 per page `checkPages` `:283-360`; `mdQuestions` parser `:259-272`.
- `next.config.mjs:13-14,23,29`: the structure file traced for both model-answer routes (build nft
  confirmed to contain it).
- A/B mutation proof: `validator-ab.sh` → `validator-ab.log`. Control 0 findings; R10 ×3 (multiset,
  shared stimulus, duplicate letter) and R13 ×4 (tariff, wording, missing part, numbered form) each fire;
  also R9 ×2, R11, R12; control after every restore 0 (each restore sha256-checked). Before the md rewrite
  the live validator already failed R13 ×6 on the real file (the natural "fails first").

**E058 — Section C, five parts on Extract A at 2/4/6/8/14.** `data/modelAnswersExpansion.js`
- (a) `mf-extract-define-consumption-externality-2` `:223`, `paper` `:292` only.
- (b) NEW `mf-extract-explain-tobacco-social-cost-4` `:296-351` (Explain 4, K2 A2, Table 1's AED 18).
- (c) `mf-extract-analyse-plastic-bag-charge-6` `:355`, MSB/MPB sentence (E055) + `paper` `:444-450`.
- (d) NEW `mf-extract-examine-bag-charge-optimum-8` `:456-536` (Examine 8, K2 A2 An2 E2): the LEVEL of
  the charge (0.25 vs 0.18, overshoot, elasticity sizes the overshoot) — (c) rewards the mechanism.
- (e) RE-LEVELLED `mf-extract-evaluate-soft-drinks-excise-20` `:538-657`: now Discuss 14, question
  "Discuss whether…", answer rewritten to the Discuss row (647 words, government-failure paragraph cut
  because (d) now rewards that reasoning), KAA 8 + evaluation 6. **Id kept** (drafts keyed by it);
  **criteria ids changed** to `k1-k8`/`e1-e6` so old ticks on `c1-c20` cannot land on new criteria.
- All five carry `paper: { section: 'C', kind: 'data_question', part }`; header comment `:177-205`.

**E059 — Section B, five short answers × 4.** Each with `paper.context`.
- `neg-externality-4` (`data/modelAnswersData.js:299-306`): context added (the coal power station the
  answer already uses); no mark or sentence changed.
- NEW Draw `mf-short-draw-vaccination-welfare-loss-4` `:961-1018` (K1 A3; `diagram` = the widened
  positive-externality SVG; 2c-2, 2d-1, 2d-3, 2e-2).
- NEW Calculate `mf-short-calculate-graduate-social-benefit-4` `:1020-1078` (K1 A3; data in a context
  table; 16,500 and 27.3%; 2a, 2c-2, 2e-3).
- NEW Explain `mf-short-explain-sea-wall-public-good-4` `:1080-1139` (3a-1, 3a-2).
- NEW Explain `mf-short-explain-pensions-asymmetric-information-4` `:1141-1200` (4a, 4c-3, 1b-3).
- Draw/Calculate carry no `ao` (lib/ao-spec.js has no entry; never hand-typed). All self-marked; none
  routed to the AI marker (no change to `app/api/written-practice/evaluate/route.js`).

**E060 — Section D, two essays, answer one.**
- `market-failure-government-intervention-20` `:794`: comment and quoted context `:937-951`. **Factual correction
  (rule 4, same entry):** "the SDIL reduced sugary drink consumption by 34%" → a fall of about a third in
  the SUGAR sold in levied drinks, mostly through reformulation (answer paragraph, p2c, PEEL evidence);
  its marking (AO1 4 · AO2 4 · AO3 6 · AO4 6) untouched.
- NEW `mf-essay-deposit-protection-moral-hazard-20` `:1202-1334`: Evaluate 20, KAA 12 + evaluation 8,
  context the March 2023 US deposit guarantee (SVB/Signature, above the USD 250,000 limit; cost recovered
  by a special assessment on larger banks) — 1b-4, 5a, 5b-2, leaves no other 1.3.5 item examines.

**E061 — the shell shows the paper.**
- `lib/practice-shell.js:130-258`: `isPaperItem`, `hasPaper`, `paperSets` (paper order, headers and
  totals from the structure file, essay `choice`, "More practice" for the rest, nothing dropped),
  `sectionARow` (links `/?section=<id>`, says the quiz is under the Quiz tab once the topic opens, Pro
  with a preview; never claims to land on it).
- `components/SectionModelAnswersPage.jsx`: `shellItem` adds `context` (parsed blocks), `draw`, `part`,
  `diagram`; `shellFor` uses `paperSets` only when the page has `paper` items, else 12.75's
  `questionSets` unchanged; `extractLabel`; `sectionA`.
- `lib/model-answers-route.js` `writtenFor`: paper order (sections as the file lists them, parts by
  letter) on pages with `paper` items only — the JSON-LD `Quiz` order.
- `lib/stimulus.js`: `parseBlocks` exported (parseStimulus now calls it; its output unchanged).
- `components/PracticeShell.jsx`: `ContextBlocks` (above the stem, every mode, extract table markup so it
  stacks); section header per set; Section A row in the top bar; switcher labels; chips by part/essay;
  Draw attempt = sketch prompt, no text box, "Mark my sketch", marking view without "Your answer", model
  diagram + "Open the diagram full size"; essay choice (choose / switch, persisted with the page prefs,
  auto-adopts an essay already started), banked counts only the chosen essay against the paper's
  section total (20, not 40); ← → across every question in paper order, number keys within a section.
- `components/practice-shell.css`: cards wrap below 112px instead of cutting (5-card sections), Section
  A row, section header, context, choice/sketch panel, diagram frame (white: the asset's own colours),
  frame middle scrolls inside itself with a 300px minimum pane.
- Server HTML (curl, scripts stripped): every section header, the Section A link, every context, the
  diagram and all 13 model answers present; 13 of 13 `.ps-answer` carry `hidden`.
- Also: `app/model-answers/page.js` + `components/ModelAnswersPage.jsx` show a paper item's context on
  the /model-answers hub (additive; only items with `paper.context`), because the hub lists every answer
  and the Calculate question is unanswerable without its table.

**E062 — the md file is the same question.** `content/data-response/econ-u1-market-failure.md`:
Questions and Model Answers regenerated from the bank (`render-md-parts.mjs`) as lettered parts
(a)-(e); old 20-mark Q3 gone; examiner notes = the bank's `examinerCommentary` (no "Level" anywhere,
`grep -c Level` = 0); Common Mistakes rewritten. `drift-check.mjs` → `drift-check.log`: 5/5 MATCH
(answer = answerParagraphs = script, tariff, question, examiner note). `app/data-response/[slug]/page.jsx`
description "2/6/20-mark ladder" → the five-part 2/4/6/8/14 question.
- E054: `components/MarkdownPage.jsx` wraps every table in `.md-table` and gives each body cell its
  column heading as `data-label` (rehype plugin); `app/data-response/markdown-page.css` stacks below 600px
  of container width. A/B with the text-fit sweep on the data-response page: container rule removed →
  page scrolls sideways at 320-420px (21 widths, scrollWidth 423); fixed → 0 of 642 checks, dark and
  light, 320-1920 step 5; at 390 the table is stacked, 344px, 0px sideways. The other five data-response
  pages: 0 failures, dark only, step 10.
- E055: "Level 4" gone; MSC/MPC vs MSB/MPB consistent (both MSB/MPB); the "Level 3 (5-6)" note replaced
  by the bank's point-based commentary.

**E063 — the header's height, measured.** `components/PracticeShell.jsx` (effect after the prefs
effect): measures `.rlh` on mount, on window resize and via ResizeObserver; writes an inline `--rlh-h`
on `.ps` only when the measured height differs from the declared variable. A/B in `e063-ab.json`
(1440×900, scratch styles in the live page only): header 60 → gap 0; header 80 via `--rlh-h` → gap 0 with
no JS; header 80 via `.rlh{height:80px}` → 20px overflow before measurement (= pre-fix behaviour),
gap 0 after. The pane is hidden, so ResizeObserver cannot fire there; the measurement was triggered by a
resize event running the same function. One recorded test artefact (removing React's inline value by
hand), explained in the file.

**E064 — nothing else moved, nothing cut.**
- 31 other model-answer pages: `snapshot-pages.mjs` → `pages-before/` (captured before any edit, twice,
  identical) vs `pages-after/`: body HTML (scripts/styles stripped) and head (title, canonical, every
  JSON-LD block) byte-identical for all 31; only 1.3.5 differs. On 1.3.5: title, canonical,
  EducationalOrganization, WebSite and FAQPage JSON-LD identical; `Quiz` other keys identical, `hasPart`
  6 → 13 in paper order. Sitemap: `app/sitemap.js` and `data/modelAnswerPages.js` untouched.
- Text-fit sweep: `sweep-states.js` (45 states: every item × writing/marking+note/model answers, Section
  C also on the Extract tab, the Draw item's sketch prompt and model diagram, the Calculate table, the
  essay choice before and after, More practice). FAIL FIRST: with `.ps-card{container-type:normal}`
  injected, 41 and 76 failing widths on two states (BLEED of the card metadata). FINAL, on the final
  code, each theme on a fresh load: dark 14,445 checks, 0 failing; light (pin removed, data-theme light)
  14,445 checks, 0 failing; 45 states × 321 widths each (`text-fit.json`). An earlier full pass (also 0)
  is superseded because PracticeShell.jsx changed during its light half. `text-fit-sweep.js` itself was
  changed by ANOTHER session at 13:01 (a VCLIP check); re-run with it: dark 14,445 / light 14,445, 0
  failing (`text-fit.json` → `final_with_vclip`). This packet did not edit that script. Signatures at 390 and 1440 show every state engaged (item, phase, tab, context table
  stacked at 390 / not at 1440, diagram shown only after marking or in Model answers, banked 0/20, 0/34,
  0/20, 0/8).
- `npm run spec-coverage`: 1.3.5 13/35 leaves (HEAD archive, `head-spec-coverage-all.log`) → 23/35
  (`post-spec-coverage.log`); every new item tagged; zerocov 0. The command exits 1 both at HEAD and now
  on the same 123 section_practice tariff failures (no baseline file exists) — identical failure lists.

## Gates (logs in this directory)

All re-run on the final code after the last edit: `npm test` 356/356 (`gate-test.log`) ·
`npm run validate` exit 0, 0 findings (`gate-validate.log`) · `npm run build` exit 0 (`gate-build.log`)
· `npm run recalls` 0 · `npm run exposure` 0 · page snapshots re-taken (31 identical) · `drift-check.mjs`
exit 0.

## Concerns (not blockers, for Verify A/B and the founder)

1. The shipped 8-mark `negative-externality-tax-8` uses a four-level ladder the SAM does not have (SAM
   8-mark Examine is point-marked K2 A2 An2 E2); `lib/ial-marking.js`'s marker guidance says "above 6
   marks, marking is levels-based", also untrue for the 8. Not changed (out of scope).
2. The generic 20-mark essay is marked AO1 4 · AO2 4 · AO3 6 · AO4 6 (Revvy's split, lib/ao-spec.js
   ALLOCATION) while the new essay follows the SAM's KAA 12 + evaluation 8. Two schemes in one section.
3. The model diagram renders at ~0.55 scale on a 390px phone (labels ≈7px); "Open the diagram full size"
   opens the SVG in a new tab. The legibility floor question (V037) is not solved here.
4. On a short desktop window the question head (context table + stem) pushes the answer pane to its
   300px floor and the frame's middle scrolls inside itself.
5. The /model-answers hub now shows contexts; its existing extract questions ("using an example from the
   stimulus") still show no extract, as before this packet.

## Fix round 1 — E057 (verifier rejection: R13 blind to extra questions; R10-R12 pass on absence; no validator-ab.md)

The verifier was right on all three counts. Changed only `audit/scripts/validate-model-answers.mjs`.

- **`mdQuestions` is strict.** Every non-blank line of every `## Questions` section must be a question
  line in the paper form; anything else (a `(f)`, a heading-style or two-line question, a numbered
  list, an en dash) comes back `unparsed` and R13 names it. Part letters now parse `[a-z]`, so a
  `Question (f)` is read and reported as "no bank item carries" instead of skipped. More than one
  `## Questions` section is itself a finding. A duplicated part letter is named (the old `Map` kept one
  copy silently).
- **Two more R13 views of the same file, by different methods:** `mdAnswerHeadings` (the
  `### Question (x) (n marks)` headings of `## Model Answers` must be the bank's parts at the bank's
  tariffs) and `mdQuestionMentions` (a whole-file token scan: any `Question (x)` / `Question N` that is
  not a bank part, under any heading).
- **R10/R11/R12 fail on absence.** Once a page opts in (any item carries `paper`), every section of its
  paper of kind data_question / short_answer / essay must be present; zero items of a kind is a
  finding. Section A (a link to the quiz) and Business `source_set` (reserved) are not required.
- **A page stripped of every `paper` field** is caught from the file side: a data-response md lettered
  (a)-(e) that no opted-in page's data question names is an R13 finding. `listMd` is injectable; a test
  that injects `readMd` alone lists nothing.
- **`validator-ab.md` written.** `validator-ab.sh` rewritten to run BOTH a frozen copy of the round-0
  validator (`validate-model-answers.round0.mjs`, A) and the current one (B) on every mutation, and to
  log each mutation's own `diff` line count so a mutation that failed to apply cannot pass as "A saw
  nothing". 13 new mutations (V1-V13, the verifier's cases plus neighbours) and the 11 round-0 ones.
  Result: A 0 findings on 12 of V1-V13, B at least one on all 13; B finds everything A found on the
  round-0 rows; both controls 0. First harness run had V11/V13 only partly applied (the fifth short
  answer's `paper` is in `data/modelAnswersData.js`, not the Expansion file); the diff column showed
  20 lines where 25 were expected, the harness now mutates both files, and the table is from the rerun.
- **Gates run after the change:** `npm test` 357/357 pass (`gate-test.fix1.log`);
  `npm run validate:model-answers` 0 findings, exit 0 (`gate-validate-ma.fix1.log`). Not run this
  round: `npm run build`, the dev server, any walkthrough (no rendered surface changed).
- **Not covered, named in validator-ab.md:** a page reverted in both places (all `paper` removed AND
  the md renumbered) is an unconverted page by design; a sixth question with no "Question" token
  outside `## Questions` is not detected.

## Fix round 2 — E057 (verifier rejection: a sixth tariffed task without the word "question" passes)

The verifier was right, and round 1's "the page does not present such a line as a question" was
unmeasured and false (`page.jsx` renders the whole md). Withdrawn in validator-ab.md.

- **Validator** (`audit/scripts/validate-model-answers.mjs`): `mdStrayTariffs` + `TARIFF_RE`/`PART_RE`.
  Any tariff or part label outside the bank's five question-line prefixes and five model-answer
  headings is an R13 finding; markup/entities flattened, line breaks kept. R9 (rule 4, bank twin):
  a paper item's `question` or `paper.context` may not state a tariff.
- **Shown failing first on the shipped file:** 3 findings, all examiner-note prose
  (`gate-validate-ma.fix2-before-reword.log`). **Content reworded, meaning unchanged, md and bank
  `examinerCommentary` together** — for Verify A to re-read:
  (a) "Two marks requires the concept" → "Full marks require the concept";
  (b) "Explain at 4 marks asks for no evaluation" → "Explain asks for no evaluation";
  (e) "the long conditional verdict a 20-mark Evaluate does" → "… an Evaluate essay does".
  Old strings survive only in audit/runs/packet-12.75/ artefacts (`leak-strings.json`, served HTML),
  which no gate reads.
- **A/B** (`validator-ab.sh`, `validator-ab.log`, `validator-ab.md`): new control A1 = frozen round-1
  validator (`validate-model-answers.round1.mjs`, from the git index). V14-V28 (the verifier's three
  plus 12 neighbours: number words, bare `(20)`/`[20]`, hyphen, markup split, line-break split,
  entities, stimulus, roman/letter labels, question-line and `paper.context` twins): A0 0, A1 0,
  B ≥ 1 on all 15. V29 residual (untariffed, unlettered) 0 on all three, named. Controls 0/0/0.
- **Gates after the change:** `npm test` 357/357 (`gate-test.fix2.log`); `npm run validate:model-answers`
  0 findings (`gate-validate-ma.fix2.log`); `npm run validate` 0 (`gate-validate.fix2.log`);
  `drift-check.mjs` exit 0 (`drift-check.fix2.log`); `npm run recalls` exit 0 (`gate-recalls.fix2.log`).
  Not run: `npm run build`, dev server, walkthrough, text-fit sweep (only three sentences got shorter).
- **Not staged:** `git add` of this round's files was refused by the permission classifier (shared
  index). Nothing staged this round; the files are in the worktree only.

## Close-out round 1 — E057 (single source, structural R13) and E082 (the Draw item's diagram)

Scope: E057 and E082 only, per the orchestrator's 26 Sep ruling (single source, not detection). Nothing
staged, nothing committed, nothing published, no database write. Files changed: the five below, plus new
artefacts in this directory.

**E057.**
- `app/data-response/[slug]/page.jsx:6` imports `MODEL_ANSWERS`; `:12-24` why; `:26-31` `dataQuestionParts`
  (bank items with `paper.kind === 'data_question'` and `stimulus === slug`, part order); `:33` `mdText`
  (CommonMark backslash-escape of every ASCII punctuation, so a stem renders as text); `:35-43`
  `questionsMarkdown` (`## Questions` + `**Question (x) (n marks)** — stem` per part, the markup the file used);
  `:45-58` `withBankQuestions` (inserted before the first `## Model Answers` outside a code fence; a slug
  with no bank data question is returned untouched); `:128` the call.
- `content/data-response/econ-u1-market-failure.md`: the `## Questions` section (old lines 26-37) removed;
  `## Model Answers` is now `:26`. No other line changed.
- `audit/scripts/validate-model-answers.mjs`: header R13 `:47-55`; parser imports `:84-89`; R9 tag strip
  `:245` now `stripTags`; `TARIFF_RE` kept for R9 `:273-280`; `stripTags` `:282-288`; R13 rationale and
  residual `:290-307`; `ALLOWED_H2` `:311`; `mdOutline` `:317-330` (unified + remark-parse + remark-gfm, the
  page's pipeline); `modelAnswerHeads` `:332-341`; `letteredOutline` `:343`; `r13` (a)(b)(c) `:349-~397`;
  `checkPages` `:414-~492` (R10-R12 unchanged; stimulus claimed by two pages `:476-478`; file-side check on
  the parsed outline `:485`). Deleted: `flattenKeepingLines`, `mdStrayTariffs`, `PART_RE`, `mdQuestions`,
  `mdQuestionSectionCount`, `mdAnswerHeadings`, `mdQuestionMentions`, `mdSections`, `sameWords` (no importer
  outside `audit/runs/`). Frozen pre-close-out copy: `validate-model-answers.round2.mjs`.
- A/B: `validator-ab.md` → "Close-out" (harness `closeout-ab.mjs`, output `closeout-ab.log`; page A/B
  `page-ab.sh`). In a scratchpad clone, full CLI: control 0; (a) ×2, (b) ×6 (incl. setext H2, H3 outside
  Model Answers, repeated H2, second H1), (c) ×7 (extra, tariff, order, missing, H4, duplicate, markup in
  heading) and bank part added / tariff changed / tariffs swapped each fire; fenced `## …` does not; R9 tag
  strip: `(0 < |PED| < 1)` … `(20 marks)` … `>` → round-2 0, close-out 1; no-tariff control 0; real-tag
  control 0. Rendered page (next dev in the clone, restarted per case): unmutated → all six pages identical
  to pre-change :3001 (scripts/links stripped); bank stem edit → exactly that line changes; bank part (f)
  → one paragraph added; markdown in a stem renders literally; other five identical in every case.
- STATED RESIDUAL (in `validator-ab.md` and the validator header): free prose inside the allowed sections
  is not scanned for extra tasks (row R1: 0 findings, rendered). A semantic question for review.

**E082.** `public/diagrams/positive-externality-consumption.svg` (viewBox, styles, sizes, colours kept;
line endpoints unchanged). Computed from the three segments: Q1/P1 = S ∩ MPB = (238.96, 221.91);
Q*/P* = S ∩ MSB = (289.78, 186.04), so P* is above P1; MSB at Q1 = 147.49.
- `:3` `<desc>` rewritten to the corrected picture; `:26-29` geometry comment + welfare-loss polygon
  (Q1 on S, Q1 on MSB, Q*/P*); `:31-32` dots; `:34-37` dashed guides; `:39-42` P1, P*, Q1, Q* labels;
  `:45` MPB label y 348 → 338 (sat on the x-axis); `:48-49` "Deadweight loss" moved above the triangle
  (the old spot is crossed by MSB); `:51` footnote y 390 → 396 (collided with "Quantity (Q)").
- Collision guard: the repo's `audit/runs/packet-40/probe-collisions.mjs` (packet 40's, vertical-safe,
  tolerance 1.2) via `svg-guard-shim.mjs` (copies each CSS class's font-size onto its `<text>`): before
  3 findings (footnote × axis title, MPB × x-axis, MSB × "Deadweight"), after 0. Different method, in the
  browser on :3001: `getBBox` of all 12 texts — 0 overlaps, 0 outside the viewBox, 0 line crossings; dots
  0.0005-0.005 px from their two lines; polygon vertices on S / MSB within 0.003 px; screenshot matches.
- Items using the SVG: the only code reference is `data/modelAnswersExpansion.js:987`, which IS the Draw
  item `mf-short-draw-vaccination-welfare-loss-4` (`:962`); the two named items are one. Its alt text,
  markScheme, criteria c1-c4, script p1a-p1d and examinerCommentary all describe MSB above MPB, Q* where
  MSB = MSC to the right of Q1, and the triangle between Q1 and Q* bounded by MSB above and MSC below: they
  now agree with the picture. No wording changed. `public/diagrams/README.md:18` also lists it for
  "Government Intervention" (live content, not in the repo; not checked, Rule 6).
- Class scan (report only): `diagram-geometry-scan.md` (+ `.mjs`, `.log`). A/B: on the pre-fix copy
  (`positive-externality-consumption.before.svg`) both dots are off (9.17 px, 76.68 px); fixed, 0.00-0.01.
  Current tree: 6 dots in 4 other files off by more than 3 px — `negative-externality-consumption.svg` ×2,
  `negative-externality-production.svg` ×2, `indirect-tax-pigouvian.svg`, `ad-as-long-run.svg`. Not fixed.

**Gates (logs `close-*.log`).** `npm test` 368/368 exit 0 · `npm run validate` exit 0, new-block 0 in every
section (tallies differ from `gate-validate.fix2.log` because other sessions changed staged bundles; all
lower) · `validate-model-answers.mjs` 0 findings · `npm run spec-coverage` market-failure 27/35 (was 23/35
in `post-spec-coverage.log`), no zerocov failure; exit 1 on 13 pre-existing tariff failures, none in
market-failure · `npm run build` exit 0; prerendered `econ-u1-market-failure.html` has the five bank
questions under `## Questions`. Dev server: listener on :3001 killed by port (`lsof -sTCP:LISTEN`; a bare
`lsof -ti tcp:3001` also lists the Claude app's network process, a client) and restarted from
`.claude/launch.json` `remediation-dev`; `close-curl.log`: all six pages identical to pre-change, the md
has no `## Questions`, the page serves (a)-(e) from the bank, the served SVG equals the file on disk.
