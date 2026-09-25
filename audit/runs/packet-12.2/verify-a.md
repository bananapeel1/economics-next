# Verify A — packet 12.2 (the lab page)

Read-only pass, fresh context. Inputs: `ledger.mjs unverified 12.2`, `ledger.mjs show <id>`, the packet
12.2 spec in `audit/NEXT.md`, `git diff` + `git diff --cached`, and the tree. `built.md` was not read,
by instruction.

## Method — deliberately not the builder's

The builder's acceptance script is curl-against-the-dev-server plus its own `before.*/after.*` capture of
`npm run spec-coverage`. Four programme failures have come from a check that shared the fix's blind spot,
so every number below was reproduced a second way:

1. **Coverage numbers** were recomputed from `audit/raw/spec-items.json` and `data/modelAnswersData.js`
   directly, in a throwaway script that never imports `lib/spec-coverage.js` — the module under test cannot
   certify itself.
2. **E013's "byte-identical" claim** was tested against the *pre-refactor* script, not against a file the
   builder wrote: `git show HEAD:audit/scripts/spec-coverage-check.mjs` was run from a mirror tree
   (scratchpad dir whose `lib/`, `data/`, `audit/raw`, `audit/content-sections`, `audit/snapshots`,
   `audit/runs`, `audit/spec-coverage-baseline.json` are symlinks to this worktree, so its `ROOT` resolves
   to real data), and its output was diffed against the current script's across six flag combinations.
3. **SSR / `<details>`** was checked twice on two different pipelines: the dev server on 3001 **and** a
   fresh `npm run build` + `next start -p 3005` production server (stopped again afterwards). A dev-only
   check would not have caught a route that renders in dev and not in a build.
4. **The click behaviour** was driven in a real browser at 375×812 with the console read, not inferred
   from the source.
5. **Route resolution** was tested on all 43 slugs in `audit/content-sections/`, not on the two the spec
   names, plus four negative slugs.

## Verdicts

### E009 — CONFIRMED
`app/lab/exam-practice/[section]/page.js:65-76` returns `robots: { index: false, follow: false }` from
`generateMetadata`; the served HTML carries `<meta name="robots" content="noindex, nofollow">` on dev and
on the production build. `bundleFor()` (`:47-63`) resolves by scanning `audit/content-sections/` for
`*__<slug>.json`; `:81` `notFound()` otherwise.

- All **43/43** slugs return 200 (dev). Production build: `market-failure`,
  `measures-economic-performance`, `business-growth` 200.
- `not-a-section`, `Market-Failure`, `market-failure.json`, `..%2F..%2Fetc` → 404 (the `/^[a-z0-9-]+$/`
  guard at `:48` plus the file lookup).
- Zero-`modelAnswersData` section: `business-growth` (Business 3.3.2, 0 model answers, checked against
  `data/modelAnswersData.js` directly) renders 200, 42 KB, with the honest empty note at
  `SectionExamPracticePage.jsx:270-276` — not a 500 and not a blank block. 12 of the 43 sections have zero
  model answers, all of them take this path.
- Not in the sitemap: `curl /sitemap.xml | grep -c lab/exam-practice` = **0** on both servers; no file
  under `public/` and no reference to the route anywhere in `app/`, `components/`, `lib/`, `data/` outside
  the route itself.
- `npm run build` green; the route is listed `ƒ /lab/exam-practice/[section]` (server-rendered on demand),
  so nothing tries to prerender it at build time. `next.config.mjs:3-16` adds the `audit/` data to
  `outputFileTracingIncludes` — correct in principle, unverifiable here (no Vercel deploy in scope).

### E010 — CONFIRMED
`components/SectionExamPracticePage.jsx:236-251` — crumbs are `subject · unitCode · Unit n · number`, then
the title, then real counts. Market Failure renders `Economics · WEC11 · Unit 1 · 1.3.5` and
`3 written questions · 32 marks · 5 of 25 quick-check MCQs`; 4+8+20 = 32 checks out against the bank, and
25 is the real `section_quiz` row count in the t=0 bundle. All 43 bundles carry `unitCode`, `number` and
`title`, so the crumb line cannot render with a dangling separator.

- Written block is **server-rendered**: mark-scheme row text ("spill-over cost to third parties not
  reflected…"), model-answer prose ("steel factory", "Coase") and all three examiner commentaries are in
  the curl'd HTML with JavaScript never executed, on dev *and* on the production build.
- `Meta` (`:34-45`) shows command · marks · AO (`aoListFor`, `lib/exam-item.js`) · time (`timeLabel`).
  Checked across **all 66** model-answer items in every section: 0 missing an AO chip, 0 missing a time
  chip. Time comes from one constant per paper (`lib/exam-timing.js:24-30`), not per-item: Evaluate 20 in
  an Economics Unit 1 paper = 26 min, Explain 4 = 5 min, and the header states the constant it derives
  from.
- Quick Check marks on click: in a real browser at 375×812, clicking a wrong option produced
  `Not this one.` plus the explanation, `.is-right`/`.is-wrong` on the correct and picked options, all
  four buttons disabled, and the running score `0 of 1 right so far.` Console errors were HMR websocket
  noise only — no hydration error. No horizontal overflow (scrollWidth 375 = clientWidth).
- `correctIndex` exposure: the field is **not** copied under that name; `page.js:139-144` ships
  `answer: q.correctIndex` for a **5-question sample of the 25-row bank** (`QUICK_CHECK_SAMPLE`, `:42`).
  The HTML contains 5 `answer` values and 5 questions, not 25. The reasoning is written into the source at
  `components/lab/LabQuickCheck.jsx:9-24` and `page.js:35-42`: the key is in the browser because marking
  is in the browser, obfuscation would be theatre, F086's real fix is server-side marking on
  `/api/practice/questions`, which this packet does not touch. E010's clause "`built.md` states how and
  why" I did not verify — I was instructed not to read `built.md` — but the same argument is in the two
  source headers, and `built.md` is cited there by name.

### E011 — CONFIRMED (with a limit worth recording, below)
`lib/mid-band-answer.js` + `SectionExamPracticePage.jsx:102-156, 286-288`. The panel renders on the
highest-tariff item only, and its prose is the item's own `answerParagraphs` with the closing material
cut — nothing is written by the module (`mid-band-answer.js:96-124`), which is what "not invented from
nothing" requires.

- Market Failure: panel sits on `Evaluate 20` (the highest tariff), keeps Introduction + Argument 1, and
  names "Argument 2 — Intervention is not always necessary", "Evaluation — Government failure",
  "Conclusion" as removed — all three strings are in the server HTML.
- The band analysis is read from the item's own `markScheme`, and the two shapes are handled separately
  (`bandsFor`, `:60-92`): `Evaluate 20` is AO-shaped → AO4 out of reach, AO3 the ceiling; `Examine 8` is
  level-shaped → Level 4 out of reach, Level 3 the ceiling. Both verified against the real rows in
  `data/modelAnswersData.js`. No mark is invented for the attempt (`:148-153` says so explicitly).
- Checked across all 43 sections: in **0** sections does the panel land on anything other than the
  maximum-tariff item.
- **The limit:** `planning-raising-finance` (2.3.1) and `resource-management` (2.3.4) render no panel at
  all, because both of their items — including the `Discuss 8` — carry a single `answerParagraphs` entry
  and no `peel`, so there is nothing to cut without writing new prose. `midBandAttempt` returns null and
  the component renders nothing. That is the honest outcome under this item's own "not invented from
  nothing" constraint rather than a gap in the fix, so this is a confirm, not a reject; it is recorded
  here because the fix for those two sections is *content* (give those items real paragraphs), not code.

### E012 — CONFIRMED
`lib/lab-data-response.js:60-91` + `SectionExamPracticePage.jsx:295-307`. Market Failure renders exactly
one card, `href="/data-response/econ-u1-market-failure"`, and that live page returns 200.
`measures-economic-performance` and `business-growth` render **no** data-response markup at all (grep
count 0) — no placeholder, no dead link. The stimulus is not re-rendered anywhere on the lab page.

The map is a third copy of a list that already exists twice in `app/data-response/` (neither is exported,
and editing a live indexed route is out of scope for this packet). I checked the copy rather than trusting
it: all six slugs and all six titles match the `PIECES` array in `app/data-response/page.jsx:16-53`
exactly, all six `content/data-response/*.md` files exist, and all six section slugs exist in
`audit/content-sections/`. Drift is additionally fenced by the `fs.accessSync` guard at `:85-89`, which
turns a stale entry into no block rather than a 404 link.

### E013 — CONFIRMED
`lib/spec-coverage.js:166-232` holds the computation; `audit/scripts/spec-coverage-check.mjs:53, 70-71,
188-201` imports and calls it, and the diff removes the whole inline block (`leavesByTopic`, the three
failure rules, the untagged count, the command histogram) from the CLI. No other module in `app/`, `lib/`,
`components/` or `audit/scripts/` computes question-coverage over `kind: 'leaf'` rows —
`lib/content-validator.mjs` measures teaching coverage, which is a different claim and is documented as
such in both headers.

Byte-identical proof, pre-refactor script vs current, run side by side:

| invocation | result |
|---|---|
| `npm run spec-coverage` | identical, exit 1 both |
| `-- --section market-failure` | identical, exit 1 both |
| `-- --section measures-economic-performance` | identical, exit 1 both |
| `-- --json` | identical (1,296 lines), exit 1 both |
| `-- --baseline` | identical, exit 0 both |
| `-- --staged` | identical, exit 1 both |

(The only textual difference in the raw capture is Node's own `MODULE_TYPELESS_PACKAGE_JSON` warning
naming a different first-loaded module; stripped, the streams are `cmp`-equal.)
`npm test` is green at 237/237 and now includes `lib/spec-coverage.test.mjs` (13 tests, including one that
counts the denominator out of the oracle independently of the module) and `lib/mid-band-answer.test.mjs`.

### E014 — CONFIRMED
`page.js:102-131` calls `sectionCoverage`/`describeLeaves`/`loadOracle` from `lib/spec-coverage.js`
directly — no CLI shell-out, no constant. `SectionExamPracticePage.jsx:159-214` renders
"This page examines N of M requirements in `<number> <title>`" with the percentage, the examined leaf ids
with their spec wording, and the unexamined ones in a collapsed `<details>`.

Recomputed independently from `audit/raw/spec-items.json` + `data/modelAnswersData.js`, without importing
the module:

| section | independent | page (dev) | page (prod build) |
|---|---|---|---|
| market-failure 1.3.5 | 2 of 35, 5.7%, ids `ECON-1.3.5-2c-3`, `ECON-1.3.5-2d-2` | 2 of 35, 5.7% | same |
| measures-economic-performance 2.3.1 | 0 of 48, 0.0% | 0 of 48, 0.0% | same |
| business-growth 3.3.2 | 0 of 16, 0.0% | 0 of 16, 0.0% | same |

The number is not rounded up and the zero cases say zero. 35 real leaf ids appear in the market-failure
HTML with their wordings (`<code>ECON-1.3.5-1b-1</code> externalities`), which is the real oracle and not a
placeholder. The floor caveat renders too ("2 of them carry no spec tag yet…"), and the page states that
it counts only its own three questions — deliberately narrower than the CLI's 7 of 35 across both banks,
as the spec requires.

### E015 — CONFIRMED
Counted in the server HTML with JavaScript never executed, on both pipelines:

| section | `<details>` | with `open` | content present |
|---|---|---|---|
| market-failure | 11 | 0 | mark-scheme rows, model-answer prose, all 3 commentaries, mid-band panel |
| measures-economic-performance | 11 | 0 | same shape |
| business-growth | 1 | 0 | the coverage `<details>` (16 unexamined leaves) |

11 = 1 coverage + 3 items × (mark scheme + model answer + commentary) + 1 mid-band, which is exactly what
the data predicts. Every block is closed-but-present: collapsed, never client-fetched.

## Unclaimed but relevant

Nothing in the ledger is assigned to packet 12.2 and unclaimed — the packet's 7 ids are its whole
allocation. Two open items sit next to this work and were correctly **not** touched (both would require
editing live student-facing pages, which the packet spec forbids):

- **V024** (packet 2.6, open) — `components/PracticeQuestionsTab.jsx` still carries the UK GCE tariff
  ladder. The lab page uses the IAL ladder via `lib/practice-tariffs.js` and refuses to display the four
  invalid-tariff `section_practice` rows, so the two surfaces now disagree in public. Status untouched.
- **V002** (packet 57, open) — the live Practice tab's 20-mark Evaluate with only a "Show Guidance"
  reveal; the lab page is the counter-example to it but does not fix it. Status untouched.

Also noted, not acted on: the staged index of this worktree contains several other sessions' files
(packet 5's `LearnModeTab.jsx`/`StudyApp.jsx`/`app/page.js`/`route.js` work, packet 32-35 deletions). None
of it belongs to packet 12.2 and none of it was judged here; whoever commits must stage by path.

## Gate

Verify A passes: 7 of 7 confirmed, `npm run build` green, `npm test` 237/237, `npm run spec-coverage`
byte-identical across six invocations. Verify B (390×844 walkthrough of the three sections) still owes its
report, and the `built.md` clause inside E010 was not checked by this pass, by instruction.
