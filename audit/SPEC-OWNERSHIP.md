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
| The multiplier and the multiplier process | economics 2.3.4.4a-d | `national-income` | `aggregate-demand` (2.3.2), a three-subsection block | **Done in the content, 19 Sep, and NOT YET TRUE FOR A STUDENT.** Packet 32 removed the block and its assessment on 18 Sep; packet 37 built the concept, the four propensities, both formulae, the ratio direction and the AD significance in `national-income`, including the SIZE determinants only `aggregate-demand` carried. Both sections are **staged, not published**, and `packet-13-census.mjs` reads the published `data` (`lib/content-gate.mjs:75`), so it still names `aggregate-demand`. **Re-run it after both publish** and check the D011 block says "nowhere"; D013 is confirmed in the ledger against the content, and that last step is the one a student can see. |
| Porter's five forces | business 3.3.1.4c, 4.3.2.2b | `business-objectives-strategy`, `global-markets-expansion` | `assessing-competitiveness` (3.3.5) taught and assessed it | **Done.** Removed from 3.3.5 on 14 Sep. `external-influences` (2.3.5) still refers to it inside a subsection on competitive pressure, which is a reference rather than a second treatment; its content packet decides whether to keep the reference. |
| Monopoly and welfare loss | economics 3.3.3.6 | `market-structures-contestability` | `market-failure` (1.3.5), a block — and, below heading level, a paragraph, an exam tip, two real examples, a list item and a recall line | **Done, body text included: the block went on 14 Sep and the paragraph, exam tip, two real examples, list item and recall line went with pass 3, published the same day.** The round-2 verifier read the body text the title-only census cannot see. The Unit 1 cases now stand where monopoly stood: an intervention that overshoots (1.3.6.2a) and the uncorrected externality. "Done" in this table means body text too. |
| Behavioural influences on consumer choice | economics 1.3.2.1b | `consumer-behaviour-demand` | `price-determination` (1.3.4), a two-subsection block | **Done.** Removed from 1.3.4 on 14 Sep. 1.3.4 has eleven lettered requirements and none is behavioural. |
| External benefits and costs of consumption | economics 1.3.5.2c-d | `market-failure`, the Externalities block | `market-failure` again, as "Merit Goods & Demerit Goods" | **Done.** The second copy was the UK GCE label for the same economics and was removed 14 Sep. |
| Equilibrium real national output and what shifts it; output gaps | economics 2.3.4.3a-b (`econ_spec.txt:1074-1077`); 2.3.5.4a-d (`:1121-1125`) | `national-income` (packet 37); `economic-growth` (packet 43) | `aggregate-supply` (2.3.3): two blocks, "Macroeconomic Equilibrium" and "AD/AS Analysis of Macroeconomic Events", and the `output-gaps` subsection. Ledger items `structure-08`, `specGap-06` and `specGap-07` found it, citing "2.4.3" and "2.5.2", which do not exist | **Done in the draft, 26 Sep, and NOT YET TRUE FOR A STUDENT.** Packet 44 rebuilt `aggregate-supply` to 2.3.3 alone (`audit/runs/packet-44/built.md`); the equilibrium and output-gap material is gone from its draft, with each neighbour allowed only a counted, topic-numbered pointer (`POINTER_ONLY` in `scripts/_packet44-util.mjs`). The classical adjustment stays, because it is 3a-2's explanation of the vertical LRAS (`:1042`), not 2.3.4's. The live section teaches both until the draft is published. |
| Monopsony in the labour market; the minimum wage (in either market), maximum wages and measures to reduce immobility; discrimination | economics 3.3.3.7a-b (`econ_spec.txt:1432-1434`); 3.3.5.2b (`:1526-1535`) | `market-structures-contestability` (packet 29, published); `government-intervention-firms` (packet 48, not started) | `labour-markets` (3.3.4): a "Monopsony Power" subsection with two monopsony diagrams, a minimum-wage-in-monopsony quiz item and misconception, an Evaluate (20) on monopsony, and a one-sentence discrimination mention. Ledger items `topFix-02`, `topFix-04`, `structure-05`, `structure-07`, `specGap-03`, `specGap-04` and `specGap-07` each asked to build MORE of it here | **Done in the draft, 26 Sep (packet 45), not yet published.** 3.3.4's own leaves contain none of the three: its non-competitive wage setting is trade unions (2c) and the public sector (3c), both taught. The rebuild removes the monopsony subsection and diagrams (packet 29's diagram draws the construction correctly, `_packet29-diagrams.mjs:772`), and holds each neighbour to a counted, topic-numbered pointer (`POINTER_ONLY` in `scripts/_packet45-util.mjs`: monopsony ≤2 citing 3.3.3, minimum wage ≤2 citing 3.3.5, immobility measures ≤2 citing 3.3.5); maximum wages and discrimination are banned outright. `specGap-03`, `specGap-04` (its 3.3.5 clauses) and `specGap-07` are wont-fix here and belong to packet 48. |
| Ansoff's matrix and Porter's Strategic Matrix (the generic strategies); PESTLE; Ansoff and Porter's matrix applied to global marketing decisions | business 3.3.1.2a (`bus_spec.txt:1098-1099`); 3.3.1.4a (`:1106`); 4.3.3.1d (`:1435`) | `business-objectives-strategy` (3.3.1); `global-marketing` (4.3.3, packet 55: built and staged 26 Sep, not published) | `global-markets-expansion` (4.3.2): an "Ansoff's Matrix in a Global Context" subsection and a "PESTLE and Bartlett-Ghoshal" subsection, a notes topic on Ansoff, and a 20-mark Evaluate telling students to "Apply Porter's generic strategies". Bartlett-Ghoshal is in no IAL topic (0 hits in `bus_spec.txt`). Ledger items `topFix-02` and `specGap-08` asked, respectively, to demote the frameworks to a link and to ADD "cost vs differentiation" here | **Done 26 Sep (packet 47), published 09:34 UTC the same day (`d603cbf`).** 4.3.2's own leaves name none of these; they name Porter's FIVE FORCES (2b, already co-owned, row above). The rebuild removes both subsections, bans Bartlett-Ghoshal, the entry-mode ladder and the generic strategies outright, and holds Ansoff, PESTLE and FDI (4.3.1) to one topic-numbered pointer each (`POINTER_ONLY` in `scripts/_packet47-util.mjs`). `specGap-08`'s substance is built at 4.3.2 · 5b as price and non-price competitiveness, without the matrix. **Packet 55 (26 Sep, staged, not published)** teaches 4.3.3 · 1d as application only: `global-marketing` chapter 3 uses 3.3.1's cell names (market penetration/development, product development, diversification; cost leadership, differentiation, cost focus, differentiation focus) on global decisions and cites 3.3.1 for the theory. |
| Reasons for staying small; how a small business competes (niche, flexibility, personal service, owner choice, USP, e-commerce) | business 2.3.5 · 3b, "Ways for a small business to compete in a competitive market" (`bus_spec.txt:1032`, heading 2.3.5 at `:1009`) | `external-influences` (2.3.5) | `business-growth` (3.3.2): the whole live "Growth Decisions" chapter was one "Reasons for Staying Small" subsection, with its notes topic, takeaways and misconception; ledger item `specGap-05` asked to ADD e-commerce and USP framing to it | **Done in the draft, 26 Sep (packet 49), not yet published.** 3.3.2 (`bus_spec.txt:1117-1142`) has no small-firm leaf: "staying small" is 0 hits in the file and "small business" occurs only at `:1032`. The rebuild removes the subsection and holds the topic to one pointer citing 2.3.5 (`POINTER_ONLY` in `scripts/_packet49-util.mjs`); `specGap-05` is wont-fix here. Whether `external-influences` teaches 3b fully is that section's packet's question, not checked by packet 49. |

## Two topics a finding asked to duplicate, and the lines that settled it (packet 35, 18 Sep)

The rows above record duplications that HAPPENED. These two did not, and they are recorded because
four audit items asked for them and the next packet to read those items will need the same answer.

| Topic | Specification | Owner | A finding asked it to ALSO be taught in | Resolved |
|---|---|---|---|---|
| Leadership: management against leadership, the four styles, **and the difficulty of moving from entrepreneur to leader** | business 1.3.4 · 5, `bus_spec.txt:746-753` | `managing-people` (packet 30) | `entrepreneurs-leaders` (1.3.5), by `specGap-01` and `topFix-01` | **Refused, 18 Sep.** 1.3.5's four sub-topics (:760-788) contain no leadership leaf; the heading says "and leaders" and the requirements do not. Packet 30 had already refused the MIRROR of this — two findings asking to move `5c` out of 1.3.4 and into 1.3.5 — on 17 Sep. Obeying both would have taught `5c` twice; obeying neither in the other direction would have taught it nowhere. |
| Forms of business and liability: sole trader, partnership, private limited company, franchising, social enterprise, lifestyle and online businesses, plc flotation, limited and unlimited liability | business 2.3.1 · 4 and · 5, `bus_spec.txt:870-878` | `planning-raising-finance` (packet 19) | `entrepreneurs-leaders` (1.3.5), by `specGap-02` and `topFix-01` | **Refused, 18 Sep.** None of those phrases occurs between :760 and :788. |

**The near-miss worth knowing before you read those findings.** `social entrepreneurship` IS a 1.3.5
leaf — a non-financial motive at :775 — and `entrepreneurs-leaders` teaches it. `social enterprise`,
the FORM of business, is 2.3.1 · 4b and belongs to `planning-raising-finance`. The two are one word
apart, they sit in different units, and a finding that names the second while meaning the first will
read as correct.

**How the refusals are held.** `BANNED_ELSEWHERE` in `scripts/_packet35-util.mjs` refuses each phrase
with the line that settles it, and the runner's coverage block re-reads `spec-items.json` for both
spans: if 1.3.5 ever acquires a leadership or forms-of-business row, or 1.3.4 ever loses `5c`, the
build fails rather than the refusal being inherited unchecked. A boundary that is only written down
decays; this one is a build failure.

## The multiplier: why it is not resolved here, and what resolving it needs

The specification puts the multiplier at 2.3.4.4, so `national-income` owns it. `aggregate-demand`
(2.3.2) also teaches it, in three subsections, and **assesses it in eight of its twenty-three quiz
questions and four of its flashcards**.

Deleting the teaching and leaving the assessment would create exactly the defect this programme is
clearing: a section that tests what it does not teach, which the audit found seventeen times. Moving
the assessment is a cross-section migration — item ids are stable and progress rows point at them, so
questions can move, but packet 8's own decision records that cross-section moves need a written
manifest and a solo migration. Doing half of it inside a strip packet would be worse than doing none.

**Status, 19 September 2026.** Steps 1, 2 and 3 are done and step 4 is blocked on a publish, not on work:

- **Step 1 — done** (packet 37). `national-income` gained `Why the Multiplier Is Not a Fixed Number`, which
  is what determines the size, plus the process, MPC/MPS/MPT/MPM, both formulae and the ratio direction.
- **Step 2 — done** (packet 32, 18 Sep). `aggregate-demand`'s three multiplier subsections were removed in
  its rebuild, with one declared pointer kept (`scripts/_packet32-content.mjs:353`).
- **Step 3 — done, by rewrite rather than by migration.** The eight multiplier quiz items and four
  flashcards did not have to be moved: packet 32 rebuilt `aggregate-demand`'s whole bank from scratch, so
  there was nothing to migrate and no progress row to re-point. The manifest's "keep their ids so review
  history follows them" is moot for a section that was rebuilt, and that is worth knowing for the next
  duplication: **a rebuild dissolves a cross-section migration.**
- **Step 4 — pending a publish.** The census reads `data`. Both sections are in `draft`.

The original manifest, kept for the record:

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
