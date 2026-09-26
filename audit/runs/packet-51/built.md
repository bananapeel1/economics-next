# Packet 51 — built (poverty-inequality, IAL Economics 4.3.4, WEC14)

Build phase, 26 September 2026. **Staged to `draft`, not published, not committed.** Each "passes" below
names the command that produced it. Nothing here has been walked in Learn Mode or on a phone. Verify B
has not run, and neither has Verify A. `npm run build` was NOT run (see "Not done").

## What was built

`poverty-inequality` is rebuilt to **4.3.4 and only 4.3.4**. Source: `audit/raw/econ_spec.txt:1788-1817`,
read directly (heading `:1788`, 1 Poverty `:1792`, 2 Inequality `:1802`, 2e `:1815`, 2f `:1816-1817`).
The oracle has 24 rows and 21 leaves (`spec-items.json`, topic 4.3.4), and the runner asserts both counts.
The runner's validator pass (`spec.coverage`) finds **21 of 21 leaves evidenced**.

| | live (`data`, unchanged) | staged (`draft`) |
|---|---|---|
| blocks / subsections | 2 / 4 | 7 / 24, in the spec's own 1a…2f order |
| recalls | 0 | 24: 7 fill-in, 5 reorder, 6 match, 6 classify; 0 `recall.recoverable` |
| quiz / practice | 10 (key longest in 8) / 5 ("Define the difference", "Outline") | 30 (3 unpinned pre-test; key uniquely longest in 5; positions 8/8/7/7) / 10 |
| diagrams | 3, one pinned | 7 (12 views), one per block, each pinned by `diagramId` |
| flashcards / mistakes / extras | 18 / 3 / 4 chains + 4 eval | 32 / 7 / 4 chains + 3 eval |
| validator, this section | 11 BLOCK / 26 DEBT | 0 BLOCK / 1 DEBT (`quant.unit`, baselined, carried) |

Chapters: (1) Absolute and Relative Poverty (1a, 1b) · (2) Causes of Changes in Poverty: Growth, Skills,
Benefits and Tax (1c-1..4) · (3) … Structural Change, Aid and Conflict (1c-5..7) · (4) Measuring Inequality
(2a, 2b) · (5) Causes of Inequality (2c: income within, wealth within, between countries) · (6) The Impact
of Inequality (2d, one subsection per bullet, with enterprise and incentives together) · (7) Development,
Economic Change and Capitalism (2e, 2f). The seven chapters are the ceiling: 3 pre-test items + 7 check-in
items = FREE_QUIZ_MAX 10. `?draft=1` served exactly 10 quiz items.

The spine is one fictional economy, Marenda (`_packet51-util.mjs:98`). It has ten deciles of $/day
incomes, so the headcounts, the median and relative line, the poverty gap, every Gini (0.39, 0.49 after
top-pull, 0.65 for wealth), the benefit, aid and war cases and the compounding figures are all computed
there. The runner (§3) recomputes them a second way, with its own trapezium Gini and its own counting.

## Files

New files:
- `scripts/_packet51-util.mjs`: spine :98, the poverty-line source :188, bans :203, pointers :217.
- `scripts/_packet51-content.mjs`: 24 subsections :49-:858, `BLOCK_PLAN` :860, `LEAF_MAP` :944, `NOTES` :974.
- `scripts/_packet51-assessment.mjs`: `QUIZ` :45, `PRACTICE` :159, `FLASHCARDS` :195, `MISTAKES` :234,
  `EXTRAS` :273.
- `scripts/_packet51-diagrams.mjs`: diagrams :116-:368, `DIAGRAMS` :397.
- `scripts/packet-51-poverty-inequality.mjs`: the runner, §1-§12.
- `audit/snapshots/2026-09-26-pre-packet-51__economics__poverty-inequality.json`: the t=0 snapshot of all
  8 LIVE tables, taken before any write. It includes the 2.9/2.91 pins that were published 25 Sep. The
  older `audit/content-sections/` file predates those pins.
- `audit/snapshots/packet-51-bundle__economics__poverty-inequality.json`: the bundle.
- Run files in this folder.

## Per ledger id (23 claimed, 0 wont-fix)

| id | what changed | where |
|---|---|---|
| topFix-01 | Body subsections added for every leaf the item names:<br>• income vs wealth: content :394<br>• measures of poverty, with headcount, poverty gap and MPI taught inside 1b: :79, :113<br>• causes of changes in poverty (seven subsections): :155-:357<br>• between countries: :572<br>• Kuznets and economic change: :768, :798<br>• capitalism: :828 | content; runner §5 leaf map |
| topFix-02 | `absolute-relative-poverty` is rebuilt so relative poverty is tied to the median, and body[3] states "not the same thing as inequality" (:49).<br>• The flow no longer runs growth → relative poverty; the real example no longer says "relative inequality".<br>• The block takeaway is rewritten (:860).<br>• Mistake 1 and the misconception refute the conflation.<br>• Diagram 1, view 2, shows it from the spine: Gini 0.39→0.49 with relative poverty still 30%. | content :49, :860; assessment :234; diagrams :116; runner §2 (conflation check, A/B'd on the live sentence) |
| topFix-03 | The bank is rebuilt, 30 items.<br>• Key uniquely longest in 5 of 30 (`quiz-probe.log`, read from the DB draft column).<br>• No joke distractors.<br>• No stem/option shared "within a country".<br>• The "primarily in developed countries" explanation is gone (runner asserts). | assessment :45; runner §6 |
| topFix-04 | Clause by clause:<br>(a) Lorenz→Gini reorder, ranking → area ratio (content :420).<br>(b) Gini fill-in on the endpoints zero/one and A÷(A+B) (:462).<br>(c) Fill-in on the two poverty definitions (:49).<br>(d) Diagram hooks: every block pins its own diagram by **`diagramId`**. `diagramRef` is the legacy string pin, and the runner asserts it is absent. The Lorenz diagram is pinned to chapter 4 (2b) and the Kuznets diagram to chapter 7 (2e). The item's "content[0]"/"content[1]" referred to the old two-block layout. | runner §4, §8 |
| topFix-05 | Poverty line is $3.00 at 2021 PPP, with its source (util :188). The source was checked by web search: the World Bank factsheet "June 2025 Update to Global Poverty Lines".<br>• The US 91%/37% top-rate and CEO-pay example is **deleted** (Layer 4), not corrected.<br>• Practice above 6 marks is levels-only.<br>• No "Define the difference", no Outline (runner §7). | util :188; content :79; assessment :159 |
| accuracy-01 | $3.00 at 2021 PPP in content :79, flashcards and notes. $2.15, "2017 PPP" and "2022 PPP" are banned everywhere (util :203). The runner requires the line to be stated with its source, and allows a year only in that source. | runner §2, §9 |
| accuracy-02 | Same fields as topFix-02. "Relative inequality" is banned. | as topFix-02 |
| quiz-01 | Same evidence as topFix-03: the length tell is 5/30 and the histogram is 8/8/7/7. | `quiz-probe.log` |
| structure-01 | 24 recalls, all four types, each carrying `why`/criterion/hints/distractors per the recall contract. | runner §8 |
| structure-02 | Every block has `diagramId`, `quizIndices` and `practiceIndices`. `draft-readback.log` shows `?draft=1` serves each block's own first quiz item. | runner §4 |
| structure-03 | Kuznets, between-country causes, civil war and capitalism are each taught in prose (runner asserts).<br>• No quiz or flashcard term is untaught (runner KEY_TERMS check).<br>• The HDI, wealth tax, minimum wage and equity-vs-equality flashcards are gone. | runner §6, §9 |
| structure-04 | 24 subsections, 7 chapters. | runner §4 |
| structure-05 | Misconceptions are rewritten for each subsection:<br>• Lorenz: axis swap and above the diagonal (:420).<br>• Gini: 0.4 read as "40% poor" (:462).<br>• "perfect measure" is banned. | content; assessment mistakes |
| structure-06 | The Laffer curve is **removed**, because it is 4.3.5 · 2c (`econ_spec.txt:1847`) and is banned here. The runner checks that every takeaway term is taught in its own block. | util :203; runner §9 |
| structure-07 | examMatters are written for each subsection. No "top/highest marks" formula, and no two share an ending (runner asserts). | runner §9 |
| specGap-01 | `income-wealth-inequality` covers flow vs stock, with both terms defined (:394). | content |
| specGap-02 | Headcount ratio, poverty gap and MPI are taught as the content of 1b (:79). 1b's own wording is generic ("Measures of absolute and relative poverty", `:1793`). | content |
| specGap-03 | Built to 1c's **seven actual bullets** (`:1795-1801`), one subsection each.<br>• The item's "unemployment, low wages" appear only as mechanisms inside those subsections.<br>• "Demographic change" is **not added**: it is not a 1c bullet (runner asserts it is absent from :1794-1801). | content :155-:357 |
| specGap-04 | `inequality-between-countries` covers capital/infrastructure, human capital, technology, institutions, primary-product dependence, colonial history and conflict (:572). | content |
| specGap-05 | Kuznets taught as a hypothesis with its counter-evidence (:768); technology, globalisation and structural shifts at :798. | content |
| specGap-06 | `free-market-capitalism` covers ownership, returns to capital, market rewards and accumulation (:828). | content |
| specGap-07 | Resolved by the spec text. 2b is a closed two-item list (`:1803-1805`), and the runner asserts exactly two bullets before 2c. The Palma ratio and income-share ratios are banned, and no guidance names them. **Claimed as fixed** because the practical defect was guidance citing untaught ratios. | util :203; runner §5, §7 |
| specThin-01 | `structural-change` defines the term and its mechanism: mismatched skills or location, regional concentration, and a Marenda figure (:287). | content |

## Scope calls the verifier should check

1. **topFix-04 clause (d)** is satisfied by what the clause is for (the diagrams render in Learn Mode), not by
   what it says. It names `diagramRef` on content[0]/[1], and that field and that block layout are both
   superseded. If the verifier reads it literally, it will reject.
2. **specGap-02** is claimed, not closed wont-fix, because the measures it names are measures of 1b.
3. **specGap-03** is claimed with its list corrected to the spec. Brief §4 had recommended re-scoping.
4. **Packet 2.91's diagram decision** is superseded by the rebuild. That decision put the Lorenz curve on
   "ch1", and that chapter no longer exists. Each of the seven chapters now pins its own diagram.
5. Ownership: progressive/regressive taxes, the Laffer curve and anti-poverty policy belong to 4.3.5, and
   are held to cited pointers (util :217). MRP, the propensities and the equity-efficiency trade-off are
   banned.

## Check-in answer rule: builder's own read (not a substitute for Verify A/B)

`checkin-pairs.txt` prints, for each of the 7 check-ins, all the diagram text (title, checklist, every SVG
`<text>`) beside the question and its options. My reading is that **all 7 are clean**. None of the 7 check-in
questions is about what its diagram shows:
- ch1: poverty gap vs the headcount diagram
- ch2: a food sales tax vs growth/benefit bars
- ch3: the skills mechanism vs headcount bars
- ch4: which asset is wealth vs the Lorenz curves
- ch5: between-country causes vs the compounding chart
- ch6: savings vs schooling/health
- ch7: automation vs the Kuznets curve / asset-income bars

Verify A and Verify B still owe their own `leaks`/`clean` line for each check-in.

## Checks run (command → result)

- `node scripts/packet-51-poverty-inequality.mjs --dump --stage` → all packet checks pass; 0 new BLOCK / 0
  new DEBT; 0 recoverable; staged all 8 tables (`stage.log`).
- `audit/runs/packet-51/draft-readback.mjs` checks by a method other than `stageBundle`'s read-back
  (`draft-readback.log`):
  - `curl ?draft=1` items are identical to the bundle by id.
  - Each table's `draft` equals the bundle, and `data` equals the t=0 snapshot, so live is untouched.
  - Live served JSON is byte-identical before and after.
- `quiz-probe.mjs` reads the DB draft column, not the runner's bank: key uniquely longest in 5/30,
  positions 8/8/7/7 (live: 8/10, 0/6/4/0).
- `npm run validate` exit 0. Its section row shows 3 new DEBT (`practice.opening`), which are on the **LIVE**
  practice items this bundle replaces, not the draft.
- `npm run recalls` exit 0.
- `npm run exposure` exit 0.
- `check-staged-drafts.mjs poverty-inequality` → matches.
- `npm test`: first run 342/342 pass. The re-run after the final restage gave 339 pass / 3 fail. All three
  failures are market-failure / 1.3.5 model-answer tests (`lib/spec-coverage.test.mjs:207`, and others).
  They are caused by another session's uncommitted edits to `data/modelAnswersData.js` and
  `content/data-response/econ-u1-market-failure.md`. No packet-51 file is involved (`gate-test.log`).
- `render-diagrams.mjs` → `diagrams-grid.png`. I looked at all 12 views by eye at 400 units.

## Not done / not verified

- `npm run build` was not run. No app source changed; the dev server on :3001 shares this worktree.
- No Verify A, Verify B, Layer 6 adversarial pass or F116 checklist sign-off.
- Real examples are named without figures, or carry a source: World Bank PIP, Eurostat, OECD WDD, UNESCO
  WIDE, and Chetty et al. in JAMA. Only the $3.00 line was corroborated by search in this phase. The others
  were checked from memory.
- Rule 3 (whether origin/main can read every field) was not checked. It is relevant only at publish.
- Not published and not committed. `audit/ledger.json` holds the 23 claims and is not staged, because it
  is shared with other sessions.

## Fix round 1 (26 Sep): the verifier rejected topFix-03 and structure-05

Both rejections were correct. Only the fields listed below changed. A leaf-by-leaf diff of the bundle, old
against new, finds 42 changed leaves. Every one is a `quiz[k].options[j]` or `.explanation`, a
`content[b].sections[s].misconception`, or `mistakes[6]`. No stem changed, so no quiz id and no key position
moved. Pins and the 8/8/7/7 histogram are unchanged.

**topFix-03.** Replaced distractors:
- The four the verifier named: quiz[9] (all three), [13][1], [25][0,2], [29][2].
- Same kind, found on a full re-read of all 30 items:
  - [1][3] "the highest income…"
  - [2] "fall to zero"
  - [6] "doubles as well"
  - [11][2,3] two non-answers
  - [15][3] "Gini coefficient of each group"
  - [18][3] "neither country has any relative poverty"
  - [19][0] "a higher poverty line…"
  - [22][2] "saving is required by law…"

The first replacement for [22][2] was "richer households spend a larger share". I dropped it because it is
logically equivalent to [22][1], so a student could eliminate both options as a pair. It is now "richer
households borrow more than poorer ones do". quiz[25]'s key was shortened to 51 characters and is no longer
the longest option; a distractor has 52. Explanations that argued against a removed option were rewritten:
[1] [9] [11] [13] [18] [19] [25] [29]. The runner now fails if any rejected distractor string returns (§6),
and that guard is A/B tested inside the runner.

**structure-05.** Rewrote 10 section misconceptions and 1 common mistake as concept errors:
- The four named: content[4][0] ("only by effort"), [6][2] ("is fair because everyone can succeed"),
  [5][0] and [2][1] (evaluation points).
- Same class, found by re-reading all 24:
  - [2][2] exam technique ("without a mechanism")
  - [4][2] "a single cause"
  - [5][1] "Ask where…"
  - [5][3] "always reduces"
  - [6][0] "use it as one view and test it", which is now the Kuznets drawing error, matching diagram 7's axes
  - [6][1] "depends on … policy"
  - mistakes[6], the same Kuznets evaluation point. Its title changed, so its id changed; nothing pins a
    mistake.

The replacement wording is taken from each subsection's own body. The first capitalism rewrite made recall
item "Rents from inherited land are reinvested" recoverable (runner `recall.recoverable` 1), so it was
reworded. The runner now fails on the ideological or evaluation patterns in any misconception or mistake
(§ section loop). Both patterns are A/B tested: they catch the five rejected sentences and pass two concept
errors.

**Checks, fix round 1:**
- `node scripts/packet-51-poverty-inequality.mjs --dump --stage` → all packet checks pass; 0 new BLOCK/DEBT;
  0 recoverable; draft restaged (`stage-fix1.log`).
- Independent A/B that reads the bundle JSON, not the source modules. It compares the pre-fix copy
  (scratchpad) with the post-fix bundle:

  | | before | after |
  |---|---|---|
  | ideological misconceptions | 2 | 0 |
  | evaluation-shaped misconceptions | 4 | 0 |
  | mistakes flagged | 1 | 0 |
  | rejected distractors | 10 | 0 |
  | key uniquely longest | 5 | 5 |

  The patterns only find the shapes they encode. No pattern tests whether a distractor is plausible; that
  judgment is mine, from reading all 30 items, and Verify A should make its own.
- `quiz-probe.mjs` (DB draft column) → key uniquely longest 5/30, positions 8/8/7/7 (`quiz-probe-fix1.log`).
- `draft-readback.mjs` → all 8 tables `draft == bundle`, `data` (live) == t=0 snapshot (`draft-readback-fix1.log`).
- `npm run validate` 0 · `npm run recalls` 0 · `npm run exposure` 0 · `check-staged-drafts poverty-inequality`
  matches · `npm test` 356/356 (`gate-*-fix1.log`).
- `ledger.mjs claim 51` topFix-03 structure-05 → claimed (`ledger-claim-fix1.txt`).

Not done: Verify A/B not re-run; no build; nothing walked on a phone; not published; not committed.

## Fix round 2 (26 Sep): topFix-03

**topFix-03.** The verifier named three distractors in two items. All three are replaced. Following rule 4, I
also re-read each item's question, other options and explanation.

- **quiz[29], free market and inequality.**
  - [0] "minimum wages hold low pay…" becomes "wages are highest in the jobs most useful to society". This is
    the pay-equals-social-value error, and the subsection's "pay follows what a skill sells for" refutes it.
  - [2] "the state sets the wage…" becomes "goods are rationed by price rather than by need". This is true of
    a free market but it is about who gets goods, not why incomes differ.
  - Neither new distractor contradicts "In a free market economy". Neither argues that inequality narrows.
  - The key is now "owners of capital and land receive profit and rent" (50 characters). It is no longer the
    longest option; a distractor has 52.
  - The explanation now refutes all three distractors. The verifier's minor note said it refuted only [2];
    [3] "taxes … only on income from work" is now answered too.
- **quiz[13], poverty after a civil war.**
  - [3] "prices fall as soon as the fighting stops" becomes "refugees who settle abroad send no money home".
    It argues that poverty stays high. The migration and remittances subsection refutes it.
  - I rewrote the aid distractor as "donors withdraw their aid as soon as a peace deal is signed" (59
    characters), so the key (57) is no longer the longest option.
  - The explanation now also refutes the median distractor (the verifier's minor note), the aid distractor
    and the remittance distractor.
- Not changed: quiz[24][1]. The verifier called it weak but did not reject it.
- Runner §6: the REJECTED guard now also matches the three strings from this round, with a round-2 self-test.
  - A/B test: the pre-fix `_packet51-assessment.mjs` was swapped in and the runner reported all three as
    "rejected absurd distractor is back". Restoring the post-fix file made it pass. The files compared equal
    (cmp) after the restore.
- This does not show whether the distractors are plausible. That is my judgement, from reading both items
  against the subsections that teach them. Verify A should make its own.

**Checks, fix round 2:**
- `node scripts/packet-51-poverty-inequality.mjs --dump --stage`: all packet checks pass, 0 new BLOCK/DEBT,
  keys 8/8/7/7, and only the draft was restaged (`stage-fix2.log`).
- `ab-fix2.log`: an independent A/B that reads the bundle JSON, not the source modules, and compares the
  pre-fix bundle copy with the post-fix one.
  - Rejected strings anywhere in the bundle: 3 before, 0 after.
  - Items whose key is uniquely the longest option: 5 before, 3 after.
- `quiz-probe.mjs` reads the DB draft column: the key is uniquely longest in 3 of 30 items
  (`quiz-probe-fix2.log`).
- `draft-readback.mjs`: `draft == bundle` for all 8 tables, and live `data` == the t=0 snapshot, so it is
  untouched (`draft-readback-fix2.log`).
- Gates: `npm run validate` 0, `npm run recalls` 0, `npm run exposure` 0,
  `check-staged-drafts poverty-inequality` found 0 drift, `npm test` 356/356 (`gate-*-fix2.log`).
- `ledger.mjs claim 51 C-poverty-inequality-topFix-03` claimed the item (`ledger-claim-fix2.txt`).

Not done: Verify A/B not re-run, no build, not walked on any device, not published, not committed.

## Fix round (post founder decision), 26 Sep: verify-b steps 16 and 29

Founder ruling: fix both, then publish. Both defects came from `verify-b.md`. Only the five bundle leaves
below changed (`ab-fix3.log`).

**(a) Gini fill-in marked "100" wrong (verify-b step 16).** The body at `scripts/_packet51-content.mjs:470`
teaches that the coefficient is also written 0 to 100, so "100" in blank 2 was a correct answer.
`FillInRecall` grades one answer per blank, so I did not make "100" an accepted answer. I reworded the
recall so that only one scale is possible:
- `scripts/_packet51-content.mjs:479`: the prompt now reads "…about the Gini coefficient, written on its
  0 to 1 scale:".
- `scripts/_packet51-content.mjs:487`: the distractor "100" is replaced by "0.76". That is B ÷ (A + B) for
  blank 3's areas (0.38 ÷ 0.50), a known slip, and it is not a correct answer to any blank on either scale.
- Rule 4 neighbours, read and unchanged:
  - The hints (`:486`) state no scale.
  - Blank 1 "zero" is correct on both scales, and blank 3 "0.24" matches the prompt's scale.
  - The keyIdea (`:467`) and the chapter takeaway (`:894`) say 0 to 1.
  - The misconception (`:475`) is about a 0.4 read as 40% poor, not about the scale.
  - examMatters (`:476`) works on a unit square.
  - The notes twin (`:1047`) says "0 perfect equality, 1 maximum inequality".
  - The flashcard (`_packet51-assessment.mjs:214`) says 0 and 1, and the quiz at `:103` has options
    0.30/0.15/0.43/0.70, with no 0-100 option.
  - The body sentence at `:470` stays because it is true, and the prompt now pins the scale.
- Runner guard (`scripts/packet-51-poverty-inequality.mjs:435-440`):
  - The Gini prompt must name the 0 to 1 scale.
  - No distractor may be an answer rewritten on the 0-100 scale.

**(b) Literal `**` in the free Extras evaluation (verify-b step 29).** `components/ExtrasTab.jsx` renders
`chain.title`, each step, `chain.result`, `point.title` and `point.content` as plain text. The markers were
in all three evaluation contents, not just the free one:
- `scripts/_packet51-assessment.mjs:322`: the free one, "The pattern of growth…".
- `scripts/_packet51-assessment.mjs:326`: behind the paywall.
- `scripts/_packet51-assessment.mjs:330`: behind the paywall.

I removed the markers from all three and left the sentences unchanged. The chains and all titles had none.
- Runner guard (`scripts/packet-51-poverty-inequality.mjs:504-509`): no `**`, `__`, backtick, leading `#` or
  `[..](..)` may appear in any field ExtrasTab renders. It includes a self-test.

**Checks, fix round 3:**
- Guard A/B: I put the pre-fix strings back in place (the "100" distractor, the old prompt and one `**`
  sentence). The runner then reported all three problems. After I restored the post-fix files it passed
  ("all packet checks pass").
- `node scripts/packet-51-poverty-inequality.mjs --dump --stage`: all packet checks pass, 0 new BLOCK and
  0 new DEBT, keys 8/8/7/7, and only the draft was restaged (`stage-fix3.log`).
- `ab-fix3.log` is a leaf diff of the pre-fix bundle copy against the post-fix bundle JSON, a different
  method from the runner. It shows exactly 5 changed leaves: the Gini recall prompt, distractor[2], and
  extras evaluation 0-2 content. Extras leaves containing `**` went from 3 to 0.
- `draft-readback.mjs`: `draft == bundle` for all 8 tables, and live `data` == the t=0 snapshot
  (`draft-readback-fix3.log`).
- `check-staged-drafts poverty-inequality` → matches, 0 drift (`gate-check-staged-fix3.log`).
- `npm run validate`: exit 0 and 0 new BLOCK. The totals are the same as round 2 (`gate-validate-fix3.log`).

Not done: not re-walked on a device, not published (published:false), not committed. PROGRESS row 51 is
left to the closer.
