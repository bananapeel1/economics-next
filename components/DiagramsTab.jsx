"use client";
import { useState, useRef, useEffect } from 'react';
import processSvg from './learn-mode/processSvg';

export default function DiagramsTab({ data }) {
  if (!data || !data.length) {
    return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No diagrams available.</div>;
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
  const svgRef = useRef(null);

  const scenarios = diagram.scenarios || [{ label: 'Default', svg: diagram.svg }];
  const currentSvg = scenarios[activeScenario]?.svg || diagram.svg;

  // Post-process SVG after render for quality fixes
  useEffect(() => {
    if (!svgRef.current || !currentSvg) return;
    svgRef.current.innerHTML = currentSvg;
    const svgEl = svgRef.current.querySelector('svg');
    if (svgEl) processSvg(svgEl);
  }, [currentSvg]);

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

      <div className="diagram-svg-wrapper" ref={svgRef} />

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
