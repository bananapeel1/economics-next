# Packet 12.4 — Verify B, round 1 (390×844, signed out)

Run by the `student-walkthrough` agent against `remediation-dev` on port 3001. `localStorage` cleared
and `innerWidth` asserted 390 before the first navigation. Nothing was fixed or edited by that run.

## Scripted actions

**A. `/economics/national-income-model-answers`** — headlined `0.0%` before this packet

- step 1: 200. `<h1>` "National Income — Exam Questions & Model Answers", crumb "← Unit 2:
  Macroeconomic Performance & Policy", "2 written questions · 16 marks" — **PASS**
- step 2: "This page examines 8 of 19 requirements in 2.3.4 National Income · **42.1%**". Sub-line
  names what is counted and does not mention a floor — **PASS**, the page is fully tagged
- step 3: 8 requirement codes listed (ECON-2.3.4-1a … 4b-4), matching the headline exactly — **PASS**
- step 4: `scrollWidth` 390 = `innerWidth` 390, no horizontal scroll — **PASS**

**B. `/economics/aggregate-supply-model-answers`** — also `0.0%` before this packet

- step 5: "This page examines 8 of 14 requirements in 2.3.3 Aggregate Supply · **57.1%**" — **PASS**
- step 6: the "no question on this page examines" disclosure lists 6, and 8 + 6 = 14 — **PASS**

**C. `/economics/labour-markets-model-answers`** — lost its mid-band panel under E028

- step 7: every `<details>` in order: the unexamined-requirements disclosure, then Mark scheme /
  Model answer — 4 / 4 / Examiner commentary, then Mark scheme / Model answer — 5–6 / 8 / Examiner
  commentary. **No "Why this loses marks" panel** — **PASS**, this is the suppression
- step 8: "This page examines 2 of 17 requirements in 3.3.4 Labour Markets · **11.8%**" — **PASS**

**D. `/economics/types-sizes-businesses-model-answers`**

- step 9: "This page examines 0 of 30 requirements in 3.3.1 Types and Sizes of Businesses · **0.0%**",
  sub-line ending "2 of them carry no spec tag yet, so this number is a floor, not an estimate" —
  the documented behaviour for an untagged page, and see the verdict below

**E. `/business/the-market-model-answers`**

- step 10: `<h1>` "The Market — Model Answers In Progress"; `<title>` "The Market — Model Answers In
  Progress | Edexcel IAL Business | Revvy Learn"; "0 written questions · 0 marks" — **PASS**, the
  page no longer titles itself after questions it does not have
- step 11: the empty-state note reads in full "No model answers are published for this topic yet, so
  this block is empty on purpose rather than by accident. The rest of Business is covered — browse
  every Business topic." "browse every Business topic" is a real link (`href="/business"`); followed
  it: **200**, the Business hub listing all four units and their topics — **PASS**

**step 12 — completed by the main session, not by the walkthrough.** The dev server exited with code
1 partway through the agent's 32-page sweep. The cause was not the packet and not the agent:
`node_modules/` was removed from this worktree at about 12:53 by something outside this session
(it is gitignored tooling; another session in the tree appears to have deleted it). It was restored
by clone-copy from the sibling checkout, `npm test` returned to 277/277, and the server was
restarted. On the fresh server: **20 of 32 pages show a panel, 12 show none, and 0 show one that
tops out in the model answer's own band** — the same figures measured before the crash.

## Console errors

None from the application. Dev-tooling noise only (`webpack-hmr` WebSocket failures) up to the point
the server process died.

## Audit's standing complaints still visible

None. None of the categories in the walkthrough brief — a gate the student cannot pass, too many
screens before the first Next, an exercise with no defensible answer, a text box with no button, a
recall shown twice, unreadable diagram labels, a header naming the wrong section — applies to these
pages, and no new instance was found.

## The verdict the packet asked for: credible claim, or apology?

Credible, on the pages this packet fixed. In the walkthrough's own words, "This page examines 8 of 19
requirements … 42.1%" reads as a specific fraction, states exactly what is counted (this page's two
questions, not the whole bank), and hands the student the list of the missing eleven so she can check
it herself.

**It still reads as an apology on `types-sizes-businesses`**, and the walkthrough is right: "a flat
zero next to two real exam questions makes the page look useless when it isn't, and I'd have to read
three lines of fine print to learn that." That page is the one Economics page this packet could not
fix by tagging, and the reason is not a missing tag — its two questions examine IAL 3.3.2, and
economies of scale does not appear anywhere in 3.3.1's thirty leaves. The honest 0.0% is the symptom;
the two questions being on the wrong page is the defect. Escalated, and filed as E029 against 12.5.
