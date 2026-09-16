# Next session brief

## Handoff — after packet 17 (written 16 September 2026)

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
3. **V001 does not reach this span, and that is measured**: 12 bullet characters in `bus_spec.txt:551-595`,
   every one at line start, and all 24 leaves present in `spec-items.json`. Count it yourself with a
   UTF-8-aware tool before trusting it. The global figures are unchanged: 31 Economics and 29 Business
   bullets dropped elsewhere. **V001 is still packet 3.1's, and it should be done before many more sections
   measure themselves against an incomplete oracle.**
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
- **V001 is still open and every content packet from here measures itself against an incomplete oracle.** It
  is packet 3.1's, it is small, and it is the one piece of scaffolding the remaining 39 sections all rest on.

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
