"use client";
import { useState } from 'react';
import { getSpec } from '@/lib/diagram/index.mjs';
import DiagramDrawDrill from '@/components/diagram/DiagramDrawDrill';
import styles from './DiagramRecall.module.css';

/**
 * The drawing drill as a recall widget (packet 13.2).
 *
 * A subsection authored with `recall: { type: 'diagram', specId: 'indirect-tax' }` gets the drill on
 * its own step, and the spaced pick brings it back a few steps later — the same path as the other four
 * types, so nothing in lib/learn-steps had to learn about diagrams.
 *
 * Two contract points this adapter exists to satisfy:
 *
 *   · One score, reported once. The drill's Mark button disables itself after marking, so `onResult`
 *     fires exactly once, and full marks is what counts as recalled. Partial credit is shown to the
 *     student in the mark scheme but is not what the engine records — a recall is binary.
 *   · Skip. Every other widget offers one (F055: a skipped recall comes back ahead of the default
 *     pick), so this one does too, and it disappears once the drill has been marked.
 *
 * A specId naming nothing is a content error, not a runtime one: lib/content-validator.mjs blocks it
 * at authoring time. The guard here is for the case where a spec is deleted while content still
 * points at it, and it says so rather than rendering an empty step.
 */
export default function DiagramRecall({ recall, onComplete, onSkip }) {
  const [done, setDone] = useState(false);

  let spec = null;
  try {
    spec = getSpec(recall.specId);
  } catch {
    return (
      <div className={styles.missing} role="note">
        This drawing drill is unavailable: no diagram spec named “{String(recall.specId)}”.
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <DiagramDrawDrill
        spec={spec}
        onResult={(result) => {
          if (done) return;
          setDone(true);
          onComplete?.(result.awarded === result.total);
        }}
      />
      {!done && onSkip && (
        <button type="button" className={styles.skip} onClick={() => { setDone(true); onSkip(); }}>
          Skip this one
        </button>
      )}
    </div>
  );
}
