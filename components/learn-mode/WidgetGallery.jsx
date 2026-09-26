"use client";
import { useState } from 'react';
import { RECALL_FIXTURES, LABEL_DRILL_SVG } from '@/lib/recall-fixtures';
import ReorderRecall from './ReorderRecall';
import FillInRecall from './FillInRecall';
import MatchRecall from './MatchRecall';
import ClassifyRecall from './ClassifyRecall';
import DiagramRecall from './DiagramRecall';
import DiagramLabelDrill from './DiagramLabelDrill';

const WIDGETS = { reorder: ReorderRecall, fillin: FillInRecall, match: MatchRecall, classify: ClassifyRecall, diagram: DiagramRecall };

/**
 * The widget gallery, packet 7 (W003), and the drawing drill since 13.7. One exemplar of each
 * recall type and the label drill, from
 * lib/recall-fixtures.js, with the same props the Learn Mode engine passes. "Spaced" remounts every
 * widget in its second-showing order. The log at the bottom is what each widget reported to the engine.
 */
export default function WidgetGallery() {
  const [showing, setShowing] = useState('first');
  const [log, setLog] = useState([]);
  const [drill, setDrill] = useState(true);
  const note = (m) => setLog((l) => [...l, m]);
  return (
    <div className="lm-gallery">
      <h1 className="lm-gallery-title">Recall widgets</h1>
      <p className="lm-gallery-intro">
        The five recall types a section can carry, rendered from <code>lib/recall-fixtures.js</code> exactly as Learn Mode
        renders them. Authors copy these shapes; the contract is in <code>audit/CONTENT-GATE.md</code>.
      </p>
      <div className="lm-gallery-controls" role="group" aria-label="Showing">
        <button type="button" className={`lm-recall-hint-btn ${showing === 'first' ? 'active' : ''}`} aria-pressed={showing === 'first'} onClick={() => setShowing('first')}>First showing</button>
        <button type="button" className={`lm-recall-hint-btn ${showing === 'spaced' ? 'active' : ''}`} aria-pressed={showing === 'spaced'} onClick={() => setShowing('spaced')}>Spaced showing</button>
      </div>
      {Object.entries(WIDGETS).map(([type, Widget]) => (
        <section key={`${type}-${showing}`} className="lm-gallery-section" aria-label={type}>
          <h2 className="lm-gallery-heading">{type}</h2>
          <div className="lm-content">
            <Widget recall={RECALL_FIXTURES[type]} showing={showing}
              pool={['utility', 'diminishes', 'downward', 'movement', 'shift']}
              onComplete={(ok) => note(`${type}: first check ${ok ? 'all correct' : 'not all correct'}`)}
              onSkip={() => note(`${type}: skipped`)} />
          </div>
        </section>
      ))}
      <section className="lm-gallery-section" aria-label="label drill">
        <h2 className="lm-gallery-heading">Label this diagram</h2>
        <div className="lm-content">
          {drill
            ? <DiagramLabelDrill svgString={LABEL_DRILL_SVG} onClose={() => { note('drill: closed'); setDrill(false); }} />
            : <button type="button" className="lm-label-drill-toggle" onClick={() => setDrill(true)}>&#127919; Label this diagram</button>}
        </div>
      </section>
      <section className="lm-gallery-section" aria-label="engine log">
        <h2 className="lm-gallery-heading">Reported to the engine</h2>
        <pre className="lm-gallery-log">{log.length ? log.join('\n') : '(nothing yet)'}</pre>
      </section>
    </div>
  );
}
