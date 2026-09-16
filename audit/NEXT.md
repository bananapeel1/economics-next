# Next session brief

## Packet 10 spec — Smart Practice engine (in progress this session)

Closing: F075, F076, F077, F078, F084, F085. Model: Opus. Touches no content, so nothing blocks it.

| id | What must become true |
|---|---|
| F075 | A modifier or navigation key never selects an answer. Only a single printable character does, and never with ctrl/meta/alt held |
| F076 | Confidence is collected after the reveal and reaches `computeNextReview`, which already accepts it. No prompt whose data is discarded |
| F077 | "This question will come back" is true: a wrong item returns later in the same session, once. The summary stat counts what actually happened |
| F078 | "Nothing due" and "no content" are different screens. A student who has scheduled everything sees when it is next due and can practise early |
| F084 | A session interleaves across the selected topics instead of being dominated by one, and the student can choose its length |
| F085 | The first unit is open, selecting a whole unit is an explicit control rather than a badge, and every chip shows how many questions it holds |

Acceptance, runnable without this conversation:
1. At 390px, signed out: pressing ArrowDown, Control and Backspace on a question selects nothing.
2. Answer one wrong. It reappears before the session ends, exactly once.
3. After the reveal, a confidence control is present, and choosing one is what advances.
4. With every question scheduled, the empty screen names the next due time and offers practising early.
5. On the topic picker the first unit is expanded and each chip shows a question count.

## Packet 9 is done and pushed — PR #14, awaiting merge

`lib/ial-marking.js` is now the ONLY place IAL tariffs, paper structures and the 20-mark essay structure are
stated. Import it; never restate them in a prompt. It is sourced from `audit/raw/econ_spec.txt` and
`bus_spec.txt` and was checked against them line by line. `lib/subscription-lookup.js` replaces `.single()`
in every AI route.

The verifier rejected F018 twice before it passed. Both rejections were right, and both were the same shape:
part of a finding fixed, the rest of the same finding untouched. **Read the whole `fix` field of a finding
before claiming it**, not just its title.

## Then: packet 10 — Smart Practice engine

`node audit/scripts/ledger.mjs packet 10` lists the six code findings. Read `PLAN.md` packet 10 and the
finding records; do not read `audit/raw/` wholesale. This is the surface a paying student uses most and it
touches no content, so it needs nothing from packet 2 or 3.

Scope from the plan: the keyboard handler that treats Ctrl and arrow keys as answers; "no questions
available" that reads as missing content; the false "this question will come back"; the RETRIED stat; the
topic picker's hidden select-all and missing counts; collect confidence BEFORE the reveal and actually read
it. Verify B applies: this is student-facing, so script a 390px walkthrough of a practice session.

Model: Opus. Bounded, specified, verifier-checked.

## After that, still unblocked and content-free, in this order

1. **Packet 11** — performance and accessibility. Now carries **F118**, new: React hydration fails on every
   page load because script tags render inside React components (`app/layout.js`). Reproduce by loading a
   section page and reading the console. It costs first paint on exactly the low-end phones this cohort uses.
2. ~~**Packet 6** — re-entry.~~ **Parked by the founder to the end of the programme.** Not urgent in his judgement.
3. **Packet 12** — monetisation coherence. Boundary settled; one sub-decision on F086 above.


## One decision waiting, for packet 12

The founder has settled the freemium boundary: **it does not change.** That makes F086 the packet's real work,
and it needs one answer before packet 12 runs.

`GET /api/practice/questions` is unauthenticated, uses the anon client, and returns the whole `section_quiz`
array with `correctIndex` for any section ids passed. So the quiz bank the paywall protects is free to anyone
who calls the endpoint, and Smart Practice is built on it. Two readings of "keep the paywall as it is":

- **Close the leak** (recommended). The intended boundary stands, so gate the endpoint and have Smart Practice
  respect the same preview limit as the Quiz tab. Cost: students who use Smart Practice today lose free access
  they currently have, which is a visible takeaway, not just a fix.
- **Accept the leak as the real boundary.** The quiz bank is de facto free, so drop the Quiz tab paywall and
  move the paid line elsewhere. Cost: this is redrawing the boundary the founder just chose to keep.

Either way, stop serving `correctIndex` to unauthenticated callers. Marking can happen server-side; the answer
key does not need to be in the payload at all, and that part needs no product decision.

## Founder to-dos

1. Merge PR #14.
2. ~~Run `scripts/packet-2-draft-state.sql`.~~ **Done 12 September.** Verified: all eight content tables carry
   `draft` and `published_at`, and `node scripts/publish-section.mjs` reports "nothing drafted: every section
   is published". Content packets 14-56 must now write to `draft` and publish in one step.
3. ~~Pick a transactional email provider.~~ **Deferred by the founder to the end of the programme.** Packet 6 is parked; do not start it and do not keep raising it.
4. ~~Decide the freemium boundary.~~ **Settled 12 September: no change.** One sub-decision remains above.
5. Decide the freeze date. Proposed 1 November; anything later is for the June cohort, not January.

## Two corrections worth carrying forward

- **Packet 2 is done except F052, F109 and F115.** Diagram blocks still pin by ref: 0 of 39 carry a
  `diagramId`. Measured against live content: of 170 chapters, 15 get a diagram by pin and 36 by the packet 2
  title fallback, so 51 render one. The 119 with none are dominated by the 20 Business sections that hold
  zero diagrams at all, which is a content gap, not a pinning bug. The fix here is writing `diagramId` onto
  the 39 blocks that carry a ref.
- **The gate now reports unclaimed scope.** `ledger.mjs unverified <n>` used to check only claimed items, so
  a packet could pass by claiming less than its scope. Do not record a packet done while its scope is open.

