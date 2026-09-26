# Packet 12.4 — Verify A, round 1

Run by the `packet-verifier` brief against the unstaged working-tree diff of nine tracked files plus
the artefacts in this directory. The verifier ran the ledger CLI itself and recorded every verdict.

| id | verdict | evidence |
|---|---|---|
| E023 | **CONFIRMED** | Data diff is insertion-only (42 lines, 0 deletions). Re-derived the ≥2-of-3 merge rule from the raw pass files: it reproduces the exact `specItems` array written for every item, 0 mismatches. 46 Economics items, 43 tagged, 3 absent (not `[]`), 0 ids outside the oracle |
| E024 | **CONFIRMED** | `pass2-input/*.json` carry only `{key, question}` and `{id, subtopic, requirement, wording}` — no mark scheme, no answer, no score. Per-pass tag totals recounted independently (132 / 156 / 97) are mutually distinct, which rules out pass 2 mirroring pass 1 |
| E025 | **REJECTED** | `npm run spec-coverage` prints `types-sizes-businesses econ 7 7 0 30 0.0%` — an Economics section with questions still reporting 0.0%, which contradicts the id as worded. The id-validity half holds (0 ids outside the oracle, independently checked) |
| E026 | **CONFIRMED** | Six live pages curled against independently recomputed figures: all six headlines match. The floor caveat appears exactly where `untagged > 0` and is absent where it is 0 |
| E027 | **CONFIRMED** | `/business/the-market-model-answers` title and `<h1>` both read "Model Answers In Progress"; the empty-state note links to `/business`, which resolves 200 |
| E028 | **CONFIRMED** | Loaded the `git show HEAD` version of `lib/mid-band-answer.js` beside the patched one and recomputed over the real bank: 29 panels with 10 same-band before, 20 panels with 0 same-band after, 1 section recovered via a second item and 9 losing theirs |

**Unclaimed but relevant:** none. The gap the verifier found in the diff's own claims is already
captured as E029/E030 against packet 12.5.

**Verifier's gate verdict:** should not pass as-is. Five of six are solid and independently
reproducible; E025 is rejected on directly observed output and the gate should stay blocked until
E025 is either fixed or its scope is corrected.

## The builder's response: the rejection is correct and is not being argued with

E025 reads "npm run spec-coverage reports non-zero for every Economics section with questions". Two
Economics sections still report 0.0%, and neither can be fixed by tagging:

- **`types-sizes-businesses` (3.3.1).** Its two questions examine economies and diseconomies of
  scale, which appear nowhere in 3.3.1's thirty leaves — they are `ECON-3.3.2-3a`..`3f`. The only
  way to make this row non-zero is to tag the questions with another section's leaves, which is the
  single thing the whole method exists to prevent. `lib/spec-coverage.js` now counts such a tag as
  zero precisely so that nobody can do it by accident.
- **`role-state-macroeconomy` (4.3.5).** It has no model answers at all, so its only questions are
  `section_practice` rows. Tagging those means extending packet 12.1's artefact file, which is
  another packet's output and outside this packet's stated scope.

So this is a scope or specification problem, not a bug, and `audit/BRAIN.md`'s hard stops put it
with the founder rather than with a fix round: **"Any change to scope, ordering, or what 'done'
means"** and **"a ledger item that contradicts the specification"**. The verdict stays `not-fixed`
and the gate stays blocked, deliberately, until the founder rules.

**The question for the founder, in one line:** E025 claims something that cannot be true while two
Economics sections hold questions that examine no requirement of their own section — re-word E025 to
"every Economics section whose model answers examine its own specification", closing it on the
evidence above and leaving E029/E030 to carry the two exceptions, or leave E025 open against 12.5
and ship 12.4 with five of six closed?
