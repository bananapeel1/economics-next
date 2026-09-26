# Packet 49: built (business-growth, IAL Business 3.3.2, WBS13)

Build phase, 26 September 2026. **Staged to `draft`. Not published and not committed.** Each "passes" below
names the command that produced it. Nothing here was checked in the Learn Mode page or at any phone width.
Verify A and Verify B have not run.

## Handoff-document check

`audit/NEXT.md` has no `## Packet 49 spec` heading, the same gap packets 41-53 hit. Its newest handoff
(packet 51's bookkeeping pass) names packet 49 as the next free packet. `PROGRESS.md:102` reads "not started"
with Opens 10. Opens counts traffic, not items, so this is not a contradiction. PROTOCOL, the DECISIONS Settled
list and CONTENT-GATE (the recall contract, the per-section checklist and both check-in answer rules) do not
contradict each other or the ledger for this packet's scope. Nothing was escalated. I read the brief
(`brief.md`) and checked its three candidates myself:
- **Demergers: confirmed absent.** The live row's t=0 snapshot has 0 hits for `demerg`, eBay or Skype, and so
  does the live API (`served-check.log`).
- **Staying small: confirmed off-spec.** See scope call 2.
- **`common_mistakes[1]`: present in the live row.** Its examTip reads "Draw a simple supply chain diagram in
  your head" (t=0 snapshot).

## What was built

`business-growth` is rebuilt to **3.3.2 only** (`bus_spec.txt:1117-1142`: the heading is at `:1117` and 3.3.3
is at `:1146`). The oracle has 18 rows and 16 leaves, and the runner asserts that count. 16 of 16 leaves are
evidenced (`spec.coverage` INFO, `stage.log`).

| | live (`data`, unchanged) | staged (`draft`) |
|---|---|---|
| blocks / subsections | 2 / 3 (Growth Methods; Growth Decisions = Reasons for Staying Small alone) | 5 / 15: Why Businesses Grow (1a) · Organic Growth (1b, 2a-2b) · Mergers and Takeovers (3a bullets 1-4) · Inorganic Growth: Risks and Rewards (3a bullet 5, 3b) · Problems Arising From Growth (4a-4c) |
| recalls | 1 | 15, one per subsection: 7 classify, 4 match, 3 fill-in, 1 reorder |
| quiz / practice | 10 / 5 (Define 4, Analyse 6, Assess 10 Ansoff, Evaluate 20, Outline 4 barriers to entry) | 25 (3 unpinned pre-test, keys 7/6/6/6) / 7 on one source: Calculate 4 · Explain 4 · Discuss 8 · Assess 12 · Assess 12 · Evaluate 20 · Evaluate 20 |
| diagrams | 0 | 5 (5 views), one per block, pinned by `diagramId` |
| flashcards / mistakes / extras | 18 / 5 / 4 chains + evaluation | 28 / 7 / 4 chains + 3 evaluation (plain text, no Markdown) |
| validator, this section | 12 BLOCK / 19 DEBT / 1 recoverable | 0 BLOCK / 0 DEBT / 5 INFO, 0 recoverable; 27 baselined findings clear on publish |

Every figure comes from one firm (`FIRM`, `scripts/_packet49-util.mjs:89`): Tanjong Bakes, an invented
Singapore bakery-café chain. The section uses one currency (S$), no year and no real company.

## Scope calls, each settled on the document (Rule 1)

1. **Numbering.** Six ids cite "3.2.1"-"3.2.4" or "3.1.3". `grep "3\.2\.[0-9]|3\.1\.3" bus_spec.txt` finds
   0 hits, and the runner asserts that. Each id was mapped by its wording (`LEAF_MAP`,
   `_packet49-content.mjs:491`), and the runner asserts the headings of 3.3.1, 3.3.2 and 3.3.3 by line.
2. **Reasons for staying small (specGap-05): wont-fix, and the live subsection is removed.** "staying small"
   has 0 hits in `bus_spec.txt`. "small business" occurs only at `:1032`, which is 2.3.5 · 3b, owned by
   `external-influences`. The runner asserts both facts. One pointer citing 2.3.5 stays, in the chapter-1
   notes. A new row is in `audit/SPEC-OWNERSHIP.md` (worktree only, see Files).
3. **Demergers (accuracy-01, accuracy-02, specGap-06): wont-fix, already resolved.** Packet 13 removed the
   subsection on 14 Sep. It has 0 hits in the live row, the spec and the draft, and it is banned
   (`BANNED[0-1]`, util :156).
4. **Ansoff (practice-01)** is 3.3.1 · 2a, and the runner asserts it occurs in 3.3.1 and nowhere in 3.3.2.
   **Barriers to entry (practice-02)** has 0 hits in the spec. Both are banned and both practice items are
   replaced.
5. **Vocabulary.** "Backward/forward" are taught as the two directions of the spec's own "vertical
   integration", so they are assessed. The five internal economies are what "economies of scale (internal)"
   contains, so they are also assessed. "Synergy" has 0 hits in the spec, so it is an aside: one mention, in
   teaching text, never assessed (`ASIDES`, util :176). Franchising is 2.3.1 · 4b. It gets one pointer that
   carries "2.3.1", never assessed (`POINTER_ONLY`, util :170). These are my calls. No verifier has reviewed
   them.
6. **Paper shape.** 3.3.2 is Unit 3. Per DECISIONS Settled 26 Sep and `ial-paper-structure.json` units_3_4,
   that means one source set of 4/4/8/12/12 plus two Evaluate 20s. The runner parses the Units 3/4 Assess
   tariff (12) out of Appendix 6.
7. **Check-in answer rule.** I wrote each chapter's pinned items about something its diagram does not show:
   - Chapter 1 draws the six sources of economies of scale, so its pins cover power, share, brand and profit.
     The items that name a type of economy are the unpinned pre-test.
   - Chapter 3 draws the integration types, so its pins cover merger versus takeover, the reasons, and
     combining. The two integration-naming items are spaced into chapter 4, whose diagram does not draw them.
   - Chapter 5 draws the cost curve only, so its pins cover causes, communication and overtrading.

   Chapters 1, 2, 4 and 5 print no figure on their diagram. The Calculate item's answer (22.5%) and its
   wrong-base 29% appear only in its own scheme. The runner checks this, and the check was A/B'd. My reader
   pass is in `checkin-surfaces.txt`, and I judge all 5 check-ins clean. **That is the builder's reading. It
   is not the leaks/clean line that Verify A and Verify B each owe.**

## Files

New:
- `scripts/_packet49-util.mjs`: `FIRM` :89, `BANNED` :156, `POINTER_ONLY` :170, `ASIDES` :176.
- `scripts/_packet49-content.mjs`: 15 subsections (:35-:418), `BLOCK_PLAN` :422, `LEAF_MAP` :491, `NOTES` :519.
- `scripts/_packet49-assessment.mjs`: `QUIZ` :62, `EXTRACT` :162, `PRACTICE` :164, `FLASHCARDS` :202,
  `MISTAKES` :237, `EXTRAS` :275.
- `scripts/_packet49-diagrams.mjs`: economies :79, organic :110, chain :149, weigh :180, cost curve :225
  (sampled from `COST_CURVE` :201), `DIAGRAMS` :240.
- `scripts/packet-49-business-growth.mjs`: the runner (dry run / `--dump` / `--stage`), sections 1-12.
- `audit/snapshots/2026-09-26-pre-packet-49__business__business-growth.json`: the t=0 snapshot of all 8
  tables, taken before any write (`snapshot.mjs`, `snapshot.log`).
- `audit/snapshots/packet-49-bundle__business__business-growth.json`: the staged bundle.
- `audit/runs/packet-49/`: `snapshot.mjs`, `draft-before.mjs`, `draft-readback.mjs`, `ab-mutation.sh`, the
  logs, `checkin-surfaces.txt` and `diagrams-preview.{html,png}`.

Modified, **worktree only and NOT staged:** `audit/SPEC-OWNERSHIP.md`, one new row after the Ansoff row. The
file already has another session's staged hunk and a separate unstaged hunk (the Ansoff row edit), so running
`git add` on it would sweep that session's work. Splice this row in by hunk at commit.

`audit/ledger.json` was written only through `ledger.mjs` and is **not staged**. It carries other sessions'
unstaged changes.

## Per ledger id (23 claimed, 4 wont-fix)

C = `_packet49-content.mjs`, A = `_packet49-assessment.mjs`, D = `_packet49-diagrams.mjs`, U = util,
R = the runner.

| id | what changed | where |
|---|---|---|
| topFix-01 | Economies of scale, diseconomies and overtrading are taught in Learn Mode, and every quiz and practice item is pinned by its block tag | C:35-106, :345-418; R section 4 |
| topFix-02 | A "Problems Arising From Growth" chapter: diseconomies, internal communication, overtrading. The demergers subsection it replaces was already gone, and demergers is banned | C:345-418, :460; U BANNED[0] |
| topFix-03 | The chain diagram, from wheat farms to consumers, with backward vertical, horizontal (Golden Crust), forward vertical and conglomerate marked | D:149-178; R `want(2…)` |
| topFix-04 | A fill-in on backward/forward/horizontal (car maker) and a reorder of the takeover-to-savings sequence, sourced from extras chain 1 | C:240-266 (fill-in), C:184-215 (reorder); A:275+ |
| topFix-05 | Ansoff and barriers-to-entry items replaced. The item's two named replacements, re-tariffed to the paper, are an Explain 4 on a drawback of growth and an Assess 12 on the financial risks and rewards of a takeover. Levels 1-4 appear above 6 marks. CMA, MegaRetail and southern England are gone and banned | A:164-196; U BANNED[5-6] |
| quiz-01 | Internal and external economies of scale are taught (two subsections), and the pre-test asks them | C:35-81; A:64-72 |
| quiz-02 | Diseconomies of scale are taught with their causes | C:345-366 |
| quiz-03 | Overtrading is taught (timing, working capital, avoidance) | C:395-418 |
| quiz-04 | Overtrading is taught. The avoid-overtrading explanation covers every distractor, including why recruiting ahead of orders pays cash out sooner (R section 6 asserts it) | A:143-145 |
| practice-01 | The Ansoff Assess 10 is gone. Every stem names Tanjong Bakes on its source | A:164-196; R section 7 |
| practice-02 | The barriers-to-entry Outline 4 is gone. The on-spec 4-markers are Calculate (economies of scale) and Explain (a drawback of organic growth) | A:165, :169 |
| structure-01 | Every tested concept is taught first (R section 6 KEY_TERMS). The pre-test is 3 fixed unpinned items from chapter 1. Every block pins quiz and practice | R sections 4, 6 |
| structure-02 | 15 recalls, one per subsection, all four types | C (a `recall` on every `sub`) |
| structure-03 | 5 diagrams, one per block. The "in your head" tip is gone, and the integration mistake's examTip points at the drawn diagram | D:240; A:242-245; R section 9 |
| structure-04 | 5 blocks of 3 subsections. The Staying Small / Demergers pairing is gone, and the chapter becomes "Problems Arising From Growth" | C:422-470 |
| structure-05 | The logic of growth (economies, diseconomies, overtrading) is Learn Mode steps, not extras-only. A worked judgement (organic or inorganic) models the evaluation before the 20-marker | C:319-343 |
| structure-06 | No takeaway overclaims culture clash. Chapter 4 reads "Culture clash is one reason takeovers disappoint; overpaying is another." No demerger takeaway remains | C:451-458; R section 9 |
| structure-07 | The genuine misconceptions are kept ("organic growth is always the safest", C:170). The demergers misconception is gone. Every subsection has its own subject misconception | C passim; R section 9 |
| structure-08 | Notes have one topic per chapter, 5 = 5, titled as the chapters | C:519+; R section 9 |
| specGap-01 | Objectives of growth: the five internal economies named, external economies, market power over customers and suppliers, market share and brand recognition, profitability | C:35-106 |
| specGap-02 | Diseconomies of scale, internal communication, overtrading | C:345-418 |
| specGap-03 | Reasons for M&A beyond speed (power, share, cost savings, capabilities, supplies/outlets, spreading risk); financial risks and rewards (premium, interest, gearing, dilution, unrealised savings); advantages and disadvantages of inorganic growth | C:184-317 |
| specGap-04 | Methods of growing organically: outlets/capacity, new products, new markets, selling online. Franchising and licensing are named once, with a pointer to 2.3.1 | C:131-154 |
| accuracy-01, accuracy-02, specGap-06 | **wont-fix**: already resolved by packet 13 (14 Sep) and now banned. See the notes on the items | ledger notes |
| specGap-05 | **wont-fix**: off-specification for 3.3.2 (scope call 2) | ledger note; SPEC-OWNERSHIP row |

## What was run, and what each run covers

- **Runner, dry run, then `--dump --stage`.** Exit 0. Before: 12 BLOCK / 19 DEBT. After: 0 BLOCK / 0 DEBT /
  5 INFO, 0 new, 0 recoverable (`runner-final.log`, `stage.log`). `runner-0.log` is the first run: 10
  failures, including 3 recoverable recalls, a length tell, 3 word budgets and a mis-found dashed marker.
  All are fixed; `runner-1.log` is clean.
- **`ab-mutation.sh`.** I planted a defect for each of 16 guards, and all 16 fired. They include demergers,
  Ansoff, staying small, synergy on an assessed surface, an unnumbered franchising mention, a pinned key on
  its diagram, Assess 10, the Calculate answer printed on a flashcard, the quiz-04 explanation, a
  recoverable recall, a structure-06 takeaway, a moved cost-curve marker, a spaced integration item moved
  onto chapter 3, Markdown in extras, a year, and the 2.3.5 pointer. After the modules were restored,
  `shasum -c` reports OK and the clean run has 0 failed checks (`ab-mutation.log`).
- **Draft before and after staging.** Before staging, `draft-before.mjs` showed every table's `draft` null,
  so no one else's staged work was overwritten. After staging, `draft-readback.mjs` read `draft` and `data`
  directly for all 8 tables: `draft` == the bundle and `data` == the t=0 snapshot in all 8, so live is
  untouched (`draft-readback.log`).
- **Second method, through the API.** `check-staged-drafts.mjs business-growth` matches (signed-out slice
  only). A `curl ?draft=1` walked by Python gives 5 blocks, 15 recalls, 5 diagramIds, and 0 hits for
  demerg/Skype/Ansoff/barriers/staying small/CMA. The same curl without `draft=1` still serves the two old
  blocks (`served-check.log`).
- **Rule 3, partial.** origin/main (`2853074`) has all four recall widgets (ReorderRecall ignores
  `shuffled`), `lib/checkin-placement.js` reads `diagramId`, `lib/mistakes-shape.js` reads
  title/mistake/correction/examTip, and FlowChain renders any `resultType` (this bundle uses
  good/bad/neutral). **Not checked:** every other field against main.
- **Diagrams.** Rendered by headless Chrome on a dark background at 400 units, and I looked at them
  (`diagrams-preview.png`). I saw no clipping or overlap. Not checked: the light-theme remap, the app, or
  390px.
- **Gates in the SHARED worktree, after the final stage.** `npm run validate` 0 · `npm run exposure` 0 ·
  `npm run recalls` 0 · `npm test` 363/363. Exposure lists business-growth among the "DECIDED" chapters;
  that is the LIVE row's packet-2.9 `quizIndices: []` on block 2, not this draft.
- **Ledger.** 23 claimed and 4 wont-fix with notes (`ledger-claim.txt`, `ledger-packet49-after.txt`).
  Claimed means not yet confirmed.
- **Not run:** `npm run build`. It would rewrite `.next` under the shared :3001 dev server, and this packet
  touches no file under `app/` or `components/`. Verify A and Verify B were not run either.

## Carried, not this packet's to fix here

- **The public Unit 3 page still teaches the old section.** At `app/business/unit-3/page.js:25,29` (also on
  origin/main) it lists "demergers" and "Demergers & Staying Small". Another session has already staged
  changes to that file. The copy needs to reach main with the publish or before it, as packet 53 did with
  PR #49.
- **The 14 Sep Learn Mode crash note (brief section 5)** is untested here. It is a Verify B question.

## Publish (rule 6: for the founder, not run)

Before publishing, finish Rule 3 against `origin/main` for the remaining fields. Then run:

    node scripts/packet-49-business-growth.mjs --stage && node scripts/publish-section.mjs business-growth --confirm

`publish-section.mjs` writes an `auto-prepublish-…` snapshot before it publishes, and that snapshot is the
restore point if the publish needs undoing. The t=0 snapshot above is the fallback.
