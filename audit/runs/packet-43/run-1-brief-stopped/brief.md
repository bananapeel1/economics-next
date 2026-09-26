# Packet 43 brief — `economic-growth` (Economics 2.3.5, WEC12)

Produced by the Brief phase. Contains no measurement of a fix, no build/test/render result, no
verification claim. What follows is: facts about the CURRENT, unmodified bundle and ledger (each with
the command that produced it), and spec wording quoted verbatim. No source file was changed while
producing this brief; nothing was staged or committed. Results belong to Gate / Verify A / Verify B,
which run after this brief and after a Build phase this brief does not perform.

## 0. Documents read, and what the task's premises turn out to be

Read in full: `audit/PROTOCOL.md` (150 lines), `audit/DECISIONS.md` (3241 lines; `## Settled` at :13
onward — re-read after a concurrent commit landed mid-session, see below), `audit/CONTENT-GATE.md` (454
lines, including the recall contract :196-233 and the per-section checklist :234-267), this packet's row
in `audit/PROGRESS.md` (:92), and every `economic-growth` / `packet 43` mention in `audit/NEXT.md` (10260
lines, grepped and read in context).

**No `## Packet 43 spec` heading exists anywhere in `audit/NEXT.md`** (`grep -n "^## Packet 43 spec"
audit/NEXT.md` → no output). The task's premise that one exists does not hold, the same gap packet 41's
own brief recorded for itself twelve days ago. The closest substitutes are two Handoff entries: packet
42's own handoff (`:10215`, "Next unclaimed packet") and a later bookkeeping-pass handoff (`:10239`).
Both independently name `economic-growth` as free and say **28 open items**; treat these as the spec
block, not as a missing document.

**`audit/DECISIONS.md`'s `## Settled` section has zero entries mentioning `economic-growth` or packet
43** (`grep -c economic-growth audit/DECISIONS.md` → 0). No packet-43-specific settled decision to
reconcile against anything else. Decisions that DO apply generally (diagram pinning, quiz/practice
pinning, the recall-baseline-after-publish rule) are cited by number where they bear on an item below.

**Shared-worktree note, not a defect in this brief's own facts.** `git status --short` showed
`audit/NEXT.md`/`DECISIONS.md`/`PROGRESS.md` as staged-and-further-modified when this session started.
Partway through this brief, a concurrent session committed (`a70789b`, "packet-12.6: the marked-script
data shape…", unrelated to packet 43) — exactly the shared-index behaviour `PROTOCOL.md`'s Invariants
section warns about. This session staged nothing, so the commit is someone else's work, not this
session's. **Every fact below that touches these three files was re-checked by re-reading them, and by
re-running the ledger query, after that commit landed**: `PROGRESS.md:92` still reads "13", `NEXT.md`'s
two handoffs still say "28 open" (:10215, :10239), and `node audit/scripts/ledger.mjs packet 43 --open`
still returns 28 items — unaffected by the concurrent commit.

## 1. Contradiction — `PROGRESS.md` disagrees with the ledger and with `NEXT.md`'s own handoffs

`audit/PROGRESS.md:92` reads `| 43 | economic-growth | 13 | not started | | | |` — an "Opens" figure of
**13**. Two independent, current sources disagree: `node audit/scripts/ledger.mjs packet 43 --open` (run
twice this session, before and after the concurrent commit) returns **28**, and `audit/NEXT.md`'s two
most recent handoffs about this packet (:10215, :10239) both independently say **28 open**. Nothing in
this packet's own ledger items is confirmed or wont-fix (`packet 43` and `packet 43 --open` return the
identical 28-row list), so 13 is not a partial-progress figure either — it is simply wrong against every
other current source.

`git blame -L 92,92 audit/PROGRESS.md` → `eccb30a5`, **11 September 2026 (23:13), day one of the
programme** — the same commit packet 41's own brief found stale for row 41 two weeks ago (`git blame -L
84,84` there also names `eccb30a5`; verified independently here by blaming row 43 directly, not by
re-reading packet 41's brief's claim). This row has not been touched since before any of this section's
`specGap`/`diagram` items were minted (the `diagram-*` items carry their own note: "Added 13 Sep 2026").

`audit/PROTOCOL.md`'s own Invariants section is explicit: **"The ledger is the definition of coverage…
Use `node audit/scripts/ledger.mjs` to change it; never hand-edit."** `PROGRESS.md`'s Opens column is a
status-table convenience only rewritten at a packet's gate (`PROTOCOL.md` step 5.6); for a `not started`
packet it has never been touched. Packet 41 hit this exact shape (same source commit, same "stale since
day one" cause) and recorded it as **"No contradiction here rises to a founder decision"**, proceeding on
the ledger's count. I am not adopting that resolution silently here — the task instructs `ok:false` with
an escalate entry when a handoff document disagrees with the ledger, so this is returned as exactly that,
with the recommendation (28, ledger-authoritative, matching packet 41's precedent) attached rather than
picked unilaterally.

## 2. Ledger snapshot — counted, not summarized

```
node audit/scripts/ledger.mjs packet 43          # 28 items
node audit/scripts/ledger.mjs packet 43 --open   # 28 items — identical list: 0 confirmed, 0 wont-fix
node audit/scripts/ledger.mjs show <id>          # run once, all 28 ids in one call (show accepts several);
                                                  # full output at audit/runs/packet-43/ledger-show-all.json
```
28 = 5 `topFix` + 1 `accuracy` + 2 `practice` + 10 `structure` + 7 `specGap` + 3 `diagram`.

## 3. The spec, quoted verbatim (`audit/raw/econ_spec.txt:1094-1125`)

```
2.3.5 Economic growth

What students need to learn:

 1 Causes of growth      a) The distinction between actual and potential growth.
                         b) Actual growth caused by an increase in the components of AD.
                         c) The importance of international trade for export-led growth.
                         d) Causes of potential growth:
                           •   domestic investment and foreign direct investment (FDI)
                           •   innovation
                           •   growth in size of labour force, including net migration
                           •   the degree of competition.
                         e) The importance of productivity for the rate of economic growth.
 2 Benefits of growth    a) Possible benefits of growth:
                           •   higher living standards
                           •   lower unemployment
                           •   increased profits for firms
                           •   higher levels of investment
                           •   increased tax revenues
                           •   improved public services.
 3 Costs of growth       a) Possible costs of growth:
                           •   opportunity costs
                           •   environmental costs
                           •   balance of trade deficits
                           •   increased inequality
                           •   inflation.
 4 Output gaps           a) The difference between actual growth rate and long-term trends
                            in growth.
                         b) The distinction between positive and negative output gaps.
                         c) Characteristics of positive and negative output gaps.
                         d) Difficulties of measuring output gaps.
```
Immediately followed by `2.3.6 Macroeconomic objectives and policies` (:1132) — 2.3.5 is its own numbered
heading, not nested under any "aggregate supply" heading.

**`specGap-07`'s own uncertainty is resolved.** Its text: "my recollection is that IAL WEC12 places
economic growth under its own heading… rather than under 2.3 aggregate supply — verify numbering." Three
independent sources agree it already is its own heading, numbered 2.3.5: the raw spec text above; `audit/
raw/spec-coverage.json`'s `bySection` entry (`"number": "2.3.5"`); and the live bundle's own `meta.number:
"2.3.5"` (`audit/content-sections/economics__economic-growth.json`). Unit 2 / WEC12 (bundle
`meta.unitCode`) — `PROTOCOL.md`'s canonical table applies: Economics Units 1 and 2 share one paper
structure (A six MCQ (6) · B five short answers (20) · C five-part data question (34) · D one 20-mark
essay from a choice of two (20)).

## 4. `spec-coverage.json`'s entry, and where a direct text search of the bundle disagrees with it

```
covered: 18, thin: 4, missing: 2 (24 leaves, this tool's own counting unit — do not conflate with "28
ledger ids", a different unit)
missingItems: "1d) Cause of potential growth: foreign direct investment (FDI)";
              "1d) Cause of potential growth: the degree of competition"
thinItems:    "1c) The importance of international trade for export-led growth.";
              "2a) Benefit of growth: increased profits for firms";
              "3a) Cost of growth: opportunity costs";
              "3a) Cost of growth: balance of trade deficits"
```
Per the task's own instruction these are candidates to check, not a to-do list. Checked against the
current bundle by a method different from however `spec-coverage.json` was built: a term search across
every text field in `audit/content-sections/economics__economic-growth.json` — `body`, `keyIdea`,
`examMatters`, `realExample`, `misconception`, `recall` (prompt/template/answers/groups/pairs/
correctOrder), `notes`, `flashcards`, `quiz` (question/options/explanation), `common_mistakes`,
`practice`, `diagrams`, `extras` — command: a `python3` script reading the JSON and counting substring
hits per field path, this session, output not reproduced here for length.

- Both `missingItems` confirmed genuinely absent: **0 hits anywhere** for "degree of competition". "FDI" /
  "foreign direct investment" appears **only inside `practice[2]`** (the item `practice-02` below asks to
  remove as off-unit) — so once that item is removed, FDI coverage drops from one off-spec mention to
  zero unless new content is authored for it.
- Two of the four `thinItems` — **"opportunity costs" and "balance of trade deficits" — return 0 hits
  anywhere in the bundle** by this method, not "thin". Flagging the disagreement rather than resolving it:
  either `spec-coverage.json`'s own scan matches something broader (a synonym, or a field this search
  missed) or these are actually missing. Whoever builds this section should treat both as missing, not
  thin, until shown otherwise.
- The other two check out precisely, with exact locations: **"export-led growth"** (1c) — 2 hits, both in
  `quiz[14]` (question + explanation), 0 in taught content — confirms `specGap-01` exactly. **"increased
  profits for firms"** (2a) — "profit" appears 5 times (a boom-phase body sentence, an actual/potential
  misconception aside, a flashcard, `practice[2]`'s guidance, `extras`) but never as a dedicated
  benefits-of-growth treatment — loosely confirms `specGap-03`'s "one sentence" framing. **`specGap-03`'s
  own quoted "spec framing"** — *"impact of economic growth on consumers, firms, government, current and
  future living standards"* — **does not appear verbatim anywhere in `econ_spec.txt`** (checked directly);
  treat it as the item author's paraphrase of the Benefits/Costs structure, not a spec quotation, and
  note the item's "rising costs/wages, competition" ask for firms is not itself a named 2.3.5 bullet.
- **A third, different count exists.** `node audit/scripts/validate-content.mjs --section economic-growth`
  (current bundle, unmodified, run this session — see §6) counts spec gaps its own way and returns **4**
  `spec.uncovered` DEBT findings — not `spec-coverage.json`'s 6 (2 missing + 4 thin), and not this
  section's own 2-more-than-thin reclassification above. Three measurements of "how much of 2.3.5 is
  undertaught," three different numbers. Noted, not reconciled — say which method a later count uses
  rather than citing whichever number is convenient.

## 5. Items, grouped, with spec-check / independent-verification status

Full text of all 28 is in `audit/runs/packet-43/ledger-show-all.json`. Only what needs a flag, a spec
citation, or independent confirmation is repeated here.

### topFix (5) — the prescribed fixes

- **topFix-01** (diagrams don't render; rename `diagramRefs` to match titles, or fix the matcher to
  normalise hyphens/spaces) — **the underlying complaint is confirmed, the proposed mechanism is
  superseded.** Direct read of the bundle: all 3 `diagrams[]` entries have title/svg/checklist/
  description fields and **no `id` field at all**; the 6 blocks' `diagramRef` values are `ad-as-growth`,
  `output-gap-diagram`, `trade-cycle-diagram`, `ad-as-shifts`, `null`, `ad-as-growth-analysis` against
  diagram titles `The Business (Trade) Cycle` / `Output Gap Diagram` / `PPF: Actual vs Potential Growth` —
  a literal case-insensitive substring check (the mechanism `structure-01` names, `LearnModeTab.jsx:97-
  104`) finds **zero matches for all 6 blocks**, independently confirming `structure-01`'s count by direct
  field comparison. The PPF diagram is never referenced by any block's `diagramRef`. **But**: `topFix-01`
  and the `diagram-01/02/03` items are dated 13 September; `audit/DECISIONS.md`'s 2026-09-25 packet-2.91
  entry settles that every chapter showing a diagram gets an explicit `diagramId`, that `diagramId: null`
  (not an absent field) is how "decided: no diagram" is recorded, and that a title-match — which is all
  this section has — **fails `npm run attribution`** on a staged corpus. Pin by `diagramId`; do not repair
  the substring matcher `topFix-01` names, it is the mechanism being retired.
- **topFix-02** (rewrite six weak/not-orderable recalls into classify; fix the cyclic four-phase reorder;
  collapse a duplicated LRAS-chain reorder; replace trivial fillins) — spot-checked by direct read:
  `costs-growth-environment`'s reorder ranks "Rising pollution / Resource depletion / Widening inequality /
  Climate change" "from most immediate to most long-term" — not a defensible single order, confirms
  "not-orderable." `recovery-phase`'s four-phase reorder is `['Boom','Downturn','Recession','Recovery']` —
  a true cycle with no stated start point, so any rotation is equally defensible; confirms "anchor a start
  point" precisely. `potential-economic-growth` (Block 1) and `lras-shifts-growth` (Block 6) reorders both
  walk "investment/policy → productivity/quality improves → LRAS shifts right → potential output rises" in
  near-identical wording — confirms the duplicate-chain claim. **Also note**: this section's recalls are
  currently 10 `fillin` + 7 `reorder` = 17 (one per subsection) and **zero `match`/`classify`** — the
  recall contract's other two types (`CONTENT-GATE.md` :196-233) are entirely unused here, so this is new
  authoring, not a rewrite of an existing classify/match item.
- **topFix-03** (remove the Unit-4 FDI practice item; fix mark/command mismatches; map practice to blocks
  by topic; rewrite 10/20-mark guidance to levels-based) — confirmed against `practice[]` directly (see
  `practice-01`/`practice-02` below) and against the validator's `practice.tariff` (BLOCK ×2) /
  `practice.command` (BLOCK ×2) findings, which match without being individually named by a ledger id.
- **topFix-04** (accuracy slips: "movement along the PPF" should be "from inside towards the PPF";
  elastic-SRAS wording; falling real wages in a positive gap; standardise cycle-phase names) — the PPF
  slip is independently confirmed in §`accuracy-01` below, read from the live `examMatters` field, not
  from the ledger's own quotation of it.
- **topFix-05** (merge Block 6 into Blocks 1 and 4; dedupe the quiz bank Q9/Q20, Q16, Q21, Q23; teach
  export-led growth, trend growth, impact-on-firms, current-vs-future living standards) — the merge target
  matches `structure-02` (below). All 24 quiz stems were read directly (not reused from the ledger's
  citation): beyond the five ids named here, **two further likely-duplicate pairs surface** — Q1/Q23 (both
  "negative output gap… most likely") and Q2/Q21 (both "boom phase… characterised by / consistent with").
  None are byte-identical text. A dedupe pass should check all 24 stems against each other, not only the
  five named.

### accuracy (1)
- **accuracy-01** (examMatters says "link actual growth to a movement along the PPF"; a movement ALONG
  the PPF is reallocation, not growth, per the section's own Q3 explanation) — **confirmed by reading the
  live field directly**: `content[0].sections[0](actual-economic-growth).examMatters` = *"Examiners expect
  you to distinguish actual from potential growth and link actual growth to a movement along the PPF or a
  shift of AD within existing LRAS."* The self-contradiction the item names is real: actual growth (using
  spare capacity) is a movement from INSIDE the PPF towards it, not along it.

### practice (2)
- **practice-01** (p0 "Define… (4 marks)" is over-tariffed for a Define command; shown first in Learn
  Mode) — confirmed directly: `practice[0].question` = `"Define the term 'economic growth'. (4 marks)"`,
  `marks: 4`, `command: "Define"`.
- **practice-02** (p2 is WEC14 Unit-4 development content, not Unit-2 growth; also never reached in Learn
  Mode) — confirmed directly: `practice[2].question` = `"Assess the importance of foreign direct
  investment (FDI) in promoting economic growth in developing countries. (10 marks)"`. Checked against the
  full spec independently: the "developing countries… promotion of FDI" framing is `4.3.6 Growth and
  development in developing, emerging and developed economies` (`econ_spec.txt:1936-1943`), Unit 4/WEC14 —
  confirmed off-unit. **Important distinction for whoever builds this**: 2.3.5 itself names FDI too (1d,
  "domestic investment and foreign direct investment (FDI)", as one of several causes of *potential
  growth*, with no "developing countries" framing). Removing `practice-02`'s Unit-4 angle does not excuse
  the section from teaching FDI as a 2.3.5 cause of potential growth (`missingItems[0]`, §4) — two separate
  obligations, not one satisfied by deleting the other.

### structure (10)
All ten are claims about the shipped bundle's shape. `structure-01` and `-06` are independently confirmed
above and in §6 by direct field reads (diagramRef/title mismatch; quizIndices only referencing Q0-Q5).
`structure-02` (Block 6 re-teaches Blocks 1 and 4) is independently confirmed by the near-duplicate reorder
pair under `topFix-02` above. `structure-03` through `-05`, `-07` through `-10` are sequencing/pairing/
misconception/terminology/fillin-mechanism observations about the current bundle's internal construction
rather than spec-scope claims; not independently re-derived beyond what §6's direct reads already touch
(`structure-05`'s practice-to-block mapping is confirmed by the `practiceIndices` read in §6). `structure-
10`'s "3-word bank" claim is consistent with `CONTENT-GATE.md`'s own documented fallback ("a fill-in with
no distractors gets two from the section's other answers", :230) — 1 answer + 2 pool words — but the exact
line number in `FillInRecall.jsx` was not checked.

### specGap (7) — candidates against §3's spec text, not a to-do list
`specGap-01` (export-led growth), `-03` (impact on firms), `-05` (current-account cost), `-06` (inflation
placement), `-07` (numbering) are addressed in §3/§4 above with exact field locations. Two more:
- **specGap-02** (trend rate of growth "only in quiz Q8 and the diagram legend; not defined in content")
  — **confirmed precisely**: "trend rate" appears in `flashcards[10].front`, `quiz[8].question`,
  `quiz[8].explanation`, and `diagrams[0].description` ("…around the long-run trend rate of growth…") —
  zero hits in any taught-content field (`body`/`keyIdea`/`examMatters`/`misconception`). Not in `spec-
  coverage.json`'s `missingItems`/`thinItems` at all (§4) — a fourth data point where that tool's
  classification and a direct read disagree.
- **specGap-04** (current-vs-future living standards trade-off; consumption vs capital goods on the PPF)
  — reads as a specific pedagogical instantiation of spec bullet 3a's "opportunity costs" (§3), which §4's
  direct search found at 0 hits, not "thin". Not itself a literal spec phrase; a reasonable way to teach
  3a, not a separate spec requirement.

### diagram (3)
`diagram-01/02/03` (pinned diagram ids `ad-as-growth`, `ad-as-shifts`, `ad-as-growth-analysis` — none
exist) — confirmed directly, folded into `topFix-01`'s analysis above: no diagram in the bundle has an
`id` field of any kind, so no pinned string could ever have matched. Each item's own note: "Added 13 Sep
2026 from `audit/raw/diagram-pins-2026-09-13.json`… Check `npm run diagrams` after authoring" — that
script name is confirmed current in `package.json` (`"diagrams": "node audit/scripts/diagram-pins.mjs"`).

## 6. Current bundle state, counted (`audit/content-sections/economics__economic-growth.json`, the t=0
audit baseline; `PROTOCOL.md`: "the audit corpus is canonical")

`meta`: 6 blocks, 17 subsections (enumerated directly: 3+3+3+2+3+3=17, matches `meta.subsections`), 24
quiz (`meta.quiz`), 5 practice, 3 diagrams, 18 flashcards, 6 notes. `meta.mistakes: 0` but the
`common_mistakes` array actually holds **3** entries — a meta/array mismatch, the same class packet 41
found elsewhere in the corpus (not a claim any ledger item here makes; flagged per Rule 4).

Block → diagram/quiz/practice wiring, read directly from `content[].diagramRef` / `.quizIndices` /
`.practiceIndices`:
```
0 Actual vs Potential Economic Growth   diagramRef=ad-as-growth            quizIndices=[0]  practiceIndices=None
1 Output Gaps                           diagramRef=output-gap-diagram      quizIndices=[1]  practiceIndices=None
2 The Business (Trade) Cycle            diagramRef=trade-cycle-diagram     quizIndices=[2]  practiceIndices=[0]
3 Causes of Economic Growth             diagramRef=ad-as-shifts            quizIndices=[3]  practiceIndices=[1]
4 Costs and Benefits of Economic Growth diagramRef=None                    quizIndices=[4]  practiceIndices=[2]
5 Economic Growth and AD/AS Analysis    diagramRef=ad-as-growth-analysis   quizIndices=[5]  practiceIndices=None
```
Confirms `structure-06` exactly: quiz has 24 items, only Q0-Q5 are pinned to a block; Q6-23 reach a
student only through PreTest/PostTest sampling or the Quiz tab. Confirms `structure-05`: only 3 of 5
practice items are pinned (p0→Block 2, p1→Block 3, p2→Block 4 by content index); p3 (20-mark Evaluate) and
p4 (4-mark Outline) are never reached in Learn Mode.

`inflation` (spec 3a) appears in every block's text **except Block 4** ("Costs and Benefits of Economic
Growth" — the block that is supposed to teach costs) — 0 hits there by direct scan, 4 hits in Block 1's
`positive-output-gap` subsection. Confirms `specGap-06` exactly, by field location.

**Validator, current bundle, unmodified, this session:**
```
node audit/scripts/validate-content.mjs --section economic-growth
```
33 BLOCK / 64 DEBT, 83% coverage, plus **3 findings not yet in the baseline** (all `practice.opening`:
guidance that allocates marks before the student writes — `CONTENT-GATE.md` checklist item 6). By rule,
the largest categories: `fillin.hint` DEBT ×30, `claim.uncited` BLOCK ×16 (checklist item 5 — not named by
any single ledger id here), `fillin.distractors` DEBT ×10, `quiz.long-correct` BLOCK ×8 (not named by any
ledger id either), `recall.why` DEBT ×7, `pins.diagram` BLOCK ×4 (matches the diagram items; the validator's
own count of 4 does not resolve cleanly against my direct 6-of-6-blocks-broken finding above — two
different tests, noted rather than forced to agree), `spec.uncovered` DEBT ×4 (§4), `practice.opening`
DEBT ×3, `reorder.criterion`/`reorder.source` DEBT ×2 each, `quiz.near-dup` DEBT ×2, `practice.tariff`/
`practice.command` BLOCK ×2 each, `locale.institution` BLOCK ×1, plus four DEBT rules at ×1.

**Recall-census baseline** (`audit/recall-census-baseline.json`): `economic-growth` already carries **15**
on both `data` and `draft` — not a missing/zero entry (`git blame`/read direct). Per `DECISIONS.md`'s
2026-09-25 packet-2.92 entry, a staged rebuild may carry up to 15 answer-recoverable recalls without
counting as new debt; more than 15 needs its own `DECISIONS.md` entry with a reason, and `npm run recalls`
is the gate that would catch a rise past it (`PROTOCOL.md` :82).

## 7. What "done" means, at the level this brief can state it

Per the `topFix` items, §4-6 above, and `CONTENT-GATE.md`'s per-section checklist (:234-267): every
block's diagram is pinned by an explicit `diagramId` (or `null` for a decided-no-diagram block), not by
the retired title-substring matcher (packet 2.91) — `npm run attribution` is the check. Every block's
`quizIndices`/`practiceIndices` are an authored decision (an empty array means "decided none", packet 2.9
— not simply left unpinned) pointing at content about that block's own topic; all 24 quiz items and both
orphaned practice items (p3, p4) get a place or an explicit reason they don't. The recall contract's four
types are used where they fit — `match`/`classify` need to be authored fresh, not converted from existing
ones, since this section currently has neither. The two genuinely-missing spec items (FDI as a cause of
potential growth, degree of competition) and the two zero-hit "thin" items (opportunity costs, balance of
trade deficits — §4) are taught in main content, not only referenced in a quiz/flashcard. `practice-02`'s
Unit-4 FDI angle is removed AND 2.3.5's own FDI requirement is separately satisfied (§5). Every practice
item's guidance opens with a scaffold, not a mark allocation (clears the 3 pre-existing `practice.opening`
DEBT findings, checklist item 6). The `claim.uncited` (16) and `quiz.long-correct` (8) validator findings
are cleared even though no ledger id names either. The section's baseline shrinks, not grows (checklist
item 7 — from the current 33 BLOCK / 64 DEBT / 83% coverage measured in §6). Recalls stay at or under 15
answer-recoverable, or a new DECISIONS.md entry says why not. Internationalisation and the PPF/cycle
accuracy slips (`topFix-04`) are corrected. Staged via `stageSection()` and verified field-by-field against
`curl "localhost:3001/api/sections/economic-growth?draft=1"`, never against the file (`PROTOCOL.md` step
5.5) — **and per this task's Rule 6, staged only: no `publish-section.mjs --confirm`, no restore, no other
live write.** If the work turns out to need a publish, the exact command is
`node scripts/publish-section.mjs --confirm economic-growth` — that is for a human to run, not this
session or any that follows from this brief.

## 8. Escalation

**One contradiction is returned as an escalate entry, per the task's instruction**: §1 above,
`PROGRESS.md:92`'s "13" against the ledger's and `NEXT.md`'s own "28". Full resolution context and a
recommendation (28, ledger-authoritative, matching packet 41's identical precedent) are given there rather
than picked silently.

**Everything else checked in §4 and §5 is the "check before acting" class Rule 1 asks for, not a
document-vs-document contradiction**: `spec-coverage.json`'s "thin" classification disagreeing with a
direct text search (opportunity costs, balance of trade deficits, trend rate of growth — all found at 0
hits in taught content against that tool's more lenient rating), the validator's independent 4-item count
of the same gap, `specGap-03`'s non-verbatim "spec framing" quotation, and `topFix-01`'s proposed mechanism
being superseded by the newer `DECISIONS.md` packet-2.91 rule are all findings *within* this brief's own
checking, not two authoritative documents asserting incompatible current facts. `spec-coverage.json` is a
raw audit artifact the task itself says to check, not one of the five documents named in the "read these"
instruction. Returning these as findings for whoever builds the packet, as instructed, not as a to-do list
and not as a founder escalation.
