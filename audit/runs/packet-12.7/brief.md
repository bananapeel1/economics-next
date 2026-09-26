# Packet 12.7 brief — work list only, no results, no measurements

Authoritative spec: `audit/specs/packet-12.7.md` (rewritten 25 Sep 2026, read in full). Section:
`economics__market-failure` (Economics 1.3.5 Market Failure). This document is a work list. It
contains no build result, no test outcome, no walkthrough claim, and no confirmation of anything —
those belong to Gate / Verify A / Verify B, which run after this brief.

## Required reads, cross-checked — no contradiction found

- `audit/PROTOCOL.md`, `audit/SESSION-PROMPT.md` — lifecycle and the six/five rules. Consistent with
  everything below.
- `audit/NEXT.md` — the `## Packet 12.7 spec — RESERVED` block (line 16) is a one-paragraph pointer
  that correctly defers to `audit/specs/packet-12.7.md` and matches it: same ledger ids (E039, E042,
  E043, E044), same wont-fix (E038), same "do not build the mode gate" note. The newest literal
  `## Handoff` heading in the file is "packet 12.6 closed, gate passed" (line 325, 22 Sep). It
  describes packet 12.7 in one clause as **"the v6 chrome: mode gate, question-navigation row, sticky
  bar, keyboard nav"** — this is stale, not a live contradiction: the spec file explains explicitly
  that an earlier version of 12.7 covered that chrome and it moved to packet 12.75 on 25 Sep, and the
  more recent `## Packet 12.7 spec — RESERVED` block two lines above it in the same file already
  carries the current one-line description. Flagging so the next reader doesn't act on the stale
  clause; not escalating.
- `audit/PROGRESS.md` — no row exists yet for packet 12.7 (only 2.8 and 12.6 rows are present).
  Consistent with the spec's own framing: this packet has not been built.
- `audit/DECISIONS.md` → Settled — the three founder rulings named by the task brief are present and
  line up with the spec:
  - **2026-09-25** — "Economics 1.3.5 practises the extract's own question set, not the bank's generic
    questions" — E038 wont-fix, superseded by E043/E044. Matches spec exactly.
  - **2026-09-22** — "packet 12.6 shipped a pilot whose extract its own answers do not use, and 12.7
    re-authors rather than grandfathers it" — this ruling's own text ("12.7 re-authors the application
    paragraphs... against the attached extract") is the OLDER approach and is superseded by the
    2026-09-25 entry directly above it, which says so explicitly. Not a live contradiction, but note
    it for whoever reads DECISIONS.md top-to-bottom without noticing the supersession.
  - **2026-09-22** — "a criterion-to-segment link carries a role" — this is E039, unchanged, still
    current.
- `audit/CONTENT-GATE.md` — read in full. The recall contract (reorder/fillin/match/classify,
  `section.recall`) governs Learn Mode recall widgets. Packet 12.7 touches the model-answers bank
  (`SectionModelAnswersPage.jsx`, `MarkedScriptAttempt.jsx`, `data/modelAnswers*.js`), a different
  content surface with no `recall.*` field on any item in scope — the recall contract does not appear
  to be implicated by this packet's four ledger ids. Flagged as a candidate to confirm, not asserted.
  The per-section edit-pass checklist item 6 (practice items must open with a scaffold, not a mark
  scheme) is written for `InlinePractice.jsx`'s guided mode, not the model-answers bank's
  criteria/script shape; whether it applies to the new bank items is worth a explicit check before
  claiming it out of scope.

**No contradiction among the required documents rises to the level this task's return schema asks to
escalate.** The one apparent disagreement (DECISIONS 2026-09-22 vs 2026-09-25 on E038) is an explicit,
dated supersession, stated in the later entry's own text, and the spec file agrees with the later one.

## Ledger — `node audit/scripts/ledger.mjs packet 12.7` / `--open`

```
E038  feature  wont-fix  (superseded by E043/E044, per DECISIONS 2026-09-25)
E039  feature  open      segRole earned|missed, validator R7, A/B-proved, distinct without colour
E042  feature  open      no regression; zerocov stays 0
E043  feature  open      extract's Define(2)/Analyse(6) join the bank in the criteria/script/stimulus shape
E044  feature  open      extract's Evaluate re-tariffed 10→20 in both places, genuine 20-mark exemplar
```
4 open, matches the spec's own list exactly (`node audit/scripts/ledger.mjs show <id>` for each
confirms `packet: 12.7`, `status: "open"`, no prior `closed_by`/`verified_by`/`evidence`).

## E043 — extract's Define (2) and Analyse (6) join the 1.3.5 bank

**Spec, quoted:** "Add two items to the Economics 1.3.5 bank (put them in
`data/modelAnswersExpansion.js` beside the existing 1.3.5 items... Both carry `criteria`, `script`
(segmented so every criterion resolves), `stimulus: 'econ-u1-market-failure'`, `minutes`, and every
existing field the other bank items carry... so no existing render path breaks. Tag `specItems`
against `audit/raw/spec-items.json` by wording... Then: remove `stimulus` from the three generic
1.3.5 items... Then delete the fix-round-B1 disclaimer... and replace it with one plain sentence."

**Located in code, for the author:**
- The 1.3.5 8-mark generic item (`negative-externality-tax-8`) is at
  `data/modelAnswersExpansion.js:155-278`; its `stimulus: 'econ-u1-market-failure'` line is at 276
  (spec said "around 276" — exact). The 20-mark generic item
  (`market-failure-government-intervention-20`) starts at 280, its `stimulus` line is at 419 (spec
  said "around 419" — exact). The 4-mark generic item is in `data/modelAnswersData.js`, block starting
  220, `stimulus` line 290 (spec said "around 290" — exact).
- The B1 disclaimer paragraph ("Read this first...") is `components/SectionModelAnswersPage.jsx:267-273`,
  inside `StimulusBlock`, preceded by a comment block (258-266) explaining why it exists — both need
  to go together.
- The existing 8-mark item's shape (criteria/script/annotationLegend/markScheme/etc, lines 156-278) is
  the concrete template "every existing field" refers to.
- `audit/raw/spec-items.json` has 43 items with an id starting `ECON-1.3.5` (counted by
  `python3 -c "import json; d=json.load(open('audit/raw/spec-items.json')); print(len([x for x in d['items'] if x['id'].startswith('ECON-1.3.5')]))"`
  → 43), spanning subtopics 1a through 6b-2, each with a `wording` field and a `source` line range
  into `audit/raw/econ_spec.txt`. **The spec's own prose says "1.3.5 has 63 oracle items" — this is
  wrong by direct count (43, not 63).** The "63" figure that does exist in the codebase is unrelated:
  it is the count of model-answer bank items across ALL subjects/sections that do NOT yet carry
  `criteria` (`components/SectionModelAnswersPage.jsx:505` and `components/MarkedScriptAttempt.jsx:8`
  both say "sixty-three items" in that other sense). Whoever tags E043's two new items should tag
  against the real 43-item ECON-1.3.5 oracle list by wording, not trust the spec's count.

**Page ordering — a real open question, not yet a contradiction:** the spec says the three extract
questions must render first (tariff order 2, 6, 20), then the three generic questions, and allows "the
smallest [component] change" if the page can't currently order them. Checked: `writtenFor()` in
`lib/model-answers-route.js:34-36` does `MODEL_ANSWERS.filter(...)` with no sort, and
`components/SectionModelAnswersPage.jsx:500` renders `written.map(...)` with no sort either. Render
order is therefore array order in `MODEL_ANSWERS`, which `data/modelAnswersData.js:1280` defines as
`[...BASE_ANSWERS, ...EXPANSION_ANSWERS]` — every item in `modelAnswersData.js` (BASE) precedes every
item in `modelAnswersExpansion.js` (EXPANSION), regardless of position within either file. The generic
4-mark item lives in `modelAnswersData.js` (BASE). If the two new extract items are added to
`modelAnswersExpansion.js` (EXPANSION) as the spec instructs, they land structurally AFTER the generic
4-mark item no matter where in the file they're inserted — the opposite of "extract questions first".
**Done for E043 includes resolving this**: either an explicit sort (e.g. by `stimulus` presence, then
by `marks`) in `writtenFor()`/the render path, or moving the generic 4-mark item, or another minimal
change — the spec anticipates needing one but does not name which.

**What "done" means:** two new items in `modelAnswersExpansion.js`, full field parity with the 8-mark
item's shape, `specItems` tagged by wording against the real 43-item oracle, three generic items lose
`stimulus`, B1 disclaimer paragraph + its comment replaced by one true sentence, and the page renders
extract-then-generic in tariff order — with the ordering mechanism identified above actually fixed,
not just the data added.

## E044 — Evaluate re-tariffed 10 → 20, in both places, to a genuine 20-mark standard

**Spec, quoted:** "Re-tariff it to 20 in: 1. `content/data-response/econ-u1-market-failure.md`... 2. A
new bank item, Evaluate 20 marks... A 10-mark answer relabelled as 20 is not a 20-mark exemplar.
Author the answer up to one: IAL 20-mark Evaluate is AO1 4 / AO2 4 / AO3 6 / AO4 6... Keep the same
answer in both places... Criteria sum to 20 on the 4/4/6/6 split."

**Located in code, for the author:**
- `content/data-response/econ-u1-market-failure.md` — Question 3 is currently headed "**Question 3 (10
  marks)**" (line 32) and its examiner note says "Level 4 (9–10)" (line 66), both need the rewrite to
  20. The existing Question 3 answer (lines 52-64) already contains: the 32% fall and PED −0.6 "for"
  point; USD 25bn / 12.3% diabetes prevalence "against" point; regressivity; alternative policies
  (reformulation, information provision); government failure; and a conditional judgement in the final
  paragraph — matching the spec's description of "the right skeleton" exactly.
- `lib/ial-marking.js:13-26` — `ECONOMICS.tariffs.Evaluate = [20]` is the only legal Evaluate tariff
  for Economics; 10 does not appear anywhere in the tariff table. Confirms the spec's "not a legal IAL
  Economics tariff" claim.
- No existing 4/4/6/6 AO-split criteria exist yet for this question in either file — this is new
  authoring, not a retrofit, and the spec says to hold it to examiner standard, not just "criteria sum
  to 20".

**What "done" means:** Question 3 reads 20 marks and "Level 4" band language matches a 20-mark
descriptor (not "9–10") in the md file; a new bank item exists (subject/sectionNumber/marks: 20,
commandWord: Evaluate) with `criteria` summing 4/4/6/6 across AO1-4 and a `script` every criterion
resolves to; the prose answer in the bank item and the md file's Question 3 answer are the same text,
each paragraph's assessment deepened (weighed, not listed) beyond the current 10-mark version, and the
regressivity point quantified from the extract's own table where the extract's figures allow it —
"invent none" per the spec.

## E039 — segRole on every criterion, validator R7, rendered without colour alone

**Spec, quoted:** "Add `segRole: 'earned' | 'missed'`, defaulting to `'earned'` when absent. Validator
rule R7: every criterion on a retrofitted item has a `segRole` that is one of the two literals. Set
`'missed'` on the generic 8-mark item's `c7` and `c8`, and on any 20-mark generic criterion whose
segment note says the script did not earn it... Render the two roles differently without relying on
colour... Prove R7 by A/B mutation into `audit/runs/packet-12.7/validator-ab.md`, as 12.6 did for
R1/R2/R4."

**Located in code, for the author:**
- `audit/scripts/validate-model-answers.mjs` implements R1, R2, R3, R4, R5, R6 (documented in its
  header comment, lines 17-29); no R7 exists yet.
- The 8-mark item's `criteria` array (`data/modelAnswersExpansion.js:228-237`) has no `segRole` field
  on any of its 8 entries today. Its own comment block (212-227) already explains, in prose, that `c7`
  and `c8` are the two Level-4 marks pointing at script segments where the assessment "BELONGS and is
  not made" — this is exactly the DECISIONS 2026-09-22 ruling and exactly what E039 asks `segRole:
  'missed'` to encode structurally instead of only in a comment.
- The 20-mark generic item (`likelyScore: '18–20 / 20'`, full marks) has no segment note in its script
  (checked lines 280-420ish) reading as "should have been" / "stops here" the way the 8-mark item's
  `p4a`/`p4b` notes do — consistent with the spec's expectation that this item's criteria are all
  `'earned'`, not `'missed'`.
- `components/MarkedScriptAttempt.jsx` (211 lines) is where criteria and script segments render
  (`lab-criteria`, `lab-criterion`, `lab-script-seg` classes, lines ~145-205); no `earned`/`missed`
  label or distinct line style exists yet — this is net-new rendering, not a retrofit of an existing
  toggle.
- Precedent for the A/B proof method: `audit/runs/packet-12.6/{validator-ab.md,mutate-ab.sh,ab-r1-*,
  ab-r2-*,ab-r4-*}` — R7's proof should follow the same mutate/revert-against-`npm run validate` shape.

**What "done" means:** `segRole` present (or correctly defaulted) on every criterion of every item that
carries `criteria` (today: the three 1.3.5 items, soon five with E043); R7 added to the validator and
wired into `npm run validate`; the 8-mark item's `c7`/`c8` explicitly `'missed'`; the two new E043 items
and the 20-mark generic item's criteria explicitly (or by default) `'earned'`; the render distinguishes
the two roles by a label plus a line style, not colour alone; R7 proved by mutate/revert into
`audit/runs/packet-12.7/validator-ab.md`.

## E042 — nothing else moved

**Spec, quoted:** "The other 31 section pages render identically to HEAD. 1.3.5 still persists a draft
and ticks across reload for every question on it, including the three new ones. Prove both by a method
different from the one that produced the change. `npm run spec-coverage`'s `zerocov` rule must stay at
0."

**Located in code, for the author:** `data/modelAnswerPages.js` defines 32 pages total (`slug:` occurs
32 times) — 31 others + 1.3.5 matches. `MarkedScriptAttempt.jsx`'s persistence is `localStorage`, keyed
per-question by `storageKey(questionId)` (lines 30-58) — the two new E043 items and the re-tariffed
E044 item need stable, unique `id`s for this to extend to them with no extra code change; nothing in
the component special-cases which items get a key.

**What "done" means:** a regression check on the other 31 pages, and a reload check on all six 1.3.5
questions' draft+ticks, each performed by a method different from whatever produced E039/E043/E044 (per
"VERIFY INDEPENDENTLY" in the session brief) — this is Verify A/B's job, not this brief's. `npm run
spec-coverage`'s `zerocov` figure is this packet's own regression gate to re-check, not something to
assert a value for here.

## Out of scope, restated from the spec (do not build)

- E040/E041 — mode gate, question navigation, sticky bar, keyboard nav — moved to packet 12.75, blocked
  on the founder's new visual design. The stale `NEXT.md` handoff clause naming this as 12.7's job
  (see above) must not be acted on.
- Any restyling.
- The other five `content/data-response/` files and their 10-mark questions — packet 12.9.
- Server-side draft persistence; any publish or live database write (rule 6) — E039/E043/E044 above are
  all in-repo/staged work, nothing here calls for a live write.

## Commit hygiene reminder (not this session's job either)

Per the spec's own "Notes for the author" and PROTOCOL rule 5: this worktree's git index is shared and
written by other sessions. This brief stages and commits nothing; `git status --short` at the top of
this session showed pre-existing staged/modified files from other sessions' work (e.g. `audit/NEXT.md`,
`audit/DECISIONS.md`, `audit/PROGRESS.md`, `audit/ledger.json` all show as modified in the working
tree) — none of that was touched to produce this brief, and none of it should be attributed to packet
12.7.
