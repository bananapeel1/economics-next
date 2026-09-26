# Verify A — packet 41, `business__external-influences` (IAL 2.3.5)

**Round 2: re-verification after walkthrough fix round B1.** Read-only. Started from
`ledger.mjs unverified 41` and the diff. `audit/runs/packet-41/built.md` was not opened in either round.

**Result: 31 of 31 claimed ids re-confirmed, 0 rejected, after re-deriving every one from the database
as it stands at 17:45. `node audit/scripts/ledger.mjs unverified 41` exits 0.**

## What B1 changed, established from the diff and the file times — not from any claim

Nothing in this packet is committed, so `git diff HEAD` cannot separate B1 from the original build. The
separation is the clock. Verify A round 1 wrote at 17:09 and Verify B at 17:25; the files that moved
after that are:

```
scripts/_packet41-content.mjs        17:34    scripts/_packet41-diagrams.mjs   17:41
scripts/_packet41-assessment.mjs     17:35    scripts/packet-41-*.mjs          17:45
components/PracticeQuestionsTab.jsx  17:35    components/StudyApp.jsx          17:36
components/learn-mode/MatchRecall.jsx 17:36   app/globals.css                  17:36
audit/snapshots/packet-41-bundle__… 17:45
```

Four shipping components and the section's whole content module. That is a wide enough blast radius that
I re-derived **every** claimed id from scratch rather than re-reading round 1's evidence, and I checked
the component edits for regressions against claimed ids separately (§ "What B1 could have broken").

## What I verified against, and why it is not the fix's own evidence

The runner asserts its own content as it builds it, and `--dump` writes the snapshot, so source, snapshot
and runner can agree with each other while the database holds something else. Nothing below rests on any
of the three.

1. **The database, read table by table.** `draft` pulled for all eight content tables of
   `external-influences` straight through `scripts/_db.mjs`, written to a working copy, and every figure
   below computed from that copy. Compared key-sorted with `sameJson` against
   `audit/snapshots/packet-41-bundle__business__external-influences.json`: **equal in all eight tables**,
   so the snapshot is a faithful proxy and the numbers are reproducible from it. Counts as they stand:
   5 content blocks · 24 subsections · 24 recalls · 28 quiz · 12 practice · 49 flashcards · 8 diagrams ·
   9 mistakes · 4 chains · 2 evaluation frames.
   - `data` still holds the pre-packet content. The section is **staged, not published** — same state as
     packet 40.
2. **My own gate call over the payload I fetched**, not `npm run validate` (which reads `data`):
   `gateSection()` from `lib/content-gate.mjs` against `audit/validator-baseline.json.keys` →
   **ok: true, 0 BLOCK, 0 new DEBT, 3 INFO** (`diagram.table-kind` on `63686a9e`; `spec.coverage`
   15 of 15 leaves at 100%; `section.counts`). Round 1 scored the same three. Note that
   `diagram.table-legible` no longer fires at all, where round 1 had it as an INFO-adjacent DEBT
   candidate: B1 rebuilt the tables and the rule's own arithmetic now clears them with room.
3. **The specification, by line, read by me.** `audit/raw/bus_spec.txt:1009` is `2.3.5 External
   influences`; Appendix 6 read at `:2216-2250` for the tariffs rather than taken from
   `lib/ial-marking.js`, which the validator reads.
4. **My own heuristics, re-implemented from each item's own wording**, not the runner's checks — see the
   guessability and collision figures below.
5. **A control.** Where B1 changed a shipping component, I ran its new logic over every other section in
   the database to see what else it touches. That is the A/B this programme's own memory asks for.

## The four walkthrough defects that bear on claimed ids

| Verify B defect | state now | how I know |
|---|---|---|
| 1 — the legislation table is 7.11px at 390px, and no zoom shows a row and its label together | **fixed** | all four `kind:'table'` diagrams are re-authored on a **300**-unit viewBox at a uniform 12px face (`0 0 300 507`, `300 525`, `300 375`, `300 522`). 313/300 = 1.043, so the smallest cell renders at **12.5px** inline at 390px, against 7.11px before. Minimum `x` over all 102 table text runs is **13**, so nothing starts off the left edge; widest right edge is 231 of 300 at a conservative 0.56 advance ratio, so nothing leaves on the right either. At the sheet's Read zoom a 300-box draws at 360px, inside a 390px screen, so the horizontal drag the walkthrough described is gone rather than mitigated. `lib/content-validator.mjs:129` was **not** touched — the fix is in the SVG, not in the rule that measures it |
| 2 — match options run off the left edge (V042) | mitigated in CSS, still V042's | `MatchRecall.jsx:120` adds `lm-match-chip`, and `app/globals.css:7650` inside `@media (max-width: 768px)` gives it `white-space: normal; text-align: left; max-width: 100%` — the same line `.lm-classify-chip` already had. Long options now wrap instead of overflowing. V042 belongs to packet 12 and I have not touched its status |
| 5 — step 1's recall says "four", shows six | **fixed** | `content[0].sections[0].recall.prompt` now reads "A chair maker is hit by **six** separate changes" against a pool of six |
| 6, 7 — literal `**Source A.**` on twelve stems, and the source reprinted twelve times | **fixed, and the right way round** | 0 occurrences of `**` anywhere in `practice`; the control below shows the source card is real de-duplication, not deletion |

Defect 3 (three diagrams with no reachable surface) is handled in `StudyApp.jsx` — see below. Defect 4
(8.54px labels on the four *drawn* diagrams) is unchanged and is the programme-wide V037 condition packet
11 answered with the enlarge sheet, not a packet-41 regression. Defect 8 (the hub says "Start learning"
with a live pointer) is unchanged and belongs to the hub, not to this section.

## What B1 could have broken, checked as a regression rather than taken on trust

- **`PracticeQuestionsTab.jsx:52-81` now strips a shared opening off every stem and prints it once in a
  `practice-source-card`.** If that prefix ever ran past the extract it would eat the task. I ran the
  component's own algorithm over the payload: the computed prefix is **exactly the 541-character Source A
  extract**, and all twelve stems keep their own extra scenario sentence and their own command
  (item 3 keeps "Its borrowing rate rises by 3 percentage points and its orders fall 10%", item 5 keeps
  the three-threat sentence, item 9 keeps the dust-extraction sentence). Under the mark filters, 8 and 20
  are single items and correctly fall back to printing the whole stem.
- **The control.** The same algorithm over `section_practice` for **all 70 payloads** in the database
  (`data` and `draft`, every section, both subjects) fires on **exactly one**: this section's draft. No
  other section gains or loses a line. The `.practice-source-*` rules are new at `globals.css:4318-4329`.
- **`StudyApp.jsx:485` moved the `tabs` filter below `sectionData`** so Diagrams opens for a Business
  section that has diagrams. Checked for a temporal-dead-zone regression: every read of `tabs` is at
  `:1037` or later, well after the new declaration, and `SectionOverview` takes it as a prop. Economics
  keeps the subject gate unchanged, so no section can lose a tab.
- **Gates, re-run after B1, not taken from `gate.log` (which is timestamped 16:48, before B1):**
  `npm test` 279 pass / 0 fail; `npm run exposure` 0 starved, 0 unwritten, 214/214 chapters;
  `npm run recalls` "no section is worse than the baseline", and `recall-census --section
  external-influences` → **0 of 24 answerable by scrolling up**; `npm run contrast` clean.

## Per id

Every row re-derived from the database copy at 17:45.

| id | verdict | the line that makes it so |
|---|---|---|
| topFix-01 | CONFIRMED | `content[0..4].quizIndices` `[3-7][8-12][13-16][17-22][23-27]`, `practiceIndices` `[0-2][3-5][6-7][8-9][10-11]`; I read all 28 stems and all 12 tasks against their own block and every one belongs. Old Q5/Q15 cannot recur — 28 new items, 0 hits for `inventory`, 0 for the GBP sign |
| topFix-02 | CONFIRMED | 0 hits across the whole bundle for Consumer Rights Act, Trade Descriptions, Consumer Contracts, National Insurance, Bank of England, Competition and Markets / CMA, Equality Act, HMRC, Ofcom, Ofgem, HSE, Environment Agency, `£`, Greggs, EasyJet; a non-UK `realExample` on **all 24** subsections (Malaysia, Kenya, Lagos, Vietnam, Indonesia, Pakistan, Colombo …), 0 missing |
| topFix-03 | CONFIRMED | government spending `content[1].s[3]`, health and safety `[3].s[2]`, environmental `[3].s[3]`, competition policy `[3].s[4]`, changing environment `[4].s[3]`, small-business competition `[4].s[4]`. Cost-push, demand-pull, CPI, perfect competition, monopoly, oligopoly, monopolistic and market structure are **0 hits each** — removed, not demoted |
| topFix-04 | CONFIRMED | 24 recalls, one per subsection (7 classify, 7 fill-in, 7 match, 3 reorder), up from 0. Both named sequences are genuine and present: `content[1].s[0].recall` is the interest-rate transmission reorder, `content[2].s[2].recall` is "Put the four phases of the business cycle in the order an economy passes through them". 8 diagrams, one pinned by `diagramId` on each of the 5 blocks, including "The Business Cycle". No SPICED fill-in — a sterling mnemonic barred by topFix-02; its content is taught currency-neutrally at `[0].s[3]` |
| topFix-05 | CONFIRMED | 12 items on one international Source A. All 12 tariffs match Appendix 6 as I read it at `bus_spec.txt:2216-2250`: Define 2, Calculate 4, Construct 4, Explain 4, Analyse 6, Discuss 8, **Assess 10 (the Units 1/2 row, not the 12 of Units 3/4)**, Evaluate 20. `practice[5]` is the external-influences 20-marker that replaces the shareholders one. B1's renderer change does not weaken this: the extract still reaches the student, once per screen instead of twelve times |
| accuracy-01 | CONFIRMED | as topFix-02; the three named quiz items no longer exist |
| accuracy-02 | CONFIRMED | `content[3].s[0].examMatters` ends "a specific business consequence … not the title of a statute" — it refutes the old Consumer Rights Act claim rather than dropping it |
| accuracy-03 | CONFIRMED | exactly one word-boundary `Porter` in the bundle (38 raw grep hits are "imPORTER"), and it is a pointer: "it is taught at 3.3.1 in Unit 3 and applied to market entry at 4.3.2 in Unit 4. It is not part of 2.3.5". Both citations checked in the spec document. The item's "or elsewhere" was wrong and the packet handled it the right way round |
| accuracy-04 | CONFIRMED | 0 hits for cost-push/demand-pull/CPI; the replacement `content[0].s[1].examMatters` is an Appendix 6 Calculate instruction and the body runs the cost/margin chain |
| quiz-02 | CONFIRMED | the old item is gone; `quiz[5]`'s explanation refutes each of the three distractors from the contract's own terms ("says nothing about what the firm charges its own customers, about quantity discounts, or about what happens when it expires") |
| quiz-03 | CONFIRMED | four heuristics re-implemented from the item's own description over all 28: essay stems **0**, key longer than the longest distractor by >40% **0**, two-or-more absolute distractors against a hedged key **0**, duplicate options **0**. I added a fifth of my own — a figure from the stem appearing verbatim in the key and in no distractor — **0** |
| practice-01 | CONFIRMED | 0 hits for shareholder/stakeholder anywhere in the bundle; `practice[5]` is the 20-mark Evaluate on external influences, attached to block 1, levels-marked in four levels, data-response |
| structure-01 | CONFIRMED | 24 recalls and 8 diagrams where there were 0 and 0 |
| structure-02 | CONFIRMED | every inline MCQ read against its own block: block 0 gets margin/currency arithmetic, block 1 interest/tax/government spending, block 2 the cycle, block 3 the six legislation areas, block 4 competitor numbers/size/behaviour |
| structure-03 | CONFIRMED | all 12 practice items attached and topically matched; no orphans |
| structure-04 | CONFIRMED | 25 of 28 inline; the 3 unattached are the pre-test definitions (`quiz[0..2]`); the five hedged Evaluate MCQs are gone |
| structure-05 | CONFIRMED | opens on "What an External Influence Is"; 0 hits for CPI, cost-push, perfect competition, monopoly; the examinable change→response requirement is `content[4].s[3]` |
| structure-06 | CONFIRMED | a recall on all 24 steps, so `pickSpacedRecall` has a pool; block 1's three spec sub-items are now three subsections and all six legislation areas are taught separately |
| structure-07 | CONFIRMED | `content[4].takeaway` is four on-spec lines (numbers → price control, the arithmetic of a price cut, change from outside the trade, what size cannot supply); both off-spec market-structure lines are gone |
| structure-08 | CONFIRMED | 0 hits for "moving abroad", "more competition is always better", "barriers to entry are always"; the 9 kept entries are each a quoted student sentence plus a correction, not a moral |
| structure-09 | CONFIRMED (caveat below) | 4 chains, all distinct; the cost-push flow cannot recur (0 hits); the cycle has `diagrams[2]`, pinned on `content[2].diagramId` |
| specGap-01 | CONFIRMED | `content[1].s[3]` "Government Spending", costed, with its own fill-in recall, `quiz[12]` and `practice[4]` |
| specGap-02 | CONFIRMED (caveat below) | `content[2].s[2]` "Planning Through the Cycle" is a whole subsection with a four-phase reorder, plus `practice[7]` |
| specGap-03 | CONFIRMED | `content[3].s[3]`, with recall, `quiz[20]`, `practice[9]` |
| specGap-04 | CONFIRMED | `content[3].s[4]` "Competition Policy", the spec's own term, 0 named regulators, `quiz[21]` |
| specGap-05 | CONFIRMED | `content[3].s[2]` "Health and Safety" on all four surfaces, including `quiz[19]`'s costed accident arithmetic |
| specGap-07 | CONFIRMED | `content[4].s[3]` "A Changing Competitive Environment", four changes and four responses, explicit |
| specGap-08 | CONFIRMED | settled at `bus_spec.txt:1009`; all five `notes[*].meta` read `2.3.5 · 1a / 2a / 3a, 3b`; `spec-coverage.json` agrees |
| specThin-01 / -02 / -03 | CONFIRMED | `content[3].s[5]` defines all three in the taught body — patent (applied for, examined, 20 years from filing, published), copyright (automatic, no registration, protects expression not idea), trademark (registered per market, renewable without limit) — with a flashcard each, `diagrams[6]`, `quiz[22]`, `practice[8]` and `mistakes[7]`. This no longer depends on `diagrams[6]` being reachable, which was round 1's weak link |

## Caveats recorded on the confirmations

- **`specGap-02` is off-spec as written.** "Economic uncertainty" appears nowhere in
  `bus_spec.txt:1009-1044` and `spec-coverage.json` lists it in neither `missingItems` nor `thinItems`.
  On a strict reading it belonged with `specGap-06` as a scope refusal. I confirm it because the
  substance — a business cannot forecast the cycle, so it prepares — is a whole subsection rather than
  one line of `extras.evaluation`. The *phrase* is still absent, deliberately.
- **`structure-09`: the duplication moved rather than ending.** `extras.chains[0]` and `[1]` restate the
  steps of the `content[1].s[0]` and `content[2].s[2]` reorders almost verbatim. It does not make either
  recall recoverable — the chains sit in the Extras tab and the census still reports 0 of 24 — so it is
  not the defect the item names, but it is the same habit in a new place. Unchanged by B1.

## Found in passing — not a claimed id, not blocking

- **`content[4].s[4]` still states a number the student cannot reproduce, and B1 spread it.** "bespoke
  café fit-outs sell 2,000 chairs at $260 against a list price of $200, and leave **$90,000** more than
  the same chairs sold as standard stock." From the figures on the page a reader computes $120,000. The
  $90,000 is right only because `scripts/_packet41-util.mjs:324` sets `nicheUnitCost = 135`, and that
  cost is never shown. Round 1 found it in two places (the body and `notes[4]`); it is now in **six** —
  body, notes, `flashcards` ("Why can a small firm charge more for bespoke work?"),
  `diagrams[7]`'s last three lines, `diagrams[4]`'s link line, and `practice[11]`'s level-3 guidance.
  One-number fix: state the bespoke unit cost, or quote $120,000.
- **The new source card uses two CSS variables that are not defined anywhere.** `globals.css:4320-4321`
  reads `var(--card-bg, rgba(255,255,255,0.03))` and `var(--border-subtle, rgba(255,255,255,0.10))`;
  `grep -- "--card-bg:" "--border-subtle:"` over `app/`, `components/`, `lib/` and `styles/` returns
  nothing, so the fallbacks always apply. In light mode that is white-on-white: the card's fill and
  border are invisible and only its text shows. `npm run contrast` passes because the declarations do
  resolve through a `var()`; the guard does not check that the token exists. Cosmetic, light mode only,
  and it is the class of thing the light-mode audit was about.
- **Three diagrams are now reachable where the walkthrough found none.** `StudyApp.jsx:485` opens the
  Diagrams tab for any section whose payload carries one, so "Where Each Influence Lands", "Patents,
  Copyright and Trademarks" and "How a Small Business Competes" have a surface. Worth stating that this
  changes a **programme-wide** component for one packet's benefit: Economics is untouched, and no other
  Business section has a diagram row today, so nothing else moves — but the next Business packet inherits
  a tab that appears and disappears per section.
- **Inline labels on the four drawn diagrams are 8.54px at 390px** (12 viewBox units × 313/440). V037,
  mitigated by the enlarge sheet, not a packet-41 regression. The four tables no longer share it.
- **`PROGRESS.md` row 41 still reads "not started"** and its `Opens` column still says 14 against the
  ledger's 33. Gate step 6.

## Unclaimed but relevant

None. `ledger.mjs unverified 41` reports "no scope is left unclaimed"; every 2.3.5 leaf at
`bus_spec.txt:1012-1031` is built (the validator's own `spec.coverage` INFO reads 15 of 15 at 100%);
`specGap-06` is the only unclaimed item, already `wont-fix` with its own citation, and the packet honours
it (0 hits for "market size" or "saturat"). `quiz-01` was confirmed before this packet and I have left it
alone; the Q15 it names cannot recur, since all 28 quiz items are new.

## Gate

Verify A passes round 2. The two blocking defects Verify B raised are closed — the table is legible at
390px and the twelve reprinted sources are one card — and neither fix cost a claimed id. Verify B should
re-walk the section, since B1 changed four shipping components after that walkthrough ran, and the
`PROGRESS.md` row still has to be written before the gate can close.
