# Packet 47: Rule 3 against origin/main (global-markets-expansion)

Read-only review, 26 September 2026. **origin/main = `94bfda1137b96de9db371901a814a660410801ec`**
(2026-09-26 09:38 +0300, re-fetched before the review). The content under test is
`audit/snapshots/packet-47-bundle__business__global-markets-expansion.json`. I did not render React
components. For each field I read the component source on main (`git archive origin/main`), and I ran
main's own pure modules on the bundle.

## How it was checked

1. **Draft vs bundle.** I ran `curl ?draft=1` as an anonymous user against :3001 and compared it key by
   key with **main's** `sectionPayload(bundle, {isPremium:false})`. All 10 keys MATCH: content 5, notes 5,
   diagrams 5, practice 7, quiz 8 of 30 (pins rewritten to `[0]`..`[4]`), flashcards 2 of 29, extras 1+1,
   mistakes 0 of 7, counts, isPremium. The paid remainder (22 quiz items, 27 flashcards, 3 chains,
   2 evaluation points and 7 mistakes) is not served to a signed-out request. For those I checked the
   bundle file only, not the database.
2. **Main's code run on the bundle.** I ran main's `buildSteps`, `placeChapterItems`, `sectionPayload`,
   `pickPretestQuestions`, `pickSpacedRecall` and the `recall-widgets` helpers, for both a premium and a
   free payload. Results:
   - 22 steps: 17 teach steps and 5 check-ins.
   - Every check-in gets its diagram **by pin**, with no title fallback.
   - Every check-in gets a quiz item (3, 9, 14, 19, 25) and a practice item (0, 3, 5, 4, 2).
   - The pre-test is [0, 1, 2].
   - All 17 recalls pass the helpers at both the `first` and `spaced` showings.
   - All block, subsection, recall, diagram, flashcard and mistake ids are unique.
3. **Control (A/B).** I made a copy of the bundle with four planted defects: a missing `correctOrder`, a
   bogus `diagramId`, `**bold**` in a quiz stem, and an empty `examTip`. Each one was detected. The bogus
   pin shows up as `/title`, not `/pin`.
4. **Markup audit.** For every string field, I checked whether markdown or HTML lands in a renderer that
   prints plain text. Result: 0 fields.

Scratch scripts (not in the worktree): `/private/tmp/claude-503/p47-rule3/{enum.py,markup.py,simulate.mjs,cmp.mjs}`.

## Field table

| Item kind | Fields carried | Component on main | Fields it reads | Verdict | file:line (main) |
|---|---|---|---|---|---|
| content block (5) | id, title, sections, takeaway[], diagramId, quizIndices, practiceIndices | lib/learn-steps.js `buildSteps`; lib/checkin-placement.js; lib/preview-limits.js `freeQuizPayload`; lib/checkin-fallback.js | sections, title, takeaway (Array-guarded), diagramId, quizIndices, practiceIndices; diagramRef/quizIds/practiceIds optional, absent here; id as the report target | SAFE | learn-steps.js:50,72-77; checkin-placement.js:37,46-51; preview-limits.js:117-125; checkin-fallback.js:53,79 |
| diagramId pins (5, none null) | a string id per block | `resolvePinnedDiagram` | `d.id === pin.id` | SAFE. All 5 resolve by pin. `decidedNoDiagram` is not engaged because no pin is null. | utils.js:134 |
| quizIndices / practiceIndices | [3-8] [9-13] [14-18] [19-24] [25-29] / [0,1] [3] [5] [4] [2,6] | `resolvePinnedItem` | first unused index only | SAFE. INFO: practice[1] (Calculate 4) and practice[6] (Evaluate 20) are never placed in Learn Mode. They appear only in the Practice tab. | utils.js:112 |
| subsection (17) | id, title, keyIdea, body, realExample{emoji,text}, misconception, examMatters, recall | LearnModeTab → NoteSection; topic page SSR | all of them. The SSR page calls `b.text.replace` and `sec.realExample.text.replace` unguarded: 58/58 paragraphs have text and 17/17 realExamples have text | SAFE | LearnModeTab.jsx:782-790; NoteSection.jsx:19-25; app/business/[unit]/[topic]/page.jsx:210-214 |
| body `paragraph` (58) | type, text | BodyRenderer | type, text (markdown) | SAFE | BodyRenderer.jsx:10 |
| body `flow` (2) | type, steps[{title,subtitle}], result, resultType | BodyRenderer → FlowChain | steps via `stepParts` (object form), result (plain text), resultType | SAFE | BodyRenderer.jsx:20-24; FlowChain.jsx:71,122 |
| recall `classify` (6) | id, type, prompt, groups[{name,items,why}] | ClassifyRecall | groups (Array-guarded), name, items, why, prompt, id | SAFE | LearnModeTab.jsx:74; ClassifyRecall.jsx:25,158 |
| recall `fillin` (5) | id, type, prompt, template, answers, hints, distractors | FillInRecall | template, answers, hints, distractors, prompt, id. Every template has as many blanks as answers, and hints has the same length as answers | SAFE | LearnModeTab.jsx:72; FillInRecall.jsx:21-23,79,82; recall-widgets.js:183-206 |
| recall `match` (4) | id, type, prompt, pairs[{left,right,why}] | MatchRecall | pairs (Array-guarded), left, right, why, distractors (optional) | SAFE (no crash). The layout risk is in note (b). | LearnModeTab.jsx:73; MatchRecall.jsx:16,78,120 |
| recall `reorder` (2) | id, type, prompt, criterion, correctOrder, why[] | ReorderRecall | correctOrder (`\|\| []`), why (Array-guarded), prompt, id. The bundle has no `shuffled` field, and main ignores that field anyway | SAFE. INFO: `criterion` is read by no component, on main or on the branch. The prompt states the ordering principle instead. | LearnModeTab.jsx:71; ReorderRecall.jsx:9,16-17,80; recall-widgets.js:15 |
| quiz (30) | id, question, options, explanation, correctIndex | QuizTab, InlineQuiz, PreTest, MistakesTab "your mistakes" | QuizTab calls `options.map` unguarded. All 30 items have 4 options and a correctIndex from 0 to 3 | SAFE | QuizTab.jsx:191; InlineQuiz.jsx:88,105 |
| practice (7) | id, command, marks, question, guidance | PracticeQuestionsTab, InlinePractice, WrittenQuestionCard | `guidance.split` unguarded (7/7 are strings), question, marks, command. All five commands are in main's Business tariff list, so none is withheld | SAFE (no crash). The display issue is in note (a). | PracticeQuestionsTab.jsx:23,157,171; InlinePractice.jsx:41,125; ial-commands.js:60 |
| flashcards (29) | id, front, back | FlashcardsTab, FlashcardCard | front (plain text), back (HTML) | SAFE | FlashcardsTab.jsx:334,339 |
| mistakes (7) | id, title, mistake, correction, examTip | MistakesTab | title, mistake, correction, examTip. All four are non-empty in all 7 | SAFE | MistakesTab.jsx:85,89,94,97-99 |
| diagrams (5, 7 views) | id, title, description, checklist[str], scenarios[{label,svg}]; no kind, top-level svg or imageUrl | InlineDiagram, DiagramChecklist, processSvg | scenarios, kind (absent, so not a table), title, description, checklist (Array-guarded), svg. All 10 hex colours used are in main's PALETTE | SAFE. The Diagrams tab is Economics-only on main, so these 5 diagrams reach a Business student only through the 5 check-in pins. | InlineDiagram.jsx:17,27,68-69,96; DiagramChecklist.jsx:14; processSvg.js:27; StudyApp.jsx:42 |
| notes (5) | title, meta, keyIdea, blocks[{title,items[{type,text}]}], takeaway[] | NotesTab | title, meta, keyIdea, blocks, items, `item.type` used as a CSS class, text, `takeaway.map` | SAFE (no crash). **Silent loss**: 27 of 32 items have type `definition` (15) or `mechanism` (12). Main styles only `.def/.mech/.imp/.link`, so those 27 bullets have no colour bar and do not match the colour key. This is not new: 24 earlier packet bundles in audit/snapshots use the same values. | NotesTab.jsx:55-56,73,78-87,149; app/globals.css:1165-1168 |
| extras.chains (4) | title, steps[str], result | ExtrasTab | title, steps (Array-guarded; `steps`, not `points`), result | SAFE | ExtrasTab.jsx:66,80-84,94 |
| extras.evaluation (3) | title, content | ExtrasTab | title, content | SAFE | ExtrasTab.jsx:126,129 |
| block takeaway (5 arrays) | string[] | TakeawayCard; grade-explanation rubric | items (markdown) | SAFE | LearnModeTab.jsx:845; learn-steps.js:72 |

## Branch fixes that main lacks, and what this content hits without them (no crash, display only)

- **(a) Shared source.** On main, every practice stem prints Source A in full, because the branch's
  `sharedSource` (PracticeQuestionsTab.jsx:68,162, packet 41) is not on main. The 7 stems share a common
  prefix of 1,010 characters, so the Practice tab prints that source 7 times.
- **(b) Match chip wrap (V042).** Main's match chip at MatchRecall.jsx:120 has no `lm-match-chip`, so
  globals.css:7651 applies `white-space: nowrap` at 768px and below. The chapter-4 match
  (`content[3].sections[0]`, which is also the chapter-5 spaced recall) has options of 55, 52 and 50
  characters. By V042's own measure (81 characters rendered 574px wide), these come to roughly
  355-390px in a word bank about 326px wide, so they are likely to overflow at 390px. **This is an
  estimate. I did not render it.**
- **(c) Diagrams tab.** Main has no Diagrams tab for this Business section. The branch opens it
  (StudyApp.jsx:486); main has it Economics-only (StudyApp.jsx:42).
- No `packet-41` commit is on main (`git log origin/main --grep '^packet-41'` finds none). The other component differences (PracticeShell,
  MarkedScriptAttempt, stimulus.js, mid-band-answer, model-answers-route, spec-coverage) are all on the
  branch only. They serve the file-based model-answer pages, and none of them reads the section tables
  this bundle writes. Main is ahead in one place: it has `DiagramChecklist`, which guards `checklist`.

## Q4: main's Unit 4 pages vs the new section (static files; a publish does not change them)

- `app/business/page.js:47`: meta `'Market entry, Ansoff\'s matrix, risk'`.
- `app/business/page.js:81`: the Unit 4 description says "strategies for entering global markets"
  (unit-level wording).
- `app/business/unit-4/page.js:25`: the 4.3.2 description says "market entry strategies … applying
  Ansoff's matrix abroad".
- `:27`: "Market Entry Strategies": Exporting · licensing · franchising · joint ventures · FDI ·
  subsidiaries.
- `:28`: "Assessing Opportunities": … cultural distance · political risk.
- `:29`: "Managing International Risk": … corruption.
- `:30`: "Ansoff's Matrix (Global)".
- `:112`: the unit key concept "Entry strategy depends on context" (exporting, licensing, franchising,
  JVs, FDI).

In the bundle, these terms have **0** hits: licens, franchis, "market entry", "entry mode", FDI, cultural
distance, corruption, diversification. "ansoff" has 1 hit, which is the pointer. The worktree holds
**uncommitted** rewrites of page.js:47 and unit-4 :24-31, not on main. They do not touch :81 or :112.

## Not checked

- React rendering and any viewport width.
- Whether the deployed production build is `94bfda1`. Main does contain packet-5 (a9bba5f) and
  packet-7 (b73c8d2).
- The paid tables in the database, as opposed to the bundle file.
- The admin SectionEditor.

VERDICT: SAFE. Every field that main's components read unguarded is present and well-typed in every
item, and nothing in main's code path throws on this bundle. Three things degrade without crashing:
note bullet colours (27 of 32), the source repeated 7 times in the Practice tab, and a likely
match-chip overflow at 390px. The `criterion` field on the 2 reorders is carried but never rendered.
