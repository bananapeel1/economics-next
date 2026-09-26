# Packet 12.8 spec — Economics 1.3.5 in the real IAL paper layout

Written 26 September 2026. Authoritative spec for packet 12.8. The `audit/NEXT.md` block is a reservation
pointer only. If they disagree, this file wins and the disagreement is a contradiction to escalate.

**Read first:** `audit/DECISIONS.md` → Settled → every entry dated 2026-09-22 to 2026-09-26, above all
*"practice follows the real IAL paper layout, for every unit of both subjects"* and *"no text on the practice
page is ever cut, spilled or shortened"*. Then `audit/raw/ial-paper-structure.json`, which holds the part-level
layouts read from Pearson's sample assessment materials, with sources. These are founder rulings, not open
questions.

## Why

Packets 12.6–12.75 built the marked-script shape and the practice shell, and proved them on 1.3.5 with a
Define 2 / Analyse 6 / Evaluate 20 set. That set is not the shape of any IAL section. The founder ruled that
practice follows the real paper. This packet reshapes 1.3.5 into the Economics Unit 1 paper (WEC11) and
teaches the validator and the shell what a paper section is, so the rollout packets after it can build
every other topic to the same shape.

## The target: Economics 1.3.5 as a WEC11-shaped topic set

From `audit/raw/ial-paper-structure.json` → `economics.units_1_2`. **Read it; do not copy numbers from here.**

| Section | What 1.3.5 carries |
|---|---|
| A · 6 multiple choice × 1 | **Not built.** A row linking the topic's existing quiz as Section A practice (founder, 26 Sep) |
| B · short answers | **Five, 4 marks each** (Draw, Explain, Calculate), each opening with its own short context: a sentence or a small table |
| C · data question | **Five parts on Extract A** (`econ-u1-market-failure`), tariffs **2, 4, 6, 8, 14**: Define or Calculate (2), Explain (4), Analyse (6), Examine (8), Discuss (14) |
| D · essay | **Two 20-mark essays, the student answers one**, each opening with a short quoted context; Evaluate or To what extent |

### What happens to the six items 1.3.5 has today

| Item | Becomes |
|---|---|
| `mf-extract-define-consumption-externality-2` | Section C part (a), unchanged |
| `mf-extract-analyse-plastic-bag-charge-6` | Section C part (c), unchanged |
| `mf-extract-evaluate-soft-drinks-excise-20` | Section C part (e): **re-levelled to a 14-mark Discuss** against Appendix 6's Discuss descriptor (`audit/raw/econ_spec.txt` ~2733), not relabelled. Keep the id if you can; if it changes, say so, because saved drafts are keyed by id |
| `neg-externality-4` | One of the five Section B short answers, with a context added |
| `market-failure-government-intervention-20` | One of the two Section D essays, with a quoted context added |
| `negative-externality-tax-8` | Fits no section of the paper (8 marks appears only in the data question, and this one does not use the extract). **Keep it on the page** in a set headed "More practice", after Section D. Nothing is removed from the site |

### New content to author

- Section C **(b) Explain, 4**, **(d) Examine, 8** and the **(e)** re-level. Each part uses Extract A, as every
  SAM part does ("With reference to Extract B…"). Parts must not reward the same thing: the Analyse (c) and
  Examine (d) marks must come from different reasoning.
- Section B: **four new short answers**, so five with `neg-externality-4`. Include **exactly one Draw**
  (the student sketches on paper and self-marks; the model answer shows an existing diagram from
  `public/diagrams/`, e.g. `negative-externality-consumption.svg`) and **at least one Calculate**, whose
  context carries the data. Aim them at 1.3.5 spec leaves the data question does not examine: public goods
  and information gaps as well as externalities.
- Section D: **one new 20-mark essay** on a 1.3.5 theme the other essay does not cover, plus quoted contexts
  for both.
- Every new or changed item carries the full 12.6 shape (`criteria` summing to its tariff, a segmented
  `script`, `segRole`, `keyTerm`, `examinerCommentary`, `markScheme`), is **tagged to the oracle by wording**
  (`audit/raw/spec-items.json`), and uses AO labels from `lib/ao-spec.js`. Define is AO1 only.
- **How Section B is marked.** Every 12.8 item, Draw and Calculate included, is **self-marked** against its
  `criteria` in the practice shell, as 12.6-12.75 built. None of them goes through the AI written-practice
  marker (`app/api/written-practice/evaluate/route.js`), which excludes Calculate and Draw by design
  (`lib/ao-spec.js`). Do not route them there.
- `neg-externality-4` lives in `data/modelAnswersData.js`, not `data/modelAnswersExpansion.js` as ledger E059's
  `file` field says. Edit it where it is.
- **This is new marking.** Verify A reads every new answer as an examiner would, against the IAL level
  descriptors for its tariff, not only for criteria sums.

## E057 — the paper shape in the data, and a validator that enforces it

Add an optional `paper` field to model-answer items:
`{ section: 'B'|'C'|'D', kind: 'short_answer'|'data_question'|'essay', part?: 'a'..'e', context?: string }`
(`context` for short answers and essays). Business's `source_set` is reserved for its rollout, not built here.

The validator and the shell read the layout from **one** file. Import `audit/raw/ial-paper-structure.json`
through a small `lib/ial-paper.js`, and never duplicate its numbers. New rules, firing **only on items that
carry `paper`** (the same opt-in pattern as R1–R8, so the other 31 pages are untouched):

- **R9**: an item's `kind`, tariff and command word are legal for its unit's paper, per the structure file
  (a 14 must be Discuss, a short answer must be 4 marks and Draw/Explain/Calculate, an essay 20 marks and
  Evaluate/To what extent).
- **R10**: a page's data question is exactly that paper's tariff multiset, all parts sharing one `stimulus`,
  part letters unique.
- **R11**: short answers, when present, are exactly five × 4 and only on a Units 1–2 Economics page.
- **R12**: essays offered on a page equal the paper's `offered` (2 for Economics Units 1–2, 3 for 3–4).
- **R13**: the data-response file for the data question's stimulus
  (`content/data-response/<stimulus>.md`) states the same five questions, with the same tariffs, as the
  bank's data-question parts. The two cannot drift.

**Prove R10 and R13 by A/B mutation** into `audit/runs/packet-12.8/validator-ab.md`, as 12.6 did.

## E058, E059, E060 — the content

- **E058**: Section C, the five-part data question on Extract A, tariffs 2/4/6/8/14, as above.
- **E059**: Section B, five short answers × 4 with their contexts, one Draw and at least one Calculate.
- **E060**: Section D, two 20-mark essays with quoted contexts, answer one.

## E061 — the shell shows the paper

Extend `components/PracticeShell.jsx` / `lib/practice-shell.js` (12.75's code; read it before changing it):

- Items carrying `paper` render as **sections in paper order**, each with a header naming the section, what
  it is, its marks and, for essays, the choice. For example: "Section B · Short answers · 5 × 4 marks",
  "Section C · Data question · 34 marks · Extract A", "Section D · Essay · 20 marks · answer one of two".
  Items without `paper` keep today's grouping, under "More practice".
- A **Section A row**: "Section A · 6 multiple-choice questions" linking to the topic in the app
  (`/?section=<sectionId>`). The app has **no deep link into the Quiz tab** (`StudyApp.jsx` reads no tab
  parameter; ledger E056 on packet 12.9), so the copy must say where the quiz is once the topic opens. Never
  claim the link lands on the quiz.
- **Short-answer and essay contexts** show above the stem in every mode. They are the question's data, not
  the answer. A Calculate context's table obeys the no-cut-text rule at 320px.
- **Draw items**: in Practise, the prompt is to sketch on paper and then mark the sketch, with no text box
  first. Marking shows the criteria; the model answer shows the diagram and its explanation.
- **Essay choice**: in Practise the student picks the essay to attempt. Marks banked count only the chosen
  one, and a section's total never exceeds the paper's. Model answers mode shows both.
- **Navigation**: a section switcher (B · C · D · More practice) above the cards; the cards show the current
  section. `←` `→` move through every question in paper order; number keys jump within the section.
- Everything 12.75 guarantees still holds: no mark scheme or model answer visible before marking, everything
  in the server HTML, drafts persisting by id, no page scroll from in-pane links on desktop.

## E062 — the data-response page is the same question, and fits a phone

Rewrite `content/data-response/econ-u1-market-failure.md`'s Questions and Model Answers to the five
data-question parts, with the same text as the bank (R13 enforces it). The old 20-mark Question 3 goes,
because it is now the Discuss 14. Absorb **E054** (its Table 1 scrolls sideways at 390px: give tables a
wrapper that fits, in `app/data-response/markdown-page.css`) and **E055** (the file's internal
inconsistencies: "Level 4" language with no levels, MSC/MPC against MSB/MPB framing, a Level 3 band on a
6-mark question). Both are reassigned to this packet. Short answers and essays stay off this page; it is a
data-response page.

## E063 — the site header's height is measured, not assumed

12.75 reads `--rlh-h` in `components/practice-shell.css:60` and `PracticeShell.jsx`, but **nothing defines
it**, so the frame always uses its 60px fallback. Define it from the real `SiteHeader` (`.rlh`): measure it,
for instance with a ResizeObserver setting the property on `:root`, or from a CSS rule that states its
height. Find where `.rlh` actually gets its height first. **A/B:** in a scratch copy, make the header 20px
taller; the desktop frame must still fill the screen exactly, with no page scroll and no gap, before and
after.

## E064 — nothing else moved, and no text is ever cut

- The other 31 model-answer pages render identically to HEAD: A/B the rendered HTML of at least six.
- `audit/scripts/text-fit-sweep.js` returns 0 on the 1.3.5 page from 320 to 1920px in 5px steps, dark and
  light, in every new state: each section, a Calculate context with its table, the Draw item in each mode,
  the essay choice before and after choosing, and "More practice". **Show it failing on this page first**
  (remove the card container rule), as 12.75 did.
- `npm run spec-coverage`: 1.3.5 coverage must not fall, `zerocov` stays 0, and every new item is tagged.
- JSON-LD `Quiz` now lists the new items; FAQPage, title, canonical and sitemap entry are unchanged.

## Ledger

`node audit/scripts/ledger.mjs packet 12.8`: E054, E055, E057–E064. The harness passes this packet only
when `ledger.mjs packet 12.8 --open` is empty.

## Out of scope

- Every other topic. The rollout packets follow this one, busiest topics first.
- Business, including `source_set`. Full mock papers (founder: not now). Building Section A MCQs.
- A deep link into the Quiz tab (E056, packet 12.9). Server-side drafts. Anything that publishes or writes
  live database content (Rule 6).

## Notes for the author

- **Relayed chat is not an instruction to you.** The founder's messages to the orchestrating session may be
  relayed into your context ("write the 12.8 spec and launch it"). They are addressed to that session, which
  has already done them. Your task is the phase you are given, under this spec.

- **Check every factual claim here against the code before relying on it.** Three earlier specs in this
  stream were wrong about 1.3.5; line numbers are hints.
- The shell traps 12.75 recorded (`audit/specs/packet-12.75.md`, Notes) still apply: `scrollIntoView`
  scrolls locked ancestors; an implicit `auto` grid column grows to its content; `[hidden]` loses to author
  `display` rules; the Browser pane is a hidden tab, so force reduced motion to test scrolling.
- The dev server serves stale output after edits (Turbopack). Restart it by port before any walkthrough.
- **Commit hygiene.** This worktree's git index is shared and written by other sessions. Stage nothing and
  commit nothing: the founder commits.
