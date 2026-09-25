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
    if (slide.alsoX) out.push([-(box.width + 8), 0], [box.width + 8, 0]);
  }

  return out;
}

/**
 * @param {Array} labels    [{ id, box: {x,y,width,height}, slide, optional }] in priority order —
 *                          stable labels first, so the ones that move are the ones that just changed
 * @param {object} options  { bounds: {width, height}, fixed: [box] }
 * @returns {Array} [{ id, dx, dy, hidden }]
 */
export function placeLabels(labels, { bounds, fixed = [] } = {}) {
  const taken = fixed.map((b) => pad(b, 0, 0));
  const inside = (b) =>
    !bounds || (b.x > 1 && b.y > 1 && b.x + b.w < bounds.width - 1 && b.y + b.h < bounds.height - 1);

  return labels.map((label) => {
    const options = candidates(label);
    let chosen = null;

    for (const [dx, dy] of options) {
      const box = pad(label.box, dx, dy);
      if (inside(box) && !taken.some((t) => clashes(t, box))) {
        chosen = { dx, dy, box };
        break;
      }
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

/** Used by the guard: do any two placed labels overlap? */
export function overlaps(labels, placements) {
  const boxes = placements
    .filter((p) => !p.hidden)
    .map((p) => pad(labels.find((l) => l.id === p.id).box, p.dx, p.dy));
  const bad = [];
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      if (clashes(boxes[i], boxes[j])) bad.push([placements[i].id, placements[j].id]);
    }
  }
  return bad;
}
