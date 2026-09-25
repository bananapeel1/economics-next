# Packet 2.91 — Verify B (student walkthrough)

25 September 2026, main session (the Browser pane is not reachable from a subagent). `remediation-dev`
(`next dev`, port 3001, this worktree), viewport 390×844, `localStorage` and `sessionStorage` cleared
before each section, signed out, `?draft=1`, "Just teach me", real taps on **Next →**.

What was measured on each check-in: the step heading, the intro sentence (which is built from what the
check-in actually carries), and whether a `📊 DIAGRAM` block and its title are in the rendered text.

| Section | Step | Chapter | Shown | Decided | Live today (this branch's code) |
|---|---|---|---|---|---|
| labour-markets | 3 of 9 | 1 · Demand and Supply of Labour | no diagram; intro "a quick question"; quiz + worked example | none | Competitive Labour Market Equilibrium |
| labour-markets | 6 of 9 | 2 · Wage Determination | **Monopsony Labour Market**, SVG 313px wide; intro "the diagram and a quick question" | monopsony | nothing |
| labour-markets | 9 of 9 | 3 · Trade Unions and Wage Differentials | Wage Differentials and Labour Immobility | same | same |
| role-state-macroeconomy | 3 of 6 | 1 · Market Failure and the State | no diagram, no "Crowding Out" anywhere; explain-it-back + takeaway only (2.9 decided no question) | none | Crowding Out in the Loanable Funds Market |
| role-state-macroeconomy | 6 of 6 | 2 · Macroeconomic Policy | AD/AS: Macroeconomic Policy Effects | same | same |
| poverty-inequality | 3 of 6 | 1 · Types of Poverty | **Lorenz Curve and Gini Coefficient** | Lorenz | Absolute vs Relative Poverty |
| poverty-inequality | 6 of 6 | 2 · Causes and Consequences | no diagram; intro "a quick question" | none | none |

Console: one `401` per section, `POST /api/learn-mode/state` — a signed-out reader cannot save server
state; unrelated, and present before this packet. No other errors.

Served payloads, field by field (gate step 5), before the walk: `GET /api/sections/<id>?draft=1` for all
five sections carries exactly the decided `diagramId` on every block — `null` included, so it survives
jsonb and JSON — and every other field of every block equals live (`sameJson`, `quizIndices` excepted
because the signed-out payload rewrites it).

Not walked: growth-development and government-intervention-firms. Their placement is proved by the
runner through the client's own `placeChapterItems` for a Pro and a signed-out reader
(`check-report.json`), and the walk above covers every kind of decision they contain (a changed
diagram, an unchanged one, and a decided-none chapter).
