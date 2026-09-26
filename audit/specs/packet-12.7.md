# Packet 12.7 spec — 1.3.5 practises the extract's own questions, and criteria carry a role

Rewritten 25 September 2026. This is the authoritative spec for packet 12.7 and replaces every earlier
version of this file. The `audit/NEXT.md` block is a reservation pointer only. If they disagree, this file
wins and the disagreement is a contradiction to escalate.

**Read `audit/DECISIONS.md` → Settled → the entries dated 2026-09-22 (two) and 2026-09-25 (one) first.**
All three are founder rulings. None is an open question.

## What changed, and why this packet is smaller than it was

Earlier versions asked for the bank's generic 1.3.5 answers to be re-authored against the attached extract
(E038). That is now wont-fix: the 8-mark bank question is about a *production* externality and the extract
is about *consumption* externalities, so it cannot be applied honestly. The extract file
`content/data-response/econ-u1-market-failure.md` already has its own three questions, written for the
extract, with model answers that use its figures. The founder ruled that 1.3.5 practises those.

The mode gate and question navigation (E040, E041) moved to packet 12.75 on 25 September because the
founder replaced the visual design. **Do not build them.** Do not restyle anything.

Ledger: `node audit/scripts/ledger.mjs packet 12.7` lists E039, E042, E043, E044. E038 is wont-fix.

## E043 — the extract's Define and Analyse questions join the bank in the marked-script shape

Add two items to the Economics 1.3.5 bank (put them in `data/modelAnswersExpansion.js` beside the
existing 1.3.5 items; check how the existing items are exported and follow that exactly):

- **Define, 2 marks**: *Define the term 'negative externality of consumption', using an example from the
  stimulus.* Model answer: the extract file's Question 1 answer. Criteria: 1 AO1 mark for the definition
  (third party + not in the price), 1 AO2 mark for the extract's case and figure (AED 0.18 per bag).
- **Analyse, 6 marks**: *Analyse how the AED 0.25 charge on single-use plastic bags is likely to correct
  the market failure associated with plastic bag consumption in the UAE.* Model answer: the extract file's
  Question 2 answer. Criteria: 2 AO1, 2 AO2 (PED −1.4; the 45% fall), 2 AO3 (the chain to fewer bags; the
  chain to the social optimum and a smaller welfare loss).

Both carry `criteria`, `script` (segmented so every criterion resolves), `stimulus: 'econ-u1-market-failure'`,
`minutes`, and every existing field the other bank items carry (`markScheme`, `examinerCommentary`,
`likelyScore`, `commandWord`, etc.) so no existing render path breaks. **Tag `specItems` against
`audit/raw/spec-items.json` by wording**, not by number (1.3.5 has 63 oracle items, ids `ECON-1.3.5-…`);
packet 12.4 tagged every Economics item and an untagged item re-opens the coverage caveat.

Then: remove `stimulus` from the three generic 1.3.5 items (they are at `data/modelAnswersExpansion.js`
around lines 276 and 419, and `data/modelAnswersData.js` around line 290 — re-locate them, do not trust the
line numbers). They never used the extract. Then delete the fix-round-B1 disclaimer in
`components/SectionModelAnswersPage.jsx` (the paragraph beginning "Read this first", ~line 268, and its
comment block) and replace it with one plain sentence: the application marks below are awarded for using
this extract. It is now true, because the only questions with the stimulus attached use it.

**Page order:** the three extract questions come first on the 1.3.5 page, in tariff order (2, 6, 20), then
the three generic questions. If the current component cannot order them without a component change, make the
smallest change that does, and say what you changed.

## E044 — the Evaluate question at 20 marks, in both places

The extract file tariffs its Question 3 at **10 marks, which is not a legal IAL Economics tariff** (2, 4, 6,
8, 14, 20 — read `lib/ial-marking.js`). Re-tariff it to **20** in:

1. `content/data-response/econ-u1-market-failure.md` — the question heading and the examiner note's level
   bands (it currently says "Level 4 (9–10)"). Only this file; the other five data-response files are packet
   12.9's.
2. A new bank item, Evaluate 20 marks, alongside E043's two.

A 10-mark answer relabelled as 20 is not a 20-mark exemplar. **Author the answer up to one**: IAL 20-mark
Evaluate is AO1 4 / AO2 4 / AO3 6 / AO4 6. The existing answer has the right skeleton (32% fall and PED −0.6
for; inelastic demand, USD 25 bn and 12.3% against; regressivity; alternatives; government failure; a
conditional judgement). It needs the depth each paragraph lacks: each evaluator developed and weighed rather
than listed, the regressivity point quantified from the extract where possible, and a judgement that follows
from what came before. Use the extract's figures; invent none. Keep the same answer in both places — the md
file and the bank item must not drift. Criteria sum to 20 on the 4/4/6/6 split.

**This is new marking.** Hold it to the standard of the existing answers and have Verify A read it as an
examiner would, against the IAL level descriptors for 20 marks, not just check that criteria sum.

## E039 — a criterion-to-segment link carries a role (unchanged)

Add `segRole: 'earned' | 'missed'`, defaulting to `'earned'` when absent. Validator rule **R7**: every
criterion on a retrofitted item has a `segRole` that is one of the two literals. Set `'missed'` on the
generic 8-mark item's `c7` and `c8`, and on any 20-mark generic criterion whose segment note says the script
did not earn it. The new extract items are full-mark exemplars, so all theirs are `'earned'`.

Render the two roles differently **without relying on colour**: a label ("Earned" / "Missed — this is where
it goes") and a line style. Prove R7 by A/B mutation into `audit/runs/packet-12.7/validator-ab.md`, as 12.6
did for R1/R2/R4. Measure the rendered difference at 390x844, do not eyeball it.

## E042 — nothing else moved

The other 31 section pages render identically to HEAD. 1.3.5 still persists a draft and ticks across reload
for every question on it, including the three new ones. Prove both by a method different from the one that
produced the change. `npm run spec-coverage`'s `zerocov` rule must stay at 0.

## Out of scope

- E040/E041 and any visual redesign (packet 12.75, after the founder signs off the new design).
- The other five `content/data-response/` files and their 10-mark questions (packet 12.9).
- Server-side draft persistence. Anything that publishes or writes live database content (Rule 6).

## Notes for the author

- **Check every factual claim here against the code before relying on it.** Two earlier versions of this
  spec were wrong about 1.3.5: one said the bank answers cite the extract (they cite coal, steel and the UK
  levy), the other asked for a production question to be applied to a consumption extract.
- `lib/model-answers-route.js` renders one extract per page, taken from the `stimulus` its questions name.
- **Commit hygiene.** This worktree's git index is shared and written by other sessions. Never run
  `git add` followed by `git commit`, and do not commit at all: the founder commits. Stage nothing.
