# Packet 12.1 — what was built

Exam-practice item contract and the coverage guard. Code and one bank of data. **No content publish,
no DB write, no SQL executed.** Build green · `npm test` 187/187 · `npm run validate` exit 0 ·
`npm run contrast` clean.

Headline number, which did not exist before this packet:
**50 of 1,165 spec leaves are examined by at least one question — 4.3%.**

---

## E001 — the item contract

| file | what |
|---|---|
| `lib/exam-item.js` (new, 1–136) | The contract and its documentation in one file. `ITEM_KINDS` (44), `AO_CODES` (47), `aoListFor()` (66) derives `ao` from `lib/ao-spec.js` so it is never hand-typed, `kindForCommand()` (80), `contractProblems()` (95) is what the guard calls. |
| `scripts/packet-12-1-item-contract.mjs` (new) | Applies `kind`, `ao`, `stimulusRef` to all 66 items. Idempotent, dry by default. `specItems` is deliberately NOT written here — see E007's independence rule. |
| `data/modelAnswersData.js`, `data/modelAnswersExpansion.js` | All 66 items now carry `kind`, `ao`, `stimulusRef`; 21 carry `specItems`. Optional fields; the 22 live pages read none of them. |
| `scripts/packet-12-1-spec-items.sql` (new) | `spec_items jsonb` + `kind text` on `section_practice`, both nullable, two `NOT VALID` check constraints, a GIN index, column comments and a verification query. **Written, not run.** |

`lib/exam-item.js:21-26` and the SQL's header both state the rule that makes the number honest:
**absent `specItems` means "not tagged"; `[]` means "tagged as examining nothing" and is a guard
failure.** Collapse the two and an untagged bank reads as a clean one.

The guard tolerates the column's absence and says so on every run
(`audit/scripts/spec-coverage-check.mjs:290-296`).

## E002 — `npm run spec-coverage`

`audit/scripts/spec-coverage-check.mjs` (new). `package.json` gains `spec-coverage` and `spec-overlap`.

- 43 section rows, each with questions / untagged / examined / leaves / %; then per-unit totals;
  then a summary naming the denominator as **1,165**.
- `--section <id>` adds that section's command-word distribution and every unexamined leaf id with
  its wording. `--baseline` / `--baseline --confirm` mirror `validate-content.mjs`. `--json` for the
  tests, `--fixture` for E003, `--staged` below.
- Exits non-zero on three rules: `tariff` (a (command, marks) pair absent from `lib/ial-marking.js`
  for that subject), `specid` (a `specItems` id not in `spec-items.json`, or an empty array), and
  `noeval` (≥1 question and no `Evaluate 20`, or Economics `Discuss 14`).
- **Reads no database.** Bank 1 is the model answers; bank 2 is `audit/content-sections/` — the t=0
  dump of the published tables — with `--staged` switching to the newest `audit/snapshots/` bundle.

Two things worth reading in the source rather than re-deriving:

1. `:111-137` — why the default is the t=0 dump and not the staged rebuilds. Reading the bundles by
   default would report the FIXED content and hide the shipped defect. NEXT.md is explicit that
   market-failure's `Define (4)`, `Explain (6)`, `Analyse (10)` must be **reported**, and they are.
2. `:221-224` — the t=0 rows for most sections carry no `command` field, so the command word is
   derived with `practiceCommand()`, exactly as the Practice tab derives it. Without this every one
   of those rows reads as a blank command at an invalid tariff and the real failures are buried.

**No baseline file was written.** NEXT.md's acceptance 1 requires the guard to exit non-zero today,
and it does: **123 failures on the full run, all of them `tariff`** — 123 live practice items sitting
at a (command, marks) pair that appears on no IAL paper. `specid` fires nowhere, because every tag
this packet wrote was resolved against the oracle before it was written. `noeval` fires nowhere
either, which is a real result and not a dead rule: once the command word is derived the way the
Practice tab derives it, all 43 sections do carry an evaluative question. The rule is proved by its
fixture, not by the corpus.

## E003 — the fixtures

`audit/fixtures/spec-coverage/{clean,invented-spec-id,invalid-tariff,no-evaluative}.json` and
`audit/scripts/spec-coverage.test.mjs`, added to `npm test`. Six new tests, 187 total, green.

The four fixtures are the same section with one field changed each, so each failure is attributable:

| fixture | exit | rules fired |
|---|---|---|
| `clean` | 0 | none |
| `invented-spec-id` | 1 | `specid` only — `ECON-9.9.9-01` |
| `invalid-tariff` | 1 | `tariff` only — `Analyse 8` |
| `no-evaluative` | 1 | `noeval` only |

`spec-coverage-check.mjs:363-365`: a fixture is exempt from the baseline. A fixture whose failure key
had been baselined would pass silently and prove nothing.

## E004 — the 30 `Analyse 8` model answers

`scripts/packet-12-1-model-answers.mjs` (new), run with `--write`. 21 Economics items became
`Examine 8`, 9 Business items became `Discuss 8`.

Per item: `commandWord`, `type` → `'Analysis & Evaluation'`, question stem's first word, and
`markScheme` replaced by a levels grid. The grid's first row quotes `tariff-census.json`'s VERBATIM
Appendix 6 description for that command; then four levels; then the item's old point-based scheme
kept whole as **Indicative content**, so nothing an author wrote was discarded.

Verified by a text scan of both files rather than by importing them (the transform's own method):
`commandWord: 'Analyse'` at `marks: 8` → **0 blocks**; `question: 'Analyse ` → **0**;
`Examine` 21; `Discuss` 9.

**One thing this packet did not fix, and it needs an owner.** Changing the command word does not
change the answer. 11 of the 30 bodies contain no evaluative move at all — no counter-argument, no
"however", no limitation — and every one still claims `likelyScore: '7–8 / 8'`. A Level 4 Examine or
Discuss requires a brief assessment. The claim is now overstated on:
`unemployment-types-8`, `circular-flow-8`, `ppf-economic-growth-8`, `yed-business-strategy-8`,
`interest-rates-ad-8`, `costs-benefits-growth-8`, `profit-maximisation-mc-mr-8`,
`biz-product-life-cycle-8`, `biz-entrepreneur-role-8`, `econ-diseconomies-scale-8`,
`econ-competition-policy-8`. Rewriting a model answer's body is content authoring and outside this
packet; adjusting `likelyScore` by heuristic would be inventing a mark. Left for 12.2 / 12.4.

## E005 — the 20 Business section numbers

Same script. Every Business item now matches `/^[1-4]\.3\.[1-6]$/` and carries
`specSource: 'bus_spec.txt:<lines>'` plus `specItems`, both taken from the oracle rows whose WORDING
the question matches. The match table is `scripts/packet-12-1-model-answers.mjs:96-117`.

**The reason the rule says wording and not arithmetic:** `market-research-8` sat at `1.2`. Arithmetic
gives `1.3.2`. IAL Business 1.3.2 is demand, supply and the elasticities; market research is
1.3.1 · 2 at `bus_spec.txt:519-537`. One of twenty would have been filed under a topic that does not
contain it, and nothing downstream would ever have said so.

### The three maps this broke, and a wrong-subject link it exposed

`scripts/packet-12-1-model-answer-maps.mjs` (new). IAL Business 1.3.1 and IAL Economics 1.3.1 are
different topics with the same number, so two flat maps keyed on the bare number **collide** the
moment Business is renumbered:

- `SECTION_MODEL_ANSWERS_LINKS` and `SECTION_MODEL_ANSWERS_FAQ` are now `{ economics, business }`.
- `MODEL_ANSWERS_SECTIONS`'s Business numbers renumbered.
- `components/PracticeQuestionsTab.jsx:18-20` and `components/SectionModelAnswersPage.jsx:20` look up
  by subject; `components/ModelAnswersPage.jsx:165, 234` counts by `subject:number`.
- The 10 `app/business/*-model-answers/page.js` `sectionNumber` props updated to match.

**A live bug this found.** The app already numbers Business sections `1.3.1`–`2.3.5`
(`app/business/page.js:21`), while the LINKS map's Business half was keyed `1.1`–`2.5`. So today a
Business student on Meeting Customer Needs is offered the **Economics** Introductory Concepts model
answers, and no Business section can reach its own. Separately,
`app/business/raising-finance-model-answers/page.js` already passed `sectionNumber="2.3.1"` against
data that said `2.1`, so that page has been rendering zero answers. Both are closed by the
subject-keyed lookup.

**A page that is now honestly empty.** After the wording match, no model answer in the bank examines
Business 1.3.2 (demand, supply, elasticities). `the-market-model-answers` therefore has none. Its
LINKS entry is dropped so the Practice tab does not offer a card into an empty page, its copy says
what the topic is, and `SectionModelAnswersPage` renders an explanatory note instead of a blank list
(`components/SectionModelAnswersPage.jsx:57-68`, `.ma-empty-note` in `app/globals.css`).
**Authoring a Business elasticity model answer is a content job and is not done.**

## E006 — tariffs derive, and the chips are the paper's ladder

`lib/practice-tariffs.js` (new) computes everything from `lib/ial-marking.js`: `tariffsFor`,
`commandsFor`, `isValidTariff`, `markColor`, `markColorsFor`, `markFiltersFor`.
Economics → `2 4 6 8 14 20`. Business → `2 4 6 8 10 12 20`.

- `components/PracticeQuestionsTab.jsx:13-14` — `MARK_FILTERS` and `MARK_COLORS` derived per subject
  from `unitCode`. The whole ladder renders; a tariff with no question yet is **disabled**, not
  hidden, so the row reads as the paper's ladder (`:97-110`, `.practice-filter-btn.empty`).
- `components/learn-mode/utils.js:9` — the twin `MARK_COLORS` was a second hardcoded `4/6/10/20`.
  It re-exports `markColor` now; `components/learn-mode/InlinePractice.jsx:37` follows.
- `app/globals.css` — new `--practice-{2,8,12,14}-*` triples in both themes, because neither
  subject's ladder fitted the four that existed. `npm run contrast` clean.
- `components/admin/SectionEditor.jsx:3-11` (and `:561`, `:578`) — the practice editor's two dropdowns were typed out,
  including two command words that are in neither subject. Derived now, as the union of both
  ladders, with an `(off-spec)` option so editing another field cannot silently re-tariff an
  existing item.
- `lib/ial-commands.js:30` — `IAL_COMMANDS` is module-local, not exported. Nothing outside the
  file imported it, and an exported second name for ial-marking's table is how a second copy starts.
  The module's public surface is the four visibility helpers, as E006 asks.

**The acceptance grep in NEXT.md cannot pass as written, and this is not a shortfall in the work.**

```
grep -rn "Analyse" lib components app --include=*.js --include=*.jsx --include=*.mjs | grep -E "\[?[0-9]"
```

`grep -n` prefixes every line with `file:LINE:`, so `[0-9]` matches every line it is given. The
second grep filters nothing, and the check reduces to "no file under `lib/`, `components/` or `app/`
may contain the word Analyse". Nothing in this packet could make that true: `app/command-words/`
is an SEO page whose subject IS the command words, `lib/ao-spec.js` keys its AO table on them, and
`components/written-practice/WrittenQuestionCard.jsx` keys a colour map on them. None states a
tariff. The substantive check — `audit/EXAM-PRACTICE.md`'s own version — is:

```
grep -rnE "Analyse.*6|Discuss.*14" lib components app --include=*.js --include=*.jsx --include=*.mjs
```

It returns `lib/ial-marking.js` plus four pre-existing lines this packet did not introduce and did
not touch:

- `components/ExtrasTab.jsx:51` — restates both subjects' ladders in a comment. **Another session has
  this file modified right now** (`git status` shows `MM`), so rule 5 says hands off.
- `lib/ao-profile.js:722` and `lib/ao-rubric.js:68, 74` — the marker's own prompt table, quoted
  verbatim on purpose; `lib/ao-spec.js:32-38` documents why those strings must stay byte-identical
  to `SYSTEM_PROMPT`. Changing them breaks the guarantee that what we count is what the marker was
  told.
- `app/economics/market-failure/page.js:384` and `app/economics/globalisation/page.js:145` — SEO prose
  teaching students what the command words are. Sweeping the 22 SEO pages is 12.2's, not this one's.

## E007 — Market Failure tagged by two passes

| artefact | what |
|---|---|
| `audit/runs/packet-12.1/pass1-tags.json` | Pass 1. The author reading each question's TEXT ONLY against the 1.3.5 oracle rows. Written before pass 2 ran. |
| `audit/scripts/tag-lexical.mjs` (new) | Pass 2. A deterministic lexical matcher. Inputs: the question text and the oracle rows. Nothing else. Its rule is fixed in the header and was not tuned after its output was read. |
| `audit/runs/packet-12.1/pass2-tags.json` | Its output. |
| `audit/scripts/tag-merge.mjs` (new) | Intersects them and writes the two artefacts below. |
| `audit/runs/packet-12.1/tagging-diff.md` | 19 questions · pass 1 proposed 51 tags · pass 2 proposed 78 · **31 agreed and written** · 19 of 35 leaves (54.3%). Per-question agreement, both review lists, and every leaf with no agreed tag. |
| `audit/runs/packet-12.1/section_practice-tags.json` | The agreed tags for bank 2, **staged as a file**. Rule 6. |

Both versions of bank 2 are tagged, because both exist: the t=0 dump (what is published) and the
packet-25 rebuild (what publishing would serve). The one agreed model-answer tag is written into the
bank at `data/modelAnswersExpansion.js` on `negative-externality-tax-8`.

What the guard reports for the section:

```
npm run spec-coverage -- --section market-failure            20.0%   4 tariff failures   exit 1
npm run spec-coverage -- --staged --section market-failure   51.4%   0 failures          exit 0
```

Both percentages are strictly between 0 and 100, and both runs list unexamined `ECON-1.3.5-*` leaves
with their wording. The four failures on the default run are exactly the invalid tariffs NEXT.md's
fact block says the guard must report: `Define 4`, `Explain 6`, `Analyse 10`, `Outline 4`.

**The deviation, and it is the one thing in this packet a human should rule on.** The method says
pass 2 is "a separate agent". This session has no agent-spawn tool, so pass 2 is a deterministic
matcher instead. It is genuinely independent — it cannot see pass 1, it is a pure function of two
inputs, and anyone can re-run it — and it is reproducible in a way a second model pass is not. But it
is lexical, so it misses a question that examines a leaf in other words, which is why 3 of 19
questions have no agreed tag and stay **untagged**. Untagged is visible to the guard; a wrong tag
would not be, and would inflate the number permanently. Re-running pass 2 with an agent would raise
agreement and is worth doing before 12.4 tags the other 17 sections.

## E008 — `spec-overlap.mjs`

`audit/scripts/spec-overlap.mjs` (new), plus `npm run spec-overlap`.

```
node audit/scripts/spec-overlap.mjs globalisation causes-effects-globalisation   exit 1, 58 shared ids
node audit/scripts/spec-overlap.mjs market-failure national-income               exit 0, disjoint
```

A section resolves to its topic number through `spec-coverage.json`, and a topic's items are every
oracle row carrying that number **in either subject** — which is the point. Business 4.3.1 is
Globalisation, Economics 4.3.1 is Causes and Effects of Globalisation, and resolving within one
subject would make every cross-subject collision invisible. Packet 33's brief is the worked example
and the header cites it.

---

## Independent verification

Each check below finds its evidence by a different route than the thing that produced it.

| claim | how it was produced | how it was checked |
|---|---|---|
| denominator is 1,165 | `kind === 'leaf'` filter | structural: rows no other id extends with `-<x>`. Same 1,165, zero rows in one set and not the other. Also `counts.leaves` in the file, and the per-unit rows sum to 1,165 with 0 orphans — the 43 sections partition the leaves exactly. |
| zero `Analyse 8` remain | the transform script | text scan of both data files for blocks holding both `marks: 8` and `commandWord: 'Analyse'`: 0 |
| Business numbers are IAL | the transform script | `grep -o "sectionNumber: '...'"` over both files: every value matches `[1-4].3.[1-6]` |
| the guard's three rules fire | the guard | four fixtures under `npm test`, each isolating one rule, with a control that passes |
| chips read the Economics ladder | `markFiltersFor` | walked at 375×812 on the running dev server: `All Questions · 2 · 4 · 6 · 8 · 14 · 20`, **no 10**, 2/8/14 disabled, five questions render, no new console errors |

**What the walkthrough also showed, and the guard's header now says.** The live Practice tab served
`Analyse 6` and `Explain 4` where the t=0 dump holds `Analyse 10` and `Outline 4` — the packet 0 and
packet 13 in-place edits are in the database and in no file. So the guard's default reading is a
**lower bound** on the live bank, never an overstatement. Reading the table itself belongs to 12.4,
once `spec_items` exists and there is something to read.

## Not done, deliberately

- No SQL executed, no content published, no DB write.
- No `audit/spec-coverage-baseline.json`: the guard must exit non-zero today.
- The other 17 rebuilt sections are untagged (12.4). The page is 12.2 / 12.3.
- Turning tariff enforcement on in `isPracticeVisible` would hide almost every live item at once, and
  NEXT.md reserves that for the founder.
- `components/ExtrasTab.jsx` untouched: another session has it modified.
- `audit/EXAM-PRACTICE.md` untouched (rule 5).

---

# Fix round B1 — what Verify B rejected, and what changed

Round B1 closes Verify B's blocking Defect 1 and its Defects 2, 3 and 4. Defect 5 is recorded here as
pre-existing and left alone, per `git blame`. **No content publish, no DB write, no SQL executed.**
`npm test` 194/194 · `npm run build` exit 0 · `npm run validate` exit 0 · `npm run contrast` clean ·
`npm run spec-coverage` exit 1 (unchanged — see the note on the headline number below).

## Defect 1 (blocking) — the 10-mark question no chip could reach

**Founder decision, 18 September 2026, option A.** The chips derive from the subject's `ial-marking`
ladder **plus any tariff actually present in that section's visible questions**. An off-ladder tariff
gets its own chip, visibly marked as not an IAL tariff. Nothing becomes unreachable and no live
question is hidden. Tariff enforcement in `isPracticeVisible` stays **off**.

| file | what |
|---|---|
| `lib/practice-tariffs.js:82-125` | `markFiltersForSection(unitCodeOrSubject, presentMarks)`. The ladder, union the tariffs the section's visible questions carry, ascending. On-ladder → `{ value, label: 'N Marks', offLadder: false }`; off-ladder → `{ value, label: 'N · not IAL', offLadder: true }`. `markFiltersFor` is kept and now delegates with an empty `presentMarks`, so its contract — the bare ladder — is unchanged and still tested. |
| `components/PracticeQuestionsTab.jsx:19-31` | `counts` moved **above** the chip row, because the chips are now built from it. `MARK_FILTERS = markFiltersForSection(unitCode, Object.keys(counts).map(Number))`. |
| `components/PracticeQuestionsTab.jsx:95-119` | The off-ladder chip gets `.off-ladder` and an `aria-label` of `10 marks — not an IAL tariff for this subject`; the `empty` chip's label is untouched. |
| `app/globals.css` (beside `.practice-filter-btn.empty`) | `.practice-filter-btn.off-ladder { border-style: dashed; }` — a non-colour cue, so **no new colour token and `npm run contrast` is unaffected**. |
| `lib/practice-tariffs.test.mjs` (new, 7 tests) | Registered in `npm test`. The first test is the invariant itself: **every tariff a visible question carries has a chip, and the chip counts sum to "All Questions"**. That is the assertion E006 could not have passed. |

One guard worth naming: `Number(null)` is `0`, and `0` is finite. An item with a missing `marks`
would have minted a `0 · not IAL` chip, so the filter is `Number.isInteger(m) && m > 0`. There is a
test for it.

## Defect 2 — 30 commentaries and 30 likely scores that argued with their own levels grid

`scripts/packet-12-1b-commentary.mjs` (new), run with `--write`. Idempotent; a second run reports
`0 rewritten, 30 already current`.

E004 printed a levels grid whose Level 4 is reached only by a brief assessment, and left the
commentary and the score alone. One card told the student its answer "shows evaluative awareness
without being asked to evaluate" beside a descriptor saying the assessment is the clause that
separates Examine from Analyse.

**The derivation, stated so a verifier can re-run it rather than trust it.** The score is read off
the grid now printed on the card, from **one field: `answerParagraphs`** — the worked answer the
student is shown.

- **Level 4 → `7–8 / 8`**: the answer *makes* a brief assessment — a qualification the chain is made
  to depend on, a counter-consideration, a stated limitation, or competing factors weighed against
  each other. **17 items.**
- **Level 3 → `5–6 / 8`**: a developed chain in context, but the assessment is implied rather than
  made. That is the grid's own Level 3 wording. **13 items.**

Nothing is scored below Level 3; all 30 carry a developed chain in context, which is what Level 3
requires. Every Level 3 commentary names the *specific* brief assessment that would take **that**
answer to Level 4, so the card now teaches the clause instead of contradicting it.

`peel` is deliberately **not** scored. It is the plan, not the answer, and a Level 4 needs the
assessment to be made rather than planned. Two items — `costs-benefits-growth-8` and
`biz-entrepreneur-role-8` — carry the assessment in the plan's Link sentence and nowhere in the
answer; their new commentary says exactly that and tells the student to write it in.

**Where this disagrees with the earlier note in this file.** The "11 bodies with no evaluative move"
list above was produced by a different reading. Re-read item by item against the two ladders, the
Level 3 set is 13, not 11: it agrees on 10 of the 11, **adds** `maximum-price-8`,
`negative-externality-tax-8` and `monopsony-wages-8`, and **removes** `unemployment-types-8`, whose
closing sentence does make a judgement (demand-side policy is right for cyclical unemployment and
wrong for structural). The earlier list was informal and is superseded by the table in the script,
which is the record.

Five items previously read `7 / 8`; all five are Level 4 and now read `7–8 / 8`, so the score is the
band the grid states, uniformly, for all 30.

## Defect 3 — `market-research-8` headed with the wrong section

`data/modelAnswersData.js` — `sectionTitle` `'The Market'` → `'Meeting Customer Needs'`, and the
comment above the item renumbered from `1.2 The Market` to `1.3.1 Meeting Customer Needs`. The number
`1.3.1` was already right (E005's wording match); only the title lagged.

Rule 4, applied: every other field of the entry was read, and then **every other item in both banks**
was checked for the same class of defect by grouping on `subject + sectionNumber` and asking whether
the group's `sectionTitle` values agree. Exactly one group disagreed — this one. All 30 other groups
are internally consistent.

One thing found by that sweep and **not** changed: the bank titles Business `2.3.1` as
`Raising Finance`, while `app/business/page.js:29` calls it `Planning & Raising Finance`. The bank is
self-consistent and the SEO route is `/business/raising-finance-model-answers`, so this is a naming
question for a page packet, not a wrong-section header.

## Defect 4 — `"The rest of Businessis covered"`

`components/SectionModelAnswersPage.jsx:58-66`. The sentence was written across two JSX lines with
the subject in an expression; JSX drops the whitespace between an expression and a following line
break, so the space before "is" disappeared. It is now one template literal on one line, so the
defect cannot come back through re-wrapping. The reason is in the comment beside it.

## Defect 5 — the last Learn step promising a next chapter: PRE-EXISTING, left alone

`git blame -L 470,485 components/LearnModeTab.jsx` puts `` return `Before the next chapter: ${list}.` ``
at **bf62d19, 2026-09-16, "packet-17: a chapter check-in names only what it carries"**. Packet 12.1
committed nothing and did not touch this file. Per the instruction for this round, it is recorded
and not fixed: on the last step of the last chapter the sentence names a chapter that does not
exist, and the resume banner is not dismissed by tapping Next rather than Continue. Both belong to
whichever packet owns `LearnModeTab`.

## Verification — each check finds its evidence by a different route than the fix

| claim | how it was produced | how it was checked |
|---|---|---|
| every visible question has a chip, in **every** section | `markFiltersForSection` inside the React component | a sweep over all 43 sections that fetches `GET /api/sections/<id>` from the running dev server, applies `isPracticeVisible` and `markFiltersForSection` in Node, and compares the chip-count sum with the visible-question count. **43 checked, 0 failures**, and exactly two sections carry an off-ladder tariff: `economics/aggregate-demand` and `economics/consumer-behaviour-demand` — the two Verify B named |
| the chip renders and reaches the question | the sweep, in Node | walked at 390×844 on a dev server restarted after `rm -rf .next/cache`: Aggregate Demand reads `All Questions 4 · 2 Marks 0 · 4 Marks 1 · 6 Marks 1 · 8 Marks 0 · 10 · not IAL 1 · 14 Marks 0 · 20 Marks 1`, chips sum to 4, `border-style: dashed`, and clicking it filters to the 10-mark `Analyse`. `document.scrollWidth` 390 |
| Market Failure's ladder is unchanged | — | same walk: `All 5 · 2 · 4 · 6 · 8 · 14 · 20`, **no 10**, chips sum to 5. The packet's own Verify B line still holds |
| the new commentary and score are what the student gets | the rewrite script's own report | `curl` of the server-rendered HTML for `/economics/market-failure-model-answers`, grepped: the old `"shows evaluative awareness without being asked to evaluate"` appears **0** times, the new sentence **2**, `5–6 / 8` **2**, `7–8 / 8` **0** on that page. Then read back in the DOM at 390px: `Likely Score 5–6 / 8`, commentary column 316px, widest element 369px, no clipping |
| no hardcoded tariff was reintroduced | — | `grep -rnE "Analyse.*6\|Discuss.*14" lib components app` returns `lib/ial-marking.js` plus the same pre-existing lines this file already lists; nothing new |
| the packet's coverage number is unaffected | — | A/B against a control: the two data files were swapped for their pre-B1 versions (`git show :data/modelAnswersData.js`), the guard re-run, and swapped back. **55 of 1,165 both ways.** Fix round B1 moves no leaf |

**A number in this file no longer reproduces, and B1 is not the cause.** The headline above says
*50 of 1,165 (4.3%)*; the guard reports **55 of 1,165 (4.7%)**, before and after B1 alike. The guard
reads bank 2's tags from `audit/runs/packet-12.1/section_practice-tags.json`
(`spec-coverage-check.mjs:154`), so 50 was measured before E007's agreed tags were merged and 55 is
the post-tagging number. `audit/PROGRESS.md` quotes 50 and is not this round's to edit — **the
founder or the next packet should correct it to 55 / 4.7%.**

## Not done, deliberately

- No SQL executed, no content published, no DB write, nothing committed.
- `isPracticeVisible` still hides by command word only. Tariff enforcement stays the founder's call.
- Defect 5 (`LearnModeTab`) recorded, not fixed — pre-existing.
- `audit/NEXT.md`, `audit/PROGRESS.md`, `audit/DECISIONS.md`, `audit/EXAM-PRACTICE.md` untouched.
- `components/ExtrasTab.jsx` untouched: another session still has it modified, and the index still
  carries that session's revert of `00662a3`.
