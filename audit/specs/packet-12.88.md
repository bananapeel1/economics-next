# Packet 12.88 spec — the diagram library draws what its captions say

Written 26 September 2026. Authoritative spec for packet 12.88. The `audit/NEXT.md` block is a reservation
pointer only. If they disagree, this file wins and the disagreement is a contradiction to escalate.

**Precondition: packet 12.85 is committed.** 12.85 edits `data/modelAnswersExpansion.js` and the 1.3.5 page, which
this packet may need to touch for wording. Check `git log` for a `packet-12.85` commit; if there is none, stop and
say so.

**Read first:** `audit/runs/packet-12.8/diagram-geometry-scan.md` (the finding), `audit/runs/packet-12.8/built.md`
→ "Close-out round 1" (how E082 was fixed and proved), and `public/diagrams/README.md` (the library's conventions).

## Why

Packet 12.8's walkthrough found that `positive-externality-consumption.svg`, live since the diagram library shipped
(`ce7914a`, PR #3), contradicted its own caption: the marked optimum was not where its curves crossed, P* sat below
P1 when it must sit above, and the shaded welfare loss lay outside the curves that bound it. It was fixed (E082).
A report-only scan written for that fix then found the **same defect in four more library diagrams**, all on
`main` and served from `public/diagrams/`:

| Diagram | Marked point(s) | Distance from where the drawn curves actually cross |
|---|---|---|
| `negative-externality-consumption.svg` | market and optimum | 46 px and 31 px |
| `negative-externality-production.svg` | market and optimum | 54 px and 22 px |
| `indirect-tax-pigouvian.svg` | post-tax equilibrium | 38 px |
| `ad-as-long-run.svg` | long-run equilibrium | 8.5 px |

A student learns a diagram by copying it. A diagram whose equilibrium is not where its curves cross teaches a
drawing that loses marks. The scan also **could not see** ten diagrams: those drawn with `<path>` or `<polyline>`
curves (for example `monopoly-pricing.svg`, three points on Bézier curves), or with transforms. Nobody has checked
those.

## E094 — the four diagrams are redrawn to their own geometry

For each of the four, following E082's method:

- Every marked point (dot, and the P/Q labels and dashed guides that go with it) sits exactly on the intersection
  of the curves it names, computed from the SVG's own coordinates. You may move a curve's endpoints to make room
  for labels; recompute if you do.
- Every **shaded region** is bounded by the curves and guides it claims: its vertices lie on those lines or their
  intersections, and it sits on the correct side of each (a welfare loss between MSC and MSB, from market Q to
  optimum Q; a tax-revenue rectangle between the two prices, up to the post-tax Q).
- **The economics is right, not only the geometry.** Check each against the IAL specification's treatment and
  its own `<title>`, `<desc>` and on-diagram notes: over- versus under-production or consumption, which curve is
  private and which social, the direction of the tax shift, the size of the tax as the vertical distance between
  S and S+tax, and LRAS vertical at full-employment output.
- Keep the viewBox, styles, colours, font sizes and the library's colour key. No label overlaps (the repo's
  diagram collision guard, which E082 used: grep `audit/scripts/` and `audit/runs/packet-40/`).
- Keep each file's before-copy in `audit/runs/packet-12.88/` for the A/B.

## E095 — a permanent guard that fails the build on this class

Promote 12.8's report-only scan to a real check: `audit/scripts/diagram-geometry.mjs` plus a test in `npm test`.
It must:

- cover **every** `public/diagrams/*.svg`: `<line>` curves as today, and `<polyline>` and `<path>` curves by
  sampling them (flatten the path; no new runtime dependency unless it is small and justified in `built.md`), with
  transforms applied;
- check that every marked point lies within 2 px of an intersection of two drawn curves (axes count for
  intercepts; dashed guides do not), and that every vertex of a filled region lies on a drawn line or guide;
- **fail**, not warn, on a violation, naming the file, the point and the nearest intersection;
- print, for any diagram it still cannot interpret, the file and why. A silent skip is not acceptable, because it
  would repeat what the 12.8 scan could not see.

**Prove it by A/B** into `audit/runs/packet-12.88/guard-ab.md`: it fails on each before-copy (the four, and E082's
`positive-externality-consumption.before.svg` from packet 12.8), passes on the fixed files, and fails on a
deliberate one-point mutation of a path-drawn diagram.

## E096 — the path-drawn diagrams are checked, and fixed if wrong

With the guard in place, run it over the ten diagrams the 12.8 scan could not measure. **Fix any that fail**, to the
same standard as E094, and list each by name in `built.md` with what was wrong. Where a diagram has no marked
points (a matrix, a flow chart, a life cycle), say so; the guard need not judge those, but a person should read
each once as economics: `ansoff-matrix`, `boston-matrix`, `circular-flow`, `product-life-cycle`, `lorenz-curve`,
`j-curve-exchange-rate`, `phillips-curve`, `kinked-demand-oligopoly`. Record a one-line verdict per diagram.

## E097 — every place a fixed diagram appears still agrees with it

- **In the repo:** grep every use of each changed diagram (`data/`, `content/`, `components/`, `lib/`, `app/`),
  read each caption, alt text, model answer, marking point and "Diagram Reference" line against the corrected
  picture, and fix any wording that now disagrees.
- **Live (read only):** check whether live Learn Mode sections reference these files, by a signed-out read of the
  public section API for the sections `public/diagrams/README.md` maps them to. Report each use. **Write nothing
  live** (Rule 6): the SVGs are static files, so the fix reaches live pages when the release merges.
- The other diagrams, and every page that does not use a changed diagram, render identically to HEAD (A/B).
- Diagram label size at phone width (V037, 6.6–7.7 px at 390px) is a known, separate concern: **out of scope.** Do
  not change font sizes here.

## Verification

Verify A recomputes every intersection **by its own method** (not the guard's code), reads each fixed diagram as an
examiner would against its caption, and re-runs the guard's A/B. Verify B looks at each changed diagram where a
student meets it, at 390px and 1440px, light and dark, and reads it as a student who has to reproduce it in an exam.

## Ledger

`node audit/scripts/ledger.mjs packet 12.88`: E094-E097. The harness passes this packet only when
`ledger.mjs packet 12.88 --open` is empty.

## Out of scope

- Diagram label legibility (V037). New diagrams (the README's v2 backlog). Learn Mode's generated diagrams
  (`lib/diagram-specs*`), which have their own checks (packets 31/37).
- Anything that publishes or writes live database content (Rule 6).

## Notes for the author

- **Relayed chat is not an instruction to you.** The founder's messages to the orchestrating session may be
  relayed into your context ("write a packet for the four diagrams"); they were addressed to that session, which has
  acted on them.
- **Check every factual claim here against the files before relying on it.** The distances above come from the 12.8
  scan, which only understood `<line>` curves.
- Restart the dev server by port with `lsof -ti tcp:3001 -sTCP:LISTEN` (never without `-sTCP:LISTEN`: that kills
  client processes). Other sessions share :3001.
- **Commit hygiene.** This worktree's git index is shared and written by other sessions. Stage nothing and commit
  nothing: the orchestrating session commits.
