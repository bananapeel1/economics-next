# Packet 50 brief — business__managing-change (IAL 3.3.6)

**This is a BRIEF. It contains no measurements, no build results, no verification claims.** Anything below
that looks like a claim from an audit item is quoted/paraphrased as a CLAIM TO CHECK, not a fact. Nothing was
authored, staged or changed to produce this file.

## 0. Documents read and how scope was established

- `audit/PROTOCOL.md` (full, 155 lines) and `audit/SESSION-PROMPT.md` (full, 82 lines): the packet task's "six
  rules" match SESSION-PROMPT.md's six rules verbatim in substance. No contradiction between them.
- `audit/NEXT.md` (10,866 lines): `grep -in "packet 50" audit/NEXT.md` → **0 hits**. No `## Packet 50 spec`
  heading anywhere. The newest `## Handoff` heading in the file is "packet 45 (labour-markets) closed, gate
  passed" (bookkeeping pass, 26 Sep) — it is the last section in the file (runs to EOF). It names packets 46
  (has a full build already, PROGRESS row stale), 47 (in progress, Verify A not closed), 48 (free) and 49
  (untouched) as the candidates after 45. **It does not mention packet 50 at all.** This is the same shape of
  gap packets 41, 44 and 45 each hit and each recorded as "not a contradiction; a missing document" — per
  PROTOCOL's own invariant, "the ledger is the definition of coverage," not NEXT.md. Proceeding on that
  precedent rather than treating the silence as a stop-worthy contradiction; noted under §5 below rather than
  silently resolved.
- `audit/PROGRESS.md`, row 50 (line 103, read directly): `| 50 | managing-change | 9 | not started | | | |`.
  Consistent with the ledger (all 27 ids open, 0 claimed, §2 below). Table-header note: the header row printed
  above this block of rows (line 93) has six columns (`# | Packet | Status | Commit | Snapshot | Validator`)
  but every data row in the block, including row 50, carries seven fields — an unlabeled number between the
  section name and the status prose (`managing-change | 9 | not started`). Not this packet's job to fix, but
  worth a count on the record: the header does not name what the "9" is.
- `audit/DECISIONS.md`, the Settled list (lines 13–964, read in full): no entry names `managing-change` or
  `3.3.6`. Two entries are the direct precedent for how to treat this packet's ledger items: "a ledger item
  that calls material off-spec is checked against the specification text before it is acted on" (packet 14,
  14 Sep) and "five more ledger claims the specification refutes, and one it redirects" (packet 16, 15 Sep) —
  both are the same defect class found below in §3/§4.
- `audit/SPEC-OWNERSHIP.md` (103 lines, read in full): no row names managing-change, 3.3.6, Kotter, Lewin or
  contingency planning. None of this section's required content is claimed by another section, and this
  section does not appear as a "was also taught in" column for anyone else's row.
- `audit/CONTENT-GATE.md`'s recall contract (lines 196–232, read directly): four recall types — `reorder`
  (genuine sequence only), `fillin` (term/number, 2-3 distractors + semantic hints), `match` (pairs + why),
  `classify` (2-3 groups). Relevant to topFix-04's ask for a reorder and a fillin (§3).
- `audit/raw/bus_spec.txt`: read directly around the cited line and independently re-confirmed the section
  span with `grep -n "3.3.6\|^Unit 4"` (heading at `:1255`; the file's only other "Unit 4" heading is at
  `:422`, an unrelated earlier duplicate page — the next content after 3.3.6 is the Unit 4 divider around
  `:1272-1284`, i.e. 3.3.6 is the last topic in Unit 3). Also ran a whole-file (not section-scoped) grep for
  four terms this packet's ledger repeats: `Kotter`, `Schlesinger`, `Lewin`, `force field` — **0 hits each,
  anywhere in bus_spec.txt.** `contingency` occurs exactly once, at `:1265`, the heading itself.
- `audit/raw/spec-coverage.json`: `bySection` is a 43-entry array; index 12 has `key: "business__managing-change"`,
  `subject: "business"`, `number: "3.3.6"`, `title: "Managing Change"` — confirms the task's section id and
  number independently of the ledger. Saved to `audit/runs/packet-50/spec-coverage-managing-change.json`.
- `audit/SPEC-COVERAGE.md` (the narrative doc, not the data file): names "contingency planning in Business
  3.3.6" explicitly as one of "Seven topics quiz students on content the notes never teach" (its §"Two things
  that are cheap and live now"), and states its own error rate — "23 of 197 claims were overturned (12%)" —
  matching the task text's "about one in eight." Minor doc/data mismatch: this narrative doc describes a
  `requirements[].evidence` field ("gives the quotation or the failed search"); the actual `spec-coverage.json`
  object for this section has no `requirements` key at all, only `missingItems`/`thinItems` (flat string
  arrays, no evidence field) — a schema note, not a scope contradiction.

## 1. The spec, as written

Section 3.3.6 is short: two numbered items, five lettered sub-points under the first, two lettered sub-points
(with bulleted examples) under the second. One direct quote, the heading itself (`audit/raw/bus_spec.txt:1255`,
Pearson Edexcel Business specification, Issue 1, September 2017): **"3.3.6 Manging change"** — that spelling
(missing the first "a") is the specification's own, not a transcription slip introduced here.

Paraphrased, not quoted, the rest of the section (`:1259–1271`):

1. **Key factors in change** — five points: (a) organisational culture; (b) size of organisation; (c)
   time/speed of change; (d) managing resistance to change; (e) transformative leadership.
2. **Contingency planning** — two points: (a) identifying key risks through risk assessment, naming three
   risk types (natural disaster, IT systems failure, loss of key staff); (b) planning for risk mitigation,
   naming two responses (business continuity, succession planning).

Nothing else is in the section. In particular, none of these appear anywhere in the file: a named change
model or framework (Kotter, Lewin, Kotter & Schlesinger), the phrase "causes of change," a list of "effects of
change" on competitiveness/productivity/financial performance/stakeholders, or "costs and benefits of
contingency planning."

## 2. spec-coverage.json's own count for this section (number 3.3.6)

`covered: 1`, `thin: 4`, `missing: 6` (11 leaves total), `worksheetReady: false`.

- **thin (4):** (1a) organisational culture; (1c) time/speed of change; (1e) transformative leadership;
  (2a) identifying key risks through risk assessment (the heading, as distinct from its three named risks).
- **missing (6):** (1b) size of organisation; the three named risks under (2a) — natural disasters, IT
  systems failure, loss of key staff — counted as separate leaves; the two named responses under (2b) —
  business continuity, succession planning.
- **covered, by elimination against the two lists above (1 leaf):** (1d) managing resistance to change. This
  matches several ledger items below describing a "Managing Resistance" block that already exists in the
  live content.

This is data from a prior audit (`audit/SPEC-COVERAGE.md`'s own stated 12% overturn rate applies to it, not
0%) — a candidate to check against the wording in §1, not a ready-made to-do list, per the task brief.

## 3. The 27 ledger ids (`node audit/scripts/ledger.mjs packet 50`, all 27 status `open`, 0 claimed)

Every `topFix`/`accuracy`/`specGap` id already carries the programme's own "SPEC NUMBERING" note in
`audit/ledger.json` saying it cites UK GCE numbers (3.6.1/3.6.2/3.6.3) that do not exist in the IAL spec and
that the real topic is 3.3.6 — i.e., rule 1's caution is already flagged at the data layer for this section.
What follows adds a wording-level check against §1, which the existing note does not do.

**topFix (5) — what to build**
- `topFix-01`: rewrite the drivers/scenario-planning material to teach risk assessment → mitigation → "costs
  vs benefits of contingency planning." **The first two steps match §1 item 2 (a)/(b). "Costs vs benefits" is
  not in §1 at all** — 0 hits for "cost" or "benefit" near `:1265` and nowhere else does "contingency" occur.
  Check before building it in: candidate for the same disposition as specGap-06 below.
- `topFix-02`: add a block on "effects of change" (competitiveness, productivity, financial performance,
  stakeholders) and "key factors in successful change" (culture, size, speed, transformational leadership)
  plus "Kotter & Schlesinger's six strategies." **"Effects of change" and the named K&S strategies are not in
  §1**; culture/size/speed/leadership are (1a/b/c/e). A rebuild that teaches 1a/b/c/e closes real gaps; the
  "effects of change" framing and K&S as a named, examinable model do not have textual support in `bus_spec.txt`.
- `topFix-03`: fix a disruptive/step-change conflation (rename to incremental vs step/transformational change;
  treat disruption as external; reword an examMatters line telling firms to "use disruptive change"). No spec
  number cited; this is a content-accuracy fix inside whichever block ends up teaching types of change — types
  of change is not itself a lettered point in §1, so this content sits outside the 11 counted leaves (it may
  still be legitimate scaffolding for the required material, a scope call for Build).
- `topFix-04`: add a reorder recall for "Kotter's 8 steps," a fillin for "Lewin's driving/restraining forces,"
  and a force-field InlineDiagram, because `managing-change-models > examMatters` already tells students to
  "draw Lewin's force field diagram." **Kotter and Lewin are 0-hit terms in the whole spec file (§0).** The
  underlying spec point these would illustrate is (1d) "managing resistance to change" — already the one
  COVERED leaf per §2 — so this is a request to add exercises for named models the spec does not require, in
  service of a point that spec-coverage.json already scores as taught. A scope call, not a spec gap to fill.
- `topFix-05`: bring practice questions to "IAL form" (one-reason 4-markers, an 8-mark Assess, anchor stems to
  a bank/insurance company, replace an off-spec crisis-management question). No spec-wording issue; this is an
  assessment-format/command-word fix, checkable against `command_words.json`/Appendix 6 rather than `bus_spec.txt`.

**accuracy (2)**
- `accuracy-01`: the incremental-vs-disruptive examMatters line tells a firm to "use disruptive change," which
  contradicts the body's own definition of disruptive change as something done TO a firm by outsiders
  (Christensen), and three different vocabularies (disruptive / step / transformational) are used across
  content, notes and flashcards for what should be one concept. Internal consistency issue; not itself a §1
  wording match, but real regardless (a single concept needs one name across every surface).
- `accuracy-02`: "scenario planning" is currently taught as Shell-style strategic foresight (2-4 futures,
  best/worst/wildcard); **§1 item 2's actual meaning of this territory is risk assessment + risk mitigation
  (natural disaster/IT failure/staff loss; business continuity/succession planning), not strategic-foresight
  scenario building.** This is the one finding in the whole ledger that is fully grounded in the current spec
  wording without relying on a UK-GCE number: the section's own quiz/flashcards/practice already test the
  spec meaning while the taught content teaches something else. High-confidence, not a candidate to overturn.

**quiz (2)**
- `quiz-01`: q2 tests "Kotter & Schlesinger's six strategies," never taught in content[] (content teaches
  Kotter's 8-step model, a different Kotter framework). Content/assessment mismatch is real regardless of
  whether K&S is spec-required (§0: it is not).
- `quiz-02`: q5's stem and distractors are internally incoherent ("inadequate business continuity planning" as
  a "risk," "MOST significant" with no case) and tests business continuity planning, which (§2) is one of the
  6 MISSING leaves — content/assessment mismatch, same class as structure-01.

**structure (11)** — mostly content/assessment-alignment and internal-consistency findings, not themselves
spec-number claims (three exceptions noted):
- `structure-01`: 8 of 10 quiz MCQs and 1 practice item test material (Handy cultures, K&S, transformational
  leadership, succession planning, business continuity, org size, contingency-planning costs) the current
  content blocks never teach; PreTest/PostTest data is described as noise as a result. Cuts across §2's
  missing/thin leaves plus the non-spec K&S/Handy material — a rebuild that teaches §1's actual 11 leaves will
  close the spec-grounded half of this; the K&S/Handy half is the same scope call as topFix-02/quiz-01.
- `structure-02`: zero `reorder`/`fillin` recall widgets; Kotter's 8 steps and Lewin's forces suggested as the
  fix, same 0-hit caveat as topFix-04. The finding "zero retrieval practice beyond one MCQ per block" is
  checkable independently of which content ends up carrying the recalls.
- `structure-03`: zero diagrams, yet an examMatters line instructs "draw Lewin's force field diagram" with no
  diagram present. Internally inconsistent regardless of Lewin's spec status: either add the diagram or drop
  the instruction telling students to draw one.
- `structure-04`: proposes a 4-block restructure — "Causes and types of change / Effects and key factors /
  Managing resistance / Scenario-contingency planning" — carrying the ledger's own "SPEC NUMBERING" caution
  (cites 3.6.1/3.6.3). **§1 has exactly two numbered headings, not four** ("Key factors in change,"
  "Contingency planning"); "causes of change" and "effects of change" as separate headings are not in
  `bus_spec.txt`. A rebuild could still use more than two Learn-Mode blocks for teachability (other rebuilt
  sections in this programme have expanded a short spec into more subsections), but the specific 4-block
  frame this item proposes imports headings the current IAL spec does not have.
- `structure-05`: a realExample (Toyota kaizen) is misplaced under drivers/scenario-planning rather than under
  incremental change; scenario planning has no example. Placement/example-fit issue, independent of spec wording.
- `structure-06`: both "Managing Resistance" sections reuse the same Microsoft/Nadella example. Duplication
  issue, independent of spec wording.
- `structure-07`: block 1's title ("Types of Change") doesn't describe its own second section (drivers +
  scenario planning); block 2's title/takeaways are said to match. Titling/IA issue.
- `structure-08`: blocks carry no `quizIndices`/`practiceIndices`, so InlineQuiz/InlinePractice at each Learn
  step cannot be aligned to what that step taught. Same root cause as structure-01/quiz-01/quiz-02: no
  block-to-assessment pinning yet exists for this section (cf. packet 2.9's per-block pinning pattern used
  elsewhere in this programme, `audit/PROGRESS.md` row 21).
- `structure-09`: four different labels for what should be one type-of-change concept across
  content/notes/flashcards/quiz-explanation ("disruptive," "Disruptive (step)," "transformational,"
  "evolutionary"). Same underlying issue as accuracy-01, restated as a cross-surface terminology audit.
- `structure-10`: two misconceptions judged genuine (scenario-planning-vs-forecasting, resistance-as-signal);
  three judged weak/filler ("disruptive change is always better," "Kotter's 8 steps are rigid and linear,"
  "all change is equally difficult"). Content-quality judgement call, not a spec-wording question.
- `structure-11`: claims `meta.number` is stored as `'3.3.6'` while "the IAL spec heading is 3.6 Managing
  change," unsure if the app deliberately prefixes a unit number. **Checked directly against `bus_spec.txt:1255`:
  the spec's own heading reads "3.3.6," not "3.6"** — every other topic heading in the same unit follows the
  same three-level pattern (e.g. `3.3.1 Business objectives and strategy` at `:1090`). The premise of this
  item (that "3.6" is the correct number and "3.3.6" is a suspicious prefix) does not match the spec text as
  read. Strong candidate to be overturned once the stored `meta.number` literal is actually inspected —
  flagging as a claim to check, not asserting the DB field is fine, since this pass did not read the DB.

**specGap (7)** — the closest thing to a to-do list, and where the wording check matters most:
- `specGap-01` ("Causes of change": org-size changes, poor performance, new ownership, transformational
  leadership, market/external factors) — **only the org-size and leadership pieces have any counterpart in
  §1** (1b, 1e). "Poor business performance," "new ownership" and "market and other external factors" as a
  named causes-of-change list do not appear in `bus_spec.txt` at all. Partially grounded, partially not.
- `specGap-02` ("effects of change on competitiveness, productivity, financial performance, stakeholders") —
  **0 match in §1 or anywhere else in `bus_spec.txt`.** Candidate to overturn or reclassify as non-spec
  enrichment, same caveat as topFix-02's "effects of change" clause.
- `specGap-03` ("3.6.2 Key factors in successful change": culture, size, speed; "managing resistance...is
  covered but Kotter & Schlesinger's six strategies...are not taught") — **culture/size/speed match 1a/b/c
  exactly**; the K&S clause is the 0-hit non-spec addition already flagged three times above (topFix-02,
  topFix-04, quiz-01, structure-01).
- `specGap-04` (risk assessment: natural disasters, IT failure, loss of key staff, "absent from content[]") —
  **matches §1 item 2(a) and its three named risks exactly**, and matches 3 of spec-coverage.json's 6 MISSING
  leaves (§2). Fully grounded.
- `specGap-05` (risk mitigation: business continuity, succession planning, "absent from content[]") — **matches
  §1 item 2(b) exactly**, and the other 2 of the 6 MISSING leaves. Fully grounded.
- `specGap-06` ("3.6.3c Costs and benefits of contingency planning") — **no match anywhere in `bus_spec.txt`.**
  Same non-spec content as topFix-01's third clause. Strong overturn candidate; the section only teaches
  (a) risk assessment and (b) risk mitigation, no separate cost/benefit sub-point.
- `specGap-07`: this item's own `text` field is *only* the parenthetical caveat — "(Exact IAL bullet wording
  recalled from the 2018 WBS13 spec; wording confidence high, numbering of sub-bullets unsure.)" — with no
  actual requirement stated. As stored, it names no checkable claim. Worth a founder/maintainer note that this
  id may be a broken or truncated record rather than a live finding; not something this Brief can resolve by
  reading `bus_spec.txt` harder, since there is no requirement text to check it against.

## 4. What "done" would mean, by group (candidate acceptance shape, not a build plan)

- **The 11 spec-coverage.json leaves (§2), reworded against §1's actual text:** every one of 1a/b/c/e and
  2a/2b's five named risks/responses taught in the notes (not only flashcards/quiz), each traceable to its
  lettered point in `bus_spec.txt:1259-1271`. `specGap-04`/`05` and the size/culture/speed/leadership parts of
  `specGap-01`/`03` map straight onto this. This is the part of the packet with no scope ambiguity.
- **The non-spec-grounded material** (Kotter's 8 steps, Kotter & Schlesinger, Lewin/force-field, "effects of
  change," "causes of change," "costs and benefits of contingency planning"): a scope decision, not a spec
  gap — per the DECISIONS.md precedent (packet 14/16), an item that names material the spec text does not
  contain is checked before being acted on, and either (a) kept as illustrative/pedagogical content that
  teaches a real leaf (chiefly 1d, "managing resistance to change," and item 2's two headings) without being
  presented as separately spec-required, or (b) trimmed if it is crowding out the fully-grounded leaves above.
  Not this Brief's call.
- **Content/assessment alignment** (`structure-01/02/08`, `quiz-01/02`): once the notes actually teach the
  material a quiz/practice item tests, per-block `quizIndices`/`practiceIndices` pinning (the pattern already
  used elsewhere in this programme, e.g. packet 2.9/45) removes the current mismatch; a verifier can check
  this by reading each block's pinned indices against what that block's notes teach, the same method packet
  45's Verify A used for `resolvePinnedItem`.
- **Internal consistency** (`accuracy-01`, `structure-06/07/09/10`, part of `topFix-03`): one name per concept
  across content/notes/flashcards/quiz-explanation; no duplicate examples across sections; a diagram wherever
  an examMatters line tells the student to draw one, or the line removed.
- **`structure-11`**: read the actual stored `meta.number` (or equivalent field) for this section and compare
  it to the spec heading `"3.3.6"` confirmed in §1 — not to the "3.6" this item asserts.
- **`specGap-06`, the "costs vs benefits" clause of `topFix-01`, `specGap-02`, most of `specGap-01`**: check
  against `bus_spec.txt` (done, in §1/§3) before writing any content for them; on the wording found here they
  look like candidates to overturn or explicitly scope as non-required enrichment rather than to build as gaps.
- **`specGap-07`**: not actionable as stored (§3); flag rather than build against it.

## 5. Contradictions and things that look off (per the task's instruction to say so, not to pick one)

No disagreement was found between `audit/PROTOCOL.md`, `audit/SESSION-PROMPT.md`, the Settled list in
`audit/DECISIONS.md`, `audit/SPEC-OWNERSHIP.md` and `audit/CONTENT-GATE.md` regarding this packet's scope or
process. Three things worth recording rather than silently working around, none of which rises to a
founder-decision contradiction between authorities:

1. **No `## Packet 50 spec` heading and no Handoff naming packet 50 anywhere in `audit/NEXT.md`** (§0). Same
   gap packets 41/44/45 hit; PROTOCOL's own "the ledger is the definition of coverage" rule resolves it, per
   three prior packets' own recorded precedent, so this Brief proceeds on the ledger (27 open ids, §3) rather
   than treating the silence as a stop condition.
2. **`audit/PROGRESS.md`'s table header for this block of rows does not name the column that holds "9" for
   packet 50** (§0) — a documentation gap in the file itself, not a scope or process contradiction, and not
   fixed here (out of this packet's mandate, and the file may be shared with other sessions right now).
3. **Roughly half of this section's 27 ledger ids lean on wording that does not appear in `audit/raw/bus_spec.txt`**
   — Kotter, Kotter & Schlesinger, Lewin/force-field, "causes of change," "effects of change," and "costs and
   benefits of contingency planning" are all 0-hit searches against the spec file (§0/§3). This is not a
   contradiction between handoff documents; it is exactly the rule-1 scope-check this packet's Brief exists to
   do, surfaced here as a high proportion (roughly half, by item, more than the programme's general 12%
   overturn rate for `spec-coverage.json`'s own claims) so the Build phase does not build UK-GCE-only content
   into an IAL-only spec section.

## 6. Counts, and how they were produced (commands shown, not asserted)

- `node audit/scripts/ledger.mjs packet 50` → 27 items, all listed in §3, all `status: open`, all
  `closed_by: null` (output saved: `audit/runs/packet-50/ledger-packet-50.txt`).
- `node audit/scripts/ledger.mjs packet 50 --open` → same 27 (output saved:
  `audit/runs/packet-50/ledger-packet-50-open.txt`) — 0 items already claimed/closed for this packet.
- `grep -n "3.3.6\|^Unit 4" audit/raw/bus_spec.txt` → heading at `:1255`; next relevant divider `:1272-1284`.
- `grep -in -c` for `Kotter`, `Schlesinger`, `Lewin`, "force field" against the whole of `audit/raw/bus_spec.txt`
  → 0 each. `contingency` → 1 hit, at `:1265`.
- `audit/raw/spec-coverage.json`, `bySection[12]`: `covered=1, thin=4, missing=6` (11 leaves), saved to
  `audit/runs/packet-50/spec-coverage-managing-change.json`.
- `grep -in "packet 50" audit/NEXT.md` → 0 hits.
