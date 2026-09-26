# Packet 12.4 — Verify B, round 2 (390×844, signed out)

Round 1 passed. This round re-walks after E029 (two model answers re-homed from 3.3.1 to 3.3.2) and
E031 (a page with no questions no longer prints a coverage percentage). Server restarted and its
Turbopack cache cleared before the round, because the first attempt at these checks was served stale
output — the page still showed the pre-edit question counts.

## Scripted actions

**A. `/economics/types-sizes-businesses-model-answers`** — had two questions and read "0 of 30 · 0.0%"

- step 1: `<h1>` and `<title>` both "Types and Sizes of Businesses — Model Answers In Progress";
  "0 written questions · 0 marks"; coverage block reads "No questions on this page yet, so there is
  no coverage figure for 3.3.1 Types and Sizes of Businesses" — **PASS**
- step 2: no `lab-coverage-pct` element anywhere on the page, and no disclosure enumerating
  unexamined requirements — **PASS**. The only "0.0%" on the page is inside the sentence explaining
  why no figure is shown
- step 3: the empty-state note ends "The rest of Economics is covered — browse every Economics
  topic", linking to `/economics`, which returns 200 — **PASS**

**B. `/business/the-market-model-answers`**

- step 4: the same treatment, word for word, for 1.3.2 — **PASS**

**C. `/economics/revenue-costs-profits-model-answers`** — received the two moved questions

- step 5: "4 written questions · 24 marks"; "This page examines 7 of 34 requirements in 3.3.2
  Revenue, Costs and Profits · 20.6%" — **PASS** (8.8% over 2 questions before the move)
- step 6: four questions in order — Explain 4 (economies of scale), Examine 8 (MC = MR), Examine 8
  (diseconomies of scale), Explain 4 (normal vs supernormal profit) — **PASS**
- step 7: no "Why this loses marks" panel anywhere on the page. The walkthrough flagged this
  conditionally, not knowing whether the panel should have travelled with a moved question.
  **Resolved: correct, and unchanged by the move.** All four items are suppressed, for two different
  reasons — both `Explain 4`s carry a single paragraph, so there is nothing to cut honestly
  (the packet-12.2 rule), and both `Examine 8`s are marked 5–6 / 8 against a "Level 3 — 5–6 marks"
  ceiling, so they top out in the band their own model answer already sits in (E028). This page
  showed no panel before the re-home either, because `profit-maximisation-mc-mr-8` was already one
  of the nine E028 suppressed
- step 8: `scrollWidth` 390 = `innerWidth` 390, no horizontal scroll — **PASS**

**D. `/economics/national-income-model-answers`** — control, untouched by this round's change

- step 9: "8 of 19 requirements in 2.3.4 National Income · 42.1%", and its "Why this loses marks"
  panel is present — **PASS**, the control is unaffected

**Across all 32 pages**

- step 10: 30 show a coverage percentage; 2 show the "no questions on this page yet" form —
  `the-market` and `types-sizes-businesses`, which are exactly the two pages with no model answers —
  **PASS**

## Console errors

None from the application on any page walked. Dev-server noise only (webpack HMR WebSocket), plus
one stray entry from a navigation outside this script.

## Audit's standing complaints still visible

None.

## The student's judgement, and the finding inside it

Asked whether the new wording is better or just hides a bad number, the walkthrough said better, but
only a little — and then named something neither E031 nor E029 covers:

> "It still doesn't tell me what I should actually do here — it explains why there's no number, not
> where the questions went … it quietly hides the fact that this topic's model answers just don't
> exist yet, which is the thing I actually wanted to know."

That is right, and on `types-sizes-businesses` it is sharper than the student knows: this topic's
questions did not fail to exist, they **moved to Revenue, Costs and Profits an hour ago**, and the
page says nothing about it. The empty-state note sends her to `/economics` to hunt.

**Not fixed here, deliberately.** E031's scope is the percentage, the packet has already grown twice
today, and the honest version of this — an empty page naming where its topic's questions are
examined instead of pointing at the subject hub — needs the bank to be asked a question it is not
currently asked. Filed for a later packet; it applies to both empty pages and to every future one.
