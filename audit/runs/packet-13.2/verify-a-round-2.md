# Packet 13.2 — Verify A, round 2 (the fix round only)

Read-only pass, 22 September 2026. Scope: `audit/runs/packet-13.2/fix-round-1.md`'s seven changes,
checked against the code as it now stands, and then the eleven ids round 1 confirmed. No source
file, template, test or script was changed. One ledger verdict was recorded: **D028 rejected**.

Round 1's report (`verify-a.md`) is a different verifier's work. Nothing in it was taken as given;
every number below was re-derived. Probes kept beside this file:
`verify-a-round-2-placement-ab.mjs`, `verify-a-round-2-marking-ab.mjs`,
`verify-a-round-2-stem-leak.mjs`.

**Gates run here:** `npm run quant-check` 0 (8 x 200 = 1,600 items clean) · `npm run quant-check --
--draws 2000` 0 (16,000 items clean) · `npm test` **267/267, 0 fail** · `npm run build` **exit 0**
("Compiled successfully in 4.3s") · `npm run validate` **exit 0** · `npm run exposure` 0 ·
`npm run recalls` 0 ("no section is worse than the baseline"). All match the builder's claims.

**The dev server on 3001 is serving this code, not a stale bundle.** Checked before anything else,
because that trap is on the record. The served Turbopack chunks carry every fix:
`components_LearnModeTab_jsx_*.js` has `Before you finish` (fix 7); `lib_*.js` has
`free.unshift(0)` (fix 1), `No unit code, no drill` (fix 2), `Forecasters expect growth of` (fix 4)
and five copies of `the answer is ` (fix 6); `components_0-5s_1x._.js` compiles QuizTab's
`CalculationItem` with `item.id` in the key position (fix 3).

---

## Per fix

**1. Slot 0 yields rather than leave a drill unplaced — HOLDS, and it is the one that costs an id.**
`lib/quant-pool.js:130-132`. A/B over **all 43 sections against the live content on :3001**, with
the pre-fix spread loop reimplemented in the probe as the control: exactly one section changes.
`decision-making-techniques` goes from `{ord1=arr}` to `{ord0=arr, ord1=payback}` — the map the
builder claims. The other six drilled sections are identical before and after
(`meeting-customer-needs` ord4, `financial-planning` ord2, `consumer-behaviour-demand` ord2,
`measures-economic-performance` ord3, `national-income` ord3, `economic-growth` ord5).
**Templates reaching no student: `payback` before, none now.** All eight are placed.
See D028 below for what this costs.

**2. No unit code, no drill — HOLDS.** `lib/quant-pool.js:36`, an early return ahead of the filter.
The live sweep still yields exactly the same 7 sections with drills and 36 without, so the tightening
took nothing away. Covered by `lib/quant-pool.test.mjs:188-192`.

**3. `key={item.id}` on the Quiz tab card — HOLDS.** `components/QuizTab.jsx:266`, and the served
chunk compiles it into the key argument of `jsxDEV`, so a changed `item.id` remounts
`CalculationItem` and its `responses`/`result` state (`CalculationItem.jsx:28-30`) is rebuilt empty.
`item.id` is `quant:<template>:<sectionId>:<template>:<attempt>`, so it does change on reseed.

**4. The Economics stem no longer prints the answer to its own step one — HOLDS, but only half the
leak closed.** `lib/quant/templates/percentage-change.mjs:284-287`. Measured over 2,000 draws:
the stem prints `rateNow` as a percentage token in **0/2000** draws, and no label, method line or
choice prints it either. Variety survives the edit with margin: 186 distinct stems in 200 draws
against a floor of 151, 1,186 in 2,000 against a floor of 994 — so the 94/200 collapse the builder
describes for the discarded first attempt is not what shipped.
*But the answer is still on the card.* `CalculationItem.jsx:69-113` renders every step at once, and
step three's choices print `d.points` in two of their three options while the stem prints
`d.rateNext`. `rateNow = rateNext + points` in **2000/2000** draws, so a student can still reach
step one's answer without dividing — by addition instead of division. The stem was fixed; the class
was not.

**5. `toFixed(2)` in the multiplier solution — HOLDS.** `lib/quant/templates/multiplier.mjs:114-115`.
Over 2,000 draws, **0** solutions print a bare multiplier where the step says "to two decimal
places"; the worked line now reads `Multiplier = 1 / 0.25 = **4.00**`.

**6. The wrong-answer note gives the answer — HOLDS, and it touches nothing else.** The full diff
against `HEAD:lib/quant/marking.mjs` is two hunks: the `format` helper (`:28-34`) and the final
`wrong` return (`:96-101`). A/B of the shipping marker against HEAD's over **197,640 cases**
(8 templates x 120 seeds x every step x ~25 responses x 3 response bases):
- outcome or awarded/marks mismatches on any path: **0**
- `correct` / `ofr` / `slip` / `blank` results differing in any field: **0** (75,291 correct,
  1,742 ofr, 13,476 slip, 36,000 blank)
- the choice-step wrong branch at `:53` is untouched, so `payback:verdict`, `ped:verdict`,
  `index-numbers:verdict` and `percentage-change-economics:points` print byte-identical notes.
Units follow the step as claimed: `$1875m`, `370 units`, `25.00%`, `$251.37 billion`, `0.40`.
**D002-D004 (packet 13.1's engine) are unaffected.**

**7. "Before you finish" on the last check-in — HOLDS.** `components/LearnModeTab.jsx:640`, with
`isLastStep` declared at `:618`, above its use. The condition is exactly right rather than
approximately: `buildSteps` pushes a check-in after every block, so the last check-in of a
structured section is always the last flat step, and a section ending in a `legacy` block returns
`''` from `checkinIntro` anyway. On `national-income` the drill sits on flat step 13 of 14 — the
last step — so that section is the one the change was for. `currentQuant && 'a calculation'` is
still in the same filtered list (`:632`), so fix 7 does not disturb D025.

---

## The eleven confirmed ids

**D028 REJECTED.** Its title says "an unmatched drill never lands on the first check-in". Fix 1
makes that false. `arr` shares no title word with "Quantitative Techniques" or "Sales Forecasting",
so it is unmatched, and it now takes check-in ordinal 0 on `decision-making-techniques` — flat step
2 of 6, a 4-mark calculation as the third thing in the section, which is the step-0 wall the
reservation was written for. Round 1's evidence line (":121 starts the spread loop at i=1, so an
unmatched drill structurally cannot take slot 0") no longer describes the file. The trade is
deliberate, it is the right trade, and the unit test was re-titled to match
(`lib/quant-pool.test.mjs:140` "while there is room elsewhere", and the new test at `:161-168`) —
but a confirmation that no longer means what it says is worse than an open item. The chapter-match
half of the id still holds on live content: 4 of the 7 drilled sections land on the chapter that
teaches them. **Re-word or split the id, then re-verify.**

**The other ten still hold. None was re-confirmed; their status is untouched.**

- **D018** — fix 4 did not touch `specCode`/`specTerm`/`unit`; the spec test passes in the 267.
- **D019** — re-ran both draw counts myself, green; the floor and `MIN_VARIANTS` are unchanged.
- **D020** — fix 2 tightens it and closes round 1's own caveat. The live sweep still gives exactly
  the same 7 sections, right subject and unit on every one.
- **D021** — seed function untouched; fix 3 makes the redraw claim more true, not less.
- **D022** — all four Economics placements byte-identical before and after the fix round, and
  `quant-check` still marks every template's correct responses at full marks.
- **D023** — the Business claim holds and is stronger: `arr` moves from flat 5 to flat 2 and
  `payback` now renders at flat 5. Round 1's evidence string ("arr on step 5") is stale; the claim
  in the title is not.
- **D024** — `quant-check`'s own-figures check is green over all eight templates at 2,000 draws,
  and the marking A/B shows the `ofr` path byte-identical to HEAD across 1,742 ofr outcomes.
- **D025** — the clause is still in the list; all **eight** live placements land on `checkin` steps
  and none on `legacy`, so no drill renders under a silent sentence. Re-derived, because fix 1
  added a placement.
- **D026** — `QuantCard` still passes no `onResult` (confirmed in the served chunk: the props are
  `{item, onReseed}` only), so the drill cannot reach the quiz score. `npm run validate` and the
  QuizTab test both pass.
- **D027** — `validate` exits 0 and `quant.unit` still reports 15.

---

## Unclaimed but relevant (no status changed)

1. **The step-one answer is still one addition away** on `percentage-change-economics`, in
   2000/2000 draws — see fix 4 above. Either drop `d.points` from the two distractors that repeat
   it, or accept that the QS10 step and step one cannot both be closed while all three steps render
   together.
2. **The stem now contradicts step two.** It states "Forecasters expect growth of `rateNext`% next
   year", and step two asks for "Real GDP next year, if it grows at the same rate again" — at
   `rateNow`. Two different growth rates for the same next year, on the same card, every draw. A
   student who believes the stem computes `after x (1 + rateNext/100)`, which is outside tolerance
   and matches no declared slip, so it scores 0 with no diagnosis.
3. **`payback` still never reaches the Quiz tab.** `QuizTab.jsx:29-34` takes
   `templatesForSection(...)[0]`, which is `arr` in registry order. Fix 1 solves reachability
   through Learn Mode only. Whether the Quiz tab should show both is a decision, not a bug, but it
   should be written down.
4. **`sentence` at `lib/quant/marking.mjs:36` is now dead.** Its only caller was the line fix 6
   replaced. No eslint config exists in the repo so the build does not flag it.
5. **The new wrong note and the worked solution disagree on the same number's presentation.**
   `format` prints raw digits where the rest of the card uses `money()`/`num()`: "the answer is
   $3294125.00" against a stem reading "$3,294,125.00", and on `multiplier:leakages` the note says
   "0.40" while the worked solution one tap away says "0.4" (1596/2000 draws). Cosmetic, and the
   same class of mismatch fix 5 was raised for.
6. **This machine's volume is at 100%** (about 360 MB free of 228 GB). `npm run build` was run
   under a watchdog that would have killed it below 100 MB; it finished at exit 0 without tripping.
   Worth saying because the next session's gate may not be so lucky.

## Gate

**Not clear.** `node audit/scripts/ledger.mjs unverified 13.2` reports **GATE BLOCKED: 1 claimed
item(s) not confirmed** — D028. Every build, test and guard is green and the seven fixes do what
they say; the block is a ledger-truth problem, not a code problem, and re-wording D028 to describe
the reservation as a preference that yields is probably a five-minute change followed by a
re-verify. Items 1 and 2 above should be settled before 13.3 inherits the template.
