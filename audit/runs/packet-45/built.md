# Packet 45 — built (labour-markets, IAL Economics 3.3.4)

Build phase, 26 September 2026. **Staged to `draft`, not published, not committed.** Every "passes"
below names the command that produced it. Nothing here was checked on a phone or in the Learn Mode
page: Verify B has not run.

## Documents, and the contradiction check

Read: `audit/PROTOCOL.md` (it has an unstaged edit from another session adding the part-level paper
splits, and that edit agrees with `DECISIONS.md` 26 Sep), the newest Handoff in `NEXT.md` ("packet 44
closed (brain)"), `PROGRESS.md` row 45 ("not started"), the Settled list in `DECISIONS.md`,
`CONTENT-GATE.md` (the recall contract and the per-section edit pass), `SPEC-OWNERSHIP.md`, and
`brief.md`. **There is no `## Packet 45 spec` in `NEXT.md`.** Packets 41, 43 and 44 hit the same gap,
and the ledger defines scope. I found no contradiction between the documents.

One Settled item shapes this build: **2026-09-26, "practice follows the real IAL paper layout"**.
labour-markets is a WEC13 topic, so its practice set follows the Unit 3 paper. Section B is a data
question with parts worth 2, 4, 6, 8 and 14 marks. Section C is a 20-mark essay. Both come from
`audit/raw/ial-paper-structure.json`.

## What was built

labour-markets was rebuilt to **3.3.4 and only 3.3.4** (`econ_spec.txt:1447-1479`; the heading is at
:1447 and 3.3.5 starts at :1485). The oracle has 19 rows and 17 leaves, and the runner asserts both
counts. The shared validator's `spec.coverage` reports 17 of 17 leaves evidenced.

| | live (`data`, unchanged) | staged (`draft`) |
|---|---|---|
| blocks / subsections | 3 / 6 | 5 / 21 |
| recalls | 0 | 21: 6 reorder, 6 classify, 5 match, 4 fill-in |
| quiz / practice | 10 / 5 (Define 4, Explain 6, Assess 10, Outline 4, Evaluate 20 on monopsony) | 31 (3 unpinned pre-test) / 7 (Define 2, Calculate 2, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20) |
| diagrams | 3 (two of them mis-drawn monopsony views, one with no scenarios) | 5, with 15 views, one pinned to each block by id |
| flashcards / mistakes / chains / evaluation | 18 / 4 / 4 / 3 | 32 / 7 / 4 / 3 |
| validator on this section | 21 BLOCK / 20 DEBT | 0 BLOCK / 1 DEBT (`quant.unit`, baselined, programme-wide: no WEC13 drill template) / 0 recoverable |

The chapters follow the specification's order:
1. The Demand for Labour (1a-1..4, 1b)
2. The Supply of Labour (2c-1..5, 2d)
3. Wage Determination in a Competitive Market (3a, 3b)
4. Trade Unions and Public-Sector Pay (2c-6, 3c)
5. Market Failure in the Labour Market (4a, 4b)

All figures come from one spine in `scripts/_packet45-util.mjs:84` (`LAB`). The spine is Tellmar's
garment machinists:
- market demand is L = 60 − 2W and market supply is L = 4W − 12, giving an equilibrium of $12 an hour and 36,000 workers;
- the firm is one workshop, where the Lth worker adds (10 − L) shirts an hour at $3 a shirt, so it hires 6.

**Scope decision (brief §4, settled here).** The live section taught three things that 3.3.4 does not
contain:
- monopsony, which is 3.3.3.7 (:1432-1434) and belongs to `market-structures-contestability`. Packet 29 teaches it and draws it correctly (`_packet29-diagrams.mjs:772`);
- the minimum wage, maximum wages and measures against immobility, which are 3.3.5.2b (:1526-1535) and belong to `government-intervention-firms`, packet 48;
- discrimination, which appears only at 3.3.5.2b (:1535).

The rebuild removes all three. What remains is a counted pointer for each neighbour, and every pointer
cites its topic number (`POINTER_ONLY`, util :223): monopsony ×2 citing 3.3.3, the minimum wage ×2
citing 3.3.5, and immobility measures ≤2 citing 3.3.5. Maximum wages and discrimination are banned
outright (`BANNED_ELSEWHERE`, util :209).

The "non-competitive" half of 3.3.4.3 is taught through the section's own leaves: trade unions (2c)
and the public sector (3c). I added a row to the map in `audit/SPEC-OWNERSHIP.md`. The backward-bending
curve and the income and substitution effects are also gone, on the packet 17 rule. The runner
re-measures each of them as 0 hits in `econ_spec.txt`.

## Files

New files:
- `scripts/_packet45-util.mjs` — the spine, the specification's lists, the bans and the pointers.
- `scripts/_packet45-content.mjs` — 21 subsections (:58-:739), `BLOCK_PLAN` :772, `LEAF_MAP` :842, `NOTES` :874.
- `scripts/_packet45-assessment.mjs` — `QUIZ` :57, `PRACTICE` :178, `FLASHCARDS` :205, `MISTAKES` :244, `EXTRAS` :287.
- `scripts/_packet45-diagrams.mjs` — five diagrams: :197, :248, :302, :366, :400.
- `scripts/packet-45-labour-markets.mjs` — the runner (dry run, `--dump`, `--stage`), in sections §1-§12.
- `audit/snapshots/2026-09-26-pre-packet-45__economics__labour-markets.json` — the t=0 snapshot of all 8 tables (`snapshot.mjs`).
- `audit/snapshots/packet-45-bundle__economics__labour-markets.json` — the staged bundle.

Modified: `audit/SPEC-OWNERSHIP.md`, one row added under "The map".

## Per ledger id: 26 claimed, 5 wont-fix

File references are into `scripts/_packet45-content.mjs` (C), `_packet45-assessment.mjs` (A),
`_packet45-diagrams.mjs` (D) and the runner (R).

| id | what changed | where |
|---|---|---|
| topFix-01 | Every block pins its own diagram by `diagramId`, and `quizIndices` / `practiceIndices` are derived from each item's block tag. Blocks carry no `diagramRef` and no fallback. The item's specific index lists are not reused because the blocks they index no longer exist. | R §4 (:208); pins `[[3..7],[8..13],[14..19],[20..25],[26..30]]`, practice `[[0,1],[2],[3],[4,5],[6]]` |
| topFix-02 | **Clause by clause.** (a) All subsections have recalls: 21 of 21 (done). (b) The fill-in "value of output × price; hire while ≥ wage" is done at C :113. (c) The monopsony-construction reorder and (d) the NMW-in-monopsony reorder are refused here, because monopsony is 3.3.3.7 and its recalls live in packet 29 (`_packet29-content.mjs:1594`, :1612). (e) The bilateral-monopoly fill-in is refused because "bilateral monopoly" occurs 0 times in the spec (runner §5). | C; R §8 |
| topFix-03 | **Clause by clause.** (a) The wage-differentials key idea is gone; its replacement at C :535 and the misconception at :547 say that gaps from scarce skills are the market working and gaps that persist from immobility are market failure. (b) The NMW-in-competitive-market paragraph is refused: it is 3.3.5.2b, and a pointer citing 3.3.5 is at C :613. (c) The elasticity determinants are done: demand at C :193 and supply at C :353. | C; R §11 |
| topFix-04 | The mis-drawn monopsony SVGs are removed with the monopsony subsection rather than repaired as a second copy. The owner's diagram draws the wage off supply (`_packet29-diagrams.mjs:772`). The runner fails the build if a monopsony diagram returns. | R §10 |
| topFix-05 | Practice was rebuilt to the WEC13 shape with Define at 2, and no Outline or Assess anywhere (banned and A/B'd). The 20-mark guidance is levels-only and describes KAA levels with "evaluation credited in levels of its own"; it allocates no points, so there is no point total that could fail to sum to 20. The item also asks for the monopsony diagram in the essay; that clause is refused because monopsony is 3.3.3. The Evaluate asks for a labelled labour-market diagram. | A :178-:203 (Evaluate :194); R §7 |
| accuracy-01 | The phrase "not because markets are failing" is gone and banned (R §2). Immobility is taught as a market failure in 4a/4b. | C :535, :547, :739 |
| quiz-01 | The elasticity-of-demand-for-labour item (A :82) is pinned to chapter 1, which teaches its four factors (C :193). The runner asserts both. | R §6 |
| specGap-01 | Covered by the elasticity-of-demand subsection: the formula, a worked −0.67, and four factors. | C :193 |
| specGap-02 | Covered by the elasticity-of-supply subsection: the formula, four factors, and elastic against inelastic supply with the same demand shift ($14 / 44,000 against $16 / 40,000). | C :353; D :248 (third view) |
| specGap-06 | Covered by the firm-as-wage-taker subsection and the diagram view "One firm: a wage-taker", which shows a horizontal supply at the market wage and the firm hiring where it meets its demand curve. The runner asserts that the horizontal line exists in the SVG. | C :424; D :278; R §10 |
| specGap-08 | The claim "Examiners expect you to draw the MRP curve" is gone. The word "examiner" is banned from student-facing text (R §9), and every exam line cites Appendix 6. MRP is named once, as an aside ("Textbooks call this…", C :106), with "diminishing marginal productivity" (`:1305`) carrying the slope. | C :106 |
| specThin-01 | Covered by labour-or-capital: an automatic cutter at $30 an hour against 3 machinists, with a break-even wage of $10. | C :159 |
| specThin-02 | Covered by population-and-migration: size of population, including growth and ageing. | C :253 |
| specThin-03 | Covered by tax-and-benefits: the level of welfare benefits and the gain from taking a job. The brief also found two coverage items with no ledger id, income tax rates and price of the product. Both are covered, at C :290 and C :127, and the runner's `mech` asserts both. | C :290 |
| specThin-04 | Covered by government-regulations: licensing, work permits, hours limits and retirement or school-leaving ages, with a worked licence shift. | C :320 |
| structure-01 / -02 | These are the same as topFix-01. The fallbacks they describe cannot be reached from this bundle because every block pins its diagram, quiz and practice items, and `pins.diagram` passes. | R §4 |
| structure-03 | The trade-union practice item (Examine 8) is pinned to chapter 4, where unions are taught, and the runner asserts that. The Assess (10) is gone, and the Evaluate (20) reaches a block. | R §4 |
| structure-04 | Covered: 21 recalls, all four types, each carrying `why` lines, with the shared `recall.recoverable` count at 0. | R §8, §12 |
| structure-05 | The incoherent unions-with-differentials pairing is gone. The chapters follow the specification's order. The item's proposed "competitive + NMW" and "monopsony + unions" groups are not built, because NMW and monopsony belong to other sections. | C :772 |
| structure-06 | Same as specGap-06. The "MCL above supply" jump it guards against no longer happens here. | D :278 |
| structure-07 | No text presupposes the competitive minimum-wage result, and the runner asserts that "standard unemployment prediction" and "national minimum wage" are absent. The rule itself is taught by its owner. | R §11 |
| structure-08 | The unions flow is a causal chain (limits entry → fewer can do the job → supply shifts left), not three market cases. Asserted by the runner. | C :562; R §11 |
| structure-09 | The misconception is now the diminishing-returns error ("later recruits are lazier or less skilled"). The movement-vs-shift error sits in the fill-in and the classify. | C :110 |
| structure-10 | The contradiction is removed at its root: the backward-bending curve is not taught (banned). Notes are generated from the same module as Learn content, one topic per chapter. | C :874; util :209 |
| structure-11 | The ramp is kept in the specification's order: demand and supply, then the competitive wage, then non-competitive pay, then immobility. Takeaways are per chapter. | C :772 |
| **specGap-03** (wont-fix) | Covers the minimum wage, which is 3.3.5.2b (:1530), packet 48. | ledger note |
| **specGap-04** (wont-fix) | The item's subject is 3.3.5.2. Its one 3.3.4 clause, public-sector pay (3c), IS built (C :633, D :351). | ledger note |
| **specGap-05** (wont-fix) | The item cites "3.4.3", which is absent from the spec. None of its issues is spec text except net migration, which is taught. | ledger note |
| **specGap-07** (wont-fix) | Discrimination appears only at 3.3.5.2b (:1535). | ledger note |
| **specGap-09** (wont-fix) | The app's 3.3.4 is correct: :1447. "3.4.x" is absent. | ledger note |

## What was run, and what it measured

- `node scripts/packet-45-labour-markets.mjs --dump --stage` exits 0 (`runner.log`). It reports 0 new BLOCK and 0 new DEBT on this section, 0 `recall.recoverable`, and 17 of 17 leaves. All 8 tables were staged, and `stageBundle` returned `ok:true`.
- **Mutation A/B** of the runner on copies (`ab-mutation.sh`, `ab-mutation.log`). The clean copy exits 0. All 11 planted defects fail with the named message:
  - accuracy-01 phrase
  - uncited monopsony
  - typed spine figure
  - Define (4)
  - a quiz key printed on its diagram
  - a parallel-case flow
  - backward-bending
  - a figure in a practice opening
  - no 14-mark Discuss
  - a missing `why`
  - a label collision
- **Independent read-back** from the database, not the API (`draft-readback.mjs`, `draft-readback.log`). For each of the 8 tables, `draft` equals the dumped bundle and `data` equals the t=0 snapshot, so live was not written. `check-staged-drafts.mjs labour-markets` against `:3001?draft=1` reports "matches". That check covers the signed-out slice only.
- **Diagrams** were rendered to PNG with sharp from the dumped bundle file and inspected by eye (`diagrams-grid.png`, 15 views). This was the dark background at 800 px per view only. The light theme and the 390 px in-app render were not checked.
- **Rule 3 proxy, not the real check.** `field-paths-vs-p44.log` finds that every field path and body `type` in this bundle already occurs in packet 44's bundle, and packet 44's content is live since 05:45. `origin/main`'s components were NOT re-read field by field.
- `npm test`: 331/331. `npm run recalls`: exit 0, "no section is worse than the baseline". `npm run exposure`: exit 0. `npm run validate`: exit 0. All four ran in the SHARED worktree, which holds other sessions' uncommitted changes.
- **Not run:**
  - `npm run build`, because a `next build` here would rewrite `.next` under the dev server on :3001. No file this packet touches is imported by `app/`.
  - Verify A.
  - Verify B, the 390×844 walkthrough.
  - Layer 6 adversarial review.
  - Layer 4 corroboration.

## Publish (rule 6 — for the founder, not run)

```
node scripts/packet-45-labour-markets.mjs --stage && node scripts/publish-section.mjs labour-markets --confirm
```

## For the next phases

- Git: staged by explicit path, not committed. `audit/ledger.json` (26 claims, 5 wont-fix) is written but NOT staged, because it carries other sessions' unstaged changes. `PROGRESS.md`, `NEXT.md` and `DECISIONS.md` are untouched.
- A suggested DECISIONS entry is the SPEC-OWNERSHIP row: this section points at monopsony and the minimum wage instead of teaching them.
- **Packet 48 inherits**:
  - the minimum wage in a competitive market, including the "exception before the rule" order issue with packet 29's monopsony minimum wage;
  - maximum wages;
  - measures against immobility;
  - discrimination.
- **Real examples for a Layer 4 reviewer to corroborate.** None carries a year or a figure.
  - online delivery growth in Kuala Lumpur and Lagos
  - Kenyan tea estates
  - palm-oil harvesters in Malaysia and Indonesia
  - self-checkouts in Singapore and Nairobi
  - pilots and car-park attendants
  - Nairobi night-shift nursing
  - the UAE and Qatar's South Asian construction workforce
  - Nigerian and Kenyan doctors and nurses emigrating
  - the UAE's lack of personal income tax
  - Singapore's work-pass system
  - Hong Kong pilots against waiters
  - dockers' unions
  - Kenya's Salaries and Remuneration Commission and doctors' strikes
  - rural-to-city rents in Karachi and Lagos
  - regional unemployment alongside shortages in Pakistan and Indonesia

## Fix round 1 (26 September 2026) — the three verifier rejections

The verifier was right on all three. The round-0 rows above for `structure-03`, `structure-09` and `specGap-08` are
superseded by this section.

| id | what was wrong | fix | where |
|---|---|---|---|
| structure-03 | `resolvePinnedItem` serves ONE practice item per chapter, the first unused pin. Round 0 checked `practiceIndices.includes(i)`, which a second pin passes, so the Evaluate (20) at `[4,5]`'s second slot was never served. | Evaluate (20) now comes before Examine (8) in `PRACTICE`, so chapter 4's pins are `[4,5]` with the Evaluate first. The Evaluate draws on supply and demand (ch. 3), unions and public-sector pay (ch. 4), and immobility, which ch. 3's why-pay-differs introduces. Five chapters and seven items means two are Practice-tab only: Calculate (2) and Examine (8, unions). | A :191-196 |
| structure-09 | The "firms need workers" filler survived in the derived-demand misconception and in mistakes[2]. The runner tested only the hiring-rule misconception, for "need them". | The derived-demand misconception is now the movement-vs-shift error for a product-demand change. mistakes[2] is now the error the item names: valuing extra output at the price when the firm must cut its price to sell more. | C :76; A mistakes[2] |
| specGap-08 | "extra output × price = MRP" is true only for a price-taker in the product market, and that assumption was never stated. | MRP is taught as extra output × marginal revenue. It equals × price only for a firm selling at a given price, and Arun Shirts is stated to be one. Rule 4 sweep of the same surfaces: hiring-rule body[1] and its fill-in line 1, productivity-and-price body[0], flashcards[3] and [4], notes[0]'s hiring-rule mechanism, the "How one firm decides" chain step 3, the quiz stem "5 units … $4", the Calculate (2) question ("can sell any amount at this price"), and the demand diagram's description. | C :106, :116, :134, :886; A :76, :182, :209-210, chains[1]; D :200 |

`marginal revenue` is spec vocabulary (`econ_spec.txt:1301`). The ban on "marginal revenue product" as a spec term is unchanged, and it is still named once in the Learn body.

### Runner changes (`scripts/packet-45-labour-markets.mjs`)
- **structure-03.** The check now serves the pins the way the client does and asserts that the 14- and 20-mark items are served, and that no served item names unions before chapter 4. It prints a `served:` line.
- **structure-09.** Every misconception and every mistake is tested for the filler, by the pattern `need(s|ed) … workers|them|staff|labour`.
- **structure-09 (named errors).** The derived-demand misconception must be the product-demand shift error. A mistake must name "cut its price".
- **specGap-08.** Each body block, recall template line, keyIdea, misconception, examMatters, flashcard, notes item, practice question, quiz stem with its explanation, chain and diagram description that multiplies output by the price must also state the given-price assumption in the same text.

### What was run, and what it measured
- `node scripts/packet-45-labour-markets.mjs --dump --stage` exits 0 (`runner-fix1-stage.log`). It reports 0 new BLOCK and 0 new DEBT. The `served:` line is practice `[0,2,3,4,6]`, and `[1,5]` are Practice-tab only (`runner-fix1.log`).
- **Mutation A/B of the new checks** (`ab-fix1.sh`, `ab-fix1.log`). The clean copy exits 0. Seven planted defects each fail with their named message: Examine placed first, "need more workers", "needed them", no cut-price mistake, and the old flashcard, notes and body wording.
- **Whole-state A/B.** The new runner, run against the PRE-FIX modules (the rejected state), fails with all three ids: 1 structure-03, 4 structure-09 and 7 specGap-08 lines.
- The original 11 mutations still pass (`ab-mutation-fix1.log`).
- **Independent of the runner.** `served-practice.mjs` reads the DUMPED bundle file and serves it through the client's own `buildSteps` and `placeChapterItems`. Both are byte-identical to `origin/main`. Result: ch. 1 Define 2, ch. 2 Explain 4, ch. 3 Analyse 6, ch. 4 **Evaluate 20**, ch. 5 Discuss 14. Calculate 2 and Examine 8 are not served (`served-practice.log`).
- **Text scan of the dumped bundle JSON** for "need" and for output × price, read by eye (`fix1-text-scan.log`, 43 lines). The remaining "need" hits are all product-market causes or requirements ("workshops need more hours of sewing", "needs a licence"), not the filler.
- **DB read-back** (`draft-readback-fix1.log`): `draft` equals the bundle for all 8 tables, and `data` (live) equals the t=0 snapshot, so live was untouched.
- **Draft API** at `:3001?draft=1`, signed out (`api-draft-fix1.log`): the new misconception, hiring-rule body, practice order and notes[0] mechanism are served. `check-staged-drafts` shows 0 drift. The signed-out slice serves 2 flashcards and 0 mistakes, so flashcards[3]/[4] and mistakes[2] were confirmed by the DB read-back only, not through the API.
- `npm test` 331/331, `npm run recalls` exit 0, `npm run exposure` exit 0 and `npm run validate` exit 0, all in the SHARED worktree.
- **Not run:** `npm run build`, Verify B at 390×844, and any rendering of the changed text.

### Publish (rule 6, for the founder, not run)

```
node scripts/packet-45-labour-markets.mjs --stage && node scripts/publish-section.mjs labour-markets --confirm
```
