# Packet 12.2 brief — the lab page

Produced by the brief phase only. No source file touched, no content authored, no measurement/build/test
run against the not-yet-built page. Counts below were taken either by reading files directly or by running
scripts that only read existing data (never the CLI script this packet is meant to refactor, and never the
page itself, which does not exist yet).

## Documents read, and the one thing worth flagging about them

- `audit/PROTOCOL.md`, `audit/SESSION-PROMPT.md` — the six rules, the lifecycle, the gate. No conflict with
  the packet spec.
- `audit/NEXT.md` — `## Packet 12.2 spec` (top of file, lines 1-89, dated 21 Sep 2026). This is the
  authoritative, most-recently-written brief for this packet; nothing later in the file mentions packet 12.2.
- **Newest `## Handoff` in NEXT.md**: positionally last in the file and the only one dated with "today" in its
  own text — `## Handoff — packet 37 closed (brain)` (line 8184, 2026-09-20). It is about packet 37
  (national-income) and names packet 38 as the next unclaimed numbered packet. **It does not mention packet
  12.2 at all and does not conflict with the 12.2 spec.** I'm naming it explicitly because "newest Handoff"
  and "newest content" are NOT the same file location here — most of NEXT.md is prepended (packet 12.2's own
  spec sits at the very top), but this one Handoff sits at the tail and is still the latest by its own date.
  No other `## Handoff` heading in the file is dated 21 September.
- `audit/PROGRESS.md` — **no row exists for packet 12.2** (or "12.1"). Row 30 is packet "12 — Monetisation
  coherence, not started," a different, unrelated packet number. This is not a contradiction; PROGRESS.md
  rows are added at gate time per PROTOCOL.md step 5.6, and this packet hasn't reached a gate yet. Flagging
  only so the builder knows a new row must be *added*, not edited.
- `audit/DECISIONS.md` Settled list — nothing settled specifically names E009-E015 or `lib/spec-coverage.js`.
  Two entries bear directly on this packet's scope and are consistent with the spec, not contradicting it:
  - **2026-09-12, F086**: the quiz bank is deliberately paid (packet 12's freemium-boundary decision stands),
    which makes `correctIndex` exposure on any unauthenticated route "a real defect, not a tidiness item."
    This is exactly why the 12.2 spec (NEXT.md line 30-35) tells the builder not to casually ship the answer
    key in the initial payload and to record the choice made in `built.md`. Same conclusion, not a conflict.
  - **2026-09-11**: IAL tariffs are canonical in `lib/ial-marking.js`, Economics has no Assess/Outline/10-mark
    — matches the spec's own tariff-invalidity claims (checked independently below).
- `audit/CONTENT-GATE.md` — checked for anything naming "lab", "noindex" or "exam-practice": nothing. This
  packet is code-only ("Code-only. No content publish. No live-page change" — NEXT.md line 16) and mints no
  `C-<section>-<kind>` ledger ids, so the recall contract does not apply here. Not a contradiction; the gate
  file is simply silent on this packet because it's out of scope for it.
- `audit/EXAM-PRACTICE.md` §"Packet 13.10 — The lab page" (this packet's old number) — **the 12.2 spec
  itself already flags this as aspirational and tells the builder to correct it, so this is a resolved
  supersession, not a live contradiction to escalate.** Two concrete places the mockup is wrong, for the
  builder's reference since the instruction says "correct it against the facts below" without listing every
  divergence:
  1. Mockup: "9 questions · 43 marks" for Market Failure, and an acceptance line "renders all nine items."
     Measured (NEXT.md + independently reconfirmed below): 3 valid written items, not part of a "9" total
     that exists anywhere in the current data. Build to the ledger's real counts, not this number.
  2. Mockup acceptance criterion 4: "The data-response stimulus and its table render" (i.e. rendered inline
     on the lab page). **The 12.2 spec explicitly overrides this**: "Link to the live page from the lab page
     when a section has one; never re-render the stimulus inline" (NEXT.md line 37-38, and ledger E012).
     Build to E012, not the old mockup's inline-render line.

## The ledger — 7 open ids, ledger and NEXT.md's own table agree exactly

`node audit/scripts/ledger.mjs packet 12.2` and `... packet 12.2 --open` both return the same 7 ids, all
`status: open`, all `kind: feature`, all `added: 2026-09-21`. Full `show` output saved at
`audit/runs/packet-12.2/ledger-show.txt`. No id claims scope outside what NEXT.md's own E009-E015 table
describes — checked title-by-title, they're identical in substance.

| id | title (ledger) | file (ledger) |
|---|---|---|
| E009 | `app/lab/exam-practice/[section]/page.js`: noindex, resolves any section slug, honest empty state on zero-data sections | `app/lab/exam-practice/[section]/page.js` |
| E010 | `SectionExamPracticePage.jsx`: header, SSR'd Quick Check (quiz) + Written (modelAnswers) blocks with command/marks/AO/time | `components/SectionExamPracticePage.jsx` |
| E011 | A mid-band "why this loses marks" annotated answer on the section's highest-tariff question | `components/SectionExamPracticePage.jsx` |
| E012 | Link out to the live `/data-response/<slug>` page when one exists; render nothing when it doesn't | `components/SectionExamPracticePage.jsx` |
| E013 | `lib/spec-coverage.js`: section-coverage computation extracted from the CLI script, single implementation | `lib/spec-coverage.js` |
| E014 | The lab page states its section's real coverage N/M with unexamined leaves named, via `lib/spec-coverage.js` | `components/SectionExamPracticePage.jsx` |
| E015 | Every collapsed `<details>` block is present in the server-rendered HTML | `app/lab/exam-practice/[section]/page.js` |

## Spec requirements in scope, quoted verbatim

Two real sections are named for the build/walkthrough: `market-failure` (Economics 1.3.5) and
`measures-economic-performance` (Economics 2.3.1). Quoted from `audit/raw/econ_spec.txt` (source line ranges
given so nobody re-derives these from a summary):

**1.3.5 Market failure** (`econ_spec.txt:723-791`), 6 numbered requirements, each with lettered sub-parts:
1. Sources of market failure — a) why market failure occurs; b) sources: externalities, the free-rider
   problem/non-provision of public goods, imperfect market information, moral hazard, speculation and
   market bubbles.
2. Positive and negative externalities — a) private/external/social benefits; b) private/external/social
   costs; c) the four-way split of external benefits/costs of production/consumption; d) marginal-analysis
   diagrams for external benefits from consumption, external costs from production, market vs social
   optimum and welfare loss/gain; e) impact of externalities in transport, health, education, environment,
   financial contexts.
3. Non-provision of public goods — a) private (rival, excludable) vs public (non-rival, non-excludable)
   goods; b) why public goods may not be provided, referencing the free-rider problem.
4. Imperfect market information — a) symmetric vs asymmetric information; b) significance of information
   gaps; c) misallocation of resources in healthcare, education, pensions, insurance.
5. Moral hazard — a) how it can occur; b) its impact on consumers, producers, workers, governments in
   insurance and banking.
6. Speculation and market bubbles — a) how bubbles may arise; b) impact on consumers, producers, workers,
   governments in housing, stocks and shares.

**2.3.1 Measures of economic performance** (`econ_spec.txt:884-969`), 4 numbered requirements:
1. Economic growth — a) real GDP growth rate and living standards; b) GNI as alternative measure; c)
   real/nominal, total/per-capita, value/volume distinctions; d) comparing growth rates between countries
   and over time; e) PPPs in international comparison; f) positive vs negative growth; g) "recession" as two
   consecutive quarters of negative growth; h) limitations of GDP/GNI for comparing living standards; i)
   national happiness/wellbeing indicators and the real-income/subjective-happiness relationship.
2. Inflation — a) inflation/deflation/disinflation; b) calculating inflation via CPI, weighted basket; c)
   limitations of CPI; d) producer price index as a leading indicator; e) causes of inflation (demand-pull,
   cost-push, excessive money supply growth); f) causes of deflation (falling AD, rising AS, falling money
   supply); g) effects of inflation/deflation on consumers, government, firms, workers, income distribution,
   investment, competitiveness, current account.
3. Employment and unemployment — a) ILO measurement; b) causes (frictional, seasonal, structural, demand
   deficiency, real wage inflexibility); c) effects on consumers, firms, workers, public finances, resource
   utilisation/PPF, society; d) unemployment vs underemployment; e) significance of changes in
   employment/unemployment/inactivity rates; f) significance of net migration.
4. Balance of payments — a) components, with particular reference to the current account; b) trade in
   goods/services deficit vs surplus; c) current-account deficit vs surplus distinction.

This packet does not author against these leaves directly — it builds a page that *displays* whichever
leaves the existing question bank already examines, via the coverage computation E013/E014 extract. The
spec text above is scope-context for judging whether the extracted coverage numbers look sane, not a
content to-do list for this packet.

## Two different "coverage" numbers exist in this codebase — do not conflate them

Checked `audit/raw/spec-coverage.json` (dated 12 Sep) for completeness, since the task brief for a content
packet says to pull this file. **This packet is not a content packet (code-only, no `C-` ledger ids) and
this file measures a different thing than what E013/E014 need:**

- `audit/raw/spec-coverage.json` → `bySection["economics__market-failure"]` and
  `["economics__measures-economic-performance"]` report **notes/teaching** coverage: 23 covered / 3 thin / 3
  missing (market-failure) and 17/4/3 (measures-economic-performance), with `missingItems`/`thinItems`
  naming gaps in the *prose content*. This is the packet-3/25-era content-teaching audit.
- `audit/scripts/spec-coverage-check.mjs --section <slug>` (the script E013 must refactor) computes a
  **different, narrower number**: how many spec leaves are examined by the section's *question bank*
  (`section_practice` rows plus `modelAnswersData`/`modelAnswersExpansion` items tagged with `specItems`),
  checked against tariff validity (`lib/ial-marking.js`) and spec-id contract problems. Read its `collect()`
  function (`spec-coverage-check.mjs:175-268`) directly rather than trusting this summary: per section it
  returns `{questions, untagged, leaves, examined, pct, unexamined, commands}`, and `leavesByTopic` supplies
  the leaf-id universe per `subject:topic`.
- **E013/E014's "N of M requirements examined" is the second number, not the first.** Do not pull
  `missingItems`/`thinItems` out of `spec-coverage.json` as this packet's to-do list — that's a content
  backlog for a future notes-rewrite packet, not this page's job. The 12.2 spec's own facts section (NEXT.md
  line 40-45) already makes this distinction implicitly ("Coverage is real and low... a genuinely small
  fraction of 1.3.5's requirements examined") — treat that line as the correct framing, and treat any
  specific percentage in `spec-coverage.json` as belonging to a different metric, not as this page's number.

## Facts independently reconfirmed (different method than the CLI script)

Per "verify independently," these numbers were obtained by reading `data/modelAnswersData.js` directly with
a throwaway `node -e` script and by reading `audit/content-sections/*.json` directly — not by running
`audit/scripts/spec-coverage-check.mjs`, which is the tool this packet is refactoring and whose own output
would share any blind spot in the counting method it's built on.

- `data/modelAnswersData.js` + `modelAnswersExpansion.js`, filtered `subject==='economics'`: **1.3.5 has
  exactly 3 items** (`neg-externality-4` Explain 4, `negative-externality-tax-8` Examine 8,
  `market-failure-government-intervention-20` Evaluate 20 — all valid Economics tariffs per
  `lib/ial-marking.js`). **2.3.1 has exactly 3 items** (`cpi-inflation-4` Explain 4, `unemployment-types-8`
  Examine 8, `cpi-limitations-4` Explain 4 — also all valid). Matches NEXT.md's claim of "exactly 3."
- `audit/content-sections/economics__market-failure.json` and
  `.../economics__measures-economic-performance.json`: both carry `quiz.length === 25` and
  `practice.length === 5`. Matches NEXT.md's "25 MCQs" and "5 written items" claims.
- Market-failure's 5 `section_practice` commands/marks: `Define 4, Explain 6, Analyse 10, Evaluate 20,
  Outline 4`. Against `lib/ial-marking.js`'s Economics tariff table (`Define:[2], Explain:[4], Analyse:[6],
  Evaluate:[20]`, `absent: ['Assess','Outline']`): **4 of 5 are invalid** (Define 4, Explain 6, Analyse 10,
  Outline 4), only `Evaluate 20` is valid. Matches NEXT.md's "4 of 5 carry an invalid tariff" claim exactly.
- `lib/spec-coverage.js` **does not exist yet** (`ls` confirms). E013 is genuinely new extraction work, not a
  stale duplicate to reconcile.
- All the "Read first" files the spec names exist and were not empty: `lib/exam-item.js`,
  `lib/practice-tariffs.js`, `lib/ao-spec.js`, `lib/ial-marking.js`, `components/SectionModelAnswersPage.jsx`,
  `app/data-response/page.jsx`, `app/data-response/[slug]/page.jsx` (not opened in full — token discipline —
  only confirmed present).
- `components/SectionModelAnswersPage.jsx:57-65` **does contain the "packet 12.1 fix round B1" empty-state
  pattern** the spec says to reuse for a zero-`modelAnswersData` section (a `sectionAnswers.length === 0`
  branch with an explanatory `<p role="note">`). Confirmed present, not just claimed.
- `content/data-response/`: **exactly 6 markdown files**, matching `PIECES` in `app/data-response/page.jsx`
  1:1 by slug (`econ-u1-market-failure`, `econ-u1-demand-elasticity`, `econ-u1-price-determination`,
  `bus-u1-marketing-mix`, `bus-u1-meeting-customer-needs`, `bus-u1-the-market`). Matches "six markdown
  files" claim.
- **`measures-economic-performance` has no `content/data-response/` entry** (no 2.3.1/measures slug in
  `PIECES`) — confirmed by reading the list above. This means the spec's *second* Verify B section
  (`measures-economic-performance`) will exercise E012's "render nothing" branch, not its "render the card"
  branch. Only `market-failure` exercises the positive (card renders, links out) branch. Worth the builder
  knowing this before writing the acceptance walkthrough, so a missing card on
  `measures-economic-performance` isn't mistaken for a bug.
- **`PIECES` slugs (`econ-u1-market-failure`, etc.) do not match content-section slugs
  (`market-failure`, etc.).** There is no existing map from a section slug to a `PIECES` slug anywhere I
  found by reading `app/data-response/page.jsx`'s `PIECES` array — E012 will need the builder to either add
  one (e.g. a `sectionSlug` field on each `PIECES` entry, or a small lookup table) or derive it from the
  `subject`+`number` fields already in `MODEL_ANSWERS_SECTIONS`. Flagging as a build-time gap to solve, not
  a contradiction between documents.
- Business Unit 3/4 zero-`modelAnswersData` candidate for E009's third acceptance slug: `MODEL_ANSWERS`
  filtered `subject==='business'` has entries **only for `unit 1` and `unit 2`** (sections 1.3.1-2.3.5), zero
  for unit 3 or 4. Cross-checked against `audit/content-sections/business__*.json` `meta` fields: e.g.
  **`business-growth`** (`number: "3.3.2"`, `unit: 3`, `unitCode: "WBS13"`, `quiz: 10`, `practice: 5`) has no
  matching `modelAnswersData` entries. Other equally-valid candidates if this one's practice tariffs are
  inconvenient to build against: `managing-change` (3.3.6), `decision-making-techniques` (3.3.3),
  `assessing-competitiveness` (3.3.5), `business-objectives-strategy` (3.3.1),
  `influences-business-decisions` (3.3.4), `globalisation` (4.3.1), `global-industries-mncs` (4.3.4),
  `global-markets-expansion` (4.3.2), `global-marketing` (4.3.3) — all unit 3/4, all zero
  `modelAnswersData` hits by the same filter.
- Existing `robots` precedent in this codebase (`app/settings/page.js`, `app/signup/layout.js`,
  `app/fun/page.js`, `app/login/layout.js`) all use the string form `robots: 'noindex, nofollow'`. The
  ledger/NEXT.md spec instead specify the object form `robots: { index: false, follow: false }` (both are
  valid Next.js Metadata API; this is a style note, not a functional contradiction — worth a one-line
  mention in `built.md` if the builder deviates from local precedent.)
- `app/sitemap.js` is a hand-maintained array plus a DB query for topic pages; it has no logic that would
  ever pick up an `app/lab/...` route on its own. Acceptance check 6 ("sitemap grep returns nothing") is
  satisfied by construction as long as nobody adds an entry for it — not something that needs defending, just
  confirming it isn't a trap.

## What "done" means per id

- **E009** — `app/lab/exam-practice/[section]/page.js` exists; exports `robots: { index: false, follow:
  false }`; resolves for any slug present in `audit/content-sections/*.json` (43 sections exist there
  today); proven on `market-failure`, `measures-economic-performance`, and a third slug with 0
  `modelAnswersData` items (candidate: `business-growth`) without crashing or blanking. Acceptance checks 1,
  5, 6 in NEXT.md.
- **E010** — `components/SectionExamPracticePage.jsx` renders: a header with subject/unit code/topic
  number/title and real (not invented) question/mark counts; a Quick Check block sourced from
  `section_quiz` that marks client-side on click; a Written block sourced from
  `modelAnswersData`/`modelAnswersExpansion` filtered to the section, SSR'd (not client-fetched), each item's
  header showing command · marks · AO (via `lib/ao-spec.js`) · a time estimate from one shared constant (not
  per-item guesswork). `built.md` must state, in prose, how `correctIndex` exposure in the Quick Check payload
  was handled and why (per the F086 settled decision above — this is a stated design choice, not silence).
  Acceptance checks 1, 3, 4 in NEXT.md.
- **E011** — on the section's highest-tariff written question, a second, deliberately mid-band answer,
  annotated against the same mark scheme as the full model answer, grounded in that item's own
  `markScheme`/`examinerCommentary` fields (not invented prose). Distinct panel from the full model answer,
  not a duplicate of it.
- **E012** — if the section has a `content/data-response/` entry reachable via `PIECES`, render a card
  linking to the live `/data-response/<slug>` page (never re-rendering the stimulus text itself); if not,
  render nothing — no placeholder, no dead link. Needs the slug-mapping gap noted above solved one way or
  another. Only `market-failure` of the two named walkthrough sections exercises the "card renders" path.
- **E013** — `lib/spec-coverage.js` exports the section-coverage computation currently inlined in
  `audit/scripts/spec-coverage-check.mjs`'s `collect()` (roughly lines 175-268: per-section `{questions,
  untagged, leaves, examined, pct, unexamined, commands}` against tariff validity and the leaf-id oracle);
  the CLI script is refactored to import and call it instead of restating it; `npm run spec-coverage`
  output must be byte-identical before and after the refactor — this is proven with a diff, not asserted.
  Acceptance check 7 in NEXT.md.
- **E014** — the lab page imports and calls `lib/spec-coverage.js` directly (no CLI shell-out, no
  hardcoded number) and states "This page examines N of M requirements in `<topic>`" using the
  question-bank coverage number (not the notes-coverage number from `spec-coverage.json` — see the
  two-coverages section above), with at least a sample of unexamined leaf ids/wordings shown (collapsed is
  fine). Acceptance check 2 in NEXT.md: the stated number must match what `npm run spec-coverage --
  --section <slug>` reports for the leaves the page's own question set actually carries — this equivalence
  is exactly what E013's byte-identical-output requirement is supposed to guarantee once the extraction is
  correct.
- **E015** — every collapsed `<details>` (mark scheme, model answer, examiner commentary, "why this loses
  marks" panel) is present in the raw server-rendered HTML, not injected client-side after hydration —
  curl-provable, per acceptance checks 3 and 4 in NEXT.md.

## Anything contradictory

Nothing found that both (a) is unresolved and (b) actually bears on this packet's scope. The one place two
documents disagree in wording — `EXAM-PRACTICE.md`'s "stimulus and its table render" vs NEXT.md's "never
re-render the stimulus inline" — is not a live contradiction: the 12.2 spec explicitly names
`EXAM-PRACTICE.md` as the superseded, aspirational document and instructs the builder to correct it, and
NEXT.md is both the more recent (21 Sep vs undated-but-earlier `EXAM-PRACTICE.md` content covering packet
13.10 under its old number) and the more specific instruction (ledger id E012 exists and says "render
nothing," matching NEXT.md, not `EXAM-PRACTICE.md`). Recommend: build to NEXT.md/E012; do not escalate.

No disagreement found between `audit/PROTOCOL.md`, `audit/SESSION-PROMPT.md`, the ledger, `DECISIONS.md`'s
Settled list, or the newest `NEXT.md` Handoff (packet 37, tail of file, 20 Sep, unrelated to 12.2 but present
and read).
