# Packet 42 — built. `business__resource-management`, rebuilt to IAL 2.3.4

**STAGED, NOT PUBLISHED.** All eight content tables written to the `draft` column only. `data` is
untouched. Nothing committed; files staged by explicit path, `audit/ledger.json` deliberately left
unstaged (see "Bookkeeping").

Section `resource-management` · Business Unit 2 (WBS12) · IAL **2.3.4**, `audit/raw/bus_spec.txt:965-1002`.

| | live (t=0) | staged |
|---|---|---|
| blocks | 4 | **4, the specification's own sub-topics** |
| subsections | 10 (2 to a step) | **26, one to a step** |
| quiz | 25 | **35** (3 unpinned pre-test; keys 9/9/9/8 across indices 0-3) |
| practice | 5 (3 reachable from no block) | **10**, all eight command words, every one pinned |
| diagrams | **0** | **4, 8 views**, pinned by `diagramId` |
| recalls | **0** | **26** — 7 fill-in, 11 classify, 6 match, 2 reorder |
| flashcards / mistakes | 24 / 5 | 36 / 8 |
| extras | 1 chain set | 7 chains + 2 evaluation |
| validator | **30 BLOCK / 17 DEBT / 2 INFO** | **0 BLOCK / 0 DEBT / 2 INFO**, 0 new of either |
| spec coverage | 21 covered / 7 thin / 2 missing | **28 of 28 leaves (100%)** |
| `recall.recoverable` | n/a (no recalls) | **0** — no row in `recall-census-baseline.json`, held to zero |

Files:

- `scripts/_packet42-util.mjs` — id scheme, formatters, the specification's own lists, and `BIZ`,
  the one invented assembler every figure is derived from.
- `scripts/_packet42-content.mjs` — 4 chapters, 26 subsections, 26 recalls, `LEAF_MAP`, `NOTES`.
- `scripts/_packet42-diagrams.mjs` — 4 diagrams, 8 views, `COLLIDE_TOL` and `LEAD`.
- `scripts/_packet42-assessment.mjs` — quiz, practice, flashcards, mistakes, extras.
- `scripts/packet-42-resource-management.mjs` — the runner and its checks.
- `audit/runs/packet-42/verify-draft.mjs` — gate item 5, read back off the served route.
- `audit/snapshots/2026-09-22-pre-packet-42__business__resource-management.json` — t=0 `data`.
- `audit/snapshots/packet-42-bundle__business__resource-management.json` — the dumped bundle.

---

## Gate

| command | result |
|---|---|
| `npm test` | **exit 0**, 279 pass / 0 fail |
| `npm run build` | **exit 0** |
| `npm run validate` | **exit 0**, 0 new BLOCK / 0 new DEBT outside the baseline |
| `npm run exposure` | **exit 0**, 0 starved / 0 unwritten, signed in and signed out |
| `npm run recalls` | **exit 0**, "no section is worse than the baseline" |
| `node audit/scripts/check-staged-drafts.mjs resource-management` | **matches, 0 drift** |
| `node audit/runs/packet-42/verify-draft.mjs` | **exit 0**, every served field checked |
| `node audit/scripts/ledger.mjs unverified 42` | **GATE BLOCKED: 29 claimed, unconfirmed** — correct; Verify A has not run |

`audit/runs/packet-42/gate.log` holds the raw output.

**Gate item 5, and the independence of it.** `check-staged-drafts.mjs` compares the served draft
with the dumped bundle and reports "matches". That is a same-shape comparison: it would agree with
a bundle that was wrong the same way in both places. So `verify-draft.mjs` imports **nothing** from
the packet. It fetches `http://localhost:3001/api/sections/resource-management?draft=1`, re-parses
the Appendix tariff table out of `bus_spec.txt` itself, re-reads the leaf oracle out of
`spec-items.json`, re-greps the banned vocabulary out of the returned payload, and decides which
chapter a pinned quiz item belongs to **by its topic words** rather than by the `block` tag — which
is stripped before the payload is written, so that check cannot agree with the builder's own
derivation by construction.

Two things that check had to be narrowed, and both narrowings are A/B'd rather than asserted:

- the anonymous route serves **7 of the 35** quiz items (the free-quiz budget), so a histogram over
  it is not evidence about a distribution. The bank is read out of the `draft` **column** instead —
  a third access path, neither the HTTP route nor the packet's modules — and reads **9/9/9/8 of 35**.
- the "no year" sweep fired on `xmlns="http://www.w3.org/2000/svg"` and on the row's own timestamp.
  It now runs over the non-SVG strings plus every SVG `<text>` body, and is A/B'd against the live
  Toyota sentence it exists to keep out and against a benign sentence it must not catch.

---

## Per ledger id

**29 claimed, 1 `wont-fix`.** `node audit/scripts/ledger.mjs packet 42` → 30 items.

### Refused

**`specGap-09` — `wont-fix`, with the evidence in the ledger note.** It asks to renumber correct
content ("content sits under 2.3.4 but IAL Resource management is 2.4") into a chapter the
specification does not contain. Asserted at build time by line:
`scripts/packet-42-resource-management.mjs:144-152` reads `audit/raw/bus_spec.txt` and requires
`:965` to be `2.3.4 Resource management`, `:1009` to be `2.3.5 External influences`, and the strings
`2.4.1`–`2.4.4` to appear **0** times in the whole file. Nothing renumbered.

### Closed — chapter 1, Production, Productivity and Efficiency (1a-1e)

| id | leaf, by wording | where |
|---|---|---|
| `specGap-04` | 1a-4 `cell` | `_packet42-content.mjs:107` `flow-and-cell-production`. Taught as the fourth method beside job, batch and flow. The runner asserts at `packet-42-…:431` that it is **not** introduced inside the lean subsection, which is the live defect. |
| `specGap-05` | 1b-2 factors influencing productivity | `_packet42-content.mjs:182` `factors-influencing-productivity`, five factors each with its own paragraph; runner asserts ≥4 body blocks at `packet-42-…:495`. |
| `specGap-03` | 1c-1 production at minimum average cost | `_packet42-content.mjs:241` `efficiency-at-minimum-average-cost`. Efficiency is defined by the specification's own test, and the runner **searches the cost curve for its own minimum** (`packet-42-…:266-271`) rather than trusting the sentence. |
| `specThin-01` | 1c-2, 1c-3 factors influencing / ways to improve efficiency | `_packet42-content.mjs:267` `factors-and-ways-to-improve-efficiency`, both bullets as lists, ranked by what each is worth. |
| `specThin-02` | 1e short product lead-in times | `_packet42-content.mjs:315` `short-product-lead-in-times`, defined, worked (9 months → 5, $384,000 earned early) and distinguished from a delivery delay. |
| `structure-04` | — | one subsection to a step throughout; `buildContent` has no pairing, and the runner refuses a chapter more than twice the length of another. |

1d has no open id and survives the rebuild at `_packet42-content.mjs:289`, with the crossover
output derived rather than asserted.

### Closed — chapter 2, Capacity Utilisation (2a-2c)

| id | what became true |
|---|---|
| `specGap-08` | Re-scoped and **built**, not left. The item says over-utilisation is "adequate" in one paragraph; 2b reads "under- **and** over-utilisation", so each direction now has its own subsection (`_packet42-content.mjs:369` and `:394`) and the runner requires leaf 2b to map to **two** subsections (`packet-42-…:419`). The over half is costed: the correction rate rises 4% → 6%, $3,900, plus $8,000 of penalties. |
| `structure-10` | The worked calculation with a twist the item asks for. Rationalisation moves the **denominator**: closing a line takes maximum output 4,000 → 3,200, so the same 3,000 bicycles reads 93.75%. In the teaching (`_packet42-content.mjs:417`), drawn as the second view of the capacity diagram (`_packet42-diagrams.mjs:209`), and put in front of a student as `Calculate (4)` — the runner asserts both at `packet-42-…:478-479`. |

2c (**one of the two leaves `spec-coverage.json` calls MISSING**, and it has no ledger id) is built
in both directions: `ways-of-raising-capacity-utilisation` and `ways-of-relieving-over-utilisation`.
The packet spec's own summary of it says "ways of dealing with OVER-utilisation"; the leaf at
`bus_spec.txt:988-989` reads "(under and over utilisation)", so both halves are built and the runner
requires two subsections.

### Closed — chapter 3, Inventory Control (3a-3f)

| id | what became true |
|---|---|
| `specGap-01`, `structure-03`, part of `topFix-02` | 3a, **the diagram the specification names**. `_packet42-diagrams.mjs:261` — two cycles of a sawtooth, every coordinate derived from the usage rate. The other half of `structure-03` is that no block carried a pin at all: every chapter now pins by `diagramId`, and the runner refuses `diagramRef` anywhere in the bundle. |
| `specGap-02`, rest of `topFix-02` | 3b and 3c as their own ideas, not implicit inside JIT: `buffer-inventory` (`:504`) and `implications-of-poor-inventory-control` (`:526`). The packet spec is right that the item's premise as written is false — both are present live — so it is re-scoped to depth and vocabulary. |
| `accuracy-01`, `topFix-03` | 3d. The Toyota 2021 claim is **removed, not corrected** (packet 15's rule, endorsed by packet 40). The JIT trade-off is taught from this section's own figures: $4,725 a month saved against $18,000 for one stopped day, which is 3.81 months of the saving. The corrupted `realExample.emoji` cannot return — every emoji is written fresh and the runner refuses U+FFFD anywhere in the bundle (`packet-42-…:129`). The unsourced Rolls-Royce / JLR / BrewDog claims are gone with the rest of the old section, and a named real company fails the build. |
| `specGap-07` | 3e `waste-minimisation` (`:572`) and 3f `competitive-advantage-from-lean-production` (`:594`) are now Learn Mode **content**, which is what the item reports missing. The runner enforces it in both directions: every teaching term used in the notes or the extras must appear in some subsection's body (`packet-42-…:668-676`). |
| `structure-05` | The block titled "Inventory Management" while half of it was lean, kaizen and cell. Fixed a layer below the item's own wording: **lean production and waste minimisation are 3e and 3f, inside sub-topic 3**, so they belong here; kaizen is 4c and moved to chapter 4; cell is a bullet of 1a and moved to chapter 1. The runner asserts all three (`packet-42-…:444-449`). |
| `structure-08` | The takeaway "JIT eliminates stock-holding costs" against the subsection's own misconception. The chapter-3 takeaway now reads "JIT minimises what is held; it does not eliminate it", and the runner refuses any takeaway asserting elimination while the misconception denies it (`packet-42-…:451-458`). |

### Closed — chapter 4, Quality Management (4a-4d)

| id | what became true |
|---|---|
| `specGap-06` | Quality circles, its **own** subsection (`_packet42-content.mjs:647`) with the three defining features. **Built against 4a, not 4c.** The item cites "2.4.4c"; after the 2.4 → 2.3.4 correction the letter is still wrong — `circles` is the third bullet of **4a** (`bus_spec.txt:999`), beside `control` (`:997`) and `assurance` (`:998`); `4c` is Kaizen (`:1001`). `spec-coverage.json`'s own `thinItems` gets this right ("4a) Quality circles"); the ledger item does not. The runner asserts the map agrees with the document (`packet-42-…:440`). |
| `structure-06` | Kaizen taught **once**, at 4c (`_packet42-content.mjs:693`), and the runner counts the subsections whose teaching text mentions it and requires exactly one (`packet-42-…:434-436`). Quality circles is no longer an alias: the runner refuses the word "kaizen" appearing in the circles subsection at all. |

4b and 4d have no open ids and survive at `:669` and `:724`.

### Closed — cross-cutting

| id | what became true |
|---|---|
| `topFix-01`, `quiz-02` | The bank is **authored, not edited**, per the founder's 22 September ruling. Keys are written first and **dealt** into a position from a hash of the item's own stem (`_packet42-assessment.mjs:86-94`), so 9/9/9/8 across 0-3 is a property of construction. The gate is A/B'd against the live distribution it has to fail (`packet-42-…:526-531`). **Correction to three documents: the live bank is 23 of 25 at index 1, not 22** — counted directly on `correctIndex`, and `topFix-01`, `quiz-02` and the 22 September `DECISIONS.md` entry all say 22. Substance unchanged. |
| `quiz-01`, `structure-01` | The block 0 / block 1 swap. Fixed by deriving `quizIndices` from each item's own chapter tag (`packet-42-…:81-86`), so a swap is unrepresentable rather than corrected. The runner re-asserts it on the tag; `verify-draft.mjs` re-asserts it on the **served payload by topic words**, because the tag is stripped before the payload is written. |
| `structure-07` | The three never-surfaced practice items. `practiceIndices` derived the same way; the runner and the served-draft verifier each require every practice item to be reachable from some chapter. |
| `structure-02`, `topFix-04` | 26 recalls from zero, all four contract types, the fill-in contract enforced before the validator sees it. Fill-ins for **both** formulas (`measuring-capacity-utilisation`, `measuring-productivity`) and for the QC/QA/TQM contrast; reorder reserved — 2 of 26, one of them the kaizen cycle, and the runner refuses more than 2. |
| `topFix-05`, `practice-01` | 10 practice items, all eight command words at Unit 2 census tariffs, every stem ending in its own tariff. `practice-01` is right that a 4-mark Define is not an IAL format: Define is 2. |
| `structure-09` | 8 common mistakes. The five the item calls real are kept (productivity vs production, JIT as zero, lean as JIT, 100% as the target, "just cut prices"); the three it calls filler are gone; the three it asks for are added (utilisation above 100%, assurance as "no inspection", productivity as effort). The runner asserts each of the seven by a distinctive string and refuses the two filler titles by name (`packet-42-…:482-492`). |

---

## Where this packet departed from an item, and why

Each of these is a departure a verifier reading the item's own wording will see. None is silent.

1. **`topFix-02` / `structure-05` ask for the block to be retitled "Stock Control and Lean
   Production".** Refused on Rule 2. Measured in `bus_spec.txt`: `inventory control` **4** hits,
   `buffer inventory` **1**, against `stock control` **0**, `buffer stock` **0**, `re-order` **0**,
   `lead time` **0**, `stock-out` **0**. The requirement each item names is real and is built; the
   vocabulary is the specification's. The chapter is "Inventory Control".

2. **Those five phrases appear on the drawing and nowhere else.** Leaf 3a asks a student to
   *interpret* an inventory control diagram, and an exam paper labels one with exactly those words.
   The packet spec's acceptance check is "0 outside diagram labels", so the runner bans them over
   every readable string except a diagram's `<text>` bodies, A/B'd in both directions — and then
   checks the exemption the other way, requiring the inventory diagram to **carry** all five,
   because a ban satisfied by deleting the drawing has removed the requirement instead of meeting
   it. The teaching text names each line by what it does ("the point at which a fresh order goes
   out", "the delivery delay"). Measured on the served draft: **0 occurrences**.

3. **`topFix-04` asks for a fill-in on "the seven wastes".** `seven wastes` is **0** hits in the
   specification; 3e is "waste minimisation". The waste recall is a classify on this section's own
   customer test instead, over the three kinds it costs out. The other three fill-ins the item names
   are built exactly as asked.

4. **`topFix-05` asks to "replace point-scores with Level 1-4 descriptors".** Refused for the
   low-tariff items. The Appendix marks on points at 6 marks and below and on levels above, which is
   the convention packets 36 and 40 shipped and their verifiers confirmed; a 2-mark Define with four
   level bands would be a worse mark scheme, not a more authentic one. The runner enforces the split
   (`packet-42-…:212-216`). `Discuss` asks for a **brief assessment** and never a conclusion (V036).

5. **`topFix-05`'s block placements ("surface Q2/Q3 on Block 3, Q4 on Block 1") are not used.**
   They are positions in the live four-block structure this packet replaces. The requirement under
   them — every practice item reachable from the chapter it belongs to — is met by derivation.

6. **`topFix-05` asks for "a short stimulus" on two practice items.** Built as a **self-contained
   mini-case inside the stem**, with this section's own figures. `DECISIONS.md` (Open) records that
   Business extract sourcing is unresolved and blocks work depending on `content/data-response/`;
   `ls content/data-response/` confirms `resource-management` is not one of the six that exist. A
   mini-case in a prompt is a different shape from a sourced extract, and packet 36 built its eleven
   items the same way for the sibling Unit 2 section. Nothing here touches that pipeline or that
   open decision.

7. **`structure-04`'s proposed subsection order for chapter 1** (job-batch-flow, labour-vs-capital,
   productivity) is not followed; the chapter follows the specification's own bullet order, which is
   what every other chapter does. The defect `structure-04` actually reports — two subsections to a
   step — is fixed.

---

## What was checked, at what scope, and what was not

**Checked.** Everything in the Gate table above, at the scope each command covers. The served-draft
verifier checked every field the anonymous route returned and printed a count for. Leaf coverage was
measured **twice by different methods**: the validator's own `spec.coverage` (28 of 28) and, in
`verify-draft.mjs`, an independent probe that requires every distinctive word of each oracle row's
*wording* to co-occur inside one served teaching field (28 of 28).

Diagram labels were checked **as geometry, not as pixels**: text extent inside the 400-unit canvas,
a 12-unit font floor, glyph-box collisions at `COLLIDE_TOL` 1.2 of a face and a line-crossing check
that handles vertical segments — all four found real defects in this packet's first draft (a series
label sitting on the axis, two labels 6 units apart, a caption 10 units under a bar label, and a
near-black fill that is not a key of `processSvg`'s `PALETTE`), and all are fixed. The guard is A/B'd
against geometry the runner derives from `BIZ` itself rather than reusing any log.

**Not checked, and therefore not claimed.**

- **Nothing has been rendered.** No browser, no viewport, no `getComputedTextLength()`. The collision
  work above is authored-geometry arithmetic on the emitted SVG at a 400-unit frame. It is *not*
  evidence about what a label measures at 390×844, and this packet makes no claim at that width.
  Verify B has to measure it.
- **No student walked the deck.** The pre-test, the check-ins, the recalls grading on real input and
  the enlarge sheet are all unexercised by this phase.
- **Rule 3 (fields on `origin/main`) was not run.** It is a pre-publish check and nothing is being
  published. It must run before any publish, and see the escalation below.
- **The 26 recalls are at zero `recall.recoverable` by the validator's lexical measure.** That rule's
  own docstring says it is a floor: a paraphrase is invisible to it. Zero means not caught, not
  cleared.

---

## Escalations

1. **PUBLISH IS RULE 6 AND IS NOT DONE HERE.** The content is staged to `draft`. The publish line,
   for a human:

   ```
   node scripts/packet-42-resource-management.mjs --stage --dump
   node scripts/publish-section.mjs resource-management --confirm
   ```

2. **AND IT MUST NOT BE RUN YET.** `DECISIONS.md`, 2026-09-15 (Settled): *"Until packets 5 and 7 ship,
   no section authored to the recall contract is publishable."* This section carries **26 recalls and
   4 diagrams from zero**. Packets 5 and 7 are staged and held at the packet 5/7 checkpoint, so this
   section joins that checkpoint rather than shipping on its own. Before it ships, the pre-publish
   check reads the **fields** the components on `origin/main` actually access — matching type names
   is not the test (packet 15 killed the most-opened section in the product that way).

3. **THE SHARED INDEX HOLDS 133 STAGED DELETIONS THAT ARE NOT THIS PACKET'S.** `git status` shows
   `D ` for 133 tracked files, 23 of them `scripts/_packet3*` builder modules for packets 32-35 and
   39 — and every one of those files is still present on disk as untracked. Any session running a
   bare `git commit` in this worktree commits those deletions. This is the packet-23 hazard
   `PROTOCOL.md` opens with. **Not touched by this packet** and not mine to resolve; flagged for the
   founder before the next commit in this worktree.

---

## Bookkeeping

Staged by explicit path, one `git add` each. Nothing committed.

`audit/ledger.json` is **written but deliberately not staged**: 29 `claim`s and one `wontfix` went
through `audit/scripts/ledger.mjs`, and rule 5 says never to have it in the index while a verifier is
running — which is exactly what happens next. The gate phase stages and commits it.

`audit/EXAM-PRACTICE.md` not opened. `audit/PROGRESS.md`, `audit/NEXT.md` and `audit/DECISIONS.md`
not touched: those are the handoff phase's, and the handoff-file race is unrecoverable if two
sessions rewrite them from different bases.

---

# Fix round 1 — `C-resource-management-structure-09` (22 September 2026)

**The rejection was right.** The three replacement misconceptions the finding asked for were present
and `QC is a bad method` was gone, but two of the three it asked to DROP were still being taught, as
subsection `misconception` fields in the quality chapter:

| where | the filler that survived |
|---|---|
| `content[3].sections[2]` Total Quality Management | "Students write that TQM guarantees zero defects." |
| `content[3].sections[3]` Continuous Improvement (Kaizen) | "Students describe kaizen as a project with a start and an end." |

## Why the runner's own structure-09 gate passed while both were live

`packet-42-resource-management.mjs` checked the removals like this:

```js
for (const [gone, why] of [['guarantees zero defects', …], ['one-off project', …]]) {
  if (MISTAKES.some((m) => m.title.toLowerCase().includes(gone))) problems.push(…);
}
```

Two blind spots, and the finding fell through both. It read **`MISTAKES[].title` only**, and a
subsection `misconception` is not a `MISTAKES` row — this is rule 4 exactly: a check written for one
surface is no evidence about the surface beside it. And it matched the **literal string**
`one-off project`, which the kaizen text never contains: it says "a project with a start and an end",
which is the same claim in different words. The additions were real; the removals were never checked
where they live.

## What changed

**`scripts/_packet42-content.mjs`** — the two `misconception` fields, replaced with errors a Unit 2
candidate actually makes, each answerable from its own subsection's teaching:

- **TQM** — recommending TQM as the fix the moment an extract mentions faults, as though it could be
  switched on this quarter. Corrected by what the body already teaches: cost first, return late,
  abandoned more often than disproved, and a fault rate that has to fall before the next order ships
  is a different question. It is an **evaluation** error, which is where the marks are.
- **Kaizen** — dismissing kaizen because no single change is worth much. Corrected by the
  subsection's own worked case: the size of a step is the point of it, not the objection to it, and
  the judgement is what a year of steps adds up to.

Neither reuses the three replacements the finding named (they are already at `b1s0`, `b3s0`, `b0s4`
and are untouched), neither duplicates the quality-circles misconception beside them, and neither
repeats `quiz[31]`'s distractor. Both were **cut to fit the word budget**: the first drafts were 85
and 78 words and the runner refused them with `NEW DEBT step.words … 388 / 384 words (budget 350)` —
so the budget caught a real regression and the shipped versions are 51 and 56 words, one word longer
in total than the two they replace.

**`scripts/packet-42-resource-management.mjs`** — the structure-09 removal gate rewritten so the
defect it missed is unrepresentable. It now collects **every surface that teaches a student error**
out of the assembled bundle (`content[].sections[].misconception` plus each `MISTAKES` row's title,
quote, why and fix) rather than out of the `SUBSECTIONS` array the author edits, and matches each of
the **three** fillers by the **shape of the claim** rather than one phrasing. Quiz options are
deliberately outside the set: a wrong option is supposed to state a wrong thing, and `quiz[31]`'s
"the total number of defects being reduced to zero" is the distractor that makes that item work.

## Verified independently — different evidence, different detector, A/B'd

`audit/runs/packet-42/verify-structure-09.mjs`. A check that finds its evidence the way the fix does
cannot see the fix's blind spot, so this one differs on both axes from the runner's gate:

- **Evidence** comes over HTTP from the **served draft** (`/api/sections/resource-management?draft=1`),
  not from the module and not from the bundle file the runner writes. A fix applied to a module and
  re-dumped but never re-staged fails here. The file and the served row are also compared string for
  string across all 26 `misconception` fields: **0 drift**.
- **Detection** is token overlap against the two rejected sentences *as the verifier quoted them*,
  plus a claim-shaped scan for all three fillers — not the runner's regexes.
- **A/B against a control.** The same detector over the pre-fix bundle fires **4 times** (both
  subsections, by both methods); over the served draft it fires **0 times**. A detector that fires
  nowhere is not evidence of a fix.

```
SERVED DRAFT (HTTP) — subsections: 26 student-error surfaces · 0 filler claim(s)
DUMPED BUNDLE — mistakes only (premium-gated over HTTP): 8 surfaces · 0 filler claim(s)
drift file vs served draft, misconception fields: 0 of 26
CONTROL (pre-fix bundle): 34 surfaces · 4 filler claim(s)
PASS — served draft 0 filler claim(s), control 4 (must be >= 2)
```

A separate sweep of the **whole** anonymous served payload for the three claim shapes — not just the
misconception surfaces — returns 0.

**Scope of that sentence, honestly.** `mistakes` is premium-gated: the anonymous draft route returns
`[]` while `counts.mistakes` says 8. That surface is judged from the re-dumped bundle file, not from
the route, and the script says so in its output rather than letting an empty array read as a clean
one. Nothing here was rendered in a browser; no claim is made at any viewport.

## Gate, re-run after the change (`audit/runs/packet-42/gate-fix-1.log`)

| command | exit |
|---|---|
| `npm test` | 0 |
| `npm run build` | 0 |
| `npm run validate` | 0 |
| `npm run exposure` | 0 |
| `npm run recalls` | 0 |
| `node audit/scripts/check-staged-drafts.mjs resource-management` | 0 — matches, 0 drift |
| `node audit/runs/packet-42/verify-structure-09.mjs <control>` | 0 |
| `node audit/scripts/ledger.mjs unverified 42` | 2 — the one re-claimed id, awaiting Verify A round 2 |

The runner reports **0 BLOCK / 0 DEBT / 2 INFO** on this section (`spec.coverage` 28 of 28 and
`section.counts`), so `recall.recoverable` is still absent — checked because the new TQM text sits in
a subsection whose recall is a `match`, and a misconception that restates both halves of a pair would
have made it recoverable by scrolling up.

**Re-staged to `draft`** after the last module change, all eight tables, per gate item 5. Nothing
published: rule 6, and the packet-5/7 checkpoint in DECISIONS still holds this section.

## Bookkeeping

Staged by explicit path: `scripts/_packet42-content.mjs`,
`scripts/packet-42-resource-management.mjs`,
`audit/snapshots/packet-42-bundle__business__resource-management.json`,
`audit/runs/packet-42/built.md`, `audit/runs/packet-42/gate-fix-1.log`,
`audit/runs/packet-42/verify-structure-09.mjs`. Nothing committed.

`audit/ledger.json` is written — `claim 42 C-resource-management-structure-09`, through the CLI — and
**deliberately not staged**, because Verify A runs next (rule 5). `unverified 42` now lists exactly
that one id; the other 28 are confirmed.

---

# Fix round (post founder decision)

**Not a founder ruling.** The founder has not seen this run. Verify B
(`audit/runs/packet-42/verify-b.md`) verdicted *"qualified pass, with one blocking content defect …
it should not publish as it stands"*; the orchestrator's summary block wrongly reported PASSED /
walkthrough clean, so the verdict was re-checked against the served draft and confirmed. This is a
repair of a defect inside the packet's own authored content, under the packet's standing scope.
Nothing is published and nothing is committed.

## The defect, measured before touching anything

`curl "localhost:3001/api/sections/resource-management?draft=1"` → `served-pre.json`, then counted
by a walker written from Verify B's evidence and not from any builder module
(`audit/runs/packet-42/fixround/count-served.mjs`):

| pattern, on the served draft | pre |
|---|---|
| `Leaf <digit><letter>` | **25** |
| any `leaf` at all (incl. the five bare "the whole leaf" forms) | **30** |
| `sub-topic` | **2** |
| `the specification` as the SPEAKER (asks / defines / lists) | **3** |
| the whole class, in **35** distinct student-facing fields | **35** occurrences |
| of those, inside `content[].sections[].body[].text` | **25**, in 25 fields across 23 subsections |

The brief's figure of 22 is the strict `Leaf <digit><letter>` shape; the measured number for that
shape is **25**, matching Verify B's own count. Counting whole words rather than the strict shape
(the five bare "the whole leaf" forms, `sub-topic`, and the specification speaking) takes the class
to **35**. The three counts are nested, not additive: every `Leaf 1a` is also a `leaf`.

## (1) Fixed at the source, then re-dumped and re-staged

Never the bundle and never the database. 37 rewrites across three builder modules, applied by
`audit/runs/packet-42/fixround/apply-rewrite.mjs`, which aborts unless every from-string matches
exactly once:

`scripts/_packet42-content.mjs` — 34 rewrites:
`:85` `:116` `:156` `:186` `:210` `:211` `:243` `:245` `:271` `:272` `:293` `:319` `:326` `:343`
`:373` `:398` `:406` `:421` `:429` `:448` `:457` `:476` `:508` `:530` `:552` `:576` `:598` `:625`
`:651` `:673` `:697` `:728` `:736` `:893`

`scripts/_packet42-diagrams.mjs:335` — the inventory diagram's description ("the chart the
specification asks students to interpret" → "the standard inventory control chart to interpret").

`scripts/_packet42-assessment.mjs:146` — quiz stem "The specification defines efficiency as:" →
"Efficiency is defined as:" (options and key untouched); `:522` — "in sub-topic 2" → "on capacity
utilisation".

Then `node scripts/packet-42-resource-management.mjs --stage --dump` — exit 0, all eight tables
staged, bundle rewritten to
`audit/snapshots/packet-42-bundle__business__resource-management.json`.

**Verified FIELD BY FIELD against the served draft, not against the file** (gate item 5),
`audit/runs/packet-42/fixround/compare-served.mjs`: **1025 leaf fields** of `content`, `notes`,
`practice`, `diagrams` and `extras` compared string-for-string between the HTTP response and the
bundle snapshot — **0 mismatches, 0 served fields without a bundle counterpart**. `quizIndices` /
`practiceIndices` are excluded because the route renumbers them onto the preview slice; `quiz`,
`flashcards` and `mistakes` are matched by stem instead of index, because the anonymous slice is
truncated (7 of 35 quiz, 2 of 36 cards) and F074 reshuffles options and rehashes ids at render —
7 of 7 and 2 of 2 matched, options a permutation in every case.

## (2) The addressing changed, the teaching did not

Each opener now states the thing instead of naming the clause that asks for it. No internal word was
substituted for another: not "leaf", not "spec point", not "sub-topic", not "the specification
requires", not "the audit". Examples, source → served:

- `_packet42-content.mjs:85` "Leaf 1a names **four** methods of production: job, batch, flow, cell."
  → "There are **four** methods of production: job, batch, flow, cell."
- `:476` "Leaf 3a asks for the **interpretation of an inventory control diagram**, which means a
  student has to be able to read four things off a chart…" → "**Interpreting an inventory control
  diagram** means reading four things off a chart…"
- `:697` "Leaf 4c is **continuous improvement (Kaizen)**. Its claim is that…" → "**Continuous
  improvement (Kaizen)** claims that…"
- `:243` (keyIdea) "The specification defines efficiency as production at minimum average cost…" →
  "Efficiency is production at minimum average cost…"

**What was deliberately kept, and why.** Five references to the specification survive, all of them
the document QUOTED rather than speaking, which is exam technique a student can act on: "use the
specification's own test — is average cost at its minimum?", "the specification's phrase is a
PRODUCT lead-in time", the same in `practice[0].guidance` and `quiz[4].explanation`, and
`quiz[5].question` "a method of production named in the specification?". The guard's negative
controls pin all five open, so a later widening of Rule 3 fails the build rather than quietly
deleting them.

Substance is unchanged: `npm run validate` still reports the section at 100% coverage
(28 of 28 leaves evidenced), 26 subsections, 35 quiz, 10 practice, 4 diagrams, and the runner's
arithmetic, structure, pin, recall and diagram checks all still pass.

## (3) The class, not the 22 — Rule 3, A/B'd in both directions

`scripts/_packet42-util.mjs:153-186` — `SCAFFOLDING_IN_PROSE`, eight patterns beside the existing
`BANNED_IN_PROSE`, with the reasoning above each.
`scripts/packet-42-resource-management.mjs:253-304` — the check, enforced over `readable`, which is
every prose string **plus** the diagrams' `<text>` bodies. Stricter than Rule 2 on purpose: Rule 2
exempts diagram labels because leaf 3a needs the drawing labelled the way a paper labels it, and no
drawing needs to say "leaf".

Banned: `leaf` · determiner-or-count + `leaves` · `sub-topic` · `spec point` · `the audit` /
`the ledger` · `packet <n>` · `specGap` · the specification as the SPEAKER
(`asks|requires|wants|expects|defines|lists|names|says`).

`leaves` is a **verb** three times in this section ("an improvement that leaves with the person who
made it"), so the plural is banned only behind a determiner or a count. A bare `/\bleaves\b/` would
have failed the build on correct teaching prose and been loosened straight back out.

**A/B, and the positives are the real shipped sentences, not paraphrases** (`:276-290`): ten
verbatim strings taken off the pre-fix served draft, each asserted to FAIL the guard — including
`Leaf 1a names **four** methods…`, `Leaf 3a asks for the…`, `The specification defines efficiency
as…`, `4d is a competitive advantage leaf…` and `in sub-topic 2`. Seven negative controls
(`:292-303`) assert it does NOT fire on `leaves` the verb or on the specification quoted. Both
directions run on every invocation of the runner, so the guard cannot ship blind to the defect it
was written for.

External A/B on the same shipped pattern list, imported from the module the runner imports it from
(`audit/runs/packet-42/fixround/ab-guard.mjs`):

| corpus | result |
|---|---|
| `served-pre.json` (the defect, as the database held it) | **35 hits / 35 strings → guard FAILS**, exit 1 |
| `served-post.json` (the re-staged draft) | **0 hits → guard PASSES**, exit 0 |

## Re-walk, counted on the SERVED draft

Re-fetched after staging (`served-post.json`) and counted with the same independent walker used
before the fix, plus a raw `grep -o` over the response body as a second method:

| pattern, on the served draft | pre | post |
|---|---|---|
| `Leaf <digit><letter>` | 25 | **0** |
| any `leaf` | 30 | **0** |
| `sub-topic` | 2 | **0** |
| specification-as-speaker | 3 | **0** |
| the whole class, anywhere in the payload | 35 | **0** |
| the whole class inside `content[].sections[].body[].text` | 25 | **0** |
| specification QUOTED (kept on purpose) | 5 | **5** |

`grep -o -iE '[Ll]eaf [0-9][a-z]'` on the raw response: **25 → 0**. `grep -o -iE '\bleaf'`: **30 → 0**.

## Gate, re-run

| command | exit |
|---|---|
| `node scripts/packet-42-resource-management.mjs --stage --dump` | 0 — 0 BLOCK / 0 DEBT / 2 INFO, 28 of 28 leaves |
| `node audit/scripts/check-staged-drafts.mjs resource-management` | 0 — **matches**, 0 section(s) with drift |
| `npm run validate` | **0** |
| `npm test` | 0 — 279 pass, 0 fail |
| `npm run recalls` | 0 — no section worse than the baseline |
| `npm run exposure` | 0 |

**One thing to hand on, and it is not this packet's.** `npm run validate` now prints *184 findings
not in the baseline (184 new DEBT)* repo-wide, 3-6 on nearly every section and **4** on
`resource-management`, where the packet's own `gate.log` recorded 0. It is not this fix:
`audit/scripts/validate-content.mjs` contains no reference to `draft` and reads the live `data`
table only, so a draft-only write cannot reach it, and `resource-management`'s live row is unchanged
at 30 BLOCK / 17 DEBT. `audit/validator-baseline.json` is `MM` in this shared worktree — another
session has it open with both staged and unstaged changes (`-9/+4` in the tree, `+9/-4` in the
index), which is the shape that turns baselined findings into "new" ones everywhere at once. Left
alone: it is not this packet's file to touch.

## Bookkeeping

Staged by explicit path, nothing committed: `scripts/_packet42-content.mjs`,
`scripts/_packet42-diagrams.mjs`, `scripts/_packet42-assessment.mjs`, `scripts/_packet42-util.mjs`,
`scripts/packet-42-resource-management.mjs`,
`audit/snapshots/packet-42-bundle__business__resource-management.json`,
`audit/runs/packet-42/built.md`, `audit/runs/packet-42/fixround/`.

`audit/ledger.json` untouched by this round — no id is claimed or confirmed here; the defect was a
verifier rejection, not a ledger item. `audit/EXAM-PRACTICE.md` untouched. Nothing published:
`draft` only, rule 6, and the publish remains the founder's.
