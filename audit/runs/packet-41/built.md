# Packet 41 — built. `external-influences`, Business Unit 2 (WBS12), IAL 2.3.5

Build phase only. Content is **STAGED to `draft`, not published** (rule 6). Verify A and Verify B have
not run; nothing below claims a result they own. Every measurement names what was measured.

## What exists now

| | before (live `data`) | after (staged `draft`) |
|---|---|---|
| chapters / subsections | 5 / 12 | 5 / 24 |
| recalls | **0** | **24** — 3 reorder, 7 fill-in, 7 match, 7 classify |
| diagrams | **0** | **8** (5 pinned, 3 in the Diagrams tab) |
| quiz (pinned inline) | 25 (5) | 28 (**25**), 3 unpinned for the pre-test |
| practice | 5 | 12, all source-based |
| flashcards / mistakes / chains / evaluation | 24 / 6 / 4 / 3 | 49 / 9 / 4 / 2 |
| validator | **45 BLOCK / 22 DEBT** | **0 BLOCK / 0 DEBT / 3 INFO** |
| spec coverage | 87% | **15 of 15 leaves, 100%** |

`node scripts/packet-41-external-influences.mjs` → all packet checks pass, `0 new BLOCK / 0 new DEBT`,
**62 baselined findings would clear on publish**, `0` `recall.recoverable` findings (this section has no
row in `audit/recall-census-baseline.json`, so DECISIONS packet 2.7 holds it to zero).

Gate, run on the tree as it stands: `npm test` **exit 0** (277 pass) · `npm run build` **exit 0** ·
`npm run validate` **exit 0** · `npm run exposure` **exit 0** · `npm run recalls` **exit 0** ("no section
is worse than the baseline"; the staged corpus moved 30 → 31 sections and this one is among the 5 clean).
`node audit/scripts/check-staged-drafts.mjs external-influences` → **matches, 0 drift**, read back through
`http://localhost:3001/api/sections/external-influences?draft=1` rather than from the file.

**`npm run validate` still reports `external-influences 45 BLOCK / 22 DEBT / 5 new DEBT` and that is
correct**: it reads the live `data` column, which this packet has not touched. The 5 new DEBT on that row
are pre-existing — the same 5 were there before this session started. The rebuilt figures above are the
staged bundle, measured by the runner and by `stageBundle`'s own gate.

## Files

| file | lines | what it is |
|---|---|---|
| `scripts/_packet41-util.mjs` | 433 | the spine (Marang Seating), formatters, the spec's own lists, the bans and the Porter pointer exemption |
| `scripts/_packet41-content.mjs` | 1067 | 5 chapters, 24 subsections, 24 recalls, 5 notes topics |
| `scripts/_packet41-assessment.mjs` | 534 | 28 quiz, 12 practice, 49 flashcards, 9 mistakes, 4 chains, 2 evaluation frames |
| `scripts/_packet41-diagrams.mjs` | 503 | 8 diagrams on a 440-unit frame |
| `scripts/packet-41-external-influences.mjs` | 816 | the runner: 14 check blocks, then the validator |
| `audit/snapshots/packet-41-bundle__business__external-influences.json` | — | the dumped bundle |
| `audit/runs/packet-41/mistake-field-ab.mjs` | 34 | the A/B for the finding in §3 below |

## Per ledger id

### topFix

- **topFix-01** — block↔assessment wiring. No index array is written by hand anywhere in this packet: a
  question belongs to the chapter its own `block` tag names and the arrays are computed
  (`scripts/packet-41-external-influences.mjs:173-180`). The Q5 double-correct is gone with the bank;
  no item in the new bank asks which response is *best*, and the runner refuses one that does
  (`:555-557`), because `quiz-02` is right that more than one response to inflation is defensible. The
  Q15 currency typo this item also names was already closed as `quiz-01` and is not re-claimed.
- **topFix-02** — internationalisation. Every UK statute, National Insurance, the central bank and the
  CMA is **banned over prose and SVG text alike** (`_packet41-util.mjs:372-400`,
  runner `:248-252`), each A/B'd against a string it must catch and against the specification's own
  wording for the same idea, which it must not (`:255-277`). The "you must know the key provisions"
  claim (accuracy-02) and the "examiners frequently use Porter's Five Forces" claim (accuracy-03) are
  both gone; `claim.uncited` is 0 on the staged bundle.
- **topFix-03** — teach the missing spec items. Government spending (`_packet41-content.mjs:340`),
  environmental protection (`:566`), competition policy (`:596`), health and safety (`:536`) and the
  competitive-environment responses (`:793`) each have a subsection. cost-push/demand-pull and the
  perfect-competition→monopoly taxonomy are **removed, not demoted to asides**, because all five terms
  are 0 hits in `bus_spec.txt` (counted this session) and cost-push/demand-pull live at
  `econ_spec.txt:917-918`. The item's "market size" clause is refused — see specGap-06 below.
- **topFix-04** — retrieval and a diagram. The interest-rate transmission reorder is
  `_packet41-content.mjs:254-271`, the four-phase cycle reorder `:451-470`, and the business-cycle
  diagram `_packet41-diagrams.mjs:295-341` (its object at `:342-356`). Every one of the 24 subsections carries a recall. **The
  "SPICED fillin" clause is refused**: SPICED is a UK-GCE sterling mnemonic, 0 hits in `bus_spec.txt`,
  and its own first letter is the UK frame `topFix-02` and `accuracy-01` exist to remove — the item
  asks this packet to author the thing two other items ask it to delete. The underlying leaf
  (`BUS-2.3.5-1a-2`, appreciation/depreciation) is taught at `_packet41-content.mjs:171-200` and drilled in
  a fill-in at `:186-199` that asks for the two arithmetic consequences instead.
- **topFix-05** — practice rewritten. All 12 items are anchored to one source
  (`_packet41-assessment.mjs:271`), because PROTOCOL.md's canonical table says Business Units 1 and 2
  are entirely source-based. Two guidance paragraphs throughout, the first carrying no figure, no
  allocation and no level band (runner `:500-506`); points at 6 marks and below, levels above
  (`:508-511`). **The "10/12-mark Assess" clause is refused**: Appendix 6 annotates 12 as
  `[Units 3/4]` and 10 as `[Units 1/2]`, and the runner asserts that against the parsed document
  (`:143-152`) rather than against a comment. Both Assess items are 10.

### accuracy

- **accuracy-01** (UK-GCE framing across all 12 live subsections) — made unrepresentable rather than
  corrected: the bans above plus `no year`, `no second currency symbol`, `no UK frame`
  (runner `:303-312`). The exchange rate is quoted as `$1 = 4.00 units` so the section can teach two
  currencies while `locale.currency` sees one symbol (`_packet41-util.mjs:116-123`).
- **accuracy-02** (the Consumer Rights Act "must know" claim) — the subsection teaches the three
  consumer-protection ideas and the remedy instead (`_packet41-content.mjs:472-505`), and no statute
  name is writable.
- **accuracy-03** (Porter's Five Forces) — **the item's "Unit 2 or elsewhere" clause is false and is
  corrected rather than accepted.** `bus_spec.txt:1110` is "3.3.1 … c) Porter's five forces" and
  `:1390` is "4.3.2 … b) Application of Porter's five forces in assessing potential markets". Packet
  38's precedent (DECISIONS 2026-09-21) is followed exactly: the phrase is banned everywhere except a
  sentence naming both owners (`_packet41-util.mjs:402-414`), and a `NEEDS_ONE` check makes that
  sentence **compulsory** (runner `:279-300`), because a ban with no positive obligation is satisfied
  by silence. The pointer is `_packet41-content.mjs:1058`.
- **accuracy-04** (cost-push/demand-pull is an Economics distinction) — the inflation subsections teach
  the effect on the firm and the four responses; the typology is banned.

### quiz and practice

- **quiz-02** (Q5 has two defensible answers) — buying ahead is now **taught** as one of the four
  responses (`_packet41-content.mjs:136-170`) rather than used as a wrong option, and the runner
  refuses any "which response is best" stem.
- **quiz-03** (Q20 "Evaluate" MCQ; the Q21-Q24 pattern) — no stem opens with an essay command word and
  none is hedged-correct among absolutes; both checked by the runner (`:525-540`) and by the validator
  (`quiz.essay-stem`, `quiz.hedged` both 0).
- **practice-01** (the stakeholders 20-marker) — replaced by an external-influences Evaluate 20 that
  ranks three named influences against each other (`_packet41-assessment.mjs:294-298`). The runner
  asserts the old stem is **absent** as well as the new one present (`:520-521`).

### structure

- **structure-01** (zero recalls, zero diagrams) — 24 recalls in all four contract types, 8 diagrams.
- **structure-02 / -03** (every block's quiz and practice pin was wrong) — pins derived from block
  tags; no hand-written index array exists to drift.
- **structure-04** (5 of 25 items surfaced inline; hedged MCQs inflating the pre-test) — 25 of 28
  pinned, and the 3 unpinned pre-test items are all answerable from chapter 1, which every student
  reaches first.
- **structure-05** (difficulty ramp) — the section opens on what an external influence is and the four
  lines of a firm's trading it can reach (`_packet41-content.mjs:75-105`); the market-structure
  escalation in chapter 4 is gone.
- **structure-06** (chapter 1 bundled three spec bullets; legislation covered 2 of 5 areas) — sub-topic
  1 is split across three chapters and all six legislation areas have their own subsection.
- **structure-07** (two of chapter 4's takeaways summarised off-spec material) — new takeaways,
  `_packet41-content.mjs:903-908` (chapter 5) and `:893-898` (chapter 4).
- **structure-08** (three misconceptions read as filler) — the three it names are not carried; the five
  it calls genuine are, internationalised, with the arithmetic that refutes each
  (`_packet41-assessment.mjs:421-479`, helper at `:419`). See §3 below for what else this item turned up.
- **structure-09** (the duplicated cost-push flow; the cycle as a text chain) — the duplication cannot
  recur because the typology is gone, and the cycle is a diagram **and** a chain, the chain because it
  is what `reorder.source` reads.

### specGap and specThin

- **specGap-01** government spending — `_packet41-content.mjs:340-371`, four routes with the arithmetic.
- **specGap-02** economic uncertainty — **accepted with its scope corrected.** It is not a named 2.3.5
  bullet ("risk and uncertainty" is `bus_spec.txt:518` and `:769`, both Unit 3). But :1013's own stem is
  "the effect on businesses of, **and how they can best respond to**, changes in", and responding to a
  cycle nobody can forecast is the response half of leaf `BUS-2.3.5-1a-5`. It is taught there
  (`_packet41-content.mjs:436-471`) and never as a leaf of its own.
- **specGap-03** environmental protection — `:566-595`.
- **specGap-04** competition law — taught as **"competition policy"**, which is the specification's own
  term at `:1024`; the item's label is the only thing wrong with it (`_packet41-content.mjs:596-629`).
- **specGap-05** health and safety — `:536-565`. The item says "absent entirely"; it was in fact named
  once in passing inside the employment note. Either way it was never taught, and it is now.
- **specGap-07** changes in the competitive environment — `:793-826`, four changes and four responses,
  authored without re-importing the banned five-forces structure under different labels.
- **specGap-08** numbering — resolved and **asserted by line number** (runner `:88-104`, the pinned headings at `:88-92`), so a renumber
  fails the build.
- **specThin-01 / -02 / -03** patents, copyright, trademarks — one subsection defines all three with
  what each protects, how it is obtained and how long it lasts (`_packet41-content.mjs:630-661`), plus a
  declared table (`_packet41-diagrams.mjs:383-410`), four flashcards, a quiz item and a Define 2.

### Not claimed

- **specGap-06** market size — **refused on scope, recorded as wont-fix with the reasoning in the
  ledger note.** `:1027-1030` asks for the effects of competition in terms of competitor **numbers,
  size and behaviour** — the size of the competitors, taught in full at `_packet41-content.mjs:724-758`.
  Market size is not a 2.3.5 leaf; "saturated markets" is `:1373`, inside 4.3.2 (Unit 4), and
  `spec-coverage.json` lists neither in this section's `missingItems` or `thinItems`. Authoring it would
  have added off-spec content to a Unit 2 section. Whoever rebuilds `trade-global-economy` inherits it.

## 3. Two findings this packet did not go looking for

### (a) Nine packets have staged common mistakes in a shape no component renders

Walking the staged bundle for every distinct key at every depth and grepping `origin/main` for each —
a different method from reading the components and looking for the fields you expect — returned five
field names referenced nowhere on main. Three of them are `looks_like`, `why` and `instead`, which is
how **packets 24, 25, 26, 27, 28, 29, 30, 31, 35 and 36** all author a common mistake.

`components/MistakesTab.jsx` renders `item.title`, `item.mistake`, `item.correction` and `item.examTip`
— **on `origin/main` and in this worktree alike**. `grep -rn looks_like components lib app` returns
nothing on either. The live corpus agrees: all 188 authored mistakes in `audit/content-sections/` carry
`{title, mistake, correction}` and 145 also carry `examTip`. A mistake authored in the inherited shape
therefore renders a card with a heading and **two empty bodies** — V035's shape exactly.

Fixed here (`_packet41-assessment.mjs:419`), and the runner now **parses `MistakesTab.jsx` for the
fields it prints** and asserts this builder populates exactly those and emits nothing else
(`packet-41-external-influences.mjs:670-690`). A/B'd in both directions:
`node audit/runs/packet-41/mistake-field-ab.mjs` → clean on what ships, fires six findings on the
inherited shape, fires on a single emptied body. **This is not this packet's to fix elsewhere** and it
is not visible to `npm run validate` — no rule reads mistake field names.

### (b) This content cannot be published to production yet, and there are two reasons, not one

Rule 3, checked against `origin/main` rather than against the worktree:

1. **`components/learn-mode/ReorderRecall.jsx:9` on `origin/main` reads `recall.shuffled` in a
   `useState` initialiser.** The packet-7 contract drops that field and all 3 reorders here are
   authored to it, so publishing today would throw a TypeError on three Learn Mode steps — the exact
   packet-15 failure DECISIONS records.
2. **`MatchRecall` and `ClassifyRecall` do not exist on `origin/main`**, and
   `components/LearnModeTab.jsx:436-441` and `:482-487` there dispatch only `reorder` and `fillin`.
   The other 14 recalls would render `null` — silent, not fatal.

Safe on main, checked: `diagramId` pins resolve (`LearnModeTab.jsx:142` on main reads `step.diagramId`),
`kind: "table"` is an unread extra field, and the declared tables carry no `checklist`.

This is `SESSION-PROMPT.md` rule 3's standing condition — "until packets 5 and 7 are merged and
deployed, nothing authored to the recall contract may be published" — confirmed for this section
specifically rather than assumed.

## 4. For the founder — the publish command, NOT run by this session (rule 6)

Do not run this until packets 5 and 7 are merged into `main` and deployed, for the reasons in §3(b).

```
node scripts/packet-41-external-influences.mjs --stage --dump && \
node scripts/publish-section.mjs external-influences --confirm
```

## 5. What this session did not verify

- **Nothing was seen at 390×844.** No dev-server walkthrough was run and no screenshot was taken. Every
  layout statement here is about the emitted SVG measured in viewBox units by the runner's own extent
  and all-pairs collision checks, not about CSS pixels on a phone. The 12-unit face floor is a **viewBox**
  floor; what it renders at on a 390px screen was not measured.
- **Verify A has not run.** The 31 claimed ids are the builder's claim.
- `npm run validate`'s live row for this section is unchanged, by design — the rebuilt content is in
  `draft`. Nothing here asserts the live section improved.
- `diagram.table-kind` INFO fires once, on "Two Channels of a Rate Rise". It is a two-column flow of
  boxes, not a reference table; the rule's own text says to ignore it for a drawn diagram. Left drawn
  deliberately.

---

# Fix round B1 — closing the Verify B defects (22 September 2026)

Input: `audit/runs/packet-41/verify-b.md`. Nothing was published; the section is still STAGED ONLY
(`draft`), and §4 above still holds. The dev server was stopped by port, `.next/cache` removed and
`remediation-dev` restarted before anything was measured, because Turbopack has served stale RSC
output through reloads in this tree before.

**Where the measurements below come from.** Every pixel figure is `getBoundingClientRect()` /
`getScreenCTM()` in the running app at a **390×844** viewport, storage cleared, signed out, with
real taps — not a computed estimate, and not the emitter's own units. Where a figure describes a
different width I say which width.

## 1 · Defect 1 (BLOCKING) — the legislation table at 7.11px, and no zoom showing a row with its label

**Root cause, and it is one cause with two symptoms.** A declared table was emitted on the section's
440-unit frame and then rendered into a card narrower than the frame, so every face was scaled
**down**. The two symptoms Verify B reported are the two halves of that: 10-unit cells at 0.7114 are
7.11px inline, and the only zoom that reaches 12px (the sheet's "Read", 1:1 with a 440-unit box =
528px on a 390px screen) is wider than the screen, so the leftmost column — the row labels — is what
leaves it.

**Fix (`scripts/_packet41-diagrams.mjs`).** Declared tables are no longer emitted as a grid on the
drawn-diagram frame. `stackSvg` replaces `gridSvg`, on a **300-unit** frame at the 12-unit floor:

- the columns become rows, because narrowing alone cannot work — three columns of this table are
  fifty characters across, and 50 × 12 × 0.7 is 420 units against the 274 the frame has. Each row is
  its label on one line and its cells under it, so **a row and its label are together by
  construction, at every zoom**, not at one zoom out of three;
- the frame is narrower than the card, so the scale is ≥ 1 in both directions.

`gridSvg`, `gridColumns`, `tblRowY` and the 440-unit `TBL` frame are deleted — nothing else imported
them, and leaving a wide-frame table emitter in the module is how this comes back.

**Measured in the running app, 390×844, on step 23 of 29:**

| where | card | scale | every one of the 27 text runs | labels off-screen |
|---|---|---|---|---|
| inline, on the step | **313px** (Verify B's own figure) | 1.043 | **12.52px** (was 7.11) | 0 left, 0 right |
| sheet, **Read** | 366px | 1.220 | **14.64px** | **0** (was: all six) |
| Diagrams tab card | 306px | 1.020 | **12.24px** | 0 |

The sheet's own footer now reads **"The whole diagram is on screen"** rather than "Drag sideways to
see the rest", and `document.scrollingElement.scrollWidth` is 390 = `innerWidth` on every one of
those screens. All four declared tables measured, not only the one named.

The 306px figure is why the frame is **300 and not 310**: 310 cleared Learn Mode's 313px card at
12.12px and missed the Diagrams tab's 306px card at 11.85px. That card was found by measuring, not
by reasoning about it, and it is the reason this note names both widths.

**Two checks, and they find their evidence differently.**

- `scripts/packet-41-external-influences.mjs` now judges a declared table at **both** widths and
  refuses a table frame over 390 units, so the sheet's 1:1 zoom can never again need sideways
  scrolling. The 12-unit face floor, which the runner used to **exempt** tables from, now applies to
  them too.
- `audit/runs/packet-41/table-phone-probe.mjs` parses the emitted SVG with its **own** width model
  and its own 313px column figure, so it cannot take its yardstick from the constant the fix moved.

**What this does NOT claim.** The four DRAWN diagrams are unchanged and still render at **8.35px**
inline at 390px on the 440-unit frame. That is V037, programme-wide, and its answer is packet 11's
enlarge sheet, which Verify B saw working. This round fixed the class of defect a table has, not the
class a drawn diagram has.

## 2 · Defect 2 (V042) — match options running off the left edge

`app/globals.css:7629` already wrapped **classify** chips at the mobile breakpoint, with a comment
recording the identical founder-found defect. Match chips were left on `white-space: nowrap`.
Fixed as the class: `components/learn-mode/MatchRecall.jsx` tags its chips `lm-match-chip` and the
existing rule now names both.

Measured at 390px, on the two steps Verify B named:

| option | Verify B | now |
|---|---|---|
| "Quotes are still going out and fewer of them turn into orders" (step 23) | 453px at left **−69** | **326px**, left 29, right 355 |
| "Something has changed behind it, and the pressure will outlast the campaign" (step 27) | 574px | **319.5px**, 3 lines, 61px tall |
| "Capacity has to be filled, so prices fall before anyone chooses to cut" (step 27) | 512px | **319.5px** |

0 chips off the left, 0 off the right, `scrollWidth` 390 = `innerWidth` on both steps. No option
string was shortened — the defect was the rule, not the content, which is why this also closes it
for every other section's match recalls rather than for this one's.

**This is V042, which the ledger assigns to packet 12.** No ledger id was claimed or confirmed by
this round; `audit/ledger.json` was not opened. Verify A and Handoff decide what that id does now.

## 3 · Defect 3 — three diagrams with no surface a Business student can reach

`components/StudyApp.jsx:41` gated Diagrams on `subjects: ['economics']`, and its own comment gave
the reason and the remedy: no Business section had a diagram row, so the tab would have been empty,
and *"the fix is the content, not the gate — see F114"*. Packet 41 wrote the content, so the premise
is now false for this section and still true for the other 21.

The gate is now the **section's own diagram count OR the subject**, which required moving the tab
filter below `sectionData`. Economics is untouched by construction — the subject clause still opens
the tab there even while the payload is in flight, so no Economics section can lose a tab it has.

Checked at 390px, three sections, three different answers:

| section | subject | diagrams | Diagrams tab |
|---|---|---|---|
| `external-influences` (draft) | Business | 8 | **shown** — and the hub's Free Resources now has a Diagrams card |
| `entrepreneurs-leaders` | Business | 0 | hidden, as before |
| `aggregate-demand` | Economics | many | shown, as before |

All 8 diagrams render in the tab, including "Where Each Influence Lands", "Patents, Copyright and
Trademarks" and "How a Small Business Competes", which had no surface at all.

## 4 · Defects 6 and 7 — the practice source

**6, the asterisks.** `PracticeQuestionsTab.jsx:156` prints `{q.question}` as a text node and
`InlinePractice.jsx:125` prints `stripMarks(question.question)`; neither parses markdown, so
`**Source A.**` reached the student as two asterisks twelve times. `EXTRACT` now opens `Source A.`
in plain text. The runner bans markdown in **every** practice `question` AND `guidance` — the field
beside the one that was shown — and the ban is justified by what the components do, not by the field
name. The teaching body is deliberately NOT covered: it renders through `dangerouslySetInnerHTML`
and its 68 bold runs are correct.

Measured on the Practice tab at 390px: **0 literal asterisks on the page** (was 12).

**7, the source printed twelve times.** Not a content defect — every item must carry the source
because Learn Mode shows one item with nothing above it, and the twelve stems between them use
almost every figure in it, so it cannot be trimmed without breaking an item. It is a surface defect,
and it is fixed on the surface: `PracticeQuestionsTab.jsx` computes the longest sentence-complete
opening the **visible** questions share and prints it once, as a "SOURCE A" card, stripping it from
each stem. No new content field, so nothing about the payload changes and every section already live
takes the untouched path.

Measured at 390px:

| | before | after |
|---|---|---|
| source blocks in one scroll | 12 | **1** (581 chars) |
| stem lengths | ~180 words each | **35–216 chars**, the task only |
| filtered to the single 20-marker | — | source card gone, **full 758-char stem**, so the item still stands alone |
| `aggregate-demand` (Economics, no shared opening) | — | 0 source cards, 4 full stems — unchanged |

## 5 · Defect 5 — "four separate changes" over six items

Fixed to six. Applied as a class rather than as a string:
`audit/runs/packet-41/recall-count-probe.mjs` reads the **staged bundle from disk**, not the content
module, and checks every number word in every recall prompt against what that recall actually holds
(classify items and groups, reorder length, match pairs, fill-in answers and blanks). 24 recalls
read, **1 mismatch found, 0 after the fix**.

## 6 · Gate

- `npm run build` green · `npm test` 279 pass, 0 fail
- `npm run validate` exit 0 · `npm run exposure` exit 0 · `npm run recalls` exit 0 ("no section is
  worse than the baseline")
- `--stage` re-run after every module change: **0 BLOCK / 0 DEBT / 3 INFO**, the same three INFO as
  before (`table-kind` on the drawn two-channel diagram, `spec.coverage` 15/15, `section.counts`)
- PROTOCOL §5 — verified against `curl localhost:3001/api/sections/external-influences?draft=1`,
  field by field, not against the file: 8 diagrams, 4 declared tables, **every table viewBox 300**,
  **every table face 12 units**, 12 practice stems, **0 carrying `**`**, 12 opening `Source A.`,
  `six separate changes` present and `four separate changes` absent.
- Console at 390px: **no JavaScript errors**. The two `POST /api/events → 401` per load are the
  signed-out analytics calls Verify B already documented; the `webpack-hmr` socket failures are the
  dev server.

## 7 · What this round did NOT do, and what it hands on

- **`lib/content-validator.mjs` was not touched.** `diagram.table-legible` still measures only the
  620px laptop column, and its own comment still asserts that the phone "is not covered by this
  number and cannot be: at 390px even a generous table is under 8px". **That sentence is now false**
  — a 300-unit table is 12.5px there. The class fix is a new INFO-tier rule measuring the 313px
  column, which would report on all 32 tables packets 20–28 authored without gating anything. It was
  NOT added here: the file is `MM` in a shared worktree, and 32 tables need re-emitting, not a
  packet-41 edit. **This needs the founder or a programme packet.**
- **No ledger id was claimed, confirmed or written.** `audit/ledger.json` was not opened. V042 and
  F114 both have work sitting in this round that belongs to other packets.
- **Nothing was committed.** Files are staged only.
- **Defect 4 (drawn diagrams at 8.35px) and defect 8 (the hub says "Start learning" over a live
  mid-deck pointer) are untouched**, both pre-existing and both outside this round.
- **Not re-walked:** the full 29-step deck. This round measured steps 23 and 27, the Diagrams tab,
  the Practice tab, the enlarge sheet, and three sections for the tab gate. Steps 1–22 and 24–26
  were passed through to reach 23 and 27 but were not re-inspected, and the resume pointer, the
  pre-test, Notes and the completion screen were not re-tested — Verify B passed all of them and
  nothing here touches them, but that is an argument, not a measurement.
