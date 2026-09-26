# Packet 56 brief — `business__global-industries-mncs` (WBS14, IAL Business 4.3.4)

**Brief phase only. No source file touched, no content authored, no build/test/verify run, no ledger
write.** This document lists candidates to check and what "done" would mean; it contains no
measurement, test result, build result, or verification claim. Where a source document asserts one,
it is quoted below as a CLAIM, never restated as a fact of this pass.

## 0. What was read, and how

- `audit/PROTOCOL.md` (155 lines) — read in full.
- `audit/SESSION-PROMPT.md` (82 lines) — read in full.
- `audit/NEXT.md` (11,323 lines) — `grep -ni "packet 56"` → **0 hits anywhere in the file**; no
  `## Packet 56 spec` heading exists. Read the file's final section, the newest "Handoff — what comes
  next (packet 48 bookkeeping pass)" (lines 11240–11322), in full, plus packet 47's handoff
  (lines 11068–11172, same Business Unit 4) for the Unit-4-hub-page precedent (§7).
- `audit/PROGRESS.md`: row 109, `| 56 | global-industries-mncs | 6 | not started | | | |`, against the
  content-table header at line 64 (`| # | Section | Opens | Status | Commit | Snapshot | Validator |`)
  — the `6` is traffic (`Opens`), not an item count; do not read it as a ledger count.
- `audit/DECISIONS.md` (3,448 lines): `grep -n "global-industries\|packet 56"` → 0 section-specific
  rulings. Read the Settled list from its start (line 13) through ~line 180 (the 26 Sep entries,
  including the practice-page redesign and the "practice follows the real IAL paper layout" ruling,
  which is programme-wide and binds this packet — §6).
- `audit/CONTENT-GATE.md` (524 lines) — read in full, including "The recall contract" and "The
  per-section edit pass" checklist.
- `node audit/scripts/ledger.mjs packet 56` and `... packet 56 --open` — **identical 28-row output**
  (saved: `ledger-packet-56.txt`, `ledger-packet-56-open.txt`); every item `open`, none claimed,
  confirmed, rejected or wont-fix.
- `node audit/scripts/ledger.mjs show <id>` for all 28 ids, saved to `ledger-show-all.txt`.
- `audit/raw/bus_spec.txt`: `grep -n "ultinational\|MNC\|Global"` to locate the topic by wording (Rule
  1), then read lines 1453–1487 in full (the whole of 4.3.4, both its own text and confirmed against
  the next/previous headings at 1424 and the assessment table at the unit level).
- `audit/raw/spec-coverage.json`: extracted the `bySection` row keyed `business__global-industries-mncs`
  (saved: `spec-coverage-entry.json`).
- `audit/raw/ial-paper-structure.json`: read `business.units_3_4` in full (quoted in §6).
- `audit/content-sections/business__global-industries-mncs.json` (t=0 / current bundle, 54,997 bytes):
  read `meta` in full; isolated `content[]` alone (14,554 bytes) and grepped it separately from the
  rest of the bundle for every term a ledger item or spec-coverage claim names, to distinguish "taught"
  from "assessed-only" — a different method from whatever produced the ledger's prose (commands and
  counts in §2–§4).
- `app/business/unit-4/page.js` and `app/business/page.js`: grepped for this section's hub-page copy
  (§7) after finding the packet 47/48 handoffs both name a stale Unit-4-hub-page defect as a real,
  unfixed, non-content risk for any Unit 4 rebuild.
- `git status --short`: only this pass's own `audit/runs/packet-56/` and one untracked snapshot
  (`audit/snapshots/auto-prepublish-2026-09-25T12-11-43-061Z__business__global-industries-mncs.json`,
  25 Sep, origin not investigated further — token discipline) are new; no other session's run folder
  for this section exists yet.

## 1. Contradiction check

**No `## Packet 56 spec` heading and no `audit/specs/packet-56.md` exist.** This is the same gap
packets 41/43/44/45/46/47/48 hit and normalized in their own handoffs: PROTOCOL's own rule is "the
ledger is the definition of coverage," not `NEXT.md`. Consistent with that precedent, **this is a
missing document, not a contradiction between authorities**, and this brief proceeds from the ledger
plus the raw spec.

**No contradiction found** between `PROTOCOL.md`, `SESSION-PROMPT.md`'s six rules, the Settled list in
`DECISIONS.md`, `CONTENT-GATE.md`'s recall contract, and this packet's `PROGRESS.md` row / ledger. They
agree: packet 56 is `not started`, section `business__global-industries-mncs`, WBS14, spec number
4.3.4 (independently confirmed three separate ways — see §3), 28 open ledger items, none claimed.
**Returning `ok:true`**, with one scope ambiguity flagged below (not a contradiction between the named
authority documents, but a real open question for whoever builds this):

**Flagged, not escalated as a contradiction:** `DECISIONS.md`'s newest Settled entry (26 Sep, "practice
follows the real IAL paper layout") sets a canonical 7-item practice shape for every Business Unit 3/4
topic (§6) that supersedes the narrower, item-by-item tariff fixes `topFix-04` and `practice-01`
describe. Both readings are legitimate; which one this packet targets is a scope decision for whoever
builds it (or the founder), not something resolvable from the documents alone.

## 2. Counts, measured by reading the bundle and the ledger (commands shown)

Ledger, by kind (28 total, all `open`):
`topFix` 5 · `accuracy` 1 · `quiz` 3 · `practice` 1 · `structure` 8 · `specGap` 9 · `specThin` 1.

```
node -e "const d=require('./audit/content-sections/business__global-industries-mncs.json'); console.log(d.meta)"
```
→ `{"id":"global-industries-mncs","number":"4.3.4","subject":"business","unit":4,"unitCode":"WBS14",
"blocks":2,"structuredBlocks":2,"legacyBlocks":0,"subsections":4,"reorder":0,"fillin":0,"quiz":10,
"practice":5,"diagrams":0,"flashcards":19,"notes":3,"mistakes":0,"extrasChains":4,"extrasEval":3}`

Read directly against the file's own arrays, isolating `content[]` from `notes`/`flashcards`/`quiz`/
`common_mistakes`/`extras` (a Node script slicing `JSON.stringify(data.content)` into its own string
before grepping it, so a hit inside `content[]` cannot be confused with a hit in the assessed-only
material around it):

- 2 blocks × 2 subsections = 4 subsections total: "MNC Impact & Ethics" (`mnc-positive-impacts`,
  `mnc-negative-impacts-ethics`), "Transfer Pricing & FDI Stakeholders" (`transfer-pricing-mechanism`,
  `fdi-stakeholder-analysis`).
- 0 subsections carry a `recall` key; 0 have a `diagramId`/`diagram` key (checked all 4) — matches
  `structure-01`'s "0 reorder, 0 fillin, 0 diagrams" exactly.
- `quiz.length===10`, `flashcards.length===19`, `common_mistakes.length===6`, `practice.length===5` —
  the exact denominators `structure-04` cites ("quiz (6/10)... flashcards (10/19)... common_mistakes
  (4/6)").
- Inside `content[]` only, term counts (`grep -io "<term>" <content-only-file>`): `"Controlling MNCs"`
  0 · `"social media"` 0 · `"pressure group"` 0 · `"legal control"` 0 · `"political influence"` 0 ·
  `"misleading"` 0 · `"greenwashing"` 0 · `"Rana Plaza"` 0 · `"child labour"` 1 · `"balance of
  payments"` 0 · `"current account"` 1 · `"business culture"` 0 · `"emission"` 0 · `"waste disposal"`
  0 · `"pollution"` 1 · `"sustainab"` (any form) 0 · `"transfer pricing"` 17 · `"FDI"` 17 · `"arm's
  length"` 1.
- Across the WHOLE bundle (not just `content[]`), the same terms that scored 0 inside `content[]` do
  occur: `"greenwashing"` 1× flashcards, 5× total · `"Rana Plaza"` 1× flashcards + 1× common_mistakes,
  4× total · `"social media"` 2× flashcards, 3× total · `"sustainab*"` 2× (once in a CSR/"sustainability
  reporting" clause, once in a "profits over sustainability" clause — both passing mentions, neither a
  developed teaching point) — 0 inside `content[]`, all 7 elsewhere.
- `common_mistakes[0]` shape is `{title, examTip, mistake, correction}` — already the PR #40 shape, not
  the old `looks_like/why/instead` shape; not a candidate for this packet.
- `extras.chains` (4): "MNC investment drives host country economic development," "Transfer pricing
  raises ethical questions about tax contribution," "Supply chain labour standards create reputational
  risk," "Regulating MNCs requires international cooperation." The fourth is thematically topic-3
  (controlling MNCs) but names no specific case (no "Rana Plaza," "greenwashing," "social media," or
  "boycott" beyond one bare mention) — `structure-04`'s claim that untaught named examples live in
  "flashcards... common_mistakes... and extras chains" is precise for flashcards/common_mistakes and
  only loosely true for extras (thematic overlap, not the same named examples).
- `practice[]`, command/marks/context read directly:
  - `p0`: 4 marks, "Explain two benefits...", `context: null`.
  - `p1`: 6 marks, "Analyse the ethical concerns...GlobalTextiles...", `context`: present (Bangladesh/
    Cambodia sourcing, sub-living-wage, 60hr weeks).
  - `p2`: 10 marks, "Assess the impact of transfer pricing on host countries...", `context`: present
    (African sales, European low-tax subsidiary).
  - `p3`: 4 marks, "Explain two reasons why a multinational corporation might choose to locate its
    manufacturing operat[ions]...", `context: null` — this is the exact item `topFix-04` names
    ("practice[3], production-location reasons, wrong spec point"; 0-indexed match confirmed).
  - `p4`: 20 marks, "Evaluate whether the growth of multinational corporations has been a positive or
    negative development for the global economy," `context: null` — the exact item `practice-01`
    describes.
- `quiz[]` stems (10, read in full): `q2` = "The Rana Plaza disaster in Bangladesh highlighted which
  issue in MNC supply chains?" (matches `quiz-01` exactly); `q3` = "What is greenwashing?" (matches
  `quiz-02` exactly); `q5` = "Which method of controlling MNCs involves organisations like Greenpeace
  campaigning against unethical practices?" (matches `quiz-03`'s "Controlling MNCs absent from
  content[]" and its stem-giveaway claim — "campaigning" maps directly to "pressure group activism").

## 3. The canonical spec text (quoted verbatim, `audit/raw/bus_spec.txt:1453–1487`)

Found by wording (Rule 1: never trust a ledger item's cited number), independently confirmed against
the spec THREE separate ways — the app's own `meta.number` field (`"4.3.4"`), `spec-coverage.json`'s
own `number` field (`"4.3.4"`), and this direct grep/read of the spec text itself, which resolves
`specGap-09`'s stated uncertainty ("app uses 4.3.4 — unsure"): **4.3.4 is the correct, wording-matched
heading** ("Global industries and companies (multinational corporations)" — no other heading in the
document names MNCs, transfer pricing, or controlling MNCs).

```
4.3.4 Global industries and companies (multinational corporations)

What students need to learn:

1 The impact of MNCs
  a) Impact of MNCs on the local economy:
     • local labour, wages, working conditions and job creation
     • local businesses
     • the local community and environment.
  b) Impact of MNCs on the national economy:
     • economic growth
     • FDI flows
     • balance of payments
     • technology and skills transfer
     • consumers
     • business culture
     • tax revenues.
2 International business ethics
  a) Stakeholder conflicts.
  b) Environmental considerations:
     • emissions and waste disposal
     • sustainability.
  c) Supply chain considerations:
     • pay and working conditions
     • exploitation of labour and child labour.
  d) Marketing considerations:
     • misleading product labelling
     • inappropriate marketing activities.
3 Controlling MNCs
  a) Factors to consider:
     • power of MNC
     • political influence
     • legal control
     • consumer pressure
     • pressure groups
     • social media
     • self-regulation.
```

There is no 4.3.5; this is the last topic of Unit 4 (Global business, WBS14), 80 raw marks, "same as
Unit 3" per the assessment table (`bus_spec.txt:1538`).

## 4. Ledger items — text, spec check, and what "done" means

Full text of every id is in `ledger-show-all.txt`; only the checked scope is repeated here.

### topFix (rank order 0–4) — the five headline fixes

- **`topFix-01`** — add a third block, "Ethics & Controlling MNCs" (marketing ethics/greenwashing,
  supply-chain labour incl. Rana Plaza/DRC cobalt, the four controls), or interim: re-tag/remove quiz
  Q3/Q4/Q6/Q7/Q9/Q10 so PreTest cannot sample untaught material.
  **Spec check:** the gap is real — spec leaves 2a/2b(sustainability)/2d/3(political influence, legal
  control, pressure groups, social media, self-regulation) all score 0 inside `content[]` (§2). The
  named quiz ids (1-indexed) map onto `q2,q3,q5,q6,q8,q9` zero-indexed, all confirmed untaught-material
  stems by direct read (§2) — matches `structure-04`'s "6/10."
  **Done means:** either a third block whose subsections cover 2b/2d/3 by name (not just theme — the
  extras chain 3 shows thematic coverage is not enough, §2), or the 6 named quiz items are re-tagged/
  removed and the ledger's own untaught-material items (`quiz-01/02/03`, `specGap-01/02`) are closed by
  a different route. The two are not both required.
- **`topFix-02`** — merge the two transfer-pricing passes (content[0]/body[2] and content[1]
  `transfer-pricing-mechanism`, confirmed as a real duplication — "transfer pricing" scores 17 hits and
  "FDI" 17 hits inside `content[]` alone, §2) into one neutral-definition → manipulation → BEPS/Pillar
  Two sequence, freeing space for balance of payments / business culture / host consumers (all 0 inside
  `content[]`, §2, and independently 0 across the WHOLE bundle for "business culture" — genuinely
  absent everywhere, not merely untaught).
  **Done means:** one transfer-pricing teaching pass, not two; the freed space visibly used for the
  three named 1b) leaves, each nameable in the rebuilt text.
- **`topFix-03`** — add a `fillin` for the transfer-pricing mechanism and a `reorder` for the FDI causal
  chain, plus one diagram.
  **Spec check against the recall contract** (`CONTENT-GATE.md`): the proposed fillin ("subsidiary in a
  ___-tax country charges ___ prices...") is a term/number completion, the right shape for `fillin`. The
  proposed reorder (invest→jobs→skills spillover→tax revenue→profits repatriated) is a genuine causal
  chain, the right shape for `reorder` **only if the prompt names the ordering principle explicitly**
  (Layer 1a, `CONTENT-GATE.md`) — "causal" or "in the order this happens," not "logically." This is the
  one item where the ledger's own proposal needs the `why` line and the explicit-principle wording
  checked at build time, not assumed from the one-line description.
  **Done means:** both widgets exist, pass `reorder.criterion`/`fillin.hint`/`fillin.token` per Layer 1,
  carry a `why` per item, and the section stops tripping `section.no-recall`. Currently 0 recall
  widgets and 0 diagrams (§2) — matches `structure-01` exactly.
- **`topFix-04`** — IAL-format the practice set: 4-markers become "Explain one..." with an extract;
  replace `p3` (confirmed off-topic — "production-location reasons" is not one of 4.3.4's own three
  leaves, §2/§3); rewrite the 20-marker as a data-response tied to a named country/MNC; add levelled
  mark schemes.
  **Spec check:** confirmed against `ial-paper-structure.json`'s `business.units_3_4` (§6) — every
  Business Unit 3/4 practice item should be source-based; `p0`, `p3` and `p4` currently have
  `context: null` (§2), which is the defect this item names.
  **Done means, narrow reading:** the 5 existing items get extracts/context and correct command-word/
  tariff pairing per Appendix 6 (Explain 4, Analyse 6, Assess 10/12, Evaluate 20). **Done means, wide
  reading (§6):** the whole set is reshaped to the canonical 7-item A/B/C structure. These are not the
  same scope — see §1 and §6; a builder should pick one and say which.
- **`topFix-05`** — factual corrections: delete the "repatriated profits exceed investment = net loser"
  fallacy (also `accuracy-01`, below); date/replace the Amazon Luxembourg example (structure changed
  2015); correct BEPS 15% from "proposes" to "implemented from 2024"; add NNPC 55% JV to the Shell
  example.
  **Not independently checked** — these are named-entity/date corroboration claims (Layer 4 territory:
  "any example naming a real entity and a year or a figure must carry a source the reviewer can check"),
  which this brief phase does not verify with search. Flagged, not confirmed or refuted.
  **Done means:** each correction sourced per Layer 4 before publish, not merely restated.

### accuracy

- **`accuracy-01`** — the "repatriated profits exceed investment = net loser" sentence
  (`content[0]>mnc-negative-impacts-ethics>body[0]`) is a stated economic fallacy (ignores wages,
  supplier spend, tax, capital stock retained by the host). Same sentence `topFix-05` also names.
  **Done means:** the sentence is removed or reframed so it does not assert net-loser status from
  repatriation alone; the surrounding evaluative point (repatriation is A cost, not proof of net loss)
  survives.

### quiz

- **`quiz-01`/`quiz-02`/`quiz-03`** — Rana Plaza (q2), greenwashing (q3), and Controlling MNCs (q5,
  with a stem giveaway) are each quiz/PreTest material with 0 occurrences inside `content[]` (§2,
  confirmed by direct isolated grep, a different method from whatever produced these ledger items).
  **Done means:** each question's tested concept appears in `content[]` before the question is kept, OR
  the question is retired/replaced; `q5`'s stem is also reworded so "campaigning" does not map 1:1 onto
  the key.

### practice

- **`practice-01`** — `p4`'s 20-marker is context-free and "global economy"-framed, not a data-response
  tied to a specific business/country decision; guidance is an unranked list, no Level 4 scheme, no
  model answer. Confirmed verbatim (§2). Same scope question as `topFix-04`/§6.

### structure (8 items)

- **`structure-01`** — 0 recall widgets, 0 diagrams — confirmed exactly (§2).
- **`structure-02`** — transfer pricing taught twice, block 2's `fdi-stakeholder-analysis` re-sorts
  block 1's positives/negatives by stakeholder — the 17/17 "transfer pricing"/"FDI" count inside
  `content[]` (§2) is consistent with heavy repetition, though this pass did not read both passages
  side by side to confirm restatement versus legitimate elaboration.
- **`structure-03`** — no difficulty ramp; "arm's length" defined only in block 2 after transfer pricing
  is already explained in block 1 — consistent with `"arm's length"` scoring exactly 1 hit in
  `content[]` (§2), though this pass did not confirm its paragraph position relative to the first
  transfer-pricing mention.
- **`structure-04`** — content vs. assessment misalignment, denominators confirmed exactly (§2: quiz
  10, flashcards 19, common_mistakes 6); the named examples (Rana Plaza, greenwashing, social media)
  confirmed 0-in-`content[]`/present-elsewhere (§2). "Extras chains" named alongside flashcards/
  common_mistakes is only loosely accurate (§2) — a precision note, not a refutation.
- **`structure-05`** — `examMatters` near-identical across all four sections; block 2 takeaway[3]
  repeats block 1 takeaway[2]. **Not independently checked** — would need reading all four `examMatters`
  strings and both takeaway arrays verbatim, not done in this pass (token discipline; flagged in §7).
- **`structure-06`** — the two "MNCs always/never benefit" misconceptions are generic mirror-images;
  only the avoidance/evasion and host-only-stakeholder ones are genuine. **Not independently checked**
  — a judgment call on which misconceptions are "mark-scheme-relevant," not a countable fact.
- **`structure-07`** — block 1 title over-promises ethics content (one sentence on exploitation, one on
  pollution havens); block 2 title bundles two unrelated topics. Consistent with §2's finding that
  ethics-specific terms (marketing considerations, stakeholder conflicts as ethics framing) score 0
  inside `content[]`.
- **`structure-08`** — Economics framing ("current account," "multiplier effects," "resource curse")
  leaks into this Business section. `"current account"` confirmed at exactly 1 hit inside `content[]`
  (§2); "multiplier effects" and "resource curse" **not independently checked** for count.

### specGap (9 items) — cross-checked against `bus_spec.txt:1453–1487` (§3) and `spec-coverage.json`

All nine specGap items' wording matches a real spec bullet under 4.3.4 (no invented scope, unlike the
`structure-06`-in-packet-47 case the handoff warns about at §0):

- `specGap-01` (Controlling MNCs: political influence, legal control, pressure groups, social media) →
  spec 3a); 0 hits each inside `content[]` (§2).
- `specGap-02` (marketing considerations: misleading labelling, inappropriate promotional) → spec 2d)
  exactly; 0 hits inside `content[]` (§2).
- `specGap-03` (supply chain: exploitation of labour and child labour, one clause only) → spec 2c);
  `"child labour"` scores exactly 1 hit inside `content[]` (§2) — matches "mentioned in one clause
  only" precisely.
- `specGap-04` (stakeholder conflicts as an ethics framing) → spec 2a). **Not independently
  term-checked** — this is a framing claim (the content may use stakeholder language without labelling
  it "ethics"), not a lexical absence, so a grep count would not settle it.
- `specGap-05` (balance of payments; only "current account" in one clause) → spec 1b); `"balance of
  payments"` 0, `"current account"` 1, both inside `content[]` (§2) — matches exactly.
- `specGap-06` (business culture, not covered anywhere) → spec 1b); 0 hits inside `content[]` AND 0
  hits across the whole bundle (§2) — the only specGap confirmed absent from EVERY surface, not just
  untaught.
- `specGap-07` (consumers: only home-country consumers covered) → spec 1b). **Not independently
  checked** — confirming "only home-country" needs reading which consumer-related sentences exist and
  whose perspective they take, not a bare term count.
- `specGap-08` (local businesses / local community and environment; wage premium only in a
  misconception) → spec 1a). **Not independently checked** beyond the general grep pass.
- `specGap-09` (spec numbering uncertainty) → **resolved by this pass** (§3): 4.3.4 is correct, verified
  by wording match, independently of the ledger item's own uncertainty and of `spec-coverage.json`'s
  agreeing `number` field.

### specThin (1 item)

- **`specThin-01`** (2b, emissions and waste disposal, named but never defined) → confirmed, and if
  anything understated: `"emission"` and `"waste disposal"` score **0** hits inside `content[]`, not
  merely "thin" — the only adjacent text is one "pollution haven" sentence (regulatory arbitrage, a
  different concept from emissions/waste-disposal practice) appearing once (§2). Whether this counts as
  "thin" (existing sentence needs expansion) or effectively "missing" (needs a new point) is a judgment
  call for the builder, not resolved by a term count.

## 5. `spec-coverage.json`'s `missingItems`/`thinItems` — cross-check against the ledger (§0's Step 3)

Entry for `business__global-industries-mncs` (`spec-coverage-entry.json`): `covered:17, thin:7,
missing:4, worksheetReady:false`, number `"4.3.4"` (a third independent confirmation of §3).

- **All 4 `missingItems` and all 7 `thinItems` map onto an existing ledger id**, except one:
  **"2b) Environmental considerations: sustainability" has no dedicated ledger item.** `specThin-01`
  covers 2b's OTHER half (emissions/waste disposal) but not sustainability specifically, and no
  specGap/specThin item names it. Checked independently (§2, different method from
  `spec-coverage.json`'s own generator): `"sustainab"` (any form) scores **0 hits inside `content[]`**,
  confirming the claim, though the word does appear twice elsewhere in the bundle in passing (§2) —
  neither instance is a developed teaching point. **This is a genuine candidate gap in the ledger
  itself**, the same class of gap that produced `specThin-01` on 13 Sep ("Not represented by any
  existing ledger item for this section") — flagged here as a candidate to add, not added (this pass
  authors nothing, including to `ledger.json`).
- The other ten (`missingItems`: marketing labelling/promotional/social-media, already `specGap-01/02`;
  `thinItems`: balance of payments/consumers/business culture/emissions-waste/child labour/political
  influence/pressure groups, already `specGap-05/06/07`, `specThin-01`, `specGap-03`, `specGap-01`
  twice) are each already represented — no new gaps there.

## 6. Practice reshape target — the 26 Sep "practice follows the real IAL paper layout" ruling

Quoted from `DECISIONS.md` (Settled, 2026-09-26): for "Business Units 3-4 (WBS13/14)": **"A source-
based short and extended response (40) · B and C one 20-mark essay each, from sources."** Confirmed
against `audit/raw/ial-paper-structure.json`'s `business.units_3_4` object (read in full):

- Section A, `source_set`, tariffs `[4,4,8,12,12]` = 40, command words by tariff: 4→Calculate/
  Construct/Explain, 8→Discuss, 12→Assess.
- Section B, one 20-mark essay, `offered:1, answer:1` (no choice), `basedOnSources:true`, Evaluate.
- Section C, same shape as B, a second and different 20-mark essay.
- Total 80 marks, matching `bus_spec.txt`'s own assessment table ("Unit 4... 80 marks," "Same as Unit
  3").

**This is a 7-item canonical target** (5 in section A + 1 each in B/C). The section's current 5
practice items (§2: 4/6/10/4/20 marks, command words Explain/Analyse/Assess/Explain/Evaluate, only ONE
20-mark essay, 3 of 5 with `context:null`) match neither the canonical tariffs (uses 6 and 10, not 8 and
12) nor the canonical count (needs two 20-mark essays from sources, has one, context-free). **As §1
flags: whether packet 56 targets the narrow ledger-item fixes (`topFix-04`, `practice-01` as literally
written) or this wider 7-item reshape is a scope decision this brief does not make.** Packet 46's own
brief (26 Sep, same day this ruling was recorded) flagged the identical ambiguity for its own Economics
section and left it to the builder; the same treatment applies here.

## 7. Related, not this packet's ledger, but worth carrying into the build

- **The Unit 4 hub page.** Packets 47 and 48 (both other Business Unit 4 sections) each independently
  found `app/business/unit-4/page.js` and `app/business/page.js` describing a STALE version of their
  own rebuilt section, unfixed as of packet 48's handoff (26 Sep). Checked here, specifically for THIS
  section: `app/business/unit-4/page.js:41-49` already lists `global-industries-mncs` with subtopics
  (a) MNCs definition, (b) Transfer Pricing & Tax, (c) FDI & Host Countries, (d) Ethical Issues, (e)
  Controlling MNCs — a 5-part breakdown that does not match the spec's own 3-part structure (§3) but is
  not obviously wrong either. `app/business/page.js:49` gives a one-line summary ("Transfer pricing,
  FDI, ethical issues"). **Neither file is a ledger item for this packet**, but per packets 47/48's
  precedent, whoever rebuilds this section should re-check both files against the rebuilt content
  before any publish, the same way a stale hub-page copy bit two prior Unit 4 packets.
- **The check-in answer rule** (`CONTENT-GATE.md`, updated 26 Sep, blocking): this section currently
  has 0 diagrams and 0 recalls (§2), so there are no existing check-ins to leak; if `topFix-03`'s
  diagram is added and paired with a quiz check-in, the reader-judged `leaks`/`clean` line (not an
  automated check — the rule explicitly says a word-overlap test caught 0 of 4 real leaks) will be
  needed for that new check-in at Verify A/B time.
- **The recall contract's own gate:** adding `topFix-03`'s fillin/reorder moves this section from 0
  recalls to some number > 0, which is what will make `npm run recalls` and `section.no-recall`
  evaluate it for the first time; neither was run by this pass (Gate-phase work).

## 8. Not independently checked in this pass (say what was not measured)

- `topFix-05`'s four named-entity/date corrections (Amazon Luxembourg, BEPS 15%/2024, NNPC/Shell) —
  Layer 4 corroboration needs a live search, not done here.
- `structure-02`'s "restatement" claim, `structure-03`'s paragraph-position claim, `structure-05`'s
  near-identical `examMatters` claim, `structure-06`'s misconception-quality judgment, `structure-08`'s
  "multiplier effects"/"resource curse" counts, and `specGap-04/07/08`'s framing claims — none of these
  are countable by a term-grep; they need a full read of the relevant prose, not done here (token
  discipline).
- Quiz items other than q2/q3/q5 (options, `correctIndex` distribution, explanation-option-letter
  rules) were not read.
- Flashcards (19) and common_mistakes (6) were counted and term-grepped but not read card-by-card.
- Whether any OTHER live section already teaches business culture, sustainability, or Controlling MNCs
  under a different topic number (a `SPEC-OWNERSHIP.md`-style cross-section duplication check) — not
  run; `grep -n "global-industries" audit/SPEC-OWNERSHIP.md` returned 0 hits, so no explicit ownership
  entry exists to check against.
