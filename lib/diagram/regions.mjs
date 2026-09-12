/**
 * Named welfare regions, derived from the student's own curves.
 *
 * Regions are computed, never authored as coordinates. A student who shifts supply by $20
 * instead of $30 gets regions built from THEIR diagram, so "shade the welfare loss" is
 * marked against the diagram they actually drew — the same own-figure rule the quantitative
 * drills apply to arithmetic.
 *
 * Every family must partition the surplus area exactly: no overlaps, and the union equal to
 * the total surplus. `npm run diagram-check` asserts both on every spec at every plausible
 * shift, because an overlap means two regions answer to the same click and the mark becomes
 * a coin toss.
 */
import { intersect, priceAt } from './geometry.mjs';

/**
 * Indirect tax on a good with no externality. Supply shifts up by the tax; the wedge between
 * what consumers pay and what producers keep is the tax, and the triangle beyond the new
 * quantity is output that was worth more than it cost and is no longer traded.
 */
function taxWelfare({ D, S }, shifted, before, after) {
  const q2 = Math.max(0, after.q);
  const p2 = after.p;
  const producerKeeps = priceAt(S, q2); // what producers receive, net of the tax

  return {
    cs: { name: 'Consumer surplus', points: [[0, D.intercept], [0, p2], [q2, p2]] },
    cb: { name: 'Consumer tax burden', points: [[0, before.p], [0, p2], [q2, p2], [q2, before.p]] },
    pb: { name: 'Producer tax burden', points: [[0, producerKeeps], [0, before.p], [q2, before.p], [q2, producerKeeps]] },
    ps: { name: 'Producer surplus', points: [[0, S.intercept], [0, producerKeeps], [q2, producerKeeps]] },
    dwl: { name: 'Welfare loss', points: [[q2, p2], [q2, producerKeeps], [before.q, before.p]] },
  };
}

/**
 * A subsidy. Supply shifts down, quantity rises, and what the taxpayer spends splits three
 * ways: some reaches consumers as a lower price, some reaches producers as a higher one, and
 * the rest is the triangle beyond the original quantity — journeys made only because they
 * were subsidised, costing more to provide than they are worth.
 *
 * These three regions partition the subsidy cost rectangle exactly. The consumer/producer
 * boundary runs along D and S respectively, which is why each is a quadrilateral rather than
 * the rectangle it looks like. An earlier version listed consumer and producer surplus here
 * too; they overlap the cost rectangle, two regions answered to one click, and the mark
 * became a coin toss. `npm run diagram-check` now refuses that.
 */
function subsidyWelfare({ D, S }, shifted, before, after) {
  const q2 = Math.max(0, after.q);
  const consumerPays = after.p;
  const producerKeeps = priceAt(S, q2);

  return {
    cg: {
      name: 'Consumer gain',
      points: [[0, consumerPays], [0, before.p], [before.q, before.p], [q2, consumerPays]],
    },
    pg: {
      name: 'Producer gain',
      points: [[0, before.p], [0, producerKeeps], [q2, producerKeeps], [before.q, before.p]],
    },
    dwl: {
      name: 'Welfare loss',
      points: [[before.q, before.p], [q2, producerKeeps], [q2, consumerPays]],
    },
  };
}

/**
 * Each family assumes a shift direction. A tax family fed a downward shift produces regions
 * that invert and overlap — the rectangles cross over — and the guard found exactly that at
 * a -55 shift. Rather than make every family robust to a diagram that is economically
 * backwards, regions are simply not built when the shift is the wrong way: the student has
 * already lost the direction mark, and shading a welfare loss on an inverted diagram is not
 * a question worth asking. The drill says fix the direction first.
 */
const FAMILIES = {
  taxWelfare: { build: taxWelfare, direction: 1 },
  subsidyWelfare: { build: subsidyWelfare, direction: -1 },
};

/**
 * @param {string} family   key into FAMILIES, from the spec
 * @param {object} curves   the spec's base curves
 * @param {object} shifted  the student's curves after their shift
 */
export function buildRegions(family, curves, shifted) {
  const entry = FAMILIES[family];
  if (!entry) throw new Error(`unknown region family: ${family}`);

  const before = intersect(curves.D, curves.S);
  const after = intersect(shifted.D, shifted.S);
  if (!before || !after) return null;

  // The family's own direction: whichever curve moved must have moved the way it assumes.
  const moved = Object.keys(curves).find((n) => Math.abs(shifted[n].intercept - curves[n].intercept) >= 5);
  if (!moved) return null;
  const delta = shifted[moved].intercept - curves[moved].intercept;
  if (Math.sign(delta) !== entry.direction) return null;

  return entry.build(curves, shifted, before, after);
}

export const familyNames = () => Object.keys(FAMILIES);
