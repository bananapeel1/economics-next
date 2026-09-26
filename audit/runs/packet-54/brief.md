# Packet 54 brief — business__assessing-competitiveness (IAL Business 3.3.5)

Author: brief phase only. Nothing built, no source file touched, no gate run. Every "current state" claim
below was produced by READING a file or RUNNING a read-only script (command shown); none of it is a build,
test, curl-against-draft, or browser measurement — those belong to Build/Verify A/Verify B/Gate, which come
after this brief.

## 0. Handoff-file check (PROTOCOL.md, packet's own instruction)

Read: `audit/PROTOCOL.md` (full, 155 lines), `audit/NEXT.md` (searched for "Packet 54" and the newest Handoff
entries), this packet's row in `audit/PROGRESS.md` (line 107), the "Settled" list in `audit/DECISIONS.md`
(scanned in full + targeted `grep` for `assessing-competitiveness`, `3.3.5`, `VRIO`, `spec.uncovered`), and
`audit/CONTENT-GATE.md` including "The recall contract" (lines 196-232) and the per-section checklist F116
(lines 234-267).

**No `## Packet 54 spec` heading exists anywhere in `audit/NEXT.md`** (`grep -n "^## Packet 54" audit/NEXT.md`
→ no match; `grep -ni "packet 54" audit/NEXT.md` → one incidental mention at line 9325, quoted in §2). This is
the same gap packets 41/43/44/45/46/47 already hit and normalized (see packet 47's own row in
`audit/PROGRESS.md`: "No `## Packet 47 spec` heading exists anywhere... the same gap packets 41/43/44/45/46
hit and normalized"). Per PROTOCOL.md, the ledger is the definition of coverage, so this brief uses
`audit/ledger.json`'s 31 open ids plus `audit/raw/spec-coverage.json` and `audit/raw/spec-items.json` as scope,
not a missing spec heading. **Not escalating this** — it is an established, repeatedly-accepted pattern, not a
fresh contradiction.

No other disagreement was found between PROTOCOL.md, DECISIONS.md's Settled list, CONTENT-GATE.md and the
ledger for this packet's scope. Two internal inconsistencies were found (an imprecise handoff note, and a
ledger item whose own claim is wrong) — both detailed in §5, neither blocking, both self-contained.

## 1. Section identity and the verbatim spec

`node audit/scripts/ledger.mjs packet 54 --open` and `node audit/scripts/ledger.mjs packet 54` both list 31
ids for section `assessing-competitiveness` (saved: `ledger-packet-54.txt`, `ledger-packet-54-open.txt`).
`audit/PROGRESS.md:107`: `| 54 | assessing-competitiveness | 7 | not started | | | |`.

The IAL number is **3.3.5**, found by WORDING not by number (Rule 1): `grep -n "Assessing competitiveness"
audit/raw/bus_spec.txt` → line 1218, `grep -n "3\.3\.[0-9]" audit/raw/bus_spec.txt` shows 3.3.1 through 3.3.6
in sequence with 3.3.5 between "Influences on business decisions" and "Manging change" [sic, spec's own typo].
Verbatim (`audit/raw/bus_spec.txt:1218-1248`):

```
3.3.5 Assessing competitiveness

What students need to learn:

1 Interpretation of         a) Statement of comprehensive income (profit and
  financial                     loss account):
  statements                     • key information
                                 • stakeholder interest.
                             b) Statement of financial position (balance sheet)
                                 • key information
                                 • stakeholder interest.
2 Ratio analysis            a) Calculate:
                                 • profitability (gross profit margin and profit for the
                                   year margin)
                                 • liquidity (current and acid test ratios)
                                 • gearing ratio
                                 • return on capital employed (ROCE).
                             b) Interpret ratios to make business decisions.
                             c) The limitations of ratio analysis.
3 Human resources           a) Calculate and interpret the following to help make business
                                decisions:
                                 • labour productivity
                                 • labour turnover and retention
                                 • absenteeism.
                             b) Limitations of these calculations.
                             c) Human resource strategies to increase productivity and retention
                                and to reduce turnover and absenteeism:
                                 •   financial rewards
                                 •   employee share ownership
                                 •   consultation strategies
                                 •   empowerment strategies.
```

23 leaves total — re-derived two ways and both agree: (a) reading the spec text above by hand (1 + 2 + 2 + 1 +
4 + 1 + 2 + 4 + 1 = wait, counted directly: 1a-1, 1a-2, 1b-1, 1b-2, 2a-1..2a-4, 2b, 2c, 3a-1..3a-3, 3b, 3c-1..3c-4
= 2+2+4+1+1+3+1+4 = 18 leaves, plus the 5 parent "requirement" rows 1a,1b,2a,3a,3c = 23 rows total); (b)
```
node -e '... arr.filter(x=>x.id.startsWith("BUS-3.3.5")) ...'
```
→ `{ requirement: 5, leaf: 18 }`, 23 total, exact match. `audit/raw/spec-items.json` is not missing any bullet
for this subtopic (contrast the known dropped-bullet bug in `build-spec-items.mjs` that hit Business 3.3.1's
Ansoff/Porter bullets, per `audit/DECISIONS.md` ~line 730 — every 3.3.5 bullet sits on its own line in the raw
text, which is the pattern that bug does NOT drop).

**Ledger item `structure-08` claims "3.3.5 does not match the IAL spec, where assessing competitiveness is
3.5" — this claim is wrong.** 3.3.5 is the correct IAL number per the spec text above. The item already
carries a "SPEC NUMBERING" correction note dated 13 Sep 2026 saying so. Treat it as a candidate for
`wont-fix`, not as work.

## 2. Current live/staged content — read, not run

Method: read the most recent pre-publish snapshot,
`audit/snapshots/auto-prepublish-2026-09-25T12-11-43-061Z__business__assessing-competitiveness.json` (taken
automatically 25 Sep, immediately before packet 2.9's diagram-pin publish). Confirmed nothing content-shaped
has touched this section since: `git log --oneline -- '*assessing-competitiveness*'` shows, most-recent-first,
`fc91372 packet-2.9: pin the banks...` (diagram pinning only, not content/quiz/practice) then `5087b7e
packet-13: strip what the IAL specification does not contain...`. This is a snapshot read, not a live `curl
localhost:3001/api/sections/assessing-competitiveness?draft=1` — the Build/Gate phase must re-confirm field by
field against the live draft per PROTOCOL.md rule 5, not trust this file.

Current shape: 1 content block ("Financial Ratios", 2 subsections: `profitability-ratios`,
`liquidity-gearing-ratios`), 1 notes entry ("Financial Ratios for Competitiveness"), 10 quiz, 5 practice, 18
flashcards, 5 common_mistakes, 0 diagrams, extras = 1 chain + 1 evaluation on benchmarking. One `fillin` recall
exists (`assessing-competitiveness:sub:profitability-ratios:recall`, blanks "revenue" / "costs" / "employed");
the `liquidity-gearing-ratios` subsection has no recall at all; 0 `reorder` recalls anywhere. No block or
subsection carries `quizIndices`, `practiceIndices` or `diagramRef` keys.

**Important: this is NOT the two-block structure several ledger items describe.** Packet 13 (14 Sep, commit
`5087b7e`) removed a second content block called "Core Competencies" that taught VRIO and core competencies —
confirmed in `audit/PROGRESS.md`'s own packet-13 row ("core competencies from assessing-competitiveness" is
one of "five blocks removed") and in `audit/NEXT.md`'s 14 Sep Verify B note ("assessing-competitiveness is 1
block with no VRIO, competencies, scorecard or five forces"). A direct text search of the full 25-Sep snapshot
confirms: `VRIO` 0 hits, `Five Forces` 0 hits, `scorecard` 0 hits, `Bowman` 2 hits (see below — this one is
current, not stale).

## 3. The 31 ledger ids, cross-checked against §2 — grouped by whether they still match live content

This is the check Rule 1 and "Verify independently" require: each item's text was matched against the current
snapshot by an independent method (direct string search / field read), not by trusting the item's own wording.

**Group A — describe content that packet 13 already removed. Re-verify before acting; may need `wont-fix`,
not a fix.**
- `C-assessing-competitiveness-topFix-03` — "Move the VRIO/core-competencies block out... if it stays, add
  MCQs" — the block does not exist; nothing to move or keep.
- `C-assessing-competitiveness-accuracy-02` — quotes "Core Competencies > vrio-framework > examMatters" — that
  field does not exist in current content.
- `C-assessing-competitiveness-structure-01` — "content[] = Block 1 'Financial Ratios' + Block 2 'Core
  Competencies' (VRIO...)" — there is only Block 1 now.
- `C-assessing-competitiveness-structure-02` — "all 5 practice questions are strategy frameworks (0 on Block
  1's ratios)... 0 on Block 2's VRIO" — false against current content: quiz q6-q9 are already HR/ratio-limits
  content (labour turnover, empowerment, window dressing, ROCE-vs-borrowing-cost), and Block 2 does not exist.
- `C-assessing-competitiveness-specGap-07` — "Out-of-spec content occupying the section: VRIO framework and
  'tangible vs intangible competencies'" — not present.
- `C-assessing-competitiveness-practice-01` — "p0: 'Explain two of Porter's Five Forces...' (4 marks)" — the
  current p0 is "Define the term 'competitive advantage' and give one example..." (4 marks); Five Forces text
  is not present anywhere in the section.
- `C-assessing-competitiveness-structure-08` — see §1: the numbering claim itself is wrong.

**Group B — still match live content verbatim or in substance. Remain open, actionable work.**
- `topFix-01` (add financial-statements + HR blocks), `topFix-02` (rewrite all 5 practice items with a
  levels-based scheme), `topFix-04` (fix Tesla date, flashcard formula, patents wording, current-ratio
  qualifier), `topFix-05` (add fillin/reorder recalls + `quizIndices`/`practiceIndices`) — all describe gaps
  confirmed present in §2 (no financial-statements/HR block, no `quizIndices` keys, only 1 of the 4
  recall-eligible spots filled).
- `accuracy-01` — Tesla ROCE claim confirmed verbatim in `liquidity-gearing-ratios.realExample.text`:
  *"Tesla's ROCE improved dramatically from negative figures in 2019 to over 25% by 2023..."* — sitting in the
  liquidity/gearing subsection while being a profitability-ratio (ROCE) example, exactly as the item states.
  Whether "2022" vs "2023" and the specific percentages are factually correct is a claim for Build/Verify to
  check against a source, not something read off the file.
- `accuracy-03` — flashcard `card:3546baa0` confirmed verbatim: *"Net profit margin = (Operating profit ÷
  Revenue) × 100%"* — the spec (§1, 2a) names "profit for the year margin", not "net profit margin" computed
  from operating profit.
- `quiz-01`, `quiz-02` — q6 ("Labour turnover is calculated as...") and q7 ("Which HR strategy involves giving
  employees greater authority...", correct answer "Empowerment", distractor "Zero-hours contracts") both
  confirmed present verbatim; both test HR content that has no matching Learn block (Group B topFix-01 closes
  the "no matching block" half of this).
- `practice-02` — SwiftDeliver / Bowman's Strategic Clock, 6 marks, confirmed present verbatim at index p1.
  `Bowman` is confirmed absent from `audit/raw/bus_spec.txt` (0 hits) — off-spec, as the item says.
- `practice-03` — the 20-mark smartphone-manufacturer question confirmed present verbatim at index p3 (the
  item calls it "p4"; current array position is p3 — a reordering since the item was written, not a content
  difference). Its guidance is indicative-content prose ("Introduction:... Factor 1 — Innovation and R&D:...
  Factor 2..."), not a Level-banded scheme — see §4 on the 26 Sep marking ruling this must follow. The item's
  claim that the stem "does not reference the smartphone context" reads as inaccurate today: the stem itself
  is the smartphone scenario. The item's other point — no ratio/statement/HR practice exists anywhere in the
  5-item bank — still holds (p0 competitive-advantage, p1 Bowman, p2 bakery-ratios, p3 smartphone, p4
  ratio-calc: 2 of 5 touch ratios, 0 touch financial statements or HR).
- `structure-03`, `structure-04` — confirmed: no `quizIndices`/`practiceIndices`/`diagramRef` on either block
  or subsection; **but** `structure-04`'s "Zero recall widgets (0 reorder, 0 fillin)" is now only half true —
  one `fillin` exists on `profitability-ratios` (see §2). Do not have `topFix-05` re-add a duplicate fillin
  there; the gap is a fillin/reorder missing from `liquidity-gearing-ratios` and a reorder missing everywhere.
- `structure-05`, `structure-06`, `structure-07`, `structure-09`, `structure-10` — describe the current
  2-subsection, 0-diagram, ROCE-in-the-wrong-place, absolute-wording structure; all consistent with §2.
- `specGap-01` through `specGap-06` — cross-checked against §1's spec leaves and confirmed genuinely absent
  from content/notes/extras in §2 (financial statements 1a/1b, HR calculations and strategies 3a/3b/3c, ROCE
  vs cost of borrowing). `specGap-06`'s claim that ROCE-vs-borrowing-cost is "tested in quiz Q10" matches
  current q9 (0-indexed) verbatim: *"If a firm's ROCE is 8% and its cost of borrowing is 10%..."* — confirmed
  not taught in the body (grepped `current-content-block0.json` for "borrow"/"interest rate": only gearing's
  general "amplifies profits and losses" language, never a comparison to a borrowing rate).
- `specThin-01` — "1a... key information — named but never defined" — confirmed: neither subsection's body
  defines or names the statement of comprehensive income at all (it is not in scope of either subsection's
  content, which only covers ratios).

## 4. `audit/raw/spec-coverage.json` entry (step 3 of the packet's instructions)

Key `business__assessing-competitiveness`, number `"3.3.5"`, `covered: 6, thin: 4, missing: 11`. Full entry
saved at `audit/runs/packet-54/spec-coverage-entry.json`. `missingItems` (11) and `thinItems` (4) are consistent
with §2/§3's live-content read — nothing has been added to close them since this audit ran (12 Sep, per the
ledger's own dating of items sourced from it). **Its `headline` text — "the notes instead teach off-spec UK
A-level material (VRIO, Porter's Five Forces, balanced scorecard, benchmarking, triple bottom line)" — is
stale**, predating packet 13's 14 Sep strip; the current single notes entry teaches none of those (confirmed
§2). Treat `missingItems`/`thinItems` as still-live candidates; treat the headline's off-spec claim as history,
not present state. `missingItems`/`thinItems` map 1:1 onto spec leaves already named in `topFix-01`,
`specGap-01/02/03/04/05` above — no new work beyond what's already in Group B.

## 5. `audit/validator-baseline.json`'s `spec.uncovered` set — undercounts, verified by reading the algorithm

`grep -c "assessing-competitiveness" audit/validator-baseline.json` → 24 rows baselined for this section;
`grep -c "assessing-competitiveness|spec.uncovered"` → 8 of those are `spec.uncovered`: leaves `2a-2` (acid
test), `2b` (interpret ratios), `3a-2` (labour turnover/retention), `3a-3` (absenteeism), `3b` (limitations of
HR calcs), `3c-2` (ESOP), `3c-3` (consultation), `3c-4` (empowerment).

`audit/NEXT.md:9325`'s "Known limits" note says *"`spec.uncovered` now names the two HR-strategy leaves it is
missing"* — the actual count is 8 baselined leaves for this section (5 of them HR, 2 ratio-related, 1
statement-interpretation-related), not two. Treat that note as imprecise/stale, not as the scope.

**A ninth leaf is genuinely untaught but is NOT in the baseline: `BUS-3.3.5-3c-1` (financial rewards).** A
direct text search of the full 25-Sep snapshot (`grep`-equivalent over the whole JSON) finds zero occurrences
of "financial reward" anywhere — content, notes, flashcards, quiz, practice or extras. Read
`lib/content-validator.mjs:886-905` (not run — read) to find why it isn't flagged: the leaf's distinctive terms
are `["financial", "rewards"]`, and the check only requires `Math.ceil(terms.length / 2)` = **1** of those two
words to co-occur inside a single text field to mark the leaf covered. The standalone word "financial" appears
repeatedly throughout the section's existing ratio/gearing text (e.g. "financial risk", "financial position")
and satisfies that threshold on its own, with the concept "financial rewards" (an HR strategy) never actually
taught. `audit/DECISIONS.md` documents this exact class of false negative independently at least three times
(14 Sep packet-14 entry: "`spec.uncovered` is lexical... taught in substance and still reported" — the inverse
direction of the same mechanism; the packet-31/multi-leaf-renumbering note ~line 1078; and the packet-34/39b
note ~line 3053 stating outright "`spec.uncovered` reads content, notes and extras only" and describing a
matching keyword satisfied without the leaf being taught).

**Consequence for Build: do not rely on `npm run validate`'s `spec.uncovered` finding set, before or after
this packet's edit, to confirm HR-strategy coverage is complete.** Use `audit/raw/spec-items.json`'s 23
`BUS-3.3.5-*` rows as the actual checklist (all 4 HR strategies — financial rewards, ESOP, consultation,
empowerment — plus both financial statements' stakeholder-interest leaves, 1a-2 and 1b-2, which are also
`missingItems` per §4 but likewise want independent confirmation rather than a baseline-diff alone).

## 6. What "done" means for each open id — mapped to spec leaves and the constraints in §7

| id | spec leaf(s) closed | done means |
|---|---|---|
| topFix-01 | 1a, 1a-1, 1a-2, 1b, 1b-1, 1b-2, 3a (all), 3b, 3c (all 4) | a new block/subsection teaches both statements' key info + stakeholder interest, and HR calculations + all 4 strategies, in `content[]` (not only flashcards/quiz) |
| topFix-02 | 2b, 2c (exam application) | 5 practice items rewritten at IAL tariffs with a scaffold-first paragraph (F116 #6) then a Levels-based scheme per §7's marking ruling |
| topFix-03 | — | **verify Group A first — likely already done, nothing to move** |
| topFix-04 | 2a-1, 2a-3 accuracy | Tesla date/example relocated or corrected; flashcard formula fixed (closes accuracy-03 too); patents wording; current-ratio qualifier |
| topFix-05 | recall contract compliance | `quizIndices`/`practiceIndices` set per block; a fillin added to `liquidity-gearing-ratios` (not `profitability-ratios`, which already has one); one genuine-sequence `reorder` added |
| accuracy-01 | 2a-3/2a-4 accuracy | Tesla ROCE claim fact-checked against a real source or replaced; moved to the profitability subsection or replaced with a real liquidity/gearing example |
| accuracy-02 | — | **verify Group A first** |
| accuracy-03 | 2a-1 accuracy | flashcard 2 formula corrected to profit-for-the-year margin |
| quiz-01, quiz-02 | 3a-2, 3c-4 (already tested; need a matching block) | closed once topFix-01 gives these questions a home in `content[]` |
| practice-01 | — | **verify Group A first** |
| practice-02 | off-spec removal or relabel | Bowman's Strategic Clock replaced with an on-spec 3.3.5 6-mark item, or explicitly kept as a labelled extension per whatever this packet decides (no existing Settled decision covers it — flag for the builder to decide and record, not this brief's job) |
| practice-03 | 2c / 3b application | levels-based scheme per §7; stem already anchored — no rewrite of the stem needed, only the scheme |
| structure-01, 02 | — | **verify Group A first (both already resolved by packet 13's removal)** |
| structure-03, 04 | recall contract | see topFix-05; do not duplicate the existing `profitability-ratios` fillin |
| structure-05..07, 09, 10 | pedagogy / accuracy | addressed as topFix-01/02/04 land content |
| structure-08 | — | **wrong claim — close `wont-fix`, do not act** |
| specGap-01..06 | 1a-2, 1b (all), 3a (all), 3b, 3c (all), 2c-application | closed by topFix-01/02 |
| specGap-07 | — | **verify Group A first** |
| specThin-01 | 1a-1 | closed by topFix-01 |

## 7. Constraints from PROTOCOL.md / CONTENT-GATE.md / DECISIONS.md that apply to Build (not this brief)

- **Snapshot before writing.** `audit/content-sections/business__assessing-competitiveness.json` is dated 11
  Sep — **older than packet 13's strip and packet 2.9's pin**, i.e. it is not today's t=0. Build must run
  `snapshot-touched-sections.mjs` fresh before any write, not reuse that file as the restore point.
- **Write path**: `stageSection()` → `draft` → `scripts/publish-section.mjs --confirm`; never write `data`
  directly (PROTOCOL.md §2, "Content writes are snapshot first"). This packet is staged only — Rule 6 in the
  session prompt forbids publish/restore; if a founder publish is wanted, Build must say so and name
  `scripts/publish-section.mjs --confirm assessing-competitiveness` as the exact command, not run it.
- **Gate step 5**: after `--stage`, verify field-by-field against `curl
  "localhost:3001/api/sections/assessing-competitiveness?draft=1"`, not against the staged file.
- **Recall contract** (CONTENT-GATE.md:196-232): `reorder` only for a genuine one-defensible-order sequence
  (topFix-05's borrow→gearing→interest→downturn→insolvency chain fits this shape); `fillin` needs
  `answers[]`/`hints[]`/2-3 `distractors[]`; every recall needs a one-line `why`.
- **F116 checklist item 6** (CONTENT-GATE.md:259-265): practice guidance's first paragraph must be scaffold
  only — no figure, no mark allocation, no answer — before the mark scheme; `practice.opening` is a mechanical
  check but only a person judges whether the opening actually gives nothing away.
- **26 Sep founder ruling on marking** (DECISIONS.md, "marking follows Pearson's sample mark schemes,
  everywhere"): `lib/ao-spec.js`'s corrected ALLOCATION table governs; the 20-mark item (practice-03/p3) needs
  **KAA 12 across Levels 1-4 + Evaluation 8 across Levels 1-3**, not a flat point list. The ruling gives 8-mark
  and 14-mark shapes explicitly but not a 6-mark or 10-mark shape (topFix-02 proposes a 6-mark and a 10-mark
  item) — Build must reconcile this against the corrected table itself, not invent a shape; this brief does
  not resolve it.
- **Recall baseline**: `assessing-competitiveness` has no row in `audit/recall-census-baseline.json` (checked:
  filtering all keys for "assessing" returns none) → PROTOCOL.md §4a holds it to **zero** new
  recoverable-by-scrolling debt. Any new HR/ratio content that answers itself elsewhere on the page will fail
  `npm run recalls` unless the baseline is explicitly raised with a reason recorded in DECISIONS.md.
- **Rule 3** (content can crash production without a deploy): before any publish (not this packet's job),
  confirm components on `origin/main` can read every field the new HR/financial-statements block introduces.
- **Rule 5** (shared worktree): `git status --short` at the top of this session showed many files already
  modified/staged by other in-progress work (packets 12.3, 36, 37, 40, 44, 46, plus core app files) — Build
  must stage only the files it actually changes, by name, never `git add -A`, and must not touch
  `audit/EXAM-PRACTICE.md` or commit `audit/ledger.json` while a verifier may be running.

## 8. Counts, with the commands that produced them

- `node audit/scripts/ledger.mjs packet 54` → **31 items**, all `open` (saved `ledger-packet-54.txt`,
  `ledger-packet-54-open.txt`, identical — 0 confirmed/wont-fix/rejected).
- Kind breakdown (`node audit/scripts/ledger.mjs packet 54 | awk '{print $2}' | sort | uniq -c`): topFix 5,
  accuracy 3, quiz 2, practice 3, structure 10, specGap 7, specThin 1 → sums to 31.
- `audit/raw/spec-items.json` BUS-3.3.5 rows: **23** (`requirement: 5, leaf: 18`), re-derived independently by
  hand-counting the verbatim spec text in §1 — both counts agree.
- `audit/validator-baseline.json` rows for this section: **24** total, **8** of them `spec.uncovered` (§5), plus
  1 genuinely-uncovered leaf (`3c-1`) the baseline misses (§5) — so the real uncovered-leaf count Build should
  work from is **9 of 23**, not 8.
- `audit/raw/spec-coverage.json` entry: `missing: 11`, `thin: 4`, `covered: 6` (11+4+6 = 21, not 23 — 2 leaves'
  discrepancy between this 12-Sep audit's count and spec-items.json's 23; not investigated further here, out
  of this brief's scope, flagged for Build/Verify A to notice rather than silently propagate).
- Current live snapshot (§2): 1 block, 2 subsections, 10 quiz, 5 practice, 18 flashcards, 5 common_mistakes, 1
  notes entry, 0 diagrams, 1 fillin recall, 0 reorder recalls.

## 9. Escalation assessment

No disagreement was found between the handoff documents that a founder needs to resolve. The apparent
"contradictions" surfaced above (§1 structure-08's wrong numbering claim, §4's stale spec-coverage headline,
§5's imprecise "two leaves" note and the undercounted `spec.uncovered` baseline) are all internally resolvable
by reading the underlying spec/code directly, which this brief has done; none of them require a founder
decision, and none of them block Build from proceeding. Not escalating. The one open judgement call for Build
to make and record, not invent silently, is practice-02's Bowman's-Strategic-Clock disposition (§6) and the
6-mark/10-mark tariff shapes under the 26 Sep marking ruling (§7) — flagged, not resolved, here.
