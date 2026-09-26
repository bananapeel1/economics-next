"use client";
import { useEffect, useReducer, useRef, useState } from 'react';
import {
  mark, modelAttempt, interceptDelta, placeLabels,
  plotFor, frame, ticks, segment, scene, labelLayout, lineObstacles, describe, nudgeLabels, keyDirection,
  drillReducer, initialDrill, stepDone, stepsFor, curveMeta, movableOf, marksFor, unitOf, rangeOf,
} from '@/lib/diagram/index.mjs';
import styles from './DiagramDrawDrill.module.css';

/**
 * The drawing drill: the student moves a line, marks a point and shades an area, and is marked
 * on geometry. No labels to drag onto a finished diagram — nothing is decided until they move
 * something. Which lines exist, which may move, which point matters and which steps there are all
 * come from the spec (lib/diagram/schema.md); this file knows none of it by name.
 *
 * Three input paths, because most of the audience revises on a phone:
 *   drag      pointer events, with capture on the svg so a fast drag cannot escape
 *   tap-nudge tap a line to select it, then the arrows below the canvas move it one step
 *   keyboard  focus a line, then arrow keys — same step, for screen readers
 *
 * Things that look like details and are not:
 *   · Only a real drag re-renders on pointerup. Re-rendering unconditionally detached the
 *     node the click event was about to fire on, so shading silently did nothing.
 *   · The click that follows a drag is swallowed. The drag's end advances to the point step, and
 *     that click would otherwise mark a point wherever the finger or mouse let go.
 *   · The drag hit-areas exist only in the shift step. They are 22 units wide and sat on top of
 *     the intersection the student has to click next.
 *   · A nudge or an arrow key never leaves the shift step — "Next" does (lib/diagram/view.mjs,
 *     drillReducer). Advancing on the first nudge took the arrows away after one tap.
 *   · Labels move by `transform`, not by rewriting x/y. getBBox ignores an element's own transform,
 *     so every re-measure starts from the label's true anchor; moving x/y made each pass measure the
 *     previous pass's answer, and labels hopped back onto each other on the next render.
 */

const ROLE_STROKE = { demand: styles.demand, supply: styles.supply, policy: styles.policy, marginal: styles.marginal };
const ROLE_FILL = { demand: styles.demandFill, supply: styles.supplyFill, policy: styles.policyFill, marginal: styles.marginalFill };

/** A fixed text's box in viewBox units. The y-axis title is rotated, so its box turns with it. */
function boxOf(node) {
  const b = node.getBBox();
  if (node.dataset.fixed !== 'rot') return b;
  const cx = Number(node.dataset.cx);
  const cy = Number(node.dataset.cy);
  return { x: cx + b.y, y: cy - b.x - b.width, width: b.height, height: b.width };
}

export default function DiagramDrawDrill({ spec, onResult }) {
  const svgRef = useRef(null);
  const dragRef = useRef(null);
  const swallowClick = useRef(false);
  const [state, dispatch] = useReducer((s, a) => drillReducer(spec, s, a), undefined, initialDrill);
  const { shifts, point, shaded, stepIndex, selected, result } = state;

  // The frame follows the canvas's rendered width (view.mjs plotFor): 560 units on a wide column,
  // 1:1 with CSS pixels on a phone, where the scaled 560 frame drew 4.8px tick labels. Server render
  // and first paint use the wide frame; the observer swaps it before anything is interactive.
  const [canvasWidth, setCanvasWidth] = useState(0);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([entry]) => setCanvasWidth(Math.round(entry.contentRect.width)));
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);
  const plot = plotFor(canvasWidth);

  const steps = stepsFor(spec);
  const stepKey = steps[stepIndex]?.key;
  const { X, Y, toQ, toP, xMax, yMax } = frame(spec, plot);
  const { own, before, after, moved, regions } = scene(spec, shifts);
  const movable = movableOf(spec);
  const names = Object.keys(spec.curves);
  const unit = unitOf(spec);
  const range = rangeOf(spec);
  const px = (s) => ({ x1: X(s.q0), y1: Y(s.p0), x2: X(s.qEnd), y2: Y(s.pEnd) });

  const doMark = () => {
    const r = mark(spec, { shifts, equilibrium: point, shaded });
    dispatch({ type: 'marked', result: r });
    if (onResult) onResult(r);
  };

  const showModel = () => {
    const m = modelAttempt(spec);
    dispatch({ type: 'model', attempt: m, result: mark(spec, m) });
  };

  const svgPoint = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const k = plot.w / rect.width;
    return { x: (e.clientX - rect.left) * k, y: (e.clientY - rect.top) * k };
  };

  const onPointerDown = (e) => {
    swallowClick.current = false;
    const hit = e.target.closest('[data-curve]');
    if (!hit || stepKey !== 'shift' || result) return;
    const name = hit.dataset.curve;
    const pt = svgPoint(e);
    const base = shifts[name] || 0;
    dragRef.current = { name, q: toQ(pt.x), p: toP(pt.y), base, last: base, moved: false };
    dispatch({ type: 'select', curve: name });
    svgRef.current.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    const pt = svgPoint(e);
    const value = drag.base + interceptDelta(spec.curves[drag.name], toQ(pt.x) - drag.q, toP(pt.y) - drag.p);
    const next = Math.max(-range, Math.min(range, Math.round(value / unit) * unit));
    if (next !== drag.last) {
      drag.last = next;
      drag.moved = true;
      dispatch({ type: 'drag', curve: drag.name, value });
    }
  };

  const onPointerUp = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (drag?.moved) {
      swallowClick.current = true;
      dispatch({ type: 'dragEnd' });
    }
  };

  const onPointerCancel = () => { dragRef.current = null; };

  const onSvgClick = (e) => {
    if (swallowClick.current) { swallowClick.current = false; return; }
    if (result) return;
    if (stepKey === 'point') {
      if (e.target.closest('[data-curve]')) return;
      const pt = svgPoint(e);
      const q = toQ(pt.x);
      const p = toP(pt.y);
      if (q < 0 || q > xMax || p < 0 || p > yMax) return;
      const snap = after && Math.abs(q - after.q) <= spec.tolerance.q && Math.abs(p - after.p) <= spec.tolerance.p;
      dispatch({ type: 'point', point: snap ? { q: after.q, p: after.p, snapped: true } : { q, p, snapped: false } });
    } else if (stepKey === 'shade') {
      const region = e.target.closest('[data-region]');
      if (!region) return;
      dispatch({ type: 'toggle', region: region.dataset.region });
    }
  };

  const onKeyDown = (e) => {
    const hit = e.target.closest('[data-curve]');
    if (!hit || stepKey !== 'shift' || result) return;
    const name = hit.dataset.curve;
    const direction = keyDirection(spec.curves[name], e.key);
    if (!direction) return;
    e.preventDefault();
    dispatch({ type: 'nudge', curve: name, direction });
  };

  // ── labels: rendered at their anchors, measured, then moved so none can overlap ──
  const layout = labelLayout(spec, { own, before, point, moved }, plot);
  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  const linesRef = useRef(null);
  linesRef.current = lineObstacles(spec, { own, moved, before, point }, plot);
  const plotRef = useRef(plot);
  plotRef.current = plot;
  const layoutKey = `${plot.w}x${plot.h}|` + layout.map((l) => `${l.id}:${l.text}:${l.x.toFixed(1)},${l.y.toFixed(1)}`).join('|');
  const labelRefs = useRef({});
  const [placed, setPlaced] = useState({});
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let live = true;
    document.fonts?.ready?.then(() => { if (live) setFontsReady(true); });
    return () => { live = false; };
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const labels = layoutRef.current
      .map((l) => ({ l, node: labelRefs.current[l.id] }))
      .filter(({ node }) => node)
      .map(({ l, node }) => ({ id: l.id, box: node.getBBox(), slide: l.slide, optional: l.optional }));
    if (!labels.length) return;
    const fixed = [...svg.querySelectorAll('[data-fixed]')].map(boxOf);
    const out = placeLabels(labels, { bounds: { width: plotRef.current.w, height: plotRef.current.h }, fixed, lines: linesRef.current });
    setPlaced(Object.fromEntries(out.map((p) => [p.id, p])));
  }, [layoutKey, fontsReady]);

  const [promptKey, promptText] = result
    ? ['Marked', 'Every judgement is a number comparison. Reset and try a wrong answer — the feedback changes with the mistake.']
    : [`Step ${stepIndex + 1}`, steps[stepIndex].prompt];

  const showRegions = (stepKey === 'shade' || result) && regions;
  const description = describe(spec, { shifts, point, shaded, moved, regions, result });
  const nudge = nudgeLabels(selected ? spec.curves[selected] : { slope: 0 });
  const nextStep = steps[stepIndex + 1];

  return (
    <section className={styles.drill} aria-label={spec.title}>
      <div className={styles.meta}>
        {spec.unit && <span className={styles.chip}>{spec.unit} · {spec.specCode}</span>}
        {spec.topic && <span className={`${styles.chip} ${styles.grey}`}>{spec.topic}</span>}
        <span className={`${styles.chip} ${styles.marks}`}>{result ? `${result.awarded}/${result.total}` : `${marksFor(spec)} marks`}</span>
      </div>

      <p className={styles.prompt}>
        {spec.prompt.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>))}
      </p>

      <div className={styles.steps} role="group" aria-label="Steps">
        {steps.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className={`${styles.stepBtn} ${stepIndex === i ? styles.current : ''} ${stepDone(spec, state, s.key) ? styles.done : ''}`}
            aria-current={stepIndex === i ? 'step' : undefined}
            onClick={() => dispatch({ type: 'goto', index: i })}
          >
            <span className={styles.stepNum}>{i + 1}</span>
            {s.name}
          </button>
        ))}
      </div>

      <div className={styles.hint}><span className={styles.hintKey}>{promptKey}</span><span>{promptText}</span></div>

      <svg
        ref={svgRef}
        className={`${styles.plot} ${stepKey === 'shade' && !result ? styles.shading : ''}`}
        viewBox={`0 0 ${plot.w} ${plot.h}`}
        role="group"
        aria-label={description}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onClick={onSvgClick}
        onKeyDown={onKeyDown}
      >
        {/* grid and axes; tick spacing adapts to each axis (view.mjs tickStep) */}
        {ticks(spec.axes.y, plot).filter((p) => p > 0).map((p) => (
          <line key={`gy${p}`} className={styles.grid} x1={X(0)} y1={Y(p)} x2={X(xMax)} y2={Y(p)} />
        ))}
        {ticks(spec.axes.x, plot).filter((q) => q > 0).map((q) => (
          <line key={`gx${q}`} className={styles.grid} x1={X(q)} y1={Y(0)} x2={X(q)} y2={Y(yMax)} />
        ))}
        <line className={styles.axis} x1={X(0)} y1={Y(0)} x2={X(xMax)} y2={Y(0)} />
        <line className={styles.axis} x1={X(0)} y1={Y(0)} x2={X(0)} y2={Y(yMax)} />
        {ticks(spec.axes.y, plot).map((p) => (
          <text key={`ty${p}`} data-fixed="" className={styles.tick} x={X(0) - 8} y={Y(p) + 3.5} textAnchor="end">{p}</text>
        ))}
        {ticks(spec.axes.x, plot).map((q) => (
          <text key={`tx${q}`} data-fixed="" className={styles.tick} x={X(q)} y={Y(0) + 16} textAnchor="middle">{q}</text>
        ))}
        <text data-fixed="" className={styles.axisTitle} x={X(xMax / 2)} y={plot.h - 8} textAnchor="middle">{spec.axes.x.label}</text>
        <text data-fixed="rot" data-cx={16} data-cy={Y(yMax / 2)} className={styles.axisTitle}
          transform={`translate(16 ${Y(yMax / 2)}) rotate(-90)`} textAnchor="middle">{spec.axes.y.label}</text>

        {/* regions */}
        {showRegions && Object.entries(regions).map(([key, region]) => {
          const isTarget = spec.expect.regions?.includes(key);
          const chosen = shaded.includes(key);
          let cls = styles.region;
          if (result) cls += chosen && isTarget ? ` ${styles.regionOk}` : chosen ? ` ${styles.regionBad}` : isTarget ? ` ${styles.regionMiss}` : '';
          else if (chosen) cls += ` ${styles.regionSel}`;
          return (
            <path key={key} className={cls} data-region={key}
              d={region.points.map((pt, i) => `${i ? 'L' : 'M'}${X(pt[0]).toFixed(1)} ${Y(pt[1]).toFixed(1)}`).join(' ') + ' Z'}>
              <title>{result ? region.name : 'Tap to shade'}</title>
            </path>
          );
        })}

        {/* originals once moved: ghosted, kept solid (MPC under MSC), or not drawn (a price line) */}
        {moved.map((name) => {
          const meta = curveMeta(spec, name);
          if (meta.ghost === 'none') return null;
          const cls = meta.ghost === 'solid' ? `${styles.curve} ${ROLE_STROKE[meta.role] || ''}` : `${styles.curve} ${styles.ghost}`;
          return <line key={`ghost${name}`} className={cls} {...px(segment(spec.curves[name], xMax, yMax))} />;
        })}
        {names.map((name) => (
          <line key={`c${name}`}
            className={`${styles.curve} ${moved.includes(name) ? styles.shifted : ROLE_STROKE[curveMeta(spec, name).role] || ''}`}
            {...px(segment(own[name], xMax, yMax))} />
        ))}

        {/* guides */}
        {before && <>
          <line className={styles.guide} x1={X(0)} y1={Y(before.p)} x2={X(before.q)} y2={Y(before.p)} />
          <line className={styles.guide} x1={X(before.q)} y1={Y(0)} x2={X(before.q)} y2={Y(before.p)} />
          <circle className={styles.dot} cx={X(before.q)} cy={Y(before.p)} r="4.5" />
        </>}
        {point && <>
          <line className={styles.guide} x1={X(0)} y1={Y(point.p)} x2={X(point.q)} y2={Y(point.p)} />
          <line className={styles.guide} x1={X(point.q)} y1={Y(0)} x2={X(point.q)} y2={Y(point.p)} />
          <circle className={`${styles.dot} ${point.snapped === false ? styles.dotOff : ''}`} cx={X(point.q)} cy={Y(point.p)} r="4.5" />
        </>}

        {/* drag targets — shift step only, or they swallow the point step's click */}
        {stepKey === 'shift' && !result && movable.map((name) => (
          <line key={`hit${name}`} className={`${styles.hit} ${selected === name ? styles.hitOn : ''}`}
            data-curve={name} tabIndex={0} role="button"
            aria-label={`${curveMeta(spec, name).name}. Drag it, or use the arrow keys to move it.`}
            onFocus={() => dispatch({ type: 'select', curve: name })}
            {...px(segment(own[name], xMax, yMax))} />
        ))}

        {/* labels, placed after measurement */}
        {layout.map((l) => {
          const at = placed[l.id] || { dx: 0, dy: 0, hidden: false };
          const cls = l.kind === 'eq'
            ? `${styles.eqLabel} ${l.off ? styles.labelOff : ''}`
            : l.kind === 'ghost'
              ? `${styles.curveLabel} ${l.solid ? ROLE_FILL[l.role] || '' : styles.ghostFill}`
              : `${styles.curveLabel} ${l.moved ? styles.shiftedFill : ROLE_FILL[l.role] || ''}`;
          return (
            <text key={l.id} ref={(n) => { labelRefs.current[l.id] = n; }} className={cls}
              x={l.x} y={l.y} textAnchor={l.anchor === 'end' ? 'end' : undefined}
              transform={at.dx || at.dy ? `translate(${at.dx} ${at.dy})` : undefined}
              visibility={at.hidden ? 'hidden' : undefined}>
              {l.text}
            </text>
          );
        })}
      </svg>
      <p className={styles.srOnly} aria-live="polite">{description}</p>

      {/* tap-to-nudge: the phone path, and the one a drag cannot replace */}
      {stepKey === 'shift' && !result && (
        <div className={styles.nudge}>
          <span className={styles.nudgeLabel}>{selected ? `${curveMeta(spec, selected).name} selected` : 'Tap a line, then:'}</span>
          <button type="button" className={styles.nudgeBtn} disabled={!selected}
            onClick={() => dispatch({ type: 'nudge', curve: selected, direction: 1 })} aria-label={nudge.upAria}>{nudge.up}</button>
          <button type="button" className={styles.nudgeBtn} disabled={!selected}
            onClick={() => dispatch({ type: 'nudge', curve: selected, direction: -1 })} aria-label={nudge.downAria}>{nudge.down}</button>
          {selected && (
            <span className={styles.nudgeValue}>
              {shifts[selected] > 0 ? '+' : ''}{shifts[selected] || 0}
              {spec.curves[selected].slope === 0 ? ` (at ${own[selected].intercept})` : ''}
            </span>
          )}
          {nextStep && (
            <button type="button" className={`${styles.nudgeBtn} ${styles.next}`} disabled={!moved.length}
              onClick={() => dispatch({ type: 'next' })}>
              Next: {nextStep.name} →
            </button>
          )}
        </div>
      )}

      {result && (
        <ol className={styles.scheme}>
          {result.criteria.map((c) => (
            <li key={c.id} className={c.got ? styles.got : styles.missed}>
              <span className={styles.markBox}>{c.got ? '✓' : '✗'}</span>
              <div>
                <div className={styles.criterion}>{c.text}</div>
                <div className={styles.rule}>{c.rule}</div>
                <div className={styles.note}>{c.note}</div>
              </div>
            </li>
          ))}
        </ol>
      )}

      <div className={styles.actions}>
        <button type="button" className={`${styles.btn} ${styles.primary}`} onClick={doMark} disabled={!!result}>Mark my diagram</button>
        <button type="button" className={styles.btn} onClick={showModel}>Show model answer</button>
        <button type="button" className={styles.btn} onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    </section>
  );
}
