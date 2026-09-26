# Verify A — packet 42 (business__resource-management)

Read-only. `audit/runs/packet-42/built.md` was NOT read. Started from
`node audit/scripts/ledger.mjs unverified 42`, `git diff`/`git diff --cached`, `audit/NEXT.md`
(`## Packet 42 spec`), `audit/PROTOCOL.md` §3 and `audit/raw/bus_spec.txt:962-1000`.

## Independence — how this pass differs from the builder's own checks

`audit/runs/packet-42/verify-draft.mjs` (the builder's probe) was not run and not read. Instead:

1. **The corpus I judged is the staged bundle**, `audit/snapshots/packet-42-bundle__business__resource-management.json`,
   cross-checked against the live draft route with
   `node audit/scripts/check-staged-drafts.mjs resource-management --verbose` → `matches`, 0 drift,
   and independently against `curl "localhost:3001/api/sections/resource-management?draft=1"`
   (4 blocks, 26 recalls, counts quiz 35 / flashcards 36 / mistakes 8).
2. **Every number was re-derived, not read.** Quiz answer-index histogram, pairwise question
   similarity, SVG label geometry, and all seven fill-in answer sets were recomputed here from the
   bundle.
3. **The validator was re-run against the DRAFT bundle**, which is something no gate command does.
   This matters: `lib/content-gate.mjs:72-79` `loadBundle()` selects `data` only, so
   `npm run validate` measured the **stale live** resource-management content (`Define 4`,
   `Explain 6`, `Outline 4` practice items — the pre-packet bank, still visible in
   `audit/scripts/spec-coverage-check.mjs` output). That is where gate.log's
   `block 30 · debt 17 · coverage 86%` row comes from; it says nothing about this packet.
   Running `validateSection()` over the staged bundle directly gives:

       block 0 · debt 0 · info 2 · 28 of 28 specification leaves evidenced (100%)
       NEW BLOCK 0 · NEW DEBT 0 against audit/validator-baseline.json

   The content did pass the BLOCK rules at write time via `stageSection()`, but `npm run validate`
   is blind to a staged section and should not be read as covering one.

## Per-id findings

Numbering note applied throughout: `2.4.x` in the ledger text is UK GCE numbering that does not
exist in the IAL spec (`grep -c "2\.4\.3" audit/raw/bus_spec.txt` → 0). Requirements were matched by
their wording at `audit/raw/bus_spec.txt:962-1000`. The staged bundle contains exactly one spec
number, `2.3.4`, nine times, and no `2.4.x` anywhere.

### topFix-01 — CONFIRMED
Bank rebuilt to 35 items. Correct-answer histogram recomputed here: **index 0 → 9, 1 → 9, 2 → 9,
3 → 8**. Highest pairwise question+options Jaccard similarity across all 595 pairs is **0.25**
(q20/q22), so no near-duplicate pair survives. No stem contains `Evaluate`, `To what extent`,
`Discuss` or `Assess`. Every block's `quizIndices` now points only inside its own chapter
(block 0 → 3-12, block 1 → 13-19, block 2 → 20-27, block 3 → 28-34). Packet 26's rule holds: a scan
for `option [A-D]`, `the first/second/third/fourth option`, `answer [A-D]`, `A)`…`D)` across all 35
explanations returns **0 hits**.

### topFix-02 — CONFIRMED (with a naming note)
Block 2 `Inventory Control` now opens on `Reading an Inventory Control Diagram` (sub 0), **before**
`Just in Time` (sub 3), followed by `Buffer Inventory` (sub 1) and `Implications of Poor Inventory
Control` (sub 2). Diagram `resource-management:diagram:7bfe9b79` "The Inventory Control Diagram" is
pinned on the block by `diagramId`. The finding's requested title (`Stock Control and Lean
Production`) and its vocabulary were **correctly refused**: the specification at :962-1000 never
writes `stock control`, `buffer stock`, `re-order level`, `lead time` or `stock-out`. Measured over
the staged bundle: those five phrases appear **0 times in teaching text**; `re-order level` and
`lead time` appear once each, **as labels inside the SVG only**. `inventory control` 16 /
`buffer inventory` 10 in teaching text. The defect (no inventory subsection, no diagram) cannot occur.

### topFix-03 / accuracy-01 — CONFIRMED
`Toyota`, `Rolls`, `JLR`, `Jaguar`, `BrewDog`, `semiconductor`, `chip`, `Fukushima`, `14 factories`,
`14 plants` → **0 occurrences** anywhere in the staged bundle. Every `realExample` in all 26
subsections uses the section's own fictional firms (Anvari Cycles / Belvar Bikes) with the section's
own worked figures — packet 15's rule as packet 40 applied it. All 26 emoji fields decode cleanly;
no mojibake. The inverted JIT claim is unreachable because the assertion is gone, not reworded.

### topFix-04 — CONFIRMED (one named widget not built, with reason)
26 of 26 subsections carry a recall (was 0): classify 11, match 6, fillin 7, reorder 2. Both named
formula fill-ins exist — capacity utilisation at `b1s0` (190 ÷ 250 × 100) and labour productivity at
`b0s3` (7,200 ÷ 24 vs 8,400 ÷ 30) — and the QC/QA/TQM contrast fill-in exists at `b3s0` with answers
`reactive` / `preventive` / `cultural`, exactly the contrast the finding asked for. Only two reorders
ship, and both are genuine sequences: the kaizen cycle at `b3s3` (identify → trial → roll out →
standardise) and a causal chain at `b0s5`. The "seven wastes" fill-in was not built because the
section does not teach "the seven wastes" (0 occurrences) — the IAL leaf is `3e waste minimisation`,
taught at `b2s4` with its own recall. All seven fill-in answer sets were recomputed here and are
arithmetically correct (300/280/20; 76/60/95; 60/80/nothing; 540/1040/20; 5/3.50/1.50; 5/6000/manual).
`node audit/scripts/recall-census.mjs --section resource-management` → **0 of 26 recoverable (0%)**,
and the section has no row in `audit/recall-census-baseline.json`, so it is held to zero and passes.

### topFix-05 / practice-01 — CONFIRMED
Practice rebuilt to 10 items. Every (command, tariff) pair is checked against
`audit/raw/tariff-census.json` rows for `business` (`bus_spec.txt:2220-2251`): Define 2, Calculate 4,
Explain 4, Analyse 6, Construct 4, Discuss 8, Assess 10 (the Units 1/2 value — this is WBS12),
Evaluate 20. **All ten are valid pairs.** The specific defect — `Define the term capacity
utilisation (4 marks)` — is gone: `p0` is now `Define the term 'productivity'. (2 marks)` and the
calculation skill is examined by `p1` and `p4` as 4-mark `Calculate` items with data. Levels-marked
tariffs (`p7` 8, `p8` 10, `p9` 20) carry Level 1-4 descriptors in their guidance; the point-marked
tariffs carry per-mark guidance and `p3` states explicitly that levels are not used at 6.
`p4` is the twist the audit asked for (maximum output falls after a line closes).

### quiz-01 / structure-01 — CONFIRMED
See topFix-01. Block 0's inline quizzes are 3-12, all production/productivity/efficiency items;
Block 1's are 13-19, all capacity items, starting with the 190/250 hotel calculation. A student can
no longer meet the capacity formula before it is taught. Quiz 0-2 are left unpinned, which
`lib/pretest-pool.js:36-42` consumes as exactly the three-question pre-test.

### quiz-02 — CONFIRMED
Bank-wide bias gone; see the 9/9/9/8 histogram above. "Always pick B" now scores 9/35 (26%), not 88%.

### structure-02 — CONFIRMED. 26 recalls, 0 recoverable. See topFix-04.

### structure-03 — CONFIRMED
Four diagrams (was 0), one pinned per block by `diagramId`, each with two scenarios. Geometry of
`The Inventory Control Diagram` re-derived independently from the stated data (300 tyres/day,
max 6,000, buffer 1,200, lead 4 days): re-order level 1,200 + 300×4 = **2,400**, order quantity
6,000 − 1,200 = **4,800**, cycle 4,800 ÷ 300 = **16 days** — and the drawing's y-scale
(y=214 ⇒ 0, y=58 ⇒ 6,000) puts 2,400 at y=151.6 and 1,200 at y=182.8, both exactly as drawn. The
lead-time bracket (x 133.25 → 159) starts precisely where the falling line crosses the re-order
level and ends at the delivery. An independent label-collision scan (my own glyph-advance estimate
at 0.56 em, deliberately over-wide, TOL 1.2) over all 8 scenarios: **0 collisions, 0 viewBox
overflow**, smallest label 12px at viewBox 400 (≈11.7 CSS px at 390, the F088 precedent).

### structure-04 — CONFIRMED
The defect is a property of the retired step model. `lib/learn-steps.js:53-67` now emits one `teach`
step per subsection plus one `checkin` per chapter (packet 5); nothing pairs two subsections into a
step, so "labour-vs-capital alone in a step" cannot occur. Block 0's order also now follows the
specification's own order (1a methods 0-2, 1b productivity 3-5, 1c efficiency 6-7, 1d labour/capital
8, 1e lead-in times 9) rather than the reordering the finding proposed against the old model.

### structure-05 — CONFIRMED
Block 2 is `Inventory Control` and every one of its six subsections is an IAL leaf under
`3 Inventory control` (3a diagram, 3b buffer inventory, 3c poor control, 3d JIT, 3e waste
minimisation, 3f lean competitive advantage). Cell production moved to Block 0 (`Flow and Cell
Production`), kaizen to Block 3. Title and contents agree.

### structure-06 — CONFIRMED
`kaizen` appears in exactly one subsection, `b3s3 Continuous Improvement (Kaizen)` (7 mentions);
zero mentions anywhere in Block 2. `Quality Circles` is its own subsection `b3s1` with its own
keyIdea, body, example, misconception and recall — no longer an alias.

### structure-07 — CONFIRMED
`practiceIndices` now cover all ten items across all four blocks: block 0 `[0,1,2,3]`, block 1
`[4,5]`, block 2 `[6,7]`, block 3 `[8,9]`. No practice item is unsurfaced and no block is without one.

### structure-08 — CONFIRMED
Block 2 takeaways are now `["Read the slope first…","Buffer inventory is insurance…","JIT minimises
what is held; it does not eliminate it."]`. Every use of "eliminat*" in the bundle (5) argues the
same direction as the misconceptions, including `b2s3` ("It minimises what is held rather than
eliminating it"). `zero stock` and `no stock at all`: 0 occurrences.

### structure-09 — REJECTED
The three replacements the finding asked for are all present: "capacity utilisation above 100% is
possible" at `b1s0`, "QA means no inspection at all" at `b3s0`, "higher productivity means workers
work harder" at `b0s4`. One of the three fillers it asked to drop is gone ("QC is a bad method").
**Two are still there, in substance and almost in wording:**

- `b3s2` (Total Quality Management): "Students write that TQM guarantees zero defects." — the
  finding's `'TQM guarantees zero defects'`.
- `b3s3` (Continuous Improvement (Kaizen)): "Students describe kaizen as a project with a start and
  an end." — the finding's `'kaizen is a one-off project'`.

Additions without the removals is partial mitigation. What remains: replace those two subsections'
`misconception` fields with errors students actually make.

### structure-10 — CONFIRMED
The section now applies rather than describes, and does it on the exact twist the finding named
(capacity changing under a rationalisation) in three independent places: practice `p4` (maximum
falls 4,000 → 3,200, output unchanged), quiz `q16` (a line closes, utilisation rises, nothing is
sold), and fill-in `b1s3` (6,000/10,000 → 6,000/7,500, "the number of units sold changed by
*nothing*"). Worked calculation with contrast also at `b0s3`, `b0s6`, `b0s8`, `b2s0`.

### specGap-01 — CONFIRMED
Leaf `3a Interpretation of inventory control diagram` is taught at `b2s0` with a pinned diagram,
plus a fill-in that makes the student read usage rate, order point and cycle length off given data.
See structure-03 for the geometry check.

### specGap-02 — CONFIRMED
Re-scoped as `NEXT.md` §4 directed. `3b Buffer inventory` is `b2s1` and `3c Implications of poor
inventory control` is `b2s2`, each a subsection of its own with keyIdea, worked figures, misconception
and recall — not implicit inside JIT. Both are written in the specification's vocabulary
(`buffer inventory` ×10; `buffer stock` ×0).

### specGap-03 — CONFIRMED
`b0s6 Efficiency: Production at Minimum Average Cost` states the definition the spec uses and works
it ($9,000 fixed + $2/unit → $5 then $3.50). `b0s7` names the factors influencing efficiency.
`b0s6`'s misconception attacks the exact loose usage the finding reported ("Efficiency and
productivity are used as synonyms… they can move in opposite directions").

### specGap-04 — CONFIRMED
Cell is taught as a method of production in `b0s1 Flow and Cell Production` and weighed in
`b0s2 Choosing a Method of Production`; block 0's takeaway opens "Four methods, not three". `b0s1`'s
misconception names the old defect ("Students meet 'cell' for the first time inside a paragraph
about lean production"). Treated as a bullet of 1a, not as "cell production" the standalone
technique, per `NEXT.md` Rule 2.

### specGap-05 — CONFIRMED
`b0s4 Factors Influencing Productivity` lists skill/training, equipment, organisation, motivation and
input reliability; `b0s5` carries the productivity→competitiveness link. The missing worked
calculation now exists twice: fill-in `b0s3` compares output per worker across two periods
(300 → 280 — output up, productivity down) and quiz `q6`/`q7` test the same distinction.

### specGap-06 — CONFIRMED. `b3s1 Quality Circles`, a full subsection. See structure-06.

### specGap-07 — CONFIRMED
Both leaves are in Learn Mode content, not only in extras: `b2s4 Waste Minimisation` (3e) and
`b2s5 Competitive Advantage from Lean Production` (3f), the latter carrying the costed argument
($140 → $133.80 → $127.80 against Belvar Bikes's $132).

### specGap-08 — CONFIRMED
`2b`'s over-utilisation half is now a subsection of its own, `b1s2 Implications of Over-Utilisation`,
with both sides costed (97.50%, +$3,900 correction, $8,000 penalties), plus `b1s4 Ways of Relieving
Over-Utilisation` (leaf 2c, which carries no ledger id), practice `p5`, and quiz `q15`, `q18`, `q19`.

### specThin-01 — CONFIRMED
`b0s7 What Moves Efficiency, and How to Improve It` names leaf `1c-3` explicitly and gives five
ways, ranked, with the arithmetic that separates them. A student can answer an exam question from it.

### specThin-02 — CONFIRMED
`b0s9 Competitive Advantage from Short Product Lead-In Times` defines the term (design sign-off to
first customer), distinguishes it from supplier lead time in its misconception, and quantifies the
advantage (9 → 5 months; 800/month at $120 contribution). Quiz `q12` examines it.

## Unclaimed but relevant

None. The ledger holds 30 items for this section: the 29 claimed above plus
`C-resource-management-specGap-09`, already `wont-fix` with the numbering citation. Leaf `2c`
(ways of dealing with over-utilisation) has no ledger id and was built anyway at `b1s4`, as the
packet spec directed.

## Observations that are not verdicts

1. **`npm run validate` cannot see a staged section.** `lib/content-gate.mjs:75` selects `data`
   only, so gate.log's resource-management row (`block 30 · debt 17 · 86%`) is a measurement of the
   pre-packet live content. The real figures for what this packet built are `0 / 0 / 100%`, obtained
   by running `validateSection()` over the staged bundle. This is the same class of blind spot
   `check-staged-drafts.mjs` was written for, one level up, and it affects every section packet
   held in draft — worth a DECISIONS entry rather than a packet-42 rejection.
2. Re-running `npm run validate` now reports **184 new DEBT corpus-wide** (160 `practice.opening`,
   24 `spec.uncovered`) where gate.log recorded 0. These are not packet 42's: they appear on all 43
   sections and are the known back-catalogue `practice.opening` class. HEAD has moved to
   `87671e8 packet-13.2`, which rewrote `audit/validator-baseline.json`, since gate.log was taken.
   Four of the 160 land on resource-management's live (old) practice items.
3. `check-staged-drafts.mjs` compares only what an anonymous request serves — 7 of 35 quiz items,
   and no mistakes. Quiz items 7-34, flashcards past the preview limit and the 8 mistakes are
   verified here against the dumped bundle, not against an entitled fetch of the draft.

## Gate

`node audit/scripts/ledger.mjs unverified 42` will not exit 0 while `structure-09` stands rejected.
28 of 29 confirmed; the packet gate should not pass until the two surviving filler misconceptions at
`b3s2` and `b3s3` are replaced, which is a two-field edit and a re-stage.

---

## Re-verification round 1 — 2026-09-22, packet-verifier (fresh context)

Scope: `node audit/scripts/ledger.mjs unverified 42` returned exactly one id,
`C-resource-management-structure-09` (status `claimed`). Everything else in packet 42 is already
`confirmed`, except `C-resource-management-specGap-09` (`wont-fix`). So this round re-checks the one
id rejected in round 0 and nothing else. I did not read `audit/runs/packet-42/built.md`.

### Method, and why it is not the fix's method

The fix is a file: `scripts/_packet42-content.mjs`, assembled and checked in-process by
`scripts/packet-42-resource-management.mjs`. Its own guard (lines 483-493) collects the misconception
strings out of the assembled bundle **in the same process that builds it**, so it can only ever agree
with the file. PROTOCOL gate step 5 and MEMORY's "probe reads the shipping file" both say the same
thing: a repository can agree with itself while the database still holds the defect.

So I went the other way round the loop — HTTP, from the running `remediation-dev` on 3001, through the
real route (`app/api/sections/[id]/route.js`), out of the `draft` column:

    curl -s "http://localhost:3001/api/sections/resource-management?draft=1"   -> 126299 bytes
    curl -s "http://localhost:3001/api/sections/resource-management"           ->  46220 bytes

The two differ (published chapter titles are still `Methods of Production` / `Inventory Management`;
the draft's are `Production, Productivity and Efficiency` / `Inventory Control`), which proves
`?draft=1` really selected `draft` and did not fall back to `data`.

I then walked the returned JSON myself — a recursive walk over every key matching `/misconception/i`,
not a lookup of the paths the runner writes — and separately grepped the whole serialised payload for
the three filler claims by shape.

**Positive control (the A/B the programme keeps skipping).** I ran the identical walk and the identical
greps against the *published* payload, which is the pre-packet state. It finds all three fillers,
verbatim, at `content[3].sections[0..2].misconception`:

    "quality control is a bad method that businesses should never use"
    "TQM guarantees zero defects."
    "kaizen as 'a one-off improvement project.'"

So the method demonstrably can see this defect when it is present. On the draft it finds none of them.

### What the live draft holds

26 `misconception` fields across 4 chapters (the published section had 10).

Fillers the finding asked to drop — absent from the live draft, by phrase and by shape:

    /zero defect/i        0 hits   (5 in the published payload)
    /guarantees? zero/i   0 hits
    /one-?off project/i   0 hits   (4 in the published payload)
    /start and an end/i   0 hits
    /QC is|bad method|quality control is (a )?bad/i   0 hits

The two that survived round 0 are gone and have been replaced by genuine errors, not deleted:
- `content[3].sections[2]` (Total Quality Management) — "Students reach for TQM whenever an extract
  mentions faults, as though it could be switched on this quarter." (`scripts/_packet42-content.mjs:679`)
- `content[3].sections[3]` (Continuous Improvement (Kaizen)) — "Students dismiss kaizen because no
  single change is worth much…" (`scripts/_packet42-content.mjs:703`)

The three replacements the finding asked for are present live:
- above-100% utilisation — `content[1].sections[0].misconception` (`_packet42-content.mjs:353`)
- QA means no inspection — `content[3].sections[0].misconception` (`_packet42-content.mjs:631`)
- productivity = working harder — `content[0].sections[4].misconception` (`_packet42-content.mjs:194`)

Four of the five errors the finding calls genuine are live in `content`: productivity vs production
(`content[0].sections[3]`), JIT = zero stock (`content[2].sections[3]`), lean = JIT
(`content[2].sections[5]`), 100% utilisation as the target (`content[1].sections[2]`).

### The fifth genuine error, and the one thing I could not read live

"Just cut prices" no longer appears as a subsection `misconception`. It is carried by the dedicated
mistakes surface instead: the staged bundle's `tables.mistakes` holds exactly 8 rows — the five
genuine errors plus the three replacements — and row 5 is `Answering spare capacity with "cut the
price"`. I could not read those rows over HTTP: `mistakes` is fully withheld from a signed-out
request by `lib/preview-limits.js`, and the brief forbids me querying the database directly. What the
live draft does give me is `counts.mistakes: 8`, which the route computes from the draft row itself
and which matches the bundle's 8 exactly. That is corroboration, not proof, and I am recording it as
such: the decisive part of this finding — filler misconceptions out, better ones in — was read live.

I also checked the removal did not take spec content with it: "quality control" still appears 8 times
in the draft and `content[3].sections[0]` is still titled "Quality Control and Quality Assurance", so
the filler misconception went without the method it was about.

**Verdict: CONFIRMED.**
