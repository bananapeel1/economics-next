"use client";
import { useState } from 'react';
import InteractiveDiagram from './InteractiveDiagram';

/* ── Inline Diagram Card ── */
export default function InlineDiagram({ diagram }) {
  const [activeScenario, setActiveScenario] = useState(0);
  const scenarios = diagram.scenarios || [{ label: 'Default', svg: diagram.svg }];
  const currentSvg = scenarios[activeScenario]?.svg || diagram.svg;
  const hasImage = !!diagram.imageUrl;

  return (
    <div className="lm-diagram-card">
      <div className="lm-card-label">&#128202; Diagram</div>
      <div className="lm-diagram-inner">
        <h3 className="diagram-title">{diagram.title}</h3>
        {diagram.description && <p className="diagram-description">{diagram.description}</p>}
        {!hasImage && scenarios.length > 1 && (
          <div className="scenario-switcher">
            {scenarios.map((s, i) => (
              <button key={i} className={`scenario-btn ${activeScenario === i ? 'active' : ''}`} onClick={() => setActiveScenario(i)}>
                {s.label}
              </button>
            ))}
          </div>
        )}

        {hasImage ? (
          <div className="lm-interactive-svg-wrapper">
            <img src={diagram.imageUrl} alt={diagram.title} />
          </div>
        ) : (
          <InteractiveDiagram svgString={currentSvg} />
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
