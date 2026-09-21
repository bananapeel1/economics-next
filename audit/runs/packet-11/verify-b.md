# Packet 11 — Verify B (main session, Browser pane, 375x812)

Run in the main session because the walkthrough needs the Browser pane. **375, not 390**: 390 is the
best case and the "12px floor" this sheet was built on is a 390 figure that has been quoted unbounded
by packets 37, 38 and 40. Every modal reading below was taken only after a poll confirmed the
backdrop carries `lm-diagram-modal-visible`, the sheet's transform is `matrix(1, 0, 0, 1, 0, 0)`, and
`getComputedStyle(svg).width` agrees with `getBoundingClientRect().width` to within 0.5px.

**That guard fired three times during this run and every time it was right.** Readings of 618 for a
672px sheet, 614 for 667 and 460 for 500 — all exactly 0.92x, the modal's resting
`transform: scale(0.92)`. Published untested they would have shown the 12px floor missed by ~1px on
every diagram. This is the same artefact packet 38 published as a real 69px discrepancy.

**AND THE MECHANISM IS NOT "READ TOO EARLY". IT IS A HIDDEN TAB.** `DiagramEnlarge` applies
`lm-diagram-modal-visible` from inside `requestAnimationFrame`, and **rAF does not fire in a
backgrounded tab** — measured here: `document.visibilityState: "hidden"`, and a probe rAF still had
not fired after a full second. So the class is never added, the sheet sits at 0.92 indefinitely, and
**waiting longer never fixes it**: a 10-second poll failed exactly as a 400ms one did. Every previous
write-up of this artefact, including the first draft of this one, blamed settle time and prescribed a
longer wait. That prescription does not work, which is presumably why the artefact keeps coming back.

Two consequences for anyone measuring this sheet:
- **Front the Browser pane before reading, and assert `document.visibilityState === 'visible'`
  alongside the other guards.** If you cannot front it, do not use `getBoundingClientRect`.
- **Layout metrics are transform-free and always usable**: `getComputedStyle(svg).width`,
  `pane.scrollWidth`, `pane.clientWidth` and the `--lm-enlarge-w` custom property all read correctly
  in a hidden tab. The post-commit check below was taken that way.

It is not a product defect — a student looking at the sheet has a visible tab, and on returning to a
backgrounded one the rAF fires and the sheet appears normally. It is purely a measurement trap.

**Post-commit check, from the committed tree, layout-only:** `--lm-enlarge-w: 500px`, computed width
500px, `vbW` 500, smallest face 12u → **smallest label exactly 12.000px**, pane 375/524. The `rect`
said 460 at the same moment. The two disagreeing by exactly 0.92 is the whole point of recording both.

## Before (HEAD, same machine, same viewport)

| | |
|---|---|
| Learn Mode inline SVG | **298px** wide; labels **7.15–8.94px** against 16px body copy (best-case diagram in the corpus, 500u/12u) |
| Diagrams tab | **291px**; labels **6.98–8.73px**; **0 clickable wrappers, 0 enlarge hints, `cursor: auto`** — no way to enlarge at all |
| Enlarge sheet | fixed 825px in a 369px pane → **43.5% visible, 480px hidden**; `visualViewport.scale` pinned at 1 so pinch cannot zoom out; only control is Close |
| On `Supply Curve: Movements and Shifts` | both shifted curves, point B, and the x-axis title off-screen — the comparison the diagram exists to make was unreachable |

## After

**Diagrams tab now has the sheet** — 3/3 cards `lm-diagram-clickable`, `cursor: zoom-in`, plus a real
44px `<button>Enlarge diagram</button>` (a tab stop, which Learn Mode's bare `<div onClick>` is not).

Three stops on `supply` step 4, guards passing on every reading:

| stop | width | smallest label | visible | hint |
|---|---|---|---|---|
| Fit | 351px | 8.42px | **100%, fits both axes** | "The whole diagram is on screen" |
| Read (default) | 500px | **12.00px** | 71.6% (was 43.5%) | "Drag sideways to see the rest — or tap Fit" |
| Closer | 800px | 19.2px | 44.8% | "Drag sideways…" |

`price-determination?draft=1`, all six diagrams, two frame widths (500u and 560u), each opened,
measured and Fit-checked — **ALL_PASS: true**: 12px floor met on every one (12.000 / 12.006), Fit fits
on every one, hidden width down from 474px to 316–321px. The old fixed 825px is now the *Closer* stop
rather than the only stop.

Learn Mode through the same shared component: 672px, 12.00px, zoom bar present, Fit fits.

Desktop 1280x900 not regressed: sheet 1000x679 inside the viewport, diagram 968px, labels 17.29px,
no scroll, zoom bar present (the hint stays phone-only, as before).

## Screenshot

`Supply Curve: Movements and Shifts` at Fit shows the whole drawing — both points, the movement
arrow, both axis titles and every tick label — where the same sheet at HEAD showed the y-axis, P1,
P2 and point A, and nothing else.

## Not fixed, deliberately

The **inline** diagram is still 298px with 7–9px labels, and this packet does not change it. A phone
cannot show a 500-unit drawing with 10-unit labels legibly at any inline width — 298→351px (the 20%
of the screen that is card padding) takes the best case from 7.15px to 8.4px, still unreadable, so it
is churn rather than progress. A font floor is not available either: F088 tried two and both were a
relayout. The inline diagram's job is the shape plus a route to the sheet, and both surfaces now have
that route.
