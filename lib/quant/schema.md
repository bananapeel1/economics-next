# Quantitative item contract

Packet 13.1. `PLAN.md` packet 3 writes a validator check counting quantitative items per unit; this
is the shape it counts. Fixed here rather than in the packet 3 session because 13.1 needed it first.

## What is stored, and what is not

**A generated item is never stored.** Only the pair `{ template, seed }` is — in a content row, in an
SM-2 queue row, in a URL. The numbers are rebuilt on demand by `buildItem(template, seed)`, identically,
in any process on any day.

That is the whole point. A multiple-choice item is memorisable the second time a student meets it; a
template is not, because only the method repeats. It also means a bad draw can be reported and reproduced
from the item id alone (`quant:breakeven:a7f3k2b9`), with nothing to migrate when a template is corrected.

## The template

```js
{
  id:        'breakeven',          // stable; the stored half of every reference
  subject:   'business',           // 'business' | 'economics'
  unit:      'WBS12',              // IAL paper code
  specCode:  '2.3.1',
  title:     'Break-even and margin of safety',
  topic:     'Managing finance',
  variants:  4740120,              // size of the parameter space; the guard floor is 500

  draw(rng),                       // rng from lib/quant/rng.mjs — never Math.random
  invariants(data) -> string[],    // conditions the guard re-checks on every draw
  build(data)      -> { stem, steps, solution },
}
```

`draw` may reject and redraw (bounded, then throw) when clean answers need it. Prefer generating
**backwards from the answer** where that works: `arr.mjs` draws the investment and the ARR first and
derives the cash flows, because drawing cash flows forwards and hoping the ARR lands on two decimal
places produces an ugly question most of the time.

## A step

One step per mark-scheme line, in the order an examiner reads them.

```js
{
  id:        'breakEven',
  label:     'Break-even output',                    // what the student is asked for
  method:    'fixed costs ÷ contribution per unit',  // shown always; it is a drill, not a test
  marks:     2,
  dp:        0,            // the answer must be exact at this precision — the guard enforces it
  answer:    480,
  tolerance: 0.5,
  prefix:    '$',          // optional
  suffix:    'units',      // optional
  acceptAbs: true,         // optional; elasticities, where the sign is conventionally dropped

  ofr:   (values) => fixed / values.contribution,   // own figure rule: this step's method applied
                                                     // to the student's OWN earlier answers
  slips: [ { value, note } ],                        // named wrong methods and what to say about each
}
```

Choice steps carry `type: 'choice'`, `choices: []`, and optional `correctNote` / `wrongNote`.

## Marking outcomes

| Outcome  | Marks | Meaning |
|---|---|---|
| `correct` | full | inside tolerance |
| `ofr`     | full | wrong figure, right method, carried correctly from the student's own earlier answer |
| `slip`    | zero | matches a named wrong method; the feedback names it |
| `wrong`   | zero | no diagnosis available; the method line is repeated |
| `blank`   | zero | nothing entered |

A slip scoring zero is deliberate. The method was wrong; naming which wrong method is worth more to the
student than the mark would be.

## The rule that matters

**No slip value may fall within its step's tolerance of the answer.** A slip inside tolerance marks a
wrong method *correct* — it teaches the wrong method, silently, and no amount of reading the file will
reveal it because it only happens on particular draws. `npm run quant-check` asserts it on every draw of
every template. It has already caught one real case: a leakage total of 0.5 makes the MPC 0.5 too, so the
multiplier template excludes that total.
