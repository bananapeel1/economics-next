# Check-in answer rule, round 3: packet 46 DRAFT, `growth-development` (IAL 4.3.6)

Read-only verifier, 26 Sep 2026, 10:07 to 10:20 UTC. This file is my only write to the repo. I edited no content, code, ledger, handoff or script file, and staged, published and wrote to the DB nothing. The one exception is the app's own telemetry during the walk; see "Side effects".

**The rule changed during this round.** `audit/CONTENT-GATE.md` now opens its check-in section with "UPDATED … question first". Because of PR #43, which is on `origin/main` and deployed as 2619638, a check-in shows only its question until the student answers or skips it. So I record two classes:

- **BLOCKING (pre-answer):** anything visible before answering that states or gives away the key. That means the chapter title, the intro, the stem and the options.
- **DEBT (post-answer):** the diagram or takeaway stating the key. It is recorded for the later rewrite pass.

**Result**

| Class | Leaks | Chapters |
|---|---|---|
| BLOCKING, pre-answer (new in r3; r1 and r2 did not judge this class) | **2 of 7** | chapter 4 and chapter 6 |
| DEBT, diagram | **0 of 7** | none. The new chapter-2 item `37b5e13a` is clean, which replaces r2's `leaks` on `3f651164`. |

**Scope and screen**

- Draft vs live differs only in chapter 2's and chapter 3's items.
- Chapter 3's item is byte-identical to what I judged clean in r2.
- All 7 check-ins resolve to the r2 items, except chapter 2's new id.
- The screen check of chapter 2 ran at 390x844, signed out, with the checklist and all 3 views opened by real clicks.

## Final lines

**BLOCKING, pre-answer.** All 7 are re-judged in r3, judged against main's question-first order. Options are listed in the order the shuffle shows them.

| Ch | Item | Key | Verdict | Evidence |
|---|---|---|---|---|
| 1 | `quiz:68c08c31` | 0.462 | **clean** | No option matches a word or figure shown before answering. The naive divisions of the stem's own numbers (50 ÷ 85 = 0.588, 50 ÷ 65 = 0.769) are distractors, and the key needs the goalpost method, which the stem does not state. |
| 2 | `quiz:37b5e13a` | 52% | **clean** | The two options equal to stem figures (80%, 65%) are distractors. 52% and 48% both survive any shortcut and differ only by "by" vs "to", so the student has to do 0.8 × 65. |
| 3 | `quiz:bb8f266a` | 33 | **clean** | The key sits in a 27/31/33 cluster. The stem's 20, 5 and 15 draw 27. The key is nearest to two numbers, "64" (31 away, not close) and the counter's "41" (8 away, with 31 at 10), so nothing singles it out. |
| 4 | `quiz:7ff295f1` | raises the cost and risk of investing | **leaks** | The stem says corruption "constrains investment". The key is the only option that would constrain investment, and the only one sharing the stem's word ("investing"). The other three, "lowers the tax rate on profits", "makes contracts easier to enforce" and "increases the supply of credit", would all encourage it. This is the gate's "one option that is obviously the only well-formed one". |
| 5 | `quiz:7a0688e4` | raising export earnings as firms reach larger markets | **clean (weak)** | Two distractors contradict the stem's "liberalisation": "banning foreign ownership of firms" and "raising import duties on manufactures". "reducing imports of machinery and fuel" survives an everyday reading, so a guesser has 1 chance in 2. The key is also the longest option. |
| 6 | `quiz:68311ebb` | its costs are high until it grows and learns | **leaks** | The stem's "infant industry … a new industry" matches only the key's "until it grows and learns". No other option refers to newness, and "it pays no tax" is no reason for shelter. A student can answer from the word "infant" without the chapter. |
| 7 | `quiz:c36e9ef0` | extra output is close to zero | **clean (weak)** | "jobs are in the modern sector" contradicts the stem's "farm workers", and "skills are in short supply" contradicts "surplus". "wages are above factory wages" falls only with economics (the Lewis wage gap), so a guesser has 1 chance in 2. The key's "extra" echoes "surplus". |

**DEBT, diagram (post-answer on main):**

| Ch | Item | Key | Verdict | Status | Evidence |
|---|---|---|---|---|---|
| 1 | `quiz:68c08c31` | 0.462 | clean | carried from r2 (unchanged, shown by the diff) | The options nearest the diagram's figures are distractors (0.588 is 0.003 from "0.591"). The diagram never gives the dimension-index step. |
| 2 | `quiz:37b5e13a` | 52% | **clean** | **re-judged in r3** | Every diagram figure draws a distractor. 12 and 24 draw 48%, and 75, 90, 100 and 120 draw 80%. The diagram's own changes (−10%, +20%, −25%) draw 48%. The key is the nearest option to no number on the diagram, and the diagram never states share × fall. |
| 3 | `quiz:bb8f266a` | 33 | clean | carried from r2 (the item is byte-identical, shown by the diff) | The key is in a 27/31/33 cluster, so no diagram figure (85, 59, "42%", "22%") singles it out. |
| 4 | `quiz:7ff295f1` | raises the cost and risk of investing | clean | carried from r2 (unchanged, shown by the diff) | The diagram shows corruption as waste of existing capacity, never the cost or risk of investing. |
| 5 | `quiz:7a0688e4` | raising export earnings as firms reach larger markets | clean | carried from r2 (unchanged, shown by the diff) | The diagram's only export-earnings text runs the other way ("Export earnings fall: D → D₁"). Liberalisation and larger markets are absent. |
| 6 | `quiz:68311ebb` | its costs are high until it grows and learns | clean | carried from r2 (unchanged, shown by the diff) | The diagram is a coffee buffer stock. Protection and infant industries are absent. |
| 7 | `quiz:c36e9ef0` | extra output is close to zero | clean | carried from r2 (unchanged, shown by the diff) | The diagram gives farm income and the turning point, never a surplus worker's marginal output. |

**DEBT, takeaways.** These carry over from r2, and their content is byte-identical in the draft today.

- Chapter 4's takeaway states its key word for word: "Corruption and poor governance raise the cost and risk of investing."
- Chapter 5's takeaway states its key's mechanism: "FDI and exports fill the savings and foreign currency gaps."
- Chapter 2's takeaway states neither 52% nor share × fall.

## Which code decides what shows before answering (origin/main `6ef6eaa`, which contains #43 `2619638`)

**What main renders before the answer:**

- `components/LearnModeTab.jsx:738`: the chapter-dot strip. Each dot's title reads "Chapter N: {block title}", for all 7 chapters.
- `:758`: "Step N of 41". `:725`: the progress %.
- `:806-810`: the eyebrow, "Chapter N of 7 · {block title}". `:811`: "Chapter check-in".
- `:643-657` builds the intro, rendered at `:818`. It is assembled only from fixed phrases: "a quick question", "the diagram", "a calculation", "one thing from earlier", joined after "Before the next chapter" or "Before you finish". It can carry no item content.
- `:822-826`: `InlineQuiz`. Before the answer it shows "Quick quiz", the stem and the 4 options (`components/learn-mode/InlineQuiz.jsx:82-100`). The explanation waits for `revealPhase >= 2` (`:102`).
- `:827-833`: while `!checkinRevealed.has(safeStep)`, main shows only "Answer the question first. The diagram and the rest of this check-in will appear below." and a "Skip the question" button. The diagram, calculation, practice, recall, explain-it-back and takeaway render only in the else branch, after the answer (`:834` onward; the diagram is at `:836`). The gate is `revealCheckin`, called from the quiz's `onResult` (`:825`) or from Skip.

**This branch vs main**

- HEAD is `8a06aa3`. `git diff HEAD origin/main` over the check-in and selection files shows **only `components/LearnModeTab.jsx`** differing.
- That diff (#43) changes the render order, the intro's word order and the reveal gate. It does not touch the `placeChapterItems` call.
- Byte for byte, the worktree equals main in 14 files: `lib/checkin-placement.js`, `components/learn-mode/utils.js`, `lib/learn-steps.js`, `lib/preview-limits.js`, `lib/checkin-fallback.js`, `lib/shuffle-options.js`, `app/api/sections/[id]/route.js`, `InlineDiagram.jsx`, `InlineQuiz.jsx`, `DiagramChecklist.jsx`, `processSvg.js`, `recall-widgets.js`, `practice-tariffs.js` and `ial-marking.js`. That set was checked against `da0544d`, and the diff against `6ef6eaa` confirms it. `LearnModeTab.jsx` also equalled `da0544d`, but it differs from `6ef6eaa` by #43.
- So main selects exactly the items this branch selects.
- :3001 still renders diagram-first. Per CONTENT-GATE point 4, I judged the pre-answer class against main's order and failed nothing because the branch renders the old one.

**How I judged a pre-answer leak.** The key leaks if a student who has not read the chapter can reach it from what is visible before answering, by everyday reading alone:

- the key is the only option that matches a word, meaning or figure there, or
- every other option contradicts the stem in everyday terms.

If two or more options survive, the verdict is `clean`. Where a cut leaves exactly 1 chance in 2, I mark it "weak" for the later pass.

**A tension in the gate for the rule's owner.**

- Point 2 blocks "one option that is obviously the only well-formed one". Chapter 4 is that case.
- Point 5 names "the stem or options give it away" as the later rewrite pass, "not a gate for current packets".
- Chapter 6 is a give-away by meaning (the key restates "infant"). I graded it `leaks` because the coordinator asked me to count matching. If the founder reads point 5 as covering it, it moves to the later pass. Chapter 4 does not move.

Both items are live today and unchanged by either fix round. They are the packet's own content, published at 08:50 UTC.

## Chapter 2: the new item `37b5e13a` (re-judged in full)

**What the diagram shows.** I read `diagram:f219e3f8` from today's served draft with Python `xml.etree`. It is byte-identical to r2: 6,364 bytes, SHA-256 `6f67e6f8…5e120`.

- **Title:** "Commodities, Savings and Foreign Currency".
- **Description:** "IAL 4.3.6 · 2a: primary exporters' terms of trade declining (Prebisch-Singer), the Harrod-Domar savings gap, and the foreign currency gap, all for one economy."
- **Checklist:**
  - "Terms of trade = export price index ÷ import price index × 100 = 75"
  - "Harrod-Domar: growth = 12% ÷ 4 = 3%; 6% needs 24% saving"
  - "Savings gap: 12 points of GDP"
  - "Foreign currency gap: imports needed $14bn against exports of $12bn"
- **View 1, "Terms of trade"** (12 `<text>`): "Prebisch-Singer: the terms of trade | Index | Years | 100 | 120 | 90 | 75 | Import prices | Export prices | Terms of trade | Terms of trade = 90 ÷ 120 × 100 = 75. | Each unit of exports buys a quarter less."
- **View 2, "The savings gap"** (9): "Harrod-Domar: the savings gap | Saving now | 12% | Needed for 6% growth | 24% | Savings gap | 12% | Growth = 12 ÷ 4 = 3%; 24 ÷ 4 = 6%. | The gap is $7.2bn a year, as a share of GDP."
- **View 3, "The foreign currency gap"** (9): "The foreign currency gap | Export earnings | $12bn | Imports the plan needs | $14bn | Foreign currency gap | $2bn | $14bn − $12bn = $2bn a year. | Filled by FDI, aid or borrowing, or by cutting imports."

**The item.**

- Stem: "A country earns 80% of its export revenue from copper, and the world copper price falls by 65%. Its export earnings fall by:"
- Options as served: `65%, 52%, 48%, 80%`, key at index 1. After the shuffle: A 80%, B 65%, C 52%, D 48%.

**Key by hand.** 0.80 × 65% = **52%**. As a cross-check, the new earnings are 20 + 80 × 0.35 = 48% of the old, so the fall is 52%. The explanation's working matches.

**Distractors**

| Option | How it arises | Plausible error? |
|---|---|---|
| 65% | The price fall alone, as if copper were all exports | Yes. It is the commonest slip, and it is the stem's own figure. |
| 48% | The new level of earnings ("fall to") instead of the fall ("by"): 20 + 28 = 48 | Yes. It is a natural route, because it computes the remaining earnings. |
| 80% | The share alone | Plausible as a misread, but the weakest: no calculation produces it. It is the stem's own figure. |

**Rulings on the fixer's disclosed near-numbers**

1. **80% is 5 from "75": not a leak.**
   - 75 is a terms-of-trade index, not a fall in earnings.
   - 80% is a distractor, so a guess anchored on 75 lands on a wrong answer.
   - The diagram's own falls draw 48%, another distractor: export price index 100 → 90 (−10%), terms of trade −25%, "a quarter less".
2. **65% is 10 from "75": not a leak.** 65% is a distractor, and it is the stem's own price-fall figure (the "price fall alone" error).
3. **48% and 52% are 4 apart, separated only by "by" vs "to": not a leak, and fair.**
   - This is the gate's first remedy: several plausible options around the key.
   - The stem says "fall by" plainly, and 48 comes from a real error.
   - Every shortcut I checked (stem echoes, diagram numbers, the diagram's implied changes, the counter) either draws 48 or leaves 52 and 48 tied. Only the calculation separates them.

**Other numbers**

- For the record, the old key (10%) also equalled the diagram's implied export-price fall (100 → 90). That strengthens r2's `leaks` on the replaced item.
- The chapter-2 recall's "drops by a third" (33) draws 48% (15 away), not the key.

**Still 4.3.6, taught in chapter 2.** The item tests ECON-4.3.6-2a-1, "volatility of commodity prices". Chapter 2 teaches it:

- at `content[1].sections[0].body[1]`: "copper earns 60% of export revenue. A 25% fall … cuts export earnings by 60% × 25% = 15%";
- at `body[2]`, in the flow step "Export earnings drop" / "By the share times the fall".

The new stem is the same method on different figures.

**The rest of the chapter-2 check-in screen**

This was read on :3001 at step 11/41, where the old order still applies, so everything below appears only after answering on main.

- **Intro:** "Before the next chapter: the diagram, a quick question and one thing from earlier."
- **Between the diagram and the quiz:** nothing (no sibling elements).
- **Below the quiz:**
  - guided practice: a Prebisch-Singer Explain for 4 marks, with no other figures;
  - spaced recall from chapter 1: sort growth vs development, including "5% more vehicles";
  - "Explain it back": the header only. Expanded, the code shows a generic prompt and a textarea; key ideas appear only after the student writes and compares (`ExplainItBackUpgraded.jsx`, identical on main);
  - the takeaway: "Commodity dependence brings volatile earnings and, on Prebisch-Singer, falling terms of trade." / "Harrod-Domar: growth = savings ratio ÷ capital-output ratio." / "Capital flight widens both the savings gap and the foreign currency gap."
- A text search of the whole check-in for "52", "48", "0.8", "share", "times the fall" and "fall to" found 52 and 48 only in the options.
- **Nothing on the screen states the new key.**

## Scope: draft vs live vs r2 (my method, served HTTP payloads)

I fetched `GET :3001/api/sections/growth-development`, with and without `?draft=1`, signed out, at 10:07:32 UTC. The responses were 166,069 and 165,731 bytes. I diffed them with my own leaf-by-leaf script from r2.

- **Live now vs r2's live:** byte-identical, 0 paths.
- **Draft now vs r2's draft:** 7 leaf paths, all on `quiz[1]` (chapter 2, bank [8]): `id` `3f651164` → `37b5e13a`, `question`, `options[0..3]` `20%,10%,50%,70%` → `65%,52%,48%,80%`, and `explanation`. `correctIndex` is unchanged.
- **Draft now vs live now:** 14 leaf paths, the same seven fields on `quiz[1]` and `quiz[2]` (chapter 3) only. Nothing else differs in what the signed-out API serves.
- **Chapter 3's item is byte-identical to r2's draft:** 578 bytes, SHA-256 `9b21be24762f60e94f5a4d62a1aef7688e137bcc10e268ff3a4860cb5eb4fbec`, the same in both.
- The whole `diagrams` array (36,626 bytes) and the whole `content` array (102,369 bytes, which carries the pins and takeaways) are byte-identical across r2's draft, today's draft and today's live.

**Placement, main's own code.** The scratch copies of main's modules are byte-identical to `origin/main`. I ran `buildSteps`, then `placeChapterItems`, then `shuffleAllOptions` on r2's recorded draft, today's draft, today's live, the dump as a paying bank, and the dump through `sectionPayload(isPremium:false)`.

- Today's draft vs r2's draft, per check-in: same, **`3f651164` → `37b5e13a`**, same, same, same, same, same.
- Today's draft vs the paying bank: the same 7 pairs. Chapter 2 is `[8]` paid and `[1]` free.
- The dump through `sectionPayload(isPremium:false)` equals today's served draft on every field.

**What the signed-out diff cannot see.** It does not cover the paid-only fields: 34 quiz items, 41 flashcards, extras beyond 1+1, and 7 mistakes. As a proxy, the git-index (pre-fix) dump against today's worktree dump differs at **14 leaf paths, all `quiz[8]` and `quiz[14]`**. I did not read the DB.

**Why six check-ins were not re-walked.** The diff shows nothing beyond the two items, so I did not re-walk chapters 1 and 3-7. Their DEBT lines are carried from r2 on the strength of the diff above.

## Screen check (chapter 2)

**Setup and walk**

- My own new tab, 390x844, `http://localhost:3001/economics/unit-4/growth-development?draft=1`.
- Signed out: "Sign In" shown, no auth keys, and the tab's own fetch gave `isPremium: false` with `quiz[1] = 37b5e13a`.
- Tapped "Start learning", then "Just teach me", then 10 real Next clicks to **step 11/41**.

**At the check-in**

- Opened the collapsed checklist with a real click (`open: false` before, `true` after).
- Clicked views 2 and 3.
- Compared title, description, view labels, the active view's SVG `<text>`, the checklist, the question and the option set against my Python/etree parse, which I injected as a fixed object.
- **All fields matched on all 3 views.**
- The rendered options were **A 80%, B 65%, C 52%, D 48%**. No quiz was answered.

**Limits**

- The Browser pane was hidden, so I took no screenshots. Clicks were dispatched through accessibility refs.
- There was no page reload during the walk.
- :3001 renders diagram-first. I could not verify main's question-first flow on :3001, so the pre-answer class is judged from main's code, as CONTENT-GATE point 4 prescribes.

## Side effects

**Analytics fired by the walk**, from the tab's resource timing:

| Requests | What they do |
|---|---|
| 24 × `POST /api/events` | The route inserts into Supabase `app_events` (`app/api/events/route.js:73`), so these are anonymous telemetry writes. |
| 25 × Umami `gateway.umami.is/api/send` | Third-party analytics. |
| 3 × `/api/learn-mode/state` | Signed out, so the route returns before any write (`route.js:48`, `:72`). |
| 2 × section GET, 1 × glossary GET | Reads. |

I did not delete the telemetry rows.

**Storage**

- Baseline at 10:09:16 UTC: 23 keys, none for growth-development, and `last-visited-section` held a peer's `government-intervention-firms`.
- My walk created `revvy_learnmode_1_growth-development_section` and `revvy_section_state_1_growth-development`, and set `last-visited-section` to `growth-development`.
- At 10:11:09 UTC I removed both keys and restored `last-visited-section` to `government-intervention-firms`. No growth-development key remained.
- Other keys changed during the walk through a peer's `government-intervention-firms` session (the review schedule, `visited-features` and that section's state). I left them alone.
- The tab's `sessionStorage` key `revvy_visit_started` went with the tab when I closed it. I reset the viewport first.

## Not checked

- **Main's question-first render on a screen.** The branch lacks #43. The pre-answer surfaces come from main's code and the draft payload, not from observation.
- **Production (revvylearn.com).** I did not visit it.
- **The exact spaced recall on main for each check-in.** The intro wording depends on it, but it is built only from fixed phrases, so no item content can enter it.
- **A paying student on screen, and the DB draft and data columns.**
- **Re-walking check-ins 1 and 3-7 on screen.** Carried from r2 on the strength of the diff.
- **Other surfaces at check-ins other than chapter 2** (practice, recall, explain-it-back) under the DEBT class, beyond r2's takeaway note.
- **Pinned items that cannot render at a check-in**, packet 44's re-check, and rendering quality.
- **The two live items the draft replaces** (`3f651164`, `a315e66b`) under the pre-answer class. I judged only what the packet will ship.
