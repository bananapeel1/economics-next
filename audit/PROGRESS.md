# Remediation progress

One row per packet. A packet is done when the PROTOCOL.md gate passes: build green, every claimed ledger id
confirmed by a verifier, walkthrough clean where applicable, validator green (packet 3+), this row updated,
committed with the packet id in the subject line, pushed. Coverage lives in `ledger.json`.

Plan: `audit/PLAN.md` (58 packets). Source data: `audit/README.md`.

## Foundation and repair

| # | Packet | Status | Commit | Snapshot | Validator |
|---|--------|--------|--------|----------|-----------|
| 0 | Day 0 hotfix | done and verified 2026-09-12 (Verify A: 2 code + 18 content ids confirmed; Verify B walkthrough clean). 3 marketing claims open on the SEO branch, see NEXT.md | 069ddb4 | audit/snapshots/2026-09-11-{pre,post}-packet-0__* | n/a (packet 3) |
| 1 | Measure or don't bother | done and verified 2026-09-12 (Verify A: F021 F022 F042 F043 confirmed; dead progress route deleted in the setup commit to close F023 F049; F026 F030 moved to packet 5). app_events table SQL still to run once (see NEXT.md) | cdb24dc + setup commit | | n/a (packet 3) |
| 2 | Ids and safety net | not started | | | n/a |
| 3 | Validator v2 + golden set | not started | | | n/a |
| 4 | Progress and mastery truth | not started | | | n/a |
| 5 | Step 0 | not started | | | n/a |
| 6 | Re-entry v0 | not started | | | n/a |
| 7 | Widget mechanics | not started | | | n/a |
| 8 | Quiz hygiene | not started | | | n/a |
| 9 | AI correctness | not started | | | n/a |
| 10 | Smart Practice engine | not started | | | n/a |
| 11 | Performance and accessibility | not started | | | n/a |
| 12 | Monetisation coherence | not started | | | n/a |
| 13 | Off-spec strip and dedupe | not started | | | n/a |

## Drill programme — packets 13.1 to 13.8

Plan: `audit/DRILLS.md`. Founder decision 2026-09-12: split the programme, quant (13.1-13.4) before the
content stage, drawing (13.5-13.8) after the top-ten sections.

| # | Packet | Status | Commit | Snapshot | Validator |
|---|--------|--------|--------|----------|-----------|
| 13.1 | Quant engine | done and verified 2026-09-12 (Verify A: D001-D008 confirmed with file:line evidence; the verifier independently reproduced the guard failing on an in-tolerance slip). Verify B n/a — no student-facing surface. Built out of calendar order: no prerequisite, adds only new files, so it cannot conflict with packet 2 | | none — no content write | n/a (packet 3) |
| 13.2 | Six templates, Learn Mode and Quiz | blocked on packet 2 (item ids) | | | |
| 13.3 | Twelve more templates, Smart Practice | blocked on packet 2 (`item_id`) | | | |
| 13.4 | Calculations session + funnel events | blocked on 13.2, 13.3 | | | |
| 13.5 | Diagram spec format and marking | deferred per the split | | | |
| 13.6 | The drill component | deferred per the split | | | |
| 13.7 | Six Economics specs | deferred; needs packets 5 and 7 | | | |
| 13.8 | Six Business specs + Business surface | deferred; needs packet 12 | | | |

## Content — one section per packet, traffic order

| # | Section | Opens | Status | Commit | Snapshot | Validator |
|---|---------|-------|--------|--------|----------|-----------|
| 14 | decision-making-techniques (format pilot) | 9 | not started | | | |
| 15 | introductory-concepts | 192 | not started | | | |
| 16 | meeting-customer-needs | 123 | not started | | | |
| 17 | consumer-behaviour-demand | 52 | not started | | | |
| 18 | the-market | 44 | not started | | | |
| 19 | planning-raising-finance | 35 | not started | | | |
| 20 | types-sizes-businesses | 34 | not started | | | |
| 21 | measures-economic-performance | 33 | not started | | | |
| 22 | marketing-mix-strategy | 32 | not started | | | |
| 23 | supply | 30 | not started | | | |
| 24 | price-determination | 28 | not started | | | |
| 25 | market-failure | 28 | not started | | | |
| 26 | government-intervention | 26 | not started | | | |
| 27 | business-objectives-strategy | 26 | not started | | | |
| 28 | revenue-costs-profits | 25 | not started | | | |
| 29 | market-structures-contestability | 24 | not started | | | |
| 30 | managing-people | 22 | not started | | | |
| 31 | financial-planning | 19 | not started | | | |
| 32 | aggregate-demand | 19 | not started | | | |
| 33 | globalisation (business) | 18 | not started | | | |
| 34 | causes-effects-globalisation | 18 | not started | | | |
| 35 | entrepreneurs-leaders | 17 | not started | | | |
| 36 | managing-finance | 16 | not started | | | |
| 37 | national-income | 16 | not started | | | |
| 38 | macroeconomic-objectives-policies | 16 | not started | | | |
| 39 | trade-global-economy | 15 | not started | | | |
| 40 | balance-payments-exchange-rates | 14 | not started | | | |
| 41 | external-influences | 14 | not started | | | |
| 42 | resource-management | 13 | not started | | | |
| 43 | economic-growth | 13 | not started | | | |
| 44 | aggregate-supply | 13 | not started | | | |
| 45 | labour-markets | 13 | not started | | | |
| 46 | growth-development | 12 | not started | | | |
| 47 | global-markets-expansion | 11 | not started | | | |
| 48 | government-intervention-firms | 11 | not started | | | |
| 49 | business-growth | 10 | not started | | | |
| 50 | managing-change | 9 | not started | | | |
| 51 | poverty-inequality | 8 | not started | | | |
| 52 | role-state-macroeconomy | 8 | not started | | | |
| 53 | influences-business-decisions | 7 | not started | | | |
| 54 | assessing-competitiveness | 7 | not started | | | |
| 55 | global-marketing | 7 | not started | | | |
| 56 | global-industries-mncs | 6 | not started | | | |

## Close

| # | Packet | Status | Commit | Snapshot | Validator |
|---|--------|--------|--------|----------|-----------|
| 57 | Cross-surface consistency | not started | | | n/a |
| 58 | Re-measure the funnel | not started | | | n/a |

## Baselines (fill in at packet 1, never edit afterwards)

- Step-0 pass rate, clean instrumentation: _collecting once `app_events` exists; compute with `node audit/scripts/funnel-events.mjs`. Definition: step_next(step=0) over learn_open per (student, section), anonymous included._
- Section completion rate: _pending_
- Validator violation count per check: _pending (packet 3)_

## Baselines from the audit (dirty instrumentation, upper bound on abandonment)

- 825 of 1,093 section starts never passed step 0 (75%), 211 signed-in students
- introductory-concepts 192 starts / 167 stuck; meeting-customer-needs 123 / 101
- 16 premium active, 40 free/cancelled, 6 free/inactive
