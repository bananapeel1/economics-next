# Packet 49 brief — business-growth, IAL Business 3.3.2

**This is a brief. It contains no build, no fix, no publish, no test run, and no verification verdict.**
Everything below is either (a) a ledger item's own claim, quoted, to be CHECKED by the build/Verify A/Verify B
phases that follow this brief, or (b) a fact this pass counted or read directly, with the command shown. No
"confirmed", "fixed", "clean" or "leaks" line appears below — those belong to the Gate and the two Verify
phases, not to this document.

## 0. Handoff-document check (Rule: STOP if PROTOCOL / NEXT / PROGRESS / DECISIONS / CONTENT-GATE disagree)

Read in full: `audit/PROTOCOL.md`, `audit/SESSION-PROMPT.md`, the newest "Handoff" entries in `audit/NEXT.md`
(there is no `## Packet 49 spec` heading anywhere in the file — confirmed by `grep -n "## Packet 49 spec"
audit/NEXT.md`, 0 hits — the same gap packets 41/43-48/50/53 already hit and normalized; PROTOCOL's own rule
is that the ledger defines scope when this heading is missing), this packet's row in `audit/PROGRESS.md`
(`## Content — one section per packet, traffic order` table, row 49), the Settled list in `audit/DECISIONS.md`,
and `audit/CONTENT-GATE.md`'s recall contract and check-in-answer rule.

**No contradiction found among these five documents for this packet's scope.** All of them, and three
separate "next unclaimed packet" checks by earlier bookkeeping passes (after packets 45, 48 and 53 — quoted
verbatim in `NEXT.md`), agree: packet 49 is `business-growth`, IAL Business 3.3.2, and is free (no run folder
existed before this pass created one, 0 items claimed).

**One apparent mismatch, resolved, not escalated.** An earlier (packet-45-era) `NEXT.md` line reads "Packet 49
(traffic order, 27 Opens) is untouched and behind 48 in the same table" — read in isolation this looks like a
second, rival name ("traffic order") for packet 49. It is not: `## Content — one section per packet, traffic
order` (`audit/PROGRESS.md:60`) is the literal heading of the table that line refers to, and `Opens` is that
table's own column header (`audit/PROGRESS.md:64`, `| # | Section | Opens | Status | Commit | Snapshot |
Validator |`). "27 Opens" is the Opens-column value, not a section name. Confirmed by reading the table header
directly, not by trusting either handoff's prose.

**One stale count, not a contradiction, needs fixing at the next gate:** `audit/PROGRESS.md` row 49 currently
reads `| 49 | business-growth | 10 | not started | | | |` — an Opens value of 10. A fresh run of
`node audit/scripts/ledger.mjs packet 49 --open` (this pass, just now) shows 27 open items, and `node
audit/scripts/ledger.mjs packet 49` (no flag) also prints "27 items" as its own footer. The row is stale by
the same lag other packets' PROGRESS rows have carried until their own bookkeeping pass ran; whoever closes
this packet updates it then.

## 1. The ledger — 27 open items, 0 claimed, 0 confirmed, 0 rejected, 0 wont-fix

Counted two ways: `node audit/scripts/ledger.mjs packet 49 --open` lists 27 rows and prints "27 items"; the
ids piped to a file and counted with `wc -l` also gives 27 (`audit/runs/packet-49/ids.txt`). By kind:
topFix 5 · accuracy 2 · quiz 4 · practice 2 · structure 8 · specGap 6 (5+2+4+2+8+6 = 27, arithmetic, not
trusted from the CLI's own grouping). Full text of every item: `audit/runs/packet-49/ledger-show-all.txt`
(`node audit/scripts/ledger.mjs show <id>` run once per id).

**Six items (`accuracy-02`, `specGap-01` through `specGap-06`) already carry the programme's own spec-numbering
warning in their `note` field**, dated 13 Sep 2026: they cite UK-GCE-style numbers (`3.2.1`–`3.2.4`, `3.1.3`)
that do not exist in the IAL specification, and the note already states the correct IAL number is 3.3.2. This
brief does not re-derive that warning; it is already in `ledger.json`. What follows quotes the actual IAL
spec wording instead of any ledger-cited number, per Rule 1.

## 2. The spec in scope, quoted, `audit/raw/bus_spec.txt:1117-1145`

```
3.3.2 Business growth

What students need to learn:

1 Growth              a) Objectives of growth:
                         •     economies of scale (internal and external)
                         •     increased market power over customers and suppliers
                         •     increased market share and brand recognition
                         •     increased profitability.
                      b) The distinction between inorganic and organic growth.
2 Organic growth      a) Methods of growing organically.
                      b) Advantages and disadvantages of organic growth.
3 Inorganic growth    a) Mergers and takeovers:
                         •     reasons for mergers and takeovers
                         •     distinction between mergers and takeovers
                         •     horizontal and vertical integration
                         •     conglomerates
                         •     financial risks and rewards.
                      b) Advantages and disadvantages of inorganic growth.
4 Problems arising    a) Diseconomies of scale.
  from growth
                      b) Internal communication.
                      c) Overtrading.
```

(Next heading, `3.3.3 Decision-making techniques`, at `:1146` — confirmed bounds, no ambiguity about where
3.3.2 ends.)

**Nothing under 3.3.2 mentions demergers, or reasons for staying small, or Ansoff's Matrix, or barriers to
entry.** Those four appear elsewhere in the ledger's items (below) as either off-spec or misplaced.

## 3. Independent check performed by this pass: the demergers items are stale against CURRENT content

`audit/SPEC-OWNERSHIP.md:21` records: *"Demergers: reasons and impact | economics 3.3.1.2g |
`types-sizes-businesses` | `business-growth` (3.3.2), one subsection | **Done.** The duplicate subsection was
removed 14 Sep."* Several ledger items (`topFix-02`, `accuracy-01`, `accuracy-02`, `structure-04`,
`structure-06`, `structure-07`, `structure-08`'s premise, `specGap-06`) describe a live "demergers-splitting-up"
subsection in detail (an eBay/Skype factual error, an `examMatters` claim, a takeaway, a misconception) and
are still `status: open` with `closed_by: null`.

This pass checked the CURRENT content directly — a method different from reading either the ledger or
SPEC-OWNERSHIP.md's prose: `curl -s "http://localhost:3001/api/sections/business-growth"` (no `?draft=1`,
signed out — `isPremium: false` in the response, `contentVersionSince: 2026-09-25T12:11:49` matching the
packet-2.9 checkpoint publish already recorded in NEXT.md, not a packet-49 change), saved at
`audit/runs/packet-49/live-business-growth.json`.

- `grep -o "demerger[a-z]*" audit/runs/packet-49/live-business-growth.json | sort | uniq -c` → zero matches,
  anywhere in the payload.
- The two content blocks carry exactly three subsections: `organic-growth-methods`, `external-growth-methods`,
  `reasons-staying-small`. Block 2 ("Growth Decisions") has exactly one subsection, not two.
- The repo's own t=0 baseline snapshot (`audit/content-sections/business__business-growth.json`, predating
  any remediation packet) has `meta.subsections: 4` — i.e. it DID carry a fourth (demergers) subsection before
  14 Sep, which is consistent with SPEC-OWNERSHIP.md's account and with the ledger items having been true when
  written, not with them being true now.

**This is a candidate to check, stated as a candidate: before building anything from `topFix-02`, `accuracy-01`,
`accuracy-02`, `structure-04`, `structure-06`, `structure-07`, `specGap-06`, re-read the current bundle (draft
and live) for a demergers subsection. If this pass's read is confirmed, those items describe content that no
longer exists and most likely close as already-resolved (or wont-fix, citing this check) rather than being
built — the same disposition packets 45/47/48 gave their own stale-numbering specGap items. `structure-08`'s
premise (notes[] omitting a subsection content[] carries) may also now be moot, since content[] itself is down
to 3 subsections matching notes[]'s 3 entries — that arithmetic is worth re-running once the draft/live
question above is settled, not assumed from this count alone.**

## 4. A candidate this pass found, not in any existing document: `specGap-05` may itself be off-spec

`specGap-05` reads: *"3.2.4 Reasons for staying small: small firm survival via product differentiation/USP,
flexibility, customer service, e-commerce enabling small firms to compete. E-commerce and USP framing absent;
content covers niche, flexibility, personal service, owner choice."* Its own `note` already flags the "3.2.4"
number as non-existent UK-GCE numbering and points to 3.3.2 as the section — but 3.3.2's quoted text above
contains no "reasons for staying small" bullet at all, under any part-letter.

`grep -n -i "small" audit/raw/bus_spec.txt` (whole-file, exhaustive) returns exactly one line, `:1032`, under
**2.3.5 External influences, topic 3 "The competitive environment", part (b): "Ways for a small business to
compete in a competitive market."** — a different unit (Unit 2, not Unit 3) and a different topic number,
already recorded in `SPEC-OWNERSHIP.md`'s convention ("a topic is taught in the section whose specification
number contains it, and nowhere else") as the kind of question that section owns, not `business-growth`.

**This is a candidate to check, not a conclusion**: whether the live "Reasons for Staying Small" subsection
(currently the whole of Block 2, per section 3 above) is in scope for 3.3.2 at all, in the same way demergers
was checked and found not to be, is a question this brief surfaces and does not answer. `specGap-05` as
written asks to ADD MORE such content; if the subsection turns out to be off-spec the correct action may be
the opposite (remove or relocate, as demergers was), which is exactly the shape of trap Rule 1 names ("Four
items once told a packet to delete a topic the spec requires" — here the risk runs the other way: a ledger
item asking to grow an off-spec subsection). `SPEC-OWNERSHIP.md` does not yet have a row for this; whoever
resolves it should add one, the way the demergers and Porter's-five-forces rows were added.

## 5. A carried, 12-day-old defect note this pass could not confirm or refute either way

`audit/DECISIONS.md:796-807` (14 Sep, packet 14 era) records a production crash: business-growth's Learn Mode
throws `TypeError: Cannot read properties of undefined (reading 'map')` on first click, attributed to
`origin/main` lacking `components/learn-mode/FlowChain.jsx`. No later entry in `DECISIONS.md` or `NEXT.md`
revisits it (`grep -n "FlowChain" audit/DECISIONS.md audit/NEXT.md` → 2 hits, both the original 14 Sep entry).

This pass compared the actual component chain in use today, by a different method than trusting the 14-Sep
note: `find . -iname "FlowChain*"` (this worktree) → only `components/notes/FlowChain.jsx` exists, not
`components/learn-mode/FlowChain.jsx`. `components/notes/BodyRenderer.jsx` (imported by `NoteSection.jsx`,
which `LearnModeTab.jsx` itself imports) has a `case 'flow':` branch rendering `<FlowChain>`. `git show
origin/main:components/notes/BodyRenderer.jsx` and `git show origin/main:components/notes/FlowChain.jsx`
(checked against `origin/main` HEAD `9b044b6`, 2026-09-26 13:43) both succeed — i.e. the component path
actually used by `LearnModeTab.jsx` today exists on `origin/main`, at a different path than the one the 14-Sep
note names as missing.

**This is a fact about file existence, not a verification of runtime behaviour — it does not say the crash is
fixed, only that the specific cause the 14-Sep note gives no longer matches the current code layout.**
Whether business-growth's Learn Mode still crashes is a Verify B question (390×844, real taps) for whoever
builds or re-verifies this packet, not something this brief can settle.

## 6. A gap in this pass's own read: the "mistakes" bank

The live API's `counts.mistakes` reads 5, but the same response's top-level `mistakes` array is empty (`[]`).
This pass does not know why (candidates: the known "Blank Pro mistake cards" issue tracked elsewhere and not
this packet's fault, since `isPremium: false` was returned for this signed-out read; or a field-name mismatch
between this endpoint's `mistakes` and the `common_mistakes` key the repo's t=0 snapshot and the ledger both
use). Net effect: `topFix-03` and `structure-03`, which both cite `common_mistakes[1]` (the "draw a simple
supply chain diagram in your head" line, present in the t=0 baseline snapshot), could not be confirmed or
refuted against current live content by this pass. Read it from source data (the staging script or a
`?draft=1` fetch once one exists) before building against it.

## 7. Per-item scope, quoted, against the spec text in section 2

| id | kind | claim (quoted, shortened) | spec anchor (quoted section 2) / status |
|---|---|---|---|
| topFix-01 | topFix | Re-align assessment to teaching: add a block on economies of scale/diseconomies/overtrading, or pin quizIndices/practiceIndices so untaught items can't surface. | 3.3.2 · 1a, 4a-c all name this content; it is a real gap per section 3's confirmation that no demergers subsection displaced it — check against current content, not against this item's own count. |
| topFix-02 | topFix | Replace the demergers subsection with a diseconomies/overtrading one. | **See section 3: the demergers subsection this item describes may no longer exist. Re-check before treating "replace" as the right verb — the target of the replacement may need to be "add", not "replace".** |
| topFix-03 | topFix | Add an InlineDiagram for block 1: supply chain with integration-type arrows. | 3.3.2 · 3a names "horizontal and vertical integration"; no diagram of it exists in `content[]` (confirmed, section 3's fetch: `diagrams` not present in the block-1 payload read). See section 6 for the common_mistakes[1] cross-reference this item makes, unconfirmed. |
| topFix-04 | topFix | Add recall widgets: fillin on the four integration types; reorder of the takeover-to-synergy sequence. | 3.3.2 · 3a (integration types), 3a "reasons for mergers and takeovers" (a sequence). Confirmed zero recalls in the current payload's block 1/2 (no `recall` key seen in either subsection read for this brief). Must follow the recall contract in `CONTENT-GATE.md` (`reorder`/`fillin` shapes, `why` lines, BLOCK/DEBT checks) and the check-in-answer BLOCKING rule if either recall sits at a chapter check-in alongside a diagram or quiz. |
| topFix-05 | topFix | Swap practice idx 2 (Ansoff) and idx 3 (barriers to entry) for on-spec items; add levels-style mark scheme; de-UK CMA/MegaRetail references. | Confirmed by this pass's own fetch: current practice bank still has an Ansoff item (gym chain) and a barriers-to-entry item — neither is 3.3.2 content (Ansoff is 3.3.1, barriers to entry is not in `bus_spec.txt`'s 3.3.2 or 3.3.5 wording read for this brief). Per DECISIONS.md (26 Sep, "practice follows the real IAL paper layout"), Business Units 3-4 practice is A (source-based, 40) · B (20-mark essay) · C (20-mark essay) — worth checking this item's shape against that ruling, which post-dates it. |
| accuracy-01 | accuracy | eBay/Skype demerger claim is factually wrong (a stake sale, not a demerger). | Moot if section 3's check holds (no demergers subsection in current content) — re-check before spending a fix round on it. |
| accuracy-02 | accuracy | Demergers subsection is off-spec for 3.3.2 (cites the wrong, UK-GCE `examMatters` claim). | Already flagged stale-numbering in its own `note`; also likely moot per section 3. |
| quiz-01 | quiz | q0: internal/external economies of scale answer is correct but the concept is never taught in `content[]`. | 3.3.2 · 1a names it explicitly ("economies of scale (internal and external)"). Confirmed: current live `content[]` (this pass's fetch) does not use the phrase "economies of scale" in either subsection's body text. |
| quiz-02 | quiz | q2: diseconomies of scale answer correct, concept only mentioned in passing. | 3.3.2 · 4a names diseconomies of scale as its own numbered requirement, not a passing mention. |
| quiz-03 | quiz | q3: overtrading answer correct, concept absent from `content[]`. | 3.3.2 · 4c names overtrading explicitly. |
| quiz-04 | quiz | q7: same as quiz-03 (untaught), plus a distractor-explanation gap. | Same 3.3.2 · 4c anchor. |
| practice-01 | practice | p2 (Ansoff, 10 marks) is 3.1 content, not 3.2; also generic phrasing where a case name exists. | Ansoff does not appear anywhere in the quoted 3.3.2 text; SPEC-OWNERSHIP.md's Ansoff row (line 29) names `business-objectives-strategy` (3.3.1) as the owner. |
| practice-02 | practice | p3 (barriers to entry, 4 marks) is off-topic for 3.2. | Barriers to entry does not appear in the quoted 3.3.2 text. |
| structure-01 | structure | 5 of 10 MCQs and 3 of 5 practice questions test untaught material (economies of scale, diseconomies, overtrading, Ansoff, barriers to entry). | Cross-checked by this pass: current quiz bank is 10 items, practice bank is 5 (`counts.quiz: 10`, `counts.practice: not printed but 5 items read`), consistent with the item's arithmetic. |
| structure-02 | structure | Zero recall widgets in either block. | Confirmed by this pass's fetch: no `recall` key found on any subsection read. |
| structure-03 | structure | Zero diagrams; `common_mistakes[1]` tells students to "draw a supply chain diagram in your head". | Diagram count confirmed zero in the payload's block content read. `common_mistakes[1]` itself: see section 6, unconfirmed. |
| structure-04 | structure | Block 2 pairs "Staying Small" with "Demergers", an incoherent pairing. | **See section 3: block 2 currently has only one subsection ("Reasons for Staying Small"), not two — this item's specific pairing complaint may already be moot, though a different problem (block 2 has 1 subsection vs block 1's 2) may now exist in its place. Re-check, don't assume either way.** |
| structure-05 | structure | Difficulty ramp: jumps from prose to a 20-mark evaluate with no intermediate teaching; material exists in `extras.chains[2]`/`[3]` but is hidden from Learn Mode. | This pass's fetch of `extras.chains` returned only 1 of the reported 4 chains (the API appears to sample, not return the full bank, for a signed-out non-draft read) — could not confirm chains[2]/[3]'s content directly; read from source/staging data, not this endpoint, before building against this claim. |
| structure-06 | structure | Block 1 takeaway[3] overclaims re: culture clash; Block 2 takeaway[3] trains for a demerger-evaluation question type WBS13 is unlikely to set. | This pass's fetch shows Block 2's `takeaways` as `[null]` currently (no takeaway array populated) — **the specific takeaway[3] this item quotes may no longer exist; re-check before building a fix for it.** Block 1's takeaway[3] claim was not independently checked by this pass (not fetched). |
| structure-07 | structure | Misconceptions: organic-growth and staying-small ones are genuine; demergers one is filler. | The demergers-misconception half is moot if section 3 holds. The staying-small misconception ("students assume staying small means the firm failed") is present in this pass's fetch, verbatim, in the current `reasons-staying-small` subsection. |
| structure-08 | structure | Notes[] has only 3 entries, omitting demergers, so Notes and Learn Mode disagree on scope. | This pass's fetch: `notes` has exactly 3 entries (Organic Growth, External Growth, Reasons for Staying Small) and `content[]` also has exactly 3 subsections now — the counts currently AGREE. Re-run this comparison once section 3's draft/live question is settled; the mismatch this item describes may already be resolved as a side effect of the demergers removal, not by any packet-49 fix. |
| specGap-01 | specGap | Objectives of growth (economies of scale w/ named types, market power, market share, profitability) not taught, only quizzed. | 3.3.2 · 1a, quoted in full above. Confirmed: "economies of scale" does not appear in the current `content[]` body text this pass read (see quiz-01). |
| specGap-02 | specGap | Diseconomies of scale, internal communication, overtrading not taught. | 3.3.2 · 4a-c, quoted above, all three named. Internal communication specifically (4b) was not independently checked by this pass. |
| specGap-03 | specGap | Mergers/takeovers: reasons beyond speed, financial risks and rewards, problems of rapid growth under-taught. | 3.3.2 · 3a ("reasons for mergers and takeovers", "financial risks and rewards"), 4 ("problems arising from growth"). Only "speed and culture clash" reported taught by this item; not independently re-read by this pass beyond the takeaway text in section 3. |
| specGap-04 | specGap | Methods of organic growth: franchising, licensing, e-commerce absent. | 3.3.2 · 2a ("methods of growing organically") is unspecific in the spec itself — the spec does not name franchising/licensing/e-commerce as required sub-items, only "methods" generally. **Worth checking whether this item's specific examples are load-bearing or illustrative before treating their absence as a spec gap**, since the spec text quoted in section 2 does not itself enumerate them. |
| specGap-05 | specGap | Reasons for staying small under-taught (e-commerce, USP framing absent). | **See section 4: this item's own premise (that 3.3.2 has a "reasons for staying small" requirement) does not match the quoted spec text, which has none. The only "small business" wording anywhere in `bus_spec.txt` sits under 2.3.5(b), a different section's territory per `SPEC-OWNERSHIP.md`'s stated convention. Check scope before adding anything here.** |
| specGap-06 | specGap | Off-spec content present: demergers. | This item's own conclusion (off-spec) is very likely correct and already acted on — see section 3: SPEC-OWNERSHIP.md records it removed 14 Sep, and this pass's live fetch found no trace of it. Likely to close as already-resolved once the draft/live check is done, not as new work. |

## 8. What "done" means for this packet, stated as gate requirements, not results

Per `PROTOCOL.md`'s lifecycle and `CONTENT-GATE.md`:

- Every claimed id confirmed by a fresh Verify A (or disposed `wont-fix` with a note, the way `specGap-01`
  through `-06`'s numbering issue and multiple items in sections 3-4 above may resolve).
- Recall widgets (if `topFix-04` is built) follow the recall contract's shapes (`reorder`/`fillin`/`match`/
  `classify`, each with its required fields and a `why` line) and the per-section checklist (`CONTENT-GATE.md`
  §"The per-section edit pass", 7 items) — not summarised here, read in full before building.
- Any chapter check-in that pairs a diagram (from `topFix-03`, if built) with a quiz question must not leak
  the answer in the diagram's caption/checklist/view titles/SVG text — the BLOCKING rule in `CONTENT-GATE.md`,
  judged by a reader in Verify A and again on screen in Verify B, never by an automated check (the rule
  states 0 of 4 known leaks were caught by a word-overlap test).
- `npm run build`, `npm test`, `npm run validate`, `npm run exposure`, `npm run recalls` all exit 0.
- Per Rule 3 (session prompt) and the pattern in `SPEC-OWNERSHIP.md`'s rows for packets 45/47/48: before any
  publish, confirm `origin/main`'s components can read every field the new bundle carries (recall types,
  `diagramId` pins, flow-step shape) — not done by this brief, owed by the build/publish step.
- `audit/PROGRESS.md` row 49 updated (Opens count corrected per section 0) and `SPEC-OWNERSHIP.md` gets a new
  row if section 4's staying-small question resolves either way (removed, relocated, or ruled in-scope).
- Section 5's carried defect note either gets a fresh Verify B line (reproduces / does not reproduce, with the
  390×844 walkthrough that produces it) or stays carried forward with a date — this brief does not resolve it.

## Escalation

**None required to build.** No disagreement was found among the five handoff documents PROTOCOL.md names.
The items in sections 3, 4 and 6 above are candidates for the build/Verify A phase to check against current
content, not blockers — the same disposition earlier packets gave their own stale or mis-scoped ledger items.
Two things are worth the founder's attention when this packet reaches a gate, not before: (a) whether
"Reasons for Staying Small" belongs in `business-growth` at all (section 4) — the same class of question that
produced `SPEC-OWNERSHIP.md`'s existing rows, and (b) confirming section 5's carried Learn Mode crash note one
way or the other, since it has sat unrevisited for 12 days across several checkpoint merges.
