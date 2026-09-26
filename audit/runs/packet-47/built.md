# Packet 47 — built (global-markets-expansion, IAL Business 4.3.2, WBS14)

Build phase, 26 September 2026. **Staged to `draft`, not published, not committed.** Every "passes"
below names the command that produced it. Nothing here was checked on a phone or in the Learn Mode
page: Verify A and Verify B have not run.

## What was built

`global-markets-expansion` rebuilt to **4.3.2 only** (`audit/raw/bus_spec.txt:1372-1410`: heading at
`:1372`, 4.3.3 at `:1424`). The oracle has 37 rows and 33 leaves (`spec-items.json`, topic 4.3.2); the
runner asserts that count. 33 of 33 leaves are evidenced (`spec.coverage` INFO in the stage result,
`stage.log`).

| | live (`data`, unchanged) | staged (`draft`) |
|---|---|---|
| blocks / subsections | 2 / 4 (entry modes, Ansoff, PESTLE + Bartlett-Ghoshal) | 5 / 17, the five sub-topics in the specification's order |
| recalls | 0 | 17, one per subsection: 5 classify, 5 fill-in, 4 match, 3 reorder |
| quiz / practice | 10 / 5 (Outline 4, Define 4, Analyse 6, Assess 10, Evaluate 20) | 30 (3 unpinned pre-test) / 7 on one source: Explain 4 · Calculate 4 · Discuss 8 · Assess 12 · Assess 12 · Evaluate 20 · Evaluate 20 |
| diagrams | 0 | 5 (7 views), one per block, pinned by `diagramId` |
| flashcards / mistakes / extras | 19 / 5 / 4 chains + 3 evaluation | 29 / 7 / 4 chains + 3 evaluation |
| validator, this section | 9 BLOCK / 38 DEBT | 0 BLOCK / 1 DEBT (`quant.unit`, already baselined: no WBS14 drill template exists) / 0 recoverable recalls |

Chapters: 1 Conditions That Prompt Trade (1a-1d) · 2 Assessing a Country as a Market (2a-2b) ·
3 Assessing a Country as a Production Location (3a) · 4 Global Mergers, Takeovers and Joint Ventures
(4a-4j) · 5 Global Expansion and Uncertainty (5a-5b).

## Scope calls, each settled on the document (Rule 1)

1. **Numbering.** 21 of 33 ids cite "4.2.1"-"4.2.5". `grep "4\.2\.[0-9]" bus_spec.txt` finds nothing;
   `:1304` is "4.2 Assessment information". Every id was mapped by its wording (`LEAF_MAP`,
   `_packet47-content.mjs:551`). **`structure-06` is marked wont-fix**: it says 4.3.2 is wrong, and the
   document says 4.3.2 is correct. The runner asserts the headings by line and `contextFor` = 4.3.2 / WBS14.
2. **Entry modes, Ansoff, PESTLE, Bartlett-Ghoshal.** None of these is a 4.3.2 bullet. Bartlett,
   Ghoshal, transnational and "licens" all have 0 hits in `bus_spec.txt`. Franchising has one hit, at
   2.3.1 (`:872`). Ansoff and Porter's Strategic Matrix are at 3.3.1 · 2a (`:1098-1099`), PESTLE at
   3.3.1 · 4a (`:1106`), and Ansoff's global use at 4.3.3 · 1d (`:1435`). So the brief's §4 candidate 3
   is settled this way: the one Ansoff pointer names **both** 3.3.1 and 4.3.3. A row was added to
   `audit/SPEC-OWNERSHIP.md` (after the packet-45 row).
3. **`specGap-08` "cost competitiveness and differentiation"** (brief §4 candidate 1). Porter's generic
   strategies (3.3.1) are banned. The item's substance is built from 4.3.2's own words instead: "cost
   competitiveness" (1c) and "international competitiveness" (5b), taught as price and non-price
   competitiveness ("differentiating the product through quality, design, reliability and service").
   **Claimed, not wont-fixed. If the verifier reads the item as asking for the matrix, it should be
   rejected, and that rejection is correct.**
4. **`specGap-06` vs `spec-coverage.json`** (brief §4 candidate 2). This is moot. All ten reasons
   (4a-4j) are taught by name, so the item's five are covered whichever audit is right.
5. **Tariffs.** `topFix-04` asks for an "8-mark Assess" and `practice-01` lists "8, 10, 12 Assess".
   Appendix 6 (`bus_spec.txt:2220-2250`, parsed by the runner) gives Discuss 8, and Assess 10 for
   Units 1/2 or 12 for Units 3/4. The set follows the Settled 26 Sep DECISIONS entry and
   `ial-paper-structure.json` business.units_3_4: one source set of 4/4/8/12/12 plus two Evaluate 20s.
6. **The live section is not the brief's snapshot.** The brief read `audit/content-sections/` (the
   t=0 file) as "live". The live row read on 26 Sep (`2026-09-26-pre-packet-47__…json`) already carries
   packet 2.9's pins: block 1 `quizIndices [4]`, block 2 `[]`. So `structure-02`'s "neither block sets
   quizIndices" was partly out of date before this packet.
7. **The mistake fields follow the component.** `components/MistakesTab.jsx` reads
   `title/mistake/correction/examTip` on this branch and on `origin/main` (`94bfda1`). This packet
   writes those fields, and the runner reads the component to check that.

## Files (all new unless stated)

- `scripts/_packet47-util.mjs` — ids, formatters, the firm (`FIRM`), the spec's three lists,
  `BANNED_ELSEWHERE` :213, `POINTER_ONLY` :225.
- `scripts/_packet47-content.mjs` — 17 subsections (:45-:455), `BLOCK_PLAN` :482, `LEAF_MAP` :551,
  `NOTES` :598.
- `scripts/_packet47-assessment.mjs` — `QUIZ` :55, `EXTRACT` :169, `PRACTICE` :171, `FLASHCARDS` :209,
  `MISTAKES` :245, `EXTRAS` :282.
- `scripts/_packet47-diagrams.mjs` — 5 diagrams (:103, :163, :199, :235, :277), `DIAGRAMS` :292.
- `scripts/packet-47-global-markets-expansion.mjs` — the runner (dry run / `--dump` / `--stage`).
- `audit/SPEC-OWNERSHIP.md` (modified) — one row added.
- `audit/snapshots/2026-09-26-pre-packet-47__business__global-markets-expansion.json` — the t=0
  snapshot of all 8 tables, taken before the write (`snapshot.mjs`).
- `audit/snapshots/packet-47-bundle__business__global-markets-expansion.json` — the staged bundle.
- `audit/runs/packet-47/` — `snapshot.mjs`, `draft-readback.mjs`, `ab-mutation.sh` and the logs below.

## Per ledger id (32 claimed, 1 wont-fix)

Paths without a directory are `scripts/_packet47-content.mjs` (C), `_packet47-assessment.mjs` (A),
`_packet47-diagrams.mjs` (D) and the runner (R).

| id | what changed | where |
|---|---|---|
| topFix-01 | content[] rewritten to the five sub-topics (the item asked for three blocks, and the spec has five); flashcard and mistake SUBJECTS reused, their real-firm claims dropped | C:45-:455, C:482 |
| topFix-02 | Bartlett-Ghoshal removed and banned; Ansoff = one notes link citing 3.3.1 and 4.3.3; PESTLE = one sentence citing 3.3.1; no subsection or examMatters left on either | C:179, C:633; util :213, :225; R §2 |
| topFix-03 | `quizIndices`/`practiceIndices` derived from each item's block tag; every quizzed term checked as taught | R:54-:62, R §6 |
| topFix-04 | Discuss 8 in place of Analyse 6; "Explain one…"; every stem names Lumora on Source A; generic strategies banned; levels naming K/App/An/Ev above 6 marks, points at 4, plus "A strong answer, in outline" on the 12s and 20s | A:171-:203; R §7 |
| topFix-05 | fill-ins: push vs pull (C:67 recall), off-shoring vs outsourcing (C:92 recall); reorders on real 4.3.2 sequences (PLC extension, ROI working, appreciation chain), each sourced from an extras chain. The entry-mode ladder example is refused as off-spec and a guard stops it coming back. Diagram: the country-assessment comparison (income view) beside five forces | C:117, :266, :395; A:282; D:141, :121 |
| accuracy-01 | Bartlett-Ghoshal subsection gone; the runner bans the four words and re-measures that the spec has 0 hits for them | R §2 |
| quiz-01 | push factors taught (C:45); push item kept in the pre-test pool; runner asserts chapter 1 teaches "push factor"/"saturated market" | A:57; R §6 |
| quiz-02 | off-shoring vs outsourcing taught (C:92) | A:63, A:77; R §6 |
| practice-01 | the 6-mark Analyse is gone; the set is Section A's 4/4/8/12/12; every task names the firm and sits on its source | A:171-:203; R §7 |
| practice-02 | 20-markers anchored to Lumora's two sites and its competitiveness; no Porter's generic strategies; levels scheme with K/App/An/Ev | A:194, :199 |
| structure-01 | assessment and content now cover the same bullets; no quizzed term is untaught (R §6) | R §6 |
| structure-02 | every block pins its own quiz and practice items (see finding 6 on the live pins) | R §4 |
| structure-03 | 17 recalls, all four types | C (one `recall` per `sub`) |
| structure-04 | 3-4 subsections per block; the runner refuses a block of fewer than 3 | C:482; R §4 |
| structure-05 | 5 diagrams on the spec's own bullets (not entry modes or Ansoff, which are off-spec) | D:103-:292 |
| structure-07 | notes rebuilt, one per chapter, on the spec bullets, titled as the chapters | C:598 |
| structure-08 | one subject misconception per subsection; notes carry none; runner refuses exam-technique wording and repeats | R §9 |
| structure-09 | the descriptive entry-mode/Ansoff flows are gone; the 2 flows left are causal chains `{title, subtitle}` (appreciation, skill shortage) | C:395, :455 |
| specGap-01, -10 | push (saturated market, competition) and pull factors | C:45, :67 |
| specGap-02 | off-shoring vs outsourcing, location vs ownership, a net saving | C:92 |
| specGap-03 | PLC extension | C:117 |
| specGap-04 | the five market factors | C:150, :172 |
| specGap-05 | the nine production-location factors | C:220, :244, :266 |
| specGap-06 | all ten reasons, 4a-4j | C:322, :346, :368 |
| specGap-07 | exchange-rate impact on exporters, importers and repatriated profit | C:395, :430 |
| specGap-08 | price and non-price (differentiation) competitiveness at 5b (see scope call 3) | C:455 |
| specGap-09 | skill shortages → costs, delays, quality → international competitiveness | C:455 |
| specGap-11 | government or legal requirement (49% ownership cap) | C:368 |
| specThin-01 | increased sales and profitability, with profit $4.8m → $9.2m | C:67 |
| specThin-02 | merger, takeover and joint venture defined and distinguished | C:299; D:235 |
| specThin-03 | supply chains and distribution networks defined | C:346 |
| structure-06 | **wont-fix**: the claim is inverted (scope call 1) | ledger note |

## What was run, and what it showed

- Runner, dry run and `--stage`: exit 0. Before: 9 BLOCK / 38 DEBT. After: 0 BLOCK / 1 DEBT (baselined),
  0 new, 36 baselined findings clear on publish (`runner.log`, `stage.log`).
- `ab-mutation.sh`: seven of the runner's new guards were each planted, and each fired (Bartlett,
  Assess 10, a key figure on a diagram, the specification as the speaker, a missing `correction`, the
  entry-mode ladder, "Explain one"). With the modules restored, the runner is clean again (`ab-mutation.log`).
- Packet 44's leak probe, which shares no code with this runner: 0 HARD on the dump
  (`leak-probe-bundle.log`). Its first run caught a joint-venture item whose key was printed on the
  chapter-4 diagram. That item was replaced, and the runner now checks every pinned key, not only the
  first.
- Draft vs bundle, two methods. First, `check-staged-drafts.mjs` through `?draft=1`, which covers the
  signed-out slice only: it matches (`check-staged-drafts.log`). Second, `draft-readback.mjs` reads all
  8 tables' `draft` and `data` columns directly: `draft` equals the bundle for every table, and `data`
  equals the t=0 snapshot (`draft-readback.log`). One exception on `data`: `section_diagrams` had no row
  at t=0. Staging created the row, with `data = []`. That serves the same empty list as no row.
- `curl` without `draft=1` still serves the two old blocks; with `draft=1` it serves the five new ones.
- `npm test` 331/331, `npm run validate` exit 0, `npm run exposure` exit 0 (this section is no longer
  in the draft's "DECIDED, no question" list), `npm run recalls` exit 0. All four ran in the SHARED
  worktree, which holds other sessions' changes (`gate-*.log`).
- Diagrams rendered by headless Chrome on a dark background and looked at, at 400 units wide only:
  not the light-theme remap, not at 390 px in the app.
- **Not run:** `npm run build`. A `next build` here would rewrite `.next` under the dev server on :3001,
  and this packet touches no file under `app/` or `components/` (packet 44's precedent). Also not run:
  Verify A, Verify B at 390×844, and a check of the PracticeQuestionsTab shared-source rendering on
  `origin/main`.

## Publish (rule 6 — for the founder, not run)

Before publishing, run Rule 3 against `origin/main`. Fields this bundle carries that the components
must read: `mistakes[].mistake/correction/examTip` (main reads them), `diagramId` pins, and recall
types `classify`, `fillin`, `match` and `reorder`. Then:

```
node scripts/packet-47-global-markets-expansion.mjs --stage && node scripts/publish-section.mjs global-markets-expansion --confirm
```

## Fix round 1 (26 September 2026): two verifier rejections

Both rejections were correct. Nothing was published and nothing was committed. `data` was not written:
the `--stage` below writes `draft` only.

| id | defect the verifier found | fix | where |
|---|---|---|---|
| structure-03 | The `stability-resources-and-return-on-investment` reorder had two defensible orders. "Estimate the yearly profit" and "take the grant off the cost" do not depend on each other, and `lib/recall-widgets.js` cannot accept a second order. | **Replaced, not reworded** (CONTENT-GATE Layer 1a rule 2): it is now a `classify` with 3 groups of 2. The groups are ease of doing business, political stability and natural resources, and each group has a `why`. The items were chosen so that no item fits two groups. For example, "seize foreign-owned factories" was dropped because body[0] pairs property security with both factors. Recall mix is now 6 classify, 5 fillin, 4 match, 2 reorder, so all four types are still present. The 2 reorders left (PLC extension, appreciation) are the ones the verifier accepted under topFix-05. | C:278-286 |
| specGap-02 | off-shoring body[2] said the saving was "about a seventh of the $34 average cost". 5.50/34 = 16.2%, and a seventh is 14.3%. | Changed to "about a sixth" (16.7%). The runner's own check had let the error through. It was `near(ratio, 1/7, 0.02)`, and the actual gap is 0.019. The check now **reads the fraction word from the printed body**, requires the $ base to equal `avgTotal`, requires the word to be the nearest unit fraction (`round(34/5.5) = 6`), and allows a tolerance of 0.01. | C:98; R:161-172 |

**Rule 4 re-read.** For off-shoring I re-read keyIdea, body[0-3], realExample, misconception, examMatters,
the fill-in recall, the chapter-1 notes twin (C:598-617), quiz B1 "saves $3" (9−4−2), flashcards A:216-217,
the mistake at A:250 and diagram D:89-110. None of them states the fraction. For stability/ROI I re-read
every field and the chapter-3 notes twin (C:639-653; 3/20 = 15% and 3/15 = 20%), plus quiz A:111 (1.8/12 = 15%)
and A:114 (2.4/15 = 16% and 2.4/12 = 20%). Those numbers are correct. I grepped every packet-47 module for the
other fraction words. "a quarter" (C:249, 5/20) is asserted by the runner. "a tenth" and "a third" occur only
in real examples that have no computed base. **Not changed:** the extras chain "Working out the likely return"
(A:305) still lists "estimate profit" before "take off the grant". That chain is a displayed worked example and
is not graded. It no longer sources any reorder.

**How it was checked, and what each check covers:**
- A/B on the new fraction guard (`fix1-ab-fraction.log`). With "seventh" planted, the guard fires ("16.2%,
  nearest unit fraction 1/6"). With "fifth" planted, it fires. With "sixth" (the control), it is silent. The
  module was restored byte for byte (`cmp`).
- Runner dry run: exit 0, 0 BLOCK / 1 DEBT (baselined `quant.unit`), 0 recoverable (`fix1-runner.log`).
  `--dump --stage`: exit 0 (`fix1-stage.log`). The bundle was rewritten.
- A second method that does not use the runner (`fix1-served-check.log`). I ran `curl ?draft=1` against
  :3001 and parsed the response with Python, walking the JSON for recall shapes rather than looking them up
  by module id. Results: 0 "seventh"; "about a sixth of the $34" once; 5.5/34 = 16.2% recomputed; the recall
  at content[2].sections[2] is a `classify` with the six items above; there are 2 reorders; the old
  grant-first item is absent. The same curl without `draft=1` still serves the old live section. This is a
  check of the served JSON only. It is not a render in Learn Mode and it is not a check at any viewport width.
- Gates, run in the SHARED worktree: `npm run recalls` 0, `npm run validate` 0, `npm run exposure` 0,
  `npm test` 334/334 (`fix1-gate-*.log`). `npm run build` was not run (same reason as the build round).
