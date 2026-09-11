STRENGTHS (keep these)
- Prose quality of content is high. Every section in economics__introductory-concepts.json has keyIdea, a "misconception" card with an "Instead write:" correction, and an examMatters card that names mark-scheme requirements (e.g. "Scarcity, Choice and Opportunity Cost > the-basic-economic-problem": "A 2-mark definition must include 'unlimited wants' and 'finite resources'"). That is exactly the exam-literate framing IAL students lack.
- Examples are international and mostly well chosen for the audience (Singapore, Saudi NEOM, South Korea, China 1990, Zimbabwe 2008, Foxconn). Exceptions: Bank of England/Brexit, NHS, ONS, HS2 in block 0-1 are UK-domestic and land poorly in HK/Karachi.
- Quiz explanations frequently explain the distractors, not just the key (quiz[3], [7], [11], [13]). This is better than most commercial banks.
- InlineQuiz already has a confidence prompt and a `remediation` slot (InlineQuiz.jsx:15-16, 149-180). The skeleton for calibration and remediation exists.
- Worked → guided → independent fading (LearnModeTab.jsx:125-132) is the right instinct (worked-example effect).
- extras.chains are genuine 4-link causal chains with a "result" line (e.g. "Scarcity forces choice and opportunity cost"). These are the best retrieval material in the section and they are paywalled and unused by Learn Mode.
- Diagram 0 (PPF) has three scenarios and a mark-scheme checklist ("Axes clearly labelled…"). Good asset, currently passive.

WHAT A STEP ACTUALLY IS (cognitive load)
- LearnModeTab.jsx:48-75 pairs 2 sections per step. Every block in this section has exactly 2 sections, so every step is simultaneously isFirstInBlock and isLastInBlock, i.e. every step carries the full end-of-block payload. One step renders: previous block's fill-in (top) + section A (h2 title, then NoteSection repeats it as h3 at NoteSection.jsx:12, keyIdea, 3-4 paragraphs, flow, example, misconception, examMatters) + section B (same) + diagram (step 3) + MCQ + practice card + collapsed Explain It Back + takeaway (3-4 bullets) + section A's reorder. That is ~20-24 discrete cards and roughly 1,100-1,400 words before the first "Next". Step 1 is preceded by the pre-test gate. 167 of 192 users stalling at step 0 on this exact section is the predictable outcome of gate + wall, not a mystery.
- Recall placement is wrong within the step: section A's recall is rendered at the bottom of the step (LearnModeTab.jsx:398) after section B, the MCQ, the practice card and the takeaway. Block 1's takeaway bullet literally says "Always link the chain: scarcity → choice → opportunity cost" directly above the reorder whose answer is that chain. Block 4's takeaway restates the price-mechanism functions above the fill-in for signal/incentive/ration. The "retrieval" is copy-from-screen.
- Section B's recall is shown at the top of the next step (LearnModeTab.jsx:355), and the final section's recall ("Economic Systems > the-price-mechanism" fill-in) is never shown at all. Each recall item is presented exactly once in the student's lifetime.

RETRIEVAL PRACTICE: recognition, not generation
- FillInRecall.jsx:12,100-112: the word bank contains only the 3 correct answers, no distractors. It is a 3-item matching puzzle solvable by elimination. "positive-and-normative": bank {Positive, Normative, ought to} into "___ statements can be tested with evidence" — the one lowercase two-word chip cannot go in the first slot. "the-price-mechanism": bank {signal, incentive, ration} into a template that names them in the same order the body's flow did. Hints (FillInRecall.jsx:92) give the first letters on top.
- ReorderRecall: 4 items, tap-to-swap, "Show hint" reveals the first 3 letters of item 1. Feedback is "2 of 4 in the right position" plus the correct order (ReorderRecall.jsx:115-124). Nothing explains WHY the order is what it is.
- InlineQuiz: 4 MCQs for the whole section (quizIndices [0],[1],[2,3],[4]; LearnModeTab.jsx:107 takes only the first unused index, so quiz[3] is never shown; block 4 has none). 25 questions exist. remediation: 0 of 25 quiz items have it.
- InlinePractice.jsx has no text input in any mode. "Independent" mode is a "Reveal mark scheme" button. Explain It Back is collapsed by default (ExplainItBackUpgraded.jsx:9 expanded=false). Net: a student can complete this 30-minute topic having typed zero words. That is the single biggest gap for a subject examined entirely by writing.
- Practice question routing is broken: LearnModeTab.jsx:80 sorts practice by marks, then :111 indexes the SORTED array with the author's practiceIndices. For this section, sorted = [4 define OC, 4 outline assumptions, 6 explain, 10 assess PPF, 20 evaluate]. So block 1 gets the OC definition (correct, shown as "worked"), block 2 (PPF) gets "Outline two assumptions commonly made when constructing economic models" (guided), block 4 (Economic Systems) gets "Explain two reasons why the basic economic problem is relevant…" (independent). The 10-mark PPF Assess and 20-mark Evaluate never appear in Learn Mode. "Outline" is also not an IAL Economics command word.

THE FIVE REORDER ITEMS: which are real chains
1. "The Nature of Economics > economics-as-a-social-science": Observe human behaviour → Build a simplified model → Apply ceteris paribus → Isolate the variable of interest. ARBITRARY. Items 3 and 4 are the same act (applying ceteris paribus is how you isolate the variable), and "build model" vs "apply ceteris paribus" has no defensible order since the assumption is part of building the model. The body never presents this as a sequence, and notes[0].flow gives a different 4-step version ("…→ Predict outcome"), so the content itself is inconsistent about the "right order".
2. "Scarcity, Choice and Opportunity Cost > the-basic-economic-problem": Unlimited wants exceed finite resources → Scarcity exists → Choices must be made → Opportunity cost is incurred. GENUINE. This is the spec's core causal chain, examMatters demands it, extras.chains[0] is the same chain. Keep, but it is spoiled by the takeaway shown above it.
3. "Production Possibility Frontiers > the-ppf-model": On the curve → Inside → Outside → Slope. ARBITRARY. Four independent facts about a diagram. There is no temporal or causal relation; any order is equally correct. This should be a match-point-to-meaning or click-the-diagram task.
4. "Specialisation… > specialisation-and-division-of-labour": Workers specialise → Skills improve and time saved → Productivity rises → Higher output per worker but risk of monotony. MOSTLY GENUINE. Links 1-3 mirror the body flow and are causal. Link 4 restates link 3 ("higher output per worker" = "productivity rises") and bolts an evaluation onto it; it is a conclusion, not a step.
5. "Economic Systems > free-market-command-and-mixed": What to produce? → How? → For whom? → Market, command or mixed economy answers these. ARBITRARY. The three questions are a conventional listing, not a sequence; item 4 is a meta-statement about items 1-3.
Verdict: founder is right for 3 of 5. Root cause is structural, not editorial: meta shows reorder=5, fillin=5 and the section list alternates reorder/fillin by section position regardless of whether the content contains a sequence. DB-wide it is 131 reorder / 141 fillin, so the same template runs everywhere. Rule to adopt: generate a reorder ONLY from a body `flow` with ≥3 steps or from an extras.chains entry; everything else gets a different exercise type.

PRE-TEST
- PreTest.jsx:7-11 draws 3 random from 25. The pool includes quiz[8] free goods, quiz[15] capital as a factor, quiz[24] entrepreneur/profit, none of which the section content teaches (factors of production get one parenthetical mention). A student can be pre-tested on material the lesson never covers.
- The pretesting effect (Richland/Kornell/Bjork) requires the pretest item to target content that follows soon after. Here the relevant block may be 25 minutes and 20 cards away, or absent.
- PreTest.jsx:89-91 reveals the correct answer with colour but renders no `explanation`. Worst of both: it spoils PostTest (same 3 items, PostTest.jsx:26) without teaching. "Test your improvement" measures memory of the revealed letter.
- At 0/3 the copy is "Perfect — your brain is now primed" (PreTest.jsx:134). Students read this as sarcasm. There is a skip link, but the gate is still the first screen of a brand-new topic.
- recordPretest writes pretestScore into strength (0 at 0/3), so a brand-new learner's first data point is a zero.

SPACING: nothing is spaced except MCQs, and only in localStorage
- The "spaced" recall at LearnModeTab.jsx:354 is the previous step, i.e. minutes earlier in the same session. Not spacing.
- Real spacing exists only in revvy_review_schedule (LearnModeTab.jsx:199-210): 5 random MCQs, intervals [1,3,7,14], localStorage only. ReviewMode.jsx:advanceReview caps at index 3 so a mastered topic re-fires every 14 days forever; a fail moves back one interval instead of resetting. No recall widgets, chains, or writing are ever spaced. Nothing syncs across devices; international students who alternate school laptop and phone lose the schedule.
- lib/strength.js: base = 20 + 15×reviews + 20×quizAccuracy + 10×pretest, decays 0.85^days regardless of review count. Completing Learn Mode calls recordReview(null) (LearnModeTab.jsx:214) → base 35 (amber); after 24 hours 35×0.85 = 29.75 → red. The day after finishing a topic it is red. A topic reviewed 5 times decays exactly as fast as one reviewed once, which inverts the whole point of spacing (stability should grow with successful retrievals). Inline quiz accuracy is never written into strength (only later review scores are).

INTERLEAVING
- None within Learn Mode. MixedReview (ReviewMode.jsx:181) pulls 10 MCQs from completed sections after ≥3 completions. That is the only interleaving, MCQ-only, and gated behind a completion count most users never reach (15 completions out of 192 starts).

ELABORATION
- Explain It Back is the only elaborative task and is (a) collapsed, (b) for free users a textarea with no button at all, because StudyApp.jsx:696 passes onAskTutor=null when !isPremium, so the `onAskTutor && !isPremium` branch at ExplainItBackUpgraded.jsx:81 never renders; (c) for premium, graded by Gemini with only the block title as context (grade-explanation/route.js:57-58): no keyIdea, no takeaway, no misconception, no spec point. The grader has no rubric and the system prompt says "Edexcel A-Level", not IAL. (d) scores.explain is never incremented: onExplainAttempt is defined at LearnModeTab.jsx:45 and never passed anywhere, so CompletionScreen always shows Explain It Back 0/1 at "20% weight".
- No "why does this happen" prompts, no compare/contrast (e.g. shortage vs scarcity is taught in prose but never asked).

FEEDBACK QUALITY
- MCQ: good (explanation text). Reorder/fill-in: answer only, no reasoning. Pre-test: answer only, no explanation. Practice: mark scheme reveal with no reference to what the student wrote, because nothing was written. Spaced review: explanation shown. So the best feedback is attached to the least generative task.

METACOGNITION / CALIBRATION
- InlineQuiz confidence is asked AFTER the reveal (answered → revealPhase 2 at 200 ms, confidence row appears on `answered`) so it is hindsight-contaminated. It auto-dismisses after 4 seconds (InlineQuiz.jsx:20-26). It is written to revvy_confidence_* and read by nothing. High-confidence errors, the most valuable signal for scheduling (hypercorrection effect), are thrown away.

TRANSFER TO THE IAL EXAM
- WEC11/12 Section A pairs every MCQ with a 4-mark explanation; Section B is a data response climbing from 2-4 marks to 14/20-mark evaluate. Learn Mode trains: standalone MCQ (never asked standalone in IAL), tap-to-reorder, drag words. It never trains: writing a chain of reasoning, applying to a data stem, drawing or labelling a diagram, evaluating, or doing any of it under time. QuickFireDrill adds a 15 s timer to MCQs, which trains the wrong skill faster.
- Diagram: passive SVG with scenario tabs. The checklist ("Points on, inside and outside correctly identified") is a task waiting to happen and is shown as text.
- The 10- and 20-mark questions are dropped by the sorting bug above; the worked example for the 4-mark definition is a decent AO1 model, but there is no AO3/AO4 model anywhere in the flow.

MOTIVATION
- Gate at 0/3 with "Perfect". Both recall widgets have an × (ReorderRecall.jsx:75, FillInRecall.jsx:66) with no consequence; dismissed items are simply not counted. "Complete topic" is enabled on the last step regardless of interaction; ArrowRight through 5 steps in 10 seconds yields "Topic complete", a review schedule, and a strength score. Completion is therefore not a signal of anything, and the strength meter then turns red the next day.
- Progress is "Step 1 of 5 — 20%" where each step is a 6-minute wall. No sub-step progress, no interaction cadence.

IDEAL STEP ANATOMY: one IAL sub-topic, ~7 minutes, ONE section per step
Target: ≤7 cards visible at once, ≤350 words of reading before the first interaction, an interaction every ~90 seconds, nothing dismissable without a cost, every card typed by AO.
1. Orient (10 s). Spec code + the exam task as the goal, phrased as a real question: "By the end: explain, using a PPF, why moving from inside the curve to the curve is not growth (6 marks)."
2. Predict (30 s, AO1). ONE question drawn from THIS section's quiz items (the block's own quizIndices), confidence captured before answering, answer NOT revealed. Copy: "Guess — we check this at the end." This is the actual pretest effect design and replaces the 3-question gate.
3. Teach (2 min). keyIdea, ≤3 paragraphs, one flow, one international example, misconception. Move examMatters to card 6.
4. Retrieve, generative (60 s, AO1/AO2). Typed, not word-bank: "Define opportunity cost (2 marks)" with keyword check (must contain next-best/forgone; hints reveal one keyword at a time), or cued chain completion "scarcity → ? → ?" typed. Reorder only where a flow/extras.chain exists, with 1-2 distractor links so elimination does not solve it.
5. Chain-build (90 s, AO3). Given the section's real example as the stem (NEOM $500bn), build a 3-4 link chain: choose links from a bank of 6 (4 correct, 2 reversed-causality distractors), or type the links. Feedback names the function of each link (cause → mechanism → effect) and shows the model chain from extras.chains. For diagram sections: click-the-point/label-the-axis task first, using the diagram checklist as the marking criteria.
6. Exam moment (60-90 s, AO2/AO4). Data-stem prompt, 2-3 sentences typed: "Using the Saudi example, explain one opportunity cost of NEOM." For evaluate-type sections: "Give one reason this might not hold." Free: self-mark against 3 mark-scheme checkboxes from the practice guidance (a judgement-of-learning that costs nothing). Premium: AI grade with keyIdea + takeaway + guidance passed as the rubric, "IAL" in the prompt. Worked/guided/independent fading applies to THIS card across the block's sections, and independent must still have a text box.
7. Resolve (30 s). Reveal the predict answer with explanation; show calibration ("you said certain and were wrong: scheduled for tomorrow").
8. Takeaway + schedule (20 s). 1-3 bullets. Items answered wrong or with high-confidence error enter the spaced queue at 1 day; correct items at 3 days. Show "next review: Thursday", not a decaying number.
Block level: after 2-3 sections, one interleaved mini-set (3 items from earlier sections in this unit) and the block's higher-mark question (8-10 marks) with a model answer structured by AO. Unit level: the 20-mark evaluate with plan-then-write scaffold and a timer.

TOPIC MASTERY DEFINITION
Mastery is evidence per spec sub-point across time, never "steps visited". Store server-side, not localStorage.
- States: Seen (content read, any interaction) → Practised (AO1 retrieval correct immediately) → Retained (AO1 retrieval correct ≥1 day later, un-cued/typed) → Mastered (retained again at ≥7 days AND one AO3 chain built with ≤1 hint at delay AND, for evaluate-tagged sections, one written AO2/AO4 answer self-marked ≥2/3 or AI-graded ≥partial) → Lapsed only when a scheduled review is failed or missed by more than 2× its interval, never by the clock alone.
- Scheduling: interval grows ~×2.5 per successful delayed retrieval (1, 3, 7, 18, 45 days), resets to 1 on failure; high-confidence errors get the shortest interval. Strength shown as "3 successful recalls, next due Thu", colour by state, not by 0.85^days.
- Completion of a section requires: every non-dismissed exercise attempted (dismiss allowed but the item is queued for tomorrow), ≥1 typed answer, predict question resolved. Arrow-keying through does not complete.
- Unit readiness = share of sections at Retained+ plus one timed 10/20-mark answer attempted in the last 14 days.

QUICK FIXES THAT UNBLOCK THE ABOVE
- LearnModeTab.jsx:80/111: stop sorting practice before indexing (or index the raw array); this alone restores the 10/20-mark questions.
- Move the immediate recall to directly after its section and above the takeaway; render the last section's recall.
- Remove the duplicate title (LearnModeTab.jsx:367 vs NoteSection.jsx:12).
- Wire onExplainAttempt; pass section keyIdea/takeaway/guidance to the grader; "IAL" in the prompt.
- Ask confidence before reveal and stop the 4 s auto-dismiss; feed it into the schedule.
- Add 2 distractors to every fill-in bank; regenerate reorders only from flows/extras.chains.
- Replace the 3-MCQ gate with one per-block predict question; never reveal without explanation.
- Replace 15%/day decay with interval-based stability; write inline quiz results into strength.