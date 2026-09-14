# Irreversible decisions later packets must respect

Append only. Every entry needs a date and the packet that made it.

## Open — decide before the packet that needs it

- **IAL teacher for sign-off** — not named, not booked. Blocks the section-complete packets. ~20-40 hours.
- **Freemium boundary** — the paid tier is currently the worst-verified content. Decide before packet 8.
- **Business extract sourcing** — 6 exist in `content/data-response/`, 20 sections need them. Author, adapt or
  license, and answer the copyright question. Blocks Business practice work.
- **Freeze date** — proposed 1 November. Anything later is for the June cohort, not January.

## Settled

- **2026-09-11 — the audit corpus is canonical.** `audit/raw/` and `audit/content-sections/` are the t=0
  baseline and the source of every finding. No session re-audits; no session re-derives a finding.
- **2026-09-11 — Learn Mode findings survive the September commits.** Audit was at `7bd6d20`, HEAD is
  `5775af5`, and only 24 lines of Learn Mode code changed. All 117 findings stand.
- **2026-09-11 — IAL tariffs are canonical and per subject.** Economics: Define 2, Calculate 2/4, Draw 4,
  Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20. **No 10-mark, no Assess, no Outline.**
  Business: Define 2, Calculate 4, Construct 4, Explain 4, Analyse 6, Discuss 8, Assess 10 (U1-2) or 12 (U3-4),
  Evaluate 20 ending in a recommendation, every item anchored to an extract line.
  The 2/6/10 ladder in `content/data-response/` is valid for Business U1-2 and **invalid for Economics**.
- **2026-09-11 — in-place edits are the only content writes allowed before packet 2.** Packet 0 changed 27
  fields across 14 rows by exact-match replacement; nothing was inserted or removed from any array, so no
  `quizIndices` / `practiceIndices` / `question_index` moved. Script: `audit/scripts/hotfix-packet-0-content.mjs`
  (idempotent; dry-run by default). Snapshots before and after: `audit/snapshots/`.
- **2026-09-11 — practice items are withheld by command word, not yet by tariff.** `lib/ial-commands.js` hides
  any practice item whose command word is not in the IAL list for its subject (50 of 215 today: Outline, and
  Assess in Economics), plus four items flagged `hidden: true`. Items with a valid command but a wrong tariff
  (every "Define (4)", "Explain (6)") still show. Enforcing (command, marks) pairs would hide almost all 215 at
  once; that is a section-packet job. The tariff table is in the same module for packet 3.
- **2026-09-11 — deferred from packet 0, with reasons.** Bank-wide answer-position bias in resource-management
  (22 of 25 at option B) and entrepreneurs-leaders (20 of 25) is packet 8, not an in-place fix. The Laffer-curve
  MCQ in government-intervention-firms (quiz[5]) is off-topic but replacing it means authoring a new question
  without a validator; packet 8 / that section's packet. Three false marketing claims remain live because a
  concurrent session has those exact files staged (see NEXT.md).
- **2026-09-11 (packet 1) — the old Learn Mode progress POST is removed, not fixed.** `LearnModeTab`
  no longer calls `/api/learn-mode/progress`; it wrote strings into a boolean column and never stored a
  row in the feature's lifetime. Its GET has no consumer. Packet 4 rebuilds progress on a real model; do
  not resurrect this endpoint in the meantime. Step persistence now goes through `onPersistStep` →
  `/api/progress/content` with the real flat step count and a never-decreasing furthest step.
- **2026-09-11 (packet 1) — funnel events are the measurement of record.** Table `app_events`
  (`scripts/create-app-events-table.sql`, run by hand in the SQL editor: there is no DDL path from code),
  written only via `POST /api/events` with the service role, event names allow-listed in
  `lib/funnel.js`. Anonymous students are included via a per-browser `anon_id`. The step-0 pass rate is
  `step_next(step=0)` over `learn_open` per (student, section); computed by
  `audit/scripts/funnel-events.mjs`. `user_content_progress` is a resume pointer, not a metric.
- **2026-09-11 (packet 1) — cancel reasons are captured in our modal, not in Stripe.** Cancellation
  itself happens inside Stripe's billing portal, so the reason is recorded as a `cancel_reason` event
  before the redirect. Stripe's own portal reason survey was not enabled: that is an external account
  setting and the founder's call.
- **2026-09-12 (setup) — the ledger is the coverage record; two findings the plan did not place.** All 117
  code findings were mapped to packets (`audit/ledger.json`). Two fit no packet's scope text and were placed
  by decision rather than by the plan: **F032** (a `content` tab route exists with no tab-bar entry, stranding
  the student) goes to packet 5 with the navigation fixes; **F071** (content HTML injected unescaped, and the
  glossary definition used as a `String.replace` template so `$&` and `$1` are interpreted) goes to packet 11,
  which already touches `lib/glossary-highlight.js`. **F025** (no onboarding) is packet 99, deliberately out of
  scope per PLAN.md. Packet 13 carries no code findings; its work is entirely content items.
- **2026-09-12 (packet 2) — PostgREST truncates a select at 1,000 rows and says nothing.** The first
  backfill read the progress table unpaged, silently processed an arbitrary window and reported a clean run.
  Every script that reads a table which can exceed 1,000 rows must page with `.order(...).range(...)` —
  `practice_question_progress` is at 1,069 today. The content tables are one row per section so they are
  safe, for now.

- **2026-09-12 (packet 2) — writes go to `draft`, students read `data`.** `scripts/packet-2-draft-state.sql`
  adds `draft` and `published_at` to all eight content tables; `scripts/publish-section.mjs` copies draft into
  data in one step per section. Nothing on the student path reads `draft`, so the columns are inert until a
  content script starts writing to them — which packets 14-56 should, from the first one.

- **2026-09-12 (packet 2) — item ids are matched by content, never by position.** The admin PUT replaces a
  whole `data` array, so a save whose JSON lacks ids would drop them. The first implementation restored them
  by array position; a verifier demonstrated that deleting one item then gives every later item its
  neighbour's id, silently rebinding a student's review history to a different question. Ids are now matched
  on normalised item text (`restoreIds` in `app/api/admin/sections/[id]/[type]/route.js`). An item whose text
  was edited in the same save keeps no id and becomes a new item: losing an id is recoverable by re-minting,
  mis-assigning one is not.

- **2026-09-12 (packet 2) — the item_id migration is staged across packets 2 and 4, deliberately.** Packet 2
  adds a nullable column and dual-writes; packet 4 switches the unique constraint and drops question_index.
  Doing it in one step loses data five silent ways, all documented at the top of `scripts/packet-2-item-id.sql`
  — the NOT NULL on question_index, the unique constraint treating NULL item_ids as distinct, the queue
  builder reclassifying all 1,067 rows as new, dashboards that count rows and so keep looking right, and 27
  `wa-` rows whose index points into a client-side filtered subset and is not backfillable at all.

- **2026-09-12 (packet 2) — the diagram title fallback runs per block, not per section.** `hasRefs` was
  section-wide, so one `quizIndices` entry anywhere in a section disabled the diagram fallback for every block
  in it. Inline diagrams shown across the product go from 15 to 51. The fallback only fills slots a pin left
  empty, and only from diagrams no block claimed, so it can never displace a working pin. `matchDiagramsToBlocks`
  also gained a stopword list: it was counting 'and' and 'the' as topic matches.

- **2026-09-12 (13.1) — the drill programme is split, and quant goes before the content stage.** Founder
  decision, recorded in `audit/DRILLS.md`: packets 13.1-13.4 (quantitative) run before packet 14; 13.5-13.8
  (drawing) run after the top-ten content sections. The reason is in the ledger, not in taste — 110 content
  items across 24 sections ask for quantitative material, `section_quiz` cannot hold any of it, and those
  items are scheduled into packets 14-56. Eighteen templates authored once replace per-section quantitative
  authoring; twelve diagram specs would instead add twelve authoring jobs.

- **2026-09-12 (13.1) — a quant item is never stored; `{ template, seed }` is.** The numbers are rebuilt on
  demand by `buildItem()`, identically, in any process. Contract: `lib/quant/schema.md`. Two consequences
  later packets must respect: the SM-2 row in packet 13.3 stores the pair, not a question; and a template
  can be corrected without migrating a single stored item. Packet 3 adopts this shape for its
  quantitative-item count rather than defining its own.

- **2026-09-12 (13.1) — a named wrong method ("slip") scores zero, and no slip may fall within tolerance of
  the answer.** A slip inside tolerance marks the wrong method correct, which teaches the wrong method
  silently and cannot be caught by reading the file. `npm run quant-check` asserts the separation on every
  draw of every template and is the gate for any template change. It has already forced one design change:
  a leakage total of 0.5 makes the MPC 0.5 too, so `multiplier.mjs` excludes that total.

- **2026-09-12 (13.1) — feature work gets its own ledger ids.** `audit/ledger.json` gained a `feature` array
  and `ledger.mjs` an `add` subcommand. Packets that build something new mint `D0xx` ids, one per acceptance
  check, so `claim` / `confirm` / `unverified` gate them exactly like audit findings. Audit findings are still
  never invented: they come only from the corpus.

- **2026-09-12 (setup) — packet work runs in the worktree, and a packet is done only when verified and pushed.**
  See `audit/PROTOCOL.md`. Ship checkpoints: after packets 1, 5, 13, then every five content packets, always as
  a PR into `main` that the founder merges.
- **2026-09-12 (packet 0, marketing) — the public copy was fact-checked in full, and the ledger now tracks it.**
  Packet 0's fourth item was written as "fix three false marketing claims". A sweep of every public page against
  the code and the official Pearson specs found 259 candidates; 182 survived an adversarial defence pass and are
  recorded as `M001`-`M182` in the `marketing` array of `audit/ledger.json`, with the raw evidence in
  `audit/raw/marketing-claims-2026-09-12.json`. All 182 are corrected. The three original claims were a small
  part of a much larger problem, most of it introduced by the SEO work after the audit was taken.
- **2026-09-12 — canonical free/paid boundary, for all future copy.** Free: notes, diagrams, practice questions,
  Learn Mode. Preview then paywall: flashcards, quizzes, extras. Paid with no preview: the AI tutor and the
  mistakes review. Model answers: the first is free, the rest are Pro. The canonical sentence is "Notes, diagrams
  and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro." No page may describe
  the tutor, flashcards or model answers as free.
- **2026-09-12 — banned marketing phrases.** "Adaptive" applied to flashcards (the schedule is simplified SM-2),
  any claim of adaptive difficulty (none exists), "every spec point" and equivalents (340 sub-topic gaps are
  known), diagrams for Business (it has none), and "24 spec points" (23 Economics sections exist). A grep for
  these is the cheapest possible guard and should run before any copy change.
- **2026-09-12 — a canonical-facts sheet is itself a source of error.** The sheet handed to the fix agents stated
  the Economics Unit 2 paper as Section A/B/C ending in two essays from three. The spec says Unit 2 is identical
  to Unit 1: Sections A-D ending in one 20-mark essay from a choice of two. Units 3 and 4 are the two-from-three
  papers. The fix agents read the spec and got it right; the checker, which trusted the sheet, flagged the
  correct answer as wrong. **Exam structure is verified against `audit/raw/econ_spec.txt` and `bus_spec.txt`
  only.** The correct structures are recorded in `audit/PROTOCOL.md`.

- **2026-09-12 (founder) — no paid examiner, and all questions are authored originally.** The plan assumed a
  qualified IAL teacher would sign off every section, roughly 20-40 hours of paid expert time. There is no
  budget for it. All practice questions, data-response stimulus and mark schemes are authored from scratch
  rather than taken from any existing source, which also removes the copyright exposure that hung over the
  Business extract question. **The examiner is replaced, not deleted**: see `audit/CONTENT-GATE.md`. Reading a
  real Pearson paper and its mark scheme to calibrate command word, tariff, assessment-objective shape and
  levels structure is allowed and expected; reproducing Pearson wording, stimulus or descriptors is not.
  The bar is unchanged: a student who revises here walks into the exam as well prepared as one who used
  expert-authored material. The `Business extract sourcing` open decision is closed by this: we author them.
- **2026-09-12 — the quant engine and the interactive diagrams are built but NOT shipped.** Checked across
  every branch: no student-facing file imports `lib/quant`, `components/quant`, `InteractiveDiagram` or
  `DiagramLabelDrill`, and the 19 SVGs in `public/diagrams/` are referenced by nothing. The quant engine is
  reachable only from `app/admin/quant`. This is the same "component exists, never mounted" finding the audit
  made in March. **Do not remove this work from the plan on the belief that it is done.** What remains is
  wiring, not building: packets 13.2 and 13.3 wire the quant engine into Learn Mode, Quiz and Smart Practice;
  packet 7 mounts `InteractiveDiagram` and `DiagramLabelDrill`; packet 5 makes diagrams legible on a phone;
  packet 2 fixes the 24 of 39 diagram references that resolve to nothing.
- **2026-09-12 — model allocation, and the rule behind it.** Use the strongest available model where a mistake
  propagates silently and no verifier can catch it. Use the next tier where the build, the ledger or a verifier
  catches mistakes. That puts Fable 5.1 on packets 3, 5, 7 and 14 only, Opus on every other packet, and Sonnet
  on all verification and mechanical sweeps. Recorded in `audit/PROTOCOL.md` under Agents and models. If a
  packet built on the lower tier is rejected by its verifier more than once, that is evidence the task needed
  the higher tier: move it and say so here.

- **2026-09-12 (packet 9) — IAL marking facts live in `lib/ial-marking.js`, and nowhere else.** The tutor and
  the grader each carried their own half-remembered version: the tutor told students Economics runs WEC11 to
  WEC12 (it runs to WEC14) and offered a tariff table containing "Assess", which does not exist in IAL
  Economics. Tariffs, paper structures and the 20-mark essay structure are now one module, sourced from
  `audit/raw/econ_spec.txt` and `bus_spec.txt` and verified against them line by line by the packet verifier.
  Import it; never restate these facts in a prompt.
- **2026-09-12 (packet 9) — the tutor must not contradict the site's own content.** Its prompt said a 20-mark
  essay needs no introduction while every 20-mark model answer in `data/modelAnswersData.js` opens with a
  labelled Introduction, the FAQ requires "a clear introduction defining key terms", and `data/guidesData.js`
  says the same for Business. The content is right: defining the key terms is where the Knowledge marks are
  earned. Both AI routes now share `ESSAY_20_STRUCTURE`. Any future guidance a route gives about structure or
  marking goes in that module so the two surfaces cannot drift apart again.
- **2026-09-12 (packet 9) — F019, the rate limiter, is wont-fix rather than done.** The duplicate limiter in
  the chat route is gone and all AI routes share `lib/rate-limit.js`, so one user can no longer draw two
  separate allowances. The limiter is still per-instance memory, so on Vercel it bounds a burst, not a day.
  A durable limiter needs a store (Upstash or Vercel KV) and an account decision. Re-open when one exists.
- **2026-09-12 — the gate now reports unclaimed scope.** `ledger.mjs unverified <n>` only checked CLAIMED
  items, so a packet could pass by claiming less than its scope; packet 2 was recorded done with F052, F109
  and F115 still open. It now lists items assigned to the packet that were never claimed. A packet is not
  done while those are open: fix and claim them, mark them wont-fix with a note, or reassign them.
- **2026-09-12 — two of my own summaries were wrong this session, both caught by checking the source.** The
  Economics Unit 2 paper structure (propagated to 52 agents) and the claim that 24 of 39 chapters render no
  diagram (measured: 15 by pin plus 36 by the packet 2 fallback, so 51 render one). Rule that follows: a count
  or a spec fact stated in prose is a hypothesis. Measure it or cite the spec line before acting on it.

- **2026-09-12 (founder) — the freemium boundary does not change.** Free stays notes, diagrams, Learn Mode and
  the written practice questions. Preview-then-paywall stays flashcards, the quiz bank and extras. Paid stays
  the AI tutor and the mistakes review; model answers stay first-free. The recommendation on file was to move
  the whole learning loop to free and sell only the exam-shaped layer; the founder considered it and declined.
  **Packet 12 therefore implements the existing boundary faithfully rather than redrawing it**, and the
  "un-paywall the quiz bank until it passes the validator" option in PLAN.md is closed, not deferred.
- **2026-09-12 — keeping the boundary makes F086 a real defect, not a tidiness item.** `GET /api/practice/questions`
  takes no auth and no premium check, uses the anon client, and returns the full `section_quiz` array including
  `correctIndex` for every section id it is given. Measured: an unauthenticated request returned 75 questions
  with answer keys across three sections, and nothing bounds the section list, so the entire 769-question bank
  is one request away. While the boundary was under review this was cosmetic. Now that the quiz bank is
  deliberately paid, the paywall is decorative and the answer keys leak with it. Raised low to high on packet 12.
  **One sub-decision remains for the founder** (see NEXT.md): closing the leak removes free access that students
  have today, so it is a product change, not only a fix.
- **2026-09-14 (packet 3) — the content gate is "no regression against a committed baseline", not "zero findings".**
  Live content fails the validator 2,239 times (886 BLOCK, 1,353 DEBT). A gate that refused all of it would be
  switched off by Friday, which is what happened in March. `audit/validator-baseline.json` holds every finding
  key live at the moment the validator landed; `npm run validate` fails only on keys not in it. The file only
  shrinks: a section packet that clears its debt reruns `--baseline --confirm` and commits the smaller file.
  Growing it by hand is the thing the gate exists to make visible; the rewrite prints exactly what it would add.
- **2026-09-14 (packet 3) — a direct write of `data` on any content table is refused at the client.**
  `scripts/_db.mjs` refuses `update`/`upsert`/`insert` carrying `data` on the eight `section_*` tables unless
  `REVVY_ALLOW_RAW_WRITE=1` is set for that run. Eighty-four scripts wrote `data` directly; 22 of the 43
  section-upgrade scripts had no validator at all (F110). Content now goes `stageSection()` → `draft` →
  `publish-section.mjs` → `data`, validated at both ends. `restore-section.mjs` and `mint-item-ids.mjs` need
  the override and should say why in the commit.
- **2026-09-14 (packet 3) — tariffs are stated once, in `lib/ial-marking.js`, and tested against the spec.**
  `lib/ial-commands.js` imports them rather than carrying a copy. Both are asserted equal to
  `audit/raw/tariff-census.json`, which is parsed from Appendix 6 of each specification with a source line on
  every row. Two copies that agree today is how the 12 September Unit 2 error happened.
- **2026-09-14 (packet 3) — `audit/raw/spec-items.json` is the coverage oracle, and it does not reconcile to the
  1,073 of `spec-coverage.json` on purpose.** 1,125 leaves, parsed from the spec text with a line range each.
  Where the two counts disagree most they were read against the source: Economics 1.3.4 has 11 lettered
  requirements and no bullets (this file 11, the earlier audit 17); Economics 2.3.1 requirement 3c has six
  bullets (this file 6, the audit fewer). The disagreement is the earlier audit's granularity. Do not bend the
  parser toward 1,073. Mechanical completeness holds (0 leaks, 0 missed, both subjects) and a deterministic
  30-row sample was hand-read: 30 of 30 verbatim. Layer 3 coverage is measured against this file; it is a
  lexical floor (mean 81%), not the reading audit's verdict (62%), and the content packets should treat the
  gap between the two as their reading work.
- **2026-09-14 (packet 3) — the reorder rules are lexical and their limit is written down.** Against the March
  per-recall verdicts (64 genuine, 66 weak or not orderable) the three rules together flag 51 of the 66 and
  27 of the 64; the criterion rule alone flags exactly the 17 underspecified prompts, fifteen of them "Put these
  in the right order". The 15 bad recalls no rule catches are bad because of what the items mean. Content
  packets read the March verdicts for those; do not tune the rules toward a semantic oracle.
- **2026-09-14 (packet 3) — bracketed option letters in explanations are a content rule, not a code rule.**
  Layer 1b in CONTENT-GATE.md. The shuffle declines 25 questions rather than guess; "Option A" instead of a bare
  "(A)" makes fourteen of them shuffleable again, and the validator flags the form (`quiz.letter-in-explanation`).

