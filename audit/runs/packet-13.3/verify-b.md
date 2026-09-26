# Verify B — packets 13.3 and 13.4, 390×844, signed out (26 September 2026)

Walked in the Browser pane on a clone of the worktree served on :3017 (the peers' :3001 server was serving
stale output for edited client components — its server HTML said "4 units" while the code said 2). Every
interaction below is a real tap or real typing; JavaScript was used only to press Next between steps and to
read the page.

## 13.4 — /calculations-practice, the whole loop

1. Subject step: Economics "2 units · 4 topics", Business "3 units · 3 topics" — only units holding a
   calculation are counted (the first render said "4 units" and opened onto two; fixed before this walk).
2. Topic step: every chip reads "1 calculation · 1 due"; nothing without a calculation is offered.
3. Demand → Start: session label "Calculations", card "WEC11 · 1.3.2 · Consumer behaviour and demand ·
   4 marks", stem "The price of cinema tickets rises from $50 to **$62.50**…" (it read $62.5 before
   `money()` was fixed). Page width 390 once the card's entry animation settles (410 during it).
4. Typed −20, 25, −0.8, tapped "Price inelastic", Mark: **4/4**, line "✓ 4 of 4 — It comes back tomorrow,
   with different figures." localStorage: `qt-consumer-behaviour-demand:2035000238` → repetitions 1,
   intervalDays 1, nextReview +24h.
5. Summary, then Change topics: the chip now reads "1 calculation · **0 due**".
6. Start again: "The only calculation in these topics is scheduled. The next one is due in 1 day." (read
   "All 1 calculations…" before the wording fix). **Practise anyway**: a new item, "The price of bus fares
   rises from $80 to $100… 1,000 units to 900" — seed `…:practice:1790513750309`, the schedule's own
   nextReview. Different figures on the next review, as 13.3's acceptance asks.

## 13.3 — a new template at a Learn Mode check-in

`/business/unit-2/resource-management`, Learn Mode from step 1 with storage cleared. Step 17 of 30, the
check-in after "Capacity Utilisation": "Before the next chapter: a quick question, the diagram, a
calculation and one thing from earlier." Skipped the question (real tap). Card "Capacity utilisation":
"Nairobi Fresh Juice Ltd can make at most 26,000 units a month and currently makes 18,174…". Typed 69.9,
1326, 93.2 → **6/6**, three "Correct." Page width 390.

Funnel, recorded from the request bodies: "New figures" → `quant_start {surface: learn, template:
capacity-utilisation, marks: 6}` at step 16; a wrong attempt marked TWICE → exactly one `quant_submit
{awarded: 0, total: 6, usedOfr: false}` and no `quant_correct`.

## What this walk cannot show

Smart Practice (/practice) is signed-in only (F086), so calculations in the /practice queue were proved by
`lib/quant-practice.test.mjs` against the real `buildQueue` / `computeNextReview` / `buildProgressRow`,
not walked. The same card and the same seed rule serve both surfaces; the walk above is the calculations
session. **The founder's pass:** signed in, open /practice, pick "Consumer behaviour & demand", start —
one card in the session should be a price-elasticity calculation; answer it, and the row
`qt-consumer-behaviour-demand` should appear in `practice_question_progress` with an `item_id`
`consumer-behaviour-demand:quant:ped`.
