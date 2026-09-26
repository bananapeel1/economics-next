# Packet 44 brief — economics__aggregate-supply

Brief phase only. No source file changed, no build/test/validate run, no content authored. Everything
below is either a direct quote from a file, a count produced by a command shown inline, or a question
left open for the build phase / founder. No measurement, test outcome or verification claim appears here.

## 0. Handoff-document check (PROTOCOL, NEXT, PROGRESS, DECISIONS, CONTENT-GATE)

**No blocking contradiction found between the five required documents.** One gap, not a contradiction:

- `grep -n "^## Packet 44 spec" audit/NEXT.md` → **zero hits.** No `## Packet 44 spec` block exists anywhere
  in `audit/NEXT.md`, contrary to what the packet's own launch instructions assume.
- The "newest Handoff" entries do not discuss `aggregate-supply` either. The only two mentions of packet 44
  in the whole file are (a) the tail of the "packet 42 closed (brain)" handoff — "`node audit/scripts/ledger.mjs
  packet 44 --open` returns 27 open items (`aggregate-supply`), also untouched and also 'not started,' as a
  fallback if 43 is claimed" — and (b) an unrelated banned-vocabulary cross-reference inside packet 32's spec
  block: "the shifters of SRAS and LRAS → 2.3.3 (`:1026-1052`), packet 44." Neither is a spec block for this
  packet.
- **This is not new.** Packet 41's own `PROGRESS.md` row records the identical situation verbatim: "No `##
  Packet 41 spec` heading exists anywhere in `audit/NEXT.md`, and no 'newest Handoff' entry there discusses
  this section — the task that launched this packet assumed one existed; it did not." That session's
  resolution, per `PROTOCOL.md`'s own rule ("The ledger is the definition of coverage"), was to proceed on the
  ledger plus the closest real substitute rather than treat the missing heading as a stop condition. This
  brief follows the same precedent rather than returning `ok:false`, because escalating a documentation gap
  that this programme has already named and resolved once is not the kind of founder decision Rule 1's
  "if any of those contradict each other, STOP" is guarding against — there is no disagreement between
  documents here, only one document's silence.
- `audit/PROTOCOL.md`, the Settled list in `audit/DECISIONS.md` and `audit/PROGRESS.md` row 44 ("not started")
  agree with each other and with the ledger. `audit/CONTENT-GATE.md`'s recall contract (types, field shapes,
  validator gates) applies unmodified; nothing in it is specific to this section.
- `audit/SPEC-OWNERSHIP.md` (the cross-section duplication register) has **no row for aggregate-supply**. Per
  its own "How to use this map," a new duplication found by this brief (§4 below) should get a row **before**
  the build resolves it, not after.

If the founder wants this treated differently, that is the escalation; nothing here should be read as this
session having picked a side of a real disagreement.

## 1. Spec span (independently confirmed against the source file, not the ledger's numbers)

`grep -n "^2\.3\.[0-9]" audit/raw/econ_spec.txt` places `2.3.3 Aggregate supply (AS)` at line 1026, running to
line 1052 (line 1054 is the `2.3.4 National income` heading, minus the page-footer lines). Full text:

```
2.3.3 Aggregate supply (AS)
What students need to learn:
 1 The characteristics of AS   a) The concept of AS.
                                b) The AS curve.
                                c) The distinction between a movement along and a shift of the AS curve.
 2 Short-run AS (SRAS)         a) Factors influencing SRAS. Changes in:
                                   • costs of raw materials and energy
                                   • exchange rates
                                   • tax rates.
 3 Long-run AS (LRAS)          a) Different shapes of AS curve: Keynesian, classical.
                                b) Factors influencing LRAS. Changes in:
                                   • the state of technology
                                   • productivity
                                   • education and skills
                                   • government regulations and tax
                                   • demography and net migration
                                   • competition policy.
```

`audit/raw/spec-items.json`, filtered `subject=="economics" and topic=="2.3.3"`
(`python3 -c "..." ` over the file, shown in this run's shell history) returns **17 oracle rows: 14 `leaf`
rows + 3 `requirement` grouping rows** (2a, 3a, 3b). `audit/raw/spec-coverage.json`'s
`economics__aggregate-supply` entry (key match, line 532) reports **covered 11 / thin 3 / missing 2** (=16,
one short of 17 — the grouping-row reconciliation is not resolved here and is not needed to scope this
packet: every leaf below is individually addressed).

**Command words for Economics practice items** (`audit/raw/econ_spec.txt:2696-2745`, Appendix 6, read directly,
not from a summary): Define 2 · Calculate 2 or 4 · Draw 4 · Explain 4 · Analyse 6 · Examine 8 · Discuss 14 ·
Evaluate/To what extent 20. **There is no Assess, no Outline, no 6-mark Explain and no 10-mark item of any
kind.**

## 2. What the live/last-published bundle actually contains (structural count, not a live DB read)

Source: `audit/snapshots/auto-prepublish-2026-09-14T14-20-56-575Z__economics__aggregate-supply.json`
(file mtime 2026-09-14 17:21; this is the newest snapshot on disk for this section — no packet has touched
`aggregate-supply` since — but it is a file, not a `curl` of the live `data`/`draft` API, so treat block/quiz
text as "what this snapshot holds," not "what a student sees today"). Counted with a short Python script over
`tables.section_content` / `_quiz` / `_practice` / `_diagrams` / `_flashcards` / `_common_mistakes` (command
in this run's shell history).

**5 blocks, 13 subsections, 25 quiz, 5 practice, 3 diagrams, 18 flashcards, 3 common mistakes:**

| # | Block title | diagramRef | quizIndices | practiceIndices | subsections |
|---|---|---|---|---|---|
| 0 | Short-Run Aggregate Supply (SRAS) | SRAS | [0] | [0] | sras-shape-and-slope, sras-shifts |
| 1 | Long-Run Aggregate Supply (LRAS) | LRAS | [1] | [1] | classical-lras, keynesian-lras, lras-determinants |
| 2 | Macroeconomic Equilibrium | AD/AS Equilibrium | [2,3] | [2] | ad-as-equilibrium, changes-in-equilibrium |
| 3 | AD/AS Analysis of Macroeconomic Events | AD/AS Shifts | [4] | [3] | demand-side-shocks, supply-side-shocks, applying-adas-to-events |
| 4 | Short-Run vs Long-Run Adjustment | Self-Correcting Mechanism | [5] | [4] | **output-gaps**, self-correcting-mechanism, classical-vs-keynesian-adjustment |

Diagram titles actually present: "Short-Run Aggregate Supply (SRAS)", "LRAS: Classical vs Keynesian", "AD/AS
Equilibrium: Multiple Scenarios" — three, not four; blocks 3 and 4's `diagramRef` ("AD/AS Shifts",
"Self-Correcting Mechanism") match none of them, confirming `diagram-01`/`diagram-02` directly from the data.

Practice items, read from the file (prompt + `marks` field), independently of `practice-01`'s own wording:

| # | Prompt (truncated) | marks | Valid per Appendix 6? |
|---|---|---|---|
| 0 | "Define the term 'long-run aggregate supply' (LRAS)." | 4 | **No** — Define is 2, not 4 |
| 1 | "Explain the difference between a movement along and a shift of the SRAS curve" | 6 | **No** — Explain is 4, not 6 (6 is Analyse) |
| 2 | "Assess the importance of supply-side improvements..." | 10 | **No** — Assess does not exist; 10 does not exist |
| 3 | "Evaluate the view that an increase in aggregate supply is more beneficial..." | 20 | Yes |
| 4 | "Outline two factors that could shift the LRAS curve to the right." | 4 | **No** — Outline does not exist |

**Only `practice-01` is an open ledger id, and it names only item 0.** Items 1, 2 and 4 carry the identical
defect class this programme has already refused elsewhere (national-income/aggregate-demand's "no Assess, no
Outline, no 6-mark Explain, no 10-mark anything," `audit/NEXT.md` packet-32/37 material) but have no ledger id
of their own under packet 44. This is a candidate for the build phase to fix under `practice-01`'s scope or to
mint as new ids — not something this brief resolves.

Quiz index 1 ("Which of the following would cause the SRAS curve to shift to the LEFT?") is block 1's
(LRAS) sole `quizIndices` entry — independently confirms `structure-01`'s claim about that specific mapping
from the raw data, not from the ledger's own prose.

## 3. Every open ledger id (27), what it asks, and what "done" checks against

Full text: `audit/runs/packet-44/ledger-show-all.json` (`node audit/scripts/ledger.mjs show <id>` per id).
Grouped by kind; ✓ = claim's spec citation and scope checked directly against §1/§2 and holds; ⚠ = claim's
own number, scope or wording does not survive that check — noted, not corrected, per Rule 1 ("an audit item
is a claim, not an instruction").

**topFix (mechanical/structural fixes to the existing bundle — no spec check needed, these are shape bugs)**

- **topFix-01** — fill-in renderer mismatch (two `___` blanks, one compound answer) on `changes-in-equilibrium`
  and `supply-side-shocks`; five wrong hint lengths. Done = one `___` per template line, hints match answer
  length, `fillin.blanks`/`fillin.hint` DEBT clear on these two items. Confirmed directly in §2's block list
  (both are real subsections in blocks 2 and 3) — not a phantom target.
- **topFix-02** — re-map `quizIndices`/`practiceIndices` per block. §2's table already shows the wrong mapping
  (block 1/LRAS → quiz index 1, an SRAS-shift MCQ) independently of this item's own claim. Done = each
  block's inline quiz/practice is actually about that block's topic.
- **topFix-03** — a 4th diagram for "Self-Correcting Mechanism," rename block 3's `diagramRef`. §2 confirms
  both dangling refs from the raw data. Done = 4 diagrams exist, every `diagramRef` resolves, `diagram-01`
  and `diagram-02` close with it.
- **topFix-04** — replace/reword three real-world examples. Overlaps `accuracy-01`/`accuracy-02` (same
  examples, different angle — a finding and a ledger item on the same fact, not two separate defects). Done =
  the three named claims read as economically accurate, still IAL-centre-appropriate per `CONTENT-GATE.md`'s
  per-section checklist item 2.
- **topFix-05** — de-duplicate block 3 into block 2, rewrite two generic reorders, prune 5 duplicate quiz
  items, rewrite Q20. §4 below adds a third de-duplication candidate this item does not mention: block 4's
  "Output Gaps" subsection duplicates `economic-growth`'s own spec-owned material, not just block-2/3
  stagflation content. Done = no two blocks teach the same causal chain: `structure-05`'s and this item's
  named overlaps gone, reorder `shuffled` arrays no longer reuse permutations (`structure-06`).

**accuracy**

- **accuracy-01** — SRAS real example (UK manufacturers 2022) states the opposite of what happened
  (claims margins/production rose on a cost-push shock). This is a factual-accuracy claim about a real event,
  not a spec-wording question; nothing in `econ_spec.txt` speaks to it. Done = the example's direction of
  causation matches what actually happened, or the example is swapped, per the packet-15/40 house rule
  against unverifiable/wrong dated real-world claims.
- **accuracy-02** — "UK 2019 close to macroeconomic equilibrium" conflates AD=AS equilibrium (always true)
  with full-employment equilibrium, contradicting the section's own misconception two lines later. Internally
  self-contradictory as described; done = the example says "full-employment output/equilibrium," not bare
  "equilibrium."

**practice**

- **practice-01** — `p0` "Define... LRAS (4 marks)" is checked and **confirmed** against Appendix 6 (§1,
  §2 table): Define is a 2-mark command word in this specification, full stop; there is no 4-mark Define.
  Done = the item is either a genuine 2-mark Define or rewritten as a 4-mark Explain, and its mark-scheme
  clauses ("LRAS is vertical...", "shifts are caused by...") match whichever command word is chosen. See §2
  for the three unticketed siblings.

**structure**

- **structure-01** — inline quiz-to-block mapping wrong (confirmed directly from the data in §2, independent
  method). Same fix as `topFix-02`; not a duplicate ledger id, a duplicate finding of the same defect — build
  phase should confirm both together or flag as one.
- **structure-02** — inline practice mapping is by mark size not topic (`LearnModeTab.jsx:80`), which is why
  the section's most spec-wrong practice items (Outline-4, Assess-10) ended up on-block at all. Code-level fix
  or content re-order; either satisfies it per the item's own wording ("stop sorting by marks... or reorder
  practiceIndices").
- **structure-03** — same two dangling diagram refs as `topFix-03`/`diagram-01`/`diagram-02`. Four ledger ids
  point at one defect; the build phase should not count this as four separate fixes for the ledger-coverage
  arithmetic.
- **structure-04** — recall duplication from odd (3-section) block lengths producing a repeated
  immediate/spaced pair. Verifiable mechanically once the rebuild's block/subsection counts are fixed; not
  spec-dependent.
- **structure-05** — cross-block content repetition (stagflation, AD-right analysis, classical-vs-Keynesian).
  Overlaps `topFix-05`. §4 extends this list with the output-gaps duplication `structure-05` itself does not
  name.
- **structure-06** — 3 of 6 reorders are generic exam-procedure lists reusing 2 shuffle permutations. Checked
  against `CONTENT-GATE.md`'s recall contract (§ "The recall contract"): a reorder must be "a genuine
  sequence... never parallel facts"; a generic procedure list is exactly the shape that contract asks to be
  converted to `classify` or rewritten. Done = per that contract, not a section-specific judgment call.
- **structure-07** — same fill-in shape bug as `topFix-01`; duplicate finding, one fix.
- **structure-08** — ⚠ **numbers wrong, scope claim right.** Says the section "covers IAL 2.3.1-2.3.3... plus
  2.4.3 (equilibrium)... plus 2.5.2 (output gaps)." **Neither "2.4.3" nor "2.5.2" is a real IAL Economics
  number** — every real section number in this specification has 3 as its middle digit (`audit/DECISIONS.md`,
  2026-09-22, the numbering rule this programme has already had to write down once). The requirements this
  item is actually pointing at are **2.3.4 · 3 "Equilibrium level of real output"** (`econ_spec.txt:1074-1077`,
  owned by `national-income`, packet 37, **already BUILT/VERIFIED/STAGED at 100% leaf coverage** per
  `PROGRESS.md` row 37) and **2.3.5 · 4 "Output gaps"** (`econ_spec.txt:1121-1130`, owned by `economic-growth`,
  packet 43, whose `spec-coverage.json` headline already reads "strong on... output gaps," i.e. taught, not
  missing, in its owning section). Also: this section is **not** "2.3.1-2.3.3" — 2.3.1 is "Measures of economic
  performance," an unrelated topic; the section's own real content (§1, §2) is entirely 2.3.3. **See §4 — this
  is a live, unrecorded `SPEC-OWNERSHIP.md` duplication**, the same class this programme resolved for the
  multiplier (D013) and four other topics, not evidence the spec requires the topic deleted (Rule 1's warning
  case).
- **structure-09** — one takeaway (SRAS "becomes steeper" near capacity) encodes an SRAS/Keynesian-LRAS
  conflation; overlaps `accuracy` findings on the same conflation. Also flags one misconception
  (`classical-vs-keynesian-adjustment`, "Keynesians say markets never work") as a straw man rather than an
  observed error — a judgment call for the author, not a spec question.
- **structure-10** — positive-only observation (difficulty ramp is sensible). Not a defect; "done" is
  "preserve this in the rebuild," nothing to fix.

**specGap** — each checked against §1's quoted spec text directly, not against the item's own cited number

- **specGap-01** — "changes in relative productivity" not taught. Spec bullet (3b-2) is bare **"productivity"**
  — no "relative to other economies" qualifier anywhere in `econ_spec.txt`; that qualifier is the item's own
  gloss, not spec wording. The underlying claim (productivity as an LRAS determinant is not properly taught)
  still stands against the bare bullet regardless. Done = "productivity" as an LRAS shifter is taught with a
  mechanism, not just named.
- **specGap-02** — "demographic changes and migration" thin. Spec bullet (3b-5) is one combined bullet,
  **"demography and net migration."** `spec-coverage.json` splits it: "changes in demography" is **missing**,
  "changes in net migration" is **thin**. Done = both halves of the one spec bullet get a mechanism, not just
  the word "immigration."
- **specGap-03** — "changes in government regulations" thin. Spec bullet (3b-4) is combined, **"government
  regulations and tax."** `spec-coverage.json`'s **missingItem** "changes in tax (tax as a long-run incentive
  affecting productive capacity)" is the other half of this same bullet and **has no ledger id of its own**
  under packet 44 — a candidate the build phase should pick up under this item or as a new one. Done =
  regulation AND tax-as-incentive both taught with mechanism.
- **specGap-04** — "competition policy" named, unexplained. Matches spec bullet 3b-6 and
  `spec-coverage.json`'s thinItem exactly. Done = contestability → efficiency → potential output mechanism
  stated.
- **specGap-05** — ⚠ **wrong number.** Cites "2.3.1"; the actual leaf is **2.3.3 · 1c** ("The distinction
  between a movement along and a shift of the AS curve," §1), which this section itself owns — 2.3.1 is
  "Measures of economic performance," unrelated. The spec states this distinction once, generally, not
  separately for SRAS and for LRAS; the item's request to state it explicitly for the vertical LRAS case is a
  pedagogical completeness argument, not a second spec leaf. Done, if accepted = the LRAS block states
  explicitly that a vertical curve has no "movement along" distinct from a shift.
- **specGap-06** — ⚠ **wrong number and, per §4, likely wrong section.** Cites "2.5.2"; the actual leaf is
  **2.3.5 · 4d "Difficulties of measuring output gaps"** (`econ_spec.txt:1121-1130`), owned by
  `economic-growth` (packet 43), whose own coverage headline already says "strong on... output gaps." The
  item itself hedges "(if output gaps are intended to live here)" — correctly unsure, per §4, whether
  "here" (aggregate-supply) should be teaching this leaf at all rather than referring to its owner.
- **specGap-07** — ⚠ **cites a number that cannot exist** ("2.4.3" — middle digit 4, not 3, so it fails the
  IAL numbering pattern outright) **and a form of words not found anywhere in `econ_spec.txt`.**
  `grep -in "short run and long run" audit/raw/econ_spec.txt` returns six lines, all under Unit 3/4 firm
  theory (perfect competition/monopoly profit-maximising equilibrium, lines 1374/1383) or the general
  short-run/long-run distinction in Unit 1 (line 684) — none is a macro AD/AS "equilibrium in the short run
  and long run" requirement. The nearest real leaf is 2.3.4 · 3b ("causes of changes in equilibrium... as a
  result of shifts in AD and/or AS"), already 100%-covered in `national-income` (packet 37). The item itself
  says "Unsure" — correctly so; this reads as a candidate for **reassignment to packet 37 or wont-fix**, not
  a build target for aggregate-supply.

**diagram**

- **diagram-01**, **diagram-02** — confirmed directly against the raw snapshot (§2): both named diagrams
  ("AD/AS Shifts", "Self-Correcting Mechanism") are absent from the 3 diagrams that exist. Same underlying
  defect as `topFix-03`/`structure-03` (4 ledger ids, 1 fix).

## 4. The contradiction/candidate this brief is flagging, not resolving

**`structure-08`, `specGap-06` and `specGap-07`, read together with `audit/SPEC-OWNERSHIP.md` and the actual
snapshot content (§2's "Output Gaps" subsection and "Macroeconomic Equilibrium" block), point at the same
thing: this section currently teaches material two other sections already own.**

- Block 2 ("Macroeconomic Equilibrium," subsections `ad-as-equilibrium`, `changes-in-equilibrium`) teaches
  2.3.4 · 3's leaf, which `national-income` (packet 37) already covers at 19/19 leaves (100%), BUILT and
  STAGED.
- Block 4's `output-gaps` subsection teaches 2.3.5 · 4's leaf, which `economic-growth` (packet 43,
  `spec-coverage.json` headline: "strong on... output gaps") already owns.
- `audit/SPEC-OWNERSHIP.md`'s rule is explicit: "a topic is taught in the section whose specification number
  contains it, and nowhere else... When a content packet finds a new duplication, add a row here with the
  specification reference before resolving it." **No row exists for aggregate-supply.** This programme has
  resolved five near-identical cases already (the multiplier/D013, the price mechanism, demergers, Porter's
  five forces, monopoly/welfare loss) by keeping the owning section's full treatment and reducing the other
  section to a reference or removing the duplicate outright.

**This is not the Rule 1 trap ("four items once told a packet to delete a topic the spec requires")** — the
topic (equilibrium, output gaps) is not being deleted from the product; it already exists, fully taught,
under its rightful spec heading in a different, already-staged section. The question the build phase (or the
founder) needs to settle before rebuilding is: **does the aggregate-supply rebuild (a) narrow to 2.3.3 only
(AS concept, SRAS, LRAS — 3 top-level items, its actual spec span) and reduce the equilibrium/output-gap
material to a short cross-reference into national-income/economic-growth, following the SPEC-OWNERSHIP
pattern already used five times, or (b) keep the current 5-block "aggregate supply and how it interacts with
AD" scope as a deliberate pedagogical bridge, as `structure-10` implies the difficulty ramp already assumes?**
Both are defensible; this brief is not choosing between them because it changes what topFix-05,
structure-05, specGap-06 and specGap-07 mean by "done," and Rule 1 says a scope call like this is checked
against the spec, not inferred from one packet's convenience.

## 5. Counting method, so the numbers above can be re-run independently

```
grep -n "^2\.3\.[0-9]" audit/raw/econ_spec.txt              # spec span boundaries
sed -n '1026,1052p' audit/raw/econ_spec.txt                  # 2.3.3 full text
sed -n '2696,2745p' audit/raw/econ_spec.txt                  # Appendix 6 command words
node audit/scripts/ledger.mjs packet 44                      # 27 items, all open
node audit/scripts/ledger.mjs packet 44 --open               # same 27 (0 already closed)
node audit/scripts/ledger.mjs show <id>                      # full text per id, x27
python3 -c "..." audit/raw/spec-items.json                   # 17 oracle rows for topic 2.3.3
python3 -c "..." audit/raw/spec-coverage.json (grep line 532) # covered 11 / thin 3 / missing 2
python3 -c "..." audit/snapshots/auto-prepublish-2026-09-14T14-20-56-575Z__economics__aggregate-supply.json
                                                               # 5 blocks/13 subsections/25 quiz/5 practice/
                                                               # 3 diagrams/18 flashcards/3 mistakes, per-block
                                                               # titles/diagramRef/quizIndices, per-item
                                                               # prompts and marks
grep -n "aggregate-supply" audit/SPEC-OWNERSHIP.md            # 0 hits — no existing ownership row
```

No `npm run` command, dev server, or Supabase read was used. Nothing above is a claim about what a student
currently sees; §2's counts are a snapshot file's contents, dated and named as such.
