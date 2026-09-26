# Drawing drill spec

Packet 13.5, generalised in 13.7. A spec is content: the lines as equations, a named region family,
and what the mark scheme expects. No pixels, no SVG, no component knowledge. One spec file per drill in
`lib/diagram/specs/`, registered in `lib/diagram/index.mjs`. This page is enough to write any of the
shapes below; `lib/diagram/fixtures.mjs` has a working skeleton of each one that has no shipped spec yet.

## Why not the existing SVG blobs

`section_diagrams.data[].svg` holds hand-authored markup. A blob of paths cannot answer "did
supply move?", so it can be read but never marked. A drawing drill needs the diagram as
parameters, which is what this is.

## The shapes, and which family draws each

| Shape | Curves (keys) | Student moves | Point marked | Family | Marks |
|---|---|---|---|---|---|
| Indirect tax | `D`, `S` | `S` up | D ∩ S₂ | `taxWelfare` | 4 |
| Subsidy | `D`, `S` | `S` down | D ∩ S₂ | `subsidyWelfare` | 4 |
| Maximum price | `D`, `S`, `Pmax` (slope 0) | `Pmax` down | Pmax ∩ **S** (quantity traded) | `maxPrice` | 4 |
| Minimum wage | `D`, `S` (labour), `Wmin` (slope 0) | `Wmin` up | Wmin ∩ **D** (employment) | none in `min-wage`; the `minWage` family exists for a fixture | 3 |
| Negative production externality | `D` (= MPB = MSB), `S` (= MPC) | `S` up — the copy is MSC | MSC ∩ D (social optimum) | `negativeExternality` | 4 |
| Tariff | `D`, `S` (domestic), `Pw` (slope 0) | `Pw` up | Pw ∩ D (consumption) | `tariff` | 4 |
| Break-even | `TR`, `TC` | `TC` up | TR ∩ TC | `breakEven` | 4 |
| Monopoly vs competition | `AR`, `MR`, `MC` (slope 0) | nothing | Q where MR = MC, P read on `AR` | `monopoly` | 2 |
| AD/AS | `AD`, `SRAS` | `AD` | AD ∩ SRAS | none | 3 |
| Currency market | `D`, `S` | one of them | D ∩ S | none | 3 |

The curve keys in the table are what the family reads: a spec using a family must name its curves so.
A spec with no family (AD/AS, a currency) names its curves freely and states its `point`.

## The spec

```js
{
  // ── identity ──
  id: 'max-price',
  subject: 'economics', unit: 'WEC11', specCode: '1.3.6',
  specTerm: 'maximum and minimum (guaranteed) prices',   // REQUIRED; see below
  title: 'Maximum price below equilibrium',
  topic: 'Government intervention',   // the chip beside the title; unguarded, so easy to forget
  prompt: 'The government sets a **maximum price of $50** …',   // **bold** renders bold
  placeWith: ['…'],                   // optional; see "Where Learn Mode puts it"

  // ── the canvas ──
  axes: {
    x: { label: 'Quantity (000 bags per week)', max: 120 },
    y: { label: 'Price ($ per bag)', max: 160 },
    // optional per axis: tick (spacing; default adapts to max — 20 for 120/140/160, 200 for 1000,
    // 2.5 for 20), short (the word a screen reader hears; default: label up to its first " (")
  },

  // ── the lines ──
  curves: {
    D:    { intercept: 140, slope: -1 },
    S:    { intercept: 20,  slope: 1 },
    Pmax: { intercept: 80,  slope: 0,             // slope 0 = a horizontal line
            label: 'Pmax', name: 'Maximum price line', role: 'policy',
            shiftedLabel: 'Pmax', ghost: 'none' },
  },
  movable: ['D', 'S', 'Pmax'],        // optional; default every curve (the student must choose)
  nudge: 5,                           // optional; one arrow tap, and the smallest move that counts
  range: 55,                          // optional; the furthest a line can move either way

  // ── what is marked ──
  regions: 'maxPrice',                // a family in lib/diagram/regions.mjs, or omit for no area
  expect: { curve: 'Pmax', direction: 'down', size: 30, regions: ['dwl'] },
  tolerance: { q: 4, p: 6 },          // how close the point click must be, in axis units
  // point / origin: normally omitted — they come from the family. See "The point".

  // ── words ──
  glyphs: { q2: 'Qs', p2: 'Pmax' },   // optional; see "Labels"
  steps: { shift: { name, prompt }, point: { name, prompt }, shade: { name, prompt } },  // optional
  criteria: { M1: 'Correct line moved', M3: 'Quantity traded identified' },           // optional
  distractors: [{ cross: ['Pmax', 'D'], feedback: 'That is the quantity DEMANDED …' }],
  feedback: { … },                    // per wrong branch; see "Feedback"
}
```

### A curve

`{ intercept, slope }` is a straight line p = intercept + slope · q, and a shift is a change of
intercept and nothing else. Slope 0 is a horizontal line (a price, wage or world-price line, constant
MC): it moves only up and down, and dragging it sideways does nothing. Vertical lines are not
supported. Keep every line on the canvas: intercepts between 0 and `axes.y.max`, and the points that
matter inside both axes — the guard fails a spec whose original or model point is off the canvas.

Display fields, all optional:

| Field | Default | Used for |
|---|---|---|
| `label` | the key | on the canvas at the line's end (`'D = MPB = MSB'`) |
| `short` | `label` | in the mark-scheme rule line (`'MSB'`) |
| `name` | `D` → "Demand curve", `S` → "Supply curve", else `label` | screen readers, the nudge row |
| `role` | `D` demand, `S` supply, slope 0 policy, else by slope | colour: `demand` blue, `supply` amber, `policy` purple, `marginal` pink. Whatever the student moved turns red |
| `shiftedLabel` | `label` + ₂ | the label once moved (`'MSC'`, `'Pw + t'`) |
| `ghostLabel` | `label` + ₁ | the original's label once moved (`'S = MPC'`) |
| `ghost` | `'dashed'` | the original once moved: `'dashed'`, `'solid'` (still a curve in its own right — MPC under MSC), or `'none'` (a price line's starting position means nothing) |

### Shift or no shift

`expect.curve` present means the drill has a shift step, M1 and M2. Absent (monopoly vs competition)
means nothing is movable, M1 and M2 are omitted, and the drill starts at the point step.
`expect.direction` is `'up'` or `'down'` — the sign of the intercept change. On a downward-sloping
curve up is also RIGHT (an increase in demand); on an upward-sloping one up is LEFT (a fall in
supply). `size` is advisory: direction earns the mark, and the drill mentions the gap when it is far
out, because an examiner marks the shift, not the millimetres.

A horizontal line should START where it has no effect — a maximum price or minimum wage at the
equilibrium, a world price where free trade puts it — so the student decides the direction.

### The point

```js
point:  { cross: ['MR', 'MC'], readOn: 'AR' }   // quantity where MR meets MC, price read on AR
origin: { cross: ['AR', 'MC'] }                  // the ORIGINAL position, shown as P₁/Q₁
```

`readOn` defaults to the first curve in `cross`; it matters only when the price is read off a third
curve. `origin` defaults to the point's own pair. Both are evaluated on the student's OWN curves
(the point) and on the spec's base curves (the origin).

With a family, leave both out: the family declares them (table above) and computes its regions from
them. If a spec states one, it must equal the family's — the guard refuses a drill that marks one
point while shading triangles built from another. Without a family, `point` defaults to
`{ cross: ['D', 'S'] }`; state it whenever your curves are named otherwise (`['AD', 'SRAS']`).

### Labels

P₁/Q₁ mark the origin, P₂/Q₂ the point. `glyphs: { p: 'W', q: 'E' }` gives W₁ E₁ W₂ E₂; `{ p: 'PL',
q: 'Y' }` for AD/AS; any of the four can be named outright (`{ p1: 'Pm', q1: 'Qm', p2: 'P*', q2: 'Q*' }`).
Keep them short: they sit on 11.5px guide labels. The layout solver (lib/diagram/layout.mjs) moves
labels off each other, off the ticks and — where it can — off the lines; the guard proves no two
ever overlap at every shift, at 390px and 1024px.

### Steps and headings

Steps are `shift` (if the drill has one), `point`, and `shade` (if `expect.regions`). Defaults:
"Shift a curve" / "Mark the equilibrium" / "Shade the loss", with generic prompts. Rename them to
the task: "Set the maximum price" / "Mark the quantity traded" / "Shade the welfare loss". A shift
prompt must not give away the direction or the curve — those are M1 and M2. Keep "On a phone, tap
it, use the arrows below, then Next." in it: the nudge path does not advance on its own.

`criteria` renames the four headings (`M1` "Correct curve shifted", `M2` "Correct direction of
shift", `M3` "New equilibrium identified", `M4` "Correct area shaded"). The ids never change.

### Where Learn Mode puts it

`lib/diagram-pool.js` derives a section's drills from `subject`, `unit` and `specCode`, and places each
after the chapter whose title shares a word with the spec's `title`. When the chapter that teaches the
diagram is titled otherwise, list its words in `placeWith` (the externality spec does: its chapter is
"Marginal Analysis and the Welfare Areas").

## `specCode` and `specTerm` — both required, and both checked

`specCode` is an IAL section number: **3 is always the middle digit** (`1.3.1` … `4.3.6`). A number
shaped any other way is a UK GCE number and names no section in this product. This file used to
document `1.4.3`, which is one of those, and both shipped specs carried it until packet 13.7.

`specTerm` is a phrase the specification itself uses **under that section's own heading**.
`checkSpecCitation` (lib/spec-sections.mjs) fails a spec without one, and `npm run diagram-check`
and `npm test` both run it. It exists because a shape test is not enough: `2.3.1` is a real heading
and still the wrong one for break-even.

**Know what that guard does and does not do.** It proves the citation EXISTS — a real section, in
your unit, that uses your phrase. It cannot prove the filing is RIGHT. Measured, not assumed: the tax
and subsidy drills also pass under `1.3.3 Supply`, which lists both instruments as supply shifters,
and `subsidy` passes under `1.3.6` as well. Choosing the section is yours to get right, and the
reason each spec's header carries a WHY-THIS-SECTION note.

**Frame the prompt for the diagram you are actually drawing.** The tax and subsidy drills shade a
welfare loss in a plain competitive market, so the good is a plain one. A tax on a *demerit* good,
or a subsidy on a *merit* good, moves output toward the social optimum: the triangle would not be a
loss, and the diagram needs a SOCIAL curve beside the private one. Both specs said
"demerit"/"merit" until 13.7, and the prompt and the mark scheme disagreed with each other.

Name the social pair carefully. Merit and demerit goods are a CONSUMPTION case, so the pair is MSB
against MPB; MSC against MPC is the PRODUCTION case. `econ_spec.txt:740-750` distinguishes external
benefits and costs of production from those of consumption, and asks for diagrams of the external
benefits **from consumption** and the external costs **from production** — which is why the shipped
externality drill (`negative-externality`, 1.3.5) is a producer polluting and not a demerit good.
One nuance already settled in the ledger, so do not re-litigate it: mark schemes for demerit-good
questions do routinely accept an MSC-above-MPC diagram, and telling a student they will be
penalised for it is wrong.

## The four marks

| | Applies when | Checks |
|---|---|---|
| M1 | the drill has a shift | exactly one curve moved, and it is the expected one |
| M2 | the drill has a shift | it moved the expected way |
| M3 | always | the point click is within tolerance of the point on the student's OWN curves |
| M4 | `expect.regions` is set | the shaded set equals the expected set |

M3 and M4 are judged against the student's own diagram, not the model answer: shift supply by
$20 instead of $30 and the point mark is still winnable, because reading your own diagram is the
skill. M3 fails when M2 failed — reading an intersection correctly off a curve that moved the wrong
way is not the mark. `marksFor(spec)` is the count the drill shows; the guard checks it equals the
count the scheme awards.

## Regions are computed, never authored

A family returns named polygons derived from the student's curves. Rules the guard enforces on every
spec at every shift of every movable curve:

- **Disjoint.** No point belongs to two regions, or two regions answer to one click and the
  mark becomes a coin toss.
- **Covering.** The regions' union is exactly the area the family says it partitions (`WHOLE` in
  regions.mjs, written separately from the recipes — the original total surplus, the subsidy's cost,
  the band between MSC and MPC, the consumer surplus a tariff takes), and their areas sum to it. A
  region that leaks past a curve fails, and so does a sliver left unnamed.
- **Direction.** A family builds only when ITS curve — alone — moved ITS way. Fed a backwards shift
  it returns nothing rather than inverted polygons, and the drill says to fix the direction first
  (the guard found that case at a −55 shift on the tax spec). Until 13.7 a family checked only the
  sign of whichever curve moved first, so moving DEMAND on the tax drill built tax regions on an
  unmoved supply curve — two burden rectangles on top of each other, and a loss triangle with no
  area that still earned M4. It builds nothing now.

What each family's regions are, and what students confuse them with:

| Family | Region keys | Expected | The named wrong answers |
|---|---|---|---|
| `taxWelfare` | `cs` `cb` `pb` `ps` `dwl` | `dwl` | `cb+pb` is the tax revenue |
| `subsidyWelfare` | `cg` `pg` `dwl` | `dwl` | `cg+pg` is most of the subsidy's cost |
| `maxPrice` | `cs` `transfer` `ps` `dwl` | `dwl` | `transfer` changes hands, it is not lost |
| `minWage` | `fs` `transfer` `ws` `dwl` | `dwl` | `transfer` from employers to workers who keep jobs |
| `negativeExternality` | `ext` `pvt` `dwl` | `dwl` | `pvt` is the TAX-shaped triangle below the loss; `ext` is the external cost of the optimal output; `dwl+pvt+ext` is total external cost, not welfare loss |
| `tariff` | `pg` `dwlP` `rev` `dwlC` | `dwlC` + `dwlP` | `rev` is tariff revenue, `pg` the producers' gain |
| `breakEven` | `loss` `profit` | either, by the question | the other side of break-even |
| `monopoly` | `cs` `profit` `dwl` | `dwl` | `profit` is surplus transferred to the monopolist |

### Writing a new family

In regions.mjs: a recipe `(base, own, before, after, spec) → { key: { name, points } }` (return null
for a diagram that no longer makes sense, such as a prohibitive tariff), a `WHOLE` entry computing the
area it partitions independently of the recipe, and a declaration in `FAMILIES` — `curves`, `moves`,
`direction`, `point`, `origin`. Then add a fixture to fixtures.mjs and run the guard: it will tell you
about every overlap, gap, leak and backwards shift before a student meets one.

## Feedback

Keys are wrong branches. Every one you leave out falls back to a generic line, and the guard fails a
registered spec missing any M1/M2 key (when it has a shift), `equilibriumAtOldQuantity`, or — when it
has an area — `rightRegion` and a `regions` map. `noPoint` and `equilibriumWrong` are not enforced
(the two 13.5 specs predate them), but write them: the generic "the two curves" is wrong on a
three-line diagram.

| Key | When |
|---|---|
| `rightCurve`, `wrongCurve`, `bothMoved`, `nothingMoved` | M1 |
| `rightDirection`, `wrongDirection` | M2 |
| `noPoint` | M3, nothing marked |
| `equilibriumAtOldQuantity` | M3, a click at the original quantity |
| `equilibriumWrong` | M3, anywhere else wrong |
| `rightRegion` | M4 correct |
| `regions['cb+pb']` | M4, that exact wrong shading (keys sorted, joined with `+`) |

`distractors` name specific wrong POINTS, checked before the generic ones: `{ cross, readOn?, from?,
feedback }`, where `from: 'base'` reads the point off the original curves (the market equilibrium in
the externality drill) and the default reads it off the student's own (the quantity demanded under a
price ceiling). Write the specific ones: the difference between "not the right area" and "that is the
tax revenue rectangle — a transfer, not a loss" is the whole value of the drill.

## Checking a spec

```
node audit/scripts/diagram-check.mjs                                   everything
node audit/scripts/diagram-check.mjs --module lib/diagram/specs/x.mjs  a spec not registered yet
node audit/scripts/diagram-check.mjs --module a.mjs --only a-id        just that one
```

`--module` lets an author prove a spec before touching the shared registry. The guard's eight checks
are listed at the top of the script; `npm test` runs the whole guard through
`lib/diagram-specs.test.mjs`, so the protocol gate sees it. The admin harness at
`/admin/diagram-drills` shows every registered spec and every shape fixture.

## Terminology

**Welfare loss**, never "deadweight loss". Packet 13 strips the latter as off-spec.
