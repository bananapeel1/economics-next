# Revvy Learn remediation plan — v3

v1 was checked by 10 coverage agents against all 117 code findings, 1,170 content work items and 4 research
reports, and critiqued by 4 independent reviewers: **138 findings uncovered, 69 weakly covered, 3 of 4
critiques returned "needs restructure"**. v2 corrected the structure but still left 15 concepts unplaced and
never stated the real session count. This version closes both.

Canonical source data: `audit/README.md` and `audit/raw/`. Coverage and critique output:
`audit/raw/plan-coverage-check.json`.

---

## What changed since the audit ran

The audit was taken at commit `7bd6d20`. HEAD is now `5775af5`, 13 commits later. This matters:

- **Learn Mode code is untouched.** Only `grade-explanation/route.js` (3 lines) and `StudyApp.jsx` (21 lines,
  analytics wiring) changed. **All 117 Learn Mode findings still stand.**
- **Pricing is no longer €0.99.** It is £1 first month, then £1.99/month, plus a £12 lifetime plan and a £6
  cancel-save offer (`lib/pricing.js`, `components/CancelOfferModal.jsx`). GBP base with an EUR legacy set,
  because Stripe locks `customer.currency` at first invoice. The renewal decision now lands at day ~28-30.
- **Analytics exists** (`lib/analytics.js`, provider-agnostic, wired in `app/layout.js`) but no funnel events
  are written server-side.
- **Assets exist on disk that no packet knew about, and none are wired in:**
  - `public/diagrams/` — 19 annotated SVGs including product-life-cycle, Boston matrix, Ansoff, indirect-tax/
    Pigouvian, supply-demand equilibrium. Referenced by nothing.
  - `content/data-response/` — 6 stimulus pieces with model answers and examiner notes.
  - `content/phase-3-rewrites/` — 6 markdown rewrites (3.5k-4.5k words each), all six on the rewrite list.
- **The tariff defect is ongoing, not historical.** The new data-response pieces use a 2/6/10-mark ladder.
  Correct for IAL Business Units 1-2 and **wrong for IAL Economics, which has no 10-mark question**.
  Three of the six new Economics pieces carry it. This is why the validator lands before more authoring.

---

## Five structural corrections carried from v2

1. **Step 0 is the pre-test, not the long step.** `LearnModeTab.jsx:249` replaces step 0 entirely with PreTest
   whenever the section has quiz data. "One subsection per step" never reaches the screen where 75% die.
2. **Stable item ids must precede every content push.** `practice_question_progress` keys spaced repetition to
   `question_index`, and every content packet renumbers those arrays. Pushing first corrupts the review state
   of every paying user, undetectably.
3. **The headline metric is partly an instrumentation artefact.** `StudyApp.jsx` writes `furthest_step`
   whenever a section is open regardless of tab, and stamps the previous section's step onto the next
   section's storage key. 75% is an upper bound; resume points are cross-contaminated.
4. **Artefact-type sweeps guarantee permanent incoherence.** Replace with one section, end to end, per session.
5. **The plan improved a free surface to move a paid number.** Learn Mode, notes, diagrams and practice are
   free; the paywall is on flashcards, quiz, mistakes, tutor and extras.

---

## Day 0 hotfix — hours, not a session

Three independent critiques proposed this. All deletions or flags. No authoring.

- [ ] Make the pre-test opt-in ("Test yourself first" / "Just teach me"), and remember the choice.
- [ ] Pull the 18 critical content items: 6 false examples, 8 wrongly keyed quiz items, 4 off-topic practice items.
- [ ] Hide any InlinePractice block whose command word is not on the IAL list for that subject. A filter, not a
      rewrite. Wrong tariffs are the one defect that makes a student **worse** than not using the product.
- [ ] Fix three false marketing claims: "24 spec points" (23 exist), "adaptive flashcard algorithm" (basic
      SM-2), Blackjack sold as contextual review (subject-wide random quiz).

---

## Scope arithmetic — read this before anything else

**A packet is one working session. There are 58 of them, not 13.** v2 hid this by writing "packet 10+" as one
row when it is 43 sessions. At one session a day that is roughly twelve weeks, not "a couple of weeks".

| Stage | Packets | Sessions |
|---|---|---|
| Day 0 hotfix | — | hours |
| Foundation: measure, protect, gate, fix the step | 1-5 | 5 |
| Repair: the code defects the content work sits on | 6-13 | 8 |
| Content: one section end to end, traffic order | 14-56 | 43 |
| Close: cross-surface consistency, re-measure | 57-58 | 2 |
| | | **58 sessions** |

**When all 58 are done, every audit finding is implemented**, except the four items under "Deliberately out of
scope" below. Nothing else is deferred and nothing is dropped.

---

## Packets

A packet is done when four things are true: validator green, push log complete, committed with the packet id
in the subject line, `PROGRESS.md` updated.

### Foundation (1-5)

| # | Packet | Why here |
|---|---|---|
| **1** | **Measure or don't bother** — gate the progress write on a real Learn Mode render; reset step on section change; fix the cross-section storage key; six server-written funnel events; error-check the upserts; cancel-reason dropdown; re-run the funnel and commit a clean baseline | Everything downstream is judged against a number we cannot currently reproduce |
| **2** | **Ids and safety net** — mint stable ids into every quiz, practice, flashcard, recall and diagram item; add `item_id` to `practice_question_progress` and backfill; switch all five API routes; snapshot and restore scripts; **a draft/published state so a packet's writes land unpublished and go live as one statement**; commit the content dump as t=0; clean the tree and branch; write the handoff pack | No content may be pushed before this. The difference between a reversible plan and an irreversible one. Restore-after-the-fact still means minutes of wrong content in front of students in every timezone; a draft state means none |
| **3** | **Validator v2 and golden set** — fixtures first from the real papers, then ~35 checks tiered BLOCK / DEBT / INFO, placed inside the write path; tariff table seeded from all eight units with per-row source citation; terminology lint keyed on subject and unit; a synoptic exception so Unit 3-4 items may draw on Units 1-2; a minimum quantitative-item count per unit; a words-per-step cap; baseline and debt ledger committed | A gate beside the write path is a convention. March had one of those |
| **4** | **Progress and mastery truth** — real result column, `kind` column, no `-1` sentinel; server-side review schedule, pre-test memory and completion; mastery states where Lapsed needs a failed or missed review, never the clock; replace the 15%/day decay; interval ladder resets on failure and stops capping at 14 days; MixedReview advances the schedule; the completion score counts skips, survives a revisit and stops double-counting on retry; post-test and Quick Fire results recorded; migration rebasing `furthest_step` | Same table as packet 2, so splitting it means migrating twice and shipping a knowingly wrong dashboard in between |
| **5** | **Step 0** — pre-test properly opt-in; one subsection per step; the mobile pass merged in so 390px readability is the acceptance criterion; sticky Next; chapter title; kill the duplicate title; recall moved below its own section with a "from step N" cue; visual hierarchy so Key Idea leads; text input in InlinePractice in all three modes; Explain It Back expanded with a free self-mark path; navigation and resume fixes so a subject switch stops carrying a stale step | The churn packet. Acceptance is a funnel re-measure, not "it looks better" |

### Repair (6-13)

| # | Packet | Why here |
|---|---|---|
| **6** | **Re-entry v0** — one transactional provider, a scheduled function, three plain-text sends (D+2 unfinished section, D+7 cards due, D+25 pre-renewal); surface the existing due-review count on Home | There is no send channel in the project at all. At £1 rising to £1.99 the renewal decision is day 28 |
| **7** | **Widget mechanics** — retry and a `why` field on reorder; skip records a consequence; shuffle at render and drop stored `shuffled`; fill-in gets distractors, one blank per line, no letter hints, tap-a-blank targeting, and keeps the student's wrong answer visible; add match and classify types; wire `DiagramLabelDrill`, delete the two dead components | Must precede recall authoring or 338 exercises get written into broken widgets a second time |
| **8** | **Quiz hygiene** — within-section only: wrong keys, duplicate stems, answer-position balance; shuffle across PreTest, InlineQuiz and QuizTab; the pre-test draws only from blocks the student has reached | Fan-out is safe only within sections. Cross-section moves are a solo migration with a written manifest |
| **9** | **AI correctness** — all three Gemini routes: IAL not "A-Level", section content and mark scheme as rubric, structured output with one retry, `maxOutputTokens`, shared rate limiting, fix the `.single()` subscription lookup, wire `onExplainAttempt` | No packet in v1 or v2 touched any AI route. A user with a cancelled and an active row resolves to free |
| **10** | **Smart Practice engine** — the keyboard handler that treats Ctrl and arrow keys as answers; "no questions available" that reads as missing content; the false "this question will come back"; the RETRIED stat; the topic picker's hidden select-all and missing counts; collect confidence before the reveal and actually read it | 14 findings, none of them in v1 or v2. This is the surface a paying student uses most |
| **11** | **Performance and accessibility** — the 152KB uncached section payload of which 40% is unused; glossary highlighting rebuilding ~372 regexes per render; the loading state that reads as an empty state; ARIA and focus-visible across step widgets; glossary tooltip with a touch and keyboard path; tab bar semantics; reduced-motion | Mobile-heavy cohort on school networks. Merged from two proposed packets |
| **12** | **Monetisation coherence** — one feature-matrix constant so the overview, upgrade page and paywall stop contradicting each other; read `trialEligible`; make the premium delta visible inside Learn Mode; stop the padlock flash while the subscription resolves; resolve the two subject-gated tabs (**Mistakes is Business-only, so 23 Economics sections have no mistakes review at all; Diagrams is Economics-only, so 20 Business sections have none**) by enabling them or removing them from what is sold; fix Smart Practice serving all 25 questions free while the Quiz tab paywalls the same bank after 2; apply the freemium decision | The £1.99 currently buys the worst-verified content in the product, and two of the advertised features are missing for half the customers |
| **13** | **Off-spec strip and dedupe** — remove or quarantine content not on the IAL spec: merit/demerit framing, "deadweight loss" terminology, the GCE behavioural block, the accelerator, monopoly-as-market-failure in Unit 1, VRIO and core competencies; resolve cross-section duplication (the multiplier, demergers, the price mechanism) with a "section owns spec bullet X" map | Must run before the section packets, or they rewrite material that should be deleted |

### Content (14-56) — one section end to end, per session

Each session: spec gaps, quiz re-tagging, practice with levels grids and correct tariffs, six to eight recalls
authored as data, quantitative items, diagram wiring, internationalised examples, teacher review. Wire the 19
existing SVGs, 6 extracts and 6 markdown rewrites as the relevant sections come up.

This stage absorbs everything v2 deferred: all 340 spec gaps, all 338 recall exercises, the 215 practice
questions, the 401 structural wiring items, the 79 accuracy items and the diagrams.

**Order is traffic, not audit grade.** One D-graded section first as a format pilot
(`decision-making-techniques` — least worth preserving, 9 untaught quiz items make the rewrite unambiguous),
then strictly by opens: introductory-concepts (192), meeting-customer-needs (123), consumer-behaviour-demand
(52), the-market (44), planning-raising-finance (35), types-sizes-businesses (34), marketing-mix-strategy (32),
supply (30), price-determination (28), then the remaining 33. The first two are 29% of all section opens.

### Close (57-58)

| # | Packet | Why here |
|---|---|---|
| **57** | **Cross-surface consistency** — 22 sections have Notes, flashcards or extras contradicting or out-scoping Learn Mode, including exact-duplicate flashcards and terms defined differently in two places | Can only run once the sections are final |
| **58** | **Re-measure the funnel** against the packet 1 baseline | If the step-0 pass rate has not moved, content was not the constraint and the next month goes elsewhere |

---

## Deliberately out of scope

The only audit items no packet implements. Each needs its own decision, not a default.

1. **The full eight-stage step anatomy** (orient, predict, teach, retrieve, chain-build, exam moment, resolve,
   schedule). Packet 5 ships the cheap half: one subsection per step, opt-in pre-test, readable on a phone.
   Whether the rest is worth building should be decided by the packet 58 re-measure, not now.
2. **Onboarding and pacing** — subject, units taken, exam series, and a "N sections to go, X minutes a day"
   line. One session whenever you want it; it blocks nothing.
3. **Streak and habit mechanics.** Packet 6 covers the re-entry that actually affects renewal.
4. **Blackjack as contextual review** — currently a subject-wide random quiz. Pooling it from the review queue
   is a small change with no evidence behind it yet.

---

## Decisions that are the founder's, not the plan's

- ~~**Name and book the IAL teacher in week 1.**~~ **CLOSED 12 September: no paid examiner.** All content is
  authored originally and gated by `audit/CONTENT-GATE.md`. Packet 3 builds its layers 1-3; packet 14 pilots
  4-7. The founder's time is 45-60 minutes on packet 14, then ~15 minutes per section spent only on the
  corroboration list. Superseded text: Sign-off is roughly 20-40 hours of qualified time against a
  product with ~16 premium users. Either resource it as an out-of-pocket line item, or write the gate
  honestly as "the founder reviews it" and stop calling it independent.
- **The freemium boundary.** The free tier is the entire teaching surface; the paid tier is drills containing
  the worst-verified content in the product. Consider un-paywalling the quiz bank until it passes the
  validator. Leave the price alone: the £1 first month already suppresses price as a churn cause.
- ~~**Where Business extracts come from.**~~ **CLOSED 12 September: we author them.** Original stimulus only,
  calibrated against real papers for command word, tariff and levels shape but never reproducing Pearson text.
- **The freeze date.** Today is 11 September. 58 sessions at one a day ends early December, which collides
  with the January series. Decide what January students get: the realistic answer is the foundation, the
  repair packets and the top ten sections by traffic, with the rest landing for June.

---

## The handoff pack

Three files read at the top of every session, under 300 lines total. This is what makes "one packet per
session, then clear context" work instead of re-deriving.

- `audit/PROGRESS.md` — one row per packet: status, commit sha, sections touched, snapshot path, validator result.
- `audit/DECISIONS.md` — irreversible choices later packets must respect.
- `audit/NEXT.md` — the brief for the next session only.

Plus one rule: a packet starts by snapshotting the sections it will touch and ends with a commit.
