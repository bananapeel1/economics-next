"use client";
import DiagramChecklist from '../DiagramChecklist';
import { useState, useRef, useEffect, useCallback } from 'react';
import processSvg from './processSvg';
import DiagramLabelDrill from './DiagramLabelDrill';
import DiagramEnlarge from './DiagramEnlarge';
import ReportProblem from '@/components/feedback/ReportProblem';

/* The enlarge sheet moved to DiagramEnlarge.jsx (V037), so the Diagrams tab can use the same one.
   It had lived here, which is the whole reason only Learn Mode ever had a way to enlarge. */

/* ── Inline Diagram Card (static — no hover tooltips) ── */
export default function InlineDiagram({ diagram, sectionId }) {
  const [activeScenario, setActiveScenario] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const svgRef = useRef(null);
  const scenarios = diagram.scenarios || [{ label: 'Default', svg: diagram.svg }];
  const currentSvg = scenarios[activeScenario]?.svg || diagram.svg;
  const hasImage = !!diagram.imageUrl;

  /* A reference table is not a diagram, and the schema has no surface for one — `schema.body-type`
     allows paragraph, subheading, flow and bullets, so an author with a grid to show has only this
     component. Everything below then treats the grid as a diagram: it prints "what a correct diagram
     shows" over a table nobody draws in an exam, caps it at the width a cost-curve graph wants, and
     offers to drill its labels. `kind: 'table'` turns those three off. Reported from the product on
     3.3.1, where the table rendered at about 10px on a 1440px screen. */
  const isTable = diagram.kind === 'table';

  // F061 (packet 7): the label drill, behind a button that exists only when the SVG has labels
  // to drill — three or more <text class="draggable">. Counted here, on the injected copy.
  const [drillLabels, setDrillLabels] = useState(0);
  const [drilling, setDrilling] = useState(false);

  // Inject and post-process SVG (static — no hover listeners)
  useEffect(() => {
    if (!svgRef.current || !currentSvg || hasImage) return;
    svgRef.current.innerHTML = currentSvg;
    const svgEl = svgRef.current.querySelector('svg');
    if (svgEl) processSvg(svgEl);
    setDrillLabels(svgEl ? svgEl.querySelectorAll('text.draggable').length : 0);
    setDrilling(false);
  }, [currentSvg, hasImage]);

  const handleDiagramClick = useCallback(() => {
    setEnlarged(true);
  }, []);

  // F062: the hint only when enlarging would actually show more. The inline card is capped at
  // 442-552px on wide screens; the sheet draws at 2× the viewport width on narrow ones.
  const [canEnlarge, setCanEnlarge] = useState(true);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const narrow = window.matchMedia('(max-width: 767px)');
    /* A table always offers it. The width cap is off for tables, but a grid of words still lands
       around 9px on a 1024-wide laptop and ~5px on a phone, and the old rule hid the hint whenever
       the wrapper was 500px or wider — so at 1024 a table was small AND had no way out. */
    const update = () => setCanEnlarge(isTable || narrow.matches || (svgRef.current?.clientWidth || 0) < 500);
    update();
    narrow.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => { narrow.removeEventListener('change', update); window.removeEventListener('resize', update); };
  }, [isTable]);

  return (
    <div className={`lm-diagram-card${isTable ? ' lm-diagram-table' : ''}`}>
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
          <div className="lm-interactive-svg-wrapper lm-diagram-clickable" onClick={handleDiagramClick}>
            <img src={diagram.imageUrl} alt={diagram.title} />
          </div>
        ) : (
          /* Kept mounted (hidden) while the drill is open, so the injected SVG survives the round trip. */
          <div className="lm-interactive-svg-wrapper lm-diagram-clickable" ref={svgRef} onClick={handleDiagramClick} hidden={drilling} />
        )}
        {canEnlarge && !drilling && <div className="lm-diagram-enlarge-hint">Tap to enlarge</div>}
        {!hasImage && !isTable && drillLabels >= 3 && !drilling && (
          <button type="button" className="lm-label-drill-toggle" onClick={() => setDrilling(true)}>
            &#127919; Label this diagram
          </button>
        )}
        {drilling && <DiagramLabelDrill svgString={currentSvg} onClose={() => setDrilling(false)} />}

        {!isTable && <DiagramChecklist items={diagram.checklist} />}

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
      </div>

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
