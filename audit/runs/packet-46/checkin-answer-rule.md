# Check-in answer rule: packet 46, `economics__growth-development` (IAL 4.3.6)

Read-only verifier, 26 Sep 2026, 08:55 to 09:05 UTC. The rule is `audit/CONTENT-GATE.md:269-300`, applied as Verify A with the Verify B clause. The section went live at 08:50 UTC. I edited no content, code, ledger or handoff file. This file is my only write to the repo.

**Result: 7 check-ins carry both a diagram and a quiz item. 7 items were judged. 0 `leaks`.**

## Method

**Which item each check-in shows. I read main's code, via `git show origin/main:<path>`.**
- `components/LearnModeTab.jsx:282` calls `placeChapterItems`. `:602-604` take `diagramMap[step]` and `quizMap[step]`. `:813-818` render the diagram first and the quiz below it.
- `lib/checkin-placement.js:37-53` handles the pinned path. For each check-in it resolves the diagram with `resolvePinnedDiagram` (by id) and the quiz with `resolvePinnedItem`.
- `lib/learn-steps.js:66-76` copies `diagramId` and `quizIndices` onto each check-in step.
- `components/learn-mode/utils.js:111-113` (`resolvePinnedItem`) returns the **first** pinned index that no earlier chapter has used, and only that one.
- Each chapter's pin list is disjoint from the others (ch1 `[3..7]`, ch2 `[8..13]`, ch3 `[14..18]`, ch4 `[19..23]`, ch5 `[24..29]`, ch6 `[30..35]`, ch7 `[36..43]`). So exactly one item can appear at each check-in, and it is the first pin. The other pins cannot render under a diagram at a check-in.
- The quiz fallback (`checkin-placement.js:74-78`) and `decidedNoQuestion` do not fire, because every chapter resolves a pin.

**Free (signed-out or unpaid) vs paying.**
- `lib/preview-limits.js:272-282` gives a paying student the full bank with the pins as authored.
- For a free student, `freeQuizPayload` (`:64-125`) takes each chapter's first unclaimed pin (`:117`), the same rule the client uses, and rewrites the pin to `[pos]` (`:125`).
- I ran main's own `placeChapterItems`, `buildSteps` and `sectionPayload` (extracted from `origin/main` into a scratch directory) on three inputs:
  - the bundle as a paying student gets it
  - the bundle through `sectionPayload(…, {isPremium:false})`
  - the live signed-out API response

  All three give the same 7 diagram/quiz pairs (listed in the table).
- Option order is shuffled deterministically (`components/StudyApp.jsx:470`). That changes the order, not the item.
- `orderByPriority` (`LearnModeTab.jsx:509`) only feeds the review deck.
- No quant drill template claims 4.3.6 (`templatesForSection` returns `[]`), so no calculation renders at these check-ins.

**Does main's code differ from this branch's?** Not in selection.
- The diff the brief specified covers `components/learn-mode`, `lib/learn-steps.js`, `lib/checkin-fallback.js`, `lib/preview-limits.js`, `components/DiagramChecklist.jsx` and `components/learn-mode/InlineDiagram.jsx`. It misses `components/LearnModeTab.jsx`, which lives in `components/` rather than `components/learn-mode/`, and `lib/checkin-placement.js`, where placement now lives. I diffed both as well, plus `app/api/sections/[id]/route.js`. None of these differs between HEAD and `origin/main`.
- The differences that do exist:
  - `DiagramChecklist.jsx` exists on main only. It is the collapsed `<details>` from PR #35/#36, and main's `InlineDiagram.jsx:96` uses it.
  - A MatchRecall class name.
  - The Diagrams-tab filter in `StudyApp.jsx`.
- None of these changes which diagram or item a check-in shows, or the diagram's text.

**Live content, by a different method from the bundle.**
- I fetched `GET http://localhost:3001/api/sections/growth-development` with no `?draft=1`, signed out. This route reads the DB `data` column through main-identical `sectionPayload`.
- I compared it with `audit/snapshots/packet-46-bundle__economics__growth-development.json` using key-sorted JSON (jsonb reorders keys):
  - All 7 diagrams are equal on every field: title, description, checklist, scenarios, labels, svg.
  - All 10 served quiz items are equal: question, options, correctIndex, explanation.
  - All 7 content blocks are equal apart from the expected `quizIndices` rewrite.
  - `counts.quiz` is 44, matching the bundle.
- As a second, read-only cross-check, `GET https://revvylearn.com/api/sections/growth-development` (production, 09:00 UTC) equals the dev-server response on `diagrams`, `quiz` and `content`.

**Diagram text.**
- I parsed every view's emitted SVG string from the live payload with Python `xml.etree`. A regex count agreed on all 16 views: 165 `<text>` elements.
- No view contains `<tspan>`, `<title>`, `<desc>` or `<foreignObject>`.
- No diagram has a base `svg` outside its scenarios, and none is `kind: 'table'` or an image.
- `processSvg` restyles text but does not change its content.
- I then read each diagram's title, description, checklist and view labels, and every `<text>`, and after that the question and all its options. Judged by meaning. No word-overlap test was used.

## Verdicts

| Ch (step) | Diagram id · title | Quiz item | Correct option | Verdict | Evidence |
|---|---|---|---|---|---|
| 1 (5/41) | `diagram:0a108cf9` · The HDI: Three Dimensions | `quiz:68c08c31` (bank [3]) | 0.462 | **clean** | The diagram repeats the goalposts the stem already gives ("between goalposts of 20 and 85 years"). It never gives the dimension-index formula or 0.462. Its only health figure is Karanda's 0.800, and no option value (0.462, 0.588, 0.769, 0.500) appears. |
| 2 (11/41) | `diagram:f219e3f8` · Commodities, Savings and Foreign Currency | `quiz:3f651164` (bank [8]) | 10% | **clean** | No view weights a commodity's price fall by its share of exports. The figures shown (ToT 75, saving 12%/24%, $12bn/$14bn/$2bn) include none of 20%, 10%, 50% or 70%. |
| 3 (17/41) | `diagram:07db3dbd` · Population Structure and Debt | `quiz:a315e66b` (bank [14]) | 82 | **clean** | The diagram states the method and works it on other figures: "(42 + 4) ÷ 54 × 100 = 85". The key 82 and the distractors 45, 55 and 122 appear nowhere. This is the rule's "same concept asked with its own numbers" model. See the note below. |
| 4 (21/41) | `diagram:6d233a67` · Conflict and Corruption on a PPF | `quiz:7ff295f1` (bank [19]) | raises the cost and risk of investing | **clean** | The diagram shows corruption as waste of existing capacity, a point inside the PPF: "B: resources wasted on bribes and favoured projects." It says nothing about the cost or risk of investing. |
| 5 (27/41) | `diagram:c6653228` · Market-Orientated Strategies at Work | `quiz:7a0688e4` (bank [24]) | raising export earnings as firms reach larger markets | **clean** | The diagram covers FDI in Harrod-Domar, and a currency depreciating when export earnings *fall*. Trade liberalisation, larger markets and the foreign currency gap are absent. |
| 6 (34/41) | `diagram:55d963f4` · A Buffer Stock Scheme | `quiz:68311ebb` (bank [30]) | its costs are high until it grows and learns | **clean** | The diagram is a coffee buffer stock: floor, ceiling, and the agency buying or selling. Protection and infant industries do not appear. |
| 7 (41/41) | `diagram:a5fecaf9` · The Lewis Dual-Sector Model | `quiz:c36e9ef0` (bank [36]) | extra output is close to zero | **clean** | The diagram gives farm *income* ("Farm income $2") and says "Surplus labour used up at 5 million". It never says what a surplus farm worker's extra output is. The text "above farm incomes" rules out the distractor "wages are above factory wages", but that is elimination, not the key. |

**Note on chapter 3, the closest call. I judged it clean; I did not make it a `leaks`.**
- The diagram's worked case is a near copy of the stem: 42/4/54 against 40/5/55.
- The checklist says, without naming Karanda, "A young population: 85 dependants per hundred of working age". The stem asks for the ratio "about".
- So a student who cannot do the calculation can still pick 82, because it is the only option within 27 of 85.
- I held it clean because the rule names packet 44's fix as the model, and that fix has the same shape. Its checklist shows "$800bn: 40 million × $20,000" above a question keyed $750bn, and "50 million × 80% = 40 million" above a question keyed 45 million (`audit/runs/packet-44/verify-b-fix.md`, steps 2 and 4).
- If the rule's owner reads "same concept, own numbers" as excluding a near-identical case, this becomes a `leaks` quoting "(42 + 4) ÷ 54 × 100 = 85" and "A young population: 85 dependants per hundred of working age". That is a call about the rule's scope, not about what I measured.

## Verify B (screen)

**It ran on the dev server, not on the production screen.** Setup:
- Built-in browser, a new tab, 390x844, `http://localhost:3001/economics/unit-4/growth-development`, no `?draft=1`.
- Signed out: "Sign In" was shown, no auth keys, and the tab's own `/api/sections` fetch returned `isPremium: false` with the same 10 items and pins.
- I tapped "Start learning" and "Just teach me", then walked to **all 7 check-ins** (steps 5, 11, 17, 21, 27, 34, 41) with real Next taps.

What I checked at each check-in:
- In the rendered DOM I compared the title, description, view labels, the SVG `<text>` of every view, the checklist items, the question and the option set against the API payload. For the SVG, the payload was parsed with the browser's `DOMParser`, a second parser.
- **0 differences at all 7.** The quiz follows the diagram at every one.
- At step 5 I tapped the second view chip ("Why a geometric mean") for real and read it on screen. I switched the other views' chips by script, for reading only.
- At step 17 I read the checklist and the quiz on screen together.

**What the screen check could not do: open the collapsed checklist.**
- The :3001 server runs from this worktree. Its `InlineDiagram.jsx` renders the checklist as an always-open `<div class="diagram-checklist">`; I found 0 `<details>` elements.
- Main's collapsed `DiagramChecklist.jsx` is not in this worktree.
- So on screen I read the checklist text from the open list, but I did not exercise main's collapsed `<details>` or its tap-to-open.
- The checklist text is identical either way, because both render `diagram.checklist` unchanged.

Afterwards:
- The walk created two localStorage keys, `revvy_learnmode_1_growth-development_section` and `revvy_section_state_1_growth-development`. Neither existed before: the walk opened at step 1 with the pre-test offer. I removed both.
- I did not answer any quiz and did not use Report a problem.
- I reset the viewport and closed the tab.

## Not checked

- **A paying student on screen.** I have no paid session. The paid selection comes from main's code run on the bundle's full bank. It matches live because the live free pins are derived from the live full bank by the same first-unclaimed rule.
- **The production screen**, and main's collapsed checklist as rendered. Only the production API payload was compared.
- **The pinned items that cannot render at a check-in** (bank [4-7], [9-13], [15-18], [20-23], [25-29], [31-35], [37-43]) were not judged against the diagrams. Some are close to their chapter's diagram in subject, for example [32] (a coffee buffer stock) and [38] (the Lewis turning point). A re-pin that moved one to the front would need this check again.
- **The other parts of a check-in**, which render beside or below the quiz: the spaced recall, practice, explain-it-back, the takeaway and the post-answer explanation. Also the three pre-test headroom items, the teaching steps, and distractor quality in general.
