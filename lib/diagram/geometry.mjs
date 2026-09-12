/**
 * Geometry for drawing drills. Pure functions over straight lines in economic units
 * (quantity on x, price on y). Nothing here knows about pixels, SVG or React.
 *
 * A curve is `{ intercept, slope }`, so a shift is a change of intercept and nothing else.
 * That is the whole trick: a student dragging a curve anywhere on the canvas produces one
 * number, and every mark in the scheme is a comparison against that number.
 */

export const line = (intercept, slope) => ({ intercept, slope });

/** Price on a curve at a given quantity. */
export const priceAt = (curve, q) => curve.intercept + curve.slope * q;

/** Quantity at which a curve reaches a given price. */
export const quantityAt = (curve, p) => (p - curve.intercept) / curve.slope;

/** A curve shifted by `d` — positive is up (and, for an upward-sloping curve, left). */
export const shift = (curve, d) => ({ intercept: curve.intercept + d, slope: curve.slope });

/**
 * Where two curves cross. Returns null for parallel lines rather than Infinity, so callers
 * can decide what to do instead of rendering a point off the canvas.
 */
export function intersect(a, b) {
  if (a.slope === b.slope) return null;
  const q = (b.intercept - a.intercept) / (a.slope - b.slope);
  return { q, p: priceAt(a, q) };
}

/**
 * Translating a curve by (Δq, Δp) on screen changes its intercept by Δp − slope·Δq.
 * Dragging up and dragging left are therefore the same gesture on a supply curve, which is
 * exactly how a student thinks about it.
 */
export const interceptDelta = (curve, dq, dp) => dp - curve.slope * dq;

/** Signed area, so a polygon's vertex order cannot flip the result. */
export function area(points) {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum) / 2;
}

/** Ray casting. Used by the guard to prove named regions do not overlap. */
export function contains(points, x, y) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i];
    const [xj, yj] = points[j];
    const crosses = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
}

export const near = (a, b, tolerance) =>
  a != null && b != null && Math.abs(a.q - b.q) <= tolerance.q + 1e-9 && Math.abs(a.p - b.p) <= tolerance.p + 1e-9;
