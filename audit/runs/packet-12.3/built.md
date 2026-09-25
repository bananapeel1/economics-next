# Packet 12.3 — built

Transfer of the packet 12.2 lab page onto the live model-answer routes. Code and routing only: no
model answer was written, edited or deleted, no DB write, no publish. `MODEL_ANSWERS` and
`modelAnswersExpansion.js` are byte-identical to HEAD.

**STAGED, NOT COMMITTED.** Four other sessions are live in this worktree and one of them ran
`next build` on top of this one mid-verification (see "What went wrong" below).

## The two decisions the spec left open

**1. Quick Check: OMITTED (E017 — the "acceptable" option, not the "preferred" one).**
The lab page's Quick Check read its MCQs from the t=0 dump under `audit/`, frozen since
12 September. The spec allows either sourcing them live from `section_quiz` or dropping the block.
Dropped, for two reasons and one cost:

- *Rule 2.* These 32 pages are prerendered (`generateStaticParams`), so a DB-sourced Quick Check
  means either a Supabase read during `next build` or making 32 SEO pages render on demand. The
  first is the fault that broke every Vercel preview for a day in packet 5; the second trades a
  static page for a per-request round trip on the surface that ranks.
- *Exposure.* Marking an MCQ in the browser puts the answer key in the browser. Packet 12.2 shipped
  5 of 25 behind `noindex` and documented the reasoning; doing the same under an indexed canonical
  URL publishes part of the paid bank (`section_quiz`, F086's subject) to crawlers.
- *What it cost:* the live pages lose the interactive MCQ block — an engagement surface and a
  reason to stay on the page. The written half (question, tariff, mark scheme, model answer,
  examiner commentary, mid-band panel, coverage line) is the SEO value and all of it transferred.
  The section's real quiz is one tap away in the app, which the page's CTA links to.

The block's component and its 38 lines of CSS are deleted rather than left orphaned, so nobody
re-enables a stale reader by uncommenting it.

**2. `the-market`, and which map reaches 32.** E019 says Business 1.3.2 stays out of
`SECTION_MODEL_ANSWERS_LINKS`; E020 says the sitemap derives "from the same map" and emits 32. Only
31 sections have model answers, so both cannot be the same list. The brief flagged this and left it.
**The rule taken, stated once so a verifier can check it against something:**

> A *page* is declared in `data/modelAnswerPages.js` (32 rows). `generateStaticParams` and
> `app/sitemap.js` both walk that table, so a page and its sitemap entry cannot exist without each
> other. `SECTION_MODEL_ANSWERS_LINKS` is *derived from it*, filtered to sections that actually have
> a model answer in the bank (31), because that map decides whether the Practice tab offers a link
> and a link to a page with no questions on it is a broken promise.

`the-market` therefore keeps its page, its honest empty state and its sitemap entry, and stays out
of the links map — automatically, from the bank, rather than by a comment somebody has to remember.
Its comment is rewritten, not removed. A section that gains its first model answer gains its
Practice-tab link with no edit at all.

## Per ledger id

### E016 — `SectionModelAnswersPage` renders the 12.2 question-first layout
`components/SectionModelAnswersPage.jsx` (rewritten, 93 → 403 lines). It was a shell around
`ModelAnswersPage`, the card grid; it now renders the lab layout:

- `Meta` at `:66` — command · marks · AO · time, the time from one constant per paper
  (`lib/exam-timing.js`), not a per-question guess.
- `MarkScheme` `:79`, `ModelAnswer` `:96`, `ExaminerCommentary` `:123` — each a CLOSED `<details>`,
  so every word is in the server HTML. Measured: 31 of 31 pages with questions carry "Mark scheme"
  in the prerendered bytes (`verify-pages.log`).
- `WhyThisLosesMarks` `:134` on the highest-tariff item, from `lib/mid-band-answer.js`. Renders on
  29 of 31; Business `raising-finance` and `resource-management` still cannot build one without
  content authoring — that is E011's documented limit from packet 12.2, unchanged and not hidden.
- `CoveragePanel` `:191` — the honest coverage line, present on all 32 pages including the empty one.
- Data-response link-out `:372` via `lib/lab-data-response.js`. Renders on exactly the six sections
  with a live piece on disk, and on no others.
- The empty state, the FAQ schema, the back link and the "now try one yourself" CTA are packet
  12.1's and are kept.

`components/section-exam-practice.css` → `components/model-answers-layout.css`. The `lab-` class
prefix is unchanged on purpose (renaming forty selectors is churn a student cannot see). What DID
change is the theming: on `/lab` that stylesheet owned the viewport and carried its own light and
dark palettes, and dropped inside `.resource-page` it would have painted a light island in a dark
page. Every `--lab-*` token is now an alias of the site token that already exists, with packet 12.2's
literal kept as the `var()` fallback, and the `prefers-color-scheme` block is gone — the site
switches on `[data-theme]`, and a media query would override the reader's own choice
(`components/model-answers-layout.css:1-45`).

### E017 — Quick Check
Decision and cost above. `components/lab/LabQuickCheck.jsx` deleted; Quick Check CSS deleted
(`components/model-answers-layout.css:97`). `grep -rn "content-sections" app/economics app/business
components | grep -v lab` → **no hits**, including in comments (the prose was reworded so the
acceptance grep is not tripped by a file that merely talks about the hazard).

### E018 — one dynamic route, 22 shells gone
`app/economics/[unit]/page.jsx` and `app/business/[unit]/page.jsx` (new, one per top-level segment),
both thin shells over `lib/model-answers-route.js` (new). 22 `-model-answers/page.js` folders
deleted; `ls -d app/{economics,business}/*-model-answers | wc -l` → **0**.

**Why the param is called `unit` when it holds a page slug.** `app/economics/[unit]/[topic]/page.jsx`
already owns the dynamic slot at that segment and Next.js refuses two different slug names on one
path segment — `[slug]` beside `[unit]` is a build error, not a preference. The file therefore lives
inside the existing `[unit]` folder and reads the param straight into `slug`
(`app/economics/[unit]/page.jsx:9-17` explains it in the source).

**All 22 pre-existing URLs, proved and not sampled.** `audit/runs/packet-12.3/verify-canonicals.mjs`
reads each shell back out of **git at HEAD** — the committed copy, which nothing in this packet
touched — and compares it against the HTML Next actually prerendered. Neither side is the page table
the fix was built from, so a mistake in that table cannot agree with itself. Result: **PASS 22/22**,
canonical and `og:url` identical, titles and `<h1>`s retitled.

Runtime, against `next start`: 32 of 32 URLs return 200, three unknown slugs return 404, and none of
`/economics/unit-1`, `/economics/market-failure`, `/economics/aggregate-demand`,
`/economics/globalisation`, `/economics/macroeconomic-objectives`, `/business/unit-2`,
`/economics/unit-1/market-failure` is shadowed by the new dynamic route.

### E019 — the ten Economics sections
`data/modelAnswerPages.js` rows for 3.3.1–3.3.5, 4.3.1–4.3.4 and 4.3.6, at
`/economics/<section-id>-model-answers`. `SECTION_MODEL_ANSWERS_LINKS.economics` is 12 → **22**
keys, `.business` stays at **9** with 1.3.2 absent.

Each section number was matched to its slug, unit and unit code by reading each section bundle's own
`meta` rather than by inferring from a title, and the generator throws on a mismatch
(`audit/runs/packet-12.3/gen-model-answer-pages.mjs:54`). Each of the ten has at least one model
answer in the bank whose tariff exists in IAL Economics (1–2 each; measured, not assumed), and each
renders at least one question in the built HTML. 4.3.5 has no row: no model answer examines it, and
a page that ranks for a question it cannot answer is worse than no page.

### E020 — sitemap derived
`app/sitemap.js:59-72`. Twenty-two hand-typed lines in two blocks replaced by one spread over
`MODEL_ANSWER_PAGES`. Counted off the **built** `sitemap.xml` rather than the source: **32**
model-answer URLs, 22 Economics and 10 Business, `the-market` included, **zero duplicates** — and
zero duplicates across all 103 URLs in the file.

### E021 — titles and structured data
One rule for all 32 pages, in one place (`data/modelAnswerPages.js`, `modelAnswersHeading`):
`<Topic> — Exam Questions & Model Answers`, used for the `<h1>`, the metadata title and the OG
title. No row carries a title of its own.

**A collision the retitling created and the code now closes.** IAL Economics 1.3.6 and 3.3.5 are
both called "Government Intervention", so one title rule would have given two live pages one
`<title>`. The heading appends the unit **only for topics that collide**, computed from the table —
so a second collision cannot ship unqualified. 32 titles, 32 distinct.

`Quiz` JSON-LD per page, one `Question` per written item. Every property is a real schema.org
property of the type it sits on (`about`, `hasPart` from CreativeWork; `name`, `text`, `answerCount`,
`acceptedAnswer` from Question). `eduQuestionType` is **omitted rather than guessed**: its documented
values are the multiple-choice family and these are extended written answers. A page with no
question emits no `Quiz` at all. `verify-pages.mjs` parses each block rather than pattern-matching
it, asserts the question count matches what the page displays, rejects any property outside that
set, and fails on HTML left inside `acceptedAnswer`. 31 Quiz blocks, 0 problems. The packet-12.1
`FAQPage` block is untouched.

### E022 — tracing and the Practice tab
`next.config.mjs:16-27`: the `/lab/exam-practice/[section]` entry is replaced by `/economics/[unit]`
and `/business/[unit]`, tracing `./audit/raw/spec-items.json`, `./audit/raw/spec-coverage.json` and
`./content/data-response/**`. The t=0 section dump is deliberately NOT traced, with the reason in
the config. **This is the one item a local build cannot prove** — it fails only on Vercel.

`components/PracticeQuestionsTab.jsx` is **unchanged**, which is what "extend, do not duplicate"
asks for: it already reads `SECTION_MODEL_ANSWERS_LINKS[subject][number]`, and the ten new sections
appear there because the map is derived from the page table.

## `/lab` is gone

`app/lab/exam-practice/[section]/page.js`, `components/SectionExamPracticePage.jsx` and
`components/lab/LabQuickCheck.jsx` are deleted; `app/lab/` no longer exists. The founder's private
view of this layout is gone with it — the layout is now what `/economics/<topic>-model-answers`
serves, so looking at any of those 32 URLs is looking at the lab page. Said again in the handoff.

## Gate

| check | result |
|---|---|
| `npm run build` | exit 0 (`build.log`) |
| `npm test` | exit 0, 240 pass / 0 fail |
| `npm run validate` | exit 0 |
| `npm run recalls` | exit 0 — "no section is worse than the baseline" |
| `npm run exposure` | exit 0 |
| acceptance 1 (no shells) | 0 |
| acceptance 2 (22 canonicals vs HEAD) | PASS 22/22 |
| acceptance 3 (ten new URLs, ≥1 question) | 200 and 1–2 questions each |
| acceptance 4 (mark scheme in server HTML) | 31/31 pages with questions |
| acceptance 5 (sitemap) | 32, no duplicates |
| acceptance 6 (`content-sections` grep) | no hits |
| acceptance 8 (`lab/exam-practice` grep) | no hits |

## What went wrong, so the next session does not lose an hour to it

1. **Another session wiped `.next` mid-verification.** `verify-pages.mjs` reported 0 pages while a
   concurrent `next build` (packet 2.3's) was rewriting the directory it was reading. Nothing was
   wrong with this packet's build, which had already exited 0. **Verification that reads `.next` in
   this worktree must snapshot first**: the build output for all 32 pages is copied to
   `audit/runs/packet-12.3/built-html/` the moment the build finishes, and both verify scripts read
   the snapshot, not the live directory.
2. **A check failed on all 32 pages while all 32 were correct.** The coverage-line assertion looked
   for the sentence a human reads; React's SSR separates adjacent text nodes with `<!-- -->`, so the
   bytes say `examines <!-- -->2<!-- --> of <!-- -->35<!-- --> requirements`. Reading the raw HTML
   settled it. A green assertion over server HTML is worth no more than the regex under it.

## Files

Staged (`git add` by path; nothing committed, `audit/ledger.json` not staged):

```
app/economics/[unit]/page.jsx            new
app/business/[unit]/page.jsx             new
lib/model-answers-route.js               new
data/modelAnswerPages.js                 new — the 32-row page table
data/modelAnswersData.js                 SECTION_MODEL_ANSWERS_LINKS derived; MODEL_ANSWERS untouched
components/SectionModelAnswersPage.jsx   rewritten
components/model-answers-layout.css      renamed from section-exam-practice.css, retheming + MCQ CSS cut
app/sitemap.js                           model-answer block derived
next.config.mjs                          tracing follows the route
app/{economics,business}/*-model-answers/page.js   22 deleted
app/lab/exam-practice/[section]/page.js            deleted
components/SectionExamPracticePage.jsx             deleted
components/lab/LabQuickCheck.jsx                   deleted
components/section-exam-practice.css               renamed away
```

Working output in `audit/runs/packet-12.3/`: `gen-model-answer-pages.mjs` (built the page table from
the shells), `shells-extracted.json` (what the 22 shells held), `verify-canonicals.mjs`,
`verify-pages.mjs` + `verify-pages.log`, the four gate logs, `build.log`, and `built-html/` (2.2 MB
snapshot, deliberately left unstaged).

---

## Fix round B1 — the annotation legend, and the chips it keys (21 September 2026, Opus 5)

One defect, the blocking one from Verify B. The three non-blocking defects (mid-band panels topping
out in the model answer's own band, `0.0%` coverage on 21 Economics pages, `the-market`'s title and
its dead "link above") are **untouched and unmentioned elsewhere in this section** — they are the
founder's calls and a fix round is not where they get made.

### What was wrong, and what it actually was

Two faults, not one, and the second was invisible until the first was fixed.

1. **The key was never rendered.** The chips themselves are inside the answer HTML in
   `data/modelAnswersData.js` (`<span class="ma-ann ma-ann-blue">K</span>`), so they transferred with
   the content and needed nothing. The KEY was a component argument —
   `components/ModelAnswersPage.jsx:377` passes `answer.annotationLegend` into `AnnotationLegend`
   (`:77`) — and the 12.3 rewrite carried the answer body across without that call. All 66 items in
   the two data files still carry `annotationLegend`; nothing was missing from the content.
2. **The chips were illegible anyway.** Restoring the key alone would have produced a legible key
   beside unreadable chips. `app/globals.css:5676-5690` paints them `color: white` on
   `var(--accent-blue)`, `var(--accent-amber)`, `#22c55e` and `#8b5cf6`. The page's real default is
   `data-theme="dark"` (`app/layout.js:85` — a student with cleared storage gets dark), where that
   resolves to **3.68, 2.15, 2.28 and 4.23 to one**. All four are under the 4.5:1 AA floor for text
   this small; amber and green are under 3:1, which is the floor for a non-text indicator too.

### What changed

`components/SectionModelAnswersPage.jsx`

- `AnnotationLegend` restored, in this file rather than imported: `ModelAnswersPage.jsx` is a client
  component and this page is server-rendered, so the key is now in the served HTML and can be curled.
- Rendered **twice per item, where the chips are**: inside the `Model answer` `<details>` above the
  paragraphs (the position `ModelAnswersPage.jsx:377` uses), and inside the `Why this loses marks`
  panel above the kept paragraphs. The mid-band panel renders its own chips and had none of its own
  key; the first draft of this fix rendered one legend per item and left that panel unkeyed.
- `codesIn()` filters the key to the codes that appear in the block it sits above. The mid-band panel
  shows a SUBSET of the model answer's paragraphs, so the unfiltered legend named codes that are not
  in the text beneath it. Measured on `market-failure` item 2: model answer keys K/A/An/E, the
  mid-band panel keys K/A/An, and its chips are K/A/An.

`components/model-answers-layout.css`

- `.lab-ann-legend` / `.lab-ann-legend-title` / `.lab-ann-item`. A new class rather than globals'
  `.ma-ann-legend`, which is padded `0 20px` for the `/model-answers` card grid and would have hung
  off the inside of a `<details>`.
- `.lab-page .ma-ann*` overrides the four fills. Light mode keeps white ink on a deeper fill; dark
  mode takes near-black ink (`#10131a`) on a brighter fill, because no fill dark enough to carry
  white text at 4.5:1 is still visible as a chip against `#1a1d2b`.
- Literals, deliberately. The tokens are what produced the failing values, `--accent-*` is shared
  with most of the product, and globals' own `ACCEPTED_LITERALS` already exempts `.ma-ann-*` for the
  same reason: these are fixed ink-on-fill pairs that must hold their ratio in both themes.

### Measured, in the browser, on the rendered DOM

`getComputedStyle` on real chips at 390×844, storage cleared, both themes. Not the stylesheet — the
values the browser actually resolved.

| chip | dark before | dark after | light before | light after |
|---|---|---|---|---|
| K blue | 3.68 | **8.42** | 6.70 | **6.70** |
| A amber | 2.15 | **11.13** | 6.40 | **6.40** |
| An / E green | 2.28 | **10.66** | 2.28 | **6.62** |
| D purple | 4.23 | **10.07** | 4.23 | **7.10** |

Font size held at 10px: 4.5:1 is the small-text floor and the fix meets it there, so nothing was
gained by enlarging the chip and reflowing every answer paragraph to do it.

### Independently verified

Evidence located by a different route than the fix, three ways:

1. **URL list from `sitemap.xml`**, not from `SECTION_MODEL_ANSWERS_LINKS` — the map the route
   itself reads. 32 URLs, 32 × HTTP 200.
2. **Served HTML, script tags stripped** (so the RSC flight payload cannot double-count): 922 chips,
   95 legends, **0 pages that print a chip and no key** (was 0 legends on all 31). Then the stronger
   form: of the **95 answer blocks that contain a chip, 95 carry a key, and every distinct code in
   every block appears in that block's own key** — 0 exceptions.
3. **The prerendered build output**, `.next/server/app/**/*-model-answers.html`, which is produced by
   `next build` and not by the dev server: same 31 pages with ≥2 legends each, `the-market` with 0
   chips and 0 legends, as it should be.

### The guard, as briefed

**`npm run contrast` exited 0 through this entire regression and still does.** Two independent
reasons, and only the first was guessed in the brief:

- `audit/scripts/contrast-check.mjs:24` reads **`app/globals.css` and nothing else**. Neither the lab
  tokens nor this fix's rules live there, so the guard could never have scored either.
- Even inside `globals.css` it could not have caught this one. `.ma-ann` declares `color: white`
  while its background comes from a *sibling* rule (`.ma-ann-blue`, `.ma-ann-amber`, …). The guard
  scores a `color:` against a surface it can resolve, and a background declared in a different rule
  set is not one. The `.ma-ann-*` rules are also in `ACCEPTED_LITERALS`, so the literal check stayed
  quiet too.

**Do not read a green `contrast` run as evidence that anything on these 32 pages is legible.**

Cheap close, NOT done here and deliberately out of this packet's scope: give the checker a
same-base-class join — when a rule declares `color:` and no background, look for `background:` on
rules whose selector is the same element with one extra class (`.x` → `.x-blue`), and score the
`color:` against each. That is a handful of lines against the existing selector parser and would
have caught this. Widening it to read component CSS files is the larger, separate job.

### Two things found while measuring, NOT fixed, reported for the founder

1. **`--lab-muted` is wrong whenever the student picks light mode.** `.lab-page` sits inside
   `.resource-page.rl-night`, which pins `--bg-*` and `--text-primary` to the dark palette whatever
   the site theme is — but not `--text-muted-alt`, which `--lab-muted` aliases. Choose light and
   every muted string in the transferred layout becomes `#5b6472` on `#0e0f16`: measured **2.8:1** on
   `.lab-block-sub` and `.lab-coverage-sub`, **3.2:1** on `.lab-note` and on the **mark-scheme
   descriptions**, which are the page's core content. This is pre-existing to this fix round, it is
   not one of the three deferred defects, and it is one line in `model-answers-layout.css`. This
   round only kept its own new rule out of it: `.lab-ann-legend` takes `--lab-text` (measured 15.64:1
   in both themes), not `--lab-muted`.
2. **`components/ModelAnswersPage.jsx` is NOT unreachable.** `app/model-answers/page.js:1` still
   imports it for the `/model-answers` hub. Its legend at `:377` is intact, and its chips still carry
   the failing globals contrast, because the fix above is scoped to `.lab-page`. Unchanged by this
   packet, and a fix would mean editing `app/globals.css`, which currently holds another session's
   staged V038 work.

### Gate, re-run after the fix

`npm run build` exit 0 · `npm test` exit 0 · `npm run validate` exit 0 · `npm run recalls` exit 0 ·
`npm run exposure` exit 0 · `npm run contrast` exit 0.
Logs: `build-fixB1.log`, `gate-test-fixB1.log`, `gate-validate-fixB1.log`, `gate-recalls-fixB1.log`,
`gate-exposure-fixB1.log`, `gate-contrast-fixB1.log`.

Files staged by this round, by path and nothing else: `components/SectionModelAnswersPage.jsx`,
`components/model-answers-layout.css`, `audit/runs/packet-12.3/built.md`. **Not committed.**
`audit/PROGRESS.md` was NOT re-staged — the packet-12.3 handoff in `NEXT.md` asks the fix round to
re-stage it, and this round's brief forbids editing it. The brief was followed; the next session
should reconcile the PROGRESS row.
