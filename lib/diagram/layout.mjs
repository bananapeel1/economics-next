/**
 * Label placement. Pure: it takes boxes that have already been measured and returns an
 * offset for each, so it can be exercised without a DOM and the browser supplies real text
 * metrics at runtime.
 *
 * Two rules make a moved label honest:
 *
 *   1. A label slides only ALONG ITS OWN GUIDE LINE. A price label slides right along its
 *      horizontal guide; a quantity label slides up its vertical one. Wherever it ends up it
 *      still points at the value it names, so moving it cannot make it lie.
 *   2. A label with nowhere left to go is dropped if it is optional, and otherwise placed at
 *      its last candidate. Two labels on top of each other is never the better outcome.
 *
 * Estimating text widths instead of measuring them does not work: the first version of this
 * was out by 50% on a monospaced face and still produced overlaps.
 */

const pad = (box, dx, dy, m = 3) => ({
  x: box.x + dx - m,
  y: box.y + dy - m + 1,
  w: box.width + m * 2,
  h: box.height + m * 2 - 2,
});

const clashes = (a, b) => !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);

/** Candidate offsets for one label, derived from its own measured size. */
export function candidates(label) {
  const box = label.box;
  const slide = label.slide || {};
  const out = [[0, 0]];

  if (slide.axis === 'x') {
    const step = box.width + 8;
    const limit = slide.limit ?? Infinity;
    for (let d = step; box.x + d + box.width <= limit; d += step) out.push([d, 0]);
    out.push([0, -(box.height + 4)], [0, box.height + 4]);
  } else if (slide.axis === 'y') {
    const step = box.height + 4;
    for (let i = 1; i <= (slide.rows || 3); i++) {
      out.push([0, -i * step]);
      if (slide.both) out.push([0, i * step]);
    }
    if (slide.alsoX) {
      out.push([-(box.width + 8), 0], [box.width + 8, 0]);
      // then the diagonals, for a corner where two lines end side by side (13.7: a tariff's world
      // price line lowered onto the end of demand left both labels nowhere to go)
      for (let i = 1; i <= (slide.rows || 3); i++) {
        for (const dx of [-(box.width + 8), box.width + 8]) out.push([dx, -i * step], [dx, i * step]);
      }
    }
    // A quantity label sits just right of its vertical guide. Near the right edge there is no room
    // there at any height, so it may cross to the LEFT of the same guide — still naming the same
    // line, so rule 1 holds. Appended last: a label that fitted before still lands where it did.
    if (slide.flip) {
      for (let i = 0; i <= (slide.rows || 3); i++) out.push([-(box.width + 12), -i * step]);
    }
  }

  return out;
}

/** Does the segment [x1,y1]→[x2,y2] pass through the box? Liang–Barsky clipping. */
export function crosses([x1, y1, x2, y2], b) {
  let t0 = 0;
  let t1 = 1;
  const dx = x2 - x1;
  const dy = y2 - y1;
  for (const [p, q] of [[-dx, x1 - b.x], [dx, b.x + b.w - x1], [-dy, y1 - b.y], [dy, b.y + b.h - y1]]) {
    if (p === 0) { if (q < 0) return false; continue; }
    const t = q / p;
    if (p < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
  }
  return t0 <= t1;
}

/**
 * @param {Array} labels    [{ id, box: {x,y,width,height}, slide, optional }] in priority order —
 *                          stable labels first, so the ones that move are the ones that just changed
 * @param {object} options  { bounds: {width, height}, fixed: [box], lines: [[x1,y1,x2,y2] | {seg, owners}] }
 * @returns {Array} [{ id, dx, dy, hidden }]
 *
 * `lines` are the drawn curves (13.7). A label would rather not sit ON a line — it stays legible
 * through its halo, but it reads as belonging to the wrong curve — so the first pass takes the
 * first candidate that is clear of labels, ticks AND lines. Three-line diagrams (a price ceiling,
 * MSC over MPC, monopoly) left no line-free spot for some labels, so when there is none the second
 * pass drops the line rule and keeps the one that matters: no two labels on each other.
 */
export function placeLabels(labels, { bounds, fixed = [], lines = [] } = {}) {
  const taken = fixed.map((b) => pad(b, 0, 0));
  const inside = (b) =>
    !bounds || (b.x > 1 && b.y > 1 && b.x + b.w < bounds.width - 1 && b.y + b.h < bounds.height - 1);
  // A line may name its owners — a point's dashed guides belong to that point's own P and Q labels,
  // which sit against them by design. Any OTHER label on a guide reads as struck through: packet
  // 13.7's walk at 390px found "P₁ 70" crossed out by the P₂ guide on the indirect-tax drill.
  const onLine = (b, id) => lines.some((l) => (Array.isArray(l)
    ? crosses(l, b)
    : !(l.owners || []).includes(id) && crosses(l.seg, b)));

  return labels.map((label) => {
    const options = candidates(label);
    let chosen = null;

    for (const avoidLines of lines.length ? [true, false] : [false]) {
      for (const [dx, dy] of options) {
        const box = pad(label.box, dx, dy);
        if (inside(box) && !taken.some((t) => clashes(t, box)) && !(avoidLines && onLine(box, label.id))) {
          chosen = { dx, dy, box };
          break;
        }
      }
      if (chosen) break;
    }

    if (!chosen) {
      if (label.optional) return { id: label.id, dx: 0, dy: 0, hidden: true };
      const [dx, dy] = options[options.length - 1];
      chosen = { dx, dy, box: pad(label.box, dx, dy) };
    }

    taken.push(chosen.box);
    return { id: label.id, dx: chosen.dx, dy: chosen.dy, hidden: false };
  });
}

/**
 * Used by the guard: do any two placed labels overlap — or, given `fixed`, does a placed label sit
 * on a tick or an axis title? A label the solver could not place anywhere free is put at its last
 * candidate, so the second question is not implied by the first.
 *
 * (Until 13.7 the pair ids came from indexing `placements` with positions in the FILTERED list,
 * so once any label was hidden the names in a failure message could be the wrong two.)
 */
export function overlaps(labels, placements, fixed = []) {
  const shown = placements.filter((p) => !p.hidden);
  const boxes = shown.map((p) => pad(labels.find((l) => l.id === p.id).box, p.dx, p.dy));
  const bad = [];
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      if (clashes(boxes[i], boxes[j])) bad.push([shown[i].id, shown[j].id]);
    }
  }
  const walls = fixed.map((b) => pad(b, 0, 0));
  for (let i = 0; i < boxes.length; i++) {
    const w = walls.findIndex((f) => clashes(boxes[i], f));
    if (w >= 0) bad.push([shown[i].id, `fixed#${w}`]);
  }
  return bad;
}
