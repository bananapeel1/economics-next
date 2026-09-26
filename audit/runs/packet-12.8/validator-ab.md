# Packet 12.8, E057 — validator A/B mutation proof (fix round 1)

Written by fix round 1. The round-0 run left only `validator-ab.log`; this file is the one the spec
asks for. Reproduce with `bash audit/runs/packet-12.8/validator-ab.sh` (it rewrites
`validator-ab.log`; every mutated file is restored from a byte copy and its sha256 checked, the script
exits 2 on a failed restore).

**What was measured.** Each row applies one hand-written mutation to the real files
(`data/modelAnswersExpansion.js`, `data/modelAnswersData.js`,
`content/data-response/econ-u1-market-failure.md`), then runs two validators on the same tree:

- **A**: `validate-model-answers.round0.mjs`, a frozen copy of the validator as it stood before fix
  round 1 (imports re-pointed, logic unchanged).
- **B**: `audit/scripts/validate-model-answers.mjs`, current.

The "diff" column counts changed lines between the mutated file and its backup, measured with `diff`
and not by either validator, so a mutation that failed to apply shows as 0 and cannot pass as "A saw
nothing". Findings text for every B run is in `validator-ab.log`.

| # | Mutation | diff data / md | A (round 0) | B (current) |
|---|---|---|---|---|
| 1 | control (no mutation) | 0 / 0 | 0 finding(s) | 0 finding(s) |
| 2 | R13 V1: sixth question '**Question (f) (20 marks)** — …' in ## Questions (verifier's example) | 0 / 2 | 0 finding(s) | 2 finding(s): R13 |
| 3 | R13 V2: heading-style sixth question in ## Questions | 0 / 4 | 0 finding(s) | 3 finding(s): R13 |
| 4 | R13 V3: two-line sixth question in ## Questions | 0 / 4 | 0 finding(s) | 3 finding(s): R13 |
| 5 | R13 V4: sixth question as a numbered list line, the word 'Question' absent | 0 / 2 | 0 finding(s) | 1 finding(s): R13 |
| 6 | R13 V5: a second ## Questions section at the end of the file | 0 / 4 | 0 finding(s) | 3 finding(s): R13 |
| 7 | R13 V6: a sixth question in prose under another heading | 0 / 4 | 0 finding(s) | 1 finding(s): R13 |
| 8 | R13 V7: Question (b) stated twice | 0 / 2 | 1 finding(s): R13 | 2 finding(s): R13 |
| 9 | R13 V8: model-answer heading states (d) at 6 marks | 0 / 2 | 0 finding(s) | 1 finding(s): R13 |
| 10 | R13 V9: a sixth model answer heading | 0 / 4 | 0 finding(s) | 2 finding(s): R13 |
| 11 | R10 V10: every data-question part's paper field removed (shorts and essays keep theirs) | 5 / 0 | 0 finding(s) | 2 finding(s): R10,R13 |
| 12 | R11 V11: every short answer's paper field removed | 25 / 0 | 0 finding(s) | 1 finding(s): R11 |
| 13 | R12 V12: every essay's paper field removed | 10 / 0 | 0 finding(s) | 1 finding(s): R12 |
| 14 | R13 V13: every paper field on the page removed (page no longer opts in; the lettered md still does) | 40 / 0 | 0 finding(s) | 1 finding(s): R13 |
| 15 | R10 A: part (b) removed from the data question -> multiset 2,6,8,14 | 1 / 0 | 2 finding(s): R10,R13 | 5 finding(s): R10,R13 |
| 16 | R10 B: part (d) on another extract | 2 / 0 | 1 finding(s): R10 | 1 finding(s): R10 |
| 17 | R10 C: two parts lettered (a) | 2 / 0 | 4 finding(s): R10,R13 | 8 finding(s): R10,R13 |
| 18 | R13 A: md states (d) as 6 marks | 0 / 2 | 1 finding(s): R13 | 1 finding(s): R13 |
| 19 | R13 B: md (e) wording differs | 0 / 2 | 1 finding(s): R13 | 1 finding(s): R13 |
| 20 | R13 C: md has no Question (c) | 0 / 2 | 1 finding(s): R13 | 1 finding(s): R13 |
| 21 | R13 D: md numbers a question instead of lettering it | 0 / 2 | 2 finding(s): R13 | 3 finding(s): R13 |
| 22 | R9 A: the 14-mark part labelled Evaluate | 2 / 0 | 1 finding(s): R9 | 1 finding(s): R9 |
| 23 | R9 B: the Draw item names a diagram that is not on disk | 2 / 0 | 1 finding(s): R9 | 1 finding(s): R9 |
| 24 | R11: four short answers instead of five | 5 / 0 | 1 finding(s): R11 | 1 finding(s): R11 |
| 25 | R12: one essay offered instead of two | 5 / 0 | 1 finding(s): R12 | 1 finding(s): R12 |
| 26 | control after every restore | 0 / 0 | 0 finding(s) | 0 finding(s) |

## Reading it

- **The verifier's holes (V1-V13).** A reports 0 findings on twelve of the thirteen (every row but
  V7); B reports at least one on all thirteen. V7 (a part stated twice) A half-caught already, through
  the wording check on whichever copy its map kept; B names the duplicate itself.
- **Which part of B catches which.** V4 (a sixth question as a numbered list, no word "Question") is
  caught only by the strict `## Questions` parser; V6 (a sixth question in prose under another
  heading) only by the whole-file token scan. Each of the two methods is load-bearing on at least one
  row the other misses.
- **V13, a page stripped of every `paper` field.** The page no longer opts in, so R10-R12 have nothing
  to run on; B's one finding comes from the file side: the md is lettered (a)-(e), and no opted-in
  page's data question names it.
- **Round-0 mutations (R10 A-C, R13 A-D, R9 A-B, R11, R12).** B finds everything A found; where B's
  count is higher, the extra findings are the model-answer-heading and token-scan checks naming the
  same drift a second time.
- **Controls** (first and last rows): 0 findings from both, before any mutation and after every
  restore.

## Not covered (named, not claimed)

- A page reverted to the pre-packet shape in BOTH places (every `paper` field removed AND the md
  renumbered `Question 1..3`) is indistinguishable from any of the other unconverted pages, by design:
  `paper` is an opt-in, like R1-R8's `criteria`. No row above tests it and none could pass.
- A sixth question that never calls itself a question and sits outside `## Questions` (plain prose,
  no "Question" token) is not detected. The shell and the data-response page do not present such a
  line as a question either.
- Measured: this validator on this tree, 26 Sep 2026. Not measured: the rendered data-response page.

## Fix round 2 (E057): a tariffed task that never says "question"

**Correction to the round-1 "Not covered" note above.** Its second bullet said the data-response page
does not present such a line as a task. That was not measured and is false: `page.jsx` renders the
whole md file, so a sixth tariffed task renders (verifier, round 2). That bullet is withdrawn.

**Change.** `mdStrayTariffs` (a third R13 view, keyed on neither the word "question" nor any heading):
every tariff (`(20 marks)`, `20 marks`, `20-mark`, `(twenty marks)`, bare `(20)`, `[20]`) and every
part label (`(f)`, `(ii)`) anywhere in the file is a finding, except the `**Question (x) (n marks)**`
prefix of the bank's question lines and the bank's `### Question (x) (n marks)` headings, which are
blanked before the scan. Markup, tags and `&#40;`-style entities are flattened first, line numbers
kept; a tariff split over a line break is still one token. Bank-side twin (rule 4): R9 now fails a
paper item whose `question` or `paper.context` states a tariff, since the shell prints the tariff
from `marks`.

**First shown failing on real content.** Before any rewording, the new check found 3 prose tariffs
in the shipped md (`gate-validate-ma.fix2-before-reword.log`): line 46 "Two marks", line 54 "4 marks",
line 92 "20-mark", all in examiner notes. They were reworded in the md AND in the bank twin
(`examinerCommentary` in data/modelAnswersExpansion.js), meaning unchanged; `drift-check.mjs` reports
the examiner notes still equal (`drift-check.fix2.log`).

**Harness.** A third column: A1 = `validate-model-answers.round1.mjs`, a frozen copy of the round-1
validator taken from the git index (import paths re-rooted). New rows V14-V29.

| Row | md diff | A0 | A1 | B |
|---|---|---|---|---|
| V14 `## Extension task` + `**(f) (20 marks)** — …` (verifier) | 4 | 0 | 0 | 2 |
| V15 `**Extension (20 marks):** …` (verifier) | 2 | 0 | 0 | 1 |
| V16 table row `\| (f) 20 marks \|` (verifier) | 4 | 0 | 0 | 2 |
| V17 `(twenty marks)` | 2 | 0 | 0 | 1 |
| V18 bare `(20)` | 2 | 0 | 0 | 1 |
| V19 `[20]` | 2 | 0 | 0 | 1 |
| V20 `20-mark task` in Common Mistakes | 2 | 0 | 0 | 1 |
| V21 `(**20** marks)` | 2 | 0 | 0 | 1 |
| V22 tariff split over a line break | 3 | 0 | 0 | 1 |
| V23 `&#40;20 marks&#41;` | 2 | 0 | 0 | 1 |
| V24 tariffed task in `## Stimulus` | 2 | 0 | 0 | 1 |
| V25 `(ii)` part label, no tariff | 2 | 0 | 0 | 1 |
| V26 `(f)` part label, no tariff | 2 | 0 | 0 | 1 |
| V27 task appended to (e)'s md line AND the bank's (e) question (wording still equal) | 2 (+2 data) | 0 | 0 | 3 (R9, R13) |
| V28 tariffed task appended to a short answer's `paper.context` | 0 (+2 data) | 0 | 0 | 1 (R9) |
| V29 RESIDUAL: untariffed, unlettered imperative under a new heading | 4 | 0 | 0 | 0 |

V1-V13 and the round-0 rows: B finds at least what A1 found on every row. Both controls 0 on all
three validators. Full per-finding detail in `validator-ab.log`.

**Not covered, after round 2 (named, not claimed).** V29: a task with no tariff and no part label is
prose to every check here; the page renders it, but nothing on it says it is a task. A tariff stated
as a three-digit bare number `(100)` or a fraction `/20` is not in the token set. Consequence for
authors, now in the validator's comment: prose names a part by its letter, never by its tariff.
Footprint on the other five data-response files (a grep, not the validator): each states about one
tariff per question slot, one (`bus-u1-marketing-mix.md`) one more, so each retrofit meets at most
one prose reword. Measured: this validator on this tree, 26 Sep 2026. Not measured: the rendered page.

---

## Close-out (E057, 26 Sep 2026): single source, structural R13

**What changed, and why the arms race stops.** Rounds 1-2 tried to detect every spelling of a sixth task in
the md. The orchestrator ruled the class is "the data-response page can state questions the bank does not",
closed by SINGLE SOURCE:
- `app/data-response/[slug]/page.jsx` renders a bank-backed slug's Questions section FROM THE BANK (items with
  `paper.kind === 'data_question'` and `stimulus === slug`; part letter, tariff, stem; part order), as the same
  markdown the file used to carry, spliced immediately before `## Model Answers`. Stems are CommonMark
  backslash-escaped, so they render as text. A slug with no bank data question is passed through untouched.
- `content/data-response/econ-u1-market-failure.md` no longer has a `## Questions` section.
- R13 is now structural, parsed with the page's own markdown pipeline (unified + remark-parse + remark-gfm, what
  react-markdown runs): (a) no `## Questions`; (b) one H1, H2s only from Stimulus / Model Answers / Common
  Mistakes / Diagram Reference, each once, no sub-heading outside Model Answers; (c) Model Answers headings are
  exactly `### Question (x) (n marks)` for the bank's parts, same letters, tariffs and order. Also: a stimulus
  claimed by two pages is a finding (the page would merge them), and the file-side check (a lettered file
  no page claims) is kept on the parsed outline.
- Deleted: `flattenKeepingLines`, `mdStrayTariffs`, `PART_RE`, `mdQuestions`, `mdQuestionSectionCount`,
  `mdAnswerHeadings`, `mdQuestionMentions`, `mdSections`, `sameWords` (nothing else imported them; grep over the
  repo outside `audit/runs/`). `TARIFF_RE` is kept: R9's bank-side twin uses it. R9's cross-line tag strip
  `/<[^>]*>/` is replaced by `stripTags` (`/<[A-Za-z\/!][^<>\n]*>/`: a tag starts with a letter, `/` or `!`
  and never crosses a line or another `<`). Frozen pre-close-out copy: `validate-model-answers.round2.mjs`.

**Method (different from the builder's rounds 1-2 harness).** `closeout-ab.mjs` mutates a clone of the whole
worktree in the scratchpad (APFS `cp -c`, never the worktree) and runs the real validator CLI end to end
(`--json`); bank mutations are spliced into the clone's `MODEL_ANSWERS` export, md mutations edit the clone's
file. Every mutation is sha-checked as applied; the clone is restored and sha-checked after the run.
B = close-out validator; A2 = frozen round-2 validator, only its R9 count (its R13 expects the md
`## Questions` that is now gone). Output: `closeout-ab.log`.

| # | mutation | applied (sha) | B close-out findings | A2 round-2 R9 | B first finding |
|---|---|---|---|---|---|
| C0 | control: unmutated clone | - | 0 | 0 |  |
| Ma1 | (a) md carries "## Questions" again (one bank question line) | md efe3a21e876a | R13(a)×1 | 0 | R13 (a) econ-u1-market-failure.md:26 carries its own "## Questions"; the page renders the questions from the bank's data-question items, so the file must not state them |
| Ma2 | (a) md carries "## questions" (lower case), empty | md 8be518113a6b | R13(a)×1 | 0 | R13 (a) econ-u1-market-failure.md:26 carries its own "## questions"; the page renders the questions from the bank's data-question items, so the file must not state them |
| Mb1 | (b) new H2 "## Extension task" with a (f) (20 marks) task | md d77678b2a67e | R13(b)×1 | 0 | R13 (b) econ-u1-market-failure.md:82 has H2 "## Extension task", which is not one of "Stimulus", "Model Answers", "Common Mistakes", "Diagram Reference"; the page renders |
| Mb2 | (b) setext H2 "Extension task\n---" (no # at all) | md ce7e99361004 | R13(b)×1 | 0 | R13 (b) econ-u1-market-failure.md:82 has H2 "## Extension task", which is not one of "Stimulus", "Model Answers", "Common Mistakes", "Diagram Reference"; the page renders |
| Mb3 | (b) H3 "### Extension (20 marks)" inside Common Mistakes | md a8dc1105bc07 | R13(b)×1 | 0 | R13 (b) econ-u1-market-failure.md:88 has a sub-heading "### Extension (20 marks)" outside "## Model Answers"; only the model answers are headed below H2 |
| Mb4 | (b) "## Diagram Reference" repeated | md e2c4567a06ad | R13(b)×1 | 0 | R13 (b) econ-u1-market-failure.md:96 repeats "## Diagram Reference" (first at line 88) |
| Mb5 | (b) second H1 "# Question (f) (20 marks)" at the end | md 52b6e14f1b63 | R13(b)×1 | 0 | R13 (b) econ-u1-market-failure.md:96 has a second H1 "# Question (f) (20 marks)"; the file has one title |
| Mb6 | no-fire control: "## Extension" inside a fenced code block (the page renders code, not a heading) | md 5d2ef2b29f5a | 0 | 0 |  |
| Mc1 | (c) extra "### Question (f) (20 marks)" in Model Answers | md 451872a0af5f | R13(c)×1 | 0 | R13 (c) econ-u1-market-failure.md:82 heads Question (f) (20 marks), which no bank data-question item carries |
| Mc2 | (c) heading tariff drift: (e) headed at 20 marks | md 1a28e40a398f | R13(c)×1 | 0 | R13 (c) econ-u1-market-failure.md:66 heads Question (e) at 20 marks; the bank's mf-extract-evaluate-soft-drinks-excise-20 is 14 |
| Mc3 | (c) (c) and (d) headings swapped in order | md 5df48742ebcc | R13(c)×1 | 0 | R13 (c) econ-u1-market-failure.md "## Model Answers" heads the parts in the order a, b, d, c, e; the bank's order is a, b, c, d, e |
| Mc4 | (c) the (b) heading removed | md 87cd27a0745e | R13(c)×1 | 0 | R13 (c) econ-u1-market-failure.md "## Model Answers" has no "### Question (b) (4 marks)" for mf-extract-explain-tobacco-social-cost-4 |
| Mc5 | (c) "#### Question (f) (20 marks)" (H4) under Model Answers | md 3e370a0e09ba | R13(c)×1 | 0 | R13 (c) econ-u1-market-failure.md:82 "#### Question (f) (20 marks)" under "## Model Answers" is not "### Question (x) (n marks)" for a bank part |
| Mc6 | (c) "### Question (b) (4 marks)" twice | md 5cf78c9ca335 | R13(c)×1 | 0 | R13 (c) econ-u1-market-failure.md:82 heads Question (b) a second time |
| Mc7 | (c) heading in emphasis markup "### Question (f) (**20** marks)" (parsed text, not raw) | md dd87e58801ef | R13(c)×1 | 0 | R13 (c) econ-u1-market-failure.md:82 heads Question (f) (20 marks), which no bank data-question item carries |
| Bk1 | bank: a part (f) added (copy of (e), 20 marks, stimulus unchanged) | bank 08a1d46ad07f | R9×3 R1×1 R10×1 R13(c)×1 | 3 | R9 20 marks is not a data-question tariff of WEC11/WEC12 (2, 4, 6, 8, 14) |
| Bk2 | bank: (e)'s tariff changed 14 -> 20 | bank 488a63f2d664 | R9×2 R1×1 R10×1 R13(c)×1 | 2 | R9 20 marks is not a data-question tariff of WEC11/WEC12 (2, 4, 6, 8, 14) |
| Bk3 | bank: (b) and (d) tariffs swapped (multiset unchanged, so R10 stays quiet) | bank 2f7c14ff9a69 | R9×2 R1×2 R13(c)×2 | 2 | R9 Explain is not a command word for 8 marks in section C (Examine) |
| Bk4 | bank: (c) stem edited (single source: nothing to drift, validator silent; page shows it, see page A/B) | bank a99d64f6d817 | 0 | 0 |  |
| Bk5 | bank: every paper field stripped (file-side R13) | bank e2ca147d9590 | R13×1 | 0 | R13 econ-u1-market-failure.md letters its questions to the paper layout, but no page's data question claims it, so its page renders no questions; bank items naming it: ec |
| Bk6 | bank: a second page claims the same stimulus (1.3.5 parts copied to section 9.9.9) | bank 3cca0c796a1c | R11×1 R12×1 R13×1 | 0 | R11 short answers are none; WEC11/WEC12 sets 5 × 4 |
| T1 | R9 tag strip: short-answer context "(0 < |PED| < 1)" prose, then (20 marks), then a later ">" line | bank b241b2d928b3 | R9×1 | 0 | R9 paper.context states a tariff "20 marks"; the shell prints the tariff from marks, so this reads as a second task |
| T2 | R9 no-fire control: the same "(0 < |PED| < 1)" and ">" prose with no tariff | bank 5c67f5c798d7 | 0 | 0 |  |
| T3 | R9 no-fire control: a real tag is still stripped (<span title="(20)">, whose attribute alone would match) | bank de226f72a823 | 0 | 0 |  |
| T4 | T3 with the tag unstripped (attribute text in the prose) fires, so T3 is not blind | bank 742ecaa51149 | R9×1 | 1 | R9 paper.context states a tariff "(20)"; the shell prints the tariff from marks, so this reads as a second task |
| R1 | STATED RESIDUAL: a tariffed task as free prose inside Common Mistakes | md cdaecb069d32 | 0 | 0 |  |
| C1 | control after every restore | - | 0 | 0 |  |

Every one of (a), (b) and (c) fires on its own mutation; Mb2 (a setext `---` H2) and Mc7 (`(**20** marks)`
inside a heading) are cases a line regex would miss and the parser does not. Mb6 is the no-fire control: a
`## …` line inside a code fence is code on the page, and the parser does not call it a heading. A bank
part added (Bk1) or a bank tariff changed (Bk2, Bk3) makes (c) fire; Bk3 keeps the tariff multiset, so R10 is
silent and (c) is what sees it. **R9 tag strip A/B:** T1 (`(0 < |PED| < 1)` prose, then `(20 marks)`, then a
later `>` line): round-2 validator 0 R9 findings, close-out 1. T2 (same prose, no tariff) 0/0: no false
positive from the `<`. T3 (a real `<span title="(20)">`) 0: real tags are still stripped; T4 (the same `(20)`
as prose) fires, so T3 is not blind.

### The rendered page (A/B on a real server)

`page-ab.sh`: `next dev` on :3007 in the clone, restarted for each case (Turbopack serves stale output), curl
of all six `/data-response/*` pages. Compared with the six pages curled from :3001 BEFORE any close-out
edit (the dev server there started 13:43; every file those pages read was last modified before that).
Comparison with `<script>` and `<link>` tags stripped (dev chunk names and build ids differ between the two
servers; nothing else was normalised):

| case | econ-u1-market-failure | other five pages |
|---|---|---|
| P0 close-out code, unmutated | **identical** to before (the bank-rendered Questions section is byte-identical to the md-authored one) | identical, all five |
| P1 bank (c) stem "is likely to correct" → "is likely to reduce" | exactly one line changes: the (c) question paragraph shows "reduce" | identical |
| P2 bank part (f) added (20 marks) | one paragraph added: `<strong>Question (f) (20 marks)</strong> — Evaluate the case for a sugar-content tax.` after (e) | identical |
| P3 bank (a) stem gets `*two* <b>examples</b> [link](http://x) and 1. a # hash` | rendered as literal text (`*two* &lt;b&gt;…`), no emphasis, tag, link or list | identical |

So a bank stem edit changes the rendered page, a bank part appears on the page with no md edit (and (c) then
fires until its model answer is written), and the other five pages are unchanged.

**Unmutated tree:** `node audit/scripts/validate-model-answers.mjs` → 0 findings, exit 0 (`close-validate-ma.log`).

### STATED RESIDUAL

Free prose inside the allowed sections — the stimulus text, the model-answer bodies, Common Mistakes and
Diagram Reference — is **not** mechanically scanned for extra tasks. Row R1 above is the proof: a
`**Extension (20 marks):** Evaluate …` paragraph inside Common Mistakes gives 0 findings and the page renders
it. Whether a paragraph reads as a task is a semantic question for review, not a validator rule; the rounds
1-2 scan that tried to answer it by regex is withdrawn. What the structure does guarantee: the page's
Questions section is the bank's, and no heading anywhere in the file can introduce another question.
