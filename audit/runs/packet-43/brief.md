# Packet 43 brief — `economic-growth` (Economics 2.3.5)

Brief phase only. Contains no measurement of a fix, no build/test/render result, no verification
claim. Everything below is either (a) a fact about the CURRENT, unmodified bundle/ledger/docs, with
the command or file:line that produced it, or (b) a claim from a document, explicitly marked as a
claim. No source file was changed producing this brief; nothing staged or committed. All ids below
are `C-economic-growth-<kind>-<nn>`; the section prefix is dropped after this line for brevity.

## 0. Documents read, and what actually exists

- `audit/PROTOCOL.md` — full, 151 lines.
- `audit/NEXT.md` (10,422 lines). **No `## Packet 43 spec` heading exists anywhere in the file**
  (`grep -n "^## Packet 43 spec" audit/NEXT.md` → no output). The task's instruction to read that
  block describes a document that has not been written yet — consistent with `PROGRESS.md` row 43
  reading "not started" and this being the Brief phase that would feed such a heading, not a
  document that should already exist. The newest entry that discusses this packet is **"## Handoff —
  packet 42 closed (brain)"** (line 514), whose closing paragraph (line 540) is the newest "Handoff"
  in the file overall and states: `node audit/scripts/ledger.mjs packet 43 --open` returns 28 open
  items (`economic-growth`), `PROGRESS.md` row 43 reads "not started," and **packet 43 is free**. An
  earlier paragraph in the prior handoff section (line 348) says the same independently. Both are
  taken as the closest thing to a spec block, not as a missing document.
- `audit/PROGRESS.md` row 43 (line 94): `| 43 | economic-growth | 13 | not started | | | |`. See §1 —
  this is not a ledger count and does not conflict with anything.
- `audit/DECISIONS.md` (3,347 lines). The `## Settled` list (line 13–900) has zero entries naming
  `economic-growth` or packet 43 (`grep -c economic-growth` inside that range → 0). Decisions that DO
  bind this rebuild generically, found by targeted grep and read in full: the 2026-09-15 entry that
  content authored to the recall contract could not publish until packets 5 and 7 shipped (both have,
  long since — not a live blocker); the 2026-09-19 "doubted a correct number" class (packet 37); the
  2026-09-16 Appendix-6-false-citation class (packets 20/21/23, three independent hits the same week);
  and the 2026-09-25 packet 2.91 entry on `diagramId`. All four are load-bearing below.
- `audit/CONTENT-GATE.md` — the recall contract (line 196–233) and the per-section checklist, F116
  (line 234–267).
- `node audit/scripts/ledger.mjs packet 43` and `packet 43 --open` — identical 28-row lists (0
  confirmed, 0 wont-fix). Full record of all 28 via `ledger.mjs show <id> <id>...` (one call, all 28
  ids) → `audit/runs/packet-43/ledger-show-all.json`.
- `audit/raw/spec-coverage.json`'s `economics__economic-growth` entry (`grep -n
  '"economics__economic-growth"'` → line 622).
- `audit/raw/econ_spec.txt` — read directly, lines 880–1208 (all of 2.3.1–2.3.6, to see 2.3.5's actual
  boundaries) and 2696–2754 (Appendix 6, command word tariffs — load-bearing for `topFix-03` /
  `practice-01` / `practice-02`, see §2b).
- `audit/content-sections/economics__economic-growth.json` — the t=0 canonical bundle (file mtime 11
  Sep 23:58, PROTOCOL.md: "the audit corpus is canonical"), read directly with a small Python script
  (field walk + substring search), not assumed from any summary. See §4/§6.
- **A previous, interrupted attempt at this same brief exists**: `audit/runs/packet-43/run-1-brief-
  stopped/` (`brief.md` written today 23:14:18; its `ledger-show-all.json` at 23:01:54). Read only
  after finishing my own independent pass, and treated as data to cross-check against, not as a
  source of fact — see §1 for why one of its central conclusions is now stale, and where its bundle-
  level readings independently corroborate mine.

## 1. Three things that looked like contradictions, checked and resolved — not a founder escalation

**(a) `PROGRESS.md`'s "13" is not a ledger count, and is not a contradiction.** The table's own
preamble, immediately above the row (`audit/PROGRESS.md`, the paragraph before the `| # | Section |
Opens | ... |` header for this table): *"`Opens` is the number of students who opened the section in
Learn Mode in the audit baseline (`secRows[].users` in `audit/raw/funnel_aggregates.json`)... It is
not a count of ledger items: never compare it with the ledger and never edit it. Restored 25 Sep 2026
in the rows where handoffs had overwritten it with ledger counts."* 13 is the Opens figure; 28 (the
ledger's own count, confirmed twice above) is the item count. Different units, both correct.

**This is worth stating precisely because the previous, interrupted brief run reached the opposite
conclusion** — it read "13" against the ledger's "28" and returned it as a founder-level
contradiction (its own §1). That was not a misreading on its part: `git diff HEAD -- audit/PROGRESS.md`
shows the clarifying paragraph above is a `+` line in the currently-staged, uncommitted diff, and file
mtimes place it clearly after that run ended — the stopped run's `brief.md` was written at 23:14:18;
`audit/PROGRESS.md`'s current mtime is 23:27:15, thirteen minutes later. Another session, in this same
shared worktree (`PROTOCOL.md`'s own warning; rule 5), staged the fix in between — the same restoration
that also corrected packet 41's row, which its own brief had (per that row's own text, now visible in
the same diff) silently overwritten with a ledger count previously. Verified two ways, neither of them
the way the stopped run's own conclusion was reached: by reading the table's header text directly, and
independently by `git diff HEAD` plus file mtimes. **Conclusion: no contradiction, current state; 28 is
the ledger's count and is what this brief uses throughout.**

**(b) A near-miss, not a contradiction: `audit/NEXT.md` reuses `topFix`/`specGap`/`accuracy` id
labels per section, and a bare grep for "economic-growth" surfaces someone else's ledger ids.** Line
1825 of `NEXT.md` reads, in a "Confirmed and built" list: *"`topFix-04` (the live `economic-growth-
objective` realExample invents a **UK 2% growth target**...)"* alongside `specGap-03`, `specGap-05`,
`specGap-07`, `accuracy-01`, `practice-01`, `structure-01` through `-09`. None of these belong to this
packet. The nearest heading above (line 1797) is **"Packet 38 spec — macroeconomic-objectives-
policies"**, a different section (2.3.6), whose own bullet `3a` ("productivity, competition and
incentives") and `4d` ("implementation... inflation target... banker to the government... lender of
last resort") match `econ_spec.txt` 2.3.6 verbatim (lines 1151, 1189–1193) — this passage is packet
38's own ledger, which happens to share every kind-label this packet also uses, because
`C-<section>-<kind>-<nn>` numbering restarts per section. `economic-growth-objective` is very likely a
subsection under 2.3.6 §1a ("Macroeconomic objectives... a) Economic growth", `econ_spec.txt:1136`) —
economic growth taught as one of six macro *objectives*, not this packet's 2.3.5 section. **Flagging
this as a method note, not a defect**: anyone grepping `NEXT.md` for a bare id like `specGap-07` must
check the nearest packet heading above it, never the id alone.

**(c) `specGap-07`'s own numbering doubt is resolved, confirmed against the primary spec text.** See
§2.

**No genuine disagreement was found between `PROTOCOL.md`, the newest relevant `NEXT.md` handoff,
`PROGRESS.md`'s row, `DECISIONS.md`'s Settled entries, and `CONTENT-GATE.md`.** Nothing here rises to
"stop and ask the founder"; §1(a)–(c) are the three places that looked like they might, checked by a
method different from whatever produced the appearance of conflict each time, and each resolves
cleanly with evidence quoted above.

## 2a. The spec, quoted verbatim (`econ_spec.txt:1094–1125`)

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

Immediately preceded by `2.3.4 National income` (:1056) and followed by `2.3.6 Macroeconomic
objectives and policies` (:1132) — **2.3.5 is its own numbered heading**, four sub-points (causes /
benefits / costs / output gaps), not nested under Aggregate Supply (2.3.3, a different, earlier
heading) or under anything else. `spec-coverage.json`'s entry independently gives `"number": "2.3.5"`.
Unit: `WEC12` (the bundle's own `meta.unitCode`) — Economics Units 1 and 2 share one paper structure
per `PROTOCOL.md`'s canonical table (A 6 MCQ · B five short answers (20) · C five-part data question
(34) · D one 20-mark essay from a choice of two).

**`specGap-07`'s own text says: "Unsure: the product numbers this '2.3.5'... verify numbering against
the current IAL specification."** Resolved: the text above is read directly from `econ_spec.txt`, not
recalled or summarized — 2.3.5 is correct, already its own heading, exactly as the item's writer
half-suspected. Candidate for `wont-fix` when a packet closes it; not this brief's call to make.

## 2b. Appendix 6 — command word tariffs (`econ_spec.txt:2696–2747`), load-bearing for three items

```
 Define         2     Requires knowledge and understanding only...
 Calculate      2 or 4
 Draw           4
 Explain        4     Knowledge, understanding, application (+ analysis if explaining a reason/impact)
 Analyse        6
 Examine        8
 Discuss        14
 Evaluate/      20
  To what extent
```
These eight are the **only** command words this specification defines. `grep -in "\bAssess\b|\bOutline\b"
econ_spec.txt` returns no command-word usage for either — both are absent from the spec entirely.
`command_words.json` (a separate project reference file, not the spec itself) independently gives
"Define... Usually worth 2 marks", consistent. This directly supports, from the primary source rather
than the ledger's own say-so: `practice-01` (`practice[0]`: `"Define the term 'economic growth'.
(4 marks)"`, `command: "Define"`, `marks: 4` — Define is officially 2); `practice-02` (`practice[2]`:
`"Assess... (10 marks)"` — "Assess" is not a recognised command word and 10 is not one of the eight
tariffs at all); and `topFix-03`'s instruction to retire "Outline" (`practice[4]` uses it) in favour of
a real command word. **One more, found independently here, named by no existing ledger id**:
`practice[1]` = `"Explain two possible costs of rapid economic growth. (6 marks)"`, `command:
"Explain"`, `marks: 6` — Explain's own tariff is 4; 6 is Analyse's. Worth the builder's eye alongside
`topFix-03`'s other practice fixes; not itself confirmed as wrong (a two-part "explain" could
conceivably be treated as 2×3, but nothing in Appendix 6 supports splitting a single command word's
tariff that way), flagged as a candidate, same as the ledger's own `specGap` items are.

Given Appendix 6 has a documented history in this project of being cited for things it does not say
(`DECISIONS.md`, 2026-09-16, three independent hits the same week on Examine/Calculate/Discuss —
"three packets shipped the same wrong gloss because both authors reasoned about what [it] sounds like
instead of reading the row") — the table above is transcribed directly from the file for whoever
authors the rebuild's `examMatters`/practice guidance, so that step does not repeat the class.

## 3. `spec-coverage.json`'s entry (`audit/raw/spec-coverage.json:622`) — checked, not assumed

```
number: 2.3.5 · title: Economic growth · covered: 18 · thin: 4 · missing: 2 · worksheetReady: false
missingItems: "1d) ...foreign direct investment (FDI)"; "1d) ...the degree of competition"
thinItems:    "1c) ...export-led growth."; "2a) ...increased profits for firms";
              "3a) ...opportunity costs"; "3a) ...balance of trade deficits"
```

**Every one of these six phrases matches §2a's spec text exactly** (bullet letters and wording both
checked by direct comparison, not by number alone, per Rule 1) — none is a UK-GCE-style
misattribution. Per the task's own instruction these are **candidates to check against the spec, not a
to-do list**, and about one in eight were overturned when this style of audit last ran, so each was
also checked against the current bundle directly (`audit/content-sections/economics__economic-
growth.json`, a field-by-field substring walk over every text field — `body`/`keyIdea`/`examMatters`/
`misconception`/`recall`/`notes`/`flashcards`/`quiz`/`common_mistakes`/`practice`/`diagrams`, command:
a short Python script, this session, reusable but not committed anywhere):

| Spec phrase | Bundle hits | Where | Reading |
|---|---|---|---|
| "degree of competition" | 0 | — | Confirmed missing, matches `missingItems` |
| "foreign direct investment" / "FDI" | 1 / 2 | `practice[2]` only | Confirmed missing from *taught* content — the only mention is the off-unit practice item `practice-02` names for removal, so removing it drops FDI coverage to zero unless new content is authored (2.3.5 wants FDI as a cause of *potential growth*; `practice[2]`'s FDI is framed as *developing-country policy*, a different Unit-4 idea — two separate obligations, not one satisfied by fixing the other) |
| "export-led" | 2 | `quiz[14]` question + explanation only | Confirmed thin — present only as a quiz item, 0 hits in taught content, matches `specGap-01`/`thinItems` |
| "trend rate" | 4 | `diagrams[0].description`, `flashcards[10]`, `quiz[8]` (×2) | Not in `spec-coverage.json`'s missing/thin lists at all, but 0 hits in taught content by this search — matches `specGap-02` exactly; a fourth data point where a direct read finds something this tool's own classification doesn't mention |
| "increased profits for firms" | 0 verbatim; "profit" (5×) | a body sentence, a misconception aside, a flashcard, `practice[2]`'s guidance, `extras` | Loosely confirms `specGap-03`'s "one sentence" framing — never a dedicated benefits-of-growth treatment |
| "opportunity costs" | 1 | `notes[4].misconception` only, an aside ("growth has opportunity costs including environmental damage...") | Not in the dedicated "COSTS OF GROWTH" list in that same notes block, nor in Block 4's `costs-growth-environment` section — mentioned once in passing, not taught as its own cost. Thinner than "thin" suggests but not literally 0 |
| "balance of trade" | 0 | — | 0 hits, thinner than `thinItems` suggests — the same shape as "opportunity costs" but with no passing mention at all |

**`specGap-03`'s own quoted "spec framing"** — *"impact of economic growth on consumers, firms,
government, current and future living standards"* — **does not appear verbatim anywhere in
`econ_spec.txt`** (checked directly). The nearest textual relative is a different unit's bullet
entirely: `econ_spec.txt:1272`, Unit 3 §2f, *"Impact of growth of firms on businesses, workers and
consumers"* — about how a *business* grows (organic growth, M&A, integration), not economic growth.
Treat `specGap-03`'s framing as the item author's own paraphrase of 2.3.5's Benefits/Costs structure,
not a spec quotation; its underlying observation (firms are thinly taught) still checks out via
"increased profits for firms" above.

**`specGap-04`** (current-vs-future living standards trade-off; consumption vs capital goods on the
PPF) **names no letter/bullet and is not a literal 2.3.5 phrase** — it reads as a pedagogical
instantiation of 3a's "opportunity costs" (itself confirmed thin above), not a separate spec
requirement. The literal "capital goods vs consumer goods" language lives in a different section's
spec point (1.3.1 Introductory Concepts, `spec-coverage.json`'s own `thinItems` for that section: "4d)
The significance of capital goods for productivity and economic growth") — worth teaching here as a
reasonable frame for 3a, not owed as a distinct 2.3.5 leaf.

## 4. The ledger — 28 items, counted

```
node audit/scripts/ledger.mjs packet 43          # 28 items
node audit/scripts/ledger.mjs packet 43 --open   # 28 items, identical list — 0 confirmed, 0 wont-fix
```
28 = 5 `topFix` + 1 `accuracy` + 2 `practice` + 10 `structure` + 7 `specGap` + 3 `diagram`.

## 5. Current bundle, counted directly (`audit/content-sections/economics__economic-growth.json`)

`meta`: 6 blocks, 17 subsections, 24 quiz, 5 practice, 3 diagrams, 18 flashcards, 6 notes, `mistakes: 0`
— **but `common_mistakes` actually holds 3 entries**, a meta/array mismatch (not named by any ledger
id here; noted per Rule 4, "read every other field").

Block wiring, read directly from `content[].diagramRef` / `.quizIndices` / `.practiceIndices` /
`.sections[].id`:
```
0 Actual vs Potential Economic Growth   diagramRef=ad-as-growth          quiz=[0] practice=None  sections: actual-economic-growth, potential-economic-growth, relationship-actual-potential
1 Output Gaps                           diagramRef=output-gap-diagram    quiz=[1] practice=None  sections: positive-output-gap, negative-output-gap, output-gap-implications
2 The Business (Trade) Cycle            diagramRef=trade-cycle-diagram   quiz=[2] practice=[0]   sections: boom-phase, recession-phase, recovery-phase
3 Causes of Economic Growth             diagramRef=ad-as-shifts          quiz=[3] practice=[1]   sections: demand-side-causes, supply-side-causes
4 Costs and Benefits of Economic Growth diagramRef=None                  quiz=[4] practice=[2]   sections: benefits-growth, costs-growth-environment, growth-living-standards
5 Economic Growth and AD/AS Analysis    diagramRef=ad-as-growth-analysis quiz=[5] practice=None  sections: ad-shifts-growth, lras-shifts-growth, combined-ad-as-analysis
```
This independently confirms, by direct field read: `structure-06` exactly (quiz has 24 items, only
Q0–Q5 pinned to a block; Q6–23 reach a student only via PreTest/PostTest sampling or the Quiz tab);
`structure-05` (only 3 of 5 practice items pinned — `p3` 20-mark Evaluate and `p4` 4-mark Outline are
never reached in Learn Mode); and `structure-04`'s block-by-block pairing description, subsection-id
for subsection-id (Block 4/"Causes" has only 2 subsections — demand-side, supply-side — matching its
own "[demand, supply]" description with no third, lone-section step, unlike the other five blocks).

Diagrams array: 3 entries — `The Business (Trade) Cycle`, `Output Gap Diagram`, `PPF: Actual vs
Potential Growth` — **none has an `id` field at all** (all three `id: null`). No `diagramId`-based pin
could exist on this section today regardless of what any block's `diagramRef` string says.

Quoted directly: `content[0].sections[0] (actual-economic-growth).examMatters` = *"Examiners expect you
to distinguish actual from potential growth and link actual growth to a movement along the PPF or a
shift of AD within existing LRAS..."* — confirms `accuracy-01` verbatim (see §6).

Practice array, all 5, read directly:
```
p0  "Define the term 'economic growth'. (4 marks)"                                           Define   4
p1  "Explain two possible costs of rapid economic growth. (6 marks)"                          Explain  6   ← see §2b
p2  "Assess the importance of FDI in promoting economic growth in developing countries. (10)"  Assess  10
p3  "Evaluate the view that economic growth is always desirable. (20 marks)"                  Evaluate 20
p4  "Outline the difference between actual and potential economic growth. (4 marks)"          Outline  4
```

**Recall baseline**: `audit/recall-census-baseline.json` already carries **15** for `economic-growth`
on both `data` and `draft` (not a missing/zero entry). Per the packet-2.92 `DECISIONS.md` entry, a
staged rebuild may carry up to 15 answer-recoverable recalls without counting as new debt; more than
15 needs its own `DECISIONS.md` entry with a reason, and `npm run recalls` is the gate that would
catch a rise past it (`PROTOCOL.md` step 4a). Recall shape today: 10 `fillin` + 7 `reorder` = 17 (one
per subsection) and **zero `match`/`classify`** — the recall contract's other two types
(`CONTENT-GATE.md` :210–215) are entirely unused on this section, so any `match`/`classify` the rebuild
adds is new authoring, not a conversion of an existing item.

## 6. The 28 items — id, what it says, spec tie, what "done" means

### topFix (5) — the audit's own prescribed fixes

- **topFix-01** — diagrams don't render in Learn Mode; ledger text proposes renaming `diagramRef`s to
  match diagram titles, or normalising the matcher. **The complaint is real, the proposed mechanism is
  superseded, and its own file:line citation is stale.** Direct read (§5): all 6 `diagramRef` values
  (`ad-as-growth`, `output-gap-diagram`, `trade-cycle-diagram`, `ad-as-shifts`, `None`, `ad-as-growth-
  analysis`) are hyphenated slugs; the 3 diagram titles use spaces and punctuation (`The Business
  (Trade) Cycle`, `Output Gap Diagram`, `PPF: Actual vs Potential Growth`) — a case-insensitive
  substring check finds 0 of 6. The item cites `LearnModeTab.jsx:97-104` for the matcher; that file's
  current lines 97–104 are component prop/state setup, not diagram matching — `grep -n
  "diagramRef|diagramId|diagramsData" components/LearnModeTab.jsx` shows the component now delegates
  to `placeChapterItems` (`lib/checkin-placement.js:31`), which calls `matchDiagramsToBlocks`
  (`components/learn-mode/utils.js:34`). **Done means**: do not repair the old substring matcher —
  `DECISIONS.md`'s 2026-09-25 packet-2.91 entry settles that every block showing a diagram gets an
  explicit `diagramId` (a real id, once diagrams have one — none do today, §5) or `diagramId: null`,
  checked by `npm run attribution`, which **fails on a staged title-match placement**. Separately,
  `audit/NEXT.md`'s packet 2.91/2.92 entries (lines 705, 741) state that **2 of economic-growth's
  live check-in diagrams are already placed correctly via title-match** ("correct by reading... belong
  to packets 43 and 15") — which 2 is not named there; the builder should run `npm run attribution`
  itself rather than guess from title similarity. Both of those 2 also need converting to an explicit
  pin, or they will newly fail `npm run attribution` once this section is staged.
- **topFix-02** — rewrite 6 weak/not-orderable recalls (2 rankings → `classify`; a cyclic 4-phase
  reorder needs an anchored start point; a duplicated LRAS-chain reorder collapses; several trivial
  fill-ins get real distractor banks). **Done means**: apply the recall contract's own conversion rule
  (`CONTENT-GATE.md` :222–226 — a ranking becomes `classify`, "match X to Y" becomes `match`, a true
  cycle needs its ordering principle named) to the specific subsections the item names, and since this
  section currently authors 0 `match`/`classify` items (§5), the two rewritten as `classify` are new
  shapes for this section, not existing ones patched.
- **topFix-03** — remove the Unit-4 FDI practice item; fix command/tariff mismatches; map practice to
  blocks by topic, not sorted mark index; rewrite 10/20-mark guidance as levels-based. **Confirmed
  against Appendix 6 directly (§2b)**: `p0` Define/4 (should be 2), `p4` Outline (not a real command
  word), `p2` Assess/10 (neither a real command word nor a real tariff) all check out; `p1`
  Explain/6 is an additional candidate found the same way, unnamed by any ledger id.
- **topFix-04** — accuracy slips: "movement along the PPF" should read "from inside towards the PPF";
  an elastic-SRAS wording inconsistency; "falling real wages" inside a positive-gap passage; cycle-
  phase names standardised across text/diagram/extras. The PPF slip is independently confirmed at
  field level in `accuracy-01` below.
- **topFix-05** — merge Block 6 into Blocks 1 and 4; dedupe the quiz bank (`Q9`/`Q20`, `Q16`, `Q21`,
  `Q23`); use the freed room to teach export-led growth, trend growth, impact-on-firms and current-
  vs-future living standards (§3's confirmed-thin/missing items). **Interacts with `diagram-01/02/03`**
  (below): if Block 6 ("Economic Growth and AD/AS Analysis") merges away, its `ad-as-growth-analysis`
  diagramRef need is one fewer AD/AS-style diagram to design, not three.

### accuracy (1)

- **accuracy-01** — `examMatters` on `actual-economic-growth` says "link actual growth to a movement
  along the PPF"; a movement *along* the PPF is a reallocation between two goods (an opportunity-cost
  trade-off), not growth — actual growth (using spare capacity) is a movement from *inside* the PPF
  *towards* it. **Confirmed verbatim** (§5, quoted directly from the live field, not from the ledger's
  own quotation of it): the exact sentence is there, and it is a standard IAL distinction — a movement
  along the frontier at full capacity cannot represent growth. **Done means**: correct this sentence
  and check every other PPF reference in the section for the same slip (Rule 4 — this is a single
  `examMatters` field; the same wrong phrase could recur in `body`, `keyIdea`, `misconception` or a
  flashcard for the same subsection or its neighbours).

### practice (2)

- **practice-01** — `p0` "Define the term economic growth (4 marks)" over-tariffed for a Define
  command (2 marks, §2b), and it is the first thing Learn Mode's guided practice shows.
- **practice-02** — `p2` "Assess the importance of FDI... in developing countries (10 marks)" is
  4.3.6 Growth and Development content (WEC14, Unit 4), not this section's 2.3.5 (WEC12, Unit 2);
  confirmed against the spec directly — the "developing countries" / FDI-promotion framing is
  `econ_spec.txt:1936–1943`, a different unit entirely, and "Assess" plus "10 marks" match no
  Appendix 6 tariff at all (§2b). Never reached in Learn Mode (`practiceIndices` only goes to sorted
  index 2, §5). **Done means, both items together**: remove the Unit-4 angle, AND separately satisfy
  2.3.5's own FDI requirement (§3's `missingItems`, "1d) domestic investment and foreign direct
  investment (FDI)") — two obligations, not one discharged by the other.

### structure (10) — claims about the shipped bundle's shape

- **structure-01** — no diagrams render in Learn Mode; folded into `topFix-01` above (same evidence,
  same resolution: pin by `diagramId`, do not fix the retired matcher).
- **structure-02** — Block 6 re-teaches Blocks 1 and 4 (actual=AD shift / potential=LRAS shift;
  demand-side vs supply-side), a third time, with a near-duplicate reorder. Merge target for
  `topFix-05`.
- **structure-03** — the trade cycle's four-phase overview is introduced in the block's *third*
  subsection, after Boom and Recession are already taught; should open the block instead. Consistent
  with the subsection order read directly in §5 (`boom-phase, recession-phase, recovery-phase` — the
  overview the item describes sits in the third and last of the three).
- **structure-04** — 2-per-step pairing across all 6 blocks, but every 3-section block's last step
  carries diagram+quiz+practice+explain-back+takeaway, so it is heavier than the other steps.
  Block-by-block pairing independently confirmed against subsection ids in §5.
- **structure-05** — practice is mapped to blocks by sorted-mark-index, not topic, so the block that
  teaches the trade cycle gets a "Define economic growth" practice item and the two highest-tariff
  items are never reached. Confirmed by direct field read in §5 (`p3`, `p4` unreachable).
- **structure-06** — `quizIndices` only reference `Q0–Q5`; `Q6–Q23` surface only via PreTest/PostTest
  sampling or the Quiz tab, so the pre/post comparison (3 random of 24, mostly duplicate) is noisy.
  Confirmed by direct field read in §5.
- **structure-07** — most misconceptions are genuine; three named ones read as exam-technique or
  scope notes rather than actual misconceptions (`relationship-actual-potential`, `lras-shifts-
  growth`, `supply-side-causes`) — a judgement call for whoever authors the rebuild's misconception
  set, not independently re-derived here.
- **structure-08** — takeaways generally match their blocks; Block 6's fourth takeaway is exam advice
  rather than content, and Block 5's takeaway omits the current-account cost that `specGap-05` and a
  quiz item both otherwise treat as standard.
- **structure-09** — terminology drift on cycle-phase names between content/diagram/extras, and
  between two quiz items on "sustainable growth."
- **structure-10** — Learn Mode's fill-in widget draws from only a 3-word bank
  (`FillInRecall.jsx:12`, not re-checked here), so most fill-ins in this section reduce to
  grammar/elimination rather than genuine recall — a platform-level constraint, not something authoring
  this section alone fixes, but worth writing distractors that at least compete semantically
  (`CONTENT-GATE.md`'s own fallback note, :228–230).

### specGap (7) — checked against §2a/§3, not a to-do list

- **specGap-01** (export-led growth, 1c) — confirmed thin, §3.
- **specGap-02** (trend rate of growth) — confirmed thin (not in spec-coverage's own lists at all),
  §3.
- **specGap-03** (impact on firms) — real underlying gap, non-verbatim "spec framing," §3.
- **specGap-04** (current-vs-future living standards / PPF) — not a literal 2.3.5 phrase; a reasonable
  way to teach 3a's opportunity costs, §3.
- **specGap-05** (current-account deterioration as a cost of growth) — the spec's own bullet (3a) says
  "balance of trade deficits," not "current account" — related but not identical wording; confirmed 0
  hits for "balance of trade" in the bundle (§3), so the underlying gap is real regardless of which
  phrasing is used.
- **specGap-06** (inflation as a cost of growth is in the positive-gap subsection, not Block 5's costs
  subsection) — consistent with §3's finding that Block 4's ("Costs and Benefits") own COSTS OF GROWTH
  list omits both "opportunity costs" and "balance of trade deficits" too; all three of 3a's weaker
  bullets cluster in the same block.
- **specGap-07** (numbering doubt) — resolved false alarm, §2a. 2.3.5 is correct and is its own
  heading.

### diagram (3)

- **diagram-01/02/03** — pinned diagram refs `ad-as-growth`, `ad-as-shifts`, `ad-as-growth-analysis`
  resolve to nothing; three different blocks each want an "AD/AS growth" style diagram and, per the
  items' own text, "one drawing cannot serve all three, because a block pins at most one." Confirmed:
  no diagram in the bundle has an `id` field at all (§5), so no pinned string could ever have matched;
  this is the same underlying fact as `topFix-01`/`structure-01`, just the three specific broken refs
  named individually. **Scope note**: if `topFix-05` merges Block 6 away, `ad-as-growth-analysis`'s
  need may disappear with it — check `topFix-05` before deciding how many new AD/AS diagrams to draw,
  two vs three is a real cost difference. Each item's own note names `npm run diagrams` (confirmed
  current in `package.json`: `"diagrams": "node audit/scripts/diagram-pins.mjs"`) as the post-authoring
  check; that is in addition to, not instead of, `npm run attribution` for the `diagramId` pin itself.

## 7. What "done" means, synthesised

Every block that shows a diagram carries an explicit `diagramId` (a real id — diagrams need one added
first, none has one today) or `diagramId: null` for a decided-no-diagram block; the retired title-
substring matcher is not the mechanism relied on, `npm run attribution` is the check (packet 2.91).
Every block's `quizIndices`/`practiceIndices` is an authored decision pointing at content about that
block's own topic (packet 2.9's "empty array means decided none" convention) — all 24 quiz items and
both orphaned practice items (`p3`, `p4`) get a place or a stated reason they don't. The recall
contract's `match`/`classify` types are used where `topFix-02` calls for them (both new to this
section). The two genuinely-missing spec items (FDI as a cause of potential growth; degree of
competition) and the confirmed-thinner-than-labelled items (export-led growth, opportunity costs,
balance of trade deficits, trend rate of growth, impact on firms) are taught in main content, not only
referenced in a quiz stem or flashcard. `practice-02`'s Unit-4 angle is removed and 2.3.5's own FDI
requirement is separately satisfied. Every practice item's command word and mark tariff matches
Appendix 6 (§2b) — including the newly-flagged `p1` "Explain... (6 marks)". Every practice item's
guidance opens with a scaffold, not a mark allocation (`CONTENT-GATE.md` checklist item 6). The
`examMatters` PPF slip (`accuracy-01`/`topFix-04`) is corrected everywhere it recurs, not only in the
one field quoted here. Cycle-phase terminology is standardised across content, diagram and extras
(`structure-09`). Recalls stay at or under the 15-answer-recoverable baseline, or a new
`DECISIONS.md` entry says why not. Staged via `stageSection()` and checked field-by-field against
`curl "localhost:3001/api/sections/economic-growth?draft=1"`, never against the file
(`PROTOCOL.md` step 5.5). **Per this task's Rule 6: staged only.** No `publish-section.mjs --confirm`,
no restore, no other live write is this or any following session's to run. If the work reaches a point
where publishing is the next step, the exact command is `node scripts/publish-section.mjs --confirm
economic-growth` — for a human to run, not a session.

## 8. Escalation

**None required.** §1 covers the two things that looked like document-vs-document or document-vs-
ledger contradictions on first read (the `PROGRESS.md` "13," and the packet-38 id-reuse near-miss) and
resolves both with evidence, by a different method than however each appearance of conflict arose.
`specGap-07`'s internal numbering doubt is also resolved (§2a). Everything else in §3 and §6 is the
"check an audit item's scope before acting on it" class Rule 1 asks for — `spec-coverage.json`'s
"thin" label disagreeing with a stricter direct-text-search result, `specGap-03`'s non-verbatim quoted
framing, `topFix-01`'s stale file:line citation, one additional practice-tariff candidate no ledger id
names — findings *within* this brief's own checking, for whoever builds the packet, not a founder-
level disagreement between governing documents.
