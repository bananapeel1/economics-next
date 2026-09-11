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
