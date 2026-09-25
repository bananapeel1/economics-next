# Verify A — packet 12.3, ROUND 2 (re-verification after the walkthrough fix round)

Verifier: `packet-verifier` (adversarial, read-only). 21 September 2026, second pass.

Inputs: `node audit/scripts/ledger.mjs unverified 12.3` (which returned **gate clear** — every id was
already `confirmed` by round 1, so nothing was "unverified" to start from), `ledger.mjs packet 12.3`,
`ledger.mjs show E016..E022`, `git diff` + `git diff --cached`, `git show HEAD:<deleted shell>`, the
source tree, the running dev server on :3001, and the production build artefacts under `.next/`.
`audit/runs/packet-12.3/built.md` was **not** read, and neither were the builder's own
`verify-pages.mjs`, `verify-canonicals.mjs`, `shells-extracted.json`, `built-html/` or any `gate-*.log`.

Round 1's report is preserved verbatim below this section. Its evidence is now partly stale: it cites
`components/SectionModelAnswersPage.jsx:243-380`, and the fix round grew that file to 443 lines, so
those line numbers no longer point at the layout. Every verdict below is re-derived from scratch.

## What the diff actually shows changed in the fix round

Not taken on trust. `git status --porcelain` plus mtimes:

- `components/SectionModelAnswersPage.jsx` (20:18) — `codesIn()` + `<AnnotationLegend>` added at
  lines 111-129, called at line 139 (inside `<ModelAnswer>`) and line 179 (inside
  `<WhyThisLosesMarks>`).
- `components/model-answers-layout.css` (20:21) — `.lab-ann-legend` / `.lab-ann-legend-title` /
  `.lab-ann-item` at lines 208-236, and eight chip rules at lines 238-248.
- Nothing else. `app/globals.css`'s staged hunks are V038's `lm-rebuilt-*` banner and
  `app/{economics,business}/[unit]/[topic]/page.jsx`'s are `contentVersionSince` — both another
  session's packet, neither touching these routes. `components/PracticeQuestionsTab.jsx` has **no**
  diff, staged or unstaged.
- `.next/server/app/economics/[unit]/page.js.nft.json` is dated 20:33, i.e. a production build ran
  **after** both fix-round edits. The prerendered HTML under `.next/server/app/**` is therefore
  post-fix and usable as a second, independent witness to the dev server.

## Method — deliberately not the fix's method

The fix is a JSX call site plus a CSS file. Neither is inspected as source for the verdicts below.

1. **Served HTML, twice, from two engines.** All 32 URLs curled off the dev server on :3001
   (`scratchpad/probe.mjs`), and the 32 prerendered `.next/server/app/**/*-model-answers.html` files
   read straight off disk. The RSC flight payload is stripped (`split('<script>self.__next_f')[0]`)
   so every count below is of real markup, not of strings echoed in the payload — round 1's own
   per-page counts double-counted exactly that way.
2. **A markup-level chip/key audit that does not reuse `codesIn`.** For every `<details>` block in
   the served markup: delete the legend `<div>`, collect the chip codes that remain in the answer
   text, collect the codes the legend named, and diff the two sets. This asks the rendered page "is
   every coloured letter a student can see explained beside it", which is the walkthrough's own
   question — it does not ask the component whether its filter agreed with itself.
3. **Git, not the builder's extraction file**, for the 22 pre-existing canonicals.
4. **Contrast computed from first principles** (WCAG relative luminance, `scratchpad/contrast.mjs`)
   against the token values resolved by hand out of `styles/theme-night.css`, not against the numbers
   written in the CSS comment. The comment's numbers are treated as claims to test.

## Findings

### The legend regression is closed, and closed everywhere

- 657 annotation chips in the dev-server markup of the 32 pages; **1,844** in the prerendered
  production HTML. 259 `<details>` blocks scanned. **Blocks containing a chip that no legend in the
  same block names: 0.** Chips outside any `<details>`: 0.
- Per page, rendered `.lab-ann-legend` count equals the number of answer blocks that carry chips:
  32/32 agree, including the two-legend case (model answer + mid-band panel) on 29 pages and the
  zero-legend case on `/business/the-market-model-answers`, which has no questions.
- Same check against the production prerender: 32/32 files, 0 with chips and no legend.
- The legend sits **inside** the collapsed `<details>`, immediately above the paragraphs that carry
  the chips — the right place, since the chips are only visible once the student opens the answer.
- The filter is honest rather than cosmetic: the mid-band panel renders a subset of the paragraphs
  and gets a *shorter* key naming only the codes in that subset. Checked on the served markup, not
  in the component: e.g. market-failure's model answer keys K/E/A while its mid-band keys K/A/An.

### Chip contrast — measured independently, and it holds for the letters

`.rl-night` (`styles/theme-night.css:129-146`) pins `--bg-primary: #0e0f16`, `--bg-card: #1a1d2b`
and `--text-primary: #e9e7f2` on these pages **in both themes**. The chip rules key off
`[data-theme]`, which `app/layout.js:77,85` sets to `dark` (SSR default and the signed-out default)
or `light`. My own luminance maths:

| | ink on fill | chip fill vs `--lab-bg` |
|---|---|---|
| dark branch, `#10131a` on `#7cb0ff/#4ade80/#fbbf24/#c4b5fd` | 8.42 / 10.66 / 11.13 / 10.07 | 8.66 / 10.97 / 11.45 / 10.35 |
| light branch, `#ffffff` on `#1d4ed8/#036a4d/#9a4708/#6d28d9` | 6.70 / 6.62 / 6.40 / 7.10 | 2.85 / 2.89 / 2.98 / 2.69 |
| before, `#ffffff` on the tokens as `rl-night` resolved them | 2.41 / 2.28 / 1.81 / 4.23 | — |

The eight ink-on-fill figures reproduce the CSS comment's claimed 8.42 / 10.66 / 11.13 / 10.07 and
6.70 / 6.62 / 6.40 / 7.10 to the digit. `.ma-ann` is 10px/700 (`app/globals.css:5676-5686`), i.e.
small text, so 4.5:1 applies; every value clears it in both themes, against 1.81–4.23:1 before. The
rules reach the browser: the production bundle `.next/static/chunks/0q52_f~4yykdp.css` carries all
eight, the dark four correctly prefixed `[data-theme=dark]` (unquoted by the minifier), and
`.lab-page .ma-ann*` at (0,2,0) outranks globals' `.ma-ann*` at (0,1,0).

The legend's own label text is `--lab-text` on `--lab-bg` = **15.64:1**, and the rule deliberately
declines `--lab-muted`. That is the one line that keeps the key readable in light mode.

### Two residuals, both reported, neither a defect named in an id's title

1. **The light branch was written for a surround that does not exist on these pages.** Its own
   comment justifies the dark-mode ink swap on the grounds that a fill dark enough to carry white
   text "is still visible as a chip against #1e2335" — but `.rl-night` pins the surround dark in
   *both* themes, so a student on `theme=light` gets exactly that configuration: chip silhouette
   2.69–2.98:1, under the 3:1 non-text floor the comment itself invokes. The **letter** is still
   6.4–7.1:1, so nothing is unreadable and this is strictly better than the 1.81–4.23:1 it replaced.
   Worth a line in the handoff; not grounds to reject an id.
2. **`--lab-muted` in light mode** is `#5b6472` (`app/globals.css:29`) and `rl-night` does not pin
   it: **2.80:1** on `--lab-surface`, **3.20:1** on `--lab-bg`. That is `.lab-chip`'s marks / AO /
   time text, `.lab-note`, `.lab-block-sub`, `.lab-coverage-sub`, the mark-scheme `<dd>`s,
   `.lab-dr-sub` and `.lab-empty-note` — 12–13px text under AA. My numbers match the CSS comment's
   2.8 / 3.2, so the packet knew and scoped it out. `npm run contrast` cannot see any of this:
   `audit/scripts/contrast-check.mjs` reads `app/globals.css` only, and these rules live in
   `components/model-answers-layout.css`. **This is the largest thing still wrong with these pages
   and it needs its own ledger id.**

### Everything else, re-derived

- **E016** 32/32 pages: `<details open>` = 0, so every mark scheme, model answer, commentary and
  mid-band panel is in the server HTML closed rather than absent. Exactly 4 `.lab-chip` spans in
  every `.lab-item-meta` (0 headers short of command/marks/AO/time), `<summary>Mark scheme</summary>`
  and `<summary>Model answer` counts both equal the question count on every page, coverage panel on
  32/32, `.lab-dr-card` on exactly 6. Mid-band panel on 29 of the 30 pages with questions; absent on
  business `raising-finance` and `resource-management`, where no item has 2+ `answerParagraphs` and
  `lib/mid-band-answer.js` returns null by design — unchanged by this diff. Content unchanged: the
  entire 65-line diff of `data/modelAnswersData.js` is one import line and the replacement of the
  hand-typed `SECTION_MODEL_ANSWERS_LINKS` literal with a derivation. No answer, mark scheme,
  commentary or FAQ hunk exists.
- **E017** `grep -rn 'content-sections' app components lib` returns only prose comments
  (`lib/lab-data-response.js:22`, `lib/content-validator.mjs:405`) and four `*.test.mjs` files;
  nothing under `app/`. "Quick Check" appears in 0 of the 32 served pages. `app/lab/` does not exist
  and `grep -rn 'lab/exam-practice' app components lib audit/scripts` is empty. Deploy-level, which
  grep cannot reach: both `[unit]/page.js.nft.json` trace 168 files each, containing
  `audit/raw/spec-items.json`, `audit/raw/spec-coverage.json` and all six
  `content/data-response/*.md`, and **0** `audit/content-sections` entries.
- **E018** `ls -d app/{economics,business}/*-model-answers` → 0 folders. For each of the 22 shells at
  `HEAD`, its `alternates.canonical` and `openGraph.url` pulled straight out of git and compared to
  what the route serves today: **22/22 identical**, all 200. No shadowing — `/economics/unit-1`,
  `/economics/market-failure`, `/business/unit-1` and `/economics/unit-1/market-failure` all still
  200, and an unknown slug (`/economics/not-a-real-page-model-answers`,
  `/economics/definitely-nonsense`) 404s rather than rendering an empty page.
- **E019** `MODEL_ANSWER_PAGES` holds 32 rows, 22 Economics and 10 Business; all ten named sections
  (3.3.1-3.3.5, 4.3.1-4.3.4, 4.3.6) are present and 4.3.5 is not. Each of the ten serves 1-3 real
  questions with chips, mark schemes and a legend — none is an empty shell. `the-market` keeps its
  page (0 questions, `.lab-empty-note` present) and is absent from `SECTION_MODEL_ANSWERS_LINKS`,
  whose evaluated Business keys are 1.3.1, 1.3.3, 1.3.4, 1.3.5, 2.3.1-2.3.5. The exclusion is now
  derived from `MODEL_ANSWERS` via `SECTIONS_WITH_ANSWERS` rather than remembered in a comment.
- **E020** Measured on the emitted XML from `/sitemap.xml`, not on the source: 103 `<loc>`, exactly
  **32** ending `-model-answers`, 0 duplicates anywhere in the file. `app/sitemap.js:67` spreads
  `MODEL_ANSWER_PAGES` through `modelAnswersPath`; the 22 hand-typed lines are gone.
- **E021** All 32 titles, `<h1>`s and `og:title`s equal the computed
  `"<Topic> — Exam Questions & Model Answers"` rule (differences found were `&amp;` escaping only);
  32 distinct titles, 0 duplicates, the Government Intervention collision disambiguated as
  "(Unit 1)" / "(Unit 3)" by `AMBIGUOUS`. JSON-LD parsed from the markup and checked against my own
  allowlist of real schema.org properties: 31 `Quiz` blocks, **66** `Question` parts (equal to
  `MODEL_ANSWERS.length`; round 1 reported 68), 0 properties outside
  name/about/educationalLevel/hasPart and name/text/answerCount/acceptedAnswer, every
  `acceptedAnswer` a non-empty `Answer`, no HTML tags or entities leaked into any `acceptedAnswer`
  text, `eduQuestionType` omitted rather than guessed. `/business/the-market-model-answers` emits no
  `Quiz` — correct, an empty `hasPart` would assert practice that does not exist.
- **E022** `next.config.mjs:16-27` names `/economics/[unit]` and `/business/[unit]`, which are the
  real route ids, and the 20:33 `nft.json` proves the globs matched rather than silently missing.
  The `/lab/exam-practice/[section]` entry is gone with its route.
  `components/PracticeQuestionsTab.jsx` is byte-unchanged and is the only reader of
  `SECTION_MODEL_ANSWERS_LINKS` (lines 4 and 15); the derived map keeps every Economics key it had
  and adds the ten. Business 1.3.2 is the single key that leaves the map, which is what E019
  requires.

## Unclaimed but relevant

None. `ledger.mjs packet 12.3` lists exactly E016-E022 and no others; a scan of the 11 still-open
ledger items for anything matching model-answer / annotation / contrast / legend / sitemap /
canonical returns only F057 (packet 57, reorder prompts), which this diff does not touch.

The light-mode `--lab-muted` failure above has **no** ledger id and should be minted one rather than
carried in a CSS comment.

## Gate

Round 2 confirms all seven. `npm run build`, `npm test`, `npm run validate`, `npm run recalls` and
`npm run exposure` were not re-run here — they are the gate's job, and four other sessions are
mid-write in this worktree, so a red build from this tree would not be this packet's.

---

# Verify A — packet 12.3, ROUND 1 (preserved)

# Verify A — packet 12.3

Verifier: `packet-verifier` (adversarial, read-only). 21 September 2026.
Inputs: `node audit/scripts/ledger.mjs unverified 12.3`, `git diff` + `git diff --cached`, the source
tree, and the build artefacts under `.next/`. `audit/runs/packet-12.3/built.md` was **not** read, and
neither were the builder's own `verify-pages.mjs`, `verify-canonicals.mjs`, `shells-extracted.json`
or any of the `gate-*.log` files.

## Method, and why it is not the fix's method

The builder's checks (by filename) work forward from an extraction file it wrote itself and from
curls of a running server. Every check below works **backwards from artefacts the fix did not
author**:

1. **`git show HEAD:<deleted shell>`** — the twenty-two route shells as they existed before the
   packet, read directly out of git rather than out of `shells-extracted.json`. Canonicals,
   `openGraph.url`, descriptions and subtitles compared field by field against the new table.
2. **The prerendered build output** (`.next/server/app/**/*.html`, `.next/prerender-manifest.json`,
   `.next/server/app/sitemap.xml.body`, `.next/server/app/*/[unit]/page.js.nft.json`) — what Next
   actually emitted, parsed with my own regexes and my own JSON-LD property allowlist, not what a
   curl script reported.
3. **A deep A/B of `MODEL_ANSWERS` at `HEAD` against the working tree**, by importing both modules
   into one process and comparing serialisations — the only way to prove "content unchanged" that
   does not depend on reading a diff correctly.

**Build freshness was checked before trusting it.** `.next/BUILD_ID` is 19:51 today; `find app
components lib data next.config.mjs -newer .next/BUILD_ID` returns only `components/StudyApp.jsx`,
`lib/preview-limits.js` and `lib/learn-steps.test.mjs` — another session's packet-5 work, none of it
on the model-answer render path. As a second guard, the `<title>`, `<link rel=canonical>`,
`og:url`, `og:title` and `<h1>` of all 32 built pages were recomputed from the **current** source
(`modelAnswersMetaTitle` / `modelAnswersOgTitle` / `modelAnswersHeading` / `modelAnswersPath`) and
matched exactly, so the HTML I am reading is the HTML this source produces.

---

## E016 — CONFIRMED

`components/SectionModelAnswersPage.jsx:243-380` is the 12.2 layout, and the build proves each
clause across all 32 pages rather than a sample:

- **Question visible, everything else collapsed.** `<details>` count per page 1–11, `<details … open>`
  count **0 on every page**, and the string `Mark scheme` appears 2–6 times per page in the *server*
  HTML — the collapsed content ships, it is not client-rendered on toggle.
  (`components/SectionModelAnswersPage.jsx:79,96,123,133`.)
- **Command · marks · AO · time in every header.** Every `lab-item-meta` block on every page carries
  exactly 4 `lab-chip` spans; zero headers missing an AO chip, zero missing a time chip
  (`components/SectionModelAnswersPage.jsx:66-77`).
- **Coverage line, honest.** `lab-coverage` renders with a real number on all 32 —
  e.g. market-failure: "This page examines 2 of 35 requirements in 1.3.5 Market Failure 5.7%", plus
  "2 of them carry no spec tag yet, so this number is a floor". No page falls back to
  `lab-coverage-unknown` (`components/SectionModelAnswersPage.jsx:194-243`).
- **Data-response link-out where one exists.** `lab-dr-card` renders on exactly the six sections that
  have a markdown piece on disk (`content/data-response/` has six files; the six pages are
  business meeting-customer-needs / the-market / marketing-mix and economics demand /
  price-determination / market-failure) and on no other page.
- **Model-answer content unchanged.** `MODEL_ANSWERS` (66 items), `MODEL_ANSWERS_SECTIONS` and
  `SECTION_MODEL_ANSWERS_FAQ` serialise **identically** at `HEAD` and in the working tree. The only
  hunks in `data/modelAnswersData.js` are the new import (line 4) and the rewritten
  `SECTION_MODEL_ANSWERS_LINKS` (line 1423-1454).

**Caveat recorded, not a reject.** The mid-band "why this loses marks" panel renders on 30 of 32
pages. It is absent on `/business/raising-finance-model-answers` and
`/business/resource-management-model-answers` because no item in 2.3.1 or 2.3.4 has two or more
`answerParagraphs`, and `lib/mid-band-answer.js:95` returns `null` rather than cut a panel out of a
PEEL-only answer. `lib/mid-band-answer.js` is **not touched by this diff** — this is packet 12.2's
own contract, transferred faithfully, not a 12.3 regression. Fixing it needs paragraph-shaped model
answers for those two Business sections, which is content work this packet is forbidden to do.

## E017 — CONFIRMED

- `grep -rn "content-sections" app components lib` returns **no executable read from a public
  route**: the only hits are a prose comment at `lib/lab-data-response.js:22`, a comment at
  `lib/content-validator.mjs:405`, and four `*.test.mjs` files. Nothing under `app/` opens the dump.
- The Quick Check block is gone with its component: `components/lab/LabQuickCheck.jsx` and the whole
  `app/lab/` tree are deleted, and `grep -rn "LabQuickCheck\|lab/exam-practice" app components lib
  data` returns nothing.
- **Deploy-level corroboration, which greps cannot give.** `.next/server/app/economics/[unit]/page.js.nft.json`
  and its business twin list 168 traced files each; filtered to the interesting paths they contain
  `audit/raw/spec-items.json`, `audit/raw/spec-coverage.json` and the six
  `content/data-response/*.md` — and **no `audit/content-sections/` entry at all**. The stale dump
  cannot reach Vercel with these routes even by accident.

## E018 — CONFIRMED

- `ls -d app/economics/*-model-answers app/business/*-model-answers` → **0**. `ls app/economics`
  and `ls app/business` show only `[unit]`, the literal unit folders and the existing landing pages.
- One route per subject (`app/economics/[unit]/page.jsx:26-39`, `app/business/[unit]/page.jsx:18-31`),
  both delegating to `lib/model-answers-route.js:104-120`. Two files rather than one because Next
  cannot share a dynamic segment across top-level paths; the logic is single-sourced.
- **All 22 pre-existing URLs resolve.** `.next/prerender-manifest.json` contains 32 `-model-answers`
  routes (33 hits including the `/model-answers` hub), and every one of the 32 has a
  `.html` in `.next/server/app/`. Nothing is left to a request-time gamble.
- **Canonicals byte-identical.** For each of the 22 deleted shells I read
  `git show HEAD:<path>` and compared its `alternates.canonical` and `openGraph.url` to
  `modelAnswersPath(page)` and to the `<link rel="canonical">` / `og:url` in the built HTML:
  22/22 match, 0 missing. The same comparison over `description` and `subtitle` also returns
  **0 diffs**, so nothing but the title changed.
- **No shadowing of the literal routes.** `/economics/unit-1` … `/economics/unit-4` and all 22
  `/economics/unit-N/<topic>` pages, plus `/economics/market-failure`, `/economics/globalisation`,
  `/economics/aggregate-demand`, `/economics/macroeconomic-objectives` and the Business equivalents,
  are all still in the prerender manifest. The dynamic route `notFound()`s on anything else
  (`app/economics/[unit]/page.jsx:38`).

## E019 — CONFIRMED

- The ten new Economics pages are exactly the ten the spec names — 3.3.1, 3.3.2, 3.3.3, 3.3.4,
  3.3.5, 4.3.1, 4.3.2, 4.3.3, 4.3.4, 4.3.6 (`data/modelAnswerPages.js`, rows for
  types-sizes-businesses, revenue-costs-profits, market-structures-contestability, labour-markets,
  government-intervention-firms, causes-effects-globalisation, trade-global-economy,
  balance-payments-exchange-rates, poverty-inequality, growth-development). 4.3.5 has no row, as
  required.
- Each of the ten is prerendered and renders real questions: 1–2 `lab-item` entries each, 4 chips
  per header, mark schemes in the HTML. None is an empty shell.
- **Business `the-market` keeps its empty state and stays out of the map.** Its page is prerendered
  with `items=0`, the `lab-empty-note` sentence, and its data-response link; the derived
  `SECTION_MODEL_ANSWERS_LINKS.business` has keys 1.3.1, 1.3.3, 1.3.4, 1.3.5, 2.3.1–2.3.5 and **no
  1.3.2**. Verified by evaluating the map, not by reading the comment that claims it
  (`data/modelAnswersData.js:1444-1454`).
- The filter is now asked of the bank rather than remembered: `SECTIONS_WITH_ANSWERS` is built from
  `MODEL_ANSWERS`, so the-market cannot be linked by a future edit that forgets why.

## E020 — CONFIRMED

- `app/sitemap.js:59-71` spreads `MODEL_ANSWER_PAGES` through `modelAnswersPath`; the 22 hand-typed
  lines are gone and `grep -n "model-answers" app/sitemap.js` returns **one** line, the unrelated
  `/model-answers` hub.
- **Measured on the emitted XML, not on the source.** `.next/server/app/sitemap.xml.body` contains
  103 `<loc>` entries, of which **exactly 32** end in `-model-answers`, with **0 duplicates across
  the whole sitemap**, and the 32 are set-equal to `MODEL_ANSWER_PAGES.map(modelAnswersPath)` — zero
  missing, zero extra.
- "No second edit in future" holds structurally: the same array drives `generateStaticParams`, the
  sitemap and the links map, so a page cannot exist without its sitemap row.

## E021 — CONFIRMED

- **Titles.** All 32 metadata titles match `<Topic> — Exam Questions & Model Answers | Edexcel IAL
  <Subject> | Revvy Learn`; 0 fail the rule and **0 are duplicated**. The duplicate that would have
  shipped — Economics 1.3.6 and 3.3.5 are both "Government Intervention" — is caught by `AMBIGUOUS`
  (`data/modelAnswerPages.js:469-490`), computed from the table rather than hand-qualified. `<h1>`
  and `og:title` were compared to the same rule in the built HTML: 32/32 agree, so the three are
  genuinely one string and cannot drift.
- **Structured data.** I parsed every `application/ld+json` block on all 32 pages and checked each
  property against a hand-written allowlist of real schema.org properties. 31 pages emit a `Quiz`;
  **zero invented properties** on the `Quiz` (`name`, `about`, `educationalLevel`, `hasPart`) or on
  any of its 68 `Question` parts (`name`, `text`, `answerCount`, `acceptedAnswer`). Every
  `acceptedAnswer` is a non-empty `Answer` with text — no empty shells. `eduQuestionType` is
  correctly omitted rather than guessed (`components/SectionModelAnswersPage.jsx:272-286`).
- **Caveat recorded, not a reject.** `/business/the-market-model-answers` emits no `Quiz`, because it
  has no questions. An empty `hasPart` would be structured data asserting practice that does not
  exist — the precise failure mode E021's "not invented properties" clause exists to prevent. The
  page still carries its title, `<h1>` and canonical under the new rule.

## E022 — CONFIRMED

- **Tracing, verified in the build rather than in the config.** `next.config.mjs:22-32` names
  `/economics/[unit]` and `/business/[unit]`; `.next/app-path-routes-manifest.json` confirms those
  are the real route ids for the two new pages; and both
  `.next/server/app/<subject>/[unit]/page.js.nft.json` files actually list
  `audit/raw/spec-items.json`, `audit/raw/spec-coverage.json` and all six
  `content/data-response/*.md`. The glob key matches — this is the check that would have caught a
  silently non-matching key, and a green local build would not have.
- The deleted `/lab/exam-practice/[section]` entry is gone with its route, and
  `audit/content-sections/**` is not traced by anything (see E017).
- **Practice tab extended, not duplicated.** `components/PracticeQuestionsTab.jsx` is **unmodified by
  this diff**; it still reads the single `SECTION_MODEL_ANSWERS_LINKS[subject][number]` at lines
  4 and 14-16. The map gained the ten new Economics sections by derivation, and retains all 21
  entries it had before (Economics 1.3.1–2.3.6, Business 1.3.1/1.3.3–2.3.5) — compared key by key
  against the literal at `HEAD`. `grep -rn "SECTION_MODEL_ANSWERS_LINKS" app components lib data`
  shows exactly one reader; no second link path was introduced (`components/StudyApp.jsx`'s diff
  contains no model-answer reference at all).

---

## Unclaimed but relevant

Nothing. `node audit/scripts/ledger.mjs unverified 12.3` lists E016–E022 and the diff touches no
other ledger item's file. `components/StudyApp.jsx`, `lib/preview-limits.js`,
`lib/learn-steps.js`, `lib/funnel.js` and `components/LearnModeTab.jsx` are staged in this shared
worktree by **another session's packet-5 work**, not by 12.3, and are outside this packet's ids.

## Two things the gate should not read as verified

1. **E017's documentation clause** ("`built.md` states which option was taken and what it cost") was
   **not** checked: the brief forbids reading `audit/runs/packet-12.3/built.md`. The code-side half
   of E017 — no public route reads the dump — is fully verified above. Someone else must read that
   file for the prose clause.
2. **The gate commands** (`npm run build`, `npm test`, `npm run validate`, `npm run recalls`,
   `npm run exposure`) were not re-run by me. Four other sessions have uncommitted work in this
   worktree, so a run here would measure their trees as much as this packet's. The build artefacts I
   read are self-consistent with the current model-answer source, which is the narrower claim I am
   willing to make.

**Gate:** all seven ids confirmed. The packet gate should pass on the ledger, subject to the two
items above being closed by whoever owns the gate.
