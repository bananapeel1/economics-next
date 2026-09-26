# Packet 12.85 — built (build phase, 26 September 2026)

Authoritative spec: `audit/specs/packet-12.85.md`. Design: `audit/specs/practice-redesign-v8-mockup.html`.
Nothing staged, nothing committed, nothing published. All nine ids claimed: `ledger.mjs claim 12.85 E065…E073`
(`ledger-after-claim.txt`: 9 claimed, 0 open). What is below is what was changed and what was measured, with
the width, theme and build each measurement was taken on. None of it is a verifier's confirmation.

**Where it was measured.** This worktree's :3001 belongs to another session, so every browser run used a
scratch copy of the worktree carrying this packet's files (`next dev` on :3086 for the page A/B, `next start`
of a production build on :3087 for the final sweep, contrast and behaviour runs), driven by headless Chrome
over CDP. The production build (`build.log`, exit 0, 174 pages) was also run in that copy, not in the
worktree. One data edit came after the final runs: the phrase ", as specification point 5b asks" removed from
one hidden segment note of `mf-essay-deposit-protection-moral-hazard-20` (E066, spec ids); validator 0
findings after it, the sweep was not re-run for it.

## E065 — one header, the paper's outline, two sheets
- `components/PracticeShell.jsx:739` one header: logo + "Revvy Learn" linking `shell.appHref`
  (`/?section=market-failure`, built at `components/SectionModelAnswersPage.jsx:442`), breadcrumb Economics /
  Unit 1 / 1.3.5, then the page's only `h1` (the `modelAnswersHeading` text, "— Exam Questions & Model
  Answers" removed whole below 1281px, never cut), Practise / Model answers, theme switch. `ShellPage`
  (`SectionModelAnswersPage.jsx:463`) no longer renders `SiteHeader`.
- Outline rail `PracticeShell.jsx:768`: Section A row, each section with number, command word, marks and state
  (blank / draft / answer seen / "3/4"), then the one total at `:813` "Your marks so far N of M marked · paper
  out of 74" (74 = the paper sections on the page, from the structure file). "More practice" sits below the
  total and is not counted (it is not part of the paper). Phone bar "All questions" `:767`; phone tabs
  Question paper / Source booklet `:841`; ←/→ `:567`, inert in text fields.
- Sheets: question paper, and for Section C the source booklet, sticky and scrolling inside itself ≥1181px
  (`practice-shell.css` `.psx-booklet`). The 12.8 E063 header-measuring code is gone with the header it
  measured; re-proved instead: at 1440x900 the booklet's bottom is at 872px of 900 and scrolls internally, and
  the page has no sideways scroll (`behaviour.log`). The page itself scrolls vertically, as v8 does.

## E066 — the paper's conventions
- Bold numbers "6 (a)", then "(b)"; marks "(6)" right-aligned (`PracticeShell.jsx` `Stem`); section heads
  "Section C" + "Data question · 34 marks"; Pearson's instructions from `lib/practice-shell.js:180-245`
  ("Answer ALL questions.", "Answer ALL parts.", "Answer ONE question from this section."); "(Total for
  Question 6 = 34 marks)" after part (e) (`SectionModelAnswersPage.jsx` `closing`).
- Ruled answer space by tariff, 2→4 … 20→24 lines (`SectionModelAnswersPage.jsx:320`), growing with the text
  (`practice-shell.css:194` `field-sizing: content` where supported; JS fit otherwise, `PracticeShell.jsx`
  `fitBoxes`). The marked answer is a ruled block that grows (`.psx-yours`, `PracticeShell.jsx:947`).
- DM Sans 16 / 13 / 20, key term in DM Serif Display italic; grep of the new CSS/JSX for monospace,
  uppercase, ellipsis: none. Team copy gone: served text of the page has 0 × "AO1/AO2/AO4", "ECON-",
  "Standalone", "Saved in this browser"; one quiet "Saved".

## E067 — up to 8 marks in Pearson's format
- Every point-marked 1.3.5 criterion's `band` is now Pearson's heading ("Knowledge 2", "Application 2",
  "Analysis 2", "Evaluation 2"; "Knowledge 1"/"Application 3" for Draw and Calculate, matching the SAM's Q7/Q10
  splits); marks and points unchanged. Test `lib/practice-shell.test.mjs` "E067: every point-marked…".
- `mf-extract-examine-bag-charge-optimum-8` (`data/modelAnswersExpansion.js:457`): checked, holds as
  K2·A2·An2·E2; only its band LABELS changed ("AO1 — knowledge (2 marks)" → "Knowledge 2").
- `negative-externality-tax-8` (`:674`): the four-level ladder re-expressed as K2·A2·An2·E2 from the same
  eight points and segments (c7, c8 stay `missed`: the script makes no assessment); `markScheme` rows (`:693`),
  six segment notes, the commentary and `likelyScore` ("6 / 8") say the same. Verdict "K2 · App2 · An2 = 6/8".
- Exemplar `PracticeShell.jsx:359`: margin letters per paragraph (earned objectives, and "E missed" where only
  missed criteria point), verdict line, examiner's comment. "See it" (`:260`, note text `:339`): "You made this
  point." (solid underline) / "You missed this point. This is how the model answer earns it." (dashed) —
  words and line style, not colour alone. Booklet figure clicked while writing is quoted at the cursor;
  otherwise figures link both ways (`onFigure`).

## E068 — 14 and 20 marks by levels
- `audit/raw/ial-paper-structure.json:24` `economics_levels`: 14 = KAA 8 (1-3, 4-6, 7-8) + E 6 (1-2, 3-4, 5-6);
  20 = KAA 12 (1-3, 4-6, 7-9, 10-12) + E 8 (1-3, 4-6, 7-8), source cited (WEC11 SAM Q12(e) p.39, Q13-14
  pp.41-43). Checked against `audit/raw/ial-econ-levels.json` (verbatim SAM extraction): same edges in
  WEC11-14; the SAM misprints 20-mark E Level 3 as "5-8" for Q13 and WEC13/14 (overlapping Level 2) — noted in
  the file; 7-8 used (WEC11 Q14 and the spec). Descriptors are our own words: longest word run shared with any
  Pearson descriptor is 3 words ("of the question").
- `lib/ial-paper.js:104` `levelsFor`, `bandOf`. Item shape `levels: { strands: [{ strand, indicative }] }` +
  `verdict: [{ strand, level, mark }]`; segments carry `strand`.
- Re-expressed, criteria removed: `mf-extract-evaluate-soft-drinks-excise-20` (`:553`, verdict KAA L3 (8) ·
  E L3 (6) = 14/14), `mf-essay-deposit-protection-moral-hazard-20` (`:1243`, L4 (12) · L3 (8) = 20/20),
  `market-failure-government-intervention-20` (`:812`, L4 (11) · L3 (7) = 18/20). The brief's flagged tension
  (the generic essay was AO1 4/AO2 4/AO3 6/AO4 6) is resolved by the SAM's own strand definitions: KAA is
  knowledge + application + analysis, so c1-c13 became KAA indicative content, c14-c17 Evaluation; no answer
  sentence changed. Its `markScheme` (`:829`), `likelyScore` ("18 / 20") and commentary (why not full marks:
  the four government-failure points are stated, not weighed) were brought into line. Verdicts are for Verify
  A to read against the descriptors.
- Validator R14 (`audit/scripts/validate-model-answers.mjs:227`), R5 accepts `levels` (`:139`). A/B:
  `r14-ab.sh` → `r14-ab.log`: control 0 findings, 15 mutations each ≥1 R14 finding, restored control 0.
- Shell: level rows with a "Level n" button, then a mark within it, one running total (`:284`); "What
  examiners look for". `lib/ai…`/`lib/ao-spec.js` untouched (12.86).

## E069 — essay choice, Draw, Section A
- Section D opens with both essays and "Answer ONE question…"; picking counts only that essay, the other is
  dimmed in the outline and shows no answer box (`PracticeShell.jsx:873`); Model answers shows both.
- Draw: "Draw this on paper." then marked against its points and the model diagram
  `/diagrams/positive-externality-consumption.svg` (the 12.8 E082-fixed file). Diagram check: the served page
  contains none of the four 12.88 files (0 hits each for negative-externality-consumption, -production,
  indirect-tax-pigouvian, ad-as-long-run).
- Section A row (`lib/practice-shell.js:261`): "Six 1-mark questions.", link "Open Market Failure in the app",
  "The quiz is in the topic's Quiz tab (without Pro you see a short preview)."

## E070 — paper by default, dark only by choice
- ThemeProvider (`components/ThemeProvider.jsx:21-25`) writes `localStorage.theme` on every mount, default
  included, so it cannot tell a choice. The shell carries its own `data-theme` (light unless
  `rl:practice:theme` = dark, `PracticeShell.jsx:50`); the switch (`:720`) records the choice and writes the
  site key through `toggleTheme`. `rl-night` and `resource-page` dropped from the shell page wrapper.
  Behaviour run: paper with `localStorage.theme=dark` preset; switch → dark|dark|dark; reload keeps dark.
- Colour only from globals.css tokens (aliases at `practice-shell.css:22-55`); `colour-literal-grep.txt`:
  no hex/rgb/hsl in `practice-shell.css` or `PracticeShell.jsx`.
- `contrast.md` / `contrast.json`: rendered-pixel method, 9 states, 1440 and 390, 642 text elements per theme,
  0 below 4.5:1 (lowest 5.24 light, 4.81 dark).

## E071 — every model-answer page
- Default path (`SectionModelAnswersPage.jsx:590, 649`): counts line, time-estimate note and `CoveragePanel`
  removed (function deleted); the data-response card and the gradient CTA each become one quiet link line
  (`model-answers-layout.css:171`). Shell page: all of it gone; one quiet app line under the paper.
- The 1.3.5 subtitle is no longer on the page; its substance (section number, annotated model answers,
  externalities, public goods, merit goods, market failure) is already in the page's meta description, so the
  description is unchanged.
- JSON-LD, title, canonical, description and og tags byte-identical on all 32 pages, dev render before vs
  after (`head-cmp.py` → `head-cmp.log`, 0 pages differ).

## E072 — nothing leaks, nothing lost, nothing cut
- Leak check, all 13 questions in Practise before marking: 0 visible mark-scheme/level/indicative/model-answer
  elements; all 13 mark schemes and exemplars are in the DOM; with JavaScript disabled 13 questions + 26
  blocks show (`behaviour.log`, 36/36 pass, 0 console errors, production build, 1440 and 390).
- Drafts: key `rl:attempt:v1:<id>` and record kept; extended with `levels` (`lib/attempt-storage.js:37`),
  test "E072: the attempt record is extended…".
- Text fit: `text-fit.json` from `audit/scripts/text-fit-sweep.js` (unchanged, VCLIP included) driven by
  `sweep-run.mjs` + `sweep-states.js`, 320-1920px step 5, production build: broken run (fixed-height marked
  answer injected) fails 321/321 widths with VCLIP; paper 4,494 checks and dark 4,494 checks over 14 states,
  0 failures; each state's signature recorded. Found and fixed on the way: the levels table bled 11px at 320
  in a narrow column (now stacks under 440px of its own width); a draft textarea hid 32px at 1180 when the
  width changed (fixed by `field-sizing: content`).
- Other 31 pages: `page-ab.py` → `page-ab.log`/`page-ab.json`: 31 pages, every differing hunk is one of E071's
  blocks, 0 outside; control `page-ab-control.log` (two injected non-E071 changes) → 2 violations.

## E073 — the logo
- `public/logo.svg`: 1,725,827 → 20,901 bytes, an SVG wrapping a 128px PNG rendered from the original by
  headless Chrome. `logo/compare-1x.png`, `logo/compare-2x.png` (old/new, 18/24/28/30px, light and dark
  grounds); `logo/pixel-diff.txt`: mean |diff| 3.0-4.1 of 255 at 18-60px, max 56 (edge anti-aliasing).

## Gate commands run (this worktree unless stated)
`npm test` 404/404 (`test.log`; `lib/mid-band-answer.test.mjs` updated: the generic essay is no longer
AO-split). `npm run validate` exit 0 (`validate.log`). `npm run build` exit 0 in the scratch copy
(`build.log`). `npm run spec-coverage`: output identical before/after (`spec-coverage-before.log`,
`-after.log`); it exits 1 on 13 pre-existing section_practice tariff rows, unchanged. `exposure` and
`recalls` not run (no section content touched).
