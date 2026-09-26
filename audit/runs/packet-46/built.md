# Packet 46 — built (growth-development, IAL Economics 4.3.6, WEC14)

Build phase, 26 September 2026. **Staged to `draft`, not published, not committed.** Every "passes"
below names the command that produced it. Nothing here was walked in Learn Mode or on a phone
(Verify B has not run), and `npm run build` was NOT run by this phase (see "Not done").

## What was built

`growth-development` rebuilt to **4.3.6 and only 4.3.6** (`audit/raw/econ_spec.txt:1899-1968`, read
directly: heading `:1899`, sub-topics at `:1904`, `:1916`, `:1945`, 3d at `:1965`, last bullet NGOs
`:1968`). Oracle: 50 rows / 43 leaves (`spec-items.json`, topic 4.3.6), asserted by the runner.
**43 of 43 leaves evidenced** (`spec.coverage` in the runner's validator pass; live was 67%).

| | live (`data`, unchanged) | staged (`draft`) |
|---|---|---|
| blocks / subsections | 3 / 6 (Growth vs Development · Development Strategies · Sustainability) | 7 / 34, in the spec's own a/b/c/d order |
| recalls | 0 | 34: 10 reorder, 9 match, 9 classify, 6 fill-in |
| quiz / practice | 12 / 5 (4 of 5 illegal commands or tariffs) | 44 (3 unpinned pre-test) / 10 |
| diagrams | 5, two pinned, block 3 none | 7 (16 views), one per block, pinned by id |
| flashcards / mistakes / extras | 18 / 4 / 4 chains + 4 eval | 43 / 7 / 4 chains + 3 eval |
| validator, this section | 14 BLOCK / 43 DEBT | 0 BLOCK / 1 DEBT (`quant.unit`, baselined, carried) / 0 recoverable |

Chapters: 1 Measuring Development (1a-1c) · 2 Constraints: Commodities, Savings and Currency (2a-1..5)
· 3 Constraints: People, Debt, Credit and Infrastructure (2a-6..10) · 4 Non-Economic Constraints (2b)
· 5 Market-Orientated Strategies (3a) · 6 Interventionist Strategies (3b) · 7 Other Strategies and
International Institutions (3c, 3d). Seven is the ceiling: 3 pre-test + 1 per check-in = 10 =
`FREE_QUIZ_MAX` (`lib/preview-limits.js:62`); `?draft=1` served exactly 10 quiz items.

## Files

New: `scripts/_packet46-util.mjs` (spine `ECON` :84, bans :214, pointers :228) ·
`scripts/_packet46-content.mjs` (34 subsections :55-:1130, `BLOCK_PLAN` :1157, `LEAF_MAP` :1245,
`NOTES` :1302) · `scripts/_packet46-assessment.mjs` (`QUIZ` :58, `PRACTICE` :219, `FLASHCARDS` :255,
`MISTAKES` :305, `EXTRAS` :350) · `scripts/_packet46-diagrams.mjs` (7 diagrams :107-:483, `DIAGRAMS`
:500) · `scripts/packet-46-growth-development.mjs` (runner) ·
`audit/snapshots/2026-09-26-pre-packet-46__economics__growth-development.json` (t=0 of all 8 tables,
LIVE — note the older `audit/content-sections/` file is stale: packets 2.9/2.91 had since pinned
blocks 1-2, so the brief's "no block has pins" is true of that file, not of live) ·
`audit/snapshots/packet-46-bundle__economics__growth-development.json` · run files in this folder.

## Per ledger id (25 claimed)

| id | what changed | where |
|---|---|---|
| topFix-01 | every block pins its own diagram by `diagramId` (the current contract; `diagramRef` asserted absent), quiz/practice pins derived from item block tags, one recall per subsection (HDI = match, Harrod-Domar = fill-in, Lewis = reorder ending at the turning point) | runner :60-:67, §4 :198; content :80, :261, :983 |
| topFix-02 | chapters 5/6/7 = spec 3a/3b/3c+3d; privatisation + subsidy removal :709, floating :734, managed :858, joint ventures :925, Lewis own subsection :983, tourism :1023, primary industries :1048, debt relief :1076, NGOs :1130. **Fairtrade NOT added: 0 hits in econ_spec.txt; the one "fair trade" is the Extended Project title :2615** — runner asserts both (§5) and bans the word | content as listed; util :214 |
| topFix-03 | capital flight :329 and foreign currency gap :296 taught; Lewis turning point in `lewis-model` :983; **Dutch disease removed (0 hits in the spec — not a spec item)**; Q11 and its joke distractors gone with the rebuilt bank | runner §6 :321, §11 :610 |
| topFix-04 | Block 3 (Sustainability/EKC/green growth) verified off-spec (0 hits, any unit) and removed; its step reused for constraints (chapters 3-4); one short evaluation card on environmental costs, pointed at 2.3.5 (`:1117`) | assessment :347, :404; runner :496 |
| topFix-05 | Paris wording gone with the block; 14/20-mark guidance is levels only; no Outline/Assess; Define is 2; "growth is necessary" contradiction resolved and refuted in the misconception | content :55-:67; assessment :219; runner :390, :473 |
| accuracy-01 | the Paris Agreement / $100bn / "consistently fallen short" sentences removed with the off-spec block; runner asserts absence | runner :610 |
| accuracy-02 | the uncited EKC/green-growth examiner claims removed; `claim.uncited` 0 in the staged section | runner :610, §9 |
| quiz-01 | Lewis model taught in prose before it is quizzed | content :983; runner :321 |
| quiz-02 | capital flight taught in prose | content :329; runner :321 |
| structure-01 | 34 recalls, all four types | runner §8 :394 |
| structure-02 | every block has diagram, quiz and practice; `?draft=1` serves each block's own first quiz item (draft-readback.log) | runner §4 |
| structure-03 | pre-test = 3 unpinned chapter-1 items, first in the array; nothing quizzed that is untaught (runner KEY_TERMS check) | assessment :58-:70; runner §6 |
| structure-04 | 34 steps, each subsection ≤350 teaching words with its own recall (step model: one subsection per step) | runner §9 |
| structure-05 | takeaways only name terms their own block teaches (runner check) | runner :474 |
| structure-06 | Learn, Notes and diagrams share the spec's taxonomy; "Market-Led" asserted absent | runner §4; content :1302 |
| structure-07 | misconceptions rewritten per subsection; green-growth filler gone; "Wrong — … Instead write:" template asserted absent | runner :468 |
| structure-08 | Lewis and Prebisch-Singer each have a prose subsection and a pinned diagram | content :221, :983; diagrams :182, :483 |
| structure-09 | sustainability gone; 3c and 3d have chapter 7 | content :1157 |
| specGap-01 | HDI advantages/limitations :113 and all six 1c indicators :144. **MPI/IHDI not added (0 hits); Gini is 4.3.4's — pointer budget only** | util :214, :228 |
| specGap-02 | every 2a/2b leaf has a subsection (:296-:610); property rights taught inside poor governance (2b-2); "geography" not added (not a 4.3.6 bullet) | content |
| specGap-03 | subsidy removal + privatisation :709, floating :734 | content |
| specGap-04 | human capital :804, managed rates :858, joint ventures :925 | content |
| specGap-05 | Lewis :983, tourism :1023, primary industries :1048, debt relief :1076. **Fairtrade refused as above** | content |
| specGap-06 | World Bank + IMF :1105, NGOs :1130. **"4.3.5" parenthetical refused: the runner asserts World Bank/IMF/NGOs occur only inside :1899-1968** | runner §5 |
| specGap-07 | resolved: sustainability/EKC/green growth 0 hits in the whole spec; block removed | runner §5 |

## Practice scope decision (brief §6 left it to the builder)

The 26 Sep Settled entry reshapes **practice pages**; `lib/model-answers-route.js` reads
`data/modelAnswersData`, not `section_practice`, so the 4.3.6 model-answer page is a different
surface, untouched here and in no packet-46 ledger item. The Learn-Mode practice set was instead
shaped on the WEC14 paper: every Section B tariff (Define 2, Calculate 2, Explain 4, Analyse 6,
Examine 8, Discuss 14, read from `ial-paper-structure.json` by the runner) plus Calculate 4 and three
20-mark Evaluates (Section C offers three). No Draw (not on WEC14).

## Checks run (command → result)

- `node scripts/packet-46-growth-development.mjs --dump --stage` → all packet checks pass; 0 new
  BLOCK / 0 new DEBT; staged 8 tables (`stage.log`).
- `audit/runs/packet-46/draft-readback.mjs` (a different method from `stageBundle`'s read-back):
  `curl ?draft=1` items identical to the bundle by id; each table's `draft` == bundle and `data` ==
  the t=0 snapshot, i.e. live untouched (`draft-readback.log`).
- `npm run validate` exit 0 · `npm test` exit 0 · `npm run recalls` exit 0 ("no section is worse") ·
  `npm run exposure` exit 0 (logs `gate-*.log`).
- `render-diagrams.mjs` → `diagrams-grid.png`, all 16 views looked at by eye at 400 units.

## Not done / not verified

- `npm run build` not run (no app source changed; the dev server on :3001 shares this worktree).
- No Verify A, no Verify B, no Layer 6 adversarial pass, no F116 checklist sign-off.
- Real-world examples (e.g. Maldives, Egypt, Nigeria subsidy, HIPC) are stated without years and
  were checked from memory, not against primary sources.
- Rule 3 (origin/main can read every field) not checked — relevant only at publish.

## Fix round (post founder ruling: near-miss leak, chapter 3)

**Ruling (26 Sep).** Chapter 3's check-in item `growth-development:quiz:a315e66b` is a leak under the check-in
answer rule (`audit/CONTENT-GATE.md`, "Near-miss numbers are leaks"). The diagram above it works "(42 + 4) ÷ 54 ×
100 = 85", and its checklist says "A young population: 85 dependants per hundred of working age". The item used
40/5/55, and its key, 82, was the only option near 85. The item is rewritten and the diagram is unchanged. This round
re-staged the DRAFT only. Live `data` is untouched, and the founder re-publishes. No guard was added or widened for
this class of leak, as the rule requires.

### Edits (working tree only; nothing staged or committed)

| file:line | change |
|---|---|
| `scripts/_packet46-assessment.mjs:108-113` | new comment above the item: the ruling, the route, the named errors, the rank constraint |
| `scripts/_packet46-assessment.mjs:114` | stem, still at `QUIZ[14]` (same `qi` position, block B3) |
| `scripts/_packet46-assessment.mjs:115` | options, authored key-first |
| `scripts/_packet46-assessment.mjs:116` | explanation |
| `scripts/packet-46-growth-development.mjs:194` | removed the stale `Math.round(45 / 55 * 100) === 82` from the quiz-arithmetic line |
| `scripts/packet-46-growth-development.mjs:195-207` | ARITHMETIC: re-derives the key and each named error from the two shares the item's own stem prints, and the working its explanation prints. Arithmetic only, and commented as not a leak check. A/B'd on a copy of its three assertions (`fix-ab-arith.mjs` / `.log`): passes on the real item at index 14, and fires on a wrong key, a non-error option, changed stem figures, a wrong explanation, and a missing item |
| `audit/snapshots/packet-46-bundle__economics__growth-development.json:2639-2640, 2642-2645, 2647` | regenerated by `--dump`; quiz[14] only (`git diff --stat`: 7 lines changed) |

**Old → new**

- Stem: "A country has 40% of its people under 15, 5% over 64 and 55% of working age. Its dependency ratio is
  about:" → "An emerging economy's birth rate has fallen: 20% of its people are under 15 and 5% are over 64. Its
  dependency ratio is approximately:"
- Key: **82 → 33**.
- Options as authored: `['82','45','55','122']` → `['33','31','27','133']`. As dealt by `placeKeys`: `['45','55','122','82']`
  → `['31','27','133','33']`, with `correctIndex` 3 both times.
- The stem no longer gives working age, so the student finds it (100 − 20 − 5 = 75), the step the chapter's own
  recall drills. Key by hand: 25 ÷ 75 × 100 = 33.3 → 33.
- Each distractor is a named error, and the explanation names each one:
  - 31 = 25 ÷ 80 × 100 (working age taken as 100 − 20, the over-64s not subtracted)
  - 27 = 20 ÷ 75 × 100 (the over-64s left out of the dependants)
  - 133 = 100 ÷ 75 × 100 (the whole population over working age)
- The concept is unchanged: 4.3.6 2a-6, the dependency ratio from an age distribution. The falling-birth-rate case is
  taught at `content[2].sections[0].body[2]` ("as birth rates fall, today's children become a large working-age
  population with fewer dependants").

### Route chosen and why: A (plausible options around the key), on new figures whose key also meets route B

**Strict route B is not reachable here, and that was measured.** Route B needs the key AND every option away from
every number the diagram prints. From the emitted bundle, the chapter-3 diagram prints 1.8, 2 ("2a"), 4, 4.3 and 6
("4.3.6"), 10.2, 12, 15, 22, 42, 54, 59, 63, 64, 85 and 100, plus "Almost one dependant for each worker." I searched
every realistic age structure with named-error distractors only (`fix-figure-search.mjs` / `.log`):
- At a margin of 7 on all four options, 1 structure survives, and it needs a 285 option.
- At a margin of 6, 2 survive, and one of those is 41% under 15 with 14% over 64, which no economy has.

**What was chosen** (`fix-figure-compare.mjs` / `.log`, row 0; it gives the key the widest margin in that family):
- **The key meets route B.** 33 is 9 from "42%" and 11 from "22%". It is 26 from the diagram's other ratio (59), 52
  from 85 and 67 from 100.
- **The options meet route A.** 27, 31 and 33 sit within 6 of each other, and 31 and 33 differ only by whether the
  over-64s are subtracted from working age, so only the calculation separates them.
- **Proximity picks a distractor.** The option nearest 85 is 133 (48 away, against the key's 52), and so is the
  option nearest 100.
- No option equals a number on the diagram.
- None of 33, 31, 27, 133 or 75% appears anywhere else in the section (searched every string and every SVG `<text>`).

**Disclosed, for the reader to judge:**
- 27 is 5 from "22%" (the over-64 share in the ageing view).
- The option nearest 59 is the key, by 2 over 31.
- The option nearest "42%" is the key, 9 away, with 31 at 11.
- 31 is 1 from "30%", the under-15 input in chapter 3's recall. That is not the diagram, and not a ratio.

### Id outcome: changed, `a315e66b` → `bb8f266a`

- **Why it changed.** The id is `id('quiz', question)`, a hash of the normalised stem (`scripts/_packet46-util.mjs:55-57`,
  `scripts/_packet46-assessment.mjs:39-41`). No packet runner's `qi` accepts an explicit id (packets 30-47 checked).
  So a new stem is a new id, and the id machinery was not touched.
- **Pins still hold.** They are positional: `quizIndices` is derived from each item's block tag (runner :50-54), and
  chapter 3's is still `[14,15,16,17,18]`.
- `resolvePinnedItem` (`components/learn-mode/utils.js:100`) can resolve `ids`, but this section pins by `indices`
  only.
- **What keys on the id.**
  - "Report a problem": `InlineQuiz.jsx:131`, resolved by `lib/feedback/server.js:232`. A read-only count found 0
    `content_issues` rows naming either id.
  - The option shuffle is seeded on the question text (`components/StudyApp.jsx:464-469`), not on the id.

**No other key moved.** `placeKeys` deals every key slot by stem-hash rank over the whole bank. `fix-rank-search.mjs`
reads the old stems from the git index copy of the dump and tried 70 natural wordings; 5 keep the old rank.
- The chosen stem hashes to `bb8f266a`, between its old neighbours `99aa8b10` ([39]) and `be67cb7d` ([23]). So it keeps
  rank 23 and slot 3.
- `fix-bundle-diff.log`: `correctIndex` is unchanged on all 44 items, and the histogram is 11/11/11/11 before and after.
- Its highest stem Jaccard against the rest of the bank is 0.13 (the near-duplicate bar is 0.5).

### Chapter-3 check-in still shows it (the app's own placement code)

`fix-checkin-shows.mjs` / `.log` runs `lib/learn-steps.js` `buildSteps` and `lib/checkin-placement.js`
`placeChapterItems`. Placement calls `resolvePinnedItem` at `:48`. The component calls the same function at
`LearnModeTab.jsx:282`, reads the maps at `:602-604`, and renders the diagram and then the quiz at `:813-815`.

It ran on three inputs:
- the new dump (the paying bank)
- the served `?draft=1` payload
- the served live payload

Result:
- Step 17/41, chapter 3, shows diagram `07db3dbd` and quiz `bb8f266a`: array [14] for a paying student, slice [2]
  signed out.
- The other six check-ins show the same items as live.
- Live still shows `a315e66b` there.

The log prints every chapter-3 diagram surface and the new question for the reader, and judges nothing.

### Twins (rule 4)

Every string and SVG `<text>` in the bundle was searched for 82, 122, 45 ÷ 55, 40%, 55%, "5% over", 45 and 55.
**Only quiz[14] carried 40/5/55 → 82. No twin was changed.**

These dependency-ratio items exist, and none is the same question:
- chapter 3's recall (`demographic-factors:recall`): 30/10 → 60% working age, 67, "shrink"; distractors 40%, 150, "grow"
- the teaching text and `notes[2]`: Karanda's 42/4/54 → 85, the diagram's own case
- flashcards [17] (the formula) and [18] (the consequence)
- practice [4], an Analyse with no figures
- options that only name the ratio: quiz [17], [22], [23], [35], [43]

No mistake mentions it.

### Commands and exit codes (logs in this folder, prefixed `fix-`)

| command | exit | result |
|---|---|---|
| `node scripts/packet-46-growth-development.mjs` (before the edit) | 0 | `fix-runner-dry-before-edit.log` |
| `node scripts/packet-46-growth-development.mjs` (dry, after) | 0 | 0 BLOCK / 1 DEBT (carried `quant.unit`) / 2 INFO; **new 0 BLOCK / 0 DEBT**; 0 recoverable; pins unchanged; every packet check passes: SCOPE, NUMBERING, ARITHMETIC, PINS, QUIZ, PRACTICE, RECALLS, DIAGRAMS (`fix-runner-dry.log`) |
| `node scripts/packet-46-growth-development.mjs --dump --stage` | 0 | `staged: ["section_quiz"]`, the other 7 tables unchanged, 0 new BLOCK/DEBT; bundle rewritten (`fix-runner-stage.log`) |
| `node audit/scripts/check-staged-drafts.mjs growth-development` | 0 | **matches**, 0 drift. quiz[14] is in the signed-out slice, so this covers it (`fix-check-staged.log`) |
| `npm run validate` | 0 | 0 new BLOCK programme-wide. growth-development: 0 BLOCK / 1 DEBT / 0 new. The 153 new DEBT are in 21 other sections, none of them this one (`fix-validate.log`) |
| `npm run exposure` | 0 | starved 0 signed out, 0 signed in (`fix-exposure.log`) |
| `npm test` | 0 | 342/342 pass (`fix-test.log`) |
| `npm run recalls` (extra, gate 4a) | 0 | no section worse than the baseline (`fix-recalls.log`) |
| `node audit/runs/packet-46/fix-bundle-diff.mjs` | 0 | the only table that differs is `quiz`; 7 leaf paths, all quiz[14]: id, question, options[0-3], explanation |
| `node audit/runs/packet-46/fix-api-diff.mjs` | 0 | see below |
| `node audit/runs/packet-46/fix-db-readback.mjs` | 0 | see below. The first run exited 1 because it compared NULL drafts literally; corrected to draft ?? data, which is what `route.js:78` serves |
| `node audit/runs/packet-46/fix-checkin-shows.mjs` | 0 | see above |
| `node audit/runs/packet-46/fix-rank-search.mjs` | 0 | 5 of 70 wordings keep rank 23 |
| `node audit/runs/packet-46/fix-ab-arith.mjs` | 0 | the new arithmetic block fires on all 5 plants |

These ran in the SHARED worktree between 12:23 and 12:31 (+0300), so validate, exposure, test and recalls read
other sessions' files as they stood. HEAD moved de02474 → 3c0e727 during the round (packet 47 and a main merge at
12:11). None of the commits touched packet 46's files, the placement code, the validator, the write path or the
section route.

### Draft against live, by methods other than the runner

**Served over HTTP** from `http://localhost:3001/api/sections/growth-development`, signed out, with and without
`?draft=1` (`fix-api-*-before/after.json`, `fix-api-diff.log`):
- Before the fix, draft and live were byte-identical.
- Live before vs live after: 0 differing paths.
- After: **7 differing leaf paths, all on the slice's quiz[2]**, which is bank [14]: `id`, `question`, `options[0]`
  to `options[3]`, `explanation`. `correctIndex` and everything else are equal.

**DB columns, read only** (`fix-db-readback.log`):
- Only `section_quiz` holds a draft. It equals the new dump, and it differs from `data` at item [14] only (44 vs 44).
- The other 7 tables' drafts are NULL, so `?draft=1` serves `data`, which equals the new dump.
- `data` equals the pre-fix dump (the git index copy) on all 8 tables.

### For the committer

The git index holds the PRE-fix versions of `scripts/_packet46-assessment.mjs`,
`scripts/packet-46-growth-development.mjs`, the bundle dump and this `built.md` (status `AM`). A commit built from the
index would ship the old item, the stale arithmetic and no record of this round. Take these four files from the
worktree. The `fix-*` files in this folder are untracked.

### Not done here

- The rule's Verify A and Verify B: a reader judging the chapter-3 check-in `leaks` / `clean`, including on screen at
  390px with the checklist opened. That is for a reader other than the fixer; this round judges nothing about the leak.
- Other check-ins not re-read under the near-miss reading. `checkin-answer-rule.md` judged all seven clean under the
  old reading.
- `npm run build`, and any rendering of the new item. No publish, no ledger, PROGRESS, NEXT or DECISIONS change, no commit.
- CONTENT-GATE asks for packet 44's $800bn/$750bn check-in to be re-checked under this reading. That is another
  packet's section, and it was not touched.

## Fix round 2 (post founder ruling: near-miss leak, chapter 2)

**Why.** The round-2 reader (`checkin-answer-rule-r2.md`, the chapter-2 row and its section) re-checked all seven
check-ins on the round-1 draft under the sharpened rule.
- Chapter 3's new item `bb8f266a` is clean.
- Chapter 2's item `growth-development:quiz:3f651164` (key 10%, "Export earnings fall by:") LEAKS, and it has been live
  all along. The chapter-2 diagram prints "12" eight times, including view 3's "Export earnings" / "$12bn", which is
  the question's own subject. 10% was the only option within 7 of 12, and no other option sat near the key.

This round rewrote that item only, at the same array position. The diagram is unchanged, and chapter 3's item is
byte-identical to round 1. Everything went to DRAFT only; live `data` is untouched. No guard was added or widened.
Left alone as instructed: the chapter 4 and 5 takeaways the reader flagged, and any rewording of chapter 3.

### Edits (working tree only; nothing staged or committed)

| file:line | change |
|---|---|
| `scripts/_packet46-assessment.mjs:88-92` | new comment above the item: the ruling, the key's margins, which option each diagram number draws, the rank constraint |
| `scripts/_packet46-assessment.mjs:93` | stem, still at `QUIZ[8]` (same `qi` position, block B2) |
| `scripts/_packet46-assessment.mjs:94` | options, authored key-first |
| `scripts/_packet46-assessment.mjs:95` | explanation |
| `scripts/packet-46-growth-development.mjs:194` | removed the stale `0.5 * 20 === 10` from the quiz-arithmetic line |
| `scripts/packet-46-growth-development.mjs:195-206` | ARITHMETIC: re-derives the key and each named error from the share and fall its own stem prints, and the working its explanation prints. Commented as not a leak check. A/B'd on a copy of its assertions (`fix2-ab-arith.mjs` / `.log`): passes on the real item at index 8, and fires on a wrong key, a non-error option, a changed stem figure, a wrong explanation, and a missing item |
| `audit/snapshots/packet-46-bundle__economics__growth-development.json:2567-2568, 2570-2573, 2575` | regenerated by `--dump`; quiz[8] only in this round (chapter 3's lines 2639-2647 are unchanged since round 1) |

**Round 1's references have moved.** Because lines were inserted above them, chapter 3's item is now at
`scripts/_packet46-assessment.mjs:113-121` and its arithmetic block at `scripts/packet-46-growth-development.mjs:207-219`.
Their content is unchanged.

**Old → new**

- Stem: "Copper is 50% of a country's export earnings and its world price falls by 20%. Export earnings fall by:"
  → "A country earns 80% of its export revenue from copper, and the world copper price falls by 65%. Its export
  earnings fall by:"
- Key: **10% → 52%**. By hand: 0.8 × 65% = 52%. The "fall to" figure is 100 − 52 = 48%.
- Options as authored: `['10%','20%','50%','70%']` → `['52%','65%','48%','80%']`. As dealt by `placeKeys`:
  `['20%','10%','50%','70%']` → `['65%','52%','48%','80%']`, with `correctIndex` 1 both times.
- Each distractor is a named error, and the explanation names each one:
  - 65%: the price fall alone, as if copper were all the country exports (the old item's own named error).
  - 48%: what earnings fall to, not by.
  - 80%: the share alone (the old item carried 50%, the same error type).
- The content is unchanged: 4.3.6 2a-1, commodity price volatility sized as the good's share of exports times its
  price fall. The chapter teaches it at `content[1].sections[0].body[1]` (Karanda, 60% × 25% = 15%) and in its flow
  "By the share times the fall". The realistic case is a single-commodity exporter in a price crash; the chapter's own
  real example names Zambia's copper and Nigeria's oil.

### Route chosen and why: B for the key, and every diagram number draws a distractor

**What the diagram shows.** From the emitted bundle, all views, title, description, checklist and labels, the
chapter-2 diagram prints 2 (×3, "2a" and "$2bn"), 3, 4, 4.3 ("4.3.6"), 6, 7.2, 12 (×8), 14, 24, 75, 90, 100 and 120,
plus "a quarter less" (25) and "one economy".

**What was chosen.**
- **The key is not near anything the diagram shows.** 52 is 23 from 75 and 27 from 25 ("a quarter less"). No diagram
  number lies between 25 and 75, so this band is where the key belongs.
- **The key sits inside the options** (48 < 52 < 65 < 80). So:
  - the option nearest every diagram number from 2 to 25 is 48, including the reader's meaning path "Export earnings"
    / "$12bn" (48 is 36 from 12);
  - the option nearest 75, 90, 100 and 120 is 80.
  - The key is the nearest option to NO number on the diagram. It is also not the nearest to the chapter-2 recall's
    "drops by a third" (48 is 15 from 33; 52 is 19).
- None of 52 or 48 appears anywhere else in the section. 65 appears only as a divisor in chapter 1's HDI working
  (quiz[3], practice[1]). 80 appears only in chapter 6's buffer stock ("80k tonnes") and in chapter 3's explanation.
  None of these is on the chapter-2 check-in's diagram.

**Strict route B, for all four options, was searched and is not reachable** (`fix2-figure-search.mjs` / `.log`).
The search covered every share × fall structure with named-error distractors only, an interior key, and stem figures
off the diagram. At a margin of 6 on all four options, none survives. At a margin of 5, five survive, and this item
is one of them.

**Residual near-numbers, disclosed for the reader:**
- **80% is 5 from "75"** (the terms-of-trade index in view 1 and the checklist).
- **65% is 10 from "75".**
- 48% and 52% are 4 apart, and only "by" against "to" separates them.
- Both 80% and 65% are distractors, so a guess anchored on 75 lands on a wrong option.

### Id outcome: changed, `3f651164` → `37b5e13a`

- **Why it changed.** The id is a hash of the stem (`scripts/_packet46-util.mjs:55-57`), and there is no explicit-id
  support; the id machinery was not touched.
- **Pins still hold.** They are positional, and chapter 2's are still `[8,9,10,11,12,13]`.
- A read-only count found 0 `content_issues` rows naming either id.

**No other key moved.** `fix2-rank-search.mjs` / `.log` uses the round-1 dump (`fix2-bundle-round1.json`, whose ranks
equal live's) as its reference, and tried 80 wordings; 9 keep rank 9 (slot 1).
- The chosen stem hashes to `37b5e13a`, between its neighbours `35bb565f` ([32]) and `40f339d0` ([27]).
- Its highest stem Jaccard against the bank is 0.20.
- `fix2-bundle-diff.log`: `correctIndex` is unchanged on all 44 items, and the histogram is still 11/11/11/11.

### Chapter-2 check-in still shows it (the app's own placement code)

`fix2-checkin-shows.mjs` / `.log` runs `buildSteps` and `placeChapterItems` (`lib/checkin-placement.js:48` →
`resolvePinnedItem`, as `LearnModeTab.jsx:282` uses it) on three inputs:
- the new dump (the paying bank)
- the served `?draft=1` payload
- the served live payload

Result:
- Step 11/41, chapter 2, shows diagram `f219e3f8` and quiz `37b5e13a`: array [8] for a paying student, slice [1]
  signed out.
- Chapter 3 still shows `bb8f266a`, and chapters 1 and 4-7 show the same items as live.
- Live still shows `3f651164` and `a315e66b`.

The log prints every chapter-2 diagram surface and the new question for the reader, and judges nothing.

### Twins (rule 4)

`fix2-twins.log` searched every string and SVG `<text>` in the new bundle for 0.5 × 20, 50% × 20%, "50% of", "falls
by 20%", 10%, 20%, 50% and 70%. **The old figures lived only in quiz[8]. No twin was changed.** The 10% and 20% hits
are unrelated:
- chapter 3's dependency recall
- chapter 7's aid recall
- the Harrod-Domar quiz[11], practice[3] and mistakes[3]
- chapter 3's new stem

The share × fall method also appears with Karanda's own figures (60% × 25% = 15%) in `content[1].sections[0].body[1]`,
`notes[1]`, flashcard [9] and extras chain [0]. That is the chapter's worked example, not the same question, so it is
left alone. The chapter-2 reorder recall's "drops by a third" is a price fall with no share arithmetic.

### Commands and exit codes (logs prefixed `fix2-`)

| command | exit | result |
|---|---|---|
| `node scripts/packet-46-growth-development.mjs` (dry) | 0 | 0 BLOCK / 1 DEBT (carried `quant.unit`) / 2 INFO; **new 0 BLOCK / 0 DEBT**; 0 recoverable; pins unchanged; every packet check passes, QUIZ, ARITHMETIC and PINS included (`fix2-runner-dry.log`) |
| `node scripts/packet-46-growth-development.mjs --dump --stage` | 0 | `staged: ["section_quiz"]`, the other 7 tables unchanged, 0 new BLOCK/DEBT (`fix2-runner-stage.log`) |
| `node audit/scripts/check-staged-drafts.mjs growth-development` | 0 | **matches**, 0 drift. quiz[8] and quiz[14] are both in the signed-out slice (`fix2-check-staged.log`) |
| `npm run validate` | 0 | 0 new BLOCK programme-wide. growth-development: 0 BLOCK / 1 DEBT / 0 new. The 143 new DEBT are in 22 other sections (`fix2-validate.log`) |
| `npm run exposure` | 0 | starved 0 signed out, 0 signed in (`fix2-exposure.log`) |
| `npm test` | 0 | 356/356 pass. The suite grew since round 1 through other sessions' commits (`fix2-test.log`) |
| `npm run recalls` | 0 | no section worse than the baseline (`fix2-recalls.log`) |
| `node audit/runs/packet-46/fix2-bundle-diff.mjs round1` | 0 | only `quiz` differs; 7 leaf paths, all quiz[8] |
| `node audit/runs/packet-46/fix2-bundle-diff.mjs index` | 0 | against the pre-fix dump: 14 leaf paths, quiz[8] and quiz[14] only |
| `node audit/runs/packet-46/fix2-api-diff.mjs` | 0 | see below |
| `node audit/runs/packet-46/fix-db-readback.mjs` | 0 | `fix2-db-readback.log`; see below |
| `node audit/runs/packet-46/fix2-checkin-shows.mjs` | 0 | see above |
| `node audit/runs/packet-46/fix2-rank-search.mjs audit/runs/packet-46/fix2-bundle-round1.json` | 0 | 9 of 80 wordings keep rank 9 |
| `node audit/runs/packet-46/fix2-figure-search.mjs 5` / `6` | 0 | 5 / 0 candidates |
| `node audit/runs/packet-46/fix2-ab-arith.mjs` | 0 | fires on all 5 plants |

These ran in the SHARED worktree between 12:59 and 13:04 (+0300). During this round HEAD moved 3c0e727 → 8a06aa3
(packet 45 and 47 commits, and a main merge of PR #40). Of the files this work depends on, those commits changed only
`lib/content-validator.mjs`, whose worktree copy was last written at 12:52, before every run here. The served draft
and live were byte-identical to round 1's saved payloads when this round began.

### Draft against live and against round 1, by methods other than the runner

**Served over HTTP** from `:3001`, signed out (`fix2-api-*-after.json`, `fix2-api-diff.log`):
- Live now against live before round 1: 0 differing paths.
- **Round-1 draft against draft now: 7 leaf paths, all on the slice's quiz[1]** (bank [8]): `id`, `question`,
  `options[0]` to `options[3]`, `explanation`.
- **Live against draft now: 14 leaf paths, on the slice's quiz[1] (chapter 2) and quiz[2] (chapter 3) only**, the same
  seven fields each. `correctIndex` and everything else are equal.

**DB columns, read only** (`fix2-db-readback.log`):
- Only `section_quiz` holds a draft. It equals the new dump and differs from live `data` at items [8] and [14] only.
- The other 7 tables' drafts are NULL, so `?draft=1` serves `data`, which equals the new dump.
- `data` equals the pre-fix dump on all 8 tables.

### For the committer (still applies)

The git index holds the PRE-fix versions of `scripts/_packet46-assessment.mjs`,
`scripts/packet-46-growth-development.mjs`, the bundle dump and this `built.md`. Take all four from the worktree. The
`fix-*` and `fix2-*` files are untracked. `fix2-bundle-round1.json` is a 225 KB copy of the round-1 dump, kept as
this round's reference.

### Not done here

- The rule's Verify A and Verify B on the new chapter-2 item, including on screen at 390px with the checklist opened.
  That is for a reader other than the fixer; this round judges nothing about the leak.
- Chapter 4's and chapter 5's takeaways (flagged by the r2 reader) were not touched, as instructed.
- `npm run build`, and any rendering of the new item. No publish, no ledger, PROGRESS, NEXT or DECISIONS change, no commit.
