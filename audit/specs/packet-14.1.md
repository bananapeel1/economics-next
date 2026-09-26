# Packet 14.1 spec — re-check and close out packet 14, Business 3.3.3 decision-making techniques

Opus 5.5, 26 September 2026. Founder ruling the same day: re-check packet 14 against today's rules, fix
what fails, then publish if it passes.

## Why

Packet 14 (the format pilot) was built and Verify-A'd on 14 September, published, and reverted the same
evening because `match`/`classify` were not yet on `main`. It was never republished. Production
(`/api/sections/decision-making-techniques`, read 26 Sep) still serves the March section: 2 blocks, 0
recalls, 0 diagrams, 5 practice items, three of them at illegal tariffs (packet 12.5's list). The rebuilt
content predates every rule added since 14 Sep, so it is re-checked here rather than published as built.

Source of truth: `scripts/_packet14-content.mjs`, `_packet14-assessment.mjs`, `_packet14-diagrams.mjs`,
assembled and gated by `scripts/packet-14-decision-making-techniques.mjs`. The committed bundle dump is
`audit/snapshots/packet-14-bundle__business__decision-making-techniques.json`.

## Measured on 26 Sep before any change (runner dry run, today's validator)

- 0 BLOCK; 6 new DEBT, all `practice.opening`; spec coverage 20 of 20 leaves.
- `recall.recoverable`: **33 answers across 12 of 15 recalls**. The section has no row in
  `audit/recall-census-baseline.json`, so `npm run recalls` holds it to zero.
- Quiz: correct option uniquely longest on 8 of 32 (chance is 8); above 1.2x on quiz 11 (1.32), 16 (1.48),
  30 (1.26). Positions 8·8·9·7.
- Check-ins: the pinned first items are quiz 3, 14, 18, 23, 30. On `main` (PR #43) the check-in shows the
  eyebrow, "Chapter check-in", a generic intro sentence and the question before anything else; none of
  those states a key. Quiz 18 asks the body's own worked tree ($200,000 cost, 0.6 × $500,000 + 0.4 ×
  $100,000, net gain $140,000), which the diagram shows after answering: DEBT under the question-first rule.
- Diagrams: 500-unit frame, 9-11-unit faces (5.5px inline at 390px, the same as the 197 other 500u
  diagrams; the enlarge sheet sizes itself to 12px per smallest face, DECISIONS 21 Sep, packet 11).
  The packet-40 collision guard (tolerance 1.2) on the emitted SVG fires on: the four decision-tree
  probability labels (drawn across their branches), "the cost is recovered" (on the dashed line),
  "Trend, extended into the future" (on a gridline), "+$10k" (on the cash-flow line), and four stacked
  pairs at exactly 1.2 (tree option/cost, CPA activity/float). The rotated y-axis titles it also reports
  are the guard not reading `transform`, not defects.
- Rule 3 (fields vs origin/main at 540825f): recall shapes (reorder ignores `shuffled`; fill-in reads
  template/answers/hints; match pairs; classify groups), diagrams (`svg`, `scenarios[].label/svg`,
  checklist, description), mistakes (canonical `title/mistake/correction/examTip`, `lib/mistakes-shape.js`),
  extras (`chains[].title/steps/result`, `evaluation[].title/content`), notes (`title/meta/keyIdea/blocks/
  formula(s)/flow/takeaway/examMatters/misconception`) — all read on main. To be confirmed independently.
- IAL numbering: the only spec number in the bundle is `3.3.3`; no UK GCE numbering, no £.

## Ledger ids (packet 14.1)

| Id | Closed when |
|---|---|
| `C-decision-making-techniques-recheck-01` | the runner reports 0 `recall.recoverable` AND `npm run recalls` exits 0 after `--stage`, with every recall still the right type, naming its criterion, carrying its `why` |
| `-recheck-02` | 0 `practice.opening`; every guidance's first paragraph is a scaffold with no figure, no mark allocation, no answer; mark points in paragraph 2+ as "(n marks)" for items ≤ 6 marks; levels items (12, 20) keep level bands |
| `-recheck-03` | no pre-answer text states a check-in key; quiz 18 asked with its own figures, no option near a figure on the Decision Trees diagram; no correct option above 1.2x its longest distractor; one leaks/clean line per check-in recorded in this file |
| `-recheck-04` | the runner's collision guard (ported from packet 49, A/B-probed) is clean on every emitted SVG; enlarged at 390x844 every label is readable |
| `-recheck-05` | Verify A confirms, against `git show origin/main:<file>`, every field the bundle carries; IAL 3.3.3 only; 20 leaves of `bus_spec.txt:1146-1177` taught; contribution taught; sensitivity analysis absent; break-even only as the designed Unit 2 cross-reference (two mentions, not taught); every practice (command, tariff) legal for WBS13 per Appendix 6 |
| `-recheck-06` | a PR to `main` updates the decision-making-techniques tile in `app/business/unit-3/page.js` and the matching line in `app/business/page.js` to the five chapters in spec words; CI green; not merged |

Not in scope: the paper-layout practice rebuild (26 Sep ruling) — Business 3.3.3 is ROLLOUT packet 135, which
the founder has not scheduled. The eight practice items stay as eight standalone items at legal tariffs.

## Acceptance checks a verifier can run without the conversation

1. `node scripts/packet-14-decision-making-techniques.mjs` → exit 0: 0 BLOCK, 0 new DEBT, 0 recoverable,
   collision guard clean, quiz length ≤ 1.2x, every word count ≤ 350.
2. After `--stage`: `npm run recalls`, `npm run exposure`, `npm run validate`, `npm test`, `npm run build`
   exit 0; `curl localhost:3001/api/sections/decision-making-techniques?draft=1` matches the dump field by field.
3. `git show origin/main:components/...` for every reader named above, against the dump.
4. Verify B at 390x844 on :3001 `?draft=1`, signed out, storage cleared: overview → Learn → every teach step
   (recall below the teaching, answer not visible above it) → every check-in (question, diagram enlarged and
   readable, practice card opens with a scaffold, "Mark my answer" shows a checklist for items ≤ 6 marks) →
   completion. The remediation branch may lack PR #43, so the question-first order is "could not verify on
   :3001" rather than a failure.

## Check-in record (filled by the builder, re-read by Verify A)

Read 26 Sep by the 14.1 content author against the dry-run bundle and `git show origin/main:components/LearnModeTab.jsx`
(question first; intro sentence built from what the check-in carries: "a quick question, the diagram…").

- Ch 1 Sales Forecasting → quiz[3] (scatter graph, key "a positive correlation") — pre-answer: clean · diagram: leaks — "Positive correlation" (SVG label on the scatter view) · stem: clean — the stem gives only the dot pattern; naming it is the knowledge tested.
- Ch 2 Investment Appraisal → quiz[14] (time value of money, key "Net present value") — pre-answer: clean · diagram: clean — payback only; no text names NPV, discounting or time value · stem: guessable — "value" in "time value of money" echoes only the key; deferred under rule 5.
- Ch 3 Decision Trees → quiz[18] (tea exporter, key "$84,000") — pre-answer: clean · diagram: clean — own case and figures; nearest diagram figure to the key is $100,000 (16% off), and each distractor ($21,000, $130,000, $159,000) sits nearer a diagram figure than the key does, so proximity points away from it · stem: clean — needs the EMV and the cost worked.
- Ch 4 Critical Path Analysis → quiz[23] (EST 8, duration 4, LFT 15, key "3 days") — pre-answer: clean · diagram: clean — shows "float 2" and the formula "float = LFT − duration − EST" (method, not the key); options 0, 3 and 4 days all sit within two of "float 2" · stem: clean — a calculation.
- Ch 5 Contribution → quiz[30] (coach operator special order, key "accept, because $9 more than covers the variable cost"; rewritten after the fix-round verifier found the old hotel case's feedback, "$55 − $30 = $25", handed over the first step of practice[6] directly below it) — pre-answer: clean · diagram: clean — per-cup and monthly bars for the cold brew; no special order, no accept/reject · stem: clean — every option cites a cost or price, the key alone applies the contribution rule.

Practice under the diagrams (Verify B round 1): the CPA check-in's practice[3] asked the float of C and the critical path of the
diagram's own network — FIXED, now its own network (P–U; float of T = 1 day; critical path P–S–U, 12 days), re-verified in
`audit/runs/packet-14.1/verify-fix1.md`. Recorded DEBT, not blocking: Ch 1's scatter view labels "Positive correlation"
(shown only after answering); Ch 2's stem is guessable.
