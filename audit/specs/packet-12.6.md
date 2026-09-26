# Packet 12.6 spec — the marked-script data shape, proved on one section

Written 22 September 2026. This is the authoritative spec for packet 12.6. The block in
`audit/NEXT.md` is a reservation pointer, not a second copy: if the two ever disagree, this
file wins and that is a contradiction to escalate, not to resolve.

## Why this packet exists

The approved design for the exam-practice page (mockup v6) is built on interactions that read
fields the model-answer bank has never carried. Measured against `data/modelAnswersData.js` on
22 September, all 66 answers:

- carry `markScheme: [{range, desc}]` — band prose with **no per-criterion marks and no link to
  anything**, where the design needs a criterion a student can tick that is worth a stated number
  of marks and points at the place in the script that earned it;
- carry `answerParagraphs: [{label, html}]` with annotation spans baked into the HTML, where the
  design needs addressable segments that can be highlighted from outside;
- carry **`stimulusRef: null`, all 66 of them**, where the design puts a real extract in front of
  the student for every application mark. Six extracts exist in `content/data-response/`. None is
  attached to any question.

So the v6 experience is currently authorable for zero of the 66 answers, and `npm run validate`
does not read `data/modelAnswersData.js` at all — `grep -c modelAnswers audit/scripts/validate-content.mjs`
returns 0. Nothing guards this bank.

This packet does **not** retrofit the bank. It defines the shape, builds the guard that makes the
shape enforceable, and proves both on one section end to end. Packet 12.8 does the other 65 only
once this has shipped, because authoring 65 answers against an unproven shape is the expensive
version of this mistake.

## Section in scope

**Economics 1.3.5 Market Failure.** It is the only section that has both a 4/8/20 ladder and a real
extract already written (`content/data-response/econ-u1-market-failure.md`, the UAE plastics / GCC
sugar-tax stimulus with Table 1). Do not touch any other section's content.

## The shape

Five new fields on a model-answer item. **Every one is optional, and the rules below fire only on
items that carry `criteria`.** That is deliberate: it is what lets this land while 65 answers still
carry the old shape, and it is also the flag — there is no env var, an item renders the new way if
and only if it has been retrofitted.

```js
criteria: [
  { id: 'c1', band: 'Knowledge', text: 'MSC exceeds MPC, so the good is over-consumed', marks: 1, seg: 'p1a' },
  // ... one per tickable mark-scheme point
],
script: [
  { id: 'p1', label: 'Define the failure', aos: ['K'], segments: [
      { id: 'p1a', html: '...', note: 'Names the divergence — this is the definition mark.' },
  ]},
  // ... one per paragraph of the marked script
],
stimulus: 'econ-u1-market-failure',   // basename of a file in content/data-response/
minutes: 5,                            // expected exam time at this tariff
```

`markScheme`, `answerParagraphs`, `peel`, `annotationLegend`, `examinerCommentary`, `likelyScore`,
`specItems` and every other existing field stay exactly as they are. **Remove nothing.** Packet 12.7
decides what the old fields render as once the new ones exist; this packet is additive only.

## Acceptance — one ledger id per check

These ids are minted on packet 12.6. `node audit/scripts/ledger.mjs packet 12.6` lists them.

**E033 — the guard exists and is proved by mutation.**
A new `audit/scripts/validate-model-answers.mjs`, wired into `npm run validate`, enforcing, for every
item that carries `criteria`:

- R1 `criteria[].marks` sums to the item's `marks`
- R2 every `criteria[].seg` resolves to some `script[].segments[].id` on the same item
- R3 `script[].segments[].id` is unique within the item
- R4 the item's `marks` is a legal IAL tariff for its subject, read from `lib/ial-marking.js` —
  never from a hard-coded list in the new script
- R5 an item with `criteria` also has `script`, and an item with `script` also has `criteria`
- R6 `stimulus`, when present, resolves to a real file in `content/data-response/`

Proof standard — **this is the acceptance check, not the code**: for R1, R2 and R4, deliberately mutate
the retrofitted data, run `npm run validate`, record the non-zero exit and the message, revert, run it
again, record the zero exit. Write the six results to `audit/runs/packet-12.6/validator-ab.md` with the
commands. A validator asserted to work without a failing case is not accepted — `npm run contrast`
exited 0 through a 1.81:1 defect on 21 September for exactly this reason.

**E034 — 1.3.5 carries the new shape.**
All three Market Failure answers (4, 8 and 20 marks) carry `criteria` summing to 4, 8 and 20, and a
`script` whose segments every criterion resolves to. `npm run validate` and `npm test` pass. The
criteria are derived from the existing `markScheme` bands and the existing `answerParagraphs` —
this is a re-expression of marking that has already been written and checked, not new marking.

**E035 — the extract is attached and is in the flow.**
`econ-u1-market-failure` is set as `stimulus` on the 1.3.5 questions that carry application marks,
and renders as part of the page flow at 390x844 — not behind a disclosure, not in a modal, not
collapsed by default. Measure it: report the rendered position and whether any interaction is
required to read it.

**E036 — the attempt loop works on 1.3.5.**
On the Market Failure page and only there: each criterion is tickable; ticking one increments a
running total shown against the tariff; ticking one visibly marks its linked script segment. There
is no separate "score" button. The student's typed answer and their ticks survive a page reload via
`localStorage`, keyed by question id. (Server-side persistence is explicitly **not** in this packet.)

**E037 — nothing else moved.**
The other 31 section pages render identically to `HEAD`. Prove it by A/B: capture the rendered HTML
of a sample of at least six other section pages before and after the change and diff them. A claim
that the fallback path is untouched, made by reading the component, does not satisfy this — locate
the evidence by a different method than the one that produced the change.

## Explicitly out of scope

- The other 65 answers (packet 12.8).
- The mode gate, question-navigation row, sticky bottom bar, keyboard navigation and animations
  (packet 12.7). This packet renders the attempt loop, not the full v6 chrome.
- The **10-mark questions in all six `content/data-response/` files**, which are not a legal IAL
  Economics tariff. R6 deliberately checks only that `stimulus` resolves to a file, not what is
  inside it. Extending the validator into that directory would fail the gate on six known defects
  that belong to packet 12.9. Do not fix them here and do not widen R6 to reach them.
- Supabase, the AO profile, and anything that writes live content (Rule 6).

## Notes for the author

- `lib/ial-marking.js` already holds the legal tariffs for both subjects, and
  `lib/practice-tariffs.js` already has `tariffsFor`. Extend what exists; do not mint a second
  source of truth for what a legal tariff is.
- `components/SectionModelAnswersPage.jsx` (473 lines) is the render path, mounted from
  `app/economics/[unit]/page.jsx` and `app/business/[unit]/page.jsx`.
- 1.3.5's existing model answers cite the extract correctly (`AED 0.18 per bag`, `PED -1.4`,
  `45% fall`). Keep those citations intact when segmenting — they are the reason this section was
  chosen.
- Another session is in this worktree running packet 12.4 right now. Stage explicitly by path.
  Never `git add -A`. Never commit `audit/ledger.json` while a verifier is running.
