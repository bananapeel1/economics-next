"use client";
import DiagramChecklist from './DiagramChecklist';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import processSvg from './learn-mode/processSvg';
import DiagramEnlarge from './learn-mode/DiagramEnlarge';
import DiagramLabelDrill from './learn-mode/DiagramLabelDrill';
import DiagramDrawDrill from './diagram/DiagramDrawDrill';
import ReportProblem from './feedback/ReportProblem';
import { diagramSpecsForSection, specMatchScore } from '@/lib/diagram-pool';
import { subjectFrom } from '@/lib/ial-commands';

/**
 * Packet 13.7: "practise drawing this". A drawing drill whose spec claims this section
 * (lib/diagram-pool.js) sits under the diagram it drills — matched on the words the two titles
 * share, each drill under one card at most — and a drill no card matches gets a card of its own at
 * the end, so every drill the section has is reachable here even when Learn Mode had no free
 * check-in for it. The label drill (F061) rides along exactly as it does in Learn Mode.
 */
function attachDrills(diagrams, drills) {
  const byCard = new Map();
  const left = [];
  for (const spec of drills) {
    let best = -1;
    let bestScore = 0;
    diagrams.forEach((d, i) => {
      if (byCard.has(i) || d.kind === 'table') return;
      // The same matcher Learn Mode places drills with: plurals folded, the spec's placeWith counted.
      const score = specMatchScore(spec, d.title);
      if (score > bestScore) { bestScore = score; best = i; }
    });
    if (best >= 0) byCard.set(best, spec); else left.push(spec);
  }
  return { byCard, left };
}

export default function DiagramsTab({ data, sectionId, unitCode = '', sectionNumber = '' }) {
  const drills = useMemo(
    () => diagramSpecsForSection({ subject: subjectFrom(unitCode), unitCode, number: sectionNumber }),
    [unitCode, sectionNumber],
  );
  const diagrams = Array.isArray(data) ? data : [];
  const { byCard, left } = useMemo(() => attachDrills(diagrams, drills), [diagrams, drills]);

  if (!diagrams.length && !drills.length) {
    return <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No diagrams available.</div>;
  }

  return (
    <div>
      {diagrams.map((diagram, i) => (
        <DiagramCard key={i} diagram={diagram} sectionId={sectionId} drill={byCard.get(i) || null} />
      ))}
      {left.map((spec) => (
        <div key={spec.id} className="diagram-container">
          <h3 className="diagram-title">{spec.title}</h3>
          <p className="diagram-description">Draw it yourself: shift the curve, mark where the market settles, and it is marked the way an examiner reads a diagram.</p>
          <DrawThis spec={spec} open />
        </div>
      ))}
    </div>
  );
}

/** The drawing drill behind a button, so a diagram card stays a diagram card until asked. */
function DrawThis({ spec, open = false }) {
  const [shown, setShown] = useState(open);
  if (!shown) {
    return (
      <button type="button" className="lm-label-drill-toggle" onClick={() => setShown(true)}>
        &#9999;&#65039; Practise drawing this
      </button>
    );
  }
  return (
    <div className="diagram-draw-drill">
      <DiagramDrawDrill spec={spec} />
      {!open && (
        <button type="button" className="lm-label-drill-toggle" onClick={() => setShown(false)}>
          Hide the drawing drill
        </button>
      )}
    </div>
  );
}

function DiagramCard({ diagram, sectionId, drill = null }) {
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

  // F061's label drill, as in Learn Mode's InlineDiagram: offered only when the SVG carries three
  // or more <text class="draggable"> labels to drill, counted on the injected copy.
  const [drillLabels, setDrillLabels] = useState(0);
  const [labelling, setLabelling] = useState(false);

  // Post-process SVG after render for quality fixes
  useEffect(() => {
    if (!svgRef.current || !currentSvg || hasImage) return;
    svgRef.current.innerHTML = currentSvg;
    const svgEl = svgRef.current.querySelector('svg');
    if (svgEl) processSvg(svgEl);
    setDrillLabels(svgEl ? svgEl.querySelectorAll('text.draggable').length : 0);
    setLabelling(false);
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
        /* Kept mounted (hidden) while the label drill is open, so the injected SVG survives. */
        <div className="diagram-svg-wrapper lm-diagram-clickable" ref={svgRef} onClick={handleEnlarge} hidden={labelling} />
      )}
      {!hasImage && !isTable && drillLabels >= 3 && !labelling && (
        <button type="button" className="lm-label-drill-toggle" onClick={() => setLabelling(true)}>
          &#127919; Label this diagram
        </button>
      )}
      {labelling && <DiagramLabelDrill svgString={currentSvg} onClose={() => setLabelling(false)} />}
      <button type="button" className="lm-diagram-enlarge-btn" onClick={handleEnlarge}>
        Enlarge diagram
      </button>

      {!isTable && <DiagramChecklist items={diagram.checklist} />}

      {drill && <DrawThis spec={drill} />}

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
