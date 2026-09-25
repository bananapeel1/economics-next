# Packet 12.7 spec — the full v6 experience, and the two things 12.6 got wrong

Written 22 September 2026. Authoritative spec for packet 12.7. The `audit/NEXT.md` block is a
reservation pointer. If the two disagree, this file wins and that is a contradiction to escalate.

**Read `audit/DECISIONS.md` → Settled → the two entries dated 2026-09-22 before anything else.**
Both are founder rulings made after reading packet 12.6's verdict. They are not open questions.

## What 12.6 established, and what it left

Packet 12.6 PASSED with E033-E037 confirmed. It shipped `audit/scripts/validate-model-answers.mjs`
(R1-R6, wired into `npm run validate`), `components/MarkedScriptAttempt.jsx`, and the retrofit of
Economics 1.3.5 — 4m/4 criteria, 8m/8, 20m/17, every criterion resolving to a segment.

It left two defects that are this packet's first job, and a pile of chrome that is its second.

## Part 1 — the two defects (do these first, and do not start Part 2 until they pass)

**E038 — 1.3.5's application marks come from the attached extract.**
Re-author the application paragraphs of the **4-mark and 8-mark** Market Failure answers so their
AO2 credit is earned from `content/data-response/econ-u1-market-failure.md` — the UAE plastics and
GCC sugar-tax figures — instead of a coal-fired power station and a steel factory. Re-segment the
affected script paragraphs and re-point any criterion whose `seg` moved. `npm run validate` must
stay green, meaning criteria still sum to 4 and 8.

This is new marking, deliberately: E034 forbade it inside 12.6 and this packet is where the founder
ruled it happens. Author it to the same standard as the existing marking — the mark scheme bands and
`examinerCommentary` already on each item are the contract, and the re-authored paragraphs must still
earn the bands those describe.

The **20-mark** answer keeps the UK Soft Drinks Industry Levy. A 20-mark Evaluate is allowed to reach
beyond the extract for a comparative case, and that is the one place the split is pedagogically real
rather than an accident.

Acceptance: `grep` the three items for `AED`, `UAE`, `GCC` and for `coal`, `steel`. The 4m and 8m
answers cite the extract's own figures and no longer cite the textbook cases; the 20m is unchanged.
**Then delete the fix-round-B1 note** in `components/SectionModelAnswersPage.jsx` (the paragraph that
begins "Read this first" and the comment block above it) and replace it with the sentence it was
originally meant to carry: the application marks below are awarded for using this extract. That note
was honest about a broken page; leaving it on a fixed page makes it a lie in the other direction.

**E039 — a criterion-to-segment link carries a role.**
Add `segRole: 'earned' | 'missed'` to the criterion shape, defaulting to `'earned'` when absent.
Extend the validator with **R7**: every criterion on a retrofitted item has a `segRole` that is one
of the two literals. Render the two differently and legibly — an earned link and a missed link must
be distinguishable without colour alone (`npm run contrast` is not sufficient evidence here; it
exited 0 through a 1.81:1 defect on 21 September because the chips took colour through transferred
tokens, so measure the rendered pixels).

Set `segRole: 'missed'` on the 8-mark item's `c7` and `c8` and on any criterion in the 20-mark item
whose segment note says the script did not earn it. Every other criterion is `'earned'`.

Acceptance: A/B the validator on R7 as 12.6 did on R1/R2/R4 — mutate, record the non-zero exit and
the message, revert, record the zero, into `audit/runs/packet-12.7/validator-ab.md`. Then show that
ticking a `missed` criterion and ticking an `earned` one produce visibly different results at
390x844, measured, not eyeballed.

## Part 2 — the v6 chrome

The approved design is mockup v6, https://claude.ai/artifact/72Pzw1p5ToRMNqe8TKgG4v. Read it. These
are the pieces 12.6 deliberately did not build.

**E040 — the mode gate.** On entering a section page the student chooses between attempting the
questions and reading the model answers straight through. Choosing "show me the answers" reveals the
marked script and does **not** unlock anything resembling a score. The choice is remembered per
section in `localStorage` and is changeable at any time without losing a draft.

**E041 — question navigation.** A full-width question row at >=720px showing, per question, the
command word, tariff, expected minutes, a status dot and a state line. A sticky bottom bar below
720px carrying previous / current / next and marks banked. Arrow keys move between questions and
number keys jump, both inert while focus is in a textarea or input. A "next question" call to action
appears in the flow the moment a question is scored, naming the next question.

**E042 — nothing regressed.** The other 31 section pages still render identically to `HEAD`, and
1.3.5's attempt loop still persists a draft and a set of ticks across reload. Prove both by a method
different from the one that produced the change.

## Out of scope

- The other 65 answers. Packet 12.8, and it starts only when this one has shipped.
- The six `content/data-response/` files carrying an illegal 10-mark Economics tariff. Packet 12.9.
  Do not widen the validator to reach them; it would fail the gate on known defects that are not
  this packet's.
- Server-side persistence of drafts. `localStorage` only, as in 12.6.
- Anything that publishes or writes live content (Rule 6).

## Notes for the author

**Check every factual claim in this spec against the code before relying on it.** Packet 12.6's spec
asserted that 1.3.5's answers cite the attached extract; they did not, the pilot section was chosen
on that false premise, and the walkthrough found it only at Verify B. A claim in a spec is a claim.

- The 8-mark and 20-mark Market Failure answers live in **`data/modelAnswersExpansion.js`**, not only
  in `data/modelAnswersData.js`. Packet 12.6's ledger entries named the wrong file for this and it
  cost a rediscovery.
- `components/MarkedScriptAttempt.jsx` and `components/model-answers-layout.css` are 12.6's, and are
  the extension points. `components/SectionModelAnswersPage.jsx` mounts them.
- Another session is in this worktree. Stage explicitly by path, never `git add -A`, and never commit
  `audit/ledger.json` while a verifier is running. `package.json` currently has a contested staged
  version from another session; do not resolve it.
