# Packet 12.3 brief — work list only, no results

Produced by a brief-only harness run. Nothing below is a measurement, test outcome, build result, or
verification claim. Every "done means" line is read off `audit/NEXT.md`'s Packet 12.3 spec block
(lines 1-95) and cross-checked against the current source tree by grep/read, not executed. Source
counts below were produced by reading files and `ledger.mjs`, commands shown.

## Commands run to produce this brief

```
node audit/scripts/ledger.mjs packet 12.3            # 7 ids, all "feature", all "open"
node audit/scripts/ledger.mjs packet 12.3 --open      # same 7 — nothing already closed
node audit/scripts/ledger.mjs show E016 .. E022       # full record per id, saved to
                                                       # audit/runs/packet-12.3/ledger-show-all.txt
```
Both outputs saved in this directory (`ledger-packet-12.3-open.txt`, `ledger-show-all.txt`).

## The 7 open ids (all added 2026-09-21, packet 12.3, kind `feature`)

| id | title (ledger) | file (ledger) |
|---|---|---|
| E016 | SectionModelAnswersPage renders the 12.2 question-first layout; model-answer content unchanged | `components/SectionModelAnswersPage.jsx` |
| E017 | Quick Check serves published DB content or is absent; no public route reads audit/content-sections | `components/SectionModelAnswersPage.jsx` |
| E018 | One dynamic route replaces the 22 hand-written shells; all 22 URLs resolve with canonicals unchanged | `app/economics` |
| E019 | Ten Economics sections with data but no page get one; Business the-market keeps its empty state | `data/modelAnswersData.js` |
| E020 | sitemap.js derives model-answer URLs from the map and emits exactly 32 | `app/sitemap.js` |
| E021 | Titles retitled to 'Exam Questions & Model Answers'; valid Quiz/QAPage structured data | `components/SectionModelAnswersPage.jsx` |
| E022 | next.config.mjs tracing covers the new route; Practice tab links extended, not duplicated | `next.config.mjs` |

None already `closed_by` or `verified_by`. No `note` field on any. This is a CODE/ROUTING packet, not
a content packet — none of these ids cite a spec leaf number, so Rule 1's "check the ledger item's
scope against `audit/raw/*_spec.txt` by wording, not by number" does not directly bite here. The one
place a spec-shaped check DOES apply is E019's ten section numbers (3.3.1–3.3.5, 4.3.1–4.3.4, 4.3.6) —
these were cross-checked against `data/modelAnswersData.js`'s own `MODEL_ANSWERS_SECTIONS` table
(read directly, lines 1373–1393), not against `econ_spec.txt`, because they are literal keys already
live in that data structure (minted at packet 12.1/E005, per the file's own comments) rather than a
fresh citation to verify. They match exactly.

**Step 3 (spec-coverage.json missingItems/thinItems) is not applicable to this packet.** That step is
for a CONTENT packet; the computed task and `NEXT.md` both say explicitly "No content authoring. No
new model answers. No DB write." No candidate claims were pulled from `audit/raw/spec-coverage.json`.

## Source-of-truth documents read (full list, per the task's instruction not to trust a summary)

- `audit/PROTOCOL.md` (150 lines, read in full) — lifecycle, gate order, invariants (atomic commit by
  path, never `git add -A` then commit separately; ledger via CLI only; content snapshot-first).
- `audit/NEXT.md` lines 1–95, the "## Packet 12.3 spec" block (read in full) — this is the primary
  source for everything below.
- `audit/NEXT.md` lines 96–120+, the newest Handoff ("written 21 September 2026, after packet 38") —
  concerns packet 38/39/40 and a shared-file race; no overlap with 12.3's files
  (`SectionModelAnswersPage.jsx`, the 22 route shells, `data/modelAnswersData.js`,
  `app/sitemap.js`, `next.config.mjs`). Its lesson ("stage explicitly, re-read the top of NEXT.md
  immediately before appending, never `git add -A`") is a live operational constraint for whoever
  builds this packet, not a content constraint.
- `audit/PROGRESS.md` — **no row exists yet for packet 12.3** (grepped `| 12\.3 ` — zero hits). Row 31
  is packet **12.2** ("The lab page"), done and verified 2026-09-21, gate clear, staged not committed
  per its own row text (contradicts nothing — 12.2 is the prerequisite this packet reads).
- `audit/DECISIONS.md` — read the "## Settled" section header and scanned entries; none of the
  ~2026-09-21 entries (packet 37, 38) touch model-answers routing, the sitemap, or
  `SECTION_MODEL_ANSWERS_LINKS`. Nothing settled there constrains or contradicts this packet.
- `audit/CONTENT-GATE.md` — skimmed section headers; it is the content-authoring gate (layers 1–8, the
  recall contract). Not applicable: this packet authors no content and writes no `data`/`draft`/live
  content rows.
- `audit/EXAM-PRACTICE.md`, "## Packet 13.11 — Transfer, and finish the set" (read in full, lines
  255–274) — **this is the packet under its old number, and `NEXT.md` states its arithmetic is wrong
  and not to build to it.** Quoted here as the CLAIM it is, not as a target: it says "43 pages live...
  sitemap.xml count rises by 21" and "Economics 12 → 23, Business 10 → 20." `NEXT.md`'s corrected
  version (below) supersedes this explicitly and is what the acceptance checks are built from.

## What must become true — quoted verbatim from `NEXT.md`, ids E016–E022

> E016: `components/SectionModelAnswersPage.jsx` renders the 12.2 question-first layout: question
> visible, mark scheme / model answer / examiner commentary in SSR'd collapsed `<details>`, command ·
> marks · AO · time in every header, the mid-band "why this loses marks" panel on the highest-tariff
> item, the data-response link-out where one exists, and the honest coverage line. The existing
> model-answer CONTENT is unchanged — it lives in the data file, and this packet does not edit
> `data/modelAnswersData.js`

> E017: Quick Check either serves published DB content or is absent. `grep -rn "content-sections"
> app/economics app/business components` returns nothing that a public route reaches. `built.md`
> states which option was taken and what it cost

> E018: One dynamic route replaces the 22 hand-written shells (12 under `app/economics/`, 10 under
> `app/business/`), with `generateStaticParams` and per-section `metadata` derived from
> `SECTION_MODEL_ANSWERS_LINKS` + `MODEL_ANSWERS_SECTIONS`. No `-model-answers/page.js` folder
> survives. Every one of the 22 existing URLs still resolves with its canonical unchanged — prove it
> by curling all 22, not a sample

> E019: The ten Economics sections with data and no page (3.3.1, 3.3.2, 3.3.3, 3.3.4, 3.3.5, 4.3.1,
> 4.3.2, 4.3.3, 4.3.4, 4.3.6) have pages, added to `SECTION_MODEL_ANSWERS_LINKS`. Business
> `the-market` (1.3.2) keeps its honest empty state and stays absent from that map — the comment
> there explains why; do not "fix" it

> E020: `app/sitemap.js` derives its model-answer URLs from the same map instead of hand-listing them,
> and emits exactly 32. A section added to the map in future appears in the sitemap with no second
> edit

> E021: Titles become "`<Topic>` — Exam Questions & Model Answers" (metadata title, `<h1>`, and OG),
> so the page can rank for the practice-question family as well. `Quiz` or `QAPage` structured data on
> every page, validating against schema.org's required fields — not invented properties

> E022: `next.config.mjs` tracing covers the new route. Each section's Practice tab links to its page
> where one exists (`SECTION_MODEL_ANSWERS_LINKS` already drives this in `PracticeQuestionsTab.jsx` —
> extend, do not duplicate)

## The arithmetic in scope — quoted from `NEXT.md`, re-counted independently against the tree

`NEXT.md` states the plan's original arithmetic ("Economics 12 → 23, Business 10 → 20", "+21" sitemap
— that is `EXAM-PRACTICE.md`'s Packet 13.11 figure) is wrong, and gives a corrected table:

> | | routes today | sections with data in `modelAnswersData` | gap |
> |---|---|---|---|
> | Economics | 12 (Units 1-2 only) | 22 (all but 4.3.5) | 10 pages are pure routing |
> | Business | 10 | 9 | one route (`the-market`) has a page and no data; eleven sections need
>   model answers written before they can have pages (out of scope) |
> "the honest target is 22 → 32 pages, and sitemap +10 — not 43 and +21"

Independently recounted by reading the tree rather than trusting either document's number:

- `find app/economics app/business -maxdepth 1 -iname "*model-answers*"` → **22** route folders (12
  under `app/economics/`, 10 under `app/business/`). Matches "routes today."
- `data/modelAnswersData.js`'s `SECTION_MODEL_ANSWERS_LINKS` (read in full, lines 1426–1454) → **12**
  economics keys, **9** business keys (21 total). Matches "sections with data" per subject.
- `data/modelAnswersData.js`'s `MODEL_ANSWERS_SECTIONS` (read in full, lines 1347–1420) → economics
  lists 6+6+5+5 = **22** sections (unit 4 skips 4.3.5, confirmed absent — matches the memory note
  "IAL spec numbering... 4.3.5 absent from MODEL_ANSWERS_SECTIONS entirely"); business lists 5+5 =
  **10** sections. Total across both subjects: **32**.
- `app/sitemap.js` (read in full) hand-lists exactly **22** model-answer URLs today (12 economics,
  lines 52–63; 10 business including `the-market`, lines 73–82). So "sitemap +10" = 22 → **32**, which
  is exactly `MODEL_ANSWERS_SECTIONS`'s total count across both subjects (22 + 10).

**A tension worth flagging, not resolving:** E019's own sentence says Business `the-market` "stays
absent from that map" (`SECTION_MODEL_ANSWERS_LINKS`, which after this packet holds 22 + 9 = **31**
entries, not 32). E020 says sitemap "derives its model-answer URLs from the same map... and emits
exactly 32." Read narrowly, "the same map" = `SECTION_MODEL_ANSWERS_LINKS` alone cannot reach 32 while
`the-market` stays out of it — that's 31. The arithmetic only closes if sitemap's source is (or
includes) `MODEL_ANSWERS_SECTIONS`, which lists all 32 sections regardless of whether each has data —
consistent with E018's own wording, which names BOTH `SECTION_MODEL_ANSWERS_LINKS` **and**
`MODEL_ANSWERS_SECTIONS` as the source for `generateStaticParams`. This is not a hard contradiction
between separate documents (it is inside the same spec block, and E018's phrasing already implies two
structures feed the dynamic route) — but E019 and E020 each say "map" in the singular, and only one of
the two candidate maps gets to 32. Whoever builds this needs to pick a rule for `the-market`'s sitemap
entry — e.g. "sitemap walks `MODEL_ANSWERS_SECTIONS`, which is also what `generateStaticParams` walks,
independent of whether `SECTION_MODEL_ANSWERS_LINKS` has an entry" — and that rule is not spelled out
verbatim anywhere in `NEXT.md`. Recording this rather than picking it.

## The hazard — quoted from `NEXT.md`

> The lab page reads `audit/content-sections/*.json` at request time — the t=0 dump, frozen since 12
> September... Shipping them on `/economics/<topic>-model-answers` would serve students stale quiz
> content under a canonical URL.
>
> - Preferred: source the MCQs the way the app does — server-side from `section_quiz`...
> - Acceptable: omit the Quick Check on the live pages entirely...
> - Not acceptable: reading `audit/content-sections/` from a public route.

Confirmed by reading the tree: `grep -rn "content-sections" app components lib` today returns hits
only inside `app/lab/exam-practice/[section]/page.js` (the route being deleted) and test files under
`lib/*.test.mjs` (server-side test fixtures, not a public route). Zero hits in `app/economics`,
`app/business`, or any non-lab, non-test file — so E017's acceptance grep already passes on the
CURRENT tree; the risk is a builder reintroducing the pattern by copying `bundleFor()` out of the lab
route wholesale. `app/api/sections/[id]/route.js:72` already reads `section_quiz` server-side today
(one of several existing callers: `app/admin/sections/[id]/page.js`,
`app/api/progress/dashboard/route.js`, `app/api/fun/questions/route.js`,
`app/api/practice/questions/route.js`), which is evidence the "Preferred" DB-sourced Quick Check
option is a known, already-used pattern in this codebase, not a novel one — not evidence that it has
been done here, only that the pattern exists to copy.

## What "done" means, per id

- **E016** — `SectionModelAnswersPage.jsx` (currently 93 lines, reads `MODEL_ANSWERS` filtered by
  `sectionNumber`+`subject` and renders the OLD `ModelAnswersPage` component) is rewritten to render
  the layout `SectionExamPracticePage.jsx` (319 lines, the lab component) proved: per-item `Meta`
  (command · marks · AO · time), SSR'd collapsed `<details>` for mark scheme / model answer / examiner
  commentary, the `WhyThisLosesMarks` mid-band panel on the section's highest-tariff item
  (`lib/mid-band-answer.js`), the data-response link-out (`lib/lab-data-response.js`), and a coverage
  line (`lib/spec-coverage.js`). Model-answer CONTENT itself (the `MODEL_ANSWERS` array in
  `data/modelAnswersData.js`) is explicitly NOT to be edited by this packet — only how it renders.
- **E017** — Quick Check block: either wired to `section_quiz` server-side (preferred) or dropped
  entirely from the live pages (acceptable). Reading `audit/content-sections/` from any file under
  `app/economics`, `app/business`, or `components` is the one option ruled out. Whichever is chosen,
  `built.md` must say which and what it cost (e.g. an extra Supabase read per page load, a build-time
  cost, or the loss of the MCQ block as SEO/engagement surface).
- **E018** — the 22 folders (`app/economics/*-model-answers/page.js` ×12,
  `app/business/*-model-answers/page.js` ×10) are replaced by one dynamic route (shape implied but not
  named literally in `NEXT.md` — presumably `app/economics/[slug]` won't work since economics and
  business are separate top-level segments each needing their own dynamic folder, i.e. two dynamic
  routes, `app/economics/[section]-model-answers`-shaped or a shared `[[...slug]]`; `NEXT.md` does not
  spell out the exact folder shape, only that "no `-model-answers/page.js` folder survives" and all 22
  canonicals are unchanged). `generateStaticParams` and per-page `metadata` come from
  `SECTION_MODEL_ANSWERS_LINKS` + `MODEL_ANSWERS_SECTIONS` together. All 22 pre-existing URLs must
  return 200 with their ORIGINAL canonical, diffed against `git show HEAD~1:<old page.js>` per-URL,
  not sampled.
- **E019** — the ten economics sections listed above get entries added to
  `SECTION_MODEL_ANSWERS_LINKS.economics` (bringing it from 12 to 22 keys) and therefore get pages via
  E018's dynamic route. `SECTION_MODEL_ANSWERS_LINKS.business` is NOT touched — `the-market` stays
  absent, with its existing explanatory comment left alone ("do not 'fix' it").
- **E020** — `app/sitemap.js`'s hand-listed 22-entry block (lines 52–63, 73–82) is replaced by code
  that derives the list from data rather than a literal array, emitting exactly 32 entries with no
  duplicates. See the tension noted above on which structure(s) it must read to include `the-market`.
- **E021** — every one of the (eventually 31, once E019 lands — 22 economics + 9 business,
  `the-market` still gets a page via E018 even with no map entry, so still 32 pages total but 31 of
  them have "real" titles built from the map/section data and `the-market`'s empty-state page needs
  its own honest title too) pages gets title/H1/OG changed from whatever pattern exists today (E016's
  file shows `title="Market Failure Model Answers"` passed as a prop, i.e. the OLD title shape) to
  "`<Topic>` — Exam Questions & Model Answers", plus `Quiz` or `QAPage` JSON-LD validating against
  schema.org's required properties (not the `FAQPage` schema already present in
  `SectionModelAnswersPage.jsx:24-32`, which is a different, additive schema block keyed off
  `SECTION_MODEL_ANSWERS_FAQ` and is not named for removal by any of E016–E022).
- **E022** — `next.config.mjs`'s `outputFileTracingIncludes` (currently keyed only to
  `/lab/exam-practice/[section]`, lines 9–16) gets an entry for whatever route E018 creates, covering
  at minimum `./audit/raw/spec-items.json` (read by `lib/spec-coverage.js`, which `NEXT.md` says "may
  stay" reading `audit/raw/` at request time — unlike `audit/content-sections/`), and
  `./content/data-response/**` if E016's data-response link-out (via `lib/lab-data-response.js`) is
  carried over, which E016's own quoted text says it is. `PracticeQuestionsTab.jsx` already reads
  `SECTION_MODEL_ANSWERS_LINKS[subjectFrom(unitCode)][sectionNumber]` (confirmed at
  `components/PracticeQuestionsTab.jsx:4,15`) — E022 asks to "extend, do not duplicate," which this
  brief reads as: the ten new economics keys added by E019 make the Practice tab link automatically,
  with nothing further to build there.

## Acceptance checks — quoted verbatim, runnable without this conversation

> 1. `ls -d app/economics/*-model-answers app/business/*-model-answers 2>/dev/null | wc -l` returns 0.
> 2. All 22 pre-existing URLs return 200 and each carries its original canonical: script it over
>    `SECTION_MODEL_ANSWERS_LINKS`, assert 22/22, and diff each canonical against
>    `git show HEAD~1:<old page.js>`.
> 3. The ten new Economics URLs return 200 and render at least one written question each.
> 4. `curl -s <any model-answers URL> | grep -c "Mark scheme\|markScheme"` ≥ 1.
> 5. `node -e` over `app/sitemap.js`'s default export: exactly 32 model-answer entries, no duplicates.
> 6. `grep -rn "content-sections" app/economics app/business components | grep -v lab` returns
>    nothing.
> 7. `npm run build`, `npm test`, `npm run validate`, `npm run recalls`, `npm run exposure` all exit 0.
> 8. `/lab/exam-practice/[section]` is deleted, and `grep -rn "lab/exam-practice" app components lib
>    audit/scripts` returns only historical mentions in `audit/runs/`.

Note on #2: it says "script it over `SECTION_MODEL_ANSWERS_LINKS`" — that map is 21 entries even
after E019 adds ten IF `the-market` stays out (12+10 economics + 9 business = 31), not 22. Checking
"all 22 pre-existing URLs" against a 21-entry map by construction misses one (`the-market`), which is
itself one of the 22 pre-existing URLs. Same underlying gap as the E019/E020 tension above: whatever
list check #2's script iterates needs `the-market` added by hand or sourced from
`MODEL_ANSWERS_SECTIONS` instead, or it will silently check only 21 of the 22 URLs it claims to check.

**Verify B script, quoted:** walk `/economics/market-failure-model-answers` (existing, unchanged URL,
improved layout), one of the ten new Unit 3/4 Economics pages, and
`/business/the-market-model-answers` (the empty-state case), at 390×844 signed out. Report what a
student sees, including the coverage line and whether the mid-band panel reads as a genuine near-miss.

**Note on `/lab` deletion, quoted:** "it is the only place the founder can see the layout without it
being public. Delete it in the same packet, but say so in the handoff so nobody looks for it
afterwards."

## Worktree hazard, observed directly (not asserted from NEXT.md alone)

`git status` at the start of this brief-writing session showed a large amount of staged and unstaged
work from other packets (5, 34, 36, 37, 40, 2.3, 39a) already sitting in this shared worktree, plus
untracked files under `audit/runs/`, `audit/snapshots/` and `scripts/` belonging to those other
packets. This brief touched none of them: no file was staged, edited or committed by this run beyond
writing new files under `audit/runs/packet-12.3/`. Confirmed by re-running `git status` implicitly
through the file operations used (`Write`/`Read`/`Bash` read-only commands only) — no `git add`, `git
commit`, `git checkout`, or `git reset` was run in this session.

## Contradictions / escalation

**None found that block writing this brief.** The one tension identified (E019 "stays absent from
that map" vs. E020/acceptance-check-2 needing a 32-count / 22-count that only closes if `the-market`
is included via a *different* structure than `SECTION_MODEL_ANSWERS_LINKS` alone) is recorded above
as something the builder must resolve with an explicit, stated rule — not a disagreement between the
handoff documents themselves (PROTOCOL, NEXT, PROGRESS, DECISIONS all agree with each other; the
tension is internal to two adjacent bullets of the same NEXT.md spec block, and E018's own wording
already implies the two-structure resolution). `EXAM-PRACTICE.md`'s old Packet 13.11 section states
different numbers (43 pages, +21 sitemap) but `NEXT.md` explicitly and unambiguously supersedes it and
says not to build to it — that is not a live contradiction, it is a superseded document correctly
flagged as superseded by the live one.
