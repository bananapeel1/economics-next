# Packet 48 brief — government-intervention-firms (IAL Economics 3.3.5)

**This is a BRIEF. It contains no results.** Every line below is either (a) a direct quote from a
source file, (b) a count produced by a command shown next to it, or (c) a claim from a document,
explicitly labelled as a claim. Nothing here is a test outcome, a build result, or a verification
verdict — those belong to Gate / Verify A / Verify B, which run after this brief.

## 0. Commands run, in order (for anyone re-deriving this)

```
mkdir -p audit/runs/packet-48
node audit/scripts/ledger.mjs packet 48            > audit/runs/packet-48/ledger-packet-48.txt
node audit/scripts/ledger.mjs packet 48 --open     > audit/runs/packet-48/ledger-packet-48-open.txt
node audit/scripts/ledger.mjs show <33 ids>         > audit/runs/packet-48/ledger-show-all.txt
sed -n '1480,1540p' audit/raw/econ_spec.txt          # spec text, quoted below
curl -s http://localhost:3001/api/sections/government-intervention-firms  # live, signed out
                                                     > audit/runs/packet-48/live-section-2026-09-26.json
```

`ledger-packet-48.txt` and `ledger-packet-48-open.txt` are byte-identical (`diff` exit 0) — 33 items,
all `open`, 0 `claimed`. `git status --short | grep packet-48` returns nothing: no run folder existed
before this pass, no packet-48 script, no snapshot.

## 1. Handoff documents — read, and whether they agree

Read: `audit/PROTOCOL.md` (full), `audit/SESSION-PROMPT.md` (full), the Settled list in
`audit/DECISIONS.md` (lines 13 onward, plus a targeted grep for `3.3.5`/`government-intervention`/
`monopsony`/`minimum wage`/`RPI-X`/`nationalisation`/`privatisation`), `audit/CONTENT-GATE.md`'s
recall contract and per-section checklist (lines 196-335), `audit/PROGRESS.md` row 48, the tail of
`audit/NEXT.md` (every Handoff from "packet 45 closed" through the newest, "packet 12.75 closed" —
the file grew from 10,947 to 11,032 lines while this pass was reading it, confirming another session
is active in this worktree per Rule 5), `audit/runs/packet-45/built.md`'s "For the next phases"
section (lines 147-166), and `audit/SPEC-OWNERSHIP.md`'s row for this section's inherited topics.

**No `## Packet 48 spec` heading exists anywhere in `audit/NEXT.md`** (`grep -ni "packet 48 spec"
audit/NEXT.md` → no match). This is not a new problem: the three newest Handoffs in the file (packet
45 closed, packet 46 closed, packet 12.75 closed) each say the same thing happened to them ("packets
41, 43, 44, 45, 46" per the packet-46 handoff) and each treats it the same way — PROTOCOL's own rule
is that **the ledger defines scope**, not this heading, and `built.md`/`brief.md` supply the rest. I
am following that same, now five-times-normalized precedent rather than treating a missing heading as
a contradiction.

**No disagreement found among PROTOCOL.md, DECISIONS.md's Settled list, CONTENT-GATE.md, PROGRESS.md's
row 48, and the newest NEXT.md Handoffs**, on anything this packet touches:
- PROGRESS.md row 48: `| 48 | government-intervention-firms | 11 | not started | | | |` — "11" is the
  traffic ("Opens") column of the content table (`| # | Section | Opens | Status | Commit | Snapshot |
  Validator |`), not a ledger-item count; it is not compared against the 33 ledger items and does not
  contradict them.
- Three consecutive NEXT.md Handoffs (packet 45 closed, packet 46 closed, packet 12.75 closed) each
  independently re-ran `ledger.mjs packet 48` / `packet 48 --open` and each reports the same thing this
  pass found fresh: 33 items, all open, 0 claimed, PROGRESS row "not started", no run folder.
- `audit/SPEC-OWNERSHIP.md`'s row and `audit/runs/packet-45/built.md`'s "For the next phases" section
  agree with each other on what packet 45 hands to packet 48 (see §3).

**One thing the computed task brief for this session should not be trusted on without a check, per the
packet-12.75 Handoff's own warning about computed briefs** (`audit/NEXT.md:10979-10990`, a prior
session flagged two fabricated details in ITS task brief): I independently confirmed by direct read
that econ_spec.txt:1485-1535 does say "product markets 1a-1f and labour markets 2a-2b" — the computed
task's citation is correct, quoted in full in §2.

## 2. The specification, quoted in full (`audit/raw/econ_spec.txt:1482-1531`)

```
3.3.5 Government intervention

What students need to learn:

 1 Government            a) The case for government intervention.
   intervention in
                         b) Measures to control monopolies and mergers:
   product markets
                           •   price regulation
                           •   profit regulation
                           •   quality standards
                           •   performance targets
                           •   referral to regulatory authorities
                           •   legislation to control mergers and takeovers.
                         c) Measures to promote competition and contestability:
                           • tax incentives and grants to promote small businesses and
                             FDI
                           • deregulation
                           • privatisation
                           • competitive tendering for public sector contracts
                           • trade liberalisation.
                         d) Measures to protect suppliers and employees:
                           •   local sourcing of raw materials and components
                           •   employment legislation to protect workers from
                           •   exploitation
                           •   barriers to entry of foreign firms
                           •   restrictions on the monopsony power of firms
                           •   nationalisation.
                         e) The impact of each measure on:
                           •   price
                           •   profit
                           •   efficiency
                           •   quality
                           •   choice.
                         f) Limits to government intervention:
                           •   regulatory capture
                           •   asymmetric information/information gaps
                           •   inadequate resources
                           •   lack of regulatory power.
 2 Government            a) The case for government intervention.
   intervention in
                         b) Types of government intervention in labour markets and their
   labour markets
                            effects:
                           • maximum wage controls
                           • minimum wage controls
                           • direct taxes e.g. national insurance contributions; corporation
                             tax
                           • measures to reduce geographical and occupational immobility
                             of labour
                           • measures to reduce discrimination and exploitation.
```

**35 leaves** if each bullet under b/c/d/e/f and 2b is counted individually (6+5+5+5+4 = 25 product-market
bullets + 2a + 5 labour-market 2b bullets = 32, plus 1a and the two "case for intervention" headers —
`spec-coverage.json`'s own total for this key is `covered(15) + thin(6) + missing(14) = 35`; I have not
re-derived its exact leaf-counting rule and am reporting ITS number, not re-deriving one of my own).

## 3. What packet 45 and SPEC-OWNERSHIP.md say this packet inherits

`audit/SPEC-OWNERSHIP.md`'s mapped row (topic "Monopsony in the labour market; the minimum wage (in
either market), maximum wages and measures to reduce immobility; discrimination"):

> economics 3.3.3.7a-b (`econ_spec.txt:1432-1434`); **3.3.5.2b (`:1526-1535`)** ... Owner:
> `market-structures-contestability` (packet 29, published); **`government-intervention-firms` (packet
> 48, not started)** ... "Done in the draft, 26 Sep (packet 45), not yet published... holds each
> neighbour to a counted, topic-numbered pointer (`POINTER_ONLY` in `scripts/_packet45-util.mjs`:
> monopsony ≤2 citing 3.3.3, minimum wage ≤2 citing 3.3.5, immobility measures ≤2 citing 3.3.5);
> **maximum wages and discrimination are banned outright** [from labour-markets]. `specGap-03`,
> `specGap-04` (its 3.3.5 clauses) and `specGap-07` are wont-fix here and belong to packet 48."

`audit/runs/packet-45/built.md`'s "For the next phases" (lines 147-155), quoted:

> **Packet 48 inherits**:
> - the minimum wage in a competitive market, including the "exception before the rule" order issue
>   with packet 29's monopsony minimum wage;
> - maximum wages;
> - measures against immobility;
> - discrimination.

**These two documents agree**, but built.md's list is not exhaustive of 3.3.5·2b: it omits "direct
taxes e.g. national insurance contributions; corporation tax" — a fifth 2b bullet, present in the spec
quote above and in `spec-coverage.json`'s own missingItems for this section (§4). This is not a
contradiction between the two documents; built.md is describing what PACKET 45 removed and pointed
elsewhere, not giving an exhaustive list of everything 3.3.5·2b requires. Direct taxes was never
labour-markets' content to remove, so it is absent from that list for a mundane reason, not a disputed
one — but it is still this packet's to add, since no other section teaches it (not checked exhaustively
by this pass beyond the grep in §6; a build pass should confirm with its own search before assuming).

**Read live, not from the audit's description (§5): a "Minimum Wage as Intervention" subsection already
exists in this section (block 2), but the section's only minimum-wage diagram is titled "Minimum Wage
in a Monopsony Labour Market"** — the monopsony case, not the competitive-market case built.md's
inheritance note asks packet 48 to lead with. This corroborates `topFix-02`'s ask for a
"competitive-market NMW diagram" (§6) rather than contradicting anything.

## 4. `spec-coverage.json` entry for this section (`audit/raw/spec-coverage.json`, `bySection[27]`)

```json
{
  "key": "economics__government-intervention-firms",
  "number": "3.3.5",
  "covered": 15, "thin": 6, "missing": 14,
  "headline": "Deep on competition policy, price and profit regulation, privatisation and the minimum
    wage, but 14 of 35 spec requirements are absent from the notes entirely - every \"promote
    competition and contestability\" measure except privatisation, every supplier/employee protection
    except nationalisation and monopsony restraint, and four of the five labour-market interventions."
}
```

`missingItems` (14, quoted in full — **these are the audit's CLAIMS, checked against §2's wording, not
an instruction to add all 14 verbatim**):

| # | Claim, as written | Spec wording it points at (verified by wording, not by the claim's own label) |
|---|---|---|
| 1 | "1b) Performance targets" | 1·b) bullet "performance targets." — wording matches. |
| 2 | "1c) Tax incentives and grants to promote small businesses" | 1·c) bullet "tax incentives and grants to promote small businesses and FDI" — half of one spec bullet. |
| 3 | "1c) Tax incentives and grants to promote FDI" | same spec bullet as #2, other half. |
| 4 | "1c) Competitive tendering for public sector contracts" | 1·c) bullet, wording matches exactly. |
| 5 | "1c) Trade liberalisation" | 1·c) bullet, wording matches exactly. |
| 6 | "1d) Local sourcing of raw materials and components" | 1·d) bullet, wording matches exactly. |
| 7 | "1d) Employment legislation to protect workers from exploitation" | 1·d) bullet "employment legislation to protect workers from exploitation" — matches. NOTE: this is the PRODUCT-market protection bullet, textually close to but distinct from 2·b)'s "measures to reduce discrimination and exploitation" (labour-market bullet, item 14 below / specThin below) — two different bullets, easy to conflate. |
| 8 | "1d) Barriers to entry of foreign firms" | 1·d) bullet, wording matches exactly. |
| 9 | "1f) Limits to intervention: lack of regulatory power" | 1·f) bullet, wording matches exactly. |
| 10 | "2b) Maximum wage controls" | 2·b) bullet, wording matches exactly. Also named in built.md's inheritance list (§3). |
| 11 | "2b) Direct taxes on firms and employment (e.g. national insurance contributions, corporation tax) and their labour market effects" | 2·b) bullet "direct taxes e.g. national insurance contributions; corporation tax" — matches. NOT named in built.md's inheritance list (§3) — see note there. |
| 12 | "2b) Measures to reduce geographical immobility of labour" | half of 2·b) bullet "measures to reduce geographical and occupational immobility of labour." |
| 13 | "2b) Measures to reduce occupational immobility of labour" | other half of the same bullet as #12. |
| 14 | "2b) Measures to reduce discrimination" | half of 2·b) bullet "measures to reduce discrimination and exploitation" — the other half is `specThin` item below. |

`thinItems` (6, quoted in full):

| # | Claim, as written | Spec wording |
|---|---|---|
| 1 | "1b) Quality standards" | 1·b) bullet, wording matches. |
| 2 | "1c) Deregulation" | 1·c) bullet, wording matches. |
| 3 | "1e) Impact of measures on choice" | 1·e) bullet "choice" — one of five sub-items (price, profit, efficiency, quality, choice); only "choice" is listed as thin, the other four are neither missing nor thin per this audit. |
| 4 | "1f) Limits to intervention: inadequate resources" | 1·f) bullet, wording matches. |
| 5 | "2a) The case for government intervention in labour markets" | 2·a) "The case for government intervention" — the labour-market instance of the case, distinct from 1·a)'s product-market instance. |
| 6 | "2b) Measures to reduce exploitation of workers" | other half of the bullet in missingItems #14. |

## 5. The live section, read directly (26 Sep, NOT from the audit's stale description)

`GET /api/sections/government-intervention-firms`, signed out, `localhost:3001` (dev server already
running — belongs to another session in this shared worktree, per Rule 5; not started by this pass).
Response's own `contentVersionSince: "2026-09-25T14:22:24.828+00:00"` — two seconds after the
`auto-prepublish-2026-09-25T14-22-22-116Z__economics__government-intervention-firms.json` snapshot's
timestamp, i.e. this is the state written by whatever republished the section at 14:22 UTC on 25
September, which is what the task description meant by "republished 25 Sep." The full JSON is saved at
`audit/runs/packet-48/live-section-2026-09-26.json`.

**Counted directly from that response** (`counts` field plus array lengths, signed-out slice — some
arrays are premium-truncated, noted where relevant):

- `content`: **3 blocks**, 2 subsections each (6 total): "Competition Policy" (The CMA and Merger
  Control · Anti-Competitive Behaviour), "Regulation of Monopoly" (Price Cap Regulation (RPI–X) ·
  Privatisation and Nationalisation), "Government Failure and Minimum Wages" (Government Failure in
  Intervention · Minimum Wage as Intervention).
- `diagrams`: **3** — "Price Regulation of a Monopoly (RPI-X Price Cap)" (`id` suffix `486972de`),
  "Minimum Wage in a Monopsony Labour Market" (`729684bb`), "Effects of Privatisation and Deregulation"
  (`7cae2be1`).
- `counts.quiz`: **10** total (signed-out response returns 5 of them). `counts.flashcards`: **18**.
  `counts.mistakes`: **3**. `counts.extrasChains`: **4**. `counts.extrasEvaluation`: **4**.
- `practice`: 5 items returned signed-out: Define (4 marks), Explain (6), Assess (10), Evaluate (20),
  Outline (4) — **verbatim tariffs/commands as served**, not a paraphrase.
- **Recall count across all 6 subsections, counted by reading every `sections[].recall` field
  directly: 0.** This is the section's full content scaffold (all 6 subsection titles are present in
  the signed-out response), not a premium-gated slice, so this count is of the whole section, not a
  preview subset.
- **Block-level pin fields, read directly**:
  | block | `diagramId` | `quizIndices` | `practiceIndices` |
  |---|---|---|---|
  | 0 Competition Policy | `null` | `[]` | `[1]` |
  | 1 Regulation of Monopoly | `government-intervention-firms:diagram:486972de` | `[0]` | *(absent)* |
  | 2 Government Failure and Minimum Wages | `government-intervention-firms:diagram:729684bb` | `[1]` | `[2]` |

  Diagram `7cae2be1` ("Effects of Privatisation and Deregulation") is not any block's `diagramId`.

- The practice-tab item literally reads `"Define the term 'privatisation'. (4 marks)"`,
  `"Outline two problems associated with regulatory capture..."` (4 marks) and
  `"Assess the impact of a national minimum wage on employment and living..."` (10 marks) — quoted
  directly from the response, not summarised.
- The privatisation subsection's `examMatters` field reads, verbatim: `"This is a classic 25-mark
  essay topic. Structure your answer around: allocative efficiency (pricing), productive efficiency
  (costs), dynamic efficiency (investment), and equity (access and affordability)..."`
- String counts over the raw response body: `CMA` × 24, `RPI` × 24, `Ofwat` × 2, `Ofgem` × 1,
  `Ofcom` × 1, `UK` × 11, `British` × 3, `HMRC` × 0, `council tax` × 0, `NHS` × 0.

## 6. The 33 ledger items — spec wording, done criteria, and what does not check out

Every item's stated spec letter was checked against §2's actual lettering, per SESSION-PROMPT.md Rule
1 ("find the requirement by its WORDING... never by the spec NUMBER"). **The eight `specGap-01`
through `specGap-08` items each cite a spec letter that does not match §2's actual lettering** (they
use an internal a/b/c shorthand of their own, not the spec's own 1a-1f). Their WORDING still resolves
correctly to a real bullet in every case except three, noted below. Corrected letters given in
brackets.

### topFix (5) — `rank`-ordered, the audit's own priority list

- **`topFix-01`**: "Replace quiz[5] (Laffer), quiz[6] (occupational immobility), quiz[7] (poverty
  trap) with on-spec MCQs..." — **quiz[5] (Laffer curve) and quiz[7] (poverty trap) check out**: neither
  term nor concept appears in §2 at all (fiscal policy / welfare economics, a different topic). **quiz[6]
  (occupational immobility) does NOT check out as "off-topic to be replaced with something else"**: §2's
  own 2·b) bullet is "measures to reduce geographical and **occupational** immobility of labour," which
  is this section's own spec, per §3's ownership map. See §7, contradiction 1. Done for quiz[5]/quiz[7]:
  replaced with an MCQ whose stem and explanation are about content this section teaches. Done for
  quiz[6]: resolved by §7's contradiction, not by this item's own instruction alone — either re-taught
  properly (since occupational immobility becomes this section's content) or replaced, decided with the
  scope question in view, not assumed.
- **`topFix-02`**: diagram fixes — natural-monopoly price-cap geometry for diagrams[0], a
  competitive-market NMW diagram, a kinked post-NMW MCL for diagrams[1] (monopsony), retitle/replace
  diagrams[2] so privatisation isn't shown as a plain competitive supply shift. Done: `accuracy-02` and
  `accuracy-03`'s specific geometry complaints (below) no longer hold when the new diagrams' SVG
  coordinates are read, and a competitive-market minimum-wage diagram exists (corroborated live in §5 —
  today's only minimum-wage diagram is titled for the monopsony case).
- **`topFix-03`**: "Add the missing spec content as a new block... plus a short 'impact on
  prices/profit/efficiency/quality/choice' summary table; **consider moving the minimum-wage subsection
  to 3.3.4**." The first two clauses check out against §2 (1·c, 1·d, 1·e). **The third clause is now
  overruled, not merely questionable**: §3's SPEC-OWNERSHIP.md row and packet 45's completed draft move
  minimum wage the OPPOSITE direction — OUT of `labour-markets` (3.3.4) and INTO this section, as a
  settled decision already acted on. See §7, contradiction 2. Done: the new block/table exist; the
  minimum-wage subsection stays here (built out properly, not moved).
- **`topFix-04`**: add a fillin on RPI-X arithmetic, a reorder on merger-control procedure, a reorder on
  the Averch-Johnson chain. Matches `structure-01`'s zero-recall finding (below) and CONTENT-GATE.md's
  recall contract (§8). Done: at least these three recalls exist, each the correct type per the recall
  contract table (a genuine sequence for the two reorders, a fillin for the arithmetic), each with a
  `why` line.
- **`topFix-05`**: de-UK/de-GCE the exam framing — "25-mark essay" → "20-mark Evaluate"; name
  international competition authorities alongside the CMA; add 2-3 Asia/ME real examples; fix "Define (4
  marks)" and "Outline." **Every sub-claim independently confirmed live in §5**: the exact "25-mark
  essay" string exists; the practice bank literally serves "Define ... (4 marks)" (IAL Economics Define
  is 2, per `audit/DECISIONS.md`'s 11 Sep settled tariff table) and "Outline" (not an IAL command word for
  either subject, same settled table) — and, not named by this item but measured in the same pass, an
  **"Assess (10 marks)" item, which the same settled table also bans for Economics** ("No 10-mark, no
  Assess, no Outline" — Economics only). CMA appears 24 times, RPI 24 times — CONTENT-GATE.md's checklist
  item 3 names RPI specifically ("RPI ... not renamed, removed, with the international equivalent in its
  place (CPI...)"). Done: the practice bank's four tariff/command violations (Define 4, Outline, Assess
  10, and any surviving "25-mark") are corrected to the settled IAL Economics ladder (Define 2, Calculate
  2/4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20 — no 10-mark, no Assess, no
  Outline); RPI is replaced with CPI or removed per the checklist; a UK regulator may remain as one
  example among several, not the default frame.

### accuracy (3)

- **`accuracy-01`**: the "25-mark essay" claim — **confirmed verbatim live** (§5). Done: the string
  reads "20-mark Evaluate" (or equivalent IAL framing) and the essay does not imply a 25-mark tariff
  exists.
- **`accuracy-02`**: diagrams[0] SVG geometry — Preg above the AC curve at Qreg (implying a loss with no
  discussion of it), MC=MR marked away from the actual curve intersection, AC drawn U-shaped rather than
  the falling LRAC of the natural monopoly the diagram claims to show. **Not independently re-measured
  by this pass** (would need to parse the live diagram's SVG path/line/circle coordinates, which this
  brief does not do — that is Verify A's job, the same method packet 45's Verify A used for its own
  diagrams). Done: a natural-monopoly LRAC is drawn falling throughout the price-cap's relevant range,
  Preg sits at or above AC at the regulated quantity, and the marked MC=MR point sits at the curves'
  actual numeric intersection (checked the way packet 45's Verify A checked its own diagrams — by
  parsing coordinates, not by eye).
- **`accuracy-03`**: diagrams[2] shows privatisation as a simple rightward S/D shift, which the item says
  contradicts this section's own body text ("privatising a natural monopoly simply replaces a public
  monopoly with a private one") and conflates privatisation with deregulation. E1 also mis-plotted per
  the item. **Not independently re-measured by this pass** for the same reason as `accuracy-02`. Done:
  the diagram no longer implies privatisation alone creates competition/efficiency gains via a supply
  shift, and its curve intersections are numerically consistent with its own stated coordinates.

### quiz (3)

- **`quiz-01`** (Laffer curve, q5) and **`quiz-03`** (poverty trap, q7): **both check out** — neither
  concept is named or implied anywhere in §2. Done: replaced with on-spec MCQs.
- **`quiz-02`** (occupational immobility, q6): **does not check out as stated** — see `topFix-01` above
  and §7 contradiction 1. This is this section's own spec content per the ownership map, not 3.3.4's.

### structure (8)

- **`structure-01`**: zero recall exercises. **Confirmed live in §5** (recall count 0 across all 6
  subsections, counted directly). Done: recalls exist per CONTENT-GATE.md's contract (§8), correctly
  typed, each with a `why`.
- **`structure-02`**: "No block carries diagramRef / quizIndices / practiceIndices." **Does NOT check
  out against the live section** (§5): block 1 carries `diagramId` + `quizIndices: [0]`; block 2 carries
  `diagramId` + `quizIndices: [1]` + `practiceIndices: [2]`; block 0 carries `practiceIndices: [1]` (its
  `quizIndices` is an explicit empty array and its `diagramId` is explicit `null`, which — per this
  programme's own "`diagramId: null` = decided none" convention from the 2.91 diagram-pin packet — reads
  as a deliberate "no diagram for this block," not an oversight). This item was true of an EARLIER state
  of this section (its mechanism, "falls back to `distributeItems()`/`matchDiagramsToBlocks()`," is the
  pre-`diagramId`-pinning behaviour); the section has since been through the diagram-pinning work
  (packets 2.9-2.92) and republished (25 Sep). See §7 contradiction 3. Done for this item specifically:
  **already true for blocks 1 and 2**; block 0's empty `quizIndices` is the only piece of the original
  complaint that may still be live, and whether that is a defect or a deliberate "no pinned quiz for this
  block" needs the same read a builder would give any other pin decision, not an assumption either way.
- **`structure-03`**: diagrams[2] shares no title word with any block title, so it is unreachable via
  title-matching. **Its stated mechanism is stale** (title-matching is superseded by `diagramId` pinning,
  same as `structure-02`), but **its substantive complaint still holds, measured live**: diagram
  `7cae2be1` ("Effects of Privatisation and Deregulation") is not referenced by any block's `diagramId`
  today (§5's table). Done: this diagram is either pinned to a block via `diagramId`, retitled, or
  deliberately marked `diagramId: null` elsewhere with this one placed on purpose — not left unreachable
  by omission.
- **`structure-04`**: pre-test contamination arithmetic (≈71% chance of hitting an off-topic MCQ in a
  3-question pre-test, given 3 of 10 are off-topic). The arithmetic (`1 - C(7,3)/C(10,3)`) is internally
  checkable and was not re-derived by this pass; it depends on `quiz-01/02/03` being off-topic, one of
  which (`quiz-02`) is contested (§7). Done: once the quiz bank's off-topic count is settled, this
  section's own pre-test sampling either no longer draws from a contaminated pool, or the arithmetic is
  re-run against whatever the corrected off-topic count turns out to be.
- **`structure-05`**: "Block 3 ... pairs two unrelated topics... minimum wage is 3.3.4 Labour Markets
  content... **neither is a 3.3.5 bullet**." The government-failure half is a fair characterisation (it
  is Unit 1 content used as an evaluative lens here, not itself a 3.3.5 bullet). **The minimum-wage half
  is factually wrong against §2**: "minimum wage controls" is 2·b), a 3.3.5 bullet in this very section's
  own spec range, and per §3 it is this section's to own, not 3.3.4's. See §7 contradiction 1 (same root
  cause as `quiz-02`/`topFix-01`).
- **`structure-06`**: the section isn't organised around the spec's own logic, and lacks a summary
  table of the five 1·e) impacts. **Partly does not check out as stated**: `spec-coverage.json` (§4)
  lists only "choice" as thin among the five impacts (price/profit/efficiency/quality are neither
  missing nor thin per that audit), which sits uneasily with this item's claim of "no explicit
  treatment" of the whole group. Both audits are claims; a build pass should read the actual body text
  for all five impact words before assuming either audit's classification. Done (the summary-table half,
  which does check out — `topFix-03` asks for the same thing): a table or equivalent summary exists
  naming all five impacts.
- **`structure-07`**: difficulty ramp inverted (RPI-X/Averch-Johnson mid-section, before the closing
  block's 3.3.4-derived prerequisites are recapped). A structural/pedagogical claim, not a spec-scope
  one; nothing in §2 bears on ordering. Done: whatever block order the rebuild adopts, prerequisite
  vocabulary (MRPL, MCL, ACL if the minimum-wage teaching still uses them) is introduced or recapped
  before it's used, not assumed from 3.3.4.
- **`structure-08`**: takeaways/misconceptions are "good" (a positive claim, no fix needed); flashcards
  drift onto 3.3.3 vocabulary (consumer sovereignty, contestable market, deadweight loss, dynamic
  efficiency), flagged low priority by the item itself. Done: flashcards test this section's own
  content; the item itself does not ask these be removed outright, only flags the drift.

### specGap (13) and specThin (1)

`specGap-09` through `specGap-13` and `specThin-01` are the six items added 13 Sep directly from
`spec-coverage.json` (§4) and match it exactly by construction — see the tables in §4 for their spec
wording. `specGap-01` through `specGap-08` predate that audit and use non-spec lettering (corrected
below); each was checked against §2's wording:

- **`specGap-01`** [→ 1·b]: "quality standards and performance targets — not mentioned anywhere." Per
  §4, `spec-coverage.json` calls "1b) Performance targets" **missing** but "1b) Quality standards**
  **thin** (present in some form, not absent) — this item's "not mentioned anywhere" overstates quality
  standards specifically. Done: performance targets added; quality standards checked against what
  currently exists before assuming it needs to be written from scratch.
- **`specGap-02`** [→ 1·c]: "promotion of small business — absent." Matches §4's missingItems #2.
  Done: added.
- **`specGap-03`** [→ 1·c]: "deregulation — appears only in flashcards/common_mistakes/diagrams; never
  taught in content[]." Matches §4's thinItems #2 (thin, not missing — consistent). Done: taught in
  body text, not only referenced.
- **`specGap-04`** [→ 1·c]: "competitive tendering for government contracts — only in quiz[8]; not
  taught." Matches §4's missingItems #4. Done: taught in body text.
- **`specGap-05`** [→ 1·d]: "restricting monopsony power of firms (as buyers)... the supplier-protection
  angle is absent." **Does not check out against `spec-coverage.json`**: neither "restrictions on the
  monopsony power of firms" nor "nationalisation" appears in §4's missingItems or thinItems for this
  section, which — on that audit's own classification scheme — means it counted them as covered. Two
  audits disagree about the same fact; see §7 contradiction 4. Done: settled by reading the section's own
  1·d) content for a supplier-as-buyer-monopsony treatment (distinct from the labour-monopsony content
  this section already has), not by picking a side.
- **`specGap-06`** [→ 1·e]: "impact on prices/profit/efficiency/quality/choice — no explicit treatment."
  Same tension with §4 as `structure-06` above — §4 only flags "choice" as thin, not all five. See §7
  contradiction 4 (same class as `specGap-05`). Done: read against actual body text for all five words,
  not assumed absent because one audit says so more strongly than the other.
- **`specGap-07`** [→ 1·f]: "regulatory capture and asymmetric information — covered. No gap." A
  self-declared non-issue. **Partially corroborated live**: quiz item 4 (§5) is literally "Regulatory
  capture is best described as..." — regulatory capture is at least tested. Asymmetric information not
  independently checked by this pass. Done: no action needed unless a build pass finds otherwise.
- **`specGap-08`** [→ 1·d]: "Unsure: whether IAL 3.3.5 explicitly lists 'nationalisation'... I believe it
  does, and it is covered." **Confirmed by direct reading of §2**: "nationalisation." is the final 1·d)
  bullet, verbatim. The item's own uncertainty is resolved — it does explicitly appear, and per §4 it is
  not flagged missing or thin. Done: no action needed.

## 7. Contradictions found (per the task's instruction to name these, not resolve them)

1. **`topFix-01` (its quiz[6] clause), `quiz-02` and `structure-05` all treat occupational immobility /
   the minimum wage as belonging to 3.3.4 (`labour-markets`) and therefore off-topic here.** §2 and §3
   both say the opposite: "measures to reduce geographical and occupational immobility of labour" and
   "minimum wage controls" are 3.3.5·2b) bullets, in THIS section's own spec range, and
   `audit/SPEC-OWNERSHIP.md` records that packet 45 already moved this content OUT of `labour-markets`
   and INTO this section (staged, 26 Sep). This is exactly the shape SESSION-PROMPT.md's Rule 1 warns
   about ("Four items once told a packet to delete a topic the specification requires") — these three
   items would, if followed literally, delete/exclude content this section is now the sole owner of.
2. **`topFix-03`'s "consider moving the minimum-wage subsection to 3.3.4"** is the same error as
   contradiction 1, and is additionally now overruled by a completed action (packet 45's draft, not just
   a standing rule) — the minimum wage moved the other direction three weeks after this ledger item was
   presumably written.
3. **`structure-02` and `structure-03` describe a pin-less section** ("no block carries diagramRef /
   quizIndices / practiceIndices"; diagram 2 "unreachable... only visible on the Diagrams tab"). Read
   live on 26 Sep, two of three blocks now carry `diagramId` + `quizIndices`, and one carries
   `practiceIndices` — the section has been through diagram-pinning work and a republish since these
   items were written. `structure-03`'s substantive complaint (diagram 2 specifically is unpinned) still
   measures true today; `structure-02`'s is now only partly true (block 0's empty `quizIndices`).
4. **`specGap-05` and `specGap-06` (both non-spec-coverage-sourced) claim gaps that
   `spec-coverage.json`'s more granular, later (12 Sep, all-43-sections) audit does not list as missing
   or thin** — monopsony-as-buyer restriction and four of the five 1·e) impact words. Two audit sources
   disagree about the same underlying fact (what the section's body text currently contains); this brief
   does not adjudicate which is right, per the instruction not to assert results.

None of these four are a disagreement between the *handoff documents* named in the task (PROTOCOL,
NEXT.md's Handoffs, PROGRESS.md, DECISIONS.md's Settled list, CONTENT-GATE.md) — those five agree with
each other and with the ledger's existence and count, checked in §1. They are disagreements between
individual ledger *items* (or between a ledger item and `spec-coverage.json`) and the specification or
`SPEC-OWNERSHIP.md`, which SESSION-PROMPT.md Rule 1 and the task's own framing ("an audit item is a
CLAIM, not an instruction") anticipate and ask to be surfaced here rather than acted on. I am treating
these as candidates for the build/Verify A phase to resolve, not as grounds for `ok:false` — the
five handoff documents are internally consistent, and none of the four items above requires deleting a
topic the spec requires (the opposite: each risks deleting content the spec requires if followed
literally, which is why they're listed).

## 8. Gate criteria beyond the ledger — what "done" means for the whole packet, not just one id

From `audit/CONTENT-GATE.md`, applicable to any block/recall/practice/diagram this packet authors or
keeps, in addition to the per-id criteria in §6:

- **The recall contract** (§196-232): every recall is `reorder` (genuine sequence only, named
  ordering principle, one defensible order), `fillin`, `match` or `classify`, each with the right
  shape and a `why` line — not a generic retrieval exercise.
- **The check-in answer rule — BLOCKING since 26 September 2026** (`CONTENT-GATE.md:269-300`, newer
  than any ledger item for this packet): a check-in's quiz answer must not be stated by the diagram
  shown above it on the same step. There is no automated check; Verify A and Verify B must each read
  every check-in's diagram text against its quiz options by eye and record `leaks`/`clean`. This
  applies to any new or kept check-in this packet builds, independent of the 33 ledger ids.
- **The per-section edit pass checklist** (`CONTENT-GATE.md:234-268`, seven items): recall typing/why
  (above); every example is one an IAL candidate can picture (Hong Kong, Singapore, Malaysia, Pakistan,
  the Gulf, Nigeria, Kenya — a UK example allowed as one of several, not the default, which is directly
  relevant given §5's CMA×24/RPI×24/UK×11 counts); nothing UK-only survives (RPI named explicitly);
  flow-step subtitles are `{title, subtitle}` not `" — "`-joined strings; every examiner claim is
  sourced; every practice item's guidance opens with a scaffold, not the mark scheme
  (`practice.opening`); the section's validator baseline shrinks, not grows.
- **The nine-block ceiling** (`DECISIONS.md`, 16 Sep, "packet 25: eight chapters is where the free
  quiz budget runs out"): the packet runner refuses to build at 9 blocks (a chapter would lose its
  check-in quiz silently); 8 is the safe maximum. This section is currently 3 blocks and must absorb
  a new product-market block (`topFix-03`) plus the labour-market content it now owns in full (minimum
  wage, maximum wages, immobility ×2, discrimination, direct taxes — five 2·b) bullets, §3/§4) — a real
  risk of reaching or exceeding 8-9 blocks that the build phase should watch for, not something this
  brief can resolve by counting.
- **PROTOCOL.md's definition of done** (restated, §152-155): build green · every claimed ledger id
  confirmed by a fresh Verify A · Verify B walkthrough clean at 390×844 (this is a content packet, so
  Verify B applies) · `npm run validate` and `npm test` green · `npm run exposure` and `npm run
  recalls` exit 0 · staged result checked field-by-field against `curl ...?draft=1`, not against the
  file · PROGRESS row updated · committed with `packet-48:` prefix · pushed. **Staging only — this
  packet may not publish** (Rule 6); the publish command, when the founder is ready, is the same shape
  every recent packet has used: `node scripts/packet-48-government-intervention-firms.mjs --stage &&
  node scripts/publish-section.mjs government-intervention-firms --confirm` (script does not exist yet;
  this is the expected shape, not a claim it is ready).

## 9. Files this pass wrote (all under `audit/runs/packet-48/`, nothing elsewhere)

`ledger-packet-48.txt`, `ledger-packet-48-open.txt` (identical), `ids.txt`, `ledger-show-all.txt`,
`live-section-2026-09-26.json`, `brief.md` (this file). No source file, ledger entry, PROGRESS/NEXT/
DECISIONS row, or content was authored or changed.
