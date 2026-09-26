# Drawing drill spec

Packet 13.5. A spec is content: the curves as equations, a named region family, and the four
things the mark scheme expects. No pixels, no SVG, no component knowledge.

## Why not the existing SVG blobs

`section_diagrams.data[].svg` holds hand-authored markup. A blob of paths cannot answer "did
supply move?", so it can be read but never marked. A drawing drill needs the diagram as
parameters, which is what this is.

## The spec

```js
{
  id: 'indirect-tax',
  subject: 'economics', unit: 'WEC11', specCode: '1.3.4',
  specTerm: 'indirect taxes',   // REQUIRED; see below
  title: 'Indirect tax in a competitive market',
  prompt: 'The government imposes an indirect tax of **$30 per unit**…',

  axes:   { x: { label, max }, y: { label, max } },
  curves: { D: { intercept: 120, slope: -1 },
            S: { intercept:  20, slope:  1 } },

  regions: 'taxWelfare',        // a family in lib/diagram/regions.mjs
  expect:  { curve: 'S', direction: 'up', size: 30, regions: ['dwl'] },
  tolerance: { q: 4, p: 6 },    // how close the equilibrium click must be
  feedback: { … },              // per wrong branch; see below
}
```

### `specCode` and `specTerm` — both required, and both checked

`specCode` is an IAL section number: **3 is always the middle digit** (`1.3.1` … `4.3.6`). A number
shaped any other way is a UK GCE number and names no section in this product. This file used to
document `1.4.3`, which is one of those, and both shipped specs carried it until packet 13.7.

`specTerm` is a phrase the specification itself uses **under that section's own heading**.
`checkSpecCitation` (lib/spec-sections.mjs) fails a spec without one, and `npm run diagram-check`
and `npm test` both run it. It exists because a shape test is not enough: `2.3.1` is a real heading
and still the wrong one for break-even.

**Know what that guard does and does not do.** It proves the citation EXISTS — a real section, in
your unit, that uses your phrase. It cannot prove the filing is RIGHT. Measured, not assumed: these
two drills also pass under `1.3.3 Supply`, which lists both instruments as supply shifters, and
`subsidy` passes under `1.3.6` as well. Choosing the section is yours to get right, and the reason
each spec's header carries a WHY-THIS-SECTION note.

**Frame the prompt for the diagram you are actually drawing.** These two drills shade a welfare loss
in a plain competitive market, so the good is a plain one. A tax on a *demerit* good, or a subsidy on
a *merit* good, moves output toward the social optimum and needs MPC against MSC — a different
diagram, and the triangle would not be a loss. Both specs said "demerit"/"merit" until 13.7, and the
prompt and the mark scheme disagreed with each other.

`size` is advisory. Direction earns the mark; the drill mentions the gap when it is far out,
because an examiner marks the shift, not the millimetres.

## The four marks

| | Checks |
|---|---|
| M1 | exactly one curve moved, and it is the expected one |
| M2 | it moved the expected way |
| M3 | the equilibrium click is within tolerance of where the student's OWN curves cross |
| M4 | the shaded set equals the expected set |

M3 and M4 are judged against the student's own diagram, not the model answer: shift supply by
$20 instead of $30 and the equilibrium mark is still winnable, because reading your own
diagram is the skill. M3 fails when M2 failed — reading an intersection correctly off a curve
that moved the wrong way is not the mark.

## Regions are computed, never authored

A family returns named polygons derived from the student's curves. Two rules the guard
enforces on every spec at every shift:

- **Disjoint.** No point belongs to two regions, or two regions answer to one click and the
  mark becomes a coin toss.
- **Covering.** The region areas sum to the area they jointly cover, so nothing is
  double-counted and no gap is left unnamed.

A family also declares its direction. Fed a backwards shift it returns nothing rather than
inverted rectangles, and the drill says to fix the direction first — the guard found that
case at a −55 shift on the tax spec.

## Feedback

Keys are wrong branches: `wrongCurve`, `bothMoved`, `nothingMoved`, `wrongDirection`,
`equilibriumAtOldQuantity`, and `regions['cb+pb']` for a specific wrong shading (sorted keys,
joined with `+`). Anything absent falls back to a generic line. Write the specific ones: the
difference between "not the right area" and "that is the tax revenue rectangle — a transfer,
not a loss" is the whole value of the drill.

## Terminology

**Welfare loss**, never "deadweight loss". Packet 13 strips the latter as off-spec.
