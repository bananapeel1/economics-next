# Packet 12.75 — contrast of every text/background pair the practice shell introduces (E049)

## Method, and what it is not

Measured in the Browser pane (Chromium) on the dev server, `/economics/market-failure-model-answers`,
at **390x844** and **1440x900**, dark with the `rl-night` pin (the shipped state). For every visible element
inside `.ps` that owns a text node: `getComputedStyle(el).color`, multiplied by the product of every
ancestor's `opacity`, over the background obtained by alpha-compositing each ancestor's computed
`background-color` up to the first opaque one. WCAG relative-luminance ratio. Animations and transitions
were disabled by an injected style for the measurement: the Browser pane is a hidden tab where CSS
animations do not advance, and a first pass read notes and the toast frozen at opacity 0 (ratio 1.0).

This is the cascade's RESOLVED colour on the rendered DOM, not a screenshot sampled pixel by pixel, and
not `npm run contrast` (which reads app/globals.css only). Anti-aliasing is not modelled.

States walked, per width: Extract A Q2 writing with a draft (extract tab and answer tab at 390); marking
with a criterion ticked and an earned note open; a missed note open; a model-answer figure linked to
the extract with the focus row lit; Model answers mode with a note open; Standalone Q2 (Examine 8) in
Model answers mode with the segRole 'missed' criterion's note open.

## Result

| width | distinct pairs | below 4.5:1 | lowest |
|---|---|---|---|
| 1440x900 | 89 | 0 | 4.82 `.ps-fig.is-linked` #6fa8ff on #233b4c (12.5px, table cell) |
| 390x844 | 74 | 0 | 4.82 `.ps-fig.is-linked` #6fa8ff on #233b4c (12px, table cell) |

Two defects the measurement found and the CSS now fixes (re-measured after the fix, figures above):
- `.ps-where` and `.ps-mk` on a ticked criterion: `--text-tertiary` over the green `--green-light-10`
  tint measured **4.21:1**. Now `--text-secondary` there: 7.28:1.
- `.ps-crumb-sep` ("/") used a border token: **1.53:1**. Now `--text-tertiary`: 4.90:1.

And one mapping departure from the spec's table, decided by measurement before writing the CSS: muted text
uses `--text-tertiary`, never `--text-muted`. Under the pin `--text-muted` is `--ns-ink4` #6b6882: 3.13:1 on
`--bg-card`, 3.24:1 on `--bg-input`, 3.58:1 on `--bg-primary`.

## The floor pairs (every pair under 6:1), 1440x900

| ratio | element | fg / bg |
|---|---|---|
| 4.82 | linked figure, table cell | #6fa8ff / #233b4c |
| 4.90 | muted text on card: crumbs, card meta/state/label, chips, pane labels, A−/A+, hints, saved, word count, links, facts, timer, keys, score "/ n", band headings, "Show in the model answer", marks, sub-heads, paragraph labels and AO codes | #8b88a3 / #1a1d2b |
| 5.07 | mode and set switches (unselected), missed note tag, table head | #8b88a3 / #171a26 |
| 5.60 | card meta/state on an unselected card | #8b88a3 / #0e0f16 |
| 5.64 | linked figure in prose | #6fa8ff / #242e44 |

Everything else is 6.6:1 or above: primary button #1a1d2b on #10b981 6.60; earned note tag 6.83; text on
the ticked-criterion tint 7.28 / 11.77; body and model-answer text 8.47–8.77; examiner label #f5b544 9.23;
stem 9.67; headings, draft, strong text 13.69–15.64; toast #0e0f16 on #e9e7f2 15.64.

## Not measured, or exempt

- `::placeholder` in the answer box (a pseudo-element the DOM walk cannot see): its declared pair is
  `--text-tertiary` on `--bg-input` = #8b88a3 / #171a26, which is the 5.07 pair above by computation, not
  by measurement.
- The disabled Previous button (opacity .45) on question 1: inactive controls are exempt from WCAG 1.4.3,
  and it was enabled (question 2) in every measured state.
- Light, pin removed (checked once, not shipped): Extract A Q2 marking at 1440x900, 70 pairs, 0 below 4.5.
  One state only. `SiteHeader` stays dark there because theme-night.css styles it with literals.

## Fix round 1 — the stacked Table 1 (new pairs), 26 Sep

Probe: `fix1/table-contrast.js` (computed colour composited over the alpha-stacked ancestor backgrounds, colours
resolved to sRGB through a canvas). Measured at 390x844 only, Extract tab open, Extract A Q1.
- First reading, dark pinned, marked (focus row): the column label `.ps-tlabel` (`--ps-muted`) on the focus fill
  (`--ps-accent-soft`) was **4.19:1**. Fixed: `.ps-table tr.is-focus .ps-tlabel { color: var(--ps-text-2) }`.
- After the fix: dark pinned, writing — 0 below 4.5, min 4.90; dark pinned, marked with focus row — 0 below 4.5,
  min 4.90; light unpinned, both states — 0 below 4.5, min 6.68.
Not measured: the stacked table at 1440 (it does not stack there; the wrapper is 616px).
