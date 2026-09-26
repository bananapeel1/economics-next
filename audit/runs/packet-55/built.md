# Packet 55: built (global-marketing, IAL Business 4.3.3, WBS14)

**Build phase, 26 September 2026.** The section is staged to `draft` only. It is not published and not committed. Each "passes" below names the command that produced it. Nothing here was checked in the Learn Mode page or at any phone width. Verify A and Verify B have not run.

## Read before building (not trusted from the brief)

- **Files read myself:** `audit/PROTOCOL.md` in full, the newest handoffs in `audit/NEXT.md` (:11053, :11158), PROGRESS row 108, and the 26 Sep entries of the DECISIONS Settled list. I read `audit/CONTENT-GATE.md` in full, including the recall contract and both check-in answer rule entries. I read `bus_spec.txt:1418-1456`, `:1090-1112` and `:2215-2252`, and all 23 ledger records through `ledger.mjs show`.
- **No `## Packet 55 spec` heading exists in NEXT.md.** Packets 41 and 43-47 had the same gap. The ledger and `brief.md` supplied the scope. I found no contradiction between PROTOCOL, the DECISIONS Settled list and CONTENT-GATE.
- **The live row is not the t=0 export.** It carries packet 2.9's pins: block 0 `[0]`, block 1 `[1]`. No draft existed at t=0 (`draft-state-t0.log`).

## What was built

The section is rebuilt to 4.3.3 (`bus_spec.txt:1424-1446`; heading at `:1424`, 4.3.4 at `:1453`). The oracle has 15 rows and 13 leaves, and the stage result reports 13 of 13 evidenced.

| | live `data` (unchanged) | staged `draft` |
|---|---|---|
| blocks / subsections | 2 / 4 (standardisation, glocalisation, Hofstede, cultural mistakes) | 5 / 15, three per chapter |
| recalls | 0 | 15: 1 reorder, 7 classify, 3 fillin, 4 match |
| quiz / practice | 10 (7 keyed to one letter) / 5 (Define 4, Analyse 6, Assess 10, Evaluate 20, Outline 4) | 25 (3 unpinned pre-test, keys 7/6/6/6) / 7 on one source: Explain 4 · Calculate 4 · Discuss 8 · Assess 12 · Assess 12 · Evaluate 20 · Evaluate 20 |
| diagrams | 0 | 5 (6 views), one per chapter by `diagramId` |
| flashcards / mistakes / extras | 18 / 5 / chains + evaluation | 28 / 7 (canonical title/mistake/correction/examTip) / 3 chains + 3 evaluation |
| validator, this section | 9 BLOCK / 28 DEBT | 0 BLOCK / 1 DEBT (`quant.unit`, already baselined) / 0 recoverable; 31 baselined findings clear on publish |

The chapters are:

1. Global Marketing Strategy and Approaches (1a, 1b)
2. The Marketing Mix in Global Markets (1c)
3. Ansoff and Porter in Global Marketing (1d)
4. Global Niche Markets (2a-2c)
5. Cultural and Social Factors (3a, four bullets)

Every figure comes from one invented firm (`FIRM`, U:94). It is Serana, a Singaporean skincare brand, entering an invented market, Zarand, in dollars only. No real firm, no year and no UK frame appear anywhere.

## Scope calls, each settled on the document (Rule 1)

1. **Numbering.** Some ids cite numbers one digit short of the real ones:
   - `specGap-01/02/03` cite 4.3.1 and `specGap-04/05` cite 4.3.2. In this document those are Globalisation (`:1323`) and packet 47's topic (`:1372`).
   - Each id was mapped by its wording to 4.3.3 · 1b, 1d, 1d, 2b and 2c (U header; `LEAF_MAP` C:499).
   - `specGap-03`'s "(e)" does not exist. Item 1 stops at (d), and 1d names Ansoff and Porter in one bullet, so both are built as one requirement in chapter 3.
   - The runner asserts that the lettered lines inside 4.3.3 read a-d / a-c / a (R §5).
2. **`specGap-06` is wont-fix.** There is no "4.3.3 (g)", and "social media" appears nowhere in `:1424-1452`. Its hits are at `:530/:632/:635` (Unit 1 promotion) and `:1486` (4.3.4). The runner asserts both facts. Social media appears once, as an example promotion channel (C:405), and is not taught as a 4.3.3 factor.
3. **`structure-05`'s renumbering premise is refused, and its substance is claimed.** The items are unnumbered 1/2/3 inside 4.3.3. The runner asserts the database's own `4.3.3 / WBS14` (R §12). Niche markets (item 2) are now taught in `content[]` as chapter 4.
4. **Hofstede is removed, not demoted to extras.** This is `topFix-02`'s last clause. Hofstede has 0 hits in the specification (`specGap-08`), and an extras card would still be teaching him. The same goes for Hall's "high-context", "stuck in the middle", and the Nova and KFC anecdotes: all are banned, each ban is tested both ways, and each is re-measured (U:144, R §2). **If the verifier reads `topFix-02` as requiring a Hofstede extras chain, rejecting it is correct.**
5. **Ansoff and Porter are taught here as application only.** `SPEC-OWNERSHIP.md:29` names this section as the owner of 4.3.3 · 1d. The cell names follow `business-objectives-strategy` (3.3.1), and 3.3.1 is cited for the theory (C:199, C:229). Packet 47's published bundle (`boundary-47.log`) has one Ansoff pointer, which names 4.3.3, and teaches no glocalisation, niche, approach or 4Ps material. There is no overlap in either direction. The SPEC-OWNERSHIP row 29 status is updated.
6. **The real examples are invented or generic, on purpose.** Layer 4 deletes what it cannot corroborate. The runner bans the live section's named firms (McDonald's, Unilever, KitKat, Ryanair and others; R §9). **For `structure-07` this means** the language and branding failures in `content[]` are illustrations that are true by construction: C:387 (the furniture catalogue), C:384 (Serana's name) and C:415 (the gift-wrap colour). None is a corroborated real case. A verifier who reads "verified" as "a documented real firm" should reject `structure-07`.

## Files (all new unless stated)

- `scripts/_packet55-util.mjs` (U): ids, formatters, `FIRM` :94, `APPROACHES`/`CULTURAL_BULLETS`, `BANNED` :144.
- `scripts/_packet55-content.mjs` (C): 15 subsections :42-:401, `BLOCK_PLAN` :430, `LEAF_MAP` :499, `NOTES` :524.
- `scripts/_packet55-assessment.mjs` (A): `QUIZ` :55, `EXTRACT` :155, `PRACTICE` :157, `FLASHCARDS` :195, `MISTAKES` :230, `EXTRAS` :269.
- `scripts/_packet55-diagrams.mjs` (D): the spectrum :62/:79, the 4Ps grid :96/:120, Ansoff and Porter :148/:159/:170, the niche :188/:205, the considerations :222/:234.
- `scripts/packet-55-global-marketing.mjs` (R): the runner (dry run / `--dump` / `--stage`). It has 12 check sections, listed at R:79-:591.
- `audit/SPEC-OWNERSHIP.md` (modified): row 29, status only.
- `audit/snapshots/2026-09-26-pre-packet-55__business__global-marketing.json`: the t=0 snapshot of all 8 tables.
- `audit/snapshots/packet-55-bundle__business__global-marketing.json`: the staged bundle.
- `audit/runs/packet-55/`: `snapshot.mjs`, `draft-state.mjs`, `draft-readback.mjs`, `ab-mutation.sh`, `checkin-answer-rule.md`, and the logs below.

## Per ledger id (22 claimed, 1 wont-fix)

| id | what changed | where |
|---|---|---|
| topFix-01 | Chapters on the three approaches (C:73, C:95), Ansoff and Porter applied (C:196, :226, :248) and niche markets (C:272, :294, :324). The live quiz items 1/3/4/6/8 are replaced, and the runner refuses any quizzed term no subsection teaches. | C; A:55; R §6 |
| topFix-02 | Hofstede section removed. 3a's four bullets are taught in three subsections (C:352, :374, :401). Nova and KFC are banned. See scope calls 2 and 4. | C:352-:428; U:144 |
| topFix-03 | Sachet item replaced by a both-Ps item (A:86). The white-colour trivia and the "do not watch television" distractors are retired, and the runner refuses their return. | A:86; R §6 |
| topFix-04 | Three-approach fill-in (C:110). Glocalisation reorder (research → decide → test → launch, C:58), sourced from extras chain 1 (A:272) and not printed on its own step. Spectrum and Ansoff diagrams (D:62, D:148). | C:58, :110; A:272; D |
| topFix-05 | "Explain one way…" at 4 marks (A:158). Its guidance separates market development (an adapted existing product in a new country) from product development. Levels naming K/App/An/Ev above 6 marks. India and fast-food items gone. Clean openings. | A:157-:190; R §7 |
| accuracy-01 | Hofstede/KFC/"high-context" realExample removed. Hall's terms banned and re-measured absent from the spec. | U:144; R §2 |
| quiz-01 | Pack size taught as product and the price of one purchase as price (C:152-:153). The quiz asks for both (A:86). A fill-in drills the split on a new case (C:163). | C:147; A:86 |
| structure-01 | 15 recalls of all four types and 5 diagrams | C; D |
| structure-02 | Every quizzed term is taught (R §6). Pins are derived per chapter. | R §4, §6 |
| structure-03 | All three approaches are taught. The orphan "Adaptation:" takeaway is gone (C:430). | C:73, :95, :430 |
| structure-04 | Hofstede gone. 3a gets three subsections, with the runner refusing fewer than three. Social media: see scope call 2. | C:352-:428; R §11 |
| structure-05 | Niche markets are in `content[]` (chapter 4). The 4.3.3 tag is kept, and the renumbering is refused (scope call 3). | C:272-:350; R §12 |
| structure-06 | Every misconception opens on what students write. The runner refuses exam-technique wording and repeated openings. | C (15 `misconception` fields); R §9 |
| structure-07 | Language and branding failures sit in `content[]` bodies and realExamples. See scope call 6 for what "verified" means here. | C:374-:428 |
| structure-08 | Chapters ramp from definitions (1) to 4Ps application (2) to frameworks (3) to niche (4) and culture (5). The runner asserts the order. | C:430; R §11 |
| specGap-01 | domestic/ethnocentric, international/polycentric, mixed/geocentric | C:73, :95 |
| specGap-02 | Ansoff applied to global decisions: four cells and the risk ramp | C:196 |
| specGap-03 | Porter's matrix applied to global decisions: four cells, and the limit it puts on adaptation | C:226, :248 |
| specGap-04 | Features of global niche markets | C:294 |
| specGap-05 | 4Ps adapted to suit a global niche | C:324 |
| specGap-07 | 3a's four bullets, each with a worked example and its checks | C:352, :374, :401 |
| specGap-08 | Hofstede removed and banned | U:144 |
| specGap-06 | **wont-fix** (scope call 2), with the evidence written on the ledger item | ledger note |

## What was run, and what it showed

- **Runner dry run and `--dump --stage`: exit 0** (`runner.log`, `stage.log`).
  - Before: 9 BLOCK / 28 DEBT. After: 0 BLOCK / 1 DEBT, and that one is baselined. 0 new findings and 0 recoverable recalls.
  - The stage result shows 13 of 13 leaves covered, with INFO findings only.
- **`ab-mutation.sh` (`ab-mutation.log`).** Seven defects were planted, and all seven guards fire:
  - Hofstede in a realExample
  - "a quarter" written for a third
  - a reorder item printed on its own step
  - the sachet keyed Price alone
  - "Explain two ways"
  - a check-in key on the chapter-1 diagram
  - points allocated above 6 marks

  The modules were restored byte for byte, and the control run exits 0.

  **The own-step guard was silent on round 1.** It normalised the item but not the body. The validator's `recall.recoverable`, which is a separate method, caught the plant, so the guard was fixed (R:371-:377) and fires on round 2.
- **Draft against bundle, by two methods.**
  - `draft-readback.mjs` reads all 8 tables' `draft` and `data` columns directly: `draft` equals the bundle, and `data` equals the t=0 snapshot (`draft-readback.log`).
  - `check-staged-drafts.mjs global-marketing`, through `?draft=1` (the signed-out slice): 0 drift.
- **Served JSON (`served-check.log`).** `curl ?draft=1`, parsed by shape rather than by module id: the 5 new chapters, all four recall types, and 0 hits for hofstede, high-context, nova, kfc, mcdonald and india. Without `draft=1` the old two blocks are still served. This checks the served JSON only. It is not a render.
- **Gates**, run in the shared worktree:
  - `npm test`: 357/357
  - `npm run validate`: exit 0 (reads live `data`)
  - `npm run exposure`: exit 0, draft 0 STARVED / 0 UNWRITTEN
  - `npm run recalls`: exit 0, "no section is worse than the baseline"

  Logs are `gate-*.log`.
- **Rule 3 against `origin/main` `6ef6eaa` (fields, not type names).**
  - `components/learn-mode/{Reorder,Classify,Match,FillIn}Recall.jsx` exist.
  - Learn Mode renders bodies through `NoteSection` → `BodyRenderer`, which has `case 'bullets'` on main. This bundle uses `bullets` in 3 subsections.
  - `lib/checkin-placement.js` reads `diagramId`.
  - `lib/mistakes-shape.js` reads `mistake`/`correction`/`examTip`. The runner re-reads main's copy on every run.
  - On these fields the bundle is **SAFE**. A full component-by-component audit was not done.
- **Check-in answer rule:** my own reading gives 5 of 5 clean (`checkin-answer-rule.md`). This is the builder's reading, and the verifiers must each write their own.
- **Not run:**
  - `npm run build`. This packet touches no file under `app/` or `components/` (packet 47's precedent), and a build would rewrite `.next` under the :3001 dev server.
  - Verify A, and Verify B at 390×844.
  - Diagrams rendered in a browser at any width. They were checked only as emitted SVG, by the runner's geometry checks.
  - A Layer 6 adversarial review.

## Publish (Rule 6: for the founder, not run)

```
node scripts/packet-55-global-marketing.mjs --stage && node scripts/publish-section.mjs global-marketing --confirm
```
Also check whether `app/business/unit-4/page.js` and `app/business/page.js` describe 4.3.3 in terms this rebuild no longer uses. Packet 47 found that defect for 4.3.2. I did not check it for this section.
