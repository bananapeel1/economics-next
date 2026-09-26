# Packet 12.8 brief — Economics 1.3.5 → WEC11 paper layout

Written by the brief-only phase. Authored nothing, changed no source file. No measurement, test, build
or verification claim below is mine; where a document I read asserted one, it is quoted and marked CLAIM
(unchecked) or CONFIRMED (checked directly against the file/code named).

## Authority and scope — no contradiction found among the four handoff documents

`audit/specs/packet-12.8.md` (172 lines, read in full) is authoritative. Cross-read against
`audit/NEXT.md`'s `## Packet 12.8 spec — RESERVED, running` block (lines 16-23), the 2026-09-26 Settled
entry in `audit/DECISIONS.md` ("packet 12.8 is the 1.3.5 paper-layout pilot, not the retrofit of every
other answer"), and packet 12.6's own PROGRESS.md row (line 39), which carries its own correction:
*"(Forward reference superseded 2026-09-26: 12.8 is now the 1.3.5 paper-layout pilot; the rollout follows
it. See DECISIONS.md.)"* All four agree with each other. The older text naming 12.8 as "the retrofit of
the ~65 answers" (2026-09-22 DECISIONS entry, and 12.6's original PROGRESS wording) is explicitly
superseded by the 2026-09-26 entry, per the task's own framing — not re-escalated here.

No `## Packet 12.8` row exists yet in `audit/PROGRESS.md` (only the 12.6 row's forward-reference
mentions it) — consistent with the ledger showing 0 items built, not a missing document.

`audit/CONTENT-GATE.md`'s per-section checklist item 6 (`practice.opening`, in `lib/content-validator.mjs`)
polices the `guidance` field on Learn Mode `InlinePractice` items (`guidance.split('\n')[0]` shown before
the mark scheme). This packet's new items live in `data/modelAnswersExpansion.js` / `modelAnswersData.js`
under the `script`/`criteria`/`markScheme` shape the model-answer bank already uses, not `guidance`. Scope
note only, not a contradiction: do not expect `practice.opening` to fire on, or govern, the new Section
B/C/D items.

## Ledger — packet 12.8, 10 items, all open, 0 confirmed / 0 wont-fix

`node audit/scripts/ledger.mjs packet 12.8` and `... --open` return the identical 10 ids (counted by
reading both command outputs directly, not by a summary):

| id | title (from `ledger.mjs show`) |
|---|---|
| E054 | Markdown data-response pages: Table 1 renders 403px in a 350px column at 390px and the page pans sideways (`markdown-page.css` gives tables no overflow wrapper); breaks the 26 Sep no-cut-text standard |
| E055 | `econ-u1-market-failure.md` reads inconsistently after 12.7's re-tariff: Common Mistakes says "cannot reach Level 4" while the 20-mark note has no levels; Q2 frames MSC>MPC and Q3 MSB<MPB for consumption externalities; a "Level 3 (5-6)" note on a 6-mark question |
| E057 | `paper` field on model-answer items + validator rules R9-R13 read from `audit/raw/ial-paper-structure.json` via `lib/ial-paper.js` (legal kind/tariff/command word, data-question tariff multiset, 5×4 short answers, essays offered, md data-response file matches the bank); R10 and R13 proved by A/B mutation |
| E058 | Economics 1.3.5 Section C: five-part data question on Extract A at 2/4/6/8/14 (Define, Explain, Analyse, Examine, Discuss); the soft-drinks Evaluate re-levelled to a 14-mark Discuss; new Explain 4 and Examine 8 |
| E059 | Section B: five 4-mark short answers each with its own context, exactly one Draw and at least one Calculate, aimed at 1.3.5 leaves the data question does not examine |
| E060 | Section D: two 20-mark essays with quoted contexts, student answers one; the generic "always necessary" essay plus one new |
| E061 | Practice shell shows the paper: section headers in paper order, honest Section A row linking the topic quiz, contexts above stems, Draw items sketched then marked, essay choice with marks banked for the chosen essay only, a section switcher; 12.75 guarantees hold |
| E062 | `econ-u1-market-failure.md` states the same five data-question parts as the bank (R13), drops the old 20-mark Q3, absorbs E054 and E055 |
| E063 | `--rlh-h` defined from the real `SiteHeader`, not left to its 60px fallback; A/B: a 20px taller header still gives an exact-fit desktop frame, no page scroll |
| E064 | No regression, no cut text: 31 other pages identical to HEAD, text-fit sweep 0 on every new state 320-1920px both themes after first failing, spec-coverage not lower for 1.3.5, zerocov 0 |

Gate: this packet passes only when `ledger.mjs packet 12.8 --open` is empty (spec + task instruction,
matching).

## Spec requirements in scope, quoted, mapped to ids

**E057/validator** — spec: *"Add an optional `paper` field to model-answer items: `{ section:
'B'|'C'|'D', kind: 'short_answer'|'data_question'|'essay', part?: 'a'..'e', context?: string }`… Import
`audit/raw/ial-paper-structure.json` through a small `lib/ial-paper.js`, and never duplicate its numbers."*
R9-R13 fire "only on items that carry `paper`" (opt-in, like R1-R8). Done = `lib/ial-paper.js` exists and
is the sole reader of the structure file; R9-R13 implemented in `audit/scripts/validate-model-answers.mjs`;
R10 and R13 each proved by A/B mutation into `audit/runs/packet-12.8/validator-ab.md`.

**E058** — spec: *"Section C, the five-part data question on Extract A, tariffs 2/4/6/8/14, as above."*
Table in the spec names the six items: (a) `mf-extract-define-consumption-externality-2` unchanged, (c)
`mf-extract-analyse-plastic-bag-charge-6` unchanged, (e) `mf-extract-evaluate-soft-drinks-excise-20`
"re-levelled to a 14-mark Discuss… not relabelled… Keep the id if you can." New (b) Explain 4, (d) Examine
8. Done = five parts, one `stimulus`, unique part letters (R10), each new/changed item carries the full
12.6 shape (`criteria` summing to tariff, segmented `script`, `segRole`, `keyTerm`, `examinerCommentary`,
`markScheme`), tagged by wording to `audit/raw/spec-items.json`, AO labels from `lib/ao-spec.js`.

**E059** — spec: *"four new short answers, so five with `neg-externality-4`. Include exactly one Draw…
and at least one Calculate… Aim them at 1.3.5 spec leaves the data question does not examine: public goods
and information gaps as well as externalities."* Done = R11 (exactly 5×4, Units 1-2 Economics only); Draw
item's model answer shows an existing diagram from `public/diagrams/` (e.g.
`negative-externality-consumption.svg`); all self-marked, none routed to
`app/api/written-practice/evaluate/route.js`.

**E060** — spec: *"one new 20-mark essay on a 1.3.5 theme the other essay does not cover, plus quoted
contexts for both."* Done = R12 (2 offered for Units 1-2), essay choice, contexts quoted, both items carry
the full shape.

**E061 (shell)** — spec's rendering rules, verbatim, are the acceptance list: sections in paper order with
named headers and marks; Section A row linking `/?section=<sectionId>` with copy that "must say where the
quiz is once the topic opens" and "never claim the link lands on the quiz"; contexts above the stem in
every mode; Draw items prompt a paper sketch with no text box first; essay choice banks marks for the
chosen essay only and a section's total never exceeds the paper's; section switcher (B·C·D·More practice)
above the cards, `←`/`→` move through every question in paper order, number keys jump within section;
every 12.75 guarantee (no mark scheme before marking, everything in server HTML, drafts persist by id, no
page scroll from in-pane links) still holds.

**E062** — spec: *"Rewrite `content/data-response/econ-u1-market-failure.md`'s Questions and Model Answers
to the five data-question parts, with the same text as the bank (R13 enforces it). The old 20-mark
Question 3 goes… Absorb E054… and E055."* Done = same five questions/tariffs as the bank (R13), Table 1
fits at 390px, no "Level" language beside an AO-only note, consistent MSC/MPC vs MSB/MPB framing for
consumption externalities.

**E063** — spec: *"Define it from the real `SiteHeader` (`.rlh`)… Find where `.rlh` actually gets its
height first."* A/B: a header made 20px taller must still give an exact-fit desktop frame, no scroll, no
gap, before and after.

**E064** — spec: 31 other model-answer pages render identically to HEAD (A/B at least six);
`text-fit-sweep.js` returns 0 from 320-1920px, both themes, on every new 1.3.5 state, shown failing first
(card container rule removed); `npm run spec-coverage` shows 1.3.5 coverage not falling, `zerocov` 0, every
new item tagged; JSON-LD `Quiz` lists the new items.

## Spec-coverage candidates — checked against `audit/raw/econ_spec.txt`, not treated as a to-do list

`spec-coverage.json` → `bySection` → `economics__market-failure`: covered 23, thin 3, missing 3. All six
wordings below were read directly against `econ_spec.txt:723-777` (1.3.5) and match verbatim or
near-verbatim spec bullets — none overturned on this read:

- missing "1b) Source of market failure: speculation and market bubbles" — spec 1b bullet list ends
  "…moral hazard · speculation and market bubbles." (`:733`). Confirmed.
- missing "2e) The impact of externalities in a financial context" — spec 2e bullets: "transport · health
  · education · environment · financial." (`:751`). Confirmed.
- missing "4c) …misallocation in pensions" — spec 4c bullets: "healthcare · education · pensions ·
  insurance." (`:766`). Confirmed.
- thin "3a) Private goods: rival and excludable" — spec 3a: "private goods: rival and excludable"
  (`:759`). Confirmed.
- thin "4a) The distinction between symmetric and asymmetric information." — spec 4a, verbatim (`:763`).
  Confirmed.
- thin "4c) …misallocation in healthcare" — same 4c bullet list as above. Confirmed.

These six sit under spec sub-topics 3 (public goods) and 4 (imperfect information) — the same two leaves
the packet spec names for Section B's four new short answers ("public goods and information gaps as well
as externalities"). Read as candidates for what those short answers could examine, not a requirement to
close all six: the spec asks for four short answers total, and two named leaves cannot host six
sub-points plus Draw/Calculate constraints without picking. **1b (speculation/bubbles) and 2e (financial
externalities context) are not under either named leaf** and sit outside the packet's stated scope as
written — worth the author confirming with the founder only if they intend to fold them in, not a
blocker.

## Facts checked directly against the code (not summaries)

- `lib/ial-paper.js` does not exist yet (`ls` fails) — confirms E057 unbuilt, consistent with ledger.
- `audit/raw/ial-paper-structure.json` exists; `units_1_2.sections` has exactly the A/B/C/D shape the
  spec table describes (A 6×1=6, B 5×4=20, C tariffs [2,4,6,8,14]=34 with `commandWordByTariff`, D
  20-each, offered 2, answer 1). Read directly, not restated from memory.
- The six existing 1.3.5 items and their files, `grep`-confirmed: `mf-extract-define-consumption-
  externality-2`, `mf-extract-analyse-plastic-bag-charge-6`, `mf-extract-evaluate-soft-drinks-excise-20`,
  `negative-externality-tax-8`, `market-failure-government-intervention-20` are all in
  `data/modelAnswersExpansion.js`; `neg-externality-4` is in `data/modelAnswersData.js` — matching the
  spec's own correction of ledger E059's `file` field.
  - `negative-externality-tax-8`: `commandWord: 'Examine'`, `marks: 8`, `stimulusRef: null`, question
    "Examine how a negative externality of production leads to market failure." — confirms the spec's
    claim it "does not use the extract" and fits no paper section (8 only appears inside the data
    question).
  - `market-failure-government-intervention-20`: `commandWord: 'Evaluate'`, question "…government
    intervention is always necessary to correct market failure." — confirms this is "the generic
    'always necessary' essay" E060 names.
- `app/data-response/markdown-page.css` has a `.markdown-page table` rule (`:92`) with no `overflow`
  property anywhere in the file, and no wrapper rule — confirms E054's claim directly (not just via the
  cited verify-b.md).
- `content/data-response/econ-u1-market-failure.md` (82 lines) read in full: Question 2 (6 marks, `:44`)
  reads "marginal social cost (MSC) of a good exceeds its marginal private cost (MPC)"; Question 3's body
  (`:56`) reads "marginal social benefit lies below marginal private benefit" (MSB<MPB) — both for
  consumption externalities, confirming E055's claimed inconsistency verbatim. Common Mistakes (`:73`)
  has "without these the answer cannot reach Level 4" (twice) while Question 3's examiner note (`:70`)
  uses only an AO1-4 mark split with no "Level" language. Question 2's examiner note (`:50`) reads "Level
  3 (5–6)" on a 6-mark question — confirmed.
- `components/practice-shell.css:60` — `height: calc(100dvh - var(--rlh-h, 60px));` and `:324` (sticky
  top) both read `--rlh-h` with a 60px fallback; `PracticeShell.jsx:101,547,722` all read the same custom
  property via `getComputedStyle` — confirmed nothing sets `--rlh-h` in either file (only reads). E063's
  premise stands.
- `components/StudyApp.jsx`: `activeTab` state defaults to `'overview'` and is only set by
  `setActiveTab`/`handleTabSelect`; the only URL param read into state is `?section=` (`urlSectionParam`,
  documented at `:352-364`). No tab/quiz query param is read anywhere in the file — confirms E061's "no
  deep link into the Quiz tab" claim.
- `lib/ao-spec.js`: `Define: { ao1: true, ao2: false, ao3: false, ao4: false }` for economics (`:91`) —
  confirms "Define is AO1 only." `SPEC_ASSESSED`'s own comment (`:81-83`): "Calculate, Draw and Construct
  are absent on purpose… our marker runs a prose rubric, so an attempt at one is excluded whole" —
  confirms the spec's claim that the AI marker excludes Calculate and Draw by design.
- **Gap worth flagging, not in the spec's text**: `lib/ao-spec.js`'s `ALLOCATION` table (`:195-201`,
  used only by `lib/ao-rubric.js` to build the AI marker's system prompt) has entries for 4/6/8/10/20
  marks only — none for 2 or 14. This packet's Section C needs 2-mark (Define/Calculate) and 14-mark
  (Discuss) items. The packet spec is explicit that **all** 12.8 items, not only Draw/Calculate, are
  self-marked and never reach `app/api/written-practice/evaluate/route.js`, so this gap should not block
  12.8 — but a rollout packet that ever routes a 2- or 14-mark item through the AI marker will hit an
  "unknown tariff, excluded" path with no ALLOCATION entry. Note for the rollout, not this packet's work.
- Appendix 6's "Discuss 14" descriptor is at `econ_spec.txt:2733` — confirms the spec's own `~2733`
  citation.

## Counts (by reading/running the source, not asserted)

- `audit/specs/packet-12.8.md`: 172 lines.
- 1.3.5 in `econ_spec.txt`: 6 numbered sub-topics (Sources of market failure; Positive and negative
  externalities; Non-provision of public goods; Imperfect market information; Moral hazard; Speculation
  and market bubbles), `:723-777`.
- Ledger `packet 12.8`: 10 items, 10 open (`--open` returns the same 10 ids), 0 confirmed, 0 wont-fix.
- Existing 1.3.5 model-answer bank items: 6 (2 files: 1 in `modelAnswersData.js`, 5 in
  `modelAnswersExpansion.js`).
- `spec-coverage.json` for `economics__market-failure`: covered 23 / thin 3 / missing 3 (29 total scored
  leaves).
- `ial-paper-structure.json` → `units_1_2`: 4 sections (A/B/C/D), Section C tariff multiset has 5 entries
  summing to 34, Section B has 5×4=20, Section D offers 2 essays of 20 (answer 1).

## Contradictions

None found among `audit/PROTOCOL.md`, the newest handoff in `audit/NEXT.md` (packet 47's, which is about a
different packet but did not conflict with anything read for 12.8), this packet's `audit/PROGRESS.md`
context (12.6's row, since no 12.8 row exists), the Settled list in `audit/DECISIONS.md`, and
`audit/CONTENT-GATE.md`, for this packet's scope. The one apparent disagreement (12.8 as "retrofit" vs.
"paper-layout pilot") is explicitly resolved in-document by the 2026-09-26 Settled entry and by 12.6's own
PROGRESS row correction — not re-escalated, per the task's own instruction that this is settled.
