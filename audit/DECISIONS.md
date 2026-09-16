# Irreversible decisions later packets must respect

Append only. Every entry needs a date and the packet that made it.

## Open — decide before the packet that needs it

- **IAL teacher for sign-off** — not named, not booked. Blocks the section-complete packets. ~20-40 hours.
- **Freemium boundary** — the paid tier is currently the worst-verified content. Decide before packet 8.
- **Business extract sourcing** — 6 exist in `content/data-response/`, 20 sections need them. Author, adapt or
  license, and answer the copyright question. Blocks Business practice work.
- **Freeze date** — proposed 1 November. Anything later is for the June cohort, not January.

## Settled

- **2026-09-15 — the three lenses keep their filled boxes, against F067's fix text.** F067 asked for the Key
  Idea to dominate and, in the same sentence, for Real Example / Misconception / Exam Matters to be demoted to
  a compact style with "no coloured fill". Packet 5 shipped that and a verifier confirmed it. The founder saw
  the result and asked for the boxes back: easier on the eyes, and friendlier. They are back, matching the
  Notes tab and production. **F067's goal is kept by making the Key Idea stronger, not the lenses weaker**: a
  4px left rule against their 1px border, 16px/500 text against their 14px, and more padding. A verifier
  reading F067's wording will see a departure from it; it is deliberate, and this entry is the authority.
  Do not re-flatten the lenses without asking the founder.


- **2026-09-15 — content may not depend on unshipped code, and the test is field-level.** Packet 14 was reverted
  for using `match`/`classify`; the rule that came out of it said `reorder`/`fillin` were safe, and packet 15
  published three `reorder` recalls authored to the packet-7 contract, which drops `shuffled`. Main's
  `ReorderRecall` reads `recall.shuffled` in a `useState` initialiser, so every one of them was an uncaught
  TypeError that Next.js turns into "This page couldn't load" — on the most-opened section in the product.
  Ironically `match`/`classify`, the types the first rule banned, are harmless on main: the dispatch falls
  through to `null`. **Until packets 5 and 7 ship, no section authored to the recall contract is publishable,
  and the pre-publish check reads the shipped components' fields rather than comparing type names.**
- **2026-09-15 — the database state is not proof that a live fix landed.** A section reverted the previous
  evening still crashed on production the next morning, then recovered with no further content change; the
  section API is not CDN-cached, so the carrier is unexplained. Every content revert is verified by walking the
  section on production in a fresh tab, not by reading the row back.


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
- **2026-09-14 (packet 3, after verification) — a finding key carries a fingerprint of the item it is about.**
  The verifier showed that `section|rule|where` masked a rewritten item: `where` is the item's id, packet 2
  minted 2,952 ids, and a rewrite keeps them, so a rewritten stem that was still an essay stem kept its
  baselined key. Keys are now `section|rule|where|fingerprint` (hash of the quiz item, practice item, recall,
  subsection teaching text or block fields; of the detail for section-level findings; none for per-term counts,
  where removing a mention must not read as a regression). The baseline was rewritten under the new format:
  2,239 → 2,489 keys, and only the three rules that were deliberately changed moved (`locale.institution` per
  sentence 53 → 298, `locale.uk` 14 → 16, `depth.notes-titles` 0 → 3); the other 33 are identical. The
  discipline this buys: touching an item that carries a baselined BLOCK obliges the session to clear it.
- **2026-09-14 (packet 3, after verification) — the admin editor writes `data` directly, gated in-route.**
  The founder's editor has no draft step and turning it into one is a product change. So its two routes run
  the same `lib/content-gate.mjs` decision the scripts do, refuse with 422 and the findings in the body, and
  read the row back. They are the only files allowed to write a content table with a client of their own, and
  `lib/write-path.test.mjs` fails if another appears. Seeds and one-off scripts import the guarded client and
  need `REVVY_ALLOW_RAW_WRITE=1` on the command line, which is the point: the bypass is in the shell history.
- **2026-09-14 (packet 3, after verification) — UK framing is a ratio, and institutions are counted per sentence.**
  `locale.uk` used to fire at three UK-framed mentions per section, so "Brexit ×2, Tesco and Aldi" with no other
  country passed. It now fires when UK-framed mentions outnumber mentions from anywhere else (17 sections live,
  the same set at one-or-more and at two-or-more), which encodes the rule as stated: one UK example among
  several is fine, the UK as the default is not. It cannot judge relevance; the per-section checklist in
  CONTENT-GATE.md does, and PROTOCOL now names it as a build step for content packets. `locale.institution` is
  one BLOCK per sentence so a new mention is a new key and a removed one is not a regression.
- **2026-09-14 (packet 3, after verification) — flow steps split on an em dash only, and emphasis follows
  CommonMark flanking.** The packet's first attempt widened the split to hyphens and en dashes and rendered
  "Float = LFT - EST - duration" as a title and a subtitle; the italic regex rendered "P*" and "Q*" as an
  emphasis run. Both were live for a day. `lib/flow-step.js` and the flanking rule in `parse-inline-markdown`
  are the fix, each with tests; the object form `{ title, subtitle }` is the documented way to add a subtitle.
- **2026-09-14 (packet 13) — the specification decides what is taught, and `audit/raw/spec-items.json` is how that
  is settled.** Every removal in this packet is a claim that a term appears zero times in the Edexcel IAL
  specification, checked against the parsed spec text rather than against anyone's memory of A-level economics.
  Gone from live content: merit and demerit goods, deadweight loss, VRIO, core competencies, distinctive
  capabilities, the balanced scorecard, the triple bottom line, and the accelerator. Where the economics is
  on-specification and only the label was not — merit/demerit goods, deadweight loss — the label changed and the
  teaching stayed. Where the material is real but belongs to another topic — monopoly at 3.3.3.6, behavioural
  choice at 1.3.2.1b, Porter's five forces at 3.3.1.4c — it was removed from the section that did not own it.
  `audit/scripts/packet-13-census.mjs` asks the database, not the plan, and is the acceptance check.
- **2026-09-14 (packet 13) — a section owns a specification bullet, and `audit/SPEC-OWNERSHIP.md` is the map.**
  Three topics were taught twice in full. Two duplicates were removed. The multiplier was not: the specification
  puts it at 2.3.4.4, so national-income owns it, but aggregate-demand assesses it in eight quiz items and four
  flashcards, and deleting the teaching while leaving the assessment would manufacture the assessed-but-never-taught
  defect this programme is clearing. Moving assessment across sections is a migration with a manifest (packet 8's
  own decision), so the manifest is written in the map and the merge belongs to packets 32 and 37. Both sections
  are Unit 2 and sit the same paper, so the cost of waiting is a student's time, not a wrong answer.
- **2026-09-14 (packet 13) — touching a sentence means owning its defects, and that is what makes the baseline
  shrink.** Packet 3's keys are fingerprinted on the item, so rewriting a sentence retires its findings and any that
  survive are new. This packet inherited, and therefore fixed: three command words that do not exist in IAL
  Economics ("Outline" twice, "Assess" in an Economics section), two tariffs that contradicted Appendix 6, four
  UK-only institutions, seven questions whose correct option was the longest, and two sections with no recall at
  all. None of that was in the packet's scope as written; all of it was the price of the edits that were. The
  baseline fell from 2,489 keys to 2,189, and BLOCK findings from 1,131 to 902.
- **2026-09-14 (packet 13) — `jsonb` normalises key order, so a read-back check cannot compare strings.** Packet 3
  added read-back verification to the write path and the verifier reasoned about it without executing it. The first
  hand-authored object this packet staged was refused by it: PostgreSQL sorts an object's keys by length then
  bytewise, so the payload read back was deep-equal to what was sent and not string-equal. `sameJson` in
  `lib/content-gate.mjs` compares canonically and is used by all five read-back checks. A guard that has never run
  against the real thing is a guard with an unknown failure mode.
- **2026-09-14 (packet 13) — an acronym belongs in the UK-institution list only when the subject has no other use
  for it.** `MPC` was producing 130 BLOCK findings as the Bank of England's Monetary Policy Committee. In this
  corpus it means marginal private cost or marginal propensity to consume in 129 of 131 sentences, and the two that
  mean the committee name it in the same sentence. It is out of the list, "Monetary Policy Committee" is in, and a
  test holds both directions.
- **2026-09-14 (packet 13) — a duplicate quiz stem is a judgement, not a Jaccard score (F081).** The lexical rule
  flags 44 pairs at 0.5 because nearly every stem opens "Which of the following". Nineteen were real: a student who
  could answer one could answer the other with nothing extra, including two pairs with identical stems and different
  correct answers. Twenty-five merely share a frame and were left alone, so `quiz.near-dup` still reports them and
  the rule stays honest about being lexical. Each rewrite tests a different angle on the same specification bullet,
  so the bank widened rather than shrank; near-duplicate findings fell from 36 to 17.
- **2026-09-14 (packet 5) — a step is one subsection, and a chapter ends with a check-in.** The old pairing put
  two subsections and every end-of-chapter widget on one step and the previous step's recall above the next
  step's title: 5,300-5,900px steps on a phone, the same recall twice in a row, half the recalls never shown.
  `lib/learn-steps.js` now builds `teach` steps (one subsection, its recall below) and one `checkin` per chapter
  (diagram, quiz, practice, spaced recall, explain, takeaway), and both the engine and the overview count from
  it, so the launchpad and "Step 1 of N" agree. Steps = subsections + chapters; a section's saved
  `furthest_step` from the old model is clamped into the new range on load rather than shown as "Step 9 of 5".
- **2026-09-14 (packet 5) — a spaced recall is from an earlier chapter, chosen once per session, never the same
  widget twice in a row.** On a check-in, the earliest recall from a previous chapter not yet used as a spaced
  recall is shown with a "Recall from chapter N" cue; a reorder starts from a different seeded order the second
  time. Chosen once per check-in and remembered, so Back and Next show the same one. The first chapter's check-in
  has nothing earlier and shows none, which is correct rather than a gap.
- **2026-09-14 (packet 5) — build now, ship at the checkpoint.** PLAN says the funnel baseline (clean since 12
  September) needs two weeks behind it before Step 0 changes, or the packet 58 re-measure cannot attribute the
  change. This packet is verified on the branch and holds until that checkpoint; it is not merged early.
- **2026-09-14 (packet 5) — the depth signal uses the validator's own thresholds.** `/api/sections/depth` marks a
  section thin below 4 chapters or 20 quiz questions, which is exactly what `depth.blocks` and `depth.quiz` say,
  so the product's "More content coming" and the gate's baseline name the same 22 sections. The chip says which
  shortfall it is — "10 q" or "3 ch" — because "25 questions, more coming" read as a contradiction.
- **2026-09-14 (packet 5) — 44px, not 36.** F091 asked for 36×36 on the reorder arrows and 40×40 on dismiss and
  more; the sticky bar, arrows, dismiss and more are 44px, the platform minimum, and rows are 44px tall. Chips
  and blanks are 40px, as the finding asked, because 44px chips wrap a word bank onto a third line at 390px.
- **2026-09-14 (packet 5, after Verify A round 1) — a persisted draft is written only after the student has
  typed.** The explain-it-back draft was read in an effect (F118: never during render) and written in another
  effect on every change of the text — including the empty value the first render starts from, which removed
  the stored draft before the read that would have restored it had run. The pattern for any localStorage-backed
  input from here: a `dirty` ref set in `onChange`, the write effect a no-op until it is set, the read effect
  clearing it. StrictMode's double-mount made this visible in dev; production would have raced.
- **2026-09-14 (packet 5, after Verify A rounds 1 and 2) — no font floor on diagram labels; the sheet is the
  phone answer.** Two floors were tried. 1/28 of the viewBox raised 1,419 of 1,420 labels; 1/36 still raised
  1,281 of 1,377 (authored sizes are 7-13 units) and put 18 overlapping pairs on a diagram that had none.
  A label's size and its neighbours' positions were authored together, so any floor is a relayout, and inline
  it bought nothing: 14 units at 313px is 8.7px. Labels keep their authored size. The full-screen sheet draws
  the diagram at 220vw, chosen from the census: every live diagram is a 500-unit box and the smallest label is
  7 units, so the smallest label in the sheet is 12px at 390px; pinch-zoom goes further. If a diagram is ever
  authored with labels under 7 units, the validator is the place to catch it, not the renderer.
- **2026-09-14 (packet 5, after Verify A round 2) — `touch-action` on a scroll container is `manipulation`,
  never `pinch-zoom` alone.** `pinch-zoom` forbids one-finger panning; on the pane that scrolls a diagram
  wider than the screen it made the right half unreachable on a real phone. The mouse-driven browser pane
  could not show it; the verifier read the computed value against the spec. A value copied from a finding's
  fix text is still a value to check.
- **2026-09-14 (packet 5, after Verify A round 1) — the Learn step pointer has one writer.** A `useClientValue`
  that re-read the local step on every section change silently overrode the max-of-server-and-local every
  navigation handler had just computed. `readSavedStep` is the only source now, from the entry effect and the
  handlers; a later-arriving server step is applied by the F027 reconcile. Two writers for one pointer is the
  bug class, whichever one happens to run last.
- **2026-09-14 (packet 5, after Verify A round 1) — a phone rule goes in the phone block, with the selector it
  has to beat.** Three of the seven rejections were specificity: an 11px two-class lens-label rule outranking
  the 12px phone rule; a three-part modal selector outranking the 200vw sheet rule; a keyboard-hint hide rule
  declared before the base rule that showed it. The appended "Packet 5" phone block is where phone rules live,
  and a rule that must beat an earlier selector uses the same selector so it wins by order, not by guesswork.
- **2026-09-14 (packet 5, post-gate) — nothing that talks to Supabase runs during `next build` unless it uses
  the anon client.** The depth route's `export const revalidate` made Next prerender it, and it read with the
  service-role key, which is Production-only: every Vercel preview from `8288315` on failed with "supabaseKey
  is required", while local builds passed because `.env.local` has every key. An API route gets its cache from
  the CDN (`s-maxage`), not from build-time prerendering, and public counts get read with the anon key, whose
  client already no-ops when the variables are absent. The second time this environment trap has cost the
  project a chunk of a day; the first is in the guides SEO teardown. **A green local build is not evidence
  that a preview builds** — check the deployment, or at least know which env vars the build touches.
- **2026-09-14 (packet 5, post-gate) — never call `scrollIntoView` from a render-driven effect.** It scrolls every
  scrollable ancestor, not just the strip it was meant for, and an effect keyed on an array rebuilt each render
  runs on every render — which, in this app, is every scroll frame. The founder felt it as scrolling that forces
  you back up; three verifier rounds and a walkthrough did not, because they scrolled by script, once. A strip
  keeps its active item visible by moving its own `scrollLeft`, once per change; and the walkthrough script now
  says to scroll with real input while the page is re-rendering.
- **2026-09-14 (packet 13, after Verify A round 1) — a vocabulary swap is read afterwards, sentence by sentence,
  or it is not done.** The verifier diffed all 43 snapshots against live and found eight damaged sentences the
  substitutions had produced: a tautology ("welfare loss or welfare loss", from a source that said the words the
  other way round), an ungrammatical phrase from a rule added after the text it was meant for had been written,
  a circular model answer, a repeated word, and — the serious one — a claim widened past its truth: "goods with
  external benefits are excludable and rivalrous" is true of merit goods by definition and false of the wider
  class the new label names. Each is patched by hand in `scripts/_packet13-polish-plan.mjs`, and a plan can now
  declare phrases that must not survive it, which the runner checks over the whole would-be section before
  staging. The rule for the content packets: after any mechanical rewrite, diff the sentences and read them.
- **2026-09-14 (packet 13, after Verify A round 1) — an acceptance check that cannot fail is not a check.** The
  census's ownership branch tested every path for a leading ".content" that no path ever had, so it printed
  "nowhere" for all four topics whatever the truth. It now takes the table explicitly, carries a `--self-test`
  that asserts a block title is seen and body text is not, and reports the multiplier taught under its own
  heading in aggregate-demand — which is true, and is the deferred merge. D011 was narrowed to what was done
  (six of seven rows) and the seventh minted as D013 on packet 37, because "done except one, on a document that
  says so" is not "done".
- **2026-09-14 (packet 13, after Verify A round 3) — fix the field, then read every other field of the same
  entry.** Three rounds running, a fix landed on the fields the verifier had named and left the same defect in
  the field beside them: the keyIdea was corrected while the flow four lines down still taught the old thing,
  and a subsection was cleaned while its notes twin was not. Rules written against prose cannot match a flow
  step or a takeaway, so a substitution pass is not evidence about them. From here, a content fix reads every
  string of the entry it touches — and, for an ownership claim, every string of all 43 sections, because the
  census reads titles only.
- **2026-09-14 (packet 13, at publish) — the baseline diff is the last reader of a content pass.** Publishing
  passes 3's five sections re-fingerprinted four DEBT findings, which is the design, and revealed two the pass
  had created: a fill-in whose answer was printed in its own template, and a subsection two words over the
  reading budget. Neither was visible in the dry run's "new DEBT" count, because the items were new to the
  baseline either way. Both were fixed (passes 3b and 3c) rather than baselined, and the baseline shrank
  2,455 → 2,448. **Run `--baseline` without `--confirm` after every content publish and read every key it
  wants to add**: a re-key of the same rule on the same item is the fingerprint working, anything else is
  debt the packet just wrote.
- **2026-09-14 (packet 13, after Verify A round 2) — "removed from a section" means its body text too, and a
  census that reads titles cannot say it.** The ownership map called monopoly "Done" for market-failure after the
  block went; a paragraph, an exam tip, two real examples, a list item and a recall line still taught it, and
  the title-only census reported "nowhere". The row now states the limit and the pass-3 rules clear the text.
  A "Done" in that table is a claim about every string in the section, checked by reading, not by the census.
- **2026-09-14 (packet 13, after Verify A round 2) — a relabelled diagram is re-placed, not re-worded.** "Welfare
  loss" is five times wider than "DWL" and the triangles it names are 30-40 viewBox units across, so a word-for-
  word swap would have written the label across the curves. Each of the six is placed from the diagram's own
  geometry (curves, dashed lines, neighbouring labels), just outside its triangle, with a leader where the gap
  is wide; the tariff and quota triangles keep their letters ("Loss (b)") because the key under the axis
  already says "Net welfare loss = b+d". The census bans the abbreviation so it cannot come back.
- **2026-09-14 (packet 13, after Verify A round 2) — the over-reach class is cleared by rewriting the definition,
  not the word.** Round 1 fixed one sentence that widened "goods with external benefits" past its truth; round 2
  found the whole role-state-macroeconomy subsection still DEFINING the class by information failure. Under
  1.3.5.2c-d the class is under-consumed because the buyer ignores the benefit to third parties; imperfect
  information (1.3.5.4b) is a separate source that can widen the gap. Every sentence in that subsection and its
  notes says the first and, where it mentions information, says it is the second.
- **2026-09-14 (packet 13) — the public revision pages still teach what the app removed, and that is packet 57's.**
  The verifier counted 45 mentions of merit goods, deadweight loss, the accelerator and monopoly-as-market-failure
  across eight files under `app/economics/`, the tutor prompt and the model-answer data — surfaces the census
  cannot see and a student can. Some of those mentions are correct (the market-failure page explains that the
  IAL says "external benefits of consumption" where the UK course says "merit good"), so this is a reading pass
  over marketing copy, not a substitution, and it belongs with cross-surface consistency (packet 57). Minted as
  D014 with the file list so it cannot be forgotten.

- **2026-09-14 (packet 7) — a recall is one of four types, and the contract is the widget, the validator
  and the exemplar together.** `reorder`, `fillin`, `match`, `classify`, written out in CONTENT-GATE.md
  ("The recall contract"), graded in `lib/recall-widgets.js`, enforced by `lib/content-validator.mjs`, and
  rendered from `lib/recall-fixtures.js` at `/admin/widgets` and `/dev/widgets`. Match and classify exist
  because 66 of the 131 live reorders are rankings, pairings or parallel facts (March verdicts), and no
  rewording makes a ranking orderable. The two gallery exemplars are two of those 66, converted; they are
  the template for the rest. Content packets author into this contract, and the 18 not-orderable and 48
  weak reorders are converted one section at a time (F057, F107 → packet 57, which closes them by census).
- **2026-09-14 (packet 7) — `shuffled` is not content.** The start order of every widget is a Fisher-Yates
  permutation seeded by the recall id and the showing: never the identity, never with the first item
  already in place, and the spaced showing never the first showing's order. Random-at-mount was rejected
  because section content is server-rendered on first load (F118 was a hydration mismatch). The stored
  field is ignored by the renderer and the validator; the three rules about it (`reorder.permutation`,
  `reorder.identity`, `reorder.shuffle-reuse`) are retired, and a section packet deletes the field when it
  touches a reorder. `fillin.one-per-line` is retired too: the renderer draws every segment of a line, so a
  line with two blanks is a legitimate exercise, not a truncation. `fillin.token` refuses commas only —
  "rises, rises" is two answers in one blank; "next best alternative" is one chip.
- **2026-09-14 (packet 7) — the validator baseline grew, once, by rule.** 2,187 → 2,455 keys: +137
  `fillin.distractors`, +127 `recall.why`, +30 `fillin.leak`; −11 `fillin.one-per-line`, −11 `fillin.token`,
  −4 `reorder.shuffle-reuse`. The rule that the file only shrinks holds for content work; a packet that adds
  a rule adds that rule's live debt to the baseline in the same commit and records the delta here, so the
  growth is visible and attributable. No BLOCK was added: the new BLOCK rules (`schema.recall-type`,
  `match.*`, `classify.*`) fire on nothing live.
- **2026-09-14 (packet 7) — one score, unlimited tries.** A widget reports to the engine once, on its first
  check; Try again locks what was right and frees what was wrong; the answer, with the `why` lines, is on
  request after the first wrong check and automatic after the second. Retry is for consolidation; if it fed
  the score, every recall would be 100% and the completion screen would mean nothing (the F054 inflation by
  another route).
- **2026-09-14 (packet 7) — skipping has a consequence a student can see, and no server column.** Skip is
  a text button; a skip counts in the recall total and separately as skipped ("3/8 · 2 skipped" on the
  completion screen), and the skipped recall is preferred as the spaced recall at the next chapter check-in.
  Skipped ids persist in the section's local state only: `learn_mode_state` has no column for them, the
  route whitelists its fields, and adding a column is founder SQL. A review-mode consumer for recalls does
  not exist (ReviewMode renders MCQs), so the F055 fix's "feed skipped ids into the 1/3/7/14-day scheduler"
  is not done; the in-session return is the consequence that exists.
- **2026-09-14 (packet 7) — `InteractiveDiagram` and `RecallCheckpoint` are deleted, not mounted.** The
  12 September note above says packet 7 "mounts `InteractiveDiagram` and `DiagramLabelDrill`"; the plan and
  F061 say delete the two dead components and wire the drill. InteractiveDiagram was hover-only (fourteen
  mouse handlers, nothing for touch) on a mobile-heavy cohort, and RecallCheckpoint was the "recall at the
  top of the next step" pattern packet 5 removed on purpose. The drill is wired behind a "Label this diagram"
  button that appears only when the SVG carries three or more `text.draggable` labels. Measured: 0 of 74 live
  diagrams and 0 of 18 in `public/diagrams/` do, and the drill's old fallback (every `<text>` that was not
  a number) would have produced 6-40 "labels" per diagram, so the fallback is gone. The button appears
  nowhere until packets 13.5-13.7 author labels; the gallery proves it works on a fixture.
- **2026-09-14 (packet 14) — a ledger item that calls material off-spec is checked against the specification
  text before it is acted on.** Four packet-14 items (`quiz-04`, `specGap-06`, half of `topFix-03`, the audit's
  flashcard note) said contribution was "Unit 2 content, off-spec for 3.3". In the IAL specification contribution
  is sub-topic 5 of 3.3.3 (`bus_spec.txt:1175-1177`) and `spec-coverage.json` lists all three of its leaves as
  MISSING from this section. The March audit reasoned from the UK GCE, where contribution sits in Theme 2. So the
  packet teaches contribution rather than deleting it, removes break-even (2.3.2) and sensitivity analysis (in
  neither specification), and leaves the `sections` row at `3.3.3`, which is the IAL number the audit's "relabel
  as 3.3" would have broken. The same wrong-oracle rule as 12 September: a number or a scope claim in a finding
  is a hypothesis until the spec line is read.
- **2026-09-14 (packet 14) — a section rewrite is staged as one bundle, validated once.** `stageSection` validates
  one table against the LIVE copies of the other seven, which refuses a rewrite whose content pins into a new quiz
  array and new diagrams, whichever table goes first. `stageBundle()` in `scripts/_content-write.mjs` validates the
  whole would-be section (the same bundle `publish-section.mjs` validates), refuses on any new BLOCK, writes every
  table whose payload differs from live to `draft` and reads each back; unchanged tables are left alone. Section
  packets use it; single-table packets keep `stageSection`. The write-path test passes unchanged: the draft writes
  still go through the guarded client, and `data` is still written only by publish and restore.
- **2026-09-14 (packet 14) — the section template, as built for the pilot.** Blocks in the specification's own
  order, one subsection per spec sub-topic skill, one recall per subsection with its `why`, every fill-in with two
  distractors and semantic hints, a worked calculation in the body wherever the spec says "calculate", one diagram
  per chapter pinned by `diagramId`, `quizIndices` and `practiceIndices` on every block with the check-in item
  first, ≥ 20 quiz items with the correct answer spread across positions, practice at IAL tariffs only with
  levels-shaped guidance above 6 marks, and every subsection under the 350-word budget (this section runs 250-343).
  One fictional firm ("Kopi Kita", a Kuala Lumpur café chain) carries the worked examples across the whole section,
  so the numbers in the body, the notes, the diagrams and the practice items are the same numbers; the Real
  Example card holds only real things, and a real example that names an entity and a year or a figure carries
  its source in parentheses (Layer 4), otherwise it names no figure. One currency per section: this one is in
  dollars, chosen once and checked over the whole bundle by the runner.
- **2026-09-14 (packet 14) — the Notes chapters carry the specification's own phrasing where the coverage rule
  needs it, and the sentence must still teach.** `spec.uncovered` is lexical: three leaves worded "Calculations
  and interpretations of figures generated by these techniques" were taught in substance and still reported,
  because no single text field held three of the five distinctive words. Each now has a notes item that uses the
  phrase and says what the interpretation is (a payback against the target, an ARR against the interest rate, an
  EMV as an average, a net gain as what the option adds). Coverage 60% → 100%, and the sentences are true.
- **2026-09-14 (packet 14) — the packet's own runner is the first reader of a section, before the validator.**
  `scripts/packet-14-decision-making-techniques.mjs` prints every subsection's word count, refuses on pounds
  sterling, "sensitivity", "Outline", an uncited examiner claim or a third "break-even", checks that the worked
  figures appear in both the body and at least one other surface (Layer 5 by string), and only then runs the
  validator and stages. A section packet from here copies that shape: the checks that are specific to the section
  live in its runner, the general ones in the validator.
- **2026-09-14 (packet 14) — Layer 6 before publish: an adversarial reviewer on a copy with planted canaries.**
  The reviewer (Sonnet, read-only, census-counted) reads a copy of the bundle into which two defects were planted
  first: a quiz explanation whose arithmetic contradicts the marked option, and a backward-pass figure in the notes
  that contradicts the body and the diagram. A report that misses either is voided and the review is re-run on a
  higher tier. The reviewer never sees the live bundle, so a canary cannot leak into content.
- **2026-09-14 (packet 14) — the decision tree carries three `draggable` labels; no other diagram does.** The
  "Label this diagram" button packet 7 wired appears on the tree (decision node, chance node, payoffs), which is
  the one diagram in this topic the paper asks a student to construct. The network, the charts and the bars are
  read, not drawn, and their labels stay plain until packets 13.5-13.7 decide the label set for each diagram type.
- **2026-09-14 (packet 14) — the public Unit 3 landing page is out of date and belongs to packet 57.**
  `app/business/unit-3/page.js` lists this section's sub-topics in the March order and omits contribution. It is a
  marketing surface, not content; added to D014's file list rather than fixed here.
- **2026-09-15 (packet 15) — the app's `1.3.1` is the specification's own number, and four more ledger claims
  were checked against the spec before they were acted on.** `structure-11` said the number "is not IAL spec
  numbering (IAL Unit 1 topic 1.1 'Scarcity, choice and potential conflicts')". `econ_spec.txt:510` reads
  `1.3.1 Introductory concepts` — the number *and* the title are the specification's. Nothing was renumbered;
  the item is closed as no-change, like packet 14's "relabel as 3.3". The other three: `specGap-01` asks for
  factors of production **and their rewards** (rent, wages, interest, profit), which is no leaf of 1.3.1 — the
  four factors are named once inside 3a, because "capital" has to mean something for 4c/4d, and the rewards are
  not taught; quiz q24, which tested them, is deleted. `specGap-07` says the spec "names" Hayek and Marx: the
  IAL document names **Adam Smith only** (`:540`); Marx does not appear in it at all and Hayek appears once, at
  `:2636`, in a general co-teaching note. `specGap-06` asks whether comparative advantage belongs here: 5a asks
  for the advantages and disadvantages of specialisation and the division of labour, so the term was removed
  from `extras` rather than explained. `structure-07` cites "1.2.7" for the price mechanism, which is UK
  numbering, but its recommendation stands for the right reason — rationing, incentive and signalling are
  **1.3.4** (`:707-709`), a section that already exists, so that material left this one.
- **2026-09-15 (packet 15) — `C-introductory-concepts-specGap-08` moved to packet 17.** Economic agents and
  their objectives — consumers maximising utility, firms maximising profits — is 1.3.2·1 (`econ_spec.txt:580-582`),
  the `consumer-behaviour` section's own topic. Teaching it here would duplicate it. Reassigned rather than
  built, so the coverage it represents is still owed by someone.
- **2026-09-15 (packet 15) — 5c has five bullets and the ledger held three.** `specGap-09/10/11` cover saving,
  making funds available, and forward markets. The specification also asks for "to facilitate the exchange of
  goods and services" and "to provide a market for equities" (`econ_spec.txt:549, 551`). Minted as
  `specGap-12` and `specGap-13` and taught, the same way packet 14 minted its contribution item. A spec-derived
  ledger is not a complete one; the spec text is the oracle, and the count is read off it.
- **2026-09-15 (packet 15) — a diagram whose geometry is a claim is drawn by sampling the function it claims.**
  `accuracy-01` measured the March PPF path bulging convex between C and D while the checklist beside it told
  students a PPF is concave. The fix is not a better-drawn Bézier: `ppfK()` in `scripts/_packet15-util.mjs`
  defines K = −0.015C² − 0.05C + 40, the six labelled points are its exact values, and the SVG is a 101-point
  polyline sampled from it, so the curve a student sees IS the function the body works. The runner then
  re-samples the emitted path and refuses to stage if the gradient eases anywhere. That check earned its keep
  immediately: raising the sample count made the one-decimal screen coordinates round into a false wobble at
  the flat end, which the check caught and two decimals fixed. **Where a diagram asserts a mathematical
  property, generate it from the property and verify the output, rather than drawing it and asserting.**
- **2026-09-15 (packet 15) — the pre-test is the first three unpinned quiz items, so which three is a
  content decision.** `structure-06` described a random draw; since F079 `components/learn-mode/PreTest.jsx`
  takes the first three items no block has reserved, in stable array order. Pinning all 32 items would have
  pushed the pre-test onto reserved questions a student meets again minutes later. Four core items — one each
  from chapters 3, 4, 5 and 6 — are deliberately left unpinned, and the first three of those are the pre-test.
  The post-test re-asking an item is NOT changed: `PostTest.jsx:28` prioritises what the student got wrong,
  which is the point of it.
- **2026-09-15 (packet 15) — eighteen small steps, not fifteen medium ones.** Packet 14's template said one
  subsection per spec skill; this section has 25 leaves in six sub-topics, which came out as 18 subsections
  against packet 14's 15. That is the treatment, not an overrun: the section's defect is 167 of 192 starts
  stopping on step 0, and the fix for a step that is too full is more steps, not denser ones. Every subsection
  lands between 298 and 350 words of the 350 budget. A section packet should size its blocks from the spec's
  own sub-topics and let the step count follow.
- **2026-09-15 (packet 15) — no real example in this section names a year or a figure.** Layer 4 requires a
  source on any real example that does, and packet 14's Layer 6 still found an overstated sourced figure. For
  a conceptual first topic the examples do not need statistics to work, so they carry none: the eighteen
  examples are structural (two similar economies choosing different housing policies, a metro map as a model,
  an overfished stock, a congestion charge). Nothing to overstate is a stronger guarantee than a citation.
- **2026-09-15 (packet 15) — a word-bank fill-in cannot be "stem-tolerant", so half of `topFix-01` is
  obsolete.** The item asks for fill-in matching that accepts "signalling"/"ought". Under packet 7's recall
  contract a fill-in is a chip bank (`lib/recall-widgets.js:200-207`) graded on the chip's own text by
  `gradeFillin` (`:209-215`); the student never types, so there is no stem variant to be intolerant of. Closed
  with that evidence rather than built. The other half — replacing the four non-genuine reorders with
  sort/match exercises — is built.
- **2026-09-15 (packet 15) — the coverage oracle itself is missing 60 specification bullets, and fixing it
  is NOT part of this packet.** `audit/scripts/build-spec-items.mjs` matches a bullet with
  `/^\s*[•●▪‣]\s*(.*)$/`, anchored to the start of the line. The extracted specification puts the left-hand
  topic-title column on the same line as a list's first bullets — `   possibility                    •   the
  maximum productive potential of an economy` — so those lines never match. Counting bullet characters in the
  raw text against the ones the builder parsed: **31 dropped in Economics, 29 in Business, 60 in all.**
  `spec-items.json` is what `spec.coverage` and `spec.uncovered` are computed from, so those requirements are
  invisible to every content packet: 1.3.1's point 4a keeps three of its five bullets, and Business loses
  Ansoff's Matrix and Porter's Strategic Matrix among others. A section can report 100% coverage while never
  teaching them, which is exactly what this section's 4a did.
  Minted as **V001 in packet 3.1** rather than fixed here. Regenerating the asset changes the leaf count for
  all 43 sections and will add `spec.uncovered` DEBT across many of them; that is a cross-cutting change with
  its own baseline diff to read, and it does not belong inside a section packet. **It should be done before
  packet 16**, because every content packet from here measures itself against the incomplete oracle.
  Found the way [[revvylearn-verify-independently]] says to: by counting the raw specification independently,
  rather than by asking the generated asset whether it was complete.
- **2026-09-15 (packet 15) — Layer 6 found two things no automated check in this repo can see, and both were
  inside assets the packet *kept*.** The validator, the census, the runner's own phrase bans and the
  independent arithmetic re-check all passed on a bundle that still carried (a) two March flashcards defining
  **allocative efficiency**, a term with zero occurrences anywhere else in the section and no leaf in 1.3.1,
  and (b) the retained economic-systems SVG placing **"UK" at the exact midpoint of the spectrum bar, colour-
  matched to the "Mixed" label**, with "USA" beside it, while the block's own text names Hong Kong, Singapore,
  the Nordic economies and North Korea. `locale.institution` matches institutions, not country framing, and
  `depth.notes-titles` compares titles, not card bodies. **The lesson is about retained assets specifically:
  a packet audits what it writes and trusts what it keeps.** A section packet should read every kept card,
  mistake and diagram against the spec span and against the audience, exactly as it reads the new ones — the
  packet-13 finding ("a substitution rule written for prose cannot match a flow step, a takeaway or a
  flashcard") one step further out.
- **2026-09-15 (packet 15) — leave exactly three quiz items unpinned, not four.** `PreTest.jsx` slices the
  unreserved pool at three, so a fourth unpinned item reaches no surface a block links to — `structure-01`'s
  complaint in miniature. Layer 6 read the four-item version as an off-by-one repeated in four blocks, which
  is a fair reading of what it looked like from outside. The number of deliberately unpinned items is exactly
  the pre-test's slice size, and the runner says so in a comment so the next reader does not have to infer it.
- **2026-09-15 (packet 15) — write the Layer 6 brief's spec span from the last leaf, not the last page.**
  The brief gave `econ_spec.txt:510-568`; 6c sits at 569, so the reviewer correctly reported an entire
  subsection and its six dependents as out of scope, then correctly guessed the span had been truncated
  mid-list. No content was wrong. Check the span's final line against `spec-items.json` before briefing.
- **2026-09-15 (packet 15) — `npm run validate` is a WHOLE-DATABASE gate in a worktree several sessions
  write to, so a packet can be blocked by another packet's live content.** Mid-build, `decision-making-
  techniques` was restored to its pre-packet-14 state by the packet-14 session on the founder's instruction.
  Between two `npm run validate` runs minutes apart the totals went from 0 new findings to 11 new BLOCK and
  22 new DEBT, all in that one section. Packet 15's own section was and stayed 0 BLOCK / 0 DEBT / 100%.
  Two things to carry forward. **First, diagnose before alarming:** the `updated_at` column on those rows read
  March, which looked like a smoking gun until the freshly published `introductory-concepts` row showed March
  too — that column is not maintained on write. The signal that actually distinguishes a restore from a publish
  is `published_at` (untouched) plus an empty `draft`, because `restore-section.mjs` writes only `data`.
  **Second, the baseline is shared state:** this packet's `--baseline --confirm` removed 78 keys, all its own,
  at a moment when that other section was still packet-14 content. If the restore is permanent, that section's
  33 keys have to go back, and that is the restoring session's call. A packet should record what its own
  baseline write changed (+0 −78 here) so a concurrent write can be told apart from its own.
- **2026-09-14 (packet 14, post-gate) — reverted from live content; packet 14 is built and verified, not shipped.**
  Packet 14's PROTOCOL lifecycle treated publish as a normal content-packet step, the way packet 13's was, without
  checking whether the new content instantiated a code dependency packet 13's did not. It did: two of the four
  recall types (`match`, `classify`) and the `MatchRecall`/`ClassifyRecall`/`lib/recall-widgets.js` code that
  renders them exist only on `remediation/2026-09` (packet 7), not on `main`. A live console error on
  `revvylearn.com` was seen right after publish and (wrongly, at first) attributed to that gap; the section's
  content was restored from the automatic pre-publish snapshot
  (`audit/snapshots/auto-prepublish-2026-09-14T18-26-00-292Z__business__decision-making-techniques.json`) and the
  validator baseline reverted alongside it (2,415 → 2,448 keys, matching `origin/main`'s commit at the time).
  Both are confirmed exact: `npm run validate` reports the section's original 11 BLOCK / 22 DEBT / 60%, and a
  table-by-table diff of the restored live bundle against the snapshot is byte-identical on all 8 tables.
  **The rule for every content packet from here: check `git show origin/main:<path>` for the components and
  library files the new content's recall types or body-item types need, BEFORE publishing, not after a crash.**
  A packet whose recalls are all `reorder`/`fillin` (main has both) can publish standalone; a packet using
  `match`/`classify` cannot until the checkpoint ships packet 7's code. The rewritten content itself is untouched
  and safe: `scripts/_packet14-*.mjs` and `audit/snapshots/packet-14-bundle__business__decision-making-techniques.json`
  hold the verified, reviewed version exactly as Verify A confirmed it. Publish it with
  `node scripts/publish-section.mjs decision-making-techniques --confirm` (content already staged as `draft`
  needs re-staging first via `node scripts/packet-14-decision-making-techniques.mjs --stage`, since the restore
  overwrote `data` but the `draft` column was already null from the original publish) once packets 5 and 7 are
  on `main`.
- **2026-09-14 (packet 14, post-revert) — a pre-existing production crash on this section, unrelated to packet 14.**
  With the content back to its exact pre-packet-14 state, `decision-making-techniques`'s Learn Mode still throws
  an uncaught `TypeError: Cannot read properties of undefined (reading 'map')` on the first click into it, on
  `main` as deployed. It is not this packet's bug: `business-growth`, never touched this session, throws the
  identical error at the identical script location and renders correctly regardless; `origin/main` has no
  `components/learn-mode/FlowChain.jsx` at all (production's Learn Mode is a materially older, more monolithic
  version of this code than the remediation branch), so the two branches have diverged further than file-level
  feature gaps and a file-by-file diff will not quickly find this. Not investigated further this session — flagged
  here rather than guessed at again on the live site. Whoever picks this up: start from `git show
  origin/main:components/LearnModeTab.jsx` and this section's restored `content[]` (the two blocks with `flow`
  body items are the one structural thing distinguishing it from sections that load cleanly), and check
  Vercel's function logs for the actual thrown line, which is faster than re-deriving it from a diff.
- **2026-09-15 (packet 15) — classify chips could not wrap at 390px, so one long item dragged the whole
  document sideways.** The founder found it on live content: on the positive/normative classify, items like
  "Two-thirds of the workforce is employed in services" were cut off at the right edge, and because the
  document then had horizontal scroll, every later step rendered shifted until the page was scrolled back —
  a heading reading "ue Judgements in Policy" and a key idea clipped down its left side. Cause:
  `app/globals.css` phone block, `.lm-word-chip, .lm-fillin-blank { … white-space: nowrap; }`. That nowrap is
  correct and deliberate for fill-ins, where it stops a blank breaking mid-word ("underproduces"), but
  `.lm-word-chip` is also the class on classify items, which are whole statements. Fixed by tagging the
  classify word-bank items `lm-classify-chip` in `ClassifyRecall.jsx` — the placed chips already carried it —
  and adding `.lm-word-chip.lm-classify-chip { white-space: normal; text-align: left; max-width: 100%; }`
  after the rule it must beat, per the packet-5 rule about phone CSS.
  **Why no gate caught it:** the validator reads content, not layout; `npm run contrast` checks colour; and
  packet 7's gallery fixtures and packet 14's classify items are all short. A census of live content found
  exactly **one** section with a classify item over 45 characters — this one, with five — so packet 15 is the
  first content able to trigger it, and every later section is now protected. **A widget is only proven by
  content that stresses it; a fixture that fits is not evidence that a real item will.**

- **2026-09-16 (packet 17) — five more ledger claims the specification refutes or redirects.**
  `specGap-02` asks for "conditions of demand" as the specification's term for the shift factors. The phrase
  appears **zero times** in `audit/raw/econ_spec.txt`: it is AQA vocabulary, and the IAL spec writes "Factors
  that may cause a shift in the demand curve" (`:596`). Teaching a student to expect wording an IAL paper never
  uses is worse than teaching nothing, so it is closed as no-change and the March common-mistake card that
  carried the phrase in its title was rewritten in place. `specGap-06` asks two things and both are answered by
  the text: its guess that the behavioural subsection is off-spec is **wrong** — `1b` names six reasons
  consumers may not aim to maximise utility (`:583-589`) — but its instinct was right about the *vocabulary*,
  because "anchoring", "loss aversion" and "bounded rationality" appear zero times in the document and the only
  occurrence of "behavioural" anywhere in it is `:1281`, "behavioural theories: satisficing", in a
  firms'-objectives topic that is not this one; its second half, that elasticities may be a separate spec point
  leaving the section over-packed, is refuted by the numbering — price, income and cross elasticities are
  sub-topic **3 of 1.3.2 itself**, 24 of the topic's 39 leaves. `topFix-02` prescribes "Assess 10/12": IAL
  **Economics** has no Assess and no 10-mark tariff (`:2704-2747`), so that clause is the Business ladder and is
  refused while its four other clauses are built. `structure-01` and the sort-bug halves of `topFix-02`,
  `practice-01` and `practice-02` describe a code defect **packet 2 already fixed** —
  `components/LearnModeTab.jsx:193-194` resolves `practiceIndices` against the raw array — so only the content
  half remained. `topFix-04` asks for a `diagramRef`, which since packet 5 is not how a diagram reaches a
  student; both invisible diagrams are rebuilt and pinned by `diagramId`. Five sections in, the rate is steady:
  four wrong claims in packet 14, four in 15, six in 16, five here. **A number or a scope claim in a finding is
  a hypothesis until the spec line is read.**

- **2026-09-16 (packet 17) — the income and substitution effects are not IAL Economics vocabulary, and this is
  the third time the same rule has been needed.** `grep -i "substitution effect\|income effect"` on
  `audit/raw/econ_spec.txt` returns nothing, and so does the bare word "substitution": the specification's
  answer to why the demand curve slopes downward is `2c`, diminishing marginal utility and its significance for
  the shape of the individual demand curve. The March section taught the two effects as the explanation and
  never made the DMU link at all, which is what `specGap-01` and `structure-06` were about. Layer 6 found the
  first draft still carrying them. Removed from the body and from the Notes. The general rule, now settled by
  packet 13's eight frameworks, packet 16's "barriers to entry" and this: **where the specification supplies no
  vocabulary for a leaf, teach the mechanism in the specification's own words, and name the standard term as an
  aside only if a student would otherwise be lost without it.** The goods called "substitutes" stay — they are
  `2d`, `3d` and `3i`. It is the *effects* that are not in the document.

- **2026-09-16 (packet 17) — one linear demand schedule carries six of the topic's leaves.** 1.3.2 asks for the
  demand curve, a PED calculation, the five PED values, how PED varies along a straight line, total revenue and
  the PED-revenue relationship. All six are properties of one line, so the section uses one: `Q = 1200 − 40P`
  (tickets a day, fare in dollars), whose midpoint is `P = $15, Q = 600`, where PED is exactly −1 and total
  revenue peaks at $9,000. Every figure in the body, the diagrams, the notes, the quiz and the practice is
  derived from it in `scripts/_packet17-util.mjs`, and the runner re-derives each result from its own inputs and
  re-reads the emitted SVG coordinates back out. A student who learns the schedule has learned six leaves rather
  than six facts, and a change to the function cannot leave a stale number anywhere. This is packet 15's
  `accuracy-01` rule generalised from one diagram to a whole section: **where a section's arithmetic recurs,
  define it once as a function and generate every surface from it.**

- **2026-09-16 (packet 17) — a chapter check-in names only what it carries.** The check-in's opening sentence
  was a fixed string promising "the diagram, a quick question, and one thing from earlier". Chapter 6 of this
  section has no diagram on purpose — the significance of the three elasticities for firms, consumers and
  government is an argument, not a drawing — and chapter 1 can have no spaced recall, because there is no
  earlier chapter. The sentence is now built from what the step renders and disappears if it renders none of the
  three (`components/LearnModeTab.jsx`). Found by walking the section at 390×844, and it is the same class as
  packet 16's "Three questions" over a two-question pre-test: **copy that enumerates what follows has to be
  generated from what follows.**

- **2026-09-16 (packet 17) — a free student cannot have both an honest pre-test and a check-in quiz, and that
  is the founder's call, not a packet's.** Packet 16 put the unpinned quiz items first so the pre-test would
  stop asking questions a check-in asks again. The consequence, measured here by A/B rather than reasoned about:
  `GET /api/sections/[id]` caps a signed-out student's quiz at `PREVIEW_LIMITS.quiz` (2), those two are now the
  pre-test's own, and **all six chapter check-ins therefore show no quiz item at all**. Raising the cap to 40 in
  `lib/preview-limits.js`, reloading and walking again put a quiz on every check-in, which proves the pins are
  right and the cap is the cause; the file was restored immediately and `git diff` on it is empty. Widening the
  slice is a freemium-boundary decision. Recorded rather than worked around, because a content packet working
  around it would have to un-do packet 16's fix.

- **2026-09-15 (packet 16) — five more ledger claims the specification refutes, and one it redirects.**
  Every `1.1.x` number in this section's ledger is UK GCE Theme 1; the IAL topic is 1.3.1
  (`bus_spec.txt:504`). `structure-07` calls sampling "not on the IAL spec" and `topFix-04` acts on that by
  asking for the sampling block to shrink to a single "sample size and bias" subsection — but `:534-537`
  reads `d) Sampling methods: • random • quota • stratified`, three required leaves, so acting on the claim
  would have deleted required content. The weighting complaint is valid and the remedy is not: sampling now
  has one subsection teaching all three named methods, with size and bias as a paragraph inside it.
  `structure-06` calls the block order scrambled; in IAL, product and market orientation is **3a** (`:538`)
  and segmentation is **3c** (`:541`), both inside *Market positioning*, which is where the March section
  already had them — closed as no-change. `specGap-05` asks for "limitations of market research" as a
  topic: the string "limitation" appears eight times in the Business specification and never inside 1.3.1
  (`:906, :908, :1154, :1161, :1165, :1174, :1236, :1242`), so limitations are taught as the **evaluation**
  attached to the research subsections, where the AO3/AO4 marks for them sit, and the practice item whose
  guidance demanded untaught material is rewritten — the same shape as packet 15 deleting quiz q24 rather
  than building a rewards subsection. `specGap-06` asks for "use of ICT to support market research": "ICT"
  appears **nowhere** in the Business specification and neither does "social networking", but `2c` names
  `• websites/social media` (`:530`) and `• databases.` (`:533`) as secondary research **methods**, so that
  is how they are built — which also closes `specThin-02`, `specThin-03` and three `spec.uncovered` leaves.
  `structure-09` and `structure-11` are observations ("takeaways match their blocks well", "misconceptions
  are genuine student errors — this is a strength"), closed as no-change, and the misconceptions are kept
  and read against the spec span rather than rewritten.

- **2026-09-15 (packet 16) — V001 does not reach every section, and the only way to know is to count.**
  The packet-15 handoff asks packet 16 either to fix the dropped-bullet bug in
  `audit/scripts/build-spec-items.mjs` or to accept an incomplete oracle. Counting bullet characters in
  `bus_spec.txt:504-545` independently of the generated asset: **21 bullets, every one at line start, and
  all 29 leaves present in `spec-items.json`**. The line-anchored regex drops nothing in this span, so this
  section's coverage number is trustworthy and V001 stays packet 3.1's. It does **not** follow that the
  next Business packet inherits that result — Ansoff and Porter's Strategic Matrix are among the 29
  Business bullets dropped elsewhere. Count the span; do not assume it.

- **2026-09-15 (packet 16) — "barriers to entry" is not Business vocabulary, and the test is the spec, not
  familiarity.** `grep -i barrier audit/raw/bus_spec.txt` returns four hits and none of them is this idea:
  "Barriers to entrepreneurship" (`:768`), trade barriers (`:1343`, `:1359`) and an access phrase
  (`:1817`). The term IS in the IAL **Economics** specification (`:1386`, `:1425`). The first draft made it
  load-bearing in eleven places across branding, competition and competitive advantage, and **assessed** it:
  a quiz item whose correct answer was correct only if you knew the label. Spec 1c ("How competition affects
  the market") carries no sub-bullets, so the concept is legitimate elaboration and the vocabulary is not:
  it is named twice, explicitly as the term the Economics papers use, and tested nowhere. The general rule,
  after packet 13's eight frameworks: where the specification supplies no vocabulary for a leaf, teach the
  mechanism in plain words and name the standard term as an aside rather than as the thing being learned.

- **2026-09-15 (packet 16) — the validator's `claim.uncited` rule has a word-shaped hole, and Layer 6 is
  what finds it.** The rule fires on `\bexaminers?\s+(reward|penalise|expect|…)`. A sentence that asserts
  exactly the same thing without the word — "an unlabelled axis costs marks no commentary recovers", "that
  earns half the marks", "a plotted point without its brand name earns nothing" — passes untouched. Layer 6
  found thirteen in this bundle's first draft, in `examMatters`, in notes takeaways and in practice
  guidance. All thirteen now say what the **command word requires**, which Appendix 6 states and which can
  therefore be cited, rather than what a marker does with an answer, which cannot. The packet's runner
  refuses the class by regex. Widening `claim.uncited` itself is packet 3's call, not a section packet's:
  the phrasing is unbounded and a lexical rule will keep losing to it, which is the case for Layer 6
  existing rather than for a longer regex.

- **2026-09-15 (packet 16) — the pre-test is the first three UNRESERVED items of what the STUDENT is sent,
  which for most students is two items.** Packet 15 settled that the deliberately unpinned items are the
  pre-test, and that is true for a Pro student. `GET /api/sections/[id]` caps a free or signed-out
  student's quiz at `PREVIEW_LIMITS.quiz` (2) since F086, and `PreTest.jsx` slices whatever it is given. So
  with the unpinned items at the END of a 37-item array, the two a free student received were both PINNED
  ones — and the pre-test asked a question the chapter-1 check-in asked again minutes later, which is
  precisely the defect F079 removed. It has been live for every signed-out student since F086. Fixed in
  content, not in code: **the unpinned items go FIRST in the array**, so the free slice is drawn from the
  pre-test's own pool. Every section packet from here puts its pre-test items first, and the widening of
  the free quiz slice — which would be the code fix — is a freemium-boundary decision and so the founder's.

- **2026-09-15 (packet 16) — a dev-only `?draft=1`, because a held section still has to be walked.**
  Three finished sections (14, 15, 16) are now staged and unpublishable until packets 5 and 7 reach main,
  and the PROTOCOL gate requires a 390×844 walkthrough of each. Nothing on the student path reads `draft`,
  so there was no route to one; packets 14 and 15 walked live content and were reverted afterwards, which
  is how production went down twice. `GET /api/sections/[id]` now serves `draft` (falling back to `data`
  per table) when `?draft=1` is set **and** `NODE_ENV !== 'production'`, with `Cache-Control: no-store` so
  a re-stage is visible immediately; `StudyApp` forwards the flag and refetches the server-rendered first
  section when it is set. Vercel previews build with `NODE_ENV=production`, so the flag cannot reach a
  student. One guard, on the server, is the whole of it.

- **2026-09-15 (packet 16) — PROTOCOL changed: the verifier's agent type must be able to write the ledger.**
  Verify A is defined as an agent that confirms or rejects each id *through* `ledger.mjs`, and the CLI writes
  `audit/ledger.json`. This session had no `packet-verifier` type available and substituted a read-only
  search agent, which read the diff, the bundle and the specification, reached a correct verdict on all 32
  ids — and then refused to run a single `confirm`, because writing a file is outside what its type permits.
  The pass had to be re-run by an agent that could write. "Read-only" in PROTOCOL means *it may change
  nothing but the ledger*, not *it may change nothing*; the file now says so, in its own commit as PROTOCOL
  requires.

- **2026-09-15 (packet 16) — a multi-part ledger item is satisfied clause by clause, and the builder is
  the worst judge of that.** Five of Verify A's rejections across this packet were the same shape: an item
  that names three or four things, of which the packet did two or three and then read the item as done.
  `topFix-01` asks for a 4-mark AND an 8/10-mark item for each of three topics — twelve marks' worth of
  pairs, of which the eight-item set had none complete. `topFix-05` names four jobs (delete duplicates, fix
  three ambiguous items, remove absolute-word distractors) and took three rounds, because each pass fixed
  the absolutes it had noticed rather than scanning every option of all 37 items. `topFix-02` names a recall
  TYPE for a named subsection and got a different, defensible type. The rule for every content packet from
  here: **split a multi-part item into its clauses before building, check them off individually, and say in
  the spec block which clause each artefact satisfies.** A verifier that counts clauses will find what a
  builder reading for overall sense will not.

- **2026-09-15 (packet 16) — the builder's defence of a distractor lost to the verifier's, and should
  have.** "Entry becomes impossible without an established brand" was kept on the argument that the item's
  explanation exists to answer it. Round 3's counter: it inflates a true directional claim into an absolute,
  which is the same shape as the options already replaced, and a student eliminates it without reading the
  stem either way. That is the better test, and it is the one to apply: **a distractor is a defect when the
  word alone kills it, and legitimate when it states a coherent alternative concept ("a market in which only
  one firm is permitted to sell" is a monopoly) or wrong reasoning that needs the stem to evaluate ("the
  data is all quantitative").** Not because of what its explanation happens to say.

- **2026-09-15 (packet 16) — a revert has two halves, and packet 15 shipped one of them.** `npm run
  validate` was exiting 1 with 25 new BLOCK and 53 new DEBT, all in `introductory-concepts`: packet 15
  removed 78 keys from the baseline when it published, its content was reverted the same day, and the
  baseline was not. Packet 14 did this correctly after its own revert (2,415 → 2,448, matching
  `origin/main`); this is the same repair, 2,370 → 2,448, +78 −0, every key that section's. The 78 go away
  again when packet 15 republishes at the checkpoint. **Revert the baseline in the same commit as the
  content, or the next packet's gate inherits a failure that is not its own** — and because the file is
  shared state, record what your own write changed, by section, not by total.

## 15 September 2026 — packet 5.1, the resume pointer (Opus 5)

**Found from a live bug, not from the audit corpus.** Ronald hit "You left off at step 20 of 9", a 222%
bar, an empty step body and a Back/Next pair with nothing between them. Packet 5 closed F026 with a clamp
on READ (`clampStep` in `LearnModeTab`), and that clamp is correct; what it did not cover is that the
pointer is also *written* unclamped and *displayed* unclamped somewhere else. Three things followed.

**A high-water mark needs the same clamp on the way in as on the way out.** `persistLearnStep` did
`Math.max(prev, step)`, so a pointer written against a longer step list — a section rewritten smaller
(packets 13, 14), or the packet-5 model counting the same blocks differently from the pairing model it
replaced — was carried forward for ever and could never come back down. Combined with `isLastStep`
(`currentStep === totalSteps - 1`, only ever true AT the last index, never past it) the student got an
endless "Next", each click writing a bigger number, and could never reach "Complete topic". The rule now
lives in `lib/learn-steps.js` as `furthestStep()` next to the model it depends on, not in the component,
and it clamps the carried-forward value too — so a poisoned row **heals itself** on the next step taken.
Live measurement before the fix: 120 rows across 43 students already past their own `total_steps`.

**A percentage must not be computed from two numbers that were written at different times.**
`SectionOverview` divided the saved `furthest_step` by the saved `total_steps`; both come from the row, so
the bar was internally consistent and still wrong — 120 bars over 100%, worst 233%. It now measures
against `countSteps()` of the content that exists now (the count already in scope for F030) with the
pointer clamped into it, falling back to the row's total only while the content is still loading. A/B over
all 1,134 live rows: 120 bars over 100% before, 0 after, none negative.

**Consequence to expect at the checkpoint merge:** with the denominator switching from the pairing count to
the packet-5 count, almost every student's Learn Mode bar roughly halves (e.g. 100% → 46%). That is honest —
the sections really did get about twice as many steps — but it will look like lost progress the day packet 5
ships, and it is worth a line in the release note or a re-engagement email rather than a surprise.

**A repair script names the model it repairs against.** A pointer is only "out of range" relative to the
build that reads it, so `scripts/repair-progress-pointers.mjs` takes `--model pair` (what main serves now)
or `--model steps` (packet 5's `countSteps`, the default) instead of guessing; the pairing model is
reproduced inside the script, not imported, because it does not exist in this branch, and the flag can be
deleted once main no longer serves it. The script only ever LOWERS a pointer and only touches rows that are
genuinely out of range, so it is idempotent and safe to re-run. It writes nothing without `--confirm`.

**`ledger.mjs claim` was locked out of the sub-packet convention.** It validated the packet number with
`Number.isInteger`, but 3.1, 13.1 and 5.1 all exist and D001-D008 carry `closed_by: "packet-13.1"`. The
guard exists to reject a MISSING number (`claim F004 F006` wrote `packet-NaN` and reported success), which
`Number.isFinite` still does. Changed to `Number.isFinite`, with the original failure re-tested.

**Session note: two sessions shared the worktree.** A packet-15 session holds `audit/ledger.json`,
`audit/validator-baseline.json` and the top of `audit/NEXT.md` with in-flight claims. This packet's D015-D017
were minted with the CLI (so the ledger on disk is correct) but **`audit/ledger.json` was deliberately not
staged**, and NEXT.md was appended to rather than rewritten. Whoever commits the ledger next carries them.
- **2026-09-15 (packet 15) — this packet's `validator-baseline.json` commit carries a second, unrelated
  change, and that is stated here so nobody has to infer it.** Measured against `HEAD`, the file this packet
  commits is **−78 `introductory-concepts` keys** (packet 15's own cleared debt) **and +33
  `decision-making-techniques` keys**. The 33 are not packet 15's: the packet-14 session restored that
  section to its pre-packet-14 state on the founder's instruction and re-baselined its March findings, which
  is the right thing to do — without it `npm run validate` would fail for everyone, permanently, over content
  that is deliberately where it is. Verify A flagged the absorption independently and was right to: committed
  without this note, the diff would read as packet 15 quietly baselining someone else's regression to make its
  own gate pass. **A packet that writes a shared file should record its diff by section, not by total**, so a
  concurrent write can be told from its own. If the packet-14 content is later restored forward again, those
  33 keys come back out.
