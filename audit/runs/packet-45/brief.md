# Packet 45 brief — labour-markets, IAL Economics 3.3.4

Written by the Brief phase only. No source file touched, nothing published, nothing claimed in the
ledger. All facts below were produced by the commands shown; none is a build/test/verify result — those
belong to the Gate, Verify A and Verify B phases that run after this brief.

## 0. Documents read, and the contradiction check

Read in full: `audit/PROTOCOL.md`, `audit/SESSION-PROMPT.md`, the newest Handoff in `audit/NEXT.md`
("Handoff — packet 44 closed (brain)", the section ending the file), `audit/PROGRESS.md` row 45,
the `## Settled` list in `audit/DECISIONS.md`, `audit/CONTENT-GATE.md` (Layers 1-3 and "The recall
contract"), and `audit/SPEC-OWNERSHIP.md` in full.

**No `## Packet 45 spec` heading exists anywhere in `NEXT.md`** (`grep -n "^## Packet" audit/NEXT.md`
confirms it — the newest packet-number heading is 33). This is the same gap packets 41/43/44 already hit
and normalized: PROTOCOL's own rule is that the ledger defines scope, not this file. Not a contradiction
between authorities; a missing document. This brief is written to fill that gap for packet 45, per the
task's own instruction ("YOUR JOB: produce the work list").

**No disagreement found** between `PROTOCOL.md`, `PROGRESS.md`, `DECISIONS.md`'s Settled list, and the
ledger about packet 45's scope or free/not-started status. `PROGRESS.md` row 45 reads "not started";
`git status --short | grep packet-45` returns nothing; and a live check (§5 below) shows no draft has
been started for `labour-markets`. All three agree. **Returning `ok:true`** — nothing here rises to
"handoff documents disagree," but §4 below is a real, unresolved scope question the build phase must
settle (SPEC-OWNERSHIP, not code), flagged as required by Rule 1.

## 1. The ledger — 31 open items, 0 claimed

Commands run, output saved:
- `node audit/scripts/ledger.mjs packet 45` → `audit/runs/packet-45/ledger-packet-45.txt`
- `node audit/scripts/ledger.mjs packet 45 --open` → `audit/runs/packet-45/ledger-packet-45-open.txt`
  (identical: all 31 are open, 0 confirmed/claimed/wont-fix)
- `node audit/scripts/ledger.mjs show <id>` for each of the 31 → `audit/runs/packet-45/ledger-show-all.txt`

Counted by kind (grep on the ledger dump, not asserted from memory): **5 topFix, 1 accuracy, 1 quiz,
11 structure, 9 specGap, 4 specThin = 31.**

| id | kind | one line |
|---|---|---|
| topFix-01 | topFix | Pin diagramRef/quizIndices/practiceIndices on all 3 blocks — **see §5, likely partly stale** |
| topFix-02 | topFix | Write recalls for all 6 subsections (2 reorder, 2 fillin) — the recall contract is currently unmet, confirmed live (§5) |
| topFix-03 | topFix | Fix wage-differentials keyIdea ("not because markets are failing") + add NMW-in-competitive-market + elasticity determinants |
| topFix-04 | topFix | Repair the two monopsony SVGs (Wm/Qc/Qmin placement, "Wmin = MRP" construction note) |
| topFix-05 | topFix | Command words: Define→2 (or Explain→4), drop "Outline" (not a legal IAL command word — precedent: DECISIONS.md, packet 13), 20-mark guidance must total 20 with KAA/Evaluation levels |
| accuracy-01 | accuracy | wage-differentials keyIdea says wages differ "not because markets are failing," contradicted by the section's own body (immobility = "friction", discrimination = "unjustified") and by spec item 4 (market failure in the labour market) |
| quiz-01 | quiz | quiz[2] (elasticity of demand for labour) is asked but never taught in any subsection |
| structure-01 | structure | Legacy `matchDiagramsToBlocks` title-fallback claim — **stale as read live, see §5** |
| structure-02 | structure | `distributeItems` positional-fallback claim for quiz — **stale as read live, see §5** |
| structure-03 | structure | Practice fallback ordering claim (marks-sort) — **partly stale, see §5**; the "Outline before Trade Unions are taught" sequencing risk is a live question this build must re-check against the CURRENT pinned order, not the fallback order |
| structure-04 | structure | Zero recall objects across all 6 subsections — **confirmed still true live** (§5): every `notes[i]` checked has no `recall` field |
| structure-05 | structure | Block-2 pairing incoherent; proposes regrouping into competitive+NMW / monopsony+unions / differentials+immobility+policy |
| structure-06 | structure | No baseline "firm faces horizontal labour supply, hires where W=MRP" diagram before monopsony's MCL-above-supply construction |
| structure-07 | structure | NMW-in-competitive-market is never taught, yet the monopsony misconception and a flashcard both presuppose the student already knows it — **confirmed still true live** (§5, notes[3].misconception) |
| structure-08 | structure | trade-unions body is 3 parallel cases, not a causal chain — flags future reorder-recall misuse |
| structure-09 | structure | demand-for-labour-mrp misconception is filler; names better real errors (movement vs shift, MRP under imperfect competition, diminishing returns ≠ "worse workers") |
| structure-10 | structure | Notes-tab and Learn-tab `examMatters` for supply-of-labour contradict each other — **confirmed still true live** (§5): one says the individual backward-bending curve is the favourite question, the other says most questions are on the market curve |
| structure-11 | structure | Difficulty ramp (demand/supply → competitive → monopsony → unions → differentials) is sound — **confirmed still true live** (§5, matches `notes[0..5]` order exactly) |
| specGap-01 | specGap | Elasticity of demand for labour + determinants — untaught, tested in quiz[2] |
| specGap-02 | specGap | Elasticity of supply of labour + determinants — one sentence only |
| specGap-03 | specGap | NMW in a competitive market (floor→excess supply→unemployment) — only the monopsony case is covered |
| specGap-04 | specGap | Government intervention in the labour market — **SPEC-OWNERSHIP split needed, see §4**: public-sector wage setting is 3.3.4-owned and untaught; max wages / immobility remedies are 3.3.5-owned (a section that does not exist yet) |
| specGap-05 | specGap | "Current labour market issues" (skills shortages, ageing population, zero-hours, migration) — **its own numbering claim (WEC13 "3.4.3") is already flagged wrong in the ledger note; independently re-checked, see §3: none of these phrases exist anywhere in econ_spec.txt except migration, which is already spec text under item 2c** |
| specGap-06 | specGap | Diagram: individual perfectly-competitive firm (horizontal supply, W=MRP) vs the industry — not taught |
| specGap-07 | specGap | Discrimination as labour-market failure — one sentence; **not actually a sub-item of 3.3.4's own market-failure list (§3) — it is 3.3.5.2's "measures to reduce discrimination and exploitation"; check before expanding** |
| specGap-08 | specGap | Whether "MRP = MPP × MR" is spec-required wording — **the spec's own 1a/1b text (§3) never states the formula**; it lists factors (derived demand, productivity, price of product, wage-vs-capital-price) and asks for elasticity determinants. MRP theory is the standard mechanism behind those factors, not contradicted, but the `examMatters` claim that "examiners expect you to draw the MRP curve" needs a citation per CONTENT-GATE Layer 1 ("examiner claims") |
| specGap-09 | specGap | Numbering self-doubt (recalled "3.4.1/3.4.2/3.4.3") — **resolved by direct read, see §3: no "3.4" heading exists anywhere in econ_spec.txt; the app's "3.3.4" is correct** |
| specThin-01 | specThin | 1a) wage rate relative to price of capital — named, unexplained — **verbatim spec wording confirmed, §3** |
| specThin-02 | specThin | 2c) size of population (labour supply) — named, unexplained — **verbatim, §3** |
| specThin-03 | specThin | 2c) level of welfare benefits (labour supply) — named, unexplained — **verbatim, §3** |
| specThin-04 | specThin | 2c) government regulations (labour supply) — named, unexplained — **verbatim, §3** |

## 2. The spec text in scope (audit/raw/econ_spec.txt:1447-1479)

Quoted verbatim by `sed -n '1447,1479p' audit/raw/econ_spec.txt` (page footer at 1445-1446 and 1481-1485
omitted). This is the full text of 3.3.4; the next heading, `3.3.5 Government intervention`, starts at
line 1485.

```
3.3.4 Labour markets

What students need to learn:

 1 The demand for              a) Factors that influence the demand for labour to a particular
   labour                         occupation:
                                  •   demand for the final product (labour as a derived demand)
                                  •   productivity of labour
                                  •   price of the product
                                  •   wage rate relative to price of capital.
                               b) Factors that influence the elasticity of demand for labour.
 2 The supply of               c) Factors that influence the supply of labour to a particular
   labour                         occupation:
                                  •   size of population
                                  •   net migration
                                  •   income tax rates
                                  •   level of welfare benefits
                                  •   government regulations
                                  •   trade unions.
                               d) Factors that influence the elasticity of supply of labour.
 3 The determination           a) Labour market equilibrium.
   of wage rates in
                               b) Causes of changes in the equilibrium wage rate and quantity of
   competitive and
                                  labour as a result of shifts in demand curves and supply curves.
   non-competitive
   markets                     c) Wage setting in the public sector/state-owned enterprises.

 4 Market failure in           a) Causes and consequences of the geographical immobility of
   the labour market              labour.
                               b) Causes and consequences of the occupational immobility of
                                  labour.
```

That is the **entire** requirement list for this topic — 4 numbered items, 9 lettered sub-requirements,
6 named factors under 1a, 6 named factors under 2c. No "current labour market issues" list, no
discrimination sub-item, no explicit MRP formula, appears in it.

**Adjacent spec text that matters for ownership, not for teaching here** — `grep -n` locations, quoted
because two ledger items touch them:

- `econ_spec.txt:1432-1434` (inside `3.3.3 Market structures and contestability`, item 7): *"7 Monopsony
  a) Assumptions and conditions for a monopsony to operate. b) Costs and benefits of a monopsony to
  firms, consumers and employees."* Monopsony's specification number is **3.3.3.7, not 3.3.4**.
- `econ_spec.txt:1526-1535` (inside `3.3.5 Government intervention`, item 2, "Government intervention in
  labour markets"): *"b) Types of government intervention in labour markets and their effects: maximum
  wage controls / minimum wage controls / direct taxes ... / measures to reduce geographical and
  occupational immobility of labour / measures to reduce discrimination and exploitation."* This is
  **3.3.5.2, not 3.3.4** — a full policy-response treatment of labour-market failure lives here.
- `grep -n "^3\.4\b\|3\.4\.[0-9]" audit/raw/econ_spec.txt` returns **no matches** — no "3.4" numbering
  exists anywhere in the IAL spec (confirms specGap-09's own doubt is resolved: 3.3.4 is correct).
- `grep -n -i "migration|ageing|zero-hours|skills shortage|flexible working|temporary work" audit/raw/econ_spec.txt`
  — the only hit inside labour-market territory is "net migration" at `:1461` (2c, already a named
  factor, already ledgered as specThin-adjacent via specGap-05's own text). None of "ageing population,"
  "zero-hours," "skills shortage" or "flexible working" appears anywhere in the file.

## 3. spec-coverage.json — the candidate list this section's audit produced

`audit/raw/spec-coverage.json` → `bySection` entry keyed `"economics__labour-markets"`, number `"3.3.4"`,
`covered: 9`, `thin: 7`, `missing: 1`:

- **missingItems (1):** `"2c) Income tax rates as a factor influencing labour supply"`.
- **thinItems (7):** `"1a) Price of the product as a factor influencing labour demand"`; `"1a) Wage rate
  relative to the price of capital"`; `"1b) Factors that influence the elasticity of demand for labour"`;
  `"2c) Size of population"`; `"2c) Level of welfare benefits"`; `"2c) Government regulations"`; `"3c)
  Wage setting in the public sector / state-owned enterprises"`.

**Cross-checked against the 31 ledger ids** (`grep -i` over `ledger-show-all.txt`, a different method
from reading the coverage file): **two of these eight have no corresponding ledger id at all** —
`"2c) Income tax rates"` (fully missing, per spec-coverage; zero hits for "income tax" anywhere in the 31
items) and `"1a) Price of the product"` (thin; zero hits for "price of the product" anywhere in the 31
items). Both phrases are verbatim in the spec text quoted in §2 (`:1462` and `:1455`), so neither is an
overturned claim — they are two genuine spec requirements this section's own audit found that never
became a ledger item. The other six coverage items map onto specThin-01/02/03/04 and specGap-01/04
directly.

## 4. The scope question the build must settle before writing (SPEC-OWNERSHIP)

`audit/SPEC-OWNERSHIP.md`'s rule (packet 13): *"a topic is taught in the section whose specification
number contains it, and nowhere else. Other sections may refer to it; only the owner teaches it under its
own heading."* Neither of the two topics below has a row in that file yet, unlike the multiplier,
Porter's five forces, or the AS/national-income boundary, which all do.

**(a) Monopsony.** Its spec number is 3.3.3.7 (§2), owned by `market-structures-contestability`.
`audit/NEXT.md:4055` (packet 29's built table) already lists `7a, 7b` — "assumptions and conditions,"
"costs and benefits" — as taught there, and `PROGRESS.md` row 2.92 records that section as published live
at 13:53-13:57 UTC on 25 Sep. Meanwhile `labour-markets` already has a whole subsection ("Monopsony in
Labour Markets," `notes[3]`) plus a dedicated diagram, and topFix-01/02/04 and structure-05/06/07/08 all
ask to build out ITS OWN monopsony model further (SVG repair, a monopsony reorder recall, a firm-vs-market
contrast diagram). Spec item 3.3.4.3 ("wage rates in ... non-competitive markets") is genuinely this
section's to teach, and trade unions (2c) are 3.3.4-owned vocabulary with no 3.3.3 overlap — so
`labour-markets` legitimately needs SOME non-competitive wage-determination content. **The open question
for the build, not this brief, is where the line sits**: does labour-markets re-teach monopsony's
assumptions and diagram from scratch (risking exactly the duplication class `SPEC-OWNERSHIP.md` was
written to stop — the multiplier, Porter's five forces, monopoly precedents), or does it point at
`market-structures-contestability`'s existing treatment and confine its own content to the WAGE/EMPLOYMENT
outcome (3.3.4.3b) the way `aggregate-supply` was made to point at `national-income` for the equilibrium
material it does not own (`SPEC-OWNERSHIP.md`'s "Equilibrium real national output" row, same pattern)?
This is exactly a Rule-1 check, not a code fix, and needs a `SPEC-OWNERSHIP.md` row either way.

**(b) Government intervention in the labour market (specGap-04).** Its content splits: "public-sector
wage setting" is `3.3.4.3c`, genuinely this section's own and genuinely untaught (also `specThin`-07 in
the coverage file, §3). "Maximum wage controls" and "measures to reduce geographical/occupational
immobility" are `3.3.5.2`, owned by `government-intervention-firms` — **`PROGRESS.md` row 48, "not
started," 11 opens.** That section does not exist yet. specGap-04's request, taken whole, would build
3.3.5 content inside 3.3.4 for a section that has not had its own packet. The item should be split at
build time: keep the public-sector wage-setting sentence (genuinely owned here), leave the
policy-response material for packet 48, and record the split in `SPEC-OWNERSHIP.md` the way the
multiplier's cross-section move was recorded.

Neither (a) nor (b) is a disagreement between handoff documents — both are the kind of claim-against-spec
check Rule 1 asks every packet to do, surfaced here because the ledger text does not do it. Not escalated
to the founder: `SPEC-OWNERSHIP.md`'s own precedent (packets 13, 34, 35) is that the builder makes this
call and records it in the map; the founder was not asked for the multiplier, monopoly or Porter's-five-
forces splits either.

## 5. Current live state, read independently of the ledger (a different method than the ledger text used)

The ledger's structure/topFix items were mostly written before packets 2.9 (25 Sep, pin banks) and 2.91
(25 Sep, diagram decisions) touched this section's wiring. Rather than trust the ledger's prose or the
`git status` snapshot files (whose timestamps are ambiguous about pre/post-publish state — the
auto-prepublish snapshot at `14:22:22` on 25 Sep still shows blocks with no `diagramId`, i.e. the state
one instant BEFORE that publish, not after), this brief queried the running dev server directly:

```
curl -s "http://localhost:3001/api/sections/labour-markets"        # live (no draft)
curl -s "http://localhost:3001/api/sections/labour-markets?draft=1" # draft
```

Both calls returned **identical `contentVersionSince` timestamps (`2026-09-25T14:22:31.745+00:00`) and
identical block ids/counts** — meaning there is currently no separate draft for this section; `?draft=1`
is only mirroring `data` because no `draft` row exists. This is independent confirmation, by a different
method than `git status` or reading `PROGRESS.md`, that no other session has started packet 45's rebuild.

What the live payload actually holds right now, read field by field, not asserted from the ledger text:

- **3 blocks, all with `diagramId` set** (`null` on block 0 — decided-none, per packet 2.91 — and a real
  id on blocks 1 and 2) **and all with a `quizIndices` entry** (`[0]`, `[1]`, `[2]`). This contradicts
  structure-01's and topFix-01's premise ("no block has diagramRef, quizIndices or practiceIndices") as
  written — that premise describes a pre-2.9/2.91 state. The three pinned quiz stems match the founder
  walkthrough note in `NEXT.md:784-788` word for word (the hiring-rule question at block 0, the monopsony
  question at block 1, the surgeons-vs-retail question at block 2), so the pins are the intended,
  already-chosen content, not a bug to redo.
- **`practiceIndices`: block 0 = `[0]`, block 1 = none, block 2 = `[1]`.** Block 1's absence matches
  `NEXT.md:786` — deliberately withheld because `practice.opening` (a DEBT-only rule, per DECISIONS.md's
  "packet 2.9" section) would otherwise print a mark scheme above an empty guided answer box. Not a gap to
  fill; a decision to leave alone unless `getPracticeMode` changes.
- **6 `notes[]` entries, none carries a `recall` field** — structure-04's "zero recall objects" claim is
  still true of the live bundle exactly as read.
- **`notes[1]` (Supply of Labour) `examMatters` in the Learn-mode `content` array** reads "The
  backward-bending supply curve is a favourite diagram question..."; **the same subsection's `notes[]`
  (Notes-tab) `examMatters`** reads "...Most exam questions focus on the market supply curve (upward-
  sloping) rather than the individual curve..." — structure-10's contradiction is present in the live
  payload exactly as described.
- **`notes[3]` (Monopsony) `misconception`** reads "...in competitive markets it may cause unemployment,
  but in monopsony markets it can increase employment" — presupposing the competitive-market NMW result
  the section never states elsewhere. structure-07's claim is present in the live payload exactly as
  described.
- **`notes[0..5]` titles, in order**: Demand for Labour (MRP Theory) · Supply of Labour · Wage
  Determination in Competitive Markets · Monopsony in Labour Markets · Trade Unions · Wage Differentials —
  matches structure-11's "sound ramp" description exactly.
- **Live `practice[4]`** ("Outline two ways in which trade unions may influence the labour market, (4
  marks)") still carries the command word "Outline" — topFix-05's claim about an illegal IAL command word
  is present in the live payload (DECISIONS.md, packet 13, already established "Outline" does not exist in
  IAL Economics).
- Counts, all read from the same payload: `quiz` bank 10 (6 served signed-out), `practice` 5,
  `flashcards` 18, `diagrams` 3, `extras.chains` 4, `extras.evaluation` 3, `mistakes` 4.

**What this means for the work list, stated as a caveat, not a result**: topFix-01 and structure-01/02 as
WRITTEN describe a wiring defect that packets 2.9 and 2.91 already partly closed. The build should
re-derive what (if anything) is still missing by reading the current bundle above, rather than
implementing topFix-01's specific index assignments (`quiz[0,1]`/`quiz[5,6]`/`quiz[7,8,9]`,
`practice[0]`/`practice[3]`/`practice[1,4]`), which do not match the pins already live and chosen by the
2.9 readers. structure-03's "Outline shown before Trade Unions are taught" risk should be re-checked
against the CURRENT pinned practice order (`[0]`, none, `[1]`), not the marks-sort fallback order it was
written against — this brief did not re-run that specific check and states no verdict on it.

## 6. What "done" means, by group

- **specThin-01..04, specGap-01/02** (the six named-but-unexplained factors under 1a/1b/2c/1b): each
  factor gets its own explained sentence or two inside the relevant subsection body, not just a list
  item. Acceptance: `spec-coverage.json`'s regenerated `thinItems`/`missingItems` for this section drops
  to include neither the four already-ledgered items nor the two found in §3 (income tax rates, price of
  the product).
- **specGap-03/06** (NMW in a competitive market, firm-vs-market diagram): both need new content, since
  neither exists in any form today (§5 confirms no NMW-competitive text and only one diagram, which is
  the monopsony one). Acceptance: a competitive-market NMW paragraph plus its own diagram or a labelled
  variant of the existing equilibrium one, referenced by a new or amended `diagramRef`.
- **specGap-04 (split per §4)**: public-sector wage setting (3.3.4.3c) taught in this section; the
  3.3.5-owned policy-response material either removed from scope with a `SPEC-OWNERSHIP.md` row recording
  the deferral to packet 48, or (if the build decides otherwise) kept only as a counted, topic-numbered
  pointer sentence — the same `POINTER_ONLY` pattern `SPEC-OWNERSHIP.md` already documents for
  `aggregate-supply`/`national-income`.
- **specGap-07 (discrimination)**: same treatment as (a) above — check whether any expansion duplicates
  3.3.5.2's "measures to reduce discrimination and exploitation" before writing more than the current one
  sentence.
- **specGap-08 (MRP formula/examMatters citation)**: either cite a source for the "examiners expect you to
  draw the MRP curve" claim (CONTENT-GATE Layer 1's "examiner claims" rule — every such sentence needs a
  citation) or soften it to state the theory without the examiner claim.
- **specGap-05/09**: no content action — both are numbering/scope doubts already resolved by §2's direct
  read (no "3.4" heading exists; "current labour market issues" as a topic does not exist in the spec).
  Close as `wont-fix` with a note pointing at this brief's §2, per the ledger's own existing note pattern.
- **topFix-01 (re-scoped per §5)**: verify the current live pins are correct pairings (they appear to be,
  per the founder walkthrough match) and fill only what §5 shows is still genuinely absent — chiefly,
  nothing in the wiring sense; the diagramRef/quizIndices/practiceIndices gap this item describes is
  largely already closed.
- **topFix-02, structure-04**: author recalls (reorder/fillin per the recall contract, CONTENT-GATE §"The
  recall contract") for all 6 subsections. Acceptance: `npm run recalls` and `npm run validate`'s
  `recall.recoverable`/wiring rules pass on the staged bundle, and each recall has a `why` line per item.
- **topFix-03, accuracy-01**: the wage-differentials keyIdea rewritten so it does not contradict spec item
  4 or the section's own body; NMW-in-competitive-market content lands here or in specGap-03's work,
  whichever the build structures it under.
- **topFix-04**: SVG geometry fix on the two monopsony diagrams (Wm on supply curve, correct Qc/Qmin,
  corrected construction note) — verifiable by reading the SVG path data or rendering it, not by reading
  the caption text.
- **topFix-05**: command-word/marks pass against the live `practice[]` array (5 items) — Define/Explain
  tariffs, "Outline" removed, 20-mark guidance summing to 20 with levels not point-allocation (CONTENT-
  GATE Layer 1 rule, already blocking).
- **structure-05, -06, -08, -09**: content-organisation fixes inside whatever block/subsection structure
  the build settles on after §4's monopsony-ownership question; -06 and -08 are new diagram/flow-shape
  work, -09 is a misconception rewrite.
- **quiz-01**: either teach the elasticity-of-demand-for-labour determinants (closes together with
  specGap-01) or move/replace quiz[2] so nothing untaught is asked.
- **structure-10, -11**: -10 needs the two `examMatters` strings reconciled (one is wrong, not both); -11
  needs no action — it is a note that the existing ramp is already right, not a defect.

## 7. Not this brief's to decide

- Whether monopsony content in `labour-markets` is rewritten from scratch, trimmed to an application-only
  treatment with a pointer to `market-structures-contestability`, or left as-is with only the SVG/recall
  fixes — §4(a).
- Whether specGap-04's policy-response half is dropped, pointer-only, or (least likely, since the owning
  section does not exist) built out here anyway — §4(b).
- Whether structure-05's proposed block regrouping (competitive+NMW / monopsony+unions / differentials+
  immobility+policy) is adopted, given it interacts with both open questions above.

Files written by this brief, nothing else: `audit/runs/packet-45/brief.md` (this file),
`ledger-packet-45.txt`, `ledger-packet-45-open.txt`, `ledger-show-all.txt`. No file outside
`audit/runs/packet-45/` was created or modified.
