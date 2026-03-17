"use client";
import { useState } from 'react';
import InteractiveDiagram from './InteractiveDiagram';
import DiagramLabelDrill from './DiagramLabelDrill';

/* ── Inline Diagram Card ── */
export default function InlineDiagram({ diagram }) {
  const [activeScenario, setActiveScenario] = useState(0);
  const [showLabelDrill, setShowLabelDrill] = useState(false);
  const scenarios = diagram.scenarios || [{ label: 'Default', svg: diagram.svg }];
  const currentSvg = scenarios[activeScenario]?.svg || diagram.svg;

  // Check if SVG has draggable labels (new v2 format) or any text (legacy)
  const hasDraggableLabels = currentSvg && /class="draggable"/.test(currentSvg);
  const hasTextLabels = hasDraggableLabels || (currentSvg && /<text[\s>]/i.test(currentSvg));

  return (
    <div className="lm-diagram-card">
      <div className="lm-card-label">&#128202; Diagram</div>
      <div className="lm-diagram-inner">
        <h3 className="diagram-title">{diagram.title}</h3>
        {diagram.description && <p className="diagram-description">{diagram.description}</p>}
        {scenarios.length > 1 && (
          <div className="scenario-switcher">
            {scenarios.map((s, i) => (
              <button key={i} className={`scenario-btn ${activeScenario === i ? 'active' : ''}`} onClick={() => setActiveScenario(i)}>
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Interactive diagram with hover highlighting */}
        {showLabelDrill ? (
          <DiagramLabelDrill
            svgString={currentSvg}
            onClose={() => setShowLabelDrill(false)}
          />
        ) : (
          <InteractiveDiagram svgString={currentSvg} />
        )}

        {/* Label drill toggle button */}
        {hasTextLabels && !showLabelDrill && (
          <button
            className="lm-label-drill-toggle"
            onClick={() => setShowLabelDrill(true)}
          >
            {'\u{1F3AF}'} Label this diagram yourself
          </button>
        )}

        {diagram.checklist && (
          <div className="diagram-checklist">
            <div className="diagram-checklist-title">What examiners look for</div>
            <ul>{diagram.checklist.map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
