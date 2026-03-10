"use client";
import { useState } from 'react';

export default function DiagramsTab({ data }) {
  if (!data || !data.length) {
    return <div style={{ color: '#6b7a99', textAlign: 'center', padding: 40 }}>No diagrams available.</div>;
  }

  return (
    <div>
      {data.map((diagram, i) => (
        <DiagramCard key={i} diagram={diagram} />
      ))}
    </div>
  );
}

function DiagramCard({ diagram }) {
  const [activeScenario, setActiveScenario] = useState(0);

  const scenarios = diagram.scenarios || [{ label: 'Default', svg: diagram.svg }];
  const currentSvg = scenarios[activeScenario]?.svg || diagram.svg;

  return (
    <div className="diagram-container">
      <h3 className="diagram-title">{diagram.title}</h3>
      {diagram.description && <p className="diagram-description">{diagram.description}</p>}

      {scenarios.length > 1 && (
        <div className="scenario-switcher">
          {scenarios.map((s, i) => (
            <button
              key={i}
              className={`scenario-btn ${activeScenario === i ? 'active' : ''}`}
              onClick={() => setActiveScenario(i)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div className="diagram-svg-wrapper" dangerouslySetInnerHTML={{ __html: currentSvg }} />

      {diagram.checklist && (
        <div className="diagram-checklist">
          <div className="diagram-checklist-title">What examiners look for</div>
          <ul>
            {diagram.checklist.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
