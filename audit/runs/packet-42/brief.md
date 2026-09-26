# Packet 42 brief — business__resource-management, rebuild to IAL 2.3.4

Brief phase only. No source file touched, nothing built, nothing published. Every line below is either a
quote from a file, a count produced by a command shown, or a claim attributed to the document that makes it.
Where I disagree with a cited document, I say so and give the command that produced my number.

## Sources read (full text, not summary)

- `audit/PROTOCOL.md` (150 lines, whole file)
- `audit/SESSION-PROMPT.md` (77 lines, whole file)
- `audit/NEXT.md:1-121` — the `## Packet 42 spec` block
- `audit/NEXT.md:9790-9816` — the newest `## Handoff` heading in the file by line position (`packet 5 V038
  closed...`, 21 Sep 20:55, with a same-day 21:15 amendment appended directly after it — no later Handoff
  exists anywhere in the file; confirmed with `grep -n "^## Handoff" audit/NEXT.md`, 24 hits, this one last)
- `audit/PROGRESS.md:86` — packet 42's row
- `audit/PROGRESS.md:80` — packet 36's row (named as the sibling reference by the packet 42 spec)
- `audit/DECISIONS.md:1-40` (Open + start of Settled), `:57-61` (the original 11 Sep deferral),
  `:3091-3118` (the ratification — last entry in the file, confirmed with `tail -60 audit/DECISIONS.md`),
  plus targeted reads of `:1653-1676` (packet 26, position rule) and the packet-11 V037 entry above it
- `audit/CONTENT-GATE.md:196-268` — the recall contract and the per-section edit pass checklist
- `audit/raw/bus_spec.txt:963-1009` — 2.3.4 verbatim, read in full, quoted below
- `audit/raw/spec-coverage.json` → `bySection` entry keyed `business__resource-management`
- `audit/raw/tariff-census.json` → `business` rows (8 command words)
- `audit/content-sections/business__resource-management.json` — the live t=0 corpus (canonical per
  DECISIONS.md 2026-09-11), read directly with small `node -e` scripts, not through any audit script

## Ledger — 30 open, all in packet 42

`node audit/scripts/ledger.mjs packet 42` and `... --open` return the **same 30 ids** (none already closed).
Matches `PROGRESS.md:86` ("30... not started") and the packet-42-spec's own correction of the stale "13".
No contradiction here.

topFix-01..05, accuracy-01, quiz-01..02, practice-01, structure-01..10, specGap-01..09, specThin-01..02.

## The spec, verbatim (`bus_spec.txt:965-1002`)

```
2.3.4 Resource management
1 Production,         a) Methods of production: job / batch / flow / cell.
  productivity and     b) Productivity: output per unit of input per time period · factors influencing
  efficiency              productivity · link between productivity and competitiveness · ways to improve
                          productivity.
                      c) Efficiency: production at minimum average cost · factors influencing efficiency ·
                          ways to improve efficiency.
                      d) The distinction between labour- and capital-intensive production.
                      e) Competitive advantage from short product lead-in times.
2 Capacity            a) Capacity utilisation: current output / maximum possible output (x100).
  utilisation          b) Implications of under- and over-utilisation of capacity.
                      c) Ways of improving capacity utilisation (under and over utilisation).
3 Inventory control   a) Interpretation of inventory control diagram.
                      b) Buffer inventory.
                      c) Implications of poor inventory control.
                      d) Just in time (JIT).
                      e) Waste minimisation.
                      f) Competitive advantage from lean production.
4 Quality             a) Quality: control / assurance / circles.
  management           b) Total Quality Management (TQM).
                      c) Continuous improvement (Kaizen).
                      d) Competitive advantage from quality management.
```

17 leaves. Confirms the packet-42 spec's four-chapter order and its Rule 2 vocabulary claim: the word is
**"inventory control"** / **"buffer inventory"** everywhere in the spec text; "stock control" / "buffer
stock" / "re-order level" / "lead time" / "stock-out" appear nowhere in this block (they are elaboration
vocabulary several ledger items reach for, not spec vocabulary — matches the packet spec's own measured
count of 3/1 vs 0/0/0/0/0).

## Live corpus, counted directly (not from any prior report)

```
node -e "const d=require('./audit/content-sections/business__resource-management.json');
  console.log(Object.keys(d.content).length,'blocks');
  ... " audit/content-sections/business__resource-management.json
```

- **4 blocks / 10 subsections** (3+2+2+3) / **25 quiz** / **5 practice** / **24 flashcards** /
  **5 common_mistakes** / **4 notes** / **0 `diagramRef` set on any block** / **0 subsections with a
  `recall` key**. Matches the packet-42 spec's stated "Live shape" line exactly.
- **MCQ answer-position distribution, counted directly on `correctIndex` across all 25 items:
  23 at index 1, 2 at index 2 (items #1 and #6), 0 at index 0 or 3.** `topFix-01`, `quiz-02` and the
  22 September DECISIONS.md ruling all say **"22 of 25 at option B"** — my direct count says **23 of 25**.
  The substance is unchanged (the bank must still be redistributed across 0-3 by construction, per the
  ruling) but the cited figure is wrong by one in three places. Recount before quoting it again.
- Block 0 (`quizIndices:[0]`) → quiz item 0 stem: *"...What is its capacity utilisation?"* (a Block-1 topic).
  Block 1 (`quizIndices:[1]`) → quiz item 1 stem: *"Which production method is most suitable for making
  custom wedding cakes?"* (job production, a Block-0 topic). Confirms `structure-01`/`quiz-01`'s swap claim
  by reading the stems, not by trusting the finding text.
- `practiceIndices` per block: `[undefined, [0], [1], undefined]` against 5 practice items (0-4) — items
  2, 3, 4 are referenced by no block. Confirms `structure-07` directly. Practice item 0's text is literally
  *"Define the term 'capacity utilisation'. (4 marks)"* — confirms `practice-01` verbatim.
- JIT subsection `realExample.text` contains, verbatim: *"...during the 2021 semiconductor shortage, Toyota
  had to halt production at 14 factories because its JIT system had no buffer stock of chips to fall
  back on."* — confirms `accuracy-01`/`topFix-03`'s Toyota claim is still live, unedited.
- Lean-production subsection `realExample.emoji` is `"�icing"` (U+FFFD replacement character +
  "icing") — confirms the "corrupted emoji" half of `topFix-03` directly, byte for byte.
- Block 2 `takeaway[0]`: *"JIT eliminates stock-holding costs but requires perfectly reliable suppliers."*
  JIT subsection `misconception`: *"...JIT means minimising stock, not eliminating it entirely..."* —
  direct, quoted contradiction. Confirms `structure-08`.
- Kaizen subsection body, verbatim: *"...regular team meetings (often called **kaizen circles** or quality
  circles)..."* — quality circles never appears outside this aliased clause. Confirms `structure-06`.

## Command-word tariffs, cross-checked against the census (`audit/raw/tariff-census.json`, business rows)

Define 2 · Calculate 4 · Construct 4 · Explain 4 · Analyse 6 · Discuss 8 · **Assess 10 (Units 1/2) / 12
(Units 3/4)** · Evaluate 20 — all sourced to `bus_spec.txt:2220-2251`, the same census packet 36 used
(`PROGRESS.md:80`: "all eight Business command words at Unit 2 census tariffs").

- `practice-01`'s claim that a 4-mark Define is wrong checks out: census Define = 2, not 4.
- `topFix-05`'s proposed relabelling checks out against the census on marks: Calculate=4, Analyse=6,
  Explain=4 all match. The packet-42 spec explicitly warns this still needs checking before building it —
  this is that check, done on marks only. It does **not** check the command-word's *definition* text
  (`bus_spec.txt:2220-2251`) against what each rewritten item actually asks the student to do, which is a
  Build-phase judgement call, not something a count can settle.
- Practice item 2 is already `Assess ... (10 marks)` (matches Unit-2 tariff already); item 3 is already
  `Evaluate ... (20 marks)` (matches). Neither `topFix-05` nor `practice-01` flags these two — consistent.

## Every id, its spec leaf (by wording, never by the ledger's own number), and what "done" means

Numbering per Rule 1: every ledger item below cites `2.4.x`; the real spec is `2.3.4`, leaf letters only
below. `specGap-09` is the one item about the chapter number itself — already ruled `wont-fix` by the
packet-42 spec (evidence: `grep -c "2\.4\.3" audit/raw/bus_spec.txt` → 0).

**Chapter 1 — Production, productivity and efficiency**
- `specGap-04` → leaf **1a** ("job / batch / flow / **cell**"). Done: cell production taught as a fourth
  method, not a lean-block aside.
- `specGap-05`, part of `structure-04`'s scope → leaf **1b** ("factors influencing productivity"). Done:
  factors named, plus one worked output-per-worker-per-period calculation (ties to `structure-10`).
- `specGap-03`, `specThin-01` → leaf **1c**, all three bullets ("production at minimum average cost" /
  "factors influencing efficiency" / "ways to improve efficiency"). Done: efficiency defined by its spec
  test (minimum average cost), not used as a synonym for productivity; all three bullets present.
- (1d, labour/capital distinction) — no open ledger id; already taught per `structure-04`'s own framing.
  Verify it survives the rebuild; nothing to build new.
- `specThin-02` → leaf **1e** ("competitive advantage from short product lead-in times"). Done: named and
  explained, not just mentioned.

**Chapter 2 — Capacity utilisation**
- (2a, the formula) — no open id; already taught (`topFix-04`'s fillin should use it).
- `specGap-08` → leaf **2b** ("implications of under- **and over**-utilisation"). The item's own text
  says this is "adequate" already (one paragraph + practice Q4). The packet-42 spec does not rule on this
  one the way it rules on `-02`/`-07`/`-09`; Build should re-scope-or-wont-fix it the same way, with its
  own citation, rather than silently leaving it open or silently building it.
- Packet-42 spec item 5 (unclaimed) → leaf **2c** ("ways of improving capacity utilisation, **under and
  over**"). Read carefully: the spec bullet covers *both* directions, not only over-utilisation the way
  `spec-coverage.json`'s `missingItems` phrasing and the packet spec's own summary of it say ("2c... Ways
  of dealing with OVER-utilisation"). The live "Improving Capacity Utilisation" subsection (block 1,
  section 1) may already partly cover the under-utilisation half — check it before writing 2c as if
  nothing exists, since "build it anyway" from the packet spec should not mean duplicating what block 1
  already has for the under-utilisation direction.

**Chapter 3 — Inventory control**
- `specGap-01`, `structure-03`, part of `topFix-02` → leaf **3a** ("interpretation of inventory control
  diagram"). Done: at least one inventory-control diagram, labelled in the spec's own vocabulary
  (re-order level / maximum-minimum as *diagram labels only*, per Rule 2), collision-guarded per the
  packet spec's `COLLIDE_TOL=1.2` instruction.
- `specGap-02`, rest of `topFix-02`, `structure-05` → leaves **3b** ("buffer inventory") and **3c**
  ("implications of poor inventory control"). Done: both taught as their own idea, not implicit inside JIT.
- `accuracy-01`, `topFix-03` → leaf **3d** (JIT). Done, per the packet spec's explicit instruction: the
  Toyota 2021 claim is **removed, not corrected** (packet 15's rule, endorsed by packet 40); teach the
  JIT trade-off with the section's own worked figures instead. Also fix the corrupted emoji and drop or
  replace the unsourced Rolls-Royce / JLR "40%" / BrewDog claims named in `topFix-03`.
- Part of `specGap-07` → leaf **3e** ("waste minimisation"). Judge depth against this wording, same
  treatment as `-02`.
- Rest of `specGap-07` → leaf **3f** ("competitive advantage from lean production"). The item says this
  currently lives only in extras chains, not Learn Mode content — re-scope or wont-fix with citation, per
  the packet spec's instruction for this id.

**Chapter 4 — Quality management**
- `specGap-06` → **cites leaf 4c (Kaizen); the actual spec leaf for quality circles is 4a**
  ("quality: control / assurance / **circles**"), the third bullet of 4a, not part of 4c at all.
  `spec-coverage.json`'s own `thinItems` gets this right ("4a) Quality circles"); the ledger item's
  citation does not. Build against 4a's wording, not the id's own "2.4.4c".
- (4b, TQM) and (4d, competitive advantage from quality management) — no open ids; verify survival through
  the rebuild.
- `structure-06` → also leaf 4a (circles) plus **4c** (Kaizen) for the duplication: kaizen is taught twice
  (once inside the old Block 2 as a lean technique, once as its own Block 3 subsection) and quality
  circles never gets more than the aliasing clause quoted above. Done: kaizen taught once, under 4c;
  quality circles given its own treatment under 4a, not an alias of kaizen.

**Cross-cutting (not tied to one leaf)**
- `topFix-01`, `quiz-01`/`-02`, `structure-01` — the MCQ bank: redistribute `correctIndex` across 0-3 by
  construction (corrected count: 23 of 25 at index 1 today, not 22), fix the block/quiz swap, remove the
  five near-duplicate pairs, replace the three Evaluate/"to what extent" MCQs. Explanations must name
  options by content, never by position or letter (packet 26 rule, `DECISIONS.md:1653`) — this also
  matters because options are shuffled again at render (F074) independent of authored order.
- `topFix-04`, `structure-02` — recall widgets from zero, to the packet-7 contract
  (`CONTENT-GATE.md:196-232`): fillins for the two formulas and the seven wastes, a QC/QA/TQM contrast
  fillin, reorder reserved for the kaizen cycle only and only if its prompt names the ordering principle
  and has exactly one defensible order (Layer 1a, `CONTENT-GATE.md:269-306`). `recall-census-baseline.json`
  has no row for this section, so it is held to zero recoverable recalls by `npm run recalls`.
- `topFix-05`, `practice-01`, `structure-07` — practice to IAL Unit 2 formats, tariffs cross-checked above.
  The old "Block 1" / "Block 2" placements this id and `quiz-01`/`structure-01` name are the **current**
  4-block structure; once rebuilt to the spec's own 4-chapter order (Production/productivity/efficiency ·
  Capacity utilisation · Inventory control · Quality management) those placements do not carry over
  automatically — re-derive which new chapter each fix belongs to, don't reuse the old block index.
- `structure-04`'s proposed subsection order for chapter 1 (job-batch-flow, labour-vs-capital,
  productivity) does not match the spec's own bullet order (a methods incl. cell, b productivity,
  c efficiency, d labour/capital, e lead-in times). Not a contradiction — the spec does not mandate its
  bullet order as teaching order — but flagged since the packet spec elsewhere leans on the spec's own
  chapter order for everything else.
- `structure-08`, `structure-09`, `structure-10` — content-quality fixes to carry into whatever subsections
  end up holding JIT/lean and the capacity leaves after the rebuild; re-verify against the *new* text, not
  patched onto the old Block 2/Block 1 structure.

## A concern worth flagging, not a contradiction

`DECISIONS.md:9-10` (Open, undecided): **"Business extract sourcing — 6 exist in `content/data-response/`,
20 sections need them... Blocks Business practice work."** `resource-management` is not one of the 6
(`ls content/data-response/` confirmed). `topFix-05` asks for "a short stimulus" added to two practice
items. The existing practice items are self-contained prompt text with no reference to the external
`content/data-response/` extract pipeline that the Open item is about, and packet 36 (the cited sibling)
built its 11 practice items the same self-contained way without touching that pipeline. On the evidence
available these look like different content shapes — a short in-prompt mini-case is not a sourced
data-response extract — but Build should confirm that reading before writing "a short stimulus" rather
than assume it, since the Open item is explicitly unresolved and cites a copyright question.

## Contradictions found between the handoff documents themselves

None. `PROGRESS.md:86` (30 opens), the ledger (30 open items), the packet-42 spec block's own numbers,
`spec-coverage.json`'s missingItems/thinItems (2 missing, 7 thin, matching the spec block's list exactly),
and the 22 September DECISIONS.md ruling on the MCQ id ownership are all mutually consistent. The newest
Handoff in the file (`NEXT.md:9790`, packet 5/V038, `app/globals.css`) is about unrelated shared-file state
and does not mention this section; nothing in it conflicts with the packet-42 spec.

The two items above (the 22-vs-23 MCQ count, and `specGap-06`'s 4c-vs-4a mis-citation) are factual
corrections inside the audit corpus, not disagreements between the four governing documents — flagged for
Build to use the corrected numbers, not escalated.
