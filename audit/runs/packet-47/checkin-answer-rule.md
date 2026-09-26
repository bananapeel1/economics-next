# Packet 47: the check-in answer rule (CONTENT-GATE.md, "BLOCKING, 26 September 2026")

Section: `business__global-markets-expansion`, **staged draft** only. Reviewer: read-only. Run on 26 September 2026, about 09:10 to 09:20 UTC.

## Method actually used

1. **What is served.** I fetched `curl --max-time 20 'http://localhost:3001/api/sections/global-markets-expansion?draft=1'` as a signed-out request (`isPremium: false`, 5 blocks, 5 diagrams, 8 quiz items, `counts.quiz` 30). I compared it to `audit/snapshots/packet-47-bundle__business__global-markets-expansion.json` with a key-order-insensitive deep compare. The diagrams are identical. The blocks are identical except `quizIndices`, which `freeQuizPayload()` rewrote. Each of the 8 served quiz items is identical to its bundle item with the same id. I fetched it again at the end and content, diagrams and quiz were unchanged.
2. **Which check-in shows what.** I did not rebuild the placement logic. I imported the shipping `buildSteps` (lib/learn-steps.js) and `placeChapterItems` (lib/checkin-placement.js), the same function `LearnModeTab.jsx` calls for `diagramMap` and `quizMap`. I ran them twice: once on the served signed-out payload, and once on the bundle's full content and 30-item bank (the Pro case). A check-in renders `diagramMap[step]` (`InlineDiagram`) and then `quizMap[step]` (`InlineQuiz`), and it shows one quiz item: the first unclaimed pin. No other component reads `quizIndices`/`quizIds` (checked with grep over components/ and lib/). So the remaining pins in each block's list (for example 4 to 8 in block 0) are never shown at a check-in, and I did not judge them.
3. **Text read.** For each check-in I took from the served JSON the diagram's `title`, `description`, every `checklist` line, every view `label`, and every SVG `<text>` string (tspans flattened). I also searched each SVG for `<title>`, `<desc>`, `aria-label`, `data-*`, and text outside `<text>`: there is none. The diagrams have no `imageUrl`, `kind` or top-level `svg`. Then I read the question, all four options and `correctIndex`, and judged the pair as a reader. I ran no word-overlap or other automatic test.
4. **On screen.** I used the Browser pane in a new tab at 390x844, signed out, on `/business/unit-4/global-markets-expansion?draft=1` (hub shows "22 steps"). I read all five check-ins (steps 5, 9, 13, 18 and 22 of 22) from the DOM, including both views of the two-view diagrams. I took screenshots of steps 5 and 22. What the page rendered matched the JSON for every check-in: diagram title, description, view labels, SVG text, checklist and question stem. The option order is shuffled on screen, but the options are the same.

## Pairing: signed-out served vs full bank (Pro)

The two pairings are **identical**. In every block the first pin of the full bank (indices 3, 9, 14, 19, 25) and the rewritten signed-out pin (0 to 4) resolve to the same quiz id. Every diagram resolved by `pin` (`diagramId`), with no title fallback.

| Block | Check-in (flat step / "n of 22") | Diagram id | Quiz item id | Signed-out idx | Pro idx | Verdict |
|---|---|---|---|---|---|---|
| 0 Conditions That Prompt Trade | 4 / 5 of 22 | `…:diagram:c6ab633b` | `…:quiz:507ffc71` | 0 | 3 | clean |
| 1 Assessing a Country as a Market | 8 / 9 of 22 | `…:diagram:229d51a0` | `…:quiz:17831df6` | 1 | 9 | clean |
| 2 Assessing a Country as a Production Location | 12 / 13 of 22 | `…:diagram:aa51f35f` | `…:quiz:10a4d053` | 2 | 14 | clean |
| 3 Global Mergers, Takeovers and Joint Ventures | 17 / 18 of 22 | `…:diagram:6cac4f83` | `…:quiz:a88809ec` | 3 | 19 | clean |
| 4 Global Expansion and Uncertainty | 21 / 22 of 22 | `…:diagram:9d07d515` | `…:quiz:27c7aecc` | 4 | 25 | clean |

(`…` = `global-markets-expansion`.)

## Per check-in evidence

**Block 0: clean.**
- Diagram "Why Firms Sell and Produce Abroad" has two views, "Extending the life cycle" and "Where and who". Its text covers product life cycles at home and abroad ("Growth abroad offsets the decline at home") and the in-house / off-shoring / outsourcing / "Both at once" grid. The checklist has the same content.
- Question: fixed costs $2m, variable cost $10, output 100,000 to 200,000, so what happens to average cost? Correct answer: "from $30 to $20".
- Why clean: no diagram string mentions fixed cost, average cost, economies of scale or any of these figures. The diagram teaches a different part of the chapter from the one the question tests.

**Block 1: clean.**
- Diagram "Assessing Belmar as a Market" has two views. "Five forces" shows force ratings. "Income now and later" shows "$9,000" to "$9,942" for "Tarsia: +1% a year" and "$4,000" to "$7,869" for "Belmar: +7% a year".
- Question: $5,000 growing at 10% a year, so what is it after two years? Correct answer: "$6,050".
- Why clean: the diagram's figures, rate and period are all different. It gives the ten-year results but never states the compounding rule or anything that picks $6,050 over $6,000 or $6,100. The student has to do the calculation, which is the "same concept, its own numbers" model the rule prescribes.

**Block 2: clean.**
- Diagram "Delivered Cost at Two Sites". Checklist: "Inside the bloc: $6 + $10 + $1 = $17" and "Outside it: $4 + $10 + a $1.40 tariff + $2 = $17.40". SVG: "$17 delivered", "$17.40 delivered", "Labour / Other costs / Tariff / Freight".
- Question: labour $4, other costs $8, a 25% tariff on those two, freight $1, so what is the delivered cost? Correct answer: "$16".
- Why clean: the diagram models what makes up delivered cost with different figures and a tariff given as an amount. The question needs its own percentage worked out ($12 × 25% = $3) and freight added. No diagram string states $16, $15 or the 25% step.

**Block 3: clean.**
- Diagram "Mergers, Takeovers and Joint Ventures". Its description says it shows "what exists after each of the three ways firms combine". SVG: "Merger … One firm", "Takeover … Buyer controls", "Joint venture … New shared firm", "Only a joint venture leaves both parents trading".
- Question: a 49% cap on foreign ownership of banks, so what is the reason for a joint venture? Correct answer: "a government or legal requirement".
- Why clean: the question asks why a firm forms a joint venture, and the diagram only shows what each structure is afterwards. No diagram string mentions law, government, ownership caps or any reason for combining, so it does not separate the correct option from "economies of scale", "patents" or "reducing competition".

**Block 4: clean.**
- Diagram "One Appreciation, Two Effects". SVG: "The dollar rises 25%", "$1 = 4 units becomes $1 = 5 units", "A $50 cooker abroad" going from "200 units" to "250 units" and labelled "dearer for buyers", an imported part going from "$15" to "$12" and labelled "cheaper for the firm". Checklist: "At an unchanged dollar price, the cooker rises from 200 units to 250 units abroad".
- Question: $1 = 2 becomes $1 = 2.5, so what does a $40 export cost buyers abroad? Correct answer: "100 units". The distractors are 80, 20 and 16.
- Why clean: the diagram uses different rates and a different price. The student still has to convert $40 × 2.5 themselves, and no diagram string states 100.
- Observation, not a leak: "dearer for buyers" gives the direction of the change. That rules out 20 and 16, but it does not separate 100 from 80 unless the student works out the old price ($40 × 2 = 80). I record it so the orchestrator can weigh it; by the rule's test (could a student answer from the diagram alone?) I judge it clean.

## On-screen notes (390x844)

- **The checklist was not collapsed.** In this dev build, `InlineDiagram` renders "What a correct diagram shows" as an always-visible `<div class="diagram-checklist">` with no toggle. It measured 272px, 252px, 183px, 183px and 204px tall at the five check-ins. So there was nothing to open. The rule's statement "collapsed by default since PR #35/#36" does not hold on this worktree's server, but either way I read every line.
- **Side effects of the browser pass:**
  - Before I installed an in-page guard, one `POST /api/events` returned 204. It was an anonymous funnel event from the first page load, so it may have inserted one row into `app_events`.
  - After the guard, every non-GET request to `/api/` was blocked in that tab, 85 in all (`/api/events`, `/api/learn-mode/state`, and the Umami send).
  - The browser pane's localStorage for this section was already marked complete, so I pressed "Retry this topic", which reset it locally. I made no other writes.
  - I closed my tab afterwards. I did not touch the pane's existing "seed" tab.

## Not measured

- I checked no section other than `global-markets-expansion`, and no surface other than the check-in diagram and quiz pair.
- I did not judge the explain-it-back, practice, spaced recall or calculation slots. Those are outside this rule.
- I did not judge quiz pins that are never served at a check-in.
- I derived the Pro pairing by running the shipping placement code on the bundle. I did not observe a signed-in Pro session on screen.

VERDICT: CLEAN
