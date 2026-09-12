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
