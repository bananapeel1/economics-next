# Packet 12.4 brief — tag the Economics model-answer bank, plus two 12.3 defects

Written by the Brief phase only. **This document contains no measurement of whether anything is fixed** —
only (a) verbatim quotes from the governing documents, (b) counts of the CURRENT, unmodified state
produced by reading the data files / running read-only scripts (command shown for each), and (c) what
"done" means per acceptance criteria already written into `audit/NEXT.md`. No source file was changed to
produce this brief. No ledger write was made.

## Documents read (per the six rules)

`audit/PROTOCOL.md` (full) · `audit/NEXT.md` — the `## Packet 12.4 spec` block (lines 3-79) and the
newest `## Handoff` entry (`## Handoff — packet 5 V038 closed after the stylesheet restore`, line 9482,
21 Sep 20:55) plus the two 12.3 handoffs it supersedes/depends on (lines 9345, 9363) · `audit/DECISIONS.md`
Settled list, and specifically `## Packet 18 — the-market` (line 987, the only prior decision that
touches this packet's E027 section) · `audit/CONTENT-GATE.md` headings, including "The recall contract"
(line 196) · `audit/runs/packet-12.1/tagging-diff.md` (the two-pass method's own honest write-up) ·
`audit/scripts/tag-lexical.mjs` and `tag-merge.mjs` (headers) · `lib/spec-coverage.js:150-200`
(the docstring the spec explicitly named) · `audit/runs/packet-12.3/verify-b-r1.md` (the two defects'
last measurement, dated before this brief).

## Ledger — ids in scope

Command: `node audit/scripts/ledger.mjs packet 12.4` and `node audit/scripts/ledger.mjs packet 12.4 --open`
(identical output — all 7 returned ids are open). Then `node audit/scripts/ledger.mjs show <id>` for each.

| id | title | file the ledger names |
|---|---|---|
| E023 | 45 untagged Economics items tagged via three passes; content fields provably unchanged; no empty `specItems` arrays | `data/modelAnswersData.js` |
| E024 | Pass 2 is a genuine separate agent with only question text + oracle rows; `tagging-diff.md` records all three passes and every dissent | `audit/runs/packet-12.4/tagging-diff.md` |
| E025 | `npm run spec-coverage` reports non-zero for every Economics section with questions; no id outside the oracle | `audit/scripts/spec-coverage-check.mjs` |
| E026 | Every Economics model-answer page headline matches the computed figure; floor caveat retained where untagged remain | `components/SectionModelAnswersPage.jsx` |
| E027 | the-market stops promising questions it lacks; dead browse link removed or pointed somewhere real | `components/SectionModelAnswersPage.jsx` |
| E028 | Mid-band panel suppressed by a tested named condition where it cannot be a genuine near-miss | `lib/mid-band-answer.js` |

**Do not treat this as done at 6.** `ledger.mjs packet 12.4` also returned a 7th id —
**`C-trade-global-economy-topFix-05`** — with `packet: 12.4`. See "Contradiction to escalate" below;
it is not part of the work list.

## What "done" means — acceptance, quoted verbatim from `audit/NEXT.md:63-79`

> 1. `node -e` over both data files: zero Economics items with `specItems: []`, and the count carrying
>    a non-empty `specItems` matches `tagging-diff.md`'s agreed count exactly.
> 2. A field-level diff proving no `question`, `markScheme`, `answerParagraphs`, `examinerCommentary` or
>    `likelyScore` value changed for any of the 66 items.
> 3. `npm run spec-coverage` exits with its usual code, prints a non-zero % for every Economics section
>    holding questions, and lists no unknown spec id.
> 4. Five curled Economics pages: the headline figure matches the computed figure, and the sub-line
>    still says the number is a floor where items remain untagged.
> 5. `/business/the-market-model-answers` has no dead link and no title claiming questions it lacks.
> 6. The suppression rule for E028 is a named, testable condition in code with a unit test, not a
>    per-section list.
> 7. `npm test`, `npm run build`, `npm run validate`, `npm run recalls`, `npm run exposure` all exit 0.
>
> **Verify B (390×844, signed out):** two Economics pages that were `0.0%` and now are not, one section
> that lost its mid-band panel under E028, and `the-market`. Report whether the coverage line reads as
> a credible claim to a student rather than as an apology.
>
> **Stage explicitly, commit nothing.** Five sessions are live. 66 of the 92 staged deletions in this
> index belong to other packets — never `git add -A`, and check any path you stage against
> `git diff --cached --diff-filter=D --name-only` first. Do not stage `audit/ledger.json`.

## The method — quoted, not paraphrased, because it changed between 12.1 and 12.4

`audit/runs/packet-12.1/tagging-diff.md` (12.1, E007) ran a **two**-pass method: "Pass 1 — the packet
author... Pass 2 — `audit/scripts/tag-lexical.mjs`... **Only agreed tags are written.**" That packet's
own escalation, quoted by the 12.4 spec, asked for a genuine second agent before the method scaled.

The 12.4 spec (`audit/NEXT.md:44-50`) requires **three** passes this time: "pass 2 must be a separate
agent, given only the question text and that topic's rows of `audit/raw/spec-items.json`, and never
pass 1's output. Keep `tag-lexical.mjs` as a **third** signal... Write only tags at least two of the
three passes agree on... Do not tune any pass after reading its output."

`audit/scripts/tag-lexical.mjs`'s header (its own contract, unchanged since 12.1): compares "crude
stems of content words, stopwords dropped"; a leaf's text is its own wording plus its parent
requirement's wording plus its subtopic label; a token is "DISTINCTIVE... when it appears in at most
40% of the topic's leaves"; tag when a question shares ≥2 distinctive stems with a leaf, or one stem
unique to that leaf in the whole topic. It "will miss a question that examines a leaf in other words,
and that is the point."

**Per-item work is data-only**: `tag-merge.mjs`'s header states the artefact this packet must write is
a **file** (`section_practice-tags.json`-equivalent and the `specItems` fields inside
`data/modelAnswersData.js`/`modelAnswersExpansion.js` directly, since these two files ARE the live
bank for this feature — see `lib/spec-coverage.js:164-166` on why the CLI and the lab page read
different banks). Rule 6 forbids any DB write regardless; the spec repeats this ("No SQL is needed and
the packet is not blocked on the founder... Do not attempt a DB write").

## Baseline counts — CURRENT state, unmodified, read-only

### 1. Untagged Economics items, by section

Command: read `data/modelAnswersData.js`'s exported `MODEL_ANSWERS` (66 items = `BASE_ANSWERS` +
`EXPANSION_ANSWERS`), group by `subject`/`sectionNumber`, test `Array.isArray(a.specItems) &&
a.specItems.length > 0`. Script and full output saved at
`audit/runs/packet-12.4/item-census.txt`. Total: **46 Economics items across 22 sections, 45 untagged
(all but one item in `1.3.5 Market Failure`, tagged by packet 12.1), 20 Business items across 9
sections, all 20 already tagged, 0.** This matches the spec block's own "Measured 22 September" table
exactly. Zero items anywhere carry `specItems: []` (an empty array) today — the guard's "no empty
arrays" acceptance clause starts from a clean baseline.

Per-section untagged ids (all 22 Economics sections, all currently 0 tagged except 1.3.5):

```
1.3.1 Introductory Concepts (2): scarcity-opportunity-cost-4, ppf-economic-growth-8
1.3.2 Consumer Behaviour & Demand (2): ped-firms-4, yed-business-strategy-8
1.3.3 Supply (2): pes-factors-4, supply-shift-8
1.3.4 Price Determination (2): maximum-price-8, equilibrium-price-4
1.3.5 Market Failure (2 of 3 — 1 already tagged by packet 12.1): neg-externality-4, market-failure-government-intervention-20
1.3.6 Government Intervention (2): indirect-tax-8, indirect-tax-definition-4
2.3.1 Measures of Economic Performance (3): cpi-inflation-4, unemployment-types-8, cpi-limitations-4
2.3.2 Aggregate Demand (3): ad-shift-4, interest-rates-ad-8, consumer-spending-growth-20
2.3.3 Aggregate Supply (2): supply-side-lras-8, sras-shift-4
2.3.4 National Income (2): circular-flow-8, multiplier-effect-8
2.3.5 Economic Growth (3): actual-potential-growth-4, supply-side-growth-20, costs-benefits-growth-8
2.3.6 Macroeconomic Policies (2): interest-rates-inflation-8, fiscal-vs-monetary-20
3.3.1 Types and Sizes of Businesses (2): economies-scale-4, econ-diseconomies-scale-8
3.3.2 Revenue, Costs and Profits (2): profit-maximisation-mc-mr-8, econ-normal-vs-supernormal-profit-4
3.3.3 Market Structures & Contestability (1): monopoly-efficiency-20
3.3.4 Labour Markets (2): derived-demand-labour-4, monopsony-wages-8
3.3.5 Government Intervention (2): privatisation-definition-4, econ-competition-policy-8
4.3.1 Causes and Effects of Globalisation (2): globalisation-definition-4, mnc-host-country-8
4.3.2 Trade and the Global Economy (2): free-trade-protectionism-20, econ-comparative-advantage-4
4.3.3 Balance of Payments & Exchange Rates (2): current-account-deficit-4, econ-j-curve-depreciation-8
4.3.4 Poverty and Inequality (1): gini-lorenz-inequality-8
4.3.6 Growth and Development (2): barriers-development-4, aid-vs-trade-development-8
```

The oracle (`audit/raw/spec-items.json`) carries **703 Economics `kind: 'leaf'` rows** across these
topics (counted: `items.filter(r => r.subject==='economics' && r.kind==='leaf').length`). Economics 4.3.5
(Role of the State in the Macroeconomy) has no model-answer page and is correctly absent from the
22 — confirmed by `data/modelAnswerPages.js`'s own docstring, not re-derived here.

### 2. E028 — sections whose mid-band panel currently tops out in the same band as the model answer

Command: for every `MODEL_ANSWER_PAGES` row, compute `highestTariffItem()` → `midBandAttempt()` (the
live selection logic in `lib/mid-band-answer.js`, unmodified), then compare that item's own
`likelyScore` band against `attempt.ceiling`'s band. Full script and output at
`audit/runs/packet-12.4/midband-census.txt`. This reproduces the spec's "10 of 29" **independently of
the spec's own assertion** — by re-running the shipping selection function against the shipping data,
not by re-reading the earlier handoff's prose.

Result: **29 sections have a mid-band panel candidate today; 10 of the 29 land in the same band as the
full model answer they were cut from** (a level-8 item scored "5–6/8" whose truncated ceiling is also
"Level 3 — 5–6 marks" — cutting the closing paragraph cost nothing visible):

```
business/1.3.3 marketing-mix-strategy (biz-product-life-cycle-8)
business/1.3.5 entrepreneurs-leaders (biz-entrepreneur-role-8)
economics/1.3.1 introductory-concepts (ppf-economic-growth-8)
economics/1.3.2 consumer-behaviour-demand (yed-business-strategy-8)
economics/1.3.4 price-determination (maximum-price-8)
economics/2.3.4 national-income (circular-flow-8)
economics/3.3.1 types-sizes-businesses (econ-diseconomies-scale-8)
economics/3.3.2 revenue-costs-profits (profit-maximisation-mc-mr-8)
economics/3.3.4 labour-markets (monopsony-wages-8)
economics/3.3.5 government-intervention-firms (econ-competition-policy-8)
```

This count (10) matches the current `audit/NEXT.md` spec block ("10 of 29"), written 22 September. It
does **not** match one number in an intermediate 12.3 handoff — see "Discrepancies noticed" below;
noted, not treated as authoritative, since it is not the newest handoff on this topic and the spec
block that supersedes it was written after independent re-counting.

All 10 use the `levels` scheme (8-mark items) except none use `objectives` — every 20-mark item's
`likelyScore` ("18–20/20") lands in the `AO4` out-of-reach band, not the `AO3` ceiling, in every
section measured. So a same-band collision only currently occurs on 8-mark items — worth knowing before
writing the suppression condition, since a rule keyed only to `scheme === 'levels'` would be
under-inclusive if this ever changes, and one keyed to "always compare bands" is not.

### 3. E027 — what "the-market" actually renders today

`data/modelAnswerPages.js`'s own docstring: "Business 1.3.2 `the-market` HAS a row and no model
answers. That is deliberate... Do not 'fix' either half" (i.e. keep the empty state, per the 12.4 spec's
own "The empty state itself... stays"). Two things ARE in scope:

- **Title**: `modelAnswersHeading()` (`data/modelAnswerPages.js:476-484`) always returns
  `"<Topic> — Exam Questions & Model Answers"` regardless of question count — there is no zero-question
  branch. `the-market` is the only page in `MODEL_ANSWER_PAGES` with 0 written items (confirmed by the
  same census as above: every one of the other 31 rows has ≥1 item), so a zero-question branch here
  changes exactly one live page.
- **The "browse every topic" link**: the empty-state copy in
  `components/SectionModelAnswersPage.jsx:387` reads "...use the link above to browse every topic."
  "The link above" is `page.backLink` = `{ href: '/business/unit-1', label: 'Unit 1: Marketing &
  People' }` (`data/modelAnswerPages.js:52`). That route exists (`app/business/unit-1/page.js` is on
  disk) — it is not a 404, so "dead" in the ledger title is a claim to check, not a fact: what it
  actually is, is a link to one unit's page, which does not fulfil the promise "browse every topic."
  The fix is either to change the promise to match the link (name what `/business/unit-1` actually
  shows) or point the copy at something that genuinely lists every topic, if one exists — that
  inventory was not done in this brief and is Build-phase work.

### 4. E025/E026 — where the guard and the page compute the number

`lib/spec-coverage.js:164-166` (quoted per the spec's explicit instruction to read it): "the caller
supplies the items, which is the whole point of the split: the CLI passes both banks... the lab page
passes only the questions it actually puts in front of a student. The two therefore report different
numbers for the same section, correctly... and neither is rounded up to meet the other." **This is
by-design and must stay true** — E025 (CLI, `npm run spec-coverage`) and E026 (the live page headline)
are two different computations over the same tagging data, not one number duplicated in two places, and
neither acceptance check should be satisfied by making them equal.

`spec-coverage-check.mjs`'s own header currently reads: "An UNTAGGED question is not a failure. It is
the ordinary state of 45 of the 46 sections today" — this line will become false once E023 lands (only
some sections will still have untagged questions) and is worth a look during Build, though no ledger id
names it and it is not this brief's place to add scope.

## Discrepancies noticed — reported per "scope of a sentence," not resolved

- **A 12.3 handoff undercounts the same figure the current spec states correctly.** `audit/NEXT.md`'s
  "packet 12.3 fix round 1 passed the gate" handoff (line ~9363) says "(2) Eight pages' mid-band...
  panel scores in the same band," naming no ids. The handoff immediately before it in the file
  (`## Handoff — packet 12.3, transfer lab...`, line 9345) and `audit/runs/packet-12.3/verify-b-r1.md`
  both say "the panel and the original land at the same mark" for a list of exactly ten sections. The
  22-September packet 12.4 spec block — the newest, authoritative document for this packet — says "10
  of 29," matching the ten-item list and matching this brief's own independent re-derivation from the
  live selection code (section 2 above). The "Eight" in the intervening handoff appears to be a
  miscount inside that one bookkeeping-only session's prose; it is not corroborated by the artefact it
  cites and is superseded by a later, independently-verified figure. Not escalating this alone — flagged
  so a Build session does not anchor on "eight" if it reads that handoff on the way past.

- **`C-trade-global-economy-topFix-05` carries `packet: 12.4` in the ledger but is not part of this
  packet's scope on every other document.** The 22-September spec block's own line is explicit —
  "**Closes E023-E028**" — six ids, and the acceptance section (lines 63-79) never mentions this id or
  `trade-global-economy`. The item's own text asks for practice-question rewrites ("'Define' 2 marks;
  'Explain' 4 marks with the tariff diagram required; replace 'Outline' with 'Explain'...") in a
  **different section** (`trade-global-economy`, Economics 4.3.2) from anything this packet's files
  touch, and it is content authoring, which the 12.4 spec explicitly excludes ("Data-file and component
  work only; no content authoring"). Its own `note` field already says it is "PARTIAL and reassigned...
  the levels-marking clause... belongs with the model-answers packets, not here" — written by whichever
  session closed packet 39b, referring to a **future** model-answers packet, and it is plausible this
  session (or a `ledger.mjs assign`) filed it under 12.4 by number rather than by content, the same
  failure mode `audit/DECISIONS.md` names at "`ledger.mjs assign 13.10` silently files into packet
  13.1." **This is a disagreement between the ledger (`packet 12.4` returns 7 ids) and the packet 12.4
  spec in `audit/NEXT.md` (states 6 ids, "Closes E023-E028")** — escalated below rather than resolved
  by this brief, per instruction: a wrong pick here (build it, vs. silently drop it) is a founder-level
  scope call, not a brief-writer's to make.

- **Step 3 of the harness instructions ("pull this section's entry from `audit/raw/spec-coverage.json`
  — missingItems/thinItems") does not apply to this packet and was not used to produce the ledger ids
  above.** Read `audit/raw/spec-coverage.json`'s shape (`{totals, bySection, report}`) to confirm: its
  `bySection` entries measure whether **teaching text** evidences a spec leaf (`validate-content.mjs`'s
  `spec.coverage` rule, per `spec-coverage-check.mjs`'s own docstring contrasting the two meanings of
  "coverage" in this codebase). Packet 12.4 authors no teaching text and touches no `missingItems`; its
  job is whether a **question** examines a leaf, which is a different oracle path
  (`audit/raw/spec-items.json` leaf rows, read directly by `tag-lexical.mjs` and by
  `lib/spec-coverage.js`). Naming this so a Build session does not go looking for `missingItems`/
  `thinItems` entries that were never the point.

- **`audit/CONTENT-GATE.md`'s recall contract does not apply.** It governs `reorder`/`classify`/
  `match`/`fill-in` recall exercises built into a section's Learn Mode. Packet 12.4 authors no recalls
  and touches no `content[]`/`recalls[]` field; confirmed applicable-or-not by reading the file's own
  section headings rather than assumed.

- **Worktree state at brief time**: `git status --short` shows `audit/NEXT.md` and `audit/ledger.json`
  both `MM` (staged and unstaged changes present, from other concurrent sessions per the spec's own "Five
  sessions are live" note) and one existing untracked deleted-file trail
  (`D  audit/runs/packet-13.2/...`, ~34 files, not this packet's). Nothing here was staged or committed
  by this brief session; a Build session should re-run `git status` immediately before its first `git
  add` rather than trust this snapshot, per Rule 5 and `audit/PROTOCOL.md`'s "check `git log -1`
  immediately before committing."

## What the Build phase still has to decide (not decided here)

- The exact wording/design for E027's title branch and link fix (two candidate directions given above,
  not chosen).
- The exact shape of the E028 "named, testable condition" (this brief supplies the comparison — item's
  own `likelyScore` band vs. `attempt.ceiling`'s band — and confirms it reproduces all 10 known cases
  and 0 false positives against the current 29-candidate set, but writing the function and its unit test
  in `lib/mid-band-answer.js`/`.test.mjs` is Build work).
- Running the actual three-pass tagging per section (pass 1 by the builder, pass 2 by a genuinely
  separate agent given only question text + oracle rows, pass 3 = `tag-lexical.mjs` re-run per topic)
  and writing `audit/runs/packet-12.4/tagging-diff.md` plus the `specItems` fields — none of this was
  done in this brief; Author nothing, per instruction.
