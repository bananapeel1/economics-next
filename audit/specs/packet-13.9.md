# Packet 13.9 spec — the practice card and its content format

Written 26 September 2026. **Status: DRAFT until the founder signs off the prototype (ledger PC01).** The field
names below are what the build and packet 57.2 author against. If the prototype review changes one, it
changes here first, in the same commit as a DECISIONS line.

- Prototype: https://claude.ai/artifact/FhSuENrPSCtTmxyYamiytV. It shows one real Introductory Concepts card
  (`introductory-concepts:practice:d0317032`, 4-mark Explain) in all three modes, light and dark, at 390px,
  plus the 20-mark levels variant (`…:b99104dd`).
- Ledger: packet 13.9, `PC01`–`PC09` (`node audit/scripts/ledger.mjs packet 13.9`).
- Who reads this: the 13.9 build (card, reader, validator) and **packet 57.2**, the content rewrite, which is
  holding practice-guidance work until this spec exists.

## Why

Measured on production, 26 Sep, all 43 sections (`/api/sections/<id>`):

- **387 practice items carry ONE text field, `guidance`.** The card shows that field under three different
  names: "Read the model" (Worked), "The opening is given" (Guided) and "Reveal mark scheme" (Quick check).
- The field mixes three things: how to approach the question, the mark points ("Knowledge: … (1 mark)"),
  and examiner meta-notes. **250 of the 387 carry at least one meta-note**, for example "Appendix 6 wants a
  chain of reasoning here", "A candidate who adds 12% and 5%…", or "Level 1 describes…".
- It is not a model answer, yet a locked "Full model answer, marked to the IAL grid — Pro" button offers to
  generate one on the fly.
- The self-mark checklist is recovered from "(n marks)" fragments by regex (`lib/practice-checklist.js`, three
  rounds of V067 fixes). 163 items have no "(n marks)" at all, so they get no checklist (V068). 11 items offer
  fewer marks than they are worth (V070).

Founder decision (26 Sep): the content is good, the presentation is confusing. There will be one name per
thing and three layers on every card, and the model answer is free.

## The three layers

| Layer | Name on screen | What it is | Field |
|---|---|---|---|
| 1 | **How to approach it** | 1–2 sentences on what to do. Never how it is marked. | `approach` |
| 2 | **What earns the marks** | Points-marked items: the mark points with marks, which are the self-mark checklist. Levels-marked items: the levels grid plus "A top answer covers". | `markPoints` or `indicative` (+ shared levels table) |
| 3 | **Model answer** | A real answer in a student's voice, paragraphs tagged K / App / An / E. | `modelAnswer` |

**Examiner meta-notes never appear in student text**, in any layer, on either the new fields or the legacy
fallback.

## Modes (the card's behaviour, for reference; 57.2 does not need to act on this)

- **Worked**: approach, then the model answer, then "What earns the marks" (read-only), then "Now write your
  own". "Mark my answer" makes the same mark points tickable.
- **Guided**: approach only, then the answer box. "Mark my answer" opens the tickable mark points, then the
  model answer.
- **Quick check**: the answer box only. "Mark my answer" opens the mark points, then the model answer, then
  the approach.
- After marking: "Get feedback on my answer". This is Pro: it sends the student's answer, the model answer and
  the mark points to the tutor. Free and signed-out users see a quiet locked row. The old
  "Get full model answer from tutor" button is removed. *(Founder to confirm, PC01.)*

## Points or levels: keyed on subject and tariff, not "over 6"

Source: DECISIONS → Settled → 2026-09-26, "marking follows Pearson's sample mark schemes, everywhere", and
`audit/specs/packet-12.86.md` table (lines 28-30).

| | Points-marked (`markPoints`) | Levels-marked (`indicative` + levels table) |
|---|---|---|
| Economics | 2, 4, 6, **8** (Examine is K2·App2·An2·E2) | 14, 20 |
| Business | 2, 4, 6 | 8, 10, 12, 20 |

The founder's brief said "over 6 marks gets a levels grid". This table differs only at Economics 8 and follows
the Settled ruling. It is flagged for confirmation at PC01. **The existing validator rule `practice.levels`
(`lib/content-validator.mjs:141,787`) still uses a flat `marks > 6`** and must move to this table in the same
build, or it will contradict the new rule on the 43 Economics 8-mark items.

## The fields

Added to each item of a section's `practice[]`. Every existing field is kept: `id`, `marks`, `command`,
`question` and `context`.

```jsonc
{
  "id": "introductory-concepts:practice:d0317032",
  "marks": 4, "command": "Explain", "question": "…",

  "approach": "Tell the two apart by the test that separates them, not by whether you agree with them. Then give one example of each on the same topic, and say why one can be checked and the other cannot.",

  // points-marked items only (see the table above)
  "markPoints": [
    { "text": "Positive statement defined: a claim about what is, which evidence could confirm or refute", "marks": 1, "ao": "K" },
    { "text": "Normative statement defined: a claim about what ought to be, resting on a value judgement", "marks": 1, "ao": "K" },
    { "text": "One example of each, on the same topic", "marks": 1, "ao": "App" },
    { "text": "Why the normative one cannot be settled by evidence: it depends on how people weigh competing values", "marks": 1, "ao": "An", "para": 2 }
  ],

  // levels-marked items only, in place of markPoints
  "indicative": [
    "What specialisation and the division of labour are",
    "The gains as chains: skill from repetition, … so output per worker rises and unit costs fall",
    "A judgement on “always”: when the gains hold, and which condition matters most"
  ],

  "modelAnswer": {
    "paragraphs": [
      { "text": "A positive statement is an objective claim about what is, so evidence can confirm or refute it. …", "tags": ["K"] },
      { "text": "For example, “the 20% tax on sugary drinks reduced their sales by 8%” is positive: …", "tags": ["App"] },
      { "text": "The second cannot be tested because …", "tags": ["An"] }
    ]
  },

  "guidance": "…"   // LEGACY, kept (see "What stays")
}
```

### Field rules (the validator enforces every line marked ⛔; the rest is for the author)

`approach`
- ⛔ A string of 1–2 sentences, 40–320 characters.
- ⛔ No marking language: "mark", "marks", "examiner", "candidate", "Appendix", "Level n", "AO1-4", "WEC1x",
  "WBS1x", "mark scheme", "credited", "awarded".
- It tells the student what to do ("Define… then… then say why…"). It never gives the answer away: in Guided
  mode it is shown before the student writes, so the `practice.opening` rule's intent carries over to it.

`markPoints` (points-marked items)
- ⛔ A non-empty array of `{ text, marks, ao }`. `marks` is an integer of 1 or more, and `ao` is one of
  `K` `App` `An` `E`.
- ⛔ The sum of `marks` equals the item's `marks`. This closes V070's class: a checklist can no longer offer
  fewer marks than the question is worth.
- ⛔ Where Pearson fixes the split, the per-`ao` sums match it: Econ 6 = K2·App2·An2, Econ 8 = K2·App2·An2·E2,
  Business 4 = K1·App2·An1, Business 6 = K2·App2·An2. Econ 4 varies by question, so only the total is checked.
  Take the numbers from `lib/ao-spec.js` once packet 12.86 lands. Until then the table lives in
  `lib/practice-card.js` with this source cited, and moves to `lib/ao-spec.js` when 12.86 lands.
- ⛔ `text` carries no "(n marks)" (the marks are a field now) and no marking language, by the same list as
  `approach`.
- `text` states what an answer does, as something a student can tick honestly: "Positive statement defined:
  …", not "Award 1 mark for…". Keep it to one point per line; a 2-mark definition with two halves is two
  1-mark points.
- Optional `para`: the index of the model-answer paragraph that makes the point. This is for a later "Show in
  the model answer" link, as in the 12.75 practice shell. If present, ⛔ it must be a valid index.

`indicative` (levels-marked items)
- ⛔ A non-empty array of strings, 3–7 entries, with no marks and no "(n marks)" anywhere. ⛔ A levels item
  must NOT carry `markPoints`.
- These are the substance a top answer covers. **Levels descriptors are not authored per item**: the card
  reads them from one table keyed on subject and tariff (Econ 14: KAA 8 + E 6; Econ 20: KAA 12 + E 8; from
  `audit/raw/ial-paper-structure.json` → `economics_levels`).
- **Open dependency:** `ial-paper-structure.json` has no `business_levels` yet. Business 8/10/12/20 (one
  combined strand) need their descriptors from the Business SAMs, via packet 12.86 or a small read of the
  SAM PDF. Until they exist, the card shows Business levels items with the level bands and marks only.

`modelAnswer.paragraphs`
- ⛔ 2–8 paragraphs for points-marked items, and up to 10 for levels-marked. Each paragraph has `text` (a
  non-empty string, 90 words or fewer) and `tags` (a non-empty array drawn from `K` `App` `An` `E`, no
  duplicates).
- ⛔ Points-marked: every `ao` that appears in `markPoints` appears in at least one paragraph's `tags`.
  Levels-marked Econ: at least one paragraph is tagged `E`.
- ⛔ No marking language (same list), no headings, no "(1 mark)", and no bracketed tags inside `text`. The
  tags are data, and the card draws the chips.
- Write it the way a strong student writes it in the exam hall: plain, complete sentences, the question's own
  setting, and working shown on a Calculate. It is not a list of points, and it is not an examiner explaining
  what they would credit.
- It must earn full marks against its own `markPoints`. Author against that, and 57.2's verifier can check it.
- **Levels items never show per-objective marks** (Settled ruling). The verdict line is computed by the reader,
  never authored: "K2 · App1 · An1 = 4/4" for points, "Top level in each strand" for levels.

### What stays

- **`guidance` is kept on every item.** Two other consumers read it: `components/written-practice/WrittenQuestionCard.jsx:59`
  (the AI written-practice marker's context) and `components/admin/SectionEditor.jsx`. Moving those onto the
  reader is follow-up work, not part of 13.9. Once an item has the new fields, the card ignores its `guidance`.
- `lib/practice-checklist.js` stays as the fallback's mark-point parser. It is not deleted.

## The reader (`lib/practice-card.js`, the mistakes-shape pattern)

This is the one place that knows the field names. It is shared by `InlinePractice.jsx`, the validator and the
tests, so the card and the gate cannot disagree about what renders.

```js
readPractice(item, { subject }) → {
  approach: string,                    // '' when none
  scheme: 'points' | 'levels',         // from subject + marks, never from the item
  markPoints: [{ text, marks, ao }],   // [] on levels items
  indicative: string[],
  levels: [{ strand, name, marks, levels: [{ level, lo, hi, descriptor }] }] | null,
  modelAnswer: [{ text, tags }] | null,
  verdict: string,
  source: 'authored' | 'legacy',
}
```

**Legacy fallback** (an item with no `approach`, no `markPoints` or `indicative`, and no `modelAnswer`):

- `approach`: the first paragraph of `guidance`, with meta-note sentences removed.
- `markPoints`: `checklistFrom(guidance)` from the existing parser. `ao` is `null` when the fragment's label
  does not name one ("Knowledge:" → K, "Application…" → App, "Analysis…" → An, "Evaluation / Examination /
  Judgement…" → E).
- `modelAnswer`: `null`. **The card never shows guidance under the name "Model answer".** Without an
  authored answer, that layer is simply absent. The "What earns the marks" layer then shows the rest of the
  guidance (meta-notes removed) as plain text when there are no parsed points.
- The meta-note filter is measured on all 387 live items before the build is claimed, the same way V067 was:
  a census of what it drops, and a read of every dropped sentence that carries a digit, "=" or a figure,
  because some Business "Level 2: application — ROCE fell from 25% to 20%…" lines are real content. Output
  goes to `audit/runs/packet-13.9/`.

## Validator rules (new, in `lib/content-validator.mjs`)

| Rule | Tier | Fires when |
|---|---|---|
| `practice.card.shape` | BLOCK | An item carries any new field and it breaks a ⛔ shape line above. |
| `practice.card.tariff` | BLOCK | The `markPoints` sum is not equal to `marks`; the per-`ao` split breaks a fixed Pearson split; a levels item has `markPoints`, or a points item has `indicative`. |
| `practice.card.meta` | BLOCK | Marking language appears in `approach`, `markPoints[].text`, `indicative[]` or `modelAnswer.paragraphs[].text`. |
| `practice.card.legacy` | DEBT | The item is still guidance-only. Baselined at 387 today; the file only shrinks as 57.2 migrates. |

`practice.levels` moves from `marks > 6` to the subject + tariff table. `practice.opening` stays for legacy
items only; the new `approach` rules replace it on authored ones.

## Order of work and the shipping rule

1. PC01: the founder signs off the prototype and answers its three questions.
2. 13.9 builds the reader, validator and card, and opens a PR to `main`. Every live item takes the legacy path,
   so this is safe to ship on its own, and it removes the tutor model-answer button and the three names at once.
3. **57.2 must not publish any item carrying the new fields until the 13.9 PR is merged and deployed**
   (SESSION-PROMPT rule 3: the components on `origin/main` must read every field the content carries). Until
   then it can stage and draft freely. `main`'s current card ignores unknown fields and would keep showing
   `guidance`, so an early publish breaks nothing, but it also shows nothing new.
4. 57.2 authors section by section, starting with Introductory Concepts: the prototype's copy for
   `d0317032` and `b99104dd` is already written to this format and can be taken as-is.
