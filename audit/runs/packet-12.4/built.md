# Packet 12.4 — what was built

Closing E023–E028. Data-file work plus three small code changes. No content authoring, no DB write,
no SQL. Nothing committed; the nine tracked files are unstaged in a worktree whose index belongs to
other sessions.

## The tagging (E023, E024)

45 Economics model-answer items arrived untagged, across 22 IAL sections. Three passes:

1. the packet author, question text only against that topic's oracle rows, recorded to
   `pass1-tags.json` before any other pass's output was opened;
2. **four separate agents**, one per unit, each given only its topics' `pass2-input/<topic>.json`
   (question text + that topic's leaf rows) and told to read nothing else — the pass packet 12.1
   could not run;
3. `audit/scripts/tag-lexical.mjs`, unchanged and untuned.

A tag is written when at least two passes proposed it. 120 written, 42 items tagged, 3 left untagged
(`specItems` absent, never `[]`). The one item packet 12.1 had already tagged was run as a control
and NOT rewritten; all three passes re-derive both of its tags.

`tagging-diff.md` carries the per-item verdicts, every dissent, and two disclosures: which passes
carried each written tag (69 of 120 rest on passes 1+2 with pass 3 dissenting), and the two topics
where pass 1 was not blind. A fourth reader then adjudicated a blind, shuffled, controlled sample of
those 69 — 9 of 10 treatment pairs confirmed, 7 of 7 positive controls, 0 of 7 negative controls.

## The code (E025, E026, E027, E028)

- `lib/spec-coverage.js` — `examined` is now counted against the SECTION's leaves, not the oracle's
  1,165. A tag naming a real leaf in another topic used to raise `pct` while being filtered out of
  `examinedIds`, so the page could print a percentage its own list could not explain. No tag in the
  tree is cross-topic today, so no number moves; this is a guard, and packet 12.4 found the case
  that makes it reachable (`types-sizes-businesses`). Three tests.
- `lib/mid-band-answer.js` — `topsOutInModelAnswersOwnBand`, the E028 condition, with `markRange`
  beside it. Seven tests. See `midband-suppression.md`.
- `data/modelAnswerPages.js`, `lib/model-answers-route.js`,
  `components/SectionModelAnswersPage.jsx` — E027: the title rule gains a second form for a page
  with no model answers (asked of the bank, not remembered), and the empty-state note's dead
  "browse every topic" clause becomes a real link to the subject hub.

## Evidence

| what | how |
|---|---|
| no content field changed | `fields-before.json` vs `fields-after.json`, 66 items, 1,208 field values, 0 differences |
| the data diff is tags only | 42 insertions, all `specItems:`, 0 deletions |
| the bank's coverage rose and its failure set did not | `fixture-head.json` vs `fixture-now.json` through the CLI: 50 → 155 leaves examined, 22 `noeval` before and after |
| no invented or out-of-topic id | `npm run spec-coverage` reports 0 `specid` failures; `lib/spec-coverage.test.mjs` sweeps the real bank |
| every page headline is the computed figure | `page-coverage-check.mjs`, 22 Economics pages, 0 failing |
| only the empty page changed title | `title-check.mjs` against the HEAD copy of the rule, 31 unchanged |
| no panel tops out in its own band | `midband-served-check.mjs`, read from the served HTML, 20 panels, 0 failing |

## Gates

`npm test` 277/277 · `npm run build` 0 · `npm run validate` 0 · `npm run recalls` 0 ·
`npm run exposure` 0 · `npm run spec-coverage` exits 1 on 123 pre-existing `section_practice` tariff
failures, the same 123 as before this packet (there is no `audit/spec-coverage-baseline.json`, so
the CLI has always exited 1 here).

## Escalated, not taken

- **Economics 3.3.1.** `economies-scale-4` and `econ-diseconomies-scale-8` examine 3.3.2, not 3.3.1 —
  economies of scale is not in 3.3.1's 30 leaves. Not a tagging gap; the two questions are on the
  wrong page. `/economics/types-sizes-businesses-model-answers` still reads 0.0%.
- **Economics 4.3.5** (`role-state-macroeconomy`) has no model answers at all, so it has no page and
  stays 0.0% in the CLI over untagged `section_practice` rows.
- The nine sections that lost a mid-band panel lost it because their highest-tariff model answer is
  itself only mid-band. Authoring a fuller answer is the alternative fix.
- Three leaves the three-pass agrees on for `negative-externality-tax-8` that packet 12.1's two-pass
  missed are available to a later packet; this one did not rewrite another packet's output.

---

# Round 2 — E029 and E031, added mid-packet on the founder's ruling

The packet was at the gate with E025 rejected when the founder chose to widen it rather than narrow
the id: re-home the two mis-filed model answers AND fix the zero-question coverage panel, both
inside 12.4. E029 moved from 12.5 into this packet and E031 was minted into it.

## E029 — the re-home

`economies-scale-4` and `econ-diseconomies-scale-8` moved from `sectionNumber` 3.3.1 to 3.3.2, with
`sectionTitle` following. **Filing only.** A second field-level diff over all 66 items and 1,208
values shows exactly four changes, all of them `sectionNumber`/`sectionTitle` on those two items,
and 0 unexpected differences.

Both were then tagged from scratch against 3.3.2's 34 leaves through the same three passes. Passes 1
and 2 agreed exactly; **pass 3 proposed nothing, and could not have** — `economy` and `scale` are not
distinctive stems inside a subtopic that is about economies of scale, and the target leaves
("communication problems", "X-inefficiency") share no content stem with the question at all. Rather
than hand-check my own pass 1, the five tags went to a blind fourth reader with four negative
controls drawn from 3.3.2's own leaves: **5 of 5 confirmed, 0 of 4 on the controls.** See
`rehome/tagging-diff.md`, which shows the stem measurements rather than asserting the caveat.

Result: 3.3.2 rose from 8.8% over 2 questions to 20.6% over 4. 3.3.1 has no model answers and its
page says so.

## E031 — a page with no questions prints no percentage

`components/SectionModelAnswersPage.jsx`, `CoveragePanel`. A page with no items used to print
"This page examines 0 of N requirements … 0.0%" and then enumerate every requirement it does not
examine, with no floor caveat — the caveat is gated on `untagged > 0`, and a page with no items has
nothing untagged. It now says there is no coverage figure and why, and the unexamined list goes with
it: enumerating every requirement a page with no questions fails to examine is an accusation, not
information.

Found after Verify A had already confirmed E027, by checking what the re-home would leave behind
rather than by re-auditing the packet.

## What round 2 did NOT achieve, contrary to what was put to the founder

**E025 still fails, and the expected end state given to the founder — "E025 passes as literally
written" — was wrong.** I repeated it into the option without checking it against the CLI's
denominator.

`npm run spec-coverage` counts both banks, and every Economics section carries five untagged
`section_practice` rows. A section reads non-zero only if it has a tagged MODEL ANSWER to lift it off
the floor. After the re-home the two Economics sections at 0.0% are exactly the two with no model
answers at all — 3.3.1 (its two left) and 4.3.5 (never had any) — each with five untagged practice
questions. E025 says "non-zero for every Economics section with questions". It is still not true.

What did change is the honesty of the zero: before, 3.3.1's 0.0% sat under two real exam questions
on a live page, which was a lie about the page. Now both zeros mean the same explicable thing.

Making E025 literally true needs the ten `section_practice` rows for those two sections tagged,
which means extending packet 12.1's `section_practice-tags.json` — another packet's artefact, and
scope this packet was explicitly told not to take.

## Gates, re-run after round 2

`npm test` 277/277 · `build` 0 · `validate` 0 · `recalls` 0 · `exposure` 0 · `contrast` 0 ·
`spec-coverage` exit 1 on the same 123 pre-existing `section_practice` tariff failures.

All 32 pages re-checked live after a server restart and cache clear (the first attempt was served
stale Turbopack output): 30 show a percentage matching the computed figure, 2 show the no-questions
form, 0 failing. 30 titles unchanged from HEAD character for character, 2 in the "Model Answers In
Progress" form. 20 mid-band panels, 0 topping out in their own band.

---

# Round 3 — E025 retired, E032 minted, and three files that belong to this commit

## What another session built, and why it is staged here

A second session closed E025 by making it a real check rather than rewording it. Three files:
`audit/scripts/spec-coverage-check.mjs` (a new `zerocov` rule), a fixture
`audit/fixtures/spec-coverage/zero-coverage.json`, and two tests in
`audit/scripts/spec-coverage.test.mjs`.

**They depend on this packet's `lib/spec-coverage.js` change and are staged with it.** The fixture is
3.3.1's defect in miniature: a section declaring topic 1.3.5 whose four questions carry ids that are
all REAL oracle leaves of 1.3.2. Under HEAD's `oracle.leafIds.has(id)` those count as examined, so
`examined = 4` and the rule cannot fire; under this packet's `sectionLeaves.has(id)` it is 0 and it
does. Committing either half without the other breaks the suite.

Verified here rather than taken on trust, and without swapping any file in a tree five sessions are
working in: the four fixture ids checked against the oracle (all real, all foreign to the declared
section); the fixture fires `zerocov` ×1 and no other rule; `clean.json` reports no failures; real
data fires `zerocov` 0 times with its failure summary unchanged at 123 tariff; the diffs are 51
insertions and 0 deletions with nothing outside the new rule.

## The E025 → E032 change, and the mistake it records

`ledger.mjs` has no retitle, and rewriting E025 in place would have erased the evidence that it was
wrong. So E025 is **wont-fix with a note** and **E032** carries the new wording.

The note matters more than the id. E025 failed three times over, at three different levels, and all
three were the same error — a criterion that had no assertion behind it:

1. **The id** assumed every section's questions examine that section and that every question is
   taggable. 13 sections read 0.0% because they have no model answers, which is TRUE of them.
2. **The round-2 end state** given to the founder, "E025 passes as literally written", was false when
   written and was repeated without being checked against the CLI's denominator.
3. **The replacement this packet recommended** — "sections whose model answers examine their own
   specification" — is a tautology. Such a section is non-zero by definition; the check could never
   fail. The other session caught it. It was proposed while writing a packet whose entire subject is
   checks that certify nothing, which is the most useful thing in this file.

E032 keys on HAVING model answers: a section that has them and examines none of its own
specification fires, which is exactly 3.3.1's defect before the re-home, and the 13 honest zeros
stay silent. The second test pins `clean.json` silent so the rule cannot drift back into blaming 13
sections for an unrun migration.
