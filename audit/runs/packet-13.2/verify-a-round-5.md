# Packet 13.2 — Verify A, round 5

Read-only pass, 22 September 2026. Scope as briefed: `payback`'s rebuilt last step, the split of
check 7's small-integer exemption, the three other round-4 fixes, and regression across the twelve
confirmed 13.2 ids plus 13.1's D001–D008. **No source file, template, test or script was changed.
No ledger verdict was recorded** — nothing needs rejecting, and the brief says not to re-confirm
what holds.

`fix-round-4.md` and `choice-exemption-ab.txt` were read as claims. Every number below is
re-derived. Probes kept beside this file, each read-only from the repo root:

- `verify-a-round-5-payback.mjs` — the month leak, the new rejection's liveness, the verdict attack
- `verify-a-round-5-choice-exemption-ab.mjs` — the builder's A/B rebuilt, plus a fourth arm
- `verify-a-round-5-three-fixes.mjs` — `acceptAbs`, the boundary and `exactly`, each A/B'd
- `verify-a-round-5-check7-attack.mjs` — four routes at check 7, measured against a control
- `verify-a-round-5-exemption-defeat.mjs` — cases constructed to slip past the exemption

**Gates, all run here.** `npm run quant-check` exit 0 at 200 (1,600 items), `--draws 2000` (16,000)
and `--draws 5000` (40,000) · `npm test` **267/267, 0 fail** · `npm run build` **exit 0**
("Compiled successfully in 4.1s") · `npm run validate` **exit 0**, `quant.unit` 15, 184 findings
outside the baseline, **0 new BLOCK** — identical to rounds 3 and 4. Disk held at 3.5 GB free
throughout and nothing was deleted.

**The dev server on 3001 is serving this code.** `.next/dev/static/chunks/lib_11udtz9._.js` and
`.next/dev/server/chunks/ssr/lib_0..j~43._.js`, both 09:26:02 against sources at 09:25:26–09:26,
each carry `paybackYear + 1` three times (draw, invariant, choices) and the new
`exactly = (value, dp)` helper, and neither carries the deleted `margin === variable`. Client and SSR both. No stale
bundle.

---

## 1. `payback` — the month leak is closed. The step that replaced it is free.

### The month count is no longer readable by construction

Round 4's attack, re-run through the real `markItem`: **0 of 5,000 draws** (was 5,000 of 5,000).
Round 4's own independent marker oracle, re-run unchanged
(`verify-a-round-4-marker-oracle.mjs`), now reports for `payback` a single row:

```
   369/5000  months <- stem    e.g. answer 2, visible 2
```

The two 5,000/5,000 `verdict.choice` rows, the 269 `shortfall.label` row and the 269
`verdict.choice3` row are gone. Seven of the eight templates are clean; the ninth row,
`percentage-change-economics forecast <- change.method 9/5000`, is the `"× 100"` false positive
round 4 already characterised.

The 369 that remain are the stem's own cash-flow list — "year 1 $34,000, year 2 $26,000, …" —
where the month happens to equal one of the four year labels printed for every draw. This is the
coincidence class the exemption exists for, and it is **not exploitable**: the draw leaves seven
candidate months, so typing a year number you can see (7.4% right) is worse than guessing (14%).
Down from round 4's 1,425 because the new rejection removes three of the four collisions.

### The new rejection fires. It is not dead code.

`payback.mjs:70`, mirrored as an independent invariant at `:87-89`. Re-running the draw loop's
arithmetic over 5,000 seeds (38,833 attempts):

```
   printed-figure clause (:67) fired :   870
   NEW year-number clause (:70) fired: 1491   <- 0 would mean dead code
   accepted                          : 5000
```

It is live in every branch of `paybackYear`: at year 2 it excludes months 1–3, at year 3 months
2–4, at year 4 months 3–5. Unlike the two `breakeven` clauses round 4 struck out, this one cannot
be dead — `paybackMonth` and `paybackYear ± 1` are drawn from overlapping small ranges.

### But the step no longer tests anything. 1 mark, free, on every draw.

`payback.mjs:158-164` now asks *"The investment is paid back during"* with choices
`year N−1 / year N / year N+1`. The step directly above it is labelled (`:125`):

> **Months into year 4** before the investment is repaid

`components/quant/CalculationItem.jsx:68-115` renders every step at once, so that label is on
screen, unprompted, while the choice is unanswered. The answer string `year 4` and the label's
`year 4` are the same six characters.

Measured over 5,000 draws:

```
   verdict answer string printed in the stem or another step's label : 5000/5000
   attack: click the year named in the months label -> markItem CORRECT 5000/5000
```

Step one's label (`:105`) names `year N−1`, which is the first distractor, so the two labels
between them name the answer *and* eliminate one of the three choices. The builder's claim that
the step "is now about the year alone, which is the off-by-one it exists to test" does not hold:
the off-by-one is stated in the label above it.

This is not a regression — the old whole-period choice was readable off the same label — but it is
the class the packet set out to close, still open, at 1 in 1. It is also **not fixable by another
rejection**: you cannot ask "how many months into year N" without printing N. Rewording `:125` to
"Months into the payback year before the investment is repaid" closes most of it; `:105` would
still narrow three choices to two, so a full fix needs both labels or a distractor set that is not
the adjacent years.

**Secondary, and not new.** `verdict.correctNote` (`:165-167`) prints both `money(d.shortfall)` and
`${d.paybackMonth} months`, and `wrongNote` prints the shortfall as well — so pressing "Mark my
working" with only the free verdict clicked reveals the other four marks. The always-available
"Worked solution" button already gives the same reveal by design (`marking.mjs:89-95` records that
decision), so this is not a new exposure; it only means that with the verdict free, no arithmetic
is needed at any point in the item.

### Pluralisation

`:177` is fixed: over 2,000 draws, 560 lines read "1 year N months" and 1,440 "N years N months".
No "1 years" remains.

---

## 2. Check 7's split — the A/B reproduces exactly, and the split is free

`choice-exemption-ab.txt` rebuilt from scratch (check 7 copied verbatim from
`quant-check.mjs:137-168`, with the one exemption on a switch; `payback`'s old whole-period step
reconstructed in memory from the shipped draw data as
`[Y−1 years M months, Y years M months, Y−1 years 12−M months]`, which is what the `paybackMonth === 6`
exclusion at `:39-40` implies the third choice was):

| arm | mine | `choice-exemption-ab.txt` |
|---|---|---|
| A · year-only choice, guard AS SHIPPED | 0 / 40,000 | 0 ✓ |
| B1 · whole-period choice, guard AS SHIPPED | **5,000** / 40,000, all `payback` | 5,000 ✓ |
| B2 · same sabotage, guard AS IT WAS | 0 / 40,000 | 0 ✓ |
| B3 · control item, guard AS IT WAS *(not in the builder's A/B)* | 0 / 40,000 | — |

B1's failure text is identical to the builder's, down to the seed:
`payback [check-payback-0] months: the answer 7 is printed in a choice as "7"`. B3 is the arm that
was missing: scanning choices without the exemption costs **no false positives** on any shipping
template, so the split is free as well as necessary.

### Defeating the exemption again — one live route, two constructible ones

Four routes run against a control of check 7 as shipped, 5,000 draws × 8 templates
(`verify-a-round-5-check7-attack.mjs`). Control: clean on all eight.

**Route 1 — a CHOICE step's answer printed anywhere else on the card. DEFEATED, 5,000/5,000 on
`payback`, clean on the other seven.** `quant-check.mjs:141` reads
`if (step.type === 'choice' || !Number.isFinite(step.answer)) continue;`. The comment at `:120`
says only the step's *own* choices are exempt, "because printing it is what a choice is"; the code
stops looking at that answer **anywhere**, including the stem and every other step's label. Round 4
called this exemption "latent, not live" because every choice answer is a string and
`Number.isFinite` excluded it regardless. Fix round 4 made it live, by putting the answer `year 4`
into a choice while `months.label` says `year 4`. Widening the check to compare a choice step's
answer string against the other surfaces fires on `payback` 5,000/5,000 and on nothing else —
a one-line widening with no false-positive cost, on today's content.

**Route 2 — the answer printed at more decimal places than `String(answer)`.** `(?!\.[0-9])` at
`:155` stops `3` matching inside `3.5`, and equally stops the guard seeing an answer of `3` printed
as `3.0`, or `4.5` printed as `4.50`. **Clean on all eight**: `money()` and `num()` use
`maximumFractionDigits` with no minimum, so nothing pads. The class exists; no instance does.

**Route 3 — surfaces check 7 never joins into `prose`.** `CalculationItem.jsx:54-62` renders three
chips above the stem: `unit`, `specCode`, `topic` and `"<n> marks"`. None reach check 7. Hits at
2,000 draws: multiplier 401, pc-economics 207, pc-business 179, breakeven 134, payback 134 — but
**every single hit is a bare small integer** (e.g. `breakeven.contribution = 12` against the chip
`WBS12`, `multiplier.k = 4` against `4 marks`), which the exemption would drop even if the chips
were scanned. A scope gap with no live consequence.

**Route 4 — a figure inside tolerance but not equal to the answer.** Check 7 is string equality;
`marking.mjs:60` accepts within `tolerance`. **Clean on all eight**, confirming round 4's "not
reachable today".

**The small-integer exemption itself is still defeatable by construction**
(`verify-a-round-5-exemption-defeat.mjs`), which matters because 13.3 inherits this guard:

```
A · "…runs 8 delivery vans."            answer 8 vans     check 7 *** SILENT ***   marker: correct 2/2
B · "…grew by 6 per cent last year…"    answer 6 %        check 7 *** SILENT ***   marker: correct 2/2
C · "A unit sells for $12…"             answer 12         check 7 FIRES "$12"      marker: correct 1/1
```

B is the sharper one: the escape hatch at `:159` is `inProse[2] === '%'`, the literal sign, so a
per cent written out in words walks straight past it. Neither A nor B is live on the eight shipping
templates; both are one stem away.

---

## 3. The other three round-4 fixes — all three hold

**`acceptAbs` forms (`quant-check.mjs:145-149`) — load-bearing, and complete for the class.**
A/B with the content held constant and only the guard varying: plant the answer's magnitude in the
stem, which is what `marking.mjs:57-58` accepts, across `ped`'s 10,000 negative `acceptAbs` steps
in 5,000 draws.

```
   guard AS SHIPPED (abs-aware) sees : 10000 / 10000
   guard AS IT WAS  (signed only) sees:     0 / 10000
```

**The right boundary (`:155`) — closed.** Round 4's demonstration re-run, the same leak planted
mid-sentence and sentence-final in 5,000 stems:

```
   lookarounds  (AS SHIPPED): mid-sentence 5000, sentence-final 5000
   char classes (AS IT WAS ): mid-sentence 5000, sentence-final  274
```

The 274 are collisions where the planted value also equals a mid-sentence figure, not survivals.

**`exactly` moved to `format.mjs:65-67`, and `index-numbers` now uses it.** One definition,
imported at `percentage-change.mjs:1` and `index-numbers.mjs:1`; no second copy anywhere under
`lib/quant`. Over 5,000 draws, checking the sign against the true quotient at each site:

| site | `=` | `≈` | dishonest |
|---|---|---|---|
| `index-numbers` real wage (`:192`) | 221 | **4,779** | 0 |
| `percentage-change-business` forecast (`:318`) | 5,000 | 0 | 0 |
| `percentage-change-economics` forecast (`:375`) | 1,310 | 3,690 | 0 |

The 4,779 is exactly the count round 4 measured for the defect, and the 3,690 and the Business 0
match round 4's figures for the site that was already fixed — so the fix lands on precisely the
population that was wrong. **What a student sees changed**: the real-wage line now reads
`Real wage = $3,780 ÷ 110 × 100 ≈ $3,436.36 at base-year prices` in 96% of draws, where it claimed
`=` over `3,436.3636…` before.

I then scanned **every** worked-solution line shape in all eight templates, evaluating each
left-hand expression left to right against the printed value: 30 distinct line shapes, and **no
remaining `=` over a rounding, and no `≈` over an exact value**. Round 4's "index-numbers is the
only remaining case" holds.

---

## 4. Regression — none. Twelve ids plus D001–D008 all still hold.

Blast radius since round 4 is exactly six files — `audit/scripts/quant-check.mjs`,
`lib/quant/format.mjs`, and the templates `breakeven`, `index-numbers`, `payback`,
`percentage-change`. No component, route, pool, seed or test was touched, which bounds what can
have regressed.

- **D018** — all eight `specCode` / `specLeaf` / `specTerm` / `qs` values are byte-identical to the
  ones its evidence pins to `bus_spec.txt` / `econ_spec.txt`; every middle digit is still 3, as the
  IAL numbering requires. `lib/quant-pool.test.mjs` green inside the 267.
- **D019** — green at 200, 2,000 and 5,000. Variety headroom positive for all eight at all three
  counts. `payback`'s draw space is narrowed by the new rejection and still clears comfortably:
  4,959 distinct stems in 5,000 draws against a floor of 3,465 (+1,494, the largest headroom of the
  eight). Tightest remain `multiplier` +115 and `percentage-change-economics` +147, both unchanged.
  `MIN_VARIANTS = 500` intact.
- **D020–D026, D029, D030** — no changed file lies on their paths.
- **D027** — `npm run validate` exit 0, `quant.unit` 15, 184 non-baseline findings, 0 new BLOCK:
  identical to rounds 3 and 4.
- **D028** — wont-fix, untouched.
- **D001–D005, D008** — `quant-check.mjs` still imports only `lib/quant/index.mjs`: no browser, no
  network, no database, and `process.exit(1)` at `:259`. Seeded rebuild, marking purity and the
  admin route are all off the blast radius.
- **D006** — the slip-tolerance check is intact and unchanged in substance.
- **D007** — breakeven 4,740,120 · ped 1,740 · arr 7,000 · multiplier 570, all ≥ 500, all drawing
  clean.

### Evidence drift — corrected here, not in the ledger

Round 4 left these for the next verifier; the builder is right not to rewrite verification evidence.
The claims hold, the pointers have moved again since round 4 read them:

| id | evidence cites | round 4 read | correct now |
|---|---|---|---|
| D006 | `quant-check.mjs:66-79` | `:81-99` | **`:87-105`** |
| D019 | `quant-check.mjs:149-164` | `:179-207` | **`:204-232`** |
| D019 | `MIN_VARIANTS` at `:31` and `:162` | — | **`:37` and `:230`** |
| D005 | `package.json:9` | — | **`package.json:10`** |
| D007 | ped variants `5*3*6*5*6` | counted 1,740 | **`ped.mjs:28`, `variants: 1740`** |

Round 4's item 5 is closed: `quant-check.mjs:10` now reads "Seven checks run on every draw".

---

## 5. Unclaimed but relevant

No status changed on any of these.

1. **`payback`'s `verdict` step is worth 1 of the item's 5 marks and is free on every draw**, because
   `months.label` (`payback.mjs:125`) names the year that is the answer, and all steps render at
   once. Structural; needs a label reword plus a distractor change, not another rejection.
2. **Check 7 stops looking at a choice step's answer anywhere on the card** (`quant-check.mjs:141`),
   which is broader than the reason given at `:120`. Widening it to compare a choice answer string
   against the other surfaces fires on `payback` 5,000/5,000 and on nothing else.
3. **The small-integer exemption's `%` escape is the literal sign only**, so "6 per cent" in a stem
   is exempt where "6%" is not. Not live; one stem away, and 13.3 inherits the guard.
4. **The chips above the stem are never scanned** (`CalculationItem.jsx:54-62`). Every current hit
   is a small integer the exemption would drop anyway.
5. **`multiplier.mjs:58` is a tautology**: `if (round(1 / d.sum, 2) !== d.k)` cannot fire, because
   `k` is defined as `round(1 / sum, 2)` at `:51`. Same class as the two `breakeven` clauses round 4
   struck out. The real protection is `CLEAN_TOTALS = [0.2, 0.25, 0.4]` at `:20`, whose reciprocals
   are 5, 4 and 2.5 — all exact, which is why the `=` on that solution line is honest.
6. **The method-line exemption is still enforced by absence, not assertion** (round 4's note). All
   24 `method:` values remain uninterpolated string literals; nothing fails if 13.3 interpolates a
   drawn figure into one.

---

## Gate

All five commands are green and every confirmed id still holds. The month leak that stopped round 4
is genuinely closed, by a rejection that fires, and the three smaller fixes are each load-bearing
and correctly aimed.

**The one thing a student would notice is that `payback`'s last step is now a free mark.** It is
1 of 5 rather than round 4's 2 of 5, and it is not a new defect — the step it replaced was readable
off the same label — but the packet's own stated property, "no answer is printed where the student
can read it before answering", is still false for a template this packet ships, in 100% of draws,
and check 7 is structurally unable to see it. Everything else I found is a comment, a latent guard
weakness with no live instance, or a scope gap with no consequence.

I would pass this gate on the condition that item 1 is fixed — it is a two-string change plus a
distractor decision — and item 2 with it, since the widening that catches item 1 costs nothing on
current content. Neither needs another full verification round; a targeted re-run of
`verify-a-round-5-payback.mjs` and `verify-a-round-5-check7-attack.mjs` would settle both.
