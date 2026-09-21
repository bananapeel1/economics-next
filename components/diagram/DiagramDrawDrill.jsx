"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { mark, modelAttempt, applyShifts, buildRegions, intersect, interceptDelta, placeLabels } from '@/lib/diagram/index.mjs';
import styles from './DiagramDrawDrill.module.css';

/**
 * The drawing drill: the student shifts a curve, marks the new equilibrium and shades an
 * area, and is marked on geometry. No labels to drag onto a finished diagram — nothing is
 * decided until they move something.
 *
 * Three input paths, because most of the audience revises on a phone:
 *   drag      pointer events, with capture on the svg so a fast drag cannot escape
 *   tap-nudge tap a curve to select it, then the arrows below the canvas move it by 5
 *   keyboard  focus a curve, then arrow keys — same 5-unit step, for screen readers
 *
 * Two things that look like details and are not:
 *   · Only a real drag re-renders on pointerup. Re-rendering unconditionally detached the
 *     node the click event was about to fire on, so shading silently did nothing.
 *   · The drag hit-areas exist only in step 1. They are 22 units wide and sat on top of the
 *     intersection the student has to click in step 2.
 */

const PLOT = { left: 58, right: 22, top: 22, bottom: 48, w: 560, h: 420 };
const STEP = 5;

export default function DiagramDrawDrill({ spec, onResult }) {
  const svgRef = useRef(null);
  const dragRef = useRef(null);
  const [shifts, setShifts] = useState({});
  const [equilibrium, setEquilibrium] = useState(null);
  const [shaded, setShaded] = useState([]);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const xMax = spec.axes.x.max;
  const yMax = spec.axes.y.max;
  const plotW = PLOT.w - PLOT.left - PLOT.right;
  const plotH = PLOT.h - PLOT.top - PLOT.bottom;
  const X = useCallback((q) => PLOT.left + (q * plotW) / xMax, [plotW, xMax]);
  const Y = useCallback((p) => PLOT.h - PLOT.bottom - (p * plotH) / yMax, [plotH, yMax]);
  const toQ = useCallback((x) => ((x - PLOT.left) * xMax) / plotW, [plotW, xMax]);
  const toP = useCallback((y) => ((PLOT.h - PLOT.bottom - y) * yMax) / plotH, [plotH, yMax]);

  const own = applyShifts(spec.curves, shifts);
  const before = intersect(spec.curves.D, spec.curves.S);
  const after = intersect(own.D, own.S);
  const moved = Object.keys(spec.curves).filter((n) => Math.abs(shifts[n] || 0) >= STEP);
  const regions = moved.length && after ? buildRegions(spec.regions, spec.curves, own) : null;

  const reset = () => {
    setShifts({}); setEquilibrium(null); setShaded([]); setStep(1); setSelected(null); setResult(null);
  };

  const showModel = () => {
    const m = modelAttempt(spec);
    setShifts(m.shifts); setEquilibrium(m.equilibrium); setShaded(m.shaded);
    setStep(3); setResult(mark(spec, m));
  };

  const doMark = () => {
    const r = mark(spec, { shifts, equilibrium, shaded });
    setResult(r);
    if (onResult) onResult(r);
  };

  const nudge = (curve, direction) => {
    if (result) return;
    setShifts((s) => ({ ...s, [curve]: Math.max(-55, Math.min(55, (s[curve] || 0) + direction * STEP)) }));
    setEquilibrium(null);
    if (step === 1) setStep(1);
  };

  // advance as each step is satisfied, without trapping the student
  useEffect(() => {
    if (result) return;
    if (step === 1 && moved.length) setStep(2);
    else if (step === 2 && equilibrium) setStep(3);
  }, [moved.length, equilibrium, step, result]);

  const svgPoint = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const k = PLOT.w / rect.width;
    return { x: (e.clientX - rect.left) * k, y: (e.clientY - rect.top) * k };
  };

  const onPointerDown = (e) => {
    const hit = e.target.closest('[data-curve]');
    if (!hit || step !== 1 || result) return;
    const name = hit.dataset.curve;
    const pt = svgPoint(e);
    dragRef.current = { name, q: toQ(pt.x), p: toP(pt.y), base: shifts[name] || 0, moved: false };
    setSelected(name);
    svgRef.current.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    const pt = svgPoint(e);
    const delta = interceptDelta(spec.curves[drag.name], toQ(pt.x) - drag.q, toP(pt.y) - drag.p);
    const next = Math.max(-55, Math.min(55, Math.round((drag.base + delta) / STEP) * STEP));
    if (next !== (shifts[drag.name] || 0)) {
      drag.moved = true;
      setShifts((s) => ({ ...s, [drag.name]: next }));
      setEquilibrium(null);
    }
  };

  const onPointerUp = () => { dragRef.current = null; };

  const onSvgClick = (e) => {
    if (result) return;
    if (step === 2) {
      if (e.target.closest('[data-curve]')) return;
      const pt = svgPoint(e);
      const q = toQ(pt.x);
      const p = toP(pt.y);
      if (q < 0 || q > xMax || p < 0 || p > yMax) return;
      const snap = after && Math.abs(q - after.q) <= spec.tolerance.q && Math.abs(p - after.p) <= spec.tolerance.p;
      setEquilibrium(snap ? { q: after.q, p: after.p, snapped: true } : { q, p, snapped: false });
    } else if (step === 3) {
      const region = e.target.closest('[data-region]');
      if (!region) return;
      const key = region.dataset.region;
      setShaded((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]));
    }
  };

  const onKeyDown = (e) => {
    const hit = e.target.closest('[data-curve]');
    if (!hit || step !== 1 || result) return;
    const dir = e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? 1 : e.key === 'ArrowDown' || e.key === 'ArrowRight' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    nudge(hit.dataset.curve, dir);
  };

  // ── labels: rendered once, measured, then moved so none can overlap ──
  const labelRefs = useRef({});
  const [placed, setPlaced] = useState({});
  useEffect(() => {
    const entries = Object.entries(labelRefs.current).filter(([, node]) => node);
    if (!entries.length) return;
    const labels = entries.map(([id, node]) => ({
      id,
      box: node.getBBox(),
      slide: node.dataset.slide === 'x'
        ? { axis: 'x', limit: Number(node.dataset.limit) || PLOT.w - 4 }
        : node.dataset.slide === 'y'
          ? { axis: 'y', rows: 5 }
          : { axis: 'y', rows: 2, both: true, alsoX: true },
      optional: node.dataset.optional === '1',
    }));
    const fixed = [...svgRef.current.querySelectorAll('.' + styles.tick + ', .' + styles.axisTitle)].map((n) => n.getBBox());
    const out = placeLabels(labels, { bounds: { width: PLOT.w, height: PLOT.h }, fixed });
    setPlaced(Object.fromEntries(out.map((p) => [p.id, p])));
  }, [shifts, equilibrium, shaded, result, step]);

  const L = (id) => placed[id] || { dx: 0, dy: 0, hidden: false };

  const seg = (curve) => {
    const qEnd = curve.slope > 0
      ? Math.min(xMax - 10, (yMax - 2 - curve.intercept) / curve.slope)
      : Math.min(xMax - 5, (curve.intercept - 5) / -curve.slope);
    const q0 = curve.intercept < 0 && curve.slope > 0 ? -curve.intercept / curve.slope : 0;
    return { x1: X(q0), y1: Y(curve.intercept + curve.slope * q0), x2: X(qEnd), y2: Y(curve.intercept + curve.slope * qEnd), qEnd };
  };

  const prompts = {
    1: ['Step 1', 'Drag the curve that moves. On a phone, tap it and use the arrows below.'],
    2: ['Step 2', 'Tap where the market now clears. It snaps if you are close enough.'],
    3: ['Step 3', 'Tap the area that represents the welfare loss. Tap again to unshade.'],
  };
  const [promptKey, promptText] = result
    ? ['Marked', 'Every judgement is a number comparison. Reset and try a wrong answer — the feedback changes with the mistake.']
    : prompts[step];

  const baseSeg = { D: seg(spec.curves.D), S: seg(spec.curves.S) };
  const ownSeg = { D: seg(own.D), S: seg(own.S) };
  const showRegions = (step === 3 || result) && regions;

  return (
    <section className={styles.drill} aria-label={spec.title}>
      <div className={styles.meta}>
        <span className={styles.chip}>{spec.unit} · {spec.specCode}</span>
        <span className={`${styles.chip} ${styles.grey}`}>{spec.topic}</span>
        <span className={`${styles.chip} ${styles.marks}`}>{result ? `${result.awarded}/${result.total}` : `${3 + (spec.expect.regions ? 1 : 0)} marks`}</span>
      </div>

      <p className={styles.prompt}>
        {spec.prompt.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>))}
      </p>

      <div className={styles.steps} role="group" aria-label="Steps">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            type="button"
            className={`${styles.stepBtn} ${step === n ? styles.current : ''} ${(n === 1 && moved.length) || (n === 2 && equilibrium) || (n === 3 && shaded.length) ? styles.done : ''}`}
            aria-current={step === n}
            onClick={() => { if (n === 1 || (n === 2 && moved.length) || (n === 3 && equilibrium)) setStep(n); }}
          >
            <span className={styles.stepNum}>{n}</span>
            {['Shift a curve', 'Mark the equilibrium', 'Shade the loss'][n - 1]}
          </button>
        ))}
      </div>

      <div className={styles.hint}><span className={styles.hintKey}>{promptKey}</span><span>{promptText}</span></div>

      <svg
        ref={svgRef}
        className={`${styles.plot} ${step === 3 && !result ? styles.shading : ''}`}
        viewBox={`0 0 ${PLOT.w} ${PLOT.h}`}
        role="img"
        aria-label={`${spec.title}. ${moved.length ? `${moved[0]} shifted by ${shifts[moved[0]]}.` : 'No curve moved yet.'} ${equilibrium ? `Equilibrium marked at quantity ${Math.round(equilibrium.q)}, price ${Math.round(equilibrium.p)}.` : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={onSvgClick}
        onKeyDown={onKeyDown}
      >
        {/* grid and axes */}
        {Array.from({ length: Math.floor(yMax / 20) }, (_, i) => (i + 1) * 20).map((p) => (
          <line key={`gy${p}`} className={styles.grid} x1={X(0)} y1={Y(p)} x2={X(xMax)} y2={Y(p)} />
        ))}
        {Array.from({ length: Math.floor(xMax / 20) }, (_, i) => (i + 1) * 20).map((q) => (
          <line key={`gx${q}`} className={styles.grid} x1={X(q)} y1={Y(0)} x2={X(q)} y2={Y(yMax)} />
        ))}
        <line className={styles.axis} x1={X(0)} y1={Y(0)} x2={X(xMax)} y2={Y(0)} />
        <line className={styles.axis} x1={X(0)} y1={Y(0)} x2={X(0)} y2={Y(yMax)} />
        {Array.from({ length: Math.floor(yMax / 20) + 1 }, (_, i) => i * 20).map((p) => (
          <text key={`ty${p}`} className={styles.tick} x={X(0) - 8} y={Y(p) + 3.5} textAnchor="end">{p}</text>
        ))}
        {Array.from({ length: Math.floor(xMax / 20) + 1 }, (_, i) => i * 20).map((q) => (
          <text key={`tx${q}`} className={styles.tick} x={X(q)} y={Y(0) + 16} textAnchor="middle">{q}</text>
        ))}
        <text className={styles.axisTitle} x={X(xMax / 2)} y={PLOT.h - 8} textAnchor="middle">{spec.axes.x.label}</text>
        <text className={styles.axisTitle} transform={`translate(16 ${Y(yMax / 2)}) rotate(-90)`} textAnchor="middle">{spec.axes.y.label}</text>

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

        {/* original curves, ghosted once moved */}
        {moved.map((name) => (
          <line key={`ghost${name}`} className={`${styles.curve} ${styles.ghost}`}
            x1={baseSeg[name].x1} y1={baseSeg[name].y1} x2={baseSeg[name].x2} y2={baseSeg[name].y2} />
        ))}
        <line className={`${styles.curve} ${styles.demand}`} x1={ownSeg.D.x1} y1={ownSeg.D.y1} x2={ownSeg.D.x2} y2={ownSeg.D.y2} />
        <line className={`${styles.curve} ${moved.includes('S') ? styles.shifted : styles.supply}`}
          x1={ownSeg.S.x1} y1={ownSeg.S.y1} x2={ownSeg.S.x2} y2={ownSeg.S.y2} />

        {/* guides */}
        {before && <>
          <line className={styles.guide} x1={X(0)} y1={Y(before.p)} x2={X(before.q)} y2={Y(before.p)} />
          <line className={styles.guide} x1={X(before.q)} y1={Y(0)} x2={X(before.q)} y2={Y(before.p)} />
          <circle className={styles.dot} cx={X(before.q)} cy={Y(before.p)} r="4.5" />
        </>}
        {equilibrium && <>
          <line className={styles.guide} x1={X(0)} y1={Y(equilibrium.p)} x2={X(equilibrium.q)} y2={Y(equilibrium.p)} />
          <line className={styles.guide} x1={X(equilibrium.q)} y1={Y(0)} x2={X(equilibrium.q)} y2={Y(equilibrium.p)} />
          <circle className={`${styles.dot} ${equilibrium.snapped ? '' : styles.dotOff}`} cx={X(equilibrium.q)} cy={Y(equilibrium.p)} r="4.5" />
        </>}

        {/* drag targets — step 1 only, or they swallow the step-2 click */}
        {step === 1 && !result && ['D', 'S'].map((name) => (
          <line key={`hit${name}`} className={`${styles.hit} ${selected === name ? styles.hitOn : ''}`}
            data-curve={name} tabIndex={0} role="button"
            aria-label={`${name === 'D' ? 'Demand' : 'Supply'} curve. Drag it, or use the arrow keys to shift it.`}
            x1={ownSeg[name].x1} y1={ownSeg[name].y1} x2={ownSeg[name].x2} y2={ownSeg[name].y2} />
        ))}

        {/* labels, placed after measurement */}
        {before && <>
          <text ref={(n) => { labelRefs.current.P1 = n; }} data-slide="x" data-limit={X(before.q)}
            className={styles.eqLabel} x={X(0) + 7 + L('P1').dx} y={Y(before.p) - 6 + L('P1').dy}>P₁ {Math.round(before.p)}</text>
          <text ref={(n) => { labelRefs.current.Q1 = n; }} data-slide="y"
            className={styles.eqLabel} x={X(before.q) + 6 + L('Q1').dx} y={Y(0) - 7 + L('Q1').dy}>Q₁ {Math.round(before.q)}</text>
        </>}
        {equilibrium && <>
          <text ref={(n) => { labelRefs.current.P2 = n; }} data-slide="x" data-limit={X(equilibrium.q)}
            className={`${styles.eqLabel} ${equilibrium.snapped ? '' : styles.labelOff}`}
            x={X(0) + 7 + L('P2').dx} y={Y(equilibrium.p) - 6 + L('P2').dy}>P₂ {Math.round(equilibrium.p)}</text>
          <text ref={(n) => { labelRefs.current.Q2 = n; }} data-slide="y"
            className={`${styles.eqLabel} ${equilibrium.snapped ? '' : styles.labelOff}`}
            x={X(equilibrium.q) + 6 + L('Q2').dx} y={Y(0) - 7 + L('Q2').dy}>Q₂ {Math.round(equilibrium.q)}</text>
        </>}
        <text ref={(n) => { labelRefs.current.D = n; }} className={`${styles.curveLabel} ${styles.demandFill}`}
          x={ownSeg.D.x2 - 6 + L('D').dx} y={ownSeg.D.y2 - 9 + L('D').dy} textAnchor="end">D</text>
        <text ref={(n) => { labelRefs.current.S = n; }}
          className={`${styles.curveLabel} ${moved.includes('S') ? styles.shiftedFill : styles.supplyFill}`}
          x={ownSeg.S.x2 - 6 + L('S').dx} y={ownSeg.S.y2 + (ownSeg.S.qEnd < xMax * 0.85 ? 18 : -9) + L('S').dy} textAnchor="end">
          S{moved.includes('S') ? '₂' : ''}</text>
        {moved.includes('S') && (
          <text ref={(n) => { labelRefs.current.S1 = n; }} className={`${styles.curveLabel} ${styles.ghostFill}`}
            x={baseSeg.S.x2 - 4 + L('S1').dx} y={baseSeg.S.y2 - 9 + L('S1').dy} textAnchor="end">S₁</text>
        )}
      </svg>

      {/* tap-to-nudge: the phone path, and the one a drag cannot replace */}
      {step === 1 && !result && (
        <div className={styles.nudge}>
          <span className={styles.nudgeLabel}>{selected ? `${selected === 'D' ? 'Demand' : 'Supply'} selected` : 'Tap a curve, then:'}</span>
          <button type="button" className={styles.nudgeBtn} disabled={!selected} onClick={() => nudge(selected, 1)} aria-label="Shift up and left">↖ up / left</button>
          <button type="button" className={styles.nudgeBtn} disabled={!selected} onClick={() => nudge(selected, -1)} aria-label="Shift down and right">↘ down / right</button>
          {selected && <span className={styles.nudgeValue}>{shifts[selected] > 0 ? '+' : ''}{shifts[selected] || 0}</span>}
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
        <button type="button" className={styles.btn} onClick={reset}>Reset</button>
      </div>
    </section>
  );
}
