/**
 * The drill's view, as pure functions: the canvas frame, axis ticks, where each line is drawn,
 * where each label starts, what a screen reader is told, and the step machine. The component
 * (components/diagram/DiagramDrawDrill.jsx) renders from these; the guard
 * (audit/scripts/diagram-check.mjs) and node tests call the same functions, so what the guard
 * proves about a layout is the layout the student sees — not a synthetic stand-in for it.
 *
 * Economic units in, viewBox units out. Nothing here touches the DOM.
 */
import { readPoint } from './geometry.mjs';
import { applyShifts } from './marking.mjs';
import { buildRegions } from './regions.mjs';
import {
  curveMeta, glyphsFor, glyphValue, hasShift, movableOf, originSpec, pointSpec, rangeOf, stepsFor, unitOf,
} from './shape.mjs';

/** The viewBox, and the plot inside it. 560 × 420; the browser scales it to the column. */
export const PLOT = { left: 58, right: 22, top: 22, bottom: 48, w: 560, h: 420 };

/**
 * The frame for a canvas that renders `width` CSS pixels wide.
 *
 * On a wide column the 560-unit frame is scaled to fit and its 10–15-unit text renders at roughly
 * its own size. On a phone it was scaled to 0.48 — measured at 390px, 271px of canvas in the
 * Diagrams tab: tick labels at 4.8px, curve labels at 7px, a diagram the student is asked to draw
 * on and cannot read (packet 13.7). Below NARROW_BELOW the viewBox is the canvas's own width, so
 * one unit is one CSS pixel and every face renders at the size the stylesheet gives it; the plot
 * turns a little taller than wide, and the margins tighten.
 *
 * This is not the font floor packet 11 rejected (F088): that one raised authored text inside a
 * fixed, hand-placed SVG, which is a relayout nobody could check. Here nothing is hand-placed — the
 * lines and regions are computed from the frame and the labels are placed by the solver on their
 * MEASURED boxes, and `npm run diagram-check` proves the narrow frames as well as the wide one.
 */
export const NARROW_BELOW = 480;
export function plotFor(width) {
  if (!(width > 0) || width >= NARROW_BELOW) return PLOT;
  const w = Math.max(240, Math.round(width));
  // Slightly taller than wide: a phone has height to spare and labels escape by sliding vertically.
  // At the 0.75 of the wide frame, or 0.86, the guard found curve labels with nowhere left to go at
  // the extreme shifts; 1.05 clears every spec and shape at 256px and 271px (diagram-check).
  return { left: 50, right: 12, top: 16, bottom: 42, w, h: Math.round(w * 1.05), narrow: true };
}

export function frame(spec, plot = PLOT) {
  const xMax = spec.axes.x.max;
  const yMax = spec.axes.y.max;
  const plotW = plot.w - plot.left - plot.right;
  const plotH = plot.h - plot.top - plot.bottom;
  return {
    xMax,
    yMax,
    X: (q) => plot.left + (q * plotW) / xMax,
    Y: (p) => plot.h - plot.bottom - (p * plotH) / yMax,
    toQ: (x) => ((x - plot.left) * xMax) / plotW,
    toP: (y) => ((plot.h - plot.bottom - y) * yMax) / plotH,
  };
}

/**
 * Tick spacing that adapts to the axis: the smallest of 1, 2, 2.5, 5 × 10ⁿ that leaves at most
 * eight intervals. 120 and 140 give 20, as the two 13.5 specs always had; a break-even chart to
 * 1,000 gets 200, and an AD/AS diagram to 12 gets 2. `axes.x.tick` overrides it.
 */
export function tickStep(max, most = 8) {
  for (let e = -3; e <= 9; e++) {
    for (const m of [1, 2, 2.5, 5]) {
      const s = m * 10 ** e;
      if (max / s <= most + 1e-9) return s;
    }
  }
  return max;
}

/** Tick values from 0 to the axis max, inclusive. A narrow frame has room for fewer. */
export function ticks(axis, plot = PLOT) {
  const step = axis.tick ?? tickStep(axis.max, plot.narrow ? 6 : 8);
  const out = [];
  for (let i = 0; i * step <= axis.max + 1e-9; i++) out.push(Math.round(i * step * 1000) / 1000);
  return out;
}

/**
 * Where a line is drawn, in economic units: from where it enters the plot to where it stops short
 * of the edge, leaving room for its label. Upward lines stop below the top edge, downward ones
 * above the axis, horizontal ones just short of the right edge.
 */
export function segment(curve, xMax, yMax) {
  const { intercept: a, slope: b } = curve;
  let q0 = 0;
  let qEnd;
  if (b > 0) {
    q0 = a < 0 ? -a / b : 0;
    qEnd = Math.min(xMax - 10, (yMax - 2 - a) / b);
  } else if (b < 0) {
    q0 = a > yMax - 2 ? (a - (yMax - 2)) / -b : 0; // enters through the top edge, not above it
    qEnd = Math.min(xMax - 5, (a - 5) / -b);
  } else {
    qEnd = xMax - 5;
  }
  return { q0, p0: a + b * q0, qEnd, pEnd: a + b * qEnd };
}

/** Everything the canvas shows, derived from the student's shifts. */
export function scene(spec, shifts) {
  const unit = unitOf(spec);
  const own = applyShifts(spec.curves, shifts);
  const before = readPoint(spec.curves, originSpec(spec));
  const after = readPoint(own, pointSpec(spec));
  const moved = Object.keys(spec.curves).filter((n) => Math.abs(shifts[n] || 0) >= unit);
  const regions = (!hasShift(spec) || moved.length) && after ? buildRegions(spec, own) : null;
  return { own, before, after, moved, regions };
}

const EQ_SLIDE_Y = { axis: 'y', rows: 5, flip: true };

/**
 * Where a line's own label starts: at the line's end, on the side the line is NOT. A label the
 * line runs through is legible only thanks to its halo, and the 13.6 drill had two: S₂ sat on
 * its own line wherever supply left through the top, and a downward curve's label sat on the
 * stretch of line running up-left from its end.
 *
 *   upward, leaves through the top   right of the end, just below it
 *   downward, label of 1–2 letters   right of the end ("D" at the bottom-right corner)
 *   downward, longer label           below-left of the end ("D = MPB = MSB" will not fit right)
 *   otherwise (upward to the right   above-left of the end, where the line is not
 *   edge, or horizontal)
 */
function endAnchor(c, s, text, X, Y, xMax) {
  if (c.slope > 0 && s.qEnd < xMax * 0.85) return { x: X(s.qEnd) + 6, y: Y(s.pEnd) + 14, anchor: 'start' };
  if (c.slope < 0 && [...text].length <= 2) return { x: X(s.qEnd) + 6, y: Y(s.pEnd) + 5, anchor: 'start' };
  if (c.slope < 0) {
    // Below the line is clear anywhere along a downward line, but the end is often a few pixels
    // above the axis. Walk back up the line until there are 40px beneath it for the label.
    const pRoom = s.pEnd + Math.max(0, 40 - (Y(0) - Y(s.pEnd))) / ((Y(0) - Y(1)) || 1);
    const q = Math.min(s.qEnd, (pRoom - c.intercept) / c.slope);
    return { x: X(q) - 6, y: Y(c.intercept + c.slope * q) + 18, anchor: 'end' };
  }
  return { x: X(s.qEnd) - 6, y: Y(s.pEnd) - 9, anchor: 'end' };
}
const CURVE_SLIDE = { axis: 'y', rows: 3, both: true, alsoX: true };

/**
 * Every label on the canvas, with its starting position and the one direction it may slide
 * (lib/diagram/layout.mjs). Returned in PRIORITY order — the solver places earlier labels first
 * and later ones yield — so the order is decided here, once, rather than by whichever label React
 * happened to mount first:
 *
 *   P₁ Q₁ → labels of curves that have not moved → ghost labels → P₂ Q₂ → labels of moved curves
 *
 * Stable things first; the curve the student is dragging gives way, because it has the most room
 * to go somewhere else.
 */
export function labelLayout(spec, { own, before, point, moved }, plot = PLOT) {
  const { X, Y, xMax, yMax } = frame(spec, plot);
  const g = glyphsFor(spec);
  const names = Object.keys(spec.curves);
  const out = [];

  const eqPair = (idP, idQ, glyphP, glyphQ, at, extra = {}) => {
    out.push({ id: idP, kind: 'eq', text: glyphValue(glyphP, at.p), x: X(0) + 7, y: Y(at.p) - 6, anchor: 'start', slide: { axis: 'x', limit: X(at.q) }, ...extra });
    out.push({ id: idQ, kind: 'eq', text: glyphValue(glyphQ, at.q), x: X(at.q) + 6, y: Y(0) - 7, anchor: 'start', slide: EQ_SLIDE_Y, ...extra });
  };
  const curveLabel = (name) => {
    const meta = curveMeta(spec, name);
    const c = own[name];
    const s = segment(c, xMax, yMax);
    const isMoved = moved.includes(name);
    const text = isMoved ? meta.shiftedLabel : meta.label;
    out.push({
      id: `c:${name}`, kind: 'curve', curve: name, role: meta.role, moved: isMoved, text,
      ...endAnchor(c, s, text, X, Y, xMax), slide: CURVE_SLIDE,
    });
  };

  if (before) eqPair('P1', 'Q1', g.p1, g.q1, before);
  for (const name of names) if (!moved.includes(name)) curveLabel(name);
  for (const name of moved) {
    const meta = curveMeta(spec, name);
    if (meta.ghost === 'none') continue;
    const s = segment(spec.curves[name], xMax, yMax);
    out.push({
      id: `g:${name}`, kind: 'ghost', curve: name, role: meta.role, solid: meta.ghost === 'solid',
      text: meta.ghostLabel, ...endAnchor(spec.curves[name], s, meta.ghostLabel, X, Y, xMax), slide: CURVE_SLIDE,
    });
  }
  if (point) eqPair('P2', 'Q2', g.p2, g.q2, point, { off: point.snapped === false });
  for (const name of moved) curveLabel(name);
  return out;
}

/**
 * The drawn lines as pixel segments, for the label solver to keep labels off: every curve where
 * the student has it, every original still on show (dashed or solid, not 'none'), and the dashed
 * guides from each marked point to the axes.
 */
export function lineObstacles(spec, { own, moved, before = null, point = null }, plot = PLOT) {
  const { X, Y, xMax, yMax } = frame(spec, plot);
  const seg = (c) => {
    const s = segment(c, xMax, yMax);
    return [X(s.q0), Y(s.p0), X(s.qEnd), Y(s.pEnd)];
  };
  // The dashed guides from each point to the axes, owned by that point's labels (layout.mjs).
  const guides = (at, owners) => (at ? [
    { seg: [X(0), Y(at.p), X(at.q), Y(at.p)], owners },
    { seg: [X(at.q), Y(0), X(at.q), Y(at.p)], owners },
  ] : []);
  return [
    ...Object.keys(spec.curves).map((n) => seg(own[n])),
    ...moved.filter((n) => curveMeta(spec, n).ghost !== 'none').map((n) => seg(spec.curves[n])),
    ...guides(before, ['P1', 'Q1']),
    ...guides(point, ['P2', 'Q2']),
  ];
}

/*
 * Text metrics, ESTIMATED, for the guard only — the component measures real boxes with getBBox.
 * Deliberately generous: DM Mono advances 0.6em, so 11.5px is 6.9 per character; DM Sans bold at
 * 15px averages under 9. Estimating is not measuring (layout.mjs says why), so this proves the
 * solver on the real anchor positions, and the widths err wide.
 */
const FACE = {
  eq: { perChar: 7.2, height: 14, ascent: 11 },
  curve: { perChar: 9.6, height: 18, ascent: 14 },
  ghost: { perChar: 9.6, height: 18, ascent: 14 },
  tick: { perChar: 6.2, height: 12, ascent: 9 },
  title: { perChar: 6.6, height: 14, ascent: 11 },
};

export function estimateBox({ kind, text, x, y, anchor }, widen = 1) {
  const f = FACE[kind] || FACE.eq;
  const width = [...text].length * f.perChar * widen;
  const left = anchor === 'end' ? x - width : anchor === 'middle' ? x - width / 2 : x;
  return { x: left, y: y - f.ascent, width, height: f.height };
}

/** Tick labels and axis titles, which labels must not land on. Estimated, like the above. */
export function fixedBoxes(spec, widen = 1, plot = PLOT) {
  const { X, Y, xMax, yMax } = frame(spec, plot);
  const out = [];
  for (const p of ticks(spec.axes.y, plot)) out.push(estimateBox({ kind: 'tick', text: String(p), x: X(0) - 8, y: Y(p) + 3.5, anchor: 'end' }, widen));
  for (const q of ticks(spec.axes.x, plot)) out.push(estimateBox({ kind: 'tick', text: String(q), x: X(q), y: Y(0) + 16, anchor: 'middle' }, widen));
  out.push(estimateBox({ kind: 'title', text: spec.axes.x.label, x: X(xMax / 2), y: plot.h - 8, anchor: 'middle' }, widen));
  const yTitle = estimateBox({ kind: 'title', text: spec.axes.y.label, x: 0, y: 0, anchor: 'middle' }, widen);
  out.push({ x: 16 - FACE.title.ascent, y: Y(yMax / 2) - yTitle.width / 2, width: FACE.title.height, height: yTitle.width });
  return out;
}

/** The short name of an axis for a screen reader: 'quantity', 'price', 'wage', 'real output'. */
const axisWord = (axis) => axis.short ?? axis.label.split(' (')[0].toLowerCase();

/** What a screen reader hears about the canvas: the same facts the picture shows. */
export function describe(spec, { shifts, point, shaded, moved, regions, result }) {
  const parts = [`${spec.title}.`];
  if (hasShift(spec)) {
    parts.push(moved.length
      ? moved.map((n) => `${curveMeta(spec, n).name} shifted ${shifts[n] > 0 ? 'up' : 'down'} by ${Math.abs(shifts[n])}`).join('; ') + '.'
      : 'Nothing moved yet.');
  }
  if (point) parts.push(`Point marked at ${axisWord(spec.axes.x)} ${Math.round(point.q)}, ${axisWord(spec.axes.y)} ${Math.round(point.p)}.`);
  else parts.push('No point marked yet.');
  if (shaded?.length) parts.push(`Shaded: ${shaded.map((k) => regions?.[k]?.name || k).join(', ')}.`);
  if (result) parts.push(`Marked: ${result.awarded} out of ${result.total}.`);
  return parts.join(' ');
}

/**
 * Nudge semantics for one curve, by its slope. A shift is a change of intercept, and "+1" is up:
 * on an upward-sloping curve that is also LEFT, on a downward-sloping one it is RIGHT, and on a
 * horizontal line it is only up. The arrow keys follow the same picture. Until 13.7 the buttons
 * read "up / left" for demand too, where up is right.
 */
export function nudgeLabels(curve) {
  if (curve.slope > 0) return { up: '↖ up / left', down: '↘ down / right', upAria: 'Shift up and left', downAria: 'Shift down and right' };
  if (curve.slope < 0) return { up: '↗ up / right', down: '↙ down / left', upAria: 'Shift up and right', downAria: 'Shift down and left' };
  return { up: '↑ up', down: '↓ down', upAria: 'Move up', downAria: 'Move down' };
}

export function keyDirection(curve, key) {
  if (key === 'ArrowUp') return 1;
  if (key === 'ArrowDown') return -1;
  if (curve.slope === 0) return 0;
  if (key === 'ArrowLeft') return curve.slope > 0 ? 1 : -1;
  if (key === 'ArrowRight') return curve.slope > 0 ? -1 : 1;
  return 0;
}

/* ── the step machine ─────────────────────────────────────────────────────────────────────── */

export const initialDrill = () => ({ shifts: {}, point: null, shaded: [], stepIndex: 0, selected: null, result: null });

/**
 * Pure: (spec, state, action) → state. The component holds this in useReducer; the tests walk it
 * without a DOM.
 *
 * One behaviour change from 13.6, on purpose. The drill used to advance from the shift step the
 * moment any curve had moved, and the nudge arrows and the keyboard hit-targets exist only in that
 * step — so one tap of an arrow moved the curve 5 and then took the arrows away, and a keyboard
 * user lost focus after one key press. Now only a finished DRAG advances (the gesture is over, as
 * it was before); a nudge or a key leaves the student where they are, and "Next" moves on.
 */
export function drillReducer(spec, state, action) {
  const steps = stepsFor(spec);
  const key = steps[state.stepIndex]?.key;
  const unit = unitOf(spec);
  const range = rangeOf(spec);
  const movable = movableOf(spec);
  const anyMoved = (shifts) => Object.keys(spec.curves).some((n) => Math.abs(shifts[n] || 0) >= unit);
  const canEnter = (i, s) => {
    const k = steps[i]?.key;
    if (k === 'shift') return true;
    if (k === 'point') return !hasShift(spec) || anyMoved(s.shifts);
    if (k === 'shade') return Boolean(s.point);
    return false;
  };

  switch (action.type) {
    case 'select':
      if (state.result || key !== 'shift' || !movable.includes(action.curve)) return state;
      return state.selected === action.curve ? state : { ...state, selected: action.curve };

    case 'nudge':
    case 'drag': {
      if (state.result || key !== 'shift' || !movable.includes(action.curve)) return state;
      const current = state.shifts[action.curve] || 0;
      const raw = action.type === 'nudge' ? current + action.direction * unit : action.value;
      const next = Math.max(-range, Math.min(range, Math.round(raw / unit) * unit));
      if (next === current) return state;
      return { ...state, shifts: { ...state.shifts, [action.curve]: next }, point: null, selected: action.curve };
    }

    case 'dragEnd':
    case 'next':
      if (state.result || !canEnter(state.stepIndex + 1, state)) return state;
      return { ...state, stepIndex: state.stepIndex + 1 };

    case 'goto':
      if (!canEnter(action.index, state) || action.index === state.stepIndex) return state;
      return { ...state, stepIndex: action.index };

    case 'point': {
      if (state.result || key !== 'point') return state;
      const s = { ...state, point: action.point };
      if (canEnter(state.stepIndex + 1, s)) s.stepIndex += 1;
      return s;
    }

    case 'toggle': {
      if (state.result || key !== 'shade') return state;
      const k = action.region;
      return { ...state, shaded: state.shaded.includes(k) ? state.shaded.filter((x) => x !== k) : [...state.shaded, k] };
    }

    case 'marked':
      return { ...state, result: action.result };

    case 'model':
      return {
        shifts: action.attempt.shifts,
        point: action.attempt.equilibrium ? { ...action.attempt.equilibrium, snapped: true } : null,
        shaded: action.attempt.shaded,
        stepIndex: steps.length - 1,
        selected: null,
        result: action.result,
      };

    case 'reset':
      return initialDrill();

    default:
      return state;
  }
}

/** Which steps count as done, for the step buttons. */
export function stepDone(spec, state, stepKey) {
  if (stepKey === 'shift') return Object.keys(spec.curves).some((n) => Math.abs(state.shifts[n] || 0) >= unitOf(spec));
  if (stepKey === 'point') return Boolean(state.point);
  if (stepKey === 'shade') return state.shaded.length > 0;
  return false;
}
