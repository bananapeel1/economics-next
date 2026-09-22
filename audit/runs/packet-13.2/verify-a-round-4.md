# Packet 13.2 — Verify A, round 4

Read-only pass, 22 September 2026. Scope: **check 7** of `audit/scripts/quant-check.mjs` and whether
its three exemptions are reasoned or convenient; the five template rejections fix round 3 claims;
the three declaration changes (`ped.variants`, breakeven's margin, `≈` in worked solutions); and
whether any of the twelve confirmed ids stopped being true. No source file, template, test or
script was changed. **No ledger verdict was recorded: nothing needs rejecting and nothing needed
re-confirming.**

`fix-round-3.md` and `printed-answer-ab.txt` were read as claims. Every number below is re-derived.
Probes kept beside this file; each runs read-only from the repo root:

- `verify-a-round-4-check7-switchboard.mjs` — check 7 re-implemented with each exemption on a switch
- `verify-a-round-4-marker-oracle.mjs` — the independent probe: every visible number put to the real marker
- `verify-a-round-4-payback-attack.mjs` — the two-mark leak, scored by `markItem`

**Gates run here, all by hand.** `npm run quant-check` exit 0 (8 × 200 = 1,600) · `--draws 2000`
exit 0 (16,000) · `--draws 5000` exit 0 (40,000) · `npm test` **267/267, 0 fail** · `npm run build`
**exit 0** · `npm run validate` **exit 0**, `quant.unit` 15, 184 findings outside the baseline, 0 new
BLOCK — identical to round 3. Disk stopped nothing: it went from 538 MB to 3.5 GB free during the
build, as something outside this session released space. Nothing was deleted.

**The dev server on 3001 is serving this code.** `.next/dev/static/chunks/lib_11udtz9._.js` and
`.next/dev/server/chunks/ssr/lib_0..j~43._.js`, both mtime 08:54:56 against template mtimes of
08:54, each carry `1740`, `margin === price`, `asPctOfRate - set.pct`, three `printed.includes`
and two `≈`. Client and SSR both. No stale-bundle trap.

---

## 1. Check 7 — sound in principle, and I defeated one of the three exemptions

`audit/scripts/quant-check.mjs:102-143`. It joins the stem with every step's `label`, `prefix`,
`suffix` and `choices`, strips thousands separators, then for each non-choice step looks for the
answer's own string and its 1-dp form.

**The mechanism is right, and it is the only check that can see this class.** The other six work
inside one template, where every figure is correct by construction; only the rendered card shows
the combination. Choices from *other* steps are scanned (`:125`), which is the case that matters.
I confirmed it reaches the round-3 defect by construction rather than by waiting for a 1-in-5,890
draw: forcing `asPctOfRate` to equal `pct` on a real draw makes the third choice read
`"4% — real GDP falls"`, typing `4` into step one scores **correct 2/2**, and check 7 **FIRES** on
step `change`.

### Exemption 1 — the method line: reasoned. I could not defeat it.

The claim is that a method line is a formula and never data. I checked rather than took it: all
**24** `method:` values across the seven template files are single-quoted string literals with no
interpolation, so no drawn figure can reach one. The only numerals in them are the constants
`100`, `12` and `1`. Putting methods back into the scan costs **9 hits in 5,000** on
`percentage-change-economics`, every one `"× 100"` against a forecast of `100.05` — true false
positives, exactly as the comment says.

One weakness: the exemption is enforced by **absence**, not by an assertion. Nothing fails if a
later template interpolates a drawn figure into `method`, and the guard would then be blind to it
by design rather than by accident.

### Exemption 2 — a choice step's own answer: currently a no-op. I could not defeat it.

`:128` skips the whole step on `step.type === 'choice'`, but the same line's
`!Number.isFinite(step.answer)` already excludes every choice in all eight templates, because every
choice answer is a string. The exemption is untestable today. It is, however, **broader than its
stated reason**: it skips the step entirely, so a numeric choice answer printed in the *stem* would
also be exempt. Latent, not live.

### Exemption 3 — a bare small integer ≤ 12: **defeated, at 100% of draws.**

`:133-135`. `payback`'s `months` answer is an integer 1–11 with no `$` and no `%`, and it is printed
verbatim in **two of the three `verdict` choices, by construction, in every draw**:

```
2m [months]  Months into year 4 before the investment is repaid        answer: 7 months
1m [verdict] Payback period
       choice 1: 3 years 7 months
       choice 2: 4 years 7 months
       choice 3: 3 years 5 months
```

Turning **only** this exemption off takes `payback` from 0 to **5,000 failures in 5,000 draws**.
Every other template is unaffected by the switch. The attack, run end to end through the real
marker: read the month that appears in two of the three choices, type it, never divide —
`markItem` awards **2/2 on `months` in 5,000 of 5,000 draws**. `paybackMonth === 6` is already
excluded by the draw, so the majority-vote rule never ties.

The exemption's stated justification — *"Months into year 4 has to say 4"* — is about a
**coincidence** between a label and an answer, and it is right about those. My independent probe
(below) measures those coincidences at 1,425/5,000 from the stem's "year N" and 269/5,000 from
`shortfall.label`. What it does not cover is the choices, where the number is not a coincidence at
all. The builder's own rule states the case: *"a distractor printing ANOTHER step's answer is the
subtlest case of all, so choices are scanned"* — here it is the **correct** choice, and the scan
happens but the exemption swallows the result.

### Two further blind spots, outside the three exemptions

**(a) Sign. Check 7 does not know about `acceptAbs`.** `forms` is built from
`String(step.answer)` (`:129`), so a negative answer is searched for as `"-10"` while the card
prints `"10"` — and `lib/quant/marking.mjs:57-58` accepts the magnitude when `acceptAbs` is set.
Measured on `ped` with its own rejection removed: check 7 sees **758** leaks; an abs-aware copy
sees **1,161** (403 more, all on `pctQ`); and `ped`'s own invariant, which *does* compare
`Math.abs`, sees **1,082** items where check 7 sees 758. The guard is ~30% blind on this
template's own leak class. Nothing ships broken only because `ped` carries an abs-aware filter of
its own — the template is protecting the guard, not the other way round.

**(b) The right boundary excludes `.`** (`:131`, `([^0-9.]|$)`). An answer printed as the last
number of a sentence is invisible. Proven by planting the same leak twice in the same draw:

```
shortfall 26000 planted as the middle (year 2) cash flow
   stem tail: "1 $34,000, year 2 $26,000, year 3 $62,400, year 4 $40,000."
   check 7: FIRES
shortfall 26000 planted as the last (year 4, sentence-final) cash flow
   stem tail: "1 $34,000, year 2 $20,000, year 3 $62,400, year 4 $26,000."
   check 7: *** SILENT ***
```

`payback` is the one shipping stem that ends on a bare figure; elsewhere the `**` bold markers
happen to supply the boundary. This costs **151 of the 568** leaks `payback`'s own invariant sees.

**(c) String equality, not tolerance.** A figure inside a step's tolerance but not equal to the
answer is invisible: `asPctOfRate = pct + 0.05` scores **2/2** and check 7 is silent. Not reachable
today, because the draw keeps 0.1 clear while marking tolerates 0.05. Worth one note anyway:
`percentage-change.mjs:212` asserts that gap with `< 0.05` while `marking.mjs:60` accepts with
`<= tolerance`, so a draw at exactly 0.05 separation would pass the invariant and mark the student
correct.

### An independent probe, which is how (a) and the payback leak were found

Re-implementing check 7 with the exemptions switched off still inherits its string matching. So I
also wrote a probe that asks the question the defect is actually about — *is there any number a
student can see that the **real marker** would score correct?* — by tokenising every visible field
and passing each token to `markStep`. It is blind to check 7's sign, boundary and formatting
decisions. Over 5,000 draws of all eight shipping templates:

```
percentage-change-business  CLEAN     breakeven  CLEAN     arr  CLEAN     ped  CLEAN
index-numbers  CLEAN        multiplier  CLEAN
payback
    5000/5000  months ← verdict.choice1        "3 years 7 months"
    5000/5000  months ← verdict.choice2        "4 years 7 months"
    1425/5000  months ← stem                   coincidence: "year 2" vs an answer of 2
     269/5000  months ← shortfall.label        coincidence: "end of year 2" vs an answer of 2
     269/5000  months ← verdict.choice3        coincidence: the year, not the month
percentage-change-economics
       9/5000  forecast ← change.method        false positive: "× 100" vs a forecast of 100.05
```

Read together with the switch results, this separates the exemption's real work (the three
coincidence rows, and the method row) from what it should not be hiding (the two choice rows).
**Seven of the eight templates are clean under an oracle that knows nothing about check 7's
assumptions.** That is the strongest thing I can say for check 7, and it is worth saying.

---

## 2. The five template fixes — re-derived; all hold, one piece of evidence is misattributed

I rebuilt the A/B through a scratchpad copy of the **real** `quant-check.mjs` pointed at a
swappable registry, verified first against the control (`8 × 5000 = 40000 items, all clean`, byte
for byte the shipping result). Each arm removes one rejection from a copy of the template; no
source file was touched.

| arm | mine (total / printed answer) | `printed-answer-ab.txt` |
|---|---|---|
| A control | 0 / 0 | 0 / 0 ✓ |
| B1 `breakeven`, variable may equal contribution | 444 / **222** | 451 / 229 ✗ |
| B2 `ped`, printed rejection removed | 1840 / **758** | 1840 / 758 ✓ |
| B3 `arr`, printed rejection removed | 508 / **254** | 508 / 254 ✓ |
| B4 `payback`, printed rejection removed | 985 / **417** | 985 / 417 ✓ |
| B5 `pc-economics`, `asPctOfRate` filter removed | 2 / **2** | 2 / 2 ✓ |
| B1b `breakeven`, margin may equal price *(not in the builder's A/B)* | 5 / **5** | — |

**Every one of the five rejections is load-bearing**, and the sixth (B1b) that the builder shipped
but did not A/B is load-bearing too. Restoring them all returns the guard to clean at 200, 2,000
and 5,000 draws, which I ran directly.

B1 does not reproduce: 222 against 229. Four of five arms are exact, so the difference is in how
the rejection was removed, not in the conclusion. Not material.

**B5 does not show what it is said to show.** `fix-round-3.md` presents the two failures as *"the
case a verifier found by exhaustive counting, which is the corroboration that matters: the guard
reaches the rarest instance of the class."* Tallied by step, **both hits are on `forecast`** — a
GDP level in $bn that coincidentally equals a percentage — and neither is on `change`, which is
the step the round-3 defect was about. At 5,000 draws a 1-in-5,890 event is expected 0.85 times,
so the A/B is under-powered for the claim it carries. Re-run at 200,000 draws it separates
cleanly: **39 `change` hits (1 in 5,128, against round 3's 1 in 5,890) and 16 `forecast` hits**.
The underlying claim is **true** — I also proved it by construction above — but the evidence
offered for it is not the evidence. Worth fixing in the record, because this is the second time
this packet a number has been asserted from an under-powered sample.

---

## 3. The three declarations

**`ped.variants: 1740` — CONFIRMED, exhaustively.** Enumerating the whole draw space: 5 prices ×
3 price changes × 6 quantity changes × 5 quantities × 6 goods = **2,700** raw; **2,220** survive the
filters that predate this round; **1,740** survive after the new printed-figure rejection. Exactly
the declared number, and it is a count, not a product. Corroborated from the other side: 5,000
draws yield **1,639** distinct stems against a theoretical reach of **1,641.5** for a 1,740-set
space — a declaration you cannot over-state without the variety floor catching it. Headroom at
5,000 draws is +326 (1,639 against a floor of 1,313); `MIN_VARIANTS = 500` clears comfortably.

**breakeven's margin "now drawn rather than left to fall out of a free `output`" — MISLEADING.**
`git diff HEAD` shows the old line was `output: breakEven + rng.step(40, 300, 10)`. The margin was
**always** drawn, from exactly this distribution, and `variants: 15 * 22 * 76 * 27 * FIRMS.length`
is unchanged from packet 13.1 — the comment already said "27 margins". What actually changed is
that the value is hoisted into a named binding and **tested**. The rejection is real and I measured
it (B1b: 5 leaks in 5,000 without it, 0 with it), so the outcome is right; the described mechanism
is not. Two of its three clauses are dead code: over the whole space, `margin === price` fires on 5
of 8,505 combinations (only ever at `price === 40`), and `margin === variable` and
`margin === contribution` fire on **0** — margin is ≥ 40 while variable ≤ 25 and contribution ≤ 20.

**`≈` where the figure is a rounding — CONFIRMED for percentage-change, but it is an instance, not
the class.** `exactly()` (`percentage-change.mjs:334`) compares the exact product against its own
2-dp rounding and is correct. Measured: Economics **3,690 of 5,000** lines carry `≈` ("about three
times in four" — right), Business **0 of 5,000**, which is also right because `forecastExact` is on
for that half so the figure is never a rounding.

`index-numbers` has the identical defect, untouched. Its real-wage solution line writes `=` over a
rounded figure in **4,779 of 5,000 draws (95.6%)**:

```
Real wage = $3,780 ÷ 110 × 100 = $3,436.36 at base-year prices      (true value 3,436.3636…)
Real wage = $2,929 ÷ 102.5 × 100 = $2,857.56 at base-year prices    (true value 2,857.5609…)
```

`realWage` is `round((newMoneyWage * 100) / laterIndex, 2)` and nothing requires that quotient to
land on two places. The builder's own sentence applies word for word: *a solution that writes `=`
over a rounding teaches a small lie in a template whose whole claim is that its arithmetic is
true.* Every other solution line in every other template is exact by construction — I checked each
one — so `index-numbers` is the only remaining case.

---

## 4. Regression — none. Twelve ids still hold; three carry stale evidence.

The round-3 blast radius is exactly six files: `audit/scripts/quant-check.mjs` and the five
templates `breakeven`, `arr`, `ped`, `payback`, `percentage-change`. No component, pool, route,
seed or test was touched, which bounds what can have regressed.

- **D018** — spec metadata (`specCode`, `specLeaf`, `specTerm`, `qs`) untouched in all five edited
  templates; `lib/quant-pool.test.mjs` green inside the 267.
- **D019** — green at 200, 2,000 and 5,000. Variety headroom is positive for all eight at all three
  counts; tightest is `multiplier` at +115 and `percentage-change-economics` at +147 (5,000 draws),
  both unchanged this round. `MIN_VARIANTS = 500` is intact at `:31` and `:205`. Holds.
- **D020, D021, D022, D023, D024, D025, D026, D029, D030** — no edited file lies on their paths.
- **D027** — `npm run validate` exit 0, `quant.unit` 15, 184 non-baseline findings, 0 new BLOCK:
  identical to round 3's measurement.
- **D028** — wont-fix, untouched.
- **D007** (packet 13.1) — still true: all four of its templates declare ≥ 500 number sets
  (breakeven 4,740,120 · ped 1,740 · arr 7,000 · multiplier 570) and all draw clean.

**Evidence drift, reported rather than rejected** — the claims hold, the file:line pointers do not:

- **D007**'s evidence cites ped's variants as `5*3*6*5*6`; that expression no longer exists, the
  file now declares the counted 1,740.
- **D019**'s evidence cites `quant-check.mjs:149-164` for the variety floor; inserting check 7 at
  `:102-143` moved it to `:179-207`, and `:149-164` is now the full-marks / own-figures block.
- **D006**'s evidence cites `:66-79` for the slip-tolerance check; it is now `:81-99`.

Also, `quant-check.mjs:10` still reads *"Six checks run on every draw"* and lists 1–6. Seven run.
Check 7 is documented in place but not in the header the next reader starts from.

---

## 5. Unclaimed but relevant

No status changed on any of these.

1. **`payback`'s `months` answer is readable off the `verdict` choices in 5,000 of 5,000 draws**,
   worth **2 of the item's 5 marks** to a student who never divides. All three steps render at
   once (`components/quant/CalculationItem.jsx:68-115`), so the choices are on screen while the
   months input is empty. This is the class the packet set out to close, at a rate of 1 in 1 —
   round 3's unclaimed defect was 1 in 5,890 and triggered a fix round. Structural, not a draw
   collision: you cannot offer "N years M months" as a choice without printing M, so the fix is a
   design decision (reorder the steps, vary the month across all three distractors, or fold the
   two steps into one) rather than another rejection loop.
2. **`index-numbers` writes `=` over a rounded real wage in 4,779 of 5,000 draws** — the same
   defect fix round 3 corrected in `percentage-change`, left in the one other template that has it.
3. **`payback`'s choices are ungrammatical in 1,331 of 5,000 draws**: `"1 years 7 months"` whenever
   `paybackYear === 2` (1,116/5,000 — and that string is the **correct answer**, not only a
   distractor), and `"1 months"` when `paybackMonth === 11` (252/5,000). The same packet
   pluralises carefully two files away (`percentage-change.mjs:326`, "1 percentage point").
4. **`breakeven`'s margin rejection carries two unreachable clauses** (`margin === variable`,
   `margin === contribution`).
5. **`quant-check.mjs`'s header still advertises six checks.**

---

## Gate

Every claimed id holds, `unverified 13.2` reports the gate clear, and all five commands are green.
**But I would not pass this gate.** The packet's own new artefact — check 7, written this round to
close "no answer is printed where a student can read it before answering" — asserts a property
that is false in 100% of draws for a template this packet ships, and its small-integer exemption is
the only thing standing between the guard and a two-mark leak. Two further blind spots (sign, and
the sentence-final period) hide 30% and 27% of the leaks the affected templates' own invariants
can see, so on those templates the guard is being protected by the code it is meant to be checking.
Recommend a fix round 4 covering items 1–3 above, and a correction to `fix-round-3.md`'s account of
what B5 demonstrates.
