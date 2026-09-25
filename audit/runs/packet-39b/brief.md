# Packet 39b — `trade-global-economy`, Economics 4.3.2 sub-topics 4 and 5

Ledger packet **39.1**, 27 open ids. Second half of the section packet 39a rebuilt. Spec span
`audit/raw/econ_spec.txt:1657-1699`, **27 leaves**: 4a, 4b-1..4, 4c-1..6, 4d, 5a-1..6, 5b-1..4,
5c-1..5.

## The hazard that governs the whole packet

`loadBundle()` reads the **`data`** column — the LIVE, published row, which still has the two blocks
students see today. Packet 39a is STAGED and NOT PUBLISHED, so its four blocks exist only in
`draft`. **A runner copied from 39a that calls `loadBundle` would rebuild from the 2-block live
section and destroy 39a's work the moment it staged.** 39b therefore loads the DRAFT, and asserts
39a's four blocks survive the rebuild byte-for-byte. Checked before writing a line: draft holds 5
blocks and is deep-equal to `audit/snapshots/packet-39a-bundle__economics__trade-global-economy.json`
(the raw JSON differs only in key order, which is the Postgres round-trip).

## Rule 1 — four findings are wrong about the specification

1. **`causes-effects-globalisation-specGap-05` invents a fifth rung.** It asks for "'economic union'
   as a level" and hedges "unsure whether IAL requires economic union explicitly". It does not: 4b
   lists FOUR types and the fourth leaf (`ECON-4.3.2-4b-4`) is **"economic and monetary unions"**,
   one rung, not two. Build the spec's four.
2. **`causes-effects-globalisation-specGap-06` cites "spec 4.2".** Trading blocs are **4.3.2 · 4b
   and 4c**. The middle digit in IAL is always 3; "4.2" is UK GCE numbering, the same class of error
   as the 154 items already recorded.
3. **`trade-global-economy-specGap-03` mis-words 4d.** The spec says "Possible conflicts between
   **trading blocs** and the WTO", not "regional trade agreements". Its suggested content — rules of
   origin, GATT Article XXIV, "spaghetti bowl" — is real economics but none of it is spec wording.
   Teach the MECHANISM the spec implies: a preferential tariff is by construction a breach of
   most-favoured-nation, allowed only as a carved-out exception. The jargon is optional; the
   mechanism is the leaf.
4. **`trade-global-economy-topFix-05` asks for a 10-mark item and a compulsory diagram.** IAL
   Economics has no 10-mark tariff — Appendix 6 and `tariff-census.json` give 2, 2/4, 4, 4, 6, 8, 14,
   20 — which is the same error as the `Assess … (10 marks)` item 39a deleted. And "Explain 4 marks
   **with the tariff diagram required**" is a teaching preference, not a rule: Appendix 6 makes
   **Draw** the command word that requires an accurately drawn diagram. An Explain may be answered
   in prose and still earn full marks.

## Rule 2 — findings half-closed by 39a, and four that describe a section that no longer exists

`topFix-01`'s Terms of Trade block, `topFix-04`'s CA opportunity-cost fill-in and `structure-09`'s
numerical CA exercise were all built by 39a. Only their bloc and tariff clauses are 39b's.
`structure-05` and `structure-06` describe the pre-pin architecture, which 39a's pins made moot;
what remains of them is the untaught bank, which closes when 39b teaches blocs and protection.

**The four `causes-effects-globalisation` ids edit a section that has been rebuilt out from under
them.** Packet 34's rebuild has five blocks and no Trade Blocs block at all: `Brexit`,
`tariff-free`, `trade creation`, `trade diversion` and `common market` are each **0 hits** in the
staged globalisation bundle. So `topFix-02`'s "give the Trade Blocs block its own assessment" and
`topFix-03`'s Brexit and trade-diversion clauses cannot be done there — the material moved to 4.3.2,
which is why packets 33 and 34 reassigned the ids here. They close by BUILDING the material in this
section. `topFix-03`'s fourth clause (TNC = MNC "so the quiz/practice vocabulary matches") is
already resolved a better way: packet 34's rebuild uses one term throughout — 36 `TNC`, 20
`transnational`, **0 `MNC`, 0 `multinational`** — so there is no mismatch to reconcile.

## The build: six blocks, 28 subsections

| block | subsections | leaves |
|---|---|---|
| Trade Liberalisation and the WTO | 4 | 4a, 4d |
| The Four Types of Trading Bloc | 5 | 4b-1..4 |
| Joining a Bloc: the Costs and the Benefits | 6 | 4c-1..6 |
| Why Governments Restrict Trade | 5 | 5a-1..6 |
| The Tools of Protection | 4 | 5b-1..4 |
| Who Gains and Who Loses | 4 | 5c-1..5 |

Ten blocks and **51** subsections for the section as a whole — the largest in the programme, against
`measures-economic-performance` at 10 and 45. It is proportionate rather than indulgent: 1.11
subsections per leaf against 39a's 1.21. "Who Gains and Who Loses" carries five leaves in four
subsections because 5c-2 and 5c-3 are two sides of the same transfer.

**Ten chapters has one cost, and it is documented behaviour rather than a defect.** `FREE_QUIZ_MAX`
is 10, so ten chapters spend the whole anonymous payload on check-in questions and the signed-out
pre-test does not run — `lib/preview-limits.js:99-102` says exactly this and names one section
already in that position. The trade is that all ten check-ins keep their question, which is the
property `structure-05` and `quiz-02` are about.

## Three arithmetic spines, every figure derived

**THE TARIFF.** World price $20, a $10 tariff, linear domestic curves. At $20: demand 100, supply
20, imports 80. At $30: demand 80, supply 40, imports 40. Consumer surplus lost is the trapezium
(100+80)/2 × 10 = **900**; producer surplus gained (20+40)/2 × 10 = **300** (area a); government
revenue 10 × 40 = **400** (area c); deadweight loss **200**, and it splits b = ½ × 20 × 10 = 100 and
d = ½ × 20 × 10 = 100. 300 + 100 + 400 + 100 = 900 exactly, which is what makes `accuracy-01`
demonstrable rather than asserted: the loss exists because 900 > 300 + 400, NOT because 300 < 900.

**THE QUOTA AND THE SUBSIDY REUSE IT.** A quota of 40 units gives the same $30 price, the same 900
and 300 — but the 400 becomes quota rent to whoever holds the licence instead of government revenue,
and the deadweight loss is the same 200. A $10 subsidy to domestic producers leaves consumers paying
the world $20, so demand stays 100 and only supply moves 20 → 40: the government pays 10 × 40 =
**400**, producers gain **300**, and the loss is **100** — half the tariff's, because there is no
consumption distortion. One market, three tools, three different distributions.

**TRADE CREATION AND TRADE DIVERSION.** One cost table — Home 100, Partner 80, Outside 70 — and two
tariff rates. At 50%: Partner 120, Outside 105, so Home supplies at 100; joining takes it to Partner
at 80, a real saving of **20**. At 20%: Partner 96, Outside 84, so Outside supplies and the consumer
pays 84 of which 14 is tariff the country pays itself, so the real cost is **70**; joining takes it
to Partner at 80, so the consumer price FALLS 84 → 80 while the real cost RISES 70 → 80, a loss of
**10**. The consumer price falling while the country loses is the whole of 4c-2 and the thing
students get wrong.

## Acceptance checks

1. 39a's four blocks, its 21 authored quiz items, six practice items, four diagrams and every recall
   are byte-identical in the staged bundle. The runner asserts this against the 39a snapshot.
2. All 27 leaves of sub-topics 4 and 5 are taught in `content[]`, and the whole section's 46 leaves
   are covered — including `ECON-4.3.2-4c-6`, which 39a recorded as accepted debt, and
   `ECON-4.3.2-5a-5`, which fires on the live section and is inherited.
3. Every practice item's marks equal the `tariff-census.json` tariff for its command word — **including
   the two 39a carried**, so `practice:e3345b30` stops being `Explain … 6 marks`.
4. The tariff flow's `result` states the comparison `accuracy-01` asks for, and the four welfare
   areas are re-derived from the printed quantities rather than restated.
5. Bloc assessment exists: at least three MCQs (FTA against customs union, a creation-or-diversion
   scenario, and one on the common external tariff) and an Explain or Examine practice item.
6. A trade creation/diversion diagram and a subsidy diagram exist, on packet 37's 400-unit frame,
   with no collision, nothing outside the frame and no face below 12.
7. Zero recalls answerable by scrolling up, on a section with no row in the recall baseline.
8. 0 new BLOCK, 0 new DEBT beyond what 39a already recorded as accepted or inherited.
