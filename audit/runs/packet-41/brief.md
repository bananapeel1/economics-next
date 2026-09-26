# Packet 41 brief — `external-influences` (Business Unit 2, WBS12, IAL 2.3.5)

Produced by the Brief phase. Contains no measurement, test, build or verification claim — only counted
facts (with the command that produced each count) and spec wording quoted verbatim. All results belong to
Gate / Verify A / Verify B, which run after this brief.

## 0. Documents read, and one premise in the task that does not hold

Read in full: `audit/PROTOCOL.md` (150 lines), `audit/DECISIONS.md` (3089 lines, `## Settled` at :13
onward), `audit/CONTENT-GATE.md` (454 lines), this packet's row in `audit/PROGRESS.md` (:84), and the
`external-influences` mentions in `audit/NEXT.md` (9528 lines, grepped and read in context, not summarized).

**No `## Packet 41 spec` heading exists anywhere in `audit/NEXT.md`** (`grep -n "^## Packet 41 spec"
audit/NEXT.md` → no output). The task text that launched this session assumed one exists; it does not.
The only substantive NEXT.md content about this packet sits inside `## Handoff — packet 40 closed
(brain)` (starts ~line 9396), in its "Next unclaimed packet" paragraph, which names `external-influences`
as the next unclaimed packet and reports `node audit/scripts/ledger.mjs packet 41 --open` → 32 open
items, Business 2.3.5. Two other lines (`:822`, `:1058`) repeat "32 open" in older alternatives-lists.
**This is the closest thing to a spec block or newest handoff for packet 41; treat it as that, not as a
missing document.** Separately, `audit/NEXT.md` itself is not a clean append-only stack — headings dated
"21 September 2026" appear at both `:150` and `:9501` (the latter with an explicit time, 20:55), which is
the known handoff-file race this programme's own memory records. I did not find any Handoff entry dated
22 September or timed later than 21:15 on 21 September that discusses this section.

## 1. Ledger snapshot — counted, not summarized

Commands run, this session:
```
node audit/scripts/ledger.mjs packet 41          # 33 items total
node audit/scripts/ledger.mjs packet 41 --open   # 32 items (1 confirmed: quiz-01)
node audit/scripts/ledger.mjs show <id>           # run once per open id; full output at
                                                    # audit/runs/packet-41/ledger-show-all.json
```
33 = 5 topFix + 4 accuracy + 3 quiz + 1 practice + 9 structure + 8 specGap + 3 specThin. One quiz item
(`quiz-01`, the Q15 currency-figure typo) is already `confirmed`, closed outside this packet's ledger
count of open work.

**Contradiction #1 — `audit/PROGRESS.md:84` disagrees with the ledger.** The row reads
`| 41 | external-influences | 14 | not started | | | |` — an "Opens" figure of **14**. `git blame -L
84,84 audit/PROGRESS.md` shows this line is unchanged since commit `eccb30a5`, **11 September 2026**, day
one of the programme, before the `specThin-01/02/03` items were minted on 13 September (their own `note`
field says so) and before other items were added. The ledger today, and `audit/NEXT.md`'s freshest
handoff (21 September, packet-40 close), both independently say **32 open**. PROTOCOL.md is explicit that
this is not a genuine disagreement requiring arbitration: "**The ledger is the definition of coverage**
… Use `node audit/scripts/ledger.mjs` to change it." PROGRESS.md's Opens column is a status-table
convenience that is only rewritten at a packet's gate (PROTOCOL step 5.6); for a `not started` packet it
has simply never been touched since day one. I am treating **32 open** (ledger.json) as authoritative per
PROTOCOL's own rule, not picking a side of an unresolved dispute — flagging it here because a stale count
sitting unflagged is exactly the failure shape this programme's rules exist to catch.

## 2. The spec, quoted verbatim (`audit/raw/bus_spec.txt:1009-1029`)

```
2.3.5 External influences

What students need to learn:

1 Economic influences  a) The effect on businesses of, and how they can best respond to,
                           changes in:
                           • the rate of inflation
                           • exchange rates (appreciation, depreciation)
                           • interest rates
                           • taxation and government spending
                           • the business cycle.
2 Legislation           a) The effects on businesses of:
                           • consumer protection
                           • employee protection
                           • environmental protection
                           • competition policy
                           • health and safety
                           • intellectual property rights (copyright, patents
                             and trademarks).
3 The competitive       a) The effects on businesses of competition in terms of competitor:
  environment              • numbers
                            • size
                            • behaviour.
                         b) Ways for a small business to compete in a competitive market.
```
Section number confirmed directly from this heading: **`specGap-08`'s own uncertainty ("2.3.5 vs GCE
2.5 — unsure") is resolved** — the spec file's own heading is literally "2.3.5 External influences", and
`audit/raw/spec-coverage.json`'s `business__external-influences` entry independently records
`"number": "2.3.5"` too. This is one of the sections whose ledger-cited number is NOT among the 154 wrong
UK-GCE citations Rule 1 warns about.

`spec-coverage.json`'s own leaf count for this section: `covered: 11, thin: 6, missing: 2` (19 leaves by
its counting method — a different unit from "33 ledger ids"; do not conflate the two counts).
`missingItems`: "Economic influences: government spending"; "Legislation: environmental protection".
`thinItems`: "Legislation: competition policy"; "Legislation: health and safety"; "Legislation:
intellectual property rights — patents"; "— copyright"; "— trademarks"; "Ways for a small business to
compete in a competitive market."

## 3. Current bundle state, counted from `audit/content-sections/business__external-influences.json`
(the t=0 audit baseline — PROTOCOL.md: "the audit corpus is canonical")

```
python3 -c "import json; d=json.load(open('audit/content-sections/business__external-influences.json')); print(d['meta'])"
```
`meta`: `id: external-influences, number: 2.3.5, unit: 2, unitCode: WBS12, blocks: 5, subsections: 12,
reorder: 0, fillin: 0, quiz: 25, practice: 5, diagrams: 0, flashcards: 24, notes: 5, mistakes: 0,
extrasChains: 4, extrasEval: 3`. (Note: `meta.mistakes` reads 0 but the top-level `common_mistakes` array
actually holds 6 entries — a metadata/array mismatch in the bundle itself, not something any ledger item
names; flagging it since Rule 4 asks for every other field of an entry to be read.)

Block → quiz/practice index wiring, read directly from `content[].quizIndices` / `.practiceIndices`:
```
0 Inflation                                    quizIndices=[0]  practiceIndices=None
1 Exchange Rates, Interest Rates and Taxation   quizIndices=[1]  practiceIndices=[0]
2 The Business Cycle                            quizIndices=[2]  practiceIndices=[1]
3 Business Legislation                          quizIndices=[3]  practiceIndices=None
4 The Competitive Environment                   quizIndices=[4]  practiceIndices=[2]
```
Quiz stems at those indices (read from `quiz[i].question`, first ~90 chars): q0 = pound/euro exchange
rate; q1 = recession/business type; q2 = rising interest rates; q3 = which IP right covers an invention
(patents); q4 = Competition and Markets Authority. **Independently confirms `structure-02`'s mapping
claim by a different method (direct JSON read + stem text) than however the original audit found it**:
the Inflation block's only quiz is about exchange rates, the Exchange/Interest/Tax block's quiz is about
recession, the Business Cycle block's quiz is about interest rates, and the Competitive Environment
block's quiz is the CMA question — none of the five blocks' single quiz question is about that block's
own topic.

Practice stems (`practice[i].question`, marks): p0 exchange rate (4); p1 interest rates (6); p2
environmental legislation (10); p3 "Evaluate … shareholders over other stakeholders" (20); p4 "Outline two
effects of inflation" (4). Confirms `practice-01`'s and `structure-03`'s claims exactly: p3 is a
stakeholders/objectives question wired to no block; p4 is about inflation but the Inflation block has
`practiceIndices: None`.

## 4. Items, grouped, with spec-check status

Full text of every open item is in `audit/runs/packet-41/ledger-show-all.json`; only what needs a flag or
a spec citation is repeated here.

### topFix (5) — the prescribed fixes; everything below is their evidence
- **topFix-01** — wire each block's `quizIndices`/`practiceIndices` to its own content; fix Q5's
  double-correct option. (The Q15 currency typo it also names is **already closed** as `quiz-01`,
  confirmed — do not re-do it under this id.) No spec check needed; this is a data-wiring defect, counted
  in §3 above.
- **topFix-02** — internationalise: replace UK statutes, NICs, Bank of England, CMA with generic terms
  plus a non-UK example; delete the "examiners frequently use Porter's Five Forces" claim. **Spec-checked:
  §2's wording never names a UK statute, NICs, the Bank of England or the CMA** — `grep -i` for each of
  "Consumer Rights Act", "Trade Descriptions", "Consumer Contracts Regulations", "National Insurance",
  "Bank of England", "Competition and Markets Authority" against `audit/raw/bus_spec.txt` returns zero
  hits. Live bundle count (`grep -oi`): "CMA" ×5, "Competition and Markets" ×3, "Competition law" ×4 —
  this is real, present content to internationalise, not a phantom finding.
- **topFix-03** — teach government spending, environmental/competition/health-and-safety legislation,
  market size/competitive-environment responses instead of Economics extras; demote cost-push/demand-pull
  and the perfect-competition→monopoly taxonomy to asides. **Spec-checked, mixed**: "cost-push" and
  "demand-pull" appear only in `audit/raw/econ_spec.txt:917-918`, never in `bus_spec.txt` — confirmed
  off-spec for this Business section. "perfect competition", "monopoly" and "market structure" appear
  **zero times anywhere in `bus_spec.txt`** — confirmed entirely off-spec, not just under-emphasised. The
  "market size" half of this instruction inherits `specGap-06`'s problem below — check before authoring.
- **topFix-04** — add reorder recalls (interest-rate transmission chain; business-cycle phases), a SPICED
  fillin, a business-cycle diagram. Matches `audit/CONTENT-GATE.md`'s recall contract (`:196-233`):
  `reorder` is for "a genuine sequence: cause to effect, a process, a calculation," which both named
  chains are. No diagrams currently exist (`meta.diagrams: 0`, confirmed §3) and
  `audit/recall-census-baseline.json` has **no entry for `external-influences`** — per DECISIONS.md's
  2026-09-19 packet-2.7 entry (`:2561-2575`), a missing baseline entry means the `recalls` gate holds this
  section to **zero** recoverable-from-scroll-up answers, not to a lenient default.
- **topFix-05** — rewrite practice to IAL levels-based mark schemes (2/4/8/10-12/20 marks) anchored to a
  short international case-study extract; replace the shareholders/stakeholders 20-marker with an
  external-influences one. Consistent with PROTOCOL.md's canonical table: **Business Units 1 and 2 are
  entirely source-based** (A and B are "source-based short and extended response," C is "one 20-mark essay
  from sources") — confirms `practice-01`'s complaint that p3 has "no case-study context although all IAL
  20-markers are data-response."

### accuracy (4)
- **accuracy-01, -02** (UK-GCE framing; Consumer Rights Act claim) — spec-checked clean: zero hits for any
  UK statute name in `bus_spec.txt` (see topFix-02 above).
- **accuracy-03** ("Porter's Five Forces is not in the Edexcel IAL Business specification (Unit 2 or
  elsewhere)"). **Spec-checked and the "or elsewhere" clause is false.** `grep -ni porter
  audit/raw/bus_spec.txt` returns four hits: `3.3.1 Business objectives and strategy` (Unit 3, item
  "4 Impact of external influences … c) Porter's five forces", `:1099-1110`) and `4.3.2 Global markets and
  business expansion` (Unit 4, item "2b) Application of Porter's five forces in assessing potential
  markets", `:1390`). **Porter's Five Forces IS examinable IAL Business content — just not in this
  section's own leaf (2.3.5, Unit 2).** This is the same inverted-ownership shape DECISIONS.md records for
  packet 38's "automatic stabilisers" (`:2577-2610`): removing it from THIS section is right (2.3.5 does
  not examine it), but the item's own wording overstates the case, and whoever builds this packet should
  decide, as packet 38 did, whether it needs a one-line pointer exemption naming where it IS taught (Unit
  3 / Unit 4) rather than treating it as simply wrong. Not this brief's call.
- **accuracy-04** (cost-push/demand-pull is an Economics distinction) — spec-checked clean, see topFix-03.

### quiz (2 open: quiz-02, quiz-03) / practice (1: practice-01)
No spec check needed — these are item-construction defects (a defensible second answer; an "Evaluate"
MCQ stem; a 20-mark item from the wrong topic, wired to no block). Counted against the live bundle in §3.

### structure (9)
All nine are claims about the *shipped* bundle's shape (wiring, difficulty order, block boundaries,
takeaways, misconceptions, duplicate flow text), not about spec scope. `structure-01` through `-03` are
independently confirmed by the direct reads in §3. `structure-06`, `structure-07` are corroborated by the
spec check above (block 1 does bundle three spec sub-items; the market-structure taxonomy in block 4's
takeaways is confirmed off-spec). `structure-08` (misconceptions genuine vs. filler) references the
6-entry `common_mistakes` array read in §3 — worth checking that the "filler/moralising" ones it names
aren't simply in a different field than the ones it calls genuine; I did not trace each phrase to its
field, only confirmed the array's existence and length.

### specGap (8) — candidates against §2's spec text, not a to-do list
- **specGap-01** (government spending) — matches `missingItems[0]` verbatim ("Economic influences:
  government spending") and spec bullet 1a. Clean.
- **specGap-02** (economic uncertainty) — **not a named 2.3.5 bullet.** "uncertainty" appears in
  `bus_spec.txt` only under Unit 3 (`:518` "risk and uncertainty", `:769` "Anticipating risk and
  uncertainty in the business environment") and Unit 4 (`:1416` "Global expansion and uncertainty").
  Neither is 2.3.5. Not in `spec-coverage.json`'s `missingItems`/`thinItems` for this section either.
  **Check before authoring new content for this — it may belong to a different unit's leaf**, the same
  class of error Rule 1 and the packet-38 DECISIONS entry both warn about.
- **specGap-03** (environmental protection) — matches `missingItems[1]` and spec bullet 2a. Clean.
- **specGap-04** (competition law) — the spec's own term is **"competition policy"** (`bus_spec.txt:1024`,
  also `spec-coverage.json`'s `thinItems`), not "competition law." Same underlying leaf, wrong label in the
  ledger item's own text — use the spec's term when authoring. Live bundle currently uses "CMA" /
  "Competition and Markets Authority" framing (§ topFix-02), consistent with this gap being real.
- **specGap-05** (health and safety, "absent entirely — content, quiz, practice, flashcards"). **Overstated
  by both the live bundle and `spec-coverage.json`'s own classification.** `grep -oi "health and safety"
  audit/content-sections/business__external-influences.json | wc -l` → 1, not 0: it appears once, inside
  the "Employment law" note item's body text ("… discrimination, health and safety, and unfair dismissal
  …", `notes[3].blocks[0].items[1].text`) — a sub-clause of employee protection, not its own treatment.
  `spec-coverage.json` itself classifies this same requirement as **thin** ("named … without being
  taught"), not missing. The underlying gap is real either way (no standalone teaching of health-and-safety
  legislation's effects on a business), but "absent entirely" is not the accurate frame — correct it to
  "named once, in passing, inside a different leaf's note; never taught as its own effect."
- **specGap-06** (market size: value/volume, growth, saturation). **Does not match the spec wording.**
  Spec bullet 3a names competitor "numbers / size / behaviour" — the size of the **competitors**, not the
  size of the **market**. "Saturated markets" is a real spec phrase but sits under `4.3.2` (Unit 4, item
  "1a) Push factors: saturated markets, competition", `:1373-1375`), a different unit. Not in
  `spec-coverage.json`'s lists for this section. **This looks like scope creep and should be checked
  against the spec, not authored, before this packet builds it** — exactly the shape Rule 1 warns about,
  just in the "add something the spec doesn't ask for" direction rather than "delete something it does."
- **specGap-07** (effects of a changing competitive environment: new entrants, price wars, mergers,
  disruptive substitutes; typical responses). Reasonable reading of spec bullet 3a's "numbers / behaviour,"
  but worth flagging: "new entrants" and "disruptive substitutes" are literally two of Porter's five
  forces' own categories. Authoring this without naming Porter is legitimate (the underlying business
  ideas aren't exclusive to that framework), but the builder should not simply re-import the banned
  five-forces structure under different labels.
- **specGap-08** (numbering uncertainty) — **resolved**, see §2. `bus_spec.txt:1009` and
  `spec-coverage.json` both confirm `2.3.5`. No action needed beyond citing the line.

### specThin (3: patents, copyright, trademarks — "named but never defined or explained; a student could
not answer an exam question from it")
**Needs a precision check before acting.** All three terms ARE defined with real content in the live
bundle — just not in the main notes/content body:
- `flashcards[8]`: front "What is the difference between a patent and a trademark?", back "A **patent**
  protects new inventions for up to 20 years. A **trademark** protects brand names, logos, and slogans."
- `quiz[3].explanation`: "A patent protects new inventions for up to 20 years, giving the inventor
  exclusive rights to make, use, or sell the invention. Copyright protects crea[tive works] …"
- `common_mistakes[2]`: "**Patents** protect inventions (up to 20 years). **Copyright** protects creative
  works (books, music, software). **Trademarks** protect brand identifiers (names, logos, slogans)."

None of this is in `content[]`/`notes[]` — a student reading Learn Mode's taught notes would not meet
these definitions there; they surface only in a flashcard, a quiz-wrong-answer explanation, or a
mistake-correction aside. Whether that counts as "taught" for `specThin`'s purpose, or whether copyright
specifically (never defined anywhere but the two-line common_mistakes correction — patent and trademark
each get their own flashcard/quiz treatment, copyright does not) needs its own subsection, is a judgment
call for whoever builds this. Flagging the exact locations rather than asserting a verdict either way.

## 5. What "done" means, at the level this brief can state it

Per `topFix-01`–`05` and `audit/CONTENT-GATE.md`'s per-section checklist (`:234-267`): every block's
`quizIndices`/`practiceIndices` point at questions about that block's own content; no UK statute, NICs,
Bank of England or CMA name survives (`locale.uk`/`locale.institution` rules, CONTENT-GATE `:236-238`);
every 2.3.5 spec bullet in §2 is taught in the main content, not only in a flashcard or quiz explanation;
the recall contract (`reorder`/`fillin`/`match`/`classify`, CONTENT-GATE `:196-224`) is used at least once
each place `topFix-04` names, with a `why` on every item; at least one diagram exists where none does
today; practice items follow IAL's source-based, levels-marked format (PROTOCOL's Business-1/2 table row);
Porter's Five Forces and the perfect-competition→monopoly taxonomy are removed from THIS section's taught
content (with the accuracy-03 "or elsewhere" correction from §4 applied, not the item's literal wording);
`specGap-02` and `specGap-06` are checked against `bus_spec.txt` before being authored, not assumed; and
the section clears `audit/CONTENT-GATE.md`'s checklist item 7 (baseline shrinks, not grows) plus the
`recalls`/`exposure` gates PROTOCOL.md names, none of which this brief has run.

## 6. Escalation

**No contradiction here rises to a founder decision.** The PROGRESS.md/ledger count mismatch (§1) is
resolved by PROTOCOL.md's own stated rule (ledger is canonical) and is a stale, never-updated table cell
for an unstarted packet, not two authorities asserting different facts about the same measured thing. The
missing `## Packet 41 spec` heading (§0) is the task's own premise being ahead of the file, not a
disagreement between documents. The accuracy-03 / specGap-02 / specGap-06 / specGap-05 items (§4) are
exactly the "check before acting" class Rule 1 asks for, not a case where two documents disagree —
returning them here as candidates to verify, as instructed, rather than as a to-do list.
