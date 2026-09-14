# Which section owns which specification bullet

**Written 14 September 2026, packet 13.** The rule is one line: **a topic is taught in the section
whose specification number contains it, and nowhere else.** Other sections may refer to it; only the
owner teaches it under its own heading.

Why it needs writing down. Three topics were being taught twice, in full, in two different sections —
the multiplier, demergers and the price mechanism. Duplication is not a cosmetic problem for a
revision product: a student working through the course meets the same material twice and has no way
to tell whether the second treatment is revision, a contradiction, or something new. It also doubles
the cost of every future correction, because a fix applied to one copy silently leaves the other.

The owner is decided by the specification, not by which copy is better written. `audit/raw/spec-items.json`
carries the source line for every requirement, so the question is always answerable.

## The map

| Topic | Specification | Owner | Was also taught in | Resolved |
|---|---|---|---|---|
| The price mechanism: rationing, incentive, signalling | economics 1.3.4.3a-b | `price-determination` | `introductory-concepts` (1.3.1), one subsection | **Done.** The duplicate subsection was removed 14 Sep. |
| Demergers: reasons and impact | economics 3.3.1.2g | `types-sizes-businesses` | `business-growth` (3.3.2), one subsection | **Done.** The duplicate subsection was removed 14 Sep. |
| The multiplier and the multiplier process | economics 2.3.4.4a-d | `national-income` | `aggregate-demand` (2.3.2), a three-subsection block | **Not done — ledger D013, packet 37.** See below. The census reports it under its own heading in aggregate-demand until it is. |
| Porter's five forces | business 3.3.1.4c, 4.3.2.2b | `business-objectives-strategy`, `global-markets-expansion` | `assessing-competitiveness` (3.3.5) taught and assessed it | **Done.** Removed from 3.3.5 on 14 Sep. `external-influences` (2.3.5) still refers to it inside a subsection on competitive pressure, which is a reference rather than a second treatment; its content packet decides whether to keep the reference. |
| Monopoly and welfare loss | economics 3.3.3.6 | `market-structures-contestability` | `market-failure` (1.3.5), a block — and, below heading level, a paragraph, an exam tip, two real examples, a list item and a recall line | **Done, body text included: the block went on 14 Sep and the paragraph, exam tip, two real examples, list item and recall line went with pass 3, published the same day.** The round-2 verifier read the body text the title-only census cannot see. The Unit 1 cases now stand where monopoly stood: an intervention that overshoots (1.3.6.2a) and the uncorrected externality. "Done" in this table means body text too. |
| Behavioural influences on consumer choice | economics 1.3.2.1b | `consumer-behaviour-demand` | `price-determination` (1.3.4), a two-subsection block | **Done.** Removed from 1.3.4 on 14 Sep. 1.3.4 has eleven lettered requirements and none is behavioural. |
| External benefits and costs of consumption | economics 1.3.5.2c-d | `market-failure`, the Externalities block | `market-failure` again, as "Merit Goods & Demerit Goods" | **Done.** The second copy was the UK GCE label for the same economics and was removed 14 Sep. |

## The multiplier: why it is not resolved here, and what resolving it needs

The specification puts the multiplier at 2.3.4.4, so `national-income` owns it. `aggregate-demand`
(2.3.2) also teaches it, in three subsections, and **assesses it in eight of its twenty-three quiz
questions and four of its flashcards**.

Deleting the teaching and leaving the assessment would create exactly the defect this programme is
clearing: a section that tests what it does not teach, which the audit found seventeen times. Moving
the assessment is a cross-section migration — item ids are stable and progress rows point at them, so
questions can move, but packet 8's own decision records that cross-section moves need a written
manifest and a solo migration. Doing half of it inside a strip packet would be worse than doing none.

So it is left whole, and this is the manifest for whoever does it:

1. `national-income` (packet 37) gains what only `aggregate-demand` currently teaches: what determines
   the **size** of the multiplier. Its own three subsections already cover the concept, the formula
   and evaluation.
2. `aggregate-demand` (packet 32) keeps one subsection on the multiplier's effect on an AD shift,
   which is 2.3.4.4d, and loses the concept and formula subsections.
3. The eight multiplier quiz items and four flashcards in `aggregate-demand` move to
   `national-income`, keeping their ids so review history follows them, or are rewritten in place to
   test the AD application rather than the derivation. The notes entry `aggregate-demand` `notes[3]`
   "The Multiplier" goes with the block (the census reads block and subsection titles, not notes titles).
4. Whichever packet runs second re-runs `node audit/scripts/packet-13-census.mjs` and checks that its D011
   block reports the multiplier "taught under its own heading elsewhere in: nowhere". (The first version of
   that check could not fail; it carries a `--self-test` now.)

Both sections are Unit 2 and sit the same paper, so the cost of leaving this until then is a student's
time, not a wrong answer. That is why it is second in the queue rather than first.

## How to use this map

- Before adding a topic to a section, check whether another section owns it. If it does, link to it
  rather than teaching it again.
- `node audit/scripts/packet-13-census.mjs` reports, for each mapped topic, every section that teaches
  it under its own heading. A section that is not the owner appearing there is a regression.
- When a content packet finds a new duplication, add a row here with the specification reference
  before resolving it, so the next packet can see the decision rather than re-derive it.
