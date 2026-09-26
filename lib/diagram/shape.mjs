/**
 * What a spec's shape implies, read one way for the marker, the component and the guard.
 *
 * A spec states only what differs from the default; every default lives here, so a spec for a
 * plain demand-and-supply shift (the two 13.5 pilots) needs none of the fields below and still
 * reads exactly as it did. See lib/diagram/schema.md for the author's view of each field.
 */
import { familyOf } from './regions.mjs';

export const DEFAULT_UNIT = 5; // nudge step, and the smallest move that counts as a move
export const DEFAULT_RANGE = 55; // the furthest a student can shift a curve, either way

export const unitOf = (spec) => spec.nudge ?? DEFAULT_UNIT;
export const rangeOf = (spec) => spec.range ?? DEFAULT_RANGE;

/** Does any curve move? Monopoly-vs-competition does not: no M1, no M2, no shift step. */
export const hasShift = (spec) => Boolean(spec.expect?.curve);

/** The curves a student may grab. Default: every curve, when the drill has a shift at all. */
export const movableOf = (spec) => (hasShift(spec) ? spec.movable || Object.keys(spec.curves) : []);

/** +1 up, -1 down, 0 no shift. */
export const directionOf = (spec) => (!hasShift(spec) ? 0 : spec.expect.direction === 'up' ? 1 : -1);

/** The point the student marks: the spec's, else its family's, else where D meets S. */
export const pointSpec = (spec) => spec.point || familyOf(spec.regions)?.point || { cross: ['D', 'S'] };

/** The original position (P₁/Q₁): the spec's, else its family's, else the point's own pair. */
export const originSpec = (spec) => spec.origin || familyOf(spec.regions)?.origin || pointSpec(spec);

/** One mark per criterion that applies: M1 + M2 with a shift, M3 always, M4 with an area. */
export const marksFor = (spec) => (hasShift(spec) ? 2 : 0) + 1 + (spec.expect?.regions?.length ? 1 : 0);

const NAMES = { D: 'Demand curve', S: 'Supply curve' };
const ROLES = { D: 'demand', S: 'supply' };

/**
 * Display metadata for one curve, with defaults.
 *
 *   label         on the canvas at the end of the line ('D', 'S', 'Pmax', 'D = MPB = MSB')
 *   short         in the mark-scheme rule line; defaults to label
 *   name          for screen readers and the nudge row ('Demand curve', 'Maximum price line')
 *   role          colour class: demand | supply | policy | marginal
 *   shiftedLabel  once moved ('S₂' by default, 'MSC' for an externality, 'Pw + t' for a tariff)
 *   ghostLabel    the original once moved ('S₁' by default, 'S = MPC' for an externality)
 *   ghost         how the original shows once moved: 'dashed' (default), 'solid' (it is still a
 *                 curve in its own right — MPC under MSC), or 'none' (a price line's starting
 *                 position means nothing)
 */
export function curveMeta(spec, name) {
  const c = spec.curves[name] || {};
  const label = c.label ?? name;
  return {
    label,
    short: c.short ?? label,
    name: c.name ?? NAMES[name] ?? label,
    role: c.role ?? ROLES[name] ?? (c.slope === 0 ? 'policy' : c.slope > 0 ? 'supply' : 'demand'),
    shiftedLabel: c.shiftedLabel ?? `${label}₂`,
    ghostLabel: c.ghostLabel ?? `${label}₁`,
    ghost: c.ghost ?? 'dashed',
  };
}

/**
 * The P/Q glyphs on the axes. `glyphs: { p: 'W', q: 'E' }` gives W₁ E₁ W₂ E₂; any of the four can
 * be named outright (`q1: 'Qm', q2: 'Q*'`).
 */
/**
 * A value beside its glyph, as a chart label and the feedback print it: "P₁ 70", "BE₂ 3,500",
 * "$7,000". A bare "$" glyph sits against its number (it IS the unit); every other glyph is a
 * name and takes a space. Thousands get separators — the break-even chart's first walk at 390px
 * read "$ 7000" (packet 13.8).
 */
export const glyphValue = (glyph, value) =>
  `${glyph === '$' ? '$' : `${glyph} `}${Math.round(value).toLocaleString('en-US')}`;

export function glyphsFor(spec) {
  const g = spec.glyphs || {};
  const p = g.p ?? 'P';
  const q = g.q ?? 'Q';
  return { p1: g.p1 ?? `${p}₁`, q1: g.q1 ?? `${q}₁`, p2: g.p2 ?? `${p}₂`, q2: g.q2 ?? `${q}₂` };
}

const STEP_DEFAULTS = {
  shift: {
    name: 'Shift a curve',
    prompt: 'Drag the curve that moves. On a phone, tap it, use the arrows below, then Next.',
  },
  point: { name: 'Mark the equilibrium', prompt: 'Tap where the market now clears. It snaps if you are close enough.' },
  shade: { name: 'Shade the loss', prompt: 'Tap the area that represents the welfare loss. Tap again to unshade.' },
};

/** The steps this drill has, in order, each `{ key, name, prompt }`. */
export function stepsFor(spec) {
  const keys = [...(hasShift(spec) ? ['shift'] : []), 'point', ...(spec.expect?.regions?.length ? ['shade'] : [])];
  return keys.map((key) => ({ key, ...STEP_DEFAULTS[key], ...(spec.steps?.[key] || {}) }));
}

export const CRITERIA = {
  M1: 'Correct curve shifted',
  M2: 'Correct direction of shift',
  M3: 'New equilibrium identified',
  M4: 'Correct area shaded',
};

/** Criterion headings, with any the spec renames. */
export const criteriaFor = (spec) => ({ ...CRITERIA, ...(spec.criteria || {}) });
