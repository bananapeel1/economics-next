"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import processSvg from './learn-mode/processSvg';
import DiagramEnlarge from './learn-mode/DiagramEnlarge';
import ReportProblem from './feedback/ReportProblem';

export default function DiagramsTab({ data, sectionId }) {
  if (!data || !data.length) {
    return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No diagrams available.</div>;
  }

  return (
    <div>
      {data.map((diagram, i) => (
        <DiagramCard key={i} diagram={diagram} sectionId={sectionId} />
      ))}
    </div>
  );
}

function DiagramCard({ diagram, sectionId }) {
  const [activeScenario, setActiveScenario] = useState(0);
  const svgRef = useRef(null);
  /* V037. This tab had no enlarge at all — no click handler, no sheet, no hint, `cursor: auto` —
     while Learn Mode, which shows the same SVGs through the same processSvg, has had one since
     packet 5. Measured at 375x812 on 21 September, a card here renders at 291px with labels of
     6.98-8.73px against 16px body copy. The tab is advertised on the section hub as "Diagrams ·
     All annotated"; the annotations were unreadable and there was nothing to tap. */
  const [enlarged, setEnlarged] = useState(false);
  const handleEnlarge = useCallback(() => setEnlarged(true), []);

  const hasImage = !!diagram.imageUrl;
  const scenarios = diagram.scenarios || [{ label: 'Default', svg: diagram.svg }];
  const currentSvg = scenarios[activeScenario]?.svg || diagram.svg;
  // See the note in learn-mode/InlineDiagram.jsx: a reference table borrows this component because
  // the schema has no other surface for a grid, and must not inherit a diagram's furniture.
  const isTable = diagram.kind === 'table';

  // Post-process SVG after render for quality fixes
  useEffect(() => {
    if (!svgRef.current || !currentSvg || hasImage) return;
    svgRef.current.innerHTML = currentSvg;
    const svgEl = svgRef.current.querySelector('svg');
    if (svgEl) processSvg(svgEl);
  }, [currentSvg, hasImage]);

  return (
    <div className={`diagram-container${isTable ? ' lm-diagram-table' : ''}`}>
      <h3 className="diagram-title">{diagram.title}</h3>
      {diagram.description && <p className="diagram-description">{diagram.description}</p>}

      {!hasImage && scenarios.length > 1 && (
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

      {hasImage ? (
        <div className="diagram-svg-wrapper lm-diagram-clickable" onClick={handleEnlarge}>
          <img src={diagram.imageUrl} alt={diagram.title} />
        </div>
      ) : (
        <div className="diagram-svg-wrapper lm-diagram-clickable" ref={svgRef} onClick={handleEnlarge} />
      )}
      <button type="button" className="lm-diagram-enlarge-btn" onClick={handleEnlarge}>
        Enlarge diagram
      </button>

      {diagram.checklist && !isTable && (
        <div className="diagram-checklist">
          {/* Not "what examiners look for": that is the uncited claim about marking the content gate
              blocks in prose (claim.uncited), printed by the app itself over every diagram in the
              product. The checklist says what a correct diagram contains, which is checkable. */}
            <div className="diagram-checklist-title">What a correct diagram shows</div>
          <ul>
            {diagram.checklist.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {sectionId && (
        <div className="rp-slot">
          <ReportProblem target={{
            surface: 'diagram',
            sectionId,
            itemId: diagram.id ?? null,
            label: diagram.title,
            // The scenario matters only when there is more than one to choose between.
              rendered: { stem: diagram.title, scenario: scenarios.length > 1 ? (scenarios[activeScenario]?.label ?? null) : null },
          }} />
        </div>
      )}

      {enlarged && (
        <DiagramEnlarge
          svgRef={svgRef}
          imageUrl={hasImage ? diagram.imageUrl : null}
          title={diagram.title}
          onClose={() => setEnlarged(false)}
        />
      )}
    </div>
  );
}
