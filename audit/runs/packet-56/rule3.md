# Packet 56 — Rule 3: can production render every field the bundle carries?

- Bundle: `audit/snapshots/packet-56-bundle__business__global-industries-mncs.json` (section `global-industries-mncs`, WBS14, 4.3.4)
- Production: `origin/main` = **903b8e8691e9926b0881c4bc893c80142becf1a8** ("Merge pull request #60 … fix/unmarked-guidance-no-checklist"). My fetch returned `d2f0b02`, and main moved to `903b8e8` while this check ran (PR #39 Blackjack Units 3-4 and PR #60 V067). The 14 files in that delta were reviewed, the simulation was re-run on `903b8e8`, and every line number below is `903b8e8`'s
- Method: every key enumerated with node (a path walker over `.tables.*`, split by `type`); each student-facing field traced to the line on `origin/main` that reads it (`git archive 903b8e8` into `/private/tmp/claude-503/p56r3/main`, so the line numbers are main's). Main's own code was then run over the bundle: `sectionPayload` (premium and free), `buildSteps`, `placeChapterItems`, `isPracticeVisible('WBS14')`, `pickSpacedRecall`, `pickPretestQuestions`, the recall-widgets functions, `shuffleOptions`, `checklistFrom` and `mistakeGaps`. Script: `/private/tmp/claude-503/p56r3/sim.mjs`.

## Field set carried

| Kind | n | Keys (every item carries all of them) |
|---|---|---|
| content block | 4 | id, title, sections, takeaway[], diagramId, quizIndices[], practiceIndices[] |
| subsection | 17 | id, title, keyIdea, body[], realExample{emoji,text}, misconception, examMatters, recall |
| body item | 72 | `paragraph`{type,text} ×70 (42 use `**bold**`) · `bullets`{type,items[]} ×2 (5 bolds). No `flow`/`subheading` |
| recall | 17 | fillin ×3 {id,type,prompt,template[],answers[],hints[],distractors[]} · classify ×8 {id,type,prompt,groups[{name,items[],why}]} · match ×4 {id,type,prompt,pairs[{left,right,why}]} · reorder ×2 {id,type,prompt,criterion,correctOrder[],why[]} |
| notes chapter | 4 | title, meta, keyIdea, blocks[{title, items[{type,text}]}], takeaway[]; item types: definition ×13, mechanism ×6, link ×4; `<strong>` HTML in the definitions |
| quiz | 25 | id, question, options[4], explanation, correctIndex |
| practice | 7 | id, command, marks, question, guidance (Explain 4 ×2, Discuss 8, Assess 12 ×2, Evaluate 20 ×2). A 1,303-character "Source A. Korvane…" opening is inline in every `question` (no separate source field); `guidance` uses `\n` |
| flashcard | 26 | id, front, back (plain text: no `<`, `>`, `&` or `*`) |
| mistake | 7 | id, title, mistake, correction, examTip (canonical shape) |
| diagram | 4 | id, title, description, checklist[], scenarios[{label,svg}] (1 scenario each) |
| extras | 3 + 3 | chains[{title,steps[],result}], evaluation[{title,content}] |

The `$` signs in the quiz, practice, checklist and extras text are currency, not LaTeX. Main has no maths renderer and none is needed.

## Kind → main reader → status

| Kind | Fields → origin/main reader (file:line) | Status |
|---|---|---|
| Load/gate | All 8 tables are fetched at `app/api/sections/[id]/route.js:67-95` and passed to `lib/preview-limits.js:257-302`. The free quiz payload (`:64-222`) remaps the pins to `[0] [1] [2] [3]` and sends 7 of the 25 questions. The free flashcard preview is 2, extras 1+1 and mistakes 0, as designed | OK |
| Content block | title `lib/learn-steps.js:51,58` → `LearnModeTab.jsx:798,821`, `ContentTab.jsx:100` · sections `learn-steps.js:50` · takeaway `learn-steps.js:72` → `LearnModeTab.jsx:875` → `notes/TakeawayCard.jsx:8-11`, `ContentTab.jsx:114-115` · diagramId `learn-steps.js:74` → `checkin-placement.js:46` → `learn-mode/utils.js:130-136` · quizIndices `learn-steps.js:75` → `checkin-placement.js:48` → `utils.js:100-117` · practiceIndices `learn-steps.js:77` → `checkin-placement.js:51` · id `LearnModeTab.jsx:636-640` (report target only). **Simulated:** 21 steps (17 teach, 4 check-ins). Every check-in resolves its own pinned diagram, a question (3/7/13/19) and a practice item (0/1/2/6, all visible under WBS14). Premium and free resolve the same way. Pre-test offers 3 | OK |
| Subsection | title `LearnModeTab.jsx:801`, `notes/NoteSection.jsx:18` · keyIdea `NoteSection.jsx:19` → `KeyIdea.jsx:4-9` · body `NoteSection.jsx:20` → `BodyRenderer.jsx:10-17` (paragraph), `:30-39` (bullets) · `**bold**` → `lib/parse-inline-markdown.js:28` · realExample.emoji/text `NoteSection.jsx:23-28` → `RealExample.jsx:9,11` · misconception `NoteSection.jsx:30-32` → `MisconceptionCard.jsx:9` · examMatters `NoteSection.jsx:33-35` → `ExamMattersCard.jsx:9` · recall `LearnModeTab.jsx:805-810` (own step), `:857-866` (spaced) · id `learn-steps.js:55`. The server SEO copy at `app/business/[unit]/[topic]/page.jsx:207-215` reads keyIdea, paragraph text, realExample.text and examMatters. Every one of those is present, so its unguarded `.replace` calls cannot throw | OK |
| Recall: dispatch | `LearnModeTab.jsx:68-76` has renderers for reorder, fillin, match and classify, which are the only 4 types the bundle uses | OK |
| Recall: fillin | template `FillInRecall.jsx:21` → `recall-widgets.js:140-155` · answers `:23` · hints `:79,151` · prompt `:82` · distractors `recall-widgets.js:187,200-205` · id `learn-steps.js:143`. **Simulated:** blanks = answers = hints = 3 on all 3; 5 or 6 chips; no hint leaks | OK |
| Recall: classify | groups `ClassifyRecall.jsx:25` · name/items/why `:158,176-178` → `RecallFrame.jsx:63` · prompt `:161` · bank `recall-widgets.js:244`. **Simulated:** 8/8 have 6 items with a `why` on every group | OK |
| Recall: match | pairs `MatchRecall.jsx:16` · left/right/why `:78,96` → `RecallFrame.jsx:63` · right `recall-widgets.js:221` · prompt `:81`. **Simulated:** 4/4 have 4 pairs, no duplicate rights, 4 `why` each | OK |
| Recall: reorder | correctOrder `ReorderRecall.jsx:16` · why[] `:80-81` → `RecallFrame.jsx:63` · prompt `:84`. **`criterion` is read nowhere on main** (grep of components/lib/app finds only `content-validator.mjs`, which checks the *prompt*). It is authoring metadata, and both prompts already state the principle ("…cause-to-effect order, from an MNC's investment to the extra tax…"; "…from what happens at a supplier to the MNC changing its behaviour"), so nothing a student needs is lost | OK (unread metadata, no loss) |
| Notes | title `NotesTab.jsx:55` · meta `:56` · keyIdea `:70-73` · block title `:80-81` · item text `:87` (the `<strong>` HTML renders) · takeaway `:146-152` · **item.type `:86` becomes the CSS class `rn-bullet ${type}`, but `app/globals.css:1165-1168` only colours `def`, `mech`, `imp` and `link`.** The 13 `definition` and 6 `mechanism` items therefore get a transparent 3px bar: 19 of 23 notes items lose their colour code, under a legend (`NotesTab.jsx:60-66`) that promises it. Text and meaning survive, because each block is titled DEFINITIONS or MECHANISMS. This is not new to this packet: every bundle since packet 24 writes `definition`/`mechanism` (31 snapshots), and live `aggregate-supply`, `labour-markets` and `growth-development` already show it (auto-prepublish snapshots). No validator rule covers it | MISSING READ (value; cosmetic, pre-existing, class-level) |
| Quiz | question `InlineQuiz.jsx:84`, `QuizTab.jsx:190`, `fun/QuizChallenge.jsx:52` · options `InlineQuiz.jsx:88`, `QuizTab.jsx:192`, `QuizChallenge.jsx:54` (both unguarded `.map`; 25/25 have 4 options) · correctIndex `InlineQuiz.jsx:35,46`, `QuizTab.jsx:195` (25/25 in range) · explanation `InlineQuiz.jsx:105`, `QuizTab.jsx:213-214`. Since #39, `lib/fun-pool.js:55-66` also puts this Unit 4 bank into Blackjack · id `InlineQuiz.jsx:131` · PreTest `:65-67`. Shuffle `lib/shuffle-options.js:278-307`: 0 explanations with letter references, and all 25 keep the right answer after shuffling | OK |
| Practice | visibility `lib/ial-commands.js:60-64` (Explain, Discuss, Assess and Evaluate are all BUSINESS commands, so 7/7 are visible) · marks `PracticeQuestionsTab.jsx:34,188`, `InlinePractice.jsx:23,118`, sort `checkin-placement.js:32` · command `PracticeQuestionsTab.jsx:190-192`, `InlinePractice.jsx:35` · question `PracticeQuestionsTab.jsx:197` (stemOf `:79-82`), `InlinePractice.jsx:116` · source: `PracticeQuestionsTab.jsx:68-77` derives the shared opening (1,303 chars, at least 120, ends on a sentence) and shows it once as "Source A" at `:161-164`. Every stem then reads cleanly ("Explain one way Korvane's factory…") · guidance `PracticeQuestionsTab.jsx:211` (unguarded `.split('\n')`; 7/7 present), `InlinePractice.jsx:27-30,121-165`. The self-mark checklist has 4 points for each Explain 4. Since V067 (`practice-checklist.js:84-97`), the 5 levels-marked items get no checklist and show the "compare with the mark scheme" line at `InlinePractice.jsx:84-88` instead, with the guidance still shown in full | OK |
| Flashcards | front `FlashcardsTab.jsx:334`, `flashcards-practice/FlashcardCard.jsx:86-90` · back `FlashcardsTab.jsx:339`, `FlashcardCard.jsx:97-101` (raw innerHTML, which is safe here because the backs contain no HTML metacharacters) | OK |
| Mistakes | `MistakesTab.jsx:88-109` via `lib/mistakes-shape.js:29-37`: title, mistake→wrong, correction→right, examTip. No `why` is carried, and `:97` renders it only when present. **Main's `mistakeGaps` over all 7 cards returns `[]` for every one**, with nothing left unread (see below) | OK |
| Diagrams | title `DiagramsTab.jsx:50`, `InlineDiagram.jsx:68` · description `DiagramsTab.jsx:51`, `InlineDiagram.jsx:69` · scenarios/svg `DiagramsTab.jsx:34-35,43-45`, `InlineDiagram.jsx:17-18` · checklist `DiagramsTab.jsx:78`, `InlineDiagram.jsx:96` → `DiagramChecklist.jsx:14-22` · id `DiagramsTab.jsx:85`, pinned at `utils.js:134-136` · label `DiagramsTab.jsx:53-63` (the switcher only appears with more than one scenario, and all 4 have one). All 7 SVG colours used are in main's `processSvg.js:27-45` PALETTE, so light mode remaps them. The elements are svg, text, line, rect, path and marker | OK |
| Extras | chain title `ExtrasTab.jsx:80` · steps `:94-98` (guarded) · result `:108-113` · evaluation title `:140` · content `:143` (all through parseInlineMarkdown) | OK |

## Mistakes: origin/main `lib/mistakes-shape.js` run over the bundle

| id | gaps | wrong | why | right | examTip | unread keys |
|---|---|---|---|---|---|---|
| d9ee4863 | [] | ✓ | — | ✓ | ✓ | none |
| 926246c9 | [] | ✓ | — | ✓ | ✓ | none |
| 7c0a6137 | [] | ✓ | — | ✓ | ✓ | none |
| 96974b09 | [] | ✓ | — | ✓ | ✓ | none |
| b830ef73 | [] | ✓ | — | ✓ | ✓ | none |
| 773c43d1 | [] | ✓ | — | ✓ | ✓ | none |
| 89dd8a70 | [] | ✓ | — | ✓ | ✓ | none |

## Flags

- (a) Field carried but main never reads it: reorder `criterion` (2 items). It is metadata and its content is in `prompt`, so there is no loss. Notes `item.type` values `definition`/`mechanism` are read but never styled, so 19 of 23 colour bars are blank (details in the Notes row). The loss is cosmetic and already live on other sections. The fix belongs in code, either `.rn-bullet.definition`/`.mechanism` or a map at `NotesTab.jsx:86`, and not in this bundle. The alternative, rewriting to `def`/`mech`, would diverge from the 31 bundles since packet 24.
- (b) Field main reads unconditionally that the bundle lacks: none. The unguarded reads (`QuizTab.jsx:192` and `QuizChallenge.jsx:54` options, `PracticeQuestionsTab.jsx:211` guidance, `page.jsx:212,214` text) are satisfied on every item.
- (c) Type with no renderer on main: none. Body types are paragraph and bullets, recall types are all four, and diagrams are SVG with no `kind`/`imageUrl`.

## Not checked

The pixel rendering in a browser (this is a code-path check against main's source, not a deploy), the quant drills `templatesForSection` may add (they are not bundle fields), content quality and the answer-leak rules (they belong to other gates), and whether Vercel production is exactly `903b8e8` (main moved during this check and may move again).

RULE3: safe
