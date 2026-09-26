"use client";
import { useState } from 'react';
import { getSpec } from '@/lib/diagram/index.mjs';
import DiagramDrawDrill from '@/components/diagram/DiagramDrawDrill';
import { RecallFrame } from './RecallFrame';
import styles from './DiagramRecall.module.css';

/**
 * The drawing drill as a recall widget (packet 13.7 part 1).
 *
 * A subsection authored with `recall: { type: 'diagram', specId: 'indirect-tax' }` gets the drill on
 * its own step, and the spaced pick brings it back a few steps later — the same path as the other four
 * types, so nothing in lib/learn-steps had to learn about diagrams.
 *
 * IT SITS IN RecallFrame LIKE THE OTHER FOUR, and the first version of this file did not. That was a
 * real defect, not a cosmetic one: the frame REPLACES the card when a check is skipped, and a drill
 * rendered beside its own skip button stayed live underneath it. Skip, then draw it correctly, then
 * Mark — and the score went nowhere, because the adapter had already latched. The engine handles that
 * sequence properly (LearnModeTab.jsx:198 un-skips a recall the student later answers); this widget
 * was the only thing standing between the student and it. Unmounting the drill on skip removes the
 * sequence rather than guarding it.
 *
 * ONE SCORE, ONCE. `done` is what guarantees that, not the drill's own Mark button: that button is
 * disabled on `result` (DiagramDrawDrill.jsx:341) and Reset clears `result`, so the drill can and does
 * report more than once by design — Reset is how a student retries. The flag here is what the engine
 * sees, and full marks is what counts as recalled. Partial credit is shown to the student in the mark
 * scheme but is not what the engine records: a recall is binary.
 *
 * A specId naming nothing is a content error, not a runtime one: lib/content-validator.mjs blocks it
 * at authoring time. The guard here is for the case where a spec is deleted while content still
 * points at it, and it says so rather than rendering an empty step.
 */
export default function DiagramRecall({ recall, showing = 'first', onComplete, onSkip }) {
  const [done, setDone] = useState(false);
  const [skipped, setSkipped] = useState(false);

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

  // No `prompt`: the drill renders the spec's own prompt (DiagramDrawDrill.jsx:192), and passing it
  // here would print the question twice.
  return (
    <RecallFrame label="Draw it" showing={showing} skipped={skipped}
      onSkip={onSkip ? () => { onSkip(); setSkipped(true); } : undefined}>
      <DiagramDrawDrill
        spec={spec}
        onResult={(result) => {
          if (done) return;
          setDone(true);
          onComplete?.(result.awarded === result.total);
        }}
      />
    </RecallFrame>
  );
}
