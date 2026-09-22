"use client";
import { useState } from 'react';
import { markItem } from '@/lib/quant/index.mjs';
import styles from './CalculationItem.module.css';

/**
 * One quantitative drill item: a stem, a step per mark-scheme line, and marking.
 *
 * Bold in the stem is rendered by splitting on `**` rather than through
 * parseInlineMarkdown + dangerouslySetInnerHTML. The stems are generated here so the
 * injection risk is theoretical, but F071 is already open against unescaped content
 * HTML and there is no reason for a new component to join it.
 */
function Rich({ text }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>));
}

/**
 * Callers pass key={item.id} so a new seed remounts with empty inputs.
 *
 * `onReseed` is optional and adds the "New figures" button (packet 13.2). /admin/quant draws
 * its own reseed control outside this component and does not pass it; the student surfaces do,
 * because the claim being made to a student — come back and the numbers will have changed —
 * is only visible if they can see it happen.
 */
export default function CalculationItem({ item, onResult, onReseed }) {
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const set = (id, value) => {
    setResponses((r) => ({ ...r, [id]: value }));
    if (result) setResult(null);
  };

  const mark = () => {
    const marked = markItem(item, responses);
    setResult(marked);
    setShowSolution(false);
    if (onResult) onResult(marked);
  };

  const verdict = !result
    ? 'Answer the steps, then mark your working. A wrong figure carried correctly into the next step still earns its mark — the same own figure rule an examiner applies.'
    : result.usedOfr
      ? 'Own figure rule applied: a step built correctly on an earlier wrong answer still scored. Nothing here needed a model — it is arithmetic against a tolerance.'
      : result.awarded === result.total
        ? 'Full marks. A new seed gives a fresh set of figures from the same template, so the method is the only thing worth memorising.'
        : 'Marked against the method, not just the final number. Each wrong answer is checked against the usual slips before it scores zero.';

  return (
    <section className={styles.item} aria-label={item.title}>
      <div className={styles.meta}>
        <span className={styles.chip}>{item.unit} · {item.specCode}</span>
        <span className={`${styles.chip} ${styles.grey}`}>{item.topic}</span>
        <span className={`${styles.chip} ${styles.marks}`}>{item.marks} marks</span>
        {result && (
          <span className={styles.score} role="status">
            {result.awarded}/{result.total}
          </span>
        )}
      </div>

      <p className={styles.stem}><Rich text={item.stem} /></p>

      <div className={styles.steps}>
        {item.steps.map((step) => {
          const r = result?.steps[step.id];
          const state = r ? (r.awarded === r.marks ? 'ok' : 'no') : '';
          return (
            <div className={styles.step} key={step.id}>
              <div className={styles.labels}>
                <label className={styles.label} htmlFor={`${item.id}-${step.id}`}>{step.label}</label>
                <span className={styles.method}>{step.method} · {step.marks} mark{step.marks > 1 ? 's' : ''}</span>
              </div>

              {step.type === 'choice' ? (
                <div className={styles.choices} role="group" aria-label={step.label}>
                  {step.choices.map((choice) => (
                    <button
                      type="button"
                      key={choice}
                      className={styles.choice}
                      aria-pressed={responses[step.id] === choice}
                      onClick={() => set(step.id, choice)}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              ) : (
                <div className={`${styles.field} ${state ? styles[state] : ''}`}>
                  {step.prefix && <span className={styles.affix}>{step.prefix}</span>}
                  <input
                    id={`${item.id}-${step.id}`}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={responses[step.id] ?? ''}
                    onChange={(e) => set(step.id, e.target.value)}
                  />
                  {step.suffix && <span className={styles.affix}>{step.suffix}</span>}
                </div>
              )}

              {r && (
                <p className={`${styles.feedback} ${r.awarded === r.marks ? styles.ok : styles.no}`}>
                  {r.outcome === 'ofr' && <span className={styles.tag}>own figure rule</span>}
                  {r.note}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className={styles.verdict}>{verdict}</p>

      <div className={styles.actions}>
        <button type="button" className={`${styles.btn} ${styles.primary}`} onClick={mark}>Mark my working</button>
        <button type="button" className={styles.btn} onClick={() => setShowSolution((s) => !s)}>
          {showSolution ? 'Hide worked solution' : 'Worked solution'}
        </button>
        {onReseed && (
          <button type="button" className={styles.btn} onClick={onReseed}>New figures</button>
        )}
      </div>

      {showSolution && (
        <div className={styles.solution}>
          {item.solution.map((line, i) => (
            <p className={styles.line} key={i}><Rich text={line} /></p>
          ))}
        </div>
      )}
    </section>
  );
}
