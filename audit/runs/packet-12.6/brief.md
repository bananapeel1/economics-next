# Packet 12.6 brief — work list only, no results, no source changes

Authoritative spec: `audit/specs/packet-12.6.md` (22 Sep 2026). `audit/NEXT.md:3-17` is confirmed to be a
reservation pointer only ("spec lives elsewhere... this block reserves the packet; it is not a work item") —
read in full, contains no requirements, no contradiction with the spec file found.

Documents read in full per the six rules: `audit/PROTOCOL.md` (150 lines), `audit/SESSION-PROMPT.md` (77
lines, six rules — reproduced in the task prompt), `audit/NEXT.md:1-17` (the 12.6 pointer) and the newest two
Handoffs (`:9864` packet 41, `:9882` packet 42 — both closed/blocked, neither mentions 12.6, no conflict),
`audit/DECISIONS.md` Settled list (`grep -n "^## Settled"` → one heading at line 13, list runs to the next
`### ` at line 2708; `grep`'d for market-failure/criteria/modelAnswers/E033-E037/12.6 — no hits against 12.6),
`audit/CONTENT-GATE.md` recall contract (`:196-233`).

## Ledger — `node audit/scripts/ledger.mjs packet 12.6` and `--open` (both run; identical, 5 of 5 open)

| id | title (verbatim from ledger) | file field |
|---|---|---|
| E033 | validate-model-answers.mjs guards the model-answer bank: criteria sum to tariff, seg ids resolve, tariffs legal per lib/ial-marking.js; proved by A/B mutation on R1, R2 and R4 | audit/scripts/validate-model-answers.mjs |
| E034 | Economics 1.3.5 Market Failure: all three answers (4/8/20) carry criteria summing to their tariff and a script whose segments every criterion resolves to; no existing field removed | data/modelAnswersData.js |
| E035 | econ-u1-market-failure is attached as stimulus to the 1.3.5 questions carrying application marks and renders in the page flow at 390x844, not behind a disclosure or modal | data/modelAnswersData.js |
| E036 | Attempt loop on 1.3.5 only: criteria tick, a running total counts against the tariff, ticking marks the linked script segment, no score button; draft and ticks survive reload via localStorage | components/SectionModelAnswersPage.jsx |
| E037 | The other 31 section pages render identically to HEAD; proved by A/B diff of rendered HTML on at least six of them, not by reading the fallback branch | components/SectionModelAnswersPage.jsx |

**Discrepancy found, ledger `file` field vs. actual location (rule 1 — checked by wording, not by trusting
the claim):** E034 and E035 both list `data/modelAnswersData.js` as the file. The three Market Failure model
answers are not all in that file:

- 4-mark `neg-externality-4` — `data/modelAnswersData.js:221` (`sectionNumber: '1.3.5'`, `sectionTitle:
  'Market Failure'`).
- 8-mark `negative-externality-tax-8` — `data/modelAnswersExpansion.js:156`, NOT in modelAnswersData.js.
- 20-mark `market-failure-government-intervention-20` — `data/modelAnswersExpansion.js:214`, NOT in
  modelAnswersData.js.

Located by `grep -n "sectionNumber: '1.3.5'"` across both files plus the `// ── 1.3.5 Market Failure ──`
comment markers, not by reading the ledger's file field. Two of three items to be touched for E034/E035 live
in a file the ledger doesn't name. This is a ledger metadata gap, not a spec conflict — the spec file itself
never names a filename for the answers, only `data/modelAnswersData.js` in the "shape" section as the
general location of "a model-answer item" (singular, illustrative). Flagging per rule 1 so the author edits
the right two files and per rule 4 doesn't stop at one.

**Also found by the same `sectionNumber: '1.3.5'` grep:** Business also has a section numbered `1.3.5`
(`sectionTitle` at `modelAnswersData.js:945`, `modelAnswersExpansion.js:1367` — cf. `NEXT.md:1422` "Business
1.3.5 Entrepreneurs & Leaders"). Section numbers are not unique across subjects; any script or grep written
for this packet must filter on `subject: 'economics'` AND `sectionNumber: '1.3.5'` together, never the number
alone.

## Spec requirements in scope, quoted from `audit/specs/packet-12.6.md`

**Section in scope (verbatim):** "Economics 1.3.5 Market Failure. ... Do not touch any other section's
content."

**The shape (verbatim, five new optional fields, fire only on items carrying `criteria`):**
```
criteria: [{ id, band, text, marks, seg }, ...]
script: [{ id, label, aos, segments: [{ id, html, note }, ...] }, ...]
stimulus: 'econ-u1-market-failure',
minutes: 5,
```
"`markScheme`, `answerParagraphs`, `peel`, `annotationLegend`, `examinerCommentary`, `likelyScore`,
`specItems` and every other existing field stay exactly as they are. **Remove nothing.**"

**E033 acceptance (verbatim rules R1-R6):**
- R1 `criteria[].marks` sums to the item's `marks`
- R2 every `criteria[].seg` resolves to some `script[].segments[].id` on the same item
- R3 `script[].segments[].id` is unique within the item
- R4 the item's `marks` is a legal IAL tariff for its subject, read from `lib/ial-marking.js` — never from a
  hard-coded list in the new script
- R5 an item with `criteria` also has `script`, and an item with `script` also has `criteria`
- R6 `stimulus`, when present, resolves to a real file in `content/data-response/`
- Proof standard (verbatim): "for R1, R2 and R4, deliberately mutate the retrofitted data, run `npm run
  validate`, record the non-zero exit and the message, revert, run it again, record the zero exit. Write the
  six results to `audit/runs/packet-12.6/validator-ab.md` with the commands."

**E034 acceptance (verbatim):** "All three Market Failure answers (4, 8 and 20 marks) carry `criteria`
summing to 4, 8 and 20, and a `script` whose segments every criterion resolves to. `npm run validate` and
`npm test` pass. The criteria are derived from the existing `markScheme` bands and the existing
`answerParagraphs` — this is a re-expression of marking that has already been written and checked, not new
marking."

**E035 acceptance (verbatim):** "`econ-u1-market-failure` is set as `stimulus` on the 1.3.5 questions that
carry application marks, and renders as part of the page flow at 390x844 — not behind a disclosure, not in a
modal, not collapsed by default. Measure it: report the rendered position and whether any interaction is
required to read it."

**E036 acceptance (verbatim):** "each criterion is tickable; ticking one increments a running total shown
against the tariff; ticking one visibly marks its linked script segment. There is no separate 'score' button.
The student's typed answer and their ticks survive a page reload via `localStorage`, keyed by question id.
(Server-side persistence is explicitly **not** in this packet.)"

**E037 acceptance (verbatim):** "The other 31 section pages render identically to `HEAD`. Prove it by A/B:
capture the rendered HTML of a sample of at least six other section pages before and after the change and
diff them. A claim that the fallback path is untouched, made by reading the component, does not satisfy
this — locate the evidence by a different method than the one that produced the change."

**Explicitly out of scope (verbatim list):** the other 65 answers (packet 12.8); mode gate, question-nav row,
sticky bar, keyboard nav, animations (packet 12.7); the 10-mark questions inside the six
`content/data-response/*.md` files ("not a legal IAL Economics tariff... R6 deliberately checks only that
`stimulus` resolves to a file, not what is inside it... Do not fix them here and do not widen R6 to reach
them"); Supabase, the AO profile, anything that writes live content (rule 6).

## What "done" means per id (spec's acceptance restated as a checklist, not a result)

- **E033**: `audit/scripts/validate-model-answers.mjs` exists, is invoked by `npm run validate` (currently
  `node audit/scripts/validate-content.mjs`, `grep -c modelAnswers` on it returns 0 — confirmed by direct
  grep, not from the spec's own count), implements R1-R6 reading tariffs from `lib/ial-marking.js` /
  `lib/practice-tariffs.js` (`tariffsFor('economics')` → `[2,4,6,8,14,20]`, confirmed by reading
  `practice-tariffs.js:28-36` — do not mint a second tariff list), and `audit/runs/packet-12.6/validator-ab.md`
  records six mutate/revert results for R1, R2, R4 with the commands run.
- **E034**: the three named items (`neg-externality-4`, `negative-externality-tax-8`,
  `market-failure-government-intervention-20`) each carry `criteria` summing to 4/8/20 and a `script` whose
  segment ids every criterion's `seg` resolves to; every pre-existing field on all three untouched;
  `npm run validate` and `npm test` exit 0.
- **E035**: `stimulus: 'econ-u1-market-failure'` set on the 1.3.5 items carrying application marks (spec
  doesn't say all three must carry it — "the 1.3.5 questions that carry application marks"; the 4-mark item
  is Knowledge & Application per its `ao` field, the 8- and 20-mark items are AO1-AO4 — this needs a per-item
  judgement call at Build time on which carry an application mark worth attaching the extract to, not an
  assumption that it's all three); renders in the page flow, not gated, at 390x844.
- **E036**: on the Market Failure page only — criteria tick, running total against tariff, tick marks its
  linked segment, no score button, answer+ticks survive reload via `localStorage` keyed by question id.
- **E037**: rendered HTML of >=6 other section pages diffed before/after, 0 diff, located by capturing HTML
  (curl/render), not by reading `SectionModelAnswersPage.jsx`'s conditional branch.

## Candidates checked against `audit/raw/spec-coverage.json` and found OUT OF SCOPE

Per the task's step 3, pulled `economics__market-failure` from `audit/raw/spec-coverage.json` (`bySection`
index 32): `covered: 23, thin: 3, missing: 3`.
- `missingItems`: "speculation and market bubbles" (leaf 6, `econ_spec.txt:777-784`), "externalities in a
  financial context" (leaf 2e, `econ_spec.txt:749`), "pensions as an information-failure context" (leaf 4c,
  `econ_spec.txt:762`).
- `thinItems`: "private goods: rival and excludable" (leaf 3a), "symmetric vs asymmetric information" (leaf
  4a), "healthcare as an information-failure context" (leaf 4c).

Checked against `audit/raw/econ_spec.txt:723-784` (1.3.5's full leaf list, read directly) — all six items are
real leaves of the specification, not phantom UK-GCE numbers (middle digit is 3, consistent with IAL
numbering per the programme's own numbering note). **But these are gaps in the section's teaching notes
(Learn Mode content), not in its model-answer bank** — a different data structure entirely
(`content-sections`/Supabase-staged, vs. the static `modelAnswersData.js`/`modelAnswersExpansion.js` this
packet touches). The spec file's own scope line is "Economics 1.3.5 Market Failure" for the marked-script
shape specifically, and its "explicitly out of scope" list does not mention notes coverage, but its "Why
this packet exists" section is entirely about the model-answer bank's field shape, never about note-content
gaps. Treating these six items as 12.6 to-dos would touch `content-sections` staging/publish machinery this
spec never names and the six ledger ids never claim. **Recommendation for the founder: these six items are
candidates for a future notes-content packet on 1.3.5, not for 12.6** — flagged, not actioned, not claimed
here, no ledger id opened for them.

## Contradictions / open questions for the founder

None found between `PROTOCOL.md`, the newest Handoffs, `DECISIONS.md`'s Settled list, `CONTENT-GATE.md`, and
`audit/specs/packet-12.6.md`. The two items below are not contradictions between documents; they are gaps a
document leaves open that Build will have to resolve by judgement, surfaced so they aren't silently decided:

1. **Ledger `file` field is wrong for E034/E035** (see above) — two of three target items are in
   `data/modelAnswersExpansion.js`, not `data/modelAnswersData.js`. Not a spec conflict (the spec never names
   a file), but worth a ledger correction alongside the packet so the next reader isn't misled the way this
   brief nearly was.
2. **Which 1.3.5 items "carry application marks" for E035** is not enumerated in the spec — it says "the
   1.3.5 questions that carry application marks," plural, implying possibly not all three. Build must read
   each item's `ao` field and question wording to decide, and should record the reasoning, since E037-style
   "don't assume, locate it" applies here too.
3. **No `audit/CONTENT-GATE.md` per-section checklist or recall contract applies to this packet's file
   surface.** Both govern `section.recall`/`content-sections` (Supabase-staged notes) and `InlinePractice.jsx`
   guidance text; `modelAnswersData.js`/`modelAnswersExpansion.js` are plain static imports with no
   `stageSection()`/`publish-section.mjs` step in their path (confirmed by `grep -rl` for both filenames
   across `app/`, `lib/`, `components/` — eight importing files, none of them the staging/publish scripts).
   Editing them in this worktree branch is ordinary code+data work, not a Rule 6 "write live content" act;
   Rule 6 becomes live only if this branch is merged and deployed, which is outside this packet and outside
   this session regardless.
4. **`audit/DECISIONS.md`'s residual note on `ModelAnswersPage.isLocked`** (`:3063`, entitlement unknown ->
   locked) concerns a differently-named component; whether it or its lock state intersects
   `SectionModelAnswersPage.jsx`'s render path at 390x844 is unchecked here — worth a look at Build/Verify B
   time if the attempt loop appears locked during a signed-out walkthrough.

## No PROGRESS.md row exists for packet 12.6 or 12.5

`grep -n "| 12\.[0-9]" audit/PROGRESS.md` returns only rows 12.2, 12.3, 12.4 (all done and verified /
staged). No row for 12.5 or 12.6. Not a contradiction — PROTOCOL's Brief step doesn't require the row to
exist yet; it's created/updated at the Gate step (PROTOCOL.md step 5.6). Noting so the next phase doesn't
search for a row that isn't there yet and isn't stale — it simply hasn't been written.

## Confirmed facts behind the spec's own claims (checked, not re-asserted from the spec's wording)

- `stimulusRef: null` on all three named items — confirmed by reading each item directly (lines cited
  above); consistent with the spec's "all 66... `stimulusRef: null`" claim for this subset of 3.
- `content/data-response/econ-u1-market-failure.md` exists, 80 lines, contains "AED 0.25 per bag" (bag
  charge), a Table 1 row "Single-use plastic bags | AED 0.25 per bag | AED 0.18 per bag | -1.4" (PED -1.4),
  and Question 2 model answer text — the citations the spec says must survive segmenting are present in the
  file as described.
- `lib/ial-marking.js:14-24` (`ECONOMICS.tariffs`) and `lib/practice-tariffs.js:28-36` (`tariffsFor`) both
  exist and are exactly what the spec's "Notes for the author" points R4 at.
- No `script:`/`criteria:`/`minutes:` field name already in use anywhere in either data file — no naming
  collision for the new shape.
- `components/SectionModelAnswersPage.jsx` (473 lines) currently has zero references to `criteria`,
  `.script`, `stimulusRef`/`stimulus`, or `localStorage` — confirms the spec's "currently authorable for zero
  of the 66 answers" premise for the render path, not just the data.
