# Competitor guided-learning research for Revvy Learn Learn Mode redesign

## Method note
WebSearch + WebFetch, Sept 2026. Several primary pages (Quizlet help, Khan help, Brainscape help) returned 403 to the fetcher; where so, facts come from search snippets of those pages or third-party reviews and are marked (secondary). Codebase anchors below refer to /Users/arongijsel/Claude APP/economics-next.

## 1. Seneca Learning
- Chunk size: "bite-sized" sections; each section mixes short content cards (text, gif, image, video) with questions of many types (MCQ, fill-blank, word-order, image labelling). Reviewers describe it as "content-then-practice", with instant feedback. https://edtechimpact.com/products/seneca/ ; https://academiccoaching.co.uk/seneca-learning-review-your-complete-overview/
- Ratio reading:doing: high doing; every content card is followed by at least one question. Content is short enough that a section is a few minutes.
- Wrong answer: instant mark + correct answer; item is stored as a "wrong answer" for the section. Not every question is shown each pass, so 100% score can coexist with stored wrong answers. Repeating a section is "adaptive": re-weighted to your weak items. Premium "Wrong Answers mode" surfaces only your missed questions per topic under an "For you" area on the course overview. https://help.senecalearning.com/en/articles/3568906-what-is-wrong-answers-mode ; https://help.senecalearning.com/en/articles/3950895-the-number-of-wrong-answers-shown-isn-t-what-i-expected ; https://help.senecalearning.com/en/articles/3982758-how-can-students-repeat-a-section-on-seneca
- Progress/mastery: two separate numbers per section: Score (how you just did, 100% = all correct) and Memory Strength (long-term measure; deliberately CANNOT be maxed in one sitting; grows only by returning at the right time; tooltip shows optimal next-review time). Sidebar "best score" circles per section. https://help.senecalearning.com/en/articles/3568901-what-is-section-score-and-memory-strength
- Retention: Smart Learning mode tells you which section to repeat now (premium). Leaderboards, "questions answered / time spent" competition. Claims RCT of 65-105% test-score improvement. https://senecalearning.com/en-gb/igcse/
- Pricing/conversion: all core courses and adaptive learn mode free; free "cram mode" capped at 20 questions. Paid: Exam Boost (approx £12.99/mo per review), Amelia AI (£19.99/mo). Premium-only = Smart Learning mode, Wrong Answers mode, Quiz mode (questions without content), AI-marked exam questions, mini mocks, downloadable "flattened notes", predicted papers, Grade Guarantee add-on. Consumer premium currently UK-only. School plan ~£646/yr ex VAT for 600+ pupils. https://help.senecalearning.com/en/articles/2663301-what-is-premium ; https://help.senecalearning.com/en/articles/6036841-what-is-quiz-mode ; https://help.senecalearning.com/en/articles/13413714-seneca-for-schools-benefits-pricing-plans
- Takeaway: the free product is the whole learn loop; what is sold is the personalised routing layer (what to do next, what you got wrong) and exam-shaped output (AI marking, mocks).

## 2. Up Learn
- Chunk size: short focused videos with in-video activities ("pre-video quiz check questions" and "video quizzes"), then section quizzes, definition-recall sessions, progress quizzes, exam-technique videos, practice questions (800+ for Economics), examiner-reviewed papers. Recommends 30-min sessions with breaks, 5-20 hrs/week; whole course 16-35 weeks at 1 hr/day. https://help.uplearn.co.uk/en/articles/3746108-what-s-the-best-way-to-use-up-learn ; https://uplearn.co.uk/faq ; https://uplearn.co.uk/economics
- Mastery gating: answering the pre-video check questions correctly ticks off the video/section, so confident students skip content ("work only on content that needs your focus"). Completion is counted at 90% of course. https://help.uplearn.co.uk/en/articles/3746108-what-s-the-best-way-to-use-up-learn
- Wrong answer: not documented publicly beyond "adaptive algorithm identifies weak spots".
- Progress: "Up Score" / progress tracker "shows your predicted grade at every stage"; course activity dashboards. https://uplearn.co.uk/economics
- Retention: personalised schedule based on spaced repetition and time until exams (marketing claim). Tutor support on demand.
- Pricing/conversion: £49.99/mo rolling or "Access Until Exams" upfront; Up Core vs Up Master (marked papers, priority tutoring). Headline converter is the A*/A money-back guarantee conditional on 90% completion. https://uplearn.co.uk/pricing ; https://uplearn.co.uk/faq
- Takeaway: high-price, high-commitment product; conversion lever is a grade promise tied to completion, and the progress metric is expressed as a predicted grade, not a percentage.

## 3. Save My Exams
- Chunk size: spec-point revision notes (long-form, with examiner tips, diagrams, some video) plus separate topic questions (tiered difficulty), flashcards, past papers, mock exams, Target Test, and "Smart Lessons" on some subjects. Reading-heavy; doing is a separate tab. https://www.savemyexams.com/study-tools/revision-notes/ ; https://www.savemyexams.com/learning-hub/support/how-to-use-save-my-exams-revision-notes/
- Wrong answer: Target Test analyses performance and "tells you exactly what to study next"; Smart Mark AI marks short answers instantly (claims teacher-trained, examiner-verified). https://www.savemyexams.com/study-tools/target-test/ ; https://www.geniusfirms.com/blog/save-my-exams-review-is-it-worth-it-for-gcse-igcse-as-a-level-o-level/
- Progress/mastery: weak-area diagnostics from Target Test; no memory model.
- Retention: none built into the reading flow; reliance on the student coming back.
- Pricing: freemium with a monthly allowance of notes/questions; Essential ~£12/mo or ~£4/mo billed annually (secondary sources; SME says prices change). https://useaicademy.com/blog/save-my-exams-alternatives ; https://papamarks.com/blog/is-savemyexams-worth-it-igcse
- Criticism relevant to Revvy: "reading notes is an input activity; exams are an output task"; no tutor loop; free tier is "a taster". This is the direct competitor for IAL Economics/Business notes and it is weak on guided doing.

## 4. Quizlet Learn (Q-Chat retired)
- Chunk size: a "round" of a set; question types escalate (flashcard/true-false -> MCQ -> written). Setup asks for a test date, then runs a placement pass that re-ranks the deck from live answers rather than stored state. https://quizlet.com/blog/introducing-the-new-quizlet-learn ; https://learnclash.com/blog/does-quizlet-have-spaced-repetition
- Wrong answer: item is re-ranked as high-forgetting-probability and re-served later in the same session; within-session prioritisation rather than cross-day. Logistic model trained on ~1.5M answers; term->definition and definition->term tracked as separate facts.
- Progress: per-term familiar/mastered buckets; Memory Score on paid plans; free Learn does not persist state across sessions.
- Retention: test-date-driven pacing; paid spaced-repetition reminders.
- Pricing: free = 5 Learn rounds per set; Plus $35.99/yr = 20 rounds/month; Plus Unlimited $44.99/yr. Q-Chat retired June 2025; ChatGPT integration March 2026 generates cards. https://learnclash.com/blog/does-quizlet-have-spaced-repetition
- Takeaway: the metered unit is the adaptive round, not the content; free users get a genuinely useful but capped loop.

## 5. Brainscape
- Chunk size: one card at a time; user self-rates confidence 1-5 after reveal; sessions in Rounds (default 10 cards) ending on a Checkpoint screen that shows Mastery % and re-estimated "study time remaining". https://brainscape.zendesk.com/hc/en-us/articles/13103043051149-How-Does-Brainscape-s-Spaced-Repetition-Algorithm-Work ; https://brainscape.zendesk.com/hc/en-us/articles/17773783760141-Everything-you-need-to-know-to-study-effectively-in-Brainscape
- Wrong answer: there is no "wrong"; a rating of 1-2 brings the card back very soon, 4-5 pushes it far out. Metacognition is the point: each return asks "did my last rating predict this?" https://www.brainscape.com/academy/confidence-based-repetition-definition/
- Progress: Mastery = weighted average of confidence across the deck; shown only at Checkpoints (so mid-round there is no nagging number).
- Retention: short daily sessions recommended; no streak emphasis.
- Pricing: free CBR on own decks; Pro $19.99/mo, $9.99/mo semester, $7.99/mo annual, $199.99 lifetime; paywall is depth into certified decks and AI generation. https://www.brainscape.com/pricing ; https://softwarefinder.com/lms/brainscape/pricing
- Takeaway: confidence self-rating is a cheap, content-free way to get a per-item retention signal without writing more questions.

## 6. Duolingo
- Chunk size: lessons of ~3-10 minutes; difficulty ramps within a unit from recognition (tap) to production (type). Unit ends in a unit review; personalised practice lessons target your recent mistakes. https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/ ; https://blog.duolingo.com/guide-to-duolingo-practice-hub/
- Wrong answer: shown the correction immediately; the missed exercise is re-queued to the end of the same lesson so the lesson cannot end until it is answered correctly; mistakes feed a Mistakes practice pool. Hearts (lose one per mistake, 5 = must practise to earn back) are being replaced since mid-2025 by Energy (25 units/day, every question costs 1, refills from correct-answer combos, ads, gems, or over 24h; Super removes it). Rationale: stop punishing mistakes, cap session length, "fewer dropouts from mistakes"; reception among free users is negative. https://duoplanet.com/duolingo-energy-system/ ; https://www.classcentral.com/report/duolingo-breaks-hearts-for-energy/
- Progress: path of nodes with crowns; XP; leagues.
- Retention: streak (any lesson counts; decoupling streak from daily-goal completion raised 7+ day streaks by >40%); 7-day streak users are 2.4x more likely to return next day; Streak Freeze must be bought in advance (200 gems), not retroactively; notifications capped at 2/day, sent in the user's observed practice window ("routine" nudge vs "save your streak" alert); Streak Wager +14% D7 retention. https://www.digia.tech/post/duolingo-habit-forming-reminders-retention-architecture/
- Pricing: free with ads and energy cap; Super/Max remove energy and unlock Practice Hub review. The paywall is on friction removal and on review-of-mistakes, not on content.

## 7. Brilliant
- Chunk size: lesson = 2-4 sentence concept intro + illustration, then immediately a question using it; 10-25 problems in a 5-15 (up to 30) minute lesson; "15 minutes a day". Problem-first: often asks before it teaches. https://beginnersinai.org/brilliant-explained/ ; https://skillscouter.com/brilliant-review-math-science-coding/ ; https://brilliant.org/faq/
- Wrong answer: hint that nudges reasoning without revealing; then explanation; Koji digital tutor walks through step by step instead of giving the answer. Concepts you struggled with resurface as spaced review problems later in the course.
- Progress: per-course completion; recently learned skills; practice accuracy.
- Retention: daily streaks, leagues, progress tracking.
- Pricing: free = 2 "keys" per day, each key unlocks one lesson or practice set, sequential progression, ads, limited Koji; Premium removes limits. https://brilliant.org/faq/
- Takeaway: keys-per-day is a soft meter that lets free users complete real lessons daily; wrong answers get a hint before an explanation.

## 8. Khan Academy
- Chunk size: video (optional) + exercise of a handful of questions per skill; unit = skills, quizzes, unit test; course challenge at the end.
- Mastery levels: Not started -> Attempted -> Familiar (50 pts) -> Proficient (80) -> Mastered (100). Rules: 70-85% on an exercise -> Familiar; 100% on first attempt -> straight to Proficient; Familiar -> Proficient needs 100% on an exercise/quiz/test; Proficient -> Mastered ONLY via a unit test or course challenge; levels drop (Mastered with 70-99% -> Proficient; <70% -> Familiar; Proficient with any miss -> Familiar). Course mastery % counts only Proficient+Mastered. Mastery Challenges are short mixed reviews of skills already at Proficient. https://support.khanacademy.org/hc/en-us/articles/5548760867853--How-do-Khan-Academy-s-Mastery-levels-work ; https://support.khanacademy.org/hc/en-us/articles/115002552631-What-are-Course-and-Unit-Mastery ; https://support.khanacademy.org/hc/en-us/articles/360037494231-What-are-Mastery-Challenges
- Evidence: proportion of skills at Proficient+ correlates with MAP Growth; 30+ min/week associated with gains. https://blog.khanacademy.org/why-khan-academy-will-be-using-skills-to-proficient-to-measure-learning-outcomes/
- Pricing: free (nonprofit); Khanmigo AI paid.
- Takeaway: mastery is earned by later mixed testing, not by finishing the lesson; levels can go down, which is what makes them credible.

## Cross-product patterns (evidence summary)
1. Every product that has a guided mode puts a question within seconds of each content chunk (Seneca, Brilliant, Duolingo, Up Learn in-video checks). Reading-only products (SME) are criticised for exactly this.
2. Nobody blocks the start with a test. Placement is either invisible (Quizlet re-ranks from live answers; Seneca adapts on repeat) or opt-in and rewarding (Up Learn pre-video checks let you SKIP content; Khan 100% first-try jumps two levels).
3. Wrong answers are recycled inside the same session (Duolingo re-queue, Quizlet re-rank, Brilliant hint-then-retry) and collected into a personal pool (Seneca Wrong Answers, Duolingo Mistakes, SME Target Test). Punishing mistakes (hearts) is being abandoned.
4. Progress is two-layered: "how you did just now" vs "how well you know it over time" (Seneca Score vs Memory Strength; Khan levels that decay; Brainscape mastery from confidence). Completion alone is never the mastery signal.
5. Retention mechanics: streak counted by any activity, not full goal (Duolingo); reminders in the user's own habit window, max 2/day; due-review surfaced on the home/overview screen ("For you"), not buried.
6. Freemium boundary: content and the core loop are free; what is metered or paid is (a) the personalised routing layer (Smart Learning, Wrong Answers mode, Practice Hub), (b) exam-shaped output (AI marking, mocks, predicted papers), (c) friction removal (energy, keys, rounds). Grade guarantees (Up Learn, Seneca add-on) convert high-intent students.

## 8-12 design patterns Revvy Learn should adopt

1. Replace the PreTest gate with an optional "skip-ahead check". Evidence: Up Learn pre-video checks tick off content you already know; Khan 100% first-try jumps to Proficient; Quizlet's placement is invisible. Current code: components/LearnModeTab.jsx:34-40 and :249-253 gate step 0 behind 3 random MCQs from the section bank (components/learn-mode/PreTest.jsx:9-10), with no reward for passing. Live data: 75% of section starts never leave step 0 and introductory-concepts has 167/192 stuck at step 0, i.e. at the pretest. Make it "Already know this? Test out (3 Qs)" framed as skipping; a pass marks the matching blocks as Familiar and jumps past them; failing costs nothing and simply starts the lesson. Fits IAL Year 12s who arrive mid-year with partial school coverage and want to skip what they have done.

2. One idea, one question: shrink the step to a single NoteSection followed immediately by a question, Brilliant/Seneca style, instead of two sections per step with the quiz only on the block's last step. Evidence: Brilliant 2-4 sentence intro then a problem; Seneca question after every card; SME criticised for input-without-output. Current: LearnModeTab pairs 2 sections per step and only the last step of a block gets InlineQuiz/InlinePractice, so a 6-section block is ~3 screens of reading before any MCQ. Content already has per-section keyIdea/misconception/recall, so per-section questions can be generated from misconception (a "which of these is the misconception?" MCQ) without new authoring. Mobile-heavy Asian/ME users on 3-10 minute sessions need a doable unit under 3 minutes.

3. Hint before answer, then re-queue the miss. Evidence: Brilliant hint that does not reveal; Duolingo re-serves the missed exercise at the end of the lesson so it is answered correctly before completion; Quizlet re-ranks within session. Current InlineQuiz (components/learn-mode/InlineQuiz.jsx:28-42, :128-154) reveals the correct answer after 200 ms and shows a remediation MCQ only if question.remediation exists. Change: on wrong answer show the section's keyIdea as a hint and allow one retry before reveal; push the missed question into an end-of-block "clear your misses" mini-round. Do not add hearts; Duolingo has moved away from mistake penalties and reception of Energy is negative.

4. Make recall exercises content-appropriate and make them count. Evidence: Duolingo escalates recognition -> production; Brainscape's rating and Quizlet's written type both work because the item has a single right answer. Reorder only makes sense for genuine sequences (flow bodies, chains of reasoning like "rate rise -> hot money -> appreciation"); founder feedback that reorder asks for order where none exists matches this. Rule: reorder only where the section body contains a type:'flow' block; otherwise fillin against keyIdea terms or a definition->term card. Keep the "spaced" recall from the previous step (LearnModeTab.jsx:345-360) but drop the "immediate" bottom recall of the same section (LearnModeTab.jsx:397-403); immediate re-testing of what is on screen is the least valuable retrieval and doubles widget count per screen.

5. Two-layer progress: "Session score" and "Memory strength" per section, with levels that can go down. Evidence: Seneca Score vs Memory Strength (cannot max in one sitting); Khan Familiar/Proficient/Mastered with drop rules and Mastered only via a later mixed test; Brainscape mastery from confidence. Current app stores only currentStep/BLOCK count (StudyApp -> /api/progress/content) and the learn-mode progress endpoint has never written (app/api/learn-mode/progress/route.js:37,57 write strings into a boolean last_result). Define: Familiar = completed the lesson; Proficient = 100% on the PostTest; Mastered = correct in a later due-review or a mixed QuickFire; any due-review miss drops a level. Show on the section list/sidebar as Seneca-style circles. This is the metric that a Year 12 taking Units 1-2 only can watch move across ~30 sections per unit and that a parent can understand.

6. Surface due reviews and wrong answers on the landing/overview, not inside a section. Evidence: Seneca "For you" area with Wrong Answers and Smart Learning suggestion; Duolingo Practice Hub/Mistakes; SME Target Test tells you what to study next. Current: revvy_review_schedule lives in localStorage (LearnModeTab.jsx:200-210) and due reviews are checked on mount and auto-launched (StudyApp.jsx:319-337) which interrupts rather than invites; localStorage means it is lost across devices/phones. Persist the schedule server-side, show a "3 reviews due (approx 4 min)" card at the top of the subject page, and add a "My misses" pool built from InlineQuiz/PostTest wrongs. This is the natural premium upsell layer (Seneca charges for exactly this).

7. Confidence self-rating on the TakeawayCard and on flashcards. Evidence: Brainscape CBR: a 1-5 rating drives spacing and calibrates metacognition; needs no extra content. Add "How sure are you? 1-5" on each takeaway and on the PostTest explanation reveal; use it to weight the 1/3/7/14 schedule (rating 1-2 = 1 day, 4-5 = skip to 7). Cheap to implement, gives per-item signal for every free user.

8. Exam-shaped completion: Explain-It-Back and InlinePractice should use IAL command words and mark bands. Evidence: Seneca charges for AI-marked exam questions; SME Smart Mark is its "standout innovation"; Up Learn sells marked papers and examiner-reviewed papers. Content already has command_words.json and practice[] with marks; ExplainItBack is currently free-text graded only for premium (LearnModeTab.jsx:390-391). Keep AI grading premium but give free users a self-mark against a 3-bullet indicative content list derived from practice[].answer/markscheme so the free loop still ends in output, and make the AI-marked version the visible upgrade moment ("see how an examiner would mark this").

9. Session sizing and a "next up" rail for 3-10 minute mobile sessions. Evidence: Duolingo 3-10 min lessons; Brilliant 15 min/day; Up Learn 30-min sessions; Brainscape rounds of 10 with a Checkpoint. Present each block as a card with an estimated minutes badge (sections x ~1 min + questions), and end each block with a Checkpoint screen (score, memory strength change, "next block: X, 4 min" / "stop here, review due Thursday"). Do not require finishing the whole section to bank progress; currently CompletionScreen only fires at section end, and median activity span is ~1 hour total, so most users never see any completion reward.

10. Streak counted by any activity plus reminders in the user's own time window. Evidence: Duolingo: streak extended by any lesson (+40% 7-day streaks), 7-day streak users 2.4x more likely to return, max 2 notifications/day timed to the observed practice window, streak freeze bought in advance. For HK/SG/KR/PK/ME users, timezone-correct reminders are critical: compute the window from last activity timestamps stored server-side (user_content_progress updated_at already exists) and send via email/push at that local hour, never a fixed UTC time. A "3 days in a row" badge on the subject page is enough; skip leagues (low user count, ~211 users, would expose emptiness).

11. Test-date-driven pacing. Evidence: Quizlet asks for the test date at Learn setup; Up Learn schedules by time to exams; Up Learn/Seneca guarantee tied to completion. Ask once for the exam series (Jan/June, Units 1-2 vs 1-4) and show "N sections to Proficient, M study days left, ~X min/day". IAL students sit units in January and June, so a UK-style single May/June assumption is wrong.

12. Freemium boundary aligned with the market: keep the full learn loop free (Seneca, Duolingo, Brilliant all do) and meter or charge the personalisation and exam-output layers: Wrong-answers pool and due-review scheduling beyond N sections, AI marking, mocks/predicted-style papers, downloadable flattened notes. Evidence: Seneca premium list; Quizlet rounds cap; Brilliant 2 keys/day; SME criticised because "the real content is paid". Current gating (flashcards/quiz/extras preview-then-paywall) puts the paywall on the doing rather than on the routing; live data of 40 free/cancelled vs 16 premium suggests the current wall is hit before value is felt.

## Strengths of the current Learn Mode versus competitors (keep)
- Per-section misconception + examMatters + realExample fields are richer than Seneca's card text and are exactly what SME notes have that students pay for.
- Spaced recall from the previous step (LearnModeTab.jsx:345-360) is a genuine interleaving pattern none of the reading-first competitors have.
- Inline diagrams tied to blocks (InlineDiagram/DiagramLabelDrill exist) is a differentiator for Economics; the fix is to make the label drill the default interaction, not the passive image.
- 1/3/7/14-day schedule and PostTest-vs-PreTest delta already implement the Seneca "memory strength" idea; it just needs to persist server-side and appear on the overview.

## Sources
- https://help.senecalearning.com/en/articles/3568901-what-is-section-score-and-memory-strength
- https://help.senecalearning.com/en/articles/3568906-what-is-wrong-answers-mode
- https://help.senecalearning.com/en/articles/3950895-the-number-of-wrong-answers-shown-isn-t-what-i-expected
- https://help.senecalearning.com/en/articles/3982758-how-can-students-repeat-a-section-on-seneca
- https://help.senecalearning.com/en/articles/2663301-what-is-premium
- https://help.senecalearning.com/en/articles/6036841-what-is-quiz-mode
- https://help.senecalearning.com/en/articles/13413714-seneca-for-schools-benefits-pricing-plans
- https://academiccoaching.co.uk/seneca-learning-review-your-complete-overview/
- https://edtechimpact.com/products/seneca/
- https://senecalearning.com/en-gb/igcse/
- https://help.uplearn.co.uk/en/articles/3746108-what-s-the-best-way-to-use-up-learn
- https://uplearn.co.uk/faq
- https://uplearn.co.uk/economics
- https://uplearn.co.uk/pricing
- https://www.savemyexams.com/study-tools/revision-notes/
- https://www.savemyexams.com/study-tools/target-test/
- https://www.geniusfirms.com/blog/save-my-exams-review-is-it-worth-it-for-gcse-igcse-as-a-level-o-level/
- https://papamarks.com/blog/is-savemyexams-worth-it-igcse
- https://useaicademy.com/blog/save-my-exams-alternatives
- https://quizlet.com/blog/introducing-the-new-quizlet-learn
- https://learnclash.com/blog/does-quizlet-have-spaced-repetition
- https://brainscape.zendesk.com/hc/en-us/articles/13103043051149-How-Does-Brainscape-s-Spaced-Repetition-Algorithm-Work
- https://brainscape.zendesk.com/hc/en-us/articles/17773783760141-Everything-you-need-to-know-to-study-effectively-in-Brainscape
- https://www.brainscape.com/academy/confidence-based-repetition-definition/
- https://www.brainscape.com/pricing
- https://softwarefinder.com/lms/brainscape/pricing
- https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/
- https://blog.duolingo.com/guide-to-duolingo-practice-hub/
- https://duoplanet.com/duolingo-energy-system/
- https://www.classcentral.com/report/duolingo-breaks-hearts-for-energy/
- https://www.digia.tech/post/duolingo-habit-forming-reminders-retention-architecture/
- https://brilliant.org/faq/
- https://beginnersinai.org/brilliant-explained/
- https://skillscouter.com/brilliant-review-math-science-coding/
- https://support.khanacademy.org/hc/en-us/articles/5548760867853--How-do-Khan-Academy-s-Mastery-levels-work
- https://support.khanacademy.org/hc/en-us/articles/115002552631-What-are-Course-and-Unit-Mastery
- https://support.khanacademy.org/hc/en-us/articles/360037494231-What-are-Mastery-Challenges
- https://blog.khanacademy.org/why-khan-academy-will-be-using-skills-to-proficient-to-measure-learning-outcomes/