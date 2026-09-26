# Rollout — every topic in the real IAL paper layout

Written 26 September 2026 from the repo's own data, re-derivable with the script recorded at the end.
Governs the exam-practice stream after packet 12.8. Founder rulings: `audit/DECISIONS.md`, Settled,
2026-09-26 (practice follows the real paper layout; Section A links the topic quiz; no mock papers; no text
is ever cut). Layouts: `audit/raw/ial-paper-structure.json`. **Not started. Scope and data sourcing decided 26 Sep (below); the order is a proposal.**

## Scale

43 topics, **362 question slots**. **35** can reuse an existing answer; **319 new model answers**, **37 new
extracts or source sets**, **11 pages to create** (all ten Business Units 3-4 topics and Economics 4.3.5).
46 existing answers fit no slot of the paper and move to "More practice"; nothing is deleted.

| Shape | Topics | Students | New answers | Extracts | Pages |
|---|---|---|---|---|---|
| Economics Units 1-2 (B short answers, C data question, D essay 1 of 2) | 12 | 466 | 115 | 9 | 0 |
| Economics Units 3-4 (B data question, C essays 2 of 3) | 11 | 182 | 86 | 11 | 1 |
| Business Units 1-2 (A, B source sets 2/4/6/8/10, C essay) | 10 | 335 | 48 | 7 | 0 |
| Business Units 3-4 (A source set 4/4/8/12/12, B and C essays) | 10 | 110 | 70 | 10 | 10 |

Students are `secRows[].users` in `audit/raw/funnel_aggregates.json`: Learn Mode opens in the audit
baseline, a proxy for demand, not model-answer page visits. It is very concentrated: the top 5 topics hold
41%, the top 12 hold 60%, the top 20 hold 76% (142 new answers), and the top 30 hold 89%.

## Order

1. **Packet 12.8** (running): the Economics Units 1-2 shape, piloted on 1.3.5.
2. **Packet 100 — split the question bank, one file per topic.** `data/modelAnswersData.js` and
   `data/modelAnswersExpansion.js` hold every answer (4,393 lines; 319 new answers in the 12.6 shape roughly
   quadruple that). Twelve modules import them. Move each topic's items to
   `data/model-answers/<subject>/<section>.js` behind an index that exports the same `MODEL_ANSWERS`, deep-equal
   before and after, all 32 pages' HTML identical. **This is what makes parallel topic packets safe**: one
   packet, one file, no shared-file collisions.
3. **Three shape pilots**, serial, because each teaches the validator and the shell something new:
   - **101 Business Units 1-2** on Meeting Customer Needs (123 students, extract exists, 3 new answers):
     `source_set`, multiple sources, the Business essay on sources, no choice.
   - **102 Economics Units 3-4** on Types and Sizes of Businesses (34): data question as Section B, three essays
     answering two, no short answers.
   - **103 Business Units 3-4** on Business Objectives and Strategy (26): page creation, 4/4/8/12/12, two essays.
4. **Topic packets, by students within each proven shape**, two lanes in parallel once packet 100 lands
   (Economics and Business), one packet per topic.

## Decided (founder, 26 September)
- **Extract data is real and cited.** Every figure traceable to a named, dated, public source, cited on the
  page; no invented organisations or "composite" lines; Verify A checks each figure. The six existing extracts
  are re-sourced by the packet that uses them (Extract A by E081). See `audit/DECISIONS.md`, Settled.
- **Scope: the top 25 topics** (15+ students): 12.8 and packets 101-124 below, ~83% of students, ~183 new
  answers, 19 extracts to write, 2 pages to create. Packets 125-142 are **not scheduled**; the founder
  re-decides after the 25 are done.
## The queue

| Packet | Topic | Lane | Students | Slots | Reuse | New | Extract | Page | To More practice |
|---|---|---|---|---|---|---|---|---|---|
| 12.8 | Econ 1.3.5 Market Failure | E12 pilot | 28 | 12 | (in progress) | | exists | - | 1 |
| 104 | Econ 1.3.1 Introductory Concepts | E12 | 192 | 12 | 1 | **11** | write | - | 1 |
| 101 | Bus 1.3.1 Meeting Customer Needs | B12 **pilot** | 123 | 6 | 1 | **3** | exists | - | 3 |
| 105 | Econ 1.3.2 Consumer Behaviour & Demand | E12 | 52 | 12 | 2 | **9** | exists | - | 1 |
| 106 | Bus 1.3.2 The Market | B12 | 44 | 6 | 1 | **3** | exists | - | - |
| 107 | Bus 2.3.1 Planning a Business and Raising Finance | B12 | 35 | 6 | 0 | **6** | write | - | 2 |
| 102 | Econ 3.3.1 Types and Sizes of Businesses | E34 **pilot** | 34 | 8 | 0 | **8** | write | - | - |
| 108 | Econ 2.3.1 Measures of Economic Performance | E12 | 33 | 12 | 2 | **10** | write | - | 1 |
| 109 | Bus 1.3.3 Marketing Mix and Strategy | B12 | 32 | 6 | 1 | **3** | exists | - | 2 |
| 110 | Econ 1.3.3 Supply | E12 | 30 | 12 | 1 | **11** | write | - | 1 |
| 111 | Econ 1.3.4 Price Determination | E12 | 28 | 12 | 2 | **9** | exists | - | 1 |
| 103 | Bus 3.3.1 Business Objectives and Strategy | B34 **pilot** | 26 | 7 | 0 | **7** | write | **create** | - |
| 112 | Econ 1.3.6 Government Intervention | E12 | 26 | 12 | 1 | **11** | write | - | 1 |
| 113 | Econ 3.3.2 Revenue, Costs and Profits | E34 | 25 | 8 | 0 | **8** | write | - | 4 |
| 114 | Econ 3.3.3 Market Structures and Contestability | E34 | 24 | 8 | 1 | **7** | write | - | - |
| 115 | Bus 1.3.4 Managing People | B12 | 22 | 6 | 1 | **5** | write | - | 2 |
| 116 | Bus 2.3.2 Financial Planning | B12 | 19 | 6 | 0 | **6** | write | - | 2 |
| 117 | Econ 2.3.2 Aggregate Demand | E12 | 19 | 12 | 2 | **10** | write | - | 1 |
| 118 | Bus 4.3.1 Globalisation | B34 | 18 | 7 | 0 | **7** | write | **create** | - |
| 119 | Econ 4.3.1 Causes and Effects of Globalisation | E34 | 18 | 8 | 0 | **8** | write | - | 2 |
| 120 | Bus 1.3.5 Entrepreneurs and Leaders | B12 | 17 | 6 | 0 | **6** | write | - | 2 |
| 121 | Bus 2.3.3 Managing Finance | B12 | 16 | 6 | 1 | **5** | write | - | 2 |
| 122 | Econ 2.3.4 National Income | E12 | 16 | 12 | 0 | **12** | write | - | 2 |
| 123 | Econ 2.3.6 Macroeconomic Objectives & Policies | E12 | 16 | 12 | 1 | **11** | write | - | 1 |
| 124 | Econ 4.3.2 Trade and the Global Economy | E34 | 15 | 8 | 1 | **7** | write | - | 1 |
| | **Top-25 cut: rows below are not scheduled (founder, 26 Sep)** | | | | | | | | |
| 125 | Bus 2.3.5 External Influences | B12 | 14 | 6 | 1 | **5** | write | - | - |
| 126 | Econ 4.3.3 Balance of Payments, Exchange Rates and International Competitiveness | E34 | 14 | 8 | 0 | **8** | write | - | 2 |
| 127 | Bus 2.3.4 Resource Management | B12 | 13 | 6 | 0 | **6** | write | - | 2 |
| 128 | Econ 2.3.3 Aggregate Supply | E12 | 13 | 12 | 1 | **11** | write | - | 1 |
| 129 | Econ 2.3.5 Economic Growth | E12 | 13 | 12 | 2 | **10** | write | - | 1 |
| 130 | Econ 3.3.4 Labour Markets | E34 | 13 | 8 | 0 | **8** | write | - | 2 |
| 131 | Econ 4.3.6 Growth and Development | E34 | 12 | 8 | 0 | **8** | write | - | 2 |
| 132 | Bus 4.3.2 Global Markets and Business Expansion | B34 | 11 | 7 | 0 | **7** | write | **create** | - |
| 133 | Econ 3.3.5 Government Intervention | E34 | 11 | 8 | 0 | **8** | write | - | 2 |
| 134 | Bus 3.3.2 Business Growth | B34 | 10 | 7 | 0 | **7** | write | **create** | - |
| 135 | Bus 3.3.3 Decision-Making Techniques | B34 | 9 | 7 | 0 | **7** | write | **create** | - |
| 136 | Bus 3.3.6 Managing Change | B34 | 9 | 7 | 0 | **7** | write | **create** | - |
| 137 | Econ 4.3.4 Poverty and Inequality | E34 | 8 | 8 | 0 | **8** | write | - | 1 |
| 138 | Econ 4.3.5 The Role of the State in the Macroeconomy | E34 | 8 | 8 | 0 | **8** | write | **create** | - |
| 139 | Bus 3.3.4 Influences on Business Decisions | B34 | 7 | 7 | 0 | **7** | write | **create** | - |
| 140 | Bus 3.3.5 Assessing Competitiveness | B34 | 7 | 7 | 0 | **7** | write | **create** | - |
| 141 | Bus 4.3.3 Global Marketing | B34 | 7 | 7 | 0 | **7** | write | **create** | - |
| 142 | Bus 4.3.4 Global Industries and Companies (MNCs) | B34 | 6 | 7 | 0 | **7** | write | **create** | - |

## Every topic packet delivers

The 12.8 contract, per topic: the paper sections for its unit from the structure file; reused answers moved
into their slots with contexts added; new answers authored to examiner standard and read by Verify A against
the IAL level descriptors; one extract or source set; every item in the 12.6 shape, tagged by wording, with
`keyTerm`; every figure in the extract real and cited, checked against its source by Verify A; validator R1-R13 clean; the data-response file (if any) identical to the bank; the text-fit sweep at
0 from 320 to 1920px after first failing; the other pages unchanged.

Re-derive this plan: the analysis script is in the session that wrote it; its inputs are
`audit/raw/section-index.json`, `audit/raw/funnel_aggregates.json`, `data/modelAnswers*.js`,
`data/modelAnswerPages.js`, `content/data-response/*.md` and `audit/raw/ial-paper-structure.json`.
