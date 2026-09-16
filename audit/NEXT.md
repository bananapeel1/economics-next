# Next session brief

## Take packet 24 — `price-determination`, Economics 1.3.4 (Opus, NEW session)

Packets 19, 20 and 21 are built and held. **22 (`marketing-mix-strategy`) and 23 (`supply`) are already
claimed by other sessions** — check the ledger before assuming otherwise. The next free content packet is
**24, `price-determination`**: Economics Unit 1 (WEC11), IAL topic **1.3.4**, `econ_spec.txt:692-722`,
**11 leaves** (small — the smallest section in a while), 29 of 30 ledger items open, live at
**13 BLOCK / 42 DEBT / 91%**.

**Read first:** `PROGRESS.md`, `DECISIONS.md` (the last two entries are packet 21's and both apply to
every content packet from here), this file's packet 21 spec below, then `PROTOCOL.md`.
Then `node audit/scripts/ledger.mjs packet 24 --open`.

**The rule-2 pre-flight is already done for you, and it comes out the opposite way to packet 18's.**
Counts in `econ_spec.txt`: `equilibrium` **13** · `excess demand` **1** · `excess supply` **1** ·
`consumer surplus` **1** · `producer surplus` **3** · `price mechanism` **3** · `rationing` **1** ·
`signalling` **1** · `incidence` **2** · `indirect tax` **6**. Every one of those is this section's
own vocabulary and it must be taught in those words. **Packet 18 banned `equilibrium` outright** because
it is zero in `bus_spec.txt` — that ban was about the Business specification, not about the word.
**A term banned in one subject can be required in the other; check the file for the subject you are in.**
The ones to ban here are `deadweight loss` (**0**) and `market clearing` (**0**).

**Start from `scripts/packet-21-*.mjs`**, not 18's — it is the most recent and carries two checks the
earlier runners do not (see DECISIONS): the Appendix 6 gloss check, and a derived rather than typed
arithmetic spine. Copy both.

**Exit criteria:** staged bundle at 0 BLOCK / 0 new DEBT / 100% of 11 leaves · every block pinned to a
diagram, a quiz item and a practice item · practice on the ECONOMICS ladder only (Define 2 · Calculate
2/4 · Draw 4 · Explain 4 · Analyse 6 · Examine 8 · Discuss 14 · Evaluate 20, **no Assess, no 10-mark**) ·
Verify A clean · a 390×844 walk · Layer 6 with two planted canaries · PROGRESS row · commit · push.
**Do not publish**: the packet 5/7 checkpoint still holds, and six sections now wait on it.

### What packet 21 learned that packet 24 needs

1. **Derive, do not type, any figure a student could compute.** Packet 21 carried two price indices for
   the same three years, both called "the price index", and a student deflating GDP with the wrong one
   got a different answer from the section's own. Nominal GDP is now derived as real × index ÷ 100. See
   DECISIONS, 16 Sep. 1.3.4 has the same exposure: a tax incidence split, a surplus area and an
   equilibrium all fall out of one pair of schedules, and typing any of them twice will eventually type
   them differently.
2. **A gloss that cites Appendix 6 must say what Appendix 6 says.** Five `examMatters` and one practice
   guidance described Examine as setting out a relationship; the appendix says it requires *evaluation*
   and a brief assessment. **Packet 20 shipped the same error in the same command word on the same day.**
   `claim.uncited` cannot see it — the sentence has a citation. The runner check is in
   `packet-21-…mjs`; copy it. It caught four further glosses that cited the appendix and then said
   nothing it says. **Packet 23 found the same class again in two shapes that check cannot see** — an
   accurate citation with an extra requirement bolted on — and its `APPENDIX_CLAIMS` check is now in
   packet 21's runner too, A/B'd. **Carry both.** Three packets shipped this error independently on one
   day; the cause is reasoning about what a command word sounds like instead of reading its row.
3. **`reorder.source` reads a flow step's `title` and nothing else** (`lib/content-validator.mjs:347`).
   A flow whose words are in the `subtitle` is invisible to it, and the recall beside it counts as a
   sequence the section never taught.
4. **A diagram that declares `kind: "table"` must drop its checklist**, and a DRAWN diagram with a dense
   table bolted beside it trips `diagram.table-kind` whatever you do. Decide per diagram: reference
   table → declare it and drop the checklist; drawn diagram → move the table to the Notes.
5. **Check the whole `audit/raw/tariff-census.json` row, not the command word you expect.** 1.3.4's
   `Draw` (4 marks) is "construct an accurately labelled diagram" and this topic is the one that most
   needs it — tax incidence, surplus areas and shifts are all drawn answers.

### Two things that are NOT packet 24's to fix

- **`FREE_QUIZ_MAX = 10` now binds — and the number is not the fix.** Packet 21's section has ten
  chapters, and `freeQuizPayload()` spends 2 on the Quiz tab *before* taking one pin per chapter
  (`lib/preview-limits.js:65-66`), so **chapters 9 and 10 show a signed-out student no quiz**. A Pro
  student gets all 43 and every pin resolves. Packet 20 escalated the adjacent problem (the pre-test
  padding its pool from reserved items). Measured, not argued: run `sectionPayload()` over a staged
  bundle with `isPremium` both ways.

  **The obvious answer — raise the cap to 12 — is not the best one, and this is measured too.** The two
  items spent on the tab before any pin are a design choice, not a constraint (the point is packet 2.1's
  session's). Take one pin per chapter FIRST and let the tab render the first two of whatever is already
  in the payload, and on packet 21's own bundle:

  | | items sent | chapters with a quiz | tab shows | pins resolve |
  |---|---|---|---|---|
  | shipping: tab first | 10 | **8 of 10** | 2 | yes |
  | pins first, tab reuses | 10 | **10 of 10** | 2 | yes |

  Same cap, same number of items exposed, two chapters bought back for nothing. The one trade is which
  overlap the tab's preview has: today it duplicates the pre-test, afterwards it would duplicate a
  check-in. Packet 20 has already escalated that the pre-test overlaps chapter 1's check-in, so this
  changes which duplication exists rather than whether one does. **Put both options to the founder, not
  just the number.** Still his call; still nothing a content packet may change.
- **`diagram.table-kind` is absent from `audit/validator-baseline.json` entirely** (0 of its 2,432 keys),
  because the baseline was written 2026-09-15 and the rule landed after it in `77eb765`. All 15 of its
  live findings repo-wide therefore read as "new", including one on `measures-economic-performance`'s
  untouched live content. It is not a regression and `npm run validate` still exits 0. **Do not
  re-baseline to silence it** — with three sessions staging concurrently, `--baseline --confirm` would
  adopt everyone else's in-flight findings as accepted debt (the packet 3.1 trap).


## Packet 23 spec — `supply`, Economics 1.3.3 (Opus 5, 16 September 2026) — IN PROGRESS, CLAIMED

**Section:** `supply`, Economics Unit 1 (WEC11), IAL topic **1.3.3 Supply**, `audit/raw/econ_spec.txt:656-687`.
**22 rows off the span, 19 of them LEAVES.** 30 section opens. **25 open ledger items.**
Live state: **12 BLOCK / 35 DEBT / 95% coverage**, 8 subsections in 3 blocks, 25 quiz, 5 practice,
18 flashcards, 3 diagrams.

IAL **Economics** ladder, from `audit/raw/tariff-census.json` (Appendix 6): Define 2 · Calculate 2/4 ·
**Draw 4** · Explain 4 · Analyse 6 · Examine 8 · Discuss 14 · Evaluate 20. **There is no Assess, no
Outline and no 10-mark item in Economics.**

### Rule 2 pre-flight: what this section may not say

Word-boundary counts over the whole Economics specification, run before a word was written:

| term | in `econ_spec.txt` | verdict |
|---|---|---|
| `momentary` | **0** | `topFix-02`'s prescribed frame for the new block |
| `joint supply` · `competitive supply` | **0 / 0** | `specGap-03`, `topFix-05`, `structure-08`'s prescribed additions; `joint` hits twice, both *joint ventures* (:1254, :1957) |
| `producer expectations` · `weather` · `climate` | **0 / 0 / 0** | the rest of `specGap-03`'s "common Edexcel extensions" |
| `KAA` · `levels descriptor` | **0 / 0** | `topFix-05` and `practice-02`'s prescribed guidance format |
| `returns to scale` | **0** | block 2's organising frame — absent from IAL *entirely*, not merely from Unit 1 |
| `marginal product` · `diminishing returns` · `marginal cost` | 2 (:1305, :1316) · 1 (:1306) · 2 (:1316) | all inside the **Unit 3** costs span, `terms.later-unit` for a WEC11 section |
| `economies of scale` | 6, first at :1321 | Unit 3 (3.3.2) |
| `producer surplus` | 3, all at **:703-706** | IAL **1.3.4 · 2a** — `price-determination` owns it |
| `natural disaster` | 1, at **:668** | IS the spec's own shock term (1c-5) — this is what gets taught |
| `capacity` · `legal constraint` · `perishab` · `mobility of factors` | **1 each**, :680-683 | the 2c bullets and nowhere else: the spec NAMES them and never explains them |
| `equilibrium` | 13, none in 1.3.3 | 1.3.4's subject, not this section's |

**Sixth instance of the packet 13/16/17/18/22 rule.** The March section explains the upward slope by
"increasing **marginal costs** of production" — Unit 3 vocabulary (`:1316`) in a Unit 1 section. IAL
1.3.3 · 1a gives no mechanism for the slope at all, so the mechanism is taught in the spec's own
**"costs of production"** (1c-1): producing more draws in resources that cost more per unit, so a
higher price is needed to make the extra output worth supplying.

### Eight of twenty-five scope claims are wrong (the rate holds: 4·4·6·5·6·8)

1. **`topFix-02` is REFUTED in its prescribed form.** It asks for a "momentary / short run / long run"
   block. `momentary` is 0 in the specification — and the phrase is already live, in this section's
   own second common-mistake. The spec's frame is **2d** ("the distinction between the short run and
   long run in economics and its significance for price elasticity of supply") and **2c-1** ("the time
   period"). Its *delete* clause is right and is built: block 2 goes.
2. **`specGap-03` is REFUTED.** It concedes the spec list is already covered and asks to add joint and
   competitive supply, producer expectations and weather. All four are 0 in the specification. The
   section does not learn them; **Q20, which tests joint supply, is deleted instead** — the finding
   read a quiz item testing off-spec content as evidence that the content was missing.
3. **`structure-08`'s second half goes with it.** Its first half is right: block 1's takeaway 3 drops
   the spec's own `natural disasters` (1c-5), which is restored.
4. **`topFix-05`'s duplicate pairs are wrong — all three of them.** Q1/Q10, Q4/Q16 and Q6/Q12 were
   checked by token overlap over question *and* options: they test shift-vs-movement, perfectly
   inelastic supply and PES determinants respectively, and share nothing but the word "supply". The
   genuine near-duplicates are **Q9/Q12** (both: a subsidy shifts supply right) and **Q13/Q19** (both:
   a productivity or technology gain shifts supply right). The real ones are fixed. Third instance of
   packet 3.1's lesson that rule 1 applies to a finding's *arithmetic*, not only to its scope.
5. **`topFix-05`'s "10- and 20-mark practice guidance" cannot exist.** Economics has **no 10-mark
   tariff and no Assess**; P2 is "Assess … (10 marks)" and is invalid twice over. It is re-tariffed to
   **Examine (8)**, not rewritten. `KAA` is a UK GCE mark-scheme abbreviation, 0 in the specification;
   guidance above 6 marks is written to the command word's own Appendix 6 description instead.
6. **`specGap-01` is half wrong.** "No quiz or practice item with raw figures" — **Q16 is exactly
   that** ($10→$12, 200→230, PES 0.75, correct). A student never sees it because of the wiring
   (`structure-01`), so the defect is the pin, not the absence. The worked calculation in the body,
   which the finding also asks for, is genuinely missing and is built.
7. **`specGap-04` belongs to packet 24 and is REASSIGNED.** A supply shift's effect on equilibrium
   price and quantity is **1.3.4 · 1b** (`:697-698`); 1.3.3 has no equilibrium leaf. The finding says
   so itself ("strictly 1.3.4") and then asks this section to build it because *this section's own
   examMatters* demands it. The circularity is the bug: the examMatters sentences are removed, and
   `price-determination` keeps the leaf. Fourth instance of packet 19's wrong-SECTION sub-class.
8. **`structure-09`'s first half is the same claim** and is reassigned with it; its second half (no
   worked PES calculation anywhere) is true and is built.

**`specGap-05` is CONFIRMED and stays here**, against its own hedging ("Exact IAL bullet numbering …
unsure"). **1c-3 is "indirect taxes (specific and ad valorem)"** and 1c-4 is "government subsidies" —
both are shift factors of *this* topic, so the vertical shift by a specific tax and the pivot for an
ad valorem tax are taught here. **The incidence** — who actually bears the tax — is 1.3.4 · 4b and
stays out.

### What gets built

Five blocks in the specification's own order, one subsection per idea:

| # | Block | Spec leaves |
|---|---|---|
| 1 | The Supply Curve | 1a, 1b |
| 2 | What Shifts Supply | 1c-1 … 1c-5 |
| 3 | Price Elasticity of Supply | 2a, 2b-1 … 2b-5 |
| 4 | What Determines PES | 2c-1 … 2c-5 |
| 5 | The Short Run and the Long Run | 2d |

- **8 subsections → 24**, plus five check-ins. Block 2 (Unit 3 costs) is deleted outright; its two
  subsections are replaced by the spec's five shift factors and the SR/LR block the spec actually asks
  for, which is about **elasticity** and never mentions returns to scale.
- **3 diagrams → 5**, one per block, each pinned from the BLOCK's `diagramId`. All five are NEW: none of the nine
  scenario SVGs matches a pre-packet one, and the two old PES diagrams were top-level `svg` fields
  rather than scenario sets. *(This line first said the two PES diagrams were "kept and pinned".
  They were rebuilt from the supply functions. Verify A caught it.)* The grid gets the 560-unit frame and the 0.65em width guard.
- **One arithmetic spine, and it is TWO functions, not one.** Kavira Ceramics' own two points fix a
  short-run curve `Qs = 30P + 160` and a long-run curve `Qs = 120P − 560`, both through (400 tiles,
  $8), derived in `_packet23-util.mjs` from the figures rather than asserted. Every PES value, every
  plotted curve and the worked calculation are generated from them, and the runner re-derives each
  from the emitted SVG. *(This line first said `Qs = 30P − 60` — a placeholder written before the
  section was built, which survived into the brief. Verify A caught it.)*
- **Practice 5 → 8**, every command word and tariff checked against the Economics census. **`Draw` (4)
  — "construct an accurately labelled diagram" — has never been used in this programme** and is what
  1b and 1c are asking for; this is the Economics counterpart of packet 18's `Construct` finding.
- **12 `fillin.hint` violations → 0**: word banks with distractors, no first-letter hints.
- Quiz stays at 25: Q14 (producer surplus, 1.3.4), Q20 (joint supply, off-spec) and Q21 (P = MC, Unit
  3, and its explanation marks a wrong answer) are deleted, Q9/Q12 and Q13/Q19 are de-duplicated, and
  the replacements are PES calculation from raw figures, the five PES values, perishability, legal
  constraints and SR/LR elasticity.

### Ledger

**Closes 23:** topFix-01, topFix-02, topFix-03, topFix-04, topFix-05, accuracy-01, accuracy-02,
practice-01, practice-02, structure-01 … structure-08, specGap-01, specGap-02, specGap-03, specGap-05,
specThin-01, specThin-02. (`specGap-03`, `structure-08` and the three topFix items close on the
refutation plus the part of each that survives it — each clause is named in the runner.)

**Reassigned to packet 24 (`price-determination`):** `C-supply-specGap-04`, `C-supply-structure-09`.

### Verify B — 390×844, signed out, storage cleared, `?draft=1`

Walked on the dev server on 3001 (borrowed from another session; it serves the same database, so the
draft resolves). **29 steps** (24 teach + 5 check-in), exactly the number the spec block predicted.

- **Every one of the 24 teach steps carries exactly one recall, and all 24 prompts are distinct.**
  That closes `structure-04` by observation rather than by reasoning: its complaint was that under the
  old pairing model a lone third subsection made its recall appear twice back to back while the last
  one never appeared at all. One subsection is one step, so neither can happen.
- **All five check-ins render a diagram** (steps 5, 12, 18, 24, 29) — `structure-02` and `topFix-01`.
  The March section pinned one diagram and left the two carrying the whole PES half unreachable.
- **The two `kind: 'table'` diagrams behave as declared.** Step 18 (a drawn diagram) shows the "WHAT A
  CORRECT DIAGRAM SHOWS" checklist header; steps 24 and 29 (the determinants grid and the two-horizon
  grid) do not, which is what `kind: 'table'` is for — nobody reproduces a lookup table in an exam.
- `document.documentElement.scrollWidth` is **390 at every step**: no horizontal overflow.
- Chapter boundaries land where the blocks do — `part 1 of 4`, `1 of 6`, `1 of 5`, `1 of 5`, `1 of 4`.
- **The last step is the last step.** At step 29 there is no Next control and the counter does not
  advance; a second walk that resumed from a saved pointer came back to 29 rather than past it.
- No console error, no empty body, no step that failed to render.

Two things seen in passing, neither owned by a ledger id and neither a defect in this packet:

- **`?draft=1` is less of a preview than it looks.** On the topic route the DEFAULT tab is Notes, and
  Notes is shipped server-side from LIVE content, so a draft preview opens showing the OLD section and
  only switches to the draft when the Learn tab is clicked and `StudyApp`'s fetch effect re-runs. This
  is the same shape as packet 19's note that the overview card is not draft-aware, one step further
  out, and it is dev-only — but it will mislead the next walkthrough exactly as it misled this one.
- **V005's free quiz slice verified itself again.** Signed out, `/api/sections/supply?draft=1` returns
  **7 quiz items** out of the 26 authored — the Quiz tab's 2 plus the first pinned item of each of the
  five chapters, with the pins remapped. More evidence for the verifier pass V005 is still waiting on.

### Acceptance checks a verifier can run without this conversation

1. `node scripts/packet-23-supply.mjs` — dry run exits 0: no Unit 3 vocabulary, no off-spec term from
   the table above, no uncited examiner claim, no marker claim, no paper-frequency claim, every
   practice tariff in the **Economics** census, every block pinned to a quiz item, a practice item and
   a diagram, every diagram figure re-derived from the emitted SVG, ids unique.
2. `node audit/scripts/validate-content.mjs --section supply` — **0 BLOCK, 0 new DEBT, 100% coverage
   (19 of 19 leaves)**.
3. `grep -c` over the staged bundle for `momentary`, `returns to scale`, `marginal cost`, `joint
   supply`, `producer surplus`, `KAA` — **0 each**.
4. **Verify B at 390×844 with `?draft=1`:** open `supply`, walk all 29 steps. Every check-in shows a
   diagram; the PES grid's cells do not collide; the worked PES calculation is legible; no step is
   blank; no recall shows a first-letter hint.

## Next up — packet 24, `price-determination` (28 opens)

Packet 23 (`supply`) is claimed by a concurrent session; **24 is the first row in `PROGRESS.md` that
still says `not started`** — check it before starting anything, because with three or four sessions
running the "next" packet is whichever row is still free, and say in NEXT.md that you have taken it
before you write a line of it.

**Four things packet 22 learned that the next Business section needs:**

1. **Check the topic NUMBER before anything else.** Three of packet 22's findings, and one that asked
   for the section to be reordered into another syllabus's sequence, all rested on the ledger citing
   UK GCE Theme 1 numbers. Every IAL topic number has 3 as its middle digit. If a finding cites
   `1.3.1`-`1.3.5` as five separate topics of one section, it is reading the UK GCE spec.
2. **Grep the section's own central vocabulary before writing a word** — fifth instance, and the first
   with a new shape. Where the specification sets an **open requirement** (a leaf with no bullets under
   it, like "Types of promotion."), the textbook taxonomy for it is usually absent from the spec
   entirely: teach the mechanism in the specification's words and name the labels once, unassessed.
   Where the specification names a **TOOL** (the product life cycle, the Boston Matrix), teach the
   tool's own parts in full even though they are also absent. Those are opposite calls and the
   difference is whether the spec named the thing or named a category.
3. **A diagram can pass every check and still print two labels on top of each other.** The runner's
   text-collision guard (`scripts/packet-22-marketing-mix-strategy.mjs`) is worth copying: it found
   one overlap the 390px walk had already caught and thirteen the walk had not reached. Three-column
   grids want packet 19's column positions, `[26, 260, 440]` on a 560-unit frame.
4. **`terms.later-unit` is fixed (V012)** — it no longer flags a phrase Units 1-2 teach in their own
   requirement wording. Four baselined keys across the repo are now stale and will disappear at the
   next re-baseline.

**Do NOT re-baseline while other sessions are mid-packet.** At packet 22's gate, three sections had
new debt in flight from concurrent work; `--baseline --confirm` would have banked it.

## Packet 22 spec — `marketing-mix-strategy`, Business 1.3.3 (Opus, 16 September 2026) — IN PROGRESS

**Section:** `marketing-mix-strategy`, Business Unit 1 (WBS11), IAL topic **1.3.3 Marketing mix and
strategy**, `audit/raw/bus_spec.txt:596-670`. **57 rows off the span, of which 46 are LEAVES** — the
largest section in the programme so far (packet 17's 1.3.2 had 39). 32 section opens. **33 open ledger
items.** Live state: **24 BLOCK / 64 DEBT / 89% coverage**.

IAL **Business Unit 1** ladder, from `audit/raw/tariff-census.json` (Appendix 6, `bus_spec.txt:2220-2251`):
Define 2 · Calculate 4 · Construct 4 · Explain 4 · Analyse 6 · Discuss 8 · **Assess 10** · Evaluate 20.
**There is no Outline and no Examine in Business.**

### The numbering trap, which three findings are built on

**`1.3.3` IS the IAL topic number and title** (`bus_spec.txt:596`, "1.3.3 Marketing mix and strategy"),
and the app already carries both. The ledger's sub-numbers — "1.3.1 Product/service design", "1.3.2
Types of branding", "1.3.3 Pricing strategies", "1.3.4 Distribution", "1.3.5 Marketing strategy" — are
**UK GCE Theme 1**. In IAL they are sub-topics **2, 3, 4, 5 and 1 of topic 1.3.3 itself**. Consequences:

- **`structure-04` is REFUTED.** Both of its remedies — rename to "1.3 Marketing mix and strategy", or
  split into five sections — would replace a correct IAL label with a UK GCE one. Third instance of
  this shape (packet 15 `structure-11`, packet 19 `specGap-01`). No change.
- **`structure-05` is REFUTED in its prescribed form.** Its proposed order (design → promotion →
  pricing → distribution → strategy) is the UK GCE order. The IAL order is **1 objectives and strategy
  → 2 design → 3 promotion and branding → 4 pricing → 5 distribution**, which is the order the March
  section already had. Obeying this finding would have reordered a correct section into another
  syllabus's sequence. Its real complaint — an untethered "4Ps" intro that names the mix and then
  teaches its four elements three blocks later with no link — is built instead.
- **`topFix-05`'s last clause** ("Rename the section '1.3 …' or split to match 1.3.1-1.3.5") is the same
  claim and is refused. Its four spec-gap clauses are built.
- **`structure-06` is half wrong.** "Marketing Objectives is not an IAL 1.3 spec item" — **1a IS
  "Marketing objectives"**, with three named bullets. What is off-spec is **SMART**: 0 occurrences in
  `bus_spec.txt`. The block stays and SMART goes. Its real point — that this is step 0, the most
  expensive real estate in the section — is answered by making step 0 short and concrete.

### Rule 2 pre-flight: what this section may not say

Word-boundary counts over the whole Business specification, run before a word was written:

| term | in `bus_spec.txt` | verdict |
|---|---|---|
| `above the line` / `below the line` / `ATL` / `BTL` | **0 / 0 / 0 / 0** | the March promotion block's organising frame |
| `public relations` · `sales promotion` · `personal selling` · `direct marketing` | **0 each** | `specGap-04`'s prescribed additions |
| `individual brand` · `family brand` · `corporate brand` · `own brand` · `manufacturer brand` | **0 each** | `specGap-01`/`structure-09`'s prescribed taxonomy |
| `intensive` / `selective` / `exclusive` distribution | **1 (of *production*, :983) / 0 / 0** | `quiz-01` is right; the taxonomy is off-spec |
| `SMART` | **0** | `structure-06` |
| `rational` | **0** (Economics 1.3.2·1, `econ_spec.txt:580`) | `specGap-10`'s parenthetical |
| `disintermediation` · `e-commerce` · `multi-channel` · `direct distribution` | **0 each** | March block 5 takeaways |
| `state of the economy` as a pricing factor | **0** | `accuracy-02` |
| `Ansoff` | 2, both **Units 3 and 4** (:1098, :1435) | `terms.later-unit` — must not appear |

**Fifth instance of the packet 13/16/17/18 rule.** `topFix-02` asks for an **"ATL/BTL sort"** classify
exercise; that clause is **refused** and the same exercise is built on the spec's own promotion
vocabulary. `specGap-04` asks to add **public relations** to the ATL/BTL list: public relations is not
in the specification, and **sponsorship is — but as 3d-3, a way to *build a brand*, not a type of
promotion**. The finding is built where the spec puts it.

### Where the spec names a tool but not its parts — a different call, made deliberately

3a "Types of promotion" and 3b "Types of branding" are leaves with **no bullets at all**, so the spec
supplies no taxonomy. ATL/BTL and individual/family/corporate are one textbook's answers to an open
requirement, and they are taught here as **mechanisms in plain English**, with the common labels named
once as an aside and **never assessed** — packet 16's "barriers to entry" treatment exactly.

**The product life cycle (1b) and the Boston Matrix (1c) are the opposite case and are treated
differently.** `maturity`, `decline`, `saturation`, `star`, `cash cow`, `question mark` and `dog` are
all **0** in `bus_spec.txt` — but 1b and 1c name *the tools themselves* as requirements, and a named
tool cannot be examined without its own parts. Their stage and quadrant names are taught in full. The
distinction is: **the spec names the tool (teach its labels) versus the spec names an open category
(teach the mechanism in the spec's words).**

### The other claims checked against the spec

- **`accuracy-02` is correct and important.** The spec's 4b list is exactly six (`:653-660`): number of
  USPs/amount of differentiation · price elasticity of demand · **level** of competition in the business
  environment · strength of brand · **stage in the product life cycle** · costs and the need to make a
  profit. The March list omitted USPs and PLC stage and invented "state of the economy".
- **`specGap-11` resolves in the spec's favour.** Its "unsure" is settled at `:665-668`: the words are
  **four stage · three stage · two stage**. The March "zero-level/one-level/two-level" is off-spec.
- **`specGap-10` is half refuted.** 1f is "Consumer behaviour – how businesses develop customer
  loyalty"; the em-dash makes loyalty the content of the requirement. Its parenthetical asks for
  "rational vs emotional decision-making", which is **Economics 1.3.2·1** and packet 17's material.
- **`specGap-08` is half refuted.** 5b is "Changes in distribution methods." with no list; "changing
  from product to service" is UK GCE wording. The leaf is built in plain English, with subscription and
  streaming as illustration rather than as named requirements.
- **`topFix-03`'s "wire them via `diagramRef`" is obsolete.** Since packet 5 a diagram reaches a student
  only from a **block's `diagramId`, at that chapter's check-in** (`lib/learn-steps.js:44-55`).
- **`structure-02`'s premise is stale.** "practice sorted by marks ascending" was fixed by packet 2;
  `practiceIndices` resolve against the RAW array (`LearnModeTab.jsx:193-194`). Its real complaint —
  three of five practice items never surfaced — stands and is fixed by correct pins.
- **`structure-07`'s premise is dead.** The 2-per-step pairing it describes was removed by packet 5. Its
  real complaint — a recall that copies a flow visible on the same step — stands and is fixed.
- **`topFix-04`'s "KAA levels" is refused**: `KAA` is 0 occurrences. Guidance above 6 marks is written
  from Appendix 6's own description of the command word, which is citable.
- **`structure-10` is a no-change observation** ("Misconceptions are genuinely good … Not filler"). The
  substance of the fifteen is carried into the rewrite rather than discarded.

**Eleven of thirty-three scope claims wrong, plus two stale premises and one obsolete mechanic** — the
highest rate in the programme (4 in packet 14, 4 in 15, 6 in 16, 5 in 17, 6 in 18, 8 in 19).

### One spine of arithmetic

Packet 17's rule. **Zola**, a maker of a reusable steel bottle, unit cost **$8**, in a market of
**500,000 bottles a year**. Two demand lines that cross at today's price, so branding is a *pivot*:

    unbranded   Q = 160,000 − 5,000P            branded   Q = 120,000 − 3,000P

Both pass through **($20, 60,000)**. On a linear line the percentage-method PED depends only on the
price you start from, so no worked value can be contradicted by a reader who picks a different second
price (packet 18's property, re-used deliberately).

| P | Q (unbranded) | share | revenue | profit | PED |
|---|---|---|---|---|---|
| $12 | 100,000 | 20% | $1,200,000 | $400,000 | −0.6 |
| $16 | 80,000 | 16% | **$1,280,000** | $640,000 | −1.0 |
| $20 | 60,000 | 12% | $1,200,000 | **$720,000** | −1.67 |
| $24 | 40,000 | 8% | $960,000 | $640,000 | −3.0 |

This carries the section:

- **1a-1 market share, 1a-2 revenue, 1a-3 building a brand are three different prices.** Share is
  largest at the lowest price, revenue peaks at **$16**, profit peaks at **$20** — so the three
  objectives pull apart, with exact figures. That is `specThin-01`'s fix: "increase revenue" stops
  being a phrase and becomes a number that behaves differently from market share.
- **3c's three benefits are one pivot seen three times.** On the branded line PED at $20 is **−1.00**
  against **−1.67** (3c-3, reduced PED), and the profit-maximising price moves from **$20 to $24**
  (3c-2, premium prices) where profit is **$768,000** against $640,000 on the unbranded line at the
  same price. Added value at $20 is **$12** a bottle (3c-1).
- **4a-1 cost plus** on the same $8: a 50% mark-up gives **$12**, 100% gives **$16**, 150% gives
  **$20** — the three prices the objectives block already used. **4a-2 skimming** launches at $24 and
  falls to $20; **4a-3 penetration** launches at $12 and rises. **4a-6 psychological** is $19.99.
- **5a's three channels**, every figure exact: two stage $20 direct, Zola keeps **$12**; three stage
  Zola → retailer at $12, retailer +60% → **$19.20**, Zola keeps **$4**; four stage Zola → wholesaler
  at $10, +20% → $12, retailer +60% → **$19.20**, Zola keeps **$2**. The same shelf price down two
  channels, and the difference is the producer's share of it.

Zola is fictional and given no country (packet 16's Zuri, 17's Tafari, 18's Maji). One currency: dollars.

### Shape — seven blocks, the specification's own order, 33 subsections

| # | Block | Subsections | Leaves |
|---|---|---|---|
| 1 | Marketing Objectives and the Marketing Mix | What a Marketing Objective Is · Increasing Market Share · Increasing Revenue · Building a Brand · The Marketing Mix | 1a (3), 1d |
| 2 | The Product Life Cycle and the Portfolio | The Stages · Extension Strategies · The Boston Matrix · Managing the Portfolio | 1b, 1c |
| 3 | Marketing Strategy and the Customer | Mass Markets · Niche Markets · B2B and B2C · Developing Customer Loyalty | 1e (4), 1f |
| 4 | Product and Service Design | The Design Mix · Designing for Resource Depletion · Ethical Sourcing | 2a (3), 2b (2) |
| 5 | Promotion and Branding | Types of Promotion · Types of Branding · The Benefits of Strong Branding · USPs and Differentiation · Advertising, Sponsorship and Social Media · Changes to Reflect Social Trends | 3a, 3b, 3c (3), 3d (4), 3e (3) |
| 6 | Pricing Strategies | Cost Plus · Skimming and Penetration · Predatory and Competitive · Psychological · Choosing a Strategy I · Choosing a Strategy II · Online Sales and Price Comparison Sites | 4a (6), 4b (6), 4c (2) |
| 7 | Distribution | What a Channel Is, and Four Stage · Three Stage and Two Stage · Matching the Channel to the Product · Changes in Distribution Methods | 5a (3), 5b |

Block sizes **5 · 4 · 4 · 3 · 6 · 7 · 4**, deliberately uneven (`structure-03`/`structure-11`). Seven
diagrams, one per check-in, every one pinned by `diagramId`: the mix as a grid · the PLC curve with its
extension bump · a market-types grid · the design-mix triangle · the branding pivot (two demand lines) ·
the pricing-strategy grid with the cost-plus arithmetic · the channel ladder.

### Layer 6 — adversarial review on a canary copy (Sonnet, 16 September)

**Both planted canaries caught**, plus **three real findings, all fixed**:

1. **A Note said the unbranded line "sells 40,000 bottles for $640,000".** $640,000 is the PROFIT;
   the revenue is $960,000, which the same packet's own objectives table prints. Conflating the two
   in a section that teaches students to separate them is the worst place for it. Both figures are
   now named, and labelled.
2. **A common mistake read "costs −8,000 fewer bottles".** `units(qU(24) - qB(24))` subtracted the
   two the wrong way round, and JavaScript prints a negative with an ASCII hyphen, so it arrived as a
   double negative saying the opposite of what was meant. **Fixed as a class, not an instance:** the
   runner now refuses an ASCII hyphen before a digit anywhere in prose, because every negative a
   student reads is supposed to go through `minus()`/`el()` and come out as U+2212 (packet 18's rule,
   now a check). SVG source is excluded — `rotate(-90,…)` is a coordinate, not a figure.
3. **The customer-loyalty reorder had a defensible second order.** It ran "product works → a problem
   is put right → the buyer is recognised → leaving costs something", and a student can fairly argue
   that recognition precedes recovery, since not every buyer ever has a problem. Re-framed as one
   customer's journey, where each step is impossible before the one above it: until the buyer
   returns there is no history to recognise, and a switching cost accumulates only after several
   returns. Packet 17's rule — a reorder with two defensible orders is not a reorder.

The review independently re-derived every figure in the section from the two demand functions, the
unit cost and the mark-up chains, and found no other arithmetic error; and it grepped
`bus_spec.txt` itself for every off-spec term rather than taking the runner's word for it.

### Verify B — student walkthrough, 390x844, signed out, `?draft=1` (16 September)

Walked on the dev server another session had on port 3001 (Next refuses a second `next dev` from one
directory; it serves the same database, so the draft flag works from it). Storage cleared first.

- **40 steps, all reachable**: 33 teaching steps and 7 chapter check-ins, at steps 6, 11, 16, 20, 27,
  35 and 40. Chapter and part counters correct throughout ("CHAPTER 1 OF 7", "part 1 of 5").
- **Every one of the 7 check-ins resolved its diagram AND its quiz item.** Read in full at step 6: the
  diagram with both views and its labels, "Tap to enlarge", the pinned quiz with four options, the
  pinned practice item as a WORKED EXAMPLE at the right tariff ("Define the term 'marketing
  objective'. · 2 marks"), and the four chapter takeaways. Practice, quiz and diagram pins therefore
  all resolve at the step they were pinned to — `topFix-01`, `structure-01` and `structure-02`.
- **The pre-test offered "Three questions"** and served the three unpinned items, not a chapter's.
- **No horizontal scroll on any of the 40 steps** at a 375px viewport (`scrollWidth === clientWidth`
  on every step). This is the check packet 15's `nowrap` overflow needs: 9 classify recalls here carry
  items well over the 45 characters that triggered it.
- **Topic complete at step 40**, 100% strength, and the completion screen lists all seven chapters.
- **No JavaScript errors.** The only network failures were `POST /api/learn-mode/state` 401, which is
  the signed-out state endpoint behaving correctly, and aborted `/api/events` beacons, which are an
  artefact of the automated walk clicking faster than the beacons could flush.
- The overview card reads "Learn 40 steps · Notes 7 topics · Practice 8 questions · Flashcards 42
  cards" — the draft's own counts.

**Noted, not fixed, and not this packet's:** the check-in header says "Before the next chapter" on
chapter 7 as well, which is `V006` (`components/LearnModeTab.jsx:429`, every section, packet 57).

### Exit criteria

0 BLOCK, 0 new DEBT, 100% coverage of 46 leaves · every block pinned to a diagram, a quiz item and a
practice item · exactly three quiz items unpinned and FIRST in the array · all eight Business command
words used at their census tariffs · `npm test`, `npm run build`, `npm run validate` green · Verify A
on all 33 ids · Verify B at 390×844 with `?draft=1` · Layer 6 with two planted canaries.

**STAGED, NOT PUBLISHED** — the recalls are written to the packet-7 contract and main's `ReorderRecall`
reads `recall.shuffled` (DECISIONS 2026-09-15).

## Packet 21 spec — `measures-economic-performance`, Economics 2.3.1 (Opus, 16 September 2026)

**Section:** `measures-economic-performance`, Economics Unit 2 (WEC12), IAL topic **2.3.1 Measures of
economic performance**, `audit/raw/econ_spec.txt:884-974`. **55 rows off the span, of which 48 are LEAVES**
(the other 7 are the requirement rows that head a bullet list: `1c`, `1i`, `2e`, `2f`, `2g`, `3b`, `3c`).
48 is the number `spec.coverage` measures against and it is **twice the size of any section built so far**
(packets 17 and 18 were 24 leaves each). **35 open ledger items.**

**The worst validator numbers in the repository: 56 BLOCK / 89 DEBT / 88% coverage.** All 145 are
baselined, so the gate passes today while the section is in this state.

Economics ladder, from `audit/raw/tariff-census.json` (`econ_spec.txt:2704-2747`):
Define 2 · Calculate 2/4 · Draw 4 · Explain 4 · Analyse 6 · Examine 8 · Discuss 14 · Evaluate 20.
**There is no `Assess` and no 10-mark tariff in this subject.** The live section uses both.

### What the specification settled before a word was written

**1. The headline finding is not in the audit: a quarter of the section teaches material that is not in
topic 2.3.1, and one whole block is not in the Economics specification at all.** Word-boundary counts
over `econ_spec.txt`:

| term | occurrences | where |
|---|---|---|
| `expenditure method` / `income method` / `output method` | **0 · 0 · 0** | — |
| `value added` / `gross value added` | **0 · 0** | — |
| `RPI` / `Retail Price` | **0 · 0** | — |
| `CPIH` | **0** | — |
| `substitution bias` | **0** | — |
| `liquidity trap` | **0** | — |
| `interconnectedness` | **0** | — |
| `fiscal drag` | **0** | — |
| `HDI` | 2 | **4.3.6**, Unit 4 development (`:1904-1907`) |
| `quantitative easing` | 1 | **4.3.3**, Unit 4 (`:1725`) |
| `capital account` / `financial account` | 0 / 2 | **4.3.3**, Unit 4 (`:1715`, `:1742`) |
| `Phillips` | 1 | **2.3.6**, another Unit 2 section (`:1143`) |
| `output gap` | 4 | **2.3.5**, another Unit 2 section (`:1121-1125`) |

`GDP` occurs in the whole specification at exactly seven lines — `:888`, `:892`, `:896`, `:899`, `:904`
(all inside 2.3.1 sub-topic 1) and two Unit 4 lines. **Nothing anywhere requires a student to know how
GDP is measured.** 2.3.4 National income (`:1056-1085`) asks for the circular flow, injections and
withdrawals, equilibrium and the multiplier — not the three approaches either. `C + I + G + (X−M)` is
2.3.2's *components of aggregate demand* (`:983`), which belongs to the `aggregate-demand` section.

So live **block 1, "Three Methods of Measuring GDP" — three of the section's 24 subsections — is UK GCE
Economics A material end to end**, and so are the HDI subsection (block 2), the "RPI vs CPI" subsection
(block 3) and the liquidity-trap/QE subsection (block 5). **Six of 24 live subsections, 25% of the
section, are outside topic 2.3.1.** This is the fifth instance of the packet 13/16/17/18 rule and the
validator cannot see any of it: `terms.off-spec` carries six named phrases and none of these is one of
them, `terms.later-unit` fires on `exchange rates` alone, and lexical coverage scores the section 88%
while a quarter of it teaches another syllabus.

**2. `specGap-11`'s "unsure" is answered: the specification names none of the three.** RPI 0, CPIH 0 in
the entire document; HDI only at 4.3.6, a Unit 4 topic. All three come out rather than being corrected,
which moots most of `topFix-05` and all of `quiz-01`'s factual half.

**3. `practice-02` is refuted on all three of its claims, and its remedy would delete the only
correctly-tariffed item in the section.** It asserts "WEC12 (Unit 2) papers have no 20-mark essay; the
top tariff is 14 ('Discuss') with 12 'Assess'". Two independent citations say otherwise —
`econ_spec.txt:379-399` and `:1989-2001`, the Unit 2 assessment overview: **Section D is one 20-mark
essay question from a choice of two.** There is no `Assess` command in IAL Economics and no 12-mark
tariff. `p3` (`Evaluate … (20 marks)`) is the one practice item whose command and tariff are already
right; `topFix-04` repeats the same instruction to convert it to a 14-mark `Discuss`. **Both clauses are
refused.** The live errors are the other four items: `p0` Define **(4)** → 2, `p1` Explain **(6)** → 4,
`p2` **Assess (10)** → not a command in this subject at any tariff, `p4` **Outline (4)** → not a command
in this subject.

**4. `topFix-04`'s marking clause is refused, as packet 20's was.** "Rewrite the 10/14-mark schemes as
levels (KAA + Evaluation)" describes what a marker does, which `MARK_CLAIM` bans in anything a student
reads. The validator's `practice.levels` rule (`lib/content-validator.mjs:553`) only forbids a guidance
field above 6 marks from allocating points `(n marks)` — it does not ask for marking to be described.
Guidance says what the **command word requires**, citing Appendix 6; the assessment objectives at
`:2037-2046` are citable if a chain of reasoning needs naming.

**5. Sixteen `claim.uncited` BLOCK findings are all one sentence shape** — "Examiners expect…",
"Examiners reward…", "Examiners want you to…". Every one goes.

**6. `topFix-01`'s index lists and `diagramRef` instruction are obsolete.** The lists
(`block2 → [12,18,21,23]` …) are keyed to the 8-block structure being replaced, and since packet 5 a
diagram reaches a student only from a **block's `diagramId`, at that chapter's check-in**
(`lib/learn-steps.js:44-55`). Its real complaint — nothing resolves — is answered by
`diagramId`/`quizIndices`/`practiceIndices` on every block. `practiceIndices` resolve against the RAW
array (`LearnModeTab.jsx:193-194`).

**7. `structure-04`'s premise is dead.** 2-per-step pairing was removed by packet 5; one subsection is
one step. Its real complaint — every block exactly 3 subsections, 8 recalls shown twice back to back —
is answered by uneven block sizes.

### Scope claims checked, one by one

Seven of 35 are substantively wrong — the rate holds (4 · 4 · 6 · 5 · 6 across packets 14-18):

| id | verdict |
|---|---|
| `practice-02` | **REFUSED whole.** WEC12 §D is a 20-mark essay; no `Assess`; no 12-mark. Only its point-tally observation survives, via `practice.levels` |
| `topFix-04` | **two clauses refused** (convert the 20-mark Evaluate; describe levels marking); tariff clauses built |
| `specGap-08` | **REFUSED.** Current-account imbalances against other macro objectives is not in 2.3.1; `interconnectedness` is 0 in the whole specification |
| `specGap-07` | **half.** 4a requires the *components* of the balance of payments to be named; capital and financial accounts in depth are 4.3.3, Unit 4 |
| `specGap-03` | built, **parenthetical refused** — `substitution bias` is 0 hits. 2c is taught in the specification's own words |
| `specGap-04` | built, **parenthetical refused** — `fiscal drag` is 0 hits |
| `topFix-02` | **three of its four named reorders are off-spec material that disappears** (factor incomes, CPI-vs-RPI, HDI components). Only the ILO criteria survive, and they are a set, not a sequence |
| `topFix-01`, `structure-04` | reinterpreted, above |
| the other 26 | **built as written** |

`specGap-05` asks for "migration **and skills**"; 3f is net migration only, and skills is not a leaf.

### Four things the audit never asks for

- the whole off-spec block 1 (above) — the audit asks to *improve the exercises* on it (`topFix-02`'s
  factor-incomes reorder, a `value added` fill-in) and never asks whether it is on the specification;
- **`1c-2` total and per capita** — no ledger item requires it;
- **`1d` comparison of growth between countries and over time** and **`1e` PPPs** — named nowhere;
- **`1g` recession as two consecutive quarters of negative growth** — named nowhere.

### Shape

Ten blocks in the specification's own order, **45 subsections**, one subsection per skill, sizes
**5 · 5 · 3 · 5 · 6 · 4 · 4 · 5 · 5 · 3** — uneven on purpose. Twice the size of any previous section
because the topic is twice the size.

| # | Block | Subsections | Leaves |
|---|---|---|---|
| 1 | Measuring National Output | What Real GDP Measures · GNI: Income Rather Than Output · Real and Nominal · Total and Per Capita · Value and Volume | 1a, 1b, 1c-1..3 (5) |
| 2 | Comparing Growth | Comparing Growth Between Countries · Comparing Growth Over Time · Purchasing Power Parities · Positive and Negative Growth Rates · Recession | 1d, 1e, 1f, 1g (4) |
| 3 | What GDP Leaves Out | Limitations of GDP and GNI · Indicators of National Happiness and Wellbeing · Real Incomes and Subjective Happiness | 1h, 1i-1, 1i-2 (3) |
| 4 | Measuring Inflation | Inflation, Deflation and Disinflation · Building a Consumer Price Index · Calculating Inflation from the Index · Limitations of the CPI · The Producer Price Index | 2a, 2b, 2c, 2d (4) |
| 5 | Causes of Inflation and Deflation | Demand-Pull · Cost-Push · Excessive Growth of the Money Supply · Falling Aggregate Demand · An Increase in Aggregate Supply · A Fall in the Money Supply | 2e-1..3, 2f-1..3 (6) |
| 6 | Effects of Inflation and Deflation | On Consumers and Workers · On Firms, Investment and Competitiveness · On the Government and Income Distribution · On the Current Account | 2g-1..8 (8) |
| 7 | Measuring Employment and Unemployment | The ILO Definition · Unemployment and Underemployment · Employment, Unemployment and Inactivity Rates · Net Migration | 3a, 3d, 3e, 3f (4) |
| 8 | Causes of Unemployment | Frictional · Seasonal · Structural · Demand-Deficiency · Real-Wage Inflexibility | 3b-1..5 (5) |
| 9 | Effects of Unemployment | On Consumers and Workers · On Firms · On Public Finances · On Resource Utilisation and the PPF · On Society | 3c-1..6 (6) |
| 10 | The Balance of Payments | Components of the Balance of Payments · Trade in Goods and Services · Current Account Deficits and Surpluses | 4a, 4b, 4c (3) |

### One spine of arithmetic

Packet 17's rule. 2.3.1 is a *quantitative* topic — Appendix 7 lists **QS2 percentages and percentage
changes** and **QS5 calculate and interpret index numbers** in the **IAS** column (`:2766-2777`), so both
are Unit 2 skills and citable; **QS7, converting money to real terms, is IA2 only**, so a deflation
calculation is not an IAS requirement and the section does not drill one. `structure-10`'s complaint —
no numeracy is ever scaffolded — is answered by one economy that every surface is generated from.

One country, one currency (`locale.currency` fires on a second one). All figures exact unless marked:

**CORRECTED AFTER LAYER 6 — the table below is what was built.** The first draft carried a separate GDP
price index (100/105/108) alongside the CPI (100/105.8/108.4), both called "the price index"; a student
deflating nominal GDP with the consumer index got $516bn where the section said $520bn. There is now ONE
index, the one the student builds from the basket in block 4, and nominal GDP is derived from it rather
than typed. See DECISIONS, 16 September.

| Year | Nominal GDP ($bn) | Price index | Real GDP ($bn, year 1 prices) | Population (m) | Real GDP per capita |
|---|---|---|---|---|---|
| 1 | 500.00 | 100 | 500 | 25.0 | $20,000 |
| 2 | 550.16 | 105.8 | 520 | 26.0 | $20,000 |
| 3 | 552.63 | 109.0 | 507 | 26.0 | $19,500 |

Real growth **+4.0%** then **−2.5%**; nominal growth **+10.0%** then **+0.4%** (1 dp). Three teaching
points fall out of it instead of being asserted:

- **year 3 is a fall in real output while the nominal figure still rises** — `1c-1` and `1f` in one row;
- **real GDP rose 4% in year 2 and real GDP per capita did not move at all**, because population rose
  4% too — `1c-2`, which no ledger item asks for;
- two consecutive quarters of that year-3 contraction is the `1g` definition of recession, in figures.

**Value against volume (`1c-3`, `specThin-01`)**: an oil exporter ships 100m barrels at $60 = **$6.0bn**,
then 110m barrels at $50 = **$5.5bn**. **Volume +10%, value −8.3%.** Exact, and it carries the
Middle-East framing `topFix-03` asks for without a dated claim about a real country.

**The CPI basket (`2b`, `specGap-10`)**, a grid — a diagram is the only surface in the schema that can
carry one:

| group | weight | price index, year 2 | weight × index |
|---|---|---|---|
| Food | 30 | 108 | 3,240 |
| Housing | 25 | 104 | 2,600 |
| Transport | 20 | 112 | 2,240 |
| Everything else | 25 | 100 | 2,500 |
| | **100** | | **10,580** → CPI **105.8**, inflation **5.8%** |

**The limitation is then arithmetic, not jargon (`2c`, `specGap-03`)**: re-weight the same four price
changes to a household that spends **45 of every hundred dollars on food and 10 on everything else**
(housing and transport unchanged at 25 and 20) and the index is **107.0 — 7.0% against the national
5.8%**. Re-weighting *transport* to 10 instead, as an earlier draft of this spec said, cannot reach 107.0
at all: that basket maxes out at 106.6. That is "limitations of the CPI as a measure of the rate of inflation" in
the specification's own words, with `substitution bias` — a phrase the specification does not contain —
never used.

**The labour force (`3a`, `3d`, `3e`, `3f`)**, tied to the same population of 26.0m:

working-age 16.0m · employed 11.4m · unemployed 0.6m · labour force 12.0m · inactive 4.0m
→ **unemployment 5.0% · employment 71.25% · inactivity 25.0%**, all exact.
0.9m of the employed work part-time and want full-time: **underemployment moves no rate at all** (`3d`).

**The balance of payments (`4a`-`4c`)**: goods **+$18bn**, services **−$6bn** → trade in goods and
services **+$12bn** (`4b`); primary income **−$9bn**, secondary **−$5bn** → current account **−$2bn**
(`4c`). A surplus on goods and services sitting inside a current-account deficit is exactly the
distinction the two requirements draw.

### Banned in this section — the runner enforces every one

Off-spec vocabulary: `expenditure/income/output method`, `value added`, `RPI`, `Retail Price`, `CPIH`,
`substitution bias`, `liquidity trap`, `fiscal drag`, `interconnectedness`, `hyperinflation`,
`stagflation`, `misery index`, `claimant count`, `GDP deflator`, `natural rate`.
Other units: `HDI`, `Human Development`, `quantitative easing`, `exchange rate` (the live section's one
`terms.later-unit` hit), `Phillips`, `output gap`.
Command words: `Assess`, `Outline`. UK institutions: `ONS`, `Bank of England`, `council tax`,
`Universal Credit`, `furlough`. Plus `EXAMINER_CLAIM`, `MARK_CLAIM`, `FREQUENCY_CLAIM` and
`PAPER_PATTERN_CLAIM` from `scripts/packet-18-the-market.mjs:158`.

**No dated claim about a real economy.** `topFix-05` lists six (US current account "every year since
1982", the 2023 RPI–CPI gap, a rail-fare claim, an unverified 2024 basket, 2021-22 US inflation, the
1930s New Deal). None is corrected; all are removed. The section's figures come from its own spine.

**One formatter per kind of figure** (packet 18): a negative is U+2212 everywhere, never an ASCII hyphen.

### Assessment

**Quiz 43 items** (the spec first said 30; the topic needed more) — three unpinned and FIRST in the array
(`PreTest.jsx` slices the unreserved pool at three), then ten chapters' worth of pins. **Practice 10 items**, one per block, the full Economics
ladder and nothing off it: Define 2 · Calculate 2 · Calculate 4 · Draw 4 · Explain 4 · Explain 4 ·
Analyse 6 · Examine 8 · Discuss 14 · **Evaluate 20 — kept, against `practice-02`**.

**Diagrams: 10, from 2**, one per block, each pinned by the block's `diagramId` and rendered at its
check-in. Every plotted point re-derived from the emitted SVG by the runner.

### Acceptance checks a verifier can run without this conversation

1. The staged bundle validates at **0 BLOCK, 0 DEBT**, coverage **100% (48 of 48)**. Note that
   `validate-content.mjs --section measures-economic-performance` reads the LIVE row, which this packet
   deliberately does not touch; judge the bundle, via the runner or `gateSection()`.
2. Every banned term above returns **0** over the staged bundle's text fields.
3. `practice` holds 10 items; every `(command, marks)` pair appears in `tariff-census.json` for
   **economics**; the 20-mark `Evaluate` is present; no `Assess`, no `Outline`, no 10-mark item.
4. Every block carries `diagramId`, `quizIndices` and `practiceIndices` that resolve; `quizIndices` are
   not `0..n` in block order (`pins.identity`); `pins.diagram` is clean.
5. Quiz items 0-2 are unpinned by every block.
6. Arithmetic: real GDP 500/520/507 on one index of 100/105.8/109, nominal 500/550.16/552.63 derived
   from it, growth +4.0%/−2.5%, per capita $20,000/$20,000/$19,500, CPI 105.8 against the re-weighted
   107.0, unemployment 5.0%, employment 71.25%, inactivity 25.0%, current account −$2bn on a
   goods-and-services surplus of +$12bn — each recomputed from the stated inputs, and each figure in the
   bundle matching its correctly-rounded value.
7. 390×844 walkthrough with `?draft=1`: all ten chapter check-ins render a diagram, a quiz question and
   a practice item; no console error; no step shows a recall twice.

### Verify B — 390×844 walkthrough, 16 September, clean

Signed out, `?draft=1`, viewport 390×844, dev server on 3001.

- **55 steps** — 45 subsections and 10 chapter check-ins, at steps **6, 12, 16, 22, 29, 34, 39, 45,
  51, 55**. Every non-check-in step carries a recall, and **no step repeats the previous step's
  recall prompt**: `structure-04`'s real complaint (eight recalls shown twice back to back under
  main's 2-per-step pairing) does not occur.
- **All ten check-ins render their diagram**, each the right one, with the figures matching the
  bundle — chapter 1's accounts table reads $500bn/100/$500bn/$20,000 · $546bn/105/$520bn/$20,000 ·
  $547.56bn/108/$507bn/$19,500.
- **All ten check-ins render their practice item**, and the tariffs appear in block order
  **2 · 2 · 4 · 4 · 4 · 6 · 8 · 4 · 14 · 20**, which is the authored ladder: every
  `practiceIndices` resolves to the item intended for that chapter. The March section surfaced two
  of five, both on the wrong chapter (`structure-03`).
- **Console: no content error.** The only entries are analytics beacons to `/api/events` (204,
  aborted on rapid navigation) and 401s from auth checks for a signed-out visitor.
- Section landing page reads "Learn Mode · Free · 55 steps", "Notes 10 topics", "Practice 10
  questions", "Diagrams All annotated".

**One finding, and it is not in the content: this section is the first to exceed the free quiz cap.**
Measured by running the real `sectionPayload()` from `lib/preview-limits.js` over the staged bundle
with `isPremium` both ways:

| | quiz items sent | chapters with a quiz pin | every pin resolves |
|---|---|---|---|
| Signed in / Pro | **43** | **10 of 10** | 10 of 10 |
| Signed out / free | **10** | **8 of 10** | 10 of 10 |

`FREE_QUIZ_MAX = 10` and `freeQuizPayload()` spends 2 on the Quiz tab's preview before taking one pin
per chapter, so a ten-chapter section runs out after chapter 8 and **chapters 9 and 10 show a
signed-out student no quiz at all**. Nothing is broken and no pin is dangling — a Pro student sees
every one. V005 was measured on sections of five and six chapters and its arithmetic simply does not
reach ten. Raising the cap is a freemium-boundary call and belongs to the founder; this packet
records the boundary rather than moving it. **This also closes the signed-in/Pro walk V005 has been
waiting for since packet 17** — done as an A/B on the payload function rather than by signing in,
which exercises the shipping code rather than a reimplementation of it.

**V006 confirmed again:** chapter 10 of 10 says "Before the next chapter: the diagram and one thing
from earlier." (`components/LearnModeTab.jsx:429`). Every section, packet 57.

## Packet 20 spec — `types-sizes-businesses`, Economics 3.3.1 (Opus, 16 September 2026)

**Section:** `types-sizes-businesses`, Economics Unit 3 (WEC13), IAL topic **3.3.1 Types and sizes of
businesses**, `audit/raw/econ_spec.txt:1245-1287`. **37 rows off the span — 6 types of business (1a) +
21 size of businesses (2a-2g) + 10 business objectives (3a-3c) — of which 30 are LEAVES**, the other 7
being the parent rows that head a bullet list (`1a`, `2a`, `2b`, `2d`, `2g`, `3a`, `3c`). 30 is the number
`spec.coverage` measures against. 34 section opens. **21 open ledger items** (23 in the section, 2 closed
by packet 0).

Despite the *business* vocabulary this is an **Economics** section and the Economics ladder applies:
Define 2 · Calculate 2/4 · Draw 4 · Explain 4 · Analyse 6 · Examine 8 · Discuss 14 · Evaluate 20.
**There is no Assess and no 10-mark tariff in this subject.**

### What the specification settled before a word was written

**1. The entire "Types of Business Organisation" block is off-spec vocabulary — the fourth instance of
the packet 13/16/17 rule.** Word-boundary counts over the whole Economics specification:

| term | occurrences in `econ_spec.txt` |
|---|---|
| `sole trader` | **0** |
| `limited liability` | **0** |
| `shareholder` / `shareholders` | **0** |
| `partnership` | 1 — "John Lewis Partnership", acknowledgements page (:2419) |
| `plc` | 1 — "Pearson plc", acknowledgements page (:2407) |

The spec's list at 1a is `private sector organisations · state-owned enterprises (public sector) ·
for-profit and not-for-profit organisations · co-operatives · joint ventures` (:1250-1254). So the March
block that spent two subsections, one misconception, three flashcards and the section's only Define
practice on UK company law was teaching the UK GCE Business syllabus, while **four of the five bullets
the specification actually lists were absent**. The block goes; the five bullets become Block 1.
*Ownership* and *control* are still taught as ordinary English in 3b, because the divorce of ownership
from control cannot be stated without them — but they are not presented as examinable terms.

**2. `specGap-03`'s parenthetical is refuted in part.** `charit*` and `social enterprise` return **0**
occurrences. The spec's words are "for-profit and not-for-profit organisations" and "co-operatives",
and those are what is taught; a charity appears once as a plain-English illustration, never as a
taxonomy to learn.

**3. `topFix-05`'s marking clause is refused, in two halves.** "Describe levels-based marking for the
10- and 20-mark items": Economics has **no 10-mark tariff** (`audit/raw/tariff-census.json`), so the live
`Assess 10` is the Business ladder and is not re-tariffed but removed. And *describing what a marker does*
is exactly what `MARK_CLAIM` bans (packet 16, thirteen instances) — `examMatters` says what the **command
word requires**, which Appendix 6 states and which is therefore citable. The clause's other halves —
Define = 2 marks, drop "Outline" — are built.

**4. `topFix-01`/`structure-01`'s "add `diagramRef`" is obsolete.** Since packet 5 a diagram reaches a
student only from a **block's `diagramId`, at that chapter's check-in** (`lib/learn-steps.js:44-55`);
`diagramRef` is the legacy string pin and a subsection `diagramId` is never read. The finding's real
complaint — 2 of 3 diagrams never rendered, the integration diagram landed on the wrong block, quiz[4..9]
and the 20-mark Evaluate never reached a student — is answered by `diagramId`/`quizIndices`/`practiceIndices`
on every block. `practiceIndices` resolve against the RAW array (`LearnModeTab.jsx:193-194`, packet 2).

**5. `structure-05`'s premise is dead.** "2-per-step pairing is coherent, so the section is only 4 steps
long" describes main's pairing model, which packet 5 removed. One subsection is one step. Its real
complaint — the block-4 takeaway names MES, which the body never defines — disappears with block 4.

### Four leaves the audit never mentions

Rule 1 in the other direction: these are in the specification and in **no** ledger item.

- **`ECON-3.3.1-1a-5` joint ventures** (:1254) — absent from the audit entirely.
- **`ECON-3.3.1-2a` SMEs and large corporations** (:1255-1257) — the audit never asks how size is measured.
- **`ECON-3.3.1-2f` impact of growth of firms on businesses, workers and consumers** (:1272-1273) — the
  audit names the *demerger* impacts (`specGap-05`) and not the *growth* impacts.
- **`ECON-3.3.1-3c` formulae for the three objectives** (:1284-1287) — `structure-02` suggests a fill-in
  on them; no item requires them to be taught.

### Scope boundary: economies of scale is 3.3.2

`topFix-03` and `structure-04` are correct and the evidence is `econ_spec.txt:1320-1345` — the relationship
between long-run cost curves and economies/diseconomies of scale, minimum efficient scale, internal vs
external, and the sources of each are **3.3.2 sub-topic 3**, which belongs to packet 28
(`revenue-costs-profits`). Only the demerger half of the March block 4 is on-spec for 3.3.1. The section's
cost curves are therefore deliberately simple — constant marginal cost, no U-shaped AC, no MES — and the
body says so, rather than teaching the shape of a cost curve a topic early.

### Shape

Six blocks in the specification's own order, 24 subsections, one subsection per skill. Block sizes
**4 · 3 · 6 · 4 · 2 · 5** — uneven on purpose (`structure-03`'s real complaint was identical chapters).
Business objectives move to the END, which is where the specification puts them and which fixes
`structure-03` at the root: the divorce of ownership from control is now taught after the reader knows
what a company and an owner are, instead of being invoked two blocks early.

| # | Block | Subsections | Leaves |
|---|---|---|---|
| 1 | Types of Business | Private and Public Sector · For-Profit and Not-for-Profit · Co-operatives · Joint Ventures | 1a (6) |
| 2 | The Size of Businesses | SMEs and Large Corporations · Why Some Firms Stay Small · Why Other Firms Grow | 2a, 2e (4) |
| 3 | How Businesses Grow | Organic Growth · Mergers and Takeovers · Horizontal Integration · Vertical Integration · Conglomerate Integration · Advantages and Disadvantages of Each | 2b, 2c (8) |
| 4 | Constraints on Growth and Its Impact | Size of Market and Access to Finance · Owner Objectives, Regulation and Bureaucracy · Impact of Growth on Businesses · Impact of Growth on Workers and Consumers | 2d, 2f (6) |
| 5 | Demergers | Reasons for Demergers · The Impact of Demergers | 2g (3) |
| 6 | Business Objectives | Profit Maximisation · Revenue Maximisation · Sales Volume Maximisation · Satisficing · The Divorce of Ownership from Control | 3a, 3b, 3c (10) |

### One spine of arithmetic

Packet 17's rule: where a section's arithmetic recurs, define it once and generate every surface from it.
3a and 3c ask for three objectives and the **formula** for each, and all three are points on one firm's
revenue and cost functions. The section carries one firm:

    P = 60 − 2Q        MR = 60 − 4Q        MC = 20        TC = 20Q + 72

Q in thousands of units a month, P in dollars, money in thousands of dollars.

| objective | formula | Q | P | TR | profit |
|---|---|---|---|---|---|
| Profit maximisation | MC = MR | 10 | $40 | $400k | **$128k** |
| Revenue maximisation | MR = 0 | 15 | $30 | **$450k** | $78k |
| Sales volume maximisation | AR = AC | **18** | $24 | $432k | $0 |

Every figure is exact, and the three teaching points fall out of it rather than being asserted: revenue
peaks at a *larger* output than profit, sales volume maximisation is larger again and takes profit to
zero, and revenue at the volume objective ($432k) is **lower** than at the revenue objective ($450k) —
which is the misconception "revenue maximisation and sales maximisation are the same" answered with
arithmetic instead of a warning. The objectives diagram is sampled from the same four functions and the
runner re-derives every plotted point from the emitted SVG.

### Diagrams

Five, each pinned by `diagramId` to its block's check-in. Block 4 has none on purpose — constraints and
impacts are an argument, and a drawing of them would be decoration (packet 17's B6 rule).

1. **Types of business** (B1) — a grid: ownership (private / state-owned) against purpose (for-profit /
   not-for-profit), with co-operatives and joint ventures placed on it. A diagram is the only surface in
   the schema that can carry a grid (`schema.body-type`).
2. **How size is measured** (B2) — the measures themselves (employees, turnover, capital employed, market
   share), not a threshold table: the SME threshold is set per jurisdiction and the specification states
   none, so stating one would be a locale claim.
3. **The integration map** (B3) — one supply chain with the four directions drawn on it: backward and
   forward vertical, horizontal at the same stage, conglomerate outside it.
4. **Demerger against divestment** (B5) — before-and-after ownership, teaching the distinction the March
   section got wrong (`accuracy-01`, closed by packet 0 in prose only).
5. **The three objectives** (B6) — AR, MR, MC and AC with Q = 10, 15 and 18 marked, generated from the
   functions above.

### Ledger ids this packet closes (21)

`topFix-01` `topFix-03` `topFix-04` `topFix-05` · `accuracy-02` · `quiz-01` · `structure-01` `structure-02`
`structure-03` `structure-04` `structure-05` `structure-06` `structure-07` `structure-08` · `specGap-01`
`specGap-02` `specGap-03` `specGap-04` `specGap-05` `specGap-06` `specGap-07`

Three carry a refusal that must be stated in the claim rather than silently dropped, each split into
clauses (packet 16's rule 5):

- **`topFix-05`** — Define re-tariffed to 2 ✓ · "Outline" absent ✓ · Amazon example corrected ✓ ·
  regulator references internationalised ✓ · **levels-based marking described ✗ refused** (`MARK_CLAIM`) ·
  **10-mark item ✗ refused** (no such tariff in Economics).
- **`topFix-01`** — `quizIndices` ✓ · `practiceIndices` ✓ · diagram pinned to the right block ✓ ·
  20-mark Evaluate reachable ✓ · **`diagramRef` ✗ refused as obsolete**, satisfied by `diagramId`.
- **`specGap-03`** — for-profit vs not-for-profit ✓ · co-operatives ✓ · **"charities, social enterprises"
  ✗ refused as 0-occurrence vocabulary**, used as illustration only.

### Acceptance checks a verifier can run without this conversation

1. `node scripts/packet-20-types-sizes-businesses.mjs` exits 0: no pounds sterling, no "Outline", no
   "Assess", no `sole trader`/`limited liability`/`plc`/`shareholder` **as taught terms**, no UK-only
   institution, no uncited examiner claim, no `MARK_CLAIM`, no `FREQUENCY_CLAIM`, no `PAPER_PATTERN_CLAIM`,
   every practice command and tariff in the **Economics** census, every block pinned to a quiz and a
   practice item, every objectives figure re-derived from the four functions, ids unique.
2. Coverage: `spec.coverage` reports **30 of 30** leaves of ECON-3.3.1 evidenced (100%), `spec.uncovered` 0 new.
3. `npm run validate` exits 0 · `npm test` passes · `npm run build` exit 0 · `npm run contrast` clean.
4. Every subsection at or under the 350-word teaching budget.
5. **Verify B, 390×844, signed out, storage cleared, `?draft=1`:** open `types-sizes-businesses` → the
   pre-test offers 3 questions → step through all 24 subsections → at each of the six check-ins confirm
   the diagram that renders belongs to that chapter (B1 grid, B2 measures, B3 integration map, B4 **none**,
   B5 demerger, B6 objectives), the quiz item is on that chapter's material, and the practice item is the
   chapter's; confirm the 20-mark Evaluate is reachable; confirm no step shows an empty body and the step
   counter never exceeds the total.

### Hold

**NOT PUBLISHABLE** until packets 5 and 7 are on `main` (DECISIONS 2026-09-15). Its recalls are written
to the packet-7 contract and main's `ReorderRecall` reads `recall.shuffled`, which is how packet 15 took
production down. Stage only; publish at the packet 5/7 checkpoint with
`node scripts/packet-20-types-sizes-businesses.mjs --stage && node scripts/publish-section.mjs types-sizes-businesses --confirm`.

## Packet 20 result — `types-sizes-businesses` (16 September 2026, Opus)

**BUILT and VERIFIED; STAGED, NOT PUBLISHED.** Publishes at the packet 5/7 checkpoint with
`node scripts/packet-20-types-sizes-businesses.mjs --stage && node scripts/publish-section.mjs types-sizes-businesses --confirm`

### The scope finding, and it is the fourth of its kind

The March section taught **UK company law the IAL Economics specification never mentions.** Word-boundary
counts over the whole of `econ_spec.txt`: `sole trader` **0**, `limited liability` **0**, `shareholder`
**0**; `partnership` and `plc` occur once each, on the acknowledgements pages (:2419, :2407). Two of its
eight subsections, one misconception, six flashcards and its only Define practice were built on that
vocabulary — while **four of the five organisation types the specification actually lists at 1a**
(state-owned enterprises, for-profit and not-for-profit, co-operatives, joint ventures) were absent
entirely. It also spent two more subsections on economies of scale, which is 3.3.2 sub-topic 3
(:1320-1345) and belongs to packet 28.

This is the fourth instance of the rule — packet 13's off-spec frameworks, packet 16's "barriers to
entry", packet 17's income and substitution effects, packet 18's "equilibrium". **The audit named only
half of it**: `specGap-02` and `specGap-03` asked for public sector and co-operatives, but nothing in the
ledger says the legal-forms block should not exist.

### Four leaves no ledger item mentions

`1a-5` joint ventures · `2a` SMEs and large corporations · `2f` impact of growth on businesses, workers
and consumers (the audit names only the *demerger* impacts at `specGap-05`) · `3c` the formulae for the
three objectives.

### Claims the specification refutes

- **`topFix-05`'s "describe levels-based marking for the 10- and 20-mark items"** — Economics has **no
  10-mark tariff**, so the live `Assess 10` is the Business ladder and was re-commanded as an Examine (8)
  rather than re-tariffed. And describing marking is what `MARK_CLAIM` exists to stop. Its other clauses
  (Define = 2, no "Outline", the Amazon correction, internationalised regulators) are built.
- **`topFix-01`/`structure-01`'s "add `diagramRef`"** — obsolete since packet 5; answered with `diagramId`.
- **`structure-05`'s premise** — "2-per-step pairing is coherent" describes main's pairing model, which
  packet 5 removed.
- **`specGap-03`'s "charities, social enterprises"** — both 0 occurrences; the spec's words are
  "for-profit and not-for-profit organisations".

### Shape

6 blocks / **24 subsections** (was 8) / 24 recalls across all four contract types (5 reorder, 6 fill-in,
5 match, 8 classify) / 34 quiz, 31 pinned and exactly three unpinned and FIRST / 13 practice at IAL
**Economics** tariffs / 5 diagrams, each pinned by `diagramId` / 30 cards / 7 mistakes / 4 chains.
Block sizes 4 · 3 · 6 · 4 · 2 · 5. **Business Objectives moved to LAST**, where the specification puts
them, which fixes `structure-03` at the root rather than by adding a definition.

**One firm carries 3a, 3b and 3c**: `P = 60 − 2Q`, `MR = 60 − 4Q`, `MC = 20`, `TC = 20Q + 72`.
MC = MR at 10,000 units ($40, profit $128,000); MR = 0 at 15,000 ($30, revenue $450,000); AR = AC at
18,000 ($24, profit $0). All exact. Selling the most units earns **less** revenue than maximising it
($432,000 against $450,000), which answers the revenue/sales-volume misconception with arithmetic.

### What the layers caught

**Layer 6 found both planted canaries and thirteen real defects.** The three that mattered:
1. **Examine (8) was described as analysis in six places.** `econ_spec.txt:2726-2731` requires
   "knowledge, understanding, application, analysis **and evaluation** ... a brief assessment of the
   arguments/factors/evidence" — and evaluation is the whole difference between Examine (8) and Analyse (6).
2. **"is levels-marked" shipped eight times** — a claim about how a response is MARKED, which Appendix 6
   never states, and which the packet spec had already recorded as refused. `MARK_CLAIM` reached none of them.
3. **"At 10,000 units the next unit would add $16"** — Q is in thousands, so MR(10) is exactly $20, which
   is the equality the sentence existed to justify.
Also: a quiz keyed the CONGLOMERATE disadvantage as vertical-specific, contradicting the classify item
three chapters earlier; a horizontal distractor ("same industry, different countries") was true of many
horizontal mergers; two fill-in blanks accepted a word the body itself supplies.

**Verify B found what no automated check could**: at 390px the four-column types table ran its Type cells
into its Owner cells and cut "Trustees or members" off at the frame. Every structural check passed it —
six rows, every cell present, unique, on its own row — because none of them knows how wide a cell is.
Rebuilt as three columns; the runner now measures each cell against its column and, run against the old
layout, **fires on twelve cells, the same twelve that were visibly colliding**.

Three new runner checks, each closing a class: prose tariffs against the Economics ladder (the census
check reads practice items only), an Examine described without evaluation, and table-cell overflow.

### Escalation for the founder — the pre-test asks a question the check-in asks again

Measured, not argued. `freeQuizPayload()` sends a signed-out student `PREVIEW_LIMITS.quiz` (2) free items
plus one pin per chapter. `PreTest.jsx:23-27` builds its pool as `[...free, ...reserved]` and slices 3 —
so when only 2 free items survive the slice, **the third pre-test question is chapter 1's check-in
question**, and the student meets it again minutes later. Confirmed on this section: served array has 8
items, indices 0-1 free, 2-7 pinned, and the pre-test rendered items 0, 1 and 2.

**No content packet can fix this.** Authoring a fourth unpinned item does not help, because the slice
takes only the first `PREVIEW_LIMITS.quiz` of them. It needs either `freeQuizPayload()` to carry
`max(PREVIEW_LIMITS.quiz, 3)` of the unpinned prefix, or `PreTest.jsx` to stop padding from reserved
items. **This affects every rewritten section, not just this one**, and V005 (packet 17.1) is still
unverified. Half a packet.

### Checked and not acted on

Layer 6 flagged fill-in answers failing exact match ("$4" against "$4.00"). `FillInRecall.jsx:16` is
tap-a-chip with no free text, so there is nothing to mistype. It also flagged the kept id
`types-sizes-businesses:sub:diseconomies-demergers` on "Reasons for Demergers" as stale vocabulary; the id
is never shown to a student and a progress row points at it, so it is kept under the packet-13 rule.

## Packet 19 result — `planning-raising-finance`, Business 2.3.1 (Opus 5, 16 September 2026)

**BUILT, STAGED, NOT PUBLISHED.** Section `planning-raising-finance`, Business Unit 2 (WBS12), IAL topic
**2.3.1 Planning a business and raising finance**, `audit/raw/bus_spec.txt:844-877`, **23 leaves**
(25 rows less the two parent rows 3a and 3b). 35 section opens. 28 open ledger items.

**Before:** 5 blocks · 12 subsections · 6 reorder + 6 fill-in · 25 quiz · 5 practice · **0 diagrams** ·
24 flashcards (of which **3 were exact duplicates**) · validator **33 BLOCK / 51 DEBT / 83% coverage**.
**After:** 5 blocks · **24 subsections** · 24 recalls across all four types (5 reorder, 7 fill-in, 5 match,
7 classify) · 33 quiz · 6 practice · **5 diagrams (8 views)** · 35 cards · 8 mistakes · 5 chains ·
validator **0 BLOCK / 0 DEBT / 100% coverage (23 of 23)**, 84 baselined findings cleared, **0 new debt**.
Publish with `node scripts/packet-19-planning-raising-finance.mjs --stage && node scripts/publish-section.mjs planning-raising-finance --confirm`.

### Scope check against the spec text — eight claims are wrong

Rule 1, run before building. The rate holds: 4 wrong in packet 14, 4 in 15, 6 in 16, 5 in 17, 6 in 18, **8 here.**

1. **`specGap-05` IS NOT THIS SECTION'S LEAF, and it is the largest thing the audit got wrong.** It asks for
   "interpretation of a simple cash-flow forecast" and "use and limitations of a cash-flow forecast". In IAL
   those are **2.3.2 · 4** (`bus_spec.txt:907-908`), which the **`financial-planning`** section owns. `2.3.1`
   spans `:844-877` and has no cash-flow leaf at all. Building it here would take another section's leaf —
   the same trap packet 18's brief caught with price skimming. **Reassigned to packet 31**, with the full
   reasoning in its ledger note. What the finding actually saw is closed instead: the untaught
   "Define the term 'cash flow' (4 marks)" practice item is **deleted**.
2. **`topFix-02` clause (a) goes with it.** Its other two clauses — the remaining external sources and
   methods, and rewriting `choosing-appropriate-finance` to cover finance by liability type — are both built.
   Claimed on that basis; clause (a) is refused on the spec, not left undone.
3. **`quiz-01` is refuted: franchising IS in scope.** It calls q5 untaught Unit 1 content and asks for it to
   be dropped. Franchising is IAL **2.3.1 · 4b** (`:872-873`) and was one of the four leaves with **no
   coverage at all**. The topic stays and is now taught; what was actually wrong with q5 was its fourth
   option, "Unlimited liability protection", which is not a thing.
4. **`quiz-02` is refuted the same way:** social enterprise is 4b, not Unit 1. Taught, and the item kept.
5. **`specGap-07` is refuted:** "Forms of Business" is not an out-of-spec Unit 1 recap to be labelled as one.
   4a, 4b and 4c are three leaves of this topic. The block stays and grows from 2 subsections to 5.
6. **`specGap-01` resolves to no change.** It calls the numbering "unsure" and cites UK GCE 2.1.1-2.1.4. The
   app already carries `2.3.1`, which IS the IAL number and title. Nothing renumbered — the same shape as
   packet 15's `structure-11`.
7. **`structure-03` is refused in its prescribed form.** It asks for Forms of Business and Liability to come
   BEFORE External Finance. The spec's order is Planning · Internal · External · Forms · Liability, and
   "blocks in specification order" is the template rule. The dependency it names is real — March taught share
   capital before Ltd and plc existed — and is fixed along the spec's own seam instead: **3b-2 teaches share
   capital as a METHOD** (selling part of the ownership for permanent capital) and **5b answers which
   businesses may use it**, which is where the spec puts that question.
8. **`specGap-02`'s list is incomplete.** It names family and friends, peer-to-peer, business angels and
   other businesses, and omits **banks** (3a-2) and **crowd funding** (3a-5). All six sources are built.

**Confirmed correct, having read the lines:** `accuracy-01` (the Tesla narrative is invented — the DOE loan
funded Fremont, not the Gigafactory, and Tesla had no retained profits until 2020; the example is removed
rather than corrected), `practice-01` (Define is 2, and the term was untaught), `topFix-05` (Define 2, and
**"Outline" is not an IAL Business command word at all**), `specGap-03` (leasing and grants genuinely
uncovered — the oracle agrees), `specGap-04` (5b uncovered), `specGap-08` ("other businesses" IS listed, so
it is built), `structure-01` (quizIndices were literally 0,1,2,3,4 in block order — the `pins.identity`
tell), `structure-02` (practice 2, 3 and 4 reached no student), `structure-04`, `-05`, `-06`, `-07`, `-08`,
`-09` (10 of 12 examples were UK firms), `-10`, `-11`, `topFix-01`, `topFix-03`, `topFix-04`.

**Found while building, in no ledger item: three of the 24 flashcards were exact duplicates** — `82a0dfc2`,
`426a5a7a` and `adcaa1ea` each appeared a second time with a `-2` suffix and identical text, so a student
revising this section met the same three cards twice. The duplicates are dropped and the originals rewritten.

### The design — one firm, one funding history

Every leaf is a moment in one fictional firm's life (`scripts/_packet19-util.mjs`), and the runner re-derives
every figure:

    start-up $240,000 = owner's capital $60,000 + family and friends $30,000 + bank loan $90,000 + angel $60,000

- **Ownership, exact at every stage.** The founder holds 120,000 shares throughout. The angel's $60,000 buys
  30,000 new shares at $2.00 → 150,000 in issue → founder **80%**, angel **20%**. Flotation issues 150,000 at
  $6.00, raising **$900,000** → 300,000 in issue → founder **40%**, angel **10%**, public **50%**.
- **Retained profit is priced, not asserted.** $48,000 after tax − $12,000 dividends = **$36,000** retained,
  whose opportunity cost at 5% is **$1,800** — which is how `topFix-04`'s "retained profit has no cost"
  contradiction is resolved rather than argued away.
- **Methods priced against each other:** loan $1,800 × 60 = **$108,000** ($18,000 interest); lease $900 × 48 =
  **$43,200**, a **$3,200** premium over the $40,000 purchase; trade credit 60 days on $15,000 = **$30,000**.
- **Five diagrams, pinned by `diagramId` on the BLOCK**, one per chapter, where the section had none. **Four
  of the eight views are grids** — debt against equity, the three methods priced, the four forms, and finance
  by liability type — spread across three of the five diagrams, because a diagram is the only surface in the
  schema that can carry a table (packet 17's finding, used four times here).
- **Practice at IAL Business Unit 2 tariffs:** Define 2 · Calculate 4 · Explain 4 · Analyse 6 · Assess 10 ·
  Evaluate 20. Every block carries at least one; all six reach a student.

### Verify B — 390×844, signed out, `?draft=1`

Walked on `remediation-dev`. **29 steps** (24 teach + 5 check-in), built from the staged draft through
`lib/learn-steps.js`: every teach step carries its own recall, **every check-in resolves its diagram, at
least one quiz item and at least one practice item**, no step renders empty. `document.scrollWidth` is 375 at
375px on every step checked, including a classify step (5 of this section's classify items exceed 45
characters, the length that triggered packet 15's `white-space: nowrap` overflow — that fix holds). The
pre-test opt-in card offers "Three questions", matching the three unpinned items. The resume card reads
"You left off at step 9 of 29" correctly. Section number renders as `2.3.1`.

Two things worth carrying forward:

- **The grid diagrams collided, and only the browser could see it.** Measured with
  `getComputedTextLength()`: three cells overlapped their neighbours at the original 500-unit frame —
  "Overdraft, leasing, trade credit" ran 23 units under its own "Yes". Nothing in the validator or the schema
  knows how wide a string is. The grid frame is now 560 with columns at 26/260/440, and the runner carries a
  pessimistic width estimator (0.65em, above the 0.642em the browser actually measured) that fails the build
  on any overlap or frame overrun. **Any future packet drawing a table needs this check.**
- **The `?draft=1` overview card is not draft-aware.** The section overview shows the LIVE step and practice
  counts ("17 steps", "5 questions") while Learn Mode correctly shows 29. Dev-only preview surface, no student
  impact, but it misleads a walkthrough. Also: `StudyApp`'s section fetch effect has deps
  `[activeSection, user?.id, isPremium]` and no stale-response guard, so a draft preview races a non-draft
  fetch — the same missing guard `revvylearn-resume-pointer-bug` describes for section switching.

### Layer 6 — two planted canaries, six findings, all six real or planted

Sonnet, adversarial, on a canary copy. **Both canaries caught** (a lease total of $42,300 against the
arithmetic's $43,200; a social-enterprise definition overstated from "most of its surplus" to "none under any
circumstances"). **Four real findings, all four fixed:**

1. **The cap table did not reconcile.** A regional distributor was said to put $50,000 in "in exchange for
   shares", but no share count anywhere carried that holding — founder 120,000 + angel 30,000 = 150,000, and
   the post-flotation split came to exactly 100% with no room for a third shareholder. Fixed: the distributor
   **lends** on long terms against a supply agreement, which "other businesses" (3a-6) covers equally and
   which leaves the register exact.
2. **"Matching Finance to the Circumstances" implied the angel closed a $90,000 gap** when the angel put in
   $60,000, and never named the family's $30,000 although the paragraph concluded "the package has four
   parts". Fixed by naming all four.
3. **An internal ledger id leaked into text a student reads**: "...each was absent from this section before
   **(specGap-03)**". The runner now bans every ledger-id shape from the content — the class, not the
   instance, since nothing else in the pipeline looks for one.
4. A chain flashcard said "a lender reads it for repayment and **a lender** or investor decides".

### Gate

`npm test` **141/141** · `npm run build` exit 0 · `npm run validate` exit 0 · `npm run contrast` clean ·
`npm run quant-check` clean · section **0 BLOCK / 0 DEBT / 100%** · **27 ids claimed** (`specGap-05`
reassigned to packet 31, not claimed). **Baseline NOT rewritten** — nothing was published, so the live row's
84 baselined findings are still true of what students see; the baseline shrinks in the session that publishes.

---

## Handoff — after packet 18 (written 16 September 2026)

> **READ THIS FIRST — packets 19 AND 20 are already in flight in other sessions.** At the moment packet
> 18 committed, this worktree held uncommitted `scripts/_packet19-*`, `scripts/packet-19-*` and
> `scripts/_packet20-*` files written minutes earlier, plus pre-packet snapshots for both, by sessions
> that are not this one. **Neither has claimed anything in the ledger yet** (`unverified 19` and
> `unverified 20` both report unclaimed scope), so nothing is finished. **Do not start 19 or 20 without
> checking `git log` and `ledger.mjs packet <n>` first** — and if you are one of those sessions, the
> brief below is yours. Whoever is third should take **packet 21, `measures-economic-performance`**
> (Economics Unit 2, 33 items), and should say so in this file before starting.
>
> The operating model is one packet per session for a reason, and three concurrent content packets in
> one worktree is how `validator-baseline.json` and `ledger.json` get clobbered. **Stage files
> explicitly, never `git add -A`.**

**The brief for packet 19, `planning-raising-finance`** — Business Unit 2 (WBS12), IAL topic **2.3.1
Planning a business and raising finance**, `audit/raw/bus_spec.txt:848-878`, **23 leaves**; **28 ledger
items**. State today: 5 blocks · 12 subsections · 25 quiz · 5 practice · **0 diagrams** · **0 common
mistakes** · 4 extras chains. **On Opus, in a NEW session.**

### Do this before anything else

1. Read `PROGRESS.md`, `DECISIONS.md`, this file and `PROTOCOL.md`, then `ledger.mjs packet 19 --open`.
2. **Check every scope claim against the spec text before acting on it.** The rate is not falling: 4
   wrong in packet 14, 4 in 15, 6 in 16, 5 in 17, **6 in 18**. `audit/raw/bus_spec.txt` is the oracle,
   and a number in a finding is a hypothesis. One item already says so about itself —
   `specGap-08` opens "Unsure: whether IAL 2.1.2 lists 'other businesses' exactly as UK does; treat as
   likely" — and `2.1.2` is UK GCE numbering that does not exist in the IAL spec at all. Find the
   requirement by its wording, never by its number.
3. **GREP THE SPECIFICATION FOR THE SECTION'S OWN VOCABULARY BEFORE YOU TEACH IT.** This is packet 18's
   largest finding and the audit never mentioned it: the section's whole third chapter was built on
   "equilibrium", which appears **zero** times in `bus_spec.txt` and twelve times in `econ_spec.txt`.
   So do "excess demand", "excess supply", "market clearing", "movement along" and "contraction".
   Nothing in the validator can see this — `terms.off-spec` carries six named phrases and coverage is
   lexical — so a section can score 88% while teaching the material in a vocabulary the specification
   never uses. For 2.3.1 the words worth checking first are the ones a UK GCE textbook would supply
   for business planning and sources of finance.
4. **V001 is fixed (packet 3.1, 16 Sep), so the oracle is complete**: `spec-items.json` is now 1,165
   leaves, up from 1,125, and 43 leaves that no section could be reported as missing are visible.
   Count this span yourself with a UTF-8-aware tool. **Any coverage figure written before 16 Sep was
   measured against an incomplete oracle** — re-read it rather than carrying it forward.

### The template, as it stands after five sections

Copy `scripts/packet-18-*.mjs` and rename: a runner plus `_content`, `_assessment`, `_diagrams`,
`_util`. The runner is the first reader of the section — word counts against the 350 budget, the
section's own banned phrases, every practice command and tariff against `audit/raw/tariff-census.json`
**for the right subject**, every diagram property re-derived from the emitted SVG, then the validator,
then `stageBundle()`. `--dump` writes the bundle for the verifier.

Lifecycle: read the spec span → check every ledger item against it → write the spec block here →
snapshot → author → dry run to 0 BLOCK and 0 new DEBT → stage → **walk at 390×844 with `?draft=1`** →
Layer 6 on a canary copy → fix → re-stage → claim → Verify A → gate → commit → push → handoff.
**No publish**, until packets 5 and 7 are on main.

### What packet 18 learned that packet 19 needs

1. **Check the command-word census for a word the TOPIC is asking for, not just for the ones you would
   have reached for.** `Construct` (4 marks) — "requires students to draw an accurately labelled
   diagram" — is requirement 3b almost verbatim, and this programme had never used it in a section that
   shipped with no diagram at all. 2.3.1 is a finance topic; check whether **Calculate (4)** and
   **Construct (4)** are being under-used there too. The full IAL Business ladder: Define 2, Calculate
   4, Construct 4, Explain 4, Analyse 6, Discuss 8, **Assess 10** (Units 1-2) or 12 (Units 3-4),
   Evaluate 20. No Outline and no Examine in Business.
2. **A section that computes its own figures needs one formatter per kind of figure.** JavaScript
   prints a negative with an ASCII hyphen and a typed sentence carries U+2212, so packet 18's first
   draft had 55 of one and 13 of the other on the same page, in a section about negative numbers.
   `sig()`, `pc()`, `pedS()` and `money()` in `_packet18-util.mjs` are where the typography lives.
3. **Never put a note about this programme's own previous content into text a student reads.** Two
   practice items explained their tariff with "the March version of this item asked for 4", and Layer 6
   read it as a claim about a past paper — which is how a student would read it. The runner bans the
   class now; copy that ban.
4. **A classify item is tested against the group's stated `why`, not the author's intent.** "Spend on
   branding to keep buyers when prices rise" sat under price-inelastic demand whose `why` was "few
   buyers leave, so the extra per unit outweighs the units lost" — a reason that does not explain it.
   Third packet running that this has been the shape of a Layer 6 finding.
5. **Give Layer 6 the rules it cannot infer from the bundle.** It reported the three unpinned quiz
   items as "orphaned", because nothing in the JSON says they are the pre-test pool. Put the
   three-unpinned-first rule in its brief next time, and it will spend that attention elsewhere.
6. **Ids are not content.** Eight March subsection ids were kept because progress rows point at them,
   and one is `the-market:sub:equilibrium-price-and-quantity`. Renaming would orphan progress; the
   runner excludes ids from every text check instead.
7. **`JSON.stringify` cannot tell you whether a staged draft matches what you built.** Postgres `jsonb`
   normalises key order. Use `sameJson` from `lib/content-gate.mjs`; a byte comparison reported all 8
   tables as mismatched when all 8 were deep-equal.
8. **`npm run validate` reads LIVE content in a shared worktree**, so a staged section still reports its
   old numbers there. Judge your own section from the runner's dry run.

### Exit criteria for packet 19

Section validator 0 BLOCK, DEBT ≤ 3, coverage ≥ 95%; every recall of the right type with its `why`;
every block pinned to a quiz item, a practice item and (where one earns its keep) a diagram, **pinned by
`diagramId`**; exactly three quiz items unpinned and first in the array; practice at IAL **Business**
tariffs; no off-specification vocabulary taught or assessed; one currency; no UK skew; `npm test`,
`npm run build`, `npm run validate` exit 0; `ledger.mjs unverified 19` clear; Layer 6, Verify A and
Verify B written up here.

### For the founder

- **Nothing in packets 14-18 is live.** Five finished sections are staged and waiting on the packet 5/7
  checkpoint (~26 September). Packet 18's publishes with:
  `node scripts/packet-18-the-market.mjs --stage && node scripts/publish-section.mjs the-market --confirm`
- **`the-market` was teaching the wrong subject's vocabulary**, and that is the kind of thing only a
  reader who checks the specification can find. It is worth knowing that the March content was not
  merely thin here; its third chapter was named after a word the Business specification does not
  contain. The other Business sections have not been checked for this.
- **V006**: the chapter check-in tells every student "Before the next chapter…" even on the last
  chapter, where there is no next chapter. One line in `LearnModeTab.jsx`; it affects every section.

---

## Packet 18 spec — `the-market`, Business 1.3.2 (Opus, 16 September 2026)

**Section:** `the-market`, Business Unit 1 (WBS11), IAL topic **1.3.2 The market**, `audit/raw/bus_spec.txt:551-595`.
**24 leaves**, counted off the span: 7 demand bullets (1a) + 5 supply bullets (2a) + 2 markets (3a, 3b) +
5 PED (4a-4e) + 5 YED (5a-5e). 44 section opens. **30 open ledger items.**
**State today:** 5 blocks · 11 subsections · 25 quiz · 5 practice · **0 diagrams**; validator **20 BLOCK,
51 DEBT, 88% coverage** (21 of 24). The three uncovered leaves are `BUS-1.3.2-1a-7` seasonality,
`BUS-1.3.2-3b` the diagrams, and `BUS-1.3.2-4d` PED's significance for pricing.

### Scope check against the spec text — six claims are wrong

Rule 1, run before building. The rate holds: 4 wrong in packet 14, 4 in 15, 6 in 16, 5 in 17, **6 here.**

1. **`specGap-03` clause (c) is NOT IAL SCOPE.** It asks for "operation of market forces to eliminate excess
   demand and excess supply". IAL 1.3.2·3 has **only (a) and (b)** — the interaction of demand and supply,
   and the drawing and interpretation of demand and supply diagrams. There is no (c). `excess demand`,
   `excess supply` and `market clearing` return **0 hits** in `bus_spec.txt`. That clause is UK GCE 1.2.3.
   Its clause (b) — no diagrams exist — is correct and is the largest single job in this packet.
2. **`specGap-06` is a mark-scheme claim and its terminology is off-spec.** "Edexcel mark schemes accept
   'extension/contraction'" says what a marker does, which `claim.uncited` exists to stop and which
   Appendix 6 cannot cite. `contraction` and `movement along` are **0 hits** in `bus_spec.txt`; `extension`
   appears twice, once as "extension strategies" (the product life cycle, **1.3.3**, a different section)
   and once in a generic assessment sentence. The item is closed by **removing** the terminology from
   `common_mistakes` and the flashcards, not by teaching it.
3. **`specGap-05`'s letters are UK GCE, and it is silent about a leaf.** "Factors influencing YED" is IAL
   **5d**, not 5c; what the item calls "(b) interpretation" is IAL **5c**. IAL **5b is "Normal and inferior
   goods"**, which the item never mentions at all. Five YED leaves, not the four it implies.
4. **`specGap-04` clause (d) prescribes another section's content.** It wants "an explicit link to price
   skimming/penetration". Those are `bus_spec.txt:649-650`, inside **1.3.3 Marketing mix and strategy**.
   IAL 1.3.2·4d is "the significance of price elasticity of demand to businesses **in terms of implications
   for pricing**" — teach the implication in 1.3.2's own words; importing 1.3.3's named strategies would
   take a leaf that section owns.
5. **`practice-02` understates its own defect.** It calls p4 "OFF-TOPIC". It is, but **"Outline" is not an
   IAL Business command word at all** — the ladder is Define 2 · Calculate 4 · Construct 4 · Explain 4 ·
   Analyse 6 · Discuss 8 · Assess 10 (Units 1-2) · Evaluate 20, verified in `tariff-census.json`. The item
   is unmarkable, not merely misplaced.
6. **The audit never says the biggest thing: `equilibrium` is absent from the entire Business
   specification.** 0 hits in `bus_spec.txt`, against 12 in `econ_spec.txt`. The section's third block, its
   `equilibrium-diagram` pin and seven of its exam tips are built on a word the specification does not use.
   Rule 2 applies, for the fourth time (packet 13's frameworks, 16's barriers to entry, 17's income and
   substitution effects): **teach the mechanism in the spec's own words — "the interaction of demand and
   supply", "the causes and consequences of changes in demand and supply" — name the standard term once as
   an aside, and never assess it.** This is also the cross-subject trap `NEXT.md` warned about: Economics
   1.3.4 owns equilibrium and price determination, and a sentence copied across would import it.

**Confirmed correct, having read the lines:** `quiz-02` (price elasticity of *supply* is absent — 0 hits,
and the 24 leaves are demand factors, supply factors, their interaction, PED and YED); `practice-03`
(Analyse is 6, and 10 is Assess in Units 1-2); `practice-04` (Define is 2); `specGap-02` (supply is covered
fully — to be re-measured, not assumed); `specGap-01` (seasonality is genuinely uncovered; the oracle
agrees). **V001 does not reach this span** and the corrected oracle still counts 24 leaves here.

### The design

**One market, defined once, generating every surface** (packet 17's rule). A bottled-drinks maker selling
across South-East Asia, priced in **$ only** (`locale.currency` is a DEBT finding today):

    Qd = 900 − 30P        Qs = 100 + 20P        they meet at P = $16, Q = 420

Every number in the section is read off those two lines, and the runner re-derives each one:
- **4a calculation** — $10→$12 is +20% price, 600→540 is −10% quantity, **PED = −0.5**; $20→$25 is +25%,
  300→150 is −50%, **PED = −2.0**. Both exact, no rounding to explain away.
- **4b interpretation** — the two values above, plus **unit elasticity at P = $15** where Q = 450.
- **4e PED and total revenue** — TR is $6,000 at $10, **$6,750 at $15**, $6,000 at $20, $3,750 at $25. The
  maximum sits exactly where PED = −1, so 4b and 4e are the same fact seen twice, not two things to learn.
- **3a/3b** — the same two lines drawn, then shifted, which is what 3b asks for in its own words.
- **5a-5e** — one income rise of **+8%** across three of the firm's products: **YED +2.0** (normal, income
  elastic), **+0.5** (normal, income inelastic), **−0.5** (inferior). 5b, 5c and 5d fall out of one table.

**Five blocks, one per sub-topic of the spec, one subsection per step**, targeting **22-24 subsections**
from today's 11 (the step-0 rule: more steps, not denser ones).

**Five diagrams, pinned by `diagramId` on the BLOCK** (`lib/learn-steps.js:44-55`), which is what the three
dead `diagramRef` pins should always have been: demand with a D1→D2 shift; supply with S1→S2; the two lines
together and then shifted, for 3b; the demand schedule **drawn as a grid** carrying P, Q, TR and PED (a
diagram is the only surface in the schema that can hold a table); and the three YED products.

**Practice at Business tariffs**, and this section finally earns the command word it has been missing:
**Construct (4)** — "requires students to draw an accurately labelled diagram" — is exactly 3b. Planned:
Define (2), Calculate (4), Construct (4), Explain (4), Analyse (6), Assess (10).

### Every leaf, and the subsection that teaches it

Coverage is lexical, so 100% from the validator is necessary and not sufficient. This is the map by
hand, 24 leaves against 27 subsections — the three that carry no leaf are scaffolding the March section
never had (what demand is, what supply is, and the distinction between a price change and a change in
demand, which is the section's commonest misconception).

| Leaf | Subsection |
|---|---|
| 1a·1 substitutes and complementary goods | Prices of Substitutes and Complementary Goods |
| 1a·2 consumer incomes | Changes in Consumer Incomes |
| 1a·3 fashions, tastes and preferences | Fashions, Tastes and Preferences |
| 1a·4 marketing, advertising and branding | Marketing, Advertising and Branding |
| 1a·5 demographics | Demographics |
| 1a·6 external shocks · 1a·7 seasonality | External Shocks and Seasonality |
| 2a·1 costs of production | Changes in the Costs of Production |
| 2a·2 new technology | The Introduction of New Technology |
| 2a·3 indirect taxes · 2a·4 government subsidies | Indirect Taxes and Government Subsidies |
| 2a·5 external shocks | External Shocks to Supply |
| 3a the interaction of demand and supply | The Interaction of Demand and Supply |
| 3b drawing and interpretation of the diagrams | Drawing a Demand and Supply Diagram · Showing a Change in Demand · Showing a Change in Supply |
| 4a calculation of PED | Calculating Price Elasticity of Demand |
| 4b interpretation of the numerical values | Interpreting the Numerical Values of PED |
| 4c the factors influencing PED | The Factors Influencing PED |
| 4d significance for pricing | What PED Means for Pricing |
| 4e PED and total revenue | PED and Total Revenue |
| 5a calculation of YED | Calculating Income Elasticity of Demand |
| 5b normal and inferior goods | Normal and Inferior Goods |
| 5c interpretation of the numerical values | Interpreting the Numerical Values of YED |
| 5d the factors influencing YED | The Factors Influencing YED |
| 5e significance to businesses | What YED Means for a Business |

### What the three verification layers found

**Layer 6 (adversarial read of the built bundle, two planted canaries).** Both canaries caught — a
`−0.8` substituted for `−0.5` in a quiz explanation, and an invented "Examiners always award a mark
for the arrow". Six real findings beyond them, five accepted:

1. **Two practice items explained their own tariff by naming this programme's previous content** —
   "the March version of this item was commanded Analyse at 10", "the March version asked for 4". The
   reviewer read them as claims about a past paper, which is exactly how a student would read them.
   Provenance belongs in the packet's files, not in guidance. Both removed, and **the runner now bans
   the class**: `/\bthe March (version|section|copy|item|content)\b/` anywhere a student reads.
2. **A fill-in keyed "one" while the body two paragraphs above said "PED is exactly −1"**, and a
   mistake card teaches "write PED with its minus sign". A student answering −1 was right and marked
   wrong. The line now reads "exactly ___ in size", which is how the rest of the section phrases it.
3. **A classify item was defensible in either group.** "Spend on branding to keep buyers when prices
   rise" sat under price-inelastic demand, whose `why` is "few buyers leave, so the extra per unit
   outweighs the units lost" — which does not explain it. Branding to *reduce* elasticity is worth most
   to a firm whose demand is currently **elastic**. Replaced with "Resist discounting, because a price
   cut would not win back enough volume", which the group's own `why` does explain. This is packet 17's
   rule 8 again: the test of a classify item is the group's stated reason, not the author's intent.
4. **"Unitary" sat beside a falling revenue** in the PED-and-revenue table, which reads as "unitary
   demand means revenue falls" rather than "$15 is the maximum and any move leaves it". The cell now
   says `$6,750 is the peak → $6,480`, and the runner asserts both that the cell says so and that the
   unitary example starts at the revenue-maximising price.
5. **Rejected: "quiz items 0, 1 and 2 are orphaned"** — they are the three deliberately unpinned
   pre-test items, first in the array by design (packets 15 and 16). They reach a student through the
   pre-test, which the walkthrough saw offered at step 0. The reviewer had the bundle and not that
   rule; worth giving the next Layer 6 the rule in its brief.

**Verify A (fresh context, adversarial, ledger CLI): 30 of 30 confirmed on round 1, gate clear.** It
re-derived the two judgement calls independently rather than taking them from the spec block: it read
`bus_spec.txt:569-572` and confirmed requirement 3 has only (a) and (b), and it independently grepped
all six banned words and found 0 hits. It also spot-checked the three ids packet 0 had already closed
on this section for regressions and found none.

**Verify B (390×844, `?draft=1`, the section's own dev server): clean, no console errors.**
- Overview: "Learn Mode · 32 steps", Notes 5 topics, Practice 8 questions — 27 subsections + 5 check-ins.
- Step 1 of 32, "Chapter 1 of 5 · Demand · part 1 of 8", pre-test offered ("Three questions… Optional").
- Step 9, chapter 1's check-in: the demand diagram renders with both axes labelled, the curve labelled
  D, dashed guides reading off $20→300 and $10→600, and both scenario tabs switching. The check-in copy
  named only what it carries.
- Step 20, chapter 3's check-in: the 3b diagram (demand and supply meeting at $16 / 420) renders and
  enlarges; the quiz marked a correct answer and printed its explanation; the **Construct** item
  followed as guided practice.
- Step 21: the `reorder` recall renders with its ordering principle named, four items, working arrows.
- Step 32 of 32: 100%, "Complete topic ✓", chapter 5 of 5, the YED diagram and its two tabs.
- **One defect found, and it is code, not content: `V006`.** The check-in always says "Before the next
  chapter…", including on the last chapter's check-in where there is no next chapter
  (`components/LearnModeTab.jsx:429`). The list itself is correctly generated from what the check-in
  carries; only the lead-in is unconditional. It affects every section, so it is logged at packet 57.

### Exit criteria

Section validator **0 BLOCK, DEBT ≤ 3, coverage ≥ 95%** (23 of 24); every recall of the right type with its
`why`; every block pinned to a quiz item, a practice item and a diagram, **pinned by `diagramId`**; exactly
three quiz items unpinned and **first** in the array; practice at IAL **Business** tariffs (Assess is 10,
there is no Outline and no Examine); no `equilibrium`, `excess demand`, `excess supply`, `movement along`,
`extension` or `contraction` as taught or assessed vocabulary; one currency; no UK skew in the examples
(7 of 11 are UK-based today); `npm test`, `npm run build`, `npm run validate` exit 0; `ledger.mjs
unverified 18` clear; Layer 6, Verify A and Verify B written up here. **No publish** — packets 5 and 7 are
not on main.


---

## Packet 3.1 result — V001 closed, the oracle is complete (16 September 2026)

**Done and verified; Verify A 1 of 1 on round 1, gate clear.** `audit/raw/spec-items.json` now carries
**1,165 leaves, up from 1,125**. The parser anchored its bullet test to line start and the extraction puts
a wrapped left-column topic title on the same row as a list's FIRST bullets, so those bullets were
appended to the row before them instead of becoming rows of their own.

**The number was 43, not 60.** V001's title asserts 60 dropped bullets (31 Economics, 29 Business); the
measured figure is **43 (23 Economics, 20 Business)**, and the verifier re-derived it independently. 60 is
the mid-line bullet count across the whole extracted file, including the transferable-skills appendix and
the calculator rules, which sit outside every topic span and are correctly ignored. The item's arithmetic
was a hypothesis exactly as its scope claims are.

**What this means for every content packet from here.** The oracle is now complete: for both subjects,
every bullet character inside every topic span starts exactly one row, measured by scanning the raw text
for the character rather than by any regex the parser uses. `npm run validate` gained **24 new DEBT and
0 new BLOCK** — 24 specification leaves in 12 sections that were invisible before and are now reported
missing. They cluster: `global-markets-expansion` 6, `trade-global-economy` 4, `growth-development` 3,
`aggregate-demand` 2, `managing-change` 2. **A section's coverage percentage from before 16 September was
measured against an incomplete oracle; re-read it, do not carry it forward.**

**Packets 14-17 are unaffected, and that is measured.** All four authored bundles were re-validated
against the corrected oracle and all four are still at 100% (20/20, 27/27, 29/29, 39/39), 0 new BLOCK,
0 new DEBT. They were authored from the spec text rather than from the oracle, which is why its blind spot
never reached them. Keep authoring that way.

**Also true, and useful to know:** only `meeting-customer-needs` and `consumer-behaviour-demand` actually
hold staged drafts in the database right now. `decision-making-techniques` and `introductory-concepts`
hold live, pre-packet content — their drafts went when those sections were reverted and restored. Their
authored bundles are intact in `audit/snapshots/packet-1[4-7]-bundle__*.json` and their runners re-stage
on demand, which is what their one-command publish lines already do. Nothing is lost; the PROGRESS wording
"staged" means "the runner stages it", not "a draft is sitting in the table".

**`audit/validator-baseline.json` went 2,448 → 2,432 keys: 16 removed, 0 added.** Bullets are numbered
within their parent, so a bullet inserted at the front renumbers its siblings and a baselined key such as
`spec:ECON-1.3.1-4a-2` came to name a different leaf than the one that had been accepted as debt. Those 16
keys were removed by hand rather than rewriting the baseline, because `--baseline --confirm` would have
ADDED the newly visible leaves. **If you clear debt and re-baseline, check that no `spec:` key you are
keeping has been renumbered under you.**

**V004 is open at packet 3.2**, half a session and not urgent: `subtopicLabel` is still truncated wherever
a sub-topic's label wraps over three lines. No leaf is invisible because of it; it only weakens the
`terms.later-unit` lint.

---

## Previous handoff — after packet 17 (written 16 September 2026, superseded)

**Next is packet 18, `the-market`** — and the first thing to know about it is that **it is a BUSINESS
section**, not the Economics one its ledger numbering suggests. Business Unit 1 (WBS11), IAL topic **1.3.2
The market**, `audit/raw/bus_spec.txt:551-595`, **24 leaves**; 44 section opens; **33 ledger items**. Every
`1.2.x` number in those items is UK GCE Theme 1 numbering, exactly the trap packet 16 met. State today:
5 blocks · 11 subsections · 25 quiz · 5 practice · **0 diagrams** (three blocks pin diagrams that do not
exist, so they render nothing); validator **20 BLOCK, 51 DEBT, 88% coverage**. **On Opus, in a NEW session.**

### Do this before anything else

1. Read `PROGRESS.md`, `DECISIONS.md`, this file and `PROTOCOL.md`, then `ledger.mjs packet 18 --open`.
2. **Check every scope claim against the spec text before acting on it.** Packet 14 found four wrong, 15 four,
   16 six, 17 five. `audit/raw/bus_spec.txt` is the oracle. Two in this packet's scope are worth checking
   first: `quiz-02` says price elasticity of **supply** is not in the IAL Business specification — the 24
   leaves of 1.3.2 are demand factors, supply factors, the interaction of the two, PED (4a-4e) and YED
   (5a-5e), and none of them is PES, so the claim looks right and you should still read the lines; and
   `practice-03` prescribes **Assess at 10/12**, which unlike packet 17's Economics items IS the correct
   Business ladder (Assess is 10 in Units 1-2).
3. **V001 is fixed (packet 3.1, 16 Sep) and it never reached this span**: 12 bullet characters in
   `bus_spec.txt:551-595`, every one at line start. The span still holds **24 leaves** and the count is
   unchanged by the fix — verify that yourself with a UTF-8-aware tool rather than trusting this line, and
   note that `spec-items.json` is now 1,165 leaves, so any coverage number you read from before 16 Sep was
   measured against an incomplete oracle.
4. This section teaches demand, PED and YED, and so does packet 17's `consumer-behaviour-demand`. They are
   **different subjects**, so that is not a duplication to resolve — but the Business tariffs, the Business
   command words and the Business spec wording are all different, and copying a sentence across would import
   the wrong ones. `audit/SPEC-OWNERSHIP.md` maps ownership within a subject, not between them.

### The template, as it stands after four sections

Copy `scripts/packet-17-*.mjs` and rename. The runner is the first reader of the section: word counts against
the 350 budget, the section's own banned phrases, every practice command and tariff against
`audit/raw/tariff-census.json` **for the right subject**, every diagram property re-derived from the figures
it asserts, and the whole bundle validated against the baseline before `stageBundle()`. `--dump` writes the
bundle for the verifier. Lifecycle: read the spec span → check every ledger item against it → write the spec
block here → snapshot → author → dry run to 0 BLOCK and 0 new DEBT → stage → **walk it at 390×844 with
`?draft=1`** → Layer 6 on a canary copy → fix → re-stage → claim → Verify A → gate → commit → push →
handoff. **No publish**, until packets 5 and 7 are on main.

### What packet 17 learned that packet 18 needs

1. **Where a section's arithmetic recurs, define it once as a function and generate every surface from it.**
   1.3.2 Economics asks for the demand curve, a PED calculation, the five values, PED along a straight line,
   total revenue and the PED-revenue relationship — six leaves that are all properties of one line. One
   schedule (`Q = 1200 − 40P`) carried all six, the diagrams were sampled from it, and the runner re-read the
   emitted SVG coordinates back out. Business 1.3.2 has the same shape: demand, supply, their interaction,
   PED and YED are one market, and 3b explicitly wants **supply and demand diagrams**, of which this section
   currently has none.
2. **A packet's own runner should ban the class, not the instance.** Layer 6 found three sentences asserting
   how papers are *built* — "a question rarely wants all six", "an extract naming two firms rarely says which
   of them the question is about" — which the frequency regex written for *how often a paper asks* did not
   reach. `PAPER_PATTERN_CLAIM` in packet 17's runner catches both; copy it.
3. **Where the specification supplies no vocabulary for a leaf, teach the mechanism in the specification's own
   words.** Third time: packet 13's eight frameworks, packet 16's "barriers to entry", and here the income and
   substitution effects, which return **zero** hits in the Economics specification. Business 1.3.2's likely
   candidates are price elasticity of supply, consumer surplus and the cobweb — grep before you teach.
4. **Only a CHECK-IN step carries a diagram, and it comes from the BLOCK's `diagramId`** (`lib/learn-steps.js:44-55`).
   `diagramRef` is the legacy string pin, and it is why this section's three pins resolve to nothing
   (`structure-01`, `diagram-01`-`03`). Pin by id.
5. **Copy that enumerates what follows must be generated from what follows.** The chapter check-in used to
   promise "the diagram, a quick question, and one thing from earlier" whatever it actually carried; it now
   names only what it renders. If your section gives a chapter no diagram, that is now honest.
6. **Put the three unpinned quiz items FIRST in the array** (packet 16), and leave exactly three
   (packet 15) — but know the consequence packet 17 measured: a signed-out student is sent two quiz items in
   total, so those two are the pre-test's and **no chapter check-in shows a quiz to a free student**. That is
   a freemium-boundary decision and it is the founder's; do not work around it in content.
7. **A fill-in's template must not print its own answers.** `fillin.leak` compares the answers against every
   word printed in the template, so a line that says "demand is price ___" and another that says "make demand
   ___ elastic" leaks "elastic" from the second into the first. Two of packet 17's first-draft fill-ins did it.
8. **A `classify` item must be defensible in exactly one group**, and the test is the group's own `why`. "Keeping
   an account whose fees have risen" fitted *inertia*'s why only if you assumed the buyer knew of a cheaper
   option, which the item never said, so it read as habit just as well.
9. **A `reorder`'s steps must be genuinely sequential, not merely listed in a sensible order.** Converting the
   quantity change and the price change to percentages are independent, so a student who did the price first
   had a defensible order and was marked wrong. Merge independent steps into one.
10. **`npm run validate` is a whole-database gate in a shared worktree** and reads LIVE content, so a staged
    section still reports its old numbers there. Judge your own section from the runner's dry run, and record
    the baseline write by section rather than by total.

### Exit criteria for packet 18

Section validator 0 BLOCK, DEBT ≤ 3, coverage ≥ 95%; every recall of the right type with its `why`; every
block pinned to a quiz item, a practice item and (where one earns its keep) a diagram, pinned by `diagramId`;
exactly three quiz items unpinned and first in the array; practice at IAL **Business** tariffs (Assess is 10
in Units 1-2; there is no Outline and no Examine); `npm test`, `npm run build`, `npm run validate` exit 0;
`ledger.mjs unverified 18` clear; Layer 6, Verify A and Verify B reports written up here.

### For the founder

- **Nothing in packets 14, 15, 16 and 17 is live.** Four finished sections are staged and waiting on the
  packet 5/7 checkpoint (~26 September). Each publishes with one command; they are listed in their PROGRESS
  rows. Packet 17's is:
  `node scripts/packet-17-consumer-behaviour-demand.mjs --stage && node scripts/publish-section.mjs consumer-behaviour-demand --confirm`
- **The free quiz slice now has a measured cost.** `PREVIEW_LIMITS.quiz` is 2 and the pre-test wants 3, so a
  signed-out student gets an honest pre-test and **no quiz at any of the six chapter check-ins**. Raising the
  cap to 3 would fix the pre-test; raising it further would put a question back on the check-ins. It is a
  freemium-boundary call, so it is yours.
- **V001 is closed (packet 3.1, 16 Sep).** The coverage oracle is complete: 43 specification leaves that no
  section could be reported as missing are now visible, and the gate gained 24 new DEBT findings and no new
  BLOCK. The four finished sections were re-checked against it and are still at 100%.

---

## Previous handoff — after packet 16 (written 15 September 2026, superseded)


**Next is packet 17, `consumer-behaviour-demand`** (Economics Unit 1, WEC11, IAL topic **1.3.2**,
`audit/raw/econ_spec.txt:580-649`, **39 countable leaves**; 52 section opens; **32 ledger items**, one of
which — `C-introductory-concepts-specGap-08`, economic agents and their objectives — was reassigned here by
packet 15 because 1.3.2·1 is where it actually lives). State today: 6 blocks · 18 subsections · 25 quiz ·
5 practice · 4 diagrams; validator **17 BLOCK, 63 DEBT, 87% coverage**. **On Opus, in a NEW session.**

### Do this before anything else

1. Read `PROGRESS.md`, `DECISIONS.md`, this file and `PROTOCOL.md`, then `ledger.mjs packet 17 --open`.
2. **Check every scope claim against the spec text before acting on it.** Packet 14 found four wrong,
   packet 15 four more, packet 16 six. `audit/raw/econ_spec.txt` is the oracle; a number in a finding is a
   hypothesis. This one is Economics, so the UK GCE trap is Theme 1 numbering (1.2.x) rather than 1.1.x.
3. **V001 does not reach this span either, and that is measured**: 29 bullet characters in
   `econ_spec.txt:580-649`, every one at line start, so no leaf of 1.3.2 is invisible to the oracle. Count
   it yourself with a UTF-8-aware tool before trusting it — an `awk '/[•]/'` bracket expression matches
   individual bytes and gives false positives. The global figures, reproduced independently: 31 Economics
   bullets and 29 Business bullets are dropped, none of them here. V001 is still packet 3.1's.

### The template, as it stands after three sections

Copy `scripts/packet-16-*.mjs` and rename. The runner is the first reader of the section: word counts
against the 350 budget, the section's own banned phrases, every practice command and tariff against
`audit/raw/tariff-census.json` **for the right subject**, every diagram property re-derived from the figures
it asserts, and the whole bundle validated against the baseline before `stageBundle()`. `--dump` writes the
bundle for the verifier. Lifecycle: read the spec span → check every ledger item against it → write the spec
block here → snapshot → author → dry run to 0 BLOCK and 0 new DEBT → stage → **walk it at 390×844 with
`?draft=1`** → Layer 6 on a canary copy → fix → re-stage → claim → Verify A → gate → commit → push →
handoff. **No publish**, until packets 5 and 7 are on main.

### What packet 16 learned that packet 17 needs

1. **Put the pre-test's three unpinned quiz items FIRST in the array, not last.** A signed-out student is
   sent only `PREVIEW_LIMITS.quiz` (2) items, so the pre-test is drawn from the first two of the array, not
   from the whole bank. With the unpinned items at the end, the pre-test asks questions the chapter
   check-ins ask again — F079's own defect, alive for everyone outside the paywall. Packet 15's rule was
   right for a Pro student only.
2. **`?draft=1` is how you walk a held section** (dev only; the server refuses it in any production build).
   The SEO block at the top of the page still renders live `data`, so `get_page_text` shows the OLD content
   — read the app region with screenshots or `read_page`, not with page text, or you will verify the
   section you replaced.
3. **The validator's `claim.uncited` only fires on the word "examiners".** "An unlabelled axis costs
   marks", "earns half the marks", "scores poorly" all pass it and are the same claim. Say what the
   **command word requires** — Appendix 6 states that, so it is citable — never what a marker does. Packet
   16's runner carries the regex; copy it.
4. **Where the specification supplies no vocabulary for a leaf, name the standard term as an aside and do
   not assess it.** "Barriers to entry" is in the Economics spec (`:1386`, `:1425`) and nowhere in the
   Business one; the first draft made it load-bearing in eleven places and tested it. For an ECONOMICS
   packet this cuts the other way — check which subject's spec a term belongs to before deciding.
5. **A `match` recall needs unique `right` values.** "Quantitative / Qualitative / Quantitative /
   Qualitative" is a `classify`, and `match.unique` is a BLOCK.
6. **A `reorder` needs a flow or an extras chain in the section that teaches the same sequence**
   (`reorder.source`). A worked example written as `subheading` + `bullets` does not count; the same content
   as a `flow` does, and renders better.
7. **`keyIdea` is capped at 180 characters and each takeaway at 100** (`schema.lengths`). Ten of the first
   draft's fired.
8. **The verifier needs an agent type that can WRITE `audit/ledger.json`.** PROTOCOL names a
   `packet-verifier` subagent; this session did not have one, and the read-only search agent that looks
   like the right substitute judged all 32 ids correctly and then refused to run
   `ledger.mjs confirm` at all, because the CLI writes a file. Its whole report had to be re-run by a
   second agent that could. Give the verifier a type with Bash write access and the explicit instruction
   that `ledger.mjs` is the ONE file it may change.
9. **Split every multi-part ledger item into its clauses before building, and check them off one by
   one.** All five of packet 16's Verify A rejections were the same shape: an item naming three or four
   things, of which the packet did two or three and then read the item as done. `topFix-01` wanted a
   4-mark *and* an 8/10-mark item for each of three topics and had none of the three pairs; `topFix-05`
   named four jobs and took three rounds because each pass fixed the absolutes it had noticed rather than
   scanning every option of all 37 items. Say in your spec block which artefact satisfies which clause.
10. **Revert the baseline in the same commit as the content.** Packet 15's revert left 78 keys out of
   `validator-baseline.json`, and `npm run validate` has been failing for every session since on a
   regression none of them caused. Restored here in its own commit.

### Exit criteria for packet 17

Section validator 0 BLOCK, DEBT ≤ 3, coverage ≥ 95%; every recall of the right type with its `why`; every
block pinned to a quiz item, a practice item and (where one earns its keep) a diagram; exactly three quiz
items unpinned and first in the array; practice at IAL **Economics** tariffs (Examine exists, Assess does
not, Discuss is 14); `npm test`, `npm run build`, `npm run validate` exit 0; `ledger.mjs unverified 17`
clear; Layer 6, Verify A and Verify B reports written up here.

### For the founder

- **Nothing in packets 14, 15 and 16 is live.** Three finished sections are staged and waiting on the
  packet 5/7 checkpoint (~26 September). Each publishes with one command; they are listed in their
  PROGRESS rows.
- **The free quiz slice is why the pre-test misfires**, and widening it is a freemium-boundary decision,
  which is yours. `PREVIEW_LIMITS.quiz` is 2; the pre-test wants 3. Packet 16 worked around it in content.
- **`POST /api/learn-mode/state` returns 401 for every signed-out student**, twice per section, logging a
  console error on the busiest path in the product. Pre-existing, not investigated, probably packet 4 or 6.

---


## Packet 17 spec — consumer-behaviour-demand, the biggest topic in Unit 1 (Opus, 16 September 2026)

Economics Unit 1 (WEC11), IAL topic **1.3.2 Consumer behaviour and demand**, `audit/raw/econ_spec.txt:576-655`
(the "What students need to learn" table runs `:580-649`), **39 countable leaves** — the largest leaf count of
any section built so far. 52 section opens. **32 ledger items**, one of them reassigned here by packet 15.

State before: 6 blocks · 18 subsections · 18 recalls (9 reorder, 9 fill-in, no match, no classify) · 25 quiz
(8 reachable) · 5 practice · 4 diagrams (2 of them unreachable) · 18 cards · 4 mistakes · 4 chains; validator
**17 BLOCK · 63 DEBT · 87% coverage**.

### V001, measured rather than assumed

Counting bullet characters in `econ_spec.txt:576-655` with a UTF-8-aware pass, independently of the generated
asset: **29 bullets, every one at line start, 0 dropped**, and `spec-items.json` holds all 39 leaves of 1.3.2.
The line-anchored regex in `build-spec-items.mjs` loses nothing in this span, so this section's coverage number
is trustworthy. V001 stays packet 3.1's. (Packet 16 recorded the same result for its own span; neither result
transfers — count the span.)

### Five ledger claims the specification refutes or redirects — read before building

1. **`specGap-02` — "'conditions of demand' as the spec term for shift factors" is REFUTED.** The phrase appears
   **0 times** in `audit/raw/econ_spec.txt`. It is AQA vocabulary, not Edexcel's: the IAL spec says
   "Factors that may cause a shift in the demand curve" (`:596`). Teaching students to "recognise the phrase in
   questions" would teach them to expect wording an IAL paper never uses. Closed as no-change, and the March
   common-mistake card that carries the phrase in its title (`consumer-behaviour-demand:mistake:d6510341`) is
   rewritten to the spec's own words. Same shape as packet 15's `structure-11` and packet 16's `structure-06`.
2. **`specGap-06` — half refuted, half redirected.** It asks two things. (a) "if behavioural economics is absent
   from WEC11 (likely), Block 0 subsection 3 is off-spec": the subsection is **required** — `1b` names six
   reasons why consumers may not maximise utility (`:583-589`), so the content stays. What IS off-spec is its
   **vocabulary**: "anchoring", "loss aversion" and "bounded rationality" appear **0 times** in the Economics
   specification, and the single occurrence of "behavioural" anywhere in it is `:1281`, "behavioural theories:
   satisficing", inside a firms'-objectives topic that is not this one. So the subsections are rebuilt around
   the specification's own six reasons — herding, habitual behaviour, inertia, poor computational skills, the
   need to feel valued, framing and bias — and the UK GCE labels go. This is packet 16's "barriers to entry"
   rule applied to Economics: where the spec supplies no vocabulary, teach the mechanism in the spec's words.
   (b) "if elasticities are a separate spec point the section may be over-packed": they are **not** separate —
   price, income and cross elasticities are sub-topic **3 of 1.3.2 itself** (`:598-649`), 24 of the topic's 39
   leaves. The section is correctly scoped and the answer to a packed section is more steps, not less content.
3. **`topFix-02` — its prescribed tariffs are the wrong subject's.** It asks for "Define 2, Explain 4/6,
   Assess 10/12, Evaluate 20". In IAL **Economics** there is **no Assess and no 10-mark tariff**, and Explain is
   4 only: Define 2 · Calculate 2/4 · Draw 4 · Explain 4 · Analyse 6 · Examine 8 · Discuss 14 · Evaluate 20
   (`econ_spec.txt:2704-2747`, `audit/raw/tariff-census.json`). Assess 10/12 is the Business ladder. The item's
   valid clauses — drop "Outline", drop "Analyse (10)", retariff, re-author the indices — are all built; its
   "Assess 10/12" clause is refused with that evidence.
4. **`structure-01` and the sort-bug halves of `topFix-02`, `practice-01`, `practice-02` are already fixed in
   code.** `practiceIndices` have resolved against the RAW `practiceData` array since packet 2
   (`components/LearnModeTab.jsx:193-194`, F013/F040/F111); `sortedPractice` survives only as the fallback
   distribution for sections with no pins at all. What remains is the content half: pin every block, against the
   raw order, and give the 20-mark Evaluate a block so it is reachable at all.
5. **`topFix-04`'s mechanism is obsolete; its problem is real.** It asks for `diagramRef 'YED and XED'` on a
   block. Since packet 5 only a **check-in** step carries a diagram and it comes from the block's **`diagramId`**
   (`lib/learn-steps.js:44-55`); `diagramRef` is the legacy string pin that first-matched the wrong diagram in
   the first place. Every block that earns a diagram gets `diagramId`, and both currently-invisible diagrams are
   rebuilt and pinned.

Two more items are observations about code that packet 5 or packet 7 has already changed, and are closed on the
content side only: **`structure-03`** (the 2-per-step pairing that made every block a 2-section step then a
1-section step no longer exists — one subsection is one step; what survives is its real complaint, six blocks
with an identical rhythm, answered by blocks of 4 · 6 · 5 · 2 · 4 · 3 subsections) and **`structure-07`**
(word banks of answers only: packet 7's contract gives every fill-in 2-3 authored distractors and semantic
hints, and this packet writes them).

### The shape — six blocks in specification order, 24 subsections

| # | Block | Spec | Subsections |
|---|---|---|---|
| 1 | Rational Decision Making | 1a, 1b | 4 |
| 2 | The Demand Curve | 2a-2d | 6 |
| 3 | Price Elasticity of Demand | 3a, 3b, 3c, 3d, 3f | 5 |
| 4 | Total Revenue and Pricing Decisions | 3e, 3g | 2 |
| 5 | Income and Cross Elasticity of Demand | 3b, 3h, 3i | 4 |
| 6 | The Significance of Elasticities | 3j | 3 |

1. Rational Decision Making and Economic Agents (1a) · Utility and Utility Maximisation (1a) · Herding, Habit
   and Inertia (1b·1-3) · Computation, Status and Framing (1b·4-6)
2. The Concept of Demand (2a) · Diminishing Marginal Utility and the Shape of the Demand Curve (2c) ·
   Movements Along a Demand Curve (2b) · Shifts of a Demand Curve (2b) · Shift Factors: Related Goods and Real
   Income (2d·1-2) · Shift Factors: Tastes, Population and Advertising (2d·3-5)
3. What Elasticity Measures (3a) · Calculating Price Elasticity of Demand (3b) · Interpreting PED Values
   (3c·1-5) · The Factors Influencing PED (3d·1-5) · PED Along a Straight-Line Demand Curve (3f)
4. Calculating Total Revenue (3e) · PED and Total Revenue (3g)
5. Calculating Income Elasticity of Demand (3b) · Interpreting YED Values: Normal and Inferior Goods (3h·1-5) ·
   Calculating Cross Elasticity of Demand (3b) · Interpreting XED Values (3i·1-3)
6. Significance for Firms (3j) · Significance for Consumers (3j) · Significance for Government (3j)

Twenty-four small steps plus six check-ins, against eighteen crowded ones: 30 steps. Block 6 exists because
3j names **firms, consumers and the government** and the March section taught only firms and government
(`specGap-04`); giving each its own subsection is what closes it, and it also removes `structure-05`'s
duplication, because the per-elasticity "Significance of YED / XED" subsections are gone.

### One spine of arithmetic — Tafari Coaches, and a linear demand schedule

Every number in the section comes from one fictional intercity coach operator with **no country**, and from one
straight-line market demand curve `Q = 1200 − 40P` (tickets a day, dollars). The section carries no real example
with a year or a figure (packet 15's rule after packet 14's Layer 6), so there is nothing to overstate; real
firms are named without numbers. Dollars only.

- Individual demand from diminishing marginal utility: one traveller values successive monthly trips at
  $26, $18, $11, $5, so the number of trips bought rises only as the fare falls — that IS the individual
  demand curve, and 2c is closed with arithmetic rather than a sentence (`specGap-01`, `structure-06`).
- PED, inelastic segment: $10 → $12, Q 800 → 720. −10% ÷ +20% = **−0.5**.
- PED, elastic segment: $20 → $22, Q 400 → 320. −20% ÷ +10% = **−2.0**.
- Unit elastic at the midpoint of the line: P = $15, Q = 600 (`3f`, `specGap-03`).
- Total revenue: $8,000 at $10 · $8,640 at $12 · **$9,000 at $15** · $8,000 at $20 · $7,040 at $22. Revenue
  peaks where PED = 1, which is 3e and 3g in one table.
- YED: coach travel is inferior (income +10%, Q −5% → **−0.5**); air travel on the same route is a luxury
  (+20% ÷ +10% → **+2.0**); rice is a necessity (+4% ÷ +10% → **+0.4**).
- XED: air fare +10% → coach demand +6% → **+0.6**, substitutes. Coach fare −10% → hotel nights at the
  destination +4% → **−0.4**, complements. Rice ≈ 0, unrelated.

The runner re-derives every one of those from `Q = 1200 − 40P` and refuses to stage if a printed figure
disagrees with its own arithmetic, and the diagrams are generated from the same function (packet 15's
`accuracy-01` rule), not drawn and asserted.

### Scope — the 32 ledger ids, split into clauses

Packet 16's lesson: a multi-part item is satisfied clause by clause, and the builder is the worst judge of
that. Each clause below names the artefact that satisfies it.

| id | clause | artefact |
|---|---|---|
| `C-introductory-concepts-specGap-08` | economic agents and their objectives, defined | 1.1 names consumer, firm and government as the three agents and gives each its objective; 1a's own two (utility, profit) are the assessed ones |
| `topFix-01` a | the two uncompletable fill-ins made completable | every fill-in re-authored; `fillin.dup-answers` 0 |
| `topFix-01` b | 2-3 distractors on every fill-in bank | authored `distractors[]` on all of them; `fillin.distractors` 0 |
| `topFix-02` a | stop the practice sort / re-author indices | `practiceIndices` authored against the raw array; every block pinned |
| `topFix-02` b | retariff to IAL command words | Economics tariffs only, checked against the census in the runner |
| `topFix-02` c | drop "Outline" and "Analyse (10)" | both gone; 9 practice items, none with a tariff the subject lacks |
| `topFix-02` d | "Assess 10/12" | **refused** — no Assess in IAL Economics (see above) |
| `topFix-03` | four non-sequence reorders replaced | the four become `classify` / `match`; the reorders that remain are genuine calculations or causal chains with the principle named |
| `topFix-04` a | surface the two hidden diagrams | rebuilt as the block-3 PED-values diagram and the block-5 YED/XED diagram, both `diagramId`-pinned |
| `topFix-04` b | one sentence linking DMU to the downward slope | a whole subsection (2.2) with the utility schedule |
| `topFix-05` a | replace fabricated or wrong examples | every March example replaced; no example carries a year or a figure |
| `topFix-05` b | remove invented exam-frequency claims | `examMatters` says what the command word requires (Appendix 6), never what a paper does or a marker does |
| `accuracy-01` | the Waitrose 2008 claim | gone with the subsection that carried it |
| `practice-01` | Define retariffed to 2, guidance to a definition, absolute value stated | p1 |
| `practice-02` | the 10-mark Analyse | re-commanded to Analyse (6) and Examine (8), levels-shaped guidance |
| `structure-01` | practice reaches the right block, Evaluate reachable | block 6 pins the 20-mark Evaluate |
| `structure-02` | both diagrams render in Learn Mode | five diagrams, every one `diagramId`-pinned to a check-in |
| `structure-03` | the identical six-block rhythm | blocks of 4 · 6 · 5 · 2 · 4 · 3 |
| `structure-04` | quiz 8-24 unreachable | 32 items, 29 pinned, 3 unpinned and FIRST in the array |
| `structure-05` | block 5 repeats blocks 3-4 | the per-elasticity significance subsections are gone; one block 6 covers 3j |
| `structure-06` | DMU never connected to the curve | 2.2 |
| `structure-07` | word banks of answers only | authored distractors (code half already packet 7's) |
| `structure-08` | three filler misconceptions | every misconception is an error a student actually writes, and each names what to write instead |
| `structure-09` | parallel effects written as a sequence | the income and substitution effects are a `bullets` pair, not a `flow`; every remaining `flow` is genuinely sequential |
| `structure-10` | invented paper-frequency claims | none; the runner refuses "almost every paper", "often open a paper" and the marker-claim class |
| `specGap-01` | DMU → downward slope | 2.2 |
| `specGap-02` | "conditions of demand" | **refused** — 0 occurrences in the spec |
| `specGap-03` | PED along a straight line | 3.5 and the PED-values diagram's second view |
| `specGap-04` | significance for consumers | 6.2, its own subsection |
| `specGap-05` | calculating elasticities from a table | the demand schedule is a table in 2.1 and 4.1, and two Calculate (4) practice items supply their P/Q pairs in the stem. Note the limit: a practice item is `{command, marks, question, guidance}`, all plain strings rendered as text, so a *rendered* table in a practice stem is not expressible in the schema — the figures are given in the stem instead, which is what the calculation needs |
| `specGap-06` | scope | **refused / redirected** (see above) |
| `specGap-07`/`-08`/`-09` | inertia · the need to feel valued · framing | 1.3 and 1.4, one paragraph each, in the spec's own words |
| `specThin-01`-`-04` | herding · poor computational skills · age distribution · branding | 1.3, 1.4, 2.6, 3.4 — defined and explained, not named |

### Acceptance checks a verifier can run without this conversation

1. `node scripts/packet-17-consumer-behaviour-demand.mjs --dump` exits 0 and prints no PROBLEMS: no pounds, no
   "Assess"/"Outline"/"Analyse (10)", no UK-only institution, no anchoring/loss-aversion/bounded-rationality,
   no "conditions of demand", no uncited examiner claim and no marker claim, every practice tariff in the
   ECONOMICS census, every diagram figure re-derived from `Q = 1200 − 40P`, ids unique, every Tafari figure in
   the body and in at least one other surface.
2. The staged bundle validates at **0 BLOCK, ≤ 3 DEBT, ≥ 95% coverage** (`--section consumer-behaviour-demand`).
3. `grep -c` on the bundle dump: 0 occurrences of `anchoring`, `loss aversion`, `bounded rational`,
   `conditions of demand`, `Waitrose`, `Outline`, `Assess`, `£`.
4. Exactly three quiz items carry no block, and they are indices 0, 1, 2.
5. Every block has `quizIndices`, `practiceIndices`, and `diagramId` except block 6.
6. `npm test`, `npm run build`, `npm run validate` exit 0; `node audit/scripts/ledger.mjs unverified 17` clear.

### Verify B — 390×844, `/economics/unit-1/consumer-behaviour-demand?draft=1`, signed out

`?draft=1` is dev-only and the SEO block at the top of the page still renders live `data`, so read the app
region with `read_page` or screenshots, never `get_page_text` (packet 16). The script:

1. Pre-test shows and its questions are not repeated by a chapter check-in later in the walk.
2. Step 1 of 30 is "Rational Decision Making and Economic Agents", one heading, its recall below the teaching,
   and "Next" is reachable without a long scroll.
3. Walk to the first check-in: a diagram renders, a quiz item, a practice item, explain-it-back, a takeaway.
4. Chapter 3's check-in diagram shows the five PED values and its second view shows PED along the straight line.
5. A `classify` recall wraps its chips at 390px and the document has no horizontal scroll.
6. Chapter 4's check-in carries the total-revenue table diagram, and the figures on it match the body.
7. Scroll with real input while the app re-renders; the page must not jump back up.
8. Console: no errors from the section's own content.

### Layer 6 — adversarial review (Sonnet, read-only, canary copy, 16 September 2026)

Two defects were planted in a copy of the bundle before the reviewer saw it: a quiz explanation whose
arithmetic contradicted its own marked option (`−5 ÷ 10 = −2.0` beside a key of `−0.5`), and a `$9,600` in the
total-revenue body where the recall, the next subsection, the diagram and an extras chain all said `$9,000`.
**Both were caught**, so the report stands. Census returned: 41 calculations recomputed, 54 cross-surface pairs,
all 24 named leaves checked, 24 recalls, 32 quiz items, 10 practice items, 28 real examples.

Five real findings, all correct, all fixed in `7b83ed9`:

1. **The income and substitution effects are not in the IAL Economics specification.** `grep -i` on
   `audit/raw/econ_spec.txt` returns **zero** hits for "substitution effect", "income effect" and even the bare
   word "substitution"; 2c names diminishing marginal utility as the explanation the specification wants for the
   shape of the demand curve. The paragraph was in the movements subsection and repeated in the Notes. Both are
   gone and the space goes to the DMU link 2c asks for. This is packet 16's "barriers to entry" rule and packet
   13's eight frameworks, a third time: **where the specification supplies no vocabulary for a leaf, teach the
   mechanism in the specification's own words.** Verified independently before acting, not taken on trust.
2. **A classify item had two defensible groups.** "Keeping an account whose fees have risen" never established
   that the buyer knew of a cheaper option, so it read as *habitual behaviour* as easily as *inertia*, which is
   what the group's own `why` says it must not. Now "after reading that a rival charges less".
3. **The PED reorder had two defensible orders.** Converting the quantity change and the price change into
   percentages are independent steps, so a student who did the price first produced a defensible order and was
   marked wrong — Layer 1a's exact complaint. The two are one step now, and a fourth step reads the value against
   1, which genuinely comes last. The `flow` the reorder is sourced from was merged the same way.
4. **Three sentences asserted how papers and extracts are usually built.** "A question rarely wants all six", "a
   data question usually supplies an age breakdown too", "an extract naming two firms rarely says which of them
   the question is about." The runner's frequency regex was written for *how often a paper asks* and did not
   reach *how a paper is built*; it does now (`PAPER_PATTERN_CLAIM`), and all three say what the command word
   requires instead.
5. **A length tell.** On the salt item the correct option ran 54 characters against a longest distractor of 39 —
   inside the validator's 1.5× threshold and still the obvious answer without reading the economics. All four
   options are now the same shape. (Packet 14's Layer 6 found five of these; the threshold is not the test.)

### Verify A (read-only verifier on Sonnet, 16 September 2026 — two rounds)

Round 1 over `bd527e7..7b83ed9`, judging all 32 claimed ids from the bundle, the commit range and
`audit/raw/econ_spec.txt`, with no sight of the build conversation: **31 confirmed, 1 rejected.**

It checked the four refusals against the specification itself rather than taking them on trust, which is
what they are for — `specGap-02` (0 occurrences of "conditions of demand"), `specGap-06` (both halves,
against `:583-589` and `:601-649`), `topFix-02`'s "Assess 10/12" (against Appendix 6 at `:2704-2747`), and
`structure-09`'s income and substitution effects (0 occurrences) — and confirmed each.

**The rejection, `specGap-05`, was correct and the packet was wrong.** The finding asks for elasticities
calculated "from a data table/diagram (IAL routinely gives P/Q tables)" *because* "worked example only in
prose flows" was the defect. The first build answered it with a prose `flow` and two practice stems that
recited the figures in a sentence — the exact format the finding names. The verifier scanned every body
item of all 24 subsections, found no table of any kind, and said so with the paths.

What made the fix non-obvious is the schema, and it rules out the obvious answer. `schema.body-type` allows
`paragraph`, `subheading`, `flow` and `bullets` and nothing else, so a body cannot hold a table; and a
practice item is four plain strings, with `question` rendered into a `<p>`, so newlines collapse and an
aligned stem is not expressible either. **A diagram is the only surface in the schema that can carry a
grid.** So the demand schedule is now drawn as a real three-column table — Fare · Tickets a day · Total
revenue, five rows, every cell generated from `qAt()` and `trAt()` — and it fronts **both** the PED diagram
and the revenue diagram, so it is present at the check-in of each chapter whose practice item reads rows off
it. Subsection 3.2 finds its two rows in the table before doing any arithmetic, both Calculate items send
the student to named rows, and the runner re-derives every cell and fails if the two copies differ.
Checked at 390×844: three columns, five rows, legible, no horizontal scroll (`24a3811`).

Round 2 re-checked that id, and every id whose round-1 evidence the diff had moved, at the new HEAD.

**Two things the verifier said it could not check**, recorded rather than glossed: it did not run `npm test`
(it ran the build, which passed), and it did not re-implement the validator — it read the 0 BLOCK / 0 DEBT /
100% result from the packet's own dry run, which imports the same `lib/content-validator.mjs` that
`npm run validate` does, and spot-checked the individual rules behind each id against the raw bundle instead.

### Verify B — 390×844, signed out, storage cleared, against the staged draft (16 September 2026)

Walked at `http://localhost:3001/economics/unit-1/consumer-behaviour-demand?draft=1`, viewport emulated at
390×844, `localStorage` and `sessionStorage` cleared, no account. `get_page_text` was not used to judge the
app: the SEO block at the top of the page still renders live `data`, so it shows the March content whatever
the draft holds (packet 16's trap, confirmed again here).

| # | Check | Result |
|---|---|---|
| 1 | Section card reads the draft | PASS — "30 steps", "6 topics", "10 questions" |
| 2 | Pre-test serves the unpinned pool | PASS — a signed-out student is sent 2 quiz items and both are the pre-test's own (the demand-curve item and the PED-revenue item); neither is asked again by a check-in |
| 3 | Step 1 of 30, one heading, recall below the teaching | PASS — "CHAPTER 1 OF 6 · Rational Decision Making · part 1 of 4", one `h1`, key idea, body, the three lenses in their filled boxes, then QUICK RECALL — MATCH |
| 4 | Step height at 390px | PASS — 2,398px (the March pairing produced 5,300-5,900px steps) |
| 5 | No horizontal scroll | PASS — `documentElement.scrollWidth` 390 against `innerWidth` 390 at every step checked; the only elements past the fold are inside the tab strip, which scrolls by design |
| 6 | Classify chips wrap | PASS — the 57-character item "Which product line will grow fastest as the economy grows" wraps to two lines inside its card (packet 15's `white-space: nowrap` bug does not recur) |
| 7 | Chapter 1 check-in renders its diagram | PASS — Marginal and Total Utility, bars at $26 / $18 / $11 / $5, falling left to right, "WHAT A CORRECT DIAGRAM SHOWS" heading |
| 8 | Chapter 3 check-in, third view | PASS — "PED along one straight line": the line, the midpoint dot at $15 / 600, "PED = 1 at the midpoint", elastic labelled above and inelastic below |
| 9 | Chapter 4 check-in | PASS — the revenue curve rises, peaks at $15 / $9,000 and falls, with $10 / $8,000 and $22 / $7,040 marked |
| 10 | The 20-mark Evaluate reaches a student | PASS — chapter 6's check-in carries it (`structure-01`: it never showed at all in March) |
| 11 | Spaced recalls come from an earlier chapter, in order | PASS on a clean forward pass — nothing at step 5, then chapter 1's recalls at steps 12, 18, 21 and 26, and chapter 2's at step 30 |
| 12 | Scrolling with real input during a re-render | PASS — clicked Next, then four real wheel scrolls: 0 → 400 → 1,200 on `.tab-content`, monotonic, no jump back to the top (packet 5's `cb6b894`) |
| 13 | Console | PASS — no errors at all across the whole walk; only the HMR and React DevTools notices. Re-run in a **brand-new tab** after the component edit, because the pane keeps console history across navigations: the dev server had logged one `checkinIntro is not defined` from Fast Refresh catching the moment between the two halves of that edit, and it is not in the built code |
| 14 | Step 30 offers completion | PASS — "STEP 30 OF 30", "Complete topic ✓" |
| 15 | Notes and Diagrams tabs | PASS — six Notes topics against the six chapters, all five diagrams in the Diagrams tab, no horizontal scroll on either |
| 16 | Light mode | PASS — the theme toggle remaps the diagram palette through `processSvg`; the revenue curve, its labels and the checklist are all legible. `npm run contrast` clean |

**One defect found and fixed** (`bf62d19`). Every chapter check-in printed the same fixed sentence — "Before
the next chapter: the diagram, a quick question, and one thing from earlier." Chapter 6 has no diagram on
purpose and chapter 1 has no spaced recall, so the page promised things it then did not show. The sentence is
now built from what the step actually renders and disappears when a check-in carries none of the three.
Re-checked at all six check-ins: "the diagram and a quick question" at 5, the full three at 12-26, and "a quick
question and one thing from earlier" at 30.

**One finding this packet cannot fix, measured by A/B rather than reasoned about.** With the section as built,
a signed-out student's check-ins carry **no quiz item at all** — `GET /api/sections/[id]` caps the quiz at
`PREVIEW_LIMITS.quiz` (2) and the pre-test's own two items are now first in the array, so there is nothing left
for the six check-ins. Raising the cap to 40 in `lib/preview-limits.js`, reloading and walking again put a quiz
on all six (the cap was restored immediately; `git diff` on that file is empty). So the pins are right and the
cap is the cause. This is the same freemium-boundary decision packet 16 escalated — the pre-test wants three
items and the free slice is two — and it is the founder's, not a packet's. It is now sharper than packet 16
stated it: the choice is between an honest pre-test and a quiz at the chapter check-ins, and a free student
cannot have both while the cap is 2.

---

## Packet 16 spec — meeting-customer-needs, the Business section students meet first (Opus, 15 September 2026)

Business Unit 1 (WBS11), IAL topic **1.3.1 Meeting customer needs**, `audit/raw/bus_spec.txt:504-544`,
**29 countable leaves** under 6 lettered requirements in three sub-topics: 1 The market, 2 Market research,
3 Market positioning. 123 section opens and **101 of 123 starts stuck on step 0** — the second-worst
abandonment in the product, and the reason this section is next.

State on 15 September, before the packet: 6 blocks · 15 subsections · **0 recalls** · 25 quiz (5 reachable,
19 of 25 correct at position B) · 5 practice · **0 diagrams** · 4 chains; validator **25 BLOCK, 16 DEBT,
86% coverage**.

**V001 does not reach this section, and that was measured rather than assumed.** The handoff asks packet 16
to fix packet 3.1's dropped-bullet bug first or knowingly accept an incomplete oracle. Counting bullet
characters in `bus_spec.txt:504-545` independently: **21 bullets, all of them at line start, and all 29
leaves present in `spec-items.json`**. The builder's line-anchored regex drops nothing in this span, so the
coverage oracle is complete *here*. V001 stays packet 3.1's, unfixed, and the next Business packet must
re-measure rather than inherit this result — Ansoff and Porter's Strategic Matrix are dropped in other spans.

### Six ledger claims the specification refutes or redirects — read before building

Same rule as packets 14 and 15. Every `1.1.x` number in this packet's ledger is **UK GCE Theme 1 numbering**;
the IAL topic is 1.3.1 and the section row already carries it.

1. **`structure-07` is wrong about sampling, and `topFix-04` acts on it.** It calls sampling "not on the
   IAL spec" and `topFix-04` asks to "shrink the sampling block to a single 'sample size and bias'
   subsection". `bus_spec.txt:534-537` reads `d) Sampling methods: • random • quota • stratified` — three
   required leaves. Acting on the claim would delete required content, which is the trap rule 1 exists for.
   The **weighting** half stands: sampling is 3 of 29 leaves and had a whole block of two subsections. It
   gets **one subsection teaching all three named methods**, and sample size and bias stay as a paragraph
   inside it rather than a step of their own.
2. **`structure-06` is wrong: the block order already follows the IAL specification.** It says orientation
   belongs with market research and segmentation is misplaced. In IAL, **product and market orientation is
   3a**, the first leaf of *Market positioning* (`:538`), and **segmentation is 3c** (`:541`) beside
   competitive advantage 3d, differentiation 3e and adding value 3f. The app's blocks 4 and 5 are exactly
   that. Closed as no-change, like packet 15's `structure-11`.
3. **`specGap-05` "limitations of market research (as a topic)" is not a leaf of 1.3.1.** The string
   "limitation" appears eight times in the Business specification and never inside this topic
   (`:906, :908, :1154, :1161, :1165, :1174, :1236, :1242`). It is UK GCE 1.1.2. The **defect it describes
   is real** — `practice[2]`'s guidance demands material the section never teaches, exactly like packet 15's
   `quiz` q24. The fix is in the practice item, not a new subsection: limitations are taught as the
   *evaluation* attached to the research subsections (cost, time, what people say against what they do,
   data going out of date), which is where the AO3/AO4 marks for them actually sit.
4. **`specGap-06` is half-refuted and redirected.** "ICT" appears **nowhere** in the Business specification,
   and neither does "social networking". But `2c` names `• websites/social media` (`:530`) and
   `• databases.` (`:533`) as **secondary research methods**. So the material is required — under the
   specification's own frame, not the UK GCE's "use of ICT". Built as a *Methods of secondary research*
   subsection, which is also what closes `specThin-02`, `specThin-03` and three `spec.uncovered` leaves.
5. **`topFix-01`'s suggested wording is not the IAL command word.** It asks for "What is meant by a niche
   market? (2)". Appendix 6 (`:2213-2215`) names the command **Define**, 2 marks. The tariff in the claim is
   right and the wording is wrong; `practice-01`'s "IAL Business definitions are 2-mark 'What is meant by…'
   items" is wrong the same way. Every practice stem uses an Appendix 6 command word.
6. **`structure-09` and `structure-11` are observations, not defects.** "Takeaways match their blocks well
   (good)"; "misconceptions are genuine student errors — this is a strength, not filler". Both close as
   no-change, and the packet **keeps** those misconceptions rather than rewriting them, having read each one
   against the spec span (the packet-15 rule about retained assets).

`topFix-03` asks for an *interactive* market map ("drag a brand onto price/quality axes"). Packet 7 settled
that: `InteractiveDiagram` is deleted, and the drill appears only on an SVG carrying three or more
`text.draggable` labels. The market map is built as a static SVG with scenarios; no drill labels, because
packets 13.5-13.7 decide the label set per diagram type.

### The shape — six blocks in specification order, 21 subsections

One block per half of a spec sub-topic, one subsection per skill, so no step carries two ideas. Nine of the
fifteen March subsections survive by id; twelve are new.

1. **The Market: Mass and Niche** (1a) — Mass markets · Niche markets · Market size, share and growth
   (worked) · Brands and brand loyalty
2. **Dynamic Markets, Competition and Risk** (1b, 1c, 1d) — Online retailing and how markets change ·
   Innovation, market growth and adapting to change · How competition affects the market · Risk and uncertainty
3. **What Market Research Is For** (2a) — Primary and secondary research · Quantitative and qualitative data ·
   Identifying and anticipating customer needs · Quantifying likely demand (worked)
4. **Research Methods and Sampling** (2b, 2c, 2d) — Methods of primary research · Methods of secondary
   research · Sampling methods
5. **Orientation and Market Mapping** (3a, 3b) — Product and market orientation · Market mapping
6. **Segmentation, Advantage and Value** (3c, 3d, 3e, 3f) — Market segmentation · Competitive advantage ·
   The purpose of product differentiation · Adding value

`quizIndices` and `practiceIndices` on every block, the check-in item first. **27 steps** through
`buildSteps()` (21 teach + 6 check-ins), against fifteen crowded ones today.

**One fictional firm carries every worked figure.** Zuri Juice, a chilled-juice maker, with fictional
rivals Tamu, Mkali, Safi and Halo. The firm is given **no country**: an international cohort needs no
place-claim to follow a market-share calculation, and a fictional firm in a named city is still a claim
about that city's market. Dollars throughout, one currency in the section. Market
$32m last year → $40m this year (growth 25%); Zuri's sales $6m (share 15%); inputs $0.45 a bottle against a
$1.20 price (value added $0.75); a 600-shopper survey with 18% weekly buyers over a 500,000-shopper
population (90,000 buyers, $108,000 a week). Nothing about Zuri is real, so there is nothing to overstate;
real examples in the Real Example cards carry no figure or year unless they carry a source (Layer 4).

### Scope — the 32 ledger ids assigned to packet 16

- **Built:** `topFix-01` `topFix-02` `topFix-03` `topFix-05` · `quiz-01` `quiz-02` · `practice-01`
  `practice-02` `practice-03` · `structure-01` `structure-02` `structure-03` `structure-04` `structure-05`
  `structure-08` `structure-10` `structure-12` · `specGap-01` `specGap-02` `specGap-03` `specGap-04`
  `specGap-07` · `specThin-01` `specThin-02` `specThin-03`
- **Built, against the claim's own remedy:** `topFix-04` (sampling shrinks to one subsection, it is not
  removed), `structure-07` (weighting rebalanced, sampling kept), `specGap-05` (limitations taught as
  evaluation and the practice guidance fixed, no off-spec subsection), `specGap-06` (built as secondary
  research methods, not as "use of ICT")
- **Closed as no-change, with the spec line:** `structure-06`, `structure-09`, `structure-11`
- **Nothing deferred to a later packet.** No ids minted: all four uncovered leaves already have one.

### Acceptance checks a verifier can run without this conversation

1. `node scripts/packet-16-meeting-customer-needs.mjs --dump` prints no PROBLEMS and no new BLOCK, and
   writes the bundle to `audit/snapshots/packet-16-bundle__business__meeting-customer-needs.json`.
2. Against that bundle: 6 blocks, 21 subsections, 21 recalls across all four contract types (6 fill-in,
   5 classify, 5 reorder, 5 match), every recall with a `why`, every fill-in with 2-3 distractors; **37 quiz**
   with exactly three unpinned and those three **first** in the array; 8 practice; 5 diagrams, every one
   pinned to a block by `diagramId`. "Reachable" means what the engine actually does: one pinned quiz item
   opens each chapter check-in (`resolvePinnedItem` returns one), the three unpinned items are the pre-test,
   and the whole bank is the Quiz tab and the post-test. Every item belongs to a block, which is what
   `structure-05` was about; no item belongs to none.
3. Every practice `command` is in `audit/raw/tariff-census.json` for **business**, its `marks` match, and no
   guidance above 6 marks contains `(n marks)`. No "Outline" anywhere in the bundle. No "Examine" (that is
   Economics). Assess is **10**, this being Unit 1.
4. Every one of the 29 leaves in `spec-items.json` for `business` `1.3.1` is evidenced: the section validator
   reports **100% coverage, 0 BLOCK**, and DEBT only from `terms.later-unit` ("niche markets" is also a Unit 4
   sub-topic label — a lint false positive on a leaf the spec puts at `:508`) and `quant.unit` (no WBS11 drill
   template until packet 13.2).
5. `£` appears nowhere; `$` figures agree across body, diagrams, notes, quiz and practice: `40`/`32`/`25%`,
   `6`/`15%`, `0.45`/`1.20`/`0.75`, `600`/`18%`/`500,000`/`90,000`/`108,000`.
6. No sentence asserts what examiners reward, expect or penalise without a citation (15 do today).
7. `npm test`, `npm run build`, `npm run validate` exit 0; `node audit/scripts/ledger.mjs unverified 16` is clear.

### Verify B — 390×844, `/business/unit-1/meeting-customer-needs`, signed out

The section is **NOT published** (see the publish hold below), so Verify B runs against the staged draft via
the section preview, and the script is about what the student ends up with:

1. Open the section, storage cleared. The pre-test offers **three** questions, and every one is on material
   the section teaches. Step 1 of 27 is "Mass Markets", one heading, and **Next is reachable without
   scrolling past the recall**.
2. Walk to the chapter 1 check-in. The student sees the market-share diagram, one quiz question, one practice
   question, a takeaway, and no spaced recall (there is no earlier chapter).
3. On the chapter 2 check-in a **spaced recall from chapter 1** appears with its cue, in a different start
   order from its first showing.
4. On the chapter 5 check-in the **market map** renders at card width, its scenarios step through plotting,
   the gap and the demand caveat, and the pinch-zoom sheet opens.
5. Every classify recall's chips **wrap** — no horizontal scroll on the document at any step (the packet-15
   regression).
6. Finish the section. The completion screen names the recall score and any skips, and "Complete topic ✓" is
   offered on step 27.


### Layer 6 — adversarial review (Sonnet, read-only, canary copy, 15 September 2026)

Two defects were planted in a copy of the staged bundle before the reviewer saw it: a quiz explanation
whose arithmetic (20%) contradicted its own marked option (25%), and a notes takeaway reading
`$1.20 − $0.45 = $0.85`. **The reviewer caught both**, so the report stands. Census: 40 calculations
recomputed, ~45 contradiction pairs, 21 of 21 recalls, 37 of 37 quiz, 8 of 8 practice, 21 real examples.

Five real findings. Three fixed:

1. **~13 sentences asserting what a marker awards or withholds** — "an unlabelled axis costs marks no
   commentary recovers", "earns half the marks", "a plotted point without its brand name earns nothing".
   This is `claim.uncited`'s own class one step out: that rule fires only on the word *examiners*, so the
   identical claim passes the validator whenever it is phrased without them. Every one now says what the
   **command word requires** (Appendix 6 states that, so it can be cited) instead of what a marker does,
   and the runner refuses the class by regex so it cannot come back.
2. **"Barriers to entry" appears nowhere in the Business specification** (`grep -i barrier
   audit/raw/bus_spec.txt`: four hits, all other topics — "Barriers to entrepreneurship" at :768, trade
   barriers, an access phrase). It is in the *Economics* spec at :1386 and :1425. It was load-bearing in
   11 places here, including a quiz item whose answer turned on the label. Reduced to two asides that name
   it as the term the Economics papers use, and the quiz item now tests the mechanism ("a patent prevents
   rivals copying, so new firms cannot enter") rather than the vocabulary.
3. **The sampling diagram's stratified and quota panels** drew their dashed subgroup lines across the rows
   of dots rather than between them, so the selections read as 2, 2, 1, 1 from four equal subgroups —
   understating "in proportion to its size", which is the diagram's own checklist item. One line between
   each row now, one pick per subgroup in both panels, and the difference a student sees is the only
   difference there is: scattered inside the row for stratified, always the nearest person for quota.

Two not acted on, with reasons: the reviewer read the canary copy, which was dumped before the quiz array
was reordered, so its "quiz 34/35/36 reach nothing" is answered by design — those three are the pre-test
and are now first in the array (see Verify B below). And it flagged the market-growth formula as taught
under spec 1a when "market growth" is a 1b phrase; the calculation is QS2 (Appendix 7) and share is
meaningless without it, so it stays beside size and share, and chapter 2 teaches what *drives* growth.


### Verify A (read-only verifier on Sonnet, 15 September 2026 — three rounds)

**Round 1 judged all 32 correctly and recorded none of them.** The agent type available for the verifier
was a read-only search agent, and `ledger.mjs confirm` writes a file, so it declined to run a single one.
Its reading was sound; the pass had to be re-run by an agent that could write. PROTOCOL now says the
verifier's type must be able to write `audit/ledger.json` and nothing else (own commit, `bcde0b8`).

**Round 2 rejected four**, and all four rejections were correct — checked against the artefact, not
accepted on the verifier's word:

- `topFix-01` — the item asks for a 4-mark AND an 8/10-mark item for each of market research, market
  mapping/positioning and adding value. The 8-item set covered none of the three pairs: research had
  Discuss 8 and Assess 10 and no 4, mapping had Construct 4 and no 8/10, adding value had only the
  20-mark Evaluate. Four items added; the set is 12 and every named topic has its pair.
- `topFix-02` — the item names a word-bank fill-in on the risk-and-uncertainty **definitions**, "with
  non-interchangeable terms". It was built as a `classify`, which tests membership: a different skill, and
  one the uncertainty quiz item already covers. Built as asked.
- `topFix-05` — five absolute-word distractors survived the rewrite ("guarantees … never", "always has
  negative outcomes", "always carried out on the wrong people", "the cheapest producer always wins",
  "definitely want"), each eliminable without reading the stem. Replaced with wrong answers students
  actually hold. Three options containing *only* / *all* / *impossible* are kept deliberately, because
  each is the misconception under test rather than a give-away, and round 3 was asked to judge that
  argument on the merits rather than take it.
- `structure-10` — one two-step `flow` survived, drawing the product-against-market-orientation contrast
  as if it were a causal chain. It is bullets now. A flow is for a sequence.

Round 2's own note is worth carrying: it checked the three UK-GCE-numbered items (`structure-06`,
`structure-07`, `topFix-04`) against `bus_spec.txt:534-541` itself and confirmed the packet's reading
rather than penalising it for not following a remedy the specification refutes. That is the rule working
in both directions.

**Round 3** re-verified the four, confirmed three and rejected `topFix-05` again, naming two absolute-word
distractors — one the previous pass had never touched ("it spends nothing on advertising its products",
whose own explanation had to *rebut* it, which is the tell) and one this packet had deliberately kept and
argued for ("entry becomes impossible without an established brand"). The second rejection is the
interesting one: the argument for keeping it was that its explanation exists to answer it, and round 3's
counter — that it inflates a true directional claim into an absolute, exactly like the options already
replaced, and is crossed out without reading the stem either way — is better. Both replaced. The
distinction worth teaching survives in the explanation: a brand makes a market harder to WIN in, not more
expensive to ENTER, which is what that question asks.

**Round 4** confirmed `topFix-05` after scanning every option of all 37 items independently rather than
taking the commit's word for "zero left", and found two further "only" options the commit had not
mentioned, testing both on the merits and accepting them. **Round 5** re-checked it at HEAD, because the
artefact moved after round 4's confirmation: the item's last clause asks for the adding-value question's
correct option to read as a *difference* rather than a price rise, and it still read as a rise. Rewriting
it failed the gate twice in one run — `quiz.long-correct` at 76 chars against a 46-char distractor, then
`quiz.near-dup` against "why is the value added not the same as the profit" — which is the gate doing its
job on the builder rather than on the March content.

Changed surfaces were re-walked at 390×844 before each hand-back: step 9's recall renders as FILL IN THE
BLANKS with four blanks and `certainty` / `forecast` as the distractors, step 20 carries no flow element
at all, and the Practice tab reports 12 questions.

**Five rejections across the rounds, all five correct.** The pattern worth carrying: every one was a clause
of a multi-part item that the builder had partly satisfied and read as satisfied. Verify the clauses
separately, and count them.

### Verify B — 390×844, signed out, storage cleared, against the staged draft (15 September 2026)

The section is not published, so the walkthrough ran against `?draft=1` — a dev-only flag added by this
packet, since nothing on the student path reads `draft` and three finished sections are now held back.

What the student ends up with, step by step:

1. **Overview**: "Learn Mode · 27 steps", Notes 6 topics, Practice 8 questions, section 1.3.1.
2. **The offer**: "Want a quick check first? **Two** questions…" — and two is what arrives. It said
   *Three* before this packet; see the defect below.
3. **Pre-test**: two questions, neither of them one a chapter later asks again. Answered both with real
   taps: **2 / 2 correct**, and the answers are withheld (F008) rather than revealed.
4. **Step 1 of 27**, chapter 1 of 6, part 1 of 4, one heading ("Mass Markets"), Next reachable in the
   sticky bar without scrolling. Scrolled to the recall: a three-blank fill-in, five chips (three answers
   and two distractors), Show hints, Check answers, a visible Skip. Tapped blank → chip three times:
   **"✓ All correct!"**
5. **Step 2**: the classify. Six statement chips, the longest 47 characters, **all of them wrap** onto two
   lines and `document.scrollWidth` stays 390 against a 390 viewport — the packet-15 regression does not
   recur on longer items.
6. **Step 5, chapter 1 check-in**: the market-share diagram renders at card width with $32m and $40m bars,
   "growth 25%" on the arrow between them and Zuri's $6m block inside the second; one quiz question; the
   Define (2 marks) practice with its guidance, an answer box and a Pro lock on the model answer; Explain
   it back; the chapter takeaway. No spaced recall, correctly — there is no earlier chapter.
7. **Step 10, chapter 2 check-in**: "**RECALL FROM CHAPTER 1 · Mass Markets**", the chapter-1 fill-in
   returning with its cue and a **different chip order** (volume, margin, premium, cost, standardised
   against standardised, cost, premium, volume, margin the first time).
8. **Step 22, chapter 5 check-in**: the market map at card width, all five brands plotted and named with
   Zuri picked out, both axes labelled with the variable and its direction, and the three scenarios
   stepping through plotting → the gap → the demand test. "Tap to enlarge" present.
9. **Step 27**: "Complete topic ✓" offered, and the completion screen names the six chapters in
   specification order with a score breakdown.

No horizontal scroll at any step. Console: two `401` from `POST /api/learn-mode/state`, which is a
signed-out student hitting the server-side learn state — pre-existing, not this packet's, and noted below.

**Three defects found here, all fixed:**

- **The pre-test served a signed-out student two PINNED questions.** `GET /api/sections/[id]` caps a free
  student's quiz at `PREVIEW_LIMITS.quiz` (2) since F086, and `PreTest.jsx` takes the first three
  *unreserved* items of whatever it is given. With the three unpinned items at the END of a 37-item array,
  the two a free student received were both pinned — so the pre-test asked a question the chapter-1
  check-in asked again minutes later, which is exactly the defect F079 removed. It has been true for every
  signed-out student since F086, and packet 15's rule ("the three unpinned items ARE the pre-test") is
  therefore only true for a Pro one. Fixed in content: the three sit first, so the free slice is drawn
  from the pre-test's own pool.
- **"Three questions" when two are shown.** `LearnModeTab.jsx` hardcoded the word. It is computed now,
  and the offer does not appear at all when there are no questions to offer.
- **"What examiners look for"** heads the checklist beside every diagram in the product
  (`DiagramsTab.jsx`, `learn-mode/InlineDiagram.jsx`) — the uncited claim about marking, printed by the
  app itself over content the gate cleans. Now "What a correct diagram shows".

### The publish hold

**Nothing in this packet is published.** DECISIONS 2026-09-15: content authored to the packet-7 recall
contract crashes `main`, because main's `ReorderRecall` reads `recall.shuffled` in a `useState` initialiser
and this packet's reorders do not carry it. Packet 15 took the most-opened section in the product down that
way. The bundle is staged as `draft`, the ledger is claimed on the staged bundle, and the publish command is
handed to the founder for the packet 5/7 checkpoint:

```
node scripts/packet-16-meeting-customer-needs.mjs --stage
node scripts/publish-section.mjs meeting-customer-needs --confirm
```

Because nothing is published, **`audit/validator-baseline.json` is not rewritten by this packet**: the live
row is unchanged, so its 41 baselined findings are still true of what students see. The baseline shrinks by
this section's own keys at the checkpoint, in the same session that publishes.

---

## Previous handoff — after packet 15 (written 15 September 2026, superseded)

**Next is packet 16, `meeting-customer-needs`** (Business Unit 1, WBS11, IAL topic **1.3.1** — the Business
1.3.1, not the Economics one this packet did; 123 section opens; 32 ledger items; 27 spec leaves covered,
5 thin, 3 missing). **On Opus, in a NEW session.** No remaining packet needs Fable.

### Do this before anything else

1. **Fix V001 (packet 3.1) first, or knowingly accept an incomplete oracle.** `audit/scripts/build-spec-items.mjs`
   matches bullets with `/^\s*[•●▪‣]\s*(.*)$/`, anchored to line start. The extracted specification puts the
   left-hand topic-title column on the same line as a list's first bullets, so **60 bullets are dropped — 31
   Economics, 29 Business.** `spec-items.json` is what `spec.coverage` and `spec.uncovered` compute from, so a
   section can report 100% while never teaching them. Business loses Ansoff's Matrix and Porter's Strategic
   Matrix among others, which matters directly to a Business packet. Fixing it changes the leaf count for all 43
   sections and will add `spec.uncovered` DEBT in many, so read the baseline diff before confirming, and do it
   in its own commit, not inside a section packet.
2. Read `PROGRESS.md`, `DECISIONS.md`, this file and `PROTOCOL.md`, then `ledger.mjs packet 16 --open`.
3. **Check every scope claim against the spec text before acting on it.** Packet 14 found four wrong, packet 15
   found four more. `audit/raw/bus_spec.txt` is the oracle; a number in a finding is a hypothesis.

### The template, as it stands after two sections

Copy `scripts/packet-15-*.mjs` (or packet 14's — they are the same shape) and rename. The runner is the first
reader of the section: it prints every subsection's word count against the 350 budget, refuses on the section's
own banned phrases, checks each practice command word and tariff against `audit/raw/tariff-census.json` for the
subject, re-derives any property a diagram asserts, checks the worked figures agree across surfaces, validates
the whole bundle against the baseline and stages through `stageBundle()`. `--dump` writes the bundle for the
verifier. Lifecycle: read the spec span → check every ledger item against it → write the spec block here →
snapshot → author → dry run to 0 BLOCK and 0 new DEBT → stage → preview the SVGs → Layer 6 on a canary copy →
fix → re-stage → publish (**ask the founder in-session**) → census, validate, baseline diff read then confirmed,
pin-check → claim → Verify A and Verify B → gate → commit → push → handoff.

### What packet 15 learned that packet 16 needs

1. **Only a CHECK-IN step carries a diagram, and it comes from the BLOCK** (`lib/learn-steps.js:44-55`).
   A `diagramId` on a subsection is never read, so a diagram pinned there is reachable only from the Diagrams
   tab. One diagram per chapter, with extra views as scenarios on it — packet 15's chapter 4 carries five.
2. **The packet audits what it KEEPS, not just what it writes.** Layer 6's two worst findings were both in
   retained March assets: two flashcards defining a term taught nowhere, and an SVG placing "UK" at the exact
   midpoint of a spectrum for an international cohort. No automated check sees either.
3. **A widget is only proven by content that stresses it.** Classify chips could not wrap at 390px because
   `.lm-word-chip` carries `white-space: nowrap` for fill-ins. Packet 7's fixtures and packet 14's items were
   all short enough to hide it. Before authoring long recall items, check they fit: a chip is about 7.2px per
   character plus padding, so past ~45 characters it must be able to wrap.
4. **Leave exactly three quiz items unpinned.** `PreTest.jsx` takes the first three unreserved items in array
   order, so those three ARE the pre-test. A fourth reaches nothing.
5. **Where a diagram asserts a mathematical property, generate it from the property and verify the output.**
6. **`npm run validate` is a whole-database gate in a shared worktree.** Another packet's live content can block
   yours. Record your baseline write by section (`+0 −78` here), not by total, so a concurrent write is
   distinguishable. Stage files explicitly; never `git add -A`.
7. **Write the Layer 6 brief's spec span from the last leaf**, checked against `spec-items.json` — packet 15's
   was one line short and the reviewer correctly reported a whole subsection as out of scope.
8. Count acceptance-script step numbers through `buildSteps()`, not from the block list.

### Exit criteria for packet 16

Section validator 0 BLOCK, DEBT ≤ 3, coverage ≥ 95%; every quiz item and diagram reachable; practice at IAL
**Business** tariffs (Assess exists in Business, Examine does not); `npm test`, `npm run build`, `npm run validate`
exit 0; census PASS; baseline smaller by this section's own keys; `ledger.mjs unverified 16` clear; Verify A and
Verify B reports written up here.

---


## Packet 15 spec — introductory-concepts, the section students meet first (Opus, 15 September 2026)

Economics Unit 1 (WEC11), IAL topic **1.3.1 Introductory concepts**, `audit/raw/econ_spec.txt:510-568`,
25 countable leaves in six sub-topics: 1 the nature of economics, 2 positive and normative economics,
3 scarcity, 4 production possibility frontiers, 5 specialisation and the role of money and financial
markets, 6 free market, mixed and command economies. Grade C in March. **192 section opens and 167 of
192 starts stuck on step 0** — the worst abandonment in the product, and the reason this section is next.

State on 15 September, before the packet: 5 blocks · 9 subsections · 9 recalls (5 reorder, 4 fill-in, 0
match, 0 classify, types strictly alternating) · 25 quiz · 5 practice · 3 diagrams · 4 chains; validator
**25 BLOCK, 53 DEBT, 64% coverage**. The prose is sound; the scaffolding is not.

### Four ledger claims the specification refutes — read before building

Same rule as packet 14: a scope or numbering claim in a finding is a hypothesis until the spec line is read.

1. **`structure-11` is wrong and nothing is renumbered.** It says the app's `1.3.1` "is not IAL spec
   numbering (IAL Unit 1 topic 1.1 'Scarcity, choice and potential conflicts')". `econ_spec.txt:510` reads
   `1.3.1 Introductory concepts` — the app's number *and* the app's title are the specification's own.
   The claim is UK GCE reasoning, exactly the "relabel as 3.3" trap of packet 14. Closed as no-change.
2. **`specGap-01` (factors of production *and their rewards* — rent, wages, interest, profit) is off-spec.**
   No leaf of 1.3.1 requires it; the spec's phrase is "finite resources" (3a). "Rewards to factors" appears
   nowhere in Unit 1. The *defect* it describes is real but belongs to the quiz: `quiz-03`'s q24 tests
   untaught, unrequired material and is **deleted**. The four factors are named in one sentence inside 3a
   as the standard classification of resources — that is what makes "capital goods" mean something in 4c/4d —
   and no rewards subsection is built.
3. **`specGap-07` half-refuted.** "No reference to Hayek or Marx alongside Smith, which the spec names" —
   the IAL spec names **Adam Smith only** (`econ_spec.txt:540`). Marx does not appear in the document at all;
   Hayek appears once, at `2636`, in a general co-teaching note, not as a requirement. Smith is taught, Marx
   and Hayek are not added. The other half is valid: 6c "the role of the state in a mixed economy" is one
   sentence and gets its own subsection.
4. **`specGap-06`: comparative advantage is not Unit 1.** 5a asks for "the advantages and disadvantages of
   specialisation and the division of labour in organising production; Adam Smith's views". No comparative
   advantage anywhere in 1.3.1. So the advantages *and disadvantages* are taught properly and the unexplained
   comparative-advantage wording is removed from `extras`, not explained.

`structure-07` cites "1.2.7" for the price mechanism, which is UK numbering, but its recommendation is right
for the right reason: rationing, incentive and signalling are **1.3.4 Price determination**
(`econ_spec.txt:707-709`), a different section that already exists. The price-mechanism material is trimmed
out of the Economic Systems block, leaving 6a/6b/6c.

### The shape — six blocks in specification order, 18 subsections

One block per spec sub-topic, one subsection per skill, so no step carries two ideas. This is the step-0 fix:
nine 5-interaction mega-steps become eighteen small ones.

1. **The Nature of Economics** — Economics as a social science (1a) · Models, assumptions and ceteris paribus (1b, 1c)
2. **Positive and Normative Economics** — Testable statements and value judgements (2a) · Value judgements in policy (2b)
3. **Scarcity, Choice and Opportunity Cost** — Unlimited wants and finite resources (3a) · Renewable and non-renewable resources (3b) · Scarcity and opportunity cost (3c) · Free goods and economic goods (3d)
4. **Production Possibility Frontiers** — Reading the PPF (4a) · Opportunity cost through marginal analysis (4a·4, worked) · Movements along and shifts in the PPF (4b, and growth/decline) · Capital goods and consumer goods (4c, 4d)
5. **Specialisation, Money and Financial Markets** — Specialisation and the division of labour (5a, Smith, both sides) · The functions of money (5b) · The role of financial markets (5c, all five bullets)
6. **Free Market, Mixed and Command Economies** — The three systems (6a) · Advantages and disadvantages (6b) · The role of the state in a mixed economy (6c)

`quizIndices` and `practiceIndices` on every block, the check-in item first. 24 steps in all (18 teach + 6 check-ins).

### Scope — the 32 ledger ids assigned to packet 15

- **topFix-01, structure-05**: 18 recalls, one per subsection, across all four contract types — no
  mechanical alternation and no recall that is a visible flow retyped. The four named reorders become the
  exercises the item asks for: efficient/inefficient/unattainable point tagging, shift vs movement sorting,
  positive vs normative classification, benefit vs risk sorting. Reorders **paraphrase** a flow in their own
  subsection in the same order, which satisfies `reorder.source` without measuring copying. The item's other
  half — "make fill-in matching stem-tolerant so 'signalling'/'ought' are accepted" — is **obsolete under
  packet 7's recall contract**: a fill-in is a chip bank (`lib/recall-widgets.js:200-207`) graded by
  `gradeFillin` on the chip's own text (`209-215`), so there is no free text to be intolerant of. Recorded, not built.
- **topFix-02, structure-01, structure-06, quiz-01, quiz-02, quiz-03**: the quiz bank rebuilt to ≥28 items,
  every one reachable. Near-duplicates deleted (q13 of q3, q19 of q9, q11 of q2, q23 of q3, one of q0/q12/q17).
  q8 (free good) **kept and now taught** by 3d. q15 rewritten from "factor of production classified as capital"
  to capital goods vs consumer goods, which is 4c. q24 (the entrepreneur's reward) **deleted** — off-spec, see above.
  Retained items keep their ids. Answer positions balanced by hand (currently 16/64/12/8).
- **structure-06, second half**: the pre-test draws the first three *unpinned* items in array order — stable
  since F079, not random (`components/learn-mode/PreTest.jsx:17-28`) — so three representative, definitely-taught
  items are placed at the front of the unpinned run by construction. The post-test re-asking an item is
  deliberate (`PostTest.jsx:28`, priority by what was got wrong) and is not changed.
- **topFix-03, accuracy-01, specGap-05**: the Base PPF redrawn as a single concave curve whose gradient
  steepens monotonically (the current path bulges convex between C and D while the checklist tells students a
  PPF is concave and `mistakes[2]` says they lose marks for drawing it that way), and a worked
  marginal-opportunity-cost calculation read off its own axis values in subsection 4.2.
- **accuracy-02**: the China 1990 example is rewritten or replaced. As written it says China "operated well
  inside its PPF" and then "by shifting labour into manufacturing and **investing in capital**, China moved
  closer to its frontier" — investment in capital shifts the frontier, so the example muddles the exact
  distinction subsection 4.3's misconception warns about.
- **topFix-04, structure-02, structure-03**: every diagram and every practice item reachable. The **Circular
  Flow of Income diagram is deleted** — it is Unit 2 (WEC12) macro content and off-spec here. Five diagrams,
  each pinned: scarcity → choice → opportunity cost (block 3), the concave PPF with its three point types and
  the calculation's values (block 4, **keeping the March PPF diagram's id — topFix-03 says redraw, not
  replace**), movements along versus shifts of the PPF (block 4), money and the double
  coincidence of wants (block 5), the retained Economic Systems Comparison (block 6). Blocks 1 and 2 carry
  flows rather than a diagram: a drawing of "a model" would be decoration, and `pins.diagram` only requires
  that a pin resolves.
- **topFix-05, practice.command, practice.tariff, practice.levels**: the practice set rebuilt to the IAL
  **Economics** command words and their own tariffs from Appendix 6 (`audit/raw/tariff-census.json`):
  Define 2 · Calculate 2 or 4 · Draw 4 · Explain 4 · Analyse 6 · Examine 8 · Discuss 14 · Evaluate 20.
  There is no **Assess** and no **Outline** in IAL Economics, so practice[2] and practice[4] cannot stand as
  written. **All five March items keep their ids and their subjects**, re-commanded to a tariff the subject
  actually uses: Define (4)→(2) opportunity cost, Explain (6)→(4) the basic economic problem, Outline (4)→
  Explain (4) on modelling assumptions, Assess (10)→**Examine (8)** on the usefulness of a PPF diagram, and the
  20-mark Evaluate unchanged but with an explicit judgement on the word "always". Four more are new — a
  Calculate, a Draw, an Explain on positive and normative, an Analyse on the state — for nine in all, and
  guidance above 6 marks is levels-shaped and allocates no "(n marks)".
- **specGap-02** (free vs economic goods), **specGap-03** (renewable vs non-renewable), **specGap-04**
  (capital vs consumer goods and the consumption-versus-growth trade-off, currently only in the paywalled
  extras chain): each becomes its own subsection, taught in Learn Mode, not only in extras.
- **specGap-09, specGap-10, specGap-11** and **two minted this packet**
  (`C-introductory-concepts-specGap-12`, `-13`): 5c is entirely absent today and has **five** bullets, not the
  three the ledger holds. Subsection 5.3 teaches all five — to facilitate saving, to make funds available to
  businesses and individuals, to facilitate the exchange of goods and services, to provide forward markets in
  commodities and currencies, to provide a market for equities — each in a notes item using the
  specification's own phrase, per the lexical coverage rule.
- **specGap-06** (both sides of specialisation), **specGap-07** (the state's role in a mixed economy): built
  as above, without comparative advantage and without Marx or Hayek.
- **specGap-08** (economic agents and their objectives): **reassigned, not built.** Consumers maximising
  utility and firms maximising profits is 1.3.2·1 (`econ_spec.txt:580-582`), the `consumer-behaviour`
  section's own topic. Moved to that section's packet rather than taught twice.
- **structure-04**: closed by the shape above — 18 subsections means one idea per step.
- **structure-08**: block 4's takeaway name-checks the pin factory while its quiz q4 tests Smith's three
  reasons, which the body never lists. The three reasons (dexterity, time saved switching tasks, the
  introduction of machinery) go into 5.1's body so the question is answerable from the teaching.
- **structure-09**: the "economics is not a real science because it cannot predict" misconception is filler
  whose "Instead write" is just the keyIdea; it is rewritten so the correction says something the keyIdea
  does not. Verify A's caveat is fair and recorded: this is a sharper version of the same predictive-accuracy
  misconception, not a swap to an unrelated one. The other six
  are genuine and are kept in substance.
- **structure-10** ("difficulty ramp is sensible") and **structure-11**: claimed as no-change, with the
  ordering now the specification's own.
- **claim.uncited (11) and locale.institution (8)**: not ledger items but BLOCKs in the way. Every
  "examiners want / penalise / expect" sentence is rewritten to say what the command word and the mark scheme
  require, or carries a source. Every UK-only institutional frame (NHS ×4, Bank of England, ONS, HS2) is
  replaced — this is an IAL cohort sitting the paper in Hong Kong, Singapore, Malaysia and Pakistan.
  Target: **0 of both**, not "at least half" as `topFix-05` asks.
- **Currency**: one per section. The section currently mixes GBP and USD; it becomes **US dollars**
  throughout, matching the international examples.
- **The worked figures**: one fictional economy, **Maraya**, carries the PPF numbers across the body, the
  diagram's axis values, the notes chapter, the Calculate practice item and the quiz explanations, checked
  by string in the runner.

Deliberately not in this packet: the quant drill wiring (13.2); diagram label drills (13.5-13.7); the
public Unit 1 landing copy, which belongs to packet 57 with D014.

### Acceptance checks a verifier can run without this conversation

1. `node audit/scripts/validate-content.mjs --section introductory-concepts` → 0 BLOCK, DEBT ≤ 3, 0 new
   against the baseline; `spec.coverage` = 100% (was 64%); `section.counts` reports 6 blocks · 18 subsections
   · 18 recalls using all four types · ≥28 quiz · 9 practice · 4 diagrams, every one pinned to a block.
2. `node audit/scripts/pin-check.mjs --section introductory-concepts` → 0 broken pins; every quiz index,
   practice index and diagram pinned by exactly one block, and `pins.identity` clear.
3. `node audit/scripts/packet-13-census.mjs` → exit 0.
4. Live content: no `£`, no "Assess", no "Outline", no "comparative advantage", no "signalling"/"rationing"/
   "invisible hand", no NHS / Bank of England / ONS / HS2, no sentence asserting what examiners do without a
   citation, every subsection's teaching text ≤ 350 words (the runner prints the count).
5. The Base PPF path is concave: sampling it left to right, |dy/dx| increases monotonically. The
   opportunity-cost calculation in 4.2 uses that diagram's own axis values and the same numbers appear in the
   notes and in the Calculate practice item.
6. Every practice command word and tariff appears in `audit/raw/tariff-census.json` for `subject: economics`.
   Compared with `audit/snapshots/2026-09-15-pre-packet-15__*`, **no flashcard, practice, mistake, subsection
   or diagram id is dropped** except the Circular Flow diagram, and the only quiz ids dropped are the six
   deleted on purpose (`572fb5f6`, `7639d863`, `76124830`, `18140b14`, `083ad70a`, `1d667998`).
7. `npm test`, `npm run build`, `npm run validate` exit 0; baseline rewritten smaller.

### Layer 6 — adversarial review (Sonnet, read-only, canary copy, 15 September 2026)

**Both canaries caught, so the report stands.** The planted defects were a quiz explanation that divided the
opportunity-cost ratio backwards (10 ÷ 8 = 1.25 against a key of 0.8) and a notes coordinate reading D (30, 27)
against D (30, 25) everywhere else. The reviewer found both and reasoned each out from the surfaces that
contradicted it, rather than from the arithmetic alone. Census: 18/18 subsections, 6/6 notes chapters, 32/32
quiz, 8/8 practice, 34/34 cards, 5/5 diagrams across 8 SVG images and 115 `<text>` nodes, 6 chains, 8 mistakes;
14 calculations recomputed, 121 cross-surface pairs examined, one web search.

Six real findings. **Four fixed:**

1. *(critical)* **Allocative efficiency was on two flashcards and taught nowhere.** Cards `4632212e` and
   `90c9a274` — both kept from March — defined a term with 0 occurrences anywhere else in the bundle and no
   leaf in 1.3.1; 4a asks only for "efficient or inefficient allocation of resources", which the section
   teaches as productive efficiency and the on/inside/beyond distinction. The reviewer's fix was to delete one
   card; packet 13's rule is that flashcards are **rewritten in place, never deleted**, because ids are stable
   and progress rows point at them, so both were rewritten onto material the section does teach ("What does
   the PPF show about efficiency?" and "What does a point beyond the PPF represent?").
2. *(major)* **Default-UK framing inside the one retained SVG.** The March economic-systems diagram put "UK"
   at x=250 — the exact midpoint of a spectrum bar running 50 to 450 — in the same `#3b82f6` as the "Mixed"
   label itself, with "USA" beside it, while the block's own text names Hong Kong, Singapore, the Nordic
   economies and North Korea. The diagram was presenting the UK as the canonical mixed economy to a cohort
   sitting the paper in Hong Kong, Singapore, Malaysia and Pakistan. `locale.institution` cannot see this: it
   matches institutions, not country framing, and the text nodes are inside a retained asset. Markers are now
   Hong Kong, Singapore, Sweden and North Korea — every one named in the block's text — and no country sits
   at dead centre, which is truer to the claim that every real economy is mixed.
3. *(major, partially upheld)* **A fourth unpinned quiz item.** The reviewer read the unpinned items 6, 13, 22
   and 29 as "the same off-by-one, four times over". Three of them are deliberate — `PreTest.jsx` takes the
   first three unreserved items in array order, so those three ARE the pre-test — but the reviewer was right
   about the fourth: item 29 could never reach the pre-test, which slices at three, so it was simply a
   question no block surfaced, which is `structure-01`'s complaint in miniature. Item 29 is now pinned.
4. *(minor)* **One example reused for two unrelated concepts.** Mobile payments illustrated both the functions
   of money and an outward PPF shift. The PPF-shift subsection now uses rural electrification, which is a
   change in the resources available rather than a rewording of the same story.

**Two not acted on, with reasons:**

5. *(major, as briefed)* The reviewer flagged the whole "Role of the State" subsection and its six dependents
   as outside the authorised span, because the brief gave `econ_spec.txt:510-568` and 6c sits at **569**. The
   brief was one line short; 6c is a genuine leaf (`ECON-1.3.1-6c`, lines [569,569]) and the reviewer said as
   much — "most likely a truncation, since it cuts the numbered list of six mid-item". No content change.
   **Next section packet: check the span's last line before writing the brief.**
6. *(minor)* The four factors of production and the what/how/for-whom trio are not in 3a's literal wording.
   Both are standard vocabulary that the spec's own "finite resources" and "who decides" rest on, and the
   four factors are what make "capital goods" mean anything in 4c/4d. Kept, as recorded in DECISIONS.

After the fixes: "allocative" 0 occurrences, no UK marker, 34 cards with all 18 March ids intact, validator
still 0 BLOCK / 0 DEBT / 100%, `npm test` 132/132, census PASS, and the independent arithmetic re-check
(a quadratic fitted through only three of the points the *text* names) still recovers every labelled point.

### Verify B — 390×844, `/economics/unit-1/introductory-concepts`, signed out

1. Overview shows 24 steps (18 teach + 6 check-ins); tap Learn.
2. Step 1 "Economics as a Social Science": one heading, chapter eyebrow "CHAPTER 1 OF 6 · The Nature of
   Economics · part 1 of 2", key idea, teaching text, then ONE recall below the teaching. No UK institution
   anywhere on the step. Next sits in the sticky footer, so it is visible at every scroll depth.
   Step 4 is the positive/normative classify; its six items must each WRAP inside 390px, with the document's
   scrollWidth equal to its clientWidth — the packet that wrote them was the first content able to overflow it.
3. Scroll with real wheel input while the step is re-rendering: the page does not jump back up (`cb6b894`).
4. Step 5 "Unlimited wants and finite resources": the four factors are named once; the recall is not a
   retyped copy of a flow on the same screen.
5. Chapter 3's check-in (step 11) shows the scarcity → choice → opportunity cost diagram, "Tap to enlarge"
   readable; a quiz item; a practice item whose command word is one of the eight; NO spaced recall on
   chapter 1's check-in (step 3), a "Recall from chapter …" cue from chapter 2 onward.
6. Chapter 4, step "Opportunity cost through marginal analysis": the worked calculation's numbers match the
   PPF diagram's axis values on the same check-in.
7. Chapter 4's check-in (step 16) shows the PPF diagram visibly bowed outward with no bulge, and its
   scenario switcher offers five views of the same curve — reading the frontier, opportunity cost C to D,
   movement along, outward shift, inward shift. Count steps through `buildSteps()`, not from the block
   list: a chapter's subsection count decides its step numbers.
8. Chapter 5 check-in: the money diagram; the financial-markets subsection names all five roles.
9. Chapter 6 check-in: the Economic Systems Comparison diagram; a 20-mark Evaluate; "Mark my answer" opens a
   self-mark checklist carrying the levels note.
10. Completion screen reached, naming all six chapters; console shows no errors other than the signed-out 401.

---

## Previous brief — packet 14 (kept for the template and its rules)

## Packet 14 spec — decision-making-techniques, the first content section and the format pilot (Fable 5.1, 14 September 2026)

The section that sets the template for the 42 that follow. Business Unit 3 (WBS13), IAL topic **3.3.3
Decision-making techniques**, `audit/raw/bus_spec.txt:1146-1177`, 23 countable leaves in five sub-topics:
1 quantitative sales forecasting, 2 investment appraisal, 3 decision trees, 4 critical path analysis,
**5 contribution**. Grade D in March; 2 blocks, 4 subsections, 0 recalls, 0 diagrams, 10 quiz items, 5 practice
items; validator on 14 September: 11 BLOCK, 22 DEBT, 60% lexical coverage. Nine section opens since the audit,
which is why it is the pilot.

**One correction to the ledger before anything else.** Four items say contribution is "Unit 2 content, off-spec
for this section" (`quiz-04`, `specGap-06`, half of `topFix-03`, and the audit's flashcard note). That is UK GCE
reasoning: in the IAL specification contribution is sub-topic 5 of this very topic (3.3.3.5a-c, spec lines
1175-1177), and `audit/raw/spec-coverage.json` lists all three of its leaves as MISSING here. So this packet
**teaches** contribution rather than removing it. Break-even (2.3.2.3, owned by financial-planning) and
sensitivity analysis (0 occurrences in either specification) are the off-spec material, and they go.
Likewise `topFix-05` and the audit's first accuracy issue ask for the section to be relabelled "3.3" with
sub-points 3.3.1-3.3.4: that is the UK Theme 3 numbering. The `sections` row already says `3.3.3`, which is
the IAL number, and it is not changed.

### Scope — the 31 ledger ids assigned to packet 14, plus one minted

All 31 are claimed. What "closed" means for each:

- **F108** (the Unit 2 → Unit 3 cliff, reassigned here by packet 3): closed *for this section*, which is the
  first Unit 3-4 section to reach the Unit 1 template — ≥4 blocks, one recall per subsection, ≥20 quiz items,
  pins on every block, a diagram per chapter. The validator rules packet 3 built (`depth.blocks`,
  `depth.recalls`, `depth.quiz`, `section.no-recall`) hold every later section to the same floor; the other
  Unit 3-4 sections close it under their own packets. If the verifier reads F108 as programme-wide, reassign
  it to packet 57 rather than reject.
- **topFix-01, specGap-01, specThin-01, quiz-01/02/03, structure-01**: an Investment Appraisal block of four
  subsections (payback with the part-year fraction, ARR, NPV with discount factors, comparing the three), each
  with a worked example, plus a matching notes chapter, so the payback/ARR/NPV quiz and practice items are taught.
- **topFix-02, structure-05**: five diagrams in `section_diagrams`, one pinned by `diagramId` on every block:
  time series with a three-period moving average and an extrapolated trend (a second scenario: scatter graph
  with a line of best fit), cumulative cash flow with the payback point, a worked decision tree, an
  activity-on-arrow network with node number / EST / LFT circles and the float shown, and a contribution bar.
- **topFix-03, quiz-05, practice-01, specGap-06**: quiz[8] (break-even output) and practice[4] (sensitivity
  analysis, an `Outline`) deleted; quiz[7] (contribution per unit) kept and now taught. New items on
  extrapolation's continuity assumption, correlation and causation, decision-tree limitations, CPA
  limitations; a CPA float-and-critical-path Calculate; a moving-average Calculate.
- **topFix-04, structure-06**: 15 recalls, one per subsection: 5 fill-ins (moving-average rule, payback,
  NPV, critical path, contribution chain), 4 reorders (the forecasting steps, the ARR calculation, rolling
  back a tree, completing a network — each a genuine procedure sourced from a flow in its own subsection),
  2 matches (forecasting limitations, decision-tree limitations), 4 classifies (payback/ARR/NPV statements,
  decision vs chance nodes, CPA strengths vs limitations, accept vs reject on contribution). Every one carries
  its `why`; every fill-in its 2 distractors and semantic hints.
- **topFix-05, structure-02, structure-03, structure-04**: five blocks in specification order (Sales
  Forecasting · Investment Appraisal · Decision Trees · Critical Path Analysis · Contribution), 15 subsections,
  `quizIndices` and `practiceIndices` on every block so the check-in asks about the chapter just taught.
  The "3.3" relabel half of topFix-05 is not done, for the reason above.
- **structure-07, specGap-02, specGap-05, specThin-02, specThin-03**: worked calculations in the body:
  a six-month three-period moving average, the four-quarter centring rule, a 2.8-year payback, ARR 12.5%,
  an NPV of +$3,850, EMVs and net gains for a two-option tree, and a six-activity network with both passes
  and every float (A-B-D-F, 10 days).
- **specGap-03**: a subsection on scatter graphs, the line of best fit, the three correlations and reading a
  forecast off the line.
- **specGap-04**: constructing the tree (squares, circles, probabilities summing to 1, costs on option
  branches) and rolling back through the decision node, in the Learn Mode body, not only in a mistake card.
- **structure-08**: quiz items on the continuity assumption, correlation vs causation, tree limitations and
  CPA limitations (see the quiz map in the plan script).
- **structure-09**: the CPA misconception is now "the most important or the shortest route"; decision-tree and
  correlation misconceptions kept in substance.
- **structure-10** ("takeaways match their blocks, no issue"): claimed as no-change; the new takeaways are per
  block and the verifier can read them.
- **C-decision-making-techniques-specGap-07** (minted this packet from `spec-coverage.json`'s three MISSING
  contribution leaves): a Contribution block, two subsections (per unit and total; the decision uses: special
  orders, product mix, dropping a product, make or buy), notes chapter, flashcards, quiz and an Assess (12).

Deliberately not in this packet: the public Unit 3 landing copy at `app/business/unit-3/page.js`, which
still lists the section's sub-topics in the March order and omits contribution — a cross-surface item for
packet 57 (add to D014's file list); the quant drill wiring (13.2); diagram label drills beyond the decision
tree (13.5-13.7 own the labels; the tree carries three `draggable` labels so the button appears once).

### Acceptance checks a verifier can run without this conversation

1. `node audit/scripts/validate-content.mjs --section decision-making-techniques` → 0 BLOCK, DEBT ≤ 3, 0 new
   against the baseline; `spec.coverage` ≥ 90% (was 60%); `section.counts` reports 5 blocks · 15 subsections
   · 15 recalls · ≥28 quiz · 8 practice · 5 diagrams.
2. `node audit/scripts/pin-check.mjs --section decision-making-techniques` → 0 broken pins.
3. `node audit/scripts/packet-13-census.mjs` → exit 0 (no banned term introduced).
4. Live content (read the post-publish snapshot `audit/snapshots/auto-prepublish-*__business__decision-making-techniques.json`
   or the plan `scripts/_packet14-*.mjs`): no `£`, no "sensitivity", no "break-even" outside the one synoptic
   sentence in the contribution subsection, no "Outline", no sentence beginning "Examiners …" without a
   citation, every subsection's teaching text ≤ 350 words (the runner prints the count).
5. The reorder recalls' `correctOrder` paraphrase a flow in the same subsection in the same order; every
   reorder prompt names its principle ("from first to last", "from the right of the tree to the decision").
6. Every real example that names an entity and a year or figure carries a source in parentheses (Layer 4).
7. `npm test`, `npm run build`, `npm run validate` exit 0; baseline rewritten smaller.

### Verify B — 390×844, `/business/unit-3/decision-making-techniques`, signed out

1. Overview shows 20 steps (15 teach + 5 check-ins); tap Learn.
2. Step 1 "Moving averages": one heading, chapter eyebrow "Sales Forecasting · part 1 of 3", key idea, the
   worked bullets (43.0, 45.7, 48.3, 50.7), then the fill-in recall BELOW the teaching with three blanks and
   five chips (mean · middle · centred · total · trend). Place a wrong chip, Check → partial line and "Try
   again"; second wrong check → the completed sentence is shown (a fill-in carries no `why` lines; only reorder,
   match and classify do). Skip is a text button. Next visible without scrolling past the recall.
3. Step 2 "Scatter graphs…": reorder with four items in a non-identity order; the prompt ends "from first to
   last"; Check shows the why lines on a wrong order.
4. Step 3: match recall; pairing by tap works; one distractor chip remains unpaired at the end.
5. Step 4 "Chapter check-in" (chapter 1): diagram "Sales over time: moving average and trend" with a scenario
   switcher (two scenarios), "Tap to enlarge" opens the sheet and the axis labels are readable; a quiz item
   about forecasting; a Calculate (4 marks) practice with an answer box and a four-item self-mark checklist;
   NO spaced recall (first chapter); explain-it-back; takeaway with 4 lines.
6. Chapter 2 teach steps: payback fill-in, ARR reorder, NPV fill-in, classify with three groups and six items.
7. Check-in 2: cumulative cash flow diagram; the spaced recall is from chapter 1 with the cue "Recall from
   chapter 1"; a practice item (NPV Calculate).
8. Chapter 3 check-in: the decision tree shows a "Label this diagram" button; tapping it opens the drill with
   three labels and closing it restores the diagram.
9. Chapter 4 check-in: the network diagram; enlarged, the node numbers and the EST | LFT figures are legible.
10. Chapter 5 check-in: the contribution bar; the practice item is an Assess (12 marks); type an answer and tap
    "Mark my answer" → the self-mark checklist carries the note "questions above 6 marks are levels-marked".
11. Completion screen reached; console shows no errors other than the signed-out 401.

### Verify B — student walkthrough (Sonnet, 390×844, signed out, 15 September 2026)

**The script passes end to end.** Overview reads 24 steps; step 1 shows one heading, the eyebrow "CHAPTER 1 OF 6 ·
The Nature of Economics · part 1 of 2", then key idea → teaching → example → misconception → exam matters →
exactly one recall, with Next in a sticky footer so it is never hidden behind the recall. The fill-in gave
"2 of 3 right" with the wrong chip struck through beside the right one, and Skip is an outlined button next to
the solid Check. Scroll position held at 669px through a re-render (the `cb6b894` regression has not returned).
Chapter 1's check-in carries no spaced recall and chapters 2 and 3 carry a "Recall from chapter 1" cue, each a
different recall type. The worked figures read 10, 8 and 0.8 on the teach step and again on the chapter-4
diagram, and the verifier re-derived the frontier's monotonic slope from the raw 101-point polyline itself.
All five financial-market roles appear verbatim. The completion screen names all six chapters. One console
error across all 24 steps: the expected signed-out 401.

**The UK/USA check came back clean**: the economic-systems markers are Hong Kong, Singapore, Sweden and North
Korea, with Sweden at x=310 on a bar spanning 50–450 — visibly off centre — and in neutral white, not the blue
of the "Mixed" label. No "UK", "USA", "United Kingdom" or "United States" anywhere in the SVG's text nodes.

**Two real defects, both fixed:**

1. **The movements-and-shifts diagram was unreachable in Learn Mode.** It had been pinned to a *subsection*
   (`content[3].sections[2].diagramId`), and only a CHECK-IN step carries a diagram, taken from the BLOCK
   (`lib/learn-steps.js:44-55`) — a subsection's `diagramId` is never read. So it appeared only on the Diagrams
   tab, which is precisely `structure-02`'s complaint. Fixed in content rather than by changing verified code:
   chapter 4's five views now live on the one pinned diagram (reading the frontier · opportunity cost C to D ·
   movement along · outward shift · inward shift). **Four diagrams, every one pinned to a block and reachable.**
2. **Classify chips could not wrap at phone width** — see the DECISIONS entry. Measured before and after on the
   live page: the 59-character item rendered at **447px against a 375px viewport** with `white-space: nowrap`,
   and at **311px** wrapped once the rule was scoped away from classify chips. `tab-content` scrollLeft was
   47.5px drifted before, 0 after.

**Two findings recorded as someone else's work** (`V002`, `V003`, packet 57): the Practice *tab* gives a 20-mark
Evaluate only a "Show Guidance" reveal while InlinePractice gives the same tariff an answer box and a self-mark
checklist — two surfaces, two affordances for one item; and jumping to an already-reached chapter paints the
step number about a second before the body.

**One correction to the script itself, not the product:** it said "step 3's recall is a classify". Step 3 is
chapter 1's check-in; the positive/normative classify is on **step 4**. The script above is corrected. A step
number written from the block structure rather than counted through `buildSteps()` will be wrong whenever a
chapter has a different number of subsections than the author assumed.

Not seen: crowding, overlapping SVG labels, an over-long step, or a recall whose answer is given away by the
text above it.

### Verify A (packet-verifier on Sonnet, 14 September 2026)

32 of 32 confirmed on round 1 with file:line evidence; `ledger.mjs unverified 14` clear; unclaimed but relevant:
none. The verifier read the spec text itself and confirmed that the "off-spec" premise of quiz-04 / specGap-06 was
wrong and that topFix-05's "relabel as 3.3" was rightly left undone.

### Verify B report (student-walkthrough on Sonnet, 390×844, signed out, 14 September 2026)

9 of 11 PASS; no audit complaint visible; no console errors; scrolling with real wheel input never jumped back.
Seen: overview "Learn · 20 steps"; step 1 heading, eyebrow "Chapter 1 of 5 · Sales Forecasting · part 1 of 3",
the worked bullets 43.0 / 45.7 / 48.3 / 50.7, the fill-in below the teaching with three blanks and five chips,
"2 of 3 right" then Try again, Skip as a text button, Next visible; step 2 reorder in a non-identity order with
the why lines on "Show the answer"; step 3 match with one distractor left over; check-in 1 with the two-scenario
diagram, a legible enlarged sheet, the scatter quiz item, a 4-mark Calculate with an answer box and a four-item
self-mark checklist, no spaced recall, explain-it-back, a four-line takeaway; chapter 2's fill-in / reorder /
fill-in / three-group classify; check-in 2's "Recall from chapter 1 · Moving averages" cue and the NPV Calculate;
the decision tree's "Label this diagram" opening a 0/3 drill and closing back to the card; the network's
node number and EST | LFT figures legible when enlarged; the contribution bar and the 12-mark Assess; the
completion screen naming all five chapters.

The two FAILs are the script's, not the product's: (1) the script expected "a reason line" on a fill-in's
second wrong check, but the recall contract gives `why` lines to reorder, match and classify only — a fill-in
shows the completed sentence, which is its explanation (a `why` per blank would be a widget-contract change for
a later packet, not content); (2) the script expected the "questions above 6 marks are levels-marked" note on
the Assess card, but that note renders only once "Mark my answer" opens the self-mark checklist, which the
script did not ask for. Both scripts are corrected in the template above for the next packet.

Two side observations: the header chip still said "More content coming · 10 questions so far" — the depth
route is served with `max-age=300, s-maxage=3600`, so the chip catches up within the hour and needs no fix;
and about fifty `POST /api/events` showed `net::ERR_ABORTED` in the network log, yet `app_events` holds 43 rows
for this section from the walkthrough (learn_open, 20 step_view, 19 step_next, section_complete), so the
aborted posts were cancelled duplicates, not lost events. Packet 58 should know both.

## Incident, 15 September 2026 — packet 15 took introductory-concepts down on production

**What happened.** Packet 15 published `introductory-concepts` to live content. Its 18 recalls are authored to
the packet-7 contract; three are `reorder` recalls with `correctOrder` and no `shuffled`, and ten are
`match`/`classify`. On production, pressing Next once in Learn Mode threw
`TypeError: Cannot read properties of undefined (reading 'map')` from `ReorderRecall`'s `useState` initialiser
and Next.js replaced the page with "This page couldn't load". That is the most-opened section on the site:
192 opens, and the one with the worst step-0 abandonment.

**Scope, measured rather than assumed.** A sweep of all 43 live sections found exactly one carrying a shape the
shipped code cannot render: this one. `supply` and `business-growth` were walked on production through their
recall steps with no error, so the crash was never site-wide.

**Fixed** by restoring `audit/snapshots/auto-prepublish-2026-09-15T13-01-51-600Z__economics__introductory-concepts.json`
(the founder ran it; the session's own attempts were refused by the permission layer). Verified on production
afterwards: `/api/sections/introductory-concepts` serves 5 blocks and 9 recalls with no bad shape, and Learn
Mode walks to the end of the section without an error. Packet 15's built content is intact at
`audit/snapshots/packet-15-bundle__economics__introductory-concepts.json` (6 blocks, 18 recalls) and republishes
at the checkpoint exactly like packet 14's.

**Two traps worth knowing, both of which cost time here.**
- *The restorable snapshot is not the one with the obvious name.* `2026-09-15-pre-packet-15__*.json` is a bundle
  dump — no `section_id`, no `tables` — and `restore-section.mjs` rejects it. The `auto-prepublish-*` files are
  the restorable ones, and the right one is the snapshot taken before the FIRST publish of the day, not the
  last: a second publish snapshots content that is already broken.
- *A crash can outlive the database fix.* `decision-making-techniques` was reverted the previous evening and
  still crashed identically when tested this morning; it came right later the same day with no further content
  change. The section API sends `max-age=0, must-revalidate`, so the carrier was not that route. The mechanism
  is not yet explained. **After any content revert, re-walk the section on production in a fresh tab before
  calling it fixed**, and do not treat the database state as proof.

## Correction, written after packet 14 was reverted (14 September 2026, late)

**Packet 14 is NOT live.** It was published, then reverted the same evening: its content uses two recall types
(`match`, `classify`) whose rendering code (packet 7) is not on `main`. `decision-making-techniques` is back to
its exact pre-packet-14 state, verified byte-identical against the pre-publish snapshot. The built, reviewed,
Verify-A-confirmed content is intact and untouched at `scripts/_packet14-*.mjs` and
`audit/snapshots/packet-14-bundle__business__decision-making-techniques.json`; nothing needs re-authoring.

**Publish it at the packet 5/7 checkpoint, not before.** When packets 5 and 7 are merged into `main` and
deployed, re-stage and publish:
```
node scripts/packet-14-decision-making-techniques.mjs --stage
node scripts/publish-section.mjs decision-making-techniques --confirm
```
Then rerun `npm run validate` and `--baseline --confirm` to drop back to the 2,415-key baseline.

**New rule for every content packet before publish — CORRECTED 15 September, after it failed on packet 15.**
The rule below was written as "a packet using only `reorder`/`fillin` recalls can publish standalone (main has
both); a packet using `match`/`classify` cannot". **That is wrong, and it took the most-opened section on the
site down.** The recall TYPE is not the test; the FIELDS are. Main's `ReorderRecall` opens with
`useState(() => recall.shuffled.map(i => recall.correctOrder[i]))` — it needs `shuffled`, and the packet-7
contract deliberately drops `shuffled` in favour of a seeded start order (see "The recall contract" above). So a
new-contract `reorder` renders on `main` as an uncaught TypeError and Next.js replaces the whole page with
"This page couldn't load". By contrast `match` and `classify` are harmless there: main's dispatch falls through
to `null` and simply shows nothing.

**Until packets 5 and 7 are merged and deployed, no section authored to the recall contract may be published,
whatever types it uses.** The check before staging is field-level, against the shipped component, not
type-level:
```
git show origin/main:components/learn-mode/ReorderRecall.jsx | head -12   # needs recall.shuffled
git show origin/main:components/learn-mode/FillInRecall.jsx  | head -12   # needs recall.answers
```
and then confirm every recall the packet publishes carries the fields those two read.

**A separate, pre-existing bug was found on this section while checking.** `decision-making-techniques`'s Learn
Mode throws an uncaught error on `main` as deployed, independent of packet 14 — see DECISIONS.md, "a
pre-existing production crash on this section". Not triaged into a packet; worth the founder's attention on its
own, since it is a real crash a student would hit today, on `main`, regardless of anything this programme does.

## Handoff — what comes next (written after packet 14, 14 September 2026)

Packet 14 was the format pilot. Next is **packet 15, introductory-concepts** (Economics 1.3.1, 192 opens, the
section with the worst step-0 abandonment: 167 of 192 starts stuck), 32 ledger items, March grade C, **on Opus**
per PROTOCOL (Fable only for a D grade or a rewrite; the summary says the prose is sound and the scaffolding is
not — recalls, quiz bank, pins, the PPF SVG). Run it in a NEW session. Packet 13's round 4 is confirmed and its
session is committing on this branch, so stage files explicitly and never `git add -A`.

### The template, as built and verified here

Copy the packet-14 files and rename: `scripts/packet-14-decision-making-techniques.mjs` (the runner),
`scripts/_packet14-content.mjs` (blocks and notes), `scripts/_packet14-assessment.mjs` (quiz, practice, cards,
mistakes, extras), `scripts/_packet14-diagrams.mjs` (SVGs), `scripts/_packet14-util.mjs` (ids, the word counter).
The runner is the first reader of the section: it prints every subsection's word count, refuses on the section's
own banned phrases, checks the worked figures appear on more than one surface, runs the validator over the
whole bundle against the baseline, and stages through `stageBundle()` (`scripts/_content-write.mjs`: the whole
section validated once, every changed table written to `draft` and read back). `--dump` writes the bundle to
`audit/snapshots/packet-<n>-bundle__*.json` for the verifier. Then `scripts/publish-section.mjs <id> --confirm`.

The lifecycle that worked, in order: read the spec span for the topic and check every ledger item's scope claim
against it (four packet-14 items were wrong about contribution) → write the spec block in NEXT.md → snapshot →
author → dry run until 0 BLOCK and 0 new DEBT → stage → preview the SVGs (drop the preview HTML into `public/`
for the running dev server on 3001, look, delete it) → **Layer 6**: an adversarial Sonnet review on a COPY of
the bundle with two planted canaries (brief and procedure now in `CONTENT-GATE.md`, "Layer 6 — as run in
packet 14"); void the report if it misses a canary → fix → re-stage → publish → census, `npm run validate`,
`--baseline` diff read then `--baseline --confirm`, pin-check → claim → Verify A and Verify B in parallel
(Verify B holds the Browser pane; do not use it meanwhile) → gate → commit → push → handoff.

What a section costs, measured on this one: about 15 subsections at 250-343 words each, 32 quiz items, 8
practice items, 5 SVGs, 27 cards, 8 mistakes, 6 chains, one review round of eight findings, one Verify A and
one Verify B. Budget a full session; do not start a second section in it.

### Rules the pilot settled (all recorded in DECISIONS.md, 14 September, packet 14)

1. **The 350-word budget is hard and calculation subsections fill it.** `teachingWords()` in
   `scripts/_packet14-util.mjs` counts exactly as `step.words` does (a "÷" and an "=" are words). Worked numbers
   go in `bullets`; the notes chapter and the diagram description carry the fuller table.
2. **One fictional firm carries the worked figures across the section** ("Kopi Kita" here) so the body, the
   notes, the diagrams, the quiz explanations and the practice guidance show the same numbers; the runner checks
   the figures by string. The Real Example card holds only real things; a real example that names an entity and a
   year or a figure carries its source in parentheses, otherwise it names no figure.
3. **One currency per section, chosen once.** This section is in dollars. An Economics section already in
   pounds can stay in pounds; the rule is one, not which.
4. **The coverage rule is lexical: put the specification's phrase in a notes item that teaches.** Three leaves
   worded "Calculations and interpretations of figures generated by these techniques" were taught in substance
   and still uncovered until a notes item used the phrase and said what the interpretation is.
5. **Quiz construction beyond the validator.** Keep the correct option within about 1.2× the longest distractor
   (the validator allows 1.5× and the reviewer still found five length tells); no hedge in the correct option
   when two distractors are absolute; retained items keep their ids; balance positions by hand (8·8·9·7 here).
6. **Practice above 6 marks is levels-shaped**, with the calculations the data allow written into the guidance
   at enough precision that the displayed figures add up (a rounding tell was one of the review's findings).
7. **Diagrams**: 500-unit box, labels 9-13 units from the palette in `processSvg.js`, nothing placed on a line;
   the packet-5 sheet makes 9 units 15px on a phone. Draggable labels only where the paper asks the student to
   construct the diagram (the decision tree here, three labels); the rest wait for 13.5-13.7.
8. **Pins**: the first index in each block's `quizIndices` / `practiceIndices` is what the check-in shows; put
   the best chapter-closing item first and the sequence stops being 0,1,2,… by itself.

### Discovered in packet 14, for whoever it concerns

- `app/business/unit-3/page.js` still lists this section's sub-topics in the March order and omits contribution
  (packet 57, with D014's file list). The Notes tab, Learn Mode and the flashcards are consistent.
- `pin-check --verbose` reports "weak" pins for calculation questions whose stems share no title word with their
  block ("A project costs $200,000…" under Investment Appraisal). That lint is lexical and never fails; a
  calculation stem rarely names its topic. Leave it.
- The Browser pane cannot screenshot a `file://` page; serve a preview through the running dev server instead.
- The other session's commit `539e60f` swept this packet's NEXT.md spec and pre-packet snapshot into its own
  commit. Harmless, but it is why the packet-14 commit shows fewer new files than the packet wrote.

### For the founder — Layer 7, 45-60 minutes on this section (CONTENT-GATE Layer 7)

Three questions only: does this look like a question from the paper; is this claim true; would you put this in
front of a student. Open `/business/unit-3/decision-making-techniques` and the Notes tab. The claims that name
a real entity with a year or figure, each with the source the text cites:

| Where | Claim | Source cited |
|---|---|---|
| Sales Forecasting › Scatter graphs | Blockbuster's revenue peaked in 2004; Chapter 11 on 23 September 2010 | Blockbuster 2004 annual report; the petition |
| Sales Forecasting › Limitations | Global passenger traffic fell by about two-thirds in 2020 | IATA press release, 3 February 2021 |
| Decision Trees › Constructing | About 8% of candidates entering human trials reach approval | BIO, Clinical Development Success Rates 2011–2020 (7.9%) |
| CPA › Nature and purpose | Critical path methods date from the late 1950s: DuPont; the US Navy's Polaris programme | Kelley and Walker 1959; Malcolm et al. 1959 |
| CPA › Limitations | Sydney Opera House planned for 1963, opened 1973 | Sydney Opera House, "Our story" |

Real names used without figures (no source needed, but say if any reads wrong for a student in Lagos or
Karachi): Grab, AirAsia, DuPont, shipyards in South Korea, mining companies, budget airlines, hotels on
last-minute apps. Fictional firms, presented as worked examples and never as real: Kopi Kita (Kuala Lumpur),
Sunrise Bakery (Nairobi), Palm Bay Hotel (Penang), a courier in Lagos, a logistics company in Dubai.

## Packet 7 spec — Widget mechanics (built and VERIFIED 14 September 2026, Fable 5.1 — Verify A 14 of 14 on round 1, Verify B 15 of 16 with the one failure fixed post-gate; commits bcd62ce · 2c57920 · the gate commit; base cb6b894)

The packet that defines what a recall IS, so that the 338 recalls the content packets author (272 to rewrite,
20 Business sections to give their first) are written once into widgets that work. Twelve ledger ids, all on
the two recall widgets and the three never-mounted components, plus four minted feature ids for the parts that
have no audit finding behind them (the two new types, the gallery, the contract).

**The recall contract (W004).** Four types, documented for authors in `CONTENT-GATE.md` under "The recall
contract", enforced by the validator, rendered by `components/learn-mode/*Recall.jsx`, with the pure grading
and ordering logic in `lib/recall-widgets.js` so it is testable without a browser.
- `reorder` — `correctOrder` (3-5), a prompt that names the ordering principle, and `why[]`: one line per item
  saying why it sits where it does. `shuffled` is dropped: the start order is a seeded permutation of the recall
  id (never the identity, never with the first item already in place, and on the spaced showing never the first
  showing's order either), so the six memorisable patterns of F113 cannot recur and the server and client agree.
- `fillin` — `template[]` lines with any number of `___` per line, `answers[]` one per blank in reading order
  (multi-word answers are one chip), `hints[]` semantic, and `distractors[]` (2-3 plausible wrong chips). The
  renderer never shows a letter-prefix hint: a stored hint that is a prefix of its answer or reveals its length
  is replaced on screen by the first letter alone. Where a recall carries no distractors the engine draws two
  from the section's other fill-in answers, seeded by the recall id, so the bank is never a closed set (F054).
- `match` — `pairs[{ left, right, why? }]` (3-5) plus optional `distractors[]` on the right-hand side. The
  rights are a shuffled chip bank; tap a left item then a chip, or a chip then a left item.
- `classify` — `groups[{ name, items[], why? }]` (2-3 groups, 4-8 items). Items are a shuffled bank; tap an
  item then a group, or a group then items.

**Mechanics shared by all four.** Check → per-item marks and a partial-credit line → *Try again* with the
correct items locked and only the wrong ones live → the wrong-state panel shows the answer and the `why` lines
where the content carries them. The score reported to the engine is the FIRST check only (retry consolidates,
it does not inflate). A visible **Skip** text button replaces the unlabelled × (F055): a skip counts in the
recall total, is counted separately as skipped, and the skipped recall comes back as the spaced recall at the
next chapter check-in in preference to the default pick; the completion screen shows "N skipped". Skipped ids
persist in the section's local state (there is no server column for them; a review-mode consumer for recalls
does not exist, and adding one is not this packet).

**Fill-in specifics (F050 F051 F054 F060 F063 F112).** The template is parsed into text and blank segments
with a running blank counter, so a line with `___ ___` or two blanks renders whole (F051, F112). Blank count
is derived from the template: answers beyond it become extra chips, blanks beyond the answers render as inert
underscores, and Check needs only the live blanks, so the 8 live mismatches are completable (F050). Tap a blank
to target it, tap a chip to fill the targeted (else first empty) blank, tap a filled blank to return its chip
(F060; the drag-and-drop handlers and `cursor: grab` are deleted). After Check a wrong blank shows the
student's word struck through with the correct answer beside it and the "Correct answers:" strip is gone (F063).

**Reorder specifics (F056 F057 F107 F113).** Retry with locked correct items; partial credit says how many
are in place and how many are one place off; `why` per item in the wrong-state panel. F057 and F107's content
half — the 18 not-orderable and 48 weak reorders — is converted section by section into `match`/`classify`
(the March verdicts in `audit/raw/content-audits.json` name them; the gallery's match and classify exemplars
ARE two of them, converted). After this packet the two ids are reassigned to packet 57 with a note; they close
when no live reorder carries a not-orderable or weak March verdict.

**Dead components (F061).** `RecallCheckpoint` and `InteractiveDiagram` deleted with their CSS.
`DiagramLabelDrill` is wired behind a "Label this diagram" button on `InlineDiagram`, shown only when the
SVG carries three or more `text.draggable` labels; its fallback that extracted every `<text>` is removed
(measured: it would have produced 6-40 "labels" per live diagram, titles and axis values included). 0 of 74
live diagrams and 0 of 18 in `public/diagrams/` carry the class today, so the button appears nowhere until
packets 13.5-13.7 author labels; the gallery proves it works with a fixture SVG.

**Validator.** New rules: `schema.recall-type` (BLOCK), `match.count`, `match.unique`, `classify.groups`,
`classify.unique` (BLOCK), `match.prompt`, `classify.prompt`, `recall.why` (one rule for the reorder item,
match pair and classify group lines), `fillin.distractors`, `fillin.leak` (DEBT). Retired: `reorder.permutation`, `reorder.identity`, `reorder.shuffle-reuse` (the field
is inert), `fillin.one-per-line` (the renderer copes). Relaxed: `fillin.token` refuses commas only. The
baseline is rewritten once, in this packet, and the DECISIONS entry lists the by-rule delta.

**Gallery (W003).** `/admin/widgets` (admin-gated, for the founder) and `/dev/widgets` (404 in production)
render one exemplar of each type and the label drill from `lib/recall-fixtures.js`, at any viewport.

Ledger: closes F050 F051 F054 F055 F056 F060 F061 F063 F112 F113 and the minted W001 (match) W002 (classify)
W003 (gallery) W004 (contract + validator). Leaves F057 F107 → packet 57 with a note (content half).

### Acceptance — Verify B at 390×844, economics / introductory-concepts, signed out
1. Step 0 (reorder). Four items; the order shown is not the answer and the first item is not "Observe/Identify"
   (whatever the true first is); a text button "Skip" in the card header; no ×. Tap "Check order" without
   moving anything: a result line "N of 4 in the right position" (plus "M one place off" when M>0), a "Try again"
   button, and the correct order listed. Tap "Try again": items marked correct stay green with no arrows; the
   others still move. Put them right, Check: "Perfect order".
2. Step 1 (fill-in, answers Positive · Normative · ought to). The word bank holds MORE chips than blanks (3
   answers + 2 distractors). "Show hints" never shows a letter prefix like "Po____". Tap blank 2 first, then a
   chip: it lands in blank 2 (and the target moves on to the next empty blank). Tap that blank: the chip returns. Fill all three wrong, Check: each wrong blank
   shows the wrong word struck through with the right one beside it; there is no "Correct answers:" strip.
   "Try again" clears only the wrong blanks.
3. Step 4 (fill-in, Opportunity Cost): press Skip. Step 8 (chapter 3 check-in): the "Recall from chapter 2"
   card is the Opportunity Cost fill-in (the skipped one), not the chapter 1 recall.
4. Step 10 (fill-in "Money also serves as a store of ___, unit of ___, and standard of deferred payment"):
   the whole sentence is visible with two blanks; the widget can be filled and checked.
5. Complete the section: the Recall score row shows "x/y" and "1 skipped".
6. `/dev/widgets` at 390px: match — tap a left item then a chip, pairs fill, Check, Try again, the why lines;
   classify — tap an item then a group, Check, Try again; label drill — drag a chip onto its dashed slot.
7. Console: no hydration warning on a fresh load of /economics with introductory-concepts.


### Verify B report (student-walkthrough on Sonnet, 390×844, 14 September 2026)

Steps 1-3, 5-6 PASS as scripted: the reorder's start order is not the answer and the first item is not in place;
Skip is a text button and there is no ×; "2 of 4 in the right position" → Try again locks the two correct items
(no arrows) → a second wrong check lists the correct order by itself (no why lines: live content has none yet);
the fill-in bank holds 5 chips for 3 blanks (money and exchange drawn from the section), hints read
'starts with "P"' and never "Po____", tap-blank-then-chip targets blank 2, tapping it returns the chip,
three wrong answers show struck through beside the right ones with no answer strip, Try again clears only the
wrong blanks; Skip on step 5 collapses to "Skipped. This check comes back at the next chapter check-in." and
step 9's "Recall from chapter 2" card IS the skipped Opportunity Cost fill-in; the completion screen reads
"1/4 · 1 skipped"; in the gallery match, classify and the label drill (drag → "1 / 4") all behave.
**Step 4 FAIL, fixed post-gate:** the money fill-in (4 blanks in the template, 3 answers — content debt,
`fillin.blanks`, packet 15) drew its spare blank as a dashed box the student could never fill, and said
"All correct" beside it. Now a spare blank is drawn as text, a note under the chain says one blank is still
being written and not checked, and the result line reads "3 of 3 right" rather than "All correct". Measured
in the browser, not re-verified. **Step 7:** the walkthrough saw the React "key" warning in the seed tab's
console; it is the entry logged before `2c57920` (the pane keeps console history across navigations) — a
brand-new tab loaded after the fix shows no error and no hydration warning.

## Handoff — what comes next (written after packet 7, 14 September 2026)

Packet 7 was the last widget packet before content. Next is **packet 14, decision-making-techniques, the
format pilot, on Fable 5.1**, in a NEW session; the drill packets 13.2-13.4 (Opus) can run before or after
it, and packet 13's round 3 waits on the founder's five publish commands (done at 17:12 on 14 September —
five `auto-prepublish` snapshots appeared while packet 7 was being verified; that session owns them and its
seven new DEBT keys).

What a content session must know from this packet, on top of packets 3 and 13's notes:
1. **Recalls are authored into the contract in `CONTENT-GATE.md` ("The recall contract").** Four types.
   Copy the exemplars in `lib/recall-fixtures.js`; look at them live at `/dev/widgets` on the dev server.
   Every recall needs its `why` (per reorder item, per pair, per group) and every fill-in its 2-3
   `distractors` and semantic hints; `recall.why`, `fillin.distractors`, `fillin.leak` and `fillin.hint`
   report what is missing, and they are DEBT the section packet clears. Delete `shuffled` on any reorder you
   touch — it is inert.
2. **Convert, do not reword, a bad reorder.** The March verdicts (`audit/raw/content-audits.json`,
   `recallAudit[]` per section) name each section's not-orderable and weak reorders. "Match X to Y" → `match`;
   a ranking, "most to least", "sort into" or parallel facts → `classify`; a chain with one defensible order
   but a vague prompt stays a `reorder` with the principle named. F057 and F107 sit in packet 57 and close
   when the census of live reorders carrying a bad March verdict is zero.
3. **A section with zero recalls (20 Business sections, `section.no-recall` BLOCK) must ship at least one**, and
   `depth.recalls` wants one per two subsections. Decision-making-techniques has none today.
4. **Verify B for a content packet can use the gallery for widget behaviour, but the section itself is the
   acceptance surface**: 390×844, every recall reachable, checkable, retryable, and the why visible on a
   wrong check.

Discovered in packet 7, for whoever it concerns:
- No live diagram carries `text.draggable`, so the "Label this diagram" button appears nowhere; packets
  13.5-13.7 author the labels (`lib/recall-fixtures.js` `LABEL_DRILL_SVG` shows the markup).
- Skipped recall ids live in local state only (`recallSkipped`); a server column and a review-mode consumer
  for recalls are open product decisions (DECISIONS, packet 7).
- The `.claude/agents/` definitions are not registered as agent types in a session started from the parent
  folder: spawn `general-purpose` on Sonnet and tell it to read the agent file first. Both verifiers worked
  that way this packet.
- Another session's dev server holds port 3001 and serves this worktree; `preview_start` refuses, but
  `preview_start` with the URL, or `navigate`, works. Check `curl localhost:3001/dev/widgets` first.

## Packet 5 spec — Step 0 (built, Verify-B'd and VERIFIED 14 September 2026, Fable 5.1 — Verify A passed on round 3, commit d032302; NOT shipped until the checkpoint, ~26 September)

The churn packet. 75% of Learn Mode section opens never pass step 0. Packet 0 already made the pre-test opt-in;
this packet rebuilds the step itself so that what the student meets on step 0 is one subsection, readable on a
phone, with the exit always in view. Thirty-two ledger ids, all in Learn Mode.

**The step model (F047 F036 F037 F038 F053 F064 F065 F066 F100 F039).** `lib/learn-steps.js` is the one place
steps are built, used by the engine and by the overview count (F030).
- One subsection = one `teach` step. Its own recall renders BELOW the teaching. Exactly one heading per step
  (`NoteSection` gets `hideTitle`), with a chapter eyebrow: "Chapter 2 of 5 · The AD Curve · part 1 of 2".
- Every chapter ends with one `checkin` step: diagram, quick quiz, practice, a spaced recall, explain-it-back,
  takeaway. Nothing is ever injected above a step's title.
- The spaced recall on a check-in is the earliest recall from an EARLIER chapter not yet used as a spaced recall
  this session, so it is at least a full chapter away from its first showing and is never the same widget twice
  in a row. A reorder shown the second time starts from a different seeded order.
- Steps = subsections + chapters. `total_steps` in saved progress changes accordingly; `currentStep` is
  clamped into range (F026), so an old pointer cannot show "Step 9 of 5".

**Mobile pass (F065 F072 F088 F091 F059 F093 F094 F095 F096 F101 F062).** 390px readability is the acceptance
criterion. Rail hidden on phones; card padding 14/12; body 15px, labels ≥12px; sticky bottom bar with Back ·
step counter · Next; 44px touch targets on reorder arrows, dismiss, more, chips, blanks and tabs; reorder tap
is insert-at-position, not swap; textareas 16px so iOS does not zoom; inline diagrams fill the card width with
a minimum label size enforced in viewBox units; the enlarge modal is a full-screen sheet at 2× with scroll and
pinch-zoom, and the "Tap to enlarge" hint only shows when it would be bigger; the tab strip scrolls the active
tab into view and shows a chevron when more tabs are hidden.

**Interaction (F045 F046 F097 F067).** Next swaps immediately with the enter animation; no 350ms input block.
Keyboard navigation reads refs, is off on the pre-test and completion screens, and ignores keys while focus is
inside a widget. Key Idea is the dominant element; Real Example, Misconception and Exam Matters are demoted to a
compact lens style; the Takeaway is the strongest element on a check-in. A clickable chapter-dot strip replaces
the single decorative node.

**Navigation and resume (F026 F030 F032 F048).** All section navigation goes through one handler that keeps the
current tab when it is a browsing tab (only Home → Overview changes it), updates the URL, and reads the saved
step for the NEW section. The resume banner appears on reload and deep link when the saved step is above 0;
the saved step is the max of server and local. Overview says the same step count the engine will show. The
'content' tab is retired from the menus; "View all content" goes to Notes.

**Writing (F012 F016 F117).** Explain It Back: after typing, free students get "Compare with the key ideas"
(the chapter's key ideas) and a tick-list self-check, the attempt is counted, and the draft is kept per chapter
in localStorage. InlinePractice: an optional answer box in all three modes with a self-mark checklist built
from the "(n marks)" fragments of the guidance, counted on the completion screen as "Written practice";
free students see the model-answer button as a locked Pro control rather than nothing. "(N marks)" is stripped
from the question text at render since the badge already says it.

**Depth signal (F083).** Sections below the Unit 1 template (fewer than 20 quiz questions or 4 chapters) show
their question count on the sidebar row and a "More content coming" note in the section header, from a small
`/api/sections/depth` route, so a Year 13 student is told rather than left to conclude the app skips their year.

**Acceptance script (Verify A).** `npm test` green including `lib/learn-steps.test.mjs`. `npm run build`.
`npm run validate` exit 0 (no content is written). Each of the 32 ids against its `fix` text.

**Verify B — done 14 September, main session, fresh tab, storage cleared, 390×844, signed out.** Overview says
"14 steps"; Learn Mode says "Step 1 of 14". Step 1: eyebrow "CHAPTER 1 OF 5 · The Nature of Economics · part 1 of
2", one h2 and zero duplicate h3, key idea at 16px medium over 15px body, lenses unfilled, its recall below the
teaching, rail hidden, sticky nav with Next inside the viewport without scrolling, step scroll height 2,812px.
All 14 steps walked: 9 teach steps each with one recall below the title; check-in 1 with quiz, explain and
takeaway and no spaced recall; check-ins 2-5 each with exactly one spaced recall from an earlier chapter and the
cue ("RECALL FROM CHAPTER 1 · Economics as a Social Science" on step 6); the two spaced reorders start in a
different order from their first showing. Arrows, dismiss and ⋯ measure 44×44. Diagrams tab → sidebar → Supply:
still on Diagrams, URL and header updated. Reload introductory-concepts → Start learning: "You left off at step 14
of 14" banner; Start over → Step 1. Business assessing-competitiveness header: "More content coming · 10 questions
so far"; sidebar chips on six Unit 3 rows. Console: only the signed-out 401s.

**The script, for the verifier to replay (390×844, storage cleared, signed out).** introductory-concepts → Start learning → Just teach me:
step 1 shows ONE subsection, one heading, a chapter eyebrow, Key Idea visibly dominant, its recall below the
teaching, no recall above the title, and a sticky bar with Next reachable without scrolling to the bottom of
8 screens. Step 2 opens on the title, not on a recall. The first check-in step shows the quiz and takeaway and
no spaced recall (nothing earlier to space). The second chapter's check-in shows a spaced recall with the
"Recall from chapter 1" cue and, if it is a reorder, not in the same order as before. Sidebar → Diagrams tab →
click another section: still on Diagrams. Reload at step 4: resume banner offered. A section with 10 quiz
questions shows "10 q" in the sidebar and the depth note in the header. Reorder arrows, ×, ⋯ are ≥44px.

**Shipping.** Build and verify now; SHIP at the next checkpoint once the funnel baseline (clean since 12 Sep) has
two weeks behind it, per PLAN — otherwise the packet 58 re-measure cannot attribute the change.

**Verify A, round 1 (14 September, commit 8288315): 25 of 32 confirmed; F012 F016 F032 F048 F062 F088 F101 rejected,
all correctly, all fixed the same day.** What the verifier found, and what changed:
- **F012** — the draft was wiped on every mount: the write effect ran with the empty first-render value before
  the read had landed, and removed the stored key. Now the draft is only ever written after the student has
  typed (a `dirty` ref set in `onChange`); the read effect resets it. Reload → Continue → reopen: the draft is
  in the box; step away and back (remount): still there.
- **F016** — the checklist split left the punctuation after the last "(n marks)" as its own item: a "." checkbox
  on 164 of 215 live practice items. Leading and trailing punctuation are stripped and rows with no letters
  are dropped. Census over all 215 items: 1,032 rows, 0 punctuation-only, 0 empty checklists.
- **F032** — the sidebar's "Content Explorer" still opened the orphaned `content` tab. It is "Full notes" and
  opens Notes.
- **F048** — `learnModeSection` was a `useClientValue` that re-read the LOCAL step alone on every section change,
  overriding the max-of-server-and-local the handlers had just chosen: a signed-in student with server progress
  and no local key landed on step 1 with no banner. It is a plain `useState` now with one writer,
  `readSavedStep`, called from the entry effect and every navigation handler; the F027 reconcile still applies a
  later-arriving server step. (Signed-out check only: local key 4 on `supply` → sidebar → Learn: "step 5 of 11".
  The signed-in half is by code reading; the verifier should exercise it if a test account is to hand.)
- **F062 / F088** — the sheet's SVG was 0.9× the viewport: the clone carried `style="width:100%"` from
  `processSvg`, and then a three-part selector at :5962 (`width:100%; max-width:90vw`) outranked the 200vw
  phone rule. The clone drops the inline size, a same-specificity phone rule sets 200vw, and — found while
  fixing it — the sheet's centred flex column had let the pane shrink-wrap to the 2× diagram and sit half
  off-screen with overflow hidden, so the left of every diagram was unreachable. The pane is now the viewport's
  width and scrolls. Measured: 780px sheet vs 313px inline (2.49×), scrollable from "Free Market" to "Command".
  The font floor was 1/28 of the viewBox (17.9 units on a 500 box) and raised 1,419 of 1,420 labels, colliding
  on dense diagrams; it is 1/36 (13.9 units), lifting only labels under 14 units by at most 1.4×.
- **F101** — the lens labels (11px, two-class selector outranking the phone rule), spaced cue, "draft saved",
  "Your answer", sidebar depth chip (10.5px) and header depth (11px) are all 12px; so are the flow-diagram
  numerals and "RESULT" (8px) and the `kbd` glyphs, and the arrow-key hint — meaningless on a phone, and its
  hide rule at :1492 lost to the base rule declared after it — is hidden in the phone block. The ⋯ tab-bar
  chevron and the sheet's close button are 44px. Measured on steps 1, 3, 6 and 14 at 390px: no visible text
  under 12px in the Learn container.

**Round-2 replay additions (390×844, storage cleared, signed out).** Step 3 → Explain it back → type → reload →
Start learning → Continue → reopen: the draft is there. Step 6 → type 15+ chars → Mark my answer: four rows,
none "." and none starting with punctuation. Step 14 → tap the diagram: the sheet's SVG is ~2× the viewport
and scrolls to both edges; close is 44×44. Sidebar → Full notes: Notes tab. Set
`revvy_learnmode_1_supply_section` = 4 → sidebar Supply → Learn: "step 5 of 11".

**Verify A, round 2 (14 September, commit 680c654): F012 F016 F032 F048 F101 confirmed; F062 and F088 rejected,
both correctly, both fixed the same day.** The round-1 defects were gone; each fix had one more thing wrong:
- **F062** — the pane had `touch-action: pinch-zoom`, copied from F088's own fix text. That value permits only
  multi-finger zoom and forbids one-finger panning, and the pane is the scroll container for a diagram now
  wider than the screen: on a real phone the right half of every diagram was unreachable by a drag. It is
  `manipulation` (pan and pinch; only the double-tap delay dropped). Measured `touchAction: manipulation`.
- **F088** — the 1/36 floor still relaid out dense diagrams: 1,281 of 1,377 labels lifted (authored sizes are
  7-13 units), 18 new overlapping pairs on the step-14 diagram that had none, and inline it bought nothing
  (13.9 units at 313px is 8.7px). The floor is gone. The sheet is 220vw instead of 200: with every live
  diagram on a 500-unit box and the smallest authored label 7 units (census over 73 SVGs, 1,390 labels), the
  smallest label in the sheet is 12.0px at 390px, and page pinch-zoom goes further. Measured: no `style`
  font-size on any inline label, 0 overlapping pairs inline and in the sheet, sheet SVG 858px, smallest
  label on step 14 17.2px.
- Also from the verifier's notes: the tab strip now scrolls 44px past its last tab so no label stays under the
  chevron.

**Round-3 replay additions.** Step 14 → tap the diagram: the sheet's SVG is 858px at 390 (2.2×), the pane's
computed `touch-action` is `manipulation`, no label carries an inline `font-size` style, and the label
bounding boxes overlap no more than the authored diagram (0 on this one). Census: `node -e` over every live
`section_diagrams` row — `font-size` minimum 7, viewBox width 500, so 7 × 858 / 500 = 12.0px.

**Verify A, round 3 (14 September, commit d032302): F062 and F088 confirmed; `unverified 5` clear — the gate
passed.** The verifier's census (108 live SVGs, 1,797 labels, every viewBox 500 wide, minimum font-size 7)
measured the smallest label at 12.01px in the settled sheet. Two notes came back, both pre-existing, both
fixed AFTER the gate as one-line CSS changes and checked by measurement only (no fourth verifier round):
- a tapped tab that was only partly visible stayed under the 44px chevron, because `scrollIntoView('nearest')`
  counts it as visible: `scroll-padding-inline-end: 58px` on the phone `.tab-bar`. Measured: tapping the
  half-hidden "Practice" tab slides it to 238-326px, exactly clear of the chevron at 326.
- above 768px the sheet's SVG was 300px, the intrinsic default, because the three-part selector said
  `width: 100%` of a shrink-to-fit sheet: it is `min(80vw, 900px)` there now. Measured 819px at 1024 (was
  300; inline is 270).
The verifier's measurement caveat is worth keeping: with the Browser pane hidden the sheet's scale-in does not
run and rect-based numbers read 0.92×; read computed styles, or front the tab. **Ship at the checkpoint** once
the funnel baseline has two weeks behind it (~26 September), as a PR the founder merges.

**Post-gate, 14 September: every Vercel preview since 8288315 failed to build, and the cause was packet 5's
own new route.** `app/api/sections/depth/route.js` carried `export const revalidate = 3600`, which makes Next
run the handler during `next build`, and the handler used `createServerClient()` — the SERVICE ROLE key, which
is Production-only in this project. So the build called Supabase with no key and died: "supabaseKey is
required. Export encountered an error on /api/sections/depth/route, exiting the build." Local builds passed
throughout because `.env.local` has every key. Fixed by `export const dynamic = 'force-dynamic'` (the hourly
cache is the CDN's job, through the `s-maxage` header the route already sets, not the build's) and by reading
with `createAnonClient()`: these are public counts over tables the public topic pages already read
anonymously, and that client falls back to a no-op when env vars are missing, so a missing variable degrades
the depth chip instead of breaking a deployment. After: static pages 157 → 156 (the route is no longer
prerendered), local build exit 0, `/api/sections/depth` returns 43 sections and 22 thin with the cache header
intact. **The rule: nothing that talks to Supabase may run during `next build` unless it uses the anon client.**
Only `app/economics/[unit]/[topic]/page.jsx` and `app/business/[unit]/[topic]/page.jsx` prerender now, and both
already use the anon client. See [[revvylearn-guides-seo-audit]] for the first time this env trap cost a day.

**A note on the gate.** `npm run validate` reads live content, so a run can fail transiently while another
session publishes. One run exited 1 here; three consecutive runs then exited 0 at 902 BLOCK / 1285 DEBT with
0 new, matching the packet-13 verifier's figures. Re-run before believing a red validator.

**Post-gate, 14 September, found by the founder on localhost: scrolling "forces you back up".** The tab strip's
keep-the-active-tab-visible effect (packet 5, F096) called `scrollIntoView` — which scrolls ancestors
vertically — on EVERY render, because its `tabs` dependency is a fresh array each render and the app re-renders
on every scroll frame for the reading-progress bar. With the sticky header hidden mid-scroll it pulled
`.tab-content` back up by the header's height on each wheel tick. Reproduced by script at 390px: 24 scroll
steps produced 70 scroll events and a 72px jump back after the last. Fixed in `AnimatedTabBar.jsx`: the strip
moves only its own `scrollLeft`, once per tab change, with the chevron clearance read from
`scroll-padding-inline-end`. After: 24 events, no drops, final = max; tapping the half-hidden Practice tab
still slides it to 238-326, clear of the chevron at 326. No verifier round: measured only. A lesson for the
verifier brief: **scroll the page with real input while the app is re-rendering**; the round-1/2/3 walkthroughs
scrolled with `scrollTo` once and never saw it.

## Packet 13 spec — the off-spec strip and dedupe (built and VERIFIED 14 September 2026; Verify A passed on round 4 — D010 and D011 confirmed, `unverified 13` clear; all content published to live)

**What it had to make true.** No framework the IAL specification does not contain is taught or assessed anywhere in
live content. No section teaches a specification bullet another section owns. Nothing this packet removed is still
being tested. Near-duplicate and identical quiz stems within a section are gone (F081).

**What it did.** Read `scripts/_packet13-plan.mjs`, `_packet13-residual-plan.mjs` and `_packet13-dedupe-plan.mjs`:
each op carries the evidence for itself. Five blocks removed across four sections; the specification's vocabulary
replaces the GCE labels in 13 sections; two of three cross-section duplications resolved and the third written up
as a manifest in `audit/SPEC-OWNERSHIP.md`; 19 duplicate stems rewritten to test a different angle.

**Acceptance script (Verify A).** Read-only. `npm test` green (105 with packet 5's suite registered). `npm run
validate` exit 0. `npm run build` green. `node audit/scripts/packet-13-census.mjs` exits 0 with every banned term
at 0 hits and D012 clear, and `--self-test` passes; its D011 block must report the multiplier under its own heading
in aggregate-demand and nothing else anywhere. Both `--check` builders pass. Then the five claimed ids. The baseline
must be SMALLER than at packet 3: 2,489 -> 2,187 keys, BLOCK 1,131 -> 902, `terms.off-spec` 19 -> 0,
`quiz.near-dup` 36 -> 17.

**Verify A, round 1 (14 September): F081, D009, D012 confirmed; D010 and D011 rejected, both correctly.**
- D010: the vocabulary swap was complete but eight sentences came out damaged — a tautology ("welfare loss or
  welfare loss"), an ungrammatical phrase, a circular model answer, a repeated word, and a claim widened past its
  truth ("goods with external benefits are excludable and rivalrous"). Each is patched by hand in
  `scripts/_packet13-polish-plan.mjs`; the runner now refuses to stage while any phrase a plan says must be gone
  survives. The same pass fixed two market-failure quiz pins the rewrites had made wrong and the sentence that
  still listed monopoly power as a type of market failure. Published; the verifier's sentence diff is the check.
- D011: the census's ownership check was dead code (its path test could never be true), and the map's own
  multiplier row says "not resolved". The predicate is fixed with a `--self-test`, the census now reports the
  multiplier under its own heading in aggregate-demand, D011 is narrowed to the six resolved rows, and the
  seventh is D013 on packet 37 with the manifest in `audit/SPEC-OWNERSHIP.md`.
- New, not in this packet's scope: the public revision pages, the tutor prompt and the model-answer data still
  carry 45 mentions of the removed material across eight files. Minted as D014 on packet 57 (cross-surface
  consistency) with the file list; some of those mentions are correct explanations of the IAL vocabulary, so it
  is a reading pass, not a substitution.
- Two 390px nits on the rewritten fill-in (words breaking inside chips) are fixed in the stylesheet.

**Verify A, round 2 (14 September, commit a91265f): D010 and D011 rejected again, both correctly.** Round 1's eight
sentences were closed; the same read found the same classes still live. Pass 3 (`scripts/_packet13-pass3-plan.mjs`,
`--plan pass3`) answers each, one rule per sentence, and is **published to live content** (14 September, on the
founder's instruction; 13 tables across five sections, each with an automatic pre-publish snapshot in
`audit/snapshots/auto-prepublish-2026-09-14T17-*`, each read back and re-validated before the next).

**After the publish, two more one-item passes, both found by the baseline diff rather than by a person.**
`node audit/scripts/validate-content.mjs --baseline` wanted to add five DEBT keys. Four were the same findings
those items already carried, re-fingerprinted because the text around them changed — the fingerprint design
working as intended. Two were not, and neither was re-baselined:
- **pass 3b** — the rewritten "Diagrams for Welfare Loss" recall asked for `social` as an answer while the
  first line of its own template printed "social optimum": `fillin.leak`, an answer readable off the exercise,
  introduced by pass 3. The blank moved to `efficient`, and the item gained the two-to-three distractors
  `fillin.distractors` has always wanted, so both findings cleared instead of being forgiven.
- **pass 3c** — my replacement paragraph took that subsection to 352 words against the 350-word budget. Four
  words came out of the sentence. "The baseline only ever shrinks" stops meaning anything the first time a
  packet writes its own new debt into it.

Baseline then rewritten: **2,455 → 2,448 keys**, the four re-keys in and eleven out. Census exit 0 with every
banned term at 0 hits, including `DWL`. Gate: `npm test` 105/105, `npm run build` exit 0, `npm run validate`
exit 0. The six relabelled diagrams measured over live content: 0 overlapping label pairs and no label of mine
outside its viewBox (the two the crude width estimate flags are a rotated axis title and a pre-existing
right-edge legend word, neither touched by this packet).
- **D010, class 1 — swap artefacts:** "access to public and goods with external benefits" (government-intervention
  takeaway), "the argument for goods with external benefits and external costs" (market-failure note), "goods with
  external benefits or goods with positive externalities" (government-intervention note), and "Marks follow you
  for" ×4 (the rule swapped "Examiners reward" and left "you for"). Each rewritten by hand.
- **D010, class 2 — the over-reach:** role-state-macroeconomy's whole subsection "External Benefits and
  Redistribution" (key idea, first paragraph, flow step, exam tip, real example, two takeaways) and its notes
  entry (key idea, both definitions, the regulation line, takeaway, exam tip) DEFINED goods with external benefits
  by information failure, and market-failure's chain "Information failure leads to misallocation" did the same.
  Every sentence now says the 1.3.5.2c-d thing — the buyer ignores the benefit to third parties — and, where it
  mentions information, says it is a separate source (1.3.5.4b) that widens the gap.
- **D010, class 3 — six SVG labels reading "DWL"** (government-intervention max and min price, monopoly
  equilibrium, tariff, quota, tax incidence). The census's `\bdeadweight\b` could not see the abbreviation; it
  bans `\bDWL\b` now. Each label is re-placed by hand from the diagram's geometry (`scripts/_p13-geom.mjs`:
  curves, dashed lines, neighbouring text), because "Welfare loss" is five times wider than "DWL" and the
  triangles are 30-40 units across: "Welfare loss" just outside its triangle in the clear space the curves leave
  (max price, min price, monopoly), "Loss (b)" / "Loss (d)" under the dashed quantity lines with leaders on the
  tariff and quota diagrams (whose key already reads "Net welfare loss = b+d"), and "Welfare loss" below the
  demand curve with a leader on tax incidence. The verifier should look at all six on the Diagrams tab at
  390px. The two scratch tools used to place them (`_p13-geom.mjs`, `_p13-draft-svgs.mjs`) are deleted now that
  the pass has landed, since they read drafts and a label that no longer exist.
- **D011 — monopoly taught below heading level in market-failure:** the "Diagrams for Welfare Loss" paragraph,
  its exam tip ("monopoly diagrams"), its real example (Harberger) and recall line ("Monopoly: output restricted
  below ___ level"), the "Measuring Welfare Loss" sentence listing "a monopolist restricting output", the
  "Allocative Inefficiency" real example (Shkreli), and a quiz distractor. Each replaced with the Unit 1 case
  the specification does put there: an intervention that overshoots (1.3.6.2a, government failure as a net
  welfare loss) and the uncorrected externality (Stern Review; the World Bank/IHME air-pollution estimate).
  `SPEC-OWNERSHIP.md`'s monopoly row now says what "Done" means: body text too. Its multiplier manifest gains
  the notes entry the verifier spotted (`aggregate-demand` `notes[3]`).
- The verifier's D014 note (the public `app/economics/market-failure/page.js` FAQ contradicts itself on the
  same vocabulary) is added to D014's ledger note for packet 57.

**Verify A, round 3 (14 September, commit 4293ba4): D010 and D011 rejected again, both correctly, and the
sentence to keep from the report is "it is the third round in which a heading-level or field-level fix left the
teaching beside it."** What it found, and what pass 4 did:
- **D010, the over-reach, in the fields pass 3 did not reach.** `role-state-macroeconomy` `notes[1]`'s FLOW
  still read "Consumers undervalue long-term benefits" → "Under-consumption creates welfare loss": the
  information mechanism as the definition of the class, one card away from the keyIdea pass 3 had fixed. A flow
  step is not a sentence in prose, so no substitution rule could match it. Both misconceptions still merged the
  externality with information failure, and the subsection's own exam tip tells the student not to merge them.
  `market-failure`'s education quiz keyed the same merge.
- **D011, a topic another section owns, taught below heading level.** `business-growth` kept two demerger
  takeaways after the demerger subsection went; `introductory-concepts` kept a takeaway naming the three
  functions of the price mechanism and a flashcard testing them — 1.3.4.3a-b taught AND assessed in 1.3.1.
- **What is genuinely done**, per the same report: all class-(a) swap artefacts gone, `DWL` at 0 hits over
  43 sections × 8 tables with all six labels correct, 450 snapshot-vs-live strings read with no other damaged
  sentence, and the monopoly row of the ownership map true at last.

**Pass 4 (`scripts/_packet13-pass4-plan.mjs`), published the same day.** It does not fix only the fields it was
shown. Every field of the two role-state entries was read, and the ownership map was re-run over BODY TEXT in
all 43 sections: that turned up the two D011 instances the verifier named and two more of the same class it did
not (the `introductory-concepts` notes item that taught the three functions, and — checked and kept — four
references that are legitimately references). The flashcard is rewritten rather than deleted: ids are stable and
progress rows point at them, so a delete would take a student's review history with it. Deliberately left, with
reasons recorded in the plan file so round 4 need not re-litigate them: government-intervention's two
cross-referenced mentions of the rationing function inside its own price-controls treatment; external-influences'
five-forces subsection, which the map already defers to that section's content packet;
government-intervention's nudge subsection, which is an intervention method under 1.3.6 rather than the
behavioural bullet at 1.3.2.1b; and government-intervention-firms' monopoly welfare-loss flashcard, same unit
and paper as the owner. Gate after publish: 7 tables staged and published across four sections, MUST_NOT_SURVIVE
0 survivors, census exit 0, validate exit 0, tests and build exit 0, baseline a single clean re-key (+1 −1).

**Verify A, round 4 (14 September, commit 539e60f): D010 and D011 CONFIRMED; `unverified 13` clear — the gate
passed.** The verifier read every string of both role-state entries, swept all 43 live sections for any
remaining definition of the class by information failure (15 candidate hits, none of them a definition),
re-checked classes (a), (c) and (d) for regression, and diffed the four pass-4 sections against their
pre-publish snapshots string by string: 12 added, 11 removed, every one named by the plan and no collateral
edit. For D011 it checked all six "Done" rows of the ownership map against body text in every non-owner
section, and agreed with all four of the references pass 4 deliberately kept.

**Two nits it handed back, neither a rejection, both for the `introductory-concepts` content packet:**
- `market-failure` `practice[4]` guidance, example 2, attributes under-consumption of "goods with external
  benefits such as education" to underestimating the private benefit with no mention of the externality. It is
  correct for its own stem, which asks for two examples of information failure, but the sentence would read
  better without the class name in it.
- `introductory-concepts` flashcards 6, 7 and 8 now overlap with the rewritten card 9. Pass 4 rewrote 9 in
  place rather than deleting it, because ids are stable and progress rows point at them; the redundancy is the
  price of keeping a student's review history, and the section's own content packet should resolve it when it
  rewrites that deck.

**Round-3 replay.** `node audit/scripts/packet-13-census.mjs` exit 0 with DWL at 0. Snapshot-vs-live
diff over the five sections: every changed string named by a pass-3 rule. Read role-state-macroeconomy
"External Benefits and Redistribution" end to end: no sentence defines the class by information failure. Read
market-failure block 5 end to end: no monopoly teaching; the recall's third line is the tax-above-external-cost
case. Diagrams tab at 390px for the six relabelled diagrams: the label reads "Welfare loss" or "Loss (b)/(d)",
sits clear of curves and other labels, and the leader (where there is one) ends at its triangle.

**Verify B.** *Done 14 September, main session, fresh tab, storage cleared.* market-failure Learn Mode is 5 blocks
(was 7), with no "Merit Goods & Demerit Goods" and no "Market Power as Market Failure"; the block that was "Welfare
Loss & Deadweight Loss" reads "Welfare Loss"; the words "merit good" and "deadweight" appear nowhere on the page.
Step 2 of 6 holds the rewritten fill-in: chips MC / underproduces / welfare, placed in order, blanks read
"P = MC", "over- or underproduces", "the surplus that is lost is called welfare loss", "✓ All correct!", 3 correct
blanks and 0 wrong. aggregate-demand is 4 blocks with no accelerator. assessing-competitiveness is 1 block with no
VRIO, competencies, scorecard or five forces. Console: only the signed-out 401.

**Known limits, stated so nobody is surprised.**
- **assessing-competitiveness (business 3.3.5) is now one block.** Its second block taught VRIO and core
  competencies, which the specification does not contain; what 3.3.5 does contain — financial statements, the HR
  metrics and the four HR strategies — was never written. The section is thin and honest rather than fuller and
  wrong. Packet 54 fills it, and `spec.uncovered` now names the two HR-strategy leaves it is missing.
- **The multiplier duplication is not resolved.** See the manifest in `audit/SPEC-OWNERSHIP.md`; it belongs to
  packets 32 and 37 together.
- **`external-influences` (business 2.3.5) still refers to Porter's five forces** inside a subsection on
  competitive pressure. That is a reference, not a second treatment, and its own packet decides.
- **Twenty-five near-duplicate pairs were deliberately left.** They share a stem frame and test different things.
  `quiz.near-dup` still reports them, which is the honest state of a lexical rule.

## Handoff — what comes next

Packet 13 was the last packet before the content stage proper. The order from here is 13.1-13.8 (the quant drills,
blocked behind packets 5 and 7), 13.9-13.12 (exam practice), then 14, the first content section, on Fable.

Three things a content session must know, in addition to packet 3's two:
1. **Write through `stageSection`, publish with `scripts/publish-section.mjs`.** Both read the row back and
   validate it. `scripts/_content-ops.mjs` is there for declarative surgery: it deletes by id and renumbers
   `quizIndices` / `practiceIndices` for you, which is the thing that is easy to get silently wrong.
2. **Run the per-section checklist in `CONTENT-GATE.md` between staging and publishing**, and re-run
   `node audit/scripts/validate-content.mjs --baseline --confirm` at the end so the baseline shrinks by your work.
3. **Touching a sentence means owning its findings.** Budget for it: this packet's second-order fixes were about a
   third of its edits, and they are why the baseline moved.

## Packet 3 spec — Validator v2 and golden set (built 14 September 2026)

**What it must make true.** No content reaches `data` without `lib/content-validator.mjs` having run over the
whole section; a push with a BLOCK finding outside the committed baseline is refused; the two reference assets
are generated from the specification text and cited per row; every rule has a failing fixture; the gate is
`npm run validate` and `npm test`, both green.

**Acceptance script (Verify A).** Read-only. `npm test` 95/95. `npm run validate` exit 0. `npm run build` green.
`node audit/scripts/build-tariff-census.mjs --check` and `build-spec-items.mjs --check` pass. In a node
one-liner, `supabase.from('section_quiz').update({ data: [] })` from `scripts/_db.mjs` throws synchronously
and `.update({ draft: [] })` returns a builder (do not execute it). A fill-in recall with duplicate answers
(consumer-behaviour-demand, "utility" ×2) can be completed in the browser. Then the six claimed ids.

**Verify B.** Only the FillInRecall change is student-facing: place both "utility" chips, confirm Check enables.
*Done 14 September, main session, fresh tab, storage cleared:* consumer-behaviour-demand → Start learning → Just
teach me → step 2 (the spaced recall; `LearnModeTab.jsx` shows the first subsection's recall per step) holds the
recall with chips "diminishes", "utility", "utility" rendered as three buttons.
Tapped utility → utility → diminishes: blanks filled utility / utility / diminishes, bank emptied, Check enabled,
"✓ All correct!" with 3 correct blanks and 0 wrong. Console: only the signed-out 401. Under the previous renderer
the second "utility" tap had no chip to find.

**Known limits, stated so nobody is surprised.** Reorder rules are lexical (51 of 66 bad recalls caught, 15 are
semantic). Layer 3 is a lexical floor (81% mean vs the reading audit's 62%). Twenty-five questions decline to
shuffle over bare "(A)" letters until their explanations say "Option A". `quiz.histogram` is DEBT: a new bank
that is 64% B is reported, not refused. `quiz.explanation-option` fires only when an explanation quotes a
distractor word for word and shares no word with the answer; paraphrase is not judged. `locale.uk` is a ratio,
so it cannot say whether the international example chosen is relevant — the checklist does. The baseline holds
2,489 keys (1,131 BLOCK, 1,358 DEBT) and is the content stage's to-do list, section by section.

**Verify A, round 1 (14 September) rejected F073, F110 and F116; all three were fixed the same day.**
- F073: the widened subtitle split had taken "Float = LFT - EST - duration" apart and the italic regex had
  eaten "P*"/"Q*". The split is em dash only again, in `lib/flow-step.js` with its own tests; the italic
  regex applies CommonMark flanking (an opener cannot follow a word character); 6 live strings change, all
  star notation; the object form is documented in the template header and CONTENT-GATE.
- F110: the write path was open at the admin PUT, the diagrams route, ten seed/one-off scripts with their own
  clients, `schema().from()`/`rest.from()`, and `stageSection` reported success on a row it had not written.
  All closed: `lib/content-gate.mjs` runs in the two routes (422 with findings), every script imports the
  guarded client, the proxy covers all three `from`s, staging counts updated rows and reads back, publish and
  restore read back, `lib/write-path.test.mjs` scans for any new writer. The two skipped rules exist
  (`quiz.explanation-option`, `depth.notes-titles`). Keys carry an item fingerprint so a rewritten item cannot
  hide behind a baselined key; the baseline was rewritten (+1,847 −1,597; only the three intended rules moved).
- F116: the checklist is in CONTENT-GATE.md ("The per-section edit pass"), pointed to from PROTOCOL and the
  template; `locale.uk` is now a ratio against international mentions, so a section framed only on the UK fails
  at one mention, and `locale.institution` is per sentence.
- Also from the verifier's census: 20 spec-items rows had a word cut at the letter column; the parser now
  keeps a full-width line whole, `npm test` runs the census over all 1,319 rows (0 missing tokens, counts
  unchanged), and the two tariff rows that carried page-footer text no longer do.
`npm test` is 95/95.

**Verify A, round 2 (14 September, commit 507e09b): F073, F110 and F116 confirmed; `unverified 3` clear.** The
verifier re-measured the italic change itself (6 strings differ, all star notation; 41 real emphasis runs
unchanged), re-keyed a live essay stem and watched its key change while a rotated quiz array changed none,
built its own UK-only and UK-among-others fixtures, and re-ran the spec-items census (0 missing). Its remaining
notes, all acted on the same day or written down: `.delete()` on a content table is now refused by the guard
and scanned for by the write-path test; `schema().rest` no longer throws from the proxy; the diagrams route
reads back after both writes. Not fixable at the client and recorded in CONTENT-GATE ("What this still will
not catch"): `rpc()` passes the proxy, so a SQL-executing function in the database would be a bypass no client
guard can police (`seed/setup-pdfs.mjs` calls one named `exec_sql`; it does not exist in this project's
database, and must not be created). The baseline's fingerprints match live rows, not any snapshot, so it can
only be regenerated against the database.

## Handoff — what comes next

Packet 3 is the last code packet before content. With it in place the order is 13 (off-spec strip, now
measurable: `terms.off-spec` and `terms.later-unit` list every instance), 13.1-13.8 (drills), 13.9-13.12
(exam practice, which hands the validator its `specItems` contract), then 14 (the template section on Fable).
Every content session starts with `npm run validate --section <id>` and ends with the section's baseline
smaller than it found it.

Two things a content session must know: a finding key is `section | rule | where | fingerprint`, and the
fingerprint hashes the item itself, so rewriting an item (even with the same id) retires its old keys and any
finding on the rewritten item is a real regression, not noise — which also means touching an item that carries
a baselined BLOCK obliges you to clear that BLOCK; and `spec.uncovered` for a section lists exactly which leaves
it is expected to teach, with the spec line to read.

## Two corrections worth carrying forward

- **Packet 2 is done except F052, F109 and F115.** Diagram blocks still pin by ref: 0 of 39 carry a
  `diagramId`. Measured against live content: of 170 chapters, 15 get a diagram by pin and 36 by the packet 2
  title fallback, so 51 render one. The 119 with none are dominated by the 20 Business sections that hold
  zero diagrams at all, which is a content gap, not a pinning bug. The fix here is writing `diagramId` onto
  the 39 blocks that carry a ref.
- **The gate now reports unclaimed scope.** `ledger.mjs unverified <n>` used to check only claimed items, so
  a packet could pass by claiming less than its scope. Do not record a packet done while its scope is open.


---

## Handed over from another session, 12 Sep 2026 — specification coverage audit

**Not a packet. Nothing actioned. Read before costing the Content stage.**

`audit/SPEC-COVERAGE.md` (narrative) and `audit/raw/spec-coverage.json` (per-topic data) were produced in
the worksheets/AO-profile session by checking all 43 live sections requirement-by-requirement against the
verbatim spec in `audit/raw/econ_spec.txt` / `bus_spec.txt` — the same source packet 9 built
`lib/ial-marking.js` from.

Three things that bear on this plan:

1. ~~**Scope reconciliation needed.**~~ **Done 13 September.** Matched section by section against the
   ledger: 156 of the 175 MISSING and 166 of the 237 THIN were already described by an existing ledger
   item. **Net new scope is 90 items, not 412** — 19 gaps and 71 thin — which is about two per section and
   fits inside the existing per-session budget. The Content stage does not grow by twenty sessions. All 90
   are in the ledger; see the reconciliation table in `PLAN.md`.

   Two by-products, both bigger than the counts: **154 ledger items cite UK GCE spec numbers that do not
   exist in the IAL spec** (every real IAL topic number has 3 as its middle digit), now annotated with the
   correct topic for their section; and **17 requirements across 12 sections are quizzed but never taught**
   (`audit/raw/assessed-not-taught-2026-09-13.json`), which is the cheapest work in the whole Content stage.

2. **The diagnosis, which reframes the Content stage.** The notes read as adapted from UK GCE A-level
   rather than built from the IAL spec. Business 3.3.5 teaches VRIO, Porter's Five Forces, the balanced
   scorecard and the triple bottom line — none in IAL 3.3.5 — while the spec's own content (financial
   statements, acid test, labour turnover/retention/absenteeism, four HR strategies) is absent. AS is 73%
   taught, A2 49%; Business Unit 4 is 40%. Treat any A2 topic as inherited-until-checked. This is the
   inverse of packet 13's off-spec strip and belongs in the same pass.

3. **Per-section work lists already exist.** Each Content packet's "spec gaps" step can start from that
   section's `missingItems` / `thinItems` in the JSON instead of re-deriving them. Every MISSING was
   attacked by a second agent trying to overturn it; 23 of 197 were overturned and downgraded, so expect
   a residual error rate and spot-check before writing to a gap.

Measured across all 43 sections on 13 September, this is 17 requirements in 12 sections — the list is in
`audit/raw/assessed-not-taught-2026-09-13.json`. The original estimate named seven topics that quiz
students on content the notes never teach (HR half of Business
3.3.5, contingency planning in 3.3.6, PESTLE/Porter's five forces in 3.3.1, stakeholder distinction in
3.3.4, profit satisficing and cost efficiency in 1.3.5, specific vs ad valorem in Economics 1.3.3, FDI in
Economics 2.3.5). Wording already exists in the flashcards/quizzes; it just isn't taught.

---

## Packet 5.1 — the resume pointer (built 15 September 2026, Opus 5)

Appended, not rewritten: a packet-15 session owns the brief at the top of this file.

**What shipped in the branch** (`components/StudyApp.jsx`, `lib/learn-steps.js`,
`lib/learn-steps.test.mjs`, `scripts/repair-progress-pointers.mjs`, `audit/scripts/ledger.mjs`):
`furthestStep()` clamps the stored high-water mark on write (D015); the overview bar is measured against
`countSteps()` of the live content, clamped (D016); `scripts/repair-progress-pointers.mjs` repairs rows that
already point past the end (D017). Gate: `npm run build` exit 0, `npm test` 133/133, `npm run validate`
exit 0. It ships WITH packets 5 and 7 at the checkpoint (~26 Sep), not before.

**Exit criteria still open:**

1. ~~**Verify A has not been run.**~~ DONE 2026-09-15: 3 of 3 confirmed on round 1, `unverified 5.1` exits 0.
   The verifier re-derived the clamp by hand rather than reusing `clampStep`, and cross-checked both models
   against the live database — the independent check this programme asks for.
2. **Half done.** `--model pair --confirm` was run 2026-09-15 14:39Z: 28 rows / 18 students, snapshot at
   `audit/snapshots/progress-repair-2026-09-15T14-39-17-573Z.json`, both models now clean. **Still owed: re-run
   `--model steps --confirm` at the checkpoint merge**, because the denominator changes that day. Original note: It needs Ronald's go-ahead, and the model matters:
   `node scripts/repair-progress-pointers.mjs --model pair --confirm` unbreaks the 24 rows / 17 students
   against what main serves today; `--model steps --confirm` (the default) is the right one to run after
   packets 5, 7 and 5.1 merge. Re-run the dry run first — it prints every row it would touch.
   `--confirm` writes `audit/snapshots/progress-repair-<stamp>.json` before it changes anything and
   refuses to write at all if it cannot; undo is `--restore <that file> --confirm`.
3. **D015-D017 are in `audit/ledger.json` on disk but NOT in this commit** — the packet-15 session has that
   file dirty with its own claims. Whoever commits the ledger next carries them; check they survived.

**Two things this packet learned that outlive it:**

- The bug lived on production for months (the oldest broken row is May 2026) and three rounds of packet-5
  verification never saw it, because every check read the pointer back through the same clamp that had
  just been added. The evidence that found it was the database, not the UI: 1,134 progress rows and 757
  `learn_open` events, read directly. See `[[revvylearn-verify-independently]]`.
- **`app_events.total_steps` is not trustworthy as a record of what content was live.** Switching sections
  mounts `LearnModeTab` once with the PREVIOUS section's content (`key={activeSection}` flips before the
  `[activeSection]` fetch effect nulls `sectionData`), firing a phantom `learn_open` that carries the wrong
  section's step count: 80 of 757 events since 1 Sep are the same section firing twice under 5s apart with
  two different totals, and 397 of 756 carry a total the section's live content cannot produce. That also
  means **`sectionStarts` is inflated by roughly 10-16%** — deflate it before filling in the baseline in
  PROGRESS.md. The phantom mount is NOT fixed by this packet; it needs its own packet (the fetch effect
  wants a stale-response guard and `sectionData` wants to be nulled in the same commit as `activeSection`).

**Two things Verify A turned up that are not ledger items:**

- `handleStepChange` (`components/StudyApp.jsx:810-823`, wired to `ContentTab`, not `LearnModeTab`) is a
  SECOND writer to `user_content_progress` and it bypasses `furthestStep()`. It cannot reproduce D015 today —
  `ContentTab` bounds its own pointer to `[0, data.length - 1]` and `data.length` (the block count) is always
  `<= countSteps(content)`, since every block contributes at least one step — but that is an invariant nobody
  is checking. If a future model ever lets a block contribute zero steps, this writer poisons rows again.
  Either route it through `furthestStep()` or assert the invariant in `lib/learn-steps.test.mjs`.
- The out-of-range count drifted from 24 rows / 17 students to 28 / 18 in the three hours between measuring it
  and repairing it, because packets 14 and 15 republished two sections in between. That is not noise; it is the
  defect's own mechanism. **Every content packet that changes a section's step count poisons the pointers of
  everyone mid-way through it**, and will keep doing so until 5.1 is merged. Re-run the dry run immediately
  before any `--confirm`, and expect the repair to be needed once more at the checkpoint.

---

## Packet 2.1 — V007, the paywall page payload (done 16 September 2026, Opus 5)

> **TO THE PACKET 23 SESSION, and to every session sharing this worktree — read this first.**
> **`58e8bb7`, my gate commit, carries your files.** `scripts/packet-23-supply.mjs`, the four
> `_packet23-*` modules, `audit/snapshots/2026-09-16-pre-packet-23__economics__supply.json` and
> `audit/snapshots/packet-23-bundle__economics__supply.json` are all committed and pushed under a
> `packet-2.1:` subject line. Nothing is lost and nothing is altered — but your `git status` is clean
> for a reason that is not you, and your own gate commit will find nothing to add.
>
> **Why, and the rule it teaches.** `git add` writes to the INDEX, and in a worktree the index is
> one file shared by every session in it. PROTOCOL rule 7 says to stage explicitly and never
> `git add -A` — that is necessary and it is not sufficient. I staged one path; you staged nine in
> the seconds between my `git add` and my `git commit`; `git commit` commits the index, so mine took
> all ten. **Use `git commit --only <paths> -F -` instead of `git add` + `git commit`.** It commits
> exactly the paths you name whatever else is staged, and it cannot sweep up another session's work.
> This packet's later commits use it.
>
> **`--only` refuses a path git has never seen, which is most of a content packet.** Reported by the
> packet 21 session: `git commit --only scripts/_packet21-util.mjs` fails with *"pathspec … did not
> match any file(s) known to git"* on every new file. `git add -N <paths>` (intent-to-add) first, then
> `git commit --only <paths>`. **And `-N` is safe in a shared index, measured rather than assumed:**
> with an intent-to-add entry of mine sitting in the index, another session's plain `git commit` took
> only its own staged file and left mine staged and uncommitted. A full `git add` in that position is
> what gets swept; `-N` is not.



Appended, not rewritten: packets 21 and 22 own the top of this file.

**Brief:** `audit/BRIEF-paywall-page-payload.md`. **Commits:** `b5f1729` (build), `bd44d2f` + `705c893`
(V011, two rounds), and this gate commit. **Verify A: 4 of 4 confirmed — V007 and V010 on round 1,
V011 on round 2 after a reject, V013 on round 1.**

### The spec, as built

Close **V007**: both `[unit]/[topic]` pages and `app/page.js` read all eight section tables with
`createAnonClient()` and handed the result to `StudyApp` as `initialSectionData`. Measured on `supply`
before the change: **25 `correctIndex` values, 18 flashcard fronts, 18 backs, 25 option sets and the
paid-only common mistakes, in the HTML of a page that needs no account.** The Quiz tab sliced to two in
the browser, which is why it looked gated; the Quick Fire drill did not, and offered a signed-out
student **25 questions while the API sent 3**. That number is how it was found. Same class as F086,
which closed the API door and left this one open. It is on `main`, so it is live now.

### Rule 1 again: the brief asked for two things that cannot both be true

Part 1 said the pages should ship the same capped preview the API sends. Part 2 said to revoke anonymous
`select` on the four paid tables. **A page that can still build a quiz preview is a page RLS has not
closed**, because those pages read Supabase with the anon key. Capping would have shut the casual door
and left the deliberate one open: the anon key ships in the browser bundle.

Built the other way: the pages ship the **free surfaces only** and the client fetches the paid half from
the entitled API, free students included. See DECISIONS for the five things later packets must respect.

### What changed

| | |
|---|---|
| `lib/preview-limits.js` | `sectionPayload(tables, {isPremium})` — the whole response body for one student, in one place. `publicSectionPayload(tables)` — what a page may put in its HTML, with `paidPending: true` so the client can tell withheld from empty |
| `app/api/sections/[id]/route.js` | calls `sectionPayload`; the only caller that may pass `isPremium: true` |
| both topic pages, `app/page.js` | read four tables, not eight; build through `publicSectionPayload` |
| `components/StudyApp.jsx` | fetches on first paint when the payload is pending; answers `paidPending` with the loading card **before** entitlement, so no paywall flash and no "2 of 0"; preview mode follows `sectionData.isPremium`; the overview's Quiz and Flashcards cards read the true `counts`; the section fetch de-duplicates by key and drops a stale response |
| `components/LearnModeTab.jsx` | V011: the pre-test offer is re-derived when the questions arrive instead of latching at mount |
| `components/learn-mode/PreTest.jsx` | V013: records `pretestState: 'taken' \| 'skipped'` through `saveSectionState` on both paths |
| `lib/read-path.test.mjs` | the mirror of `write-path.test.mjs`: fails the build if anything but the entitled API reads a paid table with the anon client, and pins the `paidPending`-before-paywall ordering |
| `scripts/packet-2-1-paid-table-rls.sql` | layer two, for Ronald |
| `scripts/check-paid-table-rls.mjs` | measures layer two over raw PostgREST, sharing no code with the app |

### Verify B — 390×844, signed out, `supply`, dev server on 3001

- Overview: Learn 11 steps · Notes 3 topics · Diagrams all annotated · Practice 5 questions.
  **Flashcards "18 cards", Quiz "25 questions"** — the true totals, from `counts`, to a signed-out
  student. Before this packet the same cards read the length of whatever array the student had been
  sent, so they said 25 on the first section and 3 after a section switch.
- Quiz tab: two questions and the submit button, preview intact, no flash of a paywall and no flash of
  an empty tab.
- Learn Mode resumed at **step 4 of 11, a chapter check-in**: the diagram rendered, the label drill
  rendered, and **"💡 QUICK QUIZ — The supply curve for a good slopes upward because:"** rendered — so
  the pin remap in `freeQuizPayload` still resolves through the new page → API path.
- Completion screen: **"⚡ Quick fire drill (3 questions)"**. It offered 25 before. That is V007's own
  evidence, closed.
- Pre-test offer ("Want a quick check first?") renders on a cleared local state.
- HTML, signed out: `"quiz":[],"flashcards":[],"extras":{"chains":[],"evaluation":[]},"mistakes":[],`
  `"paidPending":true,"isPremium":false`. Zero `correctIndex`, zero `front`, zero `back`, zero `options`
  — against 25/18/18/25 on live production. Same on `/business/unit-1/the-market` and `/`.
- One `GET /api/sections/supply` per load. No console errors. One pre-existing 401 on
  `POST /api/learn-mode/state` for a signed-out student, unrelated and not new.

**Not walked: the signed-in Pro path.** No Pro credentials in this session, the same limit packet 17
hit. The Pro payload is proven differentially instead (see V010) and the no-flash ordering is pinned by
a test rather than by a screenshot.

### For Ronald — one command, and it is not urgent

After this deploys, run `scripts/packet-2-1-paid-table-rls.sql` in the SQL editor
(https://supabase.com/dashboard/project/trweeckuswgkenckeqfb/sql/new). **Order matters**: the code lands
first or the pages break. `node scripts/check-paid-table-rls.mjs` before and after — it exits 1 today
because all four paid tables answer the anon key.

### What Verify A found that the packet had not claimed — the useful half of this session

**V010, confirmed: on this branch the API has been serving every premium student an EMPTY quiz.**
`665ae87` wrote `quiz: isPremium ? arr(allQuiz) : free.quiz`, but `allQuiz` was already the unwrapped
array and `arr()` expects a query RESULT — it reads `r.data?.data`, which an Array does not have. So
the premium branch returned `[]`: 0 questions in the Quiz tab, 0 at every chapter check-in, no drill.
**Branch-only** (`git branch -r --contains 665ae87` lists only `origin/remediation/2026-09`, and live
production returns 25 signed out), so no student was served it — but it would have shipped at the
checkpoint. Fixed incidentally by `sectionPayload()`, which takes arrays and never re-unwraps. Found
differentially: the old inline route body against the new builder over seven real sections is
deepEqual-identical at `isPremium: false` and differs at `isPremium: true` in all seven, on that line
alone. **The lesson is the differential, not the bug**: a refactor that claims "behaviour unchanged"
can be checked against its own predecessor over real data, cheaply, and this one was wrong about the
half nobody was looking at.

**V011, rejected on round 1, and the reject was right.** The verifier built the race I could not: a
proxy on `:3002` forwarding to `:3001` with `/api/sections/*` delayed 25 seconds — **and the websocket
upgrade proxied too, which is what defeated my attempts** (without it Turbopack never finishes
hydrating and the app is inert). Measured: offer absent at t=10-22s, present from t=26.5s. The
re-derivation worked. What it then found is that the fix re-offered where the old latch correctly
stayed silent, which is V013.

**V013, confirmed.** `PreTest` writes only the legacy `revvy_pretest_<subject>_<section>` key, and
`readLocalState` migrates that key **only when there is no modern key** (`lib/section-state.js:27-28`)
— and a signed-in student always has one, written by LearnModeTab's server reconcile. So to anything
reading the modern way, a student who had just taken the pre-test looked like one who had never been
offered it. Two consequences, one of them years old: V011's effect put the same three questions back
on screen, and **taking the pre-test had never reached the server at all**, so the cross-device promise
in the reconcile's own comment held for skipping and not for taking. Only `declinePretest` ever sent a
`pretestState`, although `POST /api/learn-mode/state` has always accepted one. One `saveSectionState`
call on each path fixes both.

*Not measured, and worth someone doing once with a real account:* a signed-in round trip. The
verifier does not sign in, so V013's server half rests on the route contract plus a live
`user_section_state` row that already holds `'skipped'` — written by `declinePretest` through the
identical branch and column — rather than on an authenticated request.

### What the next packet must know

1. **`npm test` now runs `lib/read-path.test.mjs`** (added to the `test` script in `package.json`).
   151 tests.
2. **Every visitor costs one `/api/sections/[id]` request on first paint.** It used to be zero for the
   first section. Anything that mounts with section data must tolerate the paid arrays being empty for
   a moment — V011 is what that cost looked like when something did not.
3. **V009, packet 2.3, is a merge-blocker for the caching work**: the root layout's `cookies()` read
   makes every route dynamic, so this branch prerenders nothing while `main` serves the topic pages as
   `x-vercel-cache: PRERENDER`. Any brief written against `main` that asserts a prerender or a cache HIT
   cannot pass here. See DECISIONS.
4. **V014, packet 57, filed by this packet, half an hour's work.** `writeLocalState` captures the
   legacy `revvy_complete_*` / `revvy_pretest_*` facts into the modern key by merging onto
   `readLocalState() || {}` — it reads THROUGH the migrating reader — and nothing tests that ordering.
   V013 made that first modern write happen earlier and more often. A tidy-up that computes the patch
   before reading would silently lose a legacy-complete student's completion.
5. **`audit/ledger.json` was left uncommitted by this packet**: another session had an uncommitted F083
   change in it. V007, V010, V011 and V013 are all confirmed in the file, for the next gate commit to carry, with
   V009 at packet 2.3 and V014 at packet 57. By the end of this session that file held three other
   sessions' work: F083, packet 22's V012, and ~85 content items for packets 19, 21 and 23.
