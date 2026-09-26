# Packet 50: built (managing-change, IAL Business 3.3.6, WBS13)

Build phase, 26 September 2026. **Staged to `draft`. Not published and not committed.** Each "passes"
below names the command that produced it. Nobody has checked this on a phone or in the Learn Mode page:
Verify A and Verify B have not run.

## How this build started (read first)

An earlier author agent in this same workflow run (`acd9a9f9…`) ran from 11:41 to 11:53. The user
interrupted it at 11:53:56. Before that it had written `scripts/_packet50-util.mjs` and
`scripts/_packet50-content.mjs`. At 11:53:51, three lines of the content file were edited on disk by
someone other than that agent:
- a distractor was removed;
- "The specification names three kinds of key risk" was reworded;
- `F.slowMonths - 6` became `F.actuaryRetiresMonths`.

This agent did not see the util file before its first write and **overwrote it**. It then restored the
file **byte for byte** from the earlier agent's transcript (`cmp` identical) and added the one constant
the 11:53:51 edit needs (`actuaryRetiresMonths = 18`, `_packet50-util.mjs:122`). The content module
is the earlier agent's work with that edit kept. Two changes were made to it, and both are listed
below. The assessment, diagrams and runner modules are new in this phase.

## What was built

`managing-change` was rebuilt to **3.3.6 only** (`bus_spec.txt:1255-1271`). The oracle has 12 rows,
of which 10 are leaves, and the runner asserts that count. **10 of 10 leaves are evidenced**
(`spec.coverage` INFO, `stage.log`).

| | live (`data`, unchanged) | staged (`draft`) |
|---|---|---|
| blocks / subsections | 2 / 4 | 5 / 15, each block with 3 subsections |
| recalls | 0 | 15: 5 classify, 4 match, 3 fill-in, 3 reorder |
| quiz / practice | 10 / 5 (Define 4, Analyse 6, Assess 10, Evaluate 20, Outline 4) | 28 (3 unpinned pre-test, keys 7/7/7/7) / 7 on one source: Explain 4, Calculate 4, Discuss 8, Assess 12, Assess 12, Evaluate 20, Evaluate 20 |
| diagrams | 0 | 5 (7 views), one per block, pinned by `diagramId` |
| flashcards / mistakes / extras | 16 / 5 / chains + evaluation | 25 / 6 / 3 chains + 3 evaluation |
| validator, this section | 13 BLOCK / 23 DEBT | 0 BLOCK / 0 DEBT / 3 INFO; 0 recoverable; would clear all 30 baselined keys on publish |

The five chapters:
1. Why Change Happens and How Fast (unit description `:1055`, and 1c)
2. Culture, Size and Leadership (1a, 1b, 1e)
3. Managing Resistance to Change (1d)
4. Contingency Planning: Identifying Key Risks (2a)
5. Contingency Planning: Mitigating Risk (2b)

## Scope calls, each settled on the document (Rule 1)

1. **Numbering.** Every specGap id cites "3.6.x". Running `grep "3\.6\.[0-9]" bus_spec.txt` returns
   nothing, and the heading at `:1255` reads "3.3.6 Manging change" (the spec's own spelling). The
   runner asserts the headings by line and asserts that "3.6.1"-"3.6.3" are absent (runner §5).
   `contextFor` returns 3.3.6 / WBS13, and the runner asserts that too (§12). **`structure-11` is
   wont-fix**, because the claim is inverted.
2. **Named models: 0 hits in `bus_spec.txt`.** Kotter, Schlesinger, Lewin, "force field", "scenario",
   "disrupt", "transformational" and "transactional" all return nothing, and the runner re-measures
   each one (§2). The approaches to resistance are taught by what they do, and no author is named.
   The forces for and against the change are drawn without naming the model. Kotter's eight steps
   and Lewin's forces are refused as recall content. This affects clauses of `topFix-04`,
   `structure-02` and `topFix-02` (see the table). **If the verifier reads those clauses as requiring
   the named models, rejecting them is the correct call on the item's wording, and the fix would be a
   founder scope decision, not a build fix.**
3. **"Causes and effects of change" (`specGap-01`, `specGap-02`)** is not a 3.3.6 lettered point. The
   Unit 3 description, however, says "The unit also covers the causes and effects of change and how
   businesses mitigate risk and uncertainty" (`bus_spec.txt:1055-1056`). The runner asserts this
   (§2). The brief's §1 said the phrase is absent; it searched for "causes of change", and the spec
   has "causes and effects of change". So chapter 1 teaches both as the frame for the leaves, and does
   not present them as lettered requirements.
4. **"Costs and benefits of contingency planning" (`specGap-06`, `topFix-01`)** is not a lettered
   point either, and the runner asserts that `:1255-1271` never mentions cost. It is taught as the
   **evaluation of 2b's plans** (`judging-a-contingency-plan`), not as a separate leaf.
5. **Pointers, not teaching:**
   - company culture types are 3.3.4 · 1b (`:1189`), with "difficulties in changing an established
     culture" at `:1195`;
   - leadership styles are 1.3.4 · 5b (`:748`);
   - continuous improvement is 2.3.4 · 3c (`:1001`);
   - scenario planning gets exactly one sentence, which says contingency planning is narrower
     (`topFix-01`).

   Each pointer has a budget of one mention, carries its citation, and is re-measured by runner §2.
6. **Tariffs.** `topFix-05` asks for an "8-mark Assess", which does not exist: Appendix 6
   (`:2218-2250`, parsed by runner §7) gives Discuss 8 and Assess 12 at Units 3/4. The set follows the
   26 Sep Settled entry and `ial-paper-structure.json` business.units_3_4: 4/4/8/12/12 plus two
   Evaluate 20s.
7. **One name per idea.** The two types are "incremental change" and "step change". Disruption is an
   external trigger ("disruptive technology", `_packet50-content.mjs:56`). `topFix-03`'s parenthetical
   "(transformational)" is deliberately not used, because it would collide with the leaf's own
   "Transformative leadership" (`:1264`). The runner bans "transformational" on every surface.

## Files

New files unless marked otherwise:
- `scripts/_packet50-util.mjs`: `FIRM` :92, `BANNED_ELSEWHERE` :168, `POINTER_ONLY` :180. Restored
  from the earlier agent, with +2 lines.
- `scripts/_packet50-content.mjs`: 15 subsections (:50-:462), `BLOCK_PLAN` :464, `LEAF_MAP` :533,
  `NOTES` :556. Earlier agent's work, with two edits in this phase.
- `scripts/_packet50-assessment.mjs`: `QUIZ` :59, `EXTRACT` :167, `PRACTICE` :169, `FLASHCARDS` :207,
  `MISTAKES` :239, `EXTRAS` :272.
- `scripts/_packet50-diagrams.mjs`: five diagrams (:94, :146, :182, :218, :259), `DIAGRAMS` :274.
- `scripts/packet-50-managing-change.mjs`: the runner (dry run / `--dump` / `--stage`), 12 check groups.
- `audit/snapshots/2026-09-26-pre-packet-50__business__managing-change.json`: the t=0 snapshot of
  all 8 tables, taken at 11:46 by the earlier agent. Re-compared to live before staging: all 8 tables
  are the same.
- `audit/snapshots/packet-50-bundle__business__managing-change.json`: the staged bundle.
- `audit/runs/packet-50/`: `draft-readback.mjs` and the logs listed below.

## Per ledger id: 25 claimed, 2 wont-fix

Path keys:
- C = `scripts/_packet50-content.mjs`
- A = `_packet50-assessment.mjs`
- D = `_packet50-diagrams.mjs`
- R = the runner

| id | what changed | where |
|---|---|---|
| topFix-01 | Built as risk assessment (C:302), then the three risks (C:333, C:355), then continuity (C:380) and succession (C:409), then whether a plan is worth its cost (C:440). Scenario planning is one sentence (C:306), asserted by R §11 | C:302-:462 |
| topFix-02 | Clause by clause: (a) effects of change, C:72; (b) culture, size, speed and leadership, C:135, :157, :108, :184; (c) the six approaches to resistance are taught by function, C:240, with no names (scope call 2); (d) every quiz and practice item tests taught content, R §6; (e) pins are set per block, R §4 | C:72-:300 |
| topFix-03 | Incremental vs step change, C:108-:133. Disruption appears only as an external trigger, C:56. There is no "use disruptive change" examMatters. Notes C:556 and flashcards A:207 use the same two names, and R §2 bans the other labels | C:56, C:108 |
| topFix-04 | Recalls: 3 reorders and 3 fill-ins. The Kotter and Lewin content is refused (scope call 2). The force diagram is drawn without the model name (D:163). No field says "draw" (R §9). The Toyota and Nadella examples are gone; each subsection has its own example, and R §9 checks that no two share an opening or an emoji | D:163-:196, C recalls |
| topFix-05 | "Explain one reason" (A:170). The Analyse 6 became Discuss 8 (A:178), because there is no 8-mark Assess. Every stem names the insurer on one source (A:167). The crisis-management item became a business-continuity Assess 12 (A:187). R §7 checks all of this | A:167-:200 |
| accuracy-01 | No surface offers disruption as a type of change a firm "uses" (R §11). There is one vocabulary | C:56, C:108 |
| accuracy-02 | Scenario planning is no longer taught as foresight. 3.3.6's meaning (risk assessment and mitigation) is the whole of chapters 4 and 5 | C:302-:462 |
| quiz-01 | The Kotter & Schlesinger q2 is gone. The approaches are quizzed by function (A:106-:121), and R §6 asserts that no item names Kotter or Schlesinger | A:106 |
| quiz-02 | q5 is gone. Items keep a risk apart from its mitigation (A:129, A:140), and R §6 asserts that no item calls a continuity plan a "risk" | A:140 |
| structure-01 | Every quizzed key term is taught (R §6, `KEY_TERMS`), and every pinned item shares a word with its chapter | R §6 |
| structure-02 | 15 of 15 subsections have a recall; all four types appear, including 3 reorders and 3 fill-ins | C recalls |
| structure-03 | 5 diagrams. The "draw Lewin" instruction is gone, and R §9 bans "draw" in any subsection | D:274 |
| structure-04 | 5 blocks × 3 subsections covering key factors and contingency planning. The item's 4-block frame imported headings that are not in 3.3.6; the build follows the spec's two sub-topics plus the unit-description frame | C:464 |
| structure-05 | The Toyota example is gone. Incremental change has its own example (C:108 realExample), and contingency planning has examples at C:302, :380 and :440 | C realExamples |
| structure-06 | The duplicate Nadella example is gone. The three resistance subsections use distinct cases (C:216, :240, :270), and R §9 checks this | C:216-:300 |
| structure-07 | The block titles name what each block contains (C:42-:46), and R §11 asserts that the live titles are gone | C:42 |
| structure-08 | Every block has `quizIndices` and `practiceIndices`, derived from item tags (R:43-:52). Pins are quiz [[3-7],[8-12],[13-17],[18-22],[23-27]] and practice [[1,2],[5],[0,6],[3],[4]] | R:43 |
| structure-09 | Four labels are down to two, on every surface, and R §2 bans the others | util:168 |
| structure-10 | The three filler misconceptions are gone (R §9). Resistance-as-signal is kept (C:216), and so is contingency-versus-forecasting (C:302) | C misconceptions |
| structure-11 | **wont-fix**: the claim is inverted (scope call 1) | ledger note |
| specGap-01 | Triggers cover new ownership, poor business performance, organisational size, a new leader, and external triggers (C:50). R §11 checks each | C:50 |
| specGap-02 | Productivity, competitiveness, financial performance and stakeholders are covered at C:72, grounded on `:1055` (scope call 3) | C:72 |
| specGap-03 | Culture (C:135), size (C:157), time and speed (C:108), and the six approaches (C:240) | C:108-:300 |
| specGap-04 | Identifying key risks through risk assessment (C:302), natural disasters and IT systems failure (C:333), loss of key staff (C:355) | C:302-:378 |
| specGap-05 | Business continuity (C:380), succession planning (C:409) | C:380-:438 |
| specGap-06 | Taught as the evaluation of 2b, not as a leaf (scope call 4) | C:440 |
| specGap-07 | **wont-fix**: the record holds only a parenthetical and names no requirement (see ledger note) | ledger note |

## The two edits this phase made to the earlier agent's content module

1. `what-triggers-change`: the step was 360 words against a 350 budget, so it was trimmed. The
   disruption sentence now reads "A **disruptive technology** … is an external trigger" (C:56), which
   covers `topFix-03`'s "treat disruption as external".
2. `risk-assessment`: the keyIdea was cut to fit 180 characters. The reorder item "Draw up plans…"
   became "Plan responses…", because the runner's procedure-step and "draw" bans both fired on it.

## Gates, as run (shared worktree, other sessions' changes present)

- `node scripts/packet-50-managing-change.mjs`: exit 0. Every packet check passes, with 0 new BLOCK
  and 0 new DEBT (`stage.log`).
- `--dump --stage`: all 8 tables staged. The draft was equal to live before staging
  (`api-draft-before.json` = `api-live.json`).
- **Read-back by two methods:**
  - a direct select of `draft` and `data` columns (`draft-readback.log`): 8 of 8 drafts equal the
    bundle, and 8 of 8 `data` columns equal the t=0 snapshot, so live is untouched;
  - through the HTTP API (`check-staged-drafts.log`): "managing-change matches". This covers only the
    signed-out slice.
- `npm test` 334/334 (`gate-test.log`), `npm run validate` 0 findings (`gate-validate.log`),
  `npm run exposure` exit 0, `npm run recalls` exit 0 ("no section is worse than the baseline").
- **Not run: `npm run build`.** A `next build` would rewrite `.next` under the dev server on :3001,
  which other sessions use. Packet 47 made the same call.

## Not verified by this phase

- There has been no 390px walkthrough and no Browser pane check. Nobody has looked at the diagrams
  rendered. The collision, extent and box-fit checks run on the emitted SVG using a width estimate, not
  on a rendered page.
- The check-in rule: the runner checks each pinned key as a substring and each key figure. The real
  test is a judgment of meaning, and that belongs to Verify A and Verify B (CONTENT-GATE, 26 Sep).
- There has been no Layer 6 adversarial review. Layer 4: no real example names an entity together with
  a year or a figure.
- Publishing is out of scope under rule 6. If the verifiers pass, the founder runs:
  `node scripts/publish-section.mjs managing-change --confirm`. Before that, rule 3 applies: confirm
  that origin/main's components read every field this bundle carries (`diagramId` pins, the four
  recall types, the `title/mistake/correction/examTip` mistake fields).

## Fix round 1 (26 September 2026): Verify A rejected structure-07 and structure-10

Both rejections were correct. Nothing is published or committed. The draft was re-staged.

| id | what changed | where |
|---|---|---|
| structure-07 | Block 1 was retitled from "Why Change Happens and How Fast" to **"Triggers, Effects and Speed of Change"**. It now names all three subsections: What Triggers Change, The Effects of Change, and Time and Speed of Change. The old title did not signal the middle one. Notes[0] gets the same title, because the runner asserts the notes title equals the chapter title. takeaway[1], "Costs arrive before gains; judge a change over time.", is kept: it now sits under a title that names effects. | `_packet50-content.mjs:42` (B1) |
| structure-10 | The step-change misconception had only been relabelled, and it is **replaced**. The new one is about a different belief that students actually write: that slower change is always safer. Its correction is the cost of being late when customers or rivals move faster than the business. It does not repeat MISTAKES "Treating speed as a strength in itself" (assessment:248), which is the opposite error. | `_packet50-content.mjs:118` |

**Rule 4 re-read** of every other field of block 1 and of notes[0]:
- notes[0] keyIdea "Triggers start change, its effects arrive over time, and speed decides…" already matches the new title.
- notes[0] meta, notes[0] takeaways and the three block takeaways need no change.
- Notes carry no misconception field (runner assertion, :428).

I grepped every surface for the rejected claim: subsections, quiz, flashcards, mistakes, extras and diagrams. "bolder" and "step change is always better" now have 0 hits. The block id is hashed from the title, so it changed from `97547dd0` to `6649d74b`. Nothing else in the bundle referenced the old id (`fix1-bundle-diff.txt` shows 4 changed lines: id, misconception, content title, notes title).

**Runner checks added** (`packet-50-managing-change.mjs`):
- structure-10: the filler regex now also matches "step/disruptive change is always better" and "because it is bolder".
- structure-07: the round-0 title is banned, and block 1's title must contain "trigger", "effect" and "speed" while block 1 still holds those three subsections.
- **A/B:** a throwaway copy of the modules with the old title and misconception restored fails exactly on these checks (`fix1-ab-control.log`, 5 structure lines). The real modules exit 0 (`fix1-check.log`). The throwaway copies were deleted.

**Gates, as run:**
- `--dump --stage`: exit 0 (`stage-fix1.log`).
- Read-back by direct select: 8 of 8 drafts equal the bundle, and 8 of 8 `data` columns equal the t=0 snapshot, so live is untouched (`draft-readback-fix1.log`).
- A second read-back that string-searches the stored draft JSON rather than the bundle: the new title is present in content and notes, and the old title and "bolder" are absent. The live `data` column does not carry the new title (`fix1-draft-fields.log`).
- `npm run validate`: 0 findings. `npm run recalls`: no section worse than baseline. `npm run exposure`: exit 0.
- `npm test`: 339/342. The 3 failures are all economics: lib/mid-band-answer market-failure panel, 1.3.5 grouping, and economics bank tags. None names managing-change. The test count rose from 334, so other sessions' uncommitted work is in the worktree.
- Not run: `npm run build`, a 390px walkthrough, or any Browser pane check.
