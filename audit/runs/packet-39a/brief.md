# Packet 39a spec — `trade-global-economy`, Economics 4.3.2 sub-topics 1–3 (Opus 5, 21 September 2026)

## The split, and why

Packet 39 is **55 oracle rows / 46 substantive leaves** (`ECON-4.3.2-1a` … `-5c-5`), against packet 33's
32/28 and packet 34's 26/22 — roughly double the largest content packet built so far, because 4.3.2 has
**five** sub-topics, not three or four. The founder ruled on 21 September that it splits:

| | spec | oracle rows | leaves | ledger |
|---|---|---|---|---|
| **39a** (this packet) | 4.3.2 · 1 Specialisation and comparative advantage · 2 Patterns and volume of world trade · 3 Terms of trade | 24 | **19** | 18 ids |
| **39b** (next) | 4.3.2 · 4 Trade liberalisation and trading blocs · 5 Restrictions on free trade | 31 | **27** | 25 ids incl. the four reassigned by packets 33 and 34 |

Both halves write the **same section bundle**. 39a therefore **carries the live block "Protectionism and
the WTO" forward untouched** as the last block, so the staged draft is never missing content that is live
today; 39b replaces it. Nothing publishes until the packet 5/7 ship checkpoint either way.

Spec span: `audit/raw/econ_spec.txt:1626-1699`, heading at 1626. Sub-topics 1–3 are lines 1628-1656.

## Rule 1 — every claim checked against the spec span before building

Wrong or mis-aimed, with what the specification actually says:

- **`specGap-09` is wrong and is wont-fix.** It says "in WEC14 this material sits under 4.1 (Causes and
  effects of globalisation), not 4.3.2", hedged with "unsure of exact sub-numbers". The heading at
  `econ_spec.txt:1626` is **4.3.2 Trade and the global economy** and every leaf this packet builds is
  under it. 4.3.1 is `causes-effects-globalisation` (packet 34) and owns none of this. The finding
  inverts the ownership that packets 33 and 34 each spent a rule-2 pass establishing.
- **`topFix-05` asks for "10- and 20-mark guidance as levels".** `audit/raw/tariff-census.json` gives
  IAL Economics exactly eight command words — **Define 2 · Calculate 2 or 4 · Draw 4 · Explain 4 ·
  Analyse 6 · Examine 8 · Discuss 14 · Evaluate 20**. There is **no 10-mark item and no Assess** in
  Economics (third packet to catch this: 34's `topFix-05`, 33's `practice-01`, now here). The live
  `Assess … (10 marks)` practice item is replaced, not re-guided — and it is 39b's, being a customs-union
  question. The rest of the finding is right and is built: `Define` → 2, `Explain` → 4, `Outline` → a real
  command word.
- **`practice-01` is right twice over.** `Outline` is not an IAL Economics command word, and the live p4
  "Outline two factors that may cause a deterioration in a country's terms of trade (4 marks)" becomes
  **`Explain` (4)** — the census tariff for Explain, which the live item already carried by luck.
- **`specGap-01` writes the formula as "index of export prices / index of import prices × 100".** The
  specification says only 3a *"Understanding and calculation of the terms of trade"* — `index of` is
  **0 hits** in both documents, so the formula is not quoted from the spec. It is still the standard
  Edexcel calculation and 3a demands *a* calculation, so it is taught and worked — but as the subject's
  formula, never as a spec quotation.
- **`specGap-08` names "increasing costs, dynamic/created comparative advantage, transport costs,
  externalities" as the limitations to teach.** `transport costs`, `increasing costs`, `dynamic
  comparative advantage` and `created comparative advantage` are **0 hits in both specifications**;
  `externalities` is 3 in `econ_spec.txt`, none in 4.3.2. The spec asks for 1b-3 *"limitations of the
  theory of comparative advantage"* and enumerates none. So limitations ARE built (the leaf is real and
  currently unmet), in the subject's ordinary terms, and **never presented as a list the spec gives**.
  This is the mirror image of packets 33/34: there the finding invented spec authority for an off-spec
  topic; here it offers examples for an on-spec leaf, which is legitimate.
- **`structure-07` and `structure-08` each assert a NON-defect** about block 0 ("takeaways do match their
  blocks", "misconceptions are real student errors, not filler"). `structure-08`'s real clause is the
  comparative-advantage `realExample` (low labour costs) undercutting the absolute-vs-comparative
  misconception, and that IS built. `structure-07`'s only defect clause is in block 1 (protectionism) and
  goes to **39b**. Same shape as packet 27's `structure-07` and packet 34's `structure-08`.

## Rule 2 — vocabulary measured before a word was written

`grep -ociF`, both specifications:

| term | `econ_spec.txt` | `bus_spec.txt` | consequence |
|---|---|---|---|
| `terms of trade` | **3** (1646, 1647, 1653) | 0 | the spec's own heading for sub-topic 3 |
| `comparative advantage` | 5 | **0** | on-spec here; a Business section must not borrow it |
| `absolute advantage` | **0** as a phrase | 0 | but 1b-1 is *"the distinction between absolute and comparative advantage"* (line 1634) — the phrase is a **spec requirement split across a conjunction**, not an off-spec term. Do NOT ban it; the same artefact makes `infant industry` read as 0 against 5a-1's *"infant and geriatric industries"* |
| `emerging economies` | 1 (2a-1) | 0 | the spec's word for 2a-1; use it |
| `bilateral` | 1 (2a-3) | 0 | in scope, and paired with trading blocs as a **factor**, not as the ladder |
| `relative exchange rates` | 1 (2a-4) | 0 | in scope |
| `trade flows` | 1 (2b) | 0 | the spec's word for 2b |
| `living standards` | 6 | 0 | 3c-2 by name |
| `export revenues` | 1 (3c-1) | 0 | 3c-1 by name |
| `balance of trade` | 2 | 0 | 3c-3 by name; **not** "current account", which is 4.3.3 |
| `Marshall-Lerner` | **1**, and it is `econ_spec.txt` 4.3.3 · 2f | 0 | live `quiz[8]` tests it here. **Moved out**, owed to packet 40 `balance-payments-exchange-rates` |
| `Prebisch-Singer` | **0** | 0 | live `quiz[6]` **assesses** it. Off-spec named hypothesis; removed. The declining-terms-of-trade idea it carries is taught under 3c where the spec puts it, without the name |
| `index of` | **0** | 0 | `specGap-01`'s formula wording is the finding's, not the spec's |
| `dynamic`/`created comparative advantage` | **0 / 0** | 0 / 0 | `specGap-08`'s examples; buildable as ordinary subject content under 1b-3, never as spec text |

## What 39a closes

**Built as written:** `quiz-01` · `practice-01` · `specGap-01` · `specGap-04` · `specGap-05` ·
`specGap-08` · `specThin-01` · `specThin-02` · `specThin-03` · `specThin-04` · `specThin-05` ·
`structure-08` (its realExample clause) · `structure-04` (its block-wiring clause).

**RULE 1 APPLIED TO THIS BRIEF'S OWN FIRST DRAFT.** It said 39a would add a stopword filter to
`normalize()` in `components/learn-mode/utils.js`, because `topFix-02` and `structure-04` both ask
for one. **Packet 2 already added it** — `4d45478`, `components/learn-mode/utils.js:38-41`, a
21-word STOP set including `the`, `and` and `for`. Verified rather than assumed: with the live
titles, `matchDiagramsToBlocks(['The Effect of a Tariff (Welfare Analysis)', 'The Effect of a
Quota (Welfare Analysis)', 'Comparative Advantage: Numerical Example'], ['The Case for Free
Trade', 'Protectionism and the WTO'])` returns `{}`, and a genuine title match still resolves. So
the code half of both findings is closed by packet 2 and the evidence cites it; **this packet
closes their content half, which is the block wiring**. Third instance of a false statement in a
builder's own brief (packet 30, packet 33, now this one).

**Built for its 39a clause, remainder reassigned to 39b** (rule 5, split by clause):

| id | clause closed here | clause left to 39b |
|---|---|---|
| `topFix-01` | the **Terms of Trade** block, and `quiz[8]` (Marshall-Lerner) moved out to packet 40 | the **Trading Blocs** block |
| `topFix-02` | `diagramRef`/`quizIndices`/`practiceIndices` on **every** block including the carried-forward one, plus the `normalize()` stopword filter | — (complete; 39b re-pins its own block when it rewrites it) |
| `topFix-03` | `diagrams[0]` partial specialisation so the output gain is unambiguous | the tariff flow `result` rewrite in `methods-of-protectionism` |
| `topFix-04` | the opportunity-cost fill-in off the CA table | the tariff causal-chain reorder and the tariff welfare fill-in |
| `topFix-05` | `Define` → 2 marks; `Outline` → `Explain` (4) | the tariff `Explain`, the levels guidance, the Appellate Body |
| `structure-01` | terms of trade and patterns taught before they are tested; Marshall-Lerner removed | trading blocs / trade creation–diversion taught before they are tested |
| `structure-02` | sub-topics 1–3 become **4 blocks / 23 subsections** instead of one two-subsection block | the protectionism block's cramming |
| `structure-03` | recalls exist and fire in every 39a subsection | the two tariff recalls it names by content |
| `structure-09` | a worked numerical comparative-advantage exercise in the flow | the worked tariff-diagram walkthrough |

**wont-fix with evidence:** `specGap-09` (spec heading at `econ_spec.txt:1626` is 4.3.2) ·
`structure-07` (asserts a non-defect for block 0; its block-1 clause is 39b's).

**A CORRECTION TO THIS LIST, FROM VERIFY A.** `quiz-02` and `quiz-03` are left for 39b but they are
NOT "untouched": the three bloc quiz items and the bloc practice item are **removed and not
replaced**, so the staged section has **zero** quiz and **zero** practice items on trading blocs
where live has three and one. That is deliberate — an item pinned to a block that does not teach it
is the defect those two findings describe, and leaving them unpinned would put untaught questions in
the pre-test pool — but it is a real loss of assessment coverage until 39b restores it, and 39b must
re-author them rather than assume they are still there. The bloc FLASHCARDS and the ladder DIAGRAM
are kept, because reference material in its own tab is not the defect and removing it cost a spec
leaf.

**Left for 39b:** `accuracy-01` · `quiz-02` · `quiz-03` · `specGap-02` · `specGap-03` ·
`specGap-06` · `specGap-07` · `specThin-06` … `specThin-11` · `structure-05` · `structure-06` ·
and the four reassigned by packets 33/34 (`C-causes-effects-globalisation-topFix-02`, `-topFix-03`,
`-specGap-05`, `-specGap-06`).

`structure-05` and `structure-06` stay open deliberately: each is only true of the **whole** bank
(`distributeItems` mis-assignment; the pre-test drawing untaught items), and neither is honestly closed
while the protectionism block is still the live one.

## Build plan — four blocks in the specification's own order

| # | block | spec | subsections |
|---|---|---|---|
| 1 | Specialisation and comparative advantage | 1a, 1b | 5 |
| 2 | Patterns and volume of world trade | 2a, 2b | 7 |
| 3 | The terms of trade, and what moves them | 3a, 3b | 7 |
| 4 | When the terms of trade change | 3c | 4 |
| 5 | *Protectionism and the WTO* — **carried forward unchanged, wired only** | 4a, 5 | 2 (live) |

## Acceptance checks a verifier can run without this conversation

1. `node audit/scripts/ledger.mjs unverified 39` exits 0.
2. `npm run build` · `npm test` · `npm run validate` · `npm run exposure` · `npm run recalls` all exit 0.
3. Every 4.3.2 leaf in sub-topics **1–3** (`ECON-4.3.2-1a`, `-1b-1`, `-1b-2`, `-1b-3`, `-2a-1` … `-2a-5`,
   `-2b`, `-3a`, `-3b-1` … `-3b-5`, `-3c-1`, `-3c-2`, `-3c-3` — 19 leaves) is taught in `content[]`,
   not only in a flashcard, diagram or quiz item.
4. **No Marshall-Lerner and no Prebisch-Singer anywhere in the bundle** — asserted over every string,
   not trusted to the removal.
5. Every practice item **this packet authors** has marks equal to the `tariff-census.json` tariff for
   its command word, and none uses `Outline` or `Assess`. **The two CARRIED items do not meet this
   and are not made to**: `practice:e3345b30` is `Explain … (6 marks)` where the census gives
   Explain 4, which is `BLOCK practice.tariff` in the baseline and is `topFix-05`'s tariff clause,
   assigned to 39b. The check as first written said "every practice item" and was therefore not met;
   Verify A was right to say so.
6. **Every block in the staged bundle carries `diagramRef`, `quizIndices` and `practiceIndices`** —
   including the carried-forward protectionism block, because `LearnModeTab.jsx:255` decides `hasRefs`
   for the whole section, and a block left unpinned in a section where the others are pinned gets a
   quiz by title fallback and **no practice at all**.
7. `normalize()` in `components/learn-mode/utils.js` already drops stopwords (packet 2, `4d45478`).
   The runner A/Bs it rather than editing it: `'the'` alone must not match a diagram to a block,
   and a genuine title word must still match. **No code change is claimed for this clause.**
8. Verify B at 390×844, signed out: the 23 new subsections walk without a console error from the app,
   every diagram view legible in the measured phone column, each chapter check-in resolves a question.
