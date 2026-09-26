# Packet 15.1 — Verify B and the crash proof (26 September 2026, main session)

The staged draft of `introductory-concepts` (packet 15's rebuild plus this packet's fixes), rendered by
**origin/main's own code**: a detached worktree at `540825f` (`/Users/arongijsel/Claude APP/p151-main`,
node_modules APFS-cloned with `cp -c -R`, not symlinked), `next dev` on :3015 so `?draft=1` is honoured
(main's route refuses it under `NODE_ENV=production`). `curl :3015/api/sections/introductory-concepts?draft=1`
served 6 blocks · 18 subsections · recalls {classify 8, reorder 3, match 5, fillin 2} · diagramIds
`null, null, f8c0ef00, 682b24c2, 30127cfe, 88569cd6`; the same URL without the flag served the live 5 blocks.

Viewport 390x844, signed out, `localStorage` and `sessionStorage` cleared, `console.error`, `error` and
`unhandledrejection` captured from load.

## Crash proof — three complete walks on main's code, 0 errors

| Walk | What was done | Result |
|---|---|---|
| 1 | Pre-test taken (3 questions, submitted), then all 24 steps: every recall filled and checked, every check-in question answered | "Topic complete", 0 console errors, document width 390 on every step |
| 2 | "Retry this topic", all 24 steps again, same interactions | "Topic complete", 0 errors |
| 3 | Storage cleared, Next only, recording each check-in BEFORE answering | 0 errors; record below |

Per step (walk 2's log): 1 classify · 2 **reorder** · 3 check-in · 4 classify · 5 match · 6 check-in · 7 classify ·
8 match · 9 reorder · 10 classify · 11 check-in · 12 classify · 13 fillin · 14 classify · 15 reorder · 16 check-in ·
17 classify · 18 match · 19 match · 20 check-in · 21 classify · 22 match · 23 fillin · 24 check-in → Topic complete.
Every recall graded on its first check (Try again / Show the answer offered, `why` lines shown).

**The 15 September crash path specifically:** step 2 is a packet-7-contract `reorder` with no `shuffled`
field. On main it renders four items with ▲/▼ controls from a seeded start order (`reorderStartOrder`),
"Check order" grades it ("✗ 1 of 4 in the right position · 2 one place off"), and the answer panel prints
the `why` lines. Screenshot taken in session.

## Re-walks after Verify A rounds 2 and 3 (same harness, origin/main 540825f, storage cleared)

Verify A rejected recheck-04 twice and the recalls were rewritten twice; the draft was re-staged each time and
walked again on main's code. After round 2: 24 steps, every widget graded, "Topic complete", 0 errors, width 390.
After round 3 plus the two wording fixes (the FINAL staged draft, `draft == bundle` on every field): pre-test not
taken, 24 steps, every widget graded (9 classify, 3 reorder, 5 match, 1 fill-in, 6 check-ins), "Topic complete",
**0 console errors, document width 390 on every step**.

## Check-ins, as the student sees them BEFORE answering (walk 3)

Main renders the question first; `svg text` elements on screen before answering: **0 on all six**.

| Step | Eyebrow · intro | Stem | States the key? |
|---|---|---|---|
| 3 | Chapter 1 · The Nature of Economics · "a quick question." | Why can economists rarely conduct controlled experiments? | no |
| 6 | Chapter 2 · Positive and Normative Economics · "a quick question and one thing from earlier." | Which of the following is a normative statement? | no |
| 11 | Chapter 3 · Scarcity, Choice and Opportunity Cost · "…the diagram and one thing from earlier." | Which of the following is most likely to be a free good? | no |
| 16 | Chapter 4 · Production Possibility Frontiers · "…the diagram and one thing from earlier." | Maraya moves … C (20, 33) to D (30, 25) … opportunity cost of one extra consumer good? | no (it must be calculated) |
| 20 | Chapter 5 · Specialisation, Money and Financial Markets · "…the diagram and one thing from earlier." | An importer agrees today on the price of a currency to be delivered in six months… | no |
| 24 | Chapter 6 · Free Market, Mixed and Command Economies · "Before you finish: …" | Which of the following is a role of the state in a mixed economy? | no |

Chapters 1 and 2 promise no diagram and show none: `diagramId: null` is honoured as decided-none on main.

**DEBT, recorded for the later rewrite pass (CONTENT-GATE "question first", points 3 and 5), not blocking:**
- Step 16 — `leaks` (after answering): the PPF diagram's description and checklist state "one consumer good
  costs 0.8 capital goods" and "0.2, 0.5, 0.8, 1.1, 1.4", the key word for word.
- Step 24 — stem-guessable: "Regulating private firms and redistributing income" is the only option that
  describes a mix; the other three describe a command economy.
- Step 6 — the key turns on "should", which is the skill being tested rather than a tell.
- Step 24 — `leaks` (after answering, Verify A): the systems diagram lists "Regulation" and "Welfare provision" under Mixed.
- Step 20 — stem-guessable (Verify A): "forward" market is the only option about a future price.
- Takeaways for chapters 2, 4 and 6 state their check-in's key (shown after answering; Verify A).
- Steps 3, 11, 20 — clean against their diagram text (11 and 20 carry diagrams; 3 has none).

## Practice on main

Step 11's Define (2), in guided mode, shows only the new opening above the box: "A definition of this term
has two parts, and a vague phrase earns neither. Be precise about how many alternatives count, and about
whether the cost has to be money." The scheme is behind "See full guidance". "Mark my answer" gives two
boxes: "The next best alternative · 1 mark" and "forgone when a choice is made · 1 mark". Step 3's practice
is the section's first item, so main shows it in full mode by design.

## The branch, for completeness (:3001, shared)

Storage cleared, Next only: 24 steps and "Topic complete", 0 errors, document width 390 throughout.

## Diagrams, measured with real glyphs (browser pane, :3001 static page, DM Sans loaded)

All eight views (4 diagrams; the PPF has 5 scenarios) rendered at their 500-unit viewBox; every non-rotated
`<text>` measured with `getBBox()`. **0 labels outside the viewBox, 0 overlapping label pairs.** A/B in the same
page: moving "Mixed" onto "Free Market" was reported as an overlap, and moving a label to x=490 was reported as
off-canvas, so the measure can fire. `audit/runs/packet-15.1/diagram-guard.mjs`'s five flags come from its
0.56 x size width estimate; the real glyphs clear them. Inline at 390px the smallest labels are 4.9-6.1px
(programme-wide, V037, not a packet's to pay); main's enlarge sheet ("Read") brings each to 12px.

## Seen and not this packet's to fix

- `ClassifyRecall` on main breaks the "→ Not possible" verdict tag mid-word ("possibl / e") beside a
  long item at 390px, after a wrong check. Platform CSS, not content.
- The landing tile's server-rendered counts read the LIVE section ("14 steps", "5 topics") until the
  client loads the draft; that is `?draft=1` preview behaviour, not a student path.
