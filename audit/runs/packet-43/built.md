# Packet 43 — built: `economic-growth` (IAL Economics 2.3.5, WEC12) — STAGED, NOT PUBLISHED

Build phase, 26 Sep 2026. Content written to the `draft` column only, through `stageBundle()`.
Live `data` is untouched: all 8 tables deep-equal the pre-packet snapshot
(`live-data-unchanged.log`). Not committed. Not published.

## Documents, and one contradiction-shaped gap (not a contradiction)

- No `## Packet 43 spec` heading exists in `audit/NEXT.md` (re-checked this session:
  `grep -n "Packet 43" audit/NEXT.md` → only the packet-42 handoff at :348 and :540, which name
  packet 43 as free with 28 open). The brief (`brief.md` §0) found the same. Treated as missing,
  not as contradicting anything; the ledger + spec defined scope, as packet 41 did. PROTOCOL
  step 1.3 (write the spec block) is left for the orchestrator/handoff — this phase does not edit
  NEXT.md.
- PROGRESS row 43 "13" is the Opens column, not a ledger count (table preamble). No conflict.
- **The brief missed one Rule-1 finding, recorded here:** the live block 3 "The Business (Trade)
  Cycle" is not in the IAL specification. `cycle`, `boom`, `slump`, `trough` = 0 hits in
  `audit/raw/econ_spec.txt`; `recession` = 1 hit, :902, owned by 2.3.1 · 1g. The block is not
  rebuilt; 2.3.5's own fluctuation content (4a trend, 4c gap characteristics) is. The runner
  re-counts all of these (`scripts/packet-43-economic-growth.mjs` §3) and bans them in student text
  (`scripts/_packet43-util.mjs:204-236`), with `recession` sayable only beside its 2.3.1 pointer.

## Files

| File | What |
|---|---|
| `scripts/_packet43-util.mjs` | id scheme, formatters, the Loriana spine (`ECON`), the spec's 1d/2a/3a lists, BANNED (:204), Rule-3 guard (:237), NEEDS_ONE (:250), TEACHING_TERMS |
| `scripts/_packet43-content.mjs` | 5 chapters / 21 subsections / 21 recalls, BLOCK_PLAN (:730), buildContent (:787), LEAF_MAP (:805), NOTES (:842) |
| `scripts/_packet43-assessment.mjs` | QUIZ (:60, 34 items), PRACTICE (10), FLASHCARDS (27), MISTAKES (8), EXTRAS (4 chains, 4 evaluation) |
| `scripts/_packet43-diagrams.mjs` | 4 diagrams / 8 views, all with minted ids; DIAGRAM_FOR_BLOCK (:419) with chapter 3 = `null` |
| `scripts/packet-43-economic-growth.mjs` | the runner: every check below, then validator, `--dump`, `--stage` |
| `audit/snapshots/2026-09-25-pre-packet-43__economics__economic-growth.json` | t=0 live `data`, taken before any write |
| `audit/snapshots/packet-43-bundle__economics__economic-growth.json` | the staged bundle |
| `audit/runs/packet-43/verify-draft-db.mjs` · `verify-placement.mjs` | independent read-backs (below) |

Shape: 6 blocks / 17 subsections / 24 quiz / 5 practice / 3 diagrams (no ids) / 18 cards → **5
chapters / 21 subsections (26 Learn steps: 21 teach + 5 check-in) / 34 quiz (3 unpinned pre-test,
keys 9/9/8/8) / 10 practice covering all nine Appendix-6 pairs / 4 diagrams pinned by `diagramId` +
1 chapter `diagramId: null` / 21 recalls (8 classify, 5 match, 7 fill-in, 1 reorder) / 27 cards / 8
mistakes / 4 chains + 4 evaluation**. Chapters: Actual and Potential Growth (1a-1c) · The Causes of
Potential Growth (1d, 1e) · The Benefits of Growth (2a) · The Costs of Growth (3a) · Output Gaps (4a-4d).

## Per ledger id (26 claimed, 2 wont-fix)

Content line refs are `scripts/_packet43-content.mjs` unless named.

- **topFix-01** (claimed) — diagrams render: not by renaming refs or the retired title matcher; every
  diagram mints an id and every chapter pins `diagramId` (`buildContent` :787; ids in
  `_packet43-diagrams.mjs:227,274,330,401`). PPF is chapter 1's diagram, output gap chapter 5's.
  Placement computed by the app's own `placeChapterItems` over the DB draft: 4 `[pin]`, 1 none
  (`verify-placement.log`).
- **topFix-02** (claimed) — rankings → classify: `environmental-costs` classify (:454), causes of
  potential growth classify (`investment-and-fdi` :180, `innovation` :209); cyclic four-phase reorder
  gone with the off-spec cycle; no duplicated LRAS reorder (one reorder in the section, `balance-of-trade-deficits`
  :484, sourced from extras chain 2); every fill-in has competing same-form distractors
  (injection/withdrawal, net migration/natural increase, absolute/relative, larger/smaller, …).
- **topFix-03** (claimed) — Unit-4 FDI item removed; Define 2 (`_packet43-assessment.mjs` PRACTICE,
  first item); Outline gone; Explain 6 (unnamed by any id) gone; pins by chapter tag, derived by the
  runner §0; every >6-mark item levels-marked with no "(n marks)" (runner §4).
- **topFix-04** (claimed) — PPF wording: :72 "from inside the PPF towards the frontier", misconception
  :77, MISTAKES[0]; runner §7a asserts no sentence calls actual growth a movement along the frontier.
  "Elastic section of SRAS" → one named model, the Keynesian long-run AS curve (:100, diagrams).
  "Falling real wages" 0 hits. Cycle-phase names: none remain (trade cycle removed, see above).
- **topFix-05** (claimed) — Block 6 merged (AD half → `actual-growth-from-aggregate-demand` :91; LRAS
  half → chapter 2 diagram); new 34-item bank, no duplicate stems; export-led :124, trend :565,
  firms :349, current/future living standards :416 taught.
- **accuracy-01** (claimed) — as topFix-04's PPF clause; checked across body, misconception,
  flashcards, mistakes, notes (runner §7a over every readable string).
- **practice-01** (claimed) — "Define the term 'potential economic growth'. (2 marks)".
- **practice-02** (claimed) — Unit-4 framing removed ("developing countries" banned; "promotion of FDI"
  asserted to be 4.3.6 · 3a by line, runner §3); FDI taught in 2.3.5 terms (:161) and assessed by
  "Analyse how foreign direct investment may increase an economy's potential growth. (6 marks)".
- **structure-01** (claimed) — as topFix-01.
- **structure-02** (claimed) — no AD/AS chapter; runner §7a asserts it.
- **structure-03** (**wont-fix**, note in ledger) — the block it sequences is off-spec and not rebuilt.
- **structure-04** (claimed) — premise superseded by packet 5's one-subsection-per-step model;
  `buildSteps` over this content = 21 teach + 5 check-in.
- **structure-05** (claimed) — practice pinned by chapter tag. A check-in surfaces ONE practice item
  (`components/learn-mode/utils.js:111-113`), so each chapter's first pin is chosen: Define 2 ·
  Analyse 6 · Examine 8 · **Evaluate 20** · Discuss 14 (runner asserts; `verify-placement.log`).
- **structure-06** (claimed) — all 31 non-pre-test items pinned to their own chapter; exactly 3
  unpinned, first, chapter-1-answerable (runner §7).
- **structure-07** (claimed) — every misconception is a belief; technique moved to `examMatters`
  (runner §7a regex over all 21).
- **structure-08** (claimed) — no takeaway gives exam advice; costs takeaway names the trade deficit
  (BLOCK_PLAN :730; runner §7a).
- **structure-09** (claimed) — no cycle phases; "sustainable growth" banned (0 hits in spec); one name
  per gap (no inflationary/deflationary/recessionary gap).
- **structure-10** (claimed) — the "3-word bank" premise is stale (packet 7: bank = answers + authored
  distractors, `lib/recall-widgets.js:179-198`); all 7 fill-ins carry ≥2 semantically competing chips.
- **specGap-01** export-led :124 · **specGap-02** trend :565 · **specGap-03** firms :349 ·
  **specGap-04** current vs future :407-416 + opportunity-cost diagram · **specGap-05** balance of trade
  deficits :465 · **specGap-06** inflation as a cost :537 (all claimed).
- **specGap-07** (**wont-fix**) — :1094 is "2.3.5 Economic growth"; asserted by line.
- **diagram-01/02/03** (claimed) — the three dead refs no longer exist; no chapter carries `diagramRef`
  (runner §7). NOTE: `npm run diagrams` still exits 1 and still lists them, because it reads the t=0
  corpus `audit/content-sections/` and cannot see a draft; the draft-side check is
  `verify-placement.log` plus `npm run attribution` (UNDECIDED 0).

## Checks run, and what each measured (nothing wider)

- Runner (`stage.log`): all packet checks pass; validator on the built bundle **0 BLOCK / 0 DEBT /
  2 INFO**, 0 new against baseline, 94 baselined findings would clear on publish; spec coverage 23/23;
  **recall.recoverable 0** (census row is 15/15; held to 0). Word counts 277-343 (budget 350).
- A/B'd inside the runner: recession exemption both ways, Rule-3 guard on verbatim positives and
  correct negatives, collision guard on the Y₂/"Real output" pair my own first draft produced (fires;
  a LEAD apart does not), vertical-line crossing, equilibrium solver on a known case, line-owner
  locator, histogram test on an all-one-slot bank.
- Second-method arithmetic: trend recovered by log-linear fit; gaps from levels; doubling times by
  counting years; tax rounding checked from the printed figures; equilibria re-checked on both curves.
- `npm test` 303/303. `npm run validate` exit 0 (reads live `data`: economic-growth shows the 3
  pre-existing `practice.opening` DEBT on the untouched live practice items; the rebuild clears them).
  `npm run recalls` exit 0 (re-run after the final stage). `npm run exposure` exit 0.
  `npm run attribution` exit 0, UNDECIDED 0; it lists economic-growth's 2 live title-matched diagrams
  as "draft decides them all — fixed at publish".
- Read-backs of the FINAL stage: `check-staged-drafts.mjs economic-growth` → matches (anonymous API
  slice); `verify-draft-db.mjs` → DB `draft` column, all 8 tables, 1,380 leaf fields, 0 differ, and
  A/B'd with a planted field (1 differs).
- Diagrams inspected visually as PNGs rendered from the emitted SVG (quicklook), not in the app.

## NOT done / not verified

- **`npm run build` not run**: no app source changed (scripts/ and content only), and `next build`
  writes the `.next` the shared dev server on :3001 serves from. The gate phase should run it.
- No Verify A, no Verify B (390×844 walkthrough), no Layer-6 adversarial review, no Layer-4 search
  corroboration of the figure-free real examples (Penang/Intel, M-Pesa, India telecoms, Gulf migrant
  labour, Beijing air, Pakistan imports, Turkey inflation, Singapore, China).
- Not committed; `audit/ledger.json` not staged (it carries other sessions' changes).
- Not published. When the founder chooses: commit, then `node scripts/publish-section.mjs economic-growth --confirm`.
- Rule 3 (origin/main field check) not done — a publish-time step. The content uses only fields
  prior staged packets use. `diagramId: null` is not known to main (packet 2.91), so on main the
  benefits chapter would run the title fallback — but all 4 diagrams are claimed by pins, so the
  fallback has nothing unclaimed to place (reasoned from `lib/checkin-placement.js`, not run on main).

## Fix round 1 — `topFix-03` level bands (26 Sep 2026)

Rejection: practice[4] Examine 8, [6] Evaluate 20, [8] Discuss 14 said "levels-marked" and described one
strong response, with no Level bands (CONTENT-GATE.md:38). Accepted as stated.

- **Content** (`scripts/_packet43-assessment.mjs`, PRACTICE): the second paragraph of each of the three
  items is now a Level ladder in the packet 37/40/42 shape — Examine 8 → Levels 1-3, Discuss 14 and
  Evaluate 20 → Levels 1-4 — with the top band naming what Appendix 6 asks for at that tariff (brief
  assessment / critical assessment of the evidence / supported judgement). The "This is levels-marked
  ..." sentence is gone from all three: it is a marking claim DECISIONS 2026-09-16 item 3 bans, and
  packets 28/29/34's `MARK_CLAIM` key on it. Substance of each scheme kept; nothing re-ordered, no
  question, command, tariff or id changed (ids hash the question).
- **Rule 4, other fields of the same entries:** questions/commands/tariffs re-read, unchanged. Openings
  re-read: Evaluate's "A diagram is expected somewhere in an answer of this length." was an uncited claim
  about what is expected (Appendix 6's Evaluate row, `econ_spec.txt` ~:2741-2747, names no diagram) →
  "Plan where a diagram would make one of your chains clearer." Examine and Discuss openings match their
  Appendix 6 rows; left. Practice has no notes twin; the probe below scanned all 8 tables' string leaves.
- **Runner** (`scripts/packet-43-economic-growth.mjs`): round 0's check REQUIRED the phrase
  "levels-marked", so it could not see the missing bands and enforced the banned claim. Replaced by
  `ladderProblems()`: Level 1..N in order in the scheme (N = 3 at 8 marks, 4 at 14/20), none in the
  opening, none under a point-marked tariff, no "levels-marked"/KAA. A/B'd inside the runner on four
  synthetic cases (round-0 shape fires, skipped level fires, correct 1-3 passes, ladder on a 4-marker fires).
- **Restaged**: `--dump --stage` → all 8 tables to `draft` ok (`fix-round-1-stage.log`). Bundle diff is
  the 3 practice guidance strings only.

### Checks, and what each measured (nothing wider)

- Runner: all checks pass; validator 0 BLOCK / 0 DEBT / 2 INFO, 0 new; recoverable 0; words unchanged.
- `probe-ladders.mjs` (different method: reads the DB `draft` column per table, walks every string leaf
  without field names, looser pattern `level\s+N` case-insensitive): **control** = round-0 bundle →
  3 marking-claim leaves (practice.4/6/8), no ladders; **DB draft** → 0 marking-claim leaves, Examine
  [1,2,3], Evaluate [1,2,3,4], Discuss [1,2,3,4], no ladder on any ≤6-mark item, no Level in any
  opening; DB `data` → 0 ladders (live untouched). `fix-round-1-probe-ladders.log`.
- Packet 34's `MARK_CLAIM` regex (another packet's rule) over the new bundle: 2 hits, both "earns
  nothing" in the point-marked Define 2 / Analyse 6 schemes (not in this rejection; recorded, not
  changed); control round-0 bundle → 5 (the 3 levels-marked + those 2). `fix-round-1-markclaim.log`.
- `verify-draft-db.mjs`: 1,380 leaf fields, 0 differ (DB draft vs dumped bundle).
- Live `data` vs t=0 snapshot: 8 tables, 0 differ (`fix-round-1-live-data-unchanged.log`).
- `npm run validate` 0 · `npm run attribution` 0, UNDECIDED 0 · `npm run recalls` 0 · `npm test` 303/303 ·
  `audit/scripts/check-staged-drafts.mjs economic-growth` → matches (anonymous slice only).
- NOT run: `npm run build`, Verify A/B, a render of the practice tab. Not committed; not published.
