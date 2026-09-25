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
  subject: 'economics', unit: 'WEC11', specCode: '1.4.3',
  title: 'Indirect tax on a demerit good',
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
