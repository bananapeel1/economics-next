# Next session brief

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
2. **Packet 6** — re-entry. **Blocked on the founder**: there is no transactional email provider in the
   project and adding one needs an account and a key.
3. **Packet 12** — monetisation coherence. **Blocked on the founder**: the freemium boundary decision.

## Founder to-dos

1. Merge PR #14.
2. Run `scripts/packet-2-draft-state.sql` in the Supabase SQL editor, once. Packet 2's draft state is inert
   until it does, and content packets 14-56 should write to `draft` rather than into `data` under live readers.
3. Pick a transactional email provider (blocks packet 6, the most time-critical item in the plan).
4. Decide the freemium boundary (blocks packet 12).
5. Decide the freeze date. Proposed 1 November; anything later is for the June cohort, not January.

## Two corrections worth carrying forward

- **Packet 2 is done except F052, F109 and F115.** Diagram blocks still pin by ref: 0 of 39 carry a
  `diagramId`. Measured against live content: of 170 chapters, 15 get a diagram by pin and 36 by the packet 2
  title fallback, so 51 render one. The 119 with none are dominated by the 20 Business sections that hold
  zero diagrams at all, which is a content gap, not a pinning bug. The fix here is writing `diagramId` onto
  the 39 blocks that carry a ref.
- **The gate now reports unclaimed scope.** `ledger.mjs unverified <n>` used to check only claimed items, so
  a packet could pass by claiming less than its scope. Do not record a packet done while its scope is open.

