# Specification coverage audit — 43 topics against the verbatim IAL spec

**Produced 12 September 2026 in a separate session (the AO-profile / worksheets line of work). Not a
packet. Nothing here has been actioned.** It is handed over because it lands directly on the first line
of every Content packet's checklist: *"Each session: spec gaps, quiz re-tagging, …"* (`PLAN.md`, Content
stage 14-56).

Data: `audit/raw/spec-coverage.json` — every topic, every requirement, with verdict and evidence.

---

## What it is

Every one of the 43 live sections was checked, requirement by requirement, against its own spec entry
taken verbatim from `audit/raw/econ_spec.txt` / `bus_spec.txt` — the same source `lib/ial-marking.js`
was built from in packet 9.

Each requirement is graded:

- **COVERED** — taught, with a quotation from the teaching text and the field path it came from
- **THIN** — named in a list or a passing clause, with no definition and no explanation. A student
  could not answer an exam question from it
- **MISSING** — not in the teaching content at all

**Teaching content only.** The `content` blocks, `notes` and `extras`. Quiz options, flashcards and
practice mark schemes were deliberately excluded: a student cannot learn a concept from the answer key
to a question about something else, and the question is whether the notes teach it.

---

## Headline

| | Topics | Requirements | Taught | Thin | Missing |
|---|---|---|---|---|---|
| Economics | 23 | 591 | 371 (63%) | 133 | 87 |
| Business | 20 | 482 | 290 (60%) | 104 | 88 |
| **Total** | **43** | **1,073** | **661 (62%)** | **237** | **175** |

41 of 43 topics have at least one outright gap. The two without (Business 1.3.4 Managing People,
Economics 4.3.1 Causes and Effects of Globalisation) still carry four thin items each.

### The gaps are concentrated in A2

| Unit | Requirements | Taught | Thin | Missing | % taught |
|---|---|---|---|---|---|
| Business Unit 1 | 140 | 110 | 20 | 10 | 79% |
| Business Unit 2 | 136 | 90 | 27 | 19 | 66% |
| Business Unit 3 | 102 | 48 | 26 | 28 | 47% |
| Business Unit 4 | 104 | 42 | 31 | 31 | 40% |
| Economics Unit 1 | 155 | 120 | 17 | 18 | 77% |
| Economics Unit 2 | 128 | 87 | 22 | 19 | 68% |
| Economics Unit 3 | 154 | 85 | 40 | 29 | 55% |
| Economics Unit 4 | 154 | 79 | 54 | 21 | 51% |

AS is 73% taught; A2 is 49%. 62% of all missing requirements sit in Units 3 and 4.

---

## The diagnosis, which is the actionable part

**The notes read as adapted from UK GCE A-level rather than built from the IAL spec.**

Evidence:

- Business 3.3.5 teaches VRIO, Porter's Five Forces, the balanced scorecard, benchmarking and the
  triple bottom line. None are in IAL 3.3.5. What the spec does ask for there — the two financial
  statements, the acid test ratio, labour turnover, retention, absenteeism, the four HR strategies —
  is absent.
- The same topic teaches *operating profit margin* where the spec asks for *profit for the year margin*.
- Economics 4.3.5 teaches public goods, merit goods and general policy tools instead of the spec's
  capital/current expenditure, tax classification, automatic stabilisers and deficits.

This explains the A2 concentration exactly: where IAL overlaps UK A-level (AS micro and macro theory)
coverage is strong; where IAL diverges (the applied and institutional content of Units 3 and 4) it
collapses. **Treat any A2 topic as inherited-until-checked.**

### What is missing is descriptive, not analytical

Of the 175 missing items, roughly:

- **68% are a named item from a spec list** — types of finance, policy instruments, named institutions,
  location criteria, sources of economies of scale, causes of poverty
- **17% are a formal definition or distinction** — capital vs current expenditure, gross vs net
  investment, specific vs ad valorem, progressive/proportional/regressive
- **5% are a calculation** — acid test, labour turnover, retention, absenteeism, contribution, average
  costs, the payback/ARR/NPV figures
- **only ~10% are analysis, chains or evaluation**

The notes are strong wherever the content is a model with a diagram and weak wherever the spec lists
things to name and define. That is the wrong way round for marks: AO1 and AO2 are awarded for naming
and defining, so the weakness sits on the marks students should be banking.

### Gaps arrive as whole sub-headings, not stray bullets

Business 3.3.5 (entire HR half), Business 3.3.6 (all contingency planning), Business 3.3.1 (all of
heading 4: PESTLE, Porter's five forces, the competitive environment), Business 4.3.1 (the whole
growing-economies strand including GDP, GDP per capita, HDI), Economics 1.3.1 (all five roles of
financial markets), Economics 2.3.6 (the entire role of the central bank), Economics 3.3.2 (all
external economies of scale), Economics 4.3.5 (most of the fiscal content).

A section rewrite that patches bullets will not close these. They are question types, not terms.

---

## Two things that are cheap and live now

**1. Seven topics quiz students on content the notes never teach.** The concept exists only in a
flashcard, a quiz option or a mark scheme: the HR half of Business 3.3.5; contingency planning in
Business 3.3.6; PESTLE and Porter's five forces in Business 3.3.1; the stakeholder distinction in
Business 3.3.4; profit satisficing and cost efficiency in Business 1.3.5; specific vs ad valorem in
Economics 1.3.3; FDI in Economics 2.3.5. Cheapest fixes (usable wording already exists somewhere) and
the sharpest credibility risk.

**2. Some content exists but sits in the wrong topic.** Porter's five forces is taught in Business 3.3.5
and 2.3.5 but required in 3.3.1. PESTLE is taught in 4.3.2, required in 3.3.1. The acid test is in
2.3.3, required in 3.3.5. Labour turnover and absenteeism are in 1.3.4, required in 3.3.5. Overtrading
is in 2.3.2/2.3.3, required in 3.3.2. These are relocation or cross-referencing jobs, not authoring.
Note the distinction Business 3.3.1 turns on: it *does* teach Porter's generic strategies / strategic
matrix (spec heading 2) and does *not* teach Porter's five forces (heading 4c). Two different frameworks.

---

## How this fits the plan

- **Content packets 14-56.** Each session's "spec gaps" step can start from this topic's entry in
  `spec-coverage.json` rather than re-deriving it. The `missingItems` and `thinItems` arrays are the
  work list; `requirements[].evidence` gives the quotation or the failed search.
- **Packet 13, off-spec strip.** This audit finds the inverse of what packet 13 looks for: it names
  off-spec material that is *taught* (VRIO, balanced scorecard, triple bottom line, benchmarking in
  Business 3.3.5) alongside on-spec material that is *absent*. Both belong in the same pass.
- **Scope reconciliation, needs a decision.** `PLAN.md` budgets "all 340 spec gaps". This audit counts
  175 missing plus 237 thin = 412. The definitions may differ. Someone should reconcile the two counts
  before the content stage is costed, because the difference is roughly 20 sessions of work.

---

## How much to trust it

- Every claimed MISSING was attacked by a second agent instructed to overturn it, searching for the
  concept under alternative wording. **23 of 197 claims were overturned (12%)** and downgraded. The
  survivors are the ones a hostile second read could not find. Expect a residual error rate, not a
  clean sheet — spot-check before writing to a gap.
- THIN is a judgement call ("named but not teachable from"). The boundary between THIN and COVERED is
  softer than the boundary between MISSING and the rest.
- Spec requirements were split into checkable items by judgement, so the denominator (1,073) is not
  canonical. The per-topic verdicts matter more than the global percentage.
- Teaching content only, as above. A concept present in a flashcard reads as MISSING here, by design —
  see "cheap and live now" item 1.

---

## Provenance

Produced by a 85-agent workflow: one auditor per topic reading the verbatim spec entry and the full
teaching content, then an independent verification pass over every gap claim, then a synthesis.
Run id `wf_44a349db-ba6`. The narrative report is at
`/private/tmp/.../scratchpad/spec-audit-report.md` in the originating session; the durable data is
`audit/raw/spec-coverage.json` beside this file.
