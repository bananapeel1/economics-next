# Packet 46 brief — `economics__growth-development` (WEC14, IAL 4.3.6)

**Brief phase only. No source file touched, no content authored, no build/test/verify run.** This
document lists candidates to check and what "done" would mean; it contains no measurement, test
result, or verification claim. Where a source document asserts one, it is quoted as a CLAIM below,
not restated as fact.

## 0. What was read, and how (for the "verify independently" / "scope of a sentence" rules)

- `audit/PROTOCOL.md` (155 lines, read in full).
- `audit/SESSION-PROMPT.md` (82 lines, read in full).
- `audit/NEXT.md`: searched for `^## Packet` headings (`grep -n "^## Packet" audit/NEXT.md`) — no
  `## Packet 46 spec` heading exists anywhere in the file. Read the file's final ~90 lines (the
  newest "Handoff — packet 44 closed" section, lines 10611–10689) in full.
- `audit/PROGRESS.md` row 46 (`| 46 | growth-development | 12 | not started | | | |`) and the
  "Content" table header explaining `Opens` (line 61) and rows 41–48 for context.
- `audit/DECISIONS.md`: `grep -n "growth-development"` → 0 hits (no section-specific ruling exists).
  Read the "Settled" section from its start (line 13) through the newest entries at the end of the
  file (line ~3400) for programme-wide rulings that bind any content packet.
- `audit/CONTENT-GATE.md`: read "The recall contract" (lines 196–232) and "The per-section edit pass
  — the checklist" (lines 234–268) in full; skimmed Layer 1/1a/1b for the mechanical validator rules
  that apply regardless of section.
- `node audit/scripts/ledger.mjs packet 46` and `... packet 46 --open` — both return the same 25
  rows (`diff` of the two command outputs is empty): every item for this packet is `open`, none
  claimed or confirmed.
- `node audit/scripts/ledger.mjs show <id>` for all 25 ids (saved to
  `audit/runs/packet-46/ledger-show-all.txt`).
- `audit/raw/econ_spec.txt`: read lines 1899–1968 in full (the whole of 4.3.6, both pages) plus lines
  1094–1132 (2.3.5, for the sustainability cross-check) and 2696–2748 (Appendix 6, command word
  taxonomy). Ran targeted `grep -ni` passes for terms named in ledger items that are absent from the
  spec (see §4).
- `audit/raw/spec-items.json`: extracted all 50 rows tagged `topic === "4.3.6"` and all 47 rows tagged
  `topic === "4.3.5"` (script shown inline below; saved to
  `audit/runs/packet-46/spec-items-4.3.6.txt`) — this is the canonical, line-numbered leaf list, used
  in place of any ledger item's spec-number citation per Rule 1.
- `audit/raw/spec-coverage.json`: extracted the `bySection` entry keyed `economics__growth-development`
  (saved to `audit/runs/packet-46/spec-coverage-growth-development.json`).
- `audit/raw/ial-paper-structure.json`: read the `economics.units_3_4` object in full (this is WEC14's
  paper).
- `audit/content-sections/economics__growth-development.json` (the t=0 snapshot / current published
  content): read `meta`, all 3 blocks' titles/subsection ids, the `quiz` array (all 12 stems),
  `Q3/Q4/Q7/Q10/Q11` in full (options + explanation), all 5 `practice` items' command/marks fields,
  the 5 `notes` titles, and diagram index 4's SVG text labels — by a Node script printing selected
  JSON fields, a different method from whatever produced the ledger's prose.
- `git status --short` — confirmed packet 45's untracked files (`audit/runs/packet-45/`,
  `scripts/packet-45-labour-markets.mjs`, its snapshots) exist and were not opened or touched, and
  confirmed pre-existing untracked `growth-development` snapshots from 25 Sep (this section has been
  published before; it is not a from-scratch build).

**No `audit/specs/packet-46.md` and no `## Packet 46 spec` heading exists anywhere in `audit/NEXT.md`.**
This is the same gap packets 41 and 44 hit and documented in their own `PROGRESS.md` rows rather than
escalating: PROTOCOL.md's own rule is "the ledger is the definition of coverage," not `NEXT.md`, so —
consistent with that precedent — this brief proceeds from the ledger and the raw spec rather than
treating the missing heading as a blocking contradiction.

## 1. Contradiction check (the task's own gate)

**No contradiction found between `PROTOCOL.md`, `DECISIONS.md`'s Settled list, `CONTENT-GATE.md` and
this packet's ledger/`PROGRESS.md` row.** They agree: packet 46 is `not started`, 25 open ledger items,
no packet spec written yet (precedented, see above), section is `economics__growth-development`, WEC14,
number 4.3.6. Returning `ok:true`.

**One thing to flag, not a contradiction:** `DECISIONS.md`'s newest Settled entry (2026-09-26, "practice
follows the real IAL paper layout") post-dates every packet this ledger's items were written against
and changes what "done" means for practice/topFix-05 (see §5). No earlier document in this packet's
required reading list contradicts it — it simply supersedes the ad-hoc "one item per command word"
practice shape that packets 41–44 used before it existed.

## 2. Counts, measured by reading the bundle (command shown)

```
node -e "const d=require('./audit/content-sections/economics__growth-development.json');
console.log(d.meta)"
```
→ `{"id":"growth-development","number":"4.3.6", ... ,"blocks":3,"subsections":6,"reorder":0,"fillin":0,
"quiz":12,"practice":5,"diagrams":5,"flashcards":18,"notes":5,"mistakes":0,"extrasChains":4,
"extrasEval":4}`

Read directly against the file's own arrays (not the `meta` block, which is a separately-maintained
summary and disagrees with the file it describes in one place — see §6):

- 3 blocks, 2 subsections each = 6 subsections total. Block titles: "Growth vs Development"
  (`growth-vs-development`, `barriers-development`), "Development Strategies"
  (`market-led-strategies`, `interventionist-strategies`), "Sustainability" (`sustainable-development`,
  `green-growth`).
- 0 subsections carry a `recall` object (checked all 6).
- No block object has a `diagramRef`, `quizIndices` or `practiceIndices` key (checked all 3).
- `quiz.length === 12`; `practice.length === 5`; `diagrams.length === 5` (titles: "HDI Components and
  Measurement", "Harrod-Domar Growth Model", "Lewis Dual-Sector Model", "Prebisch-Singer: Declining
  Terms of Trade", "Development Strategies Comparison"); `common_mistakes.length === 4` (the file's own
  `meta.mistakes` field says `0` — a discrepancy in the file's self-reported summary, not in the audit).

## 3. The canonical spec text (quoted verbatim from `audit/raw/econ_spec.txt:1899-1968`)

Found by wording (Rule 1), not by trusting any ledger item's cited number.

```
4.3.6 Growth and development in developing, emerging and developed economies

1 Measures of economic development
  a) The three components of the Human Development Index (HDI): education, health, income; how
     they are measured.
  b) Advantages and limitations of the HDI in comparing living standards between countries and
     over time.
  c) Other measures of development: % adult male labour in agriculture; access to clean water;
     energy consumption per capita; access to internet per 1,000; access to mobile phones per
     1,000; access to doctors per 1,000.

2 Constraints on growth and development
  a) Economic factors: volatility of commodity prices; primary product dependency (the
     Prebisch-Singer hypothesis); savings gap (the Harrod-Domar model); foreign currency gap;
     capital flight; demographic factors (size/age distribution, migration); debt (household and
     overseas); access to credit and banking; infrastructure; education and skills.
  b) Non-economic factors: corruption; poor governance; civil wars; migration; terrorism.

3 Measures to promote growth and development
  a) Market-orientated strategies: trade liberalisation; promotion of FDI; removal of government
     subsidies; privatisation; floating exchange rate systems; microfinance schemes.
  b) Interventionist strategies: development of human capital; protectionism; managed exchange
     rates; infrastructure development; promoting joint ventures with TNCs; buffer stock schemes.
  c) Other strategies: industrialisation (the Lewis structural dual-sector model); development of
     tourism; development of primary industries; debt relief; aid.
  d) The role of international institutions: the World Bank; the International Monetary Fund
     (IMF); non-government organisations (NGOs).
```

`audit/raw/spec-items.json` breaks this into 50 rows (parents + leaves), saved at
`audit/runs/packet-46/spec-items-4.3.6.txt` — the id list a builder should cite against, not the
ledger's own paraphrase.

**Confirmed absent from the entire spec document** (`grep -ni` over all of `econ_spec.txt`, 0 hits
each): `Fairtrade`, `Dutch disease`, `Kuznets`, `green growth`, `sustainab*` (any form), `structural
adjustment`, `Washington Consensus`, `Lewis turning point` (the spec names only "the Lewis structural
dual-sector model", not the turning-point sub-concept). The nearest the whole specification comes to
"sustainability of growth" is 2.3.5.3a, "Costs of growth: ... environmental costs" — a different unit
(Economics Unit 2, WEC12), a different topic number, and no mention of EKC or green growth there
either.

**Appendix 6 (command word taxonomy), quoted in full for reference** (`econ_spec.txt:2696-2748`):
Define (2), Calculate (2 or 4), Draw (4), Explain (4), Analyse (6), Examine (8), Discuss (14),
Evaluate/To what extent (20). **"Outline" and "Assess" are not on this list, for any mark value.**

## 4. Ledger items — text, spec check, and what "done" means

All 25 ids are `status: open`, `packet: 46`, none claimed. Full text of each is in
`audit/runs/packet-46/ledger-show-all.txt`; only the checked scope is repeated here.

### topFix (rank order 0–4)

- **`C-growth-development-topFix-01`** — wire block metadata (`diagramRef`/`quizIndices`/
  `practiceIndices` per block) and add one recall per subsection, with two example recalls named
  (HDI-components fillin; Harrod-Domar savings→investment→capital→output→income reorder; Lewis
  surplus-labour→migration→profits→reinvestment→turning-point reorder).
  **Spec check:** the wiring gap is independently confirmed by reading the bundle (§2: all 3 blocks'
  `diagramRef`/`quizIndices`/`practiceIndices` are absent). The two named recall shapes fit the recall
  contract (`CONTENT-GATE.md` §"The recall contract"): a savings→investment→output loop and a Lewis
  process are genuine sequences, so `reorder` is the right type per that table, not a ranking.
  **Done means:** every block carries `diagramRef` to one of the 5 existing diagrams (none currently
  render inline — a candidate topic-to-diagram map: HDI→block 1, Harrod-Domar & Prebisch-Singer→block 1
  or a new constraints block, Lewis→wherever 3c industrialisation is taught, strategies-comparison→
  block 2), `quizIndices`/`practiceIndices` set per block, and every one of the (eventually rebuilt)
  subsections carries a `recall` object typed per the contract table, each with a `why` line, checked
  against the edit-pass checklist item 1 (F116) before staging.

- **`C-growth-development-topFix-02`** — re-map block 2 to the spec's own a/b/c/d taxonomy
  (market-orientated / interventionist / other / international institutions) and add named strategies:
  privatisation, subsidy removal, floating vs managed exchange rates, joint ventures, Lewis-model
  industrialisation (own subsection), tourism, primary industries, **Fairtrade**, debt relief, NGOs.
  **Spec check — 9 of 10 confirmed, 1 overturned:** privatisation (3a-4), subsidy removal (3a-3),
  floating exchange rates (3a-5), managed exchange rates (3b-3), joint ventures with TNCs (3b-5),
  Lewis industrialisation (3c-1), tourism (3c-2), primary industries (3c-3, the spec-coverage tool's
  one true "missing" leaf — see §5), debt relief (3c-4) and NGOs (3d-3) are all real, verbatim spec
  bullets. **"Fairtrade" is not.** It is 0 hits anywhere in `econ_spec.txt`; the only "fair trade" hit
  in the whole document is an unrelated Extended Project dissertation-topic suggestion
  (`econ_spec.txt:2615`), nothing to do with 4.3.6 or development strategies. Do not add a Fairtrade
  strategy — this is the "about one in eight ... overturned" case the task brief warned about.
  **Done means:** block(s) restructured under the spec's own a/b/c/d headings (not the current
  "Market-Led / Interventionist" two-block split, which flattens the spec's four categories into two
  and omits "other strategies" and "international institutions" as headings entirely — see
  `structure-09`), teaching the 10 confirmed items above, and NOT adding Fairtrade.

- **`C-growth-development-topFix-03`** — teach capital flight, foreign currency gap, Dutch disease and
  the Lewis turning point (claimed as "spec items"), or cut Q3/Q4/Q7/Q11 from the pre-test pool; also
  replace Q11's "joke distractors."
  **Spec check — mixed:** capital flight (2a-5) and foreign currency gap (2a-4) are real spec leaves
  under topic 2 ("Constraints"), not topic 3. **"Dutch disease" is not a spec item** (0 hits) — it is a
  real economics concept adjacent to 2a-2 (primary product dependency / Prebisch-Singer) but the
  specification never names it, so "add it because it's a spec item" is the same class of overturned
  claim as Fairtrade above; the alternative option this same item offers — remove the quiz questions
  that test it (Q4, Q11) — is the spec-safe fix. "The Lewis turning point" is a defensible pedagogical
  elaboration of 3c-1 ("the Lewis structural dual-sector model") rather than a separate spec bullet; it
  is not "invented" the way Dutch disease is, but it is not verbatim spec wording either, so a builder
  should teach the Lewis model (3c-1) and can choose whether the turning-point sub-concept is in or out
  of scope for this section vs. left as an A-level-adjacent elaboration.
  **Confirmed independently by reading the live quiz** (a different method from whatever produced this
  ledger item): Q3 is "the Lewis turning point," Q4 is aid/Dutch disease, Q7 is capital flight, Q10 is
  a Harrod-Domar assumption, Q11 is Dutch disease with genuinely off-topic distractors ("Dutch colonial
  trade policies," "immigration from the Netherlands") — full text in `audit/runs/packet-46/brief.md`
  §0's script output, reproducible via the same script against
  `audit/content-sections/economics__growth-development.json`.
  **Done means:** capital flight and foreign currency gap taught in prose (they are real 4.3.6.2a
  leaves currently untaught anywhere but the quiz); Dutch disease either removed from the quiz bank or
  taught explicitly as elaboration with a citation, builder's choice, but not asserted as "a spec item"
  in whatever replaces this ledger entry; Q11's off-topic distractors replaced with plausible economics
  distractors regardless of which path is taken on Dutch disease.

- **`C-growth-development-topFix-04`** — verify Block 3 (Sustainability/EKC/green growth) against
  WEC14; if off-spec, demote to a short evaluation card and reuse the step for "Factors influencing
  growth and development" (currently Notes-tab only).
  **Spec check — the "verify" comes back positive: Block 3 is off-spec.** Confirmed above (§3):
  sustainability, EKC and green growth are 0 hits anywhere in the Economics specification, in any unit.
  **Done means:** per this item's own stated fallback, Block 3 ("Sustainable Development" +
  "Green Growth" subsections, `sustainable-development` and `green-growth`) is removed or demoted, and
  the freed block/step is used to teach 4.3.6's genuinely-untaught "Constraints" content (topic 2:
  demographic factors, debt, access to credit/banking, infrastructure, education/skills, non-economic
  factors — currently Notes-tab only per `specGap-02`).

- **`C-growth-development-topFix-05`** — factual/marking fixes: Paris Agreement wording; convert
  10-/20-mark practice guidance from marks-per-point to IAL levels; "Outline" → an IAL command word;
  "Define HDI (4)" → a 2-mark Define; resolve a "growth is necessary" contradiction in block 1.
  **Spec/tariff check, confirmed independently by reading the live practice array** (a different method
  from whatever produced this ledger item): `practice[0]` is literally `{"command":"Define","marks":4}`
  for "Define the term 'Human Development Index' (HDI). (4 marks)" — Appendix 6 fixes Define at 2
  marks, so this is a real mismatch. `practice[4]` is `{"command":"Outline",...}` — "Outline" is
  confirmed absent from Appendix 6's 8-row taxonomy (§3), matching this item's claim. **Two further
  mismatches this ledger item did not name, found by the same read:** `practice[2]` is
  `{"command":"Assess","marks":10}` — "Assess" is *also* absent from Appendix 6 (this section has two
  off-spec command words, not one), and 10 marks is not a legal Economics tariff at all (confirmed
  independently by `DECISIONS.md`'s 2026-09-25 Settled entry: "re-tariffed from the file's 10 marks,
  which is not a legal IAL Economics tariff, to 20," a ruling from a different section's packet that
  states the same fact); `practice[1]` is `{"command":"Explain","marks":6}` — Appendix 6 fixes Explain
  at 4 marks and Analyse at 6, so this item is mislabelled either way. The Paris Agreement wording and
  the "growth is necessary" contradiction are prose/factual checks with no spec-file evidence to run
  against; see `accuracy-01` below for the Paris Agreement claim specifically.
  **Done means — but see §5 first:** because `DECISIONS.md`'s 2026-09-26 entry now requires ALL
  Economics Units 3-4 practice sets to be reshaped to the real paper's B/C structure, fixing these five
  items in place may be moot work if the whole practice set is rebuilt to that shape in the same
  packet. Whoever builds this should read §5 before doing item-by-item tariff surgery here.

### accuracy

- **`C-growth-development-accuracy-01`** — Paris Agreement "1.5°C commitment" should be "well below
  2°C, pursue 1.5°C"; the $100bn/yr pledge originated at Copenhagen 2009, not the Agreement; "consistently
  fallen short" is dated (OECD reports it was first met in 2022). **Not spec-checkable** (this is a
  real-world/historical fact claim, not a specification bullet) — a candidate for direct fact-check
  against a primary source before it is fixed, not something `econ_spec.txt` can confirm or refute.
- **`C-growth-development-accuracy-02`** — claims that examiners "expect you to evaluate the EKC" and
  "want you to evaluate whether green growth is achievable" "look invented." **Confirmed spec-side:**
  EKC, green growth and sustainability are 0 hits anywhere in the Economics specification (§3), so
  there is no specification basis for an examiner-expectation claim about them in this unit or any
  other. `CONTENT-GATE.md` Layer 1 already has a blocking rule for this class of sentence
  ("**Examiner claims**: any sentence asserting what examiners reward or penalise must carry a
  citation") — these sentences carry none, and per this section's own scope check (topFix-04, §3) the
  underlying content is off-spec regardless.

### quiz

- **`C-growth-development-quiz-01`** (Q3, Lewis) and **`C-growth-development-quiz-02`** (Q7, capital
  flight) — both independently reproduced by reading the live quiz array (§0, §4/topFix-03): Q3 tests
  the Lewis turning point, never mentioned in any of the 6 Learn subsections; Q7 tests capital flight,
  defined only in practice[?] guidance, never in Learn prose. Both are real spec leaves (3c-1, 2a-5)
  that are simply untaught in the body text a student reads before the quiz fires — the fix is to teach
  them (folds into topFix-01/02/03's rebuild), not to remove the questions, since (unlike Dutch disease
  and Fairtrade) these ARE spec-required content.

### structure (01–09)

Each of these was independently checked against the live bundle read in §2 and confirmed to match what
the file actually contains (not re-derived from the ledger's prose):

- **`structure-01`** (zero recalls) — confirmed: `meta.reorder === 0`, `meta.fillin === 0`, no
  subsection object carries a `recall` key. Folds into topFix-01.
- **`structure-02`** (no block wiring; Block 3 has no quiz/practice tied to it) — confirmed: no block
  has `diagramRef`/`quizIndices`/`practiceIndices`. Folds into topFix-01.
- **`structure-03`** (pre-test draws from a 12-item bank where 5 items test untaught content;
  0/3 is possible) — the 5 named items (Q3, Q4, Q7, Q10, Q11) are confirmed by direct read (§4). Note:
  Q10 (a Harrod-Domar assumption) tests content that IS a real spec leaf (2a-3, "savings gap (the
  Harrod-Domar model)") and is partly taught (the model itself has a diagram and a practice item), so
  whether Q10 counts as "untaught" is a narrower, prose-only question than Q3/Q4/Q7/Q11 (which test
  content absent from prose entirely or absent from the spec entirely).
- **`structure-04`** (3 blocks × 2 sections = 3 steps, ~900-1000 words each, no ramp) — block/subsection
  counts confirmed exactly (§2: 3 blocks, 2 subsections each).
- **`structure-05`** (Block 1 takeaway bullets 3–4 assert debt/institution links the body doesn't show)
  — not independently re-read at the takeaway-bullet level in this pass; flagged as-is for the builder
  to re-check against the rebuilt Block 1 prose once topFix-04's constraints content is added (debt IS
  a real spec leaf, 2a-7, so once it's taught the takeaway may simply become true rather than needing
  its own fix).
- **`structure-06`** (Notes tab and diagram 4 use the spec's own a/b/c/d taxonomy language, Learn text
  uses a different SAP/aid framing) — confirmed at the wording level: diagram 4's SVG text literally
  labels its left column "Market-Orientated" (spec's own term) while the Learn block is titled
  "Market-Led Strategies" (not the spec's term) — a real terminology mismatch between two tabs of the
  same section, independently observed by reading the diagram's SVG text and the block title side by
  side.
- **`structure-07`** (misconceptions mostly genuine; "green growth as cost-free" is filler; identical
  template reads as generated) — the sustainability-related misconception is moot if topFix-04 removes
  Block 3; not independently re-read at the misconception-text level this pass.
- **`structure-08`** (Lewis and Prebisch-Singer taught only via diagram + quiz, no prose subsection) —
  confirmed: neither `market-led-strategies` nor `interventionist-strategies` subsection bodies were
  read in full this pass for the word "Lewis" or "Prebisch," but the block/subsection list (§2) shows
  no subsection titled or scoped to industrialisation/Lewis, consistent with the claim; the diagrams
  array does independently confirm "Lewis Dual-Sector Model" and "Prebisch-Singer" exist only as
  diagram titles (§2). Note the tension with the automated `spec-coverage.json` tool (§5): it marks
  leaf 3c-1 (Lewis) as "covered," not missing or thin — this ledger item is a finer-grained, human
  reading catching a gap the lexical coverage tool's title-matching cannot see (diagram title = lexical
  match = "covered," regardless of whether prose teaches it). Worth carrying forward as a general
  caveat on spec-coverage.json for this section.
- **`structure-09`** (sustainability least spec-relevant but placed last; "other strategies" and
  "international institutions" have no block) — confirmed structurally: current 3 blocks are
  Growth-vs-Development / Development-Strategies / Sustainability, so no block is scoped to spec's 3c
  ("other strategies") or 3d ("international institutions") as their own heading; both currently exist
  only as scattered quiz/practice items (Lewis in Q3/diagram; IMF in Q8/practice[4]; World Bank/NGOs not
  found in quiz or practice at all in this pass).

### specGap (01–07)

- **`specGap-01`** (measures of development beyond HDI: limitations, MPI/IHDI/Gini/agriculture/water
  etc.) — confirmed as real spec content, topic 1b/1c (§3), not currently in Block 1's two subsections
  per the block/subsection list in §2.
- **`specGap-02`** (constraints: foreign currency gap, capital flight, demographics, credit, education,
  property rights, non-economic factors — Notes-tab only) — confirmed as real spec content, topic 2a/2b
  (§3). This is the block that would replace Block 3 under topFix-04's fallback.
- **`specGap-03`** (market-orientated gaps: subsidy removal, floating exchange rates, privatisation) —
  confirmed real (3a-3/4/5); matches `spec-coverage.json`'s `thinItems` for these exact three bullets
  (§5).
- **`specGap-04`** (interventionist gaps: human capital as strategy, managed exchange rates, joint
  ventures) — confirmed real (3b-1/3/5); matches `thinItems`.
- **`specGap-05`** (other strategies missing: Lewis industrialisation, tourism, primary industries,
  **Fairtrade**, debt relief) — 4 of 5 confirmed real (3c-1/2/3/4, matching `spec-coverage.json`'s one
  true `missingItems` entry — 3c-3, primary industries — plus `thinItems` for tourism and debt relief).
  **Fairtrade is the same overturned claim as topFix-02**: not a spec item anywhere in the document.
- **`specGap-06`** (international institutions: World Bank, IMF beyond SAPs, NGOs absent from Learn
  content; a parenthetical claims "the app's spec map puts IMF/World Bank in 4.3.5") — World
  Bank/IMF/NGOs (3d-1/2/3) are confirmed real 4.3.6 leaves and confirmed thin/missing from Learn prose
  (IMF appears only in Q8 and `practice[4]`'s guidance, per §4; World Bank and NGOs were not found in
  quiz or practice in this pass). **The "4.3.5" parenthetical does not check out against the actual
  Pearson spec**: `audit/raw/spec-items.json`'s 47 leaves tagged `topic === "4.3.5"` are Public
  Expenditure / Taxation / Public Sector Deficits / Macroeconomic Policy — no World Bank, IMF or NGO
  bullet anywhere in that topic. Whatever "the app's spec map" refers to (some internal tagging
  artifact, not `econ_spec.txt` itself) is not identified in this pass; 4.3.6.3d is the sole legitimate
  spec owner of this content, so `SPEC-OWNERSHIP.md`'s "one owner per topic number" rule is not actually
  in tension here — this parenthetical can likely be dropped rather than chased further, but it was not
  run to ground.
- **`specGap-07`** ("unsure" whether sustainability/EKC/green growth is in 4.3.6; believes it is
  assessed in Unit 2 as a cost of growth) — **resolved by this pass, not left unsure**: 0 hits for
  sustainability/EKC/green growth anywhere in the whole specification (§3), including Unit 2. The
  nearest real spec bullet is 2.3.5.3a's plain "environmental costs" (Economics Unit 2, WEC12) — a
  different unit, a different topic number, no EKC or green-growth framing there either. Block 3 is
  off-spec for 4.3.6; see topFix-04.

## 5. `spec-coverage.json`'s `missingItems`/`thinItems` — scope caveat

`audit/raw/spec-coverage.json`'s entry for `economics__growth-development` covers exactly 20 bullets
(`covered:10, thin:9, missing:1`) — 6+6+5+3, i.e. **only topic 3 of 4.3.6** ("Measures to promote
growth and development"). It says nothing about topic 1 (measures of development) or topic 2
(constraints); `specGap-01` and `specGap-02` above are about those two topics and had to be checked
directly against `econ_spec.txt`/`spec-items.json`, not against this file. Its one `missingItems` entry
is "3c) Other strategies: development of primary industries"; its `thinItems` are subsidy removal,
privatisation, floating exchange rates, managed exchange rates, joint ventures with TNCs, tourism, debt
relief, World Bank, NGOs. **Its headline prose says "seven are entirely absent," naming items that the
file's own `thinItems` array (not `missingItems`) lists as partially taught** — a same-file
headline/data disagreement, flagged rather than resolved (the structured arrays are the more reliable
half; the headline overstates "absent" for six of those seven).

## 6. Practice reshape target — `DECISIONS.md`, 2026-09-26, "practice follows the real IAL paper layout"

This Settled entry (quoted in full above it exists at `DECISIONS.md` line ~15) supersedes the ad-hoc
"one item per command word" practice pattern earlier packets used, for every unit of both subjects,
including this one. For WEC14 (confirmed against `audit/raw/ial-paper-structure.json`'s
`economics.units_3_4` object, quoted in full in §0):

- Section A (6 MCQ, 1 mark each): **not rebuilt** — the topic page links the section's existing quiz.
- Section B, one five-part data question on an extract, tariffs 2/4/6/8/14 = 34, command words
  Calculate-or-Define(2), Explain(4), Analyse(6), Examine(8), Discuss(14) (WEC14 orders 8 before 6;
  sequencing only, not a scope change).
- Section C, two 20-mark essays chosen from a pool of three (`Evaluate`/`To what extent`).

The section's current 5 practice items (Define-4, Explain-6, Assess-10, Evaluate-20, Outline-4, §4) do
not match this shape in count, tariffs or command words. **Whoever builds this packet should treat
topFix-05's item-by-item tariff fixes as superseded by this reshape rather than doing both**, per the
Settled entry's own precedent (Economics 1.3.5's practice page was reshaped wholesale, not patched
tariff-by-tariff, once this rule existed) — flagged here as a scope decision the builder should make
explicitly, not one this brief makes for them.

## 7. Not independently checked in this pass (say what was not measured, per the task's own rule)

- The full prose of all 6 subsection bodies was not read end-to-end for every factual claim; only the
  specific claims named by `accuracy-01/02`, `structure-05/06/07`, and the quiz/practice items named by
  `quiz-01/02`, `structure-03` and `topFix-03/05` were checked against source.
- Flashcards (18) and `extras` (4 chains + 4 evaluation) were counted (§2) but not read item-by-item.
- Whether Block 1's takeaway bullets 3–4 (`structure-05`) will already be satisfied once topFix-04's
  constraints content lands was not tested; it is a plausible outcome, not a confirmed one.
- Whether any OTHER live section duplicates World Bank/IMF/NGO teaching (a full `SPEC-OWNERSHIP.md`-style
  cross-section check) was not run; only the 4.3.5 spec text itself was checked and found to contain no
  such bullets.
