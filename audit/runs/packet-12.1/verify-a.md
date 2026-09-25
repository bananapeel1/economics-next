# Verify A — packet 12.1, re-verification after fix round B1

Read-only adversarial pass, second round. Inputs: `node audit/scripts/ledger.mjs unverified 12.1`
(which reported *gate clear*, i.e. every id already carried a round-1 confirm — so nothing in this
round was taken from that status), `git diff`, `git diff --cached`, `audit/runs/packet-12.1/brief.md`,
and the working tree itself. **`built.md` was not read.** Neither was `verify-b.md`, so the round-1
verifier's walkthrough could not become this round's evidence.

E004 and E006 were re-checked from the diff and the live files, not from any claim about them.

## Method, chosen to avoid the fix's blind spot

Every number below was produced by a route the fix does not use:

- **Data facts** (E001, E004, E005) were read by *importing* `data/modelAnswersData.js` in node and
  walking `MODEL_ANSWERS`, rather than by grepping the source text the rewrite scripts edited. A
  regex that matched what the script wrote would have shared its blind spot; an import sees the
  values the app sees, including anything a malformed literal would have broken.
- **Command words and tariffs** were checked against the specification text itself —
  `audit/raw/econ_spec.txt:2715-2745`, `audit/raw/bus_spec.txt:2225-2250` — not against
  `lib/ial-marking.js` (what the code imports) and not against `audit/raw/tariff-census.json` (what
  the rewrite read).
- **The coverage guard's three failure rules** were exercised on six fixtures I wrote in a scratch
  directory, one rule per file plus a clean control and two negative controls, instead of on the
  packet's own four fixtures.
- **The 1,165 denominator and the per-section leaf counts** were recomputed straight from
  `audit/raw/spec-items.json` and `audit/raw/spec-coverage.json` with a throwaway script.
- **The chip row (E006)** was not read off the unit tests. I simulated the component over all 43
  live sections in `audit/content-sections/` — visibility filter, counts, chips, palette — and
  asserted the invariants against real content.
- **Pass 2 of the tagging (E007)** was regenerated: I rebuilt the 19-question list myself from the
  three source banks and piped it through `tag-lexical.mjs`, then recomputed the pass1∩pass2
  intersection without `tag-merge.mjs` and compared it to what was written.
- **Business section numbers (E005)** were checked by parsing `bus_spec.txt` for its `N.3.M`
  headings and asking which heading each cited line range falls under — not by re-running the
  wording match that produced them.

## Verdicts

### E001 — item contract on both banks; SQL written not run — CONFIRMED

All 66 items in the imported bank carry `kind` ∈ {mcq,written,quant,draw}, a non-empty `ao` of valid
codes, and `stimulusRef`; 0 contract problems. Independently of `lib/exam-item.js`'s helper, I
compared every item's `ao` against the raw `SPEC_ASSESSED` table in `lib/ao-spec.js` for its
(subject, command): 0 mismatches over 66. `specItems` is present on 21 items and absent (not `[]`)
on the rest, which is the contract's documented untagged state and is what keeps "untagged" and
"examines nothing" distinguishable. `scripts/packet-12-1-spec-items.sql:32-34` adds
`spec_items jsonb` and `kind text` with `if not exists`, plus two `NOT VALID` check constraints
(:48-59) and a GIN index (:64); a repo-wide grep for the filename finds only documentation and
`audit/scripts/spec-coverage-check.mjs:292`, which prints that it is "written and NOT run" — nothing
executes it. `npm run build` exits 0.

### E002 — `npm run spec-coverage` — CONFIRMED

`package.json:20`. The run prints 43 section rows and exits 1 on live content (123 tariff failures,
all of them real off-spec live questions owned by the per-section content packets, not by this one).
Denominator verified independently: `audit/raw/spec-items.json` holds 1,362 rows, of which exactly
1,165 are `kind: 'leaf'`; the per-section leaf counts I computed by intersecting subject+topic sum to
exactly 1,165 with no leaf unattached, and the first rows match the printed table (18, 16, 11, 20,
18, 15…). Each failure rule fired alone on my own fixtures: Business `Examine 8` → tariff only;
`BUS-9.9.9-zz` → specid only; `specItems: []` → specid only, with the "omit the field instead"
message; a Business section whose only question is `Discuss 8` → noeval only. Two negative controls
passed: a Business section with `Evaluate 20` exits 0, and an Economics section whose only question
is `Discuss 14` exits 0 — so the noeval rule is subject-aware rather than accidentally lenient.

### E003 — three failing fixtures plus a clean control, under `npm test` — CONFIRMED

`audit/fixtures/spec-coverage/{invalid-tariff,invented-spec-id,no-evaluative,clean}.json`;
`audit/scripts/spec-coverage.test.mjs` is in `package.json:19`'s test script. The tests run the guard
as a subprocess and assert both the exit code and that the failure set is *exactly one rule*, so a
fixture cannot pass by failing for the wrong reason. The fixtures differ from the control in more
than one field, which weakens them as controls on their own — but my minimal one-field fixtures
above show each rule fires in isolation, so the conclusion holds by a second route. `npm test`:
194 pass, 0 fail.

### E004 — the 30 Analyse-8 items — CONFIRMED (re-checked after B1)

From the imported bank: `commandWord: 'Analyse'` with `marks: 8` now returns **0** items, and no
item anywhere in the bank carries `Analyse` as its command word. The 30 8-mark items are 21
Economics `Examine` and 9 Business `Discuss`. Question stem's first word equals `commandWord` on
30/30. Every one of the 30 carries the same six-row scheme: the Appendix 6 descriptor, four levels
(1–2 / 3–4 / 5–6 / 7–8), and indicative content.

Checked against the specification rather than the census the rewrite read: `econ_spec.txt:2727`
gives Examine 8 and `:2722` gives Analyse 6, so Economics has no 8-mark Analyse; `bus_spec.txt:2234`
gives Discuss 8 and the Business table has no Examine row at all. The descriptor text on the cards
reproduces those two rows verbatim.

B1's change to this item is the examiner commentary and the likely score. The defect it addressed —
a Level-4 descriptor demanding an assessment printed beside a commentary claiming top marks without
one — is gone: `likelyScore` is now only `7–8 / 8` (17 items) or `5–6 / 8` (13 items); no commentary
claims full marks or a top band; the phrase "shows evaluative awareness without being asked to
evaluate" is absent from the bank. I checked each commentary's own claim against its score: every
`5–6 / 8` card says why it stops at Level 3 and names the brief assessment that would lift it, and
every `7–8 / 8` card names where the assessment is made. No card contradicts its score.

### E005 — 20 Business model answers, IAL section numbers — CONFIRMED

All 20 Business items match `/^[1-4]\.3\.[1-6]$/` (observed range 1.3.1–2.3.5) and every
`specSource` is `bus_spec.txt:<lines>`. Verified by a route independent of the wording match: I
parsed `bus_spec.txt` for its `N.3.M` headings and asked which heading each cited line range sits
under — 20/20 land under the number claimed, at both ends of the range, and the quoted spec text at
those lines matches the question's topic in every case (e.g. `market-research-8` → 1.3.1 at
lines 521-528, "identify and anticipate customer needs"; `lean-production-8` → 2.3.4 at 993-995,
"Just in time (JIT)"). The Economics half is unharmed: all 46 Economics items still carry an IAL
number with 3 as the middle digit.

The subject-then-number keying is real and reaches both consumers (`PracticeQuestionsTab.jsx:15`,
`SectionModelAnswersPage.jsx:16,20`). Every href in `SECTION_MODEL_ANSWERS_LINKS` resolves to a route
that exists under `app/`, and I checked the other direction too: of the 22 model-answer routes, all
but one resolve to at least one answer, and the one that does not (`business/the-market`, IAL 1.3.2)
is deliberately absent from the links map and renders the explicit empty note at
`SectionModelAnswersPage.jsx:65` rather than a blank list.

### E006 — MARK_FILTERS/MARK_COLORS derived; ial-commands collapsed — CONFIRMED (re-checked after B1)

`components/PracticeQuestionsTab.jsx:7,10,35` imports `markFiltersForSection`/`markColorsFor` and
holds no ladder of its own; `lib/practice-tariffs.js:32-37` computes the ladder from
`lib/ial-marking.js`'s tariff tables; `components/learn-mode/utils.js:9` is now a re-export of
`markColor`, so the twin colour map is gone and `InlinePractice.jsx:37` reads the same function.
`lib/ial-commands.js:30` makes `IAL_COMMANDS` module-local and derives it from `ECONOMICS.tariffs` /
`BUSINESS.tariffs`; a repo-wide grep finds no importer of it outside that file, and its three
importers use only the visibility helpers. The ladders derived at runtime are Economics 2/4/6/8/14/20
and Business 2/4/6/8/10/12/20, which is what `econ_spec.txt` and `bus_spec.txt` Appendix 6 contain.
`unitCode` is supplied at the single render site, `StudyApp.jsx:981`.

B1 replaced the bare ladder with `markFiltersForSection`, which adds a chip for any tariff the
section's *visible* questions carry that the ladder does not. Rather than trust its unit tests, I
simulated the component over all 43 live sections: **0** sections where a visible question's tariff
has no chip, **0** where the chip counts fail to sum to the "All Questions" count, and **0**
unresolvable palettes. Three Economics sections (`aggregate-demand`, `consumer-behaviour-demand`,
`market-failure`) mint the off-ladder chip, labelled `10 · not IAL` with an `aria-label` saying so —
one more than round B1's note mentions. All eight tariff palettes exist in both themes
(`app/globals.css:83-104` light, `:237-258` dark, three tokens each); `npm run contrast` is clean.

Caveat, stated so it is not mistaken for a confirm: an Economics student in those three sections
still sees a 10-mark chip. That is a live-content defect — 10-mark Analyse questions in a subject
with no 10-mark tariff — and it is tracked as per-section ledger items in packets 16/18/22/35/36 and
reported by `npm run spec-coverage` as 123 tariff failures. E006's defect, a hardcoded ladder in two
UI surfaces plus a second exported copy of the tariff table, can no longer occur.

### E007 — Market Failure tagged by the two-pass method — CONFIRMED

`tag-lexical.mjs` (pass 2) reads only the question text and the oracle rows; it never opens
`pass1-tags.json`, and `tag-merge.mjs` is the only file that does. I regenerated pass 2 from a
question list I rebuilt myself out of the three banks (3 Economics 1.3.5 model answers, 5 live
practice rows from `audit/content-sections/`, 11 staged rows from
`audit/snapshots/packet-25-bundle__economics__market-failure.json`) and got output identical to the
committed `pass2-tags.json` on all 19 keys — so it was not hand-tuned to agree. Recomputing the
intersection without `tag-merge.mjs`: 51 pass-1 proposals, 78 pass-2, **31 agreed**, 19 distinct
leaves of 35 (54.3%), exactly what `tagging-diff.md` reports. All 31 agreed ids are real
`ECON-1.3.5-*` leaves in the oracle.

The written artefacts match that recomputation exactly: `section_practice-tags.json` holds 14 rows
(4 live, 10 staged), every one matching my agreed set for its `bank:practiceIndex`, none written
with an empty array, and every row's `question` string is byte-identical to the question at that
index in its source bank — so the "match by question text" key is sound. In the model-answer bank,
`negative-externality-tax-8` carries exactly the two agreed ids and the two items with no agreement
carry none. The guard reports a real, partial number: market-failure 7 of 35 leaves (20.0%) live,
18 of 35 (51.4%) with `--staged`, with the unexamined leaves named in `ECON-1.3.5-*` form.

Deviation, recorded rather than waved through: pass 2 is a deterministic script, not the brief's
"separate agent". Because I re-derived its output from inputs I assembled myself, the independence
the method exists for is stronger here than an agent's would have been, not weaker.

### E008 — `spec-overlap.mjs` — CONFIRMED

`globalisation` vs `causes-effects-globalisation` exits 1, prints 58 shared ids and the cross-subject
warning; `market-failure` vs `national-income` exits 0 ("disjoint"); an unknown slug exits 2 with the
list of known slugs. I checked the two facts the tool rests on, from the oracle rather than from the
tool: no slug appears under both subjects (0 duplicates across the 43 keys) and no spec-item id
appears under two subject/topic pairs (0 of 1,362) — so "disjoint" is a real property and not an
artefact of id namespacing. Topic 4.3.1 holds 58 rows (26 Economics, 32 Business), which is the
number printed. There are 19 cross-subject number collisions among the 43 sections, so the tool has
18 more true positives available than the one it was demonstrated on.

Cosmetic, unchanged from round 1: because a topic's rows are taken in either subject, the per-side
header count double-counts on a colliding number — `market-failure` reads "(63 spec items)" when its
own Economics 1.3.5 rows number fewer. The exit codes and the shared list are unaffected.

## Unclaimed but relevant — status not changed

- **`lib/ao-rubric.js:68-74` and `lib/ao-spec.js:199-200`** carry a mark-to-AO split keyed
  "8-mark questions (Analyse/Explain)" and "10-mark questions (Assess/Analyse)". Both labels name
  pairings IAL does not have (Economics Analyse is 6 and Assess does not exist; Business Analyse is
  6), and this is what makes the brief's E006 grep return more than `lib/ial-marking.js`. The table
  is Revvy's own AO allocation for the written-practice marker, documented in place as not an
  Edexcel figure, it predates this packet, and no ledger id covers it. Worth an id of its own: the
  comment labels are what a future reader will copy.
- No item assigned to packet 12.1 is unclaimed; `ledger.mjs unverified 12.1` reports no unclaimed
  scope.

## Gate

All eight confirmed on a second, independent pass. `npm run build` 0, `npm test` 194/194,
`npm run contrast` clean, `npm run spec-coverage` exits 1 on live content by design. The packet gate
should pass.

---

## Round 1 (before fix round B1) — preserved verbatim

# Verify A — packet 12.1 (E001–E008)

Read-only adversarial pass. Inputs: `node audit/scripts/ledger.mjs unverified 12.1`, `git diff`,
`git diff --cached`, `audit/runs/packet-12.1/brief.md` (the pre-build spec, per PROTOCOL §3 step 1).
`built.md` was NOT read.

Evidence was gathered by methods the fix does not use, per the standing rule that a check sharing the
fix's blind spot certifies nothing:

- **Command words and tariffs** were checked against `audit/raw/econ_spec.txt:2702-2747` and
  `audit/raw/bus_spec.txt:2218-2251` directly (Appendix 6), and cross-checked against the
  independently parsed `audit/raw/tariff-census.json` — NOT against `lib/ial-marking.js`, which is
  what the code imports.
- **The coverage guard's failure rules** were exercised with fixtures I wrote myself in a scratch
  directory, one rule per file, rather than by running the packet's own fixtures.
- **The coverage numbers** were recomputed from the artefacts by a separate script rather than read
  from the guard's output.
- **Pass 2 of the tagging** was re-derived from scratch: I rebuilt the question list from the two
  bank files and the model-answer bank, piped it through `tag-lexical.mjs`, and compared to the
  committed `pass2-tags.json`.
- **The two-pass merge** was recomputed independently of `tag-merge.mjs` and compared to
  `tagging-diff.md` and `section_practice-tags.json`.
- **Business section numbers** were checked by intersecting each item's cited `bus_spec.txt` line
  range with the topic spans in `audit/raw/spec-items.json` — a different path from the wording
  match that produced them.

Build, tests and validator: `npm run build` green; `npm test` 187 pass / 0 fail;
`npm run validate` unchanged in shape (no content tables touched by this packet).

---

## E001 — item contract: specItems, kind, ao, stimulusRef on both banks; SQL written not run — CONFIRMED

`lib/exam-item.js:44-135` defines the four fields and `contractProblems()`. Checked bank 1 by loading
`data/modelAnswersData.js` and comparing every item's `ao` to `aoListFor()` and every `kind` to
`kindForCommand()`: 66/66 items carry `kind`, `ao` and `stimulusRef`; 0 AO mismatches, 0 kind
mismatches; `stimulusRef` is `null` on all 66 (contract-legal: null = standalone). `specItems` is
present on 21 and absent on 45, which is the contract's documented "untagged" state
(`lib/exam-item.js:23-25`), not a gap.

Bank 2: `scripts/packet-12-1-spec-items.sql:32-65` adds `spec_items jsonb` and `kind text`, both
nullable, plus two NOT VALID checks and a GIN index. The brief's "done means" for E001 asks for
exactly these two columns; `ao` and `stimulus_ref` are deliberately excluded with reasons recorded at
`scripts/packet-12-1-spec-items.sql:25-28`, so this is scope as specified, not a shortfall. Nothing
in the repo executes it — the guard reads a file bank only (`spec-coverage-check.mjs:26-31`) and
prints "written and NOT run" at line 292.

## E002 — npm run spec-coverage — CONFIRMED

`package.json:20` wires the script. `npm run spec-coverage` prints 43 section rows, a per-unit block,
and the line "55 of 1,165 spec leaves are examined". The denominator is derived, not restated:
`spec-coverage-check.mjs:71` filters `kind === 'leaf'`, and I counted the oracle myself —
`{ leaf: 1165, requirement: 197 }`, matching `counts.leaves`. The per-section `leaves` column sums to
exactly 1,165 across the 43 rows (business 163+111+90+98, economics 154+169+168+212), so no topic is
double-counted or dropped.

The three failure rules were each fired in isolation with my own fixtures:

| my fixture | result |
|---|---|
| `Analyse 8` + valid `Evaluate 20`, economics | 1 failure, rule `tariff`, exit 1 |
| `specItems: ["ECON-9.9.9-1a"]` | 1 failure, rule `specid`, exit 1 |
| `Explain 4` + `Analyse 6`, no evaluative | 1 failure, rule `noeval`, exit 1 |
| `specItems: []` | 1 failure, rule `specid` ("omit the field instead"), exit 1 |
| all valid, one `Evaluate 20`, real ids | 0 failures, exit 0 |

The `noeval` rule reports zero failures on the real 43 sections. I checked that this is a true
negative, not a dead rule: reimplementing the evaluative test over `audit/content-sections/` plus the
model-answer bank independently finds 0 sections with questions and no `Evaluate 20` / Economics
`Discuss 14`.

Note, not a rejection: bank 2's tags are joined by exact question TEXT
(`spec-coverage-check.mjs:157`) against a file, and the guard's own header (lines 120-125) records
that the live table has drifted from the t=0 dump. The reported percentage therefore describes files,
and is a lower bound on the live bank. Reading the table is packet 12.4's job.

## E003 — three failure fixtures plus a clean control, under npm test — CONFIRMED

`audit/fixtures/spec-coverage/{invalid-tariff,invented-spec-id,no-evaluative,clean}.json`;
`audit/scripts/spec-coverage.test.mjs` is listed in `package.json:19`'s `test` script. The tests run
the guard as a subprocess (`spec-coverage.test.mjs:27`) and assert the exit code plus that the
failure set contains exactly one rule, so a fixture cannot pass by failing for the wrong reason. The
clean control asserts exit 0 and `examined > 0`. `npm test`: 187 pass, 0 fail. The four fixtures are
otherwise the same section, so each failure is attributable to the one field that changed.

## E004 — 30 Analyse-8 model answers become Examine 8 / Discuss 8 with levels grids — CONFIRMED

`grep -c "commandWord: 'Analyse'"` across `data/modelAnswersData.js` and
`data/modelAnswersExpansion.js` returns 0 (was 13 + 17 = 30 at HEAD). The loaded bank now holds
economics `Examine 8` ×21 and business `Discuss 8` ×9 — the same 30. For all 30: the question stem's
first word equals `commandWord` (0 mismatches), and `markScheme` is an array whose first row is the
Appendix 6 descriptor and which carries four `Level N — a–b marks` rows plus indicative content.

Checked against the spec text rather than the census: `econ_spec.txt:2727` gives Examine 8 and
`:2722` gives Analyse 6, so `Analyse 8` was unsittable in Economics; `bus_spec.txt:2234` gives
Discuss 8 and Business has no `Examine` row at all. The descriptors in the mark schemes reproduce
those lines verbatim, including the spec's own "a logical chains of reasoning".

## E005 — 20 Business model answers carry an IAL sectionNumber with specSource — CONFIRMED

All 20 business items carry `sectionNumber` matching `/^[12]\.3\.[1-5]$/` and a
`specSource: 'bus_spec.txt:<a>-<b>'`. Verified by a route independent of the wording match that
produced them: for each item I intersected the cited line range with the topic spans in
`audit/raw/spec-items.json` and checked the resulting topic equals the claimed `sectionNumber` —
20/20 OK, no mismatches. Spot-read of ten cited ranges shows on-topic requirement text (e.g.
`bus_spec.txt:541` "Market segmentation" for `market-segmentation-4`).

The collision fix that went with it holds: `SECTION_MODEL_ANSWERS_LINKS` and
`SECTION_MODEL_ANSWERS_FAQ` are now keyed subject-then-number, and both consumers were updated
(`PracticeQuestionsTab.jsx:19`, `SectionModelAnswersPage.jsx:20`). All 22 section pages pass a
`sectionNumber` in IAL form; every business href in the links map resolves to a route that exists
under `app/business/`. Business 1.3.2 has no model answer and gets the honest empty note at
`SectionModelAnswersPage.jsx:57-64` rather than a blank list.

## E006 — MARK_FILTERS/MARK_COLORS derive from ial-marking; ial-commands collapsed — CONFIRMED

`components/PracticeQuestionsTab.jsx:13-14` calls `markFiltersFor(unitCode)` / `markColorsFor(unitCode)`;
`lib/practice-tariffs.js:31-38` builds the ladder from `lib/ial-marking.js`'s tariff table.
`components/learn-mode/utils.js:12` is now a re-export, so the twin map is gone, and
`InlinePractice.jsx:37` uses `markColor`. `lib/ial-commands.js:30` makes `IAL_COMMANDS` module-local;
grep shows the only two references left are inside that file.

Independent check that no second copy survives: grep for `practice-N-bg` style tokens across
`app`, `components` and `lib` returns nothing outside `lib/practice-tariffs.js:63-65`, and a grep for
command-word-adjacent numerals across the same trees returns only prose and comments — no table.
`app/globals.css:80-103` and `:237-260` now define triples for 2, 8, 12 and 14 in both themes, so the
new chips resolve rather than painting nothing. `unitCode` reaches the component
(`StudyApp.jsx:981`), so the per-subject branch is live and not silently defaulting.

Business's `Assess [10, 12]` was checked against `tariff-census.json` (`bus_spec.txt:2238-2245`,
unitNote "Units 1/2; Units 3/4"), so the 12-mark chip is real and not an invention.

## E007 — Market Failure tagged in both banks by the two-pass method — CONFIRMED

Pass 2 is fully reproducible. I rebuilt the 19-key question list from
`audit/content-sections/economics__market-failure.json` (5 rows),
`audit/snapshots/packet-25-bundle__economics__market-failure.json` (11 rows) and the three Economics
1.3.5 model answers, piped it through `audit/scripts/tag-lexical.mjs`, and the output is byte-identical
to the committed `pass2-tags.json` on all 19 keys. So pass 2 was not hand-edited to agree with pass 1.

I then recomputed the merge without using `tag-merge.mjs`: 19 keys, 51 tags proposed by pass 1, 78 by
pass 2, 31 agreed, 19 of 35 leaves (54.3%). `tagging-diff.md` reports exactly those figures, and
`section_practice-tags.json` holds exactly the 14 rows with a non-empty agreed set plus the 2 with
none — 0 mismatches against my recomputation. The agreement rate is low (31 of 98 proposals; 8 of 19
questions end untagged), which is the signature of a second pass that was not tuned to the first.

The guard's percentage reproduces from the artefacts by hand: the union of agreed leaf ids on the
live bank plus the one tagged model answer is 7 distinct leaves of 35 = 20.0%, which is what
`--section market-failure` prints; `--staged` prints 51.4% and names 17 unexamined leaves in
`ECON-1.3.5-*` form. Both banks are tagged: the model-answer bank in data
(`negative-externality-tax-8` carries the two agreed ids), `section_practice` as a staged file,
because the column does not exist yet.

Deviation worth recording: the brief asked for pass 2 to be "a separate agent". It is a deterministic
script instead. That is a stronger form of the same property — anyone can re-derive it, which is what
I did — so it meets the ledger title's "independent method", but it is not literally what the brief
said.

## E008 — spec-overlap.mjs — CONFIRMED

`audit/scripts/spec-overlap.mjs`. `globalisation causes-effects-globalisation` exits 1 and prints 58
shared ids with the cross-subject warning; `market-failure national-income` exits 0; an unknown slug
exits 2 with the list of known slugs. Resolution is slug → topic via `spec-coverage.json`'s
`bySection` keys, then spec items by topic in either subject, which is what makes the Business-4.3.1 /
Economics-4.3.1 collision visible. I checked the two assumptions this rests on: no slug appears under
both subjects (0 duplicates across the 43 keys), and no spec-item id appears under more than one
subject/topic (0 of 1,362), so "disjoint" is a sound answer and not an artefact of id namespacing.

Cosmetic inaccuracy, not a defect against the title: the header line reports "(58 spec items)" for
each side when the two topics collide, because `idsFor()` counts both subjects' rows. Business 4.3.1
has 32 of its own and Economics 4.3.1 has 26.

---

## Unclaimed but relevant

`node audit/scripts/ledger.mjs packet 12.1` lists exactly E001–E008, all claimed. Nothing assigned to
this packet is unclaimed.

## Outside my verdicts — a hazard in the shared index

`git status` shows `components/ExtrasTab.jsx`, `scripts/_packet28-assessment.mjs`,
`audit/fixtures/validator/cases.json` and `audit/snapshots/packet-28-bundle__economics__revenue-costs-profits.json`
as `MM`. For `ExtrasTab.jsx` the INDEX version reverts commit 00662a3 (V028): it restores the
unguarded `chain.steps.map(...)` and the "(10–14 marks)" subtitle that names a tariff neither subject
has. The working tree is correct; the index is not. Anyone who commits the index as it stands will
re-ship the crash that took the Extras tab down for Pro students. This is not packet 12.1's change —
none of E001–E008 touches that file — but PROTOCOL's first invariant is exactly about this, and the
packet's commit must name its paths explicitly.

## Gate

Verify A passes: all eight claimed ids confirmed. The packet gate should pass on this pass, subject to
Verify B (the packet changes what a student sees on the Practice tab's filter chips and on nine
Business model-answer pages) and to the commit naming its own paths rather than taking the index.
