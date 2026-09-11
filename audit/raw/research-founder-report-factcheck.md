# Fact-check of the founder's audit claims

Paths below are relative to `/Users/arongijsel/Claude APP/economics-next/` unless absolute. DB paths are under `/private/tmp/claude-503/-Users-arongijsel-Claude-APP/d0d0e740-ce29-4795-8742-653e772cf3c1/scratchpad/db/`.

## (a) Pre-topic quiz pulls from the broader Smart Practice database, not the local node — FALSE

- `components/learn-mode/PreTest.jsx:7-11`: questions come only from the `quizData` prop, shuffled, sliced to 3.
- `components/StudyApp.jsx:680`: `quizData={sectionData.quiz}`; `sectionData` is loaded per section via `fetch('/api/sections/${activeSection}')` (`StudyApp.jsx:455`), and `app/api/sections/[id]/route.js:13` queries `section_quiz` with `.eq('section_id', id)`.
- Smart Practice (`components/PracticeEngine.jsx:396-397`) uses a different endpoint (`/api/practice/questions?sections=...`) but reads the same `section_quiz` table per section. There is no cross-unit pool feeding PreTest. A "Unit 4 question while starting Unit 1" cannot happen from this code. The only cross-section pool in the app is Blackjack (`app/api/fun/questions/route.js:17-30`), which is subject-wide.
- Caveat: the PreTest draws from the section's full 25-question bank, so a student may get a question about block 5 content before reading block 1. That is plausibly what the user experienced, but it is "later in this topic", not "another unit".

## (b) Fill-in answers assessed by LLM or exact-match string; "supernormal vs abnormal profit" marked wrong — FALSE (mechanism), moot (scenario)

- `components/learn-mode/FillInRecall.jsx:4-16, 100-111`: it is a word-bank drag/tap widget. The only words available are `recall.answers` shuffled (`:12`). The student cannot type a synonym.
- Check is case-insensitive exact match against the bank word in that slot (`FillInRecall.jsx:50-53`). No LLM.
- The "supernormal vs abnormal" scenario is impossible in this widget because both would never be offered unless the author put both in the bank. `revenue-costs-profits` has no fill-in recalls at all (index: reorder 0, fillin 0).
- The only LLM-graded free text is ExplainItBack via `app/api/learn-mode/grade-explanation/route.js` (premium only); `RecallCheckpoint.jsx:57-108` is self-rated (got-it/partial/missed), not graded.

## (c) Backend AI generates ranking exercises from text at runtime without constraints — FALSE

- `components/learn-mode/ReorderRecall.jsx:9`: items are `recall.shuffled.map(i => recall.correctOrder[i])`, i.e. static JSON from the section content. No fetch, no model call.
- No LLM in content pipeline: grep of `gemini|generateText|@ai-sdk|openai|anthropic` across `app lib scripts components` hits only `app/api/learn-mode/grade-explanation/route.js`, `app/api/chat/route.js`, `app/api/written-practice/evaluate/route.js`, `components/TutorTab.jsx`. `scripts/upgrade-content-*.mjs` are hand-authored content pushes using `scripts/_upgrade-template.mjs`.
- The founder's real hypothesis (orderings with no true order) IS supported by the data, e.g. `economics__introductory-concepts.json > Production Possibility Frontiers > the-ppf-model` correctOrder = [On the curve, Inside, Outside, Slope] and `> Economic Systems > free-market-command-and-mixed` = [What, How, For whom, "Market, command or mixed answers these"]. These are lists, not sequences. But the cause is authoring, not a runtime generator.

## (d) Smart Practice questions are LLM-generated and oddly worded — UNVERIFIABLE (generation), not evident (wording)

- Smart Practice reads `section_quiz` (`app/api/practice/questions/route.js:23-25`); the same 25/section bank that Learn Mode and PreTest use. How the bank was originally authored is not in the repo; `scripts/expand-quiz-*.mjs` contain no LLM calls, but the text could have been produced offline.
- Sampled wording (`economics__introductory-concepts.json` quiz[0..5]) reads like standard Edexcel MCQ style ("Which of the following is a normative statement?", "A point inside the PPF indicates that:"). Nothing odd in the sample. Note quiz[2] references "The UK inflation rate was 2.1% in 2023" — UK-centric for an IAL audience, a minor localisation issue rather than odd wording.

## (e) Unit 2 Managing Finance diagrams section says "Coming soon" — FALSE

- `components/StudyApp.jsx:33`: the Diagrams tab is `subjects: ['economics']` only. For Business the tab does not exist, and the overview card carrying the literal `'Coming soon'` string (`StudyApp.jsx:118`) is gated by `hasDiagrams` (`:50, :115`), which is false for Business.
- `managing-finance` (WBS12 2.3.3) has diagrams=0, but so do all 20 Business sections (`index.json`: no business section with diagrams>0). Every Economics section has >=3.
- Other "coming soon" strings: `components/ExtrasTab.jsx:19` (empty chains) and `components/PracticeQuestionsTab.jsx:31` (empty practice); neither fires for managing-finance (extrasChains 4, practice 5).

## (f) Platform claims 24 Economics and 20 Business spec points — TRUE (claim exists), but the Economics number is wrong

- `app/ial-revision/page.js:165` "4 units · 24 spec points · WEC11–WEC14"; `:170` "20 spec points · WBS11–WBS14"; `app/business/page.js:186, 367`.
- Live content has 23 Economics sections and 20 Business sections (`index.json`, 43 entries). Marketing overstates Economics by one.

## (g) Analytics indicate users abandon within days — PARTLY (direction right, timescale understated)

- From the supplied aggregates: 825/1093 section starts (75%) never left step 0; `introductory-concepts` 167/192 stuck at step 0; median activity span ~1 hour for practice users. Abandonment is within the first session, not "within days". I cannot verify retention beyond the provided aggregates.

## (h) Adaptive flashcards rely on FSRS-like algorithms — FALSE

- `lib/spaced-repetition.js:37-82` is a simplified SM-2: interval 1 -> 3 -> interval*ease, ease +0.1/-0.2, confidence modifiers, reset to 10 minutes on miss. No stability/difficulty/retrievability model, so not FSRS. `app/practice/page.js:8` metadata correctly says "SM-2 algorithm". Marketing copy says "Adaptive flashcard algorithm" (`app/business/page.js:258`) without naming one.
- Flashcards and MCQ practice share this scheduler and the `practice_question_progress` table with `fc-`/`wa-` prefixes (`app/api/flashcards-practice/progress/route.js:8, 23`).

## (i) Learn Mode step counts: Intro 5, Supply 3, Market Failure 7, Gov Intervention 8 — PARTLY

The report's numbers are BLOCK counts, which is what the overview card shows (`StudyApp.jsx:41, 108`: `contentSteps = sectionData.content.length`). The actual Learn Mode stepper uses `flatSteps` = ceil(sections/2) per block (`LearnModeTab.jsx:48-77`):

| section | blocks (report) | real steps |
|---|---|---|
| introductory-concepts | 5 | 5 |
| supply | 3 | 5 |
| market-failure | 7 | 9 |
| government-intervention | 8 | 9 |

So Intro is correct by coincidence; the other three are wrong. The overview card and the progress-save (`StudyApp` persists `content.length` as the total) both use block count, so the "X steps" label on the home card disagrees with "Step n of N" inside Learn Mode for most sections.

## (j) Blackjack is a contextual review mechanic — FALSE

- `components/fun/FunPage.jsx:83`: pool is `/api/fun/questions?subject=`; `app/api/fun/questions/route.js:17-30` pulls every quiz question for a hardcoded subject-wide section list. Not tied to the current section, unit, weak areas, or review schedule. Win = 1 question, lose = 5 (`FunPage.jsx:125`); wrong answers re-enter a session-local retry pool (`:134-137`). It is a subject-wide random quiz gated by a card game, with one free round before paywall (`:248-249`).

## Overall verdict on the report

Roughly a third of the report is grounded observation and two-thirds is speculation dressed as diagnosis. The things a user can see (pre-test feels demotivating, reorder items have no inherent order, Business has no diagrams, marketing counts) are directionally right; but nearly every mechanistic explanation attached to them is invented: there is no runtime AI generating exercises, no LLM grading fill-ins, no cross-unit question pool, no FSRS, and Blackjack is not contextual. Step counts were read off the overview card rather than the stepper. The "abandon within days" line is generic EdTech framing that understates what the data actually shows (abandonment inside the first session). The report should be treated as a symptom list from a user's chair, not as an architecture audit.

## Real problems the report missed (visible from code/data)

1. `/api/learn-mode/progress` has never written a row: `LearnModeTab.jsx:224-235` posts `last_result` strings into a boolean column; 0 `lm-` rows in the DB. Learn Mode completion is localStorage-only, so the progress dashboard cannot reflect it, and any device/browser change loses it.
2. 24 of 43 sections have zero recall widgets (`index.json`: all Business units 2-4 plus Economics units 3-4, e.g. `revenue-costs-profits`, `market-structures-contestability`, `labour-markets`). Learn Mode is materially thinner for half the syllabus, which is the half exam-year students need.
3. Block-count vs flat-step mismatch (claim i) also corrupts the resume banner and saved progress: `StudyApp` saves `content.length` as total while `LearnModeTab` uses `flatSteps.length`; a saved step index can exceed the stored total.
4. PreTest can be skipped but the skip is not persisted: `PreTest.jsx:119` calls `onDone` without writing the localStorage key, so the gate reappears on every fresh load of that section until the student submits. This alone could explain a chunk of the 75% stuck-at-step-0 figure, since step 0 is where the gate lives (`LearnModeTab.jsx:249`).
5. PreTest draws from the whole 25-question bank, so 3 random questions frequently cover blocks the student has not reached; block-scoped `quizIndices` exist (`LearnModeTab.jsx:67`) and could scope it.
6. Reorder hint (`ReorderRecall.jsx:128`) reveals the first three characters of the first item, which is useless for items like "On the PPF curve..." and for lists that aren't sequences.
7. Business subject has no Diagrams tab at all (`StudyApp.jsx:33`) even though spec points like break-even, cash-flow and PLC are diagram-assessed; the Mistakes tab is Business-only for the reverse reason (`:37`).
8. Marketing overstates Economics coverage (24 vs 23 live) and repeatedly promises an "adaptive flashcard algorithm" / "adaptive difficulty" for practice (`app/business/page.js:355`) when the practice engine is a basic SM-2 queue with no difficulty model.
9. Fill-in "hints" (`FillInRecall.jsx:92`) show the hint text in the blank, and the word bank is visible from the start, so the exercise is often solvable by elimination rather than recall (e.g. `economics-as-a-social-science` bank: Positive / Normative / ought to).
10. Quiz content contains UK-domestic references ("UK inflation rate was 2.1% in 2023") for an explicitly IAL/international audience.