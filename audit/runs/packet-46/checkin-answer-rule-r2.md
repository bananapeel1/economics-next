# Check-in answer rule, round 2: packet 46 DRAFT, `growth-development` (IAL 4.3.6)

Read-only verifier, 26 Sep 2026, 09:35 to 09:52 UTC. I applied the rule at `audit/CONTENT-GATE.md:269-300`, including the paragraph "Near-miss numbers are leaks", to all 7 check-ins of the DRAFT (`?draft=1`). I edited no content, code, ledger, handoff or script file. This file is my only write to the repo. My scratch scripts are in my session scratchpad and are not committed.

**Result**

- 7 check-ins carry both a diagram and a quiz item, and I judged all 7.
- **1 `leaks`: chapter 2** (`quiz:3f651164`, key 10%). It is unchanged from live, where the earlier reader graded it clean under the old reading. Under the sharpened reading it fails both of the gate's remedies. Details are below.
- **Chapter 3's new item `bb8f266a` is `clean`.**
- The draft-vs-live difference in the served payload is confined to the chapter-3 quiz item.
- Main's selection code is identical to this branch's.
- The screen check ran at all 7 check-ins, with the checklist opened by tap at each one.

Under the rule, the chapter-2 `leaks` blocks the gate.

## Method

**Which code decides what a check-in shows**

- `components/LearnModeTab.jsx:281-284` calls `placeChapterItems`. Lines `:602-604` read `diagramMap[step]` and `quizMap[step]`, and `:813-818` render the diagram and then the quiz.
- `lib/checkin-placement.js:39-53` is the pinned path. `resolvePinnedDiagram` resolves by id. `resolvePinnedItem` (`components/learn-mode/utils.js:111-113`) returns the first pinned index that no earlier chapter has claimed.
- `lib/learn-steps.js:66-79` copies `diagramId` and `quizIndices` onto each check-in step.
- For a signed-out student, `lib/preview-limits.js:116-125` (`freeQuizPayload`) takes each chapter's first unclaimed pin and rewrites it to `[pos]`. A paying student gets the full bank with the pins as authored (`:267-290`).
- Option order is shuffled deterministically by `shuffleAllOptions` (`components/StudyApp.jsx:467-470`). That changes the order of the options, not which item is shown.

**Main vs this branch**

- I ran `git fetch origin main`. At that point HEAD was `3c0e727` and `origin/main` was `94bfda1`.
- `git diff HEAD origin/main --` on the five named files (`lib/checkin-placement.js`, `components/learn-mode/utils.js`, `components/LearnModeTab.jsx`, `lib/learn-steps.js`, `lib/preview-limits.js`) is **empty**.
- I also compared the worktree copies byte for byte with `git show origin/main:<path>`. All of these are identical: the five files above, plus `lib/checkin-fallback.js`, `app/api/sections/[id]/route.js`, `components/learn-mode/InlineDiagram.jsx`, `components/learn-mode/InlineQuiz.jsx`, `components/DiagramChecklist.jsx` and `components/learn-mode/processSvg.js`.
- Across these and the wider set I checked, HEAD differs from main only in two files:
  - `components/StudyApp.jsx`: the Diagrams-tab filter.
  - `components/learn-mode/MatchRecall.jsx`: one class name.
- Neither changes which diagram or item a check-in shows.
- Main's collapsed checklist, `DiagramChecklist.jsx`, is now in this worktree, so the screen check exercised it. The round-1 reader could not.

**Running main's own code on four inputs**

I extracted main's modules into a scratch directory, with their imports resolved transitively from `origin/main`, and ran `buildSteps`, then `placeChapterItems`, then `shuffleAllOptions` on:

1. the served draft, signed out;
2. the served live payload, signed out;
3. the dump `audit/snapshots/packet-46-bundle__economics__growth-development.json` through `sectionPayload(..., {isPremium:true})`, which stands in for the paying bank;
4. the same dump through `sectionPayload(..., {isPremium:false})`.

What came out:

- Inputs 1, 3 and 4 give the same 7 diagram/item pairs.
- Input 4 equals the served draft on every field `sectionPayload` returns: content, notes, diagrams, practice, quiz, flashcards, extras, mistakes, counts and isPremium.
- The git-index copy of the dump, the pre-fix version, run the same way, equals the served live payload on every field.
- The paying pins are `[3..7]`, `[8..13]`, `[14..18]`, `[19..23]`, `[24..29]`, `[30..35]` and `[36..43]`. They are disjoint, and each chapter shows its first pin.
- Live differs from draft only at chapter 3.
- No quant template claims `4.3.6`, on main or in the worktree (the `specCode` values are 1.3.1, 1.3.2, 2.3.1, 2.3.2, 2.3.4, 2.3.5 and 3.3.3), so no calculation card renders at these check-ins.

**What I read for each check-in**

- The source was the draft payload fetched with curl, not a copy from anyone else.
- For each diagram: title, description, checklist, every view label, and every SVG `<text>` of every view. I parsed the SVG with Python `xml.etree`.
- The totals were 16 views and 165 `<text>` elements. The etree and regex counts agree on every view.
- I found no `<tspan>`, `<title>`, `<desc>` or `<foreignObject>`.
- `processSvg` moves `<text>` nodes but does not change their content (`processSvg.js:99-104`).
- For each quiz item: the question, all four options and the key.
- I judged by reading. As an aid only, I also tabulated each numeric option's distance to every number printed on its diagram. It is not a leak check, and no verdict rests on it alone.

## Verdicts

| Ch (step) | Diagram · title | Quiz item (paid bank / free slice) | Key | Verdict | Evidence |
|---|---|---|---|---|---|
| 1 (5/41) | `diagram:0a108cf9` · The HDI: Three Dimensions | `quiz:68c08c31` ([3] / [0]) | 0.462 | **clean** | The options nearest the diagram's figures are distractors: 0.588 is 0.003 from "0.591" and 0.769 is 0.031 from "0.800". The key is the farthest option from every diagram figure, and the diagram never gives the (x − min) ÷ (max − min) step. |
| 2 (11/41) | `diagram:f219e3f8` · Commodities, Savings and Foreign Currency | `quiz:3f651164` ([8] / [1]) | 10% | **leaks** | "12" is printed 8 times, for example view 3 "Export earnings" / "$12bn", view 2 "Saving now" / "12%", and checklist "Savings gap: 12 points of GDP". 10% is the only option within 7 of it (20% is 8 away), and no other option sits near the key. See the next section. |
| 3 (17/41) | `diagram:07db3dbd` · Population Structure and Debt | `quiz:bb8f266a` ([14] / [2]) | 33 | **clean** | The key sits in a cluster with 31 and 27, all within 6 of each other, so no diagram figure (85, 59, "42%", "22%") singles it out. The diagram never shows 75% working age or 33. |
| 4 (21/41) | `diagram:6d233a67` · Conflict and Corruption on a PPF | `quiz:7ff295f1` ([19] / [3]) | raises the cost and risk of investing | **clean** | The diagram shows corruption as waste of existing capacity ("B: resources wasted on bribes and favoured projects"; "corruption is waste of the capacity there is"). It never mentions the cost or risk of investing. The chapter takeaway does; see "Outside the rule". |
| 5 (27/41) | `diagram:c6653228` · Market-Orientated Strategies at Work | `quiz:7a0688e4` ([24] / [4]) | raising export earnings as firms reach larger markets | **clean** | The diagram's only export-earnings text runs the other way with a different cause: "Export earnings fall: D → D₁, $0.50 → $0.40". Trade liberalisation, larger markets and the currency gap are absent. |
| 6 (34/41) | `diagram:55d963f4` · A Buffer Stock Scheme | `quiz:68311ebb` ([30] / [5]) | its costs are high until it grows and learns | **clean** | The diagram is a coffee buffer stock (floor, ceiling, the agency buying and selling). Protection and infant industries are absent. |
| 7 (41/41) | `diagram:a5fecaf9` · The Lewis Dual-Sector Model | `quiz:c36e9ef0` ([36] / [6]) | extra output is close to zero | **clean** | The diagram gives farm income ("Farm income $2") and the turning point, never a surplus worker's marginal output. "above farm incomes" refutes the distractor "wages are above factory wages", which narrows the choice to 1 in 3 by elimination but does not give the key. |

## Chapter 2: why it now leaks (unchanged item, sharpened reading)

**The gate's test.** The gate says: "Different figures in the question are not enough if the key is the only option close to a number the diagram shows." Its remedies are "several options plausible around the key" or "figures whose answer is not near anything on the diagram". This item fails both.

**The number.**

- The key, 10%, is 2 from "12".
- 12 is the most repeated figure on this diagram, printed 8 times:
  - checklist: "12% ÷ 4", "12 points of GDP" and "exports of $12bn";
  - view 2 SVG: "12%" twice and "Growth = 12 ÷ 4 = 3%";
  - view 3 SVG: "$12bn" and "$14bn − $12bn = $2bn a year."
- The next option to 12 is 20%, 8 away. No option other than the key is near the key: 20% is 10 away (double it), and 50% and 70% are further.

**The meaning path.**

- The stem asks what "Export earnings fall by". View 3 labels a bar "Export earnings" with "$12bn", and the checklist says "exports of $12bn".
- A student who looks on the diagram for "export earnings" finds 12, and 10% is the only option near it.
- No calculation is needed: 0.5 × 20% is never done.

**Against, recorded so the rule's owner can overrule.**

- The 12s are a saving ratio, a savings gap and a dollar level, not a percentage fall.
- The diagram's own figure for a fall is "Each unit of exports buys a quarter less" (and a terms-of-trade index falling from 100 to 75). The options nearest that are 20% and 70%, both distractors.
- No "12" is on a surface visible by default: view 1 is open and the checklist is collapsed.

I still grade it a leak. The gate says "a number the diagram shows" and "not near anything on the diagram", not "a number of the same quantity". The shared label "Export earnings" gives the proximity a reason to be followed.

**Status.** This item is live today (the live payload has the same `3f651164`) and was graded clean in round 1. This round's fix did not touch it. It is not a regression, but it blocks this packet's gate.

## Chapter 3: the new item `bb8f266a`

**Stem.** "An emerging economy's birth rate has fallen: 20% of its people are under 15 and 5% are over 64. Its dependency ratio is approximately:"

The options as served are `31, 27, 133, 33`, with the key at index 3. After the shuffle the screen shows A 31, B 27, C 33, D 133.

**Key by hand**

- Working age = 100 − 20 − 5 = 75%.
- Dependency ratio = (20 + 5) ÷ 75 × 100 = 33.3, which rounds to **33**.
- It is the only option within rounding of 33.3, and the stem's two shares fix working age at 15-64, so no second option is defensible.

**Distractors**

| Option | How it arises | Plausible error? |
|---|---|---|
| 31 | 25 ÷ 80 × 100 = 31.25: working age taken as everyone not under 15, with the over-64s still counted as dependants | Yes. It is the most likely slip, because the over-64s are counted twice. |
| 27 | 20 ÷ 75 × 100 = 26.7: the over-64s left out of the dependants (the youth dependency ratio) | Yes. It is a common confusion. |
| 133 | 100 ÷ 75 × 100 = 133.3: the whole population put over working age | Plausible but the weakest of the three. Commoner slips, 25 (the dependants' share of the whole population) and 300 (the fraction inverted), are not offered. Its useful job is as a lure: it is the option nearest both 85 and 100. |

The explanation names all three errors correctly.

**Rulings on the fixer's three disclosed near-numbers**

1. **27 is 5 from "22%" (the over-64 share in the ageing view): not a leak.** 22% is an input share, not a ratio. And 27 is a distractor, so a student who guesses by proximity to 22 gets it wrong. That is the opposite of a leak.
2. **The key 33 is the option nearest 59 and nearest "42%": not a leak.**
   - Against 59 the key's margin over 31 is 2 (26 vs 28), and 27 is 32 away. Against 42% it is 2 again (9 vs 11), with 27 at 15.
   - Proximity cannot separate 33 from 31 without the calculation. That cluster is exactly the gate's first remedy ("several options plausible around the key").
   - 42% is an input share. The diagram's same-quantity figures, 85 and 59, are 52 and 26 from the key and single out nothing.
3. **31 is 1 from a recall's "30%": not a leak, and it is not on this screen.**
   - The `demographic-factors` recall renders on its own teach step. As a spaced repeat it can only appear at a later chapter's check-in (`lib/learn-steps.js:23-25`).
   - On screen I found it at chapter 4's check-in (step 21), not at chapter 3's.
   - 30% is an input share, and 31 is a distractor.

**Other numbers on the chapter-3 check-in screen (disclosed, not verdicts)**

- The spaced recall directly under the quiz on my walk was chapter 2's reorder. It includes "The world price of cocoa drops by a third in a single season".
- 25 ÷ 75 is exactly one third. I judge this not a leak: it is not the diagram, it is a price fall rather than a ratio, and it is a word, not a numeral.
- Which recall appears depends on the student's session history (V034). I observed one linear first walk only.
- The guided practice on the same screen carries no figures (only "6", the marks).

**Still 4.3.6 content the chapter teaches.** Spec item ECON-4.3.6-2a-6 is "demographic factors (size and age distribution of population; migration)" (`audit/runs/packet-46/spec-items-4.3.6.txt`). Chapter 3 teaches:

- the ratio and its calculation, at `content[2].sections[0].body[1]`;
- falling birth rates leaving "fewer dependants", at `body[2]`.

Its recall drills the working-age subtraction the new item needs (30/10, giving 60%, giving 67).

## Draft vs live (my method: served HTTP payloads, own leaf diff)

- I fetched `GET http://localhost:3001/api/sections/growth-development`, with and without `?draft=1`, signed out, at 09:35:55 UTC. The responses were 165,963 and 165,731 bytes.
- The `economics__growth-development` form returns an empty 263-byte body, so the route's id is `growth-development`.
- Both responses equal the fixer's saved `fix-api-*-after.json`, so nothing was re-staged in between.
- A Python leaf-by-leaf diff with key-sorted traversal finds **7 differing leaf paths, all on `quiz[2]`** (bank [14]):
  - `id`: `a315e66b` → `bb8f266a`
  - `question`
  - `options[0..3]`: `45, 55, 122, 82` → `31, 27, 133, 33`
  - `explanation`
- `correctIndex`, `counts` and every other field are equal.
- **Nothing beyond the chapter-3 item differs in what the signed-out API serves.**
- **The chapter-3 diagram is byte-identical.** The raw object in both responses sits at the same offset (122004), is 5,283 bytes long, and has SHA-256 `d8cfa0a57314e04cafa0069bf62144e56640c0b24372e85f49840f4dde3f5166`. The whole `diagrams` array is also byte-identical in the two raw responses.

**What this diff cannot see.** The signed-out API withholds the paid-only fields:

- 34 of 44 quiz items;
- flashcards beyond 2 of 43;
- extras beyond 1 + 1;
- all 7 mistakes.

The best proxy I have is this: the git-index dump and the worktree dump differ at 7 leaf paths, all `quiz[14]`, the same seven fields. Each dump reproduces its served payload exactly. That is agreement on the served subset only. I did not read the DB draft columns.

## Screen check

**Setup and walk**

- Built-in browser, my own new tab, 390x844 emulated, `http://localhost:3001/economics/unit-4/growth-development?draft=1`.
- Signed out: "Sign In" was shown, there were no auth keys, and the tab's own fetch returned `isPremium: false`, 10 items and `quiz[2] = bb8f266a`.
- Tapped "Start learning", then "Just teach me", then **real Next clicks** to steps 5, 11, 17, 21, 27, 34 and 41.

**What I did at each check-in**

- Opened the collapsed "What a correct diagram shows" `<details>` with a real click. I confirmed `open: false` before the click and `open: true` after it.
- Clicked every view chip, 16 views in all.
- Compared the rendered title, description, view labels, the active view's SVG `<text>`, the checklist items, the question and the option set against the values from my Python/etree parse, which I had injected into the page as a fixed object. This is not a browser re-parse of the same payload.

**Result: all fields matched at all 7 check-ins, for every view.**

- The quiz follows the diagram in the DOM at all 7.
- No quiz was answered: no explanation element appeared at any check-in.
- Rendered option orders: ch1 `0.462, 0.769, 0.588, 0.500`; ch2 `70%, 10%, 20%, 50%`; ch3 `31, 27, 33, 133`; the text-option chapters as in the payload's set.
- These match `shuffleAllOptions` run in my harness.

**Limits of the screen check**

- The Browser pane was hidden, so screenshots could not composite.
- I drove the walk with accessibility refs (`computer left_click` with `ref`), which the tool dispatched as mouse clicks at the element's coordinates, and read text from the DOM. No legibility or pixel measurement was made.
- My first attempt was lost to a full page reload (navigation type `reload`, most likely the dev server's refresh from other sessions' edits). The walk above ran on a single page instance from start to finish.
- Console: one error, a 401 from `/api/learn-mode/state`. That is the signed-out POST (`app/api/learn-mode/state/route.js:72`), and it writes nothing.

**localStorage (shared with other sessions)**

- Baseline before the walk: 19 keys. None was for growth-development except `last-visited-section`, which already held `growth-development`.
- At the end of the walk only `theme` and `revvy_feedback_prompt` remained, both unchanged. The other 17 keys were gone, including packet 47's `global-markets-expansion` keys.
- A minute later a peer session was writing `managing-change` keys under a new `revvy_anon_id`.
- No app code calls `localStorage.clear()`. The only `removeItem` is ExplainItBack's draft key (`ExplainItBackUpgraded.jsx:46`).
- So the keys were removed by something outside my walk. I cannot tell whether my walk's own keys were created before that clearing.
- No growth-development key remained at the end. I removed nothing and restored nothing, and I left the peer's keys alone.
- I reset the viewport to desktop and closed my tab.

## Outside the rule (disclosed, not verdicts)

**Chapter takeaways render on the same check-in step, below the quiz, and two of them state the key.**

| Chapter | Takeaway | Distance below the quiz at 390px | Relation to the key |
|---|---|---|---|
| 4 | "Corruption and poor governance raise the cost and risk of investing." | 1,626px (quiz card bottom to takeaway top; view 1, checklist closed) | The key, verbatim |
| 5 | "FDI and exports fill the savings and foreign currency gaps." | 1,914px (view 2, checklist open) | The key's mechanism |

- The rule covers the diagram only, so neither is a `leaks` verdict here.
- Both are identical in live and predate this fix. Round 1 listed takeaways as not checked.
- Whether the rule should extend to the takeaway is a decision for the rule's owner.

## Side effects of this run

The walk the brief asked for triggered the app's own telemetry. Counts are from the page's resource timing and cover the page instance that ran the walk; the first, reloaded attempt may have sent a few more.

- **84 `POST /api/events`**. That route inserts rows into Supabase `app_events` (`app/api/events/route.js:73`), so this run caused anonymous telemetry writes.
- **85 Umami sends** to `gateway.umami.is`.
- Nothing else was written. The `/api/learn-mode/state` calls returned 401.
- I did not delete the telemetry rows, since deleting them would be a further write.

## Not checked

- **A paying student on screen.** I have no paid session. The paid selection comes from main's code run on the dump.
- **The DB draft and data columns.** I did not read the database. The paid-only fields of the draft were compared only through the dump, which I verified against the DB on the served subset only.
- **Production** (revvylearn.com), and any build other than the :3001 dev server.
- **Pinned items that cannot render at a check-in.** These are bank [4-7], [9-13], [15-18], [20-23], [25-29], [31-35] and [37-43].
- **Other surfaces beside the quiz under the rule.** I judged neither the practice, explain-it-back, spaced recall, post-answer explanation, pre-test items nor teaching steps. The only exceptions are the takeaways and the chapter-3 spaced recall noted above. I saw spaced recalls for one linear walk only.
- **Packet 44's $800bn/$750bn check-in**, which CONTENT-GATE asks to be re-checked. That is another section.
- **Rendering quality**: font sizes, legibility and overflow.
