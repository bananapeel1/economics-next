# Packet 12.2 — built

Build phase only. Code-only: no content authored, no staging table written, no live page changed, no
commit. Everything below is staged with `git add <path>`, never `git add -A`.

## Files

| file | state |
|---|---|
| `app/lab/exam-practice/[section]/page.js` | new, 166 lines |
| `components/SectionExamPracticePage.jsx` | new, 319 lines |
| `components/section-exam-practice.css` | new |
| `components/lab/LabQuickCheck.jsx` | new, 95 lines (the one client component) |
| `lib/spec-coverage.js` | new, 240 lines |
| `lib/spec-coverage.test.mjs` | new, 13 tests |
| `lib/mid-band-answer.js` | new, 144 lines |
| `lib/mid-band-answer.test.mjs` | new, 10 tests |
| `lib/exam-timing.js` | new, 56 lines |
| `lib/lab-data-response.js` | new, 72 lines |
| `audit/scripts/spec-coverage-check.mjs` | modified, −83 / +20 |
| `package.json` | modified, two test files added to `npm test` |
| `next.config.mjs` | modified, `outputFileTracingIncludes` for the lab route only |

## Per ledger id

### E009 — the route

`app/lab/exam-practice/[section]/page.js`.

- `robots: { index: false, follow: false }` at `page.js:74`, inside `generateMetadata`. Served output
  is `<meta name="robots" content="noindex, nofollow"/>` — the same string the four existing private
  routes emit via the string form, so the deviation from local precedent is in the source only.
  Acceptance 1: `grep -c noindex` = 1 on all three slugs.
- Slug resolution at `page.js:47` (`bundleFor`) scans `audit/content-sections/` for
  `*__<slug>.json`, so the subject is discovered rather than guessed and all 43 sections resolve.
  Slug is regex-gated to `^[a-z0-9-]+$` before it reaches `path.join`.
- Proven on `market-failure` (200), `measures-economic-performance` (200), `business-growth` (200,
  Business Unit 3, zero `modelAnswersData` items) and `not-a-real-section` (404, `notFound()`).
- No Supabase client is constructed anywhere in the route's import graph (rule 2). Two file reads:
  the t=0 dump and the spec oracle. `npm run build` is green and the route is listed `ƒ` (dynamic,
  server-rendered on demand), so nothing about it runs at build time either
  (`audit/runs/packet-12.2/build.log:123`).
- **`next.config.mjs:9-16`** adds `outputFileTracingIncludes` for this route. `fs.readFileSync` is
  not an import, so Next's tracer would ship the lambda without `audit/` and every slug would 404 on
  Vercel while working locally. This is the only reason a live file was touched, and it adds nothing
  to any other route.

### E010 — the component

`components/SectionExamPracticePage.jsx` (server) + `components/lab/LabQuickCheck.jsx` (client).

- Header at `SectionExamPracticePage.jsx:237-250`: subject · unit code · unit · topic number · title,
  then real counts. Market Failure reads `3 written questions · 32 marks · 5 of 25 quick-check MCQs`.
  32 is the sum of the three items' tariffs (4 + 8 + 20), not a number from the old mockup — the
  mockup's "9 questions · 43 marks" does not correspond to anything in the data.
- Written block from `MODEL_ANSWERS` filtered to `subject` + `sectionNumber` (`page.js:96-99`), then
  filtered again through `isValidTariff`. `section_practice` is **counted and named, not displayed**:
  the block's subhead states "the section's Practice tab holds 5 written items of its own, 4 of which
  carry a tariff that does not exist in IAL Economics."
- Per-item header (`Meta`, `SectionExamPracticePage.jsx:34-45`): command · marks · AO · time. AO comes
  from `aoListFor` in `lib/exam-item.js`, which reads `lib/ao-spec.js` — nothing is hand-typed.
- Time comes from **one constant per paper**, `lib/exam-timing.js`. Economics Units 1–2 are 1 h 45 min
  for 80 marks (`audit/raw/econ_spec.txt:493`, `:1989`), Units 3–4 and all Business units are 2 h for
  80 (`econ_spec.txt:1226`, `bus_spec.txt:489`). Found by the wording "The examination lasts …", not
  by a unit number in a ledger item. `Evaluate 20` in Economics Unit 1 renders `26 min`, `Explain 4`
  renders `5 min`. The page states the constant it used.
- SSR: the whole written block is a server component. See E015 for the proof.

**`correctIndex`, and why it is handled the way it is.** The settled decision of 2026-09-12 (F086)
is that the quiz bank is deliberately paid, so exposing the answer key on an unauthenticated route is
a real defect rather than untidiness. What this packet did:

1. **The string `correctIndex` does not appear in the served HTML** of any of the three slugs
   (`grep -c correctIndex` = 0). The field is read once, server-side, at `page.js:151` and passed to
   the client component as `answer`.
2. **That is a rename, not a fix, and the page does not pretend otherwise.** The value is the index of
   the correct option and it reaches the browser. Marking in the browser means the key is in the
   browser: a hash, a rotated index or a per-option digest is recovered by hashing the four visible
   options, so it would buy nothing and cost the reader the ability to see what the page does. A page
   whose entire competitive argument is honesty cannot ship security theatre. The reasoning is written
   into the component's own header (`components/lab/LabQuickCheck.jsx:7-24`) so the next reader finds
   it before the code, not in a run directory.
3. **The mitigation actually taken is quantity.** The page ships 5 of the section's 25 MCQs
   (`page.js:42`, `QUICK_CHECK_SAMPLE`), and states "5 of 25 … in this section's bank" so the sample
   cannot read as the whole thing. Four fifths of the bank never leaves the server.
4. **F086's own defect is untouched.** It is about `/api/practice/questions`, a different, indexed,
   production endpoint; the real fix there is server-side marking and it is not in this packet's
   scope. Nothing here makes that route better or worse.

### E011 — "why this loses marks"

`lib/mid-band-answer.js`, rendered by `WhyThisLosesMarks` at `SectionExamPracticePage.jsx:102-157`.

- The panel attaches to the section's highest-tariff written item (`highestTariffItem`,
  `mid-band-answer.js:136`): `Evaluate 20` for market-failure, `Examine 8` for 2.3.1.
- **No prose is invented.** The mid-band attempt is the item's own `answerParagraphs` with its closing
  material removed — anything labelled evaluation / counter-argument / conclusion, plus the final
  paragraph regardless of label (the bank's unlabelled "Para 1/2/3" items carry their assessment
  last, so a label-only rule would cut nothing there and the panel would claim a loss the attempt had
  not taken). Market Failure: 2 of 5 paragraphs kept. 2.3.1: 2 of 3. The panel says so in its own
  first sentence, and says the reader can check it against the full model answer directly above.
- **What it loses is read ordinally, not lexically.** `bandsFor` (`mid-band-answer.js:54-91`) detects
  the two mark-scheme shapes in the bank and treats them differently: a levels scheme's TOP level is
  out of reach and the one below it is the ceiling; an objectives scheme's AO4 is out of reach and AO3
  is the ceiling. A first version bucketed by keyword and got `Examine 8` exactly backwards — Level 3
  ("assessment is implied") landed in out-of-reach and Levels 1–2 ("chain of reasoning") in
  partly-reached, because every band in that scheme uses the same vocabulary. That bug is the reason
  `lib/mid-band-answer.test.mjs:56-74` exists, with an explicit control asserting that no low level
  and no context row ("Indicative content", the Appendix 6 command row) is ever bucketed.
- **No mark is put on the attempt.** The panel states the full answer's own `likelyScore` and says
  that scoring a truncated version would be false precision. A two-band `Explain 4` scheme is reported
  as having no evaluation band rather than being given an invented one.

### E012 — the data-response link-out

`lib/lab-data-response.js`, rendered at `SectionExamPracticePage.jsx:290-303`.

- `market-failure` renders a card linking to `/data-response/econ-u1-market-failure`. The stimulus is
  **never re-rendered** — the live page is indexed and canonical and two copies of the same extract is
  a duplicate-content problem on the one surface that ranks. This follows `NEXT.md`/E012 and
  deliberately does not follow `audit/EXAM-PRACTICE.md`'s older "the stimulus and its table render"
  line; the 12.2 spec names that document as superseded.
- `measures-economic-performance` and `business-growth` render **nothing at all** — no heading, no
  placeholder, no disabled link (`grep -c lab-dr-card` = 0 on both).
- **The six pairings were established by content, not by slug similarity** (`econ-u1-demand-elasticity`
  and `consumer-behaviour-demand` share no token): each markdown file's own H1 was read and matched to
  the section bundle's `meta.title`. The table is at `lab-data-response.js:45-52`.
- **The map is a third list and is guarded accordingly.** `app/data-response/page.jsx` and
  `app/data-response/[slug]/page.jsx` already hold two un-exported copies of the piece list;
  refactoring either is a live-page change this packet may not make. So `dataResponseFor`
  (`lab-data-response.js:63`) returns a link only when `content/data-response/<slug>.md` is on disk. A
  drifted entry renders nothing rather than a dead link — the requirement is enforced by the
  filesystem, not by three lists staying in step.

### E013 — `lib/spec-coverage.js`, one implementation

- New module: `lib/spec-coverage.js`. `sectionCoverage` (`:188`) is the whole per-section computation —
  the three failure rules, the untagged count, the examined/unexamined split, the command histogram.
  `loadOracle` (`:82`) and `loadSections` (`:118`) are the two file reads, memoised and lazy.
- `audit/scripts/spec-coverage-check.mjs` now imports it (`:53`) and calls it (`:188`); its own copy of
  the computation, the oracle construction, the section list, the `EVALUATIVE` table and the dead
  `specForSubject` helper are gone. Net −83 / +20 lines. The CLI keeps what it is: flags, the two
  banks, the report.
- **Byte-identical output, proven rather than asserted.** `git show HEAD:audit/scripts/spec-coverage-check.mjs`
  was written to a sibling path (same directory depth, so its `../../lib` imports resolve) and both
  versions were run over six invocations: no flag, `--section market-failure`,
  `--section measures-economic-performance`, `--json`, `--staged`, `--baseline`. `diff` on stdout is
  empty for all six; exit codes match pairwise (1 for the first five — the pre-existing state, since
  the baseline does not cover the live tariff failures — and 0 for `--baseline`). Output sizes differ
  per flag (12,433 / 3,094 / 4,974 / 39,644 / 10,130 / 4,978 bytes), which is itself the evidence that
  each flag actually took effect. Captured in `audit/runs/packet-12.2/before.*.out` / `after.*.out`.

  The first attempt at this proof was worthless and is worth recording. It ran the six commands from a
  shell loop with the flags in a variable, `node … $a`, and **zsh does not word-split an unquoted
  parameter**, so every invocation received `"--section market-failure"` as one argument, matched no
  flag, and produced the full unflagged report. All six "before" files were byte-identical to each
  other — 12,433 bytes apiece — and the diff passed six times while proving one thing once. The tell
  was the identical file sizes, not the passing diff. Re-run with `"$@"`.

  stderr is excluded from the comparison on purpose: Node's `MODULE_TYPELESS_PACKAGE_JSON` warning
  names whichever module it reparses first and carries the pid, so it differs between any two runs of
  anything.
- Root resolution (`specCoverageRoot`, `:57`) tries `import.meta.url` then `process.cwd()` and returns
  null if neither has the oracle. Every caller degrades to "unavailable" rather than throwing, because
  a lab page that cannot read the oracle must say so, not 500.
- 13 tests in `lib/spec-coverage.test.mjs`, registered in `npm test`. Each failing case has a control.
  The leaf denominator is re-counted in the test with a plain `filter` over the raw oracle JSON, and
  the examined set for the real market-failure items is re-derived with a flat reduce over
  `specItems` — neither is read back out of the structures the implementation builds.

### E014 — the coverage line

`CoveragePanel`, `SectionExamPracticePage.jsx:159-214`; computed at `page.js:104-139`.

- The page imports `lib/spec-coverage.js` directly. No CLI shell-out, no hardcoded number.
- Measured output: market-failure **2 of 35 (5.7%)**; measures-economic-performance **0 of 48
  (0.0%)**; business-growth **0 of 16 (0.0%)**. The zeros are printed, not suppressed.
- **The number is deliberately narrower than the CLI's per-section row, and that is not a
  disagreement.** `npm run spec-coverage -- --section market-failure` reports 7 of 35 because it counts
  both banks; five of those seven leaves are tagged on `section_practice` rows that this page refuses
  to display because their tariffs do not exist in IAL Economics. The page counts the questions it
  actually shows. Both numbers come from the same function with different item lists.
- **Cross-checked by a different method.** The page's two examined ids were parsed out of the *served
  HTML*; the CLI's claim was parsed out of its *printed unexamined list*. Neither artefact is the
  structure the other was built from. Result: the denominators agree (35), the page's ids appear
  nowhere in the CLI's unexamined list, and the page's count is a subset of the CLI's. Script and
  output in this directory.
- Unexamined leaves are named, id and wording, inside a collapsed `<details>` — 33 for market-failure,
  48 for 2.3.1, 16 for business-growth. Acceptance 2's `grep -o 'ECON-1.3.5-[0-9a-z-]*'` returns all
  35 real oracle ids.
- The panel also states the untagged count ("2 of them carry no spec tag yet, so this number is a
  floor, not an estimate") and says in as many words that this is not the notes-coverage number from
  `audit/raw/spec-coverage.json`, which measures teaching text and is much higher.

### E015 — every `<details>` in the server HTML

- `curl -s` with every `<script>` block stripped: **11 `<details>` elements** for market-failure and
  for measures-economic-performance, **1** for business-growth (which has no written items, so only
  the unexamined-leaves block). Summaries in the raw HTML: the unexamined-requirements block, then
  `Mark scheme` / `Model answer — <score>` / `Examiner commentary` for each of the three items, then
  `Why this loses marks — a mid-band attempt at the same question`.
- Their *contents* are in the same response: `AO4 (6 marks)`, `Evaluation — Government failure`,
  `Level 4 — 7–8 marks` and the model-answer paragraphs all appear outside `<script>`. Nothing is
  injected after hydration.

## Gates

| check | result |
|---|---|
| `npm run build` | exit 0; `/lab/exam-practice/[section]` listed `ƒ` (dynamic) |
| `npm test` | 237 pass, 0 fail (was 227 before this packet; +13 spec-coverage, +10 mid-band, minus none) |
| `npm run validate` | exit 0 |
| `npm run exposure` | exit 0 |
| `npm run recalls` | exit 0 |
| `npm run spec-coverage` | exit 1 — unchanged from before the refactor, byte-identical stdout |
| sitemap | `curl -s localhost:3001/sitemap.xml \| grep -c lab/exam-practice` = 0; `app/sitemap.js` has no `/lab` logic |
| 390px walkthrough | 375×812, signed out: MCQs mark on click (right and wrong paths both), running score updates, **no console messages at all** on any of the three slugs |

## Two things the next session should know

1. **The dev server on 3001 was serving stale Turbopack output** for edited components — new bytes on
   disk, old HTML on the wire, identical `Content-Length` across edits. Two restarts were needed
   during this packet. Another session was actively using that server at the time (its log shows
   requests for `national-income` and `macroeconomic-objectives-policies` mid-packet); it was down for
   roughly fifteen seconds each time and is up now.
2. **The disk was at 161 MB free** when this packet started, which is not enough for `next build`.
   It recovered to 1.7 GB after the dev-server restart cleared Turbopack's cache, and the build then
   passed. It is still at 1.7 GB free on a 228 GB volume; the next packet that needs a build may not
   be so lucky.
