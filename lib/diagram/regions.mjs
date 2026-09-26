/**
 * Named welfare regions, derived from the student's own curves.
 *
 * Regions are computed, never authored as coordinates. A student who shifts supply by $20
 * instead of $30 gets regions built from THEIR diagram, so "shade the welfare loss" is
 * marked against the diagram they actually drew — the same own-figure rule the quantitative
 * drills apply to arithmetic.
 *
 * Every family must partition an area exactly: no overlaps, and the union equal to the sum of
 * the parts. `npm run diagram-check` asserts both on every spec at every plausible shift of every
 * movable curve, because an overlap means two regions answer to the same click and the mark
 * becomes a coin toss.
 *
 * A family is a recipe plus the geometry it assumes, declared beside it:
 *
 *   curves     the curve names the recipe reads. A spec using the family must name its curves so.
 *   moves      the one curve the student shifts, or null when nothing moves (monopoly).
 *   direction  +1 the family assumes that curve moves up, -1 down, 0 nothing moves.
 *   point      the point the student marks, as `readPoint` reads it (lib/diagram/geometry.mjs).
 *   origin     the ORIGINAL position, shown as P₁/Q₁ — often a different pair of curves.
 *
 * A spec may omit `point` and `origin`; they come from its family. If it states them they must
 * equal the family's, and the guard says so, because a family that computes its triangle from
 * one point while the drill marks another has two answers to the same question.
 */
import { priceAt, quantityAt, readPoint } from './geometry.mjs';

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
 * the rest is the triangle beyond the original quantity — units produced only because they
 * were subsidised, costing more to produce than they are worth.
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
 * A maximum price below equilibrium. The line `Pmax` is lowered; producers supply only what
 * they will at that price, so the quantity TRADED is where the line meets S — not where it meets
 * D, which is what buyers want and cannot get (the gap is the excess demand). The four regions
 * partition the original total surplus:
 *
 *   cs        consumer surplus above P₁ on the units still traded — consumers had it, and keep it
 *   transfer  P₁ down to Pmax on the units still traded — producers' surplus handed to consumers
 *   ps        producer surplus below Pmax — what producers keep
 *   dwl       the triangle between D and S from the traded quantity out to Q₁ — units worth more
 *             to buyers than they cost to make, no longer traded
 *
 * Assumes the units still sold go to the buyers who value them most. Without that the consumer
 * side is smaller still; the triangle is the minimum loss, which is what the diagram shows.
 */
function maxPrice({ D, S }, shifted, before, after) {
  const q2 = after.q; // quantity supplied at the ceiling = quantity traded
  const pc = after.p; // the ceiling itself
  if (q2 <= 0) return null; // set below every producer's cost: nothing is traded, no diagram left
  const top = priceAt(D, q2); // what the last unit traded is worth to its buyer

  return {
    cs: { name: 'Consumer surplus kept', points: [[0, D.intercept], [0, before.p], [q2, before.p], [q2, top]] },
    transfer: { name: 'Transfer from producers to consumers', points: [[0, before.p], [0, pc], [q2, pc], [q2, before.p]] },
    ps: { name: 'Producer surplus kept', points: [[0, pc], [0, S.intercept], [q2, pc]] },
    dwl: { name: 'Welfare loss', points: [[q2, top], [q2, pc], [before.q, before.p]] },
  };
}

/**
 * A minimum wage above equilibrium, in a labour market: D is the demand for labour, S its
 * supply, `Wmin` the wage line, raised. Employment is where the line meets LABOUR DEMAND —
 * firms hire only the workers worth that wage — and the gap to labour supply is unemployment.
 * The mirror of the maximum price, partitioning the original total surplus:
 *
 *   fs        employers' surplus above the minimum wage
 *   transfer  W₁ up to Wmin on the jobs that remain — from employers to the workers who keep them
 *   ws        workers' surplus below W₁ on the jobs that remain
 *   dwl       the triangle between labour demand and supply from employment out to E₁
 */
function minWage({ D, S }, shifted, before, after) {
  const e2 = after.q; // employment at the wage floor
  const w2 = after.p;
  if (e2 <= 0) return null;
  const reservation = priceAt(S, e2); // the lowest wage the last worker employed would accept

  return {
    fs: { name: "Employers' surplus", points: [[0, D.intercept], [0, w2], [e2, w2]] },
    transfer: { name: 'Transfer from employers to workers', points: [[0, w2], [0, before.p], [e2, before.p], [e2, w2]] },
    ws: { name: "Workers' surplus kept", points: [[0, before.p], [0, S.intercept], [e2, reservation], [e2, before.p]] },
    dwl: { name: 'Welfare loss', points: [[e2, w2], [e2, reservation], [before.q, before.p]] },
  };
}

/**
 * A negative externality in PRODUCTION. S is marginal private cost; the student draws marginal
 * social cost by shifting a copy of it up by the external cost, and the original stays on the
 * diagram as MPC. D is marginal private benefit, and — with no external benefit — marginal social
 * benefit too. The market produces where MPC meets D (Qm, the origin); society is best off where
 * MSC meets D (Q*, the point).
 *
 * The welfare loss is NOT the tax-diagram triangle. Its apex is at the social optimum and its base
 * is the vertical at the MARKET output, between MSC and D. The three regions partition the whole
 * external cost at the market output (the band between MSC and MPC from 0 to Qm):
 *
 *   ext  the external cost of the socially optimal output — real, but outweighed by the benefit
 *   pvt  between D and MPC from Q* to Qm: the private surplus the extra units give buyers and
 *        sellers. It is the tax-shaped triangle, pointing at the market equilibrium, and it is
 *        the one students shade by mistake
 *   dwl  between MSC and D from Q* to Qm: what the extra units cost society over and above
 *        everything they are worth to anyone. The welfare loss.
 */
function negativeExternality({ S }, shifted, before, after) {
  const { q: qs, p: ps } = after; // social optimum
  const { q: qm, p: pm } = before; // market equilibrium
  if (qs <= 0) return null;
  const MSC = shifted.S;
  const mpcAtOptimum = priceAt(S, qs);

  return {
    ext: { name: 'External cost of the socially optimal output', points: [[0, MSC.intercept], [qs, ps], [qs, mpcAtOptimum], [0, S.intercept]] },
    pvt: { name: 'Private surplus on the extra output', points: [[qs, ps], [qs, mpcAtOptimum], [qm, pm]] },
    dwl: { name: 'Welfare loss', points: [[qs, ps], [qm, priceAt(MSC, qm)], [qm, pm]] },
  };
}

/**
 * A tariff. Domestic D and S, and a horizontal world price `Pw` below the domestic equilibrium,
 * which the tariff raises. Consumption is where the price line meets D (the point); domestic
 * production where it meets S. The four regions partition the consumer surplus the tariff takes
 * away — the trapezium between the two price lines, left of D:
 *
 *   pg    gain to domestic producers, left of S
 *   dwlP  welfare loss on production: extra units made at home at more than the world price
 *   rev   tariff revenue: the tariff on the units still imported
 *   dwlC  welfare loss on consumption: units no longer bought
 *
 * Returns null when the world price sits below domestic producers' lowest cost (the S intercept),
 * or when the tariff is prohibitive and imports stop — a different diagram.
 */
function tariff({ D, S }, shifted, before, after) {
  const pw = before.p;
  const pt = after.p;
  const qd1 = before.q;
  const qd2 = after.q;
  const qs1 = quantityAt(S, pw);
  const qs2 = quantityAt(S, pt);
  if (qs1 == null || qs2 == null || qs1 < 0 || qs2 >= qd2) return null;

  return {
    pg: { name: 'Gain to domestic producers', points: [[0, pw], [qs1, pw], [qs2, pt], [0, pt]] },
    dwlP: { name: 'Welfare loss (production)', points: [[qs1, pw], [qs2, pw], [qs2, pt]] },
    rev: { name: 'Tariff revenue', points: [[qs2, pw], [qd2, pw], [qd2, pt], [qs2, pt]] },
    dwlC: { name: 'Welfare loss (consumption)', points: [[qd2, pw], [qd1, pw], [qd2, pt]] },
  };
}

/**
 * A break-even chart: TR from the origin, TC with an intercept equal to fixed costs. A rise in
 * fixed costs shifts TC up in parallel; the break-even output is where TR meets the new TC. Two
 * regions: loss (TC above TR) left of break-even, and profit (TR above TC) right of it, out to the
 * end of the chart — the axis maximum, or where TR leaves the top of the canvas if sooner.
 */
function breakEven({ TR }, shifted, before, after, spec) {
  const TC = shifted.TC;
  const q = after.q;
  const xMax = spec?.axes?.x?.max ?? Infinity;
  const yMax = spec?.axes?.y?.max ?? Infinity;
  const qEnd = Math.min(xMax, TR.slope > 0 ? (yMax - TR.intercept) / TR.slope : xMax);
  if (q <= 0 || q >= qEnd) return null;

  return {
    loss: { name: 'Loss', points: [[0, TC.intercept], [0, TR.intercept], [q, after.p]] },
    profit: { name: 'Profit', points: [[q, after.p], [qEnd, priceAt(TR, qEnd)], [qEnd, priceAt(TC, qEnd)]] },
  };
}

/**
 * Monopoly against perfect competition, with constant marginal cost (so MC = AC and the profit
 * rectangle is exact). Nothing moves. Competition produces where AR meets MC (the origin, Pc/Qc);
 * the monopolist where MR meets MC, charging the price read up on AR (the point, Pm/Qm). The
 * three regions partition the competitive total surplus:
 *
 *   cs      consumer surplus under monopoly
 *   profit  Pm down to MC on the monopoly output — consumer surplus transferred to the monopolist
 *   dwl     the triangle between AR and MC from Qm out to Qc
 */
function monopoly({ AR, MC }, shifted, before, after) {
  const { q: qm, p: pm } = after;
  const { q: qc, p: pc } = before;
  if (qm <= 0 || qm >= qc) return null;
  const mc = priceAt(MC, qm);

  return {
    cs: { name: 'Consumer surplus under monopoly', points: [[0, AR.intercept], [0, pm], [qm, pm]] },
    profit: { name: 'Monopoly profit (transfer from consumers)', points: [[0, pm], [0, mc], [qm, mc], [qm, pm]] },
    dwl: { name: 'Welfare loss', points: [[qm, pm], [qm, mc], [qc, pc]] },
  };
}

/*
 * What each family partitions, written INDEPENDENTLY of its recipe. The guard checks that the
 * regions' union is exactly this — so a region that leaks past a curve (a consumer-surplus polygon
 * whose corner overshoots demand, say) or leaves a sliver unnamed fails, not just one that
 * double-counts. Until 13.7 check 4 compared the regions only with themselves, which proves
 * no overlap and nothing else.
 */
const originalSurplus = ({ D, S }, own, before) => [[[0, D.intercept], [0, S.intercept], [before.q, before.p]]];
const WHOLE = {
  taxWelfare: originalSurplus,
  subsidyWelfare: ({ S }, own, before, after) => {
    const q2 = Math.max(0, after.q);
    const pk = priceAt(S, q2);
    return [[[0, after.p], [0, pk], [q2, pk], [q2, after.p]]]; // the subsidy's cost to the taxpayer
  },
  maxPrice: originalSurplus,
  minWage: originalSurplus,
  negativeExternality: ({ S }, own, before) => {
    const MSC = own.S;
    return [[[0, MSC.intercept], [before.q, priceAt(MSC, before.q)], [before.q, before.p], [0, S.intercept]]];
  },
  tariff: ({ D }, own, before, after) => [[[0, before.p], [before.q, before.p], [after.q, after.p], [0, after.p]]],
  breakEven: ({ TR }, own, before, after, spec) => {
    const TC = own.TC;
    const qEnd = Math.min(spec.axes.x.max, TR.slope > 0 ? (spec.axes.y.max - TR.intercept) / TR.slope : spec.axes.x.max);
    return [
      [[0, TC.intercept], [0, TR.intercept], [after.q, priceAt(TR, after.q)]],
      [[after.q, priceAt(TC, after.q)], [qEnd, priceAt(TR, qEnd)], [qEnd, priceAt(TC, qEnd)]],
    ];
  },
  monopoly: ({ AR, MC }, own, before) => [[[0, AR.intercept], [0, priceAt(MC, 0)], [before.q, before.p]]],
};

const DS = { cross: ['D', 'S'] };

/**
 * Each family assumes a shift direction. A tax family fed a downward shift produces regions
 * that invert and overlap — the rectangles cross over — and the guard found exactly that at
 * a -55 shift. Rather than make every family robust to a diagram that is economically
 * backwards, regions are simply not built when the shift is the wrong way: the student has
 * already lost the direction mark, and shading a welfare loss on an inverted diagram is not
 * a question worth asking. The drill says fix the direction first.
 *
 * The same holds when the WRONG CURVE moved. Until 13.7 a family checked only the sign of
 * whichever curve moved first, so shifting demand up on the tax drill built tax regions from a
 * diagram whose supply never moved: the consumer and producer burdens collapsed onto the same
 * rectangle and the loss triangle onto a line. The guard never swept a non-target curve, so it
 * never saw it. It does now, and a family builds only from its own curve moving its own way.
 */
const FAMILIES = {
  taxWelfare: { build: taxWelfare, curves: ['D', 'S'], moves: 'S', direction: 1, point: DS, origin: DS },
  subsidyWelfare: { build: subsidyWelfare, curves: ['D', 'S'], moves: 'S', direction: -1, point: DS, origin: DS },
  maxPrice: {
    build: maxPrice, curves: ['D', 'S', 'Pmax'], moves: 'Pmax', direction: -1,
    point: { cross: ['Pmax', 'S'] }, origin: DS,
  },
  minWage: {
    build: minWage, curves: ['D', 'S', 'Wmin'], moves: 'Wmin', direction: 1,
    point: { cross: ['Wmin', 'D'] }, origin: DS,
  },
  negativeExternality: {
    build: negativeExternality, curves: ['D', 'S'], moves: 'S', direction: 1, point: DS, origin: DS,
  },
  tariff: {
    build: tariff, curves: ['D', 'S', 'Pw'], moves: 'Pw', direction: 1,
    point: { cross: ['Pw', 'D'] }, origin: { cross: ['Pw', 'D'] },
  },
  breakEven: {
    build: breakEven, curves: ['TR', 'TC'], moves: 'TC', direction: 1,
    point: { cross: ['TR', 'TC'] }, origin: { cross: ['TR', 'TC'] },
  },
  monopoly: {
    build: monopoly, curves: ['AR', 'MR', 'MC'], moves: null, direction: 0,
    point: { cross: ['MR', 'MC'], readOn: 'AR' }, origin: { cross: ['AR', 'MC'] },
  },
};

const MOVED = 5; // economic units; the default, overridden by a spec's `nudge`

/** A family's declaration (never its recipe), or undefined. */
export function familyOf(name) {
  const entry = name ? FAMILIES[name] : undefined;
  if (!entry) return undefined;
  const { build, ...declared } = entry;
  return declared;
}

function regionsFor(family, base, own, spec, what = 'regions') {
  const entry = FAMILIES[family];
  if (!entry) throw new Error(`unknown region family: ${family}`);

  const before = readPoint(base, entry.origin);
  const after = readPoint(own, entry.point);
  if (!before || !after) return null;

  const unit = spec?.nudge ?? MOVED;
  const moved = Object.keys(base).filter((n) => own[n] && Math.abs(own[n].intercept - base[n].intercept) >= unit);
  if (entry.moves) {
    // The family's own curve, alone, the family's own way.
    if (moved.length !== 1 || moved[0] !== entry.moves) return null;
    const delta = own[entry.moves].intercept - base[entry.moves].intercept;
    if (Math.sign(delta) !== entry.direction) return null;
  } else if (moved.length) {
    return null;
  }

  const regions = entry.build(base, own, before, after, spec) || null;
  if (what === 'regions' || !regions) return regions;
  return WHOLE[family](base, own, before, after, spec);
}

/**
 * @param {object} spec  the drill spec (its `regions` names the family)
 * @param {object} own   the student's curves after their shift (`applyShifts`)
 *
 * The pre-13.7 form `buildRegions(family, curves, shifted)` still works: a string first argument
 * is read as a family name with the given base curves.
 */
export function buildRegions(spec, own, legacyShifted) {
  if (typeof spec === 'string') return regionsFor(spec, own, legacyShifted, null);
  if (!spec?.regions) return null;
  return regionsFor(spec.regions, spec.curves, own, spec);
}

/**
 * For the guard: the polygons a spec's family partitions at this shift (see WHOLE), or null when
 * no regions are built.
 */
export function wholeFor(spec, own) {
  if (!spec?.regions) return null;
  return regionsFor(spec.regions, spec.curves, own, spec, 'whole');
}

export const familyNames = () => Object.keys(FAMILIES);
