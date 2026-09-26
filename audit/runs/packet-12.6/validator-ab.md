# E033 — the guard, proved by mutation

`audit/scripts/validate-model-answers.mjs`, wired into `npm run validate` as a second command:

```
"validate": "node audit/scripts/validate-content.mjs && node audit/scripts/validate-model-answers.mjs"
```

The proof standard in `audit/specs/packet-12.6.md` is deliberately not "the code implements R1–R6".
It is: mutate the retrofitted data, watch `npm run validate` fail, revert, watch it pass. A validator
asserted to work without a failing case is what let `npm run contrast` exit 0 through a 1.81:1 defect
on 21 September.

All six runs below were produced by `audit/runs/packet-12.6/mutate-ab.sh`, which mutates by exact
string replacement (asserting the string occurs exactly once), runs the command, and reverts with the
inverse replacement. It never touches git, so a concurrent session's staged work in these files is
never read and never restored over. Full stdout for each run is in `ab-<label>.log`.

## R1 — `criteria[].marks` sums to the item's `marks`

Mutation: `neg-externality-4` criterion `c1`, `marks: 1` → `marks: 2` (`data/modelAnswersData.js`).

```
$ npm run validate
--- r1-mutated: exit 1
  R1  neg-externality-4    criteria marks sum to 5, item is 4 marks
```

Reverted (`marks: 2` → `marks: 1`):

```
$ npm run validate
--- r1-reverted: exit 0
```

## R2 — every `criteria[].seg` resolves to a segment id on the SAME item

Mutation: `neg-externality-4` criterion `c1`, `seg: 'p1a'` → `seg: 'p1a-typo'`.

```
$ npm run validate
--- r2-mutated: exit 1
  R2  neg-externality-4    criterion c1 points at seg "p1a-typo", which is not a segment id on this item
```

Reverted:

```
$ npm run validate
--- r2-reverted: exit 0
```

## R4 — the tariff is legal for the item's SUBJECT, read from `lib/ial-marking.js`

Mutation: `negative-externality-tax-8`, `marks: 8` → `marks: 10` (`data/modelAnswersExpansion.js`).

10 is chosen on purpose. It is a legal IAL **Business** tariff and not a legal IAL **Economics** one,
so a validator carrying its own flat list of "tariffs that exist" would pass this mutation. The rule
reads `tariffsFor(item.subject)`, and the message prints the list it read:

```
$ npm run validate
--- r4-mutated: exit 1
  R1  negative-externality-tax-8    criteria marks sum to 8, item is 10 marks
  R4  negative-externality-tax-8    10 marks is not a legal IAL economics tariff (legal: 2, 4, 6, 8, 14, 20)
```

R1 fires alongside R4, necessarily: changing the tariff breaks the sum. Both lines are recorded rather
than one of them suppressed.

Reverted:

```
$ npm run validate
--- r4-reverted: exit 0
```

## What this does and does not establish

**Established:** R1, R2 and R4 each fail a real mutation of real data, with a message naming the item
and the defect, through `npm run validate` and not through the script called directly; and the command
returns to exit 0 when the mutation is undone. `data/modelAnswersData.js` and
`data/modelAnswersExpansion.js` were confirmed free of both mutation strings afterwards
(`grep -c "p1a-typo\|marks: 10," → 0, 0`) and the validator re-run clean.

**Not established by these six runs:** R3, R5 and R6 are implemented and read by the same code path,
but they were not proved by mutation here — the spec's proof standard names R1, R2 and R4 only. R5's
branch is the one that runs on all 63 un-retrofitted items on every run (they carry neither `criteria`
nor `script`, so `hasCriteria === hasScript` and nothing fires), which is the only one of the three
with live coverage today. R3 and R6 are, on today's data, untested branches. Stated so that nobody
reads "the guard is proved" as covering all six rules.
