# Verify B round 2 — packet 36 (`managing-finance`)

390×844, storage cleared, signed out, `?draft=1`, real taps, dev server `remediation-dev` on 3001.
Run from the main session (PROTOCOL §4 permits it) on 18 September 2026, after round 1 blocked the gate.

Round 1's report is `verify-b.md`. It found the section teaching well, the acceptance script passing and
the resume pointer clean, and blocked on one thing: **every diagram renders its labels at 7–9 CSS px on
a 390px phone**. This round re-measures that claim, checks the two defects it raised, and re-walks the
two steps that changed.

---

## The blocking defect is real, is measured, and is not this packet's

Round 1's measurement is **correct and reproduced**. Measured in the browser rather than derived:
`.lm-interactive-svg-wrapper` is **313 CSS px** at a 390px viewport and the SVG inside it renders at
**306.74 px**, so a 440-unit frame scales by **0.697**. Packet 36's faces are 10 and 12 units, which land
at **6.97 px and 8.37 px** against body copy measured at **16 px** on the same screen. Round 1 said 7.1–9.3;
the difference is that it used the wrapper width and this used the SVG's own rendered width.

What round 1 did not do is compare that number to anything. Measured across the whole product with
`audit/scripts/diagram-phone-legibility.mjs` (new, and kept):

| corpus | diagrams | smallest label at 390px | frames in use |
|---|---|---|---|
| **live `data`, what students see today** | **85** | **4.29–7.98 px — 85 of 85 under 8px** | 500u × 85 |
| all staged `draft`, packets 30–36 | 257 | 257 of 257 under 12px | 440u × 64, 500u × 112, 526u, 560u × 79, 1010u |
| **packet 36 alone** | **8** | **6.97–8.37 px** | **440u — the narrowest frame in the product** |

**Not one of the 85 diagrams already published reaches the size packet 36's worst diagram reaches.**
Packet 36 is the first packet to author a frame narrower than 500 units, and its build record says why
(`_packet36-diagrams.mjs:28-31`: the 440 frame was chosen *because* Verify B had measured the phone).

The condition is also already on the record. `diagram.table-legible` in `lib/content-validator.mjs:128`
is DEBT rather than BLOCK, and its own note says a dense table "genuinely cannot be read in place",
that the remedy "is a design question … and not something a packet can fix per table", and — at
`:597-599` — that "**the phone is not covered by this number and cannot be**: at 390px even a generous
table is under 8px, which is why `kind: 'table'` now always offers the full-screen sheet."

**Disposition: NOT a packet 36 rejection.** It is a product-wide condition that predates this packet,
that this packet improves on, and whose remedy the programme has already ruled is a design decision.
Blocking here would hold packet 36 to a bar no diagram in the product meets, and would ship nothing.
What was genuinely missing is measurement — `diagram.table-legible` returns early on `if (!declared)`,
so a *drawn* diagram is measured by nothing at any width. That gap is now closed by a runnable script,
and DECISIONS carries the open design question with the numbers.

### Two sub-claims in round 1 that do not hold

Both were re-tested in the browser with `getBBox()` over all eight diagrams:

- *"the title is cut mid-word"* — `.lm-diagram-modal-title` computes `white-space: normal`,
  `overflow: visible`, `text-overflow: clip`, and `scrollWidth === clientWidth`. It wraps; it does not clip.
- *"the caption lines are cut"* — **zero** text nodes in any of the eight diagrams extend past the
  viewBox on any edge. Nothing is clipped by the SVG viewport.

Both are what an unscrolled 384px pane shows of an 882px-wide sheet. The sheet itself measures
**pane 384×737, content 882×942, labels 23.4–25.35 px** — legible, and it pans in two axes because an
882px drawing does not fit a 384px window. That is the escape hatch working as designed (F088/F062),
not a defect.

---

## The two defects round 1 raised, re-walked

**1. Malformed practice stem (`structure-05`'s 10-mark Assess) — FIXED, seen on screen.**
Practice tab at 390px, signed out, reads:

> "A tile wholesaler with rising revenue closes after failing to pay a supplier. **W**eak cash flow,
> overestimation of sales, overtrading, poor inventory control are all suggested. Assess the likely
> internal causes of its failure. (10 marks)"

`INTERNAL_CAUSES` is held in the specification's own lower-case words, which is right mid-sentence and
wrong at the start of one. `sentence()` capitalises at the point of use, so one copy of the
specification's wording is kept. The class is now unrepresentable in both directions: the runner bans a
lower-case sentence opening off the built objects, `verify-draft.mjs` bans it off the **served draft
row**, and both carry A/Bs against the rejected string and the one that replaced it.

**2. Working capital cycle arithmetic — FIXED, seen on screen.** Step 15 of 29, "Working Capital",
walked with real taps. The flow now reads **67 days · 27 days · 94 days**, and the fill-in beneath it
offers a word bank of 94 / 27 / 67 / 40 / 51 with the hint "the two stages of the cycle added together".
It printed **95** before, because each term was rounded separately at print time: a student who did
exactly what the hint said typed 94 and was marked wrong. The day figures are rounded once at source,
and `verify-draft.mjs` re-derives the three numbers **out of the recall the student answers** and
asserts the total is the sum of its printed parts.

---

## Console

Errors during the walk came from two files another session had open, both already fixed on disk while
this walk ran and both stale compile output in the browser: `PracticeQuestionsTab.jsx:64` (`counts`
defined twice) and `SectionModelAnswersPage.jsx:64` (a JSX comment inside a ternary arm). Neither is
packet 36 and neither survives in the tree. The only other error-level entry is the pre-existing
`POST /api/learn-mode/state → 401` for a signed-out student, which round 1 also recorded.

No React errors, no hydration warnings, no failed substitutions, no horizontal page scroll.

## Round 1's lesser findings 2, 3 and 4

Unchanged and all correctly diagnosed by round 1 as not-packet-36: (2) the landing card counts are
server-rendered from `data` and had resolved to 29 / 5 / 11 on this walk; (3) the `sr-only` SEO block
still holds the pre-packet text and resolves on publish; (4) the truncated unit badge is chrome on
every section.

## Verdict

**PASS.** The two defects round 1 raised are fixed and were re-walked on the phone. The blocking defect
is a product-wide condition that this packet improves on rather than introduces, is now measured rather
than rediscovered, and its remedy is an open design decision recorded in DECISIONS.
