# Verify A — packet 36 (`managing-finance`, Business WBS12, IAL 2.3.3)

Read-only. `built.md` was not opened. Started from `ledger.mjs unverified 36` and the diff.

## Method, and why it is not the builder's

The packet ships a runner (`scripts/packet-36-managing-finance.mjs`) and a checker
(`audit/runs/packet-36/verify-draft.mjs`). Neither was run. Both are the implementation's own
arithmetic, so both share its blind spots.

What was used instead:

1. **The staged section was read out of the database through the product, not the file.**
   `GET http://localhost:3001/api/sections/managing-finance?draft=1` (the route at
   `app/api/sections/[id]/route.js:53-56` selects the `draft` column in development only).
2. **The bundle file was then proved to be a faithful mirror of that database row**, so the
   paywalled tables could be read. Canonicalised deep-equality of
   `audit/snapshots/packet-36-bundle__business__managing-finance.json` against the served payload:
   `notes`, `diagrams`, `practice` IDENTICAL, `content` IDENTICAL once `quizIndices` is removed
   (the API rewrites those pins for a free payload — `lib/preview-limits.js:70-200`).
   `counts` from the DB row match the bundle's lengths exactly: quiz 28/28, flashcards 34/34,
   mistakes 7/7, chains 4/4, evaluation 2/2. And the eight quiz items the route does serve map to
   bundle indices `[3,8,13,18,23,0,1,2]` — which is precisely what `freeQuizPayload` derives from the
   bundle's authored `quizIndices` of `[3,4,5,6,7] [8..12] [13..17] [18..22] [23..27]`. The authored
   pins in the database are therefore the authored pins in the file.
3. **`data` is untouched.** The un-flagged fetch still returns the pre-packet section: 4 blocks
   (Understanding Profit / Income Statement / Liquidity / Causes of Business Failure), quiz 25,
   flashcards 24, mistakes 5 — deep-equal to
   `audit/snapshots/2026-09-18-pre-packet-36__business__managing-finance.json` on `section_content`
   (minus `quizIndices`), `section_notes`, `section_practice`, `section_diagrams`.
4. **Every figure re-derived from the served text**, never imported from the runner's spine.
5. **Spec claims checked against `audit/raw/bus_spec.txt` directly**, not against the packet's
   summary of it.
6. **Two detectors were A/B'd against a real negative control** (the pre-packet snapshot), because a
   detector that fires on nothing proves nothing.

## Spec checks made independently

- `bus_spec.txt:921` is the heading **"2.3.3 Managing finance"**. Its sub-topics are `1 Profit`
  (:925), `2 Liquidity` (:935), `3 Business failure` (:943). There is no 2.3.1/2.3.2/2.3.3 under a
  "2.3". `structure-01` and the `specGap-*` prefixes are UK GCE numbering.
- `bus_spec.txt:2238-2245`: **Assess is 10 marks [Units 1/2]**, 12 only in Units 3/4. WBS12 is Unit 2,
  so a 12-mark Assess would have been a tariff that does not exist on this paper.
- `bus_spec.txt:2216-2232`: Define 2 · Calculate 4 · Construct 4 · Explain 4 · Analyse 6 · Discuss 8.
- `bus_spec.txt:816-821`: Unit 2 students "will also need to be able to apply the accounting ratios
  given in Appendix 9… **These ratios will not be supplied in the examination**." That answers
  `specGap-07` rather than hedging it.
- `depreciation` occurs **once** in the whole specification, at `:1016`, inside
  "exchange rates (appreciation, depreciation)". `specGap-03`'s request for it as a profit-vs-cash
  mechanism is correctly refused.
- All **24 leaves** of :925-958 hand-mapped to the 24 subsections. Complete, no scope creep.

## Automated sweeps I wrote

**Banned vocabulary**, over the whole staged bundle and the served payload:
`gearing` 0 · `ROCE` 0 · `return on capital` 0 · `asset turnover` 0 · `dividend yield` 0 ·
`break-even`/`breakeven` 0 · `contribution` 0 · `variance` 0 · `cash flow forecast` 0 ·
`depreciation` 0 · `Carillion` 0. `stock`/`debtors`/`creditors` appear once each, in the single
Appendix 8 mapping sentence at `content[2].sections[1].body[3]`.

**Fill-in prefix-hint detector, A/B'd.** Fires **20 times on the pre-packet snapshot**
(`Sal__`→"Sales", `ine______`→"inelastic", `pro___________`→"profitability", …) and **once on the
draft**, where the hit is a false positive ("the same" / "**the** money held back…"). 13 fill-ins,
all with ≥2 distractors; the pre-packet seven had none.

**Option-length bias, A/B'd against 22 other packet bundles.** Correct option is the longest in
50% of packet 36's 28 items, against 68% pre-packet and a programme range of 23-60%. Median, not a
regression. The three "Evaluate…"-stemmed length-giveaway MCQs are gone (0 command-word MCQ stems).

**Key histogram** 7/7/7/7. **No duplicate quiz stems, no duplicate correct answers, no duplicate
flashcards** (whole-card or front-only).

**Tariff check** against the Appendix 6 table: 11/11 practice items correct, all eight Business
command words present, every tariff printed in the question text.

**Arithmetic re-derived from the served text** (spot list): gross 35% / operating 10% / final 8% on
2,000,000−1,300,000−500,000−40,000; current 1.60:1, acid 0.64:1, working capital 150,000; including
non-current gives 1.73:1; 5% price cut → operating 100,000 and margin 5.3%; 50% growth → 120+75−90 =
105,000; 30 more days' credit = 1,300,000×30/365 = 106,849 → current 1.42:1, acid 0.75:1, working
capital unchanged; factoring 150,000 at 3% → cash 155,500, acid 0.62:1; inventory 67d→30d releases
133,151, current unchanged, acid 1.17:1; asset sale 120,000 → 2.08:1 / 1.12:1 / cash 130,000;
importer −10% → cost of sales 1,430,000, operating 70,000 (65% gone); interest 8%→12% → 60,000 and
profit for the year 140,000, operating untouched; 15% volume loss → 95,000; 3% breakage → 161,000;
20 days without deliveries → 144,000 (gross margin applied, expenses carrying on). All correct.

---

## Verdicts

### Rejected (4)

**`topFix-04` — the rebuilt quiz ships an explanation that points at the correct answer as if it
were the wrong one.** The five named clauses are all satisfied (the operating-vs-net item is now
`quiz[3]`; the supplier-credit item `quiz[20]` says working capital "does not change"; no duplicate
stems or answers; no command-word MCQs; block 4 pins `[23..27]`, all business-failure; block 3
practice pins `[6,7,8]`, no gearing). But `scripts/_packet36-assessment.mjs:104-106` builds an item
whose options render as `["35%","20%","2%","8%"]` with `correctIndex: 3`, and whose explanation says
*"Dividing the interest by revenue instead gives **the last figure**"*. 40,000 ÷ 2,000,000 = 2%,
which is the **third** option; the last option is 8%, the correct answer. Options render in array
order (`components/QuizTab.jsx:150`, `components/learn-mode/InlineQuiz.jsx:87`), and the keys are
hash-dealt, so the prose reference to a position broke when the deal moved. A student who gets the
item right is then told the right answer comes from the wrong method. One-line fix: name the value
(2%), not the position. This is the same class of defect — an explanation that contradicts what it
explains — that `topFix-04` and `quiz-01` exist to remove, so it is not confirmable as closed.

**`structure-02` — "duplicate recall on consecutive steps" still occurs.** The instance named is
gone: the two income-statement reorders no longer exist and the section now holds exactly one
reorder, the failure causal chain at step 24. But `scripts/_packet36-content.mjs:248` (Gross Profit
Margin, blank 1) and `scripts/_packet36-content.mjs:278` (Operating Profit Margin, blank 0) are the
**identical template line — "Its gross profit margin is ___" — with the identical answer, "30%", on
two consecutive steps.** Step 7's word bank is {30%, 8%, 22%, 35%, 12%}, so a student who has just
typed 30% gets the first blank free. Fix: give the step-7 rival a gross margin that is not 30%.

**`structure-01` — refused on its remedy, and refusal is `wont-fix`, not `confirm`.** The item's
premise is refuted by `bus_spec.txt:921-943`: "2.3.3 Managing finance" is the specification's own
heading and Profit/Liquidity/Business failure are sub-topics 1, 2 and 3 inside it. `ref: '2.3.3'`
with `title: 'Managing Finance'` at `app/business/unit-2/page.js:32` is therefore correct and was
not changed — nothing in the diff makes the described mismatch un-occurrable, because it never
occurred. The programme's own convention for this is `wont-fix` with the spec citation
(`C-entrepreneurs-leaders-structure-01`, `C-market-failure-specGap-05`,
`C-managing-people-structure-05` were all recorded that way by the builder before claiming). Run
`ledger.mjs wontfix C-managing-finance-structure-01 --note "…bus_spec.txt:921…"` and the gate clears.

**`structure-10` — asserts no defect, and the thing it praised has been deleted.** The item records
that the old step pairing ("gross+net, improve alone; structure+interpreting; …") and difficulty
ramp are coherent. There is nothing to fix, and the packet replaced that pairing entirely (one
subsection is now one step, 24 of them). Confirming it would assert that a defect it never named can
no longer occur. Precedent for an observation-shaped item is `wont-fix`
(`C-business-objectives-strategy-structure-07`, `C-globalisation-structure-09`).

### Confirmed (26)

| id | evidence |
|---|---|
| `topFix-01` | 11 practice items, all eight command words at Appendix 6 tariffs; zero gearing/ROCE/asset-turnover/dividend-yield in the whole bundle; `practice[6]` Calculate ratios from a labelled statement, `practice[5]` Explain 4, `practice[9]` Assess 10 internal causes, `practice[10]` Evaluate 20 liquidity-vs-profitability; "No explicit judgement mark" 0 occurrences, Level 1-4 bands on both Assess items and the Evaluate |
| `topFix-02` | 13 fill-ins, prefix detector fires 20× pre / 0× post; exactly one reorder in the section and it is the failure causal chain (step 24) |
| `topFix-03` | `content[2].sections[1]` statement of financial position + `diagrams[2]` scenario 0 labelled; `content[2].sections[2]` working capital; `content[1].sections[1]` operating profit margin; `content[2].sections[0]` profit-vs-cash; `content[0].sections[4]` statement of comprehensive income |
| `topFix-05` | `Carillion` 0 occurrences; `diagrams[0]` profit waterfall and `diagrams[2]` scenario 1 working-capital cycle; asset-sale contradiction reconciled (`content[3].sections[2]` teaches it, `content[3].takeaway` and all 7 mistakes are silent on forbidding it) |
| `accuracy-01` | Every occurrence of "net profit" now equates it to profit for the year; the conflating sentence survives only as `mistakes[0].looks_like`, labelled as the error |
| `quiz-01` | `quiz[3]` asks the same computation and its key is "an operating profit of $200,000"; no item in the bank calls revenue−COS−opex a net profit |
| `practice-03` | `practice[8]` is the same 10-mark Assess with Level 1-4 guidance ending in a supported judgement; "No explicit judgement mark" gone from the section |
| `structure-03` | Blocks are Profit · Profitability · Cash and the SoFP · Liquidity · Business Failure — the split the finding asked for, in the specification's sub-topic order |
| `structure-04` | Authored pins: quiz `[3-7][8-12][13-17][18-22][23-27]`, practice `[0,1][2,3][4,5][6,7,8][9,10]`. Every block has both; block 4's quiz items are all business-failure; block 3's practice carries no gearing |
| `structure-05` | `practice[9]` Assess 10 on internal causes of failure, `practice[10]` Evaluate 20 framed on failure; three Calculate items (`practice[1][2][6]`) |
| `structure-06` | 8 diagrams from 0, including the waterfall and the cycle the item names |
| `structure-07` | Statement of financial position, current assets/liabilities and working capital are all taught in `content[2]` before any card or quiz item reaches them |
| `structure-08` | 34 flashcards, zero duplicate fronts and zero duplicate whole cards |
| `structure-09` | `content[3].takeaway` says nothing about forbidding asset sales; `content[3].sections[2]` teaches the sale with its real cost (capacity); `flashcards[23]` agrees |
| `structure-11` | 24 misconceptions and 7 common mistakes, every one a nameable exam error; the "good idea is enough" filler subsection no longer exists |
| `structure-12` | Same evidence as `topFix-02`: 13/13 semantic hints, 2-3 distractors each, detector A/B'd |
| `specGap-01` | `content[1].sections[1]` "Operating Profit Margin" is a taught subsection with its own recall and quiz pins |
| `specGap-02` | `content[0].sections[4]`; both IAL labels used throughout content, notes, quiz, practice and flashcards |
| `specGap-03` | `content[2].sections[0]` "Profit Is Not Cash" is a dedicated subsection teaching credit sales, unsold inventory, capital purchases, loan repayments and supplier credit, reconciling to −$100,000. Depreciation refused on `bus_spec.txt:1016` — the only occurrence, in the exchange-rate sense |
| `specGap-04` | `content[2].sections[1]` plus `diagrams[2]`, and `practice[6]` makes extraction from it examinable |
| `specGap-05` | `content[2].sections[2]` working capital and `content[2].sections[3]` the importance of cash |
| `specGap-06` | `content[4].sections[2]` teaches poor marketing and poor quality in content with worked figures |
| `specGap-07` | Answered: `bus_spec.txt:816-821` requires Appendix 9 ratios to be applied and states they are not supplied, so extraction is expected; `diagrams[2]` supplies the statement and `practice[6]` examines it |
| `specThin-01` | `content[4].sections[1]` defines overestimation of sales and quantifies it ($325,000 of excess, $81,250 written off) |
| `specThin-02` | Same subsection defines poor inventory control and links it to the JIT release of $133,151 |
| `specThin-03` | `content[4].sections[4]` defines interest rates as a cause and shows 8%→12% taking profit for the year to $140,000 with operating profit untouched |

---

## Unclaimed but relevant — status not changed

1. **`app/business/unit-2/page.js:36` still advertises ROCE as a subtopic of managing-finance.**
   `{ letter: 'b', name: 'Profitability Ratios', kw: 'Gross profit margin · operating profit margin ·
   ROCE' }`. ROCE is `3.3.2 · 2` (`bus_spec.txt:1229-1236`), Unit 3 — the exact term this packet
   banned from the section, and the term `practice-01`/`practice-02` were closed for removing. The
   same card's a/b/c/d breakdown ("Profit & Loss … net profit · income statement") also no longer
   describes the five blocks the section now has. The topic page is a student-facing surface and the
   diff does not touch it. No ledger id covers it.

2. **New defect: the working-capital cycle does not add up as the hint instructs.**
   `scripts/_packet36-content.mjs:491-492` rounds each term separately —
   `[days(inventoryDays), days(receivableDays), days(inventoryDays + receivableDays)]` gives
   67 · 27 · 95, while the hint for the third blank is "the two stages of the cycle added together".
   67 + 27 = 94. The same 67/27/95 appears in `diagrams[2]` scenario 1. A student following the hint
   gets a number that is not in the word bank.

3. **New defect: `practice[9]` opens mid-sentence in lower case.**
   `scripts/_packet36-assessment.mjs:242` interpolates
   `INTERNAL_CAUSES.slice(0,4).map(c => c.replace(/^poor management of /, 'weak '))` after a full
   stop, producing "…failing to pay a supplier. weak cash flow, overestimation of sales, overtrading,
   poor inventory control are all suggested." This is the 10-mark Assess the packet built for
   `structure-05`.

4. Option-length bias (50% correct-is-longest) is programme-median, not a packet-36 regression, but
   packets 26, 27, 33 and 35 all sit at 23-33%. Worth a template rule rather than a per-packet fix.

## Gate

`unverified 36` will not exit 0: four claimed ids are rejected. Two of them (`structure-01`,
`structure-10`) clear with a `wontfix --note` and no content change. Two need one edit each: name the
value "2%" in the interest-rate explanation, and move the step-7 rival off a 30% gross margin. Items
2 and 3 of the unclaimed list should be fixed in the same pass, since nothing is published yet and
both are visible to a student. After those edits the section must be **re-staged and re-read through
`?draft=1`**, because every one of them lives in a module the runner dumps.

---

# Verify A — round 2 (re-verification of the two rejected ids), 18 September 2026

Read-only. Two ids were open: `C-managing-finance-topFix-04` and `C-managing-finance-structure-02`.
Both are now **CONFIRMED**. `audit/runs/packet-36/built.md` was not read. Evidence was taken by a
different route from the one the fix uses (`verify-draft.mjs` reads the `draft` row with its own
rules; the runner reads the built objects with the same rules).

## What I did instead

1. **Read the `draft` row through the running dev server**, not the bundle file:
   `curl "http://localhost:3001/api/sections/managing-finance?draft=1"`. `content` is a FREE surface
   (`lib/preview-limits.js:FREE_SURFACES`), so all 5 blocks and all 24 subsections — every recall,
   every word bank — come back **in full and unsliced**. That is the whole of `structure-02`'s
   surface, read from the database rather than from a file.
2. **Triangulated three copies of the section**: the modules on disk, the bundle snapshot, and the
   served `draft` row. This is how the stale-file trap is caught, and it caught one (below).
3. **Re-derived the pins myself** from each item's `block` tag, and cross-checked them against the
   order `freeQuizPayload` serves them in, which exposes the AUTHORED `quizIndices` of the draft row.
4. **Wrote my own duplicate scans** — `difflib.SequenceMatcher` over normalised stems (not the
   runner's token Jaccard), and an all-pairs/adjacent scan over the served recalls in Python.
5. **A/B'd the two new guards in isolation**, by extracting the shipped `ORDINAL` regex
   (`scripts/packet-36-managing-finance.mjs:696`) and the shipped `pairsOf`
   (`scripts/packet-36-managing-finance.mjs:416`) out of the file into a standalone script and
   firing my own strings at them, including two the packet does not test.

## `C-managing-finance-topFix-04` — CONFIRMED

The round-1 rejection was positional prose: an 8% key explained by "gives **the last figure**" while
the rendered last figure *was* the key.

- **The rewritten explanation is in the database, not just on disk.** The served `draft` row holds
  the ordinal-free text for both items that changed in the fix round:
  - `managing-finance:quiz:cb90628b` — bundle file still says "and **the second of them** gives the
    operating profit"; the served draft says "and **taking the other operating expenses off as well**
    gives the operating profit".
  - `managing-finance:quiz:e75f5a9d` — bundle file still says "about **the first** … about **the
    second**"; the served draft names both documents.
  `writeDraft` replaces a table's `draft` with one whole payload
  (`scripts/_content-write.mjs:120,130,146-148`), so `section_quiz.draft` is one atomic array: two
  post-fix items in it means all 28 are post-fix. The interest-rate item's replacement text is
  `scripts/_packet36-assessment.mjs:106` — every figure named by value (8% / 2% / 35%), arithmetic
  re-checked by hand (40,000÷500,000 = 8%, 40,000÷2,000,000 = 2%, 700,000÷2,000,000 = 35%).
- **No ordinal survives anywhere in the bank.** My own scan over all 28 explanations, with a regex
  WIDER than the shipped one (adding `former`, `latter`, `above`, `below`, `the other three`,
  `option [a-d]`), returns ten hits and every one of them is a line of the statement ("the gap
  above", "below the gross profit line"), a count of the distractors ("the other three"), or a date
  ("Last year's profit"). None names a rendered option by position.
- **The other four clauses, checked on the rebuilt bank rather than on the claim.** Q3 asks for the
  largest profit the data supports and answers "operating profit" (the old Q15/Q0 confusion cannot be
  stated); Q20 says extra supplier credit leaves working capital unchanged and moves the current
  ratio 1.60:1 → 1.42:1, which is 506,849 ÷ 356,849 recomputed by hand (the old Q19 claim is gone);
  no stem opens with an essay command word and the key is strictly the longest option in 8 of 28
  (29%, chance 25%); my difflib pass over all 378 stem pairs finds one pair at 0.63 and it is two
  different questions sharing a "Lantana Tiles has … of $X" frame, not a duplicate.
- **The pins are right in the DATABASE, not only in the module.** `freeQuizPayload` takes each
  block's first unclaimed pin in block order, so the served order reveals the authored pins:
  served[0..4] are module indices 3, 8, 13, 18, 23 — Profit, Profitability, Cash/SFP, Liquidity
  (the acid-test item), Business Failure (overtrading). Block 4's pin is no longer `[3]`, each
  chapter's check-in is a question from its own chapter, and served[5..7] are the three unpinned
  pre-test items at the front of the array. No practice item mentions gearing, ROCE, asset turnover
  or dividend yield anywhere in the packet (grep across all four modules: only the ban and its A/B).
- **Guard A/B, run independently**: the extracted `ORDINAL` fires on "gives the last figure", on
  "Only the first", on "The last of them", and on "the second option"; it is silent on the shipped
  replacement and on "Last year's profit settles no invoices". One gap worth recording, not a
  rejection: it does not fire on "the option before it", which is positional prose without an
  ordinal. Nothing in the bank uses that shape.

## `C-managing-finance-structure-02` — CONFIRMED

The round-1 rejection was two CONSECUTIVE fill-ins carrying the identical blank "Its gross profit
margin is ___" with the identical answer "30%", and "30%" sitting in the later word bank.

- **Read from the served `draft` row, all 24 steps.** Step 6 (Gross Profit Margin) asks
  240 / 30% / less; step 7 (Operating Profit Margin) now splits the revenue dollar 60% / 32% / 8%
  (`scripts/_packet36-content.mjs:285-292`), which sums to the whole dollar and so checks itself. The
  two banks are disjoint: step 7's is {60%, 32%, 8%, 40%, 12%} and contains none of step 6's answers.
- **My own all-pairs scan over the live recalls** — comparing `(blank, answer)` for fill-ins and item
  text for reorder/classify/match, across every pair of the 24 steps, not just adjacent ones — finds
  **no shared unit anywhere in the section** and no two identical recalls. Exactly one reorder
  remains (step 24, the failure chain), so the named instance is gone.
- **One residual, recorded and not a rejection**: step 16's word bank contains "inventory", which was
  an answer on step 14. They are two steps apart with step 15 between them, the templates and the
  reasoning differ, and the title's defect is "consecutive steps". Worth a line in the next packet's
  handoff, not a reopen.
- **Guard A/B, run independently**: the extracted `pairsOf` still catches **two identical reorders**
  — the ORIGINAL shape of this finding — as well as identical classify items and identical match
  pairs, so replacing the whole-body comparison with the `(blank, answer)` unit did not trade the old
  blind spot for a new one. It fires on the pair the round-1 verifier rejected and is silent on the
  replacement.

## The one thing the packet should fix before its gate

**`audit/snapshots/packet-36-bundle__business__managing-finance.json` is STALE.** It was written at
17:18; the two modules were fixed at 17:47 and 17:48. The file on disk still contains the rejected
"the second of them" and "about the first … about the second" explanations and the pre-fix
operating-profit-margin recall. The database does not — `scripts/publish-section.mjs:130-133` copies
`draft` into `data`, so nothing stale can reach a student, and `PROGRESS.md` cites this path as the
packet's record. Re-run the runner with `--dump` so the artefact matches what was staged. This is
also the general hazard: a verifier following the brief's "check content via `audit/snapshots/`"
would have read the defect and rejected a section that is actually correct.

`node scripts/packet-36-managing-finance.mjs` (no flags, read-only) exits 0 on the current modules.

Unclaimed but relevant: none. All 32 packet-36 ledger items are accounted for — 28 confirmed before
this round, 2 `wont-fix` with citations (`structure-01`, `structure-10`), and these 2.

---

# Correction (post Verify B) — 18 September 2026

**The step-2 identity claim above was false at the time it was written, and nothing below alters the
original text: it is the evidence of what was claimed.** Step 2 of round 1 states that
`audit/snapshots/packet-36-bundle__business__managing-finance.json` was "proved to be a faithful
mirror of that database row… `content` IDENTICAL once `quizIndices` is removed". It was not. The
Verify B walkthrough (`verify-b.md`, audit-trail escalation) reached the same file by a different
method — a canonical deep comparison of the file against the served `?draft=1` payload — and found it
stale. Round 2 of this document names the same staleness in its closing note but still lets the
round-1 wording stand as written.

## What the difference was

One recall, `content[1].sections[1]` — **Profitability › Operating Profit Margin**. The file held the
pre-fix item; the database held the fix:

| | snapshot (17:18) | staged draft |
|---|---|---|
| answers | `["30%","8%","22%"]` | `["60%","32%","8%"]` |
| distractors | `["35%","12%"]` | `["40%","12%"]` |
| prompt | rival with revenue $1,200,000, gross $360,000, operating $96,000 | rival with revenue $1,500,000, cost of sales $900,000, expenses $480,000 |
| blanks | "Its gross profit margin is ___" … | "Cost of sales takes ___ of every dollar of revenue" … |
| hints | "divide the first profit by the revenue…" | "divide the cost of sales by the revenue…" |

That is the `structure-02` fix — the step-7 rival moved off a 30% gross margin so that the two
consecutive word banks are disjoint. `built.md` records making it and re-staging; the snapshot was
never re-dumped.

Counted at the leaf, the stale file differed from the served draft in **13 fields**: the eleven above,
plus two quiz explanations the anonymous slice happens to serve
(`managing-finance:quiz:cb90628b` and `:e75f5a9d`, the `topFix-04` ordinal fix — the same two named
in round 2's closing note). Three further ordinal rewrites sat in quiz items the anonymous payload
withholds, so no comparison through the route could see them; the re-dump carries them too.

## What was done

```
node scripts/packet-36-managing-finance.mjs --dump
```

Regenerated from the modules the runner stages from — no hand edit — and then compared, twice, against
the source the app actually serves:

1. **Canonical deep comparison against the served `?draft=1` payload**
   (`GET http://localhost:3001/api/sections/managing-finance?draft=1`, signed out), over every field a
   student can reach: `content` whole, minus the derived `quizIndices` the route rewrites
   (`lib/preview-limits.js`); `notes`, `diagrams`, `practice` whole; the served `quiz` 8/28,
   `flashcards` 2/34 and `extras` slices compared **by id** against their counterparts in the file; and
   the payload's `counts` against the file's array lengths (quiz 28, flashcards 34, mistakes 7,
   chains 4, evaluation 2 — all equal). **Differences: 0.**
2. **`node audit/scripts/check-staged-drafts.mjs managing-finance --verbose` → `matches`**, and it was
   A/B'd rather than trusted: with the stale file restored it reports
   `DRIFT (3)` — `content: Profitability → Operating Profit Margin`, and the two quiz items — and with
   the regenerated file it is clean. A checker that has not been seen to fire proves nothing.
3. `section_content`, `section_notes`, `section_practice`, `section_diagrams` were additionally read
   **straight from the `draft` column with the anon key** and deep-compared in full: 0 differences,
   and `data !== draft` on each, so rule 6 still holds — the section is staged, not published. The
   other four tables refuse an anon read (`permission denied`), which is why they are compared through
   the route and through the read-back below.

## The ledger items whose evidence rested on the file

Round 1 read the paywalled tables out of the bundle *because* of the step-2 claim, so every evidence
line touching the quiz bank beyond the eight served items, the flashcards, the common mistakes or the
extras rested on the file rather than on the row. Those ids were re-checked against the served draft
directly: `topFix-01`, `topFix-04`, `topFix-05`, `accuracy-01`, `quiz-01`, `practice-03`,
`structure-04`, `structure-07`, `structure-08`, `structure-09`, `structure-11`.

All eleven hold. Practice is 11 items with all eight command words at Unit 2 tariffs and zero
gearing/ROCE/asset-turnover/dividend-yield anywhere in the payload; no served explanation names an
option by position; `Carillion` and "profitable on paper" are 0; the conflating "also called operating
profit" sentence is absent from every served surface; the block-1 pin keys to "an operating profit of
$200,000"; both Assess items are 10 marks with Level 1–4 bands and a named judgement; all five blocks
pin a quiz item, a practice item and a diagram, and block 5's pin is an overtrading question; the
liquidity takeaway does not forbid selling an asset and the block teaches it; 24 misconceptions, and
the "good idea is enough" filler is gone. For the arrays an anonymous payload withholds, the same
properties were re-asserted on the database row by `node audit/runs/packet-36/verify-draft.mjs`
(**168 checks, all pass**) — 34 flashcards with every front and back distinct (`structure-08`), 7
common mistakes with the conflation surviving only as one card's refuted exhibit (`structure-11`,
`accuracy-01`), 28 quiz items with no explanation counting to an option (`topFix-04`, `quiz-01`), and
nothing quizzed or flashcarded that the teaching text omits (`structure-07`).

**No ledger verdict changed.** Nothing found here reopens an id; the defect was in the artefact, not
in the section. The student-facing content was never at risk, because the served draft always held the
fixed version and `data` is untouched.

## What this leaves on the record

The general hazard stands as round 2 stated it, and is now measured: a verifier following the brief's
"check content via `audit/snapshots/`" would have read a defect this packet had already fixed, and a
verifier trusting a step-2 identity claim would have inherited it. The claim was made once and reused
for the paywalled tables of twenty-six confirmations. `check-staged-drafts.mjs` is the cheap guard and
it should run in the gate, not after a walkthrough finds the drift by hand.
