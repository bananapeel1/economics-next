# Packet 13.2 — Verify A (finding check)

Read-only pass, 22 September 2026. Every verdict below was recorded with
`node audit/scripts/ledger.mjs confirm …`. No source file, template, test or script was changed.

**What I ran:** `npm run quant-check`, `npm run quant-check -- --draws 2000`, `node --test
lib/quant-pool.test.mjs`, `npm test`, `npm run validate`, `npm run build` — all green
(`npm test` 265/265, build exit 0, validate exit 0).

**What I did NOT take on trust.** The three A/B files in this directory (`spec-code-ab.txt`,
`variety-ab.txt`, `quant-unit-delta.txt`) are the builder's claims, so each was re-derived from
scratch with my own probes before any id was confirmed. Where my measurement agrees with theirs
it is said so below; where the guard is a grep rather than a measurement, the verdict rests on
reading the shipping file instead.

---

## Verdicts

**D018 CONFIRMED** — `lib/quant-pool.test.mjs:52-65`. Re-derived, not read from `spec-code-ab.txt`:
all eight `specCode`s are real IAL headings in their own subject (`bus_spec.txt:504` 1.3.1, `:885`
2.3.2, `:1146` 3.3.3; `econ_spec.txt:576` 1.3.2, `:884` 2.3.1, `:1056` 2.3.4, `:1094` 2.3.5) and
every `specTerm` falls inside that section's own block (`bus:510` market size and market share,
`:904` margin of safety, `:1155` payback, `:1157` rate of return; `econ:606` PED, `:911` consumer
price index, `:1078` multiplier, `:1121` actual growth rate). Six of the eight terms appear nowhere
else in their file at all. Widened A/B of the guard itself: it rejects `ped 1.2.4` and
`multiplier 2.4.2` on shape and `breakeven 2.3.1` on the term; blanking `specTerm` fails all eight;
and for every template **no other section of its own subject would pass**, so the term check pins
each template to exactly one heading rather than merely confirming the heading exists.

**D019 CONFIRMED** — `audit/scripts/quant-check.mjs:149-164`. Green at 200 draws (1,600 items) and
at `--draws 2000` (16,000 items), run here. Floor A/B re-measured rather than accepted: at 2,000
draws the old flat `0.8 × DRAWS` floor fails `ped` 1302, `percentage-change-economics` 1212 and
`multiplier` 559 — the three numbers the new comment cites — and each sits at or above its own
reachable ceiling (1413 / 1243 / 553), so the old rule was the red herring the comment says it was.
Teeth retained: `MIN_VARIANTS = 500` (`:31`, `:162`) is untouched and is what an under-declared
`variants` hits; and a template whose declared `variants` exceeds its real space still fails the
variety floor at high draw counts (probed: real space 570 declared as 507,000 fails at 2,000 draws).

**D020 CONFIRMED** — `lib/quant-pool.js:30-36` joins on subject **and** `specCode` **and** unit.
Widened past the unit test's five hand-picked sections: `templatesForSection` was run over all 43
rows of `audit/raw/section-index.json` with `subjectFrom(unitCode)` exactly as both surfaces call
it. Exactly 7 sections get drills (`meeting-customer-needs`→percentage-change-business,
`financial-planning`→breakeven, `decision-making-techniques`→arr+payback,
`consumer-behaviour-demand`→ped, `measures-economic-performance`→index-numbers,
`national-income`→multiplier, `economic-growth`→percentage-change-economics), subject and unit
correct on every one, the other 36 get none, and no registered template lands nowhere.
*Caveat, not a reject:* line 35 skips the unit check when `unitCode` is falsy and
`lib/ial-commands.js:36-40` defaults `subjectFrom('')` to economics, so an empty unit code would
hand ped / index-numbers / multiplier / percentage-change-economics to `the-market`,
`planning-raising-finance`, `resource-management` and `external-influences`. Not reachable today —
`StudyApp.jsx:1079` and `:1116` always pass `currentUnit.code`.

**D021 CONFIRMED** — `lib/quant-pool.js:47-49`; `lib/quant/index.mjs:64-66` ids the item on
template+seed so a new attempt changes the React key. Purity checked at source: no `Math.random`
or `Date` anywhere in `lib/quant/` except `rng.mjs:44` `newSeed`, which only `/admin/quant` calls
and the pool never does. Redraw is reachable from the card — `CalculationItem.jsx:125-127` renders
"New figures" when `onReseed` is passed, and both surfaces pass it (`LearnModeTab.jsx:826`, `:876`;
`QuizTab.jsx:80`, `:145`).
*Caveat:* `attempt` lives in component state only (`LearnModeTab.jsx:343`, `QuizTab.jsx:28`), so a
reload rebuilds attempt-0 figures. "A reload rebuilds the same figures" is true; a student who
pressed New figures and then reloaded gets the **original** figures back, not the redrawn ones.

**D022 CONFIRMED** (390px rendering left to Verify B) — `components/LearnModeTab.jsx:346-368` builds
`quantMap`, `:823-827` mounts `CalculationItem` on the check-in branch. The map was replicated
against the **live content served by the dev server on 3001**, not against a fixture:
`national-income` (WEC12 2.3.4) places `multiplier` on flat step 13, the check-in behind "The
Multiplier and National Income"; `measures-economic-performance` step 15 ("Consumer Price Index
(CPI) and Inflation"); `consumer-behaviour-demand` step 12 ("Price Elasticity of Demand (PED)");
`economic-growth` step 22. All four are `checkin` steps. Marks correctly through the component's own
path (text-input strings → `lib/quant/marking.mjs:94` `parseNumber`): multiplier 4/4, ped 4/4,
index-numbers 7/7, percentage-change-economics 6/6 on their correct answers. Stacking media query
for 390px at `components/quant/CalculationItem.module.css:161-165`.

**D023 CONFIRMED** (390px left to Verify B) — same code path, replicated over live content:
`meeting-customer-needs` (WBS11 1.3.1) places `percentage-change-business` on flat step 16, a
check-in; `financial-planning` (WBS12 2.3.2) places `breakeven` on step 10 ("Break-Even Analysis");
`decision-making-techniques` (WBS13 3.3.3) places `arr` on step 5. Marking through the string path:
6/6, 4/4, 4/4. Two things for Verify B rather than a rejection here — (1) the Business match landed
on "Market Positioning and Orientation", a single shared word ("market"), not the chapter that
teaches market share; (2) `payback` never lands anywhere (see below).

**D024 CONFIRMED** — `components/quant/CalculationItem.jsx:109` renders the `own figure rule` tag
whenever `r.outcome === 'ofr'`, and `lib/quant/marking.mjs:63-76` awards the step's **full** marks on
that outcome with the note at `:74`. Reachable from the UI and not only from the test: `markItem`
parses text-input strings at `marking.mjs:94`, so the marking was driven the way the card drives it —
for all eight items on their seven real sections, first numeric step wrong and carried correctly into
every dependent step, **every** own-figure step scored and badged (`breakEven`+`margin`,
`average`+`arr`, `months`, `ped`, `inflation`+`real`, `k`+`change`, `forecast` ×2) and `usedOfr` was
true on all eight, which drives the standing verdict line at `:46-47`.
*Note for Verify B:* the badge is 10px uppercase DM Mono (`CalculationItem.module.css:116-126`), the
smallest type on the card.

**D025 CONFIRMED** — `components/LearnModeTab.jsx:633` puts `currentQuant && 'a calculation'` into the
same filtered list as the diagram and quiz clauses, rendered at `:815`. The naming cannot drift from
the showing: the sentence and the mount read the same `currentQuant`, built at `:611-616` from
`quantMap[safeStep]`, and the list is empty-checked at `:638` so a check-in carrying nothing promises
nothing. Checked the other direction too — a drill placed on a `legacy` step would render with no
sentence at all (`:627` returns `''` unless the step is a check-in) — and all seven live placements
land on `checkin` steps, none on `legacy`, so no live section shows a drill under a silent sentence.

**D026 CONFIRMED** — `components/QuizTab.jsx:29-34` derives the drill from the `unitCode` +
`sectionNumber` that `StudyApp.jsx:1116` now passes; it renders at `:145`, and at `:80` when the
section has no quiz bank, through `QuantCard` at `:258-270`. The score was read, not grepped:
`finalScore` (`:94`) and the posted `total` (`:106`) both reduce over `displayQuestions` only;
`answers` is written only by `selectAnswer` (`:86-89`), which the calculation never calls; `QuantCard`
passes no `onResult` to `CalculationItem` (`:264`), so the drill's marking has no path into this
component's state; `bestScore` (`:112`) uses the same two numbers; `allAnswered` (`:129`) is
`displayQuestions`-only, so the Submit gate is unchanged. The negative regex in
`lib/quant-pool.test.mjs:217` is weak on its own and this verdict does not rest on it.

**D027 CONFIRMED** — `audit/validator-baseline.json`: the diff has exactly five deletions, all
`quant.unit|section|9c9233a1`, for `entrepreneurs-leaders`, `managing-people`,
`marketing-mix-strategy`, `meeting-customer-needs` and `the-market` — the five WBS11 sections — and
**no key added anywhere in the file**; `counts.debt` 1553→1548 (`:7`) and `counts.byRule.quant.unit`
20→15 (`:26`) match. The rule (`lib/content-validator.mjs:895-898`) keys on unit code; templates now
exist for WBS11/WBS12/WBS13/WEC11/WEC12, so the 15 still firing are exactly the sections of WEC13 (5),
WEC14 (6) and WBS14 (4) in `audit/raw/section-index.json` — counted independently, 15. `npm run
validate` exits 0; of the 184 findings outside the baseline, 160 are `practice.opening` and 24
`spec.uncovered` from another session's live rule and **zero** are `quant.unit`, so "none added"
holds for this packet's rule. The hand edit rather than `--baseline --confirm` is documented in the
file's own note and is the right call while the other session's rule is live.

**D028 CONFIRMED** — `lib/quant-pool.js:105-117` tries the chapter-title match first, and `:121`
starts the spread loop at `i = 1`, so an unmatched drill structurally cannot take slot 0. Verified on
live content rather than on the test's fixtures: four of the seven drilled sections land on the
chapter that teaches them — `breakeven` on "Break-Even Analysis" (flat step 10), `ped` on "Price
Elasticity of Demand (PED)" (12), `index-numbers` on "Consumer Price Index (CPI) and Inflation" (15),
`multiplier` on "The Multiplier and National Income" (13, the check-in **after** the formula, which is
the stated reason for the `>=` at `:114`). The three weaker placements land on slots 4, 5 and 1 —
never 0.

---

## Unclaimed but relevant

No ledger item assigned to packet 13.2 was left unclaimed, and no other open item names a file this
diff touches. Three things the diff creates that no claimed id covers:

1. **`payback` reaches no student.** It is registered, drawn, marked, tested and green in
   `quant-check`, but it never renders. `decision-making-techniques` is the only WBS13 3.3.3 section
   and has 2 blocks, so 2 check-in slots; `lib/quant-pool.js:121` reserves slot 0, leaving one free
   slot for two unmatched drills, and `arr` takes it. The Quiz tab takes
   `templatesForSection(...)[0]` (`QuizTab.jsx:33`), which is `arr` in registry order. So one of the
   three templates this packet built is unreachable in the product. The placement test
   (`lib/quant-pool.test.mjs:154-162`) declares "the section takes what fits rather than doubling
   up", so this is a known behaviour meeting a 2-block section — but nothing in the packet says the
   drill is missing, and 13.3's queue will inherit it.
2. **The empty-`unitCode` cross-subject path** described under D020. One defensive `||` away from
   putting an Economics drill on a Business section; worth a line in DECISIONS or a tightened guard.
3. **No entitlement gate on the Quiz tab drill** (`QuizTab.jsx:25-27`, and the `!questions.length`
   branch at `:76-84`): a signed-out preview reader now sees a full marked calculation above the
   two-question preview. It is a generated item, not the bank, and the packet flags it as the
   founder's call — but it is a new free surface and should be an explicit decision, not a comment.

## Gate

Verify A passes: 11 of 11 claimed ids confirmed with `file:line` evidence, `ledger.mjs unverified
13.2` reports the gate clear, and build / test / validate / quant-check are all green. The packet
should not ship without Verify B at 390×844 on `national-income` and `meeting-customer-needs`, and
the `payback` gap above should be recorded in the handoff before 13.3 starts.
